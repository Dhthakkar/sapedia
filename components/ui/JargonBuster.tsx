"use client";

import React from "react";

interface JargonBusterProps {
  term: string;
  definition: string;
  analogy?: string;
}

export default function JargonBuster({ term, definition, analogy }: JargonBusterProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-purple-100 bg-purple-50/50">
      <div className="flex items-center gap-2 border-b border-purple-100 bg-purple-100/50 px-4 py-2">
        <span className="text-lg">💡</span>
        <span className="text-xs font-black uppercase tracking-wider text-purple-700 font-display">
          Jargon Buster
        </span>
      </div>
      <div className="p-5">
        <h4 className="mb-2 font-display text-lg font-black text-purple-900">
          {term}
        </h4>
        <p className="text-[14.5px] leading-relaxed text-purple-800/80">
          {definition}
        </p>
        {analogy && (
          <div className="mt-4 border-t border-purple-100 pt-4">
            <p className="text-xs font-bold uppercase tracking-tight text-purple-400">
              In Plain English:
            </p>
            <p className="mt-1 text-sm italic leading-relaxed text-purple-700/70">
              "{analogy}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
