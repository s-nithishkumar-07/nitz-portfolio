"use client";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Blog() {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <section
      id="blog"
      style={{
        background: "var(--bg-secondary)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)" }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <span className="section-label flex items-center justify-center gap-2 mb-4">
            <BookOpen size={12} />
            Writing
          </span>
          <h2 className="text-3xl md:text-4xl font-black">
            Blog &amp; <span className="gradient-text-cyan">Articles</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", maxWidth: "400px", margin: "12px auto 0" }}>
            Thoughts on development, design, and visual storytelling
          </p>
        </motion.div>

        {/* Blog cards */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "28px", alignItems: "stretch" }}>
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Top emoji banner — fixed height for all cards */}
              <div
                style={{
                  height: "100px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "44px",
                  flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(0,217,255,0.07) 0%, rgba(139,92,246,0.07) 100%)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {post.icon}
              </div>

              {/* Card body — grows to fill equal height */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                {/* Category + date */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <span style={{
                    fontSize: "11px", padding: "4px 12px", borderRadius: "999px", fontWeight: 600,
                    background: "rgba(0,217,255,0.08)", color: "var(--accent-cyan)",
                    border: "1px solid rgba(0,217,255,0.15)",
                  }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{post.date}</span>
                </div>

                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "10px", lineHeight: 1.5 }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: "12px", lineHeight: 1.75, color: "var(--text-secondary)", flex: 1, marginBottom: "20px" }}>
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)" }}>
                    <Clock size={11} />
                    <span style={{ fontSize: "11px" }}>{post.readTime}</span>
                  </div>
                  <button
                    style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600, color: "var(--accent-cyan)", background: "none", border: "none", cursor: "pointer" }}
                    id={`blog-read-${post.id}`}
                  >
                    Read More <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }}
      />
    </section>
  );
}
