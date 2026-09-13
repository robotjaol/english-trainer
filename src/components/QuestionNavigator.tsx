import React, { useState, useEffect } from "react";
import { Flag, Check, X, ChevronLeft, ChevronRight, Hash } from "lucide-react";
import { QuestionEvaluation } from "../domain/sessions/types.ts";

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentIndex: number;
  answeredIndices: Set<number>;
  flaggedIndices: Set<number>;
  evaluations?: Record<string, QuestionEvaluation>;
  questionIds: string[];
  mode: "practice" | "assessment" | "review";
  onSelectIndex: (index: number) => void;
}

const CHUNK_SIZE = 50;

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestions,
  currentIndex,
  answeredIndices,
  flaggedIndices,
  evaluations = {},
  questionIds,
  mode,
  onSelectIndex,
}) => {
  const isChunked = totalQuestions > 30;
  const totalPages = Math.ceil(totalQuestions / CHUNK_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(() => Math.floor(currentIndex / CHUNK_SIZE));
  const [jumpInput, setJumpInput] = useState<string>("");

  // Sync page with currentIndex when user navigates next/prev
  useEffect(() => {
    const targetPage = Math.floor(currentIndex / CHUNK_SIZE);
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }
  }, [currentIndex]);

  const startIndex = isChunked ? currentPage * CHUNK_SIZE : 0;
  const endIndex = isChunked ? Math.min(totalQuestions, (currentPage + 1) * CHUNK_SIZE) : totalQuestions;

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= totalQuestions) {
      onSelectIndex(num - 1);
      setJumpInput("");
    }
  };

  return (
    <nav
      id="question-navigator"
      aria-label="Question Navigation"
      className="p-4 bg-white border border-[#D9DED9] rounded-lg shadow-xs"
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E7EBE7]">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#5D6870]">Questions</h2>
        <span className="text-xs font-mono text-[#5D6870]">
          {answeredIndices.size}/{totalQuestions} Answered
        </span>
      </div>

      {/* Pagination controls for large sessions (50 to 1000 questions) */}
      {isChunked && (
        <div className="mb-3 flex items-center justify-between gap-1 text-xs bg-[#F6F8F6] p-1.5 rounded-md border border-[#E7EBE7]">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-1 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Previous question group"
          >
            <ChevronLeft className="w-4 h-4 text-[#172026]" />
          </button>

          <span className="font-medium text-[#172026] text-[11px]">
            {startIndex + 1}–{endIndex} <span className="text-[#5D6870]">of {totalQuestions}</span>
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="p-1 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Next question group"
          >
            <ChevronRight className="w-4 h-4 text-[#172026]" />
          </button>
        </div>
      )}

      {/* Grid of questions (chunked or full) */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 gap-1.5 max-h-[340px] overflow-y-auto pr-1">
        {Array.from({ length: endIndex - startIndex }, (_, idx) => {
          const i = startIndex + idx;
          const isCurrent = i === currentIndex;
          const isAnswered = answeredIndices.has(i);
          const isFlagged = flaggedIndices.has(i);
          const qId = questionIds[i];
          const evaluation = evaluations[qId];

          let buttonClasses =
            "relative flex items-center justify-center h-9 w-9 rounded-md text-xs font-medium transition-all cursor-pointer border ";

          if (isCurrent) {
            buttonClasses += "border-[#0F766E] ring-2 ring-[#0F766E]/30 font-bold bg-[#CCFBF1] text-[#0F766E] ";
          } else if (mode === "practice" && evaluation) {
            if (evaluation.isCorrect) {
              buttonClasses += "bg-[#E8F7EE] text-[#16794B] border-[#16794B]/30 ";
            } else {
              buttonClasses += "bg-[#FDECEA] text-[#B42318] border-[#B42318]/30 ";
            }
          } else if (isAnswered) {
            buttonClasses += "bg-[#F6F8F6] text-[#172026] border-[#D9DED9] font-medium ";
          } else {
            buttonClasses += "bg-white text-[#5D6870] border-[#E7EBE7] hover:border-[#D9DED9] hover:bg-[#F6F8F6] ";
          }

          let ariaLabel = `Question ${i + 1}`;
          if (isCurrent) ariaLabel += ", current question";
          if (isAnswered) ariaLabel += ", answered";
          if (isFlagged) ariaLabel += ", flagged";
          if (evaluation) {
            ariaLabel += evaluation.isCorrect ? ", marked correct" : ", marked incorrect";
          }

          return (
            <button
              key={i}
              type="button"
              id={`nav-question-${i + 1}`}
              onClick={() => onSelectIndex(i)}
              className={buttonClasses}
              aria-label={ariaLabel}
              aria-current={isCurrent ? "true" : undefined}
            >
              <span>{i + 1}</span>

              {/* Flag icon */}
              {isFlagged && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#9A6700] text-white">
                  <Flag className="w-2 h-2 fill-current" />
                </span>
              )}

              {/* Practice feedback mark */}
              {mode === "practice" && evaluation && !isCurrent && (
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full">
                  {evaluation.isCorrect ? (
                    <span className="bg-[#16794B] text-white rounded-full p-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="bg-[#B42318] text-white rounded-full p-0.5">
                      <X className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Jump directly to any question number (super convenient for up to 1000 questions) */}
      {isChunked && (
        <form onSubmit={handleJump} className="mt-3 pt-2.5 border-t border-[#E7EBE7] flex items-center gap-1.5">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[#5D6870]">
              <Hash className="w-3.5 h-3.5" />
            </span>
            <input
              type="number"
              min={1}
              max={totalQuestions}
              placeholder={`Jump (1–${totalQuestions})`}
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              className="w-full pl-6 pr-2 py-1 text-xs rounded border border-[#D9DED9] bg-[#F6F8F6] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
            />
          </div>
          <button
            type="submit"
            disabled={!jumpInput}
            className="px-2.5 py-1 rounded text-xs font-semibold bg-[#0F766E] text-white hover:bg-[#115E59] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Go
          </button>
        </form>
      )}

      {/* Legend */}
      <div className="mt-3 pt-2.5 border-t border-[#E7EBE7] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-[#5D6870]">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-[#CCFBF1] border border-[#0F766E]" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-[#F6F8F6] border border-[#D9DED9]" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1">
          <Flag className="w-2.5 h-2.5 text-[#9A6700] fill-current" />
          <span>Flagged</span>
        </div>
      </div>
    </nav>
  );
};
