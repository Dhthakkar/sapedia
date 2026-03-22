"use client";
import { useState } from "react";

const layers = [
  { label:"SAP S/4HANA Core",                             color:"#EBF4FF", border:"#BFDBFE", txt:"#1D4ED8", icon:"🏛️", note:"Standard — untouched, upgrades in hours",                   badge:"CLEAN CORE" },
  { label:"SAP BTP",                                      color:"#F3F0FF", border:"#C4B5FD", txt:"#6D28D9", icon:"☁️", note:"Extension & integration platform" },
  { label:"Low-code: Build Apps + Process Automation",    color:"#EDFAF1", border:"#6EE7B7", txt:"#065F46", icon:"🖱️", note:"No-code drag & drop — for business users" },
  { label:"Pro-code: BAS + ABAP Cloud + Build Code",      color:"#FFFBEA", border:"#FDE68A", txt:"#78350F", icon:"💻", note:"Professional developer tools" },
  { label:"Integration Suite + Connectivity Service",     color:"#FEF2F2", border:"#FECACA", txt:"#991B1B", icon:"🔗", note:"Clean integrations — no custom point-to-point" },
];

export default function BTPStack() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-1.5">
      {layers.map((l, i) => (
        <div key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          className="p-3 rounded-xl border-[1.5px] transition-all flex items-center gap-2.5"
          style={{
            background:   l.color,
            borderColor:  hover === i ? l.txt : l.border,
          }}>
          <span className="text-lg flex-shrink-0">{l.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold" style={{ color: l.txt }}>{l.label}</p>
            {hover === i && <p className="text-[11px] text-[#64748B] mt-0.5">{l.note}</p>}
          </div>
          {l.badge && (
            <span className="text-[9px] bg-[#0070F2] text-white px-2 py-0.5 rounded-lg font-bold flex-shrink-0">
              {l.badge}
            </span>
          )}
        </div>
      ))}
      <p className="text-[11px] text-[#94A3B8] text-center pt-1">Hover each layer to learn its role</p>
    </div>
  );
}
