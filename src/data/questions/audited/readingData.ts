import { Question } from "../../../domain/questions/schema.ts";
import { ReadingSingleChoiceDef, buildReadingSingleChoice } from "./helpers.ts";

export const rawReadingPassages = [
  // --- Passages 1 to 10 (as defined previously) ---
  {
    id: "pass-microgrids-01",
    title: "Renewable Microgrids",
    passage: `Decentralized energy microgrids represent a transformative paradigm shift in modern civil infrastructure. Unlike conventional centralized grids—where power is generated in massive regional stations and transmitted over hundreds of kilometers with significant thermodynamic line loss—microgrids generate, store, and distribute electricity locally using solar photovoltaics, wind turbines, and advanced lithium-iron-phosphate battery storage. When regional grids experience catastrophic outages during severe meteorological events, intelligent automated switchgear instantaneously islands the microgrid, decoupling it from the macrogrid to provide uninterrupted power to critical community facilities like hospitals and water purification plants. Moreover, peer-to-peer digital energy markets allow residential prosumers to automatically trade surplus stored kilowatt-hours across distributed ledgers, establishing localized energy autonomy while stabilizing macro-system voltage fluctuations.`,
    questions: [
      {
        id: "reading.pass01.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What is the primary benefit of microgrids during severe meteorological events according to the text?",
        correct: "They can decouple from the macrogrid to maintain uninterrupted power for essential facilities.",
        distractors: [
          "They permanently shut down all electricity distribution to prevent equipment fires.",
          "They sell power exclusively to centralized fossil fuel generators.",
          "They eliminate the need for any local energy storage or batteries."
        ],
        explanation: "The passage explicitly notes that intelligent switchgear instantaneously 'islands the microgrid, decoupling it from the macrogrid to provide uninterrupted power to critical community facilities'.",
        learningObjective: "Extract primary operational justifications from technical descriptive texts.",
        tags: ["reading", "detail", "energy"]
      },
      {
        id: "reading.pass01.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "How do conventional centralized grids compare to microgrids regarding electricity transmission?",
        correct: "Centralized grids suffer significant thermodynamic line losses over long transmission distances.",
        distractors: [
          "Centralized grids generate electricity purely on residential rooftops.",
          "Centralized grids rely entirely on peer-to-peer distributed ledgers.",
          "Centralized grids produce zero carbon emissions during transmission."
        ],
        explanation: "The passage states that conventional grids transmit power over hundreds of kilometers 'with significant thermodynamic line loss'.",
        learningObjective: "Identify explicit comparative details in expository prose.",
        tags: ["reading", "comparison", "infrastructure"]
      },
      {
        id: "reading.pass01.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What does the term 'prosumers' most likely refer to in the context of the passage?",
        correct: "Individuals who both consume electricity and generate surplus power locally.",
        distractors: [
          "Corporate utility executives who manage regional power grids.",
          "Industrial manufacturers that produce lithium-iron-phosphate batteries.",
          "Government regulators who inspect municipal power lines."
        ],
        explanation: "'Prosumer' blends 'producer' and 'consumer', referring here to residential users who generate and trade surplus energy.",
        learningObjective: "Infer contextual meaning of technical portmanteau terms.",
        tags: ["reading", "vocabulary", "economics"]
      },
      {
        id: "reading.pass01.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "What can be logically inferred regarding the impact of peer-to-peer energy trading on the broader electrical system?",
        correct: "Decentralized trading assists in mitigating macro-level voltage instability.",
        distractors: [
          "It forces regional utility companies into immediate liquidation.",
          "It increases residential electricity costs exponentially.",
          "It requires manual intervention by utility engineers for every transaction."
        ],
        explanation: "The final sentence states that peer-to-peer trading establishes localized autonomy 'while stabilizing macro-system voltage fluctuations'.",
        learningObjective: "Draw logical inferences regarding systemic outcomes from scientific texts.",
        tags: ["reading", "inference", "systems"]
      }
    ]
  },
  {
    id: "pass-cognitive-bias-02",
    title: "Cognitive Biases in Corporate Governance",
    passage: `In strategic decision-making, corporate leadership teams frequently fall prey to systemic cognitive distortions that undermine analytical objectivity. Chief among these is the sunk cost fallacy: the psychological tendency to persist in pouring capital into failing initiatives simply because substantial resources have already been invested, rather than objectively evaluating future expected utility. This distortion is frequently compounded by confirmation bias, wherein executives subconsciously filter incoming market data, giving disproportionate weight to anecdotal indicators that corroborate their preconceived strategy while aggressively discounting robust quantitative anomalies that contradict it. To counteract these heuristics, forward-thinking enterprises mandate institutionalized 'red-teaming'—appointing an independent internal cadre tasked explicitly with dissecting strategic consensus, stress-testing core hypotheses, and presenting rigorous contrarian scenarios before capital deployment is ratified.`,
    questions: [
      {
        id: "reading.pass02.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "According to the passage, what is the main purpose of 'red-teaming'?",
        correct: "To challenge strategic consensus and stress-test core hypotheses before investing capital.",
        distractors: [
          "To reward executives who achieve short-term sales targets.",
          "To eliminate all independent critical reviews in project planning.",
          "To justify continued investment into failing corporate ventures."
        ],
        explanation: "The passage explains that red-teaming involves 'appointing an independent internal cadre tasked explicitly with dissecting strategic consensus, stress-testing core hypotheses'.",
        learningObjective: "Identify explicit organizational procedural solutions.",
        tags: ["reading", "governance", "strategy"]
      },
      {
        id: "reading.pass02.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "How does the sunk cost fallacy influence executive decision-making?",
        correct: "It motivates leaders to continue funding doomed projects due to past investments.",
        distractors: [
          "It prompts executives to terminate profitable initiatives immediately.",
          "It prevents companies from hiring external management consultants.",
          "It causes organizations to diversify into unrelated international sectors."
        ],
        explanation: "The text defines the sunk cost fallacy as 'the psychological tendency to persist in pouring capital into failing initiatives simply because substantial resources have already been invested'.",
        learningObjective: "Recognize definitions of psychological behavioral heuristics.",
        tags: ["reading", "psychology", "heuristics"]
      },
      {
        id: "reading.pass02.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "The word 'heuristics' in line 8 is closest in meaning to:",
        correct: "Mental shortcuts or cognitive rules of thumb.",
        distractors: [
          "Mathematical equations.",
          "Financial accounting balance sheets.",
          "Statutory regulatory penalties."
        ],
        explanation: "In behavioral psychology, 'heuristics' refers to mental shortcuts that simplify decision-making but often introduce cognitive bias.",
        learningObjective: "Determine contextual meaning of psychological terminology.",
        tags: ["reading", "vocabulary", "psychology"]
      },
      {
        id: "reading.pass02.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "What underlying assumption does the author make about human decision-makers in leadership positions?",
        correct: "They are inherently vulnerable to subconscious psychological traps without formal counter-mechanisms.",
        distractors: [
          "They intentionally sabotage corporate investments for personal financial gain.",
          "They possess flawless mathematical objectivity in volatile markets.",
          "They rely exclusively on quantitative algorithms rather than human intuition."
        ],
        explanation: "The author argues that leaders 'frequently fall prey' to subconscious distortions, necessitating institutionalized counter-mechanisms like red-teaming.",
        learningObjective: "Infer unstated analytical premises from argumentative expository texts.",
        tags: ["reading", "inference", "critical-thinking"]
      }
    ]
  },
  {
    id: "pass-urban-forestry-03",
    title: "Urban Forest Microclimates",
    passage: `Urban canopies—the overarching layer of foliage formed by mature city trees—deliver ecosystem services far exceeding simple civic beautification. Microclimate empirical modeling demonstrates that strategically sited deciduous street trees can lower local ambient summer temperatures by two to four degrees Celsius through evapotranspiration and direct solar interception. Furthermore, expansive tree root networks stabilize metropolitan soils against stormwater surges, operating as natural bio-retention filtration matrices that alleviate hydrodynamic pressure on aging municipal drainage infrastructure. Despite these documented thermodynamic and hydrological dividends, municipal planners frequently face severe spatial competition from underground utility corridors and aboveground transportation easements. Consequently, enduring urban forestry initiatives require cross-sectoral zoning legislation that mandates minimum root-zone soil volumes prior to civil development approvals.`,
    questions: [
      {
        id: "reading.pass03.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "According to the passage, how do street trees cool city temperatures?",
        correct: "Through evapotranspiration and direct interception of solar radiation.",
        distractors: [
          "By pumping cold groundwater onto metropolitan asphalt roads.",
          "By reflecting light using synthetic leaf coatings.",
          "By absorbing automobile exhaust fumes into root networks."
        ],
        explanation: "The text explains that trees lower summer temperatures 'through evapotranspiration and direct solar interception'.",
        learningObjective: "Extract scientific factual explanations from informational texts.",
        tags: ["reading", "detail", "ecology"]
      },
      {
        id: "reading.pass03.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What hydrological benefit do mature tree root networks provide to cities?",
        correct: "They filter and absorb stormwater surges, reducing strain on drainage systems.",
        distractors: [
          "They completely prevent all underground utility pipeline repairs.",
          "They eliminate the need for drinking water purification plants.",
          "They double municipal groundwater salinity levels."
        ],
        explanation: "The root networks 'stabilize metropolitan soils against stormwater surges, operating as natural bio-retention filtration matrices that alleviate hydrodynamic pressure on aging municipal drainage'.",
        learningObjective: "Identify explicit environmental infrastructure interactions.",
        tags: ["reading", "environment", "civil-engineering"]
      },
      {
        id: "reading.pass03.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What primary obstacle complicates urban tree planting in dense metropolitan areas?",
        correct: "Competing spatial demands from subterranean utilities and transit corridors.",
        distractors: [
          "A universal shortage of commercial landscape architects.",
          "Extreme citizen opposition to civic greenery.",
          "The complete absence of deciduous tree species."
        ],
        explanation: "Planners face 'severe spatial competition from underground utility corridors and aboveground transportation easements'.",
        learningObjective: "Identify operational conflicts in municipal planning.",
        tags: ["reading", "urban-planning", "analysis"]
      },
      {
        id: "reading.pass03.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The author concludes that successful urban forestry programs ultimately depend on:",
        correct: "Legislative zoning mandates that legally protect underground root soil space.",
        distractors: [
          "Replacing civil engineers with professional botanists.",
          "Banning all subterranean utility cables in residential zones.",
          "Planting only non-deciduous evergreen shrubs."
        ],
        explanation: "The passage concludes that sustainable initiatives 'require cross-sectoral zoning legislation that mandates minimum root-zone soil volumes prior to civil development approvals'.",
        learningObjective: "Synthesize concluding policy recommendations from complex expository texts.",
        tags: ["reading", "policy", "conclusion"]
      }
    ]
  },
  {
    id: "pass-algo-trading-04",
    title: "High-Frequency Algorithmic Trading",
    passage: `High-frequency trading (HFT) platforms have radically reorganized global capital markets over the past two decades. Operating via proprietary statistical arbitrage algorithms deployed on colocation servers situated physical meters away from exchange matching engines, HFT market makers execute millions of equity and derivative transactions in sub-millisecond intervals. Proponents contend that this algorithmic liquidity provision compresses the bid-ask spread to historic lows, dramatically lowering transaction friction for retail and institutional investors alike. However, financial stability watchdogs counter that algorithmic liquidity is notoriously fickle; during periods of extreme systemic volatility, quantitative algorithms automatically withdraw liquidity en masse to preserve capital, precipitating liquidity vacuums and triggering rapid 'flash crashes' that reverberate throughout the macroeconomy.`,
    questions: [
      {
        id: "reading.pass04.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What argument do supporters make in favor of high-frequency trading?",
        correct: "It narrows the bid-ask spread and reduces transaction costs for investors.",
        distractors: [
          "It completely eliminates market volatility during financial crises.",
          "It guarantees steady profits for all retail day traders.",
          "It replaces public exchanges with physical trading pits."
        ],
        explanation: "The passage notes that proponents argue HFT 'compresses the bid-ask spread to historic lows, dramatically lowering transaction friction for retail and institutional investors'.",
        learningObjective: "Identify arguments in favor of controversial financial innovations.",
        tags: ["reading", "finance", "markets"]
      },
      {
        id: "reading.pass04.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "Why do HFT firms site their servers physical meters from exchange matching engines?",
        correct: "To minimize latency and execute trades at sub-millisecond speeds.",
        distractors: [
          "To avoid paying local telecommunication utility taxes.",
          "To allow manual keyboard entry by human floor traders.",
          "To physically protect servers from weather-related damage."
        ],
        explanation: "Locating servers adjacent to matching engines (colocation) minimizes network latency to achieve 'sub-millisecond intervals'.",
        learningObjective: "Analyze technological optimizations in quantitative finance.",
        tags: ["reading", "technology", "finance"]
      },
      {
        id: "reading.pass04.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "In the passage, the word 'fickle' in line 8 means:",
        correct: "Unreliable and quick to disappear when conditions change.",
        distractors: [
          "Legally binding and permanent.",
          "Extremely expensive to purchase.",
          "Carefully regulated by government agencies."
        ],
        explanation: "'Fickle' denotes changeability and unreliability; here, algorithmic liquidity vanishes during volatile periods.",
        learningObjective: "Deduce contextual meaning of evaluative adjectives.",
        tags: ["reading", "vocabulary", "markets"]
      },
      {
        id: "reading.pass04.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "Which of the following describes the author's primary attitude toward high-frequency trading?",
        correct: "Balanced and objective, acknowledging market efficiency gains alongside systemic instability risks.",
        distractors: [
          "Unabashedly celebratory, dismissing all regulatory concerns as groundless paranoia.",
          "Openly hostile, calling for an immediate international prohibition of algorithmic trading.",
          "Indifferent and sarcastic, mocking both traders and financial regulators."
        ],
        explanation: "The author neutrally presents both the benefits (narrower spreads, lower friction) and significant risks (liquidity vacuums, flash crashes).",
        learningObjective: "Evaluate authorial stance and rhetorical tone.",
        tags: ["reading", "tone", "critical-analysis"]
      }
    ]
  },
  {
    id: "pass-deep-sea-vents-05",
    title: "Chemosynthesis at Hydrothermal Vents",
    passage: `The discovery of deep-sea hydrothermal vents in 1977 overturned one of the most entrenched dogmas of biological science: that all complex macroscopic ecosystems are fundamentally dependent on sunlight and photoautotrophic primary production. Located thousands of meters beneath the oceanic surface along tectonic spreading centers, these benthic hydrothermal chimneys spew mineral-laden superheated fluids rich in hydrogen sulfide into near-freezing abyssal waters. In total perpetual darkness and under crushing hydrostatic pressure, specialized chemoautotrophic bacteria synthesize organic carbohydrates by oxidizing inorganic sulfide compounds. These microbes form obligate endosymbiotic partnerships with bizarre fauna, such as giant vestimentiferan tube worms that lack mouths, digestive tracts, or guts entirely, relying entirely on internal bacterial trophosomes for nourishment. Astrobiologists now view these extreme ecosystems as our premier planetary analogs for potential extraterrestrial life within the sub-surface oceans of Europa and Enceladus.`,
    questions: [
      {
        id: "reading.pass05.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What long-held scientific belief was overturned by the discovery of hydrothermal vents?",
        correct: "The belief that all complex ecosystems depend fundamentally on sunlight.",
        distractors: [
          "The idea that tectonic plates move along spreading centers.",
          "The hypothesis that bacteria can cause human illnesses.",
          "The concept that oceans contain mineral-rich waters."
        ],
        explanation: "The opening sentence notes that vents overturned the dogma 'that all complex macroscopic ecosystems are fundamentally dependent on sunlight'.",
        learningObjective: "Identify paradigm-shifting scientific discoveries.",
        tags: ["reading", "biology", "history-of-science"]
      },
      {
        id: "reading.pass05.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "How do giant tube worms obtain their organic nourishment?",
        correct: "From symbiotic bacteria residing in their internal trophosome tissue.",
        distractors: [
          "By consuming smaller benthic crustaceans through their mouths.",
          "By performing photosynthesis using bioluminescent deep-sea light.",
          "By filtering phytoplankton drifting down from surface waters."
        ],
        explanation: "Tube worms lack mouths and guts, 'relying entirely on internal bacterial trophosomes for nourishment'.",
        learningObjective: "Extract factual physiological mechanisms from biological texts.",
        tags: ["reading", "symbiosis", "marine-biology"]
      },
      {
        id: "reading.pass05.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "Why are astrobiologists particularly fascinated by deep-sea hydrothermal vents?",
        correct: "They provide real-world models for life that could exist in ice-covered alien oceans.",
        distractors: [
          "They demonstrate that space travel can be powered by hydrogen sulfide.",
          "They prove that tube worms originated from the moons of Jupiter.",
          "They reveal that extraterrestrial spacecraft crash frequently into the ocean."
        ],
        explanation: "Astrobiologists view these ecosystems 'as our premier planetary analogs for potential extraterrestrial life within the sub-surface oceans of Europa and Enceladus'.",
        learningObjective: "Connect terrestrial scientific discoveries with astrobiological hypotheses.",
        tags: ["reading", "astrobiology", "inference"]
      },
      {
        id: "reading.pass05.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The word 'chemoautotrophic' refers to organisms that:",
        correct: "Synthesize their own organic food using energy derived from chemical reactions rather than sunlight.",
        distractors: [
          "Require organic meat from other animals to survive.",
          "Are poisoned by the presence of inorganic sulfur compounds.",
          "Survive only at elevated atmospheric pressures on land."
        ],
        explanation: "'Chemoautotrophic' combines chemo- (chemical) and auto-trophic (self-feeding), meaning creating food from inorganic chemical reactions.",
        learningObjective: "Decipher biological compound Greek/Latin terminology in context.",
        tags: ["reading", "morphology", "scientific-lexis"]
      }
    ]
  },
  {
    id: "pass-async-remote-06",
    title: "The Architecture of Asynchronous Remote Work",
    passage: `While the initial wave of corporate remote work attempted to mimic the physical office through relentless video conferences and continuous chat alerts, mature distributed organizations have embraced an asynchronous-first communication paradigm. In an asynchronous architecture, immediate synchronous response is not only unprompted; it is actively discouraged. Team members document specifications, code changes, and design decisions in permanent, searchable written repositories, allowing colleagues spanning divergent time zones to review and contribute during their respective peak cognitive hours. This operational discipline radically curtails attention fragmentation, fostering prolonged states of uninterrupted deep work. However, the paradigm demands rigorous self-management and exceptional written communicative precision; organizations lacking documentation literacy frequently experience ambiguity, alienation, and decision paralysis.`,
    questions: [
      {
        id: "reading.pass06.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What is an essential characteristic of mature asynchronous remote work according to the text?",
        correct: "Immediate synchronous responses are actively discouraged in favor of written documentation.",
        distractors: [
          "All team members must remain on continuous video calls throughout the workday.",
          "Employees are prohibited from living in different time zones.",
          "Project specifications are never written down in digital repositories."
        ],
        explanation: "The passage states that in mature distributed organizations, 'immediate synchronous response is not only unprompted; it is actively discouraged'.",
        learningObjective: "Identify key features of modern organizational communication paradigms.",
        tags: ["reading", "remote-work", "management"]
      },
      {
        id: "reading.pass06.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What is a primary cognitive benefit of reducing video calls and chat notifications?",
        correct: "It minimizes attention fragmentation, enabling extended periods of deep, focused work.",
        distractors: [
          "It guarantees that all employees work forty percent fewer hours weekly.",
          "It eliminates the need for software engineering code reviews.",
          "It forces employees to work exclusively during night shifts."
        ],
        explanation: "The text notes that this discipline 'radically curtails attention fragmentation, fostering prolonged states of uninterrupted deep work'.",
        learningObjective: "Recognize psychological and productivity benefits in workplace expository prose.",
        tags: ["reading", "productivity", "psychology"]
      },
      {
        id: "reading.pass06.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What risk do organizations face if they lack strong documentation literacy?",
        correct: "They often suffer from operational ambiguity, employee alienation, and decision paralysis.",
        distractors: [
          "They are legally fined by international labor arbitration courts.",
          "Their employees become incapable of using electronic computers.",
          "Their software servers overheat and cause data loss."
        ],
        explanation: "The author notes that organizations lacking documentation literacy 'frequently experience ambiguity, alienation, and decision paralysis'.",
        learningObjective: "Identify potential organizational hazards outlined in business texts.",
        tags: ["reading", "risk", "organizational-behavior"]
      },
      {
        id: "reading.pass06.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "What can be inferred regarding the transition from traditional office work to successful asynchronous work?",
        correct: "It requires a fundamental behavioral shift in communication rather than simply moving office habits to digital software.",
        distractors: [
          "It can be accomplished instantly by purchasing enterprise video conference software licenses.",
          "It is suitable exclusively for workers residing in identical time zones.",
          "It diminishes the importance of clear, precise written English skills."
        ],
        explanation: "The author notes that early attempts merely 'mimicked' the physical office with meetings, whereas mature models require a deep shift to documentation and self-management.",
        learningObjective: "Infer underlying cultural and behavioral requisites for operational transformations.",
        tags: ["reading", "inference", "management-theory"]
      }
    ]
  },
  {
    id: "pass-ai-ip-07",
    title: "Artificial Intelligence and Intellectual Property Jurisprudence",
    passage: `The explosive proliferation of generative artificial intelligence architectures has precipitated an unprecedented crisis in intellectual property jurisprudence. Contemporary generative models are trained on billions of scraped textual, visual, and auditory artifacts, assimilating complex statistical representations of human creative expression. When a commercial model synthesizes high-fidelity prose, illustration, or musical composition in response to natural language prompts, fundamental legal questions emerge: Does the ingestion of copyrighted intellectual works during model pre-training constitute fair use or willful infringement? Furthermore, can artificial neural networks hold legal inventorship or authorship rights under existing copyright statutes that historically contemplated human natural persons? As global jurisdictions grapple with these questions, diverging judicial precedents threaten to create a fragmented regulatory landscape that could either stifle technological innovation or eviscerate the economic livelihood of human artists.`,
    questions: [
      {
        id: "reading.pass07.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "How are modern generative artificial intelligence models trained?",
        correct: "On vast datasets of scraped textual, visual, and auditory works.",
        distractors: [
          "By employing human artists to manually paint each output pixel.",
          "Exclusively on public domain scientific patent documents from the 1800s.",
          "Without using any existing human creative expression whatsoever."
        ],
        explanation: "The passage states that models 'are trained on billions of scraped textual, visual, and auditory artifacts'.",
        learningObjective: "Identify foundational factual statements in technical-legal texts.",
        tags: ["reading", "ai", "technology"]
      },
      {
        id: "reading.pass07.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "Why is model inventorship controversial under current legal frameworks?",
        correct: "Existing copyright statutes were historically drafted to protect human natural persons.",
        distractors: [
          "Artificial neural networks refuse to pay patent registration fees.",
          "Generative software is universally banned in all international jurisdictions.",
          "Human artists have universally endorsed algorithmic computer authorship."
        ],
        explanation: "The passage notes that legal frameworks 'historically contemplated human natural persons' as authors.",
        learningObjective: "Understand statutory historical context in legal debates.",
        tags: ["reading", "legal", "copyright"]
      },
      {
        id: "reading.pass07.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "The word 'eviscerate' in the final sentence most nearly means:",
        correct: "Severely destroy or deprive of vital force and economic viability.",
        distractors: [
          "Enhance and enrich dramatically.",
          "Organize into a structured labor union.",
          "Exempt from federal taxation."
        ],
        explanation: "'Eviscerate' literally means to disembowel, and figuratively means to devastate or deprive of essential sustenance.",
        learningObjective: "Interpret strong figurative verbs in socio-economic arguments.",
        tags: ["reading", "vocabulary", "metaphor"]
      },
      {
        id: "reading.pass07.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "What major geopolitical or economic dilemma does the passage identify at the conclusion?",
        correct: "Divergent judicial rulings across nations could create a fragmented legal environment with severe trade-offs.",
        distractors: [
          "Artificial intelligence models will completely replace all human judicial judges within five years.",
          "All copyright laws will be formally abolished by a unanimous United Nations vote.",
          "Technological innovation has permanently ground to a halt due to patent lawsuits."
        ],
        explanation: "The final sentence warns that 'diverging judicial precedents threaten to create a fragmented regulatory landscape' that either stifles innovation or harms artists.",
        learningObjective: "Analyze multifaceted international policy dilemmas.",
        tags: ["reading", "policy", "geopolitics"]
      }
    ]
  },
  {
    id: "pass-biodiversity-corridors-08",
    title: "Agricultural Biodiversity Corridors",
    passage: `Agricultural intensification over the twentieth century led to severe landscape fragmentation, converting contiguous wilderness into isolated ecological islands encircled by monoculture crop fields. In response, conservation ecologists have pioneered the implementation of linear biodiversity corridors—continuous strips of native hedgerows, riparian buffer zones, and restored woodlands that physically connect disjointed wildlife reserves. These biological highways facilitate gene flow among otherwise genetically isolated populations, preventing dangerous inbreeding depression and enabling species to shift their geographic ranges in response to shifting climatic isotherms. Additionally, these vegetated corridors provide critical overwintering habitat for beneficial predatory arthropods and wild pollinators, delivering measurable ecosystem pest-suppression services that simultaneously reduce farmers' reliance on synthetic chemical insecticides.`,
    questions: [
      {
        id: "reading.pass08.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What environmental problem resulted from twentieth-century agricultural intensification?",
        correct: "Landscape fragmentation that isolated wild habitats into separated islands.",
        distractors: [
          "An excessive expansion of contiguous native forests.",
          "The complete elimination of all synthetic pesticide manufacturing.",
          "A massive drop in global grain production."
        ],
        explanation: "The opening sentence explains that intensification 'led to severe landscape fragmentation, converting contiguous wilderness into isolated ecological islands'.",
        learningObjective: "Identify historical environmental problems from scientific introductions.",
        tags: ["reading", "environment", "agriculture"]
      },
      {
        id: "reading.pass08.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "How do biodiversity corridors benefit wild animal populations genetically?",
        correct: "They facilitate gene flow between isolated groups, counteracting inbreeding.",
        distractors: [
          "They permanently restrict species to a single tiny territory.",
          "They eliminate the need for animals to reproduce biologically.",
          "They introduce artificial laboratory mutations into wild species."
        ],
        explanation: "Corridors 'facilitate gene flow among otherwise genetically isolated populations, preventing dangerous inbreeding depression'.",
        learningObjective: "Extract genetic and evolutionary mechanisms from ecological texts.",
        tags: ["reading", "genetics", "conservation"]
      },
      {
        id: "reading.pass08.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "How do vegetated corridors directly assist surrounding farmers economically?",
        correct: "They harbor predatory insects and pollinators, decreasing the need for chemical insecticides.",
        distractors: [
          "They allow farmers to pave wide commercial transport highways through reserves.",
          "They generate free electrical power through subterranean root conduits.",
          "They attract wild herbivores that consume surplus monoculture grains."
        ],
        explanation: "The corridors provide habitat for 'beneficial predatory arthropods and wild pollinators, delivering measurable ecosystem pest-suppression services that simultaneously reduce farmers' reliance on synthetic chemical insecticides'.",
        learningObjective: "Analyze reciprocal ecological and economic benefits in agriculture.",
        tags: ["reading", "agriculture", "ecosystem-services"]
      },
      {
        id: "reading.pass08.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The phrase 'shifting climatic isotherms' in line 6 refers to:",
        correct: "Geographic boundary lines of equal temperature moving poleward or upward due to global warming.",
        distractors: [
          "Sudden shifts in atmospheric air pressure caused by local tornadoes.",
          "Changes in agricultural tariff rates negotiated by international trade bodies.",
          "Seasonal migrations of farm machinery between northern and southern provinces."
        ],
        explanation: "An 'isotherm' is a line on a map connecting points with equal temperature; shifting isotherms refer to geographic warming trends forcing species migration.",
        learningObjective: "Interpret geographical and meteorological terminology in ecological contexts.",
        tags: ["reading", "climate-science", "vocabulary"]
      }
    ]
  },
  {
    id: "pass-language-attrition-09",
    title: "Language Attrition in Bilingual Adults",
    passage: `While popular conception often views native language competence as an indelible cognitive fixture, psycholinguistic research reveals that native language proficiency is surprisingly dynamic and susceptible to first-language (L1) attrition. When adult bilingual immigrants become fully immersed in a dominant second-language (L2) linguistic milieu, subtle structural and lexical erosions occur in their native tongue. This phenomenon is not merely passive forgetting; rather, it reflects persistent cross-linguistic competition in working memory. The dominant L2 continually inhibits L1 retrieval pathways, manifesting initially as prolonged lexical access latencies and tip-of-the-tongue states, and eventually altering syntactic intuitions regarding complex grammatical phenomena like null subjects and relative clause attachment. Crucially, neuroimaging demonstrates that attrition is rarely irreversible; immersion in the native linguistic community rapidly reactivates dormant syntactic networks, demonstrating that competence remains fundamentally intact even when access fluency is compromised.`,
    questions: [
      {
        id: "reading.pass09.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What does psycholinguistic research reveal about native language proficiency?",
        correct: "It is dynamic and can experience attrition when a speaker is immersed in a second language.",
        distractors: [
          "It is completely permanent and cannot be modified by any future life experience.",
          "It completely vanishes within three weeks of moving to a foreign country.",
          "It prevents adults from ever acquiring a second language fluently."
        ],
        explanation: "The text explains that native language proficiency 'is surprisingly dynamic and susceptible to first-language (L1) attrition'.",
        learningObjective: "Identify scientific research corrections to popular misconceptions.",
        tags: ["reading", "linguistics", "psychology"]
      },
      {
        id: "reading.pass09.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "According to the passage, what cognitive mechanism drives first-language attrition?",
        correct: "Active cross-linguistic competition where the dominant L2 inhibits L1 retrieval pathways.",
        distractors: [
          "Physical degeneration of auditory ear structures in older adults.",
          "A deliberate psychological desire to abandon one's cultural heritage.",
          "Severe physical damage to the brain's Broca's area."
        ],
        explanation: "The author notes that attrition 'reflects persistent cross-linguistic competition in working memory. The dominant L2 continually inhibits L1 retrieval pathways'.",
        learningObjective: "Extract cognitive neuro-linguistic mechanisms.",
        tags: ["reading", "memory", "neuroscience"]
      },
      {
        id: "reading.pass09.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What occurs when an individual experiencing L1 attrition re-immerses in their native community?",
        correct: "Dormant syntactic networks are rapidly reactivated, restoring fluency.",
        distractors: [
          "The individual permanently forgets both languages entirely.",
          "Their brain rejects their second language through cognitive trauma.",
          "They must formally re-enroll in primary school grammar courses."
        ],
        explanation: "Neuroimaging shows that 'immersion in the native linguistic community rapidly reactivates dormant syntactic networks'.",
        learningObjective: "Identify evidence supporting the reversibility of cognitive changes.",
        tags: ["reading", "reversibility", "bilingualism"]
      },
      {
        id: "reading.pass09.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The distinction drawn in the final sentence between 'competence' and 'access fluency' implies that:",
        correct: "Underlying grammatical knowledge remains preserved in the brain even if instantaneous retrieval is impaired.",
        distractors: [
          "Language proficiency is entirely an illusion fabricated by language teachers.",
          "A person who hesitates while speaking has permanently lost their language capability.",
          "Grammar knowledge and vocabulary memory are stored in opposing biological kidneys."
        ],
        explanation: "In linguistics (Chomskyan distinction), 'competence' is stored mental knowledge, whereas 'access fluency' (performance) is execution speed; the text notes competence is intact even when retrieval is slow.",
        learningObjective: "Analyze theoretical linguistic distinctions (competence vs performance) in text.",
        tags: ["reading", "linguistic-theory", "inference"]
      }
    ]
  },
  {
    id: "pass-crispr-medicine-10",
    title: "CRISPR-Cas9 Precision Therapeutics",
    passage: `The transition of CRISPR-Cas9 from a bacterial adaptive immune mechanism into a precision clinical therapeutic represents the zenith of modern biotechnology. Utilizing a synthetic single-guide RNA (sgRNA) programmed to match a designated genomic locus, the Cas9 endonuclease introduces a targeted double-strand DNA break with molecular fidelity. Cellular repair pathways then repair the cleavage through non-homologous end joining (which disrupts pathogenic gene expression) or homology-directed repair (which can correct monogenic point mutations using an exogenously supplied template). Despite clinical triumphs in treating sickle cell disease and beta-thalassemia, translational hurdles persist. Off-target cleavage events—where Cas9 introduces unintentional genetic edits at genomic sites sharing partial sequence homology—pose oncogenic hazards. Consequently, biomedical engineers are developing high-fidelity Cas9 variants and transient lipid nanoparticle delivery vectors to maximize therapeutic efficacy while curtailing off-target genotoxicity.`,
    questions: [
      {
        id: "reading.pass10.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What natural role did CRISPR-Cas9 perform before being adapted for biotechnology?",
        correct: "An adaptive immune defense mechanism in bacteria.",
        distractors: [
          "A photosynthetic pigment in marine algae.",
          "A viral toxin used to infect human cardiovascular cells.",
          "A chemical preservative found in plant seeds."
        ],
        explanation: "The passage introduces CRISPR-Cas9 as having originated as 'a bacterial adaptive immune mechanism'.",
        learningObjective: "Identify natural origins of bio-engineered molecular tools.",
        tags: ["reading", "genetics", "biotechnology"]
      },
      {
        id: "reading.pass10.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What is the primary function of the synthetic single-guide RNA (sgRNA)?",
        correct: "To direct the Cas9 enzyme to a specific target sequence in the genome.",
        distractors: [
          "To provide energy by metabolizing intracellular glucose.",
          "To dissolve the outer lipid membrane of red blood cells.",
          "To permanently prevent all cellular DNA replication."
        ],
        explanation: "The guide RNA is 'programmed to match a designated genomic locus', guiding the Cas9 enzyme precisely.",
        learningObjective: "Explain biochemical mechanisms from scientific descriptions.",
        tags: ["reading", "molecular-biology", "detail"]
      },
      {
        id: "reading.pass10.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What primary safety concern is associated with CRISPR-Cas9 clinical gene editing?",
        correct: "Off-target cuts that could unintentionally cause genetic mutations or cancer.",
        distractors: [
          "The extreme cold temperature required for hospital storage.",
          "The total inability to edit human DNA cells in clinical trials.",
          "The complete absence of any synthetic lipid delivery vehicles."
        ],
        explanation: "The text highlights 'Off-target cleavage events—where Cas9 introduces unintentional genetic edits at genomic sites sharing partial sequence homology—pose oncogenic hazards'.",
        learningObjective: "Identify medical risks and bio-safety challenges.",
        tags: ["reading", "medicine", "safety"]
      },
      {
        id: "reading.pass10.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The word 'zenith' in the opening sentence conveys that CRISPR-Cas9 represents:",
        correct: "The pinnacle or culminating peak of biotechnological achievement.",
        distractors: [
          "The earliest preliminary beginning of an idea.",
          "A minor, negligible footnote in pharmaceutical history.",
          "A dangerous and condemned scientific failure."
        ],
        explanation: "'Zenith' denotes the highest point or peak of prosperity, success, or achievement.",
        learningObjective: "Interpret elevated classical vocabulary in scientific literature.",
        tags: ["reading", "vocabulary", "elevation"]
      }
    ]
  },

  // --- Passages 11 to 25 ---
  {
    id: "pass-urban-density-11",
    title: "Historic Preservation vs Urban Densification",
    passage: `Metropolitan city planners in historic capitals confront an intractable dilemma: reconciling strict architectural heritage preservation with the pressing humanitarian demand for affordable, high-density residential housing. In historic districts, preservation ordinances impose stringent height ceilings, sightline corridors, and material authenticity mandates that forbid the construction of multi-story modular apartment towers. Advocates of historic preservation maintain that these cultural landscapes anchor civic identity, foster tourism revenue, and preserve irreproducible artisanal masonry. Conversely, urban economists demonstrate that rigid preservation designations inadvertently artificially constrict housing supply, driving rent burdens to unsustainable levels and displacing multi-generational working-class residents to distant peripheral suburbs with grueling transit commutes. Progressive zoning theorists now advocate 'adaptive reuse'—preserving external heritage facades while radically gutting and densifying internal structural volumes to accommodate energy-efficient, multi-unit communal dwellings.`,
    questions: [
      {
        id: "reading.pass11.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What economic consequence do urban economists link to rigid preservation laws?",
        correct: "Artificially constricted housing supply that drives up rental costs and displaces working-class families.",
        distractors: [
          "A complete collapse in international tourism revenue.",
          "An immediate surplus of unoccupied downtown luxury penthouses.",
          "The rapid deforestation of surrounding agricultural belts."
        ],
        explanation: "Economists show that preservation 'inadvertently artificially constricts housing supply, driving rent burdens to unsustainable levels and displacing multi-generational working-class residents'.",
        learningObjective: "Identify socioeconomic consequences of municipal zoning regulations.",
        tags: ["reading", "urban-planning", "economics"]
      },
      {
        id: "reading.pass11.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What arguments do preservationists present in favor of protecting historic buildings?",
        correct: "They preserve civic cultural identity, support tourism, and protect irreplaceable craftsmanship.",
        distractors: [
          "They guarantee free municipal heating for all city residents.",
          "They allow rapid construction of thirty-story concrete towers.",
          "They eliminate the need for public commuter transportation."
        ],
        explanation: "Advocates argue that cultural landscapes 'anchor civic identity, foster tourism revenue, and preserve irreproducible artisanal masonry'.",
        learningObjective: "Extract cultural and economic arguments supporting heritage preservation.",
        tags: ["reading", "culture", "architecture"]
      },
      {
        id: "reading.pass11.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What does 'adaptive reuse' involve according to the text?",
        correct: "Preserving historical outer facades while rebuilding internal spaces for high-density modern housing.",
        distractors: [
          "Demolishing all buildings constructed prior to 1950.",
          "Converting all residential apartments into commercial corporate banks.",
          "Constructing subterranean tunnels beneath historical monuments."
        ],
        explanation: "Adaptive reuse involves 'preserving external heritage facades while radically gutting and densifying internal structural volumes'.",
        learningObjective: "Define progressive architectural and urban design concepts.",
        tags: ["reading", "architecture", "vocabulary"]
      },
      {
        id: "reading.pass11.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The tone of the author throughout the passage is best characterized as:",
        correct: "Analytical and dialectical, carefully synthesizing competing ideological priorities.",
        distractors: [
          "Vitriolic and partisan, mocking preservationists as backward-looking obstructionists.",
          "Whimsical and nostalgic, lamenting the loss of 19th-century cobblestone alleys.",
          "Apathetic and dismissive, claiming urban planning has no real impact on human lives."
        ],
        explanation: "The author methodically balances preservation merits against economic housing pressures before presenting a synthetic compromise (adaptive reuse).",
        learningObjective: "Assess authorial neutrality and dialectical argumentation in expository essays.",
        tags: ["reading", "tone", "rhetoric"]
      }
    ]
  },
  {
    id: "pass-whistleblower-ethics-12",
    title: "Whistleblowing Ethics & Organizational Psychology",
    passage: `The decision to blow the whistle on corporate misconduct is among the most excruciating ethical crucibles a professional can encounter. Behavioral psychologists studying corporate whistleblowers document a phenomenon known as the 'loyalty trap': employees who discover systemic fraud or environmental falsification frequently experience agonizing cognitive dissonance between personal moral principles and institutional fealty to peers. Contrary to the Hollywood trope of the celebrated crusader, empirical studies indicate that whistleblowers overwhelmingly suffer catastrophic retaliation, including professional blacklisting, protracted defamation, legal insolvency, and profound social alienation. Organizations seeking genuine ethical resilience must move beyond hollow whistleblower policies; they must establish autonomous oversight ombuds offices with independent subpoena power and ensure that internal dissent is treated as a vital diagnostic safeguard rather than an act of organizational treason.`,
    questions: [
      {
        id: "reading.pass12.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What do empirical studies reveal about the actual experiences of corporate whistleblowers?",
        correct: "They frequently suffer severe retaliation, blacklisting, and financial hardship.",
        distractors: [
          "They are immediately promoted to the board of directors.",
          "They receive automatic immunity and millions in cash rewards.",
          "They experience zero emotional or interpersonal stress."
        ],
        explanation: "Studies show that whistleblowers 'overwhelmingly suffer catastrophic retaliation, including professional blacklisting, protracted defamation, legal insolvency, and profound social alienation'.",
        learningObjective: "Identify empirical findings that challenge popular cultural tropes.",
        tags: ["reading", "ethics", "whistleblowing"]
      },
      {
        id: "reading.pass12.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What is the 'loyalty trap' described in the passage?",
        correct: "The psychological struggle between personal moral duty and loyalty to colleagues and company.",
        distractors: [
          "A commercial marketing campaign that binds customers to one brand.",
          "A computer security virus that steals corporate passwords.",
          "A legal clause preventing employees from accepting rival job offers."
        ],
        explanation: "The loyalty trap is defined as 'agonizing cognitive dissonance between personal moral principles and institutional fealty to peers'.",
        learningObjective: "Interpret psychological dilemmas in organizational behavior.",
        tags: ["reading", "psychology", "dissonance"]
      },
      {
        id: "reading.pass12.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What reform does the author propose to foster true organizational ethical resilience?",
        correct: "Establishing independent ombuds offices with real subpoena power and valuing internal dissent.",
        distractors: [
          "Installing secret surveillance cameras on all employee work desks.",
          "Requiring all employees to sign lifetime silence pledges.",
          "Abolishing all internal ethics committees entirely."
        ],
        explanation: "The author advocates creating 'autonomous oversight ombuds offices with independent subpoena power and ensure that internal dissent is treated as a vital diagnostic safeguard'.",
        learningObjective: "Identify institutional governance reforms in organizational ethics texts.",
        tags: ["reading", "governance", "reform"]
      },
      {
        id: "reading.pass12.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "In the passage, the word 'crucibles' is used metaphorically to mean:",
        correct: "Severe trials or tests of moral character and endurance.",
        distractors: [
          "Chemical vessels used for melting precious metals.",
          "Formal legal contracts signed by government ministers.",
          "Electronic spreadsheets tracking financial debits."
        ],
        explanation: "While literally a vessel for melting substances at high heat, metaphorically 'crucible' denotes a severe test or trial of resilience and integrity.",
        learningObjective: "Decode classical figurative metaphors in psychological essays.",
        tags: ["reading", "vocabulary", "metaphor"]
      }
    ]
  },
  {
    id: "pass-nudge-theory-13",
    title: "Behavioral Economics and Nudge Theory",
    passage: `Pioneered by Nobel laureates Richard Thaler and Cass Sunstein, 'Nudge Theory' represents an influential branch of behavioral economics that eschews heavy-handed legislative mandates in favor of subtle alterations to 'choice architecture.' Grounded in the recognition that human decision-makers are boundedly rational and disproportionately swayed by default options, cognitive inertia, and social proof, nudges steer behavior in predictable ways without forbidding any options or fundamentally changing their economic incentives. A quintessential manifestation is automatic enrollment in corporate retirement pension schemes: by shifting the default from opt-in to opt-out, employee participation rates surge from forty percent to over ninety percent without stripping workers of the autonomy to decline. Nevertheless, bioethicists scrutinize nudge interventions, questioning whether paternalistic behavioral engineering infringes upon individual autonomy through subconscious manipulation.`,
    questions: [
      {
        id: "reading.pass13.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What is a central principle of Nudge Theory according to the passage?",
        correct: "Influencing choices through subtle environmental design without banning alternatives or altering economic incentives.",
        distractors: [
          "Imposing heavy tax fines on citizens who make unhealthy dietary choices.",
          "Requiring all citizens to surrender their personal savings to national pension funds.",
          "Eliminating all freedom of choice in consumer retail stores."
        ],
        explanation: "Nudges 'steer behavior in predictable ways without forbidding any options or fundamentally changing their economic incentives'.",
        learningObjective: "Understand core theoretical definitions in behavioral economics.",
        tags: ["reading", "economics", "nudge-theory"]
      },
      {
        id: "reading.pass13.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "How does shifting pension enrollment from 'opt-in' to 'opt-out' impact participation?",
        correct: "Participation rates jump significantly from forty to over ninety percent.",
        distractors: [
          "Participation rates drop to absolute zero within six months.",
          "Employees universally resign from the corporation in protest.",
          "The company is forced to pay fifty percent penalty fines."
        ],
        explanation: "The text notes that 'by shifting the default from opt-in to opt-out, employee participation rates surge from forty percent to over ninety percent'.",
        learningObjective: "Extract quantitative statistical results from economic case studies.",
        tags: ["reading", "statistics", "pensions"]
      },
      {
        id: "reading.pass13.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What criticism do bioethicists raise regarding behavioral nudging?",
        correct: "They question whether subtle subconscious steering infringes on human autonomy.",
        distractors: [
          "They argue that nudges cost too much public taxpayer money to design.",
          "They claim that default options cause physical biological illness.",
          "They contend that retirement schemes are illegal under international law."
        ],
        explanation: "Bioethicists question 'whether paternalistic behavioral engineering infringes upon individual autonomy through subconscious manipulation'.",
        learningObjective: "Analyze ethical and philosophical critiques of behavioral public policy.",
        tags: ["reading", "ethics", "critique"]
      },
      {
        id: "reading.pass13.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The phrase 'choice architecture' refers to:",
        correct: "The intentional design and presentation of different choices to an individual.",
        distractors: [
          "The physical architectural layout of municipal government voting booths.",
          "A computer algorithm that randomly generates multiple-choice exam answers.",
          "A construction building method utilizing reinforced concrete columns."
        ],
        explanation: "'Choice architecture' in behavioral economics is the way choices are organized and presented to decision-makers.",
        learningObjective: "Interpret specialized social science compound terminology.",
        tags: ["reading", "terminology", "behavioral-economics"]
      }
    ]
  },
  {
    id: "pass-microplastics-marine-14",
    title: "Microplastics in Marine Trophic Chains",
    passage: `The omnipresence of microplastics—synthetic polymer fragments measuring less than five millimeters in diameter—in marine pelagic ecosystems represents an escalating ecological crisis. Derived from the fragmentation of mismanaged consumer packaging and synthetic textile laundering effluents, these particles persist for centuries due to recalcitrant carbon-carbon chemical bonds. In oceanic gyres, zooplankton and filter-feeding pelagic teleosts mistake buoyant microplastic beads for organic prey. Ingestion induces physical intestinal pseudo-satiety, causing organisms to starve despite full stomachs. Crucially, microplastics act as potent hydrophobic sponges, adsorbing persistent organic pollutants (POPs) such as polychlorinated biphenyls and DDT from ambient seawater. As these laden particles move up the marine trophic pyramid from planktivorous baitfish to apex predators like tuna and cetaceans, biomagnification elevates toxic xenobiotic concentrations by orders of magnitude, posing grave risks to marine biodiversity and human consumers of seafood.`,
    questions: [
      {
        id: "reading.pass14.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What causes marine organisms to starve after ingesting microplastics?",
        correct: "Physical pseudo-satiety, where their stomachs feel full of plastic without receiving nutrition.",
        distractors: [
          "Microplastics dissolve their muscular skeletal tissue within minutes.",
          "The plastic particles evaporate all water inside the fish's body.",
          "Marine animals completely stop swimming and sink to the abyss."
        ],
        explanation: "The text explains that 'ingestion induces physical intestinal pseudo-satiety, causing organisms to starve despite full stomachs'.",
        learningObjective: "Extract physiological biological hazards from environmental texts.",
        tags: ["reading", "biology", "pollution"]
      },
      {
        id: "reading.pass14.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "How do microplastics interact with chemical toxins in seawater?",
        correct: "They act as hydrophobic sponges, adsorbing persistent organic pollutants.",
        distractors: [
          "They neutralize and clean all toxins from the ocean water.",
          "They convert chemical pesticides into harmless oxygen gas.",
          "They repel all organic molecules through electrical charges."
        ],
        explanation: "Microplastics 'act as potent hydrophobic sponges, adsorbing persistent organic pollutants (POPs) such as polychlorinated biphenyls and DDT from ambient seawater'.",
        learningObjective: "Explain chemical and environmental interactions in marine toxicology.",
        tags: ["reading", "chemistry", "toxicology"]
      },
      {
        id: "reading.pass14.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What process causes toxic chemical concentrations to multiply in apex predators like tuna?",
        correct: "Biomagnification as contaminated prey is consumed up the trophic food chain.",
        distractors: [
          "Photosynthesis occurring inside predatory fish gills.",
          "Direct exposure to sunlight in shallow tropical lagoons.",
          "Rapid evaporation of deep-sea mineral vents."
        ],
        explanation: "As laden particles move up the pyramid, 'biomagnification elevates toxic xenobiotic concentrations by orders of magnitude'.",
        learningObjective: "Define trophic ecological processes in marine food webs.",
        tags: ["reading", "ecology", "food-chains"]
      },
      {
        id: "reading.pass14.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The word 'recalcitrant' in line 5 refers to:",
        correct: "Chemical bonds that are exceptionally resistant to natural breakdown or degradation.",
        distractors: [
          "Disobedient human teenagers working on fishing vessels.",
          "Synthetic fabrics that dissolve instantly upon contact with water.",
          "Plastic fragments that glow brightly in total darkness."
        ],
        explanation: "In chemistry and environmental science, 'recalcitrant' describes compounds that resist biodegradation and chemical breakdown.",
        learningObjective: "Apply scientific technical definitions of chemical resistance.",
        tags: ["reading", "scientific-vocabulary", "chemistry"]
      }
    ]
  },
  {
    id: "pass-quantum-cryptography-15",
    title: "Post-Quantum Cryptography",
    passage: `Modern digital commerce, governmental state secrets, and global telecommunications rely fundamentally on asymmetric public-key cryptography algorithms, most notably RSA and Elliptic Curve Cryptography. These systems derive their security from the computational intractability of mathematical problems—such as prime factorization and discrete logarithms—that would take conventional silicon supercomputers millennia to solve. However, the theoretical advent of fault-tolerant quantum computing poses an existential threat to this paradigm. Running Shor's algorithm, a sufficiently scaled quantum computer utilizing coherent quantum superposition and entanglement could factorize RSA keys in mere minutes. In response, cryptographers and national security agencies are urgently developing post-quantum cryptography (PQC) standards based on alternative mathematical problems, such as high-dimensional lattice cryptography, that are believed to remain intractable even for quantum architectures.`,
    questions: [
      {
        id: "reading.pass15.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "Why are current public-key cryptography algorithms secure against conventional supercomputers?",
        correct: "They rely on mathematical problems that would take conventional computers millennia to solve.",
        distractors: [
          "They are physically printed on indestructible metallic paper.",
          "They can only be unlocked by verified biological retinal scans.",
          "They delete all data immediately whenever an external connection is detected."
        ],
        explanation: "The systems derive security from 'the computational intractability of mathematical problems... that would take conventional silicon supercomputers millennia to solve'.",
        learningObjective: "Identify computational security premises.",
        tags: ["reading", "cybersecurity", "mathematics"]
      },
      {
        id: "reading.pass15.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What mathematical algorithm allows quantum computers to crack RSA encryption rapidly?",
        correct: "Shor's algorithm.",
        distractors: ["Dijkstra's algorithm", "Newton's method", "Euclidean division"],
        explanation: "The passage explicitly names 'Shor's algorithm' as the method allowing quantum computers to factorize keys in minutes.",
        learningObjective: "Recall specific technical names from computer science texts.",
        tags: ["reading", "quantum-computing", "algorithms"]
      },
      {
        id: "reading.pass15.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What mathematical approach is being developed to withstand quantum computing attacks?",
        correct: "Lattice-based cryptography in high dimensions.",
        distractors: [
          "Basic prime factorization with four-digit numbers.",
          "Unencrypted plain text transmissions via radio waves.",
          "Simple Caesar substitution ciphers."
        ],
        explanation: "Cryptographers are developing standards 'based on alternative mathematical problems, such as high-dimensional lattice cryptography'.",
        learningObjective: "Identify post-quantum cryptographic innovations.",
        tags: ["reading", "cryptography", "technology"]
      },
      {
        id: "reading.pass15.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "What does the passage imply about the timeline for implementing post-quantum cryptography?",
        correct: "Migration must occur urgently before large-scale fault-tolerant quantum computers become operational.",
        distractors: [
          "Organizations can safely delay upgrading encryption for several centuries.",
          "Quantum computers are entirely impossible according to the laws of physics.",
          "Silicon supercomputers will permanently remain faster than quantum machines."
        ],
        explanation: "Because quantum machines pose an 'existential threat' and can crack keys in minutes, agencies are 'urgently developing' and migrating to PQC standards now.",
        learningObjective: "Infer temporal urgency in cybersecurity strategic planning.",
        tags: ["reading", "inference", "cybersecurity-strategy"]
      }
    ]
  },
  {
    id: "pass-nearshoring-16",
    title: "Supply Chain Nearshoring and Geopolitical Resilience",
    passage: `For over three decades, corporate globalization was dictated by lean, 'just-in-time' inventory optimization, driving multinational corporations to offshore manufacturing to distant low-cost Asian production hubs. However, the cascading supply disruptions of recent pandemics, combined with rising shipping freight rates and intensifying geopolitical trade friction, exposed the lethal vulnerabilities of geographically extended supply chains. In response, industrial enterprises are aggressively pivoting toward 'just-in-case' resilience via nearshoring and friendshoring. Nearshoring involves relocating critical manufacturing and component fabrication to geographically proximate neighboring countries—such as North American firms expanding operations in Mexico, or Western European firms investing in Eastern Europe. While nearshoring increases direct unit labor costs marginally, firms calculate that drastically truncated transit lead times, reduced customs tariffs, and insulated geopolitical exposure deliver far superior aggregate risk-adjusted margins.`,
    questions: [
      {
        id: "reading.pass16.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What historical philosophy guided multinational corporate supply chains for the past three decades?",
        correct: "Offshoring to distant low-cost manufacturing hubs using just-in-time inventory.",
        distractors: [
          "Producing all goods exclusively inside municipal domestic borders.",
          "Stockpiling ten years' worth of raw materials in every regional store.",
          "Banning all international maritime container shipping."
        ],
        explanation: "Globalization was 'dictated by lean, just-in-time inventory optimization, driving multinational corporations to offshore manufacturing to distant low-cost Asian production hubs'.",
        learningObjective: "Identify historical macroeconomic business paradigms.",
        tags: ["reading", "supply-chain", "globalization"]
      },
      {
        id: "reading.pass16.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What is 'nearshoring' as defined in the passage?",
        correct: "Relocating manufacturing to geographically close neighboring nations to reduce lead times.",
        distractors: [
          "Moving corporate executive headquarters onto floating ocean ships.",
          "Outsourcing customer service call centers exclusively to Antarctica.",
          "Abandoning industrial machinery in favor of hand craftsmanship."
        ],
        explanation: "Nearshoring involves 'relocating critical manufacturing and component fabrication to geographically proximate neighboring countries'.",
        learningObjective: "Define modern supply chain operational models.",
        tags: ["reading", "nearshoring", "operations"]
      },
      {
        id: "reading.pass16.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "How do firms justify the slightly higher labor expenses associated with nearshoring?",
        correct: "Shorter shipping times, lower tariff friction, and reduced geopolitical risks offset labor costs.",
        distractors: [
          "Governments subsidize one hundred percent of employee salaries in nearshored factories.",
          "Nearshored factories do not pay any electricity or heating bills.",
          "Consumer demand for products drops to zero, reducing production needs."
        ],
        explanation: "Firms calculate that 'drastically truncated transit lead times, reduced customs tariffs, and insulated geopolitical exposure deliver far superior aggregate risk-adjusted margins'.",
        learningObjective: "Analyze business trade-offs and financial cost-benefit equations.",
        tags: ["reading", "finance", "trade-offs"]
      },
      {
        id: "reading.pass16.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The shift from 'just-in-time' to 'just-in-case' inventory strategies indicates that companies now prioritize:",
        correct: "Systemic resilience, operational buffer capacity, and reliability over minimum baseline cost.",
        distractors: [
          "Absolute zero inventory holdings under all circumstances.",
          "Complete reliance on single-source exclusive suppliers across the Pacific.",
          "Rapid quarterly speculative currency trading."
        ],
        explanation: "'Just-in-case' emphasizes holding buffer inventory and securing local suppliers for resilience, moving away from hyper-lean zero-inventory cost minimization.",
        learningObjective: "Interpret strategic philosophical shifts in industrial operations.",
        tags: ["reading", "strategy", "risk-management"]
      }
    ]
  },
  {
    id: "pass-telemedicine-privacy-17",
    title: "Telemedicine and Patient Data Governance",
    passage: `The accelerated adoption of virtual telemedicine platforms has expanded clinical healthcare accessibility to historically underserved rural and isolated populations. Patients can consult board-certified medical specialists via encrypted video uplinks, while remote physiological telemetry devices monitor real-time arterial blood pressure, blood glucose, and cardiac rhythms from the home. However, this digitization of clinical encounters introduces complex biomedical data governance dilemmas. Telemedicine platforms generate massive quantities of granular biometric data that transit through commercial telecommunication infrastructure, public cloud storage clusters, and third-party algorithmic diagnostic software. Privacy advocates caution that statutory healthcare frameworks—such as the United States' HIPAA—were drafted for physical clinic environments and often fail to regulate how commercial software vendors monetize de-identified aggregated patient telemetry, raising fears of algorithmic insurance redlining and unauthorized commercial profiling.`,
    questions: [
      {
        id: "reading.pass17.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What primary benefit does telemedicine provide to isolated and rural populations?",
        correct: "Expanded access to clinical consultations with certified specialists from home.",
        distractors: [
          "Free prescription medications delivered by drone within ten minutes.",
          "The complete elimination of all human doctor examinations.",
          "Automatic exemptions from all municipal medical insurance fees."
        ],
        explanation: "Telemedicine 'has expanded clinical healthcare accessibility to historically underserved rural and isolated populations'.",
        learningObjective: "Identify healthcare access benefits in informational texts.",
        tags: ["reading", "healthcare", "telemedicine"]
      },
      {
        id: "reading.pass17.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What clinical physiological data can modern remote telemetry devices transmit?",
        correct: "Real-time measurements of blood pressure, glucose, and cardiac rhythms.",
        distractors: [
          "Complete surgical bone reconstruction plans.",
          "Microscopic biopsy cell tissue cuts.",
          "Dental crown ceramic fabrication molds."
        ],
        explanation: "Devices monitor 'real-time arterial blood pressure, blood glucose, and cardiac rhythms from the home'.",
        learningObjective: "Extract factual medical technological capabilities.",
        tags: ["reading", "medical-technology", "data"]
      },
      {
        id: "reading.pass17.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "Why are existing statutory frameworks like HIPAA viewed as inadequate for modern telemedicine?",
        correct: "They were designed for physical clinical offices and poorly govern third-party digital data monetization.",
        distractors: [
          "They were written prior to the invention of electricity.",
          "They mandate that all medical records be posted on public bulletin boards.",
          "They forbid patients from speaking to doctors in English."
        ],
        explanation: "Frameworks 'were drafted for physical clinic environments and often fail to regulate how commercial software vendors monetize de-identified aggregated patient telemetry'.",
        learningObjective: "Analyze regulatory gaps caused by technological disruption.",
        tags: ["reading", "privacy", "regulation"]
      },
      {
        id: "reading.pass17.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The term 'algorithmic insurance redlining' in the final sentence implies:",
        correct: "Denying coverage or charging exorbitant premiums based on predictive analytical profiles.",
        distractors: [
          "Drawing red lines on paper medical insurance reimbursement checks.",
          "Offering free medical insurance to all registered municipal residents.",
          "Requiring all insurance claims to be written in red colored ink."
        ],
        explanation: "'Redlining' historically meant discriminatory denial of services; in an algorithmic context, it means using predictive data to deny insurance or inflate rates.",
        learningObjective: "Interpret sociopolitical and discriminatory idioms in technological contexts.",
        tags: ["reading", "ethics", "data-privacy"]
      }
    ]
  },
  {
    id: "pass-space-debris-18",
    title: "Space Debris and the Kessler Syndrome",
    passage: `Low Earth Orbit (LEO) is experiencing an alarming escalation in orbital congestion, threatening the long-term viability of satellite communications, Earth observation, and crewed orbital missions. Since the dawn of the space age, over fifteen thousand satellites have been launched, generating a lethal halo of orbital debris comprising spent rocket stages, derelict satellites, and fragmented paint flecks orbiting at velocities exceeding twenty-seven thousand kilometers per hour. Astrophysicist Donald Kessler posited that beyond a critical orbital density, collisions between orbital debris fragments trigger a self-propagating cascade—termed the 'Kessler Syndrome'—wherein each collision creates thousands of hypervelocity shards that subsequently trigger secondary collisions, rendering specific orbital planes entirely unusable for generations. Mitigating this catastrophic scenario requires international consensus on active debris remediation, including robotic grapple satellites, electrodynamic tethers, and strict post-mission de-orbiting mandates.`,
    questions: [
      {
        id: "reading.pass18.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What is the speed at which space debris travels in Low Earth Orbit according to the passage?",
        correct: "Velocities exceeding 27,000 kilometers per hour.",
        distractors: [
          "Around 50 kilometers per hour.",
          "The speed of sound in atmospheric air.",
          "Sub-orbital speeds of under 500 kilometers per hour."
        ],
        explanation: "The text states debris consists of fragments 'orbiting at velocities exceeding twenty-seven thousand kilometers per hour'.",
        learningObjective: "Retrieve explicit quantitative numerical data from scientific texts.",
        tags: ["reading", "astronomy", "orbital-mechanics"]
      },
      {
        id: "reading.pass18.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What is the 'Kessler Syndrome'?",
        correct: "A self-propagating cascade where satellite collisions generate shards that trigger further collisions.",
        distractors: [
          "A medical illness experienced by astronauts after long spaceflights.",
          "A gravitational anomaly that pulls asteroids into Earth's core.",
          "An international treaty establishing lunar colonization colonies."
        ],
        explanation: "The Kessler Syndrome is described as a 'self-propagating cascade... wherein each collision creates thousands of hypervelocity shards that subsequently trigger secondary collisions'.",
        learningObjective: "Identify scientific and astronomical theoretical concepts.",
        tags: ["reading", "astronomy", "kessler-syndrome"]
      },
      {
        id: "reading.pass18.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What technological solutions are proposed to remediate orbital space debris?",
        correct: "Robotic grapple satellites, electrodynamic tethers, and de-orbiting regulations.",
        distractors: [
          "Detonating nuclear warheads in Low Earth Orbit.",
          "Constructing giant glass domes over terrestrial observatories.",
          "Abandoning all satellite telecommunications permanently."
        ],
        explanation: "Solutions include 'robotic grapple satellites, electrodynamic tethers, and strict post-mission de-orbiting mandates'.",
        learningObjective: "Extract technological and regulatory countermeasures.",
        tags: ["reading", "aerospace", "countermeasures"]
      },
      {
        id: "reading.pass18.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "What can be inferred about the consequence of reaching the Kessler threshold in orbital planes?",
        correct: "Access to vital satellite infrastructure and space travel could become physically impossible for decades.",
        distractors: [
          "Earth's atmosphere would permanently catch fire from atmospheric friction.",
          "Astronauts would be capable of walking on space debris clouds.",
          "Satellite communication costs would drop to absolute zero."
        ],
        explanation: "The cascade would render 'specific orbital planes entirely unusable for generations', implying satellite infrastructure and launches in those bands would be blocked.",
        learningObjective: "Synthesize long-term systemic consequences from theoretical scenarios.",
        tags: ["reading", "inference", "aerospace-policy"]
      }
    ]
  },
  {
    id: "pass-flow-state-19",
    title: "Psychological Flow State in Knowledge Work",
    passage: `In contemporary cognitive psychology, the concept of 'flow'—first systematically conceptualized by Mihaly Csikszentmihalyi—designates an optimal state of consciousness characterized by complete immersion, concentrated focus, and effortless execution during demanding tasks. Neurological imaging during flow reveals a phenomenon termed 'transient hypofrontality': the temporary down-regulation of the prefrontal cortex, which quiets the brain's internal inner critic, abolishes self-conscious anxiety, and distorts the subjective perception of temporal passage. Achieving flow requires an exquisite equilibrium between the perceived challenge of the endeavor and the practitioner's personal skill level; if the challenge outstrips ability, debilitating anxiety ensues, whereas if ability vastly exceeds challenge, boredom and disengagement result. In modern knowledge-work ecosystems plagued by chronic notifications and fragmented attention, creating cultural and structural conditions that permit workers to enter deep flow is increasingly recognized as the primary determinant of complex creative output.`,
    questions: [
      {
        id: "reading.pass19.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "Who first systematically conceptualized the psychological state of 'flow'?",
        correct: "Mihaly Csikszentmihalyi.",
        distractors: ["Sigmund Freud", "B.F. Skinner", "Carl Jung"],
        explanation: "The passage opens by noting flow was 'first systematically conceptualized by Mihaly Csikszentmihalyi'.",
        learningObjective: "Identify key figures in cognitive psychology history.",
        tags: ["reading", "psychology", "attribution"]
      },
      {
        id: "reading.pass19.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What happens neurologically during 'transient hypofrontality' in flow states?",
        correct: "The prefrontal cortex down-regulates, silencing self-criticism and altering time perception.",
        distractors: [
          "The brain completely shuts down all electrical activity in the nervous system.",
          "Adrenaline surges to trigger an uncontrollable violent fight-or-flight response.",
          "Visual eye receptors permanently lose the ability to perceive color."
        ],
        explanation: "Transient hypofrontality involves 'the temporary down-regulation of the prefrontal cortex, which quiets the brain's internal inner critic... and distorts the subjective perception of temporal passage'.",
        learningObjective: "Extract neurobiological processes in psychological phenomena.",
        tags: ["reading", "neuroscience", "flow"]
      },
      {
        id: "reading.pass19.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What psychological state occurs if the difficulty of a challenge vastly exceeds a person's skill level?",
        correct: "Debilitating anxiety.",
        distractors: ["Profound boredom", "Complete euphoria", "Immediate deep flow"],
        explanation: "The text states that 'if the challenge outstrips ability, debilitating anxiety ensues'.",
        learningObjective: "Identify causal relationships in psychological models.",
        tags: ["reading", "psychological-models", "balance"]
      },
      {
        id: "reading.pass19.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The author argues that in modern knowledge-work environments, the greatest threat to flow is:",
        correct: "Attention fragmentation and persistent notification interruptions.",
        distractors: [
          "A lack of mathematical calculating machines.",
          "Excessive physical exercise during morning commutes.",
          "Overly high salaries offered to software engineers."
        ],
        explanation: "The author concludes that knowledge work is 'plagued by chronic notifications and fragmented attention', which block flow states.",
        learningObjective: "Analyze contemporary workplace environmental obstacles to cognitive performance.",
        tags: ["reading", "workplace", "critical-analysis"]
      }
    ]
  },
  {
    id: "pass-linear-b-20",
    title: "The Decipherment of Linear B",
    passage: `The decipherment of Linear B in 1952 by English architect and self-taught linguist Michael Ventris stands as one of the towering intellectual triumphs of twentieth-century classical epigraphy. Inscribed on sun-baked clay tablets discovered at Knossos on Crete and Mycenae on the Greek mainland, the enigmatic syllabic script had defied linguistic translation for over half a century following its unearthing by Sir Arthur Evans. Evans had adamantly maintained that the tablets recorded an indigenous, non-Greek Minoan tongue completely distinct from Hellenic dialects. Working without a bilingual Rosetta stone, Ventris constructed an intricate syllabic grid correlating repeating phonetic signs with inflectional grammatical declensions. When Ventris populated the grid, recognizable Greek place names—including Knossos, Amnisos, and Pylos—emerged, proving incontrovertibly that the tablets recorded Mycenaean Greek, an archaic Hellenic dialect spoken five centuries before Homer composed the Iliad.`,
    questions: [
      {
        id: "reading.pass20.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "Who successfully deciphered the ancient Linear B script in 1952?",
        correct: "Michael Ventris.",
        distractors: ["Arthur Evans", "Homer", "Jean-François Champollion"],
        explanation: "The passage credits 'English architect and self-taught linguist Michael Ventris' with deciphering Linear B in 1952.",
        learningObjective: "Identify key figures in historical linguistics.",
        tags: ["reading", "linguistics", "history"]
      },
      {
        id: "reading.pass20.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What had Sir Arthur Evans mistakenly claimed regarding the language of Linear B?",
        correct: "That it was an indigenous, non-Greek Minoan language completely unrelated to Greek.",
        distractors: [
          "That it was an ancient dialect of Latin spoken in Rome.",
          "That the clay tablets were modern archaeological forgeries.",
          "That the script represented musical notes rather than words."
        ],
        explanation: "Evans 'had adamantly maintained that the tablets recorded an indigenous, non-Greek Minoan tongue completely distinct from Hellenic dialects'.",
        learningObjective: "Differentiate prevailing historical assumptions from scientific findings.",
        tags: ["reading", "archaeology", "epigraphy"]
      },
      {
        id: "reading.pass20.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What made Ventris's decipherment method particularly impressive?",
        correct: "He deciphered the script without the aid of a bilingual translation stone.",
        distractors: [
          "He used a quantum computer to calculate permutations.",
          "He discovered native speakers still living in isolated mountain villages.",
          "He translated the entire library of Alexandria in one weekend."
        ],
        explanation: "The text emphasizes that 'Working without a bilingual Rosetta stone, Ventris constructed an intricate syllabic grid correlating repeating phonetic signs with inflectional grammatical declensions'.",
        learningObjective: "Analyze decipherment methodologies in classical linguistics.",
        tags: ["reading", "epigraphy", "methodology"]
      },
      {
        id: "reading.pass20.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "What profound historical realization resulted from the successful translation of Linear B?",
        correct: "Mycenaean civilization was linguistically Greek, dating Hellenic culture five centuries earlier than previously proven.",
        distractors: [
          "The Homeric epics were proven to have been written in ancient Egyptian hieroglyphs.",
          "The Minoans and Mycenaeans were revealed to have migrated from the Americas.",
          "Greek civilization did not exist until the Roman imperial conquest."
        ],
        explanation: "The decipherment proved that tablets recorded 'Mycenaean Greek, an archaic Hellenic dialect spoken five centuries before Homer composed the Iliad', fundamentally extending Greek history.",
        learningObjective: "Synthesize broader historical implications of philological discoveries.",
        tags: ["reading", "historical-impact", "inference"]
      }
    ]
  },
  {
    id: "pass-smart-grid-ev-21",
    title: "Autonomous Electric Vehicles and Vehicle-to-Grid Integration",
    passage: `The widespread electrification of commercial and private transportation presents a dual challenge and opportunity for modern electrical power engineering. If millions of electric vehicles (EVs) recharge concurrently via uncoordinated high-wattage residential charging plugs during evening peak hours, local distribution transformers risk thermal overload and brownouts. However, incorporating bidirectional Vehicle-to-Grid (V2G) technology transforms mobile EV battery packs into a massive distributed battery energy storage system. Under intelligent V2G algorithms, parked fleet vehicles absorb surplus solar and wind power during midday periods of negative wholesale pricing, and subsequently inject kilowatt-hours back into the municipal grid during evening demand peaks. Autonomous software orchestrates these micro-transactions while safeguarding individual battery state-of-health and guaranteeing that vehicle owners retain sufficient driving range for morning commutes.`,
    questions: [
      {
        id: "reading.pass21.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What risk arises if millions of electric vehicles recharge simultaneously during evening hours?",
        correct: "Local distribution transformers could suffer thermal overload and cause brownouts.",
        distractors: [
          "Automobile batteries would physically explode across the city.",
          "Wind turbines would completely cease to spin.",
          "Vehicle tires would melt from electrical resistance."
        ],
        explanation: "The passage notes that uncoordinated evening charging risks 'thermal overload and brownouts' for distribution transformers.",
        learningObjective: "Identify electrical infrastructure vulnerabilities.",
        tags: ["reading", "ev", "smart-grid"]
      },
      {
        id: "reading.pass21.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "How does Vehicle-to-Grid (V2G) technology function during peak evening hours?",
        correct: "It injects stored electricity from car batteries back into the municipal grid.",
        distractors: [
          "It forces vehicle owners to drive their cars constantly around the city.",
          "It disconnects all residential houses from the power network.",
          "It converts electricity into synthetic diesel fuel."
        ],
        explanation: "Under V2G, vehicles 'inject kilowatt-hours back into the municipal grid during evening demand peaks'.",
        learningObjective: "Explain bidirectional energy flow mechanisms.",
        tags: ["reading", "v2g", "energy-storage"]
      },
      {
        id: "reading.pass21.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "When do smart V2G systems prefer to charge parked vehicle batteries?",
        correct: "During midday periods when surplus solar and wind power creates low wholesale prices.",
        distractors: [
          "Exclusively during violent lightning storms.",
          "Only when the vehicle is actively driving at highway speeds.",
          "During the evening peak demand window between 7:00 PM and 9:00 PM."
        ],
        explanation: "Vehicles 'absorb surplus solar and wind power during midday periods of negative wholesale pricing'.",
        learningObjective: "Identify economic optimization strategies in smart grid technology.",
        tags: ["reading", "renewable-energy", "pricing"]
      },
      {
        id: "reading.pass21.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "What constraint must autonomous V2G management software respect according to the final sentence?",
        correct: "Preserving battery health and ensuring the owner has enough charge for their morning commute.",
        distractors: [
          "Maximizing utility profits at the complete expense of vehicle battery lifespan.",
          "Draining the battery to absolute zero percent every evening.",
          "Preventing the owner from using their vehicle on weekdays."
        ],
        explanation: "Software orchestrates transactions 'while safeguarding individual battery state-of-health and guaranteeing that vehicle owners retain sufficient driving range for morning commutes'.",
        learningObjective: "Identify algorithmic constraint boundaries in automated systems.",
        tags: ["reading", "algorithms", "constraints"]
      }
    ]
  },
  {
    id: "pass-aquaculture-22",
    title: "Recirculating Aquaculture and Sustainable Marine Systems",
    passage: `With nearly ninety percent of global marine fisheries exploited to their maximum biological limits or depleted, commercial aquaculture has emerged as the fastest-growing food production sector on Earth. However, traditional coastal net-pen marine aquaculture has drawn severe criticism for discharging untreated fecal nitrogen, spreading parasitic sea lice to wild salmon runs, and causing chemical contamination of benthic substrate. In response, modern sustainable operators are transitioning to land-based Recirculating Aquaculture Systems (RAS). RAS facilities rear finfish inside enclosed bio-secure tanks where mechanical drum filters, multi-stage biofilters, and ozone contact chambers continuously purify and recycle over ninety-nine percent of the water volume. Solid fish wastes are captured and converted into agricultural biogas or organic fertilizer, completely decoupling seafood cultivation from fragile coastal marine ecologies while eliminating the need for prophylactic antibiotics.`,
    questions: [
      {
        id: "reading.pass22.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "Why is traditional coastal net-pen fish farming criticized by environmentalists?",
        correct: "It discharges fecal nitrogen, spreads parasites to wild fish, and pollutes the sea floor.",
        distractors: [
          "It captures too much wild rainwater from coastal clouds.",
          "It produces completely inedible fish that cannot be sold in stores.",
          "It permanently cools ocean water temperatures by ten degrees."
        ],
        explanation: "Traditional pens are criticized for 'discharging untreated fecal nitrogen, spreading parasitic sea lice to wild salmon runs, and causing chemical contamination of benthic substrate'.",
        learningObjective: "Identify environmental impacts of conventional aquaculture.",
        tags: ["reading", "aquaculture", "environment"]
      },
      {
        id: "reading.pass22.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What proportion of water is recycled in modern land-based Recirculating Aquaculture Systems (RAS)?",
        correct: "Over ninety-nine percent.",
        distractors: ["Ten percent", "Fifty percent", "Zero percent"],
        explanation: "The text specifies that biofilters and chambers 'continuously purify and recycle over ninety-nine percent of the water volume'.",
        learningObjective: "Retrieve explicit quantitative technical data.",
        tags: ["reading", "technology", "water-conservation"]
      },
      {
        id: "reading.pass22.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "How are solid fish wastes utilized in sustainable land-based RAS facilities?",
        correct: "They are captured and converted into renewable biogas or agricultural fertilizer.",
        distractors: [
          "They are incinerated in open outdoor bonfires.",
          "They are dumped into municipal drinking reservoirs.",
          "They are mixed with chemical antibiotics and fed back to fish."
        ],
        explanation: "Solid wastes 'are captured and converted into agricultural biogas or organic fertilizer'.",
        learningObjective: "Explain circular economy processes in sustainable agriculture.",
        tags: ["reading", "circular-economy", "sustainability"]
      },
      {
        id: "reading.pass22.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The word 'prophylactic' in the final sentence means:",
        correct: "Preventative, intended to ward off disease before it occurs.",
        distractors: [
          "Experimental and untested.",
          "Extremely toxic and lethal.",
          "Illegal under international maritime law."
        ],
        explanation: "In pharmacology and medicine, 'prophylactic' means intended to prevent disease (preventative).",
        learningObjective: "Define medical and pharmacological vocabulary in agricultural contexts.",
        tags: ["reading", "vocabulary", "pharmacology"]
      }
    ]
  },
  {
    id: "pass-neuromarketing-23",
    title: "Neuromarketing and Consumer Choice Architecture",
    passage: `Neuromarketing represents the controversial intersection of cognitive neuroscience, biometric measurement, and commercial advertising strategy. Rather than relying on traditional focus groups or self-reported customer surveys—which are notoriously distorted by social desirability bias and post-hoc rationalization—neuromarketers record direct physiological metrics. Using functional magnetic resonance imaging (fMRI), high-density electroencephalography (EEG), and infrared eye-tracking spectacles, researchers monitor subconscious neural activations in real time. Specific neural biomarkers, such as increased activity in the nucleus accumbens (the brain's dopaminergic reward pathway) combined with decreased activation in the insula (associated with pain and financial loss aversion), reliably predict purchasing behavior far more accurately than subjective verbal affirmations. Critics contend that weaponizing neuroimaging to exploit evolutionary cognitive vulnerabilities circumvents conscious decision-making, converting retail marketing into invasive behavioral coercion.`,
    questions: [
      {
        id: "reading.pass23.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "Why do neuromarketers prefer brain scans over traditional focus groups?",
        correct: "Because self-reported surveys are often distorted by social bias and rationalization.",
        distractors: [
          "Because brain imaging equipment is much cheaper than hiring a conference room.",
          "Because focus groups are completely illegal under consumer protection laws.",
          "Because consumers refuse to speak verbally to market researchers."
        ],
        explanation: "The passage notes that traditional surveys 'are notoriously distorted by social desirability bias and post-hoc rationalization'.",
        learningObjective: "Contrast objective biometric measurement with self-reported survey limitations.",
        tags: ["reading", "neuroscience", "marketing"]
      },
      {
        id: "reading.pass23.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "What neural activation pattern in the brain reliably predicts purchasing decisions?",
        correct: "Increased activity in the nucleus accumbens paired with decreased activity in the insula.",
        distractors: [
          "Complete inactivation of all auditory and visual brain lobes.",
          "Massive electrical discharges across the motor cortex.",
          "Decreased dopamine levels combined with intense physical pain."
        ],
        explanation: "Purchasing is predicted by 'increased activity in the nucleus accumbens... combined with decreased activation in the insula'.",
        learningObjective: "Identify specific neurobiological correlates of decision-making.",
        tags: ["reading", "neurobiology", "cognition"]
      },
      {
        id: "reading.pass23.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What ethical criticism is leveled against commercial neuromarketing?",
        correct: "It exploits subconscious evolutionary vulnerabilities, undermining conscious consumer choice.",
        distractors: [
          "It forces consumers to undergo painful brain surgeries in shopping malls.",
          "It causes permanent memory loss in individuals who view television advertisements.",
          "It replaces physical paper currency with digital gold coins."
        ],
        explanation: "Critics argue that 'weaponizing neuroimaging to exploit evolutionary cognitive vulnerabilities circumvents conscious decision-making, converting retail marketing into invasive behavioral coercion'.",
        learningObjective: "Evaluate ethical critiques of neuro-technological commercialization.",
        tags: ["reading", "ethics", "commercialization"]
      },
      {
        id: "reading.pass23.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The phrase 'post-hoc rationalization' refers to:",
        correct: "Inventing conscious logical reasons to justify an impulsive decision after it has already occurred.",
        distractors: [
          "Mathematically calculating currency exchange fees prior to an international flight.",
          "Translating ancient Greek poetry into modern English prose.",
          "Refusing to participate in scientific laboratory experiments."
        ],
        explanation: "'Post-hoc rationalization' is the psychological process where people concoct logical justifications for emotionally driven decisions after the fact.",
        learningObjective: "Interpret Latinate psychological concepts in consumer behavior.",
        tags: ["reading", "psychological-terms", "inference"]
      }
    ]
  },
  {
    id: "pass-semiconductor-geopolitics-24",
    title: "Global Semiconductor Geopolitics",
    passage: `In the twenty-first-century global economy, advanced semiconductor microchips represent the quintessential strategic commodity, functioning as the foundational nervous system of artificial intelligence, high-performance computing, advanced defense avionics, and automotive manufacturing. However, the semiconductor supply chain is characterized by extreme geographical concentration and hyper-specialization. While chip design is predominantly spearheaded by American fabless technology firms, advanced fabrication of sub-three-nanometer silicon nodes is almost exclusively concentrated in a single island: Taiwan, centered on the foundry giant TSMC. Furthermore, the extreme ultraviolet (EUV) photolithography scanners indispensable for printing these microscopic circuit features are monopolized by a single Dutch corporation, ASML. This extreme concentration creates severe geopolitical chokepoints: any naval blockade or regional military conflict in the Taiwan Strait could instantly paralyze global electronics production, inflicting an estimated multitrillion-dollar shock on global GDP.`,
    questions: [
      {
        id: "reading.pass24.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "Where is the global fabrication of cutting-edge sub-three-nanometer microchips predominantly concentrated?",
        correct: "Taiwan.",
        distractors: ["The Netherlands", "Germany", "Brazil"],
        explanation: "The text states that 'advanced fabrication of sub-three-nanometer silicon nodes is almost exclusively concentrated in a single island: Taiwan'.",
        learningObjective: "Identify geographical concentrations in global technology manufacturing.",
        tags: ["reading", "geopolitics", "technology"]
      },
      {
        id: "reading.pass24.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "Which corporation holds a global monopoly on the extreme ultraviolet (EUV) lithography machines required for advanced chips?",
        correct: "ASML in the Netherlands.",
        distractors: ["TSMC in Taiwan", "Intel in the United States", "Samsung in South Korea"],
        explanation: "The passage notes that machines 'indispensable for printing these microscopic circuit features are monopolized by a single Dutch corporation, ASML'.",
        learningObjective: "Extract institutional monopoly details in high-tech supply chains.",
        tags: ["reading", "monopoly", "semiconductors"]
      },
      {
        id: "reading.pass24.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What economic consequence does the author predict if a military conflict blocks the Taiwan Strait?",
        correct: "Global electronics manufacturing would be paralyzed, causing a multitrillion-dollar shock to global GDP.",
        distractors: [
          "Consumer electronics would become eighty percent cheaper worldwide.",
          "All software code written in Silicon Valley would be permanently deleted.",
          "Microchip manufacturing would seamlessly relocate to local grocery stores."
        ],
        explanation: "A conflict 'could instantly paralyze global electronics production, inflicting an estimated multitrillion-dollar shock on global GDP'.",
        learningObjective: "Analyze geopolitical risk in international macroeconomics.",
        tags: ["reading", "risk", "geopolitics"]
      },
      {
        id: "reading.pass24.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "The word 'fabless' in line 6 describes technology companies that:",
        correct: "Design microchips internally but outsource their actual physical manufacturing to external foundries.",
        distractors: [
          "Fabricate high-strength carbon fiber fabrics for aerospace clothing.",
          "Produce microchips without using any silicon or electricity.",
          "Operate without any formal business licenses or patents."
        ],
        explanation: "'Fabless' semiconductor companies design hardware and chips but do not possess physical fabrication plants ('fabs'), outsourcing manufacturing to foundries like TSMC.",
        learningObjective: "Decipher specialized industry jargon in semiconductor economics.",
        tags: ["reading", "industry-jargon", "semiconductors"]
      }
    ]
  },
  {
    id: "pass-sapir-whorf-25",
    title: "The Linguistic Relativity Hypothesis",
    passage: `The principle of linguistic relativity—widely known as the Sapir-Whorf hypothesis—posits that the particular structural grammar and lexical categories of a language influence or determine the cognitive perceptual habits of its native speakers. The radical formulation of the hypothesis, linguistic determinism (which claimed that language forms an insurmountable cognitive prison constraining thought), has been largely discarded by contemporary cognitive science. However, a nuanced 'weak' version has experienced a vigorous empirical renaissance. Cross-linguistic experimental studies demonstrate that grammatical gender, spatial framing systems, and color terminology demonstrably shape cognitive processing. For instance, speakers of Guugu Yimithirr—an Australian Indigenous language that lacks egocentric relative terms like 'left' and 'right', relying exclusively on absolute cardinal coordinates—maintain an infallible internal compass, orienting themselves in windowless environments with precision that bewilders English speakers. Thus, while language does not prevent humans from perceiving reality, it systematically trains our cognitive attention on specific facets of experience.`,
    questions: [
      {
        id: "reading.pass25.q1",
        difficulty: "easy" as const,
        cefr: "A2" as const,
        prompt: "What is the core premise of the linguistic relativity hypothesis?",
        correct: "A language's grammar and vocabulary influence how its speakers perceive and think about the world.",
        distractors: [
          "All human languages share an identical alphabet of twenty-six letters.",
          "Language is determined exclusively by genetic DNA markers in the blood.",
          "Speaking multiple languages prevents children from developing mathematical skills."
        ],
        explanation: "The hypothesis posits that 'the particular structural grammar and lexical categories of a language influence or determine the cognitive perceptual habits of its native speakers'.",
        learningObjective: "Identify foundational definitions of famous linguistic theories.",
        tags: ["reading", "linguistics", "cognition"]
      },
      {
        id: "reading.pass25.q2",
        difficulty: "medium" as const,
        cefr: "B1" as const,
        prompt: "How does modern cognitive science view the 'strong' deterministic version of the Sapir-Whorf hypothesis?",
        correct: "It has been largely discarded in favor of a nuanced, weaker formulation.",
        distractors: [
          "It has been universally proven as an absolute biological law.",
          "It was adopted as a mandatory policy by international educational boards.",
          "It was replaced by the belief that language has zero connection to thought."
        ],
        explanation: "The text explains that linguistic determinism 'has been largely discarded by contemporary cognitive science', while a weaker version has experienced a renaissance.",
        learningObjective: "Understand historical shifts in scientific theoretical acceptance.",
        tags: ["reading", "history-of-science", "linguistics"]
      },
      {
        id: "reading.pass25.q3",
        difficulty: "medium" as const,
        cefr: "B2" as const,
        prompt: "What spatial terminology does the Guugu Yimithirr language utilize instead of 'left' and 'right'?",
        correct: "Absolute cardinal directional coordinates (north, south, east, west).",
        distractors: [
          "Relative distance measured in footsteps from the village chief.",
          "GPS satellite coordinates transmitted directly to audio implants.",
          "No words for spatial direction whatsoever."
        ],
        explanation: "Guugu Yimithirr 'lacks egocentric relative terms like left and right, relying exclusively on absolute cardinal coordinates'.",
        learningObjective: "Extract anthropological and cross-linguistic empirical examples.",
        tags: ["reading", "anthropology", "spatial-cognition"]
      },
      {
        id: "reading.pass25.q4",
        difficulty: "hard" as const,
        cefr: "C1" as const,
        prompt: "What does the author conclude about the relationship between language and human perception in the final sentence?",
        correct: "Language does not imprison our perception, but it trains habitual attention toward specific aspects of experience.",
        distractors: [
          "People who speak different languages inhabit completely separate physical dimensions.",
          "Thought is entirely impossible without speaking aloud in English.",
          "Grammar rules should be abolished to free human consciousness."
        ],
        explanation: "The final sentence concludes: 'while language does not prevent humans from perceiving reality, it systematically trains our cognitive attention on specific facets of experience'.",
        learningObjective: "Analyze refined philosophical conclusions regarding language and mind.",
        tags: ["reading", "conclusion", "philosophy-of-language"]
      }
    ]
  }
];

export function getAuditedReadingQuestions(): Question[] {
  const result: Question[] = [];
  let count = 0;
  for (const pass of rawReadingPassages) {
    for (const q of pass.questions) {
      const def: ReadingSingleChoiceDef = {
        id: q.id,
        category: "reading-comprehension",
        subcategory: "analytical reading",
        difficulty: q.difficulty,
        cefr: q.cefr,
        passageId: pass.id,
        passage: pass.passage,
        prompt: q.prompt,
        correct: q.correct,
        distractors: q.distractors as [string, string, string],
        explanation: q.explanation,
        learningObjective: q.learningObjective,
        tags: q.tags,
        estimatedSeconds: 45
      };
      result.push(buildReadingSingleChoice(def, count++));
    }
  }
  return result;
}
