import { Question } from "../../domain/questions/schema.ts";

export const readingAndClozeQuestions: Question[] = [
  {
    id: "reading.workplace.b1.0012",
    type: "reading-single-choice",
    category: "reading-comprehension",
    subcategory: "workplace policy",
    difficulty: "medium",
    cefr: "B1",
    passageId: "pass-hybrid-work-01",
    passage: `MEMORANDUM
To: All Global Operations Staff
From: People & Culture Directorate
Date: October 14, 2026
Subject: Updated Core Collaboration Hours

Beginning next month, our hybrid working schedule will transition to flexible core hours. While team members retain autonomy over their daily arrival and departure times, all staff are expected to be reachable and available for synchronous collaboration between 10:00 AM and 3:00 PM local time, Tuesday through Thursday.

This adjustment directly addresses feedback gathered during the mid-year employee pulse survey, where cross-departmental coordination was cited as a frequent bottleneck. Asynchronous updates via our project management boards remain encouraged for non-urgent tasks. We trust that this balance between focused independent execution and predictable collaboration windows will bolster overall productivity.`,
    prompt: "According to the memorandum, what is the main reason for introducing core collaboration hours?",
    options: [
      { id: "a", text: "To eliminate asynchronous communication tools entirely" },
      { id: "b", text: "To overcome cross-departmental coordination delays reported by staff" },
      { id: "c", text: "To mandate five days of in-office attendance per week" },
      { id: "d", text: "To reduce total working hours for global personnel" },
    ],
    correctOptionId: "b",
    explanation: "The memo explicitly explains that the adjustment 'directly addresses feedback gathered during the mid-year employee pulse survey, where cross-departmental coordination was cited as a frequent bottleneck.'",
    learningObjective: "Extract key factual justification from professional workplace policy announcements.",
    tags: ["reading", "workplace", "b1", "policy"],
    estimatedSeconds: 45,
    version: 1,
  },
  {
    id: "reading.academic.b2.0013",
    type: "reading-single-choice",
    category: "reading-comprehension",
    subcategory: "environmental science",
    difficulty: "hard",
    cefr: "B2",
    passageId: "pass-urban-forests-02",
    passage: `Urban canopies—the overarching layer formed by mature city trees—deliver ecosystem services far exceeding simple aesthetic beautification. Microclimate modeling demonstrates that strategically sited street trees can reduce local ambient summer temperatures by 2 to 4 degrees Celsius through evapotranspiration and direct solar shading. 

Furthermore, tree root systems stabilize urban soils against sudden stormwater surges, acting as natural filtration bio-retention zones that reduce pressure on aging municipal drainage networks. Despite these documented benefits, municipal planners frequently face competing demands for aboveground space, particularly from utility corridors and transportation infrastructure. Consequently, long-term urban forestry initiatives require cross-sectoral zoning policies that mandate adequate root-zone soil volumes prior to civil construction.`,
    prompt: "What can be inferred regarding municipal planning challenges from the passage?",
    options: [
      { id: "a", text: "Cities will completely abandon underground utility pipelines in favor of trees" },
      { id: "b", text: "Urban tree growth often conflicts with space required for infrastructure and utilities" },
      { id: "c", text: "Evapotranspiration produces excessive moisture that damages asphalt roads" },
      { id: "d", text: "Stormwater surge management is exclusively the responsibility of civil engineers" },
    ],
    correctOptionId: "b",
    explanation: "The passage notes that 'municipal planners frequently face competing demands for aboveground space, particularly from utility corridors and transportation infrastructure', indicating that space conflicts hinder tree planting.",
    learningObjective: "Infer relational constraints between infrastructure and ecology from analytical expository text.",
    tags: ["reading", "academic", "b2", "environment"],
    estimatedSeconds: 50,
    version: 1,
  },
  {
    id: "cloze.grammar.0001",
    type: "cloze-choice",
    category: "cloze-test",
    subcategory: "sentence completion",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Although she was exhausted after the flight, Maria {{blank}} to attend the kickoff keynote.",
    options: [
      { id: "a", text: "managed" },
      { id: "b", text: "prevented" },
      { id: "c", text: "succeeded" },
      { id: "d", text: "avoided" },
    ],
    correctOptionId: "a",
    explanation: "\"Managed to attend\" is the correct idiom meaning to succeed in doing something difficult. 'Succeeded' requires 'in attending', while 'prevented' and 'avoided' contradict the clause.",
    learningObjective: "Select appropriate verb collocations with 'to + infinitive'.",
    grammarRule: "Manage + to-infinitive means to achieve something despite difficulty.",
    tags: ["cloze", "collocation", "a2"],
    estimatedSeconds: 20,
    version: 1,
  },
  {
    id: "cloze.context.0002",
    type: "cloze-choice",
    category: "cloze-test",
    subcategory: "sentence completion",
    difficulty: "medium",
    cefr: "B2",
    prompt: "The sudden surge in overseas orders has placed an unprecedented {{blank}} on the factory's inventory.",
    options: [
      { id: "a", text: "strain" },
      { id: "b", text: "relief" },
      { id: "c", text: "leverage" },
      { id: "d", text: "venture" },
    ],
    correctOptionId: "a",
    explanation: "The idiom 'place a strain on' means to put severe pressure or demand on resources.",
    learningObjective: "Complete idiomatic noun phrases describing logistical pressure.",
    tags: ["cloze", "idioms", "b2"],
    estimatedSeconds: 20,
    version: 1,
  },
  {
    id: "cloze.academic.0003",
    type: "cloze-choice",
    category: "cloze-test",
    subcategory: "academic completion",
    difficulty: "hard",
    cefr: "C1",
    prompt: "The experimental apparatus was meticulously calibrated to ensure that outside interference was {{blank}} to negligible levels.",
    options: [
      { id: "a", text: "curtailed" },
      { id: "b", text: "inflated" },
      { id: "c", text: "promulgated" },
      { id: "d", text: "disseminated" },
    ],
    correctOptionId: "a",
    explanation: "'Curtailed' means reduced or restricted, fitting the goal of bringing unwanted interference down to negligible levels.",
    learningObjective: "Employ advanced academic verbs expressing reduction and containment.",
    tags: ["cloze", "academic", "c1"],
    estimatedSeconds: 25,
    version: 1,
  }
];
