import type { ExpedienteCase } from '../types';

export function categoriaBadge(categoria: ExpedienteCase['categoria']): string {
	switch (categoria) {
		case 'Académica':
			return 'bg-[#d5e3ff] dark:bg-blue-950/60 text-[#001c3b] dark:text-blue-300 border border-blue-200 dark:border-blue-800';
		case 'Inasistencia':
			return 'bg-[#ffdad6] dark:bg-red-950/60 text-[#ba1a1a] dark:text-red-400 border border-red-200 dark:border-red-800';
		case 'Convivencia':
			return 'bg-[#e0e3e5] dark:bg-slate-800 text-[#191c1e] dark:text-slate-300 border border-slate-300 dark:border-slate-700';
	}
}

export function categoriaDot(categoria: ExpedienteCase['categoria']): string {
	switch (categoria) {
		case 'Académica':
			return 'bg-blue-600 dark:bg-blue-400';
		case 'Inasistencia':
			return 'bg-amber-600 dark:bg-amber-400';
		case 'Convivencia':
			return 'bg-purple-600 dark:bg-purple-400';
	}
}

export function estadoBadge(estado: ExpedienteCase['estado']): string {
	switch (estado) {
		case 'Plan Vigente':
		case 'Superado':
			return 'bg-[#e1ffec] dark:bg-emerald-950/60 text-[#008259] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
		case 'Condicionamiento':
			return 'bg-[#ffdad6] dark:bg-amber-950/60 text-[#ba1a1a] dark:text-amber-400 border border-amber-200 dark:border-amber-800';
		case 'Cancelación':
			return 'bg-[#ffdad6] dark:bg-red-950/60 text-[#93000a] dark:text-red-400 border border-red-200 dark:border-red-800';
		case 'Archivado':
			return 'bg-[#e0e3e5] dark:bg-slate-800 text-[#424656] dark:text-slate-300 border border-slate-300 dark:border-slate-700';
	}
}
