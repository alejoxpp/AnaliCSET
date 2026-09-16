<script>
	import { goto } from '$app/navigation';
	import { login } from '$lib/api/auth.js';
	import { setSession } from '$lib/stores/auth.js';
	import { toasts } from '$lib/stores/toast.js';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let email = $state('admin@sena.edu.co');
	let password = $state('demo1234');
	let rememberMe = $state(true);
	let showPassword = $state(false);
	let touched = $state(false);
	let submitting = $state(false);
	let serverError = $state('');

	const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const emailError = $derived.by(() => {
		if (!touched) return '';
		if (!email) return 'El correo electrónico es obligatorio.';
		if (!EMAIL_PATTERN.test(email)) return 'Ingresa un correo electrónico válido.';
		return '';
	});

	const passwordError = $derived.by(() => {
		if (!touched) return '';
		if (!password) return 'La contraseña es obligatoria.';
		return '';
	});

	async function handleSubmit(event) {
		event.preventDefault();
		touched = true;
		serverError = '';

		if (emailError || passwordError) return;

		submitting = true;
		try {
			const { token, user } = await login(email, password);
			setSession(token, user);
			toasts.add(`¡Bienvenido, ${user.name}!`, 'success', 3000);
			goto('/dashboard');
		} catch (err) {
			serverError = err instanceof Error ? err.message : 'No se pudo iniciar sesión.';
			toasts.add(serverError, 'danger', 4000);
		} finally {
			submitting = false;
		}
	}

	function fillDemo(role = 'admin') {
		if (role === 'coordinador') {
			email = 'coordinador@sena.edu.co';
			password = 'demo1234';
		} else if (role === 'instructor') {
			email = 'instructor@sena.edu.co';
			password = 'demo1234';
		} else {
			email = 'admin@sena.edu.co';
			password = 'demo1234';
		}
		touched = false;
		serverError = '';
	}
</script>

<svelte:head>
	<title>Iniciar Sesión · AnaliCSET</title>
	<meta
		name="description"
		content="Acceso a AnaliCSET — Plataforma de análisis inteligente de comités de evaluación y seguimiento CSET del SENA."
	/>
</svelte:head>

<div class="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-[#080d19] lg:bg-[#080d19]">
	<!-- ══════════════════════════════════════════════════════════════════
	     COLUMNA IZQUIERDA: DASHBOARD MOCKUP OSCURO + BRANDING ANALICSET
	     ══════════════════════════════════════════════════════════════════ -->
	<div
		class="relative hidden lg:flex lg:w-1/2 min-h-screen flex-col justify-between overflow-hidden p-8 xl:p-12 border-r border-white/10"
		style="background: radial-gradient(circle at 20% 30%, #0d1a33 0%, #080d1a 70%, #04070e 100%);"
	>
		<!-- Capa de brillo ambiental de fondo -->
		<div class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"></div>
		<div class="pointer-events-none absolute top-1/2 right-0 h-96 w-96 rounded-full bg-primary-600/10 blur-3xl"></div>

		<!-- ── MOCKUP DEL DASHBOARD DE FONDO ────────────────────────── -->
		<div class="relative z-0 space-y-4 opacity-75 select-none pointer-events-none transition-all duration-700">
			<!-- Header simulado de la app -->
			<div class="flex items-center justify-between border-b border-white/10 pb-4">
				<div class="flex items-center gap-2.5">
					<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 p-1 ring-1 ring-white/15">
						<img src="/logo-icon.png" alt="" class="h-full w-full object-contain" />
					</div>
					<span class="text-xs font-bold tracking-wider text-white uppercase">ANALI CSET</span>
				</div>

				<div class="flex items-center gap-2">
					<div class="h-2 w-2 rounded-full bg-accent-400 animate-pulse"></div>
					<span class="text-[11px] text-white/70">Comité Regional SENA</span>
				</div>
			</div>

			<!-- Título del dashboard simulado -->
			<div class="flex items-center justify-between pt-1">
				<div>
					<h3 class="font-heading text-xs font-bold tracking-wider text-white/80 uppercase">
						PANEL DE SEGUIMIENTO CSET
					</h3>
					<p class="text-[10px] text-white/40">Periodo actual · Actas registradas 2026</p>
				</div>
				<span class="rounded-md bg-accent-500/20 px-2 py-0.5 text-[10px] font-semibold text-accent-400 ring-1 ring-accent-500/30">
					Sistema Activo
				</span>
			</div>

			<!-- 3 Tarjetas de métricas del dashboard simulado -->
			<div class="grid grid-cols-3 gap-3">
				<!-- Métrica 1 -->
				<div class="rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xs">
					<span class="text-[10px] font-medium text-white/50">Casos Totales</span>
					<p class="mt-0.5 font-heading text-base font-bold text-white">354</p>
					<!-- Mini gráfico de onda verde -->
					<div class="mt-2 h-7 w-full">
						<svg class="h-full w-full overflow-visible" viewBox="0 0 100 28" fill="none">
							<path d="M0 24 Q 25 22, 45 10 T 80 14 T 100 4" stroke="#00c853" stroke-width="2" fill="none" />
							<path d="M0 24 Q 25 22, 45 10 T 80 14 T 100 4 L 100 28 L 0 28 Z" fill="rgba(0, 200, 83, 0.12)" />
						</svg>
					</div>
				</div>

				<!-- Métrica 2 -->
				<div class="rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xs">
					<span class="text-[10px] font-medium text-white/50">Fichas Activas</span>
					<p class="mt-0.5 font-heading text-base font-bold text-white">84</p>
					<!-- Mini gráfico de onda cyan -->
					<div class="mt-2 h-7 w-full">
						<svg class="h-full w-full overflow-visible" viewBox="0 0 100 28" fill="none">
							<path d="M0 20 Q 20 12, 50 18 T 85 8 T 100 6" stroke="#00b4d8" stroke-width="2" fill="none" />
							<path d="M0 20 Q 20 12, 50 18 T 85 8 T 100 6 L 100 28 L 0 28 Z" fill="rgba(0, 180, 216, 0.12)" />
						</svg>
					</div>
				</div>

				<!-- Métrica 3 -->
				<div class="rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xs">
					<span class="text-[10px] font-medium text-white/50">Tasa Acuerdos</span>
					<p class="mt-0.5 font-heading text-base font-bold text-white">94.2%</p>
					<!-- Mini barras -->
					<div class="mt-2 flex h-7 items-end justify-between gap-1 px-1">
						<div class="h-3 w-2 rounded-xs bg-white/20"></div>
						<div class="h-5 w-2 rounded-xs bg-white/30"></div>
						<div class="h-4 w-2 rounded-xs bg-white/40"></div>
						<div class="h-6 w-2 rounded-xs bg-accent-400"></div>
						<div class="h-7 w-2 rounded-xs bg-accent-500"></div>
					</div>
				</div>
			</div>

			<!-- Gráficos simulados medios -->
			<div class="grid grid-cols-5 gap-3">
				<!-- Gráfico lineal de evolución -->
				<div class="col-span-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xs">
					<div class="flex items-center justify-between text-[10px]">
						<span class="font-medium text-white/70">Evolución de Comités</span>
						<span class="text-accent-400">Mensual</span>
					</div>
					<div class="mt-3 h-24 w-full">
						<svg class="h-full w-full" viewBox="0 0 200 80" fill="none">
							<line x1="0" y1="20" x2="200" y2="20" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3" />
							<line x1="0" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3" />
							<path
								d="M0 65 Q 30 55, 60 25 T 120 40 T 170 15 L 200 10"
								stroke="#00c853"
								stroke-width="2.5"
								fill="none"
							/>
							<path
								d="M0 65 Q 30 55, 60 25 T 120 40 T 170 15 L 200 10 L 200 80 L 0 80 Z"
								fill="url(#gradLine)"
							/>
							<defs>
								<linearGradient id="gradLine" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stop-color="#00c853" stop-opacity="0.25" />
									<stop offset="100%" stop-color="#00c853" stop-opacity="0" />
								</linearGradient>
							</defs>
						</svg>
					</div>
				</div>

				<!-- Gráfico doughnut simulado -->
				<div class="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xs flex flex-col items-center justify-center">
					<span class="text-[10px] font-medium text-white/70 self-start">Patrones IA</span>
					<div class="relative mt-2 flex h-20 w-20 items-center justify-center">
						<svg class="h-full w-full -rotate-90" viewBox="0 0 36 36">
							<path
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="rgba(255,255,255,0.1)"
								stroke-width="3.5"
							/>
							<path
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="#00c853"
								stroke-dasharray="75, 100"
								stroke-width="3.5"
								stroke-linecap="round"
							/>
						</svg>
						<div class="absolute flex flex-col items-center">
							<span class="text-xs font-bold text-white">89%</span>
							<span class="text-[8px] text-white/50">IA</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- ── SECCIÓN DE BRANDING EN PRIMER PLANO ────────────────────────── -->
		<div class="relative z-10 mt-auto pt-8">
			<!-- Logo e Identidad -->
			<div class="flex items-center gap-3.5 mb-3">
				<div
					class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg shadow-accent-500/10 ring-1 ring-white/20"
				>
					<img src="/logo-icon.png" alt="AnaliCSET" class="h-full w-full object-contain" />
				</div>
				<div>
					<h2 class="font-heading text-2xl font-bold tracking-tight text-white flex items-center gap-2">
						AnaliCSET
						<span class="rounded-full bg-accent-500/20 px-2 py-0.5 text-[10px] font-semibold text-accent-300 ring-1 ring-accent-500/30">
							SENA · CSET
						</span>
					</h2>
				</div>
			</div>

			<!-- Descripción institucional -->
			<p class="text-sm text-neutral-300 leading-relaxed max-w-md mb-6 font-normal">
				Gestión institucional inteligente, eficiente y escalable de actas y comités de evaluación.
			</p>

			<!-- 3 Características con checkmarks verdes -->
			<div class="space-y-2.5 text-xs text-neutral-200">
				<div class="flex items-center gap-2.5">
					<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					</div>
					<span>Gestión centralizada de actas y fichas de formación</span>
				</div>

				<div class="flex items-center gap-2.5">
					<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					</div>
					<span>Reportes y analítica de comités en tiempo real</span>
				</div>

				<div class="flex items-center gap-2.5">
					<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
						<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					</div>
					<span>Detección temprana y predictiva de patrones formativos con IA</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════════
	     COLUMNA DERECHA: FORMULARIO LIMPIO, ELEGANTE Y MODERNO
	     ══════════════════════════════════════════════════════════════════ -->
	<div class="w-full flex-1 min-h-screen lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-16 bg-slate-50 dark:bg-[#080d19] relative overflow-hidden">
		<!-- Toggle de tema y retorno a inicio -->
		<div class="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
			<a
				href="/"
				class="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-neutral-500 hover:bg-neutral-200/60 hover:text-neutral-900 transition-colors dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
				title="Volver a la página de inicio"
			>
				<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
				</svg>
				<span class="hidden sm:inline">Inicio</span>
			</a>
			<ThemeToggle />
		</div>

		<!-- Sutiles destellos decorativos ambientales en mobile/tablet -->
		<div class="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/5 blur-3xl lg:hidden"></div>
		<div class="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-600/5 blur-3xl lg:hidden"></div>

		<!-- Contenedor del formulario: sin borde ni recuadro en modo oscuro -->
		<div class="w-full max-w-[420px] my-auto bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 shadow-xs p-6 sm:p-8 lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0 relative z-10 dark:bg-transparent dark:border-0 dark:shadow-none dark:p-0">
			<!-- Logo visible en dispositivos móviles / tablet -->
			<div class="lg:hidden mb-6 flex items-center gap-3">
				<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-50 p-2 shadow-2xs border border-neutral-200/80">
					<img src="/logo-icon.png" alt="AnaliCSET" class="h-full w-full object-contain" />
				</div>
				<div>
					<div class="flex items-center gap-2">
						<span class="font-heading text-lg font-bold text-neutral-900 leading-tight">AnaliCSET</span>
						<span class="rounded-full bg-accent-500/10 px-2 py-0.5 text-[10px] font-semibold text-accent-700 ring-1 ring-accent-500/20">
							SENA · CSET
						</span>
					</div>
					<p class="text-[11px] text-neutral-500">Comité de Evaluación y Seguimiento</p>
				</div>
			</div>

			<!-- Encabezado del Formulario -->
			<div class="mb-6">
				<h1 class="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight dark:text-white">
					Iniciar sesión
				</h1>
				<p class="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
					Ingresa tus credenciales institucionales para acceder.
				</p>
			</div>

			<!-- Barra sutil de acceso rápido para pruebas / demo -->
			<div class="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-neutral-200/80 bg-neutral-100/70 px-3 py-2 text-xs dark:border-white/10 dark:bg-white/5">
				<span class="text-neutral-500 font-medium dark:text-neutral-400">Acceso demo:</span>
				<div class="flex items-center gap-1.5">
					<button
						type="button"
						onclick={() => fillDemo('admin')}
						class="rounded bg-white px-2 py-0.5 text-[11px] font-semibold text-neutral-700 shadow-2xs hover:bg-neutral-50 border border-neutral-200 cursor-pointer dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/20 dark:border-white/10"
					>
						Admin
					</button>
					<button
						type="button"
						onclick={() => fillDemo('coordinador')}
						class="rounded bg-white px-2 py-0.5 text-[11px] font-semibold text-neutral-700 shadow-2xs hover:bg-neutral-50 border border-neutral-200 cursor-pointer dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/20 dark:border-white/10"
					>
						Coordinación
					</button>
				</div>
			</div>

			<!-- Formulario de Inicio de Sesión -->
			<form class="space-y-4" onsubmit={handleSubmit} novalidate>
				<!-- Correo Electrónico -->
				<div class="space-y-1.5">
					<label for="email" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
						Correo institucional
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						autocomplete="username"
						placeholder="usuario@sena.edu.co"
						class="w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400
							shadow-2xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0
							{emailError
							? 'border-danger-500 focus:ring-danger-500/20'
							: 'border-neutral-200 focus:border-accent-500 focus:ring-accent-500/20 dark:border-white/15 dark:focus:border-accent-500'} dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500"
					/>
					{#if emailError}
						<p class="text-xs text-danger-600 dark:text-danger-500">{emailError}</p>
					{/if}
				</div>

				<!-- Contraseña con Toggle de Ojo -->
				<div class="space-y-1.5">
					<label for="password" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
						Contraseña
					</label>

					<div class="relative">
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							bind:value={password}
							autocomplete="current-password"
							placeholder="••••••••"
							class="w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-neutral-900 placeholder:text-neutral-400
								shadow-2xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0
								{passwordError
								? 'border-danger-500 focus:ring-danger-500/20'
								: 'border-neutral-200 focus:border-accent-500 focus:ring-accent-500/20 dark:border-white/15 dark:focus:border-accent-500'} dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500"
						/>

						<!-- Botón para ver/ocultar contraseña (Ícono de Ojo) -->
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-600 focus:outline-none cursor-pointer dark:text-neutral-500 dark:hover:text-neutral-300"
							aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
						>
							{#if showPassword}
								<!-- Ojo tachado -->
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
									<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
								</svg>
							{:else}
								<!-- Ojo normal -->
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
									<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
									<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							{/if}
						</button>
					</div>
					{#if passwordError}
						<p class="text-xs text-danger-600 dark:text-danger-500">{passwordError}</p>
					{/if}
				</div>

				<!-- Checkbox Recordarme por 30 días -->
				<div class="flex items-center gap-2.5 pt-1">
					<input
						id="remember"
						type="checkbox"
						bind:checked={rememberMe}
						class="h-4 w-4 rounded border-neutral-300 text-accent-500 focus:ring-accent-500/30 focus:ring-offset-0 cursor-pointer dark:border-neutral-700 dark:bg-white/5"
					/>
					<label for="remember" class="text-xs text-neutral-600 select-none cursor-pointer dark:text-neutral-300">
						Recordarme por 30 días
					</label>
				</div>

				<!-- Mensaje de error de servidor -->
				{#if serverError}
					<div class="rounded-lg bg-danger-50 p-3 text-xs text-danger-700 border border-danger-200 flex items-start gap-2 dark:bg-danger-500/10 dark:border-danger-500/30 dark:text-danger-300">
						<svg class="h-4 w-4 text-danger-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
						<span>{serverError}</span>
					</div>
				{/if}

				<!-- Botón Iniciar Sesión (Verde institucional) -->
				<button
					type="submit"
					disabled={submitting}
					class="w-full rounded-xl bg-accent-500 hover:bg-accent-600 active:scale-[0.99] text-white font-semibold py-3 px-4 text-sm shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{#if submitting}
						<span class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
						<span>Iniciando sesión…</span>
					{:else}
						<span>Iniciar Sesión</span>
					{/if}
				</button>
			</form>

			<!-- Aviso institucional -->
			<div class="mt-8 border-t border-neutral-200 pt-4 text-center dark:border-white/10">
				<p class="text-[11px] text-neutral-400 dark:text-neutral-500">
					Plataforma de uso exclusivo para personal autorizado del SENA · CSET
				</p>
			</div>
		</div>
	</div>
</div>
