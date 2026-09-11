import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
import { r as React, j as jsx2 } from "./vendor-react-BbRiLirl.js";
import { u as useStore, n as createProject, i as EMPTY_PROJECT, s as saveProject, a as apiFetch, l as listProjects, b as getProjectById, d as duplicateProject, c as deleteProject } from "./index-DE7up0M0.js";
import "./vendor-state-m3Xdu9cz.js";
import "./vendor-remotion-D3IpuOk5.js";
const Ce = ({
  isOpen,
  onClose
}) => {
  const [step, setStep] = React.useState("select-mode");
  const [format, setFormat] = React.useState("short");
  const [scriptText, setScriptText] = React.useState("");
  const [visualStyle, setVisualStyle] = React.useState("western-anime");
  const [isCreating, setIsCreating] = React.useState(false);
  const [audioFile, setAudioFile] = React.useState(null);
  const setCurrentView = useStore((state) => state.setCurrentView);
  const setProject = useStore((state) => state.setProject);
  if (!isOpen) {
    return null;
  }
  const handleCreateFromScript = async () => {
    var firstLineTemp;
    if (scriptText.trim()) {
      setIsCreating(true);
      try {
        const lines = scriptText.split(/\r?\n|\.(?=\s+[A-ZÁÉÍÓÚÑ¿¡]|$)/).map((line) => line.trim().replace(/^[-•*0-9.]+\s*/, "")).filter((line) => line.length > 5);
        const finalLines = lines.length ? lines : [scriptText.trim()];
        const scenes = finalLines.slice(0, 20).map((lineText, index) => ({
          id: crypto.randomUUID(),
          title: "Escena " + (index + 1),
          prompt: lineText + ", cinematic lighting, highly detailed, master direction",
          caption: lineText,
          duration: Math.max(3.5, Math.min(7, Math.round(lineText.split(" ").length * 0.45) || 4)),
          motion: index % 2 === 0 ? "gentle-zoom-in" : "gentle-zoom-out",
          imageUrl: "",
          videoUrl: "",
          videoModel: "veo-3.1-lite",
          videoDuration: 8,
          transition: "inherit",
          hasCharacter: true,
          isStockMotion: false,
          status: "idle"
        }));
        const newProject = createProject({
          ...EMPTY_PROJECT,
          id: crypto.randomUUID(),
          title: ((firstLineTemp = finalLines[0]) == null ? void 0 : firstLineTemp.slice(0, 40)) || (format === "short" ? "Nuevo Short con Guion" : "Nuevo Video con Guion"),
          format,
          visualStyle,
          scenes,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        setProject(newProject);
        await saveProject(newProject);
        setCurrentView("editor");
        onClose();
      } catch (error) {
        alert("Error al crear proyecto: " + error.message);
      } finally {
        setIsCreating(false);
      }
    }
  };
  const handleLoadDemo = async () => {
    setIsCreating(true);
    try {
      const demoScenes = [{
        id: crypto.randomUUID(),
        title: "Escena 1: El Despertar",
        prompt: "Futuristic digital creator working in a cyberpunk studio with neon lights, glowing holographic screens, cinematic 2D comic art style, ultra detailed",
        caption: "El secreto de los creadores virales no es la suerte.",
        duration: 4,
        motion: "gentle-zoom-in",
        imageUrl: "",
        videoUrl: "",
        videoModel: "veo-3.1-lite",
        hasCharacter: true,
        status: "idle"
      }, {
        id: crypto.randomUUID(),
        title: "Escena 2: Automatizaci\xF3n",
        prompt: "High tech AI brain processing glowing data streams, golden particles, digital universe visualization, dramatic lighting, 2D comic anime style",
        caption: "Es tener un sistema inteligente que trabaje contigo.",
        duration: 4.5,
        motion: "pan-right",
        imageUrl: "",
        videoUrl: "",
        videoModel: "veo-3.1-lite",
        hasCharacter: false,
        status: "idle"
      }, {
        id: crypto.randomUUID(),
        title: "Escena 3: Multiplicaci\xF3n",
        prompt: "Multiple digital video screens floating in space showing colorful animations, engaging storytelling, viral content reach, neon aesthetic",
        caption: "Genera im\xE1genes, movimiento y subt\xEDtulos en minutos.",
        duration: 4,
        motion: "gentle-zoom-out",
        imageUrl: "",
        videoUrl: "",
        videoModel: "veo-3.1-lite",
        hasCharacter: false,
        status: "idle"
      }, {
        id: crypto.randomUUID(),
        title: "Escena 4: Conclusi\xF3n",
        prompt: "Confident content creator holding a glowing digital trophy, neon city skyline in the background, victorious atmosphere, epic art style",
        caption: "Empieza hoy mismo con FLOWSTUDIO.",
        duration: 4.5,
        motion: "gentle-zoom-in",
        imageUrl: "",
        videoUrl: "",
        videoModel: "veo-3.1-lite",
        hasCharacter: true,
        status: "idle"
      }];
      const newProject = createProject({
        ...EMPTY_PROJECT,
        id: crypto.randomUUID(),
        title: "Proyecto Demo \xB7 El Secreto Viral",
        format: "short",
        visualStyle: "western-anime",
        scenes: demoScenes,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      setProject(newProject);
      await saveProject(newProject);
      setCurrentView("editor");
      onClose();
    } catch (error) {
      alert("Error al cargar demo: " + error.message);
    } finally {
      setIsCreating(false);
    }
  };
  const handleCreateBlank = async (format2 = "short") => {
    const newProject = createProject({
      ...EMPTY_PROJECT,
      id: crypto.randomUUID(),
      title: format2 === "short" ? "Nuevo Short 9:16" : "Nuevo Video 16:9",
      format: format2,
      visualStyle,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    setProject(newProject);
    await saveProject(newProject);
    setCurrentView("editor");
    onClose();
  };
  return /* @__PURE__ */ jsx("div", { style: {
    position: "fixed",
    inset: 0,
    zIndex: 12e3,
    background: "rgba(3, 5, 12, 0.82)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }, onClick: (event) => {
    if (event.target === event.currentTarget && !isCreating) {
      onClose();
    }
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    background: "#0d111d",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 22,
    padding: "32px",
    width: "100%",
    maxWidth: 640,
    boxShadow: "0 30px 80px rgba(0,0,0,0.85), 0 0 40px rgba(99, 102, 241, 0.15)",
    color: "#fff",
    fontFamily: "var(--font-sans, system-ui)",
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 24
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.1em",
          color: "#818cf8",
          textTransform: "uppercase"
        }, children: "ASISTENTE AUTOM\xC1TICO" }),
        /* @__PURE__ */ jsx("h2", { style: {
          fontSize: 22,
          fontWeight: 800,
          margin: "4px 0 0",
          color: "#fff"
        }, children: step === "select-mode" ? "\xBFC\xF3mo deseas crear tu video?" : step === "script-input" ? "Pega tu Guion o Idea" : "Sube tu Audio" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, style: {
        background: "transparent",
        border: "none",
        color: "#94a3b8",
        fontSize: 20,
        cursor: "pointer",
        padding: 4
      }, children: "\u2715" })
    ] }),
    step === "select-mode" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { style: {
        marginBottom: 22
      }, children: [
        /* @__PURE__ */ jsx("label", { style: {
          display: "block",
          fontSize: 12,
          fontWeight: 700,
          color: "#94a3b8",
          marginBottom: 8
        }, children: "Formato del Video:" }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setFormat("short"), style: {
            padding: "12px 16px",
            background: format === "short" ? "rgba(99, 102, 241, 0.2)" : "rgba(255,255,255,0.03)",
            border: "1.5px solid " + (format === "short" ? "#6366f1" : "rgba(255,255,255,0.08)"),
            borderRadius: 12,
            color: "#fff",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 10
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 22
            }, children: "\u{1F4F1}" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                display: "block",
                fontSize: 13
              }, children: "Vertical 9:16" }),
              /* @__PURE__ */ jsx("small", { style: {
                color: "#94a3b8",
                fontSize: 11
              }, children: "Shorts, TikToks & Reels" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setFormat("youtube"), style: {
            padding: "12px 16px",
            background: format === "youtube" ? "rgba(99, 102, 241, 0.2)" : "rgba(255,255,255,0.03)",
            border: "1.5px solid " + (format === "youtube" ? "#6366f1" : "rgba(255,255,255,0.08)"),
            borderRadius: 12,
            color: "#fff",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 10
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 22
            }, children: "\u{1F3AC}" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                display: "block",
                fontSize: 13
              }, children: "Horizontal 16:9" }),
              /* @__PURE__ */ jsx("small", { style: {
                color: "#94a3b8",
                fontSize: 11
              }, children: "YouTube Largo & Documental" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gap: 12,
        marginBottom: 20
      }, children: [
        /* @__PURE__ */ jsxs("div", { onClick: () => setStep("script-input"), style: {
          background: "linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(6, 182, 212, 0.1))",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          borderRadius: 14,
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.2s ease"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 14
          }, children: [
            /* @__PURE__ */ jsx("div", { style: {
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(99, 102, 241, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22
            }, children: "\u270D\uFE0F" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                fontSize: 14,
                color: "#fff",
                display: "block"
              }, children: "Crear a partir de un Guion o Texto (Recomendado)" }),
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 12,
                color: "#94a3b8"
              }, children: "Pega tu historia y la app dividir\xE1 las escenas autom\xE1ticamente." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 18,
            color: "#818cf8"
          }, children: "\u2192" })
        ] }),
        /* @__PURE__ */ jsxs("div", { onClick: handleLoadDemo, style: {
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 14,
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.2s"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 14
          }, children: [
            /* @__PURE__ */ jsx("div", { style: {
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(245, 158, 11, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22
            }, children: "\u2728" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                fontSize: 14,
                color: "#fff",
                display: "block"
              }, children: "Cargar Proyecto Demo Listo" }),
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 12,
                color: "#94a3b8"
              }, children: "Explora un video preconfigurado con 4 escenas listas para renderizar." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 18,
            color: "#94a3b8"
          }, children: "\u2192" })
        ] }),
        /* @__PURE__ */ jsxs("div", { onClick: () => handleCreateBlank(format), style: {
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 14,
          padding: "14px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 14
          }, children: [
            /* @__PURE__ */ jsx("div", { style: {
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(255, 255, 255, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18
            }, children: "\u26A1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                fontSize: 13,
                color: "#e2e8f0",
                display: "block"
              }, children: "Empezar Proyecto en Blanco" }),
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 11.5,
                color: "#64748b"
              }, children: "Crea tus escenas de forma manual desde el editor." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 16,
            color: "#64748b"
          }, children: "\u2192" })
        ] })
      ] })
    ] }),
    step === "script-input" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { style: {
        fontSize: 13,
        color: "#94a3b8",
        marginBottom: 14,
        lineHeight: 1.5
      }, children: "Escribe o pega el texto de tu video. Cada punto o p\xE1rrafo crear\xE1 una nueva escena en tu l\xEDnea de tiempo:" }),
      /* @__PURE__ */ jsx("textarea", { autoFocus: true, value: scriptText, onChange: (event) => setScriptText(event.target.value), placeholder: "Ejemplo:\\nEl secreto de la disciplina no es la motivaci\xF3n.\\nLa verdadera disciplina es actuar cuando no tienes ganas.\\nPeque\xF1os h\xE1bitos diarios construyen grandes imperios.\\nEmpieza hoy con 15 minutos al d\xEDa.", rows: 6, style: {
        width: "100%",
        background: "#080a12",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        padding: "14px 16px",
        color: "#fff",
        fontSize: 13.5,
        lineHeight: 1.6,
        fontFamily: "inherit",
        outline: "none",
        marginBottom: 16,
        boxSizing: "border-box"
      } }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }, children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setStep("select-mode"), style: {
          background: "transparent",
          border: "none",
          color: "#94a3b8",
          fontSize: 13,
          cursor: "pointer"
        }, children: "\u2190 Volver" }),
        /* @__PURE__ */ jsx("button", { type: "button", disabled: !scriptText.trim() || isCreating, onClick: handleCreateFromScript, style: {
          padding: "12px 24px",
          background: scriptText.trim() ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "rgba(255,255,255,0.08)",
          border: "none",
          borderRadius: 12,
          color: scriptText.trim() ? "#fff" : "#64748b",
          fontSize: 14,
          fontWeight: 800,
          cursor: scriptText.trim() ? "pointer" : "not-allowed",
          boxShadow: scriptText.trim() ? "0 4px 15px rgba(79, 70, 229, 0.4)" : "none"
        }, children: isCreating ? "Creando Escenas..." : "\u26A1 Generar Proyecto Autom\xE1tico" })
      ] })
    ] })
  ] }) });
};
const Ae = ({
  onOpenAccountsModal,
  onOpenMaintenance
}) => {
  var scenesLenTemp;
  var firstSceneTemp1;
  var firstSceneTemp2;
  var electronApiTemp;
  const [activeTab, setActiveTab] = React.useState("projects");
  const [formatFilter, setFormatFilter] = React.useState("all");
  const [projects, setProjects] = React.useState([]);
  const [renders, setRenders] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoadingProjects, setIsLoadingProjects] = React.useState(true);
  const [isLoadingRenders, setIsLoadingRenders] = React.useState(false);
  const [updateAvailable, setUpdateAvailable] = React.useState(null);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = React.useState(false);
  const [isUserPopoverOpen, setIsUserPopoverOpen] = React.useState(false);
  const [hwid, setHwid] = React.useState("Detectando...");
  const [hwidCopied, setHwidCopied] = React.useState(false);
  const userPopoverRef = React.useRef(null);
  const authUser = useStore((state) => state.authUser);
  const flowState = useStore((state) => state.flowState);
  const setCurrentView = useStore((state) => state.setCurrentView);
  const createNewProjectWithFormat = useStore((state) => state.createNewProjectWithFormat);
  const loadProjectFromList = useStore((state) => state.loadProjectFromList);
  const project = useStore((state) => state.project);
  const getLicenseStatus = () => {
    if (!authUser || authUser.role === "guest" || authUser.isLicensed === false) {
      return {
        isLicensed: false,
        planTitle: "Modo Exploraci\xF3n (Prueba)",
        planBadge: "Invitado \xB7 Sin Activar",
        statusType: "guest",
        timeRemainingText: "Funciones IA Bloqueadas",
        timeSubText: "Activa tu licencia VIP para generar im\xE1genes, audios y videos ilimitados.",
        accentColor: "#f59e0b",
        bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.05) 100%)",
        borderColor: "rgba(245, 158, 11, 0.35)",
        icon: "\u26A1"
      };
    }
    if (authUser.role === "admin") {
      return {
        isLicensed: true,
        planTitle: "Administrador Master",
        planBadge: "Acceso Ilimitado",
        statusType: "admin",
        timeRemainingText: "\u267E\uFE0F Licencia Vitalicia Permanente",
        timeSubText: "Acceso maestro de administraci\xF3n y desarrollo.",
        accentColor: "#ef4444",
        bgGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.14) 0%, rgba(185, 28, 28, 0.05) 100%)",
        borderColor: "rgba(239, 68, 68, 0.35)",
        icon: "\u{1F451}"
      };
    }
    const planName = authUser.licensePlan || authUser.plan || "Creator Pro";
    const expiresAt = authUser.licenseExpiresAt || authUser.expiresAt || null;
    if (!expiresAt || String(planName).toLowerCase().includes("lifetime") || String(planName).toLowerCase().includes("vitalici") || String(planName).toLowerCase().includes("vip")) {
      return {
        isLicensed: true,
        planTitle: planName.toLowerCase().includes("lifetime") ? planName : "Plan Lifetime VIP",
        planBadge: "De por vida \xB7 Permanente",
        statusType: "lifetime",
        timeRemainingText: "\u267E\uFE0F Acceso Permanente de por Vida",
        timeSubText: "Tu licencia nunca caduca. Todas las actualizaciones y funciones incluidas.",
        accentColor: "#d7ff4f",
        bgGradient: "linear-gradient(135deg, rgba(215, 255, 79, 0.14) 0%, rgba(16, 185, 129, 0.08) 100%)",
        borderColor: "rgba(215, 255, 79, 0.35)",
        icon: "\u{1F451}"
      };
    }
    const expiryDate = new Date(expiresAt);
    const msRemaining = expiryDate.getTime() - Date.now();
    const daysRemaining = Math.ceil(msRemaining / 864e5);
    const isExpired = daysRemaining <= 0;
    const formattedDate = expiryDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    return {
      isLicensed: !isExpired,
      planTitle: "Plan " + planName,
      planBadge: isExpired ? "Suscripci\xF3n Expirada" : daysRemaining + " d\xEDa" + (daysRemaining === 1 ? "" : "s") + " restantes",
      statusType: isExpired ? "expired" : "active",
      timeRemainingText: isExpired ? "\u26A0\uFE0F Tu suscripci\xF3n ha vencido" : "\u23F1\uFE0F Quedan " + daysRemaining + " d\xEDa" + (daysRemaining === 1 ? "" : "s") + " (" + formattedDate + ")",
      timeSubText: isExpired ? "Renueva tu licencia para continuar usando la suite con IA." : "Tu suscripci\xF3n mensual vence el " + formattedDate + ".",
      accentColor: isExpired ? "#ef4444" : daysRemaining <= 5 ? "#f59e0b" : "#38bdf8",
      bgGradient: isExpired ? "linear-gradient(135deg, rgba(239, 68, 68, 0.14) 0%, rgba(185, 28, 28, 0.05) 100%)" : "linear-gradient(135deg, rgba(56, 189, 248, 0.14) 0%, rgba(99, 102, 241, 0.08) 100%)",
      borderColor: isExpired ? "rgba(239, 68, 68, 0.4)" : "rgba(56, 189, 248, 0.35)",
      icon: isExpired ? "\u26A0\uFE0F" : "\u{1F680}"
    };
  };
  const refreshProjects = async () => {
    var scenesLenTemp1;
    var firstSceneTemp3;
    var firstSceneImgTemp1;
    var firstSceneTemp4;
    var firstSceneVidTemp1;
    var scenesLenTemp2;
    var firstSceneTemp5;
    var firstSceneImgTemp2;
    var firstSceneTemp6;
    var firstSceneVidTemp2;
    try {
      setIsLoadingProjects(true);
      const projectsPromise = listProjects();
      const timeoutPromise = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Timeout al consultar proyectos de IndexedDB")), 3500));
      const raceResult = await Promise.race([projectsPromise, timeoutPromise]);
      if (Array.isArray(raceResult) && raceResult.length > 0) {
        setProjects(raceResult);
      } else {
        const currentProject = useStore.getState().project;
        if (currentProject != null && currentProject.id && ((scenesLenTemp1 = currentProject == null ? void 0 : currentProject.scenes) == null ? void 0 : scenesLenTemp1.length) > 0) {
          setProjects([{
            id: currentProject.id,
            title: currentProject.title || "Proyecto actual",
            format: currentProject.format || "short",
            visualStyle: currentProject.visualStyle || "western-anime",
            scenesCount: currentProject.scenes.length,
            thumbnailUrl: ((firstSceneImgTemp1 = (firstSceneTemp3 = currentProject.scenes) == null ? void 0 : firstSceneTemp3[0]) == null ? void 0 : firstSceneImgTemp1.imageUrl) || ((firstSceneVidTemp1 = (firstSceneTemp4 = currentProject.scenes) == null ? void 0 : firstSceneTemp4[0]) == null ? void 0 : firstSceneVidTemp1.videoUrl) || "",
            updatedAt: currentProject.updatedAt || Date.now(),
            createdAt: currentProject.createdAt || Date.now()
          }]);
        } else {
          setProjects([]);
        }
      }
    } catch (error) {
      console.warn("[Dashboard] Advertencia cargando proyectos:", error);
      const currentProject = useStore.getState().project;
      if (currentProject != null && currentProject.id && ((scenesLenTemp2 = currentProject == null ? void 0 : currentProject.scenes) == null ? void 0 : scenesLenTemp2.length) > 0) {
        setProjects([{
          id: currentProject.id,
          title: currentProject.title || "Proyecto actual",
          format: currentProject.format || "short",
          visualStyle: currentProject.visualStyle || "western-anime",
          scenesCount: currentProject.scenes.length,
          thumbnailUrl: ((firstSceneImgTemp2 = (firstSceneTemp5 = currentProject.scenes) == null ? void 0 : firstSceneTemp5[0]) == null ? void 0 : firstSceneImgTemp2.imageUrl) || ((firstSceneVidTemp2 = (firstSceneTemp6 = currentProject.scenes) == null ? void 0 : firstSceneTemp6[0]) == null ? void 0 : firstSceneVidTemp2.videoUrl) || "",
          updatedAt: currentProject.updatedAt || Date.now(),
          createdAt: currentProject.createdAt || Date.now()
        }]);
      } else {
        setProjects([]);
      }
    } finally {
      setIsLoadingProjects(false);
    }
  };
  const refreshRenders = async () => {
    try {
      setIsLoadingRenders(true);
      const response = await fetch("http://127.0.0.1:4322/api/renders/history").catch(() => fetch("/api/renders/history"));
      if (response.ok) {
        const data = await response.json();
        if (data.ok && Array.isArray(data.renders)) {
          setRenders(data.renders);
        }
      }
    } catch (error) {
      console.error("Error cargando historial de renders:", error);
    } finally {
      setIsLoadingRenders(false);
    }
  };
  React.useEffect(() => {
    refreshProjects();
    refreshRenders();
    apiFetch("/api/auth/hwid").then((response) => response.json()).then((data) => {
      if (data.ok && data.hwid) {
        setHwid(data.hwid);
      }
    }).catch(() => setHwid("No disponible"));
  }, []);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (userPopoverRef.current && !userPopoverRef.current.contains(event.target)) {
        setIsUserPopoverOpen(false);
      }
    };
    if (isUserPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserPopoverOpen]);
  React.useEffect(() => {
    let isCancelled = false;
    const checkForUpdates = async () => {
      var electronApiTemp2;
      var updatesTemp;
      try {
        const currentVersion = (electronApiTemp2 = window.electronAPI) != null && electronApiTemp2.getAppVersion ? await window.electronAPI.getAppVersion() : "1.8.5";
        const updatesResponse = await fetch("/api/updates").then((response) => response.ok ? response.json() : null).catch(() => null);
        const latestUpdate = (updatesTemp = updatesResponse == null ? void 0 : updatesResponse.updates) == null ? void 0 : updatesTemp[0];
        if (latestUpdate != null && latestUpdate.version && String(latestUpdate.version).localeCompare(String(currentVersion), void 0, {
          numeric: true
        }) > 0) {
          if (!isCancelled) {
            setUpdateAvailable({
              version: latestUpdate.version,
              url: latestUpdate.url || "https://github.com/nmediastudio/flowstudio-releases/releases"
            });
          }
          return;
        }
        const githubResponse = await fetch("https://api.github.com/repos/nmediastudio/flowstudio-releases/releases/latest", {
          headers: {
            Accept: "application/vnd.github+json"
          }
        });
        if (!githubResponse.ok) {
          return;
        }
        const githubData = await githubResponse.json();
        const releaseVersion = String(githubData.tag_name || "").replace(/^v/, "");
        if (!isCancelled && releaseVersion && releaseVersion.localeCompare(String(currentVersion), void 0, {
          numeric: true
        }) > 0) {
          setUpdateAvailable({
            version: releaseVersion,
            url: githubData.html_url || "https://github.com/nmediastudio/flowstudio-releases/releases"
          });
        }
      } catch {
      }
    };
    checkForUpdates();
    const intervalId = setInterval(checkForUpdates, 18e5);
    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, []);
  const handleOpenProject = async (projectId) => {
    const loadedProject = await getProjectById(projectId);
    if (loadedProject) {
      loadProjectFromList(loadedProject);
    }
  };
  const handleDuplicateProject = async (event, projectId) => {
    event.stopPropagation();
    await duplicateProject(projectId);
    await refreshProjects();
  };
  const handleDeleteProject = async (event, projectId) => {
    event.stopPropagation();
    if (window.confirm("\xBFSeguro que deseas eliminar este proyecto de forma permanente?")) {
      await deleteProject(projectId);
      await refreshProjects();
    }
  };
  const handleDeleteRender = async (event, filename) => {
    event.stopPropagation();
    if (window.confirm("\xBFDeseas eliminar este video exportado del almacenamiento local?")) {
      try {
        await fetch("http://127.0.0.1:4322/api/renders/" + encodeURIComponent(filename), {
          method: "DELETE"
        }).catch(() => fetch("/api/renders/" + encodeURIComponent(filename), {
          method: "DELETE"
        }));
        await refreshRenders();
      } catch (error) {
        console.error("Error eliminando render:", error);
      }
    }
  };
  const handleCancelRender = async (event, jobId) => {
    event.stopPropagation();
    try {
      await fetch("http://127.0.0.1:4322/api/render-cancel/" + encodeURIComponent(jobId), {
        method: "POST"
      }).catch(() => fetch("/api/render-cancel/" + encodeURIComponent(jobId), {
        method: "POST"
      }));
      await refreshRenders();
    } catch (error) {
      console.error("Error cancelando render:", error);
    }
  };
  const handleOpenGoogleFlow = () => {
    var electronApiTemp3;
    if ((electronApiTemp3 = window.electronAPI) != null && electronApiTemp3.openGoogleFlow) {
      window.electronAPI.openGoogleFlow();
    }
  };
  const handleExportToCapCut = async (event, projectId) => {
    event.stopPropagation();
    try {
      const project2 = await getProjectById(projectId);
      if (!project2) {
        alert("No se pudo cargar el proyecto para exportar.");
        return;
      }
      const resultData = await (await fetch("http://127.0.0.1:4322/api/export/capcut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          project: project2
        })
      })).json();
      if (resultData.ok) {
        alert("\u2705 \xA1Borrador exportado con \xE9xito a CapCut Desktop!\n\nProyecto: " + resultData.projectName + "\nUbicaci\xF3n: " + resultData.projectDir);
      } else {
        alert("\u26A0\uFE0F " + (resultData.error || "No se pudo exportar a CapCut"));
      }
    } catch (error) {
      alert("Error exportando a CapCut: " + error.message);
    }
  };
  const handleCopyHwid = () => {
    if (hwid) {
      navigator.clipboard.writeText(hwid);
      setHwidCopied(true);
      setTimeout(() => setHwidCopied(false), 2e3);
    }
  };
  const filteredProjects = projects.filter((project2) => {
    const matchesSearch = project2.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = formatFilter === "all" || project2.format === formatFilter;
    return matchesSearch && matchesFormat;
  });
  const filteredRenders = renders.filter((render) => (render.title || render.filename || "").toLowerCase().includes(searchQuery.toLowerCase()));
  const licenseStatus = getLicenseStatus();
  return /* @__PURE__ */ jsxs("div", { className: "fs-dashboard", children: [
    /* @__PURE__ */ jsxs("header", { className: "fs-dash-header", children: [
      /* @__PURE__ */ jsxs("div", { className: "fs-brand-group", children: [
        /* @__PURE__ */ jsx("div", { className: "fs-brand-logo", children: "FT" }),
        /* @__PURE__ */ jsxs("div", { className: "fs-brand-text", children: [
          /* @__PURE__ */ jsx("h1", { children: "FLOWSTUDIO" }),
          /* @__PURE__ */ jsx("p", { children: "Studio Command Hub \xB7 Edici\xF3n IA & Video Automatizado" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "fs-dash-actions", children: [
        /* @__PURE__ */ jsxs("div", { className: "fs-user-pill-container", ref: userPopoverRef, children: [
          /* @__PURE__ */ jsxs("div", { className: "fs-user-pill", onClick: () => setIsUserPopoverOpen(!isUserPopoverOpen), title: "Ver estado de tu licencia y cuenta", children: [
            /* @__PURE__ */ jsx("div", { className: "fs-user-avatar", children: ((authUser == null ? void 0 : authUser.username) || "C")[0].toUpperCase() }),
            /* @__PURE__ */ jsxs("div", { className: "fs-user-meta", children: [
              /* @__PURE__ */ jsx("span", { className: "fs-user-name", children: (authUser == null ? void 0 : authUser.username) || "Creador VIP" }),
              /* @__PURE__ */ jsxs("span", { className: "fs-user-badge", children: [
                licenseStatus.icon,
                " ",
                licenseStatus.planBadge
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "fs-user-indicator", style: {
              background: licenseStatus.accentColor,
              boxShadow: "0 0 8px " + licenseStatus.accentColor
            } })
          ] }),
          isUserPopoverOpen && /* @__PURE__ */ jsxs("div", { className: "fs-user-popover", children: [
            /* @__PURE__ */ jsxs("div", { className: "fs-popover-header", children: [
              /* @__PURE__ */ jsx("div", { className: "fs-popover-avatar", children: ((authUser == null ? void 0 : authUser.username) || "C")[0].toUpperCase() }),
              /* @__PURE__ */ jsxs("div", { className: "fs-popover-info", children: [
                /* @__PURE__ */ jsx("h4", { children: (authUser == null ? void 0 : authUser.username) || "Creador VIP" }),
                /* @__PURE__ */ jsx("span", { style: {
                  color: licenseStatus.accentColor
                }, children: licenseStatus.planTitle })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "fs-popover-row", children: [
              /* @__PURE__ */ jsx("span", { children: "Estado:" }),
              /* @__PURE__ */ jsx("strong", { style: {
                color: licenseStatus.accentColor
              }, children: licenseStatus.timeRemainingText })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "fs-popover-row", children: [
              /* @__PURE__ */ jsx("span", { children: "Detalle:" }),
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 11,
                color: "#94a3b8",
                textAlign: "right"
              }, children: licenseStatus.timeSubText })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "fs-popover-row", children: [
              /* @__PURE__ */ jsx("span", { children: "HWID Equipo:" }),
              /* @__PURE__ */ jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: 6
              }, children: [
                /* @__PURE__ */ jsx("strong", { style: {
                  fontSize: 10.5
                }, children: hwid ? hwid.slice(0, 16) + "..." : "Local" }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: handleCopyHwid, style: {
                  background: hwidCopied ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)",
                  border: "none",
                  color: hwidCopied ? "#86efac" : "#cbd5e1",
                  borderRadius: 4,
                  padding: "2px 6px",
                  fontSize: 10,
                  cursor: "pointer"
                }, children: hwidCopied ? "\u2713" : "\u{1F4CB}" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "fs-popover-btn", onClick: () => {
              setIsUserPopoverOpen(false);
              window.dispatchEvent(new CustomEvent("open-activation-modal", {
                detail: {
                  reason: "Administrar o cambiar clave de licencia"
                }
              }));
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "\u2699\uFE0F" }),
              /* @__PURE__ */ jsx("span", { children: "Gestionar Clave de Licencia" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "header-flow-status", children: /* @__PURE__ */ jsxs("button", { type: "button", className: "flow-connection-pill " + (flowState.connected ? "connected" : "disconnected"), onClick: () => onOpenAccountsModal ? onOpenAccountsModal() : handleOpenGoogleFlow(), title: flowState.label || "Haz clic para conectar cuenta de Google Flow", children: [
          /* @__PURE__ */ jsx("span", { className: "status-indicator-dot" }),
          /* @__PURE__ */ jsxs("div", { className: "pill-text", children: [
            /* @__PURE__ */ jsx("span", { className: "pill-title", children: flowState.connected ? "Google Flow Listo" : "Conectar Flow" }),
            /* @__PURE__ */ jsx("span", { className: "pill-subtitle", children: flowState.connected ? "Cuentas IA enlazadas" : "Iniciar sesi\xF3n" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "pill-action-btn", children: flowState.connected ? "Cambiar" : "Conectar" })
        ] }) }),
        updateAvailable && /* @__PURE__ */ jsxs("button", { type: "button", className: "dashboard-update-badge", onClick: () => window.dispatchEvent(new CustomEvent("open-auto-update-modal", {
          detail: updateAvailable
        })), style: {
          cursor: "pointer",
          border: "none"
        }, children: [
          "\u2728 v",
          updateAvailable.version
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "dashboard-tools-button", onClick: onOpenMaintenance, title: "Diagn\xF3stico, almacenamiento y respaldos", children: "\u{1F6E0}\uFE0F Herramientas" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "fs-kpi-strip", children: [
      /* @__PURE__ */ jsxs("div", { className: "fs-kpi-card", children: [
        /* @__PURE__ */ jsx("div", { className: "fs-kpi-icon", style: {
          background: "rgba(99, 102, 241, 0.15)",
          color: "#818cf8"
        }, children: "\u{1F3AC}" }),
        /* @__PURE__ */ jsxs("div", { className: "fs-kpi-info", children: [
          /* @__PURE__ */ jsxs("span", { className: "fs-kpi-value", children: [
            projects.length,
            " Proyectos"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "fs-kpi-label", children: "Guardados en disco local" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "fs-kpi-card", children: [
        /* @__PURE__ */ jsx("div", { className: "fs-kpi-icon", style: {
          background: "rgba(45, 212, 191, 0.15)",
          color: "#2dd4bf"
        }, children: "\u{1F39E}\uFE0F" }),
        /* @__PURE__ */ jsxs("div", { className: "fs-kpi-info", children: [
          /* @__PURE__ */ jsxs("span", { className: "fs-kpi-value", children: [
            renders.length,
            " Renders"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "fs-kpi-label", children: "Videos MP4 exportados" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "fs-kpi-card", children: [
        /* @__PURE__ */ jsx("div", { className: "fs-kpi-icon", style: {
          background: "rgba(215, 255, 79, 0.15)",
          color: "#d7ff4f"
        }, children: "\u26A1" }),
        /* @__PURE__ */ jsxs("div", { className: "fs-kpi-info", children: [
          /* @__PURE__ */ jsx("span", { className: "fs-kpi-value", children: "Remotion + FFmpeg" }),
          /* @__PURE__ */ jsx("span", { className: "fs-kpi-label", children: "Motor 8.0 H.264 Acelerado" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "fs-kpi-card", children: [
        /* @__PURE__ */ jsx("div", { className: "fs-kpi-icon", style: {
          background: "rgba(168, 85, 247, 0.15)",
          color: "#c084fc"
        }, children: "\u2702\uFE0F" }),
        /* @__PURE__ */ jsxs("div", { className: "fs-kpi-info", children: [
          /* @__PURE__ */ jsx("span", { className: "fs-kpi-value", children: "CapCut Desktop Sync" }),
          /* @__PURE__ */ jsx("span", { className: "fs-kpi-label", children: "Exportaci\xF3n nativa 1-clic" })
        ] })
      ] })
    ] }),
    ((scenesLenTemp = project == null ? void 0 : project.scenes) == null ? void 0 : scenesLenTemp.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "fs-spotlight-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "fs-spotlight-left", children: [
        /* @__PURE__ */ jsx("div", { className: "fs-spotlight-thumb", children: (firstSceneTemp1 = project.scenes[0]) != null && firstSceneTemp1.imageUrl || (firstSceneTemp2 = project.scenes[0]) != null && firstSceneTemp2.videoUrl ? /* @__PURE__ */ jsx("img", { src: project.scenes[0].imageUrl || project.scenes[0].videoUrl, alt: "Thumbnail" }) : /* @__PURE__ */ jsx("span", { children: project.format === "short" ? "\u{1F4F1}" : "\u{1F3AC}" }) }),
        /* @__PURE__ */ jsxs("div", { className: "fs-spotlight-info", children: [
          /* @__PURE__ */ jsx("h3", { children: project.title || "Proyecto en curso" }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Formato ",
              project.format === "short" ? "Vertical 9:16 (Shorts)" : "Panor\xE1mico 16:9"
            ] }),
            /* @__PURE__ */ jsx("span", { children: "\u2022" }),
            /* @__PURE__ */ jsxs("span", { children: [
              project.scenes.length,
              " escenas editables"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "fs-spotlight-btn", onClick: () => setCurrentView("editor"), children: /* @__PURE__ */ jsx("span", { children: "\u25B6\uFE0F Continuar Editando" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "fs-section-title", children: /* @__PURE__ */ jsx("span", { children: "\u26A1 Crear Nuevo Video" }) }),
    /* @__PURE__ */ jsxs("div", { className: "fs-launcher-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "fs-launch-card card-shorts", onClick: () => createNewProjectWithFormat("short"), children: [
        /* @__PURE__ */ jsxs("div", { className: "fs-launch-top", children: [
          /* @__PURE__ */ jsx("div", { className: "fs-launch-icon-badge", style: {
            background: "rgba(215, 255, 79, 0.12)",
            color: "#d7ff4f"
          }, children: "\u{1F4F1}" }),
          /* @__PURE__ */ jsx("span", { className: "fs-aspect-wireframe", style: {
            background: "rgba(215, 255, 79, 0.12)",
            color: "#d7ff4f"
          }, children: "9:16" })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "Short Vertical" }),
        /* @__PURE__ */ jsx("p", { children: "Ideal para YouTube Shorts, TikTok y Reels con subt\xEDtulos virales autom\xE1ticos." }),
        /* @__PURE__ */ jsxs("div", { className: "fs-launch-footer", children: [
          /* @__PURE__ */ jsx("span", { children: "Comenzar en blanco" }),
          /* @__PURE__ */ jsx("span", { children: "\u2192" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "fs-launch-card card-yt", onClick: () => createNewProjectWithFormat("youtube"), children: [
        /* @__PURE__ */ jsxs("div", { className: "fs-launch-top", children: [
          /* @__PURE__ */ jsx("div", { className: "fs-launch-icon-badge", style: {
            background: "rgba(99, 102, 241, 0.12)",
            color: "#818cf8"
          }, children: "\u{1F3AC}" }),
          /* @__PURE__ */ jsx("span", { className: "fs-aspect-wireframe", style: {
            background: "rgba(99, 102, 241, 0.12)",
            color: "#818cf8"
          }, children: "16:9" })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "Video Panor\xE1mico" }),
        /* @__PURE__ */ jsx("p", { children: "Para YouTube, documentales, narrativas cinem\xE1ticas y videos explicativos." }),
        /* @__PURE__ */ jsxs("div", { className: "fs-launch-footer", children: [
          /* @__PURE__ */ jsx("span", { children: "Comenzar en blanco" }),
          /* @__PURE__ */ jsx("span", { children: "\u2192" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "fs-launch-card card-wizard", onClick: () => setIsAssistantModalOpen(true), children: [
        /* @__PURE__ */ jsxs("div", { className: "fs-launch-top", children: [
          /* @__PURE__ */ jsx("div", { className: "fs-launch-icon-badge", style: {
            background: "rgba(45, 212, 191, 0.12)",
            color: "#2dd4bf"
          }, children: "\u{1FA84}" }),
          /* @__PURE__ */ jsx("span", { className: "fs-aspect-wireframe", style: {
            background: "rgba(45, 212, 191, 0.12)",
            color: "#2dd4bf"
          }, children: "AI WIZARD" })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "Asistente Guiado" }),
        /* @__PURE__ */ jsx("p", { children: "Crea un video completo con IA paso a paso a partir de un tema o guion." }),
        /* @__PURE__ */ jsxs("div", { className: "fs-launch-footer", children: [
          /* @__PURE__ */ jsx("span", { children: "Abrir asistente" }),
          /* @__PURE__ */ jsx("span", { children: "\u2192" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "fs-launch-card card-thumb", onClick: () => setCurrentView("thumbnails"), children: [
        /* @__PURE__ */ jsxs("div", { className: "fs-launch-top", children: [
          /* @__PURE__ */ jsx("div", { className: "fs-launch-icon-badge", style: {
            background: "rgba(245, 158, 11, 0.12)",
            color: "#f59e0b"
          }, children: "\u{1F3A8}" }),
          /* @__PURE__ */ jsx("span", { className: "fs-aspect-wireframe", style: {
            background: "rgba(245, 158, 11, 0.12)",
            color: "#f59e0b"
          }, children: "CTR BOOST" })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "Thumbnail Studio" }),
        /* @__PURE__ */ jsx("p", { children: "Genera 4 miniaturas virales con an\xE1lisis de visi\xF3n artificial y alto CTR." }),
        /* @__PURE__ */ jsxs("div", { className: "fs-launch-footer", children: [
          /* @__PURE__ */ jsx("span", { children: "Abrir estudio" }),
          /* @__PURE__ */ jsx("span", { children: "\u2192" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "fs-explorer-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "fs-explorer-nav", children: [
        /* @__PURE__ */ jsxs("div", { className: "fs-nav-tabs", children: [
          /* @__PURE__ */ jsxs("button", { type: "button", className: "fs-tab-btn " + (activeTab === "projects" ? "active" : ""), onClick: () => setActiveTab("projects"), children: [
            /* @__PURE__ */ jsx("span", { children: "\u{1F4C1} Mis Proyectos" }),
            /* @__PURE__ */ jsx("span", { className: "fs-tab-count", children: projects.length })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "button", className: "fs-tab-btn " + (activeTab === "renders" ? "active" : ""), onClick: () => {
            setActiveTab("renders");
            refreshRenders();
          }, children: [
            /* @__PURE__ */ jsx("span", { children: "\u{1F39E}\uFE0F Renders & Exportaciones" }),
            /* @__PURE__ */ jsx("span", { className: "fs-tab-count", children: renders.length })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "fs-nav-controls", children: [
          activeTab === "projects" && /* @__PURE__ */ jsxs("div", { className: "fs-filter-pills", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "fs-filter-pill " + (formatFilter === "all" ? "active" : ""), onClick: () => setFormatFilter("all"), children: "Todos" }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "fs-filter-pill " + (formatFilter === "short" ? "active" : ""), onClick: () => setFormatFilter("short"), children: "\u{1F4F1} 9:16 Shorts" }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "fs-filter-pill " + (formatFilter === "youtube" ? "active" : ""), onClick: () => setFormatFilter("youtube"), children: "\u{1F3AC} 16:9 Cine" })
          ] }),
          activeTab === "renders" && ((electronApiTemp = window.electronAPI) == null ? void 0 : electronApiTemp.openRendersFolder) && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => window.electronAPI.openRendersFolder(), style: {
            background: "rgba(168, 85, 247, 0.15)",
            border: "1px solid rgba(168, 85, 247, 0.35)",
            color: "#e9d5ff",
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 11.5,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6
          }, children: "\u{1F4C2} Abrir Carpeta" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
            if (activeTab === "projects") {
              refreshProjects();
            } else {
              refreshRenders();
            }
          }, style: {
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#94a3b8",
            padding: "6px 10px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 4
          }, title: "Actualizar lista", children: "\u{1F504}" }),
          /* @__PURE__ */ jsxs("div", { className: "fs-search-input-box", children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 13,
              marginRight: 6,
              opacity: 0.6
            }, children: "\u{1F50D}" }),
            /* @__PURE__ */ jsx("input", { type: "text", placeholder: activeTab === "projects" ? "Buscar proyectos..." : "Buscar videos...", value: searchQuery, onChange: (event) => setSearchQuery(event.target.value) }),
            searchQuery && /* @__PURE__ */ jsx("button", { onClick: () => setSearchQuery(""), style: {
              background: "none",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: 12
            }, children: "\u2715" })
          ] })
        ] })
      ] }),
      activeTab === "projects" ? isLoadingProjects ? /* @__PURE__ */ jsxs("div", { className: "dashboard-loading", children: [
        /* @__PURE__ */ jsx("span", { className: "working", style: {
          width: 28,
          height: 28,
          borderWidth: 3
        } }),
        /* @__PURE__ */ jsx("p", { children: "Cargando proyectos locales..." })
      ] }) : filteredProjects.length > 0 ? /* @__PURE__ */ jsx("div", { className: "fs-pro-grid", children: filteredProjects.map((project2) => /* @__PURE__ */ jsxs("div", { className: "fs-pro-card", onClick: () => handleOpenProject(project2.id), children: [
        /* @__PURE__ */ jsxs("div", { className: "fs-pro-thumb-container", children: [
          project2.thumbnailUrl ? /* @__PURE__ */ jsx("img", { src: project2.thumbnailUrl, alt: project2.title, className: "fs-pro-thumb-img" }) : /* @__PURE__ */ jsxs("div", { className: "fs-pro-placeholder", children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 28
            }, children: project2.format === "short" ? "\u{1F4F1}" : "\u{1F3AC}" }),
            /* @__PURE__ */ jsx("span", { style: {
              fontSize: 11,
              fontWeight: 700
            }, children: project2.format === "short" ? "Vertical 9:16" : "Cine 16:9" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "fs-pro-format-badge " + project2.format, children: project2.format === "short" ? "9:16 Short" : "16:9 YouTube" }),
          /* @__PURE__ */ jsxs("span", { className: "fs-pro-scenes-badge", children: [
            "\u{1F3AC} ",
            project2.scenesCount || 0,
            " escenas"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "fs-pro-card-content", children: [
          /* @__PURE__ */ jsx("h4", { className: "fs-pro-title", title: project2.title, children: project2.title }),
          /* @__PURE__ */ jsxs("div", { className: "fs-pro-meta", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "\u{1F4C5} ",
              new Date(project2.updatedAt).toLocaleDateString([], {
                month: "short",
                day: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsx("span", { children: "\u2022" }),
            /* @__PURE__ */ jsx("span", { children: project2.visualStyle || "Anime" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "fs-pro-actions", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "fs-btn-edit", onClick: (event) => {
              event.stopPropagation();
              handleOpenProject(project2.id);
            }, title: "Abrir en editor Studio 5", children: "\u25B6\uFE0F Abrir Editor" }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "fs-btn-capcut", onClick: (event) => handleExportToCapCut(event, project2.id), title: "Exportar borrador a CapCut Desktop", children: "\u2702\uFE0F CapCut" }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "fs-btn-icon", onClick: (event) => handleDuplicateProject(event, project2.id), title: "Duplicar proyecto", children: "\u{1F4D1}" }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "fs-btn-icon danger", onClick: (event) => handleDeleteProject(event, project2.id), title: "Eliminar proyecto", children: "\u{1F5D1}\uFE0F" })
          ] })
        ] })
      ] }, project2.id)) }) : /* @__PURE__ */ jsxs("div", { className: "fs-empty-state", children: [
        /* @__PURE__ */ jsx("div", { className: "fs-empty-icon", children: "\u2728" }),
        /* @__PURE__ */ jsx("h3", { children: "Empieza tu primer video con IA" }),
        /* @__PURE__ */ jsx("p", { children: "Elige un formato vertical para Shorts/TikTok o panor\xE1mico para YouTube y deja que la IA organice el ritmo." }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          gap: 12
        }, children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "fs-spotlight-btn", onClick: () => setIsAssistantModalOpen(true), children: "\u{1FA84} Asistente R\xE1pido" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "fs-btn-edit", style: {
            padding: "0 18px",
            height: 38
          }, onClick: () => createNewProjectWithFormat("short"), children: "+ Short 9:16 en Blanco" })
        ] })
      ] }) : isLoadingRenders ? /* @__PURE__ */ jsxs("div", { className: "dashboard-loading", children: [
        /* @__PURE__ */ jsx("span", { className: "working", style: {
          width: 28,
          height: 28,
          borderWidth: 3
        } }),
        /* @__PURE__ */ jsx("p", { children: "Cargando lista de renders..." })
      ] }) : filteredRenders.length > 0 ? /* @__PURE__ */ jsx("div", { className: "fs-pro-grid", children: filteredRenders.map((render, index) => {
        var electronApiTemp4;
        const isRendering = render.status === "rendering" || render.status === "preparing";
        return /* @__PURE__ */ jsxs("div", { className: "fs-pro-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "fs-pro-thumb-container", children: [
            isRendering ? /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 8
            }, children: [
              /* @__PURE__ */ jsx("span", { className: "working", style: {
                width: 24,
                height: 24,
                borderWidth: 3
              } }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontSize: 11,
                color: "#818cf8",
                fontWeight: 700
              }, children: [
                render.progress || 10,
                "%"
              ] })
            ] }) : /* @__PURE__ */ jsx("video", { src: render.url, preload: "metadata", style: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            } }),
            /* @__PURE__ */ jsx("span", { className: "fs-pro-format-badge " + (isRendering ? "short" : "youtube"), children: isRendering ? "\u23F3 Procesando" : "\u2705 Listo" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "fs-pro-card-content", children: [
            /* @__PURE__ */ jsx("h4", { className: "fs-pro-title", title: render.title || render.filename, children: render.title || render.filename }),
            /* @__PURE__ */ jsxs("div", { className: "fs-pro-meta", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "\u{1F4E6} ",
                render.sizeFormatted || "MP4"
              ] }),
              /* @__PURE__ */ jsx("span", { children: "\u2022" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "\u{1F4C5} ",
                new Date(render.createdAt).toLocaleDateString([], {
                  month: "short",
                  day: "numeric"
                })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "fs-pro-actions", children: isRendering ? /* @__PURE__ */ jsx("button", { type: "button", className: "fs-btn-icon danger", onClick: (event) => handleCancelRender(event, render.jobId), style: {
              width: "100%",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700
            }, children: "\u{1F6D1} Cancelar Render" }) : /* @__PURE__ */ jsxs(jsx2.Fragment, { children: [
              ((electronApiTemp4 = window.electronAPI) == null ? void 0 : electronApiTemp4.revealMediaInFolder) && /* @__PURE__ */ jsx("button", { type: "button", className: "fs-btn-edit", onClick: () => window.electronAPI.revealMediaInFolder(render.url), title: "Mostrar archivo en el Explorador de Windows", children: "\u{1F4C2} En Carpeta" }),
              /* @__PURE__ */ jsx("a", { href: render.url, download: true, className: "fs-btn-icon", title: "Descargar archivo MP4", style: {
                textDecoration: "none"
              }, children: "\u2B07\uFE0F" }),
              /* @__PURE__ */ jsx("button", { type: "button", className: "fs-btn-icon danger", onClick: (event) => handleDeleteRender(event, render.filename), title: "Eliminar del almacenamiento", children: "\u{1F5D1}\uFE0F" })
            ] }) })
          ] })
        ] }, render.jobId || render.filename || index);
      }) }) : /* @__PURE__ */ jsxs("div", { className: "fs-empty-state", children: [
        /* @__PURE__ */ jsx("div", { className: "fs-empty-icon", children: "\u{1F39E}\uFE0F" }),
        /* @__PURE__ */ jsx("h3", { children: "A\xFAn no has exportado videos" }),
        /* @__PURE__ */ jsx("p", { children: "Cuando renderices un proyecto, tus videos MP4 aparecer\xE1n autom\xE1ticamente aqu\xED con acceso directo para abrirlos en Windows o descargarlos." }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "fs-spotlight-btn", onClick: () => setActiveTab("projects"), children: "\u{1F4C1} Ver Mis Proyectos" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Ce, { isOpen: isAssistantModalOpen, onClose: () => {
      setIsAssistantModalOpen(false);
      refreshProjects();
    } })
  ] });
};
export {
  Ae as Dashboard
};
