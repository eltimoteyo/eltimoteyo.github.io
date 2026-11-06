import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, GraduationCap, Languages } from "lucide-react";
import { certifications, education, languages, otherCourses } from "../data/profile";
import { Reveal, SectionHeading, SpotlightCard } from "./ui";

export function Education() {
  return (
    <section id="formacion" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="07" kicker="formación" title="Formación, certificados e idiomas" subtitle="Sigo aprendiendo: hoy estudio Administración de Tecnologías de Información." />
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <SpotlightCard className="h-full p-6 sm:p-8">
              <Header icon={<GraduationCap size={20} />} title="Formación académica" />
              <ol className="mt-6 space-y-5">
                {education.map((e) => (
                  <li key={e.title} className="relative border-l border-line pl-5">
                    <span className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-cyan/80 ring-4 ring-ink-900" aria-hidden="true" />
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase ring-1 ${
                          e.status === "Titulado"
                            ? "bg-emerald/10 text-emerald ring-emerald/30"
                            : e.status === "En curso"
                              ? "bg-amber/10 text-amber ring-amber/30"
                              : "bg-cyan/10 text-cyan ring-cyan/30"
                        }`}
                      >
                        {e.status}
                      </span>
                      {e.period && <span className="font-mono text-xs text-faint">{e.period}</span>}
                    </div>
                    <p className="mt-2 font-semibold text-white">{e.title}</p>
                    <p className="text-sm text-muted">{e.place}</p>
                  </li>
                ))}
              </ol>
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.08}>
              <SpotlightCard className="p-6 sm:p-8">
                <Header icon={<Award size={20} />} title="Certificaciones y cursos" />
                <ul className="mt-6 divide-y divide-line">
                  {certifications.map((c) => (
                    <li key={c.title} className="flex items-start justify-between gap-4 py-3.5 first:pt-0">
                      <div>
                        <p className="font-semibold text-white">{c.title}</p>
                        <p className="text-sm text-muted">{c.issuer}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <span className="font-mono text-xs text-faint">{c.year}</span>
                        {c.url && (
                          <a href={c.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan hover:text-white">
                            verificar <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted">
                  <span className="text-white/80">Otros cursos:</span> {otherCourses.join(" · ")}
                </p>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.14}>
              <SpotlightCard className="p-6 sm:p-8">
                <Header icon={<Languages size={20} />} title="Idiomas" />
                <div className="mt-6 space-y-5">
                  {languages.map((l) => (
                    <div key={l.name}>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-white">{l.name}</span>
                        <span className="text-muted">{l.level}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan to-emerald"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${l.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/25">{icon}</span>
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
    </div>
  );
}
