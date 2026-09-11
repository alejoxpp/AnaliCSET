import { n as onDestroy } from "../../../../chunks/index-server.js";
import "../../../../chunks/shared2.js";
import { C as attr, a as ensure_array_like, i as derived, o as head, u as stringify, w as escape_html } from "../../../../chunks/server.js";
import { t as Card } from "../../../../chunks/Card.js";
import "chart.js/auto";
//#region src/lib/components/ChartWrapper.svelte
function ChartWrapper($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { type = "line", data, options = {} } = $$props;
		onDestroy(() => {});
		$$renderer.push(`<canvas></canvas>`);
	});
}
//#endregion
//#region src/routes/(app)/dashboard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const kpis = derived(() => data.summary.kpis);
		const evolucion = derived(() => data.summary.evolucion);
		const ultimosPatrones = derived(() => data.summary.ultimosPatrones);
		const dateFormatter = new Intl.DateTimeFormat("es-CO", {
			day: "2-digit",
			month: "short",
			year: "numeric"
		});
		function formatDate(isoDate) {
			return dateFormatter.format(/* @__PURE__ */ new Date(`${isoDate}T00:00:00`));
		}
		const chartData = derived(() => ({
			labels: evolucion().labels,
			datasets: [{
				label: "Casos",
				data: evolucion().casos,
				borderColor: "#2a527a",
				backgroundColor: "rgba(42, 82, 122, 0.15)",
				tension: .3,
				fill: true
			}]
		}));
		const chartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { display: false } },
			scales: { y: { beginAtZero: true } }
		};
		head("1tyszyy", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Dashboard · AnaliCSET</title>`);
			});
		});
		$$renderer.push(`<div class="space-y-6"><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
		Card($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<p class="text-sm text-neutral-500">Actas cargadas</p> <p class="font-heading text-3xl font-semibold text-neutral-900">${escape_html(kpis().totalActas)}</p>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		Card($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<p class="text-sm text-neutral-500">Casos totales</p> <p class="font-heading text-3xl font-semibold text-neutral-900">${escape_html(kpis().totalCasos)}</p>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		Card($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<p class="text-sm text-neutral-500">Patrones detectados por IA</p> <p class="font-heading text-3xl font-semibold text-accent-600">${escape_html(kpis().patronesDetectados)}</p>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		Card($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<p class="text-sm text-neutral-500">Última carga</p> <p class="font-heading text-3xl font-semibold text-neutral-900">${escape_html(formatDate(kpis().ultimaCarga))}</p>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> `);
		Card($$renderer, {
			title: "Evolución de casos",
			children: ($$renderer) => {
				$$renderer.push(`<div class="h-72">`);
				ChartWrapper($$renderer, {
					type: "line",
					data: chartData(),
					options: chartOptions
				});
				$$renderer.push(`<!----></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		Card($$renderer, {
			title: "Últimos patrones detectados por IA",
			children: ($$renderer) => {
				$$renderer.push(`<ul class="divide-y divide-neutral-200"><!--[-->`);
				const each_array = ensure_array_like(ultimosPatrones());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let patron = each_array[$$index];
					$$renderer.push(`<li class="flex items-center justify-between gap-4 py-3"><div><p class="text-sm font-medium text-neutral-900">${escape_html(patron.titulo)}</p> <p class="text-xs text-neutral-500">${escape_html(formatDate(patron.fecha))}</p></div> <a${attr("href", `/patrones/${stringify(patron.id)}`)} class="shrink-0 text-sm font-medium text-primary-700 underline">Ver detalle</a></li>`);
				}
				$$renderer.push(`<!--]--></ul>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _page as default };
