<script>
	import Card from '$lib/components/Card.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import ChartWrapper from '$lib/components/ChartWrapper.svelte';
	import InsightCard from '$lib/components/InsightCard.svelte';
	import PrintButton from '$lib/components/PrintButton.svelte';
	import { theme } from '$lib/stores/theme.js';
	import { chartTheme } from '$lib/chartTheme.js';

	let { data } = $props();
	const kpis = $derived(data.summary.kpis);
	const evolucion = $derived(data.summary.evolucion);
	const ultimasActas = $derived(data.summary.ultimasActas);
	const ultimosPatrones = $derived(data.summary.ultimosPatrones);
	const insight = $derived(data.summary.insight);
	const comparativa = $derived(data.summary.comparativa);

	const ct = $derived(chartTheme($theme === 'dark'));

	/** Variación porcentual del periodo actual frente al anterior. */
	function variacion(actual, anterior) {
		if (!anterior) return 0;
		return Math.round(((actual - anterior) / anterior) * 100);
	}

	const dateFormatter = new Intl.DateTimeFormat('es-CO', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});

	function formatDate(isoDate) {
		return dateFormatter.format(new Date(`${isoDate}T00:00:00`));
	}

	const chartData = $derived({
		labels: evolucion.labels,
		datasets: [
			{
				label: 'Casos',
				data: evolucion.casos,
				borderColor: '#0d69fc',
				backgroundColor: 'rgba(13, 105, 252, 0.12)',
				tension: 0.35,
				fill: true,
				pointBackgroundColor: '#0d69fc',
				pointRadius: 4,
				pointHoverRadius: 6
			},
			{
				label: 'Actas',
				data: evolucion.actas,
				borderColor: '#00c853',
				backgroundColor: 'rgba(0, 200, 83, 0.08)',
				tension: 0.35,
				fill: true,
				borderDash: [5, 3],
				pointBackgroundColor: '#00c853',
				pointRadius: 4,
				pointHoverRadius: 6
			}
		]
	});

	const chartOptions = $derived({
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index',
			intersect: false
		},
		plugins: {
			legend: {
				display: true,
				position: 'top',
				align: 'end',
				labels: {
					usePointStyle: true,
					pointStyle: 'circle',
					boxWidth: 6,
					padding: 16,
					font: { size: 12 },
					color: ct.legend
				}
			},
			tooltip: {
				backgroundColor: ct.tooltipBg,
				padding: 10,
				cornerRadius: 8,
				titleFont: { weight: '600' },
				bodyFont: { size: 13 }
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: { color: ct.grid },
				ticks: { font: { size: 11 }, color: ct.tick }
			},
			x: {
				grid: { display: false },
				ticks: { font: { size: 11 }, color: ct.tick }
			}
		}
	});
</script>

<svelte:head>
	<title>Dashboard · AnaliCSET</title>
</svelte:head>

<div class="space-y-6">
	<!-- ═══ Encabezado con acción de reporte ═══ -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h2
				class="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-50"
			>
				Resumen del Comité
			</h2>
			<p class="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
				Estado general del histórico CSET y hallazgos recientes del análisis.
			</p>
		</div>
		<div class="print:hidden">
			<PrintButton />
		</div>
	</div>

	<!-- ═══ Hallazgo destacado de IA ═══ -->
	<InsightCard
		titulo={insight.titulo}
		descripcion={insight.descripcion}
		delta={insight.delta}
		trend={insight.trend}
		href="/patrones/{insight.patronId}"
	/>

	<!-- ═══ KPI Cards ═══ -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<KpiCard label="Actas cargadas" class="stagger-1">
			{#snippet icon()}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
				</svg>
			{/snippet}
			{#snippet value()}{kpis.totalActas}{/snippet}
		</KpiCard>

		<KpiCard label="Casos totales" class="stagger-2">
			{#snippet icon()}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
				</svg>
			{/snippet}
			{#snippet value()}{kpis.totalCasos}{/snippet}
		</KpiCard>

		<KpiCard label="Patrones IA" accent class="stagger-3">
			{#snippet icon()}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
				</svg>
			{/snippet}
			{#snippet value()}{kpis.patronesDetectados}{/snippet}
		</KpiCard>

		<KpiCard label="Última carga" class="stagger-4">
			{#snippet icon()}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
				</svg>
			{/snippet}
			{#snippet value()}{formatDate(kpis.ultimaCarga)}{/snippet}
		</KpiCard>
	</div>

	<!-- ═══ Gráfico de evolución ═══ -->
	<div class="animate-fade-in-up" style="animation-delay: 300ms;">
		<Card title="Evolución de casos y actas">
			<div class="h-72">
				<ChartWrapper type="line" data={chartData} options={chartOptions} />
			</div>
		</Card>
	</div>

	<!-- ═══ Comparador: periodo actual vs. anterior ═══ -->
	<div class="animate-fade-in-up" style="animation-delay: 340ms;">
		<Card title="Este periodo frente al anterior">
			<div class="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
				<span class="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-200">
					<span class="h-2 w-2 rounded-full bg-primary-600"></span>
					{comparativa.periodoActual}
				</span>
				<span class="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
					<span class="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-600"></span>
					{comparativa.periodoAnterior}
				</span>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each comparativa.metricas as metrica (metrica.label)}
					{@const delta = variacion(metrica.actual, metrica.anterior)}
					{@const maximo = Math.max(metrica.actual, metrica.anterior) || 1}
					<div>
						<p class="text-xs text-neutral-500 dark:text-neutral-400">{metrica.label}</p>
						<div class="mt-1 flex items-baseline gap-2">
							<span class="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-50">
								{metrica.actual}
							</span>
							<span
								class="text-xs font-semibold {delta > 0
									? 'text-danger-600 dark:text-danger-500'
									: delta < 0
										? 'text-success-600 dark:text-success-500'
										: 'text-neutral-400'}"
							>
								{delta > 0 ? '+' : ''}{delta}%
							</span>
						</div>

						<!-- Barras comparadas: actual sobre anterior -->
						<div class="mt-2 space-y-1">
							<div class="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
								<div
									class="h-full rounded-full bg-primary-600 transition-[width] duration-700 ease-out"
									style="width: {(metrica.actual / maximo) * 100}%"
								></div>
							</div>
							<div class="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
								<div
									class="h-full rounded-full bg-neutral-300 transition-[width] duration-700 ease-out dark:bg-neutral-600"
									style="width: {(metrica.anterior / maximo) * 100}%"
								></div>
							</div>
						</div>
						<p class="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
							antes: {metrica.anterior}
						</p>
					</div>
				{/each}
			</div>
		</Card>
	</div>

	<!-- ═══ Secciones inferiores: Últimas actas + Patrones IA ═══ -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- Últimas actas cargadas -->
		<div class="animate-fade-in-up" style="animation-delay: 400ms;">
			<Card title="Últimas actas cargadas">
				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead>
							<tr class="border-b border-neutral-200 text-xs font-medium tracking-wide text-neutral-500 uppercase dark:border-neutral-800 dark:text-neutral-400">
								<th class="pb-2 pr-4 font-medium">N.° Acta</th>
								<th class="pb-2 pr-4 font-medium">Ficha</th>
								<th class="pb-2 pr-4 font-medium">Fecha</th>
								<th class="pb-2 font-medium text-right">Casos</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-neutral-100 dark:divide-neutral-800">
							{#each ultimasActas as acta (acta.id)}
								<tr class="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td class="py-2.5 pr-4">
										<a
											href="/actas/{acta.id}"
											class="font-medium text-primary-700 hover:underline dark:text-primary-400"
										>
											{acta.numero}
										</a>
									</td>
									<td class="py-2.5 pr-4 text-neutral-600 dark:text-neutral-300">{acta.ficha}</td>
									<td class="py-2.5 pr-4 text-neutral-500 dark:text-neutral-400">
										{formatDate(acta.fecha)}
									</td>
									<td class="py-2.5 text-right">
										<Badge variant="primary">{acta.casos}</Badge>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</Card>
		</div>

		<!-- Últimos patrones detectados por IA -->
		<div class="animate-fade-in-up" style="animation-delay: 480ms;">
			<Card title="Últimos patrones detectados por IA">
				<ul class="divide-y divide-neutral-100 dark:divide-neutral-800">
					{#each ultimosPatrones as patron (patron.id)}
						<li class="flex items-start justify-between gap-4 py-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50 -mx-5 px-5 first:pt-0 last:pb-0">
							<div class="flex items-start gap-3">
								<!-- Ícono sparkle (IA) -->
								<div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-400/15">
									<svg class="h-3.5 w-3.5 text-accent-600 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
										<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
									</svg>
								</div>
								<div>
									<p class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
										{patron.titulo}
									</p>
									<p class="text-xs text-neutral-500 dark:text-neutral-400">
										{formatDate(patron.fecha)}
									</p>
								</div>
							</div>
							<a
								href="/patrones/{patron.id}"
								class="shrink-0 text-sm font-medium text-primary-700 hover:underline dark:text-primary-400"
							>
								Ver detalle
							</a>
						</li>
					{/each}
				</ul>
			</Card>
		</div>
	</div>
</div>
