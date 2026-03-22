import Link from "next/link";
import type { Course } from "@/types";

export default function CourseCard({ course }: { course: Course }) {
  const totalMins = course.units.reduce((a, u) => a + u.lessons.reduce((b, l) => b + l.time, 0), 0);
  const hrs = (Math.round(totalMins / 6) / 10).toFixed(1);

  return (
    <div className="card-lift bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden shadow-sh-sm flex flex-col">
      <div className="h-1.5" style={{ background: `linear-gradient(90deg,${course.color},${course.color}70)` }} />
      <div className="p-6 pb-0 flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold bg-[#EBF4FF] text-[#0070F2] px-2.5 py-1 rounded-full uppercase tracking-[0.4px]">
            {course.badge}
          </span>
          <span className="text-xs text-[#94A3B8]">⏱ ~{hrs}h</span>
        </div>
        <h3 className="font-display text-[19px] font-black text-[#0F172A] mb-1.5 leading-snug">{course.title}</h3>
        <p className="text-sm font-semibold text-[#0070F2] mb-4">{course.subtitle}</p>
        <p className="text-sm text-[#475569] leading-relaxed mb-5">{course.description}</p>

        {/* Stats */}
        <div className="flex gap-4 flex-wrap p-3.5 bg-[#F8FAFC] rounded-xl mb-5 border border-[#E2E8F0]">
          {[
            { icon:"📚", label:`${course.modulesCount} lessons`    },
            { icon:"🎯", label:`${course.topicsCount}+ topics`      },
            { icon:"❓", label:`${course.questionsCount}+ questions` },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className="text-sm">{s.icon}</span>
              <span className="text-xs text-[#475569] font-semibold">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Unit list */}
        <div className="mb-6">
          {course.units.map(u => (
            <div key={u.id} className="flex items-center gap-2.5 py-2 border-b border-[#F1F5F9] last:border-0">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: u.color }} />
              <span className="text-sm text-[#334155] font-medium flex-1">{u.title}</span>
              <span className="text-xs text-[#94A3B8]">{u.lessons.length} lessons</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {course.tags.map(t => (
            <span key={t} className="text-[11px] px-2.5 py-1 bg-[#F1F5F9] rounded-full text-[#475569] font-semibold">{t}</span>
          ))}
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link href={`/courses/${course.id}`}
          className="block w-full text-center bg-[#0070F2] hover:bg-[#0057C2] text-white font-bold text-[15px] py-3.5 rounded-xl transition-colors shadow-sh-blue">
          Start Learning →
        </Link>
      </div>
    </div>
  );
}
