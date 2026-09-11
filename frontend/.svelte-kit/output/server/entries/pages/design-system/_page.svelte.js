import { T as escape_html, a as derived, c as props_id, d as stringify, i as bind_props, o as ensure_array_like, r as attributes, s as head, t as attr_class, w as attr } from "../../../chunks/server.js";
import { t as toasts } from "../../../chunks/toast.js";
import { t as Card } from "../../../chunks/Card.js";
import { t as Badge } from "../../../chunks/Badge.js";
import { n as Spinner, t as Button } from "../../../chunks/Button.js";
import { t as Skeleton } from "../../../chunks/Skeleton.js";
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
//#region src/lib/components/Table.svelte
function Table($$renderer, $$props) {
	let { caption = "", head, children } = $$props;
	$$renderer.push(`<div class="overflow-x-auto rounded-lg border border-neutral-200"><table class="w-full border-collapse text-left text-sm">`);
	if (caption) $$renderer.push(`<!--[0--><caption class="sr-only">${escape_html(caption)}</caption>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--><thead class="bg-neutral-50 text-xs font-medium tracking-wide text-neutral-600 uppercase">`);
	head?.($$renderer);
	$$renderer.push(`<!----></thead><tbody class="divide-y divide-neutral-200 text-neutral-800">`);
	children?.($$renderer);
	$$renderer.push(`<!----></tbody></table></div>`);
}
//#endregion
//#region src/routes/design-system/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let nombre = "";
		let buttonLoading = false;
		function simulateLoading() {
			buttonLoading = true;
			setTimeout(() => buttonLoading = false, 1500);
		}
		const primaryShades = [
			{
				label: "50",
				class: "bg-primary-50"
			},
			{
				label: "100",
				class: "bg-primary-100"
			},
			{
				label: "200",
				class: "bg-primary-200"
			},
			{
				label: "300",
				class: "bg-primary-300"
			},
			{
				label: "400",
				class: "bg-primary-400"
			},
			{
				label: "500",
				class: "bg-primary-500"
			},
			{
				label: "600",
				class: "bg-primary-600"
			},
			{
				label: "700",
				class: "bg-primary-700"
			},
			{
				label: "800",
				class: "bg-primary-800"
			},
			{
				label: "900",
				class: "bg-primary-900"
			}
		];
		const neutralShades = [
			{
				label: "50",
				class: "bg-neutral-50"
			},
			{
				label: "100",
				class: "bg-neutral-100"
			},
			{
				label: "200",
				class: "bg-neutral-200"
			},
			{
				label: "300",
				class: "bg-neutral-300"
			},
			{
				label: "400",
				class: "bg-neutral-400"
			},
			{
				label: "500",
				class: "bg-neutral-500"
			},
			{
				label: "600",
				class: "bg-neutral-600"
			},
			{
				label: "700",
				class: "bg-neutral-700"
			},
			{
				label: "800",
				class: "bg-neutral-800"
			},
			{
				label: "900",
				class: "bg-neutral-900"
			}
		];
		const accentShades = [
			{
				label: "50",
				class: "bg-accent-50"
			},
			{
				label: "100",
				class: "bg-accent-100"
			},
			{
				label: "200",
				class: "bg-accent-200"
			},
			{
				label: "300",
				class: "bg-accent-300"
			},
			{
				label: "400",
				class: "bg-accent-400"
			},
			{
				label: "500",
				class: "bg-accent-500"
			},
			{
				label: "600",
				class: "bg-accent-600"
			},
			{
				label: "700",
				class: "bg-accent-700"
			}
		];
		const semanticShades = [
			{
				label: "success 500",
				class: "bg-success-500"
			},
			{
				label: "success 600",
				class: "bg-success-600"
			},
			{
				label: "danger 500",
				class: "bg-danger-500"
			},
			{
				label: "danger 600",
				class: "bg-danger-600"
			}
		];
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1nlqszj", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Sistema de diseño · AnaliCSET</title>`);
				});
			});
			$$renderer.push(`<div class="mx-auto max-w-5xl space-y-14 px-6 py-10"><header><h1 class="font-heading text-3xl font-semibold text-neutral-900">Sistema de diseño</h1> <p class="mt-2 text-neutral-600">Componentes base de AnaliCSET. Revísalos aquí antes de construir pantallas reales.</p></header> <section class="space-y-4"><h2 class="font-heading text-xl font-semibold text-neutral-900">Paleta</h2> <div class="grid grid-cols-2 gap-6 sm:grid-cols-4"><div class="space-y-1"><p class="text-sm font-medium text-neutral-700">Primary</p> <div class="overflow-hidden rounded-md border border-neutral-200"><!--[-->`);
			const each_array = ensure_array_like(primaryShades);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let shade = each_array[$$index];
				$$renderer.push(`<div${attr_class(`flex h-6 items-center px-2 text-[10px] text-white/90 ${stringify(shade.class)}`)}>${escape_html(shade.label)}</div>`);
			}
			$$renderer.push(`<!--]--></div></div> <div class="space-y-1"><p class="text-sm font-medium text-neutral-700">Neutral</p> <div class="overflow-hidden rounded-md border border-neutral-200"><!--[-->`);
			const each_array_1 = ensure_array_like(neutralShades);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let shade = each_array_1[$$index_1];
				$$renderer.push(`<div${attr_class(`flex h-6 items-center px-2 text-[10px] text-white/90 ${stringify(shade.class)}`)}>${escape_html(shade.label)}</div>`);
			}
			$$renderer.push(`<!--]--></div></div> <div class="space-y-1"><p class="text-sm font-medium text-neutral-700">Accent (solo IA/patrones)</p> <div class="overflow-hidden rounded-md border border-neutral-200"><!--[-->`);
			const each_array_2 = ensure_array_like(accentShades);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let shade = each_array_2[$$index_2];
				$$renderer.push(`<div${attr_class(`flex h-6 items-center px-2 text-[10px] text-white/90 ${stringify(shade.class)}`)}>${escape_html(shade.label)}</div>`);
			}
			$$renderer.push(`<!--]--></div></div> <div class="space-y-1"><p class="text-sm font-medium text-neutral-700">Semantic</p> <div class="overflow-hidden rounded-md border border-neutral-200"><!--[-->`);
			const each_array_3 = ensure_array_like(semanticShades);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let shade = each_array_3[$$index_3];
				$$renderer.push(`<div${attr_class(`flex h-6 items-center px-2 text-[10px] text-white/90 ${stringify(shade.class)}`)}>${escape_html(shade.label)}</div>`);
			}
			$$renderer.push(`<!--]--></div></div></div></section> <section class="space-y-3"><h2 class="font-heading text-xl font-semibold text-neutral-900">Tipografía</h2> <div class="space-y-2 rounded-lg border border-neutral-200 bg-white p-5"><p class="font-heading text-2xl font-semibold">Fraunces — Títulos (font-heading)</p> <p class="font-body text-base text-neutral-700">Public Sans — Texto de cuerpo (font-body). Diseñada para comunicaciones de gobierno: seria,
				legible y sin el aire genérico de una fuente de plantilla.</p></div></section> <section class="space-y-3"><h2 class="font-heading text-xl font-semibold text-neutral-900">Button</h2> <div class="flex flex-wrap items-center gap-3 rounded-lg border border-neutral-200 bg-white p-5">`);
			Button($$renderer, {
				variant: "primary",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Primario`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "secondary",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Secundario`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "danger",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Peligro`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "primary",
				disabled: true,
				children: ($$renderer) => {
					$$renderer.push(`<!---->Deshabilitado`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "primary",
				loading: buttonLoading,
				onclick: simulateLoading,
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(buttonLoading ? "Cargando..." : "Simular carga")}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div></section> <section class="space-y-3"><h2 class="font-heading text-xl font-semibold text-neutral-900">Input</h2> <div class="grid gap-4 rounded-lg border border-neutral-200 bg-white p-5 sm:grid-cols-3">`);
			Input($$renderer, {
				label: "Nombre",
				placeholder: "Escribe tu nombre",
				get value() {
					return nombre;
				},
				set value($$value) {
					nombre = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				label: "Correo",
				type: "email",
				error: "Este campo es obligatorio"
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				label: "Deshabilitado",
				value: "No editable",
				disabled: true
			});
			$$renderer.push(`<!----></div></section> <section class="space-y-3"><h2 class="font-heading text-xl font-semibold text-neutral-900">Card</h2> <div class="grid gap-4 sm:grid-cols-2">`);
			Card($$renderer, {
				title: "Acta CSET N.º 014",
				children: ($$renderer) => {
					$$renderer.push(`<p class="text-sm text-neutral-600">Comité de Evaluación y Seguimiento — sesión ordinaria. 12 casos revisados.</p>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			{
				function children($$renderer) {
					$$renderer.push(`<p class="text-sm text-neutral-600">Contenido de la tarjeta.</p>`);
				}
				function footer($$renderer) {
					Button($$renderer, {
						variant: "secondary",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Ver detalle`);
						},
						$$slots: { default: true }
					});
				}
				Card($$renderer, {
					title: "Con pie de página",
					children,
					footer,
					$$slots: {
						default: true,
						footer: true
					}
				});
			}
			$$renderer.push(`<!----></div></section> <section class="space-y-3"><h2 class="font-heading text-xl font-semibold text-neutral-900">Badge</h2> <div class="flex flex-wrap gap-2 rounded-lg border border-neutral-200 bg-white p-5">`);
			Badge($$renderer, {
				variant: "neutral",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Pendiente`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				variant: "primary",
				children: ($$renderer) => {
					$$renderer.push(`<!---->En trámite`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				variant: "success",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Resuelto`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				variant: "danger",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Vencido`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				variant: "accent",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Patrón detectado por IA`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div></section> <section class="space-y-3"><h2 class="font-heading text-xl font-semibold text-neutral-900">Table</h2> `);
			{
				function head($$renderer) {
					$$renderer.push(`<tr><th class="px-4 py-3">Caso</th><th class="px-4 py-3">Aprendiz</th><th class="px-4 py-3">Estado</th></tr>`);
				}
				function children($$renderer) {
					$$renderer.push(`<tr><td class="px-4 py-3">CSET-2026-014</td><td class="px-4 py-3">Juan Pérez</td><td class="px-4 py-3">`);
					Badge($$renderer, {
						variant: "success",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Resuelto`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></td></tr> <tr><td class="px-4 py-3">CSET-2026-015</td><td class="px-4 py-3">Ana Gómez</td><td class="px-4 py-3">`);
					Badge($$renderer, {
						variant: "accent",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Patrón detectado`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></td></tr>`);
				}
				Table($$renderer, {
					caption: "Casos recientes del CSET",
					head,
					children,
					$$slots: {
						head: true,
						default: true
					}
				});
			}
			$$renderer.push(`<!----></section> <section class="space-y-3"><h2 class="font-heading text-xl font-semibold text-neutral-900">Spinner</h2> <div class="flex items-center gap-6 rounded-lg border border-neutral-200 bg-white p-5">`);
			Spinner($$renderer, { size: "sm" });
			$$renderer.push(`<!----> `);
			Spinner($$renderer, { size: "md" });
			$$renderer.push(`<!----> `);
			Spinner($$renderer, { size: "lg" });
			$$renderer.push(`<!----></div></section> <section class="space-y-3"><h2 class="font-heading text-xl font-semibold text-neutral-900">Toast</h2> <div class="flex flex-wrap gap-3 rounded-lg border border-neutral-200 bg-white p-5">`);
			Button($$renderer, {
				variant: "secondary",
				onclick: () => toasts.add("Cambios guardados", "success"),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Éxito`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "secondary",
				onclick: () => toasts.add("No se pudo guardar", "danger"),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Error`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "secondary",
				onclick: () => toasts.add("La IA detectó un patrón nuevo", "accent"),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Alerta IA`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div></section> <section class="space-y-3"><h2 class="font-heading text-xl font-semibold text-neutral-900">Skeleton (Estados de carga)</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
			Skeleton($$renderer, { type: "card" });
			$$renderer.push(`<!----> `);
			Skeleton($$renderer, {
				type: "table",
				lines: 3
			});
			$$renderer.push(`<!----></div></section></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
export { _page as default };
