import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { supabaseEnabled, sbGetUsers, sbGetUserById, sbGetUserByHwid, sbGetUserByIdentifier, sbCreateUser, sbUpdateUser, sbDeleteUser, sbGetLicenses, sbGenerateLicenses, sbActivateLicense, sbRedeemLicense, sbDeleteLicense, sbUpdateLicense, sbLogAccess, sbGetAccessLogs, sbGetSystemStats } from "./supabase.js";
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = process.env.FLOWTUBE_DATA_ROOT ? path.resolve(process.env.FLOWTUBE_DATA_ROOT) : rootDir;
const dataDir = path.join(dataRoot, "runtime");
const dbPath = path.join(dataDir, "database.json");
export function hashPassword(password, salt = "flowtube_secure_salt_2026") {
  return crypto.createHash("sha256").update(password + "::" + salt).digest("hex");
}
let dbCache = null;
async function loadDatabase() {
  if (dbCache) {
    return dbCache;
  }
  try {
    await fs.mkdir(dataDir, {
      recursive: true
    });
    const fileContents = await fs.readFile(dbPath, "utf-8");
    dbCache = JSON.parse(fileContents);
  } catch (readError) {
    dbCache = {
      users: [],
      licenses: [],
      logs: [],
      settings: {
        registrationOpen: true,
        enforceHwid: true,
        version: "2.5.0"
      }
    };
  }
  if (dbCache.settings?.version !== "3.0.0") {
    dbCache.settings = {
      ...(dbCache.settings || {}),
      version: "3.0.0",
      enforceHwid: true,
      registrationOpen: false
    };
    dbCache.users = dbCache.users.filter(user => user.username !== "admin" || user.passwordHash !== hashPassword("admin123"));
    dbCache.licenses = dbCache.licenses.filter(license => !String(license.key || "").startsWith("FLOW-LIFETIME-PRO-") && !String(license.key || "").startsWith("FLOW-PRO-30DAYS-"));
    await saveDatabase();
  }
  return dbCache;
}
async function saveDatabase() {
  if (!dbCache) {
    return;
  }
  try {
    await fs.mkdir(dataDir, {
      recursive: true
    });
    const tempPath = dbPath + ".tmp." + Date.now();
    await fs.writeFile(tempPath, JSON.stringify(dbCache, null, 2), "utf-8");
    await fs.rename(tempPath, dbPath);
  } catch (saveError) {
    console.error("[Database] Error guardando base de datos:", saveError);
  }
}
export async function getUsers() {
  if (supabaseEnabled) {
    return sbGetUsers();
  }
  const db = await loadDatabase();
  const licenseByUserId = new Map();
  (db.licenses || []).forEach(license => {
    if (license.redeemedByUserId) {
      licenseByUserId.set(license.redeemedByUserId, license);
    }
  });
  return db.users.map(({
    passwordHash: _passwordHash,
    ...userRest
  }) => {
    const matchedLicense = licenseByUserId.get(userRest.id);
    return {
      ...userRest,
      licenseKey: matchedLicense ? matchedLicense.key : userRest.licenseKey || null,
      licenseName: matchedLicense ? matchedLicense.name || "" : userRest.notes || ""
    };
  });
}
export async function getUserById(userId) {
  if (supabaseEnabled) {
    return sbGetUserById(userId);
  }
  return db.users.find(user => user.id === userId) || null;
}
export async function getUserByHwid(hwid) {
  if (!hwid) {
    return null;
  }
  if (supabaseEnabled) {
    return sbGetUserByHwid(hwid);
  }
  const db = await loadDatabase();
  return db.users.find(user => user.hwid === hwid) || null;
}
export async function getUserByUsernameOrEmail(identifier) {
  if (!identifier) {
    return null;
  }
  if (supabaseEnabled) {
    return sbGetUserByIdentifier(identifier);
  }
  const db = await loadDatabase();
  const normalizedIdentifier = String(identifier).trim().toLowerCase();
  return db.users.find(user => user.username.toLowerCase() === normalizedIdentifier || user.email.toLowerCase() === normalizedIdentifier) || null;
}
export async function createUser({
  username: username,
  email: email,
  password: password,
  role = "user",
  licensePlan = "Pro Mensual",
  durationDays = 30,
  maxAccounts = 1,
  hwid = null
}) {
  if (supabaseEnabled) {
    return sbCreateUser({
      username: username,
      email: email,
      password: password,
      role: role,
      licensePlan: licensePlan,
      durationDays: durationDays,
      maxAccounts: maxAccounts,
      hwid: hwid
    });
  }
  const db = await loadDatabase();
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = (email || "").trim().toLowerCase();
  if (db.users.some(user => user.username.toLowerCase() === normalizedUsername)) {
    throw new Error("El nombre de usuario \"" + username + "\" ya está registrado.");
  }
  if (normalizedEmail && db.users.some(user => user.email && user.email.toLowerCase() === normalizedEmail)) {
    throw new Error("El correo \"" + email + "\" ya está registrado.");
  }
  const licenseExpiresAt = durationDays ? Date.now() + durationDays * 24 * 60 * 60 * 1000 : null;
  const newUser = {
    id: "usr_" + crypto.randomUUID().slice(0, 8),
    username: username.trim(),
    email: normalizedEmail || normalizedUsername + "@flowtube.app",
    passwordHash: hashPassword(password),
    role: role === "admin" ? "admin" : "user",
    status: "active",
    hwid: hwid || null,
    licensePlan: licensePlan,
    licenseExpiresAt: licenseExpiresAt,
    maxAccounts: Math.max(1, Math.min(20, Number(maxAccounts) || 1)),
    notes: "",
    createdAt: Date.now(),
    lastLoginAt: null,
    lastLoginIp: null
  };
  db.users.push(newUser);
  await saveDatabase();
  const {
    passwordHash: _passwordHash,
    ...userRest
  } = newUser;
  return userRest;
}
export async function updateUser(userId, updates) {
  if (supabaseEnabled) {
    return sbUpdateUser(userId, updates);
  }
  const db = await loadDatabase();
  const userIndex = db.users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    throw new Error("Usuario no encontrado.");
  }
  const existingUser = db.users[userIndex];
  if (updates.password) {
    updates.passwordHash = hashPassword(updates.password);
    delete updates.password;
  }
  if (Object.hasOwn(updates, "maxAccounts")) {
    updates.maxAccounts = Math.max(1, Math.min(20, Number(updates.maxAccounts) || 1));
  }
  db.users[userIndex] = {
    ...existingUser,
    ...updates
  };
  await saveDatabase();
  const {
    passwordHash: _passwordHash,
    ...userRest
  } = db.users[userIndex];
  return userRest;
}
export async function deleteUser(userId) {
  if (supabaseEnabled) {
    return sbDeleteUser(userId);
  }
  const db = await loadDatabase();
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }
  if (user.role === "admin" && db.users.filter(u => u.role === "admin").length <= 1) {
    throw new Error("No puedes eliminar el único usuario Administrador.");
  }
  db.users = db.users.filter(u => u.id !== userId);
  await saveDatabase();
  return true;
}
export async function getLicenses() {
  if (supabaseEnabled) {
    return sbGetLicenses();
  }
  const db = await loadDatabase();
  return db.licenses;
}
export async function generateLicenses({
  name = "",
  plan = "Pro",
  durationDays = 30,
  maxAccounts = 1,
  count = 1
}) {
  if (supabaseEnabled) {
    return sbGenerateLicenses({
      plan: plan,
      durationDays: durationDays,
      maxAccounts: maxAccounts,
      count: count
    });
  }
  const db = await loadDatabase();
  const generatedLicenses = [];
  for (let i = 0; i < Math.max(1, Math.min(50, count)); i++) {
    const keySegments = Array.from({
      length: 3
    }, () => crypto.randomBytes(3).toString("base64url").replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 4).padEnd(4, "X"));
    const key = keySegments.join("-");
    const newLicense = {
      key: key,
      name: String(name || "").trim().slice(0, 80),
      plan: plan,
      durationDays: durationDays === "" || durationDays == null ? 30 : Math.max(0, Number(durationDays) || 0),
      maxAccounts: Math.max(1, Math.min(20, Number(maxAccounts) || 1)),
      redeemedHwids: [],
      isRedeemed: false,
      redeemedByUserId: null,
      redeemedAt: null,
      createdAt: Date.now()
    };
    db.licenses.unshift(newLicense);
    generatedLicenses.push(newLicense);
  }
  await saveDatabase();
  return generatedLicenses;
}
export async function activateLicense(licenseKey, hwid) {
  if (supabaseEnabled) {
    return sbActivateLicense(licenseKey, hwid);
  }
  const db = await loadDatabase();
  const normalizedKey = String(licenseKey || "").trim().toUpperCase();
  const license = db.licenses.find(l => l.key.toUpperCase() === normalizedKey);
  if (!license) {
    throw new Error("La clave de licencia no existe o es inválida.");
  }
  const redeemedHwids = Array.from(new Set([...(license.redeemedHwids || []), ...(license.redeemedHwid ? [license.redeemedHwid] : [])].filter(Boolean)));
  if (redeemedHwids.includes(hwid) === false && redeemedHwids.length >= Math.max(1, Number(license.maxAccounts) || 1)) {
    throw new Error("Esta licencia alcanzó su límite de " + Math.max(1, Number(license.maxAccounts) || 1) + " PC(s).");
  }
  if (!hwid) {
    throw new Error("No se pudo identificar este equipo.");
  }
  let user = db.users.find(u => u.hwid === hwid);
  if (!user) {
    user = {
      id: "usr_" + crypto.randomUUID().slice(0, 8),
      username: "creator_" + hwid.replace(/[^A-Z0-9]/gi, "").slice(-8).toLowerCase(),
      email: hwid.toLowerCase().replace(/[^a-z0-9]/g, "") + "@flowstudio.local",
      passwordHash: "",
      role: "user",
      status: "active",
      hwid: hwid,
      licensePlan: license.plan,
      licenseExpiresAt: license.durationDays ? Date.now() + license.durationDays * 86400000 : null,
      maxAccounts: Math.max(1, Number(license.maxAccounts) || 1),
      notes: "Activación por licencia",
      createdAt: Date.now(),
      lastLoginAt: null,
      lastLoginIp: null
    };
    db.users.push(user);
  } else if (user.status === "banned") {
    throw new Error("Este equipo está suspendido.");
  }
  license.isRedeemed = true;
  license.redeemedByUserId = user.id;
  license.redeemedHwid = hwid;
  license.redeemedHwids = Array.from(new Set([...redeemedHwids, hwid]));
  license.redeemedAt = license.redeemedAt || Date.now();
  user.licensePlan = license.plan;
  user.maxAccounts = Math.max(1, Math.min(20, Number(license.maxAccounts) || 1));
  user.licenseExpiresAt = license.durationDays ? Date.now() + license.durationDays * 86400000 : null;
  await saveDatabase();
  const {
    passwordHash: _passwordHash,
    ...userRest
  } = user;
  return {
    license: license,
    user: userRest
  };
}
export async function redeemLicense(licenseKey, userId) {
  if (supabaseEnabled) {
    return sbRedeemLicense(licenseKey, userId);
  }
  const db = await loadDatabase();
  const normalizedKey = String(licenseKey || "").trim().toUpperCase();
  const license = db.licenses.find(l => l.key.toUpperCase() === normalizedKey);
  if (!license) {
    throw new Error("La clave de licencia no existe o es inválida.");
  }
  if (license.isRedeemed) {
    throw new Error("Esta clave de licencia ya ha sido canjeada anteriormente.");
  }
  license.isRedeemed = true;
  license.redeemedByUserId = userId;
  license.redeemedAt = Date.now();
  const user = db.users.find(u => u.id === userId);
  if (user) {
    user.licensePlan = license.plan;
    user.maxAccounts = 1;
    const baseExpiresAt = user.licenseExpiresAt && user.licenseExpiresAt > Date.now() ? user.licenseExpiresAt : Date.now();
    user.licenseExpiresAt = license.durationDays ? baseExpiresAt + license.durationDays * 24 * 60 * 60 * 1000 : null;
  }
  await saveDatabase();
  return {
    license: license,
    user: user
  };
}
export async function deleteLicense(licenseKey) {
  if (supabaseEnabled) {
    return sbDeleteLicense(licenseKey);
  }
  const db = await loadDatabase();
  db.licenses = db.licenses.filter(license => license.key !== licenseKey);
  await saveDatabase();
  return true;
}
export async function updateLicense(licenseKey, updates) {
  if (supabaseEnabled) {
    return sbUpdateLicense(licenseKey, updates);
  }
  const db = await loadDatabase();
  const license = db.licenses.find(l => l.key === licenseKey);
  if (!license) {
    throw new Error("Licencia no encontrada.");
  }
  if (Object.hasOwn(updates, "name")) {
    license.name = String(updates.name || "").trim().slice(0, 80);
  }
  if (Object.hasOwn(updates, "maxAccounts")) {
    license.maxAccounts = Math.max(1, Math.min(20, Number(updates.maxAccounts) || 1));
  }
  if (Object.hasOwn(updates, "plan")) {
    license.plan = String(updates.plan || license.plan);
  }
  if (Object.hasOwn(updates, "durationDays")) {
    license.durationDays = Math.max(0, Number(updates.durationDays) || 0);
  }
  await saveDatabase();
  return license;
}
export async function logAccess({
  userId: userId,
  username: username,
  hwid: hwid,
  ip: ip,
  status: status,
  details = ""
}) {
  if (process.env.FLOWSTUDIO_ENABLE_AUDIT_LOGS !== "true") {
    return {
      id: null,
      userId: userId || null,
      username: username || "Desconocido",
      hwid: hwid || null,
      ip: ip || null,
      status: status,
      details: details,
      timestamp: Date.now()
    };
  }
  if (supabaseEnabled) {
    return sbLogAccess({
      userId: userId,
      username: username,
      hwid: hwid,
      ip: ip,
      status: status,
      details: details
    });
  }
  const db = await loadDatabase();
  const logEntry = {
    id: crypto.randomUUID(),
    userId: userId || null,
    username: username || "Desconocido",
    hwid: hwid || "No especificado",
    ip: ip || "127.0.0.1",
    status: status,
    details: details,
    timestamp: Date.now()
  };
  db.logs.unshift(logEntry);
  if (db.logs.length > 500) {
    db.logs = db.logs.slice(0, 500);
  }
  await saveDatabase();
  return logEntry;
}
export async function getAccessLogs() {
  if (supabaseEnabled) {
    return sbGetAccessLogs();
  }
  const db = await loadDatabase();
  return db.logs.slice(0, 100);
}
export async function getSystemStats() {
  if (supabaseEnabled) {
    return sbGetSystemStats();
  }
  const db = await loadDatabase();
  const totalUsers = db.users.length;
  const activeUsers = db.users.filter(user => user.status === "active").length;
  const bannedUsers = db.users.filter(user => user.status === "banned").length;
  const admins = db.users.filter(user => user.role === "admin").length;
  const activeLicenses = db.licenses.filter(license => !license.isRedeemed).length;
  const redeemedLicenses = db.licenses.filter(license => license.isRedeemed).length;
  return {
    totalUsers: totalUsers,
    activeUsers: activeUsers,
    bannedUsers: bannedUsers,
    admins: admins,
    activeLicenses: activeLicenses,
    redeemedLicenses: redeemedLicenses,
    totalLogs: db.logs.length,
    version: db.settings?.version || "2.5.0"
  };
}
