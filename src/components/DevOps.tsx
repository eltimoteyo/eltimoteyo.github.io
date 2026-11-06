import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { architecturePatterns, devopsContexts, pipeline } from "../data/profile";
import { Icon } from "./icons";
import { Reveal, SectionHeading, SpotlightCard } from "./ui";

export function DevOps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(reduce ? pipeline.length : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setInterval(() => setActive((a) => (a >= pipeline.length + 2 ? 0 : a + 1)), 620);
    return () => window.clearInterval(t);
  }, [inView, reduce]);

  const progress = Math.min(active, pipeline.length - 1) / (pipeline.length - 1);
  const shipped = active >= pipeline.length;

  return (
    <section id="devops" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          kicker="devops y arquitectura"
          title="Del commit a producción, automatizado y observable"
          subtitle="Diseño la arquitectura, automatizo el despliegue y dejo todo monitoreado, tanto en banca como en mis propios productos."
        />

        <Reveal>
          <div ref={ref} className="glass relative overflow-hidden rounded-[2rem] bg-ink-900/60 p-6 sm:p-8">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <span className="text-muted">
                <span className="text-cyan">pipeline</span> · main · #{1024 + active}
              </span>
              <motion.span
                animate={{ opacity: shipped ? 1 : 0.5 }}
                className={`rounded-full px-3 py-1 ring-1 ${shipped ? "bg-emerald/10 text-emerald ring-emerald/30" : "bg-amber/10 text-amber ring-amber/30"}`}
              >
                {shipped ? "✓ desplegado en producción" : "● en ejecución…"}
              </motion.span>
            </div>

            <div className="relative">
              <div className="absolute top-7 right-[7%] left-[7%] hidden h-px bg-line lg:block" aria-hidden="true" />
              <motion.div
                aria-hidden="true"
                className="absolute top-7 left-[7%] hidden h-px origin-left bg-gradient-to-r from-cyan via-emerald to-violet shadow-[0_0_10px_rgba(52,211,153,0.7)] lg:block"
                style={{ width: "86%" }}
                animate={{ scaleX: progress }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <ol className="relative grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
                {pipeline.map((p, i) => {
                  const done = i < active;
                  const running = i === active;
                  return (
                    <li key={p.title} className="flex flex-col items-center text-center">
                      <motion.span
                        animate={{
                          scale: running ? 1.08 : 1,
                          borderColor: done ? "rgba(52,211,153,0.6)" : running ? "rgba(34,211,238,0.8)" : "rgba(255,255,255,0.1)",
                          boxShadow: running ? "0 0 30px -4px rgba(34,211,238,0.7)" : "0 0 0 0 rgba(0,0,0,0)",
                        }}
                        transition={{ duration: 0.35 }}
                        className={`relative grid h-14 w-14 place-items-center rounded-2xl border bg-ink-900 ${done ? "text-emerald" : running ? "text-cyan" : "text-faint"}`}
                      >
                        <Icon name={p.icon} size={22} />
                        {done && (
                          <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald text-ink-950">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </motion.span>
                      <span className={`mt-3 font-mono text-[13px] ${done || running ? "text-white" : "text-muted"}`}>{p.title}</span>
                      <span className="mt-0.5 text-[11px] text-faint">{p.text}</span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-ink-950/70 p-4 font-mono text-[11.5px] leading-relaxed text-muted">
              <div>
                <span className="text-emerald">$</span> kubectl rollout status deployment/api-gateway
              </div>
              <motion.div animate={{ opacity: shipped ? 1 : 0.35 }}>
                {shipped ? (
                  <span className="text-emerald">deployment "api-gateway" successfully rolled out</span>
                ) : (
                  <span>Waiting for deployment "api-gateway" rollout to finish: {Math.max(0, Math.min(active, 3))} of 3 updated replicas are available…</span>
                )}
              </motion.div>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {devopsContexts.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <SpotlightCard className="h-full p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald/10 text-emerald ring-1 ring-emerald/25">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-[15px] text-muted">
                      <span className="h-1.5 w-1.5 rotate-45 bg-emerald/70" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-faint uppercase">Patrones de arquitectura que aplico</p>
          <div className="flex flex-wrap gap-2.5">
            {architecturePatterns.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                className="glass cursor-default rounded-full px-4 py-2 text-sm text-white/85 transition-colors hover:border-cyan/40"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
