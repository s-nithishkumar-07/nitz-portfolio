"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tent, Camera, Code2, Mountain, Aperture, Compass } from "lucide-react";

// Fixed positions (% of viewport) — kept well inside so they never overflow
const WIDGETS = [
  { Icon: Tent,     color: "var(--accent-cyan)",   size: 44, x: 5,  y: 15, dx: 30,  dy: 40,  dur: 38 },
  { Icon: Camera,   color: "var(--accent-purple)", size: 52, x: 80, y: 8,  dx: -25, dy: 50,  dur: 45 },
  { Icon: Code2,    color: "var(--accent-gold)",   size: 60, x: 15, y: 70, dx: 40,  dy: -30, dur: 42 },
  { Icon: Mountain, color: "rgba(255,255,255,0.3)",size: 68, x: 70, y: 55, dx: -30, dy: -35, dur: 50 },
  { Icon: Aperture, color: "var(--accent-purple)", size: 56, x: 45, y: 85, dx: -20, dy: -45, dur: 35 },
  { Icon: Compass,  color: "var(--accent-cyan)",   size: 46, x: 88, y: 40, dx: -40, dy: 20,  dur: 40 },
];

export default function FloatingWidgets() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    // overflow-hidden on this container prevents any icon from ever causing scrollbar
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ overflow: "hidden" }}
    >
      {WIDGETS.map((w, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.05]"
          style={{
            left: `${w.x}%`,
            top: `${w.y}%`,
          }}
          animate={{
            x: [0, w.dx, 0],
            y: [0, w.dy, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: w.dur,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <w.Icon size={w.size} style={{ color: w.color }} />
        </motion.div>
      ))}
    </div>
  );
}
