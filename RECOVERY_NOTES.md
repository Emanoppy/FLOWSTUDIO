# FLOWSTUDIO — Notas de recuperación de código

Este documento resume cómo se recuperó el código fuente de FLOWSTUDIO v1.8.5 a partir del instalador
(`FLOWSTUDIO_Setup_1.8.5_x64.exe`), y todo lo que hay que revisar como equipo antes de confiar
en este código al 100%.

## Cómo se recuperó

1. El instalador es un NSIS (electron-builder) → se extrajo con 7-Zip.
2. Dentro había `app.asar` → se extrajo con la herramienta `asar`.
3. El código estaba protegido con `javascript-obfuscator` (array de strings + control-flow
   flattening) en `electron/`, `server/` y en el frontend compilado (`dist/assets/`).
4. Se usó `webcrack` para revertir la ofuscación (recupera lógica y strings reales).
5. Los nombres de variable quedaron como identificadores tipo `_0x...` (residuo de la
   ofuscación). Se renombraron manualmente/con asistencia a nombres legibles, archivo por
   archivo, verificando sintaxis (`node --check` / `esbuild`) después de cada cambio.
6. `src/remotion/*` no necesitó nada de esto — ya estaba sin ofuscar dentro del instalador.

**Total: ~9,740 identificadores renombrados en 24 archivos**, todos verificados sintácticamente
válidos. Las librerías de terceros (`vendor-react-*.js`, `vendor-remotion-*.js`,
`vendor-state-*.js`) no se tocaron — son React/Remotion/Zustand de npm, no código propio.

## ¿Está el código 100% funcional?

**La lógica no se tocó — solo se renombraron variables.** No se modificó ningún comportamiento,
ninguna ruta de API, ninguna clave de objeto, ningún string. En ese sentido, el código debería
comportarse exactamente igual que la versión que estaba instalada y funcionando en las máquinas
del equipo.

**Pero ojo, esto NO se probó de punta a punta todavía:**
- No se hizo `npm install` ni se corrió la app real en este proceso.
- No se validó el login, el renderizado de video, la conexión a Supabase, ni la conexión a
  cuentas de Google Flow.
- Solo se verificó que cada archivo es sintácticamente válido (compila sin errores), no que el
  *comportamiento en tiempo de ejecución* sea 100% idéntico. En un archivo tan grande como el
  bundle principal, siempre existe un riesgo pequeño de que algún renombre haya chocado con otra
  variable del mismo alcance (ver sección de bugs corregidos abajo — ya se encontraron y
  arreglaron 3 casos así, pero no se puede garantizar que sean los únicos).

**Recomendación:** antes de usarlo en producción o distribuirlo de nuevo al equipo, hay que:
1. Instalar dependencias y correr la app en modo desarrollo.
2. Probar manualmente el flujo completo: login → generación de un video → exportación.
3. Ojalá con datos/cuentas de prueba antes de usar cuentas reales de producción.

## Hallazgos importantes — revisar como equipo

### 1. La vinculación por HWID es real y está activa
`server/hwid.js` + `server/database.js` + `server/supabase.js` + `server/index.js` (línea ~953).
Cada cuenta de usuario queda atada a la primera computadora desde la que inicia sesión (hash de
hostname + UUID del sistema + MAC). Si la cuenta ya tiene un HWID guardado y no coincide con la
máquina actual, el login se bloquea con error 403. Las cuentas admin se saltan este chequeo.
Existe un endpoint de reset: `POST /api/admin/users/:id/reset-hwid`.

### 2. ⚠️ El auto-actualizador no verifica firma digital
`electron/main.cjs`, handlers `updater:download` / `updater:install`. Descarga el instalador
`.exe`/`.dmg` desde el repo de GitHub `nmediastudio/flowstudio-releases`, solo valida que
empiece con los bytes mágicos de un ejecutable (`MZ`) y que no sea HTML — **no valida hash ni
firma digital** antes de ejecutar el instalador descargado con `spawn()`. Si alguien compromete
ese repo o intercepta la descarga (MITM sin HTTPS pin), podría distribuir malware a todos los
usuarios de la app. **Recomendado agregar verificación de firma/hash antes de ejecutar.**

### 3. ✅ CORREGIDO — Hash de admin por defecto hardcodeado
`server/index.js`. Había una constante `DEFAULT_ADMIN_HASH` (con el valor real del hash, ya que
tuvo que decompilarse) que se usaba como fallback silencioso si la variable de entorno
`FLOWSTUDIO_ADMIN_KEY_HASH` no estaba configurada — es decir, cualquier instalación que no
seteara esa variable quedaba con una puerta trasera de admin compartida y adivinable. **Se quitó
el valor hardcodeado antes de publicar este repo**: ahora, si la variable no está configurada, el
login de administrador queda simplemente deshabilitado (ya existía un `503 "no configurado"` para
ese caso, así que no hubo que tocar más lógica). **Confirmar que todo despliegue real tenga
`FLOWSTUDIO_ADMIN_KEY_HASH` configurado** con un valor propio para poder usar el login de admin.

### 4. La integración con Google Flow no es una API oficial
`electron/main.cjs`, función `executeFlowRequest` y relacionadas. La app abre hasta 5 ventanas
ocultas (una por cuenta de Google conectada vía `session.fromPartition`), le "roba" el token de
sesión a cada una desde `labs.google/fx/api/auth/session`, y con ese token llama directamente a
`aisandbox-pa.googleapis.com` (API interna, no documentada, de Flow/Veo/Imagen), incluyendo
resolver reCAPTCHA Enterprise manualmente vía `executeJavaScript`. Si falla (401/429/recaptcha),
rota a la siguiente cuenta oculta automáticamente.

**Esto es automatización de navegador contra un endpoint interno de Google, no una integración
oficial soportada.** Puede dejar de funcionar en cualquier momento si Google cambia algo del lado
de su servidor, y el uso de múltiples cuentas para "rotar" ante límites de tasa puede entrar en
conflicto con los Términos de Servicio de Google — es responsabilidad del equipo evaluar ese
riesgo antes de operar así con cuentas reales.

### 5. Conexión a Supabase — configuración, no código hardcodeado (buena noticia)
`server/supabase.js`. La URL y la clave (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) se leen de
un archivo local `flowstudio.private.env` (o `.env`), que **no venía incluido en el instalador**
— no hubo fuga de credenciales por este lado. Sí quedó, como dato muerto sin uso real, la
constante `DEFAULT_SUPABASE_URL = "https://hktxhsfwvvnujszlwnqj.supabase.co"`, que identifica
cuál era el proyecto de Supabase original — útil si todavía tienen acceso a esa cuenta y
necesitan recuperar la `service_role key` desde su dashboard.

### 6. Código muerto encontrado en el store de Zustand (bundle principal, UI)
En `dist/assets/index-DE7up0M0.js` hay **5 funciones definidas dos veces** con el mismo nombre
dentro del store global: `toggleSceneCharacter`, `toggleStockMotion`, `duplicateScene`,
`removeScene`, `clearAllMotionGraphics`. En JavaScript, la segunda definición pisa
silenciosamente a la primera — la primera versión de cada una nunca se ejecuta. **Se confirmó
que esto ya estaba así en el bundle original sin tocar, no es algo introducido durante la
recuperación.** Vale la pena que el equipo revise el código de esas 5 funciones (hay dos
versiones de cada una en el archivo) para decidir cuál era la intencional y borrar la otra.

## Bugs que introdujo el propio proceso de renombrado — ya corregidos

Durante el renombrado del archivo grande, 3 renombres chocaron por accidente con nombres ya
existentes en el mismo alcance. Se detectaron con el validador de sintaxis y se corrigieron antes
de dar el archivo por terminado — se listan igual para que quede constancia:
- `uploadImage`: un parámetro renombrado a `file` chocaba con un `let file` local → se renombró
  el parámetro a `fileArg`.
- Editor de subtítulos (captions): un estado local `cues` chocaba con un prop `cues`
  desestructurado → el estado quedó como `editableCues`/`setEditableCues`.
- Poller de estado de renderizado: una variable de JSON parseado y la `Response` del fetch
  quedaron ambas como `response` → se separaron en `statusData` y (por una colisión relacionada)
  `maxLastActivityAt`.

No hay garantía de que estos hayan sido los únicos casos posibles en un archivo de 15,528 líneas
— por eso la recomendación de probar la app end-to-end antes de confiar 100%.

## Qué falta para volver a compilar/publicar la app

1. `package.json` actual solo tiene las dependencias de producción — faltan las de desarrollo
   (`vite`, `electron`, `electron-builder`, etc.) para poder correr `npm run dev` / `npm run build`.
2. Archivo `flowstudio.private.env` con `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` reales.
3. Las claves/config de cualquier otra integración externa que use la app (revisar
   `server/whisper.js`, `server/media.js` por si hay más servicios de terceros).
4. Certificado de firma de código, si quieren firmar el `.exe` al empaquetar con electron-builder
   (recomendado, ver punto 2 de los hallazgos de seguridad).
