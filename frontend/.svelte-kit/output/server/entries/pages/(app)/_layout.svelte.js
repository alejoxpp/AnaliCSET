import "../../../chunks/index-server.js";
import "../../../chunks/shared2.js";
import { T as escape_html, a as derived, d as stringify, f as unsubscribe_stores, o as ensure_array_like, t as attr_class, u as store_get, w as attr } from "../../../chunks/server.js";
import { t as page } from "../../../chunks/state.js";
import "../../../chunks/navigation.js";
import { i as user } from "../../../chunks/auth.js";
//#region src/routes/(app)/AppSidebar.svelte
function AppSidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, onclose = () => {} } = $$props;
		const navItems = [
			{
				href: "/dashboard",
				label: "Dashboard",
				icon: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
			},
			{
				href: "/actas",
				label: "Consulta de actas",
				icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
			},
			{
				href: "/estadisticas",
				label: "Estadísticas",
				icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
			},
			{
				href: "/reportes",
				label: "Reportes",
				badge: "Próximamente",
				icon: "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m0 0a48.159 48.159 0 0 1 10.5 0m-10.5 0V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.659M9.75 21h4.5"
			}
		];
		function isActive(href) {
			return page.url.pathname === href || page.url.pathname.startsWith(href + "/");
		}
		if (open) $$renderer.push(`<!--[0--><div class="fixed inset-0 z-40 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden" role="presentation" aria-hidden="true"></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <aside${attr_class(`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary-900 text-white shadow-xl transition-transform duration-300 ease-in-out print:hidden lg:static lg:z-auto lg:w-60 lg:shrink-0 lg:shadow-none lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`)} aria-label="Navegación principal"><div class="flex items-center justify-between px-5 py-5"><a href="/dashboard" class="flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-white/20"><img src="/logo-icon.png" alt="" class="h-full w-full object-contain"/></div> <div><span class="font-heading text-base font-bold leading-tight tracking-tight text-white block">AnaliCSET</span> <span class="text-[10px] font-medium tracking-wide text-primary-200 block">SENA · CSET</span></div></a> <button type="button" class="rounded-lg p-1.5 text-primary-300 hover:bg-primary-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden" aria-label="Cerrar navegación"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="mx-4 border-t border-primary-800/80"></div> <nav class="flex-1 space-y-1 px-3 pt-4 overflow-y-auto"><!--[-->`);
		const each_array = ensure_array_like(navItems);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			const active = isActive(item.href);
			$$renderer.push(`<a${attr("href", item.href)}${attr("aria-current", active ? "page" : void 0)}${attr_class(`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 ${active ? "bg-primary-800/90 text-white shadow-sm ring-1 ring-primary-700/60" : "text-primary-200 hover:bg-primary-800/50 hover:text-white"}`)}>`);
			if (active) $$renderer.push(`<!--[0--><span class="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-wave" aria-hidden="true"></span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <svg${attr_class(`h-[18px] w-[18px] shrink-0 transition-colors ${active ? "text-accent-300" : "text-primary-400 group-hover:text-primary-200"}`)} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round"${attr("d", item.icon)}></path></svg> <span>${escape_html(item.label)}</span> `);
			if (item.badge) $$renderer.push(`<!--[0--><span class="ml-auto rounded-full bg-accent-400/20 px-2 py-0.5 text-[10px] font-medium text-accent-200">${escape_html(item.badge)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></a>`);
		}
		$$renderer.push(`<!--]--></nav> <div class="border-t border-primary-700/50 px-5 py-3"><p class="text-[10px] text-primary-400">AnaliCSET v0.1.0 · SENA CSET</p></div></aside>`);
	});
}
//#endregion
//#region src/routes/(app)/AppHeader.svelte
function AppHeader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { ontogglemenu = () => {} } = $$props;
		const sectionTitles = {
			"/dashboard": "Dashboard",
			"/actas": "Consulta de actas",
			"/estadisticas": "Estadísticas del Comité",
			"/reportes": "Reportes",
			"/patrones": "Patrones detectados"
		};
		const sectionTitle = derived(() => {
			const pathname = page.url.pathname;
			for (const [path, title] of Object.entries(sectionTitles)) if (pathname === path || pathname.startsWith(path + "/")) return title;
			return "AnaliCSET";
		});
		const initials = derived(() => {
			if (!store_get($$store_subs ??= {}, "$user", user)?.name) return "S";
			return store_get($$store_subs ??= {}, "$user", user).name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
		});
		$$renderer.push(`<header class="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 sm:px-6 print:hidden"><div class="flex items-center gap-2.5 min-w-0 flex-1 mr-2"><button type="button" class="inline-flex shrink-0 items-center justify-center rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 lg:hidden cursor-pointer" aria-label="Abrir menú de navegación"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg></button> <h1 class="font-heading text-base font-bold text-neutral-900 sm:text-xl truncate">${escape_html(sectionTitle())}</h1></div> <div class="flex items-center gap-3">`);
		if (store_get($$store_subs ??= {}, "$user", user)) $$renderer.push(`<!--[0--><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-800 ring-1 ring-primary-200"${attr("title", store_get($$store_subs ??= {}, "$user", user).name)}${attr("aria-label", `Perfil de ${stringify(store_get($$store_subs ??= {}, "$user", user).name)}`)}>${escape_html(initials())}</div> <div class="hidden text-right sm:block"><p class="text-sm font-semibold leading-tight text-neutral-900">${escape_html(store_get($$store_subs ??= {}, "$user", user).name)}</p> <p class="text-xs text-neutral-600">${escape_html(store_get($$store_subs ??= {}, "$user", user).role)}</p></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button type="button" class="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-danger-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer" aria-label="Cerrar sesión de usuario" title="Cerrar sesión"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"></path></svg> <span class="hidden sm:inline">Salir</span></button></div></header>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/routes/(app)/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		let sidebarOpen = false;
		$$renderer.push(`<div class="flex min-h-screen bg-neutral-50 print:bg-white">`);
		AppSidebar($$renderer, {
			open: sidebarOpen,
			onclose: () => sidebarOpen = false
		});
		$$renderer.push(`<!----> <div class="flex min-w-0 flex-1 flex-col">`);
		AppHeader($$renderer, { ontogglemenu: () => sidebarOpen = !sidebarOpen });
		$$renderer.push(`<!----> <main class="flex-1 px-4 py-5 sm:px-6 sm:py-6 print:p-0">`);
		children($$renderer);
		$$renderer.push(`<!----></main></div></div>`);
	});
}
//#endregion
export { _layout as default };
