import React, { useState, useMemo, useEffect } from "react";
import { SessionConfig, SessionMode } from "../../domain/sessions/types.ts";
import { Difficulty, Cefr, QuestionType } from "../../domain/questions/schema.ts";
import { QuestionRepository } from "../../domain/questions/repository.ts";
import { Play, Settings2, Sparkles, CheckCircle2, Clock, RotateCcw, Award, Volume2, VolumeX, Music, MousePointerClick } from "lucide-react";
import { soundEngine, SoundSettings, SoundTheme } from "../../utils/soundEngine.ts";

interface SessionConfiguratorProps {
  repository: QuestionRepository;
  onStartSession: (config: SessionConfig) => void;
  reviewQueueCount: number;
  onStartReview: () => void;
}

export const SessionConfigurator: React.FC<SessionConfiguratorProps> = ({
  repository,
  onStartSession,
  reviewQueueCount,
  onStartReview,
}) => {
  const [mode, setMode] = useState<SessionMode>("practice");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [selectedCefr, setSelectedCefr] = useState<Cefr[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isTimed, setIsTimed] = useState<boolean>(false);
  const [timeMinutes, setTimeMinutes] = useState<number>(10);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  const [seed, setSeed] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(() => soundEngine.getSettings());

  useEffect(() => {
    return soundEngine.subscribe((updated) => setSoundSettings(updated));
  }, []);

  // Available categories in repository
  const availableCategories = useMemo(() => {
    return repository.getCategoriesWithCounts();
  }, [repository]);

  // Compute live available question count for current filter selection
  const eligibleQuestions = useMemo(() => {
    return repository.filter({
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      difficulties: selectedDifficulties.length > 0 ? selectedDifficulties : undefined,
      cefr: selectedCefr.length > 0 ? selectedCefr : undefined,
      questionTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
    });
  }, [repository, selectedCategories, selectedDifficulties, selectedCefr, selectedTypes]);

  const availableCount = eligibleQuestions.length;

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleDifficultyToggle = (diff: Difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  const handleCefrToggle = (cefr: Cefr) => {
    setSelectedCefr((prev) =>
      prev.includes(cefr) ? prev.filter((c) => c !== cefr) : [...prev, cefr]
    );
  };

  const handleTypeToggle = (type: QuestionType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Presets
  const applyPreset = (presetName: string) => {
    if (presetName === "daily10") {
      setMode("practice");
      setSelectedCategories([]);
      setSelectedDifficulties([]);
      setSelectedCefr([]);
      setSelectedTypes([]);
      setQuestionCount(10);
      setIsTimed(false);
    } else if (presetName === "business") {
      setMode("practice");
      setSelectedCategories(["business-english", "workplace-english"]);
      setSelectedDifficulties(["medium", "hard"]);
      setSelectedCefr([]);
      setQuestionCount(10);
      setIsTimed(false);
    } else if (presetName === "recruitment") {
      setMode("assessment");
      setSelectedCategories(["recruitment-assessment", "grammar", "error-identification"]);
      setSelectedDifficulties([]);
      setQuestionCount(15);
      setIsTimed(true);
      setTimeMinutes(15);
    } else if (presetName === "grammar") {
      setMode("practice");
      setSelectedCategories(["grammar", "error-identification"]);
      setSelectedDifficulties([]);
      setQuestionCount(10);
      setIsTimed(false);
    }
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (availableCount === 0) return;

    const count = Math.min(questionCount, availableCount);
    onStartSession({
      mode,
      categories: selectedCategories,
      difficulties: selectedDifficulties,
      cefr: selectedCefr.length > 0 ? selectedCefr : undefined,
      questionTypes: selectedTypes,
      count,
      timed: isTimed,
      timeLimitSeconds: isTimed ? timeMinutes * 60 : undefined,
      shuffleQuestions,
      shuffleOptions,
      seed: seed.trim() ? seed.trim() : undefined,
    });
  };

  return (
    <div id="session-configurator" className="max-w-4xl mx-auto">
      {/* Intro hero banner */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Focused Learning Environment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172026]">
          Configure Your Practice Session
        </h1>
        <p className="mt-1 text-sm sm:text-base text-[#5D6870]">
          Choose your target skills, difficulty, and format. Start training immediately with zero login or setup friction.
        </p>
      </div>

      {/* Quick Presets Row */}
      <div className="mb-6 p-4 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5D6870]">
            Quick Start Presets
          </span>
          {reviewQueueCount > 0 && (
            <button
              type="button"
              onClick={onStartReview}
              className="text-xs text-[#B42318] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Review {reviewQueueCount} mistakes</span>
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => applyPreset("daily10")}
            className="p-2.5 rounded-lg border border-[#D9DED9] hover:border-[#0F766E] hover:bg-[#F6F8F6] text-left transition-colors cursor-pointer"
          >
            <div className="font-semibold text-xs text-[#172026]">Daily 10 Mix</div>
            <div className="text-[11px] text-[#5D6870]">10 mixed questions</div>
          </button>
          <button
            type="button"
            onClick={() => applyPreset("business")}
            className="p-2.5 rounded-lg border border-[#D9DED9] hover:border-[#0F766E] hover:bg-[#F6F8F6] text-left transition-colors cursor-pointer"
          >
            <div className="font-semibold text-xs text-[#172026]">Business & Work</div>
            <div className="text-[11px] text-[#5D6870]">Workplace English</div>
          </button>
          <button
            type="button"
            onClick={() => applyPreset("recruitment")}
            className="p-2.5 rounded-lg border border-[#D9DED9] hover:border-[#0F766E] hover:bg-[#F6F8F6] text-left transition-colors cursor-pointer"
          >
            <div className="font-semibold text-xs text-[#172026]">Recruitment Test</div>
            <div className="text-[11px] text-[#5D6870]">Timed Assessment</div>
          </button>
          <button
            type="button"
            onClick={() => applyPreset("grammar")}
            className="p-2.5 rounded-lg border border-[#D9DED9] hover:border-[#0F766E] hover:bg-[#F6F8F6] text-left transition-colors cursor-pointer"
          >
            <div className="font-semibold text-xs text-[#172026]">Grammar Mastery</div>
            <div className="text-[11px] text-[#5D6870]">Syntax & Agreement</div>
          </button>
        </div>
      </div>

      {/* Audio & Immersion Settings Card */}
      <div className="mb-6 p-4 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#0F766E]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#5D6870]">
              Audio & Sound Toggles
            </span>
          </div>
          <button
            type="button"
            onClick={() => soundEngine.saveSettings({ masterEnabled: !soundSettings.masterEnabled })}
            className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              soundSettings.masterEnabled
                ? "bg-[#CCFBF1] text-[#0F766E]"
                : "bg-[#FDECEA] text-[#B42318]"
            }`}
          >
            {soundSettings.masterEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundSettings.masterEnabled ? "Audio Active" : "Muted"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Sound Theme selection */}
          <div className="space-y-1.5">
            <span className="font-semibold text-[#5D6870] flex items-center gap-1">
              <Music className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Theme:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(["joyful", "arcade", "zen", "pop"] as SoundTheme[]).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => {
                    soundEngine.saveSettings({ theme });
                    soundEngine.playCorrect();
                  }}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium border transition-colors cursor-pointer ${
                    soundSettings.theme === theme && soundSettings.sfxEnabled
                      ? "bg-[#0F766E] text-white border-[#0F766E]"
                      : "bg-[#F6F8F6] text-[#5D6870] border-[#D9DED9] hover:bg-[#E7EBE7]"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Click Sound & Tactile Toggles */}
          <div className="space-y-1.5">
            <span className="font-semibold text-[#5D6870] flex items-center gap-1">
              <MousePointerClick className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Button Click Sound:</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.saveSettings({ soundOnButtonClick: !soundSettings.soundOnButtonClick });
                  if (!soundSettings.soundOnButtonClick) {
                    soundEngine.playButtonClick();
                  }
                }}
                className={`px-2.5 py-1 rounded-md font-medium border transition-colors cursor-pointer ${
                  soundSettings.soundOnButtonClick
                    ? "bg-[#CCFBF1] text-[#0F766E] border-[#0F766E]"
                    : "bg-[#F6F8F6] text-[#5D6870] border-[#D9DED9] hover:bg-[#E7EBE7]"
                }`}
              >
                {soundSettings.soundOnButtonClick ? "Enabled (Tactile)" : "Muted"}
              </button>
              <button
                type="button"
                onClick={() => soundEngine.playButtonClick()}
                className="px-2 py-1 rounded text-[11px] font-semibold bg-[#F6F8F6] hover:bg-[#E7EBE7] text-[#172026] border border-[#D9DED9] cursor-pointer"
                title="Test click sound"
              >
                Test
              </button>
            </div>
          </div>

          {/* Individual toggles */}
          <div className="space-y-1.5 flex flex-col justify-center">
            <label className="flex items-center gap-2 text-[#5D6870] cursor-pointer">
              <input
                type="checkbox"
                checked={soundSettings.sfxEnabled}
                onChange={(e) => soundEngine.saveSettings({ sfxEnabled: e.target.checked })}
                className="rounded text-[#0F766E]"
              />
              <span>Feedback SFX</span>
            </label>
            <label className="flex items-center gap-2 text-[#5D6870] cursor-pointer">
              <input
                type="checkbox"
                checked={soundSettings.speechEnabled}
                onChange={(e) => soundEngine.saveSettings({ speechEnabled: e.target.checked })}
                className="rounded text-[#0F766E]"
              />
              <span>Voice Pronunciation (TTS)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Configuration Form */}
      <form onSubmit={handleStart} className="space-y-6">
        {/* Mode Selector */}
        <section aria-labelledby="mode-heading" className="p-5 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
          <h2 id="mode-heading" className="text-sm font-bold text-[#172026] mb-3">
            1. Select Session Mode
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                mode === "practice"
                  ? "bg-[#CCFBF1] border-[#0F766E] ring-1 ring-[#0F766E]"
                  : "border-[#D9DED9] hover:bg-[#F6F8F6]"
              }`}
            >
              <input
                type="radio"
                name="session-mode"
                value="practice"
                checked={mode === "practice"}
                onChange={() => setMode("practice")}
                className="mt-0.5 text-[#0F766E]"
              />
              <div>
                <div className="font-bold text-sm text-[#172026] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#0F766E]" />
                  <span>Practice Mode</span>
                </div>
                <p className="text-xs text-[#5D6870] mt-1 leading-relaxed">
                  Immediate feedback, rules, and learning objectives shown after every question. Best for self-paced study.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                mode === "assessment"
                  ? "bg-[#CCFBF1] border-[#0F766E] ring-1 ring-[#0F766E]"
                  : "border-[#D9DED9] hover:bg-[#F6F8F6]"
              }`}
            >
              <input
                type="radio"
                name="session-mode"
                value="assessment"
                checked={mode === "assessment"}
                onChange={() => setMode("assessment")}
                className="mt-0.5 text-[#0F766E]"
              />
              <div>
                <div className="font-bold text-sm text-[#172026] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#0F766E]" />
                  <span>Assessment Mode</span>
                </div>
                <p className="text-xs text-[#5D6870] mt-1 leading-relaxed">
                  Real evaluation environment. No answers revealed until you submit. Timed or untimed with full scorecard.
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* Categories Section */}
        <section aria-labelledby="categories-heading" className="p-5 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h2 id="categories-heading" className="text-sm font-bold text-[#172026]">
                2. Choose Practice Domain(s)
              </h2>
              <p className="text-xs text-[#5D6870] mt-0.5">
                Each domain contains <strong className="text-[#0F766E]">3,000 questions</strong> (1,000 Easy, 1,000 Medium, 1,000 Hard).
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategories([])}
                className="text-xs font-semibold text-[#0F766E] hover:underline cursor-pointer"
              >
                {selectedCategories.length === 0 ? "✓ All Domains Selected (27,000 Qs)" : `Select All (${availableCategories.reduce((acc, c) => acc + c.count, 0).toLocaleString()} Qs)`}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableCategories.map(({ category, count }) => {
              const isSelected = selectedCategories.includes(category);
              const formattedName = category
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer clickable-joy ${
                    isSelected
                      ? "bg-[#CCFBF1] border-[#0F766E] text-[#0F766E] font-semibold ring-1 ring-[#0F766E]/30"
                      : "bg-[#F6F8F6] border-[#D9DED9] text-[#172026] hover:border-[#8B98A0]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="truncate pr-1">{formattedName}</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-black/5 text-[#5D6870]">
                    {count.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Domain Context Pill */}
          <div className="mt-3 pt-2.5 border-t border-[#E7EBE7] flex flex-wrap items-center justify-between text-xs text-[#5D6870]">
            <div>
              {selectedCategories.length === 0 ? (
                <span>Across all 9 sections: <strong className="text-[#172026]">27,000 questions</strong> available (9,000 Easy, 9,000 Medium, 9,000 Hard)</span>
              ) : (
                <span>
                  Selected {selectedCategories.length} section{selectedCategories.length > 1 ? "s" : ""}:{" "}
                  <strong className="text-[#172026]">{(selectedCategories.length * 3000).toLocaleString()} questions</strong> in bank ({selectedCategories.length * 1000} Easy, {selectedCategories.length * 1000} Medium, {selectedCategories.length * 1000} Hard)
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Difficulty and CEFR level */}
        <section aria-labelledby="difficulty-heading" className="p-5 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 id="difficulty-heading" className="text-sm font-bold text-[#172026] mb-2.5">
                3. Target Difficulty
              </h2>
              <div className="flex gap-2">
                {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => {
                  const isSelected = selectedDifficulties.includes(diff);
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => handleDifficultyToggle(diff)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold capitalize border transition-colors cursor-pointer clickable-joy ${
                        isSelected
                          ? "bg-[#0F766E] text-white border-[#0F766E]"
                          : "bg-white text-[#5D6870] border-[#D9DED9] hover:bg-[#F6F8F6]"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#5D6870] mt-1.5">
                Leave unselected to include all difficulty levels (1,000 Easy, 1,000 Medium, 1,000 Hard per section).
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#172026] mb-2.5">
                CEFR Standard Level
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {(["A1", "A2", "B1", "B2", "C1"] as Cefr[]).map((level) => {
                  const isSelected = selectedCefr.includes(level);
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleCefrToggle(level)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer clickable-joy ${
                        isSelected
                          ? "bg-[#0F766E] text-white border-[#0F766E]"
                          : "bg-white text-[#5D6870] border-[#D9DED9] hover:bg-[#F6F8F6]"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#5D6870] mt-1.5">
                Optional: Filter by European framework standard.
              </p>
            </div>
          </div>
        </section>

        {/* Question Count & Timer */}
        <section aria-labelledby="settings-heading" className="p-5 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Question Count Customization (5 to 1,000) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h2 id="settings-heading" className="text-sm font-bold text-[#172026]">
                  4. Number of Questions to Take
                </h2>
                <span className="text-xs font-mono text-[#0F766E] font-bold bg-[#CCFBF1] px-2 py-0.5 rounded">
                  {Math.min(questionCount, availableCount)} Questions
                </span>
              </div>

              {/* Quick Presets: 5, 10, 25, 50, 100, 250, 500, 1000 */}
              <div>
                <div className="text-[11px] font-semibold text-[#5D6870] mb-1.5">Quick Presets:</div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[5, 10, 25, 50, 100, 250, 500, 1000].map((cnt) => {
                    const isDisabled = availableCount > 0 && cnt > availableCount && availableCount < cnt;
                    return (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setQuestionCount(cnt)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer clickable-joy ${
                          questionCount === cnt
                            ? "bg-[#0F766E] text-white border-[#0F766E] shadow-2xs"
                            : "bg-white text-[#5D6870] border-[#D9DED9] hover:bg-[#F6F8F6]"
                        }`}
                      >
                        {cnt}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setQuestionCount(Math.min(1000, availableCount))}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer clickable-joy ${
                      questionCount === Math.min(1000, availableCount)
                        ? "bg-[#0F766E] text-white border-[#0F766E]"
                        : "bg-[#F6F8F6] text-[#0F766E] border-[#0F766E]/30 hover:bg-[#CCFBF1]"
                    }`}
                  >
                    Max ({Math.min(1000, availableCount)})
                  </button>
                </div>
              </div>

              {/* Custom Number Input & Steppers */}
              <div className="p-3 bg-[#F6F8F6] rounded-xl border border-[#D9DED9] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#172026]">
                    Custom Quantity (1 to {Math.min(1000, availableCount)}):
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setQuestionCount((prev) => Math.max(1, prev - 10))}
                      className="px-2 py-1 text-xs font-bold rounded bg-white border border-[#D9DED9] hover:bg-[#E7EBE7] cursor-pointer clickable-joy"
                      title="Decrease by 10"
                    >
                      -10
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuestionCount((prev) => Math.max(1, prev - 5))}
                      className="px-2 py-1 text-xs font-bold rounded bg-white border border-[#D9DED9] hover:bg-[#E7EBE7] cursor-pointer clickable-joy"
                      title="Decrease by 5"
                    >
                      -5
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={Math.min(1000, availableCount)}
                      value={questionCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                          setQuestionCount(Math.max(1, Math.min(Math.min(1000, availableCount), val)));
                        }
                      }}
                      className="w-20 px-2 py-1 text-center text-sm font-bold font-mono rounded border border-[#0F766E] bg-white text-[#172026] focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                    />
                    <button
                      type="button"
                      onClick={() => setQuestionCount((prev) => Math.min(Math.min(1000, availableCount), prev + 5))}
                      className="px-2 py-1 text-xs font-bold rounded bg-white border border-[#D9DED9] hover:bg-[#E7EBE7] cursor-pointer clickable-joy"
                      title="Increase by 5"
                    >
                      +5
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuestionCount((prev) => Math.min(Math.min(1000, availableCount), prev + 10))}
                      className="px-2 py-1 text-xs font-bold rounded bg-white border border-[#D9DED9] hover:bg-[#E7EBE7] cursor-pointer clickable-joy"
                      title="Increase by 10"
                    >
                      +10
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuestionCount((prev) => Math.min(Math.min(1000, availableCount), prev + 50))}
                      className="px-2 py-1 text-xs font-bold rounded bg-white border border-[#D9DED9] hover:bg-[#E7EBE7] cursor-pointer clickable-joy"
                      title="Increase by 50"
                    >
                      +50
                    </button>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min={1}
                    max={Math.min(1000, Math.max(1, availableCount))}
                    value={Math.min(questionCount, availableCount)}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
                    className="w-full accent-[#0F766E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#5D6870]">
                    <span>1</span>
                    <span>25</span>
                    <span>100</span>
                    <span>250</span>
                    <span>500</span>
                    <span>1,000</span>
                  </div>
                </div>
              </div>

              {/* Pool summary and time estimate */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-[#5D6870] gap-2">
                <span>
                  Eligible in chosen filter:{" "}
                  <strong className="text-[#172026]">{availableCount.toLocaleString()} questions</strong>
                </span>
                <span>
                  Estimated completion:{" "}
                  <strong className="text-[#0F766E]">
                    {questionCount <= 15
                      ? `~${Math.round(questionCount * 1.2)} mins`
                      : questionCount <= 60
                      ? `~${Math.round((questionCount * 1.1) / 1)} mins`
                      : `~${(questionCount / 60).toFixed(1)} hours`}
                  </strong>
                </span>
              </div>
            </div>

            {/* Timer Options */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#E7EBE7] lg:pl-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#172026] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#5D6870]" />
                  <span>Timer Option</span>
                </h2>
                <label className="flex items-center gap-1.5 text-xs text-[#5D6870] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTimed}
                    onChange={(e) => setIsTimed(e.target.checked)}
                    className="rounded text-[#0F766E]"
                  />
                  <span className="font-semibold text-[#172026]">Timed Test</span>
                </label>
              </div>

              {isTimed ? (
                <div className="space-y-3">
                  <div className="text-xs text-[#5D6870]">
                    Select duration or enter custom minutes:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[5, 10, 15, 30, 60, 120].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setTimeMinutes(mins)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer clickable-joy ${
                          timeMinutes === mins
                            ? "bg-[#0F766E] text-white border-[#0F766E]"
                            : "bg-white text-[#5D6870] border-[#D9DED9] hover:bg-[#F6F8F6]"
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#5D6870]">Custom minutes:</span>
                    <input
                      type="number"
                      min={1}
                      max={360}
                      value={timeMinutes}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setTimeMinutes(Math.max(1, Math.min(360, val)));
                      }}
                      className="w-16 px-2 py-1 text-center font-bold font-mono rounded border border-[#D9DED9] bg-white text-[#172026]"
                    />
                    <span className="text-[#5D6870]">mins</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[#F6F8F6] rounded-xl border border-[#D9DED9] text-xs text-[#5D6870] leading-relaxed">
                  <strong>Untimed session.</strong> Work through your customized set of questions with zero countdown pressure. Immediate explanations provided in Practice Mode.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Advanced Options Accordion */}
        <div className="border border-[#D9DED9] rounded-xl bg-white overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="w-full px-5 py-3 flex items-center justify-between text-xs font-bold text-[#5D6870] uppercase tracking-wider hover:bg-[#F6F8F6] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              <span>Advanced Options (Shuffling, Question Types, Seeds)</span>
            </div>
            <span>{showAdvanced ? "▲ Hide" : "▼ Show"}</span>
          </button>

          {showAdvanced && (
            <div className="p-5 border-t border-[#E7EBE7] space-y-4 bg-[#F6F8F6]/40 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shuffleQuestions}
                    onChange={(e) => setShuffleQuestions(e.target.checked)}
                    className="rounded text-[#0F766E]"
                  />
                  <span className="text-xs font-medium text-[#172026]">
                    Randomize question order (Fisher-Yates)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shuffleOptions}
                    onChange={(e) => setShuffleOptions(e.target.checked)}
                    className="rounded text-[#0F766E]"
                  />
                  <span className="text-xs font-medium text-[#172026]">
                    Randomize answer option order
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D6870] mb-1">
                  Deterministic Seed (Optional, for repeatable assessment forms)
                </label>
                <input
                  type="text"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  placeholder="e.g. test-seed-42"
                  className="w-full sm:w-64 px-3 py-1.5 rounded-md border border-[#D9DED9] text-xs font-mono bg-white"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#5D6870] mb-1.5">
                  Filter by Question Type:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "single-choice",
                      "multi-select",
                      "cloze-choice",
                      "error-identification",
                      "sentence-order",
                      "reading-single-choice",
                    ] as QuestionType[]
                  ).map((type) => {
                    const isSelected = selectedTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTypeToggle(type)}
                        className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
                          isSelected
                            ? "bg-[#CCFBF1] text-[#0F766E] border-[#0F766E] font-semibold"
                            : "bg-white text-[#5D6870] border-[#D9DED9]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Start Session CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#5D6870]">
            Ready to generate <strong className="text-[#172026]">{Math.min(questionCount, availableCount)}</strong> questions in{" "}
            <strong className="text-[#0F766E]">{mode === "practice" ? "Practice Mode" : "Assessment Mode"}</strong>.
          </div>

          <button
            id="start-session-button"
            type="submit"
            disabled={availableCount === 0}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0F766E] hover:bg-[#115E59] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-base font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer joy-btn-primary"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>
              {mode === "practice"
                ? `Start Practice (${Math.min(questionCount, availableCount).toLocaleString()} Qs)`
                : `Begin Assessment (${Math.min(questionCount, availableCount).toLocaleString()} Qs)`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
