import {
  SingleChoiceQuestion,
  ClozeChoiceQuestion,
  ErrorIdentificationQuestion,
  SentenceOrderQuestion,
  ReadingSingleChoiceQuestion,
  Difficulty,
  Cefr,
} from "../../../domain/questions/schema.ts";

export interface SingleChoiceDef {
  id: string;
  category: string;
  subcategory: string;
  difficulty: Difficulty;
  cefr: Cefr;
  prompt: string;
  correct: string;
  distractors: [string, string, string];
  explanation: string;
  learningObjective: string;
  grammarRule?: string;
  tags: string[];
  estimatedSeconds?: number;
}

export function buildSingleChoice(def: SingleChoiceDef, posIndex: number): SingleChoiceQuestion {
  const letters = ["a", "b", "c", "d"];
  const correctSlot = posIndex % 4;
  const options = new Array(4);

  options[correctSlot] = { id: letters[correctSlot], text: def.correct };
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i !== correctSlot) {
      options[i] = { id: letters[i], text: def.distractors[dIdx++] };
    }
  }

  return {
    id: def.id,
    type: "single-choice",
    category: def.category,
    subcategory: def.subcategory,
    difficulty: def.difficulty,
    cefr: def.cefr,
    prompt: def.prompt,
    options,
    correctOptionId: letters[correctSlot],
    explanation: def.explanation,
    learningObjective: def.learningObjective,
    grammarRule: def.grammarRule,
    tags: def.tags,
    estimatedSeconds: def.estimatedSeconds || 25,
    version: 1,
  };
}

export interface ClozeChoiceDef {
  id: string;
  category: string;
  subcategory: string;
  difficulty: Difficulty;
  cefr: Cefr;
  prompt: string; // contains {{blank}}
  correct: string;
  distractors: [string, string, string];
  explanation: string;
  learningObjective: string;
  grammarRule?: string;
  tags: string[];
  estimatedSeconds?: number;
}

export function buildClozeChoice(def: ClozeChoiceDef, posIndex: number): ClozeChoiceQuestion {
  const letters = ["a", "b", "c", "d"];
  const correctSlot = posIndex % 4;
  const options = new Array(4);

  options[correctSlot] = { id: letters[correctSlot], text: def.correct };
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i !== correctSlot) {
      options[i] = { id: letters[i], text: def.distractors[dIdx++] };
    }
  }

  return {
    id: def.id,
    type: "cloze-choice",
    category: def.category,
    subcategory: def.subcategory,
    difficulty: def.difficulty,
    cefr: def.cefr,
    prompt: def.prompt,
    options,
    correctOptionId: letters[correctSlot],
    explanation: def.explanation,
    learningObjective: def.learningObjective,
    grammarRule: def.grammarRule,
    tags: def.tags,
    estimatedSeconds: def.estimatedSeconds || 25,
    version: 1,
  };
}

export interface ErrorIdDef {
  id: string;
  category: string;
  subcategory: string;
  difficulty: Difficulty;
  cefr: Cefr;
  prompt?: string;
  segments: [string, string, string, string];
  errorIndex: 0 | 1 | 2 | 3; // which segment has the error (0 => s1, 1 => s2, 2 => s3, 3 => s4)
  explanation: string;
  learningObjective: string;
  grammarRule?: string;
  tags: string[];
  estimatedSeconds?: number;
}

export function buildErrorId(def: ErrorIdDef): ErrorIdentificationQuestion {
  const segIds = ["s1", "s2", "s3", "s4"];
  const sentencePreview = def.segments.join(" ");
  return {
    id: def.id,
    type: "error-identification",
    category: def.category,
    subcategory: def.subcategory,
    difficulty: def.difficulty,
    cefr: def.cefr,
    prompt: def.prompt || `Identify the segment containing an error in: "${sentencePreview}"`,
    segments: [
      { id: "s1", text: def.segments[0] },
      { id: "s2", text: def.segments[1] },
      { id: "s3", text: def.segments[2] },
      { id: "s4", text: def.segments[3] },
    ],
    incorrectSegmentId: segIds[def.errorIndex],
    explanation: def.explanation,
    learningObjective: def.learningObjective,
    grammarRule: def.grammarRule,
    tags: def.tags,
    estimatedSeconds: def.estimatedSeconds || 25,
    version: 1,
  };
}

export interface SentenceOrderDef {
  id: string;
  category: string;
  subcategory: string;
  difficulty: Difficulty;
  cefr: Cefr;
  prompt?: string;
  fragments: { id: string; text: string }[];
  correctOrder: string[];
  explanation: string;
  learningObjective: string;
  tags: string[];
  estimatedSeconds?: number;
}

export function buildSentenceOrder(def: SentenceOrderDef): SentenceOrderQuestion {
  const fragmentPreview = def.fragments.map((f) => `"${f.text}"`).join(" / ");
  const prompt = def.prompt
    ? `${def.prompt}: [ ${fragmentPreview} ]`
    : `Arrange the fragments into a grammatically correct sentence: [ ${fragmentPreview} ]`;
  return {
    id: def.id,
    type: "sentence-order",
    category: def.category,
    subcategory: def.subcategory,
    difficulty: def.difficulty,
    cefr: def.cefr,
    prompt,
    fragments: def.fragments,
    correctOrder: def.correctOrder,
    explanation: def.explanation,
    learningObjective: def.learningObjective,
    tags: def.tags,
    estimatedSeconds: def.estimatedSeconds || 30,
    version: 1,
  };
}

export interface ReadingSingleChoiceDef {
  id: string;
  category: string;
  subcategory: string;
  difficulty: Difficulty;
  cefr: Cefr;
  passageId: string;
  passage: string;
  prompt: string;
  correct: string;
  distractors: [string, string, string];
  explanation: string;
  learningObjective: string;
  tags: string[];
  estimatedSeconds?: number;
}

export function buildReadingSingleChoice(def: ReadingSingleChoiceDef, posIndex: number): ReadingSingleChoiceQuestion {
  const letters = ["a", "b", "c", "d"];
  const correctSlot = posIndex % 4;
  const options = new Array(4);

  options[correctSlot] = { id: letters[correctSlot], text: def.correct };
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i !== correctSlot) {
      options[i] = { id: letters[i], text: def.distractors[dIdx++] };
    }
  }

  return {
    id: def.id,
    type: "reading-single-choice",
    category: def.category,
    subcategory: def.subcategory,
    difficulty: def.difficulty,
    cefr: def.cefr,
    passageId: def.passageId,
    passage: def.passage,
    prompt: def.prompt,
    options,
    correctOptionId: letters[correctSlot],
    explanation: def.explanation,
    learningObjective: def.learningObjective,
    tags: def.tags,
    estimatedSeconds: def.estimatedSeconds || 45,
    version: 1,
  };
}
