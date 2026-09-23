# AnaliCSET — Rama Frontend

Esta rama del repositorio está dedicada al desarrollo del frontend de AnaliCSET.

La idea de esta estructura es mantener centralizada la parte visual y la experiencia del usuario, mientras que cada proyecto o módulo del frontend puede vivir en su propia carpeta con su propia documentación técnica.

## Objetivo de la rama

La rama `frontend` concentra la implementación de interfaces, componentes, layouts, landing pages y recursos visuales del proyecto.

En esta estructura se está trabajando con una carpeta principal para la landing page documental del proyecto, que es la presentación institucional y de posicionamiento del producto.

## Estructura del repositorio

```text
AnaliCSET/
├── README.md                         # Documentación general de la rama frontend
├── Landing Page_AnaliCSET/           # Landing page documental del proyecto
│   ├── README.md                     # Documentación local de instalación y ejecución
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── src/
│   └── ...
└── ...
```

## Rama actual

```bash
git checkout frontend
```

O bien:

```bash
git switch frontend
```

Para actualizar la rama con los cambios remotos:

```bash
git pull origin frontend
```

## Documentación por carpeta

Cada proyecto o área del frontend debe incluir su propio README con la información necesaria para instalarlo, ejecutarlo y desarrollarlo localmente.

Actualmente, la landing page documental del proyecto se encuentra en:

- `Landing Page_AnaliCSET/`

Dentro de esa carpeta existe su propio `README.md` con los pasos de instalación local y ejecución del entorno.

## Requisitos generales

Antes de trabajar con el frontend, es recomendable tener instalado:

- Node.js 20 o superior
- pnpm (recomendado)
- Git

## Instalación general

Desde la raíz del repositorio:

```bash
git fetch origin
git checkout frontend
git pull origin frontend
```

Luego, entrar a la carpeta del proyecto específico y seguir los pasos del README interno.

Ejemplo:

```bash
cd "Landing Page_AnaliCSET"
```

## Convención recomendada

- La rama `frontend` será el punto central del desarrollo visual.
- Cada proyecto visual debe vivir en una carpeta independiente.
- Cada carpeta debe tener un `README.md` propio con:
  - objetivo del proyecto
  - requisitos
  - instalación local
  - scripts disponibles
  - pasos de ejecución
  - estructura principal

## Nota

Este README documenta la rama frontend y la organización general del repositorio. Para detalles de instalación local de la landing page documental, revisar el `README.md` de la carpeta `Landing Page_AnaliCSET`.
