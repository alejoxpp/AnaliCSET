<script lang="ts">
	import { onDestroy } from 'svelte';
	import { DEMO_SCENARIOS } from '../data/mockData';
	import { categoriaDot } from '../utils/badges';
	import {
		FileText,
		Cpu,
		BookOpen,
		CheckCircle2,
		Play,
		RotateCcw,
		ShieldCheck,
		ArrowRight
	} from 'lucide-svelte';

	interface Props {
		onApplyToSearch?: (queryText: string) => void;
	}

	let { onApplyToSearch }: Props = $props();

	let selectedScenarioIndex = $state(0);
	let currentStep = $state(1);
	let isPlaying = $state(false);
	let timer: any = null;

	let scenario = $derived(DEMO_SCENARIOS[selectedScenarioIndex]);

	$effect(() => {
		if (isPlaying) {
			timer = setInterval(() => {
				if (currentStep >= 4) {
					isPlaying = false;
					clearInterval(timer);
				} else {
					currentStep += 1;
				}
			}, 3000);
		} else if (timer) {
			clearInterval(timer);
		}
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});

	function handleSelectScenario(idx: number) {
		selectedScenarioIndex = idx;
		currentStep = 1;
		isPlaying = false;
	}

	function handleReset() {
		currentStep = 1;
		isPlaying = false;
	}
</script>

<div class="w-full bg-white dark:bg-slate-900 rounded-3xl border border-[#e6e8ea] dark:border-slate-800 shadow-sm p-6 sm:p-8" id="simulador-flujo">
	<!-- Section Header -->
	<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#e6e8ea] dark:border-slate-800">
		<div>
			<div class="flex items-center gap-2 mb-2">
				<span class="w-2.5 h-2.5 rounded-full bg-[#008259] dark:bg-emerald-400 animate-pulse"></span>
				<span class="text-xs font-bold uppercase tracking-wider text-[#0050cb] dark:text-blue-400">
					Sección “Cómo Funciona” · Cuatro Etapas Visuales
				</span>
			</div>
			<h3 class="text-xl sm:text-2xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight">
				De la Ingesta de Documentos a la Decisión con Evidencia
			</h3>
			<p class="text-sm text-[#424656] dark:text-slate-300 mt-1 max-w-2xl">
				Comprende cómo viaja la información desde el archivo institucional en PDF, DOCX y XLSX hasta la sustentación probatoria frente al Comité.
			</p>
		</div>

		<!-- Action Controls -->
		<div class="flex items-center gap-2 shrink-0">
			<button
				type="button"
				onclick={() => (isPlaying = !isPlaying)}
				class="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer {isPlaying
					? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
					: 'bg-[#0050cb] dark:bg-blue-600 text-white hover:bg-[#0066ff] dark:hover:bg-blue-500 shadow-xs'}"
			>
				<Play class="w-3.5 h-3.5 {isPlaying ? 'fill-amber-900 dark:fill-amber-200' : 'fill-white'}" />
				<span>{isPlaying ? 'Pausar Simulación' : 'Reproducir Flujo'}</span>
			</button>
			<button
				type="button"
				onclick={handleReset}
				class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
				title="Reiniciar etapas"
			>
				<RotateCcw class="w-4 h-4" />
			</button>
		</div>
	</div>

	<!-- Scenario Selector Chips -->
	<div class="py-4 border-b border-[#e6e8ea] dark:border-slate-800">
		<span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
			Selecciona un caso institucional para simular:
		</span>
		<div class="flex flex-wrap gap-2">
			{#each DEMO_SCENARIOS as sc, idx}
				<button
					type="button"
					onclick={() => handleSelectScenario(idx)}
					class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer {selectedScenarioIndex === idx
						? 'bg-blue-50 dark:bg-blue-950/60 border-2 border-[#0050cb] dark:border-blue-500 text-[#0050cb] dark:text-blue-300 font-bold shadow-2xs'
						: 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}"
				>
					<span class="w-2 h-2 rounded-full {categoriaDot(sc.category)}"></span>
					<span>{sc.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- 4 Visual Stages Progress Bar -->
	<div class="py-6">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
			{#each [
				{
					num: 1,
					title: '1. Documentos Institucionales',
					desc: 'PDF, Word y Excel en repositorio privado',
					icon: FileText
				},
				{
					num: 2,
					title: '2. Información Organizada',
					desc: 'Extracción, fragmentación y pgvector',
					icon: Cpu
				},
				{
					num: 3,
					title: '3. Preguntas con Contexto',
					desc: 'Lenguaje natural y agente Google ADK',
					icon: BookOpen
				},
				{
					num: 4,
					title: '4. Evidencia para Decidir',
					desc: 'Respuestas, fuentes y métricas calculadas',
					icon: CheckCircle2
				}
			] as st}
				{@const isActive = currentStep === st.num}
				{@const isPassed = currentStep > st.num}
				{@const Icon = st.icon}

				<button
					type="button"
					onclick={() => {
						currentStep = st.num;
						isPlaying = false;
					}}
					class="p-3.5 rounded-2xl border text-left transition-all cursor-pointer {isActive
						? 'bg-blue-50/80 dark:bg-blue-950/70 border-[#0050cb] dark:border-blue-500 ring-2 ring-[#0050cb]/15 dark:ring-blue-500/20 shadow-xs'
						: isPassed
						? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
						: 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'}"
				>
					<div class="flex items-center justify-between mb-1.5">
						<span
							class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold {isActive
								? 'bg-[#0050cb] dark:bg-blue-600 text-white'
								: isPassed
								? 'bg-emerald-600 text-white'
								: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}"
						>
							{isPassed ? '✓' : st.num}
						</span>
						<Icon
							class="w-4 h-4 {isActive
								? 'text-[#0050cb] dark:text-blue-400'
								: isPassed
								? 'text-emerald-600 dark:text-emerald-400'
								: 'text-slate-400 dark:text-slate-500'}"
						/>
					</div>
					<div class="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">{st.title}</div>
					<div class="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{st.desc}</div>
				</button>
			{/each}
		</div>

		<!-- Stage Content Card -->
		<div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 transition-all">
			<!-- Stage 1: Documentos Institucionales -->
			{#if currentStep === 1}
				<div class="space-y-4">
					<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
						<div class="flex items-center gap-2">
							<span class="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
							<h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">
								Etapa 1: Documentos Institucionales en Repositorio Privado
							</h4>
						</div>
						<span class="text-xs font-mono text-slate-500 dark:text-slate-400">{scenario.docTitle}</span>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs font-mono text-xs text-slate-700 dark:text-slate-300 space-y-2">
							<div class="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
								<span>CSET • Documento de ejemplo</span>
								<span class="text-emerald-600 dark:text-emerald-400 font-semibold">{scenario.formato}</span>
							</div>
							<p class="text-xs leading-relaxed italic bg-amber-50/70 dark:bg-amber-950/30 p-2.5 rounded border border-amber-200/70 dark:border-amber-800/60 font-sans text-slate-800 dark:text-slate-200">
								«{scenario.rawSnippet}»
							</p>
							<div class="text-[10px] text-slate-400 dark:text-slate-500 break-all pt-1 flex justify-between">
								<span>Extractor: <strong class="text-slate-700 dark:text-slate-300">{scenario.extractor}</strong></span>
								<span>Sello de integridad (ejemplo)</span>
							</div>
						</div>

						<div class="flex flex-col justify-between space-y-3 text-xs text-slate-600 dark:text-slate-300">
							<p class="leading-relaxed">
								<strong class="text-slate-900 dark:text-slate-100">¿Cómo funciona para el Comité?</strong> Los integrantes cargan actas, citaciones, acuerdos y listas de aprendices en formatos PDF, DOCX y XLSX. Los archivos originales se custodian en un repositorio privado en la nube (Cloudflare R2), con acceso exclusivo para el backend mediante credenciales protegidas.
							</p>
							<div class="p-3 bg-blue-50/70 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/60 rounded-xl text-blue-900 dark:text-blue-300">
								<strong>Sin necesidad de OCR en el MVP:</strong> Al trabajar con documentos digitales institucionales, el sistema extrae el texto y las tablas de forma directa con bibliotecas especializadas.
							</div>
							<button
								type="button"
								onclick={() => (currentStep = 2)}
								class="self-start inline-flex items-center gap-1.5 text-xs font-bold text-[#0050cb] dark:text-blue-400 hover:underline cursor-pointer"
							>
								<span>Avanzar a Etapa 2 (Información Organizada)</span>
								<ArrowRight class="w-3.5 h-3.5" />
							</button>
						</div>
					</div>
				</div>
			{/if}

			<!-- Stage 2: Información Organizada -->
			{#if currentStep === 2}
				<div class="space-y-4">
					<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
						<div class="flex items-center gap-2">
							<span class="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
							<h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">
								Etapa 2: Información Organizada y Vectorizada
							</h4>
						</div>
						<span class="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
							PostgreSQL + pgvector
						</span>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3 text-xs text-slate-700 dark:text-slate-300">
							<div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
								<span class="text-slate-400 dark:text-slate-500 font-medium">Metadato Normalizado</span>
								<span class="font-mono text-slate-700 dark:text-slate-300">Valor Estructurado</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-500 dark:text-slate-400">Formato original:</span>
								<span class="font-semibold text-slate-800 dark:text-slate-200">{scenario.formato}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-500 dark:text-slate-400">Ficha CSET:</span>
								<span class="font-mono font-bold text-blue-700 dark:text-blue-400">{scenario.ficha}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-500 dark:text-slate-400">Programa formativo:</span>
								<span class="font-semibold text-slate-800 dark:text-slate-200">{scenario.programa}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-500 dark:text-slate-400">Dimensión vectorial:</span>
								<span class="font-mono text-emerald-700 dark:text-emerald-400 font-bold">Dimensiones del modelo configurado</span>
							</div>
						</div>

						<div class="flex flex-col justify-between space-y-3 text-xs text-slate-600 dark:text-slate-300">
							<p class="leading-relaxed">
								<strong class="text-slate-900 dark:text-slate-100">¿Qué hace la plataforma internamente?</strong> Divide el texto limpio en fragmentos ordenados (chunks de 500 a 800 tokens) para no descontextualizar artículos ni descargos. Luego, cada fragmento se convierte en un vector numérico que se guarda en PostgreSQL con la extensión pgvector junto a sus metadatos (folio, fecha, acta).
							</p>
							<div class="p-3 bg-emerald-50/70 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 rounded-xl text-emerald-900 dark:text-emerald-300">
								<strong>Protección y Cumplimiento:</strong> Se prevé trazabilidad mediante hashes y resguardo de datos personales conforme a la normativa vigente.
							</div>
							<button
								type="button"
								onclick={() => (currentStep = 3)}
								class="self-start inline-flex items-center gap-1.5 text-xs font-bold text-[#0050cb] dark:text-blue-400 hover:underline cursor-pointer"
							>
								<span>Avanzar a Etapa 3 (Preguntas con Contexto)</span>
								<ArrowRight class="w-3.5 h-3.5" />
							</button>
						</div>
					</div>
				</div>
			{/if}

			<!-- Stage 3: Preguntas con Contexto -->
			{#if currentStep === 3}
				<div class="space-y-4">
					<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
						<div class="flex items-center gap-2">
							<span class="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400"></span>
							<h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">
								Etapa 3: Preguntas con Contexto y Agente Coordinador
							</h4>
						</div>
						<span class="text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
							Google ADK + RAG
						</span>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3 text-xs">
							<div>
								<span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
									Artículo del Reglamento Identificado en Documentos:
								</span>
								<div class="p-2.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 rounded-lg font-semibold text-blue-900 dark:text-blue-300">
									{scenario.matchedArticle}
								</div>
							</div>

							<div class="pt-2 border-t border-slate-100 dark:border-slate-800">
								<span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
									Precedente Histórico Localizado:
								</span>
								<p class="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
									{scenario.historicalPrecedent}
								</p>
								<div class="mt-2 inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/50 dark:border-emerald-800/50">
									<ShieldCheck class="w-3.5 h-3.5" />
									<span>{scenario.precedentRate}</span>
								</div>
							</div>
						</div>

						<div class="flex flex-col justify-between space-y-3 text-xs text-slate-600 dark:text-slate-300">
							<p class="leading-relaxed">
								<strong class="text-slate-900 dark:text-slate-100">¿Cómo responde sin inventar?</strong> Un agente coordinador construido con Google ADK recibe la pregunta y activa el buscador semántico RAG. Este localiza en PostgreSQL y pgvector los fragmentos documentales que realmente contienen hechos coincidentes.
							</p>
							<div class="p-3 bg-purple-50/70 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/60 rounded-xl text-purple-900 dark:text-purple-300">
								<strong>Cero Alucinaciones:</strong> Google Gemini utiliza esos fragmentos como único contexto autorizado. Si no existe información suficiente en las actas, el sistema advierte explícitamente la falta de evidencia.
							</div>
							<button
								type="button"
								onclick={() => (currentStep = 4)}
								class="self-start inline-flex items-center gap-1.5 text-xs font-bold text-[#0050cb] dark:text-blue-400 hover:underline cursor-pointer"
							>
								<span>Avanzar a Etapa 4 (Evidencia para Decidir)</span>
								<ArrowRight class="w-3.5 h-3.5" />
							</button>
						</div>
					</div>
				</div>
			{/if}

			<!-- Stage 4: Evidencia para Decidir -->
			{#if currentStep === 4}
				<div class="space-y-4">
					<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
						<div class="flex items-center gap-2">
							<span class="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
							<h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">
								Etapa 4: Evidencia para Decidir con Respuestas y Fuentes Verificables
							</h4>
						</div>
						<span class="text-xs font-semibold text-[#0050cb] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
							Decisión humana
						</span>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border-2 border-emerald-500/40 dark:border-emerald-500/50 shadow-xs space-y-3 text-xs">
							<div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
								<span class="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
									<CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
									Medida Sugerida por Precedentes
								</span>
								<span class="text-[10px] font-mono text-slate-400 dark:text-slate-500">Auditable</span>
							</div>

							<p class="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
								{scenario.recommendedMeasure}
							</p>

							<div class="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300">
								<span class="text-[11px] text-slate-400 dark:text-slate-500 font-semibold block">Fuente Documental Citada:</span>
								<span class="font-mono font-bold text-[#0050cb] dark:text-blue-400">{scenario.folioCitation}</span>
							</div>

							<div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
								<span>Responsabilidad de Votación:</span>
								<span class="font-semibold text-slate-800 dark:text-slate-200">Exclusiva del Comité CSET</span>
							</div>
						</div>

						<div class="flex flex-col justify-between space-y-3 text-xs text-slate-600 dark:text-slate-300">
							<p class="leading-relaxed">
								<strong class="text-slate-900 dark:text-slate-100">La plataforma presenta la evidencia, no impone el veredicto.</strong> El Comité dispone de las fuentes citadas, porcentajes calculados de forma determinista mediante SQL o Pandas y citas al folio para deliberar con tranquilidad y apego riguroso al debido proceso.
							</p>
							<div class="p-3 bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-900 dark:text-emerald-300 font-medium">
								«La inteligencia artificial apoya el análisis. Las decisiones continúan bajo responsabilidad del Comité.»
							</div>
							<div class="flex flex-wrap items-center gap-2">
								{#if onApplyToSearch}
									<button
										type="button"
										onclick={() => onApplyToSearch?.(scenario.rawSnippet)}
										class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0050cb] hover:bg-[#003da6] text-white text-xs font-bold transition-colors cursor-pointer"
									>
										<span>Probar en buscador</span>
										<ArrowRight class="w-3.5 h-3.5" />
									</button>
								{/if}
								<button
									type="button"
									onclick={handleReset}
									class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
								>
									<RotateCcw class="w-3.5 h-3.5" />
									<span>Reiniciar demostración</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
