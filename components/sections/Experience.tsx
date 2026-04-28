"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Briefcase, MapPin, Clock, Sparkles } from "lucide-react";
import { experience } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useRef } from "react";

/* ── 3D Tilt Card Wrapper ── */
function TiltCard({ children, color }: { children: React.ReactNode; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX   = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY   = useTransform(y, [-0.5, 0.5], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  }
  function handleMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX, rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}22`,
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        cursor: "default",
        willChange: "transform",
      }}
      whileHover={{ scale: 1.02, boxShadow: `0 20px 60px ${color}18` }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Dynamic spotlight */}
      <motion.div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, ${color}12 0%, transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

export default function Experience() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="experience"
      style={{
        background: "var(--bg-primary)",
        padding: isMobile ? "60px 0" : "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        borderRadius: "50%", filter: "blur(160px)",
        opacity: 0.04, background: "var(--accent-purple)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <Sparkles size={12} /> Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-black">
            My <span className="gradient-text-gold">Experience</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", maxWidth: "460px", margin: "12px auto 0" }}>
            Internships, part-time roles, training & freelance work that shaped my skills
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: isMobile ? "16px" : "24px",
        }}>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard color={exp.color}>
                {/* Top glow line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)`,
                  opacity: 0.9,
                }} />

                {/* Corner glow */}
                <div style={{
                  position: "absolute", top: "-40px", right: "-40px",
                  width: "120px", height: "120px", borderRadius: "50%",
                  background: exp.color, opacity: 0.05, filter: "blur(40px)",
                  pointerEvents: "none",
                }} />

                <div style={{ padding: isMobile ? "22px" : "28px", transform: "translateZ(20px)" }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <motion.span
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          fontSize: "22px", width: "44px", height: "44px",
                          borderRadius: "12px",
                          background: `${exp.color}18`, border: `1px solid ${exp.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {exp.icon}
                      </motion.span>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.3 }}>{exp.role}</p>
                        <p style={{ fontSize: "13px", margin: "4px 0 0", color: exp.color, fontWeight: 600 }}>{exp.company}</p>
                      </div>
                    </div>
                    <span style={{
                      fontSize: "11px", fontWeight: 600,
                      padding: "4px 10px", borderRadius: "20px",
                      background: `${exp.color}18`, border: `1px solid ${exp.color}30`,
                      color: exp.color, whiteSpace: "nowrap", flexShrink: 0,
                    }}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div style={{ display: "flex", gap: "16px", marginBottom: "14px", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-muted)" }}>
                      <MapPin size={11} /> {exp.location}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-muted)" }}>
                      <Clock size={11} /> {exp.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: "12.5px", lineHeight: 1.75, color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    {exp.highlights.map((h, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
                        <span style={{ color: exp.color, marginTop: "3px", flexShrink: 0, fontSize: "10px" }}>▸</span>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
