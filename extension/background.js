const RECAPTCHA_SITE_KEY = "6LdsFiUsAAAAAIjVDZcuLhaHiDn5nnHVXVRQGeMV";
const VIDEO_START_ENDPOINT = "https://aisandbox-pa.googleapis.com/v1/video:batchAsyncGenerateVideoStartImage";
const VIDEO_STATUS_ENDPOINT = "https://aisandbox-pa.googleapis.com/v1/video:batchCheckAsyncVideoGenerationStatus";
const GENERATE_CONTENT_ENDPOINT = "https://aisandbox-pa.googleapis.com/v1/flow:generateContent";
const VIDEO_APPLET = {
  appletId: "67e2d74d-70da-4f38-91cb-d2c4f99d0674",
  appletVersionId: "30f64f31-233e-4861-bb86-14c6b8575413"
};
const TEXT_APPLET = {
  appletId: "e912bf73-f522-4265-a157-fc8603d04d44",
  appletVersionId: "f3142ebb-913f-47be-b852-4ce092e41053"
};
const IMAGE_MODELS = {
  "nano-banana-2-lite": "HARBOR_SEAL",
  "nano-banana-2": "NARWHAL",
  "nano-banana-pro": "GEM_PIX_2",
  "google-nano-banana": "HARBOR_SEAL",
  "HARBOR_SEAL": "HARBOR_SEAL",
  "NARWHAL": "NARWHAL",
  "GEM_PIX_2": "GEM_PIX_2"
};
const VIDEO_MODELS = {
  "veo": "veo_3_1_i2v_lite",
  "veo-3.1-lite": "veo_3_1_i2v_lite",
  "veo3_lite": "veo_3_1_i2v_lite",
  "veo3_fast": "veo_3_1_i2v_lite",
  "veo3": "veo_3_1_i2v_lite",
  "gemini-omni-video": "omni",
  "omni": "omni"
};
const OMNI_DURATIONS = new Set([4, 6, 8, 10]);
const LOCAL_IMPORT_ENDPOINTS = [
  "http://127.0.0.1:4322/api/import",
  "http://127.0.0.1:4312/api/import"
];
const ACTIVE_VIDEO_STATUSES = new Set([
  "MEDIA_GENERATION_STATUS_SCHEDULED",
  "MEDIA_GENERATION_STATUS_PENDING",
  "MEDIA_GENERATION_STATUS_ACTIVE"
]);

const authorizeStudioSession = () => chrome.storage.local.set({ enabledUntil: Date.now() + 8 * 60 * 60 * 1000 });
chrome.runtime.onInstalled.addListener(authorizeStudioSession);
chrome.runtime.onStartup.addListener(authorizeStudioSession);

let roundRobinIndex = 0;

async function flowTabs() {
  const tabs = await chrome.tabs.query({});
  return tabs
    .filter(tab => {
      const u = tab.url || "";
      return (
        /^https:\/\/flow\.google\.com/i.test(u) ||
        /^https:\/\/flow\.google/i.test(u) ||
        /^https:\/\/labs\.google\/(?:[a-z0-9-]+\/)?(?:tools\/flow|fx)/i.test(u)
      );
    })
    .sort((a, b) => Number(b.active) - Number(a.active) || (b.lastAccessed || 0) - (a.lastAccessed || 0));
}

async function pageState(tabId) {
  const execution = await chrome.scripting.executeScript({
    target: { tabId },
    world: "MAIN",
    func: () => {
      let projectId = location.href.match(/project\/([a-f0-9-]+)/i)?.[1] || null;
      if (!projectId) {
        try {
          const pMatch = document.documentElement.innerHTML.match(/projects?\/([a-f0-9-]{16,})/i);
          if (pMatch) projectId = pMatch[1];
        } catch (_) {}
      }
      return {
        projectId,
        hasRecaptcha: Boolean(window.grecaptcha?.enterprise || window.grecaptcha)
      };
    }
  });
  return execution?.[0]?.result || {};
}

async function getAllFlowContexts() {
  const tabs = await flowTabs();
  const contexts = [];
  for (const tab of tabs) {
    const state = await pageState(tab.id).catch(() => ({}));
    if (state.projectId && state.hasRecaptcha) {
      contexts.push({ tab, state });
    }
  }
  return contexts;
}

async function flowContext() {
  const contexts = await getAllFlowContexts();
  if (!contexts.length) return null;
  const chosen = contexts[roundRobinIndex % contexts.length];
  roundRobinIndex++;
  return chosen;
}

async function flowRequest(tabId, endpoint, payload, recaptchaAction = null, httpMethod = "POST") {
  const execution = await chrome.scripting.executeScript({
    target: { tabId },
    world: "MAIN",
    func: async (url, requestBody, action, siteKey, method) => {
      try {
        const sessionResponse = await fetch("/fx/api/auth/session", { credentials: "include" });
        const session = await sessionResponse.json();
        if (!session?.access_token) return { ok: false, error: "Inicia sesion en Google Flow." };
        if (action && method === "POST") {
          const enterprise = window.grecaptcha?.enterprise;
          if (enterprise) {
            if (typeof enterprise.ready === "function") await new Promise(resolve => enterprise.ready(resolve));
            try {
              const token = await enterprise.execute(siteKey, { action });
              if (token) {
                if (requestBody.clientContext?.recaptchaContext) requestBody.clientContext.recaptchaContext.token = token;
                if (requestBody.recaptchaContext) requestBody.recaptchaContext.token = token;
                for (const request of requestBody.requests || []) {
                  if (request.clientContext?.recaptchaContext) request.clientContext.recaptchaContext.token = token;
                }
              }
            } catch (err) {
              console.warn("reCAPTCHA execute failed in tab:", err);
            }
          }
        }
        const fetchOptions = {
          method,
          headers: { Authorization: `Bearer ${session.access_token}` }
        };
        if (method === "POST") {
          fetchOptions.headers["Content-Type"] = "text/plain;charset=UTF-8";
          fetchOptions.body = JSON.stringify(requestBody);
        }
        const response = await fetch(url, fetchOptions);
        const text = await response.text();
        let data;
        try { data = JSON.parse(text); } catch (_) { data = text; }
        if (!response.ok) return { ok: false, error: data?.error?.message || `Flow HTTP ${response.status}: ${String(text).slice(0, 300)}` };
        return { ok: true, data };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },
    args: [endpoint, structuredClone(payload || {}), recaptchaAction, RECAPTCHA_SITE_KEY, httpMethod]
  });
  const result = execution?.[0]?.result;
  if (!result?.ok) throw new Error(result?.error || "La pestaña Flow no respondio.");
  return result.data;
}

async function listProjectMedia() {
  const contextState = await flowContext();
  if (!contextState) throw new Error("Abre un proyecto de Google Flow y espera a que cargue.");
  const { tab, state } = contextState;
  const endpoint = `https://aisandbox-pa.googleapis.com/v1/projects/${state.projectId}/flowMedia`;
  try {
    const data = await flowRequest(tab.id, endpoint, {}, null, "GET");
    const items = (data?.media || []).map(m => {
      const isVideo = Boolean(m?.video?.generatedVideo || m?.video);
      const isImage = Boolean(m?.image?.generatedImage || m?.image);
      const url = m?.image?.generatedImage?.fifeUrl || m?.image?.generatedImage?.url || m?.video?.generatedVideo?.fifeUrl || m?.video?.generatedVideo?.url || "";
      const rawPrompt = m?.metadata?.sourcePrompt || m?.sourcePrompt || m?.prompt || "";
      const prompt = typeof rawPrompt === "string" ? rawPrompt : (rawPrompt?.parts?.[0]?.text || "");
      return {
        id: m?.name || m?.mediaId || crypto.randomUUID(),
        name: m?.name || "",
        type: isVideo ? "video" : (isImage ? "image" : "unknown"),
        url,
        prompt,
        createdAt: m?.createTime || m?.mediaMetadata?.createTime || null,
        duration: isVideo ? (m?.video?.duration || 8) : null
      };
    }).filter(item => item.url);
    return { ok: true, media: items };
  } catch (err) {
    return { ok: false, error: err.message, media: [] };
  }
}

function withTimeout(fn, ms = 25000) {
  return Promise.race([
    fn(),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Tiempo de espera agotado.")), ms))
  ]);
}

function isRecaptchaError(error) {
  return /recaptcha|reCAPTCHA|evaluation failed|rate limit|429|RESOURCE_EXHAUSTED|quota|too many|busy|temporar|overloaded/i.test(error?.message || "");
}

async function withRecaptchaRetry(fn, attempts = 4) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (!isRecaptchaError(error) || attempt + 1 >= attempts) throw error;
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    }
  }
  throw lastError;
}

async function importIntoRunningStudio(body, contentType) {
  let lastError;
  for (const endpoint of LOCAL_IMPORT_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": contentType },
        body
      });
      const result = await response.json();
      if (response.ok && result?.url) return result;
      lastError = new Error(result?.error || `Importacion local rechazada por ${endpoint}.`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("No hay un servidor local de FlowTube disponible.");
}

async function importMedia(url, fallbackMime) {
  const source = new URL(url);
  if (source.protocol !== "https:" || !(
    source.hostname === "flow.google.com" ||
    source.hostname === "flow.google" ||
    source.hostname.endsWith(".flow.google.com") ||
    source.hostname === "labs.google" ||
    source.hostname === "flow-content.google" ||
    source.hostname.endsWith(".googleusercontent.com") ||
    source.hostname.endsWith(".google.com")
  )) throw new Error("Host multimedia no permitido.");
  try {
    const response = await fetch(url, { redirect: "follow" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const declared = Number(response.headers.get("content-length") || 0);
    if (declared > 80 * 1024 * 1024) throw new Error("El medio supera el limite local de 80 MB.");
    const blob = await response.blob();
    const contentType = response.headers.get("content-type") || blob.type || fallbackMime;
    return await importIntoRunningStudio(blob, contentType);
  } catch (workerError) {
    const contextState = await flowContext();
    if (!contextState) throw workerError;
    const { tab } = contextState;
    const execution = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: "MAIN",
      func: async (mediaUrl, fallback, importEndpoints) => {
        try {
          const resp = await fetch(mediaUrl, { credentials: "include" });
          if (!resp.ok) return { ok: false, error: `Flow media HTTP ${resp.status}` };
          const blob = await resp.blob();
          let lastError = "No hay un servidor local de FlowTube disponible.";
          for (const endpoint of importEndpoints) {
            try {
              const imported = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": blob.type || fallback },
                body: blob
              });
              const result = await imported.json();
              if (imported.ok && result?.url) return { ok: true, data: result };
              lastError = result?.error || `Importacion local rechazada por ${endpoint}.`;
            } catch (error) {
              lastError = error.message;
            }
          }
          return { ok: false, error: lastError };
        } catch (error) {
          return { ok: false, error: error.message };
        }
      },
      args: [url, fallbackMime, LOCAL_IMPORT_ENDPOINTS]
    });
    const pageResult = execution?.[0]?.result;
    if (!pageResult?.ok) throw new Error(`No se pudo copiar desde Flow: ${pageResult?.error || workerError.message}`);
    return pageResult.data;
  }
}

async function generateImage(payload) {
  if (!payload.prompt || String(payload.prompt).length > 12000) throw new Error("El prompt debe tener entre 1 y 12000 caracteres.");
  const allContexts = await getAllFlowContexts();
  if (!allContexts.length) throw new Error("Abre al menos un proyecto de Google Flow y espera a que cargue.");

  // Pick starting index via Round-Robin across all accounts
  const startIndex = roundRobinIndex % allContexts.length;
  roundRobinIndex++;

  let lastError = null;

  // Try across available Flow accounts/tabs if one is throttled or fails
  for (let offset = 0; offset < allContexts.length; offset++) {
    const currentContext = allContexts[(startIndex + offset) % allContexts.length];
    const { tab, state } = currentContext;

    try {
      const endpoint = `https://aisandbox-pa.googleapis.com/v1/projects/${state.projectId}/flowMedia:batchGenerateImages`;
      const context = {
        projectId: state.projectId,
        tool: "PINHOLE",
        sessionId: `flowtube-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        recaptchaContext: { token: "PLACEHOLDER", applicationType: "RECAPTCHA_APPLICATION_TYPE_WEB" }
      };
      const isPortrait = payload.format === "short" || payload.aspectRatio === "9:16" || payload.aspectRatio === "portrait" || payload.aspectRatio === "IMAGE_ASPECT_RATIO_PORTRAIT";
      const request = {
        clientContext: context,
        imageAspectRatio: isPortrait ? "IMAGE_ASPECT_RATIO_PORTRAIT" : "IMAGE_ASPECT_RATIO_LANDSCAPE",
        imageInputs: [],
        imageModelName: IMAGE_MODELS[payload.model] || "NARWHAL",
        seed: Math.floor(Math.random() * 1000000),
        structuredPrompt: { parts: [{ text: payload.prompt }] }
      };
      let referenceUsed = false;
      const refList = Array.isArray(payload.referenceImages) && payload.referenceImages.length > 0
        ? payload.referenceImages.slice(0, 3)
        : (payload.referenceImage?.data ? [payload.referenceImage] : []);

      const imageInputs = [];
      for (const refItem of refList) {
        let fId = refItem.flowMediaId || null;
        if (!fId && refItem.data) {
          try {
            const uploaded = await uploadReferenceImage(tab, state, refItem);
            fId = uploaded?.mediaId || uploaded?.name || null;
          } catch (err) {
            console.warn("[FLOWTUBE] Subida de referencia falló en pestaña:", err.message);
          }
        }
        if (fId) {
          imageInputs.push({ imageInputType: "IMAGE_INPUT_TYPE_REFERENCE", name: fId });
        }
      }

      if (imageInputs.length === 0 && payload.referenceMediaId) {
        imageInputs.push({ imageInputType: "IMAGE_INPUT_TYPE_REFERENCE", name: payload.referenceMediaId });
      }

      if (imageInputs.length > 0) {
        request.imageInputs = imageInputs;
        request.imageModelName = "NARWHAL";
        referenceUsed = true;
      }

      const response = await withRecaptchaRetry(() => flowRequest(tab.id, endpoint, {
        clientContext: context,
        mediaGenerationContext: { batchId: crypto.randomUUID() },
        useNewMedia: true,
        requests: [request]
      }, "IMAGE_GENERATION"), allContexts.length > 1 ? 2 : 4);

      const media = response?.media?.find(item => item?.name || item?.mediaId);
      const imageUrl = response?.media?.find(item => item?.image?.generatedImage?.fifeUrl)?.image?.generatedImage?.fifeUrl;
      const mediaId = response?.workflows?.find(item => item?.metadata?.primaryMediaId)?.metadata?.primaryMediaId || media?.name || media?.mediaId;
      if (!mediaId || !imageUrl) throw new Error("Flow no devolvió una imagen utilizable.");

      // Automatic 2K upscale (matching AUTO FLOW NANO high-res engine)
      let finalImageUrl = imageUrl;
      let is2k = false;
      try {
        const encoded2k = await upsampleImage2K(tab, state, mediaId);
        if (encoded2k) {
          finalImageUrl = `data:image/png;base64,${encoded2k}`;
          is2k = true;
        }
      } catch (_) {}

      return { mediaId, imageUrl: finalImageUrl, portable: false, referenceUsed, referenceMediaId: payload.referenceMediaId || null, is2k };
    } catch (err) {
      lastError = err;
      console.warn(`[FLOWTUBE] Error en cuenta/pestaña (Tab ID ${tab.id}):`, err.message);
      if (allContexts.length > 1 && (isRecaptchaError(err) || /quota|429|throttled|rate limit|busy/i.test(err.message))) {
        console.log(`[FLOWTUBE] 🔄 Conmutando automáticamente a otra cuenta de Google Flow activa (${offset + 1}/${allContexts.length})...`);
        continue;
      }
      throw err;
    }
  }
  throw lastError || new Error("No se pudo generar la imagen en ninguna de las cuentas de Flow conectadas.");
}

async function upsampleImage2K(tab, state, mediaId) {
  const endpoint = "https://aisandbox-pa.googleapis.com/v1/flow/upsampleImage";
  try {
    for (let attempt = 0; attempt <= 2; attempt++) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * Math.pow(1.5, attempt)));

      const execution = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",
        func: async (url, mId, projId, siteKey) => {
          try {
            const sessionResp = await fetch("/fx/api/auth/session", { credentials: "include" });
            const session = await sessionResp.json();
            if (!session?.access_token) return { error: "No auth token" };

            try { localStorage.removeItem("_grecaptcha"); } catch (_) {}
            const enterprise = window.grecaptcha?.enterprise;
            if (!enterprise) return { error: "No grecaptcha" };
            if (typeof enterprise.ready === "function") await new Promise(res => enterprise.ready(res));
            const recaptchaToken = await enterprise.execute(siteKey, { action: "IMAGE_GENERATION" });

            const body = JSON.stringify({
              mediaId: mId,
              targetResolution: "UPSAMPLE_IMAGE_RESOLUTION_2K",
              clientContext: {
                projectId: projId,
                tool: "PINHOLE",
                recaptchaContext: {
                  applicationType: "RECAPTCHA_APPLICATION_TYPE_WEB",
                  token: recaptchaToken
                },
                sessionId: `flowtube-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                userPaygateTier: "PAYGATE_TIER_NOT_PAID"
              }
            });

            const resp = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "text/plain;charset=UTF-8",
                Authorization: `Bearer ${session.access_token}`
              },
              body
            });

            if (!resp.ok) {
              const errTxt = await resp.text();
              return { error: `HTTP ${resp.status}: ${errTxt.slice(0, 300)}`, status: resp.status };
            }

            const data = await resp.json();
            return { success: true, encodedImage: data.encodedImage };
          } catch (e) {
            return { error: e.message };
          }
        },
        args: [endpoint, mediaId, state.projectId, RECAPTCHA_SITE_KEY]
      }).catch(() => null);

      const result = execution?.[0]?.result;
      if (result?.success && result.encodedImage) {
        return result.encodedImage;
      }
      if (result?.status === 429) break;
    }
  } catch (err) {
    console.warn("[FLOWTUBE] 2K Upsample skipped:", err.message);
  }
  return null;
}

const referenceCache = new Map();
const activeUploads = new Map();

async function uploadReferenceImage(tab, state, reference) {
  if (!reference?.data) return null;
  const cleanBase64 = String(reference.data).replace(/^data:image\/[a-z]+;base64,/, "").trim();
  const mimeType = reference.mimeType || "image/jpeg";
  const fileName = reference.name || `character_ref_${Date.now()}.jpg`;
  const endpoint = "https://aisandbox-pa.googleapis.com/v1/flow/uploadImage";

  const cacheKey = `${state.projectId}-${cleanBase64.length}-${cleanBase64.slice(0, 40)}`;
  if (referenceCache.has(cacheKey)) {
    const cached = referenceCache.get(cacheKey);
    return { mediaId: cached, name: cached };
  }

  if (activeUploads.has(cacheKey)) {
    const mediaName = await activeUploads.get(cacheKey);
    return mediaName ? { mediaId: mediaName, name: mediaName } : null;
  }

  const uploadJob = (async () => {
    for (let attempt = 0; attempt <= 3; attempt++) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * Math.pow(1.5, attempt) + 500 * Math.random()));

      const tokenExec = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",
        func: async () => {
          try {
            const r = await fetch("/fx/api/auth/session", { credentials: "include" });
            const s = await r.json();
            return s?.access_token || null;
          } catch (_) { return null; }
        }
      }).catch(() => null);

      const token = tokenExec?.[0]?.result;
      if (!token) continue;

      const bodyStr = JSON.stringify({
        image: {
          bytesBase64Encoded: cleanBase64,
          mimeType,
          name: fileName
        },
        clientContext: {
          projectId: state.projectId,
          tool: "PINHOLE",
          sessionId: `flowtube-${Date.now()}`
        }
      });

      const uploadExec = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",
        func: async (url, body, authToken) => {
          try {
            const resp = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "text/plain;charset=UTF-8", Authorization: "Bearer " + authToken },
              body
            });
            const txt = await resp.text();
            if (!resp.ok) {
              return { error: "HTTP " + resp.status + ": " + txt.substring(0, 300), status: resp.status };
            }
            try { return { success: true, data: JSON.parse(txt) }; }
            catch (_) { return { success: true, data: txt }; }
          } catch (e) {
            return { error: e.message };
          }
        },
        args: [endpoint, bodyStr, token]
      }).catch(err => ({ error: err.message }));

      const result = uploadExec?.[0]?.result;
      if (result?.success && result?.data) {
        const mediaName = result.data?.media?.name || result.data?.name || result.data?.mediaId || null;
        if (mediaName) {
          referenceCache.set(cacheKey, mediaName);
          return mediaName;
        }
      }
      if (result?.status === 400 || result?.status === 403 || result?.status === 404) break;
    }
    return null;
  })();

  activeUploads.set(cacheKey, uploadJob);
  try {
    const mediaName = await uploadJob;
    return mediaName ? { mediaId: mediaName, name: mediaName } : null;
  } finally {
    activeUploads.delete(cacheKey);
  }
}

async function startVideo(payload) {
  const contextState = await flowContext();
  if (!contextState) throw new Error("Abre un proyecto de Google Flow y espera a que cargue.");
  const { tab, state } = contextState;
  const requestedDuration = Number(payload.duration) || 8;
  const isOmni = payload.model === "omni";
  const duration = isOmni ? (OMNI_DURATIONS.has(requestedDuration) ? requestedDuration : 8) : 8;
  const videoModelKey = isOmni ? "omni" : "veo";
  const videoModelParam = isOmni ? undefined : (VIDEO_MODELS[payload.model] || "veo_3_1_i2v_lite");
  const request = {
    clientContext: {
      projectId: state.projectId,
      tool: "PINHOLE",
      sessionId: `flowtube-${Date.now()}`,
      recaptchaContext: { token: "PLACEHOLDER", applicationType: "RECAPTCHA_APPLICATION_TYPE_WEB" }
    },
    aspectRatio: (payload.format === "short" || payload.aspectRatio === "9:16" || payload.aspectRatio === "portrait" || payload.aspectRatio === "VIDEO_ASPECT_RATIO_PORTRAIT") ? "VIDEO_ASPECT_RATIO_PORTRAIT" : "VIDEO_ASPECT_RATIO_LANDSCAPE",
    durationSeconds: duration,
    prompt: { text: payload.prompt || "" },
    startImage: { mediaId: payload.mediaId },
    ...(videoModelParam ? { videoModel: videoModelParam } : {})
  };
  const body = {
    clientContext: {
      projectId: state.projectId,
      tool: "PINHOLE",
      recaptchaContext: { token: "PLACEHOLDER", applicationType: "RECAPTCHA_APPLICATION_TYPE_WEB" }
    },
    requests: [request]
  };
  const response = await withRecaptchaRetry(() => flowRequest(tab.id, VIDEO_START_ENDPOINT, body, "VIDEO_GENERATION"));
  const mediaName = response?.media?.[0]?.name;
  if (!mediaName) throw new Error("Flow no devolvio un identificador de video.");
  return { mediaName, projectId: state.projectId };
}

async function videoStatus(payload) {
  const contextState = await flowContext();
  if (!contextState) throw new Error("Abre un proyecto de Google Flow y espera a que cargue.");
  const { tab } = contextState;
  const statusResponse = await flowRequest(tab.id, VIDEO_STATUS_ENDPOINT, { media: [{ name: payload.mediaName, projectId: payload.projectId }] });
  const media = statusResponse?.media?.find(item => item?.name === payload.mediaName) || statusResponse?.media?.[0];
  const status = media?.mediaMetadata?.mediaStatus?.mediaGenerationStatus;
  if (status === "MEDIA_GENERATION_STATUS_SUCCESSFUL" && media?.video?.generatedVideo) {
    const redirectUrl = media.video.generatedVideo.fifeUrl || media.video.generatedVideo.url;
    return { done: true, status, mediaName: media.name, videoUrl: redirectUrl };
  }
  if (ACTIVE_VIDEO_STATUSES.has(status)) return { done: false, status };
  const reason = media?.mediaMetadata?.mediaStatus?.error?.message || media?.mediaMetadata?.mediaStatus?.failureReasons?.[0]?.message;
  return { done: false, failed: true, status, error: reason || `Flow termino el video con estado ${status || "desconocido"}.` };
}

async function generateText(payload) {
  if (!Array.isArray(payload.parts) || !payload.parts.length) throw new Error("Falta el contenido para generar texto.");
  const allContexts = await getAllFlowContexts();
  if (!allContexts.length) throw new Error("Abre un proyecto de Google Flow y espera a que cargue.");

  const startIndex = roundRobinIndex % allContexts.length;
  roundRobinIndex++;

  let lastError = null;
  for (let offset = 0; offset < allContexts.length; offset++) {
    const { tab, state } = allContexts[(startIndex + offset) % allContexts.length];
    const buildBody = model => ({
      model,
      contents: [{ role: "user", parts: payload.parts }],
      thinkingConfig: { thinkingLevel: payload.thinkingLevel || "MEDIUM" },
      requestContext: { flowSdkInfo: TEXT_APPLET },
      recaptchaContext: { token: "PLACEHOLDER", applicationType: "RECAPTCHA_APPLICATION_TYPE_WEB" }
    });
    const extract = data => (data?.candidates?.[0]?.content?.parts || []).map(part => part.text || "").filter(Boolean).join("\n").trim();
    const requested = payload.model || "gemini-3-flash-preview";
    const run = model => withRecaptchaRetry(() => flowRequest(tab.id, GENERATE_CONTENT_ENDPOINT, buildBody(model), "TEXT_GENERATION"), allContexts.length > 1 ? 2 : 4).then(extract);
    try {
      const text = await run(requested);
      if (!text) throw new Error("Flow no devolvio texto utilizable.");
      return { text };
    } catch (error) {
      if (requested !== "gemini-3-flash-preview" && /model|not found|not supported|not allowed|invalid|unavailable/i.test(error.message)) {
        try {
          const text = await run("gemini-3-flash-preview");
          if (text) return { text };
        } catch (_) {}
      }
      lastError = error;
      if (allContexts.length > 1) continue;
      throw error;
    }
  }
  throw lastError || new Error("Error generando texto en las cuentas de Flow.");
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    const senderUrl = sender.tab?.url || sender.url || sender.origin || "";
    const isLocal = /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/i.test(senderUrl);
    const isSelf = sender.id === chrome.runtime.id;
    if (senderUrl && !isLocal && !isSelf) {
      throw new Error(`Origen no autorizado: ${senderUrl}`);
    }
    if (message.type === "FLOW_CHECK") {
      const contexts = await getAllFlowContexts();
      const count = contexts.length;
      return {
        connected: count > 0,
        accountsCount: count,
        label: count > 1 ? `⚡ ${count} Cuentas Flow Conectadas (${count}x Balanceo)` : (count === 1 ? "Google Flow Conectado" : "Esperando Google Flow...")
      };
    }
    if (message.type === "FLOW_UPLOAD_INGREDIENT") {
      const contextState = await flowContext();
      if (!contextState) throw new Error("Abre un proyecto de Google Flow y espera a que cargue.");
      const { tab, state } = contextState;
      return uploadReferenceImage(tab, state, message.payload || {});
    }
    if (message.type === "FLOW_GENERATE_IMAGE") return generateImage(message.payload || {});
    if (message.type === "FLOW_TRANSCRIBE" || message.type === "FLOW_GENERATE_TEXT") return generateText(message.payload || {});
    if (message.type === "FLOW_VIDEO_START") return startVideo(message.payload || {});
    if (message.type === "FLOW_VIDEO_STATUS") return videoStatus(message.payload || {});
    if (message.type === "FLOW_LIST_PROJECT_MEDIA") return listProjectMedia();
    if (message.type === "FLOW_IMPORT_MEDIA") return importMedia(message.payload?.url, message.payload?.mime || "application/octet-stream");
    throw new Error("Solicitud FlowTube desconocida.");
  })().then(data => sendResponse({ ok: true, data })).catch(error => sendResponse({ ok: false, error: error.message }));
  return true;
});
