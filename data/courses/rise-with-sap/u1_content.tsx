import React from "react";
import {
  StatsRow, EcosystemDiagram, Triangle, PhaseTimeline,
  DimensionWheel, CharacteristicsGrid, BTPStack, BeforeAfter,
  RISEvsGROW, PathwaysViz, ComponentPillars, EnhancementCards,
  BenefitsGrid
} from "@/components/visuals/index";
import ITPillars from "@/components/visuals/ITPillars";
import ToolsTable from "@/components/visuals/ToolsTable";
import CleanStateVisual from "@/components/visuals/CleanStateVisual";

export const u1l1Content = {
  intro: "SAP Business Suite — what it is, why it exists, and how companies get there.",
  topics: [
    {
      id: "u1l1-t1",
      title: "Why companies need to transform",
      visual: () => <StatsRow stats={[
        { icon:"🏭", to:850, suffix:"+", label:"Custom programs in a typical SAP ECC company", color:"#DC2626" },
        { icon:"📅", to:15,  suffix:" yrs", label:"Average time companies stay on ECC without upgrading", color:"#D97706" },
        { icon:"🌍", to:25,  suffix:"+", label:"Industries SAP brings expertise to", color:"#0070F2" },
      ]} />,
      insight: "SAP's framing is direct: the question is never whether to transform — it's how to do it with minimal complexity and risk. Companies stuck on SAP ECC face a compounding problem: every custom program they built over the years makes the next upgrade harder. Some haven't upgraded in 15 years. Meanwhile, SAP releases new AI features quarterly that these companies simply can't use.\n\nExam note: When a question asks about the 'pressing question businesses face' — the answer is always HOW to transform, not whether.",
      question: {
        q: "What does SAP identify as the pressing question businesses face in the digital economy?",
        options: ["Whether to invest in SAP products", "Whether to transform at all", "How to transform effectively with minimal complexity", "When to start the transformation process"],
        correct: 2,
        why: "SAP's exact framing: 'The pressing question is not whether to transform, but how to do so effectively.' Always about HOW."
      }
    },
    {
      id: "u1l1-t2",
      title: "What is the SAP Business Suite",
      visual: () => <div className="w-full" style={{ maxHeight: 380, overflow: "hidden" }}><EcosystemDiagram /></div>,
      insight: "The SAP Business Suite is not a single product — it's SAP's entire cloud portfolio working together. S/4HANA sits at the centre handling core operations (finance, procurement, manufacturing). Around it: SAP BTP for building custom extensions, Business Data Cloud for analytics, Business AI for intelligence, and LoB solutions like SuccessFactors (HR) and Ariba (procurement).\n\nThe stated goal: enhance connectivity and optimise functions across enterprises. Tap each ring above to explore. A common wrong answer in exams is 'simplify IT infrastructure' — that's a benefit, not the stated goal.",
      question: {
        q: "What is the main stated goal of the SAP Business Suite?",
        options: ["Simplify IT infrastructure and reduce costs", "Enhance connectivity and optimise functions across enterprises", "Replace all on-premise SAP systems", "Provide marketing and analytics capabilities"],
        correct: 1,
        why: "SAP's exact definition: 'designed to enhance connectivity and optimise functions across enterprises.' Simplifying IT is a benefit — not the goal."
      }
    },
    {
      id: "u1l1-t3",
      title: "The 4 IT challenges SAP addresses",
      visual: () => <ITPillars />,
      insight: "SAP identifies exactly four IT challenges businesses face — no more, no less. A proven implementation framework, best practices, expert navigational support to handle complexity, and the right tools for transformation. The RISE with SAP Methodology was built specifically to answer all four.\n\nExam trap: Cost reduction, market expansion, and workforce development sound plausible but are never in SAP's official list of four.",
      question: {
        q: "Which two are explicitly listed as IT challenges SAP addresses? (Choose 2)",
        options: ["Need for a proven implementation framework", "Need for rapid market expansion", "Expert navigational support to mitigate complexity", "Developing a global workforce"],
        correct: 0,
        why: "The 4 official challenges: proven framework, best practices, expert navigational support, right tools. Market expansion and workforce are distractors."
      }
    },
    {
      id: "u1l1-t4",
      title: "RISE vs GROW — two different journeys",
      visual: () => <RISEvsGROW />,
      insight: "Two lanes, same destination. RISE with SAP is for companies already running SAP on-premise — they have existing data, processes, and customisations to migrate. It's a structured, guided journey. GROW with SAP is for companies adopting SAP for the first time — they go straight to S/4HANA Public Cloud with SAP best practices from day one.\n\nTap each card above. Key distinction for exams: RISE = existing SAP customers. GROW = new SAP customers.",
      question: {
        q: "A company has been running SAP ECC since 2008 and wants to move to the cloud. Which journey applies?",
        options: ["GROW with SAP", "RISE with SAP", "Both apply equally", "Neither — they need a custom path"],
        correct: 1,
        why: "RISE with SAP is specifically for existing on-premise SAP customers transitioning to cloud. GROW is for new SAP customers."
      }
    },
    {
      id: "u1l1-t5",
      title: "Pathways to the SAP Business Suite",
      visual: () => <PathwaysViz />,
      insight: "Not every company goes 100% public cloud from day one. SAP offers three pathways. Full Public Cloud — everything on S/4HANA Public Edition. Hybrid — headquarters on Private Edition, subsidiaries on Public. Two-Tier — both Private and Public running simultaneously across the same organisation.\n\nCritical: 'Hybrid' in SAP context always means private + public cloud — never cloud + on-premise. Tap each pathway above.",
      question: {
        q: "Akshar Industries runs S/4HANA Cloud Private at HQ and Public Edition at their new Pune plant simultaneously. What is this called?",
        options: ["Hybrid deployment", "Two-tier implementation", "Full public cloud", "Phased migration"],
        correct: 1,
        why: "Running Private and Public cloud ERP concurrently in the same organisation is specifically called the two-tier implementation strategy."
      }
    },
  ]
};

export const u1l2Content = {
  intro: "The RISE with SAP Methodology — the framework that guides how the transformation actually happens.",
  topics: [
    {
      id: "u1l2-t1",
      title: "The Methodology vs the Offering",
      visual: () => <BeforeAfter
        before={["RISE with SAP — The Offering", "Products and licences you purchase", "S/4HANA, BTP, Signavio, LeanIX..."]}
        after={["RISE Methodology — The Framework", "HOW you implement those products", "Phases, tasks, quality gates, guidance"]}
      />,
      insight: "These are two different things that often get confused. RISE with SAP is what you buy — the product bundle. The RISE with SAP Methodology is how you use it — the structured framework built on SAP Activate (SAP's proven implementation methodology). Think of it as: the offering is the destination, the Methodology is the GPS.\n\nBuilt on a clean core strategy — meaning every phase, every task is designed to keep the ERP system clean.",
      question: {
        q: "What is the primary purpose of the RISE with SAP Methodology?",
        options: ["To define the pricing of SAP cloud products", "To provide structured guidance for cloud transformation", "To replace all legacy SAP products immediately", "To manage SAP partner certifications"],
        correct: 1,
        why: "The Methodology provides 'structured guidance across defined phases, supported by SAP experts and partners.' It's the framework — not the product bundle."
      }
    },
    {
      id: "u1l2-t2",
      title: "People, Processes, and Tools",
      visual: () => <Triangle />,
      insight: "SAP's foundational belief: transformation only works when all three are present. People — the right team, advisors, and partners. Processes — business flows redesigned to SAP best practice. Tools — the digital infrastructure that manages execution.\n\nWatch the exact word: SAP always says tools, never technology. That single word difference appears in exam options. Tap each corner of the triangle.",
      question: {
        q: "According to SAP, the transformation journey hinges on which three elements?",
        options: ["People, Processes, Technology", "People, Processes, Tools", "Strategy, Processes, Tools", "People, Data, Tools"],
        correct: 1,
        why: "SAP's exact phrase is 'people, processes, and tools' — not technology. This distinction is tested."
      }
    },
    {
      id: "u1l2-t3",
      title: "The 3 core components",
      visual: () => <ComponentPillars />,
      insight: "The Methodology has three components, each mapping directly to People, Processes, Tools. The Standardised Framework (what to do — maps to Processes). The Integrated Toolchain (how to manage it digitally — maps to Tools). Expert Guidance (human support throughout — maps to People).\n\nTap each pillar. Common exam trap: 'best practices' sounds like a fourth component but it's embedded inside the Standardised Framework — not standalone.",
      question: {
        q: "Which three are the core components of the RISE with SAP Methodology?",
        options: ["Standardised Framework, Expert Guidance, Integrated Toolchain", "Best Practices, Expert Guidance, Integrated Toolchain", "Standardised Framework, Marketing Strategy, Expert Guidance", "Integrated Toolchain, Customer Support, Best Practices"],
        correct: 0,
        why: "The three components are: Standardised Framework, Integrated Toolchain, Expert Guidance. Best Practices is embedded within the Framework, not a separate component."
      }
    },
    {
      id: "u1l2-t4",
      title: "Six phases: Discover to Run",
      visual: () => <PhaseTimeline />,
      insight: "Tap each phase above to see what happens. The key detail for exams: the Digital Discovery Assessment (DDA) belongs to Discover. The four onboarding calls happen in Prepare. Clean Core Quality Gates happen from Explore through Run — not in Discover or Prepare.\n\nPrepare is also when the Clean Core Success Plan gets set up in Cloud ALM — 150+ pre-loaded tasks that guide the whole project.",
      question: {
        q: "During which phase does SAP's Onboarding Advisor conduct four personalised sessions with the customer?",
        options: ["Discover", "Prepare", "Explore", "Realize"],
        correct: 1,
        why: "The four onboarding sessions happen in the Prepare phase. Discover has the DDA. Quality Gates start from Explore."
      }
    },
    {
      id: "u1l2-t5",
      title: "Five methodology enhancements",
      visual: () => <EnhancementCards />,
      insight: "The Methodology was enhanced with five specific additions. The most exam-relevant: the Transformation Preparation Service (TPS) — a 3-day intensive workshop during Prepare — is specifically for SAP Cloud ERP Private Package customers. Not all RISE customers. Not all Business Suite customers. Private Package only.\n\nThe other four: improved Digital Discovery Assessment, broader adoption roadmaps, improved onboarding with the 150+ task Success Plan, and enhanced toolchain connections.",
      question: {
        q: "The Transformation Preparation Service (TPS) is available to which customers?",
        options: ["All SAP Business Suite customers", "All RISE with SAP customers", "SAP Cloud ERP Private Package customers only", "New SAP customers using GROW with SAP"],
        correct: 2,
        why: "TPS is specifically for SAP Cloud ERP Private Package customers. This is a frequent exam trap — it is NOT available to all RISE or all Business Suite customers."
      }
    },
    {
      id: "u1l2-t6",
      title: "Benefits and transformation tools",
      visual: () => <div className="flex flex-col gap-4"><BenefitsGrid /><ToolsTable /></div>,
      insight: "Four stated benefits: Predictability (quality gates show clear status), Transparency (all stakeholders see progress), Access to information (resources available instantly), and SAP support at any time.\n\nThe tools split into two: SAP Signavio covers everything to do with process analysis. SAP LeanIX covers enterprise architecture — mapping your IT landscape. These two are frequently confused in exams. Signavio = processes. LeanIX = architecture.",
      question: {
        q: "Which tool category does SAP Signavio belong to in the RISE Methodology?",
        options: ["Enterprise architecture tools", "Process analysis and optimisation tools", "Project management tools", "Data migration tools"],
        correct: 1,
        why: "Signavio = process analysis and optimisation. LeanIX = enterprise architecture. Don't mix these."
      }
    },
  ]
};

export const u1l3Content = {
  intro: "Clean Core — the concept that underpins everything in RISE with SAP.",
  topics: [
    {
      id: "u1l3-t1",
      title: "The problem Clean Core solves",
      visual: () => <BeforeAfter
        before={["850+ custom ABAP programs", "18-month upgrade timelines", "70% IT budget on maintenance", "Cannot adopt new SAP AI features", "3 failed upgrade attempts"]}
        after={["Zero custom code inside S/4HANA", "Quarterly updates in hours", "30% IT budget on maintenance", "Joule AI available from Day 1", "Upgrades become routine"]}
      />,
      insight: "Decades of customising SAP ECC created a trap: the more you customised, the harder it became to upgrade. Some companies haven't upgraded in 15 years because every custom program needs retesting. Clean Core breaks this cycle by drawing one clear boundary — the S/4HANA core stays standard, everything custom goes to SAP BTP.\n\nSAP's definition: 'keeping the core system close to the standard version, avoiding heavy customisations that complicate updates.' Clean Core does not mean zero customisation — it means customisation happens outside the core.",
      question: {
        q: "What does the Clean Core concept primarily focus on?",
        options: ["Eliminating all customisations permanently", "Keeping the core system close to standard by avoiding heavy customisations inside it", "Replacing SAP with a fully custom-built ERP", "Reducing the number of SAP modules in use"],
        correct: 1,
        why: "Clean Core = close to standard, avoid heavy customisations inside the core. Custom development still happens — but on BTP, not inside S/4HANA."
      }
    },
    {
      id: "u1l3-t2",
      title: "The five core dimensions",
      visual: () => <DimensionWheel />,
      insight: "Clean Core applies across five dimensions of the ERP. Tap each one above. Two are most frequently tested: Processes — defined as 'sequences of actions arranged in an end-to-end flow' (procure-to-pay, order-to-cash). Integrations — defined as 'mechanisms facilitating communication and data exchange between different solutions.'\n\nA common confusion: Extensions add new capability inside the system boundary. Integrations connect the system to other systems outside it.",
      question: {
        q: "Which Clean Core dimension is defined as 'mechanisms facilitating communication and data exchange between different solutions'?",
        options: ["Extensions", "Processes", "Integrations", "Operations"],
        correct: 2,
        why: "Integrations = communication and data exchange between solutions. Extensions = custom functionality added to SAP. These two are frequently confused."
      }
    },
    {
      id: "u1l3-t3",
      title: "What clean actually means",
      visual: () => <CleanStateVisual />,
      insight: "A dimension is clean when best practices, the right methodology, and the right tools were applied throughout implementation. A freshly provisioned S/4HANA Cloud system using standard processes from SAP Signavio Process Navigator is considered clean from day one.\n\nThe critical insight: cleanliness must be actively maintained. The moment a developer modifies a standard SAP table directly inside S/4HANA — rather than building on BTP — the system starts getting dirty. The Clean Core Quality Gates in Cloud ALM exist specifically to catch these deviations before they compound.",
      question: {
        q: "By default, which system is considered 'clean' from day one?",
        options: ["SAP ECC with standard configurations", "Any SAP system with no user customisations", "A newly provisioned SAP S/4HANA Cloud system using standard processes from Signavio Process Navigator", "SAP S/4HANA on-premise with no ABAP code"],
        correct: 2,
        why: "Newly provisioned S/4HANA Cloud + Signavio Process Navigator standard processes = clean by default. Both conditions matter."
      }
    },
    {
      id: "u1l3-t4",
      title: "Five characteristics of a clean system",
      visual: () => <CharacteristicsGrid />,
      insight: "Tap each card. The five official characteristics: Minimalism (remove redundant functionality), Modularity (independent components), Scalability (grows without breaking), Maintainability (any developer can understand the code), Stability and Reliability (fewer dependencies, fewer failures).\n\nExam traps: 'Complexities' and 'High dependency on customisations' are what Clean Core eliminates — they appear as wrong options. High performance and cost efficiency are outcomes of Clean Core, not characteristics.",
      question: {
        q: "Which three are official characteristics of a clean core system?",
        options: ["Minimalism, Complexities, Scalability", "Minimalism, Scalability, Maintainability", "High customisation dependency, Scalability, Modularity", "Stability, Cost efficiency, Minimalism"],
        correct: 1,
        why: "The five characteristics: Minimalism, Modularity, Scalability, Maintainability, Stability and Reliability. Complexities and high customisation dependency are what Clean Core removes."
      }
    },
    {
      id: "u1l3-t5",
      title: "BTP — where extensions belong",
      visual: () => <BTPStack />,
      insight: "Hover each layer above. SAP BTP is the platform where all custom development should happen in a clean core world. Two tracks: Low/no-code for business users (SAP Build Apps, Process Automation) and Pro-code for developers (Business Application Studio, ABAP Cloud, Build Code).\n\nWhy does this matter? Extensions built on BTP are independent of the S/4HANA core. When SAP releases a quarterly update, the core upgrades cleanly — BTP extensions keep running unaffected. SAP Discovery Center is the official reference for all BTP capabilities.",
      question: {
        q: "Why does SAP recommend building custom extensions on BTP rather than inside S/4HANA?",
        options: ["BTP is cheaper than S/4HANA licences", "It keeps the core clean so quarterly upgrades apply without disruption", "BTP is faster for all development types", "SAP mandates it in all contracts"],
        correct: 1,
        why: "Building on BTP separates extensions from the core — keeping it clean and making quarterly upgrades fast and safe."
      }
    },
    {
      id: "u1l3-t6",
      title: "Old ERP vs Clean Core — the real difference",
      visual: () => <div className="flex flex-col gap-3">
        <StatsRow stats={[
          { icon:"😰", to:70, suffix:"%", label:"IT budget on maintenance — typical dirty core", color:"#DC2626" },
          { icon:"✅", to:30, suffix:"%", label:"IT budget on maintenance — Clean Core target", color:"#059669" },
          { icon:"🔄", to:4,  suffix:"x/yr", label:"SAP cloud update frequency", color:"#0070F2" },
          { icon:"⏱️", to:18, suffix:" mo", label:"Typical ECC upgrade timeline", color:"#D97706" },
        ]} />
        <BeforeAfter
          before={["Old software limits access to new features", "Customisation complicates every upgrade", "IT team firefighting, no time to innovate", "Security patches delayed due to upgrade risk"]}
          after={["New capabilities delivered every quarter", "Upgrades take hours, not months", "IT focuses on business value, not maintenance", "SAP manages core security automatically"]}
        />
      </div>,
      insight: "The numbers say it clearly. Companies on dirty ECC cores spend 70% of IT budget just keeping the lights on. Clean Core targets 30% — freeing 40% for actual innovation. SAP releases updates four times a year. A dirty core can't absorb them. A clean core applies them in hours.\n\nOne more thing: Clean Core applies equally to Private Edition and Public Edition customers. Both are expected to maintain clean core under RISE.",
      question: {
        q: "Which statement about Clean Core is true?",
        options: ["Clean Core only applies to SAP S/4HANA Public Cloud customers", "Embracing Clean Core reduces technical debt and enables operational efficiency", "A system stays clean automatically after go-live without further effort", "Clean Core requires zero customisation of any kind"],
        correct: 1,
        why: "Clean Core reduces technical debt and enables operational efficiency for both Private and Public Edition customers. It requires active maintenance — not zero customisation."
      }
    },
  ]
};
