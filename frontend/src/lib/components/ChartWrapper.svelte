<script>
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	let { type = 'line', data, options = {} } = $props();

	let canvas;
	let chart;

	onMount(() => {
		chart = new Chart(canvas, { type, data, options });
	});

	// Actualiza el gráfico reactivamente cuando cambia `data` después del
	// mount inicial. Esto permite que los filtros de fecha en estadísticas
	// actualicen los gráficos sin recrearlos desde cero.
	$effect(() => {
		if (!chart) return;
		// Acceder a `data` dentro del $effect lo registra como dependencia.
		chart.data = data;
		chart.update('none'); // 'none' evita animación en cada update reactivo
	});

	onDestroy(() => {
		chart?.destroy();
	});
</script>

<canvas bind:this={canvas}></canvas>
