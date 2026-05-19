import React from "react";
import { motion } from "framer-motion";
import { CHAPTERS } from "../data/chapters";

const TODAY = new Date().toLocaleDateString("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

// Editorial SVG cover — no AI text, just shapes inspired by the 4 chapter metaphors
const CoverArt = () => {
  return (
    <svg viewBox="0 0 600 800" className="w-full h-full block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {/* Halftone background */}
      <defs>
        <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#1C1C1A" opacity="0.25" />
        </pattern>
        <pattern id="dotsDense" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#1C1C1A" opacity="0.55" />
        </pattern>
        <clipPath id="halfL"><rect x="0" y="0" width="300" height="800" /></clipPath>
      </defs>

      <rect width="600" height="800" fill="#EAE5DE" />
      <rect width="600" height="800" fill="url(#dots)" />

      {/* Big blue circle — fountain / simple */}
      <motion.circle
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        cx="170" cy="220" r="160" fill="#0055FF"
      />
      <circle cx="170" cy="220" r="160" fill="url(#dotsDense)" opacity="0.4" clipPath="url(#halfL)" />

      {/* Orange snowball spiral */}
      <motion.g
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ transformOrigin: "450px 250px" }}
      >
        <circle cx="450" cy="250" r="120" fill="#FF4400" />
        <circle cx="430" cy="230" r="70" fill="#EAE5DE" />
        <circle cx="445" cy="245" r="40" fill="#FF4400" />
        <circle cx="438" cy="238" r="14" fill="#1C1C1A" />
      </motion.g>

      {/* Linear chart line crossing center */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
        d="M 40 540 L 200 480 L 320 420 L 460 320 L 560 220"
        fill="none" stroke="#1C1C1A" strokeWidth="3"
      />
      {/* Exponential curve */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.8 }}
        d="M 40 620 Q 250 615 380 480 T 560 100"
        fill="none" stroke="#FF4400" strokeWidth="4"
      />

      {/* Pink pizza slice */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{ transformOrigin: "150px 620px" }}
      >
        <path d="M 150 620 L 60 720 L 240 720 Z" fill="#FF00AA" />
        <path d="M 150 620 L 60 720 L 240 720 Z" fill="url(#dotsDense)" opacity="0.3" />
        <circle cx="120" cy="685" r="6" fill="#1C1C1A" />
        <circle cx="170" cy="700" r="6" fill="#1C1C1A" />
        <circle cx="150" cy="660" r="5" fill="#1C1C1A" />
      </motion.g>

      {/* Acid green scale */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <rect x="380" y="600" width="160" height="6" fill="#CCFF00" />
        <rect x="455" y="606" width="6" height="100" fill="#CCFF00" />
        <rect x="420" y="700" width="80" height="12" fill="#CCFF00" />
        <circle cx="400" cy="600" r="22" fill="#CCFF00" stroke="#1C1C1A" strokeWidth="2" />
        <circle cx="520" cy="600" r="22" fill="#CCFF00" stroke="#1C1C1A" strokeWidth="2" />
      </motion.g>

      {/* Editorial markings — corner crosses */}
      {[[20,20],[580,20],[20,780],[580,780]].map(([x,y],i)=>(
        <g key={i} stroke="#1C1C1A" strokeWidth="1.5">
          <line x1={x-8} y1={y} x2={x+8} y2={y} />
          <line x1={x} y1={y-8} x2={x} y2={y+8} />
        </g>
      ))}

      {/* Small editorial labels (mono) */}
      <text x="40" y="60" fontFamily="JetBrains Mono" fontSize="10" fill="#1C1C1A" letterSpacing="2">№ 01 · 02 · 03 · 04</text>
      <text x="40" y="770" fontFamily="JetBrains Mono" fontSize="10" fill="#1C1C1A" letterSpacing="2" opacity="0.6">FIG · COMPOSITION ORIGINALE</text>
    </svg>
  );
};

export const Cover = () => {
  return (
    <section
      className="relative w-full min-h-screen border-b-2 overflow-hidden"
      style={{ borderColor: "#1C1C1A" }}
      data-testid="cover-section"
    >
      {/* Top masthead */}
      <div className="border-b-2 px-6 md:px-12 py-3 flex items-center justify-between text-xs md:text-sm font-mono uppercase tracking-widest" style={{ borderColor: "#1C1C1A" }}>
        <span>Vol. III · № 04</span>
        <span className="hidden md:inline">Trimestriel · BTS</span>
        <span>{TODAY}</span>
      </div>

      <div className="grid md:grid-cols-12 gap-0">
        {/* LEFT — Big typography */}
        <div className="md:col-span-7 px-6 md:px-12 pt-10 md:pt-16 pb-8 border-b-2 md:border-b-0 md:border-r-2" style={{ borderColor: "#1C1C1A" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6">
              Le magazine des maths qui rapportent
            </div>
            <h1 className="font-display font-black uppercase leading-[0.82] tracking-tighter text-[clamp(3.5rem,12vw,11rem)]">
              Maths
              <br />
              <span className="italic font-serif-ed font-bold normal-case tracking-tight" style={{ fontStyle: "italic" }}>
                financières
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif-ed text-xl md:text-3xl italic leading-snug mt-8 max-w-2xl"
          >
            Quatre dossiers pour comprendre — vraiment — comment l'argent prend de la valeur dans le temps. Avec calculs en direct, courbes animées, et cartes pour réviser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#ch1"
              className="border-2 px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#1C1C1A] hover:text-[var(--paper)] transition-colors"
              style={{ borderColor: "#1C1C1A" }}
              data-testid="cover-start-button"
            >
              Commencer la lecture →
            </a>
            <a
              href="#sommaire"
              className="border-2 px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#1C1C1A] hover:text-[var(--paper)] transition-colors"
              style={{ borderColor: "#1C1C1A" }}
              data-testid="cover-toc-button"
            >
              Sommaire ↓
            </a>
          </motion.div>
        </div>

        {/* RIGHT — Editorial SVG composition */}
        <div className="md:col-span-5 relative bg-[var(--paper-alt)] overflow-hidden min-h-[300px] md:min-h-[600px]">
          <CoverArt />
          <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] uppercase tracking-widest bg-[var(--paper)] border-2 px-3 py-2 flex justify-between z-10" style={{ borderColor: "#1C1C1A" }}>
            <span>Fig. 00 — Les quatre dossiers</span>
            <span>cf. p. 03</span>
          </div>
        </div>
      </div>

      {/* Bottom barcode-like strip */}
      <div className="border-t-2 px-6 md:px-12 py-5 grid md:grid-cols-3 gap-6 text-xs md:text-sm font-mono uppercase tracking-widest" style={{ borderColor: "#1C1C1A" }}>
        <div>
          <span className="opacity-50">Au sommaire</span>
          <div className="mt-1 font-display font-black text-xl tracking-tight normal-case">
            04 dossiers
          </div>
        </div>
        <div>
          <span className="opacity-50">Niveau</span>
          <div className="mt-1 font-display font-black text-xl tracking-tight normal-case">
            BTS · première année
          </div>
        </div>
        <div className="text-right">
          <span className="opacity-50">Édition</span>
          <div className="mt-1 font-display font-black text-xl tracking-tight normal-case">
            Comic → Éditorial
          </div>
        </div>
      </div>
    </section>
  );
};

export const TableOfContents = () => {
  return (
    <section
      id="sommaire"
      className="border-b-2 px-6 md:px-12 py-16 md:py-24"
      style={{ borderColor: "#1C1C1A" }}
      data-testid="toc-section"
    >
      <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6">
        Pages 03 — 04 · Sommaire
      </div>
      <h2 className="font-display font-black uppercase leading-[0.85] tracking-tighter text-[clamp(2.5rem,8vw,7rem)] mb-12">
        Ce que tu vas
        <br />
        <span className="italic font-serif-ed normal-case">apprendre.</span>
      </h2>

      <div className="grid gap-0 border-t-2" style={{ borderColor: "#1C1C1A" }}>
        {CHAPTERS.map((ch, i) => (
          <motion.a
            key={ch.id}
            href={`#${ch.id}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ x: 8 }}
            className="border-b-2 py-6 md:py-8 grid grid-cols-12 items-center gap-4 hover:bg-[#1C1C1A] hover:text-[var(--paper)] transition-colors group"
            style={{ borderColor: "#1C1C1A" }}
            data-testid={`toc-link-${ch.id}`}
          >
            <span
              className="col-span-2 md:col-span-1 font-display font-black text-3xl md:text-5xl tracking-tighter"
              style={{ color: ch.accent }}
            >
              {ch.number}
            </span>
            <div className="col-span-7 md:col-span-7">
              <div className="font-display font-black text-xl md:text-3xl uppercase tracking-tight leading-none">
                {ch.title.replace("\n", " ")}
              </div>
              <div className="font-serif-ed italic mt-2 text-sm md:text-base opacity-80 group-hover:opacity-100">
                {ch.deck}
              </div>
            </div>
            <div className="col-span-3 md:col-span-4 text-right">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100">
                p. {String((i + 1) * 12).padStart(2, "0")} · {ch.accentName}
              </span>
              <div className="font-mono text-xl mt-1">→</div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
