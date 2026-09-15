<script>
	let { icon, label, value, accent = false, class: className = '' } = $props();
</script>

<div
	class="print-block animate-fade-in-up rounded-lg border border-neutral-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 {className}"
>
	<div class="mb-2 flex items-center gap-2">
		<div
			class="flex h-8 w-8 items-center justify-center rounded-md {accent
				? 'bg-accent-400/15 text-accent-600 dark:text-accent-400'
				: 'bg-primary-500/10 text-primary-600 dark:text-primary-400'}"
		>
			{@render icon?.()}
		</div>
		<p class="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
	</div>
	<p
		class="font-heading text-3xl font-semibold {accent
			? 'text-accent-600 dark:text-accent-400'
			: 'text-neutral-900 dark:text-neutral-50'}"
	>
		{@render value?.()}
	</p>
</div>
