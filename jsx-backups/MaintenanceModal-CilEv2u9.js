import { r as React, j as jsx } from "./vendor-react-BbRiLirl.js";
import { u as useStore, h as listSnapshots, j as createSnapshot, r as restoreSnapshotApi } from "./index-DE7up0M0.js";
import "./vendor-state-m3Xdu9cz.js";
import "./vendor-remotion-D3IpuOk5.js";
const m = bytes => bytes < 1048576 ? (bytes / 1024).toFixed(1) + " KB" : bytes < 1073741824 ? (bytes / 1048576).toFixed(1) + " MB" : (bytes / 1073741824).toFixed(2) + " GB";
const y = {
  library: "Archivos importados",
  renders: "Videos renderizados",
  assets: "Recursos temporales",
  temporary: "Trabajo temporal"
};
const O = ({
  isOpen,
  onClose
}) => {
  const project = useStore(state => state.project);
  const setProject = useStore(state => state.setProject);
  const [activeTab, setActiveTab] = React.useState("storage");
  const [storageInfo, setStorageInfo] = React.useState(null);
  const [logs, setLogs] = React.useState([]);
  const [serviceStatus, setServiceStatus] = React.useState(null);
  const [snapshots, setSnapshots] = React.useState([]);
  const [appVersion, setAppVersion] = React.useState("1.8.5");
  const refreshData = React.useCallback(async () => {
    var electronApiTemp1;
    var getAppLogsFnTemp;
    var electronApiTemp2;
    var getServiceStatusFnTemp;
    const [storageResult, logsResult, serviceStatusResult, snapshotsResult] = await Promise.all([fetch("/api/storage").then(response => response.json()).catch(() => null), ((getAppLogsFnTemp = (electronApiTemp1 = window.electronAPI) == null ? undefined : electronApiTemp1.getAppLogs) == null ? undefined : getAppLogsFnTemp.call(electronApiTemp1, 500)) || [], ((getServiceStatusFnTemp = (electronApiTemp2 = window.electronAPI) == null ? undefined : electronApiTemp2.getServiceStatus) == null ? undefined : getServiceStatusFnTemp.call(electronApiTemp2)) || null, listSnapshots(project.id).catch(() => [])]);
    setStorageInfo(storageResult != null && storageResult.ok ? storageResult : null);
    setLogs(Array.isArray(logsResult) ? logsResult : []);
    setServiceStatus(serviceStatusResult);
    setSnapshots(snapshotsResult);
  }, [project.id]);
  React.useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen, refreshData]);
  React.useEffect(() => {
    var electronApiTemp;
    var getAppVersionFnTemp;
    if (isOpen) {
      if ((getAppVersionFnTemp = (electronApiTemp = window.electronAPI) == null ? undefined : electronApiTemp.getAppVersion) != null) {
        getAppVersionFnTemp.call(electronApiTemp).then(version => setAppVersion(version || "1.8.5")).catch(() => {});
      }
    }
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  const handleCleanTarget = async target => {
    if (target === "library" || !window.confirm("¿Vaciar “" + y[target] + "”? Esta acción elimina esos archivos locales.")) {
      return;
    }
    const response = await fetch("/api/storage/clean", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target: target
      })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      window.alert((errorData == null ? undefined : errorData.error) || "No se pudo limpiar esta ubicación.");
    }
    refreshData();
  };
  const handleCreateSnapshot = async () => {
    await createSnapshot(project, "Copia manual");
    refreshData();
  };
  const handleRestoreSnapshot = async snapshot => {
    if (!window.confirm("¿Restaurar la copia del " + new Date(snapshot.createdAt).toLocaleString() + "?")) {
      return;
    }
    const restoredProject = await restoreSnapshotApi(snapshot.id);
    if (restoredProject) {
      setProject(restoredProject);
    }
    onClose();
  };
  const TABS = [["storage", "Almacenamiento"], ["logs", "Servicios y logs"], ["snapshots", "Copias del proyecto"], ["support", "Soporte y versión"]];
  return <div onMouseDown={event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }} style={{
    position: "fixed",
    inset: 0,
    zIndex: 1500,
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(8px)",
    display: "grid",
    placeItems: "center",
    padding: 20
  }}><div style={{
      width: 720,
      maxWidth: "100%",
      height: "min(620px, 86vh)",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)"
    }}><div style={{
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border)"
      }}><div><strong style={{
            color: "var(--foreground)",
            fontSize: 14,
            fontWeight: 700
          }}>Herramientas y mantenimiento</strong><div style={{
            color: "var(--muted-foreground)",
            fontSize: 11,
            marginTop: 2
          }}>Espacio, diagnósticos y copias recuperables</div></div><button type="button" onClick={onClose} style={{
          width: 28,
          height: 28,
          display: "grid",
          placeItems: "center",
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xs)",
          color: "var(--muted-foreground)",
          cursor: "pointer",
          fontSize: 14,
          transition: "all 0.15s"
        }} onMouseEnter={event => {
          event.currentTarget.style.background = "var(--accent)";
          event.currentTarget.style.color = "var(--foreground)";
        }} onMouseLeave={event => {
          event.currentTarget.style.background = "transparent";
          event.currentTarget.style.color = "var(--muted-foreground)";
        }}>✕</button></div><div style={{
        padding: "10px 20px",
        borderBottom: "1px solid var(--border)",
        background: "var(--background)"
      }}><div style={{
          display: "inline-flex",
          gap: 3,
          background: "var(--muted)",
          padding: 3,
          borderRadius: "var(--radius-sm)"
        }}>{TABS.map(([tabId, tabLabel]) => {
            const isActiveTab = activeTab === tabId;
            return <button type="button" onClick={() => setActiveTab(tabId)} style={{
              padding: "6px 14px",
              border: "none",
              borderRadius: "var(--radius-xs)",
              fontSize: 11.5,
              fontWeight: isActiveTab ? 700 : 500,
              cursor: "pointer",
              background: isActiveTab ? "var(--surface)" : "transparent",
              color: isActiveTab ? "var(--foreground)" : "var(--muted-foreground)",
              boxShadow: isActiveTab ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
              transition: "all 0.15s ease"
            }} key={tabId}>{tabLabel}</button>;
          })}</div></div><div style={{
        padding: "18px 20px",
        overflow: "auto",
        flex: 1
      }}>{activeTab === "storage" && <jsx.Fragment><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 14px",
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            marginBottom: 14
          }}><span style={{
              color: "var(--muted-foreground)",
              fontSize: 12
            }}>Espacio ocupado total</span><strong style={{
              color: "var(--foreground)",
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              fontWeight: 700
            }}>{storageInfo ? m(storageInfo.totalBytes) : "Calculando..."}</strong></div><div style={{
            display: "flex",
            flexDirection: "column",
            gap: 8
          }}>{Object.entries((storageInfo == null ? undefined : storageInfo.targets) || {}).map(([targetKey, targetData]) => {
              const isProtected = targetKey === "library";
              return <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 14px"
              }} key={targetKey}><div><strong style={{
                    color: "var(--foreground)",
                    fontSize: 12,
                    fontWeight: 600
                  }}>{y[targetKey]}</strong><div style={{
                    color: "var(--muted-foreground)",
                    fontSize: 11,
                    marginTop: 2,
                    fontFamily: "var(--font-mono)"
                  }}>{targetData.files} archivo(s) · {m(targetData.bytes)}</div>{isProtected && <div style={{
                    color: "var(--muted-foreground)",
                    fontSize: 10,
                    marginTop: 3
                  }}>Protegida: contiene medios vinculados a tus proyectos.</div>}</div><button type="button" disabled={isProtected} onClick={() => handleCleanTarget(targetKey)} style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-xs)",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: isProtected ? "default" : "pointer",
                  background: isProtected ? "var(--muted)" : "var(--surface)",
                  color: isProtected ? "var(--muted-foreground)" : "var(--foreground)",
                  border: "1px solid var(--border)",
                  transition: "all 0.15s"
                }} onMouseEnter={event => {
                  if (!isProtected) {
                    event.currentTarget.style.background = "var(--accent)";
                    event.currentTarget.style.borderColor = "var(--border-strong)";
                  }
                }} onMouseLeave={event => {
                  if (!isProtected) {
                    event.currentTarget.style.background = "var(--surface)";
                    event.currentTarget.style.borderColor = "var(--border)";
                  }
                }}>{isProtected ? "Protegida" : "Vaciar"}</button></div>;
            })}</div></jsx.Fragment>}{activeTab === "logs" && <jsx.Fragment><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12
          }}><div style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              fontSize: 11.5
            }}><span style={{
                color: "var(--foreground)",
                fontWeight: 600
              }}>Servidor: {serviceStatus != null && serviceStatus.backend ? "● Activo" : "○ Detenido"}</span><span style={{
                color: "var(--muted-foreground)"
              }}>Modo: {(serviceStatus == null ? undefined : serviceStatus.mode) || "production"}</span></div><button type="button" onClick={refreshData} style={{
              padding: "4px 12px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xs)",
              color: "var(--foreground)",
              fontSize: 11,
              cursor: "pointer"
            }}>Actualizar</button></div><pre style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            background: "var(--background)",
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: 14,
            fontSize: 10.5,
            lineHeight: 1.55,
            fontFamily: "var(--font-mono)",
            height: 360,
            overflowY: "auto"
          }}>{logs.join("\n") || "Aún no hay registros en la sesión."}</pre></jsx.Fragment>}{activeTab === "snapshots" && <jsx.Fragment><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12
          }}><div style={{
              color: "var(--muted-foreground)",
              fontSize: 11
            }}>Se conservan las últimas 20 copias por proyecto automáticamente.</div><button type="button" onClick={handleCreateSnapshot} style={{
              padding: "6px 14px",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "var(--radius-xs)",
              fontSize: 11.5,
              fontWeight: 700,
              cursor: "pointer"
            }}>+ Crear copia ahora</button></div><div style={{
            display: "flex",
            flexDirection: "column",
            gap: 6
          }}>{snapshots.length === 0 ? <div style={{
              padding: 30,
              textAlign: "center",
              color: "var(--muted-foreground)",
              fontSize: 12
            }}>No hay copias guardadas aún.</div> : snapshots.map(snapshot => <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              background: "var(--background)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)"
            }} key={snapshot.id}><div><strong style={{
                  color: "var(--foreground)",
                  fontSize: 12,
                  fontWeight: 600
                }}>{snapshot.reason}</strong><div style={{
                  color: "var(--muted-foreground)",
                  fontSize: 10.5,
                  marginTop: 2,
                  fontFamily: "var(--font-mono)"
                }}>{new Date(snapshot.createdAt).toLocaleString()}</div></div><button type="button" onClick={() => handleRestoreSnapshot(snapshot)} style={{
                padding: "4px 12px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xs)",
                color: "var(--foreground)",
                fontSize: 11,
                cursor: "pointer"
              }}>Restaurar</button></div>)}</div></jsx.Fragment>}{activeTab === "support" && <div style={{
          maxWidth: 520,
          margin: "16px auto",
          display: "grid",
          gap: 14
        }}><div style={{
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: 18
          }}><div style={{
              color: "var(--muted-foreground)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase"
            }}>FLOWSTUDIO · Soporte</div><h3 style={{
              margin: "6px 0 4px",
              color: "var(--foreground)",
              fontSize: 16,
              fontWeight: 700
            }}>¿Necesitas ayuda?</h3><p style={{
              margin: 0,
              color: "var(--muted-foreground)",
              fontSize: 12,
              lineHeight: 1.5
            }}>Contacta al soporte directo o únete a la comunidad para anuncios, soporte y actualizaciones.</p></div><div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10
          }}><a href="https://t.me/Oxdailyy" target="_blank" rel="noreferrer" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 14px",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              textDecoration: "none",
              borderRadius: "var(--radius-xs)",
              fontSize: 12,
              fontWeight: 700
            }}>Contactar soporte</a><a href="https://t.me/+4jBsXihcFv01NjJh" target="_blank" rel="noreferrer" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 14px",
              background: "var(--surface)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              textDecoration: "none",
              borderRadius: "var(--radius-xs)",
              fontSize: 12,
              fontWeight: 600
            }}>Unirse al grupo</a></div><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            background: "var(--background)"
          }}><span style={{
              color: "var(--muted-foreground)",
              fontSize: 11.5
            }}>Versión instalada</span><strong style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-mono)",
              fontSize: 12
            }}>FLOWSTUDIO {appVersion}</strong></div></div>}</div></div></div>;
};
export { O as MaintenanceModal };