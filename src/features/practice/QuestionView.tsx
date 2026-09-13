import React from "react";
import { Question } from "../../domain/questions/schema.ts";
import { UserResponse, QuestionEvaluation } from "../../domain/sessions/types.ts";
import { SingleChoiceQuestionView } from "./renderers/SingleChoiceQuestionView.tsx";
import { MultiSelectQuestionView } from "./renderers/MultiSelectQuestionView.tsx";
import { ClozeChoiceQuestionView } from "./renderers/ClozeChoiceQuestionView.tsx";
import { ErrorIdentificationView } from "./renderers/ErrorIdentificationView.tsx";
import { SentenceOrderView } from "./renderers/SentenceOrderView.tsx";
import { ReadingQuestionView } from "./renderers/ReadingQuestionView.tsx";

interface QuestionViewProps {
  question: Question;
  optionOrder?: string[];
  fragmentOrder?: string[];
  response?: UserResponse;
  evaluation?: QuestionEvaluation;
  onResponseChange: (response: UserResponse) => void;
  disabled?: boolean;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  optionOrder = [],
  fragmentOrder,
  response,
  evaluation,
  onResponseChange,
  disabled = false,
}) => {
  const fallbackOptionOrder =
    "options" in question && Array.isArray(question.options)
      ? question.options.map((o) => o.id)
      : [];

  const effectiveOptionOrder =
    optionOrder.length > 0 ? optionOrder : fallbackOptionOrder;

  switch (question.type) {
    case "single-choice":
      return (
        <SingleChoiceQuestionView
          question={question}
          optionOrder={effectiveOptionOrder}
          response={response}
          evaluation={evaluation}
          onSelect={(optionId) =>
            onResponseChange({ type: "single-choice", optionId })
          }
          disabled={disabled}
        />
      );

    case "multi-select": {
      const currentSelected =
        response?.type === "multi-select" && Array.isArray(response.optionIds)
          ? response.optionIds
          : [];
      return (
        <MultiSelectQuestionView
          question={question}
          optionOrder={effectiveOptionOrder}
          response={response}
          evaluation={evaluation}
          onToggle={(optionId) => {
            const exists = currentSelected.includes(optionId);
            const updated = exists
              ? currentSelected.filter((id) => id !== optionId)
              : [...currentSelected, optionId];
            onResponseChange({ type: "multi-select", optionIds: updated });
          }}
          disabled={disabled}
        />
      );
    }

    case "cloze-choice":
      return (
        <ClozeChoiceQuestionView
          question={question}
          optionOrder={effectiveOptionOrder}
          response={response}
          evaluation={evaluation}
          onSelect={(optionId) =>
            onResponseChange({ type: "cloze-choice", optionId })
          }
          disabled={disabled}
        />
      );

    case "error-identification":
      return (
        <ErrorIdentificationView
          question={question}
          response={response}
          evaluation={evaluation}
          onSelectSegment={(segmentId) =>
            onResponseChange({ type: "error-identification", segmentId })
          }
          disabled={disabled}
        />
      );

    case "sentence-order":
      return (
        <SentenceOrderView
          question={question}
          initialOrder={fragmentOrder}
          response={response}
          evaluation={evaluation}
          onOrderChange={(newOrder) =>
            onResponseChange({ type: "sentence-order", order: newOrder })
          }
          disabled={disabled}
        />
      );

    case "reading-single-choice":
      return (
        <ReadingQuestionView
          question={question}
          optionOrder={effectiveOptionOrder}
          response={response}
          evaluation={evaluation}
          onSelect={(optionId) =>
            onResponseChange({ type: "reading-single-choice", optionId })
          }
          disabled={disabled}
        />
      );

    default:
      return (
        <div className="p-4 bg-[#FDECEA] border border-[#B42318] text-[#B42318] rounded-md">
          Unsupported question type: {(question as any).type}
        </div>
      );
  }
};
