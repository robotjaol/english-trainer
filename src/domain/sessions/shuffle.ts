/**
 * Seeded PRNG using mulberry32 for deterministic random numbers
 */
export function createRng(seedStr: string): () => number {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateSeed(): string {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * In-place or cloned Fisher-Yates shuffle using an RNG function
 */
export function fisherYatesShuffle<T>(items: readonly T[], rng: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/**
 * Sample n items from an array without replacement using Fisher-Yates partial shuffle
 */
export function sampleWithoutReplacement<T>(items: readonly T[], count: number, rng: () => number): T[] {
  if (count >= items.length) {
    return fisherYatesShuffle(items, rng);
  }
  const copy = [...items];
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const randIdx = i + Math.floor(rng() * (copy.length - i));
    const temp = copy[i];
    copy[i] = copy[randIdx];
    copy[randIdx] = temp;
    result.push(copy[i]);
  }
  return result;
}
