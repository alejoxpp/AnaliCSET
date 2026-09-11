import { getDashboardSummary } from '$lib/api/dashboard.js';

export async function load() {
	const summary = await getDashboardSummary();
	return { summary };
}
