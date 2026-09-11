import { r as React, j as jsx } from "./vendor-react-BbRiLirl.js";
import "./vendor-state-m3Xdu9cz.js";
const B = ({
  isOpen,
  onClose
}) => {
  var electronApi;
  const [accounts, setAccounts] = React.useState([]);
  const [extensionConnected, setExtensionConnected] = React.useState(!1);
  const [extensionAvailable, setExtensionAvailable] = React.useState(!0);
  const [busyAccountId, setBusyAccountId] = React.useState(null);
  const [statusMessage, setStatusMessage] = React.useState("");
  const isElectronApp = (electronApi = window.electronAPI) != null && !!electronApi.openGoogleFlow;
  const checkBrowserExtension = () => new Promise(resolve => {
    const requestId = crypto.randomUUID();
    const timeoutId = setTimeout(() => {
      window.removeEventListener("message", handleExtensionMessage);
      resolve({
        available: !1,
        connected: !1,
        count: 0
      });
    }, 1800);
    function handleExtensionMessage(event) {
      var dataForConnected;
      var dataForCount;
      var dataForCountFallback;
      const messageData = event.data;
      if (event.source === window && (messageData == null ? undefined : messageData.source) === "flowtube-extension" && messageData.requestId === requestId) {
        clearTimeout(timeoutId);
        window.removeEventListener("message", handleExtensionMessage);
        resolve({
          available: true,
          connected: !!messageData.ok && (dataForConnected = messageData.data) != null && !!dataForConnected.connected,
          count: ((dataForCount = messageData.data) == null ? undefined : dataForCount.accountsCount) || ((dataForCountFallback = messageData.data) != null && dataForCountFallback.connected ? 1 : 0)
        });
      }
    }
    window.addEventListener("message", handleExtensionMessage);
    window.postMessage({
      source: "flowtube-web",
      requestId: requestId,
      type: "FLOW_CHECK",
      payload: {}
    }, "*");
  });
  const fetchAccounts = async () => {
    var electronApi;
    try {
      if ((electronApi = window.electronAPI) != null && electronApi.getAccounts) {
        const fetchedAccounts = await window.electronAPI.getAccounts();
        setAccounts(fetchedAccounts || []);
        setExtensionAvailable(!0);
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
    var electronApi;
    if ((electronApi = window.electronAPI) != null && electronApi.onAccountsChanged) {
      window.electronAPI.onAccountsChanged(updatedAccounts => setAccounts(updatedAccounts || []));
    }
  }, []);
  if (!isOpen) {
    return null;
  }
  const connectedAccounts = isElectronApp ? accounts.filter(account => account.connected && account.projectId) : extensionConnected ? [1] : [];
  const handleConnectAccount = async accountId => {
    setStatusMessage("");
    setBusyAccountId(accountId);
    try {
      if (isElectronApp) {
        const result = await window.electronAPI.openGoogleFlow(accountId);
        if (result && result.success === !1) {
          throw new Error(result.error || "No se pudo abrir Google Flow.");
        }
        setStatusMessage("Google Flow se abrió en una ventana dedicada. Inicia sesión y entra en un proyecto para activar esta cuenta.");
      } else {
        const newWindow = window.open("https://flow.google.com", "_blank");
        if (!newWindow) {
          throw new Error("El navegador bloqueó la pestaña. Permite ventanas emergentes.");
        }
        newWindow.opener = null;
        setStatusMessage("Inicia sesión en un proyecto de Flow en tu navegador. La extensión lo detectará automáticamente.");
      }
    } catch (error) {
      setStatusMessage("Error: " + error.message);
    } finally {
      setBusyAccountId(null);
    }
  };
  const handleOpenAccount = async accountId => handleConnectAccount(accountId);
  const handleRefreshAccount = async (accountId, accountLabel) => {
    var electronApi;
    setStatusMessage("");
    setBusyAccountId(accountId);
    try {
      if (isElectronApp && (electronApi = window.electronAPI) != null && electronApi.reloadFlowAccount) {
        await window.electronAPI.reloadFlowAccount(accountId);
        setStatusMessage("Sesión y token de " + (accountLabel || "la cuenta") + " refrescados correctamente.");
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
    var electronApi;
    setStatusMessage("");
    setBusyAccountId(accountId);
    try {
      if (isElectronApp && (electronApi = window.electronAPI) != null && electronApi.testAccountConnection) {
        const testResult = await window.electronAPI.testAccountConnection(accountId);
        if (testResult.ok) {
          setStatusMessage("✅ " + (testResult.message || "Conexión con " + accountLabel + " verificada con éxito."));
        } else {
          setStatusMessage("⚠️ " + (testResult.error || "Fallo al verificar " + accountLabel + "."));
        }
      } else {
        setStatusMessage("Diagnóstico disponible en la aplicación de escritorio.");
      }
      await fetchAccounts();
    } catch (error) {
      setStatusMessage("Error diagnosticando " + accountLabel + ": " + error.message);
    } finally {
      setBusyAccountId(null);
    }
  };
  const handleRefreshAll = async () => {
    var electronApi;
    setStatusMessage("");
    setBusyAccountId("all");
    try {
      if (isElectronApp && (electronApi = window.electronAPI) != null && electronApi.reloadAllFlowAccounts) {
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
    var electronApi;
    var logoutFn;
    if (!isElectronApp) {
      setStatusMessage("En modo navegador, cierra sesión directamente en la pestaña de Google Flow.");
      return;
    }
    if (window.confirm("¿Desconectar y borrar la sesión de " + (accountLabel || "esta cuenta") + "?")) {
      setStatusMessage("");
      setBusyAccountId(accountId);
      try {
        const result = await ((logoutFn = (electronApi = window.electronAPI) == null ? undefined : electronApi.logoutGoogleFlow) == null ? undefined : logoutFn.call(electronApi, accountId));
        if (result == null || !result.success) {
          throw new Error((result == null ? undefined : result.error) || "No se pudo cerrar la sesión.");
        }
        setStatusMessage("Sesión cerrada para " + accountLabel + ". Puedes iniciar sesión con una cuenta nueva.");
        fetchAccounts();
      } catch (error) {
        setStatusMessage("Error: " + error.message);
      } finally {
        setBusyAccountId(null);
      }
    }
  };
  return <div onMouseDown={event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }} style={{
    position: "fixed",
    inset: 0,
    zIndex: 10000,
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }}><div style={{
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
    }}><div style={{
        padding: "16px 20px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}><div><h3 style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            color: "var(--foreground)"
          }}>Cuentas de Google Flow (Multi-Cuenta)</h3><p style={{
            margin: "2px 0 0",
            fontSize: 12,
            color: "var(--muted-foreground)"
          }}>Conecta hasta 4 cuentas para multiplicar velocidad y evitar límites de cuota</p></div><button onClick={onClose} style={{
          background: "transparent",
          border: "none",
          color: "var(--muted-foreground)",
          fontSize: 18,
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "var(--radius-xs)"
        }}>✕</button></div><div style={{
        padding: "18px 20px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 12
      }}><div style={{
          padding: "10px 14px",
          borderRadius: "var(--radius-md)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}><div style={{
            display: "flex",
            alignItems: "center",
            gap: 8
          }}><span style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--foreground)"
            }}>{connectedAccounts.length} de {accounts.length || 5} Cuentas Conectadas</span></div><div style={{
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>{connectedAccounts.length > 1 && <span style={{
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
            }}>🛡️ Failover & Balanceo {connectedAccounts.length}x</span>}{isElectronApp && <button onClick={handleRefreshAll} disabled={busyAccountId === "all"} style={{
              background: "var(--muted)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontSize: 11,
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: "var(--radius-xs)",
              cursor: busyAccountId === "all" ? "wait" : "pointer"
            }} title="Refresca las sesiones y renueva los tokens de todas las cuentas">{busyAccountId === "all" ? "Refrescando..." : "Refrescar Todas"}</button>}</div></div>{accounts.map((account, index) => {
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
          return <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            transition: "border-color var(--transition-fast)"
          }} key={account.id || index}><div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 0
            }}><span style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                flexShrink: 0,
                background: isConnected ? "var(--success)" : "var(--muted-foreground)"
              }} /><div style={{
                minWidth: 0
              }}><div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap"
                }}><span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--foreground)"
                  }}>{account.label || "Cuenta " + (index + 1)}</span>{account.email && <span style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--muted-foreground)",
                    background: "var(--muted)",
                    border: "1px solid var(--border)",
                    padding: "1px 7px",
                    borderRadius: "var(--radius-xs)",
                    fontFamily: "var(--font-mono)"
                  }}>{account.email}</span>}{isConnected && <div style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center"
                  }}><select value={account.tier || "FREE"} onChange={async event => {
                      var electronApi;
                      const newTier = event.target.value;
                      if (isElectronApp && (electronApi = window.electronAPI) != null && electronApi.updateAccountTier) {
                        await window.electronAPI.updateAccountTier(account.id, newTier);
                      }
                      fetchAccounts();
                    }} style={{
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
                    }} title="Haz clic para cambiar el plan de esta cuenta (FREE / PLUS / ULTRA)"><option value="FREE">FREE</option><option value="PLUS">PLUS</option><option value="ULTRA">ULTRA</option></select></div>}{isConnected && <span style={{
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: ((healthStatusColor1 = account.health) == null ? undefined : healthStatusColor1.status) === "401_EXPIRED" ? "#f87171" : ((healthStatusColor2 = account.health) == null ? undefined : healthStatusColor2.status) === "QUOTA_EXCEEDED" ? "#fb923c" : "#4ade80",
                    background: ((healthStatusBg1 = account.health) == null ? undefined : healthStatusBg1.status) === "401_EXPIRED" ? "rgba(248, 113, 113, 0.15)" : ((healthStatusBg2 = account.health) == null ? undefined : healthStatusBg2.status) === "QUOTA_EXCEEDED" ? "rgba(251, 146, 60, 0.15)" : "rgba(74, 222, 128, 0.15)",
                    border: "1px solid " + (((healthStatusBorder1 = account.health) == null ? undefined : healthStatusBorder1.status) === "401_EXPIRED" ? "rgba(248, 113, 113, 0.35)" : ((healthStatusBorder2 = account.health) == null ? undefined : healthStatusBorder2.status) === "QUOTA_EXCEEDED" ? "rgba(251, 146, 60, 0.35)" : "rgba(74, 222, 128, 0.35)"),
                    padding: "2px 6px",
                    borderRadius: "var(--radius-xs)",
                    fontFamily: "var(--font-mono)"
                  }}>{((healthStatusLabel1 = account.health) == null ? undefined : healthStatusLabel1.status) === "401_EXPIRED" ? "🔴 401 EXPIRADA" : ((healthStatusLabel2 = account.health) == null ? undefined : healthStatusLabel2.status) === "QUOTA_EXCEEDED" ? "🟠 CUOTA AGOTADA" : "🟢 ÓPTIMA"}</span>}</div><div style={{
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                  marginTop: 3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>{isConnected ? "Proyecto: " + account.projectId.slice(0, 18) + "..." : "No conectada — Haz clic en Conectar para iniciar sesión"}</div></div></div><div style={{
              display: "flex",
              gap: 6,
              flexShrink: 0
            }}>{isConnected && isElectronApp && <button onClick={() => handleTestConnection(account.id, account.label)} disabled={isBusy} style={{
                background: "rgba(56, 189, 248, 0.12)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                color: "#38bdf8",
                fontSize: 11,
                fontWeight: 700,
                padding: "6px 9px",
                borderRadius: "var(--radius-xs)",
                cursor: isBusy ? "wait" : "pointer"
              }} title="Probar y diagnosticar conexión activa">🩺 Probar</button>}{isConnected && isElectronApp && <button onClick={() => handleRefreshAccount(account.id, account.label)} disabled={isBusy} style={{
                background: "var(--muted)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontSize: 11,
                fontWeight: 500,
                padding: "6px 9px",
                borderRadius: "var(--radius-xs)",
                cursor: isBusy ? "wait" : "pointer"
              }} title="Refrescar sesión y token de esta cuenta">🔄</button>}<button onClick={() => isConnected ? handleOpenAccount(account.id) : handleConnectAccount(account.id)} disabled={isBusy} style={{
                background: isConnected ? "var(--muted)" : "var(--primary)",
                border: "1px solid " + (isConnected ? "var(--border)" : "var(--border-strong)"),
                color: isConnected ? "var(--foreground)" : "var(--primary-foreground)",
                fontSize: 11.5,
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: "var(--radius-xs)",
                cursor: isBusy ? "wait" : "pointer"
              }}>{isBusy ? "..." : isConnected ? "Abrir / Proyecto" : "Conectar"}</button>{isConnected && <button onClick={() => handleLogoutAccount(account.id, account.label)} disabled={isBusy} style={{
                background: "transparent",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "var(--danger)",
                fontSize: 11,
                fontWeight: 500,
                padding: "6px 10px",
                borderRadius: "var(--radius-xs)",
                cursor: isBusy ? "wait" : "pointer"
              }} title="Cerrar sesión de esta cuenta">✕</button>}</div></div>;
        })}{statusMessage ? <div style={{
          padding: "8px 12px",
          borderRadius: "var(--radius-xs)",
          background: "var(--muted)",
          border: "1px solid var(--border)",
          color: "var(--foreground)",
          fontSize: 12
        }}>{statusMessage}</div> : null}</div><div style={{
        padding: "12px 20px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--surface)"
      }}><span style={{
          fontSize: 11,
          color: "var(--muted-foreground)"
        }}>Cada cuenta se guarda en una sesión aislada independiente.</span><button onClick={onClose} style={{
          background: "var(--primary)",
          border: "1px solid var(--border-strong)",
          color: "var(--primary-foreground)",
          fontSize: 12.5,
          fontWeight: 600,
          padding: "6px 18px",
          borderRadius: "var(--radius-sm)",
          cursor: "pointer"
        }}>Listo</button></div></div></div>;
};
export { B as AccountsModal };