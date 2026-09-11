import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
import { r as React, j as jsx2 } from "./vendor-react-BbRiLirl.js";
import { u as useStore, h as listSnapshots, j as createSnapshot, r as restoreSnapshotApi } from "./index-DE7up0M0.js";
import "./vendor-state-m3Xdu9cz.js";
import "./vendor-remotion-D3IpuOk5.js";
const m = (bytes) => bytes < 1048576 ? (bytes / 1024).toFixed(1) + " KB" : bytes < 1073741824 ? (bytes / 1048576).toFixed(1) + " MB" : (bytes / 1073741824).toFixed(2) + " GB";
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
  const project = useStore((state) => state.project);
  const setProject = useStore((state) => state.setProject);
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
    const [storageResult, logsResult, serviceStatusResult, snapshotsResult] = await Promise.all([fetch("/api/storage").then((response) => response.json()).catch(() => null), ((getAppLogsFnTemp = (electronApiTemp1 = window.electronAPI) == null ? void 0 : electronApiTemp1.getAppLogs) == null ? void 0 : getAppLogsFnTemp.call(electronApiTemp1, 500)) || [], ((getServiceStatusFnTemp = (electronApiTemp2 = window.electronAPI) == null ? void 0 : electronApiTemp2.getServiceStatus) == null ? void 0 : getServiceStatusFnTemp.call(electronApiTemp2)) || null, listSnapshots(project.id).catch(() => [])]);
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
      if ((getAppVersionFnTemp = (electronApiTemp = window.electronAPI) == null ? void 0 : electronApiTemp.getAppVersion) != null) {
        getAppVersionFnTemp.call(electronApiTemp).then((version) => setAppVersion(version || "1.8.5")).catch(() => {
        });
      }
    }
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  const handleCleanTarget = async (target) => {
    if (target === "library" || !window.confirm("\xBFVaciar \u201C" + y[target] + "\u201D? Esta acci\xF3n elimina esos archivos locales.")) {
      return;
    }
    const response = await fetch("/api/storage/clean", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target
      })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      window.alert((errorData == null ? void 0 : errorData.error) || "No se pudo limpiar esta ubicaci\xF3n.");
    }
    refreshData();
  };
  const handleCreateSnapshot = async () => {
    await createSnapshot(project, "Copia manual");
    refreshData();
  };
  const handleRestoreSnapshot = async (snapshot) => {
    if (!window.confirm("\xBFRestaurar la copia del " + new Date(snapshot.createdAt).toLocaleString() + "?")) {
      return;
    }
    const restoredProject = await restoreSnapshotApi(snapshot.id);
    if (restoredProject) {
      setProject(restoredProject);
    }
    onClose();
  };
  const TABS = [["storage", "Almacenamiento"], ["logs", "Servicios y logs"], ["snapshots", "Copias del proyecto"], ["support", "Soporte y versi\xF3n"]];
  return /* @__PURE__ */ jsx("div", { onMouseDown: (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, style: {
    position: "fixed",
    inset: 0,
    zIndex: 1500,
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(8px)",
    display: "grid",
    placeItems: "center",
    padding: 20
  }, children: /* @__PURE__ */ jsxs("div", { style: {
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
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid var(--border)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { style: {
          color: "var(--foreground)",
          fontSize: 14,
          fontWeight: 700
        }, children: "Herramientas y mantenimiento" }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "var(--muted-foreground)",
          fontSize: 11,
          marginTop: 2
        }, children: "Espacio, diagn\xF3sticos y copias recuperables" })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, style: {
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
      }, onMouseEnter: (event) => {
        event.currentTarget.style.background = "var(--accent)";
        event.currentTarget.style.color = "var(--foreground)";
      }, onMouseLeave: (event) => {
        event.currentTarget.style.background = "transparent";
        event.currentTarget.style.color = "var(--muted-foreground)";
      }, children: "\u2715" })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      padding: "10px 20px",
      borderBottom: "1px solid var(--border)",
      background: "var(--background)"
    }, children: /* @__PURE__ */ jsx("div", { style: {
      display: "inline-flex",
      gap: 3,
      background: "var(--muted)",
      padding: 3,
      borderRadius: "var(--radius-sm)"
    }, children: TABS.map(([tabId, tabLabel]) => {
      const isActiveTab = activeTab === tabId;
      return /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setActiveTab(tabId), style: {
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
      }, children: tabLabel }, tabId);
    }) }) }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "18px 20px",
      overflow: "auto",
      flex: 1
    }, children: [
      activeTab === "storage" && /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          marginBottom: 14
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "var(--muted-foreground)",
            fontSize: 12
          }, children: "Espacio ocupado total" }),
          /* @__PURE__ */ jsx("strong", { style: {
            color: "var(--foreground)",
            fontSize: 13,
            fontFamily: "var(--font-mono)",
            fontWeight: 700
          }, children: storageInfo ? m(storageInfo.totalBytes) : "Calculando..." })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 8
        }, children: Object.entries((storageInfo == null ? void 0 : storageInfo.targets) || {}).map(([targetKey, targetData]) => {
          const isProtected = targetKey === "library";
          return /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "12px 14px"
          }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                color: "var(--foreground)",
                fontSize: 12,
                fontWeight: 600
              }, children: y[targetKey] }),
              /* @__PURE__ */ jsxs("div", { style: {
                color: "var(--muted-foreground)",
                fontSize: 11,
                marginTop: 2,
                fontFamily: "var(--font-mono)"
              }, children: [
                targetData.files,
                " archivo(s) \xB7 ",
                m(targetData.bytes)
              ] }),
              isProtected && /* @__PURE__ */ jsx("div", { style: {
                color: "var(--muted-foreground)",
                fontSize: 10,
                marginTop: 3
              }, children: "Protegida: contiene medios vinculados a tus proyectos." })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", disabled: isProtected, onClick: () => handleCleanTarget(targetKey), style: {
              padding: "6px 14px",
              borderRadius: "var(--radius-xs)",
              fontSize: 11,
              fontWeight: 600,
              cursor: isProtected ? "default" : "pointer",
              background: isProtected ? "var(--muted)" : "var(--surface)",
              color: isProtected ? "var(--muted-foreground)" : "var(--foreground)",
              border: "1px solid var(--border)",
              transition: "all 0.15s"
            }, onMouseEnter: (event) => {
              if (!isProtected) {
                event.currentTarget.style.background = "var(--accent)";
                event.currentTarget.style.borderColor = "var(--border-strong)";
              }
            }, onMouseLeave: (event) => {
              if (!isProtected) {
                event.currentTarget.style.background = "var(--surface)";
                event.currentTarget.style.borderColor = "var(--border)";
              }
            }, children: isProtected ? "Protegida" : "Vaciar" })
          ] }, targetKey);
        }) })
      ] }),
      activeTab === "logs" && /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            gap: 14,
            alignItems: "center",
            fontSize: 11.5
          }, children: [
            /* @__PURE__ */ jsxs("span", { style: {
              color: "var(--foreground)",
              fontWeight: 600
            }, children: [
              "Servidor: ",
              serviceStatus != null && serviceStatus.backend ? "\u25CF Activo" : "\u25CB Detenido"
            ] }),
            /* @__PURE__ */ jsxs("span", { style: {
              color: "var(--muted-foreground)"
            }, children: [
              "Modo: ",
              (serviceStatus == null ? void 0 : serviceStatus.mode) || "production"
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: refreshData, style: {
            padding: "4px 12px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xs)",
            color: "var(--foreground)",
            fontSize: 11,
            cursor: "pointer"
          }, children: "Actualizar" })
        ] }),
        /* @__PURE__ */ jsx("pre", { style: {
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
        }, children: logs.join("\n") || "A\xFAn no hay registros en la sesi\xF3n." })
      ] }),
      activeTab === "snapshots" && /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12
        }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--muted-foreground)",
            fontSize: 11
          }, children: "Se conservan las \xFAltimas 20 copias por proyecto autom\xE1ticamente." }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleCreateSnapshot, style: {
            padding: "6px 14px",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            borderRadius: "var(--radius-xs)",
            fontSize: 11.5,
            fontWeight: 700,
            cursor: "pointer"
          }, children: "+ Crear copia ahora" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 6
        }, children: snapshots.length === 0 ? /* @__PURE__ */ jsx("div", { style: {
          padding: 30,
          textAlign: "center",
          color: "var(--muted-foreground)",
          fontSize: 12
        }, children: "No hay copias guardadas a\xFAn." }) : snapshots.map((snapshot) => /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)"
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { style: {
              color: "var(--foreground)",
              fontSize: 12,
              fontWeight: 600
            }, children: snapshot.reason }),
            /* @__PURE__ */ jsx("div", { style: {
              color: "var(--muted-foreground)",
              fontSize: 10.5,
              marginTop: 2,
              fontFamily: "var(--font-mono)"
            }, children: new Date(snapshot.createdAt).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleRestoreSnapshot(snapshot), style: {
            padding: "4px 12px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xs)",
            color: "var(--foreground)",
            fontSize: 11,
            cursor: "pointer"
          }, children: "Restaurar" })
        ] }, snapshot.id)) })
      ] }),
      activeTab === "support" && /* @__PURE__ */ jsxs("div", { style: {
        maxWidth: 520,
        margin: "16px auto",
        display: "grid",
        gap: 14
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: 18
        }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--muted-foreground)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase"
          }, children: "FLOWSTUDIO \xB7 Soporte" }),
          /* @__PURE__ */ jsx("h3", { style: {
            margin: "6px 0 4px",
            color: "var(--foreground)",
            fontSize: 16,
            fontWeight: 700
          }, children: "\xBFNecesitas ayuda?" }),
          /* @__PURE__ */ jsx("p", { style: {
            margin: 0,
            color: "var(--muted-foreground)",
            fontSize: 12,
            lineHeight: 1.5
          }, children: "Contacta al soporte directo o \xFAnete a la comunidad para anuncios, soporte y actualizaciones." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsx("a", { href: "https://t.me/Oxdailyy", target: "_blank", rel: "noreferrer", style: {
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
          }, children: "Contactar soporte" }),
          /* @__PURE__ */ jsx("a", { href: "https://t.me/+4jBsXihcFv01NjJh", target: "_blank", rel: "noreferrer", style: {
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
          }, children: "Unirse al grupo" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          background: "var(--background)"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "var(--muted-foreground)",
            fontSize: 11.5
          }, children: "Versi\xF3n instalada" }),
          /* @__PURE__ */ jsxs("strong", { style: {
            color: "var(--foreground)",
            fontFamily: "var(--font-mono)",
            fontSize: 12
          }, children: [
            "FLOWSTUDIO ",
            appVersion
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
export {
  O as MaintenanceModal
};
