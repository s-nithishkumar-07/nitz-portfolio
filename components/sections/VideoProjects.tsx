"use client";
import { motion } from "framer-motion";
import { Film, Play } from "lucide-react";
import { videoProjects } from "@/lib/data";

export default function VideoProjects() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
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
            Cinematography
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-center">
            Featured <span className="gradient-text-multi">Video Projects</span>
          </h2>
          <p className="mt-3 text-sm text-center max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
            Behind the camera — my cinematography reels and edits
          </p>
        </motion.div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoProjects.map((vid, i) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Video embed */}
                <div className="relative aspect-video" style={{ background: "#000" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.youtubeId}?rel=0&modestbranding=1`}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: "none" }}
                  />
                </div>

                {/* Info */}
                <div
                  className="p-4"
                  style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Play size={12} style={{ color: "var(--accent-cyan)" }} />
                    <p className="text-sm font-bold text-white">{vid.title}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {vid.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
