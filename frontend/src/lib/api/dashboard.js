import mockDashboard from '$lib/mocks/dashboard.json';

// TODO: reemplazar por `fetch(`${API_BASE_URL}/api/dashboard/summary`)` cuando
// el backend esté listo. Debe devolver la misma forma que dashboard.json:
// { kpis: { totalActas, totalCasos, patronesDetectados, ultimaCarga },
//   evolucion: { labels, casos }, ultimosPatrones: [{ id, titulo, fecha }] }
export async function getDashboardSummary() {
	await new Promise((resolve) => setTimeout(resolve, 400));
	return mockDashboard;
}
