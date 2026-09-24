<main class="min-h-screen bg-surface flex items-center justify-center p-4">
	<article class="w-full max-w-[380px] bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
		<header class="text-center mb-6">
			<div class="flex justify-center">
				<div class="flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-slate-200">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="w-6 h-6 text-brand-blue"
						aria-hidden="true"
					>
						<path d="M3 3v18h18" />
						<path d="m19 9-5 5-4-4-3 3" />
					</svg>
				</div>
			</div>
			<div class="h-[3px] w-full bg-gradient-to-r from-accent-cyan to-accent-green rounded-full mt-4 mb-4"></div>
			<h1 class="text-xl font-bold text-ink tracking-tight">
				AnaliCSET
			</h1>
			<p class="mt-1 text-xs text-ink-soft">
				SENA · CSET Bucaramanga
			</p>
		</header>

		<form class="space-y-4">
			<div
				id="login-error-message"
				role="alert"
				class="hidden p-3 rounded-lg border border-red-200 bg-red-50 text-xs text-red-600"
			>
				Credenciales no válidas. Intente nuevamente.
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
					class="w-full px-3 py-2 text-sm text-ink bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors placeholder:text-ink-soft/60"
				/>
			</div>

			<div class="flex items-center justify-between pt-1">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						class="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
					/>
					<label for="remember-me" class="ml-2 block text-xs text-ink-soft select-none cursor-pointer">
						Recordarme
					</label>
				</div>
			</div>

			<button
				type="submit"
				class="w-full py-2.5 px-4 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-dark active:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-colors cursor-pointer"
			>
				Iniciar sesión
			</button>
		</form>
	</article>
</main>
