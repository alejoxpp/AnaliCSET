<script lang="ts">
	import { a11yState, COLORBLIND_LABELS, COLORBLIND_DESCRIPTIONS } from '../a11y.svelte';
	import { themeState } from '../theme.svelte';
	import { trapTabKey, focusFirst } from '../utils/a11y';
	import {
		Accessibility,
		X,
		Eye,
		Moon,
		Type,
		Underline,
		Crosshair,
		Pause,
		BookOpen,
		Square,
		Palette,
		RotateCcw,
		FileText,
		Minus,
		Plus
	} from 'lucide-svelte';

	function autofocusPanel(node: HTMLElement) {
		focusFirst(node);
		return {};
	}

	const tile =
		'relative w-full min-h-[132px] rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex flex-col items-center justify-center gap-1.5 p-4 text-white transition-all cursor-pointer';
	const tileActive = 'bg-white/25 ring-2 ring-white';
	const tileTitle = 'font-bold text-sm leading-tight';
	const tileDesc = 'text-[11px] text-blue-100/90 leading-tight';
</script>

<!-- Filtros reales de daltonismo (matrices de Machado 2009) -->
<!-- 1x1 en vez de 0x0: algunos navegadores ignoran filtros en SVG sin tamaño -->
<svg width="1" height="1" style="position:absolute;pointer-events:none" aria-hidden="true" focusable="false">
	<defs>
		<filter id="a11y-filter-protan">
			<feColorMatrix
				type="matrix"
				values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"
			/>
		</filter>
		<filter id="a11y-filter-deutan">
			<feColorMatrix
				type="matrix"
				values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"
			/>
		</filter>
		<filter id="a11y-filter-tritan">
			<feColorMatrix
				type="matrix"
				values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"
			/>
		</filter>
		<filter id="a11y-filter-achroma">
			<feColorMatrix
				type="matrix"
				values="0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0 0 0 1 0"
			/>
		</filter>
	</defs>
</svg>

<!-- Botón flotante -->
<aside class="fixed bottom-6 right-6 z-50">
	<button
		type="button"
		onclick={() => a11yState.toggleOpen()}
		class="relative w-14 h-14 rounded-full bg-[#0050cb] hover:bg-[#003da6] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border-2 border-white dark:border-slate-800 cursor-pointer"
		title="Accesibilidad (Alt + A)"
		aria-label="Abrir opciones de accesibilidad"
		aria-expanded={a11yState.isOpen}
	>
		<Accessibility class="w-7 h-7" aria-hidden="true" />

		{#if a11yState.activeCount > 0}
			<span
				class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-extrabold text-xs flex items-center justify-center shadow-md"
			>
				{a11yState.activeCount}
			</span>
		{/if}
	</button>
</aside>

<!-- Panel con colores del logo (azul navy → azul CSET) -->
{#if a11yState.isOpen}
	<div
		class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs"
		role="dialog"
		aria-modal="true"
		aria-labelledby="a11y-panel-title"
		tabindex="-1"
		onkeydown={(e) => {
			if (e.key === 'Escape') a11yState.closePanel();
			else trapTabKey(e, e.currentTarget as HTMLElement);
		}}
		use:autofocusPanel
	>
		<div
			class="a11y-panel w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-b from-[#0b246a] to-[#0050cb] text-white max-h-[90vh] flex flex-col"
		>
			<div class="flex items-center justify-between px-5 pt-4 pb-1">
				<h2 id="a11y-panel-title" class="text-base font-extrabold">
					Accesibilidad
				</h2>
				<button
					type="button"
					onclick={() => a11yState.closePanel()}
					class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
					aria-label="Cerrar accesibilidad"
				>
					<X class="w-5 h-5" aria-hidden="true" />
				</button>
			</div>
			<p class="px-5 pb-3 text-xs text-blue-100/90">
				Haz más fácil leer y usar esta página. Todo se guarda solo.
			</p>

			<div class="px-4 pb-4 overflow-y-auto">
				<div class="grid grid-cols-2 gap-3">
					<!-- 1. Tamaño de letra -->
					<div
						role="group"
						aria-label="Tamaño de letra"
						class="{tile} cursor-default"
					>
						<FileText class="w-7 h-7" aria-hidden="true" />
						<span class={tileTitle}>Tamaño de letra</span>
						<span class={tileDesc}>Más grande o más chica</span>
						<div class="flex items-center gap-2 mt-1">
							<button
								type="button"
								onclick={() => a11yState.decreaseText()}
								disabled={a11yState.textPercent <= 80}
								class="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 disabled:opacity-40 font-extrabold text-lg leading-none cursor-pointer"
								aria-label="Achicar letra"
							>
								<Minus class="w-4 h-4 mx-auto" aria-hidden="true" />
							</button>
							<button
								type="button"
								onclick={() => a11yState.resetTextSize()}
								class="min-w-12 px-1 h-9 rounded-xl font-mono text-xs font-bold hover:bg-white/15 cursor-pointer"
								aria-label="Volver al tamaño base 100 por ciento"
							>
								{a11yState.textPercent}%
							</button>
							<button
								type="button"
								onclick={() => a11yState.increaseText()}
								disabled={a11yState.textPercent >= 200}
								class="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 disabled:opacity-40 font-extrabold text-lg leading-none cursor-pointer"
								aria-label="Agrandar letra"
							>
								<Plus class="w-4 h-4 mx-auto" aria-hidden="true" />
							</button>
						</div>
					</div>

					<!-- 2. Alto contraste -->
					<button
						type="button"
						onclick={() => a11yState.toggleHighContrast()}
						aria-pressed={themeState.current === 'contrast'}
						class="{tile} {themeState.current === 'contrast' ? tileActive : ''}"
					>
						{#if themeState.current === 'contrast'}
							<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" aria-hidden="true"></span>
						{/if}
						<Eye class="w-7 h-7" aria-hidden="true" />
						<span class={tileTitle}>Alto contraste</span>
						<span class={tileDesc}>Colores fuertes para ver mejor</span>
					</button>

					<!-- 3. Modo oscuro -->
					<button
						type="button"
						onclick={() => a11yState.toggleDarkMode()}
						aria-pressed={themeState.current === 'dark'}
						class="{tile} {themeState.current === 'dark' ? tileActive : ''}"
					>
						{#if themeState.current === 'dark'}
							<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" aria-hidden="true"></span>
						{/if}
						<Moon class="w-7 h-7" aria-hidden="true" />
						<span class={tileTitle}>Modo oscuro</span>
						<span class={tileDesc}>Fondo oscuro, menos brillo</span>
					</button>

					<!-- 4. Espacio del texto -->
					<button
						type="button"
						onclick={() => a11yState.toggleTextSpacing()}
						aria-pressed={a11yState.settings.textSpacing}
						class="{tile} {a11yState.settings.textSpacing ? tileActive : ''}"
					>
						{#if a11yState.settings.textSpacing}
							<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" aria-hidden="true"></span>
						{/if}
						<Type class="w-7 h-7" aria-hidden="true" />
						<span class={tileTitle}>Espacio del texto</span>
						<span class={tileDesc}>Letras más separadas</span>
					</button>

					<!-- 5. Marcar enlaces y botones -->
					<button
						type="button"
						onclick={() => a11yState.toggleUnderline()}
						aria-pressed={a11yState.settings.underlineLinks}
						class="{tile} {a11yState.settings.underlineLinks ? tileActive : ''}"
					>
						{#if a11yState.settings.underlineLinks}
							<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" aria-hidden="true"></span>
						{/if}
						<Underline class="w-7 h-7" aria-hidden="true" />
						<span class={tileTitle}>Marcar enlaces y botones</span>
						<span class={tileDesc}>Subraya enlaces y recuadra botones</span>
					</button>

					<!-- 6. Títulos y foco -->
					<button
						type="button"
						onclick={() => a11yState.toggleGuide()}
						aria-pressed={a11yState.settings.guideFocus}
						class="{tile} {a11yState.settings.guideFocus ? tileActive : ''}"
					>
						{#if a11yState.settings.guideFocus}
							<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" aria-hidden="true"></span>
						{/if}
						<Crosshair class="w-7 h-7" aria-hidden="true" />
						<span class={tileTitle}>Ver títulos y foco</span>
						<span class={tileDesc}>Títulos marcados; el foco grande sale con Tab</span>
					</button>

					<!-- 7. Calmar movimiento -->
					<button
						type="button"
						onclick={() => a11yState.toggleCalm()}
						aria-pressed={a11yState.settings.calmMotion}
						class="{tile} {a11yState.settings.calmMotion ? tileActive : ''}"
					>
						{#if a11yState.settings.calmMotion}
							<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" aria-hidden="true"></span>
						{/if}
						<Pause class="w-7 h-7" aria-hidden="true" />
						<span class={tileTitle}>Calmar movimiento</span>
						<span class={tileDesc}>Quita animaciones</span>
					</button>

					<!-- 8. Escuchar / detener -->
					<button
						type="button"
						onclick={() => a11yState.speakOrStop()}
						aria-pressed={a11yState.isSpeaking}
						class="{tile} {a11yState.isSpeaking ? tileActive : ''}"
					>
						{#if a11yState.isSpeaking}
							<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" aria-hidden="true"></span>
						{/if}
						{#if a11yState.isSpeaking}
							<Square class="w-7 h-7 fill-current" aria-hidden="true" />
							<span class={tileTitle} role="status">Detener lectura</span>
							<span class={tileDesc}>Para la voz</span>
						{:else}
							<BookOpen class="w-7 h-7" aria-hidden="true" />
							<span class={tileTitle}>Escuchar página</span>
							<span class={tileDesc}>Lee en voz alta</span>
						{/if}
					</button>

					<!-- 9. Daltonismo -->
					<button
						type="button"
						onclick={() => a11yState.cycleColorblind()}
						aria-pressed={a11yState.settings.colorblind !== 'off'}
						class="{tile} {a11yState.settings.colorblind !== 'off' ? tileActive : ''} col-span-2"
						aria-label="Filtro de daltonismo, actual: {COLORBLIND_LABELS[a11yState.settings.colorblind]}. Pulsa para cambiar."
					>
						{#if a11yState.settings.colorblind !== 'off'}
							<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" aria-hidden="true"></span>
						{/if}
						<Palette class="w-7 h-7" aria-hidden="true" />
						<span class={tileTitle}>Daltonismo: {COLORBLIND_LABELS[a11yState.settings.colorblind]}</span>
						<span class={tileDesc}>{COLORBLIND_DESCRIPTIONS[a11yState.settings.colorblind]}</span>
						<span class={tileDesc}>El contenido cambia; encabezado y controles mantienen sus colores</span>
					</button>
				</div>

				<div class="flex items-center justify-between gap-2 mt-4">
					<button
						type="button"
						onclick={() => a11yState.reset()}
						class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
					>
						<RotateCcw class="w-4 h-4" aria-hidden="true" />
						<span>Dejar todo como estaba</span>
					</button>
					<button
						type="button"
						onclick={() => a11yState.closePanel()}
						class="px-4 py-2 rounded-xl bg-white text-[#0b246a] text-sm font-extrabold cursor-pointer"
					>
						Listo
					</button>
				</div>
				<p class="mt-3 text-[11px] text-blue-100/80">
					Consejo: pulsa Alt + A para abrir, Esc para cerrar.
				</p>
			</div>
		</div>
	</div>
{/if}
