import { getActaById } from '$lib/api/actas.js';
import { getCasosByActaId } from '$lib/api/casos.js';
import { getPatronesByActaId } from '$lib/api/patrones.js';

export async function load({ params }) {
	try {
		const [acta, casos, patrones] = await Promise.all([
			getActaById(params.id),
			getCasosByActaId(params.id),
			getPatronesByActaId(params.id)
		]);

		return {
			acta,
			casos,
			patrones,
			error: null
		};
	} catch (err) {
		return {
			acta: null,
			casos: [],
			patrones: [],
			error: err instanceof Error ? err.message : 'Acta no encontrada en el sistema'
		};
	}
}
