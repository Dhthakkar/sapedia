// ═══════════════════════════════════════════════════════
// Analytics — Google Analytics 4
// Add your GA4 Measurement ID to .env.local:
//   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
// All events are typed. Add new events here as needed.
// ═══════════════════════════════════════════════════════

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const isAnalyticsEnabled = !!GA_ID;

function track(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  window.gtag("event", eventName, params);
}

// ─── Events ──────────────────────────────────────────────
export const Analytics = {
  pageView: (url: string) => track("page_view", { page_path: url }),

  courseStarted: (courseId: string, courseTitle: string) =>
    track("course_started", { course_id: courseId, course_title: courseTitle }),

  lessonViewed: (courseId: string, lessonId: string, lessonTitle: string) =>
    track("lesson_viewed", { course_id: courseId, lesson_id: lessonId, lesson_title: lessonTitle }),

  lessonCompleted: (courseId: string, lessonId: string) =>
    track("lesson_completed", { course_id: courseId, lesson_id: lessonId }),

  questionAttempted: (courseId: string, lessonId: string, topicId: string) =>
    track("question_attempted", { course_id: courseId, lesson_id: lessonId, topic_id: topicId }),

  supportClicked: (source: string) =>
    track("support_clicked", { source }),

  searchUsed: (query: string) =>
    track("search_used", { query }),
};
