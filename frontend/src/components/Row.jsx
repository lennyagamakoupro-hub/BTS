import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Plus, Check, ThumbsUp, ChevronDown } from "lucide-react";
import { Thumb } from "./Hero";
import { useStore } from "../hooks/useStore";

const Card = ({ fiche, onPlay, onInfo, rankNum }) => {
  const [hover, setHover] = useState(false);
  const { inList, toggleList, scores, progress } = useStore();
  const added = inList(fiche.id);
  const sc = scores[fiche.id];
  const pr = progress[fiche.id];
  return (
    <motion.div
      className="relative shrink-0 cursor-pointer group"
      style={{ width: rankNum ? 360 : 260 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onInfo(fiche)}
      data-testid={`card-${fiche.id}`}
    >
      <div className="flex items-end h-[150px]">
        {rankNum && (
          <div className="top-numeral mr-[-30px] z-0">{rankNum}</div>
        )}
        <div className="relative w-[260px] h-[150px] rounded overflow-hidden border border-white/5">
          <Thumb fiche={fiche} />
          <div className="absolute top-2 left-2 font-brand text-[10px] tracking-widest px-1.5 py-0.5" style={{ background: fiche.accent, color: "#000" }}>
            L · ORIGINAL
          </div>
          {/* Progress badges (top-right) */}
          {pr?.status === "completed" && (
            <div className="absolute top-2 right-2 bg-green-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
              <Check size={10} /> Vu
            </div>
          )}
          {sc && (
            <div className="absolute top-2 right-2 mt-7 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ marginTop: pr?.status === "completed" ? "1.6rem" : 0 }}>
              ★ {sc.score}/{sc.total}
            </div>
          )}
          {added && (
            <div className="absolute bottom-9 right-2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
              <Check size={10} /> Liste
            </div>
          )}
          <div className="absolute bottom-2 left-2 right-2 z-10">
            <div className="text-xs font-bold drop-shadow leading-tight">{fiche.title}</div>
          </div>
        </div>
      </div>

      {/* Hover popout */}
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 0 }}
            animate={{ opacity: 1, scale: 1.18, y: -20 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-0 z-30 origin-center bg-[#181818] rounded shadow-2xl overflow-hidden hidden md:block"
            style={{ width: 280, marginLeft: rankNum ? "calc(100% - 280px - 30px)" : "-10px", transformOrigin: rankNum ? "right top" : "center top" }}
          >
            <div className="relative h-[160px]">
              <Thumb fiche={fiche} />
            </div>
            <div className="p-3 space-y-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onPlay(fiche); }}
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/80"
                  data-testid={`card-${fiche.id}-play`}
                >
                  <Play size={16} fill="black" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleList(fiche.id); }}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${added ? "border-white bg-white text-black" : "border-white/40 hover:border-white"}`}
                  data-testid={`card-${fiche.id}-list`}
                  title={added ? "Retirer de Ma Liste" : "Ajouter à Ma Liste"}
                >
                  {added ? <Check size={16} /> : <Plus size={16} />}
                </button>
                <button className="w-9 h-9 rounded-full border-2 border-white/40 hover:border-white flex items-center justify-center">
                  <ThumbsUp size={14} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onInfo(fiche); }}
                  className="ml-auto w-9 h-9 rounded-full border-2 border-white/40 hover:border-white flex items-center justify-center"
                  data-testid={`card-${fiche.id}-info`}
                >
                  <ChevronDown size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-500 font-semibold">{fiche.match}% reco</span>
                <span className="border border-white/40 px-1 text-[10px]">{fiche.year}</span>
                <span className="text-[#aaa]">{fiche.duration}</span>
                {sc && <span className="text-yellow-400 font-bold">★ {sc.score}/{sc.total}</span>}
              </div>
              <div className="text-xs text-[#ddd] leading-snug line-clamp-3">
                {fiche.tagline}
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-[#ddd]">
                {fiche.tags.slice(0, 3).map((t, i) => (
                  <span key={i}>{t}{i < Math.min(2, fiche.tags.length - 1) ? " ·" : ""}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Row = ({ row, fiches, onPlay, onInfo, isTop10 = false }) => {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * scrollRef.current.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id={`row-${row.id}`} className="relative py-3 md:py-5 group/row" data-testid={`row-${row.id}`}>
      <h2 className="px-4 md:px-12 mb-2 md:mb-3 text-lg md:text-2xl font-bold tracking-tight">
        {row.title}
      </h2>

      {/* Arrows */}
      <button
        onClick={() => scrollBy(-1)}
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 h-32 w-10 md:w-12 bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        data-testid={`row-${row.id}-prev`}
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={() => scrollBy(1)}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 h-32 w-10 md:w-12 bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        data-testid={`row-${row.id}-next`}
      >
        <ChevronRight size={32} />
      </button>

      <div
        ref={scrollRef}
        className="row-scroll flex gap-3 overflow-x-auto px-4 md:px-12 py-12 -my-6 scroll-px-12"
      >
        {fiches.map((f, i) => (
          <Card
            key={f.id + "-" + row.id}
            fiche={f}
            onPlay={onPlay}
            onInfo={onInfo}
            rankNum={isTop10 ? i + 1 : null}
          />
        ))}
      </div>
    </section>
  );
};
