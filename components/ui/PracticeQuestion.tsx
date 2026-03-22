"use client";
import { useState } from "react";
import type { Question } from "@/types";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

interface PracticeQuestionProps {
  question: Question;
  qNum: number;
}

export default function PracticeQuestion({ question, qNum }: PracticeQuestionProps) {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (i: number) => {
    if (revealed) return;
    if (question.type === "single") {
      setSelected([i]);
    } else {
      setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
    }
  };

  const reset = () => { setRevealed(false); setSelected([]); };

  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mb-3">
      {/* Question header */}
      <div className="flex gap-2.5 mb-4">
        <span className="flex-shrink-0 w-6 h-6 bg-[#0070F2] rounded-md flex items-center justify-center text-[11px] font-black text-white">
          Q{qNum}
        </span>
        <div>
          <p className="text-sm font-semibold text-[#0F172A] leading-relaxed">{question.q}</p>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">
            {question.type === "single" ? "Choose ONE correct answer" : `Choose ${question.count} correct answers`}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-1.5 mb-3">
        {question.options.map((opt, i) => {
          const sel = selected.includes(i);
          const cor = question.correct.includes(i);
          let bg = "#fff", border = "#E2E8F0", color = "#334155";
          if (revealed) {
            if (cor)           { bg = "#EDFAF1"; border = "#6EE7B7"; color = "#065F46"; }
            else if (sel&&!cor){ bg = "#FEF2F2"; border = "#FCA5A5"; color = "#991B1B"; }
          } else if (sel)      { bg = "#EBF4FF"; border = "#0070F2"; color = "#0057C2"; }

          return (
            <button key={i} onClick={() => toggle(i)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all text-left"
              style={{ background: bg, border: `1.5px solid ${border}`, cursor: revealed ? "default" : "pointer" }}>
              <span
                className="w-[22px] h-[22px] rounded-md flex-shrink-0 flex items-center justify-center text-[11px] font-black transition-all"
                style={{
                  background: revealed && cor ? "#059669" : sel && !revealed ? "#0070F2" : "#F1F5F9",
                  color:      revealed && cor ? "#fff"    : sel && !revealed ? "#fff"    : "#64748B",
                }}>
                {revealed && cor ? "✓" : LETTERS[i]}
              </span>
              <span className="text-sm font-medium leading-snug flex-1" style={{ color }}>{opt}</span>
              {revealed && cor  && <span className="text-xs flex-shrink-0">✅</span>}
              {revealed && sel && !cor && <span className="text-xs flex-shrink-0">❌</span>}
            </button>
          );
        })}
      </div>

      {/* Reveal / Explanations */}
      {!revealed ? (
        <button onClick={() => setRevealed(true)}
          className="w-full py-2.5 rounded-xl bg-[#0070F2] hover:bg-[#0057C2] text-white text-sm font-bold transition-colors">
          ▶ Reveal Answer
        </button>
      ) : (
        <div className="flex flex-col gap-2.5">
          <div className="bg-[#EDFAF1] border border-[#6EE7B7] rounded-xl p-3">
            <p className="text-xs font-bold text-[#065F46] mb-1">✅ Why correct</p>
            <p className="text-sm text-[#065F46] leading-relaxed">{question.explanation}</p>
          </div>
          {Object.keys(question.wrongExp).length > 0 && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-3">
              <p className="text-xs font-bold text-[#991B1B] mb-2">❌ Why the others are wrong</p>
              {Object.entries(question.wrongExp).map(([idx, reason]) => (
                <p key={idx} className="text-sm text-[#991B1B] leading-snug mb-1">
                  <strong>{LETTERS[parseInt(idx)]}.</strong> {reason}
                </p>
              ))}
            </div>
          )}
          {question.tip && (
            <div className="bg-[#FFFBEA] border border-[#FDE68A] rounded-xl p-3">
              <p className="text-sm text-[#92400E] leading-relaxed">
                🎯 <strong>Exam Tip:</strong> {question.tip}
              </p>
            </div>
          )}
          <button onClick={reset}
            className="py-2 rounded-lg bg-transparent border border-[#E2E8F0] text-[#64748B] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors">
            ↺ Reset
          </button>
        </div>
      )}
    </div>
  );
}
