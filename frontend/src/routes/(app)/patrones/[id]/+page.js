import { getPatronById } from '$lib/api/patrones.js';
import { getActas } from '$lib/api/actas.js';

export async function load({ params }) {
	try {
		const [patron, todasActas] = await Promise.all([
			getPatronById(params.id),
			getActas()
		]);

		// Filtrar actas asociadas si están definidas
		const actasAsociadas = todasActas.filter((a) =>
			patron.actas_asociadas ? patron.actas_asociadas.includes(a.id) : false
		);

		return {
			patron,
			actasAsociadas: actasAsociadas.length > 0 ? actasAsociadas : todasActas.slice(0, 3),
			error: null
		};
	} catch (err) {
		return {
			patron: null,
			actasAsociadas: [],
			error: err instanceof Error ? err.message : 'No se pudo cargar la información del patrón'
		};
	}
}
