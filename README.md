# SAPedia — SAP Learning Platform

An independent, visual SAP learning platform built with Next.js 14, Tailwind CSS, and TypeScript.

## Quick Start (2 commands)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 14** — App Router, SSR, file-based routing
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Full type safety
- **localStorage** — Progress persistence (no login required)
- **Google Analytics 4** — Optional analytics

## Project Structure

```
app/              → Next.js pages and routes
components/       → Reusable UI components
  layout/         → Header, Footer
  ui/             → FlipCard, PracticeQuestion, Counter, DonationModal
  visuals/        → Interactive diagram components
  lesson/         → TopicSection, LessonSidebar
  catalog/        → CourseCard
data/             → All content and config (no UI here)
  config.ts       → Platform name, creator support links
  registry.ts     → Course registry (add new courses here)
  courses/        → Per-course content and questions
lib/              → Utilities (progress, analytics)
types/            → TypeScript type definitions
```

## Adding a New Course

1. Create `data/courses/your-course-id/index.tsx` with lesson content
2. Add the course object to `data/registry.ts`
3. Done — UI auto-picks it up

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

## Deployment (Vercel — free)

1. Push to GitHub
2. Connect repo at vercel.com
3. Deploy — done

## Legal

- Independent platform — not affiliated with SAP SE
- All examples (Akshar Industries etc.) are fictional
- SAP® and related marks are registered trademarks of SAP SE
