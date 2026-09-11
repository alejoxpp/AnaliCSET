<script>
	import { page } from '$app/state';

	const navItems = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/actas', label: 'Consulta de actas' },
		{ href: '/estadisticas', label: 'Estadísticas' },
		{ href: '/reportes', label: 'Reportes', badge: 'Próximamente' }
	];
</script>

<aside class="flex w-60 shrink-0 flex-col bg-primary-900 text-white">
	<div class="px-5 py-5">
		<p class="font-heading text-lg font-semibold">AnaliCSET</p>
		<p class="text-xs text-primary-200">SENA · CSET</p>
	</div>
	<nav class="flex-1 space-y-1 px-3">
		{#each navItems as item (item.href)}
			<a
				href={item.href}
				class="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors
					{page.url.pathname.startsWith(item.href)
					? 'bg-primary-700 text-white'
					: 'text-primary-100 hover:bg-primary-800'}"
			>
				<span>{item.label}</span>
				{#if item.badge}
					<span
						class="rounded-full bg-accent-400/20 px-2 py-0.5 text-[10px] font-medium text-accent-200"
					>
						{item.badge}
					</span>
				{/if}
			</a>
		{/each}
	</nav>
</aside>
