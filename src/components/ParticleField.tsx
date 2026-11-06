import { useEffect, useRef } from "react";

// Fondo animado: red de nodos con paquetes de datos, pings de escaneo y glifos
// (hexadecimal, criptografía y notación científica) que se "descifran".

const GLYPHS = [
  "0x3F", "0xA9", "0x7E", "0x1B", "0xFF", "C3", "{ }", "</>", "01", "10", "1101", "λ", "Σ", "∫", "∂", "π",
  "Δ", "Ω", "∞", "∇", "ψ", "⊕", "SHA-256", "AES", "TLS 1.3", "RSA", "JWT", "gRPC", "k8s", "::1", "0xDEAD",
  "200 OK", "ssh", "e^iπ", "√2", "∑xᵢ", "kubectl", "nats", "0b1010",
];
const SCRAMBLE = "0123456789ABCDEF#$%&*<>/\\|";

const RGB = {
  cyan: "34,211,238",
  emerald: "52,211,153",
  violet: "167,139,250",
};

type NodeP = { x: number; y: number; z: number; vx: number; vy: number; color: string };
type Packet = { a: number; b: number; t: number; speed: number; color: string; hops: number };
type Glyph = { x: number; y: number; vy: number; text: string; shown: string; alpha: number; size: number; color: string; next: number; scramble: number };
type Ping = { x: number; y: number; r: number; max: number; color: string };

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let nodes: NodeP[] = [];
    let pos = new Float32Array(0);
    const edges: number[] = [];
    let packets: Packet[] = [];
    let glyphs: Glyph[] = [];
    let pings: Ping[] = [];
    let nextPing = 0;
    const mouse = { x: -9999, y: -9999 };
    const R = 190;

    const pickColor = () => {
      const r = Math.random();
      return r < 0.62 ? RGB.cyan : r < 0.85 ? RGB.emerald : RGB.violet;
    };

    const newGlyph = (anywhere: boolean): Glyph => {
      const text = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 20,
        vy: 0.08 + Math.random() * 0.22,
        text,
        shown: text,
        alpha: 0.05 + Math.random() * 0.13,
        size: 10 + Math.random() * 4,
        color: Math.random() < 0.7 ? RGB.cyan : Math.random() < 0.5 ? RGB.violet : RGB.emerald,
        next: performance.now() + 1500 + Math.random() * 6000,
        scramble: 0,
      };
    };

    const init = () => {
      const count = Math.round(Math.min(140, Math.max(38, (w * h) / 13000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        color: pickColor(),
      }));
      pos = new Float32Array(count * 2);
      glyphs = Array.from({ length: Math.round(count / 4.5) }, () => newGlyph(true));
      packets = [];
      pings = [];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const frame = (now: number, animate: boolean) => {
      const dt = animate ? Math.min(50, now - last) / 16.67 : 0;
      last = now;
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      const maxD = Math.min(150, Math.max(110, w / 11));
      const maxD2 = maxD * maxD;

      // Posiciones con parallax según scroll y repulsión suave del cursor
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -30) n.x = w + 30;
        else if (n.x > w + 30) n.x = -30;
        if (n.y < -30) n.y = h + 30;
        else if (n.y > h + 30) n.y = -30;

        const span = h + 60;
        let py = (n.y - sy * (0.05 + n.z * 0.14)) % span;
        if (py < -30) py += span;
        let px = n.x;
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * 22 * (0.4 + n.z);
          px += (dx / d) * f;
          py += (dy / d) * f;
        }
        pos[i * 2] = px;
        pos[i * 2 + 1] = py;
      }

      // Conexiones
      edges.length = 0;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const ax = pos[i * 2];
        const ay = pos[i * 2 + 1];
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = ax - pos[j * 2];
          const dy = ay - pos[j * 2 + 1];
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const d = Math.sqrt(d2);
            const depth = Math.min(nodes[i].z, nodes[j].z);
            const a = (1 - d / maxD) * (0.06 + 0.22 * depth);
            ctx.strokeStyle = `rgba(${RGB.cyan},${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(pos[j * 2], pos[j * 2 + 1]);
            ctx.stroke();
            edges.push(i, j);
          }
        }
      }

      // Líneas hacia el cursor
      if (mouse.x > -999) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = pos[i * 2] - mouse.x;
          const dy = pos[i * 2 + 1] - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < R * 1.15) {
            ctx.strokeStyle = `rgba(${RGB.emerald},${((1 - d / (R * 1.15)) * 0.35).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(pos[i * 2], pos[i * 2 + 1]);
            ctx.stroke();
          }
        }
      }

      // Nodos
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x = pos[i * 2];
        const y = pos[i * 2 + 1];
        const r = 0.6 + n.z * 1.7;
        if (n.z > 0.72) {
          ctx.fillStyle = `rgba(${n.color},0.08)`;
          ctx.beginPath();
          ctx.arc(x, y, r * 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${n.color},${(0.35 + n.z * 0.55).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (animate) {
        // Paquetes de datos que viajan por la red
        if (edges.length && packets.length < 26 && Math.random() < 0.09 * dt) {
          const k = ((Math.random() * (edges.length / 2)) | 0) * 2;
          const flip = Math.random() < 0.5;
          packets.push({
            a: flip ? edges[k + 1] : edges[k],
            b: flip ? edges[k] : edges[k + 1],
            t: 0,
            speed: 0.012 + Math.random() * 0.02,
            color: Math.random() < 0.7 ? RGB.emerald : RGB.violet,
            hops: 0,
          });
        }
        packets = packets.filter((p) => {
          p.t += p.speed * dt;
          if (p.t >= 1) {
            if (p.hops < 4 && Math.random() < 0.65 && edges.length) {
              const start = ((Math.random() * (edges.length / 2)) | 0) * 2;
              for (let s = 0; s < edges.length; s += 2) {
                const k = (start + s) % edges.length;
                const other = edges[k] === p.b ? edges[k + 1] : edges[k + 1] === p.b ? edges[k] : -1;
                if (other >= 0 && other !== p.a) {
                  p.a = p.b;
                  p.b = other;
                  p.t = 0;
                  p.hops++;
                  return true;
                }
              }
            }
            if (Math.random() < 0.18) {
              pings.push({ x: pos[p.b * 2], y: pos[p.b * 2 + 1], r: 2, max: 34 + Math.random() * 26, color: p.color });
            }
            return false;
          }
          return true;
        });
        for (const p of packets) {
          const ax = pos[p.a * 2];
          const ay = pos[p.a * 2 + 1];
          const bx = pos[p.b * 2];
          const by = pos[p.b * 2 + 1];
          const x = ax + (bx - ax) * p.t;
          const y = ay + (by - ay) * p.t;
          const tt = Math.max(0, p.t - 0.22);
          const grad = ctx.createLinearGradient(ax + (bx - ax) * tt, ay + (by - ay) * tt, x, y);
          grad.addColorStop(0, `rgba(${p.color},0)`);
          grad.addColorStop(1, `rgba(${p.color},0.85)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(ax + (bx - ax) * tt, ay + (by - ay) * tt);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.fillStyle = `rgba(${p.color},0.95)`;
          ctx.beginPath();
          ctx.arc(x, y, 1.9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${p.color},0.18)`;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.lineWidth = 1;

        // Pings de escaneo
        if (now > nextPing && nodes.length) {
          const i = (Math.random() * nodes.length) | 0;
          pings.push({ x: pos[i * 2], y: pos[i * 2 + 1], r: 2, max: 60 + Math.random() * 70, color: RGB.cyan });
          nextPing = now + 1800 + Math.random() * 2600;
        }
        pings = pings.filter((p) => {
          p.r += 0.85 * dt;
          const a = 1 - p.r / p.max;
          if (a <= 0) return false;
          ctx.strokeStyle = `rgba(${p.color},${(a * 0.45).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.stroke();
          return true;
        });
      }

      // Glifos que flotan y se "descifran"
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        if (animate) {
          g.y -= g.vy * dt;
          if (g.y < -24) glyphs[i] = newGlyph(false);
          if (now > g.next) {
            g.scramble = 14;
            g.text = GLYPHS[(Math.random() * GLYPHS.length) | 0];
            g.next = now + 3000 + Math.random() * 7000;
          }
          if (g.scramble > 0) {
            g.scramble -= dt;
            const reveal = Math.max(0, 1 - g.scramble / 14);
            const n = Math.floor(g.text.length * reveal);
            let s = g.text.slice(0, n);
            for (let c = n; c < g.text.length; c++) s += SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
            g.shown = s;
          } else g.shown = g.text;
        }
        const boost = g.scramble > 0 ? 2.2 : 1;
        ctx.font = `${g.size.toFixed(0)}px "JetBrains Mono Variable", ui-monospace, monospace`;
        ctx.fillStyle = `rgba(${g.color},${Math.min(0.5, g.alpha * boost).toFixed(3)})`;
        ctx.fillText(g.shown, g.x, g.y);
      }
    };

    const loop = (now: number) => {
      frame(now, true);
      raf = requestAnimationFrame(loop);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reduce) frame(performance.now(), false);
      }, 150);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    if (reduce) frame(performance.now(), false);
    else raf = requestAnimationFrame(loop);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
