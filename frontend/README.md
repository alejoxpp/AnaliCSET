# AnaliCSET — Frontend Application

Aplicación web desarrollada con **SvelteKit 2**, **Svelte 5** y **Tailwind CSS** para el proyecto **AnaliCSET** (Comité de Evaluación y Seguimiento — CSET Bucaramanga, SENA).

---

## 🛠️ Tecnologías y Herramientas

* **Framework:** [SvelteKit 2](https://kit.svelte.dev/) con [Svelte 5](https://svelte.dev/) (usando Runes: `$state`, `$derived`, `$props`).
* **Estilos:** [Tailwind CSS v3](https://tailwindcss.com/) configurado con tokens corporativos.
* **Empaquetador y Dev Server:** [Vite 8](https://vitejs.dev/).
* **Íconos y Gráficos:** SVG inline accesibles y recursos vectoriales institucionales.

---

## 📂 Estructura del Código Fuente

```text
frontend/
├── src/
│   ├── app.html              # Shell HTML con viewport responsive y metadatos
│   ├── app.css               # Importación de directivas @tailwind
│   ├── lib/
│   │   └── assets/           # Logotipos (PNG / SVG transparentes) y favicons
│   └── routes/
│       ├── +layout.svelte    # Shell global (favicon, metadatos y CSS global)
│       ├── +page.svelte      # Ruta de inicio
│       └── login/
│           └── +page.svelte  # Interfaz de Login (Split-screen responsive + Runes)
├── static/                   # Favicons e íconos estáticos
├── tailwind.config.js        # Paleta de colores oficial (brand-blue, accent-cyan, etc.)
└── package.json
```

---

## 🚀 Scripts Disponibles

En este directorio (`frontend/`), puedes ejecutar:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo Vite con hot-reload en `http://localhost:5173/` |
| `npm run build` | Genera el bundle optimizado para producción |
| `npm run preview` | Previsualiza localmente el build de producción |

---

## 📱 Consideraciones de Responsive Design

* **Móvil (< 640px):** Formulario centrado a pantalla completa con cabecera compacta que incluye el isotipo de AnaliCSET. Inputs configurados con `text-base` para prevenir auto-zoom no deseado en iOS Safari.
* **Tablet (640px – 1023px):** Contenedor delimitado (`max-w-[400px]`), paddings amplios y zonas táctiles confortables (≥44px de altura).
* **Escritorio (≥ 1024px):** Layout split-screen 50/50 con panel de branding institucional a la izquierda y formulario de acceso a la derecha.

---

## 🔒 Convenciones y Validación

* **Svelte 5 Runes:** Se emplea la sintaxis moderna (`$state`, `$derived`) en lugar de variables let mutables tradicionales.
* **Accesibilidad (a11y):** Etiquetas `<label>` explícitamente enlazadas mediante `for`, mensajes de error con `role="alert"` y atributos ARIA correspondientes.
