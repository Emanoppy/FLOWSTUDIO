import fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = process.env.FLOWTUBE_DATA_ROOT ? path.resolve(process.env.FLOWTUBE_DATA_ROOT) : rootDir;
const userOutputDir = process.env.FLOWSTUDIO_OUTPUT_DIR ? path.resolve(process.env.FLOWSTUDIO_OUTPUT_DIR) : null;
const userImagesDir = userOutputDir ? path.join(userOutputDir, "Imagenes") : null;
const userAudiosDir = userOutputDir ? path.join(userOutputDir, "Audios") : null;
const runtimeLibraryDir = path.join(dataRoot, "runtime", "library");
const readLibraryFile = async relativePath => {
  const candidatePaths = [userImagesDir ? path.join(userImagesDir, relativePath) : null, userAudiosDir ? path.join(userAudiosDir, relativePath) : null, path.join(runtimeLibraryDir, relativePath)].filter(Boolean);
  for (const candidatePath of candidatePaths) {
    try {
      return await fsPromises.readFile(candidatePath);
    } catch (err) {}
  }
  return null;
};
const extensionFor = (mimeType, fallbackExt = ".jpg") => ({
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
  "audio/mpeg": ".mp3",
  "audio/mp3": ".mp3",
  "audio/wav": ".wav",
  "audio/x-wav": ".wav",
  "audio/mp4": ".m4a",
  "audio/x-m4a": ".m4a",
  "audio/aac": ".aac",
  "audio/ogg": ".ogg",
  "audio/webm": ".webm",
  "audio/flac": ".flac"
})[mimeType?.split(";")[0]] || fallbackExt;
const safeName = input => String(input || "video").normalize("NFKD").replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70) || "video";
export const projectName = project => safeName(project.title);
const allowedRemote = urlString => {
  try {
    const parsedUrl = new URL(urlString, "http://127.0.0.1:4322");
    if (parsedUrl.pathname.startsWith("/library/") || parsedUrl.pathname.startsWith("/assets/")) {
      return true;
    }
    if (["127.0.0.1", "localhost"].includes(parsedUrl.hostname)) {
      return true;
    }
    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
const readLimited = async (response, maxBytes = 125829120) => {
  const contentLength = Number(response.headers.get("content-length") || 0);
  if (contentLength > maxBytes) {
    throw new Error("El medio remoto supera el limite de 120 MB.");
  }
  const chunks = [];
  let totalBytes = 0;
  const reader = response.body.getReader();
  while (true) {
    const {
      done: done,
      value: value
    } = await reader.read();
    if (done) {
      break;
    }
    totalBytes += value.byteLength;
    if (totalBytes > maxBytes) {
      await reader.cancel();
      throw new Error("El medio remoto supera el limite de 120 MB.");
    }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
};
const isValidVideoBuffer = buffer => {
  if (!buffer || buffer.length < 32) {
    return false;
  }
  const headText = buffer.subarray(0, 512).toString("utf8").toLowerCase();
  if (headText.includes("<!doctype") || headText.includes("<html") || headText.includes("<body") || headText.includes("try{") || headText.includes("_._f_") || headText.startsWith("{\"error\"")) {
    return false;
  }
  const hasMp4Marker = buffer.subarray(4, 12).toString("ascii").includes("ftyp") || buffer.subarray(4, 12).toString("ascii").includes("moov") || buffer.subarray(4, 12).toString("ascii").includes("mdat");
  const isWebm = buffer[0] === 26 && buffer[1] === 69 && buffer[2] === 223 && buffer[3] === 163;
  return hasMp4Marker || isWebm;
};
export const materializeScenes = async ({
  scenes: scenes,
  assetDir: assetDir,
  jobId: jobId,
  baseUrl: baseUrl
}) => {
  await fsPromises.mkdir(assetDir, {
    recursive: true
  });
  const materializedScenes = [];
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const sourceUrl = String(scene.videoUrl || scene.imageUrl || "").trim();
    if (!sourceUrl) {
      continue;
    }
    let fileBuffer;
    let fileExt = ".jpg";
    let sourceType = scene.videoUrl ? "video" : "image";
    if (sourceUrl.startsWith("data:")) {
      const dataUrlMatch = sourceUrl.match(/^data:([^;,]+);base64,(.+)$/s);
      if (!dataUrlMatch) {
        throw new Error("La escena " + (i + 1) + " contiene un archivo local invalido.");
      }
      fileBuffer = Buffer.from(dataUrlMatch[2], "base64");
      fileExt = extensionFor(dataUrlMatch[1], sourceType === "video" ? ".mp4" : ".jpg");
    } else {
      const libraryPathMatch = sourceUrl.match(/\/library\/([^?#]+)/);
      if (libraryPathMatch) {
        const libraryRelPath = decodeURIComponent(libraryPathMatch[1]);
        fileBuffer = await readLibraryFile(libraryRelPath);
        if (!fileBuffer) {
          const libraryFetchUrl = sourceUrl.startsWith("http") ? sourceUrl : "http://127.0.0.1:4322" + sourceUrl;
          const libraryFetchResponse = await fetch(libraryFetchUrl);
          if (!libraryFetchResponse.ok) {
            throw new Error("No se pudo leer el archivo local de la escena " + (i + 1) + ": HTTP " + libraryFetchResponse.status);
          }
          fileBuffer = Buffer.from(await libraryFetchResponse.arrayBuffer());
        }
        fileExt = path.extname(libraryRelPath) || (sourceType === "video" ? ".mp4" : ".jpg");
      } else {
        if (!allowedRemote(sourceUrl)) {
          throw new Error("La URL de la escena " + (i + 1) + " (" + sourceUrl.slice(0, 40) + ") no es un host permitido.");
        }
        const remoteFetchResponse = await fetch(sourceUrl, {
          redirect: "follow",
          signal: AbortSignal.timeout(45000)
        });
        if (!remoteFetchResponse.ok) {
          throw new Error("No se pudo descargar la imagen de la escena " + (i + 1) + ": HTTP " + remoteFetchResponse.status);
        }
        const remoteContentType = remoteFetchResponse.headers.get("content-type") || "";
        fileBuffer = await readLimited(remoteFetchResponse);
        fileExt = extensionFor(remoteContentType, sourceType === "video" ? ".mp4" : ".jpg");
        if (remoteContentType.startsWith("video/")) {
          sourceType = "video";
        }
      }
    }
    if (sourceType === "video" && !isValidVideoBuffer(fileBuffer)) {
      console.warn("[Render] ⚠️ Video de escena " + (i + 1) + " no es un archivo de video válido (posible HTML o sesión expirada).");
      if (scene.imageUrl) {
        console.warn("[Render] ↪️ Usando la imagen estática de respaldo en escena " + (i + 1) + " para no interrumpir el render.");
        sourceType = "image";
        const fallbackImageUrl = String(scene.imageUrl).trim();
        let fallbackImageBuffer = null;
        if (fallbackImageUrl.startsWith("data:")) {
          const fallbackDataUrlMatch = fallbackImageUrl.match(/^data:([^;,]+);base64,(.+)$/s);
          if (fallbackDataUrlMatch) {
            fallbackImageBuffer = Buffer.from(fallbackDataUrlMatch[2], "base64");
            fileExt = extensionFor(fallbackDataUrlMatch[1], ".jpg");
          }
        } else {
          const fallbackLibraryPathMatch = fallbackImageUrl.match(/\/library\/([^?#]+)/);
          if (fallbackLibraryPathMatch) {
            const fallbackLibraryRelPath = decodeURIComponent(fallbackLibraryPathMatch[1]);
            fallbackImageBuffer = await readLibraryFile(fallbackLibraryRelPath);
            fileExt = path.extname(fallbackLibraryRelPath) || ".jpg";
          }
          if (!fallbackImageBuffer && allowedRemote(fallbackImageUrl)) {
            try {
              const fallbackImageFetchResponse = await fetch(fallbackImageUrl, {
                redirect: "follow",
                signal: AbortSignal.timeout(30000)
              });
              if (fallbackImageFetchResponse.ok) {
                fallbackImageBuffer = await readLimited(fallbackImageFetchResponse);
                fileExt = extensionFor(fallbackImageFetchResponse.headers.get("content-type"), ".jpg");
              }
            } catch (err) {}
          }
        }
        if (fallbackImageBuffer && fallbackImageBuffer.length > 0) {
          fileBuffer = fallbackImageBuffer;
        } else {
          throw new Error("El video de la escena " + (i + 1) + " no es un video válido y no se pudo recuperar su imagen.");
        }
      } else {
        throw new Error("El archivo de la escena " + (i + 1) + " no es un video MP4 válido (Google devolvió página HTML en vez de video).");
      }
    }
    const fileName = "scene-" + String(i + 1).padStart(3, "0") + fileExt;
    const filePath = path.join(assetDir, fileName);
    await fsPromises.writeFile(filePath, fileBuffer);
    materializedScenes.push({
      ...scene,
      sourceType: sourceType,
      localPath: filePath,
      publicSource: baseUrl + "/assets/" + jobId + "/" + fileName
    });
  }
  if (!materializedScenes.length) {
    throw new Error("El proyecto no contiene medios renderizables.");
  }
  if (materializedScenes.length !== scenes.length) {
    throw new Error("Faltan imágenes: " + materializedScenes.length + " de " + scenes.length + " escenas tienen imagen.");
  }
  return materializedScenes;
};
export const materializeAudio = async ({
  audioTrack: audioTrack,
  assetDir: assetDir,
  filename = "audio-track"
}) => {
  if (!audioTrack?.url) {
    return null;
  }
  const sourceUrl = String(audioTrack.url || "").trim();
  let fileBuffer;
  const urlExt = path.extname(sourceUrl.split(/[?#]/)[0]) || ".mp3";
  const fileExt = extensionFor(audioTrack.mime, urlExt);
  if (sourceUrl.startsWith("data:")) {
    const dataUrlMatch = sourceUrl.match(/^data:([^;,]+);base64,(.+)$/s);
    if (!dataUrlMatch) {
      return null;
    }
    fileBuffer = Buffer.from(dataUrlMatch[2], "base64");
  } else {
    const libraryPathMatch = sourceUrl.match(/\/library\/([^?#]+)/);
    if (libraryPathMatch) {
      const libraryRelPath = decodeURIComponent(libraryPathMatch[1]);
      fileBuffer = await readLibraryFile(libraryRelPath);
      if (!fileBuffer) {
        const fetchUrl = sourceUrl.startsWith("http") ? sourceUrl : "http://127.0.0.1:4322" + sourceUrl;
        const fetchResponse = await fetch(fetchUrl);
        if (fetchResponse.ok) {
          fileBuffer = Buffer.from(await fetchResponse.arrayBuffer());
        }
      }
    } else {
      if (!allowedRemote(sourceUrl)) {
        return null;
      }
      const remoteResponse = await fetch(sourceUrl, {
        redirect: "follow",
        signal: AbortSignal.timeout(45000)
      });
      if (remoteResponse.ok) {
        fileBuffer = await readLimited(remoteResponse);
      }
    }
  }
  if (!fileBuffer) {
    return null;
  }
  const filePath = path.join(assetDir, "" + filename + fileExt);
  await fsPromises.writeFile(filePath, fileBuffer);
  return filePath;
};
export const materializeOverlays = async ({
  overlays: overlays,
  assetDir: assetDir,
  jobId: jobId,
  baseUrl: baseUrl
}) => {
  if (!Array.isArray(overlays) || !overlays.length) {
    return [];
  }
  await fsPromises.mkdir(assetDir, {
    recursive: true
  });
  const materializedOverlays = [];
  for (let i = 0; i < overlays.length; i++) {
    const overlay = overlays[i];
    const sourceUrl = String(overlay.imageUrl || "").trim();
    if (!sourceUrl) {
      continue;
    }
    let fileBuffer;
    let fileExt = ".png";
    if (sourceUrl.startsWith("data:")) {
      const dataUrlMatch = sourceUrl.match(/^data:([^;,]+);base64,(.+)$/s);
      if (dataUrlMatch) {
        fileBuffer = Buffer.from(dataUrlMatch[2], "base64");
        fileExt = extensionFor(dataUrlMatch[1], ".png");
      }
    } else {
      const libraryPathMatch = sourceUrl.match(/\/library\/([^?#]+)/);
      if (libraryPathMatch) {
        const libraryRelPath = decodeURIComponent(libraryPathMatch[1]);
        fileBuffer = await readLibraryFile(libraryRelPath);
        if (!fileBuffer) {
          const fetchUrl = sourceUrl.startsWith("http") ? sourceUrl : "http://127.0.0.1:4322" + sourceUrl;
          const fetchResponse = await fetch(fetchUrl);
          if (fetchResponse.ok) {
            fileBuffer = Buffer.from(await fetchResponse.arrayBuffer());
          }
        }
        fileExt = path.extname(libraryRelPath) || ".png";
      } else if (allowedRemote(sourceUrl)) {
        const remoteResponse = await fetch(sourceUrl, {
          redirect: "follow",
          signal: AbortSignal.timeout(30000)
        });
        if (remoteResponse.ok) {
          const contentType = remoteResponse.headers.get("content-type") || "";
          fileBuffer = await readLimited(remoteResponse);
          fileExt = extensionFor(contentType, ".png");
        }
      }
    }
    if (fileBuffer) {
      const fileName = "overlay-" + String(i + 1).padStart(3, "0") + fileExt;
      const filePath = path.join(assetDir, fileName);
      await fsPromises.writeFile(filePath, fileBuffer);
      materializedOverlays.push({
        ...overlay,
        localPath: filePath,
        publicSource: baseUrl + "/assets/" + jobId + "/" + fileName
      });
    } else {
      materializedOverlays.push(overlay);
    }
  }
  return materializedOverlays;
};