import { Question } from "../../../domain/questions/schema.ts";
import { SingleChoiceDef, buildSingleChoice } from "./helpers.ts";

export const rawRecruitmentDefs: SingleChoiceDef[] = [
  // ===================== EASY (A2) - 30 Questions =====================
  {
    id: "recruit.easy.0001",
    category: "recruitment-assessment",
    subcategory: "interview confirmations",
    difficulty: "easy",
    cefr: "A2",
    prompt: "I am writing to ___ my attendance at the preliminary job interview scheduled for Thursday at 2:00 PM.",
    correct: "confirm",
    distractors: ["admit", "approve", "confess"],
    explanation: "'Confirm attendance' is the standard professional business formula used by job candidates.",
    learningObjective: "Use professional interview scheduling terminology.",
    tags: ["recruitment", "interview-scheduling", "a2"]
  },
  {
    id: "recruit.easy.0002",
    category: "recruitment-assessment",
    subcategory: "resume sections",
    difficulty: "easy",
    cefr: "A2",
    prompt: "On an executive resume, the section summarizing previous roles and responsibilities is titled Work ___.",
    correct: "Experience",
    distractors: ["Practice", "Routine", "Labor"],
    explanation: "'Work Experience' (or Professional Experience) is the standard resume heading for past employment.",
    learningObjective: "Identify standard resume and CV headings.",
    tags: ["cv", "resume", "a2"]
  },
  {
    id: "recruit.easy.0003",
    category: "recruitment-assessment",
    subcategory: "interview questions",
    difficulty: "easy",
    cefr: "A2",
    prompt: "When the interviewer asks 'What are your greatest strengths?', an effective response should highlight ___.",
    correct: "relevant skills supported by brief, concrete workplace examples",
    distractors: [
      "hobbies like playing video games on weekends",
      "complaints about your former company manager",
      "demands for an immediate thirty percent salary increase"
    ],
    explanation: "Effective interview responses ground claimed strengths in concrete professional accomplishments relevant to the role.",
    learningObjective: "Identify professional interview best practices.",
    tags: ["interview", "strengths", "a2"]
  },
  {
    id: "recruit.easy.0004",
    category: "recruitment-assessment",
    subcategory: "job advertisements",
    difficulty: "easy",
    cefr: "A2",
    prompt: "The job listing stated that candidates must be ___ in both written and spoken English.",
    correct: "fluent",
    distractors: ["vocal", "talkative", "expressive"],
    explanation: "'Fluent in English' is the universal professional phrase indicating high communicative language competence.",
    learningObjective: "Understand language qualification requirements in job descriptions.",
    tags: ["recruitment", "qualifications", "a2"]
  },
  {
    id: "recruit.easy.0005",
    category: "recruitment-assessment",
    subcategory: "application documents",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Along with your resume, you should submit a one-page cover ___ explaining your motivation for applying.",
    correct: "letter",
    distractors: ["note", "memo", "form"],
    explanation: "A 'cover letter' accompanies a job application to introduce the candidate and express interest.",
    learningObjective: "Identify job application core documentation.",
    tags: ["application", "cover-letter", "a2"]
  },
  {
    id: "recruit.easy.0006",
    category: "recruitment-assessment",
    subcategory: "interview etiquette",
    difficulty: "easy",
    cefr: "A2",
    prompt: "For an in-person job interview, candidates are generally advised to arrive ten to fifteen minutes ___ schedule.",
    correct: "ahead of",
    distractors: ["behind", "out of", "under"],
    explanation: "'Ahead of schedule' means early, demonstrating punctuality and preparedness.",
    learningObjective: "Apply professional punctuality idioms in job interviewing.",
    tags: ["interview", "etiquette", "a2"]
  },
  {
    id: "recruit.easy.0007",
    category: "recruitment-assessment",
    subcategory: "candidate references",
    difficulty: "easy",
    cefr: "A2",
    prompt: "The recruiter requested the contact details of two professional ___ who can vouch for your work ethic.",
    correct: "references",
    distractors: ["witnesses", "advisors", "allies"],
    explanation: "A 'professional reference' is a former manager or colleague who provides testimony on a candidate's suitability.",
    learningObjective: "Identify employment verification roles.",
    tags: ["recruitment", "references", "a2"]
  },
  {
    id: "recruit.easy.0008",
    category: "recruitment-assessment",
    subcategory: "job interviews",
    difficulty: "easy",
    cefr: "A2",
    prompt: "At the end of an interview, when asked 'Do you have any questions for us?', a candidate should ___.",
    correct: "ask thoughtful questions about the team culture and strategic company goals",
    distractors: [
      "say 'No, I want to go home right now'",
      "ask how many sick days can be taken without a doctor note",
      "demand to know the personal political views of the interviewer"
    ],
    explanation: "Asking questions demonstrates engagement, intellectual curiosity, and genuine motivation.",
    learningObjective: "Master candidate interview conclusion strategies.",
    tags: ["interview", "etiquette", "a2"]
  },
  {
    id: "recruit.easy.0009",
    category: "recruitment-assessment",
    subcategory: "hiring steps",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Before the final in-person panel, candidates must pass a thirty-minute telephone ___ with Human Resources.",
    correct: "screening",
    distractors: ["filtration", "examination", "inquiry"],
    explanation: "A preliminary phone conversation to check basic qualifications is called a 'phone screening'.",
    learningObjective: "Identify recruitment workflow stages.",
    tags: ["recruitment", "screening", "a2"]
  },
  {
    id: "recruit.easy.0010",
    category: "recruitment-assessment",
    subcategory: "job offers",
    difficulty: "easy",
    cefr: "A2",
    prompt: "After completing all interview rounds, the hiring manager extended a formal job ___ to the successful candidate.",
    correct: "offer",
    distractors: ["gift", "award", "prize"],
    explanation: "An official proposal of employment specifying salary and terms is a 'job offer'.",
    learningObjective: "Recognize employment offer terminology.",
    tags: ["recruitment", "job-offer", "a2"]
  },
  {
    id: "recruit.easy.0011",
    category: "recruitment-assessment",
    subcategory: "candidate correspondence",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Within twenty-four hours after an interview, it is customary to send a brief thank-you ___ by email.",
    correct: "note",
    distractors: ["bill", "ticket", "cheque"],
    explanation: "A 'thank-you note' (or follow-up email) expresses gratitude for the interviewer's time and reiterates interest.",
    learningObjective: "Apply post-interview follow-up etiquette.",
    tags: ["recruitment", "follow-up", "a2"]
  },
  {
    id: "recruit.easy.0012",
    category: "recruitment-assessment",
    subcategory: "compensation",
    difficulty: "easy",
    cefr: "A2",
    prompt: "In job postings, the term 'remuneration package' refers to salary, health insurance, and other company ___.",
    correct: "benefits",
    distractors: ["favors", "allowances", "discounts"],
    explanation: "Non-wage compensations like insurance, paid leave, and retirement contributions are 'benefits'.",
    learningObjective: "Identify elements of total compensation packages.",
    tags: ["compensation", "benefits", "a2"]
  },
  {
    id: "recruit.easy.0013",
    category: "recruitment-assessment",
    subcategory: "cv formatting",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Job achievements on a resume should be organized cleanly using concise ___ points.",
    correct: "bullet",
    distractors: ["arrow", "dash", "star"],
    explanation: "'Bullet points' are typographical dots used to format concise, scannable achievement lists.",
    learningObjective: "Format modern professional resumes.",
    tags: ["cv", "formatting", "a2"]
  },
  {
    id: "recruit.easy.0014",
    category: "recruitment-assessment",
    subcategory: "interview questions",
    difficulty: "easy",
    cefr: "A2",
    prompt: "When asked 'Why are you looking to leave your current role?', candidates should maintain a ___ tone.",
    correct: "positive and forward-looking",
    distractors: [
      "bitter and resentful",
      "aggressive and accusatory",
      "sarcastic and dismissive"
    ],
    explanation: "Candidates should focus on seeking growth, new challenges, and career progression rather than venting complaints.",
    learningObjective: "Frame career transitions positively during interviews.",
    tags: ["interview", "framing", "a2"]
  },
  {
    id: "recruit.easy.0015",
    category: "recruitment-assessment",
    subcategory: "notice period",
    difficulty: "easy",
    cefr: "A2",
    prompt: "The standard time an employee must work after submitting their formal resignation is their notice ___.",
    correct: "period",
    distractors: ["term", "interval", "duration"],
    explanation: "The contractually required lead time between resigning and departing is the 'notice period'.",
    learningObjective: "Understand employment transition clauses.",
    tags: ["recruitment", "contracts", "a2"]
  },
  {
    id: "recruit.easy.0016",
    category: "recruitment-assessment",
    subcategory: "dress code",
    difficulty: "easy",
    cefr: "A2",
    prompt: "When interviewing at a traditional law firm or investment bank, candidates should dress in formal business ___.",
    correct: "attire",
    distractors: ["costume", "garment", "outfit"],
    explanation: "'Business attire' is the formal professional term for business clothing such as suits and dress shirts.",
    learningObjective: "Identify professional interview dress code terminology.",
    tags: ["interview", "attire", "a2"]
  },
  {
    id: "recruit.easy.0017",
    category: "recruitment-assessment",
    subcategory: "recruiter roles",
    difficulty: "easy",
    cefr: "A2",
    prompt: "A specialized agency that actively searches for senior executive candidates is called a ___ firm.",
    correct: "headhunting",
    distractors: ["talent-stalking", "manpower-hunting", "executive-chasing"],
    explanation: "'Headhunting' (or executive search) refers to recruiting senior executives from competitors.",
    learningObjective: "Identify talent acquisition terminology.",
    tags: ["recruitment", "headhunting", "a2"]
  },
  {
    id: "recruit.easy.0018",
    category: "recruitment-assessment",
    subcategory: "online interviews",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Before a remote video interview, candidates should test their web camera and microphone in ___.",
    correct: "advance",
    distractors: ["front", "forward", "anticipation"],
    explanation: "'In advance' is the standard collocation meaning beforehand.",
    learningObjective: "Apply remote video interview preparation guidelines.",
    tags: ["remote-interview", "technology", "a2"]
  },
  {
    id: "recruit.easy.0019",
    category: "recruitment-assessment",
    subcategory: "probationary periods",
    difficulty: "easy",
    cefr: "A2",
    prompt: "New hires often undergo a three-month ___ period to assess their job suitability before permanent status.",
    correct: "probationary",
    distractors: ["experimental", "tentative", "provisional"],
    explanation: "The initial evaluation trial window for a new employee is the 'probationary period'.",
    learningObjective: "Identify employment contract probationary terms.",
    tags: ["employment", "contracts", "a2"]
  },
  {
    id: "recruit.easy.0020",
    category: "recruitment-assessment",
    subcategory: "job vacancies",
    difficulty: "easy",
    cefr: "A2",
    prompt: "The company announced three new job ___ in its software engineering department.",
    correct: "openings",
    distractors: ["holes", "clearings", "gaps"],
    explanation: "'Job openings' (or job vacancies) refers to unfilled employment positions available to applicants.",
    learningObjective: "Use employment availability terminology.",
    tags: ["recruitment", "vacancies", "a2"]
  },
  {
    id: "recruit.easy.0021",
    category: "recruitment-assessment",
    subcategory: "resume action verbs",
    difficulty: "easy",
    cefr: "A2",
    prompt: "On a resume, start descriptive achievement bullet points with strong action ___.",
    correct: "verbs",
    distractors: ["nouns", "adverbs", "conjunctions"],
    explanation: "Resume writing best practice mandates opening accomplishment statements with vigorous action verbs (e.g. spearheaded, orchestrated).",
    learningObjective: "Master CV action verb formatting.",
    tags: ["cv", "action-verbs", "a2"]
  },
  {
    id: "recruit.easy.0022",
    category: "recruitment-assessment",
    subcategory: "interviewer feedback",
    difficulty: "easy",
    cefr: "A2",
    prompt: "The recruitment coordinator promised to provide hiring ___ by next Wednesday afternoon.",
    correct: "feedback",
    distractors: ["responses", "critiques", "reviews"],
    explanation: "'Provide feedback' is the standard professional phrase for communicating hiring decisions and candidate evaluations.",
    learningObjective: "Use professional recruitment communication phrases.",
    tags: ["recruitment", "feedback", "a2"]
  },
  {
    id: "recruit.easy.0023",
    category: "recruitment-assessment",
    subcategory: "salary discussions",
    difficulty: "easy",
    cefr: "A2",
    prompt: "When asked about compensation expectations, a candidate should provide a realistic salary ___ based on market research.",
    correct: "range",
    distractors: ["span", "stretch", "scope"],
    explanation: "Providing a 'salary range' allows flexibility during compensation negotiations.",
    learningObjective: "Formulate salary expectation responses.",
    tags: ["compensation", "negotiation", "a2"]
  },
  {
    id: "recruit.easy.0024",
    category: "recruitment-assessment",
    subcategory: "skills categories",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Interpersonal communication, teamwork, and empathy are commonly categorized as ___ skills.",
    correct: "soft",
    distractors: ["light", "weak", "mild"],
    explanation: "'Soft skills' refers to personal attributes and social abilities, contrasted with technical 'hard skills'.",
    learningObjective: "Distinguish soft skills from technical hard skills.",
    tags: ["skills", "competencies", "a2"]
  },
  {
    id: "recruit.easy.0025",
    category: "recruitment-assessment",
    subcategory: "portfolio review",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Design candidates are expected to bring a digital ___ showcasing their previous creative work.",
    correct: "portfolio",
    distractors: ["binder", "dossier", "brochure"],
    explanation: "A 'portfolio' is an edited compilation of an artist's or designer's best work samples.",
    learningObjective: "Identify professional design application requirements.",
    tags: ["creative", "portfolio", "a2"]
  },
  {
    id: "recruit.easy.0026",
    category: "recruitment-assessment",
    subcategory: "declining an offer",
    difficulty: "easy",
    cefr: "A2",
    prompt: "If you decide not to accept a job offer, you should decline politely in writing to maintain a professional ___.",
    correct: "relationship",
    distractors: ["affection", "familiarity", "comradeship"],
    explanation: "Declining an offer with courtesy preserves positive professional relationships for future opportunities.",
    learningObjective: "Apply professional courtesy when declining job offers.",
    tags: ["job-offer", "etiquette", "a2"]
  },
  {
    id: "recruit.easy.0027",
    category: "recruitment-assessment",
    subcategory: "background checks",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Before finalizing the employment contract, the human resources team conducted a routine background ___.",
    correct: "check",
    distractors: ["test", "inspection", "audit"],
    explanation: "A 'background check' verifies a candidate's criminal history, educational credentials, and past employment.",
    learningObjective: "Identify employment verification procedures.",
    tags: ["recruitment", "compliance", "a2"]
  },
  {
    id: "recruit.easy.0028",
    category: "recruitment-assessment",
    subcategory: "interview questions",
    difficulty: "easy",
    cefr: "A2",
    prompt: "When an interviewer asks 'Where do you see yourself in five years?', they are evaluating your ___.",
    correct: "career ambition, realistic planning, and potential longevity with the firm",
    distractors: [
      "retirement savings account balances",
      "political election voting intentions",
      "choice of future residential holiday destinations"
    ],
    explanation: "The question assesses whether a candidate has realistic career goals aligned with organizational growth.",
    learningObjective: "Understand the underlying purpose of standard interview questions.",
    tags: ["interview", "career-goals", "a2"]
  },
  {
    id: "recruit.easy.0029",
    category: "recruitment-assessment",
    subcategory: "employment status",
    difficulty: "easy",
    cefr: "A2",
    prompt: "An employee who works forty hours per week is classified as a ___-time worker.",
    correct: "full",
    distractors: ["total", "complete", "whole"],
    explanation: "'Full-time' employment designates standard standard weekly hours (usually 35-40 hours).",
    learningObjective: "Distinguish full-time from part-time employment statuses.",
    tags: ["employment", "status", "a2"]
  },
  {
    id: "recruit.easy.0030",
    category: "recruitment-assessment",
    subcategory: "job portals",
    difficulty: "easy",
    cefr: "A2",
    prompt: "Candidates can set up email alerts on professional career ___ to be notified of new openings.",
    correct: "portals",
    distractors: ["doors", "gates", "entrances"],
    explanation: "Online websites dedicated to job listings and applications are referred to as 'career portals' or 'job boards'.",
    learningObjective: "Use modern digital recruitment technology terms.",
    tags: ["technology", "job-search", "a2"]
  },

  // ===================== MEDIUM (B1 - B2) - 35 Questions =====================
  {
    id: "recruit.medium.0001",
    category: "recruitment-assessment",
    subcategory: "STAR methodology",
    difficulty: "medium",
    cefr: "B2",
    prompt: "In behavioral interviews, the acronym STAR stands for Situation, Task, Action, and ___.",
    correct: "Result",
    distractors: ["Review", "Reaction", "Resolution"],
    explanation: "The STAR framework is the standard structure for answering behavioral interview questions: Situation, Task, Action, Result.",
    learningObjective: "Master the STAR behavioral interview framework.",
    tags: ["interview", "star-method", "b2"]
  },
  {
    id: "recruit.medium.0002",
    category: "recruitment-assessment",
    subcategory: "quantifying resume impact",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Which of the following resume bullet points demonstrates superior professional impact?",
    correct: "Spearheaded a regional sales campaign that increased revenue by 24% over two quarters.",
    distractors: [
      "Was responsible for helping with sales calls sometimes.",
      "Handled daily marketing duties assigned by the manager.",
      "Worked in the sales department with several other team members."
    ],
    explanation: "Strong resume bullets use active leadership verbs and quantify tangible business results with specific metrics.",
    learningObjective: "Evaluate resume bullet point impact and quantification.",
    tags: ["cv", "quantification", "b2"]
  },
  {
    id: "recruit.medium.0003",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "medium",
    cefr: "B2",
    prompt: "SITUATIONAL SCENARIO: A client demands a project scope change that would cause a missed regulatory deadline. How should you respond?",
    correct: "Acknowledge the client's objective, explain the regulatory compliance risk, and present alternative phased options.",
    distractors: [
      "Immediately agree to all scope changes and secretly submit the compliance paperwork late.",
      "Bluntly refuse the client and terminate the contract on the spot.",
      "Ignore the client's email and hope they forget about the requested feature."
    ],
    explanation: "Professional situational judgment requires active listening, transparent risk communication, and collaborative solution-generation.",
    learningObjective: "Demonstrate professional situational judgment in client management dilemmas.",
    tags: ["sjt", "client-management", "b2"]
  },
  {
    id: "recruit.medium.0004",
    category: "recruitment-assessment",
    subcategory: "competency-based questions",
    difficulty: "medium",
    cefr: "B2",
    prompt: "When an interviewer asks 'Describe a time you navigated an interpersonal conflict with a peer', they are assessing ___.",
    correct: "emotional intelligence, de-escalation skills, and constructive collaboration under pressure",
    distractors: [
      "whether you can physically overpower your colleagues in debates",
      "how quickly you report coworkers to senior corporate authorities",
      "your personal willingness to gossip about underperforming teammates"
    ],
    explanation: "Conflict resolution questions evaluate emotional maturity, self-regulation, empathy, and professional compromise.",
    learningObjective: "Understand the diagnostic purpose of behavioral conflict queries.",
    tags: ["interview", "conflict-resolution", "b2"]
  },
  {
    id: "recruit.medium.0005",
    category: "recruitment-assessment",
    subcategory: "applicant tracking systems",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Many corporations use an Applicant Tracking System (ATS) to ___ resumes before human recruiters review them.",
    correct: "parse",
    distractors: ["encrypt", "obfuscate", "redact"],
    explanation: "An ATS 'parses' resumes, scanning text for relevant keywords, qualifications, and experience matched to the job description.",
    learningObjective: "Understand ATS keyword optimization in digital recruitment.",
    tags: ["ats", "technology", "b2"]
  },
  {
    id: "recruit.medium.0006",
    category: "recruitment-assessment",
    subcategory: "addressing weaknesses",
    difficulty: "medium",
    cefr: "B2",
    prompt: "When asked 'What is your greatest developmental area or weakness?', the most effective approach is to ___.",
    correct: "discuss an authentic, non-fatal skill gap and describe concrete proactive steps you are taking to improve it",
    distractors: [
      "offer a clichéd humblebrag like 'I am just too much of a perfectionist and work too hard'",
      "confess a severe disqualifying flaw like 'I often steal office supplies and lie to bosses'",
      "claim that you possess zero flaws because your intellect is superior to everyone else"
    ],
    explanation: "Authentic self-awareness combined with demonstrated proactive learning demonstrates maturity and coachability.",
    learningObjective: "Frame professional weaknesses constructively in interviews.",
    tags: ["interview", "weaknesses", "b2"]
  },
  {
    id: "recruit.medium.0007",
    category: "recruitment-assessment",
    subcategory: "salary negotiation",
    difficulty: "medium",
    cefr: "B2",
    prompt: "During salary negotiation, which phrasing is most diplomatic and professionally effective?",
    correct: "Based on my specialized industry certifications and regional benchmark data, I was targeting a base salary around $95,000.",
    distractors: [
      "Pay me $95,000 immediately or I will sign with your fiercest competitor by tomorrow morning.",
      "I don't care about money at all, pay me whatever pocket change you feel like offering.",
      "My rent is very expensive, so you are morally obligated to give me six figures."
    ],
    explanation: "Anchoring salary expectations in verifiable market benchmarks and specialized credentials creates a defensible, objective negotiation footing.",
    learningObjective: "Use professional diplomatic language in compensation negotiations.",
    tags: ["negotiation", "compensation", "b2"]
  },
  {
    id: "recruit.medium.0008",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "medium",
    cefr: "B2",
    prompt: "SITUATIONAL SCENARIO: You discover that a colleague accidentally left a draft containing confidential merger details on a public conference room table. What should you do?",
    correct: "Secure the documents immediately, return them privately to the colleague, and discuss data protection protocols constructively.",
    distractors: [
      "Take photographs of the documents and leak them to financial journalists on social media.",
      "Leave the documents on the table to see if anyone else notices them.",
      "Loudly humiliate the colleague in front of the entire open-plan office."
    ],
    explanation: "Protecting corporate confidentiality immediately while addressing peer errors with discretion and constructive support represents sound professional judgment.",
    learningObjective: "Apply situational judgment in data security and peer collaboration.",
    tags: ["sjt", "ethics", "b2"]
  },
  {
    id: "recruit.medium.0009",
    category: "recruitment-assessment",
    subcategory: "declining an offer diplomatically",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Which email excerpt best declines a job offer while maintaining strong professional bridges?",
    correct: "While I was deeply impressed by your team and mission, I have accepted an offer that more closely aligns with my clinical research focus.",
    distractors: [
      "Your company pays too little money and your office location is completely terrible.",
      "I am declining your offer because your CEO seemed very arrogant during the panel.",
      "I have decided that working for your enterprise would be a total waste of my talents."
    ],
    explanation: "Expressing genuine gratitude, citing specific alignment factors, and maintaining courtesy preserves positive industry goodwill.",
    learningObjective: "Draft diplomatic offer decline correspondence.",
    tags: ["emails", "diplomacy", "b2"]
  },
  {
    id: "recruit.medium.0010",
    category: "recruitment-assessment",
    subcategory: "case interview framework",
    difficulty: "medium",
    cefr: "B2",
    prompt: "In consulting case interviews, the MECE principle requires analytical frameworks to be Mutually Exclusive and Collectively ___.",
    correct: "Exhaustive",
    distractors: ["Extensive", "Explanatory", "Evaluative"],
    explanation: "MECE stands for 'Mutually Exclusive and Collectively Exhaustive', a fundamental problem-solving structuring principle.",
    learningObjective: "Master consulting case interview frameworks.",
    tags: ["consulting", "case-interview", "b2"]
  },
  {
    id: "recruit.medium.0011",
    category: "recruitment-assessment",
    subcategory: "evaluating culture fit",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Which question asked by a candidate best evaluates psychological safety and team leadership style?",
    correct: "How does the leadership team typically respond when a strategic experiment or sprint goal fails?",
    distractors: [
      "Can I take three-hour lunch breaks every day without telling anyone?",
      "Does the company fire underperforming employees immediately by email?",
      "How much money does the highest-paid executive in this building earn?"
    ],
    explanation: "Inquiring about institutional responses to failure provides direct insight into organizational psychological safety and blame culture.",
    learningObjective: "Formulate incisive candidate questions regarding organizational culture.",
    tags: ["interview", "culture", "b2"]
  },
  {
    id: "recruit.medium.0012",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "medium",
    cefr: "B2",
    prompt: "SITUATIONAL SCENARIO: You notice a major coding bug twenty minutes before a scheduled software release. Deploying on time was a key executive milestone. What should you do?",
    correct: "Flag the defect immediately to the release lead, assess the severity of impact, and recommend postponing deployment if data integrity is threatened.",
    distractors: [
      "Stay silent, deploy the software on time to look good, and blame the testing team tomorrow when it crashes.",
      "Delete the bug tracking ticket so nobody discovers the issue.",
      "Leave the office early so you are unreachable when the system breaks."
    ],
    explanation: "Integrity requires prioritizing system reliability and customer data over cosmetic milestone adherence.",
    learningObjective: "Resolve situational judgment conflicts between deadlines and quality standards.",
    tags: ["sjt", "integrity", "b2"]
  },
  {
    id: "recruit.medium.0013",
    category: "recruitment-assessment",
    subcategory: "cover letter openings",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Which cover letter opening is most compelling and professional?",
    correct: "Having driven a 30% reduction in supply chain lead times at my previous firm, I was thrilled to see your opening for Senior Logistics Manager.",
    distractors: [
      "Hi there, I need a job right now because I have bills to pay and your office is close to my house.",
      "I am writing this letter because someone told me I had to attach one to my application.",
      "To Whom It May Concern, I am the smartest developer in this country and you should hire me today."
    ],
    explanation: "Opening with a quantifiable career milestone directly relevant to the target role captures recruiter attention effectively.",
    learningObjective: "Draft impactful cover letter hooks.",
    tags: ["cover-letter", "writing", "b2"]
  },
  {
    id: "recruit.medium.0014",
    category: "recruitment-assessment",
    subcategory: "panel interview dynamics",
    difficulty: "medium",
    cefr: "B2",
    prompt: "During a panel interview with five interviewers from different departments, a candidate should ___.",
    correct: "maintain eye contact with the person who asked the query while scanning the other panel members as you expand your answer",
    distractors: [
      "stare exclusively at the highest-ranking executive and completely ignore junior panel members",
      "look only at the floor or ceiling to avoid feeling nervous",
      "address all answers exclusively to the Human Resources representative"
    ],
    explanation: "Engaging the entire panel while answering ensures inclusive stakeholder communication.",
    learningObjective: "Master multi-interviewer panel communication dynamics.",
    tags: ["interview", "body-language", "b2"]
  },
  {
    id: "recruit.medium.0015",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "medium",
    cefr: "B2",
    prompt: "SITUATIONAL SCENARIO: You are assigned two high-priority projects by two different department heads, and completing both by Friday is mathematically impossible. How should you handle this?",
    correct: "Proactively bring both managers together, explain the time constraints with transparent data, and request alignment on priority ordering.",
    distractors: [
      "Secretly work on only one project and make up excuses on Friday for the unfinished one.",
      "Work eighty hours without sleeping and submit sub-standard, error-filled drafts of both.",
      "Complain loudly to junior coworkers that management is totally incompetent."
    ],
    explanation: "Proactive communication, transparent constraint-sharing, and facilitating stakeholder alignment reflect mature project management.",
    learningObjective: "Manage competing executive priorities professionally.",
    tags: ["sjt", "prioritization", "b2"]
  },
  {
    id: "recruit.medium.0016",
    category: "recruitment-assessment",
    subcategory: "resume action verbs",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Which action verb best conveys strategic leadership and organizational transformation on a resume?",
    correct: "Spearheaded",
    distractors: ["Watched", "Followed", "Helped with"],
    explanation: "'Spearheaded' demonstrates proactive, visionary leadership in driving an initiative forward.",
    learningObjective: "Select high-impact executive action verbs.",
    tags: ["cv", "action-verbs", "b2"]
  },
  {
    id: "recruit.medium.0017",
    category: "recruitment-assessment",
    subcategory: "counter-offers",
    difficulty: "medium",
    cefr: "B2",
    prompt: "When an existing employer makes a counter-offer after you resign, career advisors caution that ___.",
    correct: "underlying organizational cultural issues or lack of growth opportunities often remain unresolved despite a pay bump",
    distractors: [
      "counter-offers are illegal in all industrialized countries",
      "accepting a counter-offer guarantees an immediate promotion to CEO within six months",
      "employers always fire employees twenty-four hours after making a counter-offer"
    ],
    explanation: "Studies indicate that the fundamental reasons prompting a job search (culture, burnout, career stagnation) rarely vanish solely because of a counter-offer salary adjustment.",
    learningObjective: "Analyze career transition counter-offer risks.",
    tags: ["career-coaching", "retention", "b2"]
  },
  {
    id: "recruit.medium.0018",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "medium",
    cefr: "B2",
    prompt: "SITUATIONAL SCENARIO: During a cross-departmental sprint meeting, a colleague publicly criticizes your data model as 'completely flawed and useless.' How should you respond?",
    correct: "Remain calm, acknowledge their perspective, and ask for specific data points to explore and address their concerns objectively.",
    distractors: [
      "Insult the colleague's personal qualifications and storm out of the conference room.",
      "Burst into tears and accuse the team of systemic bullying.",
      "Agree immediately that your work is useless and ask to be taken off the project."
    ],
    explanation: "Emotional poise, de-personalizing criticism, and focusing the discussion on empirical data points defuse public attacks constructively.",
    learningObjective: "Apply constructive emotional regulation during public workplace friction.",
    tags: ["sjt", "emotional-intelligence", "b2"]
  },
  {
    id: "recruit.medium.0019",
    category: "recruitment-assessment",
    subcategory: "post-interview thank you email",
    difficulty: "medium",
    cefr: "B2",
    prompt: "In a post-interview follow-up email, mentioning a specific topic discussed during the conversation demonstrates ___.",
    correct: "active listening, genuine engagement, and personalized interest in the team's challenges",
    distractors: [
      "that you secretly recorded the interview on an unauthorized audio device",
      "that you have no other job prospects anywhere in the industry",
      "that you are attempting to rewrite the company's financial bylaws"
    ],
    explanation: "Referencing a specific conversational nuance proves attention to detail and authentic engagement.",
    learningObjective: "Personalize post-interview follow-up communications.",
    tags: ["recruitment", "follow-up", "b2"]
  },
  {
    id: "recruit.medium.0020",
    category: "recruitment-assessment",
    subcategory: "video interview setup",
    difficulty: "medium",
    cefr: "B2",
    prompt: "During a virtual video interview, positioning the camera at eye level rather than below chin level ensures ___.",
    correct: "a natural, professional sightline that simulates direct interpersonal eye contact",
    distractors: [
      "that the interviewer cannot hear background traffic noise",
      "that your computer battery lasts twice as long",
      "that software screen-sharing is automatically disabled"
    ],
    explanation: "An eye-level camera creates a natural psychological connection and professional presence.",
    learningObjective: "Optimize virtual interview technical presence.",
    tags: ["remote-interview", "body-language", "b2"]
  },
  {
    id: "recruit.medium.0021",
    category: "recruitment-assessment",
    subcategory: "gap in employment",
    difficulty: "medium",
    cefr: "B2",
    prompt: "When asked about a six-month gap between jobs on your resume, the most effective response is to ___.",
    correct: "explain the gap honestly and highlight productive activities like freelancing, courses, or caregiving undertaken during that time",
    distractors: [
      "invent a fake foreign company where you claim you worked as vice president",
      "become defensive and tell the interviewer that their question is an illegal invasion of privacy",
      "claim that you were abducted by secret government intelligence services"
    ],
    explanation: "Transparency paired with productive self-improvement or genuine caregiving explanations satisfies recruiter inquiries positively.",
    learningObjective: "Address employment gaps with candor and credibility.",
    tags: ["interview", "employment-gap", "b2"]
  },
  {
    id: "recruit.medium.0022",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "medium",
    cefr: "B2",
    prompt: "SITUATIONAL SCENARIO: A junior team member makes an honest calculation error in a spreadsheet that is caught before sending to the client. How should a lead handle this?",
    correct: "Use it as a constructive learning opportunity, walk through the correction together, and implement a peer-review checklist.",
    distractors: [
      "Publicly humiliate the junior employee in the team chat to set an example.",
      "Immediately report the junior worker to Human Resources for disciplinary termination.",
      "Secretly fix the error without telling the junior colleague, leaving them unaware of the mistake."
    ],
    explanation: "Constructive coaching and systemic checklists prevent future errors while building psychological safety.",
    learningObjective: "Apply servant leadership in mentoring junior colleagues.",
    tags: ["sjt", "mentorship", "b2"]
  },
  {
    id: "recruit.medium.0023",
    category: "recruitment-assessment",
    subcategory: "technical assessment",
    difficulty: "medium",
    cefr: "B2",
    prompt: "During a live technical coding or case assessment, narrating your thought process out loud allows evaluators to ___.",
    correct: "observe your problem-solving methodology, structured reasoning, and handling of ambiguity",
    distractors: [
      "listen to how loud your voice can get under physical stress",
      "verify that you have memorized every single dictionary word in English",
      "grade your theatrical voice acting skills"
    ],
    explanation: "Evaluators value how a candidate structures problems, isolates assumptions, and tests hypotheses over sheer memorized code.",
    learningObjective: "Master live technical problem-solving communication.",
    tags: ["interview", "technical-assessment", "b2"]
  },
  {
    id: "recruit.medium.0024",
    category: "recruitment-assessment",
    subcategory: "negotiating start dates",
    difficulty: "medium",
    cefr: "B2",
    prompt: "If you need a three-week transition before starting a new position, the most professional time to discuss this is ___.",
    correct: "after receiving the formal written job offer, during the terms and compensation review phase",
    distractors: [
      "in the very first sentence of your cover letter",
      "on your first scheduled day of work without notifying anyone in advance",
      "after signing the contract and disappearing for two months"
    ],
    explanation: "Start dates are standard negotiable components of the formal offer stage.",
    learningObjective: "Identify optimal timing for employment negotiation variables.",
    tags: ["negotiation", "start-dates", "b2"]
  },
  {
    id: "recruit.medium.0025",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "medium",
    cefr: "B2",
    prompt: "SITUATIONAL SCENARIO: You notice that a senior manager repeatedly interrupts and talks over female colleagues during cross-functional meetings. How should you constructively intervene?",
    correct: "In the meeting, use conversational amplification: 'I'd really like to hear Sarah finish her thought on the budget projections.'",
    distractors: [
      "Stand on the table and yell accusations of systemic discrimination at the top of your lungs.",
      "Stay silent and laugh along with the interruptions to protect your personal promotion chances.",
      "Send an anonymous defamatory email to all local newspapers."
    ],
    explanation: "Amplification techniques tactfully restore voice and credit to interrupted colleagues while maintaining professional meeting decorum.",
    learningObjective: "Apply inclusive allyship techniques in workplace meeting facilitation.",
    tags: ["sjt", "inclusion", "b2"]
  },
  {
    id: "recruit.medium.0026",
    category: "recruitment-assessment",
    subcategory: "competency evaluation",
    difficulty: "medium",
    cefr: "B2",
    prompt: "In competency frameworks, 'adaptability' is best demonstrated by showing that you ___.",
    correct: "pivoted project strategies successfully when unexpected regulatory or market shifts occurred",
    distractors: [
      "refused to learn any new software programs over the past ten years",
      "always followed rigid instructions regardless of whether the results made business sense",
      "abandoned all ongoing projects whenever a minor obstacle arose"
    ],
    explanation: "Adaptability involves resilience, flexible cognitive problem-solving, and pivoting effectively under shifting constraints.",
    learningObjective: "Identify behavioral evidence of professional adaptability.",
    tags: ["competencies", "adaptability", "b2"]
  },
  {
    id: "recruit.medium.0027",
    category: "recruitment-assessment",
    subcategory: "handling rejection",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Upon receiving a polite rejection email after a final interview round, an ambitious candidate should ___.",
    correct: "respond with a gracious note thanking the team for their time and expressing interest in staying connected for future opportunities",
    distractors: [
      "reply with an angry email explaining why the interviewers made a catastrophic mistake",
      "post negative fake reviews about the company on multiple consumer review sites",
      "call the CEO's personal cell phone repeatedly to demand a re-interview"
    ],
    explanation: "Graceful rejection responses establish enduring professional maturity; hiring teams often reconsider runners-up for subsequent openings.",
    learningObjective: "Handle employment rejection constructively and preserve career networks.",
    tags: ["recruitment", "resilience", "b2"]
  },
  {
    id: "recruit.medium.0028",
    category: "recruitment-assessment",
    subcategory: "quantifying accomplishments",
    difficulty: "medium",
    cefr: "B2",
    prompt: "Which formula is widely recommended by Google recruiters for crafting high-impact resume bullets?",
    correct: "Accomplished [X], as measured by [Y], by doing [Z].",
    distractors: [
      "Did [X] because the manager told me to do it.",
      "Worked on [X] with a lot of effort and passion.",
      "Was responsible for [X] throughout my entire time there."
    ],
    explanation: "The Google XYZ formula ('Accomplished [X], measured by [Y], by doing [Z]') ensures concrete, quantifiable, active achievement descriptions.",
    learningObjective: "Apply the Google XYZ resume achievement formula.",
    tags: ["cv", "google-formula", "b2"]
  },
  {
    id: "recruit.medium.0029",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "medium",
    cefr: "B2",
    prompt: "SITUATIONAL SCENARIO: A client praises you personally for a successful software deployment, unaware that a colleague did eighty percent of the foundational coding. What should you say?",
    correct: "'Thank you! It was truly a team effort, and my colleague David deserves primary credit for engineering the core database architecture.'",
    distractors: [
      "'Yes, I am a genius and I built the entire system with zero help from anyone else.'",
      "'David is totally incompetent, so I had to rewrite all his code secretly.'",
      "Say nothing and accept an individual cash bonus meant for the team."
    ],
    explanation: "True professional integrity involves ensuring that credit is accurately and generously attributed to contributing teammates.",
    learningObjective: "Demonstrate professional honesty and credit-sharing ethics.",
    tags: ["sjt", "integrity", "b2"]
  },
  {
    id: "recruit.medium.0030",
    category: "recruitment-assessment",
    subcategory: "group assessment centers",
    difficulty: "medium",
    cefr: "B2",
    prompt: "During a group assessment center simulation, evaluators look primarily for candidates who ___.",
    correct: "listen actively, build upon others' ideas, and facilitate collaborative consensus toward the objective",
    distractors: [
      "interrupt and shout over all other participants to dominate the speaking time",
      "remain completely silent in the corner to avoid saying anything wrong",
      "tell other candidates that their ideas are foolish and ignorant"
    ],
    explanation: "Group assessments evaluate collaborative leadership, inclusive facilitation, and constructive team engagement.",
    learningObjective: "Navigate corporate assessment center group simulations.",
    tags: ["assessment-center", "teamwork", "b2"]
  },
  {
    id: "recruit.medium.0031",
    category: "recruitment-assessment",
    subcategory: "probing questions",
    difficulty: "medium",
    cefr: "B2",
    prompt: "When an interviewer asks 'Tell me about a time you made a significant mistake at work', what are they testing?",
    correct: "Your personal accountability, resilience, and capacity to learn and implement preventative safeguards.",
    distractors: [
      "Whether you can successfully shift the blame onto an innocent intern.",
      "If you have a pristine record of absolute perfection with zero errors ever.",
      "How quickly you panic and break down under emotional stress."
    ],
    explanation: "Mistake-oriented behavioral questions assess humility, accountability, recovery actions, and long-term learning.",
    learningObjective: "Frame professional errors and lessons learned during interviews.",
    tags: ["interview", "accountability", "b2"]
  },
  {
    id: "recruit.medium.0032",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "medium",
    cefr: "B2",
    prompt: "SITUATIONAL SCENARIO: You discover that your project deadline falls on a major religious holiday that you observe. When should you communicate this to your team?",
    correct: "Proactively communicate your schedule constraint well in advance and collaborate on an adjusted milestone timeline.",
    distractors: [
      "Say nothing and simply disappear on the day of the deadline without warning.",
      "Demand that the company cancel the project entirely because of your schedule.",
      "Work through the holiday while harboring secret resentment against your teammates."
    ],
    explanation: "Early, proactive communication allows teams to plan workload buffers and respect cultural/religious observances smoothly.",
    learningObjective: "Manage personal schedule constraints with professional transparency.",
    tags: ["sjt", "communication", "b2"]
  },
  {
    id: "recruit.medium.0033",
    category: "recruitment-assessment",
    subcategory: "asking for feedback",
    difficulty: "medium",
    cefr: "B2",
    prompt: "If a recruiter calls to deliver a rejection, asking 'Are there specific skill areas I could develop to be a stronger candidate in the future?' demonstrates ___.",
    correct: "a growth mindset, professional maturity, and dedication to continuous career development",
    distractors: [
      "that you are legally planning to sue the company for discrimination",
      "that you refuse to accept the reality of the hiring decision",
      "that you believe the hiring team was biased and incompetent"
    ],
    explanation: "Inquiring about developmental growth reflects a growth mindset and leaves an overwhelmingly positive impression.",
    learningObjective: "Solicit developmental hiring feedback professionally.",
    tags: ["career-development", "growth-mindset", "b2"]
  },
  {
    id: "recruit.medium.0034",
    category: "recruitment-assessment",
    subcategory: "executive presence",
    difficulty: "medium",
    cefr: "B2",
    prompt: "During executive interviews, communicating complex technical architectures using clear analogies demonstrates ___.",
    correct: "the ability to translate technical concepts into strategic business value for non-technical stakeholders",
    distractors: [
      "that you do not understand the underlying mathematics of your discipline",
      "that you treat executive interviewers as though they are children",
      "that you are attempting to hide severe security flaws in your code"
    ],
    explanation: "Executive presence requires bridging deep technical domain mastery with strategic business language.",
    learningObjective: "Translate technical concepts into executive business discourse.",
    tags: ["executive-presence", "communication", "b2"]
  },
  {
    id: "recruit.medium.0035",
    category: "recruitment-assessment",
    subcategory: "equity and compensation",
    difficulty: "medium",
    cefr: "B2",
    prompt: "In startup compensation packages, 'stock options with a four-year vesting schedule and a one-year cliff' means that ___.",
    correct: "no equity is earned if the employee departs within the first year, after which 25% vests, followed by monthly accrual",
    distractors: [
      "the employee receives 100% of their shares on their very first day of work",
      "the employee must pay the company cash every month for four years",
      "the company will go bankrupt in exactly one year"
    ],
    explanation: "A standard one-year cliff requires twelve months of service before any equity vests, followed by ratable vesting over four years.",
    learningObjective: "Decipher startup equity vesting terms.",
    tags: ["compensation", "equity", "b2"]
  },

  // ===================== HARD (C1 - C2) - 25 Questions =====================
  {
    id: "recruit.hard.0001",
    category: "recruitment-assessment",
    subcategory: "executive interview diplomacy",
    difficulty: "hard",
    cefr: "C1",
    prompt: "During a C-suite interview, when asked how you would handle an entrenched, underperforming division head who is close friends with board members, the most astute response should ___.",
    correct: "articulate an objective, performance-data-driven coaching methodology while managing board governance sensitivities diplomatically",
    distractors: [
      "declare that you would immediately fire the division head publicly on your first morning to assert executive dominance",
      "state that you would ignore the division's underperformance entirely to avoid angering the board",
      "recommend that the company dissolve the entire board of directors via emergency shareholder vote"
    ],
    explanation: "Executive candidates must demonstrate diplomatic balance: upholding rigorous operational accountability while navigating complex governance relationships.",
    learningObjective: "Demonstrate C-suite diplomatic acumen in high-stakes governance dilemmas.",
    tags: ["executive-interview", "governance", "c1"]
  },
  {
    id: "recruit.hard.0002",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: As Chief Risk Officer, you identify that an extraordinarily profitable trading algorithmic strategy exploits a regulatory loophole that violates the spirit, though not the letter, of securities law. What is your fiduciary obligation?",
    correct: "Present a comprehensive exposure analysis to the board audit committee, highlighting legal, regulatory, and reputational contagion risks.",
    distractors: [
      "Double the capital allocation to the strategy while keeping all documentation strictly verbal to evade subpoena trails.",
      "Unilaterally pull the plug on the servers without informing executive management or explaining the legal rationale.",
      "Resign instantly and sell personal shares in the company before regulators discover the loophole."
    ],
    explanation: "Fiduciary leadership mandates objective identification and escalation of systemic reputational and regulatory hazards to governing committees.",
    learningObjective: "Navigate complex regulatory gray areas in executive situational judgment tests.",
    tags: ["sjt", "executive-risk", "c2"]
  },
  {
    id: "recruit.hard.0003",
    category: "recruitment-assessment",
    subcategory: "behavioral question analysis",
    difficulty: "hard",
    cefr: "C1",
    prompt: "In executive assessment interviews, questions probing 'institutional resilience during severe existential crises' are designed to measure ___.",
    correct: "crisis stewardship, emotional equanimity, multi-stakeholder communication transparency, and decisive triage under incomplete information",
    distractors: [
      "whether an executive can avoid working weekends during market crashes",
      "a candidate's ability to deflect regulatory blame onto external vendors",
      "how quickly a candidate can liquidize company assets into personal offshore accounts"
    ],
    explanation: "True crisis leadership assesses equanimity, rapid triage, ethical stewardship, and clear communication when operating under extreme uncertainty.",
    learningObjective: "Analyze high-level executive competency assessment criteria.",
    tags: ["executive-assessment", "crisis-leadership", "c1"]
  },
  {
    id: "recruit.hard.0004",
    category: "recruitment-assessment",
    subcategory: "negotiating executive packages",
    difficulty: "hard",
    cefr: "C1",
    prompt: "When negotiating an executive employment agreement, which legal mechanism protects a newly appointed CEO from hostile shareholder shifts or premature termination without cause?",
    correct: "A comprehensive severance package with double-trigger change-of-control provisions and accelerated equity vesting.",
    distractors: [
      "A verbal handshake agreement with the departing founder.",
      "An anonymous posting on professional social media platforms.",
      "A clause forbidding shareholders from voting on board resolutions."
    ],
    explanation: "A double-trigger change-of-control clause ensures severance protection and equity acceleration if the firm is acquired and the executive terminated without cause.",
    learningObjective: "Master executive employment contract covenants.",
    tags: ["executive-contracts", "severance", "c1"]
  },
  {
    id: "recruit.hard.0005",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: You discover that your enterprise's primary overseas manufacturing partner is engaged in subtle, falsified labor audit records concealing hazardous working conditions. What is your ethical mandate?",
    correct: "Initiate an unannounced forensic third-party supply-chain audit, establish a strict remediation roadmap with clear milestones, and terminate the vendor relationship if compliance is not verified.",
    distractors: [
      "Ignore the findings because lower manufacturing costs maximize short-term shareholder returns.",
      "Threaten the vendor with public exposure unless they offer your company a twenty percent price discount.",
      "Permanently delete all overseas audit reports from company servers."
    ],
    explanation: "Ethical supply chain governance requires rigorous independent verification, corrective milestones, and willingness to sever non-compliant vendor ties.",
    learningObjective: "Demonstrate corporate social responsibility and international supply chain ethics.",
    tags: ["sjt", "ethics", "supply-chain", "c2"]
  },
  {
    id: "recruit.hard.0006",
    category: "recruitment-assessment",
    subcategory: "framing turnaround leadership",
    difficulty: "hard",
    cefr: "C1",
    prompt: "When articulating a track record in corporate turnarounds, which narrative structure is most convincing to institutional boards?",
    correct: "Diagnosing systemic operational inertia, instituting rigorous fiscal discipline, aligning executive talent, and delivering verifiable margin expansion.",
    distractors: [
      "Claiming you inherited a pristine organization and took all personal credit for macro-industry growth.",
      "Explaining that you fired seventy percent of staff on day one without conducting any operational diagnostics.",
      "Stating that corporate success was purely a matter of random speculative luck."
    ],
    explanation: "Turnaround leadership narratives must demonstrate systematic root-cause diagnostics, stakeholder alignment, fiscal rigor, and sustainable value creation.",
    learningObjective: "Structure high-level turnaround leadership narratives.",
    tags: ["turnaround", "leadership", "c1"]
  },
  {
    id: "recruit.hard.0007",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: A whistleblower brings credible evidence that the company's flagship AI algorithm produces racially biased outcomes in consumer loan underwriting. What is the appropriate executive response?",
    correct: "Halt algorithmic underwriting models immediately, institute a third-party algorithmic fairness audit, and establish an ethical AI governance board.",
    distractors: [
      "Discredit the whistleblower internally and accelerate marketing to bury the algorithmic bias in volume.",
      "Alter the loan criteria secretly so only affluent demographics are scored by the model.",
      "Pay the whistleblower a hush-money severance package with an airtight non-disclosure agreement."
    ],
    explanation: "Algorithmic bias in financial lending carries catastrophic legal, regulatory, and ethical liabilities requiring immediate mitigation and transparent independent auditing.",
    learningObjective: "Apply situational judgment in algorithmic governance and ethical AI.",
    tags: ["sjt", "ai-ethics", "c2"]
  },
  {
    id: "recruit.hard.0008",
    category: "recruitment-assessment",
    subcategory: "executive communication",
    difficulty: "hard",
    cefr: "C1",
    prompt: "During an executive panel interview, which rhetorical quality best projects gravitas and intellectual authority?",
    correct: "Measured delivery, concise articulation of strategic trade-offs, and willingness to acknowledge analytical uncertainties comfortably.",
    distractors: [
      "Speaking at rapid-fire speed using dense acronyms to intimidate listeners.",
      "Claiming infallible certainty on all speculative five-year market forecasts.",
      "Continuously interrupting panel members to demonstrate intellectual dominance."
    ],
    explanation: "True executive gravitas is characterized by calm clarity, synthesizing complex trade-offs, and intellectual humility regarding uncertainties.",
    learningObjective: "Identify linguistic and rhetorical markers of executive gravitas.",
    tags: ["executive-presence", "gravitas", "c1"]
  },
  {
    id: "recruit.hard.0009",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: Two key founding engineers threaten to walk out on the eve of a critical software launch unless granted substantial emergency equity stakes. How should the CEO respond?",
    correct: "Decouple immediate launch stability from permanent cap-table restructuring: negotiate a transient launch retention incentive while scheduling formal equity reviews.",
    distractors: [
      "Capitulate immediately to all extortionate demands without board consultation, setting a precedent for future employee hold-ups.",
      "Fire both engineers immediately on the spot, causing the product launch to crash catastrophically.",
      "Promise equity verbally with the secret intention of terminating both engineers the moment the code is deployed."
    ],
    explanation: "Experienced leadership avoids panic capitulation or destructive confrontation by decoupling immediate operational needs from long-term equity dilution.",
    learningObjective: "Resolve high-stakes executive hold-up dilemmas in startup governance.",
    tags: ["sjt", "negotiation", "startups", "c2"]
  },
  {
    id: "recruit.hard.0010",
    category: "recruitment-assessment",
    subcategory: "strategic alignment inquiry",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Which question posed by an executive candidate best evaluates the true power dynamics between the CEO and the Board of Directors?",
    correct: "'In recent strategic crossroads where management and the board initially diverged, what was the mechanism of resolution and consensus-building?'",
    distractors: [
      "'How often do board members yell at the CEO during quarterly meetings?'",
      "'Does the board chairman sign the CEO's personal expense reports?'",
      "'Which board member possesses the most personal wealth in their stock portfolio?'"
    ],
    explanation: "Probing specific instances of strategic divergence illuminates institutional governance mechanisms, board overreach, and CEO autonomy.",
    learningObjective: "Formulate sophisticated executive governance inquiries during C-suite hiring.",
    tags: ["governance", "board-dynamics", "c1"]
  },
  {
    id: "recruit.hard.0011",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: An investigative media outlet informs you they are publishing a damaging story in twenty-four hours detailing historical toxic workplace culture under a predecessor. How should you prepare?",
    correct: "Coordinate an empirical internal audit, prepare a transparent public response acknowledging historical shortcomings, and outline concrete cultural reforms already underway.",
    distractors: [
      "File frivolous defamation lawsuits immediately to intimidate journalists into silence.",
      "Issue a total categorical denial and claim the media outlet is fabricating all employee accounts.",
      "Instruct all current staff that speaking to press will result in immediate criminal prosecution."
    ],
    explanation: "Crisis communication best practice favors candid acknowledgment of historical flaws combined with verifiable, ongoing institutional remediation.",
    learningObjective: "Navigate crisis public relations and historical cultural liabilities.",
    tags: ["sjt", "crisis-pr", "c2"]
  },
  {
    id: "recruit.hard.0012",
    category: "recruitment-assessment",
    subcategory: "evaluating strategic agility",
    difficulty: "hard",
    cefr: "C1",
    prompt: "When assessing an executive's 'strategic agility', evaluators look for evidence of ___.",
    correct: "reallocating capital and talent decisively away from declining core businesses toward emergent high-growth paradigms",
    distractors: [
      "changing corporate priorities every twenty-four hours based on viral social media trends",
      "stubbornly clinging to legacy production models despite structural market obsolescence",
      "liquidating all research and development budgets to maximize short-term quarterly bonuses"
    ],
    explanation: "Strategic agility is demonstrated by decisive, proactive resource reallocation in response to shifting industry paradigms.",
    learningObjective: "Identify key behavioral indicators of organizational strategic agility.",
    tags: ["strategy", "agility", "c1"]
  },
  {
    id: "recruit.hard.0013",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: A major activist hedge fund acquires an eight percent equity stake and demands the spin-off of your research division to fund an immediate share buyback. How should the executive team react?",
    correct: "Engage the activist investors constructively, present a rigorous long-term discounted cash-flow valuation of R&D assets, while exploring balanced capital return mechanisms.",
    distractors: [
      "Adopt an entrenched defensive posture, publicly denouncing the activist fund as corporate raiders in the financial press.",
      "Capitulate entirely, shuttering the research division and liquidating all proprietary patent laboratories.",
      "Attempt to illegally manipulate company stock prices to force the hedge fund to sell its stake."
    ],
    explanation: "Constructive engagement grounded in rigorous valuation models allows leadership to address shareholder concerns without dismantling long-term innovation capacity.",
    learningObjective: "Manage activist investor campaigns diplomatically and strategically.",
    tags: ["sjt", "activist-investors", "governance", "c2"]
  },
  {
    id: "recruit.hard.0014",
    category: "recruitment-assessment",
    subcategory: "competency architecture",
    difficulty: "hard",
    cefr: "C1",
    prompt: "In executive leadership profiling, 'systems thinking' is characterized as the cognitive capacity to ___.",
    correct: "understand how interdependent components, feedback loops, and unintended second-order consequences interact across an entire organization",
    distractors: [
      "memorize technical IT software specifications without understanding their business purpose",
      "treat every departmental problem in total isolation from the rest of the company",
      "blame external macro-economic forces for internal operational mistakes"
    ],
    explanation: "Systems thinking conceptualizes organizations holistically, recognizing feedback dynamics, delays, and second-order repercussions.",
    learningObjective: "Define systems thinking in leadership competency architectures.",
    tags: ["systems-thinking", "competencies", "c1"]
  },
  {
    id: "recruit.hard.0015",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: Your enterprise is poised to close a transformative merger, but confidential due diligence reveals a fifty-million-dollar tax liability in an overseas shell entity. What must you do?",
    correct: "Notify legal counsel, disclose the material liability to the board M&A committee, and renegotiate valuation or require escrow indemnification.",
    distractors: [
      "Conceal the tax discrepancy until after the merger closes and hope auditors never notice.",
      "Destroy all due diligence documentation and fire the forensic accounting auditors.",
      "Withdraw from the merger immediately without offering any explanation to the market."
    ],
    explanation: "Material findings during due diligence require prompt board notification, legal structuring (indemnities, escrow holdbacks), and valuation adjustments.",
    learningObjective: "Apply fiduciary due diligence principles in corporate mergers and acquisitions.",
    tags: ["sjt", "m-and-a", "due-diligence", "c2"]
  },
  {
    id: "recruit.hard.0016",
    category: "recruitment-assessment",
    subcategory: "executive talent stewardship",
    difficulty: "hard",
    cefr: "C1",
    prompt: "A hallmark of world-class executive talent stewardship is the deliberate cultivation of a robust succession ___.",
    correct: "pipeline",
    distractors: ["corridor", "channel", "circuit"],
    explanation: "An executive 'succession pipeline' systematically identifies and prepares high-potential leaders for future C-suite roles.",
    learningObjective: "Identify executive talent succession terminology.",
    tags: ["succession", "talent-management", "c1"]
  },
  {
    id: "recruit.hard.0017",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: In a geopolitical crisis, a foreign government orders your tech subsidiary to install backdoor surveillance taps on civilian user traffic or face immediate asset nationalization. What is your ethical posture?",
    correct: "Refuse the unlawful order, initiate emergency data sanitization to safeguard user privacy, and coordinate orderly operational evacuation if necessary.",
    distractors: [
      "Install the surveillance taps immediately to maximize company revenue in the foreign market.",
      "Pretend to install the taps while secretly leaking user data to foreign intelligence agencies.",
      "Bribe local military officials to look the other way."
    ],
    explanation: "Fiduciary ethics require uncompromising protection of human rights and user privacy, even if it necessitates corporate market exit.",
    learningObjective: "Resolve geopolitical ethical dilemmas involving human rights and corporate data security.",
    tags: ["sjt", "geopolitics", "human-rights", "c2"]
  },
  {
    id: "recruit.hard.0018",
    category: "recruitment-assessment",
    subcategory: "rhetorical precision in negotiations",
    difficulty: "hard",
    cefr: "C1",
    prompt: "In executive contract disputes, utilizing language framed around 'mutual value preservation' rather than 'adversarial ultimatums' serves to ___.",
    correct: "minimize defensive cognitive entrenchment and expand the zone of potential agreement (ZOPA)",
    distractors: [
      "demonstrate total weakness and surrender all negotiating leverage immediately",
      "confuse the opposing counsel by using excessively complicated vocabulary",
      "prolong courtroom litigation unnecessarily for several years"
    ],
    explanation: "Collaborative, principled framing avoids reactive defensiveness and expands the Zone of Possible Agreement (ZOPA).",
    learningObjective: "Apply principled negotiation rhetoric to expand ZOPA.",
    tags: ["negotiation", "zopa", "c1"]
  },
  {
    id: "recruit.hard.0019",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: A major enterprise client inadvertently transmits trade secrets belonging to your direct competitor to your inbox. What is your legal and professional course of action?",
    correct: "Cease reading immediately, notify corporate legal counsel, and sequester the file for return or destruction without disseminating it.",
    distractors: [
      "Print copies and distribute them to your research and development engineering teams immediately.",
      "Sell the trade secrets on the dark web for cryptocurrency.",
      "Forward the secrets to your executive team with the note 'Enjoy our competitor's plans!'"
    ],
    explanation: "Receiving inadvertently disclosed third-party proprietary trade secrets creates severe legal misappropriation liabilities; immediate sequestration and legal notification are mandatory.",
    learningObjective: "Apply ethical and legal protocols regarding inadvertently disclosed trade secrets.",
    tags: ["sjt", "trade-secrets", "legal-ethics", "c2"]
  },
  {
    id: "recruit.hard.0020",
    category: "recruitment-assessment",
    subcategory: "cross-cultural leadership",
    difficulty: "hard",
    cefr: "C1",
    prompt: "In global leadership, managing across 'high-context' and 'low-context' communication cultures requires an executive to ___.",
    correct: "calibrate verbal explicitness, decipher non-verbal diplomatic cues, and adapt feedback mechanisms to regional cultural norms",
    distractors: [
      "force all international team members to adopt Anglo-American low-context directness unconditionally",
      "speak in riddles and metaphors during technical engineering reviews",
      "refuse to work with colleagues who do not speak English as their native tongue"
    ],
    explanation: "Cross-cultural competence mandates calibrating directness and decoding implicit contextual cues across divergent cultural frameworks.",
    learningObjective: "Apply high-context versus low-context cultural communication frameworks in global leadership.",
    tags: ["cross-cultural", "global-leadership", "c1"]
  },
  {
    id: "recruit.hard.0021",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: A critical supplier goes into sudden receivership three weeks before your international holiday product release. What is your crisis triage strategy?",
    correct: "Activate pre-vetted contingency dual-sourcing partners, assess tooling transfer legalities, and communicate realistic revised delivery windows to retail stakeholders.",
    distractors: [
      "Conceal the supplier's bankruptcy from retail partners and accept customer payments for non-existent inventory.",
      "Sue the bankrupt supplier in court demanding instant delivery of manufactured goods.",
      "Shut down your own company immediately and declare insolvency."
    ],
    explanation: "Supply chain crisis management requires dual-sourcing activation, intellectual property asset recovery, and transparent stakeholder management.",
    learningObjective: "Demonstrate crisis supply chain triage in situational judgment scenarios.",
    tags: ["sjt", "crisis-management", "supply-chain", "c2"]
  },
  {
    id: "recruit.hard.0022",
    category: "recruitment-assessment",
    subcategory: "evaluating boardroom friction",
    difficulty: "hard",
    cefr: "C1",
    prompt: "When boardroom friction arises regarding capital expenditure allocations, an astute executive seeks to ___.",
    correct: "reframe the discussion around risk-weighted net present value (NPV) and strategic option value rather than departmental turf wars",
    distractors: [
      "threaten board members with public leaks to financial press outlets",
      "capitulate to whichever board member speaks with the loudest physical voice",
      "falsify financial projections to make favorite projects look artificially profitable"
    ],
    explanation: "Grounding capital allocation debates in objective financial metrics (NPV, option value) de-personalizes boardroom friction.",
    learningObjective: "De-escalate boardroom capital allocation friction using objective financial frameworks.",
    tags: ["boardroom", "capital-allocation", "c1"]
  },
  {
    id: "recruit.hard.0023",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: An internal whistleblower alerts you that your company's emissions monitoring software contains defeat devices designed to pass regulatory inspections artificially. How should you respond?",
    correct: "Order an immediate cessation of the deceptive software, launch an independent special board investigation, and proactively self-report findings to regulatory authorities.",
    distractors: [
      "Instruct engineering teams to update the software to delete all traces of the defeat device code before inspectors arrive.",
      "Disparage the whistleblower internally and offer them a promotion to keep quiet.",
      "Wait until public authorities launch a criminal raid before acknowledging the issue."
    ],
    explanation: "Falsification of regulatory emissions carries catastrophic criminal and corporate liability; immediate cessation, independent investigation, and proactive self-reporting are paramount.",
    learningObjective: "Navigate systemic compliance fraud and regulatory reporting ethics.",
    tags: ["sjt", "compliance-fraud", "whistleblowing", "c2"]
  },
  {
    id: "recruit.hard.0024",
    category: "recruitment-assessment",
    subcategory: "executive coaching and development",
    difficulty: "hard",
    cefr: "C1",
    prompt: "Executive coaching frameworks emphasize that sustainable behavioral change in senior leaders requires transitioning from ___.",
    correct: "defensive reactive posturing toward reflective self-awareness and active developmental listening",
    distractors: [
      "authoritarian dominance toward passive corporate disengagement",
      "technical domain mastery toward complete operational ignorance",
      "strategic planning toward spontaneous uncalculated decisions"
    ],
    explanation: "Leadership growth hinges on overcoming defensive cognitive habits, cultivating emotional intelligence, and engaging in reflective practice.",
    learningObjective: "Master core tenets of executive coaching and adult behavioral development.",
    tags: ["coaching", "executive-growth", "c1"]
  },
  {
    id: "recruit.hard.0025",
    category: "recruitment-assessment",
    subcategory: "situational judgment test",
    difficulty: "hard",
    cefr: "C2",
    prompt: "SITUATIONAL SCENARIO: The board offers you the CEO position on the condition that you sign an agreement indemnifying them from all personal liability regarding a pending environmental investigation. How should you respond?",
    correct: "Decline the condition firmly after consulting independent legal counsel, explaining that governance integrity requires lawful, mutual accountability.",
    distractors: [
      "Sign the indemnity immediately without reading it because becoming CEO is your lifelong ambition.",
      "Agree verbally while secretly filing a complaint with the environmental protection agency.",
      "Demand an extra ten million dollars in cash to absorb the board's criminal liability."
    ],
    explanation: "A candidate must never absorb improper personal legal liability or compromise statutory governance accountability to secure a title.",
    learningObjective: "Demonstrate unwavering ethical boundaries in C-suite employment negotiations.",
    tags: ["sjt", "governance", "executive-ethics", "c2"]
  }
];

export function getAuditedRecruitmentQuestions(): Question[] {
  return rawRecruitmentDefs.map((def, idx) => buildSingleChoice(def, idx));
}
