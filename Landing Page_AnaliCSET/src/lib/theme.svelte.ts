export type ThemeMode = 'light' | 'dark' | 'contrast';

const STORAGE_KEY = 'anali_theme_mode';

class ThemeState {
  current = $state<ThemeMode>('light');

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (saved === 'light' || saved === 'dark' || saved === 'contrast') {
        this.current = saved;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.current = 'dark';
      }
      this.applyDom();
    }
  }

  set(mode: ThemeMode) {
    this.current = mode;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode);
      this.applyDom();
    }
  }

  toggle() {
    if (this.current === 'light') {
      this.set('dark');
    } else if (this.current === 'dark') {
      this.set('contrast');
    } else {
      this.set('light');
    }
  }

  private applyDom() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.classList.remove('dark', 'a11y-high-contrast');

    if (this.current === 'dark') {
      root.classList.add('dark');
    } else if (this.current === 'contrast') {
      root.classList.add('dark', 'a11y-high-contrast');
    }
  }
}

export const themeState = new ThemeState();
