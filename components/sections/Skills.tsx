"use client";
import { motion } from "framer-motion";
import { Zap, Globe } from "lucide-react";
import { skills } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const LANGUAGES = [
  { name: "Tamil",     flag: "🇮🇳", level: 100, label: "Native",         color: "#00D9FF" },
  { name: "English",   flag: "🇬🇧", level: 100, label: "Native",         color: "#00D9FF" },
  { name: "Kannada",   flag: "🇮🇳", level: 40,  label: "Beginner",       color: "#8B5CF6" },
  { name: "Telugu",    flag: "🇮🇳", level: 40,  label: "Beginner",       color: "#FF6B6B" },
  { name: "Hindi",     flag: "🇮🇳", level: 30,  label: "Beginner",       color: "#FFD700" },
];

const TECH_SKILLS = skills.filter((s) => s.category !== "Languages");

export default function Skills() {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  return (
    <>
      {/* ─── TECH SKILLS ─── */}
      <section
        id="skills"
        style={{ background: "var(--bg-secondary)", padding: isMobile ? "60px 0" : "100px 0", position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.4), transparent)" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
              <Zap size={12} /> Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-black">
              Skills &amp; <span className="gradient-text-multi">Technologies</span>
            </h2>
            <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", maxWidth: "400px", margin: "12px auto 0" }}>
              A blend of technical proficiency and creative excellence
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
            gap: isMobile ? "16px" : "28px",
          }}>
            {TECH_SKILLS.map((category, catIdx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${category.color}20`,
                  borderRadius: "20px",
                  padding: isMobile ? "24px" : "32px",
                  backdropFilter: "blur(20px)",
                  display: "flex", flexDirection: "column",
                }}
              >
                {/* Card Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px", flexShrink: 0,
                    background: `${category.color}15`, border: `1px solid ${category.color}25`,
                  }}>
                    {category.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "15px", color: "#fff", margin: 0 }}>{category.category}</p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "3px 0 0" }}>{category.items.length} skills</p>
                  </div>
                </div>

                {/* Skill Rows with animated bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
                  {category.items.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + skillIdx * 0.07 }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{skill.name}</span>
                        <span style={{ fontSize: "12px", fontFamily: "monospace", color: category.color, fontWeight: 700 }}>{skill.level}%</span>
                      </div>
                      <div style={{ height: "6px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: catIdx * 0.1 + skillIdx * 0.1, ease: [0.33, 1, 0.68, 1] }}
                          style={{
                            height: "100%", borderRadius: "999px",
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}70)`,
                            boxShadow: `0 0 8px ${category.color}60`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />
      </section>

      {/* ─── LANGUAGES I SPEAK ─── */}
      <section
        id="languages"
        style={{ background: "var(--bg-primary)", padding: isMobile ? "60px 0" : "100px 0", position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, width: "384px", height: "384px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,217,255,0.04), transparent)", transform: "translate(50%, -50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.04), transparent)", transform: "translate(-50%, 50%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
              <Globe size={12} /> Linguistics
            </span>
            <h2 className="text-3xl md:text-4xl font-black">
              Languages I <span className="gradient-text-cyan">Speak</span>
            </h2>
            <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", maxWidth: "360px", margin: "12px auto 0" }}>
              Bridging cultures through communication
            </p>
          </motion.div>

          {/* Language Cards — responsive grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr",
            gap: isMobile ? "12px" : "14px",
          }}>
            {LANGUAGES.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: isMobile ? 0 : 6, scale: isMobile ? 1.01 : 1, transition: { duration: 0.2 } }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "14px" : "20px",
                  padding: isMobile ? "16px 18px" : "20px 28px",
                  borderRadius: "16px",
                  background: `${lang.color}08`,
                  border: `1px solid ${lang.color}20`,
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle glow on left */}
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
                  background: lang.color, opacity: 0.7, borderRadius: "0 2px 2px 0",
                }} />

                {/* Flag */}
                <span style={{ fontSize: isMobile ? "26px" : "32px", flexShrink: 0 }}>{lang.flag}</span>

                {/* Name + label */}
                <div style={{ minWidth: isMobile ? "80px" : "110px", flexShrink: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: isMobile ? "14px" : "15px", color: "#fff", margin: 0 }}>{lang.name}</p>
                  <span style={{
                    display: "inline-block", fontSize: "10px", fontWeight: 600,
                    padding: "2px 8px", borderRadius: "20px", marginTop: "4px",
                    background: `${lang.color}18`, border: `1px solid ${lang.color}30`,
                    color: lang.color,
                  }}>
                    {lang.label}
                  </span>
                </div>

                {/* Progress bar — always visible, full width */}
                <div style={{ flex: 1 }}>
                  <div style={{ height: isMobile ? "6px" : "8px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: i * 0.12, ease: [0.33, 1, 0.68, 1] }}
                      style={{
                        height: "100%", borderRadius: "999px",
                        background: `linear-gradient(90deg, ${lang.color}90, ${lang.color})`,
                        boxShadow: `0 0 12px ${lang.color}50`,
                      }}
                    />
                  </div>
                </div>

                {/* Percent badge */}
                <span style={{
                  fontSize: isMobile ? "11px" : "13px", fontWeight: 700, fontFamily: "monospace",
                  padding: "4px 10px", borderRadius: "999px",
                  background: `${lang.color}15`, border: `1px solid ${lang.color}30`,
                  color: lang.color, flexShrink: 0,
                  minWidth: isMobile ? "38px" : "46px", textAlign: "center",
                }}>
                  {lang.level}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
