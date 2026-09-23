<script lang="ts">
	import { INITIAL_CASES } from '../data/mockData';
	import type { ExpedienteCase } from '../types';
	import {
		ArrowLeft,
		Search,
		Sparkles,
		BookOpen,
		ShieldCheck,
		CheckCircle2,
		FileCheck,
		HelpCircle
	} from 'lucide-svelte';

	interface Props {
		onBack: () => void;
		onOpenDocModal: (caseItem: ExpedienteCase) => void;
		initialQuery?: string;
	}

	let {
		onBack,
		onOpenDocModal,
		initialQuery = 'Faltas académicas reiteradas y planes de mejoramiento'
	}: Props = $props();

	interface QueryResult {
		title: string;
		summary: string;
		confidence: string;
		reglamentoArt: string;
		matchedCases: ExpedienteCase[];
		analysisPoints: string[];
	}

	let query = $state('');
	let loading = $state(false);

	$effect(() => {
		query = initialQuery;
	});

	let result = $state<QueryResult>({
		title: 'Análisis de Antecedentes: Faltas Académicas y Planes de Mejoramiento',
		summary:
			'A modo de ejemplo: en un histórico simulado, la mayoría de los aprendices con plan de mejoramiento concertado superaron los resultados de aprendizaje pendientes sin condicionamiento ni cancelación.',
		confidence: 'Trazabilidad auditada · Ejemplo',
		reglamentoArt: 'Reglamento vigente • Artículos de ejemplo',
		matchedCases: [INITIAL_CASES[0], INITIAL_CASES[2], INITIAL_CASES[3]],
		analysisPoints: [
			'En este ejemplo, la primera medida consensuada suele ser de naturaleza pedagógica.',
			'Criterio de reiteración: La inasistencia injustificada reiterada (superior a 3 días continuos) puede activar el proceso previsto en el reglamento, sin perjuicio del plan.',
			'Los tiempos de resolución dependen de cada caso.'
		]
	});

	function handleSearch(customQuery?: string) {
		const q = customQuery || query;
		if (!q.trim()) return;

		loading = true;
		setTimeout(() => {
			loading = false;
			const isAttendance = q.toLowerCase().includes('inasistencia') || q.toLowerCase().includes('ausencia');
			const isConvivencia = q.toLowerCase().includes('convivencia') || q.toLowerCase().includes('disciplin');

			if (isAttendance) {
				result = {
					title: 'Análisis de Antecedentes: Inasistencias Injustificadas y Deserción',
					summary:
						'Los registros del Comité CSET estipulan que cuando las ausencias se acompañan de incapacidades médicas o constancias laborales de fuerza mayor allegadas en los 3 días hábiles posteriores, se procede al archivo o reprogramación formativa conforme al debido proceso.',
					confidence: 'Trazabilidad auditada · Ejemplo',
					reglamentoArt: 'Reglamento vigente • Artículo de ejemplo',
					matchedCases: [INITIAL_CASES[1], INITIAL_CASES[4]],
					analysisPoints: [
						'Verificación probatoria: Es deber del comité corroborar el soporte documental radicado en oficina de Bienestar al Aprendiz.',
						'En este ejemplo, pocas inasistencias acumuladas culminaron en cancelación cuando hubo comparecencia.'
					]
				};
			} else if (isConvivencia) {
				result = {
					title: 'Análisis de Antecedentes: Faltas Disciplinarias y de Convivencia',
					summary:
						'En incidentes clasificados bajo faltas disciplinarias leves o moderadas en ambientes de aprendizaje, el comité puede aplicar preferentemente acuerdos de concertación y servicio social pedagógico antes de evaluar condicionamientos formales.',
					confidence: 'Trazabilidad auditada · Ejemplo',
					reglamentoArt: 'Reglamento vigente • Artículo de ejemplo',
					matchedCases: [INITIAL_CASES[3]],
					analysisPoints: [
						'Medida correctiva: Firma de compromiso con seguimiento del instructor vocero y Bienestar.',
						'La tasa de reincidencia se calcula sobre el periodo evaluado (valor de ejemplo).'
					]
				};
			} else {
				result = {
					title: `Resultados Documentales para: "${q}"`,
					summary:
						'Se localizaron folios coincidentes en actas de ejemplo. El patrón predominante resalta la aplicación coordinada de planes de mejoramiento con entregables semanales.',
					confidence: 'Trazabilidad auditada · Ejemplo',
					reglamentoArt: 'Reglamento vigente • Capítulo de ejemplo',
					matchedCases: [INITIAL_CASES[0], INITIAL_CASES[2]],
					analysisPoints: [
						'Concordancia documental en sesiones de ejemplo.',
						'Evaluación favorable por parte del equipo pedagógico del Centro CSET.'
					]
				};
			}
		}, 400);
	}
</script>

<div class="w-full py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
	<!-- Header -->
	<div class="flex items-center gap-3 pb-6 border-b border-[#e6e8ea] dark:border-slate-800">
		<button
			type="button"
			onclick={onBack}
			class="p-2 rounded-xl bg-white dark:bg-slate-800 border border-[#c2c6d8] dark:border-slate-700 hover:bg-[#f2f4f6] dark:hover:bg-slate-700 text-[#424656] dark:text-slate-300 transition-colors cursor-pointer"
			title="Volver"
		>
			<ArrowLeft class="w-5 h-5" />
		</button>
		<div>
			<div class="flex items-center gap-2">
				<span class="text-xs font-bold text-[#008259] dark:text-emerald-400 uppercase tracking-wider">
					Motor Semántico Trazable
				</span>
				<span class="w-1.5 h-1.5 rounded-full bg-[#008259] dark:bg-emerald-400"></span>
				<span class="text-xs text-[#727687] dark:text-slate-400">Citas Auditables a Folios</span>
			</div>
			<h1 class="text-2xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight">
				Consulta de Antecedentes y Doctrina CSET
			</h1>
		</div>
	</div>

	<!-- Contexto institucional -->
	<div class="flex items-center justify-end gap-3 pt-6 pb-2">
		<div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
			<HelpCircle class="w-4 h-4 text-slate-400 dark:text-slate-500" />
			<span>Comité de Evaluación y Seguimiento • Regional Santander</span>
		</div>
	</div>

	<!-- Search Input Bar -->
		<div class="animate-in fade-in duration-200">
			<div class="my-6">
				<div class="p-2 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#0050cb]/40 dark:border-blue-500/40 shadow-sm flex flex-col sm:flex-row items-center gap-2">
					<div class="flex items-center gap-3 w-full px-2">
						<Search class="w-5 h-5 text-[#0050cb] dark:text-blue-400 shrink-0" />
						<input
							type="text"
							bind:value={query}
							onkeydown={(e) => e.key === 'Enter' && handleSearch()}
							placeholder="Escribe tu consulta sobre precedentes, tipologías o artículos del reglamento..."
							class="w-full text-sm sm:text-base font-medium text-[#191c1e] dark:text-slate-100 placeholder-[#727687] dark:placeholder-slate-400 focus:outline-hidden bg-transparent"
						/>
					</div>

					<button
						type="button"
						onclick={() => handleSearch()}
						disabled={loading}
						class="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0050cb] hover:bg-[#003da6] text-white text-sm font-bold transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
					>
						{#if loading}
							<span class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
						{:else}
							<Sparkles class="w-4 h-4" />
						{/if}
						<span>Consultar Folios</span>
					</button>
				</div>

				<!-- Quick Question Chips -->
				<div class="flex flex-wrap items-center gap-2 mt-3">
					<span class="text-xs text-[#727687] dark:text-slate-400 font-semibold">Consultas frecuentes del comité:</span>
					<button
						type="button"
						onclick={() => {
							query = 'Faltas académicas reiteradas y planes de mejoramiento';
							handleSearch('Faltas académicas reiteradas y planes de mejoramiento');
						}}
						class="px-3 py-1 rounded-lg bg-[#f2f4f6] dark:bg-slate-800 text-xs font-semibold text-[#424656] dark:text-slate-300 hover:bg-[#dae1ff] dark:hover:bg-blue-950/70 hover:text-[#0050cb] dark:hover:text-blue-300 transition-colors cursor-pointer"
					>
						Planes de mejoramiento académico
					</button>
					<button
						type="button"
						onclick={() => {
							query = 'Precedentes sobre inasistencia por calamidad doméstica';
							handleSearch('Precedentes sobre inasistencia por calamidad doméstica');
						}}
						class="px-3 py-1 rounded-lg bg-[#f2f4f6] dark:bg-slate-800 text-xs font-semibold text-[#424656] dark:text-slate-300 hover:bg-[#dae1ff] dark:hover:bg-blue-950/70 hover:text-[#0050cb] dark:hover:text-blue-300 transition-colors cursor-pointer"
					>
						Inasistencias justificadas
					</button>
					<button
						type="button"
						onclick={() => {
							query = 'Tipificación de faltas disciplinarias y acuerdos';
							handleSearch('Tipificación de faltas disciplinarias y acuerdos');
						}}
						class="px-3 py-1 rounded-lg bg-[#f2f4f6] dark:bg-slate-800 text-xs font-semibold text-[#424656] dark:text-slate-300 hover:bg-[#dae1ff] dark:hover:bg-blue-950/70 hover:text-[#0050cb] dark:hover:text-blue-300 transition-colors cursor-pointer"
					>
						Faltas disciplinarias leves
					</button>
				</div>
			</div>

			<!-- Results View -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
				<!-- Main Response Box (8 cols) -->
				<div class="lg:col-span-8 space-y-6">
					<div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs">
						<div class="flex items-center justify-between pb-4 mb-4 border-b border-[#e6e8ea] dark:border-slate-800">
							<div class="flex items-center gap-2 text-xs font-bold text-[#008259] dark:text-emerald-400">
								<ShieldCheck class="w-5 h-5" />
								<span class="uppercase tracking-wider">{result.confidence}</span>
							</div>
							<span class="font-mono text-xs text-[#727687] dark:text-slate-400 bg-[#f2f4f6] dark:bg-slate-800 px-2.5 py-1 rounded">
								Hash: 8b1f22c8
							</span>
						</div>

						<h2 class="text-xl font-bold text-[#191c1e] dark:text-slate-100 mb-3 leading-snug">
							{result.title}
						</h2>

						<p class="text-sm sm:text-base text-[#191c1e] dark:text-slate-200 leading-relaxed mb-6 font-serif">
							{result.summary}
						</p>

						<!-- Key Findings List -->
						<div class="space-y-2 mb-6">
							<span class="text-xs font-bold text-[#424656] dark:text-slate-400 uppercase tracking-wider block">
								Puntos de Evidencia Extraídos
							</span>
							{#each result.analysisPoints as point}
								<div class="flex items-start gap-2.5 text-xs sm:text-sm text-[#424656] dark:text-slate-300">
									<CheckCircle2 class="w-4 h-4 text-[#0050cb] dark:text-blue-400 mt-0.5 shrink-0" />
									<span>{point}</span>
								</div>
							{/each}
						</div>

						<!-- Legal Anchor -->
						<div class="p-3.5 rounded-xl bg-[#dae1ff]/40 dark:bg-blue-950/50 border border-[#0050cb]/20 dark:border-blue-800/40 flex items-center justify-between">
							<span class="text-xs font-bold text-[#0050cb] dark:text-blue-300 flex items-center gap-1.5">
								<BookOpen class="w-4 h-4" />
								<span>{result.reglamentoArt}</span>
							</span>
							<span class="text-xs text-[#727687] dark:text-slate-400">Vigente</span>
						</div>
					</div>

					<!-- Matched Folios Cards -->
					<div class="space-y-4">
						<h3 class="text-base font-bold text-[#191c1e] dark:text-slate-100 flex items-center gap-2">
							<FileCheck class="w-5 h-5 text-[#0050cb] dark:text-blue-400" />
							<span>Folios y Actas Coincidentes ({result.matchedCases.length})</span>
						</h3>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{#each result.matchedCases as c}
								<div
									role="button"
									tabindex="0"
									onclick={() => onOpenDocModal(c)}
									onkeydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											onOpenDocModal(c);
										}
									}}
									aria-label="Abrir documento del caso {c.code}"
									class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-2xs hover:border-[#0050cb]/40 dark:hover:border-blue-500/40 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between text-left"
								>
									<div>
										<div class="flex items-center justify-between mb-2">
											<span class="text-xs font-mono font-bold text-[#0050cb] dark:text-blue-300 bg-[#dae1ff]/50 dark:bg-blue-950/70 px-2 py-0.5 rounded">
												{c.code}
											</span>
											<span class="text-xs text-[#727687] dark:text-slate-400 font-mono">{c.fecha}</span>
										</div>

										<h4 class="text-sm font-bold text-[#191c1e] dark:text-slate-100 mb-1">
											{c.fuenteDoc} • {c.folio}
										</h4>

										<p class="text-xs text-[#424656] dark:text-slate-300 italic line-clamp-3 mb-3 font-serif">
											"{c.extracto}"
										</p>
									</div>

									<div class="pt-3 border-t border-[#e6e8ea] dark:border-slate-800 flex items-center justify-between text-xs">
										<span class="font-semibold text-[#008259] dark:text-emerald-400">{c.medidaSugerida}</span>
										<span class="text-[#0050cb] dark:text-blue-400 font-bold">Ver Acta →</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Sidebar Info (4 cols) -->
				<div class="lg:col-span-4 space-y-6">
					<div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs">
						<h3 class="text-base font-bold text-[#191c1e] dark:text-slate-100 mb-2 flex items-center gap-2">
							<ShieldCheck class="w-5 h-5 text-[#008259] dark:text-emerald-400" />
							<span>Gobernanza de la Consulta</span>
						</h3>
						<p class="text-xs text-[#424656] dark:text-slate-300 leading-relaxed mb-4">
							ANALÍ CSET genera respuestas exclusivamente acotadas al contenido textual de las actas oficiales indexadas. Las respuestas se acotan al contenido de las actas indexadas.
						</p>

						<div class="space-y-3 pt-3 border-t border-[#e6e8ea] dark:border-slate-800 text-xs">
							<div class="flex justify-between">
								<span class="text-[#727687] dark:text-slate-400">Actas Indexadas:</span>
								<span class="font-mono font-bold text-[#191c1e] dark:text-slate-100">Actas de ejemplo</span>
							</div>
							<div class="flex justify-between">
								<span class="text-[#727687] dark:text-slate-400">Rango de Fechas:</span>
								<span class="font-bold text-[#191c1e] dark:text-slate-100">Periodo de ejemplo</span>
							</div>
							<div class="flex justify-between">
								<span class="text-[#727687] dark:text-slate-400">Protección de Datos:</span>
								<span class="text-[#008259] dark:text-emerald-400 font-bold">Anonimizadas (ejemplo)</span>
							</div>
						</div>
					</div>

					<div class="p-6 rounded-2xl bg-[#f2f4f6] dark:bg-slate-800/70 border border-[#e6e8ea] dark:border-slate-700">
						<h4 class="text-sm font-bold text-[#191c1e] dark:text-slate-100 mb-2">
							Normativa Aplicable
						</h4>
						<ul class="space-y-2 text-xs text-[#424656] dark:text-slate-300">
							<li class="flex items-center gap-1.5">
								<span class="w-1.5 h-1.5 rounded-full bg-[#0050cb] dark:bg-blue-400"></span>
								<span>Reglamento del Aprendiz vigente (versión por confirmar con el centro)</span>
							</li>
							<li class="flex items-center gap-1.5">
								<span class="w-1.5 h-1.5 rounded-full bg-[#0050cb] dark:bg-blue-400"></span>
								<span>Circulares de procedimiento internas (según el centro)</span>
							</li>
							<li class="flex items-center gap-1.5">
								<span class="w-1.5 h-1.5 rounded-full bg-[#0050cb] dark:bg-blue-400"></span>
								<span>Código de integridad y ética aplicable</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
</div>
