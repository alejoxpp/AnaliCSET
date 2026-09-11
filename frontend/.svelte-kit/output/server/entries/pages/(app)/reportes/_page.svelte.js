import { o as head } from "../../../../chunks/server.js";
import { t as Card } from "../../../../chunks/Card.js";
import { t as Badge } from "../../../../chunks/Badge.js";
//#region src/routes/(app)/reportes/+page.svelte
function _page($$renderer) {
	head("gw68dq", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Reportes · AnaliCSET</title>`);
		});
	});
	Card($$renderer, {
		title: "Reportes",
		children: ($$renderer) => {
			Badge($$renderer, {
				variant: "neutral",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Próximamente`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> <p class="mt-3 text-neutral-600">Esta sección todavía no está disponible.</p>`);
		},
		$$slots: { default: true }
	});
}
//#endregion
export { _page as default };
