const __vite__mapDeps = (indexes, self = __vite__mapDeps, fileList = self.f ||= ["./Dashboard-CtUuoFER.js", "./vendor-react-BbRiLirl.js", "./vendor-state-m3Xdu9cz.js", "./vendor-remotion-D3IpuOk5.js", "./ThumbnailStudio-D5ap8eMV.js", "./AudioStudioView-CIDz6WAG.js", "./AudioStudioContent-CYqgvu51.js", "./AudioStudioModal-BEGLz_Up.js", "./RenderProgressModal-PJg8RyN0.js", "./AccountsModal-QfW0I3wF.js", "./BatchPromptsModal-CbpqNnli.js", "./MaintenanceModal-CilEv2u9.js", "./PreflightModal-Cw9t2V4n.js", "./AutoUpdateModal-Cu6k4Lpq.js", "./ActivationModal-BDSD3qIP.js"]) => indexes.map(index => fileList[index]);
import { c as create, j as jsxRuntime, r as React, a as ReactDOM, R as ReactLib, b as ReactDOMClient } from "./vendor-react-BbRiLirl.js";
import { A as AbsoluteFill, S as Sequence, H as RemotionAudio, u as useCurrentFrame, i as interpolate, V as RemotionVideo, I as RemotionImg, s as spring, E as Easing, P as Player } from "./vendor-remotion-D3IpuOk5.js";
import "./vendor-state-m3Xdu9cz.js";
(function () {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) {
    preloadLink(link);
  }
  new MutationObserver(mutations => {
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
    childList: !0,
    subtree: !0
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
    link.ep = !0;
    const options = getFetchOptions(link);
    fetch(link.href, options);
  }
})();
const yn = "modulepreload";
const vn = function (dep, url) {
  return new URL(dep, url).href;
};
const da = {};
const _e = function (importModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function (promises) {
      return Promise.all(promises.map(promise => Promise.resolve(promise).then(result => ({
        status: "fulfilled",
        value: result
      }), reason => ({
        status: "rejected",
        reason: reason
      }))));
    };
    const links = document.getElementsByTagName("link");
    const nonceMeta = document.querySelector("meta[property=csp-nonce]");
    const nonce = (nonceMeta == null ? undefined : nonceMeta.nonce) || (nonceMeta == null ? undefined : nonceMeta.getAttribute("nonce"));
    promise = allSettled(deps.map(dep => {
      dep = vn(dep, importerUrl);
      if (dep in da) {
        return;
      }
      da[dep] = !0;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? "[rel=\"stylesheet\"]" : "";
      if (importerUrl) {
        for (let index = links.length - 1; index >= 0; index--) {
          const link = links[index];
          if (link.href === dep && (!isCss || link.rel === "stylesheet")) {
            return;
          }
        }
      } else if (document.querySelector("link[href=\"" + dep + "\"]" + cssSelector)) {
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
      cancelable: !0
    });
    event.payload = error;
    window.dispatchEvent(event);
    if (!event.defaultPrevented) {
      throw error;
    }
  }
  return promise.then(results => {
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
      return parsed.map(item => typeof item == "string" ? item.trim() : item && typeof item == "object" ? (item.prompt || item.visualPrompt || item.description || item.text || JSON.stringify(item)).trim() : String(item).trim()).filter(Boolean);
    }
  } catch {}
  if (/(?:^|\n+)(?:#+\s*)?(?:Escena\s*\d+[:\-\s]*|Scene\s*\d+[:\-\s]*|\d+[\.\):\-]\s*)/i.test(text)) {
    const sections = text.split(/(?:^|\n+)(?:#+\s*)?(?:Escena\s*\d+[:\-\s]*|Scene\s*\d+[:\-\s]*|\d+[\.\):\-]\s*)/i).map(section => section.trim()).filter(section => section.length > 0);
    if (sections.length > 1) {
      return sections;
    }
  }
  if (text.includes("\n\n")) {
    const blocks = text.split(/\n{2,}/).map(block => block.trim()).filter(Boolean);
    if (blocks.length > 1) {
      return blocks.map(block => block.replace(/^(\d+[\.\):\-]\s*|escena\s*\d+[:\-\s]*|scene\s*\d+[:\-\s]*)/i, "").trim());
    }
  }
  return text.split("\n").map(line => line.trim()).filter(line => line.length > 0).map(line => line.replace(/^(\d+[\.\):\-]\s*|escena\s*\d+[:\-\s]*|scene\s*\d+[:\-\s]*)/i, "").trim()).filter(Boolean);
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
    let settled = !1;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        Ge = null;
        reject(new Error("Timeout al abrir IndexedDB (posible contención de bloqueo)."));
      }
    }, 4000);
    const openRequest = indexedDB.open(jn, 3);
    openRequest.onupgradeneeded = event => {
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
          unique: !1
        });
        objectStore.createIndex("createdAt", "createdAt", {
          unique: !1
        });
      }
    };
    openRequest.onsuccess = () => {
      clearTimeout(timer);
      if (settled) {
        return;
      }
      settled = !0;
      const result = openRequest.result;
      Je = result;
      result.onclose = () => {
        Je = null;
        Ge = null;
      };
      result.onversionchange = () => {
        try {
          result.close();
        } catch {}
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
      console.warn("[projectDb] Base de datos bloqueada temporalmente por otra pestaña o proceso.");
    };
  }), Ge);
};
const Re = async project => {
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
const Sn = async (project, reason = "Copia automática") => {
  if (project == null || !project.id) {
    return null;
  }
  const db = await Xe();
  const snapshot = {
    id: crypto.randomUUID(),
    projectId: project.id,
    title: project.title || "Sin título",
    reason: reason,
    createdAt: Date.now(),
    project: structuredClone(project)
  };
  await new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(Ve, "readwrite");
      tx.objectStore(Ve).put(snapshot);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Creación de copia abortada."));
    } catch (error) {
      reject(error);
    }
  });
  const snapshots = await wn(project.id);
  await Promise.all(snapshots.slice(20).map(snapshot => kn(snapshot.id)));
  return snapshot;
};
const wn = async id => {
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
const kn = async id => {
  const db = await Xe();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(Ve, "readwrite");
      tx.objectStore(Ve).delete(id);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Eliminación de copia abortada."));
    } catch (error) {
      reject(error);
    }
  });
};
const lo = async snapshotId => {
  const db = await Xe();
  const snapshot = await new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(Ve, "readonly");
      const request = tx.objectStore(Ve).get(snapshotId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Restauración abortada."));
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
          request.onsuccess = event => {
            const result = event.target.result;
            resolve(result ? result.value : null);
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
const Cn = async projectId => {
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
          const projects = (Array.isArray(request.result) ? request.result : []).filter(Boolean).map(row => {
            var sceneList;
            var firstScene;
            var sceneList2;
            var firstSceneVideo;
            return {
              id: (row == null ? undefined : row.id) || crypto.randomUUID(),
              title: (row == null ? undefined : row.title) || "Sin título",
              format: (row == null ? undefined : row.format) || "short",
              visualStyle: (row == null ? undefined : row.visualStyle) || "western-anime",
              scenesCount: Array.isArray(row == null ? undefined : row.scenes) ? row.scenes.length : 0,
              thumbnailUrl: ((firstScene = (sceneList = row == null ? undefined : row.scenes) == null ? undefined : sceneList[0]) == null ? undefined : firstScene.imageUrl) || ((firstSceneVideo = (sceneList2 = row == null ? undefined : row.scenes) == null ? undefined : sceneList2[0]) == null ? undefined : firstSceneVideo.videoUrl) || "",
              updatedAt: (row == null ? undefined : row.updatedAt) || Date.now(),
              createdAt: (row == null ? undefined : row.createdAt) || (row == null ? undefined : row.updatedAt) || Date.now()
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
      tx.onerror = () => reject(tx.error || new Error("Error en la transacción de lectura."));
      tx.onabort = () => reject(tx.error || new Error("Transacción de lectura abortada."));
    } catch (error) {
      reject(error);
    }
  });
};
const Mn = async id => {
  const db = await Xe();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction([ze, qe], "readwrite");
      tx.objectStore(ze).delete(id);
      tx.oncomplete = () => resolve(!0);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Eliminación abortada."));
    } catch (error) {
      reject(error);
    }
  });
};
const uo = async projectId => {
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
  label: "💥 Título Pop Cinemático",
  category: "titles",
  hasText: !0,
  default: {
    preset: "title-pop",
    text: "¡IMPACTANTE!",
    fromMs: 200,
    durationMs: 2400,
    position: "center",
    accentColor: "#d7ff4f"
  }
}, {
  id: "kinetic-text",
  label: "⚡ Tipografía Cinética",
  category: "titles",
  hasText: !0,
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
  label: "🎬 Stock Motion Cinemático (Full)",
  category: "full",
  hasText: !0,
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
  label: "🖍️ Palabra Resaltada (Marker)",
  category: "emphasis",
  hasText: !0,
  default: {
    preset: "word-highlight",
    text: "¡INCREÍBLE!",
    fromMs: 300,
    durationMs: 2000,
    position: "center",
    accentColor: "#ffd23f"
  }
}, {
  id: "quote-card",
  label: "💬 Tarjeta de Cita / Frase",
  category: "cards",
  hasText: !0,
  default: {
    preset: "quote-card",
    text: "La clave del éxito es la disciplina diaria.",
    fromMs: 250,
    durationMs: 3000,
    position: "center",
    accentColor: "#38bdf8"
  }
}, {
  id: "stat-counter",
  label: "📈 Tarjeta de Estadística / Dato",
  category: "cards",
  hasText: !0,
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
  label: "🔔 Suscríbete (Llamada a la Acción)",
  category: "cta",
  hasText: !0,
  default: {
    preset: "subscribe-cta",
    text: "SUSCRÍBETE PARA MÁS",
    fromMs: 300,
    durationMs: 3000,
    position: "bottom",
    accentColor: "#ef4444"
  }
}, {
  id: "lower-third",
  label: "🏷️ Tercio Inferior (Lower Third)",
  category: "titles",
  hasText: !0,
  default: {
    preset: "lower-third",
    text: "Capítulo 01 · Introducción",
    fromMs: 200,
    durationMs: 2800,
    position: "lower-left",
    accentColor: "#d7ff4f"
  }
}, {
  id: "progress-bar",
  label: "⏳ Barra de Retención Inferior",
  category: "overlays",
  hasText: !1,
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
  label: "⚠️ Alerta / Advertencia de Impacto",
  category: "emphasis",
  hasText: !0,
  default: {
    preset: "warning-alert",
    text: "¡ATENCIÓN!",
    fromMs: 150,
    durationMs: 2200,
    position: "top",
    accentColor: "#f59e0b"
  }
}];
const pa = timecode => {
  const match = String(timecode).trim().match(/^(\d+):([0-5]\d):([0-5]\d)[,.](\d{3})$/);
  if (match) {
    return (Number(match[1]) * 60 * 60 + Number(match[2]) * 60 + Number(match[3])) * 1000 + Number(match[4]);
  } else {
    return NaN;
  }
};
const ma = file => new Promise(resolve => {
  try {
    const video = document.createElement("video");
    video.preload = "metadata";
    let src = "";
    let isObjectUrl = !1;
    if (typeof file == "string") {
      src = file;
    } else if (file instanceof Blob || file instanceof File) {
      src = URL.createObjectURL(file);
      isObjectUrl = !0;
    } else {
      return resolve(0);
    }
    const cleanup = () => {
      if (isObjectUrl && src) {
        try {
          URL.revokeObjectURL(src);
        } catch {}
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
    }, 4000);
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
  const weights = words.map(word => {
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
      word: word,
      startMs: wordStartMs,
      endMs: Math.max(wordStartMs + 40, wordEndMs)
    };
  });
};
const La = text => String(text || "").replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").trim().split(/\n{2,}/).map(block => {
  const lines = block.split("\n");
  const timeLineIndex = lines.findIndex(line => line.includes("-->"));
  if (timeLineIndex < 0) {
    return null;
  }
  const [startRaw, endRaw] = lines[timeLineIndex].split("-->");
  const startMs = pa(startRaw);
  const endMs = pa(endRaw == null ? undefined : endRaw.trim().split(/\s+/)[0]);
  const text = lines.slice(timeLineIndex + 1).join("\n").trim();
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs || !text) {
    return null;
  }
  const words = Kt(text, startMs, endMs);
  return {
    id: crypto.randomUUID(),
    startMs: startMs,
    endMs: endMs,
    text: text,
    words: words
  };
}).filter(Boolean).sort((a, b) => a.startMs - b.startMs);
const In = text => {
  try {
    const parsed = typeof text == "string" ? JSON.parse(text) : text;
    const segments = parsed.segments || (Array.isArray(parsed) ? parsed : []);
    const cues = [];
    for (const segment of segments) {
      const startMs = Math.round(Number(segment.start || 0) * 1000);
      const endMs = Math.round(Number(segment.end || 0) * 1000);
      const text = String(segment.text || "").trim();
      if (!text || endMs <= startMs) {
        continue;
      }
      const words = Array.isArray(segment.words) ? segment.words.map(word => ({
        word: String(word.word || "").trim(),
        startMs: Math.round(Number(word.start || segment.start || 0) * 1000),
        endMs: Math.round(Number(word.end || segment.end || 0) * 1000),
        score: word.score
      })).filter(word => word.word && word.endMs >= word.startMs) : [];
      cues.push({
        id: crypto.randomUUID(),
        startMs: startMs,
        endMs: endMs,
        text: text,
        words: words.length ? words : undefined,
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
      const words = Array.isArray(cue.words) && cue.words.length ? cue.words : text.split(/\s+/).map(word => ({
        word: word
      }));
      const wordsPerPart = Math.max(1, Math.ceil(words.length / partCount));
      for (let partIndex = 0; partIndex < partCount; partIndex++) {
        const partStartMs = startMs + partIndex * partMs;
        const partEndMs = partIndex === partCount - 1 ? startMs + durationMs : startMs + (partIndex + 1) * partMs;
        const partWords = words.slice(partIndex * wordsPerPart, (partIndex + 1) * wordsPerPart);
        const partText = partWords.map(item => item.word).join(" ").trim() || text;
        timedCues.push({
          text: partText,
          startMs: partStartMs,
          endMs: partEndMs,
          duration: Number(((partEndMs - partStartMs) / 1000).toFixed(3)),
          words: partWords.length && partWords[0].startMs !== undefined ? partWords : undefined
        });
      }
    } else {
      timedCues.push({
        text: text,
        startMs: startMs,
        endMs: startMs + durationMs,
        duration: Number((durationMs / 1000).toFixed(3)),
        words: cue.words
      });
    }
  }
  return timedCues.map((item, index) => ({
    ...item,
    index: index
  }));
};
const ga = ms => {
  const total = Math.max(0, Math.round(ms));
  const hours = Math.floor(total / 3600000);
  const minutes = Math.floor(total % 3600000 / 60000);
  const seconds = Math.floor(total % 60000 / 1000);
  const millis = total % 1000;
  return String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0") + "," + String(millis).padStart(3, "0");
};
const ta = cues => !Array.isArray(cues) || !cues.length ? "" : cues.filter(item => {
  var text;
  return item && ((text = item.text) == null ? undefined : text.trim());
}).map((cue, index) => {
  const start = ga(cue.startMs);
  const end = ga(cue.endMs);
  return index + 1 + "\n" + start + " --> " + end + "\n" + cue.text.trim() + "\n";
}).join("\n");
const fa = ms => {
  const total = Math.max(0, Math.round(ms));
  const hours = Math.floor(total / 3600000);
  const minutes = Math.floor(total % 3600000 / 60000);
  const seconds = Math.floor(total % 60000 / 1000);
  const millis = total % 1000;
  return String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0") + "." + String(millis).padStart(3, "0");
};
const aa = cues => {
  if (!Array.isArray(cues) || !cues.length) {
    return "WEBVTT\n\n";
  }
  const valid = cues.filter(item => {
    var text;
    return item && ((text = item.text) == null ? undefined : text.trim());
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
  wordByWord: !0,
  wordHighlight: !0,
  outlineColor: "#000000",
  outlineWidth: 5,
  glow: 18,
  letterSpacing: -0.5,
  uppercase: !0,
  position: "bottom",
  posY: 80,
  maxWordsPerScreen: 3
};
const Dt = new Set(["inherit", "none", "fade", "slide-left", "slide-right", "zoom", "wipe"]);
const An = [{
  value: "auto",
  label: "🌐 Auto-detectar (Idioma del audio)"
}, {
  value: "es",
  label: "🇪🇸 Español"
}, {
  value: "en",
  label: "🇺🇸 Inglés (English)"
}, {
  value: "pt",
  label: "🇧🇷 Portugués"
}, {
  value: "fr",
  label: "🇫🇷 Francés"
}, {
  value: "de",
  label: "🇩🇪 Alemán"
}, {
  value: "it",
  label: "🇮🇹 Italiano"
}, {
  value: "ja",
  label: "🇯🇵 Japonés"
}, {
  value: "ru",
  label: "🇷🇺 Ruso"
}, {
  value: "zh",
  label: "🇨🇳 Chino"
}];
const De = index => ({
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
  hasCharacter: !0,
  isStockMotion: !1,
  imageHidden: !1,
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
    enabled: !0,
    style: na
  },
  overlays: [],
  scenes: [De(0), De(1), De(2)]
};
const dt = raw => {
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
  const resolveRefUrl = ref => ref ? ref.url && !ref.url.startsWith("blob:") ? ref.url : ref.base64 ? "data:" + (ref.mimeType || "image/jpeg") + ";base64," + ref.base64 : ref.url || "" : "";
  const styleReferences = Array.isArray(project.styleReferences) && project.styleReferences.length > 0 ? project.styleReferences.slice(0, 3).map((ref, index) => ({
    id: ref.id || "style-ref-" + index,
    url: resolveRefUrl(ref),
    name: ref.name || "Referencia " + (index + 1),
    base64: ref.base64 || "",
    mimeType: ref.mimeType || "image/jpeg",
    flowMediaId: ref.flowMediaId || "",
    enabled: ref.enabled !== !1
  })) : (customStyle2 = project.customStyle) != null && customStyle2.url || (customStyle3 = project.customStyle) != null && customStyle3.base64 ? [{
    id: "style-ref-0",
    url: resolveRefUrl(project.customStyle),
    name: project.customStyle.name || "Referencia 1",
    base64: project.customStyle.base64 || "",
    mimeType: project.customStyle.mimeType || "image/jpeg",
    flowMediaId: project.customStyle.flowMediaId || "",
    enabled: !0
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
      default: Dt.has((transitions2 = project.transitions) == null ? undefined : transitions2.default) && project.transitions.default !== "inherit" ? project.transitions.default : "fade",
      duration: Math.min(1, Math.max(0.1, Number((transitions3 = project.transitions) == null ? undefined : transitions3.duration) || 0.35))
    },
    visualStyle: ["western-anime", "stickman-2d", "cinematico", "anime", "pixel-art", "stickman", "stickman-dark", "low-poly", "salud", "fantasia", "realista"].includes(project.visualStyle) || project.visualStyle === "custom-style" && (project.customStyle || styleReferences.length > 0) ? project.visualStyle : "western-anime",
    characterReference: (characterReference2 = project.characterReference) != null && characterReference2.url || (characterReference3 = project.characterReference) != null && characterReference3.base64 ? {
      url: resolveRefUrl(project.characterReference),
      name: project.characterReference.name || "personaje",
      base64: project.characterReference.base64 || "",
      mimeType: project.characterReference.mimeType || "image/jpeg",
      flowMediaId: project.characterReference.flowMediaId || ""
    } : null,
    styleReferences: styleReferences,
    audioTrack: (audioTrack = project.audioTrack) != null && audioTrack.url ? project.audioTrack : null,
    musicTrack: (musicTrack = project.musicTrack) != null && musicTrack.url ? project.musicTrack : null,
    captionTrack: {
      sourceName: ((captionTrack2 = project.captionTrack) == null ? undefined : captionTrack2.sourceName) || "",
      enabled: ((captionTrack3 = project.captionTrack) == null ? undefined : captionTrack3.enabled) !== !1,
      cues: Array.isArray((captionTrack4 = project.captionTrack) == null ? undefined : captionTrack4.cues) ? project.captionTrack.cues.map(cue => {
        const startMs = Number.isFinite(Number(cue.startMs)) ? Number(cue.startMs) : Number.isFinite(Number(cue.startSeconds)) ? Math.round(Number(cue.startSeconds) * 1000) : 0;
        const endMs = Number.isFinite(Number(cue.endMs)) ? Number(cue.endMs) : Number.isFinite(Number(cue.endSeconds)) ? Math.round(Number(cue.endSeconds) * 1000) : startMs + 2000;
        return {
          ...cue,
          id: cue.id || crypto.randomUUID(),
          startMs: startMs,
          endMs: endMs,
          startSeconds: startMs / 1000,
          endSeconds: endMs / 1000,
          text: String(cue.text || "").trim()
        };
      }).filter(cue => cue.endMs > cue.startMs && cue.text) : [],
      style: {
        ...na,
        ...(((captionTrack5 = project.captionTrack) == null ? undefined : captionTrack5.style) || {})
      }
    },
    overlays: Array.isArray(project.overlays) ? project.overlays.map((overlay, index) => ({
      id: overlay.id || "ovl-" + index + "-" + Date.now(),
      name: overlay.name || "Superposición " + (index + 1),
      imageUrl: overlay.imageUrl || "",
      startSeconds: Math.max(0, Number(overlay.startSeconds || 0)),
      durationSeconds: Math.max(0.5, Number(overlay.durationSeconds || 3)),
      scale: Math.max(0.1, Math.min(2, Number(overlay.scale !== undefined ? overlay.scale : 0.6))),
      position: overlay.position || "top-right",
      posX: Number(overlay.posX !== undefined ? overlay.posX : 75),
      posY: Number(overlay.posY !== undefined ? overlay.posY : 25),
      animation: overlay.animation || "pop",
      captionCueId: overlay.captionCueId || null
    })) : [],
    scenes: scenes
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
    } catch {}
    set({
      authUser: user || null,
      authToken: token || null
    });
  },
  updateAuthUser: patch => {
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
    } catch {}
    set({
      authUser: nextUser
    });
  },
  logout: () => {
    try {
      localStorage.removeItem("flowtube_auth_version");
      localStorage.removeItem("flowtube_user");
      localStorage.removeItem("flowtube_token");
    } catch {}
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
    return !0;
  }
}
function Rn(enabled) {
  try {
    localStorage.setItem(Va, String(!!enabled));
  } catch {}
}
const Dn = (set, get) => ({
  currentView: "dashboard",
  editorMode: typeof localStorage !== "undefined" && localStorage.getItem("flowtube_editor_mode") ? localStorage.getItem("flowtube_editor_mode") : "v5",
  setEditorMode: mode => {
    try {
      localStorage.setItem("flowtube_editor_mode", mode);
    } catch {}
    set({
      editorMode: mode
    });
  },
  toggleEditorMode: () => {
    const nextMode = get().editorMode === "v5" ? "classic" : "v5";
    try {
      localStorage.setItem("flowtube_editor_mode", nextMode);
    } catch {}
    set({
      editorMode: nextMode
    });
  },
  inspectorTab: "scene",
  autoTranscribeOnAudioUpload: Pn(),
  setAutoTranscribeOnAudioUpload: enabled => {
    Rn(enabled);
    set({
      autoTranscribeOnAudioUpload: !!enabled
    });
  },
  flowState: {
    connected: !1,
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
    running: !1,
    done: 0,
    total: 0,
    failures: [],
    message: ""
  },
  promptGenState: {
    running: !1,
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
  batchCancelled: !1,
  batchPaused: !1,
  promptGenCancelled: !1,
  activeTaskId: "",
  setBatchPaused: paused => set({
    batchPaused: paused
  }),
  setBatchCancelled: cancelled => set({
    batchCancelled: cancelled
  }),
  setInspectorTab: tab => set({
    inspectorTab: tab
  }),
  setCurrentView: view => set({
    currentView: view
  }),
  setFlowState: flowState => set({
    flowState: flowState
  }),
  setRenderState: updater => set(state => ({
    renderState: typeof updater == "function" ? updater(state.renderState) : {
      ...state.renderState,
      ...updater
    }
  })),
  setAssetState: updater => set(state => ({
    assetState: typeof updater == "function" ? updater(state.assetState) : {
      ...state.assetState,
      ...updater
    }
  })),
  setBatchState: updater => set(state => ({
    batchState: typeof updater == "function" ? updater(state.batchState) : {
      ...state.batchState,
      ...updater
    }
  })),
  setPromptGenState: updater => set(state => ({
    promptGenState: typeof updater == "function" ? updater(state.promptGenState) : {
      ...state.promptGenState,
      ...updater
    }
  })),
  setBatchStartScene: sceneNumber => set({
    batchStartScene: sceneNumber
  }),
  setBatchChunkSize: size => set({
    batchChunkSize: Math.max(1, Math.min(100, Number(size) || 20))
  }),
  setReferenceStatus: status => set({
    referenceStatus: status
  }),
  setIsHydrated: hydrated => set({
    isHydrated: hydrated
  }),
  setActivePanel: panel => set({
    activePanel: panel
  }),
  setActiveTaskId: taskId => set({
    activeTaskId: taskId
  }),
  cancelBatch: () => set({
    batchCancelled: !0,
    batchPaused: !1
  }),
  resetBatchCancel: () => set({
    batchCancelled: !1,
    batchPaused: !1
  }),
  pauseBatch: () => set({
    batchPaused: !0
  }),
  resumeBatch: () => set({
    batchPaused: !1
  }),
  cancelPromptGen: () => set({
    promptGenCancelled: !0
  }),
  resetPromptGenCancel: () => set({
    promptGenCancelled: !1
  })
});
const w = create((set, get) => {
  var firstScene;
  return {
    ...En(set, get),
    ...Dn(set, get),
    project: tt,
    selectedId: (firstScene = tt.scenes[0]) == null ? undefined : firstScene.id,
    selectedOverlayId: null,
    isHydrated: !1,
    past: [],
    future: [],
    pushHistory: () => {
      const {
        project: project,
        past: past
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
      var firstScene;
      const {
        past: past,
        project: project,
        future: future
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
        selectedId: previous.scenes.some(scene => scene.id === get().selectedId) ? get().selectedId : (firstScene = previous.scenes[0]) == null ? undefined : firstScene.id
      });
    },
    redo: () => {
      var firstScene;
      const {
        future: future,
        project: project,
        past: past
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
        selectedId: next.scenes.some(scene => scene.id === get().selectedId) ? get().selectedId : (firstScene = next.scenes[0]) == null ? undefined : firstScene.id
      });
    },
    updateProject: patch => {
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          ...patch
        }
      }));
    },
    setProject: project => set({
      project: project
    }),
    updateScene: (sceneId, patch) => {
      set(state => {
        const nextProject = {
          ...state.project,
          scenes: state.project.scenes.map(scene => scene.id === sceneId ? {
            ...scene,
            ...patch
          } : scene)
        };
        if (patch.imageUrl || patch.videoUrl) {
          Re(nextProject).catch(() => {});
        }
        return {
          project: nextProject
        };
      });
    },
    finishSceneOperation: (sceneId, operationId, patch) => {
      set(state => {
        const nextProject = {
          ...state.project,
          scenes: state.project.scenes.map(scene => scene.id !== sceneId ? scene : {
            ...scene,
            ...patch,
            operationId: ""
          })
        };
        if (patch != null && patch.imageUrl || patch != null && patch.videoUrl) {
          Re(nextProject).catch(() => {});
        }
        return {
          project: nextProject
        };
      });
    },
    setSelectedOverlayId: overlayId => set({
      selectedOverlayId: overlayId
    }),
    addOverlay: input => {
      get().pushHistory();
      const overlay = {
        id: crypto.randomUUID(),
        name: input.name || "Superposición",
        imageUrl: input.imageUrl || "",
        startSeconds: Math.max(0, Number(input.startSeconds || 0)),
        durationSeconds: Math.max(0.5, Number(input.durationSeconds || 3)),
        scale: Math.max(0.1, Math.min(2, Number(input.scale !== undefined ? input.scale : 0.6))),
        position: input.position || "top-right",
        posX: Number(input.posX !== undefined ? input.posX : 75),
        posY: Number(input.posY !== undefined ? input.posY : 25),
        animation: input.animation || "pop",
        captionCueId: input.captionCueId || null,
        ...input
      };
      set(state => {
        const nextProject = {
          ...state.project,
          overlays: [...(state.project.overlays || []), overlay]
        };
        Re(nextProject).catch(() => {});
        return {
          project: nextProject,
          selectedOverlayId: overlay.id
        };
      });
      return overlay;
    },
    updateOverlay: (overlayId, patch) => {
      get().pushHistory();
      set(state => {
        const nextProject = {
          ...state.project,
          overlays: (state.project.overlays || []).map(overlay => overlay.id === overlayId ? {
            ...overlay,
            ...patch
          } : overlay)
        };
        Re(nextProject).catch(() => {});
        return {
          project: nextProject
        };
      });
    },
    removeOverlay: overlayId => {
      get().pushHistory();
      set(state => {
        const nextProject = {
          ...state.project,
          overlays: (state.project.overlays || []).filter(overlay => overlay.id !== overlayId)
        };
        Re(nextProject).catch(() => {});
        return {
          project: nextProject,
          selectedOverlayId: state.selectedOverlayId === overlayId ? null : state.selectedOverlayId
        };
      });
    },
    importPromptList: ({
      prompts: promptsText,
      replace: replace = !0,
      defaultDuration: defaultDuration = 4,
      defaultMotion: defaultMotion = "gentle-zoom-in"
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
          title: title,
          prompt: promptText,
          duration: Math.max(1, Math.min(120, Number(defaultDuration) || 4)),
          motion: defaultMotion || "gentle-zoom-in",
          status: "idle"
        };
      });
      const scenes = replace ? newScenes : [...get().project.scenes, ...newScenes];
      set(state => {
        var firstScene;
        return {
          project: {
            ...state.project,
            scenes: scenes
          },
          selectedId: ((firstScene = newScenes[0]) == null ? undefined : firstScene.id) || state.selectedId
        };
      });
      Re(get().project).catch(() => {});
      return prompts.length;
    },
    applyPromptsToScenes: (promptsText, defaultDuration = 4, defaultMotion = "gentle-zoom-in") => {
      const prompts = ua(promptsText);
      if (!prompts.length) {
        return 0;
      }
      get().pushHistory();
      const {
        project: project
      } = get();
      const existingScenes = [...(project.scenes || [])];
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
      set(state => {
        var firstScene;
        return {
          project: {
            ...state.project,
            scenes: nextScenes
          },
          selectedId: ((firstScene = nextScenes[0]) == null ? undefined : firstScene.id) || state.selectedId
        };
      });
      Re(get().project).catch(() => {});
      return prompts.length;
    },
    syncPromptsWithSrt: ({
      prompts: promptsText,
      defaultMotion: defaultMotion = "gentle-zoom-in"
    }) => {
      var captionTrack;
      var audioTrack;
      const {
        project: project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      const timedCues = gt(cues, (audioTrack = project.audioTrack) == null ? undefined : audioTrack.durationMs);
      const promptLines = String(promptsText || "").split("\n").map(line => line.trim()).filter(line => line.length > 0);
      get().pushHistory();
      const scenes = timedCues.map((cue, index) => {
        const prompt = promptLines[index] || "";
        const firstWords = cue.text.split(" ").slice(0, 4).join(" ");
        const title = firstWords.length >= 2 ? firstWords : "Escena " + String(index + 1).padStart(2, "0");
        return {
          ...De(index),
          title: title,
          prompt: prompt,
          script: cue.text,
          caption: cue.text,
          duration: Math.max(1, Math.min(120, cue.duration || 4)),
          sourceStartMs: Math.round(cue.startMs),
          motion: defaultMotion || "gentle-zoom-in",
          status: "idle"
        };
      });
      set(state => {
        var firstScene;
        return {
          project: {
            ...state.project,
            scenes: scenes
          },
          selectedId: ((firstScene = scenes[0]) == null ? undefined : firstScene.id) || state.selectedId
        };
      });
    },
    assignImagesToScenes: imageUrls => {
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
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes
        }
      }));
    },
    autoApplyMotionGraphics: () => {
      const {
        project: project
      } = get();
      if (!project.scenes.length) {
        return;
      }
      get().pushHistory();
      const scenes = project.scenes.map((scene, index) => {
        const script = (scene.script || scene.caption || scene.title || "").trim();
        const text = script.toLowerCase();
        const durationMs = Math.round(Number(scene.duration || 4) * 1000);
        const isFirst = index === 0;
        const isLast = index === project.scenes.length - 1 && project.scenes.length > 2;
        const hasNumbers = /\d+|%|\$|millon|cien|mil|top/i.test(text);
        const hasWarning = /cuidado|atencion|peligro|error|nunca|alerta|ojo/i.test(text);
        const hasEmphasis = /importante|secreto|clave|impactante|increible|brutal/i.test(text);
        const graphics = [];
        let isStockMotion = scene.isStockMotion || !1;
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
            text: "¡SUSCRÍBETE PARA MÁS!",
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
            text: "¡ATENCIÓN A ESTO!",
            fromMs: 200,
            durationMs: Math.min(2400, durationMs - 300),
            position: "top",
            accentColor: "#f59e0b"
          });
        } else if (hasEmphasis) {
          const keyword = script.split(" ").find(word => word.length > 5) || "¡CLAVE!";
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
            durationMs: durationMs,
            position: "center",
            accentColor: "#8b5cf6"
          });
        }
        return {
          ...scene,
          isStockMotion: isStockMotion,
          graphics: graphics.length ? graphics : scene.graphics
        };
      });
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes,
          engine: "remotion"
        }
      }));
    },
    toggleStockMotion: sceneId => {
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          scenes: state.project.scenes.map(scene => scene.id === sceneId ? {
            ...scene,
            isStockMotion: !scene.isStockMotion
          } : scene)
        }
      }));
    },
    toggleSceneCharacter: sceneId => {
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          scenes: state.project.scenes.map(scene => scene.id === sceneId ? {
            ...scene,
            hasCharacter: scene.hasCharacter === !1
          } : scene)
        }
      }));
    },
    clearAllMotionGraphics: () => {
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          scenes: state.project.scenes.map(scene => ({
            ...scene,
            graphics: [],
            isStockMotion: !1
          }))
        }
      }));
    },
    addScene: () => {
      get().pushHistory();
      const scene = De(get().project.scenes.length);
      set(state => ({
        project: {
          ...state.project,
          scenes: [...state.project.scenes, scene]
        },
        selectedId: scene.id
      }));
    },
    removeScene: sceneId => {
      const {
        project: project
      } = get();
      if (project.scenes.length === 1) {
        return;
      }
      get().pushHistory();
      const sceneIndex = project.scenes.findIndex(scene => scene.id === sceneId);
      const filteredScenes = project.scenes.filter(scene => scene.id !== sceneId);
      set({
        project: {
          ...project,
          scenes: filteredScenes
        },
        selectedId: filteredScenes[Math.max(0, sceneIndex - 1)].id
      });
    },
    duplicateScene: sceneId => {
      const {
        project: project
      } = get();
      const scene = project.scenes.find(scene => scene.id === sceneId);
      if (!scene) {
        return;
      }
      get().pushHistory();
      const sceneIndex = project.scenes.findIndex(scene => scene.id === sceneId);
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
          scenes: scenes
        },
        selectedId: copy.id
      });
    },
    splitScene: (sceneId, ratio) => {
      const {
        project: project
      } = get();
      const sceneIndex = project.scenes.findIndex(scene => scene.id === sceneId);
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
          scenes: scenes
        },
        selectedId: secondHalf.id
      });
    },
    moveScene: (sceneId, offset) => {
      const scenes = [...get().project.scenes];
      const index = scenes.findIndex(scene => scene.id === sceneId);
      const targetIndex = index + offset;
      if (!(index < 0) && !(targetIndex < 0) && !(targetIndex >= scenes.length)) {
        get().pushHistory();
        [scenes[index], scenes[targetIndex]] = [scenes[targetIndex], scenes[index]];
        set(state => ({
          project: {
            ...state.project,
            scenes: scenes
          }
        }));
      }
    },
    toggleSceneImageVisibility: sceneId => {
      const {
        project: project,
        selectedId: selectedId
      } = get();
      const targetId = sceneId || selectedId;
      const scene = project.scenes.find(scene => scene.id === targetId);
      if (scene) {
        get().pushHistory();
        get().updateScene(targetId, {
          imageHidden: !scene.imageHidden
        });
      }
    },
    toggleSceneCharacter: sceneId => {
      const {
        project: project,
        selectedId: selectedId
      } = get();
      const targetId = sceneId || selectedId;
      const scene = project.scenes.find(scene => scene.id === targetId);
      if (scene) {
        get().pushHistory();
        get().updateScene(targetId, {
          hasCharacter: scene.hasCharacter === false
        });
      }
    },
    toggleStockMotion: sceneId => {
      const {
        project: project,
        selectedId: selectedId
      } = get();
      const targetId = sceneId || selectedId;
      const scene = project.scenes.find(scene => scene.id === targetId);
      if (scene) {
        get().pushHistory();
        get().updateScene(targetId, {
          isStockMotion: !scene.isStockMotion
        });
      }
    },
    setAuthUser: (user, token, persist = !0) => {
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
    setCurrentView: view => set({
      currentView: view
    }),
    setInspectorTab: tab => set({
      inspectorTab: tab
    }),
    setTransitionDefaults: patch => set(state => {
      var transitions4;
      var transitions5;
      return {
        project: {
          ...state.project,
          transitions: {
            ...state.project.transitions,
            ...patch,
            default: Dt.has(patch == null ? undefined : patch.default) && patch.default !== "inherit" ? patch.default : ((transitions4 = state.project.transitions) == null ? undefined : transitions4.default) || "fade",
            duration: Math.min(1, Math.max(0.1, Number((patch == null ? undefined : patch.duration) ?? ((transitions5 = state.project.transitions) == null ? undefined : transitions5.duration)) || 0.35))
          }
        }
      };
    }),
    applyTransitionToAll: transition => {
      const safeTransition = Dt.has(transition) && transition !== "inherit" ? transition : "none";
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          scenes: state.project.scenes.map(scene => ({
            ...scene,
            transition: safeTransition
          }))
        }
      }));
    },
    addSceneAt: (index = -1) => {
      get().pushHistory();
      const {
        project: project
      } = get();
      const scenes = [...project.scenes];
      const insertAt = index === -1 ? scenes.length : index;
      const scene = De(insertAt);
      scenes.splice(insertAt, 0, scene);
      const renumbered = scenes.map((scene, index) => ({
        ...scene,
        title: scene.title.startsWith("Escena ") ? "Escena " + (index + 1) : scene.title
      }));
      set(state => ({
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
      set(state => ({
        project: {
          ...state.project,
          scenes: [scene]
        },
        selectedId: scene.id
      }));
    },
    insertMediaOnTimeline: (afterSceneId, media) => {
      var prevScene;
      var firstScene;
      const mediaItems = Array.isArray(media) ? media.filter(media => (media == null ? undefined : media.url) && ["image", "video"].includes(media.kind)) : [];
      if (!mediaItems.length) {
        return;
      }
      get().pushHistory();
      const {
        project: project
      } = get();
      let scenes = [...project.scenes];
      if (scenes.every(scene => !scene.imageUrl && !scene.videoUrl && !scene.flowVideoUrl) && mediaItems.length > 0) {
        scenes = [];
      }
      const anchorIndex = scenes.findIndex(scene => scene.id === afterSceneId);
      let insertAt = anchorIndex >= 0 && !scenes[anchorIndex].imageUrl && !scenes[anchorIndex].videoUrl && !scenes[anchorIndex].flowVideoUrl ? anchorIndex : Math.max(0, anchorIndex + 1);
      let nextSelectedId = ((prevScene = scenes[Math.max(0, insertAt - 1)]) == null ? undefined : prevScene.id) || ((firstScene = scenes[0]) == null ? undefined : firstScene.id);
      for (const media of mediaItems) {
        const target = scenes[insertAt];
        const isEmptySlot = target && !target.imageUrl && !target.videoUrl && !target.flowVideoUrl;
        const base = isEmptySlot ? target : De(insertAt);
        const nextScene = {
          ...base,
          duration: media.duration ? Math.max(0.5, Number(media.duration)) : base.duration,
          imageUrl: media.kind === "image" ? media.url : "",
          videoUrl: media.kind === "video" ? media.url : "",
          flowVideoUrl: "",
          mediaId: "",
          sourceFormat: project.format,
          muted: !1,
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
      set(state => ({
        project: {
          ...state.project,
          scenes: renumbered
        },
        selectedId: nextSelectedId
      }));
    },
    duplicateScene: sceneId => {
      get().pushHistory();
      const {
        project: project
      } = get();
      const sceneIndex = project.scenes.findIndex(scene => scene.id === sceneId);
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
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes
        },
        selectedId: copy.id
      }));
    },
    removeScene: sceneId => {
      var firstScene;
      const {
        project: project,
        selectedId: selectedId
      } = get();
      if (project.scenes.length <= 1) {
        return;
      }
      get().pushHistory();
      const filteredScenes = project.scenes.filter(scene => scene.id !== sceneId);
      const nextSelectedId = selectedId === sceneId ? ((firstScene = filteredScenes[0]) == null ? undefined : firstScene.id) || null : selectedId;
      set(state => ({
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
        project: project
      } = get();
      const scenes = [...project.scenes];
      const [moved] = scenes.splice(fromIndex, 1);
      scenes.splice(toIndex, 0, moved);
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes
        }
      }));
    },
    createNewProjectWithFormat: (format = "short") => {
      var firstScene;
      const project = dt({
        ...tt,
        id: crypto.randomUUID(),
        title: format === "short" ? "Nuevo Short 9:16" : "Nuevo Video YouTube 16:9",
        format: format,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      set({
        project: project,
        selectedId: (firstScene = project.scenes[0]) == null ? undefined : firstScene.id,
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
          running: !1,
          done: 0,
          total: 0,
          failures: []
        }
      });
      Re(project).catch(() => {});
    },
    loadProjectFromList: raw => {
      var firstScene;
      const project = dt(raw);
      set({
        project: project,
        selectedId: (firstScene = project.scenes[0]) == null ? undefined : firstScene.id,
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
      Re(project).catch(() => {});
    },
    selectScene: sceneId => set({
      selectedId: sceneId
    }),
    updateCaptionStyle: patch => set(state => {
      var captionTrack;
      return {
        project: {
          ...state.project,
          captionTrack: {
            ...state.project.captionTrack,
            style: {
              ...na,
              ...((captionTrack = state.project.captionTrack) == null ? undefined : captionTrack.style),
              ...patch
            }
          }
        }
      };
    }),
    toggleCaptions: () => set(state => {
      var captionTrack;
      return {
        project: {
          ...state.project,
          captionTrack: {
            ...state.project.captionTrack,
            enabled: ((captionTrack = state.project.captionTrack) == null ? undefined : captionTrack.enabled) === !1
          }
        }
      };
    }),
    shiftCaptions: offsetMs => {
      var captionTrack;
      const {
        project: project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      get().pushHistory();
      const shifted = cues.map(cue => {
        const startMs = Math.max(0, Math.round(Number(cue.startMs) + offsetMs));
        const durationMs = Math.max(100, Math.round(Number(cue.endMs) - Number(cue.startMs)));
        const endMs = startMs + durationMs;
        const words = Array.isArray(cue.words) ? cue.words.map(word => ({
          ...word,
          startMs: Math.max(0, Math.round(Number(word.startMs) + offsetMs)),
          endMs: Math.max(0, Math.round(Number(word.endMs) + offsetMs))
        })) : undefined;
        return {
          ...cue,
          startMs: startMs,
          endMs: endMs,
          words: words
        };
      });
      set(state => ({
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
        project: project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      const minStart = Math.min(...cues.map(item => Number(item.startMs) || 0));
      get().shiftCaptions(-minStart);
    },
    scaleCaptionsToAudio: () => {
      var captionTrack;
      var audioTrack;
      const {
        project: project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) || [];
      const audioDurationMs = Number((audioTrack = project.audioTrack) == null ? undefined : audioTrack.durationMs) || 0;
      if (!cues.length || audioDurationMs <= 0) {
        return;
      }
      const minStart = Math.min(...cues.map(item => Number(item.startMs) || 0));
      const span = Math.max(...cues.map(item => Number(item.endMs) || 0)) - minStart;
      if (span <= 0) {
        return;
      }
      const scale = audioDurationMs / span;
      get().pushHistory();
      const scaled = cues.map(cue => {
        const relStart = Number(cue.startMs) - minStart;
        const relEnd = Number(cue.endMs) - minStart;
        const startMs = Math.round(relStart * scale);
        const endMs = Math.round(relEnd * scale);
        const words = Array.isArray(cue.words) && cue.words.length > 0 ? cue.words.map(word => {
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
          startMs: startMs,
          endMs: endMs,
          words: words
        };
      });
      set(state => ({
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
        project: project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      get().pushHistory();
      const timedCues = gt(cues, (audioTrack = project.audioTrack) == null ? undefined : audioTrack.durationMs);
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
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes
        }
      }));
    },
    syncCaptionsToScenes: () => {
      var captionTrack;
      const {
        project: project
      } = get();
      const cues = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) || [];
      if (!cues.length) {
        return;
      }
      get().pushHistory();
      let cursorMs = 0;
      const nextCues = cues.map((cue, index) => {
        const scene = project.scenes[index];
        const durationMs = scene ? Math.round(Number(scene.duration || 4) * 1000) : 4000;
        const startMs = cursorMs;
        const endMs = cursorMs + durationMs;
        cursorMs = endMs;
        return {
          ...cue,
          startMs: startMs,
          endMs: endMs
        };
      });
      set(state => ({
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
      set(state => {
        var captionTrack;
        const nextCues = (((captionTrack = state.project.captionTrack) == null ? undefined : captionTrack.cues) || []).map(cue => {
          if (cue.id !== cueId) {
            return cue;
          }
          const words = Kt(text, cue.startMs, cue.endMs);
          return {
            ...cue,
            text: text,
            words: words
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
    addGraphic: presetId => {
      const preset = Tn.find(item => item.id === presetId);
      const {
        project: project,
        selectedId: selectedId
      } = get();
      const scene = project.scenes.find(scene => scene.id === selectedId) || project.scenes[0];
      if (!!preset && !!scene) {
        get().updateScene(scene.id, {
          graphics: [...(scene.graphics || []), {
            id: crypto.randomUUID(),
            ...preset.default
          }]
        });
      }
    },
    updateGraphic: (graphicId, patch) => {
      const {
        project: project,
        selectedId: selectedId
      } = get();
      const scene = project.scenes.find(scene => scene.id === selectedId) || project.scenes[0];
      if (scene) {
        get().updateScene(scene.id, {
          graphics: (scene.graphics || []).map(graphic => graphic.id === graphicId ? {
            ...graphic,
            ...patch
          } : graphic)
        });
      }
    },
    removeGraphic: graphicId => {
      const {
        project: project,
        selectedId: selectedId
      } = get();
      const scene = project.scenes.find(scene => scene.id === selectedId) || project.scenes[0];
      if (scene) {
        get().updateScene(scene.id, {
          graphics: (scene.graphics || []).filter(graphic => graphic.id !== graphicId)
        });
      }
    },
    moveGraphicTimeline: ({
      graphicId: graphicId,
      newGlobalStartSeconds: newGlobalStartSeconds,
      newDurationSeconds: newDurationSeconds
    }) => {
      const {
        project: project
      } = get();
      let targetGraphic = null;
      for (const scene of project.scenes) {
        const graphic = (scene.graphics || []).find(graphic => graphic.id === graphicId);
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
        fromMs: Math.max(0, Math.round(localStart * 1000)),
        ...(newDurationSeconds ? {
          durationMs: Math.max(500, Math.round(newDurationSeconds * 1000))
        } : {})
      };
      get().pushHistory();
      const scenes = project.scenes.map(scene => {
        let graphics = (scene.graphics || []).filter(graphic => graphic.id !== graphicId);
        if (scene.id === targetScene.id) {
          graphics = [...graphics, movedGraphic];
        }
        return {
          ...scene,
          graphics: graphics
        };
      });
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes
        },
        selectedId: targetScene.id
      }));
    },
    randomizeMotions: () => {
      const {
        project: project
      } = get();
      const motions = ["gentle-zoom-in", "gentle-zoom-out", "pan-left", "pan-right", "pan-up", "pan-down", "drift-left-right", "drift-right-left", "cinematic-arc-left", "cinematic-arc-right", "soft-orbit-left", "soft-orbit-right", "zoom-pan-top-left", "zoom-pan-top-right", "zoom-pan-bottom-left", "zoom-pan-bottom-right", "breathe", "floating", "slow-drift"];
      get().pushHistory();
      const recent = [];
      const scenes = project.scenes.map(scene => {
        const available = motions.filter(motion => !recent.includes(motion));
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
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes
        }
      }));
    },
    clearAllMotionGraphics: () => {
      const {
        project: project
      } = get();
      get().pushHistory();
      const scenes = project.scenes.map(scene => ({
        ...scene,
        isStockMotion: !1,
        graphics: []
      }));
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes
        }
      }));
    },
    removeAudioTrack: () => {
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          audioTrack: null
        }
      }));
    },
    removeMusicTrack: () => {
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          musicTrack: null
        }
      }));
    },
    clearCaptions: () => {
      get().pushHistory();
      set(state => ({
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
        project: project
      } = get();
      get().pushHistory();
      const allStill = project.scenes.every(scene => scene.motion === "still");
      const motions = ["gentle-zoom-in", "gentle-zoom-out", "pan-left", "pan-right", "drift-left-right", "drift-right-left", "cinematic-arc-left", "cinematic-arc-right", "soft-orbit-left", "soft-orbit-right", "breathe", "floating", "slow-drift"];
      const recent = [];
      const scenes = project.scenes.map(scene => {
        if (allStill) {
          const available = motions.filter(motion => !recent.includes(motion));
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
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes
        }
      }));
      return !allStill;
    },
    resetMotionsStandard: () => {
      const {
        project: project
      } = get();
      get().pushHistory();
      const motions = ["gentle-zoom-in", "drift-left-right", "gentle-zoom-out", "drift-right-left"];
      const scenes = project.scenes.map((scene, index) => ({
        ...scene,
        motion: motions[index % motions.length]
      }));
      set(state => ({
        project: {
          ...state.project,
          scenes: scenes
        }
      }));
    },
    addStyleReference: input => {
      const {
        project: project
      } = get();
      const styleReferences = Array.isArray(project.styleReferences) ? project.styleReferences : [];
      if (styleReferences.length >= 3) {
        return;
      }
      const url = input.url && !input.url.startsWith("blob:") ? input.url : input.base64 ? "data:" + (input.mimeType || "image/jpeg") + ";base64," + input.base64 : input.url || "";
      const reference = {
        id: input.id || crypto.randomUUID(),
        url: url,
        name: input.name || "Referencia " + (styleReferences.length + 1),
        base64: input.base64 || "",
        mimeType: input.mimeType || "image/jpeg",
        flowMediaId: input.flowMediaId || "",
        enabled: !0
      };
      const nextRefs = [...styleReferences, reference].slice(0, 3);
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          styleReferences: nextRefs,
          customStyle: nextRefs[0] || null,
          visualStyle: "custom-style"
        },
        referenceStatus: "✓ Referencia de estilo agregada (" + nextRefs.length + "/3)"
      }));
    },
    removeStyleReference: referenceId => {
      const {
        project: project
      } = get();
      const nextRefs = (Array.isArray(project.styleReferences) ? project.styleReferences : []).filter(ref => ref.id !== referenceId);
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          styleReferences: nextRefs,
          customStyle: nextRefs[0] || null,
          visualStyle: nextRefs.length > 0 ? "custom-style" : state.project.visualStyle === "custom-style" ? "western-anime" : state.project.visualStyle
        },
        referenceStatus: nextRefs.length > 0 ? "Referencias activas: " + nextRefs.length + "/3" : "Referencias eliminadas"
      }));
    },
    toggleStyleReference: referenceId => {
      const {
        project: project
      } = get();
      const nextRefs = (Array.isArray(project.styleReferences) ? project.styleReferences : []).map(ref => ref.id === referenceId ? {
        ...ref,
        enabled: ref.enabled === !1
      } : ref);
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          styleReferences: nextRefs
        }
      }));
    },
    clearStyleReferences: () => {
      get().pushHistory();
      set(state => ({
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
        project: project
      } = get();
      if ((characterReference = project.characterReference) == null || !characterReference.url) {
        return;
      }
      const wasEnabled = project.characterReference.enabled !== !1;
      const nextReference = {
        ...project.characterReference,
        enabled: !wasEnabled
      };
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          characterReference: nextReference
        },
        referenceStatus: wasEnabled ? "Referencia pausada" : "Referencia activada"
      }));
    },
    setReferenceMode: mode => {
      var characterReference;
      const {
        project: project
      } = get();
      if ((characterReference = project.characterReference) == null || !characterReference.url) {
        return;
      }
      const nextReference = {
        ...project.characterReference,
        mode: mode
      };
      get().pushHistory();
      set(state => ({
        project: {
          ...state.project,
          characterReference: nextReference
        },
        referenceStatus: mode === "style-and-character" ? "Modo: Estilo Visual + Personaje" : "Modo: Solo Personaje"
      }));
    },
    hydrate: async () => {
      var firstScene;
      try {
        const activeProject = await _a();
        const project = dt(activeProject);
        set({
          project: project,
          selectedId: (firstScene = project.scenes[0]) == null ? undefined : firstScene.id,
          isHydrated: !0
        });
      } catch {
        set({
          isHydrated: !0
        });
      }
    },
    newProject: () => {
      var firstScene;
      const {
        project: project
      } = get();
      if (project.scenes.some(scene => scene.imageUrl || scene.videoUrl || scene.prompt) && !window.confirm("Crear un proyecto nuevo borra el actual. ¿Continuar?")) {
        return;
      }
      const nextProject = dt(tt);
      set({
        project: nextProject,
        selectedId: (firstScene = nextProject.scenes[0]) == null ? undefined : firstScene.id,
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
          running: !1,
          done: 0,
          total: 0,
          failures: []
        }
      });
      Re(nextProject).catch(() => {});
    },
    clearProject: async () => {
      var firstScene;
      if (!window.confirm("Borrar el proyecto actual y sus archivos locales del navegador. Esta accion no se puede deshacer. ¿Continuar?")) {
        return;
      }
      const project = dt(tt);
      set({
        project: project,
        selectedId: (firstScene = project.scenes[0]) == null ? undefined : firstScene.id,
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
          running: !1,
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
  const flowState = w(state => state.flowState);
  const currentView = w(state => state.currentView);
  const setCurrentView = w(state => state.setCurrentView);
  const authUser = w(state => state.authUser);
  const logout = w(state => state.logout);
  const hasActiveTasks = w(state => !!state.batchState.running || !!state.promptGenState.running || state.assetState.status === "loading" || state.renderState.status === "rendering");
  const handleClick = () => {
    var electronAPI;
    if ((electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
      window.electronAPI.openGoogleFlow();
    }
  };
  const openTaskCenter = panel => {
    window.dispatchEvent(new CustomEvent("flowtube:open-task-center", {
      detail: {
        panel: panel
      }
    }));
  };
  return <aside className="rail"><div className="logo" title="FLOWSTUDIO - Ir al Inicio" onClick={() => setCurrentView("dashboard")} style={{
      cursor: "pointer"
    }}>FT</div><button className={"rail-button " + (currentView === "dashboard" ? "active" : "")} title="Panel de Inicio & Proyectos (Dashboard)" onClick={() => setCurrentView("dashboard")}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></button><button className={"rail-button " + (currentView === "editor" ? "active" : "")} title="Editor de Video & Timeline (Studio)" onClick={() => setCurrentView("editor")}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /></svg></button><button className={"rail-button " + (currentView === "audio" ? "active" : "")} title="Estudio de Audio & Música IA (AI33.pro: Voces ElevenLabs, Diálogos, Suno AI, SFX)" onClick={() => setCurrentView("audio")} style={{
      color: currentView === "audio" ? "#fff" : "#a855f7"
    }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg></button><button className={"rail-button " + (currentView === "thumbnails" ? "active" : "")} title="Estudio de Miniaturas IA (4 Variantes de Alto CTR para YouTube)" onClick={() => setCurrentView("thumbnails")} style={{
      color: currentView === "thumbnails" ? "#fff" : "#f59e0b"
    }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg></button><div className="rail-spacer" /><button className="rail-button" title="Logs y actividad de procesos" aria-label="Abrir logs" onClick={() => openTaskCenter("logs")} style={{
      color: "#a7b1c4"
    }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /></svg></button><button className="rail-button" title={hasActiveTasks ? "Tareas: hay procesos activos" : "Centro de tareas"} aria-label="Abrir centro de tareas" onClick={() => openTaskCenter("tasks")} style={{
      color: hasActiveTasks ? "#78a4ff" : "#a7b1c4",
      position: "relative"
    }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>{hasActiveTasks ? <span aria-hidden="true" style={{
        position: "absolute",
        top: 6,
        right: 6,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#5b8cff",
        boxShadow: "0 0 8px rgba(91,140,255,.9)"
      }} /> : null}</button><button className="rail-button" title={"Cerrar Sesión (" + ((authUser == null ? undefined : authUser.username) || "Usuario") + ")"} onClick={() => {
      if (window.confirm("¿Cerrar sesión en FLOWSTUDIO?")) {
        logout();
      }
    }} style={{
      color: "#8a94a6",
      fontSize: 16
    }}>🚪</button><span className={"connection-dot " + (flowState.connected ? "online" : "")} title={flowState.connected ? "Google Flow: Conectado" : "Google Flow: Desconectado (Clic para conectar)"} onClick={handleClick} style={{
      cursor: "pointer"
    }} /></aside>;
};
const ba = [{
  value: "western-anime",
  label: "2D Cómic / Webtoon"
}, {
  value: "stickman-2d",
  label: "2D Infográfico editorial"
}, {
  value: "cinematico",
  label: "Cinemático realista"
}, {
  value: "anime",
  label: "Anime / Manga"
}, {
  value: "pixel-art",
  label: "Pixel Art 8-bit"
}, {
  value: "stickman",
  label: "Stickman clásico"
}, {
  value: "stickman-dark",
  label: "Stickman Dark"
}, {
  value: "low-poly",
  label: "Low Poly 3D"
}, {
  value: "salud",
  label: "Ilustración médica"
}, {
  value: "fantasia",
  label: "Fantasía épica"
}, {
  value: "realista",
  label: "Fotografía realista"
}];
const $n = ({
  onUploadCharacterReference: onUploadCharacterReference,
  onRemoveCharacterReference: onRemoveCharacterReference,
  onRenderVideo: onRenderVideo,
  onOpenAccountsModal: onOpenAccountsModal,
  onOpenMaintenance: onOpenMaintenance
}) => {
  var ba2;
  var customStyle;
  var audioTrack2;
  var audioTrack3;
  var captionTrack6;
  var cues4;
  var captionTrack7;
  var cues5;
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(!1);
  const [isMenuOpen, setIsMenuOpen] = React.useState(!1);
  const [updateInfo, setUpdateInfo] = React.useState(null);
  const settingsRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const authUser = w(state => state.authUser);
  const project = w(state => state.project);
  const renderState = w(state => state.renderState);
  const referenceStatus = w(state => state.referenceStatus);
  const updateProject = w(state => state.updateProject);
  const setCurrentView = w(state => state.setCurrentView);
  w(state => state.setInspectorTab);
  const flowState = w(state => state.flowState);
  w(state => state.editorMode);
  w(state => state.toggleEditorMode);
  React.useEffect(() => {
    if (!isSettingsOpen && !isMenuOpen) {
      return;
    }
    const handlePointerDown = event => {
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
    let cancelled = !1;
    const checkForUpdates = async () => {
      var updates;
      var electronAPI2;
      var electronAPI3;
      try {
        const updatesData = await fetch("/api/updates").then(response => response.ok ? response.json() : null).catch(() => null);
        const latestUpdate = (updates = updatesData == null ? undefined : updatesData.updates) == null ? undefined : updates[0];
        if (latestUpdate) {
          const appVersion = (electronAPI2 = window.electronAPI) != null && electronAPI2.getAppVersion ? await window.electronAPI.getAppVersion() : "1.8.5";
          if (latestUpdate.version && String(latestUpdate.version).localeCompare(String(appVersion), undefined, {
            numeric: !0
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
        const hasUpdate = latestVersion && latestVersion !== appVersion && latestVersion.localeCompare(String(appVersion), undefined, {
          numeric: !0
        }) > 0;
        if (!cancelled && hasUpdate) {
          setUpdateInfo({
            version: latestVersion,
            url: data.html_url || "https://github.com/nmediastudio/flowstudio-releases/releases"
          });
        }
      } catch {}
    };
    checkForUpdates();
    const timer = setInterval(checkForUpdates, 1800000);
    return () => {
      cancelled = !0;
      clearInterval(timer);
    };
  }, []);
  const addStyleReference = w(state => state.addStyleReference);
  const removeStyleReference = w(state => state.removeStyleReference);
  const styleReferences = Array.isArray(project.styleReferences) ? project.styleReferences : [];
  const [isStyleDragging, setIsStyleDragging] = React.useState(!1);
  const [isCharacterDragging, setIsCharacterDragging] = React.useState(!1);
  const resolveRefUrl = ref => ref ? ref.url && !ref.url.startsWith("blob:") ? ref.url : ref.base64 ? "data:" + (ref.mimeType || "image/jpeg") + ";base64," + ref.base64 : ref.url || "" : "";
  const uploadStyleReference = async file => {
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
      base64: base64,
      mimeType: mimeType
    });
  };
  const characterReference = project.characterReference;
  const label = ((ba2 = ba.find(ba => ba.value === project.visualStyle)) == null ? undefined : ba2.label) || (styleReferences.length > 0 ? "Estilo con " + styleReferences.length + " referencia" + (styleReferences.length > 1 ? "s" : "") : null) || ((customStyle = project.customStyle) == null ? undefined : customStyle.name) || "Estilo personalizado";
  const handleChange = async event => {
    var files;
    const file = (files = event.target.files) == null ? undefined : files[0];
    if (file) {
      await uploadStyleReference(file);
    }
    event.target.value = "";
  };
  const scenes = Array.isArray(project.scenes) ? project.scenes : [];
  scenes.length;
  scenes.filter(scene => scene.imageUrl || scene.videoUrl || scene.isStockMotion).length;
  scenes.filter(scene => (scene.prompt || "").trim().length > 0).length;
  if ((audioTrack2 = project.audioTrack) != null) {
    audioTrack2.url;
  }
  ((((audioTrack3 = project.audioTrack) == null ? undefined : audioTrack3.durationMs) || 0) / 1000).toFixed(1);
  if ((cues4 = (captionTrack6 = project.captionTrack) == null ? undefined : captionTrack6.cues) != null) {
    cues4.length;
  }
  if ((cues5 = (captionTrack7 = project.captionTrack) == null ? undefined : captionTrack7.cues) != null) {
    cues5.length;
  }
  return <header className="topbar"><div className="topbar-leading"><button className="topbar-back" onClick={() => setCurrentView("dashboard")} title="Volver a proyectos" aria-label="Volver a proyectos">‹</button><div className="topbar-title-block"><span>PROYECTO</span><input className="project-title" value={project.title} onChange={event => updateProject({
          title: event.target.value
        })} placeholder="Nombre del proyecto" /><small>{project.format === "short" ? "Vertical 9:16" : "Horizontal 16:9"} · {label}</small></div></div><div className="topbar-project-settings" ref={settingsRef}><button type="button" className={"topbar-settings-trigger " + (isSettingsOpen ? "active" : "")} onClick={() => setIsSettingsOpen(prev => !prev)} aria-expanded={isSettingsOpen}><span className="topbar-control-glyph">◆</span><span><b>Diseño del proyecto</b><small>Formato, estilo y personaje</small></span><i>{isSettingsOpen ? "▴" : "▾"}</i></button>{isSettingsOpen ? <div className="project-settings-popover"><div className="project-settings-head"><div><span>CONFIGURACIÓN VISUAL</span><strong>Diseño del proyecto</strong></div><button type="button" onClick={() => setIsSettingsOpen(!1)} aria-label="Cerrar configuración">×</button></div><div className="project-setting-section"><label>Formato del video</label><div className="format-switch"><button className={project.format === "short" ? "active" : ""} onClick={() => updateProject({
              format: "short"
            })}><b>9:16</b><span>Vertical</span></button><button className={project.format === "youtube" ? "active" : ""} onClick={() => updateProject({
              format: "youtube"
            })}><b>16:9</b><span>Horizontal</span></button></div></div><div className="project-setting-section"><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6
          }}><label htmlFor="visual-style" style={{
              margin: 0
            }}>Estilo visual & Referencias</label><span style={{
              fontSize: 11,
              color: "var(--text-muted)",
              fontWeight: 700
            }}>{styleReferences.length}/3 Referencias</span></div><select id="visual-style" className="form-select" value={project.visualStyle} onChange={event => updateProject({
            visualStyle: event.target.value
          })}>{ba.map(ba => <option value={ba.value} key={ba.value}>{ba.label}</option>)}{styleReferences.length > 0 ? <option value="custom-style">✨ Estilo con {styleReferences.length} Referencia{styleReferences.length > 1 ? "s" : ""}</option> : null}</select><div onDragOver={event => {
            event.preventDefault();
            event.stopPropagation();
            setIsStyleDragging(!0);
          }} onDragLeave={event => {
            event.preventDefault();
            event.stopPropagation();
            setIsStyleDragging(!1);
          }} onDrop={async event => {
            var dataTransfer;
            event.preventDefault();
            event.stopPropagation();
            setIsStyleDragging(!1);
            const filteredFrom = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).filter(from => {
              var type;
              if ((type = from.type) == null) {
                return undefined;
              } else {
                return type.startsWith("image/");
              }
            });
            for (const slice of filteredFrom.slice(0, 3 - styleReferences.length)) {
              await uploadStyleReference(slice);
            }
          }} style={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            border: isStyleDragging ? "2px dashed var(--foreground)" : "2px dashed transparent",
            borderRadius: "var(--radius-md)",
            padding: isStyleDragging ? 8 : 0,
            background: isStyleDragging ? "var(--accent)" : "transparent",
            transition: "all 0.15s ease"
          }}>{isStyleDragging && <div style={{
              textAlign: "center",
              padding: "10px 0",
              color: "var(--foreground)",
              fontWeight: 700,
              fontSize: 11.5
            }}>Suelta aquí las imágenes de estilo (máx 3)</div>}{styleReferences.map((item, index) => {
              const previewUrl = resolveRefUrl(item);
              return <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 10px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)"
              }} key={item.id || index}><img src={previewUrl} alt={item.name} style={{
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  objectFit: "cover"
                }} onError={event => {
                  if (item.base64) {
                    event.currentTarget.src = "data:" + (item.mimeType || "image/jpeg") + ";base64," + item.base64;
                  }
                }} /><div style={{
                  flex: 1,
                  minWidth: 0
                }}><div style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>{item.name || "Referencia " + (index + 1)}</div><div style={{
                    fontSize: 10,
                    color: "var(--text-muted)"
                  }}>Ref. #{index + 1} para Google Flow</div></div><button type="button" onClick={() => removeStyleReference(item.id)} style={{
                  background: "rgba(239,68,68,0.15)",
                  color: "#f87171",
                  border: "none",
                  borderRadius: 6,
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 900
                }} title="Eliminar referencia">×</button></div>;
            })}{styleReferences.length < 3 && !isStyleDragging && <label className="project-upload-button" style={{
              margin: 0
            }}><input type="file" accept="image/*" onChange={handleChange} /><span>＋</span> {styleReferences.length === 0 ? "Agregar o arrastrar imagen de estilo (máx 3)" : "＋ Agregar o arrastrar #" + (styleReferences.length + 1) + " (máx 3)"}</label>}</div></div><div className="project-setting-section"><label>Personaje de referencia (Avatar)</label><div onDragOver={event => {
            event.preventDefault();
            event.stopPropagation();
            setIsCharacterDragging(!0);
          }} onDragLeave={event => {
            event.preventDefault();
            event.stopPropagation();
            setIsCharacterDragging(!1);
          }} onDrop={event => {
            var dataTransfer;
            event.preventDefault();
            event.stopPropagation();
            setIsCharacterDragging(!1);
            const from = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).find(from => {
              var type;
              if ((type = from.type) == null) {
                return undefined;
              } else {
                return type.startsWith("image/");
              }
            });
            if (from) {
              if (onUploadCharacterReference != null) {
                onUploadCharacterReference(from);
              }
            }
          }} style={{
            border: isCharacterDragging ? "2px dashed var(--foreground)" : "2px dashed transparent",
            borderRadius: "var(--radius-md)",
            padding: isCharacterDragging ? 8 : 0,
            background: isCharacterDragging ? "var(--accent)" : "transparent",
            transition: "all 0.15s ease"
          }}>{isCharacterDragging && <div style={{
              textAlign: "center",
              padding: "10px 0",
              color: "var(--foreground)",
              fontWeight: 700,
              fontSize: 11.5
            }}>Suelta aquí la foto del Avatar / Personaje</div>}{resolveRefUrl(characterReference) ? <div className="reference-setting-row"><img src={resolveRefUrl(characterReference)} alt="Referencia del personaje" onError={event => {
                if (characterReference.base64) {
                  event.currentTarget.src = "data:" + (characterReference.mimeType || "image/jpeg") + ";base64," + characterReference.base64;
                }
              }} /><div><strong>Referencia activa</strong><small>{referenceStatus || "Se aplicará a las escenas con personaje"}</small></div><label className="compact-file-button"><input type="file" accept="image/*" onChange={event => {
                  var files;
                  return onUploadCharacterReference((files = event.target.files) == null ? undefined : files[0]);
                }} />Cambiar</label><button type="button" className="compact-danger-button" onClick={onRemoveCharacterReference}>Quitar</button></div> : !isCharacterDragging && <label className="reference-empty-button"><input type="file" accept="image/*" onChange={event => {
                var files;
                return onUploadCharacterReference((files = event.target.files) == null ? undefined : files[0]);
              }} /><span>＋</span><div><strong>Agregar o arrastrar personaje</strong><small>Arrastra una foto para consistencia de avatar</small></div></label>}</div></div></div> : null}</div><div className="topbar-right">{(!authUser || authUser.role === "guest" || authUser.isLicensed === !1 || authUser.licenseExpiresAt && authUser.licenseExpiresAt < Date.now()) && <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-activation-modal", {
        detail: {
          reason: "Desbloquea o renueva todas las funciones de IA y exportación"
        }
      }))} style={{
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
      }} title="Haz clic para activar o renovar tu clave de licencia FLOWSTUDIO"><span>🔑</span><span>{authUser != null && authUser.licenseExpiresAt && authUser.licenseExpiresAt < Date.now() ? "Renovar Licencia" : "Activar Licencia VIP"}</span></button>}{updateInfo ? <button type="button" className="topbar-chip-update" onClick={() => window.dispatchEvent(new CustomEvent("open-auto-update-modal", {
        detail: updateInfo
      }))} title="Hay una nueva versión disponible. Haz clic para actualizar en segundo plano" style={{
        cursor: "pointer",
        border: "none"
      }}>🚀 Nueva versión {updateInfo.version}</button> : null}<button className="topbar-utility-button" onClick={onOpenMaintenance} title="Almacenamiento, registros y copias">Herramientas</button><button className={"flow-connection-button " + (flowState.connected ? "online" : "")} onClick={onOpenAccountsModal}><i /><span><b>Google Flow</b><small>{flowState.connected ? "Cuenta conectada" : "Conectar cuenta"}</small></span></button><button className="render-button" onClick={() => {
        if (renderState.status === "rendering") {
          window.dispatchEvent(new CustomEvent("open-render-modal"));
        } else {
          onRenderVideo();
        }
      }} title={renderState.status === "rendering" ? "Haz clic para ver el visor de progreso del render" : "Exportar video MP4"}>{renderState.status === "rendering" ? <jsxRuntime.Fragment><span className="working" /> Renderizando 👁️</jsxRuntime.Fragment> : <jsxRuntime.Fragment>Exportar <span>MP4</span></jsxRuntime.Fragment>}</button></div></header>;
};
const _Component11 = () => {
  const [appVersion, setAppVersion] = React.useState("1.8.5");
  React.useEffect(() => {
    var electronAPI;
    var getAppVersion;
    if ((getAppVersion = (electronAPI = window.electronAPI) == null ? undefined : electronAPI.getAppVersion) != null) {
      getAppVersion.call(electronAPI).then(result => setAppVersion(result || "1.8.5")).catch(() => {});
    }
  }, []);
  return <footer className="support-footer" aria-label="Soporte FLOWSTUDIO"><span>FLOWSTUDIO {appVersion}</span><span className="support-footer-separator">·</span><a href="https://t.me/Oxdailyy" target="_blank" rel="noreferrer">Soporte Telegram</a><span className="support-footer-separator">·</span><a href="https://t.me/+4jBsXihcFv01NjJh" target="_blank" rel="noreferrer">Grupo de la comunidad</a></footer>;
};
const zn = (motion, frame, durationInFrames, customMotion = null) => {
  const progress = Math.max(0, Math.min(1, frame / Math.max(1, durationInFrames - 1)));
  const eased = Easing.bezier(0.42, 0, 0.58, 1)(progress);
  const lerp = (from, to, t = eased) => from + (to - from) * t;
  const toTransform = ({
    scale: scale = 1.08,
    x: x = 0,
    y: y = 0,
    rotation: rotation = 0
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
    case "soft-orbit-left":
      {
        const angle = Math.PI * (0.1 + eased * 1.25);
        return toTransform({
          scale: 1.13,
          x: Math.cos(angle) * 2.15,
          y: Math.sin(angle) * 1.15,
          rotation: lerp(0.45, -0.45)
        });
      }
    case "soft-orbit-right":
      {
        const angle = Math.PI * (0.9 - eased * 1.25);
        return toTransform({
          scale: 1.13,
          x: Math.cos(angle) * 2.15,
          y: Math.sin(angle) * 1.15,
          rotation: lerp(-0.45, 0.45)
        });
      }
    case "breathe":
      {
        const pulse = (1 - Math.cos(Math.PI * 4 * eased)) / 2;
        return toTransform({
          scale: 1.045 + pulse * 0.025,
          y: Math.cos(Math.PI * 4 * eased) * 0.16
        });
      }
    case "floating":
      {
        const angle = Math.PI * 2 * eased;
        return toTransform({
          scale: 1.11 + (1 - Math.cos(angle)) * 0.008,
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
const _Component = () => <AbsoluteFill style={{
  backgroundColor: "#0d0e12",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}}><div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    opacity: 0.3,
    color: "#ffffff"
  }}><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg><span style={{
      fontFamily: "'Geist Variable', system-ui, -apple-system, sans-serif",
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: "0.04em"
    }}>Sin Imagen</span></div></AbsoluteFill>;
const On = ({
  scene: scene,
  durationInFrames: durationInFrames,
  fps: fps,
  transition: transition = "none",
  transitionSeconds: transitionSeconds = 0.35,
  hasPrevious: hasPrevious = !1,
  hasNext: hasNext = !1
}) => {
  const frame = useCurrentFrame();
  const isHidden = !!scene.imageHidden || !!scene.hidden;
  const isStockMotion = scene.isStockMotion || (scene.graphics || []).some(graphic => graphic.preset === "stock-motion-card");
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
  return <AbsoluteFill style={{
    backgroundColor: "#000000",
    overflow: "hidden",
    ...transitionStyle
  }}>{isHidden ? <AbsoluteFill style={{
      backgroundColor: "#000000"
    }} /> : isStockMotion ? <_Component frame={frame} durationInFrames={durationInFrames} fps={fps} /> : imageUrl ? videoUrl ? <jsxRuntime.Fragment><RemotionVideo src={imageUrl} muted={!0} style={mediaStyle} onError={error => {
        console.warn("Video playback warning:", error);
      }} />{scene.muted ? null : <RemotionAudio src={imageUrl} volume={scene.videoVolume !== undefined ? Number(scene.videoVolume) : scene.volume !== undefined ? Number(scene.volume) : 1} />}</jsxRuntime.Fragment> : <RemotionImg src={imageUrl} style={mediaStyle} /> : <_Component frame={frame} durationInFrames={durationInFrames} fps={fps} />}{scene.caption && !scene._skipLegacyCaption ? <div style={{
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
    }}>{scene.caption}</div> : null}</AbsoluteFill>;
};
const Fn = ({
  cues: cues,
  fps: fps,
  style: style
}) => {
  const currentMs = useCurrentFrame() / fps * 1000;
  const activeCues = (cues || []).filter(cue => {
    const startMs = Number(cue.startMs ?? Number(cue.startSeconds || 0) * 1000);
    const endMs = Number(cue.endMs ?? Number(cue.endSeconds || 0) * 1000);
    return currentMs >= startMs && currentMs < endMs;
  });
  if (!activeCues.length) {
    return null;
  }
  const position = (style == null ? undefined : style.position) || "bottom";
  const value25 = Number((style == null ? undefined : style.posY) ?? (position === "top" ? 12 : position === "center" ? 50 : 84));
  const animation = (style == null ? undefined : style.animation) || "soft-scale";
  const wordByWord = (style == null ? undefined : style.wordByWord) !== !1;
  const wordHighlightEnabled = (style == null ? undefined : style.wordHighlight) !== !1;
  const highlightColor = (style == null ? undefined : style.highlightColor) || "#d7ff4f";
  const outlineColor = (style == null ? undefined : style.outlineColor) || "#08090d";
  const value26 = Number((style == null ? undefined : style.outlineWidth) ?? 5);
  const value27 = Number((style == null ? undefined : style.glow) ?? 20);
  const joined = value26 > 0 ? [value26 + "px 0 0 " + outlineColor, "-" + value26 + "px 0 0 " + outlineColor, "0 " + value26 + "px 0 " + outlineColor, "0 -" + value26 + "px 0 " + outlineColor, Math.round(value26 * 0.72) + "px " + Math.round(value26 * 0.72) + "px 0 " + outlineColor, "-" + Math.round(value26 * 0.72) + "px " + Math.round(value26 * 0.72) + "px 0 " + outlineColor, Math.round(value26 * 0.72) + "px -" + Math.round(value26 * 0.72) + "px 0 " + outlineColor, "-" + Math.round(value26 * 0.72) + "px -" + Math.round(value26 * 0.72) + "px 0 " + outlineColor].join(", ") : "";
  const containerStyle = {
    position: "absolute",
    left: "4%",
    right: "4%",
    top: value25 + "%",
    transform: "translateY(-50%)",
    zIndex: 20,
    color: (style == null ? undefined : style.color) || "#ffffff",
    fontFamily: (style == null ? undefined : style.fontFamily) || "'Inter', Arial, sans-serif",
    fontSize: Number((style == null ? undefined : style.fontSize) || 54),
    fontWeight: Number((style == null ? undefined : style.fontWeight) || 900),
    lineHeight: 1.24,
    textAlign: "center",
    letterSpacing: Number((style == null ? undefined : style.letterSpacing) ?? 0) + "px",
    textTransform: style != null && style.uppercase ? "uppercase" : "none",
    textShadow: [joined, value27 > 0 ? "0 0 " + value27 + "px rgba(0,0,0,.85)" : ""].filter(Boolean).join(",")
  };
  return <AbsoluteFill style={{
    pointerEvents: "none"
  }}><div style={containerStyle}>{activeCues.map((cue, index) => {
        const startMs = Number(cue.startMs ?? Number(cue.startSeconds || 0) * 1000);
        const endMs = Number(cue.endMs ?? Number(cue.endSeconds || 0) * 1000);
        const value28 = Math.max(100, endMs - startMs);
        const value29 = Math.max(0, currentMs - startMs);
        const value30 = Math.min(1, value29 / value28);
        const value31 = Math.max(0, Math.round(value29 / 1000 * fps));
        const filteredSplit = String(cue.text || "").split(/\s+/).filter(Boolean);
        const isArray = Array.isArray(cue.words) && cue.words.length > 0;
        const words = isArray ? cue.words.map(word => typeof word == "string" ? word : word.word || "") : filteredSplit;
        const length = words.length;
        let wordIndex = -1;
        if (isArray) {
          wordIndex = cue.words.findIndex(word => {
            const startMs = Number(word.startMs ?? Number(word.startSeconds || 0) * 1000);
            const endMs = Number(word.endMs ?? Number(word.endSeconds || 0) * 1000);
            return currentMs >= startMs && currentMs < endMs;
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
        const value32 = Number((style == null ? undefined : style.maxWordsPerScreen) || 0);
        let displayWords = words;
        let displayWordIndex = wordIndex;
        if (value32 > 0 && words.length > value32) {
          const value33 = Math.ceil(words.length / value32);
          const groupStartIndex = (wordIndex >= 0 ? Math.min(value33 - 1, Math.floor(wordIndex / value32)) : Math.min(value33 - 1, Math.floor(value30 * value33))) * value32;
          const length = Math.min(words.length, groupStartIndex + value32);
          displayWords = words.slice(groupStartIndex, length);
          displayWordIndex = wordIndex >= 0 ? wordIndex - groupStartIndex : -1;
        }
        wordIndex = displayWordIndex;
        if (animation === "viral-yellow-pop") {
          const activeColor = highlightColor;
          return <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.32em",
            maxWidth: "96%",
            margin: "0 auto",
            textTransform: "uppercase",
            fontFamily: (style == null ? undefined : style.fontFamily) || "'Montserrat', 'Impact', 'Arial Black', Arial, sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.5px",
            lineHeight: 1.15
          }} key={cue.id || index}>{displayWords.map((item, index) => {
              const isActiveWord = index === wordIndex;
              const startMs = isArray && cue.words[index] ? Number(cue.words[index].startMs) : Number(cue.startMs) + index / Math.max(1, displayWords.length) * value28;
              const value34 = Math.max(0, Math.round((startMs - Number(cue.startMs)) / 1000 * fps));
              const value35 = Math.max(0, value31 - value34);
              const springValue = spring({
                frame: value35,
                fps: fps,
                config: {
                  damping: 13,
                  stiffness: 185,
                  mass: 0.4
                }
              });
              const scaleValue = isActiveWord ? 1.08 + springValue * 0.08 : 1;
              const translateYValue = isActiveWord ? springValue * -3 : 0;
              return <span style={{
                display: "inline-block",
                transform: "translateY(" + translateYValue + "px) scale(" + scaleValue + ")",
                color: isActiveWord ? activeColor : "#ffffff",
                WebkitTextStroke: Math.max(3.5, value26) + "px #000000",
                paintOrder: "stroke fill",
                textShadow: isActiveWord ? "0 0 20px " + activeColor + "aa, 0 4px 12px #000000, 0 8px 24px rgba(0,0,0,0.9)" : "0 4px 12px #000000, 0 8px 24px rgba(0,0,0,0.9)",
                fontWeight: 900
              }} key={index}>{item}</span>;
            })}</div>;
        }
        const joined2 = displayWords.join(" ");
        if (animation === "soft-scale" || animation === "pop-up") {
          const springValue = spring({
            frame: value31,
            fps: fps,
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
          const value36 = Math.max(6, Math.round(value28 / 1000 * fps));
          const opacityValue = interpolate(value31, [0, 5, Math.max(6, value36 - 5), value36], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp"
          });
          const transformValue = animation === "soft-scale" ? "scale(" + (0.94 + springValue * 0.06) + ")" : "translateY(" + (1 - springValue) * 24 + "px) scale(" + (0.92 + springValue * 0.08) + ")";
          if (wordByWord) {
            return <div style={{
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.28em",
              opacity: opacityValue,
              transform: transformValue
            }} key={cue.id || index}>{displayWords.map((item, index) => {
                const startMs = isArray && cue.words[index] ? Number(cue.words[index].startMs) : Number(cue.startMs) + index / Math.max(1, displayWords.length) * value28;
                const value37 = Math.max(0, Math.round((startMs - Number(cue.startMs)) / 1000 * fps));
                const wordSpring = spring({
                  frame: Math.max(0, value31 - value37),
                  fps: fps,
                  config: {
                    damping: 20,
                    stiffness: 110,
                    mass: 0.7
                  }
                });
                const isActiveWord = index === wordIndex;
                return <span style={{
                  display: "inline-block",
                  opacity: value31 < value37 ? 0 : 1,
                  transform: "translateY(" + (1 - wordSpring) * (animation === "pop-up" ? 16 : 8) + "px) scale(" + (isActiveWord ? 1.08 : 1) + ")",
                  color: isActiveWord ? highlightColor : "#ffffff",
                  textShadow: isActiveWord ? "0 0 " + value27 + "px " + highlightColor + ", " + joined : joined
                }} key={index}>{item}</span>;
              })}</div>;
          } else {
            return <div style={{
              display: "inline-block",
              opacity: opacityValue,
              transform: transformValue,
              padding: "5px 12px",
              textShadow: joined
            }} key={cue.id || index}>{joined2}</div>;
          }
        }
        if (animation === "claude-kinetic-reveal") {
          const activeColor = highlightColor;
          return <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "baseline",
            gap: "0.3em",
            maxWidth: "94%",
            margin: "0 auto",
            lineHeight: 1.25
          }} key={cue.id || index}>{displayWords.map((item, index) => {
              let startMs = 0;
              if (isArray && cue.words[index]) {
                startMs = Number(cue.words[index].startMs);
              } else {
                const wordRatio = index / Math.max(1, displayWords.length);
                startMs = Number(cue.startMs) + wordRatio * value28;
              }
              const value38 = Math.max(0, Math.round((startMs - Number(cue.startMs)) / 1000 * fps));
              const wordFrame = value31 - value38;
              if (wordFrame < 0) {
                return null;
              }
              const translateYValue = (1 - spring({
                frame: wordFrame,
                fps: fps,
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
              const isActiveWord = index === wordIndex;
              const wiggleOffset = isActiveWord ? Math.sin(wordFrame / fps * 5) * 3 + 14 : 0;
              return <span style={{
                display: "inline-block",
                transform: "translateY(" + translateYValue + "px) scale(" + (isActiveWord ? 1.04 : 1) + ")",
                opacity: opacityValue,
                color: isActiveWord ? activeColor : "#ffffff",
                textShadow: isActiveWord ? "0 0 " + wiggleOffset + "px " + activeColor + ", 0 2px 10px rgba(0,0,0,0.8), " + joined : joined,
                fontWeight: 900
              }} key={index}>{item}</span>;
            })}</div>;
        }
        if (animation === "char-slide-highlight") {
          let charCounter = 0;
          const value39 = wordIndex !== -1 ? wordIndex : Math.floor(displayWords.length / 2);
          return <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.32em"
          }} key={cue.id || index}>{displayWords.map((item, index) => {
              const isActiveWord = index === value39 || wordIndex !== -1 && index === wordIndex;
              const parts = String(item).split("");
              const element = <span style={{
                display: "inline-flex",
                transform: isActiveWord ? "scale(1.08)" : "scale(1)",
                color: isActiveWord ? highlightColor : "#ffffff",
                textShadow: isActiveWord ? "0 0 26px " + highlightColor + ", " + joined : joined
              }} key={index}>{parts.map((item, index) => {
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
                  return <span style={{
                    display: "inline-block",
                    transform: "translateY(" + charTranslateY + "px)",
                    opacity: charOpacity
                  }} key={index}>{item}</span>;
                })}</span>;
              charCounter++;
              return element;
            })}</div>;
        }
        if (animation === "karaoke") {
          return <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.28em"
          }} key={cue.id || index}>{displayWords.map((item, index) => {
              const isActiveWord = index === wordIndex;
              const isPastWord = wordIndex !== -1 && index < wordIndex;
              return <span style={{
                color: isActiveWord ? highlightColor : isPastWord ? "#ffffff" : "rgba(255,255,255,0.72)",
                transform: isActiveWord ? "scale(1.14)" : "scale(1)",
                display: "inline-block",
                textShadow: isActiveWord ? "0 0 24px " + highlightColor + ", " + joined : joined
              }} key={index}>{item}</span>;
            })}</div>;
        }
        if (animation === "hormozi-pill") {
          return <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.32em"
          }} key={cue.id || index}>{displayWords.map((item, index) => {
              const isActiveWord = index === wordIndex;
              return <span style={{
                display: "inline-block",
                padding: isActiveWord ? "3px 12px" : "3px 0",
                background: isActiveWord ? highlightColor : "transparent",
                color: isActiveWord ? "#060709" : "#ffffff",
                borderRadius: 10,
                transform: isActiveWord ? "scale(1.12) rotate(-1.5deg)" : "scale(1)",
                boxShadow: isActiveWord ? "0 6px 20px rgba(0,0,0,0.6), 0 0 16px " + highlightColor : "none",
                textShadow: isActiveWord ? "none" : joined,
                fontWeight: 900
              }} key={index}>{item}</span>;
            })}</div>;
        }
        if (animation === "hormozi") {
          const springValue = spring({
            frame: value31,
            fps: fps,
            config: {
              damping: 11,
              stiffness: 160
            }
          });
          return <div style={{
            display: "inline-block",
            transform: "scale(" + (0.7 + springValue * 0.3) + ") rotate(" + (value31 % 2 === 0 ? -1.5 : 1.5) + "deg)",
            padding: "10px 28px",
            background: "#000000",
            borderRadius: 16,
            border: "3.5px solid " + highlightColor,
            boxShadow: "0 10px 36px rgba(0,0,0,0.85), 0 0 24px " + highlightColor + "66",
            color: highlightColor
          }} key={cue.id || index}>{joined2}</div>;
        }
        if (animation === "word-underline") {
          return <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.3em"
          }} key={cue.id || index}>{displayWords.map((item, index) => {
              const isActiveWord = index === wordIndex;
              const startMs = isArray && cue.words[index] ? Number(cue.words[index].startMs) : Number(cue.startMs) + index / Math.max(1, displayWords.length) * value28;
              const wordFrame = (currentMs - startMs) / 1000 * fps;
              const underlineWidth = isActiveWord ? interpolate(wordFrame, [0, 7], [0, 100], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1)
              }) : 0;
              return <span style={{
                position: "relative",
                display: "inline-block",
                color: isActiveWord ? highlightColor : "#fff",
                textShadow: joined
              }} key={index}>{item}<span style={{
                  position: "absolute",
                  left: 0,
                  bottom: -5,
                  width: underlineWidth + "%",
                  height: Math.max(3, Math.round(Number((style == null ? undefined : style.fontSize) || 54) * 0.08)),
                  borderRadius: 8,
                  background: highlightColor,
                  boxShadow: "0 0 12px " + highlightColor
                }} /></span>;
            })}</div>;
        }
        if (animation === "minimal-lower-third") {
          const opacityValue = interpolate(value30, [0, 0.14, 0.88, 1], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.4, 0, 1, 1)]
          });
          return <div style={{
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
          }} key={cue.id || index}><span style={{
              width: 6,
              alignSelf: "stretch",
              borderRadius: 8,
              background: highlightColor,
              boxShadow: "0 0 14px " + highlightColor
            }} /><span>{joined2}</span></div>;
        }
        if (animation === "documentary-serif") {
          const opacityValue = interpolate(value30, [0, 0.16, 0.86, 1], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.4, 0, 1, 1)]
          });
          return <div style={{
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
          }} key={cue.id || index}>{joined2}</div>;
        }
        if (animation === "typewriter") {
          const value41 = Math.ceil(interpolate(value30, [0, 0.7], [0, String(joined2).length], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.quad)
          }));
          const cursorVisible = Math.floor(value31 / Math.max(1, Math.round(fps * 0.28))) % 2 === 0;
          return <div style={{
            display: "inline-block",
            padding: "10px 18px",
            fontFamily: "'Courier New', monospace",
            background: "rgba(3,7,12,.76)",
            borderRadius: 10,
            color: "#f8fafc",
            textAlign: "left",
            textShadow: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,.5)"
          }} key={cue.id || index}>{String(joined2).slice(0, value41)}<span style={{
              color: highlightColor,
              opacity: cursorVisible ? 1 : 0
            }}>▌</span></div>;
        }
        if (animation === "boxed-modern") {
          const opacityValue = interpolate(value30, [0, 0.13, 0.9, 1], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.4, 0, 1, 1)]
          });
          return <div style={{
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
          }} key={cue.id || index}>{joined2}<span style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: opacityValue * 100 + "%",
              height: 6,
              background: highlightColor
            }} /></div>;
        }
        if (animation === "gradient-pop") {
          const springValue = spring({
            frame: value31,
            fps: fps,
            config: {
              damping: 24,
              stiffness: 90,
              mass: 0.8
            }
          });
          return <div style={{
            display: "inline-block",
            padding: "6px 16px",
            background: "linear-gradient(105deg, #ffffff 5%, " + highlightColor + " 48%, #a78bfa 95%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,.82)) drop-shadow(0 0 " + (8 + springValue * 10) + "px " + highlightColor + "66)",
            scale: String(0.94 + springValue * 0.06),
            translate: "0 " + (1 - springValue) * 18 + "px"
          }} key={cue.id || index}>{joined2}</div>;
        }
        if (animation === "word-zoom") {
          return <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.32em"
          }} key={cue.id || index}>{displayWords.map((item, index) => {
              const isActiveWord = index === wordIndex;
              return <span style={{
                display: "inline-block",
                color: isActiveWord ? highlightColor : "#ffffff",
                opacity: isActiveWord ? 1 : 0.45,
                transform: isActiveWord ? "scale(1.26)" : "scale(0.96)",
                filter: isActiveWord ? "none" : "blur(1px)",
                textShadow: isActiveWord ? "0 0 30px " + highlightColor + ", " + joined : joined
              }} key={index}>{item}</span>;
            })}</div>;
        }
        if (animation === "kinetic-stagger") {
          return <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.28em"
          }} key={cue.id || index}>{displayWords.map((item, index) => {
              const staggerDelay = index * 2.5;
              const springValue = spring({
                frame: Math.max(0, value31 - staggerDelay),
                fps: fps,
                config: {
                  damping: 12,
                  stiffness: 150
                }
              });
              const isActiveWord = index === wordIndex;
              return <span style={{
                display: "inline-block",
                transform: "translateY(" + (1 - springValue) * 30 + "px) scale(" + (0.5 + springValue * 0.5) + ")",
                opacity: springValue,
                color: isActiveWord ? highlightColor : "#ffffff",
                textShadow: isActiveWord ? "0 0 24px " + highlightColor + ", " + joined : joined
              }} key={index}>{item}</span>;
            })}</div>;
        }
        if (animation === "wave-jump") {
          return <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.28em"
          }} key={cue.id || index}>{displayWords.map((item, index) => {
              const waveOffset = Math.sin(value31 * 0.28 + index * 0.7) * 10;
              const isActiveWord = index === wordIndex;
              return <span style={{
                display: "inline-block",
                transform: "translateY(" + (waveOffset + (isActiveWord ? -12 : 0)) + "px) scale(" + (isActiveWord ? 1.18 : 1) + ")",
                color: isActiveWord ? highlightColor : "#ffffff",
                textShadow: isActiveWord ? "0 0 24px " + highlightColor + ", " + joined : joined
              }} key={index}>{item}</span>;
            })}</div>;
        }
        if (animation === "cyber-glitch") {
          const glitchOffset = value31 % 8 === 0 ? Math.sin(value31 * 12.9898) * 2 : 0;
          return <div style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            transform: "translateX(" + glitchOffset + "px)",
            color: "#00f0ff",
            textShadow: "2px 2px 0 #ff003c, -2px -2px 0 #00f0ff, 0 0 20px #00f0ff, " + joined,
            letterSpacing: "0.05em"
          }} key={cue.id || index}>{joined2}</div>;
        }
        if (animation === "fire-glow") {
          const glowRadius = Math.sin(value31 * 0.5) * 12 + 22;
          return <div style={{
            background: "linear-gradient(180deg, #fff7ed 0%, #fbbf24 45%, #ef4444 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 " + glowRadius + "px #f97316) drop-shadow(0 0 " + glowRadius * 1.5 + "px #dc2626)"
          }} key={cue.id || index}>{joined2}</div>;
        }
        if (animation === "slide") {
          const translateYValue = interpolate(value30, [0, 0.15], [30, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic)
          });
          const opacityValue = interpolate(value30, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
          return <div style={{
            transform: "translateY(" + translateYValue + "px)",
            opacity: opacityValue
          }} key={cue.id || index}>{joined2}</div>;
        }
        if (animation === "cinematic-fade") {
          const opacityValue = interpolate(value30, [0, 0.1, 0.9, 1], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp"
          });
          return <div style={{
            opacity: opacityValue,
            padding: "8px 24px",
            background: "rgba(5, 7, 12, 0.75)",
            borderRadius: 12,
            backdropFilter: "blur(12px)",
            display: "inline-block",
            color: "#f8fafc",
            fontWeight: 700,
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
          }} key={cue.id || index}>{joined2}</div>;
        }
        return <div style={{
          marginBottom: "0.4em"
        }} key={cue.id || index}>{joined2}</div>;
      })}</div></AbsoluteFill>;
};
const Wn = ({
  overlay: overlay,
  durationInFrames: durationInFrames,
  fps: fps
}) => {
  const frame = useCurrentFrame();
  const {
    scale: scale = 0.6,
    position: position = "top-right",
    posX: posX = 75,
    posY: posY = 25,
    animation: animation = "pop",
    imageUrl: imageUrl
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
      frame: frame,
      fps: fps,
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
  return <div style={{
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
  }}><RemotionImg src={imageUrl} style={{
      maxWidth: "80vw",
      maxHeight: "80vh",
      objectFit: "contain",
      borderRadius: 16,
      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.18)"
    }} /></div>;
};
const Ha = ({
  scenes: scenes = [],
  fps: fps = 30,
  audioTrack: audioTrack = null,
  musicTrack: musicTrack = null,
  captionTrack: captionTrack = null,
  transitions: transitions = null,
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
  const defaultTransition = ["none", "fade", "slide-left", "slide-right", "zoom", "wipe"].includes(transitions == null ? undefined : transitions.default) ? transitions.default : "fade";
  const value45 = Math.min(1, Math.max(0.1, Number(transitions == null ? undefined : transitions.duration) || 0.35));
  const captionsEnabled = (captionTrack == null ? undefined : captionTrack.enabled) !== !1;
  const burnInEnabled = (captionTrack == null ? undefined : captionTrack.burnIn) !== !1 && captionsEnabled;
  const hasBurnInCaptions = burnInEnabled && (cues = captionTrack == null ? undefined : captionTrack.cues) != null && !!cues.length;
  return <AbsoluteFill style={{
    backgroundColor: "#07080b"
  }}>{items.map((item, index) => {
      const value46 = Math.max(1, Math.round(Number(item.duration || 4) * value44));
      const transition = item.transition && item.transition !== "inherit" ? item.transition : defaultTransition;
      const element = <Sequence from={frameCursor} durationInFrames={value46} premountFor={value44} key={item.id || Math.random()}><On scene={hasBurnInCaptions || !burnInEnabled ? {
          ...item,
          _skipLegacyCaption: !0
        } : item} durationInFrames={value46} fps={value44} transition={transition} transitionSeconds={value45} hasPrevious={index > 0} hasNext={index < items.length - 1} /></Sequence>;
      frameCursor += value46;
      return element;
    })}{Array.isArray(indexes) && indexes.map(overlay => {
      if (overlay == null || !overlay.imageUrl) {
        return null;
      }
      const value47 = Math.max(0, Math.round(Number(overlay.startSeconds || 0) * value44));
      const value48 = Math.max(1, Math.round(Number(overlay.durationSeconds || 3) * value44));
      return <Sequence from={value47} durationInFrames={value48} key={overlay.id || "ovl-" + value47}><Wn overlay={overlay} durationInFrames={value48} fps={value44} /></Sequence>;
    })}{audioTrack != null && audioTrack.url ? <RemotionAudio src={audioTrack.url} volume={audioTrack.volume !== undefined ? Number(audioTrack.volume) : 1} loop={!!audioTrack.loop} /> : null}{musicTrack != null && musicTrack.url ? <RemotionAudio src={musicTrack.url} volume={musicTrack.volume !== undefined ? Number(musicTrack.volume) : 0.1} loop={musicTrack.loop !== !1} /> : null}{hasBurnInCaptions ? <Sequence from={0} durationInFrames={Math.max(value44, frameCursor)}><Fn cues={captionTrack.cues} fps={value44} style={captionTrack.style} /></Sequence> : null}</AbsoluteFill>;
};
const Un = (scene, fps) => Math.max(1, Math.round(Math.max(0, Number(scene == null ? undefined : scene.duration) || 4) * fps));
const Ga = (indexes, fps) => {
  let frameCursor = 0;
  return indexes.map((item, index) => {
    const frames = Un(item, fps);
    const entry = {
      scene: item,
      index: index,
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
  const value49 = Math.max(fps, Ga(scenes4, fps).reduce((acc, ga) => acc + ga.durationInFrames, 0));
  const value50 = scenes5 ? Math.ceil(scenes5 / 1000 * fps) : 0;
  return Math.max(value49, value50);
};
const Lt = seconds => {
  const value51 = Math.max(0, Number(seconds) || 0);
  const value52 = Math.floor(Math.round(value51 * 10));
  const value53 = Math.floor(value52 / 10);
  const value54 = Math.floor(value53 / 60);
  const secs = value53 % 60;
  const tenths = value52 % 10;
  return String(value54).padStart(2, "0") + ":" + String(secs).padStart(2, "0") + "." + tenths;
};
const ut = start => Math.max(0, Number(start) || 0).toFixed(2) + " s";
const _Component2 = ({
  isOpen: isOpen,
  onClose: onClose,
  onTranscribeWhisper: onTranscribeWhisper
}) => {
  var captionTrack;
  const project = w(state => state.project);
  const shiftCaptions = w(state => state.shiftCaptions);
  const alignCaptionsStart = w(state => state.alignCaptionsStart);
  const scaleCaptionsToAudio = w(state => state.scaleCaptionsToAudio);
  const syncScenesToCaptions = w(state => state.syncScenesToCaptions);
  const [offsetInput, setOffsetInput] = React.useState(0);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const cues = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) || [];
  const audioTrack = project.audioTrack;
  const audioDurationSeconds = (Number(audioTrack == null ? undefined : audioTrack.durationMs) || 0) / 1000;
  const captionsRange = React.useMemo(() => {
    if (!cues.length) {
      return {
        start: 0,
        end: 0,
        duration: 0
      };
    }
    const value55 = Math.min(...cues.map(item => Number(item.startMs) || 0));
    const value56 = Math.max(...cues.map(item => Number(item.endMs) || 0));
    return {
      start: value55 / 1000,
      end: value56 / 1000,
      duration: (value56 - value55) / 1000
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
    const handleKeyDown = event => {
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
  const applyOffset = offsetMs => {
    if (cues.length) {
      shiftCaptions(offsetMs);
      setFeedbackMessage((offsetMs < 0 ? "Adelantados" : "Retrasados") + " " + Math.abs(offsetMs) + " ms.");
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    const value = Number(offsetInput);
    if (!!Number.isFinite(value) && value !== 0) {
      applyOffset(value);
      setOffsetInput(0);
    }
  };
  const element = <div className="sync-modal-backdrop" onMouseDown={onClose}><section className="sync-modal" role="dialog" aria-modal="true" aria-labelledby="sync-modal-title" onMouseDown={event => event.stopPropagation()}><header className="sync-modal-header"><div><span>TIEMPO Y ALINEACIÓN</span><h2 id="sync-modal-title">Sincronizar subtítulos</h2><p>Alinea las frases con la narración sin alterar el contenido.</p></div><button type="button" className="sync-modal-close" onClick={onClose} aria-label="Cerrar sincronización">✕</button></header><div className="sync-modal-scroll"><div className="sync-summary-grid"><article className={audioTrack ? "ready" : "empty"}><div><span className="sync-summary-icon">♪</span><small>AUDIO</small></div><strong>{audioTrack ? ut(audioDurationSeconds) : "Sin audio"}</strong><p title={(audioTrack == null ? undefined : audioTrack.name) || ""}>{(audioTrack == null ? undefined : audioTrack.name) || "Carga una narración para comparar"}</p></article><article className={cues.length ? "ready captions" : "empty"}><div><span className="sync-summary-icon">CC</span><small>SUBTÍTULOS</small></div><strong>{cues.length ? cues.length + " frases" : "Sin subtítulos"}</strong><p>{cues.length ? ut(captionsRange.start) + " → " + ut(captionsRange.end) : "Importa un SRT o transcribe el audio"}</p></article></div>{audioTrack && cues.length ? <div className={"sync-difference " + (isAligned ? "aligned" : "warning")}><span>{isAligned ? "✓" : "!"}</span><div><strong>{isAligned ? "La duración está alineada" : durationDiff > 0 ? "Los subtítulos terminan después" : "Los subtítulos terminan antes"}</strong><small>{isAligned ? "La diferencia es menor a 250 ms." : "Puedes escalar la duración completa o ajustar el desplazamiento manualmente."}</small></div><b>{durationDiff > 0 ? "+" : ""}{durationDiff.toFixed(2)} s</b></div> : <div className="sync-difference neutral"><span>i</span><div><strong>Faltan elementos para comparar</strong><small>Necesitas audio y subtítulos con tiempos válidos.</small></div>{audioTrack && !cues.length && onTranscribeWhisper ? <button type="button" onClick={onTranscribeWhisper}>Transcribir</button> : null}</div>}<section className="sync-section"><div className="sync-section-heading"><div><span>01</span><strong>Ajuste automático</strong></div><small>Recomendado</small></div><div className="sync-action-grid"><button type="button" className="sync-action primary" disabled={!audioTrack || !cues.length} onClick={() => {
              scaleCaptionsToAudio();
              setFeedbackMessage("Subtítulos escalados a la duración del audio.");
            }}><span>◎</span><div><strong>Encajar con el audio</strong><small>Escala todos los timestamps proporcionalmente hasta {ut(audioDurationSeconds)}.</small></div></button><button type="button" className="sync-action" disabled={!cues.length || captionsRange.start === 0} onClick={() => {
              alignCaptionsStart();
              setFeedbackMessage("El primer subtítulo ahora comienza en 0:00.");
            }}><span>↤</span><div><strong>Alinear inicio a 0:00</strong><small>Elimina el espacio inicial de {ut(captionsRange.start)} sin cambiar la duración.</small></div></button></div></section><section className="sync-section"><div className="sync-section-heading"><div><span>02</span><strong>Ajuste fino</strong></div><small>Adelantar / retrasar</small></div><div className="sync-step-grid">{[-1000, -500, -100, 100, 500, 1000].map(item => <button type="button" disabled={!cues.length} onClick={() => applyOffset(item)} key={item}>{item > 0 ? "+" : ""}{Math.abs(item) >= 1000 ? item / 1000 + ".0 s" : item + " ms"}</button>)}</div><form className="sync-custom-offset" onSubmit={handleSubmit}><label htmlFor="sync-offset">Desplazamiento personalizado</label><div><input id="sync-offset" type="number" step="50" value={offsetInput} onChange={event => setOffsetInput(event.target.value)} placeholder="Ej.: -350 o 200" disabled={!cues.length} /><span>ms</span><button type="submit" disabled={!cues.length || !Number(offsetInput)}>Aplicar</button></div></form></section><section className="sync-scenes-card" style={{
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}><div><span>▦</span><div><strong>Alinear imágenes a los subtítulos</strong><small>Ajusta la duración de cada imagen para que cambie exactamente cuando empieza la siguiente frase.</small></div></div><button type="button" disabled={!cues.length} onClick={() => {
              syncScenesToCaptions();
              setFeedbackMessage("Duración de imágenes ajustada a los subtítulos.");
            }}>Alinear imágenes</button></div><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 10
          }}><div><span>CC</span><div><strong>Alinear subtítulos a los cortes de escenas</strong><small>Ajusta cada bloque de subtítulo para que empiece y termine exactamente con su imagen.</small></div></div><button type="button" disabled={!cues.length} onClick={() => {
              syncCaptionsToScenes();
              setFeedbackMessage("Subtítulos alineados a los cortes de las escenas.");
            }}>Alinear subtítulos</button></div></section>{feedbackMessage ? <div className="sync-notice" role="status">✓ {feedbackMessage}</div> : null}</div><footer className="sync-modal-footer"><span>Esc para cerrar</span><button type="button" onClick={onClose}>Listo</button></footer></section></div>;
  return ReactDOM.createPortal(element, document.body);
};
const Bn = ({
  isOpen: isOpen,
  overlayId: overlayId,
  onClose: onClose
}) => {
  var captionTrack;
  const project = w(state => state.project);
  const updateOverlay = w(state => state.updateOverlay);
  const removeOverlay = w(state => state.removeOverlay);
  const overlay = (project.overlays || []).find(overlay => overlay.id === overlayId);
  const cues = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) || [];
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
      setScale(Number(overlay.scale !== undefined ? overlay.scale : 0.6));
      setPosition(overlay.position || "top-right");
      setPosX(Number(overlay.posX !== undefined ? overlay.posX : 78));
      setPosY(Number(overlay.posY !== undefined ? overlay.posY : 20));
      setStartSeconds(Number(overlay.startSeconds || 0));
      setDurationSeconds(Number(overlay.durationSeconds || 3));
      setAnimation(overlay.animation || "pop");
      setCaptionCueId(overlay.captionCueId || "");
      setImageUrl(overlay.imageUrl || "");
      setName(overlay.name || "Superposición");
    }
  }, [overlay, isOpen]);
  if (!isOpen || !overlay) {
    return null;
  }
  const handleClick2 = () => {
    updateOverlay(overlay.id, {
      scale: scale,
      position: position,
      posX: posX,
      posY: posY,
      startSeconds: Math.max(0, Number(startSeconds)),
      durationSeconds: Math.max(0.2, Number(durationSeconds)),
      animation: animation,
      captionCueId: captionCueId || null,
      imageUrl: imageUrl,
      name: name
    });
    onClose();
  };
  const handlePositionSelect = id => {
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
  const handleCaptionCueSelect = cueId => {
    setCaptionCueId(cueId);
    if (!cueId) {
      return;
    }
    const found = cues.find(item => item.id === cueId);
    if (found) {
      const cueStartSeconds = Number(found.startMs || found.startSeconds * 1000) / 1000;
      const cueEndSeconds = Number(found.endMs || found.endSeconds * 1000) / 1000;
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
  const handleChange = async event => {
    var files;
    const file = (files = event.target.files) == null ? undefined : files[0];
    if (file) {
      try {
        const headers = {
          "Content-Type": file.type || "application/octet-stream",
          "x-filename": encodeURIComponent(file.name)
        };
        const response = await fetch("http://127.0.0.1:4322/api/import", {
          method: "POST",
          headers: headers,
          body: file
        }).catch(() => fetch("/api/import", {
          method: "POST",
          headers: headers,
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
      } catch {}
    }
  };
  const handleClick3 = () => {
    removeOverlay(overlay.id);
    onClose();
  };
  return <div style={{
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "rgba(3, 7, 18, 0.82)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }} onClick={event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }}><div style={{
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
    }}><div style={{
        padding: "14px 20px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255, 255, 255, 0.02)"
      }}><div style={{
          display: "flex",
          alignItems: "center",
          gap: 10
        }}><span style={{
            fontSize: 18
          }}>🖼️</span><div><h3 style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 800
            }}>Ajustes de Superposición (Pista V2)</h3><p style={{
              margin: "2px 0 0",
              fontSize: 11,
              color: "#94a3b8"
            }}>Control de tamaño, posición en pantalla y sincronización con subtítulos</p></div></div><button type="button" onClick={onClose} style={{
          background: "transparent",
          border: "none",
          color: "#94a3b8",
          fontSize: 18,
          cursor: "pointer",
          padding: "4px 8px"
        }}>✕</button></div><div style={{
        padding: "16px 20px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}><div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: 12,
          borderRadius: 10,
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.06)"
        }}><div style={{
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
          }}>{imageUrl ? <img src={imageUrl} alt="" style={{
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }} /> : <span style={{
              fontSize: 24
            }}>🖼️</span>}</div><div style={{
            flex: 1,
            minWidth: 0
          }}><input type="text" value={name} onChange={event => {
              setName(event.target.value);
              updateOverlay(overlay.id, {
                name: event.target.value
              });
            }} placeholder="Nombre de la imagen" style={{
              width: "100%",
              padding: "5px 8px",
              fontSize: 12,
              fontWeight: 600,
              background: "rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 6,
              color: "#fff",
              marginBottom: 6
            }} /><label style={{
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
            }}><input type="file" accept="image/*" onChange={handleChange} style={{
                display: "none"
              }} />📁 Cambiar imagen desde PC</label></div></div><div style={{
          display: "flex",
          flexDirection: "column",
          gap: 6
        }}><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}><label style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#e2e8f0"
            }}>📏 Tamaño de la Imagen (Escala)</label><span style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#818cf8",
              fontFamily: "monospace",
              background: "rgba(99, 102, 241, 0.15)",
              padding: "2px 8px",
              borderRadius: 4
            }}>{Math.round(scale * 100)}%</span></div><input type="range" min="0.15" max="1.5" step="0.05" value={scale} onChange={event => {
            const value = Number(event.target.value);
            setScale(value);
            updateOverlay(overlay.id, {
              scale: value
            });
          }} style={{
            width: "100%",
            accentColor: "#6366f1",
            cursor: "pointer"
          }} /><div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 6,
            marginTop: 4
          }}>{[{
              label: "Pequeña (30%)",
              val: 0.3
            }, {
              label: "Mediana (60%)",
              val: 0.6
            }, {
              label: "Grande (100%)",
              val: 1
            }, {
              label: "Máxima (140%)",
              val: 1.4
            }].map(item => <button type="button" onClick={() => {
              setScale(item.val);
              updateOverlay(overlay.id, {
                scale: item.val
              });
            }} style={{
              padding: "4px 6px",
              fontSize: 10,
              fontWeight: 700,
              background: Math.abs(scale - item.val) < 0.05 ? "rgba(99, 102, 241, 0.3)" : "rgba(255, 255, 255, 0.04)",
              border: Math.abs(scale - item.val) < 0.05 ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 6,
              color: Math.abs(scale - item.val) < 0.05 ? "#e0e7ff" : "#94a3b8",
              cursor: "pointer"
            }} key={item.label}>{item.label}</button>)}</div></div><div style={{
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}><label style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#e2e8f0"
          }}>📍 Posición en Pantalla</label><div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 6
          }}>{[{
              id: "top-left",
              label: "↖ Sup. Izq"
            }, {
              id: "top-right",
              label: "↗ Sup. Der"
            }, {
              id: "center",
              label: "🎯 Centro"
            }, {
              id: "bottom-left",
              label: "↙ Inf. Izq"
            }, {
              id: "bottom-right",
              label: "↘ Inf. Der"
            }].map(item => <button type="button" onClick={() => handlePositionSelect(item.id)} style={{
              padding: "6px 4px",
              fontSize: 10.5,
              fontWeight: 700,
              background: position === item.id ? "rgba(99, 102, 241, 0.28)" : "rgba(255, 255, 255, 0.03)",
              border: position === item.id ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 6,
              color: position === item.id ? "#fff" : "#94a3b8",
              cursor: "pointer"
            }} key={item.id}>{item.label}</button>)}</div><div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 4
          }}><div><div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10.5,
                color: "#94a3b8",
                marginBottom: 3
              }}><span>Horizontal (X)</span><span>{Math.round(posX)}%</span></div><input type="range" min="5" max="95" value={posX} onChange={event => {
                const value = Number(event.target.value);
                setPosX(value);
                setPosition("custom");
                updateOverlay(overlay.id, {
                  posX: value,
                  position: "custom"
                });
              }} style={{
                width: "100%",
                accentColor: "#6366f1",
                cursor: "pointer"
              }} /></div><div><div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10.5,
                color: "#94a3b8",
                marginBottom: 3
              }}><span>Vertical (Y)</span><span>{Math.round(posY)}%</span></div><input type="range" min="5" max="95" value={posY} onChange={event => {
                const value = Number(event.target.value);
                setPosY(value);
                setPosition("custom");
                updateOverlay(overlay.id, {
                  posY: value,
                  position: "custom"
                });
              }} style={{
                width: "100%",
                accentColor: "#6366f1",
                cursor: "pointer"
              }} /></div></div></div><div style={{
          padding: 12,
          borderRadius: 10,
          background: "rgba(99, 102, 241, 0.05)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}><div style={{
            display: "flex",
            alignItems: "center",
            gap: 6
          }}><span style={{
              fontSize: 14
            }}>🎯</span><label style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#c7d2fe"
            }}>Vincular a Frase de Subtítulo (SRT)</label></div><p style={{
            margin: 0,
            fontSize: 10.5,
            color: "#94a3b8"
          }}>Alinea automáticamente la aparición de esta imagen con las palabras exactas que dice el narrador.</p>{cues.length > 0 ? <select value={captionCueId} onChange={event => handleCaptionCueSelect(event.target.value)} style={{
            width: "100%",
            padding: "7px 10px",
            fontSize: 11.5,
            background: "#1e1e2e",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            borderRadius: 6,
            color: "#f8fafc",
            cursor: "pointer"
          }}><option value="">-- Sin vincular (Tiempo manual) --</option>{cues.map((cue, index) => {
              var text2;
              const text3 = (Number(cue.startMs || cue.startSeconds * 1000) / 1000).toFixed(1);
              const text4 = (Number(cue.endMs || cue.endSeconds * 1000) / 1000).toFixed(1);
              const string = String(cue.text || "").slice(0, 45);
              return <option value={cue.id || index} key={cue.id || index}>[{text3}s - {text4}s] {string}{((text2 = cue.text) == null ? undefined : text2.length) > 45 ? "..." : ""}</option>;
            })}</select> : <span style={{
            fontSize: 11,
            color: "#64748b",
            fontStyle: "italic"
          }}>No hay subtítulos generados aún. Puedes transcribir tu video o audio primero para vincular imágenes a frases.</span>}<div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 4
          }}><div><label style={{
                fontSize: 10.5,
                color: "#cbd5e1",
                display: "block",
                marginBottom: 3
              }}>Segundo de Inicio (s)</label><input type="number" step="0.1" min="0" value={startSeconds} onChange={event => {
                const value = Math.max(0, Number(event.target.value));
                setStartSeconds(value);
                updateOverlay(overlay.id, {
                  startSeconds: value
                });
              }} style={{
                width: "100%",
                padding: "5px 8px",
                fontSize: 11.5,
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 6,
                color: "#fff"
              }} /></div><div><label style={{
                fontSize: 10.5,
                color: "#cbd5e1",
                display: "block",
                marginBottom: 3
              }}>Duración Visible (s)</label><input type="number" step="0.1" min="0.2" value={durationSeconds} onChange={event => {
                const value = Math.max(0.2, Number(event.target.value));
                setDurationSeconds(value);
                updateOverlay(overlay.id, {
                  durationSeconds: value
                });
              }} style={{
                width: "100%",
                padding: "5px 8px",
                fontSize: 11.5,
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 6,
                color: "#fff"
              }} /></div></div></div><div style={{
          display: "flex",
          flexDirection: "column",
          gap: 6
        }}><label style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#e2e8f0"
          }}>✨ Efecto de Entrada y Salida</label><div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 6
          }}>{[{
              id: "pop",
              label: "💥 Pop / Zoom"
            }, {
              id: "fade",
              label: "🌫️ Desvanecer"
            }, {
              id: "slide-up",
              label: "⬆️ Deslizar"
            }, {
              id: "none",
              label: "⏸️ Fijo"
            }].map(item => <button type="button" onClick={() => {
              setAnimation(item.id);
              updateOverlay(overlay.id, {
                animation: item.id
              });
            }} style={{
              padding: "6px 4px",
              fontSize: 10.5,
              fontWeight: 700,
              background: animation === item.id ? "rgba(99, 102, 241, 0.25)" : "rgba(255, 255, 255, 0.03)",
              border: animation === item.id ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 6,
              color: animation === item.id ? "#fff" : "#94a3b8",
              cursor: "pointer"
            }} key={item.id}>{item.label}</button>)}</div></div></div><div style={{
        padding: "12px 20px",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255, 255, 255, 0.02)"
      }}><button type="button" onClick={handleClick3} style={{
          padding: "7px 12px",
          background: "rgba(239, 68, 68, 0.12)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: 8,
          color: "#fca5a5",
          fontSize: 11.5,
          fontWeight: 700,
          cursor: "pointer"
        }}>🗑️ Eliminar Superposición</button><button type="button" onClick={handleClick2} style={{
          padding: "7px 18px",
          background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
          border: "none",
          borderRadius: 8,
          color: "#fff",
          fontSize: 12,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(99, 102, 241, 0.35)"
        }}>Listo / Cerrar</button></div></div></div>;
};
const _n = [4, 6, 8, 10];
const ya = scene => {
  const model = (scene == null ? undefined : scene.videoModel) === "omni" ? "omni" : "veo-3.1-lite";
  const value = Number(scene == null ? undefined : scene.videoDuration);
  const duration = model === "veo-3.1-lite" ? 8 : _n.includes(value) ? value : 8;
  return {
    model: model,
    duration: duration,
    label: model === "omni" ? "Omni Flash" : "Veo 3.1 Lite",
    queueLabel: model === "omni" ? "Omni Flash está generando el video..." : "Veo Lower Priority: esperando turno en la cola..."
  };
};
const ra = async file => {
  const uint8Array = new Uint8Array(await file.arrayBuffer());
  const chunkSize = 32768;
  let binary = "";
  for (let index = 0; index < uint8Array.length; index += chunkSize) {
    binary += String.fromCharCode(...uint8Array.subarray(index, index + chunkSize));
  }
  return btoa(binary);
};
const Ee = async (type, payload = {}, timeoutMs = 1200000) => {
  var electronAPI;
  if (typeof window !== "undefined" && (electronAPI = window.electronAPI) != null && electronAPI.flowExecute) {
    let timer;
    const promise = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        reject(new Error("Tiempo de espera agotado (" + Math.round(timeoutMs / 1000) + "s) en Flow (" + type + ")."));
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
      if (event.source === window && (data == null ? undefined : data.source) === "flowtube-extension" && data.requestId === id) {
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
      type: type,
      payload: payload
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
const Ln = "\nPRINCIPIOS DE DIRECCIÓN CINEMATOGRÁFICA Y STORYBOARDING (AI DIRECTOR 2.0):\n1. REGLA DE PLANOS SEGÚN NARRATIVA:\n   - Gran Plano General / Lejano (Extreme Wide Shot - EWS): Para presentar locaciones, ciudades, paisajes épicos o situar al espectador en un entorno.\n   - Plano Entero (Full Shot - FS): Cuando hay acción física completa, caminata, movimiento corporal de cabeza a pies.\n   - Plano Medio (Medium Shot - MS / MCU): Para explicaciones, diálogo, personaje en acción o interacción con su entorno.\n   - Primer Plano (Close-up - CU): Para transmitir emociones claras, gestos de concentración, sorpresa o frustración.\n   - Primerísimo Primer Plano / Macro (Extreme Close-up - ECU): Para detalles de alto poder dramático (lágrimas, mirada penetrante, firma en un contrato).\n   - Regla de Hitchcock: Si un objeto es clave para la historia, debe ocupar un tamaño dominante en el primer plano.\n\n2. REGLA ANTI JUMP-CUT Y VARIACIÓN DE ESCALA:\n   - NUNCA repitas el mismo tamaño de plano (Close-Up con Close-Up, o Wide con Wide) en dos escenas consecutivas sobre el mismo sujeto.\n   - Aplica la regla cinematográfica de cambio de escala: Si la toma anterior fue un Primer Plano (CU), la siguiente DEBE ser un Plano Medio (MS) o Plano General (WS) o un plano detalle de apoyo (B-Roll).\n\n3. ÁNGULOS DE CÁMARA PSICOLÓGICOS:\n   - Contrapicado (Low-Angle): Mirar desde abajo hacia arriba -> evocar poder, autoridad, heroísmo o liderazgo imponente.\n   - Picado (High-Angle): Mirar desde arriba hacia abajo -> evocar vulnerabilidad, personaje indefenso o pequeñez.\n   - Plano Holandés (Dutch Angle 45°): Inclinación diagonal -> tensión, pesadilla, caos, peligro o incomodidad.\n   - Espacio Negativo: Ubicar al sujeto pequeño en una esquina rodeado de vacío -> evocar soledad profunda o aislamiento.\n\n4. COHERENCIA CROMÁTICA Y PROGRESIÓN DE ILUMINACIÓN:\n   - Toda la secuencia debe compartir la misma armonía lumínica y temperatura de color (ej. iluminación cinematográfica coordinada).\n   - Respeta la continuidad temporal (mañana, tarde, atardecer, noche) indicada por el guion.\n\n5. RITMO A-ROLL Y B-ROLL:\n   - Alterna inteligentemente entre planos de personaje (A-Roll) y planos de corte/metáforas visuales (B-Roll) para evitar fatiga visual.\n";
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
function Hn(script2 = "", script3 = !1) {
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
function Jt(script4, script5 = 0, script6 = 1, script7 = {}, script8 = !1, script9 = {}) {
  const {
    previousFraming: previousFraming = null,
    characterDescription: characterDescription = "",
    colorHarmony: colorHarmony = null,
    styleKey: styleKey = ""
  } = script9;
  const replace = String(script4 || "").replace(/[^\w\sÀ-ſ]/gi, " ").trim();
  const vn = Vn.find(vn => vn.regex.test(script4));
  let framing = "";
  let description = "";
  let motion = "gentle-zoom-in";
  if (vn) {
    framing = vn.framing;
    description = vn.description;
    motion = vn.motion;
  } else {
    const va2 = va[script5 % va.length];
    framing = va2.framing;
    motion = va2.motion;
    description = "illustrating \"" + replace.slice(0, 75) + "\", natural depth of field";
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
    motion: motion,
    hasCharacter: shotType === "A-ROLL",
    shotType: shotType,
    colorHarmony: styleHint
  };
}
function Yn({
  batchScenes: batchScenes,
  totalScenes: totalScenes,
  styleConfig: styleConfig,
  attachedStyleRule: attachedStyleRule = "",
  attachedCharacterRule: attachedCharacterRule = "",
  compositionRules: compositionRules = "",
  hasCharacterRef: hasCharacterRef = !1,
  colorHarmony: colorHarmony = null
}) {
  const styleHint = colorHarmony || oa(styleConfig == null ? undefined : styleConfig.label);
  const joined = batchScenes.map(item => {
    const sceneNumber = (item.globalIndex !== undefined ? item.globalIndex : 0) + 1;
    const script = (item.script || item.caption || item.title || "").trim();
    return "ESCENA " + sceneNumber + ": \"" + script + "\"";
  }).join("\n");
  const characterPromptText = hasCharacterRef ? "A " + (styleConfig.label || "2D cartoon") + " Medium Shot of the character strictly matching the attached reference image (same facial features, facial hair or beard if shown in reference or clean-shaven if shown clean-shaven, hair, and outfit) [action and setting derived from script], " + styleHint + ", " + (styleConfig.promptSuffix || "2D animated cartoon style, clean line art") : "" + (styleConfig.characterPrompt || styleConfig.brollPrompt || "A cinematic scene in the selected visual style...");
  return "Eres un DIRECTOR DE ARTE Y STORYBOARDER PROFESIONAL (AI DIRECTOR 2.0) para videos virales de YouTube, TikTok y cine.\nTu misión es transformar cada frase del guion en una toma de storyboard cinematográfico inolvidable con continuidad visual estricta entre escenas.\n\nESTILO VISUAL SELECCIONADO: \"" + styleConfig.label + "\"\n" + (styleConfig.instructions || "") + "\n" + attachedStyleRule + "\n" + (attachedCharacterRule ? "\n" + attachedCharacterRule + "\n" : "") + "\n\nARMONÍA CROMÁTICA GLOBAL PARA LA SECUENCIA:\n\"" + styleHint + "\" (Asegura que todas las tomas compartan esta paleta lumínica y temperatura de color).\n\n" + Ln + "\n\nREGLAS DE FORMATO Y COMPOSICIÓN:\n" + compositionRules + "\n- REGLAS DE ENTORNO Y LOCACIÓN:\n  * El entorno de cada escena DEBE derivarse estrictamente de la locución/guion de esa toma (ej: si menciona agua o río, la escena es en un río o lago; si menciona bosque, en la naturaleza; si menciona la calle, en la calle; si menciona el espacio, en el espacio).\n  * PROHIBIDO situar todas las escenas en un estudio, oficina o mesa de trabajo con lámpara, a menos que el guion lo indique expresamente. Varía dinámicamente las locaciones según la historia.\n- REGLA ANTI JUMP-CUT:\n  * NUNCA pongas dos planos idénticos del mismo sujeto de forma consecutiva (ej: no uses dos Close-Ups seguidos).\n" + (hasCharacterRef ? "- REGLAS OBLIGATORIAS DE PERSONAJE:\n  * En toda escena con personaje, describe al personaje manteniendo con máxima fidelidad la identidad de la imagen de referencia adjunta.\n  * FIDELIDAD AL ROSTRO Y VELLO FACIAL: Observa con atención el rostro del personaje en la imagen de referencia:\n    - Si el personaje TIENE barba, bigote o perilla (ej. barba completa, perilla, bigote), DEBES incluirlo y describirlo explícitamente en el prompt en inglés (ej: \"with matching dark beard as depicted in reference image\", \"bearded character matching reference\").\n    - Si el personaje NO tiene barba (rostro limpio o afeitado), respeta el rostro limpio y NO agregues barba (\"clean-shaven smooth face\").\n    - En ningún caso contradigas la apariencia de la imagen de referencia.\n  * NO inventes camiseta negra por defecto; respeta la vestimenta de la referencia.\n  * En el prompt en inglés, usa descripciones como: \"the character strictly matching the reference image (same facial features, facial hair or beard if depicted in reference, hairstyle, and characteristic outfit)\"." : "") + "\n- Define para cada escena:\n  1. \"sceneNumber\": número correlativo\n  2. \"shotType\": \"A-ROLL\" | \"B-ROLL\"\n  3. \"hasCharacter\": boolean (true si aparece personaje o interacción humana)\n  4. \"framing\": tipo de plano cinematográfico elegido (ej. \"Extreme Close-Up\", \"Low-Angle Hero Shot\", \"High-Angle Negative Space\", \"Dutch Angle\", \"Full Shot\", \"Medium Shot\")\n  5. \"motion\": gentle-zoom-in | gentle-zoom-out | pan-left | pan-right | drift-left-right | slow-drift | cinematic-arc-left | soft-orbit-left\n  6. \"prompt\": prompt en inglés descriptivo y cinematográfico que detalle el encuadre, iluminación, acción y entorno específico del guion según \"" + styleConfig.label + "\".\n\nESCENAS A DIRIGIR (" + batchScenes.length + " tomas):\n" + joined + "\n\nResponde ÚNICAMENTE con un JSON array válido con este formato:\n[\n  {\n    \"sceneNumber\": 1,\n    \"shotType\": \"A-ROLL\",\n    \"hasCharacter\": true,\n    \"framing\": \"Medium Shot\",\n    \"motion\": \"gentle-zoom-in\",\n    \"prompt\": " + JSON.stringify(characterPromptText) + "\n  }\n]";
}
function qn(script10, script11 = "cinematico", script12 = {}) {
  const text = (script10 || "").trim();
  const colorHarmony = script12.colorHarmony || oa(script11);
  const styleLabel = script12.styleLabel || script11 || "Cinematic Film";
  const items = ["Cinematic Macro Extreme Close-Up with razor-sharp depth of field", "Atmospheric Wide Establishing Shot with volumetric atmosphere", "Dynamic Low-Angle architectural shot with dramatic lighting", "Cinematic Over-The-Shoulder ambient detail cutaway", "Isometric perspective high-angle detail view"];
  const framing = script12.framing || items[Math.floor(Math.random() * items.length)];
  const replace = text.replace(/["'\n]/g, " ").slice(0, 140);
  const focusDescription = replace ? "focused on cinematic visual metaphor and contextual environment inspired by: \"" + replace + "\"" : "focusing on environmental storytelling, intricate mechanical or natural textures, and dramatic ambient lighting";
  return {
    prompt: framing + ", " + focusDescription + ", no people, no human face, pure environmental storytelling, visual style: " + styleLabel + ", " + colorHarmony + ", photorealistic cinematic texture, 8k resolution, award-winning cinematography, no watermark, no text",
    framing: framing,
    motion: script12.motion || "slow-drift",
    hasCharacter: !1,
    shotType: "B-ROLL",
    colorHarmony: colorHarmony
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
    let isBRoll = !1;
    let reason = "";
    if (item.hasCharacter === false) {
      isBRoll = true;
      reason = "Marcado explícitamente como B-Roll";
      consecutiveARollCount = 0;
    } else if (matches) {
      isBRoll = true;
      reason = "Palabras clave visuales de entorno, objeto o paisaje";
      consecutiveARollCount = 0;
    } else if (consecutiveARollCount >= 2) {
      isBRoll = true;
      reason = "Corte de ritmo para evitar monotonía de planos de personaje consecutivos";
      consecutiveARollCount = 0;
    } else {
      consecutiveARollCount += 1;
      reason = "Toma principal (A-Roll)";
    }
    return {
      index: index,
      sceneId: item.id,
      suggestedShotType: isBRoll ? "B-ROLL" : "A-ROLL",
      hasCharacter: !isBRoll,
      reason: reason
    };
  });
}
const Ye = ms => new Promise(resolve => setTimeout(resolve, ms));
const Kn = 120000;
const pt = 3;
const Sa = 1200;
const wa = 4000;
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
const Pe = customStyle => customStyle != null && !!customStyle.url || customStyle != null && !!customStyle.base64 || customStyle != null && !!customStyle.flowMediaId;
const Ct = (prompt, styleConfig, visualStyle) => {
  const styleSuffix = visualStyle === "custom-style" ? Rt : "STRICT STYLE CONSISTENCY: render every element exclusively as " + styleConfig.label + ". Never mix this style with a different artistic medium.";
  return (String(prompt || "").trim() + ", " + (styleConfig.promptSuffix || "") + ". " + styleSuffix).trim();
};
const ka = async customStyle => {
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
    label: "2D Infográfico Editorial (Minimalista Explicativo / Tinta y Pastel)",
    isInfographic: !0,
    promptSuffix: "Clean 2D hand-drawn editorial illustration, minimalist educational explainer artwork, full-bleed 2D scene, thick black ink outlines, slightly imperfect hand-sketched linework, subtle marker texture, flat muted pastel colors, simple geometric forms, cartoon-style characters with rounded proportions, minimal expressive faces, visual diagrams and flow arrows, high readability, all visible text and labels inside image strictly in Spanish language (absolutely no English words, no English text), simple shadows only, no realism, no 3D rendering, no photorealism, no cinematic lighting, no subtitles, no caption text overlay, no letterbox, no pillarbox, no borders, no margins, no white bars, no black bars",
    instructions: "Estilo Visual: Clean 2D hand-drawn editorial illustration, minimalist educational explainer artwork. Dibuja metáforas visuales, diagramas con flechas, esquemas de procesos, iconos y personajes stickman expresivos que representen la idea de la frase a pantalla completa (full-bleed). REGLA ESTRICTA 1: NUNCA transcribas la frase del locutor completa dentro de la imagen como subtítulo. REGLA ESTRICTA 2 (IDIOMA): Todo texto, letrero, etiqueta de diagrama ('Luz solar', 'Factura', 'Ahorro', 'Red eléctrica', 'Pagar después', 'Medidor') o bocadillo que aparezca dibujado DENTRO de la ilustración DEBE ESTAR 100% EN ESPAÑOL. PROHIBIDO PALABRAS EN INGLÉS EN LA IMAGEN. REGLA ESTRICTA 3: Llena todo el lienzo de borde a borde sin generar bandas blancas o negras ni márgenes.",
    characterDesc: "Minimalist cartoon-style stickman / line-drawn character with rounded smooth head, simple expressive dot/line face, clean black ink lines, subtle pastel clothes.",
    characterPrompt: "A clean 2D hand-drawn editorial illustration of a minimalist cartoon stickman character with rounded head [acción visual/metáfora que ilustra el concepto con diagramas, flechas o esquemas de proceso], with Spanish text labels if needed, full-bleed 2D scene, thick black ink outlines, flat muted pastel colors, all text in image strictly in Spanish, no English text, no 3D, no realism, no subtitles, no burned-in voiceover text, no letterbox, no borders",
    brollPrompt: "A clean 2D hand-drawn editorial illustration of [diagrama conceptual/esquema explicativo con flechas, iconos o comparativa visual], with Spanish text labels if needed, full-bleed 2D scene, thick black ink outlines, flat muted pastel colors, all text in image strictly in Spanish, no English text, no humans, no 3D, no subtitles, no burned-in voiceover text, no letterbox, no borders"
  },
  "western-anime": {
    label: "2D Cómic / Webtoon Animado (Línea Limpia 2D + Flat Shading)",
    promptSuffix: "2D animated cartoon style, clean solid line art, flat cel shading, no 3D, no text, no photorealism",
    instructions: "Estilo Visual: 2D Cartoon / Webtoon con línea negra sólida limpia (clean solid line art) y sombreado plano (flat cel shading). El entorno, iluminación y locación deben derivarse fielmente de la historia narrada en el guion.",
    characterDesc: "Personaje en estilo 2D cómic / webtoon. Si existe una imagen de referencia de personaje adjunta, respeta estrictamente sus rasgos faciales, vello facial (si tiene barba o si está afeitado según la referencia), peinado y vestimenta idénticos a la referencia.",
    characterPrompt: "A 2D cartoon [shot type] of the character [acción y entorno según el guion], 2D animated cartoon style, clean solid line art, flat cel shading, no 3D, no text",
    brollPrompt: "A 2D cartoon illustration of [objeto/entorno explicativo], 2D animated cartoon style, clean solid line art, flat cel shading, no humans, no 3D, no text"
  },
  stickman: {
    label: "Stickman 2D Clásico",
    promptSuffix: "2D animated stickman YouTube cartoon style, minimalist character with smooth round white head, expressive black dot eyes, clean black outlines, natural human proportions",
    instructions: "Estilo: Stickman explicativo 2D con figura minimalista, cabeza blanca redondeada y líneas limpias.",
    characterDesc: "Personaje stickman blanco estilizado con cabeza redonda y expresiones limpias.",
    characterPrompt: "A 2D cartoon illustration of a stylized stickman character with smooth round white head and expressive dot eyes [acción], clean black outlines, no 3D, no text",
    brollPrompt: "A 2D cartoon illustration of [objeto/entorno], clean minimalist style, no humans, no 3D, no text"
  },
  "stickman-dark": {
    label: "Stickman Dark Story",
    promptSuffix: "dark stickman story style, miniature black shadow figure, solid jet black round head, glowing white eyes, dark atmosphere",
    instructions: "Estilo: Stickman oscuro con sombra negra sólida y ojos blancos brillantes.",
    characterDesc: "Figura de sombra negra con ojos blancos luminosos.",
    characterPrompt: "A dark moody illustration of a miniature solid black silhouette stickman figure with glowing white eyes [acción], dramatic lighting, no text",
    brollPrompt: "A dark moody illustration of [entorno/objeto], dark atmosphere, no humans, no text"
  },
  cinematico: {
    label: "Cinemático Realista",
    promptSuffix: "cinematic style, natural lighting, depth of field, dramatic composition, 8k",
    instructions: "Estilo: Fotografía cinemática con iluminación natural y profundidad de campo acorde al entorno del guion.",
    characterDesc: "Personaje cinemático realista. Si existe referencia de personaje, replica con fidelidad sus rasgos faciales, vello facial (si tiene barba o si está afeitado según referencia), peinado y vestimenta sin ropa ni vello inventados.",
    characterPrompt: "A cinematic film still of the character [acción y entorno según el guion], natural lighting, shallow depth of field, 8k, no text",
    brollPrompt: "A cinematic photograph of [entorno/objeto], dramatic lighting, shallow depth of field, no humans, no text"
  },
  anime: {
    label: "Anime / Manga Japonés",
    promptSuffix: "anime style, defined lines, vibrant colors, cel shading, studio anime aesthetic",
    instructions: "Estilo: Anime japonés con líneas nítidas y cel shading vibrante.",
    characterDesc: "Personaje estilo anime con ojos expresivos. Si hay referencia de personaje, replica fielmente su identidad, peinado y vestimenta.",
    characterPrompt: "An anime style illustration of the character [acción y entorno según el guion], vibrant cel shading, studio anime aesthetic, no text",
    brollPrompt: "An anime style illustration of [entorno/objeto], beautiful anime background, vibrant colors, no humans, no text"
  },
  "pixel-art": {
    label: "Pixel Art 8-bit",
    promptSuffix: "pixel art style, 8-bit aesthetic, limited retro palette, crisp pixel clusters",
    instructions: "Estilo: Pixel art retro de 8 bits con paleta definida.",
    characterDesc: "Personaje pixelado con detalles limpios.",
    characterPrompt: "A pixel art illustration of a young man [acción], 8-bit retro aesthetic, crisp pixel clusters, no text",
    brollPrompt: "A pixel art scene of [entorno/objeto], retro 8-bit pixel art, no humans, no text"
  },
  "low-poly": {
    label: "Low Poly 3D",
    promptSuffix: "low poly 3D style, simplified faceted geometry, smooth pastel lighting",
    instructions: "Estilo: Low poly con geometría facetada simplificada.",
    characterDesc: "Personaje low-poly 3D geométrico.",
    characterPrompt: "A low poly 3D render of a stylized character [acción], faceted geometry, pastel lighting, no text",
    brollPrompt: "A low poly 3D isometric scene of [entorno/objeto], faceted geometry, no humans, no text"
  },
  salud: {
    label: "Ilustración Médica",
    promptSuffix: "clean medical illustration, polished flat vector art, organic full-frame composition, object in foreground, no people, no infographic layout, no diagram, no arrows, no labels, no text",
    instructions: "Estilo: Ilustración médica limpia en plano detalle. Construye una escena visual orgánica; no uses formato de infografía, diagramas, flechas, tablas ni rótulos.",
    characterDesc: "Sin personas, solo elementos médicos, científicos o conceptuales.",
    characterPrompt: "A clean medical illustration of [concepto], polished vector medical art, organic full-frame composition, no people, no infographic layout, no diagram, no arrows, no text",
    brollPrompt: "A clean medical illustration of [objeto/concepto], polished vector medical art, natural full-frame composition, no people, no infographic layout, no diagram, no arrows, no text"
  },
  fantasia: {
    label: "Fantasía Épica",
    promptSuffix: "fantasy art style, magical atmosphere, dreamlike ethereal illustration",
    instructions: "Estilo: Ilustración fantástica y mágica con colores oníricos.",
    characterDesc: "Personaje épico en entorno mágico.",
    characterPrompt: "A fantasy illustration of a character [acción], magical atmosphere, dreamlike lighting, no text",
    brollPrompt: "A fantasy environment of [entorno/objeto], magical glow, ethereal landscape, no humans, no text"
  },
  realista: {
    label: "Fotografía Realista",
    promptSuffix: "realistic photography, documentary photo, real life details, crisp focus",
    instructions: "Estilo: Fotografía documental realista.",
    characterDesc: "Personaje realista acorde al guion. Si hay referencia de personaje, replica con fidelidad sus rasgos y vestimenta.",
    characterPrompt: "A realistic candid photograph of the character [acción y entorno según el guion], natural ambient light, authentic texture, no text",
    brollPrompt: "A realistic photograph of [objeto/entorno], sharp focus, natural light, no humans, no text"
  }
};
const Mt = (visualStyle, reference) => visualStyle === "custom-style" && reference ? {
  label: "Estilo personalizado: " + (reference.name || "Referencia visual"),
  promptSuffix: "match the attached visual style reference precisely, natural full-frame composition, no infographic layout, no diagram, no arrows, no labels, no text",
  instructions: "Replica fielmente la estética de la referencia adjunta. Crea una escena natural a pantalla completa; no conviertas la imagen en infografía, diagrama, whiteboard o póster educativo.",
  characterDesc: "Personaje coherente con la referencia visual personalizada.",
  characterPrompt: "A full-frame scene of a character [acción], precisely matching the attached visual style reference, no infographic layout, no diagram, no text",
  brollPrompt: "A full-frame scene of [objeto/entorno], precisely matching the attached visual style reference, no humans, no infographic layout, no diagram, no text"
} : Ca[visualStyle] || Ca["western-anime"];
const Xa = async imageUrl => {
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
      const blob = new Blob([uint8Array], {
        type: mimeType
      });
      const response = await fetch("/api/import", {
        method: "POST",
        headers: {
          "Content-Type": mimeType
        },
        body: blob
      });
      if (!response.ok) {
        return imageUrl;
      }
      const data = await response.json();
      return (data == null ? undefined : data.url) || imageUrl;
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
    return (data == null ? undefined : data.url) || imageUrl;
  } catch {
    return imageUrl;
  }
};
const Qn = ({
  checkLicensed: checkLicensed,
  devLog: devLog,
  resolveScene: resolveScene
}) => {
  const updateProject = w(state => state.updateProject);
  const updateScene = w(state => state.updateScene);
  const finishSceneOperation = w(state => state.finishSceneOperation);
  const setAssetState = w(state => state.setAssetState);
  const setBatchState = w(state => state.setBatchState);
  const setReferenceStatus = w(state => state.setReferenceStatus);
  const selectScene = w(state => state.selectScene);
  const resolveSceneRef = React.useCallback(sceneOrId => {
    if (resolveScene) {
      return resolveScene(sceneOrId);
    }
    if (!sceneOrId) {
      const {
        project: project,
        selectedId: selectedId
      } = w.getState();
      return project.scenes.find(scene => scene.id === selectedId) || project.scenes[0];
    }
    if (typeof sceneOrId == "string") {
      const {
        project: project
      } = w.getState();
      return project.scenes.find(scene => scene.id === sceneOrId);
    }
    return sceneOrId;
  }, [resolveScene]);
  const uploadImage = React.useCallback(async (sceneOrFile, fileArg) => {
    let scene = sceneOrFile;
    let file = fileArg;
    if (sceneOrFile instanceof File && !file) {
      file = sceneOrFile;
      const {
        project: project,
        selectedId: selectedId
      } = w.getState();
      scene = project.scenes.find(scene => scene.id === selectedId) || project.scenes[0];
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
        } catch {}
      }
      const headers = {
        "Content-Type": file.type || "application/octet-stream",
        "x-filename": encodeURIComponent(file.name)
      };
      const response = await fetch("http://127.0.0.1:4322/api/import", {
        method: "POST",
        headers: headers,
        body: file
      }).catch(() => fetch("/api/import", {
        method: "POST",
        headers: headers,
        body: file
      }));
      const data = await response.json();
      if (!response.ok || data == null || !data.url) {
        throw new Error((data == null ? undefined : data.error) || "No se pudo guardar el archivo multimedia.");
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
          ...(dataUrl > 0 ? {
            duration: Math.max(0.5, dataUrl)
          } : {}),
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
        devLog("✅", "Archivo cargado en " + resolvedScene.title + ": " + file.name + (dataUrl > 0 ? " (" + dataUrl.toFixed(1) + "s)" : ""));
      }
    } catch (error) {
      finishSceneOperation(resolvedScene.id, id, {
        status: "error",
        error: error.message
      });
      if (devLog != null) {
        devLog("❌", "Error cargando archivo: " + error.message);
      }
    }
  }, [devLog, finishSceneOperation, resolveSceneRef, updateScene]);
  const uploadCharacterReference = React.useCallback(async file => {
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
          devLog("💾", "Personaje guardado localmente: " + file.name + " (" + (file.size / 1024).toFixed(0) + "KB)");
        }
        updateProject({
          characterReference: {
            url: dataUrl,
            name: file.name,
            base64: base64,
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
          devLog("❌", "Error guardando personaje: " + error.message);
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
      devLog("🗑️", "Referencia eliminada");
    }
  }, [devLog, setReferenceStatus, updateProject]);
  const buildImagePayload = React.useCallback(async (prompt, includeCharacter = !0) => {
    const project = w.getState().project;
    const isShortFormat = project.format === "short";
    const payload = {
      prompt: prompt,
      format: project.format || "short",
      aspectRatio: isShortFormat ? "9:16" : "16:9",
      model: project.imageModel
    };
    const filteredStyleReferences = Array.isArray(project.styleReferences) && project.styleReferences.length > 0 ? project.styleReferences.filter(styleReference => styleReference.enabled !== !1 && Pe(styleReference)) : project.customStyle && Pe(project.customStyle) ? [project.customStyle] : [];
    const characterReference = includeCharacter && Pe(project.characterReference) && project.characterReference.enabled !== !1 ? project.characterReference : null;
    const items = [...filteredStyleReferences];
    if (characterReference && !items.some(item => item.url === characterReference.url)) {
      items.push(characterReference);
    }
    const referenceItems = items.slice(0, 3);
    if (referenceItems.length > 0) {
      payload.referenceImages = referenceItems.map(item => ({
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
  const importVisualFilesToTimeline = React.useCallback(async files => {
    var type;
    const filteredFrom = Array.from(files || []).filter(from => {
      var type4;
      var type5;
      return ((type4 = from == null ? undefined : from.type) == null ? undefined : type4.startsWith("image/")) || ((type5 = from == null ? undefined : from.type) == null ? undefined : type5.startsWith("video/"));
    });
    if (!filteredFrom.length) {
      return;
    }
    const {
      project: project,
      selectedId: selectedId
    } = w.getState();
    const scene = project.scenes.find(scene => scene.id === selectedId) || project.scenes[0];
    if (!scene) {
      return;
    }
    setAssetState({
      status: "loading",
      operation: "timeline-import",
      progress: 0,
      message: "Importando " + filteredFrom.length + " recursos al timeline…"
    });
    const items21 = [];
    const items22 = [];
    for (let index = 0; index < filteredFrom.length; index += 1) {
      const file = filteredFrom[index];
      const isVideo = ((type = file == null ? undefined : file.type) == null ? undefined : type.startsWith("video/")) || /\.(mp4|webm|mov|m4v|mkv)$/i.test(file.name);
      let dataUrl = 0;
      if (isVideo) {
        try {
          dataUrl = await ma(file);
        } catch {}
      }
      try {
        const headers = {
          "Content-Type": file.type || "application/octet-stream",
          "x-filename": encodeURIComponent(file.name)
        };
        const response = await fetch("http://127.0.0.1:4322/api/import", {
          method: "POST",
          headers: headers,
          body: file
        }).catch(() => fetch("/api/import", {
          method: "POST",
          headers: headers,
          body: file
        }));
        const data = await response.json();
        if (!response.ok || data == null || !data.url) {
          throw new Error((data == null ? undefined : data.error) || "No se pudo guardar el archivo.");
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
          devLog("❌", "No se pudo importar " + file.name + ": " + error.message);
        }
      }
      setAssetState({
        status: "loading",
        operation: "timeline-import",
        progress: Math.round((index + 1) / filteredFrom.length * 100),
        message: "Importando al timeline (" + (index + 1) + "/" + filteredFrom.length + ")…"
      });
    }
    if (items21.length) {
      w.getState().insertMediaOnTimeline(scene.id, items21);
      if (devLog != null) {
        devLog("✅", items21.length + " recurso" + (items21.length === 1 ? "" : "s") + " organizado" + (items21.length === 1 ? "" : "s") + " en el timeline.");
      }
    }
    setAssetState({
      status: items22.length ? "error" : "ready",
      operation: "",
      progress: 100,
      message: items22.length ? items21.length + " recursos añadidos; " + items22.length + " no se pudieron importar." : "✅ " + items21.length + " recursos organizados en el timeline."
    });
  }, [devLog, setAssetState]);
  const requestFlowImage = React.useCallback(async (prompt, callback2, includeCharacter = !0) => {
    const project = w.getState().project;
    const isCustomStyle = project.visualStyle === "custom-style" && Pe(project.customStyle);
    const customStyle = isCustomStyle ? project.customStyle : project.characterReference;
    const useReference = Pe(customStyle) && (isCustomStyle || includeCharacter);
    const referenceLabel = isCustomStyle ? "estilo" : "personaje";
    if (devLog != null) {
      devLog("🎨", "Generando imagen | referencia de " + referenceLabel + ": " + (useReference ? "SÍ" : "NO"));
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
          devLog("📤", "Enviando a Flow (intento " + index + "/" + pt + ")...");
        }
        const response = await Ee("FLOW_GENERATE_IMAGE", payload, Kn);
        if (useReference) {
          const referenceMessage = response != null && response.referenceUsed ? "✅ Flow aplicó la referencia de " + referenceLabel : "⚠️ Flow no aplicó la referencia de " + referenceLabel;
          if (devLog != null) {
            devLog(response != null && response.referenceUsed ? "✅" : "⚠️", referenceMessage);
          }
          setReferenceStatus(response != null && response.referenceUsed ? "✅ Referencia aplicada" : "⚠️ Referencia no aplicada por Flow");
        }
        return response;
      } catch (error) {
        lastError = error;
        const message2 = error.message && (error.message.includes("THROTTLED") || error.message.includes("Quota exceeded") || error.message.includes("429"));
        const message3 = error.message && /recaptcha/i.test(error.message);
        if (devLog != null) {
          devLog("⚠️", "Fallo en intento " + index + "/" + pt + (message2 ? " (Límite temporal / Throttled)" : message3 ? " (reCAPTCHA)" : "") + ": " + error.message);
        }
        if (index < pt && !w.getState().batchCancelled) {
          if (callback2 != null) {
            callback2(index, pt);
          }
          const value = message2 ? Math.max(4500, index * 3000) : message3 ? Math.max(2500, index * 2000) : Jn;
          if (devLog != null) {
            devLog("⏳", "Pausando " + Math.round(value / 1000) + "s antes de reintentar...");
          }
          await Ye(value);
        }
      }
    }
    throw lastError || new Error("Error al generar imagen en Flow tras 3 reintentos.");
  }, [buildImagePayload, devLog, setReferenceStatus]);
  const imageUrl = React.useCallback(async (project, operationId, flowResult, sourceFormat) => {
    var image;
    const imageUrl = (flowResult == null ? undefined : flowResult.imageUrl) || (flowResult == null ? undefined : flowResult.url) || (flowResult == null ? undefined : flowResult.mediaUrl) || ((image = flowResult == null ? undefined : flowResult.image) == null ? undefined : image.url);
    if (!imageUrl) {
      throw new Error("Flow generó el recurso, pero no devolvió una URL de imagen utilizable.");
    }
    const sceneUpdate = {
      imageUrl: (await Xa(imageUrl)) || imageUrl,
      mediaId: (flowResult == null ? undefined : flowResult.mediaId) || (flowResult == null ? undefined : flowResult.name) || "",
      videoUrl: "",
      flowVideoUrl: "",
      sourceFormat: sourceFormat,
      status: "ready",
      error: ""
    };
    finishSceneOperation(project.id, operationId, sceneUpdate);
    const scene = w.getState().project.scenes.find(scene => scene.id === project.id);
    if (scene == null || !scene.imageUrl) {
      updateScene(project.id, sceneUpdate);
    }
    return sceneUpdate.imageUrl;
  }, [finishSceneOperation, updateScene]);
  const generateImage = React.useCallback(async sceneOrId => {
    var prompt;
    var electronAPI;
    if (checkLicensed && !checkLicensed("la generación de imágenes con IA")) {
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
        message: "Google Flow no está conectado. Haz clic en 'Conectar Flow' arriba."
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
      devLog("🖼️", "Generando: \"" + (scene.title || scene.id) + "\"");
    }
    try {
      const hasCharacter = scene.hasCharacter !== !1;
      const flowResult = await requestFlowImage(scene.prompt, (attempt, maxAttempts) => setAssetState({
        status: "loading",
        message: "Escena \"" + scene.title + "\": reintento (" + attempt + "/" + maxAttempts + ")..."
      }), hasCharacter);
      const format = w.getState().project.format;
      await imageUrl(scene, id, flowResult, format);
      if (devLog != null) {
        devLog("✅", "\"" + (scene.title || scene.id) + "\" lista " + (flowResult.is2k ? "en 2K ✨" : "") + " | ref: " + (flowResult.referenceUsed ? "SÍ" : "NO"));
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
        devLog("❌", "Error imagen \"" + (scene.title || scene.id) + "\": " + error.message);
      }
      setAssetState({
        status: "error",
        message: error.message
      });
    }
  }, [checkLicensed, devLog, finishSceneOperation, requestFlowImage, imageUrl, resolveSceneRef, setAssetState, updateScene]);
  React.useEffect(() => {
    const handleRegenerateScene = async state => {
      var detail;
      var prompt;
      var characterReference;
      const sceneId = (detail = state.detail) == null ? undefined : detail.sceneId;
      if (!sceneId) {
        return;
      }
      const scene = resolveSceneRef(sceneId);
      if (scene) {
        selectScene(scene.id);
        if ((prompt = scene.prompt) != null && prompt.trim()) {
          await generateImage(scene.id);
        } else {
          const state = w.getState();
          const visualStyle = state.project.visualStyle || "western-anime";
          const styleConfig = Mt(visualStyle, state.project.customStyle);
          const characterReference4 = ((characterReference = state.project.characterReference) == null ? undefined : characterReference.enabled) !== !1 ? state.project.characterReference : null;
          const hasCharacterRef = Pe(characterReference4);
          const script = scene.script || scene.caption || scene.title || "Cinematic scene";
          let characterPrompt = styleConfig.characterPrompt || styleConfig.brollPrompt || "A clean illustration of [acción]";
          if (hasCharacterRef) {
            characterPrompt = "A 2D cartoon Medium Shot of the character strictly matching the reference image, exact face and outfit, facial hair or beard if shown in reference or clean-shaven if shown clean-shaven [acción]";
          }
          const qualitySuffix = styleConfig.isInfographic ? "crisp high-resolution linework" : "natural cinematic composition, masterpiece, 8k";
          const finalPrompt = Ct(characterPrompt.replace("[acción]", script).replace("[action]", script), styleConfig, visualStyle) + ", " + qualitySuffix;
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
    const characterReference6 = ((characterReference5 = project.characterReference) == null ? undefined : characterReference5.enabled) !== !1 ? project.characterReference : null;
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
      } catch {}
    }
    if (hasCharacterRef) {
      try {
        const characterReferencePart = await ka(characterReference6);
        if (characterReferencePart) {
          items.push(characterReferencePart);
          attachedCharacterRule = "REFERENCIA DE PERSONAJE ADJUNTA: La imagen adjunta es la referencia del PERSONAJE PRINCIPAL.\nREGLA CRÍTICA DE PERSONAJE:\n- En toda escena con personaje (hasCharacter = true), debes describir al personaje respetando ESTRICTAMENTE su apariencia de la imagen de referencia (mismos rasgos faciales, peinado, ropa idéntica a la referencia).\n- FIDELIDAD FACIAL Y VELLO FACIAL: Observa con máxima atención el rostro del personaje en la imagen de referencia:\n  * Si el personaje TIENE barba, bigote o perilla (ej. barba completa, perilla, bigote), DEBES incluirlo y describirlo explícitamente en el prompt en inglés (ej: \"with matching dark beard as depicted in reference image\", \"bearded character matching reference\").\n  * Si el personaje en la referencia NO tiene barba (rostro limpio o afeitado), respeta el rostro limpio y NO agregues barba (\"clean-shaven smooth face\").\n  * En ningún caso contradigas la apariencia de la imagen de referencia.\n- En el prompt en inglés, usa descripciones como: \"the character strictly matching the reference image (same facial features, facial hair or beard if shown in reference or clean-shaven if shown clean-shaven, hair, and characteristic outfit)\".\n- PROHIBIDO cambiar la ropa a camiseta negra lisa por defecto a menos que esté en la referencia.";
        }
      } catch {}
    }
    const compositionRules = state.isInfographic ? "1. Para cada escena crea una composición 2D infográfica editorial: permite diagramas, flechas de flujo, esquemas, iconos y personajes gesticulando.\n2. NUNCA transcribas la frase completa del locutor dentro de la imagen.\n3. Cualquier rótulo breve o etiqueta debe estar 100% en español, nunca en inglés.\n4. Añade al prompt: \"all text and labels in image strictly in Spanish language, no English text\"." : "1. Para cada escena crea una toma natural a pantalla completa, cinematográfica o ilustrada según el estilo seleccionado.\n2. PROHIBIDO usar estética de infografía, whiteboard, diagrama, flechas, gráfico, tabla, póster educativo, iconos explicativos, cuadrícula editorial o fondo blanco de presentación.\n3. PROHIBIDO añadir texto, rótulos, etiquetas, subtítulos o tipografía dentro de la imagen.\n4. Añade al prompt: \"natural full-frame scene, no infographic layout, no diagram, no arrows, no labels, no text\".";
    const batchPromptText = Yn({
      batchScenes: batchScenes,
      totalScenes: totalScenes,
      styleConfig: state,
      attachedStyleRule: attachedStyleRule,
      attachedCharacterRule: attachedCharacterRule,
      compositionRules: compositionRules,
      hasCharacterRef: hasCharacterRef
    });
    try {
      items.push({
        text: batchPromptText
      });
      const response = await Ee("FLOW_GENERATE_TEXT", {
        model: project.textModel,
        parts: items
      }, 45000);
      const match = String(response.text || "").trim().match(/\[[\s\S]*\]/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      if (devLog != null) {
        devLog("⚠️", "Fallo en lote agrupado de prompts: " + error.message + ". Usando fallback individual...");
      }
    }
    return null;
  }, [devLog]);
  const generateVisualPrompts = React.useCallback(async (forceAll = !1) => {
    var characterReference7;
    var firstEntry;
    if (checkLicensed && !checkLicensed("la generación de prompts visuales con IA")) {
      return;
    }
    const state = w.getState();
    state.resetPromptGenCancel();
    const scenes = state.project.scenes || [];
    const filteredMap = scenes.map((item, index) => ({
      scene: item,
      globalIndex: index
    })).filter(({
      scene: scene
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
    const characterReference8 = ((characterReference7 = state.project.characterReference) == null ? undefined : characterReference7.enabled) !== !1 ? state.project.characterReference : null;
    const hasCharacterRef = Pe(characterReference8);
    const generateLocalPrompts = () => {
      let framing = null;
      filteredMap.forEach(({
        scene: scene6,
        globalIndex: globalIndex
      }) => {
        const script = scene6.script || scene6.caption || scene6.title || "Escena " + (globalIndex + 1);
        const scene7 = Jt(script, globalIndex, filteredMap.length, styleConfig, hasCharacterRef, {
          previousFraming: framing,
          styleKey: visualStyle,
          characterDescription: (characterReference8 == null ? undefined : characterReference8.name) || (characterReference8 == null ? undefined : characterReference8.description) || ""
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
        message: "✅ " + filteredMap.length + " prompts generados con AI Director 2.0."
      });
    };
    const flowState = w.getState().flowState;
    if (!flowState.connected) {
      if (devLog != null) {
        devLog("💡", "Flow no conectado: generando prompts locales ultra rápidos...");
      }
      generateLocalPrompts();
      return;
    }
    const length = filteredMap.length;
    let doneCount = 0;
    state.setPromptGenState({
      running: !0,
      done: 0,
      total: length,
      percent: 0,
      startedAt: Date.now(),
      currentSceneTitle: ((firstEntry = filteredMap[0]) == null ? undefined : firstEntry.scene.title) || "",
      message: "Generando prompts con IA (0/" + length + ")..."
    });
    setAssetState({
      status: "loading",
      message: "Generando prompts con IA (0/" + length + ")..."
    });
    try {
      const joined = scenes.map((item, index) => "Toma " + (index + 1) + ": \"" + (item.script || item.caption || item.title || "").trim() + "\"").filter(map => !map.endsWith("\"\"")).join("\n");
      const groupSize = 10;
      const items = [];
      for (let index = 0; index < filteredMap.length; index += groupSize) {
        items.push(filteredMap.slice(index, index + groupSize));
      }
      const value57 = Math.max(1, flowState.count || 1);
      const value58 = Math.min(6, Math.max(3, value57));
      for (let index = 0; index < items.length && !w.getState().promptGenCancelled; index += value58) {
        const activeGroups = items.slice(index, index + value58);
        await Promise.all(activeGroups.map(async item => {
          var previousItem;
          var scene;
          if (w.getState().promptGenCancelled) {
            return;
          }
          item.forEach(({
            scene: scene
          }) => updateScene(scene.id, {
            status: "prompt-generating"
          }));
          let batchResult = null;
          try {
            batchResult = await generateBatchPrompts(item.map(item => ({
              ...item.scene,
              globalIndex: item.globalIndex
            })), scenes.length, joined, styleConfig);
          } catch (error) {
            if (devLog != null) {
              devLog("⚠️", "Fallo en lote Gemini: " + error.message);
            }
          }
          for (let index = 0; index < item.length && !w.getState().promptGenCancelled; index++) {
            const {
              scene: scene8,
              globalIndex: globalIndex
            } = item[index];
            let found = batchResult ? batchResult.find(item => Number(item.sceneNumber) === globalIndex + 1) || batchResult[index] : null;
            if (found && found.prompt) {
              const finalPrompt = Ct(String(found.prompt).replace(/^[\"\']+|[\"\']+$/g, "").trim(), styleConfig, visualStyle);
              updateScene(scene8.id, {
                prompt: finalPrompt,
                hasCharacter: found.hasCharacter !== !1,
                shotType: found.shotType || (found.hasCharacter !== !1 ? "A-ROLL" : "B-ROLL"),
                framing: found.framing || "Medium Shot",
                motion: found.motion || "gentle-zoom-in",
                status: scene8.imageUrl || scene8.videoUrl ? "ready" : "idle"
              });
            } else {
              const script = scene8.script || scene8.caption || scene8.title || "Escena " + (globalIndex + 1);
              const framing = index > 0 ? (scene = (previousItem = item[index - 1]) == null ? undefined : previousItem.scene) == null ? undefined : scene.framing : null;
              const scene9 = Jt(script, globalIndex, scenes.length, styleConfig, hasCharacterRef, {
                previousFraming: framing,
                styleKey: visualStyle,
                characterDescription: (characterReference8 == null ? undefined : characterReference8.name) || (characterReference8 == null ? undefined : characterReference8.description) || ""
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
              running: !0,
              done: doneCount,
              total: length,
              percent: Math.round(doneCount / length * 100),
              currentSceneTitle: scene8.title,
              message: "Generando prompts IA (" + doneCount + "/" + length + "): \"" + scene8.title + "\"..."
            });
          }
        }));
      }
    } finally {
      w.getState().project.scenes.forEach(scene => {
        if (scene.status === "prompt-generating") {
          updateScene(scene.id, {
            status: scene.imageUrl || scene.videoUrl ? "ready" : "idle"
          });
        }
      });
      const promptGenCancelled = w.getState().promptGenCancelled;
      state.setPromptGenState({
        running: !1,
        done: doneCount,
        total: length,
        percent: 100,
        currentSceneTitle: "",
        message: promptGenCancelled ? "Prompts detenidos." : "¡Todos los prompts listos!"
      });
      setAssetState({
        status: "ready",
        message: promptGenCancelled ? "Prompts detenidos." : "¡" + doneCount + " prompts generados!"
      });
    }
  }, [checkLicensed, devLog, generateBatchPrompts, setAssetState, updateScene]);
  const generateAllImages = React.useCallback(async (retryFailedOnly = !1, forceRegenerateAll = !1) => {
    var electronAPI;
    var firstChunk;
    if (checkLicensed && !checkLicensed("la generación de imágenes en lote")) {
      return;
    }
    const state = w.getState();
    const project4 = state.project;
    if (project4.scenes.some(scene => scene.operationId)) {
      return setAssetState({
        status: "error",
        message: "Espera a que termine la generación en curso."
      });
    }
    const flowState = state.flowState;
    if (!flowState.connected) {
      if (devLog != null) {
        devLog("🔗", "Abriendo Google Flow para conectar...");
      }
      if ((electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
        window.electronAPI.openGoogleFlow();
      }
    }
    state.resetBatchCancel();
    const value59 = Math.max(0, (Number(state.batchStartScene) || 1) - 1);
    const filteredScenes = project4.scenes.filter(scene => {
      var prompt;
      return !scene.isStockMotion && (scene.script || scene.title || scene.caption) && ((prompt = scene.prompt) == null || !prompt.trim());
    });
    if (filteredScenes.length > 0) {
      if (devLog != null) {
        devLog("💡", "Auto-generando " + filteredScenes.length + " prompts faltantes antes del lote...");
      }
      await generateVisualPrompts(false);
    }
    w.getState().project.scenes.forEach((scene, index) => {
      var prompt;
      if (((prompt = scene.prompt) == null || !prompt.trim()) && !scene.isStockMotion) {
        const script = scene.script || scene.caption || scene.title || "Escena " + (index + 1);
        const styleConfig = Mt(project4.visualStyle || "western-anime", project4.customStyle);
        const qualitySuffix = styleConfig.isInfographic ? "crisp high-resolution editorial linework" : "natural full-frame composition, high detail";
        const finalPrompt = (styleConfig.characterPrompt || "Illustration of a character").replace("[acción]", script) + ", " + (styleConfig.promptSuffix || "clean style") + ", " + qualitySuffix;
        updateScene(scene.id, {
          prompt: finalPrompt
        });
      }
    });
    const project5 = w.getState().project;
    let filter = project5.scenes.map((scene, index) => ({
      scene: scene,
      index: index
    })).filter(({
      scene: scene,
      index: index
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
      scene: scene
    }) => scene);
    if (!filter.length) {
      if (project5.scenes.every(scene => scene.imageUrl || scene.videoUrl) && !forceRegenerateAll) {
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
        devLog("☁️", "Subiendo referencia de " + (isCustomStyle ? "estilo" : "personaje") + " a Google Flow una sola vez para todo el lote...");
      }
      try {
        const response = await Ee("FLOW_UPLOAD_INGREDIENT", {
          data: customStyle.base64,
          mimeType: customStyle.mimeType || "image/jpeg",
          name: customStyle.name || (isCustomStyle ? "style_ref.jpg" : "character_ref.jpg")
        }, 30000);
        const mediaId = (response == null ? undefined : response.mediaId) || (response == null ? undefined : response.name);
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
            devLog("✅", "Ingrediente listo para las " + filter.length + " escenas: " + mediaId.slice(0, 35) + "...");
          }
        }
      } catch (error) {
        if (devLog != null) {
          devLog("⚠️", "Subida previa a Flow: " + error.message);
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
      devLog("🚀", "Lote inteligente: " + length + " escenas en " + items23.length + " grupo(s) de hasta " + chunkSize + " imgs (" + value61 + " cuenta(s) activa(s))");
    }
    setBatchState({
      running: !0,
      done: 0,
      total: filter.length,
      startedAt: Date.now(),
      currentChunk: 1,
      totalChunks: items23.length,
      chunkDone: 0,
      chunkSize: ((firstChunk = items23[0]) == null ? undefined : firstChunk.length) || 0,
      failures: [],
      message: "Iniciando generación con " + value61 + " cuenta(s) en " + items23.length + " lote(s)..."
    });
    try {
      for (let index = 0; index < items23.length && !w.getState().batchCancelled; index++) {
        const chunk = items23[index];
        const chunkNumber = index + 1;
        const length = items23.length;
        const firstSceneNumber = project5.scenes.findIndex(scene => scene.id === chunk[0].id) + 1;
        const lastSceneNumber = project5.scenes.findIndex(scene => scene.id === chunk[chunk.length - 1].id) + 1;
        if (devLog != null) {
          devLog("📦", "Lote " + chunkNumber + "/" + length + ": escenas " + firstSceneNumber + "–" + lastSceneNumber + " (" + chunk.length + " imgs)");
        }
        setBatchState(prev => ({
          ...prev,
          running: !0,
          currentChunk: chunkNumber,
          totalChunks: length,
          chunkDone: 0,
          chunkSize: chunk.length,
          message: "Lote " + chunkNumber + "/" + length + ": procesando " + chunk.length + " imágenes (Escenas " + firstSceneNumber + " a " + lastSceneNumber + ")..."
        }));
        let chunkDoneCount = 0;
        const processScene = async scene => {
          if (w.getState().batchCancelled) {
            return;
          }
          while (w.getState().batchPaused && !w.getState().batchCancelled) {
            setBatchState(prev => ({
              ...prev,
              message: "Generación pausada. Puedes continuar cuando quieras."
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
            const hasCharacter = scene.hasCharacter !== !1;
            const flowResult = await requestFlowImage(scene.prompt, (attempt, maxAttempts) => setBatchState(prev => ({
              ...prev,
              message: "Lote " + chunkNumber + "/" + length + " · " + scene.title + ": reintento (" + attempt + "/" + maxAttempts + ")..."
            })), hasCharacter);
            await imageUrl(scene, id, flowResult, project5.format);
            if (devLog != null) {
              devLog("✅", "\"" + scene.title + "\" lista | ref: " + (flowResult.referenceUsed ? "SÍ" : "NO"));
            }
            successCount++;
          } catch (error) {
            finishSceneOperation(scene.id, id, {
              status: "image-error",
              error: error.message
            });
            if (devLog != null) {
              devLog("❌", "\"" + scene.title + "\" falló: " + error.message);
            }
            items24.push({
              title: scene.title,
              error: error.message
            });
          } finally {
            const scene = w.getState().project.scenes.find(scene => scene.id === scene.id);
            if (scene && (scene.operationId === id || scene.status === "image-generating")) {
              updateScene(scene.id, {
                operationId: "",
                status: scene.imageUrl || scene.videoUrl ? "ready" : scene.status === "image-generating" ? "image-error" : scene.status
              });
            }
          }
          doneCount++;
          chunkDoneCount++;
          setBatchState(prev => ({
            ...prev,
            done: doneCount,
            chunkDone: chunkDoneCount,
            message: "Lote " + chunkNumber + "/" + length + " en progreso: " + chunkDoneCount + "/" + chunk.length + " listas (" + doneCount + "/" + filter.length + " total)"
          }));
        };
        await Promise.all(chunk.map(async (item, index) => {
          if (index > 0) {
            await Ye(index * value62);
          }
          return processScene(item);
        }));
        if (w.getState().batchCancelled) {
          break;
        }
        if (index + 1 < items23.length) {
          if (devLog != null) {
            devLog("⏳", "Lote " + chunkNumber + "/" + length + " completo (" + chunk.length + " imágenes listas en timeline). Pausa fija de enfriamiento...");
          }
          const value = Math.round(wa / 1000);
          for (let index = value; index > 0 && !w.getState().batchCancelled; index--) {
            setBatchState(prev => ({
              ...prev,
              message: "✅ Lote " + chunkNumber + "/" + length + " completado (" + chunk.length + " listas en timeline). Enfriando " + index + "s antes del Lote " + (chunkNumber + 1) + "..."
            }));
            await Ye(1000);
          }
        }
      }
    } finally {
      w.getState().project.scenes.forEach(scene => {
        if (scene.status === "image-generating" || scene.operationId) {
          updateScene(scene.id, {
            status: scene.imageUrl || scene.videoUrl ? "ready" : "idle",
            operationId: ""
          });
        }
      });
      setBatchState(prev => ({
        ...prev,
        running: !1
      }));
    }
    const batchCancelled = w.getState().batchCancelled;
    setAssetState({
      status: items24.length || batchCancelled ? "error" : "ready",
      message: batchCancelled ? "Generación detenida por el usuario." : items24.length ? items24.length + " imágenes fallaron. Usa \"Reintentar fallidas\"." : "✅ ¡Todos los lotes listos! " + successCount + " imágenes generadas con éxito."
    });
  }, [checkLicensed, devLog, requestFlowImage, generateVisualPrompts, finishSceneOperation, imageUrl, setAssetState, setBatchState, updateProject, updateScene]);
  const runAutoPipeline = React.useCallback(async (forceAll = !1) => {
    var captionTrack;
    var audioTrack;
    if (checkLicensed && !checkLicensed("el Auto-Piloto Total")) {
      return;
    }
    const state = w.getState();
    const project6 = state.project;
    if (project6.scenes.some(scene => scene.operationId)) {
      return setAssetState({
        status: "error",
        message: "Espera a que termine la generación en curso."
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
    const cues = ((captionTrack = project6.captionTrack) == null ? undefined : captionTrack.cues) || [];
    if (cues.length > 0 && project6.scenes.length <= 3 && cues.length > 3) {
      if (devLog != null) {
        devLog("🎙️", "Auto-Piloto: Sincronizando frases desde el guion SRT...");
      }
      const timedCues = gt(cues, (audioTrack = project6.audioTrack) == null ? undefined : audioTrack.durationMs);
      if (timedCues.length > 0) {
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
      }
    }
    const project7 = w.getState().project;
    const isCustomStyle = project7.visualStyle === "custom-style" && Pe(project7.customStyle);
    const customStyle = isCustomStyle ? project7.customStyle : project7.characterReference;
    if (Pe(customStyle) && !customStyle.flowMediaId && customStyle.base64) {
      try {
        if (devLog != null) {
          devLog("☁️", "Subiendo referencia de " + (isCustomStyle ? "estilo" : "personaje") + " a Google Flow...");
        }
        const response = await Ee("FLOW_UPLOAD_INGREDIENT", {
          data: customStyle.base64,
          mimeType: customStyle.mimeType || "image/jpeg",
          name: customStyle.name || (isCustomStyle ? "style_ref.jpg" : "character_ref.jpg")
        }, 30000);
        const mediaId = (response == null ? undefined : response.mediaId) || (response == null ? undefined : response.name);
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
          devLog("⚠️", "Subida de ingrediente: " + error.message);
        }
      }
    }
    const scenes = w.getState().project.scenes;
    const length = scenes.filter(item => !item.isStockMotion && (item.script || item.title || item.caption)).length;
    const value63 = Math.max(1, flowState.count || 1);
    const value64 = length <= 20 ? 1 : Math.min(value63, Math.ceil(length / 20));
    const chunkSize = Math.max(1, Number(state.batchChunkSize) || 20) * value64;
    const value65 = Math.max(40, Math.round(Sa / value64));
    setBatchState({
      running: !0,
      done: 0,
      total: length,
      startedAt: Date.now(),
      currentChunk: 1,
      totalChunks: Math.ceil(length / chunkSize) || 1,
      chunkDone: 0,
      chunkSize: chunkSize,
      failures: [],
      message: "🚀 Auto-Piloto: generando prompts e imágenes (" + (value64 > 1 ? value64 + " cuentas en paralelo" : "1 cuenta") + ")..."
    });
    if (devLog != null) {
      devLog("🚀", "Iniciando Pipeline Dual Auto-Piloto (" + length + " escenas)...");
    }
    let promptsDone = !1;
    const promptPipeline = (async () => {
      try {
        await generateVisualPrompts(forceAll);
      } catch (error) {
        if (devLog != null) {
          devLog("⚠️", "Error en generador de prompts: " + error.message);
        }
      } finally {
        promptsDone = !0;
      }
    })();
    let set = new Set(forceAll ? [] : scenes.filter(scene => scene.imageUrl || scene.videoUrl).map(filter => filter.id));
    let size = set.size;
    let successCount = 0;
    let items = [];
    let chunkIndex = 0;
    const imagePipeline = (async () => {
      while (!w.getState().batchCancelled) {
        const project = w.getState().project;
        const scenes = project.scenes;
        scenes.forEach(scene => {
          if ((scene.imageUrl || scene.videoUrl) && !set.has(scene.id)) {
            set.add(scene.id);
          }
        });
        const items25 = scenes.filter(item => !item.isStockMotion && !set.has(item.id) && item.prompt && item.prompt.trim().length > 0 && !item.operationId);
        const length2 = scenes.filter(item => !item.isStockMotion && !set.has(item.id) && (item.script || item.title || item.caption)).length;
        if (length2 === 0) {
          if (devLog != null) {
            devLog("🏁", "Todas las imágenes han sido generadas en el Auto-Piloto.");
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
        const firstSceneNumber = scenes.findIndex(item => item.id === chunk[0].id) + 1;
        const lastSceneNumber = scenes.findIndex(item => item.id === chunk[chunk.length - 1].id) + 1;
        if (devLog != null) {
          devLog("📦", "Auto-Piloto Lote " + chunkIndex + "/" + value66 + ": escenas " + firstSceneNumber + "–" + lastSceneNumber + " (" + chunk.length + " imgs)");
        }
        setBatchState(prev => ({
          ...prev,
          running: true,
          currentChunk: chunkIndex,
          totalChunks: value66,
          chunkDone: 0,
          chunkSize: chunk.length,
          message: "Lote " + chunkIndex + "/" + value66 + ": generando " + chunk.length + " imágenes (Escenas " + firstSceneNumber + " a " + lastSceneNumber + ")..."
        }));
        let chunkDoneCount = 0;
        const processScene = async scene => {
          if (w.getState().batchCancelled) {
            return;
          }
          while (w.getState().batchPaused && !w.getState().batchCancelled) {
            setBatchState(prev => ({
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
            const flowResult = await requestFlowImage(scene.prompt, (attempt, maxAttempts) => setBatchState(prev => ({
              ...prev,
              message: "Lote " + chunkIndex + "/" + value66 + " · " + scene.title + ": reintento (" + attempt + "/" + maxAttempts + ")..."
            })), hasCharacter);
            await imageUrl(scene, id, flowResult, project.format);
            if (devLog != null) {
              devLog("✅", "\"" + scene.title + "\" lista | ref: " + (flowResult.referenceUsed ? "SÍ" : "NO"));
            }
            successCount++;
          } catch (error) {
            finishSceneOperation(scene.id, id, {
              status: "image-error",
              error: error.message
            });
            if (devLog != null) {
              devLog("❌", "\"" + scene.title + "\" falló: " + error.message);
            }
            items.push({
              title: scene.title,
              error: error.message
            });
          } finally {
            const scene = w.getState().project.scenes.find(scene => scene.id === scene.id);
            if (scene && (scene.operationId === id || scene.status === "image-generating")) {
              updateScene(scene.id, {
                operationId: "",
                status: scene.imageUrl || scene.videoUrl ? "ready" : scene.status === "image-generating" ? "image-error" : scene.status
              });
            }
          }
          set.add(scene.id);
          size++;
          chunkDoneCount++;
          setBatchState(prev => ({
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
        if (scenes.some(item => !item.isStockMotion && !set.has(item.id))) {
          if (devLog != null) {
            devLog("⏳", "Auto-Piloto Lote " + chunkIndex + " completo (" + chunk.length + " imágenes listas en timeline). Pausa de enfriamiento...");
          }
          const value67 = Math.round(wa / 1000);
          for (let index = value67; index > 0 && !w.getState().batchCancelled; index--) {
            setBatchState(prev => ({
              ...prev,
              message: "✅ Lote " + chunkIndex + "/" + value66 + " completado (" + chunk.length + " listas en timeline). Enfriando " + index + "s antes del Lote " + (chunkIndex + 1) + "..."
            }));
            await Ye(1000);
          }
        }
      }
    })();
    try {
      await Promise.all([promptPipeline, imagePipeline]);
    } finally {
      w.getState().project.scenes.forEach(scene => {
        if (scene.status === "image-generating" || scene.operationId) {
          updateScene(scene.id, {
            status: scene.imageUrl || scene.videoUrl ? "ready" : "idle",
            operationId: ""
          });
        }
      });
      setBatchState(prev => ({
        ...prev,
        running: !1,
        message: ""
      }));
    }
    const batchCancelled = w.getState().batchCancelled;
    setAssetState({
      status: items.length || batchCancelled ? "error" : "ready",
      message: batchCancelled ? "Auto-Piloto detenido por el usuario." : items.length ? items.length + " imágenes fallaron. Usa \"Reintentar fallidas\"." : "✅ ¡Auto-Piloto completado con éxito! " + successCount + " imágenes generadas."
    });
  }, [checkLicensed, devLog, finishSceneOperation, requestFlowImage, generateVisualPrompts, imageUrl, setAssetState, setBatchState, updateProject, updateScene]);
  return {
    uploadImage: uploadImage,
    uploadCharacterReference: uploadCharacterReference,
    removeCharacterReference: removeCharacterReference,
    importVisualFilesToTimeline: importVisualFilesToTimeline,
    generateImage: generateImage,
    generateAllImages: generateAllImages,
    runAutoPipeline: runAutoPipeline,
    generateVisualPrompts: generateVisualPrompts
  };
};
const Vt = {
  "sticker-3d": {
    id: "sticker-3d",
    label: "Sticker 3D Brillante",
    icon: "💎",
    promptModifier: "glossy 3D isolated sticker badge, vibrant colors, clean studio lighting, isolated on solid black background, volumetric depth, ultra sharp, 8k resolution, no text"
  },
  "vector-minimal": {
    id: "vector-minimal",
    label: "Ilustración Vectorial",
    icon: "🎨",
    promptModifier: "clean modern 2D vector flat icon illustration, minimalist, vibrant palette, isolated on solid black background, bold graphic style, no text"
  },
  cinematic: {
    id: "cinematic",
    label: "Cinematográfico Realista",
    icon: "📸",
    promptModifier: "cinematic hyperrealistic object macro shot, isolated foreground, dark background, dramatic rim lighting, authentic textures, 8k, no text"
  },
  "pop-art": {
    id: "pop-art",
    label: "Emoji & Pop Art",
    icon: "⭐",
    promptModifier: "bold pop art graphic badge, vibrant thick outlines, colorful sticker aesthetic, isolated on solid black background, expressive, no text"
  }
};
const er = [{
  pattern: /\b(oportunidad|oportunidades|futuro|éxito|avanzar|crecer|crecimiento|triunfo|logro)\b/i,
  keyword: "Oportunidades y Éxito",
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
  keyword: "Reto y Obstáculo",
  prompt: "Cracked stone barrier bursting open with bright breakthrough golden rays, triumph over hardship",
  suggestedPosition: "center",
  suggestedScale: 0.6
}, {
  pattern: /\b(disfrutar|disfrutas|feliz|felicidad|alegría|sonreír|pasión|gratitud)\b/i,
  keyword: "Gratitud y Alegría",
  prompt: "Playful radiant sunshine badge bursting with golden spark rays and joyful warmth",
  suggestedPosition: "top-right",
  suggestedScale: 0.5
}, {
  pattern: /\b(tecnología|ia|robot|código|digital|futuro|pantalla|software|algoritmo)\b/i,
  keyword: "Tecnología e IA",
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
    const value68 = Number(cue.startMs !== undefined ? cue.startMs / 1000 : cue.startSeconds || 0);
    const value69 = Number(cue.endMs !== undefined ? cue.endMs / 1000 : cue.endSeconds || value68 + 3);
    const value70 = Math.max(1.8, Math.min(5, Number((value69 - value68).toFixed(1)) || 3));
    if (value68 < lastEndTime + 2.5) {
      return;
    }
    let er2 = er.find(er => er.pattern.test(string));
    if (!er2 && value68 >= lastEndTime + 8 && items27.length < cues) {
      const firstFilter = string.split(/\s+/).filter(split => split.length > 4)[0] || "Concepto";
      er2 = {
        keyword: firstFilter.charAt(0).toUpperCase() + firstFilter.slice(1),
        prompt: "Conceptual visual representation of \"" + firstFilter + "\", glowing minimalist floating object, elegant lighting",
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
  cues: cues,
  flowRequest: callback = null,
  flowConnected: flowConnected = !1,
  maxCandidates: maxCandidates = 6
}) {
  if (!Array.isArray(cues) || cues.length === 0) {
    return [];
  }
  if (flowConnected && typeof callback == "function") {
    try {
      const prompt = "Act as an expert YouTube video editor and visual effects director.\nHere is the subtitle script of a video clip:\n" + cues.slice(0, 50).map((slice, index) => "[ID:" + (slice.id || index) + " | " + ((slice.startMs || 0) / 1000).toFixed(1) + "s-" + ((slice.endMs || 0) / 1000).toFixed(1) + "s]: \"" + slice.text + "\"").join("\n") + "\n\nTask: Identify up to " + maxCandidates + " high-impact moments in the subtitles where a visual sticker / floating image overlay (b-roll graphic or visual metaphor) would best reinforce what the speaker is saying.\nRules:\n1. Space them out nicely (at least 3 to 6 seconds apart).\n2. For each selected cue, return a JSON array of objects with:\n   - \"cueId\": matching ID from input\n   - \"keyword\": short title in Spanish (1-3 words)\n   - \"concept\": an English image generation prompt describing an isolated, iconic visual sticker object on a solid dark background (no text, no typography).\n   - \"suggestedPosition\": \"top-right\", \"top-left\" or \"center\"\n   - \"suggestedScale\": number between 0.45 and 0.65\n\nRespond ONLY with a valid JSON array, no markdown fences, no conversational text.";
      const response = await callback("FLOW_GENERATE_TEXT", {
        model: "gemini-2.5-flash",
        parts: [{
          text: prompt
        }]
      }, 30000);
      const match = String((response == null ? undefined : response.text) || "").trim().match(/\[[\s\S]*\]/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item, index) => {
            const found = cues.find(item2 => String(item2.id) === String(item.cueId)) || cues[index] || {};
            const value71 = Number(found.startMs !== undefined ? found.startMs / 1000 : found.startSeconds || 0);
            const value72 = Number(found.endMs !== undefined ? found.endMs / 1000 : found.endSeconds || value71 + 3);
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
              selected: !0
            };
          });
        }
      }
    } catch {}
  }
  return Ka(cues, maxCandidates);
}
const _Component3 = ({
  isOpen: isOpen,
  onClose: onClose,
  cues: cues = []
}) => {
  const project = w(state => state.project);
  const flowState = w(state => state.flowState);
  const addOverlay = w(state => state.addOverlay);
  const [candidates, setCandidates] = React.useState([]);
  const [selectedStyle, setSelectedStyle] = React.useState("sticker-3d");
  const [isAnalyzing, setIsAnalyzing] = React.useState(!1);
  const [isGenerating, setIsGenerating] = React.useState(!1);
  const [progress, setProgress] = React.useState({
    done: 0,
    total: 0,
    current: ""
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  React.useEffect(() => {
    if (!isOpen) {
      setCandidates([]);
      setIsGenerating(!1);
      setErrorMessage("");
      return;
    }
    (async () => {
      setIsAnalyzing(!0);
      try {
        const chunks = Ka(cues, 7);
        setCandidates(chunks);
        if (flowState != null && flowState.connected) {
          const aiCandidates = await tr({
            cues: cues,
            flowRequest: Ee,
            flowConnected: !0,
            maxCandidates: 7
          });
          if (Array.isArray(aiCandidates) && aiCandidates.length > 0) {
            setCandidates(aiCandidates);
          }
        }
      } catch (error) {
        console.error("Error al analizar subtítulos para overlays:", error);
      } finally {
        setIsAnalyzing(!1);
      }
    })();
  }, [isOpen, cues, flowState == null ? undefined : flowState.connected]);
  if (!isOpen) {
    return null;
  }
  const length = candidates.filter(item => item.selected).length;
  const handleClick4 = () => {
    const matches = candidates.every(item => item.selected);
    setCandidates(indexes => indexes.map(item => ({
      ...item,
      selected: !matches
    })));
  };
  const toggleSelected = id => {
    setCandidates(indexes => indexes.map(item => item.id === id ? {
      ...item,
      selected: !item.selected
    } : item));
  };
  const updateConcept = (id, value) => {
    setCandidates(indexes => indexes.map(item => item.id === id ? {
      ...item,
      concept: value
    } : item));
  };
  const updatePosition = (id, value) => {
    setCandidates(indexes => indexes.map(item => item.id === id ? {
      ...item,
      suggestedPosition: value
    } : item));
  };
  const handleClick5 = async () => {
    var electronAPI;
    var firstImage;
    const items = candidates.filter(item => item.selected);
    if (!items.length) {
      setErrorMessage("Selecciona al menos una superposición para generar.");
      return;
    }
    if (flowState == null || !flowState.connected) {
      setErrorMessage("Google Flow no está conectado. Abre la ventana de conexión para generar imágenes con IA.");
      if ((electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
        window.electronAPI.openGoogleFlow();
      }
      return;
    }
    setIsGenerating(!0);
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
          current: overlay.keyword || "Superposición " + (index + 1)
        });
        const payload = {
          prompt: overlay.concept.trim() + ", " + vt.promptModifier,
          format: project.format || "short",
          aspectRatio: "1:1",
          model: project.imageModel || "nano-banana-2"
        };
        const response = await Ee("FLOW_GENERATE_IMAGE", payload, 90000);
        const imageUrl = (response == null ? undefined : response.imageUrl) || (response == null ? undefined : response.url) || (response == null ? undefined : response.mediaUrl) || (response == null ? undefined : response.images) && ((firstImage = response.images[0]) == null ? undefined : firstImage.url) || "";
        if (imageUrl) {
          const uploadedUrl = await Xa(imageUrl);
          const posX = overlay.suggestedPosition === "top-left" ? 22 : overlay.suggestedPosition === "center" ? 50 : 78;
          const posY = overlay.suggestedPosition === "center" ? 50 : 20;
          addOverlay({
            id: "ov_ai_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
            name: overlay.keyword || "Superposición IA",
            imageUrl: uploadedUrl || imageUrl,
            scale: overlay.suggestedScale || 0.55,
            position: overlay.suggestedPosition || "top-right",
            posX: posX,
            posY: posY,
            startSeconds: overlay.startSeconds,
            durationSeconds: overlay.durationSeconds,
            captionCueId: overlay.cueId,
            animation: "pop"
          });
        }
      }
      setIsGenerating(!1);
      onClose();
    } catch (error) {
      console.error("Fallo al generar superposiciones:", error);
      setErrorMessage("Error durante la generación: " + (error.message || "Fallo de conexión con Flow."));
      setIsGenerating(!1);
    }
  };
  return <div style={{
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "rgba(3, 7, 18, 0.85)",
    backdropFilter: "blur(14px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }} onClick={event => {
    if (event.target === event.currentTarget && !isGenerating) {
      onClose();
    }
  }}><div style={{
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
    }}><div style={{
        padding: "16px 22px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(90deg, rgba(139, 92, 246, 0.12), transparent)"
      }}><div style={{
          display: "flex",
          alignItems: "center",
          gap: 12
        }}><span style={{
            fontSize: 24
          }}>✨</span><div><h3 style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 800,
              color: "#fff"
            }}>Generador Inteligente de Superposiciones (Pista V2)</h3><p style={{
              margin: "2px 0 0",
              fontSize: 12,
              color: "#94a3b8"
            }}>Analiza tus subtítulos y crea imágenes / stickers sobre el video sincronizados con cada frase</p></div></div>{!isGenerating && <button type="button" onClick={onClose} style={{
          background: "transparent",
          border: "none",
          color: "#94a3b8",
          fontSize: 20,
          cursor: "pointer",
          padding: "4px 8px"
        }}>✕</button>}</div><div style={{
        padding: "18px 22px",
        overflowY: "auto",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 18
      }}><div><label style={{
            fontSize: 12,
            fontWeight: 800,
            color: "#cbd5e1",
            display: "block",
            marginBottom: 8
          }}>🎨 Estilo Visual de las Superposiciones</label><div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8
          }}>{Object.values(Vt).map(value => {
              const isSelectedStyle = selectedStyle === value.id;
              return <button type="button" onClick={() => setSelectedStyle(value.id)} disabled={isGenerating} style={{
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
              }} key={value.id}><span style={{
                  fontSize: 20
                }}>{value.icon}</span><span style={{
                  fontSize: 11,
                  fontWeight: 700
                }}>{value.label}</span></button>;
            })}</div></div><div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 4,
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
        }}><div style={{
            display: "flex",
            alignItems: "center",
            gap: 10
          }}><span style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0"
            }}>💡 Momentos Detectados ({candidates.length})</span><span style={{
              fontSize: 11,
              fontWeight: 700,
              color: length > 0 ? "#a78bfa" : "#64748b",
              background: length > 0 ? "rgba(139, 92, 246, 0.15)" : "transparent",
              padding: "2px 8px",
              borderRadius: 12
            }}>{length} seleccionada{length === 1 ? "" : "s"}</span></div><button type="button" onClick={handleClick4} disabled={isGenerating || candidates.length === 0} style={{
            background: "transparent",
            border: "none",
            color: "#818cf8",
            fontSize: 11.5,
            fontWeight: 700,
            cursor: "pointer"
          }}>{candidates.every(item => item.selected) ? "Deseleccionar Todos" : "Seleccionar Todos"}</button></div>{isAnalyzing ? <div style={{
          textAlign: "center",
          padding: "30px 0",
          color: "#a5b4fc"
        }}><span style={{
            display: "inline-block",
            fontSize: 24,
            marginBottom: 8,
            animation: "spin 2s linear infinite"
          }}>✦</span><p style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700
          }}>Analizando subtítulos y detectando momentos visuales...</p></div> : candidates.length === 0 ? <div style={{
          textAlign: "center",
          padding: "30px 20px",
          color: "#64748b"
        }}><span style={{
            fontSize: 28,
            display: "block",
            marginBottom: 8
          }}>📝</span><p style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 600
          }}>No se detectaron frases de subtítulos en el proyecto. Transcribe o importa subtítulos en la pista TXT primero.</p></div> : <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}>{candidates.map((overlay, index) => <div style={{
            display: "flex",
            gap: 12,
            padding: 12,
            borderRadius: 10,
            border: overlay.selected ? "1px solid rgba(139, 92, 246, 0.4)" : "1px solid rgba(255, 255, 255, 0.05)",
            background: overlay.selected ? "rgba(139, 92, 246, 0.08)" : "rgba(255, 255, 255, 0.015)",
            transition: "all 0.15s"
          }} key={overlay.id || index}><div style={{
              paddingTop: 2
            }}><input type="checkbox" checked={overlay.selected} onChange={() => toggleSelected(overlay.id)} disabled={isGenerating} style={{
                width: 17,
                height: 17,
                accentColor: "#8b5cf6",
                cursor: "pointer"
              }} /></div><div style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}><div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 6
              }}><div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}><span style={{
                    fontSize: 10,
                    fontWeight: 800,
                    fontFamily: "monospace",
                    background: "rgba(0, 0, 0, 0.4)",
                    color: "#c4b5fd",
                    padding: "2px 6px",
                    borderRadius: 4,
                    border: "1px solid rgba(139, 92, 246, 0.25)"
                  }}>⏱️ {overlay.startSeconds}s - {(overlay.startSeconds + overlay.durationSeconds).toFixed(1)}s</span><span style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "#fff"
                  }}>{overlay.keyword}</span></div><div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}><select value={overlay.suggestedPosition} onChange={event => updatePosition(overlay.id, event.target.value)} disabled={isGenerating} style={{
                    padding: "2px 6px",
                    fontSize: 10.5,
                    background: "#181d29",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 4,
                    color: "#cbd5e1"
                  }}><option value="top-right">↗ Sup. Der</option><option value="top-left">↖ Sup. Izq</option><option value="center">🎯 Centro</option><option value="bottom-right">↘ Inf. Der</option></select><span style={{
                    fontSize: 10.5,
                    color: "#94a3b8"
                  }}>{Math.round((overlay.suggestedScale || 0.55) * 100)}%</span></div></div><div style={{
                fontSize: 11.5,
                fontStyle: "italic",
                color: "#94a3b8",
                background: "rgba(0, 0, 0, 0.25)",
                padding: "4px 8px",
                borderRadius: 4
              }}>"{overlay.cueText}"</div><div><input type="text" value={overlay.concept} onChange={event => updateConcept(overlay.id, event.target.value)} disabled={isGenerating} placeholder="Prompt visual en inglés..." style={{
                  width: "100%",
                  padding: "5px 8px",
                  fontSize: 11,
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 4,
                  color: "#cbd5e1"
                }} /></div></div></div>)}</div>}{errorMessage && <div style={{
          padding: "8px 12px",
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: 8,
          color: "#fca5a5",
          fontSize: 12
        }}>⚠️ {errorMessage}</div>}{isGenerating && <div style={{
          padding: 12,
          borderRadius: 10,
          background: "rgba(139, 92, 246, 0.1)",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}><div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            fontWeight: 700
          }}><span style={{
              color: "#c4b5fd"
            }}>Generando con IA ({progress.done + 1} de {progress.total}): {progress.current}...</span><span style={{
              fontFamily: "monospace",
              color: "#818cf8"
            }}>{Math.round(progress.done / Math.max(1, progress.total) * 100)}%</span></div><div style={{
            width: "100%",
            height: 6,
            background: "rgba(0, 0, 0, 0.4)",
            borderRadius: 3,
            overflow: "hidden"
          }}><div style={{
              height: "100%",
              width: Math.round(progress.done / Math.max(1, progress.total) * 100) + "%",
              background: "linear-gradient(90deg, #8b5cf6, #c084fc)",
              transition: "width 0.3s ease"
            }} /></div></div>}</div><div style={{
        padding: "14px 22px",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255, 255, 255, 0.015)"
      }}><button type="button" onClick={onClose} disabled={isGenerating} style={{
          padding: "7px 14px",
          background: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 6,
          color: "#cbd5e1",
          fontSize: 12,
          fontWeight: 700,
          cursor: isGenerating ? "not-allowed" : "pointer"
        }}>Cancelar</button><button type="button" onClick={handleClick5} disabled={isGenerating || length === 0} style={{
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
        }}><span>✨</span><span>{isGenerating ? "Generando (" + (progress.done + 1) + "/" + progress.total + ")..." : "Generar " + length + " Superposici" + (length === 1 ? "ón" : "ones") + " en Pista V2"}</span></button></div></div></div>;
};
const je = 56;
const Ht = 96;
const Nt = 0.5;
const Gt = 200;
const nr = 3;
const rr = pixelsPerSecond => [0.2, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 1200].find(item => item * pixelsPerSecond >= 68) || 1200;
const Zt = ({
  scenes: scenes,
  fps: fps,
  durationInFrames: durationInFrames,
  selectedId: selectedId,
  playerRef: playerRef,
  onSelectScene: onSelectScene,
  audioTrack: audioTrack,
  musicTrack: musicTrack,
  captionTrack: captionTrack,
  onUploadAudio: onUploadAudio,
  onUploadMusic: onUploadMusic,
  onImportSrt: onImportSrt,
  onTranscribeAudio: onTranscribeAudio,
  onCreateScenesFromTranscript: onCreateScenesFromTranscript,
  onOpenBatchPromptsModal: onOpenBatchPromptsModal,
  onUploadImage: onUploadImage
}) => {
  var cues6;
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [pixelsPerSecond, setPixelsPerSecond] = React.useState(65);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [fitToWidthPending, setFitToWidthPending] = React.useState(!1);
  const [resizingSceneId, setResizingSceneId] = React.useState(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = React.useState(!1);
  const [snapEnabled, setSnapEnabled] = React.useState(!0);
  const [highQualityPreview, setHighQualityPreview] = React.useState(!1);
  const [isPreviewMuted, setIsPreviewMuted] = React.useState(!1);
  const [collapsedTracks, setCollapsedTracks] = React.useState({
    v2: !1,
    v1: !1,
    cc: !1,
    fx: !1,
    a1: !1,
    a2: !1
  });
  const [dragSourceIndex, setDragSourceIndex] = React.useState(null);
  const [dragOverIndex, setDragOverIndex] = React.useState(null);
  const [unusedState1, setUnusedState1] = React.useState(null);
  const [isCaptionDragOver, setIsCaptionDragOver] = React.useState(!1);
  const [isAudioDragOver, setIsAudioDragOver] = React.useState(!1);
  const [isMusicDragOver, setIsMusicDragOver] = React.useState(!1);
  const [contextMenu, setContextMenu] = React.useState(null);
  const divRef2 = React.useRef(null);
  const inputRef2 = React.useRef(null);
  const [uploadTargetSceneId, setUploadTargetSceneId] = React.useState(null);
  const triggerImageUpload = selectedId2 => {
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
  const handleChange2 = event => {
    var files;
    var firstScene;
    const file = (files = event.target.files) == null ? undefined : files[0];
    if (file) {
      const id = uploadTargetSceneId || selectedId || ((firstScene = items28[0]) == null ? undefined : firstScene.id);
      if (onUploadImage) {
        onUploadImage(id, file);
      }
    }
    event.target.value = "";
  };
  const ref = React.useRef(!1);
  const divRef3 = React.useRef(null);
  const updateScene = w(state => state.updateScene);
  const updateProject = w(state => state.updateProject);
  const addSceneAt = w(state => state.addSceneAt);
  const removeScene = w(state => state.removeScene);
  const duplicateScene = w(state => state.duplicateScene);
  const reorderScenes = w(state => state.reorderScenes);
  const splitScene = w(state => state.splitScene);
  const handleClick6 = w(state => state.removeAudioTrack);
  const handleClick7 = w(state => state.removeMusicTrack);
  const handleClick8 = w(state => state.clearCaptions);
  const handleClick9 = w(state => state.syncScenesToCaptions);
  const assetState = w(state => state.assetState);
  const handleClick10 = w(state => state.undo);
  const handleClick11 = w(state => state.redo);
  const canUndo = w(state => {
    var past;
    return (((past = state.past) == null ? undefined : past.length) || 0) > 0;
  });
  const canRedo = w(state => {
    var future;
    return (((future = state.future) == null ? undefined : future.length) || 0) > 0;
  });
  const isTranscribing = assetState.operation === "transcription" && assetState.status === "loading";
  const overlays = w(state => {
    var project;
    return ((project = state.project) == null ? undefined : project.overlays) || [];
  });
  const addOverlay = w(state => state.addOverlay);
  const removeOverlay = w(state => state.removeOverlay);
  const [selectedOverlayId, setSelectedOverlayId] = React.useState(null);
  const [isAiOverlayModalOpen, setIsAiOverlayModalOpen] = React.useState(!1);
  const inputRef3 = React.useRef(null);
  const handleChange3 = async event => {
    var files;
    const file = (files = event.target.files) == null ? undefined : files[0];
    if (file) {
      try {
        const headers = {
          "Content-Type": file.type || "application/octet-stream",
          "x-filename": encodeURIComponent(file.name)
        };
        const response = await fetch("http://127.0.0.1:4322/api/import", {
          method: "POST",
          headers: headers,
          body: file
        }).catch(() => fetch("/api/import", {
          method: "POST",
          headers: headers,
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
  const revealInFolder = async sceneId => {
    var electronAPI;
    var revealMediaInFolder;
    const found = items28.find(item => item.id === sceneId);
    const videoUrl = (found == null ? undefined : found.videoUrl) || (found == null ? undefined : found.imageUrl) || "";
    if (!videoUrl) {
      return;
    }
    const result = await ((revealMediaInFolder = (electronAPI = window.electronAPI) == null ? undefined : electronAPI.revealMediaInFolder) == null ? undefined : revealMediaInFolder.call(electronAPI, videoUrl));
    if (result == null || !result.ok) {
      window.alert((result == null ? undefined : result.error) || "Solo los recursos guardados localmente pueden abrirse en carpeta.");
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
  const value79 = Math.max(1, Math.min(2000, Math.floor(value75 / step) + 1));
  const items29 = React.useMemo(() => Array.from({
    length: value79
  }, (unusedIndex, index) => index * step), [value79, step]);
  const cues7 = (cues6 = captionTrack == null ? undefined : captionTrack.cues) != null && cues6.length ? captionTrack.cues : timelineEntries.filter(item => item.scene.caption).map(filter => ({
    id: filter.scene.id,
    text: filter.scene.caption,
    startMs: filter.startSeconds * 1000,
    endMs: (filter.startSeconds + filter.durationSeconds) * 1000
  }));
  React.useEffect(() => {
    const current = playerRef.current;
    if (!current) {
      return;
    }
    const handleFrameUpdate = state => setCurrentFrame(Math.max(0, Math.min(durationInFrames - 1, state.detail.frame)));
    current.addEventListener("frameupdate", handleFrameUpdate);
    current.addEventListener("seeked", handleFrameUpdate);
    setCurrentFrame(current.getCurrentFrame());
    return () => {
      current.removeEventListener("frameupdate", handleFrameUpdate);
      current.removeEventListener("seeked", handleFrameUpdate);
    };
  }, [durationInFrames, playerRef]);
  const value80 = React.useCallback(width => {
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
    setFitToWidthPending(!1);
    setPixelsPerSecond(prev => {
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
  const handleWheel = event => {
    const current = divRef3.current;
    if (current) {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        const rect = current.getBoundingClientRect();
        const offsetX = event.clientX - rect.left + current.scrollLeft - je;
        const value82 = Math.max(0, Math.min(value75, offsetX / value76));
        const zoomFactor = event.deltaY < 0 ? 1.18 : 0.85;
        setZoomKeepingAnchor(prev => prev * zoomFactor, value82);
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
  const handleMouseDown2 = React.useCallback(event => {
    const current = divRef3.current;
    if (!current || !playerRef.current) {
      return;
    }
    const rect = current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left + current.scrollLeft - je;
    let value83 = Math.max(0, Math.min(value75, offsetX / value76));
    if (snapEnabled) {
      const items = [0, value75, ...timelineEntries.flatMap(overlay => [overlay.startSeconds, overlay.startSeconds + overlay.durationSeconds])];
      const total = items.reduce((acc, item) => Math.abs(item - value83) < Math.abs(acc - value83) ? item : acc, items[0]);
      if (Math.abs(total - value83) <= Math.max(0.08, 8 / value76)) {
        value83 = total;
      }
    }
    const value84 = Math.round(value83 * value73);
    playerRef.current.seekTo(value84);
    setCurrentFrame(value84);
  }, [value76, playerRef, value73, timelineEntries, snapEnabled, value75]);
  const handleMouseDown3 = event => {
    event.preventDefault();
    ref.current = !0;
    handleMouseDown2(event);
    const handleMouseMove = event => {
      if (ref.current) {
        handleMouseDown2(event);
      }
    };
    const handleMouseUp = () => {
      ref.current = !1;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleResizeStart = (event, id, duration) => {
    event.stopPropagation();
    setResizingSceneId(id);
    const found = timelineEntries.find(item => item.scene.id === id);
    const startSeconds = found ? found.startSeconds : 0;
    const currentTimeSeconds = currentFrame / value73;
    const items = [];
    if (snapEnabled) {
      items.push(currentTimeSeconds);
      if (audioTrack != null && audioTrack.duration) {
        items.push(Number(audioTrack.duration));
      }
      if (Array.isArray(cues7)) {
        cues7.forEach(cue => {
          if (typeof cue.startMs == "number") {
            items.push(cue.startMs / 1000);
          }
          if (typeof cue.endMs == "number") {
            items.push(cue.endMs / 1000);
          }
        });
      }
    }
    const handleResizeMove = event2 => {
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
  const toggleTrackCollapsed = trackKey => {
    setCollapsedTracks(prev => ({
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
      if ((mute = (current4 = playerRef.current) == null ? undefined : current4.mute) != null) {
        mute.call(current4);
      }
    } else if ((unmute = (current5 = playerRef.current) == null ? undefined : current5.unmute) != null) {
      unmute.call(current5);
    }
  };
  const handleClick14 = () => {
    const found = timelineEntries.find(item => item.scene.id === selectedId);
    if (!found) {
      return;
    }
    const relativeTime = currentFrame / value73 - found.startSeconds;
    const splitRatio = relativeTime > 0 && relativeTime < found.durationSeconds ? relativeTime / found.durationSeconds : 0.5;
    splitScene(found.scene.id, Math.max(0.12, Math.min(0.88, splitRatio)));
  };
  items28.filter(item => item.motion && item.motion !== "still").length;
  return <div className="horizontal-timeline-container"><input type="file" ref={inputRef2} accept="image/*,video/*,.mp4,.webm,.mov,.m4v,.mkv,.png,.jpg,.jpeg,.webp" style={{
      display: "none"
    }} onChange={handleChange2} /><div className="timeline-toolbar-row"><div className="timeline-edit-tools"><button type="button" className="timeline-icon-btn timeline-tool-labeled" onClick={handleClick10} disabled={!canUndo} title="Deshacer (Ctrl+Z)"><span>↶</span>Deshacer</button><button type="button" className="timeline-icon-btn timeline-tool-labeled" onClick={handleClick11} disabled={!canRedo} title="Rehacer (Ctrl+Y)"><span>↷</span>Rehacer</button><span className="timeline-toolbar-divider" /><button type="button" className="timeline-icon-btn timeline-tool-labeled" onClick={handleClick14} disabled={!selectedId} title="Dividir la escena seleccionada en el cabezal (S)"><span>✂</span>Cortar</button><button type="button" className="timeline-icon-btn timeline-tool-labeled" onClick={() => triggerImageUpload(selectedId)} disabled={!selectedId} title="Reemplazar imagen o video de la escena seleccionada con un archivo de tu PC"><span>📁</span>Reemplazar</button><button type="button" className="timeline-icon-btn timeline-tool-labeled danger" onClick={() => selectedId && removeScene(selectedId)} disabled={!selectedId || scenes.length <= 1} title="Eliminar escena seleccionada"><span>×</span>Eliminar</button><button type="button" className={"timeline-icon-btn timeline-tool-labeled " + (isPreviewMuted ? "active" : "")} onClick={handleClick13} title={isPreviewMuted ? "Activar audio del preview" : "Silenciar preview"}>{isPreviewMuted ? "Activar audio" : "Silenciar"}</button><span className="timeline-toolbar-divider" /><label className="timeline-quality-toggle" title="Priorizar nitidez del preview"><span>Calidad original</span><input type="checkbox" checked={highQualityPreview} onChange={event => setHighQualityPreview(event.target.checked)} /><i /></label></div><div className="timeline-time-display"><strong>{Lt(currentFrame / value73)}</strong><span>/</span><span>{Lt(value75)}</span><b>{value73} fps</b></div><div className="timeline-toolbar-right"><button className="tb-btn timeline-secondary-action" onClick={() => setIsSyncModalOpen(!0)} title="Alinear desfase (delay), estirar o recortar tiempos exactos">Sincronizar subtítulos</button><button type="button" className={"timeline-icon-btn timeline-tool-labeled magnet " + (snapEnabled ? "active" : "")} onClick={() => setSnapEnabled(prev => !prev)} title={snapEnabled ? "Ajuste magnético activo" : "Activar ajuste magnético"}>Imán</button><div className="zoom-controls"><button type="button" onClick={() => setZoomKeepingAnchor(prev => prev - Math.max(1, prev * 0.2))} title="Alejar zoom">−</button><input type="range" min={Nt} max={Gt} step="0.5" value={pixelsPerSecond} onChange={event => setZoomKeepingAnchor(Number(event.target.value))} className="zoom-slider" aria-label="Zoom de la línea de tiempo" /><button type="button" onClick={() => setZoomKeepingAnchor(prev => prev + Math.max(1, prev * 0.2))} title="Acercar zoom">＋</button><button type="button" onClick={handleClick12} className={"tb-btn-sm timeline-fit-button " + (fitToWidthPending ? "active" : "")} title="Ver todas las escenas dentro del ancho disponible">Ver todo</button></div></div></div><div className="timeline-scroll-area" ref={divRef3} onMouseDown={handleMouseDown2} onWheel={handleWheel}><div className="timeline-canvas" style={{
        width: je + value78 + Ht
      }}><div className="timeline-ruler-track"><div className="track-label ruler-label" style={{
            width: je,
            minWidth: je,
            maxWidth: je
          }} title="Línea de tiempo"><span>⏱️</span></div><div className="ruler-ticks-area" style={{
            width: value78
          }}>{items29.map(item => <div className="ruler-tick" style={{
              left: item * value76
            }} key={item}><span className="tick-label">{Lt(item)}</span></div>)}</div></div><div className={"timeline-row overlay-track-row " + (collapsedTracks.v2 ? "collapsed" : "")}><div className="track-label layer-label" style={{
            width: je,
            minWidth: je,
            maxWidth: je
          }} title="Pista V2: Superposiciones / Stickers / Overlays"><button type="button" onMouseDown={event => event.stopPropagation()} onClick={() => toggleTrackCollapsed("v2")}>{collapsedTracks.v2 ? "›" : "⌄"}</button><span className="track-badge-pill track-badge-v2">V2</span></div><div className="track-content" style={{
            width: value78
          }}>{!collapsedTracks.v2 && overlays.length > 0 ? <jsxRuntime.Fragment>{overlays.map(overlay => {
                const value87 = Math.max(0, (Number(overlay.startSeconds) || 0) * value76);
                const value88 = Math.max(36, (Number(overlay.durationSeconds) || 3) * value76);
                const isSelected = selectedOverlayId === overlay.id;
                const value89 = Math.round(Number(overlay.scale !== undefined ? overlay.scale : 0.6) * 100);
                return <div className={"timeline-overlay-block " + (isSelected ? "selected" : "")} style={{
                  left: value87,
                  width: value88
                }} onMouseDown={event => event.stopPropagation()} onClick={event => {
                  event.stopPropagation();
                  setSelectedOverlayId(overlay.id);
                }} title={(overlay.name || "Superposición") + " (" + overlay.startSeconds + "s - " + (overlay.startSeconds + overlay.durationSeconds).toFixed(1) + "s) • Escala: " + value89 + "% • Clic para configurar tamaño, posición y subtítulo"} key={overlay.id}>{overlay.imageUrl ? <img src={overlay.imageUrl} alt="" className="timeline-overlay-thumb" /> : <span className="timeline-overlay-icon">🖼️</span>}<span className="timeline-overlay-title">{overlay.name || "Overlay"}</span><span className="timeline-overlay-badge">{value89}%</span><button type="button" className="timeline-overlay-delete-btn" title="Eliminar superposición" onMouseDown={event => event.stopPropagation()} onClick={event => {
                    event.stopPropagation();
                    removeOverlay(overlay.id);
                  }}>✕</button></div>;
              })}<div className="overlay-track-actions" style={{
                left: value75 * value76 + 10
              }} onMouseDown={event => event.stopPropagation()}><label className="track-action-chip overlay-add-chip" title="Agregar otra imagen superpuesta desde tu PC"><input type="file" accept="image/*" style={{
                    display: "none"
                  }} onChange={handleChange3} />+ Imagen</label>{cues7.length > 0 ? <button type="button" className="track-action-chip overlay-ai-chip" onClick={() => setIsAiOverlayModalOpen(!0)} title="Generar superposiciones inteligentes con IA basadas en los subtítulos">✨ Generar con IA</button> : null}</div></jsxRuntime.Fragment> : collapsedTracks.v2 ? null : <div className="timeline-v2-empty-state" onMouseDown={event => event.stopPropagation()}><label className="timeline-track-upload-btn overlay-btn" title="Subir imagen superpuesta (overlay) sobre el video"><input type="file" accept="image/*" style={{
                  display: "none"
                }} onChange={handleChange3} /><span>+ Agregar Imagen Superpuesta (Overlay)</span></label>{cues7.length > 0 ? <button type="button" className="timeline-track-upload-btn overlay-ai-btn" onClick={() => setIsAiOverlayModalOpen(!0)} title="Analizar subtítulos SRT y generar superposiciones con IA sobre el video"><span>✨ Generar con IA desde Subtítulos</span></button> : null}<span className="timeline-lane-hint">Superposiciones sincronizadas con subtítulos o en segundo exacto</span></div>}</div></div><div className={"timeline-row scene-track-row " + (collapsedTracks.v1 ? "collapsed" : "")}><div className="track-label scene-label" style={{
            width: je,
            minWidth: je,
            maxWidth: je
          }} title={"Pista V1: Video principal (" + scenes.length + " escenas)"}><button type="button" onMouseDown={event => event.stopPropagation()} onClick={() => toggleTrackCollapsed("v1")}>{collapsedTracks.v1 ? "›" : "⌄"}</button><span className="track-badge-pill track-badge-v1">V1</span></div><div className="track-content" style={{
            width: value78
          }}>{!collapsedTracks.v1 && timelineEntries.map((overlay, index) => {
              const isSelected = overlay.scene.id === selectedId;
              const value90 = Math.max(3, overlay.durationSeconds * value76 - nr);
              const blockLeft = overlay.startSeconds * value76;
              const scene = overlay.scene;
              const videoUrl = scene.videoUrl || scene.flowVideoUrl || "";
              const hasMedia = !!scene.imageUrl || !!videoUrl;
              const density = value90 < 34 ? "micro" : value90 < 96 ? "compact" : "normal";
              const title = density === "compact" ? "Escena " + (index + 1) : scene.title;
              return <div className={"timeline-scene-block density-" + density + " " + (isSelected ? "selected" : "") + " " + (scene.status === "failed" ? "failed" : "") + " " + (scene.status === "image-generating" || scene.status === "video-generating" ? "generating" : "")} draggable={!0} onDragStart={event => {
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
              }} onDragOver={event => {
                event.preventDefault();
                if (dragSourceIndex !== null && dragSourceIndex !== index) {
                  setDragOverIndex(index);
                }
              }} onDragLeave={() => setDragOverIndex(null)} onDrop={event => {
                event.preventDefault();
                if (dragSourceIndex !== null && dragOverIndex !== null && dragSourceIndex !== dragOverIndex) {
                  reorderScenes(dragSourceIndex, dragOverIndex);
                }
                setDragSourceIndex(null);
                setDragOverIndex(null);
              }} onContextMenu={event => handleContextMenu(event, scene.id, index)} style={{
                left: blockLeft,
                width: value90,
                border: dragOverIndex === index ? "2px solid var(--accent)" : undefined,
                transform: dragSourceIndex === index ? "scale(0.98)" : "none",
                opacity: dragSourceIndex === index ? 0.7 : 1,
                transition: "transform 150ms ease, opacity 150ms ease"
              }} onClick={event => {
                event.stopPropagation();
                onSelectScene(scene.id);
              }} key={scene.id}>{density === "micro" ? <div style={{
                  width: "100%",
                  height: "100%",
                  background: isSelected ? "#818cf8" : hasMedia ? videoUrl ? "rgba(99, 102, 241, 0.65)" : "rgba(59, 130, 246, 0.65)" : "rgba(255, 255, 255, 0.08)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none"
                }} title={index + 1 + ". " + scene.title + " (" + scene.duration + "s)"} /> : <jsxRuntime.Fragment><div className="scene-block-header"><span className="scene-num-badge">{index + 1}</span><span className="scene-block-title" title={scene.title}>{title}</span>{videoUrl ? <button type="button" className={"scene-audio-toggle " + (scene.muted ? "is-muted" : "is-audible")} onMouseDown={event => event.stopPropagation()} onClick={event => {
                      event.stopPropagation();
                      updateScene(scene.id, {
                        muted: !scene.muted
                      });
                    }} title={scene.muted ? "🔇 Audio silenciado (Clic para activar sonido)" : "🔊 Audio activo (" + Math.round((scene.videoVolume ?? 1) * 100) + "%) (Clic para silenciar)"}>{scene.muted ? "🔇" : "🔊"}</button> : null}<span className="scene-clip-type" title={videoUrl ? "Clip de video" : hasMedia ? "Imagen de escena" : "Escena vacía"}>{videoUrl ? "▸" : hasMedia ? "▧" : "·"}</span></div><div className="scene-block-body">{videoUrl ? <jsxRuntime.Fragment><video src={videoUrl} muted={!0} playsInline={!0} preload="metadata" poster={scene.imageUrl || undefined} className="scene-block-img" aria-label={"Video de " + scene.title} onLoadedMetadata={event => {
                        try {
                          event.target.currentTime = Math.min(0.5, (event.target.duration || 1) / 2);
                        } catch {}
                      }} onError={event => {
                        event.currentTarget.style.display = "none";
                      }} /><span className="scene-video-indicator" style={{
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
                      }}>🎬 VIDEO</span></jsxRuntime.Fragment> : scene.imageUrl ? <img src={scene.imageUrl} alt={scene.title} loading="lazy" className="scene-block-img" /> : <div className="scene-block-placeholder"><div className="placeholder-content"><span className="placeholder-icon">🎬</span><span className="placeholder-label">Sin imagen</span></div></div>}<span className={"scene-status-dot " + (hasMedia ? "ready" : "idle")} title={hasMedia ? videoUrl ? "Video listo" : "Imagen lista" : "Sin generar"} /></div>{density === "normal" && <div className="scene-block-actions" onMouseDown={event => event.stopPropagation()} onClick={event => event.stopPropagation()}><button type="button" onMouseDown={event => event.stopPropagation()} onClick={event => {
                      event.stopPropagation();
                      window.dispatchEvent(new CustomEvent("flowtube:regenerate-scene", {
                        detail: {
                          sceneId: scene.id
                        }
                      }));
                    }} title="Regenerar imagen con IA (Prompt individual)">⚡</button><button type="button" onMouseDown={event => event.stopPropagation()} onClick={event => {
                      event.stopPropagation();
                      triggerImageUpload(scene.id);
                    }} title="Reemplazar imagen/video de esta escena desde tu PC">📁</button><button type="button" onMouseDown={event => event.stopPropagation()} onClick={event => {
                      event.stopPropagation();
                      duplicateScene(scene.id);
                    }} title="Duplicar escena">📑</button>{scenes.length > 1 ? <button type="button" className="del-btn" onMouseDown={event => event.stopPropagation()} onClick={event => {
                      event.stopPropagation();
                      removeScene(scene.id);
                    }} title="Eliminar escena">×</button> : null}</div>}<div className="scene-resize-handle" onMouseDown={event => handleResizeStart(event, scene.id, scene.duration)} title="Arrastra para cambiar la duración de la escena al tiempo exacto" /></jsxRuntime.Fragment>}</div>;
            })}{collapsedTracks.v1 ? null : <button className="timeline-add-scene-btn" style={{
              left: value75 * value76 + 10
            }} onClick={event => {
              event.stopPropagation();
              addSceneAt();
            }} title="Añadir nueva escena al final">+ Escena</button>}</div></div><div className={"timeline-row caption-track-row " + (collapsedTracks.cc ? "collapsed" : "") + " " + (isCaptionDragOver ? "is-drag-over" : "")} onDragOver={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsCaptionDragOver(!0);
        }} onDragLeave={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsCaptionDragOver(!1);
        }} onDrop={event => {
          var dataTransfer;
          event.preventDefault();
          event.stopPropagation();
          setIsCaptionDragOver(!1);
          const from = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).find(from => {
            const name = (from.name || "").toLowerCase();
            return name.endsWith(".srt") || name.endsWith(".vtt") || name.endsWith(".json");
          });
          if (from) {
            if (onImportSrt != null) {
              onImportSrt(from);
            }
          }
        }} style={{
          background: isCaptionDragOver ? "rgba(99, 102, 241, 0.18)" : undefined,
          outline: isCaptionDragOver ? "2px dashed var(--accent, #6366f1)" : undefined
        }}><div className="track-label caption-label" style={{
            width: je,
            minWidth: je,
            maxWidth: je
          }} title="Pista TXT: Subtítulos"><button type="button" onMouseDown={event => event.stopPropagation()} onClick={() => toggleTrackCollapsed("cc")}>{collapsedTracks.cc ? "›" : "⌄"}</button><span className="track-badge-pill track-badge-cc">TXT</span></div><div className="track-content" style={{
            width: value78
          }}>{isCaptionDragOver ? <div style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              paddingLeft: 12,
              color: "#a5b4fc",
              fontWeight: 800,
              fontSize: 12
            }}>📄 Suelta tu archivo de subtítulos (.SRT / .VTT / .JSON) aquí</div> : !collapsedTracks.cc && cues7.length > 0 ? <jsxRuntime.Fragment>{cues7.map((cue, index) => {
                const cueStart = (Number(cue.startMs) || 0) / 1000;
                const cueEnd = (Number(cue.endMs) || 0) / 1000;
                const value91 = Math.max(0.2, cueEnd - cueStart);
                return <div className="timeline-cue-block" onMouseDown={event => event.stopPropagation()} style={{
                  left: cueStart * value76,
                  width: Math.max(3, value91 * value76 - 2)
                }} title={cue.text} key={cue.id || index}><span>{cue.text}</span></div>;
              })}<div className="caption-track-actions" style={{
                left: value75 * value76 + 10
              }} onMouseDown={event => event.stopPropagation()}><label className="track-action-chip" title="Importar otro SRT" onMouseDown={event => event.stopPropagation()}><input type="file" accept=".srt,.vtt,.json" onChange={event => {
                    var files;
                    if (onImportSrt == null) {
                      return undefined;
                    } else {
                      return onImportSrt((files = event.target.files) == null ? undefined : files[0]);
                    }
                  }} style={{
                    display: "none"
                  }} />Importar SRT</label><button type="button" className="track-action-chip" onMouseDown={event => event.stopPropagation()} onClick={handleClick9} title="Ajustar duración de escenas a cada frase">Sincronizar</button><button type="button" className="track-action-chip" onMouseDown={event => event.stopPropagation()} onClick={() => setIsSyncModalOpen(!0)} title="Ajustar delay / calibrar tiempos">Ajustar tiempo</button><button type="button" className="track-action-chip danger" onMouseDown={event => event.stopPropagation()} onClick={handleClick8} title="Limpiar subtítulos">✕</button></div></jsxRuntime.Fragment> : collapsedTracks.cc ? null : <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: "100%",
              paddingLeft: 8
            }} onMouseDown={event => event.stopPropagation()}><label className="timeline-track-upload-btn" title="Importar archivo de subtítulos SRT o WhisperX" onMouseDown={event => event.stopPropagation()}><input type="file" accept=".srt,.vtt,.json" onChange={event => {
                  var files;
                  if (onImportSrt == null) {
                    return undefined;
                  } else {
                    return onImportSrt((files = event.target.files) == null ? undefined : files[0]);
                  }
                }} style={{
                  display: "none"
                }} /><span>Importar o arrastrar subtítulos SRT</span></label>{audioTrack || scenes.some(item => item.videoUrl || item.flowVideoUrl) ? <button type="button" className={"timeline-track-action-chip transcription-action " + (isTranscribing ? "is-loading" : "")} onMouseDown={event => event.stopPropagation()} onClick={() => onTranscribeAudio == null ? undefined : onTranscribeAudio()} disabled={isTranscribing} title="Transcribir el audio o video a subtítulos con IA" aria-busy={isTranscribing}><span className="transcription-action-icon" aria-hidden="true">{isTranscribing ? "" : "✦"}</span>{isTranscribing ? "Transcribiendo IA" : "Transcribir con IA"}</button> : null}{assetState.operation === "transcription" && assetState.message ? <span role="status" aria-live="polite" title={assetState.message} style={{
                maxWidth: 360,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: assetState.status === "error" ? "#f87171" : assetState.status === "ready" ? "#4ade80" : "#c7d2fe",
                fontSize: 10.5
              }}>{assetState.message}</span> : null}</div>}</div></div><div className={"timeline-row audio-track-row " + (collapsedTracks.a1 ? "collapsed" : "") + " " + (isAudioDragOver ? "is-drag-over" : "")} onDragOver={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsAudioDragOver(!0);
        }} onDragLeave={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsAudioDragOver(!1);
        }} onDrop={event => {
          var dataTransfer;
          event.preventDefault();
          event.stopPropagation();
          setIsAudioDragOver(!1);
          const from = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).find(from => {
            var type;
            const name = (from.name || "").toLowerCase();
            return ((type = from.type) == null ? undefined : type.startsWith("audio/")) || name.endsWith(".mp3") || name.endsWith(".wav") || name.endsWith(".m4a") || name.endsWith(".ogg");
          });
          if (from) {
            if (onUploadAudio != null) {
              onUploadAudio(from);
            }
          }
        }} style={{
          background: isAudioDragOver ? "rgba(99, 102, 241, 0.18)" : undefined,
          outline: isAudioDragOver ? "2px dashed var(--accent, #6366f1)" : undefined
        }}><div className="track-label audio-label" style={{
            width: je,
            minWidth: je,
            maxWidth: je
          }} title="Pista A1: Locución / Voz en off"><button type="button" onMouseDown={event => event.stopPropagation()} onClick={() => toggleTrackCollapsed("a1")}>{collapsedTracks.a1 ? "›" : "⌄"}</button><span className="track-badge-pill track-badge-a1">A1</span></div><div className="track-content" style={{
            width: value78
          }}>{isAudioDragOver ? <div style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              paddingLeft: 12,
              color: "#93c5fd",
              fontWeight: 800,
              fontSize: 12
            }}>🎵 Suelta tu archivo de audio (MP3 / WAV / M4A) aquí</div> : !collapsedTracks.a1 && audioTrack != null && audioTrack.durationMs ? <div className="timeline-audio-block" onMouseDown={event => event.stopPropagation()} style={{
              left: 0,
              width: audioTrack.loop ? value78 : Math.min(value78, audioTrack.durationMs / 1000 * value76)
            }}><span className="audio-block-title">▰ Narración · {audioTrack.name || "Voz en off"}</span><span className="audio-block-dur">{(audioTrack.durationMs / 1000).toFixed(1)}s</span><div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(0,0,0,0.4)",
                padding: "1px 6px",
                borderRadius: 5
              }} title="Volumen de la narración" onMouseDown={event => event.stopPropagation()}><span style={{
                  fontSize: 10,
                  color: "#93c5fd"
                }}>Vol:</span><input type="range" min="0" max="1" step="0.05" value={audioTrack.volume !== undefined ? audioTrack.volume : 1} onChange={event => updateProject({
                  audioTrack: {
                    ...audioTrack,
                    volume: Number(event.target.value)
                  }
                })} style={{
                  width: 45,
                  height: 3,
                  accentColor: "#6366f1",
                  cursor: "pointer"
                }} /><span style={{
                  fontSize: 9.5,
                  color: "#fff",
                  fontWeight: 800
                }}>{Math.round((audioTrack.volume !== undefined ? audioTrack.volume : 1) * 100)}%</span></div><button type="button" className="track-action-chip" onMouseDown={event => event.stopPropagation()} onClick={() => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
                detail: {
                  tab: "tts"
                }
              }))} title="Generar nueva voz con IA">🎙️ Voz IA</button><label className="track-action-chip" title="Cambiar audio" onMouseDown={event => event.stopPropagation()}><input type="file" accept="audio/*" onChange={event => {
                  var files;
                  if (onUploadAudio == null) {
                    return undefined;
                  } else {
                    return onUploadAudio((files = event.target.files) == null ? undefined : files[0]);
                  }
                }} style={{
                  display: "none"
                }} />Cambiar</label><button type="button" className="track-action-chip danger" onMouseDown={event => event.stopPropagation()} onClick={handleClick6} title="Eliminar narración / pista de audio A1">🗑️ Eliminar A1</button></div> : collapsedTracks.a1 ? null : <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: "100%",
              paddingLeft: 8
            }} onMouseDown={event => event.stopPropagation()}><label className="timeline-track-upload-btn" title="Haz clic para subir o arrastrar un archivo de audio MP3 o WAV" onMouseDown={event => event.stopPropagation()}><input type="file" accept="audio/*" onChange={event => {
                  var files;
                  if (onUploadAudio == null) {
                    return undefined;
                  } else {
                    return onUploadAudio((files = event.target.files) == null ? undefined : files[0]);
                  }
                }} style={{
                  display: "none"
                }} /><span>＋ Subir o arrastrar voz</span></label><button type="button" className="timeline-track-action-chip" onMouseDown={event => event.stopPropagation()} onClick={event => {
                event.stopPropagation();
                window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
                  detail: {
                    tab: "tts"
                  }
                }));
              }} style={{
                height: 24,
                padding: "0 10px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 5
              }}><span>🎙️ Generar Voz IA (AI33)</span></button></div>}</div></div><div className={"timeline-row sound-track-row " + (collapsedTracks.a2 ? "collapsed" : "")} onDragOver={event => {
          event.preventDefault();
          event.stopPropagation();
          event.dataTransfer.dropEffect = "copy";
          setIsMusicDragOver(!0);
        }} onDragEnter={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsMusicDragOver(!0);
        }} onDragLeave={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsMusicDragOver(!1);
        }} onDrop={event => {
          var dataTransfer;
          var uploadHandler;
          event.preventDefault();
          event.stopPropagation();
          setIsMusicDragOver(!1);
          const from = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).find(from => {
            var type;
            const name = (from.name || "").toLowerCase();
            return ((type = from.type) == null ? undefined : type.startsWith("audio/")) || name.endsWith(".mp3") || name.endsWith(".wav") || name.endsWith(".m4a") || name.endsWith(".ogg");
          });
          if (from) {
            if ((uploadHandler = onUploadMusic || onUploadAudio) != null) {
              uploadHandler(from, "music");
            }
          }
        }} style={{
          background: isMusicDragOver ? "rgba(16, 185, 129, 0.18)" : undefined,
          outline: isMusicDragOver ? "2px dashed var(--success, #10b981)" : undefined
        }}><div className="track-label sound-label" style={{
            width: je,
            minWidth: je,
            maxWidth: je
          }} title="Pista A2: Música / Efectos"><button type="button" onMouseDown={event => event.stopPropagation()} onClick={() => toggleTrackCollapsed("a2")}>{collapsedTracks.a2 ? "›" : "⌄"}</button><span className="track-badge-pill track-badge-a2">A2</span></div><div className="track-content" style={{
            width: value78
          }}>{isMusicDragOver ? <div style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              paddingLeft: 12,
              color: "#6ee7b7",
              fontWeight: 800,
              fontSize: 12
            }}>🎵 Suelta tu archivo de Música o SFX (MP3 / WAV / M4A) aquí para asignarlo a A2</div> : !collapsedTracks.a2 && musicTrack != null && musicTrack.url ? <div className="timeline-audio-block music-block" onMouseDown={event => event.stopPropagation()} style={{
              left: 0,
              width: musicTrack.loop !== !1 ? value78 : Math.min(value78, (musicTrack.durationMs || 30000) / 1000 * value76),
              background: "var(--surface)",
              border: "1px solid var(--border)"
            }}><span className="audio-block-title" style={{
                color: "var(--foreground)"
              }}>🎵 {musicTrack.name || "Música / SFX"}</span><span className="audio-block-dur" style={{
                color: "var(--muted-foreground)"
              }}>{musicTrack.loop !== !1 ? "🔁 Bucle" : ((musicTrack.durationMs || 30000) / 1000).toFixed(1) + "s"}</span><div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: "var(--muted)",
                padding: "1px 7px",
                borderRadius: "var(--radius-xs)"
              }} title="Volumen de fondo (ajustar nivel)" onMouseDown={event => event.stopPropagation()}><span style={{
                  fontSize: 10,
                  color: "var(--muted-foreground)"
                }}>Vol:</span><input type="range" min="0" max="1" step="0.05" value={musicTrack.volume !== undefined ? musicTrack.volume : 0.1} onChange={event => updateProject({
                  musicTrack: {
                    ...musicTrack,
                    volume: Number(event.target.value)
                  }
                })} style={{
                  width: 50,
                  height: 3,
                  accentColor: "var(--primary)",
                  cursor: "pointer"
                }} /><span style={{
                  fontSize: 9.5,
                  color: "var(--foreground)",
                  fontWeight: 700
                }}>{Math.round((musicTrack.volume !== undefined ? musicTrack.volume : 0.1) * 100)}%</span></div><button type="button" className="track-action-chip" onMouseDown={event => event.stopPropagation()} onClick={() => updateProject({
                musicTrack: {
                  ...musicTrack,
                  loop: musicTrack.loop === !1
                }
              })} style={{
                background: "var(--muted)",
                color: "var(--foreground)",
                border: "1px solid var(--border)"
              }} title={musicTrack.loop !== !1 ? "Desactivar bucle continuo" : "Repetir en bucle continuo durante todo el video"}>🔁 {musicTrack.loop !== !1 ? "Bucle ON" : "Bucle OFF"}</button><label className="track-action-chip" title="Cambiar música o SFX desde tu PC" onMouseDown={event => event.stopPropagation()}><input type="file" accept="audio/*" onChange={event => {
                  var files;
                  var uploadHandler;
                  if ((uploadHandler = onUploadMusic || onUploadAudio) == null) {
                    return undefined;
                  } else {
                    return uploadHandler((files = event.target.files) == null ? undefined : files[0], "music");
                  }
                }} style={{
                  display: "none"
                }} />📁 Cambiar PC</label><button type="button" className="track-action-chip" onMouseDown={event => event.stopPropagation()} onClick={() => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
                detail: {
                  tab: "suno"
                }
              }))} title="Cambiar o crear nueva música / SFX con Suno">🎵 Suno AI</button><button type="button" className="track-action-chip danger" onMouseDown={event => event.stopPropagation()} onClick={handleClick7} title="Eliminar música o pista A2">🗑️ Eliminar A2</button></div> : collapsedTracks.a2 ? null : <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: "100%",
              paddingLeft: 8
            }} onMouseDown={event => event.stopPropagation()}><label className="timeline-track-upload-btn" title="Haz clic para subir música o efectos de sonido (SFX) desde tu PC" onMouseDown={event => event.stopPropagation()}><input type="file" accept="audio/*" onChange={event => {
                  var files;
                  var uploadHandler;
                  if ((uploadHandler = onUploadMusic || onUploadAudio) == null) {
                    return undefined;
                  } else {
                    return uploadHandler((files = event.target.files) == null ? undefined : files[0], "music");
                  }
                }} style={{
                  display: "none"
                }} /><span>＋ Subir Música / SFX (PC)</span></label><button type="button" className="timeline-track-action-chip" onMouseDown={event => event.stopPropagation()} onClick={event => {
                event.stopPropagation();
                window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
                  detail: {
                    tab: "suno"
                  }
                }));
              }} style={{
                height: 24,
                padding: "0 10px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 5
              }}><span>🎵 Crear Música Suno AI / SFX</span></button></div>}</div></div><div className="timeline-playhead" style={{
          left: je + playheadPixel
        }} onMouseDown={handleMouseDown3}><div className="playhead-handle" /><div className="playhead-line" /></div></div></div><_Component2 isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(!1)} onTranscribeWhisper={onTranscribeAudio} />{contextMenu && <div ref={divRef2} className="context-menu" style={{
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
    }} onClick={event => event.stopPropagation()}><div style={{
        padding: "4px 10px",
        fontSize: "11px",
        fontWeight: "900",
        color: "#8a94a6",
        borderBottom: "1px solid #282d3d",
        marginBottom: "4px"
      }}>Escena {contextMenu.sceneIdx + 1}</div><button onClick={() => {
        window.dispatchEvent(new CustomEvent("flowtube:regenerate-scene", {
          detail: {
            sceneId: contextMenu.sceneId
          }
        }));
        setContextMenu(null);
      }} style={{
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
      }} onMouseOver={event => event.currentTarget.style.background = "#1f2433"} onMouseOut={event => event.currentTarget.style.background = "transparent"}>⚡ Regenerar Imagen con IA</button>{(() => {
        const found = items28.find(item => item.id === contextMenu.sceneId);
        if (found != null && found.imageUrl) {
          return <jsxRuntime.Fragment><button onClick={() => {
              window.dispatchEvent(new CustomEvent("flowtube:generate-video", {
                detail: {
                  sceneId: contextMenu.sceneId,
                  model: "omni"
                }
              }));
              setContextMenu(null);
            }} style={{
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
            }} onMouseOver={event => event.currentTarget.style.background = "#1f2433"} onMouseOut={event => event.currentTarget.style.background = "transparent"} title="Generar video a partir de esta imagen usando Omni Flash">⚡ {found.videoUrl ? "Regenerar Video (Omni Flash)" : "Generar Video (Omni Flash)"}</button><button onClick={() => {
              window.dispatchEvent(new CustomEvent("flowtube:generate-video", {
                detail: {
                  sceneId: contextMenu.sceneId,
                  model: "veo-3.1-lite"
                }
              }));
              setContextMenu(null);
            }} style={{
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
            }} onMouseOver={event => event.currentTarget.style.background = "#1f2433"} onMouseOut={event => event.currentTarget.style.background = "transparent"} title="Generar video a partir de esta imagen usando Veo 3.1 Lite">🎥 {found.videoUrl ? "Regenerar Video (Veo 3.1 Lite)" : "Generar Video (Veo 3.1 Lite)"}</button></jsxRuntime.Fragment>;
        } else {
          return null;
        }
      })()}<button onClick={() => {
        triggerImageUpload(contextMenu.sceneId);
        setContextMenu(null);
      }} style={{
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
      }} onMouseOver={event => event.currentTarget.style.background = "#1f2433"} onMouseOut={event => event.currentTarget.style.background = "transparent"}>📁 Reemplazar con Video/Imagen (PC)</button>{(() => {
        var electronAPI;
        const found = items28.find(item => item.id === contextMenu.sceneId);
        if (((found == null ? undefined : found.videoUrl) || (found == null ? undefined : found.imageUrl) || "") && (electronAPI = window.electronAPI) != null && electronAPI.revealMediaInFolder) {
          return <button onClick={() => revealInFolder(contextMenu.sceneId)} style={{
            textAlign: "left",
            background: "transparent",
            border: "none",
            color: "#dbeafe",
            padding: "8px 10px",
            fontSize: "12px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.2s"
          }} onMouseOver={event => event.currentTarget.style.background = "#1f2433"} onMouseOut={event => event.currentTarget.style.background = "transparent"}>📁 Ver en carpeta</button>;
        } else {
          return null;
        }
      })()}<button onClick={() => {
        splitScene(contextMenu.sceneId, 0.5);
        setContextMenu(null);
      }} style={{
        textAlign: "left",
        background: "transparent",
        border: "none",
        color: "#fff",
        padding: "8px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.2s"
      }} onMouseOver={event => event.currentTarget.style.background = "#1f2433"} onMouseOut={event => event.currentTarget.style.background = "transparent"}>✂️ Cortar en dos</button><button onClick={() => {
        duplicateScene(contextMenu.sceneId);
        setContextMenu(null);
      }} style={{
        textAlign: "left",
        background: "transparent",
        border: "none",
        color: "#fff",
        padding: "8px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.2s"
      }} onMouseOver={event => event.currentTarget.style.background = "#1f2433"} onMouseOut={event => event.currentTarget.style.background = "transparent"}>📑 Duplicar</button><button onClick={() => {
        removeScene(contextMenu.sceneId);
        setContextMenu(null);
      }} disabled={scenes.length <= 1} style={{
        textAlign: "left",
        background: "transparent",
        border: "none",
        color: scenes.length <= 1 ? "#475569" : "#ef4444",
        padding: "8px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.2s"
      }} onMouseOver={event => {
        if (scenes.length > 1) {
          event.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
        }
      }} onMouseOut={event => event.currentTarget.style.background = "transparent"}>🗑️ Eliminar</button></div>}<Bn isOpen={!!selectedOverlayId} overlayId={selectedOverlayId} onClose={() => setSelectedOverlayId(null)} /><_Component3 isOpen={isAiOverlayModalOpen} onClose={() => setIsAiOverlayModalOpen(!1)} cues={cues7} /><input ref={inputRef3} type="file" accept="image/*" style={{
      display: "none"
    }} onChange={handleChange3} /></div>;
};
const Ma = seconds => {
  const value92 = Math.max(0, Number(seconds) || 0);
  const value93 = Math.floor(value92 / 60);
  const value94 = Math.floor(value92 % 60);
  const value95 = Math.floor(value92 % 1 * 10);
  return String(value93).padStart(2, "0") + ":" + String(value94).padStart(2, "0") + "." + value95;
};
const Ja = ({
  playerRef: playerRef,
  durationInFrames: durationInFrames = 120,
  fps: fps = 30,
  activeTask: activeTask,
  className: className = "",
  style: style = {}
}) => {
  const [isPlaying, setIsPlaying] = React.useState(!1);
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(!1);
  const [isHovering, setIsHovering] = React.useState(!1);
  const divRef = React.useRef(null);
  React.useEffect(() => {
    const current = playerRef == null ? undefined : playerRef.current;
    if (!current) {
      return;
    }
    const handlePlay = () => setIsPlaying(!0);
    const handlePause = () => setIsPlaying(!1);
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
    const current = playerRef == null ? undefined : playerRef.current;
    if (!current) {
      return;
    }
    const handleFrameUpdate = state => {
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
    const current = playerRef == null ? undefined : playerRef.current;
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
  const seekToFrame = frame => {
    var current;
    const value = Math.max(0, Math.min(durationInFrames - 1, Math.round(frame)));
    setCurrentFrame(value);
    if ((current = playerRef == null ? undefined : playerRef.current) != null) {
      current.seekTo(value);
    }
  };
  const handlePointerDown = event => {
    if (divRef.current) {
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      handlePointerMove(event);
    }
  };
  const handlePointerMove = event => {
    if (!divRef.current) {
      return;
    }
    const rect = divRef.current.getBoundingClientRect();
    if (rect.width <= 0) {
      return;
    }
    const value = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    seekToFrame(value * (durationInFrames - 1));
  };
  const handlePointerUp = event => {
    setIsDragging(!1);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {}
  };
  const currentTimeSeconds = currentFrame / fps;
  const value = Math.max(0.1, durationInFrames / fps);
  const progressPercent = durationInFrames > 1 ? currentFrame / (durationInFrames - 1) * 100 : 0;
  return <div className={"pro-playback-bar " + className} style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    height: 42,
    padding: "0 16px",
    background: "var(--surface)",
    borderTop: "1px solid var(--border)",
    userSelect: "none",
    ...style
  }}><div style={{
      display: "flex",
      alignItems: "center",
      gap: 6
    }}><button type="button" onClick={() => seekToFrame(0)} title="Ir al inicio (Inicio)" style={{
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
      }} onMouseEnter={event => {
        event.currentTarget.style.background = "var(--accent)";
        event.currentTarget.style.color = "var(--foreground)";
      }} onMouseLeave={event => {
        event.currentTarget.style.background = "transparent";
        event.currentTarget.style.color = "var(--muted-foreground)";
      }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="5" width="2.5" height="14" rx="0.5" /><polygon points="19 5 8 12 19 19 19 5" /></svg></button><button type="button" onClick={handleClick} title={isPlaying ? "Pausar (Espacio)" : "Reproducir (Espacio)"} style={{
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
      }} onMouseEnter={event => {
        event.currentTarget.style.transform = "scale(1.06)";
      }} onMouseLeave={event => {
        event.currentTarget.style.transform = "scale(1)";
      }}>{isPlaying ? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="3.5" height="16" rx="1" /><rect x="14.5" y="4" width="3.5" height="16" rx="1" /></svg> : <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{
          marginLeft: 2
        }}><polygon points="6 4 20 12 6 20 6 4" /></svg>}</button><button type="button" onClick={() => seekToFrame(durationInFrames - 1)} title="Ir al final (Fin)" style={{
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
      }} onMouseEnter={event => {
        event.currentTarget.style.background = "var(--accent)";
        event.currentTarget.style.color = "var(--foreground)";
      }} onMouseLeave={event => {
        event.currentTarget.style.background = "transparent";
        event.currentTarget.style.color = "var(--muted-foreground)";
      }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 5 16 12 5 19 5 5" /><rect x="17.5" y="5" width="2.5" height="14" rx="0.5" /></svg></button></div><div ref={divRef} onPointerDown={handlePointerDown} onPointerMove={isDragging ? handlePointerMove : undefined} onPointerUp={isDragging ? handlePointerUp : undefined} onPointerCancel={isDragging ? handlePointerUp : undefined} onMouseEnter={() => setIsHovering(!0)} onMouseLeave={() => setIsHovering(!1)} style={{
      flex: 1,
      height: 26,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      position: "relative",
      touchAction: "none"
    }}><div style={{
        position: "relative",
        width: "100%",
        height: isHovering || isDragging ? 6 : 4,
        borderRadius: 9999,
        background: "var(--muted)",
        transition: "height 0.15s ease",
        overflow: "hidden"
      }}><div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: progressPercent + "%",
          background: "var(--foreground)",
          borderRadius: 9999
        }} /></div><div style={{
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
      }} /></div><div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexShrink: 0
    }}><div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontVariantNumeric: "tabular-nums",
        display: "flex",
        alignItems: "center",
        gap: 4
      }}><span style={{
          color: "var(--foreground)",
          fontWeight: 700
        }}>{Ma(currentTimeSeconds)}</span><span style={{
          color: "var(--muted-foreground)",
          opacity: 0.6
        }}>/</span><span style={{
          color: "var(--muted-foreground)"
        }}>{Ma(value)}</span></div>{activeTask && <div style={{
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
      }}><span style={{
          display: "inline-block",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--foreground)"
        }} /><span>{activeTask.label} {activeTask.progress}%</span></div>}</div></div>;
};
const _Component10 = ({
  playerRef: playerRef,
  onSelectScene: onSelectScene,
  onUploadImage: onUploadImage,
  onUploadAudio: onUploadAudio,
  onUploadMusic: onUploadMusic,
  onImportSrt: onImportSrt,
  onTranscribeAudio: onTranscribeAudio,
  onCreateScenesFromTranscript: onCreateScenesFromTranscript,
  onOpenBatchPromptsModal: onOpenBatchPromptsModal,
  hideTimeline: hideTimeline,
  activeTask: activeTask,
  projectSeconds: projectSeconds,
  selectedTitle: selectedTitle
}) => {
  var audioTrack;
  var cues;
  var style2;
  var style3;
  var style4;
  var style5;
  var style6;
  var style7;
  const [isPlaying, setIsPlaying] = ReactLib.useState(!1);
  const project = w(state => state.project);
  const selectedId = w(state => state.selectedId);
  const renderState = w(state => state.renderState);
  w(state => state.batchState);
  w(state => state.promptGenState);
  w(state => state.cancelBatch);
  w(state => state.cancelPromptGen);
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
    var audioTrack;
    return Math.max(1, Ya(scenes, fps, ((audioTrack = project.audioTrack) == null ? undefined : audioTrack.durationMs) || 0));
  }, [scenes, fps, (audioTrack = project.audioTrack) == null ? undefined : audioTrack.durationMs]);
  ReactLib.useEffect(() => {
    const current = playerRef.current;
    if (!current) {
      return;
    }
    const handlePlay = () => setIsPlaying(!0);
    const handlePause = () => setIsPlaying(!1);
    current.addEventListener("play", handlePlay);
    current.addEventListener("pause", handlePause);
    current.addEventListener("ended", handlePause);
    return () => {
      current.removeEventListener("play", handlePlay);
      current.removeEventListener("pause", handlePause);
      current.removeEventListener("ended", handlePause);
    };
  }, [playerRef]);
  const updateCaptionStyle = w(state => state.updateCaptionStyle);
  const handleClick15 = w(state => state.toggleCaptions);
  const autoTranscribeOnAudioUpload = w(state => state.autoTranscribeOnAudioUpload);
  const setAutoTranscribeOnAudioUpload = w(state => state.setAutoTranscribeOnAudioUpload);
  const [isCaptionPanelOpen, setIsCaptionPanelOpen] = ReactLib.useState(!1);
  const captionTrack = project.captionTrack;
  const hasCaptions = (cues = captionTrack == null ? undefined : captionTrack.cues) != null && !!cues.length;
  const captionsEnabled = (captionTrack == null ? undefined : captionTrack.enabled) !== !1;
  const position = ((style2 = captionTrack == null ? undefined : captionTrack.style) == null ? undefined : style2.position) || (((style3 = captionTrack == null ? undefined : captionTrack.style) == null ? undefined : style3.posY) < 35 ? "top" : ((style4 = captionTrack == null ? undefined : captionTrack.style) == null ? undefined : style4.posY) > 65 ? "bottom" : "center");
  const highlightColor = ((style5 = captionTrack == null ? undefined : captionTrack.style) == null ? undefined : style5.highlightColor) || "#fbbf24";
  const animation = ((style6 = captionTrack == null ? undefined : captionTrack.style) == null ? undefined : style6.animation) || "viral-yellow-pop";
  const fontSize = ((style7 = captionTrack == null ? undefined : captionTrack.style) == null ? undefined : style7.fontSize) || 54;
  const items = [{
    color: "#FFD700",
    label: "Amarillo Dorado (TikTok)"
  }, {
    color: "#22c55e",
    label: "Verde Neón"
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
  const [isHoveringPlayer, setIsHoveringPlayer] = ReactLib.useState(!1);
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
  return <section className="preview-panel"><div className="player-wrapper-outer" style={{
      position: "relative"
    }}><div className={"player-frame " + project.format} onMouseEnter={() => setIsHoveringPlayer(!0)} onMouseLeave={() => setIsHoveringPlayer(!1)} onClick={handleClick16} style={{
        cursor: "pointer",
        position: "relative",
        overflow: "hidden"
      }}><Player ref={playerRef} component={Ha} inputProps={{
          scenes: project.scenes,
          audioTrack: project.audioTrack,
          musicTrack: project.musicTrack,
          captionTrack: project.captionTrack,
          transitions: project.transitions,
          fps: project.fps,
          format: project.format,
          overlays: project.overlays
        }} durationInFrames={value} compositionWidth={compositionSize.width} compositionHeight={compositionSize.height} fps={project.fps} controls={!1} loop={!0} style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a"
        }} /><div style={{
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
        }} /><div style={{
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
        }} /><div style={{
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
        }}><span>{project.format === "short" ? "📱 9:16 Short" : "🎬 16:9 HD"}</span><span style={{
            opacity: 0.5
          }}>·</span><span>{project.fps} FPS</span></div><div style={{
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
        }}><span style={{
            marginLeft: isPlaying ? 0 : 3
          }}>{isPlaying ? "⏸" : "▶"}</span></div>{hasCaptions && <div onClick={event => event.stopPropagation()} style={{
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
        }}><button type="button" onClick={() => setIsCaptionPanelOpen(prev => !prev)} style={{
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
          }} title="Personalizar posición y colores de subtítulos en vivo"><span>💬 Subtítulos</span><span style={{
              fontSize: 9,
              opacity: 0.8
            }}>{isCaptionPanelOpen ? "▲" : "▼"}</span></button>{isCaptionPanelOpen && <div style={{
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
          }}><div style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              borderBottom: "1px solid var(--border)",
              paddingBottom: 8
            }}><span style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--muted-foreground)",
                textTransform: "uppercase"
              }}>Animación de Subtítulos:</span><select value={animation} onChange={event => updateCaptionStyle({
                animation: event.target.value
              })} style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                borderRadius: "var(--radius-xs)",
                padding: "4px 8px",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                width: "100%"
              }}><option value="viral-yellow-pop">💥 Pop Elástico Dinámico</option><option value="claude-kinetic-reveal">🎬 Cinético Fluido</option><option value="char-slide-highlight">✨ Deslizamiento por Carácter</option><option value="soft-scale">🫧 Escala Suave (SoftScale)</option><option value="pop-up">⬆️ Pop-Up Suave</option><option value="karaoke">🎙️ Relleno Progresivo (Karaoke)</option><option value="hormozi-pill">💊 Fondo Píldora Activa</option><option value="word-underline">✍️ Subrayado</option></select></div><div><div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10.5,
                fontWeight: 800,
                color: "#94a3b8",
                marginBottom: 3
              }}><span>Tamaño:</span><span style={{
                  color: "#c7d2fe"
                }}>{fontSize}px</span></div><input type="range" min="32" max="90" step="2" value={fontSize} onChange={event => updateCaptionStyle({
                fontSize: Number(event.target.value)
              })} style={{
                width: "100%",
                accentColor: "#6366f1",
                cursor: "pointer",
                height: 4
              }} /></div><div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 6
            }}><span style={{
                fontSize: 10.5,
                fontWeight: 800,
                color: "#94a3b8"
              }}>Posición:</span><div style={{
                display: "flex",
                gap: 4,
                background: "rgba(255,255,255,0.06)",
                padding: 2,
                borderRadius: 8
              }}><button type="button" onClick={() => updateCaptionStyle({
                  position: "top",
                  posY: 14
                })} style={{
                  background: position === "top" ? "var(--accent, #6366f1)" : "transparent",
                  color: "#fff",
                  border: 0,
                  borderRadius: 6,
                  padding: "3px 7px",
                  fontSize: 10,
                  fontWeight: 800,
                  cursor: "pointer"
                }} title="Ubicar arriba">⬆️ Arriba</button><button type="button" onClick={() => updateCaptionStyle({
                  position: "center",
                  posY: 50
                })} style={{
                  background: position === "center" ? "var(--accent, #6366f1)" : "transparent",
                  color: "#fff",
                  border: 0,
                  borderRadius: 6,
                  padding: "3px 7px",
                  fontSize: 10,
                  fontWeight: 800,
                  cursor: "pointer"
                }} title="Ubicar al centro">⏹️ Centro</button><button type="button" onClick={() => updateCaptionStyle({
                  position: "bottom",
                  posY: 84
                })} style={{
                  background: position === "bottom" ? "var(--accent, #6366f1)" : "transparent",
                  color: "#fff",
                  border: 0,
                  borderRadius: 6,
                  padding: "3px 7px",
                  fontSize: 10,
                  fontWeight: 800,
                  cursor: "pointer"
                }} title="Ubicar abajo">⬇️ Abajo</button></div></div><div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 6
            }}><span style={{
                fontSize: 10.5,
                fontWeight: 800,
                color: "#94a3b8"
              }}>Resaltado:</span><div style={{
                display: "flex",
                alignItems: "center",
                gap: 5
              }}>{items.map(item => {
                  const isSelectedColor = highlightColor.toLowerCase() === item.color.toLowerCase();
                  return <button type="button" onClick={() => updateCaptionStyle({
                    highlightColor: item.color
                  })} style={{
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
                  }} title={item.label} key={item.color} />;
                })}</div></div><div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 6
            }}><span style={{
                fontSize: 10.5,
                fontWeight: 800,
                color: "#94a3b8"
              }}>Estilo:</span><select value={animation} onChange={event => updateCaptionStyle({
                animation: event.target.value
              })} style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#f8fafc",
                borderRadius: 6,
                padding: "3px 6px",
                fontSize: 10.5,
                fontWeight: 700,
                cursor: "pointer"
              }}><option value="viral-yellow-pop">🟡 Viral Gold Pop (TikTok)</option><option value="claude-kinetic-reveal">🎬 Claude Kinetic (Dorado)</option><option value="soft-scale">✨ Suave (SoftScale)</option><option value="pop-up">💥 Pop-Up</option><option value="karaoke">🎙️ Karaoke Neón</option><option value="hormozi-pill">💊 Hormozi Pill</option><option value="hormozi">⬛ Hormozi Bounce</option><option value="word-zoom">🔍 Word Zoom</option><option value="gradient-pop">🌈 Gradiente Pop</option><option value="documentary-serif">📜 Documental Serif</option></select></div><div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              borderRadius: 8,
              padding: "5px 8px",
              marginTop: 2
            }}><div style={{
                display: "flex",
                flexDirection: "column"
              }}><span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#6ee7b7"
                }}>⚡ Auto-IA al subir MP3</span><span style={{
                  fontSize: 8.5,
                  color: "#94a3b8"
                }}>Transcribe subtítulos al cargar audio</span></div><button type="button" onClick={() => setAutoTranscribeOnAudioUpload(!autoTranscribeOnAudioUpload)} style={{
                background: autoTranscribeOnAudioUpload ? "#10b981" : "rgba(255, 255, 255, 0.12)",
                color: autoTranscribeOnAudioUpload ? "#ffffff" : "#94a3b8",
                border: 0,
                borderRadius: 6,
                padding: "2px 8px",
                fontSize: 9.5,
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}>{autoTranscribeOnAudioUpload ? "✓ ON" : "✕ OFF"}</button></div><div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 6,
              marginTop: 2
            }}><span style={{
                fontSize: 10.5,
                color: "#94a3b8"
              }}>Visibilidad</span><button type="button" onClick={handleClick15} style={{
                background: captionsEnabled ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
                color: captionsEnabled ? "#4ade80" : "#f87171",
                border: "1px solid " + (captionsEnabled ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)"),
                borderRadius: 6,
                padding: "2px 8px",
                fontSize: 10,
                fontWeight: 800,
                cursor: "pointer"
              }}>{captionsEnabled ? "✓ Activo" : "✕ Oculto"}</button></div></div>}</div>}</div></div><Ja playerRef={playerRef} durationInFrames={value} fps={fps} activeTask={activeTask} />{!hideTimeline && <Zt scenes={project.scenes} fps={project.fps} durationInFrames={value} selectedId={selectedId} playerRef={playerRef} onSelectScene={onSelectScene} audioTrack={project.audioTrack} musicTrack={project.musicTrack} captionTrack={project.captionTrack} onUploadImage={onUploadImage} onUploadAudio={onUploadAudio} onUploadMusic={onUploadMusic || onUploadAudio} onImportSrt={onImportSrt} onTranscribeAudio={onTranscribeAudio} onCreateScenesFromTranscript={onCreateScenesFromTranscript} onOpenBatchPromptsModal={onOpenBatchPromptsModal} />}{renderState.url ? <div className="render-success-banner"><span>🎉 ¡Video renderizado con éxito!</span><a href={renderState.url} download={!0} className="btn-download-render">Descargar MP4</a></div> : null}</section>;
};
const Na = startMs => (Number(startMs || 0) / 1000).toFixed(2);
const _Component1 = ({
  isOpen: isOpen,
  cues: cues,
  onClose: onClose,
  onSave: onSave
}) => {
  const [editableCues, setEditableCues] = React.useState([]);
  React.useEffect(() => {
    if (isOpen) {
      setEditableCues((cues || []).map(item => ({
        ...item
      })));
    }
  }, [cues, isOpen]);
  if (!isOpen) {
    return null;
  }
  const updateCue = (index, patch) => setEditableCues(indexes => indexes.map((item, index2) => index2 === index ? {
    ...item,
    ...patch
  } : item));
  const splitCue = index => setEditableCues(items => {
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
  const mergeWithNext = index => setEditableCues(items => index >= items.length - 1 ? items : [...items.slice(0, index), {
    ...items[index],
    endMs: items[index + 1].endMs,
    text: (items[index].text + " " + items[index + 1].text).trim(),
    words: undefined
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
  return <div onMouseDown={event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }} style={{
    position: "fixed",
    inset: 0,
    zIndex: 1500,
    background: "rgba(0,0,0,.78)",
    padding: 24,
    display: "grid",
    placeItems: "center"
  }}><div style={{
      width: 920,
      maxWidth: "100%",
      height: "min(720px,90vh)",
      background: "#0e1118",
      border: "1px solid #303746",
      borderRadius: 16,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}><div style={{
        padding: 14,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #252b38"
      }}><div><strong style={{
            color: "#fff",
            fontSize: 14
          }}>✂️ Editor avanzado de subtítulos</strong><div style={{
            color: "#7c8799",
            fontSize: 10.5,
            marginTop: 3
          }}>{editableCues.length} frases sincronizadas · tiempos exactos en segundos</div></div><div style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}><button className="btn-tool" onClick={handleClick17} title="Exportar a .SRT">📥 Bajar .SRT</button><button className="btn-tool" onClick={handleClick18} title="Exportar a .VTT">📥 Bajar .VTT</button><button className="btn-tool" onClick={onClose} title="Cerrar">✕</button></div></div><div style={{
        overflow: "auto",
        padding: 10,
        flex: 1
      }}>{editableCues.map((cue, index) => <div style={{
          display: "grid",
          gridTemplateColumns: "40px 82px 82px 1fr auto",
          gap: 7,
          alignItems: "center",
          padding: 7,
          borderBottom: "1px solid #202633"
        }} key={cue.id || index}><span style={{
            color: "#657084",
            fontSize: 10
          }}>{index + 1}</span><input className="form-input" type="number" step=".01" value={Na(cue.startMs)} onChange={event => updateCue(index, {
            startMs: Math.max(0, Number(event.target.value) * 1000)
          })} /><input className="form-input" type="number" step=".01" value={Na(cue.endMs)} onChange={event => updateCue(index, {
            endMs: Math.max(0, Number(event.target.value) * 1000)
          })} /><input className="form-input" value={cue.text} onChange={event => updateCue(index, {
            text: event.target.value,
            words: undefined
          })} /><div style={{
            display: "flex",
            gap: 4
          }}><button className="btn-tool" title="Dividir frase en dos" onClick={() => splitCue(index)}>✂</button><button className="btn-tool" title="Unir con la siguiente frase" onClick={() => mergeWithNext(index)}>↔</button><button className="btn-tool danger" title="Eliminar frase" onClick={() => setEditableCues(media => media.filter((item, index3) => index3 !== index))}>×</button></div></div>)}</div><div style={{
        padding: 12,
        borderTop: "1px solid #252b38",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}><button className="btn-tool" onClick={() => setEditableCues(state => {
          var lastCue;
          var lastCue;
          return [...state, {
            id: crypto.randomUUID(),
            startMs: ((lastCue = state.at(-1)) == null ? undefined : lastCue.endMs) || 0,
            endMs: (((lastCue = state.at(-1)) == null ? undefined : lastCue.endMs) || 0) + 2000,
            text: "Nueva frase"
          }];
        })}>+ Añadir frase</button><div style={{
          display: "flex",
          gap: 8
        }}><button className="btn-tool" onClick={onClose}>Cancelar</button><button className="btn-tool accent" onClick={() => onSave(editableCues.filter(cue => cue.text.trim() && Number(cue.endMs) > Number(cue.startMs)).sort((a, b) => a.startMs - b.startMs))}>Guardar cambios</button></div></div></div></div>;
};
const ir = [{
  value: "zoom-in",
  label: "🔍 Zoom In"
}, {
  value: "zoom-out",
  label: "🔎 Zoom Out"
}, {
  value: "pan-left",
  label: "⬅️ Pan Izquierda"
}, {
  value: "pan-right",
  label: "➡️ Pan Derecha"
}, {
  value: "still",
  label: "⏹️ Sin Movimiento"
}];
const _Component4 = ({
  isOpen: isOpen,
  onClose: onClose
}) => {
  var captionTrack8;
  var captionTrack9;
  const project = w(state => state.project);
  const importPromptList = w(state => state.importPromptList);
  const syncPromptsWithSrt = w(state => state.syncPromptsWithSrt);
  const setProject = w(state => state.setProject);
  const setAssetState = w(state => state.setAssetState);
  const cues = ((captionTrack8 = project.captionTrack) == null ? undefined : captionTrack8.cues) || [];
  const timedCues = React.useMemo(() => gt(cues), [cues]);
  const hasTimedCues = timedCues.length > 0;
  const [mode, setMode] = React.useState(hasTimedCues ? "srt" : "free");
  const [promptsText, setPromptsText] = React.useState("");
  const [replaceExisting, setReplaceExisting] = React.useState(!0);
  const [defaultDuration, setDefaultDuration] = React.useState(4);
  const [defaultMotion, setDefaultMotion] = React.useState("zoom-in");
  const [showPairingTable, setShowPairingTable] = React.useState(!1);
  const [isDraggingOverSrt, setIsDraggingOverSrt] = React.useState(!1);
  const filteredMap = React.useMemo(() => promptsText.split("\n").map(split => split.trim()).filter(map => map.length > 0), [promptsText]);
  const totalDurationSeconds = React.useMemo(() => cues.length ? Math.max(...cues.map(item => Number(item.endMs) || 0)) / 1000 : 0, [cues]);
  if (!isOpen) {
    return null;
  }
  const handleSrtFile = async from => {
    if (from) {
      try {
        const paragraphs = La(await from.text());
        if (!paragraphs.length) {
          throw new Error("El SRT no contiene subtítulos válidos.");
        }
        setProject({
          ...project,
          engine: "remotion",
          captionTrack: {
            ...project.captionTrack,
            sourceName: from.name,
            cues: paragraphs,
            enabled: !0
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
  const handleChange = async event => {
    var files;
    const file = (files = event.target.files) == null ? undefined : files[0];
    if (file) {
      await handleSrtFile(file);
    }
    event.target.value = "";
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (mode === "srt" && hasTimedCues) {
      syncPromptsWithSrt({
        prompts: promptsText,
        defaultMotion: defaultMotion
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
        defaultMotion: defaultMotion
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
    const hasCharacterRef = ((characterReference9 = project.characterReference) == null ? undefined : characterReference9.enabled) !== false && ((characterReference10 = project.characterReference) != null && !!characterReference10.url || (characterReference11 = project.characterReference) != null && !!characterReference11.base64);
    let framing = null;
    const items = timedCues.map((item, index) => {
      var characterReference;
      const sceneResult = Jt(item.text, index, timedCues.length, styleConfig, hasCharacterRef, {
        previousFraming: framing,
        characterDescription: (characterReference = project.characterReference) == null ? undefined : characterReference.description,
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
      setPromptsText("Toma aérea de una metrópolis futurista con vehículos voladores y rascacielos dorados al atardecer\nPrimer plano de un joven inventor con gafas holográficas ajustando un dispositivo brillante\nEl dispositivo emite un destello de luz que proyecta un mapa estelar en 3D en la habitación\nEl inventor sonríe con asombro mientras las constelaciones giran a su alrededor\nVista general del laboratorio iluminado por el brillo azul de las estrellas proyectadas");
    }
  };
  return <div className="ft-modal-backdrop" onClick={onClose}><div className="ft-modal-container" style={{
      maxWidth: 720
    }} onClick={event => event.stopPropagation()}><div className="ft-modal-header"><div><span className="eyebrow">CREACIÓN Y SINCRONIZACIÓN MASIVA</span><h2>📝 Prompts de Escenas & Sincronización</h2></div><button className="ft-modal-close" onClick={onClose} title="Cerrar">✕</button></div><div style={{
        display: "flex",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        padding: "0 20px"
      }}><button type="button" onClick={() => setMode("srt")} style={{
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
        }}><span>🎙️ Sincronizar con SRT</span>{hasTimedCues ? <span style={{
            background: "rgba(91, 140, 255, 0.16)",
            color: "var(--accent)",
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: 11
          }}>{timedCues.length} Frases</span> : <span style={{
            background: "var(--bg-elevated)",
            color: "var(--text-dim)",
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: 11
          }}>Sin SRT</span>}</button><button type="button" onClick={() => setMode("free")} style={{
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
        }}><span>📝 Lista Libre (Duración Fija)</span><span style={{
            background: "var(--bg-elevated)",
            color: "var(--text-dim)",
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: 11
          }}>{filteredMap.length} Prompts</span></button></div><form onSubmit={handleSubmit} className="ft-modal-body">{mode === "srt" && <div onDragOver={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsDraggingOverSrt(!0);
        }} onDragLeave={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsDraggingOverSrt(!1);
        }} onDrop={event => {
          var dataTransfer;
          event.preventDefault();
          event.stopPropagation();
          setIsDraggingOverSrt(!1);
          const from = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).find(from => {
            const name = (from.name || "").toLowerCase();
            return name.endsWith(".srt") || name.endsWith(".vtt") || name.endsWith(".json");
          });
          if (from) {
            handleSrtFile(from);
          }
        }} style={{
          padding: "14px 16px",
          borderRadius: "var(--radius-md)",
          background: isDraggingOverSrt ? "rgba(99, 102, 241, 0.25)" : hasTimedCues ? "rgba(99, 102, 241, 0.12)" : "rgba(245, 158, 11, 0.12)",
          border: isDraggingOverSrt ? "2px dashed var(--accent, #6366f1)" : hasTimedCues ? "1px solid rgba(99, 102, 241, 0.3)" : "1px dashed rgba(245, 158, 11, 0.4)",
          marginBottom: 16,
          transition: "all 0.2s ease"
        }}>{isDraggingOverSrt ? <div style={{
            textAlign: "center",
            padding: "8px 0",
            color: "#a5b4fc",
            fontWeight: 800,
            fontSize: 13
          }}>📄 ¡Suelta tu archivo .SRT aquí para sincronizar frases!</div> : hasTimedCues ? <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10
          }}><div><div style={{
                fontWeight: 800,
                color: "#e0e7ff",
                fontSize: 13
              }}>📊 SRT Activo: <strong>{((captionTrack9 = project.captionTrack) == null ? undefined : captionTrack9.sourceName) || "Subtítulos cargados"}</strong></div><div style={{
                fontSize: 12,
                color: "#a5b4fc",
                marginTop: 2
              }}><strong>{timedCues.length} escenas / frases detectadas</strong> · Duración total: <strong>{totalDurationSeconds.toFixed(1)} segundos</strong></div></div><div style={{
              display: "flex",
              alignItems: "center",
              gap: 8
            }}><div style={{
                padding: "4px 10px",
                borderRadius: "var(--radius-xs)",
                fontSize: 12,
                fontWeight: 800,
                background: filteredMap.length === timedCues.length ? "var(--success-bg)" : filteredMap.length < timedCues.length ? "var(--warning-bg)" : "rgba(99,102,241,0.2)",
                color: filteredMap.length === timedCues.length ? "var(--success)" : filteredMap.length < timedCues.length ? "var(--warning)" : "#e0e7ff"
              }}>{filteredMap.length === timedCues.length ? "✅ " + filteredMap.length + "/" + timedCues.length + " Prompts" : filteredMap.length < timedCues.length ? "⚠️ " + filteredMap.length + "/" + timedCues.length + " Prompts" : "ℹ️ " + filteredMap.length + " Prompts"}</div><label className="ghost-button" style={{
                height: 28,
                fontSize: 11,
                cursor: "pointer",
                background: "var(--bg-surface)"
              }}><input type="file" accept=".srt,text/plain" onChange={handleChange} style={{
                  display: "none"
                }} />Cambiar SRT</label></div></div> : <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10
          }}><div><div style={{
                fontWeight: 800,
                color: "var(--warning)",
                fontSize: 13
              }}>⚠️ No hay ningún archivo SRT cargado todavía</div><div style={{
                fontSize: 12,
                color: "var(--text-muted)",
                marginTop: 2
              }}>Arrastra tu archivo <strong>.SRT</strong> aquí o cárgalo para sincronizar frases y duraciones.</div></div><label className="ghost-button" style={{
              height: 28,
              fontSize: 11,
              cursor: "pointer",
              background: "var(--bg-surface)"
            }}><input type="file" accept=".srt,text/plain" onChange={handleChange} style={{
                display: "none"
              }} />📄 Cargar o Arrastrar SRT</label></div>}</div>}<div className="field"><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6
          }}><span>{mode === "srt" ? "PEGA TUS PROMPTS EN ORDEN (1 LÍNEA = 1 FRASE DEL SRT)" : "PROMPTS VISUALES (" + filteredMap.length + " ESCENAS DETECTADAS)"}</span><div style={{
              display: "flex",
              gap: 6
            }}>{mode === "srt" && hasTimedCues && <button type="button" onClick={handleClick19} className="ghost-button" style={{
                height: 22,
                padding: "0 8px",
                fontSize: 11,
                background: "rgba(99, 102, 241, 0.15)",
                color: "#a5b4fc",
                border: "1px solid rgba(99, 102, 241, 0.3)"
              }}>🎬 Auto-Generar con Director Cinematográfico</button>}<button type="button" onClick={handleClick20} className="ghost-button" style={{
                height: 22,
                padding: "0 8px",
                fontSize: 11
              }}>Cargar plantilla de ejemplo</button></div></div><textarea rows="8" value={promptsText} onChange={event => setPromptsText(event.target.value)} placeholder={mode === "srt" ? "Línea 1 -> Prompt para la Frase 1 del SRT...\nLínea 2 -> Prompt para la Frase 2 del SRT...\nLínea 3 -> Prompt para la Frase 3 del SRT...\n..." : "Toma aérea de la ciudad...\nPrimer plano del personaje caminando...\nEl personaje entra al laboratorio..."} autoFocus={!0} style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            lineHeight: 1.6
          }} /></div><div className="two-fields" style={{
          marginBottom: 12
        }}>{mode === "free" ? <label className="field"><span>Duración fija por escena (segundos)</span><input type="number" min="1" max="60" value={defaultDuration} onChange={event => setDefaultDuration(Math.max(1, Math.min(60, Number(event.target.value) || 4)))} /></label> : <div className="field"><span>Duración de escenas</span><div style={{
              padding: "10px 12px",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              fontSize: 12.5,
              color: "var(--text-secondary)",
              border: "1px solid var(--border)"
            }}>⏱️ <strong>Exacta por frase del SRT</strong> ({timedCues.length ? "de " + Math.min(...timedCues.map(item => item.duration)).toFixed(1) + "s a " + Math.max(...timedCues.map(item => item.duration)).toFixed(1) + "s" : "Automática"})</div></div>}<label className="field"><span>Efecto de Movimiento</span><select value={defaultMotion} onChange={event => setDefaultMotion(event.target.value)}>{ir.map(ir => <option value={ir.value} key={ir.value}>{ir.label}</option>)}</select></label></div>{mode === "srt" && hasTimedCues && <div style={{
          marginBottom: 16
        }}><button type="button" onClick={() => setShowPairingTable(!showPairingTable)} className="ghost-button" style={{
            width: "100%",
            height: 30,
            fontSize: 11.5,
            justifyContent: "space-between"
          }}><span>{showPairingTable ? "🔼 Ocultar emparejamiento con SRT" : "🔽 Ver tabla de emparejamiento Frase SRT ➡️ Prompt"}</span><span>{timedCues.length} Frases</span></button>{showPairingTable && <div style={{
            maxHeight: 180,
            overflowY: "auto",
            marginTop: 8,
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            background: "var(--bg-base)",
            fontSize: 11.5
          }}>{timedCues.map((item, index) => {
              const matchedPrompt = filteredMap[index];
              return <div style={{
                padding: "6px 10px",
                borderBottom: "1px solid var(--border-subtle)",
                display: "grid",
                gridTemplateColumns: "32px 1fr 1fr",
                gap: 8,
                alignItems: "center"
              }} key={index}><span style={{
                  color: "var(--text-dim)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 800
                }}>#{String(index + 1).padStart(2, "0")}</span><span style={{
                  color: "#a5b4fc",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }} title={item.text}>🗣️ "{item.text}" <small style={{
                    color: "var(--text-dim)"
                  }}>({item.duration}s)</small></span><span style={{
                  color: matchedPrompt ? "var(--accent)" : "var(--text-dim)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>{matchedPrompt ? "🎨 " + matchedPrompt : "(Sin prompt - generable con IA)"}</span></div>;
            })}</div>}</div>}<div className="ft-modal-footer"><button type="button" className="ghost-button" onClick={onClose}>Cancelar</button><button type="submit" className="action primary" disabled={mode === "srt" ? !hasTimedCues : !filteredMap.length} style={{
            width: "auto",
            minWidth: 200,
            margin: 0
          }}>{mode === "srt" && hasTimedCues ? "⚡ Sincronizar " + timedCues.length + " Escenas con SRT" : replaceExisting ? "Crear " + filteredMap.length + " Escenas" : "Añadir " + filteredMap.length + " Escenas"}</button></div></form></div></div>;
};
const _Component5 = ({
  isOpen: isOpen,
  onClose: onClose
}) => {
  const project = w(state => state.project);
  const assignImagesToScenes = w(state => state.assignImagesToScenes);
  const [isUploading, setIsUploading] = React.useState(!1);
  const [statusMessage, setStatusMessage] = React.useState("");
  if (!isOpen) {
    return null;
  }
  const handleChange = async event => {
    const items30 = Array.from(event.target.files || []);
    if (!items30.length) {
      return;
    }
    items30.sort((a, b) => a.name.localeCompare(b.name, undefined, {
      numeric: !0,
      sensitivity: "base"
    }));
    setIsUploading(!0);
    setStatusMessage("Subiendo 0 de " + items30.length + " imágenes...");
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
      alert("Error al subir imágenes: " + error.message);
    } finally {
      setIsUploading(!1);
      setStatusMessage("");
    }
  };
  return <div className="ft-modal-backdrop" onClick={onClose}><div className="ft-modal-container" onClick={event => event.stopPropagation()}><div className="ft-modal-header"><div><span className="eyebrow">ASIGNACIÓN MANUAL</span><h2>🖼️ Asignar Imágenes Locales en Lote</h2></div><button className="ft-modal-close" onClick={onClose} title="Cerrar">✕</button></div><div className="ft-modal-body"><p className="ft-modal-description">Selecciona múltiples imágenes desde tu computadora. Se subirán y asignarán automáticamente a tus <strong>{project.scenes.length} escenas</strong> en orden (1ª imagen a la escena 1, 2ª a la escena 2, etc.).</p><label className={"upload-zone " + (isUploading ? "disabled" : "")} style={{
          minHeight: 120,
          margin: "20px 0"
        }}><input type="file" accept="image/*" multiple={!0} disabled={isUploading} onChange={handleChange} /><span style={{
            fontSize: 13,
            marginBottom: 4
          }}>{isUploading ? statusMessage : "📁 Haz clic para seleccionar múltiples imágenes"}</span><small>Se ordenarán automáticamente por nombre de archivo (ej: 1.jpg, 2.jpg...)</small></label><div className="ft-modal-footer"><button type="button" className="ghost-button" onClick={onClose} disabled={isUploading}>Cerrar</button></div></div></div></div>;
};
const _Component9 = ({
  onSelectScene: onSelectScene
}) => {
  var captionTrack;
  var cues;
  const project = w(state => state.project);
  const selectedId = w(state => state.selectedId);
  const handleClick21 = w(state => state.addScene);
  const moveScene = w(state => state.moveScene);
  const duplicateScene = w(state => state.duplicateScene);
  w(state => state.removeScene);
  const toggleSceneImageVisibility = w(state => state.toggleSceneImageVisibility);
  const toggleSceneCharacter = w(state => state.toggleSceneCharacter);
  const updateProject = w(state => state.updateProject);
  const [viewMode, setViewMode] = React.useState("grid");
  const [isPromptsModalOpen, setIsPromptsModalOpen] = React.useState(!1);
  const [isBatchImagesModalOpen, setIsBatchImagesModalOpen] = React.useState(!1);
  const length = ((cues = (captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) == null ? undefined : cues.length) || 0;
  const handleClick22 = () => {
    var scenes6;
    if ((scenes6 = project.scenes) == null || !scenes6.length) {
      return;
    }
    const shotTypeSuggestions = Xn(project.scenes);
    let convertedCount = 0;
    const scenes7 = project.scenes.map((scene, index) => {
      const suggestion = shotTypeSuggestions[index];
      if ((suggestion == null ? undefined : suggestion.suggestedShotType) === "B-ROLL" && scene.hasCharacter !== !1) {
        convertedCount++;
        const scene10 = qn(scene.script || scene.caption, project.visualStyle);
        return {
          ...scene,
          hasCharacter: !1,
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
        message: convertedCount > 0 ? "🏙️ " + convertedCount + " escenas identificadas y configuradas como B-Roll cinemático." : "ℹ️ La secuencia ya tiene un balance óptimo de A-Roll y B-Roll."
      }
    }));
  };
  return <jsxRuntime.Fragment><section className="scene-panel"><div className="panel-heading" style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 12
      }}><div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }}><div><span className="eyebrow" style={{
              fontSize: 10,
              letterSpacing: "0.1em"
            }}>GUION VISUAL</span><h2 style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 800
            }}>{project.scenes.length} escenas</h2></div><div style={{
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>{length > 0 && <span onClick={() => setIsPromptsModalOpen(!0)} style={{
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
            }} title="Hacer clic para sincronizar prompts con el guion SRT">🎙️ {length} SRT</span>}<div style={{
              display: "flex",
              background: "rgba(255,255,255,0.06)",
              padding: 2,
              borderRadius: 6,
              border: "1px solid var(--border)"
            }}><button type="button" onClick={() => setViewMode("grid")} style={{
                padding: "3px 7px",
                fontSize: 11,
                fontWeight: 800,
                borderRadius: 4,
                border: 0,
                background: viewMode === "grid" ? "var(--accent)" : "transparent",
                color: viewMode === "grid" ? "var(--accent-text)" : "var(--text-dim)",
                cursor: "pointer"
              }} title="Vista Storyboard en Cuadrícula">☷ Grid</button><button type="button" onClick={() => setViewMode("list")} style={{
                padding: "3px 7px",
                fontSize: 11,
                fontWeight: 800,
                borderRadius: 4,
                border: 0,
                background: viewMode === "list" ? "var(--accent)" : "transparent",
                color: viewMode === "list" ? "var(--accent-text)" : "var(--text-dim)",
                cursor: "pointer"
              }} title="Vista Lista Compacta">☰ Lista</button></div></div></div><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1.1fr",
          gap: 5,
          width: "100%"
        }}><button type="button" onClick={() => setIsPromptsModalOpen(!0)} className="ghost-button" style={{
            padding: 0,
            height: 28,
            fontSize: 10.5,
            fontWeight: 700,
            justifyContent: "center"
          }} title="Importar lista de prompts o sincronizar con SRT">📝 Prompts</button><button type="button" onClick={handleClick22} className="ghost-button" style={{
            padding: 0,
            height: 28,
            fontSize: 10.5,
            fontWeight: 700,
            justifyContent: "center",
            color: "#38bdf8",
            border: "1px solid rgba(56, 189, 248, 0.25)"
          }} title="Detectar cortes cinemáticos B-Roll automáticamente a partir del guion">🏙️ B-Roll IA</button><button type="button" onClick={() => setIsBatchImagesModalOpen(!0)} className="ghost-button" style={{
            padding: 0,
            height: 28,
            fontSize: 10.5,
            fontWeight: 700,
            justifyContent: "center"
          }} title="Asignar múltiples imágenes locales en lote">🖼️ Fotos</button><button type="button" onClick={handleClick21} style={{
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
          }} title="Añadir una nueva escena manual">+ Escena</button></div></div>{viewMode === "grid" ? <div className="storyboard-grid">{project.scenes.map((scene, index) => {
          var status;
          const isSelected = selectedId === scene.id;
          const hasError = (status = scene.status) != null && !!status.includes("error") || !!scene.error;
          return <article className={"storyboard-card " + (isSelected ? "selected" : "") + " " + (hasError ? "failed" : scene.prompt && !scene.imageUrl && !scene.videoUrl && !scene.status.includes("generating") ? "pending" : "")} onClick={() => onSelectScene(scene.id)} key={scene.id}><div className="storyboard-thumb-container" style={scene.imageHidden ? {
              opacity: 0.45,
              filter: "grayscale(100%)"
            } : undefined}><span className="storyboard-badge-number">{String(index + 1).padStart(2, "0")}</span><span className="storyboard-badge-duration">{scene.duration}s</span>{scene.videoUrl || scene.flowVideoUrl ? <video src={scene.videoUrl || scene.flowVideoUrl} poster={scene.imageUrl || undefined} muted={!0} playsInline={!0} preload="metadata" /> : scene.imageUrl ? <img src={scene.imageUrl} alt="" loading="lazy" /> : <div style={{
                display: "grid",
                placeItems: "center",
                height: "100%",
                color: "var(--text-dim)",
                fontSize: 24,
                fontWeight: 300
              }}>+</div>}{scene.imageHidden && <i className="scene-failed" style={{
                background: "rgba(239, 68, 68, 0.9)"
              }} title="Oculta en timeline">🚫</i>}{scene.status.includes("generating") && <i className="working" style={scene.status === "prompt-generating" ? {
                borderColor: "var(--accent)"
              } : undefined} title={scene.status === "prompt-generating" ? "Escribiendo prompt..." : "Generando imagen..."} />}{hasError && <i className="scene-failed" title={"Error: " + (scene.error || "fallo")}>!</i>}</div><div className="storyboard-card-body"><div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 4
              }}><strong className="storyboard-card-title" title={scene.title}>{scene.title}</strong><span className={"scene-tag " + (scene.hasCharacter === !1 ? "b-roll" : "character")} onClick={event => {
                  event.stopPropagation();
                  toggleSceneCharacter(scene.id);
                }} style={{
                  cursor: "pointer",
                  fontSize: 9,
                  padding: "1px 5px"
                }} title="Clic para alternar entre A-Roll (Personaje) y B-Roll (Entorno/Objeto)">{scene.hasCharacter === !1 ? "🏙️ B-Roll" : "👤 A-Roll"}</span></div>{scene.script && <p className="storyboard-card-script" title={scene.script}>🗣️ {scene.script}</p>}</div><div className="storyboard-card-actions"><div style={{
                display: "flex",
                alignItems: "center",
                gap: 4
              }}><button type="button" onClick={event => {
                  event.stopPropagation();
                  window.dispatchEvent(new CustomEvent("flowtube:regenerate-scene", {
                    detail: {
                      sceneId: scene.id
                    }
                  }));
                }} title="Regenerar con IA" style={{
                  color: "#ffd166",
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  padding: "2px 4px",
                  fontSize: 13,
                  fontWeight: 900
                }}>⚡</button>{scene.imageUrl && <button type="button" onClick={event => {
                  event.stopPropagation();
                  window.dispatchEvent(new CustomEvent("flowtube:generate-video", {
                    detail: {
                      sceneId: scene.id,
                      model: scene.videoModel || "omni"
                    }
                  }));
                }} title="Generar Video con IA" style={{
                  color: "#38bdf8",
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  padding: "2px 4px",
                  fontSize: 12,
                  fontWeight: 900
                }}>🎬</button>}<button type="button" onClick={event => {
                  event.stopPropagation();
                  toggleSceneImageVisibility(scene.id);
                }} title={scene.imageHidden ? "Mostrar imagen" : "Ocultar imagen"} style={{
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  padding: "2px 4px",
                  fontSize: 11
                }}>{scene.imageHidden ? "🙈" : "👁️"}</button></div><div style={{
                display: "flex",
                alignItems: "center",
                gap: 2
              }}><button type="button" onClick={event => {
                  event.stopPropagation();
                  moveScene(scene.id, -1);
                }} title="Mover anterior" style={{
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  color: "var(--text-dim)",
                  padding: "2px 3px",
                  fontSize: 11
                }}>←</button><button type="button" onClick={event => {
                  event.stopPropagation();
                  duplicateScene(scene.id);
                }} title="Duplicar" style={{
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  color: "var(--text-dim)",
                  padding: "2px 3px",
                  fontSize: 11
                }}>⊕</button><button type="button" onClick={event => {
                  event.stopPropagation();
                  moveScene(scene.id, 1);
                }} title="Mover siguiente" style={{
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  color: "var(--text-dim)",
                  padding: "2px 3px",
                  fontSize: 11
                }}>→</button></div></div></article>;
        })}</div> : <div className="scene-list">{project.scenes.map((scene, index) => {
          var status;
          var motion;
          const isSelected = selectedId === scene.id;
          const hasError = (status = scene.status) != null && !!status.includes("error") || !!scene.error;
          return <article className={"scene-row " + (isSelected ? "selected" : "") + " " + (hasError ? "failed" : scene.prompt && !scene.imageUrl && !scene.videoUrl && !scene.status.includes("generating") ? "pending" : "")} onClick={() => onSelectScene(scene.id)} key={scene.id}><span className="scene-number">{String(index + 1).padStart(2, "0")}</span><div className="scene-thumb" style={scene.imageHidden ? {
              opacity: 0.45,
              filter: "grayscale(100%)"
            } : undefined}>{scene.videoUrl || scene.flowVideoUrl ? <video src={scene.videoUrl || scene.flowVideoUrl} poster={scene.imageUrl || undefined} muted={!0} playsInline={!0} preload="metadata" /> : scene.imageUrl ? <img src={scene.imageUrl} alt="" /> : <span style={{
                fontSize: 18,
                color: "var(--text-dim)"
              }}>+</span>}{scene.imageHidden && <i className="scene-failed" style={{
                background: "rgba(239, 68, 68, 0.9)"
              }} title="Imagen oculta en timeline">🚫</i>}{scene.status.includes("generating") && <i className="working" style={scene.status === "prompt-generating" ? {
                borderColor: "var(--accent)"
              } : undefined} title={scene.status === "prompt-generating" ? "Escribiendo prompt con IA..." : "Generando imagen con Flow..."} />}{hasError && <i className="scene-failed" title={"Error: " + (scene.error || "fallo")}>!</i>}</div><div className="scene-row-copy"><strong className="scene-row-title" title={scene.title}>{scene.title}</strong><div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
                margin: "2px 0"
              }}><span className={"scene-tag " + (scene.hasCharacter === !1 ? "b-roll" : "character")} onClick={event => {
                  event.stopPropagation();
                  toggleSceneCharacter(scene.id);
                }} style={{
                  cursor: "pointer"
                }} title="Clic para alternar entre A-Roll (Personaje) y B-Roll (Entorno/Objeto)">{scene.hasCharacter === !1 ? "🏙️ B-Roll" : "👤 A-Roll"}</span><span className="scene-row-meta">{scene.status === "prompt-generating" ? <span style={{
                    color: "var(--accent)",
                    fontWeight: 700
                  }}>✨ Prompt IA...</span> : <span>{scene.duration}s · {((motion = scene.motion) == null ? undefined : motion.replace("-", " ")) || "zoom"}</span>}</span></div>{scene.script && <div className="scene-row-script" title={scene.script}>🗣️ "{scene.script}"</div>}</div><div className="scene-order"><button onClick={event => {
                event.stopPropagation();
                window.dispatchEvent(new CustomEvent("flowtube:regenerate-scene", {
                  detail: {
                    sceneId: scene.id
                  }
                }));
              }} title="Regenerar imagen con IA" style={{
                color: "#ffd166",
                fontWeight: 900
              }}>⚡</button>{scene.imageUrl && <button onClick={event => {
                event.stopPropagation();
                window.dispatchEvent(new CustomEvent("flowtube:generate-video", {
                  detail: {
                    sceneId: scene.id,
                    model: scene.videoModel || "omni"
                  }
                }));
              }} title={"Generar Video con IA (" + (scene.videoModel === "veo-3.1-lite" ? "Veo 3.1 Lite" : "Omni Flash") + ")"} style={{
                color: "#38bdf8",
                fontWeight: 900
              }}>🎬</button>}<button onClick={event => {
                event.stopPropagation();
                toggleSceneImageVisibility(scene.id);
              }} title={scene.imageHidden ? "Mostrar imagen" : "Ocultar imagen"}>{scene.imageHidden ? "🙈" : "👁️"}</button><button onClick={event => {
                event.stopPropagation();
                moveScene(scene.id, -1);
              }} title="Mover arriba">↑</button><button onClick={event => {
                event.stopPropagation();
                duplicateScene(scene.id);
              }} title="Duplicar (Ctrl+D)">⊕</button><button onClick={event => {
                event.stopPropagation();
                moveScene(scene.id, 1);
              }} title="Mover abajo">↓</button></div></article>;
        })}</div>}</section><_Component4 isOpen={isPromptsModalOpen} onClose={() => setIsPromptsModalOpen(!1)} /><_Component5 isOpen={isBatchImagesModalOpen} onClose={() => setIsBatchImagesModalOpen(!1)} /></jsxRuntime.Fragment>;
};
const ur = [{
  value: "gentle-zoom-in",
  label: "🌿 Zoom de Entrada Suave"
}, {
  value: "gentle-zoom-out",
  label: "🌿 Zoom de Salida Suave"
}, {
  value: "zoom-in",
  label: "🔍 Zoom In Cinemático"
}, {
  value: "zoom-out",
  label: "🔎 Zoom Out Cinemático"
}, {
  value: "pan-left",
  label: "⬅️ Paneo Suave Izquierda"
}, {
  value: "pan-right",
  label: "➡️ Paneo Suave Derecha"
}, {
  value: "pan-up",
  label: "⬆️ Ascenso Suave"
}, {
  value: "pan-down",
  label: "⬇️ Descenso Suave"
}, {
  value: "drift-left-right",
  label: "🌊 Deriva Izquierda → Derecha"
}, {
  value: "drift-right-left",
  label: "🌊 Deriva Derecha → Izquierda"
}, {
  value: "cinematic-arc-left",
  label: "🎥 Arco Cinemático Izquierdo"
}, {
  value: "cinematic-arc-right",
  label: "🎥 Arco Cinemático Derecho"
}, {
  value: "soft-orbit-left",
  label: "🪐 Órbita Suave Izquierda"
}, {
  value: "soft-orbit-right",
  label: "🪐 Órbita Suave Derecha"
}, {
  value: "zoom-pan-top-left",
  label: "↖️ Zoom Diagonal Sup. Izq."
}, {
  value: "zoom-pan-top-right",
  label: "↗️ Zoom Diagonal Sup. Der."
}, {
  value: "zoom-pan-bottom-left",
  label: "↙️ Zoom Diagonal Inf. Izq."
}, {
  value: "zoom-pan-bottom-right",
  label: "↘️ Zoom Diagonal Inf. Der."
}, {
  value: "breathe",
  label: "🫁 Respiración Sutil"
}, {
  value: "floating",
  label: "☁️ Flotación Suave"
}, {
  value: "camera-tilt-left",
  label: "📐 Inclinación Suave Izquierda"
}, {
  value: "camera-tilt-right",
  label: "📐 Inclinación Suave Derecha"
}, {
  value: "slow-drift",
  label: "🍃 Deriva Lenta"
}, {
  value: "whip-zoom-in",
  label: "🎬 Acercamiento Progresivo"
}, {
  value: "still",
  label: "⏹️ Estático (Sin Movimiento)"
}, {
  value: "custom",
  label: "🛠️ Keyframes Personalizados (Pro)"
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
  label: "Arial (Clásico Limpio)"
}, {
  value: "'Trebuchet MS', sans-serif",
  label: "Trebuchet (Dinámico)"
}, {
  value: "'Courier New', monospace",
  label: "Courier (Código / Retro)"
}];
const mr = [{
  value: "viral-yellow-pop",
  label: "🟡 Viral Gold Pop (TikTok / Shorts)"
}, {
  value: "claude-kinetic-reveal",
  label: "🎬 Claude Kinetic (Slide + Resalte Dorado)"
}, {
  value: "char-slide-highlight",
  label: "✨ Kinetic Char Slide (Letra por letra)"
}, {
  value: "soft-scale",
  label: "🫧 SoftScale (Escala suave)"
}, {
  value: "pop-up",
  label: "⬆️ PopUp (Entrada elástica)"
}, {
  value: "karaoke",
  label: "🎤 Karaoke Neón (Alex Hormozi)"
}, {
  value: "hormozi-pill",
  label: "🟡 Hormozi Highlight Pill (Caja de resalte)"
}, {
  value: "hormozi",
  label: "💥 Pop-In Bounce (TikTok / Reels)"
}, {
  value: "word-underline",
  label: "✍️ Subrayado Palabra Activa"
}, {
  value: "minimal-lower-third",
  label: "🪟 Lower Third Minimal Glass"
}, {
  value: "documentary-serif",
  label: "🎞️ Documental Serif Elegante"
}, {
  value: "typewriter",
  label: "⌨️ Máquina de Escribir"
}, {
  value: "boxed-modern",
  label: "⬜ Caja Moderna Editorial"
}, {
  value: "gradient-pop",
  label: "🌈 Gradiente Suave"
}, {
  value: "word-zoom",
  label: "🔎 Foco por Palabra"
}, {
  value: "kinetic-stagger",
  label: "🪜 Entrada Escalonada"
}, {
  value: "wave-jump",
  label: "🌊 Onda de Palabras"
}, {
  value: "cyber-glitch",
  label: "🤖 Cyber Glitch"
}, {
  value: "fire-glow",
  label: "🔥 Fire Glow"
}, {
  value: "slide",
  label: "⬆️ Slide Up Suave"
}, {
  value: "cinematic-fade",
  label: "🎬 Cinematic Fade (Documental)"
}, {
  value: "clean",
  label: "⚡ Minimalista"
}];
const hr = [{
  id: "viral-gold",
  label: "🟡 Viral Gold",
  color: "#ffffff",
  highlightColor: "#FFD700",
  outlineColor: "#000000"
}, {
  id: "classic",
  label: "Clásico",
  color: "#ffffff",
  highlightColor: "#d7ff4f",
  outlineColor: "#08090d"
}, {
  id: "electric",
  label: "Eléctrico",
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
  label: "Imagen: Nano Banana 2 Lite (Rápido)"
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
  detail: "Lower Priority · 8 s"
}, {
  value: "omni",
  label: "Omni Flash",
  detail: "Rápido · 4 a 10 s"
}];
const br = [4, 6, 8, 10];
const mt = [{
  value: "none",
  label: "Sin transición"
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
  label: "2D Cómic / Webtoon"
}, {
  value: "stickman-2d",
  label: "2D Infográfico editorial"
}, {
  value: "cinematico",
  label: "Cinemático realista"
}, {
  value: "anime",
  label: "Anime / Manga"
}, {
  value: "pixel-art",
  label: "Pixel Art 8-bit"
}, {
  value: "stickman",
  label: "Stickman clásico"
}, {
  value: "stickman-dark",
  label: "Stickman Dark"
}, {
  value: "low-poly",
  label: "Low Poly 3D"
}, {
  value: "salud",
  label: "Ilustración médica"
}, {
  value: "fantasia",
  label: "Fantasía épica"
}, {
  value: "realista",
  label: "Fotografía realista"
}];
const Tt = ({
  value: value,
  options: options,
  onChange: onChange,
  disabled: disabled = !1
}) => {
  const [isOpen, setIsOpen] = React.useState(!1);
  const divRef = React.useRef(null);
  const found = options.find(item => String(item.value) === String(value)) || options[0];
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleOutsideClick = event => {
      var current;
      if ((current = divRef.current) == null || !current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isOpen]);
  return <div ref={divRef} className={"styled-dropdown " + (isOpen ? "open" : "") + " " + (disabled ? "disabled" : "")}><button type="button" className="styled-dropdown-trigger" disabled={disabled} onClick={() => setIsOpen(prev => !prev)} aria-haspopup="listbox" aria-expanded={isOpen}><span>{(found == null ? undefined : found.label) || "Seleccionar"}</span><i>⌄</i></button>{isOpen ? <div className="styled-dropdown-menu" role="listbox">{options.map(item => <button type="button" className={String(item.value) === String(value) ? "selected" : ""} onClick={() => {
        onChange(item.value);
        setIsOpen(!1);
      }} role="option" aria-selected={String(item.value) === String(value)} key={item.value}><span>{item.label}</span>{item.detail ? <small>{item.detail}</small> : null}</button>)}</div> : null}</div>;
};
const _Component6 = ({
  selected: selected,
  project: project,
  scenes: scenes,
  updateScene: updateScene,
  removeScene: removeScene,
  updateProject: updateProject,
  addStyleReference: addStyleReference,
  removeStyleReference: removeStyleReference,
  setTransitionDefaults: setTransitionDefaults,
  applyTransitionToAll: applyTransitionToAll,
  flowState: flowState,
  isVideoGenerating: isVideoGenerating,
  onUploadImage: onUploadImage,
  onGenerateImage: onGenerateImage,
  onGenerateVideo: onGenerateVideo,
  onOpenBatchPromptsModal: onOpenBatchPromptsModal,
  onTranscribeAudio: onTranscribeAudio
}) => {
  var ta;
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
  const [isCharacterRefDragOver, setIsCharacterRefDragOver] = React.useState(!1);
  const [isStyleRef0DragOver, setIsStyleRef0DragOver] = React.useState(!1);
  const [isStyleRef1DragOver, setIsStyleRef1DragOver] = React.useState(!1);
  const [collapsedSections, setCollapsedSections] = React.useState({
    styleRefs: !1,
    prompt: !1,
    videoGen: !1,
    sceneAudio: !1
  });
  const toggleSection = sectionKey => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };
  const styleReferences = Array.isArray(project.styleReferences) ? project.styleReferences : [];
  const videoModel = (selected == null ? undefined : selected.videoModel) === "omni" ? "omni" : "veo-3.1-lite";
  const videoDuration = videoModel === "veo-3.1-lite" ? 8 : [4, 6, 8, 10].includes(Number(selected == null ? undefined : selected.videoDuration)) ? Number(selected.videoDuration) : 8;
  const label = ((ta = Ta.find(ta => ta.value === videoModel)) == null ? undefined : ta.label) || "Veo 3.1 Lite";
  const defaultTransition = mt.some(mt => {
    var transitions;
    return mt.value === ((transitions = project.transitions) == null ? undefined : transitions.default);
  }) ? project.transitions.default : "fade";
  const transition = (selected == null ? undefined : selected.transition) === "inherit" || !mt.some(mt => mt.value === (selected == null ? undefined : selected.transition)) ? "inherit" : selected.transition;
  const resolveRefUrl = characterReference => characterReference ? characterReference.url && !characterReference.url.startsWith("blob:") ? characterReference.url : characterReference.base64 ? "data:" + (characterReference.mimeType || "image/jpeg") + ";base64," + characterReference.base64 : characterReference.url || "" : "";
  const fileToReference = async file => {
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
      base64: base64,
      mimeType: type7
    };
  };
  const handleCharacterRefUpload = async from => {
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
    return <div className="tab-pane"><div className="pane-header"><div><span className="eyebrow">ESCENA SELECCIONADA</span><h3>{selected.title}</h3></div>{scenes.length > 1 ? <button className="del-scene-btn" onClick={() => removeScene(selected.id)} title="Eliminar escena">×</button> : null}</div><div className="inspector-accordion-card"><button type="button" className="accordion-header-btn" onClick={() => toggleSection("styleRefs")}><div className="accordion-title-group"><span style={{
              fontSize: 13
            }}>🎨</span><h4>Estilo Visual & Referencias</h4><span className="char-count" style={{
              fontSize: 10,
              background: "rgba(255,255,255,0.06)",
              padding: "1px 6px",
              borderRadius: 4
            }}>{(project.characterReference ? 1 : 0) + styleReferences.length}/3 Activas</span></div><span className={"accordion-chevron " + (collapsedSections.styleRefs ? "collapsed" : "expanded")}>▼</span></button>{!collapsedSections.styleRefs && <div className="accordion-content-body"><div className="form-group" style={{
            marginBottom: 10
          }}><select className="form-select" value={project.visualStyle || "cinematico"} onChange={event => updateProject({
              visualStyle: event.target.value
            })} style={{
              height: 32,
              fontSize: 11.5,
              fontWeight: 700
            }}>{xr.map(xr => <option value={xr.value} key={xr.value}>{xr.label}</option>)}{styleReferences.length > 0 ? <option value="custom-style">✨ Estilo con {styleReferences.length} referencia(s)</option> : null}</select></div><div className="reference-slots-grid">{(() => {
              const characterRefUrl = resolveRefUrl(project.characterReference);
              return <div className={"ref-slot-card " + (characterRefUrl ? "has-image" : "") + " " + (isCharacterRefDragOver ? "is-dragover" : "")} onDragOver={event => {
                event.preventDefault();
                event.stopPropagation();
                setIsCharacterRefDragOver(true);
              }} onDragLeave={event => {
                event.preventDefault();
                event.stopPropagation();
                setIsCharacterRefDragOver(false);
              }} onDrop={async event => {
                var dataTransfer;
                event.preventDefault();
                event.stopPropagation();
                setIsCharacterRefDragOver(false);
                const from = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).find(from => {
                  var type;
                  if ((type = from.type) == null) {
                    return undefined;
                  } else {
                    return type.startsWith("image/");
                  }
                });
                if (from) {
                  handleCharacterRefUpload(from);
                }
              }}><div className="ref-slot-header"><span className="ref-slot-title">PERSONAJE</span><span className="ref-slot-badge">Avatar</span></div>{characterRefUrl ? <div className="ref-slot-preview"><img src={characterRefUrl} alt="Avatar de Referencia" onError={event => {
                    var characterReference;
                    if ((characterReference = project.characterReference) != null && characterReference.base64) {
                      event.currentTarget.src = "data:" + (project.characterReference.mimeType || "image/jpeg") + ";base64," + project.characterReference.base64;
                    }
                  }} /><button type="button" className="ref-slot-del-btn" onClick={event => {
                    event.stopPropagation();
                    updateProject({
                      characterReference: null
                    });
                  }} title="Quitar referencia de personaje">×</button></div> : <label className="ref-slot-empty"><input type="file" accept="image/*" onChange={event => {
                    var files;
                    if ((files = event.target.files) != null && files[0]) {
                      handleCharacterRefUpload(event.target.files[0]);
                    }
                  }} style={{
                    display: "none"
                  }} /><span className="ref-slot-icon">👤</span><span className="ref-slot-label">+ Avatar</span><small className="ref-slot-hint">Arrastra aquí</small></label>}</div>;
            })()}{(() => {
              const styleRef0Url = resolveRefUrl(styleReferences[0]);
              return <div className={"ref-slot-card " + (styleRef0Url ? "has-image" : "") + " " + (isStyleRef0DragOver ? "is-dragover" : "")} onDragOver={event => {
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef0DragOver(true);
              }} onDragLeave={event => {
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef0DragOver(false);
              }} onDrop={async event => {
                var dataTransfer;
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef0DragOver(false);
                const from = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).find(from => {
                  var type;
                  if ((type = from.type) == null) {
                    return undefined;
                  } else {
                    return type.startsWith("image/");
                  }
                });
                if (from) {
                  handleStyleRefUpload(from, 0);
                }
              }}><div className="ref-slot-header"><span className="ref-slot-title">STYLE</span><span className="ref-slot-badge">Arte</span></div>{styleRef0Url ? <div className="ref-slot-preview"><img src={styleRef0Url} alt="Referencia de Estilo" onError={event => {
                    var styleRef0;
                    if ((styleRef0 = styleReferences[0]) != null && styleRef0.base64) {
                      event.currentTarget.src = "data:" + (styleReferences[0].mimeType || "image/jpeg") + ";base64," + styleReferences[0].base64;
                    }
                  }} /><button type="button" className="ref-slot-del-btn" onClick={event => {
                    event.stopPropagation();
                    removeStyleReference(styleReferences[0].id);
                  }} title="Quitar referencia de estilo">×</button></div> : <label className="ref-slot-empty"><input type="file" accept="image/*" onChange={event => {
                    var files;
                    if ((files = event.target.files) != null && files[0]) {
                      handleStyleRefUpload(event.target.files[0], 0);
                    }
                  }} style={{
                    display: "none"
                  }} /><span className="ref-slot-icon">🎨</span><span className="ref-slot-label">+ Estilo</span><small className="ref-slot-hint">Arrastra aquí</small></label>}</div>;
            })()}{(() => {
              const styleRef1Url = resolveRefUrl(styleReferences[1]);
              return <div className={"ref-slot-card " + (styleRef1Url ? "has-image" : "") + " " + (isStyleRef1DragOver ? "is-dragover" : "")} onDragOver={event => {
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef1DragOver(true);
              }} onDragLeave={event => {
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef1DragOver(false);
              }} onDrop={async event => {
                var dataTransfer;
                event.preventDefault();
                event.stopPropagation();
                setIsStyleRef1DragOver(false);
                const from = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).find(from => {
                  var type;
                  if ((type = from.type) == null) {
                    return undefined;
                  } else {
                    return type.startsWith("image/");
                  }
                });
                if (from) {
                  handleStyleRefUpload(from, 1);
                }
              }}><div className="ref-slot-header"><span className="ref-slot-title">AMBIENTE</span><span className="ref-slot-badge">Fondo</span></div>{styleRef1Url ? <div className="ref-slot-preview"><img src={styleRef1Url} alt="Referencia de Ambiente" onError={event => {
                    var styleRef1;
                    if ((styleRef1 = styleReferences[1]) != null && styleRef1.base64) {
                      event.currentTarget.src = "data:" + (styleReferences[1].mimeType || "image/jpeg") + ";base64," + styleReferences[1].base64;
                    }
                  }} /><button type="button" className="ref-slot-del-btn" onClick={event => {
                    event.stopPropagation();
                    removeStyleReference(styleReferences[1].id);
                  }} title="Quitar referencia de ambiente">×</button></div> : <label className="ref-slot-empty"><input type="file" accept="image/*" onChange={event => {
                    var files;
                    if ((files = event.target.files) != null && files[0]) {
                      handleStyleRefUpload(event.target.files[0], 1);
                    }
                  }} style={{
                    display: "none"
                  }} /><span className="ref-slot-icon">🏞️</span><span className="ref-slot-label">+ Ambiente</span><small className="ref-slot-hint">Arrastra aquí</small></label>}</div>;
            })()}</div></div>}</div><div className="inspector-accordion-card"><button type="button" className="accordion-header-btn" onClick={() => toggleSection("prompt")}><div className="accordion-title-group"><span style={{
              fontSize: 13
            }}>📝</span><h4>Prompt Visual & Imagen</h4></div><span className={"accordion-chevron " + (collapsedSections.prompt ? "collapsed" : "expanded")}>▼</span></button>{!collapsedSections.prompt && <div className="accordion-content-body"><div className="form-group" style={{
            marginBottom: 10
          }}><label style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#94a3b8"
            }}>Título de Escena</label><input type="text" value={selected.title} onChange={event => updateScene(selected.id, {
              title: event.target.value
            })} className="form-input" /></div><div className="form-group" style={{
            marginBottom: 10
          }}><div className="label-row" style={{
              marginBottom: 4
            }}><label style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#94a3b8"
              }}>Descripción de Escena (Prompt)</label><span className="char-count" style={{
                fontSize: 10
              }}>{((prompt = selected.prompt) == null ? undefined : prompt.length) || 0} car</span></div><textarea value={selected.prompt || ""} onChange={event => updateScene(selected.id, {
              prompt: event.target.value
            })} placeholder="Describe la escena en detalle (sujeto, acción, cámara, iluminación, fondo)..." rows={2} className="form-textarea" style={{
              minHeight: 48,
              maxHeight: 110,
              resize: "vertical"
            }} /><div style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 4
            }}><button type="button" onClick={onOpenBatchPromptsModal} style={{
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
              }} title="Abrir editor masivo para ver y escribir todos los prompts">Ver prompts de todas las escenas ({scenes.length}) →</button></div></div><div className="action-button-group"><button className="btn-primary-action" onClick={() => {
              var electronAPI;
              if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
                window.electronAPI.openGoogleFlow();
                return;
              }
              if (onGenerateImage != null) {
                onGenerateImage(selected);
              }
            }} disabled={!!selected.operationId || selected.status === "image-generating"} title={flowState.connected ? "Generar imagen para esta escena con Google Flow" : "Conectar Google Flow para generar"}>{selected.status === "image-generating" ? <jsxRuntime.Fragment><span className="working" style={{
                  width: 14,
                  height: 14,
                  borderWidth: 2
                }} /><span>Generando Imagen con Flow...</span></jsxRuntime.Fragment> : <jsxRuntime.Fragment><span className="button-prefix">AI</span><span>Generar imagen</span></jsxRuntime.Fragment>}</button><div className="btn-row-dual"><label className="btn-secondary-action" style={{
                cursor: "pointer"
              }} title="Reemplazar la imagen o video de esta escena desde tu PC"><input type="file" accept="image/*,video/*,.mp4,.webm,.mov,.m4v,.mkv,.png,.jpg,.jpeg,.webp" onChange={event => {
                  var files;
                  if (onUploadImage == null) {
                    return undefined;
                  } else {
                    return onUploadImage(selected, (files = event.target.files) == null ? undefined : files[0]);
                  }
                }} style={{
                  display: "none"
                }} />📁 Reemplazar (PC)</label><button className="btn-secondary-action" onClick={() => onGenerateVideo == null ? undefined : onGenerateVideo(selected)} disabled={!selected.imageUrl || !!selected.operationId || isVideoGenerating} title={"Convertir esta imagen en video con " + label}>{selected.status === "video-generating" ? <jsxRuntime.Fragment><span className="working" style={{
                    width: 12,
                    height: 12,
                    borderWidth: 2
                  }} /> {label}...</jsxRuntime.Fragment> : "Convertir a video"}</button></div>{selected.error && <div style={{
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
            }}><span style={{
                fontSize: 14,
                flexShrink: 0
              }}>⚠️</span><div><strong style={{
                  color: "#f87171"
                }}>Aviso:</strong> {selected.error}</div></div>}</div></div>}</div><div className="inspector-accordion-card"><button type="button" className="accordion-header-btn" onClick={() => toggleSection("videoGen")}><div className="accordion-title-group"><span style={{
              fontSize: 13
            }}>🎬</span><h4>Imagen a Video & Animación</h4><span style={{
              fontSize: 10,
              background: "rgba(99, 102, 241, 0.18)",
              color: "#c7d2fe",
              padding: "1px 6px",
              borderRadius: 4,
              fontWeight: 700
            }}>{label}</span></div><span className={"accordion-chevron " + (collapsedSections.videoGen ? "collapsed" : "expanded")}>▼</span></button>{!collapsedSections.videoGen && <div className="accordion-content-body"><div className="video-model-card" style={{
            marginTop: 0
          }}><div className="video-model-card-head"><div><span>IMAGEN → VIDEO</span><strong>{label}</strong></div><b>{videoDuration} s</b></div><div className="video-model-grid"><label><span>Modelo</span><Tt value={videoModel} onChange={value => updateScene(selected.id, {
                  videoModel: value,
                  videoDuration: value === "veo-3.1-lite" ? 8 : videoDuration
                })} disabled={!!selected.operationId} options={Ta.map(ta => ({
                  ...ta,
                  label: ta.label,
                  detail: ta.detail
                }))} /></label><label><span>Duración</span><Tt value={videoDuration} onChange={value => updateScene(selected.id, {
                  videoDuration: Number(value)
                })} disabled={!!selected.operationId || videoModel === "veo-3.1-lite"} options={br.map(br => ({
                  value: br,
                  label: br + " segundos"
                }))} /></label></div><small className="video-model-help">{videoModel === "veo-3.1-lite" ? "Veo 3.1 Lite genera clips de 8 s en alta calidad." : "Omni Flash permite elegir clips de 4, 6, 8 o 10 segundos."}</small><button type="button" onClick={() => {
              scenes.forEach(item => updateScene(item.id, {
                videoModel: videoModel,
                videoDuration: videoModel === "veo-3.1-lite" ? 8 : videoDuration
              }));
            }} style={{
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
            }} title="Aplica este modelo y duración a todas las escenas del proyecto">⚡ Aplicar a Todas las Escenas ({scenes.length})</button></div><div className="form-group" style={{
            marginTop: 10
          }}><div className="label-row" style={{
              marginBottom: 4
            }}><label style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#94a3b8"
              }}>Movimiento para el video</label><span className="char-count" style={{
                fontSize: 10
              }}>{((videoPrompt = selected.videoPrompt) == null ? undefined : videoPrompt.length) || 0} car</span></div><textarea value={selected.videoPrompt || ""} onChange={event => updateScene(selected.id, {
              videoPrompt: event.target.value
            })} placeholder="Ej.: cámara avanza suavemente, lluvia en movimiento, personaje parpadea..." rows={2} maxLength={12000} className="form-textarea" style={{
              minHeight: 44,
              maxHeight: 90,
              resize: "vertical"
            }} disabled={!!selected.operationId} /></div></div>}</div>{selected.videoUrl || selected.flowVideoUrl ? <div className="card-box" style={{
        marginTop: 10,
        border: "1px solid rgba(99, 102, 241, 0.25)",
        background: "rgba(99, 102, 241, 0.04)"
      }}><div className="label-row" style={{
          marginBottom: selected.muted ? 0 : 8
        }}><div style={{
            display: "flex",
            alignItems: "center",
            gap: 6
          }}><span style={{
              fontSize: 13
            }}>🔊</span><h4 style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 800
            }}>Audio del Clip de Video</h4></div><button type="button" className={"toggle-pill " + (selected.muted ? "" : "active")} onClick={() => updateScene(selected.id, {
            muted: !selected.muted
          })} style={{
            padding: "3px 9px",
            fontSize: 10.5,
            fontWeight: 800,
            background: selected.muted ? "rgba(255,255,255,0.06)" : "rgba(99, 102, 241, 0.28)",
            color: selected.muted ? "#94a3b8" : "#c7d2fe",
            border: selected.muted ? "1px solid rgba(255,255,255,0.12)" : "1px solid #6366f1",
            borderRadius: 6,
            cursor: "pointer"
          }}>{selected.muted ? "🔇 Silenciado" : "🔊 Con Sonido"}</button></div>{!selected.muted && <div className="form-group" style={{
          marginTop: 6,
          marginBottom: 0
        }}><div className="label-row" style={{
            marginBottom: 4
          }}><label style={{
              fontSize: 11,
              color: "#cbd5e1"
            }}>Nivel de volumen del video</label><span className="val-badge" style={{
              fontSize: 10
            }}>{Math.round((selected.videoVolume !== undefined ? selected.videoVolume : 1) * 100)}%</span></div><input type="range" min="0" max="1" step="0.05" value={selected.videoVolume !== undefined ? selected.videoVolume : 1} onChange={event => updateScene(selected.id, {
            videoVolume: Number(event.target.value)
          })} style={{
            width: "100%",
            height: 4,
            accentColor: "#6366f1",
            cursor: "pointer"
          }} /></div>}<button type="button" className="btn btn-primary" onClick={() => onTranscribeAudio == null ? undefined : onTranscribeAudio(selected)} style={{
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
        }} title="Extraer el audio de este clip de video y generar subtítulos sincronizados con Whisper IA"><span>🎙️</span><span>Extraer y Transcribir Subtítulos con IA</span></button></div> : null}<div className="form-group"><div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6
        }}><label style={{
            margin: 0
          }}>Movimiento de Cámara (Keyframes Zoom/Pan)</label>{selected.motion === "custom" && <span style={{
            fontSize: 10,
            fontWeight: 800,
            color: "var(--accent)",
            background: "rgba(215, 255, 79, 0.12)",
            padding: "2px 6px",
            borderRadius: 4
          }}>KEYFRAMES PRO</span>}</div><select value={selected.motion || "gentle-zoom-in"} onChange={event => {
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
        }} className="form-select">{ur.map(ur => <option value={ur.value} key={ur.value}>{ur.label}</option>)}</select></div>{selected.motion === "custom" && <div style={{
        padding: 12,
        background: "rgba(99, 102, 241, 0.07)",
        border: "1px solid rgba(99, 102, 241, 0.25)",
        borderRadius: 12,
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12
      }}><div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}><span style={{
            fontSize: 11.5,
            fontWeight: 800,
            color: "#c7d2fe",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>🎬 Editor de Curvas & Trayectoria</span><button type="button" onClick={() => {
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
          }} style={{
            background: "transparent",
            border: 0,
            color: "var(--text-dim)",
            fontSize: 10.5,
            cursor: "pointer",
            textDecoration: "underline"
          }} title="Restablecer valores por defecto">Reiniciar</button></div><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6
        }}><button type="button" onClick={() => updateScene(selected.id, {
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
          })} style={{
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "#e2e8f0",
            cursor: "pointer"
          }}>🔍 Zoom al Rostro</button><button type="button" onClick={() => updateScene(selected.id, {
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
          })} style={{
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "#e2e8f0",
            cursor: "pointer"
          }}>⬅️ Paneo Horizontal</button><button type="button" onClick={() => updateScene(selected.id, {
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
          })} style={{
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "#e2e8f0",
            cursor: "pointer"
          }}>⚡ Crash Zoom</button><button type="button" onClick={() => updateScene(selected.id, {
            customMotion: {
              ...selected.customMotion,
              startScale: 1.1,
              endScale: 1.18,
              startRotation: 3,
              endRotation: -3,
              easing: "smooth"
            }
          })} style={{
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "#e2e8f0",
            cursor: "pointer"
          }}>📐 Dutch Inmersivo</button></div><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }}><div><div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }}><span>Escala Inicial</span><span style={{
                fontWeight: 800,
                color: "var(--text-primary)"
              }}>{Number(((customMotion2 = selected.customMotion) == null ? undefined : customMotion2.startScale) ?? 1).toFixed(2)}x</span></div><input type="range" min="0.9" max="2.5" step="0.05" value={((customMotion3 = selected.customMotion) == null ? undefined : customMotion3.startScale) ?? 1} onChange={event => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                startScale: Number(event.target.value)
              }
            })} style={{
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            }} /></div><div><div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }}><span>Escala Final</span><span style={{
                fontWeight: 800,
                color: "var(--text-primary)"
              }}>{Number(((customMotion4 = selected.customMotion) == null ? undefined : customMotion4.endScale) ?? 1.15).toFixed(2)}x</span></div><input type="range" min="0.9" max="2.5" step="0.05" value={((customMotion5 = selected.customMotion) == null ? undefined : customMotion5.endScale) ?? 1.15} onChange={event => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                endScale: Number(event.target.value)
              }
            })} style={{
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            }} /></div></div><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }}><div><div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }}><span>Paneo X Inicial</span><span style={{
                fontWeight: 800,
                color: "var(--text-primary)"
              }}>{Number(((customMotion6 = selected.customMotion) == null ? undefined : customMotion6.startX) ?? 0)}%</span></div><input type="range" min="-15" max="15" step="1" value={((customMotion7 = selected.customMotion) == null ? undefined : customMotion7.startX) ?? 0} onChange={event => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                startX: Number(event.target.value)
              }
            })} style={{
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            }} /></div><div><div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }}><span>Paneo X Final</span><span style={{
                fontWeight: 800,
                color: "var(--text-primary)"
              }}>{Number(((customMotion8 = selected.customMotion) == null ? undefined : customMotion8.endX) ?? 0)}%</span></div><input type="range" min="-15" max="15" step="1" value={((customMotion9 = selected.customMotion) == null ? undefined : customMotion9.endX) ?? 0} onChange={event => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                endX: Number(event.target.value)
              }
            })} style={{
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            }} /></div></div><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }}><div><div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }}><span>Paneo Y Inicial</span><span style={{
                fontWeight: 800,
                color: "var(--text-primary)"
              }}>{Number(((customMotion10 = selected.customMotion) == null ? undefined : customMotion10.startY) ?? 0)}%</span></div><input type="range" min="-15" max="15" step="1" value={((customMotion11 = selected.customMotion) == null ? undefined : customMotion11.startY) ?? 0} onChange={event => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                startY: Number(event.target.value)
              }
            })} style={{
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            }} /></div><div><div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }}><span>Paneo Y Final</span><span style={{
                fontWeight: 800,
                color: "var(--text-primary)"
              }}>{Number(((customMotion12 = selected.customMotion) == null ? undefined : customMotion12.endY) ?? 0)}%</span></div><input type="range" min="-15" max="15" step="1" value={((customMotion13 = selected.customMotion) == null ? undefined : customMotion13.endY) ?? 0} onChange={event => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                endY: Number(event.target.value)
              }
            })} style={{
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            }} /></div></div><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }}><div><label style={{
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3,
              display: "block"
            }}>Curva de Aceleración</label><select value={((customMotion14 = selected.customMotion) == null ? undefined : customMotion14.easing) || "smooth"} onChange={event => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                easing: event.target.value
              }
            })} style={{
              width: "100%",
              height: 28,
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 6,
              background: "rgba(0,0,0,0.3)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              padding: "0 6px"
            }}><option value="smooth">🌿 Suave Cinemático</option><option value="ease-out">🛬 Desaceleración</option><option value="ease-in">🚀 Aceleración</option><option value="dramatic">⚡ Impacto Dramático</option><option value="linear">📏 Lineal Constante</option></select></div><div><div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "var(--text-dim)",
              marginBottom: 3
            }}><span>Rotación Final</span><span style={{
                fontWeight: 800,
                color: "var(--text-primary)"
              }}>{Number(((customMotion15 = selected.customMotion) == null ? undefined : customMotion15.endRotation) ?? 0)}°</span></div><input type="range" min="-10" max="10" step="0.5" value={((customMotion16 = selected.customMotion) == null ? undefined : customMotion16.endRotation) ?? 0} onChange={event => updateScene(selected.id, {
              customMotion: {
                ...selected.customMotion,
                endRotation: Number(event.target.value)
              }
            })} style={{
              width: "100%",
              height: 4,
              accentColor: "#6366f1",
              cursor: "pointer"
            }} /></div></div></div>}<div className="form-group" style={{
        padding: 12,
        background: "rgba(139, 92, 246, 0.08)",
        border: "1px solid rgba(139, 92, 246, 0.2)",
        borderRadius: 12
      }}><div className="label-row" style={{
          marginBottom: 8
        }}><label style={{
            color: "#c4b5fd",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>🪄 FX & Motion Graphics</label><button type="button" className="btn-tool accent" style={{
            height: 24,
            fontSize: 10,
            padding: "0 8px",
            background: "rgba(139, 92, 246, 0.2)",
            border: 0
          }} onClick={() => {
            const newGraphic = {
              id: "gfx_" + Date.now(),
              preset: "title-pop",
              text: "NUEVO TÍTULO",
              fromMs: 500,
              durationMs: 3000,
              accentColor: "#d7ff4f"
            };
            updateScene(selected.id, {
              graphics: [...(selected.graphics || []), newGraphic]
            });
          }}>+ Agregar Efecto</button></div>{(selected.graphics || []).length === 0 ? <div style={{
          fontSize: 11,
          color: "#6b7280",
          fontStyle: "italic",
          textAlign: "center",
          padding: "10px 0"
        }}>Sin efectos en esta escena.</div> : <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}>{(selected.graphics || []).map((graphic, index) => <div style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: 8,
            padding: 10,
            border: "1px solid rgba(255,255,255,0.05)"
          }} key={graphic.id || index}><div style={{
              display: "flex",
              gap: 6,
              marginBottom: 8
            }}><select value={graphic.preset} onChange={event => {
                const items = [...selected.graphics];
                items[index] = {
                  ...graphic,
                  preset: event.target.value
                };
                updateScene(selected.id, {
                  graphics: items
                });
              }} style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: 11,
                borderRadius: 4,
                padding: "2px 4px"
              }}><option value="title-pop">Título Pop</option><option value="kinetic-text">Texto Cinético</option><option value="stat-counter">Contador / Estadística</option><option value="word-highlight">Resaltador Flúor</option><option value="quote-card">Tarjeta de Cita</option><option value="subscribe-cta">Botón Suscribirse</option><option value="lower-third">Lower Third</option><option value="progress-bar">Barra de Progreso</option><option value="warning-alert">Alerta / Peligro</option></select><button type="button" onClick={() => {
                const filteredGraphics = selected.graphics.filter((graphic, index4) => index4 !== index);
                updateScene(selected.id, {
                  graphics: filteredGraphics
                });
              }} style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "none",
                color: "#fca5a5",
                borderRadius: 4,
                padding: "0 8px",
                cursor: "pointer",
                fontSize: 11
              }}>✕</button></div><input type="text" value={graphic.text || ""} onChange={event => {
              const items = [...selected.graphics];
              items[index] = {
                ...graphic,
                text: event.target.value
              };
              updateScene(selected.id, {
                graphics: items
              });
            }} placeholder="Texto del efecto..." style={{
              width: "100%",
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 11,
              borderRadius: 4,
              padding: "4px 8px"
            }} /></div>)}</div>}</div><div className="form-group transition-controls"><div className="label-row"><label>Transiciones entre escenas</label><span className="char-count">Suaves</span></div><div className="transition-select-grid"><label><span>Predeterminado</span><Tt value={defaultTransition} onChange={value => setTransitionDefaults({
              default: value
            })} options={mt} /></label><label><span>Esta escena</span><Tt value={transition} onChange={value => updateScene(selected.id, {
              transition: value
            })} options={[{
              value: "inherit",
              label: "Usar predeterminado (" + (((mt2 = mt.find(mt => mt.value === defaultTransition)) == null ? undefined : mt2.label) || "Desvanecimiento") + ")"
            }, ...mt]} /></label></div><div className="transition-actions"><button type="button" onClick={() => applyTransitionToAll(transition === "inherit" ? defaultTransition : transition)}>Aplicar a todas</button><button type="button" onClick={() => updateScene(selected.id, {
            transition: "none"
          })}>Sin transición aquí</button></div><small>El desvanecimiento es el valor inicial. Las transiciones no cambian la duración ni el audio.</small></div><div className="form-group"><div className="label-row"><label>Duración exacta de la escena</label><div style={{
            display: "flex",
            alignItems: "center",
            gap: 6
          }}><input type="number" min="0.5" max="600" step="0.1" value={Number(selected.duration || 4).toFixed(1)} onChange={event => updateScene(selected.id, {
              duration: Math.max(0.5, Math.min(600, Number(event.target.value) || 4))
            })} style={{
              width: 72,
              height: 24,
              textAlign: "center",
              background: "var(--bg-base)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              color: "var(--accent)",
              fontWeight: 800,
              fontSize: 12
            }} /><span className="val-badge">seg</span></div></div><input type="range" min="0.5" max={Math.max(60, Math.ceil(Number(selected.duration) || 30))} step="0.1" value={selected.duration || 4} onChange={event => updateScene(selected.id, {
          duration: Number(event.target.value)
        })} className="form-range" />{selected.sourceStartMs !== undefined ? <div style={{
          fontSize: 10.5,
          color: "var(--text-dim)",
          marginTop: 2
        }}>📍 Inicio en la pista de audio: {(Number(selected.sourceStartMs) / 1000).toFixed(2)}s</div> : null}</div><div className="toggles-grid"><button className={"toggle-pill " + (selected.hasCharacter !== false ? "active" : "")} onClick={() => updateScene(selected.id, {
          hasCharacter: selected.hasCharacter === false
        })}>{selected.hasCharacter !== false ? "Personaje activo" : "Sin personaje"}</button><button className={"toggle-pill " + (selected.imageHidden ? "" : "active")} onClick={() => updateScene(selected.id, {
          imageHidden: !selected.imageHidden
        })}>{selected.imageHidden ? "Oculto" : "Visible en video"}</button></div></div>;
  } else {
    return null;
  }
};
const _Component7 = ({
  project: project,
  updateProject: updateProject,
  assetState: assetState,
  isTranscribing: isTranscribing,
  onUploadAudio: onUploadAudio,
  onTranscribeAudio: onTranscribeAudio,
  onUploadMusic: onUploadMusic,
  removeAudioTrack: removeAudioTrack,
  removeMusicTrack: removeMusicTrack,
  clearCaptions: clearCaptions,
  onImportSrt: onImportSrt,
  onCreateScenesFromTranscript: onCreateScenesFromTranscript,
  setIsCaptionEditorOpen: setIsCaptionEditorOpen,
  setIsSyncModalOpen: setIsSyncModalOpen,
  syncScenesToCaptions: syncScenesToCaptions
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
  return <div className="tab-pane"><div className="pane-header"><div><span className="eyebrow">MULTIMEDIA</span><h3>Audio & Subtítulos SRT</h3></div></div><div className="card-box"><div className="label-row"><h4>Pista de voz en off</h4>{project.audioTrack ? <button className="del-btn-mini" onClick={removeAudioTrack} title="Quitar audio">Quitar Audio</button> : null}</div>{project.audioTrack ? <div className="audio-status-card"><div className="audio-info-row"><span>🔊 <b>{project.audioTrack.name}</b></span><span className="val-badge">{(project.audioTrack.durationMs / 1000).toFixed(1)}s</span></div><div className="btn-row-dual" style={{
          marginTop: 8
        }}><label className="btn-secondary-action"><input type="file" accept="audio/*" onChange={event => {
              var files;
              if (onUploadAudio == null) {
                return undefined;
              } else {
                return onUploadAudio((files = event.target.files) == null ? undefined : files[0]);
              }
            }} style={{
              display: "none"
            }} />Cambiar audio</label><button className={"btn-tool primary transcription-action " + (isTranscribing ? "is-loading" : "")} onClick={onTranscribeAudio} disabled={isTranscribing} style={{
            height: 34
          }}><span className="transcription-action-icon" aria-hidden="true">{isTranscribing ? "" : "✦"}</span>{isTranscribing ? "Transcribiendo IA" : "Transcribir con IA"}</button></div><div className="form-group" style={{
          marginTop: 9
        }}><label>Idioma del audio</label><select className="form-select" value={project.transcriptionLanguage || "auto"} onChange={event => updateProject({
            transcriptionLanguage: event.target.value
          })} disabled={isTranscribing}>{An.map(an => <option value={an.value} key={an.value}>{an.label}</option>)}</select></div><div className="form-group" style={{
          marginTop: 9
        }}><label>Motor de transcripción</label><select className="form-select" value={project.transcriptionEngine || "local"} onChange={event => updateProject({
            transcriptionEngine: event.target.value
          })} disabled={isTranscribing}><option value="local">Whisper Local (Gratuito e Ilimitado)</option><option value="gemini">Gemini Cloud (Rápido, consume cuota)</option></select></div>{(project.transcriptionEngine || "local") === "local" && <div className="form-group" style={{
          marginTop: 9
        }}><label>Modelo Whisper local</label><select className="form-select" value={project.transcriptionModel || "base"} onChange={event => updateProject({
            transcriptionModel: event.target.value
          })} disabled={isTranscribing}><option value="tiny">Tiny · más rápido, menor precisión</option><option value="base">Base · equilibrio recomendado</option><option value="small">Small · más preciso, más lento</option></select></div>}{assetState.operation === "transcription" && assetState.message ? <div role="status" aria-live="polite" style={{
          marginTop: 10,
          padding: "8px 10px",
          borderRadius: 8,
          border: "1px solid " + (assetState.status === "error" ? "rgba(239,68,68,.4)" : assetState.status === "ready" ? "rgba(34,197,94,.35)" : "rgba(99,102,241,.4)"),
          background: assetState.status === "error" ? "rgba(239,68,68,.08)" : assetState.status === "ready" ? "rgba(34,197,94,.08)" : "rgba(99,102,241,.08)",
          color: assetState.status === "error" ? "#f87171" : assetState.status === "ready" ? "#4ade80" : "#c7d2fe",
          fontSize: 11,
          lineHeight: 1.4
        }}>{isTranscribing ? "⏳ " : assetState.status === "error" ? "❌ " : "✅ "}{assetState.message}{isTranscribing ? <div style={{
            height: 5,
            marginTop: 7,
            borderRadius: 4,
            background: "rgba(255,255,255,.1)",
            overflow: "hidden"
          }}><div style={{
              height: "100%",
              width: Math.max(2, Number(assetState.progress) || 2) + "%",
              background: "#818cf8",
              transition: "width .3s"
            }} /></div> : null}</div> : null}</div> : <div className="empty-upload-box" style={{
        padding: "8px 0 2px"
      }}><label className="btn-tool primary" style={{
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
        }}><input type="file" accept="audio/*" onChange={event => {
            var files;
            if (onUploadAudio == null) {
              return undefined;
            } else {
              return onUploadAudio((files = event.target.files) == null ? undefined : files[0]);
            }
          }} style={{
            display: "none"
          }} /><span>🎙️ Subir voz en off (MP3 / WAV)</span></label><p className="card-sub" style={{
          textAlign: "center",
          margin: "8px 0 0",
          fontSize: 11
        }}>Sube una locución para sincronizar subtítulos y escenas automáticamente.</p></div>}</div><div className="card-box"><div className="label-row"><h4>Pista A2 · Música & SFX</h4>{project.musicTrack ? <button className="del-btn-mini" onClick={removeMusicTrack} title="Eliminar música o pista A2">Eliminar A2</button> : null}</div>{project.musicTrack ? <div className="audio-status-card"><div className="audio-info-row"><span>🎵 <b>{project.musicTrack.name || "Música / SFX"}</b></span><span className="val-badge">{project.musicTrack.loop !== !1 ? "🔁 Bucle" : ((project.musicTrack.durationMs || 30000) / 1000).toFixed(1) + "s"}</span></div><div className="form-group" style={{
          marginTop: 10
        }}><div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4
          }}><label style={{
              fontSize: 11.5,
              fontWeight: 700
            }}>Volumen de Fondo (A2)</label><span style={{
              fontSize: 11.5,
              fontWeight: 800,
              color: "var(--accent, #6366f1)"
            }}>{Math.round((project.musicTrack.volume !== undefined ? project.musicTrack.volume : 0.1) * 100)}%</span></div><input type="range" min="0" max="1" step="0.05" value={project.musicTrack.volume !== undefined ? project.musicTrack.volume : 0.1} onChange={event => updateProject({
            musicTrack: {
              ...project.musicTrack,
              volume: Number(event.target.value)
            }
          })} style={{
            width: "100%",
            accentColor: "var(--accent, #6366f1)"
          }} /></div><div style={{
          marginTop: 8,
          display: "flex",
          alignItems: "center"
        }}><label style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            cursor: "pointer",
            fontWeight: 600
          }}><input type="checkbox" checked={project.musicTrack.loop !== !1} onChange={event => updateProject({
              musicTrack: {
                ...project.musicTrack,
                loop: event.target.checked
              }
            })} style={{
              width: 16,
              height: 16,
              accentColor: "var(--accent, #6366f1)"
            }} /><span>🔁 Repetir en bucle (durante todo el video)</span></label></div><div className="btn-row-dual" style={{
          marginTop: 10
        }}><label className="btn-secondary-action"><input type="file" accept="audio/*" onChange={event => {
              var files;
              var uploadHandler;
              if ((uploadHandler = onUploadMusic || onUploadAudio) == null) {
                return undefined;
              } else {
                return uploadHandler((files = event.target.files) == null ? undefined : files[0], "music");
              }
            }} style={{
              display: "none"
            }} />📁 Cambiar desde PC</label><button type="button" className="btn-tool" onClick={() => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
            detail: {
              tab: "suno"
            }
          }))} style={{
            height: 34
          }} title="Crear o cambiar con Suno AI">🎵 Suno AI</button></div></div> : <div className="empty-upload-box" style={{
        padding: "8px 0 2px"
      }}><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          width: "100%"
        }}><label className="btn-secondary-action" style={{
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
          }}><input type="file" accept="audio/*" onChange={event => {
              var files;
              var uploadHandler;
              if ((uploadHandler = onUploadMusic || onUploadAudio) == null) {
                return undefined;
              } else {
                return uploadHandler((files = event.target.files) == null ? undefined : files[0], "music");
              }
            }} style={{
              display: "none"
            }} /><span>📁 Subir PC</span></label><button type="button" className="btn-secondary-action" onClick={() => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
            detail: {
              tab: "suno"
            }
          }))} style={{
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
          }} title="Crear música o efectos SFX con Inteligencia Artificial"><span>🎵 Suno AI</span></button></div><p className="card-sub" style={{
          textAlign: "center",
          margin: "8px 0 0",
          fontSize: 11
        }}>Sube cualquier pista MP3 o WAV de música o efecto SFX a la pista A2.</p></div>}</div><div className="card-box"><div className="label-row"><h4>Subtítulos y SRT</h4>{((cues8 = (captionTrack10 = project.captionTrack) == null ? undefined : captionTrack10.cues) == null ? undefined : cues8.length) > 0 ? <button className="del-btn-mini" onClick={clearCaptions} title="Borrar subtítulos">Limpiar Subtítulos</button> : null}</div><div className="btn-stack" style={{
        marginTop: 8
      }}><label className="btn-tool"><input type="file" accept=".srt,.vtt,.json" onChange={event => {
            var files;
            if (onImportSrt == null) {
              return undefined;
            } else {
              return onImportSrt((files = event.target.files) == null ? undefined : files[0]);
            }
          }} style={{
            display: "none"
          }} />Importar SRT / WhisperX</label><button className="btn-tool primary" onClick={onCreateScenesFromTranscript} disabled={(cues9 = (captionTrack11 = project.captionTrack) == null ? undefined : captionTrack11.cues) == null || !cues9.length}>Crear escenas desde frases ({((cues10 = (captionTrack12 = project.captionTrack) == null ? undefined : captionTrack12.cues) == null ? undefined : cues10.length) || 0})</button><button className="btn-tool" onClick={() => setIsCaptionEditorOpen(!0)} disabled={(cues11 = (captionTrack13 = project.captionTrack) == null ? undefined : captionTrack13.cues) == null || !cues11.length}>Editor avanzado de subtítulos</button>{((cues12 = (captionTrack14 = project.captionTrack) == null ? undefined : captionTrack14.cues) == null ? undefined : cues12.length) > 0 ? <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
          marginTop: 4
        }}><button type="button" className="btn-tool" onClick={() => {
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
          }} style={{
            justifyContent: "center",
            fontSize: 10.5,
            fontWeight: 700
          }} title="Bajar subtítulos en formato .SRT">📥 Bajar .SRT</button><button type="button" className="btn-tool" onClick={() => {
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
          }} style={{
            justifyContent: "center",
            fontSize: 10.5,
            fontWeight: 700
          }} title="Bajar subtítulos en formato WebVTT (.VTT)">📥 Bajar .VTT</button></div> : null}</div></div><div className="card-box" style={{
      borderColor: "rgba(99, 102, 241, 0.4)",
      background: "rgba(99, 102, 241, 0.05)"
    }}><div className="label-row"><h4>🎯 Sincronización al Tiempo Exacto</h4><span className="eyebrow" style={{
          color: "var(--accent)"
        }}>CALIBRADOR</span></div><p className="card-sub">Alinea el delay de voz, escala la duración de subtítulos y ajusta cada escena a la frase exacta.</p><div className="btn-stack"><button className="btn-tool primary" onClick={() => setIsSyncModalOpen(!0)} style={{
          height: 38,
          fontWeight: 800
        }}>Abrir calibrador de tiempos</button><button className="btn-tool" onClick={syncScenesToCaptions} disabled={(cues13 = (captionTrack15 = project.captionTrack) == null ? undefined : captionTrack15.cues) == null || !cues13.length} title="Ajusta automáticamente el inicio y duración de cada escena para que coincida 100% con cada frase del SRT">Ajustar escenas a las frases</button></div></div></div>;
};
const _Component8 = ({
  project: project,
  updateProject: updateProject,
  scenes: scenes,
  selected: selected,
  batchState: batchState,
  promptGenState: promptGenState,
  flowState: flowState,
  missingImageScenes: missingImageScenes,
  allStatic: allStatic,
  hasGraphics: hasGraphics,
  onGenerateAllImages: onGenerateAllImages,
  onAutoPilot: onAutoPilot,
  cancelPromptGen: cancelPromptGen,
  cancelBatch: cancelBatch,
  onCreateScenesFromTranscript: onCreateScenesFromTranscript,
  onGenerateVisualPrompts: onGenerateVisualPrompts,
  onGenerateAllVideos: onGenerateAllVideos,
  onGenerateVideo: onGenerateVideo,
  autoApplyMotionGraphics: autoApplyMotionGraphics,
  clearAllMotionGraphics: clearAllMotionGraphics,
  toggleAllMotionsStatic: toggleAllMotionsStatic,
  randomizeMotions: randomizeMotions
}) => {
  var captionTrack16;
  var cues14;
  var captionTrack17;
  var cues15;
  var activePrompt;
  return <div className="tab-pane"><div className="pane-header"><div><span className="eyebrow">AUTOMATIZACIÓN</span><h3>Lotes IA & Auto-Piloto</h3></div></div>{missingImageScenes.length > 0 && !batchState.running && !promptGenState.running && <div className="missing-scenes-alert-card" style={{
      background: "linear-gradient(135deg, rgba(245, 158, 11, 0.14), rgba(217, 119, 6, 0.08))",
      border: "1px solid rgba(245, 158, 11, 0.4)",
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 12,
      boxShadow: "0 8px 24px rgba(245, 158, 11, 0.08)"
    }}><div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10
      }}><div style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}><span style={{
            fontSize: 18,
            lineHeight: 1
          }}>⚠️</span><div><h4 style={{
              margin: 0,
              fontSize: 12.5,
              fontWeight: 900,
              color: "#fbbf24"
            }}>Faltan {missingImageScenes.length} imagen{missingImageScenes.length > 1 ? "es" : ""} por generar</h4><p style={{
              margin: "2px 0 0",
              fontSize: 11,
              color: "#94a3b8"
            }}>Detectadas escenas pendientes de imagen</p></div></div><button type="button" onClick={() => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onGenerateAllImages != null) {
            onGenerateAllImages(false, false);
          }
        }} style={{
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
        }}>⚡ Generar {missingImageScenes.length} faltante{missingImageScenes.length > 1 ? "s" : ""}</button></div></div>}<div className="card-box" style={{
      background: "linear-gradient(135deg, rgba(79, 124, 255, 0.18), rgba(112, 92, 246, 0.13))",
      borderColor: "rgba(91, 140, 255, 0.4)",
      padding: 14
    }}><div className="label-row" style={{
        marginBottom: 6
      }}><h4 style={{
          color: "var(--accent)",
          fontSize: 13,
          margin: 0
        }}>AUTO-PILOTO TOTAL</h4><span className="val-badge" style={{
          background: "rgba(91,140,255,.15)",
          color: "#a9c3ff",
          border: "1px solid rgba(91,140,255,.26)",
          fontWeight: 900,
          fontSize: 10
        }}>TODO EN 1 CLIC</span></div><p className="card-sub" style={{
        color: "#f1f5f9",
        fontSize: 11.5,
        margin: "0 0 10px 0"
      }}>Genera los prompts para todas las escenas y luego genera todas las imágenes en lote en una sola ejecución continua.</p>{(batchState.running || promptGenState.running) && <div style={{
        margin: "10px 0 14px",
        padding: 10,
        borderRadius: 10,
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(91,140,255,0.3)"
      }}><div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11.5,
          fontWeight: 700,
          marginBottom: 6
        }}><span style={{
            color: "#dbeafe"
          }}>{promptGenState.running ? promptGenState.message || "Generando prompts (" + promptGenState.done + "/" + promptGenState.total + ")" : batchState.message || "Generando imágenes (" + batchState.done + "/" + batchState.total + ")"}</span><span style={{
            color: "var(--accent)",
            fontWeight: 900
          }}>{promptGenState.running ? promptGenState.percent + "%" : (batchState.total ? Math.round(batchState.done / batchState.total * 100) : 0) + "%"}</span></div><div className="progress-track-bg" style={{
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.1)",
          overflow: "hidden"
        }}><div className="progress-fill-bar" style={{
            height: "100%",
            background: "var(--accent-gradient)",
            transition: "width 0.3s ease",
            width: (promptGenState.running ? promptGenState.percent : batchState.total ? Math.min(100, Math.round(batchState.done / batchState.total * 100)) : 0) + "%"
          }} /></div><div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 8
        }}><button onClick={promptGenState.running ? cancelPromptGen : cancelBatch} className="ghost-button danger" style={{
            height: 24,
            fontSize: 10.5,
            padding: "0 10px",
            borderRadius: 6
          }}>Detener</button></div></div>}<div className="btn-stack"><button className="btn-big-export" style={{
          background: "var(--accent-gradient)",
          color: "var(--accent-text)",
          height: 42,
          fontSize: 12.5
        }} onClick={() => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onAutoPilot != null) {
            onAutoPilot(false);
          }
        }} disabled={batchState.running || promptGenState.running}>{batchState.running || promptGenState.running ? <jsxRuntime.Fragment><span className="working" style={{
              width: 14,
              height: 14,
              borderWidth: 2,
              borderColor: "#000"
            }} /><span>Auto-Piloto en Marcha...</span></jsxRuntime.Fragment> : <jsxRuntime.Fragment><span className="button-prefix">AI</span><span>INICIAR AUTO-PILOTO (PROMPTS + IMÁGENES)</span></jsxRuntime.Fragment>}</button><button className="btn-tool" onClick={() => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onAutoPilot != null) {
            onAutoPilot(true);
          }
        }} disabled={batchState.running || promptGenState.running} title="Vuelve a crear prompts e imágenes desde cero para todo el proyecto" style={{
          fontSize: 11
        }}>Regenerar todo con Auto-Piloto</button></div></div><div className="card-box" style={{
      background: "rgba(16, 185, 129, 0.06)",
      borderColor: "rgba(16, 185, 129, 0.3)",
      padding: 14
    }}><div className="label-row" style={{
        marginBottom: 6
      }}><h4 style={{
          color: "#34d399",
          fontSize: 13,
          margin: 0
        }}>📜 Guion & Subtítulos SRT</h4><span className="val-badge" style={{
          background: "rgba(16, 185, 129, 0.15)",
          color: "#6ee7b7",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          fontWeight: 900
        }}>PASO 1</span></div><p className="card-sub" style={{
        color: "#cbd5e1",
        fontSize: 11.5,
        margin: "0 0 10px 0"
      }}>{((cues14 = (captionTrack16 = project.captionTrack) == null ? undefined : captionTrack16.cues) == null ? undefined : cues14.length) > 0 ? "Tienes " + project.captionTrack.cues.length + " frases sincronizadas listas para estructurar el video." : "Carga tu audio o genera la locución en el Estudio de Audio para extraer automáticamente las frases del guion."}</p><div className="btn-stack">{((cues15 = (captionTrack17 = project.captionTrack) == null ? undefined : captionTrack17.cues) == null ? undefined : cues15.length) > 0 ? <button className="btn-tool primary" style={{
          background: "linear-gradient(135deg, #059669, #10b981)",
          color: "#fff",
          fontWeight: 800
        }} onClick={() => onCreateScenesFromTranscript == null ? undefined : onCreateScenesFromTranscript(project.captionTrack.cues)}>⚡ Sincronizar {project.captionTrack.cues.length} Escenas con SRT</button> : <button className="btn-tool" onClick={() => window.dispatchEvent(new CustomEvent("flowtube:open-audio-studio", {
          detail: {
            tab: "tts"
          }
        }))}>🎙️ Generar Voz o Subir Audio en Estudio de Audio</button>}</div></div><div className="card-box"><div className="label-row"><h4>💡 Prompts Visuales IA</h4><span className="eyebrow">PASO 2</span></div><p className="card-sub">Crea descripciones visuales cinematográficas para cada escena.</p><div className="btn-stack" style={{
        marginTop: 8
      }}><button className="btn-tool primary" onClick={() => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onGenerateVisualPrompts != null) {
            onGenerateVisualPrompts(false);
          }
        }} disabled={promptGenState.running}>{promptGenState.running ? <jsxRuntime.Fragment><span className="working" style={{
              width: 14,
              height: 14,
              borderWidth: 2
            }} /><span>Generando Prompts ({promptGenState.done}/{promptGenState.total})...</span></jsxRuntime.Fragment> : <jsxRuntime.Fragment><span>💡</span><span>Generar Prompts Faltantes</span></jsxRuntime.Fragment>}</button><button className="btn-tool" onClick={() => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onGenerateVisualPrompts != null) {
            onGenerateVisualPrompts(true);
          }
        }} disabled={promptGenState.running} title="Sobrescribe todos los prompts existentes con nuevas versiones de IA">Regenerar todos los prompts</button></div></div><div className="card-box"><div className="label-row"><h4>⚡ Generación de Imágenes en Lote</h4><span className="eyebrow">PASO 3</span></div><p className="card-sub">Envía las escenas a Google Flow con balanceo de carga multi-cuenta.</p><div className="btn-stack" style={{
        marginTop: 8
      }}><button className="btn-tool accent" onClick={() => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onGenerateAllImages != null) {
            onGenerateAllImages(false, false);
          }
        }} disabled={batchState.running}>{batchState.running ? <jsxRuntime.Fragment><span className="working" style={{
              width: 14,
              height: 14,
              borderWidth: 2
            }} /><span>Generando Lote ({batchState.done}/{batchState.total})...</span></jsxRuntime.Fragment> : <jsxRuntime.Fragment><span>⚡</span><span>Generar Imágenes Pendientes</span></jsxRuntime.Fragment>}</button><button className="btn-tool" onClick={() => {
          var electronAPI;
          if (!flowState.connected && (electronAPI = window.electronAPI) != null && electronAPI.openGoogleFlow) {
            window.electronAPI.openGoogleFlow();
          }
          if (onGenerateAllImages != null) {
            onGenerateAllImages(false, true);
          }
        }} disabled={batchState.running} title="Vuelve a generar imágenes para todas las escenas aunque ya tengan imagen">Regenerar todas las imágenes</button><button className="btn-tool danger" onClick={() => onGenerateAllImages == null ? undefined : onGenerateAllImages(!0, !1)} disabled={batchState.running} style={{
          fontSize: 11
        }}>Reintentar solo imágenes fallidas</button></div></div><div className="card-box" style={{
      background: "rgba(236, 72, 153, 0.05)",
      borderColor: "rgba(236, 72, 153, 0.3)",
      padding: 14
    }}><div className="label-row" style={{
        marginBottom: 6
      }}><h4 style={{
          color: "#f472b6",
          margin: 0,
          fontSize: 13,
          fontWeight: 900
        }}>🎬 Generación de Videos en Lote (Imagen ➔ Video)</h4><span className="val-badge" style={{
          background: "rgba(236,72,153,0.15)",
          color: "#f472b6",
          border: "1px solid rgba(236,72,153,0.3)",
          fontWeight: 900
        }}>PASO 4</span></div><p className="card-sub" style={{
        margin: "0 0 10px 0",
        fontSize: 11.5,
        color: "#cbd5e1"
      }}>Convierte tus imágenes en clips de video cinematográficos con <b>Omni Flash</b> o <b>Veo 3.1 Lite</b> en segundo plano.</p><div className="btn-stack"><button className="btn-tool accent" onClick={() => onGenerateAllVideos == null ? undefined : onGenerateAllVideos(!1)} disabled={batchState.running || !scenes.some(item => item.imageUrl)} style={{
          background: "linear-gradient(135deg, rgba(236, 72, 153, 0.35), rgba(168, 85, 247, 0.35))",
          border: "1px solid rgba(236, 72, 153, 0.6)",
          color: "#fff",
          fontWeight: 900,
          height: 38,
          fontSize: 12
        }} title="Convierte todas las escenas con imagen en clips de video">{batchState.running && (activePrompt = batchState.activePrompt) != null && activePrompt.includes("video") ? <jsxRuntime.Fragment><span className="working" style={{
              width: 14,
              height: 14,
              borderWidth: 2
            }} /><span>Generando Videos ({batchState.current}/{batchState.total})...</span></jsxRuntime.Fragment> : <jsxRuntime.Fragment><span>🎬</span><span>Convertir Todas las Imágenes a Video ({scenes.filter(item => item.imageUrl).length})</span></jsxRuntime.Fragment>}</button>{selected && selected.imageUrl && <button className="btn-tool" onClick={() => onGenerateVideo == null ? undefined : onGenerateVideo(selected)} disabled={!!selected.operationId || selected.status === "video-generating"} style={{
          fontSize: 11
        }}>🎬 Convertir solo escena actual ({selected.title})</button>}</div></div><div className="card-box"><h4>🪄 Control de Auto-Motion & Efectos</h4><p className="card-sub">Activa o desactiva con un solo clic los efectos visuales y movimientos de cámara.</p><div className="btn-stack"><button className="btn-tool primary" onClick={autoApplyMotionGraphics} title="Insertar títulos, alertas y tarjetas dinámicas automáticas">🪄 Aplicar Auto-Motion IA</button>{hasGraphics ? <button className="btn-tool danger" onClick={clearAllMotionGraphics} title="Eliminar todos los textos flotantes, stickers y gráficos insertados">🚫 DESACTIVAR / QUITAR TODOS LOS EFECTOS</button> : null}<button className={"btn-tool " + (allStatic ? "accent" : "")} onClick={toggleAllMotionsStatic} title="Alternar entre cámara estática fija o movimientos dinámicos">{allStatic ? "Activar movimientos dinámicos" : "Dejar todas las escenas fijas"}</button><button className="btn-tool" onClick={randomizeMotions}>🎲 Asignar Movimientos Variados</button></div></div><div className="card-box"><h4>Modelos de inteligencia artificial</h4><div className="form-group" style={{
        marginTop: 8
      }}><label>Modelo de Texto & Prompts</label><select value={project.textModel} onChange={event => updateProject({
          textModel: event.target.value
        })} className="form-select">{gr.map(gr => <option value={gr.value} key={gr.value}>{gr.label}</option>)}</select></div><div className="form-group" style={{
        marginTop: 8
      }}><label>Modelo de Generación de Imagen</label><select value={project.imageModel} onChange={event => updateProject({
          imageModel: event.target.value
        })} className="form-select">{fr.map(fr => <option value={fr.value} key={fr.value}>{fr.label}</option>)}</select></div></div></div>;
};
const Sr = ({
  project: project,
  captionsEnabled: captionsEnabled,
  toggleCaptions: toggleCaptions,
  updateCaptionStyle: updateCaptionStyle
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
  return <div className="tab-pane"><div className="pane-header" style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}><div><span className="eyebrow">DISEÑO Y ANIMACIÓN</span><h3>Estilos de Subtítulos</h3></div><button className={"toggle-switch " + (captionsEnabled ? "on" : "off")} onClick={toggleCaptions} style={{
        fontSize: 11,
        padding: "4px 8px"
      }}>{captionsEnabled ? "ACTIVADOS" : "OCULTOS"}</button></div><div className="card-box" style={{
      marginBottom: 16
    }}><div className="label-row" style={{
        marginBottom: 8
      }}><h4 style={{
          color: "var(--accent)"
        }}>Modo de subtítulos</h4></div><div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }}><button type="button" className={"btn-secondary-action " + (((style8 = (captionTrack18 = project.captionTrack) == null ? undefined : captionTrack18.style) == null || !style8.maxWordsPerScreen) && ((style9 = (captionTrack19 = project.captionTrack) == null ? undefined : captionTrack19.style) == null || !style9.wordHighlight) ? "active" : "")} style={{
          padding: "8px 10px",
          fontSize: 11.5,
          fontWeight: 800,
          background: ((style10 = (captionTrack20 = project.captionTrack) == null ? undefined : captionTrack20.style) == null || !style10.maxWordsPerScreen) && ((style11 = (captionTrack21 = project.captionTrack) == null ? undefined : captionTrack21.style) == null || !style11.wordHighlight) ? "var(--accent)" : "rgba(255,255,255,0.06)",
          color: ((style12 = (captionTrack22 = project.captionTrack) == null ? undefined : captionTrack22.style) == null || !style12.maxWordsPerScreen) && ((style13 = (captionTrack23 = project.captionTrack) == null ? undefined : captionTrack23.style) == null || !style13.wordHighlight) ? "#fff" : "var(--text-dim)",
          borderRadius: 6,
          border: "1px solid var(--border)",
          cursor: "pointer",
          textAlign: "center"
        }} onClick={() => updateCaptionStyle({
          maxWordsPerScreen: 0,
          wordByWord: !1,
          wordHighlight: !1,
          uppercase: !1,
          animation: "clean",
          fontSize: 46,
          highlightColor: "#ffffff"
        })} title="Muestra la frase completa tal como está en el timeline, sin recortar ni efectos karaoke">📜 Fiel al Timeline (Frase Completa)</button><button type="button" className={"btn-secondary-action " + (((style14 = (captionTrack24 = project.captionTrack) == null ? undefined : captionTrack24.style) == null ? undefined : style14.maxWordsPerScreen) > 0 && (style15 = (captionTrack25 = project.captionTrack) == null ? undefined : captionTrack25.style) != null && style15.wordHighlight ? "active" : "")} style={{
          padding: "8px 10px",
          fontSize: 11.5,
          fontWeight: 800,
          background: ((style16 = (captionTrack26 = project.captionTrack) == null ? undefined : captionTrack26.style) == null ? undefined : style16.maxWordsPerScreen) > 0 && (style17 = (captionTrack27 = project.captionTrack) == null ? undefined : captionTrack27.style) != null && style17.wordHighlight ? "var(--accent)" : "rgba(255,255,255,0.06)",
          color: ((style18 = (captionTrack28 = project.captionTrack) == null ? undefined : captionTrack28.style) == null ? undefined : style18.maxWordsPerScreen) > 0 && (style19 = (captionTrack29 = project.captionTrack) == null ? undefined : captionTrack29.style) != null && style19.wordHighlight ? "#fff" : "var(--text-dim)",
          borderRadius: 6,
          border: "1px solid var(--border)",
          cursor: "pointer",
          textAlign: "center"
        }} onClick={() => updateCaptionStyle({
          maxWordsPerScreen: 3,
          wordByWord: !0,
          wordHighlight: !0,
          uppercase: !0,
          animation: "viral-yellow-pop",
          fontSize: 54,
          highlightColor: "#FFD700"
        })} title="Estilo dinámico viral de TikTok / Shorts con 3 palabras y resalte">⚡ Dinámico Viral (3 Palabras / TikTok)</button></div></div><div className="card-box" style={{
      marginBottom: 16
    }}><div className="label-row" style={{
        marginBottom: 12
      }}><h4 style={{
          color: "var(--accent)"
        }}>Motor de animación</h4></div><div className="form-group"><select value={((style20 = (captionTrack30 = project.captionTrack) == null ? undefined : captionTrack30.style) == null ? undefined : style20.animation) || "soft-scale"} onChange={event => updateCaptionStyle({
          animation: event.target.value
        })} className="form-select" style={{
          fontSize: 13,
          padding: 8,
          height: "auto"
        }}>{mr.map(mr => <option value={mr.value} key={mr.value}>{mr.label}</option>)}</select><div style={{
          fontSize: 10.5,
          color: "var(--text-muted)",
          marginTop: 6
        }}>Determina cómo interactúan las palabras con el audio en tiempo real.</div></div><div className="caption-animation-toggles"><button type="button" className={"toggle-pill " + (((style21 = (captionTrack31 = project.captionTrack) == null ? undefined : captionTrack31.style) == null ? undefined : style21.wordByWord) !== !1 ? "active" : "")} onClick={() => {
          var captionTrack;
          var style;
          return updateCaptionStyle({
            wordByWord: ((style = (captionTrack = project.captionTrack) == null ? undefined : captionTrack.style) == null ? undefined : style.wordByWord) === !1
          });
        }}>{((style22 = (captionTrack32 = project.captionTrack) == null ? undefined : captionTrack32.style) == null ? undefined : style22.wordByWord) !== !1 ? "●" : "○"} Palabra por palabra</button><button type="button" className={"toggle-pill " + (((style23 = (captionTrack33 = project.captionTrack) == null ? undefined : captionTrack33.style) == null ? undefined : style23.wordHighlight) !== !1 ? "active" : "")} onClick={() => {
          var captionTrack;
          var style;
          return updateCaptionStyle({
            wordHighlight: ((style = (captionTrack = project.captionTrack) == null ? undefined : captionTrack.style) == null ? undefined : style.wordHighlight) === !1
          });
        }}>{((style24 = (captionTrack34 = project.captionTrack) == null ? undefined : captionTrack34.style) == null ? undefined : style24.wordHighlight) !== !1 ? "●" : "○"} Resaltado por palabra</button></div></div><div className="card-box" style={{
      marginBottom: 16
    }}><h4>Tipografía y tamaño</h4><div className="form-group" style={{
        marginTop: 12
      }}><label>Fuente (Font Family)</label><select value={((style25 = (captionTrack35 = project.captionTrack) == null ? undefined : captionTrack35.style) == null ? undefined : style25.fontFamily) || "'Inter', sans-serif"} onChange={event => updateCaptionStyle({
          fontFamily: event.target.value
        })} className="form-select">{pr.map(pr => <option value={pr.value} key={pr.value}>{pr.label}</option>)}</select></div><div className="form-group" style={{
        marginTop: 12
      }}><div className="label-row"><label>Palabras por Pantalla (Shorts / Reels)</label><span className="val-badge" style={{
            background: "rgba(99, 102, 241, 0.2)",
            color: "#a5b4fc",
            border: "1px solid rgba(99, 102, 241, 0.3)"
          }}>{((style26 = (captionTrack36 = project.captionTrack) == null ? undefined : captionTrack36.style) == null ? undefined : style26.maxWordsPerScreen) === 1 ? "1 Palabra" : ((style27 = (captionTrack37 = project.captionTrack) == null ? undefined : captionTrack37.style) == null ? undefined : style27.maxWordsPerScreen) === 3 ? "3 Palabras" : ((style28 = (captionTrack38 = project.captionTrack) == null ? undefined : captionTrack38.style) == null ? undefined : style28.maxWordsPerScreen) === 4 ? "4 Palabras" : ((style29 = (captionTrack39 = project.captionTrack) == null ? undefined : captionTrack39.style) == null ? undefined : style29.maxWordsPerScreen) === 6 ? "6 Palabras" : "Frase Completa"}</span></div><select value={((style30 = (captionTrack40 = project.captionTrack) == null ? undefined : captionTrack40.style) == null ? undefined : style30.maxWordsPerScreen) ?? 4} onChange={event => updateCaptionStyle({
          maxWordsPerScreen: Number(event.target.value)
        })} className="form-select" style={{
          fontWeight: 700
        }}><option value={1}>⚡ 1 Palabra por pantalla (Ultra Dinámico TikTok / Hormozi)</option><option value={3}>📱 3 Palabras máximo (Shorts / Reels - No tapa la pantalla)</option><option value={4}>🎬 4 Palabras máximo (Recomendado Shorts)</option><option value={6}>📺 6 Palabras máximo (YouTube Estándar)</option><option value={0}>📜 Frase Completa (Párrafo entero)</option></select><small style={{
          fontSize: 11,
          color: "var(--text-faint)",
          marginTop: 4
        }}>Evita que el texto ocupe toda la pantalla en formatos verticales 9:16.</small></div><div className="toggles-grid" style={{
        marginBottom: 12
      }}><button className={"toggle-pill " + ((style31 = (captionTrack41 = project.captionTrack) == null ? undefined : captionTrack41.style) != null && style31.uppercase ? "active" : "")} onClick={() => {
          var captionTrack;
          var style;
          return updateCaptionStyle({
            uppercase: (style = (captionTrack = project.captionTrack) == null ? undefined : captionTrack.style) == null || !style.uppercase
          });
        }} type="button">🔤 {(style32 = (captionTrack42 = project.captionTrack) == null ? undefined : captionTrack42.style) != null && style32.uppercase ? "FORZAR MAYÚSCULAS" : "Mayúsculas/Minúsculas"}</button></div><div className="form-group"><div className="label-row"><label>Tamaño de Letra</label><span className="val-badge" style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)"
          }}>{((style33 = (captionTrack43 = project.captionTrack) == null ? undefined : captionTrack43.style) == null ? undefined : style33.fontSize) || 54}px</span></div><input type="range" min="22" max="140" value={((style34 = (captionTrack44 = project.captionTrack) == null ? undefined : captionTrack44.style) == null ? undefined : style34.fontSize) || 54} onChange={event => updateCaptionStyle({
          fontSize: Number(event.target.value)
        })} className="form-range" /></div></div><div className="card-box" style={{
      marginBottom: 16
    }}><h4>Paleta de colores y efectos</h4><div className="caption-color-presets" aria-label="Paletas predeterminadas">{hr.map(hr => {
          var captionTrack;
          const style = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.style) || {};
          const isActivePreset = style.color === hr.color && style.highlightColor === hr.highlightColor && style.outlineColor === hr.outlineColor;
          return <button type="button" className={"caption-color-preset " + (isActivePreset ? "active" : "")} onClick={() => updateCaptionStyle({
            color: hr.color,
            highlightColor: hr.highlightColor,
            outlineColor: hr.outlineColor
          })} title={"Aplicar paleta " + hr.label} key={hr.id}><span className="caption-preset-swatches"><i style={{
                background: hr.color
              }} /><i style={{
                background: hr.highlightColor
              }} /><i style={{
                background: hr.outlineColor
              }} /></span><b>{hr.label}</b></button>;
        })}</div><div className="color-pickers-row" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        marginTop: 12
      }}><div className="color-picker-box" style={{
          background: "var(--bg-primary)",
          padding: 8,
          borderRadius: 8,
          border: "1px solid var(--border)"
        }}><label style={{
            fontSize: 10,
            display: "block",
            marginBottom: 6,
            fontWeight: 700
          }}>Texto Base</label><input type="color" value={((style35 = (captionTrack45 = project.captionTrack) == null ? undefined : captionTrack45.style) == null ? undefined : style35.color) || "#ffffff"} onChange={event => updateCaptionStyle({
            color: event.target.value
          })} style={{
            width: "100%",
            height: 28,
            cursor: "pointer",
            border: "none",
            borderRadius: 4,
            padding: 0
          }} /></div><div className="color-picker-box" style={{
          background: "var(--bg-primary)",
          padding: 8,
          borderRadius: 8,
          border: "1px solid var(--border)"
        }}><label style={{
            fontSize: 10,
            display: "block",
            marginBottom: 6,
            fontWeight: 700,
            color: "var(--accent)"
          }}>Resalte / Énfasis</label><input type="color" value={((style36 = (captionTrack46 = project.captionTrack) == null ? undefined : captionTrack46.style) == null ? undefined : style36.highlightColor) || "#d7ff4f"} onChange={event => updateCaptionStyle({
            highlightColor: event.target.value
          })} style={{
            width: "100%",
            height: 28,
            cursor: "pointer",
            border: "none",
            borderRadius: 4,
            padding: 0
          }} /></div><div className="color-picker-box" style={{
          background: "var(--bg-primary)",
          padding: 8,
          borderRadius: 8,
          border: "1px solid var(--border)"
        }}><label style={{
            fontSize: 10,
            display: "block",
            marginBottom: 6,
            fontWeight: 700
          }}>Borde (Stroke)</label><input type="color" value={((style37 = (captionTrack47 = project.captionTrack) == null ? undefined : captionTrack47.style) == null ? undefined : style37.outlineColor) || "#08090d"} onChange={event => updateCaptionStyle({
            outlineColor: event.target.value
          })} style={{
            width: "100%",
            height: 28,
            cursor: "pointer",
            border: "none",
            borderRadius: 4,
            padding: 0
          }} /></div></div><div className="form-group" style={{
        marginTop: 14
      }}><div className="label-row"><label>Grosor de Borde</label><span className="val-badge">{((style38 = (captionTrack48 = project.captionTrack) == null ? undefined : captionTrack48.style) == null ? undefined : style38.outlineWidth) ?? 5}px</span></div><input type="range" min="0" max="20" value={((style39 = (captionTrack49 = project.captionTrack) == null ? undefined : captionTrack49.style) == null ? undefined : style39.outlineWidth) ?? 5} onChange={event => updateCaptionStyle({
          outlineWidth: Number(event.target.value)
        })} className="form-range" /></div><div className="form-group"><div className="label-row"><label>Sombra Luminosa (Glow)</label><span className="val-badge">{((style40 = (captionTrack50 = project.captionTrack) == null ? undefined : captionTrack50.style) == null ? undefined : style40.glow) ?? 20}px</span></div><input type="range" min="0" max="60" value={((style41 = (captionTrack51 = project.captionTrack) == null ? undefined : captionTrack51.style) == null ? undefined : style41.glow) ?? 20} onChange={event => updateCaptionStyle({
          glow: Number(event.target.value)
        })} className="form-range" /></div></div><div className="card-box"><h4>📍 Posicionamiento de Subtítulos</h4><div style={{
        marginTop: 12,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8
      }}>{[{
          label: "⬆️ Arriba",
          value: 18,
          desc: "Superior"
        }, {
          label: "⏺️ Centro",
          value: 50,
          desc: "Medio"
        }, {
          label: "⬇️ Abajo",
          value: 84,
          desc: "Inferior"
        }].map(item => {
          var captionTrack;
          var style;
          const posY = ((style = (captionTrack = project.captionTrack) == null ? undefined : captionTrack.style) == null ? undefined : style.posY) ?? 84;
          const isSelectedPosition = Math.abs(posY - item.value) < 12;
          return <button type="button" onClick={() => updateCaptionStyle({
            posY: item.value
          })} style={{
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
          }} key={item.value}><span style={{
              fontSize: 12,
              fontWeight: 800,
              color: isSelectedPosition ? "#fff" : "var(--text-primary)"
            }}>{item.label}</span><span style={{
              fontSize: 9.5,
              fontWeight: 600,
              color: isSelectedPosition ? "#c7d2fe" : "var(--text-muted)"
            }}>{item.desc} ({item.value}%)</span></button>;
        })}</div><div className="form-group" style={{
        marginTop: 12
      }}><div className="label-row"><label style={{
            fontSize: 11,
            color: "var(--text-muted)"
          }}>Ajuste fino (Y)</label><span className="val-badge">{((style42 = (captionTrack52 = project.captionTrack) == null ? undefined : captionTrack52.style) == null ? undefined : style42.posY) ?? 84}%</span></div><input type="range" min="5" max="95" step="1" value={((style43 = (captionTrack53 = project.captionTrack) == null ? undefined : captionTrack53.style) == null ? undefined : style43.posY) ?? 84} onChange={event => updateCaptionStyle({
          posY: Number(event.target.value)
        })} className="form-range" title="Desliza para micro-ajuste de altura" /></div></div></div>;
};
const _Component0 = ({
  project: project,
  updateProject: updateProject,
  renderState: renderState,
  onRenderVideo: onRenderVideo
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
  const cues = ((captionTrack54 = project.captionTrack) == null ? undefined : captionTrack54.cues) || [];
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
  return <div className="tab-pane"><div className="pane-header"><div><span className="eyebrow">RENDERIZADO</span><h3>Exportar Video Final</h3></div></div><div className="card-box"><h4>Ajustes de exportación</h4><p className="card-sub">Elige el motor de render para compilar el video en formato MP4 de alta calidad.</p><div className="engine-toggle-grid"><button className={"engine-btn " + (project.engine === "remotion" ? "active" : "")} onClick={() => updateProject({
          engine: "remotion"
        })}><b>Remotion Pro</b><small>Subtítulos animados, motion graphics y transiciones fluidas</small></button><button className={"engine-btn " + (project.engine === "ffmpeg" ? "active" : "")} onClick={() => updateProject({
          engine: "ffmpeg"
        })}><b>FFmpeg Rápido</b><small>Render ultra rápido solo con imágenes y movimientos de cámara</small></button></div><div style={{
        marginTop: 14,
        marginBottom: 14
      }}><label style={{
          fontSize: 11,
          fontWeight: 800,
          color: "var(--text-muted)",
          display: "block",
          marginBottom: 6
        }}>Resolución de Salida</label><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6
        }}>{[{
            id: "720p",
            label: "720p HD",
            desc: "Rápido"
          }, {
            id: "1080p",
            label: "1080p Full HD",
            desc: "Recomendado"
          }, {
            id: "2k",
            label: "2K QHD",
            desc: "1440p Nítido"
          }, {
            id: "4k",
            label: "4K UHD",
            desc: "2160p Máx"
          }].map(item => {
            const isSelectedResolution = (project.resolution || "1080p") === item.id;
            return <button type="button" onClick={() => updateProject({
              resolution: item.id
            })} style={{
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
            }} key={item.id}><span style={{
                fontSize: 11.5,
                fontWeight: 800,
                color: isSelectedResolution ? "#fff" : "var(--text-primary)"
              }}>{item.label}</span><span style={{
                fontSize: 9.5,
                color: isSelectedResolution ? "#a5b4fc" : "var(--text-muted)"
              }}>{item.desc}</span></button>;
          })}</div></div><div style={{
        marginTop: 14,
        padding: "10px 12px",
        background: "rgba(255, 255, 255, 0.03)",
        borderRadius: 8,
        border: "1px solid rgba(255, 255, 255, 0.08)"
      }}><div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}><div><span style={{
              fontSize: 11.5,
              fontWeight: 800,
              color: "#fff"
            }}>🔥 Subtítulos Quemados (Burn-In)</span><p style={{
              fontSize: 10,
              color: "var(--text-muted)",
              margin: "2px 0 0"
            }}>Incrusta la tipografía animada directamente en los fotogramas del video</p></div><label style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center"
          }}><input type="checkbox" checked={((captionTrack55 = project.captionTrack) == null ? undefined : captionTrack55.burnIn) !== !1 && ((captionTrack56 = project.captionTrack) == null ? undefined : captionTrack56.enabled) !== !1} onChange={event => {
              var captionTrack;
              updateProject({
                captionTrack: {
                  ...project.captionTrack,
                  burnIn: event.target.checked,
                  enabled: event.target.checked ? !0 : (captionTrack = project.captionTrack) == null ? undefined : captionTrack.enabled
                }
              });
            }} style={{
              display: "none"
            }} /><span style={{
              padding: "4px 10px",
              borderRadius: 99,
              fontSize: 10.5,
              fontWeight: 800,
              background: ((captionTrack57 = project.captionTrack) == null ? undefined : captionTrack57.burnIn) !== !1 && ((captionTrack58 = project.captionTrack) == null ? undefined : captionTrack58.enabled) !== !1 ? "var(--indigo, #6366f1)" : "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              transition: "all 0.2s"
            }}>{((captionTrack59 = project.captionTrack) == null ? undefined : captionTrack59.burnIn) !== !1 && ((captionTrack60 = project.captionTrack) == null ? undefined : captionTrack60.enabled) !== !1 ? "Activado" : "Desactivado"}</span></label></div></div><div className="export-specs-list" style={{
        marginTop: 14
      }}><div className="spec-item"><span>Resolución</span><strong>{(project.resolution || "1080p").toUpperCase()}</strong></div><div className="spec-item"><span>Formato</span><strong>{project.format === "short" ? "9:16 (Shorts / Reels)" : "16:9 (YouTube)"}</strong></div><div className="spec-item"><span>FPS</span><strong>{project.fps} FPS</strong></div><div className="spec-item"><span>Escenas</span><strong>{project.scenes.length} escenas</strong></div><div className="spec-item"><span>Burn-In Subtítulos</span><strong style={{
            color: ((captionTrack61 = project.captionTrack) == null ? undefined : captionTrack61.burnIn) !== !1 && ((captionTrack62 = project.captionTrack) == null ? undefined : captionTrack62.enabled) !== !1 ? "#34d399" : "#a1a1aa"
          }}>{((captionTrack63 = project.captionTrack) == null ? undefined : captionTrack63.burnIn) !== !1 && ((captionTrack64 = project.captionTrack) == null ? undefined : captionTrack64.enabled) !== !1 ? "Sí (Incrustados)" : "No (Video limpio)"}</strong></div></div><button className="btn-big-export" onClick={onRenderVideo} disabled={renderState.status === "rendering"}>{renderState.status === "rendering" ? <jsxRuntime.Fragment><span className="working" style={{
            width: 16,
            height: 16,
            borderWidth: 2
          }} /><span>Renderizando Video MP4...</span></jsxRuntime.Fragment> : <jsxRuntime.Fragment><span>⚡</span><span>EXPORTAR VIDEO COMPLETO (MP4)</span></jsxRuntime.Fragment>}</button>{hasCaptions && <div style={{
        marginTop: 14,
        paddingTop: 14,
        borderTop: "1px solid var(--border, rgba(255,255,255,0.08))"
      }}><h5 style={{
          margin: "0 0 4px",
          fontSize: 12,
          fontWeight: 800,
          color: "var(--text-primary)"
        }}>📄 Exportar Subtítulos Independientes</h5><p style={{
          margin: "0 0 10px",
          fontSize: 10.5,
          color: "var(--text-muted)"
        }}>Descarga los subtítulos sincronizados ({cues.length} frases) para subirlos a YouTube CC, Facebook o reproductores web.</p><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8
        }}><button type="button" className="btn-tool" onClick={handleClick23} style={{
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 11,
            padding: "8px"
          }} title="Descargar archivo SubRip (.SRT) estándar">📥 Descargar .SRT</button><button type="button" className="btn-tool" onClick={handleClick24} style={{
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 11,
            padding: "8px"
          }} title="Descargar archivo WebVTT (.VTT) para web y HTML5">📥 Descargar .VTT</button></div></div>}</div></div>;
};
const Ia = ({
  onUploadImage: onUploadImage,
  onGenerateImage: onGenerateImage,
  onGenerateVideo: onGenerateVideo,
  onUploadAudio: onUploadAudio,
  onUploadMusic: onUploadMusic,
  onImportSrt: onImportSrt,
  onTranscribeAudio: onTranscribeAudio,
  onCreateScenesFromTranscript: onCreateScenesFromTranscript,
  onGenerateVisualPrompts: onGenerateVisualPrompts,
  onGenerateAllImages: onGenerateAllImages,
  onGenerateAllVideos: onGenerateAllVideos,
  onAutoPilot: onAutoPilot,
  onRenderVideo: onRenderVideo,
  onOpenBatchPromptsModal: onOpenBatchPromptsModal,
  onSelectScene: onSelectScene,
  initialTab: initialTab = "scene"
}) => {
  var captionTrack65;
  var captionTrack66;
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const [isSyncModalOpen, setIsSyncModalOpen] = React.useState(!1);
  const [isCaptionEditorOpen, setIsCaptionEditorOpen] = React.useState(!1);
  const project = w(state => state.project);
  const selectedId = w(state => state.selectedId);
  const scenes = Array.isArray(project.scenes) ? project.scenes : [];
  const found = scenes.find(item => item.id === selectedId) || scenes[0] || {
    id: "default-scene",
    title: "Escena 1",
    prompt: "",
    duration: 4,
    motion: "gentle-zoom-in",
    status: "idle"
  };
  const updateScene = w(state => state.updateScene);
  const removeScene = w(state => state.removeScene);
  const updateProject = w(state => state.updateProject);
  const setTransitionDefaults = w(state => state.setTransitionDefaults);
  const applyTransitionToAll = w(state => state.applyTransitionToAll);
  const updateCaptionStyle = w(state => state.updateCaptionStyle);
  const toggleCaptions = w(state => state.toggleCaptions);
  const autoApplyMotionGraphics = w(state => state.autoApplyMotionGraphics);
  const clearAllMotionGraphics = w(state => state.clearAllMotionGraphics);
  const randomizeMotions = w(state => state.randomizeMotions);
  const toggleAllMotionsStatic = w(state => state.toggleAllMotionsStatic);
  const removeAudioTrack = w(state => state.removeAudioTrack);
  const removeMusicTrack = w(state => state.removeMusicTrack);
  const clearCaptions = w(state => state.clearCaptions);
  const syncScenesToCaptions = w(state => state.syncScenesToCaptions);
  const addStyleReference = w(state => state.addStyleReference);
  const removeStyleReference = w(state => state.removeStyleReference);
  const renderState = w(state => state.renderState);
  const assetState = w(state => state.assetState);
  const batchState = w(state => state.batchState);
  const promptGenState = w(state => state.promptGenState);
  const flowState = w(state => state.flowState);
  const cancelPromptGen = w(state => state.cancelPromptGen);
  const cancelBatch = w(state => state.cancelBatch);
  const captionsEnabled = ((captionTrack65 = project.captionTrack) == null ? undefined : captionTrack65.enabled) !== !1;
  const matches5 = scenes.length > 0 && scenes.every(item => item.motion === "still");
  const matches6 = scenes.some(item => item.isStockMotion || item.graphics && item.graphics.length > 0);
  const isTranscribing = assetState.operation === "transcription" && assetState.status === "loading";
  const isVideoGenerating = assetState.operation === "video" && assetState.status === "loading";
  const filteredMap = scenes.map((item, index) => ({
    scene: item,
    index: index + 1
  })).filter(({
    scene: scene
  }) => !scene.isStockMotion && !scene.imageUrl && !scene.videoUrl);
  return <section className="inspector-panel-container"><div className="inspector-tab-nav"><button className={"tab-btn " + (activeTab === "scene" ? "active" : "")} onClick={() => setActiveTab("scene")} title="01. Editar escena seleccionada"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M7 4v4M12 4v4M17 4v4M2 8h20" /></svg><span>Escena</span></button><button className={"tab-btn " + (activeTab === "audio" ? "active" : "")} onClick={() => setActiveTab("audio")} title="02. Audio, voz en off y subtítulos"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg><span>Audio</span></button><button className={"tab-btn " + (activeTab === "autopilot" ? "active" : "")} onClick={() => setActiveTab("autopilot")} title="03. Herramientas de lotes IA y Auto-Piloto"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg><span>Lotes IA</span></button><button className={"tab-btn " + (activeTab === "style" ? "active" : "")} onClick={() => setActiveTab("style")} title="04. Personalizar diseño de subtítulos"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M7 15h4M13 15h4M7 11h10" /></svg><span>Subtítulos</span></button><button className={"tab-btn " + (activeTab === "resources" ? "active" : "")} onClick={() => setActiveTab("resources")} title="05. Biblioteca de recursos y escenas"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg><span>Recursos</span></button><button className={"tab-btn " + (activeTab === "copilot" ? "active" : "")} onClick={() => setActiveTab("copilot")} title="06. FLOWSTUDIO Copilot Asistente IA"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg><span>Copilot</span></button><button className={"tab-btn " + (activeTab === "export" ? "active" : "")} onClick={() => setActiveTab("export")} title="07. Exportar video final MP4"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg><span>Exportar</span></button></div><div className="inspector-scroll-body">{activeTab === "scene" ? <_Component6 selected={found} project={project} scenes={scenes} updateScene={updateScene} removeScene={removeScene} updateProject={updateProject} addStyleReference={addStyleReference} removeStyleReference={removeStyleReference} setTransitionDefaults={setTransitionDefaults} applyTransitionToAll={applyTransitionToAll} flowState={flowState} isVideoGenerating={isVideoGenerating} onUploadImage={onUploadImage} onGenerateImage={onGenerateImage} onGenerateVideo={onGenerateVideo} onOpenBatchPromptsModal={onOpenBatchPromptsModal} onTranscribeAudio={onTranscribeAudio} /> : null}{activeTab === "audio" ? <_Component7 project={project} updateProject={updateProject} assetState={assetState} isTranscribing={isTranscribing} onUploadAudio={onUploadAudio} onTranscribeAudio={onTranscribeAudio} onUploadMusic={onUploadMusic} removeAudioTrack={removeAudioTrack} removeMusicTrack={removeMusicTrack} clearCaptions={clearCaptions} onImportSrt={onImportSrt} onCreateScenesFromTranscript={onCreateScenesFromTranscript} setIsCaptionEditorOpen={setIsCaptionEditorOpen} setIsSyncModalOpen={setIsSyncModalOpen} syncScenesToCaptions={syncScenesToCaptions} /> : null}{activeTab === "autopilot" ? <_Component8 project={project} updateProject={updateProject} scenes={scenes} selected={found} batchState={batchState} promptGenState={promptGenState} flowState={flowState} missingImageScenes={filteredMap} allStatic={matches5} hasGraphics={matches6} onGenerateAllImages={onGenerateAllImages} onAutoPilot={onAutoPilot} cancelPromptGen={cancelPromptGen} cancelBatch={cancelBatch} onCreateScenesFromTranscript={onCreateScenesFromTranscript} onGenerateVisualPrompts={onGenerateVisualPrompts} onGenerateAllVideos={onGenerateAllVideos} onGenerateVideo={onGenerateVideo} autoApplyMotionGraphics={autoApplyMotionGraphics} clearAllMotionGraphics={clearAllMotionGraphics} toggleAllMotionsStatic={toggleAllMotionsStatic} randomizeMotions={randomizeMotions} /> : null}{activeTab === "style" ? <Sr project={project} captionsEnabled={captionsEnabled} toggleCaptions={toggleCaptions} updateCaptionStyle={updateCaptionStyle} /> : null}{activeTab === "resources" ? <div className="tab-pane resources-pane" style={{
        padding: "10px 4px"
      }}><_Component9 onSelectScene={onSelectScene} /></div> : null}{activeTab === "copilot" ? <div className="tab-pane copilot-pane"><div className="next-copilot-coming-soon" aria-label="FLOWSTUDIO Copilot"><div className="next-copilot-coming-icon">FT</div><span>FLOWSTUDIO COPILOT</span><h3>Asistente Creativo IA</h3><p>El copiloto inteligente analiza tu guión, optimiza los prompts y te ayuda a pulir cada toma en segundos.</p><div><i /> Próximamente integrado</div></div></div> : null}{activeTab === "export" ? <_Component0 project={project} updateProject={updateProject} renderState={renderState} onRenderVideo={onRenderVideo} /> : null}</div><_Component2 isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(!1)} onTranscribeWhisper={onTranscribeAudio} /><_Component1 isOpen={isCaptionEditorOpen} cues={((captionTrack66 = project.captionTrack) == null ? undefined : captionTrack66.cues) || []} onClose={() => setIsCaptionEditorOpen(!1)} onSave={cues => {
      updateProject({
        captionTrack: {
          ...project.captionTrack,
          cues: cues
        }
      });
      setIsCaptionEditorOpen(!1);
    }} /></section>;
};
const Aa = ({
  activeTask: activeTask
}) => {
  if (!activeTask) {
    return null;
  }
  const value = Math.min(100, Math.max(2, activeTask.progress || 0));
  return <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 9999,
    background: "rgba(99, 102, 241, 0.15)",
    pointerEvents: "none",
    overflow: "hidden"
  }} title={activeTask.label + ": " + value + "%"}><div style={{
      height: "100%",
      width: value + "%",
      background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
      boxShadow: "0 0 10px rgba(99, 102, 241, 0.85)",
      transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    }} /></div>;
};
const _Component13 = ({
  previewProps: previewProps,
  inspectorProps: inspectorProps
}) => {
  var audioTrack;
  const [dockTab, setDockTab] = React.useState("properties");
  const [isDockCollapsed, setIsDockCollapsed] = React.useState(!1);
  const [isPlaying, setIsPlaying] = React.useState(!1);
  const [isHoveringPlayer, setIsHoveringPlayer] = React.useState(!1);
  const [copilotInput, setCopilotInput] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([{
    role: "assistant",
    text: "Estoy listo para ayudarte con este proyecto. Puedes preparar prompts, generar imágenes, transcribir el audio o revisar la escena seleccionada."
  }]);
  const project = w(state => state.project);
  const selectedId = w(state => state.selectedId);
  const renderState = w(state => state.renderState);
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
    var audioTrack;
    return Math.max(1, Ya(scenes, fps, ((audioTrack = project.audioTrack) == null ? undefined : audioTrack.durationMs) || 0));
  }, [scenes, fps, (audioTrack = project.audioTrack) == null ? undefined : audioTrack.durationMs]);
  React.useEffect(() => {
    var playerRef;
    const current = (playerRef = previewProps.playerRef) == null ? undefined : playerRef.current;
    if (!current) {
      return;
    }
    const handlePlay = () => setIsPlaying(!0);
    const handlePause = () => setIsPlaying(!1);
    current.addEventListener("play", handlePlay);
    current.addEventListener("pause", handlePause);
    current.addEventListener("ended", handlePause);
    return () => {
      current.removeEventListener("play", handlePlay);
      current.removeEventListener("pause", handlePause);
      current.removeEventListener("ended", handlePause);
    };
  }, [previewProps.playerRef]);
  const assetState = w(state => state.assetState);
  const batchState = w(state => state.batchState);
  const promptGenState = w(state => state.promptGenState);
  const scene = project.scenes.find(scene => scene.id === selectedId) || project.scenes[0];
  const totalScenes = React.useMemo(() => project.scenes.reduce((acc, scene) => acc + Math.max(0.5, Number(scene.duration) || 4), 0), [project.scenes]);
  const hasScene = project.scenes.length > 0 && project.scenes.every(scene => scene.isStockMotion || scene.imageUrl || scene.videoUrl);
  React.useEffect(() => {
    if (batchState.running && hasScene) {
      w.getState().setBatchState(prev => ({
        ...prev,
        running: false
      }));
    }
  }, [batchState.running, hasScene]);
  const activeTask = promptGenState.running ? {
    label: "Creando prompts",
    progress: promptGenState.percent || 0
  } : batchState.running && !hasScene ? {
    label: "Generando imágenes",
    progress: batchState.total ? Math.round(batchState.done / batchState.total * 100) : 0
  } : assetState.status === "loading" ? {
    label: assetState.message || "Procesando recurso",
    progress: assetState.progress || 12
  } : renderState.status === "rendering" ? {
    label: renderState.message || "Renderizando",
    progress: renderState.progress || 8
  } : null;
  if (project.format === "short") {
    return <div className="next-workbench short-workbench-mode" style={{
      position: "relative"
    }}><Aa activeTask={activeTask} /><div className="short-body-grid"><section className="short-content-pane"><div className="short-dock-top"><Ia {...inspectorProps} onSelectScene={previewProps.onSelectScene} /></div><div className="short-timeline-bottom"><Zt scenes={project.scenes} fps={project.fps} durationInFrames={value} selectedId={selectedId} playerRef={previewProps.playerRef} onSelectScene={previewProps.onSelectScene} audioTrack={project.audioTrack} musicTrack={project.musicTrack} captionTrack={project.captionTrack} onUploadImage={previewProps.onUploadImage} onUploadAudio={previewProps.onUploadAudio} onUploadMusic={previewProps.onUploadMusic || previewProps.onUploadAudio} onImportSrt={previewProps.onImportSrt} onTranscribeAudio={previewProps.onTranscribeAudio} onCreateScenesFromTranscript={previewProps.onCreateScenesFromTranscript} onOpenBatchPromptsModal={previewProps.onOpenBatchPromptsModal} /></div></section><section className="short-player-pane"><div className="player-wrapper-outer"><div className="player-frame short" onMouseEnter={() => setIsHoveringPlayer(true)} onMouseLeave={() => setIsHoveringPlayer(false)} onClick={() => {
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
            }} style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden"
            }}><Player ref={previewProps.playerRef} component={Ha} inputProps={{
                scenes: project.scenes,
                audioTrack: project.audioTrack,
                musicTrack: project.musicTrack,
                captionTrack: project.captionTrack,
                transitions: project.transitions,
                fps: project.fps,
                format: project.format,
                overlays: project.overlays
              }} durationInFrames={value} compositionWidth={compositionSize.width} compositionHeight={compositionSize.height} fps={project.fps} controls={false} loop={true} style={{
                width: "100%",
                height: "100%",
                background: "#0a0a0a"
              }} /><div style={{
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
              }} /><div style={{
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
              }} /><div style={{
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
              }}><span>📱 9:16 Short</span><span style={{
                  opacity: 0.5
                }}>·</span><span>{project.fps} FPS</span></div><div style={{
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
              }}><span style={{
                  marginLeft: isPlaying ? 0 : 3
                }}>{isPlaying ? "⏸" : "▶"}</span></div></div></div><Ja playerRef={previewProps.playerRef} durationInFrames={value} fps={fps} activeTask={activeTask} style={{
            borderRadius: "0 0 12px 12px"
          }} /></section></div></div>;
  } else {
    return <div className="next-workbench-container" style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
      position: "relative"
    }}><Aa activeTask={activeTask} /><div className={"next-workbench " + (isDockCollapsed ? "dock-collapsed" : "")} style={{
        flex: 1,
        minHeight: 0,
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}><aside className="next-dock"><button type="button" className="next-dock-toggle" onClick={() => setIsDockCollapsed(prev => !prev)} aria-label={isDockCollapsed ? "Expandir panel" : "Contraer panel"} title={isDockCollapsed ? "Expandir panel" : "Contraer panel"}>{isDockCollapsed ? "›" : "‹"}</button><div className="next-dock-body"><Ia {...inspectorProps} onSelectScene={previewProps.onSelectScene} /></div></aside><section className="next-stage horizontal-stage"><_Component10 {...previewProps} hideTimeline={true} activeTask={activeTask} projectSeconds={totalScenes} selectedTitle={scene == null ? undefined : scene.title} /></section></div><div className="next-timeline-bottom" style={{
        flex: "0 0 320px",
        display: "flex",
        flexDirection: "column",
        background: "#05060b"
      }}><Zt scenes={project.scenes} fps={project.fps} durationInFrames={value} selectedId={selectedId} playerRef={previewProps.playerRef} onSelectScene={previewProps.onSelectScene} audioTrack={project.audioTrack} musicTrack={project.musicTrack} captionTrack={project.captionTrack} onUploadImage={previewProps.onUploadImage} onUploadAudio={previewProps.onUploadAudio} onUploadMusic={previewProps.onUploadMusic || previewProps.onUploadAudio} onImportSrt={previewProps.onImportSrt} onTranscribeAudio={previewProps.onTranscribeAudio} onCreateScenesFromTranscript={previewProps.onCreateScenesFromTranscript} onOpenBatchPromptsModal={previewProps.onOpenBatchPromptsModal} /></div></div>;
  }
};
const Za = React.createContext(null);
let Cr = 0;
const Mr = ({
  children: children
}) => {
  const [toasts, setToasts] = React.useState([]);
  const addToast = React.useCallback((message, type = "info", duration = 4000) => {
    const id = ++Cr;
    setToasts(prev => [...prev, {
      id: id,
      message: message,
      type: type
    }]);
    if (duration > 0) {
      setTimeout(() => setToasts(media => media.filter(item => item.id !== id)), duration);
    }
    return id;
  }, []);
  const removeToast = React.useCallback(id => {
    setToasts(media => media.filter(item => item.id !== id));
  }, []);
  return <Za.Provider value={{
    addToast: addToast,
    removeToast: removeToast
  }}>{children}<div className="ft-toast-container">{toasts.map(item => <div className={"ft-toast ft-toast-" + item.type} key={item.id}><span>{item.message}</span><button onClick={() => removeToast(item.id)}>✕</button></div>)}</div></Za.Provider>;
};
const po = () => {
  const context = React.useContext(Za);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
const Ea = {
  "✅": "#4ade80",
  "❌": "#f87171",
  "⚠️": "#fbbf24",
  "🚀": "#60a5fa",
  "📦": "#a78bfa",
  "🎨": "#f472b6",
  "🖼️": "#38bdf8",
  "📤": "#818cf8",
  "⏳": "#94a3b8",
  "⚡": "#5b8cff",
  "☁️": "#38bdf8",
  "🎙️": "#f9a8d4"
};
const Nr = (line, index) => {
  const match = String(line).match(/^\[([^\]]+)] \[([^\]]+)]\s*(.*)$/);
  if (!match) {
    return {
      id: "disk-" + index,
      time: "",
      type: "ℹ️",
      msg: String(line)
    };
  }
  const now = new Date(match[1]);
  return {
    id: "disk-" + index + "-" + match[1],
    time: Number.isNaN(now.getTime()) ? match[1] : now.toLocaleTimeString("es", {
      hour12: !1
    }),
    type: match[2],
    msg: match[3]
  };
};
const Tr = ({
  liveLogs: liveLogs,
  onClear: onClear
}) => {
  const [diskLogs, setDiskLogs] = React.useState([]);
  const divRef = React.useRef(null);
  React.useEffect(() => {
    let cancelled = !1;
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
    const timer = setInterval(fetchLogs, 2000);
    return () => {
      cancelled = !0;
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
      await ((clearAppLogs = (electronAPI = window.electronAPI) == null ? undefined : electronAPI.clearAppLogs) == null ? undefined : clearAppLogs.call(electronAPI));
    } catch {}
    setDiskLogs([]);
    if (onClear != null) {
      onClear();
    }
  };
  return <div style={{
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    flex: 1
  }}><div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 10px",
      borderBottom: "1px solid #202635"
    }}><span style={{
        color: "#778197",
        fontSize: 9.5
      }}>{items.length} registros persistentes</span><button onClick={handleClick} style={{
        border: "1px solid #303747",
        background: "#171b24",
        color: "#98a2b4",
        borderRadius: 6,
        padding: "4px 8px",
        cursor: "pointer",
        fontSize: 9.5
      }}>Limpiar logs</button></div><div ref={divRef} style={{
      overflowY: "auto",
      flex: 1,
      padding: "6px 0",
      fontFamily: "ui-monospace, Consolas, monospace"
    }}>{items.length ? items.map((item, index) => <div style={{
        display: "grid",
        gridTemplateColumns: "62px 68px 1fr",
        gap: 5,
        padding: "4px 10px",
        borderBottom: "1px solid rgba(31,37,50,.65)",
        alignItems: "start"
      }} key={item.id || index}><span style={{
          color: "#566174",
          fontSize: 9
        }}>{item.time}</span><span style={{
          color: Ea[item.type] || "#8b95a7",
          fontSize: 9,
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>{item.type}</span><span style={{
          color: Ea[item.type] || "#c3cad6",
          fontSize: 9.5,
          lineHeight: 1.4,
          wordBreak: "break-word"
        }}>{item.msg}</span></div>) : <div style={{
        color: "#667085",
        padding: 24,
        textAlign: "center",
        fontSize: 10.5
      }}>Todavía no hay registros.</div>}</div></div>;
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
const qt = status => status === "error" ? "#f87171" : status === "done" || status === "ready" ? "#4ade80" : status === "paused" || status === "interrupted" ? "#fbbf24" : "#818cf8";
const Ir = task => {
  if (!task.startedAt || !task.progress || task.progress >= 100) {
    return "";
  }
  const elapsedMs = Date.now() - task.startedAt;
  const value = Math.max(0, Math.round(elapsedMs / task.progress * (100 - task.progress) / 1000));
  if (value < 60) {
    return " · ~" + value + "s restantes";
  } else {
    return " · ~" + Math.ceil(value / 60) + " min restantes";
  }
};
const It = ({
  logs: logs = [],
  onClearLogs: onClearLogs,
  onResumeBatch: onResumeBatch,
  onResumePrompts: onResumePrompts,
  onRetryTranscription: onRetryTranscription,
  onCancelTranscription: onCancelTranscription,
  onRetryRender: onRetryRender
}) => {
  const batchState = w(state => state.batchState);
  const project = w(state => state.project);
  const promptGenState = w(state => state.promptGenState);
  const assetState = w(state => state.assetState);
  const renderState = w(state => state.renderState);
  const cancelBatch = w(state => state.cancelBatch);
  const cancelPromptGen = w(state => state.cancelPromptGen);
  const batchPaused = w(state => state.batchPaused);
  const pauseBatch = w(state => state.pauseBatch);
  const resumeBatch = w(state => state.resumeBatch);
  const [isOpen, setIsOpen] = React.useState(!1);
  const [activeTab, setActiveTab] = React.useState("tasks");
  const [taskHistory, setTaskHistory] = React.useState(() => Ra(Yt, []));
  const [interruptedTasks, setInterruptedTasks] = React.useState(() => Ra(Pa, []).map(ra => ({
    ...ra,
    status: "interrupted",
    message: "Interrumpida al cerrar la aplicación"
  })));
  const ref = React.useRef(new Set());
  const divRef = React.useRef(null);
  const scene = (project.scenes || []).find(scene => scene.status === "video-generating" || scene.videoOperation);
  const videoModelLabel = (scene == null ? undefined : scene.videoModel) === "omni" ? "Omni Flash" : "Veo 3.1 Lite";
  React.useEffect(() => {
    const handleOpenTaskCenter = state => {
      var detail;
      setActiveTab(((detail = state.detail) == null ? undefined : detail.panel) === "logs" ? "logs" : "tasks");
      setIsOpen(!0);
    };
    window.addEventListener("flowtube:open-task-center", handleOpenTaskCenter);
    return () => window.removeEventListener("flowtube:open-task-center", handleOpenTaskCenter);
  }, []);
  const activeTasks = React.useMemo(() => {
    const items = [];
    if (batchState.running) {
      items.push({
        id: "batch-images",
        type: "batch",
        title: "Generación de imágenes",
        status: batchPaused ? "paused" : "running",
        startedAt: batchState.startedAt,
        progress: batchState.total ? Math.round(batchState.done / batchState.total * 100) : 0,
        message: batchState.message || (batchState.done || 0) + "/" + (batchState.total || 0)
      });
    }
    if (promptGenState.running) {
      items.push({
        id: "prompt-generation",
        type: "prompts",
        title: "Generación de prompts",
        status: "running",
        startedAt: promptGenState.startedAt,
        progress: promptGenState.percent || (promptGenState.total ? Math.round(promptGenState.done / promptGenState.total * 100) : 0),
        message: promptGenState.message || (promptGenState.done || 0) + "/" + (promptGenState.total || 0)
      });
    }
    if (assetState.operation === "transcription" && assetState.status === "loading") {
      items.push({
        id: "transcription",
        type: "transcription",
        title: "Transcripción de audio",
        status: "running",
        startedAt: assetState.startedAt,
        progress: Number(assetState.progress) || 0,
        message: assetState.message || "Procesando audio..."
      });
    }
    if (assetState.operation === "video" && assetState.status === "loading") {
      items.push({
        id: "flow-image-to-video",
        type: "video-generation",
        title: "Imagen → video · " + videoModelLabel,
        status: "running",
        startedAt: assetState.startedAt,
        progress: Number(assetState.progress) || 0,
        message: assetState.message || "Procesando con " + videoModelLabel + "..."
      });
    }
    if (renderState.status === "rendering") {
      items.push({
        id: "render",
        type: "render",
        title: "Render de video",
        status: "running",
        startedAt: renderState.startedAt,
        progress: Number(renderState.progress) || 0,
        message: renderState.message || "Renderizando..."
      });
    }
    return items;
  }, [videoModelLabel, assetState, batchPaused, batchState, promptGenState, renderState]);
  React.useEffect(() => {
    localStorage.setItem(Pa, JSON.stringify(activeTasks));
  }, [activeTasks]);
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleOutsideClick = event => {
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
        title: "Generación de imágenes",
        status: (failures = batchState.failures) != null && failures.length ? "error" : "done",
        progress: 100,
        message: batchState.done + "/" + batchState.total + " procesadas"
      });
    }
    if (assetState.operation === "transcription" && ["ready", "error"].includes(assetState.status)) {
      items32.push({
        id: "transcription-" + assetState.status + "-" + assetState.message,
        type: "transcription",
        title: "Transcripción de audio",
        status: assetState.status,
        progress: assetState.status === "ready" ? 100 : 0,
        message: assetState.message
      });
    }
    if (assetState.operation === "video" && ["ready", "error"].includes(assetState.status)) {
      items32.push({
        id: "video-generation-" + assetState.status + "-" + assetState.message,
        type: "video-generation",
        title: "Imagen → video · " + videoModelLabel,
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
    const items33 = items32.filter(item => item.message && !ref.current.has(item.id));
    if (items33.length) {
      items33.forEach(item => ref.current.add(item.id));
      setTaskHistory(prev => {
        const nextHistory = [...items33.map(item => ({
          ...item,
          finishedAt: Date.now()
        })), ...prev].slice(0, 40);
        localStorage.setItem(Yt, JSON.stringify(nextHistory));
        return nextHistory;
      });
    }
  }, [assetState, batchState, renderState]);
  const handleCancel = item => {
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
  const handleResume = item2 => {
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
    setInterruptedTasks(media => media.filter(item => item !== item2));
  };
  const items = [...activeTasks, ...interruptedTasks];
  return <div ref={divRef} style={{
    position: "fixed",
    left: "calc(var(--rail-width, 60px) + 10px)",
    bottom: 16,
    zIndex: 1200,
    fontFamily: "Inter, system-ui, sans-serif"
  }}>{isOpen ? <div style={{
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
    }}><div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 14px",
        borderBottom: "1px solid #222838"
      }}><div><strong style={{
            color: "#fff",
            fontSize: 13
          }}>⚙️ Centro de tareas</strong><div style={{
            color: "#778197",
            fontSize: 10,
            marginTop: 2
          }}>{activeTasks.length} activa(s) · {logs.length} logs en vivo</div></div><button onClick={() => setIsOpen(!1)} style={{
          background: "transparent",
          border: 0,
          color: "#8a94a6",
          cursor: "pointer",
          fontSize: 16
        }}>✕</button></div><div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 5,
        padding: 8,
        borderBottom: "1px solid #222838"
      }}><button onClick={() => setActiveTab("tasks")} style={{
          border: "1px solid " + (activeTab === "tasks" ? "rgba(91,140,255,.45)" : "#2a3040"),
          background: activeTab === "tasks" ? "rgba(91,140,255,.12)" : "#141821",
          color: activeTab === "tasks" ? "#9fbeff" : "#8e98aa",
          borderRadius: 7,
          padding: 7,
          cursor: "pointer",
          fontSize: 10,
          fontWeight: 800
        }}>⚙️ Tareas ({activeTasks.length})</button><button onClick={() => setActiveTab("logs")} style={{
          border: "1px solid " + (activeTab === "logs" ? "rgba(129,140,248,.5)" : "#2a3040"),
          background: activeTab === "logs" ? "rgba(129,140,248,.12)" : "#141821",
          color: activeTab === "logs" ? "#c7d2fe" : "#8e98aa",
          borderRadius: 7,
          padding: 7,
          cursor: "pointer",
          fontSize: 10,
          fontWeight: 800
        }}>📋 Logs</button></div>{activeTab === "tasks" ? <div style={{
        overflowY: "auto",
        padding: 10
      }}>{items.length ? items.map(item => <div style={{
          border: "1px solid #252b3a",
          borderRadius: 10,
          padding: 10,
          marginBottom: 8,
          background: "#11141c"
        }} key={item.id + "-" + item.status}><div style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10
          }}><strong style={{
              color: "#e5e7eb",
              fontSize: 11.5
            }}>{item.title}</strong><span style={{
              color: qt(item.status),
              fontSize: 10,
              fontWeight: 800
            }}>{item.status.toUpperCase()}</span></div><div style={{
            height: 5,
            background: "#252a37",
            borderRadius: 5,
            overflow: "hidden",
            margin: "8px 0 6px"
          }}><div style={{
              width: Math.max(2, Math.min(100, item.progress || 0)) + "%",
              height: "100%",
              background: qt(item.status),
              transition: "width .25s"
            }} /></div><div style={{
            color: "#9aa4b7",
            fontSize: 10.5,
            lineHeight: 1.35
          }}>{item.message}</div>{item.status === "running" ? <div style={{
            color: "#697386",
            fontSize: 9.5,
            marginTop: 4
          }}>{item.progress}%{Ir(item)}</div> : null}<div style={{
            display: "flex",
            gap: 6,
            marginTop: 8
          }}>{item.status === "running" && item.type === "render" ? <button onClick={() => window.dispatchEvent(new CustomEvent("open-render-modal"))} style={{
              background: "rgba(99,102,241,.2)",
              border: "1px solid rgba(99,102,241,.5)",
              color: "#c7d2fe",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 10,
              cursor: "pointer",
              fontWeight: 700
            }}>👁️ Abrir Visor</button> : null}{item.status === "running" && item.type !== "render" ? <button onClick={() => handleCancel(item)} style={{
              background: "rgba(239,68,68,.1)",
              border: "1px solid rgba(239,68,68,.3)",
              color: "#f87171",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 10,
              cursor: "pointer"
            }}>Cancelar</button> : null}{item.type === "batch" && ["running", "paused"].includes(item.status) ? <button onClick={() => item.status === "paused" ? resumeBatch() : pauseBatch()} style={{
              background: "rgba(251,191,36,.1)",
              border: "1px solid rgba(251,191,36,.3)",
              color: "#fbbf24",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 10,
              cursor: "pointer"
            }}>{item.status === "paused" ? "Continuar" : "Pausar"}</button> : null}{item.status === "interrupted" ? <button onClick={() => handleResume(item)} style={{
              background: "rgba(99,102,241,.15)",
              border: "1px solid rgba(99,102,241,.4)",
              color: "#c7d2fe",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 10,
              cursor: "pointer"
            }}>Reanudar</button> : null}</div></div>) : <div style={{
          color: "#778197",
          padding: 18,
          textAlign: "center",
          fontSize: 11
        }}>No hay tareas activas.</div>}{taskHistory.length ? <jsxRuntime.Fragment><div style={{
            color: "#667085",
            fontSize: 9.5,
            fontWeight: 800,
            letterSpacing: 0.7,
            margin: "12px 2px 7px"
          }}>HISTORIAL RECIENTE</div>{taskHistory.slice(0, 8).map(slice => <div style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
            padding: "7px 4px",
            borderBottom: "1px solid #1d2230",
            fontSize: 10
          }} key={slice.id + "-" + slice.finishedAt}><span style={{
              color: "#aab3c3"
            }}>{slice.title}<small style={{
                display: "block",
                color: "#626c7e",
                marginTop: 2
              }}>{slice.message}</small></span><span style={{
              color: qt(slice.status),
              fontWeight: 800
            }}>{slice.status}</span></div>)}</jsxRuntime.Fragment> : null}</div> : <Tr liveLogs={logs} onClear={onClearLogs} />}{activeTab === "tasks" && taskHistory.length ? <button onClick={() => {
        setTaskHistory([]);
        localStorage.removeItem(Yt);
      }} style={{
        margin: "0 10px 10px",
        border: "1px solid #292f3d",
        background: "#171b24",
        color: "#8d96a8",
        borderRadius: 7,
        padding: 7,
        cursor: "pointer",
        fontSize: 10
      }}>Limpiar historial</button> : null}</div> : null}</div>;
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
    headers: headers
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
  const setAuthUser = w(state => state.setAuthUser);
  const setCurrentView = w(state => state.setCurrentView);
  const [licenseKey, setLicenseKey] = React.useState("");
  const [hwid, setHwid] = React.useState("Detectando equipo…");
  const [copied, setCopied] = React.useState(!1);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(!1);
  React.useEffect(() => {
    Da("/api/auth/hwid").then(result => result.json()).then(result => {
      if (result.ok && result.hwid) {
        setHwid(result.hwid);
      }
    }).catch(() => setHwid("No disponible"));
  }, []);
  const handleClick25 = () => {
    if (hwid && hwid.startsWith("FT-")) {
      navigator.clipboard.writeText(hwid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      isLicensed: !1
    }, "guest-token", !1);
    setCurrentView("dashboard");
  };
  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitting(!0);
    setErrorMessage("");
    try {
      const hwidValue = hwid.startsWith("FT-") ? hwid : undefined;
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
      setAuthUser(data.user, data.token, !0);
      setCurrentView("dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(!1);
    }
  };
  return <div style={{
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "radial-gradient(circle at 50% 10%, #182039 0%, #06070b 60%)",
    color: "#fff",
    fontFamily: "Inter, system-ui, sans-serif"
  }}><div style={{
      width: "min(460px, 100%)",
      background: "rgba(15,18,28,.94)",
      border: "1px solid rgba(99, 102, 241, 0.35)",
      borderRadius: 22,
      padding: 28,
      boxShadow: "0 30px 90px rgba(0,0,0,.55), 0 0 40px rgba(99, 102, 241, 0.15)"
    }}><div style={{
        textAlign: "center",
        marginBottom: 20
      }}><div style={{
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
        }}>✨</div><h1 style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: "-0.5px"
        }}>FLOWSTUDIO</h1><p style={{
          margin: "6px 0 0",
          color: "#95a0b8",
          fontSize: 12
        }}>Activa tu licencia VIP para desbloquear la suite de IA</p></div>{errorMessage && <div style={{
        marginBottom: 14,
        padding: "10px 12px",
        borderRadius: 9,
        background: "rgba(239,68,68,.14)",
        border: "1px solid rgba(239,68,68,.4)",
        color: "#fca5a5",
        fontSize: 12
      }}>⚠️ {errorMessage}</div>}<form onSubmit={handleSubmit} style={{
        display: "grid",
        gap: 12
      }}><label style={{
          color: "#cbd5e1",
          fontSize: 12,
          fontWeight: 800
        }}>Clave de licencia<input autoFocus={!0} value={licenseKey} onChange={event => setLicenseKey(event.target.value.toUpperCase())} placeholder="XXXX-XXXX-XXXX" required={!0} style={{
            ...Pr,
            marginTop: 6,
            letterSpacing: 2,
            fontFamily: "monospace"
          }} /></label><button disabled={isSubmitting} type="submit" style={{
          height: 44,
          border: 0,
          borderRadius: 10,
          background: "linear-gradient(135deg,#d7ff4f,#10b981)",
          color: "#080a0d",
          fontWeight: 900,
          fontSize: 13,
          cursor: isSubmitting ? "wait" : "pointer",
          boxShadow: "0 4px 16px rgba(215, 255, 79, 0.3)"
        }}>{isSubmitting ? "Verificando…" : "⚡ Activar FLOWSTUDIO"}</button></form><div style={{
        marginTop: 14
      }}><button type="button" onClick={handleClick26} style={{
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
        }}><span>💬</span><span>Solicitar Licencia por Telegram ({Er})</span></button></div><div style={{
        marginTop: 8,
        textAlign: "center"
      }}><button type="button" onClick={handleClick27} style={{
          background: "transparent",
          border: "none",
          color: "#94a3b8",
          cursor: "pointer",
          fontSize: 11.5,
          fontWeight: 700,
          textDecoration: "underline",
          padding: "6px 10px"
        }}>👀 Explorar la aplicación en Modo Vista Previa</button></div><div style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid #232a3b",
        color: "#8290aa",
        fontSize: 10.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}><span>HWID: <strong style={{
            color: "#cbd5e1",
            fontFamily: "monospace"
          }}>{hwid}</strong></span><button type="button" onClick={handleClick25} style={{
          background: copied ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.06)",
          border: "none",
          color: copied ? "#86efac" : "#cbd5e1",
          borderRadius: 4,
          padding: "2px 8px",
          fontSize: 10,
          fontWeight: 700,
          cursor: "pointer"
        }}>{copied ? "✓ Copiado" : "📋 Copiar"}</button></div></div></div>;
};
const Dr = (event, state4) => {
  var target2;
  var target3;
  var current12;
  var current13;
  var current14;
  var current15;
  const tagName = (target2 = event.target) == null ? undefined : target2.tagName;
  if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || (target3 = event.target) != null && target3.isContentEditable) {
    return;
  }
  const state = w.getState();
  const {
    project: project,
    selectedId: selectedId
  } = state;
  const ctrlKey = event.ctrlKey || event.metaKey;
  switch (!0) {
    case event.code === "Space" || !ctrlKey && event.code === "KeyK":
      {
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
    case !ctrlKey && (event.code === "KeyS" || event.code === "KeyC"):
      {
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
    case event.code === "Delete" || event.code === "Backspace":
      {
        event.preventDefault();
        if (selectedId && project.scenes.length > 1) {
          state.removeScene(selectedId);
        }
        break;
      }
    case !ctrlKey && event.code === "KeyJ":
      {
        event.preventDefault();
        const current = state4.current;
        if (current) {
          const currentFrame = current.getCurrentFrame() || 0;
          current.seekTo(Math.max(0, currentFrame - (project.fps || 30)));
        }
        break;
      }
    case !ctrlKey && event.code === "KeyL":
      {
        event.preventDefault();
        const current = state4.current;
        if (current) {
          const currentFrame = current.getCurrentFrame() || 0;
          current.seekTo(currentFrame + (project.fps || 30));
        }
        break;
      }
    case ctrlKey && event.code === "KeyD":
      {
        event.preventDefault();
        if (selectedId) {
          state.duplicateScene(selectedId);
        }
        break;
      }
    case ctrlKey && !event.shiftKey && event.code === "KeyZ":
      {
        event.preventDefault();
        state.undo();
        break;
      }
    case ctrlKey && event.shiftKey && event.code === "KeyZ" || ctrlKey && event.code === "KeyY":
      {
        event.preventDefault();
        state.redo();
        break;
      }
    case ctrlKey && event.code === "KeyS":
      {
        event.preventDefault();
        Re(state.project).catch(() => {});
        break;
      }
    case event.code === "Home":
      {
        event.preventDefault();
        if ((current12 = state4.current) != null) {
          current12.seekTo(0);
        }
        break;
      }
    case event.code === "End":
      {
        event.preventDefault();
        const fps = project.fps || 30;
        const totalScenes = (project.scenes || []).reduce((acc, scene) => acc + Math.max(1, Math.round(Number(scene.duration || 4) * fps)), 0);
        if ((current13 = state4.current) != null) {
          current13.seekTo(Math.max(0, totalScenes - 1));
        }
        break;
      }
    case event.code === "ArrowUp":
      {
        event.preventDefault();
        const sceneIndex = project.scenes.findIndex(scene => scene.id === selectedId);
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
    case event.code === "ArrowDown":
      {
        event.preventDefault();
        const sceneIndex = project.scenes.findIndex(scene => scene.id === selectedId);
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
    case event.code === "ArrowLeft":
      {
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
          const sceneIndex = project.scenes.findIndex(scene => scene.id === selectedId);
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
    case event.code === "ArrowRight":
      {
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
          const sceneIndex = project.scenes.findIndex(scene => scene.id === selectedId);
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
    case ctrlKey && event.code === "KeyN":
      {
        event.preventDefault();
        state.addScene();
        break;
      }
  }
};
const $r = ref => {
  React.useEffect(() => {
    const handleKeyDown = event => Dr(event, ref);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ref]);
};
const zr = () => {
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(0);
  const project = w(state => state.project);
  const isHydrated = w(state => state.isHydrated);
  const setRenderState = w(state => state.setRenderState);
  React.useEffect(() => {
    if (isHydrated) {
      clearTimeout(ref2.current);
      ref2.current = setTimeout(() => {
        Re(project).then(() => {
          if (Date.now() - ref3.current >= 300000) {
            ref3.current = Date.now();
            return Sn(project, "Copia automática");
          }
        }).catch(error => setRenderState({
          status: "error",
          message: "No se pudo guardar: " + error.message,
          url: ""
        }));
      }, 350);
      return () => clearTimeout(ref2.current);
    }
  }, [project, isHydrated, setRenderState]);
};
const Or = callback => {
  const [isDragging, setIsDragging] = React.useState(!1);
  const dragCounter = {
    current: 0
  };
  const handleDragEnter = React.useCallback(event => {
    var dataTransfer;
    var items;
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current++;
    if ((items = (dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.items) != null && items.length) {
      setIsDragging(true);
    }
  }, []);
  const handleDragLeave = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);
  const handleDragOver = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  const handleDrop = React.useCallback(event => {
    var dataTransfer;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(!1);
    dragCounter.current = 0;
    const filteredFrom = Array.from(((dataTransfer = event.dataTransfer) == null ? undefined : dataTransfer.files) || []).filter(from => {
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
    isDragging: isDragging
  };
};
const At = min => new Promise(resolve => setTimeout(resolve, min));
function Fr({
  project: project,
  checkLicensed: checkLicensed,
  devLog: devLog,
  resumedOperations: resumedOperations,
  resolveScene: resolveScene
}) {
  const updateScene = w(state => state.updateScene);
  const finishSceneOperation = w(state => state.finishSceneOperation);
  const setAssetState = w(state => state.setAssetState);
  const setBatchState = w(state => state.setBatchState);
  const selectScene = w(state => state.selectScene);
  const generateVideo = React.useCallback(async (sceneOrId, force = !1, overrides = {}) => {
    var videoPrompt;
    var prompt;
    var current;
    if (!checkLicensed("la generación de video con IA")) {
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
        return devLog("⚠️", "Ya hay una generación de video activa. Espera a que termine o usa 'Generar Videos en Lote'.");
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
      message: "Preparando imagen de “" + scene12.title + "” para " + durations.label + "..."
    });
    devLog("🎬", "Imagen → video iniciada para “" + scene12.title + "” con " + durations.label + " (" + duration + " s).");
    try {
      let imageUrl = null;
      if (scene12.imageUrl.startsWith("data:")) {
        imageUrl = scene12.imageUrl;
      } else {
        try {
          const response = await fetch(scene12.imageUrl);
          if (response.ok) {
            const blob = await response.blob();
            imageUrl = await ra(blob);
          }
        } catch {}
      }
      setAssetState({
        status: "loading",
        operation: "video",
        progress: 12,
        startedAt: now,
        message: "Enviando solicitud a " + durations.label + "..."
      });
      const text = ((videoPrompt = scene12.videoPrompt) == null ? undefined : videoPrompt.trim()) || ((prompt = scene12.prompt) != null && prompt.trim() ? "Cinematic camera motion, smooth natural dynamics: " + scene12.prompt.trim().slice(0, 160) : "Natural cinematic movement with stable subject, consistent style and geometry.");
      const response = await Ee("FLOW_VIDEO_START", {
        mediaId: scene12.mediaId || null,
        imageUrl: scene12.imageUrl,
        imageData: imageUrl,
        prompt: text,
        format: project.format,
        model: durations.model,
        duration: duration
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
      const deadline = Date.now() + 2100000;
      let retryCount = 0;
      let status = "";
      while (Date.now() < deadline) {
        await At(8000);
        try {
          const response4 = await Ee("FLOW_VIDEO_STATUS", operation, 45000);
          retryCount = 0;
          if (response4.failed) {
            let error2 = response4.error || "Flow no pudo generar el video.";
            if (error2.includes("PUBLIC_ERROR_AUDIO_FILTERED") || error2.includes("AUDIO_FILTERED")) {
              error2 = "Filtro de audio/seguridad de Veo activado (suele ocurrir con marcas registradas como 'Coca-Cola' o términos sensibles). Solución recomendada: cambia el modelo a 'Omni Flash' en el Inspector o edita el prompt para omitir marcas comerciales.";
            }
            const error3 = new Error(error2);
            error3.terminal = true;
            throw error3;
          }
          if (!response4.done) {
            const queueLabel = response4.status === "MEDIA_GENERATION_STATUS_ACTIVE" ? durations.label + " está generando el video..." : durations.queueLabel;
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
              devLog("⏳", scene12.title + ": " + queueLabel);
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
            }, 240000);
          } catch {}
          const url = (response5 == null ? undefined : response5.url) || response4.videoUrl || "";
          const duration = Number(scene12.duration) || 4;
          finishSceneOperation(scene12.id, id, {
            videoUrl: url,
            flowVideoUrl: response4.videoUrl || "",
            videoPortable: response5 != null && !!response5.url,
            duration: duration,
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
            message: "✅ Video de “" + scene12.title + "” listo y asignado a la escena."
          });
          devLog("✅", "Video listo para “" + scene12.title + "” (" + (url.startsWith("http://127.0.0.1") ? "guardado localmente" : "enlazado") + ").");
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
          await At(Math.min(2 ** retryCount * 4000, 45000));
        }
      }
      throw new Error(durations.label + " superó 35 minutos de espera. La operación quedó guardada para reanudar el seguimiento.");
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
      devLog("❌", "Error imagen → video en “" + scene12.title + "”: " + error.message);
    }
  }, [checkLicensed, devLog, finishSceneOperation, project.format, resolveScene, resumedOperations, setAssetState, updateScene]);
  const generateAllVideos = React.useCallback(async (onlySelected = !1, modelOverride = null, durationOverride = null) => {
    if (!checkLicensed("la conversión de videos en lote")) {
      return;
    }
    const scenes = w.getState().project.scenes;
    let items = onlySelected ? scenes.filter(item => item.id === w.getState().selectedId && item.imageUrl) : scenes.filter(item => item.imageUrl && item.status !== "video-generating");
    if (!items.length) {
      return devLog("⚠️", "No hay escenas con imágenes para convertir a video.");
    }
    if (modelOverride || durationOverride) {
      items.forEach(item => {
        updateScene(item.id, {
          videoModel: modelOverride || item.videoModel || "omni",
          videoDuration: durationOverride || item.videoDuration || 6
        });
      });
    }
    devLog("🚀", "Iniciando conversión en lote de " + items.length + " videos con IA...");
    setBatchState({
      running: !0,
      progress: 0,
      current: 0,
      total: items.length,
      activePrompt: "Iniciando generación de videos..."
    });
    for (let index = 0; index < items.length && !w.getState().batchCancelled; index++) {
      const scene = items[index];
      setBatchState(prev => ({
        ...prev,
        current: index + 1,
        progress: Math.round(index / items.length * 100),
        activePrompt: "Generando video " + (index + 1) + "/" + items.length + ": " + scene.title + "..."
      }));
      await generateVideo(scene.id, !0);
      await At(1500);
    }
    setBatchState({
      running: !1,
      progress: 100,
      current: items.length,
      total: items.length,
      activePrompt: ""
    });
    devLog("✅", "¡Lote de videos finalizado!");
  }, [checkLicensed, devLog, generateVideo, setBatchState, updateScene]);
  const resumeVideo = React.useCallback(async scene => {
    const videoOperation = scene.videoOperation;
    const durations = ya({
      videoModel: (videoOperation == null ? undefined : videoOperation.model) || scene.videoModel,
      videoDuration: (videoOperation == null ? undefined : videoOperation.requestedDuration) || scene.videoDuration
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
      message: "Reanudando " + durations.label + " para “" + scene.title + "”..."
    });
    const deadline = Date.now() + 2100000;
    try {
      while (Date.now() < deadline) {
        await At(10000);
        const response6 = await Ee("FLOW_VIDEO_STATUS", videoOperation, 45000);
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
            message: response6.status === "MEDIA_GENERATION_STATUS_ACTIVE" ? durations.label + " está generando el video..." : durations.queueLabel
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
            accountId: videoOperation == null ? undefined : videoOperation.accountId,
            projectId: videoOperation == null ? undefined : videoOperation.projectId
          }, 240000);
        } catch {}
        const url = (response7 == null ? undefined : response7.url) || response6.videoUrl || "";
        const duration = Number(scene.duration) || 4;
        finishSceneOperation(scene.id, id, {
          videoUrl: url,
          flowVideoUrl: response6.videoUrl || "",
          videoPortable: response7 != null && !!response7.url,
          duration: duration,
          videoOperation: null,
          videoAccountId: (videoOperation == null ? undefined : videoOperation.accountId) || null,
          videoProjectId: (videoOperation == null ? undefined : videoOperation.projectId) || null,
          status: "ready",
          error: ""
        });
        setAssetState({
          status: "ready",
          operation: "video",
          progress: 100,
          message: "✅ Video de “" + scene.title + "” recuperado y asignado."
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
  const retryVideoImport = React.useCallback(async scene => {
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
        accountId: scene.videoAccountId || ((videoOperation2 = scene.videoOperation) == null ? undefined : videoOperation2.accountId) || null,
        projectId: scene.videoProjectId || ((videoOperation3 = scene.videoOperation) == null ? undefined : videoOperation3.projectId) || null
      }, 240000);
      finishSceneOperation(scene.id, id, {
        videoUrl: response.url,
        flowVideoUrl: "",
        videoPortable: !0,
        status: "ready",
        error: ""
      });
      setAssetState({
        status: "ready",
        operation: "video",
        progress: 100,
        message: "✅ Video copiado a la biblioteca local."
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
    const handleGenerateVideo = async state => {
      const {
        sceneId: sceneId,
        model: model,
        duration: duration
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
      await generateVideo(sceneId, !1, overrides);
    };
    window.addEventListener("flowtube:generate-video", handleGenerateVideo);
    return () => window.removeEventListener("flowtube:generate-video", handleGenerateVideo);
  }, [selectScene, generateVideo, updateScene]);
  return {
    generateVideo: generateVideo,
    generateAllVideos: generateAllVideos,
    resumeVideo: resumeVideo,
    retryVideoImport: retryVideoImport
  };
}
const Wr = new Set(["done", "error", "cancelled"]);
const za = 300000;
const Ur = 900000;
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
const _r = (ms, signal) => new Promise(resolve => {
  const finish = () => {
    clearTimeout(timer);
    signal.removeEventListener("abort", finish);
    resolve();
  };
  const timer = setTimeout(finish, ms);
  signal.addEventListener("abort", finish, {
    once: !0
  });
  if (signal.aborted) {
    finish();
  }
});
function Lr({
  onChange: onChange,
  onTerminal: callback6 = () => {},
  request: callback7 = Br,
  wait: callback8 = _r,
  now: callback9 = Date.now,
  pollInterval: pollInterval = 800,
  timeoutMs: timeoutMs,
  stallTimeoutMs: stallTimeoutMs = za,
  stitchingStallTimeoutMs: stitchingStallTimeoutMs,
  maxTimeoutMs: maxTimeoutMs = 9000000
} = {}) {
  let currentJob = null;
  const isCurrent = state => currentJob === state;
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
  const parseResponse = async response => {
    const data = await response.json();
    if (!response.ok || data == null || !data.ok) {
      throw new Error((data == null ? undefined : data.error) || "No se pudo iniciar el proceso de render.");
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
        cancelling: !1,
        state: {
          jobId: jobId,
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
          } catch {}
        }
        job.accepted = callback7("/api/render", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...state,
            jobId: jobId
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
        let isStitching = !1;
        const hasTimeout = typeof timeoutMs == "number";
        const effectiveStallTimeout = stitchingStallTimeoutMs ?? (stallTimeoutMs === za ? Ur : stallTimeoutMs);
        while (isCurrent(job) && !job.cancelling) {
          const now = callback9();
          if (hasTimeout && now - startTime >= timeoutMs) {
            throw new Error("El render superó el límite de tiempo.");
          }
          if (!hasTimeout) {
            const currentStallTimeout = isStitching ? effectiveStallTimeout : stallTimeoutMs;
            if (now - lastProgressAt >= currentStallTimeout) {
              const value = Math.round(currentStallTimeout / 60000);
              const stallDurationLabel = value > 0 ? value + " minutos" : Math.round(currentStallTimeout / 1000) + " segundos";
              throw new Error("El render se detuvo por inactividad (sin avance en los últimos " + stallDurationLabel + ").");
            }
            if (now - startTime >= maxTimeoutMs) {
              throw new Error("El render superó el límite de tiempo máximo (2.5 horas).");
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
          } catch {}
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
        job.cancelling = !0;
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
            message: "No se pudo confirmar la cancelación: " + error.message,
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
const Vr = project => {
  var captionTrack;
  var audioTrack;
  const items34 = [];
  const items35 = [];
  const scenes = Array.isArray(project == null ? undefined : project.scenes) ? project.scenes : [];
  if (!scenes.length) {
    items34.push({
      message: "El proyecto no contiene escenas."
    });
    return {
      critical: items34,
      warnings: items35,
      ready: !1,
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
        message: "Escena " + (index + 1) + ": duración inválida."
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
      message: "Faltan imágenes en " + items36.length + " escena" + (items36.length > 1 ? "s" : "") + "."
    });
  }
  const total = scenes.reduce((acc, item) => acc + Math.max(0, Number(item.duration) || 0) * 1000, 0);
  const cues = ((captionTrack = project == null ? undefined : project.captionTrack) == null ? undefined : captionTrack.cues) || [];
  if (cues.some(item => Number(item.endMs) > total + 500)) {
    items35.push("Hay subtítulos que terminan después del video.");
  }
  if ((project == null ? undefined : project.engine) === "ffmpeg" && cues.length) {
    items34.push({
      message: "FFmpeg no procesa los subtítulos de este proyecto. Usa Remotion Pro."
    });
  }
  if ((audioTrack = project == null ? undefined : project.audioTrack) == null || !audioTrack.url) {
    items35.push("El proyecto no tiene voz en off o pista de audio.");
  }
  if (![24, 25, 30, 50, 60].includes(Number(project == null ? undefined : project.fps))) {
    items34.push({
      message: "La velocidad FPS no es válida."
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
  checkLicensed: checkLicensed,
  devLog: devLog
}) {
  const [isRenderModalOpen, setIsRenderModalOpen] = React.useState(!1);
  const [preflightReport, setPreflightReport] = React.useState(null);
  const setRenderState = w(state => state.setRenderState);
  const renderState = w(state => state.renderState);
  const ref = React.useRef(null);
  ref.current ||= Lr({
    onChange: state => setRenderState(() => state),
    onTerminal: jobState => {
      if (jobState.status === "done") {
        devLog("✅", "¡Video exportado con éxito! " + jobState.url);
      } else if (jobState.status === "cancelled") {
        devLog("🛑", "Render cancelado por el usuario.");
      } else {
        devLog("❌", "Error en render: " + jobState.message);
      }
    }
  });
  React.useEffect(() => () => {
    var current;
    if ((current = ref.current) == null) {
      return undefined;
    } else {
      return current.dispose();
    }
  }, []);
  const renderVideo = React.useCallback(async (skipPreflight = !1, resolutionOverride = null, force = !1) => {
    if (ref.current.isActive()) {
      setIsRenderModalOpen(!0);
      return;
    }
    if (!checkLicensed("la exportación y renderizado de video")) {
      return;
    }
    const project = w.getState().project;
    if (skipPreflight !== !0) {
      const report = Vr(project);
      setPreflightReport(report);
      return;
    }
    setPreflightReport(null);
    const resolution = typeof resolutionOverride == "string" ? resolutionOverride : project.resolution || "1080p";
    const id = crypto.randomUUID();
    setIsRenderModalOpen(!0);
    devLog("🎬", "Iniciando render con " + (project.engine === "ffmpeg" ? "FFmpeg" : "Remotion") + " en " + resolution.toUpperCase() + " (ID: " + id.slice(0, 8) + ")...");
    await ref.current.start({
      ...project,
      resolution: resolution,
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
    isRenderModalOpen: isRenderModalOpen,
    setIsRenderModalOpen: setIsRenderModalOpen,
    preflightReport: preflightReport,
    setPreflightReport: setPreflightReport,
    renderJobState: renderState,
    renderVideo: renderVideo,
    cancelRender: cancelRender
  };
}
const Gr = text => String(text).replace(/```(?:srt|text)?/gi, "").trim();
const Oa = ms => new Promise(resolve => setTimeout(resolve, ms));
const Yr = async file => {
  let promise = 0;
  let items = [];
  try {
    const objectUrl = URL.createObjectURL(file);
    try {
      promise = await new Promise(resolve => {
        const element = document.createElement("audio");
        element.preload = "metadata";
        element.onloadedmetadata = () => resolve(Math.round(element.duration * 1000));
        element.onerror = () => resolve(0);
        element.src = objectUrl;
      });
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {}
  const audioContext = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
  if (audioContext) {
    try {
      const v0x546f99 = new audioContext();
      const buffer = await file.arrayBuffer();
      const decodedBuffer = await v0x546f99.decodeAudioData(buffer).catch(() => null);
      if (decodedBuffer) {
        if (!promise || promise <= 0) {
          promise = Math.round(decodedBuffer.duration * 1000);
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
          for (let index = segmentStart; index < length; index += value101) {
            value102 = Math.max(value102, Math.abs(channelData[index]));
          }
          return value102;
        });
        const value103 = Math.max(...items, 0.01);
        items = items.map(item => Number((item / value103).toFixed(3)));
      }
      await v0x546f99.close().catch(() => {});
    } catch {}
  }
  if (!promise || promise <= 0) {
    promise = Math.max(1000, Math.round(file.size * 8 / 160));
  }
  return {
    durationMs: promise,
    peaks: items
  };
};
const qr = ({
  checkLicensed: checkLicensed,
  devLog: devLog,
  onGenerateVisualPrompts: onGenerateVisualPrompts
}) => {
  const ref4 = React.useRef(null);
  const ref5 = React.useRef(!1);
  const ref6 = React.useRef("");
  const project = w(state => state.project);
  w(state => state.flowState);
  const updateProject = w(state => state.updateProject);
  const setAssetState = w(state => state.setAssetState);
  const selectScene = w(state => state.selectScene);
  const handleImportSrt = React.useCallback(async file => {
    var captionTrack;
    if (file) {
      try {
        const text = await file.text();
        const cues = ha(text, file.name);
        if (!cues.length) {
          throw new Error("El archivo no contiene captions o segmentos válidos (soporta .srt, .vtt o .json de WhisperX).");
        }
        const matches = cues.some(item => {
          var words;
          return ((words = item.words) == null ? undefined : words.length) > 0;
        });
        const {
          project: project
        } = w.getState();
        w.getState().setProject({
          ...project,
          engine: "remotion",
          captionTrack: {
            sourceName: file.name,
            cues: cues,
            enabled: !0,
            style: {
              ...((captionTrack = project.captionTrack) == null ? undefined : captionTrack.style)
            }
          }
        });
        setAssetState({
          status: "ready",
          message: cues.length + " subtítulos importados" + (matches ? " (con alineación de palabra WhisperX 🎯)" : "") + "."
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
      const errorMessage = "Google Flow no está conectado para usar Gemini Cloud.";
      if (devLog != null) {
        devLog("❌", errorMessage);
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
          devLog("⏳", "Recuperando el audio guardado para enviarlo a Gemini...");
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
        devLog("❌", "Error leyendo el audio: " + error.message);
      }
      setAssetState({
        status: "error",
        operation: "transcription",
        message: error.message
      });
      return;
    }
    const durationMs = Number(audioTrack.durationMs) || 0;
    const chunkSeconds = durationMs > 1200000 ? 45 : 30;
    const value = Math.max(1, Math.min(Math.ceil(durationMs / (chunkSeconds * 1000)), 100));
    const size = current.size;
    setAssetState({
      status: "loading",
      operation: "transcription",
      progress: 5,
      startedAt: startedAt,
      message: "Transcribiendo con Gemini IA 0/" + value + "..."
    });
    if (devLog != null) {
      devLog("☁️", "Gemini IA: enviando " + value + " fragmento(s) de audio...");
    }
    let items = [];
    try {
      const srtPrompt = "Eres un transcriptor y subtitulador profesional de videos para YouTube y Shorts.\nTranscribe el audio a formato de subtítulos SRT ESTÁNDAR con máxima fidelidad " + (project.transcriptionLanguage && project.transcriptionLanguage !== "auto" ? "en idioma " + project.transcriptionLanguage.toUpperCase() : "en el idioma original y exacto del audio (sin traducir)") + ", puntuación perfecta y segmentación cinematográfica.\n\nREGLAS DE FORMATO Y RITMO (SRT):\n1. Cada bloque de subtítulo debe tener un número correlativo (1, 2, 3...) y timestamps en formato:\n   00:00:00,000 --> 00:00:00,000\n2. Ritmo de lectura: Cada subtítulo debe durar entre 1.5 y 4.0 segundos (siguiendo las pausas naturales de respiración y habla del narrador).\n3. Longitud de texto: Máximo 1 a 2 líneas cortas por subtítulo (~30-38 caracteres por línea). Nunca bloques gigantes de texto.\n4. Cortar las frases en pausas lógicas o de puntuación (comas, puntos, conectores como \"pero\", \"y\", \"because\", \"and\", \"when\").\n5. Ortografía impecable en el idioma original del audio (español, inglés, etc.) con sus signos de puntuación, mayúsculas y acentuación correspondientes.\n\nEJEMPLO DE ESTRUCTURA:\n1\n00:00:00,180 --> 00:00:03,515\nWhen someone looks at a solar farm,\nit seems like a simple business:\n\n2\n00:00:03,600 --> 00:00:07,715\ninstall thousands of panels, wait for\nthe sun to rise and sell electricity.\n\nResponde ÚNICAMENTE con el texto SRT puro, sin markdown fences.";
      for (let index = 0; index < value; index++) {
        if (ref5.current) {
          throw new Error("Transcripción cancelada por el usuario.");
        }
        if (devLog != null) {
          devLog("📤", "Gemini IA: transcribiendo fragmento " + (index + 1) + "/" + value + "...");
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
        }, 120000);
        const ha2 = ha(Gr(response.text)).map(ha => ({
          ...ha,
          startMs: ha.startMs + value104,
          endMs: ha.endMs + value104
        }));
        items = items.concat(ha2);
        setAssetState({
          status: "loading",
          operation: "transcription",
          progress: Math.round((index + 1) / value * 100),
          startedAt: startedAt,
          message: "Transcribiendo con Gemini IA " + (index + 1) + "/" + value + "..."
        });
        await Oa(600);
      }
      items.sort((a, b) => a.startMs - b.startMs);
      if (!items.length) {
        throw new Error("La IA no devolvió captions válidos.");
      }
      const baseName = ((name = audioTrack.name) == null ? undefined : name.replace(/\.[^.]+$/, "")) || "voz-en-off";
      w.getState().setProject({
        ...w.getState().project,
        engine: "remotion",
        captionTrack: {
          ...w.getState().project.captionTrack,
          sourceName: baseName + ".srt",
          cues: items
        }
      });
      const successMessage = items.length + " subtítulos generados con Gemini.";
      setAssetState({
        status: "ready",
        operation: "transcription",
        message: successMessage
      });
      if (devLog != null) {
        devLog("✅", successMessage);
      }
    } catch (error) {
      const message = /reCAPTCHA|evaluation failed/i.test(error.message) ? "Google rechazó el captcha. Espera y reintenta." : error.message;
      setAssetState({
        status: "error",
        operation: "transcription",
        message: message
      });
      if (devLog != null) {
        devLog("❌", "Transcripción fallida: " + message);
      }
    }
  }, [devLog, project.textModel, project.transcriptionLanguage, setAssetState]);
  const cancelTranscription = React.useCallback(() => {
    ref5.current = !0;
    if (ref6.current) {
      fetch("/api/transcribe-whisper/cancel/" + ref6.current, {
        method: "POST"
      }).catch(() => {});
      ref6.current = "";
    }
    setAssetState({
      status: "error",
      operation: "transcription",
      progress: 0,
      message: "Transcripción cancelada por el usuario."
    });
    if (devLog != null) {
      devLog("⚠️", "Transcripción cancelada por el usuario.");
    }
  }, [devLog, setAssetState]);
  const transcribeAudio = React.useCallback(async (scene = null) => {
    var scenes8;
    var scenes9;
    var name2;
    var captionTrack;
    if (checkLicensed && !checkLicensed("la transcripción de audio con IA")) {
      return;
    }
    const project = w.getState().project;
    let audioTrack = project.audioTrack;
    if (scene != null && scene.videoUrl || scene != null && scene.flowVideoUrl) {
      audioTrack = {
        url: scene.videoUrl || scene.flowVideoUrl,
        name: (scene.title || "video") + ".mp4",
        durationMs: Number(scene.duration || 0) * 1000,
        isVideoSource: !0
      };
    } else if (audioTrack == null || !audioTrack.url) {
      const selectedId = w.getState().selectedId;
      const found2 = (scenes8 = project.scenes) == null ? undefined : scenes8.find(item => item.id === selectedId);
      const found3 = found2 != null && found2.videoUrl || found2 != null && found2.flowVideoUrl ? found2 : (scenes9 = project.scenes) == null ? undefined : scenes9.find(item => item.videoUrl || item.flowVideoUrl);
      if (found3) {
        audioTrack = {
          url: found3.videoUrl || found3.flowVideoUrl,
          name: (found3.title || "video") + ".mp4",
          durationMs: Number(found3.duration || 0) * 1000,
          isVideoSource: true
        };
      }
    }
    if (audioTrack == null || !audioTrack.url) {
      const errorMessage = "Sube la voz en off o carga un video con audio antes de transcribir.";
      if (devLog != null) {
        devLog("❌", errorMessage);
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
    ref5.current = !1;
    const durationSuffix = Number(audioTrack.durationMs) > 0 ? " (" + (Number(audioTrack.durationMs) / 1000).toFixed(1) + "s)" : "";
    const name3 = audioTrack.isVideoSource ? "video (" + audioTrack.name + ")" : audioTrack.name || "audio";
    if (devLog != null) {
      devLog("🎙️", "Iniciando transcripción de " + name3 + durationSuffix + "...");
    }
    const now = Date.now();
    if ((project.transcriptionEngine || "local") === "gemini") {
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
        devLog("⏳", "Whisper local: conectando con motor nativo...");
      }
      const url = "http://127.0.0.1:4322/api/transcribe-whisper/start";
      const payload = {
        audioUrl: audioTrack.url,
        audioName: audioTrack.name,
        model: project.transcriptionModel || "base",
        language: project.transcriptionLanguage || "auto"
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
        throw new Error(startResult.error || "Whisper local respondió HTTP " + response.status + ".");
      }
      ref6.current = startResult.jobId;
      let message = "";
      let finalResult = null;
      while (!ref5.current) {
        await Oa(400);
        const response = await fetch("http://127.0.0.1:4322/api/transcribe-whisper/status/" + startResult.jobId).catch(() => fetch("/api/transcribe-whisper/status/" + startResult.jobId));
        const statusResult = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(statusResult.error || "No se pudo consultar el avance de Whisper.");
        }
        if (statusResult.message && statusResult.message !== message) {
          message = statusResult.message;
          if (devLog != null) {
            devLog("🎙️", statusResult.message);
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
          throw new Error(statusResult.error || statusResult.message || "La transcripción no pudo completarse.");
        }
      }
      if (ref5.current) {
        throw new Error("Transcripción cancelada por el usuario.");
      }
      ref6.current = "";
      if (Array.isArray(finalResult == null ? undefined : finalResult.cues) && finalResult.cues.length > 0) {
        const baseName = ((name2 = audioTrack.name) == null ? undefined : name2.replace(/\.[^.]+$/, "")) || (audioTrack.isVideoSource ? "video-subtitulos" : "voz-en-off");
        w.getState().setProject({
          ...w.getState().project,
          engine: "remotion",
          captionTrack: {
            ...w.getState().project.captionTrack,
            sourceName: baseName + ".json",
            cues: finalResult.cues,
            enabled: !0,
            style: {
              ...((captionTrack = w.getState().project.captionTrack) == null ? undefined : captionTrack.style)
            }
          }
        });
        const successMessage = "✨ " + finalResult.cues.length + " frases sincronizadas con Whisper local" + (audioTrack.isVideoSource ? " directamente desde el video" : "") + " (Alineación palabra por palabra 🎯).";
        setAssetState({
          status: "ready",
          operation: "transcription",
          progress: 100,
          message: successMessage
        });
        if (devLog != null) {
          devLog("✅", successMessage);
        }
        return;
      }
      throw new Error("Whisper local no devolvió subtítulos utilizables.");
    } catch (error) {
      if (devLog != null) {
        devLog("❌", "Whisper local no pudo completar la transcripción: " + error.message);
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
      message: isMusic ? "Procesando música / SFX para A2..." : "Procesando pista de audio..."
    });
    if (devLog != null) {
      devLog(isMusic ? "🎵" : "🎙️", "Subiendo " + (isMusic ? "música/SFX a pista A2" : "audio") + ": " + file.name + " (" + (file.size / 1048576).toFixed(2) + " MB)...");
    }
    try {
      const headers = {
        "Content-Type": file.type || "audio/mpeg",
        "x-filename": encodeURIComponent(file.name)
      };
      const [response, audioMeta] = await Promise.all([fetch("http://127.0.0.1:4322/api/import", {
        method: "POST",
        headers: headers,
        body: file
      }).catch(() => fetch("/api/import", {
        method: "POST",
        headers: headers,
        body: file
      })), Yr(file)]);
      const data = await response.json();
      if (!response.ok || data == null || !data.url) {
        throw new Error((data == null ? undefined : data.error) || "No se pudo guardar el archivo de audio en el servidor.");
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
          message: "✅ " + (audioMeta.durationMs / 1000).toFixed(1) + "s de música / SFX asignados a la pista A2."
        });
        if (devLog != null) {
          devLog("✅", "Música/SFX cargada a pista A2: " + file.name + " (" + (audioMeta.durationMs / 1000).toFixed(1) + "s, loop activo)");
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
          message: "✅ " + (audioMeta.durationMs / 1000).toFixed(1) + "s de audio listos. Puedes transcribir o sincronizar."
        });
        if (devLog != null) {
          devLog("✅", "Audio cargado con éxito: " + file.name + " (" + (audioMeta.durationMs / 1000).toFixed(1) + "s)");
        }
        if (w.getState().autoTranscribeOnAudioUpload) {
          if (devLog != null) {
            devLog("🤖", "Preset activo: iniciando auto-transcripción de subtítulos con IA...");
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
        devLog("❌", "Error cargando audio: " + error.message);
      }
    }
  }, [devLog, setAssetState, transcribeAudio, updateProject]);
  const uploadMusic = React.useCallback(file => uploadAudio(file, "music"), [uploadAudio]);
  const createScenesFromTranscript = React.useCallback(async () => {
    var captionTrack;
    var audioTrack;
    var firstItem;
    const project = w.getState().project;
    const cues = ((captionTrack = project.captionTrack) == null ? undefined : captionTrack.cues) || [];
    if (!cues.length) {
      return setAssetState({
        status: "error",
        message: "Sube audio e importa SRT antes de crear escenas."
      });
    }
    if (project.scenes.some(scene => scene.imageUrl || scene.videoUrl || scene.prompt) && !window.confirm("Esto reemplazará las escenas actuales con las frases del SRT. ¿Continuar?")) {
      return;
    }
    const timedCues = gt(cues, (audioTrack = project.audioTrack) == null ? undefined : audioTrack.durationMs);
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
    selectScene((firstItem = items[0]) == null ? undefined : firstItem.id);
    setAssetState({
      status: "ready",
      message: "✅ " + items.length + " escenas creadas desde el SRT."
    });
    if (w.getState().flowState.connected && onGenerateVisualPrompts) {
      setTimeout(() => {
        onGenerateVisualPrompts(false);
      }, 100);
    }
  }, [onGenerateVisualPrompts, selectScene, setAssetState]);
  return {
    audioFileRef: ref4,
    uploadAudio: uploadAudio,
    uploadMusic: uploadMusic,
    importSrt: handleImportSrt,
    transcribeAudio: transcribeAudio,
    cancelTranscription: cancelTranscription,
    createScenesFromTranscript: createScenesFromTranscript
  };
};
const Xr = ReactLib.lazy(() => _e(() => import("./Dashboard-CtUuoFER.js"), __vite__mapDeps([0, 1, 2, 3]), import.meta.url).then(result => ({
  default: result.Dashboard
})));
const Kr = ReactLib.lazy(() => _e(() => import("./ThumbnailStudio-D5ap8eMV.js"), __vite__mapDeps([4, 1, 2, 3]), import.meta.url).then(result => ({
  default: result.ThumbnailStudio
})));
const Jr = ReactLib.lazy(() => _e(() => import("./AudioStudioView-CIDz6WAG.js"), __vite__mapDeps([5, 1, 2, 6, 3]), import.meta.url).then(result => ({
  default: result.AudioStudioView
})));
const Zr = ReactLib.lazy(() => _e(() => import("./AudioStudioModal-BEGLz_Up.js"), __vite__mapDeps([7, 1, 2, 6, 3]), import.meta.url).then(result => ({
  default: result.AudioStudioModal
})));
const Qr = ReactLib.lazy(() => _e(() => import("./RenderProgressModal-PJg8RyN0.js"), __vite__mapDeps([8, 1, 2]), import.meta.url).then(result => ({
  default: result.RenderProgressModal
})));
const Fa = ReactLib.lazy(() => _e(() => import("./AccountsModal-QfW0I3wF.js"), __vite__mapDeps([9, 1, 2]), import.meta.url).then(result => ({
  default: result.AccountsModal
})));
const _Component14 = ReactLib.lazy(() => _e(() => import("./BatchPromptsModal-CbpqNnli.js"), __vite__mapDeps([10, 1, 2, 3]), import.meta.url).then(result => ({
  default: result.BatchPromptsModal
})));
const Wa = ReactLib.lazy(() => _e(() => import("./MaintenanceModal-CilEv2u9.js"), __vite__mapDeps([11, 1, 2, 3]), import.meta.url).then(result => ({
  default: result.MaintenanceModal
})));
const _Component15 = ReactLib.lazy(() => _e(() => import("./PreflightModal-Cw9t2V4n.js"), __vite__mapDeps([12, 1, 2, 3]), import.meta.url).then(result => ({
  default: result.PreflightModal
})));
const Et = ReactLib.lazy(() => _e(() => import("./AutoUpdateModal-Cu6k4Lpq.js"), __vite__mapDeps([13, 1, 2]), import.meta.url).then(result => ({
  default: result.AutoUpdateModal
})));
const Pt = ReactLib.lazy(() => _e(() => import("./ActivationModal-BDSD3qIP.js"), __vite__mapDeps([14, 1, 2, 3]), import.meta.url).then(result => ({
  default: result.ActivationModal
})));
const _Component16 = () => {
  const ref7 = React.useRef(null);
  const ref8 = React.useRef(new Set());
  const project = w(state => state.project);
  const isHydrated = w(state => state.isHydrated);
  const currentView = w(state => state.currentView);
  const authUser = w(state => state.authUser);
  w(state => state.flowState);
  w(state => state.updateProject);
  w(state => state.updateScene);
  w(state => state.finishSceneOperation);
  const setFlowState = w(state => state.setFlowState);
  w(state => state.setRenderState);
  w(state => state.setAssetState);
  w(state => state.setBatchState);
  w(state => state.setReferenceStatus);
  const selectScene = w(state => state.selectScene);
  w(state => state.editorMode);
  const hydrate = w(state => state.hydrate);
  const [logs, setLogs] = React.useState([]);
  const devLog = React.useCallback((type, message) => {
    var electronAPI;
    var appendAppLog;
    var logPromise;
    var catchFn;
    const time = new Date().toLocaleTimeString("es", {
      hour12: !1
    });
    setLogs(state => [...state.slice(-49), {
      time: time,
      type: type,
      msg: String(message)
    }]);
    if ((catchFn = (appendAppLog = (electronAPI = window.electronAPI) == null ? undefined : electronAPI.appendAppLog) == null ? undefined : (logPromise = appendAppLog.call(electronAPI, type, String(message))).catch) != null) {
      catchFn.call(logPromise, () => {});
    }
  }, []);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = React.useState(!1);
  const [isBatchPromptsModalOpen, setIsBatchPromptsModalOpen] = React.useState(!1);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = React.useState(!1);
  const [isAudioStudioModalOpen, setIsAudioStudioModalOpen] = React.useState(!1);
  const [audioStudioTab, setAudioStudioTab] = React.useState("tts");
  const [isActivationModalOpen, setIsActivationModalOpen] = React.useState(!1);
  const [activationReason, setActivationReason] = React.useState("");
  const checkLicensed = React.useCallback((featureName = "esta función") => {
    const authUser = w.getState().authUser;
    if ((authUser == null ? undefined : authUser.role) === "admin") {
      return !0;
    }
    const licenseExpiresAt = (authUser == null ? undefined : authUser.licenseExpiresAt) && authUser.licenseExpiresAt < Date.now();
    if (!authUser || authUser.role === "guest" || authUser.isLicensed === false || licenseExpiresAt) {
      setActivationReason(licenseExpiresAt ? "Tu período de suscripción ha vencido. Introduce un nuevo código de activación para renovar." : "Activa tu licencia VIP para usar " + featureName + ".");
      setIsActivationModalOpen(true);
      return false;
    } else {
      return true;
    }
  }, []);
  React.useEffect(() => {
    const handleOpenAudioStudio = state => {
      var detail;
      setAudioStudioTab(((detail = state.detail) == null ? undefined : detail.tab) || "tts");
      w.getState().setCurrentView("audio");
    };
    const handleOpenRenderModal = () => {
      setIsRenderModalOpen(!0);
    };
    const handleOpenActivationModal = state => {
      var detail;
      setActivationReason(((detail = state.detail) == null ? undefined : detail.reason) || "Activa tu licencia VIP para desbloquear esta función");
      setIsActivationModalOpen(!0);
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
    uploadAudio: uploadAudio,
    uploadMusic: uploadMusic,
    importSrt: importSrt,
    transcribeAudio: transcribeAudio,
    cancelTranscription: cancelTranscription,
    createScenesFromTranscript: createScenesFromTranscript
  } = qr({
    checkLicensed: checkLicensed,
    devLog: devLog,
    onGenerateVisualPrompts: forceAll => generateVisualPrompts(forceAll)
  });
  const handleFilesDropped = React.useCallback(async items37 => {
    if (!items37 || !items37.length) {
      return;
    }
    const {
      project: project,
      selectedId: selectedId
    } = w.getState();
    const scene = project.scenes.find(scene => scene.id === selectedId) || project.scenes[0];
    const items38 = items37.filter(file => {
      const name = (file.name || "").toLowerCase();
      return name.endsWith(".srt") || name.endsWith(".vtt") || name.endsWith(".json") && !file.type.startsWith("image");
    });
    for (const item of items38) {
      await importSrt(item);
    }
    const items39 = items37.filter(item => item.type.startsWith("image/") || item.type.startsWith("video/"));
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
      var electronAPI;
      if ((electronAPI = window.electronAPI) != null && electronAPI.getAccounts) {
        try {
          const filteredGetAccounts = ((await window.electronAPI.getAccounts()) || []).filter(getAccount => getAccount.connected && getAccount.projectId);
          if (filteredGetAccounts.length > 0) {
            setFlowState({
              connected: !0,
              count: filteredGetAccounts.length,
              label: filteredGetAccounts.length > 1 ? "⚡ " + filteredGetAccounts.length + " Cuentas Flow" : "Flow Conectado"
            });
            return;
          }
        } catch {}
      }
      try {
        const response = await Ee("FLOW_CHECK", {}, 2500);
        const activeAccountsCount = Number(response.activeAccountsCount || response.accountsCount) || (response.connected ? 1 : 0);
        setFlowState({
          connected: !!response.connected,
          count: activeAccountsCount,
          label: activeAccountsCount > 1 ? "⚡ " + activeAccountsCount + " Cuentas Flow" : response.connected ? "Flow Conectado" : "Conectar Google Flow"
        });
      } catch {
        setFlowState({
          connected: !1,
          count: 0,
          label: "Conectar Google Flow"
        });
      }
    };
    checkFlowConnection();
    const timer = setInterval(checkFlowConnection, 4000);
    if ((electronAPI = window.electronAPI) != null && electronAPI.onAccountsChanged) {
      window.electronAPI.onAccountsChanged(accounts => {
        const items = (accounts || []).filter(item => item.connected && item.projectId);
        setFlowState({
          connected: items.length > 0,
          count: items.length,
          label: items.length > 1 ? "⚡ " + items.length + " Cuentas Flow" : items.length ? "Flow Conectado" : "Conectar Google Flow"
        });
      });
    }
    return () => clearInterval(timer);
  }, [setFlowState]);
  const handleSelectScene = React.useCallback(sceneId => {
    var current;
    selectScene(sceneId);
    const {
      project: project
    } = w.getState();
    const sceneIndex = project.scenes.findIndex(scene => scene.id === sceneId);
    const totalSlice = project.scenes.slice(0, Math.max(0, sceneIndex)).reduce((acc, slice) => acc + Math.max(1, Math.round(Number(slice.duration || 4) * project.fps)), 0);
    if ((current = ref7.current) != null) {
      current.seekTo(totalSlice);
    }
  }, [selectScene]);
  const resolveScene = sceneOrId => {
    if (!sceneOrId) {
      const {
        project: project,
        selectedId: selectedId
      } = w.getState();
      return project.scenes.find(scene => scene.id === selectedId) || project.scenes[0];
    }
    if (typeof sceneOrId == "string") {
      const {
        project: project
      } = w.getState();
      return project.scenes.find(scene => scene.id === sceneOrId);
    }
    return sceneOrId;
  };
  const {
    uploadImage: uploadImage,
    uploadCharacterReference: uploadCharacterReference,
    removeCharacterReference: removeCharacterReference,
    importVisualFilesToTimeline: importVisualFilesToTimeline,
    generateImage: generateImage,
    generateAllImages: generateAllImages,
    runAutoPipeline: runAutoPipeline,
    generateVisualPrompts: generateVisualPrompts
  } = Qn({
    checkLicensed: checkLicensed,
    devLog: devLog,
    resolveScene: resolveScene
  });
  const {
    generateVideo: generateVideo,
    generateAllVideos: generateAllVideos,
    resumeVideo: resumeVideo
  } = Fr({
    project: project,
    checkLicensed: checkLicensed,
    devLog: devLog,
    resumedOperations: ref8,
    resolveScene: resolveScene
  });
  const {
    isRenderModalOpen: isRenderModalOpen,
    setIsRenderModalOpen: setIsRenderModalOpen,
    preflightReport: preflightReport,
    setPreflightReport: setPreflightReport,
    renderJobState: renderJobState,
    renderVideo: renderVideo,
    cancelRender: cancelRender
  } = Hr({
    checkLicensed: checkLicensed,
    devLog: devLog
  });
  const askCopilot = async ({
    message: message,
    selectedScene: selectedScene,
    projectSnapshot: projectSnapshot
  }) => {
    var scenes;
    var data2;
    var data3;
    const sceneContext = selectedScene ? "Escena seleccionada: " + (selectedScene.title || "Sin título") + ". Guion: " + (selectedScene.script || selectedScene.caption || "").slice(0, 900) + ". Prompt visual actual: " + (selectedScene.prompt || "").slice(0, 700) + "." : "No hay una escena seleccionada.";
    const prompt = "Eres FLOWSTUDIO Copilot, un asistente de edición de video dentro de FLOWSTUDIO. Responde en español, de forma clara y accionable, sin inventar que ejecutaste cambios que no se te pidieron. Puedes explicar tareas de guion, prompts visuales, imágenes, subtítulos, audio, timeline y render. Si la petición corresponde a una acción automática, indica el botón o comando correspondiente.\n\nPROYECTO: " + ((projectSnapshot == null ? undefined : projectSnapshot.title) || project.title || "Proyecto sin título") + "\nFORMATO: " + ((projectSnapshot == null ? undefined : projectSnapshot.format) || project.format || "video") + "\nESCENAS: " + ((projectSnapshot == null ? undefined : projectSnapshot.sceneCount) ?? ((scenes = project.scenes) == null ? undefined : scenes.length) ?? 0) + "\n" + sceneContext + "\n\nPETICIÓN DEL USUARIO:\n" + message + "\n\nDa una respuesta útil y breve. Si falta información, pide solo el dato necesario. No devuelvas JSON, Markdown, asteriscos ni etiquetas técnicas.";
    const response = await Ee("FLOW_GENERATE_TEXT", {
      model: project.textModel,
      parts: [{
        text: prompt
      }]
    }, 45000);
    const string = String(typeof response == "string" ? response : (response == null ? undefined : response.text) || (response == null ? undefined : response.output) || (response == null ? undefined : response.content) || ((data2 = response == null ? undefined : response.data) == null ? undefined : data2.text) || ((data3 = response == null ? undefined : response.data) == null ? undefined : data3.output) || "").trim();
    if (!string) {
      throw new Error("Google Flow no devolvió texto");
    }
    return string;
  };
  if (isHydrated) {
    if (currentView === "login" || !authUser) {
      return <jsxRuntime.Fragment><Rr /><_Component11 /></jsxRuntime.Fragment>;
    } else if (currentView === "dashboard") {
      return <div className="app-shell full-view"><_Component12 /><Xr onOpenAccountsModal={() => setIsAccountsModalOpen(true)} onOpenMaintenance={() => setIsMaintenanceModalOpen(true)} /><Et /><Pt isOpen={isActivationModalOpen} onClose={() => setIsActivationModalOpen(false)} reason={activationReason} /><_Component11 /><Fa isOpen={isAccountsModalOpen} onClose={() => setIsAccountsModalOpen(false)} /><Wa isOpen={isMaintenanceModalOpen} onClose={() => setIsMaintenanceModalOpen(false)} /><It logs={logs} onClearLogs={() => setLogs([])} onResumeBatch={() => generateAllImages(false)} onResumePrompts={() => generateVisualPrompts(false)} onRetryTranscription={transcribeAudio} onCancelTranscription={cancelTranscription} onRetryRender={() => renderVideo(true, null, true)} /></div>;
    } else if (currentView === "audio") {
      return <div className="app-shell full-view"><_Component12 /><Jr /><Et /><Pt isOpen={isActivationModalOpen} onClose={() => setIsActivationModalOpen(false)} reason={activationReason} /><_Component11 /><It logs={logs} onClearLogs={() => setLogs([])} onResumeBatch={() => generateAllImages(false)} onResumePrompts={() => generateVisualPrompts(false)} onRetryTranscription={transcribeAudio} onCancelTranscription={cancelTranscription} onRetryRender={() => renderVideo(true, null, true)} /></div>;
    } else if (currentView === "thumbnails" || currentView === "thumbnail") {
      return <div className="app-shell full-view"><_Component12 /><Kr /><Et /><Pt isOpen={isActivationModalOpen} onClose={() => setIsActivationModalOpen(false)} reason={activationReason} /><_Component11 /><It logs={logs} onClearLogs={() => setLogs([])} onResumeBatch={() => generateAllImages(false)} onResumePrompts={() => generateVisualPrompts(false)} onRetryTranscription={transcribeAudio} onCancelTranscription={cancelTranscription} onRetryRender={() => renderVideo(true, null, true)} /></div>;
    } else {
      return <div className="app-shell"><_Component12 /><$n onUploadCharacterReference={uploadCharacterReference} onRemoveCharacterReference={removeCharacterReference} onRenderVideo={renderVideo} onOpenAccountsModal={() => setIsAccountsModalOpen(true)} onOpenMaintenance={() => setIsMaintenanceModalOpen(true)} /><main className={"workspace format-" + project.format}><_Component13 previewProps={{
            playerRef: ref7,
            onSelectScene: handleSelectScene,
            onUploadImage: uploadImage,
            onUploadAudio: uploadAudio,
            onUploadMusic: uploadMusic,
            onImportSrt: importSrt,
            onTranscribeAudio: transcribeAudio,
            onCreateScenesFromTranscript: createScenesFromTranscript,
            onOpenBatchPromptsModal: () => setIsBatchPromptsModalOpen(true)
          }} inspectorProps={{
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
          }} /></main><It logs={logs} onClearLogs={() => setLogs([])} onResumeBatch={() => generateAllImages(false)} onResumePrompts={() => generateVisualPrompts(false)} onRetryTranscription={transcribeAudio} onCancelTranscription={cancelTranscription} onRetryRender={() => renderVideo(true, null, true)} /><Qr isOpen={isRenderModalOpen} onClose={() => setIsRenderModalOpen(false)} renderJob={renderJobState} onRetry={() => renderVideo(true, null, true)} onCancel={cancelRender} /><Fa isOpen={isAccountsModalOpen} onClose={() => setIsAccountsModalOpen(false)} /><_Component14 isOpen={isBatchPromptsModalOpen} onClose={() => setIsBatchPromptsModalOpen(false)} onGenerateImage={generateImage} /><Wa isOpen={isMaintenanceModalOpen} onClose={() => setIsMaintenanceModalOpen(false)} /><Et /><Pt isOpen={isActivationModalOpen} onClose={() => setIsActivationModalOpen(false)} reason={activationReason} /><_Component15 report={preflightReport} onClose={() => setPreflightReport(null)} onContinue={resolutionOverride => renderVideo(true, resolutionOverride)} onGenerateMissingImages={() => generateAllImages(false, false)} /><Zr isOpen={isAudioStudioModalOpen} onClose={() => setIsAudioStudioModalOpen(false)} initialTab={audioStudioTab} /><_Component11 /></div>;
    }
  } else {
    return <div style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      color: "#78a4ff",
      background: "#05070d",
      fontFamily: "system-ui",
      fontSize: 13,
      fontWeight: 800
    }}>Cargando proyecto local...<_Component11 /></div>;
  }
};
const _Component17 = () => <Mr><ReactLib.Suspense fallback={<div style={{
    display: "grid",
    placeItems: "center",
    height: "100vh",
    background: "#05060b",
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: 700
  }}><div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }}><div style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: "2.5px solid rgba(99, 102, 241, 0.2)",
        borderTopColor: "#6366f1",
        animation: "spin 0.8s linear infinite"
      }} /><span>Iniciando FLOWSTUDIO...</span></div></div>}><_Component16 /></ReactLib.Suspense></Mr>;
class _Component18 extends ReactLib.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: !1,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: !0,
      error: error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("[FlowTube Crash]:", error, errorInfo);
  }
  render() {
    var error4;
    var error5;
    if (this.state.hasError) {
      return <div style={{
        minHeight: "100vh",
        background: "#090a0d",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        fontFamily: "'Inter', sans-serif"
      }}><h2 style={{
          color: "#ef4444",
          marginBottom: 8,
          fontSize: 20
        }}>⚠️ Ocurrió un error al cargar la vista</h2><p style={{
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 16
        }}>Se ha producido un error inesperado en la interfaz. Puedes reiniciar la vista aquí:</p><pre style={{
          background: "#161922",
          border: "1px solid #282d3d",
          padding: 16,
          borderRadius: 8,
          color: "#f87171",
          maxWidth: 750,
          overflowX: "auto",
          fontSize: 12,
          marginBottom: 20
        }}>{((error4 = this.state.error) == null ? undefined : error4.stack) || ((error5 = this.state.error) == null ? undefined : error5.message) || String(this.state.error)}</pre><button onClick={() => {
          window.location.reload();
        }} style={{
          background: "linear-gradient(135deg, #4f7cff, #6f5cf4)",
          color: "#fff",
          border: "none",
          padding: "10px 24px",
          borderRadius: 8,
          fontWeight: 800,
          cursor: "pointer"
        }}>🔄 Recargar FLOWSTUDIO</button></div>;
    } else {
      return this.props.children;
    }
  }
}
ReactDOMClient.createRoot(document.getElementById("root")).render(<_Component18><_Component17 /></_Component18>);
export { na as D, ur as M, Da as a, Cn as b, Mn as c, uo as d, po as e, ra as f, Ee as g, wn as h, tt as i, Sn as j, co as l, dt as n, lo as r, Re as s, w as u };