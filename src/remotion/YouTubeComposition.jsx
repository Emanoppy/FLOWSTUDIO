import { AbsoluteFill, Html5Audio, Img, Video, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";

/* =========================================================================
   CANONICAL EASING & ANIMATION HELPERS (Inspired by digbenjamins/remotion-animation)
   Rule 1: Never linear. Real motion has physics & acceleration.
   Rule 2: Animate transform & opacity only.
   ========================================================================= */

export const motionStyle = (motion, frame, duration, customMotion = null) => {
  const progress = Math.max(0, Math.min(1, frame / Math.max(1, duration - 1)));
  // Una sola curva por escena: evita que la camara frene y vuelva a arrancar
  // en cada keyframe intermedio. La velocidad llega suavemente a cero solo
  // al principio y al final de la escena.
  const smoothProgress = Easing.bezier(0.42, 0, 0.58, 1)(progress);
  const mix = (from, to, amount = smoothProgress) => from + (to - from) * amount;
  const camera = ({ scale = 1.08, x = 0, y = 0, rotation = 0 }) => ({
    scale: String(scale),
    translate: `${x}% ${y}%`,
    rotate: `${rotation}deg`,
    transformOrigin: "50% 50%"
  });

  if (motion === "custom" && customMotion) {
    let customCurve = smoothProgress;
    if (customMotion.easing === "linear") {
      customCurve = progress;
    } else if (customMotion.easing === "ease-in") {
      customCurve = Easing.in(Easing.cubic)(progress);
    } else if (customMotion.easing === "ease-out") {
      customCurve = Easing.out(Easing.cubic)(progress);
    } else if (customMotion.easing === "dramatic") {
      customCurve = Easing.bezier(0.77, 0, 0.175, 1)(progress);
    }

    const startScale = Number(customMotion.startScale ?? 1.0);
    const endScale = Number(customMotion.endScale ?? 1.15);
    const startX = Number(customMotion.startX ?? 0);
    const endX = Number(customMotion.endX ?? 0);
    const startY = Number(customMotion.startY ?? 0);
    const endY = Number(customMotion.endY ?? 0);
    const startRot = Number(customMotion.startRotation ?? 0);
    const endRot = Number(customMotion.endRotation ?? 0);

    return camera({
      scale: mix(startScale, endScale, customCurve),
      x: mix(startX, endX, customCurve),
      y: mix(startY, endY, customCurve),
      rotation: mix(startRot, endRot, customCurve)
    });
  }

  switch (motion) {
    case "zoom-out":
      return camera({ scale: mix(1.18, 1.02) });
    case "gentle-zoom-in":
      return camera({ scale: mix(1.03, 1.11) });
    case "gentle-zoom-out":
      return camera({ scale: mix(1.11, 1.03) });
    case "pan-left":
      return camera({ scale: 1.14, x: mix(4, -4) });
    case "pan-right":
      return camera({ scale: 1.14, x: mix(-4, 4) });
    case "pan-up":
      return camera({ scale: 1.14, y: mix(4, -4) });
    case "pan-down":
      return camera({ scale: 1.14, y: mix(-4, 4) });
    case "zoom-pan-top-left":
      return camera({ scale: mix(1.02, 1.18), x: mix(0, 2.5), y: mix(0, 2.5) });
    case "zoom-pan-bottom-right":
      return camera({ scale: mix(1.02, 1.18), x: mix(0, -2.5), y: mix(0, -2.5) });
    case "zoom-pan-top-right":
      return camera({ scale: mix(1.02, 1.18), x: mix(0, -2.5), y: mix(0, 2.5) });
    case "zoom-pan-bottom-left":
      return camera({ scale: mix(1.02, 1.18), x: mix(0, 2.5), y: mix(0, -2.5) });
    case "whip-zoom-in":
      return camera({ scale: mix(1.02, 1.2), y: mix(0.35, -0.2) });
    case "camera-tilt-left":
      return camera({ scale: mix(1.08, 1.15), rotation: mix(1.5, -1.5) });
    case "camera-tilt-right":
      return camera({ scale: mix(1.08, 1.15), rotation: mix(-1.5, 1.5) });
    case "slow-drift":
      return camera({ scale: mix(1.03, 1.07), x: mix(-1.5, 1.5), y: 0.22 * Math.sin(Math.PI * smoothProgress) });
    case "drift-left-right":
      return camera({ scale: 1.12, x: mix(-3.2, 3.2), y: -0.45 * Math.sin(Math.PI * smoothProgress) });
    case "drift-right-left":
      return camera({ scale: 1.12, x: mix(3.2, -3.2), y: 0.45 * Math.sin(Math.PI * smoothProgress) });
    case "cinematic-arc-left":
      return camera({ scale: mix(1.1, 1.15), x: mix(3.2, -3.2), y: 0.85 - 1.7 * Math.sin(Math.PI * smoothProgress), rotation: mix(0.7, -0.7) });
    case "cinematic-arc-right":
      return camera({ scale: mix(1.1, 1.15), x: mix(-3.2, 3.2), y: 0.85 - 1.7 * Math.sin(Math.PI * smoothProgress), rotation: mix(-0.7, 0.7) });
    case "soft-orbit-left": {
      const angle = Math.PI * (0.1 + 1.25 * smoothProgress);
      return camera({ scale: 1.13, x: 2.15 * Math.cos(angle), y: 1.15 * Math.sin(angle), rotation: mix(0.45, -0.45) });
    }
    case "soft-orbit-right": {
      const angle = Math.PI * (0.9 - 1.25 * smoothProgress);
      return camera({ scale: 1.13, x: 2.15 * Math.cos(angle), y: 1.15 * Math.sin(angle), rotation: mix(-0.45, 0.45) });
    }
    case "breathe": {
      const pulse = (1 - Math.cos(Math.PI * 4 * smoothProgress)) / 2;
      return camera({ scale: 1.045 + 0.025 * pulse, y: 0.16 * Math.cos(Math.PI * 4 * smoothProgress) });
    }
    case "floating": {
      const angle = Math.PI * 2 * smoothProgress;
      return camera({ scale: 1.11 + 0.008 * (1 - Math.cos(angle)), x: 0.8 * Math.sin(angle), y: 1.15 * Math.cos(angle), rotation: 0.22 * Math.sin(angle) });
    }
    case "still":
      return camera({ scale: 1.01 });
    case "zoom-in":
    default:
      return camera({ scale: mix(1.02, 1.18) });
  }
};

export const bump = (frame, at, w = 12) => {
  const c = Math.max(0, 1 - Math.abs(frame - at) / w);
  return c * c * (3 - 2 * c);
};

/* Expanding impact ring (Shockwave) */
const Shockwave = ({ localFrame, fps, color = "#d7ff4f", size = 320 }) => {
  const p = interpolate(localFrame, [0, 0.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  if (p <= 0 || p >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: "50%",
        border: `4px solid ${color}`,
        boxShadow: `0 0 30px ${color}`,
        opacity: (1 - p) * 0.85,
        transform: `scale(${0.15 + p * 1.5})`,
        pointerEvents: "none",
        zIndex: 1
      }}
    />
  );
};

/* Terminal character-by-character typewriter with blinking cursor */
const TypeText = ({ text = "", localFrame, fps, color = "#ffffff", cps = 32, fontSize = "min(5.5vh, 56px)" }) => {
  const chars = Math.max(0, Math.floor((localFrame / fps) * cps));
  const done = chars >= text.length;
  const blink = Math.floor(localFrame / (0.35 * fps)) % 2 === 0;
  return (
    <span style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize, color, whiteSpace: "pre-wrap" }}>
      {text.slice(0, chars)}
      {!done && blink ? <span style={{ color: "#d7ff4f", textShadow: "0 0 12px #d7ff4f" }}>▌</span> : null}
    </span>
  );
};

/* =========================================================================
   MOTION GRAPHICS PRESETS
   ========================================================================= */
const MotionGraphic = ({ graphic, frame, durationInFrames, fps }) => {
  const from = Math.round((Number(graphic.fromMs) || 0) * fps / 1000);
  const to = Math.min(durationInFrames, from + Math.round((Number(graphic.durationMs) || 2000) * fps / 1000));
  const local = frame - from;
  if (local < 0 || frame >= to || to <= from) return null;

  const totalFrames = to - from;
  const progress = Math.min(1, local / totalFrames);
  const accent = graphic.accentColor || "#d7ff4f";
  const text = graphic.text || "";

  // Enter/Exit opacity easing
  const enterExitOpacity = interpolate(progress, [0, 0.08, 0.9, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });

  switch (graphic.preset) {
    // 1. TÍTULO POP CINEMÁTICO CON SHOCKWAVE & SPRING OVERSHOOT
    case "title-pop": {
      const scale = spring({ frame: local, fps, config: { damping: 11, stiffness: 140, mass: 0.7 } });
      const barScaleX = interpolate(local, [2, 14], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic)
      });
      const b = bump(local, 10, 8);

      return (
        <div style={{
          position: "absolute",
          left: "6%",
          right: "6%",
          top: "34%",
          zIndex: 15,
          textAlign: "center",
          opacity: enterExitOpacity,
          transform: `scale(${(0.4 + 0.6 * scale) * (1 + b * 0.05)})`,
          fontFamily: "'Inter', sans-serif"
        }}>
          <Shockwave localFrame={local} fps={fps} color={accent} size={380} />
          <h1 style={{
            margin: 0,
            fontSize: "min(9vh, 96px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            lineHeight: 1.08,
            color: "#ffffff",
            textShadow: "0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.8)"
          }}>
            {text}
          </h1>
          <div style={{
            width: "40%",
            height: 8,
            margin: "16px auto 0",
            borderRadius: 4,
            background: accent,
            boxShadow: `0 0 24px ${accent}`,
            transformOrigin: "center",
            transform: `scaleX(${barScaleX})`
          }} />
        </div>
      );
    }

    // 2. TIPOGRAFÍA CINÉTICA / TYPEWRITER CON CURSOR
    case "kinetic-text": {
      const springCard = spring({ frame: local, fps, config: { damping: 16, stiffness: 120 } });
      return (
        <div style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          top: "38%",
          zIndex: 15,
          opacity: enterExitOpacity,
          transform: `translateY(${(1 - springCard) * 30}px) scale(${0.9 + 0.1 * springCard})`,
          padding: "24px 34px",
          background: "rgba(10, 13, 22, 0.92)",
          borderRadius: 20,
          border: `1px solid rgba(255, 255, 255, 0.14)`,
          borderLeft: `8px solid ${accent}`,
          boxShadow: `0 24px 60px rgba(0,0,0,0.8), 0 0 30px ${accent}25`,
          backdropFilter: "blur(20px)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: accent, boxShadow: `0 0 10px ${accent}` }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              REASONING & PROMPT
            </span>
          </div>
          <TypeText text={text} localFrame={local} fps={fps} color="#f8fafc" />
        </div>
      );
    }

    // 3. BENTO CARD / STAT COUNTER CON CHECKMARK DE ÉXITO
    case "stat-counter": {
      const pop = spring({ frame: local, fps, config: { damping: 12, stiffness: 150 } });
      const b = bump(local, 12, 10);
      return (
        <div style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          top: "36%",
          zIndex: 15,
          textAlign: "center",
          opacity: enterExitOpacity,
          transform: `scale(${(0.6 + 0.4 * pop) * (1 + b * 0.06)})`,
          padding: "28px 36px",
          background: "rgba(9, 12, 20, 0.92)",
          borderRadius: 24,
          border: `2px solid ${accent}`,
          boxShadow: `0 24px 70px rgba(0,0,0,0.85), 0 0 40px ${accent}44`,
          backdropFilter: "blur(24px)"
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 14px", borderRadius: 20, background: `${accent}22`, color: accent, fontSize: 13, fontWeight: 900, marginBottom: 12 }}>
            <span>✓</span>
            <span>VERIFICADO</span>
          </div>
          <div style={{
            fontSize: "min(8vh, 86px)",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            textShadow: `0 0 20px ${accent}66`
          }}>
            {text}
          </div>
        </div>
      );
    }

    // 4. PALABRA RESALTADA TIPO MARCADOR FLÚOR
    case "word-highlight": {
      const markerWidth = interpolate(local, [0, 10], [0, 100], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic)
      });
      return (
        <div style={{
          position: "absolute",
          left: "6%",
          right: "6%",
          top: "42%",
          zIndex: 15,
          textAlign: "center",
          opacity: enterExitOpacity
        }}>
          <span style={{
            position: "relative",
            display: "inline-block",
            padding: "8px 24px",
            fontSize: "min(8vh, 88px)",
            fontWeight: 900,
            color: "#08090b",
            zIndex: 2
          }}>
            <span style={{ position: "relative", zIndex: 3 }}>{text}</span>
            <span style={{
              position: "absolute",
              inset: 0,
              width: `${markerWidth}%`,
              background: accent,
              borderRadius: 14,
              zIndex: 1,
              boxShadow: `0 0 30px ${accent}`
            }} />
          </span>
        </div>
      );
    }

    // 5. TARJETA DE CITA / FRASE ELEGANTE
    case "quote-card": {
      const slide = spring({ frame: local, fps, config: { damping: 16, stiffness: 110 } });
      return (
        <div style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          top: "38%",
          zIndex: 15,
          opacity: enterExitOpacity,
          transform: `translateY(${(1 - slide) * 40}px)`,
          padding: "26px 36px",
          background: "rgba(10, 13, 22, 0.88)",
          borderLeft: `8px solid ${accent}`,
          borderRadius: 18,
          boxShadow: "0 20px 60px rgba(0,0,0,0.75)",
          backdropFilter: "blur(20px)"
        }}>
          <div style={{ color: accent, fontSize: 44, lineHeight: 0.8, marginBottom: 8 }}>“</div>
          <span style={{ fontSize: "min(4.8vh, 50px)", color: "#f8fafc", lineHeight: 1.25, fontStyle: "italic", fontWeight: 700 }}>
            {text}
          </span>
        </div>
      );
    }

    // 6. BOTÓN CTA SUSCRÍBETE CON CAMPANITA
    case "subscribe-cta": {
      const pop = spring({ frame: local, fps, config: { damping: 10, stiffness: 140 } });
      const bellShake = Math.sin(local * 0.8) * (local < 28 ? 14 : 0);
      return (
        <div style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: "10%",
          zIndex: 15,
          textAlign: "center",
          opacity: enterExitOpacity,
          transform: `scale(${pop})`
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 38px",
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "#ffffff",
            borderRadius: 50,
            boxShadow: "0 14px 40px rgba(239, 68, 68, 0.6), 0 0 24px rgba(239, 68, 68, 0.4)"
          }}>
            <span style={{ fontSize: 32, transform: `rotate(${bellShake}deg)` }}>🔔</span>
            <span style={{ fontSize: "min(4.5vh, 46px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {text || "SUSCRÍBETE"}
            </span>
          </div>
        </div>
      );
    }

    // 7. LOWER THIRD
    case "lower-third": {
      const slide = interpolate(progress, [0, 0.25], [-120, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
      return (
        <div style={{
          position: "absolute",
          left: "6%",
          bottom: "12%",
          zIndex: 15,
          opacity: enterExitOpacity,
          transform: `translateX(${slide}px)`,
          padding: "14px 24px",
          background: "rgba(10, 13, 22, 0.88)",
          borderLeft: `6px solid ${accent}`,
          borderRadius: "0 14px 14px 0",
          backdropFilter: "blur(16px)"
        }}>
          <span style={{ fontSize: "min(4.2vh, 46px)", color: "#ffffff", fontWeight: 800 }}>{text}</span>
        </div>
      );
    }

    // 8. BARRA DE RETENCIÓN SHORTS
    case "progress-bar": {
      return (
        <div style={{ position: "absolute", bottom: "4%", left: "6%", right: "6%", height: 10, background: "rgba(255,255,255,0.15)", borderRadius: 6, overflow: "hidden", zIndex: 15 }}>
          <div style={{ height: "100%", width: `${progress * 100}%`, background: accent, borderRadius: 6, boxShadow: `0 0 16px ${accent}` }} />
        </div>
      );
    }

    // 9. ALERTA / ADVERTENCIA
    case "warning-alert": {
      const flash = Math.sin(local * 0.6) > 0 ? 1 : 0.82;
      return (
        <div style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          top: "12%",
          zIndex: 15,
          textAlign: "center",
          opacity: enterExitOpacity * flash
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 28px",
            background: "rgba(245, 158, 11, 0.22)",
            border: `2px solid ${accent}`,
            borderRadius: 16,
            color: accent,
            fontSize: "min(4.5vh, 48px)",
            fontWeight: 900,
            boxShadow: `0 0 24px ${accent}44`,
            backdropFilter: "blur(16px)"
          }}>
            <span>⚠️</span>
            <span>{text}</span>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};

const MotionGraphics = ({ graphics, frame, durationInFrames, fps }) => (
  <>{graphics.map(graphic => <MotionGraphic key={graphic.id} graphic={graphic} frame={frame} durationInFrames={durationInFrames} fps={fps} />)}</>
);

/* =========================================================================
   CLEAN MINIMALIST STUDIO BACKDROP
   ========================================================================= */
const StockMotionBackground = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: "#0d0e12",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        opacity: 0.3,
        color: "#ffffff"
      }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <span style={{
          fontFamily: "'Geist Variable', system-ui, -apple-system, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.04em"
        }}>
          Sin Imagen
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   SCENE RENDERER
   ========================================================================= */
const Scene = ({ scene, durationInFrames, fps, transition = "none", transitionSeconds = 0.35, hasPrevious = false, hasNext = false }) => {
  const frame = useCurrentFrame();
  const isImageHidden = Boolean(scene.imageHidden || scene.hidden);
  const isStockMotion = scene.isStockMotion || (scene.graphics || []).some(g => g.preset === "stock-motion-card");
  // El clip generado sustituye visualmente a su imagen de origen. Si la
  // copia local todavía está en curso, el enlace de Flow permite previsualizar
  // el resultado sin borrar la imagen que sirve para regenerarlo.
  const videoSource = scene.videoUrl || scene.flowVideoUrl || "";
  const source = videoSource || scene.imageUrl;

  const mediaStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    ...motionStyle(videoSource ? "still" : scene.motion, frame, durationInFrames, scene.customMotion)
  };

  const transitionFrames = Math.max(1, Math.min(Math.round(Number(transitionSeconds || 0.35) * fps), Math.floor(durationInFrames / 3)));
  const enter = hasPrevious && transition !== "none"
    ? interpolate(frame, [0, transitionFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const exit = hasNext && transition !== "none"
    ? interpolate(frame, [durationInFrames - transitionFrames, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const transitionStyle = (() => {
    if (transition === "fade") return { opacity: Math.min(enter, exit) };
    if (transition === "slide-left") return { opacity: Math.min(enter * 1.15, exit * 1.15), transform: `translateX(${((1 - enter) * 7) - ((1 - exit) * 7)}%)` };
    if (transition === "slide-right") return { opacity: Math.min(enter * 1.15, exit * 1.15), transform: `translateX(${((1 - exit) * 7) - ((1 - enter) * 7)}%)` };
    if (transition === "zoom") return { opacity: Math.min(enter * 1.15, exit * 1.15), transform: `scale(${0.94 + (Math.min(enter, exit) * 0.06)})` };
    if (transition === "wipe") return { clipPath: `inset(0 ${(1 - enter) * 100}% 0 ${(1 - exit) * 100}%)` };
    return {};
  })();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden", ...transitionStyle }}>
      {isImageHidden ? (
        /* Imagen oculta por el usuario: fondo negro limpio manteniendo duración, audios, subtítulos y Motion FX intactos */
        <AbsoluteFill style={{ backgroundColor: "#000000" }} />
      ) : isStockMotion ? (
        <StockMotionBackground frame={frame} durationInFrames={durationInFrames} fps={fps} />
      ) : source ? (
        videoSource ? (
          <>
            <Video
              src={source}
              muted={true}
              style={mediaStyle}
              onError={err => {
                console.warn("Video playback warning:", err);
              }}
            />
            {!scene.muted ? (
              <Html5Audio
                src={source}
                volume={scene.videoVolume !== undefined ? Number(scene.videoVolume) : (scene.volume !== undefined ? Number(scene.volume) : 1.0)}
              />
            ) : null}
          </>
        ) : (
          <Img src={source} style={mediaStyle} />
        )
      ) : (
        <StockMotionBackground frame={frame} durationInFrames={durationInFrames} fps={fps} />
      )}

      {scene.caption && !scene._skipLegacyCaption ? (
        <div style={{ position: "absolute", left: "7%", right: "7%", bottom: "8%", color: "white", fontFamily: "'Inter', Arial, sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.1, textShadow: "0 4px 20px rgba(0,0,0,0.8)", textAlign: "center" }}>
          {scene.caption}
        </div>
      ) : null}

      {/* Motion Graphics disabled for instant performance */}
      {/* <MotionGraphics graphics={scene.graphics || []} frame={frame} durationInFrames={durationInFrames} fps={fps} /> */}
    </AbsoluteFill>
  );
};

/* =========================================================================
   ANIMATED TIMED CAPTIONS RENDERER (Karaoke, Hormozi, Glow, Slide Up)
   ========================================================================= */
const TimedCaptions = ({ cues, fps, style }) => {
  const frame = useCurrentFrame();
  const nowMs = (frame / fps) * 1000;
  const active = (cues || []).filter(cue => {
    const s = Number(cue.startMs ?? (Number(cue.startSeconds || 0) * 1000));
    const e = Number(cue.endMs ?? (Number(cue.endSeconds || 0) * 1000));
    return nowMs >= s && nowMs < e;
  });
  if (!active.length) return null;

  const position = style?.position || "bottom";
  const posY = Number(style?.posY ?? (position === "top" ? 12 : position === "center" ? 50 : 84));
  const animType = style?.animation || "soft-scale";
  const wordByWord = style?.wordByWord !== false;
  const wordHighlight = style?.wordHighlight !== false;
  const highlightColor = style?.highlightColor || "#d7ff4f";
  const outlineColor = style?.outlineColor || "#08090d";
  const outlineWidth = Number(style?.outlineWidth ?? 5);
  const glow = Number(style?.glow ?? 20);

  const outline = outlineWidth > 0
    ? [
        `${outlineWidth}px 0 0 ${outlineColor}`,
        `-${outlineWidth}px 0 0 ${outlineColor}`,
        `0 ${outlineWidth}px 0 ${outlineColor}`,
        `0 -${outlineWidth}px 0 ${outlineColor}`,
        `${Math.round(outlineWidth * 0.72)}px ${Math.round(outlineWidth * 0.72)}px 0 ${outlineColor}`,
        `-${Math.round(outlineWidth * 0.72)}px ${Math.round(outlineWidth * 0.72)}px 0 ${outlineColor}`,
        `${Math.round(outlineWidth * 0.72)}px -${Math.round(outlineWidth * 0.72)}px 0 ${outlineColor}`,
        `-${Math.round(outlineWidth * 0.72)}px -${Math.round(outlineWidth * 0.72)}px 0 ${outlineColor}`
      ].join(", ")
    : "";

  const baseStyle = {
    position: "absolute",
    left: "4%",
    right: "4%",
    top: `${posY}%`,
    transform: "translateY(-50%)",
    zIndex: 20,
    color: style?.color || "#ffffff",
    fontFamily: style?.fontFamily || "'Inter', Arial, sans-serif",
    fontSize: Number(style?.fontSize || 54),
    fontWeight: Number(style?.fontWeight || 900),
    lineHeight: 1.24,
    textAlign: "center",
    letterSpacing: `${Number(style?.letterSpacing ?? 0)}px`,
    textTransform: style?.uppercase ? "uppercase" : "none",
    textShadow: [outline, glow > 0 ? `0 0 ${glow}px rgba(0,0,0,.85)` : ""].filter(Boolean).join(",")
  };

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={baseStyle}>
        {active.map((cue, index) => {
          const cueStartMs = Number(cue.startMs ?? (Number(cue.startSeconds || 0) * 1000));
          const cueEndMs = Number(cue.endMs ?? (Number(cue.endSeconds || 0) * 1000));
          const cueDurationMs = Math.max(100, cueEndMs - cueStartMs);
          const elapsedInCueMs = Math.max(0, nowMs - cueStartMs);
          const cueProgress = Math.min(1, elapsedInCueMs / cueDurationMs);
          const localFrame = Math.max(0, Math.round((elapsedInCueMs / 1000) * fps));

          const rawWords = String(cue.text || "").split(/\s+/).filter(Boolean);
          const hasWhisperWords = Array.isArray(cue.words) && cue.words.length > 0;
          const rawWordList = hasWhisperWords ? cue.words.map(w => (typeof w === "string" ? w : w.word || "")) : rawWords;
          const wordCount = rawWordList.length;

          // Determinación de la palabra activa en el milisegundo actual
          let activeWordIndex = -1;
          if (hasWhisperWords) {
            activeWordIndex = cue.words.findIndex(w => {
              const ws = Number(w.startMs ?? (Number(w.startSeconds || 0) * 1000));
              const we = Number(w.endMs ?? (Number(w.endSeconds || 0) * 1000));
              return nowMs >= ws && nowMs < we;
            });
            if (activeWordIndex === -1 && nowMs >= Number(cue.words[cue.words.length - 1].endMs ?? cueEndMs)) {
              activeWordIndex = cue.words.length - 1;
            }
          } else if (wordCount > 1) {
            activeWordIndex = Math.min(wordCount - 1, Math.floor(cueProgress * wordCount));
          } else if (wordCount === 1) {
            activeWordIndex = 0;
          }

          if (!wordHighlight) activeWordIndex = -1;

          const maxWords = Number(style?.maxWordsPerScreen || 0);
          let wordList = rawWordList;
          let currentActiveWordIndex = activeWordIndex;

          // Chunk words so only 1, 3, 4, or 6 words are visible on screen at once
          if (maxWords > 0 && rawWordList.length > maxWords) {
            const totalChunks = Math.ceil(rawWordList.length / maxWords);
            const chunkIndex = activeWordIndex >= 0
              ? Math.min(totalChunks - 1, Math.floor(activeWordIndex / maxWords))
              : Math.min(totalChunks - 1, Math.floor(cueProgress * totalChunks));
            const startSlice = chunkIndex * maxWords;
            const endSlice = Math.min(rawWordList.length, startSlice + maxWords);
            wordList = rawWordList.slice(startSlice, endSlice);
            currentActiveWordIndex = activeWordIndex >= 0 ? activeWordIndex - startSlice : -1;
          }

          // Use currentActiveWordIndex for active word animations
          activeWordIndex = currentActiveWordIndex;
          // 000. MODO VIRAL GOLD POP (TikTok / Shorts / Reels - Trazo Negro Grueso + Palabra Activa en Amarillo Dorado)
          if (animType === "viral-yellow-pop") {
            const goldColor = highlightColor || "#FFD700";
            return (
              <div
                key={cue.id || index}
                style={{
                  display: "inline-flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.32em",
                  maxWidth: "96%",
                  margin: "0 auto",
                  textTransform: "uppercase",
                  fontFamily: style?.fontFamily || "'Montserrat', 'Impact', 'Arial Black', Arial, sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.15
                }}
              >
                {wordList.map((word, wIdx) => {
                  const isActive = wIdx === activeWordIndex;
                  const wordStartMs = hasWhisperWords && cue.words[wIdx]
                    ? Number(cue.words[wIdx].startMs)
                    : Number(cue.startMs) + (wIdx / Math.max(1, wordList.length)) * cueDurationMs;
                  const wordDelayFrames = Math.max(0, Math.round(((wordStartMs - Number(cue.startMs)) / 1000) * fps));
                  const wordLocalFrame = Math.max(0, localFrame - wordDelayFrames);

                  const popSpring = spring({
                    frame: wordLocalFrame,
                    fps,
                    config: { damping: 13, stiffness: 185, mass: 0.4 }
                  });

                  const scale = isActive ? (1.08 + popSpring * 0.08) : 1;
                  const translateY = isActive ? (-3 * popSpring) : 0;

                  return (
                    <span
                      key={wIdx}
                      style={{
                        display: "inline-block",
                        transform: `translateY(${translateY}px) scale(${scale})`,
                        color: isActive ? goldColor : "#ffffff",
                        WebkitTextStroke: `${Math.max(3.5, outlineWidth)}px #000000`,
                        paintOrder: "stroke fill",
                        textShadow: isActive
                          ? `0 0 20px ${goldColor}aa, 0 4px 12px #000000, 0 8px 24px rgba(0,0,0,0.9)`
                          : `0 4px 12px #000000, 0 8px 24px rgba(0,0,0,0.9)`,
                        fontWeight: 900
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }

          const displayText = wordList.join(" ");

          // Compact presets inspired by modern caption editors. They can
          // animate the whole cue or reveal each word independently.
          if (animType === "soft-scale" || animType === "pop-up") {
            const cueSpring = spring({
              frame: localFrame,
              fps,
              config: animType === "soft-scale"
                ? { damping: 24, stiffness: 92, mass: 0.8 }
                : { damping: 13, stiffness: 155, mass: 0.65 }
            });
            const cueEndFrame = Math.max(6, Math.round((cueDurationMs / 1000) * fps));
            const cueOpacity = interpolate(localFrame, [0, 5, Math.max(6, cueEndFrame - 5), cueEndFrame], [0, 1, 1, 0], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp"
            });
            const cueTransform = animType === "soft-scale"
              ? `scale(${0.94 + cueSpring * 0.06})`
              : `translateY(${(1 - cueSpring) * 24}px) scale(${0.92 + cueSpring * 0.08})`;

            if (!wordByWord) {
              return (
                <div key={cue.id || index} style={{ display: "inline-block", opacity: cueOpacity, transform: cueTransform, padding: "5px 12px", textShadow: outline }}>
                  {displayText}
                </div>
              );
            }

            return (
              <div key={cue.id || index} style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0.28em", opacity: cueOpacity, transform: cueTransform }}>
                {wordList.map((word, wIdx) => {
                  const wordStartMs = hasWhisperWords && cue.words[wIdx]
                    ? Number(cue.words[wIdx].startMs)
                    : Number(cue.startMs) + (wIdx / Math.max(1, wordList.length)) * cueDurationMs;
                  const wordDelay = Math.max(0, Math.round(((wordStartMs - Number(cue.startMs)) / 1000) * fps));
                  const wordSpring = spring({ frame: Math.max(0, localFrame - wordDelay), fps, config: { damping: 20, stiffness: 110, mass: 0.7 } });
                  const isActive = wIdx === activeWordIndex;
                  return (
                    <span key={wIdx} style={{ display: "inline-block", opacity: localFrame < wordDelay ? 0 : 1, transform: `translateY(${(1 - wordSpring) * (animType === "pop-up" ? 16 : 8)}px) scale(${isActive ? 1.08 : 1})`, color: isActive ? highlightColor : "#ffffff", textShadow: isActive ? `0 0 ${glow}px ${highlightColor}, ${outline}` : outline }}>
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }

          // 00. MODO CLAUDE + REMOTION KINETIC (Natural Organic Spring Slide-Up + Gold Glow Highlight)
          if (animType === "claude-kinetic-reveal") {
            const goldColor = highlightColor || "#facc15";
            return (
              <div
                key={cue.id || index}
                style={{
                  display: "inline-flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "baseline",
                  gap: "0.3em",
                  maxWidth: "94%",
                  margin: "0 auto",
                  lineHeight: 1.25
                }}
              >
                {wordList.map((word, wIdx) => {
                  let wordStartTimeMs = 0;
                  if (hasWhisperWords && cue.words[wIdx]) {
                    wordStartTimeMs = Number(cue.words[wIdx].startMs);
                  } else {
                    const wordFraction = wIdx / Math.max(1, wordList.length);
                    wordStartTimeMs = Number(cue.startMs) + (wordFraction * cueDurationMs);
                  }

                  const wordDelayFrames = Math.max(0, Math.round(((wordStartTimeMs - Number(cue.startMs)) / 1000) * fps));
                  const wordLocalFrame = localFrame - wordDelayFrames;

                  if (wordLocalFrame < 0) {
                    return null;
                  }

                  // Física de resorte ultra-suave y natural sin saltos bruscos
                  const springProgress = spring({
                    frame: wordLocalFrame,
                    fps,
                    config: { damping: 20, stiffness: 100, mass: 0.55 }
                  });

                  const translateY = (1 - springProgress) * 14;
                  const opacity = interpolate(wordLocalFrame, [0, 6], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp"
                  });

                  const isActive = wIdx === activeWordIndex;
                  const pulseGlow = isActive ? Math.sin((wordLocalFrame / fps) * 5) * 3 + 14 : 0;

                  return (
                    <span
                      key={wIdx}
                      style={{
                        display: "inline-block",
                        transform: `translateY(${translateY}px) scale(${isActive ? 1.04 : 1})`,
                        opacity,
                        color: isActive ? goldColor : "#ffffff",
                        textShadow: isActive
                          ? `0 0 ${pulseGlow}px ${goldColor}, 0 2px 10px rgba(0,0,0,0.8), ${outline}`
                          : outline,
                        fontWeight: 900
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }

          // 0. MODO KINETIC CHAR SLIDE-UP (Letra por letra deslizándose hacia arriba con palabra resaltada)
          if (animType === "char-slide-highlight") {
            let globalCharCounter = 0;
            const highlightTargetIndex = activeWordIndex !== -1 ? activeWordIndex : Math.floor(wordList.length / 2);

            return (
              <div key={cue.id || index} style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0.32em" }}>
                {wordList.map((word, wIdx) => {
                  const isWordHighlighted = wIdx === highlightTargetIndex || (activeWordIndex !== -1 && wIdx === activeWordIndex);
                  const letters = String(word).split("");

                  const wordElement = (
                    <span
                      key={wIdx}
                      style={{
                        display: "inline-flex",
                        transform: isWordHighlighted ? "scale(1.08)" : "scale(1)",
                        color: isWordHighlighted ? highlightColor : "#ffffff",
                        textShadow: isWordHighlighted ? `0 0 26px ${highlightColor}, ${outline}` : outline
                      }}
                    >
                      {letters.map((char, cIdx) => {
                        const charIdx = globalCharCounter++;
                        const charDelay = charIdx * 0.8;
                        const charLocal = Math.max(0, localFrame - charDelay);
                        const progress = interpolate(charLocal, [0, 9], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                          easing: Easing.out(Easing.back(1.35))
                        });
                        const translateY = (1 - progress) * 36;
                        const opacity = interpolate(charLocal, [0, 5], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp"
                        });

                        return (
                          <span
                            key={cIdx}
                            style={{
                              display: "inline-block",
                              transform: `translateY(${translateY}px)`,
                              opacity
                            }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  );

                  globalCharCounter++;
                  return wordElement;
                })}
              </div>
            );
          }

          // 1. MODO KARAOKE NEÓN (Alex Hormozi Word-by-Word)
          if (animType === "karaoke") {
            return (
              <div key={cue.id || index} style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0.28em" }}>
                {wordList.map((word, wIdx) => {
                  const isActive = wIdx === activeWordIndex;
                  const isPast = activeWordIndex !== -1 && wIdx < activeWordIndex;
                  return (
                    <span
                      key={wIdx}
                      style={{
                        color: isActive ? highlightColor : isPast ? "#ffffff" : "rgba(255,255,255,0.72)",
                        transform: isActive ? "scale(1.14)" : "scale(1)",
                        display: "inline-block",
                        textShadow: isActive ? `0 0 24px ${highlightColor}, ${outline}` : outline
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }

          // 2. MODO HORMOZI HIGHLIGHT PILL (Pastilla de fondo en la palabra activa)
          if (animType === "hormozi-pill") {
            return (
              <div key={cue.id || index} style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "0.32em" }}>
                {wordList.map((word, wIdx) => {
                  const isActive = wIdx === activeWordIndex;
                  return (
                    <span
                      key={wIdx}
                      style={{
                        display: "inline-block",
                        padding: isActive ? "3px 12px" : "3px 0",
                        background: isActive ? highlightColor : "transparent",
                        color: isActive ? "#060709" : "#ffffff",
                        borderRadius: 10,
                        transform: isActive ? "scale(1.12) rotate(-1.5deg)" : "scale(1)",
                        boxShadow: isActive ? `0 6px 20px rgba(0,0,0,0.6), 0 0 16px ${highlightColor}` : "none",
                        textShadow: isActive ? "none" : outline,
                        fontWeight: 900
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }

          // 3. MODO HORMOZI BOUNCE (Caja Negra con Borde de Acento)
          if (animType === "hormozi") {
            const popScale = spring({ frame: localFrame, fps, config: { damping: 11, stiffness: 160 } });
            return (
              <div
                key={cue.id || index}
                style={{
                  display: "inline-block",
                  transform: `scale(${0.7 + 0.3 * popScale}) rotate(${localFrame % 2 === 0 ? -1.5 : 1.5}deg)`,
                  padding: "10px 28px",
                  background: "#000000",
                  borderRadius: 16,
                  border: `3.5px solid ${highlightColor}`,
                  boxShadow: `0 10px 36px rgba(0,0,0,0.85), 0 0 24px ${highlightColor}66`,
                  color: highlightColor
                }}
              >
                {displayText}
              </div>
            );
          }

          // SUBRAYADO EDITORIAL SUAVE (la palabra activa recibe una línea animada)
          if (animType === "word-underline") {
            return (
              <div key={cue.id || index} style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0.3em" }}>
                {wordList.map((word, wIdx) => {
                  const isActive = wIdx === activeWordIndex;
                  const tokenStartMs = hasWhisperWords && cue.words[wIdx]
                    ? Number(cue.words[wIdx].startMs)
                    : Number(cue.startMs) + (wIdx / Math.max(1, wordList.length)) * cueDurationMs;
                  const tokenFrame = ((nowMs - tokenStartMs) / 1000) * fps;
                  const underlineWidth = isActive ? interpolate(tokenFrame, [0, 7], [0, 100], {
                    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)
                  }) : 0;
                  return <span key={wIdx} style={{ position: "relative", display: "inline-block", color: isActive ? highlightColor : "#fff", textShadow: outline }}>
                    {word}
                    <span style={{ position: "absolute", left: 0, bottom: -5, width: `${underlineWidth}%`, height: Math.max(3, Math.round(Number(style?.fontSize || 54) * 0.08)), borderRadius: 8, background: highlightColor, boxShadow: `0 0 12px ${highlightColor}` }} />
                  </span>;
                })}
              </div>
            );
          }

          // LOWER THIRD GLASS MINIMALISTA
          if (animType === "minimal-lower-third") {
            const enter = interpolate(cueProgress, [0, 0.14, 0.88, 1], [0, 1, 1, 0], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
              easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.4, 0, 1, 1)]
            });
            return <div key={cue.id || index} style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 24px", borderRadius: 16, background: "rgba(7,10,16,.72)", border: "1px solid rgba(255,255,255,.18)", boxShadow: "0 12px 38px rgba(0,0,0,.48)", backdropFilter: "blur(14px)", opacity: enter, translate: `${(1 - enter) * -24}px 0`, fontWeight: 700, textShadow: "none" }}>
              <span style={{ width: 6, alignSelf: "stretch", borderRadius: 8, background: highlightColor, boxShadow: `0 0 14px ${highlightColor}` }} />
              <span>{displayText}</span>
            </div>;
          }

          // DOCUMENTAL SERIF ELEGANTE
          if (animType === "documentary-serif") {
            const reveal = interpolate(cueProgress, [0, 0.16, 0.86, 1], [0, 1, 1, 0], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
              easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.4, 0, 1, 1)]
            });
            return <div key={cue.id || index} style={{ display: "inline-block", maxWidth: "86%", padding: "8px 22px 12px", fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 700, letterSpacing: "0.015em", color: "#fffdf5", borderBottom: `3px solid ${highlightColor}`, opacity: reveal, translate: `0 ${(1 - reveal) * 14}px`, textShadow: `0 3px 16px rgba(0,0,0,.92), ${outline}` }}>
              {displayText}
            </div>;
          }

          // MÁQUINA DE ESCRIBIR DETERMINISTA
          if (animType === "typewriter") {
            const visibleCharacters = Math.ceil(interpolate(cueProgress, [0, 0.7], [0, String(displayText).length], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }));
            const caretVisible = Math.floor(localFrame / Math.max(1, Math.round(fps * 0.28))) % 2 === 0;
            return <div key={cue.id || index} style={{ display: "inline-block", padding: "10px 18px", fontFamily: "'Courier New', monospace", background: "rgba(3,7,12,.76)", borderRadius: 10, color: "#f8fafc", textAlign: "left", textShadow: "none", boxShadow: "0 10px 30px rgba(0,0,0,.5)" }}>
              {String(displayText).slice(0, visibleCharacters)}<span style={{ color: highlightColor, opacity: caretVisible ? 1 : 0 }}>▌</span>
            </div>;
          }

          // CAJA MODERNA EDITORIAL
          if (animType === "boxed-modern") {
            const boxProgress = interpolate(cueProgress, [0, 0.13, 0.9, 1], [0, 1, 1, 0], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
              easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.4, 0, 1, 1)]
            });
            return <div key={cue.id || index} style={{ display: "inline-block", position: "relative", padding: "13px 26px 16px", borderRadius: 8, background: "rgba(248,250,252,.96)", color: "#0b0d12", fontWeight: 900, textShadow: "none", boxShadow: "8px 9px 0 rgba(0,0,0,.72)", opacity: boxProgress, scale: String(0.97 + boxProgress * 0.03) }}>
              {displayText}
              <span style={{ position: "absolute", left: 0, bottom: 0, width: `${boxProgress * 100}%`, height: 6, background: highlightColor }} />
            </div>;
          }

          // GRADIENTE POP SUAVE
          if (animType === "gradient-pop") {
            const pop = spring({ frame: localFrame, fps, config: { damping: 24, stiffness: 90, mass: 0.8 } });
            return <div key={cue.id || index} style={{ display: "inline-block", padding: "6px 16px", background: `linear-gradient(105deg, #ffffff 5%, ${highlightColor} 48%, #a78bfa 95%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 4px 12px rgba(0,0,0,.82)) drop-shadow(0 0 ${8 + pop * 10}px ${highlightColor}66)`, scale: String(0.94 + pop * 0.06), translate: `0 ${(1 - pop) * 18}px` }}>
              {displayText}
            </div>;
          }

          // 4. MODO WORD ZOOM (Foco y Desenfoque Periférico)
          if (animType === "word-zoom") {
            return (
              <div key={cue.id || index} style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0.32em" }}>
                {wordList.map((word, wIdx) => {
                  const isActive = wIdx === activeWordIndex;
                  return (
                    <span
                      key={wIdx}
                      style={{
                        display: "inline-block",
                        color: isActive ? highlightColor : "#ffffff",
                        opacity: isActive ? 1 : 0.45,
                        transform: isActive ? "scale(1.26)" : "scale(0.96)",
                        filter: isActive ? "none" : "blur(1px)",
                        textShadow: isActive ? `0 0 30px ${highlightColor}, ${outline}` : outline
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }

          // 5. MODO KINETIC STAGGER (Entrada Elástica Palabra por Palabra)
          if (animType === "kinetic-stagger") {
            return (
              <div key={cue.id || index} style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0.28em" }}>
                {wordList.map((word, wIdx) => {
                  const wordDelay = wIdx * 2.5;
                  const wordPop = spring({ frame: Math.max(0, localFrame - wordDelay), fps, config: { damping: 12, stiffness: 150 } });
                  const isActive = wIdx === activeWordIndex;
                  return (
                    <span
                      key={wIdx}
                      style={{
                        display: "inline-block",
                        transform: `translateY(${(1 - wordPop) * 30}px) scale(${0.5 + 0.5 * wordPop})`,
                        opacity: wordPop,
                        color: isActive ? highlightColor : "#ffffff",
                        textShadow: isActive ? `0 0 24px ${highlightColor}, ${outline}` : outline
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }

          // 6. MODO WAVE JUMP (Onda Saltarina)
          if (animType === "wave-jump") {
            return (
              <div key={cue.id || index} style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0.28em" }}>
                {wordList.map((word, wIdx) => {
                  const waveOffset = Math.sin((localFrame * 0.28) + (wIdx * 0.7)) * 10;
                  const isActive = wIdx === activeWordIndex;
                  return (
                    <span
                      key={wIdx}
                      style={{
                        display: "inline-block",
                        transform: `translateY(${waveOffset + (isActive ? -12 : 0)}px) scale(${isActive ? 1.18 : 1})`,
                        color: isActive ? highlightColor : "#ffffff",
                        textShadow: isActive ? `0 0 24px ${highlightColor}, ${outline}` : outline
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }

          // 7. MODO CYBERPUNK GLOW
          if (animType === "cyber-glitch") {
            const glitchShift = localFrame % 8 === 0 ? Math.sin(localFrame * 12.9898) * 2 : 0;
            return (
              <div
                key={cue.id || index}
                style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  transform: `translateX(${glitchShift}px)`,
                  color: "#00f0ff",
                  textShadow: `2px 2px 0 #ff003c, -2px -2px 0 #00f0ff, 0 0 20px #00f0ff, ${outline}`,
                  letterSpacing: "0.05em"
                }}
              >
                {displayText}
              </div>
            );
          }

          // 8. MODO FIRE GLOW (Gradiente de Fuego y Calor)
          if (animType === "fire-glow") {
            const flamePulse = Math.sin(localFrame * 0.5) * 12 + 22;
            return (
              <div
                key={cue.id || index}
                style={{
                  background: "linear-gradient(180deg, #fff7ed 0%, #fbbf24 45%, #ef4444 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: `drop-shadow(0 0 ${flamePulse}px #f97316) drop-shadow(0 0 ${flamePulse * 1.5}px #dc2626)`
                }}
              >
                {displayText}
              </div>
            );
          }

          // 9. MODO SLIDE UP
          if (animType === "slide") {
            const slideY = interpolate(cueProgress, [0, 0.15], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic)
            });
            const opacity = interpolate(cueProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
            return (
              <div
                key={cue.id || index}
                style={{
                  transform: `translateY(${slideY}px)`,
                  opacity
                }}
              >
                {displayText}
              </div>
            );
          }

          // 10. MODO CINEMATIC DOCUMENTAL (Netflix / Vox Fade)
          if (animType === "cinematic-fade") {
            const opacity = interpolate(cueProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp"
            });
            return (
              <div
                key={cue.id || index}
                style={{
                  opacity,
                  padding: "8px 24px",
                  background: "rgba(5, 7, 12, 0.75)",
                  borderRadius: 12,
                  backdropFilter: "blur(12px)",
                  display: "inline-block",
                  color: "#f8fafc",
                  fontWeight: 700,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
                }}
              >
                {displayText}
              </div>
            );
          }

          // 11. MODO CLEAN / ESTÁNDAR
          return (
            <div key={cue.id || index} style={{ marginBottom: "0.4em" }}>
              {displayText}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   IMAGE OVERLAY RENDERER (Track V2)
   ========================================================================= */
const ImageOverlay = ({ overlay, durationInFrames, fps }) => {
  const frame = useCurrentFrame();
  const { scale = 0.6, position = "top-right", posX = 75, posY = 25, animation = "pop", imageUrl } = overlay;

  if (!imageUrl) return null;

  let leftPercent = posX;
  let topPercent = posY;

  switch (position) {
    case "center":
      leftPercent = 50;
      topPercent = 50;
      break;
    case "top-left":
      leftPercent = 22;
      topPercent = 20;
      break;
    case "top-right":
      leftPercent = 78;
      topPercent = 20;
      break;
    case "bottom-left":
      leftPercent = 22;
      topPercent = 78;
      break;
    case "bottom-right":
      leftPercent = 78;
      topPercent = 78;
      break;
    case "custom":
    default:
      leftPercent = posX;
      topPercent = posY;
      break;
  }

  const enterFrames = Math.min(10, Math.floor(durationInFrames / 3));
  const exitFrames = Math.min(10, Math.floor(durationInFrames / 3));

  let animScale = 1;
  let animOpacity = 1;
  let animTranslateY = 0;

  if (animation === "pop") {
    const enterSpring = spring({ frame, fps, config: { damping: 12, stiffness: 180 } });
    const exitProgress = interpolate(frame, [durationInFrames - exitFrames, durationInFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    animScale = (0.4 + 0.6 * enterSpring) * (1 - 0.25 * exitProgress);
    animOpacity = interpolate(frame, [0, enterFrames / 2, durationInFrames - exitFrames, durationInFrames], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  } else if (animation === "fade") {
    animOpacity = interpolate(frame, [0, enterFrames, durationInFrames - exitFrames, durationInFrames], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  } else if (animation === "slide-up") {
    animTranslateY = interpolate(frame, [0, enterFrames], [40, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic)
    });
    animOpacity = interpolate(frame, [0, enterFrames / 2, durationInFrames - exitFrames, durationInFrames], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  }

  const finalScale = Number(scale || 0.6) * animScale;

  return (
    <div
      style={{
        position: "absolute",
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        transform: `translate(-50%, -50%) scale(${finalScale}) translateY(${animTranslateY}px)`,
        opacity: animOpacity,
        zIndex: 20,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Img
        src={imageUrl}
        style={{
          maxWidth: "80vw",
          maxHeight: "80vh",
          objectFit: "contain",
          borderRadius: 16,
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.18)"
        }}
      />
    </div>
  );
};

/* =========================================================================
   MAIN COMPOSITION
   ========================================================================= */
export const YouTubeComposition = ({
  scenes = [],
  fps = 30,
  audioTrack = null,
  musicTrack = null,
  captionTrack = null,
  transitions = null,
  overlays = []
}) => {
  let from = 0;
  const safeScenes = Array.isArray(scenes) && scenes.length > 0 ? scenes : [{
    id: "placeholder-scene",
    title: "Escena 1",
    duration: 4,
    motion: "gentle-zoom-in",
    imageUrl: "",
    videoUrl: ""
  }];
  const safeFps = Number(fps) || 30;
  const defaultTransition = ["none", "fade", "slide-left", "slide-right", "zoom", "wipe"].includes(transitions?.default) ? transitions.default : "fade";
  const transitionSeconds = Math.min(1, Math.max(0.1, Number(transitions?.duration) || 0.35));
  const captionsEnabled = captionTrack?.enabled !== false;
  const burnInEnabled = captionTrack?.burnIn !== false && captionsEnabled;
  const hasTimedCaptions = burnInEnabled && Boolean(captionTrack?.cues?.length);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080b" }}>
      {safeScenes.map((scene, index) => {
        const durationInFrames = Math.max(1, Math.round(Number(scene.duration || 4) * safeFps));
        const transition = scene.transition && scene.transition !== "inherit" ? scene.transition : defaultTransition;
        const sequence = (
          <Sequence key={scene.id || Math.random()} from={from} durationInFrames={durationInFrames} premountFor={safeFps}>
            <Scene
              scene={hasTimedCaptions || !burnInEnabled ? { ...scene, _skipLegacyCaption: true } : scene}
              durationInFrames={durationInFrames}
              fps={safeFps}
              transition={transition}
              transitionSeconds={transitionSeconds}
              hasPrevious={index > 0}
              hasNext={index < safeScenes.length - 1}
            />
          </Sequence>
        );
        from += durationInFrames;
        return sequence;
      })}

      {/* Pista V2: Superposiciones / Overlays de Imagen */}
      {Array.isArray(overlays) && overlays.map(overlay => {
        if (!overlay?.imageUrl) return null;
        const fromFrame = Math.max(0, Math.round(Number(overlay.startSeconds || 0) * safeFps));
        const durationFrames = Math.max(1, Math.round(Number(overlay.durationSeconds || 3) * safeFps));
        return (
          <Sequence
            key={overlay.id || `ovl-${fromFrame}`}
            from={fromFrame}
            durationInFrames={durationFrames}
          >
            <ImageOverlay overlay={overlay} durationInFrames={durationFrames} fps={safeFps} />
          </Sequence>
        );
      })}

      {/* Pista A1: Narración */}
      {audioTrack?.url ? (
        <Html5Audio
          src={audioTrack.url}
          volume={audioTrack.volume !== undefined ? Number(audioTrack.volume) : 1}
          loop={Boolean(audioTrack.loop)}
        />
      ) : null}
      
      {/* Pista A2: Música de fondo Suno / SFX */}
      {musicTrack?.url ? (
        <Html5Audio
          src={musicTrack.url}
          volume={musicTrack.volume !== undefined ? Number(musicTrack.volume) : 0.10}
          loop={musicTrack.loop !== false}
        />
      ) : null}
      
      {hasTimedCaptions ? (
        <Sequence from={0} durationInFrames={Math.max(safeFps, from)}>
          <TimedCaptions cues={captionTrack.cues} fps={safeFps} style={captionTrack.style} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
