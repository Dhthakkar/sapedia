"use client";
import { useState } from "react";
import { CREATOR_SUPPORT } from "@/data/config";

interface DonationModalProps {
  onClose: () => void;
  trigger?: "manual" | "header" | "catalog" | "sidebar" | "post-exam";
}

export default function DonationModal({ onClose, trigger = "manual" }: DonationModalProps) {
  const [copied, setCopied] = useState(false);

  const upiLink = `upi://pay?pa=${CREATOR_SUPPORT.upi}&pn=Thakkar%20Dhruvkumar&cu=INR`;

  const copyBank = () => {
    navigator.clipboard.writeText(CREATOR_SUPPORT.bankTransfer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-amber-50 p-8 text-center border-b border-amber-100 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
          <div className="text-5xl mb-4 animate-bounce">☕</div>
          <h2 className="text-2xl font-display font-black text-slate-900 leading-tight">
            {CREATOR_SUPPORT.supportHeading}
          </h2>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-[15px] leading-relaxed text-slate-600 mb-8 text-center font-medium">
            {CREATOR_SUPPORT.supportMessage}
          </p>

          <div className="grid grid-cols-1 gap-3">
            {/* UPI - Masked ID, Deep Link Only */}
            <a 
              href={upiLink}
              className="flex items-center justify-between p-4 bg-[#F8FAFC] border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📱</span>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-900">Pay via UPI</p>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">GPay, PhonePe, Paytm</p>
                </div>
              </div>
              <span className="text-blue-600 font-black text-xs group-hover:translate-x-1 transition-transform">Pay Now →</span>
            </a>

            {/* Bank Transfer - Copy Logic */}
            <button 
              onClick={copyBank}
              className="flex items-center justify-between p-4 bg-[#F8FAFC] border-2 border-slate-100 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🏦</span>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-900">Bank Transfer</p>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">HDFC Bank (Copy Details)</p>
                </div>
              </div>
              <span className={`font-black text-xs transition-all ${copied ? "text-emerald-600" : "text-slate-400"}`}>
                {copied ? "Copied! ✓" : "Copy Details"}
              </span>
            </button>

            {/* Buy Me a Coffee */}
            <a 
              href={CREATOR_SUPPORT.buymeacoffee}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#F8FAFC] border-2 border-slate-100 rounded-2xl hover:border-[#FFDD00] hover:bg-[#FFFDF0] transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">☕</span>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-900">Buy Me a Coffee</p>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Support via BMC</p>
                </div>
              </div>
              <span className="text-[#FFDD00] font-black text-xs group-hover:translate-x-1 transition-transform">Support →</span>
            </a>

            {/* PayPal Placeholder */}
            <div className="opacity-40 pointer-events-none flex items-center justify-between p-4 bg-[#F8FAFC] border-2 border-slate-100 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">💳</span>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-900">PayPal</p>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Coming Tomorrow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
