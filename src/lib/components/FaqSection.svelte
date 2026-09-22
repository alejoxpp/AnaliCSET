<script lang="ts">
	import { FAQS } from '../data/mockData';
	import {
		HelpCircle,
		ChevronDown,
		ChevronUp,
		FileText,
		ShieldCheck,
		Cpu,
		Users,
		Lock,
		Sparkles,
		ArrowRight
	} from 'lucide-svelte';

	const FAQ_ICONS: Record<string, any> = {
		'faq-1': HelpCircle,
		'faq-2': FileText,
		'faq-3': Sparkles,
		'faq-4': Cpu,
		'faq-5': Users,
		'faq-6': Lock,
		'faq-7': ShieldCheck
	};

	let openId = $state<string>('faq-1');
	let selectedCategory = $state<string>('Todas');

	const categories = ['Todas', 'General', 'Documentos', 'IA y Modelos', 'Seguridad'];

	let filteredFaqs = $derived(
		selectedCategory === 'Todas' ? FAQS : FAQS.filter((f) => f.category === selectedCategory)
	);

	function toggleFaq(id: string) {
		openId = openId === id ? '' : id;
	}
</script>

<section class="w-full py-16 lg:py-20 border-t border-[#e6e8ea] dark:border-slate-800" id="faq">
	<!-- Header -->
	<div class="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
		<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-[#0050cb] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
			<HelpCircle class="w-4 h-4" />
			<span>Centro de Respuestas Institucionales</span>
		</div>
		<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] dark:text-slate-100 tracking-tight">
			Preguntas Frecuentes sobre ANALÍ CSET
		</h2>
		<p class="text-sm sm:text-base text-[#424656] dark:text-slate-300 mt-3 leading-relaxed">
			Claridad técnica e institucional sobre el procesamiento de archivos PDF/DOCX/XLSX, el motor RAG fundamentado en actas, la gobernanza ética y la soberanía de los datos en el SENA CSET.
		</p>
	</div>

	<!-- Category Filter Pills -->
	<div class="flex flex-wrap items-center justify-center gap-2 mb-8">
		{#each categories as cat}
			<button
				type="button"
				onclick={() => (selectedCategory = cat)}
				class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer {selectedCategory === cat
					? 'bg-[#0050cb] dark:bg-blue-600 text-white shadow-xs'
					: 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}"
			>
				{cat}
			</button>
		{/each}
	</div>

	<!-- Accordion List -->
	<div class="max-w-3xl mx-auto space-y-3">
		{#each filteredFaqs as faq}
			{@const isOpen = openId === faq.id}
			{@const Icon = FAQ_ICONS[faq.id] ?? HelpCircle}
			<div
				class="rounded-2xl border transition-all overflow-hidden {isOpen
					? 'bg-white dark:bg-slate-900 border-[#0050cb]/40 dark:border-blue-500/50 shadow-sm ring-1 ring-[#0050cb]/10 dark:ring-blue-500/20'
					: 'bg-white/80 dark:bg-slate-900/80 border-[#e6e8ea] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}"
			>
				<button
					type="button"
					onclick={() => toggleFaq(faq.id)}
					class="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-hidden cursor-pointer"
					aria-expanded={isOpen}
				>
					<div class="flex items-start gap-3.5">
						<div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 {isOpen
							? 'bg-[#dae1ff] dark:bg-blue-950/80 text-[#0050cb] dark:text-blue-300'
							: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}">
							<Icon class="w-4 h-4" />
						</div>
						<div>
							<span class="inline-block text-[10px] font-bold text-[#0050cb] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md mb-1.5 uppercase tracking-wide">
								{faq.badge}
							</span>
							<h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
								{faq.question}
							</h3>
						</div>
					</div>

					<div class="p-1 rounded-lg text-slate-400 dark:text-slate-500 shrink-0 mt-1">
						{#if isOpen}
							<ChevronUp class="w-5 h-5 text-[#0050cb] dark:text-blue-400" />
						{:else}
							<ChevronDown class="w-5 h-5" />
						{/if}
					</div>
				</button>

				{#if isOpen}
					<div class="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 animate-in fade-in duration-200">
						<p>{faq.answer}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Helpful Contact Box -->
	<div class="max-w-3xl mx-auto mt-10 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-900/80 border border-blue-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
		<div>
			<h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
				¿Tienes otra inquietud sobre la implementación institucional?
			</h4>
			<p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
				El equipo técnico del semillero y los voceros del CSET pueden brindarte más información sobre el proyecto.
			</p>
		</div>
		<a
			href="#equipo"
			class="px-4 py-2 rounded-xl bg-[#0050cb] dark:bg-blue-600 text-white text-xs font-bold hover:bg-[#003da6] dark:hover:bg-blue-500 transition-colors shrink-0 flex items-center gap-1.5 shadow-2xs"
		>
			<span>Conocer al Equipo</span>
			<ArrowRight class="w-3.5 h-3.5" />
		</a>
	</div>
</section>
