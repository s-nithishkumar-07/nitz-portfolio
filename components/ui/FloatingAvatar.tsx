"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SPEECH_BUBBLES = [
  "Hey! I'm Nithish 👋",
  "Let's build something cool! 🚀",
  "I love clean code ✨",
  "And beautiful shots 📸",
  "Hire me? 😄",
];

/* Orbiting particle config — kept minimal for performance */
const ORBIT_PARTICLES = [
  { radius: 76, size: 5, color: "#00D9FF", startAngle: 0,   duration: 5 },
  { radius: 76, size: 4, color: "#8B5CF6", startAngle: 180, duration: 5 },
];

function OrbitParticle({ radius, size, color, startAngle, duration }: typeof ORBIT_PARTICLES[0]) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        top: "50%",
        left: "50%",
        marginTop: `-${size / 2}px`,
        marginLeft: `-${size / 2}px`,
        willChange: "transform",
      }}
      animate={{
        x: [
          Math.cos((startAngle * Math.PI) / 180) * radius,
          Math.cos(((startAngle + 180) * Math.PI) / 180) * radius,
          Math.cos((startAngle * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin((startAngle * Math.PI) / 180) * radius,
          Math.sin(((startAngle + 180) * Math.PI) / 180) * radius,
          Math.sin((startAngle * Math.PI) / 180) * radius,
        ],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function FloatingAvatar() {
  const [visible, setVisible] = useState(false);
  const [bubble, setBubble] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShowBubble(true), 800);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    if (!showBubble) return;
    const interval = setInterval(() => {
      setBubble((prev) => (prev + 1) % SPEECH_BUBBLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showBubble]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
          className="r-avatar-wrap"
          style={{
            position: "fixed", bottom: 0, right: "60px", zIndex: 9990,
            display: "flex", flexDirection: "column", alignItems: "center",
            pointerEvents: "none",
          }}
        >
          {/* Speech Bubble */}
          <AnimatePresence mode="wait">
            {showBubble && (
              <motion.div
                key={bubble}
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.85 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "rgba(20, 20, 28, 0.9)",
                  border: "1px solid rgba(0,217,255,0.3)",
                  borderRadius: "16px", padding: "10px 16px",
                  fontSize: "13px", fontWeight: 600, color: "#fff",
                  marginBottom: "12px", whiteSpace: "nowrap",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,217,255,0.1)",
                  position: "relative",
                }}
              >
                {SPEECH_BUBBLES[bubble]}
                <div style={{
                  position: "absolute", bottom: "-8px", left: "50%",
                  transform: "translateX(-50%)", width: 0, height: 0,
                  borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
                  borderTop: "8px solid rgba(0,217,255,0.3)",
                }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar with orbiting particles */}
          <div style={{ position: "relative", width: "140px", height: "160px" }}>
            {/* Orbit ring glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: "160px", height: "160px",
                marginTop: "-80px", marginLeft: "-80px",
                borderRadius: "50%",
                border: "1px dashed rgba(0,217,255,0.15)",
                pointerEvents: "none",
              }}
            />

            {/* Orbiting particles */}
            {ORBIT_PARTICLES.map((p, i) => (
              <OrbitParticle key={i} {...p} />
            ))}

            {/* Avatar image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "140px", height: "160px",
                position: "relative", cursor: "pointer", pointerEvents: "auto",
                filter: "drop-shadow(0 -10px 30px rgba(0,217,255,0.3))",
                willChange: "transform",
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setShowBubble(true);
                setBubble((prev) => (prev + 1) % SPEECH_BUBBLES.length);
              }}
            >
              <Image src="/avatar.png" alt="Nithish Avatar" fill sizes="140px"
                style={{ objectFit: "contain", objectPosition: "bottom" }} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
