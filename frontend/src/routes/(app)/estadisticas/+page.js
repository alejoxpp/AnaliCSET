import { getEstadisticas } from '$lib/api/estadisticas.js';

export async function load() {
	const estadisticas = await getEstadisticas();
	return { estadisticas };
}
