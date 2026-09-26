import { Difficulty, Cefr, QuestionType } from "../questions/schema.ts";

export type SessionMode = "practice" | "assessment" | "review";

export interface SessionConfig {
  categories: string[];
  difficulties: Difficulty[];
  cefr?: Cefr[];
  questionTypes: QuestionType[];
  count: number;
  mode: SessionMode;
  timed: boolean;
  timeLimitSeconds?: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  seed?: string;
  sourceQuestionIds?: string[]; // for Review mode or specific queue
  bankScope?: "all" | "audited" | "extended";
}

export type UserResponse =
  | { type: "single-choice"; optionId: string }
  | { type: "multi-select"; optionIds: string[] }
  | { type: "cloze-choice"; optionId: string }
  | { type: "error-identification"; segmentId: string }
  | { type: "sentence-order"; order: string[] }
  | { type: "reading-single-choice"; optionId: string };

export interface QuestionEvaluation {
  questionId: string;
  isCorrect: boolean;
  userResponse: UserResponse;
  correctAnswerText: string;
  explanation: string;
  grammarRule?: string;
  learningObjective: string;
  evaluatedAt: number;
}

export interface SessionState {
  id: string;
  config: SessionConfig;
  questionIds: string[];
  optionOrders: Record<string, string[]>;
  fragmentOrders: Record<string, string[]>;
  currentIndex: number;
  responses: Record<string, UserResponse>;
  evaluations: Record<string, QuestionEvaluation>;
  flaggedQuestionIds: string[];
  submittedQuestionIds: string[]; // specifically for practice mode immediate evaluation
  startedAt: number;
  deadlineEpochMs?: number;
  finishedAt?: number;
  seed: string;
  status: "in_progress" | "completed";
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  answered: number;
  correct: number;
  accuracy: number;
}

export interface DifficultyBreakdown {
  difficulty: Difficulty;
  total: number;
  answered: number;
  correct: number;
  accuracy: number;
}

export interface SessionResult {
  sessionId: string;
  mode: SessionMode;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  scorePercentage: number;
  accuracyPercentage: number;
  totalTimeSeconds: number;
  averageSecondsPerAnswer: number;
  categoryBreakdowns: CategoryBreakdown[];
  difficultyBreakdowns: DifficultyBreakdown[];
  suggestedStudyCategory?: string;
  seed: string;
  completedAt: number;
}
