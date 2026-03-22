const elements = [
  { icon:"🔄", label:"Up-to-date software release",               note:"Always on the latest version" },
  { icon:"☁️", label:"Cloud-compliant extensions & integrations", note:"Built using BTP, standard APIs" },
  { icon:"🗄️", label:"High-quality master data",                  note:"Clean, accurate, no duplicates" },
  { icon:"⚙️", label:"Well-designed processes",                   note:"SAP best practice, minimal workarounds" },
];

export default function CleanStateVisual() {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-gradient-to-br from-[#EBF4FF] to-[#F0F7FF] border-2 border-[#BFDBFE] rounded-2xl p-4">
        <p className="text-[11px] font-black text-[#1D4ED8] uppercase tracking-[.6px] mb-3">🧪 What makes a system clean?</p>
        <p className="text-sm text-[#1E3A5F] leading-relaxed italic">
          &quot;Best practices, methodologies, and tools are effectively applied during the implementation of an SAP software solution.&quot;
        </p>
      </div>
      <div className="bg-[#EDFAF1] border-2 border-[#6EE7B7] rounded-2xl p-4">
        <p className="text-[11px] font-black text-[#065F46] uppercase tracking-[.6px] mb-3">✅ The Ideal Clean State — 4 Elements</p>
        {elements.map((e, i) => (
          <div key={i} className="flex items-center gap-2.5 mb-2 last:mb-0 p-2 bg-white/60 rounded-lg">
            <span className="text-[18px]">{e.icon}</span>
            <div>
              <p className="text-xs font-bold text-[#065F46]">{e.label}</p>
              <p className="text-[10px] text-[#6B7280]">{e.note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#FFFBEA] border-2 border-[#FDE68A] rounded-xl px-4 py-3">
        <p className="text-xs font-bold text-[#78350F] mb-1">⭐ Key SAP fact (directly testable):</p>
        <p className="text-xs text-[#92400E] leading-relaxed">
          A newly provisioned SAP S/4HANA Cloud system using standard processes from <strong>SAP Signavio Process Navigator</strong> is considered <strong>clean</strong> by default.
        </p>
      </div>
    </div>
  );
}
