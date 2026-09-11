import fsPromises from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
export const getFfmpegPath = () => {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  if (process.platform === "darwin") {
    for (const candidatePath of ["/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg", "/usr/bin/ffmpeg"]) {
      if (fs.existsSync(candidatePath)) {
        return candidatePath;
      }
    }
  }
  if (process.env.FLOWTUBE_REMOTION_BINARIES) {
    const isWindows = process.platform === "win32";
    const bundledFfmpegPath = path.join(process.env.FLOWTUBE_REMOTION_BINARIES, isWindows ? "ffmpeg.exe" : "ffmpeg");
    if (fs.existsSync(bundledFfmpegPath)) {
      return bundledFfmpegPath;
    }
  }
  return process.env.FFMPEG_PATH || "ffmpeg";
};
const ensureMacDylibs = async targetDir => {
  if (process.platform !== "darwin" || !targetDir) {
    return;
  }
  try {
    const ffmpegPath = getFfmpegPath();
    const ffmpegDir = path.dirname(ffmpegPath);
    if (!fs.existsSync(ffmpegDir)) {
      return;
    }
    const dirEntries = await fsPromises.readdir(ffmpegDir).catch(() => []);
    const dylibFiles = dirEntries.filter(fileName => fileName.endsWith(".dylib"));
    for (const dylibFile of dylibFiles) {
      const sourcePath = path.join(ffmpegDir, dylibFile);
      const destPath = path.join(targetDir, dylibFile);
      try {
        if (!fs.existsSync(destPath)) {
          await fsPromises.symlink(sourcePath, destPath).catch(() => fsPromises.copyFile(sourcePath, destPath));
        }
      } catch (err) {}
    }
  } catch (err) {}
};
const getSpawnOptions = cwd => {
  const ffmpegPath = getFfmpegPath();
  const ffmpegDir = path.dirname(ffmpegPath);
  const isMac = process.platform === "darwin";
  const env = {
    ...process.env,
    ...(isMac ? {
      DYLD_LIBRARY_PATH: [ffmpegDir, process.env.DYLD_LIBRARY_PATH].filter(Boolean).join(":"),
      DYLD_FALLBACK_LIBRARY_PATH: [ffmpegDir, "/usr/local/lib", "/opt/homebrew/lib", process.env.DYLD_FALLBACK_LIBRARY_PATH].filter(Boolean).join(":")
    } : {})
  };
  return {
    cwd: cwd || ffmpegDir,
    env: env,
    windowsHide: true
  };
};
let activeFfmpegChild = null;
export const cancelActiveFfmpeg = () => {
  if (activeFfmpegChild) {
    try {
      activeFfmpegChild.kill("SIGKILL");
    } catch (err) {}
    activeFfmpegChild = null;
  }
};
const run = (args, cwd) => new Promise((resolve, reject) => {
  const ffmpegPath = getFfmpegPath();
  const ffmpegProcess = spawn(ffmpegPath, args, getSpawnOptions(cwd));
  activeFfmpegChild = ffmpegProcess;
  let stderrOutput = "";
  ffmpegProcess.stderr.on("data", chunk => {
    stderrOutput = (stderrOutput + chunk.toString()).slice(-12000);
  });
  ffmpegProcess.on("error", err => {
    if (activeFfmpegChild === ffmpegProcess) {
      activeFfmpegChild = null;
    }
    reject(new Error("No se pudo iniciar FFmpeg (" + ffmpegPath + "). Instala FFmpeg o define FFMPEG_PATH. " + err.message));
  });
  ffmpegProcess.on("close", exitCode => {
    if (activeFfmpegChild === ffmpegProcess) {
      activeFfmpegChild = null;
    }
    if (exitCode === 0) {
      resolve();
    } else {
      reject(new Error("FFmpeg termino con codigo " + exitCode + ": " + stderrOutput.slice(-1600)));
    }
  });
});
const probeAudio = async filePath => {
  try {
    const ffmpegPath = getFfmpegPath();
    const ffmpegProcess = spawn(ffmpegPath, ["-i", filePath], getSpawnOptions());
    let stderrOutput = "";
    ffmpegProcess.stderr.on("data", chunk => {
      stderrOutput += chunk.toString();
    });
    await new Promise(resolve => ffmpegProcess.on("close", resolve));
    return /Audio:\s+/i.test(stderrOutput);
  } catch (err) {
    return false;
  }
};
const imageFilter = ({
  width: width,
  height: height,
  fps: fps,
  frames: frames,
  motion: motion
}) => {
  const scaledWidth = Math.round(width * 1.22 / 2) * 2;
  const scaledHeight = Math.round(height * 1.22 / 2) * 2;
  const baseFilter = "scale=" + scaledWidth + ":" + scaledHeight + ":force_original_aspect_ratio=increase,crop=" + scaledWidth + ":" + scaledHeight;
  if (motion === "still") {
    return baseFilter + ",scale=" + width + ":" + height + ",fps=" + fps + ",format=yuv420p";
  }
  const zoomExpr = motion === "zoom-out" ? "1.18-0.16*on/" + frames : motion === "whip-zoom-in" ? "1.02+0.18*(on/" + frames + ")*(on/" + frames + ")" : motion.startsWith("pan-") ? "1.14" : "1.02+0.16*on/" + frames;
  const xExpr = motion === "pan-left" || motion === "zoom-pan-top-left" || motion === "zoom-pan-bottom-left" ? "(iw-iw/zoom)*(1-on/" + frames + ")" : motion === "pan-right" || motion === "zoom-pan-top-right" || motion === "zoom-pan-bottom-right" ? "(iw-iw/zoom)*on/" + frames : "iw/2-(iw/zoom/2)";
  const yExpr = motion === "pan-up" || motion === "zoom-pan-top-left" || motion === "zoom-pan-top-right" ? "(ih-ih/zoom)*(1-on/" + frames + ")" : motion === "pan-down" || motion === "zoom-pan-bottom-left" || motion === "zoom-pan-bottom-right" ? "(ih-ih/zoom)*on/" + frames : "ih/2-(ih/zoom/2)";
  return baseFilter + ",zoompan=z='" + zoomExpr + "':x='" + xExpr + "':y='" + yExpr + "':d=1:s=" + width + "x" + height + ":fps=" + fps + ",format=yuv420p";
};
const videoFilter = ({
  width: width,
  height: height,
  fps: fps
}) => "scale=" + width + ":" + height + ":force_original_aspect_ratio=increase,crop=" + width + ":" + height + ",fps=" + fps + ",format=yuv420p";
export const renderWithFfmpeg = async ({
  scenes: scenes,
  outputPath: outputPath,
  workDir: workDir,
  format: format,
  fps = 30,
  audioPath = null,
  musicPath = null,
  musicVolume = 0.1,
  musicLoop = true,
  resolution = "1080p"
}) => {
  const isHighRes = resolution === "2k" || resolution === "1440p";
  let videoWidth;
  let videoHeight;
  if (format === "short") {
    videoWidth = isHighRes ? 1440 : 1080;
    videoHeight = isHighRes ? 2560 : 1920;
  } else {
    videoWidth = isHighRes ? 2560 : 1920;
    videoHeight = isHighRes ? 1440 : 1080;
  }
  await fsPromises.mkdir(workDir, {
    recursive: true
  });
  await ensureMacDylibs(workDir);
  const clipPaths = [];
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const frameCount = Math.max(1, Math.round(Math.max(1, Number(scene.duration || 4)) * fps));
    const durationSec = frameCount / fps;
    const clipPath = path.join(workDir, "clip-" + String(i + 1).padStart(3, "0") + ".mp4");
    if (scene.imageHidden || scene.hidden || !scene.localPath) {
      await run(["-y", "-f", "lavfi", "-i", "color=c=black:s=" + videoWidth + "x" + videoHeight + ":d=" + durationSec + ":r=" + fps, "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100", "-t", String(durationSec), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", clipPath], workDir);
      clipPaths.push(clipPath);
      continue;
    }
    const isVideo = scene.sourceType === "video";
    const hasAudio = isVideo && !scene.muted && (await probeAudio(scene.localPath));
    const inputArgs = isVideo ? ["-stream_loop", "-1", "-i", scene.localPath] : ["-loop", "1", "-i", scene.localPath];
    const filterExpr = isVideo ? videoFilter({
      width: videoWidth,
      height: videoHeight,
      fps: fps
    }) : imageFilter({
      width: videoWidth,
      height: videoHeight,
      fps: fps,
      frames: frameCount,
      motion: scene.motion || "zoom-in"
    });
    const fadeDuration = Math.min(8 / fps, durationSec / 2);
    const filterWithFade = filterExpr + ",fade=t=in:st=0:d=" + fadeDuration + ",fade=t=out:st=" + Math.max(0, durationSec - fadeDuration) + ":d=" + fadeDuration;
    if (hasAudio) {
      const volumeValue = scene.videoVolume !== undefined ? Number(scene.videoVolume) : scene.volume !== undefined ? Number(scene.volume) : 1;
      const audioFilterExpr = "volume=" + Math.max(0, volumeValue);
      await run(["-y", ...inputArgs, "-t", String(durationSec), "-vf", filterWithFade, "-af", audioFilterExpr, "-r", String(fps), "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2", clipPath], workDir);
    } else {
      await run(["-y", ...inputArgs, "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100", "-t", String(durationSec), "-vf", filterWithFade, "-map", "0:v", "-map", "1:a", "-shortest", "-r", String(fps), "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2", clipPath], workDir);
    }
    clipPaths.push(clipPath);
  }
  const concatListPath = path.join(workDir, "concat.txt");
  await fsPromises.writeFile(concatListPath, clipPaths.map(clipFilePath => "file '" + clipFilePath.replace(/\\/g, "/") + "'").join("\n"));
  const hasVoiceAudio = Boolean(audioPath);
  const hasMusicAudio = Boolean(musicPath);
  if (hasVoiceAudio && hasMusicAudio) {
    const musicVolumeValue = Math.max(0, Number(musicVolume ?? 0.1));
    const musicInputArgs = musicLoop ? ["-stream_loop", "-1", "-i", musicPath] : ["-i", musicPath];
    await run(["-y", "-f", "concat", "-safe", "0", "-i", concatListPath, "-i", audioPath, ...musicInputArgs, "-filter_complex", "[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=2[avoice];[2:a]volume=" + musicVolumeValue + "[amusic];[avoice][amusic]amix=inputs=2:duration=first:dropout_transition=2[aout]", "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", outputPath], workDir);
  } else if (hasVoiceAudio) {
    await run(["-y", "-f", "concat", "-safe", "0", "-i", concatListPath, "-i", audioPath, "-filter_complex", "[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=2[aout]", "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", outputPath], workDir);
  } else if (hasMusicAudio) {
    const musicVolumeValue = Math.max(0, Number(musicVolume ?? 0.1));
    const musicInputArgs = musicLoop ? ["-stream_loop", "-1", "-i", musicPath] : ["-i", musicPath];
    await run(["-y", "-f", "concat", "-safe", "0", "-i", concatListPath, ...musicInputArgs, "-filter_complex", "[1:a]volume=" + musicVolumeValue + "[amusic];[0:a][amusic]amix=inputs=2:duration=first:dropout_transition=2[aout]", "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", outputPath], workDir);
  } else {
    await run(["-y", "-f", "concat", "-safe", "0", "-i", concatListPath, "-c", "copy", "-movflags", "+faststart", outputPath], workDir);
  }
  return outputPath;
};
export const checkFfmpeg = () => run(["-version"], process.cwd());
export const getFfmpegInfo = () => new Promise(resolve => {
  const ffmpegPath = getFfmpegPath();
  let stdoutOutput = "";
  let stderrOutput = "";
  try {
    const ffmpegProcess = spawn(ffmpegPath, ["-version"], getSpawnOptions());
    ffmpegProcess.stdout?.on("data", chunk => {
      stdoutOutput += chunk.toString();
    });
    ffmpegProcess.stderr?.on("data", chunk => {
      stderrOutput += chunk.toString();
    });
    ffmpegProcess.on("error", err => {
      resolve({
        available: false,
        path: ffmpegPath,
        error: "No se pudo iniciar FFmpeg (" + ffmpegPath + "): " + err.message
      });
    });
    ffmpegProcess.on("close", exitCode => {
      if (exitCode === 0) {
        const firstLine = (stdoutOutput || stderrOutput).split(/\r?\n/)[0] || "";
        const versionMatch = firstLine.match(/ffmpeg version ([^\s]+)/i);
        const version = versionMatch ? versionMatch[1] : firstLine || "detectado";
        resolve({
          available: true,
          path: ffmpegPath,
          version: version,
          raw: firstLine
        });
      } else {
        resolve({
          available: false,
          path: ffmpegPath,
          error: "FFmpeg terminó con código de error " + exitCode
        });
      }
    });
  } catch (err) {
    resolve({
      available: false,
      path: ffmpegPath,
      error: err.message
    });
  }
});