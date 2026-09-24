<script>
	import logo from '$lib/assets/logo-transparent.png';

	let usuario = $state('');
	let contrasena = $state('');
	let recordarSesion = $state(false);
	let mensajeError = $state('');
	let campoConError = $state('');

	let estaBotonDeshabilitado = $derived(!usuario.trim() || !contrasena.trim());

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
	<article class="w-full max-w-[380px] bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
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
			<p class="mt-1 text-xs text-ink-soft">
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
					class="w-full px-3 py-2 text-sm text-ink bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors placeholder:text-ink-soft/60"
				/>
			</div>

			<div class="space-y-1.5">
				<label for="password" class="block text-xs font-semibold text-ink">
					Contraseña
				</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					autocomplete="current-password"
					placeholder="••••••••"
					bind:value={contrasena}
					oninput={manejarEntradaContrasena}
					class="w-full px-3 py-2 text-sm text-ink bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors placeholder:text-ink-soft/60"
				/>
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
				class="w-full py-2.5 px-4 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-dark active:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-blue"
			>
				Iniciar sesión
			</button>
		</form>
	</article>
</main>
