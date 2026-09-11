<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { user, clearSession } from '$lib/stores/auth.js';

	let { ontogglemenu = () => {} } = $props();

	function handleLogout() {
		clearSession();
		goto('/login');
	}

	// Título de la sección actual basado en la ruta
	const sectionTitles = {
		'/dashboard': 'Dashboard',
		'/actas': 'Consulta de actas',
		'/estadisticas': 'Estadísticas del Comité',
		'/reportes': 'Reportes',
		'/patrones': 'Patrones detectados'
	};

	const sectionTitle = $derived.by(() => {
		const pathname = page.url.pathname;
		for (const [path, title] of Object.entries(sectionTitles)) {
			if (pathname === path || pathname.startsWith(path + '/')) return title;
		}
		return 'AnaliCSET';
	});

	// Iniciales del usuario para el avatar
	const initials = $derived.by(() => {
		if (!$user?.name) return 'S';
		return $user.name
			.split(' ')
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase();
	});
</script>

<header class="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 sm:px-6 print:hidden">
	<!-- Lado izquierdo: Botón menú hamburguesa (móvil/tablet) + Título -->
	<div class="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
		<button
			type="button"
			class="inline-flex shrink-0 items-center justify-center rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 lg:hidden cursor-pointer"
			onclick={ontogglemenu}
			aria-label="Abrir menú de navegación"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
		</button>

		<h1 class="font-heading text-base font-bold text-neutral-900 sm:text-xl truncate">
			{sectionTitle}
		</h1>
	</div>

	<!-- Lado derecho: Usuario y logout -->
	<div class="flex items-center gap-3">
		{#if $user}
			<!-- Avatar con iniciales -->
			<div
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-800 ring-1 ring-primary-200"
				title={$user.name}
				aria-label="Perfil de {$user.name}"
			>
				{initials}
			</div>
			<div class="hidden text-right sm:block">
				<p class="text-sm font-semibold leading-tight text-neutral-900">{$user.name}</p>
				<p class="text-xs text-neutral-600">{$user.role}</p>
			</div>
		{/if}

		<!-- Botón cerrar sesión con ícono -->
		<button
			type="button"
			onclick={handleLogout}
			class="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-danger-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
			aria-label="Cerrar sesión de usuario"
			title="Cerrar sesión"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
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
