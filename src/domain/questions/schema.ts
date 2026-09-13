export type Difficulty = "easy" | "medium" | "hard";
export type Cefr = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type QuestionType =
  | "single-choice"
  | "multi-select"
  | "cloze-choice"
  | "error-identification"
  | "sentence-order"
  | "reading-single-choice";

export interface Choice {
  id: string;
  text: string;
}

export interface Segment {
  id: string;
  text: string;
}

export interface Fragment {
  id: string;
  text: string;
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  category: string;
  subcategory?: string;
  difficulty: Difficulty;
  cefr?: Cefr;
  prompt: string;
  explanation: string;
  learningObjective: string;
  tags: string[];
  estimatedSeconds?: number;
  source?: {
    label: string;
    url?: string;
    license?: string;
  };
  version: number;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single-choice";
  options: Choice[];
  correctOptionId: string;
  grammarRule?: string;
  incorrectRationales?: Record<string, string>;
}

export interface MultiSelectQuestion extends BaseQuestion {
  type: "multi-select";
  options: Choice[];
  correctOptionIds: string[];
  grammarRule?: string;
}

export interface ClozeChoiceQuestion extends BaseQuestion {
  type: "cloze-choice";
  prompt: string; // contains exactly one {{blank}}
  options: Choice[];
  correctOptionId: string;
  grammarRule?: string;
}

export interface ErrorIdentificationQuestion extends BaseQuestion {
  type: "error-identification";
  segments: Segment[];
  incorrectSegmentId: string;
  grammarRule?: string;
}

export interface SentenceOrderQuestion extends BaseQuestion {
  type: "sentence-order";
  fragments: Fragment[];
  correctOrder: string[];
}

export interface ReadingSingleChoiceQuestion extends BaseQuestion {
  type: "reading-single-choice";
  passageId: string;
  passage: string;
  options: Choice[];
  correctOptionId: string;
}

export type Question =
  | SingleChoiceQuestion
  | MultiSelectQuestion
  | ClozeChoiceQuestion
  | ErrorIdentificationQuestion
  | SentenceOrderQuestion
  | ReadingSingleChoiceQuestion;
