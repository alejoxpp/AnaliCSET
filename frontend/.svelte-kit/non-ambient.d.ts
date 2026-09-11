
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(app)" | "/" | "/(app)/actas" | "/(app)/actas/[id]" | "/(app)/dashboard" | "/design-system" | "/(app)/estadisticas" | "/login" | "/(app)/patrones" | "/(app)/patrones/[id]" | "/(app)/reportes";
		RouteParams(): {
			"/(app)/actas/[id]": { id: string };
			"/(app)/patrones/[id]": { id: string }
		};
		LayoutParams(): {
			"/(app)": { id?: string | undefined };
			"/": { id?: string | undefined };
			"/(app)/actas": { id?: string | undefined };
			"/(app)/actas/[id]": { id: string };
			"/(app)/dashboard": Record<string, never>;
			"/design-system": Record<string, never>;
			"/(app)/estadisticas": Record<string, never>;
			"/login": Record<string, never>;
			"/(app)/patrones": { id?: string | undefined };
			"/(app)/patrones/[id]": { id: string };
			"/(app)/reportes": Record<string, never>
		};
		Pathname(): "/" | "/actas" | `/actas/${string}` & {} | "/dashboard" | "/design-system" | "/estadisticas" | "/login" | `/patrones/${string}` & {} | "/reportes";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | "/favicon.png" | "/logo-icon.png" | "/logo.png" | "/robots.txt" | string & {};
	}
}