<script>
	let { icon, label, value, accent = false, class: className = '' } = $props();
</script>

<div
	class="animate-fade-in-up rounded-lg border border-neutral-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md {className}"
>
	<div class="mb-2 flex items-center gap-2">
		<div
			class="flex h-8 w-8 items-center justify-center rounded-md {accent
				? 'bg-accent-400/15 text-accent-600'
				: 'bg-primary-500/10 text-primary-600'}"
		>
			{@render icon?.()}
		</div>
		<p class="text-sm text-neutral-500">{label}</p>
	</div>
	<p class="font-heading text-3xl font-semibold {accent ? 'text-accent-600' : 'text-neutral-900'}">
		{@render value?.()}
	</p>
</div>
