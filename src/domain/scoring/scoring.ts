import { Question } from "../questions/schema.ts";
import { SessionState, SessionResult, CategoryBreakdown, DifficultyBreakdown } from "../sessions/types.ts";
import { QuestionRepository } from "../questions/repository.ts";
import { evaluateQuestionResponse } from "../sessions/evaluation.ts";

export function computeSessionResult(
  session: SessionState,
  repository: QuestionRepository
): SessionResult {
  const totalQuestions = session.questionIds.length;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let answeredQuestions = 0;

  const categoryMap = new Map<string, { total: number; answered: number; correct: number }>();
  const difficultyMap = new Map<string, { total: number; answered: number; correct: number }>();

  for (const qId of session.questionIds) {
    const question = repository.getById(qId);
    if (!question) continue;

    // Track category counts
    if (!categoryMap.has(question.category)) {
      categoryMap.set(question.category, { total: 0, answered: 0, correct: 0 });
    }
    const catStat = categoryMap.get(question.category)!;
    catStat.total++;

    // Track difficulty counts
    if (!difficultyMap.has(question.difficulty)) {
      difficultyMap.set(question.difficulty, { total: 0, answered: 0, correct: 0 });
    }
    const diffStat = difficultyMap.get(question.difficulty)!;
    diffStat.total++;

    const response = session.responses[qId];
    if (response) {
      answeredQuestions++;
      catStat.answered++;
      diffStat.answered++;

      // Evaluate if not already evaluated
      const evalResult = session.evaluations[qId] || evaluateQuestionResponse(question, response);
      if (evalResult.isCorrect) {
        correctAnswers++;
        catStat.correct++;
        diffStat.correct++;
      } else {
        incorrectAnswers++;
      }
    }
  }

  const unansweredQuestions = totalQuestions - answeredQuestions;

  // Practice mode: accuracy = correct / answered * 100
  // Assessment mode: score = correct / totalQuestions * 100
  const accuracyPercentage =
    answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;
  const scorePercentage =
    totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const finishedAt = session.finishedAt || Date.now();
  const totalTimeSeconds = Math.max(1, Math.round((finishedAt - session.startedAt) / 1000));
  const averageSecondsPerAnswer =
    answeredQuestions > 0 ? Math.round((totalTimeSeconds / answeredQuestions) * 10) / 10 : 0;

  const categoryBreakdowns: CategoryBreakdown[] = Array.from(categoryMap.entries()).map(
    ([category, stat]) => ({
      category,
      total: stat.total,
      answered: stat.answered,
      correct: stat.correct,
      accuracy: stat.answered > 0 ? Math.round((stat.correct / stat.answered) * 100) : 0,
    })
  );

  const difficultyBreakdowns: DifficultyBreakdown[] = Array.from(difficultyMap.entries()).map(
    ([difficulty, stat]) => ({
      difficulty: difficulty as any,
      total: stat.total,
      answered: stat.answered,
      correct: stat.correct,
      accuracy: stat.answered > 0 ? Math.round((stat.correct / stat.answered) * 100) : 0,
    })
  );

  // Determine suggested study category (category with lowest accuracy or highest errors)
  let suggestedStudyCategory: string | undefined = undefined;
  let lowestAccuracy = 101;
  for (const cat of categoryBreakdowns) {
    if (cat.answered > 0 && cat.accuracy < lowestAccuracy) {
      lowestAccuracy = cat.accuracy;
      suggestedStudyCategory = cat.category;
    }
  }

  return {
    sessionId: session.id,
    mode: session.config.mode,
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    incorrectAnswers,
    unansweredQuestions,
    scorePercentage,
    accuracyPercentage,
    totalTimeSeconds,
    averageSecondsPerAnswer,
    categoryBreakdowns,
    difficultyBreakdowns,
    suggestedStudyCategory,
    seed: session.seed,
    completedAt: finishedAt,
  };
}
