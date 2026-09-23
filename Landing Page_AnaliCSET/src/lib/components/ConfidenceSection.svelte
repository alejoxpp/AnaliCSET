<script lang="ts">
	import {
		Scale,
		Search,
		FileText,
		TrendingUp,
		FolderCheck,
		BookOpen,
		ShieldAlert,
		CheckCircle2,
		XCircle,
		Clock
	} from 'lucide-svelte';

	const aiPurposes = [
		{
			title: 'Encontrar antecedentes',
			description: 'Localiza casos análogos, citaciones y actas previas mediante búsqueda semántica contextual.',
			icon: Search,
			color: 'bg-blue-50 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-300 border-blue-200 dark:border-blue-800/60'
		},
		{
			title: 'Resumir información',
			description: 'Sintetiza hechos extensos y expedientes complejos en resúmenes ejecutivos claros y digeribles.',
			icon: FileText,
			color: 'bg-emerald-50 dark:bg-emerald-950/60 text-[#008259] dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
		},
		{
			title: 'Identificar tendencias',
			description: 'Ayuda a visibilizar patrones recurrentes por programa, trimestre o tipología de falta.',
			icon: TrendingUp,
			color: 'bg-cyan-50 dark:bg-cyan-950/60 text-[#007791] dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/60'
		},
		{
			title: 'Organizar evidencia',
			description: 'Estructura texto, tablas de Excel y anexos dispersos en una vista ordenada para el Comité.',
			icon: FolderCheck,
			color: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60'
		},
		{
			title: 'Mostrar las fuentes utilizadas',
			description: 'Acompaña cada afirmación con la referencia directa al documento, fecha, folio y acta original.',
			icon: BookOpen,
			color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
		}
	];
</script>

<section class="w-full py-16 lg:py-20 border-t border-[#e6e8ea] dark:border-slate-800" id="confianza">
	<div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#edf2f7] dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-[#e2e8f0] dark:border-slate-800">
		<!-- Prominent Institutional Statement (Mandatory Core Governance Message) -->
		<div class="max-w-3xl mx-auto text-center mb-12">
			<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dae1ff]/70 dark:bg-blue-950/60 border border-[#0050cb]/20 dark:border-blue-800/40 text-[#0050cb] dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
				<Scale class="w-3.5 h-3.5" />
				<span>Principio Rector de Gobernanza Institucional</span>
			</div>

			<div class="w-14 h-14 rounded-2xl bg-[#dae1ff] dark:bg-blue-900/40 text-[#0050cb] dark:text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-xs">
				<Scale class="w-7 h-7" />
			</div>

			<blockquote class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight leading-snug mb-4">
				“La inteligencia artificial apoya el análisis. Las decisiones continúan bajo responsabilidad del Comité.”
			</blockquote>

			<p class="text-sm sm:text-base text-[#424656] dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
				ANALÍ CSET es una herramienta de consulta, organización y asistencia analítica. No reemplaza el criterio pedagógico, el análisis humano ni la deliberación de los integrantes del Comité de Evaluación y Seguimiento del SENA CSET.
			</p>
		</div>

		<!-- The 5 Authorized AI Roles -->
		<div class="mb-10">
			<div class="text-center mb-6">
				<h3 class="text-xs font-extrabold uppercase tracking-widest text-[#0050cb] dark:text-blue-400">
					Alcance de la Asistencia de Inteligencia Artificial
				</h3>
				<p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
					La IA está estrictamente configurada para apoyar al equipo humano en cinco funciones esenciales:
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
				{#each aiPurposes as item}
					{@const Icon = item.icon}
					<div 
						class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
					>
						<div>
							<div class="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border {item.color}">
								<Icon class="w-4 h-4" />
							</div>
							<h4 class="text-xs font-bold text-[#191c1e] dark:text-slate-100 mb-1.5 uppercase tracking-wide">
								{item.title}
							</h4>
							<p class="text-xs text-[#424656] dark:text-slate-300 leading-relaxed">
								{item.description}
							</p>
						</div>
						<div class="pt-2.5 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
							<CheckCircle2 class="w-3 h-3" />
							<span>Función Autorizada</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Clear Boundaries: What the platform DOES NOT do -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs mb-8">
			<div class="flex items-start gap-3">
				<div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
					<XCircle class="w-4 h-4" />
				</div>
				<div>
					<h4 class="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-1">
						Límites éticos y disciplinarios
					</h4>
					<p class="text-xs text-[#424656] dark:text-slate-300 leading-relaxed">
						ANALÍ CSET <strong>no toma decisiones disciplinarias automáticas</strong>, no emite sanciones ni reemplaza la votación de los instructores, voceros o directivos. Toda decisión corresponde exclusivamente al Comité.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-3">
				<div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
					<ShieldAlert class="w-4 h-4" />
				</div>
				<div>
					<h4 class="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-1">
						Respuestas basadas en evidencia
					</h4>
					<p class="text-xs text-[#424656] dark:text-slate-300 leading-relaxed">
						No promete resultados infalibles ni aproximaciones inventadas. Si un dato no figura en el histórico, el sistema declara expresamente que la evidencia es insuficiente en lugar de conjeturar.
					</p>
				</div>
			</div>
		</div>

		<!-- Explicit Machine Learning Disclaimer (Phase 2) -->
		<div class="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700 dark:text-slate-300">
			<div class="flex items-start sm:items-center gap-2.5">
				<Clock class="w-4 h-4 text-[#0050cb] dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
				<p class="leading-relaxed">
					<strong class="text-slate-900 dark:text-slate-100">Aclaración sobre Machine Learning:</strong> Las capacidades predictivas basadas en Machine Learning podrán incorporarse en una fase posterior, cuando exista un conjunto de datos histórico suficiente y validado. El MVP actual realiza consulta documental y análisis descriptivo.
				</p>
			</div>
			<span class="font-mono text-[#0050cb] dark:text-blue-400 text-[11px] font-bold shrink-0 self-end sm:self-auto bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800/60">
				Fase Posterior • Roadmap
			</span>
		</div>
	</div>
</section>
