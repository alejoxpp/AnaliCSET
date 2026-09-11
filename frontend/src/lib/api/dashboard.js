import mockDashboard from '$lib/mocks/dashboard.json';
import { apiFetch, notifyError } from './client.js';

/**
 * Obtiene el resumen para el Dashboard principal.
 * @returns {Promise<any>}
 */
export async function getDashboardSummary() {
	try {
		await new Promise((resolve) => setTimeout(resolve, 350));
		return mockDashboard;
	} catch (err) {
		notifyError(err, 'No se pudo cargar el resumen del dashboard');
		throw err;
	}
}
