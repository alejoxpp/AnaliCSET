import { T as escape_html, a as derived, d as stringify, o as ensure_array_like, s as head, t as attr_class, w as attr } from "../../../../chunks/server.js";
import { t as Card } from "../../../../chunks/Card.js";
import { t as Badge } from "../../../../chunks/Badge.js";
import { t as ChartWrapper } from "../../../../chunks/ChartWrapper.js";
//#region src/lib/components/KpiCard.svelte
function KpiCard($$renderer, $$props) {
	let { icon, label, value, accent = false, class: className = "" } = $$props;
	$$renderer.push(`<div${attr_class(`animate-fade-in-up rounded-lg border border-neutral-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md ${stringify(className)}`)}><div class="mb-2 flex items-center gap-2"><div${attr_class(`flex h-8 w-8 items-center justify-center rounded-md ${accent ? "bg-accent-400/15 text-accent-600" : "bg-primary-500/10 text-primary-600"}`)}>`);
	icon?.($$renderer);
	$$renderer.push(`<!----></div> <p class="text-sm text-neutral-500">${escape_html(label)}</p></div> <p${attr_class(`font-heading text-3xl font-semibold ${accent ? "text-accent-600" : "text-neutral-900"}`)}>`);
	value?.($$renderer);
	$$renderer.push(`<!----></p></div>`);
}
//#endregion
//#region src/routes/(app)/dashboard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const kpis = derived(() => data.summary.kpis);
		const evolucion = derived(() => data.summary.evolucion);
		const ultimasActas = derived(() => data.summary.ultimasActas);
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
				borderColor: "#0d69fc",
				backgroundColor: "rgba(13, 105, 252, 0.12)",
				tension: .35,
				fill: true,
				pointBackgroundColor: "#0d69fc",
				pointRadius: 4,
				pointHoverRadius: 6
			}, {
				label: "Actas",
				data: evolucion().actas,
				borderColor: "#00c853",
				backgroundColor: "rgba(0, 200, 83, 0.08)",
				tension: .35,
				fill: true,
				borderDash: [5, 3],
				pointBackgroundColor: "#00c853",
				pointRadius: 4,
				pointHoverRadius: 6
			}]
		}));
		const chartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			interaction: {
				mode: "index",
				intersect: false
			},
			plugins: {
				legend: {
					display: true,
					position: "top",
					align: "end",
					labels: {
						usePointStyle: true,
						pointStyle: "circle",
						boxWidth: 6,
						padding: 16,
						font: { size: 12 }
					}
				},
				tooltip: {
					backgroundColor: "rgba(20, 23, 27, 0.9)",
					padding: 10,
					cornerRadius: 8,
					titleFont: { weight: "600" },
					bodyFont: { size: 13 }
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					grid: { color: "rgba(0,0,0,0.04)" },
					ticks: { font: { size: 11 } }
				},
				x: {
					grid: { display: false },
					ticks: { font: { size: 11 } }
				}
			}
		};
		head("1tyszyy", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Dashboard · AnaliCSET</title>`);
			});
		});
		$$renderer.push(`<div class="space-y-6"><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
		{
			function icon($$renderer) {
				$$renderer.push(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path></svg>`);
			}
			function value($$renderer) {
				$$renderer.push(`<!---->${escape_html(kpis().totalActas)}`);
			}
			KpiCard($$renderer, {
				label: "Actas cargadas",
				class: "stagger-1",
				icon,
				value,
				$$slots: {
					icon: true,
					value: true
				}
			});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				$$renderer.push(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"></path></svg>`);
			}
			function value($$renderer) {
				$$renderer.push(`<!---->${escape_html(kpis().totalCasos)}`);
			}
			KpiCard($$renderer, {
				label: "Casos totales",
				class: "stagger-2",
				icon,
				value,
				$$slots: {
					icon: true,
					value: true
				}
			});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				$$renderer.push(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path></svg>`);
			}
			function value($$renderer) {
				$$renderer.push(`<!---->${escape_html(kpis().patronesDetectados)}`);
			}
			KpiCard($$renderer, {
				label: "Patrones IA",
				accent: true,
				class: "stagger-3",
				icon,
				value,
				$$slots: {
					icon: true,
					value: true
				}
			});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				$$renderer.push(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"></path></svg>`);
			}
			function value($$renderer) {
				$$renderer.push(`<!---->${escape_html(formatDate(kpis().ultimaCarga))}`);
			}
			KpiCard($$renderer, {
				label: "Última carga",
				class: "stagger-4",
				icon,
				value,
				$$slots: {
					icon: true,
					value: true
				}
			});
		}
		$$renderer.push(`<!----></div> <div class="animate-fade-in-up" style="animation-delay: 300ms;">`);
		Card($$renderer, {
			title: "Evolución de casos y actas",
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
		$$renderer.push(`<!----></div> <div class="grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="animate-fade-in-up" style="animation-delay: 400ms;">`);
		Card($$renderer, {
			title: "Últimas actas cargadas",
			children: ($$renderer) => {
				$$renderer.push(`<div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead><tr class="border-b border-neutral-200 text-xs font-medium tracking-wide text-neutral-500 uppercase"><th class="pb-2 pr-4 font-medium">N.° Acta</th><th class="pb-2 pr-4 font-medium">Ficha</th><th class="pb-2 pr-4 font-medium">Fecha</th><th class="pb-2 font-medium text-right">Casos</th></tr></thead><tbody class="divide-y divide-neutral-100"><!--[-->`);
				const each_array = ensure_array_like(ultimasActas());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let acta = each_array[$$index];
					$$renderer.push(`<tr class="transition-colors hover:bg-neutral-50"><td class="py-2.5 pr-4"><a${attr("href", `/actas/${stringify(acta.id)}`)} class="font-medium text-primary-700 hover:underline">${escape_html(acta.numero)}</a></td><td class="py-2.5 pr-4 text-neutral-600">${escape_html(acta.ficha)}</td><td class="py-2.5 pr-4 text-neutral-500">${escape_html(formatDate(acta.fecha))}</td><td class="py-2.5 text-right">`);
					Badge($$renderer, {
						variant: "primary",
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(acta.casos)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></td></tr>`);
				}
				$$renderer.push(`<!--]--></tbody></table></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> <div class="animate-fade-in-up" style="animation-delay: 480ms;">`);
		Card($$renderer, {
			title: "Últimos patrones detectados por IA",
			children: ($$renderer) => {
				$$renderer.push(`<ul class="divide-y divide-neutral-100"><!--[-->`);
				const each_array_1 = ensure_array_like(ultimosPatrones());
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let patron = each_array_1[$$index_1];
					$$renderer.push(`<li class="flex items-start justify-between gap-4 py-3 transition-colors hover:bg-neutral-50 -mx-5 px-5 first:pt-0 last:pb-0"><div class="flex items-start gap-3"><div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-400/15"><svg class="h-3.5 w-3.5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"></path></svg></div> <div><p class="text-sm font-medium text-neutral-900">${escape_html(patron.titulo)}</p> <p class="text-xs text-neutral-500">${escape_html(formatDate(patron.fecha))}</p></div></div> <a${attr("href", `/patrones/${stringify(patron.id)}`)} class="shrink-0 text-sm font-medium text-primary-700 hover:underline">Ver detalle</a></li>`);
				}
				$$renderer.push(`<!--]--></ul>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></div></div>`);
	});
}
//#endregion
export { _page as default };
