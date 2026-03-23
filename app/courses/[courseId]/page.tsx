"use client";

import { useState, useEffect, useRef, useMemo, use } from "react";
import Link from "next/link";
import COURSE_REGISTRY from "@/data/registry";
import type { LessonWithUnit } from "@/types";
import { getCourseProgress, setLessonDone } from "@/lib/progress";
import DonationModal from "@/components/ui/DonationModal";
import FlipCard from "@/components/ui/FlipCard";
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
import type { TopicVisual } from "@/types";

// ─── LESSON META ─────────────────────────────────────────────
const LESSON_META: Record<string, { intro: string; topics: string[]; topicTitles: string[] }> = {
  "u1l1": { intro: "What SAP Business Suite is, why it exists, and how companies get there.", topics: ["u1l1-t1","u1l1-t2","u1l1-t3","u1l1-t4","u1l1-t5"], topicTitles: ["Why Businesses Need to Transform","What is the SAP Business Suite","The 4 IT Challenges SAP Addresses","RISE vs GROW — Two Journeys","Pathways to the SAP Business Suite"] },
  "u1l2": { intro: "The RISE with SAP Methodology — structure, core components, six phases, and benefits.", topics: ["u1l2-t1","u1l2-t2","u1l2-t3","u1l2-t4","u1l2-t5","u1l2-t6"], topicTitles: ["What is the RISE with SAP Methodology","People, Processes, Tools","The 3 Core Components","The 6 Phases — Discover to Run","5 Methodology Enhancements","Key Benefits + Tools"] },
  "u1l3": { intro: "Clean Core — the concept everything else builds on.", topics: ["u1l3-t1","u1l3-t2","u1l3-t3","u1l3-t4","u1l3-t5","u1l3-t6"], topicTitles: ["Why Clean Core Was Needed","The 5 Core Dimensions","What Clean Actually Means","5 Characteristics","BTP — Extensions Outside the Core","Old ERP vs Clean Core"] },
};

// ─── TOPIC VISUALS ───────────────────────────────────────────
function getVisuals(): Record<string, TopicVisual> {
  return {
    "u1l1-t1": { visual: () => <StatsRow stats={[{icon:"🏭",to:850,suffix:"+",label:"Custom programs avg ECC company",color:"#DC2626"},{icon:"📅",to:15,suffix:" yrs",label:"Akshar on ECC without upgrade",color:"#D97706"},{icon:"🌍",to:25,suffix:"+",label:"Industries SAP has expertise in",color:"#0070F2"}]} />, keyPoints:["Not whether to transform — but HOW","Heavy custom ECC = can't absorb quarterly cloud updates","SAP approach: outcome-focused, not just install software"], jargon:[{term:"On-Premise ERP",simple:"SAP software on company's own servers. You own hardware, manage upgrades.",inSystem:"The old way — like SAP ECC. Starting point companies move AWAY from via RISE.",inExam:"Appears as the starting point companies are moving away from.",color:"#DC2626"},{term:"Digital Transformation",simple:"Overhauling how a business operates using modern technology.",inSystem:"On-premise ERP → cloud ERP with modern processes.",inExam:"SAP frames it as not whether to transform, but how.",color:"#0070F2"}], akshar:"Akshar Industries, Ahmedabad. SAP ECC since 2009. 850+ custom programs. Every upgrade attempt failed — too risky to retest all custom code. CIO Nirav Shah told the board: We are falling behind competitors using AI.", exam:"SAP states expertise across 25+ industries. Key phrase: not whether to transform, but how. Questions test this — always about HOW, not IF.", mistake:"Thinking transformation is purely a technology project. SAP builds it around People, Processes, AND Tools.", summary:["Transformation is unavoidable — the only question is HOW.","Legacy ECC = upgrade backlogs, complexity, innovation gaps.","SAP brings 25+ industry expertise to guide transformations."], questions: u1l1Questions.t1 },
    "u1l1-t2": { visual: () => <div className="w-full overflow-hidden"><EcosystemDiagram /></div>, keyPoints:["The Suite = SAP's complete cloud portfolio — not just S/4HANA","Goal: enhance connectivity and optimise functions across enterprises","ERP + BTP + Business Data Cloud + Business AI + LoB Solutions"], jargon:[{term:"SAP Business Suite",simple:"SAP's full collection of cloud products working together as one ecosystem.",inSystem:"Cloud ERP at centre, surrounded by BTP, Business Data Cloud, Business AI, LoB solutions.",inExam:"Main goal: enhance connectivity and optimise functions. Know this phrase exactly.",color:"#0070F2"},{term:"SAP BTP",simple:"Platform for building custom apps and integrations — without touching the core ERP.",inSystem:"The extension layer — where customisations go so the core stays clean.",inExam:"Platform for extensions AND integrations. Appears throughout the course.",color:"#7C3AED"},{term:"LoB Solutions",simple:"Specialised apps for specific business functions — HR, sales, procurement.",inSystem:"SuccessFactors for HR, Ariba for procurement — work alongside S/4HANA.",inExam:"Part of the Business Suite — not standalone products in this context.",color:"#0891B2"}], akshar:"Before RISE, Akshar thought of SAP as just their ECC system. Post-RISE, Nirav tells the board: We are getting the entire SAP Business Suite — S/4HANA for operations, BTP for custom apps, Business Data Cloud for analytics.", exam:"Main goal = enhance connectivity and optimise functions across enterprises. Wrong answer trap: simplify IT infrastructure — that is a benefit, not the main goal.", mistake:"Business Suite = SAP S/4HANA. Wrong. S/4HANA is just the ERP at the centre. The Suite is the entire portfolio.", summary:["Business Suite = ERP + BTP + Business Data Cloud + Business AI + LoB.","Main goal: enhance connectivity and optimise functions.","Integrated ecosystem — not a single product."], questions: u1l1Questions.t2 },
    "u1l1-t3": { visual: () => <ITPillars />, keyPoints:["SAP identifies exactly 4 IT challenges — no more, no less","RISE Methodology directly answers all 4","Distractors: cost reduction, market expansion — never in the official 4"], jargon:[{term:"Implementation Framework",simple:"A structured playbook — what to do, in what order, at every stage.",inSystem:"SAP provides this through SAP Activate + RISE Methodology.",inExam:"Always appears as proven implementation framework — the word proven matters.",color:"#0070F2"},{term:"Best Practices",simple:"SAP recommended, pre-built way of running business processes.",inSystem:"Built into S/4HANA out of the box. Using them = Clean Core.",inExam:"What companies adopt by following standard SAP processes.",color:"#7C3AED"}], akshar:"When Akshar started migration research, they had none of the 4: no structured framework, no best practices, no expert support, no proper tools. They were managing in spreadsheets.", exam:"These 4 appear in multi-select questions. Distractors: cost reduction, rapid market expansion, developing a global workforce.", mistake:"Adding cost reduction as one of the four. SAP does not list it. The 4 are: proven framework, best practices, expert navigational support, right tools.", summary:["Exactly 4 IT challenges: proven framework, best practices, navigational support, right tools.","RISE Methodology directly answers all 4.","Cost reduction and market expansion are NOT in the list."], questions: u1l1Questions.t3 },
    "u1l1-t4": { visual: () => <RISEvsGROW />, keyPoints:["RISE = existing on-premise SAP customers migrating to cloud","GROW = new SAP customers, straight to Public Cloud","SAP Cloud ERP Private Package = RISE key offering for large enterprises"], jargon:[{term:"RISE with SAP",simple:"Structured transformation journey for existing on-premise SAP customers moving to cloud.",inSystem:"Includes methodology, tools, services, and expert guidance for ECC/S4HANA migration.",inExam:"RISE = existing customers. Comes with SAP Cloud ERP Private Package.",color:"#0070F2"},{term:"GROW with SAP",simple:"SAP path for new customers, going straight to Public Cloud.",inSystem:"Faster, simpler, based on SAP Best Practices from day one.",inExam:"GROW = new customers. Public Cloud. Not the focus of this course.",color:"#059669"}], akshar:"Akshar = RISE candidate. ECC since 2009, 850+ custom programs — cannot start fresh. Contrast: new pharma startup in Hyderabad with no SAP history goes GROW, straight to Public Cloud, live in months.", exam:"RISE = existing on-premise customers. GROW = new customers. SAP Cloud ERP Private Package is the key RISE offering.", mistake:"Confusing RISE and GROW as the same journey. They serve fundamentally different customer profiles.", summary:["RISE = existing on-premise SAP customers migrating to cloud.","GROW = net-new SAP customers, straight to Public Cloud.","SAP Cloud ERP Private Package is RISE key offering."], questions: u1l1Questions.t4 },
    "u1l1-t5": { visual: () => <PathwaysViz />, keyPoints:["Three pathways: Full Public Cloud, Hybrid, Two-Tier","Hybrid in SAP = private + public cloud — NOT cloud + on-premise","All pathways supported by BTP + Business Data Cloud + Business AI"], jargon:[{term:"Hybrid Model",simple:"Mixing SAP Cloud ERP Private for complex areas with Public for simpler areas.",inSystem:"HQ on Private Edition, new factories on Public Edition.",inExam:"Hybrid = private + public cloud. NOT half-cloud half-on-premise.",color:"#7C3AED"},{term:"Two-Tier Implementation",simple:"Running both Private and Public cloud ERP simultaneously in same company.",inSystem:"Parent company on Private + each subsidiary on Public, integrated via BTP.",inExam:"Specific term for concurrent deployment of both editions.",color:"#059669"}], akshar:"Akshar plan: Ahmedabad HQ on S/4HANA Cloud Private. New Pune plant on S/4HANA Cloud Public. Both connected via BTP. This is the two-tier model.", exam:"Hybrid means private + public cloud — not cloud + on-premise. This distinction is tested.", mistake:"Thinking hybrid means keeping some systems on-premise. In SAP context it is always all cloud.", summary:["Three pathways: full public, hybrid, or two-tier concurrent.","Two-tier = Private at HQ + Public at subsidiaries, integrated via BTP.","Hybrid = cloud-to-cloud mix — NOT cloud + on-premise."], questions: u1l1Questions.t5 },
    "u1l2-t1": { visual: () => <BeforeAfter before={["RISE with SAP — The Offering","Products and Licences you buy","S/4HANA, BTP, Signavio..."]} after={["RISE Methodology — The Framework","HOW you implement those products","Phases, tasks, quality gates, guidance"]} />, keyPoints:["Methodology = the HOW. The offering = the WHAT","Built on SAP Activate — the proven underlying framework","Works across all SAP Business Suite configurations"], jargon:[{term:"SAP Activate Methodology",simple:"SAP established implementation methodology — what RISE Methodology builds upon.",inSystem:"Provides the phase structure Discover to Run, templates, and tasks.",inExam:"RISE augments SAP Activate — it does not replace it.",color:"#0070F2"},{term:"Clean Core Strategy",simple:"Guiding principle: keep the ERP standard, move customisations outside.",inSystem:"The Methodology is built on a clean core strategy.",inExam:"Clean Core is both a strategy and a measurable outcome.",color:"#059669"}], akshar:"Priya Desai from TechNova opens SAP Cloud ALM, loads the RISE Methodology, and gets pre-built tasks for every phase. Arjun from SAP walks through exactly what Akshar needs in Discover. The Methodology is their GPS.", exam:"RISE with SAP offering vs RISE Methodology — two different things. Methodology = structured guidance.", mistake:"Treating Methodology and the RISE product package as the same. Package = products. Methodology = phases + guidance + tools.", summary:["RISE Methodology = structured framework built on SAP Activate.","Guides through defined phases with experts and toolchain.","Built on Clean Core strategy — every phase keeps ERP clean."], questions: u1l2Questions.t1 },
    "u1l2-t2": { visual: () => <Triangle />, keyPoints:["Transformation hinges on people, processes, and tools — SAP exact phrase","NOT technology — the word is tools. Testable difference","All three must work together — missing one fails the transformation"], jargon:[{term:"People-Process-Tools",simple:"SAP model: transformation requires all three working in sync.",inSystem:"Every aspect of the RISE Methodology maps to one of these pillars.",inExam:"SAP uses tools — NOT technology. Single word difference, real exam trap.",color:"#0070F2"}], akshar:"Akshar: People = Nirav Shah, Priya Desai, Arjun Kapoor. Processes = procure-to-pay, order-to-cash. Tools = Signavio, Cloud ALM, BTP.", exam:"The word is Tools — NOT Technology. If an option says People, Processes, Technology it is wrong.", mistake:"Writing Technology instead of Tools. SAP is specific about this language.", summary:["Hinges on people, processes, and tools — memorise this exact phrase.","People = teams. Processes = business flows. Tools = digital products.","All three must work together."], questions: u1l2Questions.t2 },
    "u1l2-t3": { visual: () => <ComponentPillars />, keyPoints:["Three components: Standardised Framework, Integrated Toolchain, Expert Guidance","Each maps to People/Process/Tools","Best Practices is NOT a 4th component — embedded inside the Framework"], jargon:[{term:"Standardised Framework",simple:"Enhanced SAP Activate roadmap with Clean Core activities built in.",inSystem:"Adds tasks, quality gates, deliverables to SAP Activate phases.",inExam:"Official benefit: for faster adoption tailored to business needs.",color:"#0070F2"},{term:"Integrated Toolchain",simple:"Recommended SAP tools working together for end-to-end transformation.",inSystem:"Signavio + LeanIX + Cloud ALM + BTP. Pre-integrated.",inExam:"Official benefit: streamlined collaboration and project execution.",color:"#7C3AED"},{term:"Expert Guidance",simple:"SAP human support — Onboarding Advisors, Enterprise Architects, certified partners.",inSystem:"Available through 4 onboarding calls and ongoing engagement.",inExam:"Official benefit: end-to-end engagement.",color:"#059669"}], akshar:"Framework: Priya uses Clean Core Runbook in Cloud ALM — 150+ tasks pre-loaded. Toolchain: Signavio maps processes, LeanIX maps IT landscape, Cloud ALM tracks tasks. Expert Guidance: Arjun hosts 4 onboarding calls.", exam:"Multi-select: which 3 are core components? Answer: Standardised Framework + Integrated Toolchain + Expert Guidance.", mistake:"Listing Best Practices as a fourth component. It is embedded INSIDE the Standardised Framework.", summary:["Three components: Framework, Toolchain, Expert Guidance.","Framework=Processes, Toolchain=Tools, Expert Guidance=People.","Multi-select will test this with convincing distractors."], questions: u1l2Questions.t3 },
    "u1l2-t4": { visual: () => <PhaseTimeline />, keyPoints:["Six phases: Discover, Prepare, Explore, Realize, Deploy, Run","DDA = Discover. 4 Calls = Prepare. Quality Gates = Explore through Run","Quality Gates do NOT start in Discover or Prepare"], jargon:[{term:"Digital Discovery Assessment",simple:"Structured toolkit in Discover phase to capture the current landscape.",inSystem:"Guides onboarding team in collecting the right data before project starts.",inExam:"DDA belongs specifically to the Discover phase.",color:"#0070F2"},{term:"Clean Core Quality Gates",simple:"Checkpoints at end of each phase Explore through Run verifying Clean Core compliance.",inSystem:"Questionnaires managed through SAP Cloud ALM.",inExam:"Quality Gates in Explore, Realize, Deploy, Run — NOT Discover or Prepare.",color:"#7C3AED"}], akshar:"Akshar journey: Discover = DDA with Nirav. Prepare = 4 onboarding calls. Explore = process mapping in Signavio. Realize = BTP app built, data migrated. Deploy = go-live. Run = monitoring via Cloud ALM.", exam:"Quality Gates = Explore through Run. Discover = DDA. Prepare = onboarding sessions.", mistake:"Thinking Quality Gates start from Discover. They start from Explore.", summary:["Six phases: Discover, Prepare, Explore, Realize, Deploy, Run.","DDA in Discover. 4 calls in Prepare. Quality Gates Explore through Run.","Deploy = go-live. Run = operations + continuous improvement."], questions: u1l2Questions.t4 },
    "u1l2-t5": { visual: () => <EnhancementCards />, keyPoints:["5 enhancements to the RISE Methodology","TPS is ONLY for SAP Cloud ERP Private Package customers","Clean Core Success Plan = 150+ tasks in Cloud ALM"], jargon:[{term:"Transformation Preparation Service",simple:"SAP-led service in Prepare phase — specifically for SAP Cloud ERP Private Package customers.",inSystem:"Intensive 3-day workshop bridging pre-sales vision and post-sales execution.",inExam:"Specifically for SAP Cloud ERP Private Package customers — not all RISE customers.",color:"#7C3AED"},{term:"Clean Core Success Plan",simple:"Plan in SAP Cloud ALM with 150+ tasks for maintaining Clean Core.",inSystem:"Lives in SAP Cloud ALM as a runbook for the project team.",inExam:"Set up during Prepare phase. 150+ tasks auto-loaded.",color:"#059669"}], akshar:"TPS triggered because Akshar is on Private Package — Arjun leads a 3-day workshop. Priya sets up the Clean Core Success Plan in Cloud ALM — 150+ tasks auto-loaded instantly.", exam:"TPS = Private Package customers only. This is the most common exam trap in this lesson.", mistake:"Saying TPS is available to all SAP customers. It is specifically for SAP Cloud ERP Private Package.", summary:["5 enhancements: DDA, broader roadmaps, TPS, improved onboarding, enhanced toolchain.","TPS exclusively for SAP Cloud ERP Private Package customers.","Success Plan = 150+ tasks in Cloud ALM, set up in Prepare."], questions: u1l2Questions.t5 },
    "u1l2-t6": { visual: () => <div className="flex flex-col gap-3"><BenefitsGrid /><ToolsTable /></div>, keyPoints:["Four benefits: Predictability, Transparency, Access to info, SAP support","Signavio = Process Analysis. LeanIX = Enterprise Architecture.","TPS = transformation service. Embedded launch activities = onboarding."], jargon:[{term:"SAP Signavio",simple:"Suite of process analysis and management tools.",inSystem:"Maps current processes vs SAP best practice in Discover and Explore.",inExam:"Signavio = process analysis. Always paired with LeanIX.",color:"#0070F2"},{term:"SAP LeanIX",simple:"Enterprise architecture tool — maps the IT application landscape.",inSystem:"Maps all current systems and plans the target architecture.",inExam:"LeanIX = enterprise architecture. Signavio = processes. Do not mix these.",color:"#7C3AED"}], akshar:"Nirav tells the board: Predictability — quality gates show status. Transparency — Cloud ALM visible to all stakeholders. Info always available. Arjun from SAP is a call away.", exam:"4 benefits tested — often 3 correct from 5. Wrong options: enhanced employee engagement and improved marketing analytics.", mistake:"Mixing Signavio (process analysis) with LeanIX (enterprise architecture).", summary:["Four benefits: Predictability, Transparency, Access to info, SAP support.","Signavio for process analysis. LeanIX for enterprise architecture.","TPS = transformation service. Embedded launch = onboarding."], questions: u1l2Questions.t6 },
    "u1l3-t1": { visual: () => <BeforeAfter before={["850+ custom programs","Upgrade attempts: 18 months","3 failed upgrade projects","70% IT budget on maintenance","Cannot adopt SAP AI features"]} after={["Zero custom code inside S/4HANA","Quarterly updates in hours","Extensions on BTP — unaffected","30% IT budget on maintenance","Joule AI live from Day 1"]} />, keyPoints:["Clean Core = keep ERP standard, build custom needs on BTP","Does NOT mean zero customisation — means customisation outside the core","Quarterly cloud updates = impossible with dirty core"], jargon:[{term:"Clean Core",simple:"Keep S/4HANA close to SAP standard. All custom development goes outside on BTP.",inSystem:"Enables quarterly upgrades in hours instead of 18-month projects.",inExam:"Keeping the core close to standard version, avoiding heavy customisations.",color:"#0070F2"},{term:"SAP ECC",simple:"SAP previous-generation on-premise ERP — what most RISE customers migrate FROM.",inSystem:"Designed for heavy customisation — that is now the problem.",inExam:"ECC = starting point companies are moving away from via RISE.",color:"#DC2626"}], akshar:"Akshar 2015 upgrade: estimated 18 months to retest 850 programs. Shelved. 2019: same. Post-Clean Core: zero custom code inside core. Quarterly updates applied in one afternoon.", exam:"SAP definition: keeping the core close to standard version, avoiding heavy customisations that complicate updates.", mistake:"Clean Core means zero customisation. Wrong — it means customisations go OUTSIDE the core on BTP.", summary:["Keep S/4HANA standard. Custom needs go to BTP, not inside the core.","Quarterly updates in hours — impossible with dirty core.","Clean Core does not mean no customisation."], questions: u1l3Questions.t1 },
    "u1l3-t2": { visual: () => <DimensionWheel />, keyPoints:["Five dimensions: Processes, Extensions, Data, Integrations, Operations","Processes = sequences of actions in end-to-end flow","Integrations = mechanisms facilitating communication and data exchange"], jargon:[{term:"Processes",simple:"Sequences of actions arranged in an end-to-end flow.",inSystem:"SAP Signavio Process Navigator contains the standard SAP versions.",inExam:"Exact definition is testable: sequences of actions, end-to-end flow.",color:"#0070F2"},{term:"Integrations",simple:"Mechanisms facilitating communication and data exchange between solutions.",inSystem:"BTP Integration Suite keeps integrations clean.",inExam:"Exact definition is testable: communication and data exchange.",color:"#059669"},{term:"Extensions",simple:"Custom functionality added to SAP beyond what is available out of the box.",inSystem:"Clean extensions are built on BTP, not inside S/4HANA core.",inExam:"Extensions ADD capability. Integrations CONNECT systems.",color:"#7C3AED"}], akshar:"Akshar 5 dimensions: Processes = custom procure-to-pay moving to SAP standard. Extensions = vendor rating app moving to BTP. Data = 320,000 material records. Integrations = custom IDocs moving to BTP Integration Suite. Operations = reactive to proactive monitoring.", exam:"Processes and Integrations are most frequently tested. Know both exact definitions.", mistake:"Confusing Extensions with Integrations. Extensions add functionality. Integrations connect systems.", summary:["Five dimensions: Processes, Extensions, Data, Integrations, Operations.","Processes = end-to-end sequences. Integrations = communication between systems.","Extensions add functionality. Integrations connect systems."], questions: u1l3Questions.t2 },
    "u1l3-t3": { visual: () => <CleanStateVisual />, keyPoints:["Clean = best practices + right methodology + right tools throughout","Fresh S/4HANA Cloud with Signavio Process Navigator = clean from day one","Cleanliness must be actively maintained — not automatic after go-live"], jargon:[{term:"Signavio Process Navigator",simple:"SAP library of standard, best-practice business process templates.",inSystem:"Companies compare current processes to SAP standard and adopt them.",inExam:"Using Process Navigator = staying clean in the Processes dimension.",color:"#0070F2"},{term:"Cloud-Compliant Extensions",simple:"Custom developments built using BTP and standard SAP APIs.",inSystem:"Do not break when SAP upgrades the core because they sit outside it.",inExam:"Cloud-compliant extensions are part of the ideal Clean Core state.",color:"#059669"}], akshar:"Akshar go-live: clean — standard processes from Signavio Process Navigator, no custom code inside core. Two years later a junior developer modifies a standard SAP table directly — system starts getting dirty immediately.", exam:"Testable line: A newly provisioned SAP S/4HANA Cloud system using standard processes from Signavio Process Navigator is considered clean.", mistake:"Thinking a system stays clean automatically after go-live. Must be actively maintained.", summary:["Clean = best practices + right methodology + right tools.","Fresh S/4HANA Cloud + Signavio Process Navigator = clean from day one.","Ideal state: up-to-date software + cloud-compliant extensions + quality data + good processes."], questions: u1l3Questions.t3 },
    "u1l3-t4": { visual: () => <CharacteristicsGrid />, keyPoints:["Five characteristics: Minimalism, Modularity, Scalability, Maintainability, Stability and Reliability","Exam traps: Complexities and High dependency on customisations are what Clean Core AVOIDS","High performance and cost efficiency are outcomes — not characteristics"], jargon:[{term:"Minimalism",simple:"Remove redundant or obsolete functionalities. Only keep what adds value.",inSystem:"Deactivating old custom reports, removing replaced legacy integrations.",inExam:"Minimalism removes redundant or obsolete functionalities.",color:"#0070F2"},{term:"Modularity",simple:"ERP divided into independent pieces — update one without affecting others.",inSystem:"BTP extensions are modular — independent of the S/4HANA core.",inExam:"Modularity facilitates dividing the ERP into manageable modular components.",color:"#7C3AED"}], akshar:"Akshar old ECC: Not minimal (850 programs, many unused). Not modular (change one thing, break three others). Not scalable (Pune plant took 8 months to add). Not maintainable (only Rajesh knows the pricing code). Not reliable (2 critical incidents per month).", exam:"Multi-select: Minimalism + Scalability + Maintainability. Wrong options: Complexities + High dependency on customisations.", mistake:"Including High performance or Cost efficiency as characteristics. They are outcomes.", summary:["Five: Minimalism, Modularity, Scalability, Maintainability, Stability and Reliability.","Complexities and High dependency on customisations are always wrong options.","Tap each card to see what each characteristic means."], questions: u1l3Questions.t4 },
    "u1l3-t5": { visual: () => <BTPStack />, keyPoints:["BTP = where ALL custom extensions go in a Clean Core world","Two tracks: Low/No-code and Pro-code","SAP Discovery Center = official reference for all BTP capabilities"], jargon:[{term:"SAP Build Apps",simple:"Low-code/no-code tool for building mobile and web apps on BTP.",inSystem:"Business analyst can build apps without writing code.",inExam:"SAP Build Apps = low/no-code on BTP.",color:"#059669"},{term:"Business Application Studio",simple:"Professional development environment IDE for building custom apps on BTP.",inSystem:"Where pro-code developers write ABAP Cloud or JavaScript extensions.",inExam:"Pro-code on BTP = Business Application Studio or ABAP Cloud.",color:"#7C3AED"},{term:"Customer Centre of Expertise",simple:"Internal team overseeing SAP governance, upgrades, and strategic decisions.",inSystem:"Ensures IT communicates with business units, makes upgrade decisions proactively.",inExam:"Recommended for ongoing operations — part of the Operations dimension.",color:"#0891B2"}], akshar:"Akshar needs custom vendor rating. Old: ABAP inside S/4HANA = dirty core. New: developer builds on BTP using Business Application Studio. Core untouched. Quarterly update applied in one afternoon.", exam:"BTP = extension platform. SAP Discovery Center details BTP capabilities. Cloud ALM Operations apps = Enterprise Support, no additional cost.", mistake:"Thinking low-code on BTP is only for simple solutions. BTP low-code is enterprise-grade.", summary:["All custom extensions go to BTP — keeping S/4HANA core untouched.","Low/No-code: Build Apps + Process Automation. Pro-code: BAS + ABAP Cloud.","BTP details at SAP Discovery Center."], questions: u1l3Questions.t5 },
    "u1l3-t6": { visual: () => <div className="flex flex-col gap-3"><StatsRow stats={[{icon:"😰",to:70,suffix:"%",label:"IT budget on maintenance — dirty core",color:"#DC2626"},{icon:"✅",to:30,suffix:"%",label:"IT budget on maintenance — Clean Core",color:"#059669"},{icon:"🔄",to:4,suffix:"x/yr",label:"SAP Cloud update frequency",color:"#0070F2"},{icon:"⏱️",to:18,suffix:" mo",label:"Typical ECC upgrade timeline",color:"#D97706"}]} /><BeforeAfter before={["Old software limits access to new features","Heavy customisation complicates upgrades","IT firefighting — no time for innovation","Security patches delayed","SAP seen as a liability"]} after={["New features every quarter","Standardised processes enable fast upgrades","IT focuses on new capabilities","SAP manages core security","SAP = strategic asset"]} /></div>, keyPoints:["Old ERP: limited features, upgrade nightmares, IT firefighting","Clean Core: continuous innovation, efficient IT, improved security","Applies to both Public AND Private Edition customers"], jargon:[{term:"Continuous Innovation",simple:"Cloud model where SAP delivers new features quarterly — without major upgrade projects.",inSystem:"Only possible with a clean core. Dirty core cannot absorb quarterly updates.",inExam:"Clean Core enables continuous innovation — a core benefit.",color:"#059669"}], akshar:"Akshar board: Current = 70% IT budget on maintenance, 3 failed upgrades, no AI. Target = 30% maintenance, 40% freed for innovation, quarterly updates in hours, Joule AI live from Day 1.", exam:"Old ERP: old software limits access, customisation complicates upgrades. Clean Core: cloud software innovation, better data, efficient IT, security.", mistake:"Clean Core only applies to Public Cloud. Wrong — Private Edition customers equally follow Clean Core.", summary:["Old ERP = limited features, upgrade nightmares, IT firefighting.","Clean Core = continuous innovation, better data, efficient IT.","Applies to both Public AND Private Edition."], questions: u1l3Questions.t6 },
  };
}

// ─── LOW-FRICTION TOPIC SECTION ──────────────────────────────
function TopicSection({ topicId, topicNum, title, visual: v, onComplete, isComplete }: {
  topicId: string; topicNum: number; title: string; visual: TopicVisual; onComplete: () => void; isComplete: boolean;
}) {
  const [qOpen, setQOpen] = useState(false);
  const [digOpen, setDigOpen] = useState(false);

  return (
    <div id={topicId} className="mb-10">
      {/* Topic header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 transition-all ${isComplete ? "bg-[#059669] text-white" : "bg-[#EBF4FF] text-[#0070F2]"}`}>
          {isComplete ? "✓" : topicNum}
        </div>
        <h3 className="font-display text-[clamp(14px,2.5vw,18px)] font-black text-[#0F172A] leading-snug">{title}</h3>
      </div>

      {/* Visual — centre stage */}
      <div className="mb-4 w-full overflow-hidden">{v.visual()}</div>

      {/* 3 bullet takeaways — ultra brief */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 mb-3">
        {v.keyPoints.map((pt, i) => (
          <div key={i} className="flex items-start gap-2.5 mb-2 last:mb-0">
            <div className="w-5 h-5 rounded-md bg-[#EBF4FF] flex items-center justify-center text-[9px] font-black text-[#0070F2] flex-shrink-0 mt-0.5">→</div>
            <p className="text-sm text-[#334155] leading-relaxed">{pt}</p>
          </div>
        ))}
      </div>

      {/* Jargon flip cards */}
      {v.jargon.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] font-black text-[#6D28D9] uppercase tracking-[0.7px] mb-2">🟪 Key Terms — tap to flip</p>
          <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${Math.min(v.jargon.length, 3)}, 1fr)` }}>
            {v.jargon.map((j, i) => <FlipCard key={i} {...j} />)}
          </div>
        </div>
      )}

      {/* Dig deeper — collapsed by default */}
      <div className="mb-3 border border-[#E2E8F0] rounded-2xl overflow-hidden">
        <button onClick={() => setDigOpen(o => !o)}
          className="w-full px-4 py-3 flex items-center justify-between transition-colors"
          style={{ background: digOpen ? "#F8FAFC" : "transparent" }}>
          <div className="flex items-center gap-2">
            <span className="text-sm">📖</span>
            <span className="text-sm font-semibold text-[#475569]">Dig Deeper</span>
            <span className="text-xs text-[#94A3B8]">Example · Exam tip · Common mistake</span>
          </div>
          <span className="text-sm text-[#94A3B8] inline-block transition-transform duration-200"
            style={{ transform: digOpen ? "rotate(180deg)" : "none" }}>▾</span>
        </button>
        {digOpen && (
          <div className="px-4 pb-4 border-t border-[#E2E8F0] pt-4 flex flex-col gap-3">
            <div className="bg-gradient-to-br from-[#FFFBEA] to-[#FEF9EE] border border-[#FDE68A] rounded-xl p-3">
              <p className="text-[10px] font-black text-[#D97706] uppercase tracking-[0.6px] mb-1.5">🏭 Akshar Industries</p>
              <p className="text-xs text-[#78350F] leading-relaxed">{v.akshar}</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#FFFBEA] border border-[#FDE68A] rounded-xl p-3">
                <p className="text-[10px] font-black text-[#D97706] uppercase tracking-[0.6px] mb-1.5">🎯 Exam Insight</p>
                <p className="text-xs text-[#78350F] leading-relaxed">{v.exam}</p>
              </div>
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-3">
                <p className="text-[10px] font-black text-[#DC2626] uppercase tracking-[0.6px] mb-1.5">⚠️ Common Mistake</p>
                <p className="text-xs text-[#991B1B] leading-relaxed">{v.mistake}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0070F2] to-[#0057C2] rounded-xl p-4">
              <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.7px] mb-2">📦 30-Second Summary</p>
              {v.summary.map((s, i) => (
                <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
                  <span className="text-[10px] font-black text-white/60 flex-shrink-0 mt-0.5">{i+1}.</span>
                  <p className="text-xs text-white/90 leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Practice questions */}
      <div className="mb-4 border border-[#E2E8F0] rounded-2xl overflow-hidden">
        <button onClick={() => setQOpen(o => !o)}
          className="w-full px-4 py-3 flex items-center justify-between transition-colors"
          style={{ background: qOpen ? "#EBF4FF" : "#F8FAFC" }}>
          <div className="flex items-center gap-2">
            <span className="text-sm">📝</span>
            <span className="text-sm font-bold text-[#0F172A]">Test Yourself</span>
            <span className="text-xs text-[#94A3B8]">{v.questions.length} questions</span>
          </div>
          <span className="text-sm text-[#64748B] inline-block transition-transform duration-200"
            style={{ transform: qOpen ? "rotate(180deg)" : "none" }}>▾</span>
        </button>
        {qOpen && (
          <div className="p-4 border-t border-[#E2E8F0]">
            {v.questions.map((q, i) => <PracticeQuestion key={i} question={q} qNum={i+1} />)}
          </div>
        )}
      </div>

      {/* Got it → Next topic button */}
      {!isComplete && (
        <button onClick={onComplete}
          className="w-full py-3 rounded-2xl font-bold text-sm transition-all border-2 border-[#0070F2] text-[#0070F2] hover:bg-[#0070F2] hover:text-white">
          ✓ Got it — Next topic
        </button>
      )}
      {isComplete && (
        <div className="w-full py-3 rounded-2xl text-center text-sm font-bold text-[#059669] bg-[#EDFAF1] border-2 border-[#6EE7B7]">
          ✅ Topic complete
        </div>
      )}
    </div>
  );
}

// ─── LESSON VIEW ─────────────────────────────────────────────
function LessonView({ lessonId, courseId }: { lessonId: string; courseId: string }) {
  const meta = LESSON_META[lessonId];
  const visuals = useMemo(() => getVisuals(), []);
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  const markTopic = (tid: string) => {
    setCompletedTopics(p => ({ ...p, [tid]: true }));
    // auto scroll to next topic
    const idx = meta?.topics.indexOf(tid) ?? -1;
    if (idx >= 0 && idx < (meta?.topics.length ?? 0) - 1) {
      const nextId = meta!.topics[idx + 1];
      setTimeout(() => {
        document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  if (!meta) return (
    <div className="bg-gradient-to-br from-[#EBF4FF] to-[#F0F7FF] border border-[#BFDBFE] rounded-[20px] p-12 text-center">
      <div className="text-5xl mb-5">📖</div>
      <h3 className="font-display text-xl font-black text-[#1E3A5F] mb-3">Full Content — Coming Soon</h3>
      <p className="text-sm text-[#3B5E8C] max-w-md mx-auto">This lesson is being built with visual diagrams, interactive elements, and Akshar Industries examples.</p>
    </div>
  );

  return (
    <div>
      {/* Lesson intro */}
      <div className="bg-gradient-to-br from-[#EBF4FF] to-[#F0F7FF] border border-[#BFDBFE] rounded-2xl p-4 mb-6">
        <p className="text-sm text-[#1E3A5F] leading-relaxed">💡 {meta.intro}</p>
      </div>

      {/* Topic quick nav */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 mb-8">
        <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.7px] mb-2">Topics</p>
        <div className="flex flex-col gap-1">
          {meta.topicTitles.map((t, i) => (
            <a key={i} href={`#${meta.topics[i]}`}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors">
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-all ${completedTopics[meta.topics[i]] ? "bg-[#059669] text-white" : "bg-[#EBF4FF] text-[#0070F2]"}`}>
                {completedTopics[meta.topics[i]] ? "✓" : i+1}
              </span>
              <span className="text-sm text-[#334155] font-medium">{t}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Topics */}
      {meta.topics.map((tid, i) => {
        const visual = visuals[tid];
        if (!visual) return null;
        return (
          <TopicSection
            key={tid}
            topicId={tid}
            topicNum={i+1}
            title={meta.topicTitles[i]}
            visual={visual}
            isComplete={!!completedTopics[tid]}
            onComplete={() => markTopic(tid)}
          />
        );
      })}
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────
function Sidebar({ course, allLessons, activeId, onSelect, onSupport }: {
  course: typeof COURSE_REGISTRY[string]; allLessons: LessonWithUnit[];
  activeId: string; onSelect: (id: string) => void; onSupport: () => void;
}) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  useEffect(() => { setDone(getCourseProgress(course.id)); }, [course.id]);
  const total = allLessons.length;
  const doneN = Object.values(done).filter(Boolean).length;
  const prog  = total > 0 ? Math.round((doneN/total)*100) : 0;
  const toggle = (id: string) => {
    const next = !done[id];
    setDone(p => ({ ...p, [id]: next }));
    setLessonDone(course.id, id, next);
  };
  const filteredUnits = search.trim()
    ? course.units.map(u => ({ ...u, lessons: u.lessons.filter(l => l.title.toLowerCase().includes(search.toLowerCase())) })).filter(u => u.lessons.length > 0)
    : course.units;
  return (
    <aside className="flex flex-col bg-white border-r border-[#E2E8F0] h-full overflow-hidden">
      <div className="p-4 border-b border-[#E2E8F0] flex-shrink-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-bold text-[#475569] uppercase tracking-[0.5px]">Progress</span>
          <span className="text-sm font-black text-[#0070F2]">{prog}%</span>
        </div>
        <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#0070F2] to-[#38BDF8] rounded-full transition-all duration-500" style={{ width: `${prog}%` }} />
        </div>
        <p className="text-[11px] text-[#94A3B8] mt-1.5">{doneN} of {total} lessons done</p>
      </div>
      <div className="px-3.5 py-3 border-b border-[#E2E8F0] flex-shrink-0">
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">🔍</span>
          <input type="text" placeholder="Search lessons…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#334155] outline-none focus:border-[#0070F2] transition-colors" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2.5">
        {filteredUnits.map(unit => (
          <div key={unit.id} className="mb-1">
            <div className="px-4 py-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: unit.color }} />
              <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.7px]">{unit.title}</span>
            </div>
            {unit.lessons.map(lesson => {
              const isA = activeId === lesson.id;
              const isDone = !!done[lesson.id];
              return (
                <button key={lesson.id} onClick={() => onSelect(lesson.id)}
                  className="w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 border-none transition-all border-l-[3px]"
                  style={{ background: isA ? "#EBF4FF" : "transparent", borderLeftColor: isA ? "#0070F2" : "transparent", borderLeftStyle: "solid" }}>
                  <div onClick={e => { e.stopPropagation(); toggle(lesson.id); }}
                    className="w-[17px] h-[17px] rounded flex-shrink-0 flex items-center justify-center transition-all mt-0.5 cursor-pointer"
                    style={{ background: isDone ? "#0070F2" : "transparent", border: isDone ? "none" : "1.5px solid #CBD5E1" }}>
                    {isDone && <span className="text-white text-[9px] font-black">✓</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug break-words" style={{ fontWeight: isA ? 700 : 500, color: isA ? "#0057C2" : "#334155" }}>{lesson.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-[#94A3B8]">~{lesson.time} min</span>
                      {lesson.hasContent && <span className="text-[9px] bg-[#EDFAF1] text-[#065F46] px-1.5 py-px rounded font-bold">LIVE</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="p-3.5 border-t border-[#E2E8F0] bg-[#FFF8F0] flex-shrink-0">
        <button onClick={onSupport}
          className="w-full bg-transparent border border-[#FDE68A] rounded-xl py-2.5 text-xs font-bold text-[#92400E] flex items-center justify-center gap-2 hover:bg-[#FEF3C7] transition-colors">
          ☕ Support the Creator
        </button>
      </div>
    </aside>
  );
}

// ─── MAIN COURSE PAGE ─────────────────────────────────────────
export default function CoursePage({ params: paramsPromise }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(paramsPromise);
  const course = COURSE_REGISTRY[courseId];
  const [activeId, setActiveId] = useState("");
  const [sideOpen, setSideOpen] = useState(true);
  const [modal, setModal] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const allLessons: LessonWithUnit[] = useMemo(() => {
    if (!course) return [];
    return course.units.flatMap(u => u.lessons.map(l => ({ ...l, unitId: u.id, unitTitle: u.title, unitColor: u.color })));
  }, [course]);

  useEffect(() => { if (allLessons.length > 0 && !activeId) setActiveId(allLessons[0].id); }, [allLessons, activeId]);
  useEffect(() => { if (mainRef.current) mainRef.current.scrollTop = 0; }, [activeId]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      const i = allLessons.findIndex(l => l.id === activeId);
      if (e.key === "ArrowRight" && i < allLessons.length-1) setActiveId(allLessons[i+1].id);
      if (e.key === "ArrowLeft" && i > 0) setActiveId(allLessons[i-1].id);
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
  const prev = ai > 0 ? allLessons[ai-1] : null;
  const next = ai < allLessons.length-1 ? allLessons[ai+1] : null;
  const trunc = (s: string, n: number) => s.length > n ? s.slice(0,n)+"…" : s;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#0B1829] border-b border-white/[0.07] sticky top-0 z-50">
        <div className="px-5 h-[58px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex-shrink-0 text-[#E2E8F0] border border-white/15 bg-white/[0.08] hover:bg-white/[0.16] text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">← Back</Link>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-[34px] h-[34px] flex-shrink-0 bg-gradient-to-br from-[#0070F2] to-[#0057C2] rounded-[9px] flex items-center justify-center text-[17px]">📘</div>
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-[#F1F5F9] font-display tracking-tight leading-none">SAPedia</p>
                <p className="text-[10px] text-[#475569] mt-0.5 truncate">{course.title}</p>
              </div>
            </div>
          </div>
          <button onClick={() => setModal(true)} className="flex-shrink-0 flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-[#E2E8F0] text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
            <span>☕</span><span className="hidden sm:inline">Support Creator</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 58px)" }}>
        {/* Sidebar */}
        <div className="flex-shrink-0 transition-all duration-300 overflow-hidden" style={{ width: sideOpen ? 272 : 0, minWidth: sideOpen ? 272 : 0 }}>
          <div className="w-[272px] h-full">
            <Sidebar course={course} allLessons={allLessons} activeId={activeId} onSelect={setActiveId} onSupport={() => setModal(true)} />
          </div>
        </div>

        {/* Main panel */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Toolbar */}
          <div className="h-[50px] px-5 flex-shrink-0 bg-white border-b border-[#E2E8F0] flex items-center gap-3">
            <button onClick={() => setSideOpen(o => !o)} className="flex-shrink-0 bg-transparent hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-sm text-[#64748B] transition-colors">
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
            <span className="text-xs text-[#94A3B8] flex-shrink-0">{ai+1}/{allLessons.length}</span>
          </div>

          {/* Content */}
          <div ref={mainRef} className="flex-1 overflow-y-auto">
            <div className="max-w-[820px] mx-auto px-[clamp(20px,4vw,36px)] py-[clamp(24px,4vw,40px)]">
              {al && (
                <div>
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.4px]" style={{ background: `${al.unitColor}18`, color: al.unitColor }}>{al.unitTitle}</span>
                      <span className="text-xs text-[#94A3B8]">⏱ ~{al.time} min</span>
                      {al.hasContent && <span className="text-[11px] bg-[#EDFAF1] text-[#065F46] px-2 py-0.5 rounded-md font-bold">✅ Live</span>}
                    </div>
                    <h1 className="font-display text-[clamp(20px,3.5vw,28px)] font-black text-[#0F172A] leading-snug">{al.title}</h1>
                    <div className="w-10 h-[3px] rounded-full mt-2" style={{ background: `linear-gradient(90deg,${al.unitColor},${al.unitColor}60)` }} />
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
              style={{ background: prev?"#fff":"#F8FAFC", borderColor: prev?"#E2E8F0":"transparent", color: prev?"#334155":"#CBD5E1", cursor: prev?"pointer":"default" }}>
              ← {prev ? trunc(prev.title, 22) : "Previous"}
            </button>
            <span className="text-xs text-[#94A3B8] flex-shrink-0">{ai+1} / {allLessons.length}</span>
            <button onClick={() => next && setActiveId(next.id)} disabled={!next}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold border-0"
              style={{ background: next?"#0070F2":"#F8FAFC", color: next?"#fff":"#CBD5E1", cursor: next?"pointer":"default" }}>
              {next ? trunc(next.title, 22) : "Next"} →
            </button>
          </div>
        </div>
      </div>

      {modal && <DonationModal onClose={() => setModal(false)} trigger="sidebar" />}
    </div>
  );
}
