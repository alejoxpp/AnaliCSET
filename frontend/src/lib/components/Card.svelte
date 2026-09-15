<script>
	let { title = '', children, footer, class: className = '' } = $props();
</script>

<div
	class="print-block rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 {className}"
>
	{#if title}
		<div class="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
			<h3 class="font-heading text-base font-semibold text-neutral-900 dark:text-neutral-50">
				{title}
			</h3>
		</div>
	{/if}
	<div class="px-5 py-4">
		{@render children?.()}
	</div>
	{#if footer}
		<div
			class="border-t border-neutral-200 bg-neutral-50 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-800/50"
		>
			{@render footer()}
		</div>
	{/if}
</div>
