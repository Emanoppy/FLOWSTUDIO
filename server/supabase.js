import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const DEFAULT_SUPABASE_URL = "https://hktxhsfwvvnujszlwnqj.supabase.co";
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = process.env.FLOWTUBE_DATA_ROOT ? path.resolve(process.env.FLOWTUBE_DATA_ROOT) : rootDir;
for (const file of [path.join(dataRoot, "flowstudio.private.env"), path.join(rootDir, ".env")]) {
  const raw = (() => {
    try {
      return fs.readFileSync(file, "utf8");
    } catch (readError) {
      return "";
    }
  })();
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)\s*=\s*(.+?)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
  }
}
const url = String(process.env.SUPABASE_URL || "").trim();
const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
export const supabaseEnabled = Boolean(url && serviceKey);
export const supabase = supabaseEnabled ? createClient(url, serviceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
}) : null;
const fail = error => {
  if (error) {
    throw new Error(error.message || "Error de Supabase.");
  }
};
const getClient = () => {
  if (!supabase) {
    throw new Error("Acceso directo a Supabase deshabilitado. Utilice el Gateway remoto.");
  }
  return supabase;
};
const toUser = row => row ? {
  id: row.id,
  username: row.username,
  email: row.email,
  role: row.role,
  status: row.status,
  hwid: row.hwid,
  licensePlan: row.license_plan,
  licenseExpiresAt: row.license_expires_at ? Date.parse(row.license_expires_at) : null,
  maxAccounts: row.max_accounts ?? 1,
  notes: row.notes || "",
  createdAt: row.created_at ? Date.parse(row.created_at) : null,
  lastLoginAt: row.last_login_at ? Date.parse(row.last_login_at) : null,
  lastLoginIp: row.last_login_ip || null,
  ...(row.password_hash ? {
    passwordHash: row.password_hash
  } : {})
} : null;
const toLicense = row => row ? {
  key: row.key,
  name: row.name || "",
  plan: row.plan,
  durationDays: row.duration_days,
  maxAccounts: row.max_accounts ?? 1,
  isRedeemed: row.is_redeemed,
  redeemedByUserId: row.redeemed_by_user_id,
  redeemedHwid: row.redeemed_hwid,
  redeemedAt: row.redeemed_at ? Date.parse(row.redeemed_at) : null,
  createdAt: row.created_at ? Date.parse(row.created_at) : null
} : null;
export async function sbGetUsers() {
  const [{
    data: usersData,
    error: usersError
  }, {
    data: licensesData,
    error: licensesError
  }] = await Promise.all([supabase.from("flowstudio_users").select("*").order("created_at", {
    ascending: false
  }), supabase.from("flowstudio_licenses").select("key, name, plan, redeemed_by_user_id, is_redeemed")]);
  fail(usersError);
  const licenseByUserId = new Map();
  (licensesData || []).forEach(license => {
    if (license.redeemed_by_user_id) {
      licenseByUserId.set(license.redeemed_by_user_id, license);
    }
  });
  return (usersData || []).map(row => {
    const user = toUser(row);
    const matchedLicense = licenseByUserId.get(user.id);
    if (matchedLicense) {
      user.licenseKey = matchedLicense.key;
      user.licenseName = matchedLicense.name || "";
    }
    return user;
  });
}
export async function sbGetUserById(userId) {
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_users").select("*").eq("id", userId).maybeSingle();
  fail(error);
  return toUser(data);
}
export async function sbGetUserByHwid(hwid) {
  if (!hwid) {
    return null;
  }
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_users").select("*").eq("hwid", hwid).maybeSingle();
  fail(error);
  return toUser(data);
}
export async function sbGetUserByIdentifier(identifier) {
  const normalizedIdentifier = String(identifier || "").trim().toLowerCase();
  if (!normalizedIdentifier) {
    return null;
  }
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_users").select("*").or("username.ilike." + normalizedIdentifier + ",email.ilike." + normalizedIdentifier).maybeSingle();
  fail(error);
  return toUser(data);
}
export async function sbCreateUser(userData) {
  const licenseExpiresAt = userData.durationDays ? new Date(Date.now() + Number(userData.durationDays) * 86400000).toISOString() : null;
  const newUserRow = {
    id: "usr_" + crypto.randomUUID().slice(0, 8),
    username: String(userData.username).trim(),
    email: String(userData.email || userData.username + "@flowstudio.local").trim().toLowerCase(),
    password_hash: userData.password ? crypto.createHash("sha256").update(userData.password + "::flowtube_secure_salt_2026").digest("hex") : "",
    role: userData.role === "admin" ? "admin" : "user",
    status: "active",
    hwid: userData.hwid || null,
    license_plan: userData.licensePlan || "Pro Mensual",
    license_expires_at: licenseExpiresAt,
    max_accounts: 1,
    notes: userData.notes || "",
    last_login_ip: null
  };
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_users").insert(newUserRow).select("*").single();
  fail(error);
  return toUser(data);
}
export async function sbUpdateUser(userId, updates) {
  const mappedUpdates = {};
  for (const [key, value] of Object.entries(updates || {})) {
    const fieldMap = {
      licensePlan: "license_plan",
      licenseExpiresAt: "license_expires_at",
      maxAccounts: "max_accounts",
      lastLoginAt: "last_login_at",
      lastLoginIp: "last_login_ip"
    };
    mappedUpdates[fieldMap[key] || key] = value;
  }
  if (mappedUpdates.password) {
    mappedUpdates.password_hash = crypto.createHash("sha256").update(mappedUpdates.password + "::flowtube_secure_salt_2026").digest("hex");
    delete mappedUpdates.password;
  }
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_users").update(mappedUpdates).eq("id", userId).select("*").single();
  fail(error);
  return toUser(data);
}
export async function sbDeleteUser(userId) {
  const {
    error: error
  } = await supabase.from("flowstudio_users").delete().eq("id", userId);
  fail(error);
  return true;
}
export async function sbGetLicenses() {
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_licenses").select("*").order("created_at", {
    ascending: false
  });
  fail(error);
  return (data || []).map(toLicense);
}
export async function sbGenerateLicenses({
  name = "",
  plan = "Pro",
  durationDays = 30,
  maxAccounts = 1,
  count = 1
}) {
  const newLicenseRows = Array.from({
    length: Math.max(1, Math.min(50, Number(count) || 1))
  }, () => ({
    key: Array.from({
      length: 3
    }, () => crypto.randomBytes(3).toString("hex").slice(0, 4).toUpperCase()).join("-"),
    name: String(name || "").trim().slice(0, 80),
    plan: plan,
    duration_days: durationDays === "" || durationDays == null ? 30 : Math.max(0, Number(durationDays) || 0),
    max_accounts: Math.max(1, Math.min(20, Number(maxAccounts) || 1)),
    is_redeemed: false
  }));
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_licenses").insert(newLicenseRows).select("*");
  fail(error);
  return (data || []).map(toLicense);
}
export async function sbActivateLicense(licenseKey, hwid) {
  const normalizedKey = String(licenseKey || "").trim().toUpperCase();
  if (!hwid) {
    throw new Error("No se pudo identificar este equipo.");
  }
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_licenses").select("*").eq("key", normalizedKey).maybeSingle();
  fail(error);
  const license = toLicense(data);
  if (!license) {
    throw new Error("La clave de licencia no existe o es inválida.");
  }
  const {
    data: deviceRows,
    error: devicesError
  } = await supabase.from("flowstudio_license_devices").select("hwid").eq("license_key", normalizedKey);
  fail(devicesError);
  const deviceHwids = (deviceRows || []).map(device => device.hwid);
  const maxAccounts = Math.max(1, Number(license.maxAccounts) || 1);
  if (!deviceHwids.includes(hwid) && deviceHwids.length >= maxAccounts) {
    throw new Error("Esta licencia alcanzó su límite de " + maxAccounts + " PC(s).");
  }
  let user = await sbGetUserByHwid(hwid);
  if (user?.status === "banned") {
    throw new Error("Este equipo está suspendido.");
  }
  const licenseExpiresAt = license.durationDays ? new Date(Date.now() + Number(license.durationDays) * 86400000).toISOString() : null;
  const licenseName = license.name ? license.name.trim() : null;
  if (!user) {
    const username = licenseName || "creator_" + hwid.replace(/[^A-Z0-9]/gi, "").slice(-8).toLowerCase();
    const existingUser = await sbGetUserByIdentifier(username);
    if (existingUser) {
      user = await sbUpdateUser(existingUser.id, {
        hwid: hwid,
        licensePlan: license.plan,
        licenseExpiresAt: licenseExpiresAt ? Date.parse(licenseExpiresAt) : null,
        maxAccounts: maxAccounts,
        status: "active",
        notes: licenseName || existingUser.notes || normalizedKey
      });
    } else {
      user = await sbCreateUser({
        username: username,
        email: hwid.toLowerCase().replace(/[^a-z0-9]/g, "") + "_" + Date.now().toString(36) + "@flowstudio.local",
        licensePlan: license.plan,
        durationDays: license.durationDays,
        hwid: hwid,
        maxAccounts: maxAccounts,
        notes: licenseName || normalizedKey
      });
    }
  } else {
    user = await sbUpdateUser(user.id, {
      username: licenseName && user.username.startsWith("creator_") ? licenseName : user.username,
      licensePlan: license.plan,
      licenseExpiresAt: licenseExpiresAt ? Date.parse(licenseExpiresAt) : null,
      maxAccounts: maxAccounts,
      status: "active",
      notes: licenseName || user.notes || normalizedKey
    });
  }
  if (!deviceHwids.includes(hwid)) {
    const {
      error: deviceInsertError
    } = await supabase.from("flowstudio_license_devices").insert({
      license_key: normalizedKey,
      hwid: hwid,
      user_id: user.id
    });
    fail(deviceInsertError);
  }
  const {
    data: updatedLicenseRow,
    error: updateError
  } = await supabase.from("flowstudio_licenses").update({
    is_redeemed: true,
    redeemed_by_user_id: user.id,
    redeemed_hwid: hwid,
    redeemed_at: license.redeemedAt ? new Date(license.redeemedAt).toISOString() : new Date().toISOString()
  }).eq("key", normalizedKey).select("*").single();
  fail(updateError);
  return {
    license: toLicense(updatedLicenseRow),
    user: {
      ...user,
      licenseKey: normalizedKey,
      licenseName: licenseName || ""
    }
  };
}
export async function sbRedeemLicense(licenseKey, userId) {
  const normalizedKey = String(licenseKey || "").trim().toUpperCase();
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_licenses").select("*").eq("key", normalizedKey).maybeSingle();
  fail(error);
  const license = toLicense(data);
  if (!license) {
    throw new Error("La clave de licencia no existe o es inválida.");
  }
  if (license.isRedeemed) {
    throw new Error("Esta clave de licencia ya ha sido canjeada anteriormente.");
  }
  const {
    data: updatedLicenseRow,
    error: updateError
  } = await supabase.from("flowstudio_licenses").update({
    is_redeemed: true,
    redeemed_by_user_id: userId,
    redeemed_at: new Date().toISOString()
  }).eq("key", normalizedKey).select("*").single();
  fail(updateError);
  const user = await sbGetUserById(userId);
  return {
    license: toLicense(updatedLicenseRow),
    user: user
  };
}
export async function sbDeleteLicense(licenseKey) {
  const {
    error: error
  } = await supabase.from("flowstudio_licenses").delete().eq("key", licenseKey);
  fail(error);
  return true;
}
export async function sbUpdateLicense(licenseKey, updates) {
  const mappedUpdates = {};
  if (Object.hasOwn(updates, "name")) {
    mappedUpdates.name = String(updates.name || "").trim().slice(0, 80);
  }
  if (Object.hasOwn(updates, "maxAccounts")) {
    mappedUpdates.max_accounts = Math.max(1, Math.min(20, Number(updates.maxAccounts) || 1));
  }
  if (Object.hasOwn(updates, "plan")) {
    mappedUpdates.plan = String(updates.plan || "Pro");
  }
  if (Object.hasOwn(updates, "durationDays")) {
    mappedUpdates.duration_days = Math.max(0, Number(updates.durationDays) || 0);
  }
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_licenses").update(mappedUpdates).eq("key", licenseKey).select("*").single();
  fail(error);
  return toLicense(data);
}
export async function sbLogAccess(logData) {
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_access_logs").insert({
    user_id: logData.userId || null,
    username: logData.username || "Desconocido",
    hwid: logData.hwid || null,
    ip: logData.ip || null,
    status: logData.status,
    details: logData.details || ""
  }).select("*").single();
  fail(error);
  return {
    ...logData,
    id: data.id,
    timestamp: Date.parse(data.created_at)
  };
}
export async function sbGetAccessLogs() {
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_access_logs").select("*").order("created_at", {
    ascending: false
  }).limit(100);
  fail(error);
  return (data || []).map(row => ({
    id: row.id,
    userId: row.user_id,
    username: row.username,
    hwid: row.hwid,
    ip: row.ip,
    status: row.status,
    details: row.details,
    timestamp: Date.parse(row.created_at)
  }));
}
export async function sbGetSystemStats() {
  const [users, licenses, logs] = await Promise.all([sbGetUsers(), sbGetLicenses(), sbGetAccessLogs()]);
  return {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === "active").length,
    bannedUsers: users.filter(user => user.status === "banned").length,
    admins: users.filter(user => user.role === "admin").length,
    activeLicenses: licenses.filter(license => !license.isRedeemed).length,
    redeemedLicenses: licenses.filter(license => license.isRedeemed).length,
    totalLogs: logs.length,
    version: "supabase"
  };
}
export async function sbGetAdminKeyHash() {
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_settings").select("value").eq("key", "admin_key_hash").maybeSingle();
  fail(error);
  return String(data?.value || "").trim().toLowerCase();
}
export async function sbGetPublishedUpdates() {
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_announcements").select("id,title,body,version,download_url,published_at").eq("is_published", true).order("published_at", {
    ascending: false
  }).limit(20);
  fail(error);
  return (data || []).map(row => ({
    id: row.id,
    title: row.title,
    body: row.body,
    version: row.version,
    url: row.download_url,
    publishedAt: row.published_at
  }));
}
export async function sbCreateUpdate(updateData) {
  const {
    data: data,
    error: error
  } = await supabase.from("flowstudio_announcements").insert({
    title: updateData.title,
    body: updateData.body || "",
    version: updateData.version || null,
    download_url: updateData.url || null,
    is_published: Boolean(updateData.isPublished),
    published_at: updateData.isPublished ? new Date().toISOString() : null
  }).select("*").single();
  fail(error);
  return data;
}
