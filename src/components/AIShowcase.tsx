import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, Check, Inbox, Network, ShieldCheck, UserCheck, X, Zap } from "lucide-react";
import { aiCapabilities, aiProviders } from "../data/profile";
import { Icon } from "./icons";
import { Reveal, SectionHeading, SpotlightCard } from "./ui";

export function AIShowcase() {
  return (
    <section id="ia" className="relative py-28">
      <div className="absolute inset-x-0 top-1/3 -z-0 mx-auto h-96 max-w-4xl rounded-full bg-violet/[0.07] blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          kicker="inteligencia artificial"
          title="IA generativa aplicada a negocio, no solo a demos"
          subtitle="Integro modelos de lenguaje y visión en productos que la gente usa: con enrutamiento entre proveedores, agentes supervisados y control de costos."
        />
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 [&>*]:min-w-0">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {aiCapabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07}>
                <SpotlightCard className="flex h-full gap-4 rounded-2xl p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet/12 text-violet ring-1 ring-violet/30">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{c.text}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <GatewaySimulator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type Scenario = { task: string; label: string; primary: string; fallback?: string; ms: number };
const SCENARIOS: Scenario[] = [
  { task: "visión", label: "Leer medidas desde una foto", primary: "Gemini", fallback: "Claude", ms: 812 },
  { task: "agente", label: "Proponer un plan de cobranza", primary: "Claude", ms: 1240 },
  { task: "chat", label: "Responder un mensaje de WhatsApp", primary: "Groq", ms: 310 },
  { task: "resumen", label: "Resumir un ticket de soporte", primary: "OpenAI", fallback: "OpenRouter", ms: 905 },
  { task: "privado", label: "Clasificar un documento interno", primary: "Ollama", ms: 640 },
];
type Phase = "request" | "routing" | "trying" | "failed" | "fallback" | "done";
const DURATION: Record<Phase, number> = { request: 700, routing: 850, trying: 1000, failed: 750, fallback: 1000, done: 1700 };

type Log = { id: number; time: string; text: string; tone: "info" | "bad" | "good" };

function nowTime() {
  return new Date().toLocaleTimeString("es-PE", { hour12: false });
}

function GatewaySimulator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [si, setSi] = useState(0);
  const [phase, setPhase] = useState<Phase>("request");
  const [logs, setLogs] = useState<Log[]>([]);
  const logId = useRef(0);
  const s = SCENARIOS[si];

  const push = (text: string, tone: Log["tone"]) =>
    setLogs((l) => [...l.slice(-4), { id: logId.current++, time: nowTime(), text, tone }]);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setTimeout(() => {
      if (phase === "request") {
        setPhase("routing");
        push(`gateway  tarea=${s.task} → ${s.primary.toLowerCase()}`, "info");
      } else if (phase === "routing") setPhase("trying");
      else if (phase === "trying") {
        if (s.fallback) {
          setPhase("failed");
          push(`${s.primary.toLowerCase()}  timeout 30s ✕`, "bad");
        } else {
          setPhase("done");
          push(`${s.primary.toLowerCase()}  ok · ${s.ms} ms ✓`, "good");
        }
      } else if (phase === "failed") {
        setPhase("fallback");
        push(`gateway  fallback → ${s.fallback!.toLowerCase()}`, "info");
      } else if (phase === "fallback") {
        setPhase("done");
        push(`${s.fallback!.toLowerCase()}  ok · ${s.ms} ms ✓`, "good");
      } else {
        setSi((i) => (i + 1) % SCENARIOS.length);
        setPhase("request");
      }
    }, DURATION[phase]);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, inView, reduce]);

  const statusOf = (name: string): "idle" | "trying" | "failed" | "ok" => {
    if (name === s.primary) {
      if (phase === "trying") return "trying";
      if (phase === "failed" || phase === "fallback") return "failed";
      if (phase === "done" && !s.fallback) return "ok";
      if (phase === "done" && s.fallback) return "failed";
    }
    if (name === s.fallback) {
      if (phase === "fallback") return "trying";
      if (phase === "done") return "ok";
    }
    return "idle";
  };

  const flow1 = phase === "routing";
  const flow2 = phase === "trying" || phase === "fallback";

  return (
    <div ref={ref} className="ring-spin glass rounded-[2rem] bg-ink-900/70 p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-soft absolute h-full w-full rounded-full bg-emerald" />
            <span className="relative h-2 w-2 rounded-full bg-emerald" />
          </span>
          simulación en vivo · ai-gateway
        </div>
        <span className="font-mono text-[10px] text-faint">
          {si + 1}/{SCENARIOS.length}
        </span>
      </div>

      <div className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
        {/* Solicitud */}
        <motion.div
          animate={{ borderColor: phase === "request" ? "rgba(34,211,238,0.6)" : "rgba(255,255,255,0.08)" }}
          className="rounded-2xl border bg-white/[0.03] p-4 lg:w-[30%]"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            <Inbox size={13} /> solicitud
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={si} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <p className="mt-2 text-sm leading-snug text-white">{s.label}</p>
              <span className="mt-2 inline-block rounded-md bg-cyan/10 px-2 py-0.5 font-mono text-[11px] text-cyan">tarea: {s.task}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <Flow active={flow1} />

        {/* Gateway */}
        <motion.div
          animate={{
            borderColor: phase === "routing" || phase === "failed" ? "rgba(167,139,250,0.7)" : "rgba(255,255,255,0.08)",
            boxShadow: phase === "routing" || phase === "failed" ? "0 0 40px -10px rgba(167,139,250,0.6)" : "0 0 0 0 rgba(0,0,0,0)",
          }}
          className="rounded-2xl border bg-white/[0.03] p-4 lg:w-[34%]"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            <Network size={13} /> ai gateway
          </div>
          <ul className="mt-2.5 space-y-1.5 text-[12.5px] text-muted">
            <li className="flex items-center gap-2">
              <Zap size={12} className="text-violet" /> modelo por tarea
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-violet" /> fallback automático
            </li>
            <li className="flex items-center gap-2">
              <Check size={12} className="text-violet" /> control de consumo
            </li>
          </ul>
          <div className="mt-3 h-6">
            <AnimatePresence mode="wait">
              {phase !== "request" && (
                <motion.span
                  key={`${si}-${phase === "fallback" || (phase === "done" && s.fallback) ? "fb" : "pr"}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-block rounded-md bg-violet/12 px-2 py-0.5 font-mono text-[11px] text-violet"
                >
                  {s.task} → {phase === "fallback" || (phase === "done" && s.fallback) ? s.fallback : s.primary}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <Flow active={flow2} />

        {/* Proveedores */}
        <div className="rounded-2xl border border-line bg-white/[0.03] p-3 lg:w-[36%]">
          <div className="px-1 pb-2 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">proveedores</div>
          <ul className="space-y-1">
            {aiProviders.map((name) => {
              const st = statusOf(name);
              return (
                <motion.li
                  key={name}
                  animate={{
                    backgroundColor:
                      st === "trying" ? "rgba(251,191,36,0.08)" : st === "failed" ? "rgba(251,113,133,0.08)" : st === "ok" ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0)",
                  }}
                  className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px]"
                >
                  <span className={st === "idle" ? "text-muted" : "text-white"}>{name}</span>
                  <StatusBadge status={st} ms={s.ms} />
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Consola */}
      <div className="mt-5 rounded-2xl border border-line bg-ink-950/70 p-4 font-mono text-[11.5px] leading-relaxed">
        <div className="mb-2 text-[10px] tracking-[0.18em] text-faint uppercase">registro</div>
        <div className="min-h-[96px]">
          <AnimatePresence initial={false}>
            {logs.map((l) => (
              <motion.div
                key={l.id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <span className="shrink-0 text-faint">{l.time}</span>
                <span className={l.tone === "bad" ? "text-rose" : l.tone === "good" ? "text-emerald" : "text-muted"}>{l.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {logs.length === 0 && <span className="text-faint">esperando solicitudes…</span>}
        </div>
      </div>

      <AgentLoop active={inView && !reduce} />
    </div>
  );
}

function StatusBadge({ status, ms }: { status: "idle" | "trying" | "failed" | "ok"; ms: number }) {
  if (status === "trying")
    return (
      <span className="flex items-center gap-1.5 font-mono text-[11px] text-amber">
        <motion.span className="h-1.5 w-1.5 rounded-full bg-amber" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
        probando
      </span>
    );
  if (status === "failed")
    return (
      <span className="flex items-center gap-1 font-mono text-[11px] text-rose">
        <X size={12} /> timeout
      </span>
    );
  if (status === "ok")
    return (
      <span className="flex items-center gap-1 font-mono text-[11px] text-emerald">
        <Check size={12} /> {ms} ms
      </span>
    );
  return <span className="h-1.5 w-1.5 rounded-full bg-white/15" />;
}

/** Conector entre bloques: vertical en móvil, horizontal en escritorio. */
function Flow({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-9 items-center justify-center lg:h-auto lg:w-[6%] lg:self-stretch" aria-hidden="true">
      <div className="h-full w-px bg-line lg:h-px lg:w-full" />
      {active && (
        <>
          <motion.span
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald shadow-[0_0_14px_3px_rgba(52,211,153,0.6)] lg:hidden"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-emerald shadow-[0_0_14px_3px_rgba(52,211,153,0.6)] lg:block"
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}

const AGENT_STEPS = [
  { icon: Bot, title: "El agente propone", text: "Analiza el caso y sugiere una acción" },
  { icon: UserCheck, title: "Una persona aprueba", text: "Nada se ejecuta sin revisión" },
  { icon: ShieldCheck, title: "Se ejecuta con límites", text: "Guardrails, memoria y tope de consumo" },
];

function AgentLoop({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % AGENT_STEPS.length), 1500);
    return () => window.clearInterval(t);
  }, [active]);

  return (
    <div className="mt-5">
      <div className="mb-3 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">agentes con aprobación humana</div>
      <div className="grid gap-2 sm:grid-cols-3">
        {AGENT_STEPS.map((a, i) => {
          const on = i === step;
          const IconCmp = a.icon;
          return (
            <motion.div
              key={a.title}
              animate={{
                borderColor: on ? "rgba(52,211,153,0.55)" : "rgba(255,255,255,0.08)",
                backgroundColor: on ? "rgba(52,211,153,0.07)" : "rgba(255,255,255,0.02)",
              }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl border p-3.5"
            >
              <div className="flex items-center gap-2.5">
                <span className={`grid h-8 w-8 place-items-center rounded-lg ${on ? "bg-emerald/20 text-emerald" : "bg-white/5 text-muted"}`}>
                  <IconCmp size={16} />
                </span>
                <span className="font-mono text-[10px] text-faint">0{i + 1}</span>
              </div>
              <p className={`mt-2.5 text-sm font-semibold ${on ? "text-white" : "text-white/70"}`}>{a.title}</p>
              <p className="mt-0.5 text-xs text-muted">{a.text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
