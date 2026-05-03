"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useEffect, useRef, useState, useMemo } from "react";

/* ── Animated Star Field ── */
function StarField() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number; dur: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 6,
      dur: Math.random() * 4 + 3,
    }));
    setStars(generated);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#00D9FF" : i % 3 === 1 ? "#8B5CF6" : "#ffffff",
            boxShadow: `0 0 ${s.size * 3}px currentColor`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Count-Up Number ── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <p ref={ref} className="text-2xl font-black gradient-text-cyan">{count}{suffix}</p>;
}

export default function Hero() {
  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact  = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const { scrollY } = useScroll();
  const videoScale   = useTransform(scrollY, [0, 800], [1, 1.15]);
  const videoOpacity = useTransform(scrollY, [0, 800], [0.4, 0]);
  const videoY       = useTransform(scrollY, [0, 800], [0, 150]);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Star field */}
      <StarField />

      {/* Scroll-animated video */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ scale: videoScale, opacity: videoOpacity, y: videoY }}>
        <video autoPlay loop muted playsInline className="w-full h-full object-cover"
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      {/* Gradient mesh */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-10"
          style={{ background: "radial-gradient(circle, #00D9FF, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[160px] opacity-5"
          style={{ background: "radial-gradient(circle, #FFD700, transparent)" }} />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,217,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: "relative", zIndex: 10, textAlign: "center", width: "100%", maxWidth: "100vw", padding: "0 24px", boxSizing: "border-box" }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ background: "rgba(0,217,255,0.08)", border: "1px solid rgba(0,217,255,0.2)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent-cyan)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--accent-cyan)" }}>Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={itemVariants} className="hero-name"
          style={{
            fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1,
            marginBottom: "16px", fontSize: "clamp(2.8rem, 8.5vw, 8rem)",
            background: "linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.6) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            whiteSpace: "nowrap", display: "block", width: "100%",
          }}>
          {personalInfo.name.toUpperCase()}
        </motion.h1>

        {/* Animated roles */}
        <motion.div variants={itemVariants}
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>I am a </span>
          <TypeAnimation sequence={personalInfo.roles.flatMap((role) => [role, 2000])}
            wrapper="span" speed={50} repeat={Infinity} style={{ color: "var(--accent-cyan)" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p variants={itemVariants} className="text-lg md:text-xl italic mb-10" style={{ color: "rgba(255,255,255,0.35)" }}>
          &ldquo;{personalInfo.tagline}&rdquo;
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
          <button onClick={scrollToProjects} className="btn-primary flex items-center gap-2" id="hero-view-projects">
            <ExternalLink size={16} /> View Projects
          </button>
          <button onClick={scrollToContact} className="btn-outline flex items-center gap-2" id="hero-hire-me">
            Hire Me
          </button>
          <a href="/resume.pdf" download className="btn-outline flex items-center gap-2" id="hero-download-resume">
            <Download size={16} /> Resume
          </a>
        </motion.div>

        {/* Stats — count-up */}
        <motion.div variants={itemVariants} className="flex gap-10 justify-center mt-16">
          {[
            { target: 10, suffix: "+", label: "Projects" },
            { target: 5, suffix: "+", label: "Years Creative" },
            { target: 3, suffix: "+", label: "Awards" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp target={stat.target} suffix={stat.suffix} />
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} style={{ color: "var(--accent-cyan)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
