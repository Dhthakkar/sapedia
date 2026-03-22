"use client";
import { useState } from "react";

const chars = [
  { label:"Minimalism",           icon:"✂️", color:"#0070F2", desc:"Removes redundant & obsolete functionalities. Only keep what adds real business value." },
  { label:"Modularity",           icon:"🧩", color:"#7C3AED", desc:"ERP divided into independent components. Update one without breaking others." },
  { label:"Scalability",          icon:"📈", color:"#0891B2", desc:"Grows with your business without compromising performance or stability." },
  { label:"Maintainability",      icon:"🔧", color:"#059669", desc:"Simplified codebase any SAP developer can understand — not just the one who wrote it 10 years ago." },
  { label:"Stability & Reliability",icon:"🛡️",color:"#D97706", desc:"Fewer dependencies = fewer failure points = fewer critical incidents per month." },
];

export default function CharacteristicsGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {chars.map((c, i) => (
        <button key={i}
          onClick={() => setActive(a => a === i ? null : i)}
          className="p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center"
          style={{
            background:  active === i ? c.color : "#fff",
            borderColor: `${c.color}${active === i ? "" : "30"}`,
            boxShadow:   active === i ? `0 8px 24px ${c.color}35` : "0 2px 8px rgba(0,0,0,0.07)",
          }}>
          <span className="text-3xl mb-2">{c.icon}</span>
          <span className="text-xs font-black leading-snug" style={{ color: active === i ? "#fff" : c.color }}>
            {c.label}
          </span>
          {active === i && (
            <p className="text-[11px] text-white/90 leading-snug mt-2">{c.desc}</p>
          )}
        </button>
      ))}
    </div>
  );
}
