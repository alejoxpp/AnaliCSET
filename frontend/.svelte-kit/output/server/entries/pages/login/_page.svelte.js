import { i as derived, o as head } from "../../../chunks/server.js";
import "../../../chunks/navigation.js";
import { t as Button } from "../../../chunks/Button.js";
import "../../../chunks/auth.js";
import { t as Card } from "../../../chunks/Card.js";
import { t as Input } from "../../../chunks/Input.js";
//#region src/routes/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let email = "";
		let password = "";
		let submitting = false;
		const emailError = derived(() => {
			return "";
		});
		const passwordError = derived(() => {
			return "";
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1x05zx6", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Iniciar sesión · AnaliCSET</title>`);
				});
			});
			$$renderer.push(`<div class="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-10"><div class="w-full max-w-sm"><div class="mb-6 text-center"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-700 font-heading text-lg font-semibold text-white">CS</div> <h1 class="mt-3 font-heading text-2xl font-semibold text-neutral-900">AnaliCSET</h1> <p class="text-sm text-neutral-500">SENA · Comité de Evaluación y Seguimiento</p></div> `);
			Card($$renderer, {
				children: ($$renderer) => {
					$$renderer.push(`<form class="space-y-4" novalidate="">`);
					Input($$renderer, {
						label: "Correo institucional",
						type: "email",
						error: emailError(),
						required: true,
						autocomplete: "username",
						get value() {
							return email;
						},
						set value($$value) {
							email = $$value;
							$$settled = false;
						}
					});
					$$renderer.push(`<!----> `);
					Input($$renderer, {
						label: "Contraseña",
						type: "password",
						error: passwordError(),
						required: true,
						autocomplete: "current-password",
						get value() {
							return password;
						},
						set value($$value) {
							password = $$value;
							$$settled = false;
						}
					});
					$$renderer.push(`<!----> `);
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					Button($$renderer, {
						type: "submit",
						variant: "primary",
						loading: submitting,
						fullWidth: true,
						children: ($$renderer) => {
							$$renderer.push(`<!---->Iniciar sesión`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></form>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> <p class="mt-6 text-center text-xs text-neutral-400">Acceso exclusivo para personal autorizado del CSET.</p></div></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
export { _page as default };
