import { Question } from "../../../domain/questions/schema.ts";
import { ErrorIdDef, buildErrorId } from "./helpers.ts";

export const rawErrorDefs: ErrorIdDef[] = [
  // ===================== EASY (A2) - 35 Questions =====================
  {
    id: "error.easy.0001",
    category: "error-identification",
    subcategory: "subject-verb agreement",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The team of medical specialists",
      "are conducting",
      "routine health checkups",
      "at the community center."
    ],
    errorIndex: 1, // s2
    explanation: "The subject head is singular ('The team'), so the verb must be 'is conducting' rather than plural 'are conducting'.",
    learningObjective: "Detect subject-verb agreement errors across prepositional modifiers.",
    grammarRule: "Collective head noun 'team' takes singular agreement in formal standard English.",
    tags: ["agreement", "error-identification", "a2"]
  },
  {
    id: "error.easy.0002",
    category: "error-identification",
    subcategory: "pronoun case",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The senior supervisor gave",
      "the new project dossiers",
      "to she and her assistant",
      "yesterday morning."
    ],
    errorIndex: 2, // s3
    explanation: "Prepositions like 'to' govern objective case pronouns. Therefore, it should be 'to her and her assistant' instead of 'to she'.",
    learningObjective: "Identify objective pronoun case following prepositions.",
    grammarRule: "Prepositions require objective case pronouns (her, him, them, me).",
    tags: ["pronouns", "case", "a2"]
  },
  {
    id: "error.easy.0003",
    category: "error-identification",
    subcategory: "tense marker",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "Last Friday afternoon,",
      "the international delegates",
      "visit the historic cathedral",
      "before returning to their hotel."
    ],
    errorIndex: 2, // s3
    explanation: "'Last Friday afternoon' is a definite past time marker requiring past simple 'visited' rather than present simple 'visit'.",
    learningObjective: "Spot past simple tense inconsistencies with past time adverbials.",
    grammarRule: "Definite past time markers trigger past simple.",
    tags: ["tenses", "past-simple", "a2"]
  },
  {
    id: "error.easy.0004",
    category: "error-identification",
    subcategory: "uncountable nouns",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The university counselor offered",
      "several helpful advices",
      "regarding postgraduate scholarships",
      "to incoming students."
    ],
    errorIndex: 1, // s2
    explanation: "'Advice' is an uncountable mass noun in English; it cannot take a plural '-s' or quantifier 'several'. It should be 'pieces of advice' or 'some advice'.",
    learningObjective: "Identify pluralization errors on uncountable mass nouns.",
    grammarRule: "'Advice' is uncountable and cannot be pluralized.",
    tags: ["uncountable-nouns", "pluralization", "a2"]
  },
  {
    id: "error.easy.0005",
    category: "error-identification",
    subcategory: "double comparatives",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The express subway line",
      "is much more faster",
      "than taking the cross-town bus",
      "during rush hour."
    ],
    errorIndex: 1, // s2
    explanation: "'Faster' is already a comparative. Combining 'more' with '-er' creates a redundant double comparative ('much faster').",
    learningObjective: "Detect redundant double comparatives.",
    grammarRule: "Do not combine 'more' with -er comparative adjectives.",
    tags: ["comparatives", "modifiers", "a2"]
  },
  {
    id: "error.easy.0006",
    category: "error-identification",
    subcategory: "prepositions",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The flight from Zurich",
      "arrived to terminal 2",
      "ten minutes ahead of schedule",
      "despite the crosswinds."
    ],
    errorIndex: 1, // s2
    explanation: "English uses 'arrive at' for buildings and specific points (or 'arrive in' for cities/countries), not 'arrive to'.",
    learningObjective: "Identify correct spatial prepositions following 'arrive'.",
    grammarRule: "Use 'arrive at/in', never 'arrive to'.",
    tags: ["prepositions", "motion", "a2"]
  },
  {
    id: "error.easy.0007",
    category: "error-identification",
    subcategory: "subject-verb agreement",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "Every student in the laboratory",
      "have completed",
      "the required safety orientation",
      "before operating the equipment."
    ],
    errorIndex: 1, // s2
    explanation: "'Every' is singular, so the auxiliary verb should be 'has completed' rather than plural 'have completed'.",
    learningObjective: "Apply singular agreement with quantifier 'every'.",
    grammarRule: "'Every' takes a singular verb.",
    tags: ["agreement", "quantifiers", "a2"]
  },
  {
    id: "error.easy.0008",
    category: "error-identification",
    subcategory: "adverbs vs adjectives",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The newly installed software",
      "runs very smooth",
      "on older operating systems",
      "without depleting battery life."
    ],
    errorIndex: 1, // s2
    explanation: "The verb 'runs' must be modified by an adverb ('smoothly') rather than an adjective ('smooth').",
    learningObjective: "Identify adjective/adverb confusions modifying action verbs.",
    grammarRule: "Action verbs are modified by adverbs ending in -ly.",
    tags: ["adverbs", "modifiers", "a2"]
  },
  {
    id: "error.easy.0009",
    category: "error-identification",
    subcategory: "articles",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "She plans to study",
      "architecture at an European university",
      "after completing her internship",
      "at the local design studio."
    ],
    errorIndex: 1, // s2
    explanation: "'European' begins phonetically with a consonant glide (/j/), so it takes indefinite article 'a', not 'an'.",
    learningObjective: "Recognize phonetic glide consonants requiring article 'a'.",
    grammarRule: "'A' precedes consonant sounds (/j/ in European).",
    tags: ["articles", "phonetics", "a2"]
  },
  {
    id: "error.easy.0010",
    category: "error-identification",
    subcategory: "irregular plurals",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The dental clinic provides",
      "free examinations for childs",
      "from low-income households",
      "every Saturday morning."
    ],
    errorIndex: 1, // s2
    explanation: "The plural of 'child' is irregular 'children', not 'childs'.",
    learningObjective: "Identify irregular plural noun morphology.",
    grammarRule: "Irregular plural: child -> children.",
    tags: ["plurals", "irregular", "a2"]
  },
  {
    id: "error.easy.0011",
    category: "error-identification",
    subcategory: "modals",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "All library patrons",
      "must to return",
      "borrowed reference books",
      "before the end of the term."
    ],
    errorIndex: 1, // s2
    explanation: "Modal auxiliary verbs like 'must' are followed directly by a bare infinitive without 'to' ('must return').",
    learningObjective: "Spot redundant 'to' infinitives following modal auxiliaries.",
    grammarRule: "Modal auxiliary + bare infinitive (no 'to').",
    tags: ["modals", "infinitives", "a2"]
  },
  {
    id: "error.easy.0012",
    category: "error-identification",
    subcategory: "prepositions of time",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The annual shareholder symposium",
      "will take place",
      "in Monday afternoon",
      "at the grand convention center."
    ],
    errorIndex: 2, // s3
    explanation: "Specific days of the week use preposition 'on' ('on Monday afternoon'), not 'in'.",
    learningObjective: "Select prepositions for calendar days.",
    grammarRule: "Use 'on' with days of the week.",
    tags: ["prepositions", "time", "a2"]
  },
  {
    id: "error.easy.0013",
    category: "error-identification",
    subcategory: "possessives",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The pharmaceutical enterprise",
      "announced that it's latest vaccine",
      "had successfully passed clinical trials",
      "in several regional hospitals."
    ],
    errorIndex: 1, // s2
    explanation: "'It's' is a contraction for 'it is'. The possessive determiner modifying 'latest vaccine' must be 'its' without an apostrophe.",
    learningObjective: "Distinguish possessive determiner 'its' from contraction 'it's'.",
    grammarRule: "Possessive determiner 'its' has no apostrophe.",
    tags: ["possessives", "spelling", "a2"]
  },
  {
    id: "error.easy.0014",
    category: "error-identification",
    subcategory: "quantifiers",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "There was very few traffic",
      "on the coastal highway today,",
      "allowing us to arrive",
      "thirty minutes early."
    ],
    errorIndex: 0, // s1
    explanation: "'Traffic' is an uncountable mass noun, requiring quantifier 'little' ('very little traffic') rather than 'few'.",
    learningObjective: "Distinguish 'few' (count plural) from 'little' (mass nouns).",
    grammarRule: "Use 'little' with uncountable nouns.",
    tags: ["quantifiers", "uncountable", "a2"]
  },
  {
    id: "error.easy.0015",
    category: "error-identification",
    subcategory: "comparative structures",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "This digital drafting tablet",
      "is as responsive",
      "than the professional desktop model",
      "we evaluated last month."
    ],
    errorIndex: 2, // s3
    explanation: "Equative comparisons use 'as... as'. It must be 'as responsive as', not 'than'.",
    learningObjective: "Identify correlative equative comparison structures.",
    grammarRule: "Equative structure: as + adjective + as.",
    tags: ["comparisons", "correlative", "a2"]
  },
  {
    id: "error.easy.0016",
    category: "error-identification",
    subcategory: "subject-verb agreement",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "Neither the chief engineer",
      "nor her technical assistants",
      "was aware of the defect",
      "in the turbine cooling pump."
    ],
    errorIndex: 2, // s3
    explanation: "With 'neither... nor', the verb agrees with the closer subject ('her technical assistants', plural), requiring 'were aware' instead of 'was aware'.",
    learningObjective: "Apply proximity agreement with correlative conjunction 'neither... nor'.",
    grammarRule: "Verb agrees with the closer subject in 'neither... nor'.",
    tags: ["agreement", "correlative", "a2"]
  },
  {
    id: "error.easy.0017",
    category: "error-identification",
    subcategory: "question structure",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "Could you please explain me",
      "how to access the secure server",
      "from a remote residential network",
      "during the weekend?"
    ],
    errorIndex: 0, // s1
    explanation: "'Explain' does not take an indirect dative object directly. It must be 'explain to me' or 'explain how to access'.",
    learningObjective: "Identify verb transitivity and prepositional requirements for 'explain'.",
    grammarRule: "'Explain' requires 'to + person': explain to me.",
    tags: ["verb-patterns", "prepositions", "a2"]
  },
  {
    id: "error.easy.0018",
    category: "error-identification",
    subcategory: "reflexives",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The young apprentice baker",
      "taught hisself",
      "how to cultivate sourdough starter",
      "using traditional French methods."
    ],
    errorIndex: 1, // s2
    explanation: "The masculine third-person singular reflexive pronoun is 'himself', not 'hisself'.",
    learningObjective: "Identify standard reflexive pronoun forms.",
    grammarRule: "Standard reflexive form is 'himself'.",
    tags: ["pronouns", "reflexives", "a2"]
  },
  {
    id: "error.easy.0019",
    category: "error-identification",
    subcategory: "past tense irregular",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The corporate spokesperson",
      "speaked to reporters",
      "outside the courtroom",
      "following the settlement hearing."
    ],
    errorIndex: 1, // s2
    explanation: "The past simple of 'speak' is irregular 'spoke', not regular 'speaked'.",
    learningObjective: "Spot regularized errors on common irregular verbs.",
    grammarRule: "Irregular past tense: speak -> spoke.",
    tags: ["tenses", "irregular-verbs", "a2"]
  },
  {
    id: "error.easy.0020",
    category: "error-identification",
    subcategory: "stative verbs",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The antique pocket watch",
      "is belonging to my grandfather,",
      "who received it as a graduation gift",
      "in nineteen fifty-two."
    ],
    errorIndex: 1, // s2
    explanation: "'Belong' is a stative verb of ownership and is not used in progressive aspects ('belongs to', not 'is belonging to').",
    learningObjective: "Recognize incorrect progressive aspect on stative verbs.",
    grammarRule: "Stative verbs take simple aspect.",
    tags: ["stative-verbs", "aspect", "a2"]
  },
  {
    id: "error.easy.0021",
    category: "error-identification",
    subcategory: "conjunctions",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "Although the blizzard was severe,",
      "but the international airport",
      "remained operational",
      "throughout the weekend."
    ],
    errorIndex: 1, // s2
    explanation: "Subordinating conjunction 'Although' already links the clauses; pairing it with coordinating conjunction 'but' creates a redundant double conjunction.",
    learningObjective: "Eliminate redundant coordinating conjunctions in subordinate clauses.",
    grammarRule: "Do not combine 'although' with 'but'.",
    tags: ["conjunctions", "syntax", "a2"]
  },
  {
    id: "error.easy.0022",
    category: "error-identification",
    subcategory: "prepositions after verbs",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The university committee met",
      "to discuss about the tuition increase",
      "proposed by the board of trustees",
      "at the emergency meeting."
    ],
    errorIndex: 1, // s2
    explanation: "'Discuss' is a transitive verb that takes a direct object without preposition 'about' ('to discuss the tuition increase').",
    learningObjective: "Eliminate redundant preposition 'about' after transitive verb 'discuss'.",
    grammarRule: "'Discuss' takes a direct object without 'about'.",
    tags: ["transitive-verbs", "prepositions", "a2"]
  },
  {
    id: "error.easy.0023",
    category: "error-identification",
    subcategory: "word order in questions",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The new resident asked",
      "where is the nearest pharmacy",
      "located in this neighborhood",
      "during the late evening."
    ],
    errorIndex: 1, // s2
    explanation: "In an indirect reported question, declarative word order is required ('where the nearest pharmacy is'), not inverted 'where is the pharmacy'.",
    learningObjective: "Apply declarative word order in indirect questions.",
    grammarRule: "Indirect questions: Wh-word + subject + verb.",
    tags: ["indirect-questions", "word-order", "a2"]
  },
  {
    id: "error.easy.0024",
    category: "error-identification",
    subcategory: "determiners",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The professor assigned",
      "another topics for the essay",
      "after students expressed difficulty",
      "with the initial reading list."
    ],
    errorIndex: 1, // s2
    explanation: "'Another' modifies singular count nouns. For plural nouns ('topics'), use 'other topics' or 'different topics'.",
    learningObjective: "Distinguish 'another' (singular) from 'other' (plural).",
    grammarRule: "'Another' + singular noun; 'other' + plural noun.",
    tags: ["determiners", "number", "a2"]
  },
  {
    id: "error.easy.0025",
    category: "error-identification",
    subcategory: "gerund vs infinitive",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "She enjoys",
      "to listen to classical music",
      "while working on complex architectural blueprints",
      "in her studio."
    ],
    errorIndex: 1, // s2
    explanation: "The verb 'enjoy' requires a gerund complement ('enjoys listening'), not an infinitive with 'to'.",
    learningObjective: "Select gerund complements following verb 'enjoy'.",
    grammarRule: "Enjoy + gerund (-ing).",
    tags: ["gerunds", "verb-complements", "a2"]
  },
  {
    id: "error.easy.0026",
    category: "error-identification",
    subcategory: "irregular comparison",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "Her second draft of the proposal",
      "was much more good",
      "than the preliminary sketch",
      "she submitted last week."
    ],
    errorIndex: 1, // s2
    explanation: "The comparative of 'good' is irregular 'better', not 'more good'.",
    learningObjective: "Identify irregular comparative adjective forms.",
    grammarRule: "Comparative of good is better.",
    tags: ["comparatives", "irregular", "a2"]
  },
  {
    id: "error.easy.0027",
    category: "error-identification",
    subcategory: "prepositions of duration",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The visiting research fellow",
      "has lived in Edinburgh",
      "since five months",
      "conducting historical archival studies."
    ],
    errorIndex: 2, // s3
    explanation: "For a duration of time ('five months'), use 'for' rather than 'since'. 'Since' is reserved for specific starting points.",
    learningObjective: "Distinguish preposition 'for' (duration) from 'since' (origin point).",
    grammarRule: "'For' + time duration; 'since' + time point.",
    tags: ["prepositions", "present-perfect", "a2"]
  },
  {
    id: "error.easy.0028",
    category: "error-identification",
    subcategory: "subject-verb agreement",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "One of the most experienced pilots",
      "have retired from commercial service",
      "after completing thirty-five years",
      "with the airline."
    ],
    errorIndex: 1, // s2
    explanation: "The subject head is singular ('One'), so the auxiliary must be singular 'has retired', not plural 'have retired'.",
    learningObjective: "Apply singular agreement with subject phrase 'One of the [plural]'.",
    grammarRule: "'One of + plural noun' takes singular verb.",
    tags: ["agreement", "syntax", "a2"]
  },
  {
    id: "error.easy.0029",
    category: "error-identification",
    subcategory: "make vs do",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The engineering students must",
      "make their homework",
      "before attending the laboratory workshop",
      "on Friday afternoon."
    ],
    errorIndex: 1, // s2
    explanation: "The established English collocation is 'do homework', not 'make homework'.",
    learningObjective: "Distinguish collocations with 'do' vs 'make'.",
    grammarRule: "Collocation: do homework.",
    tags: ["collocations", "do-vs-make", "a2"]
  },
  {
    id: "error.easy.0030",
    category: "error-identification",
    subcategory: "adverbs of frequency",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "Marcus arrives always late",
      "for morning staff stand-up calls,",
      "causing frustration",
      "among his teammates."
    ],
    errorIndex: 0, // s1
    explanation: "Adverbs of frequency like 'always' are placed before the main lexical verb ('always arrives late').",
    learningObjective: "Apply standard word order for adverbs of frequency.",
    grammarRule: "Frequency adverbs precede lexical verbs.",
    tags: ["word-order", "adverbs", "a2"]
  },
  {
    id: "error.easy.0031",
    category: "error-identification",
    subcategory: "too vs very",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The ocean water was very cold",
      "for the children to swim in,",
      "so they built sandcastles",
      "along the shore instead."
    ],
    errorIndex: 0, // s1
    explanation: "When combined with 'for [someone] to [infinitive]' to express negative excessive degree, use 'too' ('too cold for the children to swim in'), not 'very'.",
    learningObjective: "Distinguish degree adverb 'too' from 'very' with to-infinitive consequences.",
    grammarRule: "'Too + adj + to-verb' denotes negative excess.",
    tags: ["adverbs", "degree", "a2"]
  },
  {
    id: "error.easy.0032",
    category: "error-identification",
    subcategory: "prepositions after adjectives",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The software architect is responsible",
      "to designing the backend database architecture",
      "for the new financial platform",
      "launching next quarter."
    ],
    errorIndex: 1, // s2
    explanation: "The adjective 'responsible' takes preposition 'for' ('responsible for designing'), not 'to'.",
    learningObjective: "Identify dependent prepositions after adjective 'responsible'.",
    grammarRule: "Responsible for + noun/gerund.",
    tags: ["dependent-prepositions", "collocations", "a2"]
  },
  {
    id: "error.easy.0033",
    category: "error-identification",
    subcategory: "quantifiers",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "How much passengers",
      "were aboard the regional commuter train",
      "when the emergency brakes engaged",
      "outside the station?"
    ],
    errorIndex: 0, // s1
    explanation: "'Passengers' is a countable plural noun; it requires quantifier 'How many' rather than 'How much'.",
    learningObjective: "Apply quantifiers for countable plurals.",
    grammarRule: "Use 'how many' with countable nouns.",
    tags: ["quantifiers", "questions", "a2"]
  },
  {
    id: "error.easy.0034",
    category: "error-identification",
    subcategory: "pronouns",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The client requested that",
      "we send the contract to he and his attorney",
      "via certified courier mail",
      "by the close of business."
    ],
    errorIndex: 1, // s2
    explanation: "Preposition 'to' requires objective case pronoun 'him' ('to him and his attorney'), not nominative 'he'.",
    learningObjective: "Use objective case pronouns following prepositions.",
    grammarRule: "Prepositions govern objective case pronouns.",
    tags: ["pronouns", "case", "a2"]
  },
  {
    id: "error.easy.0035",
    category: "error-identification",
    subcategory: "irregular plurals",
    difficulty: "easy",
    cefr: "A2",
    segments: [
      "The pod of dolphins",
      "swam gracefully near the boat,",
      "leaping several foots into the air",
      "above the ocean waves."
    ],
    errorIndex: 2, // s3
    explanation: "The plural of 'foot' is irregular 'feet', not 'foots'.",
    learningObjective: "Identify irregular plural noun forms for physical measurements.",
    grammarRule: "Irregular plural: foot -> feet.",
    tags: ["plurals", "irregular", "a2"]
  },

  // ===================== MEDIUM (B1 - B2) - 50 Questions =====================
  {
    id: "error.medium.0001",
    category: "error-identification",
    subcategory: "parallelism",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The management consultant spent the week",
      "interviewing regional stakeholders,",
      "analyzing balance sheets, and",
      "to draft the executive recommendation."
    ],
    errorIndex: 3, // s4
    explanation: "Items in a coordinate series must share identical grammatical form. To match 'interviewing' and 'analyzing', segment s4 must be 'drafting the executive recommendation' rather than infinitive 'to draft'.",
    learningObjective: "Identify faulty parallelism in compound series.",
    grammarRule: "Parallel coordinate series must share grammatical form.",
    tags: ["parallelism", "syntax", "b2"]
  },
  {
    id: "error.medium.0002",
    category: "error-identification",
    subcategory: "prepositional doubling",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Despite of the fierce blizzard",
      "sweeping across the northern plains,",
      "the freight trains continued running",
      "according to schedule."
    ],
    errorIndex: 0, // s1
    explanation: "'Despite' is a preposition that takes a direct noun object without 'of'. Use 'Despite the blizzard' or 'In spite of the blizzard'.",
    learningObjective: "Eliminate erroneous prepositional doubling with 'despite of'.",
    grammarRule: "Use 'despite + noun' or 'in spite of + noun'.",
    tags: ["prepositions", "concession", "b2"]
  },
  {
    id: "error.medium.0003",
    category: "error-identification",
    subcategory: "dangling modifiers",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Walking into the research laboratory,",
      "the computer network crashed suddenly,",
      "erasing several hours",
      "of unsaved simulation data."
    ],
    errorIndex: 1, // s2
    explanation: "The introductory participle 'Walking into the laboratory' dangles because the subject 'the computer network' cannot physically walk. The sentence must be recast with a human subject.",
    learningObjective: "Spot dangling participial modifiers.",
    grammarRule: "Participial phrases must logically modify the main clause subject.",
    tags: ["dangling-modifiers", "participles", "b2"]
  },
  {
    id: "error.medium.0004",
    category: "error-identification",
    subcategory: "conditional tense sequence",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "If the executive board",
      "would have reviewed the safety audit earlier,",
      "the factory shutdown",
      "could easily have been avoided."
    ],
    errorIndex: 1, // s2
    explanation: "In standard English third conditional clauses, the 'if'-clause takes the past perfect ('had reviewed'), never 'would have'.",
    learningObjective: "Eliminate 'would have' from conditional 'if'-clauses.",
    grammarRule: "Third conditional: If + past perfect (had + V3), would have + V3.",
    tags: ["conditionals", "tenses", "b2"]
  },
  {
    id: "error.medium.0005",
    category: "error-identification",
    subcategory: "dependent prepositions",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "All medical laboratory staff",
      "must strictly comply to",
      "the biological containment protocols",
      "established by health regulators."
    ],
    errorIndex: 1, // s2
    explanation: "The verb 'comply' takes dependent preposition 'with', not 'to' ('comply with protocols').",
    learningObjective: "Identify exact dependent prepositions following regulatory verbs.",
    grammarRule: "Comply with + noun.",
    tags: ["dependent-prepositions", "collocations", "b2"]
  },
  {
    id: "error.medium.0006",
    category: "error-identification",
    subcategory: "quantifier with count plural",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "There were significantly less applicants",
      "for the engineering fellowship this term",
      "compared to the overwhelming numbers",
      "recorded in previous years."
    ],
    errorIndex: 0, // s1
    explanation: "'Applicants' is a countable plural noun, requiring quantifier 'fewer' rather than 'less' ('fewer applicants').",
    learningObjective: "Distinguish 'fewer' (countable) from 'less' (mass nouns).",
    grammarRule: "Use 'fewer' with countable plural nouns.",
    tags: ["quantifiers", "countability", "b2"]
  },
  {
    id: "error.medium.0007",
    category: "error-identification",
    subcategory: "comparative redundancy",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The new algorithm processes transactions",
      "much more faster than",
      "the legacy database engine",
      "currently deployed in the datacenter."
    ],
    errorIndex: 1, // s2
    explanation: "'Faster' is already comparative; 'more faster' is a grammatically redundant double comparative.",
    learningObjective: "Eliminate redundant comparative modifiers.",
    grammarRule: "Avoid 'more' before -er comparative adjectives.",
    tags: ["comparatives", "modifiers", "b2"]
  },
  {
    id: "error.medium.0008",
    category: "error-identification",
    subcategory: "verb complements",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The corporate legal team",
      "refused endorsing the severance pact",
      "until independent forensic auditors",
      "completed their inquiry."
    ],
    errorIndex: 1, // s2
    explanation: "The verb 'refuse' requires a to-infinitive complement ('refused to endorse'), not a gerund.",
    learningObjective: "Select to-infinitive complements following verb 'refuse'.",
    grammarRule: "Refuse + to-infinitive.",
    tags: ["infinitives", "verb-patterns", "b2"]
  },
  {
    id: "error.medium.0009",
    category: "error-identification",
    subcategory: "subject-verb agreement",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The collection of antique Roman coins,",
      "including several rare gold denarii,",
      "were auctioned off to private collectors",
      "at Sotheby's yesterday."
    ],
    errorIndex: 2, // s3
    explanation: "The subject head is singular ('The collection'); modifying parenthetical phrases ('including...') do not affect agreement, so the verb must be singular 'was auctioned'.",
    learningObjective: "Maintain singular agreement across parenthetical modifying phrases.",
    grammarRule: "Parenthetical prepositional phrases do not change subject number.",
    tags: ["agreement", "syntax", "b2"]
  },
  {
    id: "error.medium.0010",
    category: "error-identification",
    subcategory: "adjective vs adverb",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The newly appointed foreign minister",
      "handled the sensitive diplomatic impasse",
      "exceptional well during the bilateral summit",
      "in Geneva last week."
    ],
    errorIndex: 2, // s3
    explanation: "The adverb 'well' must be modified by another adverb ('exceptionally well'), not the adjective 'exceptional'.",
    learningObjective: "Modify adverbs with adverbial forms ending in -ly.",
    grammarRule: "Adverbs modify other adverbs.",
    tags: ["adverbs", "modifiers", "b2"]
  },
  {
    id: "error.medium.0011",
    category: "error-identification",
    subcategory: "relative clause punctuation",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The company's primary server,",
      "that was installed three years ago,",
      "experienced an unexpected hardware breakdown",
      "during the database migration."
    ],
    errorIndex: 1, // s2
    explanation: "Non-defining relative clauses set off by commas must use 'which' rather than 'that' for inanimate antecedents.",
    learningObjective: "Distinguish 'which' from 'that' in non-restrictive relative clauses.",
    grammarRule: "Non-defining relative clauses use 'which', not 'that'.",
    tags: ["relative-clauses", "pronouns", "b2"]
  },
  {
    id: "error.medium.0012",
    category: "error-identification",
    subcategory: "prepositions after adjectives",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The senior biochemist is accustomed",
      "with working long overnight hours",
      "in the temperature-controlled cleanroom",
      "during active clinical trials."
    ],
    errorIndex: 1, // s2
    explanation: "The idiom is 'accustomed to + gerund/noun', not 'accustomed with'.",
    learningObjective: "Identify correct dependent preposition after 'accustomed'.",
    grammarRule: "Accustomed to + gerund.",
    tags: ["dependent-prepositions", "collocations", "b2"]
  },
  {
    id: "error.medium.0013",
    category: "error-identification",
    subcategory: "elliptical comparisons",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The chief executive officer",
      "earns significantly more compensation",
      "than any employee",
      "in the entire conglomerate."
    ],
    errorIndex: 2, // s3
    explanation: "When comparing an individual to a group they belong to, 'any other' must be used ('than any other employee') to prevent illogical self-comparison.",
    learningObjective: "Avoid illogical comparative self-inclusion using 'any other'.",
    grammarRule: "Use 'any other' when comparing within the same class.",
    tags: ["comparisons", "logic", "b2"]
  },
  {
    id: "error.medium.0014",
    category: "error-identification",
    subcategory: "gerund with possessive",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The compliance committee objected to",
      "the accountant disclosing confidential client records",
      "to the external press syndicate",
      "without executive authorization."
    ],
    errorIndex: 1, // s2
    explanation: "In formal prescriptive register, the subject of a gerund takes the possessive case ('the accountant's disclosing').",
    learningObjective: "Apply possessive case before gerunds in formal writing.",
    grammarRule: "Gerunds take possessive subject determiners.",
    tags: ["gerunds", "case", "b2"]
  },
  {
    id: "error.medium.0015",
    category: "error-identification",
    subcategory: "verb complements",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The defense attorney suggested",
      "her client to remain completely silent",
      "during the police interrogation",
      "yesterday afternoon."
    ],
    errorIndex: 1, // s2
    explanation: "'Suggest' cannot be followed by an object + to-infinitive. It must take a gerund or a 'that'-clause ('suggested that her client remain silent').",
    learningObjective: "Correct verb complement structures following 'suggest'.",
    grammarRule: "Suggest + that-clause / gerund (never suggest + object + to-inf).",
    tags: ["verb-patterns", "complements", "b2"]
  },
  {
    id: "error.medium.0016",
    category: "error-identification",
    subcategory: "correlative conjunctions",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The new public transit initiative",
      "will not only reduce carbon emissions",
      "as well as alleviate downtown traffic congestion",
      "during rush hours."
    ],
    errorIndex: 2, // s3
    explanation: "'Not only' must correlate with 'but also' ('but will also alleviate'), not 'as well as'.",
    learningObjective: "Pair correlative conjunction 'not only' with 'but also'.",
    grammarRule: "Correlative pair: not only... but also.",
    tags: ["correlative", "conjunctions", "b2"]
  },
  {
    id: "error.medium.0017",
    category: "error-identification",
    subcategory: "past perfect sequence",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "By the time the fire brigade",
      "had arrived at the scene,",
      "the warehouse was already fully engulfed",
      "in intense flames."
    ],
    errorIndex: 1, // s2
    explanation: "In 'by the time' clauses, the time anchor is in the past simple ('arrived'), while the earlier completed action takes past perfect.",
    learningObjective: "Apply correct tense sequence in 'by the time' clauses.",
    grammarRule: "By the time + past simple, past perfect.",
    tags: ["tenses", "past-perfect", "b2"]
  },
  {
    id: "error.medium.0018",
    category: "error-identification",
    subcategory: "passive voice",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The ancient sandstone temple",
      "was been restored by archaeologists",
      "using traditional masonry methods",
      "over a five-year period."
    ],
    errorIndex: 1, // s2
    explanation: "'Was been' is an impossible verbal combination. The past passive is 'was restored' or past perfect passive 'had been restored'.",
    learningObjective: "Eliminate ungrammatical passive auxiliary combinations.",
    grammarRule: "Passive voice: be + past participle (was restored).",
    tags: ["passive", "auxiliary", "b2"]
  },
  {
    id: "error.medium.0019",
    category: "error-identification",
    subcategory: "dependent prepositions",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The defense minister insisted",
      "in reviewing the classified intelligence report",
      "before authorizing the deployment",
      "of naval surveillance vessels."
    ],
    errorIndex: 1, // s2
    explanation: "'Insist' takes the preposition 'on' (or 'upon'), not 'in' ('insisted on reviewing').",
    learningObjective: "Identify dependent preposition 'on' following 'insist'.",
    grammarRule: "Insist on + gerund/noun.",
    tags: ["dependent-prepositions", "collocations", "b2"]
  },
  {
    id: "error.medium.0020",
    category: "error-identification",
    subcategory: "faulty comparison",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The salary of a software engineer",
      "is considerably higher",
      "than a high school teacher",
      "in major metropolitan cities."
    ],
    errorIndex: 2, // s3
    explanation: "Illogical comparison: comparing a salary to a person. It must compare salary to salary ('than that of a high school teacher').",
    learningObjective: "Correct faulty comparisons of unequal grammatical entities.",
    grammarRule: "Use demonstrative pronoun 'that of' to balance comparisons.",
    tags: ["comparisons", "parallelism", "b2"]
  },
  {
    id: "error.medium.0021",
    category: "error-identification",
    subcategory: "modal deduction",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The vault was locked securely from inside;",
      "the intruder can have escaped",
      "through the subterranean storm drain",
      "during the thunderstorm."
    ],
    errorIndex: 1, // s2
    explanation: "Past logical possibility requires 'could have' or 'must have'; 'can have' is ungrammatical for past deduction in affirmative clauses.",
    learningObjective: "Distinguish past modal deduction auxiliaries.",
    grammarRule: "Use 'could have / must have', not 'can have'.",
    tags: ["modals", "deduction", "b2"]
  },
  {
    id: "error.medium.0022",
    category: "error-identification",
    subcategory: "pronoun agreement",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Each of the participating universities",
      "must submit their official financial ledger",
      "to the provincial accreditation committee",
      "by the designated deadline."
    ],
    errorIndex: 1, // s2
    explanation: "In formal prescriptive grammar, singular distributive subject 'Each' requires a singular possessive ('its official ledger') rather than plural 'their'.",
    learningObjective: "Apply singular pronoun agreement with distributive subject 'Each'.",
    grammarRule: "'Each' takes singular pronoun reference in formal register.",
    tags: ["pronouns", "agreement", "b2"]
  },
  {
    id: "error.medium.0023",
    category: "error-identification",
    subcategory: "time clauses",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "As soon as the executive delegation",
      "will arrive at the airport terminal,",
      "the security team will escort them",
      "directly to the embassy."
    ],
    errorIndex: 1, // s2
    explanation: "In subordinate future time clauses introduced by 'as soon as', use the present simple ('arrives'), not future modal 'will arrive'.",
    learningObjective: "Eliminate future modal 'will' from subordinate time clauses.",
    grammarRule: "Subordinate time clauses take present tense for future events.",
    tags: ["time-clauses", "tenses", "b2"]
  },
  {
    id: "error.medium.0024",
    category: "error-identification",
    subcategory: "word form",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The economic analyst warned that",
      "hyperinflation could result in",
      "the completely destroying of the currency",
      "within several fiscal quarters."
    ],
    errorIndex: 2, // s3
    explanation: "'Completely destroying of' mixes a gerund with an article and preposition. It should be a true noun with adjective ('the complete destruction of') or a bare gerund ('completely destroying the currency').",
    learningObjective: "Differentiate verbal gerunds from deverbal abstract nouns.",
    tags: ["word-formation", "nouns", "b2"]
  },
  {
    id: "error.medium.0025",
    category: "error-identification",
    subcategory: "linking verbs",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The fresh bakery pastries",
      "smelled delightfully and sweet",
      "as we walked past the shop",
      "on Sunday morning."
    ],
    errorIndex: 1, // s2
    explanation: "Sensory linking verbs like 'smell' take predicate adjectives ('smelled delightful and sweet'), not adverbs ending in -ly.",
    learningObjective: "Select predicate adjectives following sensory linking verbs.",
    grammarRule: "Sensory linking verbs take predicate adjectives.",
    tags: ["linking-verbs", "adjectives", "b2"]
  },
  {
    id: "error.medium.0026",
    category: "error-identification",
    subcategory: "participial phrases",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Having exhausted all legal appeals,",
      "the corporate settlement was signed",
      "by the chief executive officer",
      "late yesterday afternoon."
    ],
    errorIndex: 1, // s2
    explanation: "Dangling participle: 'the corporate settlement' did not exhaust all legal appeals; the sentence must have the CEO or litigant as the subject.",
    learningObjective: "Eliminate dangling participial phrases in passive clauses.",
    grammarRule: "Introductory participle must modify main clause subject.",
    tags: ["dangling-modifiers", "participles", "b2"]
  },
  {
    id: "error.medium.0027",
    category: "error-identification",
    subcategory: "confusable prepositions",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The profits from the charity auction",
      "were divided equally between",
      "the four regional children's hospitals",
      "after deducting event overhead."
    ],
    errorIndex: 1, // s2
    explanation: "When dividing among more than two entities (four hospitals), use 'among' rather than 'between'.",
    learningObjective: "Distinguish 'between' (two) from 'among' (three or more).",
    grammarRule: "'Among' applies to three or more distinct recipients.",
    tags: ["prepositions", "usage", "b2"]
  },
  {
    id: "error.medium.0028",
    category: "error-identification",
    subcategory: "split infinitives with negation",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The presiding judge instructed the jury",
      "to not discuss the trial evidence",
      "with family members or journalists",
      "until deliberations begin."
    ],
    errorIndex: 1, // s2
    explanation: "In formal prescriptive English, negative infinitives place 'not' before the infinitive particle 'to' ('not to discuss').",
    learningObjective: "Position negative particle 'not' before to-infinitives in formal style.",
    grammarRule: "Negative infinitive: 'not to + verb'.",
    tags: ["infinitives", "negation", "b2"]
  },
  {
    id: "error.medium.0029",
    category: "error-identification",
    subcategory: "subject-verb agreement",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Physics, along with mathematics and chemistry,",
      "are considered a foundational discipline",
      "for all aerospace engineering degrees",
      "at the institute."
    ],
    errorIndex: 1, // s2
    explanation: "Parenthetical phrases introduced by 'along with' do not compound the subject. The singular academic subject 'Physics' requires singular copula 'is considered'.",
    learningObjective: "Maintain singular agreement with nouns of academic study.",
    grammarRule: "'Along with' does not compound subjects; singular subject takes singular verb.",
    tags: ["agreement", "academic-nouns", "b2"]
  },
  {
    id: "error.medium.0030",
    category: "error-identification",
    subcategory: "verbs of prevention",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The heavy snowfall prevented the aircraft",
      "to take off on schedule",
      "from the mountainous alpine runway",
      "this morning."
    ],
    errorIndex: 1, // s2
    explanation: "'Prevent' takes the prepositional pattern 'prevent [object] from [gerund]' ('prevented the aircraft from taking off'), not a to-infinitive.",
    learningObjective: "Identify correct prepositional complement after 'prevent'.",
    grammarRule: "Prevent + object + from + gerund (-ing).",
    tags: ["verb-patterns", "prepositions", "b2"]
  },
  {
    id: "error.medium.0031",
    category: "error-identification",
    subcategory: "causative verbs",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The chief operations officer",
      "had the IT technicians to upgrade",
      "the central database firewalls",
      "over the holiday weekend."
    ],
    errorIndex: 1, // s2
    explanation: "Active causative 'have' takes a bare infinitive without 'to' ('had the IT technicians upgrade').",
    learningObjective: "Apply bare infinitive following causative verb 'have'.",
    grammarRule: "Have + person + bare infinitive.",
    tags: ["causative", "bare-infinitive", "b2"]
  },
  {
    id: "error.medium.0032",
    category: "error-identification",
    subcategory: "adverbial placement",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The research team has published recently",
      "a groundbreaking empirical study",
      "on quantum neural networks",
      "in an international journal."
    ],
    errorIndex: 0, // s1
    explanation: "Adverbs of time/manner should not separate a transitive verb from its direct object ('has recently published a study' or 'published a study recently').",
    learningObjective: "Avoid splitting transitive verbs from direct objects with adverbs.",
    grammarRule: "Do not place adverbs between verb and direct object.",
    tags: ["adverbs", "word-order", "b2"]
  },
  {
    id: "error.medium.0033",
    category: "error-identification",
    subcategory: "concession conjunctions",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "In spite the team worked tirelessly",
      "throughout the final sprint weekend,",
      "they were unable to eliminate all software bugs",
      "prior to release."
    ],
    errorIndex: 0, // s1
    explanation: "'In spite' must be followed by 'of' ('In spite of the fact that...') or replaced with subordinating conjunction 'Although the team worked'.",
    learningObjective: "Differentiate prepositional phrase 'in spite of' from conjunction 'although'.",
    grammarRule: "Use 'In spite of' + noun or 'Although' + clause.",
    tags: ["conjunctions", "concession", "b2"]
  },
  {
    id: "error.medium.0034",
    category: "error-identification",
    subcategory: "double negatives",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The forensic auditors could not find",
      "scarcely any documentation",
      "supporting the offshore transactions",
      "in the archived corporate ledgers."
    ],
    errorIndex: 1, // s2
    explanation: "'Scarcely' already has negative force. Pairing 'could not' with 'scarcely' creates an ungrammatical double negative ('could scarcely find any').",
    learningObjective: "Eliminate double negatives with restrictive adverbs.",
    grammarRule: "Do not combine negative auxiliaries with 'scarcely'.",
    tags: ["double-negatives", "syntax", "b2"]
  },
  {
    id: "error.medium.0035",
    category: "error-identification",
    subcategory: "number agreement",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "A large number of defective semiconductors",
      "was discovered during quality testing",
      "at the domestic fabrication plant",
      "yesterday."
    ],
    errorIndex: 1, // s2
    explanation: "'A number of + plural noun' takes plural agreement ('were discovered'). In contrast, 'The number of' takes singular agreement.",
    learningObjective: "Distinguish agreement for 'a number of' (plural) from 'the number of' (singular).",
    grammarRule: "'A number of' takes plural verb agreement.",
    tags: ["agreement", "quantifiers", "b2"]
  },
  {
    id: "error.medium.0036",
    category: "error-identification",
    subcategory: "dependent prepositions",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The newly appointed director",
      "is entirely capable to lead",
      "the complex corporate restructuring",
      "over the coming fiscal year."
    ],
    errorIndex: 1, // s2
    explanation: "The adjective 'capable' takes preposition 'of' followed by a gerund ('capable of leading'), not a to-infinitive.",
    learningObjective: "Identify dependent preposition 'of' following adjective 'capable'.",
    grammarRule: "Capable of + gerund (-ing).",
    tags: ["dependent-prepositions", "collocations", "b2"]
  },
  {
    id: "error.medium.0037",
    category: "error-identification",
    subcategory: "comparative structures",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The European branch office is",
      "three times larger then",
      "the original regional headquarters",
      "built thirty years ago."
    ],
    errorIndex: 1, // s2
    explanation: "Comparatives require conjunction 'than', not temporal adverb 'then' ('larger than').",
    learningObjective: "Distinguish comparative 'than' from temporal 'then'.",
    grammarRule: "Comparatives require 'than'.",
    tags: ["comparatives", "homophones", "b2"]
  },
  {
    id: "error.medium.0038",
    category: "error-identification",
    subcategory: "verb complementation",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The security manual forbids employees",
      "from plug unauthorized USB drives",
      "into classified government workstations",
      "at any time."
    ],
    errorIndex: 1, // s2
    explanation: "Prepositions like 'from' must be followed by a gerund ('from plugging'), not a bare base verb.",
    learningObjective: "Use gerunds following prepositional complements.",
    grammarRule: "Preposition + gerund (-ing).",
    tags: ["gerunds", "prepositions", "b2"]
  },
  {
    id: "error.medium.0039",
    category: "error-identification",
    subcategory: "subject-verb agreement",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Ten thousand dollars",
      "are an exorbitant price to pay",
      "for a single round-trip ticket",
      "to that remote island."
    ],
    errorIndex: 1, // s2
    explanation: "Expressions of monetary amounts, time durations, or physical distances functioning as a single collective unit take singular verbs ('Ten thousand dollars is').",
    learningObjective: "Apply singular agreement to monetary sums functioning as single units.",
    grammarRule: "Monetary sums take singular verb agreement.",
    tags: ["agreement", "nouns", "b2"]
  },
  {
    id: "error.medium.0040",
    category: "error-identification",
    subcategory: "parallelism in lists",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The corporate wellness program encourages",
      "eating a balanced diet,",
      "exercising on a regular basis, and",
      "to get adequate nighttime sleep."
    ],
    errorIndex: 3, // s4
    explanation: "To match parallel gerunds 'eating' and 'exercising', the final item must be gerund 'getting adequate nighttime sleep'.",
    learningObjective: "Maintain parallel grammatical structure across gerund series.",
    grammarRule: "Coordinate series requires identical parts of speech.",
    tags: ["parallelism", "gerunds", "b2"]
  },
  {
    id: "error.medium.0041",
    category: "error-identification",
    subcategory: "conditional mixed",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "If the emergency power generator",
      "had worked properly yesterday,",
      "the factory workers would not have been",
      "send home early yesterday."
    ],
    errorIndex: 3, // s4
    explanation: "Passive past participle required: 'would not have been sent home', not base verb 'send'.",
    learningObjective: "Identify past participle forms in passive conditionals.",
    grammarRule: "Passive conditional: would have been + past participle (sent).",
    tags: ["conditionals", "passive", "b2"]
  },
  {
    id: "error.medium.0042",
    category: "error-identification",
    subcategory: "prepositions after verbs",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The maritime safety committee investigated",
      "into the causes of the collision",
      "between the oil tanker and the reef",
      "last Tuesday."
    ],
    errorIndex: 1, // s2
    explanation: "'Investigate' is a transitive verb taking a direct object without preposition 'into' ('investigated the causes').",
    learningObjective: "Eliminate redundant preposition 'into' following 'investigate'.",
    grammarRule: "'Investigate' takes direct object without 'into'.",
    tags: ["transitive-verbs", "prepositions", "b2"]
  },
  {
    id: "error.medium.0043",
    category: "error-identification",
    subcategory: "pronoun case",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Whom wrote the anonymous critique",
      "regarding the department's fiscal mismanagement",
      "remains an unanswered mystery",
      "to the executive board."
    ],
    errorIndex: 0, // s1
    explanation: "The pronoun functions as the grammatical subject of the clause 'wrote the critique', requiring nominative 'Who', not objective 'Whom'.",
    learningObjective: "Distinguish subject pronoun 'Who' from object pronoun 'Whom'.",
    grammarRule: "Use 'who' as grammatical subject.",
    tags: ["pronouns", "case", "b2"]
  },
  {
    id: "error.medium.0044",
    category: "error-identification",
    subcategory: "dependent prepositions",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The young software developer",
      "is exceptionally adept in",
      "identifying algorithmic anomalies",
      "in high-frequency data streams."
    ],
    errorIndex: 1, // s2
    explanation: "The standard English collocation is 'adept at + gerund', not 'adept in'.",
    learningObjective: "Identify exact dependent preposition after adjective 'adept'.",
    grammarRule: "Adept at + gerund/noun.",
    tags: ["dependent-prepositions", "collocations", "b2"]
  },
  {
    id: "error.medium.0045",
    category: "error-identification",
    subcategory: "subject-verb agreement",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Neither of the two proposed solutions",
      "are financially viable",
      "under current economic constraints",
      "reported by the fiscal committee."
    ],
    errorIndex: 1, // s2
    explanation: "Distributive pronoun 'Neither' is grammatically singular and takes singular verb 'is financially viable'.",
    learningObjective: "Apply singular agreement with distributive pronoun 'Neither'.",
    grammarRule: "'Neither' takes singular verb agreement in formal English.",
    tags: ["agreement", "pronouns", "b2"]
  },
  {
    id: "error.medium.0046",
    category: "error-identification",
    subcategory: "quantifiers",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The expedition members carried",
      "too many luggages",
      "across the rugged mountain pass,",
      "exhausting their pack animals."
    ],
    errorIndex: 1, // s2
    explanation: "'Luggage' is an uncountable mass noun; it cannot take plural '-s' or quantifier 'many'. It should be 'too much luggage'.",
    learningObjective: "Identify uncountable mass noun quantifier errors.",
    grammarRule: "'Luggage' is uncountable; use 'much luggage' or 'pieces of luggage'.",
    tags: ["uncountable-nouns", "quantifiers", "b2"]
  },
  {
    id: "error.medium.0047",
    category: "error-identification",
    subcategory: "verb complementation",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The factory regulations mandate",
      "workers to wear protective earplugs",
      "in all high-decibel stamping areas",
      "throughout their shifts."
    ],
    errorIndex: 1, // s2
    explanation: "'Mandate' does not take an object + to-infinitive in standard formal English; it requires a 'that'-clause with subjunctive ('mandate that workers wear').",
    learningObjective: "Apply correct mandative complement structures.",
    grammarRule: "Mandate that + subject + base verb.",
    tags: ["verb-patterns", "subjunctive", "b2"]
  },
  {
    id: "error.medium.0048",
    category: "error-identification",
    subcategory: "time preposition",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "The historic peace accord was signed",
      "on the summer of nineteen ninety-five",
      "following months of intensive mediation",
      "by international diplomats."
    ],
    errorIndex: 1, // s2
    explanation: "Seasons of the year require preposition 'in' ('in the summer of 1995'), not 'on'.",
    learningObjective: "Select correct prepositions for annual seasons.",
    grammarRule: "Use 'in' with seasons, months, and years.",
    tags: ["prepositions", "time", "b2"]
  },
  {
    id: "error.medium.0049",
    category: "error-identification",
    subcategory: "adverbs vs adjectives",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Although he practiced diligent",
      "for several consecutive months,",
      "he was unable to master the complex violin concerto",
      "before the recital."
    ],
    errorIndex: 0, // s1
    explanation: "The verb 'practiced' must be modified by an adverb of manner ('diligently'), not an adjective ('diligent').",
    learningObjective: "Modify verbs of effort with manner adverbs ending in -ly.",
    grammarRule: "Action verbs take manner adverbs.",
    tags: ["adverbs", "modifiers", "b2"]
  },
  {
    id: "error.medium.0050",
    category: "error-identification",
    subcategory: "inversion error",
    difficulty: "medium",
    cefr: "B2",
    segments: [
      "Hardly had the meeting started",
      "than the emergency sirens wailed",
      "across the entire administrative complex,",
      "forcing an immediate evacuation."
    ],
    errorIndex: 1, // s2
    explanation: "'Hardly had + S + V3' correlates with 'when', not 'than'. 'Than' is exclusively used with 'No sooner'.",
    learningObjective: "Differentiate correlative pairs 'hardly... when' from 'no sooner... than'.",
    grammarRule: "Hardly... when (not than).",
    tags: ["inversion", "correlative", "b2"]
  },

  // ===================== HARD (C1 - C2) - 35 Questions =====================
  {
    id: "error.hard.0001",
    category: "error-identification",
    subcategory: "subjunctive mandative",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The supervisory board recommended",
      "that the chief executive steps down",
      "pending the outcome of the independent inquiry",
      "into corporate embezzlement."
    ],
    errorIndex: 1, // s2
    explanation: "Mandative subjunctive following verbs of recommendation requires the uninflected base verb ('step down'), not third-person singular indicative 'steps down'.",
    learningObjective: "Identify mandative subjunctive base verb requirements.",
    grammarRule: "Recommend that + subject + base verb.",
    tags: ["subjunctive", "mandative", "c1"]
  },
  {
    id: "error.hard.0002",
    category: "error-identification",
    subcategory: "negative inversion",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "Under no circumstances",
      "confidential patent blueprints should be shared",
      "with external third-party contractors",
      "without prior legal authorization."
    ],
    errorIndex: 1, // s2
    explanation: "Initial negative/restrictive prepositional phrase 'Under no circumstances' triggers subject-modal inversion ('should confidential patent blueprints be shared').",
    learningObjective: "Invert subject and modal following restrictive fronted prepositional phrases.",
    grammarRule: "Under no circumstances + modal + subject + verb.",
    tags: ["inversion", "negative", "c1"]
  },
  {
    id: "error.hard.0003",
    category: "error-identification",
    subcategory: "collocation error",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The defense attorney took exception",
      "at the prosecutor's insinuations",
      "regarding the witness's credibility",
      "during cross-examination."
    ],
    errorIndex: 1, // s2
    explanation: "The idiom 'take exception' takes preposition 'to' ('took exception to the insinuations'), not 'at'.",
    learningObjective: "Identify precise idiomatic prepositions in formal legal idioms.",
    grammarRule: "Take exception to + noun.",
    tags: ["idioms", "prepositions", "c1"]
  },
  {
    id: "error.hard.0004",
    category: "error-identification",
    subcategory: "faulty parallel correlative",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The diplomat not only succeeded in",
      "de-escalating the border skirmish,",
      "but also a permanent trade treaty was brokered",
      "by her delegation."
    ],
    errorIndex: 2, // s3
    explanation: "Correlative coordination requires matching parallel syntax. Active verb phrase 'succeeded in de-escalating' does not match the shifted passive clause 'but also a permanent trade treaty was brokered'.",
    learningObjective: "Ensure parallel syntactic alignment across correlative conjunctions.",
    grammarRule: "Not only + VP... but also + VP.",
    tags: ["parallelism", "correlative", "c1"]
  },
  {
    id: "error.hard.0005",
    category: "error-identification",
    subcategory: "case in elliptical comparisons",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "The lead appellate judge is more knowledgeable",
      "in maritime admiralty law",
      "than him,",
      "owing to forty years of courtroom experience."
    ],
    errorIndex: 2, // s3
    explanation: "In formal prescriptive grammar, the elliptical comparison represents a subject clause ('than he is'). Nominative case 'he' is required rather than objective 'him'.",
    learningObjective: "Apply nominative pronoun case in formal elliptical comparisons.",
    grammarRule: "Elliptical comparison: than he (is).",
    tags: ["pronouns", "case", "c2"]
  },
  {
    id: "error.hard.0006",
    category: "error-identification",
    subcategory: "inversion with 'little'",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "Little the intelligence analysts suspected",
      "that the cyber-intrusion was orchestrated",
      "by state-sponsored operatives",
      "in Eastern Europe."
    ],
    errorIndex: 0, // s1
    explanation: "Initial restrictive cognitive adverb 'Little' triggers subject-auxiliary inversion ('Little did the intelligence analysts suspect').",
    learningObjective: "Apply auxiliary 'do' inversion following fronted 'Little'.",
    grammarRule: "Little + did + subject + base verb.",
    tags: ["inversion", "negative", "c1"]
  },
  {
    id: "error.hard.0007",
    category: "error-identification",
    subcategory: "mandative subjunctive passive",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The treaty specifically mandates",
      "that each signatory nation's stockpile",
      "is dismantled and inspected",
      "by independent United Nations monitors."
    ],
    errorIndex: 2, // s3
    explanation: "Mandative subjunctive requires the uninflected base verb 'be' ('be dismantled and inspected'), not indicative 'is dismantled'.",
    learningObjective: "Apply passive mandative subjunctive with base verb 'be'.",
    grammarRule: "Mandate that + subject + be + past participle.",
    tags: ["subjunctive", "mandative", "c1"]
  },
  {
    id: "error.hard.0008",
    category: "error-identification",
    subcategory: "dependent prepositions",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The CFO's compensation package was deemed",
      "entirely incommensurate to",
      "her lackluster operational track record",
      "over the preceding four fiscal quarters."
    ],
    errorIndex: 1, // s2
    explanation: "The formal adjective 'incommensurate' (like 'commensurate') takes the dependent preposition 'with', not 'to'.",
    learningObjective: "Identify exact dependent prepositions following advanced evaluative adjectives.",
    grammarRule: "Incommensurate with + noun.",
    tags: ["dependent-prepositions", "collocations", "c1"]
  },
  {
    id: "error.hard.0009",
    category: "error-identification",
    subcategory: "dangling participial clauses",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "Upon reviewing the archival transcripts,",
      "several historical inaccuracies were identified",
      "by the doctoral dissertation committee",
      "during the oral defense."
    ],
    errorIndex: 1, // s2
    explanation: "Dangling prepositional participle phrase: 'several historical inaccuracies' cannot review transcripts. The human committee must serve as the active subject.",
    learningObjective: "Correct dangling introductory adverbial participial phrases.",
    grammarRule: "Introductory modifier must refer to grammatical subject.",
    tags: ["dangling-modifiers", "syntax", "c1"]
  },
  {
    id: "error.hard.0010",
    category: "error-identification",
    subcategory: "archaic subjunctive",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "The constitutional drafters chose their words with care,",
      "lest any administrative ambiguity",
      "is exploited by ambitious despots",
      "in future generations."
    ],
    errorIndex: 2, // s3
    explanation: "'Lest' governs the subjunctive base verb ('be exploited') or 'should be exploited', never indicative 'is exploited'.",
    learningObjective: "Apply subjunctive mood governed by conjunction 'lest'.",
    grammarRule: "Lest + subject + base verb (be).",
    tags: ["subjunctive", "archaic", "c2"]
  },
  {
    id: "error.hard.0011",
    category: "error-identification",
    subcategory: "correlative inversion",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "No sooner the gavel had fallen",
      "than the courtroom erupted in uproar",
      "following the reading",
      "of the unexpected guilty verdict."
    ],
    errorIndex: 0, // s1
    explanation: "Initial 'No sooner' triggers immediate subject-auxiliary inversion ('No sooner had the gavel fallen').",
    learningObjective: "Apply immediate auxiliary inversion with initial 'No sooner'.",
    grammarRule: "No sooner had + subject + past participle.",
    tags: ["inversion", "correlative", "c1"]
  },
  {
    id: "error.hard.0012",
    category: "error-identification",
    subcategory: "faulty idiomatic collocation",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The corporate board decided to cast",
      "a blind eye on the accounting discrepancies",
      "to avoid dampening shareholder enthusiasm",
      "prior to the public offering."
    ],
    errorIndex: 1, // s2
    explanation: "The idiom is 'turn a blind eye to' (not 'cast a blind eye on').",
    learningObjective: "Detect corrupted idiomatic phrase collocations.",
    grammarRule: "Fixed idiom: 'turn a blind eye to'.",
    tags: ["idioms", "collocations", "c1"]
  },
  {
    id: "error.hard.0013",
    category: "error-identification",
    subcategory: "unattached participle",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "Being an intractable philosophical paradox,",
      "the university logic professor spent decades",
      "attempting to formulate a coherent mathematical proof",
      "to resolve it."
    ],
    errorIndex: 0, // s1
    explanation: "Dangling participle: the professor was not an 'intractable philosophical paradox'; the paradox was. The introductory phrase modifies the wrong subject.",
    learningObjective: "Identify misplaced appositive and participial descriptors.",
    grammarRule: "Introductory modifier must agree with the subject.",
    tags: ["dangling-modifiers", "semantics", "c2"]
  },
  {
    id: "error.hard.0014",
    category: "error-identification",
    subcategory: "inversion with conditional",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "Were the chief technological officer",
      "resigned before the product release,",
      "the company's share valuation",
      "would plummet precipitously."
    ],
    errorIndex: 1, // s2
    explanation: "Second conditional inversion requires 'Were + subject + to-infinitive' ('Were the CTO to resign'), not a past participle 'resigned'.",
    learningObjective: "Form inverted second conditionals using 'Were + subject + to-infinitive'.",
    grammarRule: "Were + subject + to-infinitive.",
    tags: ["conditionals", "inversion", "c1"]
  },
  {
    id: "error.hard.0015",
    category: "error-identification",
    subcategory: "dependent prepositions",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The newly appointed magistrate was oblivious",
      "about the intense political lobbying",
      "taking place behind closed doors",
      "in the state senate."
    ],
    errorIndex: 1, // s2
    explanation: "The formal collocation is 'oblivious to' (or occasionally 'of'), not 'about'.",
    learningObjective: "Identify exact dependent preposition after 'oblivious'.",
    grammarRule: "Oblivious to + noun.",
    tags: ["dependent-prepositions", "collocations", "c1"]
  },
  {
    id: "error.hard.0016",
    category: "error-identification",
    subcategory: "cleft sentence agreement",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "What astonished the forensic investigators",
      "were the total absence of digital logs",
      "in the compromised database servers",
      "following the ransomware attack."
    ],
    errorIndex: 1, // s2
    explanation: "A wh-cleft subject clause ('What astonished the investigators') takes a singular copula 'was' when identifying an abstract singular entity ('the total absence').",
    learningObjective: "Apply singular agreement in wh-cleft nominal sentences.",
    grammarRule: "Wh-cleft subject clause governs singular verb agreement.",
    tags: ["cleft", "agreement", "c2"]
  },
  {
    id: "error.hard.0017",
    category: "error-identification",
    subcategory: "negative inversion",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "Seldom industry analysts have witnessed",
      "such ruthless competitive consolidation",
      "within the global semiconductor sector",
      "over such a brief period."
    ],
    errorIndex: 0, // s1
    explanation: "Initial negative adverb 'Seldom' triggers subject-auxiliary inversion ('Seldom have industry analysts witnessed').",
    learningObjective: "Invert subject and auxiliary following initial negative limiting adverbials.",
    grammarRule: "Seldom + auxiliary + subject + verb.",
    tags: ["inversion", "negative", "c1"]
  },
  {
    id: "error.hard.0018",
    category: "error-identification",
    subcategory: "participle clause tense",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "Having been concluding the peace negotiations,",
      "the diplomatic envoys retired to their quarters",
      "to draft the final communique",
      "for the press."
    ],
    errorIndex: 0, // s1
    explanation: "'Having been concluding' incorrectly combines passive/progressive with an active transitive verb. It should be active perfect participle 'Having concluded'.",
    learningObjective: "Correct erroneous compound participial aspects.",
    grammarRule: "Active perfect participle: Having + past participle (Having concluded).",
    tags: ["participles", "aspect", "c2"]
  },
  {
    id: "error.hard.0019",
    category: "error-identification",
    subcategory: "faulty parallel correlative",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The academic thesis was criticized",
      "neither for its empirical methodology",
      "or for its statistical conclusions,",
      "but solely for its theoretical coherence."
    ],
    errorIndex: 2, // s3
    explanation: "'Neither' must correlate with 'nor', not 'or' ('neither for... nor for...').",
    learningObjective: "Identify correlative pair 'neither... nor'.",
    grammarRule: "Correlative coordination: neither... nor.",
    tags: ["correlative", "conjunctions", "c1"]
  },
  {
    id: "error.hard.0020",
    category: "error-identification",
    subcategory: "inversion with 'only after'",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "Only after forensic accountants audited the files",
      "the executive board recognized",
      "the staggering scale of the embezzlement",
      "perpetrated by senior partners."
    ],
    errorIndex: 1, // s2
    explanation: "'Only after' clauses require subject-auxiliary inversion in the ensuing main clause ('did the executive board recognize').",
    learningObjective: "Invert main clause following initial 'Only after' subordinate clauses.",
    grammarRule: "Only after + clause + did + subject + base verb.",
    tags: ["inversion", "limiting", "c1"]
  },
  {
    id: "error.hard.0021",
    category: "error-identification",
    subcategory: "comparative correlatives",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "The more rigorous the clinical trial standards,",
      "the most defensible the empirical conclusions",
      "will be when evaluated",
      "by the international regulatory commission."
    ],
    errorIndex: 1, // s2
    explanation: "Proportional comparative correlatives require 'The + comparative..., the + comparative...'. It must be 'the more defensible', not superlative 'the most defensible'.",
    learningObjective: "Form proportional comparative correlatives with 'the... the...'.",
    grammarRule: "The + comparative, the + comparative.",
    tags: ["comparatives", "correlative", "c2"]
  },
  {
    id: "error.hard.0022",
    category: "error-identification",
    subcategory: "subjunctive mandative",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The parliamentary statute dictates",
      "that every public procurement contract",
      "is subjected to independent auditing",
      "prior to disbursement of state funds."
    ],
    errorIndex: 2, // s3
    explanation: "Mandative subjunctive after 'dictates that' requires base form 'be' ('be subjected to independent auditing'), not indicative 'is subjected'.",
    learningObjective: "Apply passive mandative subjunctive.",
    grammarRule: "Dictate that + subject + be + past participle.",
    tags: ["subjunctive", "mandative", "c1"]
  },
  {
    id: "error.hard.0023",
    category: "error-identification",
    subcategory: "prepositional complement",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The senior litigation partner was averse",
      "from settling the trademark lawsuit",
      "without extracting a formal public apology",
      "from the competitor."
    ],
    errorIndex: 1, // s2
    explanation: "The adjective 'averse' takes dependent preposition 'to' ('averse to settling'), not 'from'.",
    learningObjective: "Identify dependent preposition 'to' after 'averse'.",
    grammarRule: "Averse to + gerund/noun.",
    tags: ["dependent-prepositions", "collocations", "c1"]
  },
  {
    id: "error.hard.0024",
    category: "error-identification",
    subcategory: "inversion with 'not until'",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "Not until the dawn light broke over the ridge",
      "the search and rescue team realized",
      "the catastrophic extent of the avalanche",
      "that buried the valley hamlet."
    ],
    errorIndex: 1, // s2
    explanation: "'Not until' triggers subject-auxiliary inversion in the main clause ('did the search and rescue team realize').",
    learningObjective: "Invert main clause subject and auxiliary after 'Not until'.",
    grammarRule: "Not until + clause + did + subject + verb.",
    tags: ["inversion", "negative", "c1"]
  },
  {
    id: "error.hard.0025",
    category: "error-identification",
    subcategory: "unattached participle",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "Viewed through an electron microscope,",
      "the researcher was amazed by",
      "the symmetrical crystalline architecture",
      "of the novel synthetic alloy."
    ],
    errorIndex: 1, // s2
    explanation: "Dangling participle: the researcher was not viewed through an electron microscope; the alloy was. The sentence must begin with the alloy as the subject.",
    learningObjective: "Correct dangling passive participial modifiers.",
    grammarRule: "Introductory participle must modify the subject.",
    tags: ["dangling-modifiers", "participles", "c2"]
  },
  {
    id: "error.hard.0026",
    category: "error-identification",
    subcategory: "scarcely... when",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "Scarcely had the international peace treaty been signed",
      "than sporadic border skirmishes erupted",
      "in the contested mountainous province,",
      "violating the newly declared ceasefire."
    ],
    errorIndex: 1, // s2
    explanation: "'Scarcely had + S + V3' pairs with temporal conjunction 'when', not 'than' ('when sporadic border skirmishes erupted').",
    learningObjective: "Pair 'scarcely had' with temporal conjunction 'when'.",
    grammarRule: "Scarcely... when (not than).",
    tags: ["inversion", "correlative", "c1"]
  },
  {
    id: "error.hard.0027",
    category: "error-identification",
    subcategory: "dependent prepositions",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The newly appointed defense minister was immune",
      "against the virulent political criticism",
      "voiced by opposing parliamentary factions",
      "during the budget debates."
    ],
    errorIndex: 1, // s2
    explanation: "In formal idiomatic English, 'immune' takes the preposition 'to' ('immune to criticism'), not 'against'.",
    learningObjective: "Identify exact dependent prepositions after adjective 'immune'.",
    grammarRule: "Immune to + noun.",
    tags: ["dependent-prepositions", "collocations", "c1"]
  },
  {
    id: "error.hard.0028",
    category: "error-identification",
    subcategory: "inversion with 'so'",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "So ferocious the winter blizzard was",
      "that municipal authorities suspended",
      "all aboveground light-rail transit services",
      "for three consecutive days."
    ],
    errorIndex: 0, // s1
    explanation: "Fronted 'So + adjective' causes copular inversion ('So ferocious was the winter blizzard that...').",
    learningObjective: "Form 'so + adjective' inversion with result clauses.",
    grammarRule: "So + adjective + copula + subject + that-clause.",
    tags: ["inversion", "degree", "c2"]
  },
  {
    id: "error.hard.0029",
    category: "error-identification",
    subcategory: "double comparatives",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The appellate judge noted that the revised statute",
      "was more preferable to the outdated code,",
      "as it streamlined courtroom procedures",
      "for complex commercial litigation."
    ],
    errorIndex: 1, // s2
    explanation: "'Preferable' inherently contains comparative force and already means 'more desirable'. Modifying it with 'more' is a redundant comparative error ('was preferable to').",
    learningObjective: "Eliminate pleonastic comparative adverbs modifying inherently comparative Latin adjectives.",
    grammarRule: "Do not use 'more' with 'preferable'.",
    tags: ["comparatives", "pleonasm", "c1"]
  },
  {
    id: "error.hard.0030",
    category: "error-identification",
    subcategory: "subjunctive in formulas",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "Being that as it may,",
      "the constitutional assembly must proceed",
      "strictly according to established procedural rules",
      "governing legislative revisions."
    ],
    errorIndex: 0, // s1
    explanation: "The established formulaic subjunctive idiom is 'Be that as it may', not participle 'Being that as it may'.",
    learningObjective: "Recognize fixed formulaic subjunctive idioms.",
    grammarRule: "Formulaic idiom: 'Be that as it may'.",
    tags: ["subjunctive", "idioms", "c2"]
  },
  {
    id: "error.hard.0031",
    category: "error-identification",
    subcategory: "faulty case in relative clauses",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The executive board dismissed the auditor",
      "whom they believed had leaked",
      "confidential merger deliberations",
      "to the financial press."
    ],
    errorIndex: 1, // s2
    explanation: "The relative pronoun functions as the subject of 'had leaked' (with 'they believed' being an intrusive parenthetical). It must be nominative 'who', not objective 'whom'.",
    learningObjective: "Correct erroneous 'whom' in relative clauses with parenthetical verb clauses.",
    grammarRule: "Subject of verb requires 'who' despite intervening parenthetical.",
    tags: ["pronouns", "case", "c1"]
  },
  {
    id: "error.hard.0032",
    category: "error-identification",
    subcategory: "inversion with locative phrase",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "At the summit of the windswept mountain ridge",
      "did stand an ancient stone watchtower,",
      "guarding the entrance to the alpine pass",
      "for nearly a millennium."
    ],
    errorIndex: 1, // s2
    explanation: "Full locative inversion (fronted prepositional phrase of place + lexical intransitive verb + subject) does not use auxiliary 'do' ('stood an ancient stone watchtower').",
    learningObjective: "Form full locative inversion without auxiliary 'do'.",
    grammarRule: "Locative phrase + lexical verb + subject (no 'did').",
    tags: ["inversion", "locative", "c2"]
  },
  {
    id: "error.hard.0033",
    category: "error-identification",
    subcategory: "dependent prepositions",
    difficulty: "hard",
    cefr: "C1",
    segments: [
      "The newly enacted antitrust regulations are",
      "incompatible to the existing operational practices",
      "of dominant telecommunications conglomerates",
      "in the domestic market."
    ],
    errorIndex: 1, // s2
    explanation: "'Incompatible' takes the dependent preposition 'with', not 'to' ('incompatible with the practices').",
    learningObjective: "Identify exact dependent prepositions after adjective 'incompatible'.",
    grammarRule: "Incompatible with + noun.",
    tags: ["dependent-prepositions", "collocations", "c1"]
  },
  {
    id: "error.hard.0034",
    category: "error-identification",
    subcategory: "elliptical gapping",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "Some researchers prioritize empirical verification,",
      "and others theoretical elegance,",
      "yet both camps contributes equally",
      "to the advancement of physics."
    ],
    errorIndex: 2, // s3
    explanation: "The compound subject 'both camps' is plural, requiring plural verb agreement 'contribute equally' rather than singular 'contributes'.",
    learningObjective: "Maintain plural verb agreement with compound subjects following elliptical coordination.",
    grammarRule: "'Both camps' takes plural verb agreement.",
    tags: ["agreement", "ellipsis", "c2"]
  },
  {
    id: "error.hard.0035",
    category: "error-identification",
    subcategory: "inversion with 'nowhere'",
    difficulty: "hard",
    cefr: "C2",
    segments: [
      "Nowhere in the extensive diplomatic archives",
      "there is any mention of an alternative draft",
      "of the armistice treaty signed in nineteen forty-five",
      "at the peace conference."
    ],
    errorIndex: 1, // s2
    explanation: "Initial spatial negative adverb 'Nowhere' requires copular inversion ('is there any mention', not 'there is').",
    learningObjective: "Apply negative spatial inversion with existential 'there'.",
    grammarRule: "Nowhere + copula + existential there + subject.",
    tags: ["inversion", "existential", "c2"]
  }
];

export function getAuditedErrorQuestions(): Question[] {
  return rawErrorDefs.map((def) => buildErrorId(def));
}
