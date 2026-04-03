"use client";
import { useState } from "react";

const items = [
  { id:"erp",  label:"Cloud ERP",          sub:"S/4HANA",        color:"#0070F2", r:28,  desc:"Core operations — Finance, Procurement, Manufacturing, Sales." },
  { id:"btp",  label:"SAP BTP",            sub:"Build & Extend", color:"#7C3AED", r:52,  desc:"Build custom apps and integrations on top of ERP without touching the core." },
  { id:"data", label:"Business Data Cloud",sub:"Analytics",      color:"#0891B2", r:76, desc:"Data management, analytics, and Business Intelligence across the Suite." },
  { id:"ai",   label:"Business AI",        sub:"Intelligence",   color:"#059669", r:100, desc:"AI capabilities across all products — Joule, predictive analytics, automation." },
  { id:"lob",  label:"LoB Solutions",      sub:"HR, CX, Spend",  color:"#D97706", r:124, desc:"SuccessFactors (HR), SAP CX, Ariba (Spend) — specialised apps per business function." },
];

const CX = 150, CY = 150;

export default function EcosystemDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = items.find(i => i.id === active);

  return (
    <div className="w-full flex flex-col items-center">
      {/* 
          Fixed Height Wrapper: 
          This ensures the diagram has a reserved space of 320px height. 
          The description box will ALWAYS start below this 320px mark.
      */}
      <div className="w-full max-w-[320px] h-[320px] relative flex items-center justify-center">
        <svg viewBox="0 0 300 300" className="w-full h-full block overflow-visible drop-shadow-sm">
          {[...items].reverse().map(it => (
            <circle key={it.id} cx={CX} cy={CY} r={it.r}
              fill={`${it.color}${active === it.id ? "18" : "08"}`}
              stroke={`${it.color}${active === it.id ? "cc" : "50"}`}
              strokeWidth={active === it.id ? 2.5 : 1.5}
              style={{ cursor:"pointer", transition:"all 0.25s" }}
              onClick={() => setActive(a => a === it.id ? null : it.id)}
            />
          ))}
          
          <text x={CX} y={CY-5} textAnchor="middle" fontSize={9} fontWeight={800} fill="#0070F2" fontFamily="Sora,sans-serif">Cloud ERP</text>
          <text x={CX} y={CY+8} textAnchor="middle" fontSize={7}  fontWeight={500} fill="#64748B">S/4HANA</text>
          
          {items.filter(i => i.id !== "erp").map((it, idx) => {
            const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2 + 0.3;
            const x = CX + (it.r - 8) * Math.cos(angle);
            const y = CY + (it.r - 8) * Math.sin(angle);
            return (
              <text key={it.id} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fontSize={6} fontWeight={700} fill={it.color} fontFamily="Sora,sans-serif"
                style={{ pointerEvents:"none" }}>
                {it.label}
              </text>
            );
          })}
        </svg>
      </div>
      
      {/* Description box — guaranteed to be below the 320px diagram area */}
      <div className="w-full min-h-[120px] mt-6">
        {activeItem ? (
          <div className="rounded-2xl p-5 border-2 animate-in fade-in slide-in-from-top-2 duration-300" 
            style={{ background:`${activeItem.color}08`, borderColor:`${activeItem.color}25` }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: activeItem.color }} />
              <p className="text-[13px] font-black uppercase tracking-wide" style={{ color:activeItem.color }}>
                {activeItem.label} — {activeItem.sub}
              </p>
            </div>
            <p className="text-[14px] text-[#334155] leading-relaxed">
              {activeItem.desc}
            </p>
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
            <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Tap a ring to explore the Suite</p>
          </div>
        )}
      </div>
    </div>
  );
}
