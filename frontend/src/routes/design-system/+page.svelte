<script>
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Table from '$lib/components/Table.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import { toasts } from '$lib/stores/toast.js';

	let nombre = $state('');
	let buttonLoading = $state(false);

	function simulateLoading() {
		buttonLoading = true;
		setTimeout(() => (buttonLoading = false), 1500);
	}

	// Clases escritas de forma literal (no interpoladas) para que el
	// escáner de Tailwind las detecte y genere el CSS correspondiente.
	const primaryShades = [
		{ label: '50', class: 'bg-primary-50' },
		{ label: '100', class: 'bg-primary-100' },
		{ label: '200', class: 'bg-primary-200' },
		{ label: '300', class: 'bg-primary-300' },
		{ label: '400', class: 'bg-primary-400' },
		{ label: '500', class: 'bg-primary-500' },
		{ label: '600', class: 'bg-primary-600' },
		{ label: '700', class: 'bg-primary-700' },
		{ label: '800', class: 'bg-primary-800' },
		{ label: '900', class: 'bg-primary-900' }
	];

	const neutralShades = [
		{ label: '50', class: 'bg-neutral-50' },
		{ label: '100', class: 'bg-neutral-100' },
		{ label: '200', class: 'bg-neutral-200' },
		{ label: '300', class: 'bg-neutral-300' },
		{ label: '400', class: 'bg-neutral-400' },
		{ label: '500', class: 'bg-neutral-500' },
		{ label: '600', class: 'bg-neutral-600' },
		{ label: '700', class: 'bg-neutral-700' },
		{ label: '800', class: 'bg-neutral-800' },
		{ label: '900', class: 'bg-neutral-900' }
	];

	const accentShades = [
		{ label: '50', class: 'bg-accent-50' },
		{ label: '100', class: 'bg-accent-100' },
		{ label: '200', class: 'bg-accent-200' },
		{ label: '300', class: 'bg-accent-300' },
		{ label: '400', class: 'bg-accent-400' },
		{ label: '500', class: 'bg-accent-500' },
		{ label: '600', class: 'bg-accent-600' },
		{ label: '700', class: 'bg-accent-700' }
	];

	const semanticShades = [
		{ label: 'success 500', class: 'bg-success-500' },
		{ label: 'success 600', class: 'bg-success-600' },
		{ label: 'danger 500', class: 'bg-danger-500' },
		{ label: 'danger 600', class: 'bg-danger-600' }
	];
</script>

<svelte:head>
	<title>Sistema de diseño · AnaliCSET</title>
</svelte:head>

<div class="mx-auto max-w-5xl space-y-14 px-6 py-10">
	<header>
		<h1 class="font-heading text-3xl font-semibold text-neutral-900">Sistema de diseño</h1>
		<p class="mt-2 text-neutral-600">
			Componentes base de AnaliCSET. Revísalos aquí antes de construir pantallas reales.
		</p>
	</header>

	<!-- Paleta -->
	<section class="space-y-4">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Paleta</h2>
		<div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
			<div class="space-y-1">
				<p class="text-sm font-medium text-neutral-700">Primary</p>
				<div class="overflow-hidden rounded-md border border-neutral-200">
					{#each primaryShades as shade}
						<div class="flex h-6 items-center px-2 text-[10px] text-white/90 {shade.class}">
							{shade.label}
						</div>
					{/each}
				</div>
			</div>
			<div class="space-y-1">
				<p class="text-sm font-medium text-neutral-700">Neutral</p>
				<div class="overflow-hidden rounded-md border border-neutral-200">
					{#each neutralShades as shade}
						<div class="flex h-6 items-center px-2 text-[10px] text-white/90 {shade.class}">
							{shade.label}
						</div>
					{/each}
				</div>
			</div>
			<div class="space-y-1">
				<p class="text-sm font-medium text-neutral-700">Accent (solo IA/patrones)</p>
				<div class="overflow-hidden rounded-md border border-neutral-200">
					{#each accentShades as shade}
						<div class="flex h-6 items-center px-2 text-[10px] text-white/90 {shade.class}">
							{shade.label}
						</div>
					{/each}
				</div>
			</div>
			<div class="space-y-1">
				<p class="text-sm font-medium text-neutral-700">Semantic</p>
				<div class="overflow-hidden rounded-md border border-neutral-200">
					{#each semanticShades as shade}
						<div class="flex h-6 items-center px-2 text-[10px] text-white/90 {shade.class}">
							{shade.label}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Tipografía -->
	<section class="space-y-3">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Tipografía</h2>
		<div class="space-y-2 rounded-lg border border-neutral-200 bg-white p-5">
			<p class="font-heading text-2xl font-semibold">Fraunces — Títulos (font-heading)</p>
			<p class="font-body text-base text-neutral-700">
				Public Sans — Texto de cuerpo (font-body). Diseñada para comunicaciones de gobierno: seria,
				legible y sin el aire genérico de una fuente de plantilla.
			</p>
		</div>
	</section>

	<!-- Button -->
	<section class="space-y-3">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Button</h2>
		<div class="flex flex-wrap items-center gap-3 rounded-lg border border-neutral-200 bg-white p-5">
			<Button variant="primary">Primario</Button>
			<Button variant="secondary">Secundario</Button>
			<Button variant="danger">Peligro</Button>
			<Button variant="primary" disabled>Deshabilitado</Button>
			<Button variant="primary" loading={buttonLoading} onclick={simulateLoading}>
				{buttonLoading ? 'Cargando...' : 'Simular carga'}
			</Button>
		</div>
	</section>

	<!-- Input -->
	<section class="space-y-3">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Input</h2>
		<div class="grid gap-4 rounded-lg border border-neutral-200 bg-white p-5 sm:grid-cols-3">
			<Input label="Nombre" placeholder="Escribe tu nombre" bind:value={nombre} />
			<Input label="Correo" type="email" error="Este campo es obligatorio" />
			<Input label="Deshabilitado" value="No editable" disabled />
		</div>
	</section>

	<!-- Card -->
	<section class="space-y-3">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Card</h2>
		<div class="grid gap-4 sm:grid-cols-2">
			<Card title="Acta CSET N.º 014">
				<p class="text-sm text-neutral-600">
					Comité de Evaluación y Seguimiento — sesión ordinaria. 12 casos revisados.
				</p>
			</Card>
			<Card title="Con pie de página">
				{#snippet children()}
					<p class="text-sm text-neutral-600">Contenido de la tarjeta.</p>
				{/snippet}
				{#snippet footer()}
					<Button variant="secondary">Ver detalle</Button>
				{/snippet}
			</Card>
		</div>
	</section>

	<!-- Badge -->
	<section class="space-y-3">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Badge</h2>
		<div class="flex flex-wrap gap-2 rounded-lg border border-neutral-200 bg-white p-5">
			<Badge variant="neutral">Pendiente</Badge>
			<Badge variant="primary">En trámite</Badge>
			<Badge variant="success">Resuelto</Badge>
			<Badge variant="danger">Vencido</Badge>
			<Badge variant="accent">Patrón detectado por IA</Badge>
		</div>
	</section>

	<!-- Table -->
	<section class="space-y-3">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Table</h2>
		<Table caption="Casos recientes del CSET">
			{#snippet head()}
				<tr>
					<th class="px-4 py-3">Caso</th>
					<th class="px-4 py-3">Aprendiz</th>
					<th class="px-4 py-3">Estado</th>
				</tr>
			{/snippet}
			{#snippet children()}
				<tr>
					<td class="px-4 py-3">CSET-2026-014</td>
					<td class="px-4 py-3">Juan Pérez</td>
					<td class="px-4 py-3"><Badge variant="success">Resuelto</Badge></td>
				</tr>
				<tr>
					<td class="px-4 py-3">CSET-2026-015</td>
					<td class="px-4 py-3">Ana Gómez</td>
					<td class="px-4 py-3"><Badge variant="accent">Patrón detectado</Badge></td>
				</tr>
			{/snippet}
		</Table>
	</section>

	<!-- Spinner -->
	<section class="space-y-3">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Spinner</h2>
		<div class="flex items-center gap-6 rounded-lg border border-neutral-200 bg-white p-5">
			<Spinner size="sm" />
			<Spinner size="md" />
			<Spinner size="lg" />
		</div>
	</section>

	<!-- Toast -->
	<section class="space-y-3">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Toast</h2>
		<div class="flex flex-wrap gap-3 rounded-lg border border-neutral-200 bg-white p-5">
			<Button variant="secondary" onclick={() => toasts.add('Cambios guardados', 'success')}>
				Éxito
			</Button>
			<Button variant="secondary" onclick={() => toasts.add('No se pudo guardar', 'danger')}>
				Error
			</Button>
			<Button
				variant="secondary"
				onclick={() => toasts.add('La IA detectó un patrón nuevo', 'accent')}
			>
				Alerta IA
			</Button>
		</div>
	</section>

	<!-- Skeleton (Loading) -->
	<section class="space-y-3">
		<h2 class="font-heading text-xl font-semibold text-neutral-900">Skeleton (Estados de carga)</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<Skeleton type="card" />
			<Skeleton type="table" lines={3} />
		</div>
	</section>
</div>
