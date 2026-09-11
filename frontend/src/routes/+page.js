import { redirect } from '@sveltejs/kit';
import { getToken, isTokenValid } from '$lib/stores/auth.js';

export function load() {
	redirect(302, isTokenValid(getToken()) ? '/dashboard' : '/login');
}
