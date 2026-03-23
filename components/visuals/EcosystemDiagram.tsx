"use client";
import { useState } from "react";

const items = [
  { id:"erp",  label:"Cloud ERP",          sub:"S/4HANA",        color:"#0070F2", r:40,  desc:"Core operations — Finance, Procurement, Manufacturing, Sales." },
  { id:"btp",  label:"SAP BTP",            sub:"Build & Extend", color:"#7C3AED", r:75,  desc:"Build custom apps and integrations on top of ERP without touching the core." },
  { id:"data", label:"Business Data Cloud",sub:"Analytics",      color:"#0891B2", r:108, desc:"Data management, analytics, and Business Intelligence across the Suite." },
  { id:"ai",   label:"Business AI",        sub:"Intelligence",   color:"#059669", r:140, desc:"AI capabilities across all products — Joule, predictive analytics, automation." },
  { id:"lob",  label:"LoB Solutions",      sub:"HR, CX, Spend",  color:"#D97706", r:170, desc:"SuccessFactors (HR), SAP CX, Ariba (Spend) — specialised apps per business function." },
];

const CX = 175, CY = 175;

export default function EcosystemDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = items.find(i => i.id === active);

  return (
    <div className="w-full flex flex-col gap-3">
      <svg viewBox="0 0 350 350" className="w-full" style={{ maxHeight: 300 }}>
        {[...items].reverse().map(it => (
          <circle key={it.id} cx={CX} cy={CY} r={it.r}
            fill={`${it.color}${active === it.id ? "18" : "08"}`}
            stroke={`${it.color}${active === it.id ? "cc" : "50"}`}
            strokeWidth={active === it.id ? 2.5 : 1.5}
            style={{ cursor:"pointer", transition:"all 0.25s" }}
            onClick={() => setActive(a => a === it.id ? null : it.id)}
          />
        ))}
        <text x={CX} y={CY-6} textAnchor="middle" fontSize={10} fontWeight={800} fill="#0070F2" fontFamily="Sora,sans-serif">Cloud ERP</text>
        <text x={CX} y={CY+9} textAnchor="middle" fontSize={8}  fontWeight={500} fill="#64748B">S/4HANA</text>
        {items.filter(i => i.id !== "erp").map((it, idx) => {
          const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2 + 0.3;
          const x = CX + (it.r - 16) * Math.cos(angle);
          const y = CY + (it.r - 16) * Math.sin(angle);
          return (
            <text key={it.id} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              fontSize={7.5} fontWeight={700} fill={it.color} fontFamily="Sora,sans-serif"
              style={{ pointerEvents:"none" }}>
              {it.label}
            </text>
          );
        })}
      </svg>
      <div className="min-h-[52px]">
        {activeItem ? (
          <div className="rounded-xl p-3 border-2" style={{ background:`${activeItem.color}10`, borderColor:`${activeItem.color}30` }}>
            <p className="text-sm font-black mb-1" style={{ color:activeItem.color }}>{activeItem.label} — {activeItem.sub}</p>
            <p className="text-sm text-[#334155] leading-relaxed">{activeItem.desc}</p>
          </div>
        ) : (
          <p className="text-xs text-[#94A3B8] text-center pt-2">Tap a ring to explore each layer →</p>
        )}
      </div>
    </div>
  );
}
