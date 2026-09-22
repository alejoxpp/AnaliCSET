<script lang="ts">
	import {
		FolderX,
		Clock,
		Scale,
		AlertTriangle,
		AlertCircle,
		CheckCircle2,
		XCircle,
		ShieldCheck,
		Network,
		ArrowRight
	} from 'lucide-svelte';

	interface Props {
		onExploreArchitecture?: () => void;
	}

	let { onExploreArchitecture }: Props = $props();
</script>

<section class="w-full py-16 lg:py-20 border-t border-[#e6e8ea] dark:border-slate-800" id="problema">
	<!-- Chapter 1 Badge & Header -->
	<div class="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dae1ff]/50 dark:bg-blue-950/60 border border-[#0050cb]/20 dark:border-blue-800/60 text-[#0050cb] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
			<span>Capítulo 1 · Contexto Institucional</span>
		</div>
		<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight leading-tight">
			El reto del Comité CSET: cuando la información está dispersa, decidir con justicia toma demasiado tiempo.
		</h2>
		<p class="text-sm sm:text-base text-[#424656] dark:text-slate-300 mt-4 leading-relaxed">
			El <strong class="text-slate-900 dark:text-slate-100">Comité de Evaluación y Seguimiento (CSET)</strong> del SENA es el órgano colegiado donde instructores, bienestar al aprendiz, voceros y coordinadores deliberan sobre el rendimiento y la convivencia de los aprendices. Cada decisión debe ser justa, educativa y amparada en el debido proceso.
		</p>
	</div>

	<!-- 3 Challenge Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
		<!-- Challenge 1 -->
		<div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#ba1a1a]/40 dark:hover:border-red-600/40 hover:shadow-md transition-all">
			<div>
				<div class="w-12 h-12 rounded-xl bg-[#ffdad6]/60 dark:bg-red-950/50 flex items-center justify-center text-[#ba1a1a] dark:text-red-400 mb-5">
					<FolderX class="w-6 h-6" />
				</div>
				<h3 class="text-base sm:text-lg font-bold text-[#191c1e] dark:text-slate-100 mb-2 leading-snug">
					1. Dispersión documental física y digital
				</h3>
				<p class="text-xs sm:text-sm text-[#424656] dark:text-slate-300 leading-relaxed">
					Actas en PDF escaneadas, carpetas compartidas y folios físicos sin un buscador centralizado. Buscar el historial de un aprendiz o una ficha requiere revisar carpetas de años anteriores una a una.
				</p>
			</div>
			<div class="mt-6 pt-4 border-t border-[#e6e8ea] dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-[#ba1a1a] dark:text-red-400">
				<AlertTriangle class="w-4 h-4 shrink-0" />
				<span>Fragmentación de evidencias</span>
			</div>
		</div>

		<!-- Challenge 2 -->
		<div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#495f82]/40 dark:hover:border-blue-600/40 hover:shadow-md transition-all">
			<div>
				<div class="w-12 h-12 rounded-xl bg-[#d5e3ff]/60 dark:bg-blue-950/50 flex items-center justify-center text-[#495f82] dark:text-blue-400 mb-5">
					<Clock class="w-6 h-6" />
				</div>
				<h3 class="text-base sm:text-lg font-bold text-[#191c1e] dark:text-slate-100 mb-2 leading-snug">
					2. Horas invertidas en búsquedas manuales
				</h3>
				<p class="text-xs sm:text-sm text-[#424656] dark:text-slate-300 leading-relaxed">
					Los instructores pierden tiempo valioso revisando constancias en lugar de profundizar en el acompañamiento pedagógico del aprendiz y en la pertinencia de las medidas adoptadas.
				</p>
			</div>
			<div class="mt-6 pt-4 border-t border-[#e6e8ea] dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-[#495f82] dark:text-blue-400">
				<AlertCircle class="w-4 h-4 shrink-0" />
				<span>Sobrecarga operativa del Comité</span>
			</div>
		</div>

		<!-- Challenge 3 -->
		<div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#008259]/40 dark:hover:border-emerald-600/40 hover:shadow-md transition-all">
			<div>
				<div class="w-12 h-12 rounded-xl bg-[#e1ffec] dark:bg-emerald-950/50 flex items-center justify-center text-[#008259] dark:text-emerald-400 mb-5">
					<Scale class="w-6 h-6" />
				</div>
				<h3 class="text-base sm:text-lg font-bold text-[#191c1e] dark:text-slate-100 mb-2 leading-snug">
					3. Riesgo de disparidad en los precedentes
				</h3>
				<p class="text-xs sm:text-sm text-[#424656] dark:text-slate-300 leading-relaxed">
					Sin una memoria histórica accesible, faltas similares pueden recibir resoluciones dispares entre trimestres, debilitando el principio de equidad y el debido proceso del aprendiz.
				</p>
			</div>
			<div class="mt-6 pt-4 border-t border-[#e6e8ea] dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-[#008259] dark:text-emerald-400">
				<ShieldCheck class="w-4 h-4 shrink-0" />
				<span>Necesidad de un criterio unificado</span>
			</div>
		</div>
	</div>

	<!-- Comparative Before vs After Card (Clear Narrative Anchor) -->
	<div class="mb-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs">
		<div class="text-center max-w-2xl mx-auto mb-8">
			<span class="text-xs font-bold text-[#0050cb] dark:text-blue-400 uppercase tracking-wider block mb-1">
				La Transformación con ANALÍ CSET
			</span>
			<h3 class="text-xl sm:text-2xl font-extrabold text-[#191c1e] dark:text-slate-100">
				¿Cómo cambia la sesión del Comité? El Antes y el Después
			</h3>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- ANTES -->
			<div class="p-5 sm:p-6 rounded-2xl bg-red-50/40 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 flex flex-col justify-between">
				<div>
					<div class="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-sm mb-4">
						<XCircle class="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
						<span>Antes de ANALÍ CSET (Proceso Tradicional)</span>
					</div>
					<ul class="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
						<li class="flex items-start gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
							<span><strong class="text-slate-900 dark:text-slate-100">Archivadores en papel:</strong> Búsqueda manual de folios y actas de trimestres anteriores.</span>
						</li>
						<li class="flex items-start gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
							<span><strong class="text-slate-900 dark:text-slate-100">Desconocimiento de precedentes:</strong> Dificultad para saber qué sanción o plan se aplicó a casos similares.</span>
						</li>
						<li class="flex items-start gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
							<span><strong class="text-slate-900 dark:text-slate-100">Sesiones extensas:</strong> Gran parte del tiempo se va en ubicar documentos y cotejar artículos.</span>
						</li>
						<li class="flex items-start gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
							<span><strong class="text-slate-900 dark:text-slate-100">Riesgo probatorio:</strong> Nulidades si una prueba o incapacidad no se localiza a tiempo en el expediente.</span>
						</li>
					</ul>
				</div>
				<div class="mt-5 pt-3 border-t border-red-200/60 dark:border-red-900/40 text-xs font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
					<span>Resultado: Demoras administrativas y desgaste del equipo evaluador.</span>
				</div>
			</div>

			<!-- DESPUÉS -->
			<div class="p-5 sm:p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 flex flex-col justify-between">
				<div>
					<div class="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-4">
						<CheckCircle2 class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
						<span>Con ANALÍ CSET (Gestión Asistida por Evidencia)</span>
					</div>
					<ul class="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
						<li class="flex items-start gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
							<span><strong class="text-slate-900 dark:text-slate-100">Memoria digitalizada:</strong> Extracción directa de texto en PDF, DOCX y XLSX con registro de integridad de las actas cargadas.</span>
						</li>
						<li class="flex items-start gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
							<span><strong class="text-slate-900 dark:text-slate-100">Precedentes al instante:</strong> Sugerencia de medidas basada en los casos previos registrados por el centro.</span>
						</li>
						<li class="flex items-start gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
							<span><strong class="text-slate-900 dark:text-slate-100">Cruce con la normativa interna:</strong> Identificación del artículo y la falta aplicable según el reglamento que indique el centro.</span>
						</li>
						<li class="flex items-start gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
							<span><strong class="text-slate-900 dark:text-slate-100">Decisión soberana humana:</strong> El sistema sustenta con citas a folio físico; el Comité vota y decide.</span>
						</li>
					</ul>
				</div>
				<div class="mt-5 pt-3 border-t border-emerald-200/70 dark:border-emerald-900/40 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
					<span>Resultado: Deliberaciones ágiles, transparentes y pedagógicamente sólidas.</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Transition Banner -->
	<div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#dae1ff] via-[#f2f4f6] to-[#e1ffec] dark:from-blue-950/40 dark:via-slate-900/60 dark:to-emerald-950/40 border border-[#0050cb]/20 dark:border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
		<div class="flex items-center gap-4">
			<div class="w-12 h-12 rounded-xl bg-[#0050cb] dark:bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
				<Network class="w-6 h-6" />
			</div>
			<div>
				<h4 class="text-base sm:text-lg font-bold text-[#191c1e] dark:text-slate-100">
					Capítulo 2: Conoce el Tablero de Análisis CSET y la Demostración del Flujo
				</h4>
				<p class="text-xs sm:text-sm text-[#424656] dark:text-slate-300 mt-0.5">
					Observa las métricas consolidadas del centro o ejecuta la simulación interactiva paso a paso de cómo el sistema procesa un acta.
				</p>
			</div>
		</div>

		<button
			type="button"
			onclick={onExploreArchitecture}
			class="whitespace-nowrap px-5 py-3 rounded-xl bg-[#0050cb] dark:bg-blue-600 text-white text-sm font-semibold hover:bg-[#0066ff] dark:hover:bg-blue-500 shadow-xs transition-all flex items-center gap-2 self-stretch md:self-auto justify-center cursor-pointer"
		>
			<span>Ir al Tablero y Simulación</span>
			<ArrowRight class="w-4 h-4" />
		</button>
	</div>
</section>
