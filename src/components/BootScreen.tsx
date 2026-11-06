import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { text: "iniciando timoteo.os v2026.11", ok: false },
  { text: "cargando módulos: java · go · kubernetes · azure · ia", ok: false },
  { text: "verificando firmas sha-256", ok: true },
  { text: "abriendo canal cifrado tls 1.3", ok: true },
  { text: "acceso concedido", ok: false },
];
const STEP = 230;
const TOTAL = 180 + LINES.length * STEP + 420;

/** Secuencia corta de arranque estilo terminal. Se puede saltar con clic o tecla. */
export function BootScreen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };
    const timers = LINES.map((_, i) => window.setTimeout(() => setShown(i + 1), 180 + i * STEP));
    const end = window.setTimeout(finish, TOTAL);
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
      exit={{ opacity: 0, filter: "blur(12px)", scale: 1.03 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid-bg mask-radial absolute inset-0 opacity-60" />
      <div className="relative w-[min(92vw,560px)] font-mono text-[13px] sm:text-sm">
        <div className="mb-7 flex items-center gap-4">
          <div className="relative grid h-12 w-12 place-items-center">
            <span className="animate-spin-slow absolute inset-0 rounded-xl border border-dashed border-cyan/50" style={{ ["--spin-duration" as string]: "6s" }} />
            <span className="text-gradient font-display text-lg font-bold">TR</span>
          </div>
          <div>
            <div className="text-white">timoteo@lima</div>
            <div className="text-faint">secure shell · sesión 0x7E3A</div>
          </div>
        </div>
        <div className="space-y-1.5">
          {LINES.slice(0, shown).map((l, i) => (
            <motion.div
              key={l.text}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2"
            >
              <span className="text-emerald">›</span>
              <span className={i === LINES.length - 1 ? "text-gradient font-semibold" : "text-muted"}>{l.text}</span>
              {l.ok && <span className="ml-auto text-emerald">[ ok ]</span>}
            </motion.div>
          ))}
        </div>
        <div className="mt-7 h-[3px] w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan via-emerald to-violet"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: TOTAL / 1000 - 0.2, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-4 text-[11px] text-faint">clic o cualquier tecla para saltar</p>
      </div>
    </motion.div>
  );
}
