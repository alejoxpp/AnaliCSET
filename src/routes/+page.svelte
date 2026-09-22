<script lang="ts">
	import type { ScreenView, ExpedienteCase } from '$lib/types';
	import { scrollToAnchor, scrollToTop } from '$lib/utils/scroll';
	import Header from '$lib/components/Header.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import HowItWorksSection from '$lib/components/HowItWorksSection.svelte';
	import ProblemSection from '$lib/components/ProblemSection.svelte';
	import AnalysisDashboardSection from '$lib/components/AnalysisDashboardSection.svelte';
	import CapabilitiesSection from '$lib/components/CapabilitiesSection.svelte';
	import ConfidenceSection from '$lib/components/ConfidenceSection.svelte';
	import FaqSection from '$lib/components/FaqSection.svelte';
	import TeamSection from '$lib/components/TeamSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FullDashboardScreen from '$lib/components/FullDashboardScreen.svelte';
	import SearchAssistantScreen from '$lib/components/SearchAssistantScreen.svelte';
	import OfficialDocumentModal from '$lib/components/OfficialDocumentModal.svelte';
	import AccessibilityWidget from '$lib/components/AccessibilityWidget.svelte';

	let currentScreen = $state<ScreenView>('inicio');
	let selectedCaseModal = $state<ExpedienteCase | null>(null);
	let searchQuery = $state<string>('Faltas académicas reiteradas y planes de mejoramiento');

	function handleNavigate(screen: ScreenView, anchor?: string) {
		currentScreen = screen;
		if (typeof window !== 'undefined') {
			if (anchor && screen === 'inicio') {
				setTimeout(() => scrollToAnchor(anchor), 50);
			} else {
				scrollToTop();
			}
		}
	}

	function handleOpenQueryFromHero(queryText: string) {
		searchQuery = queryText;
		currentScreen = 'asistente';
		scrollToTop();
	}

	function handleOpenCaseModal(caseItem: ExpedienteCase) {
		selectedCaseModal = caseItem;
	}
</script>

<svelte:head>
	<title>ANALÍ CSET • Del histórico del CSET a decisiones con evidencia</title>
</svelte:head>

<!-- Institutional Top Navigation Header -->
<Header
	{currentScreen}
	onNavigate={handleNavigate}
/>

<!-- Main Screen Content Area (offset by header height) -->
<main id="contenido" tabindex="-1" class="flex-1 pt-16 focus:outline-none">
	{#if currentScreen === 'inicio'}
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Hero with core identity & mission -->
			<HeroSection
				onExplore={() => handleNavigate('tablero')}
				onLearnMore={() => handleNavigate('inicio', 'como-funciona')}
				onOpenQuery={handleOpenQueryFromHero}
			/>

			<!-- Cómo Funciona: 4 pasos claros + arquitectura técnica discreta -->
			<HowItWorksSection />

			<!-- Capítulo 1: Problem & Challenge Section (El Antes vs El Después) -->
			<ProblemSection
				onExploreArchitecture={() => handleNavigate('inicio', 'vista-previa')}
			/>

			<!-- Capítulo 2: Interactive CSET Analysis Preview Dashboard (Combined with Flow Demonstration) -->
			<AnalysisDashboardSection
				onOpenDocumentModal={handleOpenCaseModal}
			/>

			<!-- Capítulo 3: Capacidades del MVP -->
			<CapabilitiesSection />

			<!-- Capítulo 4: Governance & Confidence Quote Section (Human-in-the-Loop) -->
			<ConfidenceSection />

			<!-- Capítulo 5: FAQ & Common Questions -->
			<FaqSection />

			<!-- Capítulo 7: Team Behind ANALÍ CSET -->
			<TeamSection />
		</div>
	{:else if currentScreen === 'tablero'}
		<FullDashboardScreen
			onBack={() => handleNavigate('inicio')}
		/>
	{:else if currentScreen === 'asistente'}
		<SearchAssistantScreen
			onBack={() => handleNavigate('inicio')}
			onOpenDocModal={handleOpenCaseModal}
			initialQuery={searchQuery}
		/>
	{/if}
</main>

<!-- Institutional Footer -->
<Footer onNavigate={(anchor) => handleNavigate('inicio', anchor)} />

<!-- Universal Accessibility Controls -->
<AccessibilityWidget />

<!-- Full Document Inspector Modal -->
{#if selectedCaseModal}
	<OfficialDocumentModal
		caseItem={selectedCaseModal}
		onClose={() => (selectedCaseModal = null)}
	/>
{/if}
