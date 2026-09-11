<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { user, clearSession } from '$lib/stores/auth.js';

	function handleLogout() {
		clearSession();
		goto('/login');
	}
</script>

<header class="flex items-center justify-end gap-4 border-b border-neutral-200 bg-white px-6 py-4">
	{#if $user}
		<div class="text-right">
			<p class="text-sm font-medium text-neutral-900">{$user.name}</p>
			<p class="text-xs text-neutral-500">{$user.role}</p>
		</div>
	{/if}
	<Button variant="secondary" onclick={handleLogout}>Cerrar sesión</Button>
</header>
