import { getEstadisticas, getComparativaAnual, getPrediccionTendencias } from '$lib/api/estadisticas.js';

export async function load() {
	const [estadisticas, comparativaAnual, prediccionIA] = await Promise.all([
		getEstadisticas({ rango: 'anioCompleto' }),
		getComparativaAnual(),
		getPrediccionTendencias()
	]);

	return { estadisticas, comparativaAnual, prediccionIA };
}
