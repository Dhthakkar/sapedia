"use client";
import { useState } from "react";
import FlipCard from "@/components/ui/FlipCard";
import PracticeQuestion from "@/components/ui/PracticeQuestion";
import type { TopicVisual } from "@/types";

interface TopicSectionProps {
  topicId: string;
  topicNum: number;
  title: string;
  visual: TopicVisual;
}

export default function TopicSection({ topicId, topicNum, title, visual }: TopicSectionProps) {
  const [qOpen, setQOpen] = useState(false);
  return (
    <div id={topicId} className="mb-14 scroll-mt-20">
      <div className="flex items-start gap-3 mb-5 pb-3.5 border-b-2 border-[#E2E8F0]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0070F2] to-[#0057C2] flex items-center justify-center text-[13px] font-black text-white flex-shrink-0">{topicNum}</div>
        <h3 className="font-display text-[clamp(15px,2.5vw,19px)] font-black text-[#0F172A] leading-snug">{title}</h3>
      </div>
      <div className="mb-4">{visual.visual()}</div>
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 mb-4">
        <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[.7px] mb-2.5">Key Points</p>
        {visual.keyPoints.map((pt, i) => (
          <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
            <div className="w-[18px] h-[18px] rounded-md bg-[#EBF4FF] flex items-center justify-center text-[9px] font-black text-[#0070F2] flex-shrink-0 mt-0.5">→</div>
            <p className="text-sm text-[#334155] leading-relaxed">{pt}</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <p className="text-[10px] font-black text-[#6D28D9] uppercase tracking-[.7px] mb-2.5">🟪 Jargon Buster — tap to flip</p>
        <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${Math.min(visual.jargon.length, 3)}, 1fr)` }}>
          {visual.jargon.map((j, i) => <FlipCard key={i} {...j} />)}
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#FFFBEA] to-[#FEF9EE] border-2 border-[#FDE68A] rounded-2xl p-4 mb-3">
        <p className="text-[10px] font-black text-[#D97706] uppercase tracking-[.7px] mb-2">🏭 Akshar Industries — Real Example</p>
        <p className="text-sm text-[#78350F] leading-[1.75]">{visual.akshar}</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="bg-gradient-to-br from-[#FFFBEA] to-[#FEF9EE] border-2 border-[#FDE68A] rounded-2xl p-4">
          <p className="text-[10px] font-black text-[#D97706] uppercase tracking-[.6px] mb-1.5">🎯 Exam Insight</p>
          <p className="text-xs text-[#78350F] leading-[1.65]">{visual.exam}</p>
        </div>
        <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FFF5F5] border-2 border-[#FECACA] rounded-2xl p-4">
          <p className="text-[10px] font-black text-[#DC2626] uppercase tracking-[.6px] mb-1.5">⚠️ Common Mistake</p>
          <p className="text-xs text-[#991B1B] leading-[1.65]">{visual.mistake}</p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#0070F2] to-[#0057C2] rounded-2xl p-5 mb-4">
        <p className="text-[10px] font-black text-white/60 uppercase tracking-[.7px] mb-2.5">📦 30-Second Exam Summary</p>
        {visual.summary.map((s, i) => (
          <div key={i} className="flex items-start gap-2.5 mb-2 last:mb-0">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 mt-0.5">{i + 1}</div>
            <p className="text-sm text-white/95 leading-relaxed font-medium">{s}</p>
          </div>
        ))}
      </div>
      <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden">
        <button onClick={() => setQOpen((o) => !o)} className="w-full px-4 py-3.5 flex items-center justify-between cursor-pointer transition-colors" style={{ background: qOpen ? "#EBF4FF" : "#F8FAFC" }}>
          <div className="flex items-center gap-2">
            <span className="text-base">📝</span>
            <span className="text-sm font-bold text-[#0F172A]">Practice Questions ({visual.questions.length})</span>
          </div>
          <span className="text-sm text-[#64748B] transition-transform duration-200" style={{ transform: qOpen ? "rotate(180deg)" : "none" }}>▾</span>
        </button>
        {qOpen && (
          <div className="p-4 border-t border-[#E2E8F0]">
            {visual.questions.map((q, i) => <PracticeQuestion key={i} question={q} qNum={i + 1} />)}
          </div>
        )}
      </div>
    </div>
  );
}
