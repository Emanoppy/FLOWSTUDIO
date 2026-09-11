const studioCandidates = ["http://127.0.0.1:4320", "http://127.0.0.1:4310"];

async function resolveStudioUrl() {
  for (const url of studioCandidates) {
    try {
      const response = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (response.ok) return url;
    } catch (_) {}
  }
  return studioCandidates[0];
}

document.getElementById("studio").addEventListener("click", async () => {
  chrome.runtime.sendMessage({ type: "ENABLE_STUDIO" }, async () => {
    chrome.tabs.create({ url: await resolveStudioUrl() });
  });
});
document.getElementById("flow").addEventListener("click", () => chrome.tabs.create({ url: "https://flow.google.com" }));
