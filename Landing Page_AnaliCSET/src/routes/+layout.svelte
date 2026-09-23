<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href="/anali-cset-icon.svg" />
</svelte:head>

<a
	href="#contenido"
	class="skip-link"
>
	Saltar al contenido principal
</a>
<div
	id="a11y-announcer"
	class="sr-only"
	role="status"
	aria-live="polite"
	aria-atomic="true"
></div>
<div class="min-h-screen bg-[#f7f9fb] dark:bg-slate-950 text-[#191c1e] dark:text-slate-100 flex flex-col font-sans selection:bg-[#dae1ff] selection:text-[#0050cb] dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-200">
	{@render children()}
</div>
