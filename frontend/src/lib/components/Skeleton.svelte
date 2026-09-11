<script>
	let {
		type = 'custom',
		lines = 3,
		class: className = '',
		height = ''
	} = $props();
</script>

{#if type === 'custom'}
	<div
		class="animate-pulse rounded-md bg-neutral-200/80 {className}"
		style={height ? `height: ${height};` : ''}
		aria-hidden="true"
	></div>
{:else if type === 'text'}
	<div class="space-y-2.5 {className}" aria-hidden="true">
		{#each Array.from({ length: lines }) as _, i}
			<div
				class="animate-pulse h-4 rounded bg-neutral-200/80 {i === lines - 1
					? 'w-3/5'
					: i % 2 === 1
					? 'w-4/5'
					: 'w-full'}"
			></div>
		{/each}
	</div>
{:else if type === 'card'}
	<div
		class="animate-pulse rounded-lg border border-neutral-200 bg-white p-5 shadow-sm {className}"
		aria-hidden="true"
	>
		<div class="flex items-center justify-between">
			<div class="h-4 w-1/3 rounded bg-neutral-200"></div>
			<div class="h-8 w-8 rounded-lg bg-neutral-100"></div>
		</div>
		<div class="mt-4 h-8 w-1/2 rounded bg-neutral-300"></div>
		<div class="mt-2 h-3 w-2/3 rounded bg-neutral-200"></div>
	</div>
{:else if type === 'chart'}
	<div
		class="animate-pulse rounded-lg border border-neutral-200 bg-white p-5 shadow-sm {className}"
		aria-hidden="true"
	>
		<div class="flex items-center justify-between border-b border-neutral-100 pb-3">
			<div class="h-5 w-48 rounded bg-neutral-200"></div>
			<div class="h-4 w-20 rounded bg-neutral-100"></div>
		</div>
		<div class="mt-6 flex h-64 items-end justify-between gap-3 px-2">
			{#each [40, 65, 30, 80, 50, 90, 45, 70] as barHeight}
				<div class="flex flex-1 flex-col items-center gap-2">
					<div
						class="w-full rounded-t bg-neutral-200/70 transition-all"
						style="height: {barHeight}%;"
					></div>
					<div class="h-3 w-6 rounded bg-neutral-200/50"></div>
				</div>
			{/each}
		</div>
	</div>
{:else if type === 'table'}
	<div
		class="animate-pulse rounded-lg border border-neutral-200 bg-white p-4 shadow-sm {className}"
		aria-hidden="true"
	>
		<div class="flex items-center justify-between border-b border-neutral-200 pb-3">
			<div class="h-4 w-24 rounded bg-neutral-200"></div>
			<div class="h-4 w-24 rounded bg-neutral-200"></div>
			<div class="h-4 w-24 rounded bg-neutral-200"></div>
			<div class="h-4 w-16 rounded bg-neutral-200"></div>
		</div>
		<div class="divide-y divide-neutral-100">
			{#each Array.from({ length: lines }) as _}
				<div class="flex items-center justify-between py-3.5">
					<div class="h-4 w-32 rounded bg-neutral-200/70"></div>
					<div class="h-4 w-24 rounded bg-neutral-200/60"></div>
					<div class="h-4 w-20 rounded bg-neutral-200/60"></div>
					<div class="h-6 w-16 rounded-full bg-neutral-200/50"></div>
				</div>
			{/each}
		</div>
	</div>
{/if}
