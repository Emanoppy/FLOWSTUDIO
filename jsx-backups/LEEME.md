# Versiones en JSX legible (no ejecutables directamente)

Estos archivos son una versión intermedia de `dist/assets/*.js`, generada por `webcrack`
durante la recuperación. Tienen sintaxis JSX literal (`<div>...</div>`) en vez de las llamadas
`jsx(...)` compiladas — son **más fáciles de leer como referencia**, pero un navegador no
los puede ejecutar directamente tal cual.

Los archivos que realmente corren (en `dist/assets/`) son el resultado de compilar estos con
esbuild (`--jsx=automatic --jsx-import-source=./jsx-shim`). Si necesitás editar la UI, es más
fácil partir de estos archivos JSX, editarlos, y volver a compilarlos con ese mismo comando.
