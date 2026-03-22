import Counter from "@/components/ui/Counter";

interface Stat {
  icon:   string;
  to:     number;
  suffix?: string;
  prefix?: string;
  label:  string;
  color:  string;
}

export default function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className={`grid gap-2.5`} style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
      {stats.map((s, i) => (
        <div key={i}
          className="rounded-2xl p-3.5 text-center border-2"
          style={{ background: `${s.color}10`, borderColor: `${s.color}30` }}>
          <p className="text-xs mb-1">{s.icon}</p>
          <p className="text-2xl leading-none mb-1.5" style={{ color: s.color }}>
            <Counter to={s.to} suffix={s.suffix} prefix={s.prefix} />
          </p>
          <p className="text-[10px] text-[#64748B] font-semibold leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
