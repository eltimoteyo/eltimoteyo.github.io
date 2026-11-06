import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { profile } from "../data/profile";
import { Magnetic } from "./ui";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ ready }: { ready: boolean }) {
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2600);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-x-clip pt-28 pb-20">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr]">
        <motion.div variants={container} initial="hidden" animate={ready ? "show" : "hidden"}>
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[13px] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              Construyendo productos con IA desde {profile.location}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[clamp(2.7rem,7.4vw,5.6rem)] leading-[0.95] font-semibold tracking-[-0.035em]"
          >
            <span className="block text-white">{profile.firstName}</span>
            <span className="text-gradient-anim block pb-2">{profile.lastName}</span>
          </motion.h1>

          <motion.div variants={item} className="mt-5 flex items-center gap-3 font-display text-[clamp(1.05rem,4.8vw,1.5rem)]">
            <span className="text-muted">Soy</span>
            <span className="relative inline-flex h-[1.35em] items-center overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={roleIdx}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-semibold whitespace-nowrap text-white"
                >
                  {profile.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="animate-blink h-6 w-[2px] bg-cyan" aria-hidden="true" />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#proyectos"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink-950"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan via-emerald to-violet transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">Ver proyectos</span>
                <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.cv}
                download
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-cyan/50"
              >
                <Download size={16} /> Descargar CV
              </a>
            </Magnetic>
            <div className="flex items-center gap-2 sm:ml-2">
              <SocialButton href={profile.linkedin} label="LinkedIn">
                <LinkedinIcon size={17} />
              </SocialButton>
              <SocialButton href={profile.github} label="GitHub">
                <GithubIcon size={17} />
              </SocialButton>
              <SocialButton href={profile.whatsapp} label="WhatsApp">
                <WhatsappIcon size={17} />
              </SocialButton>
              <SocialButton href={`mailto:${profile.email}`} label="Email">
                <Mail size={17} />
              </SocialButton>
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-faint">
            <span className="text-cyan">stack:</span>
            {profile.heroStack.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && <span className="text-white/15">/</span>}
                <span className="text-muted">{s}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
          animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Avatar />
        </motion.div>
      </div>

      <motion.a
        href="#sobre-mi"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-faint uppercase sm:flex"
        aria-label="Bajar a la siguiente sección"
      >
        <span className="relative h-9 w-[22px] rounded-full border border-white/20">
          <motion.span
            className="absolute top-2 left-1/2 h-1.5 w-1 -translate-x-1/2 rounded-full bg-cyan"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        scroll
      </motion.a>
    </section>
  );
}

function SocialButton({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <Magnetic strength={0.4}>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={label}
        title={label}
        className="glass grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:border-cyan/50 hover:text-white"
      >
        {children}
      </a>
    </Magnetic>
  );
}

const ORBIT = ["Java", "Go", "K8s", "Azure", "IA", "Docker"];

function Avatar() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 140, damping: 18 });
  const ref = useRef<HTMLDivElement>(null);
  const photo = profile.photo ? `${import.meta.env.BASE_URL}${profile.photo}` : "";

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[460px] [perspective:1200px]"
      onPointerMove={(e) => {
        if (e.pointerType === "touch" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
        {/* Anillos */}
        <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[7%] rounded-full border border-white/[0.05]" />
        <div
          className="animate-spin-slow absolute inset-[12%] rounded-full border border-dashed border-cyan/25"
          style={{ ["--spin-duration" as string]: "70s" }}
        />
        <svg className="animate-spin-reverse absolute inset-[3%]" viewBox="0 0 100 100" style={{ ["--spin-duration" as string]: "50s" }} aria-hidden="true">
          <circle cx="50" cy="50" r="49" fill="none" stroke="url(#arc)" strokeWidth="0.4" strokeDasharray="40 260" strokeLinecap="round" />
          <defs>
            <linearGradient id="arc">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        {/* Insignias en órbita */}
        <div className="animate-spin-slow absolute inset-0" style={{ ["--spin-duration" as string]: "48s" }}>
          {ORBIT.map((b, i) => {
            const a = (i / ORBIT.length) * Math.PI * 2;
            return (
              <div
                key={b}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + 47 * Math.cos(a)}%`, top: `${50 + 47 * Math.sin(a)}%` }}
              >
                <div className="animate-spin-reverse" style={{ ["--spin-duration" as string]: "48s" }}>
                  <span className="glass block rounded-full bg-ink-900/60 px-3 py-1 font-mono text-[11px] whitespace-nowrap text-white/80">
                    {b}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retrato */}
        <div className="absolute inset-[19%]">
          <div
            className="animate-spin-slow absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,#22d3ee,#34d399,#a78bfa,#22d3ee)]"
            style={{ ["--spin-duration" as string]: "7s" }}
          />
          <div
            className="animate-spin-slow absolute -inset-4 rounded-full bg-[conic-gradient(from_0deg,#22d3ee,#34d399,#a78bfa,#22d3ee)] opacity-40 blur-2xl"
            style={{ ["--spin-duration" as string]: "7s" }}
          />
          <div className="relative h-full w-full overflow-hidden rounded-full bg-ink-900">
            {photo ? (
              <img src={photo} alt={`Foto de ${profile.name}`} className="h-full w-full object-cover" />
            ) : (
              <div className="grid-bg relative grid h-full w-full place-items-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.18),transparent_60%)]" />
                <span className="text-gradient relative font-display text-[clamp(4rem,11vw,7.5rem)] font-bold tracking-tighter">
                  {profile.initials}
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10 ring-inset" />
          </div>
        </div>

        {/* Tarjetas flotantes */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="glass absolute top-[4%] -left-[2%] rounded-2xl bg-ink-900/95 px-4 py-3 sm:-left-[6%]"
          style={{ translateZ: 60 }}
        >
          <div className="font-display text-2xl font-semibold text-white">
            10<span className="text-cyan">+</span>
          </div>
          <div className="text-[11px] text-muted">años de experiencia</div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="glass absolute -right-[2%] bottom-[10%] flex items-center gap-3 rounded-2xl bg-ink-900/95 px-4 py-3 sm:-right-[6%]"
          style={{ translateZ: 80 }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet/15 text-violet ring-1 ring-violet/30">
            <Sparkles size={18} />
          </span>
          <div>
            <div className="text-sm font-semibold text-white">IA generativa</div>
            <div className="text-[11px] text-muted">6 proveedores integrados</div>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="glass absolute bottom-[0%] left-[8%] hidden items-center gap-2 rounded-full sm:flex bg-ink-900/95 px-3.5 py-2 font-mono text-[11px] text-muted"
          style={{ translateZ: 40 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_10px_2px] shadow-emerald/60" />
          kubernetes · azure · running
        </motion.div>
      </motion.div>
    </div>
  );
}
