import { themeState } from './theme.svelte';
import type { A11ySettings, ColorblindMode } from './types';
import { announce } from './utils/a11y';

const STORAGE_KEY = 'anali_a11y_settings_v5';

const MIN_SCALE = 0.8;
const MAX_SCALE = 2.0;
const SCALE_STEP = 0.1;

const DEFAULT_SETTINGS: A11ySettings = {
  textScale: 1,
  textSpacing: false,
  underlineLinks: false,
  guideFocus: false,
  calmMotion: false,
  colorblind: 'off',
};

const COLORBLIND_ORDER: ColorblindMode[] = ['off', 'protan', 'deutan', 'tritan', 'achroma'];

export const COLORBLIND_LABELS: Record<ColorblindMode, string> = {
  off: 'Apagado',
  protan: 'Rojo-verde (P)',
  deutan: 'Rojo-verde (D)',
  tritan: 'Azul-amarillo (T)',
  achroma: 'Acromatopsia (gris)',
};

export const COLORBLIND_DESCRIPTIONS: Record<ColorblindMode, string> = {
  off: 'Colores originales, sin simulación.',
  protan: 'Rojo-verde: el tipo más frecuente; cuesta diferenciar rojos y verdes.',
  deutan: 'Rojo-verde: el tipo más frecuente; cuesta diferenciar rojos y verdes.',
  tritan: 'Azul-amarillo: menos común; afecta la distinción entre azul y amarillo.',
  achroma: 'Acromatopsia: la más grave y poco común; todo se ve en tonos de gris.'
};

function roundScale(value: number): number {
  return Math.round(Math.min(MAX_SCALE, Math.max(MIN_SCALE, value)) * 100) / 100;
}

class A11yState {
  isOpen = $state(false);
  settings = $state<A11ySettings>({ ...DEFAULT_SETTINGS });
  isSpeaking = $state(false);

  private lastFocused: HTMLElement | null = null;
  private resumeTimer: ReturnType<typeof setInterval> | null = null;
  private watchdog: ReturnType<typeof setTimeout> | null = null;
  private stopping = false;

  /** Contador de ayudas activas (tema + 6 ajustes). */
  activeCount = $derived(
    (themeState.current !== 'light' ? 1 : 0) +
      (this.settings.textScale !== 1 ? 1 : 0) +
      (this.settings.textSpacing ? 1 : 0) +
      (this.settings.underlineLinks ? 1 : 0) +
      (this.settings.guideFocus ? 1 : 0) +
      (this.settings.calmMotion ? 1 : 0) +
      (this.settings.colorblind !== 'off' ? 1 : 0)
  );

  textPercent = $derived(Math.round(this.settings.textScale * 100));

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        // Migra ajustes viejos (v2-v4) a este formato simple.
        for (const key of ['anali_a11y_settings_v4', 'anali_a11y_settings_v3', 'anali_a11y_settings_v2']) {
          const raw = localStorage.getItem(key);
          if (!raw) continue;
          const parsed = JSON.parse(raw);
          const migrated: A11ySettings = { ...DEFAULT_SETTINGS };
          if (typeof parsed.textScale === 'number') migrated.textScale = roundScale(parsed.textScale);
          else if (parsed.fontSize === 'large') migrated.textScale = 1.15;
          else if (parsed.fontSize === 'extralarge') migrated.textScale = 1.3;
          else if (parsed.fontSize === 'maximum') migrated.textScale = 1.45;
          if (parsed.textSpacing ?? parsed.readableText) migrated.textSpacing = true;
          if (parsed.underlineLinks) migrated.underlineLinks = true;
          if (parsed.guideFocus ?? parsed.highlightTitles ?? parsed.focusHighlight) migrated.guideFocus = true;
          if (parsed.calmMotion ?? parsed.reduceMotion) migrated.calmMotion = true;
          this.settings = migrated;
          break;
        }
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          this.settings = {
            textScale: roundScale(typeof parsed.textScale === 'number' ? parsed.textScale : 1),
            textSpacing: !!parsed.textSpacing,
            underlineLinks: !!parsed.underlineLinks,
            guideFocus: !!parsed.guideFocus,
            calmMotion: !!parsed.calmMotion,
            colorblind: COLORBLIND_ORDER.includes(parsed.colorblind) ? parsed.colorblind : 'off',
          };
        }
      } catch {
        // usa valores base
      }
      // Respeta el sistema solo la primera vez (WCAG 2.2: no forzar).
      if (!localStorage.getItem(STORAGE_KEY) && window.matchMedia) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.settings.calmMotion = true;
        }
        if (
          window.matchMedia('(prefers-contrast: more)').matches &&
          !localStorage.getItem('anali_theme_mode')
        ) {
          themeState.set('contrast');
        }
      }
      this.applyDom();
      this.initListeners();
      this.warmVoices();
    }
  }

  toggleOpen() {
    if (this.isOpen) this.closePanel();
    else this.openPanel();
  }

  openPanel() {
    if (typeof document !== 'undefined') {
      this.lastFocused = document.activeElement as HTMLElement | null;
    }
    this.isOpen = true;
  }

  closePanel() {
    this.isOpen = false;
    if (typeof document !== 'undefined' && this.lastFocused) {
      this.lastFocused.focus();
      this.lastFocused = null;
    }
  }

  // — Tamaño de letra (80% a 200%, pasos de 10%). WCAG 2.2 §1.4.4 —
  increaseText() {
    this.settings.textScale = roundScale(this.settings.textScale + SCALE_STEP);
    this.applyDom();
    this.save();
  }

  decreaseText() {
    this.settings.textScale = roundScale(this.settings.textScale - SCALE_STEP);
    this.applyDom();
    this.save();
  }

  resetTextSize() {
    this.settings.textScale = 1;
    this.applyDom();
    this.save();
  }

  // — Alto contraste y modo oscuro son excluyentes —
  toggleHighContrast() {
    if (themeState.current === 'contrast') themeState.set('light');
    else themeState.set('contrast');
    this.save();
  }

  toggleDarkMode() {
    if (themeState.current === 'dark') themeState.set('light');
    else themeState.set('dark');
    this.save();
  }

  toggleTextSpacing() {
    this.settings.textSpacing = !this.settings.textSpacing;
    this.applyDom();
    this.save();
  }

  toggleUnderline() {
    this.settings.underlineLinks = !this.settings.underlineLinks;
    this.applyDom();
    this.save();
  }

  toggleGuide() {
    this.settings.guideFocus = !this.settings.guideFocus;
    this.applyDom();
    this.save();
  }

  toggleCalm() {
    this.settings.calmMotion = !this.settings.calmMotion;
    this.applyDom();
    this.save();
  }

  cycleColorblind() {
    const next = COLORBLIND_ORDER[(COLORBLIND_ORDER.indexOf(this.settings.colorblind) + 1) % COLORBLIND_ORDER.length];
    this.settings.colorblind = next;
    this.applyDom();
    this.save();
    announce(`Daltonismo: ${COLORBLIND_LABELS[next]}.`);
  }

  // — Lectura en voz alta: un botón para empezar o detener —
  // Las voces del navegador cargan tarde: se precalientan al abrir la página.
  // Un vigilante detecta si la voz nunca arranca (fallo silencioso) y avisa.
  private warmVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      const synth = window.speechSynthesis;
      synth.getVoices();
      synth.onvoiceschanged = () => {
        try {
          synth.getVoices();
        } catch {
          // sin voces
        }
      };
    } catch {
      // sin voces
    }
  }

  private spanishVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | undefined {
    try {
      const voices = synth.getVoices();
      return (
        voices.find((v) => v.lang?.toLowerCase().startsWith('es-co')) ??
        voices.find((v) => v.lang?.toLowerCase().startsWith('es'))
      );
    } catch {
      return undefined;
    }
  }

  private clearSpeechTimers() {
    if (this.resumeTimer) {
      clearInterval(this.resumeTimer);
      this.resumeTimer = null;
    }
    if (this.watchdog) {
      clearTimeout(this.watchdog);
      this.watchdog = null;
    }
  }

  speakOrStop() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      announce('La lectura en voz alta no funciona en este navegador.');
      return;
    }
    const synth = window.speechSynthesis;
    if (this.isSpeaking) {
      this.stopping = true;
      synth.cancel();
      this.clearSpeechTimers();
      this.isSpeaking = false;
      announce('Lectura detenida.');
      return;
    }
    this.stopping = false;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(
      'Bienvenido a ANALÍ CSET. Plataforma del SENA Regional Santander para consultar la memoria del Comité de Evaluación y Seguimiento. La inteligencia artificial ayuda a buscar; las decisiones son del Comité.'
    );
    utter.lang = 'es-CO';
    utter.rate = 1;
    const voice = this.spanishVoice(synth);
    if (voice) utter.voice = voice;
    utter.onend = () => {
      this.clearSpeechTimers();
      if (this.stopping) {
        this.stopping = false;
        return;
      }
      this.isSpeaking = false;
      announce('Lectura terminada.');
    };
    utter.onerror = () => {
      this.clearSpeechTimers();
      if (this.stopping) {
        this.stopping = false;
        return;
      }
      this.isSpeaking = false;
      announce('No se pudo leer en voz alta.');
    };
    this.isSpeaking = true;
    announce('Leyendo en voz alta. Pulse de nuevo para detener.');
    synth.speak(utter);
    // Chrome pausa solos los textos largos: reanuda cada 5 s mientras hable.
    this.resumeTimer = setInterval(() => {
      if (this.isSpeaking && !this.stopping) {
        try {
          synth.resume();
        } catch {
          // sigue hablando
        }
      }
    }, 5000);
    // Si a los 2.5 s el motor ni habla ni tiene cola, la voz falló en silencio.
    this.watchdog = setTimeout(() => {
      if (this.isSpeaking && !synth.speaking && !synth.pending) {
        this.clearSpeechTimers();
        this.isSpeaking = false;
        announce('No se pudo iniciar la voz. Revise el sonido del dispositivo.');
      }
    }, 2500);
  }

  stopSpeech() {
    this.stopping = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.clearSpeechTimers();
    this.isSpeaking = false;
  }

  reset() {
    this.settings = { ...DEFAULT_SETTINGS };
    themeState.set('light');
    this.applyDom();
    this.save();
    this.stopSpeech();
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    }
  }

  applyDom() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.fontSize = `${Math.round(this.settings.textScale * 100)}%`;
    root.classList.toggle('a11y-readable-text', this.settings.textSpacing);
    root.classList.toggle('a11y-underline-links', this.settings.underlineLinks);
    root.classList.toggle('a11y-highlight-titles', this.settings.guideFocus);
    root.classList.toggle('a11y-focus-highlight', this.settings.guideFocus);
    root.classList.toggle('a11y-reduce-motion', this.settings.calmMotion);
    if (this.settings.colorblind === 'off') root.removeAttribute('data-colorblind');
    else root.setAttribute('data-colorblind', this.settings.colorblind);
  }

  private initListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        this.toggleOpen();
      } else if (e.altKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        themeState.toggle();
      } else if (e.altKey && (e.key === 'v' || e.key === 'V')) {
        e.preventDefault();
        this.speakOrStop();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.closePanel();
      }
    });
  }
}

export const a11yState = new A11yState();
