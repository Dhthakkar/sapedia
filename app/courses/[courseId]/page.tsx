"use client";

import { useState, useEffect, useRef, useMemo, use, useCallback } from "react";
import Link from "next/link";
import COURSE_REGISTRY from "@/data/registry";
import type { LessonWithUnit } from "@/types";
import { getCourseProgress, setLessonDone, setTopicVisited, getVisitedTopics } from "@/lib/progress";
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
    type?: string; // Relaxed for inferred string types
    count?: number;
    options: string[];
    correct: number[];
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
// SINGLE TOPIC — robust multi-select and validation logic
// ─────────────────────────────────────────────────────────────
function TopicCard({ topic, num, isComplete, onComplete, onVisit }: {
  topic: Topic; num: number; isComplete: boolean; onComplete: () => void; onVisit: () => void;
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isMulti = topic.question.type === "multi";
  const requiredCount = isMulti ? (topic.question.count || 1) : 1;
  const correctAnswers = Array.isArray(topic.question.correct) 
    ? topic.question.correct 
    : [topic.question.correct];

  // Mark as visited when enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisit(); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onVisit]);

  const handleSelect = (idx: number) => {
    if (submitted) return;

    if (!isMulti) {
      const newSelected = [idx];
      setSelected(newSelected);
      setSubmitted(true);
      if (idx === correctAnswers[0]) onComplete();
    } else {
      setSelected(prev => {
        if (prev.includes(idx)) return prev.filter(i => i !== idx);
        if (prev.length >= requiredCount) return prev;
        
        const next = [...prev, idx];
        if (next.length === requiredCount) {
          setSubmitted(true);
          const isAllCorrect = next.length === correctAnswers.length && 
                               next.every(val => correctAnswers.includes(val));
          if (isAllCorrect) onComplete();
        }
        return next;
      });
    }
  };

  const isCorrect = submitted && 
                    selected.length === correctAnswers.length && 
                    selected.every(val => correctAnswers.includes(val));

  return (
    <div ref={ref} id={topic.id} className="mb-24 scroll-mt-24">
      {/* Topic number + title */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-black flex-shrink-0 transition-all duration-300 ${isComplete ? "bg-[#059669] text-white shadow-lg shadow-emerald-100" : "bg-[#EBF4FF] text-[#0070F2]"}`}>
          {isComplete ? "✓" : num}
        </div>
        <h3 className="font-display text-[clamp(16px,2.5vw,20px)] font-black text-[#0F172A]">{topic.title}</h3>
      </div>

      {/* Visual Container — Forced aspect ratio and separation */}
      <div className="mb-10 w-full bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-visible p-4 md:p-8">
        {topic.visual()}
      </div>

      {/* Insight */}
      <div className="mb-8 px-2">
        {topic.insight.split('\n\n').map((para, i) => (
          <p key={i} className={`text-[15px] text-[#334155] leading-[1.8] ${i > 0 ? "mt-4" : ""}`}>
            {para}
          </p>
        ))}
      </div>

      {/* Checkpoint question */}
      <div className="border-2 border-slate-100 rounded-[24px] overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
        <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
            Quick check {isMulti ? `(Select ${requiredCount})` : ""}
          </p>
          {submitted && (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              {isCorrect ? "Correct" : "Incorrect"}
            </span>
          )}
        </div>
        
        <div className="p-5 flex flex-col gap-3">
          <p className="text-[15px] font-bold text-[#0F172A] mb-2">{topic.question.q}</p>
          {topic.question.options.map((opt, i) => {
            const isSelected = selected.includes(i);
            const isCorrectOption = correctAnswers.includes(i);
            
            let bg = "#fff", border = "#F1F5F9", color = "#475569";
            
            if (submitted) {
              if (isCorrectOption) {
                bg = "#F0FDF4"; border = "#4ADE80"; color = "#166534";
              } else if (isSelected) {
                bg = "#FEF2F2"; border = "#FCA5A5"; color = "#991B1B";
              }
            } else if (isSelected) {
              bg = "#EFF6FF"; border = "#3B82F6"; color = "#1E40AF";
            }

            return (
              <button 
                key={i} 
                onClick={() => handleSelect(i)}
                className="w-full text-left px-4 py-3.5 rounded-xl text-[14px] font-semibold transition-all flex items-center gap-3"
                style={{ background: bg, border: `2px solid ${border}`, color }}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${isSelected ? "bg-current border-current text-white" : "border-slate-200"}`}>
                  {isSelected && <span className="text-[10px]">✓</span>}
                </div>
                {opt}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className={`px-5 py-4 border-t text-[13px] leading-relaxed font-medium ${isCorrect ? "bg-emerald-50 text-emerald-800 border-emerald-100" : "bg-red-50 text-red-800 border-red-100"}`}>
            <div className="flex gap-2">
              <span className="text-lg leading-none">{isCorrect ? "✅" : "❌"}</span>
              <p>{topic.question.why}</p>
            </div>
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
  const rawLesson = lessons[lessonId];
  
  // Randomize topics on load
  const lesson = useMemo(() => {
    if (!rawLesson) return null;
    const shuffled = [...rawLesson.topics].sort(() => Math.random() - 0.5);
    return { ...rawLesson, topics: shuffled };
  }, [rawLesson]);

  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [visitedTopics, setVisitedTopics]     = useState<Record<string, boolean>>({});
  const endRef = useRef<HTMLDivElement>(null);

  const markDone = useCallback((id: string) => {
    setCompletedTopics(p => {
      if (p[id]) return p;
      return { ...p, [id]: true };
    });
  }, []);

  const markVisited = useCallback((id: string) => {
    setVisitedTopics(p => {
      if (p[id]) return p;
      setTopicVisited(courseId, id);
      setTimeout(() => {
        window.dispatchEvent(new Event("storage-update"));
      }, 0);
      return { ...p, [id]: true };
    });
  }, [courseId]);

  const finishLesson = useCallback(() => {
    setLessonDone(courseId, lessonId, true);
    window.dispatchEvent(new Event("storage-update"));
  }, [courseId, lessonId]);

  // Auto-finish when end of page is reached
  useEffect(() => {
    const el = endRef.current;
    if (!el || !lesson) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const allDone = lesson.topics.every(t => completedTopics[t.id]);
        if (allDone) {
          finishLesson();
        }
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [completedTopics, lesson, finishLesson]);

  if (!lesson) return (
    <div className="rounded-2xl border border-[#BFDBFE] bg-[#EBF4FF] p-10 text-center">
      <div className="text-4xl mb-4">📖</div>
      <h3 className="font-display text-lg font-black text-[#1E3A5F] mb-2">Coming Soon</h3>
      <p className="text-sm text-[#3B5E8C]">This lesson is being built. Check back soon.</p>
    </div>
  );

  const doneCount = lesson.topics.filter(t => completedTopics[t.id]).length;
  const visitCount = lesson.topics.filter(t => visitedTopics[t.id]).length;
  const totalCount = lesson.topics.length;
  const isLessonFinished = lesson.topics.every(t => completedTopics[t.id]) && visitCount === totalCount;

  return (
    <div>
      {/* Lesson intro — one line */}
      <p className="text-[15px] text-[#475569] mb-8 leading-relaxed">{lesson.intro}</p>

      {/* Progress within lesson — based on visits */}
      <div className="flex items-center gap-3 mb-8 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
        <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-[#0070F2] rounded-full transition-all duration-500"
            style={{ width: `${totalCount > 0 ? (visitCount / totalCount) * 100 : 0}%` }} />
        </div>
        <span className="text-xs font-bold text-[#64748B] flex-shrink-0">{visitCount}/{totalCount} explored</span>
      </div>

      {/* Topics */}
      {lesson.topics.map((topic, i) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          num={i + 1}
          isComplete={!!completedTopics[topic.id]}
          onComplete={() => markDone(topic.id)}
          onVisit={() => markVisited(topic.id)}
        />
      ))}

      {/* Completion Section */}
      <div className="mt-16 pt-10 border-t-2 border-slate-100 text-center relative">
        {doneCount >= totalCount ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-6 shadow-lg shadow-emerald-50">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="font-display text-2xl font-black text-slate-900 mb-2">Lesson Mastered!</h3>
            <p className="text-slate-500 font-medium mb-8">You've successfully completed all topics and checkpoints.</p>
            <button
              onClick={finishLesson}
              className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-black transition-all shadow-xl shadow-emerald-100 hover:-translate-y-1 active:scale-95"
            >
              Mark Lesson as Done ✓
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 text-slate-400 rounded-full mb-4">
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-2">Finish Line</p>
            <p className="text-slate-500 text-sm mb-6">Complete all {totalCount} topics to finish this lesson.</p>
            <div className="w-full max-w-[240px] mx-auto h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(doneCount / totalCount) * 100}%` }} />
            </div>
          </div>
        )}
      </div>
      
      {/* Finish Line Sensor */}
      <div ref={endRef} className="h-20 w-full" />
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
  const [visited, setVisited] = useState<string[]>([]);

  const lessons = useMemo(() => getLessons(), []);
  const totalTopics = useMemo(() => {
    return allLessons.reduce((sum, l) => sum + (lessons[l.id]?.topics.length || 0), 0);
  }, [allLessons, lessons]);

  useEffect(() => {
    const refresh = () => {
      setDone(getCourseProgress(course.id));
      setVisited(getVisitedTopics(course.id));
    };
    refresh();
    window.addEventListener("storage-update", refresh);
    return () => window.removeEventListener("storage-update", refresh);
  }, [course.id]);

  const totalLessons = allLessons.length;
  const doneLessons  = Object.values(done).filter(Boolean).length;
  const prog         = totalTopics > 0 ? Math.round((visited.length / totalTopics) * 100) : 0;

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
        <p className="text-[11px] text-[#94A3B8] mt-1.5">{doneLessons} of {totalLessons} lessons done</p>
      </div>

      {/* Lesson list */}
      <div className="flex-1 overflow-y-auto py-2">
        {course.units.map(unit => {
          const unitLessonsDone = unit.lessons.every(l => !!done[l.id]);
          return (
            <div key={unit.id} className="mb-1">
              <div className="px-4 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                    style={{ background: unitLessonsDone ? "#059669" : unit.color }} />
                  <span className={`text-[10px] font-black uppercase tracking-[0.7px] truncate ${unitLessonsDone ? "text-[#059669]" : "text-[#94A3B8]"}`}>
                    {unit.title}
                  </span>
                </div>
                {unitLessonsDone && (
                  <span className="text-[9px] font-black text-[#059669] bg-[#EDFAF1] px-1.5 py-0.5 rounded flex-shrink-0">
                    DONE ✓
                  </span>
                )}
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
        )})}
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
