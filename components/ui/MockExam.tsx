"use client";

import React, { useState, useEffect, useRef } from "react";
import { Question } from "@/types";
import DonationModal from "./DonationModal";

interface MockExamProps {
  questions: Question[];
  title: string;
  timeLimit?: number; // in minutes
  onClose: () => void;
}

export default function MockExam({ questions, title, timeLimit = 45, onClose }: MockExamProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [showDonation, setShowDonation] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelect = (optionIdx: number) => {
    if (isFinished) return;
    
    const question = questions[currentIdx];
    const currentAnswers = answers[currentIdx] || [];

    if (question.type === "single") {
      setAnswers({ ...answers, [currentIdx]: [optionIdx] });
    } else {
      if (currentAnswers.includes(optionIdx)) {
        setAnswers({
          ...answers,
          [currentIdx]: currentAnswers.filter((i) => i !== optionIdx),
        });
      } else {
        if (currentAnswers.length < (question.count || 1)) {
          setAnswers({
            ...answers,
            [currentIdx]: [...currentAnswers, optionIdx].sort(),
          });
        }
      }
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      const userAns = answers[i] || [];
      const isCorrect = 
        userAns.length === q.correct.length && 
        userAns.every((val, index) => val === q.correct[index]);
      if (isCorrect) correct++;
    });
    return { score: correct, total: questions.length, percent: Math.round((correct / questions.length) * 100) };
  };

  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFinished(true);
    // Show donation modal after a short delay if they did well
    const { percent } = calculateScore();
    if (percent >= 70) {
      setTimeout(() => setShowDonation(true), 2000);
    }
  };

  if (isFinished) {
    const { score, total, percent } = calculateScore();
    const passed = percent >= 70;

    return (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-sm animate-fade-in">
        <div className="w-full max-w-2xl overflow-hidden rounded-[32px] bg-white shadow-2xl animate-scale-in">
          <div className="bg-slate-50 p-8 text-center border-b border-slate-100">
            <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-lg ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              {passed ? "🎓" : "📚"}
            </div>
            <h2 className="font-display text-3xl font-black text-slate-900">Exam Results</h2>
            <p className="mt-2 text-slate-500 font-medium">{title}</p>
          </div>
          
          <div className="p-10">
            <div className="mb-10 flex justify-around">
              <div className="text-center">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Score</p>
                <p className="text-4xl font-black text-slate-900">{score}/{total}</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Percentage</p>
                <p className={`text-4xl font-black ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>{percent}%</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
                <p className={`text-4xl font-black ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {passed ? "PASS" : "FAIL"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
              <h4 className="font-display font-black text-slate-900 mb-2">
                {passed ? "Fantastic work!" : "Keep practicing!"}
              </h4>
              <p className="text-sm leading-relaxed text-slate-600">
                {passed 
                  ? "You have a solid grasp of the RISE with SAP Methodology. You're well on your way to certification readiness."
                  : "Don't worry! SAP concepts are complex. Review the course material again and pay close attention to the interactive diagrams and 'Exam Tips'."}
              </p>
            </div>

            <div className="mt-10 flex gap-4">
              <button onClick={onClose} className="flex-1 rounded-2xl bg-slate-100 py-4 font-black text-slate-600 transition-colors hover:bg-slate-200">
                Back to Course
              </button>
              {passed && (
                <button onClick={() => setShowDonation(true)} className="flex-1 rounded-2xl bg-blue-600 py-4 font-black text-white shadow-lg shadow-blue-200 transition-transform hover:-translate-y-1">
                  ☕ Support the Creator
                </button>
              )}
            </div>
          </div>
        </div>
        {showDonation && <DonationModal onClose={() => setShowDonation(false)} trigger="post-exam" />}
      </div>
    );
  }

  const q = questions[currentIdx];
  const userAns = answers[currentIdx] || [];

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col bg-white animate-fade-in">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-100 bg-slate-900 px-6 text-white">
        <div className="flex items-center gap-4">
          <span className="text-xl">📝</span>
          <div>
            <h3 className="font-display text-sm font-black leading-tight">{title}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mock Exam Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time Remaining</p>
            <p className={`font-mono text-lg font-black leading-none ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition-colors">
            ✕
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-64 border-r border-slate-100 bg-slate-50/50 p-6 overflow-y-auto hidden md:block">
          <h4 className="mb-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Questions</h4>
          <div className="grid grid-cols-4 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black transition-all ${
                  currentIdx === i
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : answers[i]?.length > 0
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-white text-slate-400 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-blue-50 p-4 border border-blue-100">
            <p className="text-[10px] font-black uppercase tracking-wider text-blue-600 mb-1">Exam Tip</p>
            <p className="text-[11px] leading-relaxed text-blue-700 font-medium">
              Read carefully! SAP exams often use "Not", "Only", or "Exactly" to trick you.
            </p>
          </div>
        </aside>

        {/* Question Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/30 p-8 md:p-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex items-center justify-between">
              <span className="rounded-full bg-blue-100 px-4 py-1.5 text-[11px] font-black text-blue-700 uppercase tracking-wider">
                Question {currentIdx + 1} of {questions.length}
              </span>
              {q.type === "multi" && (
                <span className="rounded-full bg-amber-100 px-4 py-1.5 text-[11px] font-black text-amber-700 uppercase tracking-wider">
                  Select {q.count} answers
                </span>
              )}
            </div>

            <h2 className="mb-10 font-display text-[22px] font-black leading-snug text-slate-900">
              {q.q}
            </h2>

            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => {
                const isSelected = userAns.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`group relative flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                        : "border-white bg-white hover:border-slate-200 hover:shadow-sm"
                    }`}
                  >
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                      isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 group-hover:border-slate-300"
                    }`}>
                      {isSelected && <span className="text-[10px] font-black">✓</span>}
                    </div>
                    <span className={`text-sm font-bold ${isSelected ? "text-blue-900" : "text-slate-600"}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="rounded-xl px-6 py-3 text-sm font-black text-slate-400 hover:text-slate-600 disabled:opacity-30"
              >
                ← Previous
              </button>
              
              {currentIdx === questions.length - 1 ? (
                <button
                  onClick={finishExam}
                  className="rounded-xl bg-slate-900 px-10 py-4 text-sm font-black text-white shadow-xl shadow-slate-200 transition-transform hover:-translate-y-1 active:scale-95"
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="rounded-xl bg-blue-600 px-10 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition-transform hover:-translate-y-1 active:scale-95"
                >
                  Next Question →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
