<script lang="ts">
	interface Props {
		size?: 'sm' | 'md';
		variant?: 'horizontal' | 'icon';
	}

	let {
		size = 'md',
		variant = 'horizontal'
	}: Props = $props();

	const heightClasses = {
		sm: 'h-8 sm:h-9',
		md: 'h-9 sm:h-10'
	};

	const iconSizes = {
		sm: 'w-7 h-7',
		md: 'w-9 h-9'
	};
</script>

{#if variant === 'horizontal'}
	<div class="flex items-center">
		<img
			src="/anali-cset-logo.svg"
			alt="ANALÍ CSET - SENA Santander"
			class="{heightClasses[size]} w-auto object-contain select-none"
		/>
	</div>
{:else}
	<div class="inline-flex items-center justify-center shrink-0">
		<img
			src="/anali-cset-icon.svg"
			alt="Isotipo ANALÍ CSET"
			class="{iconSizes[size]} object-contain select-none"
		/>
	</div>
{/if}
