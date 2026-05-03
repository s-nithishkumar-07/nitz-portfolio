"use client";
import { motion } from "framer-motion";
import { Download, Trophy, GraduationCap, Sparkles } from "lucide-react";
import { education, achievements, skills } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Resume() {
  const { isMobile } = useBreakpoint();

  return (
    <section id="resume" style={{ background: "var(--bg-primary)", padding: isMobile ? "60px 0" : "100px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "300px", height: "300px", borderRadius: "50%", filter: "blur(150px)", opacity: 0.05, background: "var(--accent-gold)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <Sparkles size={12} /> Resume
          </span>
          <h2 className="text-3xl md:text-4xl font-black">
            My <span className="gradient-text-gold">Resume</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", maxWidth: "400px", margin: "12px auto 0" }}>
            A snapshot of my journey, education, and achievements
          </p>
          <motion.a href="/resume.pdf" download className="btn-primary"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "24px" }}
            id="resume-download">
            <Download size={16} /> Download Full Resume (PDF)
          </motion.a>
        </motion.div>

        {/* Education + Achievements — 2 col on desktop, 1 col on mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "20px" : "32px",
          marginBottom: "32px",
        }}>
          {/* Education */}
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "24px" : "36px", backdropFilter: "blur(20px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <GraduationCap size={20} style={{ color: "var(--accent-cyan)" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>Education</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {education.map((edu, i) => (
                <div key={i} style={{ display: "flex", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent-cyan)", boxShadow: "0 0 10px rgba(0,217,255,0.5)", flexShrink: 0, marginTop: "4px" }} />
                    {i < education.length - 1 && (
                      <div style={{ width: "1px", flex: 1, background: "rgba(0,217,255,0.15)", margin: "6px 0" }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: "8px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.4 }}>{edu.degree}</p>
                    <p style={{ fontSize: "13px", color: "var(--accent-cyan)", margin: "6px 0 4px" }}>{edu.institution}</p>
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{edu.year}</span>
                      {edu.grade && (
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-gold)" }}>{edu.grade}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "24px" : "36px", backdropFilter: "blur(20px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <Trophy size={20} style={{ color: "var(--accent-gold)" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>Achievements</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {achievements.map((ach, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  style={{ padding: "14px 18px", borderRadius: "12px", fontSize: "13px", lineHeight: 1.6, background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.1)", color: "rgba(255,255,255,0.8)" }}>
                  {ach}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>


        {/* Core Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "24px" : "36px", backdropFilter: "blur(20px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <Sparkles size={18} style={{ color: "var(--accent-purple)" }} />
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>Core Skills</h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.filter((cat) => cat.category !== "Languages").flatMap((cat) => cat.items.map((s) => s.name)).map((name) => (
              <span key={name} style={{ fontSize: "12px", padding: "6px 14px", borderRadius: "8px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "rgba(255,255,255,0.7)" }}>
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
