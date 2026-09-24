<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/png" />
	<title>AnaliCSET</title>
</svelte:head>

{@render children()}
