import mockCasos from '$lib/mocks/casos.json';
import { apiFetch, notifyError } from './client.js';

/**
 * Obtiene los casos asociados a un acta específica.
 * Contrato Backend: GET /api/casos?id_acta=
 *
 * @param {string} idActa - Identificador único del acta (ej: "a-256")
 * @returns {Promise<Array<any>>}
 */
export async function getCasosByActaId(idActa) {
	try {
		// TODO: Reemplazar por `apiFetch(`/api/casos?id_acta=${encodeURIComponent(idActa)}`)` cuando el backend esté activo
		await new Promise((resolve) => setTimeout(resolve, 300));
		const casos = mockCasos.casos.filter((c) => String(c.id_acta) === String(idActa));

		// Si no hay casos específicos en el mock para un id nuevo, devolvemos casos demostrativos
		if (casos.length === 0) {
			return [
				{
					id: `c-${idActa}-1`,
					id_acta: idActa,
					tipo: 'Inasistencia',
					aprendiz: 'Aprendiz Representativo SENA',
					documento: '1098000111',
					descripcion: 'Superó el límite de inasistencias en el periodo formativo evaluado.',
					estado: 'Plan de mejoramiento',
					sancion_sugerida: 'Compromiso escrito de asistencia y plan de trabajo.'
				},
				{
					id: `c-${idActa}-2`,
					id_acta: idActa,
					tipo: 'Bajo rendimiento',
					aprendiz: 'Aprendiz en Seguimiento Académico',
					documento: '1098000222',
					descripcion: 'Resultado de aprendizaje no alcanzado en la primera evaluación.',
					estado: 'Llamado de atención',
					sancion_sugerida: 'Nivelación con instructor vocero.'
				}
			];
		}

		return casos;
	} catch (err) {
		notifyError(err, 'No se pudieron cargar los casos asociados al acta');
		throw err;
	}
}
