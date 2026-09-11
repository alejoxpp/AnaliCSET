<script>
	import Spinner from './Spinner.svelte';

	let {
		variant = 'primary',
		type = 'button',
		disabled = false,
		loading = false,
		fullWidth = false,
		children,
		...rest
	} = $props();

	const variantClasses = {
		primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600',
		secondary:
			'bg-white text-primary-700 border border-primary-300 hover:bg-primary-50 focus-visible:outline-primary-600',
		danger: 'bg-danger-500 text-white hover:bg-danger-600 focus-visible:outline-danger-500'
	};
</script>

<button
	{type}
	disabled={disabled || loading}
	class="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium
		transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
		disabled:cursor-not-allowed disabled:opacity-50 {fullWidth ? 'w-full' : ''}
		{variantClasses[variant] ?? variantClasses.primary}"
	{...rest}
>
	{#if loading}
		<Spinner size="sm" tone={variant === 'secondary' ? 'primary' : 'white'} />
	{/if}
	{@render children?.()}
</button>
