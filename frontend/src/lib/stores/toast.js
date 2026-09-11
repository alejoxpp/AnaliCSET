import { writable } from 'svelte/store';

function createToastStore() {
	const { subscribe, update } = writable([]);
	let nextId = 0;

	function remove(id) {
		update((all) => all.filter((toast) => toast.id !== id));
	}

	function add(message, variant = 'neutral', duration = 4000) {
		const id = nextId++;
		update((all) => [...all, { id, message, variant }]);
		if (duration > 0) {
			setTimeout(() => remove(id), duration);
		}
		return id;
	}

	return { subscribe, add, remove };
}

export const toasts = createToastStore();
