// Igual que cdp-app.mjs, pero apunta a la ventana oculta de Google Flow (flow.google.com)
// en vez de a la propia app — util para inspeccionar el DOM real de Flow (selectores,
// botones, paneles de ajustes) cuando haya que extender la automatizacion en
// electron/main.cjs (generateImageViaFlowUI / generateVideoViaFlowUI).
// Uso: node scripts/cdp-flow.mjs "<expresion JS, puede ser async>" [timeoutMs]
import WebSocket from "ws";

const listRes = await fetch("http://127.0.0.1:9222/json/list");
const targets = await listRes.json();
const flowTarget = targets.find(t => t.url.includes("flow.google.com"));
if (!flowTarget) { console.error("No flow window"); process.exit(1); }

const ws = new WebSocket(flowTarget.webSocketDebuggerUrl);
let id = 1;
function send(method, params) {
  return new Promise((resolve, reject) => {
    const msgId = id++;
    const handler = (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.id === msgId) {
        ws.off("message", handler);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    };
    ws.on("message", handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}

const expression = process.argv[2];
ws.on("open", async () => {
  try {
    await send("Runtime.enable", {});
    const result = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
      timeout: Number(process.argv[3]) || 15000
    });
    if (result.exceptionDetails) {
      console.log("ERROR:", JSON.stringify(result.exceptionDetails).slice(0, 800));
    } else {
      console.log(result.result?.value !== undefined ? JSON.stringify(result.result.value) : JSON.stringify(result.result));
    }
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    ws.close();
    process.exit(0);
  }
});
ws.on("error", (err) => { console.error("WS error:", err.message); process.exit(1); });
