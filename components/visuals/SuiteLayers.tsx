"use client";
import { useState } from "react";

const layers = [
  { id:"erp",  label:"Cloud ERP",          sub:"S/4HANA",        color:"#0070F2", icon:"🏢", desc:"Core operations — Finance, Procurement, Manufacturing, Sales." },
  { id:"btp",  label:"SAP BTP",            sub:"Build & Extend", color:"#7C3AED", icon:"🛠️", desc:"Build custom apps and integrations on top of ERP without touching the core." },
  { id:"data", label:"Business Data Cloud",sub:"Analytics",      color:"#0891B2", icon:"📊", desc:"Data management, analytics, and Business Intelligence across the Suite." },
  { id:"ai",   label:"Business AI",        sub:"Intelligence",   color:"#059669", icon:"✨", desc:"AI capabilities across all products — Joule, predictive analytics, automation." },
  { id:"lob",  label:"LoB Solutions",      sub:"HR, CX, Spend",  color:"#D97706", icon:"🌐", desc:"SuccessFactors (HR), SAP CX, Ariba (Spend) — specialised apps per business function." },
];

export default function SuiteLayers() {
  const [active, setActive] = useState<string>("erp");
  const activeItem = layers.find(l => l.id === active)!;

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 bg-slate-50/50 p-4 rounded-[32px] border border-slate-100">
      {/* Sidebar Tabs */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0 md:w-48">
        {layers.map(l => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all border-2 whitespace-nowrap md:whitespace-normal ${
              active === l.id 
                ? "bg-white border-blue-600 shadow-md scale-[1.02]" 
                : "bg-white/50 border-transparent hover:border-slate-200"
            }`}
          >
            <span className="text-lg">{l.icon}</span>
            <span className={`text-[11px] font-black uppercase tracking-tight ${active === l.id ? "text-blue-600" : "text-slate-400"}`}>
              {l.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm min-h-[180px] flex flex-col justify-center">
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: activeItem.color }} />
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: activeItem.color }}>
              {activeItem.sub}
            </p>
          </div>
          <h4 className="text-xl font-display font-black text-slate-900 mb-2">{activeItem.label}</h4>
          <p className="text-[14.5px] leading-relaxed text-slate-600">{activeItem.desc}</p>
        </div>
      </div>
    </div>
  );
}
