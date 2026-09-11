<script>
	import Card from "$lib/components/Card.svelte";
	import ChartWrapper from "$lib/components/ChartWrapper.svelte";

	let { data } = $props();
	const stats = $derived(data.estadisticas);

	// ── Selector de rango ─────────────────────────────────────────────
	let rangoSeleccionado = $state("anioCompleto");

	const rangoLabels = {
		ultimoTrimestre: "Último trimestre",
		ultimoSemestre: "Último semestre",
		anioCompleto: "Año completo",
	};

	// Filtra la serie comparativa según el rango seleccionado.
	// En un escenario real, esto vendría del backend; aquí recortamos
	// la serie mock para simular el efecto del filtro.
	const mesesPorRango = {
		ultimoTrimestre: 3,
		ultimoSemestre: 6,
		anioCompleto: 9,
	};

	const comparativaFiltrada = $derived.by(() => {
		const n = mesesPorRango[rangoSeleccionado] ?? 9;
		const comp = stats.comparativaPeriodo;
		return {
			labels: comp.labels.slice(-n),
			actual: comp.actual.slice(-n),
			anterior: comp.anterior.slice(-n),
		};
	});

	// ── Colores del design system (sincronizados con @theme en app.css) ──
	const COLORS = {
		primary600: "#1e88e5",
		primary400: "#42a5f5",
		primary200: "#90caf9",
		accent400: "#26c97d",
		accent300: "#4dd497",
		success500: "#2e9e6a",
		danger500: "#e53935",
		neutral400: "#8e9aaa",
		neutral300: "#b8c2ce",
	};

	const doughnutPalette = [
		COLORS.primary600,
		COLORS.accent400,
		COLORS.success500,
		COLORS.danger500,
		COLORS.primary400,
		COLORS.neutral400,
	];

	const barPalette = [
		COLORS.accent400,
		COLORS.accent300,
		COLORS.primary600,
		COLORS.primary400,
		COLORS.primary200,
	];

	// ── Datos para gráficos ───────────────────────────────────────────
	const casosPorTipoData = $derived({
		labels: stats.casosPorTipo.labels,
		datasets: [
			{
				data: stats.casosPorTipo.valores,
				backgroundColor: doughnutPalette,
				borderWidth: 0,
				hoverOffset: 6,
			},
		],
	});

	const casosPorTipoOptions = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: "55%",
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					usePointStyle: true,
					pointStyle: "circle",
					boxWidth: 8,
					padding: 14,
					font: { size: 11 },
				},
			},
			tooltip: {
				backgroundColor: "rgba(20, 23, 27, 0.9)",
				padding: 10,
				cornerRadius: 8,
			},
		},
	};

	const patronesData = $derived({
		labels: stats.patronesPorCategoria.labels,
		datasets: [
			{
				data: stats.patronesPorCategoria.valores,
				backgroundColor: barPalette,
				borderWidth: 0,
				borderRadius: 4,
				barThickness: 22,
			},
		],
	});

	const patronesOptions = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: "y",
		plugins: {
			legend: { display: false },
			tooltip: {
				backgroundColor: "rgba(20, 23, 27, 0.9)",
				padding: 10,
				cornerRadius: 8,
				callbacks: {
					label: (ctx) => ` ${ctx.raw}% de patrones detectados`,
				},
			},
		},
		scales: {
			x: {
				beginAtZero: true,
				max: 100,
				grid: { color: "rgba(0,0,0,0.04)" },
				ticks: { callback: (v) => `${v}%`, font: { size: 11 } },
			},
			y: {
				grid: { display: false },
				ticks: { font: { size: 11 } },
			},
		},
	};

	const comparativaData = $derived({
		labels: comparativaFiltrada.labels,
		datasets: [
			{
				label: "Periodo actual",
				data: comparativaFiltrada.actual,
				borderColor: COLORS.primary600,
				backgroundColor: "rgba(42, 82, 122, 0.12)",
				tension: 0.35,
				fill: true,
				pointBackgroundColor: COLORS.primary600,
				pointRadius: 4,
				pointHoverRadius: 6,
			},
			{
				label: "Periodo anterior",
				data: comparativaFiltrada.anterior,
				borderColor: COLORS.neutral400,
				backgroundColor: "rgba(155, 163, 172, 0.08)",
				tension: 0.35,
				fill: true,
				borderDash: [5, 3],
				pointBackgroundColor: COLORS.neutral400,
				pointRadius: 4,
				pointHoverRadius: 6,
			},
		],
	});

	const comparativaOptions = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: { mode: "index", intersect: false },
		plugins: {
			legend: {
				position: "top",
				align: "end",
				labels: {
					usePointStyle: true,
					pointStyle: "circle",
					boxWidth: 6,
					padding: 16,
					font: { size: 12 },
				},
			},
			tooltip: {
				backgroundColor: "rgba(20, 23, 27, 0.9)",
				padding: 10,
				cornerRadius: 8,
				titleFont: { weight: "600" },
				bodyFont: { size: 13 },
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: { color: "rgba(0,0,0,0.04)" },
				ticks: { font: { size: 11 } },
			},
			x: {
				grid: { display: false },
				ticks: { font: { size: 11 } },
			},
		},
	};
</script>

<svelte:head>
	<title>Estadísticas · AnaliCSET</title>
</svelte:head>

<div class="animate-fade-in-up space-y-6">
	<!-- ═══ Selector de rango ═══ -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h2 class="font-heading text-lg font-semibold text-neutral-900">
				Vista general
			</h2>
			<p class="text-sm text-neutral-500">
				Distribución y tendencias del periodo seleccionado.
			</p>
		</div>

		<div
			class="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-1"
		>
			{#each Object.entries(rangoLabels) as [key, label] (key)}
				<button
					type="button"
					onclick={() => (rangoSeleccionado = key)}
					class="rounded-md px-3 py-1.5 text-sm font-medium transition-all
						{rangoSeleccionado === key
						? 'bg-primary-600 text-white shadow-sm'
						: 'text-neutral-600 hover:bg-neutral-100'}"
				>
					{label}
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ Fila superior: Distribución + Patrones IA ═══ -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- Distribución de casos por tipo -->
		<div class="animate-fade-in-up" style="animation-delay: 100ms;">
			<Card title="Distribución de casos por tipo">
				<div class="flex h-72 items-center justify-center">
					<ChartWrapper
						type="doughnut"
						data={casosPorTipoData}
						options={casosPorTipoOptions}
					/>
				</div>
			</Card>
		</div>

		<!-- Patrones detectados por IA (%) -->
		<div class="animate-fade-in-up" style="animation-delay: 180ms;">
			<Card title="Patrones detectados por IA (%)">
				<div class="h-72">
					<ChartWrapper
						type="bar"
						data={patronesData}
						options={patronesOptions}
					/>
				</div>
			</Card>
		</div>
	</div>

	<!-- ═══ Fila inferior: Comparativa por periodo ═══ -->
	<div class="animate-fade-in-up" style="animation-delay: 260ms;">
		<Card title="Comparativa por periodo">
			{#snippet footer()}
				<p class="text-xs text-neutral-400">
					Comparación de casos entre el periodo actual y el anterior
					para el rango:
					<strong class="text-neutral-600"
						>{rangoLabels[rangoSeleccionado]}</strong
					>
				</p>
			{/snippet}
			<div class="h-72">
				<ChartWrapper
					type="line"
					data={comparativaData}
					options={comparativaOptions}
				/>
			</div>
		</Card>
	</div>
</div>
