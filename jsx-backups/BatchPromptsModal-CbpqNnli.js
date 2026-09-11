import { r as React, j as jsx } from "./vendor-react-BbRiLirl.js";
import { u as useStore, M as MOTION_OPTIONS } from "./index-DE7up0M0.js";
import "./vendor-state-m3Xdu9cz.js";
import "./vendor-remotion-D3IpuOk5.js";
const P = ({
  isOpen,
  onClose,
  onGenerateImage
}) => {
  const project = useStore(state => state.project);
  const updateScene = useStore(state => state.updateScene);
  useStore(state => state.updateProject);
  const applyPromptsToScenes = useStore(state => state.applyPromptsToScenes);
  const [viewMode, setViewMode] = React.useState("table");
  const [bulkText, setBulkText] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  if (!isOpen) {
    return null;
  }
  const scenes = project.scenes || [];
  const totalScenes = scenes.length;
  const scenesWithPromptCount = scenes.filter(scene => {
    var promptText;
    if ((promptText = scene.prompt) == null) {
      return undefined;
    } else {
      return promptText.trim();
    }
  }).length;
  const filteredScenes = scenes.filter(scene => (scene.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || (scene.prompt || "").toLowerCase().includes(searchQuery.toLowerCase()) || (scene.script || scene.caption || "").toLowerCase().includes(searchQuery.toLowerCase()));
  const handleApplyBulkPrompts = () => {
    if (bulkText.trim()) {
      applyPromptsToScenes(bulkText);
      setViewMode("table");
      setBulkText("");
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
    background: "rgba(5, 6, 9, 0.85)",
    backdropFilter: "blur(14px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    animation: "ft-fade-in 180ms ease-out"
  }}><div style={{
      width: "100%",
      maxWidth: 900,
      height: "88vh",
      background: "linear-gradient(180deg, #161922 0%, #0d0f15 100%)",
      border: "1px solid #282d3d",
      borderRadius: 16,
      boxShadow: "0 24px 70px rgba(0,0,0,0.8), 0 0 40px rgba(91,140,255,0.08)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }}><div style={{
        padding: "16px 22px",
        borderBottom: "1px solid #1f2433",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}><div style={{
          display: "flex",
          alignItems: "center",
          gap: 12
        }}><span style={{
            fontSize: 22
          }}>📝</span><div><div style={{
              display: "flex",
              alignItems: "center",
              gap: 8
            }}><h3 style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 900,
                color: "#fff"
              }}>Editor Masivo de Prompts Visuales</h3><span style={{
                background: scenesWithPromptCount === totalScenes ? "rgba(34, 197, 94, 0.2)" : "rgba(91, 140, 255, 0.14)",
                color: scenesWithPromptCount === totalScenes ? "#22c55e" : "#9fbeff",
                border: "1px solid " + (scenesWithPromptCount === totalScenes ? "rgba(34, 197, 94, 0.4)" : "rgba(91, 140, 255, 0.3)"),
                fontSize: 11,
                fontWeight: 900,
                padding: "2px 8px",
                borderRadius: 6
              }}>{scenesWithPromptCount} / {totalScenes} con prompt</span></div><p style={{
              margin: 0,
              fontSize: 11,
              color: "#8a94a6",
              marginTop: 2
            }}>Edita manualmente los prompts de todas las escenas o pega una lista completa</p></div></div><div style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}><div className="btn-row-dual" style={{
            display: "flex",
            gap: 4,
            background: "#12141c",
            padding: 3,
            borderRadius: 8,
            border: "1px solid #282d3d"
          }}><button onClick={() => setViewMode("table")} style={{
              background: viewMode === "table" ? "var(--indigo, #6366f1)" : "transparent",
              color: viewMode === "table" ? "#fff" : "#8a94a6",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer"
            }}>📋 Lista de Escenas ({totalScenes})</button><button onClick={() => setViewMode("bulk_paste")} style={{
              background: viewMode === "bulk_paste" ? "var(--indigo, #6366f1)" : "transparent",
              color: viewMode === "bulk_paste" ? "#fff" : "#8a94a6",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer"
            }}>📥 Pegar Lista en Bloque</button></div><button onClick={onClose} style={{
            background: "transparent",
            border: "none",
            color: "#8a94a6",
            fontSize: 20,
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 6
          }}>✕</button></div></div>{viewMode === "table" && <div style={{
        padding: "10px 22px",
        background: "#10131a",
        borderBottom: "1px solid #1a1e2a",
        display: "flex",
        alignItems: "center",
        gap: 10
      }}><span style={{
          fontSize: 13,
          color: "#8a94a6"
        }}>🔍</span><input type="text" placeholder="Buscar por texto del guion o palabras del prompt..." value={searchQuery} onChange={event => setSearchQuery(event.target.value)} style={{
          flex: 1,
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: 12,
          outline: "none"
        }} />{searchQuery && <button onClick={() => setSearchQuery("")} style={{
          background: "transparent",
          border: "none",
          color: "#8a94a6",
          cursor: "pointer",
          fontSize: 12
        }}>Limpiar</button>}</div>}<div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px 22px"
      }}>{viewMode === "bulk_paste" ? <div style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: 12
        }}><div style={{
            padding: "12px 14px",
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            borderRadius: 10,
            fontSize: 11.5,
            color: "#cbd5e1",
            lineHeight: 1.5
          }}>💡 <b>Cómo usar:</b> Pega tus prompts aquí, uno por línea. La <b>Línea 1</b> se asignará a la <b>Escena 1</b>, la <b>Línea 2</b> a la <b>Escena 2</b>, y así sucesivamente. También puedes pegar listas numeradas (ej. <i>1. Un dibujo de...</i>) y el sistema limpiará los números automáticamente.</div><textarea value={bulkText} onChange={event => setBulkText(event.target.value)} placeholder="Pega aquí tus prompts en orden:\n1. Cinematic photograph of a person studying at a desk...\n2. Anime scene of solar panels glowing at sunset...\n3. Wide angle cartoon room with a character celebrating victory..." style={{
            flex: 1,
            width: "100%",
            background: "#090a0d",
            border: "1px solid #282d3d",
            borderRadius: 10,
            padding: 14,
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12.5,
            lineHeight: 1.5,
            resize: "none"
          }} /><div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10
          }}><button onClick={() => setViewMode("table")} style={{
              background: "transparent",
              border: "1px solid #282d3d",
              color: "#8a94a6",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer"
            }}>Cancelar</button><button onClick={handleApplyBulkPrompts} disabled={!bulkText.trim()} style={{
              background: "var(--accent, #5b8cff)",
              color: "#fff",
              border: "none",
              padding: "8px 20px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 0 16px rgba(91,140,255,0.24)"
            }}>⚡ Asignar Prompts a las Escenas</button></div></div> : <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>{filteredScenes.map(scene => {
            var promptTemp;
            const sceneIndex = scenes.findIndex(sceneItem => sceneItem.id === scene.id);
            const hasPrompt = (promptTemp = scene.prompt) != null && !!promptTemp.trim();
            const scriptText = scene.script || scene.caption || "";
            return <div style={{
              background: "#12141c",
              border: "1px solid " + (hasPrompt ? "rgba(255,255,255,0.08)" : "rgba(239, 68, 68, 0.3)"),
              borderRadius: 12,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              transition: "border-color 150ms ease"
            }} key={scene.id}><div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10
              }}><div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10
                }}><span style={{
                    background: "#1a1e2a",
                    border: "1px solid #282d3d",
                    color: "var(--accent, #5b8cff)",
                    fontWeight: 900,
                    fontSize: 11,
                    padding: "3px 8px",
                    borderRadius: 6
                  }}>Escena {sceneIndex + 1}</span><input type="text" value={scene.title} onChange={event => updateScene(scene.id, {
                    title: event.target.value
                  })} style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 13,
                    outline: "none",
                    width: 220
                  }} />{scene.imageUrl ? <span style={{
                    fontSize: 10,
                    color: "#22c55e",
                    fontWeight: 800,
                    background: "rgba(34,197,94,0.15)",
                    padding: "2px 6px",
                    borderRadius: 4
                  }}>🖼️ Imagen Lista</span> : <span style={{
                    fontSize: 10,
                    color: "#8a94a6",
                    fontWeight: 700
                  }}>⚪ Sin Imagen</span>}</div><div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}><span style={{
                    fontSize: 11,
                    color: "#8a94a6"
                  }}>Cámara:</span><select value={scene.motion || "gentle-zoom-in"} onChange={event => updateScene(scene.id, {
                    motion: event.target.value
                  })} style={{
                    background: "#090a0d",
                    border: "1px solid #282d3d",
                    color: "#cbd5e1",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 8px",
                    borderRadius: 6,
                    outline: "none"
                  }}>{MOTION_OPTIONS.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select>{onGenerateImage && <button onClick={() => onGenerateImage(scene)} disabled={!!scene.operationId} style={{
                    background: "#1f2433",
                    border: "1px solid #282d3d",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: 6,
                    cursor: "pointer",
                    marginLeft: 4
                  }} title="Generar imagen para esta escena">🎨 Generar</button>}</div></div>{scriptText && <div style={{
                fontSize: 11,
                color: "#94a3b8",
                background: "rgba(0,0,0,0.25)",
                padding: "6px 10px",
                borderRadius: 6,
                borderLeft: "3px solid var(--indigo, #6366f1)"
              }}>🎙️ <b>Guion / Locución:</b> "{scriptText}"</div>}<div><textarea value={scene.prompt || ""} onChange={event => updateScene(scene.id, {
                  prompt: event.target.value
                })} placeholder={"Escribe el prompt visual para la Escena " + (sceneIndex + 1) + " (sujeto, acción, diagrama, iluminación, fondo)..."} rows={2} style={{
                  width: "100%",
                  background: "#090a0d",
                  border: "1px solid " + (hasPrompt ? "#282d3d" : "rgba(239, 68, 68, 0.4)"),
                  borderRadius: 8,
                  padding: "8px 12px",
                  color: "#fff",
                  fontSize: 12,
                  lineHeight: 1.45,
                  resize: "vertical"
                }} /></div></div>;
          })}</div>}</div><div style={{
        padding: "12px 22px",
        background: "#090a0d",
        borderTop: "1px solid #1f2433",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}><span style={{
          fontSize: 11.5,
          color: "#8a94a6"
        }}>💡 Todos los cambios en los prompts se guardan automáticamente al escribir.</span><button onClick={onClose} style={{
          background: "var(--accent, #5b8cff)",
          border: "none",
          color: "#fff",
          fontSize: 12,
          fontWeight: 900,
          padding: "7px 20px",
          borderRadius: 8,
          cursor: "pointer"
        }}>Listo / Guardar</button></div></div></div>;
};
export { P as BatchPromptsModal };