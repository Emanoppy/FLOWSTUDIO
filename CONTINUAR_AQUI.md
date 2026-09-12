# FLOWSTUDIO — Continuar desde acá

Si estás leyendo esto en otra PC (o más tarde el mismo día): este repo es la recuperación
completa del código de FLOWSTUDIO v1.8.5 (se había perdido el código fuente del equipo).
Este archivo es el resumen de en qué quedamos, para retomar sin tener que repetir nada.
También revisá `PENDIENTE_ACTUALIZACIONES_1.8.7.md`, que tiene el detalle técnico de todo
lo relacionado a Google Flow (API rota, automatización de UI, etc).

**Decile a Claude: "leé CONTINUAR_AQUI.md, RECOVERY_NOTES.md y PENDIENTE_ACTUALIZACIONES_1.8.7.md
antes de seguir"** — con eso tiene todo el contexto.

## Sesión 2026-09-12 (mañana) — resumen de lo que se hizo

1. **Electron ya corre en esta máquina** (antes fallaba por un problema de extracción del
   `.exe` — se solucionó extrayéndolo con 7-Zip en vez del instalador de npm). Para correrlo:
   ```
   node_modules/electron/dist/electron.exe .
   ```
   (con `ELECTRON_RUN_AS_NODE` sin setear — si el entorno de terminal lo trae seteado por
   defecto, hay que quitarlo antes de lanzar o Electron corre como Node plano sin ventana).
2. **Se confirmó con evidencia dura, de varias formas distintas, que el API REST vieja de
   Flow (`aisandbox-pa.googleapis.com`) está muerta para siempre** — incluyendo instalar la
   build oficial v1.8.7 del compañero de equipo tal cual, sin modificar, y ver que tiene el
   mismo problema (pantalla de "Sign in with Google" que nunca autentica). Detalle completo
   en `PENDIENTE_ACTUALIZACIONES_1.8.7.md`. No vale la pena retomar ese camino.
3. **Se subió el límite de espera de generación de video** de 3 a 6 minutos
   (`electron/main.cjs`, `generateVideoViaFlowUI`) — a veces Veo/Omni tardan más de 3 min.
4. **Se conectó de verdad el selector de modelo/duración/formato del panel "Imagen a Video"**
   — antes existía en la UI pero no hacía nada (la automatización lo ignoraba por completo).
   Ahora `generateVideoViaFlowUI` abre el panel de ajustes real de Flow y clickea la
   duración y relación de aspecto pedidas antes de generar. **Confirmado funcionando para
   duración** (probado: pedí 6s, se generó y descargó un video de 6s). **La relación de
   aspecto (9:16 vertical) NO quedó resuelta del todo**: el clic se ejecuta pero el video
   sigue saliendo en las dimensiones de la imagen de origen (probado: pedí 9:16, salió
   1280x720 = 16:9). Hipótesis: cuando se genera video "desde una imagen ya existente" (nuestro
   flujo, vía "Añadir ingredientes"), Flow hereda el aspect ratio de esa imagen en vez de
   respetar el toggle — el selector 16:9/9:16 puede que solo aplique al generar video desde
   cero ("Fotogramas"), no vía ingrediente. **Pendiente de investigar/confirmar.**
5. Los archivos que quedaron probados y descargados están en
   `C:\Users\<usuario>\Videos\FLOWSTUDIO\Renders\` (no dentro de la carpeta del proyecto).

## Qué ya está hecho (acumulado, todas las sesiones)

1. **Código recuperado y legible**: se extrajo del instalador, se desofuscó
   (`javascript-obfuscator` → `webcrack`), y se renombraron ~9,740 variables de `_0x...` a
   nombres legibles en 24 archivos (`electron/`, `server/`, la UI completa).
2. **Se arregló un hueco de seguridad real**: había un hash de admin por defecto hardcodeado
   en el código original (`server/index.js`) que funcionaba como puerta trasera. Se quitó.
3. **La UI quedó ejecutable de nuevo**: al desofuscar, la herramienta convirtió el código
   compilado de React a JSX literal (`<div>...</div>`), que un navegador no puede correr
   directo. Se recompiló con esbuild (quedó en `dist/assets/`). Las versiones más legibles
   en JSX puro están guardadas aparte en `jsx-backups/` por si hay que editar la UI.
4. **Se creó un proyecto de Supabase nuevo** (reemplaza al original que se perdió) con las
   6 tablas que el backend necesita — el SQL está en `supabase/schema.sql`.
5. **Se probó de punta a punta y funciona**:
   - `node server/index.js` corriendo solo (sin Electron) conecta a Supabase sin errores.
   - La UI (`dist/index.html`), servida desde ese mismo backend, carga bien en un navegador
     normal (Chrome) y la activación con licencia real funciona.
   - Se generó y canjeó una licencia de prueba: **`0632-43F1-3079`** (5 dispositivos, 365 días,
     ya vinculada — puede que ya esté canjeada, si hace falta otra corré de nuevo el `insert`
     de `supabase/schema.sql` con una key nueva).

## Cómo levantar todo en esta PC nueva

1. **Cloná este repo** (o hacé `git pull` si ya lo tenías).
2. **Instalá dependencias**:
   ```
   npm install
   ```
   (Instala Electron también — en la PC original esto falló silenciosamente por algo del
   antivirus/EDR corporativo que bloqueaba la escritura del `.exe` de Electron. Si acá pasa
   lo mismo, no te compliques: el método que SÍ funcionó fue correr el backend con Node
   directo y abrir la UI en el navegador, ver el paso 4.)
3. **Recreá el archivo de configuración privado** (este NO está en el repo, por seguridad
   — nunca se sube). **Ojo con la ubicación, es distinta según cómo corras la app** (esto
   costó bastante tiempo detectar — `electron/main.cjs` calcula `DATA_ROOT` distinto según
   `app.isPackaged`):
   - Si corrés `electron.exe .` desde el código fuente (sin empaquetar) → el archivo va
     **directo en la raíz del proyecto**: `RECOVERED_SOURCE/flowstudio.private.env`.
   - Si corrés el `.exe` ya empaquetado/instalado → va en
     `%APPDATA%\FlowTube Studio Next\flowstudio.private.env`.
   - Más simple: creá el archivo en LOS DOS lugares para no pensarlo más.

   Contenido del archivo (pedile las claves reales a quien las tenga — están en el dashboard
   de Supabase del proyecto que se creó, en Project Settings → API → pestaña "Legacy anon,
   service_role API keys"):
   ```
   SUPABASE_URL=https://sjgchclkiqyhsdzvlheu.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<pedir la clave real, no está guardada acá por seguridad>
   ```
4. **Corré la app.** Dos formas, las dos probadas y funcionando:
   - **Con Electron real** (necesario para todo lo de Google Flow — conectar cuentas, generar
     imagen/video):
     ```
     node_modules/electron/dist/electron.exe .
     ```
     (si la terminal tiene `ELECTRON_RUN_AS_NODE=1` seteado por defecto, sacalo antes:
     `env -u ELECTRON_RUN_AS_NODE node_modules/electron/dist/electron.exe .` en bash, o
     `Remove-Item Env:\ELECTRON_RUN_AS_NODE` en PowerShell — si no, abre sin ventana.)
   - **Liviano, solo backend + navegador** (más rápido, pero SIN Flow — ver
     `PENDIENTE_ACTUALIZACIONES_1.8.7.md` sobre por qué):
     ```
     cd server
     node index.js
     ```
     y abrí `http://127.0.0.1:4322` en Chrome (el backend sirve la UI desde ese mismo puerto).

## Qué falta / próximos pasos

- [ ] **Arreglar la relación de aspecto (9:16) en generación de video vía imagen existente**
      — ver punto 4 de la sesión 2026-09-12 arriba. Probablemente haya que investigar si Flow
      permite cambiar el aspect ratio de una imagen ya generada antes de animarla, o si hay
      que generar la imagen original ya en el aspect ratio correcto desde el vamos.
- [ ] Reconectar las cuentas de Google Flow si hace falta (la cuenta principal ya está
      conectada y persistida en `%APPDATA%\FlowTube Studio Next\.profile\Partitions\google_account_1`
      — viaja con el perfil de Windows si es la misma máquina/usuario).
- [ ] Revisar los hallazgos de seguridad pendientes en `RECOVERY_NOTES.md` (auto-actualizador
      sin verificación de firma, y el código muerto duplicado en el store de Zustand).
- [ ] Si quieren volver a generar un instalador `.exe` distribuible, falta armar el pipeline
      de build completo (`electron-builder` no está configurado todavía, solo se probó
      corriendo el código directo).
- [ ] Las dos features de la v1.8.7 del compañero que solo viven en el frontend compilado
      (transcripción directa de video, generador de overlays con IA) — instrucciones para
      retomarlas en `PENDIENTE_ACTUALIZACIONES_1.8.7.md`.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Backend (Node/Express) | `server/` |
| Proceso principal de Electron | `electron/` |
| UI compilada y funcional | `dist/` |
| UI en JSX legible (para editar) | `jsx-backups/` |
| Esquema de base de datos | `supabase/schema.sql` |
| Generador de hash de admin | `supabase/generar-admin-hash.js` |
| Hallazgos de seguridad y detalles del proceso | `RECOVERY_NOTES.md` |
| Este archivo | `CONTINUAR_AQUI.md` |
