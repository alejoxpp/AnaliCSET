import "../../chunks/server.js";
//#region src/routes/+page.svelte
function _page($$renderer) {
	$$renderer.push(`<p class="p-6 text-sm text-neutral-500">Redirigiendo…</p>`);
}
//#endregion
export { _page as default };
