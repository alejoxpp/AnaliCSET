# REQUERIMIENTOS.md

> 📋 **Este documento corresponde a los requerimientos del proyecto AnaliCset para el Hackathon.**

---

# 1. Identidad del equipo

- **Nombre del equipo:** AnaliCset
- **Nombre del proyecto:** AnaliCset

| Integrante | Rol | Responsable de |
|------------|-----|----------------|
| José Alejandro Pérez | ⚙️ DevOps | Repositorio, Git, CI/CD y despliegue |
| Kevin Pedraza | 🎨 Frontend | Interfaz de usuario, estilos y experiencia |
| Dylan Hernández | 🔧 Backend | API REST, lógica del sistema y base de datos |
| Juan Felipe Aguillón | 🧭 PM | Gestión del proyecto, QA, entregas y comunicación con el cliente |

> Los datos y la funcionalidad principal serán trabajados por todo el equipo.

---

# 2. Visión del proyecto

## La idea en una frase

Desarrollar una plataforma web que permita analizar el histórico del Comité de Evaluación y Seguimiento del CSET mediante análisis de datos e inteligencia artificial para identificar patrones, tendencias y apoyar la toma de decisiones.

### ¿Para quién es?

- Personal del área de Apoyo de Comité.
- Coordinadores académicos.
- Directivos del CSET.
- Funcionarios del SENA.

### ¿Qué problema resuelve?

Actualmente la información histórica del comité se encuentra distribuida en documentos PDF y archivos Excel, dificultando el análisis de tendencias, reincidencias y estadísticas que apoyen la gestión institucional.

### Visión

Crear una plataforma institucional que centralice, organice y analice la información histórica utilizando inteligencia artificial para convertir los datos en información útil para la toma de decisiones.

### Modelo

**B2B (Institucional).**

### ¿Cómo genera valor?

- Reduce tiempos de consulta.
- Automatiza el análisis documental.
- Facilita la elaboración de informes.
- Identifica patrones difíciles de detectar manualmente.
- Mejora la gestión del conocimiento institucional.

---

# 3. Funcionalidades (Alcance)

| Funcionalidad | ¿MVP? | ¿Extra? | Responsable |
|---------------|:-----:|:-------:|-------------|
| Inicio de sesión | ✅ | | Backend |
| Dashboard principal | ✅ | | Frontend |
| Gestión de usuarios | ✅ | | Backend |
| Carga de archivos PDF | ✅ | | Backend |
| Carga de archivos Excel | ✅ | | Backend |
| Almacenamiento de información histórica | ✅ | | Backend |
| Consulta de actas | ✅ | | Backend |
| Filtros por fecha y consecutivo | ✅ | | Frontend |
| Visualización de estadísticas | ✅ | | Frontend |
| Detección de patrones mediante IA | ✅ | | Todo el equipo |
| Generación de reportes | | ✅ | Backend |
| Exportar resultados a PDF | | ✅ | Backend |
| Dashboard avanzado | | ✅ | Frontend |
| Predicción de tendencias | | ✅ | Todo el equipo |

---

# 4. Requerimientos técnicos

- [x] **Frontend:** HTML5 + CSS3 + JavaScript.
- [x] **Backend:** Node.js + Express.
- [x] **Base de datos:** MySQL.
- [x] **Feature clave:** Análisis inteligente del histórico del Comité mediante IA para detectar patrones y tendencias.
- [ ] **Tiempo real (Socket.IO):** No será utilizado en el MVP.
- [x] **Autenticación:** Login con usuario y contraseña utilizando JWT.
- [x] **Otra técnica / API externa:**
  - OpenAI API
  - PDF.js
  - SheetJS
  - Chart.js

## Tablas de datos previstas

```sql
usuarios(
    id,
    nombre,
    correo,
    password,
    rol
);

actas(
    id,
    fecha,
    consecutivo,
    archivo_pdf,
    archivo_excel
);

casos(
    id,
    id_acta,
    tipo,
    descripcion,
    estado
);

patrones(
    id,
    nombre,
    descripcion,
    porcentaje
);

reportes(
    id,
    fecha,
    tipo,
    archivo_generado
);
```

---

# 5. Requerimientos de despliegue

- **Frontend:** Vercel
- **Backend:** Render
- **Base de datos:** Railway MySQL
- **Dominio:** Subdominio gratuito
- **CI/CD:** Sí, mediante GitHub Actions
- **Link del proyecto:** Pendiente

## Costos estimados

| Recurso | Proveedor / Plan | Costo estimado |
|----------|------------------|----------------|
| Backend | Render Starter | USD $7/mes |
| Base de datos | Railway | USD $5/mes |
| Dominio | Namecheap | USD $12/año |
| **Total** | | **USD $12/mes + dominio** |

---

# 6. Plan de trabajo

| Clases | Qué esperamos terminar |
|--------|------------------------|
| 07-08 | Configuración del servidor, Express y API |
| 09-10 | Base de datos y persistencia |
| 11-13 | Procesamiento documental e IA |
| 14-15 | Integración completa y despliegue |
| 16 | Demo final y pruebas |

---

# 7. Riesgos y dudas para el cliente

## Riesgos

- Calidad de los documentos PDF históricos.
- Información incompleta en algunos registros.
- Diferencias entre formatos de actas.
- Tiempo de procesamiento de grandes volúmenes de información.
- Límites de uso de APIs de IA.

## Preguntas para el instructor

- ¿Todas las actas poseen la misma estructura?
- ¿Habrá acceso a la totalidad del histórico?
- ¿Qué datos deben anonimizarse?
- ¿Cuál es el volumen aproximado de documentos?
- ¿Se espera únicamente análisis descriptivo o también modelos predictivos?