/**
 * LingoJoy Audio Engine
 * Pure Web Audio API Synthesizer & Web Speech API Pronunciation
 * Offline-first, zero external audio asset dependencies, instantaneous playback.
 */

export type SoundTheme = "joyful" | "arcade" | "zen" | "pop";

export interface SoundSettings {
  masterEnabled: boolean;
  sfxEnabled: boolean;
  sfxVolume: number; // 0 to 1
  theme: SoundTheme;
  speechEnabled: boolean;
  speechRate: number; // 0.8 to 1.2
  soundOnButtonClick: boolean;
  soundOnSelect: boolean;
  soundOnCorrect: boolean;
  soundOnIncorrect: boolean;
  soundOnFinish: boolean;
  soundOnTimerTick: boolean;
}

const DEFAULT_SOUND_SETTINGS: SoundSettings = {
  masterEnabled: true,
  sfxEnabled: true,
  sfxVolume: 0.7,
  theme: "joyful",
  speechEnabled: true,
  speechRate: 1.0,
  soundOnButtonClick: true,
  soundOnSelect: true,
  soundOnCorrect: true,
  soundOnIncorrect: true,
  soundOnFinish: true,
  soundOnTimerTick: true,
};

const STORAGE_KEY = "lingojoy_sound_settings_v1";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private settings: SoundSettings;
  private listeners: Set<(settings: SoundSettings) => void> = new Set();
  private lastClickTime = 0;

  constructor() {
    this.settings = this.loadSettings();
  }

  private loadSettings(): SoundSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SOUND_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
    return { ...DEFAULT_SOUND_SETTINGS };
  }

  public saveSettings(newSettings: Partial<SoundSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {
      // ignore
    }
    this.notifyListeners();
  }

  public getSettings(): SoundSettings {
    return { ...this.settings };
  }

  public subscribe(listener: (settings: SoundSettings) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    for (const l of this.listeners) {
      l(this.getSettings());
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // --- SOUND EFFECTS SYNTHESIZERS ---

  public playOptionSelect() {
    if (!this.settings.masterEnabled || !this.settings.sfxEnabled || !this.settings.soundOnSelect) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const volume = this.settings.sfxVolume * 0.15;

    if (this.settings.theme === "arcade") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (this.settings.theme === "zen") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(659.25, now); // E5
      gain.gain.setValueAtTime(volume * 0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (this.settings.theme === "pop") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);
      gain.gain.setValueAtTime(volume * 1.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else {
      // Joyful
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  }

  public playCorrect() {
    if (!this.settings.masterEnabled || !this.settings.sfxEnabled || !this.settings.soundOnCorrect) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const volume = this.settings.sfxVolume * 0.25;

    if (this.settings.theme === "arcade") {
      // 8-bit coin sound: B5 (987.77) then E6 (1318.51)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (this.settings.theme === "zen") {
      // Tibetan bell harmonic chime: G4, D5, B5
      [392.0, 587.33, 987.77].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(volume * 0.6, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8 + idx * 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + 0.9 + idx * 0.1);
      });
    } else if (this.settings.theme === "pop") {
      // Upbeat bubbly pop triad
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(volume * 0.7, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25 + idx * 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + 0.28 + idx * 0.07);
      });
    } else {
      // Joyful chime arpeggio: C5, E5, G5, C6 (crystal sine bells)
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(volume, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + idx * 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + 0.6 + idx * 0.08);
      });
    }
  }

  public playIncorrect() {
    if (!this.settings.masterEnabled || !this.settings.sfxEnabled || !this.settings.soundOnIncorrect) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const volume = this.settings.sfxVolume * 0.22;

    if (this.settings.theme === "arcade") {
      // Retro pitch slide down
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);
      gain.gain.setValueAtTime(volume * 0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (this.settings.theme === "zen") {
      // Soft muffled wood tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      gain.gain.setValueAtTime(volume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      // Gentle supportive dual-tone (F4 -> D4)
      [349.23, 293.66].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(volume * 0.7, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.25);
      });
    }
  }

  public playSessionComplete() {
    if (!this.settings.masterEnabled || !this.settings.sfxEnabled || !this.settings.soundOnFinish) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const volume = this.settings.sfxVolume * 0.3;

    // Victory fanfare: G4 -> C5 -> E5 -> G5
    const notes = [392.0, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);
      gain.gain.setValueAtTime(volume, now + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.14);
      osc.stop(now + 0.9 + idx * 0.15);
    });
  }

  public playFlagToggle() {
    if (!this.settings.masterEnabled || !this.settings.sfxEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1174.66, now); // D6
    gain.gain.setValueAtTime(this.settings.sfxVolume * 0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Joyful, crisp, tactile button click sound
   * Triggers when user clicks interactive buttons, pills, toggles or tabs.
   */
  public playButtonClick() {
    if (!this.settings.masterEnabled || !this.settings.sfxEnabled || !this.settings.soundOnButtonClick) return;

    // Throttle to prevent distorted clipping if rapidly spamming
    const nowMs = Date.now();
    if (nowMs - this.lastClickTime < 35) return;
    this.lastClickTime = nowMs;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const volume = this.settings.sfxVolume * 0.14;

    if (this.settings.theme === "arcade") {
      // 8-bit micro blip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(1050, now + 0.035);
      gain.gain.setValueAtTime(volume * 0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } else if (this.settings.theme === "zen") {
      // Gentle warm woodblock knock
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.045);
      gain.gain.setValueAtTime(volume * 0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } else if (this.settings.theme === "pop") {
      // Bubbly bubble-pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.035);
      gain.gain.setValueAtTime(volume * 1.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } else {
      // Joyful crystal tap (sparkling chime pop)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1046.5, now); // C6
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.04); // G5
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  }

  // --- TEXT TO SPEECH (TTS) PRONUNCIATION ---

  public speak(text: string, onEnd?: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (!this.settings.masterEnabled || !this.settings.speechEnabled) return;

    window.speechSynthesis.cancel(); // Stop prior speech
    const cleanText = text.replace(/\{\{blank\}\}/g, "blank").replace(/[_]{2,}/g, "blank");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";
    utterance.rate = this.settings.speechRate || 1.0;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.default)
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundEngine = new SoundEngine();
