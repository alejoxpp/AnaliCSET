import { n as writable } from "./shared2.js";
import "./index-server2.js";
//#region src/lib/stores/auth.js
var TOKEN_KEY = "analicset_token";
var USER_KEY = "analicset_user";
function readInitialUser() {
	if (typeof sessionStorage === "undefined") return null;
	const raw = sessionStorage.getItem(USER_KEY);
	return raw ? JSON.parse(raw) : null;
}
var user = writable(readInitialUser());
function clearSession() {
	sessionStorage.removeItem(TOKEN_KEY);
	sessionStorage.removeItem(USER_KEY);
	user.set(null);
}
function getToken() {
	if (typeof sessionStorage === "undefined") return null;
	return sessionStorage.getItem(TOKEN_KEY);
}
function isTokenValid(token) {
	if (!token) return false;
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		if (!payload.exp) return true;
		return payload.exp * 1e3 > Date.now();
	} catch {
		return false;
	}
}
//#endregion
export { user as i, getToken as n, isTokenValid as r, clearSession as t };
