import { o as head } from "../../../../chunks/server.js";
import { t as Card } from "../../../../chunks/Card.js";
//#region src/routes/(app)/actas/+page.svelte
function _page($$renderer) {
	head("32v6y6", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Consulta de actas · AnaliCSET</title>`);
		});
	});
	Card($$renderer, {
		title: "Consulta de actas",
		children: ($$renderer) => {
			$$renderer.push(`<p class="text-neutral-600">Esta sección está en construcción.</p>`);
		},
		$$slots: { default: true }
	});
}
//#endregion
export { _page as default };
