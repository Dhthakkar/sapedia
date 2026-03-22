// ═══════════════════════════════════════════════════════
// RISE with SAP — Content Index
// Each lesson maps to: intro, topics[], topicTitles[], visuals{}
// Visuals import from dedicated component files.
// Adding a new lesson = add one entry here + one visuals file.
// ═══════════════════════════════════════════════════════
import type { TopicVisual } from "@/types";

// Visual component imports
import StatsRow            from "@/components/visuals/StatsRow";
import EcosystemDiagram    from "@/components/visuals/EcosystemDiagram";
import BeforeAfter         from "@/components/visuals/BeforeAfter";
import RISEvsGROW          from "@/components/visuals/RISEvsGROW";
import PathwaysViz         from "@/components/visuals/PathwaysViz";
import Triangle            from "@/components/visuals/Triangle";
import ComponentPillars    from "@/components/visuals/ComponentPillars";
import PhaseTimeline       from "@/components/visuals/PhaseTimeline";
import EnhancementCards    from "@/components/visuals/EnhancementCards";
import BenefitsGrid        from "@/components/visuals/BenefitsGrid";
import DimensionWheel      from "@/components/visuals/DimensionWheel";
import CharacteristicsGrid from "@/components/visuals/CharacteristicsGrid";
import BTPStack            from "@/components/visuals/BTPStack";
import ITPillars           from "@/components/visuals/ITPillars";
import ToolsTable          from "@/components/visuals/ToolsTable";
import CleanStateVisual    from "@/components/visuals/CleanStateVisual";

// ─── Shared question bank (reused across lessons) ────────
import { u1l1Questions } from "./questions/u1l1";
import { u1l2Questions } from "./questions/u1l2";
import { u1l3Questions } from "./questions/u1l3";

export interface LessonContent {
  intro:        string;
  topics:       string[];
  topicTitles:  string[];
  visuals:      Record<string, TopicVisual>;
}

const LESSON_CONTENT: Record<string, LessonContent> = {

  // ─────────────────────────────────────────────────────
  // U1L1 — Introducing the SAP Business Suite
  // ─────────────────────────────────────────────────────
  "u1l1": {
    intro: "Set the stage — what SAP Business Suite is, why it was created, and how companies get there.",
    topics: ["u1l1-t1","u1l1-t2","u1l1-t3","u1l1-t4","u1l1-t5"],
    topicTitles: [
      "Why Businesses Need to Transform",
      "What is the SAP Business Suite",
      "The 4 IT Challenges SAP Addresses",
      "RISE vs GROW — Two Journeys",
      "Pathways to the SAP Business Suite",
    ],
    visuals: {
      "u1l1-t1": {
        visual: () => <StatsRow stats={[
          { icon:"🏭", to:850, suffix:"+", label:"Custom ABAP programs — avg ECC company",         color:"#DC2626" },
          { icon:"📅", to:15,  suffix:" yrs", label:"Akshar on SAP ECC without a major upgrade",  color:"#D97706" },
          { icon:"🌍", to:25,  suffix:"+", label:"Industries SAP has expertise in",               color:"#0070F2" },
        ]} />,
        keyPoints: [
          "The question is never WHETHER to transform — it's HOW",
          "Heavy custom ECC systems can't absorb SAP's quarterly cloud updates",
          "SAP's approach: outcome-focused, not just 'install software'",
        ],
        jargon: [
          { term:"On-Premise ERP",        simple:"SAP software on the company's own servers — you own hardware, manage upgrades, handle maintenance.",     inSystem:"The 'old way' — like SAP ECC. Starting point companies move AWAY from via RISE.", inExam:"Usually appears as the starting point companies are moving away from.",      color:"#DC2626" },
          { term:"Digital Transformation",simple:"Overhauling how a business operates using modern digital technology.",                                   inSystem:"In SAP context: on-premise ERP → cloud ERP with modern processes.",             inExam:"SAP frames it as 'not whether to transform, but how.' Know this framing.",    color:"#0070F2" },
        ],
        akshar: "Akshar Industries, Ahmedabad. Running SAP ECC since 2009. 850+ custom programs built over 15 years. Every SAP upgrade attempt failed — too risky to retest all custom code. CIO Nirav Shah finally told the board: 'We're falling behind competitors using AI. We need to transform — and we need a structured way to do it.'",
        exam:    "SAP explicitly states expertise across 25+ industries. The key phrase is 'not whether to transform, but how.' Questions test this framing — the answer is always about HOW, not IF.",
        mistake: "Thinking transformation is purely a technology project. SAP builds it around People, Processes, AND Tools.",
        summary: [
          "Digital economy makes transformation unavoidable — the only question is HOW.",
          "Companies on legacy ECC face upgrade backlogs, complexity, and innovation gaps.",
          "SAP brings 25+ industry expertise to guide outcome-focused transformations.",
        ],
        questions: u1l1Questions.t1,
      },
      "u1l1-t2": {
        visual:   () => <EcosystemDiagram />,
        keyPoints:["The Suite is SAP's complete cloud portfolio — NOT just S/4HANA","Goal: enhance connectivity and optimise functions across enterprises","Includes: Cloud ERP + BTP + Business Data Cloud + Business AI + LoB Solutions"],
        jargon:[
          { term:"SAP Business Suite", simple:"SAP's full collection of cloud products working together as one ecosystem.", inSystem:"Includes Cloud ERP, BTP, Business Data Cloud, Business AI, and LoB solutions.", inExam:"Its main goal is to 'enhance connectivity and optimise functions.' Know this phrase exactly.", color:"#0070F2" },
          { term:"SAP BTP",            simple:"SAP's platform for building custom apps and integrations — without touching the core ERP.", inSystem:"The extension layer — where customisations go so the core stays clean.", inExam:"BTP appears repeatedly. It's the platform for extensions AND integrations.", color:"#7C3AED" },
          { term:"LoB Solutions",      simple:"Specialised SAP apps for specific business functions — HR, sales, procurement.", inSystem:"Products like SuccessFactors (HR) or SAP Ariba (procurement) alongside S/4HANA.", inExam:"LoB solutions are part of the Business Suite — not standalone products in this context.", color:"#0891B2" },
        ],
        akshar:  "Before RISE, Akshar thought of 'SAP' as just their ECC system. Post-RISE, Nirav Shah tells the board: 'We're not getting an upgrade — we're getting the entire SAP Business Suite. S/4HANA for operations, BTP for custom apps, Business Data Cloud for analytics, Business AI built into our processes.'",
        exam:    "Main goal of SAP Business Suite = 'enhance connectivity and optimise functions across enterprises.' Common wrong answer: 'simplify IT infrastructure' — that's a benefit, not the main goal.",
        mistake: "Students think SAP Business Suite = SAP S/4HANA. It's the entire portfolio. S/4HANA is just the ERP component at the centre.",
        summary: ["Business Suite = full cloud portfolio: ERP + BTP + Business Data Cloud + Business AI + LoB.","Main goal: enhance connectivity and optimise functions across enterprises.","It is an integrated ecosystem — not a single product."],
        questions: u1l1Questions.t2,
      },
      "u1l1-t3": {
        visual:    () => <ITPillars />,
        keyPoints: ["SAP identifies exactly 4 IT challenges — no more, no less","The RISE Methodology directly answers all 4","Distractors: 'cost reduction,' 'market expansion,' 'workforce development' — never in the official 4"],
        jargon:[
          { term:"Implementation Framework", simple:"A structured playbook: what to do, in what order, at every stage of an SAP implementation.", inSystem:"SAP provides this through SAP Activate + RISE Methodology.", inExam:"Always appears as 'proven implementation framework' — the word 'proven' matters.", color:"#0070F2" },
          { term:"Best Practices",           simple:"SAP's recommended, pre-built way of running business processes — based on thousands of implementations.", inSystem:"Built into S/4HANA out of the box. Using them = Clean Core. Ignoring them = customisation debt.", inExam:"Best practices = what companies adopt by following standard SAP processes.", color:"#7C3AED" },
        ],
        akshar:  "When Akshar started their migration research, they had none of the 4: no structured framework (two failed attempts), no best practices (everything was custom), no expert support (team had never done cloud migration), and no proper tools (managing in spreadsheets).",
        exam:    "These 4 challenges appear in multi-select questions. The correct answers are always from this list. Common distractors: 'cost reduction,' 'rapid market expansion,' 'developing a global workforce.'",
        mistake: "Adding 'cost reduction' as one of the four. SAP doesn't list it. The 4 are: proven framework, best practices, expert navigational support, right tools.",
        summary: ["SAP identifies exactly 4 IT challenges: proven framework, best practices, navigational support, right tools.","The RISE Methodology directly answers all 4 — one component for each.","Watch for distractors like 'cost reduction' and 'market expansion' — not in SAP's list."],
        questions: u1l1Questions.t3,
      },
      "u1l1-t4": {
        visual:    () => <RISEvsGROW />,
        keyPoints: ["RISE = existing on-premise SAP customers migrating to cloud","GROW = new SAP customers, straight to Public Cloud","SAP Cloud ERP Private Package is RISE's key offering for large enterprises"],
        jargon:[
          { term:"RISE with SAP", simple:"SAP's structured transformation journey for existing on-premise SAP customers moving to cloud.", inSystem:"Includes methodology, tools, services, and expert guidance for migrating from ECC/S/4HANA on-premise.", inExam:"RISE = existing customers. Comes with SAP Cloud ERP Private Package for large enterprises.", color:"#0070F2" },
          { term:"GROW with SAP", simple:"SAP's path for new customers adopting SAP for the first time, going straight to Public Cloud.", inSystem:"Faster, simpler, based on SAP Best Practices from day one. Not the focus of this course.", inExam:"GROW = new customers. Public Cloud. Not the focus here — RISE is.", color:"#059669" },
        ],
        akshar:  "Akshar Industries = RISE candidate. Running ECC since 2009, 850+ custom programs — they can't just start fresh. Contrast: a new pharma startup in Hyderabad with no SAP history → GROW, straight to S/4HANA Public Cloud, live in months.",
        exam:    "RISE = existing on-premise SAP customers. GROW = new SAP customers. SAP Cloud ERP Private Package is the key RISE offering for large enterprises.",
        mistake: "Confusing RISE and GROW as the same journey with different names. They serve fundamentally different customer profiles with different starting points.",
        summary: ["RISE = structured journey for existing on-premise SAP customers migrating to cloud.","GROW = fast path for net-new SAP customers, straight to Public Cloud.","SAP Cloud ERP Private Package is RISE's key offering — includes S/4HANA Private Edition + tooling."],
        questions: u1l1Questions.t4,
      },
      "u1l1-t5": {
        visual:    () => <PathwaysViz />,
        keyPoints: ["Three pathways: Full Public Cloud, Hybrid, Two-Tier","Hybrid in SAP = private + public cloud — NOT cloud + on-premise","All pathways supported by BTP + Business Data Cloud + Business AI"],
        jargon:[
          { term:"Hybrid Model",         simple:"Mixing SAP Cloud ERP Private (complex areas) with SAP Cloud ERP Public (simpler areas) in one organisation.", inSystem:"E.g. HQ on Private Edition, new factories on Public Edition.", inExam:"Hybrid = private + public cloud. NOT half-cloud half-on-premise.", color:"#7C3AED" },
          { term:"Two-Tier Implementation",simple:"Running both Private and Public cloud ERP simultaneously across different parts of the same company.", inSystem:"Parent company on Private + each subsidiary on Public. All integrated via BTP.", inExam:"Specific term for concurrent deployment of both editions in the same organisation.", color:"#059669" },
        ],
        akshar:  "Akshar's plan: Ahmedabad HQ (complex, custom) → S/4HANA Cloud Private Edition. New Pune plant (fresh start) → S/4HANA Cloud Public Edition. Both connected via BTP. Data flows between both via Business Data Cloud. This is the two-tier model in practice.",
        exam:    "The exam tests whether you know hybrid means private + public cloud — not cloud + on-premise. 'Hybrid' in SAP context is always cloud-to-cloud flexibility.",
        mistake: "Thinking 'hybrid' means keeping some systems on-premise. In SAP Business Suite context, hybrid = combining private and public cloud editions — it's all cloud.",
        summary: ["Three pathways: full public, hybrid (private+public), or two-tier (both concurrent).","Two-tier = Private at HQ + Public at subsidiaries, integrated via BTP.","Hybrid in SAP context = cloud-to-cloud mix — NOT cloud + on-premise."],
        questions: u1l1Questions.t5,
      },
    },
  },

  // ─────────────────────────────────────────────────────
  // U1L2 — RISE with SAP Methodology
  // ─────────────────────────────────────────────────────
  "u1l2": {
    intro: "The RISE with SAP Methodology in depth — structure, three core components, six phases, and benefits. Most heavily tested area.",
    topics: ["u1l2-t1","u1l2-t2","u1l2-t3","u1l2-t4","u1l2-t5","u1l2-t6"],
    topicTitles: [
      "What is the RISE with SAP Methodology",
      "People, Processes, Tools — The 3 Pillars",
      "The 3 Core Components",
      "The 6 Phases — Discover to Run",
      "5 Methodology Enhancements",
      "Key Benefits + Tools & Services",
    ],
    visuals: {
      "u1l2-t1": {
        visual:    () => <BeforeAfter before={["RISE with SAP (The Offering)","Products + Licences you buy","S/4HANA, BTP, Signavio..."]} after={["RISE Methodology (The Framework)","HOW you implement those products","Phases, tasks, quality gates, guidance"]} />,
        keyPoints: ["The Methodology is the 'how' — the offering is the 'what'","Built on SAP Activate — the existing proven implementation framework","Works across all SAP Business Suite configurations"],
        jargon:[
          { term:"SAP Activate Methodology", simple:"SAP's established implementation methodology — the underlying framework RISE Methodology builds upon.", inSystem:"Provides the phase structure (Discover→Run), templates, and tasks that RISE enhances.", inExam:"RISE methodology 'augments' SAP Activate — it doesn't replace it.", color:"#0070F2" },
          { term:"Clean Core Strategy",      simple:"The guiding principle that keeps the ERP system standard and moves customisations outside the core.", inSystem:"The Methodology is 'built on a clean core strategy' — every task designed to maintain clean core.", inExam:"Clean Core is both a strategy and a measurable outcome of following RISE Methodology.", color:"#059669" },
        ],
        akshar:  "When TechNova (Akshar's partner) starts the project, PM Priya Desai doesn't create a plan from scratch. She opens SAP Cloud ALM, loads the RISE Methodology, and gets pre-built tasks for every phase. Arjun (SAP) walks through exactly what Akshar needs in Discover. The Methodology is their GPS.",
        exam:    "Key distinction tested: RISE with SAP (the offering/package) vs RISE Methodology (the framework). Methodology = 'structured guidance.' If an answer says 'structured guidance for transformation' it's correct.",
        mistake: "Treating Methodology and the RISE product package as the same thing. Package = products + licences. Methodology = phases + guidance + tools.",
        summary: ["RISE Methodology = structured framework/playbook for cloud transformation, built on SAP Activate.","Provides guidance across defined phases, with SAP experts, partners, and integrated toolchain.","Built on Clean Core strategy — every phase keeps the ERP clean."],
        questions: u1l2Questions.t1,
      },
      "u1l2-t2": {
        visual:    () => <Triangle />,
        keyPoints: ["'The transformation journey hinges on people, processes, and tools' — SAP's exact phrase","NOT 'technology' — the word is 'tools.' A subtle but testable difference","All three must work together — missing one causes the transformation to fail"],
        jargon:[{ term:"People-Process-Tools", simple:"SAP's model: successful transformation requires all three elements working in sync.", inSystem:"Every aspect of the RISE Methodology maps to one of these three pillars.", inExam:"SAP uses 'tools' — NOT 'technology.' That single word difference can cost you a mark.", color:"#0070F2" }],
        akshar:  "Akshar's transformation: People = Nirav Shah (CIO, sponsor), Priya Desai (PM), Arjun Kapoor (SAP Advisor), 5 process owners. Processes = procure-to-pay, order-to-cash, production planning flows. Tools = Signavio to analyse processes, Cloud ALM to manage tasks, BTP to build custom extensions.",
        exam:    "SAP uses the word 'Tools' — NOT 'Technology.' If an exam option says 'People, Processes, Technology' it could be a trap. The official SAP phrase is 'People, Processes, and Tools.'",
        mistake: "Writing 'Technology' instead of 'Tools.' SAP is specific about this language.",
        summary: ["'Hinges on people, processes, and tools' — SAP's exact phrase. Memorise it.","People = teams & experts. Processes = business flows. Tools = digital products.","All three must work together — a strong tool without the right people delivers nothing."],
        questions: u1l2Questions.t2,
      },
      "u1l2-t3": {
        visual:    () => <ComponentPillars />,
        keyPoints: ["Three components: Standardised Framework, Integrated Toolchain, Expert Guidance","Each maps to the People/Process/Tools triangle","'Best Practices' is NOT a 4th component — it's embedded inside the Framework"],
        jargon:[
          { term:"Standardised Framework", simple:"The enhanced SAP Activate roadmap — a step-by-step guide with Clean Core activities built in.", inSystem:"Adds tasks, quality gates, and deliverables to SAP Activate phases for Clean Core compliance.", inExam:"Official benefit phrase: 'for faster adoption tailored to business needs.'", color:"#0070F2" },
          { term:"Integrated Toolchain",   simple:"The recommended set of SAP tools (Signavio, LeanIX, Cloud ALM, BTP) working together for end-to-end transformation.", inSystem:"These tools are pre-integrated — data flows between them automatically.", inExam:"Official benefit phrase: 'streamlined collaboration and project execution.'", color:"#7C3AED" },
          { term:"Expert Guidance",        simple:"SAP-provided human support — Onboarding Advisors, Enterprise Architects, Customer Success Managers, certified partners.", inSystem:"Available through 4 onboarding calls and ongoing engagement throughout the project.", inExam:"Official benefit phrase: 'end-to-end engagement.'", color:"#059669" },
        ],
        akshar:  "Framework: Priya uses the Clean Core Runbook in Cloud ALM — 150+ tasks pre-loaded. Toolchain: Signavio maps Akshar's processes → LeanIX maps IT landscape → Cloud ALM tracks tasks. Expert Guidance: Arjun hosts 4 onboarding calls; later an SAP Enterprise Architect reviews Quality Gate reports.",
        exam:    "Multi-select loves 'which 3 are core components?' Answer: Standardised Framework + Integrated Toolchain + Expert Guidance. Distractors: 'Best marketing practices,' 'Customer loyalty programs.'",
        mistake: "Listing 'Best Practices' as a fourth component. Best practices are embedded INSIDE the Standardised Framework.",
        summary: ["Three components: Standardised Framework (what to do), Toolchain (digitally manage it), Expert Guidance (human support).","Framework→Processes, Toolchain→Tools, Expert Guidance→People.","Know all three exactly — multi-select will test with convincing distractors."],
        questions: u1l2Questions.t3,
      },
      "u1l2-t4": {
        visual:    () => <PhaseTimeline />,
        keyPoints: ["Six phases: Discover → Prepare → Explore → Realize → Deploy → Run","DDA = Discover. 4 Onboarding Calls = Prepare. Quality Gates = Explore through Run","Quality Gates do NOT start in Discover or Prepare"],
        jargon:[
          { term:"Digital Discovery Assessment (DDA)", simple:"Structured toolkit used in the Discover phase to capture customer's current landscape and goals.", inSystem:"Guides onboarding team and customer success managers in collecting the right data pre-project.", inExam:"DDA is one of the 5 enhancements. It belongs specifically to the Discover phase.", color:"#0070F2" },
          { term:"Clean Core Quality Gates",           simple:"Checkpoints at the end of each phase (Explore through Run) where the team verifies Clean Core compliance.", inSystem:"Questionnaires managed through SAP Cloud ALM. Results reviewed with SAP's Enterprise Architect.", inExam:"Quality Gates happen in Explore, Realize, Deploy, and Run — NOT in Discover or Prepare.", color:"#7C3AED" },
        ],
        akshar:  "Akshar's journey: Discover = Arjun runs DDA with Nirav. Prepare = 4 onboarding calls. Explore = Priya maps Akshar's procure-to-pay in Signavio vs SAP best practice. Realize = BTP vendor rating app built, 500K material records migrated. Deploy = go-live April 1. Run = Nirav's team monitors via Cloud ALM Operations Dashboard.",
        exam:    "Quality Gates apply to Explore → Run. Discover phase uses DDA. Prepare phase has onboarding sessions. Questions may test which activity belongs to which phase.",
        mistake: "Thinking Quality Gates start from the Discover phase. They start from Explore. Discover has DDA, Prepare has 4 onboarding sessions.",
        summary: ["Six phases: Discover → Prepare → Explore → Realize → Deploy → Run.","Discover = DDA. Prepare = 4 calls + Success Plan. Explore–Run = Quality Gates.","Deploy = go-live. Run = ongoing operations + continuous improvement."],
        questions: u1l2Questions.t4,
      },
      "u1l2-t5": {
        visual:    () => <EnhancementCards />,
        keyPoints: ["5 specific enhancements to the RISE Methodology","TPS (Enhancement 3) is ONLY for SAP Cloud ERP Private Package customers","Clean Core Success Plan = 150+ tasks in Cloud ALM"],
        jargon:[
          { term:"Transformation Preparation Service (TPS)", simple:"A specialised SAP-led service during the Prepare phase, specifically for SAP Cloud ERP Private Package customers.", inSystem:"Intensive 3-day workshop + sessions bridging the gap between pre-sales vision and post-sales execution.", inExam:"TPS is specifically for SAP Cloud ERP Private Package customers — not all RISE customers.", color:"#7C3AED" },
          { term:"Clean Core Success Plan",                  simple:"A plan set up in SAP Cloud ALM containing 150+ recommended tasks for maintaining Clean Core across all phases.", inSystem:"Lives in SAP Cloud ALM as a runbook. PM uses it to track and manage Clean Core activities.", inExam:"Set up during Prepare phase. 150+ tasks auto-loaded.", color:"#059669" },
        ],
        akshar:  "When Akshar starts their RISE journey, Arjun runs the DDA with Nirav — structured, not just a chat. TPS is triggered because Akshar is on Private Package — Arjun leads a 3-day workshop. Priya then sets up the Clean Core Success Plan in Cloud ALM — 150+ tasks auto-loaded instantly.",
        exam:    "TPS is specifically for SAP Cloud ERP Private Package customers — this is a frequent exam trap. DDA = Discover phase. Clean Core Success Plan = set up during Prepare.",
        mistake: "Saying TPS is available to all SAP customers. It is specifically for SAP Cloud ERP Private Package customers.",
        summary: ["5 enhancements: DDA, broader roadmaps, TPS for Private customers, improved onboarding+Success Plan, enhanced toolchain.","TPS exclusively for SAP Cloud ERP Private Package customers.","Success Plan = 150+ tasks in Cloud ALM, set up during Prepare."],
        questions: u1l2Questions.t5,
      },
      "u1l2-t6": {
        visual:    () => <><BenefitsGrid /><ToolsTable /></>,
        keyPoints: ["Four benefits: Predictability, Transparency, Access to info, SAP support at any time","Signavio = Process Analysis. LeanIX = Enterprise Architecture. Don't mix these.","TPS = transformation service. Embedded launch activities = onboarding service."],
        jargon:[
          { term:"SAP Signavio", simple:"SAP's suite of process analysis and management tools.", inSystem:"Used in Discover and Explore phases to map current processes vs SAP best practice.", inExam:"Signavio = process analysis and optimisation. Always paired with LeanIX.", color:"#0070F2" },
          { term:"SAP LeanIX",  simple:"SAP's enterprise architecture tool — understand and manage the IT application landscape.", inSystem:"Maps all current systems and plans the target architecture. Separate from Signavio.", inExam:"LeanIX = enterprise architecture. Signavio = processes. Don't mix these.", color:"#7C3AED" },
        ],
        akshar:  "Nirav's board asks: 'How do we know the project is on track?' Nirav: 'We have predictability — quality gates show red/amber/green. Transparency — Cloud ALM dashboard visible to all. Info is always available. And Arjun from SAP is a call away.' The 4 benefits answer every board question.",
        exam:    "All 4 benefits tested — often 3 correct from 5. The two wrong options are always 'enhanced employee engagement' and 'improved marketing analytics.'",
        mistake: "Mixing up Signavio (process analysis) with LeanIX (enterprise architecture).",
        summary: ["Four benefits: Predictability, Transparency, Access to info, Support at any time.","Signavio (6 tools) for process analysis; LeanIX (3 tools) for enterprise architecture.","TPS = transformation service. Embedded launch activities = onboarding service."],
        questions: u1l2Questions.t6,
      },
    },
  },

  // ─────────────────────────────────────────────────────
  // U1L3 — Clean Core Fundamentals
  // ─────────────────────────────────────────────────────
  "u1l3": {
    intro: "Clean Core is the foundation everything else builds on. Understand it deeply here — every Unit 2 lesson assumes you know this.",
    topics: ["u1l3-t1","u1l3-t2","u1l3-t3","u1l3-t4","u1l3-t5","u1l3-t6"],
    topicTitles: [
      "Why Clean Core Was Needed",
      "The 5 Core Dimensions",
      "What 'Clean' Actually Means",
      "5 Characteristics of a Clean System",
      "BTP's Role — Extensions Outside the Core",
      "Old ERP vs Clean Core",
    ],
    visuals: {
      "u1l3-t1": {
        visual:    () => <BeforeAfter before={["850+ custom programs","Upgrade attempts taking 18 months","3 failed upgrade projects at Akshar","70% of IT budget on maintenance","Cannot adopt new SAP AI features"]} after={["Zero custom code inside S/4HANA core","Quarterly updates applied in hours","Extensions live on BTP — unaffected by upgrades","30% IT budget on maintenance, 40% freed","Joule AI live from Day 1 of go-live"]} />,
        keyPoints: ["Clean Core = keep the ERP core standard, build all custom needs on BTP","Does NOT mean zero customisation — it means customisation outside the core","Cloud ERP updates are quarterly — dirty core = can't absorb them"],
        jargon:[
          { term:"Clean Core", simple:"Keep S/4HANA as close to SAP standard as possible. All custom development goes outside — on BTP.", inSystem:"Enables quarterly upgrades in hours instead of 18-month projects.", inExam:"'Keeping the core close to standard version, avoiding heavy customisations' — SAP's exact definition.", color:"#0070F2" },
          { term:"SAP ECC",    simple:"SAP's previous-generation on-premise ERP — what most RISE customers are migrating FROM.", inSystem:"Designed for heavy customisation, which is now the problem. The 'old world' in this course.", inExam:"ECC appears as the starting point companies are moving away from via RISE.", color:"#DC2626" },
        ],
        akshar:  "Akshar's 2015 upgrade attempt: estimated 18 months just to retest 850 custom programs. Shelved. 2019: same story. Post-Clean Core: their new S/4HANA has zero custom code inside core. When SAP releases an update, Akshar applies it in one afternoon — the BTP vendor rating app keeps working independently.",
        exam:    "SAP's exact definition: 'keeping the core system close to the standard version, avoiding heavy customisations that complicate updates and maintenance.'",
        mistake: "Thinking Clean Core means zero customisation. It means customisations are built OUTSIDE the core on BTP.",
        summary: ["Clean Core: keep S/4HANA standard. Custom needs → SAP BTP, not inside the core.","Enables quarterly updates in hours instead of 18-month projects.","Clean Core ≠ no customisation. It means customisation outside the core."],
        questions: u1l3Questions.t1,
      },
      "u1l3-t2": {
        visual:    () => <DimensionWheel />,
        keyPoints: ["Five dimensions: Processes, Extensions, Data, Integrations, Operations","Processes = sequences of actions in end-to-end flow","Integrations = mechanisms facilitating communication and data exchange between solutions"],
        jargon:[
          { term:"Processes",    simple:"Sequences of actions arranged in an end-to-end flow — like procure-to-pay or order-to-cash.", inSystem:"SAP Signavio Process Navigator contains the standard SAP versions.", inExam:"Exact definition is directly testable. 'Sequences of actions, end-to-end flow.'", color:"#0070F2" },
          { term:"Integrations", simple:"Mechanisms facilitating communication and data exchange between different solutions.", inSystem:"BTP Integration Suite keeps integrations clean. Custom connections create dirty integrations.", inExam:"Exact definition is directly testable. 'Communication and data exchange.'", color:"#059669" },
          { term:"Extensions",   simple:"Custom functionality added to SAP beyond what's available out of the box.", inSystem:"Clean extensions are built on BTP, not inside S/4HANA core.", inExam:"Extensions ≠ Integrations. Extensions ADD capability; Integrations CONNECT systems.", color:"#7C3AED" },
        ],
        akshar:  "Akshar's 5 dimensions: Processes = custom procure-to-pay → target SAP standard. Extensions = vendor rating app → moving to BTP. Data = 320,000 material records, many duplicates → needs cleaning. Integrations = custom ABAP IDocs to 3PL → moving to BTP Integration Suite. Operations = reactive IT → target proactive Cloud ALM monitoring.",
        exam:    "Two dimensions most frequently tested: Processes ('sequences of actions in end-to-end flow') and Integrations ('facilitate communication and data exchange'). Know both exact definitions.",
        mistake: "Confusing Extensions with Integrations. Extensions add functionality. Integrations connect systems. Two very different things.",
        summary: ["Five dimensions: Processes, Extensions, Data, Integrations, Operations — P-E-D-I-O.","Processes = end-to-end action sequences. Integrations = communication between systems.","Extensions add functionality. Integrations connect systems. Don't mix them up."],
        questions: u1l3Questions.t2,
      },
      "u1l3-t3": {
        visual:    () => <CleanStateVisual />,
        keyPoints: ["Clean = best practices + right methodology + right tools applied throughout","A fresh S/4HANA Cloud with Signavio Process Navigator = clean from day one","Cleanliness must be actively maintained after go-live — not automatic"],
        jargon:[
          { term:"SAP Signavio Process Navigator", simple:"SAP's library of standard, best-practice business process templates and documentation.", inSystem:"Companies compare current processes to SAP standard and adopt them where possible.", inExam:"Using Process Navigator = staying clean in the Processes dimension.", color:"#0070F2" },
          { term:"Cloud-Compliant Extensions",     simple:"Custom developments built using BTP and standard SAP APIs — not modifying the core system.", inSystem:"These don't break when SAP upgrades the core because they sit outside it.", inExam:"Cloud-compliant extensions are part of the ideal Clean Core state.", color:"#059669" },
        ],
        akshar:  "Akshar's S/4HANA on go-live day: clean — standard processes from Signavio Process Navigator, no custom code inside core. Two years later, a junior developer modifies a standard SAP table directly in S/4HANA. Immediately, the system starts getting dirty. The Clean Core Success Plan in Cloud ALM would have flagged this as a Quality Gate deviation.",
        exam:    "Key testable line: 'A newly provisioned SAP S/4HANA Cloud system that uses standard processes from SAP Signavio Process Navigator is considered clean.' Know this sentence.",
        mistake: "Thinking a system stays clean automatically after go-live. Cleanliness must be actively maintained.",
        summary: ["Clean = best practices + right methodology + right tools applied throughout implementation.","Fresh S/4HANA Cloud + Signavio Process Navigator = clean from day one.","Ideal state: up-to-date software + cloud-compliant extensions + high-quality data + well-designed processes."],
        questions: u1l3Questions.t3,
      },
      "u1l3-t4": {
        visual:    () => <CharacteristicsGrid />,
        keyPoints: ["Five characteristics: Minimalism, Modularity, Scalability, Maintainability, Stability & Reliability","Exam trap options: 'Complexities' and 'High dependency on customisations' — these are what Clean Core AVOIDS","'High performance' and 'cost efficiency' are outcomes, not official characteristics"],
        jargon:[
          { term:"Minimalism",  simple:"Remove redundant or obsolete functionalities. Only keep what genuinely adds business value.", inSystem:"In practice: deactivating old custom reports no one uses, removing replaced legacy integrations.", inExam:"Minimalism promotes simplicity by 'removing redundant or obsolete functionalities.'", color:"#0070F2" },
          { term:"Modularity",  simple:"ERP divided into independent, manageable pieces — update one without affecting others.", inSystem:"BTP extensions are modular — each app is independent of the S/4HANA core.", inExam:"Modularity 'facilitates dividing the ERP system into manageable modular components.'", color:"#7C3AED" },
        ],
        akshar:  "Akshar's old ECC: Not minimal (850 programs, many unused). Not modular (change one thing, break three others). Not scalable (new Pune plant took 8 months). Not maintainable (only Rajesh knows the custom pricing code). Not reliable (2 critical incidents/month). Clean S/4HANA = opposite of all the above.",
        exam:    "Multi-select: 'Which 3 are characteristics of a clean core?' Always: Minimalism + Scalability + Maintainability from that set. Wrong options: Complexities + High dependency on customisations.",
        mistake: "Including 'High performance' or 'Cost efficiency' as characteristics. They are outcomes — not the 5 official characteristics.",
        summary: ["Five: Minimalism, Modularity, Scalability, Maintainability, Stability & Reliability.","Exam trap: 'Complexities' and 'High dependency on customisations' are always wrong.","Tap each card above to see what each characteristic means."],
        questions: u1l3Questions.t4,
      },
      "u1l3-t5": {
        visual:    () => <BTPStack />,
        keyPoints: ["BTP = the place for ALL custom extensions in a Clean Core world","Two tracks: Low/No-code (Build Apps, Process Automation) and Pro-code (BAS, ABAP Cloud, Build Code)","SAP Discovery Center = official reference for all BTP capabilities"],
        jargon:[
          { term:"SAP Build Apps",                simple:"SAP's low-code/no-code tool for building mobile and web apps on BTP — no heavy coding required.", inSystem:"A business analyst can build apps for Akshar's field team without writing code.", inExam:"SAP Build Apps = low/no-code on BTP. Part of the SAP Build suite.", color:"#059669" },
          { term:"Business Application Studio",   simple:"SAP's professional development environment (IDE) for building custom apps on BTP.", inSystem:"Where pro-code developers write ABAP Cloud or JavaScript-based extensions.", inExam:"Pro-code development on BTP = Business Application Studio or ABAP Cloud environment.", color:"#7C3AED" },
          { term:"Customer Centre of Expertise",  simple:"An internal team at the customer that oversees SAP system governance, upgrades, and strategic decisions.", inSystem:"They ensure IT communicates with business units and makes upgrade decisions proactively.", inExam:"Recommended for 'ongoing operations' — part of the Operations dimension of Clean Core.", color:"#0891B2" },
        ],
        akshar:  "Akshar needs a custom vendor rating system. Old approach: ABAP inside S/4HANA = dirty core. New approach: Priya's developer builds it on BTP using Business Application Studio, connected to S/4HANA via BTP's standard APIs. Core untouched. When SAP releases their next quarterly update, Akshar applies it in one afternoon.",
        exam:    "BTP = extension platform. SAP Discovery Center details BTP capabilities. SAP Cloud ALM Operations apps = part of Enterprise Support package for monitoring, at no additional cost.",
        mistake: "Thinking low-code tools on BTP are only for simple solutions. BTP low-code is enterprise-grade — the recommended path for many extension scenarios.",
        summary: ["BTP = where ALL custom extensions go — keeping S/4HANA core untouched.","Low/No-code: Build Apps + Process Automation. Pro-code: BAS + ABAP Cloud + Build Code.","BTP capabilities → SAP Discovery Center. Ongoing governance → Customer Centre of Expertise."],
        questions: u1l3Questions.t5,
      },
      "u1l3-t6": {
        visual:    () => <><StatsRow stats={[{icon:"😰",to:70,suffix:"%",label:"IT budget on maintenance (ECC dirty core)",color:"#DC2626"},{icon:"✅",to:30,suffix:"%",label:"IT budget on maintenance (Clean Core)",color:"#059669"},{icon:"🔄",to:4,suffix:"x/yr",label:"SAP Cloud update frequency",color:"#0070F2"},{icon:"⏱️",to:18,suffix:" mo",label:"Typical ECC upgrade timeline (dirty core)",color:"#D97706"}]} /><BeforeAfter before={["Old software limits access to new features","Heavy customisation complicates upgrades","IT firefighting — no time for innovation","Security patches delayed by upgrade risk","SAP seen as a liability"]} after={["Continuous innovation — new features quarterly","Standardised processes enable fast upgrades","IT focuses on new capabilities, not maintenance","SAP manages core security automatically","SAP positioned as a strategic asset"]} /></>,
        keyPoints: ["Old ERP: limited features, upgrade nightmares, IT firefighting, security lag","Clean Core ERP: continuous innovation, better data, efficient IT, improved security","Clean Core applies to both Public AND Private Edition customers"],
        jargon:[{ term:"Continuous Innovation", simple:"The cloud model where SAP delivers new features quarterly — without major upgrade projects.", inSystem:"Only possible with a clean core. Dirty core = can't absorb quarterly updates.", inExam:"Clean Core enables continuous innovation adoption — a core benefit of the clean approach.", color:"#059669" }],
        akshar:  "Akshar's board presentation: Current state = 70% IT budget on maintenance, 3 failed upgrades, no AI features, 2 critical incidents/month. Target state (Clean Core) = 30% maintenance, 40% freed for innovation, quarterly updates in hours, Joule AI live from Day 1.",
        exam:    "Flowchart in the course contrasts: Old ERP (old software limits access, customisation complicates upgrades) vs Clean Core (cloud software innovation, better data quality, efficient IT, security).",
        mistake: "Thinking Clean Core only applies to Public Cloud. S/4HANA Cloud Private Edition customers under RISE equally follow Clean Core.",
        summary: ["Old ERP = limited features, upgrade nightmares, IT firefighting, security lag.","Clean Core = continuous innovation, better data, efficient IT, improved security.","Clean Core applies to both Public AND Private Edition — not just public cloud."],
        questions: u1l3Questions.t6,
      },
    },
  },
};

export function getLessonContent(lessonId: string): LessonContent | null {
  return LESSON_CONTENT[lessonId] ?? null;
}
