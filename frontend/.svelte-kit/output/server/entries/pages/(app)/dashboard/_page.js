var dashboard_default = {
	kpis: {
		"totalActas": 128,
		"totalCasos": 342,
		"patronesDetectados": 17,
		"ultimaCarga": "2026-09-08"
	},
	evolucion: {
		"labels": [
			"Abr",
			"May",
			"Jun",
			"Jul",
			"Ago",
			"Sep"
		],
		"casos": [
			22,
			35,
			28,
			40,
			31,
			46
		]
	},
	ultimosPatrones: [
		{
			"id": "p-104",
			"titulo": "Reincidencia en inasistencia — Ficha 2758421",
			"fecha": "2026-09-08"
		},
		{
			"id": "p-103",
			"titulo": "Pico de deserción en el trimestre III",
			"fecha": "2026-09-05"
		},
		{
			"id": "p-102",
			"titulo": "Correlación entre bajo rendimiento y cambios de instructor",
			"fecha": "2026-08-29"
		}
	]
};
//#endregion
//#region src/lib/api/dashboard.js
async function getDashboardSummary() {
	await new Promise((resolve) => setTimeout(resolve, 400));
	return dashboard_default;
}
//#endregion
//#region src/routes/(app)/dashboard/+page.js
async function load() {
	return { summary: await getDashboardSummary() };
}
//#endregion
export { load };
