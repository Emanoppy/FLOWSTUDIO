import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
import { r as React, j as jsx2 } from "./vendor-react-BbRiLirl.js";
import { u as useStore, e as useToast, f as optimizeImageForAI, g as callFlowApi } from "./index-DE7up0M0.js";
import "./vendor-state-m3Xdu9cz.js";
import "./vendor-remotion-D3IpuOk5.js";
const M = [{
  id: "emotion-rim",
  badge: "V1",
  title: "Expresi\xF3n Emocional & Rim Light",
  desc: "Primer plano dram\xE1tico, expresi\xF3n facial de alto impacto y contraluz vibrante",
  promptModifier: "extreme emotional close-up portrait, intense facial expression of shock, astonishment or intense curiosity, wide open expressive eyes looking towards camera, dramatic neon edge rim lighting (blue and warm orange backlight), dark high-contrast cinematic background with shallow depth of field bokeh, hyper-detailed skin texture, 8k YouTube viral thumbnail aesthetic"
}, {
  id: "action-split",
  badge: "V2",
  title: "Acci\xF3n Din\xE1mica & Conflicto",
  desc: "Composici\xF3n en diagonal, choque de elementos, part\xEDculas y energ\xEDa visual",
  promptModifier: "dynamic diagonal composition, dramatic confrontation or action pose, floating particles, sparks and high-energy motion blur, vibrant saturated split lighting (warm vs cool colors), dramatic diagonal visual tension, clean silhouette contrast, high-CTR YouTube thumbnail composition"
}, {
  id: "mystery-artifact",
  badge: "V3",
  title: "Misterio & Objeto Curioso Central",
  desc: "Elemento enigm\xE1tico brillante en el punto focal con gesto de intriga",
  promptModifier: "mysterious glowing central subject or artifact in focal point, character reacting in foreground with curious pointing or gasping gesture, dramatic volumetric light rays, deep dark shadows and intense focal spotlight, high visual intrigue and curiosity gap, 8k sharp resolution"
}, {
  id: "epic-cinematic",
  badge: "V4",
  title: "Gran Angular Cinem\xE1tico \xC9pico",
  desc: "Perspectiva panor\xE1mica, escala masiva y atm\xF3sfera HDR estilo p\xF3ster",
  promptModifier: "epic wide-angle low perspective, massive cinematic scale, atmospheric fog and haze, blockbuster movie poster composition, rich HDR color grading, dramatic sky or environment background, pristine ultra-sharp focus across entire frame"
}];
const h = [{
  value: "viral-youtube",
  label: "\u{1F525} Viral YouTube (Alto Contraste, Saturaci\xF3n & Dramatismo)",
  promptSuffix: "YouTube viral thumbnail, high click-through-rate aesthetic, dramatic rim lighting, saturated contrast, photorealistic sharp focus, bold visual hierarchy --ar 16:9"
}, {
  value: "cinematic-3d",
  label: "\u{1F3AC} 3D Render Cinem\xE1tico (Iluminaci\xF3n Octane & Unreal Engine)",
  promptSuffix: "Unreal Engine 5 render, Octane render, 3D character art, subsurface scattering, cinematic lighting, ultra-detailed 3D model, ray tracing reflections, 8k 3D art --ar 16:9"
}, {
  value: "realistic-photo",
  label: "\u{1F4F7} Fotograf\xEDa Realista de Alto Impacto (8K DSLR, Bokeh)",
  promptSuffix: "professional DSLR photography, 85mm f/1.4 lens, natural skin pores and realistic texture, commercial studio strobe lighting, razor sharp eyes, 8k resolution --ar 16:9"
}, {
  value: "anime-comic",
  label: "\u{1F3A8} 2D C\xF3mic / Anime Explicativo (L\xEDnea Limpia)",
  promptSuffix: "2D animated cartoon webtoon style, clean solid line art, vibrant cel shading, expressive anime eyes, colorful vector background, no photorealism --ar 16:9"
}, {
  value: "dark-mystery",
  label: "\u{1F311} Misterio Oscuro & Luces de Ne\xF3n",
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
  const [isExtractingPrompt, setIsExtractingPrompt] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generationStatus, setGenerationStatus] = React.useState("");
  const [thumbnails, setThumbnails] = React.useState([]);
  const [previewImageUrl, setPreviewImageUrl] = React.useState(null);
  const flowState = useStore((state) => state.flowState);
  const setCurrentView = useStore((state) => state.setCurrentView);
  const project = useStore((state) => state.project);
  const updateProject = useStore((state) => state.updateProject);
  const updateScene = useStore((state) => state.updateScene);
  const addSceneAt = useStore((state) => state.addSceneAt);
  const {
    addToast
  } = useToast();
  const handleReferenceUpload = async (file) => {
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
    setIsExtractingPrompt(true);
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
        }, 4e4);
        if ((extractedTextTemp = result == null ? void 0 : result.text) != null && extractedTextTemp.trim()) {
          setPrompt(result.text.trim());
          addToast("\u2728 Prompt visual extra\xEDdo con Gemini Vision", "success");
          return;
        }
      }
      const styleOption = h.find((style) => style.value === selectedStyle);
      const fallbackPrompt = "High-CTR viral YouTube thumbnail, dramatic main subject with intense emotional expression in foreground, " + ((styleOption == null ? void 0 : styleOption.promptSuffix) || "cinematic contrast, 8k resolution");
      setPrompt(fallbackPrompt);
      addToast("\u2728 Prompt base configurado para miniaturas de alto impacto", "info");
    } catch {
      const styleOption = h.find((style) => style.value === selectedStyle);
      const fallbackPrompt = "High-CTR viral YouTube thumbnail, dramatic main subject with intense emotional expression in foreground, " + ((styleOption == null ? void 0 : styleOption.promptSuffix) || "cinematic contrast, 8k resolution");
      setPrompt(fallbackPrompt);
      addToast("\u2728 Prompt base configurado para miniaturas de alto impacto", "info");
    } finally {
      setIsExtractingPrompt(false);
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
      addToast("Google Flow no est\xE1 conectado. Abre la ventana de conexi\xF3n arriba.", "error");
      if ((electronApiTemp = window.electronAPI) != null && electronApiTemp.openGoogleFlow) {
        window.electronAPI.openGoogleFlow();
      }
      return;
    }
    setIsGenerating(true);
    setGenerationStatus("Iniciando generaci\xF3n de " + variantCount + " variantes...");
    const newThumbnails = [...thumbnails];
    const styleOption = h.find((style) => style.value === selectedStyle) || h[0];
    try {
      addToast("Generando " + variantCount + " variantes \xFAnicas de miniatura con Google Flow...", "info");
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
          const result = await callFlowApi("FLOW_GENERATE_IMAGE", requestPayload, 9e4);
          const imageUrl = (result == null ? void 0 : result.imageUrl) || (result == null ? void 0 : result.url) || (result == null ? void 0 : result.mediaUrl) || (result == null ? void 0 : result.images) && ((imagesTemp = result.images[0]) == null ? void 0 : imagesTemp.url) || "";
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
        addToast("\u2713 \xA1" + newCount + " miniaturas generadas con \xE9xito!", "success");
      } else {
        addToast("No se pudo generar miniaturas. Aseg\xFArate de tener un proyecto abierto dentro de Google Flow.", "error");
        if ((electronApiTemp2 = window.electronAPI) != null && electronApiTemp2.openGoogleFlow) {
          window.electronAPI.openGoogleFlow();
        }
      }
    } catch (error) {
      addToast("Error general generando miniaturas: " + error.message, "error");
    } finally {
      setIsGenerating(false);
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
    addToast("Descargando miniatura en alta resoluci\xF3n...", "success");
  };
  const handleCopyPrompt = (prompt2) => {
    navigator.clipboard.writeText(prompt2);
    addToast("Prompt copiado al portapapeles \u2713", "info");
  };
  const handleUseAsScene1 = (thumbnail) => {
    const scenes = Array.isArray(project.scenes) ? project.scenes : [];
    if (scenes.length > 0) {
      updateScene(scenes[0].id, {
        imageUrl: thumbnail.url,
        caption: "Portada / Escena 1",
        motion: "gentle-zoom-in"
      });
      addToast("\u2713 Miniatura asignada a la Escena 1 del proyecto", "success");
    } else {
      addSceneAt(0, {
        imageUrl: thumbnail.url,
        caption: "Portada / Escena 1",
        duration: 4
      });
      addToast("\u2713 Escena 1 creada con esta miniatura", "success");
    }
  };
  const handleSetAsCover = (thumbnail) => {
    updateProject({
      thumbnailUrl: thumbnail.url
    });
    addToast("\u2713 Portada del proyecto actualizada", "success");
  };
  return /* @__PURE__ */ jsxs("div", { className: "thumbnail-studio-layout", children: [
    /* @__PURE__ */ jsxs("header", { className: "thumb-header", children: [
      /* @__PURE__ */ jsxs("div", { className: "thumb-header-left", children: [
        /* @__PURE__ */ jsx("button", { className: "back-btn", onClick: () => setCurrentView("dashboard"), children: "\u2190 Volver al Inicio" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { children: "\u{1F5BC}\uFE0F Thumbnail Studio Pro" }),
          /* @__PURE__ */ jsx("p", { children: "Generaci\xF3n de 4 variantes reales de alto CTR con IA y condicionamiento multimodal" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "thumb-header-right", children: /* @__PURE__ */ jsxs("div", { className: "flow-status " + (flowState.connected ? "online" : ""), onClick: () => {
        var electronApiTemp;
        var openGoogleFlowFnTemp;
        if ((openGoogleFlowFnTemp = (electronApiTemp = window.electronAPI) == null ? void 0 : electronApiTemp.openGoogleFlow) == null) {
          return void 0;
        } else {
          return openGoogleFlowFnTemp.call(electronApiTemp);
        }
      }, style: {
        cursor: "pointer"
      }, title: flowState.label || "Haz clic para conectar Google Flow", children: [
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("span", { children: flowState.connected ? "Flow Conectado" : "\u{1F517} Conectar Flow" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "thumb-content-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "thumb-tools-panel", children: [
        /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "card-header", children: [
            /* @__PURE__ */ jsx("span", { className: "step-badge", children: "1" }),
            /* @__PURE__ */ jsx("h3", { children: "Miniatura de Referencia o Idea" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "card-desc", children: "Sube una miniatura existente para clonar su composici\xF3n, personaje o estilo con IA multimodal." }),
          /* @__PURE__ */ jsx("div", { className: "reference-drop-area", children: referencePreviewUrl ? /* @__PURE__ */ jsxs("div", { className: "preview-container", children: [
            /* @__PURE__ */ jsx("img", { src: referencePreviewUrl, alt: "Referencia", className: "ref-image-preview" }),
            /* @__PURE__ */ jsx("button", { className: "remove-ref-btn", onClick: () => {
              setReferenceFile(null);
              setReferencePreviewUrl("");
              setReferenceBase64("");
            }, children: "\u2715 Quitar" })
          ] }) : /* @__PURE__ */ jsxs("label", { className: "upload-drop-label", children: [
            /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: (event) => {
              var filesTemp;
              return handleReferenceUpload((filesTemp = event.target.files) == null ? void 0 : filesTemp[0]);
            } }),
            /* @__PURE__ */ jsx("div", { className: "drop-icon", children: "\u{1F4C1}" }),
            /* @__PURE__ */ jsx("span", { children: "Arrastra una miniatura aqu\xED o haz clic para subir" }),
            /* @__PURE__ */ jsx("small", { children: "PNG, JPG o WebP" })
          ] }) }),
          referencePreviewUrl ? /* @__PURE__ */ jsx("button", { className: "ai-extract-btn", onClick: handleExtractPrompt, disabled: isExtractingPrompt, children: isExtractingPrompt ? /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "working", style: {
              width: 14,
              height: 14,
              borderWidth: 2
            } }),
            /* @__PURE__ */ jsx("span", { children: "Analizando imagen con Gemini Vision..." })
          ] }) : /* @__PURE__ */ jsx(jsx2.Fragment, { children: "\u2728 Extraer Prompt Visual con Gemini" }) }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tool-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "card-header", children: [
            /* @__PURE__ */ jsx("span", { className: "step-badge", children: "2" }),
            /* @__PURE__ */ jsx("h3", { children: "Prompt Visual para la Miniatura" })
          ] }),
          /* @__PURE__ */ jsx("textarea", { className: "thumb-prompt-textarea", placeholder: "Describe el sujeto, emoci\xF3n, colores y fondo de la miniatura...", value: prompt, onChange: (event) => setPrompt(event.target.value), rows: 4 }),
          /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
            /* @__PURE__ */ jsx("label", { children: "Estilo Visual de Miniatura" }),
            /* @__PURE__ */ jsx("select", { value: selectedStyle, onChange: (event) => setSelectedStyle(event.target.value), className: "thumb-select", children: h.map((style) => /* @__PURE__ */ jsx("option", { value: style.value, children: style.label }, style.value)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6
            }, children: [
              /* @__PURE__ */ jsx("label", { style: {
                margin: 0
              }, children: "N\xFAmero de Variantes Reales" }),
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 10,
                color: "var(--indigo, #6366f1)",
                fontWeight: 800
              }, children: variantCount === 4 ? "\u2728 4 Arquetipos de Alto CTR" : variantCount + " Variantes" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "variants-pill-group", children: [1, 2, 3, 4].map((count) => /* @__PURE__ */ jsxs("button", { type: "button", className: "variant-pill " + (variantCount === count ? "active" : ""), onClick: () => setVariantCount(count), children: [
              count,
              " ",
              count === 1 ? "Versi\xF3n" : "Versiones"
            ] }, count)) })
          ] }),
          variantCount === 4 && /* @__PURE__ */ jsxs("div", { style: {
            background: "rgba(99, 102, 241, 0.07)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: 8,
            padding: "8px 10px",
            marginBottom: 14
          }, children: [
            /* @__PURE__ */ jsx("div", { style: {
              fontSize: 10.5,
              fontWeight: 800,
              color: "var(--indigo, #6366f1)",
              marginBottom: 4
            }, children: "F\xF3rmulas Compositivas de las 4 Variantes:" }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "grid",
              gap: 3,
              fontSize: 9.5,
              color: "var(--text-muted)"
            }, children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("b", { children: "V1:" }),
                " Expresi\xF3n Emocional & Rim Light"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("b", { children: "V2:" }),
                " Acci\xF3n Din\xE1mica & Choque Diagonal"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("b", { children: "V3:" }),
                " Objeto Enigm\xE1tico & Intriga Central"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("b", { children: "V4:" }),
                " Gran Angular Cinem\xE1tico \xC9pico"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "generate-thumbnails-btn", onClick: handleGenerateThumbnails, disabled: isGenerating, children: isGenerating ? /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "working", style: {
              width: 16,
              height: 16,
              borderWidth: 2
            } }),
            /* @__PURE__ */ jsx("span", { children: generationStatus || "Generando " + variantCount + " Variantes con Flow..." })
          ] }) : /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: "\u{1F3A8}" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Generar ",
              variantCount,
              " Variantes Reales (16:9)"
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "thumb-gallery-panel", children: [
        /* @__PURE__ */ jsxs("div", { className: "gallery-header", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { children: [
              "\u{1F5BC}\uFE0F Miniaturas Generadas (",
              thumbnails.length,
              ")"
            ] }),
            project.thumbnailUrl ? /* @__PURE__ */ jsx("div", { style: {
              fontSize: 11,
              color: "#34d399",
              fontWeight: 700,
              marginTop: 2
            }, children: "\u2713 Portada del proyecto configurada" }) : null
          ] }),
          thumbnails.length > 0 ? /* @__PURE__ */ jsx("button", { className: "clear-gallery-btn", onClick: () => setThumbnails([]), children: "Limpiar Galer\xEDa" }) : null
        ] }),
        thumbnails.length > 0 ? /* @__PURE__ */ jsx("div", { className: "thumbnails-grid", children: thumbnails.map((thumbnail, index) => /* @__PURE__ */ jsxs("div", { className: "thumbnail-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "thumb-ratio-box", onClick: () => setPreviewImageUrl(thumbnail.url), style: {
            cursor: "pointer"
          }, title: "Haz clic para ver a pantalla completa", children: [
            /* @__PURE__ */ jsx("img", { src: thumbnail.url, alt: thumbnail.archetypeTitle || "Variante " + (index + 1) }),
            /* @__PURE__ */ jsx("span", { className: "variant-label", children: thumbnail.archetypeBadge || "V" + (index + 1) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            padding: "8px 12px 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)"
          }, children: [
            /* @__PURE__ */ jsx("div", { style: {
              fontSize: 11.5,
              fontWeight: 800,
              color: "var(--text-primary)"
            }, children: thumbnail.archetypeTitle || "Variante " + (index + 1) }),
            thumbnail.archetypeDesc ? /* @__PURE__ */ jsx("div", { style: {
              fontSize: 10,
              color: "var(--text-muted)",
              marginTop: 2,
              marginBottom: 6
            }, children: thumbnail.archetypeDesc }) : null
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "thumb-card-footer", style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6
          }, children: [
            /* @__PURE__ */ jsx("button", { className: "btn-download", onClick: () => handleUseAsScene1(thumbnail), title: "Insertar esta miniatura en la Escena 1 del video", style: {
              background: "var(--indigo, #6366f1)"
            }, children: "\u{1F3AC} Usar como Escena 1" }),
            /* @__PURE__ */ jsx("button", { className: "btn-download", onClick: () => handleSetAsCover(thumbnail), title: "Guardar como imagen de portada del proyecto", style: {
              background: "rgba(52, 211, 153, 0.15)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              color: "#34d399"
            }, children: "\u{1F4CC} Fijar Portada" }),
            /* @__PURE__ */ jsx("button", { className: "btn-copy", onClick: () => handleDownload(thumbnail.url, thumbnail.archetypeBadge, index), title: "Descargar imagen en formato JPG de alta resoluci\xF3n", children: "\u{1F4BE} Descargar JPG" }),
            /* @__PURE__ */ jsx("button", { className: "btn-copy", onClick: () => handleCopyPrompt(thumbnail.prompt), title: "Copiar prompt completo utilizado", children: "\u{1F4CB} Copiar Prompt" })
          ] })
        ] }, thumbnail.id)) }) : /* @__PURE__ */ jsxs("div", { className: "empty-gallery-card", children: [
          /* @__PURE__ */ jsx("div", { className: "empty-gallery-icon", children: "\u{1F3A8}" }),
          /* @__PURE__ */ jsx("h3", { children: "Aqu\xED aparecer\xE1n tus miniaturas generadas" }),
          /* @__PURE__ */ jsx("p", { children: "Sube una imagen de referencia, extrae el prompt con Gemini Vision y genera hasta 4 variantes de alto CTR en formato 16:9." })
        ] })
      ] })
    ] }),
    previewImageUrl && /* @__PURE__ */ jsx("div", { onMouseDown: () => setPreviewImageUrl(null), style: {
      position: "fixed",
      inset: 0,
      zIndex: 2e3,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(6px)",
      display: "grid",
      placeItems: "center",
      padding: 24,
      cursor: "zoom-out"
    }, children: /* @__PURE__ */ jsxs("div", { style: {
      position: "relative",
      maxWidth: "90vw",
      maxHeight: "90vh"
    }, children: [
      /* @__PURE__ */ jsx("img", { src: previewImageUrl, alt: "Vista previa completa", style: {
        width: "100%",
        height: "auto",
        maxHeight: "85vh",
        borderRadius: 12,
        boxShadow: "0 20px 50px rgba(0,0,0,0.8)"
      } }),
      /* @__PURE__ */ jsx("button", { onClick: () => setPreviewImageUrl(null), style: {
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
      }, children: "\u2715" })
    ] }) })
  ] });
};
export {
  M as THUMBNAIL_VARIANT_ARCHETYPES,
  se as ThumbnailStudio
};
