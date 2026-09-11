<script>
	import AppSidebar from './AppSidebar.svelte';
	import AppHeader from './AppHeader.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen bg-neutral-50">
	<AppSidebar />
	<div class="flex flex-1 flex-col">
		<AppHeader />
		<main class="flex-1 px-6 py-6">
			{@render children()}
		</main>
	</div>
</div>
