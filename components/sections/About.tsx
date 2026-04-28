"use client";
import { motion } from "framer-motion";
import { Code2, Camera, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function About() {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  return (
    <section
      id="about"
      style={{
        background: "var(--bg-primary)",
        padding: isMobile ? "60px 0" : "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", right: 0, top: "50%",
        transform: "translateY(-50%)",
        width: "350px", height: "350px", borderRadius: "50%",
        filter: "blur(120px)", opacity: 0.05,
        background: "var(--accent-cyan)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isSmall ? "1fr" : "1fr 1.4fr",
          gap: isMobile ? "40px" : isTablet ? "48px" : "80px",
          alignItems: "center",
        }}>
          {/* LEFT — Photo card */}
          <motion.div
            initial={{ opacity: 0, x: isSmall ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: "relative" }}
          >
            <div style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              aspectRatio: "4/5",
              maxWidth: isMobile ? "260px" : "360px",
              margin: "0 auto",
              background: "linear-gradient(135deg, rgba(0,217,255,0.08), rgba(139,92,246,0.08))",
              border: "1px solid rgba(0,217,255,0.15)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 40px rgba(0,217,255,0.06)",
            }}>
              <Image src="/gallery/48.webp" alt="Nithishkumar" fill sizes="360px"
                style={{ objectFit: "cover", objectPosition: "center top" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                background: "linear-gradient(to top, rgba(8,8,16,0.9), transparent)",
              }} />
              <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
                <p style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: 0 }}>Nithishkumar</p>
                <p style={{ fontSize: "11px", color: "var(--accent-cyan)", margin: "4px 0 0" }}>
                  Developer · Photographer · Filmmaker
                </p>
              </div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", top: "20px", right: "20px",
                  padding: "8px 14px", borderRadius: "12px", fontSize: "12px", fontWeight: 600,
                  background: "rgba(0,217,255,0.15)", border: "1px solid rgba(0,217,255,0.3)",
                  color: "var(--accent-cyan)", backdropFilter: "blur(10px)",
                }}>
                ⚡ MERN Stack
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{
                  position: "absolute", top: "68px", right: "20px",
                  padding: "8px 14px", borderRadius: "12px", fontSize: "12px", fontWeight: 600,
                  background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
                  color: "var(--accent-purple)", backdropFilter: "blur(10px)",
                }}>
                📸 Visual Artist
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
              style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginTop: "20px", color: "var(--text-secondary)" }}>
              <MapPin size={14} style={{ color: "var(--accent-cyan)" }} />
              <span style={{ fontSize: "14px" }}>{personalInfo.location}</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div initial={{ opacity: 0, x: isSmall ? 0 : 50 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}>
            <span className="section-label" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <Sparkles size={12} /> About Me
            </span>
            <h2 style={{ fontSize: isMobile ? "1.8rem" : "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "24px" }}>
              Developer by <span className="gradient-text-cyan">Code</span>,<br />
              Storyteller by <span className="gradient-text-gold">Lens</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "32px" }}>
              {personalInfo.about.split("\n\n").filter(Boolean).map((p, i) => (
                <p key={i} style={{ margin: 0 }}>{p.trim()}</p>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} style={{ padding: "20px", borderRadius: "16px", background: "rgba(0,217,255,0.05)", border: "1px solid rgba(0,217,255,0.12)" }}>
                <Code2 size={20} style={{ color: "var(--accent-cyan)", marginBottom: "8px" }} />
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: 0 }}>Developer</p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>MERN Stack · Full-Stack · APIs</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} style={{ padding: "20px", borderRadius: "16px", background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.12)" }}>
                <Camera size={20} style={{ color: "var(--accent-purple)", marginBottom: "8px" }} />
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: 0 }}>Visual Artist</p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>Photography · Cinematography</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
