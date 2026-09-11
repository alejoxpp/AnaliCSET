<script>
	import { page } from '$app/state';
	import Card from '$lib/components/Card.svelte';
</script>

<svelte:head>
	<title>Detalle del patrón · AnaliCSET</title>
</svelte:head>

<Card title="Detalle del patrón">
	<p class="text-neutral-600">
		Vista de detalle en construcción para el patrón <strong>{page.params.id}</strong>.
	</p>
</Card>
