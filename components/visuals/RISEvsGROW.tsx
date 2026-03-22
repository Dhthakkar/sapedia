"use client";
import { useState } from "react";

const cards = [
  {
    id:"rise", title:"RISE with SAP", icon:"🔄", color:"#0070F2", badge:"Existing SAP Customers",
    points:["Running SAP ECC or S/4HANA on-premise","Migrating to cloud — structured journey","Includes Transformation Preparation Service","SAP Cloud ERP Private Package offering","Methodology guides the entire migration"],
  },
  {
    id:"grow", title:"GROW with SAP", icon:"🌱", color:"#059669", badge:"New SAP Customers",
    points:["No prior SAP system","Go straight to S/4HANA Public Cloud","Adopt best practices from Day 1","Faster & simpler implementation","No legacy baggage to manage"],
  },
];

export default function RISEvsGROW() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map(c => (
        <button key={c.id}
          onClick={() => setActive(a => a === c.id ? null : c.id)}
          className="rounded-2xl p-4 border-[2.5px] cursor-pointer text-left transition-all"
          style={{
            background:  active === c.id ? `${c.color}12` : "#fff",
            borderColor: `${c.color}${active === c.id ? "" : "30"}`,
            boxShadow:   active === c.id ? `0 8px 32px ${c.color}25` : "0 2px 8px rgba(0,0,0,0.07)",
          }}>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: c.color }}>
              {c.icon}
            </div>
            <div>
              <p className="text-sm font-black text-[#0F172A]">{c.title}</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{ background: `${c.color}18`, color: c.color }}>{c.badge}</span>
            </div>
          </div>
          {c.points.map((pt, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${c.color}20` }}>
                <span className="text-[8px] font-black" style={{ color: c.color }}>✓</span>
              </div>
              <p className="text-xs text-[#334155] leading-snug">{pt}</p>
            </div>
          ))}
        </button>
      ))}
    </div>
  );
}
