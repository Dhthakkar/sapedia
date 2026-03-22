"use client";
import { useState } from "react";

const items = [
  { id:"erp",    label:"Cloud ERP",          sub:"S/4HANA",           color:"#0070F2", r:52,  desc:"Core operations — Finance, Procurement, Manufacturing, Sales. The heart of the Suite." },
  { id:"btp",    label:"SAP BTP",            sub:"Build & Integrate", color:"#7C3AED", r:96,  desc:"Build custom apps & integrations on top of ERP. The clean extension platform." },
  { id:"data",   label:"Business Data Cloud",sub:"Analytics",         color:"#0891B2", r:136, desc:"Data management, analytics, and Business Intelligence across the Suite." },
  { id:"ai",     label:"Business AI",        sub:"Intelligence",      color:"#059669", r:176, desc:"AI capabilities embedded across all products — from Joule to predictive analytics." },
  { id:"lob",    label:"LoB Solutions",      sub:"HR, CX, Spend…",   color:"#D97706", r:210, desc:"HR (SuccessFactors), Customer Experience, Ariba for Spend — specialised apps per function." },
];

export default function EcosystemDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = items.find(i => i.id === active);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Rings */}
      <div className="relative w-[220px] h-[220px] flex-shrink-0">
        {[...items].reverse().map(it => (
          <div key={it.id}
            onClick={() => setActive(a => a === it.id ? null : it.id)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-300"
            style={{
              width:  it.r * 2, height: it.r * 2,
              border: `2px solid ${it.color}${active === it.id ? "" : "40"}`,
              background: `${it.color}${active === it.id ? "18" : "08"}`,
            }}
          />
        ))}
        {/* Centre label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
          <p className="text-[11px] font-black text-[#0070F2]">Cloud ERP</p>
          <p className="text-[9px] text-[#64748B]">S/4HANA</p>
        </div>
        {/* Ring labels */}
        {items.filter(i => i.id !== "erp").map((it, idx) => {
          const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2;
          const mid   = it.r - 20;
          const x     = 110 + mid * Math.cos(angle);
          const y     = 110 + mid * Math.sin(angle);
          return (
            <div key={it.id} className="absolute pointer-events-none text-center"
              style={{ left: x - 28, top: y - 12, width: 56 }}>
              <p className="text-[8px] font-bold leading-tight" style={{ color: it.color }}>{it.label}</p>
            </div>
          );
        })}
      </div>

      {/* Info panel */}
      <div className="w-full min-h-[64px]">
        {activeItem ? (
          <div className="animate-scale-in rounded-xl p-3 border-2"
            style={{ background: `${activeItem.color}12`, borderColor: `${activeItem.color}30` }}>
            <p className="text-sm font-black mb-1" style={{ color: activeItem.color }}>
              {activeItem.label} — {activeItem.sub}
            </p>
            <p className="text-sm text-[#334155] leading-relaxed">{activeItem.desc}</p>
          </div>
        ) : (
          <p className="text-xs text-[#94A3B8] text-center pt-2">Tap a ring to explore each layer →</p>
        )}
      </div>
    </div>
  );
}
