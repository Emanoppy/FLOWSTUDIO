# FLOWSTUDIO — Continuar desde acá

Si estás leyendo esto en otra PC: este repo es la recuperación completa del código de
FLOWSTUDIO v1.8.5 (se había perdido el código fuente del equipo). Este archivo es el
resumen de en qué quedamos, para retomar sin tener que repetir nada.

**Decile a Claude: "leé CONTINUAR_AQUI.md y RECOVERY_NOTES.md antes de seguir"** — con eso
tiene todo el contexto.

## Qué ya está hecho (verificado, funcionando)

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
   — nunca se sube). Creá el archivo:
   ```
   %APPDATA%\FlowTube Studio Next\flowstudio.private.env
   ```
   con este contenido (pedile las claves reales a quien las tenga — están en el dashboard de
   Supabase del proyecto que se creó, en Project Settings → API → pestaña "Legacy anon,
   service_role API keys"):
   ```
   SUPABASE_URL=https://sjgchclkiqyhsdzvlheu.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<pedir la clave real, no está guardada acá por seguridad>
   ```
4. **Corré la app** (el método que funcionó en la PC anterior, evita todo el lío de Electron):
   ```
   cd server
   node index.js
   ```
   Después abrí el navegador en **http://127.0.0.1:4322** (el backend sirve la UI directo
   desde ese mismo puerto, no hace falta nada más).

   Si en esta PC nueva Electron SÍ se pudo instalar bien y el `.exe` abre normal, mejor
   todavía — probá primero la app empaquetada de la forma normal.

## Qué falta / próximos pasos

- [ ] Reconectar las cuentas de Google Flow (la que ya estaba conectada vive en
      `%APPDATA%\FlowTube Studio Next\.profile\Partitions\google_account_1` — si esa carpeta
      viaja con el perfil de Windows, puede que ya esté conectada; si no, hay que reconectarla
      desde la app).
- [ ] Definir si van a seguir usando el `.exe` empaquetado o correr todo con Node+navegador
      (más simple, ya probado).
- [ ] Revisar los hallazgos de seguridad pendientes en `RECOVERY_NOTES.md` (auto-actualizador
      sin verificación de firma, y el código muerto duplicado en el store de Zustand).
- [ ] Si quieren volver a generar un instalador `.exe` distribuible, falta armar el pipeline
      de build completo (`electron-builder` no está configurado todavía, solo se probó
      corriendo el código directo).

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
