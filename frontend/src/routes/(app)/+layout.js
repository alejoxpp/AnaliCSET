import { redirect } from '@sveltejs/kit';
import { getToken, isTokenValid, clearSession } from '$lib/stores/auth.js';

export function load() {
	if (!isTokenValid(getToken())) {
		clearSession();
		redirect(302, '/login');
	}
}
