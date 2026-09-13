import { SessionState } from "../domain/sessions/types.ts";
import { UserStatistics, createEmptyStatistics, ReviewQueueItem } from "../domain/scoring/statistics.ts";

export interface UserPreferences {
  defaultCategories: string[];
  defaultDifficulty: string[];
  defaultQuestionCount: number;
  defaultMode: "practice" | "assessment";
  timed: boolean;
  timeLimitSeconds: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
}

export const defaultPreferences: UserPreferences = {
  defaultCategories: [],
  defaultDifficulty: ["easy", "medium"],
  defaultQuestionCount: 10,
  defaultMode: "practice",
  timed: false,
  timeLimitSeconds: 600,
  shuffleQuestions: true,
  shuffleOptions: true,
  soundEnabled: false,
  reducedMotion: false,
};

interface PersistedEnvelope<T> {
  schemaVersion: number;
  updatedAt: number;
  data: T;
}

const STORAGE_KEYS = {
  PREFERENCES: "lingojoy.preferences.v1",
  ACTIVE_SESSION: "lingojoy.active-session.v1",
  STATISTICS: "lingojoy.statistics.v1",
  REVIEW_QUEUE: "lingojoy.review-queue.v1",
};

class BrowserProgressStore {
  private memoryFallback: Map<string, string> = new Map();
  private isStorageAvailable: boolean;

  constructor() {
    this.isStorageAvailable = this.testLocalStorage();
  }

  private testLocalStorage(): boolean {
    try {
      const testKey = "__lingojoy_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  private getItem(key: string): string | null {
    if (this.isStorageAvailable) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return this.memoryFallback.get(key) || null;
      }
    }
    return this.memoryFallback.get(key) || null;
  }

  private setItem(key: string, value: string): void {
    if (this.isStorageAvailable) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch {
        // storage quota exceeded or blocked
      }
    }
    this.memoryFallback.set(key, value);
  }

  private removeItem(key: string): void {
    if (this.isStorageAvailable) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // ignore
      }
    }
    this.memoryFallback.delete(key);
  }

  // Preferences
  loadPreferences(): UserPreferences {
    try {
      const raw = this.getItem(STORAGE_KEYS.PREFERENCES);
      if (!raw) return { ...defaultPreferences };
      const envelope: PersistedEnvelope<UserPreferences> = JSON.parse(raw);
      if (envelope.schemaVersion === 1 && envelope.data) {
        return { ...defaultPreferences, ...envelope.data };
      }
    } catch (e) {
      console.warn("Failed to load preferences, using defaults", e);
    }
    return { ...defaultPreferences };
  }

  savePreferences(prefs: UserPreferences): void {
    const envelope: PersistedEnvelope<UserPreferences> = {
      schemaVersion: 1,
      updatedAt: Date.now(),
      data: prefs,
    };
    this.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(envelope));
  }

  // Active Session
  loadActiveSession(): SessionState | null {
    try {
      const raw = this.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      if (!raw) return null;
      const envelope: PersistedEnvelope<SessionState> = JSON.parse(raw);
      if (envelope.schemaVersion === 1 && envelope.data && envelope.data.status === "in_progress") {
        return envelope.data;
      }
    } catch (e) {
      console.warn("Corrupted active session discarded", e);
      this.clearActiveSession();
    }
    return null;
  }

  saveActiveSession(session: SessionState): void {
    if (session.status === "completed") {
      this.clearActiveSession();
      return;
    }
    const envelope: PersistedEnvelope<SessionState> = {
      schemaVersion: 1,
      updatedAt: Date.now(),
      data: session,
    };
    this.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(envelope));
  }

  clearActiveSession(): void {
    this.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  }

  // Statistics
  loadStatistics(): UserStatistics {
    try {
      const raw = this.getItem(STORAGE_KEYS.STATISTICS);
      if (!raw) return createEmptyStatistics();
      const envelope: PersistedEnvelope<UserStatistics> = JSON.parse(raw);
      if (envelope.schemaVersion === 1 && envelope.data) {
        return envelope.data;
      }
    } catch (e) {
      console.warn("Failed to load statistics, resetting", e);
    }
    return createEmptyStatistics();
  }

  saveStatistics(stats: UserStatistics): void {
    const envelope: PersistedEnvelope<UserStatistics> = {
      schemaVersion: 1,
      updatedAt: Date.now(),
      data: stats,
    };
    this.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(envelope));
  }

  // Review Queue
  loadReviewQueue(): ReviewQueueItem[] {
    try {
      const raw = this.getItem(STORAGE_KEYS.REVIEW_QUEUE);
      if (!raw) return [];
      const envelope: PersistedEnvelope<ReviewQueueItem[]> = JSON.parse(raw);
      if (envelope.schemaVersion === 1 && Array.isArray(envelope.data)) {
        return envelope.data;
      }
    } catch (e) {
      console.warn("Failed to load review queue", e);
    }
    return [];
  }

  saveReviewQueue(items: ReviewQueueItem[]): void {
    const envelope: PersistedEnvelope<ReviewQueueItem[]> = {
      schemaVersion: 1,
      updatedAt: Date.now(),
      data: items,
    };
    this.setItem(STORAGE_KEYS.REVIEW_QUEUE, JSON.stringify(envelope));
  }

  updateReviewQueue(
    evaluatedQuestionIds: Array<{ questionId: string; isCorrect: boolean; category: string; selectedAnswer?: string }>,
    flaggedQuestionIds: string[]
  ): ReviewQueueItem[] {
    const queue = this.loadReviewQueue();
    const queueMap = new Map<string, ReviewQueueItem>(queue.map((item) => [item.questionId, item]));

    // Update evaluated questions
    for (const item of evaluatedQuestionIds) {
      const existing = queueMap.get(item.questionId);
      if (item.isCorrect) {
        if (existing) {
          existing.consecutiveCorrectCount++;
          existing.lastAttemptedAt = Date.now();
          // Graduated from urgent review if correct twice consecutively
          if (existing.consecutiveCorrectCount >= 2 && !existing.flagged) {
            queueMap.delete(item.questionId);
          }
        }
      } else {
        if (existing) {
          existing.incorrectCount++;
          existing.consecutiveCorrectCount = 0;
          existing.lastAttemptedAt = Date.now();
          existing.lastSelectedAnswer = item.selectedAnswer;
        } else {
          queueMap.set(item.questionId, {
            questionId: item.questionId,
            incorrectCount: 1,
            consecutiveCorrectCount: 0,
            flagged: false,
            lastAttemptedAt: Date.now(),
            lastSelectedAnswer: item.selectedAnswer,
            category: item.category,
          });
        }
      }
    }

    // Update flags
    for (const flagId of flaggedQuestionIds) {
      const existing = queueMap.get(flagId);
      if (existing) {
        existing.flagged = true;
      } else {
        queueMap.set(flagId, {
          questionId: flagId,
          incorrectCount: 0,
          consecutiveCorrectCount: 0,
          flagged: true,
          lastAttemptedAt: Date.now(),
          category: "flagged",
        });
      }
    }

    const updatedQueue = Array.from(queueMap.values());
    this.saveReviewQueue(updatedQueue);
    return updatedQueue;
  }

  isMemoryOnly(): boolean {
    return !this.isStorageAvailable;
  }
}

export const progressStore = new BrowserProgressStore();
