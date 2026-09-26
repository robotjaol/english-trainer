import { Question } from "../../../domain/questions/schema.ts";
import { SentenceOrderDef, buildSentenceOrder } from "./helpers.ts";

export const rawOrderDefs: SentenceOrderDef[] = [
  // ===================== EASY (A2) - 30 Questions =====================
  {
    id: "order.easy.0001",
    category: "sentence-arrangement",
    subcategory: "workplace instructions",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a natural, grammatically correct instruction.",
    fragments: [
      { id: "f1", text: "your identification badge" },
      { id: "f2", text: "please present" },
      { id: "f3", text: "upon entering the building" },
      { id: "f4", text: "at the security desk" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "Natural imperative sequence: 'Please present [direct object: your identification badge] [place: at the security desk] [time: upon entering the building].'",
    learningObjective: "Sequence imperative instructions with object, place, and temporal adverbials.",
    tags: ["order", "imperative", "a2"]
  },
  {
    id: "order.easy.0002",
    category: "sentence-arrangement",
    subcategory: "daily communications",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a clear sentence.",
    fragments: [
      { id: "f1", text: "arrived on time" },
      { id: "f2", text: "the morning flight from London" },
      { id: "f3", text: "despite the heavy snow" },
      { id: "f4", text: "at terminal three" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "Standard declarative order: 'The morning flight from London arrived on time at terminal three despite the heavy snow.'",
    learningObjective: "Order declarative sentences with place adjuncts and concession adverbials.",
    tags: ["order", "syntax", "a2"]
  },
  {
    id: "order.easy.0003",
    category: "sentence-arrangement",
    subcategory: "office requests",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a polite email request.",
    fragments: [
      { id: "f1", text: "could you please send" },
      { id: "f2", text: "by Friday afternoon" },
      { id: "f3", text: "the updated financial spreadsheet" },
      { id: "f4", text: "to my office email" }
    ],
    correctOrder: ["f1", "f3", "f4", "f2"],
    explanation: "'Could you please send the updated financial spreadsheet to my office email by Friday afternoon' follows standard polite request syntax.",
    learningObjective: "Construct polite workplace requests with recipient and temporal constraints.",
    tags: ["order", "requests", "a2"]
  },
  {
    id: "order.easy.0004",
    category: "sentence-arrangement",
    subcategory: "daily routines",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a natural sentence.",
    fragments: [
      { id: "f1", text: "in the central park" },
      { id: "f2", text: "before eating breakfast" },
      { id: "f3", text: "she usually jogs" },
      { id: "f4", text: "every weekday morning" }
    ],
    correctOrder: ["f3", "f1", "f4", "f2"],
    explanation: "'She usually jogs in the central park every weekday morning before eating breakfast' maintains natural manner, place, and time sequencing.",
    learningObjective: "Arrange adverbials of place and time following habitual action verbs.",
    tags: ["order", "adverbials", "a2"]
  },
  {
    id: "order.easy.0005",
    category: "sentence-arrangement",
    subcategory: "customer service",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a professional customer service notification.",
    fragments: [
      { id: "f1", text: "your online order" },
      { id: "f2", text: "has been dispatched" },
      { id: "f3", text: "from our main warehouse" },
      { id: "f4", text: "this morning" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'Your online order has been dispatched from our main warehouse this morning' follows standard Subject + Verb + Place + Time syntax.",
    learningObjective: "Sequence passive notifications with origin and temporal modifiers.",
    tags: ["order", "customer-service", "a2"]
  },
  {
    id: "order.easy.0006",
    category: "sentence-arrangement",
    subcategory: "meeting reminders",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a clear notification.",
    fragments: [
      { id: "f1", text: "will start promptly" },
      { id: "f2", text: "in the executive conference room" },
      { id: "f3", text: "at ten o'clock" },
      { id: "f4", text: "the quarterly budget review" }
    ],
    correctOrder: ["f4", "f1", "f3", "f2"],
    explanation: "'The quarterly budget review will start promptly at ten o'clock in the executive conference room' is clear and coherent.",
    learningObjective: "Formulate scheduled meeting announcements.",
    tags: ["order", "meetings", "a2"]
  },
  {
    id: "order.easy.0007",
    category: "sentence-arrangement",
    subcategory: "library policy",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a public notice.",
    fragments: [
      { id: "f1", text: "all borrowed books" },
      { id: "f2", text: "to the circulation desk" },
      { id: "f3", text: "must be returned" },
      { id: "f4", text: "before five o'clock" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'All borrowed books must be returned to the circulation desk before five o'clock' follows Subject + Modal Passive + Destination + Time.",
    learningObjective: "Order modal passive administrative notices.",
    tags: ["order", "passive", "a2"]
  },
  {
    id: "order.easy.0008",
    category: "sentence-arrangement",
    subcategory: "event planning",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a coherent sentence.",
    fragments: [
      { id: "f1", text: "the marketing team" },
      { id: "f2", text: "in the hotel ballroom" },
      { id: "f3", text: "last night" },
      { id: "f4", text: "celebrated the product launch" }
    ],
    correctOrder: ["f1", "f4", "f2", "f3"],
    explanation: "'The marketing team celebrated the product launch in the hotel ballroom last night' maintains Subject + Verb + Object + Place + Time syntax.",
    learningObjective: "Arrange standard SVO sentences with place and time adjuncts.",
    tags: ["order", "syntax", "a2"]
  },
  {
    id: "order.easy.0009",
    category: "sentence-arrangement",
    subcategory: "travel announcements",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into an airport departure announcement.",
    fragments: [
      { id: "f1", text: "for flight seventy-four" },
      { id: "f2", text: "passengers holding tickets" },
      { id: "f3", text: "to gate twelve immediately" },
      { id: "f4", text: "should proceed" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'Passengers holding tickets for flight seventy-four should proceed to gate twelve immediately' forms a direct public announcement.",
    learningObjective: "Sequence travel directives.",
    tags: ["order", "travel", "a2"]
  },
  {
    id: "order.easy.0010",
    category: "sentence-arrangement",
    subcategory: "laboratory rules",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a laboratory safety rule.",
    fragments: [
      { id: "f1", text: "protective eye goggles" },
      { id: "f2", text: "all students must wear" },
      { id: "f3", text: "during chemical experiments" },
      { id: "f4", text: "inside the laboratory" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'All students must wear protective eye goggles inside the laboratory during chemical experiments' is standard Subject + Modal Verb + Object + Place + Time.",
    learningObjective: "Order mandatory laboratory safety rules.",
    tags: ["order", "safety", "a2"]
  },
  {
    id: "order.easy.0011",
    category: "sentence-arrangement",
    subcategory: "daily work",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a clear sentence.",
    fragments: [
      { id: "f1", text: "before leaving the office" },
      { id: "f2", text: "always locks her cabinet" },
      { id: "f3", text: "the senior accountant" },
      { id: "f4", text: "at six o'clock" }
    ],
    correctOrder: ["f3", "f2", "f1", "f4"],
    explanation: "'The senior accountant always locks her cabinet before leaving the office at six o'clock' is coherent and natural.",
    learningObjective: "Sequence subject with frequency adverbs and subordinate time clauses.",
    tags: ["order", "daily-work", "a2"]
  },
  {
    id: "order.easy.0012",
    category: "sentence-arrangement",
    subcategory: "hospitality",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a hotel welcome instruction.",
    fragments: [
      { id: "f1", text: "breakfast is served" },
      { id: "f2", text: "in the ground-floor restaurant" },
      { id: "f3", text: "from seven to ten" },
      { id: "f4", text: "for all hotel guests" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'Breakfast is served in the ground-floor restaurant from seven to ten for all hotel guests' communicates details clearly.",
    learningObjective: "Form hospitality informational statements.",
    tags: ["order", "hospitality", "a2"]
  },
  {
    id: "order.easy.0013",
    category: "sentence-arrangement",
    subcategory: "email follow-up",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a natural email closing sentence.",
    fragments: [
      { id: "f1", text: "to meeting you in person" },
      { id: "f2", text: "I look forward" },
      { id: "f3", text: "at the upcoming symposium" },
      { id: "f4", text: "next month" }
    ],
    correctOrder: ["f2", "f1", "f3", "f4"],
    explanation: "'I look forward to meeting you in person at the upcoming symposium next month' is the standard closing sequence.",
    learningObjective: "Order standard formal email sign-off formulas.",
    tags: ["order", "emails", "a2"]
  },
  {
    id: "order.easy.0014",
    category: "sentence-arrangement",
    subcategory: "visitor reception",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a clear visitor guideline.",
    fragments: [
      { id: "f1", text: "please sign the guestbook" },
      { id: "f2", text: "at the main reception desk" },
      { id: "f3", text: "before proceeding upstairs" },
      { id: "f4", text: "to the meeting rooms" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'Please sign the guestbook at the main reception desk before proceeding upstairs to the meeting rooms' follows natural procedural order.",
    learningObjective: "Sequence directional visitor instructions.",
    tags: ["order", "etiquette", "a2"]
  },
  {
    id: "order.easy.0015",
    category: "sentence-arrangement",
    subcategory: "project deadlines",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a clear sentence.",
    fragments: [
      { id: "f1", text: "the final research report" },
      { id: "f2", text: "must be submitted" },
      { id: "f3", text: "by all student teams" },
      { id: "f4", text: "before Friday at noon" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'The final research report must be submitted by all student teams before Friday at noon' represents standard passive word order.",
    learningObjective: "Order modal passive structures with agent and deadline.",
    tags: ["order", "deadlines", "a2"]
  },
  {
    id: "order.easy.0016",
    category: "sentence-arrangement",
    subcategory: "customer service",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a polite customer service greeting.",
    fragments: [
      { id: "f1", text: "how may I assist you" },
      { id: "f2", text: "with your account inquiry" },
      { id: "f3", text: "thank you for calling" },
      { id: "f4", text: "customer support today" }
    ],
    correctOrder: ["f3", "f4", "f1", "f2"],
    explanation: "'Thank you for calling customer support today, how may I assist you with your account inquiry' follows standard call center opening sequence.",
    learningObjective: "Sequence customer support greetings.",
    tags: ["order", "customer-service", "a2"]
  },
  {
    id: "order.easy.0017",
    category: "sentence-arrangement",
    subcategory: "office management",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a natural sentence.",
    fragments: [
      { id: "f1", text: "the office supplies" },
      { id: "f2", text: "were organized neatly" },
      { id: "f3", text: "by the administrative assistant" },
      { id: "f4", text: "in the storage cabinet" }
    ],
    correctOrder: ["f1", "f2", "f4", "f3"],
    explanation: "'The office supplies were organized neatly in the storage cabinet by the administrative assistant' places place before agent naturally.",
    learningObjective: "Order passive sentences with adverbial of manner and location.",
    tags: ["order", "passive", "a2"]
  },
  {
    id: "order.easy.0018",
    category: "sentence-arrangement",
    subcategory: "commute description",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a clear sentence.",
    fragments: [
      { id: "f1", text: "takes the commuter train" },
      { id: "f2", text: "to his downtown office" },
      { id: "f3", text: "every business day" },
      { id: "f4", text: "the senior engineer" }
    ],
    correctOrder: ["f4", "f1", "f2", "f3"],
    explanation: "'The senior engineer takes the commuter train to his downtown office every business day' follows Subject + Verb + Object + Destination + Frequency.",
    learningObjective: "Order routine commute sentences.",
    tags: ["order", "commute", "a2"]
  },
  {
    id: "order.easy.0019",
    category: "sentence-arrangement",
    subcategory: "training schedules",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into an informational statement.",
    fragments: [
      { id: "f1", text: "will be conducted" },
      { id: "f2", text: "the new software training" },
      { id: "f3", text: "via video conference" },
      { id: "f4", text: "next Monday morning" }
    ],
    correctOrder: ["f2", "f1", "f3", "f4"],
    explanation: "'The new software training will be conducted via video conference next Monday morning' follows Subject + Passive Verb + Method + Time.",
    learningObjective: "Sequence future passive announcements.",
    tags: ["order", "training", "a2"]
  },
  {
    id: "order.easy.0020",
    category: "sentence-arrangement",
    subcategory: "workplace safety",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into an emergency notice.",
    fragments: [
      { id: "f1", text: "in case of fire" },
      { id: "f2", text: "do not use the elevators" },
      { id: "f3", text: "and take the emergency stairs" },
      { id: "f4", text: "to the ground floor" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'In case of fire, do not use the elevators and take the emergency stairs to the ground floor' is the standard emergency imperative instruction.",
    learningObjective: "Order conditional emergency safety directives.",
    tags: ["order", "safety", "a2"]
  },
  {
    id: "order.easy.0021",
    category: "sentence-arrangement",
    subcategory: "meeting summaries",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a clear sentence.",
    fragments: [
      { id: "f1", text: "distributed the meeting minutes" },
      { id: "f2", text: "to all department members" },
      { id: "f3", text: "the project secretary" },
      { id: "f4", text: "by email yesterday" }
    ],
    correctOrder: ["f3", "f1", "f2", "f4"],
    explanation: "'The project secretary distributed the meeting minutes to all department members by email yesterday' follows Subject + Verb + Direct Object + Recipient + Manner + Time.",
    learningObjective: "Sequence complex transitive sentences with dative recipients.",
    tags: ["order", "transitive", "a2"]
  },
  {
    id: "order.easy.0022",
    category: "sentence-arrangement",
    subcategory: "travel booking",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a natural sentence.",
    fragments: [
      { id: "f1", text: "booked two plane tickets" },
      { id: "f2", text: "the travel coordinator" },
      { id: "f3", text: "for the sales conference" },
      { id: "f4", text: "to San Francisco" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'The travel coordinator booked two plane tickets to San Francisco for the sales conference' is logical and fluent.",
    learningObjective: "Order travel booking statements.",
    tags: ["order", "travel", "a2"]
  },
  {
    id: "order.easy.0023",
    category: "sentence-arrangement",
    subcategory: "office maintenance",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a notice.",
    fragments: [
      { id: "f1", text: "will be cleaned" },
      { id: "f2", text: "the office carpets" },
      { id: "f3", text: "over the weekend" },
      { id: "f4", text: "by a professional service" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'The office carpets will be cleaned by a professional service over the weekend' is standard passive ordering.",
    learningObjective: "Order passive maintenance notifications.",
    tags: ["order", "maintenance", "a2"]
  },
  {
    id: "order.easy.0024",
    category: "sentence-arrangement",
    subcategory: "client calls",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a clear sentence.",
    fragments: [
      { id: "f1", text: "spoke with the client" },
      { id: "f2", text: "for over an hour" },
      { id: "f3", text: "about the contract terms" },
      { id: "f4", text: "the sales manager" }
    ],
    correctOrder: ["f4", "f1", "f3", "f2"],
    explanation: "'The sales manager spoke with the client about the contract terms for over an hour' maintains natural prepositional attachment.",
    learningObjective: "Order prepositional phrases of topic and duration.",
    tags: ["order", "sales", "a2"]
  },
  {
    id: "order.easy.0025",
    category: "sentence-arrangement",
    subcategory: "restaurant reservation",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a polite reservation request.",
    fragments: [
      { id: "f1", text: "for four people" },
      { id: "f2", text: "I would like to reserve" },
      { id: "f3", text: "at eight o'clock tonight" },
      { id: "f4", text: "a table near the window" }
    ],
    correctOrder: ["f2", "f4", "f1", "f3"],
    explanation: "'I would like to reserve a table near the window for four people at eight o'clock tonight' follows polite reservation syntax.",
    learningObjective: "Sequence restaurant booking requests.",
    tags: ["order", "reservations", "a2"]
  },
  {
    id: "order.easy.0026",
    category: "sentence-arrangement",
    subcategory: "weather announcements",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a clear meteorological statement.",
    fragments: [
      { id: "f1", text: "heavy rain is expected" },
      { id: "f2", text: "according to the weather forecast" },
      { id: "f3", text: "throughout the coastal region" },
      { id: "f4", text: "tomorrow afternoon" }
    ],
    correctOrder: ["f2", "f1", "f3", "f4"],
    explanation: "'According to the weather forecast, heavy rain is expected throughout the coastal region tomorrow afternoon' is natural and coherent.",
    learningObjective: "Position introductory attribution clauses before main weather predictions.",
    tags: ["order", "weather", "a2"]
  },
  {
    id: "order.easy.0027",
    category: "sentence-arrangement",
    subcategory: "team recognition",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a congratulatory statement.",
    fragments: [
      { id: "f1", text: "congratulated the design team" },
      { id: "f2", text: "the chief executive" },
      { id: "f3", text: "at the quarterly town hall" },
      { id: "f4", text: "on winning the international award" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'The chief executive congratulated the design team on winning the international award at the quarterly town hall' is standard syntax.",
    learningObjective: "Sequence congratulatory expressions with cause and occasion.",
    tags: ["order", "recognition", "a2"]
  },
  {
    id: "order.easy.0028",
    category: "sentence-arrangement",
    subcategory: "package delivery",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a delivery instruction.",
    fragments: [
      { id: "f1", text: "at the back entrance" },
      { id: "f2", text: "if nobody answers the door" },
      { id: "f3", text: "please leave the parcel" },
      { id: "f4", text: "in a sheltered spot" }
    ],
    correctOrder: ["f2", "f3", "f1", "f4"],
    explanation: "'If nobody answers the door, please leave the parcel at the back entrance in a sheltered spot' is clear and unambiguous.",
    learningObjective: "Order conditional instructions with spatial modifiers.",
    tags: ["order", "delivery", "a2"]
  },
  {
    id: "order.easy.0029",
    category: "sentence-arrangement",
    subcategory: "study habits",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a natural sentence.",
    fragments: [
      { id: "f1", text: "in the quiet university library" },
      { id: "f2", text: "studies for three hours" },
      { id: "f3", text: "after attending his lectures" },
      { id: "f4", text: "the diligent student" }
    ],
    correctOrder: ["f4", "f2", "f1", "f3"],
    explanation: "'The diligent student studies for three hours in the quiet university library after attending his lectures' is syntactically well-ordered.",
    learningObjective: "Arrange academic habit sentences with duration, place, and time.",
    tags: ["order", "habits", "a2"]
  },
  {
    id: "order.easy.0030",
    category: "sentence-arrangement",
    subcategory: "equipment troubleshooting",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Arrange the fragments into a troubleshooting instruction.",
    fragments: [
      { id: "f1", text: "restart the computer" },
      { id: "f2", text: "before contacting technical support" },
      { id: "f3", text: "if the software freezes" },
      { id: "f4", text: "by pressing the power button" }
    ],
    correctOrder: ["f3", "f1", "f4", "f2"],
    explanation: "'If the software freezes, restart the computer by pressing the power button before contacting technical support' represents natural procedural syntax.",
    learningObjective: "Sequence conditional troubleshooting steps.",
    tags: ["order", "it-support", "a2"]
  },

  // ===================== MEDIUM (B1 - B2) - 35 Questions =====================
  {
    id: "order.medium.0001",
    category: "sentence-arrangement",
    subcategory: "academic argumentation",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a grammatically coherent, formal sentence.",
    fragments: [
      { id: "f1", text: "was unanimously rejected by" },
      { id: "f2", text: "due to methodological flaws" },
      { id: "f3", text: "the editorial board" },
      { id: "f4", text: "the submitted scientific manuscript" }
    ],
    correctOrder: ["f4", "f1", "f3", "f2"],
    explanation: "Standard academic passive order: 'The submitted scientific manuscript was unanimously rejected by the editorial board due to methodological flaws.'",
    learningObjective: "Sequence passive voice clauses with agent and causal adverbials in formal register.",
    tags: ["order", "passive", "academic", "b2"]
  },
  {
    id: "order.medium.0002",
    category: "sentence-arrangement",
    subcategory: "conditional subordination",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a coherent third conditional sentence.",
    fragments: [
      { id: "f1", text: "we would not have experienced" },
      { id: "f2", text: "had the warning telemetry arrived earlier" },
      { id: "f3", text: "during the orbital maneuver" },
      { id: "f4", text: "the sudden loss of propulsion" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'Had the warning telemetry arrived earlier, we would not have experienced the sudden loss of propulsion during the orbital maneuver' follows inverted conditional syntax.",
    learningObjective: "Construct inverted third conditional sentences with complex noun phrases.",
    tags: ["order", "conditionals", "inversion", "b2"]
  },
  {
    id: "order.medium.0003",
    category: "sentence-arrangement",
    subcategory: "discourse transition",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a well-structured analytical statement.",
    fragments: [
      { id: "f1", text: "consumer spending remained sluggish" },
      { id: "f2", text: "despite significant tax incentives" },
      { id: "f3", text: "throughout the third quarter" },
      { id: "f4", text: "introduced by the central bank" }
    ],
    correctOrder: ["f2", "f4", "f1", "f3"],
    explanation: "'Despite significant tax incentives introduced by the central bank, consumer spending remained sluggish throughout the third quarter' maintains clear rhetorical contrast.",
    learningObjective: "Position introductory participial phrases within concession clauses.",
    tags: ["order", "concession", "economics", "b2"]
  },
  {
    id: "order.medium.0004",
    category: "sentence-arrangement",
    subcategory: "relative clause placement",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a natural sentence.",
    fragments: [
      { id: "f1", text: "which had been delayed for three weeks" },
      { id: "f2", text: "finally arrived at the dry dock" },
      { id: "f3", text: "by severe Atlantic gales" },
      { id: "f4", text: "the deep-sea exploration vessel" }
    ],
    correctOrder: ["f4", "f1", "f3", "f2"],
    explanation: "'The deep-sea exploration vessel, which had been delayed for three weeks by severe Atlantic gales, finally arrived at the dry dock' correctly integrates the non-defining relative clause.",
    learningObjective: "Integrate non-defining relative clauses within compound subject noun phrases.",
    tags: ["order", "relative-clauses", "b2"]
  },
  {
    id: "order.medium.0005",
    category: "sentence-arrangement",
    subcategory: "cleft sentence",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a focused cleft sentence.",
    fragments: [
      { id: "f1", text: "that ultimately convinced the jury" },
      { id: "f2", text: "the defendant was innocent" },
      { id: "f3", text: "it was the forensic digital footprint" },
      { id: "f4", text: "beyond a reasonable doubt" }
    ],
    correctOrder: ["f3", "f1", "f2", "f4"],
    explanation: "'It was the forensic digital footprint that ultimately convinced the jury the defendant was innocent beyond a reasonable doubt' forms an 'it'-cleft focus construction.",
    learningObjective: "Structure 'it'-cleft sentences with subordinate nominal clauses.",
    tags: ["order", "cleft", "b2"]
  },
  {
    id: "order.medium.0006",
    category: "sentence-arrangement",
    subcategory: "participle clause",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a coherent sentence.",
    fragments: [
      { id: "f1", text: "the research team discovered" },
      { id: "f2", text: "having analyzed the ice core samples" },
      { id: "f3", text: "dating back eighty thousand years" },
      { id: "f4", text: "unprecedented greenhouse gas levels" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'Having analyzed the ice core samples, the research team discovered unprecedented greenhouse gas levels dating back eighty thousand years' follows introductory participle syntax.",
    learningObjective: "Order introductory perfect active participle clauses.",
    tags: ["order", "participles", "b2"]
  },
  {
    id: "order.medium.0007",
    category: "sentence-arrangement",
    subcategory: "purpose clauses",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a formal policy statement.",
    fragments: [
      { id: "f1", text: "the financial regulator installed" },
      { id: "f2", text: "advanced surveillance algorithms" },
      { id: "f3", text: "in order that market manipulation" },
      { id: "f4", text: "could be detected in real time" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'The financial regulator installed advanced surveillance algorithms in order that market manipulation could be detected in real time' follows formal purpose subordination.",
    learningObjective: "Construct formal purpose clauses using 'in order that'.",
    tags: ["order", "purpose", "b2"]
  },
  {
    id: "order.medium.0008",
    category: "sentence-arrangement",
    subcategory: "correlative coordination",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a balanced correlative sentence.",
    fragments: [
      { id: "f1", text: "not only exceeded revenue forecasts" },
      { id: "f2", text: "the semiconductor division" },
      { id: "f3", text: "by fifteen percent" },
      { id: "f4", text: "but also expanded market share" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'The semiconductor division not only exceeded revenue forecasts but also expanded market share by fifteen percent' maintains parallel correlative verb coordination.",
    learningObjective: "Order correlative 'not only... but also' verb phrases.",
    tags: ["order", "correlative", "b2"]
  },
  {
    id: "order.medium.0009",
    category: "sentence-arrangement",
    subcategory: "reported speech",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a natural reported speech statement.",
    fragments: [
      { id: "f1", text: "the lead aerospace engineer explained" },
      { id: "f2", text: "why the secondary booster stage" },
      { id: "f3", text: "during the atmospheric re-entry" },
      { id: "f4", text: "had failed to detach properly" }
    ],
    correctOrder: ["f1", "f2", "f4", "f3"],
    explanation: "'The lead aerospace engineer explained why the secondary booster stage had failed to detach properly during the atmospheric re-entry' preserves declarative word order in indirect questions.",
    learningObjective: "Sequence indirect reported clauses with temporal adverbials.",
    tags: ["order", "reported-speech", "b2"]
  },
  {
    id: "order.medium.0010",
    category: "sentence-arrangement",
    subcategory: "concession",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a clear argumentative sentence.",
    fragments: [
      { id: "f1", text: "difficult though the transition was" },
      { id: "f2", text: "the enterprise successfully migrated" },
      { id: "f3", text: "without experiencing customer downtime" },
      { id: "f4", text: "to cloud architecture" }
    ],
    correctOrder: ["f1", "f2", "f4", "f3"],
    explanation: "'Difficult though the transition was, the enterprise successfully migrated to cloud architecture without experiencing customer downtime' uses inverted concession effectively.",
    learningObjective: "Construct inverted concession structures with 'though'.",
    tags: ["order", "concession", "inversion", "b2"]
  },
  {
    id: "order.medium.0011",
    category: "sentence-arrangement",
    subcategory: "passive reporting",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a formal historical statement.",
    fragments: [
      { id: "f1", text: "the ancient bronze statue is believed" },
      { id: "f2", text: "by a master Athenian sculptor" },
      { id: "f3", text: "in the fourth century BC" },
      { id: "f4", text: "to have been cast" }
    ],
    correctOrder: ["f1", "f4", "f2", "f3"],
    explanation: "'The ancient bronze statue is believed to have been cast by a master Athenian sculptor in the fourth century BC' follows standard passive reporting verb syntax.",
    learningObjective: "Order perfect passive infinitives with agent and temporal phrase.",
    tags: ["order", "passive", "history", "b2"]
  },
  {
    id: "order.medium.0012",
    category: "sentence-arrangement",
    subcategory: "comparative correlative",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a proportional comparative sentence.",
    fragments: [
      { id: "f1", text: "the higher the likelihood" },
      { id: "f2", text: "the more rigorous the peer review" },
      { id: "f3", text: "of scientific reproducibility" },
      { id: "f4", text: "becomes across laboratories" }
    ],
    correctOrder: ["f2", "f1", "f3", "f4"],
    explanation: "'The more rigorous the peer review, the higher the likelihood of scientific reproducibility becomes across laboratories' maintains 'the... the...' proportional balance.",
    learningObjective: "Construct comparative correlative sentences.",
    tags: ["order", "comparatives", "b2"]
  },
  {
    id: "order.medium.0013",
    category: "sentence-arrangement",
    subcategory: "adverbial condition",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a professional agreement clause.",
    fragments: [
      { id: "f1", text: "the software license remains active" },
      { id: "f2", text: "within thirty calendar days" },
      { id: "f3", text: "provided that quarterly fees are paid" },
      { id: "f4", text: "of invoice issuance" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'The software license remains active provided that quarterly fees are paid within thirty calendar days of invoice issuance' forms a clean conditional contract clause.",
    learningObjective: "Sequence conditional contract clauses introduced by 'provided that'.",
    tags: ["order", "contracts", "b2"]
  },
  {
    id: "order.medium.0014",
    category: "sentence-arrangement",
    subcategory: "gerund clauses",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a coherent sentence.",
    fragments: [
      { id: "f1", text: "by implementing automated unit tests" },
      { id: "f2", text: "the engineering team reduced" },
      { id: "f3", text: "software deployment errors" },
      { id: "f4", text: "by sixty percent" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'By implementing automated unit tests, the engineering team reduced software deployment errors by sixty percent' maintains means and results syntax.",
    learningObjective: "Position introductory instrumental gerund prepositional phrases.",
    tags: ["order", "gerunds", "means", "b2"]
  },
  {
    id: "order.medium.0015",
    category: "sentence-arrangement",
    subcategory: "workplace policy",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a clear policy directive.",
    fragments: [
      { id: "f1", text: "prior to departure" },
      { id: "f2", text: "employees traveling internationally" },
      { id: "f3", text: "must obtain security clearance" },
      { id: "f4", text: "from the compliance office" }
    ],
    correctOrder: ["f2", "f3", "f4", "f1"],
    explanation: "'Employees traveling internationally must obtain security clearance from the compliance office prior to departure' is syntactically cohesive.",
    learningObjective: "Order post-modifying participial phrases within subject noun phrases.",
    tags: ["order", "workplace-policy", "b2"]
  },
  {
    id: "order.medium.0016",
    category: "sentence-arrangement",
    subcategory: "environmental science",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into an ecological expository sentence.",
    fragments: [
      { id: "f1", text: "mangrove forests protect" },
      { id: "f2", text: "by absorbing wave energy" },
      { id: "f3", text: "coastal communities from tidal surges" },
      { id: "f4", text: "during tropical storms" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'Mangrove forests protect coastal communities from tidal surges by absorbing wave energy during tropical storms' follows Verb + Object + Preposition + Instrumental phrase + Time.",
    learningObjective: "Sequence complex transitive verbs with prepositional objects and instrumental adjuncts.",
    tags: ["order", "ecology", "b2"]
  },
  {
    id: "order.medium.0017",
    category: "sentence-arrangement",
    subcategory: "biomedical technology",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a clear medical sentence.",
    fragments: [
      { id: "f1", text: "the experimental chemotherapy drug" },
      { id: "f2", text: "targets malignant cancer cells" },
      { id: "f3", text: "while sparing healthy tissue" },
      { id: "f4", text: "through antibody conjugation" }
    ],
    correctOrder: ["f1", "f2", "f4", "f3"],
    explanation: "'The experimental chemotherapy drug targets malignant cancer cells through antibody conjugation while sparing healthy tissue' maintains clear functional relationships.",
    learningObjective: "Order instrumental and contrastive adverbials in medical exposition.",
    tags: ["order", "biomedical", "b2"]
  },
  {
    id: "order.medium.0018",
    category: "sentence-arrangement",
    subcategory: "financial reporting",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a formal financial statement.",
    fragments: [
      { id: "f1", text: "operating profit margins expanded" },
      { id: "f2", text: "owing to aggressive supply chain automation" },
      { id: "f3", text: "to eighteen percent" },
      { id: "f4", text: "in the third fiscal quarter" }
    ],
    correctOrder: ["f1", "f3", "f4", "f2"],
    explanation: "'Operating profit margins expanded to eighteen percent in the third fiscal quarter owing to aggressive supply chain automation' is standard financial syntax.",
    learningObjective: "Sequence financial growth verbs with degree, temporal, and causal adjuncts.",
    tags: ["order", "finance", "b2"]
  },
  {
    id: "order.medium.0019",
    category: "sentence-arrangement",
    subcategory: "civil engineering",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into an engineering descriptive sentence.",
    fragments: [
      { id: "f1", text: "the suspension bridge cables" },
      { id: "f2", text: "were engineered to withstand" },
      { id: "f3", text: "without structural deformation" },
      { id: "f4", text: "category-five hurricane winds" }
    ],
    correctOrder: ["f1", "f2", "f4", "f3"],
    explanation: "'The suspension bridge cables were engineered to withstand category-five hurricane winds without structural deformation' follows Verb + Direct Object + Prepositional condition.",
    learningObjective: "Order passive engineering structures with direct objects and negative conditions.",
    tags: ["order", "engineering", "b2"]
  },
  {
    id: "order.medium.0020",
    category: "sentence-arrangement",
    subcategory: "public administration",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a municipal policy sentence.",
    fragments: [
      { id: "f1", text: "to promote urban public health" },
      { id: "f2", text: "the city council designated" },
      { id: "f3", text: "the historic downtown quarter" },
      { id: "f4", text: "as a zero-emission pedestrian zone" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'To promote urban public health, the city council designated the historic downtown quarter as a zero-emission pedestrian zone' places purpose upfront effectively.",
    learningObjective: "Position introductory infinitive clauses of purpose.",
    tags: ["order", "public-policy", "b2"]
  },
  {
    id: "order.medium.0021",
    category: "sentence-arrangement",
    subcategory: "corporate restructuring",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a coherent business sentence.",
    fragments: [
      { id: "f1", text: "the multinational conglomerate divested" },
      { id: "f2", text: "in order to concentrate" },
      { id: "f3", text: "its unprofitable retail divisions" },
      { id: "f4", text: "on high-margin cloud software" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'The multinational conglomerate divested its unprofitable retail divisions in order to concentrate on high-margin cloud software' is natural and syntactically balanced.",
    learningObjective: "Sequence business divestiture statements with purposeful infinitives.",
    tags: ["order", "business", "b2"]
  },
  {
    id: "order.medium.0022",
    category: "sentence-arrangement",
    subcategory: "maritime law",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a legal statement.",
    fragments: [
      { id: "f1", text: "the shipping enterprise was found liable" },
      { id: "f2", text: "for environmental remediation costs" },
      { id: "f3", text: "by the maritime tribunal" },
      { id: "f4", text: "exceeding fifty million dollars" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'The shipping enterprise was found liable by the maritime tribunal for environmental remediation costs exceeding fifty million dollars' places tribunal before the financial damages.",
    learningObjective: "Order judicial liability findings with participial post-modifiers.",
    tags: ["order", "legal", "b2"]
  },
  {
    id: "order.medium.0023",
    category: "sentence-arrangement",
    subcategory: "data governance",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a cybersecurity requirement.",
    fragments: [
      { id: "f1", text: "must be encrypted in transit" },
      { id: "f2", text: "all sensitive customer records" },
      { id: "f3", text: "using military-grade protocols" },
      { id: "f4", text: "as well as at rest" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'All sensitive customer records must be encrypted in transit as well as at rest using military-grade protocols' forms a clear security standard.",
    learningObjective: "Order modal passives with coordinate locative adverbials and instrumental phrases.",
    tags: ["order", "cybersecurity", "b2"]
  },
  {
    id: "order.medium.0024",
    category: "sentence-arrangement",
    subcategory: "astronomy",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into an astronomical observation sentence.",
    fragments: [
      { id: "f1", text: "the space telescope captured" },
      { id: "f2", text: "high-resolution infrared images" },
      { id: "f3", text: "of distant proto-galaxies" },
      { id: "f4", text: "formed shortly after the Big Bang" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'The space telescope captured high-resolution infrared images of distant proto-galaxies formed shortly after the Big Bang' maintains chronological and syntactic clarity.",
    learningObjective: "Sequence astronomical scientific observations with nested participial modifiers.",
    tags: ["order", "astronomy", "b2"]
  },
  {
    id: "order.medium.0025",
    category: "sentence-arrangement",
    subcategory: "architecture",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into an architectural description.",
    fragments: [
      { id: "f1", text: "the modern museum pavilion" },
      { id: "f2", text: "maximizes natural daylight" },
      { id: "f3", text: "while reducing thermal heat gain" },
      { id: "f4", text: "through automated glass louvers" }
    ],
    correctOrder: ["f1", "f2", "f4", "f3"],
    explanation: "'The modern museum pavilion maximizes natural daylight through automated glass louvers while reducing thermal heat gain' balances instrumental and concessive clauses.",
    learningObjective: "Construct architectural environmental performance descriptions.",
    tags: ["order", "architecture", "b2"]
  },
  {
    id: "order.medium.0026",
    category: "sentence-arrangement",
    subcategory: "macroeconomics",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into an economic analysis.",
    fragments: [
      { id: "f1", text: "the central bank raised interest rates" },
      { id: "f2", text: "to curb accelerating inflation" },
      { id: "f3", text: "by fifty basis points" },
      { id: "f4", text: "at its emergency monetary meeting" }
    ],
    correctOrder: ["f1", "f3", "f4", "f2"],
    explanation: "'The central bank raised interest rates by fifty basis points at its emergency monetary meeting to curb accelerating inflation' follows Verb + Object + Degree + Place + Purpose.",
    learningObjective: "Order macroeconomic monetary policy actions.",
    tags: ["order", "economics", "b2"]
  },
  {
    id: "order.medium.0027",
    category: "sentence-arrangement",
    subcategory: "linguistics",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a linguistic research sentence.",
    fragments: [
      { id: "f1", text: "cross-linguistic studies demonstrate" },
      { id: "f2", text: "how grammatical gender systems" },
      { id: "f3", text: "influence cognitive categorization" },
      { id: "f4", text: "in bilingual speakers" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'Cross-linguistic studies demonstrate how grammatical gender systems influence cognitive categorization in bilingual speakers' follows Main Verb + Indirect Clause + Prepositional constraint.",
    learningObjective: "Sequence scientific claims with subordinate interrogative clauses.",
    tags: ["order", "linguistics", "b2"]
  },
  {
    id: "order.medium.0028",
    category: "sentence-arrangement",
    subcategory: "supply chain logistics",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a logistics sentence.",
    fragments: [
      { id: "f1", text: "the freight forwarding firm" },
      { id: "f2", text: "rerouted container vessels" },
      { id: "f3", text: "around the southern cape" },
      { id: "f4", text: "to avoid canal bottlenecks" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'The freight forwarding firm rerouted container vessels around the southern cape to avoid canal bottlenecks' flows logically from action to destination to purpose.",
    learningObjective: "Order commercial maritime logistics routing statements.",
    tags: ["order", "logistics", "b2"]
  },
  {
    id: "order.medium.0029",
    category: "sentence-arrangement",
    subcategory: "agricultural ecology",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into an agricultural sentence.",
    fragments: [
      { id: "f1", text: "planting native hedgerows" },
      { id: "f2", text: "provides vital habitat for pollinators" },
      { id: "f3", text: "along crop field margins" },
      { id: "f4", text: "while reducing soil erosion" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'Planting native hedgerows along crop field margins provides vital habitat for pollinators while reducing soil erosion' preserves gerund phrase integrity.",
    learningObjective: "Sequence gerund subject phrases with spatial and participial modifiers.",
    tags: ["order", "agriculture", "b2"]
  },
  {
    id: "order.medium.0030",
    category: "sentence-arrangement",
    subcategory: "pharmaceutical science",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a clinical trial sentence.",
    fragments: [
      { id: "f1", text: "the phase-three clinical trial" },
      { id: "f2", text: "evaluated drug efficacy" },
      { id: "f3", text: "across three thousand participants" },
      { id: "f4", text: "over a twelve-month duration" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'The phase-three clinical trial evaluated drug efficacy across three thousand participants over a twelve-month duration' follows SVO + Scope + Duration.",
    learningObjective: "Order medical trial methodology statements.",
    tags: ["order", "clinical-trials", "b2"]
  },
  {
    id: "order.medium.0031",
    category: "sentence-arrangement",
    subcategory: "urban transportation",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into an urban transit sentence.",
    fragments: [
      { id: "f1", text: "the municipal transport authority" },
      { id: "f2", text: "introduced contactless fare gates" },
      { id: "f3", text: "to shorten commuter bottlenecks" },
      { id: "f4", text: "at major subway terminals" }
    ],
    correctOrder: ["f1", "f2", "f4", "f3"],
    explanation: "'The municipal transport authority introduced contactless fare gates at major subway terminals to shorten commuter bottlenecks' places location before purpose naturally.",
    learningObjective: "Sequence civic transit infrastructure modernization statements.",
    tags: ["order", "transit", "b2"]
  },
  {
    id: "order.medium.0032",
    category: "sentence-arrangement",
    subcategory: "corporate ethics",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into an ethics policy sentence.",
    fragments: [
      { id: "f1", text: "the audit committee instituted" },
      { id: "f2", text: "an anonymous reporting hotline" },
      { id: "f3", text: "to protect corporate whistleblowers" },
      { id: "f4", text: "from workplace retaliation" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'The audit committee instituted an anonymous reporting hotline to protect corporate whistleblowers from workplace retaliation' is cohesive and purposeful.",
    learningObjective: "Order corporate compliance governance actions.",
    tags: ["order", "compliance", "b2"]
  },
  {
    id: "order.medium.0033",
    category: "sentence-arrangement",
    subcategory: "software engineering",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a software development sentence.",
    fragments: [
      { id: "f1", text: "by containerizing microservices" },
      { id: "f2", text: "the DevOps team achieved" },
      { id: "f3", text: "seamless continuous deployment" },
      { id: "f4", text: "across hybrid cloud servers" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'By containerizing microservices, the DevOps team achieved seamless continuous deployment across hybrid cloud servers' balances technical means and ends.",
    learningObjective: "Order software engineering technical process descriptions.",
    tags: ["order", "devops", "b2"]
  },
  {
    id: "order.medium.0034",
    category: "sentence-arrangement",
    subcategory: "renewable energy",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a clean energy statement.",
    fragments: [
      { id: "f1", text: "offshore wind turbines generate" },
      { id: "f2", text: "electricity more consistently" },
      { id: "f3", text: "than onshore installations" },
      { id: "f4", text: "due to stronger coastal winds" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'Offshore wind turbines generate electricity more consistently than onshore installations due to stronger coastal winds' follows comparative logic smoothly.",
    learningObjective: "Sequence comparative technological explanations.",
    tags: ["order", "energy", "b2"]
  },
  {
    id: "order.medium.0035",
    category: "sentence-arrangement",
    subcategory: "materials science",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Arrange the fragments into a materials science sentence.",
    fragments: [
      { id: "f1", text: "graphene composite materials" },
      { id: "f2", text: "possess exceptional tensile strength" },
      { id: "f3", text: "while remaining remarkably lightweight" },
      { id: "f4", text: "for aerospace fabrication" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'Graphene composite materials possess exceptional tensile strength while remaining remarkably lightweight for aerospace fabrication' communicates physical properties clearly.",
    learningObjective: "Order complex chemical and materials property descriptions.",
    tags: ["order", "materials", "b2"]
  },

  // ===================== HARD (C1 - C2) - 25 Questions =====================
  {
    id: "order.hard.0001",
    category: "sentence-arrangement",
    subcategory: "negative inversion",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into a formal, inverted literary sentence.",
    fragments: [
      { id: "f1", text: "such breathtaking cross-functional agility" },
      { id: "f2", text: "seldom have industry observers" },
      { id: "f3", text: "witnessed in a legacy conglomerate" },
      { id: "f4", text: "undergoing digital transformation" }
    ],
    correctOrder: ["f2", "f3", "f1", "f4"],
    explanation: "Negative inversion order: 'Seldom have industry observers witnessed in a legacy conglomerate such breathtaking cross-functional agility undergoing digital transformation.'",
    learningObjective: "Construct negative inversion sentences with heavy direct object shifting.",
    tags: ["order", "inversion", "c1"]
  },
  {
    id: "order.hard.0002",
    category: "sentence-arrangement",
    subcategory: "correlative inversion",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into an inverted correlative sentence.",
    fragments: [
      { id: "f1", text: "than the boardroom erupted" },
      { id: "f2", text: "had the executive resignation been announced" },
      { id: "f3", text: "no sooner" },
      { id: "f4", text: "in contentious shareholder accusations" }
    ],
    correctOrder: ["f3", "f2", "f1", "f4"],
    explanation: "'No sooner had the executive resignation been announced than the boardroom erupted in contentious shareholder accusations' maintains strict correlative inversion.",
    learningObjective: "Sequence 'no sooner had + S + V3... than' inverted sentences.",
    tags: ["order", "correlative", "inversion", "c1"]
  },
  {
    id: "order.hard.0003",
    category: "sentence-arrangement",
    subcategory: "absolute participle",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into a formal absolute construction.",
    fragments: [
      { id: "f1", text: "the contentious treaty negotiations having concluded" },
      { id: "f2", text: "the diplomatic envoys convened" },
      { id: "f3", text: "without an enforceable armistice" },
      { id: "f4", text: "to draft emergency contingency protocols" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'The contentious treaty negotiations having concluded without an enforceable armistice, the diplomatic envoys convened to draft emergency contingency protocols' exemplifies a nominative absolute.",
    learningObjective: "Construct nominative absolute participle clauses preceding main finite predications.",
    tags: ["order", "absolute-construction", "c2"]
  },
  {
    id: "order.hard.0004",
    category: "sentence-arrangement",
    subcategory: "fronted comparative",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into an inverted comparative emphasis sentence.",
    fragments: [
      { id: "f1", text: "when the telemetry connection failed" },
      { id: "f2", text: "greater still was the astonishment" },
      { id: "f3", text: "of the astrophysics team" },
      { id: "f4", text: "prior to atmospheric insertion" }
    ],
    correctOrder: ["f2", "f3", "f1", "f4"],
    explanation: "'Greater still was the astonishment of the astrophysics team when the telemetry connection failed prior to atmospheric insertion' follows fronted comparative copular inversion.",
    learningObjective: "Order fronted comparative adjective clauses with copular inversion.",
    tags: ["order", "inversion", "predicates", "c2"]
  },
  {
    id: "order.hard.0005",
    category: "sentence-arrangement",
    subcategory: "inverted condition",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into a formal inverted second conditional.",
    fragments: [
      { id: "f1", text: "the judicial oversight panel" },
      { id: "f2", text: "were the state prosecutor to withhold" },
      { id: "f3", text: "would declare an immediate mistrial" },
      { id: "f4", text: "exculpatory forensic evidence" }
    ],
    correctOrder: ["f2", "f4", "f1", "f3"],
    explanation: "'Were the state prosecutor to withhold exculpatory forensic evidence, the judicial oversight panel would declare an immediate mistrial' follows 'Were + S + to-V' syntax.",
    learningObjective: "Sequence inverted hypothetical conditionals.",
    tags: ["order", "conditionals", "c1"]
  },
  {
    id: "order.hard.0006",
    category: "sentence-arrangement",
    subcategory: "scarcely... when",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into an inverted literary sentence.",
    fragments: [
      { id: "f1", text: "when the structural alarms sounded" },
      { id: "f2", text: "scarcely had the deep-sea submersible" },
      { id: "f3", text: "reached the abyssal trench" },
      { id: "f4", text: "indicating catastrophic hull pressure" }
    ],
    correctOrder: ["f2", "f3", "f1", "f4"],
    explanation: "'Scarcely had the deep-sea submersible reached the abyssal trench when the structural alarms sounded indicating catastrophic hull pressure' is grammatically exact.",
    learningObjective: "Order 'scarcely had... when' inverted narratives.",
    tags: ["order", "inversion", "c1"]
  },
  {
    id: "order.hard.0007",
    category: "sentence-arrangement",
    subcategory: "locative inversion",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into a locative inverted sentence.",
    fragments: [
      { id: "f1", text: "stood a crumbling fortress" },
      { id: "f2", text: "at the desolate summit" },
      { id: "f3", text: "overlooking the turbulent sea" },
      { id: "f4", text: "of the granite cliff" }
    ],
    correctOrder: ["f2", "f4", "f1", "f3"],
    explanation: "'At the desolate summit of the granite cliff stood a crumbling fortress overlooking the turbulent sea' exemplifies full locative inversion without auxiliaries.",
    learningObjective: "Construct full locative inversion with post-modifying participial phrases.",
    tags: ["order", "inversion", "locative", "c2"]
  },
  {
    id: "order.hard.0008",
    category: "sentence-arrangement",
    subcategory: "cleft sentence with adverbial",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into an emphatic cleft sentence.",
    fragments: [
      { id: "f1", text: "it was with profound reluctance" },
      { id: "f2", text: "that the lead diplomat signed" },
      { id: "f3", text: "without territorial guarantees" },
      { id: "f4", text: "the provisional armistice agreement" }
    ],
    correctOrder: ["f1", "f2", "f4", "f3"],
    explanation: "'It was with profound reluctance that the lead diplomat signed the provisional armistice agreement without territorial guarantees' emphasizes the adverbial prepositional phrase.",
    learningObjective: "Order 'it'-cleft sentences with fronted prepositional adverbials.",
    tags: ["order", "cleft", "c1"]
  },
  {
    id: "order.hard.0009",
    category: "sentence-arrangement",
    subcategory: "mandative subjunctive",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into a formal statutory mandate.",
    fragments: [
      { id: "f1", text: "that each sovereign signatory" },
      { id: "f2", text: "the environmental treaty mandates" },
      { id: "f3", text: "reduce industrial carbon emissions" },
      { id: "f4", text: "by forty percent before twenty-thirty" }
    ],
    correctOrder: ["f2", "f1", "f3", "f4"],
    explanation: "'The environmental treaty mandates that each sovereign signatory reduce industrial carbon emissions by forty percent before twenty-thirty' uses mandative base verb 'reduce'.",
    learningObjective: "Sequence mandative subjunctive clauses.",
    tags: ["order", "subjunctive", "c1"]
  },
  {
    id: "order.hard.0010",
    category: "sentence-arrangement",
    subcategory: "so... that inversion",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into an inverted degree sentence.",
    fragments: [
      { id: "f1", text: "so acute was the shortage" },
      { id: "f2", text: "that automobile assembly lines" },
      { id: "f3", text: "were suspended for six weeks" },
      { id: "f4", text: "of semiconductor microchips" }
    ],
    correctOrder: ["f1", "f4", "f2", "f3"],
    explanation: "'So acute was the shortage of semiconductor microchips that automobile assembly lines were suspended for six weeks' follows fronted 'So + adj' inversion.",
    learningObjective: "Order 'so + adjective + copula' inverted result structures.",
    tags: ["order", "inversion", "degree", "c2"]
  },
  {
    id: "order.hard.0011",
    category: "sentence-arrangement",
    subcategory: "negative restriction",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into a formal restrictive notice.",
    fragments: [
      { id: "f1", text: "may classified clinical trial data" },
      { id: "f2", text: "under no circumstances" },
      { id: "f3", text: "without cryptographic encryption" },
      { id: "f4", text: "be transmitted via public networks" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'Under no circumstances may classified clinical trial data be transmitted via public networks without cryptographic encryption' follows restrictive modal inversion.",
    learningObjective: "Construct restrictive modal inversion sentences.",
    tags: ["order", "inversion", "modal", "c1"]
  },
  {
    id: "order.hard.0012",
    category: "sentence-arrangement",
    subcategory: "wh-cleft agreement",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into an analytical wh-cleft sentence.",
    fragments: [
      { id: "f1", text: "was the total absence" },
      { id: "f2", text: "what confounded the forensic accountants" },
      { id: "f3", text: "of verifiable transaction receipts" },
      { id: "f4", text: "in the offshore corporate ledgers" }
    ],
    correctOrder: ["f2", "f1", "f3", "f4"],
    explanation: "'What confounded the forensic accountants was the total absence of verifiable transaction receipts in the offshore corporate ledgers' maintains singular copula focus.",
    learningObjective: "Sequence wh-cleft nominal sentences.",
    tags: ["order", "cleft", "c1"]
  },
  {
    id: "order.hard.0013",
    category: "sentence-arrangement",
    subcategory: "reduced passive clause",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into a reduced conditional sentence.",
    fragments: [
      { id: "f1", text: "unless explicitly instructed otherwise" },
      { id: "f2", text: "all hospital surgical teams" },
      { id: "f3", text: "by the infectious disease panel" },
      { id: "f4", text: "must follow level-four bio-containment" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'Unless explicitly instructed otherwise by the infectious disease panel, all hospital surgical teams must follow level-four bio-containment' preserves reduced passive condition logic.",
    learningObjective: "Order reduced passive conditional clauses.",
    tags: ["order", "reduced-clauses", "c2"]
  },
  {
    id: "order.hard.0014",
    category: "sentence-arrangement",
    subcategory: "inversion with 'little'",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into an inverted cognitive sentence.",
    fragments: [
      { id: "f1", text: "did the corporate executives anticipate" },
      { id: "f2", text: "that an internal whistleblower" },
      { id: "f3", text: "little" },
      { id: "f4", text: "had already notified federal prosecutors" }
    ],
    correctOrder: ["f3", "f1", "f2", "f4"],
    explanation: "'Little did the corporate executives anticipate that an internal whistleblower had already notified federal prosecutors' follows initial 'Little' inversion.",
    learningObjective: "Apply negative inversion with cognitive verb complements.",
    tags: ["order", "inversion", "c1"]
  },
  {
    id: "order.hard.0015",
    category: "sentence-arrangement",
    subcategory: "concession with 'as'",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into an inverted concession clause.",
    fragments: [
      { id: "f1", text: "she passed the bar examination" },
      { id: "f2", text: "demanding as the curriculum was" },
      { id: "f3", text: "on her first attempt" },
      { id: "f4", text: "with highest honors" }
    ],
    correctOrder: ["f2", "f1", "f4", "f3"],
    explanation: "'Demanding as the curriculum was, she passed the bar examination with highest honors on her first attempt' follows 'Adj + as + S + V' concession syntax.",
    learningObjective: "Construct inverted concession sentences using 'as'.",
    tags: ["order", "concession", "c2"]
  },
  {
    id: "order.hard.0016",
    category: "sentence-arrangement",
    subcategory: "inversion with 'not until'",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into an inverted temporal narrative.",
    fragments: [
      { id: "f1", text: "did the search and rescue team perceive" },
      { id: "f2", text: "not until the morning sun cleared the ridge" },
      { id: "f3", text: "the catastrophic destruction" },
      { id: "f4", text: "wrought by the glacial avalanche" }
    ],
    correctOrder: ["f2", "f1", "f3", "f4"],
    explanation: "'Not until the morning sun cleared the ridge did the search and rescue team perceive the catastrophic destruction wrought by the glacial avalanche' represents 'Not until' main clause inversion.",
    learningObjective: "Sequence main clause inversion following 'Not until' temporal clauses.",
    tags: ["order", "inversion", "c1"]
  },
  {
    id: "order.hard.0017",
    category: "sentence-arrangement",
    subcategory: "inversion with 'such'",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into an emphatic 'Such was...' inversion.",
    fragments: [
      { id: "f1", text: "such was the analytical brilliance" },
      { id: "f2", text: "that delegates gave a standing ovation" },
      { id: "f3", text: "of the keynote address" },
      { id: "f4", text: "at the international symposium" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'Such was the analytical brilliance of the keynote address that delegates gave a standing ovation at the international symposium' maintains emphatic 'Such was...' structure.",
    learningObjective: "Order emphatic inverted sentences beginning with 'Such was'.",
    tags: ["order", "inversion", "emphasis", "c2"]
  },
  {
    id: "order.hard.0018",
    category: "sentence-arrangement",
    subcategory: "archaic subjunctive 'lest'",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into a formal cautionary sentence.",
    fragments: [
      { id: "f1", text: "lest proprietary trade secrets" },
      { id: "f2", text: "the research protocols were sealed" },
      { id: "f3", text: "be intercepted by commercial rivals" },
      { id: "f4", text: "in competing jurisdictions" }
    ],
    correctOrder: ["f2", "f1", "f3", "f4"],
    explanation: "'The research protocols were sealed lest proprietary trade secrets be intercepted by commercial rivals in competing jurisdictions' illustrates subjunctive mood after 'lest'.",
    learningObjective: "Sequence cautionary subjunctive clauses governed by 'lest'.",
    tags: ["order", "subjunctive", "c2"]
  },
  {
    id: "order.hard.0019",
    category: "sentence-arrangement",
    subcategory: "third conditional inversion",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into an inverted past counterfactual.",
    fragments: [
      { id: "f1", text: "had the forensic audit identified" },
      { id: "f2", text: "the insolvency petition" },
      { id: "f3", text: "the accounting irregularities earlier" },
      { id: "f4", text: "could have been averted entirely" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'Had the forensic audit identified the accounting irregularities earlier, the insolvency petition could have been averted entirely' follows 'Had + S + V3' inversion.",
    learningObjective: "Construct past conditional inversion sentences.",
    tags: ["order", "conditionals", "c1"]
  },
  {
    id: "order.hard.0020",
    category: "sentence-arrangement",
    subcategory: "elliptical parallel coordination",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into a parallel sentence with gapping.",
    fragments: [
      { id: "f1", text: "some philosophers advocate empiricism" },
      { id: "f2", text: "yet both schools illuminate" },
      { id: "f3", text: "others rationalism" },
      { id: "f4", text: "the nature of epistemological inquiry" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'Some philosophers advocate empiricism, others rationalism, yet both schools illuminate the nature of epistemological inquiry' demonstrates balanced elliptical verb gapping.",
    learningObjective: "Order elliptical coordinate clauses with verb gapping.",
    tags: ["order", "parallelism", "c2"]
  },
  {
    id: "order.hard.0021",
    category: "sentence-arrangement",
    subcategory: "inversion with 'nowhere'",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into a spatial negative inversion.",
    fragments: [
      { id: "f1", text: "nowhere in the diplomatic record" },
      { id: "f2", text: "is there any documentation" },
      { id: "f3", text: "of an alternative armistice draft" },
      { id: "f4", text: "signed in nineteen forty-five" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'Nowhere in the diplomatic record is there any documentation of an alternative armistice draft signed in nineteen forty-five' exemplifies spatial negative inversion.",
    learningObjective: "Order negative spatial inversion with existential 'there'.",
    tags: ["order", "inversion", "c2"]
  },
  {
    id: "order.hard.0022",
    category: "sentence-arrangement",
    subcategory: "correlative inversion with 'not only'",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into an inverted correlative sentence.",
    fragments: [
      { id: "f1", text: "not only did the defense team" },
      { id: "f2", text: "dismantle the prosecution's witness testimony" },
      { id: "f3", text: "they secured an acquittal" },
      { id: "f4", text: "but within three hours" }
    ],
    correctOrder: ["f1", "f2", "f4", "f3"],
    explanation: "'Not only did the defense team dismantle the prosecution's witness testimony, but within three hours they secured an acquittal' maintains correlative inversion.",
    learningObjective: "Sequence inverted correlatives with initial 'Not only did'.",
    tags: ["order", "correlative", "inversion", "c1"]
  },
  {
    id: "order.hard.0023",
    category: "sentence-arrangement",
    subcategory: "participle clause of concession",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into an inverted participle concession.",
    fragments: [
      { id: "f1", text: "cognizant though the board was" },
      { id: "f2", text: "they approved the takeover bid" },
      { id: "f3", text: "of potential antitrust hurdles" },
      { id: "f4", text: "unanimously at midnight" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'Cognizant though the board was of potential antitrust hurdles, they approved the takeover bid unanimously at midnight' follows inverted concessive structure.",
    learningObjective: "Order participial adjectives with 'though' in concession clauses.",
    tags: ["order", "concession", "c2"]
  },
  {
    id: "order.hard.0024",
    category: "sentence-arrangement",
    subcategory: "formulaic subjunctive",
    difficulty: "hard",
    cefr: "C2",
    prompt: "Arrange the fragments into a formal rhetorical statement.",
    fragments: [
      { id: "f1", text: "be that as it may" },
      { id: "f2", text: "must strictly adhere to statutory law" },
      { id: "f3", text: "the supreme judicial tribunal" },
      { id: "f4", text: "regardless of public sentiment" }
    ],
    correctOrder: ["f1", "f3", "f2", "f4"],
    explanation: "'Be that as it may, the supreme judicial tribunal must strictly adhere to statutory law regardless of public sentiment' incorporates formulaic subjunctive concession.",
    learningObjective: "Position formulaic subjunctive idioms at sentence head.",
    tags: ["order", "subjunctive", "c2"]
  },
  {
    id: "order.hard.0025",
    category: "sentence-arrangement",
    subcategory: "inversion with 'only by'",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Arrange the fragments into a conditional means inversion.",
    fragments: [
      { id: "f1", text: "only by standardizing protocols" },
      { id: "f2", text: "can the global aerospace consortium" },
      { id: "f3", text: "mitigate catastrophic collision risks" },
      { id: "f4", text: "in low Earth orbit" }
    ],
    correctOrder: ["f1", "f2", "f3", "f4"],
    explanation: "'Only by standardizing protocols can the global aerospace consortium mitigate catastrophic collision risks in low Earth orbit' follows 'Only by + gerund + modal + subject + verb'.",
    learningObjective: "Construct inverted conditional sentences initiated by 'Only by'.",
    tags: ["order", "inversion", "modal", "c1"]
  }
];

export function getAuditedOrderQuestions(): Question[] {
  return rawOrderDefs.map((def) => buildSentenceOrder(def));
}
