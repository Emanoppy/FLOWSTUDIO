import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
const __vite__mapDeps = (indexes, self = __vite__mapDeps, fileList = self.f ||= ["./Dashboard-CtUuoFER.js", "./vendor-react-BbRiLirl.js", "./vendor-state-m3Xdu9cz.js", "./vendor-remotion-D3IpuOk5.js", "./ThumbnailStudio-D5ap8eMV.js", "./AudioStudioView-CIDz6WAG.js", "./AudioStudioContent-CYqgvu51.js", "./AudioStudioModal-BEGLz_Up.js", "./RenderProgressModal-PJg8RyN0.js", "./AccountsModal-QfW0I3wF.js", "./BatchPromptsModal-CbpqNnli.js", "./MaintenanceModal-CilEv2u9.js", "./PreflightModal-Cw9t2V4n.js", "./AutoUpdateModal-Cu6k4Lpq.js", "./ActivationModal-BDSD3qIP.js"]) => indexes.map((index) => fileList[index]);
import { c as create, j as jsxRuntime, r as React, a as ReactDOM, R as ReactLib, b as ReactDOMClient } from "./vendor-react-BbRiLirl.js";
import { A as AbsoluteFill, S as Sequence, H as RemotionAudio, u as useCurrentFrame, i as interpolate, V as RemotionVideo, I as RemotionImg, s as spring, E as Easing, P as Player } from "./vendor-remotion-D3IpuOk5.js";
import "./vendor-state-m3Xdu9cz.js";
(function() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    preloadLink(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const addedNode of mutation.addedNodes) {
          if (addedNode.tagName === "LINK" && addedNode.rel === "modulepreload") {
            preloadLink(addedNode);
          }
        }
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOptions(link) {
    const options = {};
    if (link.integrity) {
      options.integrity = link.integrity;
    }
    if (link.referrerPolicy) {
      options.referrerPolicy = link.referrerPolicy;
    }
    if (link.crossOrigin === "use-credentials") {
      options.credentials = "include";
    } else if (link.crossOrigin === "anonymous") {
      options.credentials = "omit";
    } else {
      options.credentials = "same-origin";
    }
    return options;
  }
  function preloadLink(link) {
    if (link.ep) {
      return;
    }
    link.ep = true;
    const options = getFetchOptions(link);
    fetch(link.href, options);
  }
})();
const yn = "modulepreload";
const vn = function(dep, url) {
  return new URL(dep, url).href;
};
const da = {};
const _e = function(importModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises) {
      return Promise.all(promises.map((promise2) => Promise.resolve(promise2).then((result) => ({
        status: "fulfilled",
        value: result
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    const links = document.getElementsByTagName("link");
    const nonceMeta = document.querySelector("meta[property=csp-nonce]");
    const nonce = (nonceMeta == null ? void 0 : nonceMeta.nonce) || (nonceMeta == null ? void 0 : nonceMeta.getAttribute("nonce"));
    promise = allSettled(deps.map((dep) => {
      dep = vn(dep, importerUrl);
      if (dep in da) {
        return;
      }
      da[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (importerUrl) {
        for (let index = links.length - 1; index >= 0; index--) {
          const link2 = links[index];
          if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
            return;
          }
        }
      } else if (document.querySelector('link[href="' + dep + '"]' + cssSelector)) {
        return;
      }
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : yn;
      if (!isCss) {
        link.as = "script";
      }
      link.crossOrigin = "";
      link.href = dep;
      if (nonce) {
        link.setAttribute("nonce", nonce);
      }
      document.head.appendChild(link);
      if (isCss) {
        return new Promise((resolve, reject) => {
          link.addEventListener("load", resolve);
          link.addEventListener("error", () => reject(new Error("Unable to preload CSS for " + dep)));
        });
      }
    }));
  }
  function handlePreloadError(error) {
    const event = new Event("vite:preloadError", {
      cancelable: true
    });
    event.payload = error;
    window.dispatchEvent(event);
    if (!event.defaultPrevented) {
      throw error;
    }
  }
  return promise.then((results) => {
    for (const result of results || []) {
      if (result.status === "rejected") {
        handlePreloadError(result.reason);
      }
    }
    return importModule().catch(handlePreloadError);
  });
};
function ua(raw) {
  if (!raw || !raw.trim()) {
    return [];
  }
  const text = raw.trim();
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => typeof item == "string" ? item.trim() : item && typeof item == "object" ? (item.prompt || item.visualPrompt || item.description || item.text || JSON.stringify(item)).trim() : String(item).trim()).filter(Boolean);
    }
  } catch {
  }
  if (/(?:^|\n+)(?:#+\s*)?(?:Escena\s*\d+[:\-\s]*|Scene\s*\d+[:\-\s]*|\d+[\.\):\-]\s*)/i.test(text)) {
    const sections = text.split(/(?:^|\n+)(?:#+\s*)?(?:Escena\s*\d+[:\-\s]*|Scene\s*\d+[:\-\s]*|\d+[\.\):\-]\s*)/i).map((section) => section.trim()).filter((section) => section.length > 0);
    if (sections.length > 1) {
      return sections;
    }
  }
  if (text.includes("\n\n")) {
    const blocks = text.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
    if (blocks.length > 1) {
      return blocks.map((block) => block.replace(/^(\d+[\.\):\-]\s*|escena\s*\d+[:\-\s]*|scene\s*\d+[:\-\s]*)/i, "").trim());
    }
  }
  return text.split("\n").map((line) => line.trim()).filter((line) => line.length > 0).map((line) => line.replace(/^(\d+[\.\):\-]\s*|escena\s*\d+[:\-\s]*|scene\s*\d+[:\-\s]*)/i, "").trim()).filter(Boolean);
}
const jn = "flowtube-studio-v2";
const ze = "projects";
const qe = "projects_meta";
const Ve = "project_snapshots";
const ea = "current_active_project_id";
let Je = null;
let Ge = null;
const Xe = () => {
  if (Je) {
    try {
      if (Je.objectStoreNames) {
        return Promise.resolve(Je);
      }
    } catch {
      Je = null;
      Ge = null;
    }
  }
  return Ge || (Ge = new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        Ge = null;
        reject(new Error("Timeout al abrir IndexedDB (posible contenci\xF3n de bloqueo)."));
      }
    }, 4e3);
    const openRequest = indexedDB.open(jn, 3);
    openRequest.onupgradeneeded = (event) => {
      const result = openRequest.result;
      if (!result.objectStoreNames.contains(ze)) {
        result.createObjectStore(ze, {
          keyPath: "id"
        });
      }
      if (!result.objectStoreNames.contains(qe)) {
        result.createObjectStore(qe);
      }
      if (!result.objectStoreNames.contains(Ve)) {
        const objectStore = result.createObjectStore(Ve, {
          keyPath: "id"
        });
        objectStore.createIndex("projectId", "projectId", {
          unique: false
        });
        objectStore.createIndex("createdAt", "createdAt", {
          unique: false
        });
      }
    };
    openRequest.onsuccess = () => {
      clearTimeout(timer);
      if (settled) {
        return;
      }
      settled = true;
      const result = openRequest.result;
      Je = result;
      result.onclose = () => {
        Je = null;
        Ge = null;
      };
      result.onversionchange = () => {
        try {
          result.close();
        } catch {
        }
        Je = null;
        Ge = null;
      };
      resolve(result);
    };
    openRequest.onerror = () => {
      clearTimeout(timer);
      if (!settled) {
        settled = true;
        Je = null;
        Ge = null;
        reject(openRequest.error || new Error("Error desconocido al abrir IndexedDB."));
      }
    };
    openRequest.onblocked = () => {
      console.warn("[projectDb] Base de datos bloqueada temporalmente por otra pesta\xF1a o proceso.");
    };
  }), Ge);
};
const Re = async (project) => {
  if (!project || !project.id) {
    project.id = project.id || crypto.randomUUID();
  }
  const db = await Xe();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction([ze, qe], "readwrite");
      const projectStore = tx.objectStore(ze);
      const metaStore = tx.objectStore(qe);
      const record = {
        ...project,
        updatedAt: Date.now()
      };
      projectStore.put(record);
      metaStore.put(project.id, ea);
      tx.oncomplete = () => resolve(record);
      tx.onerror = () => reject(tx.error || new Error("Error al guardar proyecto."));
      tx.onabort = () => reject(tx.error || new Error("Guardado de proyecto abortado."));
    } catch (error) {
      reject(error);
    }
  });
};
const Sn = async (project, reason = "Copia autom\xE1tica") => {
  if (project == null || !project.id) {
    return null;
  }
  const db = await Xe();
  const snapshot = {
    id: crypto.randomUUID(),
    projectId: project.id,
    title: project.title || "Sin t\xEDtulo",
    reason,
    createdAt: Date.now(),
    project: structuredClone(project)
  };
  await new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(Ve, "readwrite");
      tx.objectStore(Ve).put(snapshot);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Creaci\xF3n de copia abortada."));
    } catch (error) {
      reject(error);
    }
  });
  const snapshots = await wn(project.id);
  await Promise.all(snapshots.slice(20).map((snapshot2) => kn(snapshot2.id)));
  return snapshot;
};
const wn = async (id) => {
  const db = await Xe();
  return (await new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(Ve, "readonly");
      const store = tx.objectStore(Ve);
      const request = id ? store.index("projectId").getAll(id) : store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Lectura de copias abortada."));
    } catch (error) {
      reject(error);
    }
  })).sort((a, b) => b.createdAt - a.createdAt);
};
const kn = async (id) => {
  const db = await Xe();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(Ve, "readwrite");
      tx.objectStore(Ve).delete(id);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Eliminaci\xF3n de copia abortada."));
    } catch (error) {
      reject(error);
    }
  });
};
const lo = async (snapshotId) => {
  const db = await Xe();
  const snapshot = await new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(Ve, "readonly");
      const request = tx.objectStore(Ve).get(snapshotId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Restauraci\xF3n abortada."));
    } catch (error) {
      reject(error);
    }
  });
  if (snapshot != null && snapshot.project) {
    return Re({
      ...snapshot.project,
      updatedAt: Date.now()
    });
  } else {
    return null;
  }
};
const _a = async () => {
  const db = await Xe();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction([ze, qe], "readonly");
      const store = tx.objectStore(ze);
      const metaRequest = tx.objectStore(qe).get(ea);
      metaRequest.onsuccess = () => {
        const result = metaRequest.result;
        if (result) {
          const projectRequest = store.get(result);
          projectRequest.onsuccess = () => resolve(projectRequest.result || null);
          projectRequest.onerror = () => resolve(null);
        } else {
          const request = store.openCursor();
          request.onsuccess = (event) => {
            const result2 = event.target.result;
            resolve(result2 ? result2.value : null);
          };
          request.onerror = () => resolve(null);
        }
      };
      metaRequest.onerror = () => resolve(null);
      tx.onerror = () => resolve(null);
      tx.onabort = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
};
const Cn = async (projectId) => {
  const db = await Xe();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction([ze, qe], "readwrite");
      const projectStore = tx.objectStore(ze);
      const metaStore = tx.objectStore(qe);
      const request = projectStore.get(projectId);
      request.onsuccess = () => {
        if (request.result) {
          metaStore.put(projectId, ea);
        }
        resolve(request.result || null);
      };
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Carga de proyecto abortada."));
    } catch (error) {
      reject(error);
    }
  });
};
const co = async () => {
  const db = await Xe();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(ze, "readonly");
      const request = tx.objectStore(ze).getAll();
      request.onsuccess = () => {
        try {
          const projects = (Array.isArray(request.result) ? request.result : []).filter(Boolean).map((row) => {
            var sceneList;
            var firstScene;
            var sceneList2;
            var firstSceneVideo;
            return {
              id: (row == null ? void 0 : row.id) || crypto.randomUUID(),
              title: (row == null ? void 0 : row.title) || "Sin t\xEDtulo",
              format: (row == null ? void 0 : row.format) || "short",
              visualStyle: (row == null ? void 0 : row.visualStyle) || "western-anime",
              scenesCount: Array.isArray(row == null ? void 0 : row.scenes) ? row.scenes.length : 0,
              thumbnailUrl: ((firstScene = (sceneList = row == null ? void 0 : row.scenes) == null ? void 0 : sceneList[0]) == null ? void 0 : firstScene.imageUrl) || ((firstSceneVideo = (sceneList2 = row == null ? void 0 : row.scenes) == null ? void 0 : sceneList2[0]) == null ? void 0 : firstSceneVideo.videoUrl) || "",
              updatedAt: (row == null ? void 0 : row.updatedAt) || Date.now(),
              createdAt: (row == null ? void 0 : row.createdAt) || (row == null ? void 0 : row.updatedAt) || Date.now()
            };
          });
          projects.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
          resolve(projects);
        } catch (error) {
          console.warn("[projectDb] Error mapeando proyectos:", error);
          resolve([]);
        }
      };
      request.onerror = () => reject(request.error || new Error("Error leyendo proyectos de la base de datos."));
      tx.onerror = () => reject(tx.error || new Error("Error en la transacci\xF3n de lectura."));
      tx.onabort = () => reject(tx.error || new Error("Transacci\xF3n de lectura abortada."));
    } catch (error) {
      reject(error);
    }
  });
};
const Mn = async (id) => {
  const db = await Xe();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction([ze, qe], "readwrite");
      tx.objectStore(ze).delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Eliminaci\xF3n abortada."));
    } catch (error) {
      reject(error);
    }
  });
};
const uo = async (projectId) => {
  const project = await Cn(projectId);
  if (!project) {
    return null;
  }
  const copy = {
    ...project,
    id: crypto.randomUUID(),
    title: (project.title || "Proyecto") + " (Copia)",
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  await Re(copy);
  return copy;
};
const Nn = async () => {
  const activeProject = await _a();
  if (activeProject != null && activeProject.id) {
    return Mn(activeProject.id);
  }
};
const Tn = [{
  id: "title-pop",
  label: "\u{1F4A5} T\xEDtulo Pop Cinem\xE1tico",
  category: "titles",
  hasText: true,
  default: {
    preset: "title-pop",
    text: "\xA1IMPACTANTE!",
    fromMs: 200,
    durationMs: 2400,
    position: "center",
    accentColor: "#d7ff4f"
  }
}, {
  id: "kinetic-text",
  label: "\u26A1 Tipograf\xEDa Cin\xE9tica",
  category: "titles",
  hasText: true,
  default: {
    preset: "kinetic-text",
    text: "EL SECRETO MEJOR GUARDADO",
    fromMs: 150,
    durationMs: 2600,
    position: "center",
    accentColor: "#6366f1"
  }
}, {
  id: "stock-motion-card",
  label: "\u{1F3AC} Stock Motion Cinem\xE1tico (Full)",
  category: "full",
  hasText: true,
  default: {
    preset: "stock-motion-card",
    text: "DATO CLAVE",
    fromMs: 0,
    durationMs: 3500,
    position: "center",
    accentColor: "#8b5cf6"
  }
}, {
  id: "word-highlight",
  label: "\u{1F58D}\uFE0F Palabra Resaltada (Marker)",
  category: "emphasis",
  hasText: true,
  default: {
    preset: "word-highlight",
    text: "\xA1INCRE\xCDBLE!",
    fromMs: 300,
    durationMs: 2e3,
    position: "center",
    accentColor: "#ffd23f"
  }
}, {
  id: "quote-card",
  label: "\u{1F4AC} Tarjeta de Cita / Frase",
  category: "cards",
  hasText: true,
  default: {
    preset: "quote-card",
    text: "La clave del \xE9xito es la disciplina diaria.",
    fromMs: 250,
    durationMs: 3e3,
    position: "center",
    accentColor: "#38bdf8"
  }
}, {
  id: "stat-counter",
  label: "\u{1F4C8} Tarjeta de Estad\xEDstica / Dato",
  category: "cards",
  hasText: true,
  default: {
    preset: "stat-counter",
    text: "+85% DE EFECTIVIDAD",
    fromMs: 200,
    durationMs: 2800,
    position: "center",
    accentColor: "#10b981"
  }
}, {
  id: "subscribe-cta",
  label: "\u{1F514} Suscr\xEDbete (Llamada a la Acci\xF3n)",
  category: "cta",
  hasText: true,
  default: {
    preset: "subscribe-cta",
    text: "SUSCR\xCDBETE PARA M\xC1S",
    fromMs: 300,
    durationMs: 3e3,
    position: "bottom",
    accentColor: "#ef4444"
  }
}, {
  id: "lower-third",
  label: "\u{1F3F7}\uFE0F Tercio Inferior (Lower Third)",
  category: "titles",
  hasText: true,
  default: {
    preset: "lower-third",
    text: "Cap\xEDtulo 01 \xB7 Introducci\xF3n",
    fromMs: 200,
    durationMs: 2800,
    position: "lower-left",
    accentColor: "#d7ff4f"
  }
}, {
  id: "progress-bar",
  label: "\u23F3 Barra de Retenci\xF3n Inferior",
  category: "overlays",
  hasText: false,
  default: {
    preset: "progress-bar",
    text: "",
    fromMs: 0,
    durationMs: 3500,
    position: "bottom",
    accentColor: "#d7ff4f"
  }
}, {
  id: "warning-alert",
  label: "\u26A0\uFE0F Alerta / Advertencia de Impacto",
  category: "emphasis",
  hasText: true,
  default: {
    preset: "warning-alert",
    text: "\xA1ATENCI\xD3N!",
    fromMs: 150,
    durationMs: 2200,
    position: "top",
    accentColor: "#f59e0b"
  }
}];
const pa = (timecode) => {
  const match = String(timecode).trim().match(/^(\d+):([0-5]\d):([0-5]\d)[,.](\d{3})$/);
  if (match) {
    return (Number(match[1]) * 60 * 60 + Number(match[2]) * 60 + Number(match[3])) * 1e3 + Number(match[4]);
  } else {
    return NaN;
  }
};
const ma = (file) => new Promise((resolve) => {
  try {
    const video = document.createElement("video");
    video.preload = "metadata";
    let src = "";
    let isObjectUrl = false;
    if (typeof file == "string") {
      src = file;
    } else if (file instanceof Blob || file instanceof File) {
      src = URL.createObjectURL(file);
      isObjectUrl = true;
    } else {
      return resolve(0);
    }
    const cleanup = () => {
      if (isObjectUrl && src) {
        try {
          URL.revokeObjectURL(src);
        } catch {
        }
      }
    };
    video.onloadedmetadata = () => {
      cleanup();
      const duration = Number(video.duration);
      resolve(Number.isFinite(duration) && duration > 0 ? Number(duration.toFixed(2)) : 0);
    };
    video.onerror = () => {
      cleanup();
      resolve(0);
    };
    setTimeout(() => {
      cleanup();
      resolve(0);
    }, 4e3);
    video.src = src;
  } catch {
    resolve(0);
  }
});
const Kt = (text, startMs, endMs) => {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [];
  }
  const totalMs = Math.max(80, endMs - startMs);
  const weights = words.map((word) => {
    const clean = word.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]/g, "");
    let weight = Math.max(1, clean.length * 0.75 + 1.25);
    if (/[.,!?;:]$/.test(word)) {
      weight += 1.6;
    }
    return weight;
  });
  const totalWeight = weights.reduce((acc, item) => acc + item, 0) || 1;
  let cursorMs = startMs;
  return words.map((word, index) => {
    const spanMs = Math.round(weights[index] / totalWeight * totalMs);
    const wordStartMs = cursorMs;
    const wordEndMs = index === words.length - 1 ? endMs : Math.min(endMs, cursorMs + spanMs);
    cursorMs = wordEndMs;
    return {
      word,
      startMs: wordStartMs,
      endMs: Math.max(wordStartMs + 40, wordEndMs)
    };
  });
};
const La = (text) => String(text || "").replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").trim().split(/\n{2,}/).map((block) => {
  const lines = block.split("\n");
  const timeLineIndex = lines.findIndex((line) => line.includes("-->"));
  if (timeLineIndex < 0) {
    return null;
  }
  const [startRaw, endRaw] = lines[timeLineIndex].split("-->");
  const startMs = pa(startRaw);
  const endMs = pa(endRaw == null ? void 0 : endRaw.trim().split(/\s+/)[0]);
  const text2 = lines.slice(timeLineIndex + 1).join("\n").trim();
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs || !text2) {
    return null;
  }
  const words = Kt(text2, startMs, endMs);
  return {
    id: crypto.randomUUID(),
    startMs,
    endMs,
    text: text2,
    words
  };
}).filter(Boolean).sort((a, b) => a.startMs - b.startMs);
const In = (text) => {
  try {
    const parsed = typeof text == "string" ? JSON.parse(text) : text;
    const segments = parsed.segments || (Array.isArray(parsed) ? parsed : []);
    const cues = [];
    for (const segment of segments) {
      const startMs = Math.round(Number(segment.start || 0) * 1e3);
      const endMs = Math.round(Number(segment.end || 0) * 1e3);
      const text2 = String(segment.text || "").trim();
      if (!text2 || endMs <= startMs) {
        continue;
      }
      const words = Array.isArray(segment.words) ? segment.words.map((word) => ({
        word: String(word.word || "").trim(),
        startMs: Math.round(Number(word.start || segment.start || 0) * 1e3),
        endMs: Math.round(Number(word.end || segment.end || 0) * 1e3),
        score: word.score
      })).filter((word) => word.word && word.endMs >= word.startMs) : [];
      cues.push({
        id: crypto.randomUUID(),
        startMs,
        endMs,
        text: text2,
        words: words.length ? words : void 0,
        hasWordAlignment: !!words.length
      });
    }
    return cues.sort((a, b) => a.startMs - b.startMs);
  } catch {
    return [];
  }
};
const ha = (text, fileName = "") => {
  if (fileName.endsWith(".json") || String(text).trim().startsWith("{") || String(text).trim().startsWith("[")) {
    const parsedCues = In(text);
    if (parsedCues.length) {
      return parsedCues;
    }
  }
  return La(text);
};
const gt = (cues, totalDurationMs = 0) => {
  const sorted = [...cues].sort((a, b) => Number(a.startMs) - Number(b.startMs));
  if (!sorted.length) {
    return [];
  }
  const timedCues = [];
  for (let index = 0; index < sorted.length; index++) {
    const cue = sorted[index];
    const nextCue = sorted[index + 1];
    const text = String(cue.text || "").replace(/\s*\n\s*/g, " ").trim();
    if (!text) {
      continue;
    }
    const startMs = index === 0 ? 0 : Math.round(Number(cue.startMs));
    let endMs;
    if (nextCue) {
      endMs = Math.round(Number(nextCue.startMs));
    } else {
      const fallbackEndMs = Number(totalDurationMs) || 0;
      endMs = Math.max(Math.round(Number(cue.endMs)), fallbackEndMs);
    }
    const durationMs = Math.max(500, endMs - startMs);
    if (durationMs > 5200) {
      const partCount = Math.ceil(durationMs / 4500);
      const partMs = Math.round(durationMs / partCount);
      const words = Array.isArray(cue.words) && cue.words.length ? cue.words : text.split(/\s+/).map((word) => ({
        word
      }));
      const wordsPerPart = Math.max(1, Math.ceil(words.length / partCount));
      for (let partIndex = 0; partIndex < partCount; partIndex++) {
        const partStartMs = startMs + partIndex * partMs;
        const partEndMs = partIndex === partCount - 1 ? startMs + durationMs : startMs + (partIndex + 1) * partMs;
        const partWords = words.slice(partIndex * wordsPerPart, (partIndex + 1) * wordsPerPart);
        const partText = partWords.map((item) => item.word).join(" ").trim() || text;
        timedCues.push({
          text: partText,
          startMs: partStartMs,
          endMs: partEndMs,
          duration: Number(((partEndMs - partStartMs) / 1e3).toFixed(3)),
          words: partWords.length && partWords[0].startMs !== void 0 ? partWords : void 0
        });
      }
    } else {
      timedCues.push({
        text,
        startMs,
        endMs: startMs + durationMs,
        duration: Number((durationMs / 1e3).toFixed(3)),
        words: cue.words
      });
    }
  }
  return timedCues.map((item, index) => ({
    ...item,
    index
  }));
};
const ga = (ms) => {
  const total = Math.max(0, Math.round(ms));
  const hours = Math.floor(total / 36e5);
  const minutes = Math.floor(total % 36e5 / 6e4);
  const seconds = Math.floor(total % 6e4 / 1e3);
  const millis = total % 1e3;
  return String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0") + "," + String(millis).padStart(3, "0");
};
const ta = (cues) => !Array.isArray(cues) || !cues.length ? "" : cues.filter((item) => {
  var text;
  return item && ((text = item.text) == null ? void 0 : text.trim());
}).map((cue, index) => {
  const start = ga(cue.startMs);
  const end = ga(cue.endMs);
  return index + 1 + "\n" + start + " --> " + end + "\n" + cue.text.trim() + "\n";
}).join("\n");
const fa = (ms) => {
  const total = Math.max(0, Math.round(ms));
  const hours = Math.floor(total / 36e5);
  const minutes = Math.floor(total % 36e5 / 6e4);
  const seconds = Math.floor(total % 6e4 / 1e3);
  const millis = total % 1e3;
  return String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0") + "." + String(millis).padStart(3, "0");
};
const aa = (cues) => {
  if (!Array.isArray(cues) || !cues.length) {
    return "WEBVTT\n\n";
  }
  const valid = cues.filter((item) => {
    var text;
    return item && ((text = item.text) == null ? void 0 : text.trim());
  });
  if (valid.length) {
    return "WEBVTT\n\n" + valid.map((cue, index) => {
      const start = fa(cue.startMs);
      const end = fa(cue.endMs);
      return index + 1 + "\n" + start + " --> " + end + "\n" + cue.text.trim() + "\n";
    }).join("\n");
  } else {
    return "WEBVTT\n\n";
  }
};
const na = {
  fontFamily: "'Montserrat', 'Impact', Arial, sans-serif",
  fontSize: 56,
  fontWeight: 900,
  color: "#ffffff",
  highlightColor: "#FFD700",
  animation: "viral-yellow-pop",
  wordByWord: true,
  wordHighlight: true,
  outlineColor: "#000000",
  outlineWidth: 5,
  glow: 18,
  letterSpacing: -0.5,
  uppercase: true,
  position: "bottom",
  posY: 80,
  maxWordsPerScreen: 3
};
const Dt = /* @__PURE__ */ new Set(["inherit", "none", "fade", "slide-left", "slide-right", "zoom", "wipe"]);
const An = [{
  value: "auto",
  label: "\u{1F310} Auto-detectar (Idioma del audio)"
}, {
  value: "es",
  label: "\u{1F1EA}\u{1F1F8} Espa\xF1ol"
}, {
  value: "en",
  label: "\u{1F1FA}\u{1F1F8} Ingl\xE9s (English)"
}, {
  value: "pt",
  label: "\u{1F1E7}\u{1F1F7} Portugu\xE9s"
}, {
  value: "fr",
  label: "\u{1F1EB}\u{1F1F7} Franc\xE9s"
}, {
  value: "de",
  label: "\u{1F1E9}\u{1F1EA} Alem\xE1n"
}, {
  value: "it",
  label: "\u{1F1EE}\u{1F1F9} Italiano"
}, {
  value: "ja",
  label: "\u{1F1EF}\u{1F1F5} Japon\xE9s"
}, {
  value: "ru",
  label: "\u{1F1F7}\u{1F1FA} Ruso"
}, {
  value: "zh",
  label: "\u{1F1E8}\u{1F1F3} Chino"
}];
const De = (index) => ({
  id: crypto.randomUUID(),
  title: "Escena " + (index + 1),
  prompt: "",
  caption: "",
  duration: 4,
  motion: "gentle-zoom-in",
  imageUrl: "",
  videoUrl: "",
  mediaId: "",
  videoModel: "veo-3.1-lite",
  videoDuration: 8,
  videoPrompt: "",
  transition: "inherit",
  hasCharacter: true,
  isStockMotion: false,
  imageHidden: false,
  graphics: [],
  status: "idle"
});
const tt = {
  schemaVersion: 2,
  title: "Mi video de YouTube",
  format: "short",
  fps: 30,
  engine: "remotion",
  imageModel: "nano-banana-2-lite",
  textModel: "gemini-3-flash-preview",
  transcriptionModel: "base",
  transcriptionEngine: "local",
  transcriptionLanguage: "auto",
  visualStyle: "cinematico",
  transitions: {
    default: "fade",
    duration: 0.35
  },
  characterReference: null,
  styleReferences: [],
  audioTrack: null,
  musicTrack: null,
  captionTrack: {
    sourceName: "",
    cues: [],
    enabled: true,
    style: na
  },
  overlays: [],
  scenes: [De(0), De(1), De(2)]
};
const dt = (raw) => {
  var customStyle2;
  var customStyle3;
  var transitions2;
  var transitions3;
  var characterReference2;
  var characterReference3;
  var audioTrack;
  var musicTrack;
  var captionTrack2;
  var captionTrack3;
  var captionTrack4;
  var captionTrack5;
  const project = raw && Array.isArray(raw.scenes) ? raw : tt;
  const scenes = project.scenes.length ? project.scenes.map((scene, index) => ({
    ...De(index),
    ...scene,
    imageHidden: !!scene.imageHidden,
    duration: Math.min(600, Math.max(0.5, Number(scene.duration || 4))),
    videoModel: ["veo-3.1-lite", "omni"].includes(scene.videoModel) ? scene.videoModel : "veo-3.1-lite",
    videoDuration: scene.videoModel === "omni" && [4, 6, 8, 10].includes(Number(scene.videoDuration)) ? Number(scene.videoDuration) : 8,
    videoPrompt: String(scene.videoPrompt || ""),
    transition: Dt.has(scene.transition) ? scene.transition : "inherit",
    status: scene.imageUrl || scene.videoUrl ? "ready" : "idle",
    operationId: ""
  })) : [De(0)];
  const resolveRefUrl = (ref) => ref ? ref.url && !ref.url.startsWith("blob:") ? ref.url : ref.base64 ? "data:" + (ref.mimeType || "image/jpeg") + ";base64," + ref.base64 : ref.url || "" : "";
  const styleReferences = Array.isArray(project.styleReferences) && project.styleReferences.length > 0 ? project.styleReferences.slice(0, 3).map((ref, index) => ({
    id: ref.id || "style-ref-" + index,
    url: resolveRefUrl(ref),
    name: ref.name || "Referencia " + (index + 1),
    base64: ref.base64 || "",
    mimeType: ref.mimeType || "image/jpeg",
    flowMediaId: ref.flowMediaId || "",
    enabled: ref.enabled !== false
  })) : (customStyle2 = project.customStyle) != null && customStyle2.url || (customStyle3 = project.customStyle) != null && customStyle3.base64 ? [{
    id: "style-ref-0",
    url: resolveRefUrl(project.customStyle),
    name: project.customStyle.name || "Referencia 1",
    base64: project.customStyle.base64 || "",
    mimeType: project.customStyle.mimeType || "image/jpeg",
    flowMediaId: project.customStyle.flowMediaId || "",
    enabled: true
  }] : [];
  return {
    ...tt,
    ...project,
    schemaVersion: 2,
    format: project.format === "youtube" ? "youtube" : "short",
    engine: project.engine === "ffmpeg" ? "ffmpeg" : "remotion",
    fps: [24, 25, 30, 50, 60].includes(Number(project.fps)) ? Number(project.fps) : 30,
    imageModel: ["nano-banana-2-lite", "nano-banana-2", "nano-banana-pro"].includes(project.imageModel) ? project.imageModel : "nano-banana-2-lite",
    textModel: ["gemini-3-flash-preview", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest", "gemini-1.5-flash"].includes(project.textModel) ? project.textModel : "gemini-3-flash-preview",
    transcriptionModel: ["tiny", "base", "small"].includes(project.transcriptionModel) ? project.transcriptionModel : "base",
    transcriptionEngine: ["local", "gemini"].includes(project.transcriptionEngine) ? project.transcriptionEngine : "local",
    transitions: {
      default: Dt.has((transitions2 = project.transitions) == null ? void 0 : transitions2.default) && project.transitions.default !== "inherit" ? project.transitions.default : "fade",
      duration: Math.min(1, Math.max(0.1, Number((transitions3 = project.transitions) == null ? void 0 : transitions3.duration) || 0.35))
    },
    visualStyle: ["western-anime", "stickman-2d", "cinematico", "anime", "pixel-art", "stickman", "stickman-dark", "low-poly", "salud", "fantasia", "realista"].includes(project.visualStyle) || project.visualStyle === "custom-style" && (project.customStyle || styleReferences.length > 0) ? project.visualStyle : "western-anime",
    characterReference: (characterReference2 = project.characterReference) != null && characterReference2.url || (characterReference3 = project.characterReference) != null && characterReference3.base64 ? {
      url: resolveRefUrl(project.characterReference),
      name: project.characterReference.name || "personaje",
      base64: project.characterReference.base64 || "",
      mimeType: project.characterReference.mimeType || "image/jpeg",
      flowMediaId: project.characterReference.flowMediaId || ""
    } : null,
    styleReferences,
    audioTrack: (audioTrack = project.audioTrack) != null && audioTrack.url ? project.audioTrack : null,
    musicTrack: (musicTrack = project.musicTrack) != null && musicTrack.url ? project.musicTrack : null,
    captionTrack: {
      sourceName: ((captionTrack2 = project.captionTrack) == null ? void 0 : captionTrack2.sourceName) || "",
      enabled: ((captionTrack3 = project.captionTrack) == null ? void 0 : captionTrack3.enabled) !== false,
      cues: Array.isArray((captionTrack4 = project.captionTrack) == null ? void 0 : captionTrack4.cues) ? project.captionTrack.cues.map((cue) => {
        const startMs = Number.isFinite(Number(cue.startMs)) ? Number(cue.startMs) : Number.isFinite(Number(cue.startSeconds)) ? Math.round(Number(cue.startSeconds) * 1e3) : 0;
        const endMs = Number.isFinite(Number(cue.endMs)) ? Number(cue.endMs) : Number.isFinite(Number(cue.endSeconds)) ? Math.round(Number(cue.endSeconds) * 1e3) : startMs + 2e3;
        return {
          ...cue,
          id: cue.id || crypto.randomUUID(),
          startMs,
          endMs,
          startSeconds: startMs / 1e3,
          endSeconds: endMs / 1e3,
          text: String(cue.text || "").trim()
        };
      }).filter((cue) => cue.endMs > cue.startMs && cue.text) : [],
      style: {
        ...na,
        ...((captionTrack5 = project.captionTrack) == null ? void 0 : captionTrack5.style) || {}
      }
    },
    overlays: Array.isArray(project.overlays) ? project.overlays.map((overlay, index) => ({
      id: overlay.id || "ovl-" + index + "-" + Date.now(),
      name: overlay.name || "Superposici\xF3n " + (index + 1),
      imageUrl: overlay.imageUrl || "",
      startSeconds: Math.max(0, Number(overlay.startSeconds || 0)),
      durationSeconds: Math.max(0.5, Number(overlay.durationSeconds || 3)),
      scale: Math.max(0.1, Math.min(2, Number(overlay.scale !== void 0 ? overlay.scale : 0.6))),
      position: overlay.position || "top-right",
      posX: Number(overlay.posX !== void 0 ? overlay.posX : 75),
      posY: Number(overlay.posY !== void 0 ? overlay.posY : 25),
      animation: overlay.animation || "pop",
      captionCueId: overlay.captionCueId || null
    })) : [],
    scenes
  };
};
const En = (set, get) => ({
  authUser: (() => {
    try {
      if (localStorage.getItem("flowtube_auth_version") === "3") {
        return JSON.parse(localStorage.getItem("flowtube_user") || "null");
      } else {
        return null;
      }
    } catch {
      return null;
    }
  })(),
  authToken: typeof localStorage !== "undefined" && localStorage.getItem("flowtube_auth_version") === "3" ? localStorage.getItem("flowtube_token") : null,
  setAuth: (user, token) => {
    try {
      if (user && token) {
        localStorage.setItem("flowtube_auth_version", "3");
        localStorage.setItem("flowtube_user", JSON.stringify(user));
        localStorage.setItem("flowtube_token", token);
      } else {
        localStorage.removeItem("flowtube_auth_version");
        localStorage.removeItem("flowtube_user");
        localStorage.removeItem("flowtube_token");
      }
    } catch {
    }
    set({
      authUser: user || null,
      authToken: token || null
    });
  },
  updateAuthUser: (patch) => {
    const authUser = get().authUser;
    if (!authUser) {
      return;
    }
    const nextUser = {
      ...authUser,
      ...patch
    };
    try {
      localStorage.setItem("flowtube_user", JSON.stringify(nextUser));
    } catch {
    }
    set({
      authUser: nextUser
    });
  },
  logout: () => {
    try {
      localStorage.removeItem("flowtube_auth_version");
      localStorage.removeItem("flowtube_user");
      localStorage.removeItem("flowtube_token");
    } catch {
    }
    set({
      authUser: null,
      authToken: null
    });
  }
});
const Va = "flowtube_auto_transcribe_upload";
function Pn() {
  try {
    const stored = localStorage.getItem(Va);
    if (stored === null) {
      return true;
    } else {
      return stored === "true";
    }
  } catch {
    return true;
  }
}
function Rn(enabled) {
  try {
    localStorage.setItem(Va, String(!!enabled));
  } catch {
  }
}
const Dn = (set, get) => ({
  currentView: "dashboard",
  editorMode: typeof localStorage !== "undefined" && localStorage.getItem("flowtube_editor_mode") ? localStorage.getItem("flowtube_editor_mode") : "v5",
  setEditorMode: (mode) => {
    try {
      localStorage.setItem("flowtube_editor_mode", mode);
    } catch {
    }
    set({
      editorMode: mode
    });
  },
  toggleEditorMode: () => {
    const nextMode = get().editorMode === "v5" ? "classic" : "v5";
    try {
      localStorage.setItem("flowtube_editor_mode", nextMode);
    } catch {
    }
    set({
      editorMode: nextMode
    });
  },
  inspectorTab: "scene",
  autoTranscribeOnAudioUpload: Pn(),
  setAutoTranscribeOnAudioUpload: (enabled) => {
    Rn(enabled);
    set({
      autoTranscribeOnAudioUpload: !!enabled
    });
  },
  flowState: {
    connected: false,
    label: "Extension no detectada"
  },
  renderState: {
    status: "idle",
    message: "",
    url: ""
  },
  assetState: {
    status: "idle",
    message: ""
  },
  batchState: {
    running: false,
    done: 0,
    total: 0,
    failures: [],
    message: ""
  },
  promptGenState: {
    running: false,
    done: 0,
    total: 0,
    currentSceneTitle: "",
    percent: 0,
    message: ""
  },
  batchStartScene: 1,
  batchChunkSize: 20,
  referenceStatus: "",
  activePanel: "editor",
  batchCancelled: false,
  batchPaused: false,
  promptGenCancelled: false,
  activeTaskId: "",
  setBatchPaused: (paused) => set({
    batchPaused: paused
  }),
  setBatchCancelled: (cancelled) => set({
    batchCancelled: cancelled
  }),
  setInspectorTab: (tab) => set({
    inspectorTab: tab
  }),
  setCurrentView: (view) => set({
    currentView: view
  }),
  setFlowState: (flowState) => set({
    flowState
  }),
  setRenderState: (updater) => set((state) => ({
    renderState: typeof updater == "function" ? updater(state.renderState) : {
      ...state.renderState,
      ...updater
    }
  })),
  setAssetState: (updater) => set((state) => ({
    assetState: typeof updater == "function" ? updater(state.assetState) : {
      ...state.assetState,
      ...updater
    }
  })),
  setBatchState: (updater) => set((state) => ({
    batchState: typeof updater == "function" ? updater(state.batchState) : {
      ...state.batchState,
      ...updater
    }
  })),
  setPromptGenState: (updater) => set((state) => ({
    promptGenState: typeof updater == "function" ? updater(state.promptGenState) : {
      ...state.promptGenState,
      ...updater
    }
  })),
  setBatchStartScene: (sceneNumber) => set({
    batchStartScene: sceneNumber
  }),
  setBatchChunkSize: (size) => set({
    batchChunkSize: Math.max(1, Math.min(100, Number(size) || 20))
  }),
  setReferenceStatus: (status) => set({
    referenceStatus: status
  }),
  setIsHydrated: (hydrated) => set({
    isHydrated: hydrated
  }),
  setActivePanel: (panel) => set({
    activePanel: panel
  }),
  setActiveTaskId: (taskId) => set({
    activeTaskId: taskId
  }),
  cancelBatch: () => set({
    batchCancelled: true,
    batchPaused: false
  }),
  resetBatchCancel: () => set({
    batchCancelled: false,
    batchPaused: false
  }),
  pauseBatch: () => set({
    batchPaused: true
  }),
  resumeBatch: () => set({
    batchPaused: false
  }),
  cancelPromptGen: () => set({
    promptGenCancelled: true
  }),
  resetPromptGenCancel: () => set({
    promptGenCancelled: false
  })
});
const w = create((set, get) => {
  var firstScene;
  return {
    ...En(set, get),
    ...Dn(set, get),
    project: tt,
    selectedId: (firstScene = tt.scenes[0]) == null ? void 0 : firstScene.id,
    selectedOverlayId: null,
    isHydrated: false,
    past: [],
    future: [],
    pushHistory: () => {
      const {
        project,
        past
      } = get();
      let clone;
      try {
        clone = typeof structuredClone == "function" ? structuredClone(project) : JSON.parse(JSON.stringify(project));
      } catch {
        clone = JSON.parse(JSON.stringify(project));
      }
      set({
        past: [...past.slice(-40), clone],
        future: []
      });
    },
    undo: () => {
      var firstScene2;
      const {
        past,
        project,
        future
      } = get();
      if (!past.length) {
        return;
      }
      const previous = past[past.length - 1];
      const remainingPast = past.slice(0, past.length - 1);
      let clone;
      try {
        clone = typeof structuredClone == "function" ? structuredClone(project) : JSON.parse(JSON.stringify(project));
      } catch {
        clone = JSON.parse(JSON.stringify(project));
      }
      set({
        past: remainingPast,
        future: [clone, ...future],
        project: previous,
        selectedId: previous.scenes.some((scene) => scene.id === get().selectedId) ? get().selectedId : (firstScene2 = previous.scenes[0]) == null ? void 0 : firstScene2.id
      });
    },
    redo: () => {
      var firstScene2;
      const {
        future,
        project,
        past
      } = get();
      if (!future.length) {
        return;
      }
      const next = future[0];
      const remainingFuture = future.slice(1);
      let clone;
      try {
        clone = typeof structuredClone == "function" ? structuredClone(project) : JSON.parse(JSON.stringify(project));
      } catch {
        clone = JSON.parse(JSON.stringify(project));
      }
      set({
        past: [...past, clone],
        future: remainingFuture,
        project: next,
        selectedId: next.scenes.some((scene) => scene.id === get().selectedId) ? get().selectedId : (firstScene2 = next.scenes[0]) == null ? void 0 : firstScene2.id
      });
    },
    updateProject: (patch) => {
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          ...patch
        }
      }));
    },
    setProject: (project) => set({
      project
    }),
    updateScene: (sceneId, patch) => {
      set((state) => {
        const nextProject = {
          ...state.project,
          scenes: state.project.scenes.map((scene) => scene.id === sceneId ? {
            ...scene,
            ...patch
          } : scene)
        };
        if (patch.imageUrl || patch.videoUrl) {
          Re(nextProject).catch(() => {
          });
        }
        return {
          project: nextProject
        };
      });
    },
    finishSceneOperation: (sceneId, operationId, patch) => {
      set((state) => {
        const nextProject = {
          ...state.project,
          scenes: state.project.scenes.map((scene) => scene.id !== sceneId ? scene : {
            ...scene,
            ...patch,
            operationId: ""
          })
        };
        if (patch != null && patch.imageUrl || patch != null && patch.videoUrl) {
          Re(nextProject).catch(() => {
          });
        }
        return {
          project: nextProject
        };
      });
    },
    setSelectedOverlayId: (overlayId) => set({
      selectedOverlayId: overlayId
    }),
    addOverlay: (input) => {
      get().pushHistory();
      const overlay = {
        id: crypto.randomUUID(),
        name: input.name || "Superposici\xF3n",
        imageUrl: input.imageUrl || "",
        startSeconds: Math.max(0, Number(input.startSeconds || 0)),
        durationSeconds: Math.max(0.5, Number(input.durationSeconds || 3)),
        scale: Math.max(0.1, Math.min(2, Number(input.scale !== void 0 ? input.scale : 0.6))),
        position: input.position || "top-right",
        posX: Number(input.posX !== void 0 ? input.posX : 75),
        posY: Number(input.posY !== void 0 ? input.posY : 25),
        animation: input.animation || "pop",
        captionCueId: input.captionCueId || null,
        ...input
      };
      set((state) => {
        const nextProject = {
          ...state.project,
          overlays: [...state.project.overlays || [], overlay]
        };
        Re(nextProject).catch(() => {
        });
        return {
          project: nextProject,
          selectedOverlayId: overlay.id
        };
      });
      return overlay;
    },
    updateOverlay: (overlayId, patch) => {
      get().pushHistory();
      set((state) => {
        const nextProject = {
          ...state.project,
          overlays: (state.project.overlays || []).map((overlay) => overlay.id === overlayId ? {
            ...overlay,
            ...patch
          } : overlay)
        };
        Re(nextProject).catch(() => {
        });
        return {
          project: nextProject
        };
      });
    },
    removeOverlay: (overlayId) => {
      get().pushHistory();
      set((state) => {
        const nextProject = {
          ...state.project,
          overlays: (state.project.overlays || []).filter((overlay) => overlay.id !== overlayId)
        };
        Re(nextProject).catch(() => {
        });
        return {
          project: nextProject,
          selectedOverlayId: state.selectedOverlayId === overlayId ? null : state.selectedOverlayId
        };
      });
    },
    importPromptList: ({
      prompts: promptsText,
      replace = true,
      defaultDuration = 4,
      defaultMotion = "gentle-zoom-in"
    }) => {
      const prompts = ua(promptsText);
      if (!prompts.length) {
        return 0;
      }
      get().pushHistory();
      const offset = replace ? 0 : get().project.scenes.length;
      const newScenes = prompts.map((prompt, index) => {
        const sceneIndex = offset + index;
        let title = "Escena " + (sceneIndex + 1);
        let promptText = prompt;
        if (prompt.includes(":") && prompt.indexOf(":") < 35) {
          const parts = prompt.split(":");
          title = parts[0].trim();
          promptText = parts.slice(1).join(":").trim() || prompt;
        } else {
          const firstWords = prompt.split(" ").slice(0, 4).join(" ");
          if (firstWords.length >= 2) {
            title = firstWords;
          }
        }
        return {
          ...De(sceneIndex),
          title,
          prompt: promptText,
          duration: Math.max(1, Math.min(120, Number(defaultDuration) || 4)),
          motion: defaultMotion || "gentle-zoom-in",
          status: "idle"
        };
      });
      const scenes = replace ? newScenes : [...get().project.scenes, ...newScenes];
      set((state) => {
        var firstScene2;
        return {
          project: {
            ...state.project,
            scenes
          },
          selectedId: ((firstScene2 = newScenes[0]) == null ? void 0 : firstScene2.id) || state.selectedId
        };
      });
      Re(get().project).catch(() => {
      });
      return prompts.length;
    },
    applyPromptsToScenes: (promptsText, defaultDuration = 4, defaultMotion = "gentle-zoom-in") => {
      const prompts = ua(promptsText);
      if (!prompts.length) {
        return 0;
      }
      get().pushHistory();
      const {
        project
      } = get();
      const existingScenes = [...project.scenes || []];
      const nextScenes = [];
      for (let index = 0; index < Math.max(existingScenes.length, prompts.length); index++) {
        if (index < existingScenes.length) {
          const scene = existingScenes[index];
          nextScenes.push({
            ...scene,
            prompt: index < prompts.length ? prompts[index] : scene.prompt
          });
        } else {
          const scene = {
            ...De(index),
            title: "Escena " + (index + 1),
            prompt: prompts[index],
            duration: Math.max(1, Math.min(120, Number(defaultDuration) || 4)),
            motion: defaultMotion || "gentle-zoom-in",
            status: "idle"
          };
          nextScenes.push(scene);
        }
      }
      set((state) => {
        var firstScene2;
        return {
          project: {
            ...state.project,
            scenes: nextScenes
          },
          selectedId: ((firstScene2 = nextScenes[0]) == null ? void 0 : firstScene2.id) || state.selectedId
        };
      });
      Re(get().project).catch(() => {
      });
      return prompts.length;
    },
    syncPromptsWithSrt: ({
      prompts: promptsText,
      defaultMotion = "gentle-zoom-in"
    }) => {
      var captionTrack;
      var audioTrack;
      const {
        project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? void 0 : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      const timedCues = gt(cues, (audioTrack = project.audioTrack) == null ? void 0 : audioTrack.durationMs);
      const promptLines = String(promptsText || "").split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
      get().pushHistory();
      const scenes = timedCues.map((cue, index) => {
        const prompt = promptLines[index] || "";
        const firstWords = cue.text.split(" ").slice(0, 4).join(" ");
        const title = firstWords.length >= 2 ? firstWords : "Escena " + String(index + 1).padStart(2, "0");
        return {
          ...De(index),
          title,
          prompt,
          script: cue.text,
          caption: cue.text,
          duration: Math.max(1, Math.min(120, cue.duration || 4)),
          sourceStartMs: Math.round(cue.startMs),
          motion: defaultMotion || "gentle-zoom-in",
          status: "idle"
        };
      });
      set((state) => {
        var firstScene2;
        return {
          project: {
            ...state.project,
            scenes
          },
          selectedId: ((firstScene2 = scenes[0]) == null ? void 0 : firstScene2.id) || state.selectedId
        };
      });
    },
    assignImagesToScenes: (imageUrls) => {
      if (!Array.isArray(imageUrls) || !imageUrls.length) {
        return;
      }
      get().pushHistory();
      const scenes = get().project.scenes.map((scene, index) => index < imageUrls.length && imageUrls[index] ? {
        ...scene,
        imageUrl: imageUrls[index],
        videoUrl: "",
        flowVideoUrl: "",
        status: "ready"
      } : scene);
      set((state) => ({
        project: {
          ...state.project,
          scenes
        }
      }));
    },
    autoApplyMotionGraphics: () => {
      const {
        project
      } = get();
      if (!project.scenes.length) {
        return;
      }
      get().pushHistory();
      const scenes = project.scenes.map((scene, index) => {
        const script = (scene.script || scene.caption || scene.title || "").trim();
        const text = script.toLowerCase();
        const durationMs = Math.round(Number(scene.duration || 4) * 1e3);
        const isFirst = index === 0;
        const isLast = index === project.scenes.length - 1 && project.scenes.length > 2;
        const hasNumbers = /\d+|%|\$|millon|cien|mil|top/i.test(text);
        const hasWarning = /cuidado|atencion|peligro|error|nunca|alerta|ojo/i.test(text);
        const hasEmphasis = /importante|secreto|clave|impactante|increible|brutal/i.test(text);
        const graphics = [];
        let isStockMotion = scene.isStockMotion || false;
        if (isFirst) {
          const headline = script.split(" ").slice(0, 5).join(" ").toUpperCase() || scene.title.toUpperCase();
          graphics.push({
            id: crypto.randomUUID(),
            preset: "title-pop",
            text: headline,
            fromMs: 200,
            durationMs: Math.min(2600, durationMs - 300),
            position: "center",
            accentColor: "#d7ff4f"
          });
        } else if (isLast) {
          graphics.push({
            id: crypto.randomUUID(),
            preset: "subscribe-cta",
            text: "\xA1SUSCR\xCDBETE PARA M\xC1S!",
            fromMs: 300,
            durationMs: Math.min(3200, durationMs - 400),
            position: "bottom",
            accentColor: "#ef4444"
          });
        } else if (hasNumbers) {
          const match = script.match(/(\d+[\w%]*|\$[\d\w]+|\+\d+%?)/);
          const stat = match ? match[0] : "DATO CLAVE";
          graphics.push({
            id: crypto.randomUUID(),
            preset: "stat-counter",
            text: stat,
            fromMs: 200,
            durationMs: Math.min(2600, durationMs - 300),
            position: "center",
            accentColor: "#10b981"
          });
        } else if (hasWarning) {
          graphics.push({
            id: crypto.randomUUID(),
            preset: "warning-alert",
            text: "\xA1ATENCI\xD3N A ESTO!",
            fromMs: 200,
            durationMs: Math.min(2400, durationMs - 300),
            position: "top",
            accentColor: "#f59e0b"
          });
        } else if (hasEmphasis) {
          const keyword = script.split(" ").find((word) => word.length > 5) || "\xA1CLAVE!";
          graphics.push({
            id: crypto.randomUUID(),
            preset: "word-highlight",
            text: keyword.toUpperCase(),
            fromMs: 300,
            durationMs: Math.min(2200, durationMs - 400),
            position: "center",
            accentColor: "#ffd23f"
          });
        } else if (index % 3 === 2 && !scene.imageUrl && !scene.videoUrl) {
          isStockMotion = true;
          graphics.push({
            id: crypto.randomUUID(),
            preset: "stock-motion-card",
            text: script.slice(0, 70) || scene.title,
            fromMs: 0,
            durationMs,
            position: "center",
            accentColor: "#8b5cf6"
          });
        }
        return {
          ...scene,
          isStockMotion,
          graphics: graphics.length ? graphics : scene.graphics
        };
      });
      set((state) => ({
        project: {
          ...state.project,
          scenes,
          engine: "remotion"
        }
      }));
    },
    toggleStockMotion: (sceneId) => {
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          scenes: state.project.scenes.map((scene) => scene.id === sceneId ? {
            ...scene,
            isStockMotion: !scene.isStockMotion
          } : scene)
        }
      }));
    },
    toggleSceneCharacter: (sceneId) => {
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          scenes: state.project.scenes.map((scene) => scene.id === sceneId ? {
            ...scene,
            hasCharacter: scene.hasCharacter === false
          } : scene)
        }
      }));
    },
    clearAllMotionGraphics: () => {
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          scenes: state.project.scenes.map((scene) => ({
            ...scene,
            graphics: [],
            isStockMotion: false
          }))
        }
      }));
    },
    addScene: () => {
      get().pushHistory();
      const scene = De(get().project.scenes.length);
      set((state) => ({
        project: {
          ...state.project,
          scenes: [...state.project.scenes, scene]
        },
        selectedId: scene.id
      }));
    },
    removeScene: (sceneId) => {
      const {
        project
      } = get();
      if (project.scenes.length === 1) {
        return;
      }
      get().pushHistory();
      const sceneIndex = project.scenes.findIndex((scene) => scene.id === sceneId);
      const filteredScenes = project.scenes.filter((scene) => scene.id !== sceneId);
      set({
        project: {
          ...project,
          scenes: filteredScenes
        },
        selectedId: filteredScenes[Math.max(0, sceneIndex - 1)].id
      });
    },
    duplicateScene: (sceneId) => {
      const {
        project
      } = get();
      const scene = project.scenes.find((scene2) => scene2.id === sceneId);
      if (!scene) {
        return;
      }
      get().pushHistory();
      const sceneIndex = project.scenes.findIndex((scene2) => scene2.id === sceneId);
      const copy = {
        ...scene,
        id: crypto.randomUUID(),
        title: scene.title + " (copia)",
        status: scene.imageUrl || scene.videoUrl ? "ready" : "idle",
        operationId: ""
      };
      const scenes = [...project.scenes];
      scenes.splice(sceneIndex + 1, 0, copy);
      set({
        project: {
          ...project,
          scenes
        },
        selectedId: copy.id
      });
    },
    splitScene: (sceneId, ratio) => {
      const {
        project
      } = get();
      const sceneIndex = project.scenes.findIndex((scene2) => scene2.id === sceneId);
      if (sceneIndex === -1) {
        return;
      }
      get().pushHistory();
      const scene = project.scenes[sceneIndex];
      const duration = Number(scene.duration) || 4;
      const firstDuration = Math.max(0.5, Number((duration * ratio).toFixed(1)));
      const secondDuration = Math.max(0.5, Number((duration - firstDuration).toFixed(1)));
      const firstHalf = {
        ...scene,
        duration: firstDuration
      };
      const secondHalf = {
        ...scene,
        id: crypto.randomUUID(),
        title: scene.title + " (Cortada)",
        duration: secondDuration,
        status: scene.imageUrl || scene.videoUrl ? "ready" : "idle",
        operationId: ""
      };
      const scenes = [...project.scenes];
      scenes.splice(sceneIndex, 1, firstHalf, secondHalf);
      set({
        project: {
          ...project,
          scenes
        },
        selectedId: secondHalf.id
      });
    },
    moveScene: (sceneId, offset) => {
      const scenes = [...get().project.scenes];
      const index = scenes.findIndex((scene) => scene.id === sceneId);
      const targetIndex = index + offset;
      if (!(index < 0) && !(targetIndex < 0) && !(targetIndex >= scenes.length)) {
        get().pushHistory();
        [scenes[index], scenes[targetIndex]] = [scenes[targetIndex], scenes[index]];
        set((state) => ({
          project: {
            ...state.project,
            scenes
          }
        }));
      }
    },
    toggleSceneImageVisibility: (sceneId) => {
      const {
        project,
        selectedId
      } = get();
      const targetId = sceneId || selectedId;
      const scene = project.scenes.find((scene2) => scene2.id === targetId);
      if (scene) {
        get().pushHistory();
        get().updateScene(targetId, {
          imageHidden: !scene.imageHidden
        });
      }
    },
    toggleSceneCharacter: (sceneId) => {
      const {
        project,
        selectedId
      } = get();
      const targetId = sceneId || selectedId;
      const scene = project.scenes.find((scene2) => scene2.id === targetId);
      if (scene) {
        get().pushHistory();
        get().updateScene(targetId, {
          hasCharacter: scene.hasCharacter === false
        });
      }
    },
    toggleStockMotion: (sceneId) => {
      const {
        project,
        selectedId
      } = get();
      const targetId = sceneId || selectedId;
      const scene = project.scenes.find((scene2) => scene2.id === targetId);
      if (scene) {
        get().pushHistory();
        get().updateScene(targetId, {
          isStockMotion: !scene.isStockMotion
        });
      }
    },
    setAuthUser: (user, token, persist = true) => {
      if (persist && user && token) {
        localStorage.setItem("flowtube_user", JSON.stringify(user));
        localStorage.setItem("flowtube_token", token);
        localStorage.setItem("flowtube_auth_version", "3");
      }
      set({
        authUser: user,
        authToken: token,
        currentView: "dashboard"
      });
    },
    logout: () => {
      localStorage.removeItem("flowtube_user");
      localStorage.removeItem("flowtube_token");
      localStorage.removeItem("flowtube_auth_version");
      set({
        authUser: null,
        authToken: null,
        currentView: "login"
      });
    },
    setCurrentView: (view) => set({
      currentView: view
    }),
    setInspectorTab: (tab) => set({
      inspectorTab: tab
    }),
    setTransitionDefaults: (patch) => set((state) => {
      var transitions4;
      var transitions5;
      return {
        project: {
          ...state.project,
          transitions: {
            ...state.project.transitions,
            ...patch,
            default: Dt.has(patch == null ? void 0 : patch.default) && patch.default !== "inherit" ? patch.default : ((transitions4 = state.project.transitions) == null ? void 0 : transitions4.default) || "fade",
            duration: Math.min(1, Math.max(0.1, Number((patch == null ? void 0 : patch.duration) ?? ((transitions5 = state.project.transitions) == null ? void 0 : transitions5.duration)) || 0.35))
          }
        }
      };
    }),
    applyTransitionToAll: (transition) => {
      const safeTransition = Dt.has(transition) && transition !== "inherit" ? transition : "none";
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          scenes: state.project.scenes.map((scene) => ({
            ...scene,
            transition: safeTransition
          }))
        }
      }));
    },
    addSceneAt: (index = -1) => {
      get().pushHistory();
      const {
        project
      } = get();
      const scenes = [...project.scenes];
      const insertAt = index === -1 ? scenes.length : index;
      const scene = De(insertAt);
      scenes.splice(insertAt, 0, scene);
      const renumbered = scenes.map((scene2, index2) => ({
        ...scene2,
        title: scene2.title.startsWith("Escena ") ? "Escena " + (index2 + 1) : scene2.title
      }));
      set((state) => ({
        project: {
          ...state.project,
          scenes: renumbered
        },
        selectedId: scene.id
      }));
    },
    clearAllScenes: () => {
      get().pushHistory();
      const scene = De(0);
      set((state) => ({
        project: {
          ...state.project,
          scenes: [scene]
        },
        selectedId: scene.id
      }));
    },
    insertMediaOnTimeline: (afterSceneId, media) => {
      var prevScene;
      var firstScene2;
      const mediaItems = Array.isArray(media) ? media.filter((media2) => (media2 == null ? void 0 : media2.url) && ["image", "video"].includes(media2.kind)) : [];
      if (!mediaItems.length) {
        return;
      }
      get().pushHistory();
      const {
        project
      } = get();
      let scenes = [...project.scenes];
      if (scenes.every((scene) => !scene.imageUrl && !scene.videoUrl && !scene.flowVideoUrl) && mediaItems.length > 0) {
        scenes = [];
      }
      const anchorIndex = scenes.findIndex((scene) => scene.id === afterSceneId);
      let insertAt = anchorIndex >= 0 && !scenes[anchorIndex].imageUrl && !scenes[anchorIndex].videoUrl && !scenes[anchorIndex].flowVideoUrl ? anchorIndex : Math.max(0, anchorIndex + 1);
      let nextSelectedId = ((prevScene = scenes[Math.max(0, insertAt - 1)]) == null ? void 0 : prevScene.id) || ((firstScene2 = scenes[0]) == null ? void 0 : firstScene2.id);
      for (const media2 of mediaItems) {
        const target = scenes[insertAt];
        const isEmptySlot = target && !target.imageUrl && !target.videoUrl && !target.flowVideoUrl;
        const base = isEmptySlot ? target : De(insertAt);
        const nextScene = {
          ...base,
          duration: media2.duration ? Math.max(0.5, Number(media2.duration)) : base.duration,
          imageUrl: media2.kind === "image" ? media2.url : "",
          videoUrl: media2.kind === "video" ? media2.url : "",
          flowVideoUrl: "",
          mediaId: "",
          sourceFormat: project.format,
          muted: false,
          videoVolume: 1,
          status: "ready",
          error: "",
          operationId: ""
        };
        if (isEmptySlot) {
          scenes[insertAt] = nextScene;
        } else {
          scenes.splice(insertAt, 0, nextScene);
        }
        nextSelectedId = nextScene.id;
        insertAt += 1;
      }
      const renumbered = scenes.map((scene, index) => ({
        ...scene,
        title: /^Escena \d+$/.test(scene.title || "") ? "Escena " + (index + 1) : scene.title
      }));
      set((state) => ({
        project: {
          ...state.project,
          scenes: renumbered
        },
        selectedId: nextSelectedId
      }));
    },
    duplicateScene: (sceneId) => {
      get().pushHistory();
      const {
        project
      } = get();
      const sceneIndex = project.scenes.findIndex((scene2) => scene2.id === sceneId);
      if (sceneIndex === -1) {
        return;
      }
      const scene = project.scenes[sceneIndex];
      const copy = {
        ...JSON.parse(JSON.stringify(scene)),
        id: crypto.randomUUID(),
        title: scene.title + " (Copia)"
      };
      const scenes = [...project.scenes];
      scenes.splice(sceneIndex + 1, 0, copy);
      set((state) => ({
        project: {
          ...state.project,
          scenes
        },
        selectedId: copy.id
      }));
    },
    removeScene: (sceneId) => {
      var firstScene2;
      const {
        project,
        selectedId
      } = get();
      if (project.scenes.length <= 1) {
        return;
      }
      get().pushHistory();
      const filteredScenes = project.scenes.filter((scene) => scene.id !== sceneId);
      const nextSelectedId = selectedId === sceneId ? ((firstScene2 = filteredScenes[0]) == null ? void 0 : firstScene2.id) || null : selectedId;
      set((state) => ({
        project: {
          ...state.project,
          scenes: filteredScenes
        },
        selectedId: nextSelectedId
      }));
    },
    reorderScenes: (fromIndex, toIndex) => {
      if (fromIndex === toIndex) {
        return;
      }
      get().pushHistory();
      const {
        project
      } = get();
      const scenes = [...project.scenes];
      const [moved] = scenes.splice(fromIndex, 1);
      scenes.splice(toIndex, 0, moved);
      set((state) => ({
        project: {
          ...state.project,
          scenes
        }
      }));
    },
    createNewProjectWithFormat: (format = "short") => {
      var firstScene2;
      const project = dt({
        ...tt,
        id: crypto.randomUUID(),
        title: format === "short" ? "Nuevo Short 9:16" : "Nuevo Video YouTube 16:9",
        format,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      set({
        project,
        selectedId: (firstScene2 = project.scenes[0]) == null ? void 0 : firstScene2.id,
        currentView: "editor",
        past: [],
        future: [],
        renderState: {
          status: "idle",
          message: "",
          url: ""
        },
        assetState: {
          status: "idle",
          message: ""
        },
        batchState: {
          running: false,
          done: 0,
          total: 0,
          failures: []
        }
      });
      Re(project).catch(() => {
      });
    },
    loadProjectFromList: (raw) => {
      var firstScene2;
      const project = dt(raw);
      set({
        project,
        selectedId: (firstScene2 = project.scenes[0]) == null ? void 0 : firstScene2.id,
        currentView: "editor",
        past: [],
        future: [],
        renderState: {
          status: "idle",
          message: "",
          url: ""
        },
        assetState: {
          status: "idle",
          message: ""
        }
      });
      Re(project).catch(() => {
      });
    },
    selectScene: (sceneId) => set({
      selectedId: sceneId
    }),
    updateCaptionStyle: (patch) => set((state) => {
      var captionTrack;
      return {
        project: {
          ...state.project,
          captionTrack: {
            ...state.project.captionTrack,
            style: {
              ...na,
              ...(captionTrack = state.project.captionTrack) == null ? void 0 : captionTrack.style,
              ...patch
            }
          }
        }
      };
    }),
    toggleCaptions: () => set((state) => {
      var captionTrack;
      return {
        project: {
          ...state.project,
          captionTrack: {
            ...state.project.captionTrack,
            enabled: ((captionTrack = state.project.captionTrack) == null ? void 0 : captionTrack.enabled) === false
          }
        }
      };
    }),
    shiftCaptions: (offsetMs) => {
      var captionTrack;
      const {
        project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? void 0 : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      get().pushHistory();
      const shifted = cues.map((cue) => {
        const startMs = Math.max(0, Math.round(Number(cue.startMs) + offsetMs));
        const durationMs = Math.max(100, Math.round(Number(cue.endMs) - Number(cue.startMs)));
        const endMs = startMs + durationMs;
        const words = Array.isArray(cue.words) ? cue.words.map((word) => ({
          ...word,
          startMs: Math.max(0, Math.round(Number(word.startMs) + offsetMs)),
          endMs: Math.max(0, Math.round(Number(word.endMs) + offsetMs))
        })) : void 0;
        return {
          ...cue,
          startMs,
          endMs,
          words
        };
      });
      set((state) => ({
        project: {
          ...state.project,
          captionTrack: {
            ...state.project.captionTrack,
            cues: shifted
          }
        }
      }));
    },
    alignCaptionsStart: () => {
      var captionTrack;
      const {
        project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? void 0 : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      const minStart = Math.min(...cues.map((item) => Number(item.startMs) || 0));
      get().shiftCaptions(-minStart);
    },
    scaleCaptionsToAudio: () => {
      var captionTrack;
      var audioTrack;
      const {
        project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? void 0 : captionTrack.cues) || [];
      const audioDurationMs = Number((audioTrack = project.audioTrack) == null ? void 0 : audioTrack.durationMs) || 0;
      if (!cues.length || audioDurationMs <= 0) {
        return;
      }
      const minStart = Math.min(...cues.map((item) => Number(item.startMs) || 0));
      const span = Math.max(...cues.map((item) => Number(item.endMs) || 0)) - minStart;
      if (span <= 0) {
        return;
      }
      const scale = audioDurationMs / span;
      get().pushHistory();
      const scaled = cues.map((cue) => {
        const relStart = Number(cue.startMs) - minStart;
        const relEnd = Number(cue.endMs) - minStart;
        const startMs = Math.round(relStart * scale);
        const endMs = Math.round(relEnd * scale);
        const words = Array.isArray(cue.words) && cue.words.length > 0 ? cue.words.map((word) => {
          const wordStart = Number(word.startMs) - minStart;
          const wordEnd = Number(word.endMs) - minStart;
          return {
            ...word,
            startMs: Math.round(wordStart * scale),
            endMs: Math.round(wordEnd * scale)
          };
        }) : Kt(cue.text, startMs, endMs);
        return {
          ...cue,
          startMs,
          endMs,
          words
        };
      });
      set((state) => ({
        project: {
          ...state.project,
          captionTrack: {
            ...state.project.captionTrack,
            cues: scaled
          }
        }
      }));
    },
    syncScenesToCaptions: () => {
      var captionTrack;
      var audioTrack;
      const {
        project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? void 0 : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      get().pushHistory();
      const timedCues = gt(cues, (audioTrack = project.audioTrack) == null ? void 0 : audioTrack.durationMs);
      const scenes = project.scenes.map((scene, index) => {
        const cue = timedCues[index];
        if (cue) {
          return {
            ...scene,
            duration: Math.max(0.5, Math.min(300, cue.duration || 4)),
            sourceStartMs: Math.round(cue.startMs)
          };
        } else {
          return scene;
        }
      });
      set((state) => ({
        project: {
          ...state.project,
          scenes
        }
      }));
    },
    syncCaptionsToScenes: () => {
      var captionTrack;
      const {
        project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? void 0 : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      get().pushHistory();
      let cursorMs = 0;
      const nextCues = cues.map((cue, index) => {
        const scene = project.scenes[index];
        const durationMs = scene ? Math.round(Number(scene.duration || 4) * 1e3) : 4e3;
        const startMs = cursorMs;
        const endMs = cursorMs + durationMs;
        cursorMs = endMs;
        return {
          ...cue,
          startMs,
          endMs
        };
      });
      set((state) => ({
        project: {
          ...state.project,
          captionTrack: {
            ...state.project.captionTrack,
            cues: nextCues
          }
        }
      }));
    },
    updateCueText: (cueId, text) => {
      get().pushHistory();
      set((state) => {
        var captionTrack;
        const nextCues = (((captionTrack = state.project.captionTrack) == null ? void 0 : captionTrack.cues) || []).map((cue) => {
          if (cue.id !== cueId) {
            return cue;
          }
          const words = Kt(text, cue.startMs, cue.endMs);
          return {
            ...cue,
            text,
            words
          };
        });
        return {
          project: {
            ...state.project,
            captionTrack: {
              ...state.project.captionTrack,
              cues: nextCues
            }
          }
        };
      });
    },
    addGraphic: (presetId) => {
      const preset = Tn.find((item) => item.id === presetId);
      const {
        project,
        selectedId
      } = get();
      const scene = project.scenes.find((scene2) => scene2.id === selectedId) || project.scenes[0];
      if (!!preset && !!scene) {
        get().updateScene(scene.id, {
          graphics: [...scene.graphics || [], {
            id: crypto.randomUUID(),
            ...preset.default
          }]
        });
      }
    },
    updateGraphic: (graphicId, patch) => {
      const {
        project,
        selectedId
      } = get();
      const scene = project.scenes.find((scene2) => scene2.id === selectedId) || project.scenes[0];
      if (scene) {
        get().updateScene(scene.id, {
          graphics: (scene.graphics || []).map((graphic) => graphic.id === graphicId ? {
            ...graphic,
            ...patch
          } : graphic)
        });
      }
    },
    removeGraphic: (graphicId) => {
      const {
        project,
        selectedId
      } = get();
      const scene = project.scenes.find((scene2) => scene2.id === selectedId) || project.scenes[0];
      if (scene) {
        get().updateScene(scene.id, {
          graphics: (scene.graphics || []).filter((graphic) => graphic.id !== graphicId)
        });
      }
    },
    moveGraphicTimeline: ({
      graphicId,
      newGlobalStartSeconds,
      newDurationSeconds
    }) => {
      const {
        project
      } = get();
      let targetGraphic = null;
      for (const scene of project.scenes) {
        const graphic = (scene.graphics || []).find((graphic2) => graphic2.id === graphicId);
        if (graphic) {
          targetGraphic = graphic;
          break;
        }
      }
      if (!targetGraphic) {
        return;
      }
      let elapsed = 0;
      let targetScene = project.scenes[0];
      let localStart = 0;
      for (const scene of project.scenes) {
        const duration = Number(scene.duration || 4);
        if (newGlobalStartSeconds >= elapsed && newGlobalStartSeconds < elapsed + duration) {
          targetScene = scene;
          localStart = newGlobalStartSeconds - elapsed;
          break;
        }
        elapsed += duration;
      }
      if (newGlobalStartSeconds >= elapsed) {
        targetScene = project.scenes[project.scenes.length - 1];
        localStart = Math.max(0, Number(targetScene.duration || 4) - 0.5);
      }
      const movedGraphic = {
        ...targetGraphic,
        fromMs: Math.max(0, Math.round(localStart * 1e3)),
        ...newDurationSeconds ? {
          durationMs: Math.max(500, Math.round(newDurationSeconds * 1e3))
        } : {}
      };
      get().pushHistory();
      const scenes = project.scenes.map((scene) => {
        let graphics = (scene.graphics || []).filter((graphic) => graphic.id !== graphicId);
        if (scene.id === targetScene.id) {
          graphics = [...graphics, movedGraphic];
        }
        return {
          ...scene,
          graphics
        };
      });
      set((state) => ({
        project: {
          ...state.project,
          scenes
        },
        selectedId: targetScene.id
      }));
    },
    randomizeMotions: () => {
      const {
        project
      } = get();
      const motions = ["gentle-zoom-in", "gentle-zoom-out", "pan-left", "pan-right", "pan-up", "pan-down", "drift-left-right", "drift-right-left", "cinematic-arc-left", "cinematic-arc-right", "soft-orbit-left", "soft-orbit-right", "zoom-pan-top-left", "zoom-pan-top-right", "zoom-pan-bottom-left", "zoom-pan-bottom-right", "breathe", "floating", "slow-drift"];
      get().pushHistory();
      const recent = [];
      const scenes = project.scenes.map((scene) => {
        const available = motions.filter((motion) => !recent.includes(motion));
        const picked = available[Math.floor(Math.random() * available.length)] || "gentle-zoom-in";
        recent.push(picked);
        if (recent.length > 3) {
          recent.shift();
        }
        return {
          ...scene,
          motion: picked
        };
      });
      set((state) => ({
        project: {
          ...state.project,
          scenes
        }
      }));
    },
    clearAllMotionGraphics: () => {
      const {
        project
      } = get();
      get().pushHistory();
      const scenes = project.scenes.map((scene) => ({
        ...scene,
        isStockMotion: false,
        graphics: []
      }));
      set((state) => ({
        project: {
          ...state.project,
          scenes
        }
      }));
    },
    removeAudioTrack: () => {
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          audioTrack: null
        }
      }));
    },
    removeMusicTrack: () => {
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          musicTrack: null
        }
      }));
    },
    clearCaptions: () => {
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          captionTrack: {
            ...state.project.captionTrack,
            cues: []
          }
        }
      }));
    },
    toggleAllMotionsStatic: () => {
      const {
        project
      } = get();
      get().pushHistory();
      const allStill = project.scenes.every((scene) => scene.motion === "still");
      const motions = ["gentle-zoom-in", "gentle-zoom-out", "pan-left", "pan-right", "drift-left-right", "drift-right-left", "cinematic-arc-left", "cinematic-arc-right", "soft-orbit-left", "soft-orbit-right", "breathe", "floating", "slow-drift"];
      const recent = [];
      const scenes = project.scenes.map((scene) => {
        if (allStill) {
          const available = motions.filter((motion) => !recent.includes(motion));
          const picked = available[Math.floor(Math.random() * available.length)] || "gentle-zoom-in";
          recent.push(picked);
          if (recent.length > 3) {
            recent.shift();
          }
          return {
            ...scene,
            motion: picked
          };
        } else {
          return {
            ...scene,
            motion: "still"
          };
        }
      });
      set((state) => ({
        project: {
          ...state.project,
          scenes
        }
      }));
      return !allStill;
    },
    resetMotionsStandard: () => {
      const {
        project
      } = get();
      get().pushHistory();
      const motions = ["gentle-zoom-in", "drift-left-right", "gentle-zoom-out", "drift-right-left"];
      const scenes = project.scenes.map((scene, index) => ({
        ...scene,
        motion: motions[index % motions.length]
      }));
      set((state) => ({
        project: {
          ...state.project,
          scenes
        }
      }));
    },
    addStyleReference: (input) => {
      const {
        project
      } = get();
      const styleReferences = Array.isArray(project.styleReferences) ? project.styleReferences : [];
      if (styleReferences.length >= 3) {
        return;
      }
      const url = input.url && !input.url.startsWith("blob:") ? input.url : input.base64 ? "data:" + (input.mimeType || "image/jpeg") + ";base64," + input.base64 : input.url || "";
      const reference = {
        id: input.id || crypto.randomUUID(),
        url,
        name: input.name || "Referencia " + (styleReferences.length + 1),
        base64: input.base64 || "",
        mimeType: input.mimeType || "image/jpeg",
        flowMediaId: input.flowMediaId || "",
        enabled: true
      };
      const nextRefs = [...styleReferences, reference].slice(0, 3);
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          styleReferences: nextRefs,
          customStyle: nextRefs[0] || null,
          visualStyle: "custom-style"
        },
        referenceStatus: "\u2713 Referencia de estilo agregada (" + nextRefs.length + "/3)"
      }));
    },
    removeStyleReference: (referenceId) => {
      const {
        project
      } = get();
      const nextRefs = (Array.isArray(project.styleReferences) ? project.styleReferences : []).filter((ref) => ref.id !== referenceId);
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          styleReferences: nextRefs,
          customStyle: nextRefs[0] || null,
          visualStyle: nextRefs.length > 0 ? "custom-style" : state.project.visualStyle === "custom-style" ? "western-anime" : state.project.visualStyle
        },
        referenceStatus: nextRefs.length > 0 ? "Referencias activas: " + nextRefs.length + "/3" : "Referencias eliminadas"
      }));
    },
    toggleStyleReference: (referenceId) => {
      const {
        project
      } = get();
      const nextRefs = (Array.isArray(project.styleReferences) ? project.styleReferences : []).map((ref) => ref.id === referenceId ? {
        ...ref,
        enabled: ref.enabled === false
      } : ref);
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          styleReferences: nextRefs
        }
      }));
    },
    clearStyleReferences: () => {
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          styleReferences: [],
          customStyle: null,
          visualStyle: state.project.visualStyle === "custom-style" ? "western-anime" : state.project.visualStyle
        }
      }));
    },
    toggleReferenceEnabled: () => {
      var characterReference;
      const {
        project
      } = get();
      if ((characterReference = project.characterReference) == null || !characterReference.url) {
        return;
      }
      const wasEnabled = project.characterReference.enabled !== false;
      const nextReference = {
        ...project.characterReference,
        enabled: !wasEnabled
      };
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          characterReference: nextReference
        },
        referenceStatus: wasEnabled ? "Referencia pausada" : "Referencia activada"
      }));
    },
    setReferenceMode: (mode) => {
      var characterReference;
      const {
        project
      } = get();
      if ((characterReference = project.characterReference) == null || !characterReference.url) {
        return;
      }
      const nextReference = {
        ...project.characterReference,
        mode
      };
      get().pushHistory();
      set((state) => ({
        project: {
          ...state.project,
          characterReference: nextReference
        },
        referenceStatus: mode === "style-and-character" ? "Modo: Estilo Visual + Personaje" : "Modo: Solo Personaje"
      }));
    },
    hydrate: async () => {
      var firstScene2;
      try {
        const activeProject = await _a();
        const project = dt(activeProject);
        set({
          project,
          selectedId: (firstScene2 = project.scenes[0]) == null ? void 0 : firstScene2.id,
          isHydrated: true
        });
      } catch {
        set({
          isHydrated: true
        });
      }
    },
    newProject: () => {
      var firstScene2;
      const {
        project
      } = get();
      if (project.scenes.some((scene) => scene.imageUrl || scene.videoUrl || scene.prompt) && !window.confirm("Crear un proyecto nuevo borra el actual. \xBFContinuar?")) {
        return;
      }
      const nextProject = dt(tt);
      set({
        project: nextProject,
        selectedId: (firstScene2 = nextProject.scenes[0]) == null ? void 0 : firstScene2.id,
        past: [],
        future: [],
        renderState: {
          status: "idle",
          message: "",
          url: ""
        },
        assetState: {
          status: "idle",
          message: ""
        },
        batchState: {
          running: false,
          done: 0,
          total: 0,
          failures: []
        }
      });
      Re(nextProject).catch(() => {
      });
    },
    clearProject: async () => {
      var firstScene2;
      if (!window.confirm("Borrar el proyecto actual y sus archivos locales del navegador. Esta accion no se puede deshacer. \xBFContinuar?")) {
        return;
      }
      const project = dt(tt);
      set({
        project,
        selectedId: (firstScene2 = project.scenes[0]) == null ? void 0 : firstScene2.id,
        past: [],
        future: [],
        renderState: {
          status: "idle",
          message: "",
          url: ""
        },
        assetState: {
          status: "idle",
          message: ""
        },
        batchState: {
          running: false,
          done: 0,
          total: 0,
          failures: []
        }
      });
      try {
        await Nn();
        set({
          assetState: {
            status: "ready",
            message: "Proyecto borrado. Empezando desde cero."
          }
        });
      } catch (error) {
        set({
          assetState: {
            status: "error",
            message: "No se pudo borrar: " + error.message
          }
        });
      }
    }
  };
});
const _Component12 = () => {
  const flowState = w((state) => state.flowState);
  const currentView = w((state) => state.currentView);
  const setCurrentView = w((state) => state.setCurrentView);
  const authUser = w((state) => state.authUser);
  const logout = w((state) => state.logout);
  const hasActiveTasks = w((state) => !!state.batchState.running || !!state.promptGenState.running || state.assetState.status === "loading" || state.renderState.status === "rendering");
  const handleClick = () => {
    var electronAPI;
    if ((electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
      window.electronAPI.openGoogleFlow();
    }
  };
  const openTaskCenter = (panel) => {
    window.dispatchEvent(new CustomEvent("flowtube:open-task-center", {
      detail: {
        panel
      }
    }));
  };
  return /* @__PURE__ */ jsxs("aside", { className: "rail", children: [
    /* @__PURE__ */ jsx("div", { className: "logo", title: "FLOWSTUDIO - Ir al Inicio", onClick: () => setCurrentView("dashboard"), style: {
      cursor: "pointer"
    }, children: "FT" }),
    /* @__PURE__ */ jsx("button", { className: "rail-button " + (currentView === "dashboard" ? "active" : ""), title: "Panel de Inicio & Proyectos (Dashboard)", onClick: () => setCurrentView("dashboard"), children: /* @__PURE__ */ jsxs("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
      /* @__PURE__ */ jsx("polyline", { points: "9 22 9 12 15 12 15 22" })
    ] }) }),
    /* @__PURE__ */ jsx("button", { className: "rail-button " + (currentView === "editor" ? "active" : ""), title: "Editor de Video & Timeline (Studio)", onClick: () => setCurrentView("editor"), children: /* @__PURE__ */ jsxs("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "2.18", ry: "2.18" }),
      /* @__PURE__ */ jsx("line", { x1: "7", y1: "2", x2: "7", y2: "22" }),
      /* @__PURE__ */ jsx("line", { x1: "17", y1: "2", x2: "17", y2: "22" }),
      /* @__PURE__ */ jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
      /* @__PURE__ */ jsx("line", { x1: "2", y1: "7", x2: "7", y2: "7" }),
      /* @__PURE__ */ jsx("line", { x1: "2", y1: "17", x2: "7", y2: "17" }),
      /* @__PURE__ */ jsx("line", { x1: "17", y1: "17", x2: "22", y2: "17" }),
      /* @__PURE__ */ jsx("line", { x1: "17", y1: "7", x2: "22", y2: "7" })
    ] }) }),
    /* @__PURE__ */ jsx("button", { className: "rail-button " + (currentView === "audio" ? "active" : ""), title: "Estudio de Audio & M\xFAsica IA (AI33.pro: Voces ElevenLabs, Di\xE1logos, Suno AI, SFX)", onClick: () => setCurrentView("audio"), style: {
      color: currentView === "audio" ? "#fff" : "#a855f7"
    }, children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" }),
      /* @__PURE__ */ jsx("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "19", x2: "12", y2: "23" }),
      /* @__PURE__ */ jsx("line", { x1: "8", y1: "23", x2: "16", y2: "23" })
    ] }) }),
    /* @__PURE__ */ jsx("button", { className: "rail-button " + (currentView === "thumbnails" ? "active" : ""), title: "Estudio de Miniaturas IA (4 Variantes de Alto CTR para YouTube)", onClick: () => setCurrentView("thumbnails"), style: {
      color: currentView === "thumbnails" ? "#fff" : "#f59e0b"
    }, children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
      /* @__PURE__ */ jsx("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
      /* @__PURE__ */ jsx("polyline", { points: "21 15 16 10 5 21" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "rail-spacer" }),
    /* @__PURE__ */ jsx("button", { className: "rail-button", title: "Logs y actividad de procesos", "aria-label": "Abrir logs", onClick: () => openTaskCenter("logs"), style: {
      color: "#a7b1c4"
    }, children: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
      /* @__PURE__ */ jsx("polyline", { points: "14 2 14 8 20 8" }),
      /* @__PURE__ */ jsx("line", { x1: "8", y1: "13", x2: "16", y2: "13" }),
      /* @__PURE__ */ jsx("line", { x1: "8", y1: "17", x2: "16", y2: "17" })
    ] }) }),
    /* @__PURE__ */ jsxs("button", { className: "rail-button", title: hasActiveTasks ? "Tareas: hay procesos activos" : "Centro de tareas", "aria-label": "Abrir centro de tareas", onClick: () => openTaskCenter("tasks"), style: {
      color: hasActiveTasks ? "#78a4ff" : "#a7b1c4",
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx("path", { d: "M9 11l3 3L22 4" }),
        /* @__PURE__ */ jsx("path", { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" })
      ] }),
      hasActiveTasks ? /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#5b8cff",
        boxShadow: "0 0 8px rgba(91,140,255,.9)"
      } }) : null
    ] }),
    /* @__PURE__ */ jsx("button", { className: "rail-button", title: "Cerrar Sesi\xF3n (" + ((authUser == null ? void 0 : authUser.username) || "Usuario") + ")", onClick: () => {
      if (window.confirm("\xBFCerrar sesi\xF3n en FLOWSTUDIO?")) {
        logout();
      }
    }, style: {
      color: "#8a94a6",
      fontSize: 16
    }, children: "\u{1F6AA}" }),
    /* @__PURE__ */ jsx("span", { className: "connection-dot " + (flowState.connected ? "online" : ""), title: flowState.connected ? "Google Flow: Conectado" : "Google Flow: Desconectado (Clic para conectar)", onClick: handleClick, style: {
      cursor: "pointer"
    } })
  ] });
};
const ba = [{
  value: "western-anime",
  label: "2D C\xF3mic / Webtoon"
}, {
  value: "stickman-2d",
  label: "2D Infogr\xE1fico editorial"
}, {
  value: "cinematico",
  label: "Cinem\xE1tico realista"
}, {
  value: "anime",
  label: "Anime / Manga"
}, {
  value: "pixel-art",
  label: "Pixel Art 8-bit"
}, {
  value: "stickman",
  label: "Stickman cl\xE1sico"
}, {
  value: "stickman-dark",
  label: "Stickman Dark"
}, {
  value: "low-poly",
  label: "Low Poly 3D"
}, {
  value: "salud",
  label: "Ilustraci\xF3n m\xE9dica"
}, {
  value: "fantasia",
  label: "Fantas\xEDa \xE9pica"
}, {
  value: "realista",
  label: "Fotograf\xEDa realista"
}];
const $n = ({
  onUploadCharacterReference,
  onRemoveCharacterReference,
  onRenderVideo,
  onOpenAccountsModal,
  onOpenMaintenance
}) => {
  var ba2;
  var customStyle;
  var audioTrack2;
  var audioTrack3;
  var captionTrack6;
  var cues4;
  var captionTrack7;
  var cues5;
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [updateInfo, setUpdateInfo] = React.useState(null);
  const settingsRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const authUser = w((state) => state.authUser);
  const project = w((state) => state.project);
  const renderState = w((state) => state.renderState);
  const referenceStatus = w((state) => state.referenceStatus);
  const updateProject = w((state) => state.updateProject);
  const setCurrentView = w((state) => state.setCurrentView);
  w((state) => state.setInspectorTab);
  const flowState = w((state) => state.flowState);
  w((state) => state.editorMode);
  w((state) => state.toggleEditorMode);
  React.useEffect(() => {
    if (!isSettingsOpen && !isMenuOpen) {
      return;
    }
    const handlePointerDown = (event) => {
      var current2;
      var current3;
      if (isSettingsOpen && ((current2 = settingsRef.current) == null || !current2.contains(event.target))) {
        setIsSettingsOpen(false);
      }
      if (isMenuOpen && ((current3 = menuRef.current) == null || !current3.contains(event.target))) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isSettingsOpen, isMenuOpen]);
  React.useEffect(() => {
    let cancelled = false;
    const checkForUpdates = async () => {
      var updates;
      var electronAPI2;
      var electronAPI3;
      try {
        const updatesData = await fetch("/api/updates").then((response2) => response2.ok ? response2.json() : null).catch(() => null);
        const latestUpdate = (updates = updatesData == null ? void 0 : updatesData.updates) == null ? void 0 : updates[0];
        if (latestUpdate) {
          const appVersion2 = (electronAPI2 = window.electronAPI) != null && electronAPI2.getAppVersion ? await window.electronAPI.getAppVersion() : "1.8.5";
          if (latestUpdate.version && String(latestUpdate.version).localeCompare(String(appVersion2), void 0, {
            numeric: true
          }) > 0) {
            if (!cancelled) {
              setUpdateInfo({
                version: latestUpdate.version,
                url: latestUpdate.url || "https://github.com/nmediastudio/flowstudio-releases/releases"
              });
            }
            return;
          }
        }
        const appVersion = (electronAPI3 = window.electronAPI) != null && electronAPI3.getAppVersion ? await window.electronAPI.getAppVersion() : "1.8.5";
        const response = await fetch("https://api.github.com/repos/nmediastudio/flowstudio-releases/releases/latest", {
          headers: {
            Accept: "application/vnd.github+json"
          }
        });
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        const latestVersion = String(data.tag_name || "").replace(/^v/, "");
        const hasUpdate = latestVersion && latestVersion !== appVersion && latestVersion.localeCompare(String(appVersion), void 0, {
          numeric: true
        }) > 0;
        if (!cancelled && hasUpdate) {
          setUpdateInfo({
            version: latestVersion,
            url: data.html_url || "https://github.com/nmediastudio/flowstudio-releases/releases"
          });
        }
      } catch {
      }
    };
    checkForUpdates();
    const timer = setInterval(checkForUpdates, 18e5);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);
  const addStyleReference = w((state) => state.addStyleReference);
  const removeStyleReference = w((state) => state.removeStyleReference);
  const styleReferences = Array.isArray(project.styleReferences) ? project.styleReferences : [];
  const [isStyleDragging, setIsStyleDragging] = React.useState(false);
  const [isCharacterDragging, setIsCharacterDragging] = React.useState(false);
  const resolveRefUrl = (ref) => ref ? ref.url && !ref.url.startsWith("blob:") ? ref.url : ref.base64 ? "data:" + (ref.mimeType || "image/jpeg") + ";base64," + ref.base64 : ref.url || "" : "";
  const uploadStyleReference = async (file) => {
    var type2;
    if (!file || (type2 = file.type) == null || !type2.startsWith("image/")) {
      return;
    }
    const uint8Array = new Uint8Array(await file.arrayBuffer());
    const chunkSize = 32768;
    let binary = "";
    for (let index = 0; index < uint8Array.length; index += chunkSize) {
      binary += String.fromCharCode(...uint8Array.subarray(index, index + chunkSize));
    }
    const base64 = btoa(binary);
    const mimeType = file.type || "image/jpeg";
    addStyleReference({
      name: file.name,
      url: "data:" + mimeType + ";base64," + base64,
      base64,
      mimeType
    });
  };
  const characterReference = project.characterReference;
  const label = ((ba2 = ba.find((ba3) => ba3.value === project.visualStyle)) == null ? void 0 : ba2.label) || (styleReferences.length > 0 ? "Estilo con " + styleReferences.length + " referencia" + (styleReferences.length > 1 ? "s" : "") : null) || ((customStyle = project.customStyle) == null ? void 0 : customStyle.name) || "Estilo personalizado";
  const handleChange = async (event) => {
    var files;
    const file = (files = event.target.files) == null ? void 0 : files[0];
    if (file) {
      await uploadStyleReference(file);
    }
    event.target.value = "";
  };
  const scenes = Array.isArray(project.scenes) ? project.scenes : [];
  scenes.length;
  scenes.filter((scene) => scene.imageUrl || scene.videoUrl || scene.isStockMotion).length;
  scenes.filter((scene) => (scene.prompt || "").trim().length > 0).length;
  if ((audioTrack2 = project.audioTrack) != null) {
    audioTrack2.url;
  }
  ((((audioTrack3 = project.audioTrack) == null ? void 0 : audioTrack3.durationMs) || 0) / 1e3).toFixed(1);
  if ((cues4 = (captionTrack6 = project.captionTrack) == null ? void 0 : captionTrack6.cues) != null) {
    cues4.length;
  }
  if ((cues5 = (captionTrack7 = project.captionTrack) == null ? void 0 : captionTrack7.cues) != null) {
    cues5.length;
  }
  return /* @__PURE__ */ jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ jsxs("div", { className: "topbar-leading", children: [
      /* @__PURE__ */ jsx("button", { className: "topbar-back", onClick: () => setCurrentView("dashboard"), title: "Volver a proyectos", "aria-label": "Volver a proyectos", children: "\u2039" }),
      /* @__PURE__ */ jsxs("div", { className: "topbar-title-block", children: [
        /* @__PURE__ */ jsx("span", { children: "PROYECTO" }),
        /* @__PURE__ */ jsx("input", { className: "project-title", value: project.title, onChange: (event) => updateProject({
          title: event.target.value
        }), placeholder: "Nombre del proyecto" }),
        /* @__PURE__ */ jsxs("small", { children: [
          project.format === "short" ? "Vertical 9:16" : "Horizontal 16:9",
          " \xB7 ",
          label
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "topbar-project-settings", ref: settingsRef, children: [
      /* @__PURE__ */ jsxs("button", { type: "button", className: "topbar-settings-trigger " + (isSettingsOpen ? "active" : ""), onClick: () => setIsSettingsOpen((prev) => !prev), "aria-expanded": isSettingsOpen, children: [
        /* @__PURE__ */ jsx("span", { className: "topbar-control-glyph", children: "\u25C6" }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("b", { children: "Dise\xF1o del proyecto" }),
          /* @__PURE__ */ jsx("small", { children: "Formato, estilo y personaje" })
        ] }),
        /* @__PURE__ */ jsx("i", { children: isSettingsOpen ? "\u25B4" : "\u25BE" })
      ] }),
      isSettingsOpen ? /* @__PURE__ */ jsxs("div", { className: "project-settings-popover", children: [
        /* @__PURE__ */ jsxs("div", { className: "project-settings-head", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "CONFIGURACI\xD3N VISUAL" }),
            /* @__PURE__ */ jsx("strong", { children: "Dise\xF1o del proyecto" })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsSettingsOpen(false), "aria-label": "Cerrar configuraci\xF3n", children: "\xD7" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "project-setting-section", children: [
          /* @__PURE__ */ jsx("label", { children: "Formato del video" }),
          /* @__PURE__ */ jsxs("div", { className: "format-switch", children: [
            /* @__PURE__ */ jsxs("button", { className: project.format === "short" ? "active" : "", onClick: () => updateProject({
              format: "short"
            }), children: [
              /* @__PURE__ */ jsx("b", { children: "9:16" }),
              /* @__PURE__ */ jsx("span", { children: "Vertical" })
            ] }),
            /* @__PURE__ */ jsxs("button", { className: project.format === "youtube" ? "active" : "", onClick: () => updateProject({
              format: "youtube"
            }), children: [
              /* @__PURE__ */ jsx("b", { children: "16:9" }),
              /* @__PURE__ */ jsx("span", { children: "Horizontal" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "project-setting-section", children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6
          }, children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "visual-style", style: {
              margin: 0
            }, children: "Estilo visual & Referencias" }),
            /* @__PURE__ */ jsxs("span", { style: {
              fontSize: 11,
              color: "var(--text-muted)",
              fontWeight: 700
            }, children: [
              styleReferences.length,
              "/3 Referencias"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("select", { id: "visual-style", className: "form-select", value: project.visualStyle, onChange: (event) => updateProject({
            visualStyle: event.target.value
          }), children: [
            ba.map((ba3) => /* @__PURE__ */ jsx("option", { value: ba3.value, children: ba3.label }, ba3.value)),
            styleReferences.length > 0 ? /* @__PURE__ */ jsxs("option", { value: "custom-style", children: [
              "\u2728 Estilo con ",
              styleReferences.length,
              " Referencia",
              styleReferences.length > 1 ? "s" : ""
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxs("div", { onDragOver: (event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsStyleDragging(true);
          }, onDragLeave: (event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsStyleDragging(false);
          }, onDrop: async (event) => {
            var dataTransfer;
            event.preventDefault();
            event.stopPropagation();
            setIsStyleDragging(false);
            const filteredFrom = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).filter((from) => {
              var type;
              if ((type = from.type) == null) {
                return void 0;
              } else {
                return type.startsWith("image/");
              }
            });
            for (const slice of filteredFrom.slice(0, 3 - styleReferences.length)) {
              await uploadStyleReference(slice);
            }
          }, style: {
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            border: isStyleDragging ? "2px dashed var(--foreground)" : "2px dashed transparent",
            borderRadius: "var(--radius-md)",
            padding: isStyleDragging ? 8 : 0,
            background: isStyleDragging ? "var(--accent)" : "transparent",
            transition: "all 0.15s ease"
          }, children: [
            isStyleDragging && /* @__PURE__ */ jsx("div", { style: {
              textAlign: "center",
              padding: "10px 0",
              color: "var(--foreground)",
              fontWeight: 700,
              fontSize: 11.5
            }, children: "Suelta aqu\xED las im\xE1genes de estilo (m\xE1x 3)" }),
            styleReferences.map((item, index) => {
              const previewUrl = resolveRefUrl(item);
              return /* @__PURE__ */ jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 10px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)"
              }, children: [
                /* @__PURE__ */ jsx("img", { src: previewUrl, alt: item.name, style: {
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  objectFit: "cover"
                }, onError: (event) => {
                  if (item.base64) {
                    event.currentTarget.src = "data:" + (item.mimeType || "image/jpeg") + ";base64," + item.base64;
                  }
                } }),
                /* @__PURE__ */ jsxs("div", { style: {
                  flex: 1,
                  minWidth: 0
                }, children: [
                  /* @__PURE__ */ jsx("div", { style: {
                    fontSize: 11.5,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }, children: item.name || "Referencia " + (index + 1) }),
                  /* @__PURE__ */ jsxs("div", { style: {
                    fontSize: 10,
                    color: "var(--text-muted)"
                  }, children: [
                    "Ref. #",
                    index + 1,
                    " para Google Flow"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeStyleReference(item.id), style: {
                  background: "rgba(239,68,68,0.15)",
                  color: "#f87171",
                  border: "none",
                  borderRadius: 6,
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 900
                }, title: "Eliminar referencia", children: "\xD7" })
              ] }, item.id || index);
            }),
            styleReferences.length < 3 && !isStyleDragging && /* @__PURE__ */ jsxs("label", { className: "project-upload-button", style: {
              margin: 0
            }, children: [
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: handleChange }),
              /* @__PURE__ */ jsx("span", { children: "\uFF0B" }),
              " ",
              styleReferences.length === 0 ? "Agregar o arrastrar imagen de estilo (m\xE1x 3)" : "\uFF0B Agregar o arrastrar #" + (styleReferences.length + 1) + " (m\xE1x 3)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "project-setting-section", children: [
          /* @__PURE__ */ jsx("label", { children: "Personaje de referencia (Avatar)" }),
          /* @__PURE__ */ jsxs("div", { onDragOver: (event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsCharacterDragging(true);
          }, onDragLeave: (event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsCharacterDragging(false);
          }, onDrop: (event) => {
            var dataTransfer;
            event.preventDefault();
            event.stopPropagation();
            setIsCharacterDragging(false);
            const from = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).find((from2) => {
              var type;
              if ((type = from2.type) == null) {
                return void 0;
              } else {
                return type.startsWith("image/");
              }
            });
            if (from) {
              if (onUploadCharacterReference != null) {
                onUploadCharacterReference(from);
              }
            }
          }, style: {
            border: isCharacterDragging ? "2px dashed var(--foreground)" : "2px dashed transparent",
            borderRadius: "var(--radius-md)",
            padding: isCharacterDragging ? 8 : 0,
            background: isCharacterDragging ? "var(--accent)" : "transparent",
            transition: "all 0.15s ease"
          }, children: [
            isCharacterDragging && /* @__PURE__ */ jsx("div", { style: {
              textAlign: "center",
              padding: "10px 0",
              color: "var(--foreground)",
              fontWeight: 700,
              fontSize: 11.5
            }, children: "Suelta aqu\xED la foto del Avatar / Personaje" }),
            resolveRefUrl(characterReference) ? /* @__PURE__ */ jsxs("div", { className: "reference-setting-row", children: [
              /* @__PURE__ */ jsx("img", { src: resolveRefUrl(characterReference), alt: "Referencia del personaje", onError: (event) => {
                if (characterReference.base64) {
                  event.currentTarget.src = "data:" + (characterReference.mimeType || "image/jpeg") + ";base64," + characterReference.base64;
                }
              } }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Referencia activa" }),
                /* @__PURE__ */ jsx("small", { children: referenceStatus || "Se aplicar\xE1 a las escenas con personaje" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "compact-file-button", children: [
                /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: (event) => {
                  var files;
                  return onUploadCharacterReference((files = event.target.files) == null ? void 0 : files[0]);
                } }),
                "Cambiar"
              ] }),
              /* @__PURE__ */ jsx("button", { type: "button", className: "compact-danger-button", onClick: onRemoveCharacterReference, children: "Quitar" })
            ] }) : !isCharacterDragging && /* @__PURE__ */ jsxs("label", { className: "reference-empty-button", children: [
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: (event) => {
                var files;
                return onUploadCharacterReference((files = event.target.files) == null ? void 0 : files[0]);
              } }),
              /* @__PURE__ */ jsx("span", { children: "\uFF0B" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Agregar o arrastrar personaje" }),
                /* @__PURE__ */ jsx("small", { children: "Arrastra una foto para consistencia de avatar" })
              ] })
            ] })
          ] })
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "topbar-right", children: [
      (!authUser || authUser.role === "guest" || authUser.isLicensed === false || authUser.licenseExpiresAt && authUser.licenseExpiresAt < Date.now()) && /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => window.dispatchEvent(new CustomEvent("open-activation-modal", {
        detail: {
          reason: "Desbloquea o renueva todas las funciones de IA y exportaci\xF3n"
        }
      })), style: {
        background: "linear-gradient(135deg, rgba(215, 255, 79, 0.2), rgba(16, 185, 129, 0.2))",
        border: "1px solid rgba(215, 255, 79, 0.6)",
        color: "#d7ff4f",
        fontWeight: 900,
        fontSize: 11,
        padding: "5px 12px",
        borderRadius: 8,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        boxShadow: "0 0 16px rgba(215, 255, 79, 0.25)"
      }, title: "Haz clic para activar o renovar tu clave de licencia FLOWSTUDIO", children: [
        /* @__PURE__ */ jsx("span", { children: "\u{1F511}" }),
        /* @__PURE__ */ jsx("span", { children: authUser != null && authUser.licenseExpiresAt && authUser.licenseExpiresAt < Date.now() ? "Renovar Licencia" : "Activar Licencia VIP" })
      ] }),
      updateInfo ? /* @__PURE__ */ jsxs("button", { type: "button", className: "topbar-chip-update", onClick: () => window.dispatchEvent(new CustomEvent("open-auto-update-modal", {
        detail: updateInfo
      })), title: "Hay una nueva versi\xF3n disponible. Haz clic para actualizar en segundo plano", style: {
        cursor: "pointer",
        border: "none"
      }, children: [
        "\u{1F680} Nueva versi\xF3n ",
        updateInfo.version
      ] }) : null,
      /* @__PURE__ */ jsx("button", { className: "topbar-utility-button", onClick: onOpenMaintenance, title: "Almacenamiento, registros y copias", children: "Herramientas" }),
      /* @__PURE__ */ jsxs("button", { className: "flow-connection-button " + (flowState.connected ? "online" : ""), onClick: onOpenAccountsModal, children: [
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("b", { children: "Google Flow" }),
          /* @__PURE__ */ jsx("small", { children: flowState.connected ? "Cuenta conectada" : "Conectar cuenta" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "render-button", onClick: () => {
        if (renderState.status === "rendering") {
          window.dispatchEvent(new CustomEvent("open-render-modal"));
        } else {
          onRenderVideo();
        }
      }, title: renderState.status === "rendering" ? "Haz clic para ver el visor de progreso del render" : "Exportar video MP4", children: renderState.status === "rendering" ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "working" }),
        " Renderizando \u{1F441}\uFE0F"
      ] }) : /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
        "Exportar ",
        /* @__PURE__ */ jsx("span", { children: "MP4" })
      ] }) })
    ] })
  ] });
};
const _Component11 = () => {
  const [appVersion, setAppVersion] = React.useState("1.8.5");
  React.useEffect(() => {
    var electronAPI;
    var getAppVersion;
    if ((getAppVersion = (electronAPI = window.electronAPI) == null ? void 0 : electronAPI.getAppVersion) != null) {
      getAppVersion.call(electronAPI).then((result) => setAppVersion(result || "1.8.5")).catch(() => {
      });
    }
  }, []);
  return /* @__PURE__ */ jsxs("footer", { className: "support-footer", "aria-label": "Soporte FLOWSTUDIO", children: [
    /* @__PURE__ */ jsxs("span", { children: [
      "FLOWSTUDIO ",
      appVersion
    ] }),
    /* @__PURE__ */ jsx("span", { className: "support-footer-separator", children: "\xB7" }),
    /* @__PURE__ */ jsx("a", { href: "https://t.me/Oxdailyy", target: "_blank", rel: "noreferrer", children: "Soporte Telegram" }),
    /* @__PURE__ */ jsx("span", { className: "support-footer-separator", children: "\xB7" }),
    /* @__PURE__ */ jsx("a", { href: "https://t.me/+4jBsXihcFv01NjJh", target: "_blank", rel: "noreferrer", children: "Grupo de la comunidad" })
  ] });
};
const zn = (motion, frame, durationInFrames, customMotion = null) => {
  const progress = Math.max(0, Math.min(1, frame / Math.max(1, durationInFrames - 1)));
  const eased = Easing.bezier(0.42, 0, 0.58, 1)(progress);
  const lerp = (from, to, t = eased) => from + (to - from) * t;
  const toTransform = ({
    scale = 1.08,
    x = 0,
    y = 0,
    rotation = 0
  }) => ({
    scale: String(scale),
    translate: x + "% " + y + "%",
    rotate: rotation + "deg",
    transformOrigin: "50% 50%"
  });
  if (motion === "custom" && customMotion) {
    let customEased = eased;
    if (customMotion.easing === "linear") {
      customEased = progress;
    } else if (customMotion.easing === "ease-in") {
      customEased = Easing.in(Easing.cubic)(progress);
    } else if (customMotion.easing === "ease-out") {
      customEased = Easing.out(Easing.cubic)(progress);
    } else if (customMotion.easing === "dramatic") {
      customEased = Easing.bezier(0.77, 0, 0.175, 1)(progress);
    }
    const startScale = Number(customMotion.startScale ?? 1);
    const endScale = Number(customMotion.endScale ?? 1.15);
    const startX = Number(customMotion.startX ?? 0);
    const endX = Number(customMotion.endX ?? 0);
    const startY = Number(customMotion.startY ?? 0);
    const endY = Number(customMotion.endY ?? 0);
    const startRotation = Number(customMotion.startRotation ?? 0);
    const endRotation = Number(customMotion.endRotation ?? 0);
    return toTransform({
      scale: lerp(startScale, endScale, customEased),
      x: lerp(startX, endX, customEased),
      y: lerp(startY, endY, customEased),
      rotation: lerp(startRotation, endRotation, customEased)
    });
  }
  switch (motion) {
    case "zoom-out":
      return toTransform({
        scale: lerp(1.18, 1.02)
      });
    case "gentle-zoom-in":
      return toTransform({
        scale: lerp(1.03, 1.11)
      });
    case "gentle-zoom-out":
      return toTransform({
        scale: lerp(1.11, 1.03)
      });
    case "pan-left":
      return toTransform({
        scale: 1.14,
        x: lerp(4, -4)
      });
    case "pan-right":
      return toTransform({
        scale: 1.14,
        x: lerp(-4, 4)
      });
    case "pan-up":
      return toTransform({
        scale: 1.14,
        y: lerp(4, -4)
      });
    case "pan-down":
      return toTransform({
        scale: 1.14,
        y: lerp(-4, 4)
      });
    case "zoom-pan-top-left":
      return toTransform({
        scale: lerp(1.02, 1.18),
        x: lerp(0, 2.5),
        y: lerp(0, 2.5)
      });
    case "zoom-pan-bottom-right":
      return toTransform({
        scale: lerp(1.02, 1.18),
        x: lerp(0, -2.5),
        y: lerp(0, -2.5)
      });
    case "zoom-pan-top-right":
      return toTransform({
        scale: lerp(1.02, 1.18),
        x: lerp(0, -2.5),
        y: lerp(0, 2.5)
      });
    case "zoom-pan-bottom-left":
      return toTransform({
        scale: lerp(1.02, 1.18),
        x: lerp(0, 2.5),
        y: lerp(0, -2.5)
      });
    case "whip-zoom-in":
      return toTransform({
        scale: lerp(1.02, 1.2),
        y: lerp(0.35, -0.2)
      });
    case "camera-tilt-left":
      return toTransform({
        scale: lerp(1.08, 1.15),
        rotation: lerp(1.5, -1.5)
      });
    case "camera-tilt-right":
      return toTransform({
        scale: lerp(1.08, 1.15),
        rotation: lerp(-1.5, 1.5)
      });
    case "slow-drift":
      return toTransform({
        scale: lerp(1.03, 1.07),
        x: lerp(-1.5, 1.5),
        y: Math.sin(Math.PI * eased) * 0.22
      });
    case "drift-left-right":
      return toTransform({
        scale: 1.12,
        x: lerp(-3.2, 3.2),
        y: Math.sin(Math.PI * eased) * -0.45
      });
    case "drift-right-left":
      return toTransform({
        scale: 1.12,
        x: lerp(3.2, -3.2),
        y: Math.sin(Math.PI * eased) * 0.45
      });
    case "cinematic-arc-left":
      return toTransform({
        scale: lerp(1.1, 1.15),
        x: lerp(3.2, -3.2),
        y: 0.85 - Math.sin(Math.PI * eased) * 1.7,
        rotation: lerp(0.7, -0.7)
      });
    case "cinematic-arc-right":
      return toTransform({
        scale: lerp(1.1, 1.15),
        x: lerp(-3.2, 3.2),
        y: 0.85 - Math.sin(Math.PI * eased) * 1.7,
        rotation: lerp(-0.7, 0.7)
      });
    case "soft-orbit-left": {
      const angle = Math.PI * (0.1 + eased * 1.25);
      return toTransform({
        scale: 1.13,
        x: Math.cos(angle) * 2.15,
        y: Math.sin(angle) * 1.15,
        rotation: lerp(0.45, -0.45)
      });
    }
    case "soft-orbit-right": {
      const angle = Math.PI * (0.9 - eased * 1.25);
      return toTransform({
        scale: 1.13,
        x: Math.cos(angle) * 2.15,
        y: Math.sin(angle) * 1.15,
        rotation: lerp(-0.45, 0.45)
      });
    }
    case "breathe": {
      const pulse = (1 - Math.cos(Math.PI * 4 * eased)) / 2;
      return toTransform({
        scale: 1.045 + pulse * 0.025,
        y: Math.cos(Math.PI * 4 * eased) * 0.16
      });
    }
    case "floating": {
      const angle = Math.PI * 2 * eased;
      return toTransform({
        scale: 1.11 + (1 - Math.cos(angle)) * 8e-3,
        x: Math.sin(angle) * 0.8,
        y: Math.cos(angle) * 1.15,
        rotation: Math.sin(angle) * 0.22
      });
    }
    case "still":
      return toTransform({
        scale: 1.01
      });
    case "zoom-in":
    default:
      return toTransform({
        scale: lerp(1.02, 1.18)
      });
  }
};
const _Component = () => /* @__PURE__ */ jsx(AbsoluteFill, { style: {
  backgroundColor: "#0d0e12",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}, children: /* @__PURE__ */ jsxs("div", { style: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  opacity: 0.3,
  color: "#ffffff"
}, children: [
  /* @__PURE__ */ jsxs("svg", { width: "44", height: "44", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "9", r: "2" }),
    /* @__PURE__ */ jsx("path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
  ] }),
  /* @__PURE__ */ jsx("span", { style: {
    fontFamily: "'Geist Variable', system-ui, -apple-system, sans-serif",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em"
  }, children: "Sin Imagen" })
] }) });
const On = ({
  scene,
  durationInFrames,
  fps,
  transition = "none",
  transitionSeconds = 0.35,
  hasPrevious = false,
  hasNext = false
}) => {
  const frame = useCurrentFrame();
  const isHidden = !!scene.imageHidden || !!scene.hidden;
  const isStockMotion = scene.isStockMotion || (scene.graphics || []).some((graphic) => graphic.preset === "stock-motion-card");
  const videoUrl = scene.videoUrl || scene.flowVideoUrl || "";
  const imageUrl = videoUrl || scene.imageUrl;
  const mediaStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    ...zn(videoUrl ? "still" : scene.motion, frame, durationInFrames, scene.customMotion)
  };
  const transitionFrames = Math.max(1, Math.min(Math.round(Number(transitionSeconds || 0.35) * fps), Math.floor(durationInFrames / 3)));
  const enterProgress = hasPrevious && transition !== "none" ? interpolate(frame, [0, transitionFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }) : 1;
  const exitProgress = hasNext && transition !== "none" ? interpolate(frame, [durationInFrames - transitionFrames, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }) : 1;
  const transitionStyle = transition === "fade" ? {
    opacity: Math.min(enterProgress, exitProgress)
  } : transition === "slide-left" ? {
    opacity: Math.min(enterProgress * 1.15, exitProgress * 1.15),
    transform: "translateX(" + ((1 - enterProgress) * 7 - (1 - exitProgress) * 7) + "%)"
  } : transition === "slide-right" ? {
    opacity: Math.min(enterProgress * 1.15, exitProgress * 1.15),
    transform: "translateX(" + ((1 - exitProgress) * 7 - (1 - enterProgress) * 7) + "%)"
  } : transition === "zoom" ? {
    opacity: Math.min(enterProgress * 1.15, exitProgress * 1.15),
    transform: "scale(" + (0.94 + Math.min(enterProgress, exitProgress) * 0.06) + ")"
  } : transition === "wipe" ? {
    clipPath: "inset(0 " + (1 - enterProgress) * 100 + "% 0 " + (1 - exitProgress) * 100 + "%)"
  } : {};
  return /* @__PURE__ */ jsxs(AbsoluteFill, { style: {
    backgroundColor: "#000000",
    overflow: "hidden",
    ...transitionStyle
  }, children: [
    isHidden ? /* @__PURE__ */ jsx(AbsoluteFill, { style: {
      backgroundColor: "#000000"
    } }) : isStockMotion ? /* @__PURE__ */ jsx(_Component, { frame, durationInFrames, fps }) : imageUrl ? videoUrl ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsx(RemotionVideo, { src: imageUrl, muted: true, style: mediaStyle, onError: (error) => {
        console.warn("Video playback warning:", error);
      } }),
      scene.muted ? null : /* @__PURE__ */ jsx(RemotionAudio, { src: imageUrl, volume: scene.videoVolume !== void 0 ? Number(scene.videoVolume) : scene.volume !== void 0 ? Number(scene.volume) : 1 })
    ] }) : /* @__PURE__ */ jsx(RemotionImg, { src: imageUrl, style: mediaStyle }) : /* @__PURE__ */ jsx(_Component, { frame, durationInFrames, fps }),
    scene.caption && !scene._skipLegacyCaption ? /* @__PURE__ */ jsx("div", { style: {
      position: "absolute",
      left: "7%",
      right: "7%",
      bottom: "8%",
      color: "white",
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: 52,
      fontWeight: 800,
      lineHeight: 1.1,
      textShadow: "0 4px 20px rgba(0,0,0,0.8)",
      textAlign: "center"
    }, children: scene.caption }) : null
  ] });
};
const Fn = ({
  cues,
  fps,
  style
}) => {
  const currentMs = useCurrentFrame() / fps * 1e3;
  const activeCues = (cues || []).filter((cue) => {
    const startMs = Number(cue.startMs ?? Number(cue.startSeconds || 0) * 1e3);
    const endMs = Number(cue.endMs ?? Number(cue.endSeconds || 0) * 1e3);
    return currentMs >= startMs && currentMs < endMs;
  });
  if (!activeCues.length) {
    return null;
  }
  const position = (style == null ? void 0 : style.position) || "bottom";
  const value25 = Number((style == null ? void 0 : style.posY) ?? (position === "top" ? 12 : position === "center" ? 50 : 84));
  const animation = (style == null ? void 0 : style.animation) || "soft-scale";
  const wordByWord = (style == null ? void 0 : style.wordByWord) !== false;
  const wordHighlightEnabled = (style == null ? void 0 : style.wordHighlight) !== false;
  const highlightColor = (style == null ? void 0 : style.highlightColor) || "#d7ff4f";
  const outlineColor = (style == null ? void 0 : style.outlineColor) || "#08090d";
  const value26 = Number((style == null ? void 0 : style.outlineWidth) ?? 5);
  const value27 = Number((style == null ? void 0 : style.glow) ?? 20);
  const joined = value26 > 0 ? [value26 + "px 0 0 " + outlineColor, "-" + value26 + "px 0 0 " + outlineColor, "0 " + value26 + "px 0 " + outlineColor, "0 -" + value26 + "px 0 " + outlineColor, Math.round(value26 * 0.72) + "px " + Math.round(value26 * 0.72) + "px 0 " + outlineColor, "-" + Math.round(value26 * 0.72) + "px " + Math.round(value26 * 0.72) + "px 0 " + outlineColor, Math.round(value26 * 0.72) + "px -" + Math.round(value26 * 0.72) + "px 0 " + outlineColor, "-" + Math.round(value26 * 0.72) + "px -" + Math.round(value26 * 0.72) + "px 0 " + outlineColor].join(", ") : "";
  const containerStyle = {
    position: "absolute",
    left: "4%",
    right: "4%",
    top: value25 + "%",
    transform: "translateY(-50%)",
    zIndex: 20,
    color: (style == null ? void 0 : style.color) || "#ffffff",
    fontFamily: (style == null ? void 0 : style.fontFamily) || "'Inter', Arial, sans-serif",
    fontSize: Number((style == null ? void 0 : style.fontSize) || 54),
    fontWeight: Number((style == null ? void 0 : style.fontWeight) || 900),
    lineHeight: 1.24,
    textAlign: "center",
    letterSpacing: Number((style == null ? void 0 : style.letterSpacing) ?? 0) + "px",
    textTransform: style != null && style.uppercase ? "uppercase" : "none",
    textShadow: [joined, value27 > 0 ? "0 0 " + value27 + "px rgba(0,0,0,.85)" : ""].filter(Boolean).join(",")
  };
  return /* @__PURE__ */ jsx(AbsoluteFill, { style: {
    pointerEvents: "none"
  }, children: /* @__PURE__ */ jsx("div", { style: containerStyle, children: activeCues.map((cue, index) => {
    const startMs = Number(cue.startMs ?? Number(cue.startSeconds || 0) * 1e3);
    const endMs = Number(cue.endMs ?? Number(cue.endSeconds || 0) * 1e3);
    const value28 = Math.max(100, endMs - startMs);
    const value29 = Math.max(0, currentMs - startMs);
    const value30 = Math.min(1, value29 / value28);
    const value31 = Math.max(0, Math.round(value29 / 1e3 * fps));
    const filteredSplit = String(cue.text || "").split(/\s+/).filter(Boolean);
    const isArray = Array.isArray(cue.words) && cue.words.length > 0;
    const words = isArray ? cue.words.map((word) => typeof word == "string" ? word : word.word || "") : filteredSplit;
    const length = words.length;
    let wordIndex = -1;
    if (isArray) {
      wordIndex = cue.words.findIndex((word) => {
        const startMs2 = Number(word.startMs ?? Number(word.startSeconds || 0) * 1e3);
        const endMs2 = Number(word.endMs ?? Number(word.endSeconds || 0) * 1e3);
        return currentMs >= startMs2 && currentMs < endMs2;
      });
      if (wordIndex === -1 && currentMs >= Number(cue.words[cue.words.length - 1].endMs ?? endMs)) {
        wordIndex = cue.words.length - 1;
      }
    } else if (length > 1) {
      wordIndex = Math.min(length - 1, Math.floor(value30 * length));
    } else if (length === 1) {
      wordIndex = 0;
    }
    if (!wordHighlightEnabled) {
      wordIndex = -1;
    }
    const value32 = Number((style == null ? void 0 : style.maxWordsPerScreen) || 0);
    let displayWords = words;
    let displayWordIndex = wordIndex;
    if (value32 > 0 && words.length > value32) {
      const value33 = Math.ceil(words.length / value32);
      const groupStartIndex = (wordIndex >= 0 ? Math.min(value33 - 1, Math.floor(wordIndex / value32)) : Math.min(value33 - 1, Math.floor(value30 * value33))) * value32;
      const length2 = Math.min(words.length, groupStartIndex + value32);
      displayWords = words.slice(groupStartIndex, length2);
      displayWordIndex = wordIndex >= 0 ? wordIndex - groupStartIndex : -1;
    }
    wordIndex = displayWordIndex;
    if (animation === "viral-yellow-pop") {
      const activeColor = highlightColor;
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.32em",
        maxWidth: "96%",
        margin: "0 auto",
        textTransform: "uppercase",
        fontFamily: (style == null ? void 0 : style.fontFamily) || "'Montserrat', 'Impact', 'Arial Black', Arial, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.5px",
        lineHeight: 1.15
      }, children: displayWords.map((item, index2) => {
        const isActiveWord = index2 === wordIndex;
        const startMs2 = isArray && cue.words[index2] ? Number(cue.words[index2].startMs) : Number(cue.startMs) + index2 / Math.max(1, displayWords.length) * value28;
        const value34 = Math.max(0, Math.round((startMs2 - Number(cue.startMs)) / 1e3 * fps));
        const value35 = Math.max(0, value31 - value34);
        const springValue = spring({
          frame: value35,
          fps,
          config: {
            damping: 13,
            stiffness: 185,
            mass: 0.4
          }
        });
        const scaleValue = isActiveWord ? 1.08 + springValue * 0.08 : 1;
        const translateYValue = isActiveWord ? springValue * -3 : 0;
        return /* @__PURE__ */ jsx("span", { style: {
          display: "inline-block",
          transform: "translateY(" + translateYValue + "px) scale(" + scaleValue + ")",
          color: isActiveWord ? activeColor : "#ffffff",
          WebkitTextStroke: Math.max(3.5, value26) + "px #000000",
          paintOrder: "stroke fill",
          textShadow: isActiveWord ? "0 0 20px " + activeColor + "aa, 0 4px 12px #000000, 0 8px 24px rgba(0,0,0,0.9)" : "0 4px 12px #000000, 0 8px 24px rgba(0,0,0,0.9)",
          fontWeight: 900
        }, children: item }, index2);
      }) }, cue.id || index);
    }
    const joined2 = displayWords.join(" ");
    if (animation === "soft-scale" || animation === "pop-up") {
      const springValue = spring({
        frame: value31,
        fps,
        config: animation === "soft-scale" ? {
          damping: 24,
          stiffness: 92,
          mass: 0.8
        } : {
          damping: 13,
          stiffness: 155,
          mass: 0.65
        }
      });
      const value36 = Math.max(6, Math.round(value28 / 1e3 * fps));
      const opacityValue = interpolate(value31, [0, 5, Math.max(6, value36 - 5), value36], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      const transformValue = animation === "soft-scale" ? "scale(" + (0.94 + springValue * 0.06) + ")" : "translateY(" + (1 - springValue) * 24 + "px) scale(" + (0.92 + springValue * 0.08) + ")";
      if (wordByWord) {
        return /* @__PURE__ */ jsx("div", { style: {
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.28em",
          opacity: opacityValue,
          transform: transformValue
        }, children: displayWords.map((item, index2) => {
          const startMs2 = isArray && cue.words[index2] ? Number(cue.words[index2].startMs) : Number(cue.startMs) + index2 / Math.max(1, displayWords.length) * value28;
          const value37 = Math.max(0, Math.round((startMs2 - Number(cue.startMs)) / 1e3 * fps));
          const wordSpring = spring({
            frame: Math.max(0, value31 - value37),
            fps,
            config: {
              damping: 20,
              stiffness: 110,
              mass: 0.7
            }
          });
          const isActiveWord = index2 === wordIndex;
          return /* @__PURE__ */ jsx("span", { style: {
            display: "inline-block",
            opacity: value31 < value37 ? 0 : 1,
            transform: "translateY(" + (1 - wordSpring) * (animation === "pop-up" ? 16 : 8) + "px) scale(" + (isActiveWord ? 1.08 : 1) + ")",
            color: isActiveWord ? highlightColor : "#ffffff",
            textShadow: isActiveWord ? "0 0 " + value27 + "px " + highlightColor + ", " + joined : joined
          }, children: item }, index2);
        }) }, cue.id || index);
      } else {
        return /* @__PURE__ */ jsx("div", { style: {
          display: "inline-block",
          opacity: opacityValue,
          transform: transformValue,
          padding: "5px 12px",
          textShadow: joined
        }, children: joined2 }, cue.id || index);
      }
    }
    if (animation === "claude-kinetic-reveal") {
      const activeColor = highlightColor;
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "baseline",
        gap: "0.3em",
        maxWidth: "94%",
        margin: "0 auto",
        lineHeight: 1.25
      }, children: displayWords.map((item, index2) => {
        let startMs2 = 0;
        if (isArray && cue.words[index2]) {
          startMs2 = Number(cue.words[index2].startMs);
        } else {
          const wordRatio = index2 / Math.max(1, displayWords.length);
          startMs2 = Number(cue.startMs) + wordRatio * value28;
        }
        const value38 = Math.max(0, Math.round((startMs2 - Number(cue.startMs)) / 1e3 * fps));
        const wordFrame = value31 - value38;
        if (wordFrame < 0) {
          return null;
        }
        const translateYValue = (1 - spring({
          frame: wordFrame,
          fps,
          config: {
            damping: 20,
            stiffness: 100,
            mass: 0.55
          }
        })) * 14;
        const opacityValue = interpolate(wordFrame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        const isActiveWord = index2 === wordIndex;
        const wiggleOffset = isActiveWord ? Math.sin(wordFrame / fps * 5) * 3 + 14 : 0;
        return /* @__PURE__ */ jsx("span", { style: {
          display: "inline-block",
          transform: "translateY(" + translateYValue + "px) scale(" + (isActiveWord ? 1.04 : 1) + ")",
          opacity: opacityValue,
          color: isActiveWord ? activeColor : "#ffffff",
          textShadow: isActiveWord ? "0 0 " + wiggleOffset + "px " + activeColor + ", 0 2px 10px rgba(0,0,0,0.8), " + joined : joined,
          fontWeight: 900
        }, children: item }, index2);
      }) }, cue.id || index);
    }
    if (animation === "char-slide-highlight") {
      let charCounter = 0;
      const value39 = wordIndex !== -1 ? wordIndex : Math.floor(displayWords.length / 2);
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.32em"
      }, children: displayWords.map((item, index2) => {
        const isActiveWord = index2 === value39 || wordIndex !== -1 && index2 === wordIndex;
        const parts = String(item).split("");
        const element = /* @__PURE__ */ jsx("span", { style: {
          display: "inline-flex",
          transform: isActiveWord ? "scale(1.08)" : "scale(1)",
          color: isActiveWord ? highlightColor : "#ffffff",
          textShadow: isActiveWord ? "0 0 26px " + highlightColor + ", " + joined : joined
        }, children: parts.map((item2, index3) => {
          const charDelay = charCounter++ * 0.8;
          const value40 = Math.max(0, value31 - charDelay);
          const charTranslateY = (1 - interpolate(value40, [0, 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.35))
          })) * 36;
          const charOpacity = interpolate(value40, [0, 5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp"
          });
          return /* @__PURE__ */ jsx("span", { style: {
            display: "inline-block",
            transform: "translateY(" + charTranslateY + "px)",
            opacity: charOpacity
          }, children: item2 }, index3);
        }) }, index2);
        charCounter++;
        return element;
      }) }, cue.id || index);
    }
    if (animation === "karaoke") {
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.28em"
      }, children: displayWords.map((item, index2) => {
        const isActiveWord = index2 === wordIndex;
        const isPastWord = wordIndex !== -1 && index2 < wordIndex;
        return /* @__PURE__ */ jsx("span", { style: {
          color: isActiveWord ? highlightColor : isPastWord ? "#ffffff" : "rgba(255,255,255,0.72)",
          transform: isActiveWord ? "scale(1.14)" : "scale(1)",
          display: "inline-block",
          textShadow: isActiveWord ? "0 0 24px " + highlightColor + ", " + joined : joined
        }, children: item }, index2);
      }) }, cue.id || index);
    }
    if (animation === "hormozi-pill") {
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.32em"
      }, children: displayWords.map((item, index2) => {
        const isActiveWord = index2 === wordIndex;
        return /* @__PURE__ */ jsx("span", { style: {
          display: "inline-block",
          padding: isActiveWord ? "3px 12px" : "3px 0",
          background: isActiveWord ? highlightColor : "transparent",
          color: isActiveWord ? "#060709" : "#ffffff",
          borderRadius: 10,
          transform: isActiveWord ? "scale(1.12) rotate(-1.5deg)" : "scale(1)",
          boxShadow: isActiveWord ? "0 6px 20px rgba(0,0,0,0.6), 0 0 16px " + highlightColor : "none",
          textShadow: isActiveWord ? "none" : joined,
          fontWeight: 900
        }, children: item }, index2);
      }) }, cue.id || index);
    }
    if (animation === "hormozi") {
      const springValue = spring({
        frame: value31,
        fps,
        config: {
          damping: 11,
          stiffness: 160
        }
      });
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-block",
        transform: "scale(" + (0.7 + springValue * 0.3) + ") rotate(" + (value31 % 2 === 0 ? -1.5 : 1.5) + "deg)",
        padding: "10px 28px",
        background: "#000000",
        borderRadius: 16,
        border: "3.5px solid " + highlightColor,
        boxShadow: "0 10px 36px rgba(0,0,0,0.85), 0 0 24px " + highlightColor + "66",
        color: highlightColor
      }, children: joined2 }, cue.id || index);
    }
    if (animation === "word-underline") {
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.3em"
      }, children: displayWords.map((item, index2) => {
        const isActiveWord = index2 === wordIndex;
        const startMs2 = isArray && cue.words[index2] ? Number(cue.words[index2].startMs) : Number(cue.startMs) + index2 / Math.max(1, displayWords.length) * value28;
        const wordFrame = (currentMs - startMs2) / 1e3 * fps;
        const underlineWidth = isActiveWord ? interpolate(wordFrame, [0, 7], [0, 100], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1)
        }) : 0;
        return /* @__PURE__ */ jsxs("span", { style: {
          position: "relative",
          display: "inline-block",
          color: isActiveWord ? highlightColor : "#fff",
          textShadow: joined
        }, children: [
          item,
          /* @__PURE__ */ jsx("span", { style: {
            position: "absolute",
            left: 0,
            bottom: -5,
            width: underlineWidth + "%",
            height: Math.max(3, Math.round(Number((style == null ? void 0 : style.fontSize) || 54) * 0.08)),
            borderRadius: 8,
            background: highlightColor,
            boxShadow: "0 0 12px " + highlightColor
          } })
        ] }, index2);
      }) }, cue.id || index);
    }
    if (animation === "minimal-lower-third") {
      const opacityValue = interpolate(value30, [0, 0.14, 0.88, 1], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.4, 0, 1, 1)]
      });
      return /* @__PURE__ */ jsxs("div", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 24px",
        borderRadius: 16,
        background: "rgba(7,10,16,.72)",
        border: "1px solid rgba(255,255,255,.18)",
        boxShadow: "0 12px 38px rgba(0,0,0,.48)",
        backdropFilter: "blur(14px)",
        opacity: opacityValue,
        translate: (1 - opacityValue) * -24 + "px 0",
        fontWeight: 700,
        textShadow: "none"
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          width: 6,
          alignSelf: "stretch",
          borderRadius: 8,
          background: highlightColor,
          boxShadow: "0 0 14px " + highlightColor
        } }),
        /* @__PURE__ */ jsx("span", { children: joined2 })
      ] }, cue.id || index);
    }
    if (animation === "documentary-serif") {
      const opacityValue = interpolate(value30, [0, 0.16, 0.86, 1], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.4, 0, 1, 1)]
      });
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-block",
        maxWidth: "86%",
        padding: "8px 22px 12px",
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontStyle: "italic",
        fontWeight: 700,
        letterSpacing: "0.015em",
        color: "#fffdf5",
        borderBottom: "3px solid " + highlightColor,
        opacity: opacityValue,
        translate: "0 " + (1 - opacityValue) * 14 + "px",
        textShadow: "0 3px 16px rgba(0,0,0,.92), " + joined
      }, children: joined2 }, cue.id || index);
    }
    if (animation === "typewriter") {
      const value41 = Math.ceil(interpolate(value30, [0, 0.7], [0, String(joined2).length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.quad)
      }));
      const cursorVisible = Math.floor(value31 / Math.max(1, Math.round(fps * 0.28))) % 2 === 0;
      return /* @__PURE__ */ jsxs("div", { style: {
        display: "inline-block",
        padding: "10px 18px",
        fontFamily: "'Courier New', monospace",
        background: "rgba(3,7,12,.76)",
        borderRadius: 10,
        color: "#f8fafc",
        textAlign: "left",
        textShadow: "none",
        boxShadow: "0 10px 30px rgba(0,0,0,.5)"
      }, children: [
        String(joined2).slice(0, value41),
        /* @__PURE__ */ jsx("span", { style: {
          color: highlightColor,
          opacity: cursorVisible ? 1 : 0
        }, children: "\u258C" })
      ] }, cue.id || index);
    }
    if (animation === "boxed-modern") {
      const opacityValue = interpolate(value30, [0, 0.13, 0.9, 1], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.4, 0, 1, 1)]
      });
      return /* @__PURE__ */ jsxs("div", { style: {
        display: "inline-block",
        position: "relative",
        padding: "13px 26px 16px",
        borderRadius: 8,
        background: "rgba(248,250,252,.96)",
        color: "#0b0d12",
        fontWeight: 900,
        textShadow: "none",
        boxShadow: "8px 9px 0 rgba(0,0,0,.72)",
        opacity: opacityValue,
        scale: String(0.97 + opacityValue * 0.03)
      }, children: [
        joined2,
        /* @__PURE__ */ jsx("span", { style: {
          position: "absolute",
          left: 0,
          bottom: 0,
          width: opacityValue * 100 + "%",
          height: 6,
          background: highlightColor
        } })
      ] }, cue.id || index);
    }
    if (animation === "gradient-pop") {
      const springValue = spring({
        frame: value31,
        fps,
        config: {
          damping: 24,
          stiffness: 90,
          mass: 0.8
        }
      });
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-block",
        padding: "6px 16px",
        background: "linear-gradient(105deg, #ffffff 5%, " + highlightColor + " 48%, #a78bfa 95%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,.82)) drop-shadow(0 0 " + (8 + springValue * 10) + "px " + highlightColor + "66)",
        scale: String(0.94 + springValue * 0.06),
        translate: "0 " + (1 - springValue) * 18 + "px"
      }, children: joined2 }, cue.id || index);
    }
    if (animation === "word-zoom") {
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.32em"
      }, children: displayWords.map((item, index2) => {
        const isActiveWord = index2 === wordIndex;
        return /* @__PURE__ */ jsx("span", { style: {
          display: "inline-block",
          color: isActiveWord ? highlightColor : "#ffffff",
          opacity: isActiveWord ? 1 : 0.45,
          transform: isActiveWord ? "scale(1.26)" : "scale(0.96)",
          filter: isActiveWord ? "none" : "blur(1px)",
          textShadow: isActiveWord ? "0 0 30px " + highlightColor + ", " + joined : joined
        }, children: item }, index2);
      }) }, cue.id || index);
    }
    if (animation === "kinetic-stagger") {
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.28em"
      }, children: displayWords.map((item, index2) => {
        const staggerDelay = index2 * 2.5;
        const springValue = spring({
          frame: Math.max(0, value31 - staggerDelay),
          fps,
          config: {
            damping: 12,
            stiffness: 150
          }
        });
        const isActiveWord = index2 === wordIndex;
        return /* @__PURE__ */ jsx("span", { style: {
          display: "inline-block",
          transform: "translateY(" + (1 - springValue) * 30 + "px) scale(" + (0.5 + springValue * 0.5) + ")",
          opacity: springValue,
          color: isActiveWord ? highlightColor : "#ffffff",
          textShadow: isActiveWord ? "0 0 24px " + highlightColor + ", " + joined : joined
        }, children: item }, index2);
      }) }, cue.id || index);
    }
    if (animation === "wave-jump") {
      return /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.28em"
      }, children: displayWords.map((item, index2) => {
        const waveOffset = Math.sin(value31 * 0.28 + index2 * 0.7) * 10;
        const isActiveWord = index2 === wordIndex;
        return /* @__PURE__ */ jsx("span", { style: {
          display: "inline-block",
          transform: "translateY(" + (waveOffset + (isActiveWord ? -12 : 0)) + "px) scale(" + (isActiveWord ? 1.18 : 1) + ")",
          color: isActiveWord ? highlightColor : "#ffffff",
          textShadow: isActiveWord ? "0 0 24px " + highlightColor + ", " + joined : joined
        }, children: item }, index2);
      }) }, cue.id || index);
    }
    if (animation === "cyber-glitch") {
      const glitchOffset = value31 % 8 === 0 ? Math.sin(value31 * 12.9898) * 2 : 0;
      return /* @__PURE__ */ jsx("div", { style: {
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        transform: "translateX(" + glitchOffset + "px)",
        color: "#00f0ff",
        textShadow: "2px 2px 0 #ff003c, -2px -2px 0 #00f0ff, 0 0 20px #00f0ff, " + joined,
        letterSpacing: "0.05em"
      }, children: joined2 }, cue.id || index);
    }
    if (animation === "fire-glow") {
      const glowRadius = Math.sin(value31 * 0.5) * 12 + 22;
      return /* @__PURE__ */ jsx("div", { style: {
        background: "linear-gradient(180deg, #fff7ed 0%, #fbbf24 45%, #ef4444 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 " + glowRadius + "px #f97316) drop-shadow(0 0 " + glowRadius * 1.5 + "px #dc2626)"
      }, children: joined2 }, cue.id || index);
    }
    if (animation === "slide") {
      const translateYValue = interpolate(value30, [0, 0.15], [30, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic)
      });
      const opacityValue = interpolate(value30, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
      return /* @__PURE__ */ jsx("div", { style: {
        transform: "translateY(" + translateYValue + "px)",
        opacity: opacityValue
      }, children: joined2 }, cue.id || index);
    }
    if (animation === "cinematic-fade") {
      const opacityValue = interpolate(value30, [0, 0.1, 0.9, 1], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      return /* @__PURE__ */ jsx("div", { style: {
        opacity: opacityValue,
        padding: "8px 24px",
        background: "rgba(5, 7, 12, 0.75)",
        borderRadius: 12,
        backdropFilter: "blur(12px)",
        display: "inline-block",
        color: "#f8fafc",
        fontWeight: 700,
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
      }, children: joined2 }, cue.id || index);
    }
    return /* @__PURE__ */ jsx("div", { style: {
      marginBottom: "0.4em"
    }, children: joined2 }, cue.id || index);
  }) }) });
};
const Wn = ({
  overlay,
  durationInFrames,
  fps
}) => {
  const frame = useCurrentFrame();
  const {
    scale = 0.6,
    position = "top-right",
    posX = 75,
    posY = 25,
    animation = "pop",
    imageUrl
  } = overlay;
  if (!imageUrl) {
    return null;
  }
  let leftPercent = posX;
  let topPercent = posY;
  switch (position) {
    case "center":
      leftPercent = 50;
      topPercent = 50;
      break;
    case "top-left":
      leftPercent = 22;
      topPercent = 20;
      break;
    case "top-right":
      leftPercent = 78;
      topPercent = 20;
      break;
    case "bottom-left":
      leftPercent = 22;
      topPercent = 78;
      break;
    case "bottom-right":
      leftPercent = 78;
      topPercent = 78;
      break;
    case "custom":
    default:
      leftPercent = posX;
      topPercent = posY;
      break;
  }
  const value42 = Math.min(10, Math.floor(durationInFrames / 3));
  const value43 = Math.min(10, Math.floor(durationInFrames / 3));
  let scaleValue = 1;
  let opacityValue = 1;
  let translateYValue = 0;
  if (animation === "pop") {
    const springValue = spring({
      frame,
      fps,
      config: {
        damping: 12,
        stiffness: 180
      }
    });
    const fadeOutValue = interpolate(frame, [durationInFrames - value43, durationInFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    scaleValue = (0.4 + springValue * 0.6) * (1 - fadeOutValue * 0.25);
    opacityValue = interpolate(frame, [0, value42 / 2, durationInFrames - value43, durationInFrames], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  } else if (animation === "fade") {
    opacityValue = interpolate(frame, [0, value42, durationInFrames - value43, durationInFrames], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  } else if (animation === "slide-up") {
    translateYValue = interpolate(frame, [0, value42], [40, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic)
    });
    opacityValue = interpolate(frame, [0, value42 / 2, durationInFrames - value43, durationInFrames], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  }
  const finalScale = Number(scale || 0.6) * scaleValue;
  return /* @__PURE__ */ jsx("div", { style: {
    position: "absolute",
    left: leftPercent + "%",
    top: topPercent + "%",
    transform: "translate(-50%, -50%) scale(" + finalScale + ") translateY(" + translateYValue + "px)",
    opacity: opacityValue,
    zIndex: 20,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, children: /* @__PURE__ */ jsx(RemotionImg, { src: imageUrl, style: {
    maxWidth: "80vw",
    maxHeight: "80vh",
    objectFit: "contain",
    borderRadius: 16,
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.18)"
  } }) });
};
const Ha = ({
  scenes = [],
  fps = 30,
  audioTrack = null,
  musicTrack = null,
  captionTrack = null,
  transitions = null,
  overlays: indexes = []
}) => {
  var cues;
  let frameCursor = 0;
  const items = Array.isArray(scenes) && scenes.length > 0 ? scenes : [{
    id: "placeholder-scene",
    title: "Escena 1",
    duration: 4,
    motion: "gentle-zoom-in",
    imageUrl: "",
    videoUrl: ""
  }];
  const value44 = Number(fps) || 30;
  const defaultTransition = ["none", "fade", "slide-left", "slide-right", "zoom", "wipe"].includes(transitions == null ? void 0 : transitions.default) ? transitions.default : "fade";
  const value45 = Math.min(1, Math.max(0.1, Number(transitions == null ? void 0 : transitions.duration) || 0.35));
  const captionsEnabled = (captionTrack == null ? void 0 : captionTrack.enabled) !== false;
  const burnInEnabled = (captionTrack == null ? void 0 : captionTrack.burnIn) !== false && captionsEnabled;
  const hasBurnInCaptions = burnInEnabled && (cues = captionTrack == null ? void 0 : captionTrack.cues) != null && !!cues.length;
  return /* @__PURE__ */ jsxs(AbsoluteFill, { style: {
    backgroundColor: "#07080b"
  }, children: [
    items.map((item, index) => {
      const value46 = Math.max(1, Math.round(Number(item.duration || 4) * value44));
      const transition = item.transition && item.transition !== "inherit" ? item.transition : defaultTransition;
      const element = /* @__PURE__ */ jsx(Sequence, { from: frameCursor, durationInFrames: value46, premountFor: value44, children: /* @__PURE__ */ jsx(On, { scene: hasBurnInCaptions || !burnInEnabled ? {
        ...item,
        _skipLegacyCaption: true
      } : item, durationInFrames: value46, fps: value44, transition, transitionSeconds: value45, hasPrevious: index > 0, hasNext: index < items.length - 1 }) }, item.id || Math.random());
      frameCursor += value46;
      return element;
    }),
    Array.isArray(indexes) && indexes.map((overlay) => {
      if (overlay == null || !overlay.imageUrl) {
        return null;
      }
      const value47 = Math.max(0, Math.round(Number(overlay.startSeconds || 0) * value44));
      const value48 = Math.max(1, Math.round(Number(overlay.durationSeconds || 3) * value44));
      return /* @__PURE__ */ jsx(Sequence, { from: value47, durationInFrames: value48, children: /* @__PURE__ */ jsx(Wn, { overlay, durationInFrames: value48, fps: value44 }) }, overlay.id || "ovl-" + value47);
    }),
    audioTrack != null && audioTrack.url ? /* @__PURE__ */ jsx(RemotionAudio, { src: audioTrack.url, volume: audioTrack.volume !== void 0 ? Number(audioTrack.volume) : 1, loop: !!audioTrack.loop }) : null,
    musicTrack != null && musicTrack.url ? /* @__PURE__ */ jsx(RemotionAudio, { src: musicTrack.url, volume: musicTrack.volume !== void 0 ? Number(musicTrack.volume) : 0.1, loop: musicTrack.loop !== false }) : null,
    hasBurnInCaptions ? /* @__PURE__ */ jsx(Sequence, { from: 0, durationInFrames: Math.max(value44, frameCursor), children: /* @__PURE__ */ jsx(Fn, { cues: captionTrack.cues, fps: value44, style: captionTrack.style }) }) : null
  ] });
};
const Un = (scene, fps) => Math.max(1, Math.round(Math.max(0, Number(scene == null ? void 0 : scene.duration) || 4) * fps));
const Ga = (indexes, fps) => {
  let frameCursor = 0;
  return indexes.map((item, index) => {
    const frames = Un(item, fps);
    const entry = {
      scene: item,
      index,
      startFrame: frameCursor,
      endFrame: frameCursor + frames,
      durationInFrames: frames,
      startSeconds: frameCursor / fps,
      durationSeconds: frames / fps
    };
    frameCursor += frames;
    return entry;
  });
};
const Ya = (scenes4, fps, scenes5 = 0) => {
  const value49 = Math.max(fps, Ga(scenes4, fps).reduce((acc, ga2) => acc + ga2.durationInFrames, 0));
  const value50 = scenes5 ? Math.ceil(scenes5 / 1e3 * fps) : 0;
  return Math.max(value49, value50);
};
const Lt = (seconds) => {
  const value51 = Math.max(0, Number(seconds) || 0);
  const value52 = Math.floor(Math.round(value51 * 10));
  const value53 = Math.floor(value52 / 10);
  const value54 = Math.floor(value53 / 60);
  const secs = value53 % 60;
  const tenths = value52 % 10;
  return String(value54).padStart(2, "0") + ":" + String(secs).padStart(2, "0") + "." + tenths;
};
const ut = (start) => Math.max(0, Number(start) || 0).toFixed(2) + " s";
const _Component2 = ({
  isOpen,
  onClose,
  onTranscribeWhisper
}) => {
  var captionTrack;
  const project = w((state) => state.project);
  const shiftCaptions = w((state) => state.shiftCaptions);
  const alignCaptionsStart = w((state) => state.alignCaptionsStart);
  const scaleCaptionsToAudio = w((state) => state.scaleCaptionsToAudio);
  const syncScenesToCaptions = w((state) => state.syncScenesToCaptions);
  const [offsetInput, setOffsetInput] = React.useState(0);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const cues = ((captionTrack = project.captionTrack) == null ? void 0 : captionTrack.cues) || [];
  const audioTrack = project.audioTrack;
  const audioDurationSeconds = (Number(audioTrack == null ? void 0 : audioTrack.durationMs) || 0) / 1e3;
  const captionsRange = React.useMemo(() => {
    if (!cues.length) {
      return {
        start: 0,
        end: 0,
        duration: 0
      };
    }
    const value55 = Math.min(...cues.map((item) => Number(item.startMs) || 0));
    const value56 = Math.max(...cues.map((item) => Number(item.endMs) || 0));
    return {
      start: value55 / 1e3,
      end: value56 / 1e3,
      duration: (value56 - value55) / 1e3
    };
  }, [cues]);
  const durationDiff = audioDurationSeconds > 0 && captionsRange.duration > 0 ? captionsRange.end - audioDurationSeconds : 0;
  const isAligned = !!audioTrack && !!cues.length && !!(Math.abs(durationDiff) < 0.25);
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (onClose != null) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  React.useEffect(() => {
    if (isOpen) {
      setOffsetInput(0);
      setFeedbackMessage("");
    }
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  const applyOffset = (offsetMs) => {
    if (cues.length) {
      shiftCaptions(offsetMs);
      setFeedbackMessage((offsetMs < 0 ? "Adelantados" : "Retrasados") + " " + Math.abs(offsetMs) + " ms.");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = Number(offsetInput);
    if (!!Number.isFinite(value) && value !== 0) {
      applyOffset(value);
      setOffsetInput(0);
    }
  };
  const element = /* @__PURE__ */ jsx("div", { className: "sync-modal-backdrop", onMouseDown: onClose, children: /* @__PURE__ */ jsxs("section", { className: "sync-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "sync-modal-title", onMouseDown: (event) => event.stopPropagation(), children: [
    /* @__PURE__ */ jsxs("header", { className: "sync-modal-header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { children: "TIEMPO Y ALINEACI\xD3N" }),
        /* @__PURE__ */ jsx("h2", { id: "sync-modal-title", children: "Sincronizar subt\xEDtulos" }),
        /* @__PURE__ */ jsx("p", { children: "Alinea las frases con la narraci\xF3n sin alterar el contenido." })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "sync-modal-close", onClick: onClose, "aria-label": "Cerrar sincronizaci\xF3n", children: "\u2715" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sync-modal-scroll", children: [
      /* @__PURE__ */ jsxs("div", { className: "sync-summary-grid", children: [
        /* @__PURE__ */ jsxs("article", { className: audioTrack ? "ready" : "empty", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "sync-summary-icon", children: "\u266A" }),
            /* @__PURE__ */ jsx("small", { children: "AUDIO" })
          ] }),
          /* @__PURE__ */ jsx("strong", { children: audioTrack ? ut(audioDurationSeconds) : "Sin audio" }),
          /* @__PURE__ */ jsx("p", { title: (audioTrack == null ? void 0 : audioTrack.name) || "", children: (audioTrack == null ? void 0 : audioTrack.name) || "Carga una narraci\xF3n para comparar" })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: cues.length ? "ready captions" : "empty", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "sync-summary-icon", children: "CC" }),
            /* @__PURE__ */ jsx("small", { children: "SUBT\xCDTULOS" })
          ] }),
          /* @__PURE__ */ jsx("strong", { children: cues.length ? cues.length + " frases" : "Sin subt\xEDtulos" }),
          /* @__PURE__ */ jsx("p", { children: cues.length ? ut(captionsRange.start) + " \u2192 " + ut(captionsRange.end) : "Importa un SRT o transcribe el audio" })
        ] })
      ] }),
      audioTrack && cues.length ? /* @__PURE__ */ jsxs("div", { className: "sync-difference " + (isAligned ? "aligned" : "warning"), children: [
        /* @__PURE__ */ jsx("span", { children: isAligned ? "\u2713" : "!" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: isAligned ? "La duraci\xF3n est\xE1 alineada" : durationDiff > 0 ? "Los subt\xEDtulos terminan despu\xE9s" : "Los subt\xEDtulos terminan antes" }),
          /* @__PURE__ */ jsx("small", { children: isAligned ? "La diferencia es menor a 250 ms." : "Puedes escalar la duraci\xF3n completa o ajustar el desplazamiento manualmente." })
        ] }),
        /* @__PURE__ */ jsxs("b", { children: [
          durationDiff > 0 ? "+" : "",
          durationDiff.toFixed(2),
          " s"
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "sync-difference neutral", children: [
        /* @__PURE__ */ jsx("span", { children: "i" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Faltan elementos para comparar" }),
          /* @__PURE__ */ jsx("small", { children: "Necesitas audio y subt\xEDtulos con tiempos v\xE1lidos." })
        ] }),
        audioTrack && !cues.length && onTranscribeWhisper ? /* @__PURE__ */ jsx("button", { type: "button", onClick: onTranscribeWhisper, children: "Transcribir" }) : null
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "sync-section", children: [
        /* @__PURE__ */ jsxs("div", { className: "sync-section-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "01" }),
            /* @__PURE__ */ jsx("strong", { children: "Ajuste autom\xE1tico" })
          ] }),
          /* @__PURE__ */ jsx("small", { children: "Recomendado" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sync-action-grid", children: [
          /* @__PURE__ */ jsxs("button", { type: "button", className: "sync-action primary", disabled: !audioTrack || !cues.length, onClick: () => {
            scaleCaptionsToAudio();
            setFeedbackMessage("Subt\xEDtulos escalados a la duraci\xF3n del audio.");
          }, children: [
            /* @__PURE__ */ jsx("span", { children: "\u25CE" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Encajar con el audio" }),
              /* @__PURE__ */ jsxs("small", { children: [
                "Escala todos los timestamps proporcionalmente hasta ",
                ut(audioDurationSeconds),
                "."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "button", className: "sync-action", disabled: !cues.length || captionsRange.start === 0, onClick: () => {
            alignCaptionsStart();
            setFeedbackMessage("El primer subt\xEDtulo ahora comienza en 0:00.");
          }, children: [
            /* @__PURE__ */ jsx("span", { children: "\u21A4" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Alinear inicio a 0:00" }),
              /* @__PURE__ */ jsxs("small", { children: [
                "Elimina el espacio inicial de ",
                ut(captionsRange.start),
                " sin cambiar la duraci\xF3n."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "sync-section", children: [
        /* @__PURE__ */ jsxs("div", { className: "sync-section-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "02" }),
            /* @__PURE__ */ jsx("strong", { children: "Ajuste fino" })
          ] }),
          /* @__PURE__ */ jsx("small", { children: "Adelantar / retrasar" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "sync-step-grid", children: [-1e3, -500, -100, 100, 500, 1e3].map((item) => /* @__PURE__ */ jsxs("button", { type: "button", disabled: !cues.length, onClick: () => applyOffset(item), children: [
          item > 0 ? "+" : "",
          Math.abs(item) >= 1e3 ? item / 1e3 + ".0 s" : item + " ms"
        ] }, item)) }),
        /* @__PURE__ */ jsxs("form", { className: "sync-custom-offset", onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "sync-offset", children: "Desplazamiento personalizado" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("input", { id: "sync-offset", type: "number", step: "50", value: offsetInput, onChange: (event) => setOffsetInput(event.target.value), placeholder: "Ej.: -350 o 200", disabled: !cues.length }),
            /* @__PURE__ */ jsx("span", { children: "ms" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: !cues.length || !Number(offsetInput), children: "Aplicar" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "sync-scenes-card", style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "\u25A6" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Alinear im\xE1genes a los subt\xEDtulos" }),
              /* @__PURE__ */ jsx("small", { children: "Ajusta la duraci\xF3n de cada imagen para que cambie exactamente cuando empieza la siguiente frase." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", disabled: !cues.length, onClick: () => {
            syncScenesToCaptions();
            setFeedbackMessage("Duraci\xF3n de im\xE1genes ajustada a los subt\xEDtulos.");
          }, children: "Alinear im\xE1genes" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 10
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "CC" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Alinear subt\xEDtulos a los cortes de escenas" }),
              /* @__PURE__ */ jsx("small", { children: "Ajusta cada bloque de subt\xEDtulo para que empiece y termine exactamente con su imagen." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", disabled: !cues.length, onClick: () => {
            syncCaptionsToScenes();
            setFeedbackMessage("Subt\xEDtulos alineados a los cortes de las escenas.");
          }, children: "Alinear subt\xEDtulos" })
        ] })
      ] }),
      feedbackMessage ? /* @__PURE__ */ jsxs("div", { className: "sync-notice", role: "status", children: [
        "\u2713 ",
        feedbackMessage
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "sync-modal-footer", children: [
      /* @__PURE__ */ jsx("span", { children: "Esc para cerrar" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, children: "Listo" })
    ] })
  ] }) });
  return ReactDOM.createPortal(element, document.body);
};
const Bn = ({
  isOpen,
  overlayId,
  onClose
}) => {
  var captionTrack;
  const project = w((state) => state.project);
  const updateOverlay = w((state) => state.updateOverlay);
  const removeOverlay = w((state) => state.removeOverlay);
  const overlay = (project.overlays || []).find((overlay2) => overlay2.id === overlayId);
  const cues = ((captionTrack = project.captionTrack) == null ? void 0 : captionTrack.cues) || [];
  const [scale, setScale] = React.useState(0.6);
  const [position, setPosition] = React.useState("top-right");
  const [posX, setPosX] = React.useState(78);
  const [posY, setPosY] = React.useState(20);
  const [startSeconds, setStartSeconds] = React.useState(0);
  const [durationSeconds, setDurationSeconds] = React.useState(3);
  const [animation, setAnimation] = React.useState("pop");
  const [captionCueId, setCaptionCueId] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [name, setName] = React.useState("");
  React.useEffect(() => {
    if (overlay) {
      setScale(Number(overlay.scale !== void 0 ? overlay.scale : 0.6));
      setPosition(overlay.position || "top-right");
      setPosX(Number(overlay.posX !== void 0 ? overlay.posX : 78));
      setPosY(Number(overlay.posY !== void 0 ? overlay.posY : 20));
      setStartSeconds(Number(overlay.startSeconds || 0));
      setDurationSeconds(Number(overlay.durationSeconds || 3));
      setAnimation(overlay.animation || "pop");
      setCaptionCueId(overlay.captionCueId || "");
      setImageUrl(overlay.imageUrl || "");
      setName(overlay.name || "Superposici\xF3n");
    }
  }, [overlay, isOpen]);
  if (!isOpen || !overlay) {
    return null;
  }
  const handleClick2 = () => {
    updateOverlay(overlay.id, {
      scale,
      position,
      posX,
      posY,
      startSeconds: Math.max(0, Number(startSeconds)),
      durationSeconds: Math.max(0.2, Number(durationSeconds)),
      animation,
      captionCueId: captionCueId || null,
      imageUrl,
      name
    });
    onClose();
  };
  const handlePositionSelect = (id) => {
    setPosition(id);
    if (id === "top-left") {
      setPosX(22);
      setPosY(20);
    } else if (id === "top-right") {
      setPosX(78);
      setPosY(20);
    } else if (id === "center") {
      setPosX(50);
      setPosY(50);
    } else if (id === "bottom-left") {
      setPosX(22);
      setPosY(78);
    } else if (id === "bottom-right") {
      setPosX(78);
      setPosY(78);
    }
    updateOverlay(overlay.id, {
      position: id
    });
  };
  const handleCaptionCueSelect = (cueId) => {
    setCaptionCueId(cueId);
    if (!cueId) {
      return;
    }
    const found = cues.find((item) => item.id === cueId);
    if (found) {
      const cueStartSeconds = Number(found.startMs || found.startSeconds * 1e3) / 1e3;
      const cueEndSeconds = Number(found.endMs || found.endSeconds * 1e3) / 1e3;
      const value = Math.max(0.5, cueEndSeconds - cueStartSeconds);
      setStartSeconds(Number(cueStartSeconds.toFixed(2)));
      setDurationSeconds(Number(value.toFixed(2)));
      updateOverlay(overlay.id, {
        captionCueId: cueId,
        startSeconds: Number(cueStartSeconds.toFixed(2)),
        durationSeconds: Number(value.toFixed(2))
      });
    }
  };
  const handleChange = async (event) => {
    var files;
    const file = (files = event.target.files) == null ? void 0 : files[0];
    if (file) {
      try {
        const headers = {
          "Content-Type": file.type || "application/octet-stream",
          "x-filename": encodeURIComponent(file.name)
        };
        const response = await fetch("http://127.0.0.1:4322/api/import", {
          method: "POST",
          headers,
          body: file
        }).catch(() => fetch("/api/import", {
          method: "POST",
          headers,
          body: file
        }));
        const data = await response.json();
        if (response.ok && data != null && data.url) {
          setImageUrl(data.url);
          setName(file.name.replace(/\.[^.]+$/, ""));
          updateOverlay(overlay.id, {
            imageUrl: data.url,
            name: file.name.replace(/\.[^.]+$/, "")
          });
        }
      } catch {
      }
    }
  };
  const handleClick3 = () => {
    removeOverlay(overlay.id);
    onClose();
  };
  return /* @__PURE__ */ jsx("div", { style: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "rgba(3, 7, 18, 0.82)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }, onClick: (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    width: 540,
    maxWidth: "96vw",
    maxHeight: "92vh",
    background: "#0d1117",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 16,
    boxShadow: "0 24px 70px rgba(0, 0, 0, 0.8)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    color: "#f1f5f9",
    fontFamily: "system-ui, -apple-system, sans-serif"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "14px 20px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(255, 255, 255, 0.02)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 18
        }, children: "\u{1F5BC}\uFE0F" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { style: {
            margin: 0,
            fontSize: 14,
            fontWeight: 800
          }, children: "Ajustes de Superposici\xF3n (Pista V2)" }),
          /* @__PURE__ */ jsx("p", { style: {
            margin: "2px 0 0",
            fontSize: 11,
            color: "#94a3b8"
          }, children: "Control de tama\xF1o, posici\xF3n en pantalla y sincronizaci\xF3n con subt\xEDtulos" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, style: {
        background: "transparent",
        border: "none",
        color: "#94a3b8",
        fontSize: 18,
        cursor: "pointer",
        padding: "4px 8px"
      }, children: "\u2715" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "16px 20px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: 12,
        borderRadius: 10,
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          width: 64,
          height: 64,
          borderRadius: 8,
          overflow: "hidden",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          flexShrink: 0
        }, children: imageUrl ? /* @__PURE__ */ jsx("img", { src: imageUrl, alt: "", style: {
          width: "100%",
          height: "100%",
          objectFit: "contain"
        } }) : /* @__PURE__ */ jsx("span", { style: {
          fontSize: 24
        }, children: "\u{1F5BC}\uFE0F" }) }),
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1,
          minWidth: 0
        }, children: [
          /* @__PURE__ */ jsx("input", { type: "text", value: name, onChange: (event) => {
            setName(event.target.value);
            updateOverlay(overlay.id, {
              name: event.target.value
            });
          }, placeholder: "Nombre de la imagen", style: {
            width: "100%",
            padding: "5px 8px",
            fontSize: 12,
            fontWeight: 600,
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 6,
            color: "#fff",
            marginBottom: 6
          } }),
          /* @__PURE__ */ jsxs("label", { style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.35)",
            borderRadius: 6,
            color: "#c7d2fe",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer"
          }, children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: handleChange, style: {
              display: "none"
            } }),
            "\u{1F4C1} Cambiar imagen desde PC"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            fontSize: 12,
            fontWeight: 700,
            color: "#e2e8f0"
          }, children: "\u{1F4CF} Tama\xF1o de la Imagen (Escala)" }),
          /* @__PURE__ */ jsxs("span", { style: {
            fontSize: 12,
            fontWeight: 800,
            color: "#818cf8",
            fontFamily: "monospace",
            background: "rgba(99, 102, 241, 0.15)",
            padding: "2px 8px",
            borderRadius: 4
          }, children: [
            Math.round(scale * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "range", min: "0.15", max: "1.5", step: "0.05", value: scale, onChange: (event) => {
          const value = Number(event.target.value);
          setScale(value);
          updateOverlay(overlay.id, {
            scale: value
          });
        }, style: {
          width: "100%",
          accentColor: "#6366f1",
          cursor: "pointer"
        } }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 6,
          marginTop: 4
        }, children: [{
          label: "Peque\xF1a (30%)",
          val: 0.3
        }, {
          label: "Mediana (60%)",
          val: 0.6
        }, {
          label: "Grande (100%)",
          val: 1
        }, {
          label: "M\xE1xima (140%)",
          val: 1.4
        }].map((item) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          setScale(item.val);
          updateOverlay(overlay.id, {
            scale: item.val
          });
        }, style: {
          padding: "4px 6px",
          fontSize: 10,
          fontWeight: 700,
          background: Math.abs(scale - item.val) < 0.05 ? "rgba(99, 102, 241, 0.3)" : "rgba(255, 255, 255, 0.04)",
          border: Math.abs(scale - item.val) < 0.05 ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 6,
          color: Math.abs(scale - item.val) < 0.05 ? "#e0e7ff" : "#94a3b8",
          cursor: "pointer"
        }, children: item.label }, item.label)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx("label", { style: {
          fontSize: 12,
          fontWeight: 700,
          color: "#e2e8f0"
        }, children: "\u{1F4CD} Posici\xF3n en Pantalla" }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 6
        }, children: [{
          id: "top-left",
          label: "\u2196 Sup. Izq"
        }, {
          id: "top-right",
          label: "\u2197 Sup. Der"
        }, {
          id: "center",
          label: "\u{1F3AF} Centro"
        }, {
          id: "bottom-left",
          label: "\u2199 Inf. Izq"
        }, {
          id: "bottom-right",
          label: "\u2198 Inf. Der"
        }].map((item) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handlePositionSelect(item.id), style: {
          padding: "6px 4px",
          fontSize: 10.5,
          fontWeight: 700,
          background: position === item.id ? "rgba(99, 102, 241, 0.28)" : "rgba(255, 255, 255, 0.03)",
          border: position === item.id ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 6,
          color: position === item.id ? "#fff" : "#94a3b8",
          cursor: "pointer"
        }, children: item.label }, item.id)) }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 4
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "#94a3b8",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Horizontal (X)" }),
              /* @__PURE__ */ jsxs("span", { children: [
                Math.round(posX),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "5", max: "95", value: posX, onChange: (event) => {
              const value = Number(event.target.value);
              setPosX(value);
              setPosition("custom");
              updateOverlay(overlay.id, {
                posX: value,
                position: "custom"
              });
            }, style: {
              width: "100%",
              accentColor: "#6366f1",
              cursor: "pointer"
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "#94a3b8",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Vertical (Y)" }),
              /* @__PURE__ */ jsxs("span", { children: [
                Math.round(posY),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "5", max: "95", value: posY, onChange: (event) => {
              const value = Number(event.target.value);
              setPosY(value);
              setPosition("custom");
              updateOverlay(overlay.id, {
                posY: value,
                position: "custom"
              });
            }, style: {
              width: "100%",
              accentColor: "#6366f1",
              cursor: "pointer"
            } })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        padding: 12,
        borderRadius: 10,
        background: "rgba(99, 102, 241, 0.05)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 14
          }, children: "\u{1F3AF}" }),
          /* @__PURE__ */ jsx("label", { style: {
            fontSize: 12,
            fontWeight: 800,
            color: "#c7d2fe"
          }, children: "Vincular a Frase de Subt\xEDtulo (SRT)" })
        ] }),
        /* @__PURE__ */ jsx("p", { style: {
          margin: 0,
          fontSize: 10.5,
          color: "#94a3b8"
        }, children: "Alinea autom\xE1ticamente la aparici\xF3n de esta imagen con las palabras exactas que dice el narrador." }),
        cues.length > 0 ? /* @__PURE__ */ jsxs("select", { value: captionCueId, onChange: (event) => handleCaptionCueSelect(event.target.value), style: {
          width: "100%",
          padding: "7px 10px",
          fontSize: 11.5,
          background: "#1e1e2e",
          border: "1px solid rgba(99, 102, 241, 0.4)",
          borderRadius: 6,
          color: "#f8fafc",
          cursor: "pointer"
        }, children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "-- Sin vincular (Tiempo manual) --" }),
          cues.map((cue, index) => {
            var text2;
            const text3 = (Number(cue.startMs || cue.startSeconds * 1e3) / 1e3).toFixed(1);
            const text4 = (Number(cue.endMs || cue.endSeconds * 1e3) / 1e3).toFixed(1);
            const string = String(cue.text || "").slice(0, 45);
            return /* @__PURE__ */ jsxs("option", { value: cue.id || index, children: [
              "[",
              text3,
              "s - ",
              text4,
              "s] ",
              string,
              ((text2 = cue.text) == null ? void 0 : text2.length) > 45 ? "..." : ""
            ] }, cue.id || index);
          })
        ] }) : /* @__PURE__ */ jsx("span", { style: {
          fontSize: 11,
          color: "#64748b",
          fontStyle: "italic"
        }, children: "No hay subt\xEDtulos generados a\xFAn. Puedes transcribir tu video o audio primero para vincular im\xE1genes a frases." }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 4
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { style: {
              fontSize: 10.5,
              color: "#cbd5e1",
              display: "block",
              marginBottom: 3
            }, children: "Segundo de Inicio (s)" }),
            /* @__PURE__ */ jsx("input", { type: "number", step: "0.1", min: "0", value: startSeconds, onChange: (event) => {
              const value = Math.max(0, Number(event.target.value));
              setStartSeconds(value);
              updateOverlay(overlay.id, {
                startSeconds: value
              });
            }, style: {
              width: "100%",
              padding: "5px 8px",
              fontSize: 11.5,
              background: "rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 6,
              color: "#fff"
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { style: {
              fontSize: 10.5,
              color: "#cbd5e1",
              display: "block",
              marginBottom: 3
            }, children: "Duraci\xF3n Visible (s)" }),
            /* @__PURE__ */ jsx("input", { type: "number", step: "0.1", min: "0.2", value: durationSeconds, onChange: (event) => {
              const value = Math.max(0.2, Number(event.target.value));
              setDurationSeconds(value);
              updateOverlay(overlay.id, {
                durationSeconds: value
              });
            }, style: {
              width: "100%",
              padding: "5px 8px",
              fontSize: 11.5,
              background: "rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 6,
              color: "#fff"
            } })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }, children: [
        /* @__PURE__ */ jsx("label", { style: {
          fontSize: 12,
          fontWeight: 700,
          color: "#e2e8f0"
        }, children: "\u2728 Efecto de Entrada y Salida" }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 6
        }, children: [{
          id: "pop",
          label: "\u{1F4A5} Pop / Zoom"
        }, {
          id: "fade",
          label: "\u{1F32B}\uFE0F Desvanecer"
        }, {
          id: "slide-up",
          label: "\u2B06\uFE0F Deslizar"
        }, {
          id: "none",
          label: "\u23F8\uFE0F Fijo"
        }].map((item) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          setAnimation(item.id);
          updateOverlay(overlay.id, {
            animation: item.id
          });
        }, style: {
          padding: "6px 4px",
          fontSize: 10.5,
          fontWeight: 700,
          background: animation === item.id ? "rgba(99, 102, 241, 0.25)" : "rgba(255, 255, 255, 0.03)",
          border: animation === item.id ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 6,
          color: animation === item.id ? "#fff" : "#94a3b8",
          cursor: "pointer"
        }, children: item.label }, item.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "12px 20px",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(255, 255, 255, 0.02)"
    }, children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick3, style: {
        padding: "7px 12px",
        background: "rgba(239, 68, 68, 0.12)",
        border: "1px solid rgba(239, 68, 68, 0.3)",
        borderRadius: 8,
        color: "#fca5a5",
        fontSize: 11.5,
        fontWeight: 700,
        cursor: "pointer"
      }, children: "\u{1F5D1}\uFE0F Eliminar Superposici\xF3n" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick2, style: {
        padding: "7px 18px",
        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        border: "none",
        borderRadius: 8,
        color: "#fff",
        fontSize: 12,
        fontWeight: 800,
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(99, 102, 241, 0.35)"
      }, children: "Listo / Cerrar" })
    ] })
  ] }) });
};
const _n = [4, 6, 8, 10];
const ya = (scene) => {
  const model = (scene == null ? void 0 : scene.videoModel) === "omni" ? "omni" : "veo-3.1-lite";
  const value = Number(scene == null ? void 0 : scene.videoDuration);
  const duration = model === "veo-3.1-lite" ? 8 : _n.includes(value) ? value : 8;
  return {
    model,
    duration,
    label: model === "omni" ? "Omni Flash" : "Veo 3.1 Lite",
    queueLabel: model === "omni" ? "Omni Flash est\xE1 generando el video..." : "Veo Lower Priority: esperando turno en la cola..."
  };
};
const ra = async (file) => {
  const uint8Array = new Uint8Array(await file.arrayBuffer());
  const chunkSize = 32768;
  let binary = "";
  for (let index = 0; index < uint8Array.length; index += chunkSize) {
    binary += String.fromCharCode(...uint8Array.subarray(index, index + chunkSize));
  }
  return btoa(binary);
};
const Ee = async (type, payload = {}, timeoutMs = 12e5) => {
  var electronAPI;
  if (typeof window !== "undefined" && (electronAPI = window.electronAPI) != null && electronAPI.flowExecute) {
    let timer;
    const promise = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        reject(new Error("Tiempo de espera agotado (" + Math.round(timeoutMs / 1e3) + "s) en Flow (" + type + ")."));
      }, timeoutMs);
    });
    try {
      return await Promise.race([window.electronAPI.flowExecute(type, payload), promise]);
    } finally {
      clearTimeout(timer);
    }
  }
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return reject(new Error("No window context"));
    }
    const id = crypto.randomUUID();
    const timer = setTimeout(() => {
      window.removeEventListener("message", handleMessage);
      reject(new Error("La extension FlowTube no respondio."));
    }, timeoutMs);
    function handleMessage(event) {
      const data = event.data;
      if (event.source === window && (data == null ? void 0 : data.source) === "flowtube-extension" && data.requestId === id) {
        clearTimeout(timer);
        window.removeEventListener("message", handleMessage);
        if (data.ok) {
          resolve(data.data);
        } else {
          reject(new Error(data.error || "Flow rechazo la solicitud."));
        }
      }
    }
    window.addEventListener("message", handleMessage);
    window.postMessage({
      source: "flowtube-web",
      requestId: id,
      type,
      payload
    }, "*");
  });
};
const it = {
  "warm-cinematic": "rich amber highlights, deep navy blue shadows, warm golden hour fill, authentic film color grade",
  "teal-orange": "commercial blockbuster teal and orange contrast, cool cyan ambient fill, warm amber key light",
  "moody-noir": "moody desaturated tones, deep velvety blacks, dramatic neon cyan and crimson rim lights",
  "clean-pastel": "soft natural daylight, gentle muted pastel palette, clean white fill, airy editorial balance",
  "vibrant-anime": "saturated vivid primaries, crisp cel-shaded lighting, sparkling ambient highlights",
  "documentary-natural": "authentic natural daylight, uncompressed dynamic range, organic earthy textures, neutral white balance"
};
const oa = (label = "") => {
  const string = String(label || "").toLowerCase();
  if (string.includes("stickman-2d") || string.includes("salud") || string.includes("infograf")) {
    return it["clean-pastel"];
  } else if (string.includes("dark") || string.includes("misterio") || string.includes("noir")) {
    return it["moody-noir"];
  } else if (string.includes("anime") || string.includes("comic") || string.includes("pixel")) {
    return it["vibrant-anime"];
  } else if (string.includes("realista") || string.includes("photo")) {
    return it["documentary-natural"];
  } else if (string.includes("cinematic")) {
    return it["teal-orange"];
  } else {
    return it["warm-cinematic"];
  }
};
const Ln = "\nPRINCIPIOS DE DIRECCI\xD3N CINEMATOGR\xC1FICA Y STORYBOARDING (AI DIRECTOR 2.0):\n1. REGLA DE PLANOS SEG\xDAN NARRATIVA:\n   - Gran Plano General / Lejano (Extreme Wide Shot - EWS): Para presentar locaciones, ciudades, paisajes \xE9picos o situar al espectador en un entorno.\n   - Plano Entero (Full Shot - FS): Cuando hay acci\xF3n f\xEDsica completa, caminata, movimiento corporal de cabeza a pies.\n   - Plano Medio (Medium Shot - MS / MCU): Para explicaciones, di\xE1logo, personaje en acci\xF3n o interacci\xF3n con su entorno.\n   - Primer Plano (Close-up - CU): Para transmitir emociones claras, gestos de concentraci\xF3n, sorpresa o frustraci\xF3n.\n   - Primer\xEDsimo Primer Plano / Macro (Extreme Close-up - ECU): Para detalles de alto poder dram\xE1tico (l\xE1grimas, mirada penetrante, firma en un contrato).\n   - Regla de Hitchcock: Si un objeto es clave para la historia, debe ocupar un tama\xF1o dominante en el primer plano.\n\n2. REGLA ANTI JUMP-CUT Y VARIACI\xD3N DE ESCALA:\n   - NUNCA repitas el mismo tama\xF1o de plano (Close-Up con Close-Up, o Wide con Wide) en dos escenas consecutivas sobre el mismo sujeto.\n   - Aplica la regla cinematogr\xE1fica de cambio de escala: Si la toma anterior fue un Primer Plano (CU), la siguiente DEBE ser un Plano Medio (MS) o Plano General (WS) o un plano detalle de apoyo (B-Roll).\n\n3. \xC1NGULOS DE C\xC1MARA PSICOL\xD3GICOS:\n   - Contrapicado (Low-Angle): Mirar desde abajo hacia arriba -> evocar poder, autoridad, hero\xEDsmo o liderazgo imponente.\n   - Picado (High-Angle): Mirar desde arriba hacia abajo -> evocar vulnerabilidad, personaje indefenso o peque\xF1ez.\n   - Plano Holand\xE9s (Dutch Angle 45\xB0): Inclinaci\xF3n diagonal -> tensi\xF3n, pesadilla, caos, peligro o incomodidad.\n   - Espacio Negativo: Ubicar al sujeto peque\xF1o en una esquina rodeado de vac\xEDo -> evocar soledad profunda o aislamiento.\n\n4. COHERENCIA CROM\xC1TICA Y PROGRESI\xD3N DE ILUMINACI\xD3N:\n   - Toda la secuencia debe compartir la misma armon\xEDa lum\xEDnica y temperatura de color (ej. iluminaci\xF3n cinematogr\xE1fica coordinada).\n   - Respeta la continuidad temporal (ma\xF1ana, tarde, atardecer, noche) indicada por el guion.\n\n5. RITMO A-ROLL Y B-ROLL:\n   - Alterna inteligentemente entre planos de personaje (A-Roll) y planos de corte/met\xE1foras visuales (B-Roll) para evitar fatiga visual.\n";
const Vn = [{
  regex: /\b(l[áa]grima|llorar|tristeza|emoci[óo]n|mirada|ojos?|ojeras?)\b/i,
  framing: "Extreme Close-Up macro shot (ECU)",
  motion: "gentle-zoom-in",
  description: "focusing intensely on the detailed facial expression and reflective eyes conveying raw emotional depth, dramatic cinematic lighting"
}, {
  regex: /\b(poder|fuerte|autoridad|[eé]xito|h[eé]roe|grande|imponente|ganar|victoria)\b/i,
  framing: "Dramatic Low-Angle hero shot (Contrapicado)",
  motion: "gentle-zoom-in",
  description: "looking up from below at the imposing figure framed against the sky, commanding immense authority and heroic presence"
}, {
  regex: /\b(soledad|solo|aislado|peque[ñn]o|amenazado|acorralado|vulnerable|vac[ií]o)\b/i,
  framing: "High-Angle shot (Picado) with vast Negative Space",
  motion: "gentle-zoom-out",
  description: "looking down at a solitary figure placed off-center in the corner, surrounded by expansive minimalist atmospheric space"
}, {
  regex: /\b(incomod[oa]|extra[ñn]o|raro|mal|pesadilla|caos|peligro|desastre|confusi[óo]n)\b/i,
  framing: "Dramatic 45-degree tilted Dutch Angle",
  motion: "drift-left-right",
  description: "off-kilter psychological tension perspective with dramatic stark shadows and unbalanced composition"
}, {
  regex: /\b(dinero|d[oó]lares|pagar|cost[oa]|precio|factura|gastaste|vender|comprar|negocio|inventario)\b/i,
  framing: "Cinematic commercial still life / conceptual shot",
  motion: "slow-drift",
  description: "financial documents, invoices, transactions and currency elements under focused directional lighting"
}, {
  regex: /\b(storyboard|dibuj|boceto|l[aá]piz|dise[ñn]|estudio|animat?ic|pizarra|creativ|plantilla)\b/i,
  framing: "Creative visual artist medium perspective",
  motion: "gentle-zoom-in",
  description: "digital drawing tablet, stylus, sequential storyboard sketch panels pinned to board, creative artistic workstation"
}, {
  regex: /\b(gui[oó]n|texto|papel|libro|documento|nomenclatura|carpeta|organizar)\b/i,
  framing: "Top-Down flatlay macro view",
  motion: "slow-drift",
  description: "organized technical screenplay documents with highlighted color-coded columns, drafting pens and clean layout"
}, {
  regex: /\b(c[aá]mara|grabar|film|video|actor|director|pantalla|monitor|producci[óo]n)\b/i,
  framing: "Cinematic behind-the-scenes film set view",
  motion: "pan-right",
  description: "professional cinema camera rig with tally lights and production preview monitors on set"
}, {
  regex: /\b(lugar|ciudad|calle|monta[ñn]a|paisaje|mundo|locaci[óo]n|exterior)\b/i,
  framing: "Extreme Wide establishing landscape shot (EWS)",
  motion: "slow-drift",
  description: "sweeping panoramic environment showing the grand scale of the location with atmospheric depth and horizon"
}, {
  regex: /\b(caminar|correr|saltar|acci[óo]n|moverse|pelea|entero)\b/i,
  framing: "Dynamic Full Shot (FS)",
  motion: "pan-right",
  description: "capturing full physical body gesture and kinetic energy from head to toe, dynamic motion lines"
}];
const va = [{
  framing: "Medium Cinematic Shot",
  motion: "gentle-zoom-in"
}, {
  framing: "Close-up portrait shot",
  motion: "gentle-zoom-in"
}, {
  framing: "Wide Establishing Shot",
  motion: "slow-drift"
}, {
  framing: "Over-the-shoulder view",
  motion: "pan-right"
}, {
  framing: "Medium Close-up angle",
  motion: "breathe"
}];
function ja(framing = "") {
  const string = String(framing || "").toLowerCase();
  if (string.includes("close-up") || string.includes("ecu") || string.includes("macro") || string.includes("primer plano")) {
    return "CLOSE";
  } else if (string.includes("wide") || string.includes("ews") || string.includes("landscape") || string.includes("establishing") || string.includes("general") || string.includes("contrapicado")) {
    return "WIDE";
  } else {
    return "MEDIUM";
  }
}
function Hn(script2 = "", script3 = false) {
  const string = String(script2 || "").toLowerCase();
  const hasEnvironmentKeywords = !!string.match(/\b(dinero|d[oó]lares|precio|factura|cuenta|documento|papel|libro|contrato|pantalla|monitor|mapa|gr[aá]fic[oa]|esquema|c[aá]mara|lente|teclado|herramienta|ciudad|edificio|calle|monta[ñn]a|mar|r[ií]o|paisaje|naturaleza|galaxia|espacio|estrella)\b/i);
  const hasCharacterKeywords = !!string.match(/\b(yo|nosotros|habl\w*|mir\w*|pens\w*|grit\w*|llor\w*|re[ií]\w*|dij\w*|expli\w*|cient[ií]fic\w*|personaje\w*|hombre\w*|mujer\w*|chico\w*|chica\w*|rostro\w*|cara\w*|ojos?\w*|manos?\w*)\b/i);
  if (hasEnvironmentKeywords && !hasCharacterKeywords) {
    return "B-ROLL";
  } else if (script3 || hasCharacterKeywords) {
    return "A-ROLL";
  } else {
    return "B-ROLL";
  }
}
function Gn(previousFraming, framing, script) {
  if (!previousFraming) {
    return framing;
  }
  const previousCategory = ja(previousFraming);
  const currentCategory = ja(framing);
  if (previousCategory === currentCategory) {
    if (currentCategory === "CLOSE") {
      if (script % 2 === 0) {
        return "Medium Cinematic Shot";
      } else {
        return "Over-the-shoulder view";
      }
    } else if (currentCategory === "WIDE") {
      if (script % 2 === 0) {
        return "Medium Cinematic Shot";
      } else {
        return "Dynamic Full Shot (FS)";
      }
    } else if (script % 2 === 0) {
      return "Close-up portrait shot";
    } else {
      return "Wide Establishing Shot";
    }
  } else {
    return framing;
  }
}
function Jt(script4, script5 = 0, script6 = 1, script7 = {}, script8 = false, script9 = {}) {
  const {
    previousFraming = null,
    characterDescription = "",
    colorHarmony = null,
    styleKey = ""
  } = script9;
  const replace = String(script4 || "").replace(/[^\w\sÀ-ſ]/gi, " ").trim();
  const vn2 = Vn.find((vn3) => vn3.regex.test(script4));
  let framing = "";
  let description = "";
  let motion = "gentle-zoom-in";
  if (vn2) {
    framing = vn2.framing;
    description = vn2.description;
    motion = vn2.motion;
  } else {
    const va2 = va[script5 % va.length];
    framing = va2.framing;
    motion = va2.motion;
    description = 'illustrating "' + replace.slice(0, 75) + '", natural depth of field';
  }
  const resolvedFraming = Gn(previousFraming, framing, script5);
  const shotType = Hn(script4, script8);
  const styleHint = colorHarmony || oa(styleKey || script7.label);
  const label = script7.label || "Western Anime";
  let characterPrompt = script7.characterPrompt || script7.brollPrompt || "masterpiece 2D digital illustration, clean linework";
  if (shotType === "A-ROLL" && script8) {
    const characterDescSuffix = characterDescription ? " (" + characterDescription + ")" : "";
    characterPrompt = "A " + label + " illustration of the recurring main character" + characterDescSuffix + " strictly matching the reference image (same facial features, facial hair or beard if shown in reference or clean-shaven if shown clean-shaven, hair, and clothing)";
  } else if (shotType === "B-ROLL") {
    characterPrompt = script7.brollPrompt || "A cinematic B-roll supporting shot in " + label + " style";
  }
  const qualitySuffix = script7.isInfographic ? "clean editorial infographic layout, crisp vector lines, professional aesthetic, all text in Spanish" : "natural full-frame cinematic composition, rich textures, " + styleHint + ", 8k resolution, no text, no watermark";
  return {
    prompt: resolvedFraming + ", " + characterPrompt + ", " + description + ", visual style: " + label + ", " + qualitySuffix,
    framing: resolvedFraming,
    motion,
    hasCharacter: shotType === "A-ROLL",
    shotType,
    colorHarmony: styleHint
  };
}
function Yn({
  batchScenes,
  totalScenes,
  styleConfig,
  attachedStyleRule = "",
  attachedCharacterRule = "",
  compositionRules = "",
  hasCharacterRef = false,
  colorHarmony = null
}) {
  const styleHint = colorHarmony || oa(styleConfig == null ? void 0 : styleConfig.label);
  const joined = batchScenes.map((item) => {
    const sceneNumber = (item.globalIndex !== void 0 ? item.globalIndex : 0) + 1;
    const script = (item.script || item.caption || item.title || "").trim();
    return "ESCENA " + sceneNumber + ': "' + script + '"';
  }).join("\n");
  const characterPromptText = hasCharacterRef ? "A " + (styleConfig.label || "2D cartoon") + " Medium Shot of the character strictly matching the attached reference image (same facial features, facial hair or beard if shown in reference or clean-shaven if shown clean-shaven, hair, and outfit) [action and setting derived from script], " + styleHint + ", " + (styleConfig.promptSuffix || "2D animated cartoon style, clean line art") : "" + (styleConfig.characterPrompt || styleConfig.brollPrompt || "A cinematic scene in the selected visual style...");
  return 'Eres un DIRECTOR DE ARTE Y STORYBOARDER PROFESIONAL (AI DIRECTOR 2.0) para videos virales de YouTube, TikTok y cine.\nTu misi\xF3n es transformar cada frase del guion en una toma de storyboard cinematogr\xE1fico inolvidable con continuidad visual estricta entre escenas.\n\nESTILO VISUAL SELECCIONADO: "' + styleConfig.label + '"\n' + (styleConfig.instructions || "") + "\n" + attachedStyleRule + "\n" + (attachedCharacterRule ? "\n" + attachedCharacterRule + "\n" : "") + '\n\nARMON\xCDA CROM\xC1TICA GLOBAL PARA LA SECUENCIA:\n"' + styleHint + '" (Asegura que todas las tomas compartan esta paleta lum\xEDnica y temperatura de color).\n\n' + Ln + "\n\nREGLAS DE FORMATO Y COMPOSICI\xD3N:\n" + compositionRules + "\n- REGLAS DE ENTORNO Y LOCACI\xD3N:\n  * El entorno de cada escena DEBE derivarse estrictamente de la locuci\xF3n/guion de esa toma (ej: si menciona agua o r\xEDo, la escena es en un r\xEDo o lago; si menciona bosque, en la naturaleza; si menciona la calle, en la calle; si menciona el espacio, en el espacio).\n  * PROHIBIDO situar todas las escenas en un estudio, oficina o mesa de trabajo con l\xE1mpara, a menos que el guion lo indique expresamente. Var\xEDa din\xE1micamente las locaciones seg\xFAn la historia.\n- REGLA ANTI JUMP-CUT:\n  * NUNCA pongas dos planos id\xE9nticos del mismo sujeto de forma consecutiva (ej: no uses dos Close-Ups seguidos).\n" + (hasCharacterRef ? '- REGLAS OBLIGATORIAS DE PERSONAJE:\n  * En toda escena con personaje, describe al personaje manteniendo con m\xE1xima fidelidad la identidad de la imagen de referencia adjunta.\n  * FIDELIDAD AL ROSTRO Y VELLO FACIAL: Observa con atenci\xF3n el rostro del personaje en la imagen de referencia:\n    - Si el personaje TIENE barba, bigote o perilla (ej. barba completa, perilla, bigote), DEBES incluirlo y describirlo expl\xEDcitamente en el prompt en ingl\xE9s (ej: "with matching dark beard as depicted in reference image", "bearded character matching reference").\n    - Si el personaje NO tiene barba (rostro limpio o afeitado), respeta el rostro limpio y NO agregues barba ("clean-shaven smooth face").\n    - En ning\xFAn caso contradigas la apariencia de la imagen de referencia.\n  * NO inventes camiseta negra por defecto; respeta la vestimenta de la referencia.\n  * En el prompt en ingl\xE9s, usa descripciones como: "the character strictly matching the reference image (same facial features, facial hair or beard if depicted in reference, hairstyle, and characteristic outfit)".' : "") + '\n- Define para cada escena:\n  1. "sceneNumber": n\xFAmero correlativo\n  2. "shotType": "A-ROLL" | "B-ROLL"\n  3. "hasCharacter": boolean (true si aparece personaje o interacci\xF3n humana)\n  4. "framing": tipo de plano cinematogr\xE1fico elegido (ej. "Extreme Close-Up", "Low-Angle Hero Shot", "High-Angle Negative Space", "Dutch Angle", "Full Shot", "Medium Shot")\n  5. "motion": gentle-zoom-in | gentle-zoom-out | pan-left | pan-right | drift-left-right | slow-drift | cinematic-arc-left | soft-orbit-left\n  6. "prompt": prompt en ingl\xE9s descriptivo y cinematogr\xE1fico que detalle el encuadre, iluminaci\xF3n, acci\xF3n y entorno espec\xEDfico del guion seg\xFAn "' + styleConfig.label + '".\n\nESCENAS A DIRIGIR (' + batchScenes.length + " tomas):\n" + joined + '\n\nResponde \xDANICAMENTE con un JSON array v\xE1lido con este formato:\n[\n  {\n    "sceneNumber": 1,\n    "shotType": "A-ROLL",\n    "hasCharacter": true,\n    "framing": "Medium Shot",\n    "motion": "gentle-zoom-in",\n    "prompt": ' + JSON.stringify(characterPromptText) + "\n  }\n]";
}
function qn(script10, script11 = "cinematico", script12 = {}) {
  const text = (script10 || "").trim();
  const colorHarmony = script12.colorHarmony || oa(script11);
  const styleLabel = script12.styleLabel || script11 || "Cinematic Film";
  const items = ["Cinematic Macro Extreme Close-Up with razor-sharp depth of field", "Atmospheric Wide Establishing Shot with volumetric atmosphere", "Dynamic Low-Angle architectural shot with dramatic lighting", "Cinematic Over-The-Shoulder ambient detail cutaway", "Isometric perspective high-angle detail view"];
  const framing = script12.framing || items[Math.floor(Math.random() * items.length)];
  const replace = text.replace(/["'\n]/g, " ").slice(0, 140);
  const focusDescription = replace ? 'focused on cinematic visual metaphor and contextual environment inspired by: "' + replace + '"' : "focusing on environmental storytelling, intricate mechanical or natural textures, and dramatic ambient lighting";
  return {
    prompt: framing + ", " + focusDescription + ", no people, no human face, pure environmental storytelling, visual style: " + styleLabel + ", " + colorHarmony + ", photorealistic cinematic texture, 8k resolution, award-winning cinematography, no watermark, no text",
    framing,
    motion: script12.motion || "slow-drift",
    hasCharacter: false,
    shotType: "B-ROLL",
    colorHarmony
  };
}
function Xn(items = []) {
  if (!Array.isArray(items) || !items.length) {
    return [];
  }
  const environmentRegex = /\b(ciudad|calles?|edificio|cielo|universo|estrellas?|naturaleza|bosque|mar|oc[eé]ano|laboratorio|pantalla|c[oó]digo|datos|tecnolog[ií]a|m[aá]quina|dispositivo|dinero|gr[aá]fico|mundo|paisaje|planeta|arquitectura|detalle|reloj|tiempo|fuego|luz|sombra|coche|veh[ií]culo)\b/i;
  let consecutiveARollCount = 0;
  return items.map((item, index) => {
    const script = (item.script || item.caption || item.title || "").trim();
    item.hasCharacter;
    const matches = environmentRegex.test(script);
    let isBRoll = false;
    let reason = "";
    if (item.hasCharacter === false) {
      isBRoll = true;
      reason = "Marcado expl\xEDcitamente como B-Roll";
      consecutiveARollCount = 0;
    } else if (matches) {
      isBRoll = true;
      reason = "Palabras clave visuales de entorno, objeto o paisaje";
      consecutiveARollCount = 0;
    } else if (consecutiveARollCount >= 2) {
      isBRoll = true;
      reason = "Corte de ritmo para evitar monoton\xEDa de planos de personaje consecutivos";
      consecutiveARollCount = 0;
    } else {
      consecutiveARollCount += 1;
      reason = "Toma principal (A-Roll)";
    }
    return {
      index,
      sceneId: item.id,
      suggestedShotType: isBRoll ? "B-ROLL" : "A-ROLL",
      hasCharacter: !isBRoll,
      reason
    };
  });
}
const Ye = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Kn = 12e4;
const pt = 3;
const Sa = 1200;
const wa = 4e3;
const Jn = 2500;
const Zn = {
  "western-anime": "2D COMIC ANIMATION ART STYLE, 2D webtoon cartoon, clean 2D outline drawing, flat 2D color cel shading, vibrant hand-drawn animated aesthetic, strictly 2D flat illustration (no 3D render, no CGI, no photorealism)",
  "stickman-2d": "Clean 2D hand-drawn editorial illustration, minimalist educational explainer artwork, full-bleed 2D illustration, thick black ink outlines, flat muted pastel colors, all text in image strictly in Spanish language, no English text, no 3D, no realism, no letterboxing, no borders",
  cinematico: "CINEMATIC",
  anime: "ANIME",
  "pixel-art": "PIXEL ART",
  stickman: "STICKMAN",
  "stickman-dark": "STICKMAN DARK",
  "low-poly": "LOW POLY",
  salud: "CLEAN MEDICAL ILLUSTRATION",
  fantasia: "FANTASY",
  realista: "REALISTIC"
};
const Rt = "Strictly match the visual style, colors, linework and character proportions of the attached reference image. No photorealism unless in reference";
const Pe = (customStyle) => customStyle != null && !!customStyle.url || customStyle != null && !!customStyle.base64 || customStyle != null && !!customStyle.flowMediaId;
const Ct = (prompt, styleConfig, visualStyle) => {
  const styleSuffix = visualStyle === "custom-style" ? Rt : "STRICT STYLE CONSISTENCY: render every element exclusively as " + styleConfig.label + ". Never mix this style with a different artistic medium.";
  return (String(prompt || "").trim() + ", " + (styleConfig.promptSuffix || "") + ". " + styleSuffix).trim();
};
const ka = async (customStyle) => {
  if (!Pe(customStyle)) {
    return null;
  }
  if (customStyle.base64) {
    return {
      inlineData: {
        mimeType: customStyle.mimeType || "image/jpeg",
        data: customStyle.base64
      }
    };
  }
  if (!customStyle.url) {
    return null;
  }
  const response = await fetch(customStyle.url);
  if (!response.ok) {
    return null;
  }
  const blob = await response.blob();
  return {
    inlineData: {
      mimeType: blob.type || customStyle.mimeType || "image/jpeg",
      data: await ra(blob)
    }
  };
};
const Ca = {
  "stickman-2d": {
    label: "2D Infogr\xE1fico Editorial (Minimalista Explicativo / Tinta y Pastel)",
    isInfographic: true,
    promptSuffix: "Clean 2D hand-drawn editorial illustration, minimalist educational explainer artwork, full-bleed 2D scene, thick black ink outlines, slightly imperfect hand-sketched linework, subtle marker texture, flat muted pastel colors, simple geometric forms, cartoon-style characters with rounded proportions, minimal expressive faces, visual diagrams and flow arrows, high readability, all visible text and labels inside image strictly in Spanish language (absolutely no English words, no English text), simple shadows only, no realism, no 3D rendering, no photorealism, no cinematic lighting, no subtitles, no caption text overlay, no letterbox, no pillarbox, no borders, no margins, no white bars, no black bars",
    instructions: "Estilo Visual: Clean 2D hand-drawn editorial illustration, minimalist educational explainer artwork. Dibuja met\xE1foras visuales, diagramas con flechas, esquemas de procesos, iconos y personajes stickman expresivos que representen la idea de la frase a pantalla completa (full-bleed). REGLA ESTRICTA 1: NUNCA transcribas la frase del locutor completa dentro de la imagen como subt\xEDtulo. REGLA ESTRICTA 2 (IDIOMA): Todo texto, letrero, etiqueta de diagrama ('Luz solar', 'Factura', 'Ahorro', 'Red el\xE9ctrica', 'Pagar despu\xE9s', 'Medidor') o bocadillo que aparezca dibujado DENTRO de la ilustraci\xF3n DEBE ESTAR 100% EN ESPA\xD1OL. PROHIBIDO PALABRAS EN INGL\xC9S EN LA IMAGEN. REGLA ESTRICTA 3: Llena todo el lienzo de borde a borde sin generar bandas blancas o negras ni m\xE1rgenes.",
    characterDesc: "Minimalist cartoon-style stickman / line-drawn character with rounded smooth head, simple expressive dot/line face, clean black ink lines, subtle pastel clothes.",
    characterPrompt: "A clean 2D hand-drawn editorial illustration of a minimalist cartoon stickman character with rounded head [acci\xF3n visual/met\xE1fora que ilustra el concepto con diagramas, flechas o esquemas de proceso], with Spanish text labels if needed, full-bleed 2D scene, thick black ink outlines, flat muted pastel colors, all text in image strictly in Spanish, no English text, no 3D, no realism, no subtitles, no burned-in voiceover text, no letterbox, no borders",
    brollPrompt: "A clean 2D hand-drawn editorial illustration of [diagrama conceptual/esquema explicativo con flechas, iconos o comparativa visual], with Spanish text labels if needed, full-bleed 2D scene, thick black ink outlines, flat muted pastel colors, all text in image strictly in Spanish, no English text, no humans, no 3D, no subtitles, no burned-in voiceover text, no letterbox, no borders"
  },
  "western-anime": {
    label: "2D C\xF3mic / Webtoon Animado (L\xEDnea Limpia 2D + Flat Shading)",
    promptSuffix: "2D animated cartoon style, clean solid line art, flat cel shading, no 3D, no text, no photorealism",
    instructions: "Estilo Visual: 2D Cartoon / Webtoon con l\xEDnea negra s\xF3lida limpia (clean solid line art) y sombreado plano (flat cel shading). El entorno, iluminaci\xF3n y locaci\xF3n deben derivarse fielmente de la historia narrada en el guion.",
    characterDesc: "Personaje en estilo 2D c\xF3mic / webtoon. Si existe una imagen de referencia de personaje adjunta, respeta estrictamente sus rasgos faciales, vello facial (si tiene barba o si est\xE1 afeitado seg\xFAn la referencia), peinado y vestimenta id\xE9nticos a la referencia.",
    characterPrompt: "A 2D cartoon [shot type] of the character [acci\xF3n y entorno seg\xFAn el guion], 2D animated cartoon style, clean solid line art, flat cel shading, no 3D, no text",
    brollPrompt: "A 2D cartoon illustration of [objeto/entorno explicativo], 2D animated cartoon style, clean solid line art, flat cel shading, no humans, no 3D, no text"
  },
  stickman: {
    label: "Stickman 2D Cl\xE1sico",
    promptSuffix: "2D animated stickman YouTube cartoon style, minimalist character with smooth round white head, expressive black dot eyes, clean black outlines, natural human proportions",
    instructions: "Estilo: Stickman explicativo 2D con figura minimalista, cabeza blanca redondeada y l\xEDneas limpias.",
    characterDesc: "Personaje stickman blanco estilizado con cabeza redonda y expresiones limpias.",
    characterPrompt: "A 2D cartoon illustration of a stylized stickman character with smooth round white head and expressive dot eyes [acci\xF3n], clean black outlines, no 3D, no text",
    brollPrompt: "A 2D cartoon illustration of [objeto/entorno], clean minimalist style, no humans, no 3D, no text"
  },
  "stickman-dark": {
    label: "Stickman Dark Story",
    promptSuffix: "dark stickman story style, miniature black shadow figure, solid jet black round head, glowing white eyes, dark atmosphere",
    instructions: "Estilo: Stickman oscuro con sombra negra s\xF3lida y ojos blancos brillantes.",
    characterDesc: "Figura de sombra negra con ojos blancos luminosos.",
    characterPrompt: "A dark moody illustration of a miniature solid black silhouette stickman figure with glowing white eyes [acci\xF3n], dramatic lighting, no text",
    brollPrompt: "A dark moody illustration of [entorno/objeto], dark atmosphere, no humans, no text"
  },
  cinematico: {
    label: "Cinem\xE1tico Realista",
    promptSuffix: "cinematic style, natural lighting, depth of field, dramatic composition, 8k",
    instructions: "Estilo: Fotograf\xEDa cinem\xE1tica con iluminaci\xF3n natural y profundidad de campo acorde al entorno del guion.",
    characterDesc: "Personaje cinem\xE1tico realista. Si existe referencia de personaje, replica con fidelidad sus rasgos faciales, vello facial (si tiene barba o si est\xE1 afeitado seg\xFAn referencia), peinado y vestimenta sin ropa ni vello inventados.",
    characterPrompt: "A cinematic film still of the character [acci\xF3n y entorno seg\xFAn el guion], natural lighting, shallow depth of field, 8k, no text",
    brollPrompt: "A cinematic photograph of [entorno/objeto], dramatic lighting, shallow depth of field, no humans, no text"
  },
  anime: {
    label: "Anime / Manga Japon\xE9s",
    promptSuffix: "anime style, defined lines, vibrant colors, cel shading, studio anime aesthetic",
    instructions: "Estilo: Anime japon\xE9s con l\xEDneas n\xEDtidas y cel shading vibrante.",
    characterDesc: "Personaje estilo anime con ojos expresivos. Si hay referencia de personaje, replica fielmente su identidad, peinado y vestimenta.",
    characterPrompt: "An anime style illustration of the character [acci\xF3n y entorno seg\xFAn el guion], vibrant cel shading, studio anime aesthetic, no text",
    brollPrompt: "An anime style illustration of [entorno/objeto], beautiful anime background, vibrant colors, no humans, no text"
  },
  "pixel-art": {
    label: "Pixel Art 8-bit",
    promptSuffix: "pixel art style, 8-bit aesthetic, limited retro palette, crisp pixel clusters",
    instructions: "Estilo: Pixel art retro de 8 bits con paleta definida.",
    characterDesc: "Personaje pixelado con detalles limpios.",
    characterPrompt: "A pixel art illustration of a young man [acci\xF3n], 8-bit retro aesthetic, crisp pixel clusters, no text",
    brollPrompt: "A pixel art scene of [entorno/objeto], retro 8-bit pixel art, no humans, no text"
  },
  "low-poly": {
    label: "Low Poly 3D",
    promptSuffix: "low poly 3D style, simplified faceted geometry, smooth pastel lighting",
    instructions: "Estilo: Low poly con geometr\xEDa facetada simplificada.",
    characterDesc: "Personaje low-poly 3D geom\xE9trico.",
    characterPrompt: "A low poly 3D render of a stylized character [acci\xF3n], faceted geometry, pastel lighting, no text",
    brollPrompt: "A low poly 3D isometric scene of [entorno/objeto], faceted geometry, no humans, no text"
  },
  salud: {
    label: "Ilustraci\xF3n M\xE9dica",
    promptSuffix: "clean medical illustration, polished flat vector art, organic full-frame composition, object in foreground, no people, no infographic layout, no diagram, no arrows, no labels, no text",
    instructions: "Estilo: Ilustraci\xF3n m\xE9dica limpia en plano detalle. Construye una escena visual org\xE1nica; no uses formato de infograf\xEDa, diagramas, flechas, tablas ni r\xF3tulos.",
    characterDesc: "Sin personas, solo elementos m\xE9dicos, cient\xEDficos o conceptuales.",
    characterPrompt: "A clean medical illustration of [concepto], polished vector medical art, organic full-frame composition, no people, no infographic layout, no diagram, no arrows, no text",
    brollPrompt: "A clean medical illustration of [objeto/concepto], polished vector medical art, natural full-frame composition, no people, no infographic layout, no diagram, no arrows, no text"
  },
  fantasia: {
    label: "Fantas\xEDa \xC9pica",
    promptSuffix: "fantasy art style, magical atmosphere, dreamlike ethereal illustration",
    instructions: "Estilo: Ilustraci\xF3n fant\xE1stica y m\xE1gica con colores on\xEDricos.",
    characterDesc: "Personaje \xE9pico en entorno m\xE1gico.",
    characterPrompt: "A fantasy illustration of a character [acci\xF3n], magical atmosphere, dreamlike lighting, no text",
    brollPrompt: "A fantasy environment of [entorno/objeto], magical glow, ethereal landscape, no humans, no text"
  },
  realista: {
    label: "Fotograf\xEDa Realista",
    promptSuffix: "realistic photography, documentary photo, real life details, crisp focus",
    instructions: "Estilo: Fotograf\xEDa documental realista.",
    characterDesc: "Personaje realista acorde al guion. Si hay referencia de personaje, replica con fidelidad sus rasgos y vestimenta.",
    characterPrompt: "A realistic candid photograph of the character [acci\xF3n y entorno seg\xFAn el guion], natural ambient light, authentic texture, no text",
    brollPrompt: "A realistic photograph of [objeto/entorno], sharp focus, natural light, no humans, no text"
  }
};
const Mt = (visualStyle, reference) => visualStyle === "custom-style" && reference ? {
  label: "Estilo personalizado: " + (reference.name || "Referencia visual"),
  promptSuffix: "match the attached visual style reference precisely, natural full-frame composition, no infographic layout, no diagram, no arrows, no labels, no text",
  instructions: "Replica fielmente la est\xE9tica de la referencia adjunta. Crea una escena natural a pantalla completa; no conviertas la imagen en infograf\xEDa, diagrama, whiteboard o p\xF3ster educativo.",
  characterDesc: "Personaje coherente con la referencia visual personalizada.",
  characterPrompt: "A full-frame scene of a character [acci\xF3n], precisely matching the attached visual style reference, no infographic layout, no diagram, no text",
  brollPrompt: "A full-frame scene of [objeto/entorno], precisely matching the attached visual style reference, no humans, no infographic layout, no diagram, no text"
} : Ca[visualStyle] || Ca["western-anime"];
const Xa = async (imageUrl) => {
  try {
    if (imageUrl.startsWith("data:")) {
      const [parts1, parts2] = imageUrl.split(",");
      const match = parts1.match(/data:([^;]+)/);
      const mimeType = match ? match[1] : "image/png";
      const binary = atob(parts2);
      const uint8Array = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index++) {
        uint8Array[index] = binary.charCodeAt(index);
      }
      const blob2 = new Blob([uint8Array], {
        type: mimeType
      });
      const response = await fetch("/api/import", {
        method: "POST",
        headers: {
          "Content-Type": mimeType
        },
        body: blob2
      });
      if (!response.ok) {
        return imageUrl;
      }
      const data2 = await response.json();
      return (data2 == null ? void 0 : data2.url) || imageUrl;
    }
    const response2 = await fetch(imageUrl, {
      redirect: "follow"
    });
    if (!response2.ok) {
      return imageUrl;
    }
    const blob = await response2.blob();
    const response3 = await fetch("/api/import", {
      method: "POST",
      headers: {
        "Content-Type": blob.type || "image/jpeg"
      },
      body: blob
    });
    if (!response3.ok) {
      return imageUrl;
    }
    const data = await response3.json();
    return (data == null ? void 0 : data.url) || imageUrl;
  } catch {
    return imageUrl;
  }
};
const Qn = ({
  checkLicensed,
  devLog,
  resolveScene
}) => {
  const updateProject = w((state) => state.updateProject);
  const updateScene = w((state) => state.updateScene);
  const finishSceneOperation = w((state) => state.finishSceneOperation);
  const setAssetState = w((state) => state.setAssetState);
  const setBatchState = w((state) => state.setBatchState);
  const setReferenceStatus = w((state) => state.setReferenceStatus);
  const selectScene = w((state) => state.selectScene);
  const resolveSceneRef = React.useCallback((sceneOrId) => {
    if (resolveScene) {
      return resolveScene(sceneOrId);
    }
    if (!sceneOrId) {
      const {
        project,
        selectedId
      } = w.getState();
      return project.scenes.find((scene) => scene.id === selectedId) || project.scenes[0];
    }
    if (typeof sceneOrId == "string") {
      const {
        project
      } = w.getState();
      return project.scenes.find((scene) => scene.id === sceneOrId);
    }
    return sceneOrId;
  }, [resolveScene]);
  const uploadImage = React.useCallback(async (sceneOrFile, fileArg) => {
    let scene = sceneOrFile;
    let file = fileArg;
    if (sceneOrFile instanceof File && !file) {
      file = sceneOrFile;
      const {
        project,
        selectedId
      } = w.getState();
      scene = project.scenes.find((scene2) => scene2.id === selectedId) || project.scenes[0];
    }
    const resolvedScene = resolveSceneRef(scene);
    if (!resolvedScene || !file) {
      return;
    }
    const id = crypto.randomUUID();
    updateScene(resolvedScene.id, {
      status: "loading",
      operationId: id
    });
    try {
      const type = file.type && file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v|mkv)$/i.test(file.name);
      let dataUrl = 0;
      if (type) {
        try {
          dataUrl = await ma(file);
        } catch {
        }
      }
      const headers = {
        "Content-Type": file.type || "application/octet-stream",
        "x-filename": encodeURIComponent(file.name)
      };
      const response = await fetch("http://127.0.0.1:4322/api/import", {
        method: "POST",
        headers,
        body: file
      }).catch(() => fetch("/api/import", {
        method: "POST",
        headers,
        body: file
      }));
      const data = await response.json();
      if (!response.ok || data == null || !data.url) {
        throw new Error((data == null ? void 0 : data.error) || "No se pudo guardar el archivo multimedia.");
      }
      const format = w.getState().project.format;
      if (type) {
        finishSceneOperation(resolvedScene.id, id, {
          videoUrl: data.url,
          imageUrl: "",
          flowVideoUrl: "",
          mediaId: "",
          sourceFormat: format,
          muted: false,
          videoVolume: 1,
          ...dataUrl > 0 ? {
            duration: Math.max(0.5, dataUrl)
          } : {},
          status: "ready"
        });
      } else {
        finishSceneOperation(resolvedScene.id, id, {
          imageUrl: data.url,
          videoUrl: "",
          flowVideoUrl: "",
          mediaId: "",
          sourceFormat: format,
          status: "ready"
        });
      }
      if (devLog != null) {
        devLog("\u2705", "Archivo cargado en " + resolvedScene.title + ": " + file.name + (dataUrl > 0 ? " (" + dataUrl.toFixed(1) + "s)" : ""));
      }
    } catch (error) {
      finishSceneOperation(resolvedScene.id, id, {
        status: "error",
        error: error.message
      });
      if (devLog != null) {
        devLog("\u274C", "Error cargando archivo: " + error.message);
      }
    }
  }, [devLog, finishSceneOperation, resolveSceneRef, updateScene]);
  const uploadCharacterReference = React.useCallback(async (file) => {
    if (file) {
      setAssetState({
        status: "loading",
        message: "Guardando imagen de personaje localmente..."
      });
      try {
        const uint8Array = new Uint8Array(await file.arrayBuffer());
        const chunkSize = 32768;
        let binary = "";
        for (let index = 0; index < uint8Array.length; index += chunkSize) {
          binary += String.fromCharCode(...uint8Array.subarray(index, index + chunkSize));
        }
        const base64 = btoa(binary);
        const type = file.type || "image/jpeg";
        const dataUrl = "data:" + type + ";base64," + base64;
        if (devLog != null) {
          devLog("\u{1F4BE}", "Personaje guardado localmente: " + file.name + " (" + (file.size / 1024).toFixed(0) + "KB)");
        }
        updateProject({
          characterReference: {
            url: dataUrl,
            name: file.name,
            base64,
            mimeType: type,
            flowMediaId: ""
          }
        });
        setReferenceStatus("Referencia activa");
        setAssetState({
          status: "ready",
          message: "Personaje de referencia guardado."
        });
      } catch (error) {
        if (devLog != null) {
          devLog("\u274C", "Error guardando personaje: " + error.message);
        }
        setAssetState({
          status: "error",
          message: error.message
        });
      }
    }
  }, [devLog, setAssetState, setReferenceStatus, updateProject]);
  const removeCharacterReference = React.useCallback(() => {
    updateProject({
      characterReference: null
    });
    setReferenceStatus("");
    if (devLog != null) {
      devLog("\u{1F5D1}\uFE0F", "Referencia eliminada");
    }
  }, [devLog, setReferenceStatus, updateProject]);
  const buildImagePayload = React.useCallback(async (prompt, includeCharacter = true) => {
    const project = w.getState().project;
    const isShortFormat = project.format === "short";
    const payload = {
      prompt,
      format: project.format || "short",
      aspectRatio: isShortFormat ? "9:16" : "16:9",
      model: project.imageModel
    };
    const filteredStyleReferences = Array.isArray(project.styleReferences) && project.styleReferences.length > 0 ? project.styleReferences.filter((styleReference) => styleReference.enabled !== false && Pe(styleReference)) : project.customStyle && Pe(project.customStyle) ? [project.customStyle] : [];
    const characterReference = includeCharacter && Pe(project.characterReference) && project.characterReference.enabled !== false ? project.characterReference : null;
    const items = [...filteredStyleReferences];
    if (characterReference && !items.some((item) => item.url === characterReference.url)) {
      items.push(characterReference);
    }
    const referenceItems = items.slice(0, 3);
    if (referenceItems.length > 0) {
      payload.referenceImages = referenceItems.map((item) => ({
        data: item.base64 || "",
        mimeType: item.mimeType || "image/jpeg",
        name: item.name || "reference.jpg",
        flowMediaId: item.flowMediaId || ""
      }));
      payload.referenceImage = payload.referenceImages[0];
      if (referenceItems[0].flowMediaId) {
        payload.referenceMediaId = referenceItems[0].flowMediaId;
      }
    }
    return payload;
  }, []);
  const importVisualFilesToTimeline = React.useCallback(async (files) => {
    var type;
    const filteredFrom = Array.from(files || []).filter((from) => {
      var type4;
      var type5;
      return ((type4 = from == null ? void 0 : from.type) == null ? void 0 : type4.startsWith("image/")) || ((type5 = from == null ? void 0 : from.type) == null ? void 0 : type5.startsWith("video/"));
    });
    if (!filteredFrom.length) {
      return;
    }
    const {
      project,
      selectedId
    } = w.getState();
    const scene = project.scenes.find((scene2) => scene2.id === selectedId) || project.scenes[0];
    if (!scene) {
      return;
    }
    setAssetState({
      status: "loading",
      operation: "timeline-import",
      progress: 0,
      message: "Importando " + filteredFrom.length + " recursos al timeline\u2026"
    });
    const items21 = [];
    const items22 = [];
    for (let index = 0; index < filteredFrom.length; index += 1) {
      const file = filteredFrom[index];
      const isVideo = ((type = file == null ? void 0 : file.type) == null ? void 0 : type.startsWith("video/")) || /\.(mp4|webm|mov|m4v|mkv)$/i.test(file.name);
      let dataUrl = 0;
      if (isVideo) {
        try {
          dataUrl = await ma(file);
        } catch {
        }
      }
      try {
        const headers = {
          "Content-Type": file.type || "application/octet-stream",
          "x-filename": encodeURIComponent(file.name)
        };
        const response = await fetch("http://127.0.0.1:4322/api/import", {
          method: "POST",
          headers,
          body: file
        }).catch(() => fetch("/api/import", {
          method: "POST",
          headers,
          body: file
        }));
        const data = await response.json();
        if (!response.ok || data == null || !data.url) {
          throw new Error((data == null ? void 0 : data.error) || "No se pudo guardar el archivo.");
        }
        items21.push({
          url: data.url,
          kind: isVideo ? "video" : "image",
          name: file.name,
          duration: dataUrl > 0 ? dataUrl : 4
        });
      } catch (error) {
        items22.push(file.name);
        if (devLog != null) {
          devLog("\u274C", "No se pudo importar " + file.name + ": " + error.message);
        }
      }
      setAssetState({
        status: "loading",
        operation: "timeline-import",
        progress: Math.round((index + 1) / filteredFrom.length * 100),
        message: "Importando al timeline (" + (index + 1) + "/" + filteredFrom.length + ")\u2026"
      });
    }
    if (items21.length) {
      w.getState().insertMediaOnTimeline(scene.id, items21);
      if (devLog != null) {
        devLog("\u2705", items21.length + " recurso" + (items21.length === 1 ? "" : "s") + " organizado" + (items21.length === 1 ? "" : "s") + " en el timeline.");
      }
    }
    setAssetState({
      status: items22.length ? "error" : "ready",
      operation: "",
      progress: 100,
      message: items22.length ? items21.length + " recursos a\xF1adidos; " + items22.length + " no se pudieron importar." : "\u2705 " + items21.length + " recursos organizados en el timeline."
    });
  }, [devLog, setAssetState]);
  const requestFlowImage = React.useCallback(async (prompt, callback2, includeCharacter = true) => {
    const project = w.getState().project;
    const isCustomStyle = project.visualStyle === "custom-style" && Pe(project.customStyle);
    const customStyle = isCustomStyle ? project.customStyle : project.characterReference;
    const useReference = Pe(customStyle) && (isCustomStyle || includeCharacter);
    const referenceLabel = isCustomStyle ? "estilo" : "personaje";
    if (devLog != null) {
      devLog("\u{1F3A8}", "Generando imagen | referencia de " + referenceLabel + ": " + (useReference ? "S\xCD" : "NO"));
    }
    let finalPrompt = prompt;
    if (useReference) {
      if (isCustomStyle) {
        finalPrompt = Rt + ". SCENE CONTENT: " + prompt;
      } else {
        finalPrompt = "Same main character as reference image (strictly matching facial features, facial hair or beard if shown in reference image or clean-shaven if shown clean-shaven, hairstyle, and outfit from reference image). " + String(prompt || "").replace(/\bthe\s+young\s+man\s+with\s+short\s+black\s+hair\b/gi, "the character matching reference image").replace(/\bthe\s+young\s+man\b/gi, "the character matching reference").replace(/\band\s+plain\s+black\s+t-shirt\b/gi, "").replace(/\bplain\s+black\s+t-shirt\b/gi, "reference outfit").replace(/\bblack\s+t-shirt\b/gi, "reference outfit").replace(/\bcozy\s+studio\s+with\s+(a\s+)?warm\s+desk\s+lamp\b/gi, "").replace(/\bwarm\s+desk\s+lamp\b/gi, "").replace(/\bvolumetric\s+studio\s+lighting\b/gi, "atmospheric lighting").replace(/\s{2,}/g, " ").trim();
      }
    }
    const aspectRatioInstructions = project.format === "short" ? "STRICT ASPECT RATIO: 9:16 vertical portrait format (1080x1920). Full-bleed edge-to-edge vertical composition filling 100% of the frame height and width. Absolutely NO horizontal framing, NO letterbox, NO pillarbox, NO white bars, NO black bars, NO borders, NO margins at top or bottom." : "STRICT ASPECT RATIO: 16:9 widescreen landscape format (1920x1080). Full-bleed edge-to-edge widescreen composition filling 100% of the frame width and height. Absolutely NO vertical framing, NO letterbox, NO pillarbox, NO white bars, NO black bars, NO borders, NO margins at left or right.";
    const compositionInstructions = project.visualStyle === "stickman-2d" ? "Use an editorial infographic full-bleed 2D composition. If any text, signs or diagram labels are visible, they must be strictly in Spanish, never English. " + aspectRatioInstructions : "Do not use an infographic, whiteboard, diagram, flowchart, arrows, educational poster, icon grid or editorial explainer layout. Create a natural full-frame full-bleed scene in the selected visual style. No typography, labels, captions or text overlay. " + aspectRatioInstructions;
    const styleConfig = Mt(project.visualStyle || "western-anime", project.customStyle);
    const fullPrompt = (isCustomStyle ? Rt : Zn[project.visualStyle] || styleConfig.label || "CUSTOM VISUAL STYLE") + ": " + finalPrompt + ". " + (styleConfig.promptSuffix || "") + ". " + compositionInstructions;
    let lastError = null;
    for (let index = 1; index <= pt; index++) {
      if (w.getState().batchCancelled) {
        throw new Error("Cancelado por el usuario.");
      }
      try {
        const payload = await buildImagePayload(fullPrompt, includeCharacter);
        if (devLog != null) {
          devLog("\u{1F4E4}", "Enviando a Flow (intento " + index + "/" + pt + ")...");
        }
        const response = await Ee("FLOW_GENERATE_IMAGE", payload, Kn);
        if (useReference) {
          const referenceMessage = response != null && response.referenceUsed ? "\u2705 Flow aplic\xF3 la referencia de " + referenceLabel : "\u26A0\uFE0F Flow no aplic\xF3 la referencia de " + referenceLabel;
          if (devLog != null) {
            devLog(response != null && response.referenceUsed ? "\u2705" : "\u26A0\uFE0F", referenceMessage);
          }
          setReferenceStatus(response != null && response.referenceUsed ? "\u2705 Referencia aplicada" : "\u26A0\uFE0F Referencia no aplicada por Flow");
        }
        return response;
      } catch (error) {
        lastError = error;
        const message2 = error.message && (error.message.includes("THROTTLED") || error.message.includes("Quota exceeded") || error.message.includes("429"));
        const message3 = error.message && /recaptcha/i.test(error.message);
        if (devLog != null) {
          devLog("\u26A0\uFE0F", "Fallo en intento " + index + "/" + pt + (message2 ? " (L\xEDmite temporal / Throttled)" : message3 ? " (reCAPTCHA)" : "") + ": " + error.message);
        }
        if (index < pt && !w.getState().batchCancelled) {
          if (callback2 != null) {
            callback2(index, pt);
          }
          const value = message2 ? Math.max(4500, index * 3e3) : message3 ? Math.max(2500, index * 2e3) : Jn;
          if (devLog != null) {
            devLog("\u23F3", "Pausando " + Math.round(value / 1e3) + "s antes de reintentar...");
          }
          await Ye(value);
        }
      }
    }
    throw lastError || new Error("Error al generar imagen en Flow tras 3 reintentos.");
  }, [buildImagePayload, devLog, setReferenceStatus]);
  const imageUrl = React.useCallback(async (project, operationId, flowResult, sourceFormat) => {
    var image;
    const imageUrl2 = (flowResult == null ? void 0 : flowResult.imageUrl) || (flowResult == null ? void 0 : flowResult.url) || (flowResult == null ? void 0 : flowResult.mediaUrl) || ((image = flowResult == null ? void 0 : flowResult.image) == null ? void 0 : image.url);
    if (!imageUrl2) {
      throw new Error("Flow gener\xF3 el recurso, pero no devolvi\xF3 una URL de imagen utilizable.");
    }
    const sceneUpdate = {
      imageUrl: await Xa(imageUrl2) || imageUrl2,
      mediaId: (flowResult == null ? void 0 : flowResult.mediaId) || (flowResult == null ? void 0 : flowResult.name) || "",
      videoUrl: "",
      flowVideoUrl: "",
      sourceFormat,
      status: "ready",
      error: ""
    };
    finishSceneOperation(project.id, operationId, sceneUpdate);
    const scene = w.getState().project.scenes.find((scene2) => scene2.id === project.id);
    if (scene == null || !scene.imageUrl) {
      updateScene(project.id, sceneUpdate);
    }
    return sceneUpdate.imageUrl;
  }, [finishSceneOperation, updateScene]);
  const generateImage = React.useCallback(async (sceneOrId) => {
    var prompt;
    var electronAPI;
    if (checkLicensed && !checkLicensed("la generaci\xF3n de im\xE1genes con IA")) {
      return;
    }
    const scene = resolveSceneRef(sceneOrId);
    if (!scene) {
      return;
    }
    if ((prompt = scene.prompt) == null || !prompt.trim()) {
      setAssetState({
        status: "error",
        message: "Escribe un prompt para esta escena."
      });
      return updateScene(scene.id, {
        status: "error",
        error: "Escribe un prompt para esta escena."
      });
    }
    if (!w.getState().flowState.connected) {
      setAssetState({
        status: "error",
        message: "Google Flow no est\xE1 conectado. Haz clic en 'Conectar Flow' arriba."
      });
      if ((electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
        window.electronAPI.openGoogleFlow();
      }
      return;
    }
    const id = crypto.randomUUID();
    updateScene(scene.id, {
      status: "image-generating",
      error: "",
      operationId: id
    });
    if (devLog != null) {
      devLog("\u{1F5BC}\uFE0F", 'Generando: "' + (scene.title || scene.id) + '"');
    }
    try {
      const hasCharacter = scene.hasCharacter !== false;
      const flowResult = await requestFlowImage(scene.prompt, (attempt, maxAttempts) => setAssetState({
        status: "loading",
        message: 'Escena "' + scene.title + '": reintento (' + attempt + "/" + maxAttempts + ")..."
      }), hasCharacter);
      const format = w.getState().project.format;
      await imageUrl(scene, id, flowResult, format);
      if (devLog != null) {
        devLog("\u2705", '"' + (scene.title || scene.id) + '" lista ' + (flowResult.is2k ? "en 2K \u2728" : "") + " | ref: " + (flowResult.referenceUsed ? "S\xCD" : "NO"));
      }
      setAssetState({
        status: "ready",
        message: "Imagen generada " + (flowResult.is2k ? "(2K Ultra HD)" : "") + "."
      });
    } catch (error) {
      finishSceneOperation(scene.id, id, {
        status: "image-error",
        error: error.message
      });
      if (devLog != null) {
        devLog("\u274C", 'Error imagen "' + (scene.title || scene.id) + '": ' + error.message);
      }
      setAssetState({
        status: "error",
        message: error.message
      });
    }
  }, [checkLicensed, devLog, finishSceneOperation, requestFlowImage, imageUrl, resolveSceneRef, setAssetState, updateScene]);
  React.useEffect(() => {
    const handleRegenerateScene = async (state) => {
      var detail;
      var prompt;
      var characterReference;
      const sceneId = (detail = state.detail) == null ? void 0 : detail.sceneId;
      if (!sceneId) {
        return;
      }
      const scene = resolveSceneRef(sceneId);
      if (scene) {
        selectScene(scene.id);
        if ((prompt = scene.prompt) != null && prompt.trim()) {
          await generateImage(scene.id);
        } else {
          const state2 = w.getState();
          const visualStyle = state2.project.visualStyle || "western-anime";
          const styleConfig = Mt(visualStyle, state2.project.customStyle);
          const characterReference4 = ((characterReference = state2.project.characterReference) == null ? void 0 : characterReference.enabled) !== false ? state2.project.characterReference : null;
          const hasCharacterRef = Pe(characterReference4);
          const script = scene.script || scene.caption || scene.title || "Cinematic scene";
          let characterPrompt = styleConfig.characterPrompt || styleConfig.brollPrompt || "A clean illustration of [acci\xF3n]";
          if (hasCharacterRef) {
            characterPrompt = "A 2D cartoon Medium Shot of the character strictly matching the reference image, exact face and outfit, facial hair or beard if shown in reference or clean-shaven if shown clean-shaven [acci\xF3n]";
          }
          const qualitySuffix = styleConfig.isInfographic ? "crisp high-resolution linework" : "natural cinematic composition, masterpiece, 8k";
          const finalPrompt = Ct(characterPrompt.replace("[acci\xF3n]", script).replace("[action]", script), styleConfig, visualStyle) + ", " + qualitySuffix;
          updateScene(scene.id, {
            prompt: finalPrompt
          });
          await generateImage(scene.id);
        }
      }
    };
    window.addEventListener("flowtube:regenerate-scene", handleRegenerateScene);
    return () => window.removeEventListener("flowtube:regenerate-scene", handleRegenerateScene);
  }, [generateImage, resolveSceneRef, selectScene, updateScene]);
  const generateBatchPrompts = React.useCallback(async (batchScenes, totalScenes, allScenesText, state) => {
    var characterReference5;
    const project = w.getState().project;
    const customStyle = (project.visualStyle || "western-anime") === "custom-style" ? project.customStyle : null;
    const characterReference6 = ((characterReference5 = project.characterReference) == null ? void 0 : characterReference5.enabled) !== false ? project.characterReference : null;
    const hasCharacterRef = Pe(characterReference6);
    const items = [];
    let attachedStyleRule = "";
    let attachedCharacterRule = "";
    if (Pe(customStyle)) {
      try {
        const styleReferencePart = await ka(customStyle);
        if (styleReferencePart) {
          items.push(styleReferencePart);
          attachedStyleRule = "La imagen adjunta es la REFERENCIA VISUAL OBLIGATORIA para las " + batchScenes.length + " escenas. " + Rt + ".";
        }
      } catch {
      }
    }
    if (hasCharacterRef) {
      try {
        const characterReferencePart = await ka(characterReference6);
        if (characterReferencePart) {
          items.push(characterReferencePart);
          attachedCharacterRule = 'REFERENCIA DE PERSONAJE ADJUNTA: La imagen adjunta es la referencia del PERSONAJE PRINCIPAL.\nREGLA CR\xCDTICA DE PERSONAJE:\n- En toda escena con personaje (hasCharacter = true), debes describir al personaje respetando ESTRICTAMENTE su apariencia de la imagen de referencia (mismos rasgos faciales, peinado, ropa id\xE9ntica a la referencia).\n- FIDELIDAD FACIAL Y VELLO FACIAL: Observa con m\xE1xima atenci\xF3n el rostro del personaje en la imagen de referencia:\n  * Si el personaje TIENE barba, bigote o perilla (ej. barba completa, perilla, bigote), DEBES incluirlo y describirlo expl\xEDcitamente en el prompt en ingl\xE9s (ej: "with matching dark beard as depicted in reference image", "bearded character matching reference").\n  * Si el personaje en la referencia NO tiene barba (rostro limpio o afeitado), respeta el rostro limpio y NO agregues barba ("clean-shaven smooth face").\n  * En ning\xFAn caso contradigas la apariencia de la imagen de referencia.\n- En el prompt en ingl\xE9s, usa descripciones como: "the character strictly matching the reference image (same facial features, facial hair or beard if shown in reference or clean-shaven if shown clean-shaven, hair, and characteristic outfit)".\n- PROHIBIDO cambiar la ropa a camiseta negra lisa por defecto a menos que est\xE9 en la referencia.';
        }
      } catch {
      }
    }
    const compositionRules = state.isInfographic ? '1. Para cada escena crea una composici\xF3n 2D infogr\xE1fica editorial: permite diagramas, flechas de flujo, esquemas, iconos y personajes gesticulando.\n2. NUNCA transcribas la frase completa del locutor dentro de la imagen.\n3. Cualquier r\xF3tulo breve o etiqueta debe estar 100% en espa\xF1ol, nunca en ingl\xE9s.\n4. A\xF1ade al prompt: "all text and labels in image strictly in Spanish language, no English text".' : '1. Para cada escena crea una toma natural a pantalla completa, cinematogr\xE1fica o ilustrada seg\xFAn el estilo seleccionado.\n2. PROHIBIDO usar est\xE9tica de infograf\xEDa, whiteboard, diagrama, flechas, gr\xE1fico, tabla, p\xF3ster educativo, iconos explicativos, cuadr\xEDcula editorial o fondo blanco de presentaci\xF3n.\n3. PROHIBIDO a\xF1adir texto, r\xF3tulos, etiquetas, subt\xEDtulos o tipograf\xEDa dentro de la imagen.\n4. A\xF1ade al prompt: "natural full-frame scene, no infographic layout, no diagram, no arrows, no labels, no text".';
    const batchPromptText = Yn({
      batchScenes,
      totalScenes,
      styleConfig: state,
      attachedStyleRule,
      attachedCharacterRule,
      compositionRules,
      hasCharacterRef
    });
    try {
      items.push({
        text: batchPromptText
      });
      const response = await Ee("FLOW_GENERATE_TEXT", {
        model: project.textModel,
        parts: items
      }, 45e3);
      const match = String(response.text || "").trim().match(/\[[\s\S]*\]/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      if (devLog != null) {
        devLog("\u26A0\uFE0F", "Fallo en lote agrupado de prompts: " + error.message + ". Usando fallback individual...");
      }
    }
    return null;
  }, [devLog]);
  const generateVisualPrompts = React.useCallback(async (forceAll = false) => {
    var characterReference7;
    var firstEntry;
    if (checkLicensed && !checkLicensed("la generaci\xF3n de prompts visuales con IA")) {
      return;
    }
    const state = w.getState();
    state.resetPromptGenCancel();
    const scenes = state.project.scenes || [];
    const filteredMap = scenes.map((item, index) => ({
      scene: item,
      globalIndex: index
    })).filter(({
      scene
    }) => {
      var prompt;
      if (scene.isStockMotion || !((scene.script || scene.caption || scene.title || "").trim().length > 0)) {
        return false;
      } else if (forceAll) {
        return true;
      } else {
        return (prompt = scene.prompt) == null || !prompt.trim();
      }
    });
    if (!filteredMap.length) {
      setAssetState({
        status: "ready",
        message: forceAll ? "No hay escenas con texto." : "Todas las escenas ya tienen prompt."
      });
      return;
    }
    const visualStyle = state.project.visualStyle || "western-anime";
    const styleConfig = Mt(visualStyle, state.project.customStyle);
    const characterReference8 = ((characterReference7 = state.project.characterReference) == null ? void 0 : characterReference7.enabled) !== false ? state.project.characterReference : null;
    const hasCharacterRef = Pe(characterReference8);
    const generateLocalPrompts = () => {
      let framing = null;
      filteredMap.forEach(({
        scene: scene6,
        globalIndex
      }) => {
        const script = scene6.script || scene6.caption || scene6.title || "Escena " + (globalIndex + 1);
        const scene7 = Jt(script, globalIndex, filteredMap.length, styleConfig, hasCharacterRef, {
          previousFraming: framing,
          styleKey: visualStyle,
          characterDescription: (characterReference8 == null ? void 0 : characterReference8.name) || (characterReference8 == null ? void 0 : characterReference8.description) || ""
        });
        framing = scene7.framing;
        const finalPrompt = Ct(scene7.prompt, styleConfig, visualStyle);
        updateScene(scene6.id, {
          prompt: finalPrompt,
          hasCharacter: scene7.hasCharacter,
          shotType: scene7.shotType,
          framing: scene7.framing,
          motion: scene6.motion || scene7.motion || "gentle-zoom-in",
          status: scene6.imageUrl || scene6.videoUrl ? "ready" : "idle"
        });
      });
      setAssetState({
        status: "ready",
        message: "\u2705 " + filteredMap.length + " prompts generados con AI Director 2.0."
      });
    };
    const flowState = w.getState().flowState;
    if (!flowState.connected) {
      if (devLog != null) {
        devLog("\u{1F4A1}", "Flow no conectado: generando prompts locales ultra r\xE1pidos...");
      }
      generateLocalPrompts();
      return;
    }
    const length = filteredMap.length;
    let doneCount = 0;
    state.setPromptGenState({
      running: true,
      done: 0,
      total: length,
      percent: 0,
      startedAt: Date.now(),
      currentSceneTitle: ((firstEntry = filteredMap[0]) == null ? void 0 : firstEntry.scene.title) || "",
      message: "Generando prompts con IA (0/" + length + ")..."
    });
    setAssetState({
      status: "loading",
      message: "Generando prompts con IA (0/" + length + ")..."
    });
    try {
      const joined = scenes.map((item, index) => "Toma " + (index + 1) + ': "' + (item.script || item.caption || item.title || "").trim() + '"').filter((map) => !map.endsWith('""')).join("\n");
      const groupSize = 10;
      const items = [];
      for (let index = 0; index < filteredMap.length; index += groupSize) {
        items.push(filteredMap.slice(index, index + groupSize));
      }
      const value57 = Math.max(1, flowState.count || 1);
      const value58 = Math.min(6, Math.max(3, value57));
      for (let index = 0; index < items.length && !w.getState().promptGenCancelled; index += value58) {
        const activeGroups = items.slice(index, index + value58);
        await Promise.all(activeGroups.map(async (item) => {
          var previousItem;
          var scene;
          if (w.getState().promptGenCancelled) {
            return;
          }
          item.forEach(({
            scene: scene2
          }) => updateScene(scene2.id, {
            status: "prompt-generating"
          }));
          let batchResult = null;
          try {
            batchResult = await generateBatchPrompts(item.map((item2) => ({
              ...item2.scene,
              globalIndex: item2.globalIndex
            })), scenes.length, joined, styleConfig);
          } catch (error) {
            if (devLog != null) {
              devLog("\u26A0\uFE0F", "Fallo en lote Gemini: " + error.message);
            }
          }
          for (let index2 = 0; index2 < item.length && !w.getState().promptGenCancelled; index2++) {
            const {
              scene: scene8,
              globalIndex
            } = item[index2];
            let found = batchResult ? batchResult.find((item2) => Number(item2.sceneNumber) === globalIndex + 1) || batchResult[index2] : null;
            if (found && found.prompt) {
              const finalPrompt = Ct(String(found.prompt).replace(/^[\"\']+|[\"\']+$/g, "").trim(), styleConfig, visualStyle);
              updateScene(scene8.id, {
                prompt: finalPrompt,
                hasCharacter: found.hasCharacter !== false,
                shotType: found.shotType || (found.hasCharacter !== false ? "A-ROLL" : "B-ROLL"),
                framing: found.framing || "Medium Shot",
                motion: found.motion || "gentle-zoom-in",
                status: scene8.imageUrl || scene8.videoUrl ? "ready" : "idle"
              });
            } else {
              const script = scene8.script || scene8.caption || scene8.title || "Escena " + (globalIndex + 1);
              const framing = index2 > 0 ? (scene = (previousItem = item[index2 - 1]) == null ? void 0 : previousItem.scene) == null ? void 0 : scene.framing : null;
              const scene9 = Jt(script, globalIndex, scenes.length, styleConfig, hasCharacterRef, {
                previousFraming: framing,
                styleKey: visualStyle,
                characterDescription: (characterReference8 == null ? void 0 : characterReference8.name) || (characterReference8 == null ? void 0 : characterReference8.description) || ""
              });
              const finalPrompt = Ct(scene9.prompt, styleConfig, visualStyle);
              updateScene(scene8.id, {
                prompt: finalPrompt,
                hasCharacter: scene9.hasCharacter,
                shotType: scene9.shotType,
                framing: scene9.framing,
                motion: scene8.motion || scene9.motion || "gentle-zoom-in",
                status: scene8.imageUrl || scene8.videoUrl ? "ready" : "idle"
              });
            }
            doneCount++;
            state.setPromptGenState({
              running: true,
              done: doneCount,
              total: length,
              percent: Math.round(doneCount / length * 100),
              currentSceneTitle: scene8.title,
              message: "Generando prompts IA (" + doneCount + "/" + length + '): "' + scene8.title + '"...'
            });
          }
        }));
      }
    } finally {
      w.getState().project.scenes.forEach((scene) => {
        if (scene.status === "prompt-generating") {
          updateScene(scene.id, {
            status: scene.imageUrl || scene.videoUrl ? "ready" : "idle"
          });
        }
      });
      const promptGenCancelled = w.getState().promptGenCancelled;
      state.setPromptGenState({
        running: false,
        done: doneCount,
        total: length,
        percent: 100,
        currentSceneTitle: "",
        message: promptGenCancelled ? "Prompts detenidos." : "\xA1Todos los prompts listos!"
      });
      setAssetState({
        status: "ready",
        message: promptGenCancelled ? "Prompts detenidos." : "\xA1" + doneCount + " prompts generados!"
      });
    }
  }, [checkLicensed, devLog, generateBatchPrompts, setAssetState, updateScene]);
  const generateAllImages = React.useCallback(async (retryFailedOnly = false, forceRegenerateAll = false) => {
    var electronAPI;
    var firstChunk;
    if (checkLicensed && !checkLicensed("la generaci\xF3n de im\xE1genes en lote")) {
      return;
    }
    const state = w.getState();
    const project4 = state.project;
    if (project4.scenes.some((scene) => scene.operationId)) {
      return setAssetState({
        status: "error",
        message: "Espera a que termine la generaci\xF3n en curso."
      });
    }
    const flowState = state.flowState;
    if (!flowState.connected) {
      if (devLog != null) {
        devLog("\u{1F517}", "Abriendo Google Flow para conectar...");
      }
      if ((electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
        window.electronAPI.openGoogleFlow();
      }
    }
    state.resetBatchCancel();
    const value59 = Math.max(0, (Number(state.batchStartScene) || 1) - 1);
    const filteredScenes = project4.scenes.filter((scene) => {
      var prompt;
      return !scene.isStockMotion && (scene.script || scene.title || scene.caption) && ((prompt = scene.prompt) == null || !prompt.trim());
    });
    if (filteredScenes.length > 0) {
      if (devLog != null) {
        devLog("\u{1F4A1}", "Auto-generando " + filteredScenes.length + " prompts faltantes antes del lote...");
      }
      await generateVisualPrompts(false);
    }
    w.getState().project.scenes.forEach((scene, index) => {
      var prompt;
      if (((prompt = scene.prompt) == null || !prompt.trim()) && !scene.isStockMotion) {
        const script = scene.script || scene.caption || scene.title || "Escena " + (index + 1);
        const styleConfig = Mt(project4.visualStyle || "western-anime", project4.customStyle);
        const qualitySuffix = styleConfig.isInfographic ? "crisp high-resolution editorial linework" : "natural full-frame composition, high detail";
        const finalPrompt = (styleConfig.characterPrompt || "Illustration of a character").replace("[acci\xF3n]", script) + ", " + (styleConfig.promptSuffix || "clean style") + ", " + qualitySuffix;
        updateScene(scene.id, {
          prompt: finalPrompt
        });
      }
    });
    const project5 = w.getState().project;
    let filter = project5.scenes.map((scene, index) => ({
      scene,
      index
    })).filter(({
      scene,
      index
    }) => {
      var prompt;
      if (index < value59 || scene.isStockMotion || (prompt = scene.prompt) == null || !prompt.trim()) {
        return false;
      } else if (retryFailedOnly) {
        return scene.status === "image-error";
      } else if (forceRegenerateAll) {
        return true;
      } else {
        return !scene.imageUrl && !scene.videoUrl || scene.status === "image-error";
      }
    }).map(({
      scene
    }) => scene);
    if (!filter.length) {
      if (project5.scenes.every((scene) => scene.imageUrl || scene.videoUrl) && !forceRegenerateAll) {
        return setAssetState({
          status: "ready",
          message: "Todas las escenas ya tienen imagen. Usa 'Regenerar Todas' si deseas reemplazarlas."
        });
      } else {
        return setAssetState({
          status: "error",
          message: retryFailedOnly ? "No hay escenas fallidas." : "No hay escenas pendientes de generar."
        });
      }
    }
    const isCustomStyle = project5.visualStyle === "custom-style" && Pe(project5.customStyle);
    const customStyle = isCustomStyle ? project5.customStyle : project5.characterReference;
    if (Pe(customStyle) && !customStyle.flowMediaId && customStyle.base64) {
      if (devLog != null) {
        devLog("\u2601\uFE0F", "Subiendo referencia de " + (isCustomStyle ? "estilo" : "personaje") + " a Google Flow una sola vez para todo el lote...");
      }
      try {
        const response = await Ee("FLOW_UPLOAD_INGREDIENT", {
          data: customStyle.base64,
          mimeType: customStyle.mimeType || "image/jpeg",
          name: customStyle.name || (isCustomStyle ? "style_ref.jpg" : "character_ref.jpg")
        }, 3e4);
        const mediaId = (response == null ? void 0 : response.mediaId) || (response == null ? void 0 : response.name);
        if (mediaId) {
          updateProject(isCustomStyle ? {
            customStyle: {
              ...customStyle,
              flowMediaId: mediaId
            }
          } : {
            characterReference: {
              ...customStyle,
              flowMediaId: mediaId
            }
          });
          if (devLog != null) {
            devLog("\u2705", "Ingrediente listo para las " + filter.length + " escenas: " + mediaId.slice(0, 35) + "...");
          }
        }
      } catch (error) {
        if (devLog != null) {
          devLog("\u26A0\uFE0F", "Subida previa a Flow: " + error.message);
        }
      }
    }
    const length = filter.length;
    const value60 = Math.max(1, flowState.count || 1);
    const value61 = length <= 20 ? 1 : Math.min(value60, Math.ceil(length / 20));
    const chunkSize = Math.max(1, Number(state.batchChunkSize) || 20) * value61;
    const value62 = Math.max(40, Math.round(Sa / value61));
    const items23 = [];
    for (let index = 0; index < filter.length; index += chunkSize) {
      items23.push(filter.slice(index, index + chunkSize));
    }
    let doneCount = 0;
    let successCount = 0;
    let items24 = [];
    if (devLog != null) {
      devLog("\u{1F680}", "Lote inteligente: " + length + " escenas en " + items23.length + " grupo(s) de hasta " + chunkSize + " imgs (" + value61 + " cuenta(s) activa(s))");
    }
    setBatchState({
      running: true,
      done: 0,
      total: filter.length,
      startedAt: Date.now(),
      currentChunk: 1,
      totalChunks: items23.length,
      chunkDone: 0,
      chunkSize: ((firstChunk = items23[0]) == null ? void 0 : firstChunk.length) || 0,
      failures: [],
      message: "Iniciando generaci\xF3n con " + value61 + " cuenta(s) en " + items23.length + " lote(s)..."
    });
    try {
      for (let index = 0; index < items23.length && !w.getState().batchCancelled; index++) {
        const chunk = items23[index];
        const chunkNumber = index + 1;
        const length2 = items23.length;
        const firstSceneNumber = project5.scenes.findIndex((scene) => scene.id === chunk[0].id) + 1;
        const lastSceneNumber = project5.scenes.findIndex((scene) => scene.id === chunk[chunk.length - 1].id) + 1;
        if (devLog != null) {
          devLog("\u{1F4E6}", "Lote " + chunkNumber + "/" + length2 + ": escenas " + firstSceneNumber + "\u2013" + lastSceneNumber + " (" + chunk.length + " imgs)");
        }
        setBatchState((prev) => ({
          ...prev,
          running: true,
          currentChunk: chunkNumber,
          totalChunks: length2,
          chunkDone: 0,
          chunkSize: chunk.length,
          message: "Lote " + chunkNumber + "/" + length2 + ": procesando " + chunk.length + " im\xE1genes (Escenas " + firstSceneNumber + " a " + lastSceneNumber + ")..."
        }));
        let chunkDoneCount = 0;
        const processScene = async (scene) => {
          if (w.getState().batchCancelled) {
            return;
          }
          while (w.getState().batchPaused && !w.getState().batchCancelled) {
            setBatchState((prev) => ({
              ...prev,
              message: "Generaci\xF3n pausada. Puedes continuar cuando quieras."
            }));
            await Ye(300);
          }
          if (w.getState().batchCancelled) {
            return;
          }
          const id = crypto.randomUUID();
          updateScene(scene.id, {
            status: "image-generating",
            error: "",
            operationId: id
          });
          try {
            const hasCharacter = scene.hasCharacter !== false;
            const flowResult = await requestFlowImage(scene.prompt, (attempt, maxAttempts) => setBatchState((prev) => ({
              ...prev,
              message: "Lote " + chunkNumber + "/" + length2 + " \xB7 " + scene.title + ": reintento (" + attempt + "/" + maxAttempts + ")..."
            })), hasCharacter);
            await imageUrl(scene, id, flowResult, project5.format);
            if (devLog != null) {
              devLog("\u2705", '"' + scene.title + '" lista | ref: ' + (flowResult.referenceUsed ? "S\xCD" : "NO"));
            }
            successCount++;
          } catch (error) {
            finishSceneOperation(scene.id, id, {
              status: "image-error",
              error: error.message
            });
            if (devLog != null) {
              devLog("\u274C", '"' + scene.title + '" fall\xF3: ' + error.message);
            }
            items24.push({
              title: scene.title,
              error: error.message
            });
          } finally {
            const scene2 = w.getState().project.scenes.find((scene3) => scene3.id === scene3.id);
            if (scene2 && (scene2.operationId === id || scene2.status === "image-generating")) {
              updateScene(scene2.id, {
                operationId: "",
                status: scene2.imageUrl || scene2.videoUrl ? "ready" : scene2.status === "image-generating" ? "image-error" : scene2.status
              });
            }
          }
          doneCount++;
          chunkDoneCount++;
          setBatchState((prev) => ({
            ...prev,
            done: doneCount,
            chunkDone: chunkDoneCount,
            message: "Lote " + chunkNumber + "/" + length2 + " en progreso: " + chunkDoneCount + "/" + chunk.length + " listas (" + doneCount + "/" + filter.length + " total)"
          }));
        };
        await Promise.all(chunk.map(async (item, index2) => {
          if (index2 > 0) {
            await Ye(index2 * value62);
          }
          return processScene(item);
        }));
        if (w.getState().batchCancelled) {
          break;
        }
        if (index + 1 < items23.length) {
          if (devLog != null) {
            devLog("\u23F3", "Lote " + chunkNumber + "/" + length2 + " completo (" + chunk.length + " im\xE1genes listas en timeline). Pausa fija de enfriamiento...");
          }
          const value = Math.round(wa / 1e3);
          for (let index2 = value; index2 > 0 && !w.getState().batchCancelled; index2--) {
            setBatchState((prev) => ({
              ...prev,
              message: "\u2705 Lote " + chunkNumber + "/" + length2 + " completado (" + chunk.length + " listas en timeline). Enfriando " + index2 + "s antes del Lote " + (chunkNumber + 1) + "..."
            }));
            await Ye(1e3);
          }
        }
      }
    } finally {
      w.getState().project.scenes.forEach((scene) => {
        if (scene.status === "image-generating" || scene.operationId) {
          updateScene(scene.id, {
            status: scene.imageUrl || scene.videoUrl ? "ready" : "idle",
            operationId: ""
          });
        }
      });
      setBatchState((prev) => ({
        ...prev,
        running: false
      }));
    }
    const batchCancelled = w.getState().batchCancelled;
    setAssetState({
      status: items24.length || batchCancelled ? "error" : "ready",
      message: batchCancelled ? "Generaci\xF3n detenida por el usuario." : items24.length ? items24.length + ' im\xE1genes fallaron. Usa "Reintentar fallidas".' : "\u2705 \xA1Todos los lotes listos! " + successCount + " im\xE1genes generadas con \xE9xito."
    });
  }, [checkLicensed, devLog, requestFlowImage, generateVisualPrompts, finishSceneOperation, imageUrl, setAssetState, setBatchState, updateProject, updateScene]);
  const runAutoPipeline = React.useCallback(async (forceAll = false) => {
    var captionTrack;
    var audioTrack;
    if (checkLicensed && !checkLicensed("el Auto-Piloto Total")) {
      return;
    }
    const state = w.getState();
    const project6 = state.project;
    if (project6.scenes.some((scene) => scene.operationId)) {
      return setAssetState({
        status: "error",
        message: "Espera a que termine la generaci\xF3n en curso."
      });
    }
    const flowState = state.flowState;
    if (!flowState.connected) {
      return setAssetState({
        status: "error",
        message: "Conecta Google Flow para iniciar el Auto-Piloto."
      });
    }
    state.resetBatchCancel();
    state.resetPromptGenCancel();
    const cues = ((captionTrack = project6.captionTrack) == null ? void 0 : captionTrack.cues) || [];
    if (cues.length > 0 && project6.scenes.length <= 3 && cues.length > 3) {
      if (devLog != null) {
        devLog("\u{1F399}\uFE0F", "Auto-Piloto: Sincronizando frases desde el guion SRT...");
      }
      const timedCues = gt(cues, (audioTrack = project6.audioTrack) == null ? void 0 : audioTrack.durationMs);
      if (timedCues.length > 0) {
        const items2 = timedCues.map((cue, index) => ({
          ...De(index),
          title: cue.text.split(" ").slice(0, 4).join(" ") || "Escena " + String(index + 1).padStart(2, "0"),
          script: cue.text,
          caption: cue.text,
          prompt: "",
          duration: Math.max(0.5, Math.min(300, cue.duration || 4)),
          sourceStartMs: Math.round(cue.startMs),
          motion: "gentle-zoom-in",
          status: "idle",
          imageUrl: "",
          videoUrl: ""
        }));
        w.getState().setProject({
          ...w.getState().project,
          scenes: items2
        });
      }
    }
    const project7 = w.getState().project;
    const isCustomStyle = project7.visualStyle === "custom-style" && Pe(project7.customStyle);
    const customStyle = isCustomStyle ? project7.customStyle : project7.characterReference;
    if (Pe(customStyle) && !customStyle.flowMediaId && customStyle.base64) {
      try {
        if (devLog != null) {
          devLog("\u2601\uFE0F", "Subiendo referencia de " + (isCustomStyle ? "estilo" : "personaje") + " a Google Flow...");
        }
        const response = await Ee("FLOW_UPLOAD_INGREDIENT", {
          data: customStyle.base64,
          mimeType: customStyle.mimeType || "image/jpeg",
          name: customStyle.name || (isCustomStyle ? "style_ref.jpg" : "character_ref.jpg")
        }, 3e4);
        const mediaId = (response == null ? void 0 : response.mediaId) || (response == null ? void 0 : response.name);
        if (mediaId) {
          updateProject(isCustomStyle ? {
            customStyle: {
              ...customStyle,
              flowMediaId: mediaId
            }
          } : {
            characterReference: {
              ...customStyle,
              flowMediaId: mediaId
            }
          });
        }
      } catch (error) {
        if (devLog != null) {
          devLog("\u26A0\uFE0F", "Subida de ingrediente: " + error.message);
        }
      }
    }
    const scenes = w.getState().project.scenes;
    const length = scenes.filter((item) => !item.isStockMotion && (item.script || item.title || item.caption)).length;
    const value63 = Math.max(1, flowState.count || 1);
    const value64 = length <= 20 ? 1 : Math.min(value63, Math.ceil(length / 20));
    const chunkSize = Math.max(1, Number(state.batchChunkSize) || 20) * value64;
    const value65 = Math.max(40, Math.round(Sa / value64));
    setBatchState({
      running: true,
      done: 0,
      total: length,
      startedAt: Date.now(),
      currentChunk: 1,
      totalChunks: Math.ceil(length / chunkSize) || 1,
      chunkDone: 0,
      chunkSize,
      failures: [],
      message: "\u{1F680} Auto-Piloto: generando prompts e im\xE1genes (" + (value64 > 1 ? value64 + " cuentas en paralelo" : "1 cuenta") + ")..."
    });
    if (devLog != null) {
      devLog("\u{1F680}", "Iniciando Pipeline Dual Auto-Piloto (" + length + " escenas)...");
    }
    let promptsDone = false;
    const promptPipeline = (async () => {
      try {
        await generateVisualPrompts(forceAll);
      } catch (error) {
        if (devLog != null) {
          devLog("\u26A0\uFE0F", "Error en generador de prompts: " + error.message);
        }
      } finally {
        promptsDone = true;
      }
    })();
    let set = new Set(forceAll ? [] : scenes.filter((scene) => scene.imageUrl || scene.videoUrl).map((filter) => filter.id));
    let size = set.size;
    let successCount = 0;
    let items = [];
    let chunkIndex = 0;
    const imagePipeline = (async () => {
      while (!w.getState().batchCancelled) {
        const project = w.getState().project;
        const scenes2 = project.scenes;
        scenes2.forEach((scene) => {
          if ((scene.imageUrl || scene.videoUrl) && !set.has(scene.id)) {
            set.add(scene.id);
          }
        });
        const items25 = scenes2.filter((item) => !item.isStockMotion && !set.has(item.id) && item.prompt && item.prompt.trim().length > 0 && !item.operationId);
        const length2 = scenes2.filter((item) => !item.isStockMotion && !set.has(item.id) && (item.script || item.title || item.caption)).length;
        if (length2 === 0) {
          if (devLog != null) {
            devLog("\u{1F3C1}", "Todas las im\xE1genes han sido generadas en el Auto-Piloto.");
          }
          break;
        }
        if (items25.length < chunkSize && items25.length < length2 && !promptsDone) {
          await Ye(800);
          continue;
        }
        if (items25.length === 0) {
          if (promptsDone) {
            break;
          }
          await Ye(500);
          continue;
        }
        const chunk = items25.slice(0, chunkSize);
        chunkIndex++;
        const value66 = Math.ceil(length / chunkSize) || 1;
        const firstSceneNumber = scenes2.findIndex((item) => item.id === chunk[0].id) + 1;
        const lastSceneNumber = scenes2.findIndex((item) => item.id === chunk[chunk.length - 1].id) + 1;
        if (devLog != null) {
          devLog("\u{1F4E6}", "Auto-Piloto Lote " + chunkIndex + "/" + value66 + ": escenas " + firstSceneNumber + "\u2013" + lastSceneNumber + " (" + chunk.length + " imgs)");
        }
        setBatchState((prev) => ({
          ...prev,
          running: true,
          currentChunk: chunkIndex,
          totalChunks: value66,
          chunkDone: 0,
          chunkSize: chunk.length,
          message: "Lote " + chunkIndex + "/" + value66 + ": generando " + chunk.length + " im\xE1genes (Escenas " + firstSceneNumber + " a " + lastSceneNumber + ")..."
        }));
        let chunkDoneCount = 0;
        const processScene = async (scene) => {
          if (w.getState().batchCancelled) {
            return;
          }
          while (w.getState().batchPaused && !w.getState().batchCancelled) {
            setBatchState((prev) => ({
              ...prev,
              message: "Auto-Piloto pausado. Puedes continuar cuando quieras."
            }));
            await Ye(300);
          }
          if (w.getState().batchCancelled) {
            return;
          }
          const id = crypto.randomUUID();
          updateScene(scene.id, {
            status: "image-generating",
            error: "",
            operationId: id
          });
          try {
            const hasCharacter = scene.hasCharacter !== false;
            const flowResult = await requestFlowImage(scene.prompt, (attempt, maxAttempts) => setBatchState((prev) => ({
              ...prev,
              message: "Lote " + chunkIndex + "/" + value66 + " \xB7 " + scene.title + ": reintento (" + attempt + "/" + maxAttempts + ")..."
            })), hasCharacter);
            await imageUrl(scene, id, flowResult, project.format);
            if (devLog != null) {
              devLog("\u2705", '"' + scene.title + '" lista | ref: ' + (flowResult.referenceUsed ? "S\xCD" : "NO"));
            }
            successCount++;
          } catch (error) {
            finishSceneOperation(scene.id, id, {
              status: "image-error",
              error: error.message
            });
            if (devLog != null) {
              devLog("\u274C", '"' + scene.title + '" fall\xF3: ' + error.message);
            }
            items.push({
              title: scene.title,
              error: error.message
            });
          } finally {
            const scene2 = w.getState().project.scenes.find((scene3) => scene3.id === scene3.id);
            if (scene2 && (scene2.operationId === id || scene2.status === "image-generating")) {
              updateScene(scene2.id, {
                operationId: "",
                status: scene2.imageUrl || scene2.videoUrl ? "ready" : scene2.status === "image-generating" ? "image-error" : scene2.status
              });
            }
          }
          set.add(scene.id);
          size++;
          chunkDoneCount++;
          setBatchState((prev) => ({
            ...prev,
            done: size,
            chunkDone: chunkDoneCount,
            message: "Lote " + chunkIndex + "/" + value66 + " en progreso: " + chunkDoneCount + "/" + chunk.length + " listas (" + size + "/" + length + " total)"
          }));
        };
        await Promise.all(chunk.map(async (item, index) => {
          if (index > 0) {
            await Ye(index * value65);
          }
          return processScene(item);
        }));
        if (w.getState().batchCancelled) {
          break;
        }
        if (scenes2.some((item) => !item.isStockMotion && !set.has(item.id))) {
          if (devLog != null) {
            devLog("\u23F3", "Auto-Piloto Lote " + chunkIndex + " completo (" + chunk.length + " im\xE1genes listas en timeline). Pausa de enfriamiento...");
          }
          const value67 = Math.round(wa / 1e3);
          for (let index = value67; index > 0 && !w.getState().batchCancelled; index--) {
            setBatchState((prev) => ({
              ...prev,
              message: "\u2705 Lote " + chunkIndex + "/" + value66 + " completado (" + chunk.length + " listas en timeline). Enfriando " + index + "s antes del Lote " + (chunkIndex + 1) + "..."
            }));
            await Ye(1e3);
          }
        }
      }
    })();
    try {
      await Promise.all([promptPipeline, imagePipeline]);
    } finally {
      w.getState().project.scenes.forEach((scene) => {
        if (scene.status === "image-generating" || scene.operationId) {
          updateScene(scene.id, {
            status: scene.imageUrl || scene.videoUrl ? "ready" : "idle",
            operationId: ""
          });
        }
      });
      setBatchState((prev) => ({
        ...prev,
        running: false,
        message: ""
      }));
    }
    const batchCancelled = w.getState().batchCancelled;
    setAssetState({
      status: items.length || batchCancelled ? "error" : "ready",
      message: batchCancelled ? "Auto-Piloto detenido por el usuario." : items.length ? items.length + ' im\xE1genes fallaron. Usa "Reintentar fallidas".' : "\u2705 \xA1Auto-Piloto completado con \xE9xito! " + successCount + " im\xE1genes generadas."
    });
  }, [checkLicensed, devLog, finishSceneOperation, requestFlowImage, generateVisualPrompts, imageUrl, setAssetState, setBatchState, updateProject, updateScene]);
  return {
    uploadImage,
    uploadCharacterReference,
    removeCharacterReference,
    importVisualFilesToTimeline,
    generateImage,
    generateAllImages,
    runAutoPipeline,
    generateVisualPrompts
  };
};
const Vt = {
  "sticker-3d": {
    id: "sticker-3d",
    label: "Sticker 3D Brillante",
    icon: "\u{1F48E}",
    promptModifier: "glossy 3D isolated sticker badge, vibrant colors, clean studio lighting, isolated on solid black background, volumetric depth, ultra sharp, 8k resolution, no text"
  },
  "vector-minimal": {
    id: "vector-minimal",
    label: "Ilustraci\xF3n Vectorial",
    icon: "\u{1F3A8}",
    promptModifier: "clean modern 2D vector flat icon illustration, minimalist, vibrant palette, isolated on solid black background, bold graphic style, no text"
  },
  cinematic: {
    id: "cinematic",
    label: "Cinematogr\xE1fico Realista",
    icon: "\u{1F4F8}",
    promptModifier: "cinematic hyperrealistic object macro shot, isolated foreground, dark background, dramatic rim lighting, authentic textures, 8k, no text"
  },
  "pop-art": {
    id: "pop-art",
    label: "Emoji & Pop Art",
    icon: "\u2B50",
    promptModifier: "bold pop art graphic badge, vibrant thick outlines, colorful sticker aesthetic, isolated on solid black background, expressive, no text"
  }
};
const er = [{
  pattern: /\b(oportunidad|oportunidades|futuro|éxito|avanzar|crecer|crecimiento|triunfo|logro)\b/i,
  keyword: "Oportunidades y \xC9xito",
  prompt: "Glowing golden open door revealing a bright path of success and growth, floating achievement star",
  suggestedPosition: "top-right",
  suggestedScale: 0.55
}, {
  pattern: /\b(paz|tranquilidad|calma|serenidad|aceptar|aceptación|armonía|meditar)\b/i,
  keyword: "Paz y Serenidad",
  prompt: "Luminous zen balance stones with delicate water ripples and soft radiant aura, harmony symbol",
  suggestedPosition: "top-left",
  suggestedScale: 0.5
}, {
  pattern: /\b(vida|vivir|salud|energía|fuerza|vitalidad|corazón|sentir)\b/i,
  keyword: "Vitalidad y Vida",
  prompt: "Radiant glowing neon heart with vibrant organic energy waves and flourishing green leaves",
  suggestedPosition: "top-right",
  suggestedScale: 0.55
}, {
  pattern: /\b(dinero|economía|finanzas|riqueza|invertir|ganar|dólar|capital|negocio)\b/i,
  keyword: "Finanzas y Riqueza",
  prompt: "Floating stack of gleaming golden coins with rising green profit arrow graph, prosperity icon",
  suggestedPosition: "top-right",
  suggestedScale: 0.55
}, {
  pattern: /\b(tiempo|reloj|segundo|minuto|esperar|urgente|edad|años|etapa|etapas)\b/i,
  keyword: "Tiempo y Etapas",
  prompt: "Holographic vintage hourglass with glowing golden sand particles floating in mid-air",
  suggestedPosition: "top-right",
  suggestedScale: 0.5
}, {
  pattern: /\b(mente|pensar|idea|cerebro|sabiduría|aprender|estudiar|inteligencia|pensamiento)\b/i,
  keyword: "Mente e Ideas",
  prompt: "Luminescent lightbulb surrounded by floating electric spark ideas and gentle glowing synapses",
  suggestedPosition: "top-left",
  suggestedScale: 0.52
}, {
  pattern: /\b(problema|obstáculo|difícil|reto|frenar|miedo|caos|estrés|carga)\b/i,
  keyword: "Reto y Obst\xE1culo",
  prompt: "Cracked stone barrier bursting open with bright breakthrough golden rays, triumph over hardship",
  suggestedPosition: "center",
  suggestedScale: 0.6
}, {
  pattern: /\b(disfrutar|disfrutas|feliz|felicidad|alegría|sonreír|pasión|gratitud)\b/i,
  keyword: "Gratitud y Alegr\xEDa",
  prompt: "Playful radiant sunshine badge bursting with golden spark rays and joyful warmth",
  suggestedPosition: "top-right",
  suggestedScale: 0.5
}, {
  pattern: /\b(tecnología|ia|robot|código|digital|futuro|pantalla|software|algoritmo)\b/i,
  keyword: "Tecnolog\xEDa e IA",
  prompt: "Futuristic neon blue holographic cyber core with glowing circuit nodes and particle orbit",
  suggestedPosition: "top-right",
  suggestedScale: 0.55
}, {
  pattern: /\b(meta|objetivo|foco|visión|apuntar|camino|destino|dirección)\b/i,
  keyword: "Metas y Enfoque",
  prompt: "Stylized holographic bullseye target with a glowing laser arrow striking the exact center",
  suggestedPosition: "top-left",
  suggestedScale: 0.5
}];
function Ka(items26 = [], cues = 6) {
  if (!Array.isArray(items26) || !items26.length) {
    return [];
  }
  const items27 = [];
  let lastEndTime = -5;
  items26.forEach((cue, index) => {
    const string = String(cue.text || "").trim();
    if (string.length < 3) {
      return;
    }
    const value68 = Number(cue.startMs !== void 0 ? cue.startMs / 1e3 : cue.startSeconds || 0);
    const value69 = Number(cue.endMs !== void 0 ? cue.endMs / 1e3 : cue.endSeconds || value68 + 3);
    const value70 = Math.max(1.8, Math.min(5, Number((value69 - value68).toFixed(1)) || 3));
    if (value68 < lastEndTime + 2.5) {
      return;
    }
    let er2 = er.find((er3) => er3.pattern.test(string));
    if (!er2 && value68 >= lastEndTime + 8 && items27.length < cues) {
      const firstFilter = string.split(/\s+/).filter((split) => split.length > 4)[0] || "Concepto";
      er2 = {
        keyword: firstFilter.charAt(0).toUpperCase() + firstFilter.slice(1),
        prompt: 'Conceptual visual representation of "' + firstFilter + '", glowing minimalist floating object, elegant lighting',
        suggestedPosition: items27.length % 2 === 0 ? "top-right" : "top-left",
        suggestedScale: 0.55
      };
    }
    if (er2 && items27.length < cues) {
      items27.push({
        id: "cand_" + (cue.id || index) + "_" + Date.now(),
        cueId: cue.id || "cue_" + index,
        startSeconds: Number(value68.toFixed(2)),
        durationSeconds: value70,
        cueText: string,
        keyword: er2.keyword,
        concept: er2.prompt,
        suggestedPosition: er2.suggestedPosition || "top-right",
        suggestedScale: er2.suggestedScale || 0.55,
        selected: true
      });
      lastEndTime = value68 + value70;
    }
  });
  return items27;
}
async function tr({
  cues,
  flowRequest: callback = null,
  flowConnected = false,
  maxCandidates = 6
}) {
  if (!Array.isArray(cues) || cues.length === 0) {
    return [];
  }
  if (flowConnected && typeof callback == "function") {
    try {
      const prompt = "Act as an expert YouTube video editor and visual effects director.\nHere is the subtitle script of a video clip:\n" + cues.slice(0, 50).map((slice, index) => "[ID:" + (slice.id || index) + " | " + ((slice.startMs || 0) / 1e3).toFixed(1) + "s-" + ((slice.endMs || 0) / 1e3).toFixed(1) + 's]: "' + slice.text + '"').join("\n") + "\n\nTask: Identify up to " + maxCandidates + ' high-impact moments in the subtitles where a visual sticker / floating image overlay (b-roll graphic or visual metaphor) would best reinforce what the speaker is saying.\nRules:\n1. Space them out nicely (at least 3 to 6 seconds apart).\n2. For each selected cue, return a JSON array of objects with:\n   - "cueId": matching ID from input\n   - "keyword": short title in Spanish (1-3 words)\n   - "concept": an English image generation prompt describing an isolated, iconic visual sticker object on a solid dark background (no text, no typography).\n   - "suggestedPosition": "top-right", "top-left" or "center"\n   - "suggestedScale": number between 0.45 and 0.65\n\nRespond ONLY with a valid JSON array, no markdown fences, no conversational text.';
      const response = await callback("FLOW_GENERATE_TEXT", {
        model: "gemini-2.5-flash",
        parts: [{
          text: prompt
        }]
      }, 3e4);
      const match = String((response == null ? void 0 : response.text) || "").trim().match(/\[[\s\S]*\]/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item, index) => {
            const found = cues.find((item2) => String(item2.id) === String(item.cueId)) || cues[index] || {};
            const value71 = Number(found.startMs !== void 0 ? found.startMs / 1e3 : found.startSeconds || 0);
            const value72 = Number(found.endMs !== void 0 ? found.endMs / 1e3 : found.endSeconds || value71 + 3);
            return {
              id: "cand_ai_" + index + "_" + Date.now(),
              cueId: found.id || item.cueId || "cue_" + index,
              startSeconds: Number(value71.toFixed(2)),
              durationSeconds: Math.max(1.8, Math.min(5, Number((value72 - value71).toFixed(1)) || 3)),
              cueText: found.text || "",
              keyword: item.keyword || "Elemento Visual",
              concept: item.concept || "Floating isolated 3D sticker icon",
              suggestedPosition: item.suggestedPosition || "top-right",
              suggestedScale: Number(item.suggestedScale) || 0.55,
              selected: true
            };
          });
        }
      }
    } catch {
    }
  }
  return Ka(cues, maxCandidates);
}
const _Component3 = ({
  isOpen,
  onClose,
  cues = []
}) => {
  const project = w((state) => state.project);
  const flowState = w((state) => state.flowState);
  const addOverlay = w((state) => state.addOverlay);
  const [candidates, setCandidates] = React.useState([]);
  const [selectedStyle, setSelectedStyle] = React.useState("sticker-3d");
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [progress, setProgress] = React.useState({
    done: 0,
    total: 0,
    current: ""
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  React.useEffect(() => {
    if (!isOpen) {
      setCandidates([]);
      setIsGenerating(false);
      setErrorMessage("");
      return;
    }
    (async () => {
      setIsAnalyzing(true);
      try {
        const chunks = Ka(cues, 7);
        setCandidates(chunks);
        if (flowState != null && flowState.connected) {
          const aiCandidates = await tr({
            cues,
            flowRequest: Ee,
            flowConnected: true,
            maxCandidates: 7
          });
          if (Array.isArray(aiCandidates) && aiCandidates.length > 0) {
            setCandidates(aiCandidates);
          }
        }
      } catch (error) {
        console.error("Error al analizar subt\xEDtulos para overlays:", error);
      } finally {
        setIsAnalyzing(false);
      }
    })();
  }, [isOpen, cues, flowState == null ? void 0 : flowState.connected]);
  if (!isOpen) {
    return null;
  }
  const length = candidates.filter((item) => item.selected).length;
  const handleClick4 = () => {
    const matches = candidates.every((item) => item.selected);
    setCandidates((indexes) => indexes.map((item) => ({
      ...item,
      selected: !matches
    })));
  };
  const toggleSelected = (id) => {
    setCandidates((indexes) => indexes.map((item) => item.id === id ? {
      ...item,
      selected: !item.selected
    } : item));
  };
  const updateConcept = (id, value) => {
    setCandidates((indexes) => indexes.map((item) => item.id === id ? {
      ...item,
      concept: value
    } : item));
  };
  const updatePosition = (id, value) => {
    setCandidates((indexes) => indexes.map((item) => item.id === id ? {
      ...item,
      suggestedPosition: value
    } : item));
  };
  const handleClick5 = async () => {
    var electronAPI;
    var firstImage;
    const items = candidates.filter((item) => item.selected);
    if (!items.length) {
      setErrorMessage("Selecciona al menos una superposici\xF3n para generar.");
      return;
    }
    if (flowState == null || !flowState.connected) {
      setErrorMessage("Google Flow no est\xE1 conectado. Abre la ventana de conexi\xF3n para generar im\xE1genes con IA.");
      if ((electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
        window.electronAPI.openGoogleFlow();
      }
      return;
    }
    setIsGenerating(true);
    setErrorMessage("");
    setProgress({
      done: 0,
      total: items.length,
      current: items[0].keyword
    });
    const vt = Vt[selectedStyle] || Vt["sticker-3d"];
    try {
      for (let index = 0; index < items.length; index++) {
        const overlay = items[index];
        setProgress({
          done: index,
          total: items.length,
          current: overlay.keyword || "Superposici\xF3n " + (index + 1)
        });
        const payload = {
          prompt: overlay.concept.trim() + ", " + vt.promptModifier,
          format: project.format || "short",
          aspectRatio: "1:1",
          model: project.imageModel || "nano-banana-2"
        };
        const response = await Ee("FLOW_GENERATE_IMAGE", payload, 9e4);
        const imageUrl = (response == null ? void 0 : response.imageUrl) || (response == null ? void 0 : response.url) || (response == null ? void 0 : response.mediaUrl) || (response == null ? void 0 : response.images) && ((firstImage = response.images[0]) == null ? void 0 : firstImage.url) || "";
        if (imageUrl) {
          const uploadedUrl = await Xa(imageUrl);
          const posX = overlay.suggestedPosition === "top-left" ? 22 : overlay.suggestedPosition === "center" ? 50 : 78;
          const posY = overlay.suggestedPosition === "center" ? 50 : 20;
          addOverlay({
            id: "ov_ai_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
            name: overlay.keyword || "Superposici\xF3n IA",
            imageUrl: uploadedUrl || imageUrl,
            scale: overlay.suggestedScale || 0.55,
            position: overlay.suggestedPosition || "top-right",
            posX,
            posY,
            startSeconds: overlay.startSeconds,
            durationSeconds: overlay.durationSeconds,
            captionCueId: overlay.cueId,
            animation: "pop"
          });
        }
      }
      setIsGenerating(false);
      onClose();
    } catch (error) {
      console.error("Fallo al generar superposiciones:", error);
      setErrorMessage("Error durante la generaci\xF3n: " + (error.message || "Fallo de conexi\xF3n con Flow."));
      setIsGenerating(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { style: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "rgba(3, 7, 18, 0.85)",
    backdropFilter: "blur(14px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }, onClick: (event) => {
    if (event.target === event.currentTarget && !isGenerating) {
      onClose();
    }
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    width: 720,
    maxWidth: "96vw",
    maxHeight: "90vh",
    background: "#0c1017",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    borderRadius: 16,
    boxShadow: "0 25px 75px rgba(0, 0, 0, 0.85), 0 0 30px rgba(139, 92, 246, 0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    color: "#f1f5f9",
    fontFamily: "system-ui, -apple-system, sans-serif"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "16px 22px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "linear-gradient(90deg, rgba(139, 92, 246, 0.12), transparent)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 24
        }, children: "\u2728" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { style: {
            margin: 0,
            fontSize: 16,
            fontWeight: 800,
            color: "#fff"
          }, children: "Generador Inteligente de Superposiciones (Pista V2)" }),
          /* @__PURE__ */ jsx("p", { style: {
            margin: "2px 0 0",
            fontSize: 12,
            color: "#94a3b8"
          }, children: "Analiza tus subt\xEDtulos y crea im\xE1genes / stickers sobre el video sincronizados con cada frase" })
        ] })
      ] }),
      !isGenerating && /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, style: {
        background: "transparent",
        border: "none",
        color: "#94a3b8",
        fontSize: 20,
        cursor: "pointer",
        padding: "4px 8px"
      }, children: "\u2715" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "18px 22px",
      overflowY: "auto",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: {
          fontSize: 12,
          fontWeight: 800,
          color: "#cbd5e1",
          display: "block",
          marginBottom: 8
        }, children: "\u{1F3A8} Estilo Visual de las Superposiciones" }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8
        }, children: Object.values(Vt).map((value) => {
          const isSelectedStyle = selectedStyle === value.id;
          return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setSelectedStyle(value.id), disabled: isGenerating, style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: "10px 8px",
            borderRadius: 8,
            border: isSelectedStyle ? "1.5px solid #8b5cf6" : "1px solid rgba(255, 255, 255, 0.08)",
            background: isSelectedStyle ? "rgba(139, 92, 246, 0.22)" : "rgba(255, 255, 255, 0.02)",
            color: isSelectedStyle ? "#fff" : "#94a3b8",
            cursor: isGenerating ? "not-allowed" : "pointer",
            transition: "all 0.15s ease"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 20
            }, children: value.icon }),
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 11,
              fontWeight: 700
            }, children: value.label })
          ] }, value.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 4,
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsxs("span", { style: {
            fontSize: 13,
            fontWeight: 800,
            color: "#e2e8f0"
          }, children: [
            "\u{1F4A1} Momentos Detectados (",
            candidates.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxs("span", { style: {
            fontSize: 11,
            fontWeight: 700,
            color: length > 0 ? "#a78bfa" : "#64748b",
            background: length > 0 ? "rgba(139, 92, 246, 0.15)" : "transparent",
            padding: "2px 8px",
            borderRadius: 12
          }, children: [
            length,
            " seleccionada",
            length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick4, disabled: isGenerating || candidates.length === 0, style: {
          background: "transparent",
          border: "none",
          color: "#818cf8",
          fontSize: 11.5,
          fontWeight: 700,
          cursor: "pointer"
        }, children: candidates.every((item) => item.selected) ? "Deseleccionar Todos" : "Seleccionar Todos" })
      ] }),
      isAnalyzing ? /* @__PURE__ */ jsxs("div", { style: {
        textAlign: "center",
        padding: "30px 0",
        color: "#a5b4fc"
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          display: "inline-block",
          fontSize: 24,
          marginBottom: 8,
          animation: "spin 2s linear infinite"
        }, children: "\u2726" }),
        /* @__PURE__ */ jsx("p", { style: {
          margin: 0,
          fontSize: 13,
          fontWeight: 700
        }, children: "Analizando subt\xEDtulos y detectando momentos visuales..." })
      ] }) : candidates.length === 0 ? /* @__PURE__ */ jsxs("div", { style: {
        textAlign: "center",
        padding: "30px 20px",
        color: "#64748b"
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 28,
          display: "block",
          marginBottom: 8
        }, children: "\u{1F4DD}" }),
        /* @__PURE__ */ jsx("p", { style: {
          margin: 0,
          fontSize: 13,
          fontWeight: 600
        }, children: "No se detectaron frases de subt\xEDtulos en el proyecto. Transcribe o importa subt\xEDtulos en la pista TXT primero." })
      ] }) : /* @__PURE__ */ jsx("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }, children: candidates.map((overlay, index) => /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        gap: 12,
        padding: 12,
        borderRadius: 10,
        border: overlay.selected ? "1px solid rgba(139, 92, 246, 0.4)" : "1px solid rgba(255, 255, 255, 0.05)",
        background: overlay.selected ? "rgba(139, 92, 246, 0.08)" : "rgba(255, 255, 255, 0.015)",
        transition: "all 0.15s"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          paddingTop: 2
        }, children: /* @__PURE__ */ jsx("input", { type: "checkbox", checked: overlay.selected, onChange: () => toggleSelected(overlay.id), disabled: isGenerating, style: {
          width: 17,
          height: 17,
          accentColor: "#8b5cf6",
          cursor: "pointer"
        } }) }),
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 6
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 6
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 6
            }, children: [
              /* @__PURE__ */ jsxs("span", { style: {
                fontSize: 10,
                fontWeight: 800,
                fontFamily: "monospace",
                background: "rgba(0, 0, 0, 0.4)",
                color: "#c4b5fd",
                padding: "2px 6px",
                borderRadius: 4,
                border: "1px solid rgba(139, 92, 246, 0.25)"
              }, children: [
                "\u23F1\uFE0F ",
                overlay.startSeconds,
                "s - ",
                (overlay.startSeconds + overlay.durationSeconds).toFixed(1),
                "s"
              ] }),
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 12,
                fontWeight: 800,
                color: "#fff"
              }, children: overlay.keyword })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 8
            }, children: [
              /* @__PURE__ */ jsxs("select", { value: overlay.suggestedPosition, onChange: (event) => updatePosition(overlay.id, event.target.value), disabled: isGenerating, style: {
                padding: "2px 6px",
                fontSize: 10.5,
                background: "#181d29",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 4,
                color: "#cbd5e1"
              }, children: [
                /* @__PURE__ */ jsx("option", { value: "top-right", children: "\u2197 Sup. Der" }),
                /* @__PURE__ */ jsx("option", { value: "top-left", children: "\u2196 Sup. Izq" }),
                /* @__PURE__ */ jsx("option", { value: "center", children: "\u{1F3AF} Centro" }),
                /* @__PURE__ */ jsx("option", { value: "bottom-right", children: "\u2198 Inf. Der" })
              ] }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontSize: 10.5,
                color: "#94a3b8"
              }, children: [
                Math.round((overlay.suggestedScale || 0.55) * 100),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            fontSize: 11.5,
            fontStyle: "italic",
            color: "#94a3b8",
            background: "rgba(0, 0, 0, 0.25)",
            padding: "4px 8px",
            borderRadius: 4
          }, children: [
            '"',
            overlay.cueText,
            '"'
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("input", { type: "text", value: overlay.concept, onChange: (event) => updateConcept(overlay.id, event.target.value), disabled: isGenerating, placeholder: "Prompt visual en ingl\xE9s...", style: {
            width: "100%",
            padding: "5px 8px",
            fontSize: 11,
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 4,
            color: "#cbd5e1"
          } }) })
        ] })
      ] }, overlay.id || index)) }),
      errorMessage && /* @__PURE__ */ jsxs("div", { style: {
        padding: "8px 12px",
        background: "rgba(239, 68, 68, 0.15)",
        border: "1px solid rgba(239, 68, 68, 0.3)",
        borderRadius: 8,
        color: "#fca5a5",
        fontSize: 12
      }, children: [
        "\u26A0\uFE0F ",
        errorMessage
      ] }),
      isGenerating && /* @__PURE__ */ jsxs("div", { style: {
        padding: 12,
        borderRadius: 10,
        background: "rgba(139, 92, 246, 0.1)",
        border: "1px solid rgba(139, 92, 246, 0.3)",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          fontWeight: 700
        }, children: [
          /* @__PURE__ */ jsxs("span", { style: {
            color: "#c4b5fd"
          }, children: [
            "Generando con IA (",
            progress.done + 1,
            " de ",
            progress.total,
            "): ",
            progress.current,
            "..."
          ] }),
          /* @__PURE__ */ jsxs("span", { style: {
            fontFamily: "monospace",
            color: "#818cf8"
          }, children: [
            Math.round(progress.done / Math.max(1, progress.total) * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          height: 6,
          background: "rgba(0, 0, 0, 0.4)",
          borderRadius: 3,
          overflow: "hidden"
        }, children: /* @__PURE__ */ jsx("div", { style: {
          height: "100%",
          width: Math.round(progress.done / Math.max(1, progress.total) * 100) + "%",
          background: "linear-gradient(90deg, #8b5cf6, #c084fc)",
          transition: "width 0.3s ease"
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "14px 22px",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(255, 255, 255, 0.015)"
    }, children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, disabled: isGenerating, style: {
        padding: "7px 14px",
        background: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 6,
        color: "#cbd5e1",
        fontSize: 12,
        fontWeight: 700,
        cursor: isGenerating ? "not-allowed" : "pointer"
      }, children: "Cancelar" }),
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: handleClick5, disabled: isGenerating || length === 0, style: {
        padding: "8px 18px",
        background: length === 0 || isGenerating ? "rgba(139, 92, 246, 0.2)" : "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        border: "none",
        borderRadius: 8,
        color: length === 0 || isGenerating ? "#94a3b8" : "#fff",
        fontSize: 13,
        fontWeight: 800,
        cursor: length === 0 || isGenerating ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: length > 0 && !isGenerating ? "0 4px 15px rgba(139, 92, 246, 0.35)" : "none"
      }, children: [
        /* @__PURE__ */ jsx("span", { children: "\u2728" }),
        /* @__PURE__ */ jsx("span", { children: isGenerating ? "Generando (" + (progress.done + 1) + "/" + progress.total + ")..." : "Generar " + length + " Superposici" + (length === 1 ? "\xF3n" : "ones") + " en Pista V2" })
      ] })
    ] })
  ] }) });
};
const je = 56;
const Ht = 96;
const Nt = 0.5;
const Gt = 200;
const nr = 3;
const rr = (pixelsPerSecond) => [0.2, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 1200].find((item) => item * pixelsPerSecond >= 68) || 1200;
const Zt = ({
  scenes,
  fps,
  durationInFrames,
  selectedId,
  playerRef,
  onSelectScene,
  audioTrack,
  musicTrack,
  captionTrack,
  onUploadAudio,
  onUploadMusic,
  onImportSrt,
  onTranscribeAudio,
  onCreateScenesFromTranscript,
  onOpenBatchPromptsModal,
  onUploadImage
}) => {
  var cues6;
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [pixelsPerSecond, setPixelsPerSecond] = React.useState(65);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [fitToWidthPending, setFitToWidthPending] = React.useState(false);
  const [resizingSceneId, setResizingSceneId] = React.useState(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = React.useState(false);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const [highQualityPreview, setHighQualityPreview] = React.useState(false);
  const [isPreviewMuted, setIsPreviewMuted] = React.useState(false);
  const [collapsedTracks, setCollapsedTracks] = React.useState({
    v2: false,
    v1: false,
    cc: false,
    fx: false,
    a1: false,
    a2: false
  });
  const [dragSourceIndex, setDragSourceIndex] = React.useState(null);
  const [dragOverIndex, setDragOverIndex] = React.useState(null);
  const [unusedState1, setUnusedState1] = React.useState(null);
  const [isCaptionDragOver, setIsCaptionDragOver] = React.useState(false);
  const [isAudioDragOver, setIsAudioDragOver] = React.useState(false);
  const [isMusicDragOver, setIsMusicDragOver] = React.useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);
  const divRef2 = React.useRef(null);
  const inputRef2 = React.useRef(null);
  const [uploadTargetSceneId, setUploadTargetSceneId] = React.useState(null);
  const triggerImageUpload = (selectedId2) => {
    setUploadTargetSceneId(selectedId2 || selectedId);
    if (selectedId2) {
      if (onSelectScene != null) {
        onSelectScene(selectedId2);
      }
    }
    setTimeout(() => {
      var current;
      if ((current = inputRef2.current) != null) {
        current.click();
      }
    }, 10);
  };
  const handleChange2 = (event) => {
    var files;
    var firstScene;
    const file = (files = event.target.files) == null ? void 0 : files[0];
    if (file) {
      const id = uploadTargetSceneId || selectedId || ((firstScene = items28[0]) == null ? void 0 : firstScene.id);
      if (onUploadImage) {
        onUploadImage(id, file);
      }
    }
    event.target.value = "";
  };
  const ref = React.useRef(false);
  const divRef3 = React.useRef(null);
  const updateScene = w((state) => state.updateScene);
  const updateProject = w((state) => state.updateProject);
  const addSceneAt = w((state) => state.addSceneAt);
  const removeScene = w((state) => state.removeScene);
  const duplicateScene = w((state) => state.duplicateScene);
  const reorderScenes = w((state) => state.reorderScenes);
  const splitScene = w((state) => state.splitScene);
  const handleClick6 = w((state) => state.removeAudioTrack);
  const handleClick7 = w((state) => state.removeMusicTrack);
  const handleClick8 = w((state) => state.clearCaptions);
  const handleClick9 = w((state) => state.syncScenesToCaptions);
  const assetState = w((state) => state.assetState);
  const handleClick10 = w((state) => state.undo);
  const handleClick11 = w((state) => state.redo);
  const canUndo = w((state) => {
    var past;
    return (((past = state.past) == null ? void 0 : past.length) || 0) > 0;
  });
  const canRedo = w((state) => {
    var future;
    return (((future = state.future) == null ? void 0 : future.length) || 0) > 0;
  });
  const isTranscribing = assetState.operation === "transcription" && assetState.status === "loading";
  const overlays = w((state) => {
    var project;
    return ((project = state.project) == null ? void 0 : project.overlays) || [];
  });
  const addOverlay = w((state) => state.addOverlay);
  const removeOverlay = w((state) => state.removeOverlay);
  const [selectedOverlayId, setSelectedOverlayId] = React.useState(null);
  const [isAiOverlayModalOpen, setIsAiOverlayModalOpen] = React.useState(false);
  const inputRef3 = React.useRef(null);
  const handleChange3 = async (event) => {
    var files;
    const file = (files = event.target.files) == null ? void 0 : files[0];
    if (file) {
      try {
        const headers = {
          "Content-Type": file.type || "application/octet-stream",
          "x-filename": encodeURIComponent(file.name)
        };
        const response = await fetch("http://127.0.0.1:4322/api/import", {
          method: "POST",
          headers,
          body: file
        }).catch(() => fetch("/api/import", {
          method: "POST",
          headers,
          body: file
        }));
        const data = await response.json();
        if (response.ok && data != null && data.url) {
          const value = Math.max(0, currentFrame / (fps || 30));
          const newOverlay = {
            id: "ov_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
            name: file.name.replace(/\.[^.]+$/, ""),
            imageUrl: data.url,
            scale: 0.6,
            position: "top-right",
            posX: 78,
            posY: 20,
            startSeconds: Number(value.toFixed(2)),
            durationSeconds: 3,
            animation: "pop"
          };
          addOverlay(newOverlay);
          setSelectedOverlayId(newOverlay.id);
        }
      } catch (error) {
        console.error("Error al importar imagen para overlay:", error);
      } finally {
        if (event.target) {
          event.target.value = "";
        }
      }
    }
  };
  React.useEffect(() => {
    const handleWindowClick = () => setContextMenu(null);
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);
  React.useLayoutEffect(() => {
    if (!contextMenu || !divRef2.current) {
      return;
    }
    const current = divRef2.current;
    const rect = current.getBoundingClientRect();
    const margin = 10;
    if (rect.bottom > window.innerHeight - margin) {
      const value = Math.max(margin, window.innerHeight - rect.height - margin);
      current.style.top = value + "px";
    }
    if (rect.right > window.innerWidth - margin) {
      const value = Math.max(margin, window.innerWidth - rect.width - margin);
      current.style.left = value + "px";
    }
  }, [contextMenu]);
  const handleContextMenu = (event, id, index) => {
    event.preventDefault();
    event.stopPropagation();
    const menuHeight = 360;
    const menuWidth = 230;
    const margin = 10;
    let clientX = event.clientX;
    let clientY = event.clientY;
    if (clientY + menuHeight > window.innerHeight - margin) {
      clientY = Math.max(margin, event.clientY - menuHeight);
    }
    if (clientX + menuWidth > window.innerWidth - margin) {
      clientX = Math.max(margin, window.innerWidth - menuWidth - margin);
    }
    setContextMenu({
      x: clientX,
      y: clientY,
      sceneId: id,
      sceneIdx: index
    });
  };
  const revealInFolder = async (sceneId) => {
    var electronAPI;
    var revealMediaInFolder;
    const found = items28.find((item) => item.id === sceneId);
    const videoUrl = (found == null ? void 0 : found.videoUrl) || (found == null ? void 0 : found.imageUrl) || "";
    if (!videoUrl) {
      return;
    }
    const result = await ((revealMediaInFolder = (electronAPI = window.electronAPI) == null ? void 0 : electronAPI.revealMediaInFolder) == null ? void 0 : revealMediaInFolder.call(electronAPI, videoUrl));
    if (result == null || !result.ok) {
      window.alert((result == null ? void 0 : result.error) || "Solo los recursos guardados localmente pueden abrirse en carpeta.");
    }
    setContextMenu(null);
  };
  const items28 = Array.isArray(scenes) ? scenes : [];
  const value73 = Number(fps) || 30;
  const value74 = Math.max(1, Number(durationInFrames) || 120);
  const timelineEntries = React.useMemo(() => Ga(items28, value73), [items28, value73]);
  const value75 = Math.max(0.5, value74 / value73);
  const value76 = Math.max(Nt, Number(pixelsPerSecond) || 65);
  const value77 = Math.max(160, containerWidth - je - Ht);
  const value78 = Math.max(value77, value75 * value76);
  const step = rr(value76);
  const value79 = Math.max(1, Math.min(2e3, Math.floor(value75 / step) + 1));
  const items29 = React.useMemo(() => Array.from({
    length: value79
  }, (unusedIndex, index) => index * step), [value79, step]);
  const cues7 = (cues6 = captionTrack == null ? void 0 : captionTrack.cues) != null && cues6.length ? captionTrack.cues : timelineEntries.filter((item) => item.scene.caption).map((filter) => ({
    id: filter.scene.id,
    text: filter.scene.caption,
    startMs: filter.startSeconds * 1e3,
    endMs: (filter.startSeconds + filter.durationSeconds) * 1e3
  }));
  React.useEffect(() => {
    const current = playerRef.current;
    if (!current) {
      return;
    }
    const handleFrameUpdate = (state) => setCurrentFrame(Math.max(0, Math.min(durationInFrames - 1, state.detail.frame)));
    current.addEventListener("frameupdate", handleFrameUpdate);
    current.addEventListener("seeked", handleFrameUpdate);
    setCurrentFrame(current.getCurrentFrame());
    return () => {
      current.removeEventListener("frameupdate", handleFrameUpdate);
      current.removeEventListener("seeked", handleFrameUpdate);
    };
  }, [durationInFrames, playerRef]);
  const value80 = React.useCallback((width) => {
    const value81 = Math.max(160, width - je - Ht);
    return Math.max(Nt, Math.min(Gt, value81 / Math.max(0.5, value75)));
  }, [value75]);
  React.useEffect(() => {
    const current = divRef3.current;
    if (!current) {
      return;
    }
    const handleResize = () => setContainerWidth(current.clientWidth);
    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(current);
    return () => observer.disconnect();
  }, []);
  React.useEffect(() => {
    if (fitToWidthPending && containerWidth > 0) {
      setPixelsPerSecond(value80(containerWidth));
    }
  }, [fitToWidthPending, value80, containerWidth]);
  const handleClick12 = () => {
    const current = divRef3.current;
    if (current) {
      setFitToWidthPending(true);
      setPixelsPerSecond(value80(current.clientWidth));
      requestAnimationFrame(() => current.scrollTo({
        left: 0,
        behavior: "auto"
      }));
    }
  };
  const setZoomKeepingAnchor = (callback, number = null) => {
    const current = divRef3.current;
    const currentPxPerSec = value76;
    const currentTimeSeconds = currentFrame / value73;
    const anchorTime = number !== null ? number : currentTimeSeconds;
    let anchorOffset = current ? current.clientWidth / 2 - je : 0;
    if (current) {
      const anchorPixel = anchorTime * currentPxPerSec - current.scrollLeft;
      if (anchorPixel >= 0 && anchorPixel <= current.clientWidth - je) {
        anchorOffset = anchorPixel;
      }
    }
    setFitToWidthPending(false);
    setPixelsPerSecond((prev) => {
      const nextValue = typeof callback == "function" ? callback(prev) : callback;
      const value = Math.max(Nt, Math.min(Gt, Number(nextValue) || 65));
      if (current) {
        requestAnimationFrame(() => {
          const newScrollLeft = anchorTime * value;
          current.scrollLeft = Math.max(0, newScrollLeft - anchorOffset);
        });
      }
      return value;
    });
  };
  const handleWheel = (event) => {
    const current = divRef3.current;
    if (current) {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        const rect = current.getBoundingClientRect();
        const offsetX = event.clientX - rect.left + current.scrollLeft - je;
        const value82 = Math.max(0, Math.min(value75, offsetX / value76));
        const zoomFactor = event.deltaY < 0 ? 1.18 : 0.85;
        setZoomKeepingAnchor((prev) => prev * zoomFactor, value82);
        return;
      }
      if (Math.abs(event.deltaX) > 0) {
        current.scrollLeft += event.deltaX;
        return;
      }
      if (event.shiftKey || Math.abs(event.deltaY) > 0) {
        event.preventDefault();
        current.scrollLeft += event.deltaY;
      }
    }
  };
  const handleMouseDown2 = React.useCallback((event) => {
    const current = divRef3.current;
    if (!current || !playerRef.current) {
      return;
    }
    const rect = current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left + current.scrollLeft - je;
    let value83 = Math.max(0, Math.min(value75, offsetX / value76));
    if (snapEnabled) {
      const items = [0, value75, ...timelineEntries.flatMap((overlay) => [overlay.startSeconds, overlay.startSeconds + overlay.durationSeconds])];
      const total = items.reduce((acc, item) => Math.abs(item - value83) < Math.abs(acc - value83) ? item : acc, items[0]);
      if (Math.abs(total - value83) <= Math.max(0.08, 8 / value76)) {
        value83 = total;
      }
    }
    const value84 = Math.round(value83 * value73);
    playerRef.current.seekTo(value84);
    setCurrentFrame(value84);
  }, [value76, playerRef, value73, timelineEntries, snapEnabled, value75]);
  const handleMouseDown3 = (event) => {
    event.preventDefault();
    ref.current = true;
    handleMouseDown2(event);
    const handleMouseMove = (event2) => {
      if (ref.current) {
        handleMouseDown2(event2);
      }
    };
    const handleMouseUp = () => {
      ref.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleResizeStart = (event, id, duration) => {
    event.stopPropagation();
    setResizingSceneId(id);
    const found = timelineEntries.find((item) => item.scene.id === id);
    const startSeconds = found ? found.startSeconds : 0;
    const currentTimeSeconds = currentFrame / value73;
    const items = [];
    if (snapEnabled) {
      items.push(currentTimeSeconds);
      if (audioTrack != null && audioTrack.duration) {
        items.push(Number(audioTrack.duration));
      }
      if (Array.isArray(cues7)) {
        cues7.forEach((cue) => {
          if (typeof cue.startMs == "number") {
            items.push(cue.startMs / 1e3);
          }
          if (typeof cue.endMs == "number") {
            items.push(cue.endMs / 1e3);
          }
        });
      }
    }
    const handleResizeMove = (event2) => {
      const deltaSeconds = (event2.clientX - event.clientX) / value76;
      let value85 = Math.max(0.5, Math.min(600, Number((duration + deltaSeconds).toFixed(1))));
      if (snapEnabled && items.length > 0) {
        const candidateEndTime = startSeconds + value85;
        const value86 = Math.max(0.08, 10 / value76);
        let snapTarget = null;
        let snapDistance = value86;
        for (const item of items) {
          const value = Math.abs(item - candidateEndTime);
          if (value < snapDistance) {
            snapDistance = value;
            snapTarget = item;
          }
        }
        if (snapTarget !== null) {
          const snappedDuration = snapTarget - startSeconds;
          if (snappedDuration >= 0.5 && snappedDuration <= 600) {
            value85 = Number(snappedDuration.toFixed(1));
          }
        }
      }
      updateScene(id, {
        duration: value85
      });
    };
    const handleResizeEnd = () => {
      setResizingSceneId(null);
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener("mouseup", handleResizeEnd);
  };
  const playheadPixel = currentFrame / value73 * value76;
  const toggleTrackCollapsed = (trackKey) => {
    setCollapsedTracks((prev) => ({
      ...prev,
      [trackKey]: !prev[trackKey]
    }));
  };
  const handleClick13 = () => {
    var current4;
    var mute;
    var current5;
    var unmute;
    const nextMuted = !isPreviewMuted;
    setIsPreviewMuted(nextMuted);
    if (nextMuted) {
      if ((mute = (current4 = playerRef.current) == null ? void 0 : current4.mute) != null) {
        mute.call(current4);
      }
    } else if ((unmute = (current5 = playerRef.current) == null ? void 0 : current5.unmute) != null) {
      unmute.call(current5);
    }
  };
  const handleClick14 = () => {
    const found = timelineEntries.find((item) => item.scene.id === selectedId);
    if (!found) {
      return;
    }
    const relativeTime = currentFrame / value73 - found.startSeconds;
    const splitRatio = relativeTime > 0 && relativeTime < found.durationSeconds ? relativeTime / found.durationSeconds : 0.5;
    splitScene(found.scene.id, Math.max(0.12, Math.min(0.88, splitRatio)));
  };
  items28.filter((item) => item.motion && item.motion !== "still").length;
  return /* @__PURE__ */ jsxs("div", { className: "horizontal-timeline-container", children: [
    /* @__PURE__ */ jsx("input", { type: "file", ref: inputRef2, accept: "image/*,video/*,.mp4,.webm,.mov,.m4v,.mkv,.png,.jpg,.jpeg,.webp", style: {
      display: "none"
    }, onChange: handleChange2 }),
    /* @__PURE__ */ jsxs("div", { className: "timeline-toolbar-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "timeline-edit-tools", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: "timeline-icon-btn timeline-tool-labeled", onClick: handleClick10, disabled: !canUndo, title: "Deshacer (Ctrl+Z)", children: [
          /* @__PURE__ */ jsx("span", { children: "\u21B6" }),
          "Deshacer"
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", className: "timeline-icon-btn timeline-tool-labeled", onClick: handleClick11, disabled: !canRedo, title: "Rehacer (Ctrl+Y)", children: [
          /* @__PURE__ */ jsx("span", { children: "\u21B7" }),
          "Rehacer"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "timeline-toolbar-divider" }),
        /* @__PURE__ */ jsxs("button", { type: "button", className: "timeline-icon-btn timeline-tool-labeled", onClick: handleClick14, disabled: !selectedId, title: "Dividir la escena seleccionada en el cabezal (S)", children: [
          /* @__PURE__ */ jsx("span", { children: "\u2702" }),
          "Cortar"
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", className: "timeline-icon-btn timeline-tool-labeled", onClick: () => triggerImageUpload(selectedId), disabled: !selectedId, title: "Reemplazar imagen o video de la escena seleccionada con un archivo de tu PC", children: [
          /* @__PURE__ */ jsx("span", { children: "\u{1F4C1}" }),
          "Reemplazar"
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", className: "timeline-icon-btn timeline-tool-labeled danger", onClick: () => selectedId && removeScene(selectedId), disabled: !selectedId || scenes.length <= 1, title: "Eliminar escena seleccionada", children: [
          /* @__PURE__ */ jsx("span", { children: "\xD7" }),
          "Eliminar"
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "timeline-icon-btn timeline-tool-labeled " + (isPreviewMuted ? "active" : ""), onClick: handleClick13, title: isPreviewMuted ? "Activar audio del preview" : "Silenciar preview", children: isPreviewMuted ? "Activar audio" : "Silenciar" }),
        /* @__PURE__ */ jsx("span", { className: "timeline-toolbar-divider" }),
        /* @__PURE__ */ jsxs("label", { className: "timeline-quality-toggle", title: "Priorizar nitidez del preview", children: [
          /* @__PURE__ */ jsx("span", { children: "Calidad original" }),
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: highQualityPreview, onChange: (event) => setHighQualityPreview(event.target.checked) }),
          /* @__PURE__ */ jsx("i", {})
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "timeline-time-display", children: [
        /* @__PURE__ */ jsx("strong", { children: Lt(currentFrame / value73) }),
        /* @__PURE__ */ jsx("span", { children: "/" }),
        /* @__PURE__ */ jsx("span", { children: Lt(value75) }),
        /* @__PURE__ */ jsxs("b", { children: [
          value73,
          " fps"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "timeline-toolbar-right", children: [
        /* @__PURE__ */ jsx("button", { className: "tb-btn timeline-secondary-action", onClick: () => setIsSyncModalOpen(true), title: "Alinear desfase (delay), estirar o recortar tiempos exactos", children: "Sincronizar subt\xEDtulos" }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "timeline-icon-btn timeline-tool-labeled magnet " + (snapEnabled ? "active" : ""), onClick: () => setSnapEnabled((prev) => !prev), title: snapEnabled ? "Ajuste magn\xE9tico activo" : "Activar ajuste magn\xE9tico", children: "Im\xE1n" }),
        /* @__PURE__ */ jsxs("div", { className: "zoom-controls", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setZoomKeepingAnchor((prev) => prev - Math.max(1, prev * 0.2)), title: "Alejar zoom", children: "\u2212" }),
          /* @__PURE__ */ jsx("input", { type: "range", min: Nt, max: Gt, step: "0.5", value: pixelsPerSecond, onChange: (event) => setZoomKeepingAnchor(Number(event.target.value)), className: "zoom-slider", "aria-label": "Zoom de la l\xEDnea de tiempo" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setZoomKeepingAnchor((prev) => prev + Math.max(1, prev * 0.2)), title: "Acercar zoom", children: "\uFF0B" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick12, className: "tb-btn-sm timeline-fit-button " + (fitToWidthPending ? "active" : ""), title: "Ver todas las escenas dentro del ancho disponible", children: "Ver todo" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "timeline-scroll-area", ref: divRef3, onMouseDown: handleMouseDown2, onWheel: handleWheel, children: /* @__PURE__ */ jsxs("div", { className: "timeline-canvas", style: {
      width: je + value78 + Ht
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "timeline-ruler-track", children: [
        /* @__PURE__ */ jsx("div", { className: "track-label ruler-label", style: {
          width: je,
          minWidth: je,
          maxWidth: je
        }, title: "L\xEDnea de tiempo", children: /* @__PURE__ */ jsx("span", { children: "\u23F1\uFE0F" }) }),
        /* @__PURE__ */ jsx("div", { className: "ruler-ticks-area", style: {
          width: value78
        }, children: items29.map((item) => /* @__PURE__ */ jsx("div", { className: "ruler-tick", style: {
          left: item * value76
        }, children: /* @__PURE__ */ jsx("span", { className: "tick-label", children: Lt(item) }) }, item)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "timeline-row overlay-track-row " + (collapsedTracks.v2 ? "collapsed" : ""), children: [
        /* @__PURE__ */ jsxs("div", { className: "track-label layer-label", style: {
          width: je,
          minWidth: je,
          maxWidth: je
        }, title: "Pista V2: Superposiciones / Stickers / Overlays", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onMouseDown: (event) => event.stopPropagation(), onClick: () => toggleTrackCollapsed("v2"), children: collapsedTracks.v2 ? "\u203A" : "\u2304" }),
          /* @__PURE__ */ jsx("span", { className: "track-badge-pill track-badge-v2", children: "V2" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "track-content", style: {
          width: value78
        }, children: !collapsedTracks.v2 && overlays.length > 0 ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          overlays.map((overlay) => {
            const value87 = Math.max(0, (Number(overlay.startSeconds) || 0) * value76);
            const value88 = Math.max(36, (Number(overlay.durationSeconds) || 3) * value76);
            const isSelected = selectedOverlayId === overlay.id;
            const value89 = Math.round(Number(overlay.scale !== void 0 ? overlay.scale : 0.6) * 100);
            return /* @__PURE__ */ jsxs("div", { className: "timeline-overlay-block " + (isSelected ? "selected" : ""), style: {
              left: value87,
              width: value88
            }, onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
              event.stopPropagation();
              setSelectedOverlayId(overlay.id);
            }, title: (overlay.name || "Superposici\xF3n") + " (" + overlay.startSeconds + "s - " + (overlay.startSeconds + overlay.durationSeconds).toFixed(1) + "s) \u2022 Escala: " + value89 + "% \u2022 Clic para configurar tama\xF1o, posici\xF3n y subt\xEDtulo", children: [
              overlay.imageUrl ? /* @__PURE__ */ jsx("img", { src: overlay.imageUrl, alt: "", className: "timeline-overlay-thumb" }) : /* @__PURE__ */ jsx("span", { className: "timeline-overlay-icon", children: "\u{1F5BC}\uFE0F" }),
              /* @__PURE__ */ jsx("span", { className: "timeline-overlay-title", children: overlay.name || "Overlay" }),
              /* @__PURE__ */ jsxs("span", { className: "timeline-overlay-badge", children: [
                value89,
                "%"
              ] }),
              /* @__PURE__ */ jsx("button", { type: "button", className: "timeline-overlay-delete-btn", title: "Eliminar superposici\xF3n", onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
                event.stopPropagation();
                removeOverlay(overlay.id);
              }, children: "\u2715" })
            ] }, overlay.id);
          }),
          /* @__PURE__ */ jsxs("div", { className: "overlay-track-actions", style: {
            left: value75 * value76 + 10
          }, onMouseDown: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ jsxs("label", { className: "track-action-chip overlay-add-chip", title: "Agregar otra imagen superpuesta desde tu PC", children: [
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", style: {
                display: "none"
              }, onChange: handleChange3 }),
              "+ Imagen"
            ] }),
            cues7.length > 0 ? /* @__PURE__ */ jsx("button", { type: "button", className: "track-action-chip overlay-ai-chip", onClick: () => setIsAiOverlayModalOpen(true), title: "Generar superposiciones inteligentes con IA basadas en los subt\xEDtulos", children: "\u2728 Generar con IA" }) : null
          ] })
        ] }) : collapsedTracks.v2 ? null : /* @__PURE__ */ jsxs("div", { className: "timeline-v2-empty-state", onMouseDown: (event) => event.stopPropagation(), children: [
          /* @__PURE__ */ jsxs("label", { className: "timeline-track-upload-btn overlay-btn", title: "Subir imagen superpuesta (overlay) sobre el video", children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", style: {
              display: "none"
            }, onChange: handleChange3 }),
            /* @__PURE__ */ jsx("span", { children: "+ Agregar Imagen Superpuesta (Overlay)" })
          ] }),
          cues7.length > 0 ? /* @__PURE__ */ jsx("button", { type: "button", className: "timeline-track-upload-btn overlay-ai-btn", onClick: () => setIsAiOverlayModalOpen(true), title: "Analizar subt\xEDtulos SRT y generar superposiciones con IA sobre el video", children: /* @__PURE__ */ jsx("span", { children: "\u2728 Generar con IA desde Subt\xEDtulos" }) }) : null,
          /* @__PURE__ */ jsx("span", { className: "timeline-lane-hint", children: "Superposiciones sincronizadas con subt\xEDtulos o en segundo exacto" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "timeline-row scene-track-row " + (collapsedTracks.v1 ? "collapsed" : ""), children: [
        /* @__PURE__ */ jsxs("div", { className: "track-label scene-label", style: {
          width: je,
          minWidth: je,
          maxWidth: je
        }, title: "Pista V1: Video principal (" + scenes.length + " escenas)", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onMouseDown: (event) => event.stopPropagation(), onClick: () => toggleTrackCollapsed("v1"), children: collapsedTracks.v1 ? "\u203A" : "\u2304" }),
          /* @__PURE__ */ jsx("span", { className: "track-badge-pill track-badge-v1", children: "V1" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "track-content", style: {
          width: value78
        }, children: [
          !collapsedTracks.v1 && timelineEntries.map((overlay, index) => {
            const isSelected = overlay.scene.id === selectedId;
            const value90 = Math.max(3, overlay.durationSeconds * value76 - nr);
            const blockLeft = overlay.startSeconds * value76;
            const scene = overlay.scene;
            const videoUrl = scene.videoUrl || scene.flowVideoUrl || "";
            const hasMedia = !!scene.imageUrl || !!videoUrl;
            const density = value90 < 34 ? "micro" : value90 < 96 ? "compact" : "normal";
            const title = density === "compact" ? "Escena " + (index + 1) : scene.title;
            return /* @__PURE__ */ jsx("div", { className: "timeline-scene-block density-" + density + " " + (isSelected ? "selected" : "") + " " + (scene.status === "failed" ? "failed" : "") + " " + (scene.status === "image-generating" || scene.status === "video-generating" ? "generating" : ""), draggable: true, onDragStart: (event) => {
              setDragSourceIndex(index);
              event.dataTransfer.effectAllowed = "move";
              const element = document.createElement("div");
              element.style.width = "100px";
              element.style.height = "40px";
              element.style.background = "var(--accent)";
              element.style.opacity = "0.5";
              element.style.borderRadius = "8px";
              document.body.appendChild(element);
              event.dataTransfer.setDragImage(element, 50, 20);
              setTimeout(() => document.body.removeChild(element), 0);
            }, onDragOver: (event) => {
              event.preventDefault();
              if (dragSourceIndex !== null && dragSourceIndex !== index) {
                setDragOverIndex(index);
              }
            }, onDragLeave: () => setDragOverIndex(null), onDrop: (event) => {
              event.preventDefault();
              if (dragSourceIndex !== null && dragOverIndex !== null && dragSourceIndex !== dragOverIndex) {
                reorderScenes(dragSourceIndex, dragOverIndex);
              }
              setDragSourceIndex(null);
              setDragOverIndex(null);
            }, onContextMenu: (event) => handleContextMenu(event, scene.id, index), style: {
              left: blockLeft,
              width: value90,
              border: dragOverIndex === index ? "2px solid var(--accent)" : void 0,
              transform: dragSourceIndex === index ? "scale(0.98)" : "none",
              opacity: dragSourceIndex === index ? 0.7 : 1,
              transition: "transform 150ms ease, opacity 150ms ease"
            }, onClick: (event) => {
              event.stopPropagation();
              onSelectScene(scene.id);
            }, children: density === "micro" ? /* @__PURE__ */ jsx("div", { style: {
              width: "100%",
              height: "100%",
              background: isSelected ? "#818cf8" : hasMedia ? videoUrl ? "rgba(99, 102, 241, 0.65)" : "rgba(59, 130, 246, 0.65)" : "rgba(255, 255, 255, 0.08)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none"
            }, title: index + 1 + ". " + scene.title + " (" + scene.duration + "s)" }) : /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "scene-block-header", children: [
                /* @__PURE__ */ jsx("span", { className: "scene-num-badge", children: index + 1 }),
                /* @__PURE__ */ jsx("span", { className: "scene-block-title", title: scene.title, children: title }),
                videoUrl ? /* @__PURE__ */ jsx("button", { type: "button", className: "scene-audio-toggle " + (scene.muted ? "is-muted" : "is-audible"), onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
                  event.stopPropagation();
                  updateScene(scene.id, {
                    muted: !scene.muted
                  });
                }, title: scene.muted ? "\u{1F507} Audio silenciado (Clic para activar sonido)" : "\u{1F50A} Audio activo (" + Math.round((scene.videoVolume ?? 1) * 100) + "%) (Clic para silenciar)", children: scene.muted ? "\u{1F507}" : "\u{1F50A}" }) : null,
                /* @__PURE__ */ jsx("span", { className: "scene-clip-type", title: videoUrl ? "Clip de video" : hasMedia ? "Imagen de escena" : "Escena vac\xEDa", children: videoUrl ? "\u25B8" : hasMedia ? "\u25A7" : "\xB7" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "scene-block-body", children: [
                videoUrl ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsx("video", { src: videoUrl, muted: true, playsInline: true, preload: "metadata", poster: scene.imageUrl || void 0, className: "scene-block-img", "aria-label": "Video de " + scene.title, onLoadedMetadata: (event) => {
                    try {
                      event.target.currentTime = Math.min(0.5, (event.target.duration || 1) / 2);
                    } catch {
                    }
                  }, onError: (event) => {
                    event.currentTarget.style.display = "none";
                  } }),
                  /* @__PURE__ */ jsx("span", { className: "scene-video-indicator", style: {
                    position: "absolute",
                    bottom: 4,
                    left: 4,
                    background: "rgba(15, 23, 42, 0.88)",
                    border: "1px solid rgba(56, 189, 248, 0.6)",
                    color: "#38bdf8",
                    padding: "1px 5px",
                    borderRadius: "4px",
                    fontSize: "9px",
                    fontWeight: "800",
                    letterSpacing: "0.5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    zIndex: 2,
                    pointerEvents: "none"
                  }, children: "\u{1F3AC} VIDEO" })
                ] }) : scene.imageUrl ? /* @__PURE__ */ jsx("img", { src: scene.imageUrl, alt: scene.title, loading: "lazy", className: "scene-block-img" }) : /* @__PURE__ */ jsx("div", { className: "scene-block-placeholder", children: /* @__PURE__ */ jsxs("div", { className: "placeholder-content", children: [
                  /* @__PURE__ */ jsx("span", { className: "placeholder-icon", children: "\u{1F3AC}" }),
                  /* @__PURE__ */ jsx("span", { className: "placeholder-label", children: "Sin imagen" })
                ] }) }),
                /* @__PURE__ */ jsx("span", { className: "scene-status-dot " + (hasMedia ? "ready" : "idle"), title: hasMedia ? videoUrl ? "Video listo" : "Imagen lista" : "Sin generar" })
              ] }),
              density === "normal" && /* @__PURE__ */ jsxs("div", { className: "scene-block-actions", onMouseDown: (event) => event.stopPropagation(), onClick: (event) => event.stopPropagation(), children: [
                /* @__PURE__ */ jsx("button", { type: "button", onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
                  event.stopPropagation();
                  window.dispatchEvent(new CustomEvent("flowtube:regenerate-scene", {
                    detail: {
                      sceneId: scene.id
                    }
                  }));
                }, title: "Regenerar imagen con IA (Prompt individual)", children: "\u26A1" }),
                /* @__PURE__ */ jsx("button", { type: "button", onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
                  event.stopPropagation();
                  triggerImageUpload(scene.id);
                }, title: "Reemplazar imagen/video de esta escena desde tu PC", children: "\u{1F4C1}" }),
                /* @__PURE__ */ jsx("button", { type: "button", onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
                  event.stopPropagation();
                  duplicateScene(scene.id);
                }, title: "Duplicar escena", children: "\u{1F4D1}" }),
                scenes.length > 1 ? /* @__PURE__ */ jsx("button", { type: "button", className: "del-btn", onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
                  event.stopPropagation();
                  removeScene(scene.id);
                }, title: "Eliminar escena", children: "\xD7" }) : null
              ] }),
              /* @__PURE__ */ jsx("div", { className: "scene-resize-handle", onMouseDown: (event) => handleResizeStart(event, scene.id, scene.duration), title: "Arrastra para cambiar la duraci\xF3n de la escena al tiempo exacto" })
            ] }) }, scene.id);
          }),
          collapsedTracks.v1 ? null : /* @__PURE__ */ jsx("button", { className: "timeline-add-scene-btn", style: {
            left: value75 * value76 + 10
          }, onClick: (event) => {
            event.stopPropagation();
            addSceneAt();
          }, title: "A\xF1adir nueva escena al final", children: "+ Escena" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "timeline-row caption-track-row " + (collapsedTracks.cc ? "collapsed" : "") + " " + (isCaptionDragOver ? "is-drag-over" : ""), onDragOver: (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsCaptionDragOver(true);
      }, onDragLeave: (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsCaptionDragOver(false);
      }, onDrop: (event) => {
        var dataTransfer;
        event.preventDefault();
        event.stopPropagation();
        setIsCaptionDragOver(false);
        const from = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).find((from2) => {
          const name = (from2.name || "").toLowerCase();
          return name.endsWith(".srt") || name.endsWith(".vtt") || name.endsWith(".json");
        });
        if (from) {
          if (onImportSrt != null) {
            onImportSrt(from);
          }
        }
      }, style: {
        background: isCaptionDragOver ? "rgba(99, 102, 241, 0.18)" : void 0,
        outline: isCaptionDragOver ? "2px dashed var(--accent, #6366f1)" : void 0
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "track-label caption-label", style: {
          width: je,
          minWidth: je,
          maxWidth: je
        }, title: "Pista TXT: Subt\xEDtulos", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onMouseDown: (event) => event.stopPropagation(), onClick: () => toggleTrackCollapsed("cc"), children: collapsedTracks.cc ? "\u203A" : "\u2304" }),
          /* @__PURE__ */ jsx("span", { className: "track-badge-pill track-badge-cc", children: "TXT" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "track-content", style: {
          width: value78
        }, children: isCaptionDragOver ? /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          alignItems: "center",
          height: "100%",
          paddingLeft: 12,
          color: "#a5b4fc",
          fontWeight: 800,
          fontSize: 12
        }, children: "\u{1F4C4} Suelta tu archivo de subt\xEDtulos (.SRT / .VTT / .JSON) aqu\xED" }) : !collapsedTracks.cc && cues7.length > 0 ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          cues7.map((cue, index) => {
            const cueStart = (Number(cue.startMs) || 0) / 1e3;
            const cueEnd = (Number(cue.endMs) || 0) / 1e3;
            const value91 = Math.max(0.2, cueEnd - cueStart);
            return /* @__PURE__ */ jsx("div", { className: "timeline-cue-block", onMouseDown: (event) => event.stopPropagation(), style: {
              left: cueStart * value76,
              width: Math.max(3, value91 * value76 - 2)
            }, title: cue.text, children: /* @__PURE__ */ jsx("span", { children: cue.text }) }, cue.id || index);
          }),
          /* @__PURE__ */ jsxs("div", { className: "caption-track-actions", style: {
            left: value75 * value76 + 10
          }, onMouseDown: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ jsxs("label", { className: "track-action-chip", title: "Importar otro SRT", onMouseDown: (event) => event.stopPropagation(), children: [
              /* @__PURE__ */ jsx("input", { type: "file", accept: ".srt,.vtt,.json", onChange: (event) => {
                var files;
                if (onImportSrt == null) {
                  return void 0;
                } else {
                  return onImportSrt((files = event.target.files) == null ? void 0 : files[0]);
                }
              }, style: {
                display: "none"
              } }),
              "Importar SRT"
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "track-action-chip", onMouseDown: (event) => event.stopPropagation(), onClick: handleClick9, title: "Ajustar duraci\xF3n de escenas a cada frase", children: "Sincronizar" }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "track-action-chip", onMouseDown: (event) => event.stopPropagation(), onClick: () => setIsSyncModalOpen(true), title: "Ajustar delay / calibrar tiempos", children: "Ajustar tiempo" }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "track-action-chip danger", onMouseDown: (event) => event.stopPropagation(), onClick: handleClick8, title: "Limpiar subt\xEDtulos", children: "\u2715" })
          ] })
        ] }) : collapsedTracks.cc ? null : /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: "100%",
          paddingLeft: 8
        }, onMouseDown: (event) => event.stopPropagation(), children: [
          /* @__PURE__ */ jsxs("label", { className: "timeline-track-upload-btn", title: "Importar archivo de subt\xEDtulos SRT o WhisperX", onMouseDown: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: ".srt,.vtt,.json", onChange: (event) => {
              var files;
              if (onImportSrt == null) {
                return void 0;
              } else {
                return onImportSrt((files = event.target.files) == null ? void 0 : files[0]);
              }
            }, style: {
              display: "none"
            } }),
            /* @__PURE__ */ jsx("span", { children: "Importar o arrastrar subt\xEDtulos SRT" })
          ] }),
          audioTrack || scenes.some((item) => item.videoUrl || item.flowVideoUrl) ? /* @__PURE__ */ jsxs("button", { type: "button", className: "timeline-track-action-chip transcription-action " + (isTranscribing ? "is-loading" : ""), onMouseDown: (event) => event.stopPropagation(), onClick: () => onTranscribeAudio == null ? void 0 : onTranscribeAudio(), disabled: isTranscribing, title: "Transcribir el audio o video a subt\xEDtulos con IA", "aria-busy": isTranscribing, children: [
            /* @__PURE__ */ jsx("span", { className: "transcription-action-icon", "aria-hidden": "true", children: isTranscribing ? "" : "\u2726" }),
            isTranscribing ? "Transcribiendo IA" : "Transcribir con IA"
          ] }) : null,
          assetState.operation === "transcription" && assetState.message ? /* @__PURE__ */ jsx("span", { role: "status", "aria-live": "polite", title: assetState.message, style: {
            maxWidth: 360,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: assetState.status === "error" ? "#f87171" : assetState.status === "ready" ? "#4ade80" : "#c7d2fe",
            fontSize: 10.5
          }, children: assetState.message }) : null
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "timeline-row audio-track-row " + (collapsedTracks.a1 ? "collapsed" : "") + " " + (isAudioDragOver ? "is-drag-over" : ""), onDragOver: (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsAudioDragOver(true);
      }, onDragLeave: (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsAudioDragOver(false);
      }, onDrop: (event) => {
        var dataTransfer;
        event.preventDefault();
        event.stopPropagation();
        setIsAudioDragOver(false);
        const from = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).find((from2) => {
          var type;
          const name = (from2.name || "").toLowerCase();
          return ((type = from2.type) == null ? void 0 : type.startsWith("audio/")) || name.endsWith(".mp3") || name.endsWith(".wav") || name.endsWith(".m4a") || name.endsWith(".ogg");
        });
        if (from) {
          if (onUploadAudio != null) {
            onUploadAudio(from);
          }
        }
      }, style: {
        background: isAudioDragOver ? "rgba(99, 102, 241, 0.18)" : void 0,
        outline: isAudioDragOver ? "2px dashed var(--accent, #6366f1)" : void 0
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "track-label audio-label", style: {
          width: je,
          minWidth: je,
          maxWidth: je
        }, title: "Pista A1: Locuci\xF3n / Voz en off", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onMouseDown: (event) => event.stopPropagation(), onClick: () => toggleTrackCollapsed("a1"), children: collapsedTracks.a1 ? "\u203A" : "\u2304" }),
          /* @__PURE__ */ jsx("span", { className: "track-badge-pill track-badge-a1", children: "A1" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "track-content", style: {
          width: value78
        }, children: isAudioDragOver ? /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          alignItems: "center",
          height: "100%",
          paddingLeft: 12,
          color: "#93c5fd",
          fontWeight: 800,
          fontSize: 12
        }, children: "\u{1F3B5} Suelta tu archivo de audio (MP3 / WAV / M4A) aqu\xED" }) : !collapsedTracks.a1 && audioTrack != null && audioTrack.durationMs ? /* @__PURE__ */ jsxs("div", { className: "timeline-audio-block", onMouseDown: (event) => event.stopPropagation(), style: {
          left: 0,
          width: audioTrack.loop ? value78 : Math.min(value78, audioTrack.durationMs / 1e3 * value76)
        }, children: [
          /* @__PURE__ */ jsxs("span", { className: "audio-block-title", children: [
            "\u25B0 Narraci\xF3n \xB7 ",
            audioTrack.name || "Voz en off"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "audio-block-dur", children: [
            (audioTrack.durationMs / 1e3).toFixed(1),
            "s"
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "rgba(0,0,0,0.4)",
            padding: "1px 6px",
            borderRadius: 5
          }, title: "Volumen de la narraci\xF3n", onMouseDown: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10,
              color: "#93c5fd"
            }, children: "Vol:" }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "0", max: "1", step: "0.05", value: audioTrack.volume !== void 0 ? audioTrack.volume : 1, onChange: (event) => updateProject({
              audioTrack: {
                ...audioTrack,
                volume: Number(event.target.value)
              }
            }), style: {
              width: 45,
              height: 3,
              accentColor: "#6366f1",
              cursor: "pointer"
            } }),
            /* @__PURE__ */ jsxs("span", { style: {
              fontSize: 9.5,
              color: "#fff",
              fontWeight: 800
            }, children: [
              Math.round((audioTrack.volume !== void 0 ? audioTrack.volume : 1) * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "track-action-chip", onMouseDown: (event) => event.stopPropagation(), onClick: () => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
            detail: {
              tab: "tts"
            }
          })), title: "Generar nueva voz con IA", children: "\u{1F399}\uFE0F Voz IA" }),
          /* @__PURE__ */ jsxs("label", { className: "track-action-chip", title: "Cambiar audio", onMouseDown: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
              var files;
              if (onUploadAudio == null) {
                return void 0;
              } else {
                return onUploadAudio((files = event.target.files) == null ? void 0 : files[0]);
              }
            }, style: {
              display: "none"
            } }),
            "Cambiar"
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "track-action-chip danger", onMouseDown: (event) => event.stopPropagation(), onClick: handleClick6, title: "Eliminar narraci\xF3n / pista de audio A1", children: "\u{1F5D1}\uFE0F Eliminar A1" })
        ] }) : collapsedTracks.a1 ? null : /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: "100%",
          paddingLeft: 8
        }, onMouseDown: (event) => event.stopPropagation(), children: [
          /* @__PURE__ */ jsxs("label", { className: "timeline-track-upload-btn", title: "Haz clic para subir o arrastrar un archivo de audio MP3 o WAV", onMouseDown: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
              var files;
              if (onUploadAudio == null) {
                return void 0;
              } else {
                return onUploadAudio((files = event.target.files) == null ? void 0 : files[0]);
              }
            }, style: {
              display: "none"
            } }),
            /* @__PURE__ */ jsx("span", { children: "\uFF0B Subir o arrastrar voz" })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "timeline-track-action-chip", onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
            event.stopPropagation();
            window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
              detail: {
                tab: "tts"
              }
            }));
          }, style: {
            height: 24,
            padding: "0 10px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 5
          }, children: /* @__PURE__ */ jsx("span", { children: "\u{1F399}\uFE0F Generar Voz IA (AI33)" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "timeline-row sound-track-row " + (collapsedTracks.a2 ? "collapsed" : ""), onDragOver: (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";
        setIsMusicDragOver(true);
      }, onDragEnter: (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsMusicDragOver(true);
      }, onDragLeave: (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsMusicDragOver(false);
      }, onDrop: (event) => {
        var dataTransfer;
        var uploadHandler;
        event.preventDefault();
        event.stopPropagation();
        setIsMusicDragOver(false);
        const from = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).find((from2) => {
          var type;
          const name = (from2.name || "").toLowerCase();
          return ((type = from2.type) == null ? void 0 : type.startsWith("audio/")) || name.endsWith(".mp3") || name.endsWith(".wav") || name.endsWith(".m4a") || name.endsWith(".ogg");
        });
        if (from) {
          if ((uploadHandler = onUploadMusic || onUploadAudio) != null) {
            uploadHandler(from, "music");
          }
        }
      }, style: {
        background: isMusicDragOver ? "rgba(16, 185, 129, 0.18)" : void 0,
        outline: isMusicDragOver ? "2px dashed var(--success, #10b981)" : void 0
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "track-label sound-label", style: {
          width: je,
          minWidth: je,
          maxWidth: je
        }, title: "Pista A2: M\xFAsica / Efectos", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onMouseDown: (event) => event.stopPropagation(), onClick: () => toggleTrackCollapsed("a2"), children: collapsedTracks.a2 ? "\u203A" : "\u2304" }),
          /* @__PURE__ */ jsx("span", { className: "track-badge-pill track-badge-a2", children: "A2" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "track-content", style: {
          width: value78
        }, children: isMusicDragOver ? /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          alignItems: "center",
          height: "100%",
          paddingLeft: 12,
          color: "#6ee7b7",
          fontWeight: 800,
          fontSize: 12
        }, children: "\u{1F3B5} Suelta tu archivo de M\xFAsica o SFX (MP3 / WAV / M4A) aqu\xED para asignarlo a A2" }) : !collapsedTracks.a2 && musicTrack != null && musicTrack.url ? /* @__PURE__ */ jsxs("div", { className: "timeline-audio-block music-block", onMouseDown: (event) => event.stopPropagation(), style: {
          left: 0,
          width: musicTrack.loop !== false ? value78 : Math.min(value78, (musicTrack.durationMs || 3e4) / 1e3 * value76),
          background: "var(--surface)",
          border: "1px solid var(--border)"
        }, children: [
          /* @__PURE__ */ jsxs("span", { className: "audio-block-title", style: {
            color: "var(--foreground)"
          }, children: [
            "\u{1F3B5} ",
            musicTrack.name || "M\xFAsica / SFX"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "audio-block-dur", style: {
            color: "var(--muted-foreground)"
          }, children: musicTrack.loop !== false ? "\u{1F501} Bucle" : ((musicTrack.durationMs || 3e4) / 1e3).toFixed(1) + "s" }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "var(--muted)",
            padding: "1px 7px",
            borderRadius: "var(--radius-xs)"
          }, title: "Volumen de fondo (ajustar nivel)", onMouseDown: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10,
              color: "var(--muted-foreground)"
            }, children: "Vol:" }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "0", max: "1", step: "0.05", value: musicTrack.volume !== void 0 ? musicTrack.volume : 0.1, onChange: (event) => updateProject({
              musicTrack: {
                ...musicTrack,
                volume: Number(event.target.value)
              }
            }), style: {
              width: 50,
              height: 3,
              accentColor: "var(--primary)",
              cursor: "pointer"
            } }),
            /* @__PURE__ */ jsxs("span", { style: {
              fontSize: 9.5,
              color: "var(--foreground)",
              fontWeight: 700
            }, children: [
              Math.round((musicTrack.volume !== void 0 ? musicTrack.volume : 0.1) * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "button", className: "track-action-chip", onMouseDown: (event) => event.stopPropagation(), onClick: () => updateProject({
            musicTrack: {
              ...musicTrack,
              loop: musicTrack.loop === false
            }
          }), style: {
            background: "var(--muted)",
            color: "var(--foreground)",
            border: "1px solid var(--border)"
          }, title: musicTrack.loop !== false ? "Desactivar bucle continuo" : "Repetir en bucle continuo durante todo el video", children: [
            "\u{1F501} ",
            musicTrack.loop !== false ? "Bucle ON" : "Bucle OFF"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "track-action-chip", title: "Cambiar m\xFAsica o SFX desde tu PC", onMouseDown: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
              var files;
              var uploadHandler;
              if ((uploadHandler = onUploadMusic || onUploadAudio) == null) {
                return void 0;
              } else {
                return uploadHandler((files = event.target.files) == null ? void 0 : files[0], "music");
              }
            }, style: {
              display: "none"
            } }),
            "\u{1F4C1} Cambiar PC"
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "track-action-chip", onMouseDown: (event) => event.stopPropagation(), onClick: () => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
            detail: {
              tab: "suno"
            }
          })), title: "Cambiar o crear nueva m\xFAsica / SFX con Suno", children: "\u{1F3B5} Suno AI" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "track-action-chip danger", onMouseDown: (event) => event.stopPropagation(), onClick: handleClick7, title: "Eliminar m\xFAsica o pista A2", children: "\u{1F5D1}\uFE0F Eliminar A2" })
        ] }) : collapsedTracks.a2 ? null : /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: "100%",
          paddingLeft: 8
        }, onMouseDown: (event) => event.stopPropagation(), children: [
          /* @__PURE__ */ jsxs("label", { className: "timeline-track-upload-btn", title: "Haz clic para subir m\xFAsica o efectos de sonido (SFX) desde tu PC", onMouseDown: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
              var files;
              var uploadHandler;
              if ((uploadHandler = onUploadMusic || onUploadAudio) == null) {
                return void 0;
              } else {
                return uploadHandler((files = event.target.files) == null ? void 0 : files[0], "music");
              }
            }, style: {
              display: "none"
            } }),
            /* @__PURE__ */ jsx("span", { children: "\uFF0B Subir M\xFAsica / SFX (PC)" })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "timeline-track-action-chip", onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
            event.stopPropagation();
            window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
              detail: {
                tab: "suno"
              }
            }));
          }, style: {
            height: 24,
            padding: "0 10px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 800,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 5
          }, children: /* @__PURE__ */ jsx("span", { children: "\u{1F3B5} Crear M\xFAsica Suno AI / SFX" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "timeline-playhead", style: {
        left: je + playheadPixel
      }, onMouseDown: handleMouseDown3, children: [
        /* @__PURE__ */ jsx("div", { className: "playhead-handle" }),
        /* @__PURE__ */ jsx("div", { className: "playhead-line" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(_Component2, { isOpen: isSyncModalOpen, onClose: () => setIsSyncModalOpen(false), onTranscribeWhisper: onTranscribeAudio }),
    contextMenu && /* @__PURE__ */ jsxs("div", { ref: divRef2, className: "context-menu", style: {
      position: "fixed",
      top: contextMenu.y,
      left: contextMenu.x,
      zIndex: 9999,
      background: "#161a29",
      border: "1px solid #282d3d",
      borderRadius: "10px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
      padding: "6px",
      display: "flex",
      flexDirection: "column",
      minWidth: "175px",
      maxHeight: "calc(100vh - 20px)",
      overflowY: "auto",
      scrollbarWidth: "thin"
    }, onClick: (event) => event.stopPropagation(), children: [
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "4px 10px",
        fontSize: "11px",
        fontWeight: "900",
        color: "#8a94a6",
        borderBottom: "1px solid #282d3d",
        marginBottom: "4px"
      }, children: [
        "Escena ",
        contextMenu.sceneIdx + 1
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        window.dispatchEvent(new CustomEvent("flowtube:regenerate-scene", {
          detail: {
            sceneId: contextMenu.sceneId
          }
        }));
        setContextMenu(null);
      }, style: {
        textAlign: "left",
        background: "transparent",
        border: "none",
        color: "#ffd166",
        padding: "8px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 800,
        transition: "0.2s"
      }, onMouseOver: (event) => event.currentTarget.style.background = "#1f2433", onMouseOut: (event) => event.currentTarget.style.background = "transparent", children: "\u26A1 Regenerar Imagen con IA" }),
      (() => {
        const found = items28.find((item) => item.id === contextMenu.sceneId);
        if (found != null && found.imageUrl) {
          return /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => {
              window.dispatchEvent(new CustomEvent("flowtube:generate-video", {
                detail: {
                  sceneId: contextMenu.sceneId,
                  model: "omni"
                }
              }));
              setContextMenu(null);
            }, style: {
              textAlign: "left",
              background: "transparent",
              border: "none",
              color: "#38bdf8",
              padding: "8px 10px",
              fontSize: "12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 800,
              transition: "0.2s"
            }, onMouseOver: (event) => event.currentTarget.style.background = "#1f2433", onMouseOut: (event) => event.currentTarget.style.background = "transparent", title: "Generar video a partir de esta imagen usando Omni Flash", children: [
              "\u26A1 ",
              found.videoUrl ? "Regenerar Video (Omni Flash)" : "Generar Video (Omni Flash)"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => {
              window.dispatchEvent(new CustomEvent("flowtube:generate-video", {
                detail: {
                  sceneId: contextMenu.sceneId,
                  model: "veo-3.1-lite"
                }
              }));
              setContextMenu(null);
            }, style: {
              textAlign: "left",
              background: "transparent",
              border: "none",
              color: "#c084fc",
              padding: "8px 10px",
              fontSize: "12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 800,
              transition: "0.2s"
            }, onMouseOver: (event) => event.currentTarget.style.background = "#1f2433", onMouseOut: (event) => event.currentTarget.style.background = "transparent", title: "Generar video a partir de esta imagen usando Veo 3.1 Lite", children: [
              "\u{1F3A5} ",
              found.videoUrl ? "Regenerar Video (Veo 3.1 Lite)" : "Generar Video (Veo 3.1 Lite)"
            ] })
          ] });
        } else {
          return null;
        }
      })(),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        triggerImageUpload(contextMenu.sceneId);
        setContextMenu(null);
      }, style: {
        textAlign: "left",
        background: "transparent",
        border: "none",
        color: "#60a5fa",
        padding: "8px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 800,
        transition: "0.2s"
      }, onMouseOver: (event) => event.currentTarget.style.background = "#1f2433", onMouseOut: (event) => event.currentTarget.style.background = "transparent", children: "\u{1F4C1} Reemplazar con Video/Imagen (PC)" }),
      (() => {
        var electronAPI;
        const found = items28.find((item) => item.id === contextMenu.sceneId);
        if (((found == null ? void 0 : found.videoUrl) || (found == null ? void 0 : found.imageUrl) || "") && (electronAPI = window.electronAPI) != null && electronAPI.revealMediaInFolder) {
          return /* @__PURE__ */ jsx("button", { onClick: () => revealInFolder(contextMenu.sceneId), style: {
            textAlign: "left",
            background: "transparent",
            border: "none",
            color: "#dbeafe",
            padding: "8px 10px",
            fontSize: "12px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.2s"
          }, onMouseOver: (event) => event.currentTarget.style.background = "#1f2433", onMouseOut: (event) => event.currentTarget.style.background = "transparent", children: "\u{1F4C1} Ver en carpeta" });
        } else {
          return null;
        }
      })(),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        splitScene(contextMenu.sceneId, 0.5);
        setContextMenu(null);
      }, style: {
        textAlign: "left",
        background: "transparent",
        border: "none",
        color: "#fff",
        padding: "8px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.2s"
      }, onMouseOver: (event) => event.currentTarget.style.background = "#1f2433", onMouseOut: (event) => event.currentTarget.style.background = "transparent", children: "\u2702\uFE0F Cortar en dos" }),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        duplicateScene(contextMenu.sceneId);
        setContextMenu(null);
      }, style: {
        textAlign: "left",
        background: "transparent",
        border: "none",
        color: "#fff",
        padding: "8px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.2s"
      }, onMouseOver: (event) => event.currentTarget.style.background = "#1f2433", onMouseOut: (event) => event.currentTarget.style.background = "transparent", children: "\u{1F4D1} Duplicar" }),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        removeScene(contextMenu.sceneId);
        setContextMenu(null);
      }, disabled: scenes.length <= 1, style: {
        textAlign: "left",
        background: "transparent",
        border: "none",
        color: scenes.length <= 1 ? "#475569" : "#ef4444",
        padding: "8px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.2s"
      }, onMouseOver: (event) => {
        if (scenes.length > 1) {
          event.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
        }
      }, onMouseOut: (event) => event.currentTarget.style.background = "transparent", children: "\u{1F5D1}\uFE0F Eliminar" })
    ] }),
    /* @__PURE__ */ jsx(Bn, { isOpen: !!selectedOverlayId, overlayId: selectedOverlayId, onClose: () => setSelectedOverlayId(null) }),
    /* @__PURE__ */ jsx(_Component3, { isOpen: isAiOverlayModalOpen, onClose: () => setIsAiOverlayModalOpen(false), cues: cues7 }),
    /* @__PURE__ */ jsx("input", { ref: inputRef3, type: "file", accept: "image/*", style: {
      display: "none"
    }, onChange: handleChange3 })
  ] });
};
const Ma = (seconds) => {
  const value92 = Math.max(0, Number(seconds) || 0);
  const value93 = Math.floor(value92 / 60);
  const value94 = Math.floor(value92 % 60);
  const value95 = Math.floor(value92 % 1 * 10);
  return String(value93).padStart(2, "0") + ":" + String(value94).padStart(2, "0") + "." + value95;
};
const Ja = ({
  playerRef,
  durationInFrames = 120,
  fps = 30,
  activeTask,
  className = "",
  style = {}
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const divRef = React.useRef(null);
  React.useEffect(() => {
    const current = playerRef == null ? void 0 : playerRef.current;
    if (!current) {
      return;
    }
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    current.addEventListener("play", handlePlay);
    current.addEventListener("pause", handlePause);
    current.addEventListener("ended", handlePause);
    return () => {
      current.removeEventListener("play", handlePlay);
      current.removeEventListener("pause", handlePause);
      current.removeEventListener("ended", handlePause);
    };
  }, [playerRef]);
  React.useEffect(() => {
    const current = playerRef == null ? void 0 : playerRef.current;
    if (!current) {
      return;
    }
    const handleFrameUpdate = (state) => {
      if (!isDragging) {
        setCurrentFrame(state.detail.frame);
      }
    };
    current.addEventListener("frameupdate", handleFrameUpdate);
    current.addEventListener("seeked", handleFrameUpdate);
    setCurrentFrame(current.getCurrentFrame() || 0);
    return () => {
      current.removeEventListener("frameupdate", handleFrameUpdate);
      current.removeEventListener("seeked", handleFrameUpdate);
    };
  }, [playerRef, isDragging]);
  const handleClick = () => {
    const current = playerRef == null ? void 0 : playerRef.current;
    if (current) {
      if (current.isPlaying()) {
        current.pause();
      } else {
        if (currentFrame >= durationInFrames - 1) {
          current.seekTo(0);
          setCurrentFrame(0);
        }
        current.play();
      }
    }
  };
  const seekToFrame = (frame) => {
    var current;
    const value2 = Math.max(0, Math.min(durationInFrames - 1, Math.round(frame)));
    setCurrentFrame(value2);
    if ((current = playerRef == null ? void 0 : playerRef.current) != null) {
      current.seekTo(value2);
    }
  };
  const handlePointerDown = (event) => {
    if (divRef.current) {
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      handlePointerMove(event);
    }
  };
  const handlePointerMove = (event) => {
    if (!divRef.current) {
      return;
    }
    const rect = divRef.current.getBoundingClientRect();
    if (rect.width <= 0) {
      return;
    }
    const value2 = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    seekToFrame(value2 * (durationInFrames - 1));
  };
  const handlePointerUp = (event) => {
    setIsDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
    }
  };
  const currentTimeSeconds = currentFrame / fps;
  const value = Math.max(0.1, durationInFrames / fps);
  const progressPercent = durationInFrames > 1 ? currentFrame / (durationInFrames - 1) * 100 : 0;
  return /* @__PURE__ */ jsxs("div", { className: "pro-playback-bar " + className, style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    height: 42,
    padding: "0 16px",
    background: "var(--surface)",
    borderTop: "1px solid var(--border)",
    userSelect: "none",
    ...style
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }, children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => seekToFrame(0), title: "Ir al inicio (Inicio)", style: {
        width: 28,
        height: 28,
        display: "grid",
        placeItems: "center",
        background: "transparent",
        border: "none",
        borderRadius: "var(--radius-xs)",
        color: "var(--muted-foreground)",
        cursor: "pointer",
        transition: "all 0.15s"
      }, onMouseEnter: (event) => {
        event.currentTarget.style.background = "var(--accent)";
        event.currentTarget.style.color = "var(--foreground)";
      }, onMouseLeave: (event) => {
        event.currentTarget.style.background = "transparent";
        event.currentTarget.style.color = "var(--muted-foreground)";
      }, children: /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", children: [
        /* @__PURE__ */ jsx("rect", { x: "4", y: "5", width: "2.5", height: "14", rx: "0.5" }),
        /* @__PURE__ */ jsx("polygon", { points: "19 5 8 12 19 19 19 5" })
      ] }) }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick, title: isPlaying ? "Pausar (Espacio)" : "Reproducir (Espacio)", style: {
        width: 32,
        height: 32,
        display: "grid",
        placeItems: "center",
        background: "var(--foreground)",
        color: "var(--background)",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        transition: "all 0.15s ease"
      }, onMouseEnter: (event) => {
        event.currentTarget.style.transform = "scale(1.06)";
      }, onMouseLeave: (event) => {
        event.currentTarget.style.transform = "scale(1)";
      }, children: isPlaying ? /* @__PURE__ */ jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "currentColor", children: [
        /* @__PURE__ */ jsx("rect", { x: "6", y: "4", width: "3.5", height: "16", rx: "1" }),
        /* @__PURE__ */ jsx("rect", { x: "14.5", y: "4", width: "3.5", height: "16", rx: "1" })
      ] }) : /* @__PURE__ */ jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "currentColor", style: {
        marginLeft: 2
      }, children: /* @__PURE__ */ jsx("polygon", { points: "6 4 20 12 6 20 6 4" }) }) }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => seekToFrame(durationInFrames - 1), title: "Ir al final (Fin)", style: {
        width: 28,
        height: 28,
        display: "grid",
        placeItems: "center",
        background: "transparent",
        border: "none",
        borderRadius: "var(--radius-xs)",
        color: "var(--muted-foreground)",
        cursor: "pointer",
        transition: "all 0.15s"
      }, onMouseEnter: (event) => {
        event.currentTarget.style.background = "var(--accent)";
        event.currentTarget.style.color = "var(--foreground)";
      }, onMouseLeave: (event) => {
        event.currentTarget.style.background = "transparent";
        event.currentTarget.style.color = "var(--muted-foreground)";
      }, children: /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", children: [
        /* @__PURE__ */ jsx("polygon", { points: "5 5 16 12 5 19 5 5" }),
        /* @__PURE__ */ jsx("rect", { x: "17.5", y: "5", width: "2.5", height: "14", rx: "0.5" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: divRef, onPointerDown: handlePointerDown, onPointerMove: isDragging ? handlePointerMove : void 0, onPointerUp: isDragging ? handlePointerUp : void 0, onPointerCancel: isDragging ? handlePointerUp : void 0, onMouseEnter: () => setIsHovering(true), onMouseLeave: () => setIsHovering(false), style: {
      flex: 1,
      height: 26,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      position: "relative",
      touchAction: "none"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        position: "relative",
        width: "100%",
        height: isHovering || isDragging ? 6 : 4,
        borderRadius: 9999,
        background: "var(--muted)",
        transition: "height 0.15s ease",
        overflow: "hidden"
      }, children: /* @__PURE__ */ jsx("div", { style: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: progressPercent + "%",
        background: "var(--foreground)",
        borderRadius: 9999
      } }) }),
      /* @__PURE__ */ jsx("div", { style: {
        position: "absolute",
        left: progressPercent + "%",
        top: "50%",
        transform: "translate(-50%, -50%) scale(" + (isHovering || isDragging ? 1 : 0) + ")",
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "var(--foreground)",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
        pointerEvents: "none",
        transition: "transform 0.15s ease, opacity 0.15s ease",
        opacity: isHovering || isDragging ? 1 : 0
      } })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexShrink: 0
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontVariantNumeric: "tabular-nums",
        display: "flex",
        alignItems: "center",
        gap: 4
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          color: "var(--foreground)",
          fontWeight: 700
        }, children: Ma(currentTimeSeconds) }),
        /* @__PURE__ */ jsx("span", { style: {
          color: "var(--muted-foreground)",
          opacity: 0.6
        }, children: "/" }),
        /* @__PURE__ */ jsx("span", { style: {
          color: "var(--muted-foreground)"
        }, children: Ma(value) })
      ] }),
      activeTask && /* @__PURE__ */ jsxs("div", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 8px",
        borderRadius: "var(--radius-xs)",
        background: "var(--accent)",
        border: "1px solid var(--border-strong)",
        fontSize: 10,
        color: "var(--foreground)",
        fontFamily: "var(--font-mono)"
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          display: "inline-block",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--foreground)"
        } }),
        /* @__PURE__ */ jsxs("span", { children: [
          activeTask.label,
          " ",
          activeTask.progress,
          "%"
        ] })
      ] })
    ] })
  ] });
};
const _Component10 = ({
  playerRef,
  onSelectScene,
  onUploadImage,
  onUploadAudio,
  onUploadMusic,
  onImportSrt,
  onTranscribeAudio,
  onCreateScenesFromTranscript,
  onOpenBatchPromptsModal,
  hideTimeline,
  activeTask,
  projectSeconds,
  selectedTitle
}) => {
  var audioTrack;
  var cues;
  var style2;
  var style3;
  var style4;
  var style5;
  var style6;
  var style7;
  const [isPlaying, setIsPlaying] = ReactLib.useState(false);
  const project = w((state) => state.project);
  const selectedId = w((state) => state.selectedId);
  const renderState = w((state) => state.renderState);
  w((state) => state.batchState);
  w((state) => state.promptGenState);
  w((state) => state.cancelBatch);
  w((state) => state.cancelPromptGen);
  const scenes = Array.isArray(project.scenes) ? project.scenes : [];
  const fps = Number(project.fps) || 30;
  const compositionSize = project.format === "short" ? {
    width: 1080,
    height: 1920
  } : {
    width: 1920,
    height: 1080
  };
  const value = ReactLib.useMemo(() => {
    var audioTrack2;
    return Math.max(1, Ya(scenes, fps, ((audioTrack2 = project.audioTrack) == null ? void 0 : audioTrack2.durationMs) || 0));
  }, [scenes, fps, (audioTrack = project.audioTrack) == null ? void 0 : audioTrack.durationMs]);
  ReactLib.useEffect(() => {
    const current = playerRef.current;
    if (!current) {
      return;
    }
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    current.addEventListener("play", handlePlay);
    current.addEventListener("pause", handlePause);
    current.addEventListener("ended", handlePause);
    return () => {
      current.removeEventListener("play", handlePlay);
      current.removeEventListener("pause", handlePause);
      current.removeEventListener("ended", handlePause);
    };
  }, [playerRef]);
  const updateCaptionStyle = w((state) => state.updateCaptionStyle);
  const handleClick15 = w((state) => state.toggleCaptions);
  const autoTranscribeOnAudioUpload = w((state) => state.autoTranscribeOnAudioUpload);
  const setAutoTranscribeOnAudioUpload = w((state) => state.setAutoTranscribeOnAudioUpload);
  const [isCaptionPanelOpen, setIsCaptionPanelOpen] = ReactLib.useState(false);
  const captionTrack = project.captionTrack;
  const hasCaptions = (cues = captionTrack == null ? void 0 : captionTrack.cues) != null && !!cues.length;
  const captionsEnabled = (captionTrack == null ? void 0 : captionTrack.enabled) !== false;
  const position = ((style2 = captionTrack == null ? void 0 : captionTrack.style) == null ? void 0 : style2.position) || (((style3 = captionTrack == null ? void 0 : captionTrack.style) == null ? void 0 : style3.posY) < 35 ? "top" : ((style4 = captionTrack == null ? void 0 : captionTrack.style) == null ? void 0 : style4.posY) > 65 ? "bottom" : "center");
  const highlightColor = ((style5 = captionTrack == null ? void 0 : captionTrack.style) == null ? void 0 : style5.highlightColor) || "#fbbf24";
  const animation = ((style6 = captionTrack == null ? void 0 : captionTrack.style) == null ? void 0 : style6.animation) || "viral-yellow-pop";
  const fontSize = ((style7 = captionTrack == null ? void 0 : captionTrack.style) == null ? void 0 : style7.fontSize) || 54;
  const items = [{
    color: "#FFD700",
    label: "Amarillo Dorado (TikTok)"
  }, {
    color: "#22c55e",
    label: "Verde Ne\xF3n"
  }, {
    color: "#38bdf8",
    label: "Azul Cyan"
  }, {
    color: "#f87171",
    label: "Rojo Coral"
  }, {
    color: "#c084fc",
    label: "Morado Glow"
  }, {
    color: "#ffffff",
    label: "Blanco Puro"
  }];
  const [isHoveringPlayer, setIsHoveringPlayer] = ReactLib.useState(false);
  const handleClick16 = () => {
    var current6;
    var current7;
    var current8;
    if ((current6 = playerRef.current) != null && current6.isPlaying()) {
      if ((current7 = playerRef.current) != null) {
        current7.pause();
      }
    } else if ((current8 = playerRef.current) != null) {
      current8.play();
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "preview-panel", children: [
    /* @__PURE__ */ jsx("div", { className: "player-wrapper-outer", style: {
      position: "relative"
    }, children: /* @__PURE__ */ jsxs("div", { className: "player-frame " + project.format, onMouseEnter: () => setIsHoveringPlayer(true), onMouseLeave: () => setIsHoveringPlayer(false), onClick: handleClick16, style: {
      cursor: "pointer",
      position: "relative",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsx(Player, { ref: playerRef, component: Ha, inputProps: {
        scenes: project.scenes,
        audioTrack: project.audioTrack,
        musicTrack: project.musicTrack,
        captionTrack: project.captionTrack,
        transitions: project.transitions,
        fps: project.fps,
        format: project.format,
        overlays: project.overlays
      }, durationInFrames: value, compositionWidth: compositionSize.width, compositionHeight: compositionSize.height, fps: project.fps, controls: false, loop: true, style: {
        width: "100%",
        height: "100%",
        background: "#0a0a0a"
      } }),
      /* @__PURE__ */ jsx("div", { style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        background: "linear-gradient(to bottom, rgba(3, 7, 18, 0.75), transparent)",
        pointerEvents: "none",
        opacity: isHoveringPlayer || isCaptionPanelOpen ? 1 : 0,
        transition: "opacity 0.25s ease",
        zIndex: 10
      } }),
      /* @__PURE__ */ jsx("div", { style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: "linear-gradient(to top, rgba(3, 7, 18, 0.75), transparent)",
        pointerEvents: "none",
        opacity: isHoveringPlayer ? 1 : 0,
        transition: "opacity 0.25s ease",
        zIndex: 10
      } }),
      /* @__PURE__ */ jsxs("div", { style: {
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 20,
        opacity: isHoveringPlayer ? 1 : 0,
        transition: "opacity 0.25s ease",
        pointerEvents: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(10, 14, 23, 0.82)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 20,
        padding: "4px 10px",
        backdropFilter: "blur(12px)",
        color: "#c7d2fe",
        fontSize: 10.5,
        fontWeight: 800,
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
      }, children: [
        /* @__PURE__ */ jsx("span", { children: project.format === "short" ? "\u{1F4F1} 9:16 Short" : "\u{1F3AC} 16:9 HD" }),
        /* @__PURE__ */ jsx("span", { style: {
          opacity: 0.5
        }, children: "\xB7" }),
        /* @__PURE__ */ jsxs("span", { children: [
          project.fps,
          " FPS"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(" + (isHoveringPlayer ? 1 : 0.85) + ")",
        zIndex: 25,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: isPlaying ? "rgba(15, 23, 42, 0.65)" : "rgba(79, 70, 229, 0.85)",
        border: "1.5px solid rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: isPlaying ? 20 : 22,
        opacity: isHoveringPlayer ? isPlaying ? 0.35 : 0.95 : 0,
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: "none",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)"
      }, children: /* @__PURE__ */ jsx("span", { style: {
        marginLeft: isPlaying ? 0 : 3
      }, children: isPlaying ? "\u23F8" : "\u25B6" }) }),
      hasCaptions && /* @__PURE__ */ jsxs("div", { onClick: (event) => event.stopPropagation(), style: {
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
        opacity: isHoveringPlayer || isCaptionPanelOpen ? 1 : 0,
        transition: "opacity 0.25s ease",
        pointerEvents: isHoveringPlayer || isCaptionPanelOpen ? "auto" : "none"
      }, children: [
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setIsCaptionPanelOpen((prev) => !prev), style: {
          background: isCaptionPanelOpen ? "var(--accent, #6366f1)" : "rgba(15, 23, 42, 0.82)",
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 20,
          padding: "5px 12px",
          fontSize: 11,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          transition: "all 0.2s ease"
        }, title: "Personalizar posici\xF3n y colores de subt\xEDtulos en vivo", children: [
          /* @__PURE__ */ jsx("span", { children: "\u{1F4AC} Subt\xEDtulos" }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 9,
            opacity: 0.8
          }, children: isCaptionPanelOpen ? "\u25B2" : "\u25BC" })
        ] }),
        isCaptionPanelOpen && /* @__PURE__ */ jsxs("div", { style: {
          background: "rgba(10, 14, 23, 0.96)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          borderRadius: 14,
          padding: "12px 14px",
          boxShadow: "0 14px 40px rgba(0,0,0,0.85)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          minWidth: 260,
          animation: "fadeIn 0.2s ease"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 8
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              textTransform: "uppercase"
            }, children: "Animaci\xF3n de Subt\xEDtulos:" }),
            /* @__PURE__ */ jsxs("select", { value: animation, onChange: (event) => updateCaptionStyle({
              animation: event.target.value
            }), style: {
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              borderRadius: "var(--radius-xs)",
              padding: "4px 8px",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              width: "100%"
            }, children: [
              /* @__PURE__ */ jsx("option", { value: "viral-yellow-pop", children: "\u{1F4A5} Pop El\xE1stico Din\xE1mico" }),
              /* @__PURE__ */ jsx("option", { value: "claude-kinetic-reveal", children: "\u{1F3AC} Cin\xE9tico Fluido" }),
              /* @__PURE__ */ jsx("option", { value: "char-slide-highlight", children: "\u2728 Deslizamiento por Car\xE1cter" }),
              /* @__PURE__ */ jsx("option", { value: "soft-scale", children: "\u{1FAE7} Escala Suave (SoftScale)" }),
              /* @__PURE__ */ jsx("option", { value: "pop-up", children: "\u2B06\uFE0F Pop-Up Suave" }),
              /* @__PURE__ */ jsx("option", { value: "karaoke", children: "\u{1F399}\uFE0F Relleno Progresivo (Karaoke)" }),
              /* @__PURE__ */ jsx("option", { value: "hormozi-pill", children: "\u{1F48A} Fondo P\xEDldora Activa" }),
              /* @__PURE__ */ jsx("option", { value: "word-underline", children: "\u270D\uFE0F Subrayado" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              fontWeight: 800,
              color: "#94a3b8",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Tama\xF1o:" }),
              /* @__PURE__ */ jsxs("span", { style: {
                color: "#c7d2fe"
              }, children: [
                fontSize,
                "px"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "32", max: "90", step: "2", value: fontSize, onChange: (event) => updateCaptionStyle({
              fontSize: Number(event.target.value)
            }), style: {
              width: "100%",
              accentColor: "#6366f1",
              cursor: "pointer",
              height: 4
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10.5,
              fontWeight: 800,
              color: "#94a3b8"
            }, children: "Posici\xF3n:" }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              gap: 4,
              background: "rgba(255,255,255,0.06)",
              padding: 2,
              borderRadius: 8
            }, children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateCaptionStyle({
                position: "top",
                posY: 14
              }), style: {
                background: position === "top" ? "var(--accent, #6366f1)" : "transparent",
                color: "#fff",
                border: 0,
                borderRadius: 6,
                padding: "3px 7px",
                fontSize: 10,
                fontWeight: 800,
                cursor: "pointer"
              }, title: "Ubicar arriba", children: "\u2B06\uFE0F Arriba" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateCaptionStyle({
                position: "center",
                posY: 50
              }), style: {
                background: position === "center" ? "var(--accent, #6366f1)" : "transparent",
                color: "#fff",
                border: 0,
                borderRadius: 6,
                padding: "3px 7px",
                fontSize: 10,
                fontWeight: 800,
                cursor: "pointer"
              }, title: "Ubicar al centro", children: "\u23F9\uFE0F Centro" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateCaptionStyle({
                position: "bottom",
                posY: 84
              }), style: {
                background: position === "bottom" ? "var(--accent, #6366f1)" : "transparent",
                color: "#fff",
                border: 0,
                borderRadius: 6,
                padding: "3px 7px",
                fontSize: 10,
                fontWeight: 800,
                cursor: "pointer"
              }, title: "Ubicar abajo", children: "\u2B07\uFE0F Abajo" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10.5,
              fontWeight: 800,
              color: "#94a3b8"
            }, children: "Resaltado:" }),
            /* @__PURE__ */ jsx("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 5
            }, children: items.map((item) => {
              const isSelectedColor = highlightColor.toLowerCase() === item.color.toLowerCase();
              return /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateCaptionStyle({
                highlightColor: item.color
              }), style: {
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: item.color,
                border: isSelectedColor ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.5)",
                boxShadow: isSelectedColor ? "0 0 10px " + item.color : "none",
                cursor: "pointer",
                padding: 0,
                transform: isSelectedColor ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.15s ease"
              }, title: item.label }, item.color);
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10.5,
              fontWeight: 800,
              color: "#94a3b8"
            }, children: "Estilo:" }),
            /* @__PURE__ */ jsxs("select", { value: animation, onChange: (event) => updateCaptionStyle({
              animation: event.target.value
            }), style: {
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#f8fafc",
              borderRadius: 6,
              padding: "3px 6px",
              fontSize: 10.5,
              fontWeight: 700,
              cursor: "pointer"
            }, children: [
              /* @__PURE__ */ jsx("option", { value: "viral-yellow-pop", children: "\u{1F7E1} Viral Gold Pop (TikTok)" }),
              /* @__PURE__ */ jsx("option", { value: "claude-kinetic-reveal", children: "\u{1F3AC} Claude Kinetic (Dorado)" }),
              /* @__PURE__ */ jsx("option", { value: "soft-scale", children: "\u2728 Suave (SoftScale)" }),
              /* @__PURE__ */ jsx("option", { value: "pop-up", children: "\u{1F4A5} Pop-Up" }),
              /* @__PURE__ */ jsx("option", { value: "karaoke", children: "\u{1F399}\uFE0F Karaoke Ne\xF3n" }),
              /* @__PURE__ */ jsx("option", { value: "hormozi-pill", children: "\u{1F48A} Hormozi Pill" }),
              /* @__PURE__ */ jsx("option", { value: "hormozi", children: "\u2B1B Hormozi Bounce" }),
              /* @__PURE__ */ jsx("option", { value: "word-zoom", children: "\u{1F50D} Word Zoom" }),
              /* @__PURE__ */ jsx("option", { value: "gradient-pop", children: "\u{1F308} Gradiente Pop" }),
              /* @__PURE__ */ jsx("option", { value: "documentary-serif", children: "\u{1F4DC} Documental Serif" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            borderRadius: 8,
            padding: "5px 8px",
            marginTop: 2
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              flexDirection: "column"
            }, children: [
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 10,
                fontWeight: 800,
                color: "#6ee7b7"
              }, children: "\u26A1 Auto-IA al subir MP3" }),
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 8.5,
                color: "#94a3b8"
              }, children: "Transcribe subt\xEDtulos al cargar audio" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setAutoTranscribeOnAudioUpload(!autoTranscribeOnAudioUpload), style: {
              background: autoTranscribeOnAudioUpload ? "#10b981" : "rgba(255, 255, 255, 0.12)",
              color: autoTranscribeOnAudioUpload ? "#ffffff" : "#94a3b8",
              border: 0,
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 9.5,
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }, children: autoTranscribeOnAudioUpload ? "\u2713 ON" : "\u2715 OFF" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 6,
            marginTop: 2
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10.5,
              color: "#94a3b8"
            }, children: "Visibilidad" }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick15, style: {
              background: captionsEnabled ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
              color: captionsEnabled ? "#4ade80" : "#f87171",
              border: "1px solid " + (captionsEnabled ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)"),
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 10,
              fontWeight: 800,
              cursor: "pointer"
            }, children: captionsEnabled ? "\u2713 Activo" : "\u2715 Oculto" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Ja, { playerRef, durationInFrames: value, fps, activeTask }),
    !hideTimeline && /* @__PURE__ */ jsx(Zt, { scenes: project.scenes, fps: project.fps, durationInFrames: value, selectedId, playerRef, onSelectScene, audioTrack: project.audioTrack, musicTrack: project.musicTrack, captionTrack: project.captionTrack, onUploadImage, onUploadAudio, onUploadMusic: onUploadMusic || onUploadAudio, onImportSrt, onTranscribeAudio, onCreateScenesFromTranscript, onOpenBatchPromptsModal }),
    renderState.url ? /* @__PURE__ */ jsxs("div", { className: "render-success-banner", children: [
      /* @__PURE__ */ jsx("span", { children: "\u{1F389} \xA1Video renderizado con \xE9xito!" }),
      /* @__PURE__ */ jsx("a", { href: renderState.url, download: true, className: "btn-download-render", children: "Descargar MP4" })
    ] }) : null
  ] });
};
const Na = (startMs) => (Number(startMs || 0) / 1e3).toFixed(2);
const _Component1 = ({
  isOpen,
  cues,
  onClose,
  onSave
}) => {
  const [editableCues, setEditableCues] = React.useState([]);
  React.useEffect(() => {
    if (isOpen) {
      setEditableCues((cues || []).map((item) => ({
        ...item
      })));
    }
  }, [cues, isOpen]);
  if (!isOpen) {
    return null;
  }
  const updateCue = (index, patch) => setEditableCues((indexes) => indexes.map((item, index2) => index2 === index ? {
    ...item,
    ...patch
  } : item));
  const splitCue = (index) => setEditableCues((items) => {
    const cue = items[index];
    const value96 = Math.round((Number(cue.startMs) + Number(cue.endMs)) / 2);
    const parts = String(cue.text).trim().split(/\s+/);
    const value97 = Math.max(1, Math.ceil(parts.length / 2));
    return [...items.slice(0, index), {
      ...cue,
      id: crypto.randomUUID(),
      endMs: value96,
      text: parts.slice(0, value97).join(" ")
    }, {
      ...cue,
      id: crypto.randomUUID(),
      startMs: value96,
      text: parts.slice(value97).join(" ") || "..."
    }, ...items.slice(index + 1)];
  });
  const mergeWithNext = (index) => setEditableCues((items) => index >= items.length - 1 ? items : [...items.slice(0, index), {
    ...items[index],
    endMs: items[index + 1].endMs,
    text: (items[index].text + " " + items[index + 1].text).trim(),
    words: void 0
  }, ...items.slice(index + 2)]);
  const handleClick17 = () => {
    if (!editableCues.length) {
      return;
    }
    const text = ta(editableCues);
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8"
    });
    const objectUrl = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = objectUrl;
    element.download = "subtitulos_editados.srt";
    element.click();
    URL.revokeObjectURL(objectUrl);
  };
  const handleClick18 = () => {
    if (!editableCues.length) {
      return;
    }
    const vttContent = aa(editableCues);
    const blob = new Blob([vttContent], {
      type: "text/vtt;charset=utf-8"
    });
    const objectUrl = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = objectUrl;
    element.download = "subtitulos_editados.vtt";
    element.click();
    URL.revokeObjectURL(objectUrl);
  };
  return /* @__PURE__ */ jsx("div", { onMouseDown: (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, style: {
    position: "fixed",
    inset: 0,
    zIndex: 1500,
    background: "rgba(0,0,0,.78)",
    padding: 24,
    display: "grid",
    placeItems: "center"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    width: 920,
    maxWidth: "100%",
    height: "min(720px,90vh)",
    background: "#0e1118",
    border: "1px solid #303746",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      padding: 14,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #252b38"
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { style: {
          color: "#fff",
          fontSize: 14
        }, children: "\u2702\uFE0F Editor avanzado de subt\xEDtulos" }),
        /* @__PURE__ */ jsxs("div", { style: {
          color: "#7c8799",
          fontSize: 10.5,
          marginTop: 3
        }, children: [
          editableCues.length,
          " frases sincronizadas \xB7 tiempos exactos en segundos"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: handleClick17, title: "Exportar a .SRT", children: "\u{1F4E5} Bajar .SRT" }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: handleClick18, title: "Exportar a .VTT", children: "\u{1F4E5} Bajar .VTT" }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: onClose, title: "Cerrar", children: "\u2715" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      overflow: "auto",
      padding: 10,
      flex: 1
    }, children: editableCues.map((cue, index) => /* @__PURE__ */ jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "40px 82px 82px 1fr auto",
      gap: 7,
      alignItems: "center",
      padding: 7,
      borderBottom: "1px solid #202633"
    }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        color: "#657084",
        fontSize: 10
      }, children: index + 1 }),
      /* @__PURE__ */ jsx("input", { className: "form-input", type: "number", step: ".01", value: Na(cue.startMs), onChange: (event) => updateCue(index, {
        startMs: Math.max(0, Number(event.target.value) * 1e3)
      }) }),
      /* @__PURE__ */ jsx("input", { className: "form-input", type: "number", step: ".01", value: Na(cue.endMs), onChange: (event) => updateCue(index, {
        endMs: Math.max(0, Number(event.target.value) * 1e3)
      }) }),
      /* @__PURE__ */ jsx("input", { className: "form-input", value: cue.text, onChange: (event) => updateCue(index, {
        text: event.target.value,
        words: void 0
      }) }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        gap: 4
      }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn-tool", title: "Dividir frase en dos", onClick: () => splitCue(index), children: "\u2702" }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool", title: "Unir con la siguiente frase", onClick: () => mergeWithNext(index), children: "\u2194" }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool danger", title: "Eliminar frase", onClick: () => setEditableCues((media) => media.filter((item, index3) => index3 !== index)), children: "\xD7" })
      ] })
    ] }, cue.id || index)) }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: 12,
      borderTop: "1px solid #252b38",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: () => setEditableCues((state) => {
        var lastCue;
        var lastCue;
        return [...state, {
          id: crypto.randomUUID(),
          startMs: ((lastCue = state.at(-1)) == null ? void 0 : lastCue.endMs) || 0,
          endMs: (((lastCue = state.at(-1)) == null ? void 0 : lastCue.endMs) || 0) + 2e3,
          text: "Nueva frase"
        }];
      }), children: "+ A\xF1adir frase" }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: onClose, children: "Cancelar" }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool accent", onClick: () => onSave(editableCues.filter((cue) => cue.text.trim() && Number(cue.endMs) > Number(cue.startMs)).sort((a, b) => a.startMs - b.startMs)), children: "Guardar cambios" })
      ] })
    ] })
  ] }) });
};
const ir = [{
  value: "zoom-in",
  label: "\u{1F50D} Zoom In"
}, {
  value: "zoom-out",
  label: "\u{1F50E} Zoom Out"
}, {
  value: "pan-left",
  label: "\u2B05\uFE0F Pan Izquierda"
}, {
  value: "pan-right",
  label: "\u27A1\uFE0F Pan Derecha"
}, {
  value: "still",
  label: "\u23F9\uFE0F Sin Movimiento"
}];
const _Component4 = ({
  isOpen,
  onClose
}) => {
  var captionTrack8;
  var captionTrack9;
  const project = w((state) => state.project);
  const importPromptList = w((state) => state.importPromptList);
  const syncPromptsWithSrt = w((state) => state.syncPromptsWithSrt);
  const setProject = w((state) => state.setProject);
  const setAssetState = w((state) => state.setAssetState);
  const cues = ((captionTrack8 = project.captionTrack) == null ? void 0 : captionTrack8.cues) || [];
  const timedCues = React.useMemo(() => gt(cues), [cues]);
  const hasTimedCues = timedCues.length > 0;
  const [mode, setMode] = React.useState(hasTimedCues ? "srt" : "free");
  const [promptsText, setPromptsText] = React.useState("");
  const [replaceExisting, setReplaceExisting] = React.useState(true);
  const [defaultDuration, setDefaultDuration] = React.useState(4);
  const [defaultMotion, setDefaultMotion] = React.useState("zoom-in");
  const [showPairingTable, setShowPairingTable] = React.useState(false);
  const [isDraggingOverSrt, setIsDraggingOverSrt] = React.useState(false);
  const filteredMap = React.useMemo(() => promptsText.split("\n").map((split) => split.trim()).filter((map) => map.length > 0), [promptsText]);
  const totalDurationSeconds = React.useMemo(() => cues.length ? Math.max(...cues.map((item) => Number(item.endMs) || 0)) / 1e3 : 0, [cues]);
  if (!isOpen) {
    return null;
  }
  const handleSrtFile = async (from) => {
    if (from) {
      try {
        const paragraphs = La(await from.text());
        if (!paragraphs.length) {
          throw new Error("El SRT no contiene subt\xEDtulos v\xE1lidos.");
        }
        setProject({
          ...project,
          engine: "remotion",
          captionTrack: {
            ...project.captionTrack,
            sourceName: from.name,
            cues: paragraphs,
            enabled: true
          }
        });
        setMode("srt");
        setAssetState({
          status: "ready",
          message: paragraphs.length + " frases detectadas en " + from.name + "."
        });
      } catch (error) {
        alert("Error al leer SRT: " + error.message);
      }
    }
  };
  const handleChange = async (event) => {
    var files;
    const file = (files = event.target.files) == null ? void 0 : files[0];
    if (file) {
      await handleSrtFile(file);
    }
    event.target.value = "";
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (mode === "srt" && hasTimedCues) {
      syncPromptsWithSrt({
        prompts: promptsText,
        defaultMotion
      });
      onClose();
    } else {
      if (!filteredMap.length) {
        return;
      }
      importPromptList({
        prompts: promptsText,
        replace: replaceExisting,
        defaultDuration: Number(defaultDuration) || 4,
        defaultMotion
      });
      onClose();
    }
  };
  const handleClick19 = () => {
    var characterReference9;
    var characterReference10;
    var characterReference11;
    if (!hasTimedCues) {
      return;
    }
    const styleConfig = {
      label: project.visualStyle || "Western Anime"
    };
    const hasCharacterRef = ((characterReference9 = project.characterReference) == null ? void 0 : characterReference9.enabled) !== false && ((characterReference10 = project.characterReference) != null && !!characterReference10.url || (characterReference11 = project.characterReference) != null && !!characterReference11.base64);
    let framing = null;
    const items = timedCues.map((item, index) => {
      var characterReference;
      const sceneResult = Jt(item.text, index, timedCues.length, styleConfig, hasCharacterRef, {
        previousFraming: framing,
        characterDescription: (characterReference = project.characterReference) == null ? void 0 : characterReference.description,
        styleKey: project.visualStyle
      });
      framing = sceneResult.framing;
      return sceneResult.prompt;
    });
    setPromptsText(items.join("\n"));
  };
  const handleClick20 = () => {
    if (mode === "srt" && hasTimedCues) {
      handleClick19();
    } else {
      setPromptsText("Toma a\xE9rea de una metr\xF3polis futurista con veh\xEDculos voladores y rascacielos dorados al atardecer\nPrimer plano de un joven inventor con gafas hologr\xE1ficas ajustando un dispositivo brillante\nEl dispositivo emite un destello de luz que proyecta un mapa estelar en 3D en la habitaci\xF3n\nEl inventor sonr\xEDe con asombro mientras las constelaciones giran a su alrededor\nVista general del laboratorio iluminado por el brillo azul de las estrellas proyectadas");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "ft-modal-backdrop", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "ft-modal-container", style: {
    maxWidth: 720
  }, onClick: (event) => event.stopPropagation(), children: [
    /* @__PURE__ */ jsxs("div", { className: "ft-modal-header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "CREACI\xD3N Y SINCRONIZACI\xD3N MASIVA" }),
        /* @__PURE__ */ jsx("h2", { children: "\u{1F4DD} Prompts de Escenas & Sincronizaci\xF3n" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "ft-modal-close", onClick: onClose, title: "Cerrar", children: "\u2715" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-secondary)",
      padding: "0 20px"
    }, children: [
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setMode("srt"), style: {
        padding: "12px 18px",
        border: 0,
        borderBottom: mode === "srt" ? "2px solid var(--accent)" : "2px solid transparent",
        background: "transparent",
        color: mode === "srt" ? "var(--accent)" : "var(--text-muted)",
        fontWeight: 800,
        fontSize: 12.5,
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx("span", { children: "\u{1F399}\uFE0F Sincronizar con SRT" }),
        hasTimedCues ? /* @__PURE__ */ jsxs("span", { style: {
          background: "rgba(91, 140, 255, 0.16)",
          color: "var(--accent)",
          padding: "2px 6px",
          borderRadius: 4,
          fontSize: 11
        }, children: [
          timedCues.length,
          " Frases"
        ] }) : /* @__PURE__ */ jsx("span", { style: {
          background: "var(--bg-elevated)",
          color: "var(--text-dim)",
          padding: "2px 6px",
          borderRadius: 4,
          fontSize: 11
        }, children: "Sin SRT" })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setMode("free"), style: {
        padding: "12px 18px",
        border: 0,
        borderBottom: mode === "free" ? "2px solid var(--accent)" : "2px solid transparent",
        background: "transparent",
        color: mode === "free" ? "var(--accent)" : "var(--text-muted)",
        fontWeight: 800,
        fontSize: 12.5,
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx("span", { children: "\u{1F4DD} Lista Libre (Duraci\xF3n Fija)" }),
        /* @__PURE__ */ jsxs("span", { style: {
          background: "var(--bg-elevated)",
          color: "var(--text-dim)",
          padding: "2px 6px",
          borderRadius: 4,
          fontSize: 11
        }, children: [
          filteredMap.length,
          " Prompts"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "ft-modal-body", children: [
      mode === "srt" && /* @__PURE__ */ jsx("div", { onDragOver: (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOverSrt(true);
      }, onDragLeave: (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOverSrt(false);
      }, onDrop: (event) => {
        var dataTransfer;
        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOverSrt(false);
        const from = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).find((from2) => {
          const name = (from2.name || "").toLowerCase();
          return name.endsWith(".srt") || name.endsWith(".vtt") || name.endsWith(".json");
        });
        if (from) {
          handleSrtFile(from);
        }
      }, style: {
        padding: "14px 16px",
        borderRadius: "var(--radius-md)",
        background: isDraggingOverSrt ? "rgba(99, 102, 241, 0.25)" : hasTimedCues ? "rgba(99, 102, 241, 0.12)" : "rgba(245, 158, 11, 0.12)",
        border: isDraggingOverSrt ? "2px dashed var(--accent, #6366f1)" : hasTimedCues ? "1px solid rgba(99, 102, 241, 0.3)" : "1px dashed rgba(245, 158, 11, 0.4)",
        marginBottom: 16,
        transition: "all 0.2s ease"
      }, children: isDraggingOverSrt ? /* @__PURE__ */ jsx("div", { style: {
        textAlign: "center",
        padding: "8px 0",
        color: "#a5b4fc",
        fontWeight: 800,
        fontSize: 13
      }, children: "\u{1F4C4} \xA1Suelta tu archivo .SRT aqu\xED para sincronizar frases!" }) : hasTimedCues ? /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10
      }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { style: {
            fontWeight: 800,
            color: "#e0e7ff",
            fontSize: 13
          }, children: [
            "\u{1F4CA} SRT Activo: ",
            /* @__PURE__ */ jsx("strong", { children: ((captionTrack9 = project.captionTrack) == null ? void 0 : captionTrack9.sourceName) || "Subt\xEDtulos cargados" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            fontSize: 12,
            color: "#a5b4fc",
            marginTop: 2
          }, children: [
            /* @__PURE__ */ jsxs("strong", { children: [
              timedCues.length,
              " escenas / frases detectadas"
            ] }),
            " \xB7 Duraci\xF3n total: ",
            /* @__PURE__ */ jsxs("strong", { children: [
              totalDurationSeconds.toFixed(1),
              " segundos"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            padding: "4px 10px",
            borderRadius: "var(--radius-xs)",
            fontSize: 12,
            fontWeight: 800,
            background: filteredMap.length === timedCues.length ? "var(--success-bg)" : filteredMap.length < timedCues.length ? "var(--warning-bg)" : "rgba(99,102,241,0.2)",
            color: filteredMap.length === timedCues.length ? "var(--success)" : filteredMap.length < timedCues.length ? "var(--warning)" : "#e0e7ff"
          }, children: filteredMap.length === timedCues.length ? "\u2705 " + filteredMap.length + "/" + timedCues.length + " Prompts" : filteredMap.length < timedCues.length ? "\u26A0\uFE0F " + filteredMap.length + "/" + timedCues.length + " Prompts" : "\u2139\uFE0F " + filteredMap.length + " Prompts" }),
          /* @__PURE__ */ jsxs("label", { className: "ghost-button", style: {
            height: 28,
            fontSize: 11,
            cursor: "pointer",
            background: "var(--bg-surface)"
          }, children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: ".srt,text/plain", onChange: handleChange, style: {
              display: "none"
            } }),
            "Cambiar SRT"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10
      }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { style: {
            fontWeight: 800,
            color: "var(--warning)",
            fontSize: 13
          }, children: "\u26A0\uFE0F No hay ning\xFAn archivo SRT cargado todav\xEDa" }),
          /* @__PURE__ */ jsxs("div", { style: {
            fontSize: 12,
            color: "var(--text-muted)",
            marginTop: 2
          }, children: [
            "Arrastra tu archivo ",
            /* @__PURE__ */ jsx("strong", { children: ".SRT" }),
            " aqu\xED o c\xE1rgalo para sincronizar frases y duraciones."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "ghost-button", style: {
          height: 28,
          fontSize: 11,
          cursor: "pointer",
          background: "var(--bg-surface)"
        }, children: [
          /* @__PURE__ */ jsx("input", { type: "file", accept: ".srt,text/plain", onChange: handleChange, style: {
            display: "none"
          } }),
          "\u{1F4C4} Cargar o Arrastrar SRT"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "field", children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6
        }, children: [
          /* @__PURE__ */ jsx("span", { children: mode === "srt" ? "PEGA TUS PROMPTS EN ORDEN (1 L\xCDNEA = 1 FRASE DEL SRT)" : "PROMPTS VISUALES (" + filteredMap.length + " ESCENAS DETECTADAS)" }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            gap: 6
          }, children: [
            mode === "srt" && hasTimedCues && /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick19, className: "ghost-button", style: {
              height: 22,
              padding: "0 8px",
              fontSize: 11,
              background: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              border: "1px solid rgba(99, 102, 241, 0.3)"
            }, children: "\u{1F3AC} Auto-Generar con Director Cinematogr\xE1fico" }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick20, className: "ghost-button", style: {
              height: 22,
              padding: "0 8px",
              fontSize: 11
            }, children: "Cargar plantilla de ejemplo" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("textarea", { rows: "8", value: promptsText, onChange: (event) => setPromptsText(event.target.value), placeholder: mode === "srt" ? "L\xEDnea 1 -> Prompt para la Frase 1 del SRT...\nL\xEDnea 2 -> Prompt para la Frase 2 del SRT...\nL\xEDnea 3 -> Prompt para la Frase 3 del SRT...\n..." : "Toma a\xE9rea de la ciudad...\nPrimer plano del personaje caminando...\nEl personaje entra al laboratorio...", autoFocus: true, style: {
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          lineHeight: 1.6
        } })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "two-fields", style: {
        marginBottom: 12
      }, children: [
        mode === "free" ? /* @__PURE__ */ jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsx("span", { children: "Duraci\xF3n fija por escena (segundos)" }),
          /* @__PURE__ */ jsx("input", { type: "number", min: "1", max: "60", value: defaultDuration, onChange: (event) => setDefaultDuration(Math.max(1, Math.min(60, Number(event.target.value) || 4))) })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "field", children: [
          /* @__PURE__ */ jsx("span", { children: "Duraci\xF3n de escenas" }),
          /* @__PURE__ */ jsxs("div", { style: {
            padding: "10px 12px",
            background: "var(--bg-secondary)",
            borderRadius: "var(--radius-sm)",
            fontSize: 12.5,
            color: "var(--text-secondary)",
            border: "1px solid var(--border)"
          }, children: [
            "\u23F1\uFE0F ",
            /* @__PURE__ */ jsx("strong", { children: "Exacta por frase del SRT" }),
            " (",
            timedCues.length ? "de " + Math.min(...timedCues.map((item) => item.duration)).toFixed(1) + "s a " + Math.max(...timedCues.map((item) => item.duration)).toFixed(1) + "s" : "Autom\xE1tica",
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsx("span", { children: "Efecto de Movimiento" }),
          /* @__PURE__ */ jsx("select", { value: defaultMotion, onChange: (event) => setDefaultMotion(event.target.value), children: ir.map((ir2) => /* @__PURE__ */ jsx("option", { value: ir2.value, children: ir2.label }, ir2.value)) })
        ] })
      ] }),
      mode === "srt" && hasTimedCues && /* @__PURE__ */ jsxs("div", { style: {
        marginBottom: 16
      }, children: [
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setShowPairingTable(!showPairingTable), className: "ghost-button", style: {
          width: "100%",
          height: 30,
          fontSize: 11.5,
          justifyContent: "space-between"
        }, children: [
          /* @__PURE__ */ jsx("span", { children: showPairingTable ? "\u{1F53C} Ocultar emparejamiento con SRT" : "\u{1F53D} Ver tabla de emparejamiento Frase SRT \u27A1\uFE0F Prompt" }),
          /* @__PURE__ */ jsxs("span", { children: [
            timedCues.length,
            " Frases"
          ] })
        ] }),
        showPairingTable && /* @__PURE__ */ jsx("div", { style: {
          maxHeight: 180,
          overflowY: "auto",
          marginTop: 8,
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          background: "var(--bg-base)",
          fontSize: 11.5
        }, children: timedCues.map((item, index) => {
          const matchedPrompt = filteredMap[index];
          return /* @__PURE__ */ jsxs("div", { style: {
            padding: "6px 10px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "grid",
            gridTemplateColumns: "32px 1fr 1fr",
            gap: 8,
            alignItems: "center"
          }, children: [
            /* @__PURE__ */ jsxs("span", { style: {
              color: "var(--text-dim)",
              fontFamily: "var(--font-mono)",
              fontWeight: 800
            }, children: [
              "#",
              String(index + 1).padStart(2, "0")
            ] }),
            /* @__PURE__ */ jsxs("span", { style: {
              color: "#a5b4fc",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, title: item.text, children: [
              '\u{1F5E3}\uFE0F "',
              item.text,
              '" ',
              /* @__PURE__ */ jsxs("small", { style: {
                color: "var(--text-dim)"
              }, children: [
                "(",
                item.duration,
                "s)"
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { style: {
              color: matchedPrompt ? "var(--accent)" : "var(--text-dim)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: matchedPrompt ? "\u{1F3A8} " + matchedPrompt : "(Sin prompt - generable con IA)" })
          ] }, index);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ft-modal-footer", children: [
        /* @__PURE__ */ jsx("button", { type: "button", className: "ghost-button", onClick: onClose, children: "Cancelar" }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "action primary", disabled: mode === "srt" ? !hasTimedCues : !filteredMap.length, style: {
          width: "auto",
          minWidth: 200,
          margin: 0
        }, children: mode === "srt" && hasTimedCues ? "\u26A1 Sincronizar " + timedCues.length + " Escenas con SRT" : replaceExisting ? "Crear " + filteredMap.length + " Escenas" : "A\xF1adir " + filteredMap.length + " Escenas" })
      ] })
    ] })
  ] }) });
};
const _Component5 = ({
  isOpen,
  onClose
}) => {
  const project = w((state) => state.project);
  const assignImagesToScenes = w((state) => state.assignImagesToScenes);
  const [isUploading, setIsUploading] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState("");
  if (!isOpen) {
    return null;
  }
  const handleChange = async (event) => {
    const items30 = Array.from(event.target.files || []);
    if (!items30.length) {
      return;
    }
    items30.sort((a, b) => a.name.localeCompare(b.name, void 0, {
      numeric: true,
      sensitivity: "base"
    }));
    setIsUploading(true);
    setStatusMessage("Subiendo 0 de " + items30.length + " im\xE1genes...");
    const items31 = [];
    try {
      for (let index = 0; index < items30.length; index++) {
        const file = items30[index];
        setStatusMessage("Subiendo " + (index + 1) + " de " + items30.length + ": " + file.name + "...");
        const response = await fetch("/api/import", {
          method: "POST",
          headers: {
            "Content-Type": file.type || "image/jpeg"
          },
          body: file
        });
        const data = await response.json();
        if (response.ok && data != null && data.url) {
          items31.push(data.url);
        }
      }
      assignImagesToScenes(items31);
      onClose();
    } catch (error) {
      alert("Error al subir im\xE1genes: " + error.message);
    } finally {
      setIsUploading(false);
      setStatusMessage("");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "ft-modal-backdrop", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "ft-modal-container", onClick: (event) => event.stopPropagation(), children: [
    /* @__PURE__ */ jsxs("div", { className: "ft-modal-header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "ASIGNACI\xD3N MANUAL" }),
        /* @__PURE__ */ jsx("h2", { children: "\u{1F5BC}\uFE0F Asignar Im\xE1genes Locales en Lote" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "ft-modal-close", onClick: onClose, title: "Cerrar", children: "\u2715" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ft-modal-body", children: [
      /* @__PURE__ */ jsxs("p", { className: "ft-modal-description", children: [
        "Selecciona m\xFAltiples im\xE1genes desde tu computadora. Se subir\xE1n y asignar\xE1n autom\xE1ticamente a tus ",
        /* @__PURE__ */ jsxs("strong", { children: [
          project.scenes.length,
          " escenas"
        ] }),
        " en orden (1\xAA imagen a la escena 1, 2\xAA a la escena 2, etc.)."
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "upload-zone " + (isUploading ? "disabled" : ""), style: {
        minHeight: 120,
        margin: "20px 0"
      }, children: [
        /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", multiple: true, disabled: isUploading, onChange: handleChange }),
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 13,
          marginBottom: 4
        }, children: isUploading ? statusMessage : "\u{1F4C1} Haz clic para seleccionar m\xFAltiples im\xE1genes" }),
        /* @__PURE__ */ jsx("small", { children: "Se ordenar\xE1n autom\xE1ticamente por nombre de archivo (ej: 1.jpg, 2.jpg...)" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ft-modal-footer", children: /* @__PURE__ */ jsx("button", { type: "button", className: "ghost-button", onClick: onClose, disabled: isUploading, children: "Cerrar" }) })
    ] })
  ] }) });
};
const _Component9 = ({
  onSelectScene
}) => {
  var captionTrack;
  var cues;
  const project = w((state) => state.project);
  const selectedId = w((state) => state.selectedId);
  const handleClick21 = w((state) => state.addScene);
  const moveScene = w((state) => state.moveScene);
  const duplicateScene = w((state) => state.duplicateScene);
  w((state) => state.removeScene);
  const toggleSceneImageVisibility = w((state) => state.toggleSceneImageVisibility);
  const toggleSceneCharacter = w((state) => state.toggleSceneCharacter);
  const updateProject = w((state) => state.updateProject);
  const [viewMode, setViewMode] = React.useState("grid");
  const [isPromptsModalOpen, setIsPromptsModalOpen] = React.useState(false);
  const [isBatchImagesModalOpen, setIsBatchImagesModalOpen] = React.useState(false);
  const length = ((cues = (captionTrack = project.captionTrack) == null ? void 0 : captionTrack.cues) == null ? void 0 : cues.length) || 0;
  const handleClick22 = () => {
    var scenes6;
    if ((scenes6 = project.scenes) == null || !scenes6.length) {
      return;
    }
    const shotTypeSuggestions = Xn(project.scenes);
    let convertedCount = 0;
    const scenes7 = project.scenes.map((scene, index) => {
      const suggestion = shotTypeSuggestions[index];
      if ((suggestion == null ? void 0 : suggestion.suggestedShotType) === "B-ROLL" && scene.hasCharacter !== false) {
        convertedCount++;
        const scene10 = qn(scene.script || scene.caption, project.visualStyle);
        return {
          ...scene,
          hasCharacter: false,
          shotType: "B-ROLL",
          prompt: scene.prompt || scene10.prompt,
          motion: scene.motion || scene10.motion
        };
      }
      return scene;
    });
    if (convertedCount > 0) {
      updateProject({
        scenes: scenes7
      });
    }
    window.dispatchEvent(new CustomEvent("flowtube:toast", {
      detail: {
        message: convertedCount > 0 ? "\u{1F3D9}\uFE0F " + convertedCount + " escenas identificadas y configuradas como B-Roll cinem\xE1tico." : "\u2139\uFE0F La secuencia ya tiene un balance \xF3ptimo de A-Roll y B-Roll."
      }
    }));
  };
  return /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "scene-panel", children: [
      /* @__PURE__ */ jsxs("div", { className: "panel-heading", style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 12
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "eyebrow", style: {
              fontSize: 10,
              letterSpacing: "0.1em"
            }, children: "GUION VISUAL" }),
            /* @__PURE__ */ jsxs("h2", { style: {
              margin: 0,
              fontSize: 16,
              fontWeight: 800
            }, children: [
              project.scenes.length,
              " escenas"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 6
          }, children: [
            length > 0 && /* @__PURE__ */ jsxs("span", { onClick: () => setIsPromptsModalOpen(true), style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px",
              borderRadius: 12,
              background: "rgba(91, 140, 255, 0.12)",
              border: "1px solid rgba(91, 140, 255, 0.3)",
              fontSize: 10.5,
              fontWeight: 800,
              color: "var(--accent)",
              cursor: "pointer"
            }, title: "Hacer clic para sincronizar prompts con el guion SRT", children: [
              "\u{1F399}\uFE0F ",
              length,
              " SRT"
            ] }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              background: "rgba(255,255,255,0.06)",
              padding: 2,
              borderRadius: 6,
              border: "1px solid var(--border)"
            }, children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setViewMode("grid"), style: {
                padding: "3px 7px",
                fontSize: 11,
                fontWeight: 800,
                borderRadius: 4,
                border: 0,
                background: viewMode === "grid" ? "var(--accent)" : "transparent",
                color: viewMode === "grid" ? "var(--accent-text)" : "var(--text-dim)",
                cursor: "pointer"
              }, title: "Vista Storyboard en Cuadr\xEDcula", children: "\u2637 Grid" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setViewMode("list"), style: {
                padding: "3px 7px",
                fontSize: 11,
                fontWeight: 800,
                borderRadius: 4,
                border: 0,
                background: viewMode === "list" ? "var(--accent)" : "transparent",
                color: viewMode === "list" ? "var(--accent-text)" : "var(--text-dim)",
                cursor: "pointer"
              }, title: "Vista Lista Compacta", children: "\u2630 Lista" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1.1fr",
          gap: 5,
          width: "100%"
        }, children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsPromptsModalOpen(true), className: "ghost-button", style: {
            padding: 0,
            height: 28,
            fontSize: 10.5,
            fontWeight: 700,
            justifyContent: "center"
          }, title: "Importar lista de prompts o sincronizar con SRT", children: "\u{1F4DD} Prompts" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick22, className: "ghost-button", style: {
            padding: 0,
            height: 28,
            fontSize: 10.5,
            fontWeight: 700,
            justifyContent: "center",
            color: "#38bdf8",
            border: "1px solid rgba(56, 189, 248, 0.25)"
          }, title: "Detectar cortes cinem\xE1ticos B-Roll autom\xE1ticamente a partir del guion", children: "\u{1F3D9}\uFE0F B-Roll IA" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsBatchImagesModalOpen(true), className: "ghost-button", style: {
            padding: 0,
            height: 28,
            fontSize: 10.5,
            fontWeight: 700,
            justifyContent: "center"
          }, title: "Asignar m\xFAltiples im\xE1genes locales en lote", children: "\u{1F5BC}\uFE0F Fotos" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick21, style: {
            height: 28,
            padding: 0,
            fontSize: 11,
            fontWeight: 900,
            background: "var(--accent)",
            color: "var(--accent-text)",
            border: 0,
            borderRadius: 6,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(91,140,255,0.2)"
          }, title: "A\xF1adir una nueva escena manual", children: "+ Escena" })
        ] })
      ] }),
      viewMode === "grid" ? /* @__PURE__ */ jsx("div", { className: "storyboard-grid", children: project.scenes.map((scene, index) => {
        var status;
        const isSelected = selectedId === scene.id;
        const hasError = (status = scene.status) != null && !!status.includes("error") || !!scene.error;
        return /* @__PURE__ */ jsxs("article", { className: "storyboard-card " + (isSelected ? "selected" : "") + " " + (hasError ? "failed" : scene.prompt && !scene.imageUrl && !scene.videoUrl && !scene.status.includes("generating") ? "pending" : ""), onClick: () => onSelectScene(scene.id), children: [
          /* @__PURE__ */ jsxs("div", { className: "storyboard-thumb-container", style: scene.imageHidden ? {
            opacity: 0.45,
            filter: "grayscale(100%)"
          } : void 0, children: [
            /* @__PURE__ */ jsx("span", { className: "storyboard-badge-number", children: String(index + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxs("span", { className: "storyboard-badge-duration", children: [
              scene.duration,
              "s"
            ] }),
            scene.videoUrl || scene.flowVideoUrl ? /* @__PURE__ */ jsx("video", { src: scene.videoUrl || scene.flowVideoUrl, poster: scene.imageUrl || void 0, muted: true, playsInline: true, preload: "metadata" }) : scene.imageUrl ? /* @__PURE__ */ jsx("img", { src: scene.imageUrl, alt: "", loading: "lazy" }) : /* @__PURE__ */ jsx("div", { style: {
              display: "grid",
              placeItems: "center",
              height: "100%",
              color: "var(--text-dim)",
              fontSize: 24,
              fontWeight: 300
            }, children: "+" }),
            scene.imageHidden && /* @__PURE__ */ jsx("i", { className: "scene-failed", style: {
              background: "rgba(239, 68, 68, 0.9)"
            }, title: "Oculta en timeline", children: "\u{1F6AB}" }),
            scene.status.includes("generating") && /* @__PURE__ */ jsx("i", { className: "working", style: scene.status === "prompt-generating" ? {
              borderColor: "var(--accent)"
            } : void 0, title: scene.status === "prompt-generating" ? "Escribiendo prompt..." : "Generando imagen..." }),
            hasError && /* @__PURE__ */ jsx("i", { className: "scene-failed", title: "Error: " + (scene.error || "fallo"), children: "!" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "storyboard-card-body", children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4
            }, children: [
              /* @__PURE__ */ jsx("strong", { className: "storyboard-card-title", title: scene.title, children: scene.title }),
              /* @__PURE__ */ jsx("span", { className: "scene-tag " + (scene.hasCharacter === false ? "b-roll" : "character"), onClick: (event) => {
                event.stopPropagation();
                toggleSceneCharacter(scene.id);
              }, style: {
                cursor: "pointer",
                fontSize: 9,
                padding: "1px 5px"
              }, title: "Clic para alternar entre A-Roll (Personaje) y B-Roll (Entorno/Objeto)", children: scene.hasCharacter === false ? "\u{1F3D9}\uFE0F B-Roll" : "\u{1F464} A-Roll" })
            ] }),
            scene.script && /* @__PURE__ */ jsxs("p", { className: "storyboard-card-script", title: scene.script, children: [
              "\u{1F5E3}\uFE0F ",
              scene.script
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "storyboard-card-actions", children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 4
            }, children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                event.stopPropagation();
                window.dispatchEvent(new CustomEvent("flowtube:regenerate-scene", {
                  detail: {
                    sceneId: scene.id
                  }
                }));
              }, title: "Regenerar con IA", style: {
                color: "#ffd166",
                background: "none",
                border: 0,
                cursor: "pointer",
                padding: "2px 4px",
                fontSize: 13,
                fontWeight: 900
              }, children: "\u26A1" }),
              scene.imageUrl && /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                event.stopPropagation();
                window.dispatchEvent(new CustomEvent("flowtube:generate-video", {
                  detail: {
                    sceneId: scene.id,
                    model: scene.videoModel || "omni"
                  }
                }));
              }, title: "Generar Video con IA", style: {
                color: "#38bdf8",
                background: "none",
                border: 0,
                cursor: "pointer",
                padding: "2px 4px",
                fontSize: 12,
                fontWeight: 900
              }, children: "\u{1F3AC}" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                event.stopPropagation();
                toggleSceneImageVisibility(scene.id);
              }, title: scene.imageHidden ? "Mostrar imagen" : "Ocultar imagen", style: {
                background: "none",
                border: 0,
                cursor: "pointer",
                padding: "2px 4px",
                fontSize: 11
              }, children: scene.imageHidden ? "\u{1F648}" : "\u{1F441}\uFE0F" })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 2
            }, children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                event.stopPropagation();
                moveScene(scene.id, -1);
              }, title: "Mover anterior", style: {
                background: "none",
                border: 0,
                cursor: "pointer",
                color: "var(--text-dim)",
                padding: "2px 3px",
                fontSize: 11
              }, children: "\u2190" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                event.stopPropagation();
                duplicateScene(scene.id);
              }, title: "Duplicar", style: {
                background: "none",
                border: 0,
                cursor: "pointer",
                color: "var(--text-dim)",
                padding: "2px 3px",
                fontSize: 11
              }, children: "\u2295" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                event.stopPropagation();
                moveScene(scene.id, 1);
              }, title: "Mover siguiente", style: {
                background: "none",
                border: 0,
                cursor: "pointer",
                color: "var(--text-dim)",
                padding: "2px 3px",
                fontSize: 11
              }, children: "\u2192" })
            ] })
          ] })
        ] }, scene.id);
      }) }) : /* @__PURE__ */ jsx("div", { className: "scene-list", children: project.scenes.map((scene, index) => {
        var status;
        var motion;
        const isSelected = selectedId === scene.id;
        const hasError = (status = scene.status) != null && !!status.includes("error") || !!scene.error;
        return /* @__PURE__ */ jsxs("article", { className: "scene-row " + (isSelected ? "selected" : "") + " " + (hasError ? "failed" : scene.prompt && !scene.imageUrl && !scene.videoUrl && !scene.status.includes("generating") ? "pending" : ""), onClick: () => onSelectScene(scene.id), children: [
          /* @__PURE__ */ jsx("span", { className: "scene-number", children: String(index + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsxs("div", { className: "scene-thumb", style: scene.imageHidden ? {
            opacity: 0.45,
            filter: "grayscale(100%)"
          } : void 0, children: [
            scene.videoUrl || scene.flowVideoUrl ? /* @__PURE__ */ jsx("video", { src: scene.videoUrl || scene.flowVideoUrl, poster: scene.imageUrl || void 0, muted: true, playsInline: true, preload: "metadata" }) : scene.imageUrl ? /* @__PURE__ */ jsx("img", { src: scene.imageUrl, alt: "" }) : /* @__PURE__ */ jsx("span", { style: {
              fontSize: 18,
              color: "var(--text-dim)"
            }, children: "+" }),
            scene.imageHidden && /* @__PURE__ */ jsx("i", { className: "scene-failed", style: {
              background: "rgba(239, 68, 68, 0.9)"
            }, title: "Imagen oculta en timeline", children: "\u{1F6AB}" }),
            scene.status.includes("generating") && /* @__PURE__ */ jsx("i", { className: "working", style: scene.status === "prompt-generating" ? {
              borderColor: "var(--accent)"
            } : void 0, title: scene.status === "prompt-generating" ? "Escribiendo prompt con IA..." : "Generando imagen con Flow..." }),
            hasError && /* @__PURE__ */ jsx("i", { className: "scene-failed", title: "Error: " + (scene.error || "fallo"), children: "!" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "scene-row-copy", children: [
            /* @__PURE__ */ jsx("strong", { className: "scene-row-title", title: scene.title, children: scene.title }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
              margin: "2px 0"
            }, children: [
              /* @__PURE__ */ jsx("span", { className: "scene-tag " + (scene.hasCharacter === false ? "b-roll" : "character"), onClick: (event) => {
                event.stopPropagation();
                toggleSceneCharacter(scene.id);
              }, style: {
                cursor: "pointer"
              }, title: "Clic para alternar entre A-Roll (Personaje) y B-Roll (Entorno/Objeto)", children: scene.hasCharacter === false ? "\u{1F3D9}\uFE0F B-Roll" : "\u{1F464} A-Roll" }),
              /* @__PURE__ */ jsx("span", { className: "scene-row-meta", children: scene.status === "prompt-generating" ? /* @__PURE__ */ jsx("span", { style: {
                color: "var(--accent)",
                fontWeight: 700
              }, children: "\u2728 Prompt IA..." }) : /* @__PURE__ */ jsxs("span", { children: [
                scene.duration,
                "s \xB7 ",
                ((motion = scene.motion) == null ? void 0 : motion.replace("-", " ")) || "zoom"
              ] }) })
            ] }),
            scene.script && /* @__PURE__ */ jsxs("div", { className: "scene-row-script", title: scene.script, children: [
              '\u{1F5E3}\uFE0F "',
              scene.script,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "scene-order", children: [
            /* @__PURE__ */ jsx("button", { onClick: (event) => {
              event.stopPropagation();
              window.dispatchEvent(new CustomEvent("flowtube:regenerate-scene", {
                detail: {
                  sceneId: scene.id
                }
              }));
            }, title: "Regenerar imagen con IA", style: {
              color: "#ffd166",
              fontWeight: 900
            }, children: "\u26A1" }),
            scene.imageUrl && /* @__PURE__ */ jsx("button", { onClick: (event) => {
              event.stopPropagation();
              window.dispatchEvent(new CustomEvent("flowtube:generate-video", {
                detail: {
                  sceneId: scene.id,
                  model: scene.videoModel || "omni"
                }
              }));
            }, title: "Generar Video con IA (" + (scene.videoModel === "veo-3.1-lite" ? "Veo 3.1 Lite" : "Omni Flash") + ")", style: {
              color: "#38bdf8",
              fontWeight: 900
            }, children: "\u{1F3AC}" }),
            /* @__PURE__ */ jsx("button", { onClick: (event) => {
              event.stopPropagation();
              toggleSceneImageVisibility(scene.id);
            }, title: scene.imageHidden ? "Mostrar imagen" : "Ocultar imagen", children: scene.imageHidden ? "\u{1F648}" : "\u{1F441}\uFE0F" }),
            /* @__PURE__ */ jsx("button", { onClick: (event) => {
              event.stopPropagation();
              moveScene(scene.id, -1);
            }, title: "Mover arriba", children: "\u2191" }),
            /* @__PURE__ */ jsx("button", { onClick: (event) => {
              event.stopPropagation();
              duplicateScene(scene.id);
            }, title: "Duplicar (Ctrl+D)", children: "\u2295" }),
            /* @__PURE__ */ jsx("button", { onClick: (event) => {
              event.stopPropagation();
              moveScene(scene.id, 1);
            }, title: "Mover abajo", children: "\u2193" })
          ] })
        ] }, scene.id);
      }) })
    ] }),
    /* @__PURE__ */ jsx(_Component4, { isOpen: isPromptsModalOpen, onClose: () => setIsPromptsModalOpen(false) }),
    /* @__PURE__ */ jsx(_Component5, { isOpen: isBatchImagesModalOpen, onClose: () => setIsBatchImagesModalOpen(false) })
  ] });
};
const ur = [{
  value: "gentle-zoom-in",
  label: "\u{1F33F} Zoom de Entrada Suave"
}, {
  value: "gentle-zoom-out",
  label: "\u{1F33F} Zoom de Salida Suave"
}, {
  value: "zoom-in",
  label: "\u{1F50D} Zoom In Cinem\xE1tico"
}, {
  value: "zoom-out",
  label: "\u{1F50E} Zoom Out Cinem\xE1tico"
}, {
  value: "pan-left",
  label: "\u2B05\uFE0F Paneo Suave Izquierda"
}, {
  value: "pan-right",
  label: "\u27A1\uFE0F Paneo Suave Derecha"
}, {
  value: "pan-up",
  label: "\u2B06\uFE0F Ascenso Suave"
}, {
  value: "pan-down",
  label: "\u2B07\uFE0F Descenso Suave"
}, {
  value: "drift-left-right",
  label: "\u{1F30A} Deriva Izquierda \u2192 Derecha"
}, {
  value: "drift-right-left",
  label: "\u{1F30A} Deriva Derecha \u2192 Izquierda"
}, {
  value: "cinematic-arc-left",
  label: "\u{1F3A5} Arco Cinem\xE1tico Izquierdo"
}, {
  value: "cinematic-arc-right",
  label: "\u{1F3A5} Arco Cinem\xE1tico Derecho"
}, {
  value: "soft-orbit-left",
  label: "\u{1FA90} \xD3rbita Suave Izquierda"
}, {
  value: "soft-orbit-right",
  label: "\u{1FA90} \xD3rbita Suave Derecha"
}, {
  value: "zoom-pan-top-left",
  label: "\u2196\uFE0F Zoom Diagonal Sup. Izq."
}, {
  value: "zoom-pan-top-right",
  label: "\u2197\uFE0F Zoom Diagonal Sup. Der."
}, {
  value: "zoom-pan-bottom-left",
  label: "\u2199\uFE0F Zoom Diagonal Inf. Izq."
}, {
  value: "zoom-pan-bottom-right",
  label: "\u2198\uFE0F Zoom Diagonal Inf. Der."
}, {
  value: "breathe",
  label: "\u{1FAC1} Respiraci\xF3n Sutil"
}, {
  value: "floating",
  label: "\u2601\uFE0F Flotaci\xF3n Suave"
}, {
  value: "camera-tilt-left",
  label: "\u{1F4D0} Inclinaci\xF3n Suave Izquierda"
}, {
  value: "camera-tilt-right",
  label: "\u{1F4D0} Inclinaci\xF3n Suave Derecha"
}, {
  value: "slow-drift",
  label: "\u{1F343} Deriva Lenta"
}, {
  value: "whip-zoom-in",
  label: "\u{1F3AC} Acercamiento Progresivo"
}, {
  value: "still",
  label: "\u23F9\uFE0F Est\xE1tico (Sin Movimiento)"
}, {
  value: "custom",
  label: "\u{1F6E0}\uFE0F Keyframes Personalizados (Pro)"
}];
const pr = [{
  value: "'Geist Variable', system-ui, sans-serif",
  label: "Geist (Minimalista / FuseClip)"
}, {
  value: "'Inter', sans-serif",
  label: "Inter (Moderno / YouTube)"
}, {
  value: "'Montserrat', sans-serif",
  label: "Montserrat (Negrita Impacto)"
}, {
  value: "'Impact', sans-serif",
  label: "Impact (Hormozi / Viral)"
}, {
  value: "Arial, sans-serif",
  label: "Arial (Cl\xE1sico Limpio)"
}, {
  value: "'Trebuchet MS', sans-serif",
  label: "Trebuchet (Din\xE1mico)"
}, {
  value: "'Courier New', monospace",
  label: "Courier (C\xF3digo / Retro)"
}];
const mr = [{
  value: "viral-yellow-pop",
  label: "\u{1F7E1} Viral Gold Pop (TikTok / Shorts)"
}, {
  value: "claude-kinetic-reveal",
  label: "\u{1F3AC} Claude Kinetic (Slide + Resalte Dorado)"
}, {
  value: "char-slide-highlight",
  label: "\u2728 Kinetic Char Slide (Letra por letra)"
}, {
  value: "soft-scale",
  label: "\u{1FAE7} SoftScale (Escala suave)"
}, {
  value: "pop-up",
  label: "\u2B06\uFE0F PopUp (Entrada el\xE1stica)"
}, {
  value: "karaoke",
  label: "\u{1F3A4} Karaoke Ne\xF3n (Alex Hormozi)"
}, {
  value: "hormozi-pill",
  label: "\u{1F7E1} Hormozi Highlight Pill (Caja de resalte)"
}, {
  value: "hormozi",
  label: "\u{1F4A5} Pop-In Bounce (TikTok / Reels)"
}, {
  value: "word-underline",
  label: "\u270D\uFE0F Subrayado Palabra Activa"
}, {
  value: "minimal-lower-third",
  label: "\u{1FA9F} Lower Third Minimal Glass"
}, {
  value: "documentary-serif",
  label: "\u{1F39E}\uFE0F Documental Serif Elegante"
}, {
  value: "typewriter",
  label: "\u2328\uFE0F M\xE1quina de Escribir"
}, {
  value: "boxed-modern",
  label: "\u2B1C Caja Moderna Editorial"
}, {
  value: "gradient-pop",
  label: "\u{1F308} Gradiente Suave"
}, {
  value: "word-zoom",
  label: "\u{1F50E} Foco por Palabra"
}, {
  value: "kinetic-stagger",
  label: "\u{1FA9C} Entrada Escalonada"
}, {
  value: "wave-jump",
  label: "\u{1F30A} Onda de Palabras"
}, {
  value: "cyber-glitch",
  label: "\u{1F916} Cyber Glitch"
}, {
  value: "fire-glow",
  label: "\u{1F525} Fire Glow"
}, {
  value: "slide",
  label: "\u2B06\uFE0F Slide Up Suave"
}, {
  value: "cinematic-fade",
  label: "\u{1F3AC} Cinematic Fade (Documental)"
}, {
  value: "clean",
  label: "\u26A1 Minimalista"
}];
const hr = [{
  id: "viral-gold",
  label: "\u{1F7E1} Viral Gold",
  color: "#ffffff",
  highlightColor: "#FFD700",
  outlineColor: "#000000"
}, {
  id: "classic",
  label: "Cl\xE1sico",
  color: "#ffffff",
  highlightColor: "#d7ff4f",
  outlineColor: "#08090d"
}, {
  id: "electric",
  label: "El\xE9ctrico",
  color: "#f4f7ff",
  highlightColor: "#62d9ff",
  outlineColor: "#08111f"
}, {
  id: "sunset",
  label: "Atardecer",
  color: "#fff7ed",
  highlightColor: "#ff8a5b",
  outlineColor: "#24100d"
}, {
  id: "gold",
  label: "Dorado",
  color: "#fffbea",
  highlightColor: "#ffd166",
  outlineColor: "#21180a"
}, {
  id: "violet",
  label: "Violeta",
  color: "#f8f5ff",
  highlightColor: "#b58cff",
  outlineColor: "#140d24"
}, {
  id: "mono",
  label: "Monocromo",
  color: "#ffffff",
  highlightColor: "#aeb9cb",
  outlineColor: "#10131b"
}];
const gr = [{
  value: "gemini-3-flash-preview",
  label: "Texto: Gemini 3.0 Flash"
}, {
  value: "gemini-2.5-flash",
  label: "Texto: Gemini 2.5 Flash"
}, {
  value: "gemini-2.0-flash",
  label: "Texto: Gemini 2.0 Flash"
}];
const fr = [{
  value: "nano-banana-2-lite",
  label: "Imagen: Nano Banana 2 Lite (R\xE1pido)"
}, {
  value: "nano-banana-2",
  label: "Imagen: Nano Banana 2 (Calidad)"
}, {
  value: "nano-banana-pro",
  label: "Imagen: Nano Pro"
}];
const Ta = [{
  value: "veo-3.1-lite",
  label: "Veo 3.1 Lite",
  detail: "Lower Priority \xB7 8 s"
}, {
  value: "omni",
  label: "Omni Flash",
  detail: "R\xE1pido \xB7 4 a 10 s"
}];
const br = [4, 6, 8, 10];
const mt = [{
  value: "none",
  label: "Sin transici\xF3n"
}, {
  value: "fade",
  label: "Desvanecimiento suave"
}, {
  value: "slide-left",
  label: "Deslizar a la izquierda"
}, {
  value: "slide-right",
  label: "Deslizar a la derecha"
}, {
  value: "zoom",
  label: "Zoom suave"
}, {
  value: "wipe",
  label: "Barrido"
}];
const xr = [{
  value: "western-anime",
  label: "2D C\xF3mic / Webtoon"
}, {
  value: "stickman-2d",
  label: "2D Infogr\xE1fico editorial"
}, {
  value: "cinematico",
  label: "Cinem\xE1tico realista"
}, {
  value: "anime",
  label: "Anime / Manga"
}, {
  value: "pixel-art",
  label: "Pixel Art 8-bit"
}, {
  value: "stickman",
  label: "Stickman cl\xE1sico"
}, {
  value: "stickman-dark",
  label: "Stickman Dark"
}, {
  value: "low-poly",
  label: "Low Poly 3D"
}, {
  value: "salud",
  label: "Ilustraci\xF3n m\xE9dica"
}, {
  value: "fantasia",
  label: "Fantas\xEDa \xE9pica"
}, {
  value: "realista",
  label: "Fotograf\xEDa realista"
}];
const Tt = ({
  value,
  options,
  onChange,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const divRef = React.useRef(null);
  const found = options.find((item) => String(item.value) === String(value)) || options[0];
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleOutsideClick = (event) => {
      var current;
      if ((current = divRef.current) == null || !current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isOpen]);
  return /* @__PURE__ */ jsxs("div", { ref: divRef, className: "styled-dropdown " + (isOpen ? "open" : "") + " " + (disabled ? "disabled" : ""), children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: "styled-dropdown-trigger", disabled, onClick: () => setIsOpen((prev) => !prev), "aria-haspopup": "listbox", "aria-expanded": isOpen, children: [
      /* @__PURE__ */ jsx("span", { children: (found == null ? void 0 : found.label) || "Seleccionar" }),
      /* @__PURE__ */ jsx("i", { children: "\u2304" })
    ] }),
    isOpen ? /* @__PURE__ */ jsx("div", { className: "styled-dropdown-menu", role: "listbox", children: options.map((item) => /* @__PURE__ */ jsxs("button", { type: "button", className: String(item.value) === String(value) ? "selected" : "", onClick: () => {
      onChange(item.value);
      setIsOpen(false);
    }, role: "option", "aria-selected": String(item.value) === String(value), children: [
      /* @__PURE__ */ jsx("span", { children: item.label }),
      item.detail ? /* @__PURE__ */ jsx("small", { children: item.detail }) : null
    ] }, item.value)) }) : null
  ] });
};
const _Component6 = ({
  selected,
  project,
  scenes,
  updateScene,
  removeScene,
  updateProject,
  addStyleReference,
  removeStyleReference,
  setTransitionDefaults,
  applyTransitionToAll,
  flowState,
  isVideoGenerating,
  onUploadImage,
  onGenerateImage,
  onGenerateVideo,
  onOpenBatchPromptsModal,
  onTranscribeAudio
}) => {
  var ta2;
  var prompt;
  var videoPrompt;
  var customMotion2;
  var customMotion3;
  var customMotion4;
  var customMotion5;
  var customMotion6;
  var customMotion7;
  var customMotion8;
  var customMotion9;
  var customMotion10;
  var customMotion11;
  var customMotion12;
  var customMotion13;
  var customMotion14;
  var customMotion15;
  var customMotion16;
  var mt2;
  const [isCharacterRefDragOver, setIsCharacterRefDragOver] = React.useState(false);
  const [isStyleRef0DragOver, setIsStyleRef0DragOver] = React.useState(false);
  const [isStyleRef1DragOver, setIsStyleRef1DragOver] = React.useState(false);
  const [collapsedSections, setCollapsedSections] = React.useState({
    styleRefs: false,
    prompt: false,
    videoGen: false,
    sceneAudio: false
  });
  const toggleSection = (sectionKey) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };
  const styleReferences = Array.isArray(project.styleReferences) ? project.styleReferences : [];
  const videoModel = (selected == null ? void 0 : selected.videoModel) === "omni" ? "omni" : "veo-3.1-lite";
  const videoDuration = videoModel === "veo-3.1-lite" ? 8 : [4, 6, 8, 10].includes(Number(selected == null ? void 0 : selected.videoDuration)) ? Number(selected.videoDuration) : 8;
  const label = ((ta2 = Ta.find((ta3) => ta3.value === videoModel)) == null ? void 0 : ta2.label) || "Veo 3.1 Lite";
  const defaultTransition = mt.some((mt3) => {
    var transitions;
    return mt3.value === ((transitions = project.transitions) == null ? void 0 : transitions.default);
  }) ? project.transitions.default : "fade";
  const transition = (selected == null ? void 0 : selected.transition) === "inherit" || !mt.some((mt3) => mt3.value === (selected == null ? void 0 : selected.transition)) ? "inherit" : selected.transition;
  const resolveRefUrl = (characterReference) => characterReference ? characterReference.url && !characterReference.url.startsWith("blob:") ? characterReference.url : characterReference.base64 ? "data:" + (characterReference.mimeType || "image/jpeg") + ";base64," + characterReference.base64 : characterReference.url || "" : "";
  const fileToReference = async (file) => {
    var type6;
    if (!file || (type6 = file.type) == null || !type6.startsWith("image/")) {
      return null;
    }
    const uint8Array = new Uint8Array(await file.arrayBuffer());
    const chunkSize = 32768;
    let binary = "";
    for (let index = 0; index < uint8Array.length; index += chunkSize) {
      binary += String.fromCharCode(...uint8Array.subarray(index, index + chunkSize));
    }
    const base64 = btoa(binary);
    const type7 = file.type || "image/jpeg";
    const dataUrl = "data:" + type7 + ";base64," + base64;
    return {
      id: crypto.randomUUID(),
      name: file.name,
      url: dataUrl,
      base64,
      mimeType: type7
    };
  };
  const handleCharacterRefUpload = async (from) => {
    const reference = await fileToReference(from);
    if (reference) {
      updateProject({
        characterReference: {
          url: reference.url,
          name: reference.name,
          base64: reference.base64,
          mimeType: reference.mimeType
        }
      });
    }
  };
  const handleStyleRefUpload = async (from2, from3 = 0) => {
    const reference = await fileToReference(from2);
    if (!reference) {
      return;
    }
    const items = [...styleReferences];
    if (items[from3]) {
      items[from3] = reference;
      updateProject({
        styleReferences: items
      });
    } else {
      addStyleReference(reference);
    }
  };
  if (selected) {
    return /* @__PURE__ */ jsxs("div", { className: "tab-pane", children: [
      /* @__PURE__ */ jsxs("div", { className: "pane-header", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "ESCENA SELECCIONADA" }),
          /* @__PURE__ */ jsx("h3", { children: selected.title })
        ] }),
        scenes.length > 1 ? /* @__PURE__ */ jsx("button", { className: "del-scene-btn", onClick: () => removeScene(selected.id), title: "Eliminar escena", children: "\xD7" }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inspector-accordion-card", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: "accordion-header-btn", onClick: () => toggleSection("styleRefs"), children: [
          /* @__PURE__ */ jsxs("div", { className: "accordion-title-group", children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 13
            }, children: "\u{1F3A8}" }),
            /* @__PURE__ */ jsx("h4", { children: "Estilo Visual & Referencias" }),
            /* @__PURE__ */ jsxs("span", { className: "char-count", style: {
              fontSize: 10,
              background: "rgba(255,255,255,0.06)",
              padding: "1px 6px",
              borderRadius: 4
            }, children: [
              (project.characterReference ? 1 : 0) + styleReferences.length,
              "/3 Activas"
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "accordion-chevron " + (collapsedSections.styleRefs ? "collapsed" : "expanded"), children: "\u25BC" })
        ] }),
        !collapsedSections.styleRefs && /* @__PURE__ */ jsxs("div", { className: "accordion-content-body", children: [
          /* @__PURE__ */ jsx("div", { className: "form-group", style: {
            marginBottom: 10
          }, children: /* @__PURE__ */ jsxs("select", { className: "form-select", value: project.visualStyle || "cinematico", onChange: (event) => updateProject({
            visualStyle: event.target.value
          }), style: {
            height: 32,
            fontSize: 11.5,
            fontWeight: 700
          }, children: [
            xr.map((xr2) => /* @__PURE__ */ jsx("option", { value: xr2.value, children: xr2.label }, xr2.value)),
            styleReferences.length > 0 ? /* @__PURE__ */ jsxs("option", { value: "custom-style", children: [
              "\u2728 Estilo con ",
              styleReferences.length,
              " referencia(s)"
            ] }) : null
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "reference-slots-grid", children: [
            (() => {
              const characterRefUrl = resolveRefUrl(project.characterReference);
              return /* @__PURE__ */ jsxs("div", { className: "ref-slot-card " + (characterRefUrl ? "has-image" : "") + " " + (isCharacterRefDragOver ? "is-dragover" : ""), onDragOver: (event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsCharacterRefDragOver(true);
              }, onDragLeave: (event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsCharacterRefDragOver(false);
              }, onDrop: async (event) => {
                var dataTransfer;
                event.preventDefault();
                event.stopPropagation();
                setIsCharacterRefDragOver(false);
                const from = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).find((from2) => {
                  var type;
                  if ((type = from2.type) == null) {
                    return void 0;
                  } else {
                    return type.startsWith("image/");
                  }
                });
                if (from) {
                  handleCharacterRefUpload(from);
                }
              }, children: [
                /* @__PURE__ */ jsxs("div", { className: "ref-slot-header", children: [
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-title", children: "PERSONAJE" }),
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-badge", children: "Avatar" })
                ] }),
                characterRefUrl ? /* @__PURE__ */ jsxs("div", { className: "ref-slot-preview", children: [
                  /* @__PURE__ */ jsx("img", { src: characterRefUrl, alt: "Avatar de Referencia", onError: (event) => {
                    var characterReference;
                    if ((characterReference = project.characterReference) != null && characterReference.base64) {
                      event.currentTarget.src = "data:" + (project.characterReference.mimeType || "image/jpeg") + ";base64," + project.characterReference.base64;
                    }
                  } }),
                  /* @__PURE__ */ jsx("button", { type: "button", className: "ref-slot-del-btn", onClick: (event) => {
                    event.stopPropagation();
                    updateProject({
                      characterReference: null
                    });
                  }, title: "Quitar referencia de personaje", children: "\xD7" })
                ] }) : /* @__PURE__ */ jsxs("label", { className: "ref-slot-empty", children: [
                  /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: (event) => {
                    var files;
                    if ((files = event.target.files) != null && files[0]) {
                      handleCharacterRefUpload(event.target.files[0]);
                    }
                  }, style: {
                    display: "none"
                  } }),
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-icon", children: "\u{1F464}" }),
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-label", children: "+ Avatar" }),
                  /* @__PURE__ */ jsx("small", { className: "ref-slot-hint", children: "Arrastra aqu\xED" })
                ] })
              ] });
            })(),
            (() => {
              const styleRef0Url = resolveRefUrl(styleReferences[0]);
              return /* @__PURE__ */ jsxs("div", { className: "ref-slot-card " + (styleRef0Url ? "has-image" : "") + " " + (isStyleRef0DragOver ? "is-dragover" : ""), onDragOver: (event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef0DragOver(true);
              }, onDragLeave: (event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef0DragOver(false);
              }, onDrop: async (event) => {
                var dataTransfer;
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef0DragOver(false);
                const from = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).find((from2) => {
                  var type;
                  if ((type = from2.type) == null) {
                    return void 0;
                  } else {
                    return type.startsWith("image/");
                  }
                });
                if (from) {
                  handleStyleRefUpload(from, 0);
                }
              }, children: [
                /* @__PURE__ */ jsxs("div", { className: "ref-slot-header", children: [
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-title", children: "STYLE" }),
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-badge", children: "Arte" })
                ] }),
                styleRef0Url ? /* @__PURE__ */ jsxs("div", { className: "ref-slot-preview", children: [
                  /* @__PURE__ */ jsx("img", { src: styleRef0Url, alt: "Referencia de Estilo", onError: (event) => {
                    var styleRef0;
                    if ((styleRef0 = styleReferences[0]) != null && styleRef0.base64) {
                      event.currentTarget.src = "data:" + (styleReferences[0].mimeType || "image/jpeg") + ";base64," + styleReferences[0].base64;
                    }
                  } }),
                  /* @__PURE__ */ jsx("button", { type: "button", className: "ref-slot-del-btn", onClick: (event) => {
                    event.stopPropagation();
                    removeStyleReference(styleReferences[0].id);
                  }, title: "Quitar referencia de estilo", children: "\xD7" })
                ] }) : /* @__PURE__ */ jsxs("label", { className: "ref-slot-empty", children: [
                  /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: (event) => {
                    var files;
                    if ((files = event.target.files) != null && files[0]) {
                      handleStyleRefUpload(event.target.files[0], 0);
                    }
                  }, style: {
                    display: "none"
                  } }),
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-icon", children: "\u{1F3A8}" }),
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-label", children: "+ Estilo" }),
                  /* @__PURE__ */ jsx("small", { className: "ref-slot-hint", children: "Arrastra aqu\xED" })
                ] })
              ] });
            })(),
            (() => {
              const styleRef1Url = resolveRefUrl(styleReferences[1]);
              return /* @__PURE__ */ jsxs("div", { className: "ref-slot-card " + (styleRef1Url ? "has-image" : "") + " " + (isStyleRef1DragOver ? "is-dragover" : ""), onDragOver: (event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef1DragOver(true);
              }, onDragLeave: (event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef1DragOver(false);
              }, onDrop: async (event) => {
                var dataTransfer;
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef1DragOver(false);
                const from = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).find((from2) => {
                  var type;
                  if ((type = from2.type) == null) {
                    return void 0;
                  } else {
                    return type.startsWith("image/");
                  }
                });
                if (from) {
                  handleStyleRefUpload(from, 1);
                }
              }, children: [
                /* @__PURE__ */ jsxs("div", { className: "ref-slot-header", children: [
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-title", children: "AMBIENTE" }),
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-badge", children: "Fondo" })
                ] }),
                styleRef1Url ? /* @__PURE__ */ jsxs("div", { className: "ref-slot-preview", children: [
                  /* @__PURE__ */ jsx("img", { src: styleRef1Url, alt: "Referencia de Ambiente", onError: (event) => {
                    var styleRef1;
                    if ((styleRef1 = styleReferences[1]) != null && styleRef1.base64) {
                      event.currentTarget.src = "data:" + (styleReferences[1].mimeType || "image/jpeg") + ";base64," + styleReferences[1].base64;
                    }
                  } }),
                  /* @__PURE__ */ jsx("button", { type: "button", className: "ref-slot-del-btn", onClick: (event) => {
                    event.stopPropagation();
                    removeStyleReference(styleReferences[1].id);
                  }, title: "Quitar referencia de ambiente", children: "\xD7" })
                ] }) : /* @__PURE__ */ jsxs("label", { className: "ref-slot-empty", children: [
                  /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: (event) => {
                    var files;
                    if ((files = event.target.files) != null && files[0]) {
                      handleStyleRefUpload(event.target.files[0], 1);
                    }
                  }, style: {
                    display: "none"
                  } }),
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-icon", children: "\u{1F3DE}\uFE0F" }),
                  /* @__PURE__ */ jsx("span", { className: "ref-slot-label", children: "+ Ambiente" }),
                  /* @__PURE__ */ jsx("small", { className: "ref-slot-hint", children: "Arrastra aqu\xED" })
                ] })
              ] });
            })()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inspector-accordion-card", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: "accordion-header-btn", onClick: () => toggleSection("prompt"), children: [
          /* @__PURE__ */ jsxs("div", { className: "accordion-title-group", children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 13
            }, children: "\u{1F4DD}" }),
            /* @__PURE__ */ jsx("h4", { children: "Prompt Visual & Imagen" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "accordion-chevron " + (collapsedSections.prompt ? "collapsed" : "expanded"), children: "\u25BC" })
        ] }),
        !collapsedSections.prompt && /* @__PURE__ */ jsxs("div", { className: "accordion-content-body", children: [
          /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
            marginBottom: 10
          }, children: [
            /* @__PURE__ */ jsx("label", { style: {
              fontSize: 11,
              fontWeight: 700,
              color: "#94a3b8"
            }, children: "T\xEDtulo de Escena" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: selected.title, onChange: (event) => updateScene(selected.id, {
              title: event.target.value
            }), className: "form-input" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
            marginBottom: 10
          }, children: [
            /* @__PURE__ */ jsxs("div", { className: "label-row", style: {
              marginBottom: 4
            }, children: [
              /* @__PURE__ */ jsx("label", { style: {
                fontSize: 11,
                fontWeight: 700,
                color: "#94a3b8"
              }, children: "Descripci\xF3n de Escena (Prompt)" }),
              /* @__PURE__ */ jsxs("span", { className: "char-count", style: {
                fontSize: 10
              }, children: [
                ((prompt = selected.prompt) == null ? void 0 : prompt.length) || 0,
                " car"
              ] })
            ] }),
            /* @__PURE__ */ jsx("textarea", { value: selected.prompt || "", onChange: (event) => updateScene(selected.id, {
              prompt: event.target.value
            }), placeholder: "Describe la escena en detalle (sujeto, acci\xF3n, c\xE1mara, iluminaci\xF3n, fondo)...", rows: 2, className: "form-textarea", style: {
              minHeight: 48,
              maxHeight: 110,
              resize: "vertical"
            } }),
            /* @__PURE__ */ jsx("div", { style: {
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 4
            }, children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: onOpenBatchPromptsModal, style: {
              background: "transparent",
              border: "none",
              color: "var(--accent, #6366f1)",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 4px"
            }, title: "Abrir editor masivo para ver y escribir todos los prompts", children: [
              "Ver prompts de todas las escenas (",
              scenes.length,
              ") \u2192"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "action-button-group", children: [
            /* @__PURE__ */ jsx("button", { className: "btn-primary-action", onClick: () => {
              var electronAPI;
              if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
                window.electronAPI.openGoogleFlow();
                return;
              }
              if (onGenerateImage != null) {
                onGenerateImage(selected);
              }
            }, disabled: !!selected.operationId || selected.status === "image-generating", title: flowState.connected ? "Generar imagen para esta escena con Google Flow" : "Conectar Google Flow para generar", children: selected.status === "image-generating" ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "working", style: {
                width: 14,
                height: 14,
                borderWidth: 2
              } }),
              /* @__PURE__ */ jsx("span", { children: "Generando Imagen con Flow..." })
            ] }) : /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "button-prefix", children: "AI" }),
              /* @__PURE__ */ jsx("span", { children: "Generar imagen" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "btn-row-dual", children: [
              /* @__PURE__ */ jsxs("label", { className: "btn-secondary-action", style: {
                cursor: "pointer"
              }, title: "Reemplazar la imagen o video de esta escena desde tu PC", children: [
                /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*,video/*,.mp4,.webm,.mov,.m4v,.mkv,.png,.jpg,.jpeg,.webp", onChange: (event) => {
                  var files;
                  if (onUploadImage == null) {
                    return void 0;
                  } else {
                    return onUploadImage(selected, (files = event.target.files) == null ? void 0 : files[0]);
                  }
                }, style: {
                  display: "none"
                } }),
                "\u{1F4C1} Reemplazar (PC)"
              ] }),
              /* @__PURE__ */ jsx("button", { className: "btn-secondary-action", onClick: () => onGenerateVideo == null ? void 0 : onGenerateVideo(selected), disabled: !selected.imageUrl || !!selected.operationId || isVideoGenerating, title: "Convertir esta imagen en video con " + label, children: selected.status === "video-generating" ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "working", style: {
                  width: 12,
                  height: 12,
                  borderWidth: 2
                } }),
                " ",
                label,
                "..."
              ] }) : "Convertir a video" })
            ] }),
            selected.error && /* @__PURE__ */ jsxs("div", { style: {
              marginTop: 10,
              padding: "8px 12px",
              borderRadius: 6,
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#fca5a5",
              fontSize: 11,
              lineHeight: 1.45,
              display: "flex",
              alignItems: "flex-start",
              gap: 8
            }, children: [
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 14,
                flexShrink: 0
              }, children: "\u26A0\uFE0F" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { style: {
                  color: "#f87171"
                }, children: "Aviso:" }),
                " ",
                selected.error
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inspector-accordion-card", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: "accordion-header-btn", onClick: () => toggleSection("videoGen"), children: [
          /* @__PURE__ */ jsxs("div", { className: "accordion-title-group", children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 13
            }, children: "\u{1F3AC}" }),
            /* @__PURE__ */ jsx("h4", { children: "Imagen a Video & Animaci\xF3n" }),
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10,
              background: "rgba(99, 102, 241, 0.18)",
              color: "#c7d2fe",
              padding: "1px 6px",
              borderRadius: 4,
              fontWeight: 700
            }, children: label })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "accordion-chevron " + (collapsedSections.videoGen ? "collapsed" : "expanded"), children: "\u25BC" })
        ] }),
        !collapsedSections.videoGen && /* @__PURE__ */ jsxs("div", { className: "accordion-content-body", children: [
          /* @__PURE__ */ jsxs("div", { className: "video-model-card", style: {
            marginTop: 0
          }, children: [
            /* @__PURE__ */ jsxs("div", { className: "video-model-card-head", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { children: "IMAGEN \u2192 VIDEO" }),
                /* @__PURE__ */ jsx("strong", { children: label })
              ] }),
              /* @__PURE__ */ jsxs("b", { children: [
                videoDuration,
                " s"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "video-model-grid", children: [
              /* @__PURE__ */ jsxs("label", { children: [
                /* @__PURE__ */ jsx("span", { children: "Modelo" }),
                /* @__PURE__ */ jsx(Tt, { value: videoModel, onChange: (value) => updateScene(selected.id, {
                  videoModel: value,
                  videoDuration: value === "veo-3.1-lite" ? 8 : videoDuration
                }), disabled: !!selected.operationId, options: Ta.map((ta3) => ({
                  ...ta3,
                  label: ta3.label,
                  detail: ta3.detail
                })) })
              ] }),
              /* @__PURE__ */ jsxs("label", { children: [
                /* @__PURE__ */ jsx("span", { children: "Duraci\xF3n" }),
                /* @__PURE__ */ jsx(Tt, { value: videoDuration, onChange: (value) => updateScene(selected.id, {
                  videoDuration: Number(value)
                }), disabled: !!selected.operationId || videoModel === "veo-3.1-lite", options: br.map((br2) => ({
                  value: br2,
                  label: br2 + " segundos"
                })) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("small", { className: "video-model-help", children: videoModel === "veo-3.1-lite" ? "Veo 3.1 Lite genera clips de 8 s en alta calidad." : "Omni Flash permite elegir clips de 4, 6, 8 o 10 segundos." }),
            /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => {
              scenes.forEach((item) => updateScene(item.id, {
                videoModel,
                videoDuration: videoModel === "veo-3.1-lite" ? 8 : videoDuration
              }));
            }, style: {
              marginTop: 8,
              width: "100%",
              padding: "6px 8px",
              borderRadius: 6,
              background: "rgba(99, 102, 241, 0.12)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#c7d2fe",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer"
            }, title: "Aplica este modelo y duraci\xF3n a todas las escenas del proyecto", children: [
              "\u26A1 Aplicar a Todas las Escenas (",
              scenes.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
            marginTop: 10
          }, children: [
            /* @__PURE__ */ jsxs("div", { className: "label-row", style: {
              marginBottom: 4
            }, children: [
              /* @__PURE__ */ jsx("label", { style: {
                fontSize: 11,
                fontWeight: 700,
                color: "#94a3b8"
              }, children: "Movimiento para el video" }),
              /* @__PURE__ */ jsxs("span", { className: "char-count", style: {
                fontSize: 10
              }, children: [
                ((videoPrompt = selected.videoPrompt) == null ? void 0 : videoPrompt.length) || 0,
                " car"
              ] })
            ] }),
            /* @__PURE__ */ jsx("textarea", { value: selected.videoPrompt || "", onChange: (event) => updateScene(selected.id, {
              videoPrompt: event.target.value
            }), placeholder: "Ej.: c\xE1mara avanza suavemente, lluvia en movimiento, personaje parpadea...", rows: 2, maxLength: 12e3, className: "form-textarea", style: {
              minHeight: 44,
              maxHeight: 90,
              resize: "vertical"
            }, disabled: !!selected.operationId })
          ] })
        ] })
      ] }),
      selected.videoUrl || selected.flowVideoUrl ? /* @__PURE__ */ jsxs("div", { className: "card-box", style: {
        marginTop: 10,
        border: "1px solid rgba(99, 102, 241, 0.25)",
        background: "rgba(99, 102, 241, 0.04)"
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "label-row", style: {
          marginBottom: selected.muted ? 0 : 8
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 6
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 13
            }, children: "\u{1F50A}" }),
            /* @__PURE__ */ jsx("h4", { style: {
              margin: 0,
              fontSize: 12,
              fontWeight: 800
            }, children: "Audio del Clip de Video" })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "toggle-pill " + (selected.muted ? "" : "active"), onClick: () => updateScene(selected.id, {
            muted: !selected.muted
          }), style: {
            padding: "3px 9px",
            fontSize: 10.5,
            fontWeight: 800,
            background: selected.muted ? "rgba(255,255,255,0.06)" : "rgba(99, 102, 241, 0.28)",
            color: selected.muted ? "#94a3b8" : "#c7d2fe",
            border: selected.muted ? "1px solid rgba(255,255,255,0.12)" : "1px solid #6366f1",
            borderRadius: 6,
            cursor: "pointer"
          }, children: selected.muted ? "\u{1F507} Silenciado" : "\u{1F50A} Con Sonido" })
        ] }),
        !selected.muted && /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
          marginTop: 6,
          marginBottom: 0
        }, children: [
          /* @__PURE__ */ jsxs("div", { className: "label-row", style: {
            marginBottom: 4
          }, children: [
            /* @__PURE__ */ jsx("label", { style: {
              fontSize: 11,
              color: "#cbd5e1"
            }, children: "Nivel de volumen del video" }),
            /* @__PURE__ */ jsxs("span", { className: "val-badge", style: {
              fontSize: 10
            }, children: [
              Math.round((selected.videoVolume !== void 0 ? selected.videoVolume : 1) * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: "0", max: "1", step: "0.05", value: selected.videoVolume !== void 0 ? selected.videoVolume : 1, onChange: (event) => updateScene(selected.id, {
            videoVolume: Number(event.target.value)
          }), style: {
            width: "100%",
            height: 4,
            accentColor: "#6366f1",
            cursor: "pointer"
          } })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", className: "btn btn-primary", onClick: () => onTranscribeAudio == null ? void 0 : onTranscribeAudio(selected), style: {
          width: "100%",
          marginTop: 10,
          padding: "7px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          fontSize: 11.5,
          fontWeight: 800,
          background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
          border: "none",
          borderRadius: 8,
          color: "#ffffff",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(99, 102, 241, 0.35)"
        }, title: "Extraer el audio de este clip de video y generar subt\xEDtulos sincronizados con Whisper IA", children: [
          /* @__PURE__ */ jsx("span", { children: "\u{1F399}\uFE0F" }),
          /* @__PURE__ */ jsx("span", { children: "Extraer y Transcribir Subt\xEDtulos con IA" })
        ] })
      ] }) : null,
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            margin: 0
          }, children: "Movimiento de C\xE1mara (Keyframes Zoom/Pan)" }),
          selected.motion === "custom" && /* @__PURE__ */ jsx("span", { style: {
            fontSize: 10,
            fontWeight: 800,
            color: "var(--accent)",
            background: "rgba(215, 255, 79, 0.12)",
            padding: "2px 6px",
            borderRadius: 4
          }, children: "KEYFRAMES PRO" })
        ] }),
        /* @__PURE__ */ jsx("select", { value: selected.motion || "gentle-zoom-in", onChange: (event) => {
          const value = event.target.value;
          if (value === "custom" && !selected.customMotion) {
            updateScene(selected.id, {
              motion: "custom",
              customMotion: {
                startScale: 1,
                endScale: 1.15,
                startX: 0,
                endX: 0,
                startY: 0,
                endY: 0,
                startRotation: 0,
                endRotation: 0,
                easing: "smooth"
              }
            });
          } else {
            updateScene(selected.id, {
              motion: value
            });
          }
        }, className: "form-select", children: ur.map((ur2) => /* @__PURE__ */ jsx("option", { value: ur2.value, children: ur2.label }, ur2.value)) })
      ] }),
      selected.motion === "custom" && /* @__PURE__ */ jsxs("div", { style: {
        padding: 12,
        background: "rgba(99, 102, 241, 0.07)",
        border: "1px solid rgba(99, 102, 241, 0.25)",
        borderRadius: 12,
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 11.5,
            fontWeight: 800,
            color: "#c7d2fe",
            display: "flex",
            alignItems: "center",
            gap: 6
          }, children: "\u{1F3AC} Editor de Curvas & Trayectoria" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
            updateScene(selected.id, {
              customMotion: {
                startScale: 1,
                endScale: 1.15,
                startX: 0,
                endX: 0,
                startY: 0,
                endY: 0,
                startRotation: 0,
                endRotation: 0,
                easing: "smooth"
              }
            });
          }, style: {
            background: "transparent",
            border: 0,
            color: "var(--text-dim)",
            fontSize: 10.5,
            cursor: "pointer",
            textDecoration: "underline"
          }, title: "Restablecer valores por defecto", children: "Reiniciar" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6
        }, children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateScene(selected.id, {
            customMotion: {
              ...selected.customMotion,
              startScale: 1,
              endScale: 1.35,
              startX: 0,
              endX: 0,
              startY: 0,
              endY: -3,
              easing: "smooth"
            }
          }), style: {
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "#e2e8f0",
            cursor: "pointer"
          }, children: "\u{1F50D} Zoom al Rostro" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateScene(selected.id, {
            customMotion: {
              ...selected.customMotion,
              startScale: 1.12,
              endScale: 1.12,
              startX: -6,
              endX: 6,
              startY: 0,
              endY: 0,
              easing: "smooth"
            }
          }), style: {
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "#e2e8f0",
            cursor: "pointer"
          }, children: "\u2B05\uFE0F Paneo Horizontal" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateScene(selected.id, {
            customMotion: {
              ...selected.customMotion,
              startScale: 1,
              endScale: 1.55,
              startX: 0,
              endX: 0,
              startY: 0,
              endY: 0,
              easing: "dramatic"
            }
          }), style: {
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "#e2e8f0",
            cursor: "pointer"
          }, children: "\u26A1 Crash Zoom" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateScene(selected.id, {
            customMotion: {
              ...selected.customMotion,
              startScale: 1.1,
              endScale: 1.18,
              startRotation: 3,
              endRotation: -3,
              easing: "smooth"
            }
          }), style: {
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "#e2e8f0",
            cursor: "pointer"
          }, children: "\u{1F4D0} Dutch Inmersivo" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Escala Inicial" }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontWeight: 800,
                color: "var(--text-primary)"
              }, children: [
                Number(((customMotion2 = selected.customMotion) == null ? void 0 : customMotion2.startScale) ?? 1).toFixed(2),
                "x"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "0.9", max: "2.5", step: "0.05", value: ((customMotion3 = selected.customMotion) == null ? void 0 : customMotion3.startScale) ?? 1, onChange: (event) => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                startScale: Number(event.target.value)
              }
            }), style: {
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Escala Final" }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontWeight: 800,
                color: "var(--text-primary)"
              }, children: [
                Number(((customMotion4 = selected.customMotion) == null ? void 0 : customMotion4.endScale) ?? 1.15).toFixed(2),
                "x"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "0.9", max: "2.5", step: "0.05", value: ((customMotion5 = selected.customMotion) == null ? void 0 : customMotion5.endScale) ?? 1.15, onChange: (event) => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                endScale: Number(event.target.value)
              }
            }), style: {
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Paneo X Inicial" }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontWeight: 800,
                color: "var(--text-primary)"
              }, children: [
                Number(((customMotion6 = selected.customMotion) == null ? void 0 : customMotion6.startX) ?? 0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "-15", max: "15", step: "1", value: ((customMotion7 = selected.customMotion) == null ? void 0 : customMotion7.startX) ?? 0, onChange: (event) => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                startX: Number(event.target.value)
              }
            }), style: {
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Paneo X Final" }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontWeight: 800,
                color: "var(--text-primary)"
              }, children: [
                Number(((customMotion8 = selected.customMotion) == null ? void 0 : customMotion8.endX) ?? 0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "-15", max: "15", step: "1", value: ((customMotion9 = selected.customMotion) == null ? void 0 : customMotion9.endX) ?? 0, onChange: (event) => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                endX: Number(event.target.value)
              }
            }), style: {
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Paneo Y Inicial" }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontWeight: 800,
                color: "var(--text-primary)"
              }, children: [
                Number(((customMotion10 = selected.customMotion) == null ? void 0 : customMotion10.startY) ?? 0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "-15", max: "15", step: "1", value: ((customMotion11 = selected.customMotion) == null ? void 0 : customMotion11.startY) ?? 0, onChange: (event) => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                startY: Number(event.target.value)
              }
            }), style: {
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Paneo Y Final" }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontWeight: 800,
                color: "var(--text-primary)"
              }, children: [
                Number(((customMotion12 = selected.customMotion) == null ? void 0 : customMotion12.endY) ?? 0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "-15", max: "15", step: "1", value: ((customMotion13 = selected.customMotion) == null ? void 0 : customMotion13.endY) ?? 0, onChange: (event) => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                endY: Number(event.target.value)
              }
            }), style: {
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { style: {
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3,
              display: "block"
            }, children: "Curva de Aceleraci\xF3n" }),
            /* @__PURE__ */ jsxs("select", { value: ((customMotion14 = selected.customMotion) == null ? void 0 : customMotion14.easing) || "smooth", onChange: (event) => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                easing: event.target.value
              }
            }), style: {
              width: "100%",
              height: 28,
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 6,
              background: "rgba(0,0,0,0.3)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              padding: "0 6px"
            }, children: [
              /* @__PURE__ */ jsx("option", { value: "smooth", children: "\u{1F33F} Suave Cinem\xE1tico" }),
              /* @__PURE__ */ jsx("option", { value: "ease-out", children: "\u{1F6EC} Desaceleraci\xF3n" }),
              /* @__PURE__ */ jsx("option", { value: "ease-in", children: "\u{1F680} Aceleraci\xF3n" }),
              /* @__PURE__ */ jsx("option", { value: "dramatic", children: "\u26A1 Impacto Dram\xE1tico" }),
              /* @__PURE__ */ jsx("option", { value: "linear", children: "\u{1F4CF} Lineal Constante" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Rotaci\xF3n Final" }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontWeight: 800,
                color: "var(--text-primary)"
              }, children: [
                Number(((customMotion15 = selected.customMotion) == null ? void 0 : customMotion15.endRotation) ?? 0),
                "\xB0"
              ] })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "-10", max: "10", step: "0.5", value: ((customMotion16 = selected.customMotion) == null ? void 0 : customMotion16.endRotation) ?? 0, onChange: (event) => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                endRotation: Number(event.target.value)
              }
            }), style: {
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            } })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
        padding: 12,
        background: "rgba(139, 92, 246, 0.08)",
        border: "1px solid rgba(139, 92, 246, 0.2)",
        borderRadius: 12
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "label-row", style: {
          marginBottom: 8
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            color: "#c4b5fd",
            display: "flex",
            alignItems: "center",
            gap: 6
          }, children: "\u{1FA84} FX & Motion Graphics" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn-tool accent", style: {
            height: 24,
            fontSize: 10,
            padding: "0 8px",
            background: "rgba(139, 92, 246, 0.2)",
            border: 0
          }, onClick: () => {
            const newGraphic = {
              id: "gfx_" + Date.now(),
              preset: "title-pop",
              text: "NUEVO T\xCDTULO",
              fromMs: 500,
              durationMs: 3e3,
              accentColor: "#d7ff4f"
            };
            updateScene(selected.id, {
              graphics: [...selected.graphics || [], newGraphic]
            });
          }, children: "+ Agregar Efecto" })
        ] }),
        (selected.graphics || []).length === 0 ? /* @__PURE__ */ jsx("div", { style: {
          fontSize: 11,
          color: "#6b7280",
          fontStyle: "italic",
          textAlign: "center",
          padding: "10px 0"
        }, children: "Sin efectos en esta escena." }) : /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 8
        }, children: (selected.graphics || []).map((graphic, index) => /* @__PURE__ */ jsxs("div", { style: {
          background: "rgba(0,0,0,0.3)",
          borderRadius: 8,
          padding: 10,
          border: "1px solid rgba(255,255,255,0.05)"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            gap: 6,
            marginBottom: 8
          }, children: [
            /* @__PURE__ */ jsxs("select", { value: graphic.preset, onChange: (event) => {
              const items = [...selected.graphics];
              items[index] = {
                ...graphic,
                preset: event.target.value
              };
              updateScene(selected.id, {
                graphics: items
              });
            }, style: {
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 11,
              borderRadius: 4,
              padding: "2px 4px"
            }, children: [
              /* @__PURE__ */ jsx("option", { value: "title-pop", children: "T\xEDtulo Pop" }),
              /* @__PURE__ */ jsx("option", { value: "kinetic-text", children: "Texto Cin\xE9tico" }),
              /* @__PURE__ */ jsx("option", { value: "stat-counter", children: "Contador / Estad\xEDstica" }),
              /* @__PURE__ */ jsx("option", { value: "word-highlight", children: "Resaltador Fl\xFAor" }),
              /* @__PURE__ */ jsx("option", { value: "quote-card", children: "Tarjeta de Cita" }),
              /* @__PURE__ */ jsx("option", { value: "subscribe-cta", children: "Bot\xF3n Suscribirse" }),
              /* @__PURE__ */ jsx("option", { value: "lower-third", children: "Lower Third" }),
              /* @__PURE__ */ jsx("option", { value: "progress-bar", children: "Barra de Progreso" }),
              /* @__PURE__ */ jsx("option", { value: "warning-alert", children: "Alerta / Peligro" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
              const filteredGraphics = selected.graphics.filter((graphic2, index4) => index4 !== index);
              updateScene(selected.id, {
                graphics: filteredGraphics
              });
            }, style: {
              background: "rgba(239, 68, 68, 0.15)",
              border: "none",
              color: "#fca5a5",
              borderRadius: 4,
              padding: "0 8px",
              cursor: "pointer",
              fontSize: 11
            }, children: "\u2715" })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "text", value: graphic.text || "", onChange: (event) => {
            const items = [...selected.graphics];
            items[index] = {
              ...graphic,
              text: event.target.value
            };
            updateScene(selected.id, {
              graphics: items
            });
          }, placeholder: "Texto del efecto...", style: {
            width: "100%",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: 11,
            borderRadius: 4,
            padding: "4px 8px"
          } })
        ] }, graphic.id || index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group transition-controls", children: [
        /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
          /* @__PURE__ */ jsx("label", { children: "Transiciones entre escenas" }),
          /* @__PURE__ */ jsx("span", { className: "char-count", children: "Suaves" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "transition-select-grid", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("span", { children: "Predeterminado" }),
            /* @__PURE__ */ jsx(Tt, { value: defaultTransition, onChange: (value) => setTransitionDefaults({
              default: value
            }), options: mt })
          ] }),
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("span", { children: "Esta escena" }),
            /* @__PURE__ */ jsx(Tt, { value: transition, onChange: (value) => updateScene(selected.id, {
              transition: value
            }), options: [{
              value: "inherit",
              label: "Usar predeterminado (" + (((mt2 = mt.find((mt3) => mt3.value === defaultTransition)) == null ? void 0 : mt2.label) || "Desvanecimiento") + ")"
            }, ...mt] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "transition-actions", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => applyTransitionToAll(transition === "inherit" ? defaultTransition : transition), children: "Aplicar a todas" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateScene(selected.id, {
            transition: "none"
          }), children: "Sin transici\xF3n aqu\xED" })
        ] }),
        /* @__PURE__ */ jsx("small", { children: "El desvanecimiento es el valor inicial. Las transiciones no cambian la duraci\xF3n ni el audio." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
          /* @__PURE__ */ jsx("label", { children: "Duraci\xF3n exacta de la escena" }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 6
          }, children: [
            /* @__PURE__ */ jsx("input", { type: "number", min: "0.5", max: "600", step: "0.1", value: Number(selected.duration || 4).toFixed(1), onChange: (event) => updateScene(selected.id, {
              duration: Math.max(0.5, Math.min(600, Number(event.target.value) || 4))
            }), style: {
              width: 72,
              height: 24,
              textAlign: "center",
              background: "var(--bg-base)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              color: "var(--accent)",
              fontWeight: 800,
              fontSize: 12
            } }),
            /* @__PURE__ */ jsx("span", { className: "val-badge", children: "seg" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "range", min: "0.5", max: Math.max(60, Math.ceil(Number(selected.duration) || 30)), step: "0.1", value: selected.duration || 4, onChange: (event) => updateScene(selected.id, {
          duration: Number(event.target.value)
        }), className: "form-range" }),
        selected.sourceStartMs !== void 0 ? /* @__PURE__ */ jsxs("div", { style: {
          fontSize: 10.5,
          color: "var(--text-dim)",
          marginTop: 2
        }, children: [
          "\u{1F4CD} Inicio en la pista de audio: ",
          (Number(selected.sourceStartMs) / 1e3).toFixed(2),
          "s"
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "toggles-grid", children: [
        /* @__PURE__ */ jsx("button", { className: "toggle-pill " + (selected.hasCharacter !== false ? "active" : ""), onClick: () => updateScene(selected.id, {
          hasCharacter: selected.hasCharacter === false
        }), children: selected.hasCharacter !== false ? "Personaje activo" : "Sin personaje" }),
        /* @__PURE__ */ jsx("button", { className: "toggle-pill " + (selected.imageHidden ? "" : "active"), onClick: () => updateScene(selected.id, {
          imageHidden: !selected.imageHidden
        }), children: selected.imageHidden ? "Oculto" : "Visible en video" })
      ] })
    ] });
  } else {
    return null;
  }
};
const _Component7 = ({
  project,
  updateProject,
  assetState,
  isTranscribing,
  onUploadAudio,
  onTranscribeAudio,
  onUploadMusic,
  removeAudioTrack,
  removeMusicTrack,
  clearCaptions,
  onImportSrt,
  onCreateScenesFromTranscript,
  setIsCaptionEditorOpen,
  setIsSyncModalOpen,
  syncScenesToCaptions
}) => {
  var captionTrack10;
  var cues8;
  var captionTrack11;
  var cues9;
  var captionTrack12;
  var cues10;
  var captionTrack13;
  var cues11;
  var captionTrack14;
  var cues12;
  var captionTrack15;
  var cues13;
  return /* @__PURE__ */ jsxs("div", { className: "tab-pane", children: [
    /* @__PURE__ */ jsx("div", { className: "pane-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "MULTIMEDIA" }),
      /* @__PURE__ */ jsx("h3", { children: "Audio & Subt\xEDtulos SRT" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", children: [
      /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
        /* @__PURE__ */ jsx("h4", { children: "Pista de voz en off" }),
        project.audioTrack ? /* @__PURE__ */ jsx("button", { className: "del-btn-mini", onClick: removeAudioTrack, title: "Quitar audio", children: "Quitar Audio" }) : null
      ] }),
      project.audioTrack ? /* @__PURE__ */ jsxs("div", { className: "audio-status-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "audio-info-row", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "\u{1F50A} ",
            /* @__PURE__ */ jsx("b", { children: project.audioTrack.name })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "val-badge", children: [
            (project.audioTrack.durationMs / 1e3).toFixed(1),
            "s"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "btn-row-dual", style: {
          marginTop: 8
        }, children: [
          /* @__PURE__ */ jsxs("label", { className: "btn-secondary-action", children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
              var files;
              if (onUploadAudio == null) {
                return void 0;
              } else {
                return onUploadAudio((files = event.target.files) == null ? void 0 : files[0]);
              }
            }, style: {
              display: "none"
            } }),
            "Cambiar audio"
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "btn-tool primary transcription-action " + (isTranscribing ? "is-loading" : ""), onClick: onTranscribeAudio, disabled: isTranscribing, style: {
            height: 34
          }, children: [
            /* @__PURE__ */ jsx("span", { className: "transcription-action-icon", "aria-hidden": "true", children: isTranscribing ? "" : "\u2726" }),
            isTranscribing ? "Transcribiendo IA" : "Transcribir con IA"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
          marginTop: 9
        }, children: [
          /* @__PURE__ */ jsx("label", { children: "Idioma del audio" }),
          /* @__PURE__ */ jsx("select", { className: "form-select", value: project.transcriptionLanguage || "auto", onChange: (event) => updateProject({
            transcriptionLanguage: event.target.value
          }), disabled: isTranscribing, children: An.map((an) => /* @__PURE__ */ jsx("option", { value: an.value, children: an.label }, an.value)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
          marginTop: 9
        }, children: [
          /* @__PURE__ */ jsx("label", { children: "Motor de transcripci\xF3n" }),
          /* @__PURE__ */ jsxs("select", { className: "form-select", value: project.transcriptionEngine || "local", onChange: (event) => updateProject({
            transcriptionEngine: event.target.value
          }), disabled: isTranscribing, children: [
            /* @__PURE__ */ jsx("option", { value: "local", children: "Whisper Local (Gratuito e Ilimitado)" }),
            /* @__PURE__ */ jsx("option", { value: "gemini", children: "Gemini Cloud (R\xE1pido, consume cuota)" })
          ] })
        ] }),
        (project.transcriptionEngine || "local") === "local" && /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
          marginTop: 9
        }, children: [
          /* @__PURE__ */ jsx("label", { children: "Modelo Whisper local" }),
          /* @__PURE__ */ jsxs("select", { className: "form-select", value: project.transcriptionModel || "base", onChange: (event) => updateProject({
            transcriptionModel: event.target.value
          }), disabled: isTranscribing, children: [
            /* @__PURE__ */ jsx("option", { value: "tiny", children: "Tiny \xB7 m\xE1s r\xE1pido, menor precisi\xF3n" }),
            /* @__PURE__ */ jsx("option", { value: "base", children: "Base \xB7 equilibrio recomendado" }),
            /* @__PURE__ */ jsx("option", { value: "small", children: "Small \xB7 m\xE1s preciso, m\xE1s lento" })
          ] })
        ] }),
        assetState.operation === "transcription" && assetState.message ? /* @__PURE__ */ jsxs("div", { role: "status", "aria-live": "polite", style: {
          marginTop: 10,
          padding: "8px 10px",
          borderRadius: 8,
          border: "1px solid " + (assetState.status === "error" ? "rgba(239,68,68,.4)" : assetState.status === "ready" ? "rgba(34,197,94,.35)" : "rgba(99,102,241,.4)"),
          background: assetState.status === "error" ? "rgba(239,68,68,.08)" : assetState.status === "ready" ? "rgba(34,197,94,.08)" : "rgba(99,102,241,.08)",
          color: assetState.status === "error" ? "#f87171" : assetState.status === "ready" ? "#4ade80" : "#c7d2fe",
          fontSize: 11,
          lineHeight: 1.4
        }, children: [
          isTranscribing ? "\u23F3 " : assetState.status === "error" ? "\u274C " : "\u2705 ",
          assetState.message,
          isTranscribing ? /* @__PURE__ */ jsx("div", { style: {
            height: 5,
            marginTop: 7,
            borderRadius: 4,
            background: "rgba(255,255,255,.1)",
            overflow: "hidden"
          }, children: /* @__PURE__ */ jsx("div", { style: {
            height: "100%",
            width: Math.max(2, Number(assetState.progress) || 2) + "%",
            background: "#818cf8",
            transition: "width .3s"
          } }) }) : null
        ] }) : null
      ] }) : /* @__PURE__ */ jsxs("div", { className: "empty-upload-box", style: {
        padding: "8px 0 2px"
      }, children: [
        /* @__PURE__ */ jsxs("label", { className: "btn-tool primary", style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          height: 36,
          margin: 0,
          cursor: "pointer",
          whiteSpace: "nowrap",
          fontSize: 12,
          fontWeight: 700,
          boxSizing: "border-box"
        }, children: [
          /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
            var files;
            if (onUploadAudio == null) {
              return void 0;
            } else {
              return onUploadAudio((files = event.target.files) == null ? void 0 : files[0]);
            }
          }, style: {
            display: "none"
          } }),
          /* @__PURE__ */ jsx("span", { children: "\u{1F399}\uFE0F Subir voz en off (MP3 / WAV)" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "card-sub", style: {
          textAlign: "center",
          margin: "8px 0 0",
          fontSize: 11
        }, children: "Sube una locuci\xF3n para sincronizar subt\xEDtulos y escenas autom\xE1ticamente." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", children: [
      /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
        /* @__PURE__ */ jsx("h4", { children: "Pista A2 \xB7 M\xFAsica & SFX" }),
        project.musicTrack ? /* @__PURE__ */ jsx("button", { className: "del-btn-mini", onClick: removeMusicTrack, title: "Eliminar m\xFAsica o pista A2", children: "Eliminar A2" }) : null
      ] }),
      project.musicTrack ? /* @__PURE__ */ jsxs("div", { className: "audio-status-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "audio-info-row", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "\u{1F3B5} ",
            /* @__PURE__ */ jsx("b", { children: project.musicTrack.name || "M\xFAsica / SFX" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "val-badge", children: project.musicTrack.loop !== false ? "\u{1F501} Bucle" : ((project.musicTrack.durationMs || 3e4) / 1e3).toFixed(1) + "s" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
          marginTop: 10
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4
          }, children: [
            /* @__PURE__ */ jsx("label", { style: {
              fontSize: 11.5,
              fontWeight: 700
            }, children: "Volumen de Fondo (A2)" }),
            /* @__PURE__ */ jsxs("span", { style: {
              fontSize: 11.5,
              fontWeight: 800,
              color: "var(--accent, #6366f1)"
            }, children: [
              Math.round((project.musicTrack.volume !== void 0 ? project.musicTrack.volume : 0.1) * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: "0", max: "1", step: "0.05", value: project.musicTrack.volume !== void 0 ? project.musicTrack.volume : 0.1, onChange: (event) => updateProject({
            musicTrack: {
              ...project.musicTrack,
              volume: Number(event.target.value)
            }
          }), style: {
            width: "100%",
            accentColor: "var(--accent, #6366f1)"
          } })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          marginTop: 8,
          display: "flex",
          alignItems: "center"
        }, children: /* @__PURE__ */ jsxs("label", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          cursor: "pointer",
          fontWeight: 600
        }, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: project.musicTrack.loop !== false, onChange: (event) => updateProject({
            musicTrack: {
              ...project.musicTrack,
              loop: event.target.checked
            }
          }), style: {
            width: 16,
            height: 16,
            accentColor: "var(--accent, #6366f1)"
          } }),
          /* @__PURE__ */ jsx("span", { children: "\u{1F501} Repetir en bucle (durante todo el video)" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "btn-row-dual", style: {
          marginTop: 10
        }, children: [
          /* @__PURE__ */ jsxs("label", { className: "btn-secondary-action", children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
              var files;
              var uploadHandler;
              if ((uploadHandler = onUploadMusic || onUploadAudio) == null) {
                return void 0;
              } else {
                return uploadHandler((files = event.target.files) == null ? void 0 : files[0], "music");
              }
            }, style: {
              display: "none"
            } }),
            "\u{1F4C1} Cambiar desde PC"
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn-tool", onClick: () => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
            detail: {
              tab: "suno"
            }
          })), style: {
            height: 34
          }, title: "Crear o cambiar con Suno AI", children: "\u{1F3B5} Suno AI" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "empty-upload-box", style: {
        padding: "8px 0 2px"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          width: "100%"
        }, children: [
          /* @__PURE__ */ jsxs("label", { className: "btn-secondary-action", style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            height: 36,
            margin: 0,
            padding: "0 8px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontSize: 11.5,
            fontWeight: 700,
            boxSizing: "border-box",
            minWidth: 0,
            overflow: "hidden"
          }, children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
              var files;
              var uploadHandler;
              if ((uploadHandler = onUploadMusic || onUploadAudio) == null) {
                return void 0;
              } else {
                return uploadHandler((files = event.target.files) == null ? void 0 : files[0], "music");
              }
            }, style: {
              display: "none"
            } }),
            /* @__PURE__ */ jsx("span", { children: "\u{1F4C1} Subir PC" })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn-secondary-action", onClick: () => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
            detail: {
              tab: "suno"
            }
          })), style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            height: 36,
            margin: 0,
            padding: "0 8px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontSize: 11.5,
            fontWeight: 700,
            boxSizing: "border-box",
            minWidth: 0,
            overflow: "hidden"
          }, title: "Crear m\xFAsica o efectos SFX con Inteligencia Artificial", children: /* @__PURE__ */ jsx("span", { children: "\u{1F3B5} Suno AI" }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "card-sub", style: {
          textAlign: "center",
          margin: "8px 0 0",
          fontSize: 11
        }, children: "Sube cualquier pista MP3 o WAV de m\xFAsica o efecto SFX a la pista A2." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", children: [
      /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
        /* @__PURE__ */ jsx("h4", { children: "Subt\xEDtulos y SRT" }),
        ((cues8 = (captionTrack10 = project.captionTrack) == null ? void 0 : captionTrack10.cues) == null ? void 0 : cues8.length) > 0 ? /* @__PURE__ */ jsx("button", { className: "del-btn-mini", onClick: clearCaptions, title: "Borrar subt\xEDtulos", children: "Limpiar Subt\xEDtulos" }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "btn-stack", style: {
        marginTop: 8
      }, children: [
        /* @__PURE__ */ jsxs("label", { className: "btn-tool", children: [
          /* @__PURE__ */ jsx("input", { type: "file", accept: ".srt,.vtt,.json", onChange: (event) => {
            var files;
            if (onImportSrt == null) {
              return void 0;
            } else {
              return onImportSrt((files = event.target.files) == null ? void 0 : files[0]);
            }
          }, style: {
            display: "none"
          } }),
          "Importar SRT / WhisperX"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "btn-tool primary", onClick: onCreateScenesFromTranscript, disabled: (cues9 = (captionTrack11 = project.captionTrack) == null ? void 0 : captionTrack11.cues) == null || !cues9.length, children: [
          "Crear escenas desde frases (",
          ((cues10 = (captionTrack12 = project.captionTrack) == null ? void 0 : captionTrack12.cues) == null ? void 0 : cues10.length) || 0,
          ")"
        ] }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: () => setIsCaptionEditorOpen(true), disabled: (cues11 = (captionTrack13 = project.captionTrack) == null ? void 0 : captionTrack13.cues) == null || !cues11.length, children: "Editor avanzado de subt\xEDtulos" }),
        ((cues12 = (captionTrack14 = project.captionTrack) == null ? void 0 : captionTrack14.cues) == null ? void 0 : cues12.length) > 0 ? /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
          marginTop: 4
        }, children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn-tool", onClick: () => {
            const text = ta(project.captionTrack.cues);
            const blob = new Blob([text], {
              type: "text/plain;charset=utf-8"
            });
            const objectUrl = URL.createObjectURL(blob);
            const element = document.createElement("a");
            element.href = objectUrl;
            element.download = (project.title || "subtitulos") + ".srt";
            element.click();
            URL.revokeObjectURL(objectUrl);
          }, style: {
            justifyContent: "center",
            fontSize: 10.5,
            fontWeight: 700
          }, title: "Bajar subt\xEDtulos en formato .SRT", children: "\u{1F4E5} Bajar .SRT" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn-tool", onClick: () => {
            const vttContent = aa(project.captionTrack.cues);
            const blob = new Blob([vttContent], {
              type: "text/vtt;charset=utf-8"
            });
            const objectUrl = URL.createObjectURL(blob);
            const element = document.createElement("a");
            element.href = objectUrl;
            element.download = (project.title || "subtitulos") + ".vtt";
            element.click();
            URL.revokeObjectURL(objectUrl);
          }, style: {
            justifyContent: "center",
            fontSize: 10.5,
            fontWeight: 700
          }, title: "Bajar subt\xEDtulos en formato WebVTT (.VTT)", children: "\u{1F4E5} Bajar .VTT" })
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", style: {
      borderColor: "rgba(99, 102, 241, 0.4)",
      background: "rgba(99, 102, 241, 0.05)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
        /* @__PURE__ */ jsx("h4", { children: "\u{1F3AF} Sincronizaci\xF3n al Tiempo Exacto" }),
        /* @__PURE__ */ jsx("span", { className: "eyebrow", style: {
          color: "var(--accent)"
        }, children: "CALIBRADOR" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "card-sub", children: "Alinea el delay de voz, escala la duraci\xF3n de subt\xEDtulos y ajusta cada escena a la frase exacta." }),
      /* @__PURE__ */ jsxs("div", { className: "btn-stack", children: [
        /* @__PURE__ */ jsx("button", { className: "btn-tool primary", onClick: () => setIsSyncModalOpen(true), style: {
          height: 38,
          fontWeight: 800
        }, children: "Abrir calibrador de tiempos" }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: syncScenesToCaptions, disabled: (cues13 = (captionTrack15 = project.captionTrack) == null ? void 0 : captionTrack15.cues) == null || !cues13.length, title: "Ajusta autom\xE1ticamente el inicio y duraci\xF3n de cada escena para que coincida 100% con cada frase del SRT", children: "Ajustar escenas a las frases" })
      ] })
    ] })
  ] });
};
const _Component8 = ({
  project,
  updateProject,
  scenes,
  selected,
  batchState,
  promptGenState,
  flowState,
  missingImageScenes,
  allStatic,
  hasGraphics,
  onGenerateAllImages,
  onAutoPilot,
  cancelPromptGen,
  cancelBatch,
  onCreateScenesFromTranscript,
  onGenerateVisualPrompts,
  onGenerateAllVideos,
  onGenerateVideo,
  autoApplyMotionGraphics,
  clearAllMotionGraphics,
  toggleAllMotionsStatic,
  randomizeMotions
}) => {
  var captionTrack16;
  var cues14;
  var captionTrack17;
  var cues15;
  var activePrompt;
  return /* @__PURE__ */ jsxs("div", { className: "tab-pane", children: [
    /* @__PURE__ */ jsx("div", { className: "pane-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "AUTOMATIZACI\xD3N" }),
      /* @__PURE__ */ jsx("h3", { children: "Lotes IA & Auto-Piloto" })
    ] }) }),
    missingImageScenes.length > 0 && !batchState.running && !promptGenState.running && /* @__PURE__ */ jsx("div", { className: "missing-scenes-alert-card", style: {
      background: "linear-gradient(135deg, rgba(245, 158, 11, 0.14), rgba(217, 119, 6, 0.08))",
      border: "1px solid rgba(245, 158, 11, 0.4)",
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 12,
      boxShadow: "0 8px 24px rgba(245, 158, 11, 0.08)"
    }, children: /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 18,
          lineHeight: 1
        }, children: "\u26A0\uFE0F" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h4", { style: {
            margin: 0,
            fontSize: 12.5,
            fontWeight: 900,
            color: "#fbbf24"
          }, children: [
            "Faltan ",
            missingImageScenes.length,
            " imagen",
            missingImageScenes.length > 1 ? "es" : "",
            " por generar"
          ] }),
          /* @__PURE__ */ jsx("p", { style: {
            margin: "2px 0 0",
            fontSize: 11,
            color: "#94a3b8"
          }, children: "Detectadas escenas pendientes de imagen" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => {
        var electronAPI;
        if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
          window.electronAPI.openGoogleFlow();
        }
        if (onGenerateAllImages != null) {
          onGenerateAllImages(false, false);
        }
      }, style: {
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        color: "#000",
        border: "none",
        padding: "7px 14px",
        borderRadius: 8,
        fontSize: 11.5,
        fontWeight: 900,
        cursor: "pointer",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 8px rgba(245, 158, 11, 0.4)"
      }, children: [
        "\u26A1 Generar ",
        missingImageScenes.length,
        " faltante",
        missingImageScenes.length > 1 ? "s" : ""
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", style: {
      background: "linear-gradient(135deg, rgba(79, 124, 255, 0.18), rgba(112, 92, 246, 0.13))",
      borderColor: "rgba(91, 140, 255, 0.4)",
      padding: 14
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "label-row", style: {
        marginBottom: 6
      }, children: [
        /* @__PURE__ */ jsx("h4", { style: {
          color: "var(--accent)",
          fontSize: 13,
          margin: 0
        }, children: "AUTO-PILOTO TOTAL" }),
        /* @__PURE__ */ jsx("span", { className: "val-badge", style: {
          background: "rgba(91,140,255,.15)",
          color: "#a9c3ff",
          border: "1px solid rgba(91,140,255,.26)",
          fontWeight: 900,
          fontSize: 10
        }, children: "TODO EN 1 CLIC" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "card-sub", style: {
        color: "#f1f5f9",
        fontSize: 11.5,
        margin: "0 0 10px 0"
      }, children: "Genera los prompts para todas las escenas y luego genera todas las im\xE1genes en lote en una sola ejecuci\xF3n continua." }),
      (batchState.running || promptGenState.running) && /* @__PURE__ */ jsxs("div", { style: {
        margin: "10px 0 14px",
        padding: 10,
        borderRadius: 10,
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(91,140,255,0.3)"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11.5,
          fontWeight: 700,
          marginBottom: 6
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "#dbeafe"
          }, children: promptGenState.running ? promptGenState.message || "Generando prompts (" + promptGenState.done + "/" + promptGenState.total + ")" : batchState.message || "Generando im\xE1genes (" + batchState.done + "/" + batchState.total + ")" }),
          /* @__PURE__ */ jsx("span", { style: {
            color: "var(--accent)",
            fontWeight: 900
          }, children: promptGenState.running ? promptGenState.percent + "%" : (batchState.total ? Math.round(batchState.done / batchState.total * 100) : 0) + "%" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "progress-track-bg", style: {
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.1)",
          overflow: "hidden"
        }, children: /* @__PURE__ */ jsx("div", { className: "progress-fill-bar", style: {
          height: "100%",
          background: "var(--accent-gradient)",
          transition: "width 0.3s ease",
          width: (promptGenState.running ? promptGenState.percent : batchState.total ? Math.min(100, Math.round(batchState.done / batchState.total * 100)) : 0) + "%"
        } }) }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 8
        }, children: /* @__PURE__ */ jsx("button", { onClick: promptGenState.running ? cancelPromptGen : cancelBatch, className: "ghost-button danger", style: {
          height: 24,
          fontSize: 10.5,
          padding: "0 10px",
          borderRadius: 6
        }, children: "Detener" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "btn-stack", children: [
        /* @__PURE__ */ jsx("button", { className: "btn-big-export", style: {
          background: "var(--accent-gradient)",
          color: "var(--accent-text)",
          height: 42,
          fontSize: 12.5
        }, onClick: () => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onAutoPilot != null) {
            onAutoPilot(false);
          }
        }, disabled: batchState.running || promptGenState.running, children: batchState.running || promptGenState.running ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "working", style: {
            width: 14,
            height: 14,
            borderWidth: 2,
            borderColor: "#000"
          } }),
          /* @__PURE__ */ jsx("span", { children: "Auto-Piloto en Marcha..." })
        ] }) : /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "button-prefix", children: "AI" }),
          /* @__PURE__ */ jsx("span", { children: "INICIAR AUTO-PILOTO (PROMPTS + IM\xC1GENES)" })
        ] }) }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: () => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onAutoPilot != null) {
            onAutoPilot(true);
          }
        }, disabled: batchState.running || promptGenState.running, title: "Vuelve a crear prompts e im\xE1genes desde cero para todo el proyecto", style: {
          fontSize: 11
        }, children: "Regenerar todo con Auto-Piloto" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", style: {
      background: "rgba(16, 185, 129, 0.06)",
      borderColor: "rgba(16, 185, 129, 0.3)",
      padding: 14
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "label-row", style: {
        marginBottom: 6
      }, children: [
        /* @__PURE__ */ jsx("h4", { style: {
          color: "#34d399",
          fontSize: 13,
          margin: 0
        }, children: "\u{1F4DC} Guion & Subt\xEDtulos SRT" }),
        /* @__PURE__ */ jsx("span", { className: "val-badge", style: {
          background: "rgba(16, 185, 129, 0.15)",
          color: "#6ee7b7",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          fontWeight: 900
        }, children: "PASO 1" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "card-sub", style: {
        color: "#cbd5e1",
        fontSize: 11.5,
        margin: "0 0 10px 0"
      }, children: ((cues14 = (captionTrack16 = project.captionTrack) == null ? void 0 : captionTrack16.cues) == null ? void 0 : cues14.length) > 0 ? "Tienes " + project.captionTrack.cues.length + " frases sincronizadas listas para estructurar el video." : "Carga tu audio o genera la locuci\xF3n en el Estudio de Audio para extraer autom\xE1ticamente las frases del guion." }),
      /* @__PURE__ */ jsx("div", { className: "btn-stack", children: ((cues15 = (captionTrack17 = project.captionTrack) == null ? void 0 : captionTrack17.cues) == null ? void 0 : cues15.length) > 0 ? /* @__PURE__ */ jsxs("button", { className: "btn-tool primary", style: {
        background: "linear-gradient(135deg, #059669, #10b981)",
        color: "#fff",
        fontWeight: 800
      }, onClick: () => onCreateScenesFromTranscript == null ? void 0 : onCreateScenesFromTranscript(project.captionTrack.cues), children: [
        "\u26A1 Sincronizar ",
        project.captionTrack.cues.length,
        " Escenas con SRT"
      ] }) : /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: () => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
        detail: {
          tab: "tts"
        }
      })), children: "\u{1F399}\uFE0F Generar Voz o Subir Audio en Estudio de Audio" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", children: [
      /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
        /* @__PURE__ */ jsx("h4", { children: "\u{1F4A1} Prompts Visuales IA" }),
        /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "PASO 2" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "card-sub", children: "Crea descripciones visuales cinematogr\xE1ficas para cada escena." }),
      /* @__PURE__ */ jsxs("div", { className: "btn-stack", style: {
        marginTop: 8
      }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn-tool primary", onClick: () => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onGenerateVisualPrompts != null) {
            onGenerateVisualPrompts(false);
          }
        }, disabled: promptGenState.running, children: promptGenState.running ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "working", style: {
            width: 14,
            height: 14,
            borderWidth: 2
          } }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Generando Prompts (",
            promptGenState.done,
            "/",
            promptGenState.total,
            ")..."
          ] })
        ] }) : /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "\u{1F4A1}" }),
          /* @__PURE__ */ jsx("span", { children: "Generar Prompts Faltantes" })
        ] }) }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: () => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onGenerateVisualPrompts != null) {
            onGenerateVisualPrompts(true);
          }
        }, disabled: promptGenState.running, title: "Sobrescribe todos los prompts existentes con nuevas versiones de IA", children: "Regenerar todos los prompts" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", children: [
      /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
        /* @__PURE__ */ jsx("h4", { children: "\u26A1 Generaci\xF3n de Im\xE1genes en Lote" }),
        /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "PASO 3" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "card-sub", children: "Env\xEDa las escenas a Google Flow con balanceo de carga multi-cuenta." }),
      /* @__PURE__ */ jsxs("div", { className: "btn-stack", style: {
        marginTop: 8
      }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn-tool accent", onClick: () => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onGenerateAllImages != null) {
            onGenerateAllImages(false, false);
          }
        }, disabled: batchState.running, children: batchState.running ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "working", style: {
            width: 14,
            height: 14,
            borderWidth: 2
          } }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Generando Lote (",
            batchState.done,
            "/",
            batchState.total,
            ")..."
          ] })
        ] }) : /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "\u26A1" }),
          /* @__PURE__ */ jsx("span", { children: "Generar Im\xE1genes Pendientes" })
        ] }) }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: () => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onGenerateAllImages != null) {
            onGenerateAllImages(false, true);
          }
        }, disabled: batchState.running, title: "Vuelve a generar im\xE1genes para todas las escenas aunque ya tengan imagen", children: "Regenerar todas las im\xE1genes" }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool danger", onClick: () => onGenerateAllImages == null ? void 0 : onGenerateAllImages(true, false), disabled: batchState.running, style: {
          fontSize: 11
        }, children: "Reintentar solo im\xE1genes fallidas" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", style: {
      background: "rgba(236, 72, 153, 0.05)",
      borderColor: "rgba(236, 72, 153, 0.3)",
      padding: 14
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "label-row", style: {
        marginBottom: 6
      }, children: [
        /* @__PURE__ */ jsx("h4", { style: {
          color: "#f472b6",
          margin: 0,
          fontSize: 13,
          fontWeight: 900
        }, children: "\u{1F3AC} Generaci\xF3n de Videos en Lote (Imagen \u2794 Video)" }),
        /* @__PURE__ */ jsx("span", { className: "val-badge", style: {
          background: "rgba(236,72,153,0.15)",
          color: "#f472b6",
          border: "1px solid rgba(236,72,153,0.3)",
          fontWeight: 900
        }, children: "PASO 4" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "card-sub", style: {
        margin: "0 0 10px 0",
        fontSize: 11.5,
        color: "#cbd5e1"
      }, children: [
        "Convierte tus im\xE1genes en clips de video cinematogr\xE1ficos con ",
        /* @__PURE__ */ jsx("b", { children: "Omni Flash" }),
        " o ",
        /* @__PURE__ */ jsx("b", { children: "Veo 3.1 Lite" }),
        " en segundo plano."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "btn-stack", children: [
        /* @__PURE__ */ jsx("button", { className: "btn-tool accent", onClick: () => onGenerateAllVideos == null ? void 0 : onGenerateAllVideos(false), disabled: batchState.running || !scenes.some((item) => item.imageUrl), style: {
          background: "linear-gradient(135deg, rgba(236, 72, 153, 0.35), rgba(168, 85, 247, 0.35))",
          border: "1px solid rgba(236, 72, 153, 0.6)",
          color: "#fff",
          fontWeight: 900,
          height: 38,
          fontSize: 12
        }, title: "Convierte todas las escenas con imagen en clips de video", children: batchState.running && (activePrompt = batchState.activePrompt) != null && activePrompt.includes("video") ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "working", style: {
            width: 14,
            height: 14,
            borderWidth: 2
          } }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Generando Videos (",
            batchState.current,
            "/",
            batchState.total,
            ")..."
          ] })
        ] }) : /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "\u{1F3AC}" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Convertir Todas las Im\xE1genes a Video (",
            scenes.filter((item) => item.imageUrl).length,
            ")"
          ] })
        ] }) }),
        selected && selected.imageUrl && /* @__PURE__ */ jsxs("button", { className: "btn-tool", onClick: () => onGenerateVideo == null ? void 0 : onGenerateVideo(selected), disabled: !!selected.operationId || selected.status === "video-generating", style: {
          fontSize: 11
        }, children: [
          "\u{1F3AC} Convertir solo escena actual (",
          selected.title,
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", children: [
      /* @__PURE__ */ jsx("h4", { children: "\u{1FA84} Control de Auto-Motion & Efectos" }),
      /* @__PURE__ */ jsx("p", { className: "card-sub", children: "Activa o desactiva con un solo clic los efectos visuales y movimientos de c\xE1mara." }),
      /* @__PURE__ */ jsxs("div", { className: "btn-stack", children: [
        /* @__PURE__ */ jsx("button", { className: "btn-tool primary", onClick: autoApplyMotionGraphics, title: "Insertar t\xEDtulos, alertas y tarjetas din\xE1micas autom\xE1ticas", children: "\u{1FA84} Aplicar Auto-Motion IA" }),
        hasGraphics ? /* @__PURE__ */ jsx("button", { className: "btn-tool danger", onClick: clearAllMotionGraphics, title: "Eliminar todos los textos flotantes, stickers y gr\xE1ficos insertados", children: "\u{1F6AB} DESACTIVAR / QUITAR TODOS LOS EFECTOS" }) : null,
        /* @__PURE__ */ jsx("button", { className: "btn-tool " + (allStatic ? "accent" : ""), onClick: toggleAllMotionsStatic, title: "Alternar entre c\xE1mara est\xE1tica fija o movimientos din\xE1micos", children: allStatic ? "Activar movimientos din\xE1micos" : "Dejar todas las escenas fijas" }),
        /* @__PURE__ */ jsx("button", { className: "btn-tool", onClick: randomizeMotions, children: "\u{1F3B2} Asignar Movimientos Variados" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", children: [
      /* @__PURE__ */ jsx("h4", { children: "Modelos de inteligencia artificial" }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
        marginTop: 8
      }, children: [
        /* @__PURE__ */ jsx("label", { children: "Modelo de Texto & Prompts" }),
        /* @__PURE__ */ jsx("select", { value: project.textModel, onChange: (event) => updateProject({
          textModel: event.target.value
        }), className: "form-select", children: gr.map((gr2) => /* @__PURE__ */ jsx("option", { value: gr2.value, children: gr2.label }, gr2.value)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
        marginTop: 8
      }, children: [
        /* @__PURE__ */ jsx("label", { children: "Modelo de Generaci\xF3n de Imagen" }),
        /* @__PURE__ */ jsx("select", { value: project.imageModel, onChange: (event) => updateProject({
          imageModel: event.target.value
        }), className: "form-select", children: fr.map((fr2) => /* @__PURE__ */ jsx("option", { value: fr2.value, children: fr2.label }, fr2.value)) })
      ] })
    ] })
  ] });
};
const Sr = ({
  project,
  captionsEnabled,
  toggleCaptions,
  updateCaptionStyle
}) => {
  var captionTrack18;
  var style8;
  var captionTrack19;
  var style9;
  var captionTrack20;
  var style10;
  var captionTrack21;
  var style11;
  var captionTrack22;
  var style12;
  var captionTrack23;
  var style13;
  var captionTrack24;
  var style14;
  var captionTrack25;
  var style15;
  var captionTrack26;
  var style16;
  var captionTrack27;
  var style17;
  var captionTrack28;
  var style18;
  var captionTrack29;
  var style19;
  var captionTrack30;
  var style20;
  var captionTrack31;
  var style21;
  var captionTrack32;
  var style22;
  var captionTrack33;
  var style23;
  var captionTrack34;
  var style24;
  var captionTrack35;
  var style25;
  var captionTrack36;
  var style26;
  var captionTrack37;
  var style27;
  var captionTrack38;
  var style28;
  var captionTrack39;
  var style29;
  var captionTrack40;
  var style30;
  var captionTrack41;
  var style31;
  var captionTrack42;
  var style32;
  var captionTrack43;
  var style33;
  var captionTrack44;
  var style34;
  var captionTrack45;
  var style35;
  var captionTrack46;
  var style36;
  var captionTrack47;
  var style37;
  var captionTrack48;
  var style38;
  var captionTrack49;
  var style39;
  var captionTrack50;
  var style40;
  var captionTrack51;
  var style41;
  var captionTrack52;
  var style42;
  var captionTrack53;
  var style43;
  return /* @__PURE__ */ jsxs("div", { className: "tab-pane", children: [
    /* @__PURE__ */ jsxs("div", { className: "pane-header", style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "DISE\xD1O Y ANIMACI\xD3N" }),
        /* @__PURE__ */ jsx("h3", { children: "Estilos de Subt\xEDtulos" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "toggle-switch " + (captionsEnabled ? "on" : "off"), onClick: toggleCaptions, style: {
        fontSize: 11,
        padding: "4px 8px"
      }, children: captionsEnabled ? "ACTIVADOS" : "OCULTOS" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", style: {
      marginBottom: 16
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "label-row", style: {
        marginBottom: 8
      }, children: /* @__PURE__ */ jsx("h4", { style: {
        color: "var(--accent)"
      }, children: "Modo de subt\xEDtulos" }) }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx("button", { type: "button", className: "btn-secondary-action " + (((style8 = (captionTrack18 = project.captionTrack) == null ? void 0 : captionTrack18.style) == null || !style8.maxWordsPerScreen) && ((style9 = (captionTrack19 = project.captionTrack) == null ? void 0 : captionTrack19.style) == null || !style9.wordHighlight) ? "active" : ""), style: {
          padding: "8px 10px",
          fontSize: 11.5,
          fontWeight: 800,
          background: ((style10 = (captionTrack20 = project.captionTrack) == null ? void 0 : captionTrack20.style) == null || !style10.maxWordsPerScreen) && ((style11 = (captionTrack21 = project.captionTrack) == null ? void 0 : captionTrack21.style) == null || !style11.wordHighlight) ? "var(--accent)" : "rgba(255,255,255,0.06)",
          color: ((style12 = (captionTrack22 = project.captionTrack) == null ? void 0 : captionTrack22.style) == null || !style12.maxWordsPerScreen) && ((style13 = (captionTrack23 = project.captionTrack) == null ? void 0 : captionTrack23.style) == null || !style13.wordHighlight) ? "#fff" : "var(--text-dim)",
          borderRadius: 6,
          border: "1px solid var(--border)",
          cursor: "pointer",
          textAlign: "center"
        }, onClick: () => updateCaptionStyle({
          maxWordsPerScreen: 0,
          wordByWord: false,
          wordHighlight: false,
          uppercase: false,
          animation: "clean",
          fontSize: 46,
          highlightColor: "#ffffff"
        }), title: "Muestra la frase completa tal como est\xE1 en el timeline, sin recortar ni efectos karaoke", children: "\u{1F4DC} Fiel al Timeline (Frase Completa)" }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "btn-secondary-action " + (((style14 = (captionTrack24 = project.captionTrack) == null ? void 0 : captionTrack24.style) == null ? void 0 : style14.maxWordsPerScreen) > 0 && (style15 = (captionTrack25 = project.captionTrack) == null ? void 0 : captionTrack25.style) != null && style15.wordHighlight ? "active" : ""), style: {
          padding: "8px 10px",
          fontSize: 11.5,
          fontWeight: 800,
          background: ((style16 = (captionTrack26 = project.captionTrack) == null ? void 0 : captionTrack26.style) == null ? void 0 : style16.maxWordsPerScreen) > 0 && (style17 = (captionTrack27 = project.captionTrack) == null ? void 0 : captionTrack27.style) != null && style17.wordHighlight ? "var(--accent)" : "rgba(255,255,255,0.06)",
          color: ((style18 = (captionTrack28 = project.captionTrack) == null ? void 0 : captionTrack28.style) == null ? void 0 : style18.maxWordsPerScreen) > 0 && (style19 = (captionTrack29 = project.captionTrack) == null ? void 0 : captionTrack29.style) != null && style19.wordHighlight ? "#fff" : "var(--text-dim)",
          borderRadius: 6,
          border: "1px solid var(--border)",
          cursor: "pointer",
          textAlign: "center"
        }, onClick: () => updateCaptionStyle({
          maxWordsPerScreen: 3,
          wordByWord: true,
          wordHighlight: true,
          uppercase: true,
          animation: "viral-yellow-pop",
          fontSize: 54,
          highlightColor: "#FFD700"
        }), title: "Estilo din\xE1mico viral de TikTok / Shorts con 3 palabras y resalte", children: "\u26A1 Din\xE1mico Viral (3 Palabras / TikTok)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", style: {
      marginBottom: 16
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "label-row", style: {
        marginBottom: 12
      }, children: /* @__PURE__ */ jsx("h4", { style: {
        color: "var(--accent)"
      }, children: "Motor de animaci\xF3n" }) }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("select", { value: ((style20 = (captionTrack30 = project.captionTrack) == null ? void 0 : captionTrack30.style) == null ? void 0 : style20.animation) || "soft-scale", onChange: (event) => updateCaptionStyle({
          animation: event.target.value
        }), className: "form-select", style: {
          fontSize: 13,
          padding: 8,
          height: "auto"
        }, children: mr.map((mr2) => /* @__PURE__ */ jsx("option", { value: mr2.value, children: mr2.label }, mr2.value)) }),
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: 10.5,
          color: "var(--text-muted)",
          marginTop: 6
        }, children: "Determina c\xF3mo interact\xFAan las palabras con el audio en tiempo real." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "caption-animation-toggles", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: "toggle-pill " + (((style21 = (captionTrack31 = project.captionTrack) == null ? void 0 : captionTrack31.style) == null ? void 0 : style21.wordByWord) !== false ? "active" : ""), onClick: () => {
          var captionTrack;
          var style;
          return updateCaptionStyle({
            wordByWord: ((style = (captionTrack = project.captionTrack) == null ? void 0 : captionTrack.style) == null ? void 0 : style.wordByWord) === false
          });
        }, children: [
          ((style22 = (captionTrack32 = project.captionTrack) == null ? void 0 : captionTrack32.style) == null ? void 0 : style22.wordByWord) !== false ? "\u25CF" : "\u25CB",
          " Palabra por palabra"
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", className: "toggle-pill " + (((style23 = (captionTrack33 = project.captionTrack) == null ? void 0 : captionTrack33.style) == null ? void 0 : style23.wordHighlight) !== false ? "active" : ""), onClick: () => {
          var captionTrack;
          var style;
          return updateCaptionStyle({
            wordHighlight: ((style = (captionTrack = project.captionTrack) == null ? void 0 : captionTrack.style) == null ? void 0 : style.wordHighlight) === false
          });
        }, children: [
          ((style24 = (captionTrack34 = project.captionTrack) == null ? void 0 : captionTrack34.style) == null ? void 0 : style24.wordHighlight) !== false ? "\u25CF" : "\u25CB",
          " Resaltado por palabra"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", style: {
      marginBottom: 16
    }, children: [
      /* @__PURE__ */ jsx("h4", { children: "Tipograf\xEDa y tama\xF1o" }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
        marginTop: 12
      }, children: [
        /* @__PURE__ */ jsx("label", { children: "Fuente (Font Family)" }),
        /* @__PURE__ */ jsx("select", { value: ((style25 = (captionTrack35 = project.captionTrack) == null ? void 0 : captionTrack35.style) == null ? void 0 : style25.fontFamily) || "'Inter', sans-serif", onChange: (event) => updateCaptionStyle({
          fontFamily: event.target.value
        }), className: "form-select", children: pr.map((pr2) => /* @__PURE__ */ jsx("option", { value: pr2.value, children: pr2.label }, pr2.value)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
        marginTop: 12
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
          /* @__PURE__ */ jsx("label", { children: "Palabras por Pantalla (Shorts / Reels)" }),
          /* @__PURE__ */ jsx("span", { className: "val-badge", style: {
            background: "rgba(99, 102, 241, 0.2)",
            color: "#a5b4fc",
            border: "1px solid rgba(99, 102, 241, 0.3)"
          }, children: ((style26 = (captionTrack36 = project.captionTrack) == null ? void 0 : captionTrack36.style) == null ? void 0 : style26.maxWordsPerScreen) === 1 ? "1 Palabra" : ((style27 = (captionTrack37 = project.captionTrack) == null ? void 0 : captionTrack37.style) == null ? void 0 : style27.maxWordsPerScreen) === 3 ? "3 Palabras" : ((style28 = (captionTrack38 = project.captionTrack) == null ? void 0 : captionTrack38.style) == null ? void 0 : style28.maxWordsPerScreen) === 4 ? "4 Palabras" : ((style29 = (captionTrack39 = project.captionTrack) == null ? void 0 : captionTrack39.style) == null ? void 0 : style29.maxWordsPerScreen) === 6 ? "6 Palabras" : "Frase Completa" })
        ] }),
        /* @__PURE__ */ jsxs("select", { value: ((style30 = (captionTrack40 = project.captionTrack) == null ? void 0 : captionTrack40.style) == null ? void 0 : style30.maxWordsPerScreen) ?? 4, onChange: (event) => updateCaptionStyle({
          maxWordsPerScreen: Number(event.target.value)
        }), className: "form-select", style: {
          fontWeight: 700
        }, children: [
          /* @__PURE__ */ jsx("option", { value: 1, children: "\u26A1 1 Palabra por pantalla (Ultra Din\xE1mico TikTok / Hormozi)" }),
          /* @__PURE__ */ jsx("option", { value: 3, children: "\u{1F4F1} 3 Palabras m\xE1ximo (Shorts / Reels - No tapa la pantalla)" }),
          /* @__PURE__ */ jsx("option", { value: 4, children: "\u{1F3AC} 4 Palabras m\xE1ximo (Recomendado Shorts)" }),
          /* @__PURE__ */ jsx("option", { value: 6, children: "\u{1F4FA} 6 Palabras m\xE1ximo (YouTube Est\xE1ndar)" }),
          /* @__PURE__ */ jsx("option", { value: 0, children: "\u{1F4DC} Frase Completa (P\xE1rrafo entero)" })
        ] }),
        /* @__PURE__ */ jsx("small", { style: {
          fontSize: 11,
          color: "var(--text-faint)",
          marginTop: 4
        }, children: "Evita que el texto ocupe toda la pantalla en formatos verticales 9:16." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "toggles-grid", style: {
        marginBottom: 12
      }, children: /* @__PURE__ */ jsxs("button", { className: "toggle-pill " + ((style31 = (captionTrack41 = project.captionTrack) == null ? void 0 : captionTrack41.style) != null && style31.uppercase ? "active" : ""), onClick: () => {
        var captionTrack;
        var style;
        return updateCaptionStyle({
          uppercase: (style = (captionTrack = project.captionTrack) == null ? void 0 : captionTrack.style) == null || !style.uppercase
        });
      }, type: "button", children: [
        "\u{1F524} ",
        (style32 = (captionTrack42 = project.captionTrack) == null ? void 0 : captionTrack42.style) != null && style32.uppercase ? "FORZAR MAY\xDASCULAS" : "May\xFAsculas/Min\xFAsculas"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
          /* @__PURE__ */ jsx("label", { children: "Tama\xF1o de Letra" }),
          /* @__PURE__ */ jsxs("span", { className: "val-badge", style: {
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)"
          }, children: [
            ((style33 = (captionTrack43 = project.captionTrack) == null ? void 0 : captionTrack43.style) == null ? void 0 : style33.fontSize) || 54,
            "px"
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "range", min: "22", max: "140", value: ((style34 = (captionTrack44 = project.captionTrack) == null ? void 0 : captionTrack44.style) == null ? void 0 : style34.fontSize) || 54, onChange: (event) => updateCaptionStyle({
          fontSize: Number(event.target.value)
        }), className: "form-range" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", style: {
      marginBottom: 16
    }, children: [
      /* @__PURE__ */ jsx("h4", { children: "Paleta de colores y efectos" }),
      /* @__PURE__ */ jsx("div", { className: "caption-color-presets", "aria-label": "Paletas predeterminadas", children: hr.map((hr2) => {
        var captionTrack;
        const style = ((captionTrack = project.captionTrack) == null ? void 0 : captionTrack.style) || {};
        const isActivePreset = style.color === hr2.color && style.highlightColor === hr2.highlightColor && style.outlineColor === hr2.outlineColor;
        return /* @__PURE__ */ jsxs("button", { type: "button", className: "caption-color-preset " + (isActivePreset ? "active" : ""), onClick: () => updateCaptionStyle({
          color: hr2.color,
          highlightColor: hr2.highlightColor,
          outlineColor: hr2.outlineColor
        }), title: "Aplicar paleta " + hr2.label, children: [
          /* @__PURE__ */ jsxs("span", { className: "caption-preset-swatches", children: [
            /* @__PURE__ */ jsx("i", { style: {
              background: hr2.color
            } }),
            /* @__PURE__ */ jsx("i", { style: {
              background: hr2.highlightColor
            } }),
            /* @__PURE__ */ jsx("i", { style: {
              background: hr2.outlineColor
            } })
          ] }),
          /* @__PURE__ */ jsx("b", { children: hr2.label })
        ] }, hr2.id);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "color-pickers-row", style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        marginTop: 12
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "color-picker-box", style: {
          background: "var(--bg-primary)",
          padding: 8,
          borderRadius: 8,
          border: "1px solid var(--border)"
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            fontSize: 10,
            display: "block",
            marginBottom: 6,
            fontWeight: 700
          }, children: "Texto Base" }),
          /* @__PURE__ */ jsx("input", { type: "color", value: ((style35 = (captionTrack45 = project.captionTrack) == null ? void 0 : captionTrack45.style) == null ? void 0 : style35.color) || "#ffffff", onChange: (event) => updateCaptionStyle({
            color: event.target.value
          }), style: {
            width: "100%",
            height: 28,
            cursor: "pointer",
            border: "none",
            borderRadius: 4,
            padding: 0
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "color-picker-box", style: {
          background: "var(--bg-primary)",
          padding: 8,
          borderRadius: 8,
          border: "1px solid var(--border)"
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            fontSize: 10,
            display: "block",
            marginBottom: 6,
            fontWeight: 700,
            color: "var(--accent)"
          }, children: "Resalte / \xC9nfasis" }),
          /* @__PURE__ */ jsx("input", { type: "color", value: ((style36 = (captionTrack46 = project.captionTrack) == null ? void 0 : captionTrack46.style) == null ? void 0 : style36.highlightColor) || "#d7ff4f", onChange: (event) => updateCaptionStyle({
            highlightColor: event.target.value
          }), style: {
            width: "100%",
            height: 28,
            cursor: "pointer",
            border: "none",
            borderRadius: 4,
            padding: 0
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "color-picker-box", style: {
          background: "var(--bg-primary)",
          padding: 8,
          borderRadius: 8,
          border: "1px solid var(--border)"
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            fontSize: 10,
            display: "block",
            marginBottom: 6,
            fontWeight: 700
          }, children: "Borde (Stroke)" }),
          /* @__PURE__ */ jsx("input", { type: "color", value: ((style37 = (captionTrack47 = project.captionTrack) == null ? void 0 : captionTrack47.style) == null ? void 0 : style37.outlineColor) || "#08090d", onChange: (event) => updateCaptionStyle({
            outlineColor: event.target.value
          }), style: {
            width: "100%",
            height: 28,
            cursor: "pointer",
            border: "none",
            borderRadius: 4,
            padding: 0
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
        marginTop: 14
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
          /* @__PURE__ */ jsx("label", { children: "Grosor de Borde" }),
          /* @__PURE__ */ jsxs("span", { className: "val-badge", children: [
            ((style38 = (captionTrack48 = project.captionTrack) == null ? void 0 : captionTrack48.style) == null ? void 0 : style38.outlineWidth) ?? 5,
            "px"
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "range", min: "0", max: "20", value: ((style39 = (captionTrack49 = project.captionTrack) == null ? void 0 : captionTrack49.style) == null ? void 0 : style39.outlineWidth) ?? 5, onChange: (event) => updateCaptionStyle({
          outlineWidth: Number(event.target.value)
        }), className: "form-range" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
          /* @__PURE__ */ jsx("label", { children: "Sombra Luminosa (Glow)" }),
          /* @__PURE__ */ jsxs("span", { className: "val-badge", children: [
            ((style40 = (captionTrack50 = project.captionTrack) == null ? void 0 : captionTrack50.style) == null ? void 0 : style40.glow) ?? 20,
            "px"
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "range", min: "0", max: "60", value: ((style41 = (captionTrack51 = project.captionTrack) == null ? void 0 : captionTrack51.style) == null ? void 0 : style41.glow) ?? 20, onChange: (event) => updateCaptionStyle({
          glow: Number(event.target.value)
        }), className: "form-range" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", children: [
      /* @__PURE__ */ jsx("h4", { children: "\u{1F4CD} Posicionamiento de Subt\xEDtulos" }),
      /* @__PURE__ */ jsx("div", { style: {
        marginTop: 12,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8
      }, children: [{
        label: "\u2B06\uFE0F Arriba",
        value: 18,
        desc: "Superior"
      }, {
        label: "\u23FA\uFE0F Centro",
        value: 50,
        desc: "Medio"
      }, {
        label: "\u2B07\uFE0F Abajo",
        value: 84,
        desc: "Inferior"
      }].map((item) => {
        var captionTrack;
        var style;
        const posY = ((style = (captionTrack = project.captionTrack) == null ? void 0 : captionTrack.style) == null ? void 0 : style.posY) ?? 84;
        const isSelectedPosition = Math.abs(posY - item.value) < 12;
        return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => updateCaptionStyle({
          posY: item.value
        }), style: {
          padding: "10px 8px",
          background: isSelectedPosition ? "rgba(99, 102, 241, 0.22)" : "rgba(255, 255, 255, 0.03)",
          border: "1px solid " + (isSelectedPosition ? "var(--indigo, #6366f1)" : "rgba(255, 255, 255, 0.08)"),
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          cursor: "pointer",
          boxShadow: isSelectedPosition ? "0 0 10px rgba(99, 102, 241, 0.25)" : "none",
          transition: "all 120ms ease"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 12,
            fontWeight: 800,
            color: isSelectedPosition ? "#fff" : "var(--text-primary)"
          }, children: item.label }),
          /* @__PURE__ */ jsxs("span", { style: {
            fontSize: 9.5,
            fontWeight: 600,
            color: isSelectedPosition ? "#c7d2fe" : "var(--text-muted)"
          }, children: [
            item.desc,
            " (",
            item.value,
            "%)"
          ] })
        ] }, item.value);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", style: {
        marginTop: 12
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "label-row", children: [
          /* @__PURE__ */ jsx("label", { style: {
            fontSize: 11,
            color: "var(--text-muted)"
          }, children: "Ajuste fino (Y)" }),
          /* @__PURE__ */ jsxs("span", { className: "val-badge", children: [
            ((style42 = (captionTrack52 = project.captionTrack) == null ? void 0 : captionTrack52.style) == null ? void 0 : style42.posY) ?? 84,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "range", min: "5", max: "95", step: "1", value: ((style43 = (captionTrack53 = project.captionTrack) == null ? void 0 : captionTrack53.style) == null ? void 0 : style43.posY) ?? 84, onChange: (event) => updateCaptionStyle({
          posY: Number(event.target.value)
        }), className: "form-range", title: "Desliza para micro-ajuste de altura" })
      ] })
    ] })
  ] });
};
const _Component0 = ({
  project,
  updateProject,
  renderState,
  onRenderVideo
}) => {
  var captionTrack54;
  var captionTrack55;
  var captionTrack56;
  var captionTrack57;
  var captionTrack58;
  var captionTrack59;
  var captionTrack60;
  var captionTrack61;
  var captionTrack62;
  var captionTrack63;
  var captionTrack64;
  const cues = ((captionTrack54 = project.captionTrack) == null ? void 0 : captionTrack54.cues) || [];
  const hasCaptions = cues.length > 0;
  const handleClick23 = () => {
    if (!cues.length) {
      return;
    }
    const text = ta(cues);
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8"
    });
    const objectUrl = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = objectUrl;
    element.download = (project.title || "subtitulos") + ".srt";
    element.click();
    URL.revokeObjectURL(objectUrl);
  };
  const handleClick24 = () => {
    if (!cues.length) {
      return;
    }
    const vttContent = aa(cues);
    const blob = new Blob([vttContent], {
      type: "text/vtt;charset=utf-8"
    });
    const objectUrl = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = objectUrl;
    element.download = (project.title || "subtitulos") + ".vtt";
    element.click();
    URL.revokeObjectURL(objectUrl);
  };
  return /* @__PURE__ */ jsxs("div", { className: "tab-pane", children: [
    /* @__PURE__ */ jsx("div", { className: "pane-header", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "RENDERIZADO" }),
      /* @__PURE__ */ jsx("h3", { children: "Exportar Video Final" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "card-box", children: [
      /* @__PURE__ */ jsx("h4", { children: "Ajustes de exportaci\xF3n" }),
      /* @__PURE__ */ jsx("p", { className: "card-sub", children: "Elige el motor de render para compilar el video en formato MP4 de alta calidad." }),
      /* @__PURE__ */ jsxs("div", { className: "engine-toggle-grid", children: [
        /* @__PURE__ */ jsxs("button", { className: "engine-btn " + (project.engine === "remotion" ? "active" : ""), onClick: () => updateProject({
          engine: "remotion"
        }), children: [
          /* @__PURE__ */ jsx("b", { children: "Remotion Pro" }),
          /* @__PURE__ */ jsx("small", { children: "Subt\xEDtulos animados, motion graphics y transiciones fluidas" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "engine-btn " + (project.engine === "ffmpeg" ? "active" : ""), onClick: () => updateProject({
          engine: "ffmpeg"
        }), children: [
          /* @__PURE__ */ jsx("b", { children: "FFmpeg R\xE1pido" }),
          /* @__PURE__ */ jsx("small", { children: "Render ultra r\xE1pido solo con im\xE1genes y movimientos de c\xE1mara" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        marginTop: 14,
        marginBottom: 14
      }, children: [
        /* @__PURE__ */ jsx("label", { style: {
          fontSize: 11,
          fontWeight: 800,
          color: "var(--text-muted)",
          display: "block",
          marginBottom: 6
        }, children: "Resoluci\xF3n de Salida" }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6
        }, children: [{
          id: "720p",
          label: "720p HD",
          desc: "R\xE1pido"
        }, {
          id: "1080p",
          label: "1080p Full HD",
          desc: "Recomendado"
        }, {
          id: "2k",
          label: "2K QHD",
          desc: "1440p N\xEDtido"
        }, {
          id: "4k",
          label: "4K UHD",
          desc: "2160p M\xE1x"
        }].map((item) => {
          const isSelectedResolution = (project.resolution || "1080p") === item.id;
          return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => updateProject({
            resolution: item.id
          }), style: {
            background: isSelectedResolution ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
            border: "1px solid " + (isSelectedResolution ? "var(--indigo, #6366f1)" : "rgba(255, 255, 255, 0.08)"),
            borderRadius: 8,
            padding: "8px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            cursor: "pointer",
            textAlign: "left"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 11.5,
              fontWeight: 800,
              color: isSelectedResolution ? "#fff" : "var(--text-primary)"
            }, children: item.label }),
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 9.5,
              color: isSelectedResolution ? "#a5b4fc" : "var(--text-muted)"
            }, children: item.desc })
          ] }, item.id);
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { style: {
        marginTop: 14,
        padding: "10px 12px",
        background: "rgba(255, 255, 255, 0.03)",
        borderRadius: 8,
        border: "1px solid rgba(255, 255, 255, 0.08)"
      }, children: /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 11.5,
            fontWeight: 800,
            color: "#fff"
          }, children: "\u{1F525} Subt\xEDtulos Quemados (Burn-In)" }),
          /* @__PURE__ */ jsx("p", { style: {
            fontSize: 10,
            color: "var(--text-muted)",
            margin: "2px 0 0"
          }, children: "Incrusta la tipograf\xEDa animada directamente en los fotogramas del video" })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: {
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: ((captionTrack55 = project.captionTrack) == null ? void 0 : captionTrack55.burnIn) !== false && ((captionTrack56 = project.captionTrack) == null ? void 0 : captionTrack56.enabled) !== false, onChange: (event) => {
            var captionTrack;
            updateProject({
              captionTrack: {
                ...project.captionTrack,
                burnIn: event.target.checked,
                enabled: event.target.checked ? true : (captionTrack = project.captionTrack) == null ? void 0 : captionTrack.enabled
              }
            });
          }, style: {
            display: "none"
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            padding: "4px 10px",
            borderRadius: 99,
            fontSize: 10.5,
            fontWeight: 800,
            background: ((captionTrack57 = project.captionTrack) == null ? void 0 : captionTrack57.burnIn) !== false && ((captionTrack58 = project.captionTrack) == null ? void 0 : captionTrack58.enabled) !== false ? "var(--indigo, #6366f1)" : "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            transition: "all 0.2s"
          }, children: ((captionTrack59 = project.captionTrack) == null ? void 0 : captionTrack59.burnIn) !== false && ((captionTrack60 = project.captionTrack) == null ? void 0 : captionTrack60.enabled) !== false ? "Activado" : "Desactivado" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "export-specs-list", style: {
        marginTop: 14
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "spec-item", children: [
          /* @__PURE__ */ jsx("span", { children: "Resoluci\xF3n" }),
          /* @__PURE__ */ jsx("strong", { children: (project.resolution || "1080p").toUpperCase() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "spec-item", children: [
          /* @__PURE__ */ jsx("span", { children: "Formato" }),
          /* @__PURE__ */ jsx("strong", { children: project.format === "short" ? "9:16 (Shorts / Reels)" : "16:9 (YouTube)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "spec-item", children: [
          /* @__PURE__ */ jsx("span", { children: "FPS" }),
          /* @__PURE__ */ jsxs("strong", { children: [
            project.fps,
            " FPS"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "spec-item", children: [
          /* @__PURE__ */ jsx("span", { children: "Escenas" }),
          /* @__PURE__ */ jsxs("strong", { children: [
            project.scenes.length,
            " escenas"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "spec-item", children: [
          /* @__PURE__ */ jsx("span", { children: "Burn-In Subt\xEDtulos" }),
          /* @__PURE__ */ jsx("strong", { style: {
            color: ((captionTrack61 = project.captionTrack) == null ? void 0 : captionTrack61.burnIn) !== false && ((captionTrack62 = project.captionTrack) == null ? void 0 : captionTrack62.enabled) !== false ? "#34d399" : "#a1a1aa"
          }, children: ((captionTrack63 = project.captionTrack) == null ? void 0 : captionTrack63.burnIn) !== false && ((captionTrack64 = project.captionTrack) == null ? void 0 : captionTrack64.enabled) !== false ? "S\xED (Incrustados)" : "No (Video limpio)" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "btn-big-export", onClick: onRenderVideo, disabled: renderState.status === "rendering", children: renderState.status === "rendering" ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "working", style: {
          width: 16,
          height: 16,
          borderWidth: 2
        } }),
        /* @__PURE__ */ jsx("span", { children: "Renderizando Video MP4..." })
      ] }) : /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsx("span", { children: "\u26A1" }),
        /* @__PURE__ */ jsx("span", { children: "EXPORTAR VIDEO COMPLETO (MP4)" })
      ] }) }),
      hasCaptions && /* @__PURE__ */ jsxs("div", { style: {
        marginTop: 14,
        paddingTop: 14,
        borderTop: "1px solid var(--border, rgba(255,255,255,0.08))"
      }, children: [
        /* @__PURE__ */ jsx("h5", { style: {
          margin: "0 0 4px",
          fontSize: 12,
          fontWeight: 800,
          color: "var(--text-primary)"
        }, children: "\u{1F4C4} Exportar Subt\xEDtulos Independientes" }),
        /* @__PURE__ */ jsxs("p", { style: {
          margin: "0 0 10px",
          fontSize: 10.5,
          color: "var(--text-muted)"
        }, children: [
          "Descarga los subt\xEDtulos sincronizados (",
          cues.length,
          " frases) para subirlos a YouTube CC, Facebook o reproductores web."
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8
        }, children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn-tool", onClick: handleClick23, style: {
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 11,
            padding: "8px"
          }, title: "Descargar archivo SubRip (.SRT) est\xE1ndar", children: "\u{1F4E5} Descargar .SRT" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn-tool", onClick: handleClick24, style: {
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 11,
            padding: "8px"
          }, title: "Descargar archivo WebVTT (.VTT) para web y HTML5", children: "\u{1F4E5} Descargar .VTT" })
        ] })
      ] })
    ] })
  ] });
};
const Ia = ({
  onUploadImage,
  onGenerateImage,
  onGenerateVideo,
  onUploadAudio,
  onUploadMusic,
  onImportSrt,
  onTranscribeAudio,
  onCreateScenesFromTranscript,
  onGenerateVisualPrompts,
  onGenerateAllImages,
  onGenerateAllVideos,
  onAutoPilot,
  onRenderVideo,
  onOpenBatchPromptsModal,
  onSelectScene,
  initialTab = "scene"
}) => {
  var captionTrack65;
  var captionTrack66;
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const [isSyncModalOpen, setIsSyncModalOpen] = React.useState(false);
  const [isCaptionEditorOpen, setIsCaptionEditorOpen] = React.useState(false);
  const project = w((state) => state.project);
  const selectedId = w((state) => state.selectedId);
  const scenes = Array.isArray(project.scenes) ? project.scenes : [];
  const found = scenes.find((item) => item.id === selectedId) || scenes[0] || {
    id: "default-scene",
    title: "Escena 1",
    prompt: "",
    duration: 4,
    motion: "gentle-zoom-in",
    status: "idle"
  };
  const updateScene = w((state) => state.updateScene);
  const removeScene = w((state) => state.removeScene);
  const updateProject = w((state) => state.updateProject);
  const setTransitionDefaults = w((state) => state.setTransitionDefaults);
  const applyTransitionToAll = w((state) => state.applyTransitionToAll);
  const updateCaptionStyle = w((state) => state.updateCaptionStyle);
  const toggleCaptions = w((state) => state.toggleCaptions);
  const autoApplyMotionGraphics = w((state) => state.autoApplyMotionGraphics);
  const clearAllMotionGraphics = w((state) => state.clearAllMotionGraphics);
  const randomizeMotions = w((state) => state.randomizeMotions);
  const toggleAllMotionsStatic = w((state) => state.toggleAllMotionsStatic);
  const removeAudioTrack = w((state) => state.removeAudioTrack);
  const removeMusicTrack = w((state) => state.removeMusicTrack);
  const clearCaptions = w((state) => state.clearCaptions);
  const syncScenesToCaptions = w((state) => state.syncScenesToCaptions);
  const addStyleReference = w((state) => state.addStyleReference);
  const removeStyleReference = w((state) => state.removeStyleReference);
  const renderState = w((state) => state.renderState);
  const assetState = w((state) => state.assetState);
  const batchState = w((state) => state.batchState);
  const promptGenState = w((state) => state.promptGenState);
  const flowState = w((state) => state.flowState);
  const cancelPromptGen = w((state) => state.cancelPromptGen);
  const cancelBatch = w((state) => state.cancelBatch);
  const captionsEnabled = ((captionTrack65 = project.captionTrack) == null ? void 0 : captionTrack65.enabled) !== false;
  const matches5 = scenes.length > 0 && scenes.every((item) => item.motion === "still");
  const matches6 = scenes.some((item) => item.isStockMotion || item.graphics && item.graphics.length > 0);
  const isTranscribing = assetState.operation === "transcription" && assetState.status === "loading";
  const isVideoGenerating = assetState.operation === "video" && assetState.status === "loading";
  const filteredMap = scenes.map((item, index) => ({
    scene: item,
    index: index + 1
  })).filter(({
    scene
  }) => !scene.isStockMotion && !scene.imageUrl && !scene.videoUrl);
  return /* @__PURE__ */ jsxs("section", { className: "inspector-panel-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "inspector-tab-nav", children: [
      /* @__PURE__ */ jsxs("button", { className: "tab-btn " + (activeTab === "scene" ? "active" : ""), onClick: () => setActiveTab("scene"), title: "01. Editar escena seleccionada", children: [
        /* @__PURE__ */ jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
          /* @__PURE__ */ jsx("path", { d: "M7 4v4M12 4v4M17 4v4M2 8h20" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "Escena" })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "tab-btn " + (activeTab === "audio" ? "active" : ""), onClick: () => setActiveTab("audio"), title: "02. Audio, voz en off y subt\xEDtulos", children: [
        /* @__PURE__ */ jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" }),
          /* @__PURE__ */ jsx("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
          /* @__PURE__ */ jsx("line", { x1: "12", y1: "19", x2: "12", y2: "23" }),
          /* @__PURE__ */ jsx("line", { x1: "8", y1: "23", x2: "16", y2: "23" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "Audio" })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "tab-btn " + (activeTab === "autopilot" ? "active" : ""), onClick: () => setActiveTab("autopilot"), title: "03. Herramientas de lotes IA y Auto-Piloto", children: [
        /* @__PURE__ */ jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) }),
        /* @__PURE__ */ jsx("span", { children: "Lotes IA" })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "tab-btn " + (activeTab === "style" ? "active" : ""), onClick: () => setActiveTab("style"), title: "04. Personalizar dise\xF1o de subt\xEDtulos", children: [
        /* @__PURE__ */ jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
          /* @__PURE__ */ jsx("path", { d: "M7 15h4M13 15h4M7 11h10" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "Subt\xEDtulos" })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "tab-btn " + (activeTab === "resources" ? "active" : ""), onClick: () => setActiveTab("resources"), title: "05. Biblioteca de recursos y escenas", children: [
        /* @__PURE__ */ jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" }) }),
        /* @__PURE__ */ jsx("span", { children: "Recursos" })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "tab-btn " + (activeTab === "copilot" ? "active" : ""), onClick: () => setActiveTab("copilot"), title: "06. FLOWSTUDIO Copilot Asistente IA", children: [
        /* @__PURE__ */ jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
        /* @__PURE__ */ jsx("span", { children: "Copilot" })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "tab-btn " + (activeTab === "export" ? "active" : ""), onClick: () => setActiveTab("export"), title: "07. Exportar video final MP4", children: [
        /* @__PURE__ */ jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
          /* @__PURE__ */ jsx("polyline", { points: "7 10 12 15 17 10" }),
          /* @__PURE__ */ jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "Exportar" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "inspector-scroll-body", children: [
      activeTab === "scene" ? /* @__PURE__ */ jsx(_Component6, { selected: found, project, scenes, updateScene, removeScene, updateProject, addStyleReference, removeStyleReference, setTransitionDefaults, applyTransitionToAll, flowState, isVideoGenerating, onUploadImage, onGenerateImage, onGenerateVideo, onOpenBatchPromptsModal, onTranscribeAudio }) : null,
      activeTab === "audio" ? /* @__PURE__ */ jsx(_Component7, { project, updateProject, assetState, isTranscribing, onUploadAudio, onTranscribeAudio, onUploadMusic, removeAudioTrack, removeMusicTrack, clearCaptions, onImportSrt, onCreateScenesFromTranscript, setIsCaptionEditorOpen, setIsSyncModalOpen, syncScenesToCaptions }) : null,
      activeTab === "autopilot" ? /* @__PURE__ */ jsx(_Component8, { project, updateProject, scenes, selected: found, batchState, promptGenState, flowState, missingImageScenes: filteredMap, allStatic: matches5, hasGraphics: matches6, onGenerateAllImages, onAutoPilot, cancelPromptGen, cancelBatch, onCreateScenesFromTranscript, onGenerateVisualPrompts, onGenerateAllVideos, onGenerateVideo, autoApplyMotionGraphics, clearAllMotionGraphics, toggleAllMotionsStatic, randomizeMotions }) : null,
      activeTab === "style" ? /* @__PURE__ */ jsx(Sr, { project, captionsEnabled, toggleCaptions, updateCaptionStyle }) : null,
      activeTab === "resources" ? /* @__PURE__ */ jsx("div", { className: "tab-pane resources-pane", style: {
        padding: "10px 4px"
      }, children: /* @__PURE__ */ jsx(_Component9, { onSelectScene }) }) : null,
      activeTab === "copilot" ? /* @__PURE__ */ jsx("div", { className: "tab-pane copilot-pane", children: /* @__PURE__ */ jsxs("div", { className: "next-copilot-coming-soon", "aria-label": "FLOWSTUDIO Copilot", children: [
        /* @__PURE__ */ jsx("div", { className: "next-copilot-coming-icon", children: "FT" }),
        /* @__PURE__ */ jsx("span", { children: "FLOWSTUDIO COPILOT" }),
        /* @__PURE__ */ jsx("h3", { children: "Asistente Creativo IA" }),
        /* @__PURE__ */ jsx("p", { children: "El copiloto inteligente analiza tu gui\xF3n, optimiza los prompts y te ayuda a pulir cada toma en segundos." }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("i", {}),
          " Pr\xF3ximamente integrado"
        ] })
      ] }) }) : null,
      activeTab === "export" ? /* @__PURE__ */ jsx(_Component0, { project, updateProject, renderState, onRenderVideo }) : null
    ] }),
    /* @__PURE__ */ jsx(_Component2, { isOpen: isSyncModalOpen, onClose: () => setIsSyncModalOpen(false), onTranscribeWhisper: onTranscribeAudio }),
    /* @__PURE__ */ jsx(_Component1, { isOpen: isCaptionEditorOpen, cues: ((captionTrack66 = project.captionTrack) == null ? void 0 : captionTrack66.cues) || [], onClose: () => setIsCaptionEditorOpen(false), onSave: (cues) => {
      updateProject({
        captionTrack: {
          ...project.captionTrack,
          cues
        }
      });
      setIsCaptionEditorOpen(false);
    } })
  ] });
};
const Aa = ({
  activeTask
}) => {
  if (!activeTask) {
    return null;
  }
  const value = Math.min(100, Math.max(2, activeTask.progress || 0));
  return /* @__PURE__ */ jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 9999,
    background: "rgba(99, 102, 241, 0.15)",
    pointerEvents: "none",
    overflow: "hidden"
  }, title: activeTask.label + ": " + value + "%", children: /* @__PURE__ */ jsx("div", { style: {
    height: "100%",
    width: value + "%",
    background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
    boxShadow: "0 0 10px rgba(99, 102, 241, 0.85)",
    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  } }) });
};
const _Component13 = ({
  previewProps,
  inspectorProps
}) => {
  var audioTrack;
  const [dockTab, setDockTab] = React.useState("properties");
  const [isDockCollapsed, setIsDockCollapsed] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isHoveringPlayer, setIsHoveringPlayer] = React.useState(false);
  const [copilotInput, setCopilotInput] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([{
    role: "assistant",
    text: "Estoy listo para ayudarte con este proyecto. Puedes preparar prompts, generar im\xE1genes, transcribir el audio o revisar la escena seleccionada."
  }]);
  const project = w((state) => state.project);
  const selectedId = w((state) => state.selectedId);
  const renderState = w((state) => state.renderState);
  const scenes = Array.isArray(project.scenes) ? project.scenes : [];
  const fps = Number(project.fps) || 30;
  const compositionSize = project.format === "short" ? {
    width: 1080,
    height: 1920
  } : {
    width: 1920,
    height: 1080
  };
  const value = React.useMemo(() => {
    var audioTrack2;
    return Math.max(1, Ya(scenes, fps, ((audioTrack2 = project.audioTrack) == null ? void 0 : audioTrack2.durationMs) || 0));
  }, [scenes, fps, (audioTrack = project.audioTrack) == null ? void 0 : audioTrack.durationMs]);
  React.useEffect(() => {
    var playerRef;
    const current = (playerRef = previewProps.playerRef) == null ? void 0 : playerRef.current;
    if (!current) {
      return;
    }
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    current.addEventListener("play", handlePlay);
    current.addEventListener("pause", handlePause);
    current.addEventListener("ended", handlePause);
    return () => {
      current.removeEventListener("play", handlePlay);
      current.removeEventListener("pause", handlePause);
      current.removeEventListener("ended", handlePause);
    };
  }, [previewProps.playerRef]);
  const assetState = w((state) => state.assetState);
  const batchState = w((state) => state.batchState);
  const promptGenState = w((state) => state.promptGenState);
  const scene = project.scenes.find((scene2) => scene2.id === selectedId) || project.scenes[0];
  const totalScenes = React.useMemo(() => project.scenes.reduce((acc, scene2) => acc + Math.max(0.5, Number(scene2.duration) || 4), 0), [project.scenes]);
  const hasScene = project.scenes.length > 0 && project.scenes.every((scene2) => scene2.isStockMotion || scene2.imageUrl || scene2.videoUrl);
  React.useEffect(() => {
    if (batchState.running && hasScene) {
      w.getState().setBatchState((prev) => ({
        ...prev,
        running: false
      }));
    }
  }, [batchState.running, hasScene]);
  const activeTask = promptGenState.running ? {
    label: "Creando prompts",
    progress: promptGenState.percent || 0
  } : batchState.running && !hasScene ? {
    label: "Generando im\xE1genes",
    progress: batchState.total ? Math.round(batchState.done / batchState.total * 100) : 0
  } : assetState.status === "loading" ? {
    label: assetState.message || "Procesando recurso",
    progress: assetState.progress || 12
  } : renderState.status === "rendering" ? {
    label: renderState.message || "Renderizando",
    progress: renderState.progress || 8
  } : null;
  if (project.format === "short") {
    return /* @__PURE__ */ jsxs("div", { className: "next-workbench short-workbench-mode", style: {
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx(Aa, { activeTask }),
      /* @__PURE__ */ jsxs("div", { className: "short-body-grid", children: [
        /* @__PURE__ */ jsxs("section", { className: "short-content-pane", children: [
          /* @__PURE__ */ jsx("div", { className: "short-dock-top", children: /* @__PURE__ */ jsx(Ia, { ...inspectorProps, onSelectScene: previewProps.onSelectScene }) }),
          /* @__PURE__ */ jsx("div", { className: "short-timeline-bottom", children: /* @__PURE__ */ jsx(Zt, { scenes: project.scenes, fps: project.fps, durationInFrames: value, selectedId, playerRef: previewProps.playerRef, onSelectScene: previewProps.onSelectScene, audioTrack: project.audioTrack, musicTrack: project.musicTrack, captionTrack: project.captionTrack, onUploadImage: previewProps.onUploadImage, onUploadAudio: previewProps.onUploadAudio, onUploadMusic: previewProps.onUploadMusic || previewProps.onUploadAudio, onImportSrt: previewProps.onImportSrt, onTranscribeAudio: previewProps.onTranscribeAudio, onCreateScenesFromTranscript: previewProps.onCreateScenesFromTranscript, onOpenBatchPromptsModal: previewProps.onOpenBatchPromptsModal }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "short-player-pane", children: [
          /* @__PURE__ */ jsx("div", { className: "player-wrapper-outer", children: /* @__PURE__ */ jsxs("div", { className: "player-frame short", onMouseEnter: () => setIsHoveringPlayer(true), onMouseLeave: () => setIsHoveringPlayer(false), onClick: () => {
            var current9;
            var current10;
            var current11;
            if ((current9 = previewProps.playerRef.current) != null && current9.isPlaying()) {
              if ((current10 = previewProps.playerRef.current) != null) {
                current10.pause();
              }
            } else if ((current11 = previewProps.playerRef.current) != null) {
              current11.play();
            }
          }, style: {
            cursor: "pointer",
            position: "relative",
            overflow: "hidden"
          }, children: [
            /* @__PURE__ */ jsx(Player, { ref: previewProps.playerRef, component: Ha, inputProps: {
              scenes: project.scenes,
              audioTrack: project.audioTrack,
              musicTrack: project.musicTrack,
              captionTrack: project.captionTrack,
              transitions: project.transitions,
              fps: project.fps,
              format: project.format,
              overlays: project.overlays
            }, durationInFrames: value, compositionWidth: compositionSize.width, compositionHeight: compositionSize.height, fps: project.fps, controls: false, loop: true, style: {
              width: "100%",
              height: "100%",
              background: "#0a0a0a"
            } }),
            /* @__PURE__ */ jsx("div", { style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 60,
              background: "linear-gradient(to bottom, rgba(3, 7, 18, 0.75), transparent)",
              pointerEvents: "none",
              opacity: isHoveringPlayer ? 1 : 0,
              transition: "opacity 0.25s ease",
              zIndex: 10
            } }),
            /* @__PURE__ */ jsx("div", { style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              background: "linear-gradient(to top, rgba(3, 7, 18, 0.75), transparent)",
              pointerEvents: "none",
              opacity: isHoveringPlayer ? 1 : 0,
              transition: "opacity 0.25s ease",
              zIndex: 10
            } }),
            /* @__PURE__ */ jsxs("div", { style: {
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 20,
              opacity: isHoveringPlayer ? 1 : 0,
              transition: "opacity 0.25s ease",
              pointerEvents: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(10, 14, 23, 0.82)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 20,
              padding: "3px 8px",
              backdropFilter: "blur(12px)",
              color: "#c7d2fe",
              fontSize: 10,
              fontWeight: 800
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "\u{1F4F1} 9:16 Short" }),
              /* @__PURE__ */ jsx("span", { style: {
                opacity: 0.5
              }, children: "\xB7" }),
              /* @__PURE__ */ jsxs("span", { children: [
                project.fps,
                " FPS"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(" + (isHoveringPlayer ? 1 : 0.85) + ")",
              zIndex: 25,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: isPlaying ? "rgba(15, 23, 42, 0.65)" : "rgba(79, 70, 229, 0.85)",
              border: "1.5px solid rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: isPlaying ? 18 : 20,
              opacity: isHoveringPlayer ? isPlaying ? 0.35 : 0.95 : 0,
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: "none",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)"
            }, children: /* @__PURE__ */ jsx("span", { style: {
              marginLeft: isPlaying ? 0 : 3
            }, children: isPlaying ? "\u23F8" : "\u25B6" }) })
          ] }) }),
          /* @__PURE__ */ jsx(Ja, { playerRef: previewProps.playerRef, durationInFrames: value, fps, activeTask, style: {
            borderRadius: "0 0 12px 12px"
          } })
        ] })
      ] })
    ] });
  } else {
    return /* @__PURE__ */ jsxs("div", { className: "next-workbench-container", style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx(Aa, { activeTask }),
      /* @__PURE__ */ jsxs("div", { className: "next-workbench " + (isDockCollapsed ? "dock-collapsed" : ""), style: {
        flex: 1,
        minHeight: 0,
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }, children: [
        /* @__PURE__ */ jsxs("aside", { className: "next-dock", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "next-dock-toggle", onClick: () => setIsDockCollapsed((prev) => !prev), "aria-label": isDockCollapsed ? "Expandir panel" : "Contraer panel", title: isDockCollapsed ? "Expandir panel" : "Contraer panel", children: isDockCollapsed ? "\u203A" : "\u2039" }),
          /* @__PURE__ */ jsx("div", { className: "next-dock-body", children: /* @__PURE__ */ jsx(Ia, { ...inspectorProps, onSelectScene: previewProps.onSelectScene }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "next-stage horizontal-stage", children: /* @__PURE__ */ jsx(_Component10, { ...previewProps, hideTimeline: true, activeTask, projectSeconds: totalScenes, selectedTitle: scene == null ? void 0 : scene.title }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "next-timeline-bottom", style: {
        flex: "0 0 320px",
        display: "flex",
        flexDirection: "column",
        background: "#05060b"
      }, children: /* @__PURE__ */ jsx(Zt, { scenes: project.scenes, fps: project.fps, durationInFrames: value, selectedId, playerRef: previewProps.playerRef, onSelectScene: previewProps.onSelectScene, audioTrack: project.audioTrack, musicTrack: project.musicTrack, captionTrack: project.captionTrack, onUploadImage: previewProps.onUploadImage, onUploadAudio: previewProps.onUploadAudio, onUploadMusic: previewProps.onUploadMusic || previewProps.onUploadAudio, onImportSrt: previewProps.onImportSrt, onTranscribeAudio: previewProps.onTranscribeAudio, onCreateScenesFromTranscript: previewProps.onCreateScenesFromTranscript, onOpenBatchPromptsModal: previewProps.onOpenBatchPromptsModal }) })
    ] });
  }
};
const Za = React.createContext(null);
let Cr = 0;
const Mr = ({
  children
}) => {
  const [toasts, setToasts] = React.useState([]);
  const addToast = React.useCallback((message, type = "info", duration = 4e3) => {
    const id = ++Cr;
    setToasts((prev) => [...prev, {
      id,
      message,
      type
    }]);
    if (duration > 0) {
      setTimeout(() => setToasts((media) => media.filter((item) => item.id !== id)), duration);
    }
    return id;
  }, []);
  const removeToast = React.useCallback((id) => {
    setToasts((media) => media.filter((item) => item.id !== id));
  }, []);
  return /* @__PURE__ */ jsxs(Za.Provider, { value: {
    addToast,
    removeToast
  }, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "ft-toast-container", children: toasts.map((item) => /* @__PURE__ */ jsxs("div", { className: "ft-toast ft-toast-" + item.type, children: [
      /* @__PURE__ */ jsx("span", { children: item.message }),
      /* @__PURE__ */ jsx("button", { onClick: () => removeToast(item.id), children: "\u2715" })
    ] }, item.id)) })
  ] });
};
const po = () => {
  const context = React.useContext(Za);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
const Ea = {
  "\u2705": "#4ade80",
  "\u274C": "#f87171",
  "\u26A0\uFE0F": "#fbbf24",
  "\u{1F680}": "#60a5fa",
  "\u{1F4E6}": "#a78bfa",
  "\u{1F3A8}": "#f472b6",
  "\u{1F5BC}\uFE0F": "#38bdf8",
  "\u{1F4E4}": "#818cf8",
  "\u23F3": "#94a3b8",
  "\u26A1": "#5b8cff",
  "\u2601\uFE0F": "#38bdf8",
  "\u{1F399}\uFE0F": "#f9a8d4"
};
const Nr = (line, index) => {
  const match = String(line).match(/^\[([^\]]+)] \[([^\]]+)]\s*(.*)$/);
  if (!match) {
    return {
      id: "disk-" + index,
      time: "",
      type: "\u2139\uFE0F",
      msg: String(line)
    };
  }
  const now = new Date(match[1]);
  return {
    id: "disk-" + index + "-" + match[1],
    time: Number.isNaN(now.getTime()) ? match[1] : now.toLocaleTimeString("es", {
      hour12: false
    }),
    type: match[2],
    msg: match[3]
  };
};
const Tr = ({
  liveLogs,
  onClear
}) => {
  const [diskLogs, setDiskLogs] = React.useState([]);
  const divRef = React.useRef(null);
  React.useEffect(() => {
    let cancelled = false;
    const fetchLogs = async () => {
      var electronAPI;
      try {
        const appLogs = (electronAPI = window.electronAPI) != null && electronAPI.getAppLogs ? await window.electronAPI.getAppLogs(350) : [];
        if (!cancelled) {
          setDiskLogs((appLogs || []).map(Nr));
        }
      } catch {
        if (!cancelled) {
          setDiskLogs([]);
        }
      }
    };
    fetchLogs();
    const timer = setInterval(fetchLogs, 2e3);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);
  const items = diskLogs.length ? diskLogs : (liveLogs || []).map((item, index) => ({
    ...item,
    id: "live-" + index + "-" + item.time
  }));
  React.useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [items.length]);
  const handleClick = async () => {
    var electronAPI;
    var clearAppLogs;
    try {
      await ((clearAppLogs = (electronAPI = window.electronAPI) == null ? void 0 : electronAPI.clearAppLogs) == null ? void 0 : clearAppLogs.call(electronAPI));
    } catch {
    }
    setDiskLogs([]);
    if (onClear != null) {
      onClear();
    }
  };
  return /* @__PURE__ */ jsxs("div", { style: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    flex: 1
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 10px",
      borderBottom: "1px solid #202635"
    }, children: [
      /* @__PURE__ */ jsxs("span", { style: {
        color: "#778197",
        fontSize: 9.5
      }, children: [
        items.length,
        " registros persistentes"
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: handleClick, style: {
        border: "1px solid #303747",
        background: "#171b24",
        color: "#98a2b4",
        borderRadius: 6,
        padding: "4px 8px",
        cursor: "pointer",
        fontSize: 9.5
      }, children: "Limpiar logs" })
    ] }),
    /* @__PURE__ */ jsx("div", { ref: divRef, style: {
      overflowY: "auto",
      flex: 1,
      padding: "6px 0",
      fontFamily: "ui-monospace, Consolas, monospace"
    }, children: items.length ? items.map((item, index) => /* @__PURE__ */ jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "62px 68px 1fr",
      gap: 5,
      padding: "4px 10px",
      borderBottom: "1px solid rgba(31,37,50,.65)",
      alignItems: "start"
    }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        color: "#566174",
        fontSize: 9
      }, children: item.time }),
      /* @__PURE__ */ jsx("span", { style: {
        color: Ea[item.type] || "#8b95a7",
        fontSize: 9,
        overflow: "hidden",
        textOverflow: "ellipsis"
      }, children: item.type }),
      /* @__PURE__ */ jsx("span", { style: {
        color: Ea[item.type] || "#c3cad6",
        fontSize: 9.5,
        lineHeight: 1.4,
        wordBreak: "break-word"
      }, children: item.msg })
    ] }, item.id || index)) : /* @__PURE__ */ jsx("div", { style: {
      color: "#667085",
      padding: 24,
      textAlign: "center",
      fontSize: 10.5
    }, children: "Todav\xEDa no hay registros." }) })
  ] });
};
const Yt = "flowtube_task_history_v1";
const Pa = "flowtube_active_tasks_v1";
const Ra = (yt, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(yt) || "null") ?? fallback;
  } catch {
    return fallback;
  }
};
const qt = (status) => status === "error" ? "#f87171" : status === "done" || status === "ready" ? "#4ade80" : status === "paused" || status === "interrupted" ? "#fbbf24" : "#818cf8";
const Ir = (task) => {
  if (!task.startedAt || !task.progress || task.progress >= 100) {
    return "";
  }
  const elapsedMs = Date.now() - task.startedAt;
  const value = Math.max(0, Math.round(elapsedMs / task.progress * (100 - task.progress) / 1e3));
  if (value < 60) {
    return " \xB7 ~" + value + "s restantes";
  } else {
    return " \xB7 ~" + Math.ceil(value / 60) + " min restantes";
  }
};
const It = ({
  logs = [],
  onClearLogs,
  onResumeBatch,
  onResumePrompts,
  onRetryTranscription,
  onCancelTranscription,
  onRetryRender
}) => {
  const batchState = w((state) => state.batchState);
  const project = w((state) => state.project);
  const promptGenState = w((state) => state.promptGenState);
  const assetState = w((state) => state.assetState);
  const renderState = w((state) => state.renderState);
  const cancelBatch = w((state) => state.cancelBatch);
  const cancelPromptGen = w((state) => state.cancelPromptGen);
  const batchPaused = w((state) => state.batchPaused);
  const pauseBatch = w((state) => state.pauseBatch);
  const resumeBatch = w((state) => state.resumeBatch);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("tasks");
  const [taskHistory, setTaskHistory] = React.useState(() => Ra(Yt, []));
  const [interruptedTasks, setInterruptedTasks] = React.useState(() => Ra(Pa, []).map((ra2) => ({
    ...ra2,
    status: "interrupted",
    message: "Interrumpida al cerrar la aplicaci\xF3n"
  })));
  const ref = React.useRef(/* @__PURE__ */ new Set());
  const divRef = React.useRef(null);
  const scene = (project.scenes || []).find((scene2) => scene2.status === "video-generating" || scene2.videoOperation);
  const videoModelLabel = (scene == null ? void 0 : scene.videoModel) === "omni" ? "Omni Flash" : "Veo 3.1 Lite";
  React.useEffect(() => {
    const handleOpenTaskCenter = (state) => {
      var detail;
      setActiveTab(((detail = state.detail) == null ? void 0 : detail.panel) === "logs" ? "logs" : "tasks");
      setIsOpen(true);
    };
    window.addEventListener("flowtube:open-task-center", handleOpenTaskCenter);
    return () => window.removeEventListener("flowtube:open-task-center", handleOpenTaskCenter);
  }, []);
  const activeTasks = React.useMemo(() => {
    const items2 = [];
    if (batchState.running) {
      items2.push({
        id: "batch-images",
        type: "batch",
        title: "Generaci\xF3n de im\xE1genes",
        status: batchPaused ? "paused" : "running",
        startedAt: batchState.startedAt,
        progress: batchState.total ? Math.round(batchState.done / batchState.total * 100) : 0,
        message: batchState.message || (batchState.done || 0) + "/" + (batchState.total || 0)
      });
    }
    if (promptGenState.running) {
      items2.push({
        id: "prompt-generation",
        type: "prompts",
        title: "Generaci\xF3n de prompts",
        status: "running",
        startedAt: promptGenState.startedAt,
        progress: promptGenState.percent || (promptGenState.total ? Math.round(promptGenState.done / promptGenState.total * 100) : 0),
        message: promptGenState.message || (promptGenState.done || 0) + "/" + (promptGenState.total || 0)
      });
    }
    if (assetState.operation === "transcription" && assetState.status === "loading") {
      items2.push({
        id: "transcription",
        type: "transcription",
        title: "Transcripci\xF3n de audio",
        status: "running",
        startedAt: assetState.startedAt,
        progress: Number(assetState.progress) || 0,
        message: assetState.message || "Procesando audio..."
      });
    }
    if (assetState.operation === "video" && assetState.status === "loading") {
      items2.push({
        id: "flow-image-to-video",
        type: "video-generation",
        title: "Imagen \u2192 video \xB7 " + videoModelLabel,
        status: "running",
        startedAt: assetState.startedAt,
        progress: Number(assetState.progress) || 0,
        message: assetState.message || "Procesando con " + videoModelLabel + "..."
      });
    }
    if (renderState.status === "rendering") {
      items2.push({
        id: "render",
        type: "render",
        title: "Render de video",
        status: "running",
        startedAt: renderState.startedAt,
        progress: Number(renderState.progress) || 0,
        message: renderState.message || "Renderizando..."
      });
    }
    return items2;
  }, [videoModelLabel, assetState, batchPaused, batchState, promptGenState, renderState]);
  React.useEffect(() => {
    localStorage.setItem(Pa, JSON.stringify(activeTasks));
  }, [activeTasks]);
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleOutsideClick = (event) => {
      var current;
      if ((current = divRef.current) == null || !current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isOpen]);
  React.useEffect(() => {
    var failures;
    const items32 = [];
    if (!batchState.running && batchState.total > 0 && batchState.done > 0) {
      items32.push({
        id: "batch-" + batchState.done + "-" + batchState.total,
        type: "batch",
        title: "Generaci\xF3n de im\xE1genes",
        status: (failures = batchState.failures) != null && failures.length ? "error" : "done",
        progress: 100,
        message: batchState.done + "/" + batchState.total + " procesadas"
      });
    }
    if (assetState.operation === "transcription" && ["ready", "error"].includes(assetState.status)) {
      items32.push({
        id: "transcription-" + assetState.status + "-" + assetState.message,
        type: "transcription",
        title: "Transcripci\xF3n de audio",
        status: assetState.status,
        progress: assetState.status === "ready" ? 100 : 0,
        message: assetState.message
      });
    }
    if (assetState.operation === "video" && ["ready", "error"].includes(assetState.status)) {
      items32.push({
        id: "video-generation-" + assetState.status + "-" + assetState.message,
        type: "video-generation",
        title: "Imagen \u2192 video \xB7 " + videoModelLabel,
        status: assetState.status,
        progress: assetState.status === "ready" ? 100 : 0,
        message: assetState.message
      });
    }
    if (["done", "error"].includes(renderState.status)) {
      items32.push({
        id: "render-" + renderState.status + "-" + renderState.message,
        type: "render",
        title: "Render de video",
        status: renderState.status,
        progress: renderState.status === "done" ? 100 : 0,
        message: renderState.message
      });
    }
    const items33 = items32.filter((item) => item.message && !ref.current.has(item.id));
    if (items33.length) {
      items33.forEach((item) => ref.current.add(item.id));
      setTaskHistory((prev) => {
        const nextHistory = [...items33.map((item) => ({
          ...item,
          finishedAt: Date.now()
        })), ...prev].slice(0, 40);
        localStorage.setItem(Yt, JSON.stringify(nextHistory));
        return nextHistory;
      });
    }
  }, [assetState, batchState, renderState]);
  const handleCancel = (item) => {
    if (item.type === "batch") {
      cancelBatch();
    }
    if (item.type === "prompts") {
      cancelPromptGen();
    }
    if (item.type === "transcription") {
      if (onCancelTranscription != null) {
        onCancelTranscription();
      }
    }
  };
  const handleResume = (item2) => {
    if (item2.type === "batch") {
      if (onResumeBatch != null) {
        onResumeBatch();
      }
    }
    if (item2.type === "prompts") {
      if (onResumePrompts != null) {
        onResumePrompts();
      }
    }
    if (item2.type === "transcription") {
      if (onRetryTranscription != null) {
        onRetryTranscription();
      }
    }
    if (item2.type === "render") {
      if (onRetryRender != null) {
        onRetryRender();
      }
    }
    setInterruptedTasks((media) => media.filter((item) => item !== item2));
  };
  const items = [...activeTasks, ...interruptedTasks];
  return /* @__PURE__ */ jsx("div", { ref: divRef, style: {
    position: "fixed",
    left: "calc(var(--rail-width, 60px) + 10px)",
    bottom: 16,
    zIndex: 1200,
    fontFamily: "Inter, system-ui, sans-serif"
  }, children: isOpen ? /* @__PURE__ */ jsxs("div", { style: {
    width: 390,
    maxWidth: "calc(100vw - var(--rail-width, 60px) - 24px)",
    height: 520,
    maxHeight: "calc(100vh - 32px)",
    display: "flex",
    flexDirection: "column",
    background: "rgba(10,12,17,.98)",
    border: "1px solid #2a3040",
    borderRadius: 14,
    boxShadow: "0 18px 55px rgba(0,0,0,.65)",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 14px",
      borderBottom: "1px solid #222838"
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { style: {
          color: "#fff",
          fontSize: 13
        }, children: "\u2699\uFE0F Centro de tareas" }),
        /* @__PURE__ */ jsxs("div", { style: {
          color: "#778197",
          fontSize: 10,
          marginTop: 2
        }, children: [
          activeTasks.length,
          " activa(s) \xB7 ",
          logs.length,
          " logs en vivo"
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(false), style: {
        background: "transparent",
        border: 0,
        color: "#8a94a6",
        cursor: "pointer",
        fontSize: 16
      }, children: "\u2715" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 5,
      padding: 8,
      borderBottom: "1px solid #222838"
    }, children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => setActiveTab("tasks"), style: {
        border: "1px solid " + (activeTab === "tasks" ? "rgba(91,140,255,.45)" : "#2a3040"),
        background: activeTab === "tasks" ? "rgba(91,140,255,.12)" : "#141821",
        color: activeTab === "tasks" ? "#9fbeff" : "#8e98aa",
        borderRadius: 7,
        padding: 7,
        cursor: "pointer",
        fontSize: 10,
        fontWeight: 800
      }, children: [
        "\u2699\uFE0F Tareas (",
        activeTasks.length,
        ")"
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => setActiveTab("logs"), style: {
        border: "1px solid " + (activeTab === "logs" ? "rgba(129,140,248,.5)" : "#2a3040"),
        background: activeTab === "logs" ? "rgba(129,140,248,.12)" : "#141821",
        color: activeTab === "logs" ? "#c7d2fe" : "#8e98aa",
        borderRadius: 7,
        padding: 7,
        cursor: "pointer",
        fontSize: 10,
        fontWeight: 800
      }, children: "\u{1F4CB} Logs" })
    ] }),
    activeTab === "tasks" ? /* @__PURE__ */ jsxs("div", { style: {
      overflowY: "auto",
      padding: 10
    }, children: [
      items.length ? items.map((item) => /* @__PURE__ */ jsxs("div", { style: {
        border: "1px solid #252b3a",
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        background: "#11141c"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsx("strong", { style: {
            color: "#e5e7eb",
            fontSize: 11.5
          }, children: item.title }),
          /* @__PURE__ */ jsx("span", { style: {
            color: qt(item.status),
            fontSize: 10,
            fontWeight: 800
          }, children: item.status.toUpperCase() })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          height: 5,
          background: "#252a37",
          borderRadius: 5,
          overflow: "hidden",
          margin: "8px 0 6px"
        }, children: /* @__PURE__ */ jsx("div", { style: {
          width: Math.max(2, Math.min(100, item.progress || 0)) + "%",
          height: "100%",
          background: qt(item.status),
          transition: "width .25s"
        } }) }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#9aa4b7",
          fontSize: 10.5,
          lineHeight: 1.35
        }, children: item.message }),
        item.status === "running" ? /* @__PURE__ */ jsxs("div", { style: {
          color: "#697386",
          fontSize: 9.5,
          marginTop: 4
        }, children: [
          item.progress,
          "%",
          Ir(item)
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          gap: 6,
          marginTop: 8
        }, children: [
          item.status === "running" && item.type === "render" ? /* @__PURE__ */ jsx("button", { onClick: () => window.dispatchEvent(new CustomEvent("open-render-modal")), style: {
            background: "rgba(99,102,241,.2)",
            border: "1px solid rgba(99,102,241,.5)",
            color: "#c7d2fe",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 10,
            cursor: "pointer",
            fontWeight: 700
          }, children: "\u{1F441}\uFE0F Abrir Visor" }) : null,
          item.status === "running" && item.type !== "render" ? /* @__PURE__ */ jsx("button", { onClick: () => handleCancel(item), style: {
            background: "rgba(239,68,68,.1)",
            border: "1px solid rgba(239,68,68,.3)",
            color: "#f87171",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 10,
            cursor: "pointer"
          }, children: "Cancelar" }) : null,
          item.type === "batch" && ["running", "paused"].includes(item.status) ? /* @__PURE__ */ jsx("button", { onClick: () => item.status === "paused" ? resumeBatch() : pauseBatch(), style: {
            background: "rgba(251,191,36,.1)",
            border: "1px solid rgba(251,191,36,.3)",
            color: "#fbbf24",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 10,
            cursor: "pointer"
          }, children: item.status === "paused" ? "Continuar" : "Pausar" }) : null,
          item.status === "interrupted" ? /* @__PURE__ */ jsx("button", { onClick: () => handleResume(item), style: {
            background: "rgba(99,102,241,.15)",
            border: "1px solid rgba(99,102,241,.4)",
            color: "#c7d2fe",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 10,
            cursor: "pointer"
          }, children: "Reanudar" }) : null
        ] })
      ] }, item.id + "-" + item.status)) : /* @__PURE__ */ jsx("div", { style: {
        color: "#778197",
        padding: 18,
        textAlign: "center",
        fontSize: 11
      }, children: "No hay tareas activas." }),
      taskHistory.length ? /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsx("div", { style: {
          color: "#667085",
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: 0.7,
          margin: "12px 2px 7px"
        }, children: "HISTORIAL RECIENTE" }),
        taskHistory.slice(0, 8).map((slice) => /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          padding: "7px 4px",
          borderBottom: "1px solid #1d2230",
          fontSize: 10
        }, children: [
          /* @__PURE__ */ jsxs("span", { style: {
            color: "#aab3c3"
          }, children: [
            slice.title,
            /* @__PURE__ */ jsx("small", { style: {
              display: "block",
              color: "#626c7e",
              marginTop: 2
            }, children: slice.message })
          ] }),
          /* @__PURE__ */ jsx("span", { style: {
            color: qt(slice.status),
            fontWeight: 800
          }, children: slice.status })
        ] }, slice.id + "-" + slice.finishedAt))
      ] }) : null
    ] }) : /* @__PURE__ */ jsx(Tr, { liveLogs: logs, onClear: onClearLogs }),
    activeTab === "tasks" && taskHistory.length ? /* @__PURE__ */ jsx("button", { onClick: () => {
      setTaskHistory([]);
      localStorage.removeItem(Yt);
    }, style: {
      margin: "0 10px 10px",
      border: "1px solid #292f3d",
      background: "#171b24",
      color: "#8d96a8",
      borderRadius: 7,
      padding: 7,
      cursor: "pointer",
      fontSize: 10
    }, children: "Limpiar historial" }) : null
  ] }) : null });
};
const Ar = "http://127.0.0.1:4322";
async function Da(state2, state3 = {}) {
  const url = state2.startsWith("http") ? state2 : "" + Ar + (state2.startsWith("/") ? "" : "/") + state2;
  const storedToken = typeof localStorage !== "undefined" ? localStorage.getItem("flowtube_token") : "";
  const headers = new Headers(state3.headers || {});
  if (storedToken && !headers.has("Authorization")) {
    headers.set("Authorization", "Bearer " + storedToken);
  }
  return fetch(url, {
    ...state3,
    headers
  });
}
const $a = "https://t.me/Oxdailyy";
const Er = "@Oxdailyy";
const Pr = {
  width: "100%",
  boxSizing: "border-box",
  background: "#090a0d",
  border: "1px solid #30384d",
  borderRadius: 10,
  padding: "12px 14px",
  color: "#fff",
  fontSize: 13,
  outline: "none"
};
const Rr = () => {
  const setAuthUser = w((state) => state.setAuthUser);
  const setCurrentView = w((state) => state.setCurrentView);
  const [licenseKey, setLicenseKey] = React.useState("");
  const [hwid, setHwid] = React.useState("Detectando equipo\u2026");
  const [copied, setCopied] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  React.useEffect(() => {
    Da("/api/auth/hwid").then((result) => result.json()).then((result) => {
      if (result.ok && result.hwid) {
        setHwid(result.hwid);
      }
    }).catch(() => setHwid("No disponible"));
  }, []);
  const handleClick25 = () => {
    if (hwid && hwid.startsWith("FT-")) {
      navigator.clipboard.writeText(hwid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  };
  const handleClick26 = () => {
    var electronAPI;
    if ((electronAPI = window.electronAPI) != null && electronAPI.openExternal) {
      window.electronAPI.openExternal($a);
    } else {
      window.open($a, "_blank");
    }
  };
  const handleClick27 = () => {
    setAuthUser({
      id: "guest-preview",
      username: "Invitado (Modo Prueba)",
      email: "guest@flowstudio.local",
      role: "guest",
      licensePlan: "Trial Preview",
      isLicensed: false
    }, "guest-token", false);
    setCurrentView("dashboard");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const hwidValue = hwid.startsWith("FT-") ? hwid : void 0;
      const payload = {
        licenseKey: licenseKey.trim(),
        hwid: hwidValue
      };
      const response = await Da("/api/auth/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "No se pudo validar el acceso.");
      }
      setAuthUser(data.user, data.token, true);
      setCurrentView("dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { style: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "radial-gradient(circle at 50% 10%, #182039 0%, #06070b 60%)",
    color: "#fff",
    fontFamily: "Inter, system-ui, sans-serif"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    width: "min(460px, 100%)",
    background: "rgba(15,18,28,.94)",
    border: "1px solid rgba(99, 102, 241, 0.35)",
    borderRadius: 22,
    padding: 28,
    boxShadow: "0 30px 90px rgba(0,0,0,.55), 0 0 40px rgba(99, 102, 241, 0.15)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginBottom: 20
    }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        width: 64,
        height: 64,
        margin: "0 auto 12px",
        borderRadius: 18,
        background: "linear-gradient(135deg,#6366f1,#d7ff4f)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)"
      }, children: "\u2728" }),
      /* @__PURE__ */ jsx("h1", { style: {
        margin: 0,
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: "-0.5px"
      }, children: "FLOWSTUDIO" }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: "6px 0 0",
        color: "#95a0b8",
        fontSize: 12
      }, children: "Activa tu licencia VIP para desbloquear la suite de IA" })
    ] }),
    errorMessage && /* @__PURE__ */ jsxs("div", { style: {
      marginBottom: 14,
      padding: "10px 12px",
      borderRadius: 9,
      background: "rgba(239,68,68,.14)",
      border: "1px solid rgba(239,68,68,.4)",
      color: "#fca5a5",
      fontSize: 12
    }, children: [
      "\u26A0\uFE0F ",
      errorMessage
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, style: {
      display: "grid",
      gap: 12
    }, children: [
      /* @__PURE__ */ jsxs("label", { style: {
        color: "#cbd5e1",
        fontSize: 12,
        fontWeight: 800
      }, children: [
        "Clave de licencia",
        /* @__PURE__ */ jsx("input", { autoFocus: true, value: licenseKey, onChange: (event) => setLicenseKey(event.target.value.toUpperCase()), placeholder: "XXXX-XXXX-XXXX", required: true, style: {
          ...Pr,
          marginTop: 6,
          letterSpacing: 2,
          fontFamily: "monospace"
        } })
      ] }),
      /* @__PURE__ */ jsx("button", { disabled: isSubmitting, type: "submit", style: {
        height: 44,
        border: 0,
        borderRadius: 10,
        background: "linear-gradient(135deg,#d7ff4f,#10b981)",
        color: "#080a0d",
        fontWeight: 900,
        fontSize: 13,
        cursor: isSubmitting ? "wait" : "pointer",
        boxShadow: "0 4px 16px rgba(215, 255, 79, 0.3)"
      }, children: isSubmitting ? "Verificando\u2026" : "\u26A1 Activar FLOWSTUDIO" })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      marginTop: 14
    }, children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: handleClick26, style: {
      width: "100%",
      background: "linear-gradient(135deg, #229ED9 0%, #1782B8 100%)",
      border: "1px solid rgba(34, 158, 217, 0.5)",
      borderRadius: 10,
      padding: "10px 14px",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontWeight: 800,
      fontSize: 12,
      boxShadow: "0 4px 16px rgba(34, 158, 217, 0.3)"
    }, children: [
      /* @__PURE__ */ jsx("span", { children: "\u{1F4AC}" }),
      /* @__PURE__ */ jsxs("span", { children: [
        "Solicitar Licencia por Telegram (",
        Er,
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { style: {
      marginTop: 8,
      textAlign: "center"
    }, children: /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick27, style: {
      background: "transparent",
      border: "none",
      color: "#94a3b8",
      cursor: "pointer",
      fontSize: 11.5,
      fontWeight: 700,
      textDecoration: "underline",
      padding: "6px 10px"
    }, children: "\u{1F440} Explorar la aplicaci\xF3n en Modo Vista Previa" }) }),
    /* @__PURE__ */ jsxs("div", { style: {
      marginTop: 16,
      paddingTop: 12,
      borderTop: "1px solid #232a3b",
      color: "#8290aa",
      fontSize: 10.5,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "HWID: ",
        /* @__PURE__ */ jsx("strong", { style: {
          color: "#cbd5e1",
          fontFamily: "monospace"
        }, children: hwid })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClick25, style: {
        background: copied ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.06)",
        border: "none",
        color: copied ? "#86efac" : "#cbd5e1",
        borderRadius: 4,
        padding: "2px 8px",
        fontSize: 10,
        fontWeight: 700,
        cursor: "pointer"
      }, children: copied ? "\u2713 Copiado" : "\u{1F4CB} Copiar" })
    ] })
  ] }) });
};
const Dr = (event, state4) => {
  var target2;
  var target3;
  var current12;
  var current13;
  var current14;
  var current15;
  const tagName = (target2 = event.target) == null ? void 0 : target2.tagName;
  if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || (target3 = event.target) != null && target3.isContentEditable) {
    return;
  }
  const state = w.getState();
  const {
    project,
    selectedId
  } = state;
  const ctrlKey = event.ctrlKey || event.metaKey;
  switch (true) {
    case (event.code === "Space" || !ctrlKey && event.code === "KeyK"): {
      event.preventDefault();
      const current = state4.current;
      if (!current) {
        return;
      }
      if (current.isPlaying()) {
        current.pause();
      } else {
        current.play();
      }
      break;
    }
    case (!ctrlKey && (event.code === "KeyS" || event.code === "KeyC")): {
      event.preventDefault();
      const current = state4.current;
      const currentFrame = current ? current.getCurrentFrame() : 0;
      const fps = project.fps || 30;
      let frameCursor = 0;
      let matchedScene = null;
      let sceneStartFrame = 0;
      for (const scene of project.scenes) {
        const value = Math.max(1, Math.round(Number(scene.duration || 4) * fps));
        if (currentFrame >= frameCursor && currentFrame < frameCursor + value) {
          matchedScene = scene;
          sceneStartFrame = frameCursor;
          break;
        }
        frameCursor += value;
      }
      if (matchedScene) {
        const value98 = Math.max(1, Math.round(Number(matchedScene.duration || 4) * fps));
        const splitRatioRaw = (currentFrame - sceneStartFrame) / value98;
        const value99 = Math.max(0.15, Math.min(0.85, splitRatioRaw));
        state.splitScene(matchedScene.id, value99);
      } else if (selectedId) {
        state.splitScene(selectedId, 0.5);
      }
      break;
    }
    case (event.code === "Delete" || event.code === "Backspace"): {
      event.preventDefault();
      if (selectedId && project.scenes.length > 1) {
        state.removeScene(selectedId);
      }
      break;
    }
    case (!ctrlKey && event.code === "KeyJ"): {
      event.preventDefault();
      const current = state4.current;
      if (current) {
        const currentFrame = current.getCurrentFrame() || 0;
        current.seekTo(Math.max(0, currentFrame - (project.fps || 30)));
      }
      break;
    }
    case (!ctrlKey && event.code === "KeyL"): {
      event.preventDefault();
      const current = state4.current;
      if (current) {
        const currentFrame = current.getCurrentFrame() || 0;
        current.seekTo(currentFrame + (project.fps || 30));
      }
      break;
    }
    case (ctrlKey && event.code === "KeyD"): {
      event.preventDefault();
      if (selectedId) {
        state.duplicateScene(selectedId);
      }
      break;
    }
    case (ctrlKey && !event.shiftKey && event.code === "KeyZ"): {
      event.preventDefault();
      state.undo();
      break;
    }
    case (ctrlKey && event.shiftKey && event.code === "KeyZ" || ctrlKey && event.code === "KeyY"): {
      event.preventDefault();
      state.redo();
      break;
    }
    case (ctrlKey && event.code === "KeyS"): {
      event.preventDefault();
      Re(state.project).catch(() => {
      });
      break;
    }
    case event.code === "Home": {
      event.preventDefault();
      if ((current12 = state4.current) != null) {
        current12.seekTo(0);
      }
      break;
    }
    case event.code === "End": {
      event.preventDefault();
      const fps = project.fps || 30;
      const totalScenes = (project.scenes || []).reduce((acc, scene) => acc + Math.max(1, Math.round(Number(scene.duration || 4) * fps)), 0);
      if ((current13 = state4.current) != null) {
        current13.seekTo(Math.max(0, totalScenes - 1));
      }
      break;
    }
    case event.code === "ArrowUp": {
      event.preventDefault();
      const sceneIndex = project.scenes.findIndex((scene) => scene.id === selectedId);
      if (sceneIndex > 0) {
        const scene = project.scenes[sceneIndex - 1];
        state.selectScene(scene.id);
        const totalSlice = project.scenes.slice(0, sceneIndex - 1).reduce((acc, slice) => acc + Math.max(1, Math.round(Number(slice.duration || 4) * (project.fps || 30))), 0);
        if ((current14 = state4.current) != null) {
          current14.seekTo(totalSlice);
        }
      }
      break;
    }
    case event.code === "ArrowDown": {
      event.preventDefault();
      const sceneIndex = project.scenes.findIndex((scene) => scene.id === selectedId);
      if (sceneIndex < project.scenes.length - 1) {
        const scene = project.scenes[sceneIndex + 1];
        state.selectScene(scene.id);
        const totalSlice = project.scenes.slice(0, sceneIndex + 1).reduce((acc, slice) => acc + Math.max(1, Math.round(Number(slice.duration || 4) * (project.fps || 30))), 0);
        if ((current15 = state4.current) != null) {
          current15.seekTo(totalSlice);
        }
      }
      break;
    }
    case event.code === "ArrowLeft": {
      event.preventDefault();
      const current = state4.current;
      if (!current) {
        break;
      }
      const currentFrame = current.getCurrentFrame() || 0;
      const fps = project.fps || 30;
      if (event.shiftKey) {
        current.seekTo(Math.max(0, currentFrame - fps));
      } else if (event.altKey) {
        const sceneIndex = project.scenes.findIndex((scene) => scene.id === selectedId);
        if (sceneIndex > 0) {
          const scene = project.scenes[sceneIndex - 1];
          state.selectScene(scene.id);
          const totalSlice = project.scenes.slice(0, sceneIndex - 1).reduce((acc, slice) => acc + Math.max(1, Math.round(Number(slice.duration || 4) * fps)), 0);
          current.seekTo(totalSlice);
        }
      } else {
        current.seekTo(Math.max(0, currentFrame - 1));
      }
      break;
    }
    case event.code === "ArrowRight": {
      event.preventDefault();
      const current = state4.current;
      if (!current) {
        break;
      }
      const currentFrame = current.getCurrentFrame() || 0;
      const fps = project.fps || 30;
      const totalScenes = (project.scenes || []).reduce((acc, scene) => acc + Math.max(1, Math.round(Number(scene.duration || 4) * fps)), 0);
      if (event.shiftKey) {
        current.seekTo(Math.min(totalScenes - 1, currentFrame + fps));
      } else if (event.altKey) {
        const sceneIndex = project.scenes.findIndex((scene) => scene.id === selectedId);
        if (sceneIndex < project.scenes.length - 1) {
          const scene = project.scenes[sceneIndex + 1];
          state.selectScene(scene.id);
          const totalSlice = project.scenes.slice(0, sceneIndex + 1).reduce((acc, slice) => acc + Math.max(1, Math.round(Number(slice.duration || 4) * fps)), 0);
          current.seekTo(totalSlice);
        }
      } else {
        current.seekTo(Math.min(totalScenes - 1, currentFrame + 1));
      }
      break;
    }
    case (ctrlKey && event.code === "KeyN"): {
      event.preventDefault();
      state.addScene();
      break;
    }
  }
};
const $r = (ref) => {
  React.useEffect(() => {
    const handleKeyDown = (event) => Dr(event, ref);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ref]);
};
const zr = () => {
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(0);
  const project = w((state) => state.project);
  const isHydrated = w((state) => state.isHydrated);
  const setRenderState = w((state) => state.setRenderState);
  React.useEffect(() => {
    if (isHydrated) {
      clearTimeout(ref2.current);
      ref2.current = setTimeout(() => {
        Re(project).then(() => {
          if (Date.now() - ref3.current >= 3e5) {
            ref3.current = Date.now();
            return Sn(project, "Copia autom\xE1tica");
          }
        }).catch((error) => setRenderState({
          status: "error",
          message: "No se pudo guardar: " + error.message,
          url: ""
        }));
      }, 350);
      return () => clearTimeout(ref2.current);
    }
  }, [project, isHydrated, setRenderState]);
};
const Or = (callback) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const dragCounter = {
    current: 0
  };
  const handleDragEnter = React.useCallback((event) => {
    var dataTransfer;
    var items;
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current++;
    if ((items = (dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.items) != null && items.length) {
      setIsDragging(true);
    }
  }, []);
  const handleDragLeave = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);
  const handleDragOver = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  const handleDrop = React.useCallback((event) => {
    var dataTransfer;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    const filteredFrom = Array.from(((dataTransfer = event.dataTransfer) == null ? void 0 : dataTransfer.files) || []).filter((from) => {
      const name = (from.name || "").toLowerCase();
      return from.type.startsWith("image/") || from.type.startsWith("video/") || from.type.startsWith("audio/") || name.endsWith(".srt") || name.endsWith(".vtt") || name.endsWith(".json") || name.endsWith(".mp3") || name.endsWith(".wav") || name.endsWith(".mp4") || name.endsWith(".png") || name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".webp");
    });
    if (filteredFrom.length && callback) {
      callback(filteredFrom);
    }
  }, [callback]);
  React.useEffect(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);
  return {
    isDragging
  };
};
const At = (min) => new Promise((resolve) => setTimeout(resolve, min));
function Fr({
  project,
  checkLicensed,
  devLog,
  resumedOperations,
  resolveScene
}) {
  const updateScene = w((state) => state.updateScene);
  const finishSceneOperation = w((state) => state.finishSceneOperation);
  const setAssetState = w((state) => state.setAssetState);
  const setBatchState = w((state) => state.setBatchState);
  const selectScene = w((state) => state.selectScene);
  const generateVideo = React.useCallback(async (sceneOrId, force = false, overrides = {}) => {
    var videoPrompt;
    var prompt;
    var current;
    if (!checkLicensed("la generaci\xF3n de video con IA")) {
      return;
    }
    const scene11 = resolveScene(sceneOrId);
    if (!scene11) {
      return;
    }
    const scene12 = {
      ...scene11,
      ...overrides
    };
    if (!force) {
      const assetState = w.getState().assetState;
      if (assetState.operation === "video" && assetState.status === "loading") {
        return devLog("\u26A0\uFE0F", "Ya hay una generaci\xF3n de video activa. Espera a que termine o usa 'Generar Videos en Lote'.");
      }
    }
    if (!scene12.imageUrl) {
      return updateScene(scene12.id, {
        status: "error",
        error: "La escena necesita una imagen de origen."
      });
    }
    if (scene12.sourceFormat && scene12.sourceFormat !== project.format) {
      return updateScene(scene12.id, {
        status: "error",
        error: "Regenera la imagen para el formato actual."
      });
    }
    const id = crypto.randomUUID();
    const durations = ya(scene12);
    const duration = durations.duration;
    const now = Date.now();
    updateScene(scene12.id, {
      status: "video-generating",
      error: "",
      operationId: id,
      videoModel: durations.model,
      videoDuration: duration
    });
    setAssetState({
      status: "loading",
      operation: "video",
      progress: 5,
      startedAt: now,
      message: "Preparando imagen de \u201C" + scene12.title + "\u201D para " + durations.label + "..."
    });
    devLog("\u{1F3AC}", "Imagen \u2192 video iniciada para \u201C" + scene12.title + "\u201D con " + durations.label + " (" + duration + " s).");
    try {
      let imageUrl = null;
      if (scene12.imageUrl.startsWith("data:")) {
        imageUrl = scene12.imageUrl;
      } else {
        try {
          const response2 = await fetch(scene12.imageUrl);
          if (response2.ok) {
            const blob = await response2.blob();
            imageUrl = await ra(blob);
          }
        } catch {
        }
      }
      setAssetState({
        status: "loading",
        operation: "video",
        progress: 12,
        startedAt: now,
        message: "Enviando solicitud a " + durations.label + "..."
      });
      const text = ((videoPrompt = scene12.videoPrompt) == null ? void 0 : videoPrompt.trim()) || ((prompt = scene12.prompt) != null && prompt.trim() ? "Cinematic camera motion, smooth natural dynamics: " + scene12.prompt.trim().slice(0, 160) : "Natural cinematic movement with stable subject, consistent style and geometry.");
      const response = await Ee("FLOW_VIDEO_START", {
        mediaId: scene12.mediaId || null,
        imageUrl: scene12.imageUrl,
        imageData: imageUrl,
        prompt: text,
        format: project.format,
        model: durations.model,
        duration
      });
      const operation = {
        ...response,
        model: durations.model,
        requestedDuration: duration
      };
      if ((current = resumedOperations.current) != null) {
        current.add(response.mediaName);
      }
      updateScene(scene12.id, {
        videoOperation: operation
      });
      const deadline = Date.now() + 21e5;
      let retryCount = 0;
      let status = "";
      while (Date.now() < deadline) {
        await At(8e3);
        try {
          const response4 = await Ee("FLOW_VIDEO_STATUS", operation, 45e3);
          retryCount = 0;
          if (response4.failed) {
            let error2 = response4.error || "Flow no pudo generar el video.";
            if (error2.includes("PUBLIC_ERROR_AUDIO_FILTERED") || error2.includes("AUDIO_FILTERED")) {
              error2 = "Filtro de audio/seguridad de Veo activado (suele ocurrir con marcas registradas como 'Coca-Cola' o t\xE9rminos sensibles). Soluci\xF3n recomendada: cambia el modelo a 'Omni Flash' en el Inspector o edita el prompt para omitir marcas comerciales.";
            }
            const error3 = new Error(error2);
            error3.terminal = true;
            throw error3;
          }
          if (!response4.done) {
            const queueLabel = response4.status === "MEDIA_GENERATION_STATUS_ACTIVE" ? durations.label + " est\xE1 generando el video..." : durations.queueLabel;
            const progressValue = response4.status === "MEDIA_GENERATION_STATUS_ACTIVE" ? 45 : 20;
            setAssetState({
              status: "loading",
              operation: "video",
              progress: progressValue,
              startedAt: now,
              message: queueLabel
            });
            if (response4.status !== status) {
              status = response4.status;
              devLog("\u23F3", scene12.title + ": " + queueLabel);
            }
            continue;
          }
          setAssetState({
            status: "loading",
            operation: "video",
            progress: 90,
            startedAt: now,
            message: "Video generado. Guardando en la biblioteca..."
          });
          let response5 = null;
          try {
            response5 = await Ee("FLOW_IMPORT_MEDIA", {
              url: response4.videoUrl,
              mime: "video/mp4",
              accountId: operation.accountId,
              projectId: operation.projectId
            }, 24e4);
          } catch {
          }
          const url = (response5 == null ? void 0 : response5.url) || response4.videoUrl || "";
          const duration2 = Number(scene12.duration) || 4;
          finishSceneOperation(scene12.id, id, {
            videoUrl: url,
            flowVideoUrl: response4.videoUrl || "",
            videoPortable: response5 != null && !!response5.url,
            duration: duration2,
            sourceFormat: project.format,
            videoOperation: null,
            videoAccountId: operation.accountId || null,
            videoProjectId: operation.projectId || null,
            status: "ready",
            error: ""
          });
          setAssetState({
            status: "ready",
            operation: "video",
            progress: 100,
            message: "\u2705 Video de \u201C" + scene12.title + "\u201D listo y asignado a la escena."
          });
          devLog("\u2705", "Video listo para \u201C" + scene12.title + "\u201D (" + (url.startsWith("http://127.0.0.1") ? "guardado localmente" : "enlazado") + ").");
          return;
        } catch (error) {
          if (error.terminal || (retryCount++, retryCount >= 5)) {
            throw error;
          }
          setAssetState({
            status: "loading",
            operation: "video",
            progress: 20,
            startedAt: now,
            message: "Reintentando seguimiento de " + durations.label + " (" + retryCount + "/5)..."
          });
          await At(Math.min(2 ** retryCount * 4e3, 45e3));
        }
      }
      throw new Error(durations.label + " super\xF3 35 minutos de espera. La operaci\xF3n qued\xF3 guardada para reanudar el seguimiento.");
    } catch (error) {
      finishSceneOperation(scene12.id, id, {
        status: "video-error",
        error: error.message
      });
      setAssetState({
        status: "error",
        operation: "video",
        progress: 0,
        message: error.message
      });
      devLog("\u274C", "Error imagen \u2192 video en \u201C" + scene12.title + "\u201D: " + error.message);
    }
  }, [checkLicensed, devLog, finishSceneOperation, project.format, resolveScene, resumedOperations, setAssetState, updateScene]);
  const generateAllVideos = React.useCallback(async (onlySelected = false, modelOverride = null, durationOverride = null) => {
    if (!checkLicensed("la conversi\xF3n de videos en lote")) {
      return;
    }
    const scenes = w.getState().project.scenes;
    let items = onlySelected ? scenes.filter((item) => item.id === w.getState().selectedId && item.imageUrl) : scenes.filter((item) => item.imageUrl && item.status !== "video-generating");
    if (!items.length) {
      return devLog("\u26A0\uFE0F", "No hay escenas con im\xE1genes para convertir a video.");
    }
    if (modelOverride || durationOverride) {
      items.forEach((item) => {
        updateScene(item.id, {
          videoModel: modelOverride || item.videoModel || "omni",
          videoDuration: durationOverride || item.videoDuration || 6
        });
      });
    }
    devLog("\u{1F680}", "Iniciando conversi\xF3n en lote de " + items.length + " videos con IA...");
    setBatchState({
      running: true,
      progress: 0,
      current: 0,
      total: items.length,
      activePrompt: "Iniciando generaci\xF3n de videos..."
    });
    for (let index = 0; index < items.length && !w.getState().batchCancelled; index++) {
      const scene = items[index];
      setBatchState((prev) => ({
        ...prev,
        current: index + 1,
        progress: Math.round(index / items.length * 100),
        activePrompt: "Generando video " + (index + 1) + "/" + items.length + ": " + scene.title + "..."
      }));
      await generateVideo(scene.id, true);
      await At(1500);
    }
    setBatchState({
      running: false,
      progress: 100,
      current: items.length,
      total: items.length,
      activePrompt: ""
    });
    devLog("\u2705", "\xA1Lote de videos finalizado!");
  }, [checkLicensed, devLog, generateVideo, setBatchState, updateScene]);
  const resumeVideo = React.useCallback(async (scene) => {
    const videoOperation = scene.videoOperation;
    const durations = ya({
      videoModel: (videoOperation == null ? void 0 : videoOperation.model) || scene.videoModel,
      videoDuration: (videoOperation == null ? void 0 : videoOperation.requestedDuration) || scene.videoDuration
    });
    const id = crypto.randomUUID();
    const now = Date.now();
    updateScene(scene.id, {
      status: "video-generating",
      operationId: id,
      error: "Reanudando seguimiento del video..."
    });
    setAssetState({
      status: "loading",
      operation: "video",
      progress: 20,
      startedAt: now,
      message: "Reanudando " + durations.label + " para \u201C" + scene.title + "\u201D..."
    });
    const deadline = Date.now() + 21e5;
    try {
      while (Date.now() < deadline) {
        await At(1e4);
        const response6 = await Ee("FLOW_VIDEO_STATUS", videoOperation, 45e3);
        if (response6.failed) {
          const error = new Error(response6.error || "Flow no pudo generar el video.");
          error.terminal = true;
          throw error;
        }
        if (!response6.done) {
          setAssetState({
            status: "loading",
            operation: "video",
            progress: response6.status === "MEDIA_GENERATION_STATUS_ACTIVE" ? 45 : 20,
            startedAt: now,
            message: response6.status === "MEDIA_GENERATION_STATUS_ACTIVE" ? durations.label + " est\xE1 generando el video..." : durations.queueLabel
          });
          continue;
        }
        setAssetState({
          status: "loading",
          operation: "video",
          progress: 90,
          startedAt: now,
          message: "Recuperando video terminado..."
        });
        let response7 = null;
        try {
          response7 = await Ee("FLOW_IMPORT_MEDIA", {
            url: response6.videoUrl,
            mime: "video/mp4",
            accountId: videoOperation == null ? void 0 : videoOperation.accountId,
            projectId: videoOperation == null ? void 0 : videoOperation.projectId
          }, 24e4);
        } catch {
        }
        const url = (response7 == null ? void 0 : response7.url) || response6.videoUrl || "";
        const duration = Number(scene.duration) || 4;
        finishSceneOperation(scene.id, id, {
          videoUrl: url,
          flowVideoUrl: response6.videoUrl || "",
          videoPortable: response7 != null && !!response7.url,
          duration,
          videoOperation: null,
          videoAccountId: (videoOperation == null ? void 0 : videoOperation.accountId) || null,
          videoProjectId: (videoOperation == null ? void 0 : videoOperation.projectId) || null,
          status: "ready",
          error: ""
        });
        setAssetState({
          status: "ready",
          operation: "video",
          progress: 100,
          message: "\u2705 Video de \u201C" + scene.title + "\u201D recuperado y asignado."
        });
        return;
      }
      throw new Error("Timeout de seguimiento.");
    } catch (error) {
      finishSceneOperation(scene.id, id, {
        status: "video-error",
        error: error.message
      });
      setAssetState({
        status: "error",
        operation: "video",
        progress: 0,
        message: error.message
      });
    }
  }, [finishSceneOperation, setAssetState, updateScene]);
  const retryVideoImport = React.useCallback(async (scene) => {
    var videoOperation2;
    var videoOperation3;
    if (!scene.flowVideoUrl || scene.operationId) {
      return;
    }
    const id = crypto.randomUUID();
    updateScene(scene.id, {
      operationId: id,
      status: "video-generating",
      error: "Copiando video desde Flow..."
    });
    setAssetState({
      status: "loading",
      operation: "video",
      progress: 90,
      startedAt: Date.now(),
      message: "Reintentando copia local del video..."
    });
    try {
      const response = await Ee("FLOW_IMPORT_MEDIA", {
        url: scene.flowVideoUrl,
        mime: "video/mp4",
        accountId: scene.videoAccountId || ((videoOperation2 = scene.videoOperation) == null ? void 0 : videoOperation2.accountId) || null,
        projectId: scene.videoProjectId || ((videoOperation3 = scene.videoOperation) == null ? void 0 : videoOperation3.projectId) || null
      }, 24e4);
      finishSceneOperation(scene.id, id, {
        videoUrl: response.url,
        flowVideoUrl: "",
        videoPortable: true,
        status: "ready",
        error: ""
      });
      setAssetState({
        status: "ready",
        operation: "video",
        progress: 100,
        message: "\u2705 Video copiado a la biblioteca local."
      });
    } catch (error) {
      finishSceneOperation(scene.id, id, {
        status: "ready",
        error: error.message
      });
      setAssetState({
        status: "error",
        operation: "video",
        progress: 0,
        message: error.message
      });
    }
  }, [finishSceneOperation, setAssetState, updateScene]);
  React.useEffect(() => {
    const handleGenerateVideo = async (state) => {
      const {
        sceneId,
        model,
        duration
      } = state.detail || {};
      if (!sceneId) {
        return;
      }
      selectScene(sceneId);
      const overrides = {};
      if (model) {
        overrides.videoModel = model;
      }
      if (duration) {
        overrides.videoDuration = duration;
      }
      if (Object.keys(overrides).length > 0) {
        updateScene(sceneId, overrides);
      }
      await generateVideo(sceneId, false, overrides);
    };
    window.addEventListener("flowtube:generate-video", handleGenerateVideo);
    return () => window.removeEventListener("flowtube:generate-video", handleGenerateVideo);
  }, [selectScene, generateVideo, updateScene]);
  return {
    generateVideo,
    generateAllVideos,
    resumeVideo,
    retryVideoImport
  };
}
const Wr = /* @__PURE__ */ new Set(["done", "error", "cancelled"]);
const za = 3e5;
const Ur = 9e5;
async function Br(path, state = {}) {
  var signal;
  try {
    return await fetch("http://127.0.0.1:4322" + path, state);
  } catch (error) {
    if ((signal = state.signal) != null && signal.aborted) {
      throw error;
    }
    return fetch(path, state);
  }
}
const _r = (ms, signal) => new Promise((resolve) => {
  const finish = () => {
    clearTimeout(timer);
    signal.removeEventListener("abort", finish);
    resolve();
  };
  const timer = setTimeout(finish, ms);
  signal.addEventListener("abort", finish, {
    once: true
  });
  if (signal.aborted) {
    finish();
  }
});
function Lr({
  onChange,
  onTerminal: callback6 = () => {
  },
  request: callback7 = Br,
  wait: callback8 = _r,
  now: callback9 = Date.now,
  pollInterval = 800,
  timeoutMs,
  stallTimeoutMs = za,
  stitchingStallTimeoutMs,
  maxTimeoutMs = 9e6
} = {}) {
  let currentJob = null;
  const isCurrent = (state) => currentJob === state;
  const updateState = (state, patch) => {
    if (isCurrent(state)) {
      state.state = {
        ...state.state,
        ...patch
      };
      onChange(state.state);
    }
  };
  const finishJob = (job, patch) => {
    if (isCurrent(job)) {
      updateState(job, {
        ...patch,
        finishedAt: callback9()
      });
      currentJob = null;
      job.controller.abort();
      callback6(job.state);
    }
  };
  const parseResponse = async (response) => {
    const data = await response.json();
    if (!response.ok || data == null || !data.ok) {
      throw new Error((data == null ? void 0 : data.error) || "No se pudo iniciar el proceso de render.");
    }
    return data;
  };
  return {
    isActive: () => currentJob !== null,
    async start(state, jobId) {
      if (currentJob) {
        return;
      }
      const job = {
        controller: new AbortController(),
        cancelling: false,
        state: {
          jobId,
          status: "rendering",
          phase: "preparing",
          progress: 5,
          startedAt: callback9(),
          finishedAt: null,
          message: "Iniciando motor de render...",
          url: "",
          error: "",
          filename: "",
          renderedFrames: 0,
          encodedFrames: 0,
          totalFrames: null,
          stitchStage: "rendering"
        }
      };
      currentJob = job;
      updateState(job, {});
      try {
        if (state != null && state.force) {
          try {
            await callback7("/api/render-cancel/" + encodeURIComponent(jobId), {
              method: "POST"
            });
          } catch {
          }
        }
        job.accepted = callback7("/api/render", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...state,
            jobId
          })
        }).then(parseResponse);
        await job.accepted;
        if (!isCurrent(job) || job.cancelling) {
          return;
        }
        const startTime = callback9();
        let lastProgressAt = callback9();
        let bestRenderedFrames = 0;
        let bestEncodedFrames = 0;
        let bestProgress = 0;
        let lastStitchStage = "";
        let maxLastActivityAt = 0;
        let isStitching = false;
        const hasTimeout = typeof timeoutMs == "number";
        const effectiveStallTimeout = stitchingStallTimeoutMs ?? (stallTimeoutMs === za ? Ur : stallTimeoutMs);
        while (isCurrent(job) && !job.cancelling) {
          const now = callback9();
          if (hasTimeout && now - startTime >= timeoutMs) {
            throw new Error("El render super\xF3 el l\xEDmite de tiempo.");
          }
          if (!hasTimeout) {
            const currentStallTimeout = isStitching ? effectiveStallTimeout : stallTimeoutMs;
            if (now - lastProgressAt >= currentStallTimeout) {
              const value = Math.round(currentStallTimeout / 6e4);
              const stallDurationLabel = value > 0 ? value + " minutos" : Math.round(currentStallTimeout / 1e3) + " segundos";
              throw new Error("El render se detuvo por inactividad (sin avance en los \xFAltimos " + stallDurationLabel + ").");
            }
            if (now - startTime >= maxTimeoutMs) {
              throw new Error("El render super\xF3 el l\xEDmite de tiempo m\xE1ximo (2.5 horas).");
            }
          }
          await callback8(pollInterval, job.controller.signal);
          if (!isCurrent(job) || job.cancelling) {
            return;
          }
          let statusData;
          try {
            const response = await callback7("/api/render-status/" + encodeURIComponent(jobId), {
              signal: job.controller.signal
            });
            if (!response.ok) {
              continue;
            }
            statusData = await response.json();
          } catch (error) {
            if (!isCurrent(job) || job.cancelling) {
              return;
            }
            if (error instanceof TypeError) {
              continue;
            }
            throw error;
          }
          if (!isCurrent(job) || job.cancelling) {
            return;
          }
          if (statusData == null || !statusData.ok) {
            continue;
          }
          const renderedFrames = Number(statusData.renderedFrames) || 0;
          const encodedFrames = Number(statusData.encodedFrames) || 0;
          const progress = Number(statusData.progress) || 0;
          const stitchStage = statusData.stitchStage || statusData.phase || "";
          const lastActivityAt = Number(statusData.lastActivityAt) || 0;
          if (stitchStage === "encoding" || stitchStage === "muxing" || statusData.totalFrames && renderedFrames >= statusData.totalFrames || progress >= 95) {
            isStitching = true;
          }
          if (renderedFrames > bestRenderedFrames || encodedFrames > bestEncodedFrames || progress > bestProgress || stitchStage && stitchStage !== lastStitchStage || lastActivityAt && lastActivityAt > maxLastActivityAt) {
            lastProgressAt = callback9();
            if (renderedFrames > bestRenderedFrames) {
              bestRenderedFrames = renderedFrames;
            }
            if (encodedFrames > bestEncodedFrames) {
              bestEncodedFrames = encodedFrames;
            }
            if (progress > bestProgress) {
              bestProgress = progress;
            }
            if (stitchStage) {
              lastStitchStage = stitchStage;
            }
            if (lastActivityAt > maxLastActivityAt) {
              maxLastActivityAt = lastActivityAt;
            }
          }
          const isTerminal = Wr.has(statusData.status);
          const nextState = {
            status: isTerminal ? statusData.status : "rendering",
            phase: statusData.status,
            progress: statusData.status === "done" ? 100 : Number(statusData.progress) || 0,
            message: statusData.message || "Renderizando...",
            url: statusData.url || "",
            error: statusData.error || (statusData.status === "error" ? statusData.message || "Error durante el renderizado." : ""),
            filename: statusData.filename || "",
            renderedFrames: statusData.renderedFrames,
            encodedFrames: statusData.encodedFrames,
            totalFrames: statusData.totalFrames,
            stitchStage: statusData.stitchStage
          };
          if (isTerminal) {
            finishJob(job, nextState);
            return;
          }
          updateState(job, nextState);
        }
      } catch (error) {
        if (isCurrent(job) && !job.cancelling) {
          try {
            await callback7("/api/render-cancel/" + encodeURIComponent(jobId), {
              method: "POST"
            });
          } catch {
          }
          finishJob(job, {
            status: "error",
            error: error.message,
            message: error.message,
            url: ""
          });
        }
      }
    },
    async cancel() {
      const job = currentJob;
      if (!!job && !job.cancelling) {
        job.cancelling = true;
        job.controller.abort();
        updateState(job, {
          phase: "cancelling",
          message: "Cancelando render..."
        });
        try {
          await job.accepted;
          if (!isCurrent(job)) {
            return;
          }
          await parseResponse(await callback7("/api/render-cancel/" + encodeURIComponent(job.state.jobId), {
            method: "POST"
          }));
          finishJob(job, {
            status: "cancelled",
            phase: "cancelled",
            message: "Render cancelado.",
            url: ""
          });
        } catch (error) {
          finishJob(job, {
            status: "error",
            error: error.message,
            message: "No se pudo confirmar la cancelaci\xF3n: " + error.message,
            url: ""
          });
        }
      }
    },
    dispose() {
      const job = currentJob;
      currentJob = null;
      if (job != null) {
        job.controller.abort();
      }
    }
  };
}
const Vr = (project) => {
  var captionTrack;
  var audioTrack;
  const items34 = [];
  const items35 = [];
  const scenes = Array.isArray(project == null ? void 0 : project.scenes) ? project.scenes : [];
  if (!scenes.length) {
    items34.push({
      message: "El proyecto no contiene escenas."
    });
    return {
      critical: items34,
      warnings: items35,
      ready: false,
      missingCount: 0
    };
  }
  const items36 = [];
  scenes.forEach((scene, index) => {
    var imageUrl;
    if (!scene.imageUrl && !scene.videoUrl && !scene.isStockMotion) {
      items36.push(index + 1);
    }
    const duration = Number(scene.duration);
    if (!Number.isFinite(duration) || duration < 0.1) {
      items34.push({
        message: "Escena " + (index + 1) + ": duraci\xF3n inv\xE1lida."
      });
    }
    if ((imageUrl = scene.imageUrl || scene.videoUrl) != null && imageUrl.startsWith("blob:")) {
      items35.push("Escena " + (index + 1) + ": usa un archivo temporal.");
    }
  });
  if (items36.length > 0) {
    items34.unshift({
      isMissingImages: true,
      count: items36.length,
      indices: items36,
      message: "Faltan im\xE1genes en " + items36.length + " escena" + (items36.length > 1 ? "s" : "") + "."
    });
  }
  const total = scenes.reduce((acc, item) => acc + Math.max(0, Number(item.duration) || 0) * 1e3, 0);
  const cues = ((captionTrack = project == null ? void 0 : project.captionTrack) == null ? void 0 : captionTrack.cues) || [];
  if (cues.some((item) => Number(item.endMs) > total + 500)) {
    items35.push("Hay subt\xEDtulos que terminan despu\xE9s del video.");
  }
  if ((project == null ? void 0 : project.engine) === "ffmpeg" && cues.length) {
    items34.push({
      message: "FFmpeg no procesa los subt\xEDtulos de este proyecto. Usa Remotion Pro."
    });
  }
  if ((audioTrack = project == null ? void 0 : project.audioTrack) == null || !audioTrack.url) {
    items35.push("El proyecto no tiene voz en off o pista de audio.");
  }
  if (![24, 25, 30, 50, 60].includes(Number(project == null ? void 0 : project.fps))) {
    items34.push({
      message: "La velocidad FPS no es v\xE1lida."
    });
  }
  return {
    critical: items34,
    warnings: items35,
    ready: items34.length === 0,
    missingCount: items36.length
  };
};
function Hr({
  checkLicensed,
  devLog
}) {
  const [isRenderModalOpen, setIsRenderModalOpen] = React.useState(false);
  const [preflightReport, setPreflightReport] = React.useState(null);
  const setRenderState = w((state) => state.setRenderState);
  const renderState = w((state) => state.renderState);
  const ref = React.useRef(null);
  ref.current ||= Lr({
    onChange: (state) => setRenderState(() => state),
    onTerminal: (jobState) => {
      if (jobState.status === "done") {
        devLog("\u2705", "\xA1Video exportado con \xE9xito! " + jobState.url);
      } else if (jobState.status === "cancelled") {
        devLog("\u{1F6D1}", "Render cancelado por el usuario.");
      } else {
        devLog("\u274C", "Error en render: " + jobState.message);
      }
    }
  });
  React.useEffect(() => () => {
    var current;
    if ((current = ref.current) == null) {
      return void 0;
    } else {
      return current.dispose();
    }
  }, []);
  const renderVideo = React.useCallback(async (skipPreflight = false, resolutionOverride = null, force = false) => {
    if (ref.current.isActive()) {
      setIsRenderModalOpen(true);
      return;
    }
    if (!checkLicensed("la exportaci\xF3n y renderizado de video")) {
      return;
    }
    const project = w.getState().project;
    if (skipPreflight !== true) {
      const report = Vr(project);
      setPreflightReport(report);
      return;
    }
    setPreflightReport(null);
    const resolution = typeof resolutionOverride == "string" ? resolutionOverride : project.resolution || "1080p";
    const id = crypto.randomUUID();
    setIsRenderModalOpen(true);
    devLog("\u{1F3AC}", "Iniciando render con " + (project.engine === "ffmpeg" ? "FFmpeg" : "Remotion") + " en " + resolution.toUpperCase() + " (ID: " + id.slice(0, 8) + ")...");
    await ref.current.start({
      ...project,
      resolution,
      force: !!force
    }, id);
  }, [checkLicensed, devLog]);
  const cancelRender = React.useCallback(() => {
    var current;
    if ((current = ref.current) != null) {
      current.cancel();
    }
  }, []);
  return {
    isRenderModalOpen,
    setIsRenderModalOpen,
    preflightReport,
    setPreflightReport,
    renderJobState: renderState,
    renderVideo,
    cancelRender
  };
}
const Gr = (text) => String(text).replace(/```(?:srt|text)?/gi, "").trim();
const Oa = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Yr = async (file) => {
  let promise = 0;
  let items = [];
  try {
    const objectUrl = URL.createObjectURL(file);
    try {
      promise = await new Promise((resolve) => {
        const element = document.createElement("audio");
        element.preload = "metadata";
        element.onloadedmetadata = () => resolve(Math.round(element.duration * 1e3));
        element.onerror = () => resolve(0);
        element.src = objectUrl;
      });
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
  }
  const audioContext = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
  if (audioContext) {
    try {
      const v0x546f99 = new audioContext();
      const buffer = await file.arrayBuffer();
      const decodedBuffer = await v0x546f99.decodeAudioData(buffer).catch(() => null);
      if (decodedBuffer) {
        if (!promise || promise <= 0) {
          promise = Math.round(decodedBuffer.duration * 1e3);
        }
        const channelData = decodedBuffer.getChannelData(0);
        const peakCount = 180;
        const value100 = Math.max(1, Math.floor(channelData.length / peakCount));
        items = Array.from({
          length: peakCount
        }, (unusedItem, index) => {
          const segmentStart = index * value100;
          const length = Math.min(channelData.length, segmentStart + value100);
          const value101 = Math.max(1, Math.floor((length - segmentStart) / 120));
          let value102 = 0;
          for (let index2 = segmentStart; index2 < length; index2 += value101) {
            value102 = Math.max(value102, Math.abs(channelData[index2]));
          }
          return value102;
        });
        const value103 = Math.max(...items, 0.01);
        items = items.map((item) => Number((item / value103).toFixed(3)));
      }
      await v0x546f99.close().catch(() => {
      });
    } catch {
    }
  }
  if (!promise || promise <= 0) {
    promise = Math.max(1e3, Math.round(file.size * 8 / 160));
  }
  return {
    durationMs: promise,
    peaks: items
  };
};
const qr = ({
  checkLicensed,
  devLog,
  onGenerateVisualPrompts
}) => {
  const ref4 = React.useRef(null);
  const ref5 = React.useRef(false);
  const ref6 = React.useRef("");
  const project = w((state) => state.project);
  w((state) => state.flowState);
  const updateProject = w((state) => state.updateProject);
  const setAssetState = w((state) => state.setAssetState);
  const selectScene = w((state) => state.selectScene);
  const handleImportSrt = React.useCallback(async (file) => {
    var captionTrack;
    if (file) {
      try {
        const text = await file.text();
        const cues = ha(text, file.name);
        if (!cues.length) {
          throw new Error("El archivo no contiene captions o segmentos v\xE1lidos (soporta .srt, .vtt o .json de WhisperX).");
        }
        const matches = cues.some((item) => {
          var words;
          return ((words = item.words) == null ? void 0 : words.length) > 0;
        });
        const {
          project: project2
        } = w.getState();
        w.getState().setProject({
          ...project2,
          engine: "remotion",
          captionTrack: {
            sourceName: file.name,
            cues,
            enabled: true,
            style: {
              ...(captionTrack = project2.captionTrack) == null ? void 0 : captionTrack.style
            }
          }
        });
        setAssetState({
          status: "ready",
          message: cues.length + " subt\xEDtulos importados" + (matches ? " (con alineaci\xF3n de palabra WhisperX \u{1F3AF})" : "") + "."
        });
      } catch (error) {
        setAssetState({
          status: "error",
          message: error.message
        });
      }
    }
  }, [setAssetState]);
  const transcribeWithGemini = React.useCallback(async (audioTrack, startedAt) => {
    var name;
    if (!w.getState().flowState.connected) {
      const errorMessage = "Google Flow no est\xE1 conectado para usar Gemini Cloud.";
      if (devLog != null) {
        devLog("\u274C", errorMessage);
      }
      return setAssetState({
        status: "error",
        operation: "transcription",
        message: errorMessage
      });
    }
    let current = ref4.current;
    let mime = audioTrack.mime || "audio/mpeg";
    try {
      if (!current) {
        if (devLog != null) {
          devLog("\u23F3", "Recuperando el audio guardado para enviarlo a Gemini...");
        }
        const response = await fetch(audioTrack.url);
        if (!response.ok) {
          throw new Error("No se pudo leer el audio (HTTP " + response.status + ").");
        }
        current = await response.blob();
        mime = audioTrack.mime || response.headers.get("content-type") || "audio/mpeg";
      }
    } catch (error) {
      if (devLog != null) {
        devLog("\u274C", "Error leyendo el audio: " + error.message);
      }
      setAssetState({
        status: "error",
        operation: "transcription",
        message: error.message
      });
      return;
    }
    const durationMs = Number(audioTrack.durationMs) || 0;
    const chunkSeconds = durationMs > 12e5 ? 45 : 30;
    const value = Math.max(1, Math.min(Math.ceil(durationMs / (chunkSeconds * 1e3)), 100));
    const size = current.size;
    setAssetState({
      status: "loading",
      operation: "transcription",
      progress: 5,
      startedAt,
      message: "Transcribiendo con Gemini IA 0/" + value + "..."
    });
    if (devLog != null) {
      devLog("\u2601\uFE0F", "Gemini IA: enviando " + value + " fragmento(s) de audio...");
    }
    let items = [];
    try {
      const srtPrompt = "Eres un transcriptor y subtitulador profesional de videos para YouTube y Shorts.\nTranscribe el audio a formato de subt\xEDtulos SRT EST\xC1NDAR con m\xE1xima fidelidad " + (project.transcriptionLanguage && project.transcriptionLanguage !== "auto" ? "en idioma " + project.transcriptionLanguage.toUpperCase() : "en el idioma original y exacto del audio (sin traducir)") + ', puntuaci\xF3n perfecta y segmentaci\xF3n cinematogr\xE1fica.\n\nREGLAS DE FORMATO Y RITMO (SRT):\n1. Cada bloque de subt\xEDtulo debe tener un n\xFAmero correlativo (1, 2, 3...) y timestamps en formato:\n   00:00:00,000 --> 00:00:00,000\n2. Ritmo de lectura: Cada subt\xEDtulo debe durar entre 1.5 y 4.0 segundos (siguiendo las pausas naturales de respiraci\xF3n y habla del narrador).\n3. Longitud de texto: M\xE1ximo 1 a 2 l\xEDneas cortas por subt\xEDtulo (~30-38 caracteres por l\xEDnea). Nunca bloques gigantes de texto.\n4. Cortar las frases en pausas l\xF3gicas o de puntuaci\xF3n (comas, puntos, conectores como "pero", "y", "because", "and", "when").\n5. Ortograf\xEDa impecable en el idioma original del audio (espa\xF1ol, ingl\xE9s, etc.) con sus signos de puntuaci\xF3n, may\xFAsculas y acentuaci\xF3n correspondientes.\n\nEJEMPLO DE ESTRUCTURA:\n1\n00:00:00,180 --> 00:00:03,515\nWhen someone looks at a solar farm,\nit seems like a simple business:\n\n2\n00:00:03,600 --> 00:00:07,715\ninstall thousands of panels, wait for\nthe sun to rise and sell electricity.\n\nResponde \xDANICAMENTE con el texto SRT puro, sin markdown fences.';
      for (let index = 0; index < value; index++) {
        if (ref5.current) {
          throw new Error("Transcripci\xF3n cancelada por el usuario.");
        }
        if (devLog != null) {
          devLog("\u{1F4E4}", "Gemini IA: transcribiendo fragmento " + (index + 1) + "/" + value + "...");
        }
        const value104 = Math.round(index * (durationMs / value));
        const value105 = Math.round(index * (size / value));
        const value106 = index === value - 1 ? size : Math.round((index + 1) * (size / value));
        const result = await ra(current.slice(value105, value106, mime));
        const response = await Ee("FLOW_TRANSCRIBE", {
          model: project.textModel,
          parts: [{
            inlineData: {
              mimeType: mime,
              data: result
            }
          }, {
            text: "Fragmento " + (index + 1) + "/" + value + ".\n" + srtPrompt
          }]
        }, 12e4);
        const ha2 = ha(Gr(response.text)).map((ha3) => ({
          ...ha3,
          startMs: ha3.startMs + value104,
          endMs: ha3.endMs + value104
        }));
        items = items.concat(ha2);
        setAssetState({
          status: "loading",
          operation: "transcription",
          progress: Math.round((index + 1) / value * 100),
          startedAt,
          message: "Transcribiendo con Gemini IA " + (index + 1) + "/" + value + "..."
        });
        await Oa(600);
      }
      items.sort((a, b) => a.startMs - b.startMs);
      if (!items.length) {
        throw new Error("La IA no devolvi\xF3 captions v\xE1lidos.");
      }
      const baseName = ((name = audioTrack.name) == null ? void 0 : name.replace(/\.[^.]+$/, "")) || "voz-en-off";
      w.getState().setProject({
        ...w.getState().project,
        engine: "remotion",
        captionTrack: {
          ...w.getState().project.captionTrack,
          sourceName: baseName + ".srt",
          cues: items
        }
      });
      const successMessage = items.length + " subt\xEDtulos generados con Gemini.";
      setAssetState({
        status: "ready",
        operation: "transcription",
        message: successMessage
      });
      if (devLog != null) {
        devLog("\u2705", successMessage);
      }
    } catch (error) {
      const message = /reCAPTCHA|evaluation failed/i.test(error.message) ? "Google rechaz\xF3 el captcha. Espera y reintenta." : error.message;
      setAssetState({
        status: "error",
        operation: "transcription",
        message
      });
      if (devLog != null) {
        devLog("\u274C", "Transcripci\xF3n fallida: " + message);
      }
    }
  }, [devLog, project.textModel, project.transcriptionLanguage, setAssetState]);
  const cancelTranscription = React.useCallback(() => {
    ref5.current = true;
    if (ref6.current) {
      fetch("/api/transcribe-whisper/cancel/" + ref6.current, {
        method: "POST"
      }).catch(() => {
      });
      ref6.current = "";
    }
    setAssetState({
      status: "error",
      operation: "transcription",
      progress: 0,
      message: "Transcripci\xF3n cancelada por el usuario."
    });
    if (devLog != null) {
      devLog("\u26A0\uFE0F", "Transcripci\xF3n cancelada por el usuario.");
    }
  }, [devLog, setAssetState]);
  const transcribeAudio = React.useCallback(async (scene = null) => {
    var scenes8;
    var scenes9;
    var name2;
    var captionTrack;
    if (checkLicensed && !checkLicensed("la transcripci\xF3n de audio con IA")) {
      return;
    }
    const project2 = w.getState().project;
    let audioTrack = project2.audioTrack;
    if (scene != null && scene.videoUrl || scene != null && scene.flowVideoUrl) {
      audioTrack = {
        url: scene.videoUrl || scene.flowVideoUrl,
        name: (scene.title || "video") + ".mp4",
        durationMs: Number(scene.duration || 0) * 1e3,
        isVideoSource: true
      };
    } else if (audioTrack == null || !audioTrack.url) {
      const selectedId = w.getState().selectedId;
      const found2 = (scenes8 = project2.scenes) == null ? void 0 : scenes8.find((item) => item.id === selectedId);
      const found3 = found2 != null && found2.videoUrl || found2 != null && found2.flowVideoUrl ? found2 : (scenes9 = project2.scenes) == null ? void 0 : scenes9.find((item) => item.videoUrl || item.flowVideoUrl);
      if (found3) {
        audioTrack = {
          url: found3.videoUrl || found3.flowVideoUrl,
          name: (found3.title || "video") + ".mp4",
          durationMs: Number(found3.duration || 0) * 1e3,
          isVideoSource: true
        };
      }
    }
    if (audioTrack == null || !audioTrack.url) {
      const errorMessage = "Sube la voz en off o carga un video con audio antes de transcribir.";
      if (devLog != null) {
        devLog("\u274C", errorMessage);
      }
      return setAssetState({
        status: "error",
        operation: "transcription",
        message: errorMessage
      });
    }
    const assetState = w.getState().assetState;
    if (assetState.operation === "transcription" && assetState.status === "loading") {
      return;
    }
    ref5.current = false;
    const durationSuffix = Number(audioTrack.durationMs) > 0 ? " (" + (Number(audioTrack.durationMs) / 1e3).toFixed(1) + "s)" : "";
    const name3 = audioTrack.isVideoSource ? "video (" + audioTrack.name + ")" : audioTrack.name || "audio";
    if (devLog != null) {
      devLog("\u{1F399}\uFE0F", "Iniciando transcripci\xF3n de " + name3 + durationSuffix + "...");
    }
    const now = Date.now();
    if ((project2.transcriptionEngine || "local") === "gemini") {
      return transcribeWithGemini(audioTrack, now);
    }
    setAssetState({
      status: "loading",
      operation: "transcription",
      progress: 5,
      startedAt: now,
      message: "Iniciando Whisper local..."
    });
    try {
      if (devLog != null) {
        devLog("\u23F3", "Whisper local: conectando con motor nativo...");
      }
      const url = "http://127.0.0.1:4322/api/transcribe-whisper/start";
      const payload = {
        audioUrl: audioTrack.url,
        audioName: audioTrack.name,
        model: project2.transcriptionModel || "base",
        language: project2.transcriptionLanguage || "auto"
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).catch(() => fetch("/api/transcribe-whisper/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }));
      const startResult = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(startResult.error || "Whisper local respondi\xF3 HTTP " + response.status + ".");
      }
      ref6.current = startResult.jobId;
      let message = "";
      let finalResult = null;
      while (!ref5.current) {
        await Oa(400);
        const response2 = await fetch("http://127.0.0.1:4322/api/transcribe-whisper/status/" + startResult.jobId).catch(() => fetch("/api/transcribe-whisper/status/" + startResult.jobId));
        const statusResult = await response2.json().catch(() => ({}));
        if (!response2.ok) {
          throw new Error(statusResult.error || "No se pudo consultar el avance de Whisper.");
        }
        if (statusResult.message && statusResult.message !== message) {
          message = statusResult.message;
          if (devLog != null) {
            devLog("\u{1F399}\uFE0F", statusResult.message);
          }
        }
        setAssetState({
          status: "loading",
          operation: "transcription",
          progress: Number(statusResult.progress) || 10,
          startedAt: now,
          message: statusResult.message || "Whisper local transcribiendo..."
        });
        if (statusResult.status === "done") {
          finalResult = statusResult;
          break;
        }
        if (["error", "cancelled"].includes(statusResult.status)) {
          throw new Error(statusResult.error || statusResult.message || "La transcripci\xF3n no pudo completarse.");
        }
      }
      if (ref5.current) {
        throw new Error("Transcripci\xF3n cancelada por el usuario.");
      }
      ref6.current = "";
      if (Array.isArray(finalResult == null ? void 0 : finalResult.cues) && finalResult.cues.length > 0) {
        const baseName = ((name2 = audioTrack.name) == null ? void 0 : name2.replace(/\.[^.]+$/, "")) || (audioTrack.isVideoSource ? "video-subtitulos" : "voz-en-off");
        w.getState().setProject({
          ...w.getState().project,
          engine: "remotion",
          captionTrack: {
            ...w.getState().project.captionTrack,
            sourceName: baseName + ".json",
            cues: finalResult.cues,
            enabled: true,
            style: {
              ...(captionTrack = w.getState().project.captionTrack) == null ? void 0 : captionTrack.style
            }
          }
        });
        const successMessage = "\u2728 " + finalResult.cues.length + " frases sincronizadas con Whisper local" + (audioTrack.isVideoSource ? " directamente desde el video" : "") + " (Alineaci\xF3n palabra por palabra \u{1F3AF}).";
        setAssetState({
          status: "ready",
          operation: "transcription",
          progress: 100,
          message: successMessage
        });
        if (devLog != null) {
          devLog("\u2705", successMessage);
        }
        return;
      }
      throw new Error("Whisper local no devolvi\xF3 subt\xEDtulos utilizables.");
    } catch (error) {
      if (devLog != null) {
        devLog("\u274C", "Whisper local no pudo completar la transcripci\xF3n: " + error.message);
      }
      if (ref5.current) {
        return;
      }
      setAssetState({
        status: "error",
        operation: "transcription",
        progress: 0,
        message: "Whisper local: " + error.message + ". Reintenta o cambia el motor en el Inspector."
      });
    }
  }, [checkLicensed, devLog, setAssetState, transcribeWithGemini]);
  const uploadAudio = React.useCallback(async (file, kind = "narration") => {
    if (!file) {
      return;
    }
    const isMusic = kind === "music" || kind === "a2";
    setAssetState({
      status: "loading",
      message: isMusic ? "Procesando m\xFAsica / SFX para A2..." : "Procesando pista de audio..."
    });
    if (devLog != null) {
      devLog(isMusic ? "\u{1F3B5}" : "\u{1F399}\uFE0F", "Subiendo " + (isMusic ? "m\xFAsica/SFX a pista A2" : "audio") + ": " + file.name + " (" + (file.size / 1048576).toFixed(2) + " MB)...");
    }
    try {
      const headers = {
        "Content-Type": file.type || "audio/mpeg",
        "x-filename": encodeURIComponent(file.name)
      };
      const [response, audioMeta] = await Promise.all([fetch("http://127.0.0.1:4322/api/import", {
        method: "POST",
        headers,
        body: file
      }).catch(() => fetch("/api/import", {
        method: "POST",
        headers,
        body: file
      })), Yr(file)]);
      const data = await response.json();
      if (!response.ok || data == null || !data.url) {
        throw new Error((data == null ? void 0 : data.error) || "No se pudo guardar el archivo de audio en el servidor.");
      }
      if (isMusic) {
        updateProject({
          musicTrack: {
            url: data.url,
            name: file.name,
            mime: file.type || data.mime || "audio/mpeg",
            durationMs: audioMeta.durationMs,
            peaks: audioMeta.peaks,
            volume: 0.1,
            loop: true
          }
        });
        setAssetState({
          status: "ready",
          message: "\u2705 " + (audioMeta.durationMs / 1e3).toFixed(1) + "s de m\xFAsica / SFX asignados a la pista A2."
        });
        if (devLog != null) {
          devLog("\u2705", "M\xFAsica/SFX cargada a pista A2: " + file.name + " (" + (audioMeta.durationMs / 1e3).toFixed(1) + "s, loop activo)");
        }
      } else {
        ref4.current = file;
        updateProject({
          engine: "remotion",
          audioTrack: {
            url: data.url,
            name: file.name,
            mime: file.type || data.mime || "audio/mpeg",
            durationMs: audioMeta.durationMs,
            peaks: audioMeta.peaks,
            volume: 1
          }
        });
        setAssetState({
          status: "ready",
          message: "\u2705 " + (audioMeta.durationMs / 1e3).toFixed(1) + "s de audio listos. Puedes transcribir o sincronizar."
        });
        if (devLog != null) {
          devLog("\u2705", "Audio cargado con \xE9xito: " + file.name + " (" + (audioMeta.durationMs / 1e3).toFixed(1) + "s)");
        }
        if (w.getState().autoTranscribeOnAudioUpload) {
          if (devLog != null) {
            devLog("\u{1F916}", "Preset activo: iniciando auto-transcripci\xF3n de subt\xEDtulos con IA...");
          }
          setTimeout(() => {
            transcribeAudio();
          }, 400);
        }
      }
    } catch (error) {
      setAssetState({
        status: "error",
        message: error.message
      });
      if (devLog != null) {
        devLog("\u274C", "Error cargando audio: " + error.message);
      }
    }
  }, [devLog, setAssetState, transcribeAudio, updateProject]);
  const uploadMusic = React.useCallback((file) => uploadAudio(file, "music"), [uploadAudio]);
  const createScenesFromTranscript = React.useCallback(async () => {
    var captionTrack;
    var audioTrack;
    var firstItem;
    const project2 = w.getState().project;
    const cues = ((captionTrack = project2.captionTrack) == null ? void 0 : captionTrack.cues) || [];
    if (!cues.length) {
      return setAssetState({
        status: "error",
        message: "Sube audio e importa SRT antes de crear escenas."
      });
    }
    if (project2.scenes.some((scene) => scene.imageUrl || scene.videoUrl || scene.prompt) && !window.confirm("Esto reemplazar\xE1 las escenas actuales con las frases del SRT. \xBFContinuar?")) {
      return;
    }
    const timedCues = gt(cues, (audioTrack = project2.audioTrack) == null ? void 0 : audioTrack.durationMs);
    if (!timedCues.length) {
      return setAssetState({
        status: "error",
        message: "No se pudieron extraer segmentos del SRT."
      });
    }
    const items = timedCues.map((cue, index) => ({
      ...De(index),
      title: cue.text.split(" ").slice(0, 4).join(" ") || "Escena " + String(index + 1).padStart(2, "0"),
      script: cue.text,
      caption: cue.text,
      prompt: "",
      duration: Math.max(0.5, Math.min(300, cue.duration || 4)),
      sourceStartMs: Math.round(cue.startMs),
      motion: "gentle-zoom-in",
      status: "idle",
      imageUrl: "",
      videoUrl: ""
    }));
    w.getState().setProject({
      ...w.getState().project,
      scenes: items
    });
    selectScene((firstItem = items[0]) == null ? void 0 : firstItem.id);
    setAssetState({
      status: "ready",
      message: "\u2705 " + items.length + " escenas creadas desde el SRT."
    });
    if (w.getState().flowState.connected && onGenerateVisualPrompts) {
      setTimeout(() => {
        onGenerateVisualPrompts(false);
      }, 100);
    }
  }, [onGenerateVisualPrompts, selectScene, setAssetState]);
  return {
    audioFileRef: ref4,
    uploadAudio,
    uploadMusic,
    importSrt: handleImportSrt,
    transcribeAudio,
    cancelTranscription,
    createScenesFromTranscript
  };
};
const Xr = ReactLib.lazy(() => _e(() => import("./Dashboard-CtUuoFER.js"), __vite__mapDeps([0, 1, 2, 3]), import.meta.url).then((result) => ({
  default: result.Dashboard
})));
const Kr = ReactLib.lazy(() => _e(() => import("./ThumbnailStudio-D5ap8eMV.js"), __vite__mapDeps([4, 1, 2, 3]), import.meta.url).then((result) => ({
  default: result.ThumbnailStudio
})));
const Jr = ReactLib.lazy(() => _e(() => import("./AudioStudioView-CIDz6WAG.js"), __vite__mapDeps([5, 1, 2, 6, 3]), import.meta.url).then((result) => ({
  default: result.AudioStudioView
})));
const Zr = ReactLib.lazy(() => _e(() => import("./AudioStudioModal-BEGLz_Up.js"), __vite__mapDeps([7, 1, 2, 6, 3]), import.meta.url).then((result) => ({
  default: result.AudioStudioModal
})));
const Qr = ReactLib.lazy(() => _e(() => import("./RenderProgressModal-PJg8RyN0.js"), __vite__mapDeps([8, 1, 2]), import.meta.url).then((result) => ({
  default: result.RenderProgressModal
})));
const Fa = ReactLib.lazy(() => _e(() => import("./AccountsModal-QfW0I3wF.js"), __vite__mapDeps([9, 1, 2]), import.meta.url).then((result) => ({
  default: result.AccountsModal
})));
const _Component14 = ReactLib.lazy(() => _e(() => import("./BatchPromptsModal-CbpqNnli.js"), __vite__mapDeps([10, 1, 2, 3]), import.meta.url).then((result) => ({
  default: result.BatchPromptsModal
})));
const Wa = ReactLib.lazy(() => _e(() => import("./MaintenanceModal-CilEv2u9.js"), __vite__mapDeps([11, 1, 2, 3]), import.meta.url).then((result) => ({
  default: result.MaintenanceModal
})));
const _Component15 = ReactLib.lazy(() => _e(() => import("./PreflightModal-Cw9t2V4n.js"), __vite__mapDeps([12, 1, 2, 3]), import.meta.url).then((result) => ({
  default: result.PreflightModal
})));
const Et = ReactLib.lazy(() => _e(() => import("./AutoUpdateModal-Cu6k4Lpq.js"), __vite__mapDeps([13, 1, 2]), import.meta.url).then((result) => ({
  default: result.AutoUpdateModal
})));
const Pt = ReactLib.lazy(() => _e(() => import("./ActivationModal-BDSD3qIP.js"), __vite__mapDeps([14, 1, 2, 3]), import.meta.url).then((result) => ({
  default: result.ActivationModal
})));
const _Component16 = () => {
  const ref7 = React.useRef(null);
  const ref8 = React.useRef(/* @__PURE__ */ new Set());
  const project = w((state) => state.project);
  const isHydrated = w((state) => state.isHydrated);
  const currentView = w((state) => state.currentView);
  const authUser = w((state) => state.authUser);
  w((state) => state.flowState);
  w((state) => state.updateProject);
  w((state) => state.updateScene);
  w((state) => state.finishSceneOperation);
  const setFlowState = w((state) => state.setFlowState);
  w((state) => state.setRenderState);
  w((state) => state.setAssetState);
  w((state) => state.setBatchState);
  w((state) => state.setReferenceStatus);
  const selectScene = w((state) => state.selectScene);
  w((state) => state.editorMode);
  const hydrate = w((state) => state.hydrate);
  const [logs, setLogs] = React.useState([]);
  const devLog = React.useCallback((type, message) => {
    var electronAPI;
    var appendAppLog;
    var logPromise;
    var catchFn;
    const time = (/* @__PURE__ */ new Date()).toLocaleTimeString("es", {
      hour12: false
    });
    setLogs((state) => [...state.slice(-49), {
      time,
      type,
      msg: String(message)
    }]);
    if ((catchFn = (appendAppLog = (electronAPI = window.electronAPI) == null ? void 0 : electronAPI.appendAppLog) == null ? void 0 : (logPromise = appendAppLog.call(electronAPI, type, String(message))).catch) != null) {
      catchFn.call(logPromise, () => {
      });
    }
  }, []);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = React.useState(false);
  const [isBatchPromptsModalOpen, setIsBatchPromptsModalOpen] = React.useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = React.useState(false);
  const [isAudioStudioModalOpen, setIsAudioStudioModalOpen] = React.useState(false);
  const [audioStudioTab, setAudioStudioTab] = React.useState("tts");
  const [isActivationModalOpen, setIsActivationModalOpen] = React.useState(false);
  const [activationReason, setActivationReason] = React.useState("");
  const checkLicensed = React.useCallback((featureName = "esta funci\xF3n") => {
    const authUser2 = w.getState().authUser;
    if ((authUser2 == null ? void 0 : authUser2.role) === "admin") {
      return true;
    }
    const licenseExpiresAt = (authUser2 == null ? void 0 : authUser2.licenseExpiresAt) && authUser2.licenseExpiresAt < Date.now();
    if (!authUser2 || authUser2.role === "guest" || authUser2.isLicensed === false || licenseExpiresAt) {
      setActivationReason(licenseExpiresAt ? "Tu per\xEDodo de suscripci\xF3n ha vencido. Introduce un nuevo c\xF3digo de activaci\xF3n para renovar." : "Activa tu licencia VIP para usar " + featureName + ".");
      setIsActivationModalOpen(true);
      return false;
    } else {
      return true;
    }
  }, []);
  React.useEffect(() => {
    const handleOpenAudioStudio = (state) => {
      var detail;
      setAudioStudioTab(((detail = state.detail) == null ? void 0 : detail.tab) || "tts");
      w.getState().setCurrentView("audio");
    };
    const handleOpenRenderModal = () => {
      setIsRenderModalOpen(true);
    };
    const handleOpenActivationModal = (state) => {
      var detail;
      setActivationReason(((detail = state.detail) == null ? void 0 : detail.reason) || "Activa tu licencia VIP para desbloquear esta funci\xF3n");
      setIsActivationModalOpen(true);
    };
    window.addEventListener("flowtube:open-audio-studio", handleOpenAudioStudio);
    window.addEventListener("open-render-modal", handleOpenRenderModal);
    window.addEventListener("open-activation-modal", handleOpenActivationModal);
    return () => {
      window.removeEventListener("flowtube:open-audio-studio", handleOpenAudioStudio);
      window.removeEventListener("open-render-modal", handleOpenRenderModal);
      window.removeEventListener("open-activation-modal", handleOpenActivationModal);
    };
  }, []);
  $r(ref7);
  zr();
  const {
    uploadAudio,
    uploadMusic,
    importSrt,
    transcribeAudio,
    cancelTranscription,
    createScenesFromTranscript
  } = qr({
    checkLicensed,
    devLog,
    onGenerateVisualPrompts: (forceAll) => generateVisualPrompts(forceAll)
  });
  const handleFilesDropped = React.useCallback(async (items37) => {
    if (!items37 || !items37.length) {
      return;
    }
    const {
      project: project2,
      selectedId
    } = w.getState();
    const scene = project2.scenes.find((scene2) => scene2.id === selectedId) || project2.scenes[0];
    const items38 = items37.filter((file) => {
      const name = (file.name || "").toLowerCase();
      return name.endsWith(".srt") || name.endsWith(".vtt") || name.endsWith(".json") && !file.type.startsWith("image");
    });
    for (const item of items38) {
      await importSrt(item);
    }
    const items39 = items37.filter((item) => item.type.startsWith("image/") || item.type.startsWith("video/"));
    if (items39.length > 1) {
      importVisualFilesToTimeline(items39);
      return;
    }
    for (const item of items37) {
      const name = (item.name || "").toLowerCase();
      if (!name.endsWith(".srt") && !name.endsWith(".vtt")) {
        if ((item.type.startsWith("image/") || item.type.startsWith("video/")) && scene) {
          uploadImage(scene, item);
          break;
        } else if (item.type.startsWith("audio/") || name.endsWith(".mp3") || name.endsWith(".wav") || name.endsWith(".m4a") || name.endsWith(".ogg")) {
          uploadAudio(item);
          break;
        }
      }
    }
  }, []);
  Or(handleFilesDropped);
  React.useEffect(() => {
    hydrate();
  }, [hydrate]);
  React.useEffect(() => {
    if (isHydrated) {
      for (const scene of project.scenes) {
        const videoOperation = scene.videoOperation;
        if (videoOperation != null && !!videoOperation.mediaName && !ref8.current.has(videoOperation.mediaName)) {
          ref8.current.add(videoOperation.mediaName);
          resumeVideo(scene);
        }
      }
    }
  }, [isHydrated]);
  React.useEffect(() => {
    var electronAPI;
    const checkFlowConnection = async () => {
      var electronAPI2;
      if ((electronAPI2 = window.electronAPI) != null && electronAPI2.getAccounts) {
        try {
          const filteredGetAccounts = (await window.electronAPI.getAccounts() || []).filter((getAccount) => getAccount.connected && getAccount.projectId);
          if (filteredGetAccounts.length > 0) {
            setFlowState({
              connected: true,
              count: filteredGetAccounts.length,
              label: filteredGetAccounts.length > 1 ? "\u26A1 " + filteredGetAccounts.length + " Cuentas Flow" : "Flow Conectado"
            });
            return;
          }
        } catch {
        }
      }
      try {
        const response = await Ee("FLOW_CHECK", {}, 2500);
        const activeAccountsCount = Number(response.activeAccountsCount || response.accountsCount) || (response.connected ? 1 : 0);
        setFlowState({
          connected: !!response.connected,
          count: activeAccountsCount,
          label: activeAccountsCount > 1 ? "\u26A1 " + activeAccountsCount + " Cuentas Flow" : response.connected ? "Flow Conectado" : "Conectar Google Flow"
        });
      } catch {
        setFlowState({
          connected: false,
          count: 0,
          label: "Conectar Google Flow"
        });
      }
    };
    checkFlowConnection();
    const timer = setInterval(checkFlowConnection, 4e3);
    if ((electronAPI = window.electronAPI) != null && electronAPI.onAccountsChanged) {
      window.electronAPI.onAccountsChanged((accounts) => {
        const items = (accounts || []).filter((item) => item.connected && item.projectId);
        setFlowState({
          connected: items.length > 0,
          count: items.length,
          label: items.length > 1 ? "\u26A1 " + items.length + " Cuentas Flow" : items.length ? "Flow Conectado" : "Conectar Google Flow"
        });
      });
    }
    return () => clearInterval(timer);
  }, [setFlowState]);
  const handleSelectScene = React.useCallback((sceneId) => {
    var current;
    selectScene(sceneId);
    const {
      project: project2
    } = w.getState();
    const sceneIndex = project2.scenes.findIndex((scene) => scene.id === sceneId);
    const totalSlice = project2.scenes.slice(0, Math.max(0, sceneIndex)).reduce((acc, slice) => acc + Math.max(1, Math.round(Number(slice.duration || 4) * project2.fps)), 0);
    if ((current = ref7.current) != null) {
      current.seekTo(totalSlice);
    }
  }, [selectScene]);
  const resolveScene = (sceneOrId) => {
    if (!sceneOrId) {
      const {
        project: project2,
        selectedId
      } = w.getState();
      return project2.scenes.find((scene) => scene.id === selectedId) || project2.scenes[0];
    }
    if (typeof sceneOrId == "string") {
      const {
        project: project2
      } = w.getState();
      return project2.scenes.find((scene) => scene.id === sceneOrId);
    }
    return sceneOrId;
  };
  const {
    uploadImage,
    uploadCharacterReference,
    removeCharacterReference,
    importVisualFilesToTimeline,
    generateImage,
    generateAllImages,
    runAutoPipeline,
    generateVisualPrompts
  } = Qn({
    checkLicensed,
    devLog,
    resolveScene
  });
  const {
    generateVideo,
    generateAllVideos,
    resumeVideo
  } = Fr({
    project,
    checkLicensed,
    devLog,
    resumedOperations: ref8,
    resolveScene
  });
  const {
    isRenderModalOpen,
    setIsRenderModalOpen,
    preflightReport,
    setPreflightReport,
    renderJobState,
    renderVideo,
    cancelRender
  } = Hr({
    checkLicensed,
    devLog
  });
  const askCopilot = async ({
    message,
    selectedScene,
    projectSnapshot
  }) => {
    var scenes;
    var data2;
    var data3;
    const sceneContext = selectedScene ? "Escena seleccionada: " + (selectedScene.title || "Sin t\xEDtulo") + ". Guion: " + (selectedScene.script || selectedScene.caption || "").slice(0, 900) + ". Prompt visual actual: " + (selectedScene.prompt || "").slice(0, 700) + "." : "No hay una escena seleccionada.";
    const prompt = "Eres FLOWSTUDIO Copilot, un asistente de edici\xF3n de video dentro de FLOWSTUDIO. Responde en espa\xF1ol, de forma clara y accionable, sin inventar que ejecutaste cambios que no se te pidieron. Puedes explicar tareas de guion, prompts visuales, im\xE1genes, subt\xEDtulos, audio, timeline y render. Si la petici\xF3n corresponde a una acci\xF3n autom\xE1tica, indica el bot\xF3n o comando correspondiente.\n\nPROYECTO: " + ((projectSnapshot == null ? void 0 : projectSnapshot.title) || project.title || "Proyecto sin t\xEDtulo") + "\nFORMATO: " + ((projectSnapshot == null ? void 0 : projectSnapshot.format) || project.format || "video") + "\nESCENAS: " + ((projectSnapshot == null ? void 0 : projectSnapshot.sceneCount) ?? ((scenes = project.scenes) == null ? void 0 : scenes.length) ?? 0) + "\n" + sceneContext + "\n\nPETICI\xD3N DEL USUARIO:\n" + message + "\n\nDa una respuesta \xFAtil y breve. Si falta informaci\xF3n, pide solo el dato necesario. No devuelvas JSON, Markdown, asteriscos ni etiquetas t\xE9cnicas.";
    const response = await Ee("FLOW_GENERATE_TEXT", {
      model: project.textModel,
      parts: [{
        text: prompt
      }]
    }, 45e3);
    const string = String(typeof response == "string" ? response : (response == null ? void 0 : response.text) || (response == null ? void 0 : response.output) || (response == null ? void 0 : response.content) || ((data2 = response == null ? void 0 : response.data) == null ? void 0 : data2.text) || ((data3 = response == null ? void 0 : response.data) == null ? void 0 : data3.output) || "").trim();
    if (!string) {
      throw new Error("Google Flow no devolvi\xF3 texto");
    }
    return string;
  };
  if (isHydrated) {
    if (currentView === "login" || !authUser) {
      return /* @__PURE__ */ jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsx(Rr, {}),
        /* @__PURE__ */ jsx(_Component11, {})
      ] });
    } else if (currentView === "dashboard") {
      return /* @__PURE__ */ jsxs("div", { className: "app-shell full-view", children: [
        /* @__PURE__ */ jsx(_Component12, {}),
        /* @__PURE__ */ jsx(Xr, { onOpenAccountsModal: () => setIsAccountsModalOpen(true), onOpenMaintenance: () => setIsMaintenanceModalOpen(true) }),
        /* @__PURE__ */ jsx(Et, {}),
        /* @__PURE__ */ jsx(Pt, { isOpen: isActivationModalOpen, onClose: () => setIsActivationModalOpen(false), reason: activationReason }),
        /* @__PURE__ */ jsx(_Component11, {}),
        /* @__PURE__ */ jsx(Fa, { isOpen: isAccountsModalOpen, onClose: () => setIsAccountsModalOpen(false) }),
        /* @__PURE__ */ jsx(Wa, { isOpen: isMaintenanceModalOpen, onClose: () => setIsMaintenanceModalOpen(false) }),
        /* @__PURE__ */ jsx(It, { logs, onClearLogs: () => setLogs([]), onResumeBatch: () => generateAllImages(false), onResumePrompts: () => generateVisualPrompts(false), onRetryTranscription: transcribeAudio, onCancelTranscription: cancelTranscription, onRetryRender: () => renderVideo(true, null, true) })
      ] });
    } else if (currentView === "audio") {
      return /* @__PURE__ */ jsxs("div", { className: "app-shell full-view", children: [
        /* @__PURE__ */ jsx(_Component12, {}),
        /* @__PURE__ */ jsx(Jr, {}),
        /* @__PURE__ */ jsx(Et, {}),
        /* @__PURE__ */ jsx(Pt, { isOpen: isActivationModalOpen, onClose: () => setIsActivationModalOpen(false), reason: activationReason }),
        /* @__PURE__ */ jsx(_Component11, {}),
        /* @__PURE__ */ jsx(It, { logs, onClearLogs: () => setLogs([]), onResumeBatch: () => generateAllImages(false), onResumePrompts: () => generateVisualPrompts(false), onRetryTranscription: transcribeAudio, onCancelTranscription: cancelTranscription, onRetryRender: () => renderVideo(true, null, true) })
      ] });
    } else if (currentView === "thumbnails" || currentView === "thumbnail") {
      return /* @__PURE__ */ jsxs("div", { className: "app-shell full-view", children: [
        /* @__PURE__ */ jsx(_Component12, {}),
        /* @__PURE__ */ jsx(Kr, {}),
        /* @__PURE__ */ jsx(Et, {}),
        /* @__PURE__ */ jsx(Pt, { isOpen: isActivationModalOpen, onClose: () => setIsActivationModalOpen(false), reason: activationReason }),
        /* @__PURE__ */ jsx(_Component11, {}),
        /* @__PURE__ */ jsx(It, { logs, onClearLogs: () => setLogs([]), onResumeBatch: () => generateAllImages(false), onResumePrompts: () => generateVisualPrompts(false), onRetryTranscription: transcribeAudio, onCancelTranscription: cancelTranscription, onRetryRender: () => renderVideo(true, null, true) })
      ] });
    } else {
      return /* @__PURE__ */ jsxs("div", { className: "app-shell", children: [
        /* @__PURE__ */ jsx(_Component12, {}),
        /* @__PURE__ */ jsx($n, { onUploadCharacterReference: uploadCharacterReference, onRemoveCharacterReference: removeCharacterReference, onRenderVideo: renderVideo, onOpenAccountsModal: () => setIsAccountsModalOpen(true), onOpenMaintenance: () => setIsMaintenanceModalOpen(true) }),
        /* @__PURE__ */ jsx("main", { className: "workspace format-" + project.format, children: /* @__PURE__ */ jsx(_Component13, { previewProps: {
          playerRef: ref7,
          onSelectScene: handleSelectScene,
          onUploadImage: uploadImage,
          onUploadAudio: uploadAudio,
          onUploadMusic: uploadMusic,
          onImportSrt: importSrt,
          onTranscribeAudio: transcribeAudio,
          onCreateScenesFromTranscript: createScenesFromTranscript,
          onOpenBatchPromptsModal: () => setIsBatchPromptsModalOpen(true)
        }, inspectorProps: {
          onUploadImage: uploadImage,
          onGenerateImage: generateImage,
          onGenerateVideo: generateVideo,
          onGenerateAllVideos: generateAllVideos,
          onUploadAudio: uploadAudio,
          onUploadMusic: uploadMusic,
          onImportSrt: importSrt,
          onTranscribeAudio: transcribeAudio,
          onCreateScenesFromTranscript: createScenesFromTranscript,
          onGenerateVisualPrompts: generateVisualPrompts,
          onGenerateAllImages: generateAllImages,
          onAutoPilot: runAutoPipeline,
          onRenderVideo: renderVideo,
          onAskCopilot: askCopilot,
          onOpenBatchPromptsModal: () => setIsBatchPromptsModalOpen(true)
        } }) }),
        /* @__PURE__ */ jsx(It, { logs, onClearLogs: () => setLogs([]), onResumeBatch: () => generateAllImages(false), onResumePrompts: () => generateVisualPrompts(false), onRetryTranscription: transcribeAudio, onCancelTranscription: cancelTranscription, onRetryRender: () => renderVideo(true, null, true) }),
        /* @__PURE__ */ jsx(Qr, { isOpen: isRenderModalOpen, onClose: () => setIsRenderModalOpen(false), renderJob: renderJobState, onRetry: () => renderVideo(true, null, true), onCancel: cancelRender }),
        /* @__PURE__ */ jsx(Fa, { isOpen: isAccountsModalOpen, onClose: () => setIsAccountsModalOpen(false) }),
        /* @__PURE__ */ jsx(_Component14, { isOpen: isBatchPromptsModalOpen, onClose: () => setIsBatchPromptsModalOpen(false), onGenerateImage: generateImage }),
        /* @__PURE__ */ jsx(Wa, { isOpen: isMaintenanceModalOpen, onClose: () => setIsMaintenanceModalOpen(false) }),
        /* @__PURE__ */ jsx(Et, {}),
        /* @__PURE__ */ jsx(Pt, { isOpen: isActivationModalOpen, onClose: () => setIsActivationModalOpen(false), reason: activationReason }),
        /* @__PURE__ */ jsx(_Component15, { report: preflightReport, onClose: () => setPreflightReport(null), onContinue: (resolutionOverride) => renderVideo(true, resolutionOverride), onGenerateMissingImages: () => generateAllImages(false, false) }),
        /* @__PURE__ */ jsx(Zr, { isOpen: isAudioStudioModalOpen, onClose: () => setIsAudioStudioModalOpen(false), initialTab: audioStudioTab }),
        /* @__PURE__ */ jsx(_Component11, {})
      ] });
    }
  } else {
    return /* @__PURE__ */ jsxs("div", { style: {
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      color: "#78a4ff",
      background: "#05070d",
      fontFamily: "system-ui",
      fontSize: 13,
      fontWeight: 800
    }, children: [
      "Cargando proyecto local...",
      /* @__PURE__ */ jsx(_Component11, {})
    ] });
  }
};
const _Component17 = () => /* @__PURE__ */ jsx(Mr, { children: /* @__PURE__ */ jsx(ReactLib.Suspense, { fallback: /* @__PURE__ */ jsx("div", { style: {
  display: "grid",
  placeItems: "center",
  height: "100vh",
  background: "#05060b",
  color: "#94a3b8",
  fontSize: 13,
  fontWeight: 700
}, children: /* @__PURE__ */ jsxs("div", { style: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12
}, children: [
  /* @__PURE__ */ jsx("div", { style: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "2.5px solid rgba(99, 102, 241, 0.2)",
    borderTopColor: "#6366f1",
    animation: "spin 0.8s linear infinite"
  } }),
  /* @__PURE__ */ jsx("span", { children: "Iniciando FLOWSTUDIO..." })
] }) }), children: /* @__PURE__ */ jsx(_Component16, {}) }) });
class _Component18 extends ReactLib.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("[FlowTube Crash]:", error, errorInfo);
  }
  render() {
    var error4;
    var error5;
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { style: {
        minHeight: "100vh",
        background: "#090a0d",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        fontFamily: "'Inter', sans-serif"
      }, children: [
        /* @__PURE__ */ jsx("h2", { style: {
          color: "#ef4444",
          marginBottom: 8,
          fontSize: 20
        }, children: "\u26A0\uFE0F Ocurri\xF3 un error al cargar la vista" }),
        /* @__PURE__ */ jsx("p", { style: {
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 16
        }, children: "Se ha producido un error inesperado en la interfaz. Puedes reiniciar la vista aqu\xED:" }),
        /* @__PURE__ */ jsx("pre", { style: {
          background: "#161922",
          border: "1px solid #282d3d",
          padding: 16,
          borderRadius: 8,
          color: "#f87171",
          maxWidth: 750,
          overflowX: "auto",
          fontSize: 12,
          marginBottom: 20
        }, children: ((error4 = this.state.error) == null ? void 0 : error4.stack) || ((error5 = this.state.error) == null ? void 0 : error5.message) || String(this.state.error) }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          window.location.reload();
        }, style: {
          background: "linear-gradient(135deg, #4f7cff, #6f5cf4)",
          color: "#fff",
          border: "none",
          padding: "10px 24px",
          borderRadius: 8,
          fontWeight: 800,
          cursor: "pointer"
        }, children: "\u{1F504} Recargar FLOWSTUDIO" })
      ] });
    } else {
      return this.props.children;
    }
  }
}
ReactDOMClient.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsx(_Component18, { children: /* @__PURE__ */ jsx(_Component17, {}) }));
export {
  na as D,
  ur as M,
  Da as a,
  Cn as b,
  Mn as c,
  uo as d,
  po as e,
  ra as f,
  Ee as g,
  wn as h,
  tt as i,
  Sn as j,
  co as l,
  dt as n,
  lo as r,
  Re as s,
  w as u
};
