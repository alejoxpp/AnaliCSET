<script lang="ts">
	import Logo from './Logo.svelte';

	interface Props {
		onNavigate?: (anchor: string) => void;
	}

	let { onNavigate }: Props = $props();

	function handleLinkClick(e: MouseEvent, anchor: string) {
		if (onNavigate) {
			e.preventDefault();
			onNavigate(anchor);
		}
	}
</script>

<footer class="w-full bg-white dark:bg-slate-900 border-t border-[#e6e8ea] dark:border-slate-800 mt-20 transition-colors">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
			<!-- Brand & Mission (2 cols) -->
			<div class="lg:col-span-2 flex flex-col gap-4">
				<Logo size="md" variant="horizontal" />

				<p class="text-xs sm:text-sm text-[#424656] dark:text-slate-300 max-w-md leading-relaxed mt-1">
					Plataforma institucional para consultar, organizar y analizar el histórico del Comité de Evaluación y Seguimiento del SENA CSET. La inteligencia artificial apoya el análisis; las decisiones continúan bajo responsabilidad del Comité.
				</p>

				<div class="flex items-center gap-2 pt-1">
					<span class="px-3 py-1 rounded-md bg-[#f2f4f6] dark:bg-slate-800 border border-[#e6e8ea] dark:border-slate-700 text-[#424656] dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
						Centro CSET
					</span>
					<span class="px-3 py-1 rounded-md bg-[#f2f4f6] dark:bg-slate-800 border border-[#e6e8ea] dark:border-slate-700 text-[#424656] dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
						SENA Regional Santander
					</span>
				</div>
			</div>

			<!-- Navigation Column -->
			<div class="flex flex-col gap-2.5">
				<span class="text-xs font-bold text-[#191c1e] dark:text-slate-100 uppercase tracking-wider">
					Navegación
				</span>
				<a
					href="#inicio"
					onclick={(e) => handleLinkClick(e, 'inicio')}
					class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 transition-colors"
				>
					Inicio
				</a>
				<a
					href="#como-funciona"
					onclick={(e) => handleLinkClick(e, 'como-funciona')}
					class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 transition-colors"
				>
					Cómo Funciona (4 Pasos)
				</a>
				<a
					href="#problema"
					onclick={(e) => handleLinkClick(e, 'problema')}
					class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 transition-colors"
				>
					El Reto del Comité
				</a>
				<a
					href="#vista-previa"
					onclick={(e) => handleLinkClick(e, 'vista-previa')}
					class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 transition-colors"
				>
					Simulación & Casos
				</a>
				<a
					href="#capacidades"
					onclick={(e) => handleLinkClick(e, 'capacidades')}
					class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 transition-colors"
				>
					Capacidades MVP
				</a>
				<a
					href="#confianza"
					onclick={(e) => handleLinkClick(e, 'confianza')}
					class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 transition-colors"
				>
					Gobernanza Institucional
				</a>
				<a
					href="#faq"
					onclick={(e) => handleLinkClick(e, 'faq')}
					class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 transition-colors"
				>
					Preguntas Frecuentes (FAQ)
				</a>
				<a
					href="#equipo"
					onclick={(e) => handleLinkClick(e, 'equipo')}
					class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 transition-colors"
				>
					Equipo CSET
				</a>
			</div>

			<!-- Institutional Column -->
			<div class="flex flex-col gap-3">
				<span class="text-xs font-bold text-[#191c1e] dark:text-slate-100 uppercase tracking-wider">
					Institucional
				</span>
				<span class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 cursor-pointer transition-colors">
					SENA CSET
				</span>
				<span class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 cursor-pointer transition-colors">
					Comité de Evaluación
				</span>
				<span class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 cursor-pointer transition-colors">
					Principios Éticos de IA
				</span>
			</div>

			<!-- Resources Column -->
			<div class="flex flex-col gap-3">
				<span class="text-xs font-bold text-[#191c1e] dark:text-slate-100 uppercase tracking-wider">
					Recursos
				</span>
				<span class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 cursor-pointer transition-colors">
					Repositorio / Código
				</span>
				<span class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 cursor-pointer transition-colors">
					Documentación
				</span>
				<span class="text-xs sm:text-sm text-[#424656] dark:text-slate-400 hover:text-[#0050cb] dark:hover:text-blue-400 cursor-pointer transition-colors">
					Contacto
				</span>
			</div>
		</div>

		<!-- Bottom Legal / Disclaimer -->
		<div class="mt-12 pt-8 border-t border-[#e6e8ea] dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
			<div class="max-w-2xl space-y-1">
				<p class="text-xs text-[#727687] dark:text-slate-400 leading-relaxed">
					Proyecto institucional y académico SENA CSET. La inteligencia artificial apoya el análisis; las decisiones continúan bajo responsabilidad exclusiva del Comité.
				</p>
				<p class="text-[11px] text-[#727687] dark:text-slate-500 leading-relaxed">
					Accesibilidad WCAG 2.1 AA: usa el botón flotante o Alt + A para abrir opciones, Alt + D para temas y Alt + V para lectura por voz.
				</p>
			</div>
			<p class="text-xs text-[#727687] dark:text-slate-400 font-medium shrink-0">
				© 2026 ANALÍ CSET. Todos los derechos reservados.
			</p>
		</div>
	</div>
</footer>
