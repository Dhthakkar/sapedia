"use client";
import { useState } from "react";

const phases = [
  { label:"Discover", icon:"🔍", color:"#0070F2", tag:"DDA",    desc:"Digital Discovery Assessment captures the customer's current landscape, planned journey, and key requirements. Led by Onboarding team + Customer Success Manager.", key:"Digital Discovery Assessment (DDA)", hasQG: false },
  { label:"Prepare",  icon:"📋", color:"#7C3AED", tag:"4 Calls",desc:"SAP Onboarding Advisor runs 4 personalised sessions. Clean Core Success Plan set up in Cloud ALM with 150+ tasks. System provisioned via SAP for Me.", key:"4 Onboarding Calls + Success Plan Setup", hasQG: false },
  { label:"Explore",  icon:"🗺️", color:"#0891B2", tag:"QG-1",  desc:"Business processes mapped using SAP Signavio. Gaps vs SAP best practice identified. First Clean Core Quality Gate completed.", key:"Process Mapping + Quality Gate 1", hasQG: true },
  { label:"Realize",  icon:"🔨", color:"#059669", tag:"QG-2",  desc:"Configure S/4HANA. Build extensions on BTP. Migrate data. Run Tricentis automated testing. Quality Gate 2.", key:"Build + Configure + Test", hasQG: true },
  { label:"Deploy",   icon:"🚀", color:"#D97706", tag:"Go-Live",desc:"System goes live. End users trained via SAP Enable Now. Final Quality Gate completed. SAP WalkMe for in-system guidance.", key:"Go-Live + End-User Training", hasQG: true },
  { label:"Run",      icon:"📊", color:"#DC2626", tag:"Ops",    desc:"Post-go-live monitoring via Cloud ALM Operations Dashboard. Continuous improvement cycles. SAP WalkMe for adoption tracking.", key:"Monitoring + Continuous Improvement", hasQG: true },
];

export default function PhaseTimeline() {
  const [active, setActive] = useState(0);
  const p = phases[active];

  return (
    <div className="flex flex-col gap-4">
      {/* Phase tabs */}
      <div className="flex overflow-x-auto">
        {phases.map((ph, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="flex-1 min-w-[56px] py-2.5 px-1.5 flex flex-col items-center gap-1 transition-all border-y-2 border-l-2 last:border-r-2 cursor-pointer"
            style={{
              background:   active === i ? ph.color : "#fff",
              borderColor:  `${ph.color}${active === i ? "" : "30"}`,
              borderRadius: i === 0 ? "12px 0 0 12px" : i === phases.length - 1 ? "0 12px 12px 0" : "0",
            }}>
            <span className="text-lg">{ph.icon}</span>
            <span className="text-[9px] font-black uppercase" style={{ color: active === i ? "#fff" : ph.color }}>{ph.label}</span>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: active === i ? "rgba(255,255,255,0.25)" : "#F1F5F9", color: active === i ? "#fff" : "#64748B" }}>
              {ph.tag}
            </span>
          </button>
        ))}
      </div>

      {/* Phase detail */}
      <div className="animate-scale-in rounded-2xl p-4 border-2"
        style={{ background: `${p.color}10`, borderColor: `${p.color}30` }}>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-2xl">{p.icon}</span>
          <div>
            <p className="text-[15px] font-black" style={{ color: p.color }}>{p.label} Phase</p>
            <p className="text-[11px] text-[#64748B] font-semibold">Key activity: {p.key}</p>
          </div>
        </div>
        <p className="text-sm text-[#334155] leading-relaxed">{p.desc}</p>
        {p.hasQG && (
          <div className="mt-3 inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5">
            <span className="text-xs">✅</span>
            <span className="text-[11px] font-bold text-[#334155]">Clean Core Quality Gate applies here</span>
          </div>
        )}
      </div>
    </div>
  );
}
