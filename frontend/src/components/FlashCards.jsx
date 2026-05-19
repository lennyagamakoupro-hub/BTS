import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FlashCards = ({ cards, accent, chapterId }) => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i + 1) % cards.length), 250);
  };
  const prev = () => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i - 1 + cards.length) % cards.length), 250);
  };

  const card = cards[idx];

  return (
    <div className="border-2 bg-[var(--paper)]" style={{ borderColor: "#1C1C1A" }} data-testid={`flashcards-${chapterId}`}>
      <div className="px-4 py-2 border-b-2 flex items-center justify-between" style={{ borderColor: "#1C1C1A" }}>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold">
          Cartes mémoire — clique pour retourner
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
          {String(idx + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
        </span>
      </div>

      <div className="p-6 md:p-10 flex flex-col items-center">
        <div
          className="card-3d w-full max-w-md aspect-[5/3] cursor-pointer"
          onClick={() => setFlipped((f) => !f)}
          data-testid={`flashcard-flip-${chapterId}`}
        >
          <div className={`card-3d-inner relative w-full h-full ${flipped ? "flipped" : ""}`}>
            <div
              className="card-face absolute inset-0 border-2 flex flex-col items-center justify-center p-6 text-center"
              style={{ borderColor: "#1C1C1A", background: "var(--paper)" }}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: accent }}>
                Question
              </div>
              <div className="font-serif-ed italic text-xl md:text-3xl leading-snug">
                {card.front}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-50 mt-4">
                ↻ retourne
              </div>
            </div>
            <div
              className="card-back card-face absolute inset-0 border-2 flex flex-col items-center justify-center p-6 text-center"
              style={{ borderColor: "#1C1C1A", background: accent }}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest mb-3 text-[#1C1C1A]">
                Réponse
              </div>
              <div className="font-mono font-bold text-xl md:text-3xl text-[#1C1C1A] leading-tight">
                {card.back}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={prev}
            className="border-2 px-5 py-2 font-mono text-xs uppercase tracking-widest hover:bg-[#1C1C1A] hover:text-[var(--paper)] transition-colors"
            style={{ borderColor: "#1C1C1A" }}
            data-testid={`flashcard-prev-${chapterId}`}
          >
            ← précédent
          </button>
          <button
            onClick={() => setFlipped((f) => !f)}
            className="border-2 px-5 py-2 font-mono text-xs uppercase tracking-widest hover:bg-[#1C1C1A] hover:text-[var(--paper)] transition-colors"
            style={{ borderColor: "#1C1C1A" }}
            data-testid={`flashcard-toggle-${chapterId}`}
          >
            retourner
          </button>
          <button
            onClick={next}
            className="border-2 px-5 py-2 font-mono text-xs uppercase tracking-widest hover:bg-[#1C1C1A] hover:text-[var(--paper)] transition-colors"
            style={{ borderColor: "#1C1C1A" }}
            data-testid={`flashcard-next-${chapterId}`}
          >
            suivant →
          </button>
        </div>
      </div>
    </div>
  );
};
