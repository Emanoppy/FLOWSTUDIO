const {
  contextBridge,
  ipcRenderer
} = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  openGoogleFlow: payload => ipcRenderer.invoke("accounts:open-login", payload),
  getAccounts: () => ipcRenderer.invoke("accounts:get-all"),
  reconnectAccount: accountId => ipcRenderer.invoke("accounts:reconnect", accountId),
  reloadFlowAccount: accountId => ipcRenderer.invoke("accounts:reload", accountId),
  reloadAllFlowAccounts: () => ipcRenderer.invoke("accounts:reload-all"),
  updateAccountTier: (accountId, tier) => ipcRenderer.invoke("accounts:update-tier", {
    accountId: accountId,
    tier: tier
  }),
  testAccountConnection: accountId => ipcRenderer.invoke("accounts:test-connection", accountId),
  logoutGoogleFlow: accountId => ipcRenderer.invoke("accounts:logout", accountId),
  flowExecute: async (type, payload) => {
    const result = await ipcRenderer.invoke("flow:execute", {
      type: type,
      payload: payload
    });
    if (result?.__flowtubeEnvelope) {
      if (!result.ok) {
        throw new Error(result.error || "Google Flow rechazó la solicitud.");
      }
      return result.data;
    }
    return result;
  },
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
  revealMediaInFolder: mediaUrl => ipcRenderer.invoke("media:reveal-in-folder", mediaUrl),
  openRendersFolder: () => ipcRenderer.invoke("renders:open-folder"),
  getServiceStatus: () => ipcRenderer.invoke("services:get-status"),
  getAppLogs: limit => ipcRenderer.invoke("services:get-logs", limit),
  appendAppLog: (level, message) => ipcRenderer.invoke("logs:append", level, message),
  clearAppLogs: () => ipcRenderer.invoke("logs:clear"),
  checkFlowStatus: () => ipcRenderer.invoke("check-flow-status"),
  startDownloadUpdate: (url, version) => ipcRenderer.invoke("updater:download", {
    url: url,
    version: version
  }),
  installUpdate: () => ipcRenderer.invoke("updater:install"),
  onUpdateProgress: callback => {
    const listener = (event, data) => callback(data);
    ipcRenderer.on("updater:progress", listener);
    return () => ipcRenderer.removeListener("updater:progress", listener);
  },
  onUpdateDownloaded: callback => {
    const listener = (event, data) => callback(data);
    ipcRenderer.on("updater:downloaded", listener);
    return () => ipcRenderer.removeListener("updater:downloaded", listener);
  },
  onAccountsChanged: callback => {
    ipcRenderer.on("accounts:updated", (event, accounts) => callback(accounts));
  },
  onFlowStatusChanged: callback => {
    ipcRenderer.on("flow-status-changed", (event, status) => callback(status));
  },
  onServiceStatusChanged: callback => {
    ipcRenderer.on("services:status", (event, status) => callback(status));
  }
});