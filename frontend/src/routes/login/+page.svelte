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

<main class="min-h-screen bg-surface flex items-center justify-center p-4">
	<article class="w-full max-w-[380px] bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100 p-6 sm:p-8">
		<header class="text-center mb-6">
			<div class="flex justify-center">
				<img
					src={logo}
					alt="Logo de AnaliCSET"
					width="72"
					height="66"
					class="h-16 w-auto object-contain"
				/>
			</div>
			<div class="h-[3px] w-full bg-gradient-to-r from-accent-cyan to-accent-green rounded-full mt-4 mb-4"></div>
			<h1 class="text-xl font-bold text-ink tracking-tight">
				AnaliCSET
			</h1>
			<p class="mt-1 text-xs font-medium text-ink-soft">
				SENA · CSET Bucaramanga
			</p>
		</header>

		<form class="space-y-4" onsubmit={validarYEnviarFormulario} novalidate>
			<div
				id="login-error-message"
				role="alert"
				aria-live="polite"
				class={mensajeError ? 'p-3 rounded-lg border border-red-200 bg-red-50 text-xs text-red-600' : 'hidden'}
			>
				{mensajeError}
			</div>

			<div class="space-y-1.5">
				<label for="usuario" class="block text-xs font-semibold text-ink">
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
					class="w-full px-3.5 py-2.5 text-sm text-ink bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-colors placeholder:text-slate-400"
				/>
			</div>

			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<label for="password" class="block text-xs font-semibold text-ink">
						Contraseña
					</label>
					<a
						href="#recuperar"
						class="text-xs text-brand-blue hover:underline transition-colors"
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
						class="w-full pl-3.5 pr-10 py-2.5 text-sm text-ink bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-colors placeholder:text-slate-400"
					/>
					<button
						type="button"
						onclick={alternarVisibilidadContrasena}
						class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-ink focus:outline-none transition-colors"
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

			<div class="flex items-center justify-between pt-1">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						bind:checked={recordarSesion}
						class="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
					/>
					<label for="remember-me" class="ml-2 block text-xs text-ink-soft select-none cursor-pointer">
						Recordarme
					</label>
				</div>
			</div>

			<button
				type="submit"
				disabled={estaBotonDeshabilitado}
				class="w-full py-2.5 px-4 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-dark active:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-blue"
			>
				Iniciar sesión
			</button>
		</form>
	</article>
</main>
