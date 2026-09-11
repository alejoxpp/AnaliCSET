import { C as attr, i as derived, n as attributes, r as bind_props, s as props_id, u as stringify, w as escape_html } from "./server.js";
//#region src/lib/components/Input.svelte
function Input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { label = "", type = "text", value = "", error = "", disabled = false, required = false, id, $$slots, $$events, ...rest } = $$props;
		const inputId = derived(() => id ?? uid);
		$$renderer.push(`<div class="flex flex-col gap-1">`);
		if (label) {
			$$renderer.push(`<!--[0--><label${attr("for", inputId())} class="text-sm font-medium text-neutral-700">${escape_html(label)} `);
			if (required) $$renderer.push(`<!--[0--><span class="text-danger-500">*</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></label>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <input${attributes({
			id: inputId(),
			type,
			disabled,
			required,
			value,
			"aria-invalid": error ? "true" : void 0,
			"aria-describedby": error ? `${inputId()}-error` : void 0,
			class: `rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-neutral-100 ${error ? "border-danger-500 focus:ring-danger-500" : "border-neutral-300 focus:ring-primary-500"}`,
			...rest
		}, void 0, void 0, void 0, 4)}/> `);
		if (error) $$renderer.push(`<!--[0--><p${attr("id", `${stringify(inputId())}-error`)} class="text-sm text-danger-500">${escape_html(error)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
export { Input as t };
