import mockPatrones from '$lib/mocks/patrones.json';
import { apiFetch, notifyError } from './client.js';

/**
 * Obtiene el catálogo completo de patrones detectados por IA.
 * Contrato Backend: GET /api/patrones
 *
 * @returns {Promise<Array<any>>}
 */
export async function getPatrones() {
	try {
		// TODO: Reemplazar por `apiFetch('/api/patrones')` cuando el backend esté activo
		await new Promise((resolve) => setTimeout(resolve, 300));
		return mockPatrones.patrones;
	} catch (err) {
		notifyError(err, 'No se pudo cargar el catálogo de patrones IA');
		throw err;
	}
}

/**
 * Obtiene los patrones de IA vinculados a un acta determinada.
 * @param {string} idActa
 * @returns {Promise<Array<any>>}
 */
export async function getPatronesByActaId(idActa) {
	try {
		await new Promise((resolve) => setTimeout(resolve, 200));
		const patrones = mockPatrones.patrones.filter(
			(p) => p.actas_asociadas && p.actas_asociadas.includes(String(idActa))
		);

		// Fallback demostrativo si no está explícito en el mock
		if (patrones.length === 0) {
			return [mockPatrones.patrones[0]];
		}

		return patrones;
	} catch (err) {
		notifyError(err, 'No se pudieron cargar los patrones relacionados al acta');
		throw err;
	}
}
