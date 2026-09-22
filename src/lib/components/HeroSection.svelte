<script lang="ts">
	import {
		ArrowRight,
		CheckCircle2,
		ShieldCheck,
		Database,
		Sparkles
	} from 'lucide-svelte';

	interface Props {
		onExplore: () => void;
		onLearnMore: () => void;
		onOpenQuery?: (query: string) => void;
	}

	let { onExplore, onLearnMore, onOpenQuery }: Props = $props();
</script>

<section class="w-full py-10 sm:py-16 lg:py-20 relative overflow-hidden" id="inicio">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
		<!-- Left Column: Core Institutional Mission & Value Proposition -->
		<div class="lg:col-span-6 flex flex-col gap-5 z-10">
			<!-- Institutional Identification Badge -->
			<div class="flex flex-wrap items-center gap-2">
				<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eceef0] dark:bg-slate-800 border border-[#e0e3e5] dark:border-slate-700 w-fit">
					<span class="w-2.5 h-2.5 rounded-full bg-[#008259] dark:bg-emerald-400 animate-pulse"></span>
					<span class="text-xs text-[#424656] dark:text-slate-300 uppercase tracking-wider font-bold">
						SENA Regional Santander • Centro CSET
					</span>
				</div>
				<span class="text-[11px] font-semibold text-[#0050cb] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60">
					Prototipo Conceptual Institucional
				</span>
			</div>

			<!-- Main Headline (Mandatory Core Value Proposition) -->
			<h1 class="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight leading-[1.12]">
				Del histórico del CSET a <span class="text-[#0050cb] dark:text-blue-400">decisiones con evidencia.</span>
			</h1>

			<!-- Supporting Text (Mandatory Supporting Copy) -->
			<p class="text-base sm:text-lg text-[#424656] dark:text-slate-300 max-w-xl leading-relaxed">
				Consulta documentos institucionales, encuentra antecedentes relevantes, identifica tendencias y recibe respuestas fundamentadas en las fuentes históricas del Comité.
			</p>

			<!-- Core Value Statement Box -->
			<div class="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-emerald-50/50 to-teal-50/60 dark:from-blue-950/40 dark:via-slate-900/60 dark:to-emerald-950/30 border border-blue-200/70 dark:border-blue-800/60 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed shadow-2xs">
				<p class="font-semibold text-slate-900 dark:text-slate-100">
					“ANALÍ CSET convierte el histórico documental del Comité en información organizada, consultable y útil para tomar decisiones con evidencia.”
				</p>
			</div>

			<!-- User-friendly Functional Badges (Azul, Verde, Turquesa) -->
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
				<div class="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 text-[#191c1e] dark:text-slate-200 font-medium shadow-2xs">
					<div class="w-2 h-2 rounded-full bg-[#0050cb] dark:bg-blue-400"></div>
					<span>PDF, Word y Excel</span>
				</div>
				<div class="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 text-[#191c1e] dark:text-slate-200 font-medium shadow-2xs">
					<div class="w-2 h-2 rounded-full bg-[#008259] dark:bg-emerald-400"></div>
					<span>Búsqueda de Antecedentes</span>
				</div>
				<div class="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 text-[#191c1e] dark:text-slate-200 font-medium shadow-2xs col-span-2 sm:col-span-1">
					<div class="w-2 h-2 rounded-full bg-[#00d2ff] dark:bg-cyan-400"></div>
					<span>Respuestas con Fuentes</span>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-wrap items-center gap-3 pt-2">
				<button
					type="button"
					onclick={onExplore}
					class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0050cb] dark:bg-blue-600 text-white text-sm font-bold shadow-md hover:bg-[#0066ff] dark:hover:bg-blue-500 hover:shadow-lg transition-all group cursor-pointer"
				>
					<span>Acceder al Tablero</span>
					<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
				</button>

				<button
					type="button"
					onclick={onLearnMore}
					class="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-[#495f82] dark:text-slate-200 border border-[#c2c6d8] dark:border-slate-700 text-sm font-semibold hover:bg-[#f2f4f6] dark:hover:bg-slate-700 transition-colors cursor-pointer"
				>
					¿Cómo Funciona?
				</button>

				<a
					href="#confianza"
					class="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors cursor-pointer"
				>
					Gobernanza CSET
				</a>
			</div>

			<!-- Institutional Trust Notes -->
			<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 text-xs sm:text-sm text-[#424656] dark:text-slate-400">
				<div class="flex items-center gap-1.5 text-[#006645] dark:text-emerald-400 font-semibold">
					<CheckCircle2 class="w-4 h-4 text-[#008259] dark:text-emerald-400" />
					<span>Citas directas al acta y folio físico</span>
				</div>
				<div class="hidden sm:inline-block w-1 h-1 rounded-full bg-[#c2c6d8] dark:bg-slate-700"></div>
				<div class="flex items-center gap-1.5 text-[#495f82] dark:text-slate-300 font-medium">
					<ShieldCheck class="w-4 h-4 text-[#495f82] dark:text-slate-400" />
					<span>Las decisiones son responsabilidad del Comité</span>
				</div>
			</div>
		</div>

		<!-- Right Column: Conceptual Interactive Simulation Card -->
		<div class="lg:col-span-6 relative">
			<div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-[#e6e8ea] dark:border-slate-800 relative overflow-hidden">
				<!-- Window Top Bar with Demo Label -->
				<div class="flex items-center justify-between pb-3.5 mb-4 border-b border-[#e6e8ea] dark:border-slate-800">
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
						<span class="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
						<span class="w-3 h-3 rounded-full bg-[#27c93f]"></span>
						<span class="text-xs text-[#727687] dark:text-slate-400 font-mono font-medium ml-1.5">
							ANALÍ CSET • Flujo de Consulta
						</span>
					</div>
					<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-300 text-[11px] font-extrabold border border-blue-200 dark:border-blue-800/60 shadow-2xs">
						<span class="w-2 h-2 rounded-full bg-[#0050cb] dark:bg-blue-400 animate-ping"></span>
						<span>Datos Demostrativos</span>
					</div>
				</div>

				<!-- Simulated User Question -->
				<button
					type="button"
					onclick={() => onOpenQuery && onOpenQuery('¿Qué antecedentes relacionados con incumplimientos similares aparecen en los registros históricos?')}
					class="w-full text-left p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/60 mb-4 cursor-pointer hover:border-[#0050cb] dark:hover:border-blue-400 transition-colors group"
					title="Click para examinar esta consulta demostrativa"
				>
					<div class="flex items-start gap-2.5">
						<div class="w-7 h-7 rounded-lg bg-[#0050cb] dark:bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
							?
						</div>
						<div class="flex-1">
							<span class="text-[10px] uppercase font-bold text-[#0050cb] dark:text-blue-400 tracking-wider block">
								1. Pregunta del usuario (Lenguaje natural)
							</span>
							<p class="text-xs sm:text-sm font-semibold text-[#191c1e] dark:text-slate-100 mt-0.5 group-hover:text-[#0050cb] dark:group-hover:text-blue-400 transition-colors">
								“¿Qué antecedentes relacionados con incumplimientos similares aparecen en los registros históricos?”
							</p>
						</div>
					</div>
				</button>

				<!-- Repositorio de Documentos Activos en el Análisis -->
				<div class="mb-4">
					<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
						2. Búsqueda en fuentes documentales (Repositorio Privado R2):
					</span>
					<div class="grid grid-cols-3 gap-2">
						<div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-center">
							<span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 mb-1">PDF</span>
							<p class="text-[11px] font-mono text-slate-700 dark:text-slate-200 truncate font-semibold" title="Acta_CSET_042_2024.pdf">Acta_042.pdf</p>
							<span class="text-[10px] text-slate-500 dark:text-slate-400">Folio 12</span>
						</div>
						<div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-center">
							<span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 mb-1">DOCX</span>
							<p class="text-[11px] font-mono text-slate-700 dark:text-slate-200 truncate font-semibold" title="Expediente_Academico_ADSO.docx">Expediente.docx</p>
							<span class="text-[10px] text-slate-500 dark:text-slate-400">Folio 8</span>
						</div>
						<div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-center">
							<span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 mb-1">XLSX</span>
							<p class="text-[11px] font-mono text-slate-700 dark:text-slate-200 truncate font-semibold" title="Fichas_Caracterizacion.xlsx">Fichas_CSET.xlsx</p>
							<span class="text-[10px] text-slate-500 dark:text-slate-400">Registro histórico</span>
						</div>
					</div>
				</div>

				<!-- Retrieved Evidence & Response Preview -->
				<div class="p-4 rounded-2xl bg-[#f7f9fb] dark:bg-slate-800/50 border border-[#e6e8ea] dark:border-slate-700 mb-4">
					<div class="flex items-center justify-between mb-2">
						<span class="inline-flex items-center gap-1.5 text-xs font-bold text-[#0050cb] dark:text-blue-400">
							<Sparkles class="w-3.5 h-3.5" />
							<span>3. Respuesta generada con fuentes</span>
						</span>
						<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold">
							Actas de ejemplo
						</span>
					</div>
					<p class="text-xs sm:text-sm text-[#191c1e] dark:text-slate-200 leading-relaxed">
						Se encontraron antecedentes relacionados en actas de ejemplo. Ante incumplimientos en entrega de evidencias, el comité puede concertar planes de mejoramiento académico conforme al artículo aplicable del reglamento vigente.
					</p>
					
					<!-- Citations Box -->
					<div class="mt-2.5 pt-2.5 border-t border-slate-200/80 dark:border-slate-700 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
						<span class="font-bold text-slate-700 dark:text-slate-300">Fuentes documentales:</span>
						<span class="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-[#0050cb] dark:text-blue-400 font-semibold">Acta de ejemplo (Pág. 12)</span>
						<span class="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-[#0050cb] dark:text-blue-400 font-semibold">Acta de ejemplo (Pág. 8)</span>
						<span class="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-[#0050cb] dark:text-blue-400 font-semibold">Acta de ejemplo (Pág. 15)</span>
					</div>
				</div>

				<!-- Deterministic Metric / Tendencia -->
				<div class="pt-3 border-t border-[#e6e8ea] dark:border-slate-700 flex items-center justify-between gap-3">
					<div class="flex items-center gap-2.5">
						<div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
							<Database class="w-4 h-4" />
						</div>
						<div>
							<span class="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
								4. Métrica y Tendencia Histórica
							</span>
							<span class="text-xs sm:text-sm font-extrabold text-[#191c1e] dark:text-slate-100">
								Mayoría de planes cerrados con éxito (ejemplo)
							</span>
						</div>
					</div>
					<span class="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800/60 hidden sm:inline">
						Cálculo con SQL/Pandas (ejemplo)
					</span>
				</div>
			</div>
		</div>
	</div>
</section>
