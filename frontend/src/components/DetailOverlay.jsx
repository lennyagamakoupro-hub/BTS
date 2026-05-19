import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Plus, ThumbsUp, Volume2 } from "lucide-react";
import { Thumb } from "./Hero";
import { FICHES } from "../data/lenny";

export const DetailOverlay = ({ fiche, onClose, onPlay }) => {
  useEffect(() => {
    if (fiche) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [fiche]);

  if (!fiche) return null;

  // related = same category, exclude current, limit 4
  const related = FICHES.filter((f) => f.category === fiche.category && f.id !== fiche.id).slice(0, 4);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 overflow-y-auto"
        onClick={onClose}
        data-testid="detail-overlay"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl mx-auto my-8 bg-[#181818] rounded-md overflow-hidden shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-[#181818] hover:bg-[#222] border border-white/20 flex items-center justify-center"
            data-testid="detail-close"
          >
            <X size={18} />
          </button>

          {/* Hero header */}
          <div className="relative h-[55vh] min-h-[400px]">
            <Thumb fiche={fiche} className="!h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-8 right-8">
              <div className="font-brand text-sm tracking-[0.3em] mb-2" style={{ color: fiche.accent }}>
                L · ORIGINAL
              </div>
              <h2 className="font-display-l text-4xl md:text-6xl leading-none mb-5">{fiche.title}</h2>
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => { onPlay(fiche); onClose(); }}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-white/80"
                  data-testid="detail-play"
                >
                  <Play size={20} fill="black" /> Réviser
                </button>
                <button className="w-10 h-10 rounded-full border-2 border-white/60 hover:border-white flex items-center justify-center">
                  <Plus size={18} />
                </button>
                <button className="w-10 h-10 rounded-full border-2 border-white/60 hover:border-white flex items-center justify-center">
                  <ThumbsUp size={16} />
                </button>
                <button className="ml-auto w-10 h-10 rounded-full border-2 border-white/60 hover:border-white flex items-center justify-center">
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-500 font-semibold">{fiche.match}% reco</span>
                <span>{fiche.year}</span>
                <span className="border border-white/40 px-1.5 py-0.5 text-xs">{fiche.duration}</span>
                <span className="border border-white/40 px-1.5 py-0.5 text-xs">BTS PI</span>
              </div>
              <div className="text-2xl italic font-light" style={{ color: fiche.accent }}>
                « {fiche.tagline} »
              </div>
              <p className="text-[#e5e5e5] leading-relaxed">{fiche.synopsis}</p>
            </div>
            <aside className="space-y-3 text-sm">
              <div>
                <span className="text-[#777]">Thèmes : </span>
                <span className="text-[#e5e5e5]">{fiche.tags.join(", ")}</span>
              </div>
              <div>
                <span className="text-[#777]">Semestre : </span>
                <span className="text-[#e5e5e5]">{fiche.year}</span>
              </div>
              <div>
                <span className="text-[#777]">Durée estimée : </span>
                <span className="text-[#e5e5e5]">{fiche.duration} de lecture</span>
              </div>
              <div>
                <span className="text-[#777]">Format : </span>
                <span className="text-[#e5e5e5]">Cours · Cas · Quiz · Mémos</span>
              </div>
            </aside>
          </div>

          {/* Episodes */}
          <div className="px-8 pb-8">
            <h3 className="text-xl font-bold mb-4">Le programme</h3>
            <div className="border-t border-white/10">
              {fiche.sections.map((s, i) => (
                <div key={s.id} className="border-b border-white/10 py-4 flex items-center gap-5">
                  <div className="text-2xl font-light text-[#777] w-8">{i + 1}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-[#aaa] line-clamp-2 mt-1">
                      {s.body || (s.steps && s.steps.map((st) => st.label).join(" · "))}
                    </div>
                  </div>
                  <div className="text-xs text-[#777]">~{2 + i} min</div>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="px-8 pb-10">
              <h3 className="text-xl font-bold mb-4">À voir aussi</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {related.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => { onClose(); setTimeout(() => onClose(r), 50); }}
                    className="text-left bg-[#2a2a2a] rounded overflow-hidden hover:bg-[#333] transition-colors"
                    data-testid={`detail-related-${r.id}`}
                  >
                    <div className="h-24 relative">
                      <Thumb fiche={r} />
                    </div>
                    <div className="p-3">
                      <div className="font-semibold text-sm mb-1">{r.title}</div>
                      <div className="flex items-center gap-2 text-xs text-[#aaa]">
                        <span className="text-green-500">{r.match}% reco</span>
                        <span>{r.duration}</span>
                      </div>
                      <div className="text-xs text-[#aaa] mt-2 line-clamp-2">{r.tagline}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
