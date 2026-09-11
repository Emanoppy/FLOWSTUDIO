import os from "node:os";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
let cachedHWID = null;
export function getMachineHWID() {
  if (cachedHWID) {
    return cachedHWID;
  }
  let hwidParts = [];
  hwidParts.push(os.hostname());
  hwidParts.push(os.platform());
  hwidParts.push(os.arch());
  hwidParts.push(String(os.cpus()?.length || 4));
  if (os.platform() === "win32") {
    try {
      const wmicOutput = execSync("wmic csproduct get uuid", {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
        timeout: 2000
      });
      const uuidLines = wmicOutput.split("\n").map(line => line.trim()).filter(line => line && !line.toLowerCase().includes("uuid"));
      if (uuidLines.length > 0 && uuidLines[0].length > 5) {
        hwidParts.push(uuidLines[0]);
      }
    } catch (wmicError) {
      try {
        const psOutput = execSync("powershell -Command \"(Get-CimInstance Win32_ComputerSystemProduct).UUID\"", {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
          timeout: 2500
        });
        const uuidTrimmed = psOutput.trim();
        if (uuidTrimmed && uuidTrimmed.length > 5) {
          hwidParts.push(uuidTrimmed);
        }
      } catch (psError) {}
    }
  } else if (os.platform() === "darwin") {
    try {
      const ioregOutput = execSync("ioreg -rd1 -c IOPlatformExpertDevice | grep IOPlatformUUID", {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
        timeout: 2000
      });
      const uuidMatch = ioregOutput.match(/"IOPlatformUUID"\s*=\s*"([^"]+)"/i);
      if (uuidMatch && uuidMatch[1]) {
        hwidParts.push(uuidMatch[1].trim());
      }
    } catch (ioregError) {}
  }
  try {
    const netInterfaces = os.networkInterfaces();
    for (const interfaceName of Object.keys(netInterfaces)) {
      for (const iface of netInterfaces[interfaceName]) {
        if (!iface.internal && iface.mac && iface.mac !== "00:00:00:00:00:00") {
          hwidParts.push(iface.mac);
          break;
        }
      }
    }
  } catch (netError) {}
  const hwidHash = crypto.createHash("sha256").update(hwidParts.join("::")).digest("hex").toUpperCase();
  cachedHWID = "FT-" + hwidHash.slice(0, 4) + "-" + hwidHash.slice(4, 8) + "-" + hwidHash.slice(8, 12) + "-" + hwidHash.slice(12, 16);
  return cachedHWID;
}
