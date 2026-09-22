<script lang="ts">
	import Logo from './Logo.svelte';
	import type { ScreenView } from '../types';
	import { themeState } from '../theme.svelte';
	import {
		Menu,
		X,
		ArrowUpRight,
		ChevronRight,
		ChevronDown,
		Sparkles,
		BarChart3,
		HelpCircle,
		Layers,
		Scale,
		BookOpen,
		Users,
		Compass,
		ArrowRight,
		Sun,
		Moon,
		ArrowLeft
	} from 'lucide-svelte';

	interface Props {
		currentScreen?: ScreenView;
		onNavigate: (screen: ScreenView, anchor?: string) => void;
	}

	let { currentScreen = 'inicio', onNavigate }: Props = $props();

	let mobileMenuOpen = $state(false);
	let moreDropdownOpen = $state(false);
	let activeSection = $state('inicio');
	let scrollProgress = $state(0);
	let isScrolled = $state(false);

	$effect(() => {
		if (typeof window === 'undefined') return;

		const handleScroll = () => {
			const scrollY = window.scrollY;
			isScrolled = scrollY > 20;

			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

			if (currentScreen !== 'inicio') {
				activeSection = currentScreen;
				return;
			}

			const sections = [
				{ id: 'equipo', offset: 300 },
				{ id: 'faq', offset: 300 },
				{ id: 'confianza', offset: 300 },
				{ id: 'capacidades', offset: 300 },
				{ id: 'vista-previa', offset: 300 },
				{ id: 'como-funciona', offset: 300 },
				{ id: 'problema', offset: 300 },
				{ id: 'inicio', offset: 0 }
			];

			for (const sec of sections) {
				const el = document.getElementById(sec.id);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= sec.offset && rect.bottom >= 100) {
						activeSection = sec.id;
						return;
					}
				}
			}

			if (scrollY < 200) {
				activeSection = 'inicio';
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	});

	function handleNavClick(screen: ScreenView, anchor?: string) {
		onNavigate(screen, anchor);
		mobileMenuOpen = false;
		moreDropdownOpen = false;
		if (anchor) {
			activeSection = anchor;
		} else {
			activeSection = screen;
		}
	}

	function isCurrent(anchor: string) {
		return currentScreen === 'inicio' && activeSection === anchor;
	}
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-200 {isScrolled
		? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs border-b border-slate-200/90 dark:border-slate-800'
		: 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm border-b border-slate-200/70 dark:border-slate-800'}"
>
	<!-- Subtle dual-color institutional top line -->
	<div class="h-0.5 w-full bg-gradient-to-r from-[#0050cb] via-[#008259] to-[#00d2ff]"></div>

	<div class="h-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
		<!-- Brand identity -->
		<div class="flex items-center gap-3 shrink-0">
			<button
				type="button"
				onclick={() => handleNavClick('inicio', 'inicio')}
				class="flex items-center text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0050cb] rounded-lg p-1 transition-opacity hover:opacity-95 cursor-pointer"
				aria-label="Ir al inicio de ANALÍ CSET"
			>
				<Logo size="sm" variant="horizontal" />
				<div class="hidden sm:flex flex-col ml-2.5 pl-2.5 border-l border-slate-200 dark:border-slate-700">
					<span class="text-[10px] font-bold tracking-wider text-[#0050cb] dark:text-blue-400 uppercase leading-none">
						SENA Santander
					</span>
					<span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-tight">
						Centro CSET
					</span>
				</div>
			</button>
		</div>

		<!-- Desktop Navigation -->
		{#if currentScreen === 'inicio'}
			<nav
				aria-label="Navegación principal"
				class="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200/80 dark:border-slate-700"
			>
				<button
					type="button"
					onclick={() => handleNavClick('inicio', 'inicio')}
					class="px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer {isCurrent(
						'inicio'
					)
						? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs font-bold'
						: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'}"
				>
					Inicio
				</button>

				<button
					type="button"
					onclick={() => handleNavClick('inicio', 'como-funciona')}
					class="px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer {isCurrent(
						'como-funciona'
					)
						? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs font-bold'
						: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'}"
				>
					Cómo Funciona
				</button>

				<button
					type="button"
					onclick={() => handleNavClick('inicio', 'vista-previa')}
					class="px-3 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 cursor-pointer {isCurrent(
						'vista-previa'
					)
						? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs font-bold'
						: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'}"
				>
					<Sparkles class="w-3.5 h-3.5 text-[#0050cb] dark:text-blue-400" />
					<span>Simulación & Casos</span>
				</button>

				<button
					type="button"
					onclick={() => handleNavClick('inicio', 'capacidades')}
					class="px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer {isCurrent(
						'capacidades'
					)
						? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs font-bold'
						: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'}"
				>
					Capacidades
				</button>

				<button
					type="button"
					onclick={() => handleNavClick('inicio', 'confianza')}
					class="px-3 py-1.5 text-xs font-semibold rounded-full transition-all hidden lg:inline-flex cursor-pointer {isCurrent(
						'confianza'
					)
						? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs font-bold'
						: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'}"
				>
					Gobernanza
				</button>

				<button
					type="button"
					onclick={() => handleNavClick('inicio', 'faq')}
					class="px-3 py-1.5 text-xs font-semibold rounded-full transition-all hidden lg:inline-flex cursor-pointer {isCurrent(
						'faq'
					)
						? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs font-bold'
						: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'}"
				>
					FAQ
				</button>

				<!-- "Más" Dropdown for Medium Screens -->
				<div class="relative lg:hidden">
					<button
						type="button"
						onclick={() => (moreDropdownOpen = !moreDropdownOpen)}
						class="px-2.5 py-1.5 text-xs font-semibold rounded-full transition-all inline-flex items-center gap-1 cursor-pointer {moreDropdownOpen ||
						isCurrent('confianza') ||
						isCurrent('faq') ||
						isCurrent('equipo')
							? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs font-bold'
							: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'}"
						aria-expanded={moreDropdownOpen}
						aria-haspopup="true"
					>
						<span>Más</span>
						<ChevronDown
							class="w-3.5 h-3.5 transition-transform {moreDropdownOpen ? 'rotate-180' : ''}"
						/>
					</button>

					{#if moreDropdownOpen}
						<div
							class="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
							role="menu"
						>
							<div
								class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1"
							>
								Secciones Institucionales
							</div>

							<button
								type="button"
								role="menuitem"
								onclick={() => handleNavClick('inicio', 'confianza')}
								class="w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer {isCurrent(
									'confianza'
								)
									? 'bg-blue-50 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-400 font-bold'
									: 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}"
							>
								<Scale class="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
								<span>Cap. 4: Gobernanza y Ética</span>
							</button>

							<button
								type="button"
								role="menuitem"
								onclick={() => handleNavClick('inicio', 'faq')}
								class="w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer {isCurrent(
									'faq'
								)
									? 'bg-blue-50 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-400 font-bold'
									: 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}"
							>
								<HelpCircle class="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
								<span>Cap. 5: Preguntas (FAQ)</span>
							</button>

							<button
								type="button"
								role="menuitem"
								onclick={() => handleNavClick('inicio', 'equipo')}
								class="w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer {isCurrent(
									'equipo'
								)
									? 'bg-blue-50 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-400 font-bold'
									: 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}"
							>
								<Users class="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
								<span>Cap. 6: Equipo de Desarrollo</span>
							</button>
						</div>
					{/if}
				</div>
			</nav>
		{:else}
			<!-- Contextual Nav Bar when outside landing page (on Asistente IA or Tablero) -->
			<div class="hidden md:flex items-center gap-3">
				<button
					type="button"
					onclick={() => handleNavClick('inicio')}
					class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
					title="Regresar a la página principal"
				>
					<ArrowLeft class="w-3.5 h-3.5" />
					<span>Volver a la Landing</span>
				</button>

				<div
					class="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-full border border-slate-200/80 dark:border-slate-700 text-xs"
				>
					<button
						type="button"
						onclick={() => handleNavClick('tablero')}
						class="px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer {currentScreen ===
						'tablero'
							? 'bg-white dark:bg-slate-900 text-[#0050cb] dark:text-blue-400 shadow-xs'
							: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}"
					>
						<BarChart3 class="w-3.5 h-3.5" />
						<span>Tablero CSET</span>
					</button>
				</div>
			</div>
		{/if}

		<!-- Right Area: Tablero switcher and Theme Toggle -->
		<div class="flex items-center gap-2 sm:gap-3 shrink-0">
			<!-- Tablero CSET Button -->
			<button
				type="button"
				onclick={() => handleNavClick('tablero')}
				class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer {currentScreen ===
				'tablero'
					? 'bg-blue-50 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-300 border-blue-300 dark:border-blue-700 shadow-xs'
					: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'}"
				title="Ir al Tablero de Expedientes CSET"
			>
				<BarChart3 class="w-3.5 h-3.5 text-[#0050cb] dark:text-blue-400" />
				<span>Tablero CSET</span>
			</button>

			<!-- Return to Landing Button when on internal screen (mobile visible) -->
			{#if currentScreen !== 'inicio'}
				<button
					type="button"
					onclick={() => handleNavClick('inicio')}
					class="md:hidden px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer"
				>
					<ArrowLeft class="w-3 h-3" />
					<span>Landing</span>
				</button>
			{/if}

			<!-- Theme Toggle Button (Oscuro / Claro / Contraste) -->
			<button
				type="button"
				onclick={() => themeState.toggle()}
				class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#0050cb] dark:hover:text-blue-400 transition-all shadow-2xs focus:outline-hidden cursor-pointer"
				aria-label={themeState.current === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
				title={themeState.current === 'dark' ? 'Modo Claro (Alt + D)' : 'Modo Oscuro (Alt + D)'}
			>
				{#if themeState.current === 'dark'}
					<Sun class="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
				{:else}
					<Moon class="w-4 h-4 text-slate-600 transition-transform hover:-rotate-12" />
				{/if}
			</button>

			<!-- Mobile Menu Toggle Button -->
			<button
				type="button"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0050cb] cursor-pointer"
				aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
				aria-expanded={mobileMenuOpen}
			>
				{#if mobileMenuOpen}
					<X class="w-5 h-5 text-slate-900 dark:text-white" />
				{:else}
					<Menu class="w-5 h-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Subtle Scroll Reading Progress Bar (when on Inicio landing page) -->
	{#if currentScreen === 'inicio' && scrollProgress > 0}
		<div class="w-full h-0.5 bg-slate-100 dark:bg-slate-800 overflow-hidden">
			<div
				class="h-full bg-[#0050cb] dark:bg-blue-500 transition-all duration-150 ease-out"
				style="width: {scrollProgress}%;"
			></div>
		</div>
	{/if}

	<!-- Enhanced Mobile Drawer / Menu Overlay -->
	{#if mobileMenuOpen}
		<div
			class="md:hidden bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-5 space-y-4 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-150"
		>
			<!-- Institutional Header within Mobile Menu -->
			<div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
				<div class="flex items-center gap-2.5">
					<Logo size="sm" variant="icon" />
					<div>
						<span class="text-xs font-bold text-slate-900 dark:text-slate-100 block leading-tight"
							>ANALÍ CSET · SENA</span
						>
						<span class="text-[10px] text-slate-500 dark:text-slate-400"
							>Comité de Evaluación y Seguimiento</span
						>
					</div>
				</div>

				<!-- Mobile Theme Toggle + Badge -->
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => themeState.toggle()}
						class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
						aria-label="Alternar modo oscuro y claro"
					>
						{#if themeState.current === 'dark'}
							<Sun class="w-4 h-4 text-amber-400" />
						{:else}
							<Moon class="w-4 h-4 text-slate-600" />
						{/if}
					</button>
					<span
						class="text-[10px] font-mono bg-blue-50 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800"
					>
						MVP 2026
					</span>
				</div>
			</div>

			<!-- Workspace Quick Jump (Tablero y Asistente) -->
			<div class="space-y-1.5">
				<span
					class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-1"
				>
					Espacios de Trabajo CSET
				</span>
				<div class="grid grid-cols-1 gap-2">
					<button
						type="button"
						onclick={() => handleNavClick('tablero')}
						class="p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1 cursor-pointer {currentScreen ===
						'tablero'
							? 'bg-blue-50 dark:bg-blue-950/60 border-[#0050cb] dark:border-blue-500 text-[#0050cb] dark:text-blue-300 font-bold'
							: 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}"
					>
						<div class="flex items-center justify-between">
							<BarChart3 class="w-4 h-4 text-[#0050cb] dark:text-blue-400" />
							<ArrowUpRight class="w-3.5 h-3.5 text-slate-400" />
						</div>
						<span class="text-xs font-bold">Tablero CSET</span>
						<span class="text-[10px] text-slate-500 dark:text-slate-400 font-normal"
							>Expedientes y casos</span
						>
					</button>
				</div>
			</div>

			<!-- Chapters List -->
			<div class="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
				<span
					class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-1 mb-1"
				>
					Capítulos de la Propuesta
				</span>

				{#each [
					{ id: 'inicio', title: 'Inicio · Del Histórico a Decisiones', icon: Compass },
					{ id: 'como-funciona', title: 'Cómo Funciona (4 Pasos)', icon: ArrowRight },
					{ id: 'problema', title: 'Capítulo 1: El Reto del Comité CSET', icon: BookOpen },
					{ id: 'vista-previa', title: 'Capítulo 2: Simulación y Casos', icon: Layers },
					{ id: 'capacidades', title: 'Capítulo 3: Capacidades del MVP', icon: Sparkles },
					{ id: 'confianza', title: 'Capítulo 4: Gobernanza y Principio Humano', icon: Scale },
					{ id: 'faq', title: 'Capítulo 5: Preguntas Frecuentes (FAQ)', icon: HelpCircle },
					{ id: 'equipo', title: 'Capítulo 6: El Equipo Detrás', icon: Users }
				] as item}
					{@const Icon = item.icon}
					{@const active = isCurrent(item.id)}

					<button
						type="button"
						onclick={() => handleNavClick('inicio', item.id)}
						class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer {active
							? 'bg-blue-50 dark:bg-blue-950/60 text-[#0050cb] dark:text-blue-300 font-bold'
							: 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}"
					>
						<div class="flex items-center gap-2.5">
							<Icon
								class="w-4 h-4 {active
									? 'text-[#0050cb] dark:text-blue-400'
									: 'text-slate-400 dark:text-slate-500'}"
							/>
							<span>{item.title}</span>
						</div>
						<ChevronRight class="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
					</button>
				{/each}
			</div>

			<!-- Footer Callout -->
			<div
				class="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between"
			>
				<div class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
					<span class="font-semibold text-slate-800 dark:text-slate-200 text-[11px]"
						>SENA Regional Santander</span
					>
				</div>
				<button
					type="button"
					onclick={() => handleNavClick('tablero')}
					class="px-3 py-1.5 rounded-lg bg-[#0050cb] hover:bg-[#003da6] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
				>
					Explorar Tablero
				</button>
			</div>
		</div>
	{/if}
</header>
