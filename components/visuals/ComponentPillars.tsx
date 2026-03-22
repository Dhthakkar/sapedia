"use client";
import { useState } from "react";

const pillars = [
  { id:"framework", icon:"📐", label:"Standardised Framework", color:"#0070F2", short:"What to do & when",       detail:"Enhances SAP Activate roadmap with Clean Core activities, Quality Gates, and 150+ tasks in Cloud ALM. Covers every phase Discover through Run.", maps:"→ Processes" },
  { id:"toolchain", icon:"🛠️", label:"Integrated Toolchain",  color:"#7C3AED", short:"Digital tools that manage it", detail:"Signavio + LeanIX + Cloud ALM + BTP. Pre-integrated — data flows between them automatically. End-to-end transparency.", maps:"→ Tools" },
  { id:"guidance",  icon:"🧭", label:"Expert Guidance",       color:"#059669", short:"Human support, end-to-end",   detail:"SAP Onboarding Advisors, Enterprise Architects, Customer Success Managers + certified partners. Structured sessions + always-on support.", maps:"→ People" },
];

export default function ComponentPillars() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {pillars.map(p => (
        <button key={p.id}
          onClick={() => setActive(a => a === p.id ? null : p.id)}
          className="rounded-2xl border-2 cursor-pointer transition-all text-left flex flex-col overflow-hidden"
          style={{
            background:  active === p.id ? p.color : "#fff",
            borderColor: `${p.color}${active === p.id ? "" : "30"}`,
            boxShadow:   active === p.id ? `0 12px 32px ${p.color}30` : "0 2px 8px rgba(0,0,0,0.07)",
          }}>
          <div className="p-3.5 flex-1">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3"
              style={{ background: active === p.id ? "rgba(255,255,255,0.25)" : `${p.color}18` }}>
              {p.icon}
            </div>
            <p className="text-xs font-black mb-1.5 leading-snug"
              style={{ color: active === p.id ? "#fff" : p.color }}>{p.label}</p>
            <p className="text-[11px]" style={{ color: active === p.id ? "rgba(255,255,255,0.75)" : "#64748B" }}>
              {p.short}
            </p>
            {active === p.id && (
              <p className="text-[11px] text-white/90 mt-2.5 leading-relaxed">{p.detail}</p>
            )}
          </div>
          <div className="px-3.5 py-2 border-t border-black/[0.06]"
            style={{ background: active === p.id ? "rgba(255,255,255,0.15)" : "#F8FAFC" }}>
            <p className="text-[10px] font-bold"
              style={{ color: active === p.id ? "rgba(255,255,255,0.8)" : "#94A3B8" }}>
              Maps to People/Process/Tools {p.maps}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
