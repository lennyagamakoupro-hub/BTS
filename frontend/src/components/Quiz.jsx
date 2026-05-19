import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Quiz = ({ questions, accent, chapterId }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const select = (qi, ci) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qi]: ci }));
  };

  const score = Object.entries(answers).reduce(
    (acc, [qi, ci]) => acc + (questions[qi].answer === ci ? 1 : 0),
    0
  );

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="border-2 bg-[var(--paper)]" style={{ borderColor: "#1C1C1A" }} data-testid={`quiz-${chapterId}`}>
      <div className="px-4 py-2 border-b-2 flex items-center justify-between" style={{ borderColor: "#1C1C1A" }}>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold">
          Quiz — Auto-évaluation
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
          3 questions
        </span>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        {questions.map((q, qi) => (
          <div key={qi}>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-display font-black text-3xl md:text-4xl leading-none" style={{ color: accent }}>
                {String(qi + 1).padStart(2, "0")}
              </span>
              <h4 className="font-serif-ed italic text-lg md:text-2xl leading-snug">{q.q}</h4>
            </div>
            <div className="grid gap-2">
              {q.choices.map((c, ci) => {
                const isSelected = answers[qi] === ci;
                const isCorrect = q.answer === ci;
                const showState = submitted;
                let bg = "transparent";
                let color = "#1C1C1A";
                let border = "#1C1C1A";

                if (showState && isCorrect) {
                  bg = accent;
                } else if (showState && isSelected && !isCorrect) {
                  bg = "#1C1C1A";
                  color = "var(--paper)";
                } else if (isSelected && !showState) {
                  bg = "#1C1C1A";
                  color = "var(--paper)";
                }

                return (
                  <button
                    key={ci}
                    onClick={() => select(qi, ci)}
                    className="border-2 px-4 py-3 text-left font-mono text-sm transition-colors"
                    style={{ background: bg, color, borderColor: border }}
                    data-testid={`quiz-${chapterId}-q${qi}-c${ci}`}
                  >
                    <span className="opacity-60 mr-3">{String.fromCharCode(65 + ci)}.</span>
                    {c}
                    {showState && isCorrect && <span className="float-right">✓</span>}
                    {showState && isSelected && !isCorrect && <span className="float-right">✗</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="border-t-2 pt-6 flex flex-wrap items-center justify-between gap-4" style={{ borderColor: "#1C1C1A" }}>
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < questions.length}
              className="border-2 px-6 py-3 font-mono text-xs uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1C1C1A] hover:text-[var(--paper)] transition-colors"
              style={{ borderColor: "#1C1C1A" }}
              data-testid={`quiz-submit-${chapterId}`}
            >
              valider →
            </button>
          ) : (
            <>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest">Score</span>
                <span className="font-display font-black text-5xl leading-none" style={{ color: accent }}>
                  {score}/{questions.length}
                </span>
              </div>
              <button
                onClick={reset}
                className="border-2 px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#1C1C1A] hover:text-[var(--paper)] transition-colors"
                style={{ borderColor: "#1C1C1A" }}
                data-testid={`quiz-reset-${chapterId}`}
              >
                recommencer ↻
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
