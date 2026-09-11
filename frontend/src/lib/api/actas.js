import mockActas from '$lib/mocks/actas.json';
import { apiFetch, notifyError } from './client.js';

/**
 * Obtiene el listado de actas del sistema con soporte de filtros.
 * Contrato Backend: GET /api/actas?fecha_desde=&fecha_hasta=&consecutivo=
 *
 * @param {Object} [filtros={}]
 * @param {string} [filtros.consecutivo]
 * @param {string} [filtros.fecha_desde]
 * @param {string} [filtros.fecha_hasta]
 * @param {string} [filtros.estado]
 * @returns {Promise<Array<any>>}
 */
export async function getActas(filtros = {}) {
	try {
		// TODO: Reemplazar por llamada a backend:
		// const params = new URLSearchParams();
		// if (filtros.consecutivo) params.set('consecutivo', filtros.consecutivo);
		// if (filtros.fecha_desde) params.set('fecha_desde', filtros.fecha_desde);
		// if (filtros.fecha_hasta) params.set('fecha_hasta', filtros.fecha_hasta);
		// return await apiFetch(`/api/actas?${params.toString()}`);

		await new Promise((resolve) => setTimeout(resolve, 350));
		let resultado = mockActas.actas;

		if (filtros.consecutivo && filtros.consecutivo.trim()) {
			const q = filtros.consecutivo.trim().toLowerCase();
			resultado = resultado.filter(
				(a) =>
					a.consecutivo.toLowerCase().includes(q) ||
					(a.ficha && a.ficha.toLowerCase().includes(q))
			);
		}

		if (filtros.fecha_desde) {
			resultado = resultado.filter((a) => a.fecha >= filtros.fecha_desde);
		}

		if (filtros.fecha_hasta) {
			resultado = resultado.filter((a) => a.fecha <= filtros.fecha_hasta);
		}

		if (filtros.estado) {
			resultado = resultado.filter((a) => a.estado === filtros.estado);
		}

		return resultado;
	} catch (err) {
		notifyError(err, 'No se pudo cargar la lista de actas');
		throw err;
	}
}

/**
 * Obtiene el detalle de un acta por su ID.
 * Contrato Backend: GET /api/actas/:id -> { id, fecha, consecutivo, estado, archivo_pdf, archivo_excel }
 *
 * @param {string|number} id
 * @returns {Promise<any>}
 */
export async function getActaById(id) {
	try {
		// TODO: Reemplazar por `apiFetch(`/api/actas/${encodeURIComponent(id)}`)` cuando el backend esté activo
		await new Promise((resolve) => setTimeout(resolve, 300));
		const acta = mockActas.actas.find((a) => String(a.id) === String(id));

		if (!acta) {
			return {
				id,
				consecutivo: `CSET-2026-${id}`,
				fecha: '2026-08-15',
				ficha: '2758421',
				programa: 'Tecnología en Análisis y Desarrollo de Software',
				estado: 'Procesada',
				totalCasos: 4,
				archivo_pdf: `Acta_CSET_2026_${id}.pdf`,
				archivo_excel: `Anexo_Casos_${id}.xlsx`,
				descripcion: 'Comité ordinario de seguimiento formativo y disciplinario.'
			};
		}

		return acta;
	} catch (err) {
		notifyError(err, 'No se pudo cargar el detalle del acta');
		throw err;
	}
}
