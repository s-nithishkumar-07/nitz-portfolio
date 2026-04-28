"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, Code2, Star, ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend:  "#00D9FF",
  Backend:   "#8B5CF6",
  Fullstack: "#FFD700",
};

/* ── 3D Tilt wrapper for the detail panel ── */
function TiltPanel({ children, color }: { children: React.ReactNode; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 });
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
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}25`,
        borderRadius: "24px",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        position: "relative",
        willChange: "transform",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* Dynamic mouse-follow spotlight */}
      <motion.div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: useTransform(
          [glowX, glowY],
          ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, ${color}10 0%, transparent 55%)`
        ),
        zIndex: 1,
      }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
}


export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const activeProject = projects.find((p) => p.id === activeId)!;
  const listRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  return (
    <section id="projects" style={{ background: "var(--bg-primary)", padding: isMobile ? "60px 0" : "100px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", filter: "blur(200px)", opacity: 0.04, background: "var(--accent-purple)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "400px", height: "400px", borderRadius: "50%", filter: "blur(200px)", opacity: 0.04, background: "var(--accent-cyan)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <Code2 size={12} /> Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-black">
            Featured <span className="gradient-text-cyan">Projects</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", maxWidth: "400px", margin: "12px auto 0" }}>
            What I&apos;ve built — from ideas to deployed applications
          </p>
        </motion.div>

        {/* Split layout — side by side on desktop, stacked on mobile/tablet */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isSmall ? "1fr" : "300px 1fr",
          gap: isSmall ? "20px" : "32px",
          alignItems: "start",
        }}>
          {/* LEFT — Scrollable project list */}
          <div ref={listRef} style={{
            display: "flex", flexDirection: "column", gap: "12px",
            maxHeight: isSmall ? "320px" : "600px",
            overflowY: "auto", paddingRight: "8px",
            scrollbarWidth: "thin", scrollbarColor: "rgba(0,217,255,0.3) transparent",
          }}>
            {projects.map((project, i) => {
              const color = CATEGORY_COLORS[project.category] ?? "#fff";
              const isActive = project.id === activeId;
              return (
                <motion.button
                  key={project.id}
                  onClick={() => setActiveId(project.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex", flexDirection: "column", gap: "6px",
                    padding: "18px 20px", borderRadius: "14px",
                    border: `1px solid ${isActive ? color + "40" : "rgba(255,255,255,0.06)"}`,
                    background: isActive ? `${color}10` : "rgba(255,255,255,0.02)",
                    cursor: "pointer", textAlign: "left", transition: "all 0.3s ease",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {isActive && (
                    <motion.div layoutId="activeBar" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: color, borderRadius: "0 2px 2px 0" }} />
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {project.featured && <Star size={10} style={{ color: "var(--accent-gold)" }} />}
                    <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "999px", background: `${color}18`, color, border: `1px solid ${color}30`, fontWeight: 600 }}>
                      {project.category}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: isActive ? "#fff" : "rgba(255,255,255,0.7)", margin: 0 }}>
                    {project.title}
                  </p>
                  {!isMobile && (
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", lineHeight: 1.5 }}>
                      {project.description}
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT — Active project detail with 3D tilt */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                position: isSmall ? "relative" : "sticky",
                top: isSmall ? "auto" : "100px",
              }}
            >
              <TiltPanel color={CATEGORY_COLORS[activeProject.category] ?? "#00D9FF"}>
                <div style={{ height: "6px", background: `linear-gradient(90deg, ${CATEGORY_COLORS[activeProject.category] ?? "var(--accent-cyan)"}, transparent)` }} />

                {/* Mock browser bar */}
                {!isMobile && (
                  <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.02)" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
                        <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                      ))}
                    </div>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: "6px", padding: "4px 12px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "monospace" }}>
                      localhost:3000/{activeProject.title.toLowerCase().replace(/\s+/g, "-")}
                    </div>
                  </div>
                )}

                <div style={{ padding: isMobile ? "24px" : "40px" }}>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                    {activeProject.featured && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", padding: "4px 12px", borderRadius: "999px", fontWeight: 600, background: "rgba(255,215,0,0.1)", color: "var(--accent-gold)", border: "1px solid rgba(255,215,0,0.2)" }}>
                        <Star size={11} /> Featured Project
                      </span>
                    )}
                    <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "999px", fontWeight: 600, background: `${CATEGORY_COLORS[activeProject.category]}18`, color: CATEGORY_COLORS[activeProject.category], border: `1px solid ${CATEGORY_COLORS[activeProject.category]}30` }}>
                      {activeProject.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: isMobile ? "20px" : "28px", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.3 }}>
                    {activeProject.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "28px" }}>
                    {activeProject.description}
                  </p>

                  <div style={{ marginBottom: "28px" }}>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 600 }}>Tech Stack</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {activeProject.tech.map((tech) => (
                        <span key={tech} style={{ fontSize: "12px", padding: "6px 14px", borderRadius: "8px", fontWeight: 500, background: "rgba(0,217,255,0.06)", color: "rgba(0,217,255,0.8)", border: "1px solid rgba(0,217,255,0.12)" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <a href={activeProject.github} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
                      id={`project-github-${activeProject.id}`}>
                      <FaGithub size={16} /> View Code
                    </a>
                    <a href={activeProject.live} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "10px", background: "linear-gradient(135deg, var(--accent-cyan), #0099CC)", color: "#000", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}
                      id={`project-live-${activeProject.id}`}>
                      <ExternalLink size={16} /> Live Demo <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </TiltPanel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
