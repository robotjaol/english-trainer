import { Question } from "../questions/schema.ts";
import { UserResponse, QuestionEvaluation } from "./types.ts";

export function evaluateQuestionResponse(
  question: Question,
  response: UserResponse | undefined
): QuestionEvaluation {
  const evaluatedAt = Date.now();

  if (!response) {
    return {
      questionId: question.id,
      isCorrect: false,
      userResponse: { type: question.type as any, optionId: "" },
      correctAnswerText: getCorrectAnswerLabel(question),
      explanation: question.explanation,
      grammarRule: getGrammarRule(question),
      learningObjective: question.learningObjective,
      evaluatedAt,
    };
  }

  let isCorrect = false;

  switch (question.type) {
    case "single-choice": {
      if (response.type === "single-choice") {
        isCorrect = response.optionId === question.correctOptionId;
      }
      break;
    }
    case "multi-select": {
      if (response.type === "multi-select" && Array.isArray(response.optionIds)) {
        const canonical = new Set(question.correctOptionIds);
        const selected = new Set(response.optionIds);
        if (canonical.size === selected.size) {
          isCorrect = Array.from(canonical).every((id) => selected.has(id));
        }
      }
      break;
    }
    case "cloze-choice": {
      if (response.type === "cloze-choice") {
        isCorrect = response.optionId === question.correctOptionId;
      }
      break;
    }
    case "error-identification": {
      if (response.type === "error-identification") {
        isCorrect = response.segmentId === question.incorrectSegmentId;
      }
      break;
    }
    case "sentence-order": {
      if (response.type === "sentence-order" && Array.isArray(response.order)) {
        isCorrect =
          response.order.length === question.correctOrder.length &&
          response.order.every((fragId, idx) => fragId === question.correctOrder[idx]);
      }
      break;
    }
    case "reading-single-choice": {
      if (response.type === "reading-single-choice") {
        isCorrect = response.optionId === question.correctOptionId;
      }
      break;
    }
  }

  return {
    questionId: question.id,
    isCorrect,
    userResponse: response,
    correctAnswerText: getCorrectAnswerLabel(question),
    explanation: question.explanation,
    grammarRule: getGrammarRule(question),
    learningObjective: question.learningObjective,
    evaluatedAt,
  };
}

export function getCorrectAnswerLabel(question: Question): string {
  switch (question.type) {
    case "single-choice":
    case "cloze-choice":
    case "reading-single-choice": {
      const opt = question.options.find((o) => o.id === question.correctOptionId);
      return opt ? opt.text : question.correctOptionId;
    }
    case "multi-select": {
      const correctOpts = question.options.filter((o) => question.correctOptionIds.includes(o.id));
      return correctOpts.map((o) => o.text).join(" AND ");
    }
    case "error-identification": {
      const seg = question.segments.find((s) => s.id === question.incorrectSegmentId);
      return seg ? `Segment with error: "${seg.text}"` : question.incorrectSegmentId;
    }
    case "sentence-order": {
      const fragMap = new Map(question.fragments.map((f) => [f.id, f.text]));
      return question.correctOrder.map((id) => fragMap.get(id) || id).join(" ");
    }
  }
}

function getGrammarRule(question: Question): string | undefined {
  if ("grammarRule" in question) {
    return question.grammarRule;
  }
  return undefined;
}
