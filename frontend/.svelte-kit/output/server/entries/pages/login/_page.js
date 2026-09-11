import { n as getToken, r as isTokenValid } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/login/+page.js
function load() {
	if (isTokenValid(getToken())) redirect(302, "/dashboard");
}
//#endregion
export { load };
