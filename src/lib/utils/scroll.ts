export function scrollToAnchor(anchor: string, fallbackTop = true): void {
	if (typeof window === 'undefined' || typeof document === 'undefined') return;
	const element = document.getElementById(anchor);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	} else if (fallbackTop) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
}

export function scrollToTop(): void {
	if (typeof window === 'undefined') return;
	window.scrollTo({ top: 0, behavior: 'smooth' });
}
