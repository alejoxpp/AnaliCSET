import { d as stringify, t as attr_class } from "./server.js";
//#region src/lib/components/Badge.svelte
function Badge($$renderer, $$props) {
	let { variant = "neutral", children } = $$props;
	const variantClasses = {
		neutral: "bg-neutral-500/10 text-neutral-700 dark:bg-neutral-400/15 dark:text-neutral-300",
		primary: "bg-primary-500/10 text-primary-700 dark:bg-primary-400/15 dark:text-primary-300",
		success: "bg-success-500/10 text-success-600 dark:bg-success-500/15 dark:text-success-500",
		danger: "bg-danger-500/10 text-danger-600 dark:bg-danger-500/15 dark:text-danger-500",
		accent: "bg-accent-400/15 text-accent-600 dark:bg-accent-400/15 dark:text-accent-400"
	};
	$$renderer.push(`<span${attr_class(`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${stringify(variantClasses[variant] ?? variantClasses.neutral)}`)}>`);
	children?.($$renderer);
	$$renderer.push(`<!----></span>`);
}
//#endregion
export { Badge as t };
