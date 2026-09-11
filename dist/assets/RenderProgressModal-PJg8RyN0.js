import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
import { r as React, j as jsx2 } from "./vendor-react-BbRiLirl.js";
import "./vendor-state-m3Xdu9cz.js";
const z = ({
  isOpen,
  onClose,
  renderJob,
  onRetry,
  onCancel
}) => {
  var electronApi;
  const job = renderJob || {};
  const [now, setNow] = React.useState(Date.now);
  const isDone = job.status === "done";
  const isError = job.status === "error";
  const isCancelled = job.status === "cancelled";
  const isCancelling = job.phase === "cancelling";
  const isFinished = isDone || isError || isCancelled;
  React.useEffect(() => {
    if (!isOpen || isFinished) {
      return;
    }
    setNow(Date.now());
    const intervalId = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(intervalId);
  }, [isOpen, isFinished, job.jobId]);
  if (!isOpen) {
    return null;
  }
  const elapsedSeconds = job.startedAt ? Math.max(0, Math.floor(((job.finishedAt || now) - job.startedAt) / 1e3)) : 0;
  const progressPercent = isDone ? 100 : Math.max(0, Math.min(99, Number(job.progress) || 0));
  const videoUrl = job.url;
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return minutes + ":" + String(secs).padStart(2, "0");
  };
  const etaSeconds = progressPercent > 4 && elapsedSeconds > 2 && !isFinished && !isCancelling ? Math.max(1, Math.round(elapsedSeconds / (progressPercent / 100) - elapsedSeconds)) : null;
  return /* @__PURE__ */ jsx("div", { onMouseDown: (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, style: {
    position: "fixed",
    inset: 0,
    zIndex: 1e4,
    background: "rgba(3, 4, 8, 0.82)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    animation: "ft-fade-in 200ms ease-out"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    width: "100%",
    maxWidth: 520,
    background: "linear-gradient(180deg, #111420 0%, #090b12 100%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    boxShadow: "0 32px 80px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 50px -15px rgba(99, 102, 241, 0.25)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
    color: "var(--foreground, #f8fafc)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "18px 22px 14px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 3
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 10.5,
          fontWeight: 700,
          color: "var(--muted-foreground, #94a3b8)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "var(--font-mono, monospace)"
        }, children: "Exportaci\xF3n de Video" }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 9
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: isDone ? "#10b981" : isError || isCancelled ? "#f43f5e" : "#6366f1",
            boxShadow: isDone ? "0 0 12px #10b981" : isError || isCancelled ? "0 0 12px #f43f5e" : "0 0 12px #6366f1"
          } }),
          /* @__PURE__ */ jsx("h3", { style: {
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            color: "#f8fafc"
          }, children: isDone ? "Video Exportado con \xC9xito" : isCancelled ? "Exportaci\xF3n Cancelada" : isError ? "Error en el Render" : "Procesando Video MP4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "3px 9px",
          borderRadius: 999,
          fontSize: 11.5,
          color: "#cbd5e1",
          fontFamily: "var(--font-mono, monospace)"
        }, title: "Tiempo transcurrido", children: [
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 10,
            color: "#94a3b8"
          }, children: "\u23F1" }),
          /* @__PURE__ */ jsx("span", { children: formatTime(elapsedSeconds) })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, style: {
          background: "transparent",
          border: "none",
          color: "#94a3b8",
          fontSize: 16,
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: 6,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }, title: "Cerrar ventana (el render continuar\xE1 en segundo plano)", children: "\u2715" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "26px 24px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }, children: [
      !isDone && !isError && !isCancelled && /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(99, 102, 241, 0.25)"
          }, children: [
            progressPercent,
            "%"
          ] }),
          etaSeconds !== null && /* @__PURE__ */ jsxs("span", { style: {
            fontSize: 11,
            color: "#67e8f9",
            fontWeight: 700,
            fontFamily: "var(--font-mono, monospace)"
          }, children: [
            "Restante: ~",
            formatTime(etaSeconds)
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#cbd5e1",
          fontSize: 13,
          textAlign: "center",
          maxWidth: "92%",
          lineHeight: 1.4,
          fontWeight: 500
        }, children: job.message || "Procesando escenas y fotogramas..." }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          height: 8,
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 999,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          position: "relative"
        }, children: /* @__PURE__ */ jsx("div", { style: {
          height: "100%",
          width: progressPercent + "%",
          background: "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%)",
          boxShadow: "0 0 16px rgba(99, 102, 241, 0.6)",
          borderRadius: 999,
          transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)"
        } }) }),
        /* @__PURE__ */ jsxs("div", { style: {
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          marginTop: 2
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 10,
            padding: "8px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10,
              color: "#64748b",
              textTransform: "uppercase",
              fontWeight: 700
            }, children: "Progreso" }),
            /* @__PURE__ */ jsxs("span", { style: {
              fontSize: 13,
              color: "#f8fafc",
              fontWeight: 800,
              fontFamily: "var(--font-mono, monospace)"
            }, children: [
              progressPercent,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 10,
            padding: "8px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10,
              color: "#64748b",
              textTransform: "uppercase",
              fontWeight: 700
            }, children: job.stitchStage === "muxing" ? "Ensamblado" : job.encodedFrames > 0 && job.renderedFrames >= job.totalFrames ? "Codificados" : "Fotogramas" }),
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 13,
              color: "#f8fafc",
              fontWeight: 800,
              fontFamily: "var(--font-mono, monospace)"
            }, children: job.stitchStage === "muxing" ? "Audio / Video" : job.encodedFrames > 0 && job.renderedFrames >= job.totalFrames ? job.encodedFrames + "/" + job.totalFrames : job.renderedFrames != null && job.totalFrames ? job.renderedFrames + "/" + job.totalFrames : "" + Math.round(progressPercent / 100 * (job.totalFrames || 1e3)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 10,
            padding: "8px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 10,
              color: "#64748b",
              textTransform: "uppercase",
              fontWeight: 700
            }, children: "Tiempo" }),
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 13,
              color: "#f8fafc",
              fontWeight: 800,
              fontFamily: "var(--font-mono, monospace)"
            }, children: formatTime(elapsedSeconds) })
          ] })
        ] })
      ] }),
      isDone && /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }, children: [
        videoUrl && /* @__PURE__ */ jsx("div", { style: {
          borderRadius: 12,
          overflow: "hidden",
          background: "#000",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          maxHeight: 250,
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
        }, children: /* @__PURE__ */ jsx("video", { src: videoUrl, controls: true, autoPlay: true, style: {
          maxWidth: "100%",
          maxHeight: 250,
          objectFit: "contain"
        } }) }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "10px 14px",
          background: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          borderRadius: 10,
          color: "#34d399",
          fontSize: 13,
          fontWeight: 700
        }, children: /* @__PURE__ */ jsxs("span", { children: [
          "\u2728 Video renderizado con \xE9xito en ",
          formatTime(elapsedSeconds)
        ] }) })
      ] }),
      isCancelled && /* @__PURE__ */ jsx("div", { style: {
        padding: "14px 18px",
        borderRadius: 12,
        background: "rgba(245, 158, 11, 0.08)",
        border: "1px solid rgba(245, 158, 11, 0.25)",
        color: "#fcd34d",
        fontSize: 13,
        lineHeight: 1.5,
        textAlign: "center"
      }, children: "\u{1F6D1} El renderizado ha sido cancelado por el usuario." }),
      isError && /* @__PURE__ */ jsxs("div", { style: {
        padding: "14px 18px",
        borderRadius: 12,
        background: "rgba(244, 63, 94, 0.08)",
        border: "1px solid rgba(244, 63, 94, 0.25)",
        color: "#fda4af",
        fontSize: 13,
        lineHeight: 1.5
      }, children: [
        /* @__PURE__ */ jsx("strong", { style: {
          color: "#f43f5e"
        }, children: "No se pudo completar el render:" }),
        /* @__PURE__ */ jsx("div", { style: {
          marginTop: 8,
          color: "#cbd5e1",
          fontSize: 12,
          fontFamily: "var(--font-mono, monospace)",
          background: "rgba(0, 0, 0, 0.3)",
          padding: "8px 10px",
          borderRadius: 6,
          maxHeight: 100,
          overflowY: "auto"
        }, children: job.error || (renderJob == null ? void 0 : renderJob.error) || "Error desconocido en el servidor de render." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "14px 22px",
      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      background: "rgba(5, 7, 12, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12
    }, children: [
      !isDone && !isError && !isCancelled && onCancel ? /* @__PURE__ */ jsxs("button", { type: "button", onClick: onCancel, disabled: isCancelling, style: {
        height: 36,
        padding: "0 14px",
        borderRadius: 8,
        background: "rgba(244, 63, 94, 0.08)",
        border: "1px solid rgba(244, 63, 94, 0.25)",
        color: "#fda4af",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.2s ease"
      }, title: "Detener y cancelar el renderizado actual", children: [
        /* @__PURE__ */ jsx("span", { children: "\u2715" }),
        /* @__PURE__ */ jsx("span", { children: isCancelling ? "Cancelando..." : "Cancelar Render" })
      ] }) : /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }, children: [
        isDone && videoUrl && /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
          ((electronApi = window.electronAPI) == null ? void 0 : electronApi.revealMediaInFolder) && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => window.electronAPI.revealMediaInFolder(videoUrl), style: {
            height: 38,
            padding: "0 14px",
            borderRadius: 10,
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#f8fafc",
            fontWeight: 600,
            fontSize: 12.5,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            transition: "all 0.2s ease"
          }, title: "Mostrar el video generado en el Explorador de Archivos", children: /* @__PURE__ */ jsx("span", { children: "\u{1F4C2} Abrir Carpeta" }) }),
          /* @__PURE__ */ jsx("a", { href: videoUrl, download: true, style: {
            height: 38,
            padding: "0 18px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            color: "white",
            fontWeight: 800,
            fontSize: 13,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)",
            transition: "all 0.2s ease"
          }, children: /* @__PURE__ */ jsx("span", { children: "\u2B07\uFE0F Descargar MP4" }) })
        ] }),
        isError && onRetry && /* @__PURE__ */ jsx("button", { type: "button", onClick: onRetry, style: {
          height: 38,
          padding: "0 16px",
          borderRadius: 10,
          background: "var(--accent, #6366f1)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 13,
          border: "none",
          cursor: "pointer"
        }, children: "\u{1F504} Reintentar" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, style: {
          height: 38,
          padding: "0 16px",
          borderRadius: 10,
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#94a3b8",
          fontWeight: 600,
          fontSize: 12.5,
          cursor: "pointer",
          transition: "all 0.2s ease"
        }, children: isDone ? "Listo" : "Minimizar" })
      ] })
    ] })
  ] }) });
};
export {
  z as RenderProgressModal
};
