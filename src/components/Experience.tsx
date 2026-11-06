import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { experience, type Job } from "../data/profile";
import { Chip, SectionHeading, SpotlightCard } from "./ui";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="experiencia" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          kicker="experiencia"
          title="Más de 10 años resolviendo problemas reales"
          subtitle="De soporte técnico a fundador: banca, seguros, telecomunicaciones, turismo y mis propios productos."
        />
        <div ref={ref} className="relative">
          <div className="absolute top-3 bottom-3 left-[11px] w-px bg-line sm:left-[15px]" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute top-3 bottom-3 left-[11px] w-px origin-top bg-gradient-to-b from-cyan via-emerald to-violet shadow-[0_0_12px_rgba(34,211,238,0.6)] sm:left-[15px]"
          />
          <ol className="space-y-7">
            {experience.map((job, i) => (
              <TimelineItem key={job.company} job={job} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const COLLAPSE_AT = 4;

function TimelineItem({ job, index }: { job: Job; index: number }) {
  const current = job.period.includes("Actualidad");
  const [expanded, setExpanded] = useState(false);
  const long = job.highlights.length > COLLAPSE_AT;
  const visible = long && !expanded ? job.highlights.slice(0, COLLAPSE_AT) : job.highlights;

  return (
    <motion.li
      className="relative pl-10 sm:pl-14"
      initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.03, 0.15) }}
    >
      <span className="absolute top-8 left-[4px] grid h-4 w-4 place-items-center sm:left-[8px]" aria-hidden="true">
        {current && <span className="animate-ping-soft absolute h-4 w-4 rounded-full bg-emerald/60" />}
        <span className={`relative h-3 w-3 rounded-full ring-4 ring-ink-950 ${current ? "bg-emerald" : "bg-cyan/70"}`} />
      </span>

      <div className={job.badge ? "ring-spin rounded-3xl" : ""}>
      <SpotlightCard className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{job.role}</h3>
              {job.badge && (
                <span className="rounded-full bg-gradient-to-r from-cyan/20 to-violet/20 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-white uppercase ring-1 ring-white/15">
                  {job.badge}
                </span>
              )}
            </div>
            <p className={`mt-1 font-medium ${job.badge ? "text-gradient" : "text-cyan"}`}>{job.company}</p>
          </div>
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <span className={`rounded-full px-3 py-1 font-mono text-xs ring-1 ${current ? "bg-emerald/10 text-emerald ring-emerald/30" : "bg-white/[0.03] text-muted ring-line"}`}>
              {job.period}
            </span>
            {job.location && (
              <span className="flex items-center gap-1 text-xs text-faint">
                <MapPin size={12} /> {job.location}
              </span>
            )}
          </div>
        </div>

        {job.summary && <p className="mt-4 leading-relaxed text-white/80">{job.summary}</p>}

        {job.highlights.length > 0 && (
          <ul className="mt-4 space-y-2.5">
            <AnimatePresence initial={false}>
              {visible.map((h) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 overflow-hidden text-[15px] leading-relaxed text-muted"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-cyan/70" aria-hidden="true" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
        {long && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-cyan hover:text-white"
            aria-expanded={expanded}
          >
            {expanded ? "ver menos" : `ver ${job.highlights.length - COLLAPSE_AT} más`}
            <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}

        {job.clients && (
          <div className="mt-5 space-y-4">
            {job.clients.map((c) => (
              <div key={c.name} className="rounded-2xl border border-line bg-white/[0.02] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">
                    <span className="mr-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">Cliente</span>
                    {c.name}
                  </p>
                  <span className="font-mono text-xs text-muted">{c.period}</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-emerald/70" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {job.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </SpotlightCard>
      </div>
    </motion.li>
  );
}
