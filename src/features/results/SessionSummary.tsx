import React from "react";
import { SessionResult, SessionState } from "../../domain/sessions/types.ts";
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, ArrowRight, Lightbulb, Play, Layers } from "lucide-react";

interface SessionSummaryProps {
  result: SessionResult;
  session: SessionState;
  onStartNewSession: () => void;
  onOpenReview: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({
  result,
  onStartNewSession,
  onOpenReview,
}) => {
  const isAssessment = result.mode === "assessment";
  const headlinePercentage = isAssessment ? result.scorePercentage : result.accuracyPercentage;
  const headlineLabel = isAssessment ? "Assessment Score" : "Practice Accuracy";

  // Encouraging feedback copy based on score percentage
  let feedbackMessage = "";
  if (headlinePercentage >= 90) {
    feedbackMessage = "Outstanding performance! You've demonstrated rigorous command over these language domains.";
  } else if (headlinePercentage >= 75) {
    feedbackMessage = "Great job! A solid foundation with just a few specific areas to consolidate.";
  } else if (headlinePercentage >= 50) {
    feedbackMessage = "Good practice effort. Reviewing the detailed explanations below will rapidly elevate your understanding.";
  } else {
    feedbackMessage = "Every mistake is an essential learning step. Explore the answer rationales to build mastery.";
  }

  const minutes = Math.floor(result.totalTimeSeconds / 60);
  const seconds = result.totalTimeSeconds % 60;

  return (
    <div id="session-summary" className="max-w-3xl mx-auto space-y-8">
      {/* Primary Scorecard Header */}
      <div className="p-7 sm:p-8 bg-white border border-[#D9DED9] rounded-2xl shadow-xs text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-4">
          <Award className="w-4 h-4" />
          <span>Session Completed</span>
        </div>

        <div className="text-5xl sm:text-6xl font-black text-[#172026] tracking-tight mb-2">
          {headlinePercentage}%
        </div>
        <div className="text-sm font-semibold uppercase tracking-wider text-[#5D6870] mb-3">
          {headlineLabel}
        </div>

        <p className="text-base text-[#172026] max-w-lg mx-auto leading-relaxed">
          {feedbackMessage}
        </p>

        {/* Metric tiles */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 bg-[#F6F8F6] border border-[#D9DED9] rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-[#16794B] font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Correct</span>
            </div>
            <div className="text-2xl font-bold text-[#172026]">{result.correctAnswers}</div>
            <div className="text-[11px] text-[#5D6870]">of {result.totalQuestions} questions</div>
          </div>

          <div className="p-3.5 bg-[#F6F8F6] border border-[#D9DED9] rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-[#B42318] font-semibold mb-1">
              <XCircle className="w-4 h-4" />
              <span>Incorrect</span>
            </div>
            <div className="text-2xl font-bold text-[#172026]">{result.incorrectAnswers}</div>
            <div className="text-[11px] text-[#5D6870]">opportunities to learn</div>
          </div>

          <div className="p-3.5 bg-[#F6F8F6] border border-[#D9DED9] rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-[#5D6870] font-semibold mb-1">
              <Clock className="w-4 h-4 text-[#0F766E]" />
              <span>Duration</span>
            </div>
            <div className="text-2xl font-bold text-[#172026]">
              {minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`}
            </div>
            <div className="text-[11px] text-[#5D6870]">{result.averageSecondsPerAnswer}s avg / question</div>
          </div>

          <div className="p-3.5 bg-[#F6F8F6] border border-[#D9DED9] rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-[#5D6870] font-semibold mb-1">
              <Layers className="w-4 h-4 text-[#9A6700]" />
              <span>Unanswered</span>
            </div>
            <div className="text-2xl font-bold text-[#172026]">{result.unansweredQuestions}</div>
            <div className="text-[11px] text-[#5D6870]">skipped in session</div>
          </div>
        </div>
      </div>

      {/* Suggested Next Focus Area */}
      {result.suggestedStudyCategory && (
        <div
          id="study-next-callout"
          className="p-5 rounded-xl bg-[#FFF4CC]/50 border border-[#9A6700]/30 text-[#172026] flex items-start gap-3.5"
        >
          <Lightbulb className="w-5 h-5 text-[#9A6700] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-[#9A6700] uppercase tracking-wide">
              Suggested Study Focus
            </h3>
            <p className="text-sm mt-0.5 leading-relaxed">
              Based on your session results, consolidating{" "}
              <strong className="capitalize text-[#172026]">
                {result.suggestedStudyCategory.replace("-", " ")}
              </strong>{" "}
              will yield the quickest gains in accuracy.
            </p>
          </div>
        </div>
      )}

      {/* Domain Performance Breakdown */}
      <div className="p-6 bg-white border border-[#D9DED9] rounded-xl shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#5D6870]">
          Performance by Skill Domain
        </h3>
        <div className="divide-y divide-[#E7EBE7]">
          {result.categoryBreakdowns.map((cat) => (
            <div key={cat.category} className="py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-sm font-semibold capitalize text-[#172026] block truncate">
                  {cat.category.replace("-", " ")}
                </span>
                <span className="text-xs text-[#5D6870]">
                  {cat.correct} / {cat.total} correct ({cat.answered} answered)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-[#E7EBE7] rounded-full overflow-hidden hidden sm:block">
                  <div
                    className="h-full bg-[#0F766E] rounded-full"
                    style={{ width: `${cat.accuracy}%` }}
                  />
                </div>
                <span className="text-sm font-mono font-bold text-[#172026] w-12 text-right">
                  {cat.accuracy}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="p-6 bg-white border border-[#D9DED9] rounded-xl shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#5D6870]">
          Performance by Difficulty
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {result.difficultyBreakdowns.map((diff) => (
            <div key={diff.difficulty} className="p-3.5 rounded-lg border border-[#D9DED9] bg-[#F6F8F6]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#5D6870] capitalize">
                {diff.difficulty}
              </div>
              <div className="text-xl font-bold text-[#172026] mt-1">{diff.accuracy}%</div>
              <div className="text-xs text-[#5D6870]">
                {diff.correct} of {diff.total} correct
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          id="review-answers-button"
          type="button"
          onClick={onOpenReview}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#0F766E] text-[#0F766E] hover:bg-[#CCFBF1] text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Review All Answers & Explanations</span>
        </button>

        <button
          id="new-session-button"
          type="button"
          onClick={onStartNewSession}
          className="w-full sm:w-auto px-7 py-3 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer joy-btn-primary"
        >
          <span>Start Another Session</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
