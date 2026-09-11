import { o as head } from "../../../../chunks/server.js";
import { t as Card } from "../../../../chunks/Card.js";
//#region src/routes/(app)/estadisticas/+page.svelte
function _page($$renderer) {
	head("1cdt2ah", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Estadísticas · AnaliCSET</title>`);
		});
	});
	Card($$renderer, {
		title: "Estadísticas",
		children: ($$renderer) => {
			$$renderer.push(`<p class="text-neutral-600">Esta sección está en construcción.</p>`);
		},
		$$slots: { default: true }
	});
}
//#endregion
export { _page as default };
