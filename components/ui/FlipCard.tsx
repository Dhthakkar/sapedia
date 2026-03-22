"use client";
import { useState } from "react";
import type { JargonTerm } from "@/types";

interface FlipCardProps extends JargonTerm {
  height?: number;
}

export default function FlipCard({ term, simple, inExam, color = "#0070F2", height = 180 }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""}`}
      style={{ height }}
      onClick={() => setFlipped((f) => !f)}>
      <div className="flip-inner" style={{ height }}>
        {/* Front */}
        <div
          className="flip-face flex flex-col justify-between"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}08)`,
            border: `2px solid ${color}30`,
          }}>
          <div>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white mb-2.5"
              style={{ background: color }}>
              J
            </div>
            <p className="text-[15px] font-black text-[#0F172A] leading-snug">{term}</p>
          </div>
          <p className="text-[11px] text-[#94A3B8] font-semibold">Tap to reveal →</p>
        </div>

        {/* Back */}
        <div
          className="flip-back flex flex-col gap-2.5 overflow-auto"
          style={{ background: color }}>
          <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.6px]">Simple</p>
          <p className="text-[13px] text-white leading-relaxed">{simple}</p>
          <div className="h-px bg-white/20" />
          <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.6px]">In the exam</p>
          <p className="text-[12px] text-white/90 leading-[1.55]">{inExam}</p>
        </div>
      </div>
    </div>
  );
}
