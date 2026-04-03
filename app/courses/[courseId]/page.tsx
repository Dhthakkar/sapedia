"use client";

import { useState, useEffect, useRef, useMemo, use } from "react";
import Link from "next/link";
import COURSE_REGISTRY from "@/data/registry";
import type { LessonWithUnit } from "@/types";
import { getCourseProgress, setLessonDone } from "@/lib/progress";
import DonationModal from "@/components/ui/DonationModal";
import PracticeQuestion from "@/components/ui/PracticeQuestion";
import MockExam from "@/components/ui/MockExam";
import { mockExamQuestions } from "@/data/courses/rise-with-sap/mock_exam";
import { u1l1Content, u1l2Content, u1l3Content } from "@/data/courses/rise-with-sap/u1_content";
import { u2l1Content, u2l2Content, u2l3Content, u2l4Content, u2l5Content } from "@/data/courses/rise-with-sap/u2_content";
import { u3l1Content } from "@/data/courses/rise-with-sap/u3_content";
import {
  StatsRow, EcosystemDiagram, Triangle, PhaseTimeline,
  DimensionWheel, CharacteristicsGrid, BTPStack, BeforeAfter,
  RISEvsGROW, PathwaysViz, ComponentPillars, EnhancementCards,
  BenefitsGrid,
} from "@/components/visuals/index";
import ITPillars from "@/components/visuals/ITPillars";
import ToolsTable from "@/components/visuals/ToolsTable";
import CleanStateVisual from "@/components/visuals/CleanStateVisual";
import { u1l1Questions } from "@/data/courses/rise-with-sap/questions/u1l1";
import { u1l2Questions } from "@/data/courses/rise-with-sap/questions/u1l2";
import { u1l3Questions } from "@/data/courses/rise-with-sap/questions/u1l3";

// ─────────────────────────────────────────────────────────────
// TOPIC TYPE — minimal, no sections
// visual: the diagram that tells the story
// insight: 2-3 lines max — plain language, exam tip woven in
// question: one checkpoint question, always visible
// ─────────────────────────────────────────────────────────────
interface Topic {
  id: string;
  title: string;
  visual: () => React.ReactNode;
  insight: string;
  question: {
    q: string;
    options: string[];
    correct: number;
    why: string;
  };
}

interface LessonData {
  intro: string;
  topics: Topic[];
}

// ─────────────────────────────────────────────────────────────
// LESSON CONTENT — teacher voice, no section headers
// ─────────────────────────────────────────────────────────────
function getLessons(): Record<string, LessonData> {
  return {
    "u1l1": u1l1Content,
    "u1l2": u1l2Content,
    "u1l3": u1l3Content,
    "u2l1": u2l1Content,
    "u2l2": u2l2Content,
    "u2l3": u2l3Content,
    "u2l4": u2l4Content,
    "u2l5": u2l5Content,
    "u3l1": u3l1Content,
  };
}

// ─────────────────────────────────────────────────────────────
// SINGLE TOPIC — minimal, no section labels
// ─────────────────────────────────────────────────────────────
function TopicCard({ topic, num, isComplete, onComplete }: {
  topic: Topic; num: number; isComplete: boolean; onComplete: () => void;
}) {
  const [answered, setAnswered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleAnswer = (idx: number) => {
    setAnswered(idx);
    if (idx === topic.question.correct) {
      onComplete();
    }
  };

  const correct = answered === topic.question.correct;

  return (
    <div ref={ref} id={topic.id} className="mb-16">
      {/* Topic number + title */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all duration-300 ${isComplete ? "bg-[#059669] text-white" : "bg-[#EBF4FF] text-[#0070F2]"}`}>
          {isComplete ? "✓" : num}
        </div>
        <h3 className="font-display text-[clamp(15px,2vw,19px)] font-black text-[#0F172A]">{topic.title}</h3>
      </div>

      {/* Visual — full width, clean */}
      <div className="mb-5 w-full" style={{ maxWidth: "100%", overflow: "hidden" }}>
        {topic.visual()}
      </div>

      {/* Insight — teacher voice, no label, no box colour */}
      <div className="mb-6">
        {topic.insight.split('\n\n').map((para, i) => (
          <p key={i} className={`text-[14.5px] text-[#334155] leading-[1.85] ${i > 0 ? "mt-4" : ""}`}>
            {para}
          </p>
        ))}
      </div>

      {/* Checkpoint question — always visible, no toggle */}
      <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <p className="text-xs font-bold text-[#64748B]">Quick check — {topic.question.q}</p>
        </div>
        <div className="p-3 flex flex-col gap-2">
          {topic.question.options.map((opt, i) => {
            const isSelected = answered === i;
            const isCorrect = i === topic.question.correct;
            let bg = "#fff", border = "#E2E8F0", color = "#334155";
            if (answered !== null) {
              if (isCorrect) { bg = "#EDFAF1"; border = "#6EE7B7"; color = "#065F46"; }
              else if (isSelected) { bg = "#FEF2F2"; border = "#FECACA"; color = "#991B1B"; }
            } else if (isSelected) {
              bg = "#EBF4FF"; border = "#0070F2"; color = "#0057C2";
            }
            return (
              <button key={i} onClick={() => { if (answered === null) { setAnswered(i); if (i === topic.question.correct) onComplete(); } }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: bg, border: `1.5px solid ${border}`, color, cursor: answered !== null ? "default" : "pointer" }}>
                {opt}
              </button>
            );
          })}
        </div>
        {answered !== null && (
          <div className={`px-4 py-3 border-t text-xs leading-relaxed ${correct ? "bg-[#EDFAF1] border-[#6EE7B7] text-[#065F46]" : "bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]"}`}>
            {correct ? "✓ " : "✗ "}{topic.question.why}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LESSON VIEW
// ─────────────────────────────────────────────────────────────
function LessonView({ lessonId, courseId }: { lessonId: string; courseId: string }) {
  const lessons = useMemo(() => getLessons(), []);
  const lesson = lessons[lessonId];
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  const markDone = (id: string) => {
    setCompletedTopics(p => {
      if (p[id]) return p;
      return { ...p, [id]: true };
    });
  };

  const finishLesson = () => {
    setLessonDone(courseId, lessonId, true);
    window.dispatchEvent(new Event("storage-update"));
  };

  if (!lesson) return (
    <div className="rounded-2xl border border-[#BFDBFE] bg-[#EBF4FF] p-10 text-center">
      <div className="text-4xl mb-4">📖</div>
      <h3 className="font-display text-lg font-black text-[#1E3A5F] mb-2">Coming Soon</h3>
      <p className="text-sm text-[#3B5E8C]">This lesson is being built. Check back soon.</p>
    </div>
  );

  const doneCount = lesson.topics.filter(t => completedTopics[t.id]).length;
  const totalCount = lesson.topics.length;

  return (
    <div>
      {/* Lesson intro — one line */}
      <p className="text-[15px] text-[#475569] mb-8 leading-relaxed">{lesson.intro}</p>

      {/* Progress within lesson */}
      <div className="flex items-center gap-3 mb-8 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
        <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-[#0070F2] rounded-full transition-all duration-500"
            style={{ width: `${totalCount > 0 ? (doneCount / totalCount) * 100 : 0}%` }} />
        </div>
        <span className="text-xs font-bold text-[#64748B] flex-shrink-0">{doneCount}/{totalCount} topics</span>
      </div>

      {/* Topics */}
      {lesson.topics.map((topic, i) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          num={i + 1}
          isComplete={!!completedTopics[topic.id]}
          onComplete={() => markDone(topic.id)}
        />
      ))}

      {/* Finish Lesson Button */}
      <div className="mt-12 pt-8 border-t border-[#E2E8F0] text-center">
        <button
          onClick={finishLesson}
          disabled={doneCount < totalCount}
          className={`px-10 py-4 rounded-2xl font-black transition-all shadow-xl ${
            doneCount < totalCount
              ? "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
              : "bg-[#0070F2] text-white hover:-translate-y-1 shadow-blue-200"
          }`}
        >
          {doneCount < totalCount ? `Complete all ${totalCount} topics to finish` : "Finish Lesson ✓"}
        </button>
        {doneCount >= totalCount && (
          <p className="mt-4 text-xs font-bold text-[#059669] animate-bounce">
            Great work! You've mastered this lesson.
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────
function Sidebar({ course, allLessons, activeId, onSelect, onSupport, onExam }: {
  course: typeof COURSE_REGISTRY[string];
  allLessons: LessonWithUnit[];
  activeId: string;
  onSelect: (id: string) => void;
  onSupport: () => void;
  onExam: () => void;
}) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setDone(getCourseProgress(course.id));
    // Re-read progress whenever localStorage changes (triggered by topic completion)
    const handler = () => setDone(getCourseProgress(course.id));
    window.addEventListener("storage-update", handler);
    return () => window.removeEventListener("storage-update", handler);
  }, [course.id]);

  const total = allLessons.length;
  const doneN = Object.values(done).filter(Boolean).length;
  const prog  = total > 0 ? Math.round((doneN / total) * 100) : 0;

  const toggle = (id: string) => {
    const next = !done[id];
    setDone(p => ({ ...p, [id]: next }));
    setLessonDone(course.id, id, next);
    window.dispatchEvent(new Event("storage-update"));
  };

  return (
    <aside className="flex flex-col bg-white border-r border-[#E2E8F0] h-full overflow-hidden" data-testid="sidebar">
      {/* Progress */}
      <div className="p-4 border-b border-[#E2E8F0] flex-shrink-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-bold text-[#475569] uppercase tracking-[0.5px]">Progress</span>
          <span className="text-sm font-black text-[#0070F2]">{prog}%</span>
        </div>
        <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#0070F2] to-[#38BDF8] rounded-full transition-all duration-500"
            style={{ width: `${prog}%` }} />
        </div>
        <p className="text-[11px] text-[#94A3B8] mt-1.5">{doneN} of {total} lessons done</p>
      </div>

      {/* Lesson list */}
      <div className="flex-1 overflow-y-auto py-2">
        {course.units.map(unit => (
          <div key={unit.id} className="mb-1">
            <div className="px-4 py-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: unit.color }} />
              <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.7px]">{unit.title}</span>
            </div>
            {unit.lessons.map(lesson => {
              const isA   = activeId === lesson.id;
              const isDone = !!done[lesson.id];
              return (
                <button key={lesson.id} onClick={() => onSelect(lesson.id)}
                  data-testid={`lesson-btn-${lesson.id}`}
                  className="w-full text-left px-3.5 py-3 min-h-[44px] flex items-start gap-2.5 border-none transition-all border-l-[3px]"
                  style={{ background: isA ? "#EBF4FF" : "transparent", borderLeftColor: isA ? "#0070F2" : "transparent", borderLeftStyle: "solid" }}>
                  <div onClick={e => { e.stopPropagation(); toggle(lesson.id); }}
                    className="w-[17px] h-[17px] rounded flex-shrink-0 flex items-center justify-center mt-0.5 cursor-pointer transition-all"
                    style={{ background: isDone ? "#0070F2" : "transparent", border: isDone ? "none" : "1.5px solid #CBD5E1" }}>
                    {isDone && <span className="text-white text-[9px] font-black">✓</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug break-words"
                      style={{ fontWeight: isA ? 700 : 500, color: isA ? "#0057C2" : "#334155" }}>
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-[#94A3B8]">~{lesson.time} min</span>
                      {lesson.hasContent && (
                        <span className="text-[9px] bg-[#EDFAF1] text-[#065F46] px-1.5 py-px rounded font-bold">LIVE</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Support */}
      <div className="p-3.5 border-t border-[#E2E8F0] bg-[#FFF8F0] flex-shrink-0 flex flex-col gap-2">
        <button onClick={onExam}
          className="w-full bg-[#0F172A] rounded-xl py-2.5 text-xs font-bold text-white flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
          📝 Practice Mock Exam
        </button>
        <button onClick={onSupport}
          className="w-full bg-transparent border border-[#FDE68A] rounded-xl py-2.5 text-xs font-bold text-[#92400E] flex items-center justify-center gap-2 hover:bg-[#FEF3C7] transition-colors">
          ☕ Support the Creator
        </button>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function CoursePage({ params: paramsPromise }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(paramsPromise);
  const course       = COURSE_REGISTRY[courseId];
  const [activeId, setActiveId] = useState("");
  const [sideOpen, setSideOpen] = useState(true);
  const [modal, setModal]       = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  const mainRef                 = useRef<HTMLDivElement>(null);

  const allLessons: LessonWithUnit[] = useMemo(() => {
    if (!course) return [];
    return course.units.flatMap(u =>
      u.lessons.map(l => ({ ...l, unitId: u.id, unitTitle: u.title, unitColor: u.color }))
    );
  }, [course]);

  useEffect(() => {
    if (allLessons.length > 0 && !activeId) setActiveId(allLessons[0].id);
  }, [allLessons, activeId]);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [activeId]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      const i = allLessons.findIndex(l => l.id === activeId);
      if (e.key === "ArrowRight" && i < allLessons.length - 1) setActiveId(allLessons[i + 1].id);
      if (e.key === "ArrowLeft"  && i > 0)                     setActiveId(allLessons[i - 1].id);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [activeId, allLessons]);

  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl font-black text-[#334155]">Course not found</p>
      <Link href="/" className="text-[#0070F2] font-semibold hover:underline">← Back to Home</Link>
    </div>
  );

  const ai   = allLessons.findIndex(l => l.id === activeId);
  const al   = allLessons[ai];
  const prev = ai > 0 ? allLessons[ai - 1] : null;
  const next = ai < allLessons.length - 1 ? allLessons[ai + 1] : null;
  const trunc = (s: string, n: number) => s.length > n ? s.slice(0, n) + "…" : s;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#0B1829] border-b border-white/[0.07] sticky top-0 z-50">
        <div className="px-5 h-[58px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/"
              className="flex-shrink-0 text-[#E2E8F0] border border-white/15 bg-white/[0.08] hover:bg-white/[0.16] text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
              ← Back
            </Link>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-[34px] h-[34px] flex-shrink-0 bg-gradient-to-br from-[#0070F2] to-[#0057C2] rounded-[9px] flex items-center justify-center text-[17px]">📘</div>
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-[#F1F5F9] font-display tracking-tight leading-none">SAPedia</p>
                <p className="text-[10px] text-[#475569] mt-0.5 truncate">{course.title}</p>
              </div>
            </div>
          </div>
          <button onClick={() => setModal(true)}
            className="flex-shrink-0 flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-[#E2E8F0] text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
            <span>☕</span><span className="hidden sm:inline">Support Creator</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 58px)" }}>
        {/* Sidebar */}
        <div className="flex-shrink-0 transition-all duration-300 overflow-hidden"
          style={{ width: sideOpen ? 272 : 0, minWidth: sideOpen ? 272 : 0 }}>
          <div className="w-[272px] h-full">
            <Sidebar
              course={course}
              allLessons={allLessons}
              activeId={activeId}
              onSelect={id => { setActiveId(id); }}
              onSupport={() => setModal(true)}
              onExam={() => setExamOpen(true)}
            />
          </div>
        </div>

        {/* Main */}
        <div className="flex flex-col flex-1 overflow-hidden" data-testid="lesson-content">
          {/* Toolbar */}
          <div className="h-[50px] px-5 flex-shrink-0 bg-white border-b border-[#E2E8F0] flex items-center gap-3">
            <button onClick={() => setSideOpen(o => !o)}
              data-testid="sidebar-toggle"
              className="flex-shrink-0 bg-transparent hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-sm text-[#64748B] transition-colors">
              {sideOpen ? "◀" : "▶"}
            </button>
            {al && (
              <div className="flex-1 flex items-center gap-2 min-w-0 overflow-hidden">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: al.unitColor }} />
                <span className="text-xs font-semibold text-[#334155] flex-shrink-0 hidden sm:block">{al.unitTitle}</span>
                <span className="text-[#CBD5E1] hidden sm:block">›</span>
                <span className="text-xs text-[#0F172A] font-medium truncate">{al.title}</span>
              </div>
            )}
            <span className="text-xs text-[#94A3B8] flex-shrink-0">{ai + 1}/{allLessons.length}</span>
          </div>

          {/* Content */}
          <div ref={mainRef} className="flex-1 overflow-y-auto">
            <div className="max-w-[760px] mx-auto px-[clamp(20px,4vw,40px)] py-[clamp(28px,4vw,44px)]">
              {al && (
                <div>
                  {/* Lesson header */}
                  <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.4px]"
                        style={{ background: `${al.unitColor}18`, color: al.unitColor }}>
                        {al.unitTitle}
                      </span>
                      <span className="text-xs text-[#94A3B8]">⏱ ~{al.time} min</span>
                    </div>
                    <h1 className="font-display text-[clamp(20px,3vw,28px)] font-black text-[#0F172A] leading-snug">
                      {al.title}
                    </h1>
                    <div className="w-10 h-[3px] rounded-full mt-2.5"
                      style={{ background: `linear-gradient(90deg,${al.unitColor},${al.unitColor}50)` }} />
                  </div>

                  <LessonView lessonId={al.id} courseId={courseId} />
                </div>
              )}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="px-5 py-3 flex-shrink-0 bg-white border-t border-[#E2E8F0] flex justify-between items-center gap-3">
            <button onClick={() => prev && setActiveId(prev.id)} disabled={!prev}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border"
              style={{ background: prev ? "#fff" : "#F8FAFC", borderColor: prev ? "#E2E8F0" : "transparent", color: prev ? "#334155" : "#CBD5E1", cursor: prev ? "pointer" : "default" }}>
              ← {prev ? trunc(prev.title, 24) : "Previous"}
            </button>
            <span className="text-xs text-[#94A3B8] flex-shrink-0">{ai + 1} / {allLessons.length}</span>
            <button onClick={() => next && setActiveId(next.id)} disabled={!next}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold border-0"
              style={{ background: next ? "#0070F2" : "#F8FAFC", color: next ? "#fff" : "#CBD5E1", cursor: next ? "pointer" : "default" }}>
              {next ? trunc(next.title, 24) : "Next"} →
            </button>
          </div>
        </div>
      </div>

      {modal && <DonationModal onClose={() => setModal(false)} trigger="sidebar" />}
      {examOpen && (
        <MockExam 
          questions={mockExamQuestions} 
          title="RISE with SAP Methodology — Full Mock Exam" 
          onClose={() => setExamOpen(false)} 
        />
      )}
    </div>
  );
}
