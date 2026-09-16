<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from './Button.svelte';

	const STORAGE_KEY = 'analicset_tour_completed';

	let abierto = $state(false);
	let pasoActual = $state(0);

	const pasos = [
		{
			titulo: 'Bienvenido al Panel de AnaliCSET',
			etiqueta: 'Paso 1 de 3 · Visión General',
			descripcion:
				'Aquí encuentras el resumen consolidado del Comité de Evaluación y Seguimiento: estadísticas clave, histórico de casos y las alertas prioritarias sugeridas por el análisis de IA.',
			destaque: 'Revisa la tarjeta de insight en la parte superior para detectar incrementos inusuales.',
			icono: 'ia'
		},
		{
			titulo: 'Consulta y Trazabilidad de Actas',
			etiqueta: 'Paso 2 de 3 · Gestión Documental',
			descripcion:
				'Accede a todas las sesiones del comité, filtra por número de acta, ficha o fecha, y consulta los casos de aprendices asociados junto a sus anexos oficiales en PDF y Excel.',
			destaque: 'Haz clic en cualquier acta del listado para ver sus casos y patrones asociados.',
			icono: 'actas'
		},
		{
			titulo: 'Reportes y Modo Oscuro',
			etiqueta: 'Paso 3 de 3 · Herramientas',
			descripcion:
				'Exporta resúmenes oficiales con el botón «Generar reporte» (optimizado para impresión institucional) y adapta la interfaz a tu preferencia con el selector de modo oscuro en el encabezado.',
			destaque: 'El formato de impresión ahorra tinta y mantiene los gráficos visibles de forma limpia.',
			icono: 'print'
		}
	];

	onMount(() => {
		try {
			const completado = localStorage.getItem(STORAGE_KEY);
			if (!completado) {
				// Pequeño retardo para permitir que el dashboard cargue primero de forma fluida
				const timer = setTimeout(() => {
					abierto = true;
				}, 600);
				return () => clearTimeout(timer);
			}
		} catch {
			// Si localStorage no está disponible, no forzamos el modal
		}
	});

	function cerrarTour() {
		abierto = false;
		try {
			localStorage.setItem(STORAGE_KEY, 'true');
		} catch {}
	}

	function siguiente() {
		if (pasoActual < pasos.length - 1) {
			pasoActual += 1;
		} else {
			cerrarTour();
		}
	}

	function anterior() {
		if (pasoActual > 0) {
			pasoActual -= 1;
		}
	}

	function handleKeydown(e) {
		if (!abierto) return;
		if (e.key === 'Escape') cerrarTour();
		if (e.key === 'ArrowRight') siguiente();
		if (e.key === 'ArrowLeft') anterior();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if abierto}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-xs"
		transition:fade={{ duration: 180 }}
		role="dialog"
		aria-modal="true"
		aria-labelledby="tour-titulo"
	>
		<div
			class="relative w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-7"
			transition:fly={{ y: 16, duration: 240 }}
		>
			<!-- Botón cerrar (X) -->
			<button
				type="button"
				onclick={cerrarTour}
				class="absolute top-4 right-4 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
				aria-label="Cerrar guía interactiva"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<!-- Contenido del Paso -->
			{#key pasoActual}
				<div in:fly={{ x: 12, duration: 200 }}>
					<!-- Etiqueta de paso e ícono -->
					<div class="flex items-center gap-3">
						<div
							class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-200/70 dark:bg-primary-500/15 dark:text-primary-300 dark:ring-primary-500/30"
						>
							{#if pasos[pasoActual].icono === 'ia'}
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
									/>
								</svg>
							{:else if pasos[pasoActual].icono === 'actas'}
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
									/>
								</svg>
							{:else}
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m0 0a48.159 48.159 0 0 1 10.5 0m-10.5 0V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.659M9.75 21h4.5"
									/>
								</svg>
							{/if}
						</div>
						<div>
							<span
								class="text-[11px] font-bold tracking-wider text-primary-700 uppercase dark:text-primary-400"
							>
								{pasos[pasoActual].etiqueta}
							</span>
							<h3
								id="tour-titulo"
								class="font-heading text-lg font-bold text-neutral-900 sm:text-xl dark:text-neutral-50"
							>
								{pasos[pasoActual].titulo}
							</h3>
						</div>
					</div>

					<p class="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
						{pasos[pasoActual].descripcion}
					</p>

					<!-- Tip o recomendación destacada -->
					<div
						class="mt-4 flex items-start gap-2.5 rounded-xl border border-neutral-200 bg-neutral-50/80 p-3 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300"
					>
						<svg
							class="h-4 w-4 shrink-0 text-accent-600 mt-0.5 dark:text-accent-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
							/>
						</svg>
						<span class="leading-relaxed font-medium">{pasos[pasoActual].destaque}</span>
					</div>
				</div>
			{/key}

			<!-- Barra de navegación del tour: indicadores y botones -->
			<div
				class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800"
			>
				<!-- Indicadores de progreso (dots) -->
				<div class="flex items-center gap-1.5" aria-label="Progreso del tour">
					{#each pasos as _, i}
						<button
							type="button"
							onclick={() => (pasoActual = i)}
							class="h-2 rounded-full transition-all duration-200 cursor-pointer {i === pasoActual
								? 'w-6 bg-primary-600 dark:bg-primary-500'
								: 'w-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'}"
							aria-label="Ir al paso {i + 1}"
						></button>
					{/each}
				</div>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={cerrarTour}
						class="px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-md cursor-pointer dark:text-neutral-400 dark:hover:text-neutral-200"
					>
						Omitir
					</button>

					{#if pasoActual > 0}
						<Button variant="secondary" size="sm" onclick={anterior}>Anterior</Button>
					{/if}

					<Button variant="primary" size="sm" onclick={siguiente}>
						{pasoActual === pasos.length - 1 ? '¡Comenzar!' : 'Siguiente'}
					</Button>
				</div>
			</div>
		</div>
	</div>
{/if}
