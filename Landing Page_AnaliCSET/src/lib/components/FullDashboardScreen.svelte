<script lang="ts">
	import { scrollToAnchor } from '../utils/scroll';
	import {
		ArrowLeft,
		Construction,
		ShieldAlert,
		Lock,
		FileSpreadsheet,
		Cpu,
		ChevronDown,
		ChevronUp,
		Sparkles,
		Terminal
	} from 'lucide-svelte';

	interface Props {
		onBack: () => void;
	}

	let { onBack }: Props = $props();

	let showTechnicalDetails = $state(false);

	function handleGoToPreview() {
		onBack();
		if (typeof window !== 'undefined') {
			setTimeout(() => scrollToAnchor('vista-previa'), 100);
		}
	}
</script>

<div class="w-full min-h-[85vh] py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center animate-in fade-in duration-300">
	<!-- Top Back Navigation -->
	<div class="mb-6">
		<button
			type="button"
			onclick={onBack}
			class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-[#c2c6d8] dark:border-slate-700 hover:bg-[#f2f4f6] dark:hover:bg-slate-700 text-[#424656] dark:text-slate-300 text-xs font-bold transition-colors shadow-2xs group cursor-pointer"
		>
			<ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
			<span>Volver al portal principal</span>
		</button>
	</div>

	<!-- Main Beautiful Error / Under Construction Card -->
	<div class="relative rounded-3xl bg-white dark:bg-slate-900 border border-[#e6e8ea] dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10 text-center">
		<!-- Decorative Top Accent Bar -->
		<div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-[#0050cb] to-emerald-500"></div>

		<!-- Status Badge -->
		<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
			<span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
			<span>Aviso del Sistema • Módulo en Construcción</span>
		</div>

		<!-- Elegant Visual Icon Container -->
		<div class="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center mb-6 shadow-inner">
			<div class="absolute inset-0 rounded-3xl border border-[#0050cb]/15 scale-110 pointer-events-none"></div>
			<Construction class="w-10 h-10 sm:w-12 sm:h-12 text-[#0050cb] dark:text-blue-400 animate-pulse" />
		</div>

		<!-- Main Headline -->
		<h1 class="text-2xl sm:text-3xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight mb-3">
			El Tablero Operativo aún no está en funcionamiento
		</h1>

		<!-- Explanatory Paragraph -->
		<p class="text-sm sm:text-base text-[#424656] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
			Esta sección corresponde a la <strong class="text-slate-900 dark:text-white">consola productiva con inicio de sesión institucional</strong> donde el Comité CSET gestionará expedientes en tiempo real. Como la plataforma se encuentra en fase de diseño arquitectónico y prototipado, el acceso autenticado y la base de datos centralizada están en desarrollo.
		</p>

		<!-- Development Roadmap Cards -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto text-left mb-8">
			<div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
				<div class="w-8 h-8 rounded-lg bg-blue-100/70 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
					<Lock class="w-4 h-4" />
				</div>
				<div>
					<h4 class="text-xs font-bold text-slate-900 dark:text-slate-100">1. Autenticación Institucional (Login)</h4>
					<p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
						Integración de roles y permisos para coordinadores, instructores y secretaría técnica.
					</p>
				</div>
			</div>

			<div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
				<div class="w-8 h-8 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
					<FileSpreadsheet class="w-4 h-4" />
				</div>
				<div>
					<h4 class="text-xs font-bold text-slate-900 dark:text-slate-100">2. Ingesta Digital (PDF, DOCX, XLSX)</h4>
					<p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
						Tubería de extracción de texto nativo sin OCR, indexando actas y matrices de caracterización.
					</p>
				</div>
			</div>

			<div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
				<div class="w-8 h-8 rounded-lg bg-purple-100/70 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
					<Cpu class="w-4 h-4" />
				</div>
				<div>
					<h4 class="text-xs font-bold text-slate-900 dark:text-slate-100">3. RAG Estricto & Scikit-Learn</h4>
					<p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
						El modelo LLM debe acotarse a los documentos; lo predictivo (ML) es fase posterior.
					</p>
				</div>
			</div>

			<div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
				<div class="w-8 h-8 rounded-lg bg-amber-100/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
					<ShieldAlert class="w-4 h-4" />
				</div>
				<div>
					<h4 class="text-xs font-bold text-slate-900 dark:text-slate-100">4. Cadena de custodia (registro de integridad)</h4>
					<p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
						Registro de integridad de folios para apoyar la trazabilidad en auditorías.
					</p>
				</div>
			</div>
		</div>

		<!-- Primary Call to Action Buttons -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-3">
			<button
				type="button"
				onclick={onBack}
				class="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0050cb] hover:bg-[#003da6] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
			>
				<ArrowLeft class="w-4 h-4" />
				<span>Volver al Portal Informativo</span>
			</button>

			<button
				type="button"
				onclick={handleGoToPreview}
				class="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
			>
				<Sparkles class="w-4 h-4 text-[#0050cb] dark:text-blue-400" />
				<span>Ver Cómo Funcionará el Flujo</span>
			</button>
		</div>

		<!-- Expandable Technical State Inspector -->
		<div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 max-w-xl mx-auto">
			<button
				type="button"
				onclick={() => (showTechnicalDetails = !showTechnicalDetails)}
				class="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium cursor-pointer"
			>
				<Terminal class="w-3.5 h-3.5" />
				<span>Detalles técnicos del estado de la plataforma</span>
				{#if showTechnicalDetails}
					<ChevronUp class="w-3.5 h-3.5" />
				{:else}
					<ChevronDown class="w-3.5 h-3.5" />
				{/if}
			</button>

			{#if showTechnicalDetails}
				<div class="mt-3 p-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-left font-mono text-[11px] text-slate-300 space-y-1.5 animate-in fade-in duration-200">
					<div class="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5">
						<span>ANALÍ-CSET // DIAGNÓSTICO_SISTEMA</span>
						<span class="text-amber-400 font-bold">HTTP 503 • EN_DESARROLLO</span>
					</div>
					<p class="text-emerald-400 pt-1">
						✔ Arquitectura conceptual y narrativa: COMPLETADA
					</p>
					<p class="text-emerald-400">
						✔ Interfaz de presentación y prototipado visual: APROBADA
					</p>
					<p class="text-amber-300">
						⚡ Módulo de Autenticación (Login SENA): EN_PROCESO_DE_CONFIGURACIÓN
					</p>
					<p class="text-amber-300">
						⚡ Tubería RAG (PDF, DOCX, XLSX) & Scikit-Learn: EN_FASE_DE_ENTRENAMIENTO
					</p>
					<p class="text-slate-400 pt-1">
						# La consola operativa real se activará al concluir la integración de APIs seguras.
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
