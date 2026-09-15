<script>
	/**
	 * Hallazgo destacado del análisis de IA. Usa el verde de acento —
	 * reservado en este sistema de diseño para señales de IA/patrones.
	 */
	let {
		titulo,
		descripcion = '',
		delta = '',
		trend = 'up',
		href = '',
		hrefLabel = 'Ver detalle'
	} = $props();

	const trendUp = $derived(trend === 'up');
</script>

<div
	class="print-block relative overflow-hidden rounded-xl border border-accent-200 bg-accent-50/60 p-4 sm:p-5 dark:border-accent-700/40 dark:bg-accent-500/10"
>
	<div class="flex items-start gap-3">
		<div
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-500/20 text-accent-600 dark:text-accent-400"
		>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z"
				/>
			</svg>
		</div>

		<div class="min-w-0 flex-1">
			<div class="flex flex-wrap items-center gap-2">
				<span
					class="text-[10px] font-bold tracking-wider text-accent-700 uppercase dark:text-accent-400"
				>
					Hallazgo de IA
				</span>
				{#if delta}
					<span
						class="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold {trendUp
							? 'bg-danger-500/10 text-danger-600 dark:text-danger-500'
							: 'bg-success-500/10 text-success-600 dark:text-success-500'}"
					>
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
							{#if trendUp}
								<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306A11.95 11.95 0 0 1 21.75 6m0 0h-4.5m4.5 0v4.5" />
							{:else}
								<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
							{/if}
						</svg>
						{delta}
					</span>
				{/if}
			</div>

			<p class="mt-1 font-heading text-sm font-bold text-neutral-900 sm:text-base dark:text-neutral-50">
				{titulo}
			</p>

			{#if descripcion}
				<p class="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
					{descripcion}
				</p>
			{/if}

			{#if href}
				<a
					href={href}
					class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-700 hover:underline dark:text-accent-400 print:hidden"
				>
					{hrefLabel}
					<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</a>
			{/if}
		</div>
	</div>
</div>
