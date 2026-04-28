"use client";
import { motion } from "framer-motion";
import { Play, Film } from "lucide-react";

export default function Showreel() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="section-label flex items-center justify-center gap-2 mb-4">
            <Film size={12} />
            Cinematic Work
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-center">
            My Cinematic{" "}
            <span className="gradient-text-cyan">Showreel</span>
          </h2>
          <p className="mt-3 text-sm text-center max-w-sm mx-auto" style={{ color: "var(--text-secondary)" }}>
            Stories told through light, motion, and emotion
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden group"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(0,217,255,0.1)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,217,255,0.05)",
          }}
        >
          {/* Aspect ratio wrapper */}
          <div className="relative aspect-video">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
              title="My Cinematic Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            />
          </div>

          {/* Glow border animation */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,217,255,0.05) 0%, transparent 50%, rgba(139,92,246,0.05) 100%)",
            }}
          />
        </motion.div>

        {/* Play info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-6"
        >
          <Play size={12} style={{ color: "var(--accent-cyan)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Replace with your actual YouTube / Vimeo embed link
          </span>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent-purple), transparent)" }}
      />
    </section>
  );
}
