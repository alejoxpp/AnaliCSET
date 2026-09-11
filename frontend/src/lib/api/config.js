// Único punto de configuración de la API. Los módulos de src/lib/api/*.js
// (auth, actas, dashboard, patrones...) importan API_BASE_URL desde aquí
// en vez de repetir la URL del backend por el código.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';
