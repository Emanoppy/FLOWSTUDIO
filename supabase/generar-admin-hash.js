// Uso: node generar-admin-hash.js "tu-clave-secreta-de-admin"
// Imprime el hash que hay que poner en FLOWSTUDIO_ADMIN_KEY_HASH.
// La clave en texto plano NUNCA se guarda ni se envia a ningun lado, solo se hashea localmente.
import crypto from "node:crypto";

const key = process.argv[2];
if (!key) {
  console.error("Uso: node generar-admin-hash.js \"tu-clave-secreta\"");
  process.exit(1);
}

const hash = crypto
  .createHash("sha256")
  .update(String(key).trim().toLowerCase() + "::flowstudio-admin-v1")
  .digest("hex");

console.log("\nFLOWSTUDIO_ADMIN_KEY_HASH=" + hash + "\n");
