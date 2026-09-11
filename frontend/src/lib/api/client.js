import { API_BASE_URL } from './config.js';
import { getToken, clearSession } from '$lib/stores/auth.js';
import { toasts } from '$lib/stores/toast.js';

/**
 * Notifica un error de forma visual al usuario usando el store global de Toast.
 * @param {unknown} err - Error capturado o string de error
 * @param {string} fallbackMessage - Mensaje por defecto en caso de error desconocido
 */
export function notifyError(err, fallbackMessage = 'Ocurrió un error inesperado al conectar con el servidor') {
	let message = fallbackMessage;
	if (typeof err === 'string') {
		message = err;
	} else if (err instanceof Error) {
		message = err.message;
	}
	toasts.add(message, 'danger');
}

/**
 * Cliente fetch centralizado para todas las peticiones al backend FastAPI.
 * Inyecta el token Bearer, maneja expiración de sesión (401) y notifica caídas de red.
 *
 * @param {string} endpoint - Ruta relativa o completa de la API (ej: '/api/estadisticas')
 * @param {RequestInit} [options={}] - Opciones de fetch estándar
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
	const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
	const token = getToken();

	const headers = new Headers(options.headers || {});
	if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
		headers.set('Content-Type', 'application/json');
	}
	if (token && !headers.has('Authorization')) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	try {
		const response = await fetch(url, {
			...options,
			headers
		});

		if (response.status === 401) {
			clearSession();
			toasts.add('Tu sesión ha expirado. Inicia sesión nuevamente.', 'danger');
			if (typeof window !== 'undefined') {
				window.location.href = '/login';
			}
			throw new Error('Sesión expirada');
		}

		if (!response.ok) {
			let errorMsg = `Error ${response.status}: ${response.statusText}`;
			try {
				const body = await response.json();
				if (body.detail) errorMsg = body.detail;
				else if (body.message) errorMsg = body.message;
			} catch {
				// No es JSON, mantener errorMsg
			}
			throw new Error(errorMsg);
		}

		// Detecta si es respuesta JSON o binaria/texto
		const contentType = response.headers.get('content-type');
		if (contentType && contentType.includes('application/json')) {
			return await response.json();
		}
		return await response.text();
	} catch (err) {
		// Error de red (offline, backend caído, CORS)
		if (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
			const networkMsg = 'No se pudo contactar con el servidor. Verifica tu conexión.';
			toasts.add(networkMsg, 'danger');
			throw new Error(networkMsg);
		}
		throw err;
	}
}
