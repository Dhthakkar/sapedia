"use client";
import Link from "next/link";
import { PLATFORM_CONFIG } from "@/data/config";

interface HeaderProps {
  onSupportClick: () => void;
  courseTitle?: string;
  courseId?: string;
}

export default function Header({ onSupportClick, courseTitle, courseId }: HeaderProps) {
  return (
    <header className="bg-[#0B1829] border-b border-white/[0.07] sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-5 h-[58px] flex items-center justify-between gap-3">
        {/* Left — Logo + back nav */}
        <div className="flex items-center gap-3 min-w-0">
          {courseId && (
            <Link href="/"
              className="flex-shrink-0 text-[#E2E8F0] border border-white/15 bg-white/[0.08] hover:bg-white/[0.16] hover:text-white transition-colors text-xs font-medium px-3 py-1.5 rounded-lg">
              ← Back
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-[34px] h-[34px] flex-shrink-0 bg-gradient-to-br from-[#0070F2] to-[#0057C2] rounded-[9px] flex items-center justify-center text-[17px] shadow-[0_2px_10px_rgba(0,112,242,0.4)]">
              📘
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-[#F1F5F9] font-display tracking-tight leading-none">
                {PLATFORM_CONFIG.name}
              </p>
              <p className="text-[10px] text-[#475569] mt-0.5 truncate">
                {courseTitle ?? PLATFORM_CONFIG.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Right — Support button */}
        <button
          onClick={onSupportClick}
          className="flex-shrink-0 flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-[#E2E8F0] hover:text-white transition-colors text-xs font-medium px-3 py-1.5 rounded-lg">
          <span>☕</span>
          <span className="hidden sm:inline">Support Creator</span>
        </button>
      </div>
    </header>
  );
}
