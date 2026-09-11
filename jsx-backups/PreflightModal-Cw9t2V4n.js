import { r as React, j as jsx } from "./vendor-react-BbRiLirl.js";
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
  const project = useStore(state => state.project);
  const updateProject = useStore(state => state.updateProject);
  const [engine, setEngine] = React.useState(project.engine || "remotion");
  const [resolution, setResolution] = React.useState(project.resolution || initialResolution || "1080p");
  if (!report) {
    return null;
  }
  const missingImagesIssue = (criticalTemp1 = report.critical) == null ? undefined : criticalTemp1.find(issue => issue == null ? undefined : issue.isMissingImages);
  const otherCriticalIssues = ((criticalTemp2 = report.critical) == null ? undefined : criticalTemp2.filter(issue => issue == null || !issue.isMissingImages)) || [];
  const handleEngineChange = engine => {
    setEngine(engine);
    updateProject({
      engine: engine
    });
  };
  const handleResolutionChange = resolution => {
    setResolution(resolution);
    updateProject({
      resolution: resolution
    });
  };
  const handleContinue = () => {
    updateProject({
      engine: engine,
      resolution: resolution
    });
    onContinue(resolution);
  };
  return <div onMouseDown={event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }} style={{
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(12px)",
    padding: 20
  }}><div style={{
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
    }}><div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18
      }}><div><span style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--muted-foreground)",
            letterSpacing: 0.5,
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)"
          }}>Renderizado & Exportación</span><h2 style={{
            fontSize: 18,
            fontWeight: 600,
            margin: "3px 0 0 0",
            color: "var(--foreground)"
          }}>Exportar Video Final (MP4)</h2></div><button onClick={onClose} style={{
          background: "transparent",
          border: "none",
          color: "var(--muted-foreground)",
          fontSize: 18,
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "var(--radius-xs)"
        }}>✕</button></div><div style={{
        overflowY: "auto",
        flex: 1,
        paddingRight: 4,
        display: "flex",
        flexDirection: "column",
        gap: 14
      }}>{missingImagesIssue && <div style={{
          background: "rgba(245, 158, 11, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          borderRadius: "var(--radius-md)",
          padding: 14
        }}><div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10
          }}><strong style={{
              color: "#fbbf24",
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 6
            }}>⚠️ Faltan imágenes en {missingImagesIssue.count} escena{missingImagesIssue.count > 1 ? "s" : ""}</strong><span style={{
              fontSize: 11,
              color: "#fbbf24",
              fontWeight: 600,
              fontFamily: "var(--font-mono)"
            }}>{missingImagesIssue.count} sin generar</span></div>{onGenerateMissingImages && <button type="button" onClick={() => {
            onClose();
            onGenerateMissingImages();
          }} style={{
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
          }}><span>⚡ Generar las {missingImagesIssue.count} Imágenes Faltantes con IA</span></button>}</div>}{otherCriticalIssues.length > 0 && <div style={{
          background: "rgba(239, 68, 68, 0.08)",
          border: "1px solid rgba(239, 68, 68, 0.25)",
          borderRadius: "var(--radius-md)",
          padding: 12
        }}><strong style={{
            color: "var(--danger)",
            fontSize: 12
          }}>Debes corregir:</strong>{otherCriticalIssues.map((issue, index) => <div style={{
            color: "var(--danger)",
            fontSize: 11.5,
            marginTop: 4
          }} key={index}>• {typeof issue == "string" ? issue : issue.message}</div>)}</div>}{((warningsTemp = report.warnings) == null ? undefined : warningsTemp.length) > 0 && <div style={{
          background: "var(--muted)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: 12
        }}><strong style={{
            color: "var(--foreground)",
            fontSize: 12
          }}>Avisos:</strong>{report.warnings.map((warning, index) => <div style={{
            color: "var(--muted-foreground)",
            fontSize: 11,
            marginTop: 4
          }} key={index}>• {warning}</div>)}</div>}<div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: 14
        }}><div style={{
            marginBottom: 10
          }}><div style={{
              color: "var(--foreground)",
              fontSize: 13,
              fontWeight: 600
            }}>Ajustes de exportación</div><div style={{
              color: "var(--muted-foreground)",
              fontSize: 11.5,
              marginTop: 2
            }}>Elige el motor de render para compilar el video en formato MP4 de alta calidad.</div></div><div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10
          }}><div onClick={() => handleEngineChange("remotion")} style={{
              padding: "12px 14px",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              background: engine === "remotion" ? "var(--accent)" : "transparent",
              border: "1.5px solid " + (engine === "remotion" ? "var(--foreground)" : "var(--border)"),
              boxShadow: engine === "remotion" ? "var(--shadow-sm)" : "none",
              transition: "all var(--transition-fast)"
            }}><strong style={{
                color: "var(--foreground)",
                fontSize: 13,
                display: "block",
                marginBottom: 4
              }}>Remotion Pro</strong><span style={{
                color: "var(--muted-foreground)",
                fontSize: 11,
                lineHeight: 1.35,
                display: "block"
              }}>Subtítulos animados, motion graphics y transiciones fluidas.</span></div><div onClick={() => handleEngineChange("ffmpeg")} style={{
              padding: "12px 14px",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              background: engine === "ffmpeg" ? "var(--accent)" : "transparent",
              border: "1.5px solid " + (engine === "ffmpeg" ? "var(--foreground)" : "var(--border)"),
              boxShadow: engine === "ffmpeg" ? "var(--shadow-sm)" : "none",
              transition: "all var(--transition-fast)"
            }}><strong style={{
                color: "var(--foreground)",
                fontSize: 13,
                display: "block",
                marginBottom: 4
              }}>FFmpeg Rápido</strong><span style={{
                color: "var(--muted-foreground)",
                fontSize: 11,
                lineHeight: 1.35,
                display: "block"
              }}>Render ultra rápido solo con imágenes y movimientos de cámara.</span></div></div></div><div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: 14
        }}><div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10
          }}><span style={{
              color: "var(--foreground)",
              fontSize: 13,
              fontWeight: 600
            }}>Resolución de Salida</span><span style={{
              fontSize: 11,
              color: "var(--muted-foreground)",
              fontWeight: 600,
              fontFamily: "var(--font-mono)"
            }}>{resolution === "4k" ? "3840 × 2160 (4K UHD)" : resolution === "2k" ? "2560 × 1440 (2K QHD)" : resolution === "720p" ? "1280 × 720 (720p HD)" : "1920 × 1080 (1080p Full HD)"}</span></div><div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10
          }}>{[{
              id: "720p",
              name: "720p HD",
              label: "Rápido"
            }, {
              id: "1080p",
              name: "1080p Full HD",
              label: "Recomendado"
            }, {
              id: "2k",
              name: "2K QHD",
              label: "1440p Nítido"
            }, {
              id: "4k",
              name: "4K UHD",
              label: "2160p Máx"
            }].map(option => {
              const isSelected = resolution === option.id;
              return <div onClick={() => handleResolutionChange(option.id)} style={{
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                background: isSelected ? "var(--accent)" : "transparent",
                border: "1.5px solid " + (isSelected ? "var(--foreground)" : "var(--border)"),
                boxShadow: isSelected ? "var(--shadow-sm)" : "none",
                transition: "all var(--transition-fast)"
              }} key={option.id}><strong style={{
                  color: "var(--foreground)",
                  fontSize: 12.5,
                  display: "block"
                }}>{option.name}</strong><span style={{
                  color: "var(--muted-foreground)",
                  fontSize: 10.5
                }}>{option.label}</span></div>;
            })}</div></div></div><div style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 18,
        paddingTop: 14,
        borderTop: "1px solid var(--border)"
      }}><button onClick={onClose} style={{
          height: 36,
          padding: "0 16px",
          borderRadius: "var(--radius-sm)",
          background: "var(--muted)",
          border: "1px solid var(--border)",
          color: "var(--foreground)",
          fontWeight: 500,
          fontSize: 12.5,
          cursor: "pointer"
        }}>Cancelar</button><button onClick={handleContinue} style={{
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
        }}><span>Iniciar Exportación ({resolution.toUpperCase()})</span></button></div></div></div>;
};
export { I as PreflightModal };