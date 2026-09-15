<script>
	// Base reutilizable: da la estructura y estilos consistentes de tabla;
	// las filas/columnas las compone quien la usa vía los snippets head/children.
	let { caption = '', head, children } = $props();
</script>

<div class="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
	<table class="w-full border-collapse text-left text-sm">
		{#if caption}
			<caption class="sr-only">{caption}</caption>
		{/if}
		<thead
			class="bg-neutral-50 text-xs font-medium tracking-wide text-neutral-600 uppercase dark:bg-neutral-800/60 dark:text-neutral-300"
		>
			{@render head?.()}
		</thead>
		<tbody class="divide-y divide-neutral-200 text-neutral-800 dark:divide-neutral-800 dark:text-neutral-200">
			{@render children?.()}
		</tbody>
	</table>
</div>
