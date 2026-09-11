import { n as getToken, r as isTokenValid, t as clearSession } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/(app)/+layout.js
function load() {
	if (!isTokenValid(getToken())) {
		clearSession();
		redirect(302, "/login");
	}
}
//#endregion
export { load };
