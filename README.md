# Plantilla de requerimientos del proyecto (Clase 06)

> 📋 **Este documento es la INSCRIPCIÓN al hackathon.** Cada equipo lo copia a su repositorio (como
> `REQUERIMIENTOS.md`) y lo entrega lleno en la **Clase 06**.
> **Equipo que no entregue sus requerimientos NO participa por el premio.**

El **PM lidera** esta reunión y es el canal con el instructor (que hace de cliente) para dudas.

---

## 1. Identidad del equipo

- **Nombre del equipo:**
- **Nombre del proyecto:**
- **Integrantes y roles:**
  | Integrante | Rol | Responsable de |
  |-----------|-----|----------------|
  | | ⚙️ DevOps | Repo, Git, CI/CD, despliegue |
  | | 🎨 Frontend | Interfaz, estilos, interacción |
  | | 🔧 Backend | Servidor, API, lógica + BD |
  | | 🧭 PM | Canal con el cliente, QA, entregas, desbloquear al equipo |
  | | *(otros integrantes)* | Comparten Frontend/Backend según el tamaño del equipo |

> **Datos** y la **feature clave** las conoce y las trabaja **todo el equipo** (son la estructura del
> proyecto, no un rol aparte).

---

## 2. Visión del proyecto

**La idea en una frase:** _..._

- **¿Para quién es? (usuarios):**
- **¿Qué problema resuelve o qué permite hacer?:**
- **Visión (a dónde quieren llevarlo):**
- **Modelo:** ¿es **B2B** (para empresas) o **B2C** (para consumidores/usuarios finales)?
- **¿Cómo generaría valor o dinero?** (si aplica): _..._

---

## 3. Funcionalidades (alcance)

Marca lo que SÍ entra en el MVP (lo mínimo para la Demo Day) y lo que sería "extra si da tiempo".

| Funcionalidad | ¿MVP? | ¿Extra? | Responsable |
|---------------|:-----:|:-------:|-------------|
| Ej: registro e inicio de sesión | ✅ | | Backend |
| | | | |
| | | | |

> Regla: si algo no está en el MVP, **no se construye hasta terminar el MVP**. Primero lo esencial.

---

## 4. Requerimientos técnicos (cómo lo van a hacer)

Deben cubrir **los mínimos del curso**. Marquen qué usarán:

- [ ] **Frontend:** HTML semántico + CSS + JavaScript (DOM).
- [ ] **Backend:** Node.js + Express (API con rutas).
- [ ] **Base de datos:** _¿cuál? (SQLite / PostgreSQL / MySQL / otra)_ — listar tablas abajo.
- [ ] **Feature clave:** _¿cuál es la funcionalidad estrella del proyecto?_
- [ ] **Tiempo real (Socket.IO):** ¿lo usarán? _(suma puntos)_
- [ ] **Autenticación:** ¿login con contraseña? ¿sesiones?
- [ ] **Otra técnica / API externa:** _¿cuál?_

**Tablas de datos previstas (borrador):**
```
usuarios(id, nombre, correo, clave_hash, ...)
...
```

---

## 5. Requerimientos de despliegue

- **Frontend se desplegará en:** _(GitHub Pages / Netlify / Vercel / …)_
- **Backend se desplegará en:** _(Render / Railway / Fly.io / VPS / … — ver [../DESPLIEGUE-CICD.md](../DESPLIEGUE-CICD.md))_
- **Base de datos:** _(archivo SQLite junto a la app / servicio gestionado / …)_
- **Dominio:** _(subdominio gratis del host / dominio propio)_
- **CI/CD:** ¿cada `push` actualiza el sitio? (debe ser **sí**)
- **Link del proyecto (cuando exista):** _..._

### Costos estimados de servidores
Aunque usemos capas gratuitas para el curso, estimen qué costaría en "producción real":

| Recurso | Proveedor / plan | Costo estimado (mes) |
|---------|------------------|----------------------|
| Hosting del backend | | |
| Base de datos | | |
| Dominio | | (anual) |
| **Total estimado** | | |

---

## 6. Plan de trabajo (grueso)

| Clases | Qué esperamos terminar |
|--------|------------------------|
| 07–08 (backend) | Servidor + API base |
| 09–10 (datos) | Datos que persisten |
| 11–13 (feature / auth / tiempo real) | La feature clave del proyecto |
| 14–15 (integración) | Todo junto + desplegado |
| 16 | Demo lista y ensayada |

---

## 7. Riesgos y dudas para el cliente (las lleva el PM)

- **Lo que más nos preocupa:** _..._
- **Preguntas para el instructor (cliente):** _(las hace el PM)_

---

> ✅ **Entregable de la Clase 06 (inscripción):** este archivo lleno y subido al repo del equipo
> (commit del PM o del DevOps). Sin él, el equipo no participa por el premio.
