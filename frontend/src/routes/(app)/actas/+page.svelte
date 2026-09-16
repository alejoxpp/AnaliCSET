<script>
	import { page } from '$app/state';
	import { goto, replaceState } from '$app/navigation';
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import PrintButton from '$lib/components/PrintButton.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import { toasts } from '$lib/stores/toast.js';

	let { data } = $props();
	const allActas = $derived(data.actas);

	// ── Filtros sincronizados con URL para preservar estado al volver ──
	let filtroConsecutivo = $state(page.url.searchParams.get('consecutivo') || '');
	let filtroFechaDesde = $state(page.url.searchParams.get('desde') || '');
	let filtroFechaHasta = $state(page.url.searchParams.get('hasta') || '');
	let filtroEstado = $state(page.url.searchParams.get('estado') || '');
	let paginaActual = $state(Number(page.url.searchParams.get('pagina')) || 1);
	let cargando = $state(false);

	const estadosUnicos = $derived([...new Set(allActas.map((a) => a.estado))].sort());

	const actasFiltradas = $derived.by(() => {
		let resultado = allActas;

		if (filtroConsecutivo.trim()) {
			const q = filtroConsecutivo.trim().toLowerCase();
			resultado = resultado.filter(
				(a) =>
					a.consecutivo.toLowerCase().includes(q) ||
					(a.ficha && a.ficha.toLowerCase().includes(q))
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

	// Sincronizar cambios de filtros con la URL del navegador sin recarga
	$effect(() => {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		if (filtroConsecutivo.trim()) params.set('consecutivo', filtroConsecutivo.trim());
		if (filtroFechaDesde) params.set('desde', filtroFechaDesde);
		if (filtroFechaHasta) params.set('hasta', filtroFechaHasta);
		if (filtroEstado) params.set('estado', filtroEstado);
		if (paginaActual > 1) params.set('pagina', String(paginaActual));

		const newSearch = params.toString() ? `?${params.toString()}` : '';
		if (window.location.search !== newSearch) {
			replaceState(`${window.location.pathname}${newSearch}`, {});
		}
	});

	// ── Paginación ────────────────────────────────────────────────────
	const PAGE_SIZE = 8;

	// Resetear a página 1 cuando se modifique un filtro
	$effect(() => {
		actasFiltradas.length;
		// Si la página actual excede el total, volver a 1
		if (paginaActual > Math.max(1, Math.ceil(actasFiltradas.length / PAGE_SIZE))) {
			paginaActual = 1;
		}
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
		paginaActual = 1;
		toasts.add('Filtros restablecidos', 'neutral', 2000);
	}

	function navegarADetalle(id) {
		const currentSearch = typeof window !== 'undefined' ? window.location.search : '';
		goto(`/actas/${id}${currentSearch}`);
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
	<!-- ═══ Encabezado de la Sección ═══ -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h2 class="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-50">
				Consulta de Actas CSET
			</h2>
			<p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
				Histórico de sesiones ordinarias y extraordinarias del Comité de Evaluación y Seguimiento.
			</p>
		</div>
		<div class="print:hidden">
			<PrintButton label="Imprimir listado" />
		</div>
	</div>

	<!-- ═══ Filtros Reactivos ═══ -->
	<Card>
		<div class="flex flex-wrap items-end gap-4">
			<!-- Consecutivo / Ficha -->
			<div class="flex min-w-[200px] flex-1 flex-col gap-1">
				<label for="filtro-consecutivo" class="text-xs font-semibold text-neutral-700 dark:text-neutral-200">
					Consecutivo o ficha
				</label>
				<input
					id="filtro-consecutivo"
					type="text"
					bind:value={filtroConsecutivo}
					placeholder="Ej: CSET-2026-256 o 2758421"
					class="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400
						focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:placeholder:text-neutral-500"
				/>
			</div>

			<!-- Fecha desde -->
			<div class="flex w-full sm:w-auto flex-col gap-1">
				<label for="filtro-desde" class="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Desde</label>
				<input
					id="filtro-desde"
					type="date"
					bind:value={filtroFechaDesde}
					class="w-full sm:w-auto rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900
						focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
				/>
			</div>

			<!-- Fecha hasta -->
			<div class="flex w-full sm:w-auto flex-col gap-1">
				<label for="filtro-hasta" class="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Hasta</label>
				<input
					id="filtro-hasta"
					type="date"
					bind:value={filtroFechaHasta}
					class="w-full sm:w-auto rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900
						focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
				/>
			</div>

			<!-- Estado -->
			<div class="flex w-full sm:w-auto flex-col gap-1">
				<label for="filtro-estado" class="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Estado</label>
				<select
					id="filtro-estado"
					bind:value={filtroEstado}
					class="w-full sm:w-auto rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900
						focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
				>
					<option value="">Todos</option>
					{#each estadosUnicos as estado}
						<option value={estado}>{estado}</option>
					{/each}
				</select>
			</div>

			<!-- Limpiar filtros -->
			{#if hayFiltrosActivos}
				<button
					type="button"
					onclick={limpiarFiltros}
					class="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:text-danger-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500 cursor-pointer dark:text-neutral-400 dark:hover:text-danger-500"
					aria-label="Restablecer todos los filtros"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
					Limpiar filtros
				</button>
			{/if}
		</div>
	</Card>

	<!-- ═══ Tabla de Actas ═══ -->
	<Card>
		{#if cargando}
			<Skeleton type="table" lines={6} />
		{:else if actasFiltradas.length === 0}
			<!-- Estado vacío estructurado con ilustración y acción -->
			<EmptyState
				title="No se encontraron actas con los criterios especificados"
				description={hayFiltrosActivos
					? 'Prueba modificando o restableciendo los filtros de búsqueda para consultar más actas.'
					: 'No hay registros de actas en el sistema actualmente.'}
			>
				{#snippet icon()}
					<svg
						class="h-8 w-8 text-neutral-400 dark:text-neutral-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
						/>
					</svg>
				{/snippet}
				{#snippet action()}
					{#if hayFiltrosActivos}
						<Button variant="secondary" size="sm" onclick={limpiarFiltros}>
							Restablecer filtros
						</Button>
					{/if}
				{/snippet}
			</EmptyState>
		{:else}
			<!-- Contador de resultados -->
			<div class="mb-3 flex items-center justify-between">
				<p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
					{actasFiltradas.length} acta{actasFiltradas.length !== 1 ? 's' : ''}
					{hayFiltrosActivos ? ' encontradas' : ' en total'}
				</p>
				<p class="text-xs text-neutral-400 dark:text-neutral-500">
					Página {paginaActual} de {totalPaginas}
				</p>
			</div>

			<!-- Tabla con soporte responsive y clic en fila para navegar al detalle -->
			<div class="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
				<table class="w-full border-collapse text-left text-sm">
					<thead class="bg-neutral-50 text-xs font-semibold tracking-wide text-neutral-600 uppercase border-b border-neutral-200 dark:bg-neutral-800/50 dark:text-neutral-300 dark:border-neutral-800">
						<tr>
							<th scope="col" class="px-4 py-3 font-semibold">Consecutivo</th>
							<th scope="col" class="px-4 py-3 font-semibold">Ficha</th>
							<th scope="col" class="px-4 py-3 font-semibold">Fecha</th>
							<th scope="col" class="px-4 py-3 font-semibold">Estado</th>
							<th scope="col" class="px-4 py-3 font-semibold text-right">Casos</th>
							<th scope="col" class="px-4 py-3 font-semibold text-right">Acción</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-neutral-200 text-neutral-800 dark:divide-neutral-800 dark:text-neutral-100">
						{#each actasPaginadas as acta (acta.id)}
							<tr
								onclick={() => navegarADetalle(acta.id)}
								class="group transition-colors hover:bg-neutral-50/80 cursor-pointer dark:hover:bg-neutral-800/50"
								title="Ver detalle del acta {acta.consecutivo}"
							>
								<td class="px-4 py-3 font-bold text-primary-700 group-hover:underline dark:text-primary-400">
									{acta.consecutivo}
								</td>
								<td class="px-4 py-3 text-neutral-600 dark:text-neutral-300">
									<span class="font-medium text-neutral-800 dark:text-neutral-100">{acta.ficha}</span>
									{#if acta.programa}
										<span class="hidden md:inline text-xs text-neutral-400 block truncate max-w-xs dark:text-neutral-500">{acta.programa}</span>
									{/if}
								</td>
								<td class="px-4 py-3 text-neutral-600 whitespace-nowrap dark:text-neutral-300">{formatDate(acta.fecha)}</td>
								<td class="px-4 py-3">
									<Badge variant={estadoVariant[acta.estado] ?? 'neutral'}>
										{acta.estado}
									</Badge>
								</td>
								<td class="px-4 py-3 text-right">
									<span class="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-neutral-100 px-2 text-xs font-bold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100">
										{acta.totalCasos}
									</span>
								</td>
								<td class="px-4 py-3 text-right">
									<button
										type="button"
										onclick={(e) => { e.stopPropagation(); navegarADetalle(acta.id); }}
										class="inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-semibold text-primary-700 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer dark:text-primary-400 dark:hover:bg-primary-500/10"
										aria-label="Ver detalle del acta {acta.consecutivo}"
									>
										Ver detalle
										<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
										</svg>
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Paginación Accesible -->
			{#if totalPaginas > 1}
				<nav class="mt-4 flex flex-wrap items-center justify-center gap-1 sm:gap-2" aria-label="Paginación de resultados">
					<button
						type="button"
						disabled={paginaActual <= 1}
						onclick={() => (paginaActual = Math.max(1, paginaActual - 1))}
						class="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 transition-colors
							hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
						aria-label="Página anterior"
					>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
						</svg>
						<span class="hidden sm:inline">Anterior</span>
					</button>

					{#each Array.from({ length: totalPaginas }, (_, i) => i + 1) as pagina}
						<button
							type="button"
							onclick={() => (paginaActual = pagina)}
							class="inline-flex h-8 w-8 items-center justify-center rounded-md text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer
								{pagina === paginaActual
								? 'bg-primary-600 text-white shadow-xs'
								: 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'}"
							aria-label="Ir a página {pagina}"
							aria-current={pagina === paginaActual ? 'page' : undefined}
						>
							{pagina}
						</button>
					{/each}

					<button
						type="button"
						disabled={paginaActual >= totalPaginas}
						onclick={() => (paginaActual = Math.min(totalPaginas, paginaActual + 1))}
						class="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 transition-colors
							hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
						aria-label="Página siguiente"
					>
						<span class="hidden sm:inline">Siguiente</span>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</nav>
			{/if}
		{/if}
	</Card>
</div>
