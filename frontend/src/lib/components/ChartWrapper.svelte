<script>
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	let {
		type = 'line',
		data,
		options = {},
		class: className = '',
		chartInstance = $bindable(null)
	} = $props();

	let canvas;
	let chart;

	/**
	 * Desenvuelve el proxy de $state de Svelte 5 para evitar que Chart.js
	 * intente redefinir descriptores de propiedades en el proxy (state_descriptors_fixed).
	 */
	function unproxy(val) {
		if (!val) return val;
		try {
			return $state.snapshot(val);
		} catch {
			return JSON.parse(JSON.stringify(val));
		}
	}

	export function getImageBase64(format = 'image/png') {
		if (!chart) return null;
		return chart.toBase64Image(format, 1.0);
	}

	export function getChart() {
		return chart;
	}

	onMount(() => {
		chart = new Chart(canvas, {
			type,
			data: unproxy(data),
			options
		});
		chartInstance = chart;
	});

	// Actualiza el gráfico reactivamente cuando cambia `data` u `options`
	$effect(() => {
		if (!chart) return;
		chart.data = unproxy(data);
		if (options) {
			chart.options = { ...chart.options, ...options };
		}
		chart.update();
	});

	onDestroy(() => {
		chart?.destroy();
		chartInstance = null;
	});
</script>

<div class="relative h-full w-full {className}">
	<canvas bind:this={canvas} class="max-h-full max-w-full"></canvas>
</div>
