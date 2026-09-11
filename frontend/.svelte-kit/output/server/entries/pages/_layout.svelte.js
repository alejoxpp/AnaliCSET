import { T as escape_html, d as stringify, f as unsubscribe_stores, o as ensure_array_like, s as head, t as attr_class, u as store_get, w as attr } from "../../chunks/server.js";
import { t as toasts } from "../../chunks/toast.js";
//#region src/lib/assets/favicon.svg
var favicon_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='128'%20height='128'%20viewBox='0%200%20128%20128'%3e%3cdefs%3e%3clinearGradient%20id='wave'%20x1='0'%20y1='0.5'%20x2='1'%20y2='0.5'%3e%3cstop%20offset='0%25'%20stop-color='%234DD0E1'/%3e%3cstop%20offset='50%25'%20stop-color='%2300C853'/%3e%3cstop%20offset='100%25'%20stop-color='%232E7D32'/%3e%3c/linearGradient%3e%3clinearGradient%20id='sparkle'%20x1='0.5'%20y1='0'%20x2='0.5'%20y2='1'%3e%3cstop%20offset='0%25'%20stop-color='%2300E676'/%3e%3cstop%20offset='100%25'%20stop-color='%2300C853'/%3e%3c/linearGradient%3e%3c/defs%3e%3c!--%20Speech%20bubble%20--%3e%3cpath%20d='M16%2024C16%2015.16%2023.16%208%2032%208h64c8.84%200%2016%207.16%2016%2016v48c0%208.84-7.16%2016-16%2016H56l-20%2020v-20H32c-8.84%200-16-7.16-16-16V24Z'%20fill='none'%20stroke='%231E88E5'%20stroke-width='8'%20stroke-linejoin='round'/%3e%3c!--%20Wave%20(analysis%20line)%20--%3e%3cpath%20d='M30%2064%20L46%2064%20L54%2044%20L64%2076%20L74%2052%20L82%2064%20L98%2064'%20fill='none'%20stroke='url(%23wave)'%20stroke-width='5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c!--%20Sparkle%20star%20(IA)%20--%3e%3cpath%20d='M96%2020%20L98%2028%20L106%2030%20L98%2032%20L96%2040%20L94%2032%20L86%2030%20L94%2028%20Z'%20fill='url(%23sparkle)'/%3e%3c/svg%3e";
//#endregion
//#region src/lib/components/Toast.svelte
function Toast($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const variantClasses = {
			neutral: "bg-neutral-800 text-white",
			primary: "bg-primary-700 text-white",
			success: "bg-success-500 text-white",
			danger: "bg-danger-500 text-white",
			accent: "bg-accent-400 text-neutral-900"
		};
		$$renderer.push(`<div class="pointer-events-none fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"><!--[-->`);
		const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$toasts", toasts));
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let toast = each_array[$$index];
			$$renderer.push(`<div${attr_class(`pointer-events-auto flex items-start justify-between gap-3 rounded-lg px-4 py-3 text-sm shadow-lg ${stringify(variantClasses[toast.variant] ?? variantClasses.neutral)}`)} role="status"><span>${escape_html(toast.message)}</span> <button type="button" class="shrink-0 text-white/80 hover:text-white" aria-label="Cerrar notificación">×</button></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	let { children } = $$props;
	head("12qhfyh", $$renderer, ($$renderer) => {
		$$renderer.push(`<link rel="icon"${attr("href", favicon_default)}/>`);
	});
	children($$renderer);
	$$renderer.push(`<!----> `);
	Toast($$renderer, {});
	$$renderer.push(`<!---->`);
}
//#endregion
export { _layout as default };
