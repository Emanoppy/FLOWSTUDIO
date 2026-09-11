import { r as React, j as jsx } from "./vendor-react-BbRiLirl.js";
import { u as useAuthStore, a as apiFetch } from "./index-DE7up0M0.js";
import "./vendor-state-m3Xdu9cz.js";
import "./vendor-remotion-D3IpuOk5.js";
const w = "https://t.me/Oxdailyy";
const T = "@Oxdailyy";
const L = ({
  isOpen,
  onClose,
  reason = ""
}) => {
  const [licenseInput, setLicenseInput] = React.useState("");
  const [hwid, setHwid] = React.useState("Detectando equipo…");
  const [copied, setCopied] = React.useState(!1);
  const [isSubmitting, setIsSubmitting] = React.useState(!1);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const setAuthUser = useAuthStore(state => state.setAuthUser);
  useAuthStore(state => state.authUser);
  React.useEffect(() => {
    if (!isOpen) {
      setErrorMessage("");
      setSuccessMessage("");
      return;
    }
    apiFetch("/api/auth/hwid").then(response => response.json()).then(data => {
      if (data.ok && data.hwid) {
        setHwid(data.hwid);
      }
    }).catch(() => setHwid("No disponible"));
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  const handleCopyHwid = () => {
    if (hwid && hwid.startsWith("FT-")) {
      navigator.clipboard.writeText(hwid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const handleOpenTelegram = () => {
    var electronApi;
    if ((electronApi = window.electronAPI) != null && electronApi.openExternal) {
      window.electronAPI.openExternal(w);
    } else {
      window.open(w, "_blank");
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const licenseKey = licenseInput.trim().toUpperCase();
    if (!licenseKey) {
      setErrorMessage("Por favor, introduce tu clave de licencia.");
      return;
    }
    setIsSubmitting(!0);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const hwidToSend = hwid.startsWith("FT-") ? hwid : undefined;
      const response = await apiFetch("/api/auth/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          licenseKey: licenseKey,
          hwid: hwidToSend
        })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "No se pudo validar la clave de licencia.");
      }
      setSuccessMessage("¡Licencia activada con éxito! Bienvenido, " + (data.user.username || "Creador") + ".");
      setAuthUser(data.user, data.token, !0);
      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (error) {
      setErrorMessage(error.message || "Error al activar la licencia.");
    } finally {
      setIsSubmitting(!1);
    }
  };
  return <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(4, 6, 12, 0.85)",
    backdropFilter: "blur(14px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    padding: 20
  }} onClick={event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }}><div style={{
      width: "100%",
      maxWidth: 520,
      background: "linear-gradient(180deg, #111524 0%, #0a0d17 100%)",
      border: "1px solid rgba(99, 102, 241, 0.35)",
      borderRadius: 20,
      boxShadow: "0 24px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.15)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      animation: "modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
    }}><div style={{
        padding: "16px 22px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255, 255, 255, 0.02)"
      }}><div style={{
          display: "flex",
          alignItems: "center",
          gap: 10
        }}><div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1, #d7ff4f)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)"
          }}>✨</div><div><h3 style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.2px"
            }}>FLOWSTUDIO VIP · Activar Licencia</h3><span style={{
              fontSize: 10.5,
              color: "#94a3b8",
              fontWeight: 600
            }}>Desbloquea el poder total de Inteligencia Artificial</span></div></div><button onClick={onClose} style={{
          background: "transparent",
          border: "none",
          color: "#94a3b8",
          fontSize: 20,
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: 6,
          lineHeight: 1
        }}>×</button></div>{reason && <div style={{
        padding: "8px 18px",
        background: "rgba(245, 158, 11, 0.12)",
        borderBottom: "1px solid rgba(245, 158, 11, 0.25)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11.5,
        color: "#fbbf24",
        fontWeight: 700
      }}><span>🔒</span><span>{reason}</span></div>}<div style={{
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14
      }}><div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          background: "rgba(16, 22, 38, 0.6)",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid rgba(255, 255, 255, 0.05)"
        }}><div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "#e2e8f0"
          }}><span style={{
              color: "#10b981",
              fontSize: 12
            }}>✓</span><span>Google Flow Ilimitado</span></div><div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "#e2e8f0"
          }}><span style={{
              color: "#10b981",
              fontSize: 12
            }}>✓</span><span>Video Veo 3.1 & Omni Flash</span></div><div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "#e2e8f0"
          }}><span style={{
              color: "#10b981",
              fontSize: 12
            }}>✓</span><span>Auto-Piloto Total (1 Clic)</span></div><div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "#e2e8f0"
          }}><span style={{
              color: "#10b981",
              fontSize: 12
            }}>✓</span><span>Renders 4K sin Límite</span></div></div><form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}><div><label style={{
              display: "block",
              fontSize: 11.5,
              fontWeight: 800,
              color: "#cbd5e1",
              marginBottom: 6
            }}>Ingresa tu Clave de Licencia</label><input type="text" autoFocus={!0} value={licenseInput} onChange={event => setLicenseInput(event.target.value.toUpperCase())} placeholder="XXXX-XXXX-XXXX" required={!0} style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#080a10",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              borderRadius: 10,
              padding: "10px 14px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
              fontFamily: "monospace",
              outline: "none",
              boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.4)"
            }} /></div>{errorMessage && <div style={{
            padding: "8px 12px",
            borderRadius: 8,
            background: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            color: "#fca5a5",
            fontSize: 11.5,
            fontWeight: 600
          }}>⚠️ {errorMessage}</div>}{successMessage && <div style={{
            padding: "8px 12px",
            borderRadius: 8,
            background: "rgba(34, 197, 94, 0.15)",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            color: "#86efac",
            fontSize: 11.5,
            fontWeight: 700
          }}>✅ {successMessage}</div>}<button type="submit" disabled={isSubmitting} style={{
            marginTop: 2,
            height: 40,
            border: "none",
            borderRadius: 10,
            background: "linear-gradient(135deg, #d7ff4f 0%, #10b981 100%)",
            color: "#000",
            fontSize: 12.5,
            fontWeight: 900,
            cursor: isSubmitting ? "wait" : "pointer",
            boxShadow: "0 4px 16px rgba(215, 255, 79, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "transform 0.15s ease, filter 0.15s ease"
          }}>{isSubmitting ? <jsx.Fragment><span className="working" style={{
                width: 14,
                height: 14,
                borderWidth: 2,
                borderColor: "#000"
              }} /><span>Validando clave con el servidor…</span></jsx.Fragment> : <jsx.Fragment><span>⚡</span><span>ACTIVAR MI CUENTA AHORA</span></jsx.Fragment>}</button></form><div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          margin: "2px 0"
        }}><div style={{
            flex: 1,
            height: 1,
            background: "rgba(255, 255, 255, 0.08)"
          }} /><span style={{
            fontSize: 10.5,
            color: "#64748b",
            fontWeight: 700
          }}>O SOLICITA TU ACCESO</span><div style={{
            flex: 1,
            height: 1,
            background: "rgba(255, 255, 255, 0.08)"
          }} /></div><button type="button" onClick={handleOpenTelegram} style={{
          background: "linear-gradient(135deg, #229ED9 0%, #1782B8 100%)",
          border: "1px solid rgba(34, 158, 217, 0.5)",
          borderRadius: 12,
          padding: "10px 14px",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 20px rgba(34, 158, 217, 0.35)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease"
        }}><div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textAlign: "left"
          }}><div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16
            }}>✈️</div><div><div style={{
                fontSize: 12.5,
                fontWeight: 900,
                letterSpacing: "-0.2px"
              }}>Solicitar Licencia por Telegram ({T})</div><div style={{
                fontSize: 10,
                opacity: 0.85,
                fontWeight: 600
              }}>Respuesta inmediata · Activación y entrega de clave al instante 24/7</div></div></div><span style={{
            fontSize: 16,
            fontWeight: 800
          }}>→</span></button><div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 10,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}><div style={{
            display: "flex",
            flexDirection: "column"
          }}><span style={{
              fontSize: 9.5,
              color: "#64748b",
              fontWeight: 800,
              textTransform: "uppercase"
            }}>Identificador de tu Computadora (HWID)</span><span style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "#94a3b8",
              fontWeight: 700
            }}>{hwid}</span></div><button type="button" onClick={handleCopyHwid} style={{
            background: copied ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.06)",
            border: "1px solid " + (copied ? "rgba(34, 197, 94, 0.5)" : "rgba(255, 255, 255, 0.12)"),
            color: copied ? "#86efac" : "#cbd5e1",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 10.5,
            fontWeight: 700,
            cursor: "pointer"
          }}>{copied ? "✓ Copiado" : "📋 Copiar"}</button></div></div></div></div>;
};
export { L as ActivationModal };