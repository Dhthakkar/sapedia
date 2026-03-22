"use client";
import { useEffect, useState } from "react";
import { getCourseProgress, setLessonDone } from "@/lib/progress";
import type { Course, LessonWithUnit } from "@/types";

interface LessonSidebarProps {
  course:       Course;
  allLessons:   LessonWithUnit[];
  activeId:     string;
  onSelect:     (id: string) => void;
  onSupport:    () => void;
}

export default function LessonSidebar({ course, allLessons, activeId, onSelect, onSupport }: LessonSidebarProps) {
  const [done, setDone]     = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");

  // Load persisted progress on mount
  useEffect(() => {
    setDone(getCourseProgress(course.id));
  }, [course.id]);

  const total    = allLessons.length;
  const doneN    = Object.values(done).filter(Boolean).length;
  const progress = total > 0 ? Math.round((doneN / total) * 100) : 0;

  const toggle = (lessonId: string) => {
    const next = !done[lessonId];
    setDone(prev => ({ ...prev, [lessonId]: next }));
    setLessonDone(course.id, lessonId, next);
  };

  const filteredUnits = search.trim()
    ? course.units.map(u => ({
        ...u,
        lessons: u.lessons.filter(l => l.title.toLowerCase().includes(search.toLowerCase())),
      })).filter(u => u.lessons.length > 0)
    : course.units;

  return (
    <aside className="flex flex-col bg-white border-r border-[#E2E8F0] h-full">
      {/* Progress */}
      <div className="p-4 border-b border-[#E2E8F0] flex-shrink-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-bold text-[#475569] uppercase tracking-[0.5px]">Your Progress</span>
          <span className="text-sm font-black text-[#0070F2]">{progress}%</span>
        </div>
        <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#0070F2] to-[#38BDF8] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[11px] text-[#94A3B8] mt-1.5">{doneN} of {total} lessons done</p>
      </div>

      {/* Search */}
      <div className="px-3.5 py-3 border-b border-[#E2E8F0] flex-shrink-0">
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">🔍</span>
          <input type="text" placeholder="Search lessons…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#334155] outline-none focus:border-[#0070F2] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Lesson tree */}
      <div className="flex-1 overflow-y-auto py-2.5">
        {filteredUnits.map(unit => (
          <div key={unit.id} className="mb-1">
            <div className="px-4 py-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: unit.color }} />
              <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.7px]">{unit.title}</span>
            </div>
            {unit.lessons.map(lesson => {
              const isActive = activeId === lesson.id;
              const isDone   = !!done[lesson.id];
              return (
                <button key={lesson.id}
                  onClick={() => onSelect(lesson.id)}
                  className="lesson-btn w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 border-none border-l-[3px] transition-all"
                  style={{
                    background:   isActive ? "#EBF4FF" : "transparent",
                    borderColor:  isActive ? "#0070F2" : "transparent",
                    borderLeftWidth: 3,
                    borderLeftStyle: "solid",
                  }}>
                  {/* Checkbox */}
                  <button
                    onClick={e => { e.stopPropagation(); toggle(lesson.id); }}
                    className="w-[17px] h-[17px] rounded flex-shrink-0 flex items-center justify-center transition-all mt-0.5 p-0 border-0"
                    style={{
                      background: isDone ? "#0070F2" : "transparent",
                      border:     isDone ? "none"    : "1.5px solid #CBD5E1",
                    }}>
                    {isDone && <span className="text-white text-[9px] font-black">✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug break-words"
                      style={{ fontWeight: isActive ? 700 : 500, color: isActive ? "#0057C2" : "#334155" }}>
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
      <div className="p-3.5 border-t border-[#E2E8F0] bg-[#FFF8F0] flex-shrink-0">
        <button onClick={onSupport}
          className="w-full bg-transparent border border-[#FDE68A] rounded-xl py-2.5 text-xs font-bold text-[#92400E] flex items-center justify-center gap-2 hover:bg-[#FEF3C7] transition-colors">
          ☕ Support the Creator
        </button>
      </div>
    </aside>
  );
}
