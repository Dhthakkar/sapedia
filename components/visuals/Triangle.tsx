"use client";
import { useState } from "react";

const nodes = [
  { id:"people",  label:"People",    icon:"👥", color:"#0070F2", desc:"SAP Onboarding Advisors, Enterprise Architects, certified partners, customer project team. Without the right people driving it, no tool saves the project.", x:50, y:5  },
  { id:"process", label:"Processes", icon:"⚙️", color:"#7C3AED", desc:"End-to-end business flows redesigned using SAP best practices — procure-to-pay, order-to-cash, supply chain. Goal: move from custom to SAP standard.", x:5,  y:80 },
  { id:"tools",   label:"Tools",     icon:"🔧", color:"#059669", desc:"The integrated toolchain — Signavio, LeanIX, Cloud ALM, BTP. Provides transparency, digital project management, and collaboration across all phases.", x:90, y:80 },
];

export default function Triangle() {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = nodes.find(n => n.id === active);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full" style={{ paddingBottom: "70%", minHeight: 180 }}>
        <svg viewBox="0 0 100 90" className="absolute inset-0 w-full h-full">
          <polygon points="50,8 8,82 92,82"
            fill={activeNode ? `${activeNode.color}08` : "none"}
            stroke={activeNode ? activeNode.color : "#E2E8F0"}
            strokeWidth="1.5"
            strokeDasharray={activeNode ? "0" : "4,3"}
            style={{ transition: "all 0.3s" }}
          />
        </svg>
        {nodes.map(n => (
          <button key={n.id}
            onClick={() => setActive(a => a === n.id ? null : n.id)}
            className="absolute rounded-full flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-300 border-[3px]"
            style={{
              left: `${n.x}%`, top: `${n.y}%`,
              transform: "translate(-50%,-50%)",
              width: 64, height: 64,
              background: active === n.id ? n.color : "#fff",
              borderColor: n.color,
              boxShadow: active === n.id ? `0 8px 24px ${n.color}40` : "0 2px 8px rgba(0,0,0,0.07)",
              zIndex: 2,
            }}>
            <span className="text-lg">{n.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-[0.4px]"
              style={{ color: active === n.id ? "#fff" : n.color }}>{n.label}</span>
          </button>
        ))}
      </div>
      {activeNode ? (
        <div className="animate-scale-in rounded-xl p-3.5 border-2"
          style={{ background: `${activeNode.color}10`, borderColor: `${activeNode.color}25` }}>
          <p className="text-sm font-black mb-1.5" style={{ color: activeNode.color }}>
            {activeNode.icon} {activeNode.label}
          </p>
          <p className="text-sm text-[#334155] leading-relaxed">{activeNode.desc}</p>
        </div>
      ) : (
        <p className="text-xs text-[#94A3B8] text-center">Tap each corner to explore →</p>
      )}
    </div>
  );
}
