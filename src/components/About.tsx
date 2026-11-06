import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { about } from "../data/profile";
import { Icon } from "./icons";
import { Reveal, SectionHeading, SpotlightCard } from "./ui";

export function About() {
  return (
    <section id="sobre-mi" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="01" kicker="sobre mí" title="Del soporte técnico a construir plataformas completas" />
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={`text-lg leading-relaxed text-pretty ${i === 0 ? "text-white/90" : "text-muted"} ${i > 0 ? "mt-5" : ""}`}>{p}</p>
              </Reveal>
            ))}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {about.facts.map((f, i) => (
                <Reveal key={f.label} delay={0.1 + i * 0.06}>
                  <SpotlightCard className="flex h-full items-start gap-3.5 rounded-2xl p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/20">
                      <Icon name={f.icon} size={18} />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">{f.label}</div>
                      <div className="mt-1 text-sm text-white">{f.value}</div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15}>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const script = about.terminal;
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    if (reduce) {
      setIdx(script.length);
      return;
    }
    if (!inView || idx >= script.length) return;
    const cmd = script[idx].cmd;
    let t: number;
    if (chars < cmd.length) t = window.setTimeout(() => setChars((c) => c + 1), 34 + Math.random() * 50);
    else if (!showOut) t = window.setTimeout(() => setShowOut(true), 260);
    else
      t = window.setTimeout(() => {
        setIdx((i) => i + 1);
        setChars(0);
        setShowOut(false);
      }, 700);
    return () => window.clearTimeout(t);
  }, [inView, idx, chars, showOut, reduce, script]);

  return (
    <div ref={ref} className="ring-spin glass overflow-hidden rounded-3xl bg-ink-900/70 shadow-[0_30px_80px_-30px_rgba(34,211,238,0.25)]">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-rose/80" />
        <span className="h-3 w-3 rounded-full bg-amber/80" />
        <span className="h-3 w-3 rounded-full bg-emerald/80" />
        <span className="ml-3 font-mono text-xs text-faint">timoteo@lima: ~</span>
        <span className="ml-auto font-mono text-[10px] text-faint">zsh · ssh</span>
      </div>
      <div className="min-h-[340px] p-5 font-mono text-[12.5px] leading-relaxed sm:p-6 sm:text-[13px]">
        {script.map((entry, i) => {
          if (i > idx) return null;
          const current = i === idx;
          const typed = current ? entry.cmd.slice(0, chars) : entry.cmd;
          const out = !current || showOut;
          return (
            <div key={entry.cmd} className="mb-3">
              <div className="flex flex-wrap items-center gap-x-2">
                <span className="text-emerald">➜</span>
                <span className="text-cyan">~</span>
                <span className="text-white">{typed}</span>
                {current && !showOut && <span className="animate-blink inline-block h-4 w-2 bg-cyan/80" />}
              </div>
              {out && (
                <div className="mt-1 whitespace-pre text-muted">
                  {entry.out.map((l) => (
                    <div key={l} className={l.includes("Running") ? "text-muted [&>span]:text-emerald" : ""}>
                      {l.includes("Running") ? (
                        <>
                          {l.replace("Running", "")}
                          <span>Running</span>
                        </>
                      ) : (
                        l
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {idx >= script.length && (
          <div className="flex items-center gap-2">
            <span className="text-emerald">➜</span>
            <span className="text-cyan">~</span>
            <span className="animate-blink inline-block h-4 w-2 bg-cyan/80" />
          </div>
        )}
      </div>
    </div>
  );
}
