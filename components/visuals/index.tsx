"use client";
import { useState } from "react";
import Counter from "@/components/ui/Counter";

// ─── Stats Row ───────────────────────────────────────────
interface Stat { icon: string; to: number; suffix?: string; prefix?: string; label: string; color: string; }
export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-2.5 mb-1" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
      {stats.map((s, i) => (
        <div key={i} className="rounded-2xl p-3.5 text-center border-2"
          style={{ background: `${s.color}10`, borderColor: `${s.color}30` }}>
          <p className="text-[11px] mb-1">{s.icon}</p>
          <p className="text-[22px] leading-none mb-1" style={{ color: s.color }}>
            <Counter to={s.to} suffix={s.suffix} prefix={s.prefix} />
          </p>
          <p className="text-[10px] text-[#64748B] font-semibold leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── SAP Ecosystem Diagram ───────────────────────────────
const ecosystemItems = [
  { id: "erp",  label: "Cloud ERP",          sub: "S/4HANA",           color: "#0070F2", r: 52,  desc: "Core operations — Finance, Procurement, Manufacturing, Sales. The heart of the Suite." },
  { id: "btp",  label: "SAP BTP",            sub: "Build & Integrate", color: "#7C3AED", r: 96,  desc: "Build custom apps & integrations on top of ERP. The extension platform." },
  { id: "data", label: "Business Data Cloud",sub: "Analytics & Data",  color: "#0891B2", r: 136, desc: "Data management, analytics, and BI across the entire Suite." },
  { id: "ai",   label: "Business AI",        sub: "Intelligence",      color: "#059669", r: 176, desc: "AI capabilities embedded across all products — from Joule to predictive analytics." },
  { id: "lob",  label: "LoB Solutions",      sub: "HR, CX, Spend…",   color: "#D97706", r: 216, desc: "SuccessFactors (HR), CX, Ariba (Spend) — specialised apps per business function." },
];

export function EcosystemDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = ecosystemItems.find((i) => i.id === active);
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-[220px] h-[220px] flex-shrink-0">
        {[...ecosystemItems].reverse().map((it) => (
          <div key={it.id} onClick={() => setActive((a) => a === it.id ? null : it.id)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-300"
            style={{ width: it.r * 2, height: it.r * 2, border: `2px solid ${it.color}${active === it.id ? "" : "40"}`, background: `${it.color}${active === it.id ? "18" : "08"}` }} />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
          <p className="text-[11px] font-black text-[#0070F2]">Cloud ERP</p>
          <p className="text-[9px] text-[#64748B]">S/4HANA</p>
        </div>
        {ecosystemItems.filter((i) => i.id !== "erp").map((it, idx) => {
          const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2;
          const mid = it.r - 20;
          const x = 110 + mid * Math.cos(angle);
          const y = 110 + mid * Math.sin(angle);
          return (
            <div key={it.id} style={{ position: "absolute", left: x - 28, top: y - 12, width: 56, pointerEvents: "none", textAlign: "center" }}>
              <p style={{ fontSize: 8, fontWeight: 700, color: it.color, lineHeight: 1.2 }}>{it.label}</p>
            </div>
          );
        })}
      </div>
      <div className="w-full min-h-[64px]">
        {activeItem ? (
          <div className="animate-scale-in rounded-xl p-3 border-2" style={{ background: `${activeItem.color}12`, borderColor: `${activeItem.color}30` }}>
            <p className="text-sm font-black mb-1" style={{ color: activeItem.color }}>{activeItem.label} — {activeItem.sub}</p>
            <p className="text-sm text-[#334155] leading-relaxed">{activeItem.desc}</p>
          </div>
        ) : (
          <p className="text-xs text-[#94A3B8] text-center pt-2">Tap a ring to explore each layer →</p>
        )}
      </div>
    </div>
  );
}

// ─── Triangle (People/Process/Tools) ─────────────────────
const triangleNodes = [
  { id: "people",  label: "People",    icon: "👥", color: "#0070F2", desc: "SAP Onboarding Advisors, Enterprise Architects, certified partners, customer project team.", x: 50, y: 5 },
  { id: "process", label: "Processes", icon: "⚙️", color: "#7C3AED", desc: "End-to-end business flows redesigned using SAP best practices — procure-to-pay, order-to-cash, hire-to-retire.", x: 5, y: 80 },
  { id: "tools",   label: "Tools",     icon: "🔧", color: "#059669", desc: "Signavio, LeanIX, Cloud ALM, BTP — provide transparency, digital project management, collaboration.", x: 90, y: 80 },
];

export function Triangle() {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = triangleNodes.find((n) => n.id === active);
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full" style={{ paddingBottom: "70%", minHeight: 180 }}>
        <svg viewBox="0 0 100 90" className="absolute inset-0 w-full h-full">
          <polygon points="50,8 8,82 92,82" fill="none" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4,3" />
          {active && <polygon points="50,8 8,82 92,82" fill={`${activeNode?.color}08`} stroke={activeNode?.color} strokeWidth="1" />}
        </svg>
        {triangleNodes.map((n) => (
          <button key={n.id} onClick={() => setActive((a) => a === n.id ? null : n.id)}
            className="absolute rounded-full flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-300 border-[3px] z-10"
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", width: 64, height: 64, background: active === n.id ? n.color : "#fff", borderColor: n.color, boxShadow: active === n.id ? `0 8px 24px ${n.color}40` : "0 2px 8px rgba(0,0,0,.07)" }}>
            <span className="text-[18px]">{n.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-[.4px]" style={{ color: active === n.id ? "#fff" : n.color }}>{n.label}</span>
          </button>
        ))}
      </div>
      {activeNode ? (
        <div className="animate-scale-in rounded-xl p-3.5 border-2" style={{ background: `${activeNode.color}10`, borderColor: `${activeNode.color}25` }}>
          <p className="text-sm font-black mb-1.5" style={{ color: activeNode.color }}>{activeNode.icon} {activeNode.label}</p>
          <p className="text-sm text-[#334155] leading-[1.65]">{activeNode.desc}</p>
        </div>
      ) : <p className="text-xs text-[#94A3B8] text-center">Tap each corner to explore →</p>}
    </div>
  );
}

// ─── Phase Timeline ───────────────────────────────────────
const phases = [
  { label: "Discover", icon: "🔍", color: "#0070F2", tag: "DDA",    desc: "Digital Discovery Assessment captures the customer's current landscape and transformation goals. Led by Onboarding team + Customer Success Manager.", key: "Digital Discovery Assessment (DDA)", hasQG: false },
  { label: "Prepare",  icon: "📋", color: "#7C3AED", tag: "4 Calls",desc: "SAP Onboarding Advisor runs 4 personalised sessions. Clean Core Success Plan set up in Cloud ALM with 150+ tasks. System provisioned via SAP for Me.", key: "4 Onboarding Calls + Success Plan Setup", hasQG: false },
  { label: "Explore",  icon: "🗺️", color: "#0891B2", tag: "QG-1",  desc: "Business processes mapped using SAP Signavio. Gaps vs SAP best practice identified. First Clean Core Quality Gate completed.", key: "Process Mapping + Quality Gate 1", hasQG: true },
  { label: "Realize",  icon: "🔨", color: "#059669", tag: "QG-2",  desc: "Configure S/4HANA. Build extensions on BTP. Migrate data. Run Tricentis automated testing. Quality Gate 2.", key: "Build + Configure + Test", hasQG: true },
  { label: "Deploy",   icon: "🚀", color: "#D97706", tag: "Go-Live",desc: "System goes live. End users trained via SAP Enable Now. Final Quality Gate completed.", key: "Go-Live + End-User Training", hasQG: true },
  { label: "Run",      icon: "📊", color: "#DC2626", tag: "Ops",   desc: "Post-go-live monitoring via Cloud ALM Operations Dashboard. Continuous improvement cycles.", key: "Monitoring + Continuous Improvement", hasQG: true },
];

export function PhaseTimeline() {
  const [active, setActive] = useState(0);
  const p = phases[active];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex overflow-x-auto pb-1">
        {phases.map((ph, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="flex-1 min-w-[64px] py-2.5 px-1.5 flex flex-col items-center gap-1 transition-all duration-200 border-y-2 border-r-0 first:border-l-2 last:border-r-2"
            style={{ background: active === i ? ph.color : "#fff", borderColor: active === i ? ph.color : `${ph.color}30`, borderRadius: i === 0 ? "12px 0 0 12px" : i === phases.length - 1 ? "0 12px 12px 0" : 0 }}>
            <span className="text-[18px]">{ph.icon}</span>
            <span className="text-[9px] font-black uppercase" style={{ color: active === i ? "#fff" : ph.color }}>{ph.label}</span>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: active === i ? "rgba(255,255,255,.25)" : "#F1F5F9", color: active === i ? "#fff" : "#64748B" }}>{ph.tag}</span>
          </button>
        ))}
      </div>
      {p && (
        <div className="animate-scale-in rounded-2xl p-4 border-2" style={{ background: `${p.color}10`, borderColor: `${p.color}30` }}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-2xl">{p.icon}</span>
            <div>
              <p className="text-[15px] font-black" style={{ color: p.color }}>{p.label} Phase</p>
              <p className="text-[11px] text-[#64748B] font-semibold">Key activity: {p.key}</p>
            </div>
          </div>
          <p className="text-sm text-[#334155] leading-[1.7]">{p.desc}</p>
          {p.hasQG && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5">
              <span className="text-[10px]">✅</span>
              <span className="text-[11px] font-bold text-[#334155]">Clean Core Quality Gate applies here</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Dimension Wheel ──────────────────────────────────────
const dims = [
  { id: "processes",    label: "Processes",    icon: "🔄", color: "#0070F2", def: "Sequences of actions arranged in an end-to-end flow", note: "Procure-to-pay, Order-to-cash, Hire-to-retire" },
  { id: "extensions",  label: "Extensions",   icon: "🔌", color: "#7C3AED", def: "Extra functionalities added beyond standard SAP features", note: "Custom approval workflows, custom pricing rules" },
  { id: "data",        label: "Data",          icon: "🗄️", color: "#0891B2", def: "Configuration settings, master data & transactional data", note: "Materials, Customers, Vendors, Purchase Orders" },
  { id: "integrations",label: "Integrations", icon: "🔗", color: "#059669", def: "Mechanisms facilitating communication & data exchange between solutions", note: "SAP ↔ 3PL, SAP ↔ CRM, SAP ↔ Bank" },
  { id: "operations",  label: "Operations",   icon: "📡", color: "#D97706", def: "Ongoing governance & monitoring to ensure smooth functioning", note: "Cloud ALM monitoring, proactive issue detection" },
];

export function DimensionWheel() {
  const [active, setActive] = useState<string | null>(null);
  const activeD = dims.find((d) => d.id === active);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2.5">
        {dims.map((d) => (
          <button key={d.id} onClick={() => setActive((a) => a === d.id ? null : d.id)}
            className="flex items-center gap-2.5 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200"
            style={{ background: active === d.id ? d.color : "#fff", borderColor: active === d.id ? d.color : `${d.color}30`, gridColumn: d.id === "operations" ? "span 2" : undefined, justifyContent: d.id === "operations" ? "center" : undefined, boxShadow: active === d.id ? `0 8px 24px ${d.color}30` : "0 2px 8px rgba(0,0,0,.07)" }}>
            <span className="text-[22px]">{d.icon}</span>
            <span className="text-sm font-black" style={{ color: active === d.id ? "#fff" : d.color }}>{d.label}</span>
          </button>
        ))}
      </div>
      {activeD ? (
        <div className="animate-scale-in rounded-2xl p-4 border-2" style={{ background: `${activeD.color}10`, borderColor: `${activeD.color}30` }}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-2xl">{activeD.icon}</span>
            <p className="text-[15px] font-black" style={{ color: activeD.color }}>{activeD.label}</p>
          </div>
          <p className="text-sm font-semibold text-[#0F172A] italic mb-1.5">&quot;{activeD.def}&quot;</p>
          <p className="text-xs text-[#64748B]">Examples: {activeD.note}</p>
        </div>
      ) : <p className="text-xs text-[#94A3B8] text-center">Tap a dimension to see its definition →</p>}
    </div>
  );
}

// ─── Characteristics Grid ─────────────────────────────────
const chars = [
  { label: "Minimalism",          icon: "✂️", color: "#0070F2", desc: "Removes redundant & obsolete functionalities. Only keep what adds real business value." },
  { label: "Modularity",          icon: "🧩", color: "#7C3AED", desc: "ERP divided into independent components. Update one without breaking others." },
  { label: "Scalability",         icon: "📈", color: "#0891B2", desc: "Grows with your business without compromising performance or stability." },
  { label: "Maintainability",     icon: "🔧", color: "#059669", desc: "Simplified codebase any SAP developer can understand — not just the one who wrote it 10 years ago." },
  { label: "Stability & Reliability", icon: "🛡️", color: "#D97706", desc: "Fewer dependencies = fewer failure points = fewer critical incidents per month." },
];

export function CharacteristicsGrid() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {chars.map((c, i) => (
        <button key={i} onClick={() => setActive((a) => a === i ? null : i)}
          className="p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center gap-2 text-center"
          style={{ background: active === i ? c.color : "#fff", borderColor: active === i ? c.color : `${c.color}30`, boxShadow: active === i ? `0 8px 24px ${c.color}35` : "0 2px 8px rgba(0,0,0,.07)" }}>
          <span className="text-3xl">{c.icon}</span>
          <span className="text-xs font-black leading-snug" style={{ color: active === i ? "#fff" : c.color }}>{c.label}</span>
          {active === i && <p className="text-[11px] text-white/90 leading-snug mt-1">{c.desc}</p>}
        </button>
      ))}
    </div>
  );
}

// ─── BTP Stack ───────────────────────────────────────────
const btpLayers = [
  { label: "SAP S/4HANA Core",                          color: "#E8F4FD", bdr: "#BFDBFE", txt: "#1D4ED8", icon: "🏛️", note: "Standard — untouched, upgrades in hours", badge: "CLEAN CORE" },
  { label: "SAP BTP",                                    color: "#F3F0FF", bdr: "#C4B5FD", txt: "#6D28D9", icon: "☁️", note: "Extension & integration platform", badge: null },
  { label: "Low-code: Build Apps + Process Automation",  color: "#EDF9F0", bdr: "#6EE7B7", txt: "#065F46", icon: "🖱️", note: "No-code drag & drop for business users", badge: null },
  { label: "Pro-code: BAS + ABAP Cloud + Build Code",    color: "#FEF9EE", bdr: "#FDE68A", txt: "#78350F", icon: "💻", note: "Professional developer tools", badge: null },
  { label: "Integration Suite + Connectivity",           color: "#FEF2F2", bdr: "#FECACA", txt: "#991B1B", icon: "🔗", note: "Clean integrations — no custom point-to-point", badge: null },
];

export function BTPStack() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-1.5">
      {btpLayers.map((l, i) => (
        <div key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
          className="px-4 py-3 rounded-xl border-[1.5px] transition-all duration-200 flex items-center gap-2.5 cursor-default"
          style={{ background: l.color, borderColor: hover === i ? l.txt : l.bdr }}>
          <span className="text-[18px] flex-shrink-0">{l.icon}</span>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{ color: l.txt }}>{l.label}</p>
            {hover === i && <p className="text-[11px] text-[#64748B] mt-0.5">{l.note}</p>}
          </div>
          {l.badge && (
            <span className="text-[10px] bg-[#0070F2] text-white px-2 py-0.5 rounded-full font-bold flex-shrink-0">{l.badge}</span>
          )}
        </div>
      ))}
      <p className="text-[11px] text-[#94A3B8] text-center pt-1">Hover each layer to learn its role</p>
    </div>
  );
}

// ─── Before / After ───────────────────────────────────────
interface BeforeAfterProps { before: string[]; after: string[]; }
export function BeforeAfter({ before, after }: BeforeAfterProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-[#FEF2F2] border-2 border-[#FECACA] rounded-2xl p-4">
        <p className="text-[11px] font-black text-[#DC2626] uppercase tracking-[.6px] mb-3">❌ Before (SAP ECC)</p>
        {before.map((b, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <span className="text-[#DC2626] text-xs flex-shrink-0 mt-0.5">✗</span>
            <p className="text-xs text-[#991B1B] leading-snug">{b}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#EDFAF1] border-2 border-[#6EE7B7] rounded-2xl p-4">
        <p className="text-[11px] font-black text-[#059669] uppercase tracking-[.6px] mb-3">✅ After (Clean Core)</p>
        {after.map((a, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <span className="text-[#059669] text-xs flex-shrink-0 mt-0.5">✓</span>
            <p className="text-xs text-[#065F46] leading-snug">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RISE vs GROW ─────────────────────────────────────────
const riseGrowData = [
  { id: "rise", title: "RISE with SAP", icon: "🔄", color: "#0070F2", badge: "Existing SAP Customers", points: ["Running SAP ECC or S/4HANA on-premise", "Migrating to cloud — complex journey", "Includes Transformation Preparation Service", "SAP Cloud ERP Private Package offering", "Structured methodology for smooth migration"] },
  { id: "grow", title: "GROW with SAP", icon: "🌱", color: "#059669", badge: "New SAP Customers",      points: ["No prior SAP system", "Go straight to S/4HANA Public Cloud", "Adopt best practices from Day 1", "Faster & simpler implementation", "No legacy baggage to manage"] },
];

export function RISEvsGROW() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-2 gap-3">
      {riseGrowData.map((c) => (
        <button key={c.id} onClick={() => setActive((a) => a === c.id ? null : c.id)}
          className="rounded-2xl p-4 border-[2.5px] cursor-pointer text-left transition-all duration-200"
          style={{ background: active === c.id ? `${c.color}12` : "#fff", borderColor: active === c.id ? c.color : `${c.color}30`, boxShadow: active === c.id ? `0 8px 32px ${c.color}25` : "0 2px 8px rgba(0,0,0,.07)" }}>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: c.color }}>{c.icon}</div>
            <div>
              <p className="text-sm font-black text-[#0F172A]">{c.title}</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: `${c.color}18`, color: c.color }}>{c.badge}</span>
            </div>
          </div>
          {c.points.map((pt, i) => (
            <div key={i} className="flex items-start gap-1.5 mb-1.5">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: `${c.color}20` }}>
                <span className="text-[8px] font-black" style={{ color: c.color }}>✓</span>
              </div>
              <p className="text-[11px] text-[#334155] leading-snug">{pt}</p>
            </div>
          ))}
        </button>
      ))}
    </div>
  );
}

// ─── Pathways ─────────────────────────────────────────────
const pathways = [
  { id: "public",   icon: "☁️",  title: "Full Public Cloud", color: "#0891B2", where: "Entire company on S/4HANA Public Edition", eg: "Akshar's new Pune plant" },
  { id: "hybrid",   icon: "⚡",  title: "Hybrid Model",      color: "#7C3AED", where: "HQ → Private + Subsidiaries → Public",   eg: "Akshar HQ (Private) + Pune (Public)" },
  { id: "twotier",  icon: "🏗️", title: "Two-Tier",          color: "#059669", where: "Both Private & Public running together",  eg: "Parent (Private) + subsidiaries (Public)" },
];

export function PathwaysViz() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {pathways.map((p) => (
        <button key={p.id} onClick={() => setActive((a) => a === p.id ? null : p.id)}
          className="p-3.5 rounded-2xl border-2 cursor-pointer text-left transition-all duration-200"
          style={{ background: active === p.id ? p.color : "#fff", borderColor: active === p.id ? p.color : `${p.color}30`, boxShadow: active === p.id ? `0 8px 28px ${p.color}35` : "0 2px 8px rgba(0,0,0,.07)" }}>
          <span className="text-[28px] block mb-2.5">{p.icon}</span>
          <p className="text-xs font-black leading-snug mb-1" style={{ color: active === p.id ? "#fff" : p.color }}>{p.title}</p>
          <p className="text-[10px] leading-snug" style={{ color: active === p.id ? "rgba(255,255,255,.85)" : "#64748B" }}>{active === p.id ? `Example: ${p.eg}` : p.where}</p>
        </button>
      ))}
    </div>
  );
}

// ─── Component Pillars ────────────────────────────────────
const pillars = [
  { id: "framework", icon: "📐", label: "Standardised Framework", color: "#0070F2", short: "What to do & when", detail: "Enhances SAP Activate roadmap with Clean Core activities, Quality Gates, and 150+ tasks in Cloud ALM.", maps: "→ Processes" },
  { id: "toolchain", icon: "🛠️", label: "Integrated Toolchain",  color: "#7C3AED", short: "Digital tools that manage it", detail: "Signavio + LeanIX + Cloud ALM + BTP. Pre-integrated — data flows between them automatically.", maps: "→ Tools" },
  { id: "guidance",  icon: "🧭", label: "Expert Guidance",       color: "#059669", short: "Human support, end-to-end", detail: "SAP Onboarding Advisors, Enterprise Architects, Customer Success Managers + certified partners.", maps: "→ People" },
];

export function ComponentPillars() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {pillars.map((p) => (
        <button key={p.id} onClick={() => setActive((a) => a === p.id ? null : p.id)}
          className="rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden text-left flex flex-col"
          style={{ background: active === p.id ? p.color : "#fff", borderColor: active === p.id ? p.color : `${p.color}30`, boxShadow: active === p.id ? `0 12px 32px ${p.color}30` : "0 2px 8px rgba(0,0,0,.07)" }}>
          <div className="p-3.5 flex-1">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-3" style={{ background: active === p.id ? "rgba(255,255,255,.25)" : `${p.color}18` }}>{p.icon}</div>
            <p className="text-xs font-black leading-snug mb-1.5" style={{ color: active === p.id ? "#fff" : p.color }}>{p.label}</p>
            <p className="text-[11px]" style={{ color: active === p.id ? "rgba(255,255,255,.75)" : "#64748B" }}>{p.short}</p>
            {active === p.id && <p className="text-[11px] text-white/90 mt-2.5 leading-relaxed">{p.detail}</p>}
          </div>
          <div className="px-3.5 py-2 border-t" style={{ background: active === p.id ? "rgba(255,255,255,.15)" : "#F8FAFC", borderColor: "rgba(0,0,0,.06)" }}>
            <p className="text-[10px] font-bold" style={{ color: active === p.id ? "rgba(255,255,255,.8)" : "#94A3B8" }}>People/Process/Tools {p.maps}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Enhancement Cards ────────────────────────────────────
const enhancements = [
  { num: "01", icon: "🔍", title: "Improved Discovery Phase",   desc: "Digital Discovery Assessment (DDA) toolkit — structured data collection before the project starts.", tag: "Discover Phase", highlight: false },
  { num: "02", icon: "🗺️", title: "Broader Adoption Roadmaps", desc: "Now covers full SAP Business Suite — not just S/4HANA but LoB solutions too.", tag: "All Phases", highlight: false },
  { num: "03", icon: "⚡",  title: "TPS for Private Customers", desc: "Transformation Preparation Service — specifically for SAP Cloud ERP Private Package customers only.", tag: "Prepare Phase", highlight: true },
  { num: "04", icon: "✅",  title: "Improved Onboarding + Plan", desc: "4-call structure formalised. 150+ Clean Core tasks auto-loaded into Cloud ALM.", tag: "Prepare Phase", highlight: false },
  { num: "05", icon: "🛠️", title: "Enhanced Toolchain",        desc: "Stronger connections between Signavio, LeanIX, Cloud ALM, and BTP.", tag: "All Phases", highlight: false },
];

export function EnhancementCards() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {enhancements.map((it, i) => (
        <div key={i} className="rounded-2xl p-3.5"
          style={{ background: it.highlight ? "linear-gradient(135deg,#7C3AED,#6D28D9)" : "#fff", border: it.highlight ? "none" : "1.5px solid #E2E8F0", boxShadow: it.highlight ? "0 8px 28px rgba(124,58,237,.28)" : "0 2px 8px rgba(0,0,0,.07)", gridColumn: i === 4 ? "span 2" : undefined }}>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[22px]">{it.icon}</span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.5px]" style={{ color: it.highlight ? "rgba(255,255,255,.6)" : "#94A3B8" }}>Enhancement {it.num}</p>
              <p className="text-xs font-black leading-snug" style={{ color: it.highlight ? "#fff" : "#0F172A" }}>{it.title}</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: it.highlight ? "rgba(255,255,255,.85)" : "#475569" }}>{it.desc}</p>
          <div className="flex gap-1.5 flex-wrap mt-2">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-md" style={{ background: it.highlight ? "rgba(255,255,255,.2)" : "#F1F5F9", color: it.highlight ? "#fff" : "#64748B" }}>{it.tag}</span>
            {it.highlight && <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/25 text-white">⚠️ EXAM TRAP — Not all customers</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Benefits Grid ────────────────────────────────────────
const benefits = [
  { icon: "🎯", title: "Predictability",  desc: "Clear phases + Quality Gates = confidence in outcomes & timelines", color: "#0070F2" },
  { icon: "🔭", title: "Transparency",    desc: "All stakeholders have full visibility into progress, risks & decisions", color: "#7C3AED" },
  { icon: "📚", title: "Access to Info",  desc: "Resources, templates & guidance available instantly in Cloud ALM", color: "#0891B2" },
  { icon: "🆘", title: "SAP Support",     desc: "Contact SAP at any time — guidance is ongoing, not a one-off event", color: "#059669" },
];

export function BenefitsGrid() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {benefits.map((b, i) => (
        <div key={i} className="rounded-2xl p-4 border-[1.5px]" style={{ background: `${b.color}10`, borderColor: `${b.color}25` }}>
          <div className="text-3xl mb-2.5">{b.icon}</div>
          <p className="text-sm font-black mb-1.5" style={{ color: b.color }}>{b.title}</p>
          <p className="text-xs text-[#475569] leading-relaxed">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}
