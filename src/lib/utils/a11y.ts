export function announce(message: string): void {
	if (typeof document === 'undefined') return;
	const el = document.getElementById('a11y-announcer');
	if (!el) return;
	el.textContent = '';
	window.setTimeout(() => {
		el.textContent = message;
	}, 30);
}

export function trapTabKey(e: KeyboardEvent, container: HTMLElement): void {
	if (e.key !== 'Tab') return;
	const focusables = container.querySelectorAll<HTMLElement>(
		'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
	);
	const list = Array.from(focusables).filter((el) => el.offsetParent !== null);
	if (list.length === 0) {
		e.preventDefault();
		return;
	}
	const first = list[0];
	const last = list[list.length - 1];
	const active = document.activeElement as HTMLElement | null;
	if (e.shiftKey && (active === first || !container.contains(active))) {
		e.preventDefault();
		last.focus();
	} else if (!e.shiftKey && active === last) {
		e.preventDefault();
		first.focus();
	}
}

export function focusFirst(container: HTMLElement): void {
	const target = container.querySelector<HTMLElement>(
		'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
	);
	target?.focus();
}
