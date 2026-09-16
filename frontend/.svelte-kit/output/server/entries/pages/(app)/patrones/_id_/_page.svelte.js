import { T as escape_html, a as derived, d as stringify, o as ensure_array_like, s as head, w as attr } from "../../../../../chunks/server.js";
import { r as Card, t as Button } from "../../../../../chunks/Button.js";
import { n as Badge, t as PrintButton } from "../../../../../chunks/PrintButton.js";
import { t as EmptyState } from "../../../../../chunks/EmptyState.js";
import { t as ProgressRing } from "../../../../../chunks/ProgressRing.js";
//#region src/routes/(app)/patrones/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const patron = derived(() => data.patron);
		const actasAsociadas = derived(() => data.actasAsociadas || []);
		const error = derived(() => data.error);
		const riesgoVariant = {
			Crítico: "danger",
			Alto: "danger",
			Medio: "warning",
			Bajo: "neutral"
		};
		const dateFormatter = new Intl.DateTimeFormat("es-CO", {
			day: "2-digit",
			month: "short",
			year: "numeric"
		});
		function formatDate(isoDate) {
			if (!isoDate) return "Fecha no disponible";
			try {
				return dateFormatter.format(/* @__PURE__ */ new Date(`${isoDate}T00:00:00`));
			} catch {
				return isoDate;
			}
		}
		head("f635c", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>
		${escape_html(patron() ? `${patron().nombre} · Patrón IA · AnaliCSET` : "Detalle del patrón · AnaliCSET")}
	</title>`);
			});
		});
		$$renderer.push(`<div class="animate-fade-in-up space-y-6"><div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><a href="/dashboard" class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary-700 hover:text-primary-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md p-1 dark:text-primary-400 dark:hover:text-primary-300 print:hidden"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg> Volver al Dashboard</a> <div class="flex items-center gap-3"><div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400"><a href="/dashboard" class="hover:text-primary-700 hover:underline dark:hover:text-primary-400">Dashboard</a> <span>/</span> <span class="text-neutral-900 font-semibold dark:text-neutral-100">${escape_html(patron() ? patron().id : "Patrón")}</span></div> `);
		if (patron()) {
			$$renderer.push(`<!--[0--><div class="print:hidden">`);
			PrintButton($$renderer, { label: "Imprimir análisis" });
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> `);
		if (error() || !patron()) {
			$$renderer.push("<!--[0-->");
			Card($$renderer, {
				children: ($$renderer) => {
					{
						function action($$renderer) {
							Button($$renderer, {
								variant: "primary",
								onclick: () => window.location.href = "/dashboard",
								children: ($$renderer) => {
									$$renderer.push(`<!---->Ir al Dashboard`);
								},
								$$slots: { default: true }
							});
						}
						EmptyState($$renderer, {
							title: "Patrón formativo no encontrado",
							description: error() || "El identificador de patrón no existe o aún no ha sido analizado por el motor de IA.",
							action,
							$$slots: { action: true }
						});
					}
				},
				$$slots: { default: true }
			});
		} else {
			$$renderer.push("<!--[-1-->");
			Card($$renderer, {
				children: ($$renderer) => {
					$$renderer.push(`<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6"><div class="flex-1 space-y-3 min-w-0"><div class="flex flex-wrap items-center gap-2"><span class="inline-flex items-center gap-1 rounded-md bg-accent-400/15 px-2.5 py-0.5 text-xs font-semibold text-accent-700 dark:text-accent-300"><svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"></path></svg> Análisis Predictivo de IA</span> `);
					if (patron().nivel_riesgo) {
						$$renderer.push("<!--[0-->");
						Badge($$renderer, {
							variant: riesgoVariant[patron().nivel_riesgo] ?? "neutral",
							children: ($$renderer) => {
								$$renderer.push(`<!---->Riesgo ${escape_html(patron().nivel_riesgo)}`);
							},
							$$slots: { default: true }
						});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <h1 class="font-heading text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">${escape_html(patron().nombre)}</h1> <p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">${escape_html(patron().descripcion)}</p> <div class="mt-4 rounded-xl border border-accent-200/80 bg-accent-50/50 p-4 text-xs text-neutral-700 dark:border-accent-700/40 dark:bg-accent-500/10 dark:text-neutral-200"><div class="flex items-start gap-2.5"><div class="mt-0.5 text-accent-600 dark:text-accent-400"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"></path></svg></div> <div><p class="font-bold text-neutral-900 dark:text-neutral-100">Medida preventiva recomendada por el Comité</p> <p class="mt-1 leading-relaxed text-neutral-600 dark:text-neutral-300">Activar plan de acompañamiento con el equipo de bienestar al aprendiz e instructor técnico,
									estableciendo compromisos formales antes de la próxima sesión ordinaria de seguimiento.</p></div></div></div></div> <div class="flex shrink-0 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 text-center dark:border-neutral-800 dark:bg-neutral-800/40">`);
					ProgressRing($$renderer, {
						value: patron().porcentaje || 25,
						size: "lg",
						tone: "accent",
						label: "frecuencia",
						ariaLabel: `${stringify(patron().porcentaje)}% de correlación`
					});
					$$renderer.push(`<!----> <p class="mt-3 text-xs font-semibold text-neutral-700 dark:text-neutral-200">Nivel de Incidencia</p> <p class="mt-0.5 text-[11px] text-neutral-400 dark:text-neutral-500">En el periodo actual</p></div></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Card($$renderer, {
				title: `Actas del Comité donde se manifiesta este Patrón (${stringify(actasAsociadas().length)})`,
				children: ($$renderer) => {
					if (actasAsociadas().length === 0) $$renderer.push(`<!--[0--><p class="text-xs text-neutral-500 dark:text-neutral-400">No hay actas vinculadas directamente a este patrón en el periodo actual.</p>`);
					else {
						$$renderer.push(`<!--[-1--><div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead><tr class="border-b border-neutral-200 text-xs font-medium tracking-wide text-neutral-500 uppercase dark:border-neutral-800 dark:text-neutral-400"><th class="pb-2 pr-4 font-medium">N.° Acta</th><th class="pb-2 pr-4 font-medium">Ficha</th><th class="pb-2 pr-4 font-medium">Fecha</th><th class="pb-2 pr-4 font-medium">Estado</th><th class="pb-2 font-medium text-right">Acción</th></tr></thead><tbody class="divide-y divide-neutral-100 dark:divide-neutral-800"><!--[-->`);
						const each_array = ensure_array_like(actasAsociadas());
						for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
							let acta = each_array[$$index];
							$$renderer.push(`<tr class="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"><td class="py-2.5 pr-4"><a${attr("href", `/actas/${stringify(acta.id)}`)} class="font-semibold text-primary-700 hover:underline dark:text-primary-400">${escape_html(acta.consecutivo)}</a></td><td class="py-2.5 pr-4 text-neutral-600 dark:text-neutral-300">${escape_html(acta.ficha)}</td><td class="py-2.5 pr-4 text-neutral-500 dark:text-neutral-400">${escape_html(formatDate(acta.fecha))}</td><td class="py-2.5 pr-4">`);
							Badge($$renderer, {
								variant: "primary",
								children: ($$renderer) => {
									$$renderer.push(`<!---->${escape_html(acta.estado)}`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----></td><td class="py-2.5 text-right"><a${attr("href", `/actas/${stringify(acta.id)}`)} class="text-xs font-semibold text-primary-700 hover:underline dark:text-primary-400">Ver acta</a></td></tr>`);
						}
						$$renderer.push(`<!--]--></tbody></table></div>`);
					}
					$$renderer.push(`<!--]-->`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!---->`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
export { _page as default };
