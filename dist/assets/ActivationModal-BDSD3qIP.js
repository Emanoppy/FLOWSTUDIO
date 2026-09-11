import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
import { r as React, j as jsx2 } from "./vendor-react-BbRiLirl.js";
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
  const [hwid, setHwid] = React.useState("Detectando equipo\u2026");
  const [copied, setCopied] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  useAuthStore((state) => state.authUser);
  React.useEffect(() => {
    if (!isOpen) {
      setErrorMessage("");
      setSuccessMessage("");
      return;
    }
    apiFetch("/api/auth/hwid").then((response) => response.json()).then((data) => {
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
      setTimeout(() => setCopied(false), 2e3);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const licenseKey = licenseInput.trim().toUpperCase();
    if (!licenseKey) {
      setErrorMessage("Por favor, introduce tu clave de licencia.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const hwidToSend = hwid.startsWith("FT-") ? hwid : void 0;
      const response = await apiFetch("/api/auth/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          licenseKey,
          hwid: hwidToSend
        })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "No se pudo validar la clave de licencia.");
      }
      setSuccessMessage("\xA1Licencia activada con \xE9xito! Bienvenido, " + (data.user.username || "Creador") + ".");
      setAuthUser(data.user, data.token, true);
      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (error) {
      setErrorMessage(error.message || "Error al activar la licencia.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { style: {
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
  }, onClick: (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, children: /* @__PURE__ */ jsxs("div", { style: {
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
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "16px 22px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(255, 255, 255, 0.02)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          width: 32,
          height: 32,
          borderRadius: 10,
          background: "linear-gradient(135deg, #6366f1, #d7ff4f)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)"
        }, children: "\u2728" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { style: {
            margin: 0,
            fontSize: 15,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.2px"
          }, children: "FLOWSTUDIO VIP \xB7 Activar Licencia" }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 10.5,
            color: "#94a3b8",
            fontWeight: 600
          }, children: "Desbloquea el poder total de Inteligencia Artificial" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, style: {
        background: "transparent",
        border: "none",
        color: "#94a3b8",
        fontSize: 20,
        cursor: "pointer",
        padding: "4px 8px",
        borderRadius: 6,
        lineHeight: 1
      }, children: "\xD7" })
    ] }),
    reason && /* @__PURE__ */ jsxs("div", { style: {
      padding: "8px 18px",
      background: "rgba(245, 158, 11, 0.12)",
      borderBottom: "1px solid rgba(245, 158, 11, 0.25)",
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 11.5,
      color: "#fbbf24",
      fontWeight: 700
    }, children: [
      /* @__PURE__ */ jsx("span", { children: "\u{1F512}" }),
      /* @__PURE__ */ jsx("span", { children: reason })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "18px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        background: "rgba(16, 22, 38, 0.6)",
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(255, 255, 255, 0.05)"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "#e2e8f0"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "#10b981",
            fontSize: 12
          }, children: "\u2713" }),
          /* @__PURE__ */ jsx("span", { children: "Google Flow Ilimitado" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "#e2e8f0"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "#10b981",
            fontSize: 12
          }, children: "\u2713" }),
          /* @__PURE__ */ jsx("span", { children: "Video Veo 3.1 & Omni Flash" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "#e2e8f0"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "#10b981",
            fontSize: 12
          }, children: "\u2713" }),
          /* @__PURE__ */ jsx("span", { children: "Auto-Piloto Total (1 Clic)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "#e2e8f0"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "#10b981",
            fontSize: 12
          }, children: "\u2713" }),
          /* @__PURE__ */ jsx("span", { children: "Renders 4K sin L\xEDmite" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { style: {
            display: "block",
            fontSize: 11.5,
            fontWeight: 800,
            color: "#cbd5e1",
            marginBottom: 6
          }, children: "Ingresa tu Clave de Licencia" }),
          /* @__PURE__ */ jsx("input", { type: "text", autoFocus: true, value: licenseInput, onChange: (event) => setLicenseInput(event.target.value.toUpperCase()), placeholder: "XXXX-XXXX-XXXX", required: true, style: {
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
          } })
        ] }),
        errorMessage && /* @__PURE__ */ jsxs("div", { style: {
          padding: "8px 12px",
          borderRadius: 8,
          background: "rgba(239, 68, 68, 0.12)",
          border: "1px solid rgba(239, 68, 68, 0.35)",
          color: "#fca5a5",
          fontSize: 11.5,
          fontWeight: 600
        }, children: [
          "\u26A0\uFE0F ",
          errorMessage
        ] }),
        successMessage && /* @__PURE__ */ jsxs("div", { style: {
          padding: "8px 12px",
          borderRadius: 8,
          background: "rgba(34, 197, 94, 0.15)",
          border: "1px solid rgba(34, 197, 94, 0.4)",
          color: "#86efac",
          fontSize: 11.5,
          fontWeight: 700
        }, children: [
          "\u2705 ",
          successMessage
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting, style: {
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
        }, children: isSubmitting ? /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "working", style: {
            width: 14,
            height: 14,
            borderWidth: 2,
            borderColor: "#000"
          } }),
          /* @__PURE__ */ jsx("span", { children: "Validando clave con el servidor\u2026" })
        ] }) : /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "\u26A1" }),
          /* @__PURE__ */ jsx("span", { children: "ACTIVAR MI CUENTA AHORA" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "2px 0"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          flex: 1,
          height: 1,
          background: "rgba(255, 255, 255, 0.08)"
        } }),
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 10.5,
          color: "#64748b",
          fontWeight: 700
        }, children: "O SOLICITA TU ACCESO" }),
        /* @__PURE__ */ jsx("div", { style: {
          flex: 1,
          height: 1,
          background: "rgba(255, 255, 255, 0.08)"
        } })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: handleOpenTelegram, style: {
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
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          textAlign: "left"
        }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16
          }, children: "\u2708\uFE0F" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              fontSize: 12.5,
              fontWeight: 900,
              letterSpacing: "-0.2px"
            }, children: [
              "Solicitar Licencia por Telegram (",
              T,
              ")"
            ] }),
            /* @__PURE__ */ jsx("div", { style: {
              fontSize: 10,
              opacity: 0.85,
              fontWeight: 600
            }, children: "Respuesta inmediata \xB7 Activaci\xF3n y entrega de clave al instante 24/7" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 16,
          fontWeight: 800
        }, children: "\u2192" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 10,
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          flexDirection: "column"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 9.5,
            color: "#64748b",
            fontWeight: 800,
            textTransform: "uppercase"
          }, children: "Identificador de tu Computadora (HWID)" }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 11,
            fontFamily: "monospace",
            color: "#94a3b8",
            fontWeight: 700
          }, children: hwid })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: handleCopyHwid, style: {
          background: copied ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.06)",
          border: "1px solid " + (copied ? "rgba(34, 197, 94, 0.5)" : "rgba(255, 255, 255, 0.12)"),
          color: copied ? "#86efac" : "#cbd5e1",
          borderRadius: 6,
          padding: "4px 8px",
          fontSize: 10.5,
          fontWeight: 700,
          cursor: "pointer"
        }, children: copied ? "\u2713 Copiado" : "\u{1F4CB} Copiar" })
      ] })
    ] })
  ] }) });
};
export {
  L as ActivationModal
};
