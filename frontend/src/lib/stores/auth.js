import { writable } from 'svelte/store';

const TOKEN_KEY = 'analicset_token';
const USER_KEY = 'analicset_user';

function readInitialUser() {
	if (typeof sessionStorage === 'undefined') return null;
	const raw = sessionStorage.getItem(USER_KEY);
	return raw ? JSON.parse(raw) : null;
}

// { name, email, role } del usuario autenticado. El JWT nunca vive aquí,
// solo en sessionStorage — este store es exclusivamente para la UI.
export const user = writable(readInitialUser());

export function setSession(token, userData) {
	sessionStorage.setItem(TOKEN_KEY, token);
	sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
	user.set(userData);
}

export function clearSession() {
	sessionStorage.removeItem(TOKEN_KEY);
	sessionStorage.removeItem(USER_KEY);
	user.set(null);
}

export function getToken() {
	if (typeof sessionStorage === 'undefined') return null;
	return sessionStorage.getItem(TOKEN_KEY);
}

// Chequeo de conveniencia en cliente (decodifica el payload sin verificar
// firma) para redirigir rápido en los guards. La validación real de
// autorización siempre ocurre en el backend en cada llamada a la API.
export function isTokenValid(token) {
	if (!token) return false;
	try {
		const payload = JSON.parse(atob(token.split('.')[1]));
		if (!payload.exp) return true;
		return payload.exp * 1000 > Date.now();
	} catch {
		return false;
	}
}
