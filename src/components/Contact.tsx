import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Check, Copy, Download, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";
import { Magnetic, Reveal, ScrambleText } from "./ui";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contacto" className="relative py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="ring-spin glass relative overflow-hidden rounded-[2.5rem] bg-ink-900/70 px-6 py-14 text-center sm:px-14 sm:py-20">
            <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-cyan/15 blur-[100px]" aria-hidden="true" />
            <div className="grid-bg mask-radial absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="relative">
              <div className="mb-5 font-mono text-xs tracking-[0.25em] text-cyan uppercase">
                <span className="text-faint">08 //</span> <ScrambleText text="contacto" />
              </div>
              <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-6xl">
                ¿Tienes un reto técnico? <span className="text-gradient-anim">Conversemos.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted">
                Arquitectura, microservicios, DevOps o integrar IA en tu producto: escríbeme y vemos cómo puedo ayudarte.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-emerald px-7 py-4 text-sm font-semibold text-ink-950 shadow-[0_10px_40px_-10px_rgba(34,211,238,0.7)]"
                  >
                    <Mail size={17} /> Escríbeme un email
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white hover:border-emerald/50"
                  >
                    <WhatsappIcon size={17} /> WhatsApp
                  </a>
                </Magnetic>
              </div>

              <button
                type="button"
                onClick={copy}
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm text-muted transition-colors hover:text-white"
              >
                {profile.email}
                {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                <span className="sr-only">Copiar email</span>
              </button>
              <motion.p initial={false} animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : -4 }} className="h-4 font-mono text-[11px] text-emerald" aria-live="polite">
                {copied ? "copiado al portapapeles" : ""}
              </motion.p>

              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                <ContactTile href={profile.linkedin} icon={<LinkedinIcon size={18} />} label="LinkedIn" value="Timoteo Rodríguez" />
                <ContactTile href={profile.github} icon={<GithubIcon size={18} />} label="GitHub" value="@eltimoteyo" />
                <ContactTile href={`tel:${profile.phone.replace(/\s/g, "")}`} icon={<Phone size={18} />} label="Teléfono" value={profile.phone} />
                <ContactTile href={profile.cv} download icon={<Download size={18} />} label="Currículum" value="Descargar PDF" />
              </div>
              <p className="mt-8 inline-flex items-center gap-1.5 text-sm text-faint">
                <MapPin size={14} /> {profile.location}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactTile({ href, icon, label, value, download }: { href: string; icon: ReactNode; label: string; value: string; download?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={download || undefined}
      className="group flex items-center gap-3 rounded-2xl border border-line bg-white/[0.03] p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-white/[0.05]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-muted transition-colors group-hover:text-cyan">{icon}</span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{label}</span>
        <span className="block truncate text-sm text-white">{value}</span>
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center text-sm text-faint sm:flex-row sm:px-8 sm:text-left">
        <p>
          © {new Date().getFullYear()} {profile.name}. Hecho con React, Framer Motion y Tailwind CSS.
        </p>
        <a href="#inicio" className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-white">
          volver arriba <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
