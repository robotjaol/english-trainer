import { SessionResult } from "../sessions/types.ts";

export interface ReviewQueueItem {
  questionId: string;
  incorrectCount: number;
  consecutiveCorrectCount: number;
  flagged: boolean;
  lastAttemptedAt: number;
  lastSelectedAnswer?: string;
  category: string;
}

export interface CumulativeCategoryStats {
  category: string;
  attempts: number;
  correct: number;
  unanswered: number;
  totalTimeSeconds: number;
}

export interface CumulativeDifficultyStats {
  difficulty: "easy" | "medium" | "hard";
  attempts: number;
  correct: number;
}

export interface UserStatistics {
  schemaVersion: number;
  totalSessionsCompleted: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  overallAccuracy: number;
  totalPracticeTimeSeconds: number;
  categories: Record<string, CumulativeCategoryStats>;
  difficulties: Record<string, CumulativeDifficultyStats>;
  recentResults: Array<{
    sessionId: string;
    mode: string;
    scorePercentage: number;
    accuracyPercentage: number;
    completedAt: number;
  }>;
}

export function createEmptyStatistics(): UserStatistics {
  return {
    schemaVersion: 1,
    totalSessionsCompleted: 0,
    totalQuestionsAnswered: 0,
    totalCorrectAnswers: 0,
    overallAccuracy: 0,
    totalPracticeTimeSeconds: 0,
    categories: {},
    difficulties: {},
    recentResults: [],
  };
}

export function updateStatisticsWithResult(
  current: UserStatistics,
  result: SessionResult
): UserStatistics {
  const updated: UserStatistics = {
    ...current,
    totalSessionsCompleted: current.totalSessionsCompleted + 1,
    totalQuestionsAnswered: current.totalQuestionsAnswered + result.answeredQuestions,
    totalCorrectAnswers: current.totalCorrectAnswers + result.correctAnswers,
    totalPracticeTimeSeconds: current.totalPracticeTimeSeconds + result.totalTimeSeconds,
    categories: { ...current.categories },
    difficulties: { ...current.difficulties },
    recentResults: [
      {
        sessionId: result.sessionId,
        mode: result.mode,
        scorePercentage: result.scorePercentage,
        accuracyPercentage: result.accuracyPercentage,
        completedAt: result.completedAt,
      },
      ...current.recentResults.slice(0, 9), // keep latest 10
    ],
  };

  updated.overallAccuracy =
    updated.totalQuestionsAnswered > 0
      ? Math.round((updated.totalCorrectAnswers / updated.totalQuestionsAnswered) * 100)
      : 0;

  // Update categories
  for (const cb of result.categoryBreakdowns) {
    const existing = updated.categories[cb.category] || {
      category: cb.category,
      attempts: 0,
      correct: 0,
      unanswered: 0,
      totalTimeSeconds: 0,
    };
    updated.categories[cb.category] = {
      category: cb.category,
      attempts: existing.attempts + cb.answered,
      correct: existing.correct + cb.correct,
      unanswered: existing.unanswered + (cb.total - cb.answered),
      totalTimeSeconds: existing.totalTimeSeconds + Math.round(result.totalTimeSeconds / (result.categoryBreakdowns.length || 1)),
    };
  }

  // Update difficulties
  for (const db of result.difficultyBreakdowns) {
    const existing = updated.difficulties[db.difficulty] || {
      difficulty: db.difficulty,
      attempts: 0,
      correct: 0,
    };
    updated.difficulties[db.difficulty] = {
      difficulty: db.difficulty,
      attempts: existing.attempts + db.answered,
      correct: existing.correct + db.correct,
    };
  }

  return updated;
}

/**
 * Calculates priority score for study recommendations:
 * priority(category) = recentIncorrectRate * 0.60 + normalizedSlowResponseRate * 0.25 + unansweredRate * 0.15
 */
export function calculateStudyNextRecommendation(stats: UserStatistics): {
  category: string;
  reason: string;
} | null {
  const categoryKeys = Object.keys(stats.categories);
  if (categoryKeys.length === 0) return null;

  let bestCategory: string | null = null;
  let highestPriority = -1;
  let primaryReason = "";

  for (const catKey of categoryKeys) {
    const stat = stats.categories[catKey];
    if (stat.attempts < 2) continue; // need sufficient practice data

    const incorrectRate = (stat.attempts - stat.correct) / stat.attempts;
    const avgSeconds = stat.attempts > 0 ? stat.totalTimeSeconds / stat.attempts : 0;
    const slowRate = Math.min(1, avgSeconds / 60); // normalized against 60s
    const totalPrompted = stat.attempts + stat.unanswered;
    const unansweredRate = totalPrompted > 0 ? stat.unanswered / totalPrompted : 0;

    const priority = incorrectRate * 0.6 + slowRate * 0.25 + unansweredRate * 0.15;

    if (priority > highestPriority) {
      highestPriority = priority;
      bestCategory = catKey;
      if (incorrectRate > 0.3) {
        primaryReason = `Lower accuracy (${Math.round((1 - incorrectRate) * 100)}%) across recent practice`;
      } else if (unansweredRate > 0.2) {
        primaryReason = `High rate of skipped or unanswered questions`;
      } else {
        primaryReason = `Good opportunity to improve response fluency`;
      }
    }
  }

  if (!bestCategory) {
    return null;
  }

  return { category: bestCategory, reason: primaryReason };
}
