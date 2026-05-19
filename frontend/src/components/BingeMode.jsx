import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronRight, RotateCcw, Zap } from "lucide-react";
import { FICHES } from "../data/lenny";
import { useStore } from "../hooks/useStore";

// Pull N random questions across all fiches
const buildBingeSession = (n = 5) => {
  const pool = [];
  FICHES.forEach((f) => {
    f.quiz.forEach((q, qi) => {
      pool.push({ ...q, ficheId: f.id, ficheTitle: f.title, accent: f.accent, key: `${f.id}-${qi}` });
    });
  });
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
};

export const BingeMode = ({ open, onClose }) => {
  const { saveScore } = useStore();
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [pickedChoice, setPickedChoice] = useState(null);

  const restart = () => {
    setQuestions(buildBingeSession(5));
    setIdx(0);
    setAnswers({});
    setDone(false);
    setPickedChoice(null);
  };

  useEffect(() => {
    if (open) restart();
  }, [open]);

  const current = questions[idx];
  const score = Object.values(answers).filter((a) => a.correct).length;

  const pickAnswer = (ci) => {
    if (pickedChoice !== null) return;
    setPickedChoice(ci);
    const correct = ci === current.answer;
    setAnswers((cur) => ({ ...cur, [idx]: { picked: ci, correct } }));
  };

  const goNext = () => {
    setPickedChoice(null);
    if (idx + 1 >= questions.length) {
      setDone(true);
      // Save aggregated binge score
      saveScore("binge:latest", score, questions.length);
    } else {
      setIdx(idx + 1);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] bg-black overflow-y-auto"
        data-testid="binge-mode"
      >
        {/* Backdrop accent glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, rgba(229,9,20,0.15), transparent 60%)" }} />

        {/* Top bar */}
        <div className="relative z-10 px-4 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap size={22} className="text-[#E50914]" />
            <span className="font-brand text-lg tracking-[0.3em] text-[#E50914]">BINGE RÉVISION</span>
            <span className="text-sm text-[#777] hidden md:inline">· 5 questions, allez allez allez</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-white/20 hover:border-white flex items-center justify-center" data-testid="binge-close">
            <X size={18} />
          </button>
        </div>

        {/* Progress */}
        {!done && (
          <div className="px-4 md:px-12 mb-8">
            <div className="flex gap-2">
              {questions.map((_, i) => {
                const a = answers[i];
                let bg = "#2a2a2a";
                if (i === idx && !a) bg = "#fff";
                if (a?.correct) bg = "#22c55e";
                if (a && !a.correct) bg = "#E50914";
                return <div key={i} className="h-1 flex-1 rounded" style={{ background: bg }} />;
              })}
            </div>
            <div className="text-xs text-[#777] mt-2 font-mono">
              Question {idx + 1} / {questions.length} · Score actuel {score}
            </div>
          </div>
        )}

        {/* Question body */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-12 pb-24">
          {!done && current && (
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="font-brand text-xs tracking-[0.3em] mb-3" style={{ color: current.accent }}>
                FICHE — {current.ficheTitle.toUpperCase()}
              </div>
              <h2 className="text-3xl md:text-5xl font-display-l leading-tight mb-10" data-testid="binge-question">
                {current.q}
              </h2>
              <div className="grid gap-3">
                {current.choices.map((c, ci) => {
                  const selected = pickedChoice === ci;
                  const correct = current.answer === ci;
                  let bg = "#181818", color = "#fff", border = "rgba(255,255,255,0.1)";
                  if (pickedChoice !== null) {
                    if (correct) { bg = "#22c55e"; color = "#000"; border = "#22c55e"; }
                    else if (selected) { bg = "#E50914"; color = "#fff"; border = "#E50914"; }
                  } else if (selected) { bg = "#fff"; color = "#000"; }
                  return (
                    <button
                      key={ci}
                      onClick={() => pickAnswer(ci)}
                      disabled={pickedChoice !== null}
                      className="px-5 py-4 rounded-lg text-left text-lg transition-colors flex items-center gap-4"
                      style={{ background: bg, color, border: `1px solid ${border}` }}
                      data-testid={`binge-choice-${ci}`}
                    >
                      <span className="font-mono text-sm opacity-60 w-6">{String.fromCharCode(65 + ci)}</span>
                      <span className="flex-1">{c}</span>
                      {pickedChoice !== null && correct && <Check size={20} />}
                      {pickedChoice !== null && selected && !correct && <X size={20} />}
                    </button>
                  );
                })}
              </div>

              {pickedChoice !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 flex items-center justify-between"
                >
                  <div className={`text-base md:text-lg italic ${answers[idx]?.correct ? "text-green-500" : "text-[#E50914]"}`}>
                    {answers[idx]?.correct ? "Parfait." : "Pas tout à fait — la bonne réponse était surlignée."}
                  </div>
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-white/80"
                    data-testid="binge-next"
                  >
                    {idx + 1 >= questions.length ? "Voir le score" : "Suivante"} <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
              data-testid="binge-result"
            >
              <div className="font-brand text-sm tracking-[0.3em] text-[#E50914] mb-4">FIN DE SESSION</div>
              <div className="font-display-l text-7xl md:text-9xl mb-2">
                {score}<span className="text-[#444]">/{questions.length}</span>
              </div>
              <div className="text-xl text-[#aaa] mb-12">
                {score === questions.length ? "Sans-faute. Tu vises Major." :
                 score >= questions.length - 1 ? "Excellent — un détail à revoir." :
                 score >= Math.ceil(questions.length / 2) ? "Bon niveau, encore quelques séances." :
                 "Allez, on remet ça."}
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={restart} className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-white/80" data-testid="binge-restart">
                  <RotateCcw size={18} /> Nouvelle série
                </button>
                <button onClick={onClose} className="px-6 py-3 rounded border border-white/30 hover:border-white">
                  Retour au catalogue
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
