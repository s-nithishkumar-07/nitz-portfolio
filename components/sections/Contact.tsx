"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { personalInfo } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const WA_NUMBER = "916374025197";

export default function Contact() {
  const { isMobile } = useBreakpoint();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const text =
      `Hi Nithishkumar! 👋\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n\n` +
      `${form.message}\n\n` +
      `_Sent from your portfolio contact form_`;
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  const socials = [
    { icon: FaGithub,    label: "GitHub",    href: personalInfo.socials.github },
    { icon: FaLinkedin,  label: "LinkedIn",  href: personalInfo.socials.linkedin },
    { icon: FaInstagram, label: "Instagram", href: personalInfo.socials.instagram },
  ];

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: "12px", fontSize: "14px",
    outline: "none", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)", color: "white",
    boxSizing: "border-box" as const, transition: "border 0.3s",
  };

  return (
    <section
      id="contact"
      style={{
        background: "var(--bg-secondary)",
        padding: isMobile ? "60px 0" : "100px 0",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "500px", height: "500px", borderRadius: "50%",
        filter: "blur(200px)", opacity: 0.04,
        background: "var(--accent-cyan)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <MessageSquare size={12} /> Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-black">
            Let&apos;s <span className="gradient-text-cyan">Connect</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", maxWidth: "480px", margin: "12px auto 0" }}>
            Fill the form below — it&apos;ll open WhatsApp with your message pre-filled!
          </p>
        </motion.div>

        {/* Two-column grid — collapses on mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "24px" : "32px",
          alignItems: "stretch",
        }}>
          {/* LEFT — Info card */}
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px", padding: isMobile ? "28px 24px" : "40px",
              backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", gap: "28px",
            }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px" }}>
                Direct via WhatsApp
              </p>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: 700, color: "#25D366", textDecoration: "none" }}
                id="contact-whatsapp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +91 63740 25197
              </a>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px" }}>
                Email
              </p>
              <a href={`mailto:${personalInfo.email}`}
                style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 600, color: "#fff", textDecoration: "none" }}
                id="contact-email">
                <Mail size={16} style={{ color: "var(--accent-cyan)", flexShrink: 0 }} />
                {personalInfo.email}
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
              <MapPin size={14} style={{ color: "var(--accent-cyan)", flexShrink: 0 }} />
              <span style={{ fontSize: "14px" }}>{personalInfo.location}</span>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "14px" }}>Find Me On</p>
              <div style={{ display: "flex", gap: "12px" }}>
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    style={{ width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    aria-label={label} id={`social-${label.toLowerCase()}`}>
                    <Icon size={18} color="rgba(255,255,255,0.7)" />
                  </motion.a>
                ))}
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} style={{ marginTop: "auto", padding: "20px", borderRadius: "16px", background: "rgba(0,217,255,0.04)", border: "1px solid rgba(0,217,255,0.12)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#22c55e" }}>Available for Work</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Open to freelance projects, internships, and full-time developer roles.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "16px", minHeight: "400px" }}>
                <CheckCircle2 size={48} style={{ color: "#25D366" }} />
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>WhatsApp Opening! 🎉</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                  Thank you for reaching me! WhatsApp should open with your message pre-filled.
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Didn&apos;t open?{" "}
                  <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                    style={{ color: "var(--accent-cyan)", textDecoration: "none" }}>Click here</a>
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline" style={{ padding: "10px 24px", fontSize: "13px", marginTop: "8px" }}>
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: isMobile ? "28px 24px" : "40px", display: "flex", flexDirection: "column", gap: "20px", boxSizing: "border-box" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>Your Name</label>
                  <input type="text" required placeholder="Enter your full name" value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    style={inputStyle} id="contact-name" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>Email Address</label>
                  <input type="email" required placeholder="you@example.com" value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    style={inputStyle} id="contact-email-input" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>Message</label>
                  <textarea required rows={5} placeholder="Tell me about your project or just say hi..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "none", height: "140px" }} id="contact-message" />
                </div>
                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#fff" }}
                  id="contact-submit">
                  {loading ? (
                    <>
                      <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send via WhatsApp
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>© 2024 Nithishkumar. Designed &amp; built with ❤️ in Tamil Nadu, India.</p>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Built with <span style={{ color: "var(--accent-cyan)" }}>Next.js</span>{" "}+ <span style={{ color: "var(--accent-purple)" }}>Framer Motion</span>
          </p>
        </div>
      </div>
    </section>
  );
}
