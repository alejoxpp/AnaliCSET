<script>
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	const pasos = [
		{
			titulo: 'Se cargan las actas como están',
			texto:
				'Las actas en PDF y sus anexos en Excel entran sin reescribir nada ni cambiar la forma en que el comité trabaja hoy.'
		},
		{
			titulo: 'Cada caso queda estructurado',
			texto:
				'Aprendiz, ficha, tipo de caso, hechos y medida acordada dejan de ser párrafos sueltos y pasan a ser datos consultables.'
		},
		{
			titulo: 'Los patrones salen a la superficie',
			texto:
				'El análisis señala lo que se repite entre fichas, jornadas y periodos: reincidencias, picos de deserción, correlaciones.',
			ia: true
		}
	];
</script>

<svelte:head>
	<title>AnaliCSET · Análisis del histórico del CSET</title>
	<meta
		name="description"
		content="AnaliCSET analiza el histórico del Comité de Evaluación y Seguimiento del SENA y revela los patrones que se repiten entre fichas y periodos."
	/>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-neutral-950">
	<!-- ═══ Barra superior ═══ -->
	<header class="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
		<div class="flex items-center gap-2.5">
			<div
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1 ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800"
			>
				<img src="/logo-icon.png" alt="" class="h-full w-full object-contain" />
			</div>
			<div class="leading-tight">
				<p class="font-heading text-sm font-bold text-primary-900 dark:text-neutral-50">AnaliCSET</p>
				<p class="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">SENA · CSET</p>
			</div>
		</div>

		<div class="flex items-center gap-3">
			<ThemeToggle />
			<a
				href="/login"
				class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-950"
			>
				Iniciar sesión
			</a>
		</div>
	</header>

	<!-- ═══ Héroe ═══ -->
	<section class="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-16 sm:pb-24">
		<div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
			<div class="animate-fade-in-up">
				<h1
					class="font-heading text-4xl leading-[1.08] font-extrabold tracking-tight text-primary-900 sm:text-5xl lg:text-[3.4rem] dark:text-neutral-50"
				>
					Años de actas del CSET, por fin legibles.
				</h1>

				<p
					class="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300"
				>
					AnaliCSET lee las actas del Comité de Evaluación y Seguimiento que hoy viven en PDF y
					Excel, estructura cada caso y muestra los patrones que se repiten entre fichas, jornadas y
					periodos.
				</p>

				<div class="mt-8 flex flex-wrap items-center gap-4">
					<a
						href="/login"
						class="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-950"
					>
						Iniciar sesión
					</a>
					<p class="text-xs text-neutral-500 dark:text-neutral-400">
						Acceso exclusivo para personal autorizado del SENA.
					</p>
				</div>
			</div>

			<!-- Pila de actas: el artefacto real del comité, con una que revela
			     un patrón. En móvil se muestra solo la tarjeta frontal. -->
			<div class="relative h-[300px] sm:h-[340px]" aria-hidden="true">
				<!-- Acta de atrás -->
				<div
					class="animate-fade-in absolute top-0 right-4 hidden w-[74%] rotate-[4deg] rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:block dark:border-neutral-800 dark:bg-neutral-900"
					style="animation-delay: 220ms"
				>
					<p class="font-heading text-xs font-bold text-neutral-400 dark:text-neutral-500">
						CSET-2026-254
					</p>
					<div class="mt-3 space-y-2">
						<div class="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
						<div class="h-2 w-4/5 rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
						<div class="h-2 w-2/3 rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
					</div>
				</div>

				<!-- Acta intermedia -->
				<div
					class="animate-fade-in absolute top-10 right-0 hidden w-[78%] -rotate-[3deg] rounded-xl border border-neutral-200 bg-white p-4 shadow-md sm:block dark:border-neutral-800 dark:bg-neutral-900"
					style="animation-delay: 140ms"
				>
					<p class="font-heading text-xs font-bold text-neutral-400 dark:text-neutral-500">
						CSET-2026-255
					</p>
					<div class="mt-3 space-y-2">
						<div class="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
						<div class="h-2 w-3/4 rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
					</div>
				</div>

				<!-- Acta frontal, ya procesada -->
				<div
					class="animate-fade-in-up absolute top-20 left-0 w-full max-w-md rounded-xl border border-neutral-200 bg-white p-5 shadow-xl sm:top-24 dark:border-neutral-700 dark:bg-neutral-900"
					style="animation-delay: 60ms"
				>
					<div class="flex items-start justify-between gap-3">
						<div>
							<p class="font-heading text-sm font-bold text-primary-900 dark:text-neutral-50">
								CSET-2026-256
							</p>
							<p class="text-[11px] text-neutral-500 dark:text-neutral-400">
								Ficha 2758421 · 08 de septiembre de 2026
							</p>
						</div>
						<span
							class="rounded-full bg-primary-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary-700 dark:bg-primary-400/15 dark:text-primary-300"
						>
							5 casos
						</span>
					</div>

					<div class="mt-4 space-y-2.5">
						<div class="flex items-center gap-2.5">
							<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600"
							></span>
							<span class="text-xs text-neutral-600 dark:text-neutral-300">
								Inasistencia reiterada
							</span>
						</div>
						<div class="flex items-center gap-2.5">
							<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600"
							></span>
							<span class="text-xs text-neutral-600 dark:text-neutral-300">
								Bajo rendimiento académico
							</span>
						</div>
					</div>

					<!-- El hallazgo: único punto donde aparece el verde -->
					<div
						class="mt-4 flex items-start gap-2.5 rounded-lg border border-accent-200 bg-accent-50/70 p-3 dark:border-accent-700/40 dark:bg-accent-500/10"
					>
						<svg
							class="mt-px h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.75"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
							/>
						</svg>
						<p class="text-xs leading-relaxed text-neutral-700 dark:text-neutral-200">
							Esta ficha ya registraba inasistencia reiterada en dos actas anteriores de este
							trimestre.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══ El problema ═══ -->
	<section class="border-t border-neutral-200 dark:border-neutral-800">
		<div class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
			<h2
				class="font-heading max-w-2xl text-2xl font-bold tracking-tight text-primary-900 sm:text-3xl dark:text-neutral-50"
			>
				El problema nunca fue la falta de datos.
			</h2>
			<p class="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
				El comité lleva años documentando cada caso: inasistencias, deserción, bajo rendimiento,
				medidas acordadas. Todo quedó registrado — repartido en cientos de archivos sueltos.
			</p>

			<div class="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
				<div>
					<p
						class="border-b border-neutral-200 pb-3 text-sm font-semibold text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
					>
						Hoy
					</p>
					<ul class="mt-4 space-y-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
						<li>Responder «¿esto ya había pasado?» exige abrir las actas una por una.</li>
						<li>Los anexos en Excel viven aparte del acta que los originó.</li>
						<li>Lo que se repite entre fichas solo se nota si alguien lo recuerda.</li>
						<li>Preparar un informe para dirección toma días de lectura manual.</li>
					</ul>
				</div>

				<div>
					<p
						class="border-b border-primary-200 pb-3 text-sm font-semibold text-primary-700 dark:border-primary-500/30 dark:text-primary-300"
					>
						Con AnaliCSET
					</p>
					<ul class="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
						<li>El histórico completo se consulta y filtra en segundos.</li>
						<li>Cada acta conserva sus casos, su ficha y sus anexos juntos.</li>
						<li>Las reincidencias y correlaciones se señalan solas.</li>
						<li>El informe del periodo se genera desde la misma pantalla.</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══ Cómo funciona (franja navy: único acento fuerte de la página) ═══ -->
	<section class="bg-primary-900 dark:bg-neutral-900">
		<div class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
			<h2 class="font-heading max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
				Del archivo al patrón, en tres pasos.
			</h2>

			<ol class="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
				{#each pasos as paso, i}
					<li class="border-t pt-5 {paso.ia ? 'border-accent-500' : 'border-primary-700 dark:border-neutral-700'}">
						<span
							class="font-heading text-sm font-bold {paso.ia
								? 'text-accent-400'
								: 'text-primary-300 dark:text-neutral-500'}"
						>
							{i + 1}
						</span>
						<p class="font-heading mt-2 text-base font-bold text-white">{paso.titulo}</p>
						<p class="mt-2 text-sm leading-relaxed text-primary-200 dark:text-neutral-400">
							{paso.texto}
						</p>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- ═══ Cierre ═══ -->
	<section class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
		<div class="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2
					class="font-heading text-xl font-bold tracking-tight text-primary-900 sm:text-2xl dark:text-neutral-50"
				>
					¿Hace parte del comité?
				</h2>
				<p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
					Ingrese con su cuenta institucional para consultar el histórico.
				</p>
			</div>
			<a
				href="/login"
				class="shrink-0 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-950"
			>
				Iniciar sesión
			</a>
		</div>
	</section>

	<!-- ═══ Pie ═══ -->
	<footer class="border-t border-neutral-200 dark:border-neutral-800">
		<div
			class="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:text-neutral-400"
		>
			<p>Servicio Nacional de Aprendizaje · Comité de Evaluación y Seguimiento</p>
			<p>AnaliCSET v0.1.0</p>
		</div>
	</footer>
</div>
