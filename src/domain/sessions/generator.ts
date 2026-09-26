import { Question } from "../questions/schema.ts";
import { SessionConfig, SessionState } from "./types.ts";
import { QuestionRepository } from "../questions/repository.ts";
import { createRng, generateSeed, fisherYatesShuffle, sampleWithoutReplacement } from "./shuffle.ts";

export interface GenerationResult {
  success: boolean;
  session?: SessionState;
  errorMessage?: string;
  availableCount: number;
}

export function generateSession(
  repository: QuestionRepository,
  rawConfig: SessionConfig
): GenerationResult {
  const seed = rawConfig.seed?.trim() ? rawConfig.seed.trim() : generateSeed();
  const rng = createRng(seed);

  // Normalize config
  const config: SessionConfig = {
    ...rawConfig,
    seed,
    categories: rawConfig.categories || [],
    difficulties: rawConfig.difficulties || [],
    questionTypes: rawConfig.questionTypes || [],
    count: Math.max(1, rawConfig.count || 5),
    shuffleQuestions: rawConfig.shuffleQuestions !== false,
    shuffleOptions: rawConfig.shuffleOptions !== false,
  };

  // If Review mode with specific sourceQuestionIds
  let eligibleQuestions: Question[] = [];
  if (config.mode === "review" && config.sourceQuestionIds && config.sourceQuestionIds.length > 0) {
    eligibleQuestions = repository.getByIds(config.sourceQuestionIds);
  } else {
    eligibleQuestions = repository.filter({
      categories: config.categories.length > 0 ? config.categories : undefined,
      difficulties: config.difficulties.length > 0 ? config.difficulties : undefined,
      cefr: config.cefr && config.cefr.length > 0 ? config.cefr : undefined,
      questionTypes: config.questionTypes.length > 0 ? config.questionTypes : undefined,
      bankScope: config.bankScope,
    });
  }

  const availableCount = eligibleQuestions.length;

  if (availableCount === 0) {
    return {
      success: false,
      availableCount: 0,
      errorMessage: "No questions match your selected filters. Please expand your categories or difficulty selection.",
    };
  }

  const targetCount = Math.min(config.count, availableCount);

  // Sample questions without replacement
  let selectedQuestions: Question[] = [];

  // Category balancing if multiple categories selected and not review mode
  if (config.categories.length > 1 && config.mode !== "review") {
    const questionsByCategory = new Map<string, Question[]>();
    for (const cat of config.categories) {
      questionsByCategory.set(
        cat,
        eligibleQuestions.filter((q) => q.category === cat)
      );
    }

    const basePerCat = Math.floor(targetCount / config.categories.length);
    let remainder = targetCount % config.categories.length;

    const pooled: Question[] = [];
    const usedIds = new Set<string>();

    for (const cat of config.categories) {
      const catQuestions = questionsByCategory.get(cat) || [];
      const takeCount = basePerCat + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;

      const sampled = sampleWithoutReplacement(catQuestions, takeCount, rng);
      for (const q of sampled) {
        if (!usedIds.has(q.id)) {
          pooled.push(q);
          usedIds.add(q.id);
        }
      }
    }

    // If balanced allocation didn't fill targetCount due to small category pool, fill from remainder
    if (pooled.length < targetCount) {
      const remainingPool = eligibleQuestions.filter((q) => !usedIds.has(q.id));
      const fill = sampleWithoutReplacement(remainingPool, targetCount - pooled.length, rng);
      for (const q of fill) {
        pooled.push(q);
      }
    }

    selectedQuestions = pooled;
  } else {
    selectedQuestions = sampleWithoutReplacement(eligibleQuestions, targetCount, rng);
  }

  // Question-order shuffling
  if (config.shuffleQuestions) {
    selectedQuestions = fisherYatesShuffle(selectedQuestions, rng);
  }

  const questionIds = selectedQuestions.map((q) => q.id);
  const optionOrders: Record<string, string[]> = {};
  const fragmentOrders: Record<string, string[]> = {};

  // Answer-order shuffling (preserving option IDs and correctness)
  for (const q of selectedQuestions) {
    if (q.type === "single-choice" || q.type === "multi-select" || q.type === "cloze-choice" || q.type === "reading-single-choice") {
      const originalOptionIds = q.options.map((o) => o.id);
      if (config.shuffleOptions) {
        optionOrders[q.id] = fisherYatesShuffle(originalOptionIds, rng);
      } else {
        optionOrders[q.id] = originalOptionIds;
      }
    } else if (q.type === "sentence-order") {
      // Scramble fragments for the user to order
      const fragIds = q.fragments.map((f) => f.id);
      let scrambled = fisherYatesShuffle(fragIds, rng);
      // Ensure it's not accidentally identical to the correct order initially if > 1
      if (scrambled.every((id, idx) => id === q.correctOrder[idx]) && scrambled.length > 1) {
        // swap first two
        const tmp = scrambled[0];
        scrambled[0] = scrambled[1];
        scrambled[1] = tmp;
      }
      fragmentOrders[q.id] = scrambled;
    }
  }

  const startedAt = Date.now();
  let deadlineEpochMs: number | undefined = undefined;

  if (config.timed && config.timeLimitSeconds && config.timeLimitSeconds > 0) {
    deadlineEpochMs = startedAt + config.timeLimitSeconds * 1000;
  }

  const session: SessionState = {
    id: `session_${startedAt}_${seed}`,
    config,
    questionIds,
    optionOrders,
    fragmentOrders,
    currentIndex: 0,
    responses: {},
    evaluations: {},
    flaggedQuestionIds: [],
    submittedQuestionIds: [],
    startedAt,
    deadlineEpochMs,
    seed,
    status: "in_progress",
  };

  return {
    success: true,
    session,
    availableCount,
  };
}
