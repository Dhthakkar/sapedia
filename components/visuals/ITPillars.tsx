"use client";

const challenges = [
  { num:"1", icon:"📐", title:"Proven Framework",      desc:"A tested implementation playbook — not figuring it out from scratch",        color:"#0070F2" },
  { num:"2", icon:"⭐", title:"Best Practices",          desc:"SAP's industry-standard processes from thousands of implementations",         color:"#7C3AED" },
  { num:"3", icon:"🧭", title:"Navigational Support",   desc:"Human experts to guide through complexity at every stage of the project",     color:"#0891B2" },
  { num:"4", icon:"🛠️", title:"Right Tools",            desc:"Digital tools that manage the project and provide end-to-end transparency",   color:"#059669" },
];

export default function ITPillars() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {challenges.map((c) => (
        <div key={c.num} className="rounded-2xl p-4 border-2"
          style={{ background:`${c.color}10`, borderColor:`${c.color}25` }}>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{ background: c.color }}>{c.num}</div>
            <span className="text-xl">{c.icon}</span>
          </div>
          <p className="text-xs font-black mb-1.5" style={{ color: c.color }}>{c.title}</p>
          <p className="text-[11px] text-[#475569] leading-snug">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
