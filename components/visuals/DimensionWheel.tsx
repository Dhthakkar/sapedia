"use client";
import { useState } from "react";

const dims = [
  { id:"processes",    label:"Processes",    icon:"🔄", color:"#0070F2", def:"Sequences of actions arranged in an end-to-end flow",                          note:"Procure-to-pay, Order-to-cash, Hire-to-retire" },
  { id:"extensions",  label:"Extensions",   icon:"🔌", color:"#7C3AED", def:"Extra functionalities added beyond standard SAP features",                      note:"Custom approval workflows, custom pricing rules" },
  { id:"data",        label:"Data",          icon:"🗄️", color:"#0891B2", def:"Configuration settings, master data & transactional data",                     note:"Materials, Customers, Vendors, Purchase Orders" },
  { id:"integrations",label:"Integrations",  icon:"🔗", color:"#059669", def:"Mechanisms facilitating communication & data exchange between solutions",       note:"SAP ↔ 3PL, SAP ↔ CRM, SAP ↔ Bank" },
  { id:"operations",  label:"Operations",    icon:"📡", color:"#D97706", def:"Ongoing governance & monitoring to ensure smooth functioning",                  note:"Cloud ALM monitoring, proactive issue detection" },
];

export default function DimensionWheel() {
  const [active, setActive] = useState<string | null>(null);
  const activeD = dims.find(d => d.id === active);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2.5">
        {dims.map(d => (
          <button key={d.id}
            onClick={() => setActive(a => a === d.id ? null : d.id)}
            className="p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2.5 text-left"
            style={{
              gridColumn:  d.id === "operations" ? "span 2" : undefined,
              justifyContent: d.id === "operations" ? "center" : undefined,
              background:  active === d.id ? d.color : "#fff",
              borderColor: `${d.color}${active === d.id ? "" : "30"}`,
              boxShadow:   active === d.id ? `0 8px 24px ${d.color}30` : "0 2px 8px rgba(0,0,0,0.07)",
            }}>
            <span className="text-xl">{d.icon}</span>
            <span className="text-sm font-black" style={{ color: active === d.id ? "#fff" : d.color }}>
              {d.label}
            </span>
          </button>
        ))}
      </div>

      {activeD ? (
        <div className="animate-scale-in rounded-2xl p-4 border-2"
          style={{ background: `${activeD.color}10`, borderColor: `${activeD.color}30` }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{activeD.icon}</span>
            <p className="text-[15px] font-black" style={{ color: activeD.color }}>{activeD.label}</p>
          </div>
          <p className="text-sm font-semibold text-[#0F172A] mb-2 italic">"{activeD.def}"</p>
          <p className="text-xs text-[#64748B]">Examples: {activeD.note}</p>
        </div>
      ) : (
        <p className="text-xs text-[#94A3B8] text-center">Tap a dimension to see its definition →</p>
      )}
    </div>
  );
}
