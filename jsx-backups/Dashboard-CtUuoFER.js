import { r as React, j as jsx } from "./vendor-react-BbRiLirl.js";
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
  const [isCreating, setIsCreating] = React.useState(!1);
  const [audioFile, setAudioFile] = React.useState(null);
  const setCurrentView = useStore(state => state.setCurrentView);
  const setProject = useStore(state => state.setProject);
  if (!isOpen) {
    return null;
  }
  const handleCreateFromScript = async () => {
    var firstLineTemp;
    if (scriptText.trim()) {
      setIsCreating(!0);
      try {
        const lines = scriptText.split(/\r?\n|\.(?=\s+[A-ZÁÉÍÓÚÑ¿¡]|$)/).map(line => line.trim().replace(/^[-•*0-9.]+\s*/, "")).filter(line => line.length > 5);
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
          hasCharacter: !0,
          isStockMotion: !1,
          status: "idle"
        }));
        const newProject = createProject({
          ...EMPTY_PROJECT,
          id: crypto.randomUUID(),
          title: ((firstLineTemp = finalLines[0]) == null ? undefined : firstLineTemp.slice(0, 40)) || (format === "short" ? "Nuevo Short con Guion" : "Nuevo Video con Guion"),
          format: format,
          visualStyle: visualStyle,
          scenes: scenes,
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
        setIsCreating(!1);
      }
    }
  };
  const handleLoadDemo = async () => {
    setIsCreating(!0);
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
        hasCharacter: !0,
        status: "idle"
      }, {
        id: crypto.randomUUID(),
        title: "Escena 2: Automatización",
        prompt: "High tech AI brain processing glowing data streams, golden particles, digital universe visualization, dramatic lighting, 2D comic anime style",
        caption: "Es tener un sistema inteligente que trabaje contigo.",
        duration: 4.5,
        motion: "pan-right",
        imageUrl: "",
        videoUrl: "",
        videoModel: "veo-3.1-lite",
        hasCharacter: !1,
        status: "idle"
      }, {
        id: crypto.randomUUID(),
        title: "Escena 3: Multiplicación",
        prompt: "Multiple digital video screens floating in space showing colorful animations, engaging storytelling, viral content reach, neon aesthetic",
        caption: "Genera imágenes, movimiento y subtítulos en minutos.",
        duration: 4,
        motion: "gentle-zoom-out",
        imageUrl: "",
        videoUrl: "",
        videoModel: "veo-3.1-lite",
        hasCharacter: !1,
        status: "idle"
      }, {
        id: crypto.randomUUID(),
        title: "Escena 4: Conclusión",
        prompt: "Confident content creator holding a glowing digital trophy, neon city skyline in the background, victorious atmosphere, epic art style",
        caption: "Empieza hoy mismo con FLOWSTUDIO.",
        duration: 4.5,
        motion: "gentle-zoom-in",
        imageUrl: "",
        videoUrl: "",
        videoModel: "veo-3.1-lite",
        hasCharacter: !0,
        status: "idle"
      }];
      const newProject = createProject({
        ...EMPTY_PROJECT,
        id: crypto.randomUUID(),
        title: "Proyecto Demo · El Secreto Viral",
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
      setIsCreating(!1);
    }
  };
  const handleCreateBlank = async (format = "short") => {
    const newProject = createProject({
      ...EMPTY_PROJECT,
      id: crypto.randomUUID(),
      title: format === "short" ? "Nuevo Short 9:16" : "Nuevo Video 16:9",
      format: format,
      visualStyle: visualStyle,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    setProject(newProject);
    await saveProject(newProject);
    setCurrentView("editor");
    onClose();
  };
  return <div style={{
    position: "fixed",
    inset: 0,
    zIndex: 12000,
    background: "rgba(3, 5, 12, 0.82)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }} onClick={event => {
    if (event.target === event.currentTarget && !isCreating) {
      onClose();
    }
  }}><div style={{
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
    }}><div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24
      }}><div><div style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: "#818cf8",
            textTransform: "uppercase"
          }}>ASISTENTE AUTOMÁTICO</div><h2 style={{
            fontSize: 22,
            fontWeight: 800,
            margin: "4px 0 0",
            color: "#fff"
          }}>{step === "select-mode" ? "¿Cómo deseas crear tu video?" : step === "script-input" ? "Pega tu Guion o Idea" : "Sube tu Audio"}</h2></div><button onClick={onClose} style={{
          background: "transparent",
          border: "none",
          color: "#94a3b8",
          fontSize: 20,
          cursor: "pointer",
          padding: 4
        }}>✕</button></div>{step === "select-mode" && <div><div style={{
          marginBottom: 22
        }}><label style={{
            display: "block",
            fontSize: 12,
            fontWeight: 700,
            color: "#94a3b8",
            marginBottom: 8
          }}>Formato del Video:</label><div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10
          }}><button type="button" onClick={() => setFormat("short")} style={{
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
            }}><span style={{
                fontSize: 22
              }}>📱</span><div><strong style={{
                  display: "block",
                  fontSize: 13
                }}>Vertical 9:16</strong><small style={{
                  color: "#94a3b8",
                  fontSize: 11
                }}>Shorts, TikToks & Reels</small></div></button><button type="button" onClick={() => setFormat("youtube")} style={{
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
            }}><span style={{
                fontSize: 22
              }}>🎬</span><div><strong style={{
                  display: "block",
                  fontSize: 13
                }}>Horizontal 16:9</strong><small style={{
                  color: "#94a3b8",
                  fontSize: 11
                }}>YouTube Largo & Documental</small></div></button></div></div><div style={{
          display: "grid",
          gap: 12,
          marginBottom: 20
        }}><div onClick={() => setStep("script-input")} style={{
            background: "linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(6, 182, 212, 0.1))",
            border: "1px solid rgba(99, 102, 241, 0.35)",
            borderRadius: 14,
            padding: "16px 20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s ease"
          }}><div style={{
              display: "flex",
              alignItems: "center",
              gap: 14
            }}><div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(99, 102, 241, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22
              }}>✍️</div><div><strong style={{
                  fontSize: 14,
                  color: "#fff",
                  display: "block"
                }}>Crear a partir de un Guion o Texto (Recomendado)</strong><span style={{
                  fontSize: 12,
                  color: "#94a3b8"
                }}>Pega tu historia y la app dividirá las escenas automáticamente.</span></div></div><span style={{
              fontSize: 18,
              color: "#818cf8"
            }}>→</span></div><div onClick={handleLoadDemo} style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            padding: "16px 20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s"
          }}><div style={{
              display: "flex",
              alignItems: "center",
              gap: 14
            }}><div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(245, 158, 11, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22
              }}>✨</div><div><strong style={{
                  fontSize: 14,
                  color: "#fff",
                  display: "block"
                }}>Cargar Proyecto Demo Listo</strong><span style={{
                  fontSize: 12,
                  color: "#94a3b8"
                }}>Explora un video preconfigurado con 4 escenas listas para renderizar.</span></div></div><span style={{
              fontSize: 18,
              color: "#94a3b8"
            }}>→</span></div><div onClick={() => handleCreateBlank(format)} style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 14,
            padding: "14px 20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}><div style={{
              display: "flex",
              alignItems: "center",
              gap: 14
            }}><div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18
              }}>⚡</div><div><strong style={{
                  fontSize: 13,
                  color: "#e2e8f0",
                  display: "block"
                }}>Empezar Proyecto en Blanco</strong><span style={{
                  fontSize: 11.5,
                  color: "#64748b"
                }}>Crea tus escenas de forma manual desde el editor.</span></div></div><span style={{
              fontSize: 16,
              color: "#64748b"
            }}>→</span></div></div></div>}{step === "script-input" && <div><p style={{
          fontSize: 13,
          color: "#94a3b8",
          marginBottom: 14,
          lineHeight: 1.5
        }}>Escribe o pega el texto de tu video. Cada punto o párrafo creará una nueva escena en tu línea de tiempo:</p><textarea autoFocus={!0} value={scriptText} onChange={event => setScriptText(event.target.value)} placeholder="Ejemplo:\nEl secreto de la disciplina no es la motivación.\nLa verdadera disciplina es actuar cuando no tienes ganas.\nPequeños hábitos diarios construyen grandes imperios.\nEmpieza hoy con 15 minutos al día." rows={6} style={{
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
        }} /><div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}><button type="button" onClick={() => setStep("select-mode")} style={{
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            fontSize: 13,
            cursor: "pointer"
          }}>← Volver</button><button type="button" disabled={!scriptText.trim() || isCreating} onClick={handleCreateFromScript} style={{
            padding: "12px 24px",
            background: scriptText.trim() ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: 12,
            color: scriptText.trim() ? "#fff" : "#64748b",
            fontSize: 14,
            fontWeight: 800,
            cursor: scriptText.trim() ? "pointer" : "not-allowed",
            boxShadow: scriptText.trim() ? "0 4px 15px rgba(79, 70, 229, 0.4)" : "none"
          }}>{isCreating ? "Creando Escenas..." : "⚡ Generar Proyecto Automático"}</button></div></div>}</div></div>;
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
  const [isLoadingProjects, setIsLoadingProjects] = React.useState(!0);
  const [isLoadingRenders, setIsLoadingRenders] = React.useState(!1);
  const [updateAvailable, setUpdateAvailable] = React.useState(null);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = React.useState(!1);
  const [isUserPopoverOpen, setIsUserPopoverOpen] = React.useState(!1);
  const [hwid, setHwid] = React.useState("Detectando...");
  const [hwidCopied, setHwidCopied] = React.useState(!1);
  const userPopoverRef = React.useRef(null);
  const authUser = useStore(state => state.authUser);
  const flowState = useStore(state => state.flowState);
  const setCurrentView = useStore(state => state.setCurrentView);
  const createNewProjectWithFormat = useStore(state => state.createNewProjectWithFormat);
  const loadProjectFromList = useStore(state => state.loadProjectFromList);
  const project = useStore(state => state.project);
  const getLicenseStatus = () => {
    if (!authUser || authUser.role === "guest" || authUser.isLicensed === !1) {
      return {
        isLicensed: !1,
        planTitle: "Modo Exploración (Prueba)",
        planBadge: "Invitado · Sin Activar",
        statusType: "guest",
        timeRemainingText: "Funciones IA Bloqueadas",
        timeSubText: "Activa tu licencia VIP para generar imágenes, audios y videos ilimitados.",
        accentColor: "#f59e0b",
        bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.05) 100%)",
        borderColor: "rgba(245, 158, 11, 0.35)",
        icon: "⚡"
      };
    }
    if (authUser.role === "admin") {
      return {
        isLicensed: !0,
        planTitle: "Administrador Master",
        planBadge: "Acceso Ilimitado",
        statusType: "admin",
        timeRemainingText: "♾️ Licencia Vitalicia Permanente",
        timeSubText: "Acceso maestro de administración y desarrollo.",
        accentColor: "#ef4444",
        bgGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.14) 0%, rgba(185, 28, 28, 0.05) 100%)",
        borderColor: "rgba(239, 68, 68, 0.35)",
        icon: "👑"
      };
    }
    const planName = authUser.licensePlan || authUser.plan || "Creator Pro";
    const expiresAt = authUser.licenseExpiresAt || authUser.expiresAt || null;
    if (!expiresAt || String(planName).toLowerCase().includes("lifetime") || String(planName).toLowerCase().includes("vitalici") || String(planName).toLowerCase().includes("vip")) {
      return {
        isLicensed: !0,
        planTitle: planName.toLowerCase().includes("lifetime") ? planName : "Plan Lifetime VIP",
        planBadge: "De por vida · Permanente",
        statusType: "lifetime",
        timeRemainingText: "♾️ Acceso Permanente de por Vida",
        timeSubText: "Tu licencia nunca caduca. Todas las actualizaciones y funciones incluidas.",
        accentColor: "#d7ff4f",
        bgGradient: "linear-gradient(135deg, rgba(215, 255, 79, 0.14) 0%, rgba(16, 185, 129, 0.08) 100%)",
        borderColor: "rgba(215, 255, 79, 0.35)",
        icon: "👑"
      };
    }
    const expiryDate = new Date(expiresAt);
    const msRemaining = expiryDate.getTime() - Date.now();
    const daysRemaining = Math.ceil(msRemaining / 86400000);
    const isExpired = daysRemaining <= 0;
    const formattedDate = expiryDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    return {
      isLicensed: !isExpired,
      planTitle: "Plan " + planName,
      planBadge: isExpired ? "Suscripción Expirada" : daysRemaining + " día" + (daysRemaining === 1 ? "" : "s") + " restantes",
      statusType: isExpired ? "expired" : "active",
      timeRemainingText: isExpired ? "⚠️ Tu suscripción ha vencido" : "⏱️ Quedan " + daysRemaining + " día" + (daysRemaining === 1 ? "" : "s") + " (" + formattedDate + ")",
      timeSubText: isExpired ? "Renueva tu licencia para continuar usando la suite con IA." : "Tu suscripción mensual vence el " + formattedDate + ".",
      accentColor: isExpired ? "#ef4444" : daysRemaining <= 5 ? "#f59e0b" : "#38bdf8",
      bgGradient: isExpired ? "linear-gradient(135deg, rgba(239, 68, 68, 0.14) 0%, rgba(185, 28, 28, 0.05) 100%)" : "linear-gradient(135deg, rgba(56, 189, 248, 0.14) 0%, rgba(99, 102, 241, 0.08) 100%)",
      borderColor: isExpired ? "rgba(239, 68, 68, 0.4)" : "rgba(56, 189, 248, 0.35)",
      icon: isExpired ? "⚠️" : "🚀"
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
      setIsLoadingProjects(!0);
      const projectsPromise = listProjects();
      const timeoutPromise = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Timeout al consultar proyectos de IndexedDB")), 3500));
      const raceResult = await Promise.race([projectsPromise, timeoutPromise]);
      if (Array.isArray(raceResult) && raceResult.length > 0) {
        setProjects(raceResult);
      } else {
        const currentProject = useStore.getState().project;
        if (currentProject != null && currentProject.id && ((scenesLenTemp1 = currentProject == null ? undefined : currentProject.scenes) == null ? undefined : scenesLenTemp1.length) > 0) {
          setProjects([{
            id: currentProject.id,
            title: currentProject.title || "Proyecto actual",
            format: currentProject.format || "short",
            visualStyle: currentProject.visualStyle || "western-anime",
            scenesCount: currentProject.scenes.length,
            thumbnailUrl: ((firstSceneImgTemp1 = (firstSceneTemp3 = currentProject.scenes) == null ? undefined : firstSceneTemp3[0]) == null ? undefined : firstSceneImgTemp1.imageUrl) || ((firstSceneVidTemp1 = (firstSceneTemp4 = currentProject.scenes) == null ? undefined : firstSceneTemp4[0]) == null ? undefined : firstSceneVidTemp1.videoUrl) || "",
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
      if (currentProject != null && currentProject.id && ((scenesLenTemp2 = currentProject == null ? undefined : currentProject.scenes) == null ? undefined : scenesLenTemp2.length) > 0) {
        setProjects([{
          id: currentProject.id,
          title: currentProject.title || "Proyecto actual",
          format: currentProject.format || "short",
          visualStyle: currentProject.visualStyle || "western-anime",
          scenesCount: currentProject.scenes.length,
          thumbnailUrl: ((firstSceneImgTemp2 = (firstSceneTemp5 = currentProject.scenes) == null ? undefined : firstSceneTemp5[0]) == null ? undefined : firstSceneImgTemp2.imageUrl) || ((firstSceneVidTemp2 = (firstSceneTemp6 = currentProject.scenes) == null ? undefined : firstSceneTemp6[0]) == null ? undefined : firstSceneVidTemp2.videoUrl) || "",
          updatedAt: currentProject.updatedAt || Date.now(),
          createdAt: currentProject.createdAt || Date.now()
        }]);
      } else {
        setProjects([]);
      }
    } finally {
      setIsLoadingProjects(!1);
    }
  };
  const refreshRenders = async () => {
    try {
      setIsLoadingRenders(!0);
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
      setIsLoadingRenders(!1);
    }
  };
  React.useEffect(() => {
    refreshProjects();
    refreshRenders();
    apiFetch("/api/auth/hwid").then(response => response.json()).then(data => {
      if (data.ok && data.hwid) {
        setHwid(data.hwid);
      }
    }).catch(() => setHwid("No disponible"));
  }, []);
  React.useEffect(() => {
    const handleClickOutside = event => {
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
    let isCancelled = !1;
    const checkForUpdates = async () => {
      var electronApiTemp2;
      var updatesTemp;
      try {
        const currentVersion = (electronApiTemp2 = window.electronAPI) != null && electronApiTemp2.getAppVersion ? await window.electronAPI.getAppVersion() : "1.8.5";
        const updatesResponse = await fetch("/api/updates").then(response => response.ok ? response.json() : null).catch(() => null);
        const latestUpdate = (updatesTemp = updatesResponse == null ? undefined : updatesResponse.updates) == null ? undefined : updatesTemp[0];
        if (latestUpdate != null && latestUpdate.version && String(latestUpdate.version).localeCompare(String(currentVersion), undefined, {
          numeric: !0
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
        if (!isCancelled && releaseVersion && releaseVersion.localeCompare(String(currentVersion), undefined, {
          numeric: true
        }) > 0) {
          setUpdateAvailable({
            version: releaseVersion,
            url: githubData.html_url || "https://github.com/nmediastudio/flowstudio-releases/releases"
          });
        }
      } catch {}
    };
    checkForUpdates();
    const intervalId = setInterval(checkForUpdates, 1800000);
    return () => {
      isCancelled = !0;
      clearInterval(intervalId);
    };
  }, []);
  const handleOpenProject = async projectId => {
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
    if (window.confirm("¿Seguro que deseas eliminar este proyecto de forma permanente?")) {
      await deleteProject(projectId);
      await refreshProjects();
    }
  };
  const handleDeleteRender = async (event, filename) => {
    event.stopPropagation();
    if (window.confirm("¿Deseas eliminar este video exportado del almacenamiento local?")) {
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
      const project = await getProjectById(projectId);
      if (!project) {
        alert("No se pudo cargar el proyecto para exportar.");
        return;
      }
      const resultData = await (await fetch("http://127.0.0.1:4322/api/export/capcut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          project: project
        })
      })).json();
      if (resultData.ok) {
        alert("✅ ¡Borrador exportado con éxito a CapCut Desktop!\n\nProyecto: " + resultData.projectName + "\nUbicación: " + resultData.projectDir);
      } else {
        alert("⚠️ " + (resultData.error || "No se pudo exportar a CapCut"));
      }
    } catch (error) {
      alert("Error exportando a CapCut: " + error.message);
    }
  };
  const handleCopyHwid = () => {
    if (hwid) {
      navigator.clipboard.writeText(hwid);
      setHwidCopied(true);
      setTimeout(() => setHwidCopied(false), 2000);
    }
  };
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = formatFilter === "all" || project.format === formatFilter;
    return matchesSearch && matchesFormat;
  });
  const filteredRenders = renders.filter(render => (render.title || render.filename || "").toLowerCase().includes(searchQuery.toLowerCase()));
  const licenseStatus = getLicenseStatus();
  return <div className="fs-dashboard"><header className="fs-dash-header"><div className="fs-brand-group"><div className="fs-brand-logo">FT</div><div className="fs-brand-text"><h1>FLOWSTUDIO</h1><p>Studio Command Hub · Edición IA & Video Automatizado</p></div></div><div className="fs-dash-actions"><div className="fs-user-pill-container" ref={userPopoverRef}><div className="fs-user-pill" onClick={() => setIsUserPopoverOpen(!isUserPopoverOpen)} title="Ver estado de tu licencia y cuenta"><div className="fs-user-avatar">{((authUser == null ? undefined : authUser.username) || "C")[0].toUpperCase()}</div><div className="fs-user-meta"><span className="fs-user-name">{(authUser == null ? undefined : authUser.username) || "Creador VIP"}</span><span className="fs-user-badge">{licenseStatus.icon} {licenseStatus.planBadge}</span></div><span className="fs-user-indicator" style={{
              background: licenseStatus.accentColor,
              boxShadow: "0 0 8px " + licenseStatus.accentColor
            }} /></div>{isUserPopoverOpen && <div className="fs-user-popover"><div className="fs-popover-header"><div className="fs-popover-avatar">{((authUser == null ? undefined : authUser.username) || "C")[0].toUpperCase()}</div><div className="fs-popover-info"><h4>{(authUser == null ? undefined : authUser.username) || "Creador VIP"}</h4><span style={{
                  color: licenseStatus.accentColor
                }}>{licenseStatus.planTitle}</span></div></div><div className="fs-popover-row"><span>Estado:</span><strong style={{
                color: licenseStatus.accentColor
              }}>{licenseStatus.timeRemainingText}</strong></div><div className="fs-popover-row"><span>Detalle:</span><span style={{
                fontSize: 11,
                color: "#94a3b8",
                textAlign: "right"
              }}>{licenseStatus.timeSubText}</span></div><div className="fs-popover-row"><span>HWID Equipo:</span><div style={{
                display: "flex",
                alignItems: "center",
                gap: 6
              }}><strong style={{
                  fontSize: 10.5
                }}>{hwid ? hwid.slice(0, 16) + "..." : "Local"}</strong><button type="button" onClick={handleCopyHwid} style={{
                  background: hwidCopied ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)",
                  border: "none",
                  color: hwidCopied ? "#86efac" : "#cbd5e1",
                  borderRadius: 4,
                  padding: "2px 6px",
                  fontSize: 10,
                  cursor: "pointer"
                }}>{hwidCopied ? "✓" : "📋"}</button></div></div><button type="button" className="fs-popover-btn" onClick={() => {
              setIsUserPopoverOpen(!1);
              window.dispatchEvent(new CustomEvent("open-activation-modal", {
                detail: {
                  reason: "Administrar o cambiar clave de licencia"
                }
              }));
            }}><span>⚙️</span><span>Gestionar Clave de Licencia</span></button></div>}</div><div className="header-flow-status"><button type="button" className={"flow-connection-pill " + (flowState.connected ? "connected" : "disconnected")} onClick={() => onOpenAccountsModal ? onOpenAccountsModal() : handleOpenGoogleFlow()} title={flowState.label || "Haz clic para conectar cuenta de Google Flow"}><span className="status-indicator-dot" /><div className="pill-text"><span className="pill-title">{flowState.connected ? "Google Flow Listo" : "Conectar Flow"}</span><span className="pill-subtitle">{flowState.connected ? "Cuentas IA enlazadas" : "Iniciar sesión"}</span></div><span className="pill-action-btn">{flowState.connected ? "Cambiar" : "Conectar"}</span></button></div>{updateAvailable && <button type="button" className="dashboard-update-badge" onClick={() => window.dispatchEvent(new CustomEvent("open-auto-update-modal", {
          detail: updateAvailable
        }))} style={{
          cursor: "pointer",
          border: "none"
        }}>✨ v{updateAvailable.version}</button>}<button type="button" className="dashboard-tools-button" onClick={onOpenMaintenance} title="Diagnóstico, almacenamiento y respaldos">🛠️ Herramientas</button></div></header><div className="fs-kpi-strip"><div className="fs-kpi-card"><div className="fs-kpi-icon" style={{
          background: "rgba(99, 102, 241, 0.15)",
          color: "#818cf8"
        }}>🎬</div><div className="fs-kpi-info"><span className="fs-kpi-value">{projects.length} Proyectos</span><span className="fs-kpi-label">Guardados en disco local</span></div></div><div className="fs-kpi-card"><div className="fs-kpi-icon" style={{
          background: "rgba(45, 212, 191, 0.15)",
          color: "#2dd4bf"
        }}>🎞️</div><div className="fs-kpi-info"><span className="fs-kpi-value">{renders.length} Renders</span><span className="fs-kpi-label">Videos MP4 exportados</span></div></div><div className="fs-kpi-card"><div className="fs-kpi-icon" style={{
          background: "rgba(215, 255, 79, 0.15)",
          color: "#d7ff4f"
        }}>⚡</div><div className="fs-kpi-info"><span className="fs-kpi-value">Remotion + FFmpeg</span><span className="fs-kpi-label">Motor 8.0 H.264 Acelerado</span></div></div><div className="fs-kpi-card"><div className="fs-kpi-icon" style={{
          background: "rgba(168, 85, 247, 0.15)",
          color: "#c084fc"
        }}>✂️</div><div className="fs-kpi-info"><span className="fs-kpi-value">CapCut Desktop Sync</span><span className="fs-kpi-label">Exportación nativa 1-clic</span></div></div></div>{((scenesLenTemp = project == null ? undefined : project.scenes) == null ? undefined : scenesLenTemp.length) > 0 && <div className="fs-spotlight-card"><div className="fs-spotlight-left"><div className="fs-spotlight-thumb">{(firstSceneTemp1 = project.scenes[0]) != null && firstSceneTemp1.imageUrl || (firstSceneTemp2 = project.scenes[0]) != null && firstSceneTemp2.videoUrl ? <img src={project.scenes[0].imageUrl || project.scenes[0].videoUrl} alt="Thumbnail" /> : <span>{project.format === "short" ? "📱" : "🎬"}</span>}</div><div className="fs-spotlight-info"><h3>{project.title || "Proyecto en curso"}</h3><p><span>Formato {project.format === "short" ? "Vertical 9:16 (Shorts)" : "Panorámico 16:9"}</span><span>•</span><span>{project.scenes.length} escenas editables</span></p></div></div><button type="button" className="fs-spotlight-btn" onClick={() => setCurrentView("editor")}><span>▶️ Continuar Editando</span></button></div>}<div className="fs-section-title"><span>⚡ Crear Nuevo Video</span></div><div className="fs-launcher-grid"><div className="fs-launch-card card-shorts" onClick={() => createNewProjectWithFormat("short")}><div className="fs-launch-top"><div className="fs-launch-icon-badge" style={{
            background: "rgba(215, 255, 79, 0.12)",
            color: "#d7ff4f"
          }}>📱</div><span className="fs-aspect-wireframe" style={{
            background: "rgba(215, 255, 79, 0.12)",
            color: "#d7ff4f"
          }}>9:16</span></div><h3>Short Vertical</h3><p>Ideal para YouTube Shorts, TikTok y Reels con subtítulos virales automáticos.</p><div className="fs-launch-footer"><span>Comenzar en blanco</span><span>→</span></div></div><div className="fs-launch-card card-yt" onClick={() => createNewProjectWithFormat("youtube")}><div className="fs-launch-top"><div className="fs-launch-icon-badge" style={{
            background: "rgba(99, 102, 241, 0.12)",
            color: "#818cf8"
          }}>🎬</div><span className="fs-aspect-wireframe" style={{
            background: "rgba(99, 102, 241, 0.12)",
            color: "#818cf8"
          }}>16:9</span></div><h3>Video Panorámico</h3><p>Para YouTube, documentales, narrativas cinemáticas y videos explicativos.</p><div className="fs-launch-footer"><span>Comenzar en blanco</span><span>→</span></div></div><div className="fs-launch-card card-wizard" onClick={() => setIsAssistantModalOpen(!0)}><div className="fs-launch-top"><div className="fs-launch-icon-badge" style={{
            background: "rgba(45, 212, 191, 0.12)",
            color: "#2dd4bf"
          }}>🪄</div><span className="fs-aspect-wireframe" style={{
            background: "rgba(45, 212, 191, 0.12)",
            color: "#2dd4bf"
          }}>AI WIZARD</span></div><h3>Asistente Guiado</h3><p>Crea un video completo con IA paso a paso a partir de un tema o guion.</p><div className="fs-launch-footer"><span>Abrir asistente</span><span>→</span></div></div><div className="fs-launch-card card-thumb" onClick={() => setCurrentView("thumbnails")}><div className="fs-launch-top"><div className="fs-launch-icon-badge" style={{
            background: "rgba(245, 158, 11, 0.12)",
            color: "#f59e0b"
          }}>🎨</div><span className="fs-aspect-wireframe" style={{
            background: "rgba(245, 158, 11, 0.12)",
            color: "#f59e0b"
          }}>CTR BOOST</span></div><h3>Thumbnail Studio</h3><p>Genera 4 miniaturas virales con análisis de visión artificial y alto CTR.</p><div className="fs-launch-footer"><span>Abrir estudio</span><span>→</span></div></div></div><div className="fs-explorer-section"><div className="fs-explorer-nav"><div className="fs-nav-tabs"><button type="button" className={"fs-tab-btn " + (activeTab === "projects" ? "active" : "")} onClick={() => setActiveTab("projects")}><span>📁 Mis Proyectos</span><span className="fs-tab-count">{projects.length}</span></button><button type="button" className={"fs-tab-btn " + (activeTab === "renders" ? "active" : "")} onClick={() => {
            setActiveTab("renders");
            refreshRenders();
          }}><span>🎞️ Renders & Exportaciones</span><span className="fs-tab-count">{renders.length}</span></button></div><div className="fs-nav-controls">{activeTab === "projects" && <div className="fs-filter-pills"><button type="button" className={"fs-filter-pill " + (formatFilter === "all" ? "active" : "")} onClick={() => setFormatFilter("all")}>Todos</button><button type="button" className={"fs-filter-pill " + (formatFilter === "short" ? "active" : "")} onClick={() => setFormatFilter("short")}>📱 9:16 Shorts</button><button type="button" className={"fs-filter-pill " + (formatFilter === "youtube" ? "active" : "")} onClick={() => setFormatFilter("youtube")}>🎬 16:9 Cine</button></div>}{activeTab === "renders" && ((electronApiTemp = window.electronAPI) == null ? undefined : electronApiTemp.openRendersFolder) && <button type="button" onClick={() => window.electronAPI.openRendersFolder()} style={{
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
          }}>📂 Abrir Carpeta</button>}<button type="button" onClick={() => {
            if (activeTab === "projects") {
              refreshProjects();
            } else {
              refreshRenders();
            }
          }} style={{
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
          }} title="Actualizar lista">🔄</button><div className="fs-search-input-box"><span style={{
              fontSize: 13,
              marginRight: 6,
              opacity: 0.6
            }}>🔍</span><input type="text" placeholder={activeTab === "projects" ? "Buscar proyectos..." : "Buscar videos..."} value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />{searchQuery && <button onClick={() => setSearchQuery("")} style={{
              background: "none",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: 12
            }}>✕</button>}</div></div></div>{activeTab === "projects" ? isLoadingProjects ? <div className="dashboard-loading"><span className="working" style={{
          width: 28,
          height: 28,
          borderWidth: 3
        }} /><p>Cargando proyectos locales...</p></div> : filteredProjects.length > 0 ? <div className="fs-pro-grid">{filteredProjects.map(project => <div className="fs-pro-card" onClick={() => handleOpenProject(project.id)} key={project.id}><div className="fs-pro-thumb-container">{project.thumbnailUrl ? <img src={project.thumbnailUrl} alt={project.title} className="fs-pro-thumb-img" /> : <div className="fs-pro-placeholder"><span style={{
                fontSize: 28
              }}>{project.format === "short" ? "📱" : "🎬"}</span><span style={{
                fontSize: 11,
                fontWeight: 700
              }}>{project.format === "short" ? "Vertical 9:16" : "Cine 16:9"}</span></div>}<span className={"fs-pro-format-badge " + project.format}>{project.format === "short" ? "9:16 Short" : "16:9 YouTube"}</span><span className="fs-pro-scenes-badge">🎬 {project.scenesCount || 0} escenas</span></div><div className="fs-pro-card-content"><h4 className="fs-pro-title" title={project.title}>{project.title}</h4><div className="fs-pro-meta"><span>📅 {new Date(project.updatedAt).toLocaleDateString([], {
                  month: "short",
                  day: "numeric"
                })}</span><span>•</span><span>{project.visualStyle || "Anime"}</span></div><div className="fs-pro-actions"><button type="button" className="fs-btn-edit" onClick={event => {
                event.stopPropagation();
                handleOpenProject(project.id);
              }} title="Abrir en editor Studio 5">▶️ Abrir Editor</button><button type="button" className="fs-btn-capcut" onClick={event => handleExportToCapCut(event, project.id)} title="Exportar borrador a CapCut Desktop">✂️ CapCut</button><button type="button" className="fs-btn-icon" onClick={event => handleDuplicateProject(event, project.id)} title="Duplicar proyecto">📑</button><button type="button" className="fs-btn-icon danger" onClick={event => handleDeleteProject(event, project.id)} title="Eliminar proyecto">🗑️</button></div></div></div>)}</div> : <div className="fs-empty-state"><div className="fs-empty-icon">✨</div><h3>Empieza tu primer video con IA</h3><p>Elige un formato vertical para Shorts/TikTok o panorámico para YouTube y deja que la IA organice el ritmo.</p><div style={{
          display: "flex",
          gap: 12
        }}><button type="button" className="fs-spotlight-btn" onClick={() => setIsAssistantModalOpen(!0)}>🪄 Asistente Rápido</button><button type="button" className="fs-btn-edit" style={{
            padding: "0 18px",
            height: 38
          }} onClick={() => createNewProjectWithFormat("short")}>+ Short 9:16 en Blanco</button></div></div> : isLoadingRenders ? <div className="dashboard-loading"><span className="working" style={{
          width: 28,
          height: 28,
          borderWidth: 3
        }} /><p>Cargando lista de renders...</p></div> : filteredRenders.length > 0 ? <div className="fs-pro-grid">{filteredRenders.map((render, index) => {
          var electronApiTemp4;
          const isRendering = render.status === "rendering" || render.status === "preparing";
          return <div className="fs-pro-card" key={render.jobId || render.filename || index}><div className="fs-pro-thumb-container">{isRendering ? <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 8
              }}><span className="working" style={{
                  width: 24,
                  height: 24,
                  borderWidth: 3
                }} /><span style={{
                  fontSize: 11,
                  color: "#818cf8",
                  fontWeight: 700
                }}>{render.progress || 10}%</span></div> : <video src={render.url} preload="metadata" style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }} />}<span className={"fs-pro-format-badge " + (isRendering ? "short" : "youtube")}>{isRendering ? "⏳ Procesando" : "✅ Listo"}</span></div><div className="fs-pro-card-content"><h4 className="fs-pro-title" title={render.title || render.filename}>{render.title || render.filename}</h4><div className="fs-pro-meta"><span>📦 {render.sizeFormatted || "MP4"}</span><span>•</span><span>📅 {new Date(render.createdAt).toLocaleDateString([], {
                    month: "short",
                    day: "numeric"
                  })}</span></div><div className="fs-pro-actions">{isRendering ? <button type="button" className="fs-btn-icon danger" onClick={event => handleCancelRender(event, render.jobId)} style={{
                  width: "100%",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700
                }}>🛑 Cancelar Render</button> : <jsx.Fragment>{((electronApiTemp4 = window.electronAPI) == null ? undefined : electronApiTemp4.revealMediaInFolder) && <button type="button" className="fs-btn-edit" onClick={() => window.electronAPI.revealMediaInFolder(render.url)} title="Mostrar archivo en el Explorador de Windows">📂 En Carpeta</button>}<a href={render.url} download={!0} className="fs-btn-icon" title="Descargar archivo MP4" style={{
                    textDecoration: "none"
                  }}>⬇️</a><button type="button" className="fs-btn-icon danger" onClick={event => handleDeleteRender(event, render.filename)} title="Eliminar del almacenamiento">🗑️</button></jsx.Fragment>}</div></div></div>;
        })}</div> : <div className="fs-empty-state"><div className="fs-empty-icon">🎞️</div><h3>Aún no has exportado videos</h3><p>Cuando renderices un proyecto, tus videos MP4 aparecerán automáticamente aquí con acceso directo para abrirlos en Windows o descargarlos.</p><button type="button" className="fs-spotlight-btn" onClick={() => setActiveTab("projects")}>📁 Ver Mis Proyectos</button></div>}</div><Ce isOpen={isAssistantModalOpen} onClose={() => {
      setIsAssistantModalOpen(!1);
      refreshProjects();
    }} /></div>;
};
export { Ae as Dashboard };