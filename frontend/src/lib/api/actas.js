import mockActas from '$lib/mocks/actas.json';

// TODO: reemplazar por `fetch(`${API_BASE_URL}/api/actas`, { headers: { Authorization } })`
// cuando el backend esté listo. Debe devolver la misma forma que actas.json:
// { actas: [{ id, consecutivo, fecha, ficha, estado, totalCasos }] }
export async function getActas() {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockActas.actas;
}
