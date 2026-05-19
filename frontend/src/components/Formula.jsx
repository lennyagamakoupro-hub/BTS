import React from "react";
import { motion } from "framer-motion";

// Beautifully typeset formula card — brutalist, mono, with variable legend
export const Formula = ({ formula, accent }) => {
  return (
    <div
      className="border-2 bg-[var(--paper)] relative"
      style={{ borderColor: "#1C1C1A" }}
      data-testid="formula-card"
    >
      <div
        className="px-4 py-2 border-b-2 flex items-center justify-between"
        style={{ background: accent, borderColor: "#1C1C1A" }}
      >
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-[#1C1C1A]">
          Formule
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#1C1C1A]">
          → mémorise
        </span>
      </div>

      <div className="px-6 md:px-10 py-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-mono text-3xl md:text-5xl font-bold tracking-tight text-center"
        >
          {formula.latex}
        </motion.div>
      </div>

      <div className="border-t-2 grid grid-cols-2 md:grid-cols-4" style={{ borderColor: "#1C1C1A" }}>
        {formula.parts.map((p, i) => (
          <div
            key={i}
            className={`p-4 ${i < formula.parts.length - 1 ? "border-r-2" : ""} ${
              i < 2 ? "border-b-2 md:border-b-0" : ""
            }`}
            style={{ borderColor: "#1C1C1A" }}
          >
            <div
              className="font-mono text-2xl font-bold mb-1"
              style={{ color: accent }}
            >
              {p.sym}
            </div>
            <div className="font-serif-ed text-sm md:text-base italic leading-tight">
              {p.label}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest mt-2 opacity-60">
              {p.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
