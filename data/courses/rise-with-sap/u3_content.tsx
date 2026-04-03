import React from "react";
import { 
  StatsRow, EcosystemDiagram,  
  Triangle, PhaseTimeline 
} from "@/components/visuals/index";
import CleanStateVisual from "@/components/visuals/CleanStateVisual";

// ─── UNIT 3 LESSON 1 CONTENT ─────────────────────────────

export const u3l1Content = {
  intro: "The RISE with SAP Methodology Dashboard — your real-time command center for monitoring Clean Core adherence and system health.",
  topics: [
    {
      id: "u3l1-t1",
      title: "The Clean Core Dashboard",
      visual: () => (
        <div className="p-6 bg-slate-900 rounded-[32px] text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/30">📊</div>
              <p className="font-display font-black text-lg">System Overview</p>
            </div>
            <div className="px-3 py-1 bg-emerald-500 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-wider">Clean Core: 94%</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Product Version</p>
              <p className="text-sm font-black text-emerald-400">Up to Date</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Active Collectors</p>
              <p className="text-sm font-black text-blue-400">All Systems</p>
            </div>
          </div>
        </div>
      ),
      insight: "The RISE with SAP Methodology Dashboard (also known as the Clean Core Dashboard) is the 'go-to' place for customers to view their adherence to Clean Core principles. It's not a separate website — it is accessed directly through **SAP Cloud ALM**.\n\nAt Akshar Industries, Nirav Shah (IT Head) checks this dashboard once a week. It gives him an immediate, data-driven view of whether their processes, extensions, and integrations are actually 'Clean' or if technical debt is starting to creep in.",
      question: {
        q: "Where is the RISE with SAP Methodology Dashboard accessed?",
        options: ["Through a public URL", "Inside the SAP Support Portal", "Through SAP Cloud ALM", "Via the SAP Ariba network"],
        correct: 2,
        why: "The dashboard is integrated into and accessed through SAP Cloud ALM."
      }
    },
    {
      id: "u3l1-t2",
      title: "Access, Analyze, Manage",
      visual: () => (
        <div className="flex items-center justify-center p-4">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full flex items-center justify-center">
              <p className="mt-auto mb-2 text-[10px] font-black text-slate-300">ACCESS</p>
            </div>
            <div className="relative w-32 h-32 border-4 border-blue-200 rounded-full flex items-center justify-center bg-blue-50/30">
              <p className="mt-auto mb-2 text-[10px] font-black text-blue-300">ANALYZE</p>
            </div>
            <div className="relative w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
              <p className="text-[10px] font-black text-white">MANAGE</p>
            </div>
          </div>
        </div>
      ),
      insight: "The dashboard provides three hierarchical capabilities. First, you **Access** a high-level overview. Then, you **Analyze** specific insights (like why a health score dropped). Finally, you **Manage** extensibility by identifying specific code deviations that could break future upgrades.\n\nPriya Desai (PM) at Akshar uses the 'Manage' view to look at their ABAP extensions. If the dashboard flags a customization as 'unclean', she can assign a task to the developers to fix it before it becomes a problem during the next quarterly update.",
      question: {
        q: "Which capability of the dashboard helps identify deviations from SAP's recommendations for system extensibility?",
        options: ["Access", "Analyze", "Manage", "Archive"],
        correct: 2,
        why: "The 'Manage' capability is specifically for identifying deviations and preparing for future upgrades."
      }
    },
    {
      id: "u3l1-t3",
      title: "The Operations View",
      visual: () => <StatsRow stats={[
        { icon: "❤️", to: 99.2, suffix: "%", label: "System Health", color: "#EF4444" },
        { icon: "⚡", to: 95, suffix: "%", label: "Performance", color: "#F59E0B" },
        { icon: "🔄", to: 30, suffix: "d", label: "History", color: "#3B82F6" },
      ]} />,
      insight: "While the 'System View' focuses on Clean Core adherence, the **Operations View** delivers daily insights into the technical health of your productive systems. It tracks KPIs like performance, connectivity, and background processing exceptions.\n\nThe dashboard provides 30 days of historical data, allowing the team at Akshar Industries to see if a system slowdown was a one-time event or a growing trend that needs attention from the Basis team.",
      question: {
        q: "How many days of historical data does the Operations View dashboard provide?",
        options: ["7 days", "14 days", "30 days", "365 days"],
        correct: 2,
        why: "The dashboard offers daily insights and includes up to 30 days of historical data."
      }
    },
    {
      id: "u3l1-t4",
      title: "Monitoring All Systems",
      visual: () => <EcosystemDiagram />,
      insight: "The dashboard doesn't just look at the Production system. It includes insights for all S/4HANA systems: Development, Test, and Production. This is critical for the 'Clean Core' philosophy.\n\nAkshar Industries' policy is that no code can move from the Test system to Production if it has a 'Dirty' flag on the dashboard. By catching non-compliant code early in the Development system, they ensure their Production environment remains agile and ready for innovation.",
      question: {
        q: "Why does the dashboard include insights for Development and Test systems?",
        options: ["To increase the license cost", "To identify non-compliant code before it reaches Production", "To allow developers to play games", "It only includes Production systems"],
        correct: 1,
        why: "Insights across all systems help identify non-compliant code early and prevent it from moving into production."
      }
    },
    {
      id: "u3l1-t5",
      title: "Standardized Benchmarks",
      visual: () => <CleanStateVisual />,
      insight: "A key feature of the RISE Methodology Dashboard is that its metrics, thresholds, and evaluation algorithms are **shared across all RISE with SAP customers**. This ensures a consistent, homogeneous calculation of compliance.\n\nWhen Akshar Industries sees a health score of 95%, they know it's based on the same rigorous SAP standards as every other global enterprise. This standardized benchmark gives the leadership team confidence that their transformation is truly meeting industry best practices.",
      question: {
        q: "Why are the metrics and evaluation algorithms shared across all RISE with SAP customers?",
        options: ["To make the dashboard look more complex", "To ensure consistent compliance calculation across all customers", "To share private customer data", "To reduce the amount of available data"],
        correct: 1,
        why: "Shared metrics and algorithms ensure a homogeneous and consistent compliance calculation for everyone."
      }
    }
  ]
};
