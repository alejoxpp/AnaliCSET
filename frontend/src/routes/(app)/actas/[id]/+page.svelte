<script>
	import { page } from '$app/state';
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import ProgressRing from '$lib/components/ProgressRing.svelte';
	import PrintButton from '$lib/components/PrintButton.svelte';
	import { toasts } from '$lib/stores/toast.js';

	let { data } = $props();
	const acta = $derived(data.acta);
	const casos = $derived(data.casos || []);
	const patrones = $derived(data.patrones || []);
	const error = $derived(data.error);

	// Preservar query params de filtros al regresar a la tabla
	const returnUrl = $derived(`/actas${page.url.search}`);

	// Estado modal de vista previa del PDF
	let modalPreviewAbierto = $state(false);

	const dateFormatter = new Intl.DateTimeFormat('es-CO', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});

	function formatDate(isoDate) {
		if (!isoDate) return 'Fecha no disponible';
		try {
			return dateFormatter.format(new Date(`${isoDate}T00:00:00`));
		} catch {
			return isoDate;
		}
	}

	const estadoVariant = {
		Procesada: 'success',
		'En revisión': 'primary',
		Pendiente: 'neutral'
	};

	const tipoCasoVariant = {
		Inasistencia: 'neutral',
		'Bajo rendimiento': 'primary',
		Deserción: 'danger',
		Conducta: 'warning',
		Plagio: 'danger'
	};

	function descargarArchivo(nombreArchivo, tipo) {
		toasts.add(`Iniciando descarga de ${nombreArchivo} (${tipo})…`, 'neutral', 3000);
	}
</script>

<svelte:head>
	<title>
		{acta ? `Acta ${acta.consecutivo} · AnaliCSET` : 'Detalle de acta · AnaliCSET'}
	</title>
</svelte:head>

<div class="animate-fade-in-up space-y-6">
	<!-- ═══ Barra de Navegación y Volver (Preservando Filtros) ═══ -->
	<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
		<a
			href={returnUrl}
			class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary-700 hover:text-primary-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md p-1 dark:text-primary-400 dark:hover:text-primary-300 print:hidden"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
			</svg>
			Volver a la consulta de actas
		</a>

		<!-- Breadcrumb -->
		<div class="flex items-center gap-3">
			<div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
				<a href="/actas" class="hover:text-primary-700 hover:underline dark:hover:text-primary-400">
					Actas
				</a>
				<span>/</span>
				<span class="text-neutral-900 font-semibold dark:text-neutral-100">
					{acta ? acta.consecutivo : 'Detalle'}
				</span>
			</div>
			{#if acta}
				<div class="print:hidden">
					<PrintButton />
				</div>
			{/if}
		</div>
	</div>

	{#if error || !acta}
		<!-- ═══ Estado de Error / Acta no encontrada ═══ -->
		<Card>
			<div class="flex flex-col items-center justify-center py-12 text-center">
				<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-danger-500/10 text-danger-500">
					<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
					</svg>
				</div>
				<h3 class="font-heading text-lg font-bold text-neutral-900 dark:text-neutral-50">Acta no encontrada</h3>
				<p class="mt-1.5 text-sm text-neutral-500 max-w-md dark:text-neutral-400">
					{error || 'El acta solicitada no existe en el sistema o fue trasladada a otro centro de formación.'}
				</p>
				<div class="mt-6">
					<Button variant="primary" onclick={() => window.location.href = '/actas'}>
						Regresar al listado general
					</Button>
				</div>
			</div>
		</Card>
	{:else}
		<!-- ═══ Encabezado Principal del Acta ═══ -->
		<div class="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<div class="flex flex-wrap items-center gap-2.5">
						<h1 class="font-heading text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
							{acta.consecutivo}
						</h1>
						<Badge variant={estadoVariant[acta.estado] ?? 'neutral'}>
							{acta.estado}
						</Badge>
					</div>

					<p class="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
						Ficha: <strong class="text-neutral-900 dark:text-neutral-50">{acta.ficha}</strong>
						{#if acta.programa}
							— <span class="text-neutral-500 dark:text-neutral-400">{acta.programa}</span>
						{/if}
					</p>

					<p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
						Sesión celebrada el <strong class="font-semibold text-neutral-700 dark:text-neutral-200">{formatDate(acta.fecha)}</strong>
					</p>
				</div>

				<div class="flex flex-wrap items-center gap-2">
					<span class="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
						<svg class="h-4 w-4 text-neutral-500 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6 0 3.375 3.375 0 016 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
						</svg>
						{casos.length} casos analizados
					</span>
				</div>
			</div>
		</div>

		<!-- ═══ Sección: Resumen generado por IA ═══ -->
		{#if acta.resumen_ia}
			<div
				class="print-block rounded-xl border border-accent-200 bg-accent-50/50 p-5 dark:border-accent-700/40 dark:bg-accent-500/10"
			>
				<div class="flex items-start gap-3">
					<div
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-500/20 text-accent-600 dark:text-accent-400"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
						</svg>
					</div>
					<div class="min-w-0">
						<h3 class="font-heading text-sm font-bold text-neutral-900 dark:text-neutral-50">
							Resumen generado por IA
						</h3>
						<p class="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
							{acta.resumen_ia}
						</p>
						<p class="mt-3 text-[11px] text-neutral-500 dark:text-neutral-400">
							Resumen automático sobre el acta y sus anexos. Verifique contra el documento oficial
							antes de usarlo como soporte de una decisión.
						</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- ═══ Sección: Archivos Asociados (PDF y Excel) ═══ -->
		<Card title="Documentos y Anexos del Acta">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<!-- Archivo PDF del Acta -->
				<div class="flex items-start justify-between rounded-lg border border-neutral-200 bg-neutral-50/70 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/50 dark:hover:bg-neutral-800/50">
					<div class="flex items-start gap-3">
						<!-- Ícono PDF -->
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-danger-500/10 text-danger-600 dark:text-danger-500">
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
							</svg>
						</div>
						<div>
							<p class="text-xs font-bold text-neutral-900 dark:text-neutral-50">
								{acta.archivo_pdf || `Acta_${acta.consecutivo}.pdf`}
							</p>
							<p class="text-[11px] text-neutral-500 dark:text-neutral-400">Documento oficial firmado · PDF (1.4 MB)</p>
						</div>
					</div>

					<div class="flex items-center gap-1.5">
						<button
							type="button"
							onclick={() => modalPreviewAbierto = true}
							class="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
						>
							Vista previa
						</button>
						<button
							type="button"
							onclick={() => descargarArchivo(acta.archivo_pdf || `Acta_${acta.consecutivo}.pdf`, 'PDF')}
							class="rounded-md bg-primary-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
						>
							Descargar
						</button>
					</div>
				</div>

				<!-- Archivo Excel de Casos / Seguimiento -->
				<div class="flex items-start justify-between rounded-lg border border-neutral-200 bg-neutral-50/70 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/50 dark:hover:bg-neutral-800/50">
					<div class="flex items-start gap-3">
						<!-- Ícono Excel -->
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success-500/10 text-success-600 dark:text-success-500">
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h17.25" />
							</svg>
						</div>
						<div>
							<p class="text-xs font-bold text-neutral-900 dark:text-neutral-50">
								{acta.archivo_excel || `Anexo_Casos_${acta.ficha}.xlsx`}
							</p>
							<p class="text-[11px] text-neutral-500 dark:text-neutral-400">Matriz de seguimiento formativo · Excel (480 KB)</p>
						</div>
					</div>

					<div class="flex items-center gap-1.5">
						<button
							type="button"
							onclick={() => descargarArchivo(acta.archivo_excel || `Anexo_Casos_${acta.ficha}.xlsx`, 'Excel')}
							class="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
						>
							Descargar
						</button>
					</div>
				</div>
			</div>
		</Card>

		<!-- ═══ Sección: Casos Evaluados en el Acta (GET /api/casos?id_acta=) ═══ -->
		<Card title="Casos Evaluados en la Sesión ({casos.length})">
			{#if casos.length === 0}
				<EmptyState
					size="sm"
					title="Esta acta no tiene casos tipificados"
					description="El acta se cargó, pero su anexo de casos aún no se ha procesado. Cargue el Excel de seguimiento para ver los casos aquí."
				>
					{#snippet icon()}
						<svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
						</svg>
					{/snippet}
				</EmptyState>
			{:else}
				<!-- Vista Tabla para Pantallas Medianas y Grandes -->
				<div class="hidden sm:block overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
					<table class="w-full border-collapse text-left text-sm">
						<thead class="bg-neutral-50 text-xs font-semibold tracking-wide text-neutral-600 uppercase border-b border-neutral-200 dark:bg-neutral-800/50 dark:text-neutral-300 dark:border-neutral-800">
							<tr>
								<th scope="col" class="px-4 py-3 font-semibold">Aprendiz</th>
								<th scope="col" class="px-4 py-3 font-semibold">Tipo de Caso</th>
								<th scope="col" class="px-4 py-3 font-semibold">Descripción de los Hechos</th>
								<th scope="col" class="px-4 py-3 font-semibold">Resolución / Estado</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-neutral-200 text-neutral-800 dark:divide-neutral-800 dark:text-neutral-100">
							{#each casos as caso (caso.id)}
								<tr class="transition-colors hover:bg-neutral-50/60 dark:hover:bg-neutral-800/50">
									<td class="px-4 py-3 align-top font-medium text-neutral-900 whitespace-nowrap dark:text-neutral-50">
										<div>{caso.aprendiz}</div>
										{#if caso.documento}
											<div class="text-xs text-neutral-400 font-normal dark:text-neutral-500">C.C. {caso.documento}</div>
										{/if}
									</td>
									<td class="px-4 py-3 align-top whitespace-nowrap">
										<Badge variant={tipoCasoVariant[caso.tipo] ?? 'neutral'}>
											{caso.tipo}
										</Badge>
									</td>
									<td class="px-4 py-3 align-top text-xs text-neutral-600 leading-relaxed max-w-md dark:text-neutral-300">
										<p>{caso.descripcion}</p>
										{#if caso.sancion_sugerida}
											<p class="mt-1 text-[11px] font-medium text-neutral-800 dark:text-neutral-100">
												<strong>Medida acordada:</strong> {caso.sancion_sugerida}
											</p>
										{/if}
									</td>
									<td class="px-4 py-3 align-top whitespace-nowrap">
										<span class="inline-flex rounded-md bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
											{caso.estado}
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Vista Tarjetas Apiladas para Pantallas Móviles (375px) -->
				<div class="sm:hidden space-y-3">
					{#each casos as caso (caso.id)}
						<div class="rounded-lg border border-neutral-200 bg-neutral-50/50 p-3.5 space-y-2 dark:border-neutral-800 dark:bg-neutral-800/50">
							<div class="flex items-start justify-between gap-2">
								<div>
									<p class="text-sm font-bold text-neutral-900 dark:text-neutral-50">{caso.aprendiz}</p>
									{#if caso.documento}
										<p class="text-[11px] text-neutral-500 dark:text-neutral-400">C.C. {caso.documento}</p>
									{/if}
								</div>
								<Badge variant={tipoCasoVariant[caso.tipo] ?? 'neutral'}>
									{caso.tipo}
								</Badge>
							</div>

							<p class="text-xs text-neutral-600 leading-relaxed dark:text-neutral-300">
								{caso.descripcion}
							</p>

							{#if caso.sancion_sugerida}
								<div class="rounded bg-white p-2 text-[11px] text-neutral-700 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800">
									<strong>Medida:</strong> {caso.sancion_sugerida}
								</div>
							{/if}

							<div class="pt-1 flex items-center justify-between text-xs">
								<span class="text-neutral-500 font-medium dark:text-neutral-400">Estado:</span>
								<span class="font-semibold text-neutral-800 dark:text-neutral-100">{caso.estado}</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</Card>

		<!-- ═══ Sección: Patrones de IA Relacionados ═══ -->
		{#if patrones.length > 0}
			<Card title="Patrones Detectados por IA en esta Acta">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each patrones as patron (patron.id)}
						<div
							class="print-block flex items-start gap-4 rounded-xl border border-accent-200/90 bg-accent-50/20 p-4 dark:border-accent-700/40 dark:bg-accent-500/10"
						>
							<div class="min-w-0 flex-1 space-y-2">
								<div class="flex items-center gap-2">
									<!-- Sparkle Icon -->
									<div
										class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-500/20 text-accent-600 dark:text-accent-400"
									>
										<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
										</svg>
									</div>
									<h4 class="font-heading text-xs font-bold text-neutral-900 dark:text-neutral-50">
										{patron.nombre}
									</h4>
								</div>

								<p class="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
									{patron.descripcion}
								</p>

								{#if patron.nivel_riesgo}
									<div class="pt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
										Nivel de riesgo estimado:
										<strong class="text-neutral-800 dark:text-neutral-200">
											{patron.nivel_riesgo}
										</strong>
									</div>
								{/if}
							</div>

							<ProgressRing
								value={patron.porcentaje}
								size="sm"
								tone="accent"
								label="correlación"
								ariaLabel="{patron.porcentaje}% de correlación"
							/>
						</div>
					{/each}
				</div>
			</Card>
		{/if}
	{/if}
</div>

<!-- ═══ Modal de Vista Previa del PDF ═══ -->
{#if modalPreviewAbierto}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-xs"
		role="dialog"
		aria-modal="true"
		aria-label="Vista previa del acta"
	>
		<div class="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-4 dark:bg-neutral-900">
			<div class="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
				<div>
					<h3 class="font-heading text-base font-bold text-neutral-900 dark:text-neutral-50">
						Vista Previa: {acta?.consecutivo}
					</h3>
					<p class="text-xs text-neutral-500 dark:text-neutral-400">Documento oficial emitido por el Comité CSET</p>
				</div>
				<button
					type="button"
					onclick={() => modalPreviewAbierto = false}
					class="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 cursor-pointer dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
					aria-label="Cerrar vista previa"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Representación gráfica del PDF institucional -->
			<div class="h-80 overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-xs text-neutral-700 space-y-3 font-mono dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-200">
				<div class="text-center font-bold font-sans border-b border-neutral-300 pb-2 dark:border-neutral-700">
					SERVICIO NACIONAL DE APRENDIZAJE — SENA<br />
					CENTRO DE SERVICIOS Y GESTIÓN EMPRESARIAL<br />
					COMITÉ DE EVALUACIÓN Y SEGUIMIENTO (CSET)
				</div>
				<div class="grid grid-cols-2 gap-2 pt-2">
					<div><strong>ACTA NÚMERO:</strong> {acta?.consecutivo}</div>
					<div><strong>FECHA:</strong> {acta?.fecha}</div>
					<div><strong>FICHA:</strong> {acta?.ficha}</div>
					<div><strong>ESTADO:</strong> {acta?.estado}</div>
				</div>
				<div class="border-t border-neutral-200 pt-2 font-sans dark:border-neutral-800">
					<p class="font-semibold mb-1">RESUMEN EJECUTIVO DE LA SESIÓN:</p>
					<p class="text-neutral-600 leading-relaxed font-sans dark:text-neutral-300">
						En las instalaciones del centro y de conformidad con el Reglamento del Aprendiz SENA, se evaluaron los casos presentados para la ficha {acta?.ficha}, determinando las medidas pedagógicas y disciplinarias pertinentes registradas en el sistema AnaliCSET.
					</p>
				</div>
			</div>

			<div class="flex items-center justify-end gap-2 pt-2">
				<Button variant="secondary" onclick={() => modalPreviewAbierto = false}>
					Cerrar
				</Button>
				<Button variant="primary" onclick={() => { descargarArchivo(acta?.archivo_pdf, 'PDF'); modalPreviewAbierto = false; }}>
					Descargar PDF Oficial
				</Button>
			</div>
		</div>
	</div>
{/if}
