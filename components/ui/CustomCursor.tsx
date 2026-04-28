"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;      // 0 → 1 (dies at 0)
  maxLife: number;
  size: number;
  hue: number;       // colour shift
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dot = dotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const particles: Particle[] = [];
    let mx = -200, my = -200;
    let raf = 0;

    /* ── resize ── */
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    /* ── move logic ── */
    const handleMove = (clientX: number, clientY: number) => {
      mx = clientX;
      my = clientY;

      // Move the sharp dot cursor instantly
      dot.style.left = mx + "px";
      dot.style.top = my + "px";

      // Spawn 3-5 smoke particles per frame
      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 6,
          y: my + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.6,   // slight horizontal drift
          vy: 0.4 + Math.random() * 1.2,      // FALLS DOWN (positive y)
          life: 1,
          maxLife: 0.6 + Math.random() * 0.6,
          size: 2 + Math.random() * 5,
          hue: 180 + Math.random() * 60,       // cyan → teal spectrum
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      dot.style.left = "-200px";
      dot.style.top = "-200px";
    };

    /* ── animation loop ── */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;            // gravity — accelerates fall
        p.vx *= 0.98;            // friction
        p.size *= 0.97;          // shrinks as it falls
        p.life -= 0.012 / p.maxLife;

        if (p.life <= 0 || p.size < 0.3) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life * 0.7;

        // Outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue}, 80%, 50%, ${alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${p.hue}, 60%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core bright dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 90%, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    /* ── hover scale effect on interactive elements ── */
    const onEnter = () => dot.classList.add("cursor-hover");
    const onLeave = () => dot.classList.remove("cursor-hover");

    const links = document.querySelectorAll("a, button, [role='button'], input, textarea");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* Full-screen canvas for smoke trail */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* Sharp bright cursor dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#00D9FF",
          boxShadow: "0 0 10px #00D9FF, 0 0 20px rgba(0,217,255,0.5)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform 0.1s ease, width 0.2s ease, height 0.2s ease",
        }}
        className="cursor-dot"
      />

      <style>{`
        body { cursor: none; }
        a, button, input, textarea, [role="button"] { cursor: none; }
        .cursor-hover {
          width: 16px !important;
          height: 16px !important;
          background: #fff !important;
          box-shadow: 0 0 20px #fff, 0 0 40px rgba(0,217,255,0.8) !important;
        }
      `}</style>
    </>
  );
}
