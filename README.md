# 🌐 ANALÍ CSET — Frontend (Landing Page)

Bienvenido al repositorio del frontend de **ANALÍ CSET**, la plataforma institucional para consultar y analizar el histórico del Comité de Evaluación y Seguimiento del SENA CSET.

Este directorio contiene la **Landing Page** oficial construida con **SvelteKit**, **Svelte 5** (Runes), **Tailwind CSS v4** y **TypeScript**.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:

1. **Node.js**: Versión `20.x` o superior (Recomendado Node 20 LTS o 22 LTS).
   - Para verificar tu versión: `node -v`
2. **Gestor de paquetes**:
   - **pnpm** (Recomendado, el proyecto usa `pnpm-lock.yaml`): `pnpm -v`
   - O en su defecto **npm** (viene incluido con Node.js): `npm -v`
3. **Git**: Para clonar y gestionar ramas.

---

## 🚀 Cómo Bajar la Rama y Probar la Landing

Sigue estos pasos según tu situación:

### Opción A: Si ya tienes el repositorio clonado en tu equipo

Abre una terminal dentro de la carpeta del proyecto y ejecuta:

```bash
# 1. Traer todas las referencias remotas actualizadas
git fetch origin

# 2. Cambiar a la rama frontend
git checkout frontend
# (O alternativamente: git switch frontend)

# 3. Asegurarte de tener la última versión de la rama
git pull origin frontend
```

---

### Opción B: Si vas a clonar el repositorio por primera vez

Abre tu terminal en la carpeta donde guardas tus proyectos y clona directamente la rama `frontend`:

```bash
# Clonar directamente la rama frontend
git clone -b frontend https://github.com/alejoxpp/AnaliCSET.git

# Entrar a la carpeta del proyecto
cd AnaliCSET
```

*(Nota: Si en tu estructura de carpetas la landing está dentro del subdirectorio `landing_page`, entra con `cd landing_page`).*

---

## 📦 Instalación de Dependencias

Una vez estés ubicado dentro de la carpeta del proyecto (donde se encuentra `package.json`), instala las dependencias:

### Con pnpm (Recomendado):
```bash
pnpm install
```

### Con npm:
```bash
npm install
```

---

## 💻 Ejecución en Modo Desarrollo

Para iniciar el servidor local de desarrollo:

### Con pnpm:
```bash
# Iniciar y abrir automáticamente en tu navegador predeterminado
pnpm dev -- --open

# O simplemente iniciar el servidor local
pnpm dev
```

### Con npm:
```bash
# Iniciar y abrir automáticamente en tu navegador predeterminado
npm run dev -- --open

# O simplemente iniciar el servidor local
npm run dev
```

Una vez iniciado, abre tu navegador en:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🛠️ Scripts Disponibles

En `package.json` dispones de los siguientes comandos:

| Comando (pnpm / npm) | Descripción |
|---|---|
| `pnpm dev` / `npm run dev` | Inicia el servidor de desarrollo Vite con Hot Module Replacement (HMR). |
| `pnpm build` / `npm run build` | Compila la aplicación optimizada para producción en `.svelte-kit/output`. |
| `pnpm preview` / `npm run preview` | Previsualiza localmente el build de producción antes de desplegar. |
| `pnpm check` / `npm run check` | Ejecuta `svelte-check` y comprueba la validez estática de tipos con TypeScript. |

---

## 🏗️ Stack Tecnológico de la Landing

- **Framework Web:** [SvelteKit 2](https://kit.svelte.dev/)
- **Librería de Componentes:** [Svelte 5](https://svelte.dev/) (utilizando Runes reactivos como `$state`)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) integrado nativamente con `@tailwindcss/vite`
- **Iconos:** [Lucide Svelte](https://lucide.dev/) (`lucide-svelte`)
- **Tipado:** [TypeScript](https://www.typescriptlang.org/)
- **Empaquetador y Servidor Dev:** [Vite 8](https://vite.dev/)

---

## 📁 Estructura del Código

```text
src/
├── app.css              # Configuración y directivas globales de Tailwind CSS v4
├── app.html             # Shell HTML de entrada
├── lib/
│   ├── components/      # Componentes UI reutilizables (Hero, Navbar, Footer, Features)
│   ├── theme.svelte.ts  # Estado reactivo del tema visual (Light / Dark mode)
│   ├── a11y.svelte.ts   # Utilidades y estado para accesibilidad
│   ├── types.ts         # Contratos e interfaces de TypeScript
│   └── data/            # Textos y datos estáticos de la landing institucional
└── routes/
    ├── +layout.svelte   # Layout global (Navbar persistente, Footer y contenedor)
    └── +page.svelte     # Vista principal de la Landing Page de ANALÍ CSET
```

---

## ❓ Preguntas Frecuentes y Solución de Problemas

### 1. Error de políticas de ejecución en Windows PowerShell (`about_Execution_Policies`)
Si al ejecutar `pnpm` en PowerShell te aparece un error que dice que la ejecución de scripts está deshabilitada:
- **Solución rápida:** Ejecuta el comando usando `pnpm.cmd dev` o usa `npx pnpm dev`.
- **Solución permanente:** Abre PowerShell como Administrador y ejecuta:  
  `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

### 2. El puerto 5173 ya está en uso
Si ya tienes otro servicio corriendo en el puerto 5173, Vite automáticamente te ofrecerá el siguiente puerto (por ejemplo, `http://localhost:5174`). También puedes especificar otro puerto con:
```bash
pnpm dev -- --port 3000
```

### 3. Limpiar caché en caso de errores inesperados
Si experimentas errores de dependencias tras cambiar de rama:
```bash
# Eliminar carpeta de build y módulos
rm -rf node_modules .svelte-kit
pnpm install
```
