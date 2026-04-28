"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, X, Play } from "lucide-react";
import { creativeWorks } from "@/lib/data";

const FILTERS = ["All", "Photos", "Videos"];

const PHOTO_COLORS = [
  "from-cyan-900/40 to-blue-900/40",
  "from-purple-900/40 to-pink-900/40",
  "from-amber-900/40 to-orange-900/40",
  "from-emerald-900/40 to-teal-900/40",
  "from-rose-900/40 to-pink-900/40",
  "from-indigo-900/40 to-violet-900/40",
  "from-yellow-900/40 to-amber-900/40",
  "from-sky-900/40 to-cyan-900/40",
];

const EMOJIS = ["🌅", "🏙️", "🎭", "🌿", "🎪", "🌆", "🎉", "🌃"];

export default function CreativeWorks() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<null | typeof creativeWorks[0]>(null);

  const filtered = filter === "All"
    ? creativeWorks
    : creativeWorks.filter((w) => w.category === filter);

  return (
    <section
      id="creative"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)" }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <Camera size={12} /> Creative Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-black">
            Creative <span className="gradient-text-gold">Works</span>
          </h2>
          {/* Subsection labels */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "13px", color: "var(--accent-cyan)", fontWeight: 600 }}>📸 Photography</span>
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>&amp;</span>
            <span style={{ fontSize: "13px", color: "var(--accent-purple)", fontWeight: 600 }}>🎬 Cinematography</span>
          </div>
          <p style={{ marginTop: "10px", fontSize: "13px", color: "var(--text-secondary)", maxWidth: "400px", margin: "10px auto 0" }}>
            Moments captured, stories told through light and motion
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-3 justify-center mb-12 flex-wrap"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300"
              style={{
                background: filter === f ? "var(--accent-gold)" : "rgba(255,255,255,0.05)",
                color: filter === f ? "#000" : "rgba(255,255,255,0.6)",
                border: `1px solid ${filter === f ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
              }}
              id={`creative-filter-${f.toLowerCase()}`}
            >
              {f === "Photos" ? "📸 " : f === "Videos" ? "🎬 " : ""}{f}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-x-0"
          >
            {filtered.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="break-inside-avoid mb-4 group cursor-pointer"
                onClick={() => setLightbox(work)}
              >
                <div
                  className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${PHOTO_COLORS[i % PHOTO_COLORS.length]}`}
                  style={{
                    height: i % 3 === 0 ? "260px" : i % 3 === 1 ? "200px" : "230px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Content placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span className="text-4xl">{EMOJIS[i % EMOJIS.length]}</span>
                    <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {work.title}
                    </span>
                    {work.type === "video" && (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                      >
                        <Play size={14} color="white" />
                      </div>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {work.type === "video"
                        ? <Film size={24} color="white" />
                        : <Camera size={24} color="white" />
                      }
                      <span className="text-xs text-white font-semibold">
                        {work.type === "video" ? "Watch" : "View"}
                      </span>
                    </div>
                  </div>

                  {/* Type badge */}
                  <div
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: work.type === "video" ? "rgba(139,92,246,0.7)" : "rgba(0,217,255,0.7)",
                      color: "white",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {work.type === "video" ? "Video" : "Photo"}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative rounded-2xl overflow-hidden max-w-2xl w-full"
              style={{ background: "#0d0d14", border: "1px solid rgba(255,255,255,0.08)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video flex items-center justify-center relative"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {lightbox.type === "video" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${lightbox.youtubeId}?autoplay=1`}
                    title={lightbox.title}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: "none" }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-6xl">📸</span>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Add your photo here
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{lightbox.title}</h3>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{lightbox.category}</p>
              </div>

              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.1)" }}
                aria-label="Close lightbox"
              >
                <X size={14} color="white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,107,0.3), transparent)" }}
      />
    </section>
  );
}
