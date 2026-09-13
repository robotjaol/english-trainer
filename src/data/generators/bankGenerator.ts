import {
  Question,
  SingleChoiceQuestion,
  MultiSelectQuestion,
  ClozeChoiceQuestion,
  ErrorIdentificationQuestion,
  SentenceOrderQuestion,
  ReadingSingleChoiceQuestion,
  Difficulty,
  Cefr,
} from "../../domain/questions/schema.ts";

/**
 * Procedural Question Bank Generator for LingoJoy
 *
 * Generates:
 * - 1,000 Easy questions
 * - 1,000 Medium questions
 * - 1,000 Hard questions
 * For EACH of the 9 English sections (Total: 3,000 per section, 27,000 in entire bank).
 */

const pad4 = (n: number) => n.toString().padStart(4, "0");

// Helper to shuffle distractors deterministically or rotate options
function makeOptions(correctText: string, w1: string, w2: string, w3: string, index: number) {
  const choices = [
    { text: correctText, isCorrect: true },
    { text: w1, isCorrect: false },
    { text: w2, isCorrect: false },
    { text: w3, isCorrect: false },
  ];
  // Deterministic cyclic permutation based on index
  const shift = index % 4;
  const permuted = [...choices.slice(shift), ...choices.slice(0, shift)];
  const options = permuted.map((c, i) => ({
    id: `opt${i + 1}`,
    text: c.text,
  }));
  const correctOption = options.find((o, i) => permuted[i].isCorrect);
  return {
    options,
    correctOptionId: correctOption ? correctOption.id : "opt1",
  };
}

export interface SectionCounts {
  easy: number;
  medium: number;
  hard: number;
}

// ============================================================================
// 1. GRAMMAR GENERATOR (1,000 Easy, 1,000 Medium, 1,000 Hard = 3,000 total)
// ============================================================================
export function generateGrammarSection(existing: SectionCounts, targetPerDiff: number = 1000): Question[] {
  const questions: Question[] = [];

  // --- EASY (1,000 questions) ---
  const easyNeeded = Math.max(0, targetPerDiff - existing.easy);
  const easySubjects = [
    { s: "My brother", vSing: "plays", vPlur: "play", vProg: "is playing", vPast: "played", obj: "the guitar every evening", prep: "in his bedroom" },
    { s: "The teacher", vSing: "explains", vPlur: "explain", vProg: "is explaining", vPast: "explained", obj: "the lesson clearly", prep: "to the students" },
    { s: "Our neighbor", vSing: "washes", vPlur: "wash", vProg: "is washing", vPast: "washed", obj: "his car on Saturdays", prep: "in the driveway" },
    { s: "The doctor", vSing: "examines", vPlur: "examine", vProg: "is examining", vPast: "examined", obj: "new patients carefully", prep: "at the local clinic" },
    { s: "The librarian", vSing: "organizes", vPlur: "organize", vProg: "is organizing", vPast: "organized", obj: "the reference books", prep: "on the shelves" },
    { s: "My mother", vSing: "bakes", vPlur: "bake", vProg: "is baking", vPast: "baked", obj: "fresh bread weekly", prep: "in the kitchen" },
    { s: "The security guard", vSing: "checks", vPlur: "check", vProg: "is checking", vPast: "checked", obj: "all visitor badges", prep: "at the entrance gate" },
    { s: "The software engineer", vSing: "writes", vPlur: "write", vProg: "is writing", vPast: "wrote", obj: "clean code daily", prep: "for the project" },
    { s: "The pilot", vSing: "flies", vPlur: "fly", vProg: "is flying", vPast: "flew", obj: "commercial aircraft safely", prep: "across Europe" },
    { s: "The chef", vSing: "prepares", vPlur: "prepare", vProg: "is preparing", vPast: "prepared", obj: "delicious pasta dishes", prep: "for the dinner guests" },
  ];

  const easyPrepositions = [
    { text: "The international flight will arrive {{blank}} Monday morning.", ans: "on", w1: "in", w2: "at", w3: "to", rule: "Use 'on' with days of the week and dates." },
    { text: "We always hold our quarterly planning seminar {{blank}} October.", ans: "in", w1: "on", w2: "at", w3: "for", rule: "Use 'in' with months, seasons, and years." },
    { text: "The team meeting starts promptly {{blank}} 9:00 AM.", ans: "at", w1: "on", w2: "in", w3: "to", rule: "Use 'at' with specific clock times." },
    { text: "She left her keys {{blank}} the kitchen table.", ans: "on", w1: "in", w2: "at", w3: "into", rule: "Use 'on' for contact with a surface." },
    { text: "All employees must register {{blank}} the main reception desk.", ans: "at", w1: "in", w2: "on", w3: "by", rule: "Use 'at' for a specific location or point." },
  ];

  const easyComparatives = [
    { adj: "fast", comp: "faster", sup: "fastest", context: "The express train is much {{blank}} than the local bus." },
    { adj: "large", comp: "larger", sup: "largest", context: "This conference room is noticeably {{blank}} than our previous one." },
    { adj: "quiet", comp: "quieter", sup: "quietest", context: "The library is {{blank}} than the crowded university cafeteria." },
    { adj: "cheap", comp: "cheaper", sup: "cheapest", context: "Cooking meals at home is usually {{blank}} than dining out." },
    { adj: "bright", comp: "brighter", sup: "brightest", context: "The morning sun was {{blank}} than the office artificial lighting." },
  ];

  for (let i = 1; i <= easyNeeded; i++) {
    const qId = `gen.gram.easy.${pad4(existing.easy + i)}`;
    const mod = (i - 1) % 3;

    if (mod === 0) {
      const item = easySubjects[(i - 1) % easySubjects.length];
      const prompt = `Choose the correct verb form to complete the sentence:\n"${item.s} ____________ ${item.obj}."`;
      const opts = makeOptions(item.vSing, item.vPlur, item.vProg, "to " + item.vPlur, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "grammar",
        difficulty: "easy",
        cefr: "A2",
        prompt,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `With a singular third-person subject ('${item.s}'), the present simple verb takes '-s' or '-es' ('${item.vSing}').`,
        grammarRule: "Third-person singular subjects (he, she, it, singular nouns) require verbs ending in -s or -es in the simple present tense.",
        learningObjective: "Master subject-verb agreement in present simple sentences.",
        tags: ["grammar", "agreement", "present-simple", "easy"],
        estimatedSeconds: 20,
        version: 1,
      });
    } else if (mod === 1) {
      const item = easyPrepositions[(i - 1) % easyPrepositions.length];
      const prompt = item.text.replace("{{blank}}", "____________");
      const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "grammar",
        difficulty: "easy",
        cefr: "A2",
        prompt: `Select the correct preposition:\n"${prompt}"`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: item.rule,
        grammarRule: item.rule,
        learningObjective: "Use foundational English prepositions of time and place correctly.",
        tags: ["grammar", "prepositions", "easy"],
        estimatedSeconds: 20,
        version: 1,
      });
    } else {
      const item = easyComparatives[(i - 1) % easyComparatives.length];
      const prompt = item.context.replace("{{blank}}", "____________");
      const opts = makeOptions(item.comp, "more " + item.adj, item.sup, "more " + item.comp, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "grammar",
        difficulty: "easy",
        cefr: "B1",
        prompt: `Select the correct comparative adjective form:\n"${prompt}"`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `One-syllable adjectives form their comparative by adding '-er' ('${item.comp}'), not by using 'more'.`,
        grammarRule: "Short one-syllable adjectives add -er in comparative constructions with 'than'.",
        learningObjective: "Form regular comparative adjectives accurately without double marking.",
        tags: ["grammar", "adjectives", "comparatives", "easy"],
        estimatedSeconds: 20,
        version: 1,
      });
    }
  }

  // --- MEDIUM (1,000 questions) ---
  const medNeeded = Math.max(0, targetPerDiff - existing.medium);
  const medPatterns = [
    {
      action: "has worked",
      wrong1: "is working",
      wrong2: "worked",
      wrong3: "had worked",
      subj: ["Elena", "David", "Dr. Vance", "Professor Evans", "The chief architect"],
      timeClause: ["since 2018.", "for more than seven years.", "since she graduated from university.", "for over a decade."],
      rule: "The present perfect is used with 'since' and 'for' to describe actions that started in the past and continue into the present."
    },
    {
      prompt: "If the design team ____________ the client feedback tomorrow, they will update the prototype immediately.",
      ans: "receives",
      w1: "will receive",
      w2: "received",
      w3: "would receive",
      rule: "In first conditional sentences, the if-clause uses the simple present tense to refer to future possibilities, while the main clause uses 'will + base verb'."
    },
    {
      prompt: "The annual financial report ____________ by an independent auditing agency last week.",
      ans: "was reviewed",
      w1: "is reviewed",
      w2: "reviewed",
      w3: "has reviewed",
      rule: "Passive voice in the past simple uses 'was/were + past participle' to focus on the recipient of the action when the time is specified ('last week')."
    },
    {
      prompt: "The senior engineer ____________ advice was vital to the launch received an innovation award.",
      ans: "whose",
      w1: "who",
      w2: "which",
      w3: "whom",
      rule: "The possessive relative pronoun 'whose' indicates ownership or association with a person, modifying the following noun ('advice')."
    },
    {
      prompt: "She decided ____________ the project management certification course before applying for promotion.",
      ans: "to take",
      w1: "taking",
      w2: "take",
      w3: "taken",
      rule: "The verb 'decide' is followed by a to-infinitive complement ('decided to take'), not a gerund."
    }
  ];

  for (let i = 1; i <= medNeeded; i++) {
    const qId = `gen.gram.med.${pad4(existing.medium + i)}`;
    const patIdx = (i - 1) % medPatterns.length;
    const pat = medPatterns[patIdx];

    if (patIdx === 0) {
      const s = pat.subj![(i - 1) % pat.subj!.length];
      const t = pat.timeClause![(i - 1) % pat.timeClause!.length];
      const prompt = `${s} ____________ at this software company ${t}`;
      const opts = makeOptions(pat.action!, pat.wrong1!, pat.wrong2!, pat.wrong3!, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "grammar",
        difficulty: "medium",
        cefr: "B2",
        prompt: `Select the correct verb tense:\n"${prompt}"`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: pat.rule,
        grammarRule: pat.rule,
        learningObjective: "Distinguish present perfect duration from simple past completed events.",
        tags: ["grammar", "tenses", "present-perfect", "medium"],
        estimatedSeconds: 25,
        version: 1,
      });
    } else {
      const opts = makeOptions(pat.ans!, pat.w1!, pat.w2!, pat.w3!, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "grammar",
        difficulty: "medium",
        cefr: "B2",
        prompt: `Select the option that correctly completes the sentence:\n"${pat.prompt}"`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: pat.rule,
        grammarRule: pat.rule,
        learningObjective: "Apply intermediate grammatical structures in formal written English.",
        tags: ["grammar", "syntax", "medium"],
        estimatedSeconds: 25,
        version: 1,
      });
    }
  }

  // --- HARD (1,000 questions) ---
  const hardNeeded = Math.max(0, targetPerDiff - existing.hard);
  const hardInversions = [
    { adv: "Seldom", verb: "did the board expect", w1: "the board expected", w2: "was the board expecting", w3: "did the board expected", ctx: "such dramatic quarterly revenue expansion." },
    { adv: "Rarely", verb: "have scientists observed", w1: "scientists have observed", w2: "scientists observed", w3: "have scientists observe", ctx: "such rapid ecological restoration in degraded habitats." },
    { adv: "Scarcely", verb: "had the plane landed", w1: "the plane had landed", w2: "has the plane landed", w3: "did the plane land", ctx: "when the thunderstorm shut down the airfield." },
    { adv: "Under no circumstances", verb: "should employees share", w1: "employees should share", w2: "employees share", w3: "shall employees shared", ctx: "master encryption keys outside the secure network." },
    { adv: "Not only", verb: "did the committee approve", w1: "the committee approved", w2: "was the committee approving", w3: "did the committee approved", ctx: "the proposal, but they also doubled its research grant." },
  ];

  const hardSubjunctives = [
    { auth: "The compliance director", v: "insisted", act: "be audited", w1: "is audited", w2: "was audited", w3: "to be audited", ctx: "that all international accounts {{blank}} quarterly." },
    { auth: "The lead auditor", v: "recommended", act: "remain", w1: "remains", w2: "remained", w3: "to remain", ctx: "that server access credentials {{blank}} confidential." },
    { auth: "The presiding judge", v: "mandated", act: "provide", w1: "provides", w2: "provided", w3: "is providing", ctx: "that the defense counsel {{blank}} the verified documents." },
    { auth: "The safety committee", v: "requested", act: "be suspended", w1: "is suspended", w2: "was suspended", w3: "to be suspended", ctx: "that production line operations {{blank}} pending inspection." },
  ];

  for (let i = 1; i <= hardNeeded; i++) {
    const qId = `gen.gram.hard.${pad4(existing.hard + i)}`;
    const mod = (i - 1) % 2;

    if (mod === 0) {
      const item = hardInversions[(i - 1) % hardInversions.length];
      const prompt = `${item.adv} ____________ ${item.ctx}`;
      const opts = makeOptions(item.verb, item.w1, item.w2, item.w3, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "grammar",
        difficulty: "hard",
        cefr: "C1",
        prompt: `Select the grammatically correct inverted phrase:\n"${prompt}"`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `When a clause opens with a negative or restrictive adverbial like '${item.adv}', subject-auxiliary inversion is mandatory ('${item.verb}').`,
        grammarRule: "Negative and restrictive adverbials in clause-initial position trigger subject-auxiliary inversion.",
        learningObjective: "Master stylistic negative inversion in advanced formal English.",
        tags: ["grammar", "inversion", "syntax", "hard", "c1"],
        estimatedSeconds: 35,
        version: 1,
      });
    } else {
      const item = hardSubjunctives[(i - 1) % hardSubjunctives.length];
      const prompt = `${item.auth} ${item.v} ${item.ctx.replace("{{blank}}", "____________")}`;
      const opts = makeOptions(item.act, item.w1, item.w2, item.w3, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "grammar",
        difficulty: "hard",
        cefr: "C1",
        prompt: `Select the correct mandative subjunctive form:\n"${prompt}"`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `Verbs of urgency or mandate ('${item.v}') require the uninflected subjunctive base verb ('${item.act}') in the dependent 'that' clause.`,
        grammarRule: "The mandative subjunctive requires the base form of the verb regardless of the subject's person or number.",
        learningObjective: "Apply the mandative subjunctive correctly in formal administrative prose.",
        tags: ["grammar", "subjunctive", "verbs", "hard", "c1"],
        estimatedSeconds: 35,
        version: 1,
      });
    }
  }

  return questions;
}

// ============================================================================
// 2. VOCABULARY GENERATOR (1,000 Easy, 1,000 Medium, 1,000 Hard = 3,000 total)
// ============================================================================
export function generateVocabularySection(existing: SectionCounts, targetPerDiff: number = 1000): Question[] {
  const questions: Question[] = [];

  // EASY (1,000)
  const easyNeeded = Math.max(0, targetPerDiff - existing.easy);
  const easyWords = [
    { w: "reliable", syn: "dependable", dist1: "careless", dist2: "fragile", dist3: "tardy", def: "consistently good in quality or performance", ctx: "He is a reliable worker who always completes tasks before the deadline." },
    { w: "assist", syn: "help", dist1: "hinder", dist2: "ignore", dist3: "delay", def: "give help or support to someone", ctx: "A customer service representative is ready to assist you with your booking." },
    { w: "prevent", syn: "stop", dist1: "encourage", dist2: "create", dist3: "prolong", def: "keep something undesirable from happening", ctx: "Regular hand hygiene helps prevent the spread of seasonal infections." },
    { w: "essential", syn: "necessary", dist1: "optional", dist2: "harmful", dist3: "trivial", def: "absolutely necessary or extremely important", ctx: "Adequate hydration is essential for maintaining physical endurance." },
    { w: "frequent", syn: "regular", dist1: "rare", dist2: "silent", dist3: "abrupt", def: "occurring or done on many occasions with short intervals", ctx: "The regional bus provides frequent departures between the airport and downtown." },
    { w: "durable", syn: "long-lasting", dist1: "fragile", dist2: "temporary", dist3: "soft", def: "able to withstand wear, pressure, or damage", ctx: "These hiking boots are made from durable leather designed for rough terrain." },
    { w: "ancient", syn: "very old", dist1: "modern", dist2: "fashionable", dist3: "recent", def: "belonging to the very distant past and no longer in existence", ctx: "Archaeologists uncovered ancient stone tools dating back several thousand years." },
    { w: "generous", syn: "giving", dist1: "selfish", dist2: "harsh", dist3: "hostile", def: "showing a readiness to give more of something than is strictly necessary", ctx: "The university received a generous endowment to construct a state-of-the-art laboratory." },
    { w: "accurate", syn: "correct", dist1: "flawed", dist2: "untrue", dist3: "vague", def: "correct in all details; exact", ctx: "The financial accountant provided an accurate summary of quarterly revenues." },
    { w: "expand", syn: "grow", dist1: "shrink", dist2: "halt", dist3: "weaken", def: "become or make larger or more extensive", ctx: "The retail company plans to expand its presence across neighboring countries." },
  ];

  for (let i = 1; i <= easyNeeded; i++) {
    const qId = `gen.vocab.easy.${pad4(existing.easy + i)}`;
    const item = easyWords[(i - 1) % easyWords.length];
    const isContext = i % 2 === 0;

    if (isContext) {
      const sentence = item.ctx.replace(new RegExp(`\\b${item.w}\\b`, "i"), "____________");
      const opts = makeOptions(item.w, item.dist1, item.dist2, item.dist3, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "vocabulary",
        difficulty: "easy",
        cefr: "B1",
        prompt: `Select the word that best completes the sentence:\n"${sentence}"`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `'${item.w}' means ${item.def}, making it the correct semantic choice.`,
        learningObjective: "Identify foundational vocabulary words in contextual sentences.",
        tags: ["vocabulary", "context", "easy", "b1"],
        estimatedSeconds: 20,
        version: 1,
      });
    } else {
      const opts = makeOptions(item.syn, item.dist1, item.dist2, item.dist3, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "vocabulary",
        difficulty: "easy",
        cefr: "A2",
        prompt: `What is the closest synonym to "${item.w}"?`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `'${item.w}' is synonymous with '${item.syn}' (${item.def}).`,
        learningObjective: "Pair core English words with their everyday synonyms.",
        tags: ["vocabulary", "synonyms", "easy", "a2"],
        estimatedSeconds: 15,
        version: 1,
      });
    }
  }

  // MEDIUM (1,000)
  const medNeeded = Math.max(0, targetPerDiff - existing.medium);
  const medWords = [
    { w: "pragmatic", syn: "practical", dist1: "dogmatic", dist2: "whimsical", dist3: "tentative", def: "dealing with things sensibly and realistically based on practical considerations", ctx: "The team took a pragmatic approach to restructuring operational timelines." },
    { w: "resilient", syn: "adaptable", dist1: "fragile", dist2: "rigid", dist3: "vulnerable", def: "able to recover quickly from difficult conditions", ctx: "The regional supply network proved resilient despite severe geopolitical disruptions." },
    { w: "concise", syn: "succinct", dist1: "verbose", dist2: "circuitous", dist3: "redundant", def: "giving a lot of information clearly and in a few words", ctx: "The executive praised the concise briefing for highlighting key risks in one page." },
    { w: "lucrative", syn: "profitable", dist1: "bankrupt", dist2: "unrewarding", dist3: "austere", def: "producing a great deal of profit", ctx: "The startup secured a lucrative partnership with a global distribution firm." },
    { w: "frugal", syn: "economical", dist1: "lavish", dist2: "wasteful", dist3: "extravagant", def: "sparing or economical with regard to money or resources", ctx: "His frugal budgeting during his early career allowed him to invest capital prudently." },
    { w: "candid", syn: "frank", dist1: "deceptive", dist2: "evasive", dist3: "disingenuous", def: "truthful and straightforward; frank", ctx: "The director gave a candid appraisal of the technical hurdles facing the project." },
    { w: "versatile", syn: "adaptable", dist1: "monolithic", dist2: "inflexible", dist3: "narrow", def: "able to adapt to many different functions or activities", ctx: "JavaScript remains popular because it is remarkably versatile across web stacks." },
    { w: "lucid", syn: "coherent", dist1: "obscure", dist2: "convoluted", dist3: "murky", def: "expressed clearly; easy to understand", ctx: "Her lucid presentation demystified complex regulatory compliance statutes." },
    { w: "plausible", syn: "credible", dist1: "implausible", dist2: "far-fetched", dist3: "absurd", def: "seeming reasonable or probable", ctx: "The lead researcher presented a plausible explanation for the unexpected data anomalies." },
    { w: "meticulous", syn: "painstaking", dist1: "cursory", dist2: "careless", dist3: "negligent", def: "showing great attention to detail; very careful and precise", ctx: "Her meticulous editing removed all typographic and grammatical inconsistencies." },
  ];

  for (let i = 1; i <= medNeeded; i++) {
    const qId = `gen.vocab.med.${pad4(existing.medium + i)}`;
    const item = medWords[(i - 1) % medWords.length];
    const isContext = i % 2 === 0;

    if (isContext) {
      const sentence = item.ctx.replace(new RegExp(`\\b${item.w}\\b`, "i"), "____________");
      const opts = makeOptions(item.w, item.dist1, item.dist2, item.dist3, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "vocabulary",
        difficulty: "medium",
        cefr: "B2",
        prompt: `Select the word that best fits the blank:\n"${sentence}"`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `'${item.w}' means ${item.def}, fitting the semantic context precisely.`,
        learningObjective: "Select appropriate academic and professional vocabulary in context.",
        tags: ["vocabulary", "context", "medium", "b2"],
        estimatedSeconds: 25,
        version: 1,
      });
    } else {
      const opts = makeOptions(item.syn, item.dist1, item.dist2, item.dist3, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "vocabulary",
        difficulty: "medium",
        cefr: "B2",
        prompt: `Which word is closest in meaning to "${item.w}"?`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `'${item.w}' means ${item.def}, which corresponds directly to '${item.syn}'.`,
        learningObjective: "Master collegiate-level synonym pairings.",
        tags: ["vocabulary", "synonyms", "medium", "b2"],
        estimatedSeconds: 20,
        version: 1,
      });
    }
  }

  // HARD (1,000)
  const hardNeeded = Math.max(0, targetPerDiff - existing.hard);
  const hardWords = [
    { w: "ubiquitous", syn: "omnipresent", dist1: "scarce", dist2: "transient", dist3: "isolated", def: "present, appearing, or found everywhere simultaneously", ctx: "Connected digital devices have become so ubiquitous that life offline feels anomalous." },
    { w: "ephemeral", syn: "fleeting", dist1: "perpetual", dist2: "immutable", dist3: "enduring", def: "lasting for a very short time; transitory", ctx: "Fame on algorithmic feeds is ephemeral, evaporating as rapidly as it emerges." },
    { w: "tenacious", syn: "persistent", dist1: "wavering", dist2: "vacillating", dist3: "indifferent", def: "tending to keep a firm hold; persistent and unyielding", ctx: "Through tenacious negotiation, the diplomat brokered an enduring bilateral ceasefire." },
    { w: "pernicious", syn: "harmful", dist1: "salutary", dist2: "innocuous", dist3: "beneficial", def: "having a harmful effect, especially in a gradual or subtle way", ctx: "Misinformation exerts a pernicious influence on public health consensus." },
    { w: "esoteric", syn: "obscure", dist1: "mainstream", dist2: "pellucid", dist3: "accessible", def: "intended for or likely to be understood by only a small number of people with specialized knowledge", ctx: "The monograph was filled with esoteric mathematical formulations incomprehensible to lay readers." },
    { w: "fastidious", syn: "exacting", dist1: "slovenly", dist2: "hasty", dist3: "cursory", def: "very attentive to and concerned about accuracy and detail", ctx: "The curator was fastidious about preserving fragile manuscript archives." },
    { w: "juxtapose", syn: "contrast", dist1: "conflate", dist2: "disperse", dist3: "nullify", def: "place or deal with close together for contrasting effect", ctx: "The exhibition juxtaposes contemporary street art with neoclassical oil paintings." },
    { w: "magnanimous", syn: "generous", dist1: "vindictive", dist2: "petty", dist3: "mercenary", def: "generous or forgiving, especially toward a rival or less powerful person", ctx: "In victory, the newly elected president offered a magnanimous tribute to her opponents." },
    { w: "recalcitrant", syn: "uncooperative", dist1: "amenable", dist2: "pliant", dist3: "submissive", def: "having an obstinately uncooperative attitude toward authority or discipline", ctx: "The company struggled to manage recalcitrant branch managers resisting modern compliance protocols." },
    { w: "surreptitious", syn: "clandestine", dist1: "overt", dist2: "transparent", dist3: "manifest", def: "kept secret, especially because it would not be approved of", ctx: "The intelligence agency uncovered surreptitious transfers of sanctioned hardware." },
  ];

  for (let i = 1; i <= hardNeeded; i++) {
    const qId = `gen.vocab.hard.${pad4(existing.hard + i)}`;
    const item = hardWords[(i - 1) % hardWords.length];
    const isContext = i % 2 === 0;

    if (isContext) {
      const sentence = item.ctx.replace(new RegExp(`\\b${item.w}\\b`, "i"), "____________");
      const opts = makeOptions(item.w, item.dist1, item.dist2, item.dist3, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "vocabulary",
        difficulty: "hard",
        cefr: "C1",
        prompt: `Select the advanced vocabulary term that best completes the sentence:\n"${sentence}"`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `'${item.w}' means ${item.def}, capturing the nuance of this formal statement.`,
        learningObjective: "Demonstrate command of high-register, nuanced vocabulary in complex prose.",
        tags: ["vocabulary", "context", "hard", "c1"],
        estimatedSeconds: 30,
        version: 1,
      });
    } else {
      const opts = makeOptions(item.syn, item.dist1, item.dist2, item.dist3, i);
      questions.push({
        id: qId,
        type: "single-choice",
        category: "vocabulary",
        difficulty: "hard",
        cefr: "C1",
        prompt: `Which word is the closest SYNONYM to "${item.w}"?`,
        options: opts.options,
        correctOptionId: opts.correctOptionId,
        explanation: `'${item.w}' means ${item.def}, which corresponds precisely to '${item.syn}'.`,
        learningObjective: "Expand advanced academic vocabulary through rigorous synonym analysis.",
        tags: ["vocabulary", "synonyms", "hard", "c1"],
        estimatedSeconds: 25,
        version: 1,
      });
    }
  }

  return questions;
}

// ============================================================================
// 3. BUSINESS ENGLISH GENERATOR (1,000 Easy, 1,000 Medium, 1,000 Hard = 3,000 total)
// ============================================================================
export function generateBusinessSection(existing: SectionCounts, targetPerDiff: number = 1000): Question[] {
  const questions: Question[] = [];

  // EASY (1,000)
  const easyNeeded = Math.max(0, targetPerDiff - existing.easy);
  const easyTerms = [
    { t: "budget", ans: "budget", w1: "salary", w2: "currency", w3: "refund", ctx: "The marketing department must stay within its allocated annual ____________.", expl: "A budget is an estimation of revenue and expenses over a specified future period." },
    { t: "invoice", ans: "invoice", w1: "receipt", w2: "warranty", w3: "proposal", ctx: "Please send the vendor an itemized ____________ before processing the payment.", expl: "An invoice is a commercial document issued by a seller to a buyer relating to a sale transaction." },
    { t: "deadline", ans: "deadline", w1: "milestone", w2: "break", w3: "meeting", ctx: "All project team members must submit their final reports before Friday's ____________.", expl: "A deadline is the latest time or date by which something should be completed." },
    { t: "colleague", ans: "colleagues", w1: "competitors", w2: "passengers", w3: "tourists", ctx: "She enjoys collaborating with supportive ____________ across diverse departments.", expl: "Colleagues are people with whom one works in a profession or business." },
    { t: "agenda", ans: "agenda", w1: "itinerary", w2: "menu", w3: "catalog", ctx: "The committee chairman distributed the meeting ____________ two days in advance.", expl: "An agenda is a list of items to be discussed at a formal business meeting." },
  ];

  for (let i = 1; i <= easyNeeded; i++) {
    const qId = `gen.biz.easy.${pad4(existing.easy + i)}`;
    const item = easyTerms[(i - 1) % easyTerms.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "single-choice",
      category: "business-english",
      difficulty: "easy",
      cefr: "B1",
      prompt: `Choose the correct business term to complete the sentence:\n"${item.ctx}"`,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Use everyday business and commercial terms appropriately.",
      tags: ["business", "office", "easy", "b1"],
      estimatedSeconds: 20,
      version: 1,
    });
  }

  // MEDIUM (1,000)
  const medNeeded = Math.max(0, targetPerDiff - existing.medium);
  const medTerms = [
    { t: "synergy", ans: "synergies", w1: "liabilities", w2: "bottlenecks", w3: "stagnations", ctx: "The merger created substantial operational ____________ between both subsidiaries.", expl: "Synergy occurs when combined business units produce a result greater than the sum of their individual effects." },
    { t: "liquidity", ans: "liquidity", w1: "insolvency", w2: "inflation", w3: "depreciation", ctx: "Commercial banks must maintain sufficient ____________ to honor client withdrawals.", expl: "Liquidity measures how quickly assets can be converted into ready cash without loss of value." },
    { t: "procurement", ans: "procurement", w1: "litigation", w2: "receivership", w3: "arbitration", ctx: "All supplier contracts are negotiated through the centralized corporate ____________ department.", expl: "Procurement is the process of acquiring goods and services from external vendors." },
    { t: "overhead", ans: "overhead", w1: "revenue", w2: "equity", w3: "dividend", ctx: "Shifting to remote operations reduced fixed ____________ costs like office leases.", expl: "Overhead expenses are recurring operational costs not directly tied to manufacturing a product." },
    { t: "turnover", ans: "turnover", w1: "deficit", w2: "default", w3: "escrow", ctx: "Retail chains strive to accelerate inventory ____________ to prevent merchandise obsolescence.", expl: "Inventory turnover measures how many times inventory is sold and replaced over a set period." },
  ];

  for (let i = 1; i <= medNeeded; i++) {
    const qId = `gen.biz.med.${pad4(existing.medium + i)}`;
    const item = medTerms[(i - 1) % medTerms.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "single-choice",
      category: "business-english",
      difficulty: "medium",
      cefr: "B2",
      prompt: `Select the accurate corporate business term:\n"${item.ctx}"`,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Apply corporate financial, strategic, and management concepts accurately.",
      tags: ["business", "finance", "strategy", "medium", "b2"],
      estimatedSeconds: 25,
      version: 1,
    });
  }

  // HARD (1,000)
  const hardNeeded = Math.max(0, targetPerDiff - existing.hard);
  const hardTerms = [
    { t: "covenant", ans: "covenant", w1: "arbitrage", w2: "dividend", w3: "subsidy", ctx: "The syndicated loan agreement includes a restrictive debt-service ____________ clause.", expl: "A debt covenant is a binding condition in a commercial lending contract requiring the borrower to maintain specified financial ratios." },
    { t: "arbitration", ans: "arbitration", w1: "filibuster", w2: "foreclosure", w3: "insolvency", ctx: "The cross-border licensing agreement mandates binding ____________ rather than court litigation.", expl: "Arbitration is a formal, private dispute resolution mechanism where an independent arbitrator renders a legally enforceable ruling." },
    { t: "amortize", ans: "amortize", w1: "liquidate", w2: "foreclose", w3: "speculate", ctx: "The finance committee decided to ____________ the acquired intangible assets over ten fiscal years.", expl: "Amortization is the systematic reduction of the carrying value of an intangible asset over its useful life." },
    { t: "fiduciary", ans: "fiduciary", w1: "mercenary", w2: "statutory", w3: "pecuniary", ctx: "Corporate board members bear a strict ____________ duty to act in the best interests of shareholders.", expl: "A fiduciary duty is a legal and ethical obligation of highest trust and loyalty owed by a trustee or director to beneficiaries." },
    { t: "indemnity", ans: "indemnity", w1: "bankruptcy", w2: "collateral", w3: "subrogation", ctx: "The supplier agreed to provide a comprehensive ____________ clause against third-party patent infringement.", expl: "An indemnity provision is a contractual promise to compensate or hold harmless another party against incurred loss or legal damages." },
  ];

  for (let i = 1; i <= hardNeeded; i++) {
    const qId = `gen.biz.hard.${pad4(existing.hard + i)}`;
    const item = hardTerms[(i - 1) % hardTerms.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "single-choice",
      category: "business-english",
      difficulty: "hard",
      cefr: "C1",
      prompt: `Select the executive business or legal term that correctly completes the statement:\n"${item.ctx}"`,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Master sophisticated contractual, fiduciary, and capital market terminology.",
      tags: ["business", "legal", "executive", "hard", "c1"],
      estimatedSeconds: 30,
      version: 1,
    });
  }

  return questions;
}

// ============================================================================
// 4. WORKPLACE ENGLISH GENERATOR (1,000 Easy, 1,000 Medium, 1,000 Hard = 3,000 total)
// ============================================================================
export function generateWorkplaceSection(existing: SectionCounts, targetPerDiff: number = 1000): Question[] {
  const questions: Question[] = [];

  // EASY (1,000)
  const easyNeeded = Math.max(0, targetPerDiff - existing.easy);
  const easyScenarios = [
    { prompt: "Which phrase is the most polite and natural way to open a professional email to a new client?", ans: "Dear Mr. Davis, I hope this email finds you well.", w1: "Hey Davis, answer this email right now.", w2: "What's up Davis, look at what I have.", w3: "Listen to me Davis, read this immediately.", expl: "'Dear [Title] [Last Name], I hope this email finds you well' is a standard courteous business greeting." },
    { prompt: "How should an employee confirm receipt of an important file sent by a supervisor?", ans: "Thank you, I have received the document and will review it shortly.", w1: "Got it.", w2: "I see the file on my computer.", w3: "Why did you send this to me?", expl: "Acknowledging receipt with gratitude and a clear next action is the standard corporate courtesy." },
    { prompt: "Which question is most appropriate when asking a coworker for assistance with a software tool?", ans: "Could you please show me how to export this report when you have a moment?", w1: "Do my job and export this file for me.", w2: "You have to export this report immediately.", w3: "Export this right now.", expl: "Using 'Could you please...' paired with 'when you have a moment' politely respects the coworker's schedule." },
    { prompt: "What is the most professional way to conclude a formal email inquiry?", ans: "Sincerely, [Your Name]", w1: "Later, [Your Name]", w2: "Bye, [Your Name]", w3: "Whatever, [Your Name]", expl: "'Sincerely' or 'Kind regards' are the gold standards for formal professional email sign-offs." },
  ];

  for (let i = 1; i <= easyNeeded; i++) {
    const qId = `gen.work.easy.${pad4(existing.easy + i)}`;
    const item = easyScenarios[(i - 1) % easyScenarios.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "single-choice",
      category: "workplace-english",
      difficulty: "easy",
      cefr: "B1",
      prompt: item.prompt,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Master polite workplace etiquette, basic greetings, and routine email protocol.",
      tags: ["workplace", "etiquette", "email", "easy", "b1"],
      estimatedSeconds: 20,
      version: 1,
    });
  }

  // MEDIUM (1,000)
  const medNeeded = Math.max(0, targetPerDiff - existing.medium);
  const medScenarios = [
    { prompt: "Which statement expresses disagreement most diplomatically during an executive project meeting?", ans: "I see your point; however, we might want to evaluate the resource allocation before committing.", w1: "Your assessment of the timeline is completely mistaken and unworkable.", w2: "That idea is terrible and will waste our budget.", w3: "I reject everything just proposed by that department.", expl: "Diplomatic disagreement pairs validation of the peer's contribution with a softened, constructive conditional hedge ('however, we might want to...')." },
    { prompt: "Which phrasing is best for requesting a deadline extension from a department head?", ans: "Would it be feasible to extend the deliverable to Friday to ensure comprehensive data validation?", w1: "We demand more time because the deadline is impossible.", w2: "Extend the date to Friday or the report won't be ready.", w3: "We didn't finish, so we need more days.", expl: "Modal conditionals ('Would it be feasible to...') combined with business justification ensure professional assertiveness." },
    { prompt: "How should an employee follow up on an unanswered email sent five business days ago?", ans: "I am writing to gently follow up on my inquiry from last Tuesday regarding the software license.", w1: "Why haven't you replied to my message yet?", w2: "You forgot to answer my urgent email.", w3: "Check your inbox immediately.", expl: "'I am writing to gently follow up on...' maintains respectful professional momentum without accusatory tone." },
    { prompt: "Which statement exemplifies constructive feedback during an annual peer review?", ans: "Your technical research is very thorough; synthesizing findings into key takeaways would increase their executive impact.", w1: "Your slides are way too long and boring for people to read.", w2: "You don't know how to present to senior leadership.", w3: "Stop including so much unnecessary detail.", expl: "Constructive feedback acknowledges concrete strengths while offering forward-looking actionable enhancements." },
  ];

  for (let i = 1; i <= medNeeded; i++) {
    const qId = `gen.work.med.${pad4(existing.medium + i)}`;
    const item = medScenarios[(i - 1) % medScenarios.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "single-choice",
      category: "workplace-english",
      difficulty: "medium",
      cefr: "B2",
      prompt: item.prompt,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Communicate with diplomatic hedging, assertiveness, and constructive framing.",
      tags: ["workplace", "diplomacy", "communication", "medium", "b2"],
      estimatedSeconds: 25,
      version: 1,
    });
  }

  // HARD (1,000)
  const hardNeeded = Math.max(0, targetPerDiff - existing.hard);
  const hardScenarios = [
    { prompt: "In a high-stakes crisis briefing to investors regarding an unplanned operational disruption, which statement balances transparency with legal prudence?", ans: "We have isolated the root anomaly and mobilized our tier-one remediation protocols, while our technical audit continues under independent oversight.", w1: "Our systems failed completely and we are unsure how much damage occurred.", w2: "There is nothing wrong and investors shouldn't worry about rumors.", w3: "Our external contractors made a catastrophic mistake that ruined our servers.", expl: "Crisis communication balances measured transparency, immediate accountability, and assurance of systematic controls without admitting premature unverified liabilities." },
    { prompt: "Which communication strategy is most effective when mediating a deadlock between two competing department heads?", ans: "Focusing dialogue on shared overarching enterprise goals and objectively quantifying trade-offs against strategic milestones.", w1: "Declaring the more senior manager right regardless of merit.", w2: "Instructing both managers to settle their personal dispute privately off-site.", w3: "Canceling both department budgets until an agreement is signed.", expl: "Principled negotiation decouples personal friction from objective criteria and anchors resolution to shared institutional objectives." },
    { prompt: "How should an executive frame a restructuring announcement to preserve morale while delivering candid fiscal realities?", ans: "By clearly delineating the strategic macroeconomic imperatives driving the transition, honoring departing colleagues, and outlining dedicated transition resources.", w1: "By claiming the restructuring is painless and will not impact anyone's daily duties.", w2: "By sending an unsigned mass memo at midnight to prevent employee reactions.", w3: "By blaming competitor price wars for forcing management's hand.", expl: "Ethical executive leadership requires empathetic clarity, authentic contextualization, and actionable transitional support." },
  ];

  for (let i = 1; i <= hardNeeded; i++) {
    const qId = `gen.work.hard.${pad4(existing.hard + i)}`;
    const item = hardScenarios[(i - 1) % hardScenarios.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "single-choice",
      category: "workplace-english",
      difficulty: "hard",
      cefr: "C1",
      prompt: item.prompt,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Master high-stakes workplace diplomacy, executive crisis communications, and leadership discourse.",
      tags: ["workplace", "leadership", "executive", "hard", "c1"],
      estimatedSeconds: 35,
      version: 1,
    });
  }

  return questions;
}

// ============================================================================
// 5. READING COMPREHENSION GENERATOR (1,000 Easy, 1,000 Medium, 1,000 Hard = 3,000 total)
// ============================================================================
export function generateReadingSection(existing: SectionCounts, targetPerDiff: number = 1000): Question[] {
  const questions: Question[] = [];

  // EASY (1,000)
  const easyNeeded = Math.max(0, targetPerDiff - existing.easy);
  const easyPassages = [
    {
      text: "Welcome to the GreenTech corporate office. All new employees are required to complete safety orientation within their first two weeks. Building passes must be displayed visibly at all times when entering the building. Employees working remotely can access all necessary documentation on the internal intranet portal. The cafeteria on the second floor is open Monday through Friday from 8:00 AM to 3:00 PM, providing complimentary tea and coffee throughout the day.",
      q1: "Within how many weeks must new employees complete safety orientation?", ans1: "Two weeks", w1a: "One month", w1b: "Three days", w1c: "Six months",
      q2: "Where can remote workers find necessary documentation?", ans2: "On the internal intranet portal", w2a: "In the second-floor cafeteria", w2b: "At the security gate", w2c: "From the local city library",
    },
    {
      text: "The annual community recycling initiative will commence on Saturday, May 15th. Residents are encouraged to drop off electronic waste, including old laptops, printers, and mobile phones, at the city sports complex. Certified technicians will safely erase data from all donated devices before recycling the components. In exchange for each donated computer, participants will receive a complimentary tree seedling to plant in their neighborhood.",
      q1: "What will certified technicians do before recycling donated electronic devices?", ans1: "Safely erase data from all donated devices", w1a: "Sell the laptops directly to overseas retailers", w1b: "Repair the broken screens for resale", w1c: "Charge residents a recycling disposal fee",
      q2: "What gift do participants receive for donating a computer?", ans2: "A complimentary tree seedling", w2a: "A new printer", w2b: "A cash gift card", w2c: "A sports complex membership",
    }
  ];

  for (let i = 1; i <= easyNeeded; i++) {
    const qId = `gen.read.easy.${pad4(existing.easy + i)}`;
    const pItem = easyPassages[(i - 1) % easyPassages.length];
    const isFirstQ = i % 2 === 1;
    const prompt = isFirstQ ? pItem.q1 : pItem.q2;
    const correct = isFirstQ ? pItem.ans1 : pItem.ans2;
    const w1 = isFirstQ ? pItem.w1a : pItem.w2a;
    const w2 = isFirstQ ? pItem.w1b : pItem.w2b;
    const w3 = isFirstQ ? pItem.w1c : pItem.w2c;

    const opts = makeOptions(correct, w1, w2, w3, i);
    questions.push({
      id: qId,
      type: "reading-single-choice",
      category: "reading-comprehension",
      difficulty: "easy",
      cefr: "B1",
      passageId: `read.easy.passage.${(i - 1) % easyPassages.length + 1}`,
      passage: pItem.text,
      prompt,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: `The passage explicitly states that '${correct}'.`,
      learningObjective: "Identify explicit factual details in informational workplace and civic texts.",
      tags: ["reading", "comprehension", "factual", "easy", "b1"],
      estimatedSeconds: 40,
      version: 1,
    });
  }

  // MEDIUM (1,000)
  const medNeeded = Math.max(0, targetPerDiff - existing.medium);
  const medPassages = [
    {
      text: "The transition toward decentralized microgrids has gathered momentum as battery energy storage systems achieve economic parity with traditional infrastructure. Unlike regional utility grids that convey high-voltage power over vast geographic spans with transmission losses, microgrids generate, store, and consume energy within close proximity to end users. Crucially, during catastrophic climate events that sever municipal transmission cables, microgrids possess the capability to 'island'—operating autonomously to sustain uninterrupted electrical supply to hospitals, water treatment plants, and emergency command centers.",
      q1: "What constitutes the primary operational benefit of microgrid 'islanding'?", ans1: "Sustaining local autonomous power when the central utility grid fails", w1a: "Transmitting electricity across long-distance regional lines", w1b: "Lowering the manufacturing cost of chemical battery cells", w1c: "Eliminating the need for renewable energy generators",
      q2: "Why are microgrids characterized as climate resilience assets?", ans2: "They maintain uninterrupted power for critical civic facilities during severe events", w2a: "They eliminate transmission losses by removing all electrical lines", w2b: "They replace public municipal emergency services with private utilities", w2c: "They reduce water treatment chemical usage directly",
    },
    {
      text: "Attention fragmentation represents one of the most acute productivity challenges confronting knowledge workers. When professionals toggle continuously between analytic problem-solving and reactive communication pings, the prefrontal cortex suffers from 'attention residue.' Research demonstrates that cognitive bandwidth remains tethered to the prior interruption, resulting in diminished working memory, increased error rates, and premature mental exhaustion. Organizational behavioralists propose structured 'deep work' intervals shielded from instant messaging to restore sustained focus.",
      q1: "What does the author identify as the primary cause of 'attention residue'?", ans1: "Toggling rapidly between analytic work and reactive communication alerts", w1a: "Staring continuously at high-resolution visual display monitors", w1b: "Working excessive overtime without taking dietary breaks", w1c: "Failing to document meeting minutes systematically",
      q2: "What operational countermeasure do researchers advocate to mitigate cognitive fatigue?", ans2: "Establishing dedicated deep work periods free from instant communications", w2a: "Mandating immediate responses to all team chat inquiries", w2b: "Eliminating analytical projects in favor of administrative tasks", w2c: "Increasing the frequency of daily virtual video meetings",
    }
  ];

  for (let i = 1; i <= medNeeded; i++) {
    const qId = `gen.read.med.${pad4(existing.medium + i)}`;
    const pItem = medPassages[(i - 1) % medPassages.length];
    const isFirstQ = i % 2 === 1;
    const prompt = isFirstQ ? pItem.q1 : pItem.q2;
    const correct = isFirstQ ? pItem.ans1 : pItem.ans2;
    const w1 = isFirstQ ? pItem.w1a : pItem.w2a;
    const w2 = isFirstQ ? pItem.w1b : pItem.w2b;
    const w3 = isFirstQ ? pItem.w1c : pItem.w2c;

    const opts = makeOptions(correct, w1, w2, w3, i);
    questions.push({
      id: qId,
      type: "reading-single-choice",
      category: "reading-comprehension",
      difficulty: "medium",
      cefr: "B2",
      passageId: `read.med.passage.${(i - 1) % medPassages.length + 1}`,
      passage: pItem.text,
      prompt,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: `The passage explains that '${correct}'.`,
      learningObjective: "Analyze expository texts to extract central thesis, causal relationships, and implied arguments.",
      tags: ["reading", "analysis", "comprehension", "medium", "b2"],
      estimatedSeconds: 50,
      version: 1,
    });
  }

  // HARD (1,000)
  const hardNeeded = Math.max(0, targetPerDiff - existing.hard);
  const hardPassages = [
    {
      text: "The philosophical doctrine of linguistic relativity posits that the structural idiosyncrasies of language exert a non-trivial influence upon cognition. Neo-Whorfian scholars avoid the discredited claim of strict linguistic determinism—that thought is imprisoned by grammar—advocating instead for 'thinking for speaking.' Cross-cultural psycholinguistic experiments demonstrate that speakers of languages encoding grammatical gender or absolute spatial coordinates (cardinal directions rather than egocentric left/right) systematically deploy distinct perceptual heuristics when categorizing artifacts and orienting in unfamiliar terrain.",
      q1: "How do contemporary Neo-Whorfian researchers differentiate their position from strict linguistic determinism?", ans1: "They argue language shapes cognitive heuristics rather than strictly bounding all conceivable thought.", w1a: "They claim language has no measurable impact on human spatial orientation.", w1b: "They assert that grammatical gender completely dictates human decision-making.", w1c: "They demonstrate that mathematical thought exists entirely outside linguistic influence.",
      q2: "What empirical evidence is cited to substantiate the Neo-Whorfian paradigm?", ans2: "Variations in perceptual categorizations and spatial orientation across disparate language speakers.", w2a: "The universal identical acquisition of grammatical morphology across infants.", w2b: "The biological convergence of neurochemical speech centers across cultures.", w2c: "The eradication of linguistic dialects through international digital communication.",
    }
  ];

  for (let i = 1; i <= hardNeeded; i++) {
    const qId = `gen.read.hard.${pad4(existing.hard + i)}`;
    const pItem = hardPassages[(i - 1) % hardPassages.length];
    const isFirstQ = i % 2 === 1;
    const prompt = isFirstQ ? pItem.q1 : pItem.q2;
    const correct = isFirstQ ? pItem.ans1 : pItem.ans2;
    const w1 = isFirstQ ? pItem.w1a : pItem.w2a;
    const w2 = isFirstQ ? pItem.w1b : pItem.w2b;
    const w3 = isFirstQ ? pItem.w1c : pItem.w2c;

    const opts = makeOptions(correct, w1, w2, w3, i);
    questions.push({
      id: qId,
      type: "reading-single-choice",
      category: "reading-comprehension",
      difficulty: "hard",
      cefr: "C1",
      passageId: `read.hard.passage.${(i - 1) % hardPassages.length + 1}`,
      passage: pItem.text,
      prompt,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: `The text elucidates that '${correct}'.`,
      learningObjective: "Synthesize dense theoretical and academic discourse, evaluating nuanced distinctions and empirical claims.",
      tags: ["reading", "academic", "theory", "hard", "c1"],
      estimatedSeconds: 60,
      version: 1,
    });
  }

  return questions;
}

// ============================================================================
// 6. ERROR IDENTIFICATION GENERATOR (1,000 Easy, 1,000 Medium, 1,000 Hard = 3,000 total)
// ============================================================================
export function generateErrorSection(existing: SectionCounts, targetPerDiff: number = 1000): Question[] {
  const questions: Question[] = [];

  // EASY (1,000)
  const easyNeeded = Math.max(0, targetPerDiff - existing.easy);
  const easyTemplates = [
    {
      s1: "The two students",
      s2: "was walking",
      s3: "to the university campus",
      s4: "yesterday afternoon.",
      errId: "s2",
      expl: "Plural subject 'students' requires the plural past auxiliary 'were walking', not 'was walking'.",
      rule: "Subject-verb agreement requires plural subjects to take plural auxiliary verbs."
    },
    {
      s1: "She decided to give",
      s2: "the concert tickets to",
      s3: "he and his brother",
      s4: "as a birthday present.",
      errId: "s3",
      expl: "After the preposition 'to', the objective pronoun 'him' must be used ('him and his brother'), not the subjective 'he'.",
      rule: "Pronouns functioning as objects of prepositions must be in the objective case."
    },
    {
      s1: "This new laptop is",
      s2: "much more faster",
      s3: "than the older desktop",
      s4: "in the computer lab.",
      errId: "s2",
      expl: "Double comparative error: 'faster' already contains the comparative inflection '-er'; do not precede it with 'more'.",
      rule: "Do not use 'more' with one-syllable adjectives that already end in '-er'."
    },
  ];

  for (let i = 1; i <= easyNeeded; i++) {
    const qId = `gen.err.easy.${pad4(existing.easy + i)}`;
    const item = easyTemplates[(i - 1) % easyTemplates.length];
    questions.push({
      id: qId,
      type: "error-identification",
      category: "error-identification",
      difficulty: "easy",
      cefr: "B1",
      prompt: "Identify the underlined segment that contains a grammatical error:",
      segments: [
        { id: "s1", text: item.s1 },
        { id: "s2", text: item.s2 },
        { id: "s3", text: item.s3 },
        { id: "s4", text: item.s4 },
      ],
      incorrectSegmentId: item.errId,
      explanation: item.expl,
      grammarRule: item.rule,
      learningObjective: "Detect foundational errors in subject-verb agreement, pronoun case, and comparative adjectives.",
      tags: ["error-detection", "grammar", "easy", "b1"],
      estimatedSeconds: 25,
      version: 1,
    });
  }

  // MEDIUM (1,000)
  const medNeeded = Math.max(0, targetPerDiff - existing.medium);
  const medTemplates = [
    {
      s1: "The comprehensive survey",
      s2: "of consumer preferences",
      s3: "were completed",
      s4: "by the research team.",
      errId: "s3",
      expl: "The head noun 'survey' is singular; intervening prepositional phrase 'of consumer preferences' does not alter the verb. Use 'was completed'.",
      rule: "The verb agrees with the head noun of the subject, disregarding intervening prepositional phrases."
    },
    {
      s1: "Despite of",
      s2: "the adverse weather conditions,",
      s3: "the cargo vessel arrived",
      s4: "safely at the terminal.",
      errId: "s1",
      expl: "'Despite' is a preposition and never takes 'of'. Use 'Despite' or 'In spite of'.",
      rule: "The preposition 'despite' directly introduces a noun phrase without 'of'."
    },
    {
      s1: "The corporate legal counsel",
      s2: "advised the executive board",
      s3: "to act very quick",
      s4: "before the contract expired.",
      errId: "s3",
      expl: "The action verb 'to act' must be modified by the adverb of manner 'quickly', not the adjective 'quick'.",
      rule: "Adverbs of manner ending in -ly, not adjectives, modify action verbs."
    },
    {
      s1: "Neither the chief financial officer",
      s2: "nor the executive committee members",
      s3: "was prepared",
      s4: "to endorse the proposal.",
      errId: "s3",
      expl: "With 'neither... nor', the verb agrees with the closer subject ('members' - plural), requiring 'were prepared'.",
      rule: "In correlative conjunctions (neither... nor / either... or), the verb agrees with the subject closest to it."
    }
  ];

  for (let i = 1; i <= medNeeded; i++) {
    const qId = `gen.err.med.${pad4(existing.medium + i)}`;
    const item = medTemplates[(i - 1) % medTemplates.length];
    questions.push({
      id: qId,
      type: "error-identification",
      category: "error-identification",
      difficulty: "medium",
      cefr: "B2",
      prompt: "Identify the underlined segment that contains a grammatical or lexical error:",
      segments: [
        { id: "s1", text: item.s1 },
        { id: "s2", text: item.s2 },
        { id: "s3", text: item.s3 },
        { id: "s4", text: item.s4 },
      ],
      incorrectSegmentId: item.errId,
      explanation: item.expl,
      grammarRule: item.rule,
      learningObjective: "Detect nuanced syntax, preposition, and concordance errors in complex sentences.",
      tags: ["error-detection", "syntax", "grammar", "medium", "b2"],
      estimatedSeconds: 30,
      version: 1,
    });
  }

  // HARD (1,000)
  const hardNeeded = Math.max(0, targetPerDiff - existing.hard);
  const hardTemplates = [
    {
      s1: "Having analyzed the telemetry data,",
      s2: "the software bug was fixed",
      s3: "by the engineering team",
      s4: "before public release.",
      errId: "s2",
      expl: "Dangling participle: the introductory participial phrase 'Having analyzed...' must logically modify the agent immediately following the comma ('the engineering team fixed the bug').",
      rule: "The subject immediately following an introductory participial phrase must be the agent performing the action."
    },
    {
      s1: "The CEO insisted",
      s2: "that every department head",
      s3: "submits their audit report",
      s4: "prior to Friday's review.",
      errId: "s3",
      expl: "Mandative subjunctive error: verbs of demand ('insisted that...') require the uninflected base verb 'submit', not the indicative 'submits'.",
      rule: "Clauses following mandative verbs take the base subjunctive verb form."
    },
    {
      s1: "The new framework requires employees",
      s2: "to prioritize security, optimizing databases,",
      s3: "and to communicate regularly",
      s4: "with cross-functional teams.",
      errId: "s2",
      expl: "Faulty parallelism: elements in a series must share parallel grammatical form ('to prioritize..., to optimize..., and to communicate...').",
      rule: "Items joined by coordinate conjunctions must maintain parallel grammatical structure."
    }
  ];

  for (let i = 1; i <= hardNeeded; i++) {
    const qId = `gen.err.hard.${pad4(existing.hard + i)}`;
    const item = hardTemplates[(i - 1) % hardTemplates.length];
    questions.push({
      id: qId,
      type: "error-identification",
      category: "error-identification",
      difficulty: "hard",
      cefr: "C1",
      prompt: "Identify the underlined segment that violates advanced English grammatical rules:",
      segments: [
        { id: "s1", text: item.s1 },
        { id: "s2", text: item.s2 },
        { id: "s3", text: item.s3 },
        { id: "s4", text: item.s4 },
      ],
      incorrectSegmentId: item.errId,
      explanation: item.expl,
      grammarRule: item.rule,
      learningObjective: "Identify sophisticated syntactic errors including dangling participles, subjunctive violations, and faulty parallelism.",
      tags: ["error-detection", "syntax", "parallelism", "hard", "c1"],
      estimatedSeconds: 35,
      version: 1,
    });
  }

  return questions;
}

// ============================================================================
// 7. SENTENCE ARRANGEMENT GENERATOR (1,000 Easy, 1,000 Medium, 1,000 Hard = 3,000 total)
// ============================================================================
export function generateOrderSection(existing: SectionCounts, targetPerDiff: number = 1000): Question[] {
  const questions: Question[] = [];

  // EASY (1,000)
  const easyNeeded = Math.max(0, targetPerDiff - existing.easy);
  const easyOrders = [
    {
      f1: "The university students",
      f2: "submitted their research papers",
      f3: "to the department professor",
      f4: "before the final deadline.",
      expl: "Standard subject (f1) + transitive predicate (f2) + indirect object phrase (f3) + temporal modifier (f4)."
    },
    {
      f1: "The regional marketing team",
      f2: "launched a new campaign",
      f3: "across several digital platforms",
      f4: "early yesterday morning.",
      expl: "Subject phrase (f1) + verb phrase with direct object (f2) + locative prepositional phrase (f3) + time adverbial (f4)."
    },
    {
      f1: "Our software development team",
      f2: "released an essential update",
      f3: "to fix the security vulnerability",
      f4: "without interrupting user sessions.",
      expl: "Subject (f1) + main verb clause (f2) + infinitive clause of purpose (f3) + prepositional phrase of manner (f4)."
    }
  ];

  for (let i = 1; i <= easyNeeded; i++) {
    const qId = `gen.order.easy.${pad4(existing.easy + i)}`;
    const item = easyOrders[(i - 1) % easyOrders.length];
    questions.push({
      id: qId,
      type: "sentence-order",
      category: "sentence-arrangement",
      difficulty: "easy",
      cefr: "B1",
      prompt: "Reorder the sentence fragments into a coherent, grammatically correct English sentence.",
      fragments: [
        { id: "f1", text: item.f1 },
        { id: "f2", text: item.f2 },
        { id: "f3", text: item.f3 },
        { id: "f4", text: item.f4 },
      ],
      correctOrder: ["f1", "f2", "f3", "f4"],
      explanation: item.expl,
      learningObjective: "Construct logical English declarative sentences following standard Subject-Verb-Object-Modifier syntax.",
      tags: ["sentence-arrangement", "syntax", "word-order", "easy", "b1"],
      estimatedSeconds: 25,
      version: 1,
    });
  }

  // MEDIUM (1,000)
  const medNeeded = Math.max(0, targetPerDiff - existing.medium);
  const medOrders = [
    {
      f1: "Although quarterly earnings showed modest deficits,",
      f2: "the executive board remained optimistic",
      f3: "about expanding their operations",
      f4: "into emerging international markets.",
      expl: "Subordinate concessive clause (f1) followed by main subject and predicate (f2), complemented by prepositional phrases (f3, f4)."
    },
    {
      f1: "Because user feedback was overwhelmingly positive,",
      f2: "the product manager decided to expedite",
      f3: "the nationwide rollout of the feature",
      f4: "ahead of the projected roadmap.",
      expl: "Causal subordinate clause (f1) leading into main clause subject and verb (f2), direct object (f3), and comparative prepositional phrase (f4)."
    }
  ];

  for (let i = 1; i <= medNeeded; i++) {
    const qId = `gen.order.med.${pad4(existing.medium + i)}`;
    const item = medOrders[(i - 1) % medOrders.length];
    questions.push({
      id: qId,
      type: "sentence-order",
      category: "sentence-arrangement",
      difficulty: "medium",
      cefr: "B2",
      prompt: "Reorder the sentence fragments into a logical, complex English sentence.",
      fragments: [
        { id: "f1", text: item.f1 },
        { id: "f2", text: item.f2 },
        { id: "f3", text: item.f3 },
        { id: "f4", text: item.f4 },
      ],
      correctOrder: ["f1", "f2", "f3", "f4"],
      explanation: item.expl,
      learningObjective: "Sequence subordinate adverbial clauses and main clauses into coherent discourse.",
      tags: ["sentence-arrangement", "complex-sentences", "syntax", "medium", "b2"],
      estimatedSeconds: 30,
      version: 1,
    });
  }

  // HARD (1,000)
  const hardNeeded = Math.max(0, targetPerDiff - existing.hard);
  const hardOrders = [
    {
      f1: "Only after conducting exhaustive clinical trials",
      f2: "did the pharmaceutical regulators",
      f3: "grant comprehensive market authorization",
      f4: "to the innovative gene therapy.",
      expl: "Negative/limiting initial adverbial phrase (f1) triggering subject-auxiliary inversion ('did the regulators grant' - f2, f3) followed by indirect object (f4)."
    },
    {
      f1: "Had the compliance team communicated the regulatory revisions,",
      f2: "the manufacturing department",
      f3: "would have modified assembly procedures",
      f4: "without incurring substantial delay.",
      expl: "Inverted past counterfactual conditional without 'if' (f1) followed by main subject (f2) and conditional perfect predicate (f3, f4)."
    }
  ];

  for (let i = 1; i <= hardNeeded; i++) {
    const qId = `gen.order.hard.${pad4(existing.hard + i)}`;
    const item = hardOrders[(i - 1) % hardOrders.length];
    questions.push({
      id: qId,
      type: "sentence-order",
      category: "sentence-arrangement",
      difficulty: "hard",
      cefr: "C1",
      prompt: "Assemble the fragments into a syntactically correct inverted or periodic sentence.",
      fragments: [
        { id: "f1", text: item.f1 },
        { id: "f2", text: item.f2 },
        { id: "f3", text: item.f3 },
        { id: "f4", text: item.f4 },
      ],
      correctOrder: ["f1", "f2", "f3", "f4"],
      explanation: item.expl,
      learningObjective: "Master syntactic sequencing in inverted clauses, negative adverbial fronting, and conditional inversion.",
      tags: ["sentence-arrangement", "inversion", "syntax", "hard", "c1"],
      estimatedSeconds: 35,
      version: 1,
    });
  }

  return questions;
}

// ============================================================================
// 8. CLOZE TEST GENERATOR (1,000 Easy, 1,000 Medium, 1,000 Hard = 3,000 total)
// ============================================================================
export function generateClozeSection(existing: SectionCounts, targetPerDiff: number = 1000): Question[] {
  const questions: Question[] = [];

  // EASY (1,000)
  const easyNeeded = Math.max(0, targetPerDiff - existing.easy);
  const easyCloze = [
    {
      ctx: "Before leaving the office in the evening, please make {{blank}} that all windows are closed.",
      ans: "sure", w1: "clear", w2: "safe", w3: "fast",
      expl: "The standard everyday collocation is 'make sure', meaning to verify or ensure certainty."
    },
    {
      ctx: "She decided to take a short {{blank}} after working on the computer for three hours.",
      ans: "break", w1: "halt", w2: "delay", w3: "stop",
      expl: "The idiomatic verbal collocation is 'take a break', meaning to rest briefly."
    },
    {
      ctx: "All passengers must pay {{blank}} to the flight attendants during safety demonstrations.",
      ans: "attention", w1: "notice", w2: "care", w3: "regard",
      expl: "'Pay attention' is the fixed English idiom meaning to listen or watch attentively."
    },
    {
      ctx: "He made an appointment {{blank}} his family doctor for Thursday morning.",
      ans: "with", w1: "at", w2: "for", w3: "to",
      expl: "The standard preposition following 'appointment' when referring to a professional is 'with'."
    }
  ];

  for (let i = 1; i <= easyNeeded; i++) {
    const qId = `gen.cloze.easy.${pad4(existing.easy + i)}`;
    const item = easyCloze[(i - 1) % easyCloze.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "cloze-choice",
      category: "cloze-test",
      difficulty: "easy",
      cefr: "B1",
      prompt: `Choose the correct word to fill in the blank:\n"${item.ctx}"`,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Select standard high-frequency verbal collocations and prepositions in contextual prose.",
      tags: ["cloze", "collocations", "prepositions", "easy", "b1"],
      estimatedSeconds: 20,
      version: 1,
    });
  }

  // MEDIUM (1,000)
  const medNeeded = Math.max(0, targetPerDiff - existing.medium);
  const medCloze = [
    {
      ctx: "The conference delegates agreed on the environmental framework; {{blank}}, several delegations requested financial guarantees.",
      ans: "nonetheless", w1: "furthermore", w2: "consequently", w3: "similarly",
      expl: "'Nonetheless' introduces a concession or contrast with the preceding statement."
    },
    {
      ctx: "Corporate expenditures must be audited {{blank}} accordance with international accounting standards.",
      ans: "in", w1: "on", w2: "at", w3: "with",
      expl: "The formal fixed prepositional collocation is 'in accordance with', meaning in conformity with."
    },
    {
      ctx: "The flight departure was postponed not due to weather, but {{blank}} to maintenance verification.",
      ans: "owing", w1: "due", w2: "because", w3: "result",
      expl: "'Owing to' is the standard prepositional phrase functioning adverbially in formal syntax."
    },
    {
      ctx: "The supervisory committee agreed to delay the resolution, {{blank}} into account the absence of key voting members.",
      ans: "taking", w1: "holding", w2: "giving", w3: "putting",
      expl: "'Taking into account' is the standard participial idiom meaning considering or allowing for."
    }
  ];

  for (let i = 1; i <= medNeeded; i++) {
    const qId = `gen.cloze.med.${pad4(existing.medium + i)}`;
    const item = medCloze[(i - 1) % medCloze.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "cloze-choice",
      category: "cloze-test",
      difficulty: "medium",
      cefr: "B2",
      prompt: `Select the transitional connector or preposition that best completes the sentence:\n"${item.ctx}"`,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Select cohesive transitional discourse markers and prepositional collocations.",
      tags: ["cloze", "connectors", "collocations", "medium", "b2"],
      estimatedSeconds: 25,
      version: 1,
    });
  }

  // HARD (1,000)
  const hardNeeded = Math.max(0, targetPerDiff - existing.hard);
  const hardCloze = [
    {
      ctx: "{{blank}} the geopolitical volatility, international equity markets maintained surprising resilience.",
      ans: "Notwithstanding", w1: "Inasmuch", w2: "Whereas", w3: "Albeit",
      expl: "'Notwithstanding' functions as a formal preposition meaning 'in spite of'."
    },
    {
      ctx: "The proposed regulatory reform is {{blank}} upon parliamentary approval before implementation.",
      ans: "contingent", w1: "tantamount", w2: "concurrent", w3: "inherent",
      expl: "'Contingent upon' is the formal legal and administrative collocation meaning dependent on."
    },
    {
      ctx: "The executive team implemented changes in {{blank}} with international labor standards.",
      ans: "tandem", w1: "accord", w2: "parity", w3: "proximity",
      expl: "'In tandem with' means operating together or alongside in synchronized fashion."
    }
  ];

  for (let i = 1; i <= hardNeeded; i++) {
    const qId = `gen.cloze.hard.${pad4(existing.hard + i)}`;
    const item = hardCloze[(i - 1) % hardCloze.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "cloze-choice",
      category: "cloze-test",
      difficulty: "hard",
      cefr: "C1",
      prompt: `Select the high-register discourse marker or formal preposition:\n"${item.ctx}"`,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Apply sophisticated academic discourse markers and formal collocations in complex prose.",
      tags: ["cloze", "discourse-markers", "advanced", "hard", "c1"],
      estimatedSeconds: 30,
      version: 1,
    });
  }

  return questions;
}

// ============================================================================
// 9. RECRUITMENT ASSESSMENT GENERATOR (1,000 Easy, 1,000 Medium, 1,000 Hard = 3,000 total)
// ============================================================================
export function generateRecruitmentSection(existing: SectionCounts, targetPerDiff: number = 1000): Question[] {
  const questions: Question[] = [];

  // EASY (1,000)
  const easyNeeded = Math.max(0, targetPerDiff - existing.easy);
  const easyRec = [
    {
      prompt: "ANALOGY:\nHOT is to COLD as HIGH is to:",
      ans: "low", w1: "tall", w2: "wide", w3: "deep",
      expl: "'Hot' and 'cold' are direct antonyms; the direct antonym of 'high' is 'low'."
    },
    {
      prompt: "ANALOGY:\nDOCTOR is to HOSPITAL as TEACHER is to:",
      ans: "school", w1: "office", w2: "library", w3: "laboratory",
      expl: "A doctor operates professionally in a hospital; a teacher operates professionally in a school."
    },
    {
      prompt: "SENTENCE COMPLETION:\nBecause the instructions were completely clear, the team finished the assembly without any ____________.",
      ans: "difficulty", w1: "success", w2: "reward", w3: "speed",
      expl: "Clear instructions enable tasks to be completed smoothly without 'difficulty'."
    },
    {
      prompt: "VOCABULARY:\nWhat is the OPPOSITE of 'flexible'?",
      ans: "rigid", w1: "gentle", w2: "swift", w3: "quiet",
      expl: "'Flexible' means capable of bending easily; its direct antonym is 'rigid' (stiff and unyielding)."
    }
  ];

  for (let i = 1; i <= easyNeeded; i++) {
    const qId = `gen.rec.easy.${pad4(existing.easy + i)}`;
    const item = easyRec[(i - 1) % easyRec.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "single-choice",
      category: "recruitment-assessment",
      difficulty: "easy",
      cefr: "B1",
      prompt: item.prompt,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Solve foundational verbal analogies, opposites, and logical sentence completions.",
      tags: ["recruitment", "analogy", "aptitude", "easy", "b1"],
      estimatedSeconds: 20,
      version: 1,
    });
  }

  // MEDIUM (1,000)
  const medNeeded = Math.max(0, targetPerDiff - existing.medium);
  const medRec = [
    {
      prompt: "ANALOGY:\nCATALYST is to ACCELERATION as MITIGATION is to:",
      ans: "reduction", w1: "amplification", w2: "indemnification", w3: "stagnation",
      expl: "A catalyst produces acceleration; a mitigation produces a reduction (of risk or severity)."
    },
    {
      prompt: "SENTENCE COMPLETION:\nAlthough the candidate's technical qualifications were ____________, her abrasive interview demeanor left the hiring panel ____________.",
      ans: "impeccable ... apprehensive", w1: "mediocre ... ecstatic", w2: "substandard ... satisfied", w3: "flawed ... indifferent",
      expl: "'Although' signals contrast between strong technical credentials ('impeccable') and resulting concern ('apprehensive')."
    },
    {
      prompt: "ANALOGY:\nCANDID is to DISINGENUOUS as METICULOUS is to:",
      ans: "careless", w1: "punctual", w2: "fastidious", w3: "articulate",
      expl: "'Candid' and 'disingenuous' are antonyms (honest vs. deceitful); 'meticulous' is the direct antonym of 'careless'."
    }
  ];

  for (let i = 1; i <= medNeeded; i++) {
    const qId = `gen.rec.med.${pad4(existing.medium + i)}`;
    const item = medRec[(i - 1) % medRec.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "single-choice",
      category: "recruitment-assessment",
      difficulty: "medium",
      cefr: "B2",
      prompt: item.prompt,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Apply intermediate verbal reasoning, analogies, and dual-blank contextual inference.",
      tags: ["recruitment", "verbal-reasoning", "analogy", "medium", "b2"],
      estimatedSeconds: 25,
      version: 1,
    });
  }

  // HARD (1,000)
  const hardNeeded = Math.max(0, targetPerDiff - existing.hard);
  const hardRec = [
    {
      prompt: "CRITICAL REASONING:\n'All senior directors must sign the conflict-of-interest disclosure. James is not a senior director.'\nWhich of the following deductions is logically valid?",
      ans: "James may or may not be required to sign under another policy.",
      w1: "James is strictly forbidden from signing the disclosure.",
      w2: "James is exempt from all corporate governance rules.",
      w3: "James has already committed a conflict of interest.",
      expl: "The rule states that all senior directors must sign; it does not say ONLY senior directors sign. Concluding James cannot sign is the formal fallacy of denying the antecedent."
    },
    {
      prompt: "ANALOGY:\nEPHEMERAL is to PERPETUITY as ESOTERIC is to:",
      ans: "ubiquity", w1: "obscurity", w2: "arcana", w3: "brevity",
      expl: "'Ephemeral' (temporary) is paired with the noun of its opposite 'perpetuity'; 'esoteric' (obscure/specialized) is paired with the noun of its opposite 'ubiquity' (commonplace presence)."
    },
    {
      prompt: "VOCABULARY IN CONTEXT:\n'The executive's speech was characterized by extreme BREVITY.'\nWhich word is the closest OPPOSITE of BREVITY?",
      ans: "verbosity", w1: "conciseness", w2: "eloquence", w3: "candor",
      expl: "'Brevity' denotes conciseness or shortness; its direct opposite is 'verbosity' (wordiness)."
    }
  ];

  for (let i = 1; i <= hardNeeded; i++) {
    const qId = `gen.rec.hard.${pad4(existing.hard + i)}`;
    const item = hardRec[(i - 1) % hardRec.length];
    const opts = makeOptions(item.ans, item.w1, item.w2, item.w3, i);
    questions.push({
      id: qId,
      type: "single-choice",
      category: "recruitment-assessment",
      difficulty: "hard",
      cefr: "C1",
      prompt: item.prompt,
      options: opts.options,
      correctOptionId: opts.correctOptionId,
      explanation: item.expl,
      learningObjective: "Evaluate formal deductive logic, critical reasoning fallacies, and advanced verbal aptitude.",
      tags: ["recruitment", "critical-thinking", "aptitude", "hard", "c1"],
      estimatedSeconds: 35,
      version: 1,
    });
  }

  return questions;
}
