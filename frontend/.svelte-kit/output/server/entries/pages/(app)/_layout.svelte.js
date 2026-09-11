import { C as attr, a as ensure_array_like, d as unsubscribe_stores, l as store_get, t as attr_class, w as escape_html } from "../../../chunks/server.js";
import { t as goto } from "../../../chunks/client.js";
import { t as page } from "../../../chunks/state.js";
import "../../../chunks/navigation.js";
import { t as Button } from "../../../chunks/Button.js";
import { i as user, t as clearSession } from "../../../chunks/auth.js";
//#region src/routes/(app)/AppSidebar.svelte
function AppSidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const navItems = [
			{
				href: "/dashboard",
				label: "Dashboard"
			},
			{
				href: "/actas",
				label: "Consulta de actas"
			},
			{
				href: "/estadisticas",
				label: "Estadísticas"
			},
			{
				href: "/reportes",
				label: "Reportes",
				badge: "Próximamente"
			}
		];
		$$renderer.push(`<aside class="flex w-60 shrink-0 flex-col bg-primary-900 text-white"><div class="px-5 py-5"><p class="font-heading text-lg font-semibold">AnaliCSET</p> <p class="text-xs text-primary-200">SENA · CSET</p></div> <nav class="flex-1 space-y-1 px-3"><!--[-->`);
		const each_array = ensure_array_like(navItems);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<a${attr("href", item.href)}${attr_class(`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${page.url.pathname.startsWith(item.href) ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-800"}`)}><span>${escape_html(item.label)}</span> `);
			if (item.badge) $$renderer.push(`<!--[0--><span class="rounded-full bg-accent-400/20 px-2 py-0.5 text-[10px] font-medium text-accent-200">${escape_html(item.badge)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></a>`);
		}
		$$renderer.push(`<!--]--></nav></aside>`);
	});
}
//#endregion
//#region src/routes/(app)/AppHeader.svelte
function AppHeader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		function handleLogout() {
			clearSession();
			goto("/login");
		}
		$$renderer.push(`<header class="flex items-center justify-end gap-4 border-b border-neutral-200 bg-white px-6 py-4">`);
		if (store_get($$store_subs ??= {}, "$user", user)) $$renderer.push(`<!--[0--><div class="text-right"><p class="text-sm font-medium text-neutral-900">${escape_html(store_get($$store_subs ??= {}, "$user", user).name)}</p> <p class="text-xs text-neutral-500">${escape_html(store_get($$store_subs ??= {}, "$user", user).role)}</p></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		Button($$renderer, {
			variant: "secondary",
			onclick: handleLogout,
			children: ($$renderer) => {
				$$renderer.push(`<!---->Cerrar sesión`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></header>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/routes/(app)/+layout.svelte
function _layout($$renderer, $$props) {
	let { children } = $$props;
	$$renderer.push(`<div class="flex min-h-screen bg-neutral-50">`);
	AppSidebar($$renderer, {});
	$$renderer.push(`<!----> <div class="flex flex-1 flex-col">`);
	AppHeader($$renderer, {});
	$$renderer.push(`<!----> <main class="flex-1 px-6 py-6">`);
	children($$renderer);
	$$renderer.push(`<!----></main></div></div>`);
}
//#endregion
export { _layout as default };
