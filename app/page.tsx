"use client";
import { useState } from "react";
import Header       from "@/components/layout/Header";
import Footer       from "@/components/layout/Footer";
import DonationModal from "@/components/ui/DonationModal";
import CourseCard   from "@/components/catalog/CourseCard";
import COURSE_REGISTRY from "@/data/registry";
import { PLATFORM_CONFIG, CREATOR_SUPPORT } from "@/data/config";

export default function HomePage() {
  const [modal, setModal]     = useState(false);
  const [trigger, setTrigger] = useState<"manual"|"header"|"catalog"|"sidebar">("manual");
  const courses = Object.values(COURSE_REGISTRY);

  const openModal = (t: typeof trigger) => { setTrigger(t); setModal(true); };

  return (
    <div className="min-h-screen">
      <Header onSupportClick={() => openModal("header")} />

      {/* Hero */}
      <section className="bg-[#0B1829] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.035) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />
        <div className="absolute top-[-80px] right-[-80px] w-[440px] h-[440px] pointer-events-none"
          style={{ background:"radial-gradient(circle,rgba(0,112,242,0.13) 0%,transparent 65%)" }} />

        <div className="max-w-3xl mx-auto px-6 py-[clamp(56px,8vw,100px)] text-center relative">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,112,242,0.18)] border border-[rgba(0,112,242,0.32)] rounded-full px-4 py-1.5 mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse2" />
            <span className="text-xs text-[#93C5FD] font-bold uppercase tracking-[0.8px]">
              {PLATFORM_CONFIG.name} · {PLATFORM_CONFIG.tagline}
            </span>
          </div>

          <h1 className="font-display text-[clamp(30px,5.5vw,54px)] font-black text-[#F1F5F9] leading-[1.12] mb-6 tracking-tight animate-fade-up" style={{ animationDelay:"0.06s" }}>
            {PLATFORM_CONFIG.heroHeadline1}<br />
            <span className="grad-text">{PLATFORM_CONFIG.heroHeadline2}</span>
          </h1>

          <p className="text-[clamp(14px,2vw,17px)] text-[#94A3B8] leading-[1.85] max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay:"0.12s" }}>
            {PLATFORM_CONFIG.heroSubline}
          </p>

          <div className="flex flex-wrap gap-2.5 justify-center animate-fade-up" style={{ animationDelay:"0.18s" }}>
            {["🧠 Plain English, always","🏭 Real-world examples","🎯 Interactive diagrams","🆓 Completely free","📝 Practice questions included"].map(chip => (
              <div key={chip} className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.11] rounded-full px-4 py-1.5">
                <span className="text-xs text-[#CBD5E1] font-medium">{chip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-[1100px] mx-auto px-6 py-[clamp(40px,6vw,64px)]">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-0.5 h-5 bg-[#0070F2] rounded-full" />
            <span className="text-xs text-[#0070F2] font-bold uppercase tracking-[0.8px]">Available Now</span>
          </div>
          <h2 className="font-display text-[clamp(20px,3vw,28px)] font-black text-[#0F172A] mb-2">
            Choose What You Want to Learn
          </h2>
          <p className="text-sm text-[#64748B]">
            Pick a course, work through lessons at your own pace, and mark them done as you go.
          </p>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))" }}>
          {courses.map(c => <CourseCard key={c.id} course={c} />)}
          {/* Coming soon placeholder */}
          <div className="bg-white rounded-[24px] border-2 border-dashed border-[#E2E8F0] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <span className="text-3xl mb-3">🔜</span>
            <p className="font-display font-black text-[#334155] mb-1">More Courses Coming</p>
            <p className="text-sm text-[#94A3B8]">SAP BTP, SuccessFactors, S/4HANA Finance and more — based on community interest.</p>
          </div>
        </div>
      </section>

      {/* How it's structured */}
      <section className="bg-white border-y border-[#E2E8F0]">
        <div className="max-w-[1100px] mx-auto px-6 py-12">
          <div className="text-center mb-9">
            <h3 className="font-display text-[22px] font-black text-[#0F172A] mb-2">How Every Lesson Is Structured</h3>
            <p className="text-sm text-[#64748B]">Same format, every lesson. No surprises — just clear, consistent learning.</p>
          </div>
          <div className="grid gap-7" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
            {[
              { icon:"🟪", bg:"#F3F0FF", title:"Jargon Busters",      desc:"Every SAP term explained on a flip card — tap to reveal in plain English." },
              { icon:"🏭", bg:"#FFFBEA", title:"Consistent Examples",  desc:"All concepts shown through Akshar Industries — same company, every lesson." },
              { icon:"📦", bg:"#EBF4FF", title:"30-Second Summaries",  desc:"Each topic ends with a rapid-fire summary. Ideal for last-minute revision." },
              { icon:"📝", bg:"#EDFAF1", title:"Practice Questions",   desc:"Questions per topic and per lesson, with full answer explanations." },
            ].map(f => (
              <div key={f.title} className="rounded-2xl p-5" style={{ background: f.bg }}>
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4 className="font-display text-sm font-bold text-[#0F172A] mb-1.5">{f.title}</h4>
                <p className="text-sm text-[#475569] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="bg-gradient-to-br from-[#FFF8F0] to-[#FFF3E5] border-y border-[#FDE68A]">
        <div className="max-w-2xl mx-auto px-6 py-[clamp(52px,7vw,80px)] text-center">
          <div className="text-5xl mb-5 animate-float">☕</div>
          <h2 className="font-display text-[clamp(18px,3vw,26px)] font-black text-[#0F172A] mb-4">
            {CREATOR_SUPPORT.supportHeading}
          </h2>
          <p className="text-sm text-[#78350F] leading-[1.85] max-w-lg mx-auto mb-8">
            {CREATOR_SUPPORT.supportMessage}
          </p>
          <button onClick={() => openModal("catalog")}
            className="btn-amber inline-flex items-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold px-7 py-3 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.28)] hover:-translate-y-0.5 transition-transform">
            ☕ Support the Creator
          </button>
          <p className="text-xs text-[#92400E] mt-3.5 opacity-80">
            No pressure at all — sharing SAPedia with a colleague is just as meaningful 💛
          </p>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h3 className="font-display text-[15px] font-black text-[#334155] mb-5">About SAPedia</h3>
          <div className="grid gap-4" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))" }}>
            {[
              { icon:"👤", title:"Who built this?",      desc:"An SAP domain professional with 9 years of hands-on experience across ABAP development, data migration, and landscape transformation — working independently." },
              { icon:"📝", title:"What is this content?", desc:"All lessons, explanations, diagrams, and examples are independently created based on the author's professional knowledge. Not SAP's official training content." },
              { icon:"🏭", title:"The example company",   desc:"Akshar Industries Pvt. Ltd., Nirav Shah, Priya Desai, Arjun Kapoor — all completely fictional. Any resemblance to real entities is coincidental." },
              { icon:"®️",  title:"Trademarks",            desc:"SAP®, RISE with SAP®, S/4HANA®, SAP BTP®, Signavio®, LeanIX® are registered trademarks of SAP SE. Used for identification only. Not affiliated with SAP SE." },
            ].map(c => (
              <div key={c.title} className="bg-white border border-[#E2E8F0] rounded-xl p-4">
                <div className="text-xl mb-2">{c.icon}</div>
                <p className="text-xs font-bold text-[#334155] mb-1.5">{c.title}</p>
                <p className="text-xs text-[#64748B] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      {modal && <DonationModal onClose={() => setModal(false)} trigger={trigger} />}
    </div>
  );
}
