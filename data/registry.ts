// ═══════════════════════════════════════════════════════
// 📚  COURSE REGISTRY — Add new courses here
// Step 1: Create data/courses/your-course-id/meta.ts
// Step 2: Add the course object below
// Step 3: Done — UI auto-picks it up
// ═══════════════════════════════════════════════════════
import type { Course } from "@/types";

const COURSE_REGISTRY: Record<string, Course> = {

  // ─── COURSE 1 ─────────────────────────────────────────
  "rise-with-sap": {
    id:             "rise-with-sap",
    title:          "Introducing RISE with SAP",
    subtitle:       "Methodology for SAP Partners & Customers",
    badge:          "Beginner",
    color:          "#0070F2",
    topicsCount:    60,
    modulesCount:   9,
    questionsCount: 40,
    description:    "Understand the complete RISE with SAP methodology — Clean Core, Integrated Toolchain, Expert Guidance and the Dashboard, explained simply and visually.",
    tags:           ["SAP S/4HANA", "Cloud ERP", "Clean Core", "Methodology"],
    available:      true,
    units: [
      {
        id: "u1", title: "Unit 1: Foundations", color: "#0070F2",
        lessons: [
          { id: "u1l1", title: "Introducing the SAP Business Suite",      time: 10, hasContent: true },
          { id: "u1l2", title: "Exploring the RISE with SAP Methodology", time: 12, hasContent: true },
          { id: "u1l3", title: "Exploring Clean Core Fundamentals",       time: 10, hasContent: true },
        ],
      },
      {
        id: "u2", title: "Unit 2: Core Components", color: "#7C3AED",
        lessons: [
          { id: "u2l1", title: "Defining the Standardized Framework",               time: 15 },
          { id: "u2l2", title: "Describing the Transformation Preparation Service", time: 12 },
          { id: "u2l3", title: "Working with the Integrated Toolchain",             time: 15 },
          { id: "u2l4", title: "Exploring Joule for RISE with SAP",                 time: 10 },
          { id: "u2l5", title: "Leveraging Expert Guidance",                        time: 12 },
        ],
      },
      {
        id: "u3", title: "Unit 3: Dashboard & Operations", color: "#059669",
        lessons: [
          { id: "u3l1", title: "Understanding the RISE with SAP Methodology Dashboard", time: 10 },
        ],
      },
    ],
  },

  // ─── ADD NEW COURSE HERE ──────────────────────────────
  // "sap-btp-essentials": {
  //   id: "sap-btp-essentials",
  //   title: "SAP BTP Essentials",
  //   ...
  // },

};

export default COURSE_REGISTRY;
