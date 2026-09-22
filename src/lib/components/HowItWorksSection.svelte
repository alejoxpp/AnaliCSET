<script lang="ts">
	import { UploadCloud, FileSpreadsheet, Search, FileCheck2, ArrowRight } from 'lucide-svelte';

	const steps = [
		{
			stepNumber: '01',
			title: 'Carga de documentos',
			description: 'El sistema recibe documentos PDF, Word y Excel del histórico institucional.',
			icon: UploadCloud,
			formatTags: ['PDF', 'DOCX', 'XLSX'],
			color: 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/40 text-[#0050cb] dark:text-blue-400',
			badgeColor: 'bg-blue-100 dark:bg-blue-900/50 text-[#0050cb] dark:text-blue-300'
		},
		{
			stepNumber: '02',
			title: 'Organización de la información',
			description: 'La plataforma extrae texto, tablas y datos, y organiza el contenido para poder consultarlo.',
			icon: FileSpreadsheet,
			formatTags: ['Texto', 'Tablas', 'Índices'],
			color: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/40 text-[#008259] dark:text-emerald-400',
			badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-[#008259] dark:text-emerald-300'
		},
		{
			stepNumber: '03',
			title: 'Consulta inteligente',
			description: 'El usuario realiza preguntas en lenguaje natural sobre los antecedentes del Comité.',
			icon: Search,
			formatTags: ['Lenguaje Natural', 'Contexto CSET'],
			color: 'border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/40 text-[#007791] dark:text-cyan-400',
			badgeColor: 'bg-cyan-100 dark:bg-cyan-900/50 text-[#007791] dark:text-cyan-300'
		},
		{
			stepNumber: '04',
			title: 'Respuesta con evidencia',
			description: 'La plataforma encuentra información relevante, genera una respuesta comprensible y muestra las fuentes utilizadas.',
			icon: FileCheck2,
			formatTags: ['Cita de Acta', 'Folio Físico', 'Métricas'],
			color: 'border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400',
			badgeColor: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
		}
	];

</script>

<section class="w-full py-16 lg:py-20 border-t border-[#e6e8ea] dark:border-slate-800" id="como-funciona">
	<!-- Section Header -->
	<div class="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dae1ff]/50 dark:bg-blue-950/60 border border-[#0050cb]/20 dark:border-blue-800 text-[#0050cb] dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
			<span>Flujo de Trabajo Institucional</span>
		</div>
		<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight">
			Cómo funciona ANALÍ CSET
		</h2>
		<p class="text-base sm:text-lg text-[#424656] dark:text-slate-300 mt-3 leading-relaxed">
			Diseñado para que cualquier integrante del Comité pueda consultar el archivo institucional en segundos, con total claridad sobre el origen de cada dato.
		</p>
	</div>

	<!-- 4 Steps Grid -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
		{#each steps as step, idx}
			{@const Icon = step.icon}
			<div 
				class="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#0050cb]/30 dark:hover:border-blue-500/30 transition-all group"
			>
				<div>
					<!-- Step number badge & icon -->
					<div class="flex items-center justify-between mb-5">
						<div class="w-12 h-12 rounded-2xl flex items-center justify-center border {step.color} transition-transform group-hover:scale-105">
							<Icon class="w-6 h-6" />
						</div>
						<span class="text-xs font-mono font-extrabold px-2.5 py-1 rounded-full {step.badgeColor}">
							{step.stepNumber}
						</span>
					</div>

					<h3 class="text-lg font-bold text-[#191c1e] dark:text-slate-100 mb-2 leading-snug">
						{step.title}
					</h3>

					<p class="text-sm text-[#424656] dark:text-slate-300 leading-relaxed">
						{step.description}
					</p>
				</div>

				<!-- Format Tags -->
				<div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
					{#each step.formatTags as tag}
						<span class="text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
							{tag}
						</span>
					{/each}
				</div>

				<!-- Decorative connector line on desktop -->
				{#if idx < 3}
					<div class="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 dark:text-slate-600 pointer-events-none">
						<ArrowRight class="w-5 h-5 text-slate-300 dark:text-slate-600" />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
