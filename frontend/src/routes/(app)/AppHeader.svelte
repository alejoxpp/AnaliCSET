<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import { user, clearSession } from '$lib/stores/auth.js';

	function handleLogout() {
		clearSession();
		goto('/login');
	}

	// Título de la sección actual basado en la ruta
	const sectionTitles = {
		'/dashboard': 'Dashboard',
		'/actas': 'Consulta de actas',
		'/estadisticas': 'Estadísticas',
		'/reportes': 'Reportes',
		'/patrones': 'Patrones detectados'
	};

	const sectionTitle = $derived.by(() => {
		const pathname = page.url.pathname;
		for (const [path, title] of Object.entries(sectionTitles)) {
			if (pathname === path || pathname.startsWith(path + '/')) return title;
		}
		return '';
	});

	// Iniciales del usuario para el avatar
	const initials = $derived.by(() => {
		if (!$user?.name) return '??';
		return $user.name
			.split(' ')
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase();
	});
</script>

<header class="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-3.5">
	<!-- Título de sección -->
	<div>
		{#if sectionTitle}
			<h2 class="font-heading text-lg font-semibold text-neutral-900">{sectionTitle}</h2>
		{/if}
	</div>

	<!-- Usuario y logout -->
	<div class="flex items-center gap-3">
		{#if $user}
			<!-- Avatar con iniciales -->
			<div
				class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700"
				title={$user.name}
			>
				{initials}
			</div>
			<div class="hidden text-right sm:block">
				<p class="text-sm font-medium leading-tight text-neutral-900">{$user.name}</p>
				<p class="text-xs text-neutral-500">{$user.role}</p>
			</div>
		{/if}

		<!-- Botón cerrar sesión con ícono -->
		<button
			type="button"
			onclick={handleLogout}
			class="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-danger-600"
			title="Cerrar sesión"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
				/>
			</svg>
			<span class="hidden sm:inline">Salir</span>
		</button>
	</div>
</header>
