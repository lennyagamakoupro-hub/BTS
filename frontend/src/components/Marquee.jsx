import React from "react";

export const Marquee = ({ items, accent = "#1C1C1A" }) => {
  const doubled = [...items, ...items, ...items];
  return (
    <div
      className="overflow-hidden border-y-2 py-3 select-none"
      style={{ borderColor: "#1C1C1A", background: accent === "#1C1C1A" ? "#1C1C1A" : accent }}
      data-testid="editorial-marquee"
    >
      <div className="marquee-track flex whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((it, i) => (
          <span
            key={i}
            className="font-display font-black uppercase tracking-tight text-2xl md:text-4xl px-6"
            style={{ color: accent === "#1C1C1A" ? "#F4F0EB" : "#1C1C1A" }}
          >
            {it}
            <span className="px-6 opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
