<script>
	import { page } from '$app/state';
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

<div class="flex min-h-screen bg-neutral-50 print:bg-white">
	<AppSidebar open={sidebarOpen} onclose={() => (sidebarOpen = false)} />
	<div class="flex min-w-0 flex-1 flex-col">
		<AppHeader ontogglemenu={() => (sidebarOpen = !sidebarOpen)} />
		<main class="flex-1 px-4 py-5 sm:px-6 sm:py-6 print:p-0">
			{@render children()}
		</main>
	</div>
</div>
