import { r as React, j as jsx } from "./vendor-react-BbRiLirl.js";
import { u as useStore, e as useToast, f as optimizeImageForAI, g as callFlowApi } from "./index-DE7up0M0.js";
import "./vendor-state-m3Xdu9cz.js";
import "./vendor-remotion-D3IpuOk5.js";
const M = [{
  id: "emotion-rim",
  badge: "V1",
  title: "Expresión Emocional & Rim Light",
  desc: "Primer plano dramático, expresión facial de alto impacto y contraluz vibrante",
  promptModifier: "extreme emotional close-up portrait, intense facial expression of shock, astonishment or intense curiosity, wide open expressive eyes looking towards camera, dramatic neon edge rim lighting (blue and warm orange backlight), dark high-contrast cinematic background with shallow depth of field bokeh, hyper-detailed skin texture, 8k YouTube viral thumbnail aesthetic"
}, {
  id: "action-split",
  badge: "V2",
  title: "Acción Dinámica & Conflicto",
  desc: "Composición en diagonal, choque de elementos, partículas y energía visual",
  promptModifier: "dynamic diagonal composition, dramatic confrontation or action pose, floating particles, sparks and high-energy motion blur, vibrant saturated split lighting (warm vs cool colors), dramatic diagonal visual tension, clean silhouette contrast, high-CTR YouTube thumbnail composition"
}, {
  id: "mystery-artifact",
  badge: "V3",
  title: "Misterio & Objeto Curioso Central",
  desc: "Elemento enigmático brillante en el punto focal con gesto de intriga",
  promptModifier: "mysterious glowing central subject or artifact in focal point, character reacting in foreground with curious pointing or gasping gesture, dramatic volumetric light rays, deep dark shadows and intense focal spotlight, high visual intrigue and curiosity gap, 8k sharp resolution"
}, {
  id: "epic-cinematic",
  badge: "V4",
  title: "Gran Angular Cinemático Épico",
  desc: "Perspectiva panorámica, escala masiva y atmósfera HDR estilo póster",
  promptModifier: "epic wide-angle low perspective, massive cinematic scale, atmospheric fog and haze, blockbuster movie poster composition, rich HDR color grading, dramatic sky or environment background, pristine ultra-sharp focus across entire frame"
}];
const h = [{
  value: "viral-youtube",
  label: "🔥 Viral YouTube (Alto Contraste, Saturación & Dramatismo)",
  promptSuffix: "YouTube viral thumbnail, high click-through-rate aesthetic, dramatic rim lighting, saturated contrast, photorealistic sharp focus, bold visual hierarchy --ar 16:9"
}, {
  value: "cinematic-3d",
  label: "🎬 3D Render Cinemático (Iluminación Octane & Unreal Engine)",
  promptSuffix: "Unreal Engine 5 render, Octane render, 3D character art, subsurface scattering, cinematic lighting, ultra-detailed 3D model, ray tracing reflections, 8k 3D art --ar 16:9"
}, {
  value: "realistic-photo",
  label: "📷 Fotografía Realista de Alto Impacto (8K DSLR, Bokeh)",
  promptSuffix: "professional DSLR photography, 85mm f/1.4 lens, natural skin pores and realistic texture, commercial studio strobe lighting, razor sharp eyes, 8k resolution --ar 16:9"
}, {
  value: "anime-comic",
  label: "🎨 2D Cómic / Anime Explicativo (Línea Limpia)",
  promptSuffix: "2D animated cartoon webtoon style, clean solid line art, vibrant cel shading, expressive anime eyes, colorful vector background, no photorealism --ar 16:9"
}, {
  value: "dark-mystery",
  label: "🌑 Misterio Oscuro & Luces de Neón",
  promptSuffix: "dark moody noir aesthetic, deep blacks, striking neon cyan and magenta rim lights, foggy atmospheric haze, intense shadows, cinematic thriller mood --ar 16:9"
}];
const se = () => {
  const [referenceFile, setReferenceFile] = React.useState(null);
  const [referencePreviewUrl, setReferencePreviewUrl] = React.useState("");
  const [referenceBase64, setReferenceBase64] = React.useState("");
  const [referenceMimeType, setReferenceMimeType] = React.useState("image/jpeg");
  const [prompt, setPrompt] = React.useState("");
  const [selectedStyle, setSelectedStyle] = React.useState("viral-youtube");
  const [variantCount, setVariantCount] = React.useState(4);
  const [isExtractingPrompt, setIsExtractingPrompt] = React.useState(!1);
  const [isGenerating, setIsGenerating] = React.useState(!1);
  const [generationStatus, setGenerationStatus] = React.useState("");
  const [thumbnails, setThumbnails] = React.useState([]);
  const [previewImageUrl, setPreviewImageUrl] = React.useState(null);
  const flowState = useStore(state => state.flowState);
  const setCurrentView = useStore(state => state.setCurrentView);
  const project = useStore(state => state.project);
  const updateProject = useStore(state => state.updateProject);
  const updateScene = useStore(state => state.updateScene);
  const addSceneAt = useStore(state => state.addSceneAt);
  const {
    addToast: addToast
  } = useToast();
  const handleReferenceUpload = async file => {
    if (!file) {
      return;
    }
    setReferenceFile(file);
    const objectUrl = URL.createObjectURL(file);
    setReferencePreviewUrl(objectUrl);
    setReferenceMimeType(file.type || "image/jpeg");
    try {
      const optimizedBase64 = await optimizeImageForAI(file);
      setReferenceBase64(optimizedBase64);
      addToast("Miniatura de referencia cargada y optimizada para IA", "info");
    } catch {
      addToast("Miniatura de referencia cargada", "info");
    }
  };
  const handleExtractPrompt = async () => {
    var extractedTextTemp;
    if (!referencePreviewUrl) {
      addToast("Sube primero una miniatura de referencia.", "error");
      return;
    }
    setIsExtractingPrompt(!0);
    try {
      if (flowState.connected && referenceBase64) {
        const result = await callFlowApi("FLOW_GENERATE_TEXT", {
          model: "gemini-3-flash-preview",
          parts: [{
            inlineData: {
              mimeType: referenceMimeType,
              data: referenceBase64
            }
          }, {
            text: "Act as an expert YouTube thumbnail art director. Analyze this thumbnail image and generate a high-CTR image prompt in English (under 50 words) describing the main subject, facial expression, dramatic lighting, color contrast, and composition. Output ONLY the prompt text, without markdown or quotes."
          }]
        }, 40000);
        if ((extractedTextTemp = result == null ? undefined : result.text) != null && extractedTextTemp.trim()) {
          setPrompt(result.text.trim());
          addToast("✨ Prompt visual extraído con Gemini Vision", "success");
          return;
        }
      }
      const styleOption = h.find(style => style.value === selectedStyle);
      const fallbackPrompt = "High-CTR viral YouTube thumbnail, dramatic main subject with intense emotional expression in foreground, " + ((styleOption == null ? undefined : styleOption.promptSuffix) || "cinematic contrast, 8k resolution");
      setPrompt(fallbackPrompt);
      addToast("✨ Prompt base configurado para miniaturas de alto impacto", "info");
    } catch {
      const styleOption = h.find(style => style.value === selectedStyle);
      const fallbackPrompt = "High-CTR viral YouTube thumbnail, dramatic main subject with intense emotional expression in foreground, " + ((styleOption == null ? undefined : styleOption.promptSuffix) || "cinematic contrast, 8k resolution");
      setPrompt(fallbackPrompt);
      addToast("✨ Prompt base configurado para miniaturas de alto impacto", "info");
    } finally {
      setIsExtractingPrompt(!1);
    }
  };
  const handleGenerateThumbnails = async () => {
    var electronApiTemp;
    var imagesTemp;
    var electronApiTemp2;
    if (!prompt.trim()) {
      addToast("Escribe o extrae un prompt para generar miniaturas.", "error");
      return;
    }
    if (!flowState.connected) {
      addToast("Google Flow no está conectado. Abre la ventana de conexión arriba.", "error");
      if ((electronApiTemp = window.electronAPI) != null && electronApiTemp.openGoogleFlow) {
        window.electronAPI.openGoogleFlow();
      }
      return;
    }
    setIsGenerating(!0);
    setGenerationStatus("Iniciando generación de " + variantCount + " variantes...");
    const newThumbnails = [...thumbnails];
    const styleOption = h.find(style => style.value === selectedStyle) || h[0];
    try {
      addToast("Generando " + variantCount + " variantes únicas de miniatura con Google Flow...", "info");
      for (let i = 0; i < variantCount; i++) {
        const archetype = M[i % M.length];
        setGenerationStatus("Generando Variante " + (i + 1) + "/" + variantCount + ": " + archetype.title + "...");
        const fullPrompt = prompt.trim() + ", " + archetype.promptModifier + ", " + styleOption.promptSuffix + ", aspect ratio 16:9, YouTube thumbnail quality, ultra sharp, 8k resolution";
        const requestPayload = {
          prompt: fullPrompt,
          format: "youtube",
          aspectRatio: "16:9",
          model: "nano-banana-2"
        };
        if (referenceBase64) {
          requestPayload.referenceImage = {
            data: referenceBase64,
            mimeType: referenceMimeType
          };
        }
        try {
          const result = await callFlowApi("FLOW_GENERATE_IMAGE", requestPayload, 90000);
          const imageUrl = (result == null ? undefined : result.imageUrl) || (result == null ? undefined : result.url) || (result == null ? undefined : result.mediaUrl) || (result == null ? undefined : result.images) && ((imagesTemp = result.images[0]) == null ? undefined : imagesTemp.url) || "";
          if (imageUrl) {
            newThumbnails.unshift({
              id: crypto.randomUUID(),
              url: imageUrl,
              prompt: fullPrompt,
              archetypeBadge: archetype.badge,
              archetypeTitle: archetype.title,
              archetypeDesc: archetype.desc,
              is2k: result != null && !!result.is2k,
              createdAt: Date.now()
            });
            setThumbnails([...newThumbnails]);
          } else {
            console.warn("Respuesta sin imagen para variante " + (i + 1) + ":", result);
          }
        } catch (error) {
          console.error("Error en variante " + (i + 1) + ":", error);
          addToast("Error en variante " + (i + 1) + ": " + error.message, "error");
        }
      }
      if (newThumbnails.length > thumbnails.length) {
        const newCount = newThumbnails.length - thumbnails.length;
        addToast("✓ ¡" + newCount + " miniaturas generadas con éxito!", "success");
      } else {
        addToast("No se pudo generar miniaturas. Asegúrate de tener un proyecto abierto dentro de Google Flow.", "error");
        if ((electronApiTemp2 = window.electronAPI) != null && electronApiTemp2.openGoogleFlow) {
          window.electronAPI.openGoogleFlow();
        }
      }
    } catch (error) {
      addToast("Error general generando miniaturas: " + error.message, "error");
    } finally {
      setIsGenerating(!1);
      setGenerationStatus("");
    }
  };
  const handleDownload = (url, badge, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "miniatura_youtube_" + (badge || "v" + (index + 1)) + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Descargando miniatura en alta resolución...", "success");
  };
  const handleCopyPrompt = prompt => {
    navigator.clipboard.writeText(prompt);
    addToast("Prompt copiado al portapapeles ✓", "info");
  };
  const handleUseAsScene1 = thumbnail => {
    const scenes = Array.isArray(project.scenes) ? project.scenes : [];
    if (scenes.length > 0) {
      updateScene(scenes[0].id, {
        imageUrl: thumbnail.url,
        caption: "Portada / Escena 1",
        motion: "gentle-zoom-in"
      });
      addToast("✓ Miniatura asignada a la Escena 1 del proyecto", "success");
    } else {
      addSceneAt(0, {
        imageUrl: thumbnail.url,
        caption: "Portada / Escena 1",
        duration: 4
      });
      addToast("✓ Escena 1 creada con esta miniatura", "success");
    }
  };
  const handleSetAsCover = thumbnail => {
    updateProject({
      thumbnailUrl: thumbnail.url
    });
    addToast("✓ Portada del proyecto actualizada", "success");
  };
  return <div className="thumbnail-studio-layout"><header className="thumb-header"><div className="thumb-header-left"><button className="back-btn" onClick={() => setCurrentView("dashboard")}>← Volver al Inicio</button><div><h1>🖼️ Thumbnail Studio Pro</h1><p>Generación de 4 variantes reales de alto CTR con IA y condicionamiento multimodal</p></div></div><div className="thumb-header-right"><div className={"flow-status " + (flowState.connected ? "online" : "")} onClick={() => {
          var electronApiTemp;
          var openGoogleFlowFnTemp;
          if ((openGoogleFlowFnTemp = (electronApiTemp = window.electronAPI) == null ? undefined : electronApiTemp.openGoogleFlow) == null) {
            return undefined;
          } else {
            return openGoogleFlowFnTemp.call(electronApiTemp);
          }
        }} style={{
          cursor: "pointer"
        }} title={flowState.label || "Haz clic para conectar Google Flow"}><i /><span>{flowState.connected ? "Flow Conectado" : "🔗 Conectar Flow"}</span></div></div></header><div className="thumb-content-grid"><div className="thumb-tools-panel"><div className="tool-card"><div className="card-header"><span className="step-badge">1</span><h3>Miniatura de Referencia o Idea</h3></div><p className="card-desc">Sube una miniatura existente para clonar su composición, personaje o estilo con IA multimodal.</p><div className="reference-drop-area">{referencePreviewUrl ? <div className="preview-container"><img src={referencePreviewUrl} alt="Referencia" className="ref-image-preview" /><button className="remove-ref-btn" onClick={() => {
                setReferenceFile(null);
                setReferencePreviewUrl("");
                setReferenceBase64("");
              }}>✕ Quitar</button></div> : <label className="upload-drop-label"><input type="file" accept="image/*" onChange={event => {
                var filesTemp;
                return handleReferenceUpload((filesTemp = event.target.files) == null ? undefined : filesTemp[0]);
              }} /><div className="drop-icon">📁</div><span>Arrastra una miniatura aquí o haz clic para subir</span><small>PNG, JPG o WebP</small></label>}</div>{referencePreviewUrl ? <button className="ai-extract-btn" onClick={handleExtractPrompt} disabled={isExtractingPrompt}>{isExtractingPrompt ? <jsx.Fragment><span className="working" style={{
                width: 14,
                height: 14,
                borderWidth: 2
              }} /><span>Analizando imagen con Gemini Vision...</span></jsx.Fragment> : <jsx.Fragment>✨ Extraer Prompt Visual con Gemini</jsx.Fragment>}</button> : null}</div><div className="tool-card"><div className="card-header"><span className="step-badge">2</span><h3>Prompt Visual para la Miniatura</h3></div><textarea className="thumb-prompt-textarea" placeholder="Describe el sujeto, emoción, colores y fondo de la miniatura..." value={prompt} onChange={event => setPrompt(event.target.value)} rows={4} /><div className="field-group"><label>Estilo Visual de Miniatura</label><select value={selectedStyle} onChange={event => setSelectedStyle(event.target.value)} className="thumb-select">{h.map(style => <option value={style.value} key={style.value}>{style.label}</option>)}</select></div><div className="field-group"><div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6
            }}><label style={{
                margin: 0
              }}>Número de Variantes Reales</label><span style={{
                fontSize: 10,
                color: "var(--indigo, #6366f1)",
                fontWeight: 800
              }}>{variantCount === 4 ? "✨ 4 Arquetipos de Alto CTR" : variantCount + " Variantes"}</span></div><div className="variants-pill-group">{[1, 2, 3, 4].map(count => <button type="button" className={"variant-pill " + (variantCount === count ? "active" : "")} onClick={() => setVariantCount(count)} key={count}>{count} {count === 1 ? "Versión" : "Versiones"}</button>)}</div></div>{variantCount === 4 && <div style={{
            background: "rgba(99, 102, 241, 0.07)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: 8,
            padding: "8px 10px",
            marginBottom: 14
          }}><div style={{
              fontSize: 10.5,
              fontWeight: 800,
              color: "var(--indigo, #6366f1)",
              marginBottom: 4
            }}>Fórmulas Compositivas de las 4 Variantes:</div><div style={{
              display: "grid",
              gap: 3,
              fontSize: 9.5,
              color: "var(--text-muted)"
            }}><div><b>V1:</b> Expresión Emocional & Rim Light</div><div><b>V2:</b> Acción Dinámica & Choque Diagonal</div><div><b>V3:</b> Objeto Enigmático & Intriga Central</div><div><b>V4:</b> Gran Angular Cinemático Épico</div></div></div>}<button className="generate-thumbnails-btn" onClick={handleGenerateThumbnails} disabled={isGenerating}>{isGenerating ? <jsx.Fragment><span className="working" style={{
                width: 16,
                height: 16,
                borderWidth: 2
              }} /><span>{generationStatus || "Generando " + variantCount + " Variantes con Flow..."}</span></jsx.Fragment> : <jsx.Fragment><span>🎨</span><span>Generar {variantCount} Variantes Reales (16:9)</span></jsx.Fragment>}</button></div></div><div className="thumb-gallery-panel"><div className="gallery-header"><div><h2>🖼️ Miniaturas Generadas ({thumbnails.length})</h2>{project.thumbnailUrl ? <div style={{
              fontSize: 11,
              color: "#34d399",
              fontWeight: 700,
              marginTop: 2
            }}>✓ Portada del proyecto configurada</div> : null}</div>{thumbnails.length > 0 ? <button className="clear-gallery-btn" onClick={() => setThumbnails([])}>Limpiar Galería</button> : null}</div>{thumbnails.length > 0 ? <div className="thumbnails-grid">{thumbnails.map((thumbnail, index) => <div className="thumbnail-card" key={thumbnail.id}><div className="thumb-ratio-box" onClick={() => setPreviewImageUrl(thumbnail.url)} style={{
              cursor: "pointer"
            }} title="Haz clic para ver a pantalla completa"><img src={thumbnail.url} alt={thumbnail.archetypeTitle || "Variante " + (index + 1)} /><span className="variant-label">{thumbnail.archetypeBadge || "V" + (index + 1)}</span></div><div style={{
              padding: "8px 12px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)"
            }}><div style={{
                fontSize: 11.5,
                fontWeight: 800,
                color: "var(--text-primary)"
              }}>{thumbnail.archetypeTitle || "Variante " + (index + 1)}</div>{thumbnail.archetypeDesc ? <div style={{
                fontSize: 10,
                color: "var(--text-muted)",
                marginTop: 2,
                marginBottom: 6
              }}>{thumbnail.archetypeDesc}</div> : null}</div><div className="thumb-card-footer" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6
            }}><button className="btn-download" onClick={() => handleUseAsScene1(thumbnail)} title="Insertar esta miniatura en la Escena 1 del video" style={{
                background: "var(--indigo, #6366f1)"
              }}>🎬 Usar como Escena 1</button><button className="btn-download" onClick={() => handleSetAsCover(thumbnail)} title="Guardar como imagen de portada del proyecto" style={{
                background: "rgba(52, 211, 153, 0.15)",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                color: "#34d399"
              }}>📌 Fijar Portada</button><button className="btn-copy" onClick={() => handleDownload(thumbnail.url, thumbnail.archetypeBadge, index)} title="Descargar imagen en formato JPG de alta resolución">💾 Descargar JPG</button><button className="btn-copy" onClick={() => handleCopyPrompt(thumbnail.prompt)} title="Copiar prompt completo utilizado">📋 Copiar Prompt</button></div></div>)}</div> : <div className="empty-gallery-card"><div className="empty-gallery-icon">🎨</div><h3>Aquí aparecerán tus miniaturas generadas</h3><p>Sube una imagen de referencia, extrae el prompt con Gemini Vision y genera hasta 4 variantes de alto CTR en formato 16:9.</p></div>}</div></div>{previewImageUrl && <div onMouseDown={() => setPreviewImageUrl(null)} style={{
      position: "fixed",
      inset: 0,
      zIndex: 2000,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(6px)",
      display: "grid",
      placeItems: "center",
      padding: 24,
      cursor: "zoom-out"
    }}><div style={{
        position: "relative",
        maxWidth: "90vw",
        maxHeight: "90vh"
      }}><img src={previewImageUrl} alt="Vista previa completa" style={{
          width: "100%",
          height: "auto",
          maxHeight: "85vh",
          borderRadius: 12,
          boxShadow: "0 20px 50px rgba(0,0,0,0.8)"
        }} /><button onClick={() => setPreviewImageUrl(null)} style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          width: 32,
          height: 32,
          cursor: "pointer",
          fontWeight: 900
        }}>✕</button></div></div>}</div>;
};
export { M as THUMBNAIL_VARIANT_ARCHETYPES, se as ThumbnailStudio };