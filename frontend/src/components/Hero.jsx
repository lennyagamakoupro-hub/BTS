import React from "react";
import { motion } from "framer-motion";
import { Play, Info, Plus, Check } from "lucide-react";
import { Illustration } from "./Illustration";
import { useStore } from "../hooks/useStore";

// Thumbnail = bespoke SVG illustration per fiche
export const Thumb = ({ fiche, className = "" }) => {
  return <Illustration fiche={fiche} className={className} />;
};

export const Hero = ({ fiche, onPlay, onInfo }) => {
  const { inList, toggleList } = useStore();
  const added = inList(fiche.id);
  return (
    <section className="relative h-[78vh] md:h-[88vh] min-h-[520px] md:min-h-[600px] w-full overflow-hidden" data-testid="hero">
      {/* Background */}
      <div className="absolute inset-0">
        <Thumb fiche={fiche} className="!h-full" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 hero-fade-left" />
      <div className="absolute inset-0 hero-fade-bottom" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 md:px-12 lg:px-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-brand text-xl tracking-[0.3em]" style={{ color: fiche.accent }}>
              L · ORIGINAL
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display-l text-[clamp(2.25rem,7vw,6rem)] leading-[0.95] mb-4"
            data-testid="hero-title"
          >
            {fiche.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 text-sm mb-4 text-[#e5e5e5]"
          >
            <span className="text-green-500 font-semibold">{fiche.match}% recommandé</span>
            <span>{fiche.year}</span>
            <span className="border border-white/40 px-1.5 text-xs">{fiche.duration}</span>
            <span className="px-2 py-0.5 text-xs" style={{ background: "rgba(255,255,255,0.1)" }}>BTS PI</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-base md:text-xl text-[#e5e5e5] leading-snug mb-5 md:mb-8 max-w-xl line-clamp-4 md:line-clamp-none"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
            data-testid="hero-synopsis"
          >
            <span className="block italic font-light mb-2" style={{ color: fiche.accent }}>
              « {fiche.tagline} »
            </span>
            {fiche.synopsis}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => onPlay(fiche)}
              className="play-shadow flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded font-semibold hover:bg-white/80 transition-colors"
              data-testid="hero-play"
            >
              <Play size={22} fill="black" /> Réviser
            </button>
            <button
              onClick={() => onInfo(fiche)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur text-white px-6 md:px-8 py-2.5 md:py-3 rounded font-semibold hover:bg-white/30 transition-colors"
              data-testid="hero-info"
            >
              <Info size={22} /> Plus d'infos
            </button>
            <button
              onClick={() => toggleList(fiche.id)}
              className={`flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border-2 transition-colors ${added ? "border-white bg-white text-black" : "border-white/40 hover:border-white text-white"}`}
              data-testid="hero-add"
              title={added ? "Retirer de Ma Liste" : "Ajouter à Ma Liste"}
            >
              {added ? <Check size={20} /> : <Plus size={20} />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Age badge bottom-right (Netflix style) */}
      <div className="absolute right-0 bottom-32 z-10 border-l-4 border-white/70 px-4 py-1.5 bg-black/40 font-semibold text-sm hidden md:block">
        BTS Transaction · {fiche.tag}
      </div>
    </section>
  );
};
