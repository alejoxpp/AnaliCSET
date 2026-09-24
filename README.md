# AnaliCSET — Rama Frontend

Plataforma web para el análisis, trazabilidad y gestión histórica del **Comité de Evaluación y Seguimiento (CSET)** del **SENA — Centro de Servicios Empresariales y Turísticos (Regional Santander, Bucaramanga)**.

Esta rama (`frontend`) centraliza el desarrollo de las interfaces de usuario, componentes reactivos, sistema de diseño visual y flujos de autenticación de la aplicación.

---

## 🎯 Contexto del Proyecto

El sistema **AnaliCSET** tiene como objetivo optimizar la trazabilidad y la toma de decisiones institucionales en los comités evaluativos del SENA CSET mediante:

* **Trazabilidad integral:** Seguimiento estructurado a las decisiones, citaciones y recomendaciones del comité.
* **Historial centralizado:** Repositorio ágil para la consulta y análisis de casos acumulados.
* **Acceso seguro:** Autenticación y control de visibilidad basado en roles de usuario.

---

## 🏗️ Estructura del Repositorio

```text
AnaliCSET/
├── README.md                     # Documentación principal del repositorio y contexto del frontend
└── frontend/                     # Aplicación web desarrollada en SvelteKit + Tailwind CSS
    ├── README.md                 # Guía técnica específica del entorno frontend
    ├── package.json              # Dependencias y scripts de ejecución
    ├── svelte.config.js          # Configuración del framework SvelteKit
    ├── tailwind.config.js        # Tokens de diseño y paleta institucional
    ├── vite.config.js            # Configuración de Vite
    ├── static/                   # Recursos estáticos (favicons, íconos)
    └── src/
        ├── app.html              # Plantilla HTML base
        ├── app.css               # Directivas de Tailwind CSS
        ├── lib/
        │   └── assets/           # Logotipos institucionales (PNG, SVG transparentes)
        └── routes/
            ├── +layout.svelte    # Layout global de la aplicación
            ├── +page.svelte      # Ruta raíz
            └── login/
                └── +page.svelte  # Interfaz de Login (Split-screen responsive)
```

---

## 🎨 Sistema de Diseño (Design Tokens)

El diseño visual está alineado con la identidad corporativa y configurado en `frontend/tailwind.config.js`:

| Token | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `brand-blue` | `#0E6DFF` | Color primario, botones CTA, enlaces y estados de foco |
| `brand-blue-dark`| `#0A52C7` | Fondo del panel institucional y estados hover de botones |
| `accent-cyan` | `#00C2FF` | Inicio del degradado insignia institucional |
| `accent-green` | `#25ED4D` | Fin del degradado insignia institucional |
| `ink` | `#0F172A` | Títulos principales y texto de alto contraste |
| `ink-soft` | `#475569` | Subtítulos, labels secundarios y textos descriptivos |
| `surface` | `#F8FAFC` | Fondo neutro claro de la interfaz |

---

## 🚀 Módulos Implementados en esta Rama

### 1. Autenticación (`/login`)
* **Layout Split-Screen 50/50:**
  * **Panel Izquierdo (Desktop):** Fondo en `brand-blue-dark`, textura geométrica abstracta, resplandor difuminado sutil, branding de AnaliCSET, línea decorativa en degradado cian-verde y viñetas de valor institucional con checks.
  * **Panel Derecho:** Formulario de inicio de sesión centrado, con tipografía refinada, campos accesibles y estados interactivos claros.
* **Responsive Mobile-First:**
  * Ocultación del panel de branding en pantallas menores a `lg` (`1024px`).
  * Cabecera compacta con logo visible automáticamente en dispositivos móviles y tablets.
  * Prevención de auto-zoom en iOS Safari (`text-base sm:text-sm`).
  * Áreas de toque cómodas (≥44px) para botones, checkbox y toggle de visibilidad.
  * Scroll vertical seguro (`overflow-y-auto`) para evitar desbordes en teclados virtuales o pantallas apaisadas.
* **Validación Reactiva (Svelte 5 Runes):**
  * Manejo reactivo de estado con `$state` y `$derived`.
  * Validación en tiempo real de campos vacíos y longitud mínima de contraseña (≥ 6 caracteres).
  * Alerta de error accesible con soporte ARIA (`role="alert"`, `aria-live="polite"`).
  * Toggle interactivo para mostrar/ocultar contraseña con íconos vectoriales SVG.

---

## 💻 Requisitos e Instalación

### Requisitos Previos
* **Node.js:** Versión 18 o superior (recomendado Node 20 LTS).
* **Gestor de paquetes:** npm, pnpm o yarn.

### Pasos para Ejecutar Localmente

1. **Clonar o situarse en la rama `frontend`:**
   ```bash
   git checkout frontend
   ```

2. **Ingresar a la carpeta del frontend:**
   ```bash
   cd frontend
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación quedará disponible en `http://localhost:5173/login`.

5. **Compilar para producción (validación de build):**
   ```bash
   npm run build
   ```

---

## 📌 Guía de Colaboración

* Mantener los cambios concentrados en la subcarpeta `frontend/`.
* No alterar los tokens de color base sin previa validación de diseño institucional.
* Probar siempre la responsividad en resoluciones móvil (`375px`), tablet (`768px`) y escritorio (`1024px+`).
