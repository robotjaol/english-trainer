import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SessionState, UserResponse } from "../../domain/sessions/types.ts";
import { QuestionRepository } from "../../domain/questions/repository.ts";
import { evaluateQuestionResponse } from "../../domain/sessions/evaluation.ts";
import { QuestionView } from "./QuestionView.tsx";
import { ProgressIndicator } from "../../components/ProgressIndicator.tsx";
import { QuestionNavigator } from "../../components/QuestionNavigator.tsx";
import { FeedbackPanel } from "../../components/FeedbackPanel.tsx";
import { Timer } from "../../components/Timer.tsx";
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle, LayoutGrid, X } from "lucide-react";
import { soundEngine } from "../../utils/soundEngine.ts";
import { PronounceButton } from "../../components/common/PronounceButton.tsx";

interface PracticeViewProps {
  session: SessionState;
  repository: QuestionRepository;
  onUpdateSession: (updatedSession: SessionState) => void;
  onFinishSession: (finalSession: SessionState) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  session,
  repository,
  onUpdateSession,
  onFinishSession,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const currentQuestionId = session.questionIds[session.currentIndex];
  const currentQuestion = repository.getById(currentQuestionId);

  const currentResponse = session.responses[currentQuestionId];
  const currentEvaluation = session.evaluations[currentQuestionId];
  const isFlagged = session.flaggedQuestionIds.includes(currentQuestionId);
  const isSubmitted = session.submittedQuestionIds.includes(currentQuestionId);

  const totalQuestions = session.questionIds.length;
  const answeredCount = Object.keys(session.responses).length;

  const answeredIndices = useMemo(() => {
    const indices = new Set<number>();
    session.questionIds.forEach((id, idx) => {
      if (session.responses[id] !== undefined) {
        indices.add(idx);
      }
    });
    return indices;
  }, [session.questionIds, session.responses]);

  const flaggedIndices = useMemo(() => {
    const indices = new Set<number>();
    session.questionIds.forEach((id, idx) => {
      if (session.flaggedQuestionIds.includes(id)) {
        indices.add(idx);
      }
    });
    return indices;
  }, [session.questionIds, session.flaggedQuestionIds]);

  // Navigate to an index
  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        onUpdateSession({
          ...session,
          currentIndex: index,
        });
        setMobileNavOpen(false);
      }
    },
    [session, totalQuestions, onUpdateSession]
  );

  // Toggle flag
  const toggleFlag = useCallback(() => {
    soundEngine.playFlagToggle();
    const exists = session.flaggedQuestionIds.includes(currentQuestionId);
    const updatedFlags = exists
      ? session.flaggedQuestionIds.filter((id) => id !== currentQuestionId)
      : [...session.flaggedQuestionIds, currentQuestionId];

    onUpdateSession({
      ...session,
      flaggedQuestionIds: updatedFlags,
    });
  }, [session, currentQuestionId, onUpdateSession]);

  // Handle response update
  const handleResponseChange = useCallback(
    (response: UserResponse) => {
      soundEngine.playOptionSelect();
      const updatedResponses = {
        ...session.responses,
        [currentQuestionId]: response,
      };

      onUpdateSession({
        ...session,
        responses: updatedResponses,
      });
    },
    [session, currentQuestionId, onUpdateSession]
  );

  // Submit current question in Practice mode
  const handleSubmitPracticeQuestion = useCallback(() => {
    if (!currentQuestion || !currentResponse) return;

    const evalResult = evaluateQuestionResponse(currentQuestion, currentResponse);
    if (evalResult.isCorrect) {
      soundEngine.playCorrect();
    } else {
      soundEngine.playIncorrect();
    }
    const updatedEvaluations = {
      ...session.evaluations,
      [currentQuestionId]: evalResult,
    };
    const updatedSubmitted = Array.from(new Set([...session.submittedQuestionIds, currentQuestionId]));

    onUpdateSession({
      ...session,
      evaluations: updatedEvaluations,
      submittedQuestionIds: updatedSubmitted,
    });
  }, [currentQuestion, currentResponse, currentQuestionId, session, onUpdateSession]);

  // Final submit
  const handleFinalSubmit = useCallback(() => {
    // Run evaluation across all questions
    const allEvaluations = { ...session.evaluations };
    for (const qId of session.questionIds) {
      if (!allEvaluations[qId]) {
        const q = repository.getById(qId);
        if (q) {
          allEvaluations[qId] = evaluateQuestionResponse(q, session.responses[qId]);
        }
      }
    }

    const completedSession: SessionState = {
      ...session,
      evaluations: allEvaluations,
      finishedAt: Date.now(),
      status: "completed",
    };

    soundEngine.playSessionComplete();
    onFinishSession(completedSession);
  }, [session, repository, onFinishSession]);

  // Timer expiration handler
  const handleTimerExpire = useCallback(() => {
    handleFinalSubmit();
  }, [handleFinalSubmit]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs or textareas
      if (
        e.target instanceof HTMLInputElement &&
        e.target.type === "text"
      ) {
        return;
      }

      // Numbers 1-5 for options selection
      if (["1", "2", "3", "4", "5"].includes(e.key) && currentQuestion) {
        const num = parseInt(e.key, 10);
        if (
          currentQuestion.type === "single-choice" ||
          currentQuestion.type === "cloze-choice" ||
          currentQuestion.type === "reading-single-choice"
        ) {
          const optOrder = session.optionOrders[currentQuestion.id] || currentQuestion.options.map((o) => o.id);
          const chosenId = optOrder[num - 1];
          if (chosenId && (!isSubmitted || session.config.mode === "assessment")) {
            handleResponseChange({
              type: currentQuestion.type as any,
              optionId: chosenId,
            });
          }
        } else if (currentQuestion.type === "error-identification") {
          const seg = currentQuestion.segments[num - 1];
          if (seg && (!isSubmitted || session.config.mode === "assessment")) {
            handleResponseChange({
              type: "error-identification",
              segmentId: seg.id,
            });
          }
        }
      }

      // Enter key behavior
      if (e.key === "Enter") {
        if (session.config.mode === "practice" && currentResponse && !isSubmitted) {
          e.preventDefault();
          handleSubmitPracticeQuestion();
        } else if (session.config.mode === "practice" && isSubmitted) {
          e.preventDefault();
          if (session.currentIndex < totalQuestions - 1) {
            goToIndex(session.currentIndex + 1);
          } else {
            handleFinalSubmit();
          }
        }
      }

      // Navigation arrows
      if (e.key === "ArrowRight" && !e.metaKey && !e.ctrlKey) {
        if (session.currentIndex < totalQuestions - 1) {
          goToIndex(session.currentIndex + 1);
        }
      } else if (e.key === "ArrowLeft" && !e.metaKey && !e.ctrlKey) {
        if (session.currentIndex > 0) {
          goToIndex(session.currentIndex - 1);
        }
      } else if (e.key === "Escape") {
        setMobileNavOpen(false);
        setShowSubmitConfirm(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentQuestion,
    session,
    isSubmitted,
    currentResponse,
    totalQuestions,
    goToIndex,
    handleResponseChange,
    handleSubmitPracticeQuestion,
    handleFinalSubmit,
  ]);

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-[#D9DED9]">
        <HelpCircle className="w-10 h-10 text-[#B42318] mx-auto mb-2" />
        <h2 className="text-lg font-bold text-[#172026]">Question Not Found</h2>
        <p className="text-sm text-[#5D6870] mt-1">Unable to locate question ID: {currentQuestionId}</p>
      </div>
    );
  }

  const isPracticeMode = session.config.mode === "practice" || session.config.mode === "review";
  const hasNext = session.currentIndex < totalQuestions - 1;
  const hasPrevious = session.currentIndex > 0;
  const canSubmitAssessment = answeredCount > 0;

  return (
    <div id="practice-viewport" className="w-full">
      {/* Top Utility Header with Timer and Mobile Navigator Toggle */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <ProgressIndicator
          currentIndex={session.currentIndex}
          totalQuestions={totalQuestions}
          answeredCount={answeredCount}
          isFlagged={isFlagged}
          onToggleFlag={toggleFlag}
          mode={session.config.mode}
        />

        {session.config.timed && session.deadlineEpochMs && (
          <div className="shrink-0 mb-6">
            <Timer deadlineEpochMs={session.deadlineEpochMs} onExpire={handleTimerExpire} />
          </div>
        )}
      </div>

      {/* Main Two-Column Layout (Question workspace on left, compact navigator on right) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Question Execution Column */}
        <div className="flex-1 w-full min-w-0">
          <div className="p-6 sm:p-7 bg-white rounded-xl border border-[#D9DED9] shadow-xs">
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
              <span className="px-2 py-0.5 rounded-md bg-[#F6F8F6] text-[#5D6870] font-medium border border-[#D9DED9] capitalize">
                {currentQuestion.category.replace("-", " ")}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#F6F8F6] text-[#5D6870] font-medium border border-[#D9DED9] capitalize">
                {currentQuestion.difficulty}
              </span>
              {currentQuestion.cefr && (
                <span className="px-2 py-0.5 rounded-md bg-[#CCFBF1] text-[#0F766E] font-bold">
                  CEFR {currentQuestion.cefr}
                </span>
              )}
            </div>

            {/* Question Prompt (except reading which renders prompt inside ReadingQuestionView) */}
            {currentQuestion.type !== "reading-single-choice" && (
              <div className="flex items-start justify-between gap-3 mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-[#172026] leading-relaxed">
                  {currentQuestion.prompt}
                </h1>
                <PronounceButton text={currentQuestion.prompt} size="md" label="Listen to sentence" />
              </div>
            )}

            {/* Interactive Question View */}
            <QuestionView
              question={currentQuestion}
              optionOrder={session.optionOrders[currentQuestion.id]}
              fragmentOrder={session.fragmentOrders[currentQuestion.id]}
              response={currentResponse}
              evaluation={isPracticeMode && isSubmitted ? currentEvaluation : undefined}
              onResponseChange={handleResponseChange}
              disabled={isPracticeMode && isSubmitted}
            />

            {/* Practice Mode: Check Answer Button (before evaluated) */}
            {isPracticeMode && !isSubmitted && (
              <div className="mt-6 pt-4 border-t border-[#E7EBE7] flex items-center justify-between gap-4">
                <p className="text-xs text-[#5D6870] hidden sm:block">
                  Press <kbd className="px-1.5 py-0.5 text-[11px] font-mono bg-[#F6F8F6] border border-[#D9DED9] rounded">Enter</kbd> to check your answer.
                </p>
                <button
                  id="check-answer-button"
                  type="button"
                  disabled={!currentResponse}
                  onClick={handleSubmitPracticeQuestion}
                  className="px-6 py-2.5 bg-[#0F766E] hover:bg-[#115E59] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer ml-auto flex items-center gap-2 joy-btn-primary"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Check Answer</span>
                </button>
              </div>
            )}

            {/* Practice Mode: Explanation / Feedback Panel */}
            {isPracticeMode && isSubmitted && currentEvaluation && (
              <FeedbackPanel
                evaluation={currentEvaluation}
                hasNext={hasNext}
                onNext={() => goToIndex(session.currentIndex + 1)}
                onFinish={handleFinalSubmit}
              />
            )}
          </div>

          {/* Bottom Navigation Controls */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              id="prev-question-button"
              type="button"
              disabled={!hasPrevious}
              onClick={() => goToIndex(session.currentIndex - 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#D9DED9] bg-white text-sm font-medium text-[#172026] hover:bg-[#F6F8F6] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Mobile Sheet Toggle for Navigator */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D9DED9] bg-white text-xs font-semibold text-[#5D6870]"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>
                {session.currentIndex + 1}/{totalQuestions}
              </span>
            </button>

            <div className="flex items-center gap-2">
              {hasNext ? (
                <button
                  id="next-question-button"
                  type="button"
                  onClick={() => goToIndex(session.currentIndex + 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#D9DED9] text-sm font-medium text-[#172026] hover:bg-[#F6F8F6] cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="finish-session-button"
                  type="button"
                  onClick={() => {
                    if (session.config.mode === "assessment" && answeredCount < totalQuestions) {
                      setShowSubmitConfirm(true);
                    } else {
                      handleFinalSubmit();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer joy-btn-primary"
                >
                  <span>Finish & Submit</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Question Navigator on Desktop */}
        <aside className="w-72 hidden lg:block shrink-0 sticky top-24">
          <QuestionNavigator
            totalQuestions={totalQuestions}
            currentIndex={session.currentIndex}
            answeredIndices={answeredIndices}
            flaggedIndices={flaggedIndices}
            evaluations={session.evaluations}
            questionIds={session.questionIds}
            mode={session.config.mode}
            onSelectIndex={goToIndex}
          />

          {session.config.mode === "assessment" && (
            <div className="mt-4 p-4 bg-white border border-[#D9DED9] rounded-lg">
              <button
                type="button"
                onClick={() => {
                  if (answeredCount < totalQuestions) {
                    setShowSubmitConfirm(true);
                  } else {
                    handleFinalSubmit();
                  }
                }}
                disabled={!canSubmitAssessment}
                className="w-full py-2.5 bg-[#0F766E] hover:bg-[#115E59] disabled:opacity-40 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit Assessment ({answeredCount}/{totalQuestions})
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile Navigator Drawer/Modal */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-2xs p-0 sm:p-4 lg:hidden"
          role="dialog"
          aria-modal="true"
          onClick={() => setMobileNavOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-xl p-5 shadow-2xl border border-[#D9DED9]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E7EBE7]">
              <span className="text-sm font-bold text-[#172026]">Jump to Question</span>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-1 rounded-md text-[#5D6870] hover:bg-[#F6F8F6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <QuestionNavigator
              totalQuestions={totalQuestions}
              currentIndex={session.currentIndex}
              answeredIndices={answeredIndices}
              flaggedIndices={flaggedIndices}
              evaluations={session.evaluations}
              questionIds={session.questionIds}
              mode={session.config.mode}
              onSelectIndex={goToIndex}
            />
          </div>
        </div>
      )}

      {/* Assessment submit confirmation when questions remain unanswered */}
      {showSubmitConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl border border-[#D9DED9] text-[#172026]">
            <h3 className="text-lg font-bold mb-2">Submit Assessment?</h3>
            <p className="text-sm text-[#5D6870] leading-relaxed mb-4">
              You have unanswered questions ({totalQuestions - answeredCount} remaining out of {totalQuestions}). In assessment mode, unanswered questions count as incorrect.
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 border border-[#D9DED9] rounded-md text-sm font-medium hover:bg-[#F6F8F6] cursor-pointer"
              >
                Keep Answering
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitConfirm(false);
                  handleFinalSubmit();
                }}
                className="px-4 py-2 bg-[#0F766E] text-white rounded-md text-sm font-semibold hover:bg-[#115E59] cursor-pointer"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
