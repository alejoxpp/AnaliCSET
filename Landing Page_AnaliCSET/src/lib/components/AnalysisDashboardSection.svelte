<script lang="ts">
	import { INITIAL_CASES } from '../data/mockData';
	import type { ExpedienteCase, FilterState } from '../types';
	import { categoriaBadge, estadoBadge } from '../utils/badges';
	import HowItWorksSimulator from './HowItWorksSimulator.svelte';
	import InteractivePlatformFlow from './InteractivePlatformFlow.svelte';
	import {
		RotateCcw,
		Sparkles,
		BarChart3,
		Layers,
		FileText,
		CheckCircle2,
		ExternalLink,
		Gavel
	} from 'lucide-svelte';

	interface Props {
		onOpenDocumentModal?: (caseItem: ExpedienteCase) => void;
	}

	let { onOpenDocumentModal }: Props = $props();

	let activeTab = $state<'conceptual' | 'tablero' | 'flujo'>('conceptual');

	let filters = $state<FilterState>({
		period: 'all',
		category: 'all',
		searchQuery: ''
	});

	let selectedCase = $state<ExpedienteCase>(INITIAL_CASES[0]);

	let filteredCases = $derived(
		INITIAL_CASES.filter((c) => {
			if (filters.period === '2024' && !c.fecha.endsWith('2024')) return false;
			if (filters.period === '2023' && !c.fecha.endsWith('2023')) return false;

			if (filters.category === 'academica' && c.categoria !== 'Académica') return false;
			if (filters.category === 'inasistencia' && c.categoria !== 'Inasistencia') return false;
			if (filters.category === 'convivencia' && c.categoria !== 'Convivencia') return false;

			if (filters.searchQuery.trim() !== '') {
				const query = filters.searchQuery.toLowerCase();
				const match =
					c.code.toLowerCase().includes(query) ||
					c.ficha.includes(query) ||
					c.programa.toLowerCase().includes(query) ||
					c.extracto.toLowerCase().includes(query);
				if (!match) return false;
			}

			return true;
		})
	);

	function handleResetFilters() {
		filters = {
			period: 'all',
			category: 'all',
			searchQuery: ''
		};
	}
</script>

<section class="w-full py-16 lg:py-20 border-t border-[#e6e8ea] dark:border-slate-800" id="vista-previa">
	<!-- Dashboard Header with Demo Badge -->
	<div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
		<div>
			<div class="flex flex-wrap items-center gap-2 mb-2">
				<span
					class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dae1ff]/70 dark:bg-blue-950/60 border border-[#0050cb]/20 dark:border-blue-800/60 text-[#0050cb] dark:text-blue-300 text-xs font-bold uppercase tracking-wider"
				>
					Capítulo 2 · La Experiencia en Acción
				</span>
				<div
					class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d5e3ff] dark:bg-blue-900/40 text-[#001c3b] dark:text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800"
				>
					<span class="w-2 h-2 rounded-full bg-[#0050cb] dark:bg-blue-400 animate-pulse"></span>
					<span>DATOS DE DEMOSTRACIÓN • SIMULACIÓN INTERACTIVA</span>
				</div>
			</div>
			<h2
				class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight"
			>
				Tablero de Análisis CSET
			</h2>
			<p class="text-sm sm:text-base text-[#424656] dark:text-slate-300 mt-1">
				Explora antecedentes consolidados y filtra expedientes para deliberaciones con respaldo empírico.
			</p>
		</div>

		<div class="flex items-center gap-3">
			<button
				type="button"
				onclick={handleResetFilters}
				class="px-3.5 py-2 rounded-xl border border-[#c2c6d8] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-[#495f82] dark:text-slate-300 hover:bg-[#f2f4f6] dark:hover:bg-slate-700 hover:text-[#191c1e] dark:hover:text-white flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
			>
				<RotateCcw class="w-3.5 h-3.5" />
				<span>Reiniciar filtros</span>
			</button>
			<span class="text-xs text-[#727687] dark:text-slate-400 font-mono font-medium"
				>Datos de ejemplo</span
			>
		</div>
	</div>

	<!-- Sub-view switcher combining Flujo Conceptual, Tablero y Simulador -->
	<div
		class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-1.5 bg-slate-100/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700"
	>
		<div class="inline-flex flex-wrap gap-1">
			<button
				type="button"
				onclick={() => (activeTab = 'conceptual')}
				class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer {activeTab ===
				'conceptual'
					? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs'
					: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}"
			>
				<Sparkles class="w-4 h-4 text-[#0050cb] dark:text-blue-400" />
				<span>Representación Conceptual del Flujo</span>
				<span
					class="text-[10px] bg-blue-100 dark:bg-blue-950 text-[#0050cb] dark:text-blue-300 px-1.5 py-0.5 rounded font-mono font-bold"
				>
					Interactivo
				</span>
			</button>

			<button
				type="button"
				onclick={() => (activeTab = 'tablero')}
				class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer {activeTab ===
				'tablero'
					? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs'
					: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}"
			>
				<BarChart3 class="w-4 h-4" />
				<span>Explorador de Antecedentes y Filtros</span>
			</button>

			<button
				type="button"
				onclick={() => (activeTab = 'flujo')}
				class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer {activeTab ===
				'flujo'
					? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
					: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}"
			>
				<Layers class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
				<span>Simulador de Casos Históricos</span>
			</button>
		</div>

		<span
			class="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium pr-2"
		>
			<span>Datos demostrativos para evaluación del Comité</span>
		</span>
	</div>

	{#if activeTab === 'conceptual'}
		<div class="mb-8">
			<InteractivePlatformFlow />
		</div>
	{/if}

	{#if activeTab === 'flujo'}
		<HowItWorksSimulator onApplyToSearch={(q) => {
			filters.searchQuery = q;
			activeTab = 'tablero';
		}} />
	{/if}

	{#if activeTab === 'tablero'}
		<!-- Filter Control Bar -->
		<div
			class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs mb-8"
		>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<!-- Period Filter -->
				<div>
					<label
						for="filter-period"
						class="text-xs font-bold text-[#424656] dark:text-slate-300 uppercase tracking-wider block mb-1.5"
					>
						Periodo Evaluado
					</label>
					<select
						id="filter-period"
						bind:value={filters.period}
						class="w-full h-10 px-3 rounded-xl border border-[#c2c6d8] dark:border-slate-700 bg-[#f7f9fb] dark:bg-slate-800 text-sm text-[#191c1e] dark:text-slate-100 focus:outline-hidden focus:border-[#0050cb] dark:focus:border-blue-400"
					>
						<option value="all">Todos (2023-I a 2024-II)</option>
						<option value="2024">Año 2024 (Reciente)</option>
						<option value="2023">Año 2023 (Histórico)</option>
					</select>
				</div>

				<!-- Category Filter -->
				<div>
					<label
						for="filter-category"
						class="text-xs font-bold text-[#424656] dark:text-slate-300 uppercase tracking-wider block mb-1.5"
					>
						Categoría
					</label>
					<select
						id="filter-category"
						bind:value={filters.category}
						class="w-full h-10 px-3 rounded-xl border border-[#c2c6d8] dark:border-slate-700 bg-[#f7f9fb] dark:bg-slate-800 text-sm text-[#191c1e] dark:text-slate-100 focus:outline-hidden focus:border-[#0050cb] dark:focus:border-blue-400"
					>
						<option value="all">Todas las categorías</option>
						<option value="academica">Faltas Académicas</option>
						<option value="inasistencia">Inasistencias</option>
						<option value="convivencia">Convivencia</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Analytical 4-Panel Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
			<!-- PANEL 1: Interactive Timeline (8 cols) -->
			<div
				class="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between"
			>
				<div
					class="flex items-center justify-between pb-3 mb-2 border-b border-[#e6e8ea] dark:border-slate-800"
				>
					<div>
						<h4 class="text-base font-bold text-[#191c1e] dark:text-slate-100">
							Línea Temporal de Expedientes Procesados
						</h4>
						<span class="text-xs text-[#727687] dark:text-slate-400"
							>Comportamiento mensual de casos presentados al comité</span
						>
					</div>
					<span
						class="text-xs font-mono text-[#0050cb] dark:text-blue-300 font-bold bg-[#dae1ff]/40 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200/50 dark:border-blue-800/50"
					>
						Distribución de ejemplo
					</span>
				</div>

				<!-- SVG Timeline Graph -->
				<div class="w-full h-48 my-2">
					<svg class="w-full h-full" viewBox="0 0 600 160">
						<line
							x1="40"
							y1="130"
							x2="580"
							y2="130"
							stroke="#cbd5e1"
							stroke-width="1"
							class="dark:stroke-slate-700"
						/>
						<line
							x1="40"
							y1="80"
							x2="580"
							y2="80"
							stroke="#e2e8f0"
							stroke-width="1"
							stroke-dasharray="4"
							class="dark:stroke-slate-800"
						/>
						<line
							x1="40"
							y1="30"
							x2="580"
							y2="30"
							stroke="#e2e8f0"
							stroke-width="1"
							stroke-dasharray="4"
							class="dark:stroke-slate-800"
						/>

						<!-- Area Gradient -->
						<defs>
							<linearGradient id="blueAreaGrad" x1="0" y1="0" x2="0" y2="130" gradientUnits="userSpaceOnUse">
								<stop stop-color="#0050cb" stop-opacity="0.25" />
								<stop offset="1" stop-color="#0050cb" stop-opacity="0" />
							</linearGradient>
						</defs>

						<path
							d="M 50 110 Q 120 70, 180 95 T 310 40 T 430 85 T 560 50 L 560 130 L 50 130 Z"
							fill="url(#blueAreaGrad)"
						/>
						<path
							d="M 50 110 Q 120 70, 180 95 T 310 40 T 430 85 T 560 50"
							fill="none"
							stroke="#0050cb"
							class="dark:stroke-blue-400"
							stroke-width="3"
							stroke-linecap="round"
						/>

						<!-- Data points -->
						<circle cx="50" cy="110" r="4.5" fill="#0050cb" class="dark:fill-blue-400" />
						<circle cx="180" cy="95" r="4.5" fill="#0050cb" class="dark:fill-blue-400" />
						<circle cx="310" cy="40" r="6" fill="#008259" class="dark:fill-emerald-400" />
						<circle cx="430" cy="85" r="4.5" fill="#0050cb" class="dark:fill-blue-400" />
						<circle cx="560" cy="50" r="5" fill="#0050cb" class="dark:fill-blue-400" />

						<!-- X Labels -->
						<text x="50" y="148" text-anchor="middle" fill="#64748b" class="dark:fill-slate-400" font-size="11" font-family="Plus Jakarta Sans">
							Feb
						</text>
						<text x="180" y="148" text-anchor="middle" fill="#64748b" class="dark:fill-slate-400" font-size="11" font-family="Plus Jakarta Sans">
							Abr
						</text>
						<text x="310" y="148" text-anchor="middle" fill="#008259" class="dark:fill-emerald-400" font-weight="700" font-size="11" font-family="Plus Jakarta Sans">
							Jun (Pico)
						</text>
						<text x="430" y="148" text-anchor="middle" fill="#64748b" class="dark:fill-slate-400" font-size="11" font-family="Plus Jakarta Sans">
							Ago
						</text>
						<text x="560" y="148" text-anchor="middle" fill="#64748b" class="dark:fill-slate-400" font-size="11" font-family="Plus Jakarta Sans">
							Oct
						</text>
					</svg>
				</div>

				<div
					class="flex items-center justify-between text-xs text-[#727687] dark:text-slate-400 pt-2 border-t border-[#e6e8ea] dark:border-slate-800"
				>
					<span>Fuente: actas de ejemplo</span>
					<span class="text-[#008259] dark:text-emerald-400 font-bold"
						>Curva ilustrativa (ejemplo)</span
					>
				</div>
			</div>

			<!-- PANEL 2: Suggested Measures (4 cols) -->
			<div
				class="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between"
			>
				<div class="pb-3 mb-2 border-b border-[#e6e8ea] dark:border-slate-800">
					<h4 class="text-base font-bold text-[#191c1e] dark:text-slate-100">Medidas sugeridas (ejemplo)</h4>
					<span class="text-xs text-[#727687] dark:text-slate-400">Distribución ilustrativa</span>
				</div>

				<div class="space-y-3.5 py-1">
					<div>
						<div class="flex justify-between text-xs mb-1">
							<span class="font-bold text-[#191c1e] dark:text-slate-200">Plan de Mejoramiento</span>
							<span class="font-mono text-[#0050cb] dark:text-blue-400 font-bold">54% (76)</span>
						</div>
						<div class="w-full h-2 rounded-full bg-[#e6e8ea] dark:bg-slate-800 overflow-hidden">
							<div class="h-full bg-[#0050cb] dark:bg-blue-500 rounded-full" style="width: 54%;"></div>
						</div>
					</div>

					<div>
						<div class="flex justify-between text-xs mb-1">
							<span class="font-bold text-[#191c1e] dark:text-slate-200">Condicionamiento</span>
							<span class="font-mono text-[#495f82] dark:text-indigo-400 font-bold">22% (31)</span>
						</div>
						<div class="w-full h-2 rounded-full bg-[#e6e8ea] dark:bg-slate-800 overflow-hidden">
							<div class="h-full bg-[#495f82] dark:bg-indigo-500 rounded-full" style="width: 22%;"></div>
						</div>
					</div>

					<div>
						<div class="flex justify-between text-xs mb-1">
							<span class="font-bold text-[#191c1e] dark:text-slate-200">Cancelación Registro</span>
							<span class="font-mono text-[#ba1a1a] dark:text-red-400 font-bold">14% (20)</span>
						</div>
						<div class="w-full h-2 rounded-full bg-[#e6e8ea] dark:bg-slate-800 overflow-hidden">
							<div class="h-full bg-[#ba1a1a] dark:bg-red-500 rounded-full" style="width: 14%;"></div>
						</div>
					</div>

					<div>
						<div class="flex justify-between text-xs mb-1">
							<span class="font-bold text-[#191c1e] dark:text-slate-200">Archivo por Justificación</span>
							<span class="font-mono text-[#008259] dark:text-emerald-400 font-bold">10% (14)</span>
						</div>
						<div class="w-full h-2 rounded-full bg-[#e6e8ea] dark:bg-slate-800 overflow-hidden">
							<div class="h-full bg-[#008259] dark:bg-emerald-500 rounded-full" style="width: 10%;"></div>
						</div>
					</div>
				</div>

				<div
					class="p-2.5 rounded-xl bg-[#f2f4f6] dark:bg-slate-800/80 text-xs text-[#424656] dark:text-slate-300 flex items-center gap-2 mt-3 border border-slate-200/60 dark:border-slate-700/60"
				>
					<Gavel class="w-4 h-4 text-[#008259] dark:text-emerald-400 shrink-0" />
					<span class="font-semibold">Criterio pedagógico prioritario sobre sanción</span>
				</div>
			</div>

			<!-- PANEL 3: Interactive Cases Table (8 cols) -->
			<div
				class="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs"
			>
				<div
					class="flex items-center justify-between pb-3 mb-3 border-b border-[#e6e8ea] dark:border-slate-800"
				>
					<div>
						<h4 class="text-base font-bold text-[#191c1e] dark:text-slate-100">
							Casos de ejemplo analizados
						</h4>
						<span class="text-xs text-[#727687] dark:text-slate-400"
							>Expedientes de ejemplo con trazabilidad</span
						>
					</div>
					<span
						class="font-mono text-xs text-[#727687] dark:text-slate-400 bg-[#f2f4f6] dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700"
					>
						Mostrando {filteredCases.length} de {INITIAL_CASES.length}
					</span>
				</div>

				<div class="overflow-x-auto">
					<table class="w-full text-left text-xs sm:text-sm">
						<caption class="sr-only">Casos de ejemplo con trazabilidad</caption>
						<thead
							class="bg-[#f2f4f6] dark:bg-slate-800 text-[#424656] dark:text-slate-300 text-xs uppercase font-bold tracking-wider"
						>
							<tr>
								<th scope="col" class="p-3">Código Caso</th>
								<th scope="col" class="p-3">Fecha</th>
								<th scope="col" class="p-3">Ficha</th>
								<th scope="col" class="p-3">Categoría</th>
								<th scope="col" class="p-3">Fuente Verificada</th>
								<th scope="col" class="p-3">Estado</th>
								<th scope="col" class="p-3"><span class="sr-only">Acción</span></th>
							</tr>
						</thead>
						<tbody class="divide-y divide-[#e6e8ea] dark:divide-slate-800">
							{#each filteredCases as item}
								{@const isSelected = selectedCase.id === item.id}
								<tr
									onclick={() => (selectedCase = item)}
									class="cursor-pointer transition-colors {isSelected
										? 'bg-[#dae1ff]/40 dark:bg-blue-950/60'
										: 'hover:bg-[#f7f9fb] dark:hover:bg-slate-800/60'}"
								>
									<td class="p-3 font-mono font-bold text-[#0050cb] dark:text-blue-400">
										{item.code}
									</td>
									<td class="p-3 font-mono text-[#727687] dark:text-slate-400">{item.fecha}</td>
									<td class="p-3 font-mono text-[#191c1e] dark:text-slate-200">{item.ficha}</td>
									<td class="p-3">
										<span
											class="px-2 py-0.5 rounded text-xs font-semibold {categoriaBadge(item.categoria)}"
										>
											{item.categoria}
										</span>
									</td>
									<td class="p-3 font-mono text-[#0050cb] dark:text-blue-400 hover:underline">
										{item.fuenteDoc}:{item.folio.toLowerCase().replace(' ', '')}
									</td>
									<td class="p-3">
										<span
											class="px-2 py-0.5 rounded text-xs font-semibold {estadoBadge(item.estado)}"
										>
											{item.estado}
										</span>
									</td>
									<td class="p-3">
										<button
											type="button"
											onclick={() => {
												selectedCase = item;
												onOpenDocumentModal && onOpenDocumentModal(item);
											}}
											class="px-3 py-1.5 rounded-lg bg-[#0050cb] hover:bg-[#003da6] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
											aria-label="Ver documento del caso {item.code}"
										>
											Ver →
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<!-- PANEL 4: Folio Viewer Sidebar Panel (4 cols) -->
			<div
				class="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xs flex flex-col justify-between"
			>
				<div>
					<div
						class="flex items-center justify-between pb-3 mb-3 border-b border-[#e6e8ea] dark:border-slate-800"
					>
						<h4 class="text-base font-bold text-[#191c1e] dark:text-slate-100 flex items-center gap-2">
							<FileText class="w-5 h-5 text-[#0050cb] dark:text-blue-400" />
							<span>Visor de Folio</span>
						</h4>
						<span
							class="font-mono text-xs text-[#0050cb] dark:text-blue-300 font-bold bg-[#dae1ff] dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800"
						>
							{selectedCase.code}
						</span>
					</div>

					<div class="space-y-3">
						<div
							class="flex justify-between text-xs text-[#727687] dark:text-slate-400 font-mono"
						>
							<span>{selectedCase.fuenteDoc}</span>
							<span>{selectedCase.fecha}</span>
						</div>

						<div
							class="p-4 rounded-xl bg-[#f2f4f6] dark:bg-slate-800/80 border border-[#e6e8ea] dark:border-slate-700"
						>
							<span
								class="text-xs text-[#495f82] dark:text-blue-300 uppercase font-bold block mb-1"
							>
								{selectedCase.folio}, {selectedCase.parrafo}
							</span>
							<p
								class="text-xs sm:text-sm text-[#191c1e] dark:text-slate-200 italic font-serif leading-relaxed"
							>
								"{selectedCase.extracto}"
							</p>
						</div>

						<div
							class="p-3 rounded-lg bg-[#eceef0] dark:bg-slate-800 text-xs text-[#424656] dark:text-slate-300 flex items-center gap-2 border border-slate-200/60 dark:border-slate-700/60"
						>
							<CheckCircle2 class="w-4 h-4 text-[#008259] dark:text-emerald-400 shrink-0" />
							<span>Integridad de firma (ejemplo)</span>
						</div>

						<div class="pt-2">
							<span
								class="text-xs text-[#727687] dark:text-slate-400 font-semibold block mb-0.5"
								>Artículo Aplicable:</span
							>
							<span
								class="text-xs font-bold text-[#0050cb] dark:text-blue-300 bg-[#dae1ff]/40 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200/50 dark:border-blue-800/50"
							>
								{selectedCase.articuloReglamento}
							</span>
						</div>
					</div>
				</div>

				<button
					type="button"
					onclick={() => onOpenDocumentModal && onOpenDocumentModal(selectedCase)}
					class="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#e6e8ea] dark:bg-slate-800 hover:bg-[#d8dadc] dark:hover:bg-slate-700 text-[#191c1e] dark:text-slate-100 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-2xs border border-slate-300 dark:border-slate-700 cursor-pointer"
				>
					<ExternalLink class="w-4 h-4 text-[#0050cb] dark:text-blue-400" />
					<span>Abrir documento oficial completo</span>
				</button>
			</div>
		</div>
	{/if}
</section>
