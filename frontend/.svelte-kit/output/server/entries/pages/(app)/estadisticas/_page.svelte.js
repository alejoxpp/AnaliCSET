import { T as escape_html, a as derived, o as ensure_array_like, s as head, t as attr_class, w as attr } from "../../../../chunks/server.js";
import { t as toasts } from "../../../../chunks/toast.js";
import { t as Card } from "../../../../chunks/Card.js";
import { t as Badge } from "../../../../chunks/Badge.js";
import { t as Button } from "../../../../chunks/Button.js";
import "../../../../chunks/Skeleton.js";
import { t as ChartWrapper } from "../../../../chunks/ChartWrapper.js";
import "../../../../chunks/estadisticas.js";
//#region src/routes/(app)/estadisticas/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const stats = derived(() => data.estadisticas);
		const comparativaAnual = derived(() => data.comparativaAnual);
		const prediccionIA = derived(() => data.prediccionIA);
		let rangoSeleccionado = "anioCompleto";
		let fechaDesde = "2026-01-01";
		let fechaHasta = "2026-09-30";
		const rangoLabels = {
			ultimoMes: "Último mes",
			ultimoTrimestre: "Último trimestre",
			ultimoSemestre: "Último semestre",
			anioCompleto: "Año completo",
			personalizado: "Personalizado"
		};
		const COLORS = {
			primary600: "#0d69fc",
			primary700: "#0852ca",
			primary900: "#1a377d",
			primary200: "#bad6ff",
			accent500: "#00c853",
			accent400: "#34d399",
			cyan500: "#00b4d8",
			danger500: "#ef4444",
			warning500: "#f59e0b",
			neutral400: "#94a3b8",
			neutral600: "#475569"
		};
		const doughnutPalette = [
			COLORS.primary600,
			COLORS.accent500,
			COLORS.cyan500,
			COLORS.warning500,
			COLORS.danger500,
			COLORS.neutral400
		];
		const barPalette = [
			"#00c853",
			"#34d399",
			"#00b4d8",
			"#0d69fc",
			"#1a377d"
		];
		const casosPorTipoData = derived(() => ({
			labels: stats().casosPorTipo.labels,
			datasets: [{
				data: stats().casosPorTipo.valores,
				backgroundColor: doughnutPalette,
				borderWidth: 2,
				borderColor: "#ffffff",
				hoverOffset: 8
			}]
		}));
		const casosPorTipoOptions = {
			responsive: true,
			maintainAspectRatio: false,
			cutout: "58%",
			plugins: {
				legend: {
					position: "bottom",
					labels: {
						usePointStyle: true,
						pointStyle: "circle",
						boxWidth: 6,
						padding: 8,
						font: { size: 11 }
					}
				},
				tooltip: {
					backgroundColor: "rgba(15, 23, 42, 0.95)",
					padding: 12,
					cornerRadius: 8,
					callbacks: { label: (ctx) => {
						const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
						const val = ctx.raw;
						return ` ${val} casos (${Math.round(val / total * 100)}%)`;
					} }
				}
			}
		};
		const patronesData = derived(() => ({
			labels: stats().patronesPorCategoria.labels,
			datasets: [{
				data: stats().patronesPorCategoria.valores,
				backgroundColor: barPalette,
				borderRadius: 6,
				borderWidth: 0,
				barThickness: 24
			}]
		}));
		const patronesOptions = {
			responsive: true,
			maintainAspectRatio: false,
			indexAxis: "y",
			plugins: {
				legend: { display: false },
				tooltip: {
					backgroundColor: "rgba(15, 23, 42, 0.95)",
					padding: 12,
					cornerRadius: 8,
					callbacks: { label: (ctx) => ` ${ctx.raw}% del total de patrones detectados por IA` }
				}
			},
			scales: {
				x: {
					beginAtZero: true,
					max: 40,
					grid: { color: "rgba(0,0,0,0.05)" },
					ticks: {
						callback: (v) => `${v}%`,
						font: { size: 11 }
					}
				},
				y: {
					grid: { display: false },
					ticks: { font: {
						size: 11,
						weight: "500"
					} }
				}
			}
		};
		const comparativaData = derived(() => ({
			labels: stats().comparativaPeriodo.labels,
			datasets: [{
				label: "Periodo actual",
				data: stats().comparativaPeriodo.actual,
				borderColor: COLORS.primary600,
				backgroundColor: "rgba(13, 105, 252, 0.12)",
				tension: .35,
				fill: true,
				pointBackgroundColor: COLORS.primary600,
				pointRadius: 4,
				pointHoverRadius: 6
			}, {
				label: "Periodo anterior",
				data: stats().comparativaPeriodo.anterior,
				borderColor: COLORS.neutral400,
				backgroundColor: "rgba(148, 163, 184, 0.08)",
				tension: .35,
				fill: true,
				borderDash: [5, 4],
				pointBackgroundColor: COLORS.neutral400,
				pointRadius: 4,
				pointHoverRadius: 6
			}]
		}));
		const comparativaOptions = {
			responsive: true,
			maintainAspectRatio: false,
			interaction: {
				mode: "index",
				intersect: false
			},
			plugins: {
				legend: {
					position: "top",
					align: "end",
					labels: {
						usePointStyle: true,
						pointStyle: "circle",
						boxWidth: 8,
						padding: 16,
						font: { size: 12 }
					}
				},
				tooltip: {
					backgroundColor: "rgba(15, 23, 42, 0.95)",
					padding: 12,
					cornerRadius: 8,
					titleFont: { weight: "600" }
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					grid: { color: "rgba(0,0,0,0.05)" },
					ticks: { font: { size: 11 } }
				},
				x: {
					grid: { display: false },
					ticks: { font: { size: 11 } }
				}
			}
		};
		const anualChartData = derived(() => ({
			labels: comparativaAnual().categorias,
			datasets: [{
				label: "2025 (Año anterior)",
				data: comparativaAnual().serie2025,
				backgroundColor: "#94a3b8",
				borderRadius: 4
			}, {
				label: "2026 (Año actual)",
				data: comparativaAnual().serie2026,
				backgroundColor: COLORS.primary600,
				borderRadius: 4
			}]
		}));
		const anualChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: "top",
					align: "end",
					labels: {
						usePointStyle: true,
						boxWidth: 8,
						font: { size: 11 }
					}
				},
				tooltip: {
					backgroundColor: "rgba(15, 23, 42, 0.95)",
					padding: 10,
					cornerRadius: 8
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					grid: { color: "rgba(0,0,0,0.05)" },
					ticks: { font: { size: 11 } }
				},
				x: {
					grid: { display: false },
					ticks: { font: { size: 11 } }
				}
			}
		};
		const prediccionChartData = derived(() => ({
			labels: prediccionIA().serieProyectada.labels,
			datasets: [
				{
					label: "Límite superior (95% CI)",
					data: prediccionIA().serieProyectada.limiteSuperior,
					borderColor: "transparent",
					backgroundColor: "rgba(0, 200, 83, 0.12)",
					fill: "+1",
					tension: .35,
					pointRadius: 0
				},
				{
					label: "Proyección IA estimada",
					data: prediccionIA().serieProyectada.valores,
					borderColor: COLORS.accent500,
					borderDash: [6, 4],
					borderWidth: 2.5,
					backgroundColor: "transparent",
					tension: .35,
					pointBackgroundColor: COLORS.accent500,
					pointRadius: 4,
					pointHoverRadius: 6
				},
				{
					label: "Límite inferior (95% CI)",
					data: prediccionIA().serieProyectada.limiteInferior,
					borderColor: "transparent",
					backgroundColor: "transparent",
					fill: false,
					tension: .35,
					pointRadius: 0
				}
			]
		}));
		const prediccionChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			interaction: {
				mode: "index",
				intersect: false
			},
			plugins: {
				legend: {
					position: "top",
					align: "end",
					labels: {
						usePointStyle: true,
						boxWidth: 8,
						font: { size: 11 },
						filter: (item) => !item.text.includes("Límite inferior")
					}
				},
				tooltip: {
					backgroundColor: "rgba(15, 23, 42, 0.95)",
					padding: 10,
					cornerRadius: 8
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					grid: { color: "rgba(0,0,0,0.05)" },
					ticks: { font: { size: 11 } }
				},
				x: {
					grid: { display: false },
					ticks: { font: { size: 11 } }
				}
			}
		};
		function exportarPDF() {
			toasts.add("Preparando vista de impresión del informe...", "neutral", 2e3);
			setTimeout(() => {
				window.print();
			}, 300);
		}
		head("1cdt2ah", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Estadísticas del Comité · AnaliCSET</title>`);
			});
		});
		$$renderer.push(`<div class="animate-fade-in-up space-y-6"><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:mb-4"><div><div class="flex items-center gap-2"><span class="inline-flex items-center gap-1 rounded-md bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-800">SENA · CSET</span> <span class="text-xs text-neutral-500">Comité de Evaluación y Seguimiento</span></div> <h2 class="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl mt-1">Análisis Estadístico e Inteligencia del Comité</h2> <p class="text-sm text-neutral-600">Monitoreo de comportamiento disciplinario y académico, correlaciones IA y proyecciones.</p></div> <div class="flex flex-wrap items-center gap-2 print:hidden"><button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 shadow-xs transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer" title="Descargar datos en formato CSV"><svg class="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"></path></svg> Exportar CSV</button> <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 shadow-xs transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer" title="Guardar gráfico principal como imagen PNG"><svg class="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path></svg> PNG</button> `);
		Button($$renderer, {
			variant: "primary",
			onclick: exportarPDF,
			children: ($$renderer) => {
				$$renderer.push(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m0 0a48.159 48.159 0 0 1 10.5 0m-10.5 0V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.659M9.75 21h4.5"></path></svg> Imprimir / PDF`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></div> `);
		Card($$renderer, {
			class: "print:hidden",
			children: ($$renderer) => {
				$$renderer.push(`<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div class="flex flex-col gap-1.5"><span class="text-xs font-semibold tracking-wide text-neutral-600 uppercase">Periodo de análisis</span> <div class="inline-flex flex-wrap items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 p-1" role="group" aria-label="Selector de rango temporal"><!--[-->`);
				const each_array = ensure_array_like([
					"ultimoMes",
					"ultimoTrimestre",
					"ultimoSemestre",
					"anioCompleto"
				]);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let key = each_array[$$index];
					$$renderer.push(`<button type="button"${attr("aria-pressed", rangoSeleccionado === key)}${attr_class(`rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${rangoSeleccionado === key ? "bg-primary-600 text-white shadow-xs" : "text-neutral-700 hover:bg-white hover:text-neutral-900"}`)}>${escape_html(rangoLabels[key])}</button>`);
				}
				$$renderer.push(`<!--]--></div></div> <form class="flex flex-wrap items-end gap-3 pt-2 lg:pt-0"><div><label for="fecha-desde" class="block text-xs font-medium text-neutral-700 mb-1">Desde</label> <input id="fecha-desde" type="date"${attr("value", fechaDesde)} class="rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"/></div> <div><label for="fecha-hasta" class="block text-xs font-medium text-neutral-700 mb-1">Hasta</label> <input id="fecha-hasta" type="date"${attr("value", fechaHasta)} class="rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"/></div> <button type="submit" class="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 cursor-pointer">Filtrar</button></form></div> <div class="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500"><p>Mostrando datos del intervalo: <strong class="font-semibold text-neutral-800">${escape_html(stats().desde)}</strong> al <strong class="font-semibold text-neutral-800">${escape_html(stats().hasta)}</strong> (${escape_html(rangoLabels[rangoSeleccionado])})</p> `);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> <div class="grid grid-cols-2 gap-4 sm:grid-cols-4"><div class="rounded-lg border border-neutral-200 bg-white p-4 shadow-xs"><p class="text-xs font-medium text-neutral-500">Casos en periodo</p> <p class="mt-1 font-heading text-2xl font-bold text-neutral-900">${escape_html(stats().totalCasos)}</p> <span class="mt-1 inline-flex text-[11px] font-medium text-success-600">↓ 19.4% vs periodo ant.</span></div> <div class="rounded-lg border border-neutral-200 bg-white p-4 shadow-xs"><p class="text-xs font-medium text-neutral-500">Causa principal</p> <p class="mt-1 font-heading text-xl font-bold text-primary-900">Inasistencia</p> <span class="mt-1 text-[11px] text-neutral-500">31% del volumen total</span></div> <div class="rounded-lg border border-neutral-200 bg-white p-4 shadow-xs"><p class="text-xs font-medium text-neutral-500">Patrón IA crítico</p> <p class="mt-1 font-heading text-xl font-bold text-accent-700">Reincidencia</p> <span class="mt-1 text-[11px] text-accent-600 font-medium">Detectado en 28 fichas</span></div> <div class="rounded-lg border border-neutral-200 bg-white p-4 shadow-xs"><p class="text-xs font-medium text-neutral-500">Acuerdos efectivos</p> <p class="mt-1 font-heading text-2xl font-bold text-neutral-900">84.2%</p> <span class="mt-1 text-[11px] text-success-600 font-medium">Cumplimiento positivo</span></div></div> <div class="grid grid-cols-1 gap-6 md:grid-cols-2">`);
		$$renderer.push(`<!--[-1--><div class="animate-fade-in-up" style="animation-delay: 50ms;">`);
		{
			function footer($$renderer) {
				$$renderer.push(`<div class="flex items-center justify-between text-xs text-neutral-500"><span>Categorías reglamentarias SENA</span> <span class="font-medium text-neutral-700">Total: ${escape_html(stats().totalCasos)} casos</span></div>`);
			}
			Card($$renderer, {
				title: "Distribución de casos por tipo",
				footer,
				children: ($$renderer) => {
					$$renderer.push(`<div class="h-80">`);
					ChartWrapper($$renderer, {
						type: "doughnut",
						data: casosPorTipoData(),
						options: casosPorTipoOptions
					});
					$$renderer.push(`<!----></div>`);
				},
				$$slots: {
					footer: true,
					default: true
				}
			});
		}
		$$renderer.push(`<!----></div>`);
		$$renderer.push(`<!--]--> `);
		$$renderer.push(`<!--[-1--><div class="animate-fade-in-up" style="animation-delay: 120ms;">`);
		{
			function footer($$renderer) {
				$$renderer.push(`<div class="flex items-center justify-between text-xs text-neutral-500"><span>Frecuencia relativa en actas CSET</span> `);
				Badge($$renderer, {
					variant: "accent",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Motor IA Activo`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div>`);
			}
			Card($$renderer, {
				title: "Patrones detectados por IA (%)",
				footer,
				children: ($$renderer) => {
					$$renderer.push(`<div class="h-80">`);
					ChartWrapper($$renderer, {
						type: "bar",
						data: patronesData(),
						options: patronesOptions
					});
					$$renderer.push(`<!----></div>`);
				},
				$$slots: {
					footer: true,
					default: true
				}
			});
		}
		$$renderer.push(`<!----></div>`);
		$$renderer.push(`<!--]--></div> `);
		$$renderer.push(`<!--[-1--><div class="animate-fade-in-up" style="animation-delay: 180ms;">`);
		{
			function footer($$renderer) {
				$$renderer.push(`<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500"><p>Curva continua: <strong class="text-primary-700">Periodo actual</strong> | Línea segmentada: <strong class="text-neutral-600">Periodo anterior</strong>.</p> <span class="font-medium text-neutral-600">${escape_html(rangoLabels[rangoSeleccionado])}</span></div>`);
			}
			Card($$renderer, {
				title: "Comparativa evolutiva de casos",
				footer,
				children: ($$renderer) => {
					$$renderer.push(`<div class="h-72">`);
					ChartWrapper($$renderer, {
						type: "line",
						data: comparativaData(),
						options: comparativaOptions
					});
					$$renderer.push(`<!----></div>`);
				},
				$$slots: {
					footer: true,
					default: true
				}
			});
		}
		$$renderer.push(`<!----></div>`);
		$$renderer.push(`<!--]--> <div class="border-t border-neutral-200 pt-6"><div class="mb-4 flex items-center justify-between"><div><div class="flex items-center gap-2"><h3 class="font-heading text-lg font-bold text-neutral-900">Comparativa Interanual (Año a Año)</h3> <span class="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-800">2025 vs 2026</span></div> <p class="text-xs text-neutral-500">Evolución interanual por motivo de comité. Variación general: <strong class="text-success-600 font-semibold">${escape_html(comparativaAnual().variacionGlobalPct)}%</strong></p></div></div> <div class="grid grid-cols-1 gap-6 lg:grid-cols-3"><div class="lg:col-span-2">`);
		Card($$renderer, {
			title: "Casos acumulados por tipología (2025 vs 2026)",
			children: ($$renderer) => {
				$$renderer.push(`<div class="h-72">`);
				ChartWrapper($$renderer, {
					type: "bar",
					data: anualChartData(),
					options: anualChartOptions
				});
				$$renderer.push(`<!----></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> `);
		{
			function footer($$renderer) {
				$$renderer.push(`<p class="text-xs text-neutral-500 text-center">Tendencia de reducción sostenida en citaciones a comité.</p>`);
			}
			Card($$renderer, {
				title: "Variación relativa (Δ%)",
				footer,
				children: ($$renderer) => {
					$$renderer.push(`<ul class="divide-y divide-neutral-100 text-sm"><!--[-->`);
					const each_array_1 = ensure_array_like(comparativaAnual().categorias);
					for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
						let cat = each_array_1[i];
						const pct = comparativaAnual().variacionPct[i];
						$$renderer.push(`<li class="flex items-center justify-between py-2.5"><span class="text-neutral-700 font-medium">${escape_html(cat)}</span> <div class="flex items-center gap-2"><span class="text-xs text-neutral-400">${escape_html(comparativaAnual().serie2025[i])} → ${escape_html(comparativaAnual().serie2026[i])}</span> <span${attr_class(`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${pct < 0 ? "bg-success-500/10 text-success-600" : "bg-danger-500/10 text-danger-600"}`)}>${escape_html(pct > 0 ? "+" : "")}${escape_html(pct)}%</span></div></li>`);
					}
					$$renderer.push(`<!--]--></ul>`);
				},
				$$slots: {
					footer: true,
					default: true
				}
			});
		}
		$$renderer.push(`<!----></div></div> <div class="border-t border-neutral-200 pt-6">`);
		Card($$renderer, {
			class: "border-accent-200/80 bg-gradient-to-br from-white via-white to-accent-50/30",
			children: ($$renderer) => {
				$$renderer.push(`<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-4"><div class="flex items-start gap-3"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600 shadow-xs"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path></svg></div> <div><div class="flex items-center gap-2"><h3 class="font-heading text-base font-bold text-neutral-900">Proyección de Tendencias y Alertas Tempranas (IA)</h3> <span class="rounded-full bg-accent-500/20 px-2 py-0.5 text-[10px] font-semibold text-accent-700">Beta / Calibración</span></div> <p class="text-xs text-neutral-600">${escape_html(prediccionIA().modeloInfo.nombre)} · Confianza estimada: <strong>${escape_html(prediccionIA().modeloInfo.confianzaPromedio)}</strong> · ${escape_html(prediccionIA().modeloInfo.horizonte)}</p></div></div> <div class="flex items-center gap-2">`);
				Badge($$renderer, {
					variant: "neutral",
					children: ($$renderer) => {
						$$renderer.push(`<!---->FastAPI Model Worker`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div></div> <div class="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-2"><div><p class="text-xs font-semibold text-neutral-700 mb-2">Curva proyectada de citaciones a comité (Octubre 2026 - Febrero 2027)</p> <div class="h-64">`);
				ChartWrapper($$renderer, {
					type: "line",
					data: prediccionChartData(),
					options: prediccionChartOptions
				});
				$$renderer.push(`<!----></div></div> <div class="space-y-3"><p class="text-xs font-semibold text-neutral-700">Alertas preventivas inferidas por el modelo</p> <!--[-->`);
				const each_array_2 = ensure_array_like(prediccionIA().insightsIA);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let insight = each_array_2[$$index_2];
					$$renderer.push(`<div class="rounded-lg border border-neutral-200/80 bg-white p-3.5 shadow-2xs"><div class="flex items-center justify-between"><span class="font-heading text-xs font-bold text-neutral-900 flex items-center gap-1.5">`);
					if (insight.tipo === "alerta") $$renderer.push(`<!--[0--><span class="h-2 w-2 rounded-full bg-warning-500"></span>`);
					else if (insight.tipo === "riesgo") $$renderer.push(`<!--[1--><span class="h-2 w-2 rounded-full bg-danger-500"></span>`);
					else $$renderer.push(`<!--[-1--><span class="h-2 w-2 rounded-full bg-accent-500"></span>`);
					$$renderer.push(`<!--]--> ${escape_html(insight.titulo)}</span> <span class="text-[11px] font-semibold text-neutral-500">Prob: ${escape_html(insight.probabilidad)}</span></div> <p class="mt-1 text-xs text-neutral-600 leading-relaxed">${escape_html(insight.descripcion)}</p> <div class="mt-2 rounded bg-neutral-50 p-2 text-[11px] text-neutral-700 border-l-2 border-primary-500"><strong>Sugerencia institucional:</strong> ${escape_html(insight.sugerencia)}</div></div>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></div>`);
	});
}
//#endregion
export { _page as default };
