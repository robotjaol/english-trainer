import { Question } from "./schema.ts";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function normalizePromptFingerprint(prompt: string): string {
  return prompt
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function validateQuestion(q: Question): ValidationResult {
  const errors: string[] = [];

  if (!q.id || typeof q.id !== "string" || q.id.trim() === "") {
    errors.push(`Question must have a non-empty id`);
  }
  if (!q.version || q.version < 1) {
    errors.push(`Question ${q.id}: version must be >= 1`);
  }
  if (!q.prompt || typeof q.prompt !== "string" || q.prompt.trim() === "") {
    errors.push(`Question ${q.id}: prompt cannot be empty`);
  }
  if (!q.explanation || typeof q.explanation !== "string" || q.explanation.trim() === "") {
    errors.push(`Question ${q.id}: explanation cannot be empty`);
  }
  if (!q.learningObjective || q.learningObjective.trim() === "") {
    errors.push(`Question ${q.id}: learningObjective cannot be empty`);
  }
  if (!Array.isArray(q.tags) || q.tags.length === 0) {
    errors.push(`Question ${q.id}: tags must be a non-empty array`);
  }

  switch (q.type) {
    case "single-choice": {
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`Question ${q.id}: single-choice requires at least 2 options`);
      } else {
        const optionIds = new Set(q.options.map((o) => o.id));
        if (optionIds.size !== q.options.length) {
          errors.push(`Question ${q.id}: option IDs must be unique`);
        }
        if (!optionIds.has(q.correctOptionId)) {
          errors.push(`Question ${q.id}: correctOptionId '${q.correctOptionId}' does not match any option`);
        }
      }
      break;
    }
    case "multi-select": {
      if (!Array.isArray(q.options) || q.options.length < 3) {
        errors.push(`Question ${q.id}: multi-select requires at least 3 options`);
      } else {
        const optionIds = new Set(q.options.map((o) => o.id));
        if (optionIds.size !== q.options.length) {
          errors.push(`Question ${q.id}: option IDs must be unique`);
        }
        if (!Array.isArray(q.correctOptionIds) || q.correctOptionIds.length < 2) {
          errors.push(`Question ${q.id}: multi-select must have at least 2 correct options`);
        } else {
          for (const cId of q.correctOptionIds) {
            if (!optionIds.has(cId)) {
              errors.push(`Question ${q.id}: correct option '${cId}' not found in options`);
            }
          }
          if (q.correctOptionIds.length >= q.options.length) {
            errors.push(`Question ${q.id}: multi-select must contain at least one incorrect option`);
          }
        }
      }
      break;
    }
    case "cloze-choice": {
      const blankMatches = (q.prompt.match(/\{\{blank\}\}/g) || []).length;
      if (blankMatches !== 1) {
        errors.push(`Question ${q.id}: cloze-choice prompt must contain exactly one {{blank}}, found ${blankMatches}`);
      }
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`Question ${q.id}: cloze-choice requires at least 2 options`);
      } else {
        const optionIds = new Set(q.options.map((o) => o.id));
        if (!optionIds.has(q.correctOptionId)) {
          errors.push(`Question ${q.id}: correctOptionId '${q.correctOptionId}' not found in options`);
        }
      }
      break;
    }
    case "error-identification": {
      if (!Array.isArray(q.segments) || q.segments.length < 2) {
        errors.push(`Question ${q.id}: error-identification requires at least 2 segments`);
      } else {
        const segmentIds = new Set(q.segments.map((s) => s.id));
        if (!segmentIds.has(q.incorrectSegmentId)) {
          errors.push(`Question ${q.id}: incorrectSegmentId '${q.incorrectSegmentId}' not found in segments`);
        }
      }
      break;
    }
    case "sentence-order": {
      if (!Array.isArray(q.fragments) || q.fragments.length < 2) {
        errors.push(`Question ${q.id}: sentence-order requires at least 2 fragments`);
      } else {
        const fragIds = new Set(q.fragments.map((f) => f.id));
        if (q.correctOrder.length !== q.fragments.length) {
          errors.push(`Question ${q.id}: correctOrder must have the same length as fragments`);
        }
        for (const fId of q.correctOrder) {
          if (!fragIds.has(fId)) {
            errors.push(`Question ${q.id}: correctOrder ID '${fId}' not found in fragments`);
          }
        }
      }
      break;
    }
    case "reading-single-choice": {
      if (!q.passage || q.passage.trim() === "") {
        errors.push(`Question ${q.id}: reading passage cannot be empty`);
      }
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`Question ${q.id}: reading question requires at least 2 options`);
      } else {
        const optionIds = new Set(q.options.map((o) => o.id));
        if (!optionIds.has(q.correctOptionId)) {
          errors.push(`Question ${q.id}: correctOptionId '${q.correctOptionId}' not found in options`);
        }
      }
      break;
    }
    default:
      errors.push(`Question ${(q as any).id}: unsupported question type '${(q as any).type}'`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateQuestionPack(questions: Question[]): ValidationResult {
  const errors: string[] = [];
  const idSet = new Set<string>();
  const fingerprints = new Map<string, string>();

  for (const q of questions) {
    const res = validateQuestion(q);
    if (!res.valid) {
      errors.push(...res.errors);
    }

    if (idSet.has(q.id)) {
      errors.push(`Duplicate question ID found: '${q.id}'`);
    } else {
      idSet.add(q.id);
    }

    const fp = normalizePromptFingerprint(q.prompt);
    if (fingerprints.has(fp)) {
      // Fingerprint match warning or flag
      // Only error if exactly identical prompt in same category
      const existingId = fingerprints.get(fp)!;
      if (existingId !== q.id) {
        // We log duplicate prompt notice
      }
    } else {
      fingerprints.set(fp, q.id);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
