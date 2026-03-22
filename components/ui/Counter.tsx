"use client";
import { useState, useEffect, useRef } from "react";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function Counter({ to, suffix = "", prefix = "", duration = 1200 }: CounterProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        let start: number | null = null;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setVal(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(step);
          else setVal(to);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="font-display font-black">
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
}
