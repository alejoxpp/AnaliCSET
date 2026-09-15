import { redirect } from '@sveltejs/kit';
import { getToken, isTokenValid } from '$lib/stores/auth.js';

export function load() {
	// "/" es la landing pública. Quien ya tiene sesión no necesita verla.
	if (isTokenValid(getToken())) {
		redirect(302, '/dashboard');
	}
}
