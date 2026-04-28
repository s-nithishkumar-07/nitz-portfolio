"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const photos = [
  { id: 1, src: '/gallery/1.jpg', alt: 'Photo 1' },
  { id: 2, src: '/gallery/2.jpg', alt: 'Photo 2' },
  { id: 3, src: '/gallery/3.JPG', alt: 'Photo 3' },
  { id: 4, src: '/gallery/4.jpg', alt: 'Photo 4' },
  { id: 5, src: '/gallery/5.png', alt: 'Photo 5' },
  { id: 6, src: '/gallery/6.jpg', alt: 'Photo 6' },
  { id: 7, src: '/gallery/7.png', alt: 'Photo 7' },
  { id: 8, src: '/gallery/8.png', alt: 'Photo 8' },
  { id: 9, src: '/gallery/9.jpg', alt: 'Photo 9' },
  { id: 10, src: '/gallery/10.jpg', alt: 'Photo 10' },
  { id: 56, src: '/gallery/56.jpg', alt: 'Photo 56' },
  { id: 57, src: '/gallery/57.jpg', alt: 'Photo 57' },
  { id: 58, src: '/gallery/58.jpg', alt: 'Photo 58' },
  { id: 59, src: '/gallery/59.jpg', alt: 'Photo 59' },
  { id: 60, src: '/gallery/60.jpg', alt: 'Photo 60' },
  { id: 61, src: '/gallery/61.JPG', alt: 'Photo 61' },
  { id: 62, src: '/gallery/62.JPG', alt: 'Photo 62' },
  { id: 63, src: '/gallery/63.JPG', alt: 'Photo 63' },
  { id: 64, src: '/gallery/64.png', alt: 'Photo 64' },
  { id: 65, src: '/gallery/65.jpg', alt: 'Photo 65' },
  { id: 66, src: '/gallery/66.jpg', alt: 'Photo 66' },
  { id: 67, src: '/gallery/67.jpg', alt: 'Photo 67' },
  { id: 68, src: '/gallery/68.jpg', alt: 'Photo 68' },
  { id: 69, src: '/gallery/69.jpg', alt: 'Photo 69' },
  { id: 70, src: '/gallery/70.jpg', alt: 'Photo 70' },
  { id: 71, src: '/gallery/71.jpg', alt: 'Photo 71' },
  { id: 72, src: '/gallery/72.jpg', alt: 'Photo 72' },
  { id: 73, src: '/gallery/73.jpg', alt: 'Photo 73' },
  { id: 74, src: '/gallery/74.jpg', alt: 'Photo 74' },
  { id: 75, src: '/gallery/75.jpg', alt: 'Photo 75' },
  { id: 77, src: '/gallery/77.jpg', alt: 'Photo 77' },
  { id: 78, src: '/gallery/78.jpg', alt: 'Photo 78' },
  { id: 79, src: '/gallery/79.jpg', alt: 'Photo 79' },
  { id: 80, src: '/gallery/80.jpg', alt: 'Photo 80' },
  { id: 81, src: '/gallery/81.jpg', alt: 'Photo 81' },
  { id: 82, src: '/gallery/82.jpg', alt: 'Photo 82' },
  { id: 83, src: '/gallery/83.jpg', alt: 'Photo 83' },
  { id: 84, src: '/gallery/84.jpg', alt: 'Photo 84' },
  { id: 86, src: '/gallery/86.jpg', alt: 'Photo 86' },
  { id: 87, src: '/gallery/87.jpg', alt: 'Photo 87' },
  { id: 88, src: '/gallery/88.jpg', alt: 'Photo 88' },
  { id: 89, src: '/gallery/89.jpg', alt: 'Photo 89' },
  { id: 90, src: '/gallery/90.jpg', alt: 'Photo 90' },
  { id: 91, src: '/gallery/91.jpg', alt: 'Photo 91' },
  { id: 92, src: '/gallery/92.JPG', alt: 'Photo 92' },
  { id: 93, src: '/gallery/93.JPG', alt: 'Photo 93' },
  { id: 94, src: '/gallery/94.JPG', alt: 'Photo 94' },
  { id: 95, src: '/gallery/95.JPG', alt: 'Photo 95' },
  { id: 96, src: '/gallery/96.jpg', alt: 'Photo 96' },
  { id: 97, src: '/gallery/97.jpg', alt: 'Photo 97' },
  { id: 98, src: '/gallery/98.jpg', alt: 'Photo 98' },
  { id: 100, src: '/gallery/100.jpg', alt: 'Photo 100' },
  { id: 101, src: '/gallery/101.jpg', alt: 'Photo 101' },
  { id: 102, src: '/gallery/102.JPG', alt: 'Photo 102' },
  { id: 11, src: '/gallery/11.jpg', alt: 'Photo 11' },
  { id: 12, src: '/gallery/12.jpg', alt: 'Photo 12' },
  { id: 13, src: '/gallery/13.jpg', alt: 'Photo 13' },
  { id: 14, src: '/gallery/14.jpg', alt: 'Photo 14' },
  { id: 15, src: '/gallery/15.jpg', alt: 'Photo 15' },
  { id: 16, src: '/gallery/16.jpg', alt: 'Photo 16' },
  { id: 18, src: '/gallery/18.jpg', alt: 'Photo 18' },
  { id: 19, src: '/gallery/19.jpg', alt: 'Photo 19' },
  { id: 20, src: '/gallery/20.JPG', alt: 'Photo 20' },
  { id: 22, src: '/gallery/22.jpg', alt: 'Photo 22' },
  { id: 23, src: '/gallery/23.jpg', alt: 'Photo 23' },
  { id: 24, src: '/gallery/24.jpg', alt: 'Photo 24' },
  { id: 25, src: '/gallery/25.jpg', alt: 'Photo 25' },
  { id: 26, src: '/gallery/26.JPG', alt: 'Photo 26' },
  { id: 27, src: '/gallery/27.JPG', alt: 'Photo 27' },
  { id: 28, src: '/gallery/28.jpg', alt: 'Photo 28' },
  { id: 29, src: '/gallery/29.jpg', alt: 'Photo 29' },
  { id: 30, src: '/gallery/30.jpg', alt: 'Photo 30' },
  { id: 31, src: '/gallery/31.jpg', alt: 'Photo 31' },
  { id: 32, src: '/gallery/32.jpg', alt: 'Photo 32' },
  { id: 33, src: '/gallery/33.webp', alt: 'Photo 33' },
  { id: 34, src: '/gallery/34.jpg', alt: 'Photo 34' },
  { id: 35, src: '/gallery/35.jpg', alt: 'Photo 35' },
  { id: 36, src: '/gallery/36.webp', alt: 'Photo 36' },
  { id: 37, src: '/gallery/37.jpg', alt: 'Photo 37' },
  { id: 38, src: '/gallery/38.png', alt: 'Photo 38' },
  { id: 39, src: '/gallery/39.jpg', alt: 'Photo 39' },
  { id: 40, src: '/gallery/40.jpg', alt: 'Photo 40' },
  { id: 41, src: '/gallery/41.jpg', alt: 'Photo 41' },
  { id: 42, src: '/gallery/42.webp', alt: 'Photo 42' },
  { id: 43, src: '/gallery/43.webp', alt: 'Photo 43' },
  { id: 44, src: '/gallery/44.jpg', alt: 'Photo 44' },
  { id: 45, src: '/gallery/45.jpg', alt: 'Photo 45' },
  { id: 46, src: '/gallery/46.webp', alt: 'Photo 46' },
  { id: 47, src: '/gallery/47.jpg', alt: 'Photo 47' },
  { id: 48, src: '/gallery/48.webp', alt: 'Photo 48' },
  { id: 49, src: '/gallery/49.jpg', alt: 'Photo 49' },
  { id: 50, src: '/gallery/50.webp', alt: 'Photo 50' },
  { id: 52, src: '/gallery/52.png', alt: 'Photo 52' },
  { id: 53, src: '/gallery/53.jpg', alt: 'Photo 53' },
  { id: 54, src: '/gallery/54.jpg', alt: 'Photo 54' },
  { id: 55, src: '/gallery/55.jpg', alt: 'Photo 55' }
];

// Duplicate for seamless infinite scroll
const marqueePhotos = [...photos, ...photos];

export default function PhotoStrip() {
  const { isMobile } = useBreakpoint();
  const [paused,       setPaused]       = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx,    setActiveIdx]    = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // ── Lightbox keyboard nav ──
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, activeIdx]);

  const openLightbox = (idx: number) => {
    setActiveIdx(idx % photos.length);
    setLightboxOpen(true);
  };

  const next = () => setActiveIdx((p) => (p + 1) % photos.length);
  const prev = () => setActiveIdx((p) => (p - 1 + photos.length) % photos.length);

  const photoW = isMobile ? 160 : 240;
  const photoH = isMobile ? 240 : 360;

  return (
    <>
      <section
        id="gallery"
        style={{
          background: "var(--bg-secondary)",
          padding: isMobile ? "60px 0" : "100px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)" }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "60px", padding: "0 20px" }}
        >
          <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <Images size={12} /> Visual Works
          </span>
          <h2 style={{ fontSize: isMobile ? "2rem" : "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#fff", margin: 0 }}>
            Watch My{" "}
            <span className="gradient-text-cyan">Stuff</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", maxWidth: "380px", margin: "12px auto 0" }}>
            Photography · Cinematography · Creative Captures
          </p>
          <p style={{ marginTop: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
            Hover to pause · Click any photo to view all
          </p>
        </motion.div>

        {/* ── Infinite Marquee Strip ── */}
        <div
          style={{ overflow: "hidden", width: "100%", position: "relative" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left/right fade masks */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to right, var(--bg-secondary), transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to left, var(--bg-secondary), transparent)", zIndex: 2, pointerEvents: "none" }} />

          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "16px",
              width: "max-content",
              animation: `marquee-scroll ${photos.length * 2.5}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
              padding: "12px 0 24px",
            }}
          >
            {marqueePhotos.map((photo, idx) => (
              <motion.div
                key={`${photo.id}-${idx}`}
                onClick={() => openLightbox(idx)}
                whileHover={{ scale: 1.05, y: -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "relative",
                  width: `${photoW}px`,
                  height: `${photoH}px`,
                  borderRadius: "14px",
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={`${photoW}px`}
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    // Show placeholder gradient if image missing
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: "absolute", inset: 0,
                    background: "rgba(0,217,255,0.12)",
                    backdropFilter: "blur(2px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <ZoomIn size={28} color="#fff" />
                </motion.div>

                {/* Placeholder when no image */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(135deg, hsl(${(photo.id * 37) % 360}, 30%, 12%), hsl(${(photo.id * 37 + 60) % 360}, 25%, 8%))`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "32px", zIndex: -1,
                }}>
                  📷
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }} />

        {/* Marquee keyframe */}
        <style>{`
          @keyframes marquee-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 99999,
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(20px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false); }}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: "absolute", top: "20px", right: "24px",
                width: "44px", height: "44px", borderRadius: "50%",
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <p style={{ position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
              {activeIdx + 1} / {photos.length}
            </p>

            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "relative",
                  width: isMobile ? "90vw" : "70vw",
                  height: isMobile ? "55vw" : "60vh",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Image
                  src={photos[activeIdx].src}
                  alt={photos[activeIdx].alt}
                  fill
                  sizes="70vw"
                  style={{ objectFit: "contain" }}
                  priority
                />
                {/* Placeholder */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: -1,
                  background: `linear-gradient(135deg, hsl(${(photos[activeIdx].id * 37) % 360}, 30%, 12%), hsl(${(photos[activeIdx].id * 37 + 60) % 360}, 25%, 8%))`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "64px",
                }}>
                  📷
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next arrows */}
            <button
              onClick={prev}
              style={{
                position: "absolute", left: isMobile ? "8px" : "24px", top: "50%", transform: "translateY(-50%)",
                width: "48px", height: "48px", borderRadius: "50%",
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              style={{
                position: "absolute", right: isMobile ? "8px" : "24px", top: "50%", transform: "translateY(-50%)",
                width: "48px", height: "48px", borderRadius: "50%",
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Thumbnail strip */}
            <div style={{
              display: "flex", gap: "8px", overflowX: "auto", maxWidth: "90vw",
              padding: "16px 8px 0", scrollbarWidth: "none",
            }}>
              {photos.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  onClick={() => setActiveIdx(idx)}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    position: "relative",
                    width: "64px", height: "48px",
                    borderRadius: "8px", overflow: "hidden",
                    flexShrink: 0, cursor: "pointer",
                    border: `2px solid ${activeIdx === idx ? "var(--accent-cyan)" : "rgba(255,255,255,0.1)"}`,
                    opacity: activeIdx === idx ? 1 : 0.5,
                    transition: "all 0.2s",
                  }}
                >
                  <Image src={photo.src} alt={photo.alt} fill sizes="64px" style={{ objectFit: "cover" }} />
                  {/* Placeholder */}
                  <div style={{
                    position: "absolute", inset: 0, zIndex: -1,
                    background: `hsl(${(photo.id * 37) % 360}, 25%, 15%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px",
                  }}>📷</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
