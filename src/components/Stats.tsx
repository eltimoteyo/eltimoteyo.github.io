import { companies, stats } from "../data/profile";
import { Counter, Reveal, SpotlightCard } from "./ui";

export function Stats() {
  return (
    <section aria-label="Cifras" className="relative py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <SpotlightCard className="h-full p-5 sm:p-7">
                <div className="text-gradient font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-[13px] leading-snug text-muted sm:text-sm">{s.label}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="text-center font-mono text-[11px] tracking-[0.28em] text-faint uppercase">
            Empresas y clientes con los que he trabajado
          </p>
          <div className="mask-fade-x marquee-pause mt-7 overflow-hidden">
            <div className="animate-marquee flex w-max" style={{ ["--marquee-duration" as string]: "48s" }}>
              {[...companies, ...companies].map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className="flex items-center pr-12 font-display text-xl whitespace-nowrap text-white/35 transition-colors hover:text-white sm:text-2xl"
                >
                  <span className="mr-12 h-1 w-1 rounded-full bg-cyan/50" aria-hidden="true" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
