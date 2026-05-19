import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, RotateCcw, Check } from "lucide-react";
import { Thumb } from "./Hero";
import { useStore } from "../hooks/useStore";

// === Interactive widgets (dark themed) ===

const LiveCalculator = ({ mode, accent, fiche }) => {
  const [capital, setCapital] = useState(5000);
  const [rate, setRate] = useState(4);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(12);

  const { resultLabel, resultValue, secondaryLabel, secondaryValue } = useMemo(() => {
    const r = rate / 100;
    if (mode === "calc-linear") {
      const interest = capital * r * years;
      return {
        resultLabel: "Capital final",
        resultValue: (capital + interest).toLocaleString("fr-FR") + " €",
        secondaryLabel: "Intérêts gagnés",
        secondaryValue: Math.round(interest).toLocaleString("fr-FR") + " €",
      };
    }
    if (mode === "calc-exp") {
      const final = capital * Math.pow(1 + r, years);
      const simple = capital * (1 + r * years);
      return {
        resultLabel: "Capital final (composé)",
        resultValue: Math.round(final).toLocaleString("fr-FR") + " €",
        secondaryLabel: "Gain vs. simple",
        secondaryValue: "+" + Math.round(final - simple).toLocaleString("fr-FR") + " €",
      };
    }
    if (mode === "calc-prop") {
      const tp = r / frequency;
      return {
        resultLabel: `Taux proportionnel / ${frequency}`,
        resultValue: (tp * 100).toFixed(4) + " %",
        secondaryLabel: "Cumul sur l'année",
        secondaryValue: (Math.pow(1 + tp, frequency) * 100 - 100).toFixed(4) + " %",
      };
    }
    if (mode === "calc-equiv") {
      const te = Math.pow(1 + r, 1 / frequency) - 1;
      return {
        resultLabel: `Taux équivalent / ${frequency}`,
        resultValue: (te * 100).toFixed(4) + " %",
        secondaryLabel: "vs. proportionnel",
        secondaryValue: (r / frequency * 100).toFixed(4) + " %",
      };
    }
    return {};
  }, [capital, rate, years, frequency, mode]);

  const isRate = mode === "calc-prop" || mode === "calc-equiv";

  // Animated chart points
  const points = useMemo(() => {
    const N = 40;
    const arr = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * years;
      const v =
        mode === "calc-linear" ? capital * (1 + (rate / 100) * t)
        : capital * Math.pow(1 + rate / 100, t);
      arr.push({ x: i / N, y: v });
    }
    return arr;
  }, [capital, rate, years, mode]);

  const W = 600, H = 220;
  const minY = capital;
  const maxY = points[points.length - 1].y;
  const range = Math.max(1, maxY - minY);
  const path = points.map((p, i) => {
    const px = p.x * W;
    const py = H - ((p.y - minY) / range) * (H - 20) - 10;
    return `${i === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="bg-[#0f0f0f] rounded-lg border border-white/10 p-6 md:p-8" data-testid={`calc-${fiche.id}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-brand text-xs tracking-[0.3em]" style={{ color: accent }}>ATELIER</div>
          <div className="text-lg font-semibold mt-1">Manipule les chiffres en direct</div>
        </div>
        <div className="text-xs text-[#777] font-mono">{years} ans · {rate.toFixed(2)} %</div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {!isRate && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#aaa]">Capital</span>
                <span className="font-bold" style={{ color: accent }}>{capital.toLocaleString("fr-FR")} €</span>
              </div>
              <input type="range" className="lenny" min={500} max={50000} step={500} value={capital} onChange={(e) => setCapital(Number(e.target.value))} data-testid={`calc-${fiche.id}-capital`} />
            </div>
          )}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#aaa]">Taux annuel</span>
              <span className="font-bold" style={{ color: accent }}>{rate.toFixed(2)} %</span>
            </div>
            <input type="range" className="lenny" min={0.1} max={15} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} data-testid={`calc-${fiche.id}-rate`} />
          </div>
          {!isRate && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#aaa]">Durée</span>
                <span className="font-bold" style={{ color: accent }}>{years} ans</span>
              </div>
              <input type="range" className="lenny" min={1} max={30} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} data-testid={`calc-${fiche.id}-years`} />
            </div>
          )}
          {isRate && (
            <div>
              <div className="text-sm text-[#aaa] mb-2">Fréquence</div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 4, 12, 365].map((f) => (
                  <button key={f} onClick={() => setFrequency(f)} className="py-2 rounded text-xs font-semibold" style={{ background: frequency === f ? accent : "#222", color: frequency === f ? "#000" : "#fff" }}>
                    {f === 2 ? "Sem" : f === 4 ? "Trim" : f === 12 ? "Mois" : "Jour"}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg p-5" style={{ background: `linear-gradient(135deg, ${accent}33, ${accent}11)`, border: `1px solid ${accent}55` }}>
          <div className="text-xs text-[#aaa] uppercase tracking-widest">{resultLabel}</div>
          <div className="text-4xl md:text-5xl font-display-l mt-2" style={{ color: accent }} data-testid={`calc-${fiche.id}-result`}>
            {resultValue}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-xs text-[#aaa] uppercase tracking-widest">{secondaryLabel}</div>
            <div className="text-xl font-semibold mt-1">{secondaryValue}</div>
          </div>
        </div>
      </div>

      {!isRate && (
        <div className="mt-8">
          <div className="text-xs text-[#aaa] uppercase tracking-widest mb-2">Courbe de croissance</div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            <defs>
              <linearGradient id={`grad-${fiche.id}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={`${path} L ${W} ${H} L 0 ${H} Z`}
              fill={`url(#grad-${fiche.id})`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            />
            <motion.path
              d={path} fill="none" stroke={accent} strokeWidth="3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }}
            />
          </svg>
        </div>
      )}
    </div>
  );
};

const SectionBlock = ({ section, accent }) => {
  if (section.type === "example") {
    return (
      <div className="bg-[#0f0f0f] rounded-lg border border-white/10 p-6 md:p-8">
        <h3 className="font-brand text-sm tracking-[0.3em] mb-4" style={{ color: accent }}>{section.title.toUpperCase()}</h3>
        <div className="divide-y divide-white/10">
          {section.steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="py-3 grid grid-cols-3 gap-4 items-baseline"
            >
              <div className="text-xs uppercase tracking-widest text-[#777]">{s.label}</div>
              <div className="col-span-2 font-mono text-lg" style={i === section.steps.length - 1 ? { color: accent, fontWeight: 700 } : {}}>
                {s.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#0f0f0f] rounded-lg border border-white/10 p-6 md:p-8">
      <h3 className="font-brand text-sm tracking-[0.3em] mb-4" style={{ color: accent }}>{section.title.toUpperCase()}</h3>
      {section.formula && (
        <div className="my-4 py-6 text-center font-mono text-3xl md:text-4xl font-bold rounded border border-white/10" style={{ background: `${accent}10`, color: accent }}>
          {section.formula}
        </div>
      )}
      <p className="text-lg text-[#e5e5e5] leading-relaxed">{section.body}</p>
    </div>
  );
};

const Quiz = ({ questions, accent, fid }) => {
  const { saveScore } = useStore();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = Object.entries(answers).reduce((acc, [qi, ci]) => acc + (questions[qi].answer === ci ? 1 : 0), 0);

  const onSubmit = () => {
    setSubmitted(true);
    saveScore(fid, score, questions.length);
  };

  return (
    <div className="bg-[#0f0f0f] rounded-lg border border-white/10 p-6 md:p-8" data-testid={`quiz-${fid}`}>
      <h3 className="font-brand text-sm tracking-[0.3em] mb-4" style={{ color: accent }}>QUIZ · TESTE-TOI</h3>
      <div className="space-y-8">
        {questions.map((q, qi) => (
          <div key={qi}>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-display-l text-3xl" style={{ color: accent }}>0{qi + 1}</span>
              <h4 className="text-lg font-medium">{q.q}</h4>
            </div>
            <div className="grid gap-2">
              {q.choices.map((c, ci) => {
                const sel = answers[qi] === ci;
                const correct = q.answer === ci;
                let bg = "#1a1a1a", color = "#fff", border = "rgba(255,255,255,0.1)";
                if (submitted && correct) { bg = accent; color = "#000"; border = accent; }
                else if (submitted && sel && !correct) { bg = "#3a1a1a"; border = "#E50914"; }
                else if (sel) { bg = "#fff"; color = "#000"; border = "#fff"; }
                return (
                  <button
                    key={ci}
                    onClick={() => !submitted && setAnswers((a) => ({ ...a, [qi]: ci }))}
                    className="text-left px-4 py-3 rounded transition-colors"
                    style={{ background: bg, color, border: `1px solid ${border}` }}
                    data-testid={`quiz-${fid}-q${qi}-c${ci}`}
                  >
                    <span className="opacity-60 mr-2 font-mono text-sm">{String.fromCharCode(65 + ci)}.</span>
                    {c}
                    {submitted && correct && <Check size={16} className="float-right mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={onSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="bg-white text-black px-6 py-2 rounded font-semibold disabled:opacity-30"
            data-testid={`quiz-${fid}-submit`}
          >
            Valider
          </button>
        ) : (
          <>
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-[#aaa]">Score</span>
              <span className="font-display-l text-4xl" style={{ color: accent }}>{score}/{questions.length}</span>
            </div>
            <button
              onClick={() => { setAnswers({}); setSubmitted(false); }}
              className="flex items-center gap-2 px-4 py-2 rounded border border-white/20 hover:border-white"
              data-testid={`quiz-${fid}-reset`}
            >
              <RotateCcw size={14} /> Recommencer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const FlashCards = ({ memos, accent, fid }) => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = memos[idx];
  const next = () => { setFlipped(false); setTimeout(() => setIdx((i) => (i + 1) % memos.length), 200); };
  const prev = () => { setFlipped(false); setTimeout(() => setIdx((i) => (i - 1 + memos.length) % memos.length), 200); };

  return (
    <div className="bg-[#0f0f0f] rounded-lg border border-white/10 p-6 md:p-8" data-testid={`memos-${fid}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-brand text-sm tracking-[0.3em]" style={{ color: accent }}>MÉMOS · CLIQUE POUR RETOURNER</h3>
        <span className="text-xs text-[#777] font-mono">{idx + 1} / {memos.length}</span>
      </div>
      <div className="card-3d w-full max-w-md mx-auto aspect-[5/3] cursor-pointer" onClick={() => setFlipped((f) => !f)} data-testid={`memos-${fid}-flip`}>
        <div className={`card-3d-inner relative w-full h-full ${flipped ? "flipped" : ""}`}>
          <div className="card-face absolute inset-0 rounded-lg flex flex-col items-center justify-center p-6 text-center" style={{ background: "#1a1a1a", border: `1px solid ${accent}33` }}>
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: accent }}>Question</div>
            <div className="text-2xl md:text-3xl font-light">{card.front}</div>
          </div>
          <div className="card-back card-face absolute inset-0 rounded-lg flex flex-col items-center justify-center p-6 text-center" style={{ background: accent, color: "#000" }}>
            <div className="text-xs uppercase tracking-widest mb-3">Réponse</div>
            <div className="text-2xl md:text-3xl font-bold">{card.back}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-center mt-6">
        <button onClick={prev} className="px-4 py-2 rounded border border-white/20 hover:border-white text-sm" data-testid={`memos-${fid}-prev`}>← Préc.</button>
        <button onClick={() => setFlipped((f) => !f)} className="px-4 py-2 rounded border border-white/20 hover:border-white text-sm">Retourner</button>
        <button onClick={next} className="px-4 py-2 rounded border border-white/20 hover:border-white text-sm" data-testid={`memos-${fid}-next`}>Suiv. →</button>
      </div>
    </div>
  );
};

export const StudyView = ({ fiche, onClose }) => {
  const { markStarted, markCompleted } = useStore();
  useEffect(() => {
    if (fiche) markStarted(fiche.id);
  }, [fiche, markStarted]);

  const handleClose = () => {
    if (fiche) markCompleted(fiche.id);
    onClose();
  };

  if (!fiche) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-black overflow-y-auto"
        data-testid="study-view"
      >
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-gradient-to-b from-black/95 to-transparent px-4 md:px-12 py-4 flex items-center justify-between">
          <button onClick={handleClose} className="flex items-center gap-2 text-white hover:text-gray-300" data-testid="study-back">
            <ChevronLeft size={22} /> <span className="text-sm">Retour</span>
          </button>
          <div className="text-xs font-brand tracking-[0.3em]" style={{ color: fiche.accent }}>L · {fiche.year}</div>
        </div>

        {/* Hero of study */}
        <div className="relative h-[50vh] min-h-[300px] -mt-16">
          <Thumb fiche={fiche} className="!h-full" />
          <div className="absolute inset-0 hero-fade-bottom" />
          <div className="absolute bottom-8 left-4 md:left-12 right-4 md:right-12 max-w-3xl">
            <div className="font-brand text-xs tracking-[0.3em] mb-2" style={{ color: fiche.accent }}>L · ORIGINAL</div>
            <h1 className="font-display-l text-4xl md:text-6xl leading-none mb-3">{fiche.title}</h1>
            <p className="text-lg md:text-xl italic text-[#e5e5e5] font-light">« {fiche.tagline} »</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-12 lg:px-24 py-12 max-w-5xl mx-auto space-y-6">
          {/* Synopsis */}
          <div className="border-l-4 pl-5 py-2" style={{ borderColor: fiche.accent }}>
            <div className="text-xs uppercase tracking-widest text-[#777] mb-2">Synopsis</div>
            <p className="text-xl text-[#e5e5e5] leading-relaxed">{fiche.synopsis}</p>
          </div>

          {/* Episodes */}
          {fiche.sections.map((s) => (
            <SectionBlock key={s.id} section={s} accent={fiche.accent} />
          ))}

          {/* Interactive calculator if applicable */}
          {fiche.interactive && (
            <LiveCalculator mode={fiche.interactive} accent={fiche.accent} fiche={fiche} />
          )}

          {/* Quiz */}
          <Quiz questions={fiche.quiz} accent={fiche.accent} fid={fiche.id} />

          {/* Memos */}
          <FlashCards memos={fiche.memos} accent={fiche.accent} fid={fiche.id} />

          <div className="pt-8 pb-16 text-center">
            <div className="font-brand text-xs tracking-[0.3em] text-[#555] mb-2">FIN DE L'ÉPISODE</div>
            <button onClick={onClose} className="text-white/70 hover:text-white text-sm underline">Retour au catalogue</button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
