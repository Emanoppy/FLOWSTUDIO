import { r as React, j as jsx } from "./vendor-react-BbRiLirl.js";
import "./vendor-state-m3Xdu9cz.js";
const F = () => {
  const [updateInfo, setUpdateInfo] = React.useState(null);
  const [isDownloading, setIsDownloading] = React.useState(!1);
  const [downloadPercent, setDownloadPercent] = React.useState(0);
  const [downloadedMB, setDownloadedMB] = React.useState(0);
  const [totalMB, setTotalMB] = React.useState(0);
  const [isDownloaded, setIsDownloaded] = React.useState(!1);
  const [showModal, setShowModal] = React.useState(!1);
  const [errorMessage, setErrorMessage] = React.useState("");
  const formatBytesToMB = bytes => (bytes / 1048576).toFixed(1);
  const checkForUpdates = async () => {
    var electronApi;
    var updatesTemp;
    var assetsTemp;
    var assetsTemp2;
    try {
      const currentVersion = (electronApi = window.electronAPI) != null && electronApi.getAppVersion ? await window.electronAPI.getAppVersion() : "1.8.5";
      const updatesResponse = await fetch("/api/updates").then(response => response.ok ? response.json() : null).catch(() => null);
      const latestUpdate = (updatesTemp = updatesResponse == null ? undefined : updatesResponse.updates) == null ? undefined : updatesTemp[0];
      if (latestUpdate != null && latestUpdate.version && String(latestUpdate.version).localeCompare(String(currentVersion), undefined, {
        numeric: !0
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
      }).then(response => response.ok ? response.json() : null).catch(() => null);
      if (githubRelease != null && githubRelease.tag_name) {
        const releaseVersion = String(githubRelease.tag_name).replace(/^v/, "");
        if (releaseVersion && releaseVersion.localeCompare(String(currentVersion), undefined, {
          numeric: !0
        }) > 0) {
          const isMac = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("mac");
          const matchingAsset = ((assetsTemp = githubRelease.assets) == null ? undefined : assetsTemp.find(asset => isMac ? asset.name.endsWith(".dmg") : asset.name.endsWith(".exe"))) || ((assetsTemp2 = githubRelease.assets) == null ? undefined : assetsTemp2[0]);
          setUpdateInfo({
            version: releaseVersion,
            title: githubRelease.name || "FLOWSTUDIO v" + releaseVersion,
            body: githubRelease.body || "Actualización disponible en GitHub.",
            url: (matchingAsset == null ? undefined : matchingAsset.browser_download_url) || githubRelease.html_url
          });
        }
      }
    } catch {}
  };
  React.useEffect(() => {
    checkForUpdates();
    const intervalId = setInterval(checkForUpdates, 900000);
    const handleOpenAutoUpdateModal = event => {
      if (event != null && event.detail) {
        setUpdateInfo(prevInfo => ({
          version: event.detail.version || (prevInfo == null ? undefined : prevInfo.version) || "1.6.0",
          title: event.detail.title || (prevInfo == null ? undefined : prevInfo.title) || "FLOWSTUDIO v" + (event.detail.version || "1.6.0"),
          body: event.detail.body || (prevInfo == null ? undefined : prevInfo.body) || "Nueva actualización con mejoras de rendimiento y soporte universal Mac y Windows.",
          url: event.detail.url || (prevInfo == null ? undefined : prevInfo.url) || "https://github.com/nmediastudio/flowstudio-releases/releases"
        }));
      }
      setShowModal(!0);
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
    const unsubscribeProgress = window.electronAPI.onUpdateProgress(progress => {
      setIsDownloading(!0);
      setDownloadPercent(progress.percent || 0);
      if (progress.receivedBytes) {
        setDownloadedMB(formatBytesToMB(progress.receivedBytes));
      }
      if (progress.totalBytes) {
        setTotalMB(formatBytesToMB(progress.totalBytes));
      }
    });
    const unsubscribeDownloaded = window.electronAPI.onUpdateDownloaded(() => {
      setIsDownloading(!1);
      setDownloadPercent(100);
      setIsDownloaded(!0);
      setShowModal(!0);
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
        setIsDownloading(!0);
        setDownloadPercent(1);
        setShowModal(!0);
        try {
          await window.electronAPI.startDownloadUpdate(updateInfo.url, updateInfo.version);
        } catch (error) {
          console.warn("Fallo descarga remota, reintentando con endpoint local...", error);
          try {
            await window.electronAPI.startDownloadUpdate("http://127.0.0.1:4322/api/download/latest", updateInfo.version);
          } catch (fallbackError) {
            setIsDownloading(!1);
            setErrorMessage(error.message || fallbackError.message || "Error al descargar actualización.");
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
    return <jsx.Fragment>{!isDownloading && !isDownloaded && <div onClick={() => setShowModal(true)} style={{
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
      }}><div style={{
          fontSize: 20
        }}>🚀</div><div><div style={{
            fontSize: 13,
            fontWeight: 800,
            color: "#a5b4fc"
          }}>Nueva Versión {updateInfo.version} Disponible</div><div style={{
            fontSize: 11,
            color: "#c7d2fe"
          }}>Haz clic para actualizar en segundo plano</div></div><span style={{
          background: "#4f46e5",
          padding: "4px 10px",
          borderRadius: 8,
          fontSize: 11,
          fontWeight: 800,
          color: "#fff"
        }}>Actualizar</span></div>}{isDownloading && <div style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 10000,
        background: "#0c0f1d",
        border: "1px solid rgba(99, 102, 241, 0.5)",
        borderRadius: 16,
        padding: "18px 22px",
        width: 360,
        boxShadow: "0 20px 40px rgba(0,0,0,0.7), 0 0 30px rgba(79, 70, 229, 0.25)",
        color: "#fff",
        fontFamily: "var(--font-sans, system-ui)"
      }}><div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8
        }}><div style={{
            display: "flex",
            alignItems: "center",
            gap: 8
          }}><span className="working" style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: "2px solid #6366f1",
              borderTopColor: "transparent",
              animation: "spin 0.8s linear infinite"
            }} /><strong style={{
              fontSize: 13,
              color: "#e0e7ff"
            }}>Descargando v{updateInfo.version}...</strong></div><span style={{
            fontSize: 13,
            fontWeight: 800,
            color: "#818cf8",
            fontFamily: "monospace"
          }}>{downloadPercent}%</span></div><div style={{
          width: "100%",
          height: 8,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 99,
          overflow: "hidden",
          margin: "10px 0"
        }}><div style={{
            width: downloadPercent + "%",
            height: "100%",
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            borderRadius: 99,
            transition: "width 0.2s ease"
          }} /></div><div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#94a3b8"
        }}><span>Segundo plano</span><span>{totalMB > 0 ? downloadedMB + " MB / " + totalMB + " MB" : "Descargando instalador..."}</span></div></div>}{showModal && <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 10001,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }} onClick={event => {
        if (event.target === event.currentTarget && !isDownloading) {
          setShowModal(false);
        }
      }}><div style={{
          background: "#0d111d",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          padding: "28px 32px",
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
          color: "#fff",
          fontFamily: "var(--font-sans, system-ui)"
        }}>{isDownloaded ? <div style={{
            textAlign: "center"
          }}><div style={{
              fontSize: 48,
              marginBottom: 14
            }}>🎉</div><h2 style={{
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 8
            }}>¡Actualización v{updateInfo.version} Lista!</h2><p style={{
              fontSize: 13,
              color: "#94a3b8",
              lineHeight: 1.5,
              marginBottom: 24
            }}>La nueva versión se descargó completamente en segundo plano. Al reiniciar, FLOWSTUDIO se actualizará automáticamente sin perder tus proyectos.</p><div style={{
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}><button onClick={handleInstall} style={{
                padding: "14px 20px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)"
              }}>🚀 Reiniciar e Instalar Ahora</button><button onClick={() => setShowModal(false)} style={{
                padding: "10px",
                background: "transparent",
                color: "#94a3b8",
                border: "none",
                fontSize: 13,
                cursor: "pointer"
              }}>Instalar más tarde</button></div></div> : isDownloading ? <div><h2 style={{
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 6
            }}>Descargando FLOWSTUDIO v{updateInfo.version}</h2><p style={{
              fontSize: 13,
              color: "#94a3b8",
              marginBottom: 20
            }}>Puedes seguir editando tus videos con normalidad. Te avisaremos cuando termine.</p><div style={{
              width: "100%",
              height: 10,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 99,
              overflow: "hidden",
              marginBottom: 10
            }}><div style={{
                width: downloadPercent + "%",
                height: "100%",
                background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
                borderRadius: 99,
                transition: "width 0.2s"
              }} /></div><div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "#818cf8",
              fontWeight: 700,
              marginBottom: 20
            }}><span>{downloadPercent}% completado</span><span>{totalMB > 0 ? downloadedMB + " MB / " + totalMB + " MB" : ""}</span></div><div style={{
              textAlign: "right"
            }}><button onClick={() => setShowModal(false)} style={{
                padding: "8px 16px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#fff",
                fontSize: 12,
                cursor: "pointer"
              }}>Ocultar (Seguir en segundo plano)</button></div></div> : <div><div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16
            }}><div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(99, 102, 241, 0.2)",
                border: "1px solid rgba(99,102,241,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22
              }}>🚀</div><div><h2 style={{
                  fontSize: 18,
                  fontWeight: 800
                }}>{updateInfo.title}</h2><span style={{
                  fontSize: 12,
                  color: "#818cf8",
                  fontWeight: 700
                }}>Versión {updateInfo.version}</span></div></div><div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: 14,
              marginBottom: 20,
              maxHeight: 150,
              overflowY: "auto"
            }}><p style={{
                fontSize: 13,
                color: "#cbd5e1",
                whiteSpace: "pre-wrap",
                lineHeight: 1.5
              }}>{updateInfo.body}</p></div>{errorMessage && <div style={{
              marginBottom: 16,
              padding: 10,
              borderRadius: 8,
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#fca5a5",
              fontSize: 12
            }}>{errorMessage}</div>}<div style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10
            }}><button onClick={() => setShowModal(false)} style={{
                padding: "10px 18px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              }}>Más tarde</button><button onClick={handleDownload} style={{
                padding: "10px 22px",
                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                border: "none",
                borderRadius: 10,
                color: "#fff",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(79, 70, 229, 0.4)"
              }}>⚡ Descargar e Instalar</button></div></div>}</div></div>}</jsx.Fragment>;
  } else {
    return null;
  }
};
export { F as AutoUpdateModal };