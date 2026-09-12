// Chequea si el compañero de equipo publicó una versión nueva en
// github.com/nmediastudio/flowstudio-releases, y si hay una, la descarga y la
// extrae (NUNCA la ejecuta) en updates-inbox/<version>/ para revisarla a mano.
//
// Uso:  node scripts/check-teammate-updates.js
//
// Qué hace, en orden:
//   1. Consulta el último release público en GitHub (API sin autenticación).
//   2. Si ya lo revisamos antes (updates-inbox/.last-seen-version), no hace nada.
//   3. Si es nuevo: descarga el instalador .exe, lo extrae con 7-Zip (NSIS -> app-64.7z),
//      extrae app.asar, y desofusca con webcrack los archivos de electron/ y server/
//      (el bundle del frontend en dist/ se deja sin tocar por su tamaño).
//   4. Deja todo listo en una carpeta aislada para que un humano (o Claude) lo revise
//      y decida qué portar a mano — este script nunca modifica el código en vivo.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

const REPO = "nmediastudio/flowstudio-releases";
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inboxDir = path.join(rootDir, "updates-inbox");
const stateFile = path.join(inboxDir, ".last-seen-version");
const SEVEN_ZIP = process.env.SEVEN_ZIP_PATH || "C:\\Program Files\\7-Zip\\7z.exe";

const FILES_TO_DEOBFUSCATE = [
  "electron/main.cjs",
  "electron/preload.cjs",
  "server/index.js",
  "server/supabase.js",
  "server/database.js",
  "server/hwid.js",
  "server/media.js",
  "server/whisper.js",
  "server/ffmpeg-renderer.js",
  "server/remotion-renderer.js",
  "server/capcut-exporter.js"
];

// Los datos del release vienen de GitHub (en principio confiable, pero es una
// fuente externa) y terminan formando parte de rutas de archivo y comandos —
// se sanitizan antes de usarlos en cualquier lado.
function sanitize(name) {
  return String(name).replace(/[^A-Za-z0-9._-]/g, "_");
}

function run7z(args) {
  const result = spawnSync(SEVEN_ZIP, args, { stdio: "inherit" });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error("7z " + args.join(" ") + " falló (código " + result.status + ")");
  }
}

function runNpx(args) {
  // npx en Windows es un .cmd, así que necesita shell — pero todos los argumentos
  // que le pasamos son rutas que construimos nosotros mismos con sanitize(), no
  // texto crudo de GitHub, así que no hay entrada externa sin filtrar en la línea
  // de comando.
  const result = spawnSync("npx", args, { stdio: "inherit", shell: true });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error("npx " + args.join(" ") + " falló (código " + result.status + ")");
  }
}

async function main() {
  fs.mkdirSync(inboxDir, { recursive: true });
  console.log("Consultando releases de " + REPO + "...");
  const releaseRes = await fetch("https://api.github.com/repos/" + REPO + "/releases/latest", {
    headers: { "User-Agent": "flowstudio-update-checker" }
  });
  if (!releaseRes.ok) {
    console.error("No se pudo consultar GitHub: HTTP " + releaseRes.status);
    process.exit(1);
  }
  const release = await releaseRes.json();
  const tag = sanitize(release.tag_name);
  const lastSeen = fs.existsSync(stateFile) ? fs.readFileSync(stateFile, "utf8").trim() : null;
  console.log("Última versión publicada por el equipo: " + tag);
  console.log("Última versión ya revisada acá: " + (lastSeen || "(ninguna todavía)"));
  if (tag === lastSeen) {
    console.log("No hay versión nueva. Nada que hacer.");
    return;
  }

  const asset = (release.assets || []).find(a => a.name.endsWith("_x64.exe"));
  if (!asset) {
    console.error("No encontré un instalador .exe de Windows en este release.");
    return;
  }
  const assetName = sanitize(asset.name);

  const versionDir = path.join(inboxDir, tag);
  fs.mkdirSync(versionDir, { recursive: true });
  const installerPath = path.join(versionDir, assetName);
  console.log("Descargando " + assetName + " (" + Math.round(asset.size / 1024 / 1024) + " MB)...");
  const fileRes = await fetch(asset.browser_download_url);
  await pipeline(Readable.fromWeb(fileRes.body), fs.createWriteStream(installerPath));
  console.log("Descargado en: " + installerPath);

  console.log("Extrayendo instalador NSIS con 7-Zip...");
  const extractDir = path.join(versionDir, "extracted");
  run7z(["x", installerPath, "-o" + extractDir, "-y"]);

  const innerArchive = path.join(extractDir, "$PLUGINSDIR", "app-64.7z");
  const payloadDir = path.join(versionDir, "app-payload");
  if (fs.existsSync(innerArchive)) {
    console.log("Extrayendo payload de la app...");
    run7z(["x", innerArchive, "-o" + payloadDir, "-y"]);
  } else {
    console.warn("No encontré app-64.7z dentro del instalador (¿cambió el formato de empaquetado?). Revisá " + extractDir);
  }

  const asarPath = path.join(payloadDir, "resources", "app.asar");
  const sourceDir = path.join(versionDir, "app-source");
  if (fs.existsSync(asarPath)) {
    console.log("Extrayendo app.asar...");
    runNpx(["--yes", "asar", "extract", asarPath, sourceDir]);
  } else {
    console.warn("No encontré app.asar — revisá manualmente " + payloadDir);
  }

  const deobfDir = path.join(versionDir, "deobfuscated");
  for (const rel of FILES_TO_DEOBFUSCATE) {
    const filePath = path.join(sourceDir, rel);
    if (!fs.existsSync(filePath)) continue;
    const outDir = path.join(deobfDir, rel.replace(/[\\/]/g, "_").replace(/\.(js|cjs)$/, ""));
    console.log("Desofuscando " + rel + "...");
    try {
      runNpx(["--yes", "webcrack", filePath, "-o", outDir]);
    } catch (err) {
      console.warn("No se pudo desofuscar " + rel + ": " + err.message);
    }
  }

  fs.writeFileSync(stateFile, tag);
  console.log("");
  console.log("Listo. Versión " + tag + " descargada, extraída y desofuscada en:");
  console.log("  " + versionDir);
  console.log("El bundle del frontend (buscar dentro de " + sourceDir + "\\dist\\assets\\*.js) NO se desofuscó");
  console.log("automáticamente por su tamaño — correr webcrack manual sobre esos archivos si hace falta.");
  console.log("");
  console.log("Recordatorio: esto es solo para LEER el código nuevo. Nunca ejecutar el .exe descargado,");
  console.log("y nunca copiar nada a server/ o electron/ sin revisar antes qué cambió de verdad.");
}

main().catch(err => {
  console.error("Error: " + err.message);
  process.exit(1);
});
