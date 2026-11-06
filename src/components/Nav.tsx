import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navItems, profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";

const ids = navItems.map((n) => n.id);

export function Nav({ ready }: { ready: boolean }) {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4"
    >
      <nav
        aria-label="Principal"
        className={`glass mx-auto flex max-w-fit items-center gap-1 rounded-full p-1.5 pl-4 transition-shadow duration-500 ${
          scrolled ? "bg-ink-900/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]" : ""
        }`}
      >
        <a href="#inicio" className="mr-1 font-mono text-sm font-semibold whitespace-nowrap" aria-label="Ir al inicio">
          <span className="text-faint">~/</span>
          <span className="text-gradient">timoteo</span>
        </a>
        <ul className="hidden items-center xl:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative block rounded-full px-3 py-2 text-[13px] transition-colors ${
                  active === item.id ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.cv}
          download
          className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan to-emerald px-4 py-2 text-[13px] font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
        >
          <Download size={14} strokeWidth={2.5} /> CV
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="grid h-9 w-9 place-items-center rounded-full text-muted hover:text-white xl:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 max-w-sm rounded-3xl bg-ink-900/90 p-2 xl:hidden"
          >
            <ul className="grid grid-cols-2 gap-1">
              {navItems.map((item, i) => (
                <motion.li key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-sm ${active === item.id ? "bg-white/[0.07] text-white" : "text-muted"}`}
                  >
                    <span className="mr-2 font-mono text-[10px] text-faint">{String(i).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
