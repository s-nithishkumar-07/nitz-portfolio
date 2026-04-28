"use client";
import { motion } from "framer-motion";
import { Sparkles, Languages as LanguagesIcon } from "lucide-react";
import { skills } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const languageData = skills.find((s) => s.category === "Languages")?.items ?? [];

const flagMap: Record<string, string> = {
  Tamil: "🇮🇳",
  English: "🇬🇧",
  Malayalam: "🇮🇳",
  Hindi: "🇮🇳",
  German: "🇩🇪",
};

const levelLabel = (level: number) => {
  if (level === 100) return "Native";
  if (level >= 80) return "Fluent";
  if (level >= 60) return "Conversational";
  if (level >= 40) return "Beginner";
  return "Learning";
};

const levelColor = (level: number) => {
  if (level === 100) return "#00D9FF";
  if (level >= 80) return "#8B5CF6";
  if (level >= 60) return "#FF9F43";
  if (level >= 40) return "#2DD4BF";
  return "#FF6B6B";
};

export default function Languages() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="languages"
      style={{
        background: "var(--bg-primary)",
        padding: isMobile ? "60px 0" : "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          filter: "blur(160px)",
          opacity: 0.04,
          background: "var(--accent-cyan)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <span
            className="section-label"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}
          >
            <Sparkles size={12} /> Languages
          </span>
          <h2 className="text-3xl md:text-4xl font-black">
            Languages I <span className="gradient-text-gold">Speak</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", maxWidth: "420px", margin: "12px auto 0" }}>
            Communicating across cultures — the languages I speak and my proficiency levels
          </p>
        </motion.div>

        {/* Language Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)",
            gap: isMobile ? "14px" : "20px",
          }}
        >
          {languageData.map((lang, i) => {
            const color = levelColor(lang.level);
            const label = levelLabel(lang.level);
            const flag = flagMap[lang.name] ?? "🌐";

            return (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.03 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${color}22`,
                  borderRadius: "20px",
                  padding: "24px 18px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(20px)",
                  cursor: "default",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {/* Top glow line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    opacity: 0.8,
                  }}
                />

                {/* Flag */}
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>{flag}</div>

                {/* Language name */}
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{lang.name}</p>

                {/* Level label */}
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "20px",
                    background: `${color}18`,
                    border: `1px solid ${color}35`,
                    color: color,
                    marginBottom: "14px",
                  }}
                >
                  {label}
                </span>

                {/* Progress bar */}
                <div
                  style={{
                    height: "4px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.07)",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                    style={{
                      height: "100%",
                      borderRadius: "4px",
                      background: `linear-gradient(90deg, ${color}88, ${color})`,
                      boxShadow: `0 0 8px ${color}55`,
                    }}
                  />
                </div>

                {/* Percentage */}
                <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "6px 0 0" }}>{lang.level}%</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
