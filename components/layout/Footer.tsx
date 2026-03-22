import { PLATFORM_CONFIG } from "@/data/config";

export default function Footer() {
  return (
    <footer className="bg-[#0B1829] py-8 px-6 text-center">
      <p className="text-xs text-[#334155] mb-2">{PLATFORM_CONFIG.footerLine1}</p>
      <p className="text-[11px] text-[#475569] mb-2">{PLATFORM_CONFIG.footerLine2}</p>
      <p className="text-[11px] text-[#1E293B]">{PLATFORM_CONFIG.footerLine3}</p>
    </footer>
  );
}
