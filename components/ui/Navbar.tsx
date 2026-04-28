"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#creative", label: "Creative" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ["about", "skills", "projects", "creative", "blog", "contact"];
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.getBoundingClientRect().top } : { id, top: 999 };
      });
      const active = offsets.filter((s) => s.top <= 100).pop();
      if (active) setActiveSection(active.id);
      else setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'top-4 w-[95%] md:w-[800px] rounded-full' : 'top-0 w-full rounded-none'}`}
        style={{
          background: scrolled
            ? "rgba(20, 20, 25, 0.75)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(150%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(150%)" : "none",
          border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
          boxShadow: scrolled ? "0 10px 40px -10px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div className={`mx-auto flex items-center justify-between ${scrolled ? 'px-6 py-3' : 'px-6 py-4 max-w-7xl'}`}>
          {/* Logo */}
          <motion.a
            href="#"
            className={`font-black tracking-tighter ${scrolled ? 'text-lg' : 'text-xl'}`}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="gradient-text-cyan">WN</span>
            <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: "2px" }}>.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative text-sm font-medium transition-colors duration-300 group"
                style={{
                  color: activeSection === link.href.replace("#", "")
                    ? "var(--accent-cyan)"
                    : "rgba(255,255,255,0.6)",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{
                    width: activeSection === link.href.replace("#", "") ? "100%" : "0",
                    background: "var(--accent-cyan)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-primary text-sm"
              style={{ padding: "10px 22px" }}
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "rgba(5,5,8,0.97)", backdropFilter: "blur(20px)" }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-bold py-4 transition-colors duration-300 hover:text-cyan-400"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => scrollTo("#contact")}
              className="btn-primary mt-8"
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
