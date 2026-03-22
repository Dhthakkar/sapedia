// ═══════════════════════════════════════════════════════
// SAPEDIA — Type Definitions
// All data shapes for the entire platform live here.
// When adding a new course, these types enforce correctness.
// ═══════════════════════════════════════════════════════

// ─── Question ───────────────────────────────────────────
export type QuestionType = "single" | "multi";

export interface Question {
  q: string;
  type: QuestionType;
  count?: number;           // For multi — how many correct answers
  options: string[];
  correct: number[];        // Indices of correct options
  explanation: string;
  wrongExp: Record<number, string>; // Index → reason it's wrong
  tip: string;
}

// ─── Jargon Buster ──────────────────────────────────────
export interface JargonTerm {
  term: string;
  simple: string;
  inSystem: string;
  inExam: string;
  color?: string;
}

// ─── Visual Topic ────────────────────────────────────────
export interface TopicVisual {
  visual: () => React.ReactNode;  // Interactive diagram / chart
  keyPoints: string[];            // 3 bullet points max
  jargon: JargonTerm[];          // Flip cards
  akshar: string;                 // Real-world example (Akshar Industries)
  exam: string;                   // Exam insight
  mistake: string;                // Common mistake
  summary: string[];              // 30-second summary (3 items)
  questions: Question[];          // Practice questions
}

// ─── Lesson ──────────────────────────────────────────────
export interface Lesson {
  id: string;
  title: string;
  time: number;             // Estimated read time in minutes
  hasContent?: boolean;     // True if full content is available
}

export interface LessonWithUnit extends Lesson {
  unitId: string;
  unitTitle: string;
  unitColor: string;
}

// ─── Unit ────────────────────────────────────────────────
export interface Unit {
  id: string;
  title: string;
  color: string;
  lessons: Lesson[];
}

// ─── Lesson Meta (content index) ─────────────────────────
export interface LessonMeta {
  intro: string;
  topics: string[];           // Topic IDs in order
  topicTitles: string[];      // Topic display titles
}

// ─── Course ──────────────────────────────────────────────
export interface Course {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  topicsCount: number;
  modulesCount: number;
  questionsCount: number;
  description: string;
  units: Unit[];
  tags: string[];
  available: boolean;
}

// ─── Platform Config ─────────────────────────────────────
export interface PlatformConfig {
  name: string;
  tagline: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubline: string;
  footerLine1: string;
  footerLine2: string;
  footerLine3: string;
}

// ─── Creator Support ─────────────────────────────────────
export interface CreatorSupportConfig {
  paypal: string;
  upi: string;
  buymeacoffee: string;
  bankTransfer: string;
  supportHeading: string;
  supportMessage: string;
}

// ─── Progress ────────────────────────────────────────────
export interface CourseProgress {
  [lessonId: string]: boolean;
}

export interface AllProgress {
  [courseId: string]: CourseProgress;
}
