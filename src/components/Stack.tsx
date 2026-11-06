import { motion } from "framer-motion";
import { skillGroups } from "../data/profile";
import { Icon } from "./icons";
import { accentBg, accentText, Reveal, SectionHeading, SpotlightCard } from "./ui";

export function Stack() {
  const all = skillGroups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];

  return (
    <section id="stack" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          kicker="stack"
          title="Las herramientas con las que construyo"
          subtitle="Del mainframe bancario a los modelos de lenguaje: uso la herramienta adecuada para cada problema."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.07}>
              <SpotlightCard className="h-full p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ring-1 ${accentBg[g.accent]} ${accentText[g.accent]}`}>
                      <Icon name={g.icon} size={20} />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">{g.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-faint">{String(g.items.length).padStart(2, "0")}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it, k) => (
                    <motion.span
                      key={it}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + k * 0.025 }}
                      className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 text-[13px] text-white/80 transition-colors hover:border-white/25 hover:text-white"
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="marquee-pause mt-16 space-y-4" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className="mask-fade-x overflow-hidden">
            <div
              className={`flex w-max ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}
              style={{ ["--marquee-duration" as string]: r === 0 ? "70s" : "80s" }}
            >
              {[...row, ...row].map((t, i) => (
                <span key={`${t}-${i}`} className="pr-3">
                  <span className="glass inline-block rounded-full px-5 py-2.5 font-mono text-sm whitespace-nowrap text-white/60">{t}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
