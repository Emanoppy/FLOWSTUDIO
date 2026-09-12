// Ejecuta JS arbitrario dentro de la ventana de la propia app FLOWSTUDIO (127.0.0.1:4322)
// via Chrome DevTools Protocol, para probar/automatizar la UI sin clicks manuales.
// Requiere que Electron haya arrancado con --remote-debugging-port=9222.
// Uso: node scripts/cdp-app.mjs "<expresion JS, puede ser async>" [timeoutMs]
import WebSocket from "ws";

const listRes = await fetch("http://127.0.0.1:9222/json/list");
const targets = await listRes.json();
const appTarget = targets.find(t => t.url.startsWith("http://127.0.0.1:4322"));
if (!appTarget) {
  console.error("No encontre la ventana de FLOWSTUDIO.");
  process.exit(1);
}

const ws = new WebSocket(appTarget.webSocketDebuggerUrl);
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
if (!expression) {
  console.error("Uso: node cdp-app.mjs \"<expresion js>\"");
  process.exit(1);
}

ws.on("open", async () => {
  try {
    await send("Runtime.enable", {});
    const result = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
      timeout: Number(process.argv[3]) || 20000
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
