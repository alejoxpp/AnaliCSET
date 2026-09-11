<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { open = false, onclose = () => {} } = $props();

	const navItems = [
		{
			href: '/dashboard',
			label: 'Dashboard',
			icon: 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z'
		},
		{
			href: '/actas',
			label: 'Consulta de actas',
			icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
		},
		{
			href: '/estadisticas',
			label: 'Estadísticas',
			icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z'
		},
		{
			href: '/reportes',
			label: 'Reportes',
			badge: 'Próximamente',
			icon: 'M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m0 0a48.159 48.159 0 0 1 10.5 0m-10.5 0V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.659M9.75 21h4.5'
		}
	];

	function isActive(href) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	onMount(() => {
		function handleKeyDown(e) {
			if (e.key === 'Escape' && open) {
				onclose();
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<!-- Backdrop móvil y tablet -->
{#if open}
	<div
		class="fixed inset-0 z-40 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
		onclick={onclose}
		role="presentation"
		aria-hidden="true"
	></div>
{/if}

<!-- Barra lateral (Drawer en móvil/tablet, estática en desktop) -->
<aside
	class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary-900 text-white shadow-xl transition-transform duration-300 ease-in-out print:hidden
		lg:static lg:z-auto lg:w-60 lg:shrink-0 lg:shadow-none lg:translate-x-0
		{open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}"
	aria-label="Navegación principal"
>
	<!-- Encabezado de la barra con Logo y botón de cierre en móvil -->
	<div class="flex items-center justify-between px-5 py-5">
		<a
			href="/dashboard"
			class="flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1"
			onclick={onclose}
		>
			<div
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-white/20"
			>
				<img src="/logo-icon.png" alt="" class="h-full w-full object-contain" />
			</div>
			<div>
				<span class="font-heading text-base font-bold leading-tight tracking-tight text-white block">AnaliCSET</span>
				<span class="text-[10px] font-medium tracking-wide text-primary-200 block">SENA · CSET</span>
			</div>
		</a>

		<!-- Botón cerrar (solo visible en pantallas pequeñas) -->
		<button
			type="button"
			class="rounded-lg p-1.5 text-primary-300 hover:bg-primary-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
			onclick={onclose}
			aria-label="Cerrar navegación"
		>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>

	<!-- Separador -->
	<div class="mx-4 border-t border-primary-800/80"></div>

	<!-- Navegación -->
	<nav class="flex-1 space-y-1 px-3 pt-4 overflow-y-auto">
		{#each navItems as item (item.href)}
			{@const active = isActive(item.href)}
			<a
				href={item.href}
				onclick={onclose}
				aria-current={active ? 'page' : undefined}
				class="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150
					focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300
					{active
					? 'bg-primary-800/90 text-white shadow-sm ring-1 ring-primary-700/60'
					: 'text-primary-200 hover:bg-primary-800/50 hover:text-white'}"
			>
				<!-- Indicador activo con gradiente de la onda -->
				{#if active}
					<span
						class="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-wave"
						aria-hidden="true"
					></span>
				{/if}

				<!-- Ícono -->
				<svg
					class="h-[18px] w-[18px] shrink-0 transition-colors {active
						? 'text-accent-300'
						: 'text-primary-400 group-hover:text-primary-200'}"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="1.5"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
				</svg>

				<span>{item.label}</span>

				{#if item.badge}
					<span
						class="ml-auto rounded-full bg-accent-400/20 px-2 py-0.5 text-[10px] font-medium text-accent-200"
					>
						{item.badge}
					</span>
				{/if}
			</a>
		{/each}
	</nav>

	<!-- Footer con versión -->
	<div class="border-t border-primary-700/50 px-5 py-3">
		<p class="text-[10px] text-primary-400">AnaliCSET v0.1.0 · SENA CSET</p>
	</div>
</aside>
