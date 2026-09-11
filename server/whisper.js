import path from "node:path";
import fsPromises from "node:fs/promises";
import { spawn } from "node:child_process";
import os from "node:os";
import crypto from "node:crypto";
import { downloadWhisperModel, installWhisperCpp } from "@remotion/install-whisper-cpp";
import { getFfmpegPath } from "./ffmpeg-renderer.js";
const cancelledError = () => Object.assign(new Error("Transcripción cancelada."), {
  code: "TRANSCRIPTION_CANCELLED"
});
const runFfmpeg = (args, isCancelled = () => false) => new Promise((resolve, reject) => {
  const ffmpegPath = getFfmpegPath();
  const ffmpegProcess = spawn(ffmpegPath, args, {
    windowsHide: true
  });
  const cancelCheckInterval = setInterval(() => {
    if (isCancelled()) {
      clearInterval(cancelCheckInterval);
      ffmpegProcess.kill();
      reject(cancelledError());
    }
  }, 250);
  let stderrOutput = "";
  ffmpegProcess.stderr.on("data", chunk => {
    stderrOutput = (stderrOutput + chunk.toString()).slice(-2000);
  });
  ffmpegProcess.on("error", err => {
    clearInterval(cancelCheckInterval);
    reject(err);
  });
  ffmpegProcess.on("close", exitCode => {
    clearInterval(cancelCheckInterval);
    if (isCancelled()) {
      return reject(cancelledError());
    }
    if (exitCode === 0) {
      resolve();
    } else {
      reject(new Error("FFmpeg error " + exitCode + ": " + stderrOutput));
    }
  });
});
function parseTokensToWords(tokens, segmentStartSec = 0, segmentEndSec = 0) {
  if (!Array.isArray(tokens) || !tokens.length) {
    return [];
  }
  const words = [];
  let currentWord = null;
  const nextTimestamps = Array(tokens.length).fill(null);
  let nextTimestamp = null;
  for (let i = tokens.length - 1; i >= 0; i--) {
    nextTimestamps[i] = nextTimestamp;
    const tDtw = tokens[i].t_dtw;
    if (typeof tDtw === "number" && tDtw >= 0) {
      nextTimestamp = tDtw * 10;
    }
  }
  for (let [index, token] of tokens.entries()) {
    const tokenText = token.text;
    if (!tokenText || tokenText.trim() === "" || tokenText.startsWith("[_") || tokenText.startsWith("<|") || tokenText.startsWith("[") && tokenText.endsWith("]")) {
      continue;
    }
    let startMsRaw = null;
    let endMsRaw = null;
    if (typeof token.t_dtw === "number" && token.t_dtw >= 0) {
      startMsRaw = token.t_dtw * 10;
      endMsRaw = nextTimestamps[index] ?? null;
    } else if (token.offsets && token.offsets.from != null && token.offsets.to != null) {
      startMsRaw = token.offsets.from;
      endMsRaw = token.offsets.to;
    } else if (token.t0 != null && token.t1 != null) {
      startMsRaw = token.t0 * 10;
      endMsRaw = token.t1 * 10;
    }
    const startSec = startMsRaw == null ? segmentStartSec : startMsRaw / 1000;
    const endSec = endMsRaw == null ? Math.max(startSec + 0.05, segmentEndSec) : endMsRaw / 1000;
    const trimmedText = tokenText.trim();
    const isPunctuationOnly = /^[\p{P}\p{S}]+$/u.test(trimmedText);
    if (tokenText.startsWith(" ") || !currentWord) {
      if (currentWord) {
        words.push(currentWord);
      }
      currentWord = {
        word: trimmedText,
        startMs: Math.round(startSec * 1000),
        endMs: Math.round(Math.max(endSec, startSec + 0.05) * 1000)
      };
    } else if (isPunctuationOnly) {
      currentWord.word += trimmedText;
      if (startSec <= currentWord.endMs / 1000 + 0.15) {
        currentWord.endMs = Math.round(Math.min(Math.max(currentWord.endMs / 1000, endSec), currentWord.endMs / 1000 + 0.12) * 1000);
      }
    } else {
      currentWord.word += trimmedText;
      currentWord.endMs = Math.round(Math.max(currentWord.endMs / 1000, endSec) * 1000);
    }
  }
  if (currentWord) {
    words.push(currentWord);
  }
  return words;
}
export function segmentWordsToCues(words, options = {}) {
  const {
    targetWords = 7,
    maxWords = 12,
    minWords = 3,
    targetDurationMs = 3200,
    maxDurationMs = 4800,
    minDurationMs = 1200
  } = options;
  if (!Array.isArray(words) || !words.length) {
    return [];
  }
  const cues = [];
  let currentWords = [];
  let currentStartMs = 0;
  const flushCue = () => {
    if (!currentWords.length) {
      return;
    }
    const cueStartMs = currentWords[0].startMs;
    const cueEndMs = currentWords[currentWords.length - 1].endMs;
    const cueText = currentWords.map(w => w.word).join(" ").trim();
    if (cueText) {
      cues.push({
        id: crypto.randomUUID(),
        startMs: cueStartMs,
        endMs: Math.max(cueStartMs + 300, cueEndMs),
        text: cueText,
        words: [...currentWords]
      });
    }
    currentWords = [];
  };
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const nextWord = words[i + 1];
    if (!currentWords.length) {
      currentStartMs = word.startMs;
    }
    currentWords.push(word);
    const spanMs = word.endMs - currentStartMs;
    const wordCount = currentWords.length;
    const wordTrimmed = word.word.trim();
    const endsWithStrongPunct = /[.!?…|।؟。！？]$/.test(wordTrimmed);
    const endsWithSoftPunct = /[,;:—–]$/.test(wordTrimmed);
    const gapMs = nextWord ? nextWord.startMs - word.endMs : 0;
    const hasLongGap = gapMs >= 350;
    const hasShortGap = gapMs >= 180;
    const nextWordExceedsMax = nextWord && nextWord.endMs - currentStartMs > maxDurationMs;
    let shouldFlush = false;
    if (spanMs >= maxDurationMs || wordCount >= maxWords || nextWordExceedsMax) {
      shouldFlush = true;
    } else if (endsWithStrongPunct && (wordCount >= 2 || spanMs >= 1000)) {
      shouldFlush = true;
    } else if (endsWithSoftPunct && (wordCount >= minWords || spanMs >= minDurationMs)) {
      shouldFlush = true;
    } else if (hasLongGap && (wordCount >= minWords || spanMs >= minDurationMs)) {
      shouldFlush = true;
    } else if ((wordCount >= targetWords || spanMs >= targetDurationMs) && (hasShortGap || !nextWord)) {
      shouldFlush = true;
    }
    if (shouldFlush) {
      flushCue();
    }
  }
  flushCue();
  for (let i = 0; i < cues.length - 1; i++) {
    const cue = cues[i];
    const nextCue = cues[i + 1];
    if (cue.endMs > nextCue.startMs) {
      cue.endMs = nextCue.startMs;
    } else if (nextCue.startMs - cue.endMs < 250) {
      cue.endMs = nextCue.startMs;
    }
  }
  return cues;
}
const ensureWhisperExecutable = async (whisperDir, onProgress, checkCancelled) => {
  const legacyExeName = process.platform === "win32" ? "main.exe" : "main";
  const cliExeName = process.platform === "win32" ? "whisper-cli.exe" : "whisper-cli";
  const findExecutable = async dir => {
    if (!dir) {
      return null;
    }
    const legacyPath = path.join(dir, legacyExeName);
    const cliPath = path.join(dir, cliExeName);
    if (await fsPromises.access(legacyPath).then(() => true).catch(() => false)) {
      return legacyPath;
    }
    if (await fsPromises.access(cliPath).then(() => true).catch(() => false)) {
      return cliPath;
    }
    return null;
  };
  let executablePath = await findExecutable(whisperDir);
  if (executablePath) {
    if (process.platform !== "win32") {
      await fsPromises.chmod(executablePath, 493).catch(() => {});
    }
    return executablePath;
  }
  const bundledCandidateDirs = [process.resourcesPath ? path.join(process.resourcesPath, "runtime", "whisper.cpp") : null, process.resourcesPath ? path.join(process.resourcesPath, "app.asar.unpacked", "runtime", "whisper.cpp") : null, "/Applications/FLOWSTUDIO.app/Contents/Resources/runtime/whisper.cpp", path.join(process.cwd(), "runtime", "whisper.cpp"), path.resolve("runtime", "whisper.cpp")].filter(Boolean);
  for (const candidateDir of bundledCandidateDirs) {
    const foundExecutable = await findExecutable(candidateDir);
    if (foundExecutable) {
      onProgress(8, "Preparando motor Whisper pre-instalado...");
      await fsPromises.mkdir(whisperDir, {
        recursive: true
      });
      const dirEntries = await fsPromises.readdir(candidateDir).catch(() => []);
      for (const entry of dirEntries) {
        await fsPromises.copyFile(path.join(candidateDir, entry), path.join(whisperDir, entry)).catch(() => {});
      }
      executablePath = await findExecutable(whisperDir);
      if (executablePath) {
        if (process.platform !== "win32") {
          await fsPromises.chmod(executablePath, 493).catch(() => {});
        }
        return executablePath;
      }
      if (process.platform !== "win32") {
        await fsPromises.chmod(foundExecutable, 493).catch(() => {});
      }
      return foundExecutable;
    }
  }
  if (process.platform !== "win32") {
    const brewCandidatePaths = ["/opt/homebrew/bin/whisper-cli", "/opt/homebrew/bin/whisper-cpp", "/usr/local/bin/whisper-cli", "/usr/local/bin/whisper-cpp"];
    for (const candidatePath of brewCandidatePaths) {
      if (await fsPromises.access(candidatePath).then(() => true).catch(() => false)) {
        return candidatePath;
      }
    }
  }
  if (process.platform === "win32") {
    const zipCandidatePaths = [path.join(process.cwd(), "whisper-bin-x64.zip"), path.join(path.dirname(whisperDir), "whisper-bin-x64.zip"), path.join(whisperDir, "whisper-bin-x64.zip")];
    await fsPromises.mkdir(whisperDir, {
      recursive: true
    });
    let zipPath = null;
    for (const candidateZipPath of zipCandidatePaths) {
      if (await fsPromises.access(candidateZipPath).then(() => true).catch(() => false)) {
        zipPath = candidateZipPath;
        break;
      }
    }
    if (!zipPath) {
      onProgress(5, "Descargando motor Whisper.cpp...");
      checkCancelled();
      const downloadUrl = "https://remotion-ffmpeg-binaries.s3.eu-central-1.amazonaws.com/whisper-bin-x64-1-5-5.zip";
      const downloadedZipPath = path.join(whisperDir, "whisper-download.zip");
      const downloadResponse = await fetch(downloadUrl);
      if (!downloadResponse.ok) {
        throw new Error("No se pudo descargar Whisper.cpp (HTTP " + downloadResponse.status + ").");
      }
      const downloadArrayBuffer = await downloadResponse.arrayBuffer();
      await fsPromises.writeFile(downloadedZipPath, Buffer.from(downloadArrayBuffer));
      zipPath = downloadedZipPath;
    }
    onProgress(8, "Extrayendo motor Whisper.cpp...");
    checkCancelled();
    await new Promise((resolve, reject) => {
      const escapedZipPath = zipPath.replace(/'/g, "''");
      const escapedWhisperDir = whisperDir.replace(/'/g, "''");
      const psCommand = "Expand-Archive -LiteralPath '" + escapedZipPath + "' -DestinationPath '" + escapedWhisperDir + "' -Force";
      const psProcess = spawn("powershell.exe", ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", psCommand], {
        windowsHide: true
      });
      let psStderr = "";
      psProcess.stderr.on("data", chunk => {
        psStderr += chunk.toString();
      });
      psProcess.on("close", exitCode => exitCode === 0 ? resolve() : reject(new Error("Expand-Archive falló (" + exitCode + "): " + psStderr)));
      psProcess.on("error", reject);
    });
    await fsPromises.rm(zipPath, {
      force: true
    }).catch(() => {});
  } else {
    onProgress(5, "Preparando motor Whisper nativo para macOS...");
    checkCancelled();
    await fsPromises.rm(whisperDir, {
      recursive: true,
      force: true
    }).catch(() => {});
    await fsPromises.mkdir(whisperDir, {
      recursive: true
    });
    const macZipUrls = ["https://github.com/nmediastudio/flowstudio-releases/releases/download/v1.6.7/whisper-mac-universal.zip", "https://github.com/nmediastudio/flowstudio-releases/releases/download/v1.6.6/whisper-mac-universal.zip"];
    const macZipPath = path.join(whisperDir, "whisper-mac.zip");
    let downloaded = false;
    for (const url of macZipUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          await fsPromises.writeFile(macZipPath, Buffer.from(arrayBuffer));
          downloaded = true;
          break;
        }
      } catch (err) {}
    }
    if (downloaded) {
      onProgress(8, "Extrayendo binario de Whisper para macOS...");
      checkCancelled();
      await new Promise((resolve, reject) => {
        const unzipProcess = spawn("unzip", ["-o", macZipPath, "-d", whisperDir]);
        unzipProcess.on("close", exitCode => exitCode === 0 ? resolve() : reject(new Error("unzip falló (" + exitCode + ")")));
        unzipProcess.on("error", reject);
      }).catch(async () => {
        await new Promise((resolve, reject) => {
          const tarProcess = spawn("tar", ["-xf", macZipPath, "-C", whisperDir]);
          tarProcess.on("close", exitCode => exitCode === 0 ? resolve() : reject(new Error("tar falló (" + exitCode + ")")));
          tarProcess.on("error", reject);
        });
      });
      await fsPromises.rm(macZipPath, {
        force: true
      }).catch(() => {});
      executablePath = await findExecutable(whisperDir);
      if (executablePath) {
        await fsPromises.chmod(executablePath, 493).catch(() => {});
        return executablePath;
      }
    }
    onProgress(10, "Configurando Whisper.cpp para macOS...");
    checkCancelled();
    await fsPromises.rm(whisperDir, {
      recursive: true,
      force: true
    }).catch(() => {});
    try {
      await installWhisperCpp({
        to: whisperDir,
        version: "1.5.5",
        printOutput: false
      });
    } catch (err) {
      console.warn("installWhisperCpp fallback:", err.message);
    }
  }
  executablePath = await findExecutable(whisperDir);
  if (!executablePath) {
    throw new Error("No se pudo inicializar el ejecutable de Whisper.cpp en tu sistema. Asegúrate de contar con conexión a internet o instala whisper-cli con 'brew install whisper-cpp'.");
  }
  if (process.platform !== "win32") {
    await fsPromises.chmod(executablePath, 493).catch(() => {});
  }
  return executablePath;
};
const ensureWhisperModel = async (whisperDir, modelName, onProgress, checkCancelled) => {
  const modelFileName = "ggml-" + modelName + ".bin";
  const modelPath = path.join(whisperDir, modelFileName);
  if (await fsPromises.access(modelPath).then(() => true).catch(() => false)) {
    return modelPath;
  }
  const bundledCandidateDirs = [process.resourcesPath ? path.join(process.resourcesPath, "runtime", "whisper.cpp") : null, process.resourcesPath ? path.join(process.resourcesPath, "app.asar.unpacked", "runtime", "whisper.cpp") : null, "/Applications/FLOWSTUDIO.app/Contents/Resources/runtime/whisper.cpp", path.join(process.cwd(), "runtime", "whisper.cpp"), path.resolve("runtime", "whisper.cpp")].filter(Boolean);
  for (const candidateDir of bundledCandidateDirs) {
    const candidateModelPath = path.join(candidateDir, modelFileName);
    if (await fsPromises.access(candidateModelPath).then(() => true).catch(() => false)) {
      onProgress(12, "Copiando modelo Whisper " + modelName + " pre-instalado...");
      await fsPromises.mkdir(whisperDir, {
        recursive: true
      });
      await fsPromises.copyFile(candidateModelPath, modelPath).catch(() => {});
      if (await fsPromises.access(modelPath).then(() => true).catch(() => false)) {
        return modelPath;
      }
    }
  }
  onProgress(15, "Descargando modelo Whisper " + modelName + "...");
  checkCancelled();
  await downloadWhisperModel({
    model: modelName,
    folder: whisperDir
  });
  return modelPath;
};
export const transcribeAudioLocal = async ({
  audioFilePath: audioFilePath,
  runtimeDir: runtimeDir,
  model = "base",
  language = "auto",
  onProgress = () => {},
  isCancelled = () => false
}) => {
  const checkCancelled = () => {
    if (isCancelled()) {
      throw cancelledError();
    }
  };
  const whisperDir = path.join(runtimeDir, "whisper.cpp");
  const whisperExecutablePath = await ensureWhisperExecutable(whisperDir, onProgress, checkCancelled);
  const whisperModelPath = await ensureWhisperModel(whisperDir, model, onProgress, checkCancelled);
  onProgress(25, "Convirtiendo audio a 16kHz mono...");
  checkCancelled();
  const wavPath = path.join(runtimeDir, "whisper-" + Date.now() + ".wav");
  const outputBasePath = path.join(runtimeDir, "whisper-out-" + Date.now());
  const outputJsonPath = outputBasePath + ".json";
  try {
    await runFfmpeg(["-y", "-i", audioFilePath, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wavPath], isCancelled);
    const languageLabel = language && language !== "auto" ? " (" + language + ")" : " (auto-detección)";
    onProgress(35, "Iniciando reconocimiento Whisper" + languageLabel + "...");
    checkCancelled();
    const threadCount = Math.max(1, Math.min(16, (os.cpus()?.length || 4) - 1));
    const whisperArgs = ["-m", whisperModelPath, "-f", wavPath, "-ojf", "-of", outputBasePath, "-pp", "-sow", "-t", String(threadCount), "-bs", "1", "-bo", "1", "-mc", "0", "-et", "2.4", "-lpt", "-1.0", ...(language && language !== "auto" ? ["-l", language] : ["-l", "auto"])];
    await new Promise((resolve, reject) => {
      const whisperProcess = spawn(whisperExecutablePath, whisperArgs, {
        cwd: whisperDir,
        windowsHide: true
      });
      const cancelCheckInterval = setInterval(() => {
        if (isCancelled()) {
          clearInterval(cancelCheckInterval);
          whisperProcess.kill();
          reject(cancelledError());
        }
      }, 250);
      let stderrOutput = "";
      const handleOutput = text => {
        const progressMatch = text.match(/progress\s*=\s*(\d+)%/i);
        if (progressMatch) {
          const progressPercent = Math.min(100, parseInt(progressMatch[1], 10));
          const mappedPercent = Math.min(95, Math.max(35, 35 + Math.round(progressPercent * 0.6)));
          onProgress(mappedPercent, "Whisper reconociendo voz: " + progressPercent + "%...");
        }
      };
      whisperProcess.stdout.on("data", chunk => {
        handleOutput(chunk.toString());
      });
      whisperProcess.stderr.on("data", chunk => {
        const chunkText = chunk.toString();
        stderrOutput = (stderrOutput + chunkText).slice(-3000);
        handleOutput(chunkText);
      });
      whisperProcess.on("error", err => {
        clearInterval(cancelCheckInterval);
        reject(err);
      });
      whisperProcess.on("close", exitCode => {
        clearInterval(cancelCheckInterval);
        if (isCancelled()) {
          return reject(cancelledError());
        }
        if (exitCode === 0) {
          resolve();
        } else {
          reject(new Error("Whisper exit " + exitCode + ": " + stderrOutput));
        }
      });
    });
    checkCancelled();
    onProgress(96, "Generando subtítulos cinematográficos y palabras sincronizadas...");
    const outputJsonText = await fsPromises.readFile(outputJsonPath, "utf-8");
    const whisperResult = JSON.parse(outputJsonText);
    const allWords = [];
    for (const segment of whisperResult.transcription || []) {
      const segmentText = segment.text?.trim() || "";
      if (!segmentText) {
        continue;
      }
      const segmentStartSec = (segment.offsets?.from ?? 0) / 1000;
      const segmentEndSec = (segment.offsets?.to ?? 0) / 1000;
      const segmentWords = segment.tokens ? parseTokensToWords(segment.tokens, segmentStartSec, segmentEndSec) : [];
      if (segmentWords.length > 0) {
        allWords.push(...segmentWords);
      } else {
        const fallbackWordList = segmentText.split(/\s+/).filter(Boolean);
        const fallbackDurationMs = Math.max(80, (segmentEndSec - segmentStartSec) * 1000);
        const perWordDurationMs = fallbackDurationMs / Math.max(1, fallbackWordList.length);
        fallbackWordList.forEach((word, wordIndex) => {
          allWords.push({
            word: word,
            startMs: Math.round(segmentStartSec * 1000 + wordIndex * perWordDurationMs),
            endMs: Math.round(segmentStartSec * 1000 + (wordIndex + 1) * perWordDurationMs)
          });
        });
      }
    }
    let cues = segmentWordsToCues(allWords, {
      targetWords: 7,
      maxWords: 12,
      minWords: 3,
      targetDurationMs: 3200,
      maxDurationMs: 4800,
      minDurationMs: 1200
    });
    if (!cues.length) {
      for (const segment of whisperResult.transcription || []) {
        const segmentText = segment.text?.trim() || "";
        if (!segmentText) {
          continue;
        }
        const segmentStartSec = (segment.offsets?.from ?? 0) / 1000;
        const segmentEndSec = (segment.offsets?.to ?? 0) / 1000;
        const segmentWords = segment.tokens ? parseTokensToWords(segment.tokens, segmentStartSec, segmentEndSec) : [];
        cues.push({
          id: crypto.randomUUID(),
          startMs: Math.round(segmentStartSec * 1000),
          endMs: Math.round(segmentEndSec * 1000),
          text: segmentText,
          words: segmentWords
        });
      }
    }
    onProgress(100, "Whisper completado: " + cues.length + " frases sincronizadas.");
    return cues;
  } finally {
    await fsPromises.rm(wavPath, {
      force: true
    }).catch(() => {});
    await fsPromises.rm(outputJsonPath, {
      force: true
    }).catch(() => {});
  }
};