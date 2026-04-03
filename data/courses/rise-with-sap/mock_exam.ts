import { Question } from "@/types";

export const mockExamQuestions: Question[] = [
  {
    q: "Which tasks are included in the SAP Activate roadmap during the transition from Discover to Prepare phases? (Choose 3)",
    type: "multi",
    count: 3,
    options: ["Value Roadmap development", "Business Capability Map creation", "Solution Marketing Diagram creation", "Technical Assessment"],
    correct: [0, 1, 3],
    explanation: "Value Roadmap development, Business Capability Map creation, and Technical Assessment are included in the SAP Activate roadmap during the transition from Discover to Prepare phases.",
    wrongExp: { 2: "Marketing diagrams are not part of the Activate roadmap for this phase." },
    tip: "Remember: Value, Capability, and Technical assessments are the core pillars of the handover."
  },
  {
    q: "What does the SAP Competency Framework ensure? (Choose 2)",
    type: "multi",
    count: 2,
    options: ["High-quality marketing strategies", "Technical and operational expertise", "Partner implementation skills", "Effective customer service"],
    correct: [1, 2],
    explanation: "The SAP Competency Framework ensures technical and operational expertise and partner implementation skills.",
    wrongExp: { 0: "Marketing is not the focus.", 3: "General customer service is not the specific aim of the framework." },
    tip: "Look for 'expertise' and 'implementation' when thinking about partner competencies."
  },
  {
    q: "What are included in the key components of the TPS (Transformation Preparation Service)? (Choose 3)",
    type: "multi",
    count: 3,
    options: ["Discovery-Based Insights", "Guided Setup Services", "AI Marketing Solutions", "Accelerated Value Delivery"],
    correct: [0, 1, 3],
    explanation: "Discovery-Based Insights, Guided Setup Services, and Accelerated Value Delivery are key components of the TPS.",
    wrongExp: { 2: "Marketing is a common distractor in these exams." },
    tip: "TPS = Insights + Setup + Value Delivery."
  },
  {
    q: "What is the primary benefit of the Integrated Toolchain?",
    type: "single",
    options: ["Reducing customer engagement", "Supporting IT modernization projects", "Increasing marketing ROI", "Enhancing customer retention"],
    correct: [1],
    explanation: "Supporting IT modernization projects is the primary benefit of the Integrated Toolchain (Signavio, LeanIX, Cloud ALM).",
    wrongExp: { 0: "It aims to increase, not reduce, engagement.", 2: "ROI is a benefit but 'IT modernization' is the primary purpose.", 3: "General retention is not the primary purpose." },
    tip: "Tools = Modernization."
  },
  {
    q: "How do validated partners qualify for expert status? (Choose 3)",
    type: "multi",
    count: 3,
    options: [
      "By completing RISE projects with significant innovation", 
      "By exceeding standard marketing metrics", 
      "By achieving an ACV over EUR 550,000 in the last 24 months", 
      "By maintaining over 80% Clean Core Quality Gates accepted"
    ],
    correct: [0, 2, 3],
    explanation: "Expert status requires innovation in RISE projects, meeting the €550k ACV threshold, and maintaining high Quality Gate acceptance rates.",
    wrongExp: { 1: "Marketing metrics are not used for technical expert status." },
    tip: "Innovation, Revenue (550k), and Quality (80%) are the three legs of expert status."
  },
  {
    q: "What updated requirements are included in the RISE Competency Framework? (Choose 2)",
    type: "multi",
    count: 2,
    options: ["Support Accreditation", "Marketing strategy certification", "Project-level professional certification", "Mandatory annual reviews"],
    correct: [0, 2],
    explanation: "Support Accreditation and project-level professional certification are included in the updated RISE Competency Framework.",
    wrongExp: { 1: "Marketing is a distractor.", 3: "Reviews are standard but not the 'updated requirement' highlight." },
    tip: "Certification and Accreditation are the key words."
  },
  {
    q: "Which stakeholders benefit from Joule's tailored support? (Choose 2)",
    type: "multi",
    count: 2,
    options: ["Marketing executives", "Enterprise architects", "Onboarding advisors", "Financial analysts"],
    correct: [1, 2],
    explanation: "Enterprise architects and onboarding advisors benefit from Joule's tailored support in the context of RISE Methodology.",
    wrongExp: { 0: "Distractor.", 3: "Distractor." },
    tip: "Joule in RISE focuses on the technical and process roles like EA and Onboarding."
  },
  {
    q: "What does the Transformation Preparation Service (TPS) aim to bridge?",
    type: "single",
    options: ["Marketing and sales process", "Vision and execution", "Customer satisfaction levels", "IT and HR integration"],
    correct: [1],
    explanation: "The TPS specifically aims to bridge the gap between the initial vision and the final execution of the transformation.",
    wrongExp: { 0: "Distractor.", 2: "General goal, not the specific TPS aim.", 3: "Distractor." },
    tip: "TPS = Vision to Execution."
  },
  {
    q: "What components does Joule cover to aid business transformation? (Choose 3)",
    type: "multi",
    count: 3,
    options: ["SAP Signavio", "SAP LeanIX", "SAP Business Marketing Strategies", "Clean Core dimensions"],
    correct: [0, 1, 3],
    explanation: "Joule covers SAP Signavio (processes), SAP LeanIX (architecture), and Clean Core dimensions.",
    wrongExp: { 2: "Distractor." },
    tip: "Joule integrates with the core RISE toolchain."
  },
  {
    q: "What does SAP Enable Now facilitate?",
    type: "single",
    options: ["Market analysis simulations", "Guided simulations for learning processes", "Workflow optimization diagrams", "Integration strategies"],
    correct: [1],
    explanation: "SAP Enable Now provides guided simulations and learning content for business processes.",
    wrongExp: { 0: "Distractor.", 2: "Signavio does this.", 3: "BTP/Integration Suite does this." },
    tip: "Enable = Learning/Simulations."
  }
];
