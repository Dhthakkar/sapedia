import React from "react";
import { 
  ComponentPillars, PhaseTimeline, StatsRow, 
  Triangle, BeforeAfter, BTPStack
} from "@/components/visuals/index";
import ToolsTable from "@/components/visuals/ToolsTable";
import CleanStateVisual from "@/components/visuals/CleanStateVisual";

// ─── CUSTOM VISUALS FOR UNIT 2 ───────────────────────────

const OnboardingCalls = () => {
  const calls = [
    { num: 1, title: "Get Started", desc: "Overview of entitlements (Private Package) and system provisioning.", icon: "🚀" },
    { num: 2, title: "Methodology", desc: "Clean Core principles & setting up the Success Plan in Cloud ALM.", icon: "📚" },
    { num: 3, title: "Complete QG", desc: "Assistance in completing Quality Gate 1 assessment questions.", icon: "📝" },
    { num: 4, title: "Review QG", desc: "Deep dive into the report and recommendations with SAP experts.", icon: "📊" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {calls.map((c) => (
        <div key={c.num} className="bg-white border-2 border-slate-100 rounded-2xl p-4 hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">#{c.num}</span>
            <span className="text-xl">{c.icon}</span>
          </div>
          <p className="text-sm font-black text-slate-900 mb-1">{c.title}</p>
          <p className="text-[11px] leading-relaxed text-slate-500">{c.desc}</p>
        </div>
      ))}
    </div>
  );
};

// ─── UNIT 2 LESSON 1 CONTENT ─────────────────────────────

export const u2l1Content = {
  intro: "The Standardized Framework — how RISE with SAP augments SAP Activate to ensure a clean, predictable transformation.",
  topics: [
    {
      id: "u2l1-t1",
      title: "The Standardized Framework",
      visual: () => <ComponentPillars />,
      insight: "The Standardized Framework is one of the three core pillars of the RISE with SAP Methodology. Its primary job is to augment the existing SAP Activate roadmap by adding specific activities focused on gathering information before the project starts.\n\nAt Akshar Industries, Nirav Shah (IT Head) appreciates this because it adds a layer of predictability. Instead of jumping straight into implementation, the framework forces a 'pre-flight check' to ensure everyone understands the Clean Core strategy from day one.\n\nExam Tip: The framework doesn't replace SAP Activate — it 'augments' or 'enhances' it with additional pre-implementation tasks.",
      question: {
        q: "What is the primary role of the Standardized Framework in the RISE with SAP Methodology?",
        options: ["To replace the SAP Activate roadmap", "To provide legal templates for SAP contracts", "To augment the SAP Activate roadmap with pre-implementation activities", "To manage hardware procurement for on-premise servers"],
        correct: 2,
        why: "The framework specifically augments the SAP Activate roadmap with activities focused on gathering key information before implementation starts."
      }
    },
    {
      id: "u2l1-t2",
      title: "Discover Phase: The DDA",
      visual: () => <PhaseTimeline />,
      insight: "In the Discover phase, the hero tool is the Digital Discovery Assessment (DDA). This toolkit captures the customer's current IT architecture, business processes, and operations to define the project's scope.\n\nFor Akshar Industries, this was the moment Priya Desai (Project Manager) could finally see the full extent of their legacy ECC customizations. The DDA creates a 'Value & Architecture Artifacts Handover' which implementation teams use to ensure no data is lost between the sales cycle and the start of the project.\n\nNote: The DDA is considered a 'Required' deliverable in the handover process.",
      question: {
        q: "Which deliverable is used during the Discover phase to capture vital information and guide the project journey?",
        options: ["Business Strategy Map", "Digital Discovery Assessment (DDA)", "Product Map", "Bill of Materials"],
        correct: 1,
        why: "The DDA is the essential toolkit used in the Discover phase to capture customer requirements and landscape info."
      }
    },
    {
      id: "u2l1-t3",
      title: "Prepare Phase: 4 Onboarding Calls",
      visual: () => <OnboardingCalls />,
      insight: "The Prepare phase is where the SAP Onboarding Advisor enters the scene. They conduct exactly four personalized sessions with the customer and partner team. These aren't just status updates — they are working sessions to provision systems and set up the methodology.\n\nAkshar Industries' team attended all four. Call #2 was particularly critical, as it introduced them to the Clean Core principles and showed them how to set up their Success Plan in SAP Cloud ALM.\n\nExam Trap: These sessions happen in the Prepare phase, not Discover or Explore.",
      question: {
        q: "In which phase does the SAP Onboarding Advisor conduct the four personalized onboarding sessions?",
        options: ["Discover", "Prepare", "Explore", "Realize"],
        correct: 1,
        why: "The onboarding advisor's four calls are a cornerstone of the Prepare phase activities."
      }
    },
    {
      id: "u2l1-t4",
      title: "The Clean Core Success Plan",
      visual: () => <StatsRow stats={[
        { icon: "📋", to: 150, suffix: "+", label: "Clean Core Tasks", color: "#0070F2" },
        { icon: "🛠️", to: 1, suffix: "", label: "Centralized Runbook", color: "#7C3AED" },
        { icon: "☁️", to: 1, suffix: "", label: "Cloud ALM Project", color: "#059669" },
      ]} />,
      insight: "In the Prepare phase, the team sets up the Clean Core Success Plan in SAP Cloud ALM. This is a pre-loaded list of over 150 recommended tasks that guide the project through every phase. These tasks are centralized in a 'Clean Core Runbook'.\n\nPriya Desai at Akshar uses this runbook to assign tasks to her team. It ensures that 'Clean Core' isn't just a buzzword, but a set of 150+ actionable steps that the team must check off as they build the new system.",
      question: {
        q: "How many recommended clean core tasks are typically pre-loaded into the SAP Cloud ALM Success Plan?",
        options: ["50+", "100+", "150+", "500+"],
        correct: 2,
        why: "The methodology provides over 150 pre-loaded clean core tasks in SAP Cloud ALM to guide the project."
      }
    },
    {
      id: "u2l1-t5",
      title: "Quality Gates & Feedback Reports",
      visual: () => <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📑</div>
        <p className="text-sm font-black text-slate-900 mb-2">The Quality Gate Feedback Loop</p>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span>Questionnaire</span>
          <span>→</span>
          <span className="text-blue-600">Enterprise Support</span>
          <span>→</span>
          <span className="text-emerald-600">Feedback Report</span>
        </div>
      </div>,
      insight: "From the Explore phase all the way to Run, the project manager uses Clean Core Quality Gates. These are checkpoints managed in SAP Cloud ALM. Once a questionnaire is submitted, SAP's Enterprise Support team analyzes the data and provides a 'Feedback Report'.\n\nThis report isn't just for the Project Manager. It is reviewed with a RISE with SAP Enterprise Architect (EA) to verify that Akshar Industries' system is truly 'clean' and ready for future upgrades.\n\nKey detail: The feedback includes both questionnaire responses and system data analysis.",
      question: {
        q: "Who analyzes the Quality Gate questionnaire and provides the Feedback Report?",
        options: ["The customer's internal IT team", "The implementation partner's developer", "SAP Enterprise Support team", "A third-party auditing firm"],
        correct: 2,
        why: "SAP's Enterprise Support team analyzes the submissions and provides the formal feedback report."
      }
    }
  ]
};

// ─── UNIT 2 LESSON 2 CONTENT ─────────────────────────────

export const u2l2Content = {
  intro: "The Transformation Preparation Service (TPS) — bridging the gap between your initial vision and the actual execution.",
  topics: [
    {
      id: "u2l2-t1",
      title: "TPS: The Bridge",
      visual: () => <BeforeAfter 
        before={["Presales Vision", "Sales promises and high-level slides", "Signed contract and license entitlements"]} 
        after={["Post-sales Execution", "Actionable roadmap and configured tools", "Measurable outcomes and maximized ROI"]} 
      />,
      insight: "The Transformation Preparation Service (TPS) exists for one reason: to bridge the gap between vision and execution. It's an immersive experience during the Prepare phase, led by SAP experts, designed to ensure that the promises made during the sales cycle are translated into a working system.\n\nAt Akshar Industries, Nirav Shah (IT Head) used TPS to verify that their legacy ECC processes could actually map to S/4HANA Private Edition before the first line of code was even written.\n\nNote: TPS is about 'maximizing transformation investments' and ensuring 'faster time-to-value'.",
      question: {
        q: "What is the primary aim of the Transformation Preparation Service (TPS)?",
        options: ["To provide discounted hardware for the data centre", "To bridge the gap between presales vision and post-sales execution", "To replace the customer's entire IT department", "To manage the customer's social media presence"],
        correct: 1,
        why: "TPS specifically aims to bridge the gap between the initial vision and the final execution of the transformation."
      }
    },
    {
      id: "u2l2-t2",
      title: "The 3-Day Intensive Workshop",
      visual: () => {
        const days = [
          { d: 1, t: "Architecture & BTM", desc: "Setting the clean core baseline and overall architecture." },
          { d: 2, t: "Best Practices & AI", desc: "Tailored walkthrough of processes and identifying AI use cases." },
          { d: 3, t: "Governance Strategy", desc: "Aligning transformation with long-term goals and transition approach." }
        ];
        return (
          <div className="flex flex-col gap-2">
            {days.map(day => (
              <div key={day.d} className="flex items-center gap-4 p-3 bg-white border-2 border-slate-100 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-black flex-shrink-0">D{day.d}</div>
                <div>
                  <p className="text-xs font-black text-slate-900">{day.t}</p>
                  <p className="text-[10px] text-slate-500">{day.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );
      },
      insight: "TPS isn't a long-drawn-out consulting project. It is centered around a high-impact, three-day intensive workshop. Day 1 sets the baseline. Day 2 finds the 'Value' through Best Practices and AI use cases. Day 3 locks down the 'Governance' to keep the system clean.\n\nPriya Desai, the PM at Akshar, brought her core technical team to these workshops. By the end of Day 3, they didn't just have slides — they had a 'transition approach' for moving from their legacy ECC Suite to the modern S/4HANA state.",
      question: {
        q: "Which day of the TPS workshop focuses on identifying AI use cases for innovation?",
        options: ["Day 1", "Day 2", "Day 3", "It happens in a separate wrap-up session"],
        correct: 1,
        why: "Day 2 is dedicated to best practices and identifying AI use cases for innovation."
      }
    },
    {
      id: "u2l2-t3",
      title: "Three Key Components",
      visual: () => <div className="grid grid-cols-3 gap-2">
        {[
          { t: "Discovery Insights", icon: "🔍", desc: "Value mapping & architecture blueprints." },
          { t: "Guided Setup", icon: "⚙️", desc: "Activation of cloud entitlements." },
          { t: "Value Delivery", icon: "🚀", desc: "Knowledge transfer & use cases." }
        ].map((c, i) => (
          <div key={i} className="p-3 bg-purple-50 border border-purple-100 rounded-2xl text-center">
            <span className="text-xl block mb-1">{c.icon}</span>
            <p className="text-[10px] font-black text-purple-900 leading-tight mb-1">{c.t}</p>
            <p className="text-[8px] text-purple-700 leading-tight">{c.desc}</p>
          </div>
        ))}
      </div>,
      insight: "TPS delivers value through three components. Discovery-Based Insights establish the timeline. Guided Setup Services ensure you actually get the cloud tools you paid for. Accelerated Value Delivery uses prebuilt examples to show results fast.\n\nAkshar Industries found 'Guided Setup' the most valuable, as it helped them integrate Signavio and LeanIX with their new S/4HANA system right away, rather than waiting months for a manual setup.",
      question: {
        q: "Which TPS component involves working with SAP specialists for seamless access to cloud service entitlements?",
        options: ["Discovery-Based Insights", "Guided Setup Services", "Accelerated Value Delivery", "Market Analysis Simulations"],
        correct: 1,
        why: "Guided Setup Services provide work with SAP specialists for seamless access to entitlements and toolchain integration."
      }
    },
    {
      id: "u2l2-t4",
      title: "Governance & The SSB",
      visual: () => <div className="p-5 bg-emerald-50 border-2 border-emerald-100 rounded-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-xl shadow-lg shadow-emerald-200">⚖️</div>
          <div>
            <p className="text-sm font-black text-emerald-900">Solution Standardization Board</p>
            <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">(SSB)</p>
          </div>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed">Critical for sustaining transformation success and minimizing risks by enforcing Fit-to-Standard and Clean Core principles.</p>
      </div>,
      insight: "Governance is the 'boring but vital' part of TPS. The service enhances governance practices through the Solution Standardization Board (SSB). The SSB is the 'gatekeeper' — it ensures that when a business unit asks for a customization, it is evaluated against Clean Core principles.\n\nNirav Shah at Akshar Industries used the SSB to reject 40% of the custom requests that were 'just for convenience', keeping the core standard and easy to upgrade.",
      question: {
        q: "What is the role of the Solution Standardization Board (SSB) in the context of TPS?",
        options: ["To manage employee payroll", "To provide marketing templates", "To enhance governance and sustain transformation success", "To replace the project manager"],
        correct: 2,
        why: "The SSB is critical for enhancing governance practices and sustaining transformation success."
      }
    },
    {
      id: "u2l2-t5",
      title: "Who gets TPS?",
      visual: () => <StatsRow stats={[
        { icon: "🛡️", to: 1, suffix: "", label: "Private Package Customers", color: "#7C3AED" },
        { icon: "🌍", to: 0, suffix: "", label: "General Public Cloud", color: "#94A3B8" },
      ]} />,
      insight: "This is a frequent exam point. While many services are for all RISE customers, the Transformation Preparation Service (TPS) is specifically crafted for **SAP Cloud ERP Private Package** customers. \n\nAkshar Industries, as a large enterprise moving from ECC to S/4HANA Private Edition, qualified for this service. Smaller customers going straight to Public Cloud (GROW with SAP) do not typically receive this specific immersive TPS workshop.\n\nExam Note: If a question asks who the TPS is available to, look for 'Private Package' or 'Business Suite' users depending on the wording.",
      question: {
        q: "To which group of customers is the TPS specifically available?",
        options: ["New SAP customers using GROW with SAP", "SAP Cloud ERP Private Package customers only", "Small businesses with fewer than 50 employees", "Customers who only use SAP Ariba"],
        correct: 1,
        why: "TPS is specifically for SAP Cloud ERP Private Package customers. This is a common exam trap."
      }
    }
  ]
};

// ─── UNIT 2 LESSON 3 CONTENT ─────────────────────────────

export const u2l3Content = {
  intro: "The Integrated Toolchain — the digital backbone that manages your transformation from discovery to ongoing operations.",
  topics: [
    {
      id: "u2l3-t1",
      title: "The Integrated Toolchain",
      visual: () => <StatsRow stats={[
        { icon: "📈", to: 75, suffix: "%", label: "Incremental Business Value", color: "#0070F2" },
        { icon: "🛡️", to: 1, suffix: "", label: "Lower failure rate", color: "#7C3AED" },
        { icon: "🤝", to: 1, suffix: "", label: "Seamless Collaboration", color: "#059669" },
      ]} />,
      insight: "Adopting a Clean Core isn't just a philosophy; it's a data-driven success story. Customers using the integrated toolchain experience up to 75% more business value. The toolchain ensures that business and IT are always in sync, from the first discovery session to the final go-live.\n\nAt Akshar Industries, Nirav Shah (IT Head) insists that every decision is backed by the toolchain. If a process isn't in Signavio, it doesn't exist. If a system isn't in LeanIX, it's not supported.",
      question: {
        q: "What is a major benefit of using the Integrated Toolchain in a RISE with SAP project?",
        options: ["Eliminating the need for any IT staff", "Increasing the likelihood of project cancellation", "Experiencing up to 75% incremental business value", "Replacing all SAP licenses with free versions"],
        correct: 2,
        why: "Studies show customers using the integrated toolchain experience up to 75% incremental business value."
      }
    },
    {
      id: "u2l3-t2",
      title: "Mapping with LeanIX & Signavio",
      visual: () => <ToolsTable />,
      insight: "The journey begins with transparency. SAP LeanIX is used to analyze the current 'As-Is' architecture — finding every system and integration. SAP Signavio then evaluates the actual business processes, finding improvements through 'Process Insights'.\n\nPriya Desai (PM) at Akshar discovered through LeanIX that they were paying for three different CRM tools across their subsidiaries. By using Signavio to standardize the sales process, they could consolidate into one, saving thousands in license costs before even moving to the cloud.",
      question: {
        q: "Which tool is primarily used to analyze the customer's existing landscape architecture and identify current systems?",
        options: ["SAP Signavio", "SAP LeanIX", "SAP Cloud ALM", "Tricentis"],
        correct: 1,
        why: "SAP LeanIX is fundamental for analyzing the existing landscape architecture and providing transparency into the IT landscape."
      }
    },
    {
      id: "u2l3-t3",
      title: "Building on SAP BTP",
      visual: () => <BTPStack />,
      insight: "When Akshar Industries needs a custom feature that S/4HANA doesn't provide, they don't modify the core. They use SAP Business Technology Platform (BTP). Whether it's low-code for business users or pro-code for ABAP developers, BTP keeps the ERP core clean.\n\nThis is the secret to 1-day upgrades. Because the custom logic lives on BTP, SAP can update the S/4HANA core in the background without breaking Akshar's custom apps.",
      question: {
        q: "Where is the recommended place to build and host custom extensions in a Clean Core strategy?",
        options: ["Inside the S/4HANA core", "On a legacy on-premise server", "SAP Business Technology Platform (BTP)", "In the project manager's local machine"],
        correct: 2,
        why: "SAP BTP is the recommended platform for building and hosting extensions to keep the core ERP system clean."
      }
    },
    {
      id: "u2l3-t4",
      title: "Testing & User Enablement",
      visual: () => <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white border-2 border-slate-100 rounded-2xl">
          <p className="text-xs font-black text-slate-900 mb-2">🧪 Testing</p>
          <p className="text-[10px] text-slate-600 mb-2">Tricentis Test Automation handles manual and automated testing of business processes.</p>
          <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">Tricentis</span>
        </div>
        <div className="p-4 bg-white border-2 border-slate-100 rounded-2xl">
          <p className="text-xs font-black text-slate-900 mb-2">🎓 Learning</p>
          <p className="text-[10px] text-slate-600 mb-2">SAP Enable Now creates guided simulations for step-by-step process learning.</p>
          <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold uppercase">Enable Now</span>
        </div>
      </div>,
      insight: "Testing isn't just a phase; it's a continuous activity. Tricentis Test Automation (integrated with Cloud ALM) ensures everything works. Then, SAP Enable Now ensures the humans know how to use it through guided simulations.\n\nAt Akshar, the warehouse team didn't just read a manual. They used 'Enable Now' simulations to practice 'Goods Receipt' in a safe, simulated environment before the system went live.",
      question: {
        q: "Which tool facilitates the creation of guided simulations for step-by-step process learning?",
        options: ["SAP LeanIX", "SAP Enable Now", "SAP BTP", "SAP Signavio"],
        correct: 1,
        why: "SAP Enable Now facilitates the creation of guided simulations, allowing employees to learn business processes in a simulated environment."
      }
    },
    {
      id: "u2l3-t5",
      title: "Cloud ALM: The Digital Backbone",
      visual: () => <div className="p-5 bg-slate-900 rounded-[32px] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
        <p className="text-[11px] font-black uppercase tracking-widest text-blue-400 mb-1">Central Nerve Center</p>
        <p className="text-lg font-display font-black mb-3">SAP Cloud ALM</p>
        <div className="space-y-2">
          {["Task Management", "Project Reporting", "Clean Core Success Plan", "Operations Monitoring"].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
              <span className="text-blue-400 font-bold">✓</span> {t}
            </div>
          ))}
        </div>
      </div>,
      insight: "SAP Cloud ALM is the glue that holds the entire project together. It manages the 150+ tasks, tracks progress, and ensures the Clean Core strategy is followed. After go-live, it shifts into 'Operations' mode to monitor the system.\n\nPriya Desai (PM) starts every morning by checking the Cloud ALM dashboard. It's the only place that gives her a real-time view of whether Akshar Industries is on track for their transformation milestones.",
      question: {
        q: "Which tool serves as the digital backbone for project execution, task management, and project reporting?",
        options: ["SAP Signavio", "SAP LeanIX", "SAP Cloud ALM", "SAP Build"],
        correct: 2,
        why: "SAP Cloud ALM serves as the digital backbone for project execution, task management, reporting, and maintaining the Clean Core Success Plan."
      }
    }
  ]
};

// ─── UNIT 2 LESSON 4 CONTENT ─────────────────────────────

export const u2l4Content = {
  intro: "Joule for RISE with SAP — your AI-powered co-pilot that makes the methodology conversational, actionable, and available 24/7.",
  topics: [
    {
      id: "u2l4-t1",
      title: "Joule: The AI Co-pilot",
      visual: () => (
        <div className="p-6 bg-gradient-to-br from-purple-600 to-blue-700 rounded-[32px] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full -mr-10 -mt-10" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shadow-inner">✨</div>
            <div>
              <p className="text-xs font-black uppercase tracking-[2px] text-purple-200">Generative AI</p>
              <p className="text-xl font-display font-black">Joule for RISE</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
              <p className="text-[11px] text-purple-100 italic">"Hello Anton, I see you are in the Prepare phase. Would you like to set up your Clean Core Success Plan?"</p>
            </div>
            <button className="w-full py-3 bg-white text-blue-700 rounded-xl font-black text-xs shadow-lg">
              Talk to me naturally
            </button>
          </div>
        </div>
      ),
      insight: "Joule is SAP's generative AI assistant, but in the context of RISE, it's a specialized co-pilot. It transforms the dry documentation of the methodology into a conversational experience. Instead of searching through PDF guides, you simply talk to Joule to get context-aware expertise.\n\nAt Akshar Industries, Nirav Shah (IT Head) uses Joule to quickly explain complex Clean Core concepts to his business stakeholders using plain-English summaries generated by the AI.\n\nKey Concept: Joule uses Generative AI to make the RISE methodology 'actionable and automated'.",
      question: {
        q: "What type of technology powers the Joule assistant for the RISE with SAP Methodology?",
        options: ["Traditional hard-coded chatbots", "Generative AI and Large Language Models (LLM)", "Manual human support behind a chat window", "Legacy mainframe processing"],
        correct: 1,
        why: "Joule harnesses the capabilities of generative AI and LLMs to provide a conversational and intuitive experience."
      }
    },
    {
      id: "u2l4-t2",
      title: "Integration with Cloud ALM",
      visual: () => <CleanStateVisual />,
      insight: "Joule isn't a standalone website; it's deeply integrated into SAP Cloud ALM. It knows your project's heartbeat. It can discern exactly which phase you are in (e.g., Prepare or Explore) and offer recommendations for completed, ongoing, and upcoming activities.\n\nPriya Desai (PM) at Akshar loves this integration because she doesn't have to 'tell' Joule what's happening. Joule already knows. It acts as a guided conversational layer over the 150+ tasks in their Success Plan, helping the team stay on track without getting lost in the details.",
      question: {
        q: "How does Joule's integration with SAP Cloud ALM benefit the project team?",
        options: ["It replaces the need for Cloud ALM entirely", "It provides a hardware monitoring service", "It discerns project phases and offers relevant activity recommendations", "It manages the company's social media accounts"],
        correct: 2,
        why: "Joule integrates with Cloud ALM to discern project phases and offer tailored recommendations for activities."
      }
    },
    {
      id: "u2l4-t3",
      title: "24/7 Expert Guidance",
      visual: () => <StatsRow stats={[
        { icon: "⏰", to: 24, suffix: "/7", label: "Availability", color: "#7C3AED" },
        { icon: "🧠", to: 100, suffix: "%", label: "Deterministic Support", color: "#0070F2" },
        { icon: "⚡", to: 1, suffix: "s", label: "Instant Response", color: "#059669" },
      ]} />,
      insight: "In a global project like Akshar's, work doesn't stop when the sun goes down. Joule provides 24/7 expert guidance, acting as a primary support system. Whether it's a question about SAP Signavio, LeanIX, or specific Clean Core dimensions, Joule has the answer instantly.\n\nThis reduces the time consultants spend searching for information, allowing them to focus on actual transformation work. It ensures that 'Best Practices' are followed at 2 AM just as strictly as they are at 10 AM.",
      question: {
        q: "What is a primary benefit of Joule's 24/7 expert guidance?",
        options: ["It reduces time spent searching for information", "It provides discounted SAP licenses", "It replaces the need for any human partners", "It guarantees a 100% project success rate regardless of effort"],
        correct: 0,
        why: "Joule provides instant, project-specific information, significantly reducing the time spent searching for info."
      }
    },
    {
      id: "u2l4-t4",
      title: "Personalized for Every Role",
      visual: () => <Triangle />,
      insight: "Joule isn't one-size-fits-all. It understands 'Personas'. If you're an **Enterprise Architect**, Joule talks about landscape blueprints and LeanIX. If you're an **Onboarding Advisor**, it focuses on the 4 calls and system provisioning. If you're a **Customer Success Manager**, it highlights value realization.\n\nAt Akshar Industries, this means Nirav (the IT Head) gets high-level strategic advice, while the technical leads get deep-dive task automation suggestions. Everyone receives the information that is pertinent to their specific role in the transformation.",
      question: {
        q: "Which stakeholders receive tailored, personalized information from Joule?",
        options: ["Only the end-users", "Only the external auditors", "Onboarding Advisors, Enterprise Architects, and Customer Success Managers", "Only the marketing department"],
        correct: 2,
        why: "Joule provides personalized support for various personas, including Onboarding Advisors, Enterprise Architects, and CSMs."
      }
    },
    {
      id: "u2l4-t5",
      title: "Governance & Quality Gates",
      visual: () => (
        <div className="p-5 bg-blue-50 border-2 border-blue-100 rounded-2xl">
          <p className="text-[11px] font-black text-blue-600 uppercase mb-3">Joule Governance Check</p>
          <div className="flex flex-col gap-2">
            {[
              "Completeness checks for QG questionnaires",
              "Task prioritization suggestions",
              "Smart notifications for missed deadlines",
              "Governance & compliance via SAP AI Core"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-blue-900 font-medium">
                <span className="text-blue-500">◈</span> {text}
              </div>
            ))}
          </div>
        </div>
      ),
      insight: "Governance is where Joule truly shines. It introduces 'Smart Notifications' and 'Completeness Checks' for Quality Gate questionnaires. Before you submit a phase for review, Joule can tell you if you've missed a critical piece of evidence or a mandatory task.\n\nFor Akshar Industries, this means fewer rejections during the Quality Gate review process. Joule manages task prioritization, ensuring the team works on the 'Big Rocks' first, improving the overall quality and compliance of the project.",
      question: {
        q: "How does Joule assist with the Quality Gate questionnaire process?",
        options: ["By answering all the questions automatically without human input", "By providing completeness checks and insightful analysis", "By deleting the questionnaire if it is too difficult", "By sending the questionnaire to the customer's social media"],
        correct: 1,
        why: "Joule introduces smart notifications and completeness checks for quality gate questionnaires to ensure quality and compliance."
      }
    }
  ]
};

// ─── UNIT 2 LESSON 5 CONTENT ─────────────────────────────

export const u2l5Content = {
  intro: "Expert Guidance — how the SAP ecosystem collaborates to ensure your transformation is powered by verified expertise and elite partners.",
  topics: [
    {
      id: "u2l5-t1",
      title: "Three-Way Collaboration",
      visual: () => <Triangle />,
      insight: "Success in RISE with SAP isn't a solo achievement. It hinges on a 'Golden Triangle' of collaboration: the Customer Project Team, the Qualified Implementation Partner, and the SAP Experts.\n\nAt Akshar Industries, Priya Desai (PM) manages the internal team, while Raj (from the partner) handles the technical build. They meet regularly with the SAP Onboarding Advisor to review Quality Gate reports and ensure every custom extension follows Clean Core principles.\n\nNote: SAP experts provide strategic advice, but the execution is a team effort.",
      question: {
        q: "Which three groups must collaborate robustly to achieve implementation project goals?",
        options: ["Marketing, Sales, and HR", "Customer project team, Implementation partners, and SAP experts", "Only the customer's internal IT team", "A third-party auditing firm and the legal department"],
        correct: 1,
        why: "Success requires collaboration among the customer team, qualified partners, and SAP expert guidance."
      }
    },
    {
      id: "u2l5-t2",
      title: "The Competency Framework",
      visual: () => (
        <div className="flex gap-2">
          {[
            { level: "Essential", color: "bg-slate-400", desc: "The Baseline" },
            { level: "Advanced", color: "bg-blue-500", desc: "Proven Skills" },
            { level: "Expert", color: "bg-purple-600", desc: "Top Tier" }
          ].map((t, i) => (
            <div key={i} className="flex-1 p-3 bg-white border-2 border-slate-100 rounded-2xl text-center">
              <div className={`w-8 h-8 ${t.color} rounded-lg mx-auto mb-2`} />
              <p className="text-[10px] font-black text-slate-900">{t.level}</p>
              <p className="text-[8px] text-slate-500 uppercase font-bold">{t.desc}</p>
            </div>
          ))}
        </div>
      ),
      insight: "Not all SAP partners are created equal. The SAP Competency Framework categorizes partners into three tiers: Essential, Advanced, and Expert. Essential is the mandatory baseline for any partner wishing to guide a customer on their RISE journey.\n\nNirav Shah at Akshar Industries insisted on a partner with an 'Advanced' or 'Expert' rating to ensure they had enough certified consultants and project managers who had actually finished RISE projects before.\n\nExam Tip: 'Essential' is the recognition baseline.",
      question: {
        q: "What is the baseline competency level required for a partner to be recognized as a qualified RISE implementation partner?",
        options: ["Advanced", "Expert", "Essential", "Beginner"],
        correct: 2,
        why: "Achieving the Essential level is the baseline to be recognized as a qualified implementation partner."
      }
    },
    {
      id: "u2l5-t3",
      title: "Validated Partners: The Elite",
      visual: () => <StatsRow stats={[
        { icon: "🏆", to: 5, suffix: "+", label: "Projects completed", color: "#7C3AED" },
        { icon: "💰", to: 550, prefix: "€", suffix: "k", label: "Min. Project Value", color: "#0070F2" },
        { icon: "✅", to: 80, suffix: "%", label: "QG Pass Rate", color: "#059669" },
      ]} />,
      insight: "RISE with SAP Validated Partners are the elite tier. To qualify, they must meet strict criteria: complete at least 5 RISE projects with an Annual Contract Value (ACV) over €550,000 in the last 24 months. Crucially, they must maintain an 80% Quality Gate acceptance rate.\n\nAkshar Industries chose a Validated Partner because they needed a track record of success with large-scale enterprise transformations. This elite status guarantees the partner knows exactly how to apply the RISE Methodology to keep systems clean.",
      question: {
        q: "What is the minimum Clean Core Quality Gate acceptance rate a partner must maintain to qualify for Expert status?",
        options: ["50%", "70%", "80%", "95%"],
        correct: 2,
        why: "Expert status requires maintaining over 80% Clean Core Quality Gates with an 'Accepted' or 'Conditionally Accepted' status."
      }
    },
    {
      id: "u2l5-t4",
      title: "100% Certification Target",
      visual: () => (
        <div className="p-5 bg-amber-50 border-2 border-amber-100 rounded-[32px] text-center">
          <div className="inline-block px-4 py-1 bg-amber-600 text-white rounded-full text-[10px] font-black uppercase mb-3">Target: July 2025</div>
          <p className="text-xl font-display font-black text-amber-900 mb-1">100% Certified</p>
          <p className="text-xs text-amber-700">All developers, PMs, Architects, and Process Consultants must hold valid SAP certifications.</p>
        </div>
      ),
      insight: "SAP has updated its framework to ensure high standards. By July 2025, 100% of 'project-level professionals' must be certified. This includes everyone from the developers writing ABAP Cloud code to the Enterprise Architects designing the landscape.\n\nFor Akshar Industries, this provides peace of mind. They know that every single person working on their transformation has passed the latest SAP exams and is up-to-date with the RISE Methodology and Integrated Toolchain.",
      question: {
        q: "By what date must partners achieve a 100% certification rate for project-level professionals?",
        options: ["December 2024", "January 2025", "July 2025", "January 2026"],
        correct: 2,
        why: "By July 2025, partners must achieve a 100% certification rate for all project-level professionals."
      }
    },
    {
      id: "u2l5-t5",
      title: "Complementary Support",
      visual: () => (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg">
            <p className="text-[10px] font-black uppercase mb-1">SAP Preferred</p>
            <p className="text-sm font-black mb-2">Success</p>
            <p className="text-[10px] text-blue-100 leading-tight">Proactive guidance and adoption support.</p>
          </div>
          <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-lg">
            <p className="text-[10px] font-black uppercase mb-1">SAP Max</p>
            <p className="text-sm font-black mb-2">Attention</p>
            <p className="text-[10px] text-slate-400 leading-tight">High-touch strategic advice for complex landscapes.</p>
          </div>
        </div>
      ),
      insight: "While the standard RISE package includes expert guidance, larger organizations often need more. SAP offers complementary services like Preferred Success and MaxAttention.\n\nAkshar Industries opted for 'Preferred Success' to ensure they had a dedicated point of contact at SAP who could proactively monitor their project health and provide adoption guidance during their transition from the legacy ECC Suite to S/4HANA Private Cloud.",
      question: {
        q: "Which additional SAP service offerings are available to complement customer transformation projects?",
        options: ["SAP Basic Support only", "SAP Preferred Success and SAP MaxAttention", "Only third-party insurance services", "Public social media forums"],
        correct: 1,
        why: "Additional offerings like SAP Preferred Success and SAP MaxAttention are available to complement transformation projects."
      }
    }
  ]
};
