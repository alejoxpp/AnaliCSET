import mockEstadisticas from '$lib/mocks/estadisticas.json';

// TODO: reemplazar por `fetch(`${API_BASE_URL}/api/estadisticas?desde=${desde}&hasta=${hasta}`)`
// cuando el backend esté listo. Debe devolver la misma forma que estadisticas.json:
// { casosPorTipo: { labels, valores },
//   patronesPorCategoria: { labels, valores },
//   comparativaPeriodo: { labels, actual, anterior } }
export async function getEstadisticas() {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockEstadisticas;
}
