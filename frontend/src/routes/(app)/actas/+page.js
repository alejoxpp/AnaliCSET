import { getActas } from '$lib/api/actas.js';

export async function load() {
	const actas = await getActas();
	return { actas };
}
