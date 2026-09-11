<script>
	let {
		label = '',
		type = 'text',
		value = $bindable(''),
		error = '',
		disabled = false,
		required = false,
		id,
		...rest
	} = $props();

	const uid = $props.id();
	const inputId = $derived(id ?? uid);
</script>

<div class="flex flex-col gap-1">
	{#if label}
		<label for={inputId} class="text-sm font-medium text-neutral-700">
			{label}
			{#if required}<span class="text-danger-500">*</span>{/if}
		</label>
	{/if}
	<input
		id={inputId}
		{type}
		{disabled}
		{required}
		bind:value
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={error ? `${inputId}-error` : undefined}
		class="rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400
			focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-neutral-100
			{error
			? 'border-danger-500 focus:ring-danger-500'
			: 'border-neutral-300 focus:ring-primary-500'}"
		{...rest}
	/>
	{#if error}
		<p id="{inputId}-error" class="text-sm text-danger-500">{error}</p>
	{/if}
</div>
