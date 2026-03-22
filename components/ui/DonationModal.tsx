"use client";
import { useState } from "react";
import { CREATOR_SUPPORT } from "@/data/config";

interface DonationModalProps {
  onClose: () => void;
  trigger?: "manual" | "header" | "catalog" | "sidebar" | "post-exam";
}

export default function DonationModal({ onClose, trigger = "manual" }: DonationModalProps) {
  const [copied, setCopied] = useState(false);

  const methods = [
    { label: "PayPal",           icon: "💳", href: CREATOR_SUPPORT.paypal,                     bg: "#EBF0FA", color: "#003087" },
    { label: "UPI / GPay",       icon: "📱", href: `upi://pay?pa=${CREATOR_SUPPORT.upi}`,      bg: "#EDFAF1", color: "#15803D" },
    { label: "Buy Me a Coffee",  icon: "☕", href: CREATOR_SUPPORT.buymeacoffee,               bg: "#FFFBEA", color: "#92400E" },
    { label: "Bank Transfer",    icon: "🏦", href: CREATOR_SUPPORT.bankTransfer,               bg: "#EBF4FF", color: "#1D4ED8" },
  ];

  const copy = () => {
    try { navigator.clipboard.writeText(window.location.origin); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(11,24,41,0.8)] backdrop-blur-lg z-[3000] flex items-center justify-center p-5 animate-fade-in"
      onClick={onClose}>
      <div
        className="bg-white rounded-[28px] max-w-[480px] w-full shadow-[0_24px_80px_rgba(0,0,0,0.18)] overflow-hidden relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}>

        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] border-none text-[#64748B] flex items-center justify-center font-bold text-sm transition-colors">
          ✕
        </button>

        <div className="p-8 pb-9">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-[#F59E0B] to-[#F97316] flex items-center justify-center text-3xl mx-auto mb-5 animate-float shadow-[0_6px_24px_rgba(245,158,11,0.32)]">
              ☕
            </div>
            <h3 className="font-display text-[22px] font-black text-[#0F172A] mb-2">
              Support This Platform
            </h3>
            {trigger === "post-exam" && (
              <div className="inline-block bg-[#EDFAF1] border border-[#6EE7B7] rounded-lg px-3 py-1.5 mb-3">
                <span className="text-sm font-semibold text-[#065F46]">🎉 Great job completing the quiz!</span>
              </div>
            )}
            <div className="w-11 h-0.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded mx-auto mb-4" />
            <p className="text-sm leading-relaxed text-[#475569] px-1">
              {CREATOR_SUPPORT.supportMessage}
            </p>
          </div>

          {/* Payment options */}
          <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.8px] text-center mb-3">
            Choose how you&apos;d like to support
          </p>
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {methods.map((m) => (
              <a key={m.label} href={m.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 p-3.5 rounded-xl transition-transform hover:-translate-y-1 hover:shadow-md"
                style={{ background: m.bg }}>
                <span className="text-2xl">{m.icon}</span>
                <span className="text-sm font-bold" style={{ color: m.color }}>{m.label}</span>
              </a>
            ))}
          </div>

          {/* Share */}
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0] text-center">
            <p className="text-sm text-[#475569] leading-relaxed">
              💬 <strong>Or share with a colleague</strong> who works with SAP — that helps just as much!
            </p>
            <button onClick={copy}
              className="mt-2.5 transition-all text-xs font-semibold px-4 py-2 rounded-lg border"
              style={{
                background: copied ? "#EDFAF1" : "transparent",
                color:      copied ? "#065F46" : "#0070F2",
                borderColor:copied ? "#6EE7B7" : "#0070F2",
              }}>
              {copied ? "✅ Copied!" : "📋 Copy Link"}
            </button>
          </div>

          <p className="text-center text-xs text-[#94A3B8] mt-4">
            Every bit of support keeps this free for everyone 🙏
          </p>
        </div>
      </div>
    </div>
  );
}
