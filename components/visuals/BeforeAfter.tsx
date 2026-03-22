"use client";

interface BeforeAfterProps {
  before: string[];
  after:  string[];
}

export default function BeforeAfter({ before, after }: BeforeAfterProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-[#FEF2F2] border-2 border-[#FECACA] rounded-2xl p-4">
        <p className="text-[11px] font-black text-[#DC2626] uppercase tracking-[0.6px] mb-3">❌ Before (SAP ECC)</p>
        {before.map((b, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <span className="text-[#DC2626] text-xs flex-shrink-0 mt-0.5">✗</span>
            <p className="text-xs text-[#991B1B] leading-snug">{b}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#EDFAF1] border-2 border-[#6EE7B7] rounded-2xl p-4">
        <p className="text-[11px] font-black text-[#059669] uppercase tracking-[0.6px] mb-3">✅ After (Clean Core)</p>
        {after.map((a, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <span className="text-[#059669] text-xs flex-shrink-0 mt-0.5">✓</span>
            <p className="text-xs text-[#065F46] leading-snug">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
