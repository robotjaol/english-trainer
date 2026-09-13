import React from "react";
import { CheckCircle2, XCircle, BookOpen, Lightbulb, ArrowRight } from "lucide-react";
import { QuestionEvaluation } from "../domain/sessions/types.ts";
import { PronounceButton } from "./common/PronounceButton.tsx";

interface FeedbackPanelProps {
  evaluation: QuestionEvaluation;
  onNext?: () => void;
  hasNext: boolean;
  onFinish?: () => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  evaluation,
  onNext,
  hasNext,
  onFinish,
}) => {
  const isCorrect = evaluation.isCorrect;

  return (
    <section
      id="feedback-panel"
      aria-label="Answer evaluation and explanation"
      className={`mt-6 p-5 rounded-lg border transition-all duration-150 ${
        isCorrect
          ? "bg-[#E8F7EE] border-[#16794B]/40 text-[#172026]"
          : "bg-[#FDECEA] border-[#B42318]/40 text-[#172026]"
      }`}
    >
      {/* Header status */}
      <div className="flex items-center gap-2.5 mb-3">
        {isCorrect ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-[#16794B] shrink-0" aria-hidden="true" />
            <h3 className="text-base font-bold text-[#16794B]">
              Correct! Excellent work.
            </h3>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5 text-[#B42318] shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold text-[#B42318]">
                Incorrect — A valuable learning opportunity.
              </h3>
              <p className="text-xs text-[#5D6870] mt-0.5">
                Correct answer:{" "}
                <span className="font-semibold text-[#172026]">{evaluation.correctAnswerText}</span>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Explanation text */}
      <div className="mt-2.5 text-sm leading-relaxed text-[#172026] bg-white/70 p-3.5 rounded-md border border-black/5">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium text-xs text-[#5D6870] uppercase tracking-wide">Explanation</p>
          <PronounceButton text={evaluation.explanation} size="sm" label="Listen to explanation" />
        </div>
        <p>{evaluation.explanation}</p>
      </div>

      {/* Grammar / Vocabulary Rule (if present) */}
      {evaluation.grammarRule && (
        <div className="mt-2.5 flex items-start gap-2 text-xs bg-white/70 p-3 rounded-md border border-black/5 text-[#172026]">
          <BookOpen className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-semibold text-[#0F766E]">Key Rule: </span>
            <span>{evaluation.grammarRule}</span>
          </div>
        </div>
      )}

      {/* Learning Objective */}
      {evaluation.learningObjective && (
        <div className="mt-2 flex items-start gap-2 text-xs text-[#5D6870]">
          <Lightbulb className="w-3.5 h-3.5 text-[#9A6700] shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            <strong className="font-medium text-[#172026]">Objective:</strong> {evaluation.learningObjective}
          </span>
        </div>
      )}

      {/* Action to advance */}
      <div className="mt-4 pt-3 border-t border-black/10 flex justify-end">
        {hasNext ? (
          <button
            id="feedback-next-button"
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-md text-sm font-semibold transition-colors cursor-pointer"
          >
            <span>Next Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            id="feedback-finish-button"
            type="button"
            onClick={onFinish}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-md text-sm font-semibold transition-colors cursor-pointer"
          >
            <span>View Results</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};
