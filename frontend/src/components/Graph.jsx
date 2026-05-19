import React, { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Animated SVG growth chart — supports linear, exponential, proportional vs equivalent
export const Graph = ({ mode = "linear", accent = "#0055FF", capital = 5000, rate = 0.04, years = 10, frequency = 12 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const { paths, maxValue, ticks, finalSimple, finalCompound } = useMemo(() => {
    const N = 60;
    const pts = [];
    const ptsCompound = [];
    for (let i = 0; i <= N; i++) {
      const x = i / N;
      const t = x * years;
      pts.push({ x, y: capital * (1 + rate * t) });
      ptsCompound.push({ x, y: capital * Math.pow(1 + rate, t) });
    }
    const max = Math.max(pts[N].y, ptsCompound[N].y);
    return {
      paths: { simple: pts, compound: ptsCompound },
      maxValue: max,
      ticks: [0, 0.25, 0.5, 0.75, 1].map((p) => Math.round(max * p)),
      finalSimple: pts[N].y,
      finalCompound: ptsCompound[N].y,
    };
  }, [capital, rate, years]);

  const W = 600;
  const H = 320;
  const padL = 50;
  const padR = 16;
  const padT = 20;
  const padB = 36;

  const toPath = (pts) =>
    pts
      .map((p, i) => {
        const px = padL + p.x * (W - padL - padR);
        const py = H - padB - ((p.y - capital) / (maxValue - capital + 1)) * (H - padT - padB);
        return `${i === 0 ? "M" : "L"} ${px.toFixed(2)} ${py.toFixed(2)}`;
      })
      .join(" ");

  const showCompare = mode === "exponential" || mode === "proportional" || mode === "equivalent";
  const primaryPath = mode === "linear" ? toPath(paths.simple) : toPath(paths.compound);
  const comparePath = toPath(paths.simple);

  return (
    <div ref={ref} className="border-2 bg-[var(--paper)]" style={{ borderColor: "#1C1C1A" }} data-testid="growth-graph">
      <div className="px-4 py-2 border-b-2 flex items-center justify-between" style={{ borderColor: "#1C1C1A" }}>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold">
          Figure 01 — Courbe de croissance
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
          {years} ans • {(rate * 100).toFixed(2)} %
        </span>
      </div>

      <div className="p-4 md:p-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {/* Grid */}
          {ticks.map((t, i) => {
            const py = H - padB - (i / (ticks.length - 1)) * (H - padT - padB);
            return (
              <g key={i}>
                <line x1={padL} x2={W - padR} y1={py} y2={py} stroke="#1C1C1A" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
                <text x={padL - 8} y={py + 3} textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="#1C1C1A" opacity="0.7">
                  {(capital + (maxValue - capital) * (i / (ticks.length - 1))).toFixed(0)}
                </text>
              </g>
            );
          })}
          {/* X axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
            const px = padL + p * (W - padL - padR);
            return (
              <text key={i} x={px} y={H - 14} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#1C1C1A" opacity="0.7">
                {Math.round(p * years)}a
              </text>
            );
          })}

          {/* Axes */}
          <line x1={padL} x2={padL} y1={padT} y2={H - padB} stroke="#1C1C1A" strokeWidth="1.5" />
          <line x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} stroke="#1C1C1A" strokeWidth="1.5" />

          {/* Comparison line (simple) if compound mode */}
          {showCompare && (
            <motion.path
              d={comparePath}
              fill="none"
              stroke="#1C1C1A"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          )}

          {/* Primary line */}
          <motion.path
            d={primaryPath}
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
          />

          {/* End marker */}
          <motion.circle
            cx={W - padR}
            cy={H - padB - (((mode === "linear" ? finalSimple : finalCompound) - capital) / (maxValue - capital + 1)) * (H - padT - padB)}
            r="5"
            fill={accent}
            stroke="#1C1C1A"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 2, duration: 0.4 }}
          />
        </svg>

        <div className="grid grid-cols-2 gap-4 mt-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-6 h-[3px]" style={{ background: accent }} />
            <span className="uppercase tracking-widest">
              {mode === "linear" ? "Simple" : "Composé"} → {Math.round(mode === "linear" ? finalSimple : finalCompound).toLocaleString("fr-FR")} €
            </span>
          </div>
          {showCompare && (
            <div className="flex items-center gap-2">
              <span className="inline-block w-6 h-[1.5px] border-t border-dashed" style={{ borderColor: "#1C1C1A" }} />
              <span className="uppercase tracking-widest opacity-60">
                Simple → {Math.round(finalSimple).toLocaleString("fr-FR")} €
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
