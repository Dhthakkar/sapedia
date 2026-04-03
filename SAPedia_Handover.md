# SAPedia — Project Handover Document
> Last updated: April 2026 | Status: Active Development

---

## 1. What Is This Project & Its Goal

**SAPedia** is a free, visual, practitioner-built SAP learning platform — built and owned by Dhruv Thakkar.

**Mission:** Replace dry SAP documentation with structured, exam-ready, interactive course content that a working professional can absorb in 1 day.

**Target audience:** SAP professionals, partners, and customers preparing for SAP certification exams — starting with *"Introducing RISE with SAP — Methodology for SAP Partners & Customers."*

**Business model:** Free platform. Optional "Support the Creator" donation feature (PayPal, UPI, Buy Me a Coffee). Potential future: nominal fees or community donations.

**Key distinction:** Independent of SAP SE. Practitioner-led. Not SAP's official content.

**First milestone:** Share with Dhruv's WhatsApp community for early feedback after going live on Vercel.

---

## 2. Every File Created — Name, Location, Purpose

### GitHub Repository
**URL:** `https://github.com/Dhthakkar/sapedia`

### Project Root Structure (Next.js 15)
```
sapedia/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, global wrappers
│   ├── page.tsx                # Homepage / Course Catalog (entry point)
│   ├── globals.css             # Global Tailwind + custom CSS
│   └── course/
│       └── [courseId]/
│           └── page.tsx        # Dynamic course page — loads by courseId
├── components/
│   ├── CourseCatalog.tsx       # Homepage: lists all courses from COURSE_REGISTRY
│   ├── CourseLayout.tsx        # Left sidebar + main panel shell (data-agnostic)
│   ├── TopicContent.tsx        # Renders a single topic (all 8 sections)
│   ├── ModuleNavigator.tsx     # Left panel tree: modules → topics + checkboxes
│   ├── ProgressBar.tsx         # Live % progress bar component
│   ├── PracticeQuestions.tsx   # Toggle-reveal Q&A component
│   ├── MockExam.tsx            # 30–40 Q timed exam + score summary
│   ├── DonationModal.tsx       # "Support the Creator" modal (warm tone)
│   ├── JargonBuster.tsx        # Reusable purple card for term definitions
│   └── EcosystemDiagram.tsx    # ⚠️ PENDING PUSH — SVG diagram, fixed overflow
├── data/
│   └── courseRegistry.ts       # COURSE_REGISTRY — all course/module/topic data
├── public/                     # Static assets
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Two Files Downloaded But NOT Yet Pushed to GitHub ⚠️
| File | Purpose | Status |
|------|---------|--------|
| `EcosystemDiagram.tsx` | Rebuilt SVG diagram fixing container overflow bug | Downloaded, not pushed |
| `page_v4.tsx` | Rebuilt course page — low-friction structure + progress sync fix | Downloaded, not pushed |

> **Action required:** These need to be placed at correct paths and pushed before Vercel reflects latest state. See Section 4.

---

## 3. Current State — What's Working & What's Not

### ✅ Working
| Area | Status |
|------|--------|
| Next.js 15 project structure | Scaffolded and working |
| TypeScript + Tailwind CSS setup | Configured |
| Component separation | Done — UI is data-agnostic |
| COURSE_REGISTRY data pattern | Implemented |
| Unit 1 complete content | 3 lessons, 17 topics fully written |
| Interactive SVGs in Unit 1 | Flip cards, phase timelines, comparison visuals |
| localStorage progress persistence | Implemented |
| GitHub repo | Live at `https://github.com/Dhthakkar/sapedia` |
| Vercel auto-deploy pipeline | Connected (deploys on push to main) |

### ⚠️ Pending / Not Yet Done
| Area | Status |
|------|--------|
| `EcosystemDiagram.tsx` push | Downloaded locally, not pushed |
| `page_v4.tsx` push | Downloaded locally, not pushed |
| Live public Vercel URL | Pipeline exists, URL not yet confirmed live |
| Unit 2 content (5 lessons) | Not yet built into SAPedia |
| Unit 3 content (1 lesson) | Not yet built into SAPedia |
| Full Mock Exam (30–40 Q) | Not yet built |
| Donation modal live payment links | Placeholders only — real links not set |
| Google Analytics 4 | Config ready, not yet activated |
| WhatsApp community share | Waiting for Vercel live URL |

---

## 4. Exact Next Steps (Where We Left Off)

### Step 1 — Push the Two Pending Files
Run these in Terminal (Mac):

```bash
# Start fresh terminal session — activate nvm first
. "$HOME/.nvm/nvm.sh"

# Navigate to project
cd ~/path/to/sapedia

# Place the two downloaded files at correct paths:
# EcosystemDiagram.tsx → components/EcosystemDiagram.tsx
# page_v4.tsx → app/course/[courseId]/page.tsx
# (rename page_v4.tsx to page.tsx when placing)

# Then push:
git add .
git commit -m "fix: ecosystem diagram overflow + course page v4 rebuild"
git push
```

### Step 2 — Confirm Vercel Live URL
- Go to vercel.com → your project dashboard
- Confirm auto-deploy triggered after push
- Copy live URL → share with WhatsApp community

### Step 3 — Build Unit 2 Content into courseRegistry.ts
Unit 2 has 5 lessons (all source material is in Project Knowledge):

| Lesson | File Reference |
|--------|---------------|
| L1: Standardized Framework | `Defining_the_Standardized_Framework` |
| L2: Transformation Preparation Service (TPS) | `Unit2_lesson_2___Describing_the_Transformation_Preparation_Service` |
| L3: Integrated Toolchain | `Unit_2_lesson_3__Working_with_the_Integrated_Toolchain` |
| L4: Joule for RISE | `Exploring_Joule_for_RISE_with_SAP_Methodology` |
| L5: Expert Guidance | `Unit_2_lesson_5__Leveraging_Expert_Guidance` |

### Step 4 — Build Unit 3 Content
Unit 3 has 1 lesson:
- L1: RISE with SAP Methodology Dashboard (`Understanding_the_RISE_with_SAP_Methodology_Dashboard`)

### Step 5 — Build Full Mock Exam
- 30–40 questions, 45-minute countdown timer
- Score + performance summary at end
- Trigger Donation Modal on exam completion

### Step 6 — Set Real Donation Links
Update `CREATOR_SUPPORT` constants in `DonationModal.tsx`:
```ts
const CREATOR_SUPPORT = {
  paypal: "YOUR_PAYPAL_LINK",       // ← replace
  upi: "YOUR_UPI_ID",               // ← replace
  buymeacoffee: "YOUR_BMC_LINK",    // ← replace
  bankTransfer: "YOUR_BANK_LINK",   // ← replace
}
```

---

## 5. All Technical Decisions Made & Why

| Decision | What | Why |
|----------|------|-----|
| **Next.js 15** | Framework | Production-grade, Vercel-native, SEO-friendly, file-based routing |
| **TypeScript** | Language | Type safety for the COURSE_REGISTRY data layer — prevents content bugs |
| **Tailwind CSS** | Styling | Rapid UI development, responsive by default, no CSS file sprawl |
| **COURSE_REGISTRY pattern** | Data architecture | New course = new data object only. Zero UI change needed. Fully scalable |
| **localStorage** | Progress persistence | No backend needed for MVP. User progress survives page refresh |
| **Component separation** | Architecture | UI components are 100% data-agnostic — plug any course data in |
| **Single fictional company** | Content strategy | Akshar Industries Pvt. Ltd. used consistently across all Unit 1 topics for coherent storytelling |
| **No defensive legal language** | UX decision | "Not SAP's official content" disclaimers draw unnecessary attention — rejected |
| **No "Completely free" trust chip** | UX decision | Feels cheap — rejected in favor of quality UX doing the trust-building |
| **Low-friction topic structure** | UX decision | Visual → Insight paragraphs → Single checkpoint Q. No 8-section bureaucracy per topic |
| **Auto-progress on scroll** | UX decision | Checkpoint question answered = topic marked complete. No ceremony |
| **Vercel** | Hosting | Free tier, GitHub auto-deploy, zero-config for Next.js |
| **Google Analytics 4** | Analytics | Pre-configured for readiness, not yet activated |

---

## 6. Tech Stack, Dependencies & Config

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Runtime | Node.js v24 (via nvm) |
| Hosting | Vercel (auto-deploy from GitHub) |
| Version Control | GitHub — `https://github.com/Dhthakkar/sapedia` |
| Analytics | Google Analytics 4 (configured, not activated) |

### Key Dependencies (from package.json)
```json
{
  "next": "15.x",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5",
  "tailwindcss": "^3",
  "autoprefixer": "^10",
  "postcss": "^8"
}
```

### Node / NVM Setup (Mac Terminal)
```bash
# Required at start of EVERY new terminal session until added to .zshrc:
. "$HOME/.nvm/nvm.sh"

# Then:
nvm use 24

# To make it permanent (do this once):
echo '. "$HOME/.nvm/nvm.sh"' >> ~/.zshrc
echo 'nvm use 24' >> ~/.zshrc
```

### Workflow (Every Session)
```bash
. "$HOME/.nvm/nvm.sh"
cd ~/path/to/sapedia
# Make changes via: cat ~/Downloads/filename.tsx > path/to/file.tsx
git add .
git commit -m "message"
git push
# Vercel auto-deploys in ~60 seconds
```

### File Transfer Method
Claude writes file content → Dhruv runs in Terminal:
```bash
cat ~/Downloads/filename.tsx > path/to/file.tsx
```
No zip files. No drag-and-drop. Always Terminal `cat`.

---

## 7. Known Issues & Things to Watch Out For

| # | Issue | Risk | Fix |
|---|-------|------|-----|
| 1 | `EcosystemDiagram.tsx` not pushed | SVG diagram shows old overflow version on live site | Push file (Step 1 above) |
| 2 | `page_v4.tsx` not pushed | Course page uses old structure, progress sync broken | Push and rename to `page.tsx` (Step 1 above) |
| 3 | nvm not in `.zshrc` | Must manually source nvm every terminal session | Run the permanent fix (Section 6) |
| 4 | Donation modal links are placeholders | Clicking payment buttons goes nowhere | Update `CREATOR_SUPPORT` constants before sharing publicly |
| 5 | GA4 not activated | No traffic analytics yet | Enable when ready to go public |
| 6 | Unit 2 & 3 content not in platform | Course feels incomplete beyond Unit 1 | Build Units 2 & 3 into `courseRegistry.ts` |
| 7 | No backend / auth | Progress resets if browser storage is cleared | Acceptable for MVP — revisit if needed post-launch |
| 8 | Mobile sidebar state | Confirm collapsible sidebar works smoothly on iOS Safari | Test on real device before WhatsApp share |

---

## 8. Golden Example Company (Consistent Across All Topics)

| Field | Detail |
|-------|--------|
| **Company Name** | Akshar Industries Pvt. Ltd. |
| **Industry** | Mid-size manufacturing |
| **Size** | ~2,000 employees |
| **Current state** | Legacy SAP ECC, highly customized on-premise |
| **Journey** | Moving to cloud via RISE with SAP |
| **Key people** | Nirav Shah (IT head), Priya Desai (PM), Arjun Kapoor (business lead) |
| **SAP partner** | Working with a certified implementation partner |

---

## 9. Course Content Coverage Map

### Unit 1 — Complete ✅
| Lesson | Topics | Status |
|--------|--------|--------|
| L1: SAP Business Suite | ~6 topics | ✅ Done |
| L2: RISE with SAP Methodology | ~6 topics | ✅ Done |
| L3: Clean Core Fundamentals | ~5 topics | ✅ Done |
| **Total** | **~17 topics** | **✅ Complete** |

### Unit 2 — Not Yet Built ⚠️
| Lesson | Source File | Status |
|--------|------------|--------|
| L1: Standardized Framework | `Defining_the_Standardized_Framework` | ❌ Pending |
| L2: TPS | `Unit2_lesson_2_...` | ❌ Pending |
| L3: Integrated Toolchain | `Unit_2_lesson_3_...` | ❌ Pending |
| L4: Joule for RISE | `Exploring_Joule_...` | ❌ Pending |
| L5: Expert Guidance | `Unit_2_lesson_5_...` | ❌ Pending |

### Unit 3 — Not Yet Built ⚠️
| Lesson | Source File | Status |
|--------|------------|--------|
| L1: Dashboard | `Understanding_the_RISE_...` | ❌ Pending |

### Exam Material in Project Knowledge
- `Knowledge_quiz_Reference_question_answers` — Unit 1 quiz (10 Q with answers)
- `Knowledge_quiz_2` — Unit 2 quiz (10 Q with answers)

---

## 10. Platform Design Principles (Don't Violate These)

> Dhruv's UX philosophy: *"Salt in food — only necessary quantity, not excessive not less."*

1. **Minimal friction** — checkpoint Q answered = topic complete. No heavy ceremony
2. **No over-formatting** — 2–3 insight paragraphs per topic, exam tips woven in naturally
3. **No defensive legal copy** — platform quality builds trust, not disclaimers
4. **Consistent storytelling** — same fictional company across all topics
5. **Mobile-first** — vertical layouts, no wide tables, large touch targets
6. **Data-agnostic UI** — all components reusable, all content in data layer
7. **Hinglish explanations** — Indian corporate analogies (Tata Steel, Reliance, Accenture scenarios) where helpful
8. **Genuine teaching** — analogies and stories over bullet-point documentation reformats

---

*Document prepared for seamless project handover and continuation.*
