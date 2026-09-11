import { T as escape_html, d as stringify, t as attr_class } from "./server.js";
//#region src/lib/components/Card.svelte
function Card($$renderer, $$props) {
	let { title = "", children, footer, class: className = "" } = $$props;
	$$renderer.push(`<div${attr_class(`rounded-lg border border-neutral-200 bg-white shadow-sm ${stringify(className)}`)}>`);
	if (title) $$renderer.push(`<!--[0--><div class="border-b border-neutral-200 px-5 py-4"><h3 class="font-heading text-base font-semibold text-neutral-900">${escape_html(title)}</h3></div>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> <div class="px-5 py-4">`);
	children?.($$renderer);
	$$renderer.push(`<!----></div> `);
	if (footer) {
		$$renderer.push(`<!--[0--><div class="border-t border-neutral-200 bg-neutral-50 px-5 py-3">`);
		footer($$renderer);
		$$renderer.push(`<!----></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div>`);
}
//#endregion
export { Card as t };
