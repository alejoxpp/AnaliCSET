<script lang="ts">
	import type { ExpedienteCase } from '../types';
	import { trapTabKey, focusFirst } from '../utils/a11y';
	import { X, Printer, ShieldCheck, FileText } from 'lucide-svelte';

	interface Props {
		caseItem: ExpedienteCase | null;
		onClose: () => void;
	}

	let { caseItem, onClose }: Props = $props();

	let previousFocus: HTMLElement | null = $state(null);

	function autofocusModal(node: HTMLElement) {
		previousFocus = document.activeElement as HTMLElement | null;
		focusFirst(node);
		return {
			destroy() {
				previousFocus?.focus();
			}
		};
	}

	function handlePrint() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}
</script>

{#if caseItem}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
		role="dialog"
		aria-modal="true"
		aria-label="Visor de documento {caseItem.code}"
		tabindex="-1"
		use:autofocusModal
		onkeydown={(e) => {
			if (e.key === 'Escape') onClose();
			else trapTabKey(e, e.currentTarget as HTMLElement);
		}}
	>
		<div
			class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#e6e8ea] dark:border-slate-800"
		>
			<!-- Modal Top Bar -->
			<div
				class="p-4 sm:px-6 bg-[#082361] dark:bg-slate-950 text-white flex items-center justify-between border-b border-white/10"
			>
				<div class="flex items-center gap-3">
					<div class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white">
						<FileText class="w-5 h-5 text-[#6ffbbe]" />
					</div>
					<div>
						<span class="text-xs text-[#dae1ff] font-mono font-medium block">
							EXPEDIENTE INSTITUCIONAL CSET
						</span>
						<h3 class="text-base font-bold text-white flex items-center gap-2">
							<span>{caseItem.fuenteDoc} · Ejemplo</span>
							<span class="text-xs bg-[#0066ff] px-2 py-0.5 rounded font-mono">
								{caseItem.code}
							</span>
						</h3>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={handlePrint}
						class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1 font-semibold cursor-pointer"
						title="Imprimir copia"
					>
						<Printer class="w-4 h-4" />
						<span class="hidden sm:inline">Imprimir</span>
					</button>
					<button
						type="button"
						onclick={onClose}
						class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
						aria-label="Cerrar modal"
					>
						<X class="w-5 h-5" />
					</button>
				</div>
			</div>

			<!-- Modal Body - Official Document Sheet Simulation -->
			<div class="p-6 sm:p-10 overflow-y-auto bg-[#f7f9fb] dark:bg-slate-950 flex-1">
				<div
					class="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-xl shadow-xs border border-[#e6e8ea] dark:border-slate-800 max-w-3xl mx-auto font-serif text-[#191c1e] dark:text-slate-100 text-sm leading-relaxed relative"
				>
					<!-- Watermark -->
					<div
						class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-4 select-none"
					>
						<span class="text-8xl font-black rotate-[-30deg] tracking-widest text-[#0050cb]">
							SENA CSET
						</span>
					</div>

					<!-- Official Header -->
					<div class="border-b-2 border-[#0050cb] pb-6 mb-6 text-center relative z-10">
						<div
							class="text-xs font-sans font-bold uppercase tracking-wider text-[#495f82] dark:text-slate-400 mb-1"
						>
							Servicio Nacional de Aprendizaje - SENA
						</div>
						<div class="text-xs font-sans font-semibold text-[#424656] dark:text-slate-300 mb-1">
							Centro de Servicios Empresariales y Turísticos (CSET)
						</div>
						<h2
							class="text-lg font-sans font-extrabold text-[#082361] dark:text-blue-300 uppercase mt-2"
						>
							Acta del Comité de Evaluación y Seguimiento
						</h2>
						<div class="font-mono text-xs text-[#727687] dark:text-slate-400 mt-1">
							Sesión de ejemplo • Expediente de ejemplo: {caseItem.code}
						</div>
					</div>

					<!-- Meta Table -->
					<div
						class="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans text-xs mb-6 p-4 bg-[#f2f4f6] dark:bg-slate-800/80 rounded-lg border border-[#e6e8ea] dark:border-slate-700 relative z-10"
					>
						<div>
							<span class="text-[#727687] dark:text-slate-400 block font-semibold">Fecha de Sesión:</span>
							<span class="font-bold text-[#191c1e] dark:text-slate-100">{caseItem.fecha}</span>
						</div>
						<div>
							<span class="text-[#727687] dark:text-slate-400 block font-semibold">Ficha Caracterización:</span>
							<span class="font-bold font-mono text-[#0050cb] dark:text-blue-400">{caseItem.ficha}</span>
						</div>
						<div>
							<span class="text-[#727687] dark:text-slate-400 block font-semibold">Referencia Aprendiz:</span>
							<span class="font-bold font-mono text-[#191c1e] dark:text-slate-100">{caseItem.aprendizRef}</span>
						</div>
						<div>
							<span class="text-[#727687] dark:text-slate-400 block font-semibold">Ubicación del Folio:</span>
							<span class="font-bold text-[#008259] dark:text-emerald-400">{caseItem.folio}, {caseItem.parrafo}</span>
						</div>
					</div>

					<!-- Body of the Act -->
					<div class="space-y-4 text-justify leading-relaxed relative z-10">
						<h3
							class="font-sans font-bold text-sm uppercase text-[#082361] dark:text-blue-300 border-b border-[#e6e8ea] dark:border-slate-800 pb-1"
						>
							I. Hechos y Antecedentes
						</h3>
						<p>
							Siendo el día <strong>{caseItem.fecha}</strong>, en las instalaciones del Centro de Servicios Empresariales y Turísticos (CSET) del SENA, se reúne el Comité de Evaluación y Seguimiento con quórum reglamentario para analizar la situación del aprendiz registrado bajo el radicado interno <strong>{caseItem.aprendizRef}</strong>, perteneciente al programa de formación <em>"{caseItem.programa}"</em>.
						</p>

						<div class="p-4 my-3 bg-[#dae1ff]/20 dark:bg-blue-950/40 border-l-4 border-l-[#0050cb] dark:border-l-blue-400 rounded-r-lg italic">
							"{caseItem.extracto}"
						</div>

						{#if caseItem.detallesAdicionales}
							<p>{caseItem.detallesAdicionales}</p>
						{/if}

						<h3
							class="font-sans font-bold text-sm uppercase text-[#082361] dark:text-blue-300 border-b border-[#e6e8ea] dark:border-slate-800 pb-1 pt-3"
						>
							II. Fundamentación Reglamentaria
						</h3>
						<p>
							La conducta se examina a la luz del <strong>Reglamento del Aprendiz SENA</strong>, en particular lo normado en el <strong>{caseItem.articuloReglamento}</strong>, en concordancia con los principios rectores de debido proceso, derecho a la defensa y carácter formativo de la medida recomendada.
						</p>

						<h3
							class="font-sans font-bold text-sm uppercase text-[#082361] dark:text-blue-300 border-b border-[#e6e8ea] dark:border-slate-800 pb-1 pt-3"
						>
							III. Determinación del Comité
						</h3>
						<div class="p-4 bg-[#f2f4f6] dark:bg-slate-800/80 rounded-lg border border-[#e6e8ea] dark:border-slate-700 font-sans">
							<div class="flex items-center justify-between text-xs">
								<span class="text-[#727687] dark:text-slate-400 font-semibold">Medida Adoptada:</span>
								<span class="font-bold text-[#0050cb] dark:text-blue-400 uppercase">{caseItem.medidaSugerida}</span>
							</div>
							<div class="flex items-center justify-between text-xs mt-2 pt-2 border-t border-[#e0e3e5] dark:border-slate-700">
								<span class="text-[#727687] dark:text-slate-400 font-semibold">Estado Procesal:</span>
								<span class="px-2 py-0.5 rounded bg-[#e1ffec] dark:bg-emerald-950/60 text-[#008259] dark:text-emerald-300 font-bold">
									{caseItem.estado}
								</span>
							</div>
						</div>
					</div>

					<!-- Signature & Cryptographic Stamp -->
					<div class="mt-10 pt-6 border-t border-[#e6e8ea] dark:border-slate-800 font-sans text-xs relative z-10">
						<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-full bg-[#008259]/10 text-[#008259] dark:text-emerald-400 flex items-center justify-center shrink-0">
									<ShieldCheck class="w-6 h-6" />
								</div>
								<div>
									<span class="font-bold text-[#191c1e] dark:text-slate-100 block">
										{caseItem.firmaVerificada ? 'Firma Digitalizada Verificada' : 'Firma pendiente de verificación'}
									</span>
									<span class="text-[#727687] dark:text-slate-400 font-mono text-[11px] break-all">
										Hash SHA-256: {caseItem.sha256 ?? 'no registrado'}
									</span>
								</div>
							</div>

							<div class="text-center sm:text-right">
								<span class="block text-[11px] text-[#727687] dark:text-slate-400">Secretaría Técnica del Comité</span>
								<span class="font-bold text-[#082361] dark:text-blue-300">SENA Regional Santander - CSET</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Modal Footer -->
			<div
				class="p-4 sm:px-6 bg-[#f2f4f6] dark:bg-slate-900 border-t border-[#e6e8ea] dark:border-slate-800 flex items-center justify-between text-xs text-[#727687] dark:text-slate-400"
			>
				<span>Documento clasificado para uso institucional CSET</span>
				<button
					type="button"
					onclick={onClose}
					class="px-4 py-2 rounded-xl bg-[#0050cb] dark:bg-blue-600 text-white font-bold hover:bg-[#0066ff] dark:hover:bg-blue-500 transition-colors cursor-pointer"
				>
					Cerrar Visor
				</button>
			</div>
		</div>
	</div>
{/if}
