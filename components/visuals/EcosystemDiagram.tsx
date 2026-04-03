"use client";
import { useState } from "react";

const items = [
  { id:"erp",  label:"Cloud ERP",          sub:"S/4HANA",        color:"#0070F2", r:35,  desc:"Core operations — Finance, Procurement, Manufacturing, Sales." },
  { id:"btp",  label:"SAP BTP",            sub:"Build & Extend", color:"#7C3AED", r:65,  desc:"Build custom apps and integrations on top of ERP without touching the core." },
  { id:"data", label:"Business Data Cloud",sub:"Analytics",      color:"#0891B2", r:95, desc:"Data management, analytics, and Business Intelligence across the Suite." },
  { id:"ai",   label:"Business AI",        sub:"Intelligence",   color:"#059669", r:125, desc:"AI capabilities across all products — Joule, predictive analytics, automation." },
  { id:"lob",  label:"LoB Solutions",      sub:"HR, CX, Spend",  color:"#D97706", r:155, desc:"SuccessFactors (HR), SAP CX, Ariba (Spend) — specialised apps per business function." },
];

const CX = 175, CY = 175;

export default function EcosystemDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = items.find(i => i.id === active);

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4">
      {/* 
          SVG Container: 
          Capped at 450px to prevent the diagram from becoming 
          excessively tall on wide desktop screens. 
      */}
      <div className="w-full max-w-[450px] aspect-square relative flex items-center justify-center bg-white rounded-full shadow-inner border border-slate-50">
        <svg viewBox="0 0 350 350" className="w-full h-full block overflow-visible drop-shadow-sm">
          {[...items].reverse().map(it => (
            <circle key={it.id} cx={CX} cy={CY} r={it.r}
              fill={`${it.color}${active === it.id ? "15" : "05"}`}
              stroke={`${it.color}${active === it.id ? "cc" : "40"}`}
              strokeWidth={active === it.id ? 3 : 1.5}
              className="transition-all duration-300 cursor-pointer hover:stroke-blue-400"
              onClick={() => setActive(a => a === it.id ? null : it.id)}
            />
          ))}
          
          {/* Central Label */}
          <text x={CX} y={CY-6} textAnchor="middle" fontSize={10} fontWeight={900} fill="#0070F2" fontFamily="Sora,sans-serif">Cloud ERP</text>
          <text x={CX} y={CY+9} textAnchor="middle" fontSize={8}  fontWeight={600} fill="#64748B">S/4HANA</text>
          
          {/* Ring Labels — Placed carefully to avoid edge bleeding */}
          {items.filter(i => i.id !== "erp").map((it, idx) => {
            const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2 + 0.4;
            const x = CX + (it.r - 10) * Math.cos(angle);
            const y = CY + (it.r - 10) * Math.sin(angle);
            return (
              <text key={it.id} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fontSize={7} fontWeight={800} fill={it.color} fontFamily="Sora,sans-serif"
                className="pointer-events-none uppercase tracking-tighter"
              >
                {it.label}
              </text>
            );
          })}
        </svg>
      </div>
      
      {/* Description Box — Strictly separated with a gap */}
      <div className="w-full min-h-[120px]">
        {activeItem ? (
          <div className="rounded-[24px] p-6 border-2 animate-in fade-in slide-in-from-top-4 duration-500 shadow-lg shadow-slate-100" 
            style={{ background:`${activeItem.color}08`, borderColor:`${activeItem.color}20` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: activeItem.color }} />
              <p className="text-[14px] font-black uppercase tracking-widest" style={{ color:activeItem.color }}>
                {activeItem.label} — {activeItem.sub}
              </p>
            </div>
            <p className="text-[15px] text-[#334155] leading-relaxed font-medium">
              {activeItem.desc}
            </p>
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-[24px] bg-slate-50/50">
            <span className="inline-block animate-bounce mb-2">☝️</span>
            <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[2px]">Tap a ring to explore the Suite layers</p>
          </div>
        )}
      </div>
    </div>
  );
}
