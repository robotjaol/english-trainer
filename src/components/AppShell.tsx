import React, { useState, useEffect } from "react";
import { Sparkles, BookOpen, RotateCcw, BarChart3, Keyboard, X, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import { SoundSettingsModal } from "./SoundSettingsModal.tsx";
import { soundEngine, SoundSettings } from "../utils/soundEngine.ts";

interface AppShellProps {
  currentView: "configure" | "practice" | "results" | "review" | "stats";
  onNavigate: (view: "configure" | "practice" | "review" | "stats") => void;
  reviewQueueCount: number;
  hasActiveSession: boolean;
  onRestoreActiveSession?: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentView,
  onNavigate,
  reviewQueueCount,
  hasActiveSession,
  onRestoreActiveSession,
  children,
}) => {
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);
  const [showSoundModal, setShowSoundModal] = useState(false);
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(() => soundEngine.getSettings());

  useEffect(() => {
    return soundEngine.subscribe((updated) => setSoundSettings(updated));
  }, []);

  // Global tactile button & control click sound listener
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest<HTMLElement>(
        'button, [role="button"], a, input[type="checkbox"], input[type="radio"], select, .clickable-joy'
      );
      if (clickable) {
        if (clickable.hasAttribute("disabled") || clickable.getAttribute("aria-disabled") === "true") return;
        soundEngine.playButtonClick();
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => window.removeEventListener("click", handleGlobalClick, { capture: true });
  }, []);

  const toggleMasterSound = () => {
    soundEngine.saveSettings({ masterEnabled: !soundSettings.masterEnabled });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#172026]">
      {/* Top utility row & navigation */}
      <header className="sticky top-0 z-30 bg-[#FFFDF7]/95 backdrop-blur-xs border-b border-[#D9DED9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            id="brand-home-button"
            type="button"
            onClick={() => onNavigate("configure")}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0F766E] flex items-center justify-center text-white shadow-xs group-hover:bg-[#115E59] transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#172026]">
                  LingoJoy
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#CCFBF1] text-[#0F766E]">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-[#5D6870] hidden sm:block">
                Lightweight, Explainable English Practice
              </p>
            </div>
          </button>

          {/* Navigation items */}
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main Navigation">
            <button
              id="nav-practice-btn"
              type="button"
              onClick={() => onNavigate("configure")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                currentView === "configure" || currentView === "practice" || currentView === "results"
                  ? "bg-[#CCFBF1] text-[#0F766E] font-semibold"
                  : "text-[#5D6870] hover:text-[#172026] hover:bg-[#F6F8F6]"
              }`}
            >
              Practice
            </button>

            <button
              id="nav-review-btn"
              type="button"
              onClick={() => onNavigate("review")}
              className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === "review"
                  ? "bg-[#CCFBF1] text-[#0F766E] font-semibold"
                  : "text-[#5D6870] hover:text-[#172026] hover:bg-[#F6F8F6]"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Review</span>
              {reviewQueueCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center px-1.5 py-0.2 text-xs font-bold rounded-full bg-[#B42318] text-white">
                  {reviewQueueCount}
                </span>
              )}
            </button>

            <button
              id="nav-stats-btn"
              type="button"
              onClick={() => onNavigate("stats")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === "stats"
                  ? "bg-[#CCFBF1] text-[#0F766E] font-semibold"
                  : "text-[#5D6870] hover:text-[#172026] hover:bg-[#F6F8F6]"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Progress</span>
            </button>

            <button
              id="sound-settings-btn"
              type="button"
              onClick={() => setShowSoundModal(true)}
              className={`p-2 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                !soundSettings.masterEnabled
                  ? "text-[#B42318] hover:bg-[#FDECEA]"
                  : "text-[#5D6870] hover:text-[#172026] hover:bg-[#F6F8F6]"
              }`}
              title="Sound & Audio Settings"
              aria-label="Sound & Audio Settings"
            >
              {!soundSettings.masterEnabled ? (
                <VolumeX className="w-4 h-4 text-[#B42318]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#0F766E]" />
              )}
            </button>

            <button
              id="keyboard-shortcuts-btn"
              type="button"
              onClick={() => setShowKeyboardModal(true)}
              className="p-2 text-[#5D6870] hover:text-[#172026] hover:bg-[#F6F8F6] rounded-md transition-colors cursor-pointer"
              title="Keyboard Shortcuts"
              aria-label="Keyboard Shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      {/* Active session restore notification banner */}
      {hasActiveSession && currentView === "configure" && onRestoreActiveSession && (
        <div
          id="active-session-banner"
          className="bg-[#CCFBF1] border-b border-[#0F766E]/20 text-[#0F766E] py-2.5 px-4"
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>You have an ongoing practice session saved in this browser.</span>
            </div>
            <button
              type="button"
              onClick={onRestoreActiveSession}
              className="px-3 py-1 bg-[#0F766E] text-white rounded text-xs font-semibold hover:bg-[#115E59] transition-colors cursor-pointer"
            >
              Resume Session
            </button>
          </div>
        </div>
      )}

      {/* Main content viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Joyful & disciplined footer */}
      <footer className="mt-auto border-t border-[#D9DED9] bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5D6870]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
            <span>Local-First & Private: All learning metrics remain strictly in your browser.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Deterministic Scoring</span>
            <span>•</span>
            <span>CEFR-Aligned</span>
            <span>•</span>
            <span>No Account Required</span>
          </div>
        </div>
      </footer>

      {/* Accessible Keyboard Shortcuts Modal */}
      {showKeyboardModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="keyboard-modal-title"
          onClick={() => setShowKeyboardModal(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-xl shadow-xl border border-[#D9DED9] p-6 text-[#172026]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E7EBE7]">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-[#0F766E]" />
                <h3 id="keyboard-modal-title" className="text-base font-bold">
                  Keyboard Shortcuts
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyboardModal(false)}
                className="p-1 rounded-md text-[#5D6870] hover:text-[#172026] hover:bg-[#F6F8F6] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-[#E7EBE7] text-sm mt-3">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[#5D6870]">Select Option 1 to 5</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 text-xs font-mono bg-[#F6F8F6] border border-[#D9DED9] rounded">1</kbd>
                  <span className="text-xs text-[#5D6870]">to</span>
                  <kbd className="px-2 py-1 text-xs font-mono bg-[#F6F8F6] border border-[#D9DED9] rounded">5</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[#5D6870]">Submit / Check Answer</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-[#F6F8F6] border border-[#D9DED9] rounded">Enter</kbd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[#5D6870]">Next Question</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-[#F6F8F6] border border-[#D9DED9] rounded">→</kbd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[#5D6870]">Previous Question</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-[#F6F8F6] border border-[#D9DED9] rounded">←</kbd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[#5D6870]">Toggle Mute / Audio (M)</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-[#F6F8F6] border border-[#D9DED9] rounded">M</kbd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[#5D6870]">Close Dialog / Sheet</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-[#F6F8F6] border border-[#D9DED9] rounded">Esc</kbd>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E7EBE7] flex justify-end">
              <button
                type="button"
                onClick={() => setShowKeyboardModal(false)}
                className="px-4 py-2 bg-[#0F766E] text-white rounded-md text-sm font-medium hover:bg-[#115E59] cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sound Settings & Audio Customization Modal */}
      <SoundSettingsModal
        isOpen={showSoundModal}
        onClose={() => setShowSoundModal(false)}
      />
    </div>
  );
};
