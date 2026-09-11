# Fase 0 — Setup del proyecto + sistema de diseño

Fecha: 2026-09-11

## Contexto

AnaliCSET es una plataforma institucional (B2B, para el SENA) que analiza el
histórico del Comité de Evaluación y Seguimiento (CSET) con IA, a partir de
actas hoy en PDF y Excel. El backend (Python/FastAPI) lo construye otro
compañero en paralelo; este repo es solo el frontend.

Antes de esta fase, la raíz del proyecto solo tenía un prototipo vanilla
(HTML/CSS/JS suelto, sin build) que se eliminó por completo.

## Decisiones

- **Monorepo con carpeta `frontend/`**: el proyecto SvelteKit vive en
  `frontend/`, para convivir con una futura carpeta `backend/` del
  compañero de FastAPI en el mismo repositorio. Git se inicializó en la raíz
  del monorepo, no dentro de `frontend/`.
- **SvelteKit skeleton, JavaScript sin TypeScript**: scaffoldeado con
  `sv create` (sucesor de `npm create svelte`, que está deprecado) usando
  `--template minimal --no-types`.
- **Tailwind CSS v4**, no v3: la guía oficial de integración SvelteKit+Tailwind
  ya no usa `tailwind.config.js`; los tokens de tema viven en un bloque
  `@theme` dentro de `src/app.css`. Se optó por seguir la guía oficial vigente
  en vez de la mención literal a `tailwind.config.js` del pedido original.
- **Svelte 5 (runes)**: el scaffold actual de SvelteKit fuerza `runes: true`.
  La reactividad nativa pedida originalmente como "`$:`, stores con writable"
  se traduce hoy a `$state`/`$derived`/`$props()` para estado local y
  `writable` de `svelte/store` para estado compartido entre componentes — el
  mismo principio (nada de Redux/Zustand/Pinia), con la sintaxis actual del
  framework.
- **`@sveltejs/adapter-static` en modo SPA**: `ssr = false` en el layout raíz
  + `fallback: '200.html'` (no `index.html`, para no chocar con una futura
  home pre-renderizada) — según la documentación oficial actual de
  SvelteKit para single-page apps.
- **Paleta institucional**: azul "ink navy" (`primary`, 50–900) + gris
  azulado (`neutral`, 50–900) + acento ámbar/cobre (`accent`, 50–700)
  **reservado exclusivamente para señales de IA/patrones** (nunca para UI
  genérica, para que el usuario aprenda a asociar ese color con "esto lo
  marcó el análisis"). Colores semánticos aparte (`success`, `danger`) para
  estados de caso normales.
- **Tipografía**: Fraunces (serif, títulos) + Public Sans (cuerpo, diseñada
  para gobierno de EE.UU./USWDS) vía Google Fonts — evitando pares genéricos
  de "plantilla de curso" (Inter/Roboto/Open Sans a secas).
- **Alcance de Fase 0** (qué se construyó y qué se deja para después, YAGNI):
  construido → scaffold, Tailwind, adapter-static, estructura de carpetas,
  los 7 componentes base, ruta `/design-system`, `api/config.js`. Diferido →
  `ChartWrapper.svelte`, los demás `api/*.js` (auth, actas, dashboard,
  patrones), JSON de mocks, store de usuario autenticado — se construyen en
  la fase que efectivamente los necesite.
- **Toast necesita estado compartido**: se agregó `src/lib/stores/toast.js`
  (no pedido explícitamente, pero necesario para que `Toast.svelte` sea
  invocable desde cualquier componente vía `toasts.add(mensaje, variante)`
  en vez de solo funcionar localmente en una página).

## Componentes base (`src/lib/components/`)

| Componente | Props principales |
|---|---|
| `Button` | `variant` (primary/secondary/danger), `loading`, `disabled` |
| `Input` | `label`, `type`, `value` (bindable), `error`, `disabled`, `required` |
| `Card` | `title`, snippets `children`/`footer` |
| `Badge` | `variant` (neutral/primary/success/danger/accent) |
| `Table` | `caption`, snippets `head`/`children` (estructura, no lógica de datos) |
| `Spinner` | `size` (sm/md/lg), `tone` (primary/white) |
| `Toast` | se monta una vez en `+layout.svelte`; se dispara vía el store `toasts` |

## Verificación

`npm run build` sin errores ni warnings. Verificado visualmente con
Playwright (canal Edge local) contra el dev server: `/` y `/design-system`
renderizan correctamente, tipografías y paleta cargan bien, sin errores de
consola (el único 404 observado es el `favicon.ico` implícito del navegador,
inofensivo).

## Pendiente para fases futuras

- Carpeta `backend/` del compañero de FastAPI.
- Regla de rewrite SPA (`/* -> /200.html`) en la configuración de Render.
- `ChartWrapper.svelte`, mocks JSON, funciones `api/*.js` por recurso, store
  de usuario autenticado — cuando la pantalla correspondiente los requiera.
