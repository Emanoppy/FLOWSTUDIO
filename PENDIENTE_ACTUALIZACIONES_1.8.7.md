# Pendiente: features de v1.8.7 (del repo del compañero) que faltan portar

## RESUELTO 2026-09-12 — Google Flow no generaba nada (bug crítico, no de licencia/plan)

Diagnóstico completo tras varias horas de depuración con acceso directo a la ventana de
Flow vía Chrome DevTools Protocol. Causa real: **Google retiró el API REST que Flow usaba
en el cliente web** (`aisandbox-pa.googleapis.com` con Bearer token obtenido de
`labs.google/fx/api/auth/session`). El frontend real ahora vive en `flow.google.com` y
habla con el backend usando el protocolo RPC interno de Google `batchexecute` (el mismo
que usan Gmail/Drive) — atado a cookies de sesión, un token `at=` de página, y un token
de reCAPTCHA Enterprise fresco por cada llamada. No es un API pensada para consumo
externo: el formato del payload es un array serializado propio de Closure Compiler,
versionado por despliegue (`bl=boq_labs-ai-sandbox-frontend_<fecha>`), y por eso
reimplementarlo a mano sería igual de fresco o más frágil que lo que había.

**La solución real, ya aplicada:** en vez de robar tokens y llamar la API directamente,
`generateImageViaFlowUI()` (nuevo, en `electron/main.cjs`) automatiza la interfaz real de
Flow — escribe el prompt en el campo de texto y hace clic en "Iniciar generación" con
`webContents.sendInputEvent()` / `insertText()`, exactamente como lo haría una persona, y
detecta la imagen resultante esperando a que aparezca una nueva `<img>` con URL de
`flow-content.google` en el DOM. Probado de punta a punta llamando directamente
`window.electronAPI.flowExecute("FLOW_GENERATE_IMAGE", ...)` — genera imágenes reales.

## RESUELTO 2026-09-12 (continuación) — Video: generación + descarga real funcionando

`FLOW_VIDEO_START` ya NO usa el REST API viejo. Nueva función `generateVideoViaFlowUI()`
en `electron/main.cjs`, mismo enfoque que las imágenes pero con dos piezas nuevas:

1. **Flujo real descubierto en la UI**: abrir una imagen ya generada → botón "Añadir
   ingredientes a ventana para peticiones" (la usa como cuadro inicial) → escribir el
   prompt de movimiento → "Iniciar generación". Por ahora siempre usa **la imagen más
   reciente del proyecto** como base (no una elegida por id todavía — ver pendiente
   abajo).
2. **Descarga real vía Electron, no DOM**: Flow renderiza el video en un `<canvas>` (no
   un `<video src>`), y el botón "Descargar" crea un `<a download href="blob:...">` al
   vuelo que desaparece enseguida — no hay nada estable que leer del DOM. La solución:
   `waitForNextDownload()` engancha el evento nativo `will-download` de la sesión de
   Electron, que captura la descarga sin importar cómo se disparó internamente. El botón
   real abre un menú de calidad (GIF 270p / 360p original / 720p mejorada); el código
   elige "360p Tamaño original" automáticamente.
3. **Detección de "ya terminó" con antirrebote**: el indicador de progreso (`NN %`) a
   veces desaparece un instante por un redibujo de Angular antes de que el video esté
   listo de verdad — un solo chequeo sin "%" daba falso positivo. Se exige **3 lecturas
   limpias seguidas** antes de asumir que terminó.

Probado de punta a punta con `flowExecute("FLOW_VIDEO_START", ...)` — devolvió un MP4
real descargado a `Videos/FLOWSTUDIO/Renders/`.

**Bug de paso, ya corregido**: `server/index.js` → `/api/import` no tenía categoría para
video, así que todo lo que no era imagen caía en la carpeta de Audios. Se agregó detección
de `video/*` / `.mp4`/`.webm`/`.mov` → ahora va a `Renders` y se sirve desde `/renders/`.

## Pendiente — consistencia de personaje (imagen de referencia)

El usuario pidió (2026-09-12): que la primera imagen generada sirva de referencia para
las siguientes (mismo personaje en todas las escenas), y que esas imágenes sirvan de
referencia también al generar los videos, con el método MÁS SIMPLE posible (sin usar
"Personajes"/Avatar, aunque terminamos investigando esa vía igual). Se investigó a fondo
en dos rondas (incluyendo revisar si el repo del compañero de equipo ya lo había resuelto
— **no lo tiene resuelto, su código usa el mismo API REST viejo y roto que el nuestro
tenía**, confirmado leyendo su `electron/main.cjs` desofuscado línea por línea). No se
logró automatizar completamente, pero se avanzó mucho:

**Lo que SÍ se confirmó que funciona (a mano, vía DevTools Protocol):**
1. Flow tiene una función nativa "Personajes" (pestaña en el panel lateral). Desde ahí,
   "Nuevo personaje" → **"Añadir desde proyecto"** (no "Subir") deja elegir una imagen YA
   GENERADA en el proyecto (no hay que subir nada desde disco) como base del personaje.
2. Se automatizó con éxito TODO ese flujo: abrir Personajes → Añadir desde proyecto →
   seleccionar imagen existente → Finalizar edición (✓). **El personaje se creó de
   verdad** ("Personaje sin nombre", visible en la galería del proyecto).

**Lo que NO se logró pese a un esfuerzo exhaustivo — aplicar el personaje a una
generación nueva:**
- El botón "Añadir ingredientes a ventana para peticiones" en la barra general de
  composición: se probó clic simple, clic con el cuadro de prompt ya enfocado, clic
  directo por referencia de elemento (sin coordenadas) — siempre alterna su ícono entre
  "add"/"close" pero **sin ningún cambio visible en el DOM**, ninguna miniatura adjunta,
  ningún menú, ningún `<input type="file">` detectable.
- Se descartó que sea un diálogo nativo de Windows bloqueando en silencio: se verificó
  `document.hasFocus()` y `document.visibilityState` inmediatamente después del clic —
  ambos siguen normales (`true`/`visible`), lo cual no pasaría si un diálogo modal nativo
  hubiera robado el foco.
- Escribir "@" en el prompt no dispara ningún autocompletado de personajes/ingredientes.
- Se probó **arrastrar (drag-and-drop) de verdad**, con movimiento en 15-20 pasos
  intermedios y pausas entre cada uno (para simular un arrastre humano real), tanto una
  miniatura común como la propia tarjeta del personaje, hacia el cuadro de texto — sin
  ningún efecto en ambos casos. Sospecha técnica: Chromium probablemente no reconoce un
  drag-and-drop de HTML5 sintetizado solo con eventos de mouse de bajo nivel
  (`Input.dispatchMouseEvent`); existe un comando específico de Chrome DevTools Protocol
  para esto (`Input.setInterceptDrags` + `Input.dispatchDragEvent`, dos fases) que NO se
  llegó a probar por la complejidad de implementarlo bien — es el próximo paso técnico
  más prometedor si se retoma esto.
- Si el drag-and-drop verdadero (con `Input.dispatchDragEvent`) no destraba esto, queda
  como alternativa real: como ya se automatizó la CREACIÓN del personaje con éxito,
  vale la pena seguir el rastro desde ahí — por ejemplo revisar si el personaje se aplica
  seleccionándolo en el `model-chip`/selector de modelo (el mismo que muestra
  "🍌 Nano Banana 2") en vez de por el botón de ingredientes, algo que no se alcanzó a
  probar por agotamiento del tiempo de esta sesión.

**Mitigación ya aplicada mientras tanto (2026-09-12):** en `generateImageViaFlowUI`
(vía el handler `FLOW_GENERATE_IMAGE` en `electron/main.cjs`), si el proyecto tiene un
Avatar/Estilo configurado en FLOWSTUDIO (`payload.referenceImage`/`referenceImages`), se
antepone al prompt una instrucción explícita: *"Mantén exactamente el mismo
personaje/sujeto, su apariencia física, ropa, colores y el mismo estilo visual usados en
las imágenes anteriores de este proyecto."* No es consistencia real por imagen (no hay
garantía de parecido físico exacto), pero es gratis, no depende de resolver la UI de
Flow, y ayuda algo mientras se retoma lo de arriba. La imagen en sí (`base64`) sigue sin
subirse ni usarse — solo se aprovecha el hecho de que existe una referencia configurada
como señal para reforzar el prompt.

**Nota técnica**: el código viejo (`uploadReferenceImage`, REST API) que manejaba esto
antes de que Google rompiera el API sigue en el archivo pero ya no se llama desde
`generateImageViaFlowUI`/`generateVideoViaFlowUI` — queda como documentación de qué
campos esperaba el sistema viejo (`imageInputType: "IMAGE_INPUT_TYPE_REFERENCE"`, etc.)
por si ayuda a entender qué buscar en la UI nueva.

Los selectores usados en toda esta automatización (`button[aria-label="Iniciar
generación"]`, buscar el `[contenteditable]` visible de tamaño razonable, etc.) son
heurísticos basados en el HTML actual de Flow — pueden dejar de funcionar si Google
cambia el aria-label o el layout. Si algo de esto vuelve a fallar, repetir el proceso de
inspección con Chrome DevTools Protocol (lanzar Electron con
`--remote-debugging-port=9222`, conectar por WebSocket con el paquete `ws`, ya
instalado) antes de asumir que es un problema de cuenta o de licencia.

## Pendiente de seguridad — antes de ofrecer esto a clientes reales (no urgente ahora)

Detectado 2026-09-11, revisando de dónde sale el aviso "Nueva versión disponible".
No bloquea el uso interno actual — la prioridad ahora es dejar la funcionalidad
(cuentas de Google Flow, generación) funcionando bien. Retomar esto cuando se acerque
el momento de vender/distribuir el sistema con licencias a terceros:

1. **Fallback del auto-updater apunta al repo ajeno.** En `electron/main.cjs` (función
   `updater:download`, ~línea 1704): si la `download_url` guardada en nuestra tabla
   `flowstudio_announcements` no termina en `.exe` o tiene un formato raro, el código
   arma sola una URL hacia `github.com/nmediastudio/flowstudio-releases` (el repo del
   equipo original) en vez de fallar con un error claro. Para un producto propio esto
   hay que quitarlo o reemplazarlo por un fallback hacia infraestructura propia.
2. **El instalador descargado se ejecuta sin verificar firma ni hash** (mismo hallazgo
   de `RECOVERY_NOTES.md`, punto 2) — aplica tanto si la URL es la de nmediastudio como
   si en el futuro es la propia. Antes de distribuir esto a clientes reales, agregar
   verificación de hash/firma digital antes de correr `spawn()` sobre el instalador
   descargado.


Este archivo documenta el trabajo de comparación contra el build v1.8.7 publicado en
`github.com/nmediastudio/flowstudio-releases` por un compañero de equipo que sigue
actualizando esa app en paralelo. El objetivo NO es instalar su build (nunca se ejecutó
el instalador, solo se descargó y se extrajo en una carpeta temporal aislada para leer
el código) — es sacar las mejoras reales y adaptarlas a mano a este código recuperado.

## Ya portado a este repo (2026-09-11)

**Renovación de sesión OAuth (fix del bucle de error 401).** Se comparó
`electron/main.cjs` contra la versión de v1.8.7 y resultó que la arquitectura de
renovación (`getAccountAccessToken` con caché + `refreshAccountSession` que reintenta
en la misma cuenta antes de rotar) **ya existía en este código** — no era una función
nueva como sugería el changelog. Se encontraron y aplicaron dos diferencias reales:

1. `getAccountAccessToken`: ahora detecta si Google devuelve una sesión cuyo `expires`
   ya pasó (sesión local obsoleta) y la trata como vencida en vez de cachearla como
   válida.
2. `refreshAccountSession`: recarga la URL raíz `https://labs.google/fx/` (antes iba
   directo a `/fx/tools/flow`) y espera 4.5s en vez de 2.5s antes de revisar si Google
   pidió reautenticación — más margen para que el redirect de sesión vencida ocurra.

## Pendiente — requiere retomar el trabajo de deofuscación

Estas dos mejoras del changelog de v1.8.7 **no están en `server/` ni en `electron/`**
(se revisó `server/index.js` y `server/whisper.js` del build nuevo, son idénticos a los
nuestros en la parte de transcripción). Tienen que vivir enteramente en el **bundle del
frontend compilado** (la UI de React), que es un archivo grande y ofuscado por separado
— el mismo tipo de trabajo que se hizo para recuperar toda la interfaz la primera vez
(ver `RECOVERY_NOTES.md`), no un ajuste rápido.

1. **Transcripción directa de clips de video** (sin archivo de audio separado): la UI
   tendría que extraer el audio del clip en la línea de tiempo (probablemente vía
   ffmpeg) y llamar sola al endpoint existente `/api/transcribe-whisper/start` con
   ese audio generado — el backend no necesita cambios, la lógica nueva es solo de
   interfaz.
2. **Generador de overlays con IA desde subtítulos/SRT**: analiza el SRT ya generado,
   detecta momentos visuales clave y sugiere overlays con 4 estilos. Es candidato a
   usar el mismo canal `FLOW_GENERATE_TEXT` que ya existe en `electron/main.cjs` (pide
   texto a Gemini vía Flow) — pero la lógica de armar el prompt y aplicar el resultado
   a la pista de overlays (`src/remotion/YouTubeComposition.jsx`, la Pista V2 que SÍ ya
   tenemos) está en el frontend.

## Cómo retomar esto

1. Repetir la descarga del instalador desde
   `https://github.com/nmediastudio/flowstudio-releases/releases` (revisar si ya hay
   una versión más nueva que 1.8.7 publicada) — **nunca ejecutar el `.exe`**, solo
   extraerlo con 7-Zip (`7z x instalador.exe`) → extraer `app-64.7z` que queda adentro
   → extraer `resources/app.asar` con `npx asar extract app.asar carpeta-salida`.
2. El bundle del frontend compilado queda en `dist/assets/*.js` dentro de ese extract.
   Va a estar ofuscado — desofuscar con `npx webcrack archivo.js -o salida/` como se
   hizo con `electron/main.cjs` y `server/index.js` esta vez.
3. Buscar en el resultado: para overlays con IA, términos como "overlay", "srt",
   "momento", "estilo"; para transcripción de video, buscar dónde se arma el payload
   hacia `/api/transcribe-whisper/start` y ver si ahí mismo se le agregó un paso previo
   de extracción de audio del clip.
4. Portar solo la lógica concreta encontrada a `jsx-backups/` / `src/`, recompilar con
   esbuild (igual que se hizo la primera vez) y probar en el navegador antes de dar por
   terminado.

Todo el trabajo de extracción de esta sesión (instalador descargado, extraído y
desofuscado) quedó en una carpeta temporal de la sesión de Claude Code, que se borra
sola — por eso este archivo documenta los hallazgos en vez de depender de esos
archivos temporales.
