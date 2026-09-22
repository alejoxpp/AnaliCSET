<script lang="ts">
	import {
		Search,
		Layers,
		FileCheck,
		FileSpreadsheet,
		BarChart3,
		ShieldCheck,
		FileClock,
		LayoutDashboard,
		Check,
		Info
	} from 'lucide-svelte';

	const mvpCapabilities = [
		{
			title: 'Consulta inteligente del histórico documental',
			description: 'Formula preguntas complejas en lenguaje natural sobre actas de comité, citaciones, acuerdos y registros acumulados a lo largo de los años.',
			icon: Search,
			badge: 'Lenguaje Natural',
			accentColor: 'text-[#0050cb] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800/60'
		},
		{
			title: 'Búsqueda semántica en documentos',
			description: 'Localización conceptual de precedentes mediante similitud vectorial (PostgreSQL + pgvector), identificando hechos afines sin depender de palabras clave exactas.',
			icon: Layers,
			badge: 'pgvector',
			accentColor: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/60'
		},
		{
			title: 'Respuestas fundamentadas con fuentes',
			description: 'Cada respuesta generada por Google Gemini cita el documento, la fecha, el acta y la página o folio físico de donde provino la información.',
			icon: FileCheck,
			badge: 'Grounding Estricto',
			accentColor: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800/60'
		},
		{
			title: 'Extracción de texto y tablas (PDF, DOCX, XLSX)',
			description: 'Procesamiento nativo de formatos institucionales con herramientas especializadas: pdfplumber para PDF, python-docx para Word y pandas/openpyxl para Excel.',
			icon: FileSpreadsheet,
			badge: 'Multi-formato',
			accentColor: 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/60'
		},
		{
			title: 'Análisis descriptivo de tendencias y métricas',
			description: 'Cálculos matemáticos verificables (conteos, porcentajes, tipologías) con SQL y Pandas, fuera del LLM.',
			icon: BarChart3,
			badge: 'Determinista',
			accentColor: 'text-[#0050cb] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800/60'
		},
		{
			title: 'Repositorio privado de documentos',
			description: 'Almacenamiento seguro en Cloudflare R2 con URLs temporales prefirmadas. El frontend y los usuarios no acceden a credenciales maestras.',
			icon: ShieldCheck,
			badge: 'Cloudflare R2',
			accentColor: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/60'
		},
		{
			title: 'Trazabilidad de las respuestas',
			description: 'Cadena de auditoría completa y registro para verificar qué fragmentos documentales sustentaron cada recomendación brindada al Comité.',
			icon: FileClock,
			badge: 'Auditoría Total',
			accentColor: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/60'
		},
		{
			title: 'Dashboard de información institucional',
			description: 'Panel visual para explorar el consolidado de documentos, estados de procesamiento, distribución por periodos y casos disciplinarios o académicos.',
			icon: LayoutDashboard,
			badge: 'Analítica CSET',
			accentColor: 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
		}
	];
</script>

<section class="w-full py-16 lg:py-20 border-t border-[#e6e8ea] dark:border-slate-800" id="capacidades">
	<!-- Section Header -->
	<div class="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dae1ff]/50 dark:bg-blue-950/60 border border-[#0050cb]/20 dark:border-blue-800/60 text-[#0050cb] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
			<span>Capítulo 3 · Capacidades Reales del MVP</span>
		</div>
		<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight">
			Capacidades del Sistema ANALÍ CSET
		</h2>
		<p class="text-sm sm:text-base text-[#424656] dark:text-slate-300 mt-3 leading-relaxed">
			Funcionalidades aprobadas para el producto mínimo viable. Sin promesas de automatización prematura ni supuestos que excedan el alcance institucional acordado.
		</p>
	</div>

	<!-- Grid of 8 Genuine Capabilities -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
		{#each mvpCapabilities as cap}
			{@const Icon = cap.icon}
			<div
				class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#0050cb]/40 dark:hover:border-blue-500/40 hover:shadow-md transition-all group"
			>
				<div>
					<div class="flex items-center justify-between mb-4">
						<div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-[#0050cb] dark:group-hover:bg-blue-600 group-hover:text-white transition-colors">
							<Icon class="w-5 h-5" />
						</div>
						<span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded border {cap.accentColor}">
							{cap.badge}
						</span>
					</div>

					<h3 class="text-sm font-bold text-[#191c1e] dark:text-slate-100 mb-2 leading-snug">
						{cap.title}
					</h3>
					<p class="text-xs text-[#424656] dark:text-slate-300 leading-relaxed">
						{cap.description}
					</p>
				</div>

				<div class="pt-3 mt-4 border-t border-[#e6e8ea] dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
					<span>En alcance del MVP</span>
					<Check class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
				</div>
			</div>
		{/each}
	</div>

	<!-- Scope Clarification Notice (Phase 2 & OCR) -->
	<div class="mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
		<div class="flex items-center gap-2">
			<Info class="w-4 h-4 text-[#0050cb] dark:text-blue-400 shrink-0" />
			<span>
				<strong class="text-slate-800 dark:text-slate-100">Delimitación Técnica de Alcance:</strong> Los modelos predictivos con <strong>scikit-learn</strong> se incorporarán en una fase posterior cuando exista un conjunto de datos consolidado y validado. Los documentos sin capa de texto digital se catalogan como <em>REQUIERE_OCR</em> para tratamiento en la fase especializada.
			</span>
		</div>
		<span class="font-mono text-slate-400 dark:text-slate-500 shrink-0 text-[11px]">STACK_TECNOLOGICO.md §15.2</span>
	</div>
</section>
