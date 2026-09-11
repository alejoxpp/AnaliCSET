import { T as escape_html, s as head } from "../../../../../chunks/server.js";
import { t as page } from "../../../../../chunks/state.js";
import { t as Card } from "../../../../../chunks/Card.js";
//#region src/routes/(app)/patrones/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("f635c", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Detalle del patrón · AnaliCSET</title>`);
			});
		});
		Card($$renderer, {
			title: "Detalle del patrón",
			children: ($$renderer) => {
				$$renderer.push(`<p class="text-neutral-600">Vista de detalle en construcción para el patrón <strong>${escape_html(page.params.id)}</strong>.</p>`);
			},
			$$slots: { default: true }
		});
	});
}
//#endregion
export { _page as default };
