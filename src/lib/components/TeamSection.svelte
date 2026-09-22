<script lang="ts">
	import { TEAM_MEMBERS } from '../data/mockData';
	import { Users, Code2, Layers, Cpu, Award } from 'lucide-svelte';

	const TEAM_ICONS: Record<string, any> = {
		BE: Code2,
		FE: Layers,
		DO: Cpu,
		PM: Award
	};
</script>

<section class="w-full py-16 lg:py-20 border-t border-[#e6e8ea] dark:border-slate-800" id="equipo">
	<!-- Section Header -->
	<div class="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dae1ff]/40 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
			<Users class="w-3.5 h-3.5" />
			<span>Equipo de Desarrollo: Los Pythones</span>
		</div>
		<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight">
			El equipo detrás de ANALÍ CSET
		</h2>
		<p class="text-base text-[#424656] dark:text-slate-300 mt-3 leading-relaxed">
			Equipo técnico y metodológico responsable de la concepción, arquitectura y desarrollo de la plataforma para el Centro CSET.
		</p>
	</div>

	<!-- Grid of 4 Editable Cards without invented names or fake photos -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
		{#each TEAM_MEMBERS as slot}
			{@const Icon = TEAM_ICONS[slot.roleCode] ?? Users}
			<div
				class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
			>
				<div>
					<!-- Visual Icon Avatar with Slot Number -->
					<div class="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-5 group-hover:bg-[#0050cb] dark:group-hover:bg-blue-600 group-hover:text-white transition-colors">
						<Icon class="w-7 h-7" />
					</div>

					<span class="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider block w-fit mb-3 border {slot.accentColor}">
						{slot.badge}
					</span>

					<h3 class="text-lg font-bold text-[#191c1e] dark:text-slate-100 mb-1">
						{slot.name}
					</h3>

					<p class="text-xs font-semibold text-[#0050cb] dark:text-blue-400 mb-3">
						{slot.projectRole}
					</p>

					<p class="text-xs text-[#424656] dark:text-slate-300 leading-relaxed">
						{slot.responsibility}
					</p>
				</div>

				<div class="pt-4 mt-6 border-t border-[#e6e8ea] dark:border-slate-800 flex items-center justify-between text-[11px] text-[#727687] dark:text-slate-400">
					<span class="font-mono text-slate-400 dark:text-slate-500">Espacio de registro</span>
					<span class="font-semibold text-slate-600 dark:text-slate-300">SENA CSET</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- Note on Transparency -->
	<div class="mt-8 text-center">
		<p class="text-xs text-slate-400 italic">
			Estructura de roles técnicos alineada con la especificación de arquitectura y el cronograma del proyecto ANALÍ CSET.
		</p>
	</div>
</section>
