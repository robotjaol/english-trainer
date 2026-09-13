import React from "react";
import { SentenceOrderQuestion } from "../../../domain/questions/schema.ts";
import { UserResponse, QuestionEvaluation } from "../../../domain/sessions/types.ts";
import { ArrowUp, ArrowDown, Check, X, RotateCcw } from "lucide-react";

interface SentenceOrderViewProps {
  question: SentenceOrderQuestion;
  initialOrder?: string[];
  response?: UserResponse;
  evaluation?: QuestionEvaluation;
  onOrderChange: (newOrder: string[]) => void;
  disabled?: boolean;
}

export const SentenceOrderView: React.FC<SentenceOrderViewProps> = ({
  question,
  initialOrder,
  response,
  evaluation,
  onOrderChange,
  disabled = false,
}) => {
  const currentOrder =
    response?.type === "sentence-order" && Array.isArray(response.order)
      ? response.order
      : initialOrder || question.fragments.map((f) => f.id);

  const fragMap = new Map(question.fragments.map((f) => [f.id, f.text]));
  const isEvaluated = Boolean(evaluation);

  const handleMove = (index: number, direction: -1 | 1) => {
    if (disabled || isEvaluated) return;
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    onOrderChange(newOrder);
  };

  const handleReset = () => {
    if (disabled || isEvaluated) return;
    if (initialOrder) {
      onOrderChange([...initialOrder]);
    }
  };

  // Reconstructed sentence text
  const reconstructedText = currentOrder.map((id) => fragMap.get(id) || "").join(" ");

  return (
    <div className="w-full">
      {/* Live reconstructed sentence display */}
      <div
        id="sentence-order-preview"
        className="p-4 sm:p-5 mb-5 rounded-lg bg-white border border-[#D9DED9] shadow-2xs text-[#172026]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            Sentence Preview
          </span>
          {!isEvaluated && initialOrder && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#5D6870] hover:text-[#172026] inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
        <p className="text-base sm:text-lg font-medium leading-relaxed">
          "{reconstructedText}"
        </p>
      </div>

      <div className="mb-2 text-xs font-semibold text-[#5D6870] uppercase tracking-wider">
        Reorder fragments into the correct sequence:
      </div>

      {/* Interactive fragment tiles */}
      <div className="flex flex-col gap-2">
        {currentOrder.map((fragId, idx) => {
          const text = fragMap.get(fragId) || "";
          const isCorrectPosition =
            isEvaluated && question.correctOrder[idx] === fragId;
          const isWrongPosition = isEvaluated && !isCorrectPosition;

          let cardClass =
            "flex items-center justify-between p-3 rounded-lg border transition-all ";
          if (isEvaluated) {
            cardClass += isCorrectPosition
              ? "bg-[#E8F7EE] border-[#16794B] text-[#172026] "
              : "bg-[#FDECEA] border-[#B42318] text-[#172026] ";
          } else {
            cardClass += "bg-white border-[#D9DED9] text-[#172026] hover:border-[#0F766E] ";
          }

          return (
            <div key={fragId} id={`frag-${fragId}`} className={cardClass}>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#F6F8F6] border border-[#D9DED9] text-xs font-mono font-bold text-[#5D6870]">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium">{text}</span>
              </div>

              <div className="flex items-center gap-1">
                {isEvaluated ? (
                  isCorrectPosition ? (
                    <span className="text-xs font-semibold text-[#16794B] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Position {idx + 1} Correct
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-[#B42318] flex items-center gap-1">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                      Should be "{fragMap.get(question.correctOrder[idx])}"
                    </span>
                  )
                ) : (
                  <>
                    <button
                      type="button"
                      disabled={idx === 0 || disabled}
                      onClick={() => handleMove(idx, -1)}
                      className="p-1.5 rounded-md hover:bg-[#F6F8F6] disabled:opacity-30 disabled:cursor-not-allowed text-[#5D6870] hover:text-[#172026] cursor-pointer"
                      aria-label={`Move fragment "${text}" up`}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === currentOrder.length - 1 || disabled}
                      onClick={() => handleMove(idx, 1)}
                      className="p-1.5 rounded-md hover:bg-[#F6F8F6] disabled:opacity-30 disabled:cursor-not-allowed text-[#5D6870] hover:text-[#172026] cursor-pointer"
                      aria-label={`Move fragment "${text}" down`}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
