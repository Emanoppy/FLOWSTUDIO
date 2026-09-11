import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
import { r as React, j as jsx2 } from "./vendor-react-BbRiLirl.js";
import "./vendor-state-m3Xdu9cz.js";
const B = ({
  isOpen,
  onClose
}) => {
  var electronApi;
  const [accounts, setAccounts] = React.useState([]);
  const [extensionConnected, setExtensionConnected] = React.useState(false);
  const [extensionAvailable, setExtensionAvailable] = React.useState(true);
  const [busyAccountId, setBusyAccountId] = React.useState(null);
  const [statusMessage, setStatusMessage] = React.useState("");
  const isElectronApp = (electronApi = window.electronAPI) != null && !!electronApi.openGoogleFlow;
  const checkBrowserExtension = () => new Promise((resolve) => {
    const requestId = crypto.randomUUID();
    const timeoutId = setTimeout(() => {
      window.removeEventListener("message", handleExtensionMessage);
      resolve({
        available: false,
        connected: false,
        count: 0
      });
    }, 1800);
    function handleExtensionMessage(event) {
      var dataForConnected;
      var dataForCount;
      var dataForCountFallback;
      const messageData = event.data;
      if (event.source === window && (messageData == null ? void 0 : messageData.source) === "flowtube-extension" && messageData.requestId === requestId) {
        clearTimeout(timeoutId);
        window.removeEventListener("message", handleExtensionMessage);
        resolve({
          available: true,
          connected: !!messageData.ok && (dataForConnected = messageData.data) != null && !!dataForConnected.connected,
          count: ((dataForCount = messageData.data) == null ? void 0 : dataForCount.accountsCount) || ((dataForCountFallback = messageData.data) != null && dataForCountFallback.connected ? 1 : 0)
        });
      }
    }
    window.addEventListener("message", handleExtensionMessage);
    window.postMessage({
      source: "flowtube-web",
      requestId,
      type: "FLOW_CHECK",
      payload: {}
    }, "*");
  });
  const fetchAccounts = async () => {
    var electronApi2;
    try {
      if ((electronApi2 = window.electronAPI) != null && electronApi2.getAccounts) {
        const fetchedAccounts = await window.electronAPI.getAccounts();
        setAccounts(fetchedAccounts || []);
        setExtensionAvailable(true);
      } else {
        const extensionStatus = await checkBrowserExtension();
        setExtensionAvailable(extensionStatus.available);
        setExtensionConnected(extensionStatus.connected);
      }
    } catch (error) {
      console.error("Error consultando cuentas de Google Flow:", error);
    }
  };
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    fetchAccounts();
    const intervalId = setInterval(fetchAccounts, 2500);
    return () => clearInterval(intervalId);
  }, [isOpen]);
  React.useEffect(() => {
    var electronApi2;
    if ((electronApi2 = window.electronAPI) != null && electronApi2.onAccountsChanged) {
      window.electronAPI.onAccountsChanged((updatedAccounts) => setAccounts(updatedAccounts || []));
    }
  }, []);
  if (!isOpen) {
    return null;
  }
  const connectedAccounts = isElectronApp ? accounts.filter((account) => account.connected && account.projectId) : extensionConnected ? [1] : [];
  const handleConnectAccount = async (accountId) => {
    setStatusMessage("");
    setBusyAccountId(accountId);
    try {
      if (isElectronApp) {
        const result = await window.electronAPI.openGoogleFlow(accountId);
        if (result && result.success === false) {
          throw new Error(result.error || "No se pudo abrir Google Flow.");
        }
        setStatusMessage("Google Flow se abri\xF3 en una ventana dedicada. Inicia sesi\xF3n y entra en un proyecto para activar esta cuenta.");
      } else {
        const newWindow = window.open("https://flow.google.com", "_blank");
        if (!newWindow) {
          throw new Error("El navegador bloque\xF3 la pesta\xF1a. Permite ventanas emergentes.");
        }
        newWindow.opener = null;
        setStatusMessage("Inicia sesi\xF3n en un proyecto de Flow en tu navegador. La extensi\xF3n lo detectar\xE1 autom\xE1ticamente.");
      }
    } catch (error) {
      setStatusMessage("Error: " + error.message);
    } finally {
      setBusyAccountId(null);
    }
  };
  const handleOpenAccount = async (accountId) => handleConnectAccount(accountId);
  const handleRefreshAccount = async (accountId, accountLabel) => {
    var electronApi2;
    setStatusMessage("");
    setBusyAccountId(accountId);
    try {
      if (isElectronApp && (electronApi2 = window.electronAPI) != null && electronApi2.reloadFlowAccount) {
        await window.electronAPI.reloadFlowAccount(accountId);
        setStatusMessage("Sesi\xF3n y token de " + (accountLabel || "la cuenta") + " refrescados correctamente.");
      } else {
        await fetchAccounts();
        setStatusMessage("Cuentas actualizadas.");
      }
    } catch (error) {
      setStatusMessage("Error al refrescar cuenta: " + error.message);
    } finally {
      setBusyAccountId(null);
      fetchAccounts();
    }
  };
  const handleTestConnection = async (accountId, accountLabel) => {
    var electronApi2;
    setStatusMessage("");
    setBusyAccountId(accountId);
    try {
      if (isElectronApp && (electronApi2 = window.electronAPI) != null && electronApi2.testAccountConnection) {
        const testResult = await window.electronAPI.testAccountConnection(accountId);
        if (testResult.ok) {
          setStatusMessage("\u2705 " + (testResult.message || "Conexi\xF3n con " + accountLabel + " verificada con \xE9xito."));
        } else {
          setStatusMessage("\u26A0\uFE0F " + (testResult.error || "Fallo al verificar " + accountLabel + "."));
        }
      } else {
        setStatusMessage("Diagn\xF3stico disponible en la aplicaci\xF3n de escritorio.");
      }
      await fetchAccounts();
    } catch (error) {
      setStatusMessage("Error diagnosticando " + accountLabel + ": " + error.message);
    } finally {
      setBusyAccountId(null);
    }
  };
  const handleRefreshAll = async () => {
    var electronApi2;
    setStatusMessage("");
    setBusyAccountId("all");
    try {
      if (isElectronApp && (electronApi2 = window.electronAPI) != null && electronApi2.reloadAllFlowAccounts) {
        await window.electronAPI.reloadAllFlowAccounts();
        setStatusMessage("Todas las cuentas de Google Flow han sido refrescadas con nuevos tokens.");
      } else {
        await fetchAccounts();
        setStatusMessage("Cuentas actualizadas.");
      }
    } catch (error) {
      setStatusMessage("Error al refrescar: " + error.message);
    } finally {
      setBusyAccountId(null);
      fetchAccounts();
    }
  };
  const handleLogoutAccount = async (accountId, accountLabel) => {
    var electronApi2;
    var logoutFn;
    if (!isElectronApp) {
      setStatusMessage("En modo navegador, cierra sesi\xF3n directamente en la pesta\xF1a de Google Flow.");
      return;
    }
    if (window.confirm("\xBFDesconectar y borrar la sesi\xF3n de " + (accountLabel || "esta cuenta") + "?")) {
      setStatusMessage("");
      setBusyAccountId(accountId);
      try {
        const result = await ((logoutFn = (electronApi2 = window.electronAPI) == null ? void 0 : electronApi2.logoutGoogleFlow) == null ? void 0 : logoutFn.call(electronApi2, accountId));
        if (result == null || !result.success) {
          throw new Error((result == null ? void 0 : result.error) || "No se pudo cerrar la sesi\xF3n.");
        }
        setStatusMessage("Sesi\xF3n cerrada para " + accountLabel + ". Puedes iniciar sesi\xF3n con una cuenta nueva.");
        fetchAccounts();
      } catch (error) {
        setStatusMessage("Error: " + error.message);
      } finally {
        setBusyAccountId(null);
      }
    }
  };
  return /* @__PURE__ */ jsx("div", { onMouseDown: (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, style: {
    position: "fixed",
    inset: 0,
    zIndex: 1e4,
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    width: "100%",
    maxWidth: 620,
    maxHeight: "90vh",
    background: "var(--popover)",
    border: "1px solid var(--border-strong)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-lg)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    color: "var(--foreground)",
    fontFamily: "var(--font-sans)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "16px 20px",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { style: {
          margin: 0,
          fontSize: 16,
          fontWeight: 600,
          color: "var(--foreground)"
        }, children: "Cuentas de Google Flow (Multi-Cuenta)" }),
        /* @__PURE__ */ jsx("p", { style: {
          margin: "2px 0 0",
          fontSize: 12,
          color: "var(--muted-foreground)"
        }, children: "Conecta hasta 4 cuentas para multiplicar velocidad y evitar l\xEDmites de cuota" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, style: {
        background: "transparent",
        border: "none",
        color: "var(--muted-foreground)",
        fontSize: 18,
        cursor: "pointer",
        padding: "4px 8px",
        borderRadius: "var(--radius-xs)"
      }, children: "\u2715" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "18px 20px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "10px 14px",
        borderRadius: "var(--radius-md)",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }, children: /* @__PURE__ */ jsxs("span", { style: {
          fontSize: 12,
          fontWeight: 600,
          color: "var(--foreground)"
        }, children: [
          connectedAccounts.length,
          " de ",
          accounts.length || 5,
          " Cuentas Conectadas"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }, children: [
          connectedAccounts.length > 1 && /* @__PURE__ */ jsxs("span", { style: {
            fontSize: 10.5,
            fontWeight: 700,
            color: "#38bdf8",
            background: "rgba(56, 189, 248, 0.12)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            padding: "3px 8px",
            borderRadius: "var(--radius-xs)",
            fontFamily: "var(--font-mono)",
            display: "inline-flex",
            alignItems: "center",
            gap: 4
          }, children: [
            "\u{1F6E1}\uFE0F Failover & Balanceo ",
            connectedAccounts.length,
            "x"
          ] }),
          isElectronApp && /* @__PURE__ */ jsx("button", { onClick: handleRefreshAll, disabled: busyAccountId === "all", style: {
            background: "var(--muted)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
            fontSize: 11,
            fontWeight: 500,
            padding: "4px 10px",
            borderRadius: "var(--radius-xs)",
            cursor: busyAccountId === "all" ? "wait" : "pointer"
          }, title: "Refresca las sesiones y renueva los tokens de todas las cuentas", children: busyAccountId === "all" ? "Refrescando..." : "Refrescar Todas" })
        ] })
      ] }),
      accounts.map((account, index) => {
        var healthStatusColor1;
        var healthStatusColor2;
        var healthStatusBg1;
        var healthStatusBg2;
        var healthStatusBorder1;
        var healthStatusBorder2;
        var healthStatusLabel1;
        var healthStatusLabel2;
        const isConnected = !!account.connected && !!account.projectId;
        const isBusy = busyAccountId === account.id || busyAccountId === "all";
        return /* @__PURE__ */ jsxs("div", { style: {
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          transition: "border-color var(--transition-fast)"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              width: 8,
              height: 8,
              borderRadius: "50%",
              flexShrink: 0,
              background: isConnected ? "var(--success)" : "var(--muted-foreground)"
            } }),
            /* @__PURE__ */ jsxs("div", { style: {
              minWidth: 0
            }, children: [
              /* @__PURE__ */ jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap"
              }, children: [
                /* @__PURE__ */ jsx("span", { style: {
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--foreground)"
                }, children: account.label || "Cuenta " + (index + 1) }),
                account.email && /* @__PURE__ */ jsx("span", { style: {
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--muted-foreground)",
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                  padding: "1px 7px",
                  borderRadius: "var(--radius-xs)",
                  fontFamily: "var(--font-mono)"
                }, children: account.email }),
                isConnected && /* @__PURE__ */ jsx("div", { style: {
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center"
                }, children: /* @__PURE__ */ jsxs("select", { value: account.tier || "FREE", onChange: async (event) => {
                  var electronApi2;
                  const newTier = event.target.value;
                  if (isElectronApp && (electronApi2 = window.electronAPI) != null && electronApi2.updateAccountTier) {
                    await window.electronAPI.updateAccountTier(account.id, newTier);
                  }
                  fetchAccounts();
                }, style: {
                  cursor: "pointer",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  padding: "2px 8px",
                  borderRadius: "var(--radius-xs)",
                  outline: "none",
                  color: "var(--foreground)",
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-mono)"
                }, title: "Haz clic para cambiar el plan de esta cuenta (FREE / PLUS / ULTRA)", children: [
                  /* @__PURE__ */ jsx("option", { value: "FREE", children: "FREE" }),
                  /* @__PURE__ */ jsx("option", { value: "PLUS", children: "PLUS" }),
                  /* @__PURE__ */ jsx("option", { value: "ULTRA", children: "ULTRA" })
                ] }) }),
                isConnected && /* @__PURE__ */ jsx("span", { style: {
                  fontSize: 9.5,
                  fontWeight: 800,
                  color: ((healthStatusColor1 = account.health) == null ? void 0 : healthStatusColor1.status) === "401_EXPIRED" ? "#f87171" : ((healthStatusColor2 = account.health) == null ? void 0 : healthStatusColor2.status) === "QUOTA_EXCEEDED" ? "#fb923c" : "#4ade80",
                  background: ((healthStatusBg1 = account.health) == null ? void 0 : healthStatusBg1.status) === "401_EXPIRED" ? "rgba(248, 113, 113, 0.15)" : ((healthStatusBg2 = account.health) == null ? void 0 : healthStatusBg2.status) === "QUOTA_EXCEEDED" ? "rgba(251, 146, 60, 0.15)" : "rgba(74, 222, 128, 0.15)",
                  border: "1px solid " + (((healthStatusBorder1 = account.health) == null ? void 0 : healthStatusBorder1.status) === "401_EXPIRED" ? "rgba(248, 113, 113, 0.35)" : ((healthStatusBorder2 = account.health) == null ? void 0 : healthStatusBorder2.status) === "QUOTA_EXCEEDED" ? "rgba(251, 146, 60, 0.35)" : "rgba(74, 222, 128, 0.35)"),
                  padding: "2px 6px",
                  borderRadius: "var(--radius-xs)",
                  fontFamily: "var(--font-mono)"
                }, children: ((healthStatusLabel1 = account.health) == null ? void 0 : healthStatusLabel1.status) === "401_EXPIRED" ? "\u{1F534} 401 EXPIRADA" : ((healthStatusLabel2 = account.health) == null ? void 0 : healthStatusLabel2.status) === "QUOTA_EXCEEDED" ? "\u{1F7E0} CUOTA AGOTADA" : "\u{1F7E2} \xD3PTIMA" })
              ] }),
              /* @__PURE__ */ jsx("div", { style: {
                fontSize: 11,
                color: "var(--muted-foreground)",
                marginTop: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }, children: isConnected ? "Proyecto: " + account.projectId.slice(0, 18) + "..." : "No conectada \u2014 Haz clic en Conectar para iniciar sesi\xF3n" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            gap: 6,
            flexShrink: 0
          }, children: [
            isConnected && isElectronApp && /* @__PURE__ */ jsx("button", { onClick: () => handleTestConnection(account.id, account.label), disabled: isBusy, style: {
              background: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              color: "#38bdf8",
              fontSize: 11,
              fontWeight: 700,
              padding: "6px 9px",
              borderRadius: "var(--radius-xs)",
              cursor: isBusy ? "wait" : "pointer"
            }, title: "Probar y diagnosticar conexi\xF3n activa", children: "\u{1FA7A} Probar" }),
            isConnected && isElectronApp && /* @__PURE__ */ jsx("button", { onClick: () => handleRefreshAccount(account.id, account.label), disabled: isBusy, style: {
              background: "var(--muted)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontSize: 11,
              fontWeight: 500,
              padding: "6px 9px",
              borderRadius: "var(--radius-xs)",
              cursor: isBusy ? "wait" : "pointer"
            }, title: "Refrescar sesi\xF3n y token de esta cuenta", children: "\u{1F504}" }),
            /* @__PURE__ */ jsx("button", { onClick: () => isConnected ? handleOpenAccount(account.id) : handleConnectAccount(account.id), disabled: isBusy, style: {
              background: isConnected ? "var(--muted)" : "var(--primary)",
              border: "1px solid " + (isConnected ? "var(--border)" : "var(--border-strong)"),
              color: isConnected ? "var(--foreground)" : "var(--primary-foreground)",
              fontSize: 11.5,
              fontWeight: 600,
              padding: "6px 12px",
              borderRadius: "var(--radius-xs)",
              cursor: isBusy ? "wait" : "pointer"
            }, children: isBusy ? "..." : isConnected ? "Abrir / Proyecto" : "Conectar" }),
            isConnected && /* @__PURE__ */ jsx("button", { onClick: () => handleLogoutAccount(account.id, account.label), disabled: isBusy, style: {
              background: "transparent",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              color: "var(--danger)",
              fontSize: 11,
              fontWeight: 500,
              padding: "6px 10px",
              borderRadius: "var(--radius-xs)",
              cursor: isBusy ? "wait" : "pointer"
            }, title: "Cerrar sesi\xF3n de esta cuenta", children: "\u2715" })
          ] })
        ] }, account.id || index);
      }),
      statusMessage ? /* @__PURE__ */ jsx("div", { style: {
        padding: "8px 12px",
        borderRadius: "var(--radius-xs)",
        background: "var(--muted)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        fontSize: 12
      }, children: statusMessage }) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "12px 20px",
      borderTop: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "var(--surface)"
    }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        fontSize: 11,
        color: "var(--muted-foreground)"
      }, children: "Cada cuenta se guarda en una sesi\xF3n aislada independiente." }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, style: {
        background: "var(--primary)",
        border: "1px solid var(--border-strong)",
        color: "var(--primary-foreground)",
        fontSize: 12.5,
        fontWeight: 600,
        padding: "6px 18px",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer"
      }, children: "Listo" })
    ] })
  ] }) });
};
export {
  B as AccountsModal
};
