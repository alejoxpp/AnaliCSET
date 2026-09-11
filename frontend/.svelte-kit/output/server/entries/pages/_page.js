import { n as getToken, r as isTokenValid } from "../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/+page.js
function load() {
	redirect(302, isTokenValid(getToken()) ? "/dashboard" : "/login");
}
//#endregion
export { load };
