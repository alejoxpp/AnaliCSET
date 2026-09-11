<script>
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	let { type = 'line', data, options = {} } = $props();

	let canvas;
	let chart;

	onMount(() => {
		chart = new Chart(canvas, { type, data, options });
	});

	onDestroy(() => {
		chart?.destroy();
	});
</script>

<canvas bind:this={canvas}></canvas>
