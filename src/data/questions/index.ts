import { Question } from "../../domain/questions/schema.ts";
import { validateQuestionPack } from "../../domain/questions/validation.ts";
import { auditedQuestions } from "./audited/index.ts";
import { grammarQuestions } from "./grammar.ts";
import { vocabularyQuestions } from "./vocabulary.ts";
import { businessAndWorkplaceQuestions } from "./businessAndWorkplace.ts";
import { readingAndClozeQuestions } from "./readingAndCloze.ts";
import { errorAndOrderQuestions } from "./errorAndOrder.ts";
import { additionalQuestions } from "./additionalQuestions.ts";
import {
  SectionCounts,
  generateGrammarSection,
  generateVocabularySection,
  generateBusinessSection,
  generateWorkplaceSection,
  generateReadingSection,
  generateErrorSection,
  generateOrderSection,
  generateClozeSection,
  generateRecruitmentSection,
} from "../generators/bankGenerator.ts";

export { auditedQuestions };

export const baseQuestions: Question[] = [
  ...auditedQuestions,
  ...grammarQuestions,
  ...vocabularyQuestions,
  ...businessAndWorkplaceQuestions,
  ...readingAndClozeQuestions,
  ...errorAndOrderQuestions,
  ...additionalQuestions,
];

// Count handcrafted base questions per category and difficulty
const baseSectionCounts: Record<string, SectionCounts> = {};
for (const q of baseQuestions) {
  if (!baseSectionCounts[q.category]) {
    baseSectionCounts[q.category] = { easy: 0, medium: 0, hard: 0 };
  }
  if (q.difficulty === "easy" || q.difficulty === "medium" || q.difficulty === "hard") {
    baseSectionCounts[q.category][q.difficulty]++;
  }
}

const getCounts = (cat: string): SectionCounts =>
  baseSectionCounts[cat] || { easy: 0, medium: 0, hard: 0 };

const TARGET_PER_DIFFICULTY = 1000; // 1,000 Easy, 1,000 Medium, 1,000 Hard per section = 3,000 total per section

export const allQuestions: Question[] = [
  ...baseQuestions,
  ...generateGrammarSection(getCounts("grammar"), TARGET_PER_DIFFICULTY),
  ...generateVocabularySection(getCounts("vocabulary"), TARGET_PER_DIFFICULTY),
  ...generateBusinessSection(getCounts("business-english"), TARGET_PER_DIFFICULTY),
  ...generateWorkplaceSection(getCounts("workplace-english"), TARGET_PER_DIFFICULTY),
  ...generateReadingSection(getCounts("reading-comprehension"), TARGET_PER_DIFFICULTY),
  ...generateErrorSection(getCounts("error-identification"), TARGET_PER_DIFFICULTY),
  ...generateOrderSection(getCounts("sentence-arrangement"), TARGET_PER_DIFFICULTY),
  ...generateClozeSection(getCounts("cloze-test"), TARGET_PER_DIFFICULTY),
  ...generateRecruitmentSection(getCounts("recruitment-assessment"), TARGET_PER_DIFFICULTY),
];

// Perform startup cross-pack validation on handcrafted sample to keep boot fast
const validation = validateQuestionPack(baseQuestions);
if (!validation.valid) {
  console.warn("LingoJoy question pack validation detected issues:", validation.errors);
}
