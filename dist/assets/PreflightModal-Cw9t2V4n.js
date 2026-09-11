import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
import { r as React, j as jsx2 } from "./vendor-react-BbRiLirl.js";
import { u as useStore } from "./index-DE7up0M0.js";
import "./vendor-state-m3Xdu9cz.js";
import "./vendor-remotion-D3IpuOk5.js";
const I = ({
  report,
  onClose,
  onContinue,
  onGenerateMissingImages,
  initialResolution = "1080p"
}) => {
  var criticalTemp1;
  var criticalTemp2;
  var warningsTemp;
  const project = useStore((state) => state.project);
  const updateProject = useStore((state) => state.updateProject);
  const [engine, setEngine] = React.useState(project.engine || "remotion");
  const [resolution, setResolution] = React.useState(project.resolution || initialResolution || "1080p");
  if (!report) {
    return null;
  }
  const missingImagesIssue = (criticalTemp1 = report.critical) == null ? void 0 : criticalTemp1.find((issue) => issue == null ? void 0 : issue.isMissingImages);
  const otherCriticalIssues = ((criticalTemp2 = report.critical) == null ? void 0 : criticalTemp2.filter((issue) => issue == null || !issue.isMissingImages)) || [];
  const handleEngineChange = (engine2) => {
    setEngine(engine2);
    updateProject({
      engine: engine2
    });
  };
  const handleResolutionChange = (resolution2) => {
    setResolution(resolution2);
    updateProject({
      resolution: resolution2
    });
  };
  const handleContinue = () => {
    updateProject({
      engine,
      resolution
    });
    onContinue(resolution);
  };
  return /* @__PURE__ */ jsx("div", { onMouseDown: (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, style: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(12px)",
    padding: 20
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    width: 540,
    maxWidth: "100%",
    background: "var(--popover)",
    border: "1px solid var(--border-strong)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-lg)",
    padding: 24,
    maxHeight: "92vh",
    display: "flex",
    flexDirection: "column",
    color: "var(--foreground)",
    fontFamily: "var(--font-sans)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 11,
          fontWeight: 600,
          color: "var(--muted-foreground)",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          fontFamily: "var(--font-mono)"
        }, children: "Renderizado & Exportaci\xF3n" }),
        /* @__PURE__ */ jsx("h2", { style: {
          fontSize: 18,
          fontWeight: 600,
          margin: "3px 0 0 0",
          color: "var(--foreground)"
        }, children: "Exportar Video Final (MP4)" })
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
      overflowY: "auto",
      flex: 1,
      paddingRight: 4,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }, children: [
      missingImagesIssue && /* @__PURE__ */ jsxs("div", { style: {
        background: "rgba(245, 158, 11, 0.08)",
        border: "1px solid rgba(245, 158, 11, 0.25)",
        borderRadius: "var(--radius-md)",
        padding: 14
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10
        }, children: [
          /* @__PURE__ */ jsxs("strong", { style: {
            color: "#fbbf24",
            fontSize: 13,
            display: "inline-flex",
            alignItems: "center",
            gap: 6
          }, children: [
            "\u26A0\uFE0F Faltan im\xE1genes en ",
            missingImagesIssue.count,
            " escena",
            missingImagesIssue.count > 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxs("span", { style: {
            fontSize: 11,
            color: "#fbbf24",
            fontWeight: 600,
            fontFamily: "var(--font-mono)"
          }, children: [
            missingImagesIssue.count,
            " sin generar"
          ] })
        ] }),
        onGenerateMissingImages && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          onClose();
          onGenerateMissingImages();
        }, style: {
          width: "100%",
          height: 36,
          background: "var(--primary)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-sm)",
          color: "var(--primary-foreground)",
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: "var(--shadow-sm)"
        }, children: /* @__PURE__ */ jsxs("span", { children: [
          "\u26A1 Generar las ",
          missingImagesIssue.count,
          " Im\xE1genes Faltantes con IA"
        ] }) })
      ] }),
      otherCriticalIssues.length > 0 && /* @__PURE__ */ jsxs("div", { style: {
        background: "rgba(239, 68, 68, 0.08)",
        border: "1px solid rgba(239, 68, 68, 0.25)",
        borderRadius: "var(--radius-md)",
        padding: 12
      }, children: [
        /* @__PURE__ */ jsx("strong", { style: {
          color: "var(--danger)",
          fontSize: 12
        }, children: "Debes corregir:" }),
        otherCriticalIssues.map((issue, index) => /* @__PURE__ */ jsxs("div", { style: {
          color: "var(--danger)",
          fontSize: 11.5,
          marginTop: 4
        }, children: [
          "\u2022 ",
          typeof issue == "string" ? issue : issue.message
        ] }, index))
      ] }),
      ((warningsTemp = report.warnings) == null ? void 0 : warningsTemp.length) > 0 && /* @__PURE__ */ jsxs("div", { style: {
        background: "var(--muted)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: 12
      }, children: [
        /* @__PURE__ */ jsx("strong", { style: {
          color: "var(--foreground)",
          fontSize: 12
        }, children: "Avisos:" }),
        report.warnings.map((warning, index) => /* @__PURE__ */ jsxs("div", { style: {
          color: "var(--muted-foreground)",
          fontSize: 11,
          marginTop: 4
        }, children: [
          "\u2022 ",
          warning
        ] }, index))
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: 14
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          marginBottom: 10
        }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--foreground)",
            fontSize: 13,
            fontWeight: 600
          }, children: "Ajustes de exportaci\xF3n" }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--muted-foreground)",
            fontSize: 11.5,
            marginTop: 2
          }, children: "Elige el motor de render para compilar el video en formato MP4 de alta calidad." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsxs("div", { onClick: () => handleEngineChange("remotion"), style: {
            padding: "12px 14px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            background: engine === "remotion" ? "var(--accent)" : "transparent",
            border: "1.5px solid " + (engine === "remotion" ? "var(--foreground)" : "var(--border)"),
            boxShadow: engine === "remotion" ? "var(--shadow-sm)" : "none",
            transition: "all var(--transition-fast)"
          }, children: [
            /* @__PURE__ */ jsx("strong", { style: {
              color: "var(--foreground)",
              fontSize: 13,
              display: "block",
              marginBottom: 4
            }, children: "Remotion Pro" }),
            /* @__PURE__ */ jsx("span", { style: {
              color: "var(--muted-foreground)",
              fontSize: 11,
              lineHeight: 1.35,
              display: "block"
            }, children: "Subt\xEDtulos animados, motion graphics y transiciones fluidas." })
          ] }),
          /* @__PURE__ */ jsxs("div", { onClick: () => handleEngineChange("ffmpeg"), style: {
            padding: "12px 14px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            background: engine === "ffmpeg" ? "var(--accent)" : "transparent",
            border: "1.5px solid " + (engine === "ffmpeg" ? "var(--foreground)" : "var(--border)"),
            boxShadow: engine === "ffmpeg" ? "var(--shadow-sm)" : "none",
            transition: "all var(--transition-fast)"
          }, children: [
            /* @__PURE__ */ jsx("strong", { style: {
              color: "var(--foreground)",
              fontSize: 13,
              display: "block",
              marginBottom: 4
            }, children: "FFmpeg R\xE1pido" }),
            /* @__PURE__ */ jsx("span", { style: {
              color: "var(--muted-foreground)",
              fontSize: 11,
              lineHeight: 1.35,
              display: "block"
            }, children: "Render ultra r\xE1pido solo con im\xE1genes y movimientos de c\xE1mara." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: 14
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "var(--foreground)",
            fontSize: 13,
            fontWeight: 600
          }, children: "Resoluci\xF3n de Salida" }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 11,
            color: "var(--muted-foreground)",
            fontWeight: 600,
            fontFamily: "var(--font-mono)"
          }, children: resolution === "4k" ? "3840 \xD7 2160 (4K UHD)" : resolution === "2k" ? "2560 \xD7 1440 (2K QHD)" : resolution === "720p" ? "1280 \xD7 720 (720p HD)" : "1920 \xD7 1080 (1080p Full HD)" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }, children: [{
          id: "720p",
          name: "720p HD",
          label: "R\xE1pido"
        }, {
          id: "1080p",
          name: "1080p Full HD",
          label: "Recomendado"
        }, {
          id: "2k",
          name: "2K QHD",
          label: "1440p N\xEDtido"
        }, {
          id: "4k",
          name: "4K UHD",
          label: "2160p M\xE1x"
        }].map((option) => {
          const isSelected = resolution === option.id;
          return /* @__PURE__ */ jsxs("div", { onClick: () => handleResolutionChange(option.id), style: {
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            background: isSelected ? "var(--accent)" : "transparent",
            border: "1.5px solid " + (isSelected ? "var(--foreground)" : "var(--border)"),
            boxShadow: isSelected ? "var(--shadow-sm)" : "none",
            transition: "all var(--transition-fast)"
          }, children: [
            /* @__PURE__ */ jsx("strong", { style: {
              color: "var(--foreground)",
              fontSize: 12.5,
              display: "block"
            }, children: option.name }),
            /* @__PURE__ */ jsx("span", { style: {
              color: "var(--muted-foreground)",
              fontSize: 10.5
            }, children: option.label })
          ] }, option.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 18,
      paddingTop: 14,
      borderTop: "1px solid var(--border)"
    }, children: [
      /* @__PURE__ */ jsx("button", { onClick: onClose, style: {
        height: 36,
        padding: "0 16px",
        borderRadius: "var(--radius-sm)",
        background: "var(--muted)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        fontWeight: 500,
        fontSize: 12.5,
        cursor: "pointer"
      }, children: "Cancelar" }),
      /* @__PURE__ */ jsx("button", { onClick: handleContinue, style: {
        height: 36,
        padding: "0 20px",
        borderRadius: "var(--radius-sm)",
        background: "var(--primary)",
        border: "1px solid var(--border-strong)",
        color: "var(--primary-foreground)",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: /* @__PURE__ */ jsxs("span", { children: [
        "Iniciar Exportaci\xF3n (",
        resolution.toUpperCase(),
        ")"
      ] }) })
    ] })
  ] }) });
};
export {
  I as PreflightModal
};
