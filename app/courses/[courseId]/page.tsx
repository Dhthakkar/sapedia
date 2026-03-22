"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { notFound }        from "next/navigation";
import Header              from "@/components/layout/Header";
import LessonSidebar       from "@/components/lesson/LessonSidebar";
import DonationModal       from "@/components/ui/DonationModal";
import COURSE_REGISTRY     from "@/data/registry";
import { getLessonContent } from "@/data/courses/rise-with-sap";
import TopicSection        from "@/components/lesson/TopicSection";
import type { LessonWithUnit } from "@/types";

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = COURSE_REGISTRY[params.courseId];
  if (!course) notFound();

  const allLessons: LessonWithUnit[] = useMemo(() =>
    course.units.flatMap(u => u.lessons.map(l => ({ ...l, unitId: u.id, unitTitle: u.title, unitColor: u.color }))),
    [course]
  );

  const [activeId, setActiveId]   = useState(allLessons[0]?.id ?? "");
  const [sideOpen, setSideOpen]   = useState(true);
  const [modal, setModal]         = useState(false);
  const [trigger, setTrigger]     = useState<"manual"|"sidebar">("manual");
  const mainRef                   = useRef<HTMLDivElement>(null);

  const activeIdx    = allLessons.findIndex(l => l.id === activeId);
  const activeLesson = allLessons[activeIdx];
  const prevLesson   = activeIdx > 0 ? allLessons[activeIdx - 1] : null;
  const nextLesson   = activeIdx < allLessons.length - 1 ? allLessons[activeIdx + 1] : null;
  const trunc        = (s: string, n: number) => s.length > n ? s.slice(0, n) + "…" : s;

  // Keyboard navigation
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "ArrowRight" && nextLesson) setActiveId(nextLesson.id);
      if (e.key === "ArrowLeft"  && prevLesson) setActiveId(prevLesson.id);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [nextLesson, prevLesson]);

  // Scroll to top on lesson change
  useEffect(() => { if (mainRef.current) mainRef.current.scrollTop = 0; }, [activeId]);

  const lessonContent = getLessonContent(activeId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onSupportClick={() => { setTrigger("sidebar"); setModal(true); }}
        courseTitle={course.title}
        courseId={course.id}
      />

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 58px)" }}>
        {/* Sidebar */}
        <div className="flex-shrink-0 transition-all duration-300 overflow-hidden"
          style={{ width: sideOpen ? 272 : 0, minWidth: sideOpen ? 272 : 0 }}>
          {sideOpen && (
            <LessonSidebar
              course={course}
              allLessons={allLessons}
              activeId={activeId}
              onSelect={setActiveId}
              onSupport={() => { setTrigger("sidebar"); setModal(true); }}
            />
          )}
        </div>

        {/* Main */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Toolbar */}
          <div className="h-[50px] px-6 flex-shrink-0 bg-white border-b border-[#E2E8F0] flex items-center gap-3">
            <button onClick={() => setSideOpen(o => !o)}
              className="flex-shrink-0 bg-transparent hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-sm text-[#64748B] transition-colors">
              {sideOpen ? "◀" : "▶"}
            </button>
            {activeLesson && (
              <div className="flex-1 flex items-center gap-2 min-w-0 overflow-hidden">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: activeLesson.unitColor }} />
                <span className="text-xs font-semibold text-[#334155] flex-shrink-0">{activeLesson.unitTitle}</span>
                <span className="text-[#CBD5E1]">›</span>
                <span className="text-xs text-[#0F172A] font-medium truncate">{activeLesson.title}</span>
              </div>
            )}
            <span className="text-xs text-[#94A3B8] flex-shrink-0">{activeIdx + 1}/{allLessons.length}</span>
          </div>

          {/* Lesson content */}
          <div ref={mainRef} className="flex-1 overflow-y-auto">
            <div className="max-w-[820px] mx-auto px-[clamp(20px,4vw,36px)] py-[clamp(28px,5vw,48px)]">
              {activeLesson && (
                <div className="animate-fade-up">
                  {/* Lesson header */}
                  <div className="mb-7">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.4px]"
                        style={{ background: `${activeLesson.unitColor}18`, color: activeLesson.unitColor }}>
                        {activeLesson.unitTitle}
                      </span>
                      <span className="text-xs text-[#94A3B8]">⏱ ~{activeLesson.time} min</span>
                      {activeLesson.hasContent && (
                        <span className="text-[11px] bg-[#EDFAF1] text-[#065F46] px-2 py-0.5 rounded-md font-bold">
                          ✅ Visual Content
                        </span>
                      )}
                    </div>
                    <h1 className="font-display text-[clamp(20px,3.5vw,30px)] font-black text-[#0F172A] leading-snug">
                      {activeLesson.title}
                    </h1>
                    <div className="w-12 h-[3px] rounded-full mt-2.5"
                      style={{ background: `linear-gradient(90deg,${activeLesson.unitColor},${activeLesson.unitColor}60)` }} />
                  </div>

                  {/* Independent content notice */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 mb-6 flex items-start gap-2.5">
                    <span className="text-sm flex-shrink-0 mt-0.5">ℹ️</span>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      <strong className="text-[#334155]">Independently created content.</strong>{" "}
                      Written from the author&apos;s professional SAP experience — not reproduced from any official SAP training material.
                      All examples (Akshar Industries, Nirav Shah etc.) are fictional. SAP® product names are used for identification only.
                    </p>
                  </div>

                  {/* Lesson intro */}
                  {lessonContent && (
                    <div className="bg-gradient-to-br from-[#EBF4FF] to-[#F0F7FF] border border-[#BFDBFE] rounded-2xl p-4 mb-8">
                      <p className="text-sm text-[#1E3A5F] leading-[1.75]">💡 {lessonContent.intro}</p>
                    </div>
                  )}

                  {/* Topic quick nav */}
                  {lessonContent && (
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 mb-9">
                      <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.7px] mb-2.5">Topics in this lesson</p>
                      {lessonContent.topicTitles.map((t, i) => (
                        <a key={i} href={`#${lessonContent.topics[i]}`}
                          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors">
                          <span className="w-5 h-5 rounded-md bg-[#EBF4FF] flex items-center justify-center text-[10px] font-black text-[#0070F2] flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-sm text-[#334155] font-medium">{t}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Topics */}
                  {lessonContent ? (
                    lessonContent.topics.map((tid, i) => {
                      const visual = lessonContent.visuals[tid];
                      if (!visual) return null;
                      return (
                        <TopicSection
                          key={tid}
                          topicId={tid}
                          topicNum={i + 1}
                          title={lessonContent.topicTitles[i]}
                          visual={visual}
                        />
                      );
                    })
                  ) : (
                    <div className="bg-gradient-to-br from-[#EBF4FF] to-[#F0F7FF] border border-[#BFDBFE] rounded-[20px] p-[clamp(32px,5vw,56px)] text-center">
                      <div className="text-5xl mb-5 animate-float">📖</div>
                      <h3 className="font-display text-xl font-black text-[#1E3A5F] mb-3">Full Content — Coming Soon</h3>
                      <p className="text-sm text-[#3B5E8C] leading-relaxed max-w-md mx-auto">
                        This lesson is being built with visual diagrams, interactive elements, and Akshar Industries examples.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="px-6 py-3.5 flex-shrink-0 bg-white border-t border-[#E2E8F0] flex justify-between items-center gap-3">
            <button onClick={() => prevLesson && setActiveId(prevLesson.id)} disabled={!prevLesson}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border"
              style={{ background: prevLesson ? "#fff" : "#F8FAFC", borderColor: prevLesson ? "#E2E8F0" : "transparent", color: prevLesson ? "#334155" : "#CBD5E1", cursor: prevLesson ? "pointer" : "default" }}>
              ← {prevLesson ? trunc(prevLesson.title, 22) : "Previous"}
            </button>
            <span className="text-xs text-[#94A3B8] flex-shrink-0">{activeIdx + 1} / {allLessons.length}</span>
            <button onClick={() => nextLesson && setActiveId(nextLesson.id)} disabled={!nextLesson}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border-0"
              style={{ background: nextLesson ? "#0070F2" : "#F8FAFC", color: nextLesson ? "#fff" : "#CBD5E1", cursor: nextLesson ? "pointer" : "default" }}>
              {nextLesson ? trunc(nextLesson.title, 22) : "Next"} →
            </button>
          </div>
        </div>
      </div>

      {modal && <DonationModal onClose={() => setModal(false)} trigger={trigger} />}
    </div>
  );
}
