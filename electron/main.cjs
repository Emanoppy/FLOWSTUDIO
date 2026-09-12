const {
  app,
  BrowserWindow,
  session,
  ipcMain,
  shell,
  net
} = require("electron");
const path = require("path");
const {
  fork
} = require("child_process");
const http = require("http");
const os = require("os");
const fs = require("fs");
for (const stream of [process.stdout, process.stderr]) {
  stream?.on?.("error", err => {
    if (err?.code === "EPIPE") {
      return;
    }
  });
}
const ROOT_DIR = path.resolve(__dirname, "..");
const APP_ICON = app.isPackaged ? fs.existsSync(path.join(process.resourcesPath, "icon.ico")) ? path.join(process.resourcesPath, "icon.ico") : fs.existsSync(path.join(ROOT_DIR, "build", "icon.ico")) ? path.join(ROOT_DIR, "build", "icon.ico") : path.join(ROOT_DIR, "build", "icon.png") : fs.existsSync(path.join(ROOT_DIR, "build", "icon.ico")) ? path.join(ROOT_DIR, "build", "icon.ico") : path.join(ROOT_DIR, "build", "icon.png");
const DATA_ROOT = app.isPackaged ? path.join(app.getPath("appData"), "FlowTube Studio Next") : ROOT_DIR;
let USER_MEDIA_DIR = "";
try {
  USER_MEDIA_DIR = path.join(app.getPath("videos") || app.getPath("documents") || app.getPath("home"), "FLOWSTUDIO");
} catch (err) {
  USER_MEDIA_DIR = path.join(DATA_ROOT, "FLOWSTUDIO");
}
try {
  fs.mkdirSync(path.join(USER_MEDIA_DIR, "Renders"), {
    recursive: true
  });
  fs.mkdirSync(path.join(USER_MEDIA_DIR, "Imagenes"), {
    recursive: true
  });
  fs.mkdirSync(path.join(USER_MEDIA_DIR, "Audios"), {
    recursive: true
  });
} catch (err) {}
try {
  const bundledWhisperDir = app.isPackaged ? path.join(process.resourcesPath, "runtime", "whisper.cpp") : path.join(ROOT_DIR, "runtime", "whisper.cpp");
  const targetWhisperDir = path.join(DATA_ROOT, "runtime", "whisper.cpp");
  if (fs.existsSync(bundledWhisperDir)) {
    fs.mkdirSync(targetWhisperDir, {
      recursive: true
    });
    for (const item of fs.readdirSync(bundledWhisperDir)) {
      const src = path.join(bundledWhisperDir, item);
      const dst = path.join(targetWhisperDir, item);
      if (!fs.existsSync(dst) && fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dst);
      }
    }
  }
} catch (err) {}
const EXTENSION_DIR = app.isPackaged ? path.join(process.resourcesPath, "extension") : path.join(ROOT_DIR, "extension");
const REMOTION_SOURCE_DIR = app.isPackaged ? path.join(process.resourcesPath, "remotion-src") : path.join(ROOT_DIR, "src", "remotion");
const REMOTION_BUNDLE_DIR = app.isPackaged ? path.join(process.resourcesPath, "remotion-bundle") : path.join(ROOT_DIR, "dist-remotion");
const ESBUILD_BINARY_PATH = app.isPackaged ? process.platform === "win32" ? path.join(process.resourcesPath, "app.asar.unpacked", "node_modules", "@esbuild", "win32-x64", "esbuild.exe") : path.join(process.resourcesPath, "app.asar.unpacked", "node_modules", "@esbuild", process.arch === "arm64" ? "darwin-arm64" : "darwin-x64", "bin", "esbuild") : undefined;
const REMOTION_BINARIES_DIR = app.isPackaged ? process.platform === "win32" ? path.join(process.resourcesPath, "app.asar.unpacked", "node_modules", "@remotion", "compositor-win32-x64-msvc") : path.join(process.resourcesPath, "app.asar.unpacked", "node_modules", "@remotion", process.arch === "arm64" ? "compositor-darwin-arm64" : "compositor-darwin-x64") : undefined;
const FFMPEG_BINARY_PATH = REMOTION_BINARIES_DIR ? path.join(REMOTION_BINARIES_DIR, process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg") : undefined;
const PORT_WEB = 4320;
const PORT_RENDER = 4322;
const PROFILE_DIR = path.join(DATA_ROOT, ".profile");
const ACCOUNTS_FILE = path.join(PROFILE_DIR, "accounts.json");
const LOG_DIR = path.join(DATA_ROOT, ".logs");
const LOG_FILE = path.join(LOG_DIR, "flowtube.log");
const USE_VITE_DEV = process.env.FLOWTUBE_DEV === "1";
app.setPath("userData", PROFILE_DIR);
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit(0);
}
let mainWindow = null;
let serverProcess = null;
let viteProcess = null;
let isQuitting = false;
let backendRestartTimer = null;
let viteRestartTimer = null;
function writeLog(level, message) {
  try {
    fs.mkdirSync(LOG_DIR, {
      recursive: true
    });
    if (fs.existsSync(LOG_FILE) && fs.statSync(LOG_FILE).size > 5242880) {
      fs.renameSync(LOG_FILE, path.join(LOG_DIR, "flowtube-" + Date.now() + ".log"));
    }
    const logLine = "[" + new Date().toISOString() + "] [" + level + "] " + String(message).trim() + "\n";
    fs.appendFileSync(LOG_FILE, logLine, "utf-8");
  } catch (err) {}
}
function broadcastServiceStatus() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }
  mainWindow.webContents.send("services:status", {
    backend: Boolean(serverProcess && !serverProcess.killed),
    web: USE_VITE_DEV ? Boolean(viteProcess && !viteProcess.killed) : Boolean(serverProcess && !serverProcess.killed),
    mode: USE_VITE_DEV ? "development" : "production"
  });
}
const referenceCache = new Map();
const activeUploads = new Map();
const accountWindows = new Map();
async function waitForPort(port, maxAttempts = 40, intervalMs = 500) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const isUp = await new Promise(resolve => {
      const req = http.get("http://127.0.0.1:" + port, res => {
        resolve(true);
      });
      req.on("error", () => resolve(false));
      req.setTimeout(400, () => {
        req.destroy();
        resolve(false);
      });
    });
    if (isUp) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  return false;
}
function startBackendServer() {
  if (serverProcess && !serverProcess.killed) {
    return;
  }
  const serverEntryPath = path.join(ROOT_DIR, "server", "index.js");
  writeLog("backend", "Iniciando servidor...");
  try {
    fs.mkdirSync(DATA_ROOT, {
      recursive: true
    });
  } catch (err) {}
  if (process.platform === "darwin") {
    const macPaths = ["/opt/homebrew/bin", "/opt/homebrew/sbin", "/usr/local/bin", "/usr/bin", "/bin", "/usr/sbin", "/sbin"];
    const existingPath = process.env.PATH || "";
    process.env.PATH = macPaths.join(":") + ":" + existingPath;
    try {
      const applicationsDir = path.join(DATA_ROOT, "Applications");
      const appSymlinkPath = path.join(applicationsDir, "FLOWSTUDIO.app");
      fs.mkdirSync(applicationsDir, {
        recursive: true
      });
      if (!fs.existsSync(appSymlinkPath) && fs.existsSync("/Applications/FLOWSTUDIO.app")) {
        fs.symlinkSync("/Applications/FLOWSTUDIO.app", appSymlinkPath, "dir");
      }
    } catch (err) {}
    if (app.isPackaged) {
      try {
        if (REMOTION_BINARIES_DIR && fs.existsSync(REMOTION_BINARIES_DIR)) {
          const binaryFiles = fs.readdirSync(REMOTION_BINARIES_DIR);
          for (const binaryFile of binaryFiles) {
            try {
              fs.chmodSync(path.join(REMOTION_BINARIES_DIR, binaryFile), 493);
            } catch (err) {}
          }
        }
        if (ESBUILD_BINARY_PATH && fs.existsSync(ESBUILD_BINARY_PATH)) {
          fs.chmodSync(ESBUILD_BINARY_PATH, 493);
        }
      } catch (err) {}
    }
  }
  const ffmpegPath = FFMPEG_BINARY_PATH && fs.existsSync(FFMPEG_BINARY_PATH) ? FFMPEG_BINARY_PATH : process.env.FFMPEG_PATH || (process.platform === "darwin" ? "/opt/homebrew/bin/ffmpeg" : undefined);
  const dyldLibraryPath = REMOTION_BINARIES_DIR ? [REMOTION_BINARIES_DIR, process.env.DYLD_LIBRARY_PATH].filter(Boolean).join(":") : undefined;
  const dyldFallbackLibraryPath = REMOTION_BINARIES_DIR ? [REMOTION_BINARIES_DIR, "/usr/local/lib", "/opt/homebrew/lib", process.env.DYLD_FALLBACK_LIBRARY_PATH].filter(Boolean).join(":") : undefined;
  const serverEnv = {
    ...process.env,
    ELECTRON_RUN_AS_NODE: "1",
    PORT: String(PORT_RENDER),
    FLOWTUBE_DATA_ROOT: DATA_ROOT,
    FLOWSTUDIO_OUTPUT_DIR: USER_MEDIA_DIR,
    FLOWTUBE_REMOTION_ROOT: REMOTION_SOURCE_DIR,
    FLOWTUBE_REMOTION_BUNDLE: REMOTION_BUNDLE_DIR,
    ...(ESBUILD_BINARY_PATH ? {
      ESBUILD_BINARY_PATH: ESBUILD_BINARY_PATH
    } : {}),
    ...(REMOTION_BINARIES_DIR ? {
      FLOWTUBE_REMOTION_BINARIES: REMOTION_BINARIES_DIR,
      ...(dyldLibraryPath ? {
        DYLD_LIBRARY_PATH: dyldLibraryPath
      } : {}),
      ...(dyldFallbackLibraryPath ? {
        DYLD_FALLBACK_LIBRARY_PATH: dyldFallbackLibraryPath
      } : {})
    } : {}),
    ...(ffmpegPath ? {
      FFMPEG_PATH: ffmpegPath
    } : {})
  };
  serverProcess = fork(serverEntryPath, [], {
    cwd: app.isPackaged ? DATA_ROOT : ROOT_DIR,
    execPath: process.execPath,
    env: serverEnv,
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe", "ipc"]
  });
  serverProcess.stdout?.on("data", data => writeLog("backend", data));
  serverProcess.stderr?.on("data", data => writeLog("backend:error", data));
  serverProcess.on("error", err => {
    writeLog("backend:error", err.stack || err.message);
  });
  serverProcess.on("exit", (code, signal) => {
    writeLog("backend", "Servidor detenido (code=" + code + ", signal=" + (signal || "none") + ").");
    serverProcess = null;
    broadcastServiceStatus();
    if (!isQuitting) {
      clearTimeout(backendRestartTimer);
      backendRestartTimer = setTimeout(startBackendServer, 1500);
    }
  });
}
function startViteDevServer() {
  if (!USE_VITE_DEV || viteProcess && !viteProcess.killed) {
    return;
  }
  const viteBinPath = path.join(ROOT_DIR, "node_modules", "vite", "bin", "vite.js");
  viteProcess = fork(viteBinPath, ["--host", "127.0.0.1", "--port", String(PORT_WEB)], {
    cwd: ROOT_DIR,
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe", "ipc"]
  });
  viteProcess.stdout?.on("data", data => writeLog("vite", data));
  viteProcess.stderr?.on("data", data => writeLog("vite:error", data));
  viteProcess.on("error", err => {
    writeLog("vite:error", err.stack || err.message);
  });
  viteProcess.on("exit", (code, signal) => {
    writeLog("vite", "Vite detenido (code=" + code + ", signal=" + (signal || "none") + ").");
    viteProcess = null;
    broadcastServiceStatus();
    if (!isQuitting && USE_VITE_DEV) {
      clearTimeout(viteRestartTimer);
      viteRestartTimer = setTimeout(startViteDevServer, 1500);
    }
  });
}
const DEFAULT_ACCOUNTS = [{
  id: "acc_1",
  label: "Cuenta 1 (Principal)",
  email: "",
  tier: "FREE",
  partition: "persist:google_account_1",
  projectId: "",
  connected: false,
  enabled: true,
  lastActive: Date.now()
}, {
  id: "acc_2",
  label: "Cuenta 2",
  email: "",
  tier: "FREE",
  partition: "persist:google_account_2",
  projectId: "",
  connected: false,
  enabled: true,
  lastActive: Date.now()
}, {
  id: "acc_3",
  label: "Cuenta 3",
  email: "",
  tier: "FREE",
  partition: "persist:google_account_3",
  projectId: "",
  connected: false,
  enabled: true,
  lastActive: Date.now()
}, {
  id: "acc_4",
  label: "Cuenta 4",
  email: "",
  tier: "FREE",
  partition: "persist:google_account_4",
  projectId: "",
  connected: false,
  enabled: true,
  lastActive: Date.now()
}, {
  id: "acc_5",
  label: "Cuenta 5",
  email: "",
  tier: "FREE",
  partition: "persist:google_account_5",
  projectId: "",
  connected: false,
  enabled: true,
  lastActive: Date.now()
}];
const accountHealthTracker = new Map();
function getAccountHealth(accountId, assumeHealthy = false) {
  const existingHealth = accountHealthTracker.get(accountId);
  if (existingHealth) {
    return existingHealth;
  }
  return {
    status: assumeHealthy ? "HEALTHY" : "IDLE",
    successCount: 0,
    errorCount: 0,
    lastSuccess: null,
    lastError: null,
    errorMessage: null
  };
}
function recordAccountSuccess(accountId) {
  const health = getAccountHealth(accountId, true);
  health.successCount = (health.successCount || 0) + 1;
  health.lastSuccess = Date.now();
  health.status = "HEALTHY";
  health.errorMessage = null;
  accountHealthTracker.set(accountId, health);
}
function recordAccountError(accountId, errorMessage, statusCode) {
  const health = getAccountHealth(accountId, true);
  health.errorCount = (health.errorCount || 0) + 1;
  health.lastError = Date.now();
  health.errorMessage = String(errorMessage || "");
  if (statusCode === 401 || /401|unauthorized|session expired|oauth|credentials/i.test(errorMessage)) {
    health.status = "401_EXPIRED";
  } else if (statusCode === 429 || /429|quota|rate limit|exhausted/i.test(errorMessage)) {
    health.status = "QUOTA_EXCEEDED";
  } else {
    health.status = "UNHEALTHY";
  }
  accountHealthTracker.set(accountId, health);
}
function loadAccountsRegistry() {
  try {
    if (fs.existsSync(ACCOUNTS_FILE)) {
      const storedAccounts = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, "utf-8"));
      if (Array.isArray(storedAccounts) && storedAccounts.length > 0) {
        return DEFAULT_ACCOUNTS.map(defaultAccount => {
          const storedAccount = storedAccounts.find(account => account.id === defaultAccount.id);
          if (storedAccount) {
            return {
              ...defaultAccount,
              ...storedAccount,
              tier: storedAccount.tier || defaultAccount.tier || "FREE"
            };
          } else {
            return defaultAccount;
          }
        });
      }
    }
  } catch (err) {
    writeLog("accounts:error", "Error loading registry: " + (err.stack || err.message));
  }
  saveAccountsRegistry(DEFAULT_ACCOUNTS);
  return DEFAULT_ACCOUNTS;
}
function saveAccountsRegistry(accounts) {
  try {
    fs.mkdirSync(PROFILE_DIR, {
      recursive: true
    });
    fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), "utf-8");
  } catch (err) {
    writeLog("accounts:error", "Error saving registry: " + (err.stack || err.message));
  }
}
function broadcastAccountsUpdate() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    const accountsWithHealth = loadAccountsRegistry().map(account => ({
      ...account,
      health: getAccountHealth(account.id, Boolean(account.connected && account.projectId))
    }));
    mainWindow.webContents.send("accounts:updated", accountsWithHealth);
  }
}
async function initAccountSession(account) {
  try {
    const accountSession = session.fromPartition(account.partition);
    if (accountSession.extensions?.loadExtension) {
      await accountSession.extensions.loadExtension(EXTENSION_DIR, {
        allowFileAccess: true
      }).catch(() => {});
    } else if (accountSession.loadExtension) {
      await accountSession.loadExtension(EXTENSION_DIR, {
        allowFileAccess: true
      }).catch(() => {});
    }
  } catch (err) {
    writeLog("accounts:error", "Error loading extension for " + account.id + ": " + (err.stack || err.message));
  }
}
async function extractAccountEmail(accountId, win) {
  const accounts = loadAccountsRegistry();
  const account = accounts.find(a => a.id === accountId);
  if (!account) {
    return;
  }
  try {
    let email = account.email || "";
    let tier = account.tier || "FREE";
    try {
      const accountSession = session.fromPartition(account.partition);
      const sessionResponse = await accountSession.fetch("https://labs.google/fx/api/auth/session");
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        if (sessionData?.user?.email) {
          email = sessionData.user.email;
        }
        const sessionDataUpper = JSON.stringify(sessionData || {}).toUpperCase();
        if (sessionDataUpper.includes("ULTRA") || sessionDataUpper.includes("AI_PREMIUM_ULTRA") || sessionDataUpper.includes("TIER_ULTRA")) {
          tier = "ULTRA";
        } else if (sessionDataUpper.includes("PLUS") || sessionDataUpper.includes("PREMIUM") || sessionDataUpper.includes("TIER_PLUS") || sessionDataUpper.includes("TIER_PAID") || sessionDataUpper.includes("GOOGLE_ONE") || sessionDataUpper.includes("ADVANCED")) {
          tier = "PLUS";
        }
      }
    } catch (err) {}
    if (win && !win.isDestroyed()) {
      const domResult = await win.webContents.executeJavaScript("(async () => {\n        let domEmail = \"\";\n        let domTier = \"\";\n        try {\n          const profileBtn = document.querySelector('a[aria-label*=\"@\"], button[aria-label*=\"@\"], div[aria-label*=\"@\"]');\n          if (profileBtn) {\n            const match = (profileBtn.getAttribute('aria-label') || '').match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})/);\n            if (match) domEmail = match[1];\n          }\n          if (!domEmail) {\n            const match = (document.body?.innerText || '').match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})/);\n            if (match) domEmail = match[1];\n          }\n          const bodyHtml = document.documentElement ? document.documentElement.innerHTML.toUpperCase() : \"\";\n          if (bodyHtml.includes(\"GOOGLE ONE ULTRA\") || bodyHtml.includes(\"FLOW ULTRA\") || bodyHtml.includes(\"TIER ULTRA\") || document.querySelector('[aria-label*=\"Ultra\" i], [class*=\"ultra\" i]')) {\n            domTier = \"ULTRA\";\n          } else if (bodyHtml.includes(\"GOOGLE ONE AI PREMIUM\") || bodyHtml.includes(\"GEMINI ADVANCED\") || bodyHtml.includes(\"FLOW PLUS\") || bodyHtml.includes(\"TIER PLUS\") || document.querySelector('[aria-label*=\"Plus\" i], [class*=\"plus\" i]')) {\n            domTier = \"PLUS\";\n          }\n        } catch (_) {}\n        return { email: domEmail, tier: domTier };\n      })()").catch(() => ({
        email: "",
        tier: ""
      }));
      if (domResult?.email) {
        email = domResult.email;
      }
      if (domResult?.tier && !account.tierManuallySet) {
        tier = domResult.tier;
      }
    }
    let hasChanges = false;
    if (email && account.email !== email) {
      account.email = email;
      hasChanges = true;
    }
    if (tier && !account.tierManuallySet && account.tier !== tier) {
      account.tier = tier;
      hasChanges = true;
    }
    if (hasChanges) {
      saveAccountsRegistry(accounts);
      broadcastAccountsUpdate();
    }
  } catch (err) {}
}
function checkAccountUrl(accountId, url) {
  const win = accountWindows.get(accountId);
  if (win && !win.isDestroyed()) {
    extractAccountEmail(accountId, win);
  }
  const projectMatch = url.match(/project\/([a-f0-9-]+)/i);
  if (projectMatch) {
    const projectId = projectMatch[1];
    const accounts = loadAccountsRegistry();
    const account = accounts.find(a => a.id === accountId);
    if (account) {
      account.projectId = projectId;
      account.connected = true;
      account.lastActive = Date.now();
      saveAccountsRegistry(accounts);
      broadcastAccountsUpdate();
    }
    if (win && !win.isDestroyed()) {
      setTimeout(() => {
        if (win && !win.isDestroyed() && win.isVisible()) {
          win.hide();
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.focus();
          }
        }
      }, 800);
    }
  }
}
async function autoSelectGoogleAccount(account, win) {
  if (!win || win.isDestroyed()) {
    return false;
  }
  try {
    return await win.webContents.executeJavaScript("\n      (() => {\n        const targetEmail = " + JSON.stringify((account.email || "").toLowerCase()) + ";\n        const lis = Array.from(document.querySelectorAll('li'));\n        for (const li of lis) {\n          const text = (li.innerText || '').toLowerCase();\n          const matchesEmail = targetEmail ? text.includes(targetEmail) : text.includes('@');\n          if (matchesEmail && !text.includes('use another') && !text.includes('usar otra')) {\n            const btn = li.querySelector('button') || li;\n            btn.click();\n            return true;\n          }\n        }\n        const continueBtn = Array.from(document.querySelectorAll('button')).find(b => {\n          const t = (b.innerText || '').toLowerCase();\n          return t.includes('continue') || t.includes('continuar') || t.includes('allow') || t.includes('permitir') || t.includes('siguiente');\n        });\n        if (continueBtn) {\n          continueBtn.click();\n          return true;\n        }\n        return false;\n      })()\n    ").catch(() => false);
  } catch (err) {
    return false;
  }
}
function getOrOpenAccountWindow(accountId, shouldShow = true) {
  const accounts = loadAccountsRegistry();
  const account = accounts.find(a => a.id === accountId) || accounts[0];
  if (!account) {
    return null;
  }
  initAccountSession(account);
  let win = accountWindows.get(account.id);
  if (win && !win.isDestroyed()) {
    if (shouldShow) {
      if (win.isMinimized()) {
        win.restore();
      }
      win.show();
      win.focus();
      win.moveTop();
    }
    return win;
  }
  win = new BrowserWindow({
    width: 1100,
    height: 800,
    title: "Google Flow - " + account.label,
    icon: APP_ICON,
    show: shouldShow,
    modal: false,
    autoHideMenuBar: true,
    webPreferences: {
      partition: account.partition,
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false
    }
  });
  accountWindows.set(account.id, win);
  win.webContents.setWindowOpenHandler(({
    url: url
  }) => {
    if (/^https:\/\/(?:[a-z0-9-]+\.)*google\.com\//i.test(url) || /^https:\/\/labs\.google\//i.test(url) || /^https:\/\/flow\.google\//i.test(url)) {
      return {
        action: "allow",
        overrideBrowserWindowOptions: {
          width: 620,
          height: 760,
          parent: win,
          modal: false,
          autoHideMenuBar: true,
          webPreferences: {
            partition: account.partition,
            nodeIntegration: false,
            contextIsolation: true
          }
        }
      };
    }
    return {
      action: "deny"
    };
  });
  const userAgent = win.webContents.getUserAgent().replace(/\sElectron\/[\d.]+/i, "").replace(/\sFlowTube[^\s]*\/[\d.]+/i, "");
  win.webContents.setUserAgent(userAgent);
  win.on("close", event => {
    if (!isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });
  win.webContents.on("did-navigate", (event, url) => checkAccountUrl(account.id, url));
  win.webContents.on("did-navigate-in-page", (event, url) => checkAccountUrl(account.id, url));
  win.webContents.on("did-finish-load", async () => {
    const currentUrl = win.webContents.getURL() || "";
    checkAccountUrl(account.id, currentUrl);
    if (currentUrl.includes("accounts.google.com")) {
      if (currentUrl.includes("challenge") || currentUrl.includes("confirmidentifier") || currentUrl.includes("ServiceLogin")) {
        if (!win.isVisible()) {
          win.show();
          win.focus();
        }
      } else {
        await autoSelectGoogleAccount(account, win);
      }
    } else if (currentUrl.includes("flow.google.com/about")) {
      await win.webContents.executeJavaScript("\n        (() => {\n          const btn = Array.from(document.querySelectorAll('button, a')).find(el => {\n            const t = (el.innerText || '').toLowerCase();\n            return t.includes('create with google flow') || t.includes('sign in') || t.includes('iniciar sesión');\n          });\n          if (btn) btn.click();\n        })()\n      ").catch(() => {});
    }
    const isOnFlowHome = (/labs\.google\/fx\/(?:tools\/flow)?/i.test(currentUrl) || /flow\.google\.com(?:\/)?$/i.test(currentUrl) || /flow\.google(?:\/)?$/i.test(currentUrl)) && !currentUrl.includes("/project/");
    if (isOnFlowHome) {
      try {
        await win.webContents.executeJavaScript("\n          (() => {\n            const buttons = Array.from(document.querySelectorAll('button, a, div[role=\"button\"]'));\n            const newProjectBtn = buttons.find(b => {\n              const text = (b.innerText || b.getAttribute('aria-label') || '').toLowerCase();\n              return text.includes('new project') || text.includes('nuevo proyecto') || text.includes('create project') || text.includes('crear proyecto') || text.includes('start with flow');\n            });\n            if (newProjectBtn) {\n              newProjectBtn.click();\n              return true;\n            }\n            const firstProj = document.querySelector('a[href*=\"/project/\"]');\n            if (firstProj) {\n              firstProj.click();\n              return true;\n            }\n            return false;\n          })()\n        ").catch(() => {});
      } catch (err) {}
    }
  });
  win.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedUrl, isMainFrame) => {
    if (isMainFrame && errorCode !== -3) {
      writeLog("accounts:error", "Google Flow no cargó (" + errorCode + " " + errorDescription + "): " + validatedUrl);
    }
  });
  const targetUrl = account.projectId ? "https://flow.google.com/project/" + account.projectId : "https://flow.google.com/";
  win.loadURL(targetUrl);
  return win;
}
function autoReconnectAccountsInBackground() {
  const accounts = loadAccountsRegistry();
  accounts.forEach((account, index) => {
    if (account?.projectId) {
      setTimeout(() => {
        getOrOpenAccountWindow(account.id, false);
      }, 2000 + index * 1000);
    }
  });
}
async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1080,
    minHeight: 700,
    title: "FLOWSTUDIO",
    icon: APP_ICON,
    backgroundColor: "#090a0d",
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    broadcastServiceStatus();
  });
  setTimeout(() => {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
      mainWindow.show();
    }
  }, 5000);
  const appUrl = USE_VITE_DEV ? "http://127.0.0.1:" + PORT_WEB : "http://127.0.0.1:" + PORT_RENDER;
  const fallbackIndexPath = path.join(ROOT_DIR, "dist", "index.html");
  try {
    await mainWindow.loadURL(appUrl);
  } catch (err) {
    writeLog("electron:error", "No se pudo cargar " + appUrl + ": " + err.message);
    if (fs.existsSync(fallbackIndexPath)) {
      await mainWindow.loadFile(fallbackIndexPath);
    }
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
    isQuitting = true;
    accountWindows.forEach(win => {
      if (win && !win.isDestroyed()) {
        try {
          win.destroy();
        } catch (err) {}
      }
    });
    if (serverProcess) {
      try {
        serverProcess.kill();
      } catch (err) {}
    }
    if (viteProcess) {
      try {
        viteProcess.kill();
      } catch (err) {}
    }
    app.quit();
  });
}
const RECAPTCHA_SITE_KEY = "6LdsFiUsAAAAAIjVDZcuLhaHiDn5nnHVXVRQGeMV";
const VIDEO_START_ENDPOINT = "https://aisandbox-pa.googleapis.com/v1/video:batchAsyncGenerateVideoStartImage";
const VIDEO_STATUS_ENDPOINT = "https://aisandbox-pa.googleapis.com/v1/video:batchCheckAsyncVideoGenerationStatus";
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
  "nano-banana-pro": "GEM_PIX_2"
};
const VIDEO_MODELS = {
  veo: "veo_3_1_i2v_lite",
  "veo-3.1-lite": "veo_3_1_i2v_lite"
};
const OMNI_DURATIONS = new Set([4, 6, 8, 10]);
const ACTIVE_VIDEO_STATUSES = new Set(["MEDIA_GENERATION_STATUS_SCHEDULED", "MEDIA_GENERATION_STATUS_PENDING", "MEDIA_GENERATION_STATUS_ACTIVE"]);
let electronRoundRobin = 0;
function isGoogleFlowUrl(url = "") {
  if (!url) {
    return false;
  }
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    if (hostname === "flow.google.com" || hostname === "flow.google" || hostname.endsWith(".flow.google.com")) {
      return true;
    }
    if (hostname === "labs.google" && (parsedUrl.pathname.startsWith("/fx") || parsedUrl.pathname.includes("flow"))) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}
function isAccountOnProject(url = "", projectId = "") {
  if (!url || !isGoogleFlowUrl(url)) {
    return false;
  }
  if (!projectId) {
    return true;
  }
  return url.includes(projectId);
}
function waitForWindowStopLoading(win, timeoutMs = 15000) {
  if (!win || win.isDestroyed() || !win.webContents.isLoading()) {
    return Promise.resolve();
  }
  return new Promise(resolve => {
    let isResolved = false;
    const finish = () => {
      if (!isResolved) {
        isResolved = true;
        cleanup();
        resolve();
      }
    };
    const timeoutId = setTimeout(finish, timeoutMs);
    const onLoadEvent = () => finish();
    const cleanup = () => {
      clearTimeout(timeoutId);
      try {
        win.webContents.removeListener("did-stop-loading", onLoadEvent);
        win.webContents.removeListener("did-finish-load", onLoadEvent);
        win.webContents.removeListener("did-fail-load", onLoadEvent);
      } catch (err) {}
    };
    win.webContents.once("did-stop-loading", onLoadEvent);
    win.webContents.once("did-finish-load", onLoadEvent);
    win.webContents.once("did-fail-load", onLoadEvent);
  });
}
const accountNavigations = new Map();
async function ensureAccountOnFlow(account, win) {
  if (!win || win.isDestroyed()) {
    return;
  }
  const currentUrl = win.webContents.getURL() || "";
  if (currentUrl.includes("accounts.google.com")) {
    if (currentUrl.includes("challenge") || currentUrl.includes("confirmidentifier") || currentUrl.includes("ServiceLogin")) {
      if (!win.isVisible()) {
        win.show();
        win.focus();
      }
    } else {
      await autoSelectGoogleAccount(account, win);
    }
    return;
  }
  if (isAccountOnProject(currentUrl, account.projectId)) {
    if (win.webContents.isLoading()) {
      await waitForWindowStopLoading(win, 15000);
    }
    return;
  }
  if (accountNavigations.has(account.id)) {
    try {
      await accountNavigations.get(account.id);
    } catch (err) {}
    return;
  }
  const navigationPromise = (async () => {
    const targetUrl = account.projectId ? "https://flow.google.com/project/" + account.projectId : "https://flow.google.com/";
    try {
      await win.loadURL(targetUrl);
    } catch (err) {
      const urlAfterError = win.webContents.getURL() || "";
      if (isGoogleFlowUrl(urlAfterError)) {} else {
        throw err;
      }
    }
    if (win.webContents.isLoading()) {
      await waitForWindowStopLoading(win, 15000);
    }
  })();
  accountNavigations.set(account.id, navigationPromise);
  try {
    await navigationPromise;
  } finally {
    accountNavigations.delete(account.id);
  }
}
const accountSessionCache = new Map();
async function getAccountAccessToken(account, forceRefresh = false) {
  if (!account?.partition) {
    return null;
  }
  const now = Date.now();
  if (!forceRefresh && accountSessionCache.has(account.id)) {
    const cached = accountSessionCache.get(account.id);
    if (cached.token && cached.expiresAt > now + 60000) {
      return cached.token;
    }
  }
  try {
    // Pedir la sesión desde el proceso principal con session.fromPartition().fetch(),
    // usando las cookies guardadas de la cuenta directamente — no desde adentro de la
    // página con webContents.executeJavaScript(). Hacerlo desde la página falla porque
    // Google migró Flow de labs.google a flow.google.com: una vez que la ventana navega
    // a flow.google.com, un fetch() de esa página hacia labs.google/fx/api/auth/session
    // es cross-origin y el navegador lo bloquea por CORS ("Failed to fetch"), aunque la
    // cuenta esté perfectamente logueada. session.fromPartition().fetch() no tiene ese
    // problema porque no corre en el contexto de ninguna página — usa el cookie jar de
    // la partición directo, sin importar qué URL esté cargada en ese momento.
    const accountSession = session.fromPartition(account.partition);
    const sessionResponse = await accountSession.fetch("https://labs.google/fx/api/auth/session");
    const sessionData = sessionResponse.ok ? await sessionResponse.json() : null;
    writeLog("accounts:debug", "sesión Flow para " + account.label + " -> " + JSON.stringify(sessionData).slice(0, 1000));
    if (sessionData?.access_token) {
      const expiresAt = sessionData.expires ? new Date(sessionData.expires).getTime() : 0;
      if (expiresAt && expiresAt <= now) {
        writeLog("accounts", "Token expirado en sesión para " + account.label + ", requiere renovación.");
        return null;
      }
      accountSessionCache.set(account.id, {
        token: sessionData.access_token,
        email: sessionData.user?.email || account.email,
        expiresAt: expiresAt || now + 3000000
      });
      return sessionData.access_token;
    }
  } catch (err) {
    writeLog("accounts:error", "Error obteniendo token para " + account.id + ": " + err.message);
  }
  return null;
}
async function refreshAccountSession(account, providedWin) {
  if (!account?.partition) {
    return null;
  }
  accountSessionCache.delete(account.id);
  const win = providedWin || accountWindows.get(account.id);
  if (!win || win.isDestroyed()) {
    return null;
  }
  try {
    writeLog("accounts", "Refrescando sesión OAuth para " + account.label + "...");
    try {
      await win.loadURL("https://labs.google/fx/tools/flow");
    } catch (err) {}
    await new Promise(resolve => setTimeout(resolve, 4500));
    const currentUrl = win.webContents.getURL() || "";
    if (currentUrl.includes("accounts.google.com")) {
      if (currentUrl.includes("challenge") || currentUrl.includes("confirmidentifier") || currentUrl.includes("ServiceLogin")) {
        win.show();
        win.focus();
      } else {
        await autoSelectGoogleAccount(account, win);
      }
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    const token = await getAccountAccessToken(account, true);
    if (token) {
      writeLog("accounts", "Token renovado con éxito para " + account.label + ".");
      return token;
    }
  } catch (err) {
    writeLog("accounts:error", "Error al renovar sesión para " + account.label + ": " + err.message);
  }
  return null;
}
async function waitForCondition(checkFn, timeoutMs, intervalMs = 1200) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const result = await checkFn();
    if (result) {
      return result;
    }
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  return null;
}
async function clickElementAt(win, x, y) {
  win.webContents.sendInputEvent({
    type: "mouseMove",
    x: x,
    y: y
  });
  win.webContents.sendInputEvent({
    type: "mouseDown",
    x: x,
    y: y,
    button: "left",
    clickCount: 1
  });
  win.webContents.sendInputEvent({
    type: "mouseUp",
    x: x,
    y: y,
    button: "left",
    clickCount: 1
  });
}
const findPromptBoxScript = "(() => { const t = Array.from(document.querySelectorAll('[contenteditable]')).find(e => { const r = e.getBoundingClientRect(); return r.width > 100 && r.height > 0 && r.height < 100 && r.top > 0; }); if (!t) return null; const r = t.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 }); })()";
const findGenerateButtonScript = "(() => { const b = document.querySelector('button[aria-label=\"Iniciar generación\"]'); if (!b || b.disabled) return null; const r = b.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 }); })()";
const listFlowImagesScript = "JSON.stringify(Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src.includes('flow-content.google')))";
// Google retiró el API REST con Bearer token que usaba Flow (aisandbox-pa.googleapis.com);
// la web app ahora usa un protocolo RPC interno (batchexecute) atado a reCAPTCHA y no
// pensado para consumo externo. En vez de reimplementarlo (muy frágil, cambia con cada
// despliegue), esto automatiza la interfaz real de Flow: escribe el prompt y hace clic
// en "Iniciar generación" como lo haría una persona, y detecta la imagen resultante en el DOM.
async function generateImageViaFlowUI(account, win, prompt) {
  const promptRectRaw = await win.webContents.executeJavaScript(findPromptBoxScript).catch(() => null);
  const promptRect = promptRectRaw ? JSON.parse(promptRectRaw) : null;
  if (!promptRect) {
    throw new Error("No se encontró el campo de prompt en la página de Flow.");
  }
  await clickElementAt(win, promptRect.x, promptRect.y);
  await new Promise(resolve => setTimeout(resolve, 250));
  win.webContents.selectAll();
  await new Promise(resolve => setTimeout(resolve, 150));
  win.webContents.sendInputEvent({
    type: "keyDown",
    keyCode: "Backspace"
  });
  win.webContents.sendInputEvent({
    type: "keyUp",
    keyCode: "Backspace"
  });
  await new Promise(resolve => setTimeout(resolve, 200));
  win.webContents.insertText(String(prompt || "").slice(0, 2000));
  await new Promise(resolve => setTimeout(resolve, 500));
  const existingImagesRaw = await win.webContents.executeJavaScript(listFlowImagesScript).catch(() => "[]");
  const existingImages = new Set(JSON.parse(existingImagesRaw || "[]"));
  const buttonRectRaw = await win.webContents.executeJavaScript(findGenerateButtonScript).catch(() => null);
  const buttonRect = buttonRectRaw ? JSON.parse(buttonRectRaw) : null;
  if (!buttonRect) {
    throw new Error("El botón de generar no está disponible en Flow (deshabilitado o no encontrado).");
  }
  await clickElementAt(win, buttonRect.x, buttonRect.y);
  const newImageUrl = await waitForCondition(async () => {
    const currentImagesRaw = await win.webContents.executeJavaScript(listFlowImagesScript).catch(() => "[]");
    const currentImages = JSON.parse(currentImagesRaw || "[]");
    return currentImages.find(url => !existingImages.has(url)) || null;
  }, 60000, 1500);
  if (!newImageUrl) {
    throw new Error("Flow no devolvió una imagen utilizable.");
  }
  const mediaIdMatch = newImageUrl.match(/\/image\/([a-f0-9-]+)/i);
  return {
    imageUrl: newImageUrl,
    mediaId: mediaIdMatch ? mediaIdMatch[1] : crypto.randomUUID(),
    referenceUsed: false,
    referenceMediaId: null,
    is2k: false,
    accountLabel: account.label
  };
}
// Flow renderiza el video en un <canvas> (no un <video src>) y el botón "Descargar"
// dispara la descarga con un <a download href="blob:..."> creado y removido al vuelo —
// no queda nada estable que leer del DOM. La forma confiable de capturarlo es el propio
// mecanismo de descargas de Electron: dejamos que la página descargue como si un humano
// le diera clic a "Descargar", y Chromium nos avisa via "will-download" sin importar
// cómo se disparó internamente (funciona igual para blobs que para URLs reales).
function waitForNextDownload(win, timeoutMs) {
  return new Promise((resolve, reject) => {
    const ses = win.webContents.session;
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      ses.removeListener("will-download", onWillDownload);
      reject(new Error("Se agotó el tiempo esperando la descarga de Flow."));
    }, timeoutMs);
    function onWillDownload(event, item) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      ses.removeListener("will-download", onWillDownload);
      const suggestedName = item.getFilename() || "flow-download.bin";
      const tempPath = path.join(os.tmpdir(), "flowstudio-dl-" + Date.now() + "-" + suggestedName);
      item.setSavePath(tempPath);
      item.once("done", (doneEvent, state) => {
        if (state === "completed") {
          resolve({
            filePath: tempPath,
            mimeType: item.getMimeType() || "",
            filename: suggestedName
          });
        } else {
          reject(new Error("La descarga de Flow no se completó (" + state + ")."));
        }
      });
    }
    ses.on("will-download", onWillDownload);
  });
}
function importDownloadedFileToLibrary(filePath, mimeHint, filenameHint) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (readErr, buffer) => {
      fs.unlink(filePath, () => {});
      if (readErr) {
        reject(readErr);
        return;
      }
      const req = http.request({
        hostname: "127.0.0.1",
        port: PORT_RENDER,
        path: "/api/import",
        method: "POST",
        headers: {
          "Content-Type": mimeHint || "application/octet-stream",
          "Content-Length": buffer.length,
          "x-filename": encodeURIComponent(filenameHint || "flow-media.bin")
        }
      }, res => {
        let body = "";
        res.on("data", chunk => body += chunk);
        res.on("end", () => {
          try {
            const data = JSON.parse(body);
            if (res.statusCode === 200 && data?.url) {
              resolve(data);
            } else {
              reject(new Error(data?.error || "El servidor local rechazó el archivo importado."));
            }
          } catch (parseErr) {
            reject(parseErr);
          }
        });
      });
      req.on("error", reject);
      req.write(buffer);
      req.end();
    });
  });
}
const findMostRecentGalleryImageScript = "(() => { const img = Array.from(document.querySelectorAll('img')).find(i => i.src.includes('flow.google.com/asb/') || i.src.includes('flow-content.google')); if (!img) return null; const r = img.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 }); })()";
const findAddIngredientButtonScript = "(() => { const b = document.querySelector('button[aria-label=\"Añadir ingredientes a ventana para peticiones\"]'); if (!b) return null; const r = b.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 }); })()";
const findVideoPromptBoxScript = "(() => { const t = Array.from(document.querySelectorAll('[contenteditable]')).find(e => { const r = e.getBoundingClientRect(); return r.width > 100 && r.height > 0 && r.height < 100 && r.top > 300; }); if (!t) return null; const r = t.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 }); })()";
const findDownloadButtonScript = "(() => { const b = document.querySelector('button[aria-label=\"Descargar contenido multimedia\"]'); if (!b || b.disabled) return null; const r = b.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 }); })()";
const findDownloadQualityMenuItemScript = "(() => { const items = Array.from(document.querySelectorAll(\"[role='menuitem'], .mat-mdc-menu-item\")); const match = items.find(el => /Tama.o original|360p/i.test(el.textContent || '')) || items[0]; if (!match) return null; const r = match.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 }); })()";
const isStillGeneratingScript = "JSON.stringify(/\\b\\d{1,3}\\s?%/.test(document.body.innerText))";
const findSettingsChipScript = "(() => { const b = document.querySelector('button[aria-label=\"Activador de ajustes\"]'); if (!b) return null; const r = b.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 }); })()";
// El panel de ajustes (Imagen/Vídeo, relación de aspecto, resolución, duración) se abre en
// un overlay de Angular CDK, no dentro del toolbar — las opciones son botones "toggle" con
// un <span class="toggle-text"> con el texto exacto (ej. "720p", "6 s", "Vídeo").
function findToggleOptionScript(optionText) {
  return "(() => { const spans = Array.from(document.querySelectorAll('.cdk-overlay-container .toggle-text')); const match = spans.find(s => (s.textContent || '').trim() === " + JSON.stringify(String(optionText)) + "); if (!match) return null; const btn = match.closest('button'); if (!btn) return null; const r = btn.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 }); })()";
}
// Ajusta duración/resolución del video ANTES de generar, usando el panel real de Flow
// (confirmado a mano: el chip queda mostrando "Vídeo · 720p · 6 s" y el resultado generado
// respeta esos valores). Si no se encuentra algún control, sigue sin bloquear la generación
// — mejor generar con los valores por defecto que fallar del todo.
async function setVideoGenerationSettings(win, { duration, resolution, aspectRatio } = {}) {
  if (!duration && !resolution && !aspectRatio) {
    return;
  }
  const chipRectRaw = await win.webContents.executeJavaScript(findSettingsChipScript).catch(() => null);
  const chipRect = chipRectRaw ? JSON.parse(chipRectRaw) : null;
  if (!chipRect) {
    return;
  }
  await clickElementAt(win, chipRect.x, chipRect.y);
  await new Promise(resolve => setTimeout(resolve, 600));
  const videoToggleRectRaw = await win.webContents.executeJavaScript(findToggleOptionScript("Vídeo")).catch(() => null);
  const videoToggleRect = videoToggleRectRaw ? JSON.parse(videoToggleRectRaw) : null;
  if (videoToggleRect) {
    await clickElementAt(win, videoToggleRect.x, videoToggleRect.y);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  if (duration) {
    const durationRectRaw = await win.webContents.executeJavaScript(findToggleOptionScript(duration + " s")).catch(() => null);
    const durationRect = durationRectRaw ? JSON.parse(durationRectRaw) : null;
    if (durationRect) {
      await clickElementAt(win, durationRect.x, durationRect.y);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  if (resolution) {
    const resolutionRectRaw = await win.webContents.executeJavaScript(findToggleOptionScript(resolution)).catch(() => null);
    const resolutionRect = resolutionRectRaw ? JSON.parse(resolutionRectRaw) : null;
    if (resolutionRect) {
      await clickElementAt(win, resolutionRect.x, resolutionRect.y);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  if (aspectRatio) {
    const aspectRectRaw = await win.webContents.executeJavaScript(findToggleOptionScript(aspectRatio)).catch(() => null);
    const aspectRect = aspectRectRaw ? JSON.parse(aspectRectRaw) : null;
    if (aspectRect) {
      await clickElementAt(win, aspectRect.x, aspectRect.y);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  await win.webContents.executeJavaScript("document.body.click()").catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 400));
}
async function typeIntoBoxAt(win, rect, text) {
  await clickElementAt(win, rect.x, rect.y);
  await new Promise(resolve => setTimeout(resolve, 250));
  win.webContents.selectAll();
  await new Promise(resolve => setTimeout(resolve, 150));
  win.webContents.sendInputEvent({
    type: "keyDown",
    keyCode: "Backspace"
  });
  win.webContents.sendInputEvent({
    type: "keyUp",
    keyCode: "Backspace"
  });
  await new Promise(resolve => setTimeout(resolve, 200));
  win.webContents.insertText(String(text || "").slice(0, 2000));
  await new Promise(resolve => setTimeout(resolve, 400));
}
// Igual que generateImageViaFlowUI: en vez de reconstruir el RPC interno de Google,
// automatiza la interfaz real de "imagen a video" — abre la imagen más reciente, la
// añade como ingrediente (cuadro inicial), escribe el prompt de movimiento, genera,
// espera a que desaparezca el indicador de progreso, y descarga el resultado con el
// botón real de Flow (capturado vía Electron, ver waitForNextDownload).
async function generateVideoViaFlowUI(account, win, prompt, videoSettings = {}) {
  const imageRectRaw = await win.webContents.executeJavaScript(findMostRecentGalleryImageScript).catch(() => null);
  const imageRect = imageRectRaw ? JSON.parse(imageRectRaw) : null;
  if (!imageRect) {
    throw new Error("No se encontró ninguna imagen en Flow para convertir a video. Genera una imagen primero.");
  }
  await clickElementAt(win, imageRect.x, imageRect.y);
  await new Promise(resolve => setTimeout(resolve, 800));
  const addIngredientRectRaw = await win.webContents.executeJavaScript(findAddIngredientButtonScript).catch(() => null);
  const addIngredientRect = addIngredientRectRaw ? JSON.parse(addIngredientRectRaw) : null;
  if (!addIngredientRect) {
    throw new Error("No se encontró el botón para usar la imagen como base del video.");
  }
  await clickElementAt(win, addIngredientRect.x, addIngredientRect.y);
  await new Promise(resolve => setTimeout(resolve, 1200));
  await setVideoGenerationSettings(win, videoSettings);
  const promptRectRaw = await win.webContents.executeJavaScript(findVideoPromptBoxScript).catch(() => null);
  const promptRect = promptRectRaw ? JSON.parse(promptRectRaw) : null;
  if (!promptRect) {
    throw new Error("No se encontró el campo de prompt del editor de video en Flow.");
  }
  await typeIntoBoxAt(win, promptRect, prompt);
  const buttonRectRaw = await win.webContents.executeJavaScript(findGenerateButtonScript).catch(() => null);
  const buttonRect = buttonRectRaw ? JSON.parse(buttonRectRaw) : null;
  if (!buttonRect) {
    throw new Error("El botón de generar video no está disponible en Flow.");
  }
  await clickElementAt(win, buttonRect.x, buttonRect.y);
  await new Promise(resolve => setTimeout(resolve, 5000));
  let consecutiveCleanChecks = 0;
  // 180s (3 min) fijos era muy justo, y un límite fijo de 6 min tampoco alcanza para
  // clips más largos (probado: un video de 10s con Omni Flash superó los 6 min). El
  // tiempo de espera ahora escala con la duración pedida: base de 4 min + 40s por cada
  // segundo de video (un clip de 10s espera hasta ~10.7 min; uno de 4s, hasta ~6.7 min).
  const requestedSeconds = Number(videoSettings.duration) || 8;
  const waitTimeoutMs = Math.min(900000, 240000 + requestedSeconds * 40000);
  const finishedGenerating = await waitForCondition(async () => {
    const stillGoingRaw = await win.webContents.executeJavaScript(isStillGeneratingScript).catch(() => "true");
    if (stillGoingRaw === "true") {
      consecutiveCleanChecks = 0;
      return null;
    }
    consecutiveCleanChecks++;
    return consecutiveCleanChecks >= 3 ? true : null;
  }, waitTimeoutMs, 2500);
  if (!finishedGenerating) {
    throw new Error("El video de Flow no terminó de generarse a tiempo.");
  }
  await new Promise(resolve => setTimeout(resolve, 2000));
  const downloadRect = await waitForCondition(async () => {
    const raw = await win.webContents.executeJavaScript(findDownloadButtonScript).catch(() => null);
    return raw ? JSON.parse(raw) : null;
  }, 20000, 1500);
  if (!downloadRect) {
    throw new Error("Flow no dejó descargar el video generado (¿la generación falló?).");
  }
  await clickElementAt(win, downloadRect.x, downloadRect.y);
  await new Promise(resolve => setTimeout(resolve, 600));
  const qualityItemRect = await waitForCondition(async () => {
    const raw = await win.webContents.executeJavaScript(findDownloadQualityMenuItemScript).catch(() => null);
    return raw ? JSON.parse(raw) : null;
  }, 8000, 500);
  const downloadPromise = waitForNextDownload(win, 60000);
  if (qualityItemRect) {
    await clickElementAt(win, qualityItemRect.x, qualityItemRect.y);
  }
  const downloaded = await downloadPromise;
  const imported = await importDownloadedFileToLibrary(downloaded.filePath, downloaded.mimeType || "video/mp4", downloaded.filename || "flow-video.mp4");
  return {
    videoUrl: imported.url,
    mediaId: crypto.randomUUID(),
    accountLabel: account.label,
    done: true
  };
}
function getActiveAccountWindows() {
  const activeAccounts = loadAccountsRegistry().filter(account => account.connected && account.projectId);
  if (!activeAccounts.length) {
    const allAccounts = loadAccountsRegistry();
    if (!allAccounts.length) {
      throw new Error("No hay cuentas registradas. Conecta al menos una cuenta de Google.");
    }
    const firstAccount = allAccounts[0];
    const win = getOrOpenAccountWindow(firstAccount.id, false);
    return [{
      account: firstAccount,
      win: win
    }];
  }
  return activeAccounts.map(account => ({
    account: account,
    win: getOrOpenAccountWindow(account.id, false)
  }));
}
const executeFlowRequest = async ({
  type: requestType,
  payload = {}
}) => {
  const activeWindows = getActiveAccountWindows();
  let preferredEntry = null;
  if (payload.accountId) {
    preferredEntry = activeWindows.find(entry => entry.account.id === payload.accountId);
  } else if (payload.projectId) {
    preferredEntry = activeWindows.find(entry => entry.account.projectId === payload.projectId);
  }
  const orderedEntries = [];
  if (preferredEntry) {
    orderedEntries.push(preferredEntry);
    for (const entry of activeWindows) {
      if (entry.account.id !== preferredEntry.account.id) {
        orderedEntries.push(entry);
      }
    }
  } else {
    const startIndex = electronRoundRobin % activeWindows.length;
    electronRoundRobin++;
    for (let i = 0; i < activeWindows.length; i++) {
      orderedEntries.push(activeWindows[(startIndex + i) % activeWindows.length]);
    }
  }
  let lastError = null;
  for (let attemptIndex = 0; attemptIndex < orderedEntries.length; attemptIndex++) {
    const {
      account: account,
      win: win
    } = orderedEntries[attemptIndex];
    if (!win || win.isDestroyed()) {
      continue;
    }
    try {
      await ensureAccountOnFlow(account, win);
      if (requestType === "FLOW_CHECK") {
        const accounts = loadAccountsRegistry();
        const connectedAccounts = accounts.filter(account => account.connected && account.projectId);
        return {
          connected: connectedAccounts.length > 0,
          activeAccountsCount: connectedAccounts.length,
          projects: connectedAccounts.map((account, index) => ({
            index: index,
            projectId: account.projectId,
            label: account.label
          }))
        };
      }
      const callFlowApi = async (endpoint, body, recaptchaAction, method = "POST") => {
        let token = await getAccountAccessToken(account);
        if (!token) {
          token = await refreshAccountSession(account, win);
        }
        if (!token) {
          if (!win.isVisible()) {
            win.show();
            win.focus();
          }
          return {
            ok: false,
            error: "Inicia sesión en Google Flow en " + account.label + "."
          };
        }
        const script = "(async () => {\n        try {\n          const token = " + JSON.stringify(token) + ";\n          const requestBody = " + JSON.stringify(body || {}) + ";\n          const action = " + (recaptchaAction ? JSON.stringify(recaptchaAction) : "null") + ";\n          const siteKey = \"" + RECAPTCHA_SITE_KEY + "\";\n          const method = \"" + method + "\";\n\n          const doFetchWithFreshToken = async () => {\n            if (action && method === \"POST\") {\n              const enterprise = window.grecaptcha?.enterprise;\n              if (enterprise) {\n                if (typeof enterprise.ready === \"function\") await new Promise(r => enterprise.ready(r));\n                try {\n                  const rToken = await enterprise.execute(siteKey, { action });\n                  if (rToken) {\n                    if (requestBody.clientContext?.recaptchaContext) requestBody.clientContext.recaptchaContext.token = rToken;\n                    if (requestBody.recaptchaContext) requestBody.recaptchaContext.token = rToken;\n                    for (const req of (requestBody.requests || [])) {\n                      if (req.clientContext?.recaptchaContext) req.clientContext.recaptchaContext.token = rToken;\n                    }\n                  }\n                } catch (recaptchaErr) {\n                  console.warn(\"reCAPTCHA enterprise execute error:\", recaptchaErr);\n                }\n              }\n            }\n\n            const fetchOpts = {\n              method,\n              credentials: \"include\",\n              headers: {\n                \"Authorization\": \"Bearer \" + token,\n                \"Content-Type\": \"text/plain;charset=UTF-8\"\n              },\n              body: method === \"POST\" ? JSON.stringify(requestBody) : undefined\n            };\n\n            const res = await fetch(\"" + endpoint + "\", fetchOpts);\n            const text = await res.text();\n            let data;\n            try { data = JSON.parse(text); } catch(_) { data = text; }\n            return { ok: res.ok, status: res.status, data, text };\n          };\n\n          let result = await doFetchWithFreshToken();\n          if (!result.ok && /recaptcha/i.test(result.data?.error?.message || result.text || \"\")) {\n            await new Promise(r => setTimeout(r, 1800));\n            result = await doFetchWithFreshToken();\n          }\n\n          if (!result.ok) return { ok: false, error: result.data?.error?.message || \"HTTP \" + result.status + \": \" + String(result.text).slice(0, 250), status: result.status };\n          return { ok: true, data: result.data };\n        } catch (err) {\n          return { ok: false, error: err.message };\n        }\n      })()";
        let result = await win.webContents.executeJavaScript(script);
        if (!result?.ok && (result?.status === 401 || /authentication credentials|OAuth 2|access token|login cookie|401/i.test(result?.error || ""))) {
          writeLog("accounts", "401 en " + account.label + ", renovando sesión...");
          const newToken = await refreshAccountSession(account, win);
          if (newToken && newToken !== token) {
            const retryScript = script.replace(JSON.stringify(token), JSON.stringify(newToken));
            result = await win.webContents.executeJavaScript(retryScript);
          }
        }
        if (!result?.ok) {
          throw new Error(result?.error || "La cuenta Google Flow no respondió.");
        }
        return result.data;
      };
      if (requestType === "FLOW_GENERATE_TEXT" || requestType === "FLOW_TRANSCRIBE") {
        const textGenUrl = "https://aisandbox-pa.googleapis.com/v1/flow:generateContent";
        const textGenBody = {
          model: payload.model || "gemini-3-flash-preview",
          contents: [{
            role: "user",
            parts: payload.parts
          }],
          thinkingConfig: {
            thinkingLevel: payload.thinkingLevel || "MEDIUM"
          },
          requestContext: {
            flowSdkInfo: TEXT_APPLET
          },
          recaptchaContext: {
            token: "PLACEHOLDER",
            applicationType: "RECAPTCHA_APPLICATION_TYPE_WEB"
          }
        };
        try {
          const response = await callFlowApi(textGenUrl, textGenBody, "TEXT_GENERATION");
          const resultText = (response?.candidates?.[0]?.content?.parts || []).map(part => part.text || "").filter(Boolean).join("\n").trim();
          if (!resultText) {
            throw new Error("Flow no devolvió texto utilizable.");
          }
          return {
            text: resultText
          };
        } catch (err) {
          lastError = err;
          if (orderedEntries.length > 1) {
            continue;
          }
          throw err;
        }
      }
      const uploadReferenceImage = async (account, win, image) => {
        if (!image?.data) {
          return null;
        }
        const base64Data = String(image.data).replace(/^data:image\/[a-z]+;base64,/, "").trim();
        const mimeType = image.mimeType || "image/jpeg";
        const fileName = image.name || "character_ref_" + Date.now() + ".jpg";
        const uploadUrl = "https://aisandbox-pa.googleapis.com/v1/flow/uploadImage";
        const cacheKey = account.id + "_" + account.projectId + "_" + base64Data.length + "_" + base64Data.slice(0, 35);
        if (referenceCache.has(cacheKey)) {
          return referenceCache.get(cacheKey);
        }
        if (activeUploads.has(cacheKey)) {
          return await activeUploads.get(cacheKey);
        }
        const uploadPromise = (async () => {
          let token = await getAccountAccessToken(account);
          if (!token) {
            token = await refreshAccountSession(account, win);
          }
          if (!token) {
            if (win && !win.isDestroyed() && !win.isVisible()) {
              win.show();
              win.focus();
            }
            return null;
          }
          const uploadPayload = JSON.stringify({
            clientContext: {
              projectId: account.projectId,
              tool: "PINHOLE"
            },
            fileName: fileName,
            imageBytes: base64Data,
            isHidden: false,
            isUserUploaded: true,
            mimeType: mimeType
          });
          const script = "(async () => {\n          try {\n            const token = " + JSON.stringify(token) + ";\n            const resp = await fetch(\"" + uploadUrl + "\", {\n              method: \"POST\",\n              credentials: \"include\",\n              headers: {\n                \"Authorization\": \"Bearer \" + token,\n                \"Content-Type\": \"text/plain;charset=UTF-8\"\n              },\n              body: " + JSON.stringify(uploadPayload) + "\n            });\n\n            if (!resp.ok) {\n              const txt = await resp.text();\n              return { ok: false, error: \"HTTP \" + resp.status + \": \" + txt.substring(0, 300), status: resp.status };\n            }\n            const data = await resp.json();\n            return { ok: true, data };\n          } catch (err) {\n            return { ok: false, error: err.message };\n          }\n        })()";
          let result = await win.webContents.executeJavaScript(script);
          if (!result?.ok && (result?.status === 401 || /authentication credentials|OAuth 2|access token|login cookie|401/i.test(result?.error || ""))) {
            writeLog("accounts", "401 en upload (" + account.label + "), renovando sesión...");
            const newToken = await refreshAccountSession(account, win);
            if (newToken && newToken !== token) {
              const retryScript = script.replace(JSON.stringify(token), JSON.stringify(newToken));
              result = await win.webContents.executeJavaScript(retryScript);
            }
          }
          if (result?.ok && result.data?.media?.name) {
            writeLog("flow:upload", "Éxito en cuenta " + account.label + ": " + result.data.media.name);
            referenceCache.set(cacheKey, result.data.media.name);
            return result.data.media.name;
          }
          if (!result?.ok) {
            writeLog("flow:upload:error", "Cuenta " + account.label + ": " + result?.error);
          }
          return null;
        })();
        activeUploads.set(cacheKey, uploadPromise);
        try {
          return await uploadPromise;
        } finally {
          activeUploads.delete(cacheKey);
        }
      };
      if (requestType === "FLOW_GENERATE_IMAGE") {
        if (!account.projectId) {
          throw new Error("La cuenta " + account.label + " no tiene un proyecto seleccionado.");
        }
        const hasReference = Boolean(payload.referenceImage || payload.referenceImages?.length || payload.referenceMediaId);
        // No se logró automatizar el adjuntar la imagen de referencia dentro de Flow (ver
        // PENDIENTE_ACTUALIZACIONES_1.8.7.md) — como mitigación mientras tanto, cuando el
        // usuario configuró un Avatar/Estilo en el proyecto, reforzamos el prompt con una
        // instrucción explícita de continuidad en vez de mandar la imagen en sí.
        const effectivePrompt = hasReference ? "Mantén exactamente el mismo personaje/sujeto, su apariencia física, ropa, colores y el mismo estilo visual usados en las imágenes anteriores de este proyecto. " + String(payload.prompt || "") : payload.prompt;
        try {
          const result = await generateImageViaFlowUI(account, win, effectivePrompt);
          return result;
        } catch (err) {
          lastError = err;
          writeLog("flow:image:error", "Error en cuenta " + account.label + ": " + err.message);
          if (orderedEntries.length > 1) {
            continue;
          }
          throw err;
        }
      }
      if (requestType === "FLOW_VIDEO_START") {
        if (!account.projectId) {
          throw new Error("La cuenta " + account.label + " no tiene un proyecto seleccionado.");
        }
        if (String(payload.prompt || "").length > 12000) {
          throw new Error("El prompt de video supera 12000 caracteres.");
        }
        try {
          // payload.model/payload.duration vienen del selector "Imagen a Video" del
          // Inspector (dist/assets, componente videoModel/videoDuration) — hasta ahora se
          // guardaban en el estado de la escena pero nunca llegaban a la automatización.
          // payload.format es el formato del proyecto ("short" = 9:16, "youtube" = 16:9).
          const requestedDuration = Number(payload.duration) || null;
          const requestedAspectRatio = payload.format === "short" ? "9:16" : payload.format === "youtube" ? "16:9" : null;
          const result = await generateVideoViaFlowUI(account, win, payload.prompt, {
            aspectRatio: requestedAspectRatio,
            duration: requestedDuration
          });
          writeLog("flow:video", "Video generado y descargado en " + account.label + " (duración pedida: " + (requestedDuration || "por defecto") + "s): " + result.videoUrl);
          return result;
        } catch (err) {
          lastError = err;
          writeLog("flow:video:error", "Error en cuenta " + account.label + ": " + err.message);
          if (orderedEntries.length > 1) {
            continue;
          }
          throw err;
        }
      }
      if (requestType === "FLOW_VIDEO_STATUS") {
        if (!payload.mediaName) {
          throw new Error("Falta el identificador de la operación de video.");
        }
        const projectId = payload.projectId || account.projectId;
        if (!projectId) {
          throw new Error("La cuenta " + account.label + " no tiene un proyecto seleccionado.");
        }
        const statusResponse = await callFlowApi(VIDEO_STATUS_ENDPOINT, {
          media: [{
            name: payload.mediaName,
            projectId: projectId
          }]
        }, null);
        const mediaEntry = statusResponse?.media?.find(m => m?.name === payload.mediaName) || statusResponse?.media?.[0];
        const status = mediaEntry?.mediaMetadata?.mediaStatus?.mediaGenerationStatus;
        if (status === "MEDIA_GENERATION_STATUS_SUCCESSFUL" && mediaEntry?.video?.generatedVideo) {
          const videoUrl = "https://flow.google.com/fx/api/trpc/media.getMediaUrlRedirect?name=" + encodeURIComponent(mediaEntry.name);
          writeLog("flow:video", "Video completado: " + mediaEntry.name);
          return {
            done: true,
            status: status,
            mediaName: mediaEntry.name,
            videoUrl: videoUrl
          };
        }
        if (ACTIVE_VIDEO_STATUSES.has(status)) {
          return {
            done: false,
            status: status
          };
        }
        const errorMessage = mediaEntry?.mediaMetadata?.mediaStatus?.error?.message || mediaEntry?.mediaMetadata?.mediaStatus?.failureReasons?.[0]?.message;
        if ((/not found/i.test(errorMessage || "") || !mediaEntry) && attemptIndex < orderedEntries.length - 1) {
          console.log("[FLOWSTUDIO] Video no encontrado en " + account.label + ", probando siguiente cuenta...");
          continue;
        }
        return {
          done: false,
          failed: true,
          status: status,
          error: errorMessage || "Google Flow terminó el video con estado " + (status || "desconocido") + "."
        };
      }
      if (requestType === "FLOW_IMPORT_MEDIA") {
        let parsedUrl;
        try {
          parsedUrl = new URL(String(payload.url || ""));
        } catch (err) {
          throw new Error("La URL del video generado no es válida.");
        }
        const isAllowedHost = parsedUrl.protocol === "https:" && (parsedUrl.hostname === "flow.google.com" || parsedUrl.hostname === "flow.google" || parsedUrl.hostname.endsWith(".flow.google.com") || parsedUrl.hostname === "labs.google" || parsedUrl.hostname === "flow-content.google" || parsedUrl.hostname.endsWith(".googleusercontent.com") || parsedUrl.hostname.endsWith(".google.com"));
        if (!isAllowedHost) {
          throw new Error("El host del video generado no está permitido.");
        }
        const script = "(async () => {\n        try {\n          const response = await fetch(" + JSON.stringify(parsedUrl.href) + ", { credentials: \"include\", redirect: \"follow\" });\n          if (!response.ok) return { ok: false, error: \"Flow media HTTP \" + response.status };\n          const blob = await response.blob();\n          if (blob.type && (blob.type.includes(\"text/html\") || blob.type.includes(\"application/json\"))) {\n            return { ok: false, error: \"Google Flow devolvió una página HTML en lugar del video MP4 (sesión no autenticada o enlace de video expirado).\" };\n          }\n          if (blob.size < 40000) {\n            return { ok: false, error: \"El archivo recibido de Flow es demasiado pequeño (\" + blob.size + \" bytes) para ser un video MP4 válido.\" };\n          }\n          if (blob.size > 200 * 1024 * 1024) return { ok: false, error: \"El video supera el límite local de 200 MB.\" };\n          const imported = await fetch(\"http://127.0.0.1:" + PORT_RENDER + "/api/import\", {\n            method: \"POST\",\n            headers: { \"Content-Type\": blob.type || " + JSON.stringify(payload.mime || "video/mp4") + ", \"x-filename\": \"flow-video.mp4\" },\n            body: blob\n          });\n          const data = await imported.json();\n          return imported.ok && data?.url\n            ? { ok: true, data }\n            : { ok: false, error: data?.error || \"El servidor local rechazó el video.\" };\n        } catch (error) {\n          return { ok: false, error: error.message };\n        }\n      })()";
        const importResult = await win.webContents.executeJavaScript(script);
        if (!importResult?.ok) {
          throw new Error("No se pudo copiar el video desde Flow: " + (importResult?.error || "error desconocido"));
        }
        return importResult.data;
      }
      if (requestType === "FLOW_UPLOAD_INGREDIENT") {
        if (!account.projectId) {
          throw new Error("La cuenta " + account.label + " no tiene un proyecto seleccionado.");
        }
        const mediaId = await uploadReferenceImage(account, win, {
          data: payload.data,
          mimeType: payload.mimeType,
          name: payload.name
        });
        if (!mediaId) {
          throw new Error("No se pudo subir el ingrediente a Flow.");
        }
        recordAccountSuccess(account.id);
        return {
          mediaId: mediaId,
          name: mediaId
        };
      }
      throw new Error("Tipo de solicitud desconocida: " + requestType);
    } catch (err) {
      lastError = err;
      const errorMessage = err?.message || String(err);
      const isRetryable = /401|429|quota|unauthorized|rate limit|exhausted|credentials|recaptcha|fetch failed|no respondió/i.test(errorMessage);
      recordAccountError(account.id, errorMessage, err.status);
      writeLog("accounts:failover", "[Auto-Failover] Fallo en " + account.label + ": " + errorMessage + ". Reintentando con siguiente cuenta si disponible...");
      broadcastAccountsUpdate();
      if (isRetryable && attemptIndex < orderedEntries.length - 1) {
        continue;
      }
      throw err;
    }
  }
  if (lastError) {
    throw lastError;
  }
  throw new Error("Tipo de solicitud desconocida o sin cuentas disponibles: " + requestType);
};
ipcMain.handle("accounts:get-all", () => {
  const accounts = loadAccountsRegistry();
  return accounts.map(account => ({
    ...account,
    health: getAccountHealth(account.id, Boolean(account.connected && account.projectId))
  }));
});
ipcMain.handle("accounts:test-connection", async (event, accountId) => {
  try {
    const accounts = loadAccountsRegistry();
    const account = accounts.find(a => a.id === accountId);
    if (!account) {
      return {
        ok: false,
        error: "Cuenta no encontrada en el registro."
      };
    }
    const win = accountWindows.get(account.id);
    if (!win || win.isDestroyed()) {
      return {
        ok: false,
        error: "La ventana de Flow para esta cuenta no está abierta. Haz clic en \"Conectar\" primero."
      };
    }
    await ensureAccountOnFlow(account, win);
    const token = await getAccountAccessToken(account);
    if (!token) {
      recordAccountError(account.id, "Token de acceso ausente (401)", 401);
      broadcastAccountsUpdate();
      return {
        ok: false,
        error: "Token de acceso ausente. Inicia sesión en Google Flow."
      };
    }
    recordAccountSuccess(account.id);
    broadcastAccountsUpdate();
    return {
      ok: true,
      message: "Conexión verificada con " + account.label + ". Token activo y válido."
    };
  } catch (err) {
    recordAccountError(accountId, err.message, 500);
    broadcastAccountsUpdate();
    return {
      ok: false,
      error: err.message
    };
  }
});
ipcMain.handle("accounts:open-login", (event, accountId) => {
  const accounts = loadAccountsRegistry();
  const resolvedAccountId = accountId || accounts[0]?.id || "acc_1";
  getOrOpenAccountWindow(resolvedAccountId, true);
  return {
    success: true
  };
});
ipcMain.handle("accounts:update-tier", async (event, {
  accountId: targetAccountId,
  tier: newTier
}) => {
  const accounts = loadAccountsRegistry();
  const account = accounts.find(a => a.id === targetAccountId);
  if (account) {
    account.tier = newTier;
    account.tierManuallySet = true;
    saveAccountsRegistry(accounts);
    broadcastAccountsUpdate();
    return {
      success: true
    };
  }
  return {
    success: false,
    error: "Cuenta no encontrada"
  };
});
ipcMain.handle("accounts:reconnect", (event, accountId) => {
  const accounts = loadAccountsRegistry();
  const account = accounts.find(a => a.id === accountId);
  if (account) {
    getOrOpenAccountWindow(account.id, true);
    return {
      success: true
    };
  }
  return {
    success: false,
    error: "Cuenta no encontrada"
  };
});
ipcMain.handle("accounts:reload", async (event, accountId) => {
  const accounts = loadAccountsRegistry();
  const account = accounts.find(a => a.id === accountId);
  if (!account) {
    return {
      success: false,
      error: "Cuenta no encontrada"
    };
  }
  accountSessionCache.delete(account.id);
  const win = accountWindows.get(account.id);
  if (win && !win.isDestroyed()) {
    await refreshAccountSession(account, win);
    await extractAccountEmail(account.id, win);
  } else {
    getOrOpenAccountWindow(account.id, false);
  }
  broadcastAccountsUpdate();
  return {
    success: true
  };
});
ipcMain.handle("accounts:reload-all", async () => {
  const accounts = loadAccountsRegistry();
  accountSessionCache.clear();
  for (const account of accounts) {
    const win = accountWindows.get(account.id);
    if (win && !win.isDestroyed()) {
      await refreshAccountSession(account, win);
      await extractAccountEmail(account.id, win);
    } else if (account.connected) {
      getOrOpenAccountWindow(account.id, false);
    }
  }
  broadcastAccountsUpdate();
  return {
    success: true
  };
});
ipcMain.handle("accounts:logout", async (event, accountId) => {
  const accounts = loadAccountsRegistry();
  const account = accounts.find(a => a.id === accountId) || accounts[0];
  if (!account) {
    return {
      success: false,
      error: "Cuenta no encontrada"
    };
  }
  try {
    const win = accountWindows.get(account.id);
    if (win && !win.isDestroyed()) {
      win.destroy();
    }
    accountWindows.delete(account.id);
    const accountSession = session.fromPartition(account.partition);
    if (typeof accountSession.clearData === "function") {
      await accountSession.clearData({
        dataTypes: ["cookies", "localStorage", "indexedDB", "serviceWorkers", "cache", "fileSystems", "webSQL"]
      });
    } else {
      await accountSession.clearStorageData();
      await accountSession.clearCache();
    }
    if (typeof accountSession.clearAuthCache === "function") {
      await accountSession.clearAuthCache();
    }
    if (typeof accountSession.closeAllConnections === "function") {
      await accountSession.closeAllConnections();
    }
    account.connected = false;
    account.projectId = "";
    account.email = "";
    account.lastActive = Date.now();
    saveAccountsRegistry(accounts);
    broadcastAccountsUpdate();
    writeLog("accounts", "Sesión de " + account.label + " eliminada.");
    getOrOpenAccountWindow(account.id, true);
    return {
      success: true,
      account: account
    };
  } catch (err) {
    writeLog("accounts:error", "No se pudo cerrar sesión: " + (err.stack || err.message));
    return {
      success: false,
      error: err.message || String(err)
    };
  }
});
ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});
ipcMain.handle("media:reveal-in-folder", async (event, mediaUrl) => {
  try {
    const url = String(mediaUrl || "").trim();
    if (!url) {
      return {
        ok: false,
        error: "No se proporcionó una URL."
      };
    }
    const rendersDir = path.join(USER_MEDIA_DIR, "Renders");
    const imagesDir = path.join(USER_MEDIA_DIR, "Imagenes");
    const runtimeRendersDir = path.join(DATA_ROOT, "runtime", "renders");
    const runtimeLibraryDir = path.join(DATA_ROOT, "runtime", "library");
    fs.mkdirSync(rendersDir, {
      recursive: true
    });
    fs.mkdirSync(imagesDir, {
      recursive: true
    });
    if (url.startsWith("http://127.0.0.1") || url.startsWith("http://localhost")) {
      const parsedUrl = new URL(url);
      const fileName = path.basename(decodeURIComponent(parsedUrl.pathname));
      const candidatePaths = [path.join(rendersDir, fileName), path.join(imagesDir, fileName), path.join(runtimeRendersDir, fileName), path.join(runtimeLibraryDir, fileName)];
      for (const candidatePath of candidatePaths) {
        if (fs.existsSync(candidatePath)) {
          shell.showItemInFolder(candidatePath);
          return {
            ok: true,
            path: candidatePath
          };
        }
      }
    }
    if (fs.existsSync(url)) {
      shell.showItemInFolder(url);
      return {
        ok: true,
        path: url
      };
    }
    if (url.startsWith("https://") || url.startsWith("http://") || url.startsWith("data:")) {
      let extension = ".png";
      if (url.includes(".mp4") || url.includes("video")) {
        extension = ".mp4";
      } else if (url.includes(".jpg") || url.includes(".jpeg")) {
        extension = ".jpg";
      } else if (url.includes(".webp")) {
        extension = ".webp";
      }
      const crypto = require("crypto");
      const hash = crypto.createHash("md5").update(url).digest("hex").slice(0, 10);
      const targetDir = extension === ".mp4" ? rendersDir : imagesDir;
      const destPath = path.join(targetDir, "escena_" + hash + extension);
      if (!fs.existsSync(destPath)) {
        if (url.startsWith("data:")) {
          const base64Data = url.split(",")[1];
          if (base64Data) {
            fs.writeFileSync(destPath, Buffer.from(base64Data, "base64"));
          }
        } else {
          const httpModule = url.startsWith("https") ? require("https") : require("http");
          await new Promise(resolve => {
            const req = httpModule.get(url, res => {
              if (res.statusCode === 200) {
                const fileStream = fs.createWriteStream(destPath);
                res.pipe(fileStream);
                fileStream.on("finish", () => {
                  fileStream.close();
                  resolve();
                });
              } else {
                resolve();
              }
            });
            req.on("error", () => resolve());
            req.setTimeout(8000, () => {
              req.destroy();
              resolve();
            });
          });
        }
      }
      if (fs.existsSync(destPath)) {
        shell.showItemInFolder(destPath);
        return {
          ok: true,
          path: destPath
        };
      }
    }
    shell.openPath(rendersDir);
    return {
      ok: true,
      path: rendersDir
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message || "Error al abrir la carpeta."
    };
  }
});
ipcMain.handle("renders:open-folder", () => {
  try {
    const rendersDir = path.join(USER_MEDIA_DIR, "Renders");
    if (!fs.existsSync(rendersDir)) {
      fs.mkdirSync(rendersDir, {
        recursive: true
      });
    }
    shell.openPath(rendersDir);
    return {
      ok: true,
      path: rendersDir
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message
    };
  }
});
ipcMain.handle("settings:get-user-media-dir", () => USER_MEDIA_DIR);
ipcMain.handle("flow:execute", async (event, payload) => {
  try {
    const result = await executeFlowRequest(payload || {});
    return {
      __flowtubeEnvelope: true,
      ok: true,
      data: result
    };
  } catch (err) {
    const errorMessage = err?.message || String(err);
    writeLog("flow:error", errorMessage);
    return {
      __flowtubeEnvelope: true,
      ok: false,
      error: errorMessage
    };
  }
});
ipcMain.handle("services:get-status", () => ({
  backend: Boolean(serverProcess && !serverProcess.killed),
  web: USE_VITE_DEV ? Boolean(viteProcess && !viteProcess.killed) : Boolean(serverProcess && !serverProcess.killed),
  mode: USE_VITE_DEV ? "development" : "production",
  logFile: LOG_FILE
}));
ipcMain.handle("services:get-logs", (event, limit = 300) => {
  try {
    if (!fs.existsSync(LOG_FILE)) {
      return [];
    }
    return fs.readFileSync(LOG_FILE, "utf-8").split(/\r?\n/).filter(Boolean).slice(-Math.max(20, Math.min(2000, Number(limit) || 300)));
  } catch (err) {
    return ["No se pudieron leer los logs: " + err.message];
  }
});
ipcMain.handle("logs:append", (event, level, message) => {
  writeLog(level || "UI", message || "");
  return true;
});
ipcMain.handle("logs:clear", () => {
  try {
    fs.mkdirSync(LOG_DIR, {
      recursive: true
    });
    fs.writeFileSync(LOG_FILE, "", "utf-8");
    return true;
  } catch (err) {
    return false;
  }
});
ipcMain.handle("check-flow-status", () => {
  const accounts = loadAccountsRegistry();
  const connectedCount = accounts.filter(account => account.connected && account.projectId).length;
  return {
    connectedCount: connectedCount,
    totalAccounts: accounts.length,
    isOpen: accountWindows.size > 0
  };
});
let downloadedInstallerPath = null;
ipcMain.handle("updater:download", async (event, {
  url: downloadUrl,
  version: requestedVersion
}) => {
  if (!downloadUrl) {
    throw new Error("No se proporcionó una URL de descarga válida.");
  }
  const cleanVersion = String(requestedVersion || "latest").replace(/^v/, "");
  const isWindows = process.platform === "win32";
  const isMac = process.platform === "darwin";
  const fileExtension = isWindows ? ".exe" : isMac ? ".dmg" : ".zip";
  let resolvedDownloadUrl = downloadUrl;
  if (isWindows) {
    if (!resolvedDownloadUrl.endsWith(".exe") || resolvedDownloadUrl.includes("/releases/tag/") || resolvedDownloadUrl.includes(".dmg") || resolvedDownloadUrl.includes(".zip")) {
      resolvedDownloadUrl = "https://github.com/nmediastudio/flowstudio-releases/releases/download/v" + cleanVersion + "/FLOWSTUDIO_Setup_" + cleanVersion + "_x64.exe";
    }
  } else if (isMac) {
    if (!resolvedDownloadUrl.endsWith(".dmg") || resolvedDownloadUrl.includes("/releases/tag/") || resolvedDownloadUrl.endsWith(".exe")) {
      const arch = process.arch === "arm64" ? "arm64" : "x64";
      resolvedDownloadUrl = "https://github.com/nmediastudio/flowstudio-releases/releases/download/v" + cleanVersion + "/FLOWSTUDIO_" + cleanVersion + "_mac_" + arch + ".dmg";
    }
  }
  const tempDir = app.getPath("temp");
  const installerPath = path.join(tempDir, "FLOWSTUDIO_Update_" + cleanVersion + "_" + Date.now() + fileExtension);
  downloadedInstallerPath = installerPath;
  return new Promise((resolve, reject) => {
    if (resolvedDownloadUrl.startsWith("file://") || resolvedDownloadUrl.includes(":\\") && fs.existsSync(resolvedDownloadUrl)) {
      const localFilePath = resolvedDownloadUrl.startsWith("file://") ? fileURLToPath(resolvedDownloadUrl) : resolvedDownloadUrl;
      try {
        fs.copyFileSync(localFilePath, installerPath);
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send("updater:progress", {
            percent: 100,
            receivedBytes: 100,
            totalBytes: 100,
            version: cleanVersion
          });
          mainWindow.webContents.send("updater:downloaded", {
            version: cleanVersion,
            filePath: installerPath
          });
        }
        return resolve({
          ok: true,
          filePath: installerPath
        });
      } catch (err) {
        return reject(err);
      }
    }
    function downloadFrom(url, redirectCount = 0) {
      if (redirectCount > 8) {
        return reject(new Error("Demasiadas redirecciones en el enlace de descarga."));
      }
      let parsedUrl;
      try {
        parsedUrl = new URL(url);
      } catch (err) {
        return reject(new Error("URL de descarga inválida: " + url));
      }
      const httpModule = parsedUrl.protocol === "https:" ? require("https") : require("http");
      const req = httpModule.get(url, {
        headers: {
          "User-Agent": "FLOWSTUDIO-Desktop-AutoUpdater"
        }
      }, res => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, url).href;
          return downloadFrom(redirectUrl, redirectCount + 1);
        }
        if (res.statusCode !== 200) {
          if (res.statusCode === 404 && !url.includes("127.0.0.1")) {
            const fallbackUrl = "http://127.0.0.1:" + PORT_RENDER + "/api/download/latest";
            writeLog("updater", "URL remota devolvió 404, reintentando con fallback local: " + fallbackUrl);
            return downloadFrom(fallbackUrl, redirectCount + 1);
          }
          return reject(new Error("Error descargando actualización (HTTP " + res.statusCode + ")"));
        }
        const totalBytes = parseInt(res.headers["content-length"] || "0", 10);
        let receivedBytes = 0;
        const fileStream = fs.createWriteStream(installerPath);
        res.on("data", chunk => {
          receivedBytes += chunk.length;
          fileStream.write(chunk);
          const percent = totalBytes > 0 ? Math.round(receivedBytes / totalBytes * 100) : 0;
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send("updater:progress", {
              percent: percent,
              receivedBytes: receivedBytes,
              totalBytes: totalBytes,
              version: cleanVersion
            });
          }
        });
        res.on("end", () => {
          fileStream.end(() => {
            try {
              const fd = fs.openSync(installerPath, "r");
              const headerBuffer = Buffer.alloc(32);
              fs.readSync(fd, headerBuffer, 0, 32, 0);
              fs.closeSync(fd);
              const headerText = headerBuffer.toString("utf8").trim().toLowerCase();
              if (headerText.startsWith("<!doctype") || headerText.startsWith("<html")) {
                fs.unlinkSync(installerPath);
                downloadedInstallerPath = null;
                return reject(new Error("El archivo descargado devolvió una página web en vez del instalador ejecutable."));
              }
            } catch (err) {}
            if (mainWindow && !mainWindow.isDestroyed()) {
              mainWindow.webContents.send("updater:downloaded", {
                version: cleanVersion,
                filePath: installerPath
              });
            }
            resolve({
              ok: true,
              filePath: installerPath
            });
          });
        });
        res.on("error", err => {
          fileStream.destroy();
          fs.unlink(installerPath, () => {});
          reject(err);
        });
      });
      req.on("error", err => {
        fs.unlink(installerPath, () => {});
        reject(err);
      });
    }
    downloadFrom(resolvedDownloadUrl);
  });
});
ipcMain.handle("updater:install", async () => {
  if (!downloadedInstallerPath || !fs.existsSync(downloadedInstallerPath)) {
    throw new Error("El archivo de actualización no se encontró. Por favor vuelve a descargarlo.");
  }
  const isWindows = process.platform === "win32";
  const isMac = process.platform === "darwin";
  if (isWindows) {
    try {
      const headerBuffer = Buffer.alloc(2);
      const fd = fs.openSync(downloadedInstallerPath, "r");
      fs.readSync(fd, headerBuffer, 0, 2, 0);
      fs.closeSync(fd);
      if (headerBuffer.toString() !== "MZ") {
        fs.unlinkSync(downloadedInstallerPath);
        downloadedInstallerPath = null;
        throw new Error("El archivo descargado no es un instalador ejecutable (.exe) válido.");
      }
    } catch (err) {
      if (err.message.includes("instalador ejecutable")) {
        throw err;
      }
    }
    isQuitting = true;
    const {
      spawn: spawn
    } = require("child_process");
    spawn(downloadedInstallerPath, [], {
      detached: true,
      shell: true,
      stdio: "ignore"
    }).unref();
    setTimeout(() => {
      app.quit();
      process.exit(0);
    }, 500);
  } else if (isMac) {
    shell.openPath(downloadedInstallerPath);
  }
  return {
    ok: true
  };
});
app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});
app.whenReady().then(async () => {
  try {
    if (session.defaultSession.extensions?.loadExtension) {
      await session.defaultSession.extensions.loadExtension(EXTENSION_DIR, {
        allowFileAccess: true
      });
    } else {
      await session.defaultSession.loadExtension(EXTENSION_DIR, {
        allowFileAccess: true
      });
    }
  } catch (err) {
    writeLog("electron:error", "Error cargando extension en defaultSession: " + (err.stack || err.message));
  }
  startBackendServer();
  if (USE_VITE_DEV) {
    startViteDevServer();
  }
  const backendReady = await waitForPort(PORT_RENDER);
  const webReady = USE_VITE_DEV ? await waitForPort(PORT_WEB) : backendReady;
  writeLog("electron", "Servicios listos: backend=" + backendReady + ", web=" + webReady + ", mode=" + (USE_VITE_DEV ? "dev" : "production"));
  await createMainWindow();
  autoReconnectAccountsInBackground();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
app.on("before-quit", () => {
  isQuitting = true;
  clearTimeout(backendRestartTimer);
  clearTimeout(viteRestartTimer);
  accountWindows.forEach(win => {
    if (win && !win.isDestroyed()) {
      try {
        win.destroy();
      } catch (err) {}
    }
  });
  if (serverProcess) {
    try {
      serverProcess.kill();
    } catch (err) {}
  }
  if (viteProcess) {
    try {
      viteProcess.kill();
    } catch (err) {}
  }
});