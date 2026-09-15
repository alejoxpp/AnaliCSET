<script>
	/**
	 * Estado vacío consistente para listados sin resultados.
	 * `icon` permite pasar un SVG propio; si no, usa una ilustración genérica
	 * de carpeta vacía.
	 */
	let { title, description = '', icon, action, size = 'md' } = $props();

	const paddingClasses = {
		sm: 'py-8',
		md: 'py-12'
	};
</script>

<div
	class="flex flex-col items-center justify-center text-center {paddingClasses[size] ??
		paddingClasses.md}"
>
	<div class="mb-3 text-neutral-300 dark:text-neutral-600">
		{#if icon}
			{@render icon()}
		{:else}
			<svg
				class="h-12 w-12"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="1"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
				/>
			</svg>
		{/if}
	</div>

	<p class="text-sm font-medium text-neutral-600 dark:text-neutral-300">{title}</p>

	{#if description}
		<p class="mt-1 max-w-sm text-xs text-neutral-400 dark:text-neutral-500">{description}</p>
	{/if}

	{#if action}
		<div class="mt-4">
			{@render action()}
		</div>
	{/if}
</div>
