"use client";
import { useState } from "react";

const items = [
  { id:"erp",  label:"Cloud ERP",          sub:"S/4HANA",        color:"#0070F2", r:30,  desc:"Core operations — Finance, Procurement, Manufacturing, Sales." },
  { id:"btp",  label:"SAP BTP",            sub:"Build & Extend", color:"#7C3AED", r:55,  desc:"Build custom apps and integrations on top of ERP without touching the core." },
  { id:"data", label:"Business Data Cloud",sub:"Analytics",      color:"#0891B2", r:80, desc:"Data management, analytics, and Business Intelligence across the Suite." },
  { id:"ai",   label:"Business AI",        sub:"Intelligence",   color:"#059669", r:105, desc:"AI capabilities across all products — Joule, predictive analytics, automation." },
  { id:"lob",  label:"LoB Solutions",      sub:"HR, CX, Spend",  color:"#D97706", r:130, desc:"SuccessFactors (HR), SAP CX, Ariba (Spend) — specialised apps per business function." },
];

const CX = 150, CY = 150;

export default function EcosystemDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = items.find(i => i.id === active);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* 
          Fixed-Size Container for the Diagram:
          This prevents the circles from growing based on screen width.
          The diagram will be exactly 300x300px.
      */}
      <div className="w-[300px] h-[300px] relative shrink-0">
        <svg viewBox="0 0 300 300" className="w-full h-full block overflow-visible">
          {[...items].reverse().map(it => (
            <circle key={it.id} cx={CX} cy={CY} r={it.r}
              fill={`${it.color}${active === it.id ? "15" : "05"}`}
              stroke={`${it.color}${active === it.id ? "cc" : "40"}`}
              strokeWidth={active === it.id ? 3 : 1.5}
              className="transition-all duration-300 cursor-pointer"
              onClick={() => setActive(a => a === it.id ? null : it.id)}
            />
          ))}
          
          <text x={CX} y={CY-5} textAnchor="middle" fontSize={9} fontWeight={900} fill="#0070F2" fontFamily="Sora,sans-serif">Cloud ERP</text>
          <text x={CX} y={CY+8} textAnchor="middle" fontSize={7}  fontWeight={600} fill="#64748B">S/4HANA</text>
          
          {items.filter(i => i.id !== "erp").map((it, idx) => {
            const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2 + 0.4;
            const x = CX + (it.r - 8) * Math.cos(angle);
            const y = CY + (it.r - 8) * Math.sin(angle);
            return (
              <text key={it.id} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fontSize={6} fontWeight={800} fill={it.color} fontFamily="Sora,sans-serif"
                className="pointer-events-none uppercase tracking-tighter"
              >
                {it.label}
              </text>
            );
          })}
        </svg>
      </div>
      
      {/* Description Box */}
      <div className="w-full min-h-[100px]">
        {activeItem ? (
          <div className="rounded-[24px] p-5 border-2 animate-in fade-in slide-in-from-top-4 duration-500 shadow-md" 
            style={{ background:`${activeItem.color}08`, borderColor:`${activeItem.color}20` }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: activeItem.color }} />
              <p className="text-[13px] font-black uppercase tracking-widest" style={{ color:activeItem.color }}>
                {activeItem.label} — {activeItem.sub}
              </p>
            </div>
            <p className="text-[14px] text-[#334155] leading-relaxed">
              {activeItem.desc}
            </p>
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-[24px] bg-slate-50/50">
            <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[2px]">Tap a ring to explore layers</p>
          </div>
        )}
      </div>
    </div>
  );
}
