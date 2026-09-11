<script>
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import ChartWrapper from '$lib/components/ChartWrapper.svelte';
	import { getEstadisticas } from '$lib/api/estadisticas.js';
	import { toasts } from '$lib/stores/toast.js';

	let { data } = $props();

	// Estado reactivo sincronizado con Svelte 5
	let statsOverride = $state(null);
	const stats = $derived(statsOverride ?? data.estadisticas);
	const comparativaAnual = $derived(data.comparativaAnual);
	const prediccionIA = $derived(data.prediccionIA);

	// ── Selector de rango reactivo ────────────────────────────────────
	let rangoSeleccionado = $state('anioCompleto');
	let fechaDesde = $state('2026-01-01');
	let fechaHasta = $state('2026-09-30');
	let cargando = $state(false);

	$effect(() => {
		if (data.estadisticas?.desde && !statsOverride) fechaDesde = data.estadisticas.desde;
		if (data.estadisticas?.hasta && !statsOverride) fechaHasta = data.estadisticas.hasta;
	});

	// Referencias a los componentes de gráfico para exportación
	let chartCasosRef = $state(null);
	let chartPatronesRef = $state(null);
	let chartCompRef = $state(null);
	let chartAnualRef = $state(null);
	let chartPredRef = $state(null);

	const rangoLabels = {
		ultimoMes: 'Último mes',
		ultimoTrimestre: 'Último trimestre',
		ultimoSemestre: 'Último semestre',
		anioCompleto: 'Año completo',
		personalizado: 'Personalizado'
	};

	async function cambiarRango(nuevoRango) {
		rangoSeleccionado = nuevoRango;
		cargando = true;

		// Ajustar fechas mock si es un preset conocido
		if (nuevoRango === 'ultimoMes') {
			fechaDesde = '2026-09-01';
			fechaHasta = '2026-09-30';
		} else if (nuevoRango === 'ultimoTrimestre') {
			fechaDesde = '2026-07-01';
			fechaHasta = '2026-09-30';
		} else if (nuevoRango === 'ultimoSemestre') {
			fechaDesde = '2026-04-01';
			fechaHasta = '2026-09-30';
		} else if (nuevoRango === 'anioCompleto') {
			fechaDesde = '2026-01-01';
			fechaHasta = '2026-09-30';
		}

		try {
			statsOverride = await getEstadisticas({
				rango: nuevoRango,
				desde: fechaDesde,
				hasta: fechaHasta
			});
			toasts.add(`Estadísticas actualizadas: ${rangoLabels[nuevoRango]}`, 'neutral', 2500);
		} catch {
			toasts.add('No se pudieron actualizar los datos del periodo seleccionado', 'danger');
		} finally {
			cargando = false;
		}
	}

	async function aplicarRangoPersonalizado() {
		if (!fechaDesde || !fechaHasta) {
			toasts.add('Por favor selecciona una fecha de inicio y fin válidas', 'danger');
			return;
		}
		if (fechaDesde > fechaHasta) {
			toasts.add('La fecha de inicio no puede ser posterior a la fecha final', 'danger');
			return;
		}

		rangoSeleccionado = 'personalizado';
		cargando = true;
		try {
			statsOverride = await getEstadisticas({
				rango: 'personalizado',
				desde: fechaDesde,
				hasta: fechaHasta
			});
			toasts.add('Rango personalizado aplicado con éxito', 'success', 3000);
		} catch {
			toasts.add('Error al filtrar por rango personalizado', 'danger');
		} finally {
			cargando = false;
		}
	}

	// ── Colores del design system ──────────────────────────────────────
	const COLORS = {
		primary600: '#0d69fc',
		primary700: '#0852ca',
		primary900: '#1a377d',
		primary200: '#bad6ff',
		accent500: '#00c853',
		accent400: '#34d399',
		cyan500: '#00b4d8',
		danger500: '#ef4444',
		warning500: '#f59e0b',
		neutral400: '#94a3b8',
		neutral600: '#475569'
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
		'#00c853',
		'#34d399',
		'#00b4d8',
		'#0d69fc',
		'#1a377d'
	];

	// ── Datos reactivos de gráficos ────────────────────────────────────
	const casosPorTipoData = $derived({
		labels: stats.casosPorTipo.labels,
		datasets: [
			{
				data: stats.casosPorTipo.valores,
				backgroundColor: doughnutPalette,
				borderWidth: 2,
				borderColor: '#ffffff',
				hoverOffset: 8
			}
		]
	});

	const casosPorTipoOptions = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: '58%',
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					usePointStyle: true,
					pointStyle: 'circle',
					boxWidth: 6,
					padding: 8,
					font: { size: 11 }
				}
			},
			tooltip: {
				backgroundColor: 'rgba(15, 23, 42, 0.95)',
				padding: 12,
				cornerRadius: 8,
				callbacks: {
					label: (ctx) => {
						const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
						const val = ctx.raw;
						const pct = Math.round((val / total) * 100);
						return ` ${val} casos (${pct}%)`;
					}
				}
			}
		}
	};

	const patronesData = $derived({
		labels: stats.patronesPorCategoria.labels,
		datasets: [
			{
				data: stats.patronesPorCategoria.valores,
				backgroundColor: barPalette,
				borderRadius: 6,
				borderWidth: 0,
				barThickness: 24
			}
		]
	});

	const patronesOptions = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: 'y',
		plugins: {
			legend: { display: false },
			tooltip: {
				backgroundColor: 'rgba(15, 23, 42, 0.95)',
				padding: 12,
				cornerRadius: 8,
				callbacks: {
					label: (ctx) => ` ${ctx.raw}% del total de patrones detectados por IA`
				}
			}
		},
		scales: {
			x: {
				beginAtZero: true,
				max: 40,
				grid: { color: 'rgba(0,0,0,0.05)' },
				ticks: { callback: (v) => `${v}%`, font: { size: 11 } }
			},
			y: {
				grid: { display: false },
				ticks: { font: { size: 11, weight: '500' } }
			}
		}
	};

	const comparativaData = $derived({
		labels: stats.comparativaPeriodo.labels,
		datasets: [
			{
				label: 'Periodo actual',
				data: stats.comparativaPeriodo.actual,
				borderColor: COLORS.primary600,
				backgroundColor: 'rgba(13, 105, 252, 0.12)',
				tension: 0.35,
				fill: true,
				pointBackgroundColor: COLORS.primary600,
				pointRadius: 4,
				pointHoverRadius: 6
			},
			{
				label: 'Periodo anterior',
				data: stats.comparativaPeriodo.anterior,
				borderColor: COLORS.neutral400,
				backgroundColor: 'rgba(148, 163, 184, 0.08)',
				tension: 0.35,
				fill: true,
				borderDash: [5, 4],
				pointBackgroundColor: COLORS.neutral400,
				pointRadius: 4,
				pointHoverRadius: 6
			}
		]
	});

	const comparativaOptions = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: { mode: 'index', intersect: false },
		plugins: {
			legend: {
				position: 'top',
				align: 'end',
				labels: {
					usePointStyle: true,
					pointStyle: 'circle',
					boxWidth: 8,
					padding: 16,
					font: { size: 12 }
				}
			},
			tooltip: {
				backgroundColor: 'rgba(15, 23, 42, 0.95)',
				padding: 12,
				cornerRadius: 8,
				titleFont: { weight: '600' }
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: { color: 'rgba(0,0,0,0.05)' },
				ticks: { font: { size: 11 } }
			},
			x: {
				grid: { display: false },
				ticks: { font: { size: 11 } }
			}
		}
	};

	// ── Gráfico Comparativa Anual (Fase 7) ─────────────────────────────
	const anualChartData = $derived({
		labels: comparativaAnual.categorias,
		datasets: [
			{
				label: '2025 (Año anterior)',
				data: comparativaAnual.serie2025,
				backgroundColor: '#94a3b8',
				borderRadius: 4
			},
			{
				label: '2026 (Año actual)',
				data: comparativaAnual.serie2026,
				backgroundColor: COLORS.primary600,
				borderRadius: 4
			}
		]
	});

	const anualChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
				align: 'end',
				labels: { usePointStyle: true, boxWidth: 8, font: { size: 11 } }
			},
			tooltip: {
				backgroundColor: 'rgba(15, 23, 42, 0.95)',
				padding: 10,
				cornerRadius: 8
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: { color: 'rgba(0,0,0,0.05)' },
				ticks: { font: { size: 11 } }
			},
			x: {
				grid: { display: false },
				ticks: { font: { size: 11 } }
			}
		}
	};

	// ── Gráfico Proyección IA (Fase 7) ──────────────────────────────────
	const prediccionChartData = $derived({
		labels: prediccionIA.serieProyectada.labels,
		datasets: [
			{
				label: 'Límite superior (95% CI)',
				data: prediccionIA.serieProyectada.limiteSuperior,
				borderColor: 'transparent',
				backgroundColor: 'rgba(0, 200, 83, 0.12)',
				fill: '+1',
				tension: 0.35,
				pointRadius: 0
			},
			{
				label: 'Proyección IA estimada',
				data: prediccionIA.serieProyectada.valores,
				borderColor: COLORS.accent500,
				borderDash: [6, 4],
				borderWidth: 2.5,
				backgroundColor: 'transparent',
				tension: 0.35,
				pointBackgroundColor: COLORS.accent500,
				pointRadius: 4,
				pointHoverRadius: 6
			},
			{
				label: 'Límite inferior (95% CI)',
				data: prediccionIA.serieProyectada.limiteInferior,
				borderColor: 'transparent',
				backgroundColor: 'transparent',
				fill: false,
				tension: 0.35,
				pointRadius: 0
			}
		]
	});

	const prediccionChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: { mode: 'index', intersect: false },
		plugins: {
			legend: {
				position: 'top',
				align: 'end',
				labels: {
					usePointStyle: true,
					boxWidth: 8,
					font: { size: 11 },
					filter: (item) => !item.text.includes('Límite inferior')
				}
			},
			tooltip: {
				backgroundColor: 'rgba(15, 23, 42, 0.95)',
				padding: 10,
				cornerRadius: 8
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: { color: 'rgba(0,0,0,0.05)' },
				ticks: { font: { size: 11 } }
			},
			x: {
				grid: { display: false },
				ticks: { font: { size: 11 } }
			}
		}
	};

	// ── Exportación en el cliente (Fase 7) ──────────────────────────────
	function exportarPDF() {
		toasts.add('Preparando vista de impresión del informe...', 'neutral', 2000);
		setTimeout(() => {
			window.print();
		}, 300);
	}

	function exportarCSV() {
		try {
			const headers = ['Tipo de Indicador', 'Categoría / Etiqueta', 'Valor / Porcentaje'];
			const rows = [
				...stats.casosPorTipo.labels.map((l, i) => ['Casos por tipo', l, stats.casosPorTipo.valores[i]]),
				...stats.patronesPorCategoria.labels.map((l, i) => ['Patrón IA', l, `${stats.patronesPorCategoria.valores[i]}%`]),
				...stats.comparativaPeriodo.labels.map((l, i) => [
					'Comparativa periodo',
					l,
					`Actual: ${stats.comparativaPeriodo.actual[i]} | Anterior: ${stats.comparativaPeriodo.anterior[i]}`
				])
			];

			const csvContent =
				'data:text/csv;charset=utf-8,\uFEFF' +
				[headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

			const encodedUri = encodeURI(csvContent);
			const link = document.createElement('a');
			link.setAttribute('href', encodedUri);
			link.setAttribute('download', `analicset_estadisticas_${rangoSeleccionado}_${fechaHasta}.csv`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			toasts.add('Archivo CSV descargado con éxito', 'success');
		} catch {
			toasts.add('Error al generar el archivo CSV', 'danger');
		}
	}

	function exportarPNG() {
		try {
			const canvas = document.querySelector('canvas');
			if (!canvas) {
				toasts.add('No se encontró el gráfico para exportar', 'danger');
				return;
			}
			const imageURI = canvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.download = `analicset_grafico_${rangoSeleccionado}.png`;
			link.href = imageURI;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			toasts.add('Gráfico exportado como PNG', 'success');
		} catch {
			toasts.add('Error al exportar gráfico como imagen', 'danger');
		}
	}
</script>

<svelte:head>
	<title>Estadísticas del Comité · AnaliCSET</title>
</svelte:head>

<div class="animate-fade-in-up space-y-6">
	<!-- ═══ Barra de Encabezado y Acciones de Exportación ═══ -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:mb-4">
		<div>
			<div class="flex items-center gap-2">
				<span class="inline-flex items-center gap-1 rounded-md bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-800">
					SENA · CSET
				</span>
				<span class="text-xs text-neutral-500">Comité de Evaluación y Seguimiento</span>
			</div>
			<h2 class="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl mt-1">
				Análisis Estadístico e Inteligencia del Comité
			</h2>
			<p class="text-sm text-neutral-600">
				Monitoreo de comportamiento disciplinario y académico, correlaciones IA y proyecciones.
			</p>
		</div>

		<!-- Botones de Acción / Exportación (Fase 7) -->
		<div class="flex flex-wrap items-center gap-2 print:hidden">
			<button
				type="button"
				onclick={exportarCSV}
				class="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 shadow-xs transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
				title="Descargar datos en formato CSV"
			>
				<svg class="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
				</svg>
				Exportar CSV
			</button>

			<button
				type="button"
				onclick={exportarPNG}
				class="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 shadow-xs transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
				title="Guardar gráfico principal como imagen PNG"
			>
				<svg class="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
					<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
				</svg>
				PNG
			</button>

			<Button variant="primary" onclick={exportarPDF}>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m0 0a48.159 48.159 0 0 1 10.5 0m-10.5 0V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.659M9.75 21h4.5" />
				</svg>
				Imprimir / PDF
			</Button>
		</div>
	</div>

	<!-- ═══ Selector de Rango y Filtros Reactivos ═══ -->
	<Card class="print:hidden">
		<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
			<!-- Presets rápidos -->
			<div class="flex flex-col gap-1.5">
				<span class="text-xs font-semibold tracking-wide text-neutral-600 uppercase">
					Periodo de análisis
				</span>
				<div
					class="inline-flex flex-wrap items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 p-1"
					role="group"
					aria-label="Selector de rango temporal"
				>
					{#each ['ultimoMes', 'ultimoTrimestre', 'ultimoSemestre', 'anioCompleto'] as key}
						<button
							type="button"
							onclick={() => cambiarRango(key)}
							aria-pressed={rangoSeleccionado === key}
							class="rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
								{rangoSeleccionado === key
								? 'bg-primary-600 text-white shadow-xs'
								: 'text-neutral-700 hover:bg-white hover:text-neutral-900'}"
						>
							{rangoLabels[key]}
						</button>
					{/each}
				</div>
			</div>

			<!-- Selectores de fechas personalizadas -->
			<form
				onsubmit={(e) => { e.preventDefault(); aplicarRangoPersonalizado(); }}
				class="flex flex-wrap items-end gap-3 pt-2 lg:pt-0"
			>
				<div>
					<label for="fecha-desde" class="block text-xs font-medium text-neutral-700 mb-1">
						Desde
					</label>
					<input
						id="fecha-desde"
						type="date"
						bind:value={fechaDesde}
						class="rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
					/>
				</div>

				<div>
					<label for="fecha-hasta" class="block text-xs font-medium text-neutral-700 mb-1">
						Hasta
					</label>
					<input
						id="fecha-hasta"
						type="date"
						bind:value={fechaHasta}
						class="rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
					/>
				</div>

				<button
					type="submit"
					class="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 cursor-pointer"
				>
					Filtrar
				</button>
			</form>
		</div>

		<!-- Etiqueta del rango activo -->
		<div class="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
			<p>
				Mostrando datos del intervalo:
				<strong class="font-semibold text-neutral-800">{stats.desde}</strong> al
				<strong class="font-semibold text-neutral-800">{stats.hasta}</strong>
				({rangoLabels[rangoSeleccionado]})
			</p>
			{#if cargando}
				<span class="inline-flex items-center gap-1 font-medium text-primary-600">
					<span class="h-2 w-2 animate-ping rounded-full bg-primary-600"></span>
					Actualizando gráficos…
				</span>
			{/if}
		</div>
	</Card>

	<!-- ═══ Fila de KPIs del periodo ═══ -->
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
		<div class="rounded-lg border border-neutral-200 bg-white p-4 shadow-xs">
			<p class="text-xs font-medium text-neutral-500">Casos en periodo</p>
			<p class="mt-1 font-heading text-2xl font-bold text-neutral-900">{stats.totalCasos}</p>
			<span class="mt-1 inline-flex text-[11px] font-medium text-success-600">↓ 19.4% vs periodo ant.</span>
		</div>
		<div class="rounded-lg border border-neutral-200 bg-white p-4 shadow-xs">
			<p class="text-xs font-medium text-neutral-500">Causa principal</p>
			<p class="mt-1 font-heading text-xl font-bold text-primary-900">Inasistencia</p>
			<span class="mt-1 text-[11px] text-neutral-500">31% del volumen total</span>
		</div>
		<div class="rounded-lg border border-neutral-200 bg-white p-4 shadow-xs">
			<p class="text-xs font-medium text-neutral-500">Patrón IA crítico</p>
			<p class="mt-1 font-heading text-xl font-bold text-accent-700">Reincidencia</p>
			<span class="mt-1 text-[11px] text-accent-600 font-medium">Detectado en 28 fichas</span>
		</div>
		<div class="rounded-lg border border-neutral-200 bg-white p-4 shadow-xs">
			<p class="text-xs font-medium text-neutral-500">Acuerdos efectivos</p>
			<p class="mt-1 font-heading text-2xl font-bold text-neutral-900">84.2%</p>
			<span class="mt-1 text-[11px] text-success-600 font-medium">Cumplimiento positivo</span>
		</div>
	</div>

	<!-- ═══ Fila 1: Distribución + Patrones IA (Grid Responsive md:grid-cols-2) ═══ -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- Card 1: Distribución de casos por tipo -->
		{#if cargando}
			<Skeleton type="chart" />
		{:else}
			<div class="animate-fade-in-up" style="animation-delay: 50ms;">
				<Card title="Distribución de casos por tipo">
					{#snippet footer()}
						<div class="flex items-center justify-between text-xs text-neutral-500">
							<span>Categorías reglamentarias SENA</span>
							<span class="font-medium text-neutral-700">Total: {stats.totalCasos} casos</span>
						</div>
					{/snippet}
					<div class="h-80">
						<ChartWrapper
							type="doughnut"
							data={casosPorTipoData}
							options={casosPorTipoOptions}
							bind:this={chartCasosRef}
						/>
					</div>
				</Card>
			</div>
		{/if}

		<!-- Card 2: Patrones detectados por IA (%) -->
		{#if cargando}
			<Skeleton type="chart" />
		{:else}
			<div class="animate-fade-in-up" style="animation-delay: 120ms;">
				<Card title="Patrones detectados por IA (%)">
					{#snippet footer()}
						<div class="flex items-center justify-between text-xs text-neutral-500">
							<span>Frecuencia relativa en actas CSET</span>
							<Badge variant="accent">Motor IA Activo</Badge>
						</div>
					{/snippet}
					<div class="h-80">
						<ChartWrapper
							type="bar"
							data={patronesData}
							options={patronesOptions}
							bind:this={chartPatronesRef}
						/>
					</div>
				</Card>
			</div>
		{/if}
	</div>

	<!-- ═══ Fila 2: Comparativa por periodo ═══ -->
	{#if cargando}
		<Skeleton type="chart" />
	{:else}
		<div class="animate-fade-in-up" style="animation-delay: 180ms;">
			<Card title="Comparativa evolutiva de casos">
				{#snippet footer()}
					<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500">
						<p>
							Curva continua: <strong class="text-primary-700">Periodo actual</strong> | Línea segmentada: <strong class="text-neutral-600">Periodo anterior</strong>.
						</p>
						<span class="font-medium text-neutral-600">{rangoLabels[rangoSeleccionado]}</span>
					</div>
				{/snippet}
				<div class="h-72">
					<ChartWrapper
						type="line"
						data={comparativaData}
						options={comparativaOptions}
						bind:this={chartCompRef}
					/>
				</div>
			</Card>
		</div>
	{/if}

	<!-- ═══ FASE 7: Dashboard Avanzado — Comparativa Año a Año (YoY) ═══ -->
	<div class="border-t border-neutral-200 pt-6">
		<div class="mb-4 flex items-center justify-between">
			<div>
				<div class="flex items-center gap-2">
					<h3 class="font-heading text-lg font-bold text-neutral-900">
						Comparativa Interanual (Año a Año)
					</h3>
					<span class="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-800">
						2025 vs 2026
					</span>
				</div>
				<p class="text-xs text-neutral-500">
					Evolución interanual por motivo de comité. Variación general:
					<strong class="text-success-600 font-semibold">{comparativaAnual.variacionGlobalPct}%</strong>
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<!-- Gráfico de barras agrupadas -->
			<div class="lg:col-span-2">
				<Card title="Casos acumulados por tipología (2025 vs 2026)">
					<div class="h-72">
						<ChartWrapper
							type="bar"
							data={anualChartData}
							options={anualChartOptions}
							bind:this={chartAnualRef}
						/>
					</div>
				</Card>
			</div>

			<!-- Tarjeta de variaciones porcentuales -->
			<Card title="Variación relativa (Δ%)">
				<ul class="divide-y divide-neutral-100 text-sm">
					{#each comparativaAnual.categorias as cat, i}
						{@const pct = comparativaAnual.variacionPct[i]}
						<li class="flex items-center justify-between py-2.5">
							<span class="text-neutral-700 font-medium">{cat}</span>
							<div class="flex items-center gap-2">
								<span class="text-xs text-neutral-400">
									{comparativaAnual.serie2025[i]} → {comparativaAnual.serie2026[i]}
								</span>
								<span
									class="inline-flex rounded-md px-2 py-0.5 text-xs font-semibold
										{pct < 0 ? 'bg-success-500/10 text-success-600' : 'bg-danger-500/10 text-danger-600'}"
								>
									{pct > 0 ? '+' : ''}{pct}%
								</span>
							</div>
						</li>
					{/each}
				</ul>
				{#snippet footer()}
					<p class="text-xs text-neutral-500 text-center">
						Tendencia de reducción sostenida en citaciones a comité.
					</p>
				{/snippet}
			</Card>
		</div>
	</div>

	<!-- ═══ FASE 7: Placeholder de UI para Predicción de Tendencias (IA) ═══ -->
	<div class="border-t border-neutral-200 pt-6">
		<Card class="border-accent-200/80 bg-gradient-to-br from-white via-white to-accent-50/30">
			<!-- Header del modelo IA -->
			<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-4">
				<div class="flex items-start gap-3">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600 shadow-xs">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
						</svg>
					</div>
					<div>
						<div class="flex items-center gap-2">
							<h3 class="font-heading text-base font-bold text-neutral-900">
								Proyección de Tendencias y Alertas Tempranas (IA)
							</h3>
							<span class="rounded-full bg-accent-500/20 px-2 py-0.5 text-[10px] font-semibold text-accent-700">
								Beta / Calibración
							</span>
						</div>
						<p class="text-xs text-neutral-600">
							{prediccionIA.modeloInfo.nombre} · Confianza estimada: <strong>{prediccionIA.modeloInfo.confianzaPromedio}</strong> · {prediccionIA.modeloInfo.horizonte}
						</p>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<Badge variant="neutral">FastAPI Model Worker</Badge>
				</div>
			</div>

			<!-- Contenido de la predicción: Gráfico y Alertas -->
			<div class="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-2">
				<!-- Gráfico proyectado con corredor de confianza -->
				<div>
					<p class="text-xs font-semibold text-neutral-700 mb-2">
						Curva proyectada de citaciones a comité (Octubre 2026 - Febrero 2027)
					</p>
					<div class="h-64">
						<ChartWrapper
							type="line"
							data={prediccionChartData}
							options={prediccionChartOptions}
							bind:this={chartPredRef}
						/>
					</div>
				</div>

				<!-- Hallazgos predictivos y recomendaciones -->
				<div class="space-y-3">
					<p class="text-xs font-semibold text-neutral-700">
						Alertas preventivas inferidas por el modelo
					</p>

					{#each prediccionIA.insightsIA as insight}
						<div class="rounded-lg border border-neutral-200/80 bg-white p-3.5 shadow-2xs">
							<div class="flex items-center justify-between">
								<span class="font-heading text-xs font-bold text-neutral-900 flex items-center gap-1.5">
									{#if insight.tipo === 'alerta'}
										<span class="h-2 w-2 rounded-full bg-warning-500"></span>
									{:else if insight.tipo === 'riesgo'}
										<span class="h-2 w-2 rounded-full bg-danger-500"></span>
									{:else}
										<span class="h-2 w-2 rounded-full bg-accent-500"></span>
									{/if}
									{insight.titulo}
								</span>
								<span class="text-[11px] font-semibold text-neutral-500">
									Prob: {insight.probabilidad}
								</span>
							</div>
							<p class="mt-1 text-xs text-neutral-600 leading-relaxed">
								{insight.descripcion}
							</p>
							<div class="mt-2 rounded bg-neutral-50 p-2 text-[11px] text-neutral-700 border-l-2 border-primary-500">
								<strong>Sugerencia institucional:</strong> {insight.sugerencia}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</Card>
	</div>
</div>
