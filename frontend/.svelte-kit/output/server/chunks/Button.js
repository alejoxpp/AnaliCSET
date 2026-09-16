import { T as escape_html, d as stringify, r as attributes, t as attr_class, w as attr } from "./server.js";
//#region src/lib/components/Card.svelte
function Card($$renderer, $$props) {
	let { title = "", children, footer, class: className = "" } = $$props;
	$$renderer.push(`<div${attr_class(`print-block rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 ${stringify(className)}`)}>`);
	if (title) $$renderer.push(`<!--[0--><div class="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800"><h3 class="font-heading text-base font-semibold text-neutral-900 dark:text-neutral-50">${escape_html(title)}</h3></div>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> <div class="px-5 py-4">`);
	children?.($$renderer);
	$$renderer.push(`<!----></div> `);
	if (footer) {
		$$renderer.push(`<!--[0--><div class="border-t border-neutral-200 bg-neutral-50 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-800/50">`);
		footer($$renderer);
		$$renderer.push(`<!----></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div>`);
}
//#endregion
//#region src/lib/components/Spinner.svelte
function Spinner($$renderer, $$props) {
	let { size = "md", tone = "primary", label = "Cargando" } = $$props;
	const sizeClasses = {
		sm: "h-4 w-4 border-2",
		md: "h-6 w-6 border-2",
		lg: "h-10 w-10 border-[3px]"
	};
	const toneClasses = {
		primary: "border-neutral-300 border-t-primary-600 dark:border-neutral-700 dark:border-t-primary-400",
		white: "border-white/30 border-t-white"
	};
	$$renderer.push(`<span${attr_class(`inline-block animate-spin rounded-full ${stringify(sizeClasses[size] ?? sizeClasses.md)} ${stringify(toneClasses[tone] ?? toneClasses.primary)}`)} role="status"${attr("aria-label", label)}></span>`);
}
//#endregion
//#region src/lib/components/Button.svelte
function Button($$renderer, $$props) {
	let { variant = "primary", type = "button", disabled = false, loading = false, fullWidth = false, children, $$slots, $$events, ...rest } = $$props;
	const variantClasses = {
		primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600",
		secondary: "bg-white text-primary-700 border border-primary-300 hover:bg-primary-50 focus-visible:outline-primary-600 dark:bg-neutral-900 dark:text-primary-300 dark:border-neutral-700 dark:hover:bg-neutral-800",
		danger: "bg-danger-500 text-white hover:bg-danger-600 focus-visible:outline-danger-500"
	};
	$$renderer.push(`<button${attributes({
		type,
		disabled: disabled || loading,
		class: `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${fullWidth ? "w-full" : ""} ${stringify(variantClasses[variant] ?? variantClasses.primary)}`,
		...rest
	})}>`);
	if (loading) {
		$$renderer.push("<!--[0-->");
		Spinner($$renderer, {
			size: "sm",
			tone: variant === "secondary" ? "primary" : "white"
		});
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> `);
	children?.($$renderer);
	$$renderer.push(`<!----></button>`);
}
//#endregion
export { Spinner as n, Card as r, Button as t };
