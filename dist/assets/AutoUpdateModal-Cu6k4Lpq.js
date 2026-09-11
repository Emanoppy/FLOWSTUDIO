import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
import { r as React, j as jsx2 } from "./vendor-react-BbRiLirl.js";
import "./vendor-state-m3Xdu9cz.js";
const F = () => {
  const [updateInfo, setUpdateInfo] = React.useState(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadPercent, setDownloadPercent] = React.useState(0);
  const [downloadedMB, setDownloadedMB] = React.useState(0);
  const [totalMB, setTotalMB] = React.useState(0);
  const [isDownloaded, setIsDownloaded] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const formatBytesToMB = (bytes) => (bytes / 1048576).toFixed(1);
  const checkForUpdates = async () => {
    var electronApi;
    var updatesTemp;
    var assetsTemp;
    var assetsTemp2;
    try {
      const currentVersion = (electronApi = window.electronAPI) != null && electronApi.getAppVersion ? await window.electronAPI.getAppVersion() : "1.8.5";
      const updatesResponse = await fetch("/api/updates").then((response) => response.ok ? response.json() : null).catch(() => null);
      const latestUpdate = (updatesTemp = updatesResponse == null ? void 0 : updatesResponse.updates) == null ? void 0 : updatesTemp[0];
      if (latestUpdate != null && latestUpdate.version && String(latestUpdate.version).localeCompare(String(currentVersion), void 0, {
        numeric: true
      }) > 0) {
        setUpdateInfo({
          version: latestUpdate.version,
          title: latestUpdate.title || "FLOWSTUDIO v" + latestUpdate.version,
          body: latestUpdate.body || "Nuevas mejoras y correcciones de estabilidad.",
          url: latestUpdate.url || ""
        });
        return;
      }
      const githubRelease = await fetch("https://api.github.com/repos/nmediastudio/flowstudio-releases/releases/latest", {
        headers: {
          Accept: "application/vnd.github+json"
        }
      }).then((response) => response.ok ? response.json() : null).catch(() => null);
      if (githubRelease != null && githubRelease.tag_name) {
        const releaseVersion = String(githubRelease.tag_name).replace(/^v/, "");
        if (releaseVersion && releaseVersion.localeCompare(String(currentVersion), void 0, {
          numeric: true
        }) > 0) {
          const isMac = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("mac");
          const matchingAsset = ((assetsTemp = githubRelease.assets) == null ? void 0 : assetsTemp.find((asset) => isMac ? asset.name.endsWith(".dmg") : asset.name.endsWith(".exe"))) || ((assetsTemp2 = githubRelease.assets) == null ? void 0 : assetsTemp2[0]);
          setUpdateInfo({
            version: releaseVersion,
            title: githubRelease.name || "FLOWSTUDIO v" + releaseVersion,
            body: githubRelease.body || "Actualizaci\xF3n disponible en GitHub.",
            url: (matchingAsset == null ? void 0 : matchingAsset.browser_download_url) || githubRelease.html_url
          });
        }
      }
    } catch {
    }
  };
  React.useEffect(() => {
    checkForUpdates();
    const intervalId = setInterval(checkForUpdates, 9e5);
    const handleOpenAutoUpdateModal = (event) => {
      if (event != null && event.detail) {
        setUpdateInfo((prevInfo) => ({
          version: event.detail.version || (prevInfo == null ? void 0 : prevInfo.version) || "1.6.0",
          title: event.detail.title || (prevInfo == null ? void 0 : prevInfo.title) || "FLOWSTUDIO v" + (event.detail.version || "1.6.0"),
          body: event.detail.body || (prevInfo == null ? void 0 : prevInfo.body) || "Nueva actualizaci\xF3n con mejoras de rendimiento y soporte universal Mac y Windows.",
          url: event.detail.url || (prevInfo == null ? void 0 : prevInfo.url) || "https://github.com/nmediastudio/flowstudio-releases/releases"
        }));
      }
      setShowModal(true);
    };
    window.addEventListener("open-auto-update-modal", handleOpenAutoUpdateModal);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("open-auto-update-modal", handleOpenAutoUpdateModal);
    };
  }, []);
  React.useEffect(() => {
    var electronApi;
    if ((electronApi = window.electronAPI) == null || !electronApi.onUpdateProgress) {
      return;
    }
    const unsubscribeProgress = window.electronAPI.onUpdateProgress((progress) => {
      setIsDownloading(true);
      setDownloadPercent(progress.percent || 0);
      if (progress.receivedBytes) {
        setDownloadedMB(formatBytesToMB(progress.receivedBytes));
      }
      if (progress.totalBytes) {
        setTotalMB(formatBytesToMB(progress.totalBytes));
      }
    });
    const unsubscribeDownloaded = window.electronAPI.onUpdateDownloaded(() => {
      setIsDownloading(false);
      setDownloadPercent(100);
      setIsDownloaded(true);
      setShowModal(true);
    });
    return () => {
      if (typeof unsubscribeProgress == "function") {
        unsubscribeProgress();
      }
      if (typeof unsubscribeDownloaded == "function") {
        unsubscribeDownloaded();
      }
    };
  }, []);
  const handleDownload = async () => {
    var electronApi;
    if (updateInfo) {
      setErrorMessage("");
      if ((electronApi = window.electronAPI) != null && electronApi.startDownloadUpdate && updateInfo.url) {
        setIsDownloading(true);
        setDownloadPercent(1);
        setShowModal(true);
        try {
          await window.electronAPI.startDownloadUpdate(updateInfo.url, updateInfo.version);
        } catch (error) {
          console.warn("Fallo descarga remota, reintentando con endpoint local...", error);
          try {
            await window.electronAPI.startDownloadUpdate("http://127.0.0.1:4322/api/download/latest", updateInfo.version);
          } catch (fallbackError) {
            setIsDownloading(false);
            setErrorMessage(error.message || fallbackError.message || "Error al descargar actualizaci\xF3n.");
          }
        }
      } else if (updateInfo.url && updateInfo.url.startsWith("http")) {
        window.open(updateInfo.url, "_blank");
      } else {
        setShowModal(true);
      }
    }
  };
  const handleInstall = async () => {
    var electronApi;
    try {
      if ((electronApi = window.electronAPI) != null && electronApi.installUpdate) {
        await window.electronAPI.installUpdate();
      }
    } catch (error) {
      alert("Error al instalar: " + error.message);
    }
  };
  if (updateInfo) {
    return /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
      !isDownloading && !isDownloaded && /* @__PURE__ */ jsxs("div", { onClick: () => setShowModal(true), style: {
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: "linear-gradient(135deg, #1e1b4b, #312e81)",
        border: "1px solid rgba(129, 140, 248, 0.4)",
        borderRadius: 14,
        padding: "12px 18px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(99, 102, 241, 0.3)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 12,
        color: "#fff",
        fontFamily: "var(--font-sans, system-ui)",
        animation: "pulse 2s infinite"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: 20
        }, children: "\u{1F680}" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { style: {
            fontSize: 13,
            fontWeight: 800,
            color: "#a5b4fc"
          }, children: [
            "Nueva Versi\xF3n ",
            updateInfo.version,
            " Disponible"
          ] }),
          /* @__PURE__ */ jsx("div", { style: {
            fontSize: 11,
            color: "#c7d2fe"
          }, children: "Haz clic para actualizar en segundo plano" })
        ] }),
        /* @__PURE__ */ jsx("span", { style: {
          background: "#4f46e5",
          padding: "4px 10px",
          borderRadius: 8,
          fontSize: 11,
          fontWeight: 800,
          color: "#fff"
        }, children: "Actualizar" })
      ] }),
      isDownloading && /* @__PURE__ */ jsxs("div", { style: {
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1e4,
        background: "#0c0f1d",
        border: "1px solid rgba(99, 102, 241, 0.5)",
        borderRadius: 16,
        padding: "18px 22px",
        width: 360,
        boxShadow: "0 20px 40px rgba(0,0,0,0.7), 0 0 30px rgba(79, 70, 229, 0.25)",
        color: "#fff",
        fontFamily: "var(--font-sans, system-ui)"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 8
          }, children: [
            /* @__PURE__ */ jsx("span", { className: "working", style: {
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: "2px solid #6366f1",
              borderTopColor: "transparent",
              animation: "spin 0.8s linear infinite"
            } }),
            /* @__PURE__ */ jsxs("strong", { style: {
              fontSize: 13,
              color: "#e0e7ff"
            }, children: [
              "Descargando v",
              updateInfo.version,
              "..."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { style: {
            fontSize: 13,
            fontWeight: 800,
            color: "#818cf8",
            fontFamily: "monospace"
          }, children: [
            downloadPercent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          height: 8,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 99,
          overflow: "hidden",
          margin: "10px 0"
        }, children: /* @__PURE__ */ jsx("div", { style: {
          width: downloadPercent + "%",
          height: "100%",
          background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
          borderRadius: 99,
          transition: "width 0.2s ease"
        } }) }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#94a3b8"
        }, children: [
          /* @__PURE__ */ jsx("span", { children: "Segundo plano" }),
          /* @__PURE__ */ jsx("span", { children: totalMB > 0 ? downloadedMB + " MB / " + totalMB + " MB" : "Descargando instalador..." })
        ] })
      ] }),
      showModal && /* @__PURE__ */ jsx("div", { style: {
        position: "fixed",
        inset: 0,
        zIndex: 10001,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }, onClick: (event) => {
        if (event.target === event.currentTarget && !isDownloading) {
          setShowModal(false);
        }
      }, children: /* @__PURE__ */ jsx("div", { style: {
        background: "#0d111d",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 20,
        padding: "28px 32px",
        width: "100%",
        maxWidth: 480,
        boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
        color: "#fff",
        fontFamily: "var(--font-sans, system-ui)"
      }, children: isDownloaded ? /* @__PURE__ */ jsxs("div", { style: {
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: 48,
          marginBottom: 14
        }, children: "\u{1F389}" }),
        /* @__PURE__ */ jsxs("h2", { style: {
          fontSize: 22,
          fontWeight: 800,
          marginBottom: 8
        }, children: [
          "\xA1Actualizaci\xF3n v",
          updateInfo.version,
          " Lista!"
        ] }),
        /* @__PURE__ */ jsx("p", { style: {
          fontSize: 13,
          color: "#94a3b8",
          lineHeight: 1.5,
          marginBottom: 24
        }, children: "La nueva versi\xF3n se descarg\xF3 completamente en segundo plano. Al reiniciar, FLOWSTUDIO se actualizar\xE1 autom\xE1ticamente sin perder tus proyectos." }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsx("button", { onClick: handleInstall, style: {
            padding: "14px 20px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)"
          }, children: "\u{1F680} Reiniciar e Instalar Ahora" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), style: {
            padding: "10px",
            background: "transparent",
            color: "#94a3b8",
            border: "none",
            fontSize: 13,
            cursor: "pointer"
          }, children: "Instalar m\xE1s tarde" })
        ] })
      ] }) : isDownloading ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { style: {
          fontSize: 18,
          fontWeight: 800,
          marginBottom: 6
        }, children: [
          "Descargando FLOWSTUDIO v",
          updateInfo.version
        ] }),
        /* @__PURE__ */ jsx("p", { style: {
          fontSize: 13,
          color: "#94a3b8",
          marginBottom: 20
        }, children: "Puedes seguir editando tus videos con normalidad. Te avisaremos cuando termine." }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          height: 10,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 99,
          overflow: "hidden",
          marginBottom: 10
        }, children: /* @__PURE__ */ jsx("div", { style: {
          width: downloadPercent + "%",
          height: "100%",
          background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
          borderRadius: 99,
          transition: "width 0.2s"
        } }) }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "#818cf8",
          fontWeight: 700,
          marginBottom: 20
        }, children: [
          /* @__PURE__ */ jsxs("span", { children: [
            downloadPercent,
            "% completado"
          ] }),
          /* @__PURE__ */ jsx("span", { children: totalMB > 0 ? downloadedMB + " MB / " + totalMB + " MB" : "" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          textAlign: "right"
        }, children: /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), style: {
          padding: "8px 16px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          color: "#fff",
          fontSize: 12,
          cursor: "pointer"
        }, children: "Ocultar (Seguir en segundo plano)" }) })
      ] }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16
        }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgba(99, 102, 241, 0.2)",
            border: "1px solid rgba(99,102,241,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22
          }, children: "\u{1F680}" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { style: {
              fontSize: 18,
              fontWeight: 800
            }, children: updateInfo.title }),
            /* @__PURE__ */ jsxs("span", { style: {
              fontSize: 12,
              color: "#818cf8",
              fontWeight: 700
            }, children: [
              "Versi\xF3n ",
              updateInfo.version
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: 14,
          marginBottom: 20,
          maxHeight: 150,
          overflowY: "auto"
        }, children: /* @__PURE__ */ jsx("p", { style: {
          fontSize: 13,
          color: "#cbd5e1",
          whiteSpace: "pre-wrap",
          lineHeight: 1.5
        }, children: updateInfo.body }) }),
        errorMessage && /* @__PURE__ */ jsx("div", { style: {
          marginBottom: 16,
          padding: 10,
          borderRadius: 8,
          background: "rgba(239,68,68,0.15)",
          border: "1px solid rgba(239,68,68,0.3)",
          color: "#fca5a5",
          fontSize: 12
        }, children: errorMessage }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "flex-end",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), style: {
            padding: "10px 18px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer"
          }, children: "M\xE1s tarde" }),
          /* @__PURE__ */ jsx("button", { onClick: handleDownload, style: {
            padding: "10px 22px",
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            border: "none",
            borderRadius: 10,
            color: "#fff",
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(79, 70, 229, 0.4)"
          }, children: "\u26A1 Descargar e Instalar" })
        ] })
      ] }) }) })
    ] });
  } else {
    return null;
  }
};
export {
  F as AutoUpdateModal
};
