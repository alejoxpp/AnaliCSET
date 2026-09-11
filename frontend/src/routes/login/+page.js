import { redirect } from '@sveltejs/kit';
import { getToken, isTokenValid } from '$lib/stores/auth.js';

export function load() {
	if (isTokenValid(getToken())) {
		redirect(302, '/dashboard');
	}
}
