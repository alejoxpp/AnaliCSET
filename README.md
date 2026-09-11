# Plantilla de requerimientos del proyecto 

## 1. Identidad del equipo

- **Nombre del equipo:** AnaliCSET
- **Nombre del proyecto:** Análisis Histórico del Comité CSET con IA
- **Integrantes y roles:**

| Integrante | Rol | Responsable de|
|-----------|-----|----------------|
| José Alejandro Pérez | ⚙️ DevOps | Repo, Git, CI/CD, despliegue |
| Kevin Santiago Pedraza | 🎨 Frontend | Interfaz, estilos, interacción |
| Dylan Hernandez | 🔧 Backend | Servidor, API, lógica + BD |
| Juan Felipe Aguillón | 🧭 PM | Canal con el cliente, QA, entregas, desbloquear al equipo |

> **Datos** y la **feature clave** las conoce y las trabaja **todo el equipo** (son la estructura del
> proyecto, no un rol aparte).

---

## 2. Visión del proyecto

**La idea en una frase:** Análisis histórico de los comités de evaluación mediante inteligencia artificial para la identificación de patrones en los casos tratados.

- **¿Para quién es? (usuarios):** Para el área de Apoyo de Comité, Evaluaciones y Seguimiento, además de la coordinación académica del SENA CSET Bucaramanga.
- **¿Qué problema resuelve o qué permite hacer?:** Resuelve la falta de análisis automatizado de datos distribuidos en actas PDF y Excels, permitiendo identificar causas recurrentes y convertir registros estáticos en conocimiento útil.
- **Visión (a dónde quieren llevarlo):** Crear un sistema centralizado que permita explorar el histórico documental para detectar tendencias de manera automatizada y generar informes de apoyo.
- **Modelo:** ¿es **B2B** (para empresas) o **B2C** (para consumidores/usuarios finales)? B2B Institucional (desarrollo interno para uso administrativo).
- **¿Cómo generaría valor o dinero?** (si aplica): Genera valor al optimizar el tiempo de análisis de datos institucionales y apoyar el diseño de estrategias de prevención académica.

---

## 3. Funcionalidades (alcance)[cite: 3]

Marca lo que SÍ entra en el MVP (lo mínimo para la Demo Day) y lo que sería "extra si da tiempo".[cite: 3]

| Funcionalidad | ¿MVP? | ¿Extra? | Responsable[cite: 3]|
|---------------|:-----:|:-------:|-------------|
| Recolección y extracción de texto de actas PDF/Excel | ✅ | | Backend |
| Estructuración de datos y carga a base de datos | ✅ | | DevOps / Backend |
| Interfaz web para visualización del histórico | ✅ | | Frontend |
| Clasificación de casos y detección de patrones con IA | ✅ | | Todo el equipo |
| Generación de informes exportables y métricas | | ✅ | Frontend / Backend |

> Regla: si algo no está en el MVP, **no se construye hasta terminar el MVP**. Primero lo esencial.[cite: 3]

---

## 4. Requerimientos técnicos (cómo lo van a hacer)[cite: 3]

Deben cubrir **los mínimos del curso**. Marquen qué usarán:[cite: 3]

- [x] **Frontend:** HTML semántico + CSS + JavaScript (DOM).[cite: 3]
- [x] **Backend:** Node.js + Express (API con rutas) integrando procesamiento de datos en Python.[cite: 3]
- [x] **Base de datos:** _¿cuál?_ Supabase (PostgreSQL) — listar tablas abajo.[cite: 3]
- [x] **Feature clave:** _¿cuál es la funcionalidad estrella del proyecto?_ Uso de Inteligencia Artificial para el agrupamiento de información, clasificación de tipos de casos y análisis de tendencias.[cite: 3]
- [ ] **Tiempo real (Socket.IO):** ¿lo usarán? _(suma puntos)_ No, el enfoque analítico procesa datos estáticos e históricos de manera asíncrona.[cite: 3]
- [x] **Autenticación:** ¿login con contraseña? ¿sesiones? Sí, login para control de acceso del personal administrativo.[cite: 3]
- [x] **Otra técnica / API externa:** _¿cuál?_ Integración con APIs de modelos de lenguaje (LLM) y librerías de extracción de datos documentales.[cite: 3]

**Tablas de datos previstas (borrador):**[cite: 3]
sql
usuarios(id, nombre, correo, clave_hash, rol)
actas_comite(id, consecutivo, fecha, url_documento)
casos_evaluados(id, acta_id, aprendiz_id, descripcion, resolucion)
patrones_ia(id, caso_id, categoria, etiquetas, nivel_frecuencia)


## 5. Requerimientos de despliegue

- **Frontend se desplegará en:** Vercel o Netlify.
- **Backend se desplegará en:** Render.
- **Base de datos:** Supabase.
- **Dominio:** Subdominio gratis del host (analicset.vercel.app).
- **CI/CD:** ¿cada push actualiza el sitio? (debe ser sí) Sí.
- **Link del proyecto (cuando exista):** https://github.com/alejoxpp/AnaliCSET

### Costos estimados de servidores
Aunque usemos capas gratuitas para el curso, estimen qué costaría en "producción real":

| Recurso | Proveedor / plan | Costo estimado (mes) |
|---------|------------------|----------------------|
| Hosting del backend | Render (Plan Starter) | $7 USD |
| Base de datos | Supabase (Pro Plan) | $25 USD |
| Dominio | Namecheap (anual) | $15 USD |
| API de IA | OpenAI / Gemini API (pago por tokens) | $15 USD |
| **Total estimado** | | **$62 USD / mes** |

---

## 6. Plan de trabajo (grueso)

| Clases | Qué esperamos terminar |
|--------|------------------------|
| 07–08 (backend) | Servidor API base y scripts de extracción de PDFs/Excel. |
| 09–10 (datos) | Estructuración y persistencia del histórico en la base de datos PostgreSQL. |
| 11–13 (feature / auth / tiempo real) | Implementación de modelos de IA para clasificar casos y sistema de autenticación. |
| 14–15 (integración) | Integración frontend-backend, desarrollo de visualizaciones y despliegue CI/CD. |
| 16 | Demo lista, ensayada y exportación de patrones finalizada. |

---

## 7. Riesgos y dudas para el cliente (las lleva el PM)

- **Lo que más nos preocupa:** La variabilidad y legibilidad del formato en las actas históricas en PDF, además del manejo seguro y la privacidad de los datos sensibles (nombres y documentos) de los casos disciplinarios.
