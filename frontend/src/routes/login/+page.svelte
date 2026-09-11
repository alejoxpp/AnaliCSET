<script>
	import { goto } from '$app/navigation';
	import { login } from '$lib/api/auth.js';
	import { setSession } from '$lib/stores/auth.js';
	import Card from '$lib/components/Card.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	let email = $state('');
	let password = $state('');
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
</script>

<svelte:head>
	<title>Iniciar sesión · AnaliCSET</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-10">
	<div class="w-full max-w-sm">
		<div class="mb-6 text-center">
			<div
				class="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-700 font-heading text-lg font-semibold text-white"
			>
				CS
			</div>
			<h1 class="mt-3 font-heading text-2xl font-semibold text-neutral-900">AnaliCSET</h1>
			<p class="text-sm text-neutral-500">SENA · Comité de Evaluación y Seguimiento</p>
		</div>

		<Card>
			<form class="space-y-4" onsubmit={handleSubmit} novalidate>
				<Input
					label="Correo institucional"
					type="email"
					bind:value={email}
					error={emailError}
					required
					autocomplete="username"
				/>
				<Input
					label="Contraseña"
					type="password"
					bind:value={password}
					error={passwordError}
					required
					autocomplete="current-password"
				/>

				{#if serverError}
					<p class="rounded-md bg-danger-500/10 px-3 py-2 text-sm text-danger-600" role="alert">
						{serverError}
					</p>
				{/if}

				<Button type="submit" variant="primary" loading={submitting} fullWidth>
					Iniciar sesión
				</Button>
			</form>
		</Card>

		<p class="mt-6 text-center text-xs text-neutral-400">
			Acceso exclusivo para personal autorizado del CSET.
		</p>
	</div>
</div>
