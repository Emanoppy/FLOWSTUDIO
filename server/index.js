import { getMachineHWID } from "./hwid.js";
import { hashPassword, getUsers, getUserById, getUserByHwid, getUserByUsernameOrEmail, createUser, updateUser, deleteUser, getLicenses, generateLicenses, updateLicense, redeemLicense, deleteLicense, logAccess, getAccessLogs, getSystemStats } from "./database.js";
import { activateLicense } from "./database.js";
import { supabaseEnabled, sbGetAdminKeyHash, sbGetPublishedUpdates, sbCreateUpdate } from "./supabase.js";
import express from "express";
import cors from "cors";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { materializeScenes, materializeAudio, materializeOverlays, projectName } from "./media.js";
import { checkFfmpeg, getFfmpegInfo, renderWithFfmpeg, cancelActiveFfmpeg } from "./ffmpeg-renderer.js";
import { renderWithRemotion } from "./remotion-renderer.js";
import { transcribeAudioLocal } from "./whisper.js";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { exportToCapCutDraft } from "./capcut-exporter.js";
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = process.env.FLOWTUBE_DATA_ROOT ? path.resolve(process.env.FLOWTUBE_DATA_ROOT) : rootDir;
const loadPrivateEnvironment = async () => {
  const envFilePaths = [...new Set([path.join(dataRoot, "flowstudio.private.env"), path.join(rootDir, ".env")])];
  for (const envFilePath of envFilePaths) {
    const envFileContent = await fs.readFile(envFilePath, "utf8").catch(() => "");
    for (const line of envFileContent.split(/\r?\n/)) {
      const match = line.match(/^\s*FLOWSTUDIO_ADMIN_KEY_HASH\s*=\s*([a-f0-9]{64})\s*$/i);
      if (match && !process.env.FLOWSTUDIO_ADMIN_KEY_HASH) {
        process.env.FLOWSTUDIO_ADMIN_KEY_HASH = match[1].toLowerCase();
      }
    }
  }
  if (!process.env.FLOWSTUDIO_ADMIN_KEY_HASH) {
    console.warn("[Seguridad] ⚠️ FLOWSTUDIO_ADMIN_KEY_HASH no configurado en entorno privado. El login de administrador quedará deshabilitado hasta que lo configures.");
  }
};
await loadPrivateEnvironment();
const userOutputDir = process.env.FLOWSTUDIO_OUTPUT_DIR ? path.resolve(process.env.FLOWSTUDIO_OUTPUT_DIR) : null;
const userImagesDir = userOutputDir ? path.join(userOutputDir, "Imagenes") : null;
const userRendersDir = userOutputDir ? path.join(userOutputDir, "Renders") : null;
const userAudiosDir = userOutputDir ? path.join(userOutputDir, "Audios") : null;
const runtimeDir = path.join(dataRoot, "runtime");
const assetsDir = path.join(runtimeDir, "assets");
const legacyRendersDir = path.join(runtimeDir, "renders");
const rendersDir = userRendersDir || legacyRendersDir;
const workRoot = path.join(runtimeDir, "work");
const libraryDir = path.join(runtimeDir, "library");
const distDir = path.join(rootDir, "dist");
const serverPort = Number(process.env.PORT) || 4322;
const remoteGatewayUrl = String(process.env.FLOWSTUDIO_GATEWAY_URL || "https://hktxhsfwvvnujszlwnqj.supabase.co/functions/v1/flowstudio-gateway").replace(/\/$/, "");
await fs.rm(workRoot, {
  recursive: true,
  force: true
}).catch(() => {});
const allStartupDirs = [assetsDir, rendersDir, legacyRendersDir, workRoot, libraryDir, userImagesDir, userAudiosDir].filter(Boolean);
await Promise.all(allStartupDirs.map(dir => fs.mkdir(dir, {
  recursive: true
})));
const app = express();
const sessions = new Map();
const issueSession = (user, options = {}) => {
  const token = "ft_" + crypto.randomBytes(32).toString("base64url");
  sessions.set(token, {
    userId: user.id,
    role: user.role,
    gatewayToken: options.gatewayToken || "",
    expiresAt: Date.now() + 2592000000
  });
  return token;
};
const readSession = req => {
  const authHeader = String(req.headers.authorization || "");
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (token) {
      sessions.delete(token);
    }
    return null;
  }
  return session;
};
const requireAuth = requiredRole => async (req, res, next) => {
  const session = readSession(req);
  if (!session || requiredRole && session.role !== requiredRole) {
    return res.status(401).json({
      ok: false,
      error: "Sesión no autorizada."
    });
  }
  const user = session.userId === "admin-master" ? {
    id: "admin-master",
    username: "flowstudio-admin",
    role: "admin",
    status: "active",
    licensePlan: "Master",
    licenseExpiresAt: null,
    hwid: null
  } : await getUserById(session.userId);
  if (!user || user.status === "banned") {
    return res.status(403).json({
      ok: false,
      error: "Usuario suspendido o inexistente."
    });
  }
  req.authUser = user;
  next();
};
const adminKeyHash = () => String(process.env.FLOWSTUDIO_ADMIN_KEY_HASH || "").trim().toLowerCase();
let remoteAdminHash = "";
if (supabaseEnabled) {
  remoteAdminHash = await sbGetAdminKeyHash().catch(err => {
    console.error("[Supabase] No se pudo leer la configuración privada:", err.message);
    return "";
  });
}
const configuredAdminKeyHash = () => adminKeyHash() || remoteAdminHash;
const hashAdminKey = key => crypto.createHash("sha256").update(String(key || "").trim().toLowerCase() + "::flowstudio-admin-v1").digest("hex");
let renderBusy = false;
app.use(cors({
  origin: true
}));
const extensionForMime = mimeType => {
  const mime = String(mimeType).split(";")[0].toLowerCase();
  if (mime.startsWith("video/")) {
    return ".mp4";
  }
  if (mime === "image/png") {
    return ".png";
  }
  if (mime === "image/webp") {
    return ".webp";
  }
  if (mime === "image/jpeg") {
    return ".jpg";
  }
  if (mime === "audio/mpeg" || mime === "audio/mp3") {
    return ".mp3";
  }
  if (mime === "audio/wav" || mime === "audio/x-wav") {
    return ".wav";
  }
  if (mime === "audio/mp4" || mime === "audio/x-m4a") {
    return ".m4a";
  }
  if (mime === "audio/aac") {
    return ".aac";
  }
  if (mime === "audio/ogg") {
    return ".ogg";
  }
  if (mime === "audio/webm") {
    return ".webm";
  }
  if (mime === "audio/flac") {
    return ".flac";
  }
  return ".jpg";
};
app.get("/api/health", async (req, res) => {
  const ffmpegInfo = await getFfmpegInfo();
  return res.json({
    ok: true,
    status: ffmpegInfo.available ? "healthy" : "warning",
    version: "1.7.3",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
    ffmpeg: ffmpegInfo,
    storage: {
      rendersDir,
      assetsDir,
      workRoot
    }
  });
});
app.get("/api/system/ffmpeg", async (req, res) => {
  const ffmpegInfo = await getFfmpegInfo();
  return res.json({
    ok: ffmpegInfo.available,
    ffmpeg: ffmpegInfo
  });
});
app.post("/api/import", express.raw({
  type: "*/*",
  limit: "200mb"
}), async (req, res) => {
  if (!Buffer.isBuffer(req.body) || !req.body.length) {
    return res.status(400).json({
      ok: false,
      error: "No se recibió un archivo o el archivo está vacío."
    });
  }
  const contentType = req.headers["content-type"] || "application/octet-stream";
  const rawFilename = req.headers["x-filename"] ? decodeURIComponent(req.headers["x-filename"]) : "";
  let extension = path.extname(rawFilename).toLowerCase();
  if (!extension) {
    extension = extensionForMime(contentType);
  }
  const generatedFilename = "" + crypto.randomUUID() + extension;
  const isImage = contentType.startsWith("image/") || [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(extension);
  const targetDir = isImage && userImagesDir ? userImagesDir : userAudiosDir || libraryDir;
  await fs.writeFile(path.join(targetDir, generatedFilename), req.body);
  res.json({
    ok: true,
    url: "http://127.0.0.1:" + serverPort + "/library/" + generatedFilename,
    mime: contentType.split(";")[0] || (isImage ? "image/jpeg" : "audio/mpeg"),
    filename: generatedFilename
  });
});
app.use(express.json({
  limit: "120mb"
}));
app.use("/assets", express.static(assetsDir));
if (userImagesDir) {
  app.use("/library", express.static(userImagesDir, {
    maxAge: "7d"
  }));
}
if (userAudiosDir) {
  app.use("/library", express.static(userAudiosDir, {
    maxAge: "7d"
  }));
}
app.use("/library", express.static(libraryDir, {
  maxAge: "7d"
}));
app.use("/renders", express.static(rendersDir, {
  maxAge: "7d"
}));
if (legacyRendersDir !== rendersDir) {
  app.use("/renders", express.static(legacyRendersDir, {
    maxAge: "7d"
  }));
}
const remoteGatewayRequest = async (endpoint, payload) => {
  const response = await fetch(remoteGatewayUrl + "/" + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Gateway remoto no disponible.");
  }
  return data;
};
const remoteGatewayGet = async endpoint => {
  const response = await fetch(remoteGatewayUrl + "/" + endpoint);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Gateway remoto no disponible.");
  }
  return data;
};
const remoteAdminRequest = async (req, endpoint, payload = {}) => {
  const session = readSession(req);
  if (!session?.gatewayToken) {
    throw new Error("La sesión admin remota no está disponible.");
  }
  const response = await fetch(remoteGatewayUrl + "/admin/" + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.gatewayToken
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Gateway remoto no disponible.");
  }
  return data;
};
app.get("/api/health", async (req, res) => {
  try {
    await checkFfmpeg();
    res.json({
      ok: true,
      ffmpeg: true,
      supabase: supabaseEnabled
    });
  } catch (err) {
    res.json({
      ok: true,
      ffmpeg: false,
      supabase: supabaseEnabled,
      warning: err.message
    });
  }
});
const activeTranscriptions = new Map();
const transcriptionModels = new Set(["tiny", "base", "small"]);
const resolveLibraryAudio = async (audioUrl, audioName = "") => {
  if (!audioUrl && !audioName) {
    throw new Error("No se proporcionó un audio válido.");
  }
  const trimmedUrl = String(audioUrl || "").trim();
  if (trimmedUrl.startsWith("/") || trimmedUrl.includes(":\\") || trimmedUrl.includes(":/") || trimmedUrl.startsWith("file://")) {
    const localPath = trimmedUrl.replace(/^file:\/\/\/?/, "");
    const localPathExists = await fs.access(localPath).then(() => true).catch(() => false);
    if (localPathExists) {
      return localPath;
    }
  }
  const urlWithoutQuery = trimmedUrl.split("?")[0];
  const baseName = path.basename(urlWithoutQuery);
  let decodedBaseName = "";
  try {
    decodedBaseName = decodeURIComponent(baseName);
  } catch {}
  let decodedAudioName = "";
  try {
    decodedAudioName = audioName ? decodeURIComponent(audioName) : "";
  } catch {}
  const candidateNames = [baseName, decodedBaseName, audioName, decodedAudioName].filter(Boolean);
  const searchDirs = [userAudiosDir, libraryDir, assetsDir].filter(Boolean);
  for (const dir of searchDirs) {
    for (const candidateName of candidateNames) {
      const candidatePath = path.join(dir, candidateName);
      const candidateExists = await fs.access(candidatePath).then(() => true).catch(() => false);
      if (candidateExists) {
        return candidatePath;
      }
    }
  }
  if (userAudiosDir) {
    try {
      const dirEntries = await fs.readdir(userAudiosDir);
      for (const candidateName of candidateNames) {
        const lowerCandidateName = candidateName.toLowerCase();
        const matchedEntry = dirEntries.find(entry => entry.toLowerCase() === lowerCandidateName);
        if (matchedEntry) {
          return path.join(userAudiosDir, matchedEntry);
        }
      }
    } catch {}
  }
  if (/^https?:\/\//i.test(trimmedUrl) || trimmedUrl.startsWith("/")) {
    const fetchUrl = trimmedUrl.startsWith("/") ? "http://127.0.0.1:" + serverPort + trimmedUrl : trimmedUrl;
    const downloadName = decodedBaseName || baseName || "audio.mp3";
    const downloadPath = path.join(runtimeDir, "download-" + Date.now() + "-" + downloadName);
    const downloadResponse = await fetch(fetchUrl);
    if (downloadResponse.ok) {
      const arrayBuffer = await downloadResponse.arrayBuffer();
      await fs.writeFile(downloadPath, Buffer.from(arrayBuffer));
      return downloadPath;
    }
  }
  throw new Error("No se encontró el archivo de audio \"" + (decodedBaseName || baseName || audioName) + "\" en el almacenamiento local.");
};
app.post("/api/transcribe-whisper/start", async (req, res) => {
  const {
    audioUrl,
    audioName,
    model = "base",
    language = "auto"
  } = req.body || {};
  if (!audioUrl) {
    return res.status(400).json({
      ok: false,
      error: "No se proporcionó audioUrl."
    });
  }
  const resolvedModel = transcriptionModels.has(model) ? model : "base";
  const jobId = crypto.randomUUID();
  const jobState = {
    status: "queued",
    progress: 1,
    message: "Transcripción en cola...",
    cancelled: false,
    model: resolvedModel,
    language
  };
  activeTranscriptions.set(jobId, jobState);
  res.json({
    ok: true,
    jobId
  });
  (async () => {
    try {
      const resolvedAudioPath = await resolveLibraryAudio(audioUrl, audioName);
      jobState.status = "running";
      const cues = await transcribeAudioLocal({
        audioFilePath: resolvedAudioPath,
        runtimeDir,
        model: resolvedModel,
        language: typeof language === "string" ? language : "auto",
        isCancelled: () => jobState.cancelled,
        onProgress: (progress, message) => Object.assign(jobState, {
          status: "running",
          progress,
          message
        })
      });
      Object.assign(jobState, {
        status: "done",
        progress: 100,
        message: "Transcripción completada.",
        cues
      });
    } catch (err) {
      Object.assign(jobState, {
        status: jobState.cancelled || err.code === "TRANSCRIPTION_CANCELLED" ? "cancelled" : "error",
        progress: 0,
        message: jobState.cancelled ? "Transcripción cancelada." : "Error: " + err.message,
        error: err.message
      });
    }
  })();
});
const storageTargets = {
  assets: assetsDir,
  library: libraryDir,
  renders: rendersDir,
  temporary: workRoot
};
const directoryStats = async targetDir => {
  let totalBytes = 0;
  let totalFiles = 0;
  const walk = async dir => {
    const entries = await fs.readdir(dir, {
      withFileTypes: true
    }).catch(() => []);
    await Promise.all(entries.map(async entry => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(entryPath);
      }
      if (entry.isFile()) {
        const stat = await fs.stat(entryPath).catch(() => null);
        if (stat) {
          totalBytes += stat.size;
          totalFiles += 1;
        }
      }
    }));
  };
  await walk(targetDir);
  return {
    bytes: totalBytes,
    files: totalFiles
  };
};
app.get("/api/storage", async (req, res) => {
  const entries = await Promise.all(Object.entries(storageTargets).map(async ([name, dir]) => [name, await directoryStats(dir)]));
  const targets = Object.fromEntries(entries);
  res.json({
    ok: true,
    targets,
    totalBytes: entries.reduce((sum, [, stats]) => sum + stats.bytes, 0)
  });
});
app.post("/api/storage/clean", async (req, res) => {
  const target = String(req.body?.target || "");
  const targetDir = storageTargets[target];
  if (!targetDir) {
    return res.status(400).json({
      ok: false,
      error: "Área de almacenamiento no permitida."
    });
  }
  if (target === "library") {
    return res.status(409).json({
      ok: false,
      error: "La biblioteca está protegida porque contiene audios e imágenes utilizados por los proyectos."
    });
  }
  if (renderBusy) {
    return res.status(409).json({
      ok: false,
      error: "No se puede limpiar almacenamiento mientras hay un render activo. Espera a que termine."
    });
  }
  await fs.rm(targetDir, {
    recursive: true,
    force: true
  });
  await fs.mkdir(targetDir, {
    recursive: true
  });
  res.json({
    ok: true,
    target
  });
});
app.get("/api/transcribe-whisper/status/:jobId", (req, res) => {
  const job = activeTranscriptions.get(req.params.jobId);
  if (!job) {
    return res.status(404).json({
      ok: false,
      error: "Transcripción no encontrada."
    });
  }
  res.json({
    ok: true,
    ...job
  });
});
app.post("/api/transcribe-whisper/cancel/:jobId", (req, res) => {
  const job = activeTranscriptions.get(req.params.jobId);
  if (!job) {
    return res.status(404).json({
      ok: false,
      error: "Transcripción no encontrada."
    });
  }
  job.cancelled = true;
  job.message = "Cancelando transcripción...";
  res.json({
    ok: true
  });
});
const activeRenders = new Map();
let currentRenderJob = null;
app.get("/api/render-status/:jobId", (req, res) => {
  const job = activeRenders.get(req.params.jobId);
  if (!job) {
    return res.status(404).json({
      ok: false,
      error: "Job no encontrado."
    });
  }
  res.json({
    ok: true,
    ...job
  });
});
const cancelActiveRender = async (jobId, reason = "Render cancelado por el usuario.") => {
  if (currentRenderJob) {
    if (!jobId || currentRenderJob.jobId === jobId) {
      try {
        currentRenderJob.cancel?.();
      } catch (err) {
        console.warn("[Render Cancel] Error al invocar cancelación de proceso:", err);
      }
      currentRenderJob = null;
    }
  }
  if (jobId) {
    const job = activeRenders.get(jobId);
    if (job) {
      job.cancelled = true;
      job.status = "cancelled";
      job.message = reason;
    }
  } else {
    for (const job of activeRenders.values()) {
      if (job.status === "rendering" || job.status === "preparing") {
        job.cancelled = true;
        job.status = "cancelled";
        job.message = reason;
      }
    }
  }
  renderBusy = false;
};
app.post(["/api/render-cancel", "/api/render-cancel/:jobId"], async (req, res) => {
  const jobId = req.params.jobId || req.body?.jobId;
  await cancelActiveRender(jobId, "Render cancelado por el usuario.");
  res.json({
    ok: true,
    message: "Render cancelado."
  });
});
app.get("/api/renders/history", async (req, res) => {
  try {
    const renderDirs = [rendersDir, legacyRendersDir].filter((dir, index, arr) => arr.indexOf(dir) === index);
    const renderMap = new Map();
    for (const dir of renderDirs) {
      const entries = await fs.readdir(dir, {
        withFileTypes: true
      }).catch(() => []);
      for (const entry of entries) {
        if (entry.isFile() && entry.name.toLowerCase().endsWith(".mp4")) {
          if (!renderMap.has(entry.name)) {
            const filePath = path.join(dir, entry.name);
            const stat = await fs.stat(filePath).catch(() => null);
            const sizeBytes = stat?.size || 0;
            const sizeFormatted = sizeBytes > 1048576 ? (sizeBytes / 1048576).toFixed(1) + " MB" : (sizeBytes / 1024).toFixed(0) + " KB";
            const title = entry.name.replace(/-[a-f0-9]{8}\.mp4$/i, "").replace(/_/g, " ");
            renderMap.set(entry.name, {
              filename: entry.name,
              title: title || "Video Exportado",
              url: "http://127.0.0.1:4322/renders/" + encodeURIComponent(entry.name),
              localPath: filePath,
              sizeBytes,
              sizeFormatted,
              createdAt: stat?.mtime || new Date(),
              status: "done",
              progress: 100
            });
          }
        }
      }
    }
    const renderList = Array.from(renderMap.values());
    const activeList = [];
    for (const [jobId, job] of activeRenders.entries()) {
      if (job.status === "rendering" || job.status === "preparing") {
        activeList.push({
          jobId,
          filename: "render-" + jobId.slice(0, 8) + ".mp4",
          title: "Render en curso...",
          url: "",
          sizeBytes: 0,
          sizeFormatted: "Procesando",
          createdAt: new Date(job.startTime || Date.now()),
          status: job.status,
          progress: job.progress || 10,
          message: job.message
        });
      }
    }
    renderList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({
      ok: true,
      renders: [...activeList, ...renderList],
      userMediaDir: rendersDir
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});
app.delete("/api/renders/:filename", async (req, res) => {
  const filename = path.basename(req.params.filename);
  if (!filename || !filename.endsWith(".mp4")) {
    return res.status(400).json({
      ok: false,
      error: "Nombre de archivo inválido."
    });
  }
  try {
    await Promise.all([fs.rm(path.join(rendersDir, filename), {
      force: true
    }), fs.rm(path.join(legacyRendersDir, filename), {
      force: true
    })]);
    res.json({
      ok: true,
      filename
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/render", async (req, res) => {
  const body = req.body || {};
  const force = Boolean(body.force);
  if (renderBusy) {
    const now = Date.now();
    const stalled = currentRenderJob && now - (currentRenderJob.lastProgressAt || currentRenderJob.startTime) > 900000;
    if (force || stalled) {
      console.warn("[Render] " + (force ? "Forzando inicio de nuevo render" : "Render previo inactivo/estancado detectado") + ". Cancelando proceso anterior...");
      await cancelActiveRender(currentRenderJob?.jobId, "Cancelado para iniciar nuevo render.");
      await new Promise(resolve => setTimeout(resolve, 300));
    } else {
      return res.status(409).json({
        ok: false,
        error: "Ya existe un render en proceso. Espera a que termine."
      });
    }
  }
  const scenes = Array.isArray(body.scenes) ? body.scenes : [];
  const fps = Number(body.fps || 30);
  const totalDuration = scenes.reduce((sum, scene) => sum + Number(scene.duration || 0), 0);
  if (!scenes.length || scenes.length > 2000) {
    return res.status(400).json({
      ok: false,
      error: "El proyecto debe contener entre 1 y 2000 escenas."
    });
  }
  if (!Number.isFinite(fps) || fps < 24 || fps > 60) {
    return res.status(400).json({
      ok: false,
      error: "Los FPS deben estar entre 24 y 60."
    });
  }
  if (scenes.some(scene => !Number.isFinite(Number(scene.duration)) || Number(scene.duration) < 0.1 || Number(scene.duration) > 600) || totalDuration > 14400) {
    return res.status(400).json({
      ok: false,
      error: "Cada escena debe durar entre 0.1 y 600 segundos y el proyecto no puede superar 4 horas."
    });
  }
  const jobId = body.jobId || crypto.randomUUID();
  activeRenders.set(jobId, {
    status: "preparing",
    progress: 5,
    message: "Preparando recursos multimedia...",
    startTime: Date.now()
  });
  res.json({
    ok: true,
    jobId,
    message: "Render iniciado exitosamente."
  });
  (async () => {
    renderBusy = true;
    currentRenderJob = {
      jobId,
      startTime: Date.now(),
      lastProgressAt: Date.now(),
      cancel: null
    };
    const outputFilename = projectName(body) + "-" + jobId.slice(0, 8) + ".mp4";
    const outputPath = path.join(rendersDir, outputFilename);
    const jobAssetDir = path.join(assetsDir, jobId);
    const jobWorkDir = path.join(workRoot, jobId);
    let succeeded = false;
    try {
      const materializedScenes = await materializeScenes({
        scenes,
        assetDir: jobAssetDir,
        jobId,
        baseUrl: "http://127.0.0.1:4322"
      });
      const narrationPath = await materializeAudio({
        audioTrack: body.audioTrack,
        assetDir: jobAssetDir,
        filename: "narration-track"
      });
      const musicPath = await materializeAudio({
        audioTrack: body.musicTrack,
        assetDir: jobAssetDir,
        filename: "music-track"
      });
      const materializedOverlays = await materializeOverlays({
        overlays: body.overlays || [],
        assetDir: jobAssetDir,
        jobId,
        baseUrl: "http://127.0.0.1:4322"
      });
      if (body.audioTrack?.url && !narrationPath) {
        throw new Error("No se encontró la pista de audio del proyecto. Vuelve a cargar el MP3 antes de renderizar.");
      }
      const projectPayload = {
        ...body,
        overlays: materializedOverlays,
        ...(narrationPath ? {
          audioTrack: {
            ...body.audioTrack,
            url: "http://127.0.0.1:4322/assets/" + jobId + "/" + encodeURIComponent(path.basename(narrationPath))
          }
        } : {}),
        ...(musicPath ? {
          musicTrack: {
            ...body.musicTrack,
            url: "http://127.0.0.1:4322/assets/" + jobId + "/" + encodeURIComponent(path.basename(musicPath))
          }
        } : {})
      };
      activeRenders.set(jobId, {
        status: "rendering",
        progress: 12,
        message: "Iniciando motor de render...",
        startTime: Date.now()
      });
      if (body.engine === "remotion") {
        await renderWithRemotion({
          rootDir,
          scenes: materializedScenes,
          project: projectPayload,
          outputPath,
          onCancelRegistered: cancelFn => {
            if (currentRenderJob && currentRenderJob.jobId === jobId) {
              currentRenderJob.cancel = cancelFn;
            }
          },
          onProgress: (percent, stats) => {
            const clampedPercent = Math.min(99, Math.max(12, 12 + Math.round(percent * 0.87)));
            if (currentRenderJob && currentRenderJob.jobId === jobId) {
              currentRenderJob.lastProgressAt = Date.now();
            }
            const totalFrames = stats?.totalFrames || 1;
            const renderedFrames = stats?.renderedFrames ?? 0;
            const encodedFrames = stats?.encodedFrames ?? 0;
            const stitchStage = stats?.stitchStage || (renderedFrames >= totalFrames ? "encoding" : "rendering");
            const isEncodingPhase = renderedFrames >= totalFrames || stitchStage === "encoding" || stitchStage === "muxing" || encodedFrames > 0;
            let progressMessage;
            if (stitchStage === "muxing") {
              progressMessage = "Ensamblando y sincronizando audio final (" + clampedPercent + "%)...";
            } else if (isEncodingPhase) {
              progressMessage = encodedFrames > 0 ? "Codificando video final: " + clampedPercent + "% (" + encodedFrames + "/" + totalFrames + " fotogramas)" : "Ensamblando video final (" + clampedPercent + "%)...";
            } else {
              progressMessage = "Renderizando fotogramas: " + clampedPercent + "% (" + renderedFrames + "/" + totalFrames + ")";
            }
            activeRenders.set(jobId, {
              status: "rendering",
              progress: clampedPercent,
              renderedFrames,
              encodedFrames,
              totalFrames,
              stitchStage,
              message: progressMessage,
              lastActivityAt: Date.now()
            });
          }
        });
      } else {
        if (currentRenderJob && currentRenderJob.jobId === jobId) {
          currentRenderJob.cancel = cancelActiveFfmpeg;
        }
        await renderWithFfmpeg({
          scenes: materializedScenes,
          outputPath,
          workDir: jobWorkDir,
          format: body.format,
          fps: Number(body.fps || 30),
          audioPath: narrationPath,
          musicPath,
          musicVolume: body.musicTrack?.volume ?? 0.1,
          musicLoop: body.musicTrack?.loop !== false,
          resolution: projectPayload.resolution || "1080p",
          onProgress: (percent, message) => {
            if (currentRenderJob && currentRenderJob.jobId === jobId) {
              currentRenderJob.lastProgressAt = Date.now();
            }
            activeRenders.set(jobId, {
              status: "rendering",
              progress: percent,
              message,
              lastActivityAt: Date.now()
            });
          }
        });
      }
      succeeded = true;
      const renderUrl = "http://127.0.0.1:4322/renders/" + encodeURIComponent(outputFilename);
      activeRenders.set(jobId, {
        status: "done",
        progress: 100,
        message: "¡Video listo para descargar!",
        url: renderUrl,
        filename: outputFilename
      });
    } catch (err) {
      console.error("[Render Error]:", err);
      const wasCancelled = err?.message?.toLowerCase().includes("cancel") || err?.message?.toLowerCase().includes("abort");
      activeRenders.set(jobId, {
        status: wasCancelled ? "cancelled" : "error",
        progress: 0,
        error: err.message,
        message: wasCancelled ? "Render cancelado." : "Error: " + err.message
      });
    } finally {
      renderBusy = false;
      if (currentRenderJob && currentRenderJob.jobId === jobId) {
        currentRenderJob = null;
      }
      if (!succeeded) {
        await fs.rm(outputPath, {
          force: true
        }).catch(() => {});
      }
      await Promise.all([fs.rm(jobAssetDir, {
        recursive: true,
        force: true
      }), fs.rm(jobWorkDir, {
        recursive: true,
        force: true
      })]).catch(() => {});
    }
  })();
});
app.get("/api/auth/hwid", (req, res) => {
  try {
    const hwid = getMachineHWID();
    res.json({
      ok: true,
      hwid
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/auth/login", async (req, res) => {
  const {
    usernameOrEmail,
    password,
    hwid
  } = req.body || {};
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";
  const resolvedHwid = hwid || getMachineHWID();
  if (!usernameOrEmail || !password) {
    return res.status(400).json({
      ok: false,
      error: "Ingresa usuario/correo y contraseña."
    });
  }
  try {
    const user = await getUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      await logAccess({
        username: usernameOrEmail,
        hwid: resolvedHwid,
        ip,
        status: "user_not_found"
      });
      return res.status(401).json({
        ok: false,
        error: "Usuario o contraseña incorrectos."
      });
    }
    if (user.passwordHash !== hashPassword(password)) {
      await logAccess({
        userId: user.id,
        username: user.username,
        hwid: resolvedHwid,
        ip,
        status: "invalid_password"
      });
      return res.status(401).json({
        ok: false,
        error: "Usuario o contraseña incorrectos."
      });
    }
    if (user.status === "banned") {
      await logAccess({
        userId: user.id,
        username: user.username,
        hwid: resolvedHwid,
        ip,
        status: "banned",
        details: "Intento de inicio de cuenta suspendida"
      });
      return res.status(403).json({
        ok: false,
        error: "Esta cuenta ha sido suspendida. Contacta al Administrador."
      });
    }
    if (user.role !== "admin" && user.licenseExpiresAt && user.licenseExpiresAt < Date.now()) {
      return res.status(403).json({
        ok: false,
        error: "Tu licencia ha expirado. Renueva tu suscripción para continuar."
      });
    }
    if (user.role !== "admin") {
      if (!user.hwid) {
        await updateUser(user.id, {
          hwid: resolvedHwid
        });
        user.hwid = resolvedHwid;
      } else if (user.hwid !== resolvedHwid) {
        await logAccess({
          userId: user.id,
          username: user.username,
          hwid: resolvedHwid,
          ip,
          status: "hwid_mismatch",
          details: "Esperado: " + user.hwid + ", Recibido: " + resolvedHwid
        });
        return res.status(403).json({
          ok: false,
          error: "🚫 Bloqueo de Seguridad: Esta cuenta está vinculada a otra computadora (HWID: " + user.hwid.slice(0, 12) + "...). Contacta al Administrador para un Reset de HWID."
        });
      }
    }
    await updateUser(user.id, {
      lastLoginAt: Date.now(),
      lastLoginIp: ip
    });
    await logAccess({
      userId: user.id,
      username: user.username,
      hwid: resolvedHwid,
      ip,
      status: "success"
    });
    const {
      passwordHash,
      ...publicUser
    } = user;
    const token = issueSession(user);
    res.json({
      ok: true,
      user: publicUser,
      token
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/auth/activate", async (req, res) => {
  const {
    licenseKey,
    hwid
  } = req.body || {};
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";
  const resolvedHwid = hwid || getMachineHWID();
  if (!licenseKey) {
    return res.status(400).json({
      ok: false,
      error: "Introduce tu clave de licencia."
    });
  }
  try {
    try {
      const gatewayResult = await remoteGatewayRequest("activate", {
        licenseKey,
        hwid: resolvedHwid
      });
      await logAccess({
        userId: gatewayResult.user.id,
        username: gatewayResult.user.username,
        hwid: resolvedHwid,
        ip,
        status: "success",
        details: "Activación remota Supabase"
      }).catch(() => {});
      return res.json({
        ok: true,
        user: gatewayResult.user,
        token: issueSession(gatewayResult.user),
        license: gatewayResult.license
      });
    } catch (gatewayErr) {
      try {
        const adminLoginResult = await remoteGatewayRequest("admin-login", {
          key: licenseKey
        });
        return res.json({
          ok: true,
          user: adminLoginResult.user,
          token: issueSession(adminLoginResult.user, {
            gatewayToken: adminLoginResult.adminToken
          })
        });
      } catch (adminLoginErr) {
        console.warn("[Gateway] Activación remota no disponible, usando respaldo local: " + gatewayErr.message);
      }
    }
    const adminHash = configuredAdminKeyHash();
    if (adminHash) {
      const providedKeyHash = Buffer.from(hashAdminKey(licenseKey));
      const expectedKeyHash = Buffer.from(adminHash);
      if (providedKeyHash.length === expectedKeyHash.length && crypto.timingSafeEqual(providedKeyHash, expectedKeyHash)) {
        const adminUser = {
          id: "admin-master",
          username: "flowstudio-admin",
          role: "admin",
          status: "active",
          licensePlan: "Master",
          licenseExpiresAt: null,
          hwid: null
        };
        await logAccess({
          username: adminUser.username,
          hwid: resolvedHwid,
          ip,
          status: "admin_success",
          details: "Acceso admin por clave maestra"
        });
        return res.json({
          ok: true,
          user: adminUser,
          token: issueSession(adminUser)
        });
      }
    }
    const activationResult = await activateLicense(licenseKey, resolvedHwid);
    await logAccess({
      userId: activationResult.user.id,
      username: activationResult.user.username,
      hwid: resolvedHwid,
      ip,
      status: "success",
      details: "Activación de licencia"
    });
    res.json({
      ok: true,
      user: activationResult.user,
      token: issueSession(activationResult.user),
      license: activationResult.license
    });
  } catch (err) {
    await logAccess({
      hwid: resolvedHwid,
      ip,
      status: "license_error",
      details: err.message
    });
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/auth/admin-login", async (req, res) => {
  const {
    key
  } = req.body || {};
  try {
    const gatewayResult = await remoteGatewayRequest("admin-login", {
      key
    });
    return res.json({
      ok: true,
      user: gatewayResult.user,
      token: issueSession(gatewayResult.user, {
        gatewayToken: gatewayResult.adminToken
      })
    });
  } catch (err) {
    console.warn("[Gateway] Login remoto no disponible, usando respaldo local: " + err.message);
  }
  const adminHash = configuredAdminKeyHash();
  if (!adminHash) {
    return res.status(503).json({
      ok: false,
      error: "El acceso de administrador no está configurado en el servidor."
    });
  }
  const providedKeyHash = Buffer.from(hashAdminKey(key));
  const expectedKeyHash = Buffer.from(adminHash);
  if (providedKeyHash.length !== expectedKeyHash.length || !crypto.timingSafeEqual(providedKeyHash, expectedKeyHash)) {
    await logAccess({
      username: "admin",
      ip: req.ip || req.socket.remoteAddress,
      status: "invalid_admin_key"
    });
    return res.status(401).json({
      ok: false,
      error: "Clave maestra incorrecta."
    });
  }
  const adminUser = {
    id: "admin-master",
    username: "flowstudio-admin",
    role: "admin",
    status: "active",
    licensePlan: "Master",
    licenseExpiresAt: null,
    hwid: null
  };
  res.json({
    ok: true,
    user: adminUser,
    token: issueSession(adminUser)
  });
});
app.post("/api/auth/register", async (req, res) => {
  const {
    username,
    email,
    password,
    licenseKey,
    hwid
  } = req.body || {};
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";
  const resolvedHwid = hwid || getMachineHWID();
  if (!username || !password || !licenseKey) {
    return res.status(400).json({
      ok: false,
      error: "Usuario, contraseña y clave de licencia son obligatorios."
    });
  }
  try {
    const licenses = await getLicenses();
    const normalizedKey = String(licenseKey).trim().toUpperCase();
    const license = licenses.find(item => item.key.toUpperCase() === normalizedKey);
    if (!license) {
      return res.status(400).json({
        ok: false,
        error: "Clave de licencia inválida o inexistente."
      });
    }
    if (license.isRedeemed) {
      return res.status(400).json({
        ok: false,
        error: "Esta clave de licencia ya ha sido canjeada anteriormente."
      });
    }
    const user = await createUser({
      username,
      email,
      password,
      role: "user",
      licensePlan: license.plan,
      durationDays: license.durationDays,
      maxAccounts: license.maxAccounts,
      hwid: resolvedHwid
    });
    await redeemLicense(normalizedKey, user.id);
    await logAccess({
      userId: user.id,
      username: user.username,
      hwid: resolvedHwid,
      ip,
      status: "success",
      details: "Registro con licencia " + normalizedKey
    });
    const token = issueSession(user);
    res.json({
      ok: true,
      user,
      token
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/auth/redeem-license", async (req, res) => {
  const {
    userId,
    licenseKey
  } = req.body || {};
  if (!userId || !licenseKey) {
    return res.status(400).json({
      ok: false,
      error: "Datos incompletos."
    });
  }
  try {
    const result = await redeemLicense(licenseKey, userId);
    res.json({
      ok: true,
      ...result
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.get("/api/download/latest", async (req, res) => {
  try {
    const buildOutputDir = path.join(rootDir, "build-output");
    const files = await fs.readdir(buildOutputDir);
    const installerFiles = files.filter(name => name.startsWith("FLOWSTUDIO_Setup_") && name.endsWith(".exe") && !name.includes("__uninstaller")).sort((a, b) => b.localeCompare(a, undefined, {
      numeric: true
    }));
    const installerName = installerFiles[0] || "FLOWSTUDIO_Setup_1.3.5_x64.exe";
    const installerPath = path.join(buildOutputDir, installerName);
    await fs.access(installerPath);
    res.download(installerPath, installerName);
  } catch (err) {
    res.status(404).json({
      ok: false,
      error: "Instalador local no encontrado."
    });
  }
});
app.get("/api/updates", async (req, res) => {
  if (!supabaseEnabled) {
    try {
      return res.json(await remoteGatewayGet("updates"));
    } catch (err) {
      return res.status(503).json({
        ok: false,
        error: "Servicio de actualizaciones no disponible."
      });
    }
  }
  try {
    res.json({
      ok: true,
      updates: await sbGetPublishedUpdates()
    });
  } catch (err) {
    res.status(503).json({
      ok: false,
      error: "Servicio de actualizaciones no disponible."
    });
  }
});
app.use("/api/admin", requireAuth("admin"));
app.get("/api/admin/updates", async (req, res) => {
  if (!supabaseEnabled) {
    try {
      return res.json(await remoteGatewayGet("updates"));
    } catch (err) {
      return res.status(503).json({
        ok: false,
        error: "Servicio de actualizaciones no disponible."
      });
    }
  }
  try {
    res.json({
      ok: true,
      updates: await sbGetPublishedUpdates()
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/admin/updates", async (req, res) => {
  if (!supabaseEnabled) {
    try {
      return res.json(await remoteAdminRequest(req, "updates/create", req.body || {}));
    } catch (err) {
      return res.status(503).json({
        ok: false,
        error: err.message
      });
    }
  }
  try {
    res.json({
      ok: true,
      update: await sbCreateUpdate(req.body || {})
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.get("/api/admin/stats", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "stats"));
    }
    const stats = await getSystemStats();
    res.json({
      ok: true,
      stats
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});
app.get("/api/admin/users", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "users"));
    }
    const users = await getUsers();
    res.json({
      ok: true,
      users
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/admin/users/create", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "users/create", req.body || {}));
    }
    const user = await createUser(req.body || {});
    res.json({
      ok: true,
      user
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/admin/users/:id/update", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "users/" + req.params.id + "/update", req.body || {}));
    }
    const user = await updateUser(req.params.id, req.body || {});
    res.json({
      ok: true,
      user
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/admin/users/:id/reset-hwid", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "users/" + req.params.id + "/reset-hwid"));
    }
    const user = await updateUser(req.params.id, {
      hwid: null
    });
    res.json({
      ok: true,
      user,
      message: "HWID liberado con éxito. El usuario podrá vincular su nueva PC al iniciar sesión."
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/admin/users/:id/toggle-ban", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "users/" + req.params.id + "/toggle-ban"));
    }
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado."
      });
    }
    if (user.role === "admin") {
      return res.status(400).json({
        ok: false,
        error: "No se puede suspender una cuenta Administrador."
      });
    }
    const newStatus = user.status === "banned" ? "active" : "banned";
    const updatedUser = await updateUser(user.id, {
      status: newStatus
    });
    res.json({
      ok: true,
      user: updatedUser
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/admin/users/:id/extend", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "users/" + req.params.id + "/extend", req.body || {}));
    }
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado."
      });
    }
    const days = Number(req.body?.days) || 3;
    const currentExpiresAtMs = user.licenseExpiresAt ? new Date(user.licenseExpiresAt).getTime() : Date.now();
    const baseTimeMs = Math.max(Date.now(), currentExpiresAtMs);
    const newExpiresAt = new Date(baseTimeMs + days * 86400000).toISOString();
    const updatedUser = await updateUser(user.id, {
      licenseExpiresAt: newExpiresAt,
      status: "active"
    });
    res.json({
      ok: true,
      user: updatedUser,
      newExpiresAt
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.delete("/api/admin/users/:id", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "users/" + req.params.id + "/delete"));
    }
    await deleteUser(req.params.id);
    res.json({
      ok: true,
      message: "Usuario eliminado con éxito."
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.get("/api/admin/licenses", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "licenses"));
    }
    const licenses = await getLicenses();
    res.json({
      ok: true,
      licenses
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/admin/licenses/generate", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "licenses/generate", req.body || {}));
    }
    const licenses = await generateLicenses(req.body || {});
    res.json({
      ok: true,
      licenses
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.delete("/api/admin/licenses/:key", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "licenses/" + encodeURIComponent(req.params.key) + "/delete"));
    }
    await deleteLicense(req.params.key);
    res.json({
      ok: true
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.get("/api/admin/logs", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "logs"));
    }
    const logs = await getAccessLogs();
    res.json({
      ok: true,
      logs
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/admin/licenses/:key/update", async (req, res) => {
  try {
    if (!supabaseEnabled) {
      return res.json(await remoteAdminRequest(req, "licenses/" + encodeURIComponent(req.params.key) + "/update", req.body || {}));
    }
    const license = await updateLicense(req.params.key, req.body || {});
    res.json({
      ok: true,
      license
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    });
  }
});
app.post("/api/export/capcut", async (req, res) => {
  try {
    const {
      project,
      draftName
    } = req.body || {};
    if (!project) {
      return res.status(400).json({
        ok: false,
        error: "Falta el objeto de proyecto a exportar."
      });
    }
    const result = await exportToCapCutDraft({
      project,
      draftName,
      rootDir
    });
    return res.json({
      ok: true,
      ...result
    });
  } catch (err) {
    console.error("[CapCut] Error al exportar borrador:", err);
    return res.status(500).json({
      ok: false,
      error: String(err.message || err)
    });
  }
});
app.use(express.static(distDir, {
  index: false,
  maxAge: "1h"
}));
app.get(/^(?!\/api\/|\/assets\/|\/renders\/|\/library\/).*/, (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});
process.on("uncaughtException", err => {
  console.error("[Server UncaughtException]", err.stack || err.message);
});
process.on("unhandledRejection", err => {
  console.error("[Server UnhandledRejection]", err?.stack || err?.message || err);
});
const server = app.listen(serverPort, "127.0.0.1", () => {
  console.log("FlowTube server: http://127.0.0.1:" + serverPort);
  getFfmpegInfo().then(ffmpegInfo => {
    if (ffmpegInfo.available) {
      console.log("[FFmpeg] ✅ Binario detectado: " + ffmpegInfo.version + " (" + ffmpegInfo.path + ")");
    } else {
      console.warn("[FFmpeg] ⚠️ ADVERTENCIA: FFmpeg no detectado (" + ffmpegInfo.error + "). El renderizado local de video fallará.");
    }
  }).catch(() => {});
});
server.on("error", err => {
  if (err.code === "EADDRINUSE") {
    console.log("Port " + serverPort + " is already listening.");
  } else {
    console.error("Server error:", err);
  }
});
const shutdown = () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);