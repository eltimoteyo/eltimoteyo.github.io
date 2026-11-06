import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { BootScreen } from "./components/BootScreen";
import { ParticleField } from "./components/ParticleField";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { AIShowcase } from "./components/AIShowcase";
import { DevOps } from "./components/DevOps";
import { Stack } from "./components/Stack";
import { Education } from "./components/Education";
import { Contact, Footer } from "./components/Contact";
import { Backdrop, ScrollProgress } from "./components/ui";

const BOOT_KEY = "boot-seen";

function shouldBoot() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (new URLSearchParams(window.location.search).has("noboot")) return false;
    return sessionStorage.getItem(BOOT_KEY) !== "1";
  } catch {
    return false;
  }
}

export default function App() {
  const [booting, setBooting] = useState(shouldBoot);
  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      /* sin almacenamiento: no pasa nada */
    }
    setBooting(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <ParticleField />
      <ScrollProgress />
      <AnimatePresence>{booting && <BootScreen key="boot" onDone={finishBoot} />}</AnimatePresence>
      <Nav ready={!booting} />
      <main className="relative z-10">
        <Hero ready={!booting} />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <AIShowcase />
        <DevOps />
        <Stack />
        <Education />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </MotionConfig>
  );
}
