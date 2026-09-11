window.addEventListener("message", event => {
  const message = event.data;
  if (event.source !== window || message?.source !== "flowtube-web" || !message.requestId) return;
  if (!["FLOW_CHECK", "FLOW_GENERATE_IMAGE", "FLOW_TRANSCRIBE", "FLOW_GENERATE_TEXT", "FLOW_VIDEO_START", "FLOW_VIDEO_STATUS", "FLOW_IMPORT_MEDIA", "FLOW_UPLOAD_INGREDIENT", "FLOW_LIST_PROJECT_MEDIA"].includes(message.type)) {
    window.postMessage({ source: "flowtube-extension", requestId: message.requestId, ok: false, error: "Tipo de solicitud no soportado por la extension." }, "*");
    return;
  }
  chrome.runtime.sendMessage({ type: message.type, payload: message.payload }, response => {
    const error = chrome.runtime.lastError?.message;
    window.postMessage({
      source: "flowtube-extension",
      requestId: message.requestId,
      ok: Boolean(response?.ok) && !error,
      data: response?.data,
      error: error || response?.error
    }, "*");
  });
});
