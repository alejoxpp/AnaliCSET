<script>
	import logo from '$lib/assets/logo-transparent.png';

	let usuario = $state('');
	let contrasena = $state('');
	let recordarSesion = $state(false);
	let esContrasenaVisible = $state(false);
	let mensajeError = $state('');
	let campoConError = $state('');

	let estaBotonDeshabilitado = $derived(!usuario.trim() || !contrasena.trim());

	function alternarVisibilidadContrasena() {
		esContrasenaVisible = !esContrasenaVisible;
	}

	function manejarEntradaUsuario() {
		if (campoConError === 'usuario' && usuario.trim().length > 0) {
			mensajeError = '';
			campoConError = '';
		}
	}

	function manejarEntradaContrasena() {
		if (campoConError === 'contrasena' && contrasena.length >= 6) {
			mensajeError = '';
			campoConError = '';
		}
	}

	function validarYEnviarFormulario(event) {
		event.preventDefault();

		if (!usuario.trim()) {
			mensajeError = 'El usuario o correo es obligatorio.';
			campoConError = 'usuario';
			return;
		}

		if (!contrasena.trim()) {
			mensajeError = 'La contraseña es obligatoria.';
			campoConError = 'contrasena';
			return;
		}

		if (contrasena.length < 6) {
			mensajeError = 'La contraseña debe tener mínimo 6 caracteres.';
			campoConError = 'contrasena';
			return;
		}

		mensajeError = '';
		campoConError = '';
		console.log('Inicio de sesión:', {
			usuario,
			contrasena,
			recordarSesion
		});
	}
</script>

<div class="min-h-screen w-full flex flex-col lg:flex-row">
	<!-- Panel Izquierdo: Branding & Contexto Institucional (Oculto en móvil) -->
	<aside
		class="hidden lg:flex lg:w-1/2 relative bg-brand-blue-dark overflow-hidden flex-col justify-between p-8 lg:p-10 xl:p-16 text-white select-none"
	>
		<!-- Texturas abstractas sutiles (rejilla y difuminados) -->
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none"
		></div>
		<div
			class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent-cyan/15 blur-3xl pointer-events-none"
		></div>
		<div
			class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent-green/15 blur-3xl pointer-events-none"
		></div>

		<!-- Encabezado superior del panel izquierdo -->
		<div class="relative z-10">
			<div
				class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-medium text-white/90"
			>
				<span>SENA · Regional Santander</span>
			</div>
		</div>

		<!-- Bloque de Marca y Características (Cuadrante inferior/medio) -->
		<div class="relative z-10 max-w-md my-auto lg:my-0">
			<div class="flex items-center gap-3.5 mb-2">
				<div
					class="w-12 h-12 rounded-xl bg-white p-2 shadow-lg flex items-center justify-center flex-shrink-0"
				>
					<img
						src={logo}
						alt="Logo AnaliCSET"
						class="w-full h-full object-contain"
					/>
				</div>
				<div>
					<h2 class="text-2xl font-bold tracking-tight text-white">AnaliCSET</h2>
					<p class="text-xs text-white/70 font-medium">Sistema de Inteligencia y Seguimiento</p>
				</div>
			</div>

			<!-- Único acento degradado: accent-cyan a accent-green -->
			<div class="h-[3px] w-20 bg-gradient-to-r from-accent-cyan to-accent-green rounded-full my-4"></div>

			<!-- Tagline institucional -->
			<p class="text-sm text-slate-200 leading-relaxed font-normal mb-8">
				Análisis del histórico del Comité de Evaluación y Seguimiento — CSET Bucaramanga
			</p>

			<!-- Viñetas de características con check -->
			<ul class="space-y-4">
				<li class="flex items-center gap-3">
					<div
						class="w-6 h-6 rounded-full bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-sm"
					>
						<svg
							class="w-3.5 h-3.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M20 6 9 17l-5-5" />
						</svg>
					</div>
					<span class="text-sm font-medium text-white/95">Trazabilidad de decisiones del comité</span>
				</li>
				<li class="flex items-center gap-3">
					<div
						class="w-6 h-6 rounded-full bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-sm"
					>
						<svg
							class="w-3.5 h-3.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M20 6 9 17l-5-5" />
						</svg>
					</div>
					<span class="text-sm font-medium text-white/95">Historial centralizado y análisis de casos</span>
				</li>
				<li class="flex items-center gap-3">
					<div
						class="w-6 h-6 rounded-full bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-sm"
					>
						<svg
							class="w-3.5 h-3.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M20 6 9 17l-5-5" />
						</svg>
					</div>
					<span class="text-sm font-medium text-white/95">Acceso controlado por rol</span>
				</li>
			</ul>
		</div>

		<!-- Pie institucional del panel izquierdo -->
		<div class="relative z-10 text-xs text-white/50 font-normal">
			Centro de Servicios Empresariales y Turísticos
		</div>
	</aside>

	<!-- Panel Derecho: Formulario de Autenticación -->
	<main
		class="w-full lg:w-1/2 min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:p-12 overflow-y-auto"
	>
		<div class="w-full max-w-[400px] flex flex-col">
			<!-- Encabezado de marca visible solo en móvil -->
			<div class="lg:hidden flex items-center gap-3 mb-6 sm:mb-8">
				<div class="w-10 h-10 rounded-lg bg-white p-1.5 shadow-sm border border-slate-200 flex items-center justify-center flex-shrink-0">
					<img src={logo} alt="Logo AnaliCSET" class="w-full h-full object-contain" />
				</div>
				<div>
					<span class="text-lg font-bold text-ink tracking-tight block">AnaliCSET</span>
					<span class="text-xs text-ink-soft">SENA · CSET Bucaramanga</span>
				</div>
			</div>

			<!-- Cabecera del Formulario -->
			<header class="mb-7">
				<h1 class="text-2xl font-bold text-ink tracking-tight">
					Bienvenido de nuevo
				</h1>
				<p class="mt-2 text-sm font-normal text-ink-soft">
					Ingresa tus credenciales para acceder al sistema.
				</p>
			</header>

			<!-- Formulario de inicio de sesión -->
			<form onsubmit={validarYEnviarFormulario} novalidate class="flex flex-col">
				<!-- Alerta de validación accesible -->
				<div
					id="login-error-message"
					role="alert"
					aria-live="polite"
					class={mensajeError ? 'mb-4 p-3 rounded-lg border border-red-200 bg-red-50 text-xs text-red-600' : 'hidden'}
				>
					{mensajeError}
				</div>

				<!-- Campo: Usuario -->
				<div>
					<label for="usuario" class="block text-sm font-semibold text-ink mb-2">
						Usuario
					</label>
					<input
						id="usuario"
						name="usuario"
						type="text"
						required
						autocomplete="username"
						placeholder="Ingresa tu usuario"
						bind:value={usuario}
						oninput={manejarEntradaUsuario}
						class="w-full h-[44px] px-3.5 py-2.5 text-base sm:text-sm text-ink bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-colors placeholder:text-slate-400"
					/>
				</div>

				<!-- Campo: Contraseña con toggle de visibilidad -->
				<div class="mt-4 sm:mt-5">
					<div class="flex items-center justify-between mb-2">
						<label for="password" class="block text-sm font-semibold text-ink">
							Contraseña
						</label>
						<a
							href="#recuperar"
							class="text-xs sm:text-sm font-medium text-brand-blue hover:underline transition-colors py-1"
						>
							¿Olvidaste tu contraseña?
						</a>
					</div>
					<div class="relative">
						<input
							id="password"
							name="password"
							type={esContrasenaVisible ? 'text' : 'password'}
							required
							autocomplete="current-password"
							placeholder="••••••••"
							bind:value={contrasena}
							oninput={manejarEntradaContrasena}
							class="w-full h-[44px] pl-3.5 pr-11 py-2.5 text-base sm:text-sm text-ink bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-colors placeholder:text-slate-400"
						/>
						<button
							type="button"
							onclick={alternarVisibilidadContrasena}
							class="absolute inset-y-0 right-0 pr-3.5 pl-2.5 flex items-center text-slate-400 hover:text-ink focus:outline-none transition-colors"
							aria-label={esContrasenaVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
						>
							{#if esContrasenaVisible}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="w-4 h-4"
									aria-hidden="true"
								>
									<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
									<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
									<path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
									<line x1="2" x2="22" y1="2" y2="22" />
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="w-4 h-4"
									aria-hidden="true"
								>
									<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
									<circle cx="12" cy="12" r="3" />
								</svg>
							{/if}
						</button>
					</div>
				</div>

				<!-- Opción Recordarme con área táctil cómoda -->
				<div class="mt-4 flex items-center">
					<label for="remember-me" class="inline-flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm font-normal text-ink-soft py-1">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							bind:checked={recordarSesion}
							class="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
						/>
						<span>Recordarme</span>
					</label>
				</div>

				<!-- Botón Principal Iniciar Sesión -->
				<button
					type="submit"
					disabled={estaBotonDeshabilitado}
					class="mt-6 w-full h-[46px] rounded-lg bg-brand-blue text-white text-sm sm:text-base font-semibold shadow-[0_4px_14px_rgba(29,95,224,0.25)] hover:bg-brand-blue-dark active:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-blue disabled:shadow-none"
				>
					Iniciar sesión
				</button>
			</form>
		</div>
	</main>
</div>

