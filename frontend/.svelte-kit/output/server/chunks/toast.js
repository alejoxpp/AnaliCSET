import { n as writable } from "./shared2.js";
import "./index-server2.js";
//#region src/lib/stores/toast.js
function createToastStore() {
	const { subscribe, update } = writable([]);
	let nextId = 0;
	function remove(id) {
		update((all) => all.filter((toast) => toast.id !== id));
	}
	function add(message, variant = "neutral", duration = 4e3) {
		const id = nextId++;
		update((all) => [...all, {
			id,
			message,
			variant
		}]);
		if (duration > 0) setTimeout(() => remove(id), duration);
		return id;
	}
	return {
		subscribe,
		add,
		remove
	};
}
var toasts = createToastStore();
//#endregion
export { toasts as t };
