import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppShell } from "./components/AppShell.tsx";
import { JoyfulTransitionScreen } from "./components/JoyfulTransitionScreen.tsx";
import { SessionConfigurator } from "./features/configure/SessionConfigurator.tsx";
import { PracticeView } from "./features/practice/PracticeView.tsx";
import { SessionSummary } from "./features/results/SessionSummary.tsx";
import { ReviewView } from "./features/review/ReviewView.tsx";
import { StatsView } from "./features/stats/StatsView.tsx";
import { questionRepository } from "./domain/questions/repository.ts";
import { generateSession } from "./domain/sessions/generator.ts";
import { computeSessionResult } from "./domain/scoring/scoring.ts";
import { updateStatisticsWithResult, createEmptyStatistics } from "./domain/scoring/statistics.ts";
import { progressStore } from "./storage/progressStore.ts";
import { SessionConfig, SessionState, SessionResult } from "./domain/sessions/types.ts";
import { AlertCircle } from "lucide-react";

type ViewState = "configure" | "practice" | "results" | "review" | "stats";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("configure");
  const [activeSession, setActiveSession] = useState<SessionState | null>(null);
  const [completedResult, setCompletedResult] = useState<SessionResult | null>(null);
  const [completedSessionRef, setCompletedSessionRef] = useState<SessionState | null>(null);
  const [reviewQueue, setReviewQueue] = useState(() => progressStore.loadReviewQueue());
  const [stats, setStats] = useState(() => progressStore.loadStatistics());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transitionScreen, setTransitionScreen] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    badgeText: string;
    durationMs?: number;
    onComplete?: () => void;
  }>({
    isOpen: false,
    title: "",
    subtitle: "",
    badgeText: "",
  });

  // Check for active session in localStorage on mount for refresh recovery
  useEffect(() => {
    const saved = progressStore.loadActiveSession();
    if (saved && saved.status === "in_progress") {
      setActiveSession(saved);
    }
  }, []);

  // Restore ongoing session
  const handleRestoreSession = useCallback(() => {
    if (activeSession) {
      setCurrentView("practice");
    }
  }, [activeSession]);

  // Start a new session with joyful transition
  const handleStartSession = useCallback((config: SessionConfig) => {
    setErrorMessage(null);
    const result = generateSession(questionRepository, config);

    if (!result.success || !result.session) {
      setErrorMessage(result.errorMessage || "Failed to generate session with given criteria.");
      return;
    }

    const session = result.session;
    setActiveSession(session);
    progressStore.saveActiveSession(session);

    const categoryLabel = config.categories.length === 1 
      ? config.categories[0].charAt(0).toUpperCase() + config.categories[0].slice(1)
      : "All English";

    // Trigger joyful transition screen
    setTransitionScreen({
      isOpen: true,
      title: "Get Ready to Practice!",
      subtitle: `Selecting questions from the 1,000+ item bank for ${categoryLabel}...`,
      badgeText: `${config.mode.toUpperCase()} WORKOUT`,
      durationMs: 800,
      onComplete: () => {
        setTransitionScreen((prev) => ({ ...prev, isOpen: false }));
        setCurrentView("practice");
      },
    });
  }, []);

  // Update ongoing session state
  const handleUpdateSession = useCallback((updatedSession: SessionState) => {
    setActiveSession(updatedSession);
    progressStore.saveActiveSession(updatedSession);
  }, []);

  // Finalize session with celebratory transition
  const handleFinishSession = useCallback((finalSession: SessionState) => {
    const result = computeSessionResult(finalSession, questionRepository);

    // Update historical statistics
    const updatedStats = updateStatisticsWithResult(stats, result);
    setStats(updatedStats);
    progressStore.saveStatistics(updatedStats);

    // Update review queue with evaluated answers & flagged items
    const evaluatedList = finalSession.questionIds.map((qId) => {
      const q = questionRepository.getById(qId);
      const ev = finalSession.evaluations[qId];
      const resp = finalSession.responses[qId];
      return {
        questionId: qId,
        isCorrect: ev ? ev.isCorrect : false,
        category: q ? q.category : "general",
        selectedAnswer: resp ? JSON.stringify(resp) : undefined,
      };
    });

    const updatedQueue = progressStore.updateReviewQueue(
      evaluatedList,
      finalSession.flaggedQuestionIds
    );
    setReviewQueue(updatedQueue);

    // Clear active session snapshot
    progressStore.clearActiveSession();
    setActiveSession(null);

    setCompletedResult(result);
    setCompletedSessionRef(finalSession);

    // Show joyful calculation transition
    setTransitionScreen({
      isOpen: true,
      title: "Calculating Your Results",
      subtitle: "Compiling accuracy, score breakdowns, and mastery stats...",
      badgeText: "SESSION FINISHED",
      durationMs: 700,
      onComplete: () => {
        setTransitionScreen((prev) => ({ ...prev, isOpen: false }));
        setCurrentView("results");
      },
    });
  }, [stats]);

  // Launch review session from mistakes queue
  const handleLaunchReviewSession = useCallback((questionIds: string[]) => {
    if (questionIds.length === 0) return;
    const config: SessionConfig = {
      mode: "review",
      categories: [],
      difficulties: [],
      questionTypes: [],
      count: questionIds.length,
      timed: false,
      shuffleQuestions: false,
      shuffleOptions: false,
      sourceQuestionIds: questionIds,
    };
    handleStartSession(config);
  }, [handleStartSession]);

  // Reset all statistics
  const handleResetStats = useCallback(() => {
    const emptyStats = createEmptyStatistics();
    setStats(emptyStats);
    progressStore.saveStatistics(emptyStats);
    progressStore.saveReviewQueue([]);
    setReviewQueue([]);
  }, []);

  return (
    <AppShell
      currentView={currentView}
      onNavigate={(view) => {
        setErrorMessage(null);
        setCurrentView(view);
      }}
      reviewQueueCount={reviewQueue.length}
      hasActiveSession={Boolean(activeSession && activeSession.status === "in_progress")}
      onRestoreActiveSession={handleRestoreSession}
    >
      {/* Joyful Transition Screen */}
      <JoyfulTransitionScreen
        isOpen={transitionScreen.isOpen}
        title={transitionScreen.title}
        subtitle={transitionScreen.subtitle}
        badgeText={transitionScreen.badgeText}
        durationMs={transitionScreen.durationMs}
        onComplete={transitionScreen.onComplete}
      />

      {/* Global Error Banner */}
      {errorMessage && (
        <div
          id="global-error-banner"
          className="mb-6 p-4 rounded-xl bg-[#FDECEA] border border-[#B42318]/30 text-[#B42318] flex items-center justify-between gap-3 text-sm"
          role="alert"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-xs underline font-semibold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Views with Motion Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="w-full"
        >
          {currentView === "configure" && (
            <SessionConfigurator
              repository={questionRepository}
              onStartSession={handleStartSession}
              reviewQueueCount={reviewQueue.length}
              onStartReview={() => {
                if (reviewQueue.length > 0) {
                  handleLaunchReviewSession(reviewQueue.map((item) => item.questionId));
                } else {
                  setCurrentView("review");
                }
              }}
            />
          )}

          {currentView === "practice" && activeSession && (
            <PracticeView
              session={activeSession}
              repository={questionRepository}
              onUpdateSession={handleUpdateSession}
              onFinishSession={handleFinishSession}
            />
          )}

          {currentView === "results" && completedResult && (
            <SessionSummary
              result={completedResult}
              session={completedSessionRef || activeSession!}
              onStartNewSession={() => setCurrentView("configure")}
              onOpenReview={() => setCurrentView("review")}
            />
          )}

          {currentView === "review" && (
            <ReviewView
              completedSession={completedSessionRef || undefined}
              reviewQueue={reviewQueue}
              repository={questionRepository}
              onBack={() => {
                if (completedResult) {
                  setCurrentView("results");
                } else {
                  setCurrentView("configure");
                }
              }}
              onLaunchReviewSession={handleLaunchReviewSession}
            />
          )}

          {currentView === "stats" && (
            <StatsView
              stats={stats}
              reviewQueueCount={reviewQueue.length}
              onResetStats={handleResetStats}
              onBack={() => setCurrentView("configure")}
              onStartStudyRecommended={(category) => {
                handleStartSession({
                  mode: "practice",
                  categories: [category],
                  difficulties: [],
                  questionTypes: [],
                  count: 10,
                  timed: false,
                  shuffleQuestions: true,
                  shuffleOptions: true,
                });
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
