import mockEstadisticas from '$lib/mocks/estadisticas.json';
import { apiFetch, notifyError } from './client.js';

// Factores de escalado simulados según periodo para dinamismo en UI
const FACTORES_RANGO = {
	ultimoMes: 0.35,
	ultimoTrimestre: 0.65,
	ultimoSemestre: 0.85,
	anioCompleto: 1.0
};

/**
 * Obtiene las estadísticas generales filtradas por rango temporal.
 * Si el backend no está disponible, utiliza y adapta el dataset mock.
 *
 * @param {Object} [filtros={}]
 * @param {'ultimoMes'|'ultimoTrimestre'|'ultimoSemestre'|'anioCompleto'|'personalizado'} [filtros.rango='anioCompleto']
 * @param {string} [filtros.desde]
 * @param {string} [filtros.hasta]
 */
export async function getEstadisticas(filtros = {}) {
	const { rango = 'anioCompleto', desde = '', hasta = '' } = filtros;

	try {
		// Simula tiempo de red para permitir ver transiciones/skeletons
		await new Promise((resolve) => setTimeout(resolve, 350));

		const factor = FACTORES_RANGO[rango] ?? 0.75;
		const baseCasos = mockEstadisticas.casosPorTipo;
		const basePatrones = mockEstadisticas.patronesPorCategoria;
		const baseComp = mockEstadisticas.comparativaPeriodo;

		// Adaptamos valores según el periodo seleccionado para que la reactividad sea evidente
		const casosValores = baseCasos.valores.map((v, i) => Math.max(8, Math.round(v * factor + ((i % 3) * 2))));
		const totalCasos = casosValores.reduce((acc, curr) => acc + curr, 0);

		// Patrones en porcentaje normalizado a 100
		const patronesValores = basePatrones.valores.map((v, i) => {
			const mod = rango === 'ultimoMes' ? (i === 0 ? 34 : 16) : v;
			return mod;
		});

		// Comparativa por meses según el rango
		let nMeses = 9;
		if (rango === 'ultimoMes') nMeses = 1;
		else if (rango === 'ultimoTrimestre') nMeses = 3;
		else if (rango === 'ultimoSemestre') nMeses = 6;

		const comparativa = {
			labels: baseComp.labels.slice(-nMeses),
			actual: baseComp.actual.slice(-nMeses),
			anterior: baseComp.anterior.slice(-nMeses)
		};

		return {
			rango,
			desde: desde || mockEstadisticas.rangosDisponibles[rango]?.desde || '2026-01-01',
			hasta: hasta || mockEstadisticas.rangosDisponibles[rango]?.hasta || '2026-09-30',
			totalCasos,
			casosPorTipo: {
				labels: baseCasos.labels,
				valores: casosValores
			},
			patronesPorCategoria: {
				labels: basePatrones.labels,
				valores: patronesValores
			},
			comparativaPeriodo: comparativa
		};
	} catch (err) {
		notifyError(err, 'No se pudieron cargar las estadísticas');
		throw err;
	}
}

/**
 * Obtiene la comparativa interanual (Año a Año / YoY) para el Dashboard Avanzado.
 */
export async function getComparativaAnual() {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return {
		periodos: ['2024', '2025', '2026 (Actual)'],
		categorias: ['Inasistencia', 'Bajo rendimiento', 'Deserción', 'Conducta', 'Plagio'],
		serie2025: [118, 92, 75, 52, 44],
		serie2026: [94, 72, 58, 45, 38],
		variacionPct: [-20.3, -21.7, -22.7, -13.5, -13.6],
		total2025: 381,
		total2026: 307,
		variacionGlobalPct: -19.4
	};
}

/**
 * Obtiene el placeholder de proyección y predicción de tendencias mediante IA.
 */
export async function getPrediccionTendencias() {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return {
		modeloInfo: {
			nombre: 'SENA AI Predictive Engine v1.2',
			estado: 'Calibración activa',
			confianzaPromedio: '87.4%',
			horizonte: 'Próximos 5 meses (Q4 2026 - Q1 2027)'
		},
		serieHistorica: {
			labels: ['May', 'Jun', 'Jul', 'Ago', 'Sep'],
			valores: [35, 28, 40, 31, 46]
		},
		serieProyectada: {
			labels: ['Sep (Base)', 'Oct 26', 'Nov 26', 'Dic 26', 'Ene 27', 'Feb 27'],
			valores: [46, 48, 52, 28, 16, 44],
			limiteSuperior: [46, 54, 60, 34, 22, 51],
			limiteInferior: [46, 42, 44, 22, 10, 37]
		},
		insightsIA: [
			{
				tipo: 'alerta',
				titulo: 'Pico estacional proyectado en Noviembre',
				descripcion: 'El modelo anticipa un incremento del 13% en citaciones a comité por entregas finales de etapa lectiva.',
				probabilidad: '89%',
				sugerencia: 'Programar jornadas de nivelación formativa en semanas 9 y 10.'
			},
			{
				tipo: 'oportunidad',
				titulo: 'Reducción sostenida de inasistencias en fichas matutinas',
				descripcion: 'La recurrencia de faltas injustificadas disminuyó un 21% con respecto a la misma ventana en 2025.',
				probabilidad: '92%',
				sugerencia: 'Mantener las alertas tempranas de asistencia que implementó la coordinación.'
			},
			{
				tipo: 'riesgo',
				titulo: 'Vulnerabilidad en área de Teleinformática',
				descripcion: 'Se detecta patrón cruzado de bajo rendimiento académico con deserción temprana en fichas nocturnas.',
				probabilidad: '76%',
				sugerencia: 'Asignar instructor tutor de refuerzo antes del corte de noviembre.'
			}
		]
	};
}
