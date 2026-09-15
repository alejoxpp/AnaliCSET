<script>
	import { toasts } from '$lib/stores/toast.js';

	let { label = 'Generar reporte', title = 'Imprimir o guardar como PDF' } = $props();

	function generar() {
		toasts.add('Preparando vista de impresión...', 'neutral', 2000);
		// Pequeña espera para que el toast se pinte y los gráficos terminen de
		// renderizar antes de que el navegador congele la vista para imprimir.
		setTimeout(() => window.print(), 300);
	}
</script>

<button
	type="button"
	onclick={generar}
	class="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-950"
	{title}
>
	<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m0 0a48.159 48.159 0 0 1 10.5 0m-10.5 0V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.659M9.75 21h4.5"
		/>
	</svg>
	{label}
</button>
