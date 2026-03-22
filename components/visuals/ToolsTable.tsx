const rows = [
  { cat:"Process Analysis & Optimisation", color:"#0070F2", tools:["Signavio Process Insights & Intelligence","Signavio Process Manager","Signavio Collaboration Hub","Signavio Governance","Signavio Process Transformation Manager"] },
  { cat:"Enterprise Architecture",          color:"#7C3AED", tools:["LeanIX Application Portfolio Manager","LeanIX Architecture & Roadmap Planning","LeanIX Technology Risk & Compliance"] },
  { cat:"Onboarding Services",              color:"#0891B2", tools:["Embedded launch activities"] },
  { cat:"Transformation Service",           color:"#059669", tools:["Transformation Preparation Service for SAP Business Suite"] },
];

export default function ToolsTable() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden mt-3">
      <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <p className="text-xs font-black text-[#334155]">🛠️ Transformation Tools & Services Table</p>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="px-4 py-3 border-b border-[#F1F5F9] last:border-0 flex gap-3">
          <div className="w-1 rounded-full flex-shrink-0 my-0.5" style={{ background: r.color }} />
          <div>
            <p className="text-[11px] font-black mb-1.5" style={{ color: r.color }}>{r.cat}</p>
            <div className="flex flex-wrap gap-1.5">
              {r.tools.map((t) => (
                <span key={t} className="text-[10px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2 py-0.5 text-[#475569]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
