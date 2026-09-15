<script>
	/**
	 * Anillo de progreso para porcentajes (ej. correlación de un patrón IA).
	 * Sustituye al número plano para que la magnitud se lea de un vistazo.
	 */
	let { value = 0, size = 'md', tone = 'accent', label = '', ariaLabel = '' } = $props();

	const clamped = $derived(Math.min(100, Math.max(0, Number(value) || 0)));

	const sizeConfig = {
		sm: { px: 48, stroke: 5, text: 'text-[11px]' },
		md: { px: 64, stroke: 6, text: 'text-sm' },
		lg: { px: 88, stroke: 7, text: 'text-lg' }
	};

	const config = $derived(sizeConfig[size] ?? sizeConfig.md);
	const radius = $derived((config.px - config.stroke) / 2);
	const circumference = $derived(2 * Math.PI * radius);
	const offset = $derived(circumference * (1 - clamped / 100));

	const toneClasses = {
		accent: 'text-accent-500',
		primary: 'text-primary-600',
		danger: 'text-danger-500',
		warning: 'text-warning-500'
	};
</script>

<div class="flex flex-col items-center gap-1">
	<div
		class="relative shrink-0"
		style="width: {config.px}px; height: {config.px}px;"
		role="progressbar"
		aria-valuenow={clamped}
		aria-valuemin="0"
		aria-valuemax="100"
		aria-label={ariaLabel || label || `${clamped} por ciento`}
	>
		<svg class="h-full w-full -rotate-90" viewBox="0 0 {config.px} {config.px}" aria-hidden="true">
			<circle
				class="text-neutral-200 dark:text-neutral-700"
				cx={config.px / 2}
				cy={config.px / 2}
				r={radius}
				fill="none"
				stroke="currentColor"
				stroke-width={config.stroke}
			/>
			<circle
				class="{toneClasses[tone] ?? toneClasses.accent} transition-[stroke-dashoffset] duration-700 ease-out"
				cx={config.px / 2}
				cy={config.px / 2}
				r={radius}
				fill="none"
				stroke="currentColor"
				stroke-width={config.stroke}
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={offset}
			/>
		</svg>
		<span
			class="absolute inset-0 flex items-center justify-center font-heading font-bold text-neutral-900 dark:text-neutral-100 {config.text}"
		>
			{clamped}%
		</span>
	</div>

	{#if label}
		<span class="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">{label}</span>
	{/if}
</div>
