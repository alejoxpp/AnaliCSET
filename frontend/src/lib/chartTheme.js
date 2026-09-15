/**
 * Colores de Chart.js según el tema activo. Los gráficos se dibujan en
 * canvas, así que no heredan las variantes `dark:` de Tailwind: hay que
 * pasarles los colores explícitamente y recalcularlos al cambiar el tema.
 */
export function chartTheme(isDark) {
	return {
		grid: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
		tick: isDark ? '#94a3b8' : '#64748b',
		legend: isDark ? '#cbd5e1' : '#475569',
		tooltipBg: isDark ? 'rgba(2, 6, 23, 0.96)' : 'rgba(15, 23, 42, 0.95)',
		/** Borde entre segmentos (doughnut): debe igualar el fondo de la tarjeta. */
		surface: isDark ? '#0f172a' : '#ffffff'
	};
}
