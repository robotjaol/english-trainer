import React, { useState, useEffect } from "react";
import { soundEngine, SoundSettings, SoundTheme } from "../utils/soundEngine.ts";
import { Volume2, VolumeX, Sparkles, Play, MessageSquare, Check, X, MousePointerClick } from "lucide-react";

interface SoundSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundSettingsModal: React.FC<SoundSettingsModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<SoundSettings>(() => soundEngine.getSettings());
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  useEffect(() => {
    return soundEngine.subscribe((updated) => setSettings(updated));
  }, []);

  if (!isOpen) return null;

  const updateSetting = <K extends keyof SoundSettings>(key: K, value: SoundSettings[K]) => {
    soundEngine.saveSettings({ [key]: value });
  };

  const handleTestCorrect = () => {
    soundEngine.playCorrect();
  };

  const handleTestIncorrect = () => {
    soundEngine.playIncorrect();
  };

  const handleTestOption = () => {
    soundEngine.playOptionSelect();
  };

  const handleTestButtonClick = () => {
    soundEngine.playButtonClick();
  };

  const handleTestFanfare = () => {
    soundEngine.playSessionComplete();
  };

  const handleTestSpeech = () => {
    setIsPlayingTest(true);
    soundEngine.speak("Welcome to LingoJoy! Keep practicing to elevate your English fluency.", () => {
      setIsPlayingTest(false);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sound-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#D9DED9] p-6 text-[#172026] max-h-[90vh] overflow-y-auto space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E7EBE7]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="sound-modal-title" className="text-base font-bold text-[#172026]">
                Sound & Audio Settings
              </h2>
              <p className="text-xs text-[#5D6870]">
                Customize sound effects, themes, pronunciation, and focus audio.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5D6870] hover:bg-[#F6F8F6] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Sound Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-[#F6F8F6] border border-[#D9DED9] rounded-xl">
          <div className="flex items-center gap-3">
            {settings.masterEnabled ? (
              <Volume2 className="w-5 h-5 text-[#0F766E]" />
            ) : (
              <VolumeX className="w-5 h-5 text-[#B42318]" />
            )}
            <div>
              <div className="text-sm font-bold text-[#172026]">Master Audio</div>
              <div className="text-xs text-[#5D6870]">
                {settings.masterEnabled ? "All audio enabled" : "All audio completely muted"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => updateSetting("masterEnabled", !settings.masterEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              settings.masterEnabled ? "bg-[#0F766E]" : "bg-[#D9DED9]"
            }`}
            role="switch"
            aria-checked={settings.masterEnabled}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.masterEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Section 1: Sound Effects & Theme */}
        <section aria-labelledby="sfx-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 id="sfx-heading" className="text-xs font-bold uppercase tracking-wider text-[#5D6870]">
              Sound Effects (SFX)
            </h3>
            <label className="flex items-center gap-2 text-xs font-medium text-[#172026] cursor-pointer">
              <input
                type="checkbox"
                checked={settings.sfxEnabled}
                disabled={!settings.masterEnabled}
                onChange={(e) => updateSetting("sfxEnabled", e.target.checked)}
                className="rounded text-[#0F766E]"
              />
              <span>Enable SFX</span>
            </label>
          </div>

          {/* Sound Theme Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#5D6870] mb-2">
              Sound Theme Character
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: "joyful", label: "Joyful Bells", desc: "Crystal tones" },
                  { id: "arcade", label: "Arcade 8-Bit", desc: "Retro gaming" },
                  { id: "zen", label: "Zen Kalimba", desc: "Wood acoustic" },
                  { id: "pop", label: "Modern Pop", desc: "Bubbly snaps" },
                ] as Array<{ id: SoundTheme; label: string; desc: string }>
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  disabled={!settings.masterEnabled || !settings.sfxEnabled}
                  onClick={() => updateSetting("theme", t.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    settings.theme === t.id
                      ? "bg-[#CCFBF1] border-[#0F766E] ring-1 ring-[#0F766E]"
                      : "bg-white border-[#D9DED9] hover:bg-[#F6F8F6]"
                  }`}
                >
                  <div className="text-xs font-bold text-[#172026]">{t.label}</div>
                  <div className="text-[10px] text-[#5D6870]">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Sound Preview Test Buttons */}
          <div>
            <div className="text-xs font-semibold text-[#5D6870] mb-2">Live Sound Previews:</div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!settings.masterEnabled || !settings.sfxEnabled}
                onClick={handleTestButtonClick}
                className="px-3 py-1.5 rounded-md bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/30 text-xs font-semibold hover:bg-[#A7F3D0] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <MousePointerClick className="w-3.5 h-3.5" />
                <span>Button Click</span>
              </button>
              <button
                type="button"
                disabled={!settings.masterEnabled || !settings.sfxEnabled}
                onClick={handleTestCorrect}
                className="px-3 py-1.5 rounded-md bg-[#E8F7EE] text-[#16794B] border border-[#16794B]/30 text-xs font-semibold hover:bg-[#D1F2DE] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Correct Chime</span>
              </button>
              <button
                type="button"
                disabled={!settings.masterEnabled || !settings.sfxEnabled}
                onClick={handleTestIncorrect}
                className="px-3 py-1.5 rounded-md bg-[#FDECEA] text-[#B42318] border border-[#B42318]/30 text-xs font-semibold hover:bg-[#FCD8D4] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Gentle Miss</span>
              </button>
              <button
                type="button"
                disabled={!settings.masterEnabled || !settings.sfxEnabled}
                onClick={handleTestOption}
                className="px-3 py-1.5 rounded-md bg-white border border-[#D9DED9] text-[#172026] text-xs font-semibold hover:bg-[#F6F8F6] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Option Tap</span>
              </button>
              <button
                type="button"
                disabled={!settings.masterEnabled || !settings.sfxEnabled}
                onClick={handleTestFanfare}
                className="px-3 py-1.5 rounded-md bg-[#FFF4CC] text-[#9A6700] border border-[#9A6700]/30 text-xs font-semibold hover:bg-[#FFEAA6] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>Fanfare</span>
              </button>
            </div>
          </div>

          {/* Volume Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#5D6870] mb-1">
              <span>SFX Volume</span>
              <span>{Math.round(settings.sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.sfxVolume}
              disabled={!settings.masterEnabled || !settings.sfxEnabled}
              onChange={(e) => updateSetting("sfxVolume", parseFloat(e.target.value))}
              className="w-full accent-[#0F766E] cursor-pointer"
            />
          </div>

          {/* Individual Sound Toggles */}
          <div className="p-3 bg-[#F6F8F6] rounded-xl border border-[#D9DED9] space-y-2 text-xs">
            <div className="font-bold text-[#172026] mb-1">Individual Sound Triggers:</div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#5D6870]">Play sound when clicking buttons & controls</span>
              <input
                type="checkbox"
                checked={settings.soundOnButtonClick}
                onChange={(e) => updateSetting("soundOnButtonClick", e.target.checked)}
                className="rounded text-[#0F766E]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#5D6870]">Play sound when choosing answers</span>
              <input
                type="checkbox"
                checked={settings.soundOnSelect}
                onChange={(e) => updateSetting("soundOnSelect", e.target.checked)}
                className="rounded text-[#0F766E]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#5D6870]">Play sound on correct answers</span>
              <input
                type="checkbox"
                checked={settings.soundOnCorrect}
                onChange={(e) => updateSetting("soundOnCorrect", e.target.checked)}
                className="rounded text-[#0F766E]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#5D6870]">Play supportive sound on mistakes</span>
              <input
                type="checkbox"
                checked={settings.soundOnIncorrect}
                onChange={(e) => updateSetting("soundOnIncorrect", e.target.checked)}
                className="rounded text-[#0F766E]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#5D6870]">Play victory fanfare upon completion</span>
              <input
                type="checkbox"
                checked={settings.soundOnFinish}
                onChange={(e) => updateSetting("soundOnFinish", e.target.checked)}
                className="rounded text-[#0F766E]"
              />
            </label>
          </div>
        </section>

        {/* Section 2: Speech Pronunciation (TTS) */}
        <section aria-labelledby="tts-heading" className="space-y-3 pt-2 border-t border-[#E7EBE7]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5D6870]">
              <MessageSquare className="w-3.5 h-3.5 text-[#0F766E]" />
              <span id="tts-heading">Speech & Pronunciation (TTS)</span>
            </div>
            <label className="flex items-center gap-2 text-xs font-medium text-[#172026] cursor-pointer">
              <input
                type="checkbox"
                checked={settings.speechEnabled}
                onChange={(e) => updateSetting("speechEnabled", e.target.checked)}
                className="rounded text-[#0F766E]"
              />
              <span>Audio Pronounce Buttons</span>
            </label>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5D6870]">Speech Speed:</span>
              {[0.8, 1.0, 1.2].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => updateSetting("speechRate", rate)}
                  className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
                    settings.speechRate === rate
                      ? "bg-[#0F766E] text-white border-[#0F766E]"
                      : "bg-white text-[#5D6870] border-[#D9DED9]"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={!settings.speechEnabled || isPlayingTest}
              onClick={handleTestSpeech}
              className="px-3 py-1.5 bg-[#F6F8F6] hover:bg-[#E7EBE7] text-[#172026] rounded-md text-xs font-semibold border border-[#D9DED9] flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>{isPlayingTest ? "Speaking..." : "Test Voice"}</span>
            </button>
          </div>
        </section>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#E7EBE7] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0F766E] text-white rounded-lg text-sm font-semibold hover:bg-[#115E59] transition-colors cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
