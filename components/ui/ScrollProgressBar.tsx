"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #00D9FF, #8B5CF6, #FFD700)",
          transformOrigin: "0%",
          zIndex: 99999,
          boxShadow: "0 0 10px rgba(0,217,255,0.8), 0 0 20px rgba(139,92,246,0.4)",
        }}
      />
      {/* Glow dot at right edge */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          zIndex: 99999,
          scaleX,
          transformOrigin: "0%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#FFD700",
          boxShadow: "0 0 12px #FFD700, 0 0 24px #FFD700",
          marginTop: "2px",
          flexShrink: 0,
        }} />
      </motion.div>
    </>
  );
}
