<script>
	// Se monta una sola vez (en +layout.svelte) y renderiza toda la pila de
	// notificaciones activas. Para lanzar una desde cualquier parte:
	// import { toasts } from '$lib/stores/toast.js'; toasts.add('mensaje');
	import { toasts } from '$lib/stores/toast.js';

	const variantClasses = {
		neutral: 'bg-neutral-800 text-white',
		primary: 'bg-primary-700 text-white',
		success: 'bg-success-500 text-white',
		danger: 'bg-danger-500 text-white',
		accent: 'bg-accent-400 text-neutral-900'
	};
</script>

<div class="pointer-events-none fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
	{#each $toasts as toast (toast.id)}
		<div
			class="pointer-events-auto flex items-start justify-between gap-3 rounded-lg px-4 py-3 text-sm shadow-lg {variantClasses[
				toast.variant
			] ?? variantClasses.neutral}"
			role="status"
		>
			<span>{toast.message}</span>
			<button
				type="button"
				class="shrink-0 text-white/80 hover:text-white"
				onclick={() => toasts.remove(toast.id)}
				aria-label="Cerrar notificación"
			>
				&times;
			</button>
		</div>
	{/each}
</div>
