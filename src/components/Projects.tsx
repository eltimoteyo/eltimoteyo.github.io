import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import { projectCategories, projects, type Project, type ProjectCategory } from "../data/profile";
import { Icon } from "./icons";
import { accentBg, accentDot, accentText, Chip, Reveal, SectionHeading } from "./ui";

type Filter = ProjectCategory | "todos";

export function Projects() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const list = filter === "todos" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="proyectos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          kicker="proyectos"
          title="Productos, plataformas y sistemas que he construido"
          subtitle="Desde un ERP con microservicios e IA hasta sistemas para bancos y telcos. Toca cualquier tarjeta para ver el detalle."
        />

        <Reveal>
          <LayoutGroup id="filters">
            <div role="tablist" aria-label="Filtrar proyectos" className="glass mb-10 inline-flex max-w-full flex-wrap gap-1 rounded-3xl p-1.5 sm:rounded-full">
              {projectCategories.map((c) => {
                const count = c.id === "todos" ? projects.length : projects.filter((p) => p.category === c.id).length;
                const active = filter === c.id;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => setFilter(c.id)}
                    className={`relative rounded-full px-4 py-2 text-[13px] transition-colors ${active ? "text-ink-950" : "text-muted hover:text-white"}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan to-emerald"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative font-medium">
                      {c.label} <span className={`ml-1 font-mono text-[11px] ${active ? "text-ink-950/70" : "text-faint"}`}>{count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.div layout className="grid grid-flow-row-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} featured={filter === "todos" && !!p.featured} onOpen={() => setSelected(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}

function ProjectCard({ project: p, index, featured, onOpen }: { project: Project; index: number; featured: boolean; onOpen: () => void }) {
  const extra = p.stack.length - 4;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.03, 0.3) }}
      className={featured ? "sm:col-span-2" : ""}
    >
      <button
        type="button"
        onClick={onOpen}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        aria-label={`Ver detalle de ${p.title}`}
        className="spotlight glass group flex h-full w-full flex-col overflow-hidden rounded-3xl text-left transition-transform duration-300 hover:-translate-y-1"
      >
        <div className={`flex h-full flex-col ${featured ? "md:flex-row" : ""}`}>
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ring-1 ${accentBg[p.accent]} ${accentText[p.accent]}`}>
                <Icon name={p.icon} size={22} />
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all group-hover:rotate-45 group-hover:border-cyan/50 group-hover:text-white">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">{p.kicker}</p>
            <h3 className="mt-1.5 font-display text-xl leading-snug font-semibold text-white">{p.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{p.summary}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {p.stack.slice(0, 4).map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
              {extra > 0 && <Chip className="text-faint">+{extra}</Chip>}
            </div>
          </div>
          {featured && <FeaturedVisual project={p} />}
        </div>
      </button>
    </motion.article>
  );
}

/** Mini diagrama: el proyecto al centro y su stack en órbita. */
function FeaturedVisual({ project: p }: { project: Project }) {
  const nodes = p.stack.slice(0, 7);
  return (
    <div className="relative hidden min-h-[260px] flex-1 border-t border-line md:block md:border-t-0 md:border-l">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map((_, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 36 * Math.cos(a)}
              y2={50 + 34 * Math.sin(a)}
              stroke="currentColor"
              className={accentText[p.accent]}
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
              style={{ animation: "dash 1.4s linear infinite" }}
            />
          );
        })}
      </svg>
      {nodes.map((s, i) => {
        const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <motion.span
            key={s}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-ink-900/90 px-2.5 py-1 font-mono text-[10.5px] whitespace-nowrap text-white/80"
            style={{ left: `${50 + 36 * Math.cos(a)}%`, top: `${50 + 34 * Math.sin(a)}%` }}
            animate={{ y: [0, i % 2 ? 4 : -4, 0] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
          >
            {s}
          </motion.span>
        );
      })}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className={`animate-ping-soft absolute inset-0 rounded-2xl ${accentDot[p.accent]} opacity-30`} />
        <span className={`relative grid h-16 w-16 place-items-center rounded-2xl bg-ink-900 ring-1 ring-white/15 ${accentText[p.accent]}`}>
          <Icon name={p.icon} size={28} />
        </span>
      </div>
    </div>
  );
}

function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-ink-950/75 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        initial={{ y: 70, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="ring-spin glass relative max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-ink-900/95 p-6 sm:rounded-[2rem] sm:p-9"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-line text-muted hover:border-white/30 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-4 pr-12">
          <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ring-1 ${accentBg[p.accent]} ${accentText[p.accent]}`}>
            <Icon name={p.icon} size={26} />
          </span>
          <p className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">{p.context}</p>
        </div>

        <h3 id="project-title" className="mt-6 font-display text-3xl leading-tight font-semibold text-white">
          {p.title}
        </h3>
        <p className="mt-4 leading-relaxed text-white/80">{p.summary}</p>

        <p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">Lo más destacado</p>
        <ul className="mt-4 space-y-3">
          {p.details.map((d, i) => (
            <motion.li
              key={d}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="flex gap-3 leading-relaxed text-muted"
            >
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald/15 text-emerald">
                <Check size={12} strokeWidth={3} />
              </span>
              <span>{d}</span>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">Tecnologías</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Chip key={s} className="text-white/80">
              {s}
            </Chip>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
