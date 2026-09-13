import { Question, Difficulty, Cefr, QuestionType } from "./schema.ts";
import { allQuestions } from "../../data/questions/index.ts";

export interface QuestionFilterCriteria {
  categories?: string[];
  difficulties?: Difficulty[];
  cefr?: Cefr[];
  questionTypes?: QuestionType[];
  tags?: string[];
}

export class QuestionRepository {
  private questions: Question[];
  private idMap: Map<string, Question>;

  constructor(questions: Question[] = allQuestions) {
    this.questions = questions;
    this.idMap = new Map(questions.map((q) => [q.id, q]));
  }

  getAll(): Question[] {
    return [...this.questions];
  }

  getById(id: string): Question | undefined {
    return this.idMap.get(id);
  }

  getByIds(ids: string[]): Question[] {
    const result: Question[] = [];
    for (const id of ids) {
      const q = this.idMap.get(id);
      if (q) result.push(q);
    }
    return result;
  }

  getByCategory(category: string): Question[] {
    return this.questions.filter((q) => q.category === category);
  }

  filter(criteria: QuestionFilterCriteria): Question[] {
    return this.questions.filter((q) => {
      if (criteria.categories && criteria.categories.length > 0) {
        if (!criteria.categories.includes(q.category)) {
          return false;
        }
      }
      if (criteria.difficulties && criteria.difficulties.length > 0) {
        if (!criteria.difficulties.includes(q.difficulty)) {
          return false;
        }
      }
      if (criteria.cefr && criteria.cefr.length > 0) {
        if (!q.cefr || !criteria.cefr.includes(q.cefr)) {
          return false;
        }
      }
      if (criteria.questionTypes && criteria.questionTypes.length > 0) {
        if (!criteria.questionTypes.includes(q.type)) {
          return false;
        }
      }
      if (criteria.tags && criteria.tags.length > 0) {
        const hasTag = criteria.tags.some((t) => q.tags.includes(t));
        if (!hasTag) {
          return false;
        }
      }
      return true;
    });
  }

  getCategoriesWithCounts(): Array<{ category: string; count: number }> {
    const counts = new Map<string, number>();
    for (const q of this.questions) {
      counts.set(q.category, (counts.get(q.category) || 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }

  getDifficultyCounts(): Record<Difficulty, number> {
    const counts: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 };
    for (const q of this.questions) {
      if (counts[q.difficulty] !== undefined) {
        counts[q.difficulty]++;
      }
    }
    return counts;
  }
}

export const questionRepository = new QuestionRepository();
