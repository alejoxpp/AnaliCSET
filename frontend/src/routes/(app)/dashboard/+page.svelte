<script>
	import Card from '$lib/components/Card.svelte';
	import ChartWrapper from '$lib/components/ChartWrapper.svelte';

	let { data } = $props();
	const kpis = $derived(data.summary.kpis);
	const evolucion = $derived(data.summary.evolucion);
	const ultimosPatrones = $derived(data.summary.ultimosPatrones);

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
				// Mismo tono que --color-primary-600 en app.css.
				borderColor: '#2a527a',
				backgroundColor: 'rgba(42, 82, 122, 0.15)',
				tension: 0.3,
				fill: true
			}
		]
	});

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: { legend: { display: false } },
		scales: { y: { beginAtZero: true } }
	};
</script>

<svelte:head>
	<title>Dashboard · AnaliCSET</title>
</svelte:head>

<div class="space-y-6">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<Card>
			<p class="text-sm text-neutral-500">Actas cargadas</p>
			<p class="font-heading text-3xl font-semibold text-neutral-900">{kpis.totalActas}</p>
		</Card>
		<Card>
			<p class="text-sm text-neutral-500">Casos totales</p>
			<p class="font-heading text-3xl font-semibold text-neutral-900">{kpis.totalCasos}</p>
		</Card>
		<Card>
			<p class="text-sm text-neutral-500">Patrones detectados por IA</p>
			<p class="font-heading text-3xl font-semibold text-accent-600">{kpis.patronesDetectados}</p>
		</Card>
		<Card>
			<p class="text-sm text-neutral-500">Última carga</p>
			<p class="font-heading text-3xl font-semibold text-neutral-900">
				{formatDate(kpis.ultimaCarga)}
			</p>
		</Card>
	</div>

	<Card title="Evolución de casos">
		<div class="h-72">
			<ChartWrapper type="line" data={chartData} options={chartOptions} />
		</div>
	</Card>

	<Card title="Últimos patrones detectados por IA">
		<ul class="divide-y divide-neutral-200">
			{#each ultimosPatrones as patron (patron.id)}
				<li class="flex items-center justify-between gap-4 py-3">
					<div>
						<p class="text-sm font-medium text-neutral-900">{patron.titulo}</p>
						<p class="text-xs text-neutral-500">{formatDate(patron.fecha)}</p>
					</div>
					<a
						href="/patrones/{patron.id}"
						class="shrink-0 text-sm font-medium text-primary-700 underline"
					>
						Ver detalle
					</a>
				</li>
			{/each}
		</ul>
	</Card>
</div>
