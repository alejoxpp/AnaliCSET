import { writable } from 'svelte/store';

const STORAGE_KEY = 'analicset_theme';

/**
 * Lee el tema inicial: lo guardado por el usuario y, si nunca eligió,
 * la preferencia del sistema operativo. Debe coincidir con el script
 * inline de app.html, que aplica la clase antes del primer pintado.
 */
function readInitial() {
	if (typeof window === 'undefined') return 'light';
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'dark' || stored === 'light') return stored;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	} catch {
		return 'light';
	}
}

function apply(value) {
	if (typeof document === 'undefined') return;
	document.documentElement.classList.toggle('dark', value === 'dark');
	try {
		localStorage.setItem(STORAGE_KEY, value);
	} catch {
		// Modo incógnito o almacenamiento bloqueado: el tema sigue funcionando
		// en esta sesión, solo no se recuerda.
	}
}

function createThemeStore() {
	const { subscribe, set, update } = writable(readInitial());

	return {
		subscribe,
		set(value) {
			apply(value);
			set(value);
		},
		toggle() {
			update((current) => {
				const next = current === 'dark' ? 'light' : 'dark';
				apply(next);
				return next;
			});
		}
	};
}

export const theme = createThemeStore();
