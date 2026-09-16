import "../../../../chunks/index-server.js";
import "../../../../chunks/shared2.js";
import { T as escape_html, a as derived, d as stringify, f as unsubscribe_stores, n as attr_style, o as ensure_array_like, s as head, t as attr_class, u as store_get, w as attr } from "../../../../chunks/server.js";
import { t as theme } from "../../../../chunks/theme.js";
import { r as Card, t as Button } from "../../../../chunks/Button.js";
import { n as Badge, t as PrintButton } from "../../../../chunks/PrintButton.js";
import { t as ProgressRing } from "../../../../chunks/ProgressRing.js";
import { n as chartTheme, t as ChartWrapper } from "../../../../chunks/ChartWrapper.js";
import { t as InsightCard } from "../../../../chunks/InsightCard.js";
//#region src/lib/components/KpiCard.svelte
function KpiCard($$renderer, $$props) {
	let { icon, label, value, accent = false, class: className = "" } = $$props;
	$$renderer.push(`<div${attr_class(`print-block animate-fade-in-up rounded-lg border border-neutral-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 ${stringify(className)}`)}><div class="mb-2 flex items-center gap-2"><div${attr_class(`flex h-8 w-8 items-center justify-center rounded-md ${accent ? "bg-accent-400/15 text-accent-600 dark:text-accent-400" : "bg-primary-500/10 text-primary-600 dark:text-primary-400"}`)}>`);
	icon?.($$renderer);
	$$renderer.push(`<!----></div> <p class="text-sm text-neutral-500 dark:text-neutral-400">${escape_html(label)}</p></div> <p${attr_class(`font-heading text-3xl font-semibold ${accent ? "text-accent-600 dark:text-accent-400" : "text-neutral-900 dark:text-neutral-50"}`)}>`);
	value?.($$renderer);
	$$renderer.push(`<!----></p></div>`);
}
//#endregion
//#region src/lib/components/TourGuide.svelte
function TourGuide($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const STORAGE_KEY = "analicset_tour_completed";
		let abierto = false;
		let pasoActual = 0;
		const pasos = [
			{
				titulo: "Bienvenido al Panel de AnaliCSET",
				etiqueta: "Paso 1 de 3 · Visión General",
				descripcion: "Aquí encuentras el resumen consolidado del Comité de Evaluación y Seguimiento: estadísticas clave, histórico de casos y las alertas prioritarias sugeridas por el análisis de IA.",
				destaque: "Revisa la tarjeta de insight en la parte superior para detectar incrementos inusuales.",
				icono: "ia"
			},
			{
				titulo: "Consulta y Trazabilidad de Actas",
				etiqueta: "Paso 2 de 3 · Gestión Documental",
				descripcion: "Accede a todas las sesiones del comité, filtra por número de acta, ficha o fecha, y consulta los casos de aprendices asociados junto a sus anexos oficiales en PDF y Excel.",
				destaque: "Haz clic en cualquier acta del listado para ver sus casos y patrones asociados.",
				icono: "actas"
			},
			{
				titulo: "Reportes y Modo Oscuro",
				etiqueta: "Paso 3 de 3 · Herramientas",
				descripcion: "Exporta resúmenes oficiales con el botón «Generar reporte» (optimizado para impresión institucional) y adapta la interfaz a tu preferencia con el selector de modo oscuro en el encabezado.",
				destaque: "El formato de impresión ahorra tinta y mantiene los gráficos visibles de forma limpia.",
				icono: "print"
			}
		];
		function cerrarTour() {
			abierto = false;
			try {
				localStorage.setItem(STORAGE_KEY, "true");
			} catch {}
		}
		function siguiente() {
			if (pasoActual < pasos.length - 1) pasoActual += 1;
			else cerrarTour();
		}
		function anterior() {
			if (pasoActual > 0) pasoActual -= 1;
		}
		if (abierto) {
			$$renderer.push(`<!--[0--><div class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-xs" role="dialog" aria-modal="true" aria-labelledby="tour-titulo"><div class="relative w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-7"><button type="button" class="absolute top-4 right-4 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-300" aria-label="Cerrar guía interactiva"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button> <!---->`);
			$$renderer.push(`<div><div class="flex items-center gap-3"><div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-200/70 dark:bg-primary-500/15 dark:text-primary-300 dark:ring-primary-500/30">`);
			if (pasos[pasoActual].icono === "ia") $$renderer.push(`<!--[0--><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"></path></svg>`);
			else if (pasos[pasoActual].icono === "actas") $$renderer.push(`<!--[1--><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path></svg>`);
			else $$renderer.push(`<!--[-1--><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m0 0a48.159 48.159 0 0 1 10.5 0m-10.5 0V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.659M9.75 21h4.5"></path></svg>`);
			$$renderer.push(`<!--]--></div> <div><span class="text-[11px] font-bold tracking-wider text-primary-700 uppercase dark:text-primary-400">${escape_html(pasos[pasoActual].etiqueta)}</span> <h3 id="tour-titulo" class="font-heading text-lg font-bold text-neutral-900 sm:text-xl dark:text-neutral-50">${escape_html(pasos[pasoActual].titulo)}</h3></div></div> <p class="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">${escape_html(pasos[pasoActual].descripcion)}</p> <div class="mt-4 flex items-start gap-2.5 rounded-xl border border-neutral-200 bg-neutral-50/80 p-3 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300"><svg class="h-4 w-4 shrink-0 text-accent-600 mt-0.5 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"></path></svg> <span class="leading-relaxed font-medium">${escape_html(pasos[pasoActual].destaque)}</span></div></div>`);
			$$renderer.push(`<!----> <div class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800"><div class="flex items-center gap-1.5" aria-label="Progreso del tour"><!--[-->`);
			const each_array = ensure_array_like(pasos);
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				each_array[i];
				$$renderer.push(`<button type="button"${attr_class(`h-2 rounded-full transition-all duration-200 cursor-pointer ${i === pasoActual ? "w-6 bg-primary-600 dark:bg-primary-500" : "w-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"}`)}${attr("aria-label", `Ir al paso ${stringify(i + 1)}`)}></button>`);
			}
			$$renderer.push(`<!--]--></div> <div class="flex items-center gap-2"><button type="button" class="px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-md cursor-pointer dark:text-neutral-400 dark:hover:text-neutral-200">Omitir</button> `);
			if (pasoActual > 0) {
				$$renderer.push("<!--[0-->");
				Button($$renderer, {
					variant: "secondary",
					size: "sm",
					onclick: anterior,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Anterior`);
					},
					$$slots: { default: true }
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			Button($$renderer, {
				variant: "primary",
				size: "sm",
				onclick: siguiente,
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(pasoActual === pasos.length - 1 ? "¡Comenzar!" : "Siguiente")}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/routes/(app)/dashboard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const kpis = derived(() => data.summary.kpis);
		const evolucion = derived(() => data.summary.evolucion);
		const ultimasActas = derived(() => data.summary.ultimasActas);
		const ultimosPatrones = derived(() => data.summary.ultimosPatrones);
		const insight = derived(() => data.summary.insight);
		const comparativa = derived(() => data.summary.comparativa);
		const ct = derived(() => chartTheme(store_get($$store_subs ??= {}, "$theme", theme) === "dark"));
		/** Variación porcentual del periodo actual frente al anterior. */
		function variacion(actual, anterior) {
			if (!anterior) return 0;
			return Math.round((actual - anterior) / anterior * 100);
		}
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
		const chartOptions = derived(() => ({
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
						font: { size: 12 },
						color: ct().legend
					}
				},
				tooltip: {
					backgroundColor: ct().tooltipBg,
					padding: 10,
					cornerRadius: 8,
					titleFont: { weight: "600" },
					bodyFont: { size: 13 }
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					grid: { color: ct().grid },
					ticks: {
						font: { size: 11 },
						color: ct().tick
					}
				},
				x: {
					grid: { display: false },
					ticks: {
						font: { size: 11 },
						color: ct().tick
					}
				}
			}
		}));
		head("1tyszyy", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Dashboard · AnaliCSET</title>`);
			});
		});
		$$renderer.push(`<div class="space-y-6"><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 class="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-50">Resumen del Comité</h2> <p class="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">Estado general del histórico CSET y hallazgos recientes del análisis.</p></div> <div class="print:hidden">`);
		PrintButton($$renderer, {});
		$$renderer.push(`<!----></div></div> `);
		InsightCard($$renderer, {
			titulo: insight().titulo,
			descripcion: insight().descripcion,
			delta: insight().delta,
			trend: insight().trend,
			href: `/patrones/${stringify(insight().patronId)}`
		});
		$$renderer.push(`<!----> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
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
					options: chartOptions()
				});
				$$renderer.push(`<!----></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> <div class="animate-fade-in-up" style="animation-delay: 340ms;">`);
		Card($$renderer, {
			title: "Este periodo frente al anterior",
			children: ($$renderer) => {
				$$renderer.push(`<div class="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"><span class="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-200"><span class="h-2 w-2 rounded-full bg-primary-600"></span> ${escape_html(comparativa().periodoActual)}</span> <span class="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400"><span class="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-600"></span> ${escape_html(comparativa().periodoAnterior)}</span></div> <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
				const each_array = ensure_array_like(comparativa().metricas);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let metrica = each_array[$$index];
					const delta = variacion(metrica.actual, metrica.anterior);
					const maximo = Math.max(metrica.actual, metrica.anterior) || 1;
					$$renderer.push(`<div><p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(metrica.label)}</p> <div class="mt-1 flex items-baseline gap-2"><span class="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-50">${escape_html(metrica.actual)}</span> <span${attr_class(`text-xs font-semibold ${delta > 0 ? "text-danger-600 dark:text-danger-500" : delta < 0 ? "text-success-600 dark:text-success-500" : "text-neutral-400"}`)}>${escape_html(delta > 0 ? "+" : "")}${escape_html(delta)}%</span></div> <div class="mt-2 space-y-1"><div class="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"><div class="h-full rounded-full bg-primary-600 transition-[width] duration-700 ease-out"${attr_style(`width: ${stringify(metrica.actual / maximo * 100)}%`)}></div></div> <div class="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"><div class="h-full rounded-full bg-neutral-300 transition-[width] duration-700 ease-out dark:bg-neutral-600"${attr_style(`width: ${stringify(metrica.anterior / maximo * 100)}%`)}></div></div></div> <p class="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">antes: ${escape_html(metrica.anterior)}</p></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> <div class="grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="animate-fade-in-up" style="animation-delay: 400ms;">`);
		Card($$renderer, {
			title: "Últimas actas cargadas",
			children: ($$renderer) => {
				$$renderer.push(`<div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead><tr class="border-b border-neutral-200 text-xs font-medium tracking-wide text-neutral-500 uppercase dark:border-neutral-800 dark:text-neutral-400"><th class="pb-2 pr-4 font-medium">N.° Acta</th><th class="pb-2 pr-4 font-medium">Ficha</th><th class="pb-2 pr-4 font-medium">Fecha</th><th class="pb-2 font-medium text-right">Casos</th></tr></thead><tbody class="divide-y divide-neutral-100 dark:divide-neutral-800"><!--[-->`);
				const each_array_1 = ensure_array_like(ultimasActas());
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let acta = each_array_1[$$index_1];
					$$renderer.push(`<tr class="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"><td class="py-2.5 pr-4"><a${attr("href", `/actas/${stringify(acta.id)}`)} class="font-medium text-primary-700 hover:underline dark:text-primary-400">${escape_html(acta.numero)}</a></td><td class="py-2.5 pr-4 text-neutral-600 dark:text-neutral-300">${escape_html(acta.ficha)}</td><td class="py-2.5 pr-4 text-neutral-500 dark:text-neutral-400">${escape_html(formatDate(acta.fecha))}</td><td class="py-2.5 text-right">`);
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
				$$renderer.push(`<ul class="divide-y divide-neutral-100 dark:divide-neutral-800"><!--[-->`);
				const each_array_2 = ensure_array_like(ultimosPatrones());
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let patron = each_array_2[$$index_2];
					$$renderer.push(`<li class="flex items-center justify-between gap-4 py-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50 -mx-5 px-5 first:pt-0 last:pb-0"><div class="flex items-start gap-3 min-w-0"><div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-400/15"><svg class="h-3.5 w-3.5 text-accent-600 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"></path></svg></div> <div class="min-w-0"><p class="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">${escape_html(patron.titulo)}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(formatDate(patron.fecha))}</p></div></div> <div class="flex items-center gap-3 shrink-0">`);
					if (patron.porcentaje) {
						$$renderer.push("<!--[0-->");
						ProgressRing($$renderer, {
							value: patron.porcentaje,
							size: "sm",
							tone: "accent",
							ariaLabel: `${stringify(patron.porcentaje)}% de correlación`
						});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <a${attr("href", `/patrones/${stringify(patron.id)}`)} class="text-xs font-semibold text-primary-700 hover:underline dark:text-primary-400">Detalle</a></div></li>`);
				}
				$$renderer.push(`<!--]--></ul>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></div> `);
		TourGuide($$renderer, {});
		$$renderer.push(`<!----></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
