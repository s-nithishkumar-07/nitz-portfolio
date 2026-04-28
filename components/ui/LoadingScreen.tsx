"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: "#050508" }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-black tracking-tighter"
            >
              <span className="gradient-text-cyan">Welcome to</span> Nithish Portfolio
              <span style={{ color: "rgba(255,255,255,0.2)" }}>.</span>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-px" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))",
                  transition: "width 0.1s ease",
                }}
              />
            </div>

            {/* Percentage */}
            <motion.span
              className="text-xs font-mono"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {Math.min(Math.floor(progress), 100)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
