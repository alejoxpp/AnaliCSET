import { T as escape_html, a as derived, d as stringify, o as ensure_array_like, s as head, t as attr_class, w as attr } from "../../../../chunks/server.js";
import "../../../../chunks/toast.js";
import { t as page } from "../../../../chunks/state.js";
import "../../../../chunks/navigation.js";
import { t as Card } from "../../../../chunks/Card.js";
import { t as Badge } from "../../../../chunks/Badge.js";
import "../../../../chunks/Button.js";
import "../../../../chunks/Skeleton.js";
//#region src/routes/(app)/actas/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const allActas = derived(() => data.actas);
		let filtroConsecutivo = page.url.searchParams.get("consecutivo") || "";
		let filtroFechaDesde = page.url.searchParams.get("desde") || "";
		let filtroFechaHasta = page.url.searchParams.get("hasta") || "";
		let filtroEstado = page.url.searchParams.get("estado") || "";
		let paginaActual = Number(page.url.searchParams.get("pagina")) || 1;
		const estadosUnicos = derived(() => [...new Set(allActas().map((a) => a.estado))].sort());
		const actasFiltradas = derived(() => {
			let resultado = allActas();
			if (filtroConsecutivo.trim()) {
				const q = filtroConsecutivo.trim().toLowerCase();
				resultado = resultado.filter((a) => a.consecutivo.toLowerCase().includes(q) || a.ficha && a.ficha.toLowerCase().includes(q));
			}
			if (filtroFechaDesde) resultado = resultado.filter((a) => a.fecha >= filtroFechaDesde);
			if (filtroFechaHasta) resultado = resultado.filter((a) => a.fecha <= filtroFechaHasta);
			if (filtroEstado) resultado = resultado.filter((a) => a.estado === filtroEstado);
			return resultado;
		});
		const PAGE_SIZE = 8;
		const totalPaginas = derived(() => Math.max(1, Math.ceil(actasFiltradas().length / PAGE_SIZE)));
		const actasPaginadas = derived(() => actasFiltradas().slice((paginaActual - 1) * PAGE_SIZE, paginaActual * PAGE_SIZE));
		const hayFiltrosActivos = derived(() => filtroConsecutivo.trim() !== "" || filtroFechaDesde !== "" || filtroFechaHasta !== "" || filtroEstado !== "");
		const dateFormatter = new Intl.DateTimeFormat("es-CO", {
			day: "2-digit",
			month: "short",
			year: "numeric"
		});
		function formatDate(isoDate) {
			return dateFormatter.format(/* @__PURE__ */ new Date(`${isoDate}T00:00:00`));
		}
		const estadoVariant = {
			Procesada: "success",
			"En revisión": "primary",
			Pendiente: "neutral"
		};
		head("32v6y6", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Consulta de actas · AnaliCSET</title>`);
			});
		});
		$$renderer.push(`<div class="animate-fade-in-up space-y-5"><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h2 class="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">Consulta de Actas CSET</h2> <p class="text-xs sm:text-sm text-neutral-600">Histórico de sesiones ordinarias y extraordinarias del Comité de Evaluación y Seguimiento.</p></div></div> `);
		Card($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<div class="flex flex-wrap items-end gap-4"><div class="flex min-w-[200px] flex-1 flex-col gap-1"><label for="filtro-consecutivo" class="text-xs font-semibold text-neutral-700">Consecutivo o ficha</label> <input id="filtro-consecutivo" type="text"${attr("value", filtroConsecutivo)} placeholder="Ej: CSET-2026-256 o 2758421" class="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"/></div> <div class="flex w-full sm:w-auto flex-col gap-1"><label for="filtro-desde" class="text-xs font-semibold text-neutral-700">Desde</label> <input id="filtro-desde" type="date"${attr("value", filtroFechaDesde)} class="w-full sm:w-auto rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"/></div> <div class="flex w-full sm:w-auto flex-col gap-1"><label for="filtro-hasta" class="text-xs font-semibold text-neutral-700">Hasta</label> <input id="filtro-hasta" type="date"${attr("value", filtroFechaHasta)} class="w-full sm:w-auto rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"/></div> <div class="flex w-full sm:w-auto flex-col gap-1"><label for="filtro-estado" class="text-xs font-semibold text-neutral-700">Estado</label> `);
				$$renderer.select({
					id: "filtro-estado",
					value: filtroEstado,
					class: "w-full sm:w-auto rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
				}, ($$renderer) => {
					$$renderer.option({ value: "" }, ($$renderer) => {
						$$renderer.push(`Todos`);
					});
					$$renderer.push(`<!--[-->`);
					const each_array = ensure_array_like(estadosUnicos());
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let estado = each_array[$$index];
						$$renderer.option({ value: estado }, ($$renderer) => {
							$$renderer.push(`${escape_html(estado)}`);
						});
					}
					$$renderer.push(`<!--]-->`);
				});
				$$renderer.push(`</div> `);
				if (hayFiltrosActivos()) $$renderer.push(`<!--[0--><button type="button" class="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:text-danger-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500 cursor-pointer" aria-label="Restablecer todos los filtros"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg> Limpiar filtros</button>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		Card($$renderer, {
			children: ($$renderer) => {
				if (actasFiltradas().length === 0) {
					$$renderer.push(`<!--[1--><div class="flex flex-col items-center justify-center py-12 text-center"><svg class="mb-3 h-12 w-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"></path></svg> <p class="text-sm font-medium text-neutral-600">No se encontraron actas con los criterios especificados</p> <p class="mt-1 text-xs text-neutral-400">`);
					if (hayFiltrosActivos()) $$renderer.push(`<!--[0-->Prueba modificando los filtros de búsqueda o <button type="button" class="text-primary-600 underline font-medium cursor-pointer">restablécelos todos</button>.`);
					else $$renderer.push(`<!--[-1-->No hay registros de actas en el sistema actualmente.`);
					$$renderer.push(`<!--]--></p></div>`);
				} else {
					$$renderer.push(`<!--[-1--><div class="mb-3 flex items-center justify-between"><p class="text-xs sm:text-sm text-neutral-500">${escape_html(actasFiltradas().length)} acta${escape_html(actasFiltradas().length !== 1 ? "s" : "")}
					${escape_html(hayFiltrosActivos() ? " encontradas" : " en total")}</p> <p class="text-xs text-neutral-400">Página ${escape_html(paginaActual)} de ${escape_html(totalPaginas())}</p></div> <div class="overflow-x-auto rounded-lg border border-neutral-200"><table class="w-full border-collapse text-left text-sm"><thead class="bg-neutral-50 text-xs font-semibold tracking-wide text-neutral-600 uppercase border-b border-neutral-200"><tr><th scope="col" class="px-4 py-3 font-semibold">Consecutivo</th><th scope="col" class="px-4 py-3 font-semibold">Ficha</th><th scope="col" class="px-4 py-3 font-semibold">Fecha</th><th scope="col" class="px-4 py-3 font-semibold">Estado</th><th scope="col" class="px-4 py-3 font-semibold text-right">Casos</th><th scope="col" class="px-4 py-3 font-semibold text-right">Acción</th></tr></thead><tbody class="divide-y divide-neutral-200 text-neutral-800"><!--[-->`);
					const each_array_1 = ensure_array_like(actasPaginadas());
					for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
						let acta = each_array_1[$$index_1];
						$$renderer.push(`<tr class="group transition-colors hover:bg-neutral-50/80 cursor-pointer"${attr("title", `Ver detalle del acta ${stringify(acta.consecutivo)}`)}><td class="px-4 py-3 font-bold text-primary-700 group-hover:underline">${escape_html(acta.consecutivo)}</td><td class="px-4 py-3 text-neutral-600"><span class="font-medium text-neutral-800">${escape_html(acta.ficha)}</span> `);
						if (acta.programa) $$renderer.push(`<!--[0--><span class="hidden md:inline text-xs text-neutral-400 block truncate max-w-xs">${escape_html(acta.programa)}</span>`);
						else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--></td><td class="px-4 py-3 text-neutral-600 whitespace-nowrap">${escape_html(formatDate(acta.fecha))}</td><td class="px-4 py-3">`);
						Badge($$renderer, {
							variant: estadoVariant[acta.estado] ?? "neutral",
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(acta.estado)}`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></td><td class="px-4 py-3 text-right"><span class="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-neutral-100 px-2 text-xs font-bold text-neutral-800">${escape_html(acta.totalCasos)}</span></td><td class="px-4 py-3 text-right"><button type="button" class="inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-semibold text-primary-700 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"${attr("aria-label", `Ver detalle del acta ${stringify(acta.consecutivo)}`)}>Ver detalle <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg></button></td></tr>`);
					}
					$$renderer.push(`<!--]--></tbody></table></div> `);
					if (totalPaginas() > 1) {
						$$renderer.push(`<!--[0--><nav class="mt-4 flex flex-wrap items-center justify-center gap-1 sm:gap-2" aria-label="Paginación de resultados"><button type="button"${attr("disabled", paginaActual <= 1, true)} class="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer" aria-label="Página anterior"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg> <span class="hidden sm:inline">Anterior</span></button> <!--[-->`);
						const each_array_2 = ensure_array_like(Array.from({ length: totalPaginas() }, (_, i) => i + 1));
						for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
							let pagina = each_array_2[$$index_2];
							$$renderer.push(`<button type="button"${attr_class(`inline-flex h-8 w-8 items-center justify-center rounded-md text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer ${pagina === paginaActual ? "bg-primary-600 text-white shadow-xs" : "text-neutral-700 hover:bg-neutral-100"}`)}${attr("aria-label", `Ir a página ${stringify(pagina)}`)}${attr("aria-current", pagina === paginaActual ? "page" : void 0)}>${escape_html(pagina)}</button>`);
						}
						$$renderer.push(`<!--]--> <button type="button"${attr("disabled", paginaActual >= totalPaginas(), true)} class="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer" aria-label="Página siguiente"><span class="hidden sm:inline">Siguiente</span> <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg></button></nav>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]-->`);
				}
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _page as default };
