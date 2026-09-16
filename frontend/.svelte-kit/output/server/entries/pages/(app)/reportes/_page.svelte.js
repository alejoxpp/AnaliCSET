import { s as head } from "../../../../chunks/server.js";
import { r as Card, t as Button } from "../../../../chunks/Button.js";
import { t as EmptyState } from "../../../../chunks/EmptyState.js";
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
			{
				function icon($$renderer) {
					$$renderer.push(`<svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path></svg>`);
				}
				function action($$renderer) {
					Button($$renderer, {
						variant: "secondary",
						onclick: () => window.location.href = "/estadisticas",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Ir a Estadísticas`);
						},
						$$slots: { default: true }
					});
				}
				EmptyState($$renderer, {
					title: "Los reportes programados aún no están disponibles",
					description: "Mientras tanto puede generar el informe del periodo desde Estadísticas o desde el Dashboard, con el botón «Generar reporte».",
					icon,
					action,
					$$slots: {
						icon: true,
						action: true
					}
				});
			}
		},
		$$slots: { default: true }
	});
}
//#endregion
export { _page as default };
