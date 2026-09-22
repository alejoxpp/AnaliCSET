<script lang="ts">
	import {
		Database,
		Cpu,
		Search,
		Sparkles,
		CheckCircle2,
		ShieldCheck,
		ChevronRight,
		Info
	} from 'lucide-svelte';

	let activeStep = $state(3); // 0 to 4
	let selectedQueryIndex = $state(0);

	const sampleQueries = [
		{
			title: 'Incumplimiento de evidencias en etapa lectiva',
			question:
				'¿Qué antecedentes relacionados con incumplimientos similares aparecen en los registros históricos?',
			detectedTool: 'buscar_documentos_rag + consultar_metricas',
			matchedActsCount: 4,
			retrievedChunks: [
				{
					acta: 'Acta CSET 042 (2024)',
					date: '14/05/2024',
					folio: 'Pág. 12, Folio 4',
					format: 'PDF (pdfplumber)',
					text: '...Se evaluó la falta académica por no entrega de evidencias 03 y 04 de la Fase de Planeación. El Comité concertó Plan de Mejoramiento Académico a 30 días calendario con entregables semanales...',
					score: '0.92 similitud cosenos'
				},
				{
					acta: 'Acta CSET 039 (2023)',
					date: '22/11/2023',
					folio: 'Pág. 8, Folio 2',
					format: 'DOCX (python-docx)',
					text: '...En casos de primer requerimiento formal por incumplimiento de evidencias formativas, se prioriza medida pedagógica preventiva de mejoramiento académico antes de condicionamiento de matrícula...',
					score: '0.88 similitud cosenos'
				},
				{
					acta: 'Acta CSET 035 (2023)',
					date: '18/08/2023',
					folio: 'Pág. 15, Folio 7',
					format: 'PDF (pdfplumber)',
					text: '...Constatación del cumplimiento favorable del plan de mejoramiento académico fijado. Se levantó la medida preventiva y el aprendiz continuó su ruta formativa regular...',
					score: '0.84 similitud cosenos'
				},
				{
					acta: 'Acta CSET 028 (2023)',
					date: '10/03/2023',
					folio: 'Pág. 6, Folio 1',
					format: 'XLSX (pandas/openpyxl)',
					text: 'Registro histórico consolidado: 14 aprendices con reporte de inejecución de evidencias en etapa lectiva con cierre concertado por Comité...',
					score: '0.81 similitud cosenos'
				}
			],
			response:
				'Se encontraron antecedentes relacionados en actas de ejemplo. Ante incumplimientos de entrega de evidencias en etapa lectiva, el comité puede concertar planes de mejoramiento académico conforme al artículo aplicable del reglamento vigente.',
			metricCalculation: {
				label: 'Tasa de cumplimiento de planes de mejoramiento',
				value: '78.4%',
				method: 'SQL Nativo / Pandas (Agregación determinista sobre los registros cargados · ejemplo)',
				detail: 'Cálculo aritmético exacto en base de datos PostgreSQL, sin inferencia estocástica del LLM'
			}
		},
		{
			title: 'Inasistencias injustificadas reiteradas',
			question:
				'¿Cuál ha sido la medida pedagógica adoptada ante inasistencias superiores a 3 días consecutivos?',
			detectedTool: 'buscar_documentos_rag + consultar_metricas',
			matchedActsCount: 3,
			retrievedChunks: [
				{
					acta: 'Acta CSET 038 (2023)',
					date: '10/10/2023',
					folio: 'Pág. 5, Folio 1',
					format: 'PDF (pdfplumber)',
					text: '...Tres días consecutivos de inasistencia sin justificación médica o de fuerza mayor comprobada. Se emitió citación formal a descargos conforme al procedimiento disciplinario...',
					score: '0.94 similitud cosenos'
				},
				{
					acta: 'Acta CSET 022 (2023)',
					date: '15/02/2023',
					folio: 'Pág. 11, Folio 3',
					format: 'DOCX (python-docx)',
					text: '...Verificación de descargos. Al no mediar soporte probatorio, el comité recomendó condicionamiento de matrícula con plan de seguimiento psicosocial y reporte a coordinación...',
					score: '0.89 similitud cosenos'
				}
			],
			response:
				'Se encontraron antecedentes en actas de ejemplo. Ante inasistencias injustificadas reiteradas, el protocolo puede activar citación formal a descargos y, según el caso, medidas como el condicionamiento de matrícula con seguimiento de bienestar.',
			metricCalculation: {
				label: 'Casos resueltos con descargos oportunos',
				value: '64.2%',
				method: 'SQL COUNT & GROUP BY en PostgreSQL',
				detail: 'Conteo exacto determinista sobre la tabla document_chunks'
			}
		}
	];

	let currentQuery = $derived(sampleQueries[selectedQueryIndex]);

	const steps = [
		{
			number: '01',
			title: 'Repositorio Privado',
			subtitle: 'Cloudflare R2 + Extractores',
			desc: 'PDF (pdfplumber), DOCX (python-docx) y XLSX (pandas/openpyxl)'
		},
		{
			number: '02',
			title: 'Pregunta en Lenguaje Natural',
			subtitle: 'Consulta del Comité',
			desc: 'Formulación en español estándar por integrantes del CSET'
		},
		{
			number: '03',
			title: 'Agente Coordinador ADK',
			subtitle: 'Google ADK Tool Calling',
			desc: 'Decide deterministamente si invoca RAG o métricas SQL'
		},
		{
			number: '04',
			title: 'Búsqueda Semántica pgvector',
			subtitle: 'PostgreSQL Vector Search',
			desc: 'Comparación de similitud por cosenos (<=>) sobre vectores de embeddings'
		},
		{
			number: '05',
			title: 'Respuesta Fundamentada',
			subtitle: 'Gemini Grounding + Métricas',
			desc: 'Síntesis contextual con fuentes citadas y cálculo exacto'
		}
	];
</script>

<div class="w-full bg-white dark:bg-slate-900 rounded-3xl border border-[#e6e8ea] dark:border-slate-800 shadow-sm p-6 sm:p-8 relative overflow-hidden">
	<!-- Top Banner Notice: Conceptual Simulation -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-[#e6e8ea] dark:border-slate-800">
		<div>
			<div class="flex items-center gap-2 mb-1.5">
				<span class="w-2.5 h-2.5 rounded-full bg-[#0050cb] dark:bg-blue-400 animate-pulse"></span>
				<span class="text-xs font-bold uppercase tracking-wider text-[#0050cb] dark:text-blue-400">
					Representación Conceptual Interactiva de la Plataforma
				</span>
				<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
					Datos Demostrativos
				</span>
			</div>
			<h3 class="text-xl sm:text-2xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight">
				¿Cómo transforma ANALÍ CSET una pregunta en evidencia fundamentada?
			</h3>
			<p class="text-xs sm:text-sm text-[#424656] dark:text-slate-300 mt-0.5">
				Haz clic en las etapas para explorar la arquitectura de herramientas coordinadas por Google ADK y pgvector.
			</p>
		</div>

		<!-- Query Selector Tabs -->
		<div class="flex items-center gap-2 shrink-0">
			<span class="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden md:inline">Ejemplo:</span>
			{#each sampleQueries as q, idx}
				<button
					type="button"
					onclick={() => (selectedQueryIndex = idx)}
					class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer {selectedQueryIndex === idx
						? 'bg-[#0050cb] dark:bg-blue-600 text-white shadow-2xs'
						: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}"
				>
					Caso {idx + 1}
				</button>
			{/each}
		</div>
	</div>

	<!-- Progressive Step Navigator -->
	<div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
		{#each steps as st, idx}
			{@const isActive = activeStep === idx}
			{@const isPassed = activeStep > idx}
			<button
				type="button"
				onclick={() => (activeStep = idx)}
				class="text-left p-3 rounded-2xl border transition-all relative cursor-pointer {isActive
					? 'bg-blue-50/90 dark:bg-blue-950/60 border-[#0050cb] dark:border-blue-500 ring-2 ring-[#0050cb]/20 dark:ring-blue-500/30 shadow-xs'
					: isPassed
					? 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
					: 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 opacity-60 hover:opacity-90'}"
			>
				<div class="flex items-center justify-between mb-1">
					<span class="text-[10px] font-mono font-extrabold {isActive ? 'text-[#0050cb] dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}">
						PASO {st.number}
					</span>
					{#if isPassed}
						<CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
					{/if}
				</div>
				<h4 class="text-xs font-bold text-[#191c1e] dark:text-slate-100 line-clamp-1">
					{st.title}
				</h4>
				<p class="text-[11px] text-[#424656] dark:text-slate-400 mt-0.5 line-clamp-1">
					{st.subtitle}
				</p>
			</button>
		{/each}
	</div>

	<!-- Main Dynamic Interactive Canvas -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
		<!-- Left Side: Detail of the Active Phase -->
		<div class="lg:col-span-7 flex flex-col gap-4">
			<!-- Phase 0: Repositorio Privado de Documentos -->
			{#if activeStep === 0}
				<div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
					<div class="flex items-center justify-between mb-3">
						<div class="flex items-center gap-2">
							<div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#0050cb] dark:text-blue-400 flex items-center justify-center font-bold">
								<Database class="w-4 h-4" />
							</div>
							<div>
								<h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">Repositorio Privado en Cloudflare R2</h4>
								<p class="text-xs text-slate-500 dark:text-slate-400">Archivos binarios originales en almacenamiento de objetos compatible S3</p>
							</div>
						</div>
						<span class="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
							Acceso Restringido
						</span>
					</div>

					<p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
						Los documentos institucionales nunca se mezclan ni se exponen públicamente. Al cargarse, se valida su extensión y se registra su hash de integridad, almacenándose de forma privada. El sistema extrae su contenido según el formato con herramientas de solo lectura:
					</p>

					<div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
						<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
							<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400">PDF</span>
							<p class="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">pdfplumber</p>
							<p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Texto estructurado y tablas sin OCR invasivo en el MVP.</p>
						</div>
						<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
							<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400">DOCX</span>
							<p class="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">python-docx</p>
							<p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Párrafos, encabezados jerárquicos y tablas de actas.</p>
						</div>
						<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
							<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400">XLSX</span>
							<p class="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">pandas / openpyxl</p>
							<p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Hojas de cálculo, listas de aprendices y matrices numéricas.</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Phase 1: Pregunta de Usuario -->
			{#if activeStep === 1}
				<div class="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
					<div class="flex items-center gap-2 mb-3">
						<span class="w-7 h-7 rounded-lg bg-[#0050cb] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
							?
						</span>
						<div>
							<h4 class="text-sm font-bold text-[#191c1e] dark:text-slate-100">Pregunta en Lenguaje Natural</h4>
							<p class="text-xs text-[#424656] dark:text-slate-400">Sin necesidad de escribir comandos complejos ni código SQL</p>
						</div>
					</div>

					<div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-800/60 mb-3 shadow-2xs">
						<span class="text-[10px] font-mono uppercase font-bold text-[#0050cb] dark:text-blue-400 block mb-1">
							Pregunta formulada por el Comité:
						</span>
						<p class="text-sm font-semibold text-[#191c1e] dark:text-slate-100">
							“{currentQuery.question}”
						</p>
					</div>

					<p class="text-xs text-[#424656] dark:text-slate-300 leading-relaxed">
						El usuario no requiere conocer la estructura interna de la base de datos. La solicitud se despacha de forma segura mediante HTTPS a la API FastAPI con autenticación JWT de sesión local.
					</p>
				</div>
			{/if}

			<!-- Phase 2: Agente Coordinador (Google ADK) -->
			{#if activeStep === 2}
				<div class="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60">
					<div class="flex items-center justify-between mb-3">
						<div class="flex items-center gap-2">
							<div class="w-8 h-8 rounded-lg bg-purple-600 dark:bg-purple-700 text-white flex items-center justify-center font-bold">
								<Cpu class="w-4 h-4" />
							</div>
							<div>
								<h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">Agente Coordinador (Google ADK)</h4>
								<p class="text-xs text-slate-500 dark:text-slate-400">Un único agente con catálogo de herramientas controladas</p>
							</div>
						</div>
						<span class="text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800/60">
							Tool Calling Seguro
						</span>
					</div>

					<p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
						El agente evalúa la intención semántica del usuario y <strong>decide deterministamente qué herramienta invocar</strong>. El LLM tiene estrictamente prohibido ejecutar sentencias SQL libres.
					</p>

					<div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800/60 space-y-2">
						<div class="flex items-center justify-between text-xs">
							<span class="font-bold text-slate-700 dark:text-slate-300">Herramienta 1 activada:</span>
							<code class="text-purple-700 dark:text-purple-300 font-mono font-semibold">buscar_documentos_rag(query, top_k=5)</code>
						</div>
						<div class="flex items-center justify-between text-xs">
							<span class="font-bold text-slate-700 dark:text-slate-300">Herramienta 2 activada:</span>
							<code class="text-purple-700 dark:text-purple-300 font-mono font-semibold">consultar_metricas(tipo='plan_mejoramiento')</code>
						</div>
					</div>

					<div class="mt-3 flex items-center gap-2 text-[11px] text-purple-900 dark:text-purple-200 bg-purple-100/60 dark:bg-purple-900/30 p-2.5 rounded-xl">
						<Info class="w-4 h-4 shrink-0 text-purple-700 dark:text-purple-400" />
						<span>Google ADK mantiene el control sin depender de múltiples agentes autónomos dispersos.</span>
					</div>
				</div>
			{/if}

			<!-- Phase 3: Búsqueda Semántica en pgvector -->
			{#if activeStep === 3}
				<div class="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
					<div class="flex items-center justify-between mb-3">
						<div class="flex items-center gap-2">
							<div class="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-700 text-white flex items-center justify-center font-bold">
								<Search class="w-4 h-4" />
							</div>
							<div>
								<h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">Búsqueda Semántica en PostgreSQL + pgvector</h4>
								<p class="text-xs text-slate-500 dark:text-slate-400">Recuperación RAG coubicada en la base de datos relacional</p>
							</div>
						</div>
						<span class="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
							Embeddings (modelo a definir)
						</span>
					</div>

					<p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
						El componente <code class="font-mono text-emerald-800 dark:text-emerald-400 font-semibold">PgvectorRetriever</code> transforma la pregunta en un vector y realiza una búsqueda de similitud por cosenos (<code class="font-mono text-emerald-800 dark:text-emerald-400 font-semibold">&lt;=&gt;</code>) directamente en la tabla <code class="font-mono text-slate-700 dark:text-slate-300">document_chunks</code>, localizando los fragmentos más relevantes:
					</p>

					<!-- Retrieved Chunks Display -->
					<div class="space-y-2 max-h-56 overflow-y-auto pr-1">
						{#each currentQuery.retrievedChunks as chunk}
							<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-800/60 text-xs">
								<div class="flex items-center justify-between mb-1">
									<div class="flex items-center gap-1.5">
										<span class="font-bold text-slate-900 dark:text-slate-100">{chunk.acta}</span>
										<span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">({chunk.date})</span>
									</div>
									<span class="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
										{chunk.folio}
									</span>
								</div>
								<p class="text-slate-600 dark:text-slate-300 italic line-clamp-2 font-serif text-[11px]">
									"{chunk.text}"
								</p>
								<div class="mt-1 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
									<span>Formato: {chunk.format}</span>
									<span class="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{chunk.score}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Phase 4: Respuesta Fundamentada con Grounding y Métricas -->
			{#if activeStep === 4}
				<div class="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
					<div class="flex items-center justify-between mb-3">
						<div class="flex items-center gap-2">
							<div class="w-8 h-8 rounded-lg bg-[#0050cb] dark:bg-blue-600 text-white flex items-center justify-center font-bold">
								<Sparkles class="w-4 h-4" />
							</div>
							<div>
								<h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">Respuesta Fundamentada (Gemini + Grounding)</h4>
								<p class="text-xs text-slate-500 dark:text-slate-400">Síntesis explicativa sin invención de datos</p>
							</div>
						</div>
						<span class="text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/60">
							Evidencia Suficiente: Sí
						</span>
					</div>

					<div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/60 mb-3 shadow-2xs">
						<p class="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
							{currentQuery.response}
						</p>

						<!-- Sources List -->
						<div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
							<span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
								Fuentes institucionales utilizadas:
							</span>
							<div class="flex flex-wrap gap-1.5">
								{#each currentQuery.retrievedChunks as ch}
									<span class="px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-[#0050cb] dark:text-blue-400 font-semibold">
										{ch.acta} • {ch.folio}
									</span>
								{/each}
							</div>
						</div>
					</div>

					<!-- Deterministic Metric Box -->
					<div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
						<div class="flex items-center justify-between">
							<span class="text-xs font-bold text-emerald-900 dark:text-emerald-200">
								{currentQuery.metricCalculation.label}
							</span>
							<span class="text-base font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
								{currentQuery.metricCalculation.value}
							</span>
						</div>
						<p class="text-[11px] text-emerald-800 dark:text-emerald-300 mt-1">
							<strong>Método:</strong> {currentQuery.metricCalculation.method}
						</p>
						<p class="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5 italic">
							{currentQuery.metricCalculation.detail}
						</p>
					</div>
				</div>
			{/if}

			<!-- Navigation Controls between steps -->
			<div class="flex items-center justify-between pt-2">
				<button
					type="button"
					onclick={() => (activeStep = Math.max(0, activeStep - 1))}
					disabled={activeStep === 0}
					class="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
				>
					← Etapa anterior
				</button>

				<span class="text-xs font-mono text-slate-500 dark:text-slate-400">
					Etapa {activeStep + 1} de {steps.length}
				</span>

				<button
					type="button"
					onclick={() => (activeStep = Math.min(steps.length - 1, activeStep + 1))}
					disabled={activeStep === steps.length - 1}
					class="px-4 py-2 rounded-xl text-xs font-bold bg-[#0050cb] dark:bg-blue-600 text-white hover:bg-[#0066ff] dark:hover:bg-blue-500 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5 cursor-pointer"
				>
					<span>Siguiente etapa</span>
					<ChevronRight class="w-3.5 h-3.5" />
				</button>
			</div>
		</div>

		<!-- Right Side: Architecture Synthesis Card -->
		<div class="lg:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
			<div>
				<div class="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
					<ShieldCheck class="w-4 h-4 text-[#0050cb] dark:text-blue-400" />
					<h4 class="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
						Resumen de Responsabilidades
					</h4>
				</div>

				<div class="space-y-3 text-xs">
					<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
						<span class="font-extrabold text-[#0050cb] dark:text-blue-400 block mb-0.5">RAG (Recuperador semántico)</span>
						<p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
							Busca información relevante dentro de los documentos oficiales cargados por la institución en PostgreSQL + pgvector.
						</p>
					</div>

					<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
						<span class="font-extrabold text-purple-700 dark:text-purple-400 block mb-0.5">Google ADK (Agente Coordinador)</span>
						<p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
							Evalúa la pregunta y decide qué herramienta utilizar con parámetros estrictos, reduciendo el riesgo de inyecciones y respuestas sin fundamento.
						</p>
					</div>

					<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
						<span class="font-extrabold text-blue-700 dark:text-blue-400 block mb-0.5">Google Gemini (Modelo LLM)</span>
						<p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
							Redacta la explicación comprensible apoyándose en el contexto recuperado, citando actas y folios.
						</p>
					</div>

					<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
						<span class="font-extrabold text-emerald-700 dark:text-emerald-400 block mb-0.5">SQL, Pandas y NumPy</span>
						<p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
							Calculan métricas cuantitativas, totales y porcentajes de forma determinista y verificable; los cálculos no los inventa la IA.
						</p>
					</div>
				</div>
			</div>

			<div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
				<span class="font-mono">Referencia normativa del CSET</span>
				<span class="font-bold text-slate-700 dark:text-slate-300">Comité SENA CSET</span>
			</div>
		</div>
	</div>
</div>
