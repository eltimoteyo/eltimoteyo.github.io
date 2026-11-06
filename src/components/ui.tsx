import { useEffect, useRef, useState, type ReactNode, type PointerEvent as RPointerEvent } from "react";
import {
  motion, useInView, useMotionValue, useSpring, useReducedMotion, animate, useScroll,
  type HTMLMotionProps,
} from "framer-motion";
import type { Accent } from "../data/profile";

export const accentText: Record<Accent, string> = {
  cyan: "text-cyan",
  emerald: "text-emerald",
  violet: "text-violet",
  amber: "text-amber",
  rose: "text-rose",
  sky: "text-sky",
};
export const accentBg: Record<Accent, string> = {
  cyan: "from-cyan/25 to-cyan/5 ring-cyan/30",
  emerald: "from-emerald/25 to-emerald/5 ring-emerald/30",
  violet: "from-violet/25 to-violet/5 ring-violet/30",
  amber: "from-amber/25 to-amber/5 ring-amber/30",
  rose: "from-rose/25 to-rose/5 ring-rose/30",
  sky: "from-sky/25 to-sky/5 ring-sky/30",
};
export const accentDot: Record<Accent, string> = {
  cyan: "bg-cyan",
  emerald: "bg-emerald",
  violet: "bg-violet",
  amber: "bg-amber",
  rose: "bg-rose",
  sky: "bg-sky",
};

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01ABCDEF";

/** Texto que se "descifra" carácter por carácter al entrar en pantalla. */
export function ScrambleText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduce) {
      setOut(text);
      return;
    }
    let raf = 0;
    let frame = 0;
    const total = Math.max(22, text.length * 1.6);
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const reveal = Math.floor((frame / total) * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        s += c === " " || i < reveal ? c : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      setOut(s);
      if (reveal < text.length) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/** Aparece con desenfoque y desplazamiento al entrar en pantalla. */
export function Reveal({ children, delay = 0, y = 24, className, ...rest }: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, kicker, title, subtitle }: { index: string; kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-14 max-w-3xl">
      <Reveal>
        <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-cyan uppercase">
          <span className="text-faint">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-cyan to-transparent" />
          <ScrambleText text={kicker} />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Tarjeta de cristal con luz que sigue al cursor. */
export function SpotlightCard({ children, className = "", ...rest }: { children: ReactNode; className?: string } & HTMLMotionProps<"div">) {
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div onPointerMove={onMove} className={`spotlight glass rounded-3xl ${className}`} {...rest}>
      {children}
    </motion.div>
  );
}

/** Botón/enlace que se acerca levemente al cursor. */
export function Magnetic({ children, className = "", strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`inline-flex ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Número que cuenta hasta su valor al entrar en pantalla. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value, reduce]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[11px] tracking-wide text-muted ${className}`}>
      {children}
    </span>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan via-emerald to-violet"
      style={{ scaleX }}
    />
  );
}

/** Capas fijas de fondo: brillos, cuadrícula y línea de escaneo. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full bg-cyan/[0.09] blur-[120px]" />
      <div className="absolute top-1/4 -right-48 h-[34rem] w-[34rem] rounded-full bg-violet/[0.09] blur-[130px]" />
      <div className="absolute -bottom-48 left-1/4 h-[30rem] w-[40rem] rounded-full bg-emerald/[0.07] blur-[130px]" />
      <div className="grid-bg mask-radial absolute inset-0" />
      <div className="animate-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-cyan/[0.045] to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
