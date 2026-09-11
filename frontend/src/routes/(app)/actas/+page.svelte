<script>
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let { data } = $props();
	const allActas = $derived(data.actas);

	// ── Filtros ───────────────────────────────────────────────────────
	let filtroConsecutivo = $state('');
	let filtroFechaDesde = $state('');
	let filtroFechaHasta = $state('');
	let filtroEstado = $state('');

	const estadosUnicos = $derived([...new Set(allActas.map((a) => a.estado))].sort());

	const actasFiltradas = $derived.by(() => {
		let resultado = allActas;

		if (filtroConsecutivo.trim()) {
			const q = filtroConsecutivo.trim().toLowerCase();
			resultado = resultado.filter(
				(a) =>
					a.consecutivo.toLowerCase().includes(q) ||
					a.ficha.toLowerCase().includes(q)
			);
		}

		if (filtroFechaDesde) {
			resultado = resultado.filter((a) => a.fecha >= filtroFechaDesde);
		}

		if (filtroFechaHasta) {
			resultado = resultado.filter((a) => a.fecha <= filtroFechaHasta);
		}

		if (filtroEstado) {
			resultado = resultado.filter((a) => a.estado === filtroEstado);
		}

		return resultado;
	});

	// ── Paginación ────────────────────────────────────────────────────
	const PAGE_SIZE = 8;
	let paginaActual = $state(1);

	// Resetear página cuando cambian los filtros
	$effect(() => {
		// Acceder a actasFiltradas.length registra la dependencia
		actasFiltradas.length;
		paginaActual = 1;
	});

	const totalPaginas = $derived(Math.max(1, Math.ceil(actasFiltradas.length / PAGE_SIZE)));
	const actasPaginadas = $derived(
		actasFiltradas.slice((paginaActual - 1) * PAGE_SIZE, paginaActual * PAGE_SIZE)
	);

	const hayFiltrosActivos = $derived(
		filtroConsecutivo.trim() !== '' ||
		filtroFechaDesde !== '' ||
		filtroFechaHasta !== '' ||
		filtroEstado !== ''
	);

	function limpiarFiltros() {
		filtroConsecutivo = '';
		filtroFechaDesde = '';
		filtroFechaHasta = '';
		filtroEstado = '';
	}

	// ── Formato ───────────────────────────────────────────────────────
	const dateFormatter = new Intl.DateTimeFormat('es-CO', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});

	function formatDate(isoDate) {
		return dateFormatter.format(new Date(`${isoDate}T00:00:00`));
	}

	const estadoVariant = {
		Procesada: 'success',
		'En revisión': 'primary',
		Pendiente: 'neutral'
	};
</script>

<svelte:head>
	<title>Consulta de actas · AnaliCSET</title>
</svelte:head>

<div class="animate-fade-in-up space-y-5">
	<!-- ═══ Filtros ═══ -->
	<Card>
		<div class="flex flex-wrap items-end gap-4">
			<!-- Consecutivo / Ficha -->
			<div class="flex min-w-[200px] flex-1 flex-col gap-1">
				<label for="filtro-consecutivo" class="text-sm font-medium text-neutral-700">
					Consecutivo o ficha
				</label>
				<input
					id="filtro-consecutivo"
					type="text"
					bind:value={filtroConsecutivo}
					placeholder="Ej: CSET-2026-256 o 2758421"
					class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400
						focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
				/>
			</div>

			<!-- Fecha desde -->
			<div class="flex flex-col gap-1">
				<label for="filtro-desde" class="text-sm font-medium text-neutral-700">Desde</label>
				<input
					id="filtro-desde"
					type="date"
					bind:value={filtroFechaDesde}
					class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900
						focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
				/>
			</div>

			<!-- Fecha hasta -->
			<div class="flex flex-col gap-1">
				<label for="filtro-hasta" class="text-sm font-medium text-neutral-700">Hasta</label>
				<input
					id="filtro-hasta"
					type="date"
					bind:value={filtroFechaHasta}
					class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900
						focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
				/>
			</div>

			<!-- Estado -->
			<div class="flex flex-col gap-1">
				<label for="filtro-estado" class="text-sm font-medium text-neutral-700">Estado</label>
				<select
					id="filtro-estado"
					bind:value={filtroEstado}
					class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900
						focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
				>
					<option value="">Todos</option>
					{#each estadosUnicos as estado}
						<option value={estado}>{estado}</option>
					{/each}
				</select>
			</div>

			<!-- Limpiar -->
			{#if hayFiltrosActivos}
				<button
					type="button"
					onclick={limpiarFiltros}
					class="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:text-danger-600"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
					Limpiar filtros
				</button>
			{/if}
		</div>
	</Card>

	<!-- ═══ Tabla de actas ═══ -->
	<Card>
		{#if actasFiltradas.length === 0}
			<!-- Estado vacío -->
			<div class="flex flex-col items-center justify-center py-12 text-center">
				<svg class="mb-3 h-12 w-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
				</svg>
				<p class="text-sm font-medium text-neutral-600">No se encontraron actas</p>
				<p class="mt-1 text-xs text-neutral-400">
					{#if hayFiltrosActivos}
						Prueba ajustando los filtros o
						<button type="button" onclick={limpiarFiltros} class="text-primary-600 underline">
							limpiándolos
						</button>.
					{:else}
						No hay actas cargadas en el sistema.
					{/if}
				</p>
			</div>
		{:else}
			<!-- Contador de resultados -->
			<div class="mb-4 flex items-center justify-between">
				<p class="text-sm text-neutral-500">
					{actasFiltradas.length} acta{actasFiltradas.length !== 1 ? 's' : ''}
					{hayFiltrosActivos ? ' encontradas' : ' en total'}
				</p>
				<p class="text-xs text-neutral-400">
					Página {paginaActual} de {totalPaginas}
				</p>
			</div>

			<!-- Tabla -->
			<div class="overflow-x-auto rounded-lg border border-neutral-200">
				<table class="w-full border-collapse text-left text-sm">
					<thead class="bg-neutral-50 text-xs font-medium tracking-wide text-neutral-600 uppercase">
						<tr>
							<th class="px-4 py-3 font-medium">Consecutivo</th>
							<th class="px-4 py-3 font-medium">Ficha</th>
							<th class="px-4 py-3 font-medium">Fecha</th>
							<th class="px-4 py-3 font-medium">Estado</th>
							<th class="px-4 py-3 font-medium text-right">Casos</th>
							<th class="px-4 py-3 font-medium text-right">Acciones</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-neutral-200 text-neutral-800">
						{#each actasPaginadas as acta (acta.id)}
							<tr class="transition-colors hover:bg-neutral-50">
								<td class="px-4 py-3 font-medium text-neutral-900">{acta.consecutivo}</td>
								<td class="px-4 py-3 text-neutral-600">{acta.ficha}</td>
								<td class="px-4 py-3 text-neutral-600">{formatDate(acta.fecha)}</td>
								<td class="px-4 py-3">
									<Badge variant={estadoVariant[acta.estado] ?? 'neutral'}>
										{acta.estado}
									</Badge>
								</td>
								<td class="px-4 py-3 text-right">
									<Badge variant="primary">{acta.totalCasos}</Badge>
								</td>
								<td class="px-4 py-3 text-right">
									<a
										href="/actas/{acta.id}"
										class="text-sm font-medium text-primary-700 hover:underline"
									>
										Ver detalle
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Paginación -->
			{#if totalPaginas > 1}
				<div class="mt-4 flex items-center justify-center gap-2">
					<button
						type="button"
						disabled={paginaActual <= 1}
						onclick={() => (paginaActual = Math.max(1, paginaActual - 1))}
						class="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors
							hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
					>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
						</svg>
						Anterior
					</button>

					{#each Array.from({ length: totalPaginas }, (_, i) => i + 1) as pagina}
						<button
							type="button"
							onclick={() => (paginaActual = pagina)}
							class="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors
								{pagina === paginaActual
								? 'bg-primary-600 text-white shadow-sm'
								: 'text-neutral-600 hover:bg-neutral-100'}"
						>
							{pagina}
						</button>
					{/each}

					<button
						type="button"
						disabled={paginaActual >= totalPaginas}
						onclick={() => (paginaActual = Math.min(totalPaginas, paginaActual + 1))}
						class="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors
							hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
					>
						Siguiente
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</div>
			{/if}
		{/if}
	</Card>
</div>
