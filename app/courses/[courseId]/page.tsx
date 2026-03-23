"use client";

import { useState, useEffect, useRef, useMemo, use } from "react";
import Link from "next/link";
import COURSE_REGISTRY from "@/data/registry";
import type { LessonWithUnit } from "@/types";
import { getCourseProgress, setLessonDone } from "@/lib/progress";
import DonationModal from "@/components/ui/DonationModal";
import PracticeQuestion from "@/components/ui/PracticeQuestion";
import {
  StatsRow, EcosystemDiagram, Triangle, PhaseTimeline,
  DimensionWheel, CharacteristicsGrid, BTPStack, BeforeAfter,
  RISEvsGROW, PathwaysViz, ComponentPillars, EnhancementCards,
  BenefitsGrid,
} from "@/components/visuals/index";
import ITPillars from "@/components/visuals/ITPillars";
import ToolsTable from "@/components/visuals/ToolsTable";
import CleanStateVisual from "@/components/visuals/CleanStateVisual";
import { u1l1Questions } from "@/data/courses/rise-with-sap/questions/u1l1";
import { u1l2Questions } from "@/data/courses/rise-with-sap/questions/u1l2";
import { u1l3Questions } from "@/data/courses/rise-with-sap/questions/u1l3";

// ─────────────────────────────────────────────────────────────
// TOPIC TYPE — minimal, no sections
// visual: the diagram that tells the story
// insight: 2-3 lines max — plain language, exam tip woven in
// question: one checkpoint question, always visible
// ─────────────────────────────────────────────────────────────
interface Topic {
  id: string;
  title: string;
  visual: () => React.ReactNode;
  insight: string;
  question: {
    q: string;
    options: string[];
    correct: number;
    why: string;
  };
}

interface LessonData {
  intro: string;
  topics: Topic[];
}

// ─────────────────────────────────────────────────────────────
// LESSON CONTENT — teacher voice, no section headers
// ─────────────────────────────────────────────────────────────
function getLessons(): Record<string, LessonData> {
  return {

    // ── U1L1 ─────────────────────────────────────────────────
    "u1l1": {
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
    },

    // ── U1L2 ─────────────────────────────────────────────────
    "u1l2": {
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
    },

    // ── U1L3 ─────────────────────────────────────────────────
    "u1l3": {
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
    }
  };
}

// ─────────────────────────────────────────────────────────────
// SINGLE TOPIC — minimal, no section labels
// ─────────────────────────────────────────────────────────────
function TopicCard({ topic, num, isComplete, onComplete }: {
  topic: Topic; num: number; isComplete: boolean; onComplete: () => void;
}) {
  const [answered, setAnswered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Auto-complete when user scrolls past this topic
  useEffect(() => {
    const el = ref.current;
    if (!el || isComplete) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) onComplete(); },
      { threshold: 0, rootMargin: "0px 0px -80% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isComplete, onComplete]);

  const correct = answered === topic.question.correct;

  return (
    <div ref={ref} id={topic.id} className="mb-16">
      {/* Topic number + title */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all duration-300 ${isComplete ? "bg-[#059669] text-white" : "bg-[#EBF4FF] text-[#0070F2]"}`}>
          {isComplete ? "✓" : num}
        </div>
        <h3 className="font-display text-[clamp(15px,2vw,19px)] font-black text-[#0F172A]">{topic.title}</h3>
      </div>

      {/* Visual — full width, clean */}
      <div className="mb-5 w-full" style={{ maxWidth: "100%", overflow: "hidden" }}>
        {topic.visual()}
      </div>

      {/* Insight — teacher voice, no label, no box colour */}
      <div className="mb-6">
        {topic.insight.split('\n\n').map((para, i) => (
          <p key={i} className={`text-[14.5px] text-[#334155] leading-[1.85] ${i > 0 ? "mt-4" : ""}`}>
            {para}
          </p>
        ))}
      </div>

      {/* Checkpoint question — always visible, no toggle */}
      <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <p className="text-xs font-bold text-[#64748B]">Quick check — {topic.question.q}</p>
        </div>
        <div className="p-3 flex flex-col gap-2">
          {topic.question.options.map((opt, i) => {
            const isSelected = answered === i;
            const isCorrect = i === topic.question.correct;
            let bg = "#fff", border = "#E2E8F0", color = "#334155";
            if (answered !== null) {
              if (isCorrect) { bg = "#EDFAF1"; border = "#6EE7B7"; color = "#065F46"; }
              else if (isSelected) { bg = "#FEF2F2"; border = "#FECACA"; color = "#991B1B"; }
            } else if (isSelected) {
              bg = "#EBF4FF"; border = "#0070F2"; color = "#0057C2";
            }
            return (
              <button key={i} onClick={() => { if (answered === null) { setAnswered(i); onComplete(); } }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: bg, border: `1.5px solid ${border}`, color, cursor: answered !== null ? "default" : "pointer" }}>
                {opt}
              </button>
            );
          })}
        </div>
        {answered !== null && (
          <div className={`px-4 py-3 border-t text-xs leading-relaxed ${correct ? "bg-[#EDFAF1] border-[#6EE7B7] text-[#065F46]" : "bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]"}`}>
            {correct ? "✓ " : "✗ "}{topic.question.why}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LESSON VIEW
// ─────────────────────────────────────────────────────────────
function LessonView({ lessonId, courseId }: { lessonId: string; courseId: string }) {
  const lessons = useMemo(() => getLessons(), []);
  const lesson = lessons[lessonId];
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  const markDone = (id: string) => {
    setCompletedTopics(p => {
      if (p[id]) return p;
      return { ...p, [id]: true };
    });
  };

  // When all topics done, mark lesson as done in progress
  useEffect(() => {
    if (!lesson) return;
    const allDone = lesson.topics.every(t => completedTopics[t.id]);
    if (allDone) {
      setLessonDone(courseId, lessonId, true);
      window.dispatchEvent(new Event("storage-update"));
    }
  }, [completedTopics, lesson, courseId, lessonId]);

  if (!lesson) return (
    <div className="rounded-2xl border border-[#BFDBFE] bg-[#EBF4FF] p-10 text-center">
      <div className="text-4xl mb-4">📖</div>
      <h3 className="font-display text-lg font-black text-[#1E3A5F] mb-2">Coming Soon</h3>
      <p className="text-sm text-[#3B5E8C]">This lesson is being built. Check back soon.</p>
    </div>
  );

  const doneCount = lesson.topics.filter(t => completedTopics[t.id]).length;
  const totalCount = lesson.topics.length;

  return (
    <div>
      {/* Lesson intro — one line */}
      <p className="text-[15px] text-[#475569] mb-8 leading-relaxed">{lesson.intro}</p>

      {/* Progress within lesson */}
      <div className="flex items-center gap-3 mb-8 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
        <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-[#0070F2] rounded-full transition-all duration-500"
            style={{ width: `${totalCount > 0 ? (doneCount / totalCount) * 100 : 0}%` }} />
        </div>
        <span className="text-xs font-bold text-[#64748B] flex-shrink-0">{doneCount}/{totalCount} topics</span>
      </div>

      {/* Topics */}
      {lesson.topics.map((topic, i) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          num={i + 1}
          isComplete={!!completedTopics[topic.id]}
          onComplete={() => markDone(topic.id)}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────
function Sidebar({ course, allLessons, activeId, onSelect, onSupport }: {
  course: typeof COURSE_REGISTRY[string];
  allLessons: LessonWithUnit[];
  activeId: string;
  onSelect: (id: string) => void;
  onSupport: () => void;
}) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setDone(getCourseProgress(course.id));
    // Re-read progress whenever localStorage changes (triggered by topic completion)
    const handler = () => setDone(getCourseProgress(course.id));
    window.addEventListener("storage-update", handler);
    return () => window.removeEventListener("storage-update", handler);
  }, [course.id]);

  const total = allLessons.length;
  const doneN = Object.values(done).filter(Boolean).length;
  const prog  = total > 0 ? Math.round((doneN / total) * 100) : 0;

  const toggle = (id: string) => {
    const next = !done[id];
    setDone(p => ({ ...p, [id]: next }));
    setLessonDone(course.id, id, next);
    window.dispatchEvent(new Event("storage-update"));
  };

  return (
    <aside className="flex flex-col bg-white border-r border-[#E2E8F0] h-full overflow-hidden">
      {/* Progress */}
      <div className="p-4 border-b border-[#E2E8F0] flex-shrink-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-bold text-[#475569] uppercase tracking-[0.5px]">Progress</span>
          <span className="text-sm font-black text-[#0070F2]">{prog}%</span>
        </div>
        <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#0070F2] to-[#38BDF8] rounded-full transition-all duration-500"
            style={{ width: `${prog}%` }} />
        </div>
        <p className="text-[11px] text-[#94A3B8] mt-1.5">{doneN} of {total} lessons done</p>
      </div>

      {/* Lesson list */}
      <div className="flex-1 overflow-y-auto py-2">
        {course.units.map(unit => (
          <div key={unit.id} className="mb-1">
            <div className="px-4 py-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: unit.color }} />
              <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.7px]">{unit.title}</span>
            </div>
            {unit.lessons.map(lesson => {
              const isA   = activeId === lesson.id;
              const isDone = !!done[lesson.id];
              return (
                <button key={lesson.id} onClick={() => onSelect(lesson.id)}
                  className="w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 border-none transition-all border-l-[3px]"
                  style={{ background: isA ? "#EBF4FF" : "transparent", borderLeftColor: isA ? "#0070F2" : "transparent", borderLeftStyle: "solid" }}>
                  <div onClick={e => { e.stopPropagation(); toggle(lesson.id); }}
                    className="w-[17px] h-[17px] rounded flex-shrink-0 flex items-center justify-center mt-0.5 cursor-pointer transition-all"
                    style={{ background: isDone ? "#0070F2" : "transparent", border: isDone ? "none" : "1.5px solid #CBD5E1" }}>
                    {isDone && <span className="text-white text-[9px] font-black">✓</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug break-words"
                      style={{ fontWeight: isA ? 700 : 500, color: isA ? "#0057C2" : "#334155" }}>
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-[#94A3B8]">~{lesson.time} min</span>
                      {lesson.hasContent && (
                        <span className="text-[9px] bg-[#EDFAF1] text-[#065F46] px-1.5 py-px rounded font-bold">LIVE</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Support */}
      <div className="p-3.5 border-t border-[#E2E8F0] bg-[#FFF8F0] flex-shrink-0">
        <button onClick={onSupport}
          className="w-full bg-transparent border border-[#FDE68A] rounded-xl py-2.5 text-xs font-bold text-[#92400E] flex items-center justify-center gap-2 hover:bg-[#FEF3C7] transition-colors">
          ☕ Support the Creator
        </button>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function CoursePage({ params: paramsPromise }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(paramsPromise);
  const course       = COURSE_REGISTRY[courseId];
  const [activeId, setActiveId] = useState("");
  const [sideOpen, setSideOpen] = useState(true);
  const [modal, setModal]       = useState(false);
  const mainRef                 = useRef<HTMLDivElement>(null);

  const allLessons: LessonWithUnit[] = useMemo(() => {
    if (!course) return [];
    return course.units.flatMap(u =>
      u.lessons.map(l => ({ ...l, unitId: u.id, unitTitle: u.title, unitColor: u.color }))
    );
  }, [course]);

  useEffect(() => {
    if (allLessons.length > 0 && !activeId) setActiveId(allLessons[0].id);
  }, [allLessons, activeId]);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [activeId]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      const i = allLessons.findIndex(l => l.id === activeId);
      if (e.key === "ArrowRight" && i < allLessons.length - 1) setActiveId(allLessons[i + 1].id);
      if (e.key === "ArrowLeft"  && i > 0)                     setActiveId(allLessons[i - 1].id);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [activeId, allLessons]);

  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl font-black text-[#334155]">Course not found</p>
      <Link href="/" className="text-[#0070F2] font-semibold hover:underline">← Back to Home</Link>
    </div>
  );

  const ai   = allLessons.findIndex(l => l.id === activeId);
  const al   = allLessons[ai];
  const prev = ai > 0 ? allLessons[ai - 1] : null;
  const next = ai < allLessons.length - 1 ? allLessons[ai + 1] : null;
  const trunc = (s: string, n: number) => s.length > n ? s.slice(0, n) + "…" : s;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#0B1829] border-b border-white/[0.07] sticky top-0 z-50">
        <div className="px-5 h-[58px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/"
              className="flex-shrink-0 text-[#E2E8F0] border border-white/15 bg-white/[0.08] hover:bg-white/[0.16] text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
              ← Back
            </Link>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-[34px] h-[34px] flex-shrink-0 bg-gradient-to-br from-[#0070F2] to-[#0057C2] rounded-[9px] flex items-center justify-center text-[17px]">📘</div>
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-[#F1F5F9] font-display tracking-tight leading-none">SAPedia</p>
                <p className="text-[10px] text-[#475569] mt-0.5 truncate">{course.title}</p>
              </div>
            </div>
          </div>
          <button onClick={() => setModal(true)}
            className="flex-shrink-0 flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-[#E2E8F0] text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
            <span>☕</span><span className="hidden sm:inline">Support Creator</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 58px)" }}>
        {/* Sidebar */}
        <div className="flex-shrink-0 transition-all duration-300 overflow-hidden"
          style={{ width: sideOpen ? 272 : 0, minWidth: sideOpen ? 272 : 0 }}>
          <div className="w-[272px] h-full">
            <Sidebar
              course={course}
              allLessons={allLessons}
              activeId={activeId}
              onSelect={id => { setActiveId(id); }}
              onSupport={() => setModal(true)}
            />
          </div>
        </div>

        {/* Main */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Toolbar */}
          <div className="h-[50px] px-5 flex-shrink-0 bg-white border-b border-[#E2E8F0] flex items-center gap-3">
            <button onClick={() => setSideOpen(o => !o)}
              className="flex-shrink-0 bg-transparent hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-sm text-[#64748B] transition-colors">
              {sideOpen ? "◀" : "▶"}
            </button>
            {al && (
              <div className="flex-1 flex items-center gap-2 min-w-0 overflow-hidden">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: al.unitColor }} />
                <span className="text-xs font-semibold text-[#334155] flex-shrink-0 hidden sm:block">{al.unitTitle}</span>
                <span className="text-[#CBD5E1] hidden sm:block">›</span>
                <span className="text-xs text-[#0F172A] font-medium truncate">{al.title}</span>
              </div>
            )}
            <span className="text-xs text-[#94A3B8] flex-shrink-0">{ai + 1}/{allLessons.length}</span>
          </div>

          {/* Content */}
          <div ref={mainRef} className="flex-1 overflow-y-auto">
            <div className="max-w-[760px] mx-auto px-[clamp(20px,4vw,40px)] py-[clamp(28px,4vw,44px)]">
              {al && (
                <div>
                  {/* Lesson header */}
                  <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.4px]"
                        style={{ background: `${al.unitColor}18`, color: al.unitColor }}>
                        {al.unitTitle}
                      </span>
                      <span className="text-xs text-[#94A3B8]">⏱ ~{al.time} min</span>
                    </div>
                    <h1 className="font-display text-[clamp(20px,3vw,28px)] font-black text-[#0F172A] leading-snug">
                      {al.title}
                    </h1>
                    <div className="w-10 h-[3px] rounded-full mt-2.5"
                      style={{ background: `linear-gradient(90deg,${al.unitColor},${al.unitColor}50)` }} />
                  </div>

                  <LessonView lessonId={al.id} courseId={courseId} />
                </div>
              )}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="px-5 py-3 flex-shrink-0 bg-white border-t border-[#E2E8F0] flex justify-between items-center gap-3">
            <button onClick={() => prev && setActiveId(prev.id)} disabled={!prev}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border"
              style={{ background: prev ? "#fff" : "#F8FAFC", borderColor: prev ? "#E2E8F0" : "transparent", color: prev ? "#334155" : "#CBD5E1", cursor: prev ? "pointer" : "default" }}>
              ← {prev ? trunc(prev.title, 24) : "Previous"}
            </button>
            <span className="text-xs text-[#94A3B8] flex-shrink-0">{ai + 1} / {allLessons.length}</span>
            <button onClick={() => next && setActiveId(next.id)} disabled={!next}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold border-0"
              style={{ background: next ? "#0070F2" : "#F8FAFC", color: next ? "#fff" : "#CBD5E1", cursor: next ? "pointer" : "default" }}>
              {next ? trunc(next.title, 24) : "Next"} →
            </button>
          </div>
        </div>
      </div>

      {modal && <DonationModal onClose={() => setModal(false)} trigger="sidebar" />}
    </div>
  );
}
