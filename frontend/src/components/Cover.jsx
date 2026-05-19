import React from "react";
import { motion } from "framer-motion";
import { CHAPTERS } from "../data/chapters";

const COVER_IMG =
  "https://static.prod-images.emergentagent.com/jobs/96c7e974-2142-42d0-abc3-a98c4a1da670/images/e77581ed99c3be7b654e4b76d4b216696a1cc8348676155c84455df605dded05.png";

const TODAY = new Date().toLocaleDateString("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

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

        {/* RIGHT — Cover image */}
        <div className="md:col-span-5 relative">
          <motion.img
            src={COVER_IMG}
            alt="Magazine cover"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full h-full object-cover min-h-[300px] md:min-h-[600px]"
          />
          <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] uppercase tracking-widest bg-[var(--paper)] border-2 px-3 py-2 flex justify-between" style={{ borderColor: "#1C1C1A" }}>
            <span>Illustration originale</span>
            <span>cf. p. 02</span>
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
