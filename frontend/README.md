# AnaliCSET — Frontend

Frontend institucional (B2B, SENA) del análisis del histórico del Comité de
Evaluación y Seguimiento (CSET). SvelteKit + Tailwind CSS, consumiendo una
API externa (FastAPI) construida en paralelo.

## Stack

- **SvelteKit** (skeleton, JavaScript, sin TypeScript) con **Svelte 5** (runes:
  `$state`, `$derived`, `$props()`). Reactividad nativa, sin librerías externas
  de manejo de estado — estado compartido vía stores (`writable`) en
  `src/lib/stores/`.
- **Tailwind CSS v4** — los tokens de marca (colores, tipografía) se definen
  en un bloque `@theme` dentro de `src/app.css`, no hay `tailwind.config.js`
  (así es la integración v4 con SvelteKit).
- **@sveltejs/adapter-static** en modo SPA: `ssr = false` en
  `src/routes/+layout.js` + `fallback: '200.html'` en `vite.config.js`. Para
  desplegar en Render como sitio estático hay que configurar una regla de
  rewrite `/* -> /200.html` (pendiente en la fase de despliegue).
- **Chart.js**, envuelto en `src/lib/components/ChartWrapper.svelte`, se
  añade cuando exista una pantalla que lo necesite (no en Fase 0).

## Estructura

```
src/
  routes/               páginas (file-based routing)
  lib/
    components/         Button, Input, Card, Badge, Table, Spinner, Toast
    api/                config.js (API_BASE_URL) + un archivo por recurso
                         (auth.js, actas.js, dashboard.js, patrones.js...)
    mocks/              JSON de prueba con la forma de la respuesta real,
                         mientras el backend no esté listo
    stores/             stores de Svelte (toast.js, usuario autenticado...)
```

Antes de construir una pantalla nueva, revisa `/design-system` — reúne todos
los componentes base con sus variantes.

## Variables de entorno

`API_BASE_URL` (en `src/lib/api/config.js`) lee `VITE_API_BASE_URL` y cae a
`http://localhost:8000` si no está definida. Para otro backend, crea un
`.env` en esta carpeta:

```
VITE_API_BASE_URL=https://api.ejemplo.com
```

## Desarrollo

```sh
npm install
npm run dev -- --open
```

## Build

```sh
npm run build      # genera build/ (adapter-static)
npm run preview    # sirve el build de producción localmente
```
