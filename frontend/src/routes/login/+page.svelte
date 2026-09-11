<script>
	import { goto } from '$app/navigation';
	import { login } from '$lib/api/auth.js';
	import { setSession } from '$lib/stores/auth.js';
	import Card from '$lib/components/Card.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	let email = $state('admin@sena.edu.co');
	let password = $state('demo1234');
	let touched = $state(false);
	let submitting = $state(false);
	let serverError = $state('');

	const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const emailError = $derived.by(() => {
		if (!touched) return '';
		if (!email) return 'El correo es obligatorio.';
		if (!EMAIL_PATTERN.test(email)) return 'Ingresa un correo válido.';
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
			goto('/dashboard');
		} catch (err) {
			serverError = err instanceof Error ? err.message : 'No se pudo iniciar sesión.';
		} finally {
			submitting = false;
		}
	}

	function fillDemo(role = 'admin') {
		if (role === 'coordinador') {
			email = 'coordinador@sena.edu.co';
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
	<title>Iniciar sesión · AnaliCSET</title>
	<meta
		name="description"
		content="Acceso al sistema AnaliCSET — Plataforma de análisis inteligente de actas del Comité de Evaluación y Seguimiento del SENA."
	/>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center px-4 py-10"
	style="background: linear-gradient(160deg, var(--color-neutral-50) 0%, var(--color-primary-50) 50%, var(--color-neutral-50) 100%);"
>
	<div class="w-full max-w-sm">
		<!-- Branding -->
		<div class="animate-fade-in-up mb-8 text-center flex flex-col items-center">
			<div
				class="inline-flex items-center justify-center p-3.5 rounded-2xl bg-white shadow-md shadow-primary-900/10 ring-1 ring-neutral-200/80 mb-3 animate-subtle-glow"
			>
				<img src="/logo.png" alt="AnaliCSET Logo" class="h-12 w-auto object-contain" />
			</div>
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-primary-100 text-primary-900 mb-1.5">
				SENA · CSET
			</span>
			<p class="text-xs text-neutral-500 max-w-[280px]">
				Plataforma de análisis inteligente de actas del Comité de Evaluación y Seguimiento
			</p>
		</div>

		<!-- Formulario -->
		<div class="animate-fade-in-up" style="animation-delay: 120ms;">
			<Card>
				<!-- Caja de ayuda con credenciales de prueba -->
				<div class="mb-4 rounded-lg border border-primary-200/70 bg-primary-50/60 p-3 text-xs">
					<div class="flex items-center justify-between mb-1.5">
						<span class="font-semibold text-primary-900">Acceso demo:</span>
						<button
							type="button"
							onclick={() => fillDemo('admin')}
							class="rounded bg-primary-600 px-2 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-primary-700 cursor-pointer shadow-xs"
						>
							Autocompletar
						</button>
					</div>
					<p class="text-[11px] text-neutral-600">
						Correo: <strong class="text-neutral-900">admin@sena.edu.co</strong><br />
						Clave: <strong class="text-neutral-900">demo1234</strong>
					</p>
				</div>
				<form class="space-y-4" onsubmit={handleSubmit} novalidate>
					<Input
						label="Correo institucional"
						type="email"
						bind:value={email}
						error={emailError}
						required
						autocomplete="username"
						placeholder="usuario@sena.edu.co"
					/>
					<Input
						label="Contraseña"
						type="password"
						bind:value={password}
						error={passwordError}
						required
						autocomplete="current-password"
						placeholder="••••••••"
					/>

					{#if serverError}
						<div
							class="animate-fade-in flex items-start gap-2 rounded-md bg-danger-500/10 px-3 py-2.5"
							role="alert"
						>
							<!-- Ícono de alerta -->
							<svg
								class="mt-0.5 h-4 w-4 shrink-0 text-danger-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
								/>
							</svg>
							<p class="text-sm text-danger-600">{serverError}</p>
						</div>
					{/if}

					<Button type="submit" variant="primary" loading={submitting} fullWidth>
						{submitting ? 'Verificando…' : 'Iniciar sesión'}
					</Button>
				</form>
			</Card>
		</div>

		<!-- Footer institucional -->
		<div class="animate-fade-in mt-8 text-center" style="animation-delay: 250ms;">
			<p class="text-xs text-neutral-400">
				Acceso exclusivo para personal autorizado del CSET.
			</p>
			<div class="mx-auto mt-3 flex items-center justify-center gap-1.5 text-neutral-300">
				<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
					/>
				</svg>
				<span class="text-[10px]">Conexión segura</span>
			</div>
		</div>
	</div>
</div>
