// ═══════════════════════════════════════════════════════
// Progress tracking — localStorage backed
// Progress persists across browser sessions automatically.
// No login required. When auth is added later, this data
// can be migrated to Supabase per user.
// ═══════════════════════════════════════════════════════
import type { AllProgress, CourseProgress } from "@/types";

const KEY = "sapedia_progress";

function load(): AllProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AllProgress) : {};
  } catch {
    return {};
  }
}

function save(data: AllProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // localStorage might be full or disabled — fail silently
  }
}

export function getLessonDone(courseId: string, lessonId: string): boolean {
  const all = load();
  return !!all[courseId]?.[lessonId];
}

export function setLessonDone(courseId: string, lessonId: string, done: boolean): void {
  const all = load();
  if (!all[courseId]) all[courseId] = {};
  all[courseId][lessonId] = done;
  save(all);
}

export function getCourseProgress(courseId: string): CourseProgress {
  const all = load();
  return all[courseId] ?? {};
}

export function getCourseProgressPercent(courseId: string, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  const progress = getCourseProgress(courseId);
  const done = Object.values(progress).filter(Boolean).length;
  return Math.round((done / totalLessons) * 100);
}

export function resetCourseProgress(courseId: string): void {
  const all = load();
  delete all[courseId];
  save(all);
}
