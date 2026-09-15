<script>
	let { size = 'md', tone = 'primary', label = 'Cargando' } = $props();

	const sizeClasses = {
		sm: 'h-4 w-4 border-2',
		md: 'h-6 w-6 border-2',
		lg: 'h-10 w-10 border-[3px]'
	};

	const toneClasses = {
		primary: 'border-neutral-300 border-t-primary-600 dark:border-neutral-700 dark:border-t-primary-400',
		white: 'border-white/30 border-t-white'
	};
</script>

<span
	class="inline-block animate-spin rounded-full {sizeClasses[size] ?? sizeClasses.md} {toneClasses[
		tone
	] ?? toneClasses.primary}"
	role="status"
	aria-label={label}
></span>
