import React, { useState, useMemo } from "react";
import { QuestionRepository } from "../../domain/questions/repository.ts";
import { SessionState, QuestionEvaluation } from "../../domain/sessions/types.ts";
import { ReviewQueueItem } from "../../domain/scoring/statistics.ts";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, BookOpen, Lightbulb, Flag, Filter, Play } from "lucide-react";

interface ReviewViewProps {
  completedSession?: SessionState;
  reviewQueue: ReviewQueueItem[];
  repository: QuestionRepository;
  onBack: () => void;
  onLaunchReviewSession: (questionIds: string[]) => void;
}

export const ReviewView: React.FC<ReviewViewProps> = ({
  completedSession,
  reviewQueue,
  repository,
  onBack,
  onLaunchReviewSession,
}) => {
  const [filterMode, setFilterMode] = useState<"all" | "incorrect" | "flagged">("all");

  // Build reviewable items
  const items = useMemo(() => {
    if (completedSession) {
      return completedSession.questionIds.map((qId, idx) => {
        const question = repository.getById(qId);
        const evaluation = completedSession.evaluations[qId];
        const response = completedSession.responses[qId];
        const isFlagged = completedSession.flaggedQuestionIds.includes(qId);

        return {
          questionId: qId,
          question,
          evaluation,
          response,
          isFlagged,
          index: idx + 1,
        };
      });
    } else {
      // From persistent review queue
      return reviewQueue.map((queueItem, idx) => {
        const question = repository.getById(queueItem.questionId);
        return {
          questionId: queueItem.questionId,
          question,
          evaluation: undefined as QuestionEvaluation | undefined,
          response: undefined,
          isFlagged: queueItem.flagged,
          incorrectCount: queueItem.incorrectCount,
          index: idx + 1,
        };
      });
    }
  }, [completedSession, reviewQueue, repository]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (!item.question) return false;
      if (filterMode === "incorrect") {
        if (completedSession) {
          return item.evaluation && !item.evaluation.isCorrect;
        }
        return (item.incorrectCount || 0) > 0;
      }
      if (filterMode === "flagged") {
        return item.isFlagged;
      }
      return true;
    });
  }, [items, filterMode, completedSession]);

  const incorrectCount = items.filter(
    (i) => i.evaluation && !i.evaluation.isCorrect
  ).length;

  const flaggedCount = items.filter((i) => i.isFlagged).length;

  return (
    <div id="review-view" className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9DED9]">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5D6870] hover:text-[#172026] mb-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172026]">
            {completedSession ? "Session Answer Review" : "Mistakes & Review Queue"}
          </h1>
          <p className="text-xs sm:text-sm text-[#5D6870] mt-0.5">
            Understand the rule behind each question and solidify your language intuition.
          </p>
        </div>

        {filteredItems.length > 0 && (
          <button
            type="button"
            onClick={() =>
              onLaunchReviewSession(filteredItems.map((i) => i.questionId))
            }
            className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Practice These ({filteredItems.length})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFilterMode("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
            filterMode === "all"
              ? "bg-[#0F766E] text-white border-[#0F766E]"
              : "bg-white text-[#5D6870] border-[#D9DED9] hover:bg-[#F6F8F6]"
          }`}
        >
          All Items ({items.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterMode("incorrect")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterMode === "incorrect"
              ? "bg-[#B42318] text-white border-[#B42318]"
              : "bg-white text-[#5D6870] border-[#D9DED9] hover:bg-[#F6F8F6]"
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Incorrect Only ({incorrectCount || reviewQueue.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterMode("flagged")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterMode === "flagged"
              ? "bg-[#9A6700] text-white border-[#9A6700]"
              : "bg-white text-[#5D6870] border-[#D9DED9] hover:bg-[#F6F8F6]"
          }`}
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Flagged ({flaggedCount})</span>
        </button>
      </div>

      {/* Questions list */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-[#D9DED9]">
          <CheckCircle2 className="w-10 h-10 text-[#16794B] mx-auto mb-2" />
          <h3 className="text-base font-bold text-[#172026]">No Questions to Display</h3>
          <p className="text-xs text-[#5D6870] mt-1">
            There are no questions matching the current review filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const q = item.question!;
            const evalResult = item.evaluation;
            const isCorrect = evalResult?.isCorrect;

            return (
              <article
                key={item.questionId}
                className="p-5 sm:p-6 bg-white border border-[#D9DED9] rounded-xl shadow-2xs space-y-4"
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E7EBE7]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#5D6870]">
                      Question #{item.index}
                    </span>
                    <span className="px-2 py-0.2 rounded bg-[#F6F8F6] text-[11px] font-medium border border-[#D9DED9] capitalize">
                      {q.category.replace("-", " ")}
                    </span>
                    <span className="px-2 py-0.2 rounded bg-[#F6F8F6] text-[11px] font-medium border border-[#D9DED9] capitalize">
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.isFlagged && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A6700]">
                        <Flag className="w-3.5 h-3.5 fill-current" />
                        <span>Flagged</span>
                      </span>
                    )}

                    {evalResult ? (
                      isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16794B] bg-[#E8F7EE] px-2.5 py-0.5 rounded border border-[#16794B]/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#B42318] bg-[#FDECEA] px-2.5 py-0.5 rounded border border-[#B42318]/30">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect</span>
                        </span>
                      )
                    ) : (
                      <span className="text-xs text-[#5D6870] font-mono">
                        {item.incorrectCount} previous error(s)
                      </span>
                    )}
                  </div>
                </div>

                {/* Prompt */}
                <div>
                  <h3 className="text-base font-semibold text-[#172026] leading-relaxed">
                    {q.prompt}
                  </h3>
                </div>

                {/* Answer Rationale / Correct answer display */}
                <div className="p-4 bg-[#F6F8F6] border border-[#D9DED9] rounded-lg space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                    Correct Answer
                  </div>
                  <p className="text-sm font-semibold text-[#172026]">
                    {evalResult?.correctAnswerText || getCanonicalAnswerPreview(q)}
                  </p>

                  <div className="pt-2 border-t border-[#D9DED9]/60 text-xs sm:text-sm text-[#172026] leading-relaxed">
                    <p className="font-semibold text-xs text-[#5D6870] uppercase mb-0.5">
                      Explanation
                    </p>
                    <p>{q.explanation}</p>
                  </div>

                  {"grammarRule" in q && q.grammarRule && (
                    <div className="pt-2 flex items-start gap-2 text-xs text-[#0F766E]">
                      <BookOpen className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        <strong>Grammar Rule:</strong> {q.grammarRule}
                      </span>
                    </div>
                  )}

                  {q.learningObjective && (
                    <div className="pt-1 flex items-start gap-2 text-xs text-[#5D6870]">
                      <Lightbulb className="w-3.5 h-3.5 text-[#9A6700] shrink-0 mt-0.5" />
                      <span>
                        <strong>Objective:</strong> {q.learningObjective}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

function getCanonicalAnswerPreview(q: any): string {
  if (q.type === "single-choice" || q.type === "cloze-choice" || q.type === "reading-single-choice") {
    const opt = q.options?.find((o: any) => o.id === q.correctOptionId);
    return opt ? opt.text : q.correctOptionId;
  }
  if (q.type === "multi-select") {
    const opts = q.options?.filter((o: any) => q.correctOptionIds?.includes(o.id));
    return opts?.map((o: any) => o.text).join(", ") || "";
  }
  if (q.type === "error-identification") {
    const seg = q.segments?.find((s: any) => s.id === q.incorrectSegmentId);
    return seg ? `Segment with error: "${seg.text}"` : q.incorrectSegmentId;
  }
  if (q.type === "sentence-order") {
    const fragMap = new Map(q.fragments?.map((f: any) => [f.id, f.text]));
    return q.correctOrder?.map((id: string) => fragMap.get(id) || id).join(" ") || "";
  }
  return "";
}
