import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CHAPTERS } from "../data/chapters";

export const Nav = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [active, setActive] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b-2 bg-[var(--paper)]"
      style={{ borderColor: "#1C1C1A" }}
      data-testid="top-nav"
    >
      <div className="px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <a href="#top" className="font-display font-black text-base md:text-lg tracking-tight uppercase" data-testid="nav-logo">
          MF<span className="italic font-serif-ed normal-case font-bold"> · le magazine</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {CHAPTERS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="font-mono text-[10px] uppercase tracking-widest px-3 py-2 border-2 transition-colors"
              style={{
                borderColor: active === c.id ? c.accent : "transparent",
                background: active === c.id ? c.accent : "transparent",
                color: "#1C1C1A",
              }}
              data-testid={`nav-link-${c.id}`}
            >
              {c.number} · {c.title.replace("\n", " ").split(" ")[0]}
            </a>
          ))}
        </nav>

        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-70">
          BTS · MF
        </div>
      </div>
      <motion.div
        className="h-[3px] origin-left"
        style={{ scaleX, background: "#1C1C1A" }}
        data-testid="scroll-progress"
      />
    </header>
  );
};
