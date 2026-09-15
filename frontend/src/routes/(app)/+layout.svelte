<script>
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import AppSidebar from './AppSidebar.svelte';
	import AppHeader from './AppHeader.svelte';

	let { children } = $props();
	let sidebarOpen = $state(false);

	// Cerrar drawer al cambiar de ruta
	$effect(() => {
		page.url.pathname;
		sidebarOpen = false;
	});
</script>

<div class="flex min-h-screen bg-neutral-50 dark:bg-neutral-950 print:bg-white">
	<AppSidebar open={sidebarOpen} onclose={() => (sidebarOpen = false)} />
	<div class="flex min-w-0 flex-1 flex-col">
		<AppHeader ontogglemenu={() => (sidebarOpen = !sidebarOpen)} />
		<main class="flex-1 px-4 py-5 sm:px-6 sm:py-6 print:p-0">
			<!-- Transición de entrada al cambiar de ruta. Solo `in:` a propósito:
			     con `out:` las dos vistas se solapan y el layout salta. -->
			{#key page.url.pathname}
				<div in:fly={{ y: 8, duration: 220, easing: cubicOut }}>
					{@render children()}
				</div>
			{/key}
		</main>
	</div>
</div>
