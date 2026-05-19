import React, { useState, useMemo } from "react";
import { Graph } from "./Graph";

// Interactive calculator. Behavior changes per chapter mode.
export const Calculator = ({ mode, accent, chapterId }) => {
  const [capital, setCapital] = useState(5000);
  const [rate, setRate] = useState(4); // %
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(12);

  const { result, secondary, label, secondaryLabel } = useMemo(() => {
    const r = rate / 100;
    if (mode === "linear") {
      const interest = capital * r * years;
      return {
        result: capital + interest,
        secondary: interest,
        label: "Capital final",
        secondaryLabel: "Intérêts gagnés",
      };
    }
    if (mode === "exponential") {
      const final = capital * Math.pow(1 + r, years);
      const simple = capital * (1 + r * years);
      return {
        result: final,
        secondary: final - simple,
        label: "Capital final (composé)",
        secondaryLabel: "Gain vs. intérêts simples",
      };
    }
    if (mode === "proportional") {
      const tp = r / frequency;
      const annualEquiv = Math.pow(1 + tp, frequency) - 1;
      return {
        result: tp * 100,
        secondary: annualEquiv * 100,
        label: `Taux proportionnel / ${frequency} périodes`,
        secondaryLabel: "Rendement réel sur l'année",
      };
    }
    if (mode === "equivalent") {
      const te = Math.pow(1 + r, 1 / frequency) - 1;
      const proportional = r / frequency;
      return {
        result: te * 100,
        secondary: proportional * 100,
        label: `Taux équivalent / ${frequency} périodes`,
        secondaryLabel: "Taux proportionnel équivalent",
      };
    }
  }, [capital, rate, years, frequency, mode]);

  const isRateMode = mode === "proportional" || mode === "equivalent";

  return (
    <div className="border-2 bg-[var(--paper)]" style={{ borderColor: "#1C1C1A" }} data-testid={`calculator-${chapterId}`}>
      <div className="px-4 py-2 border-b-2 flex items-center justify-between" style={{ background: "#1C1C1A", borderColor: "#1C1C1A" }}>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-[var(--paper)]">
          Atelier — calcule en direct
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--paper)] opacity-70">
          v.2.6
        </span>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Controls */}
        <div className="p-6 md:p-8 border-r-2 space-y-6" style={{ borderColor: "#1C1C1A" }}>
          {!isRateMode && (
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="font-mono text-[10px] uppercase tracking-widest">Capital (€)</label>
                <span className="font-mono text-lg font-bold" style={{ color: accent }}>
                  {capital.toLocaleString("fr-FR")}
                </span>
              </div>
              <input
                type="range"
                className="brutal"
                min={500}
                max={50000}
                step={500}
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                data-testid={`slider-capital-${chapterId}`}
              />
            </div>
          )}

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="font-mono text-[10px] uppercase tracking-widest">Taux annuel (%)</label>
              <span className="font-mono text-lg font-bold" style={{ color: accent }}>
                {rate.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              className="brutal"
              min={0.1}
              max={15}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              data-testid={`slider-rate-${chapterId}`}
            />
          </div>

          {!isRateMode && (
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="font-mono text-[10px] uppercase tracking-widest">Durée (années)</label>
                <span className="font-mono text-lg font-bold" style={{ color: accent }}>
                  {years} a
                </span>
              </div>
              <input
                type="range"
                className="brutal"
                min={1}
                max={30}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                data-testid={`slider-years-${chapterId}`}
              />
            </div>
          )}

          {isRateMode && (
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="font-mono text-[10px] uppercase tracking-widest">Fréquence / an</label>
                <span className="font-mono text-lg font-bold" style={{ color: accent }}>
                  {frequency}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 4, 12, 365].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className="border-2 py-2 font-mono text-xs uppercase tracking-widest transition-colors"
                    style={{
                      borderColor: "#1C1C1A",
                      background: frequency === f ? "#1C1C1A" : "transparent",
                      color: frequency === f ? "var(--paper)" : "#1C1C1A",
                    }}
                    data-testid={`freq-${chapterId}-${f}`}
                  >
                    {f === 2 ? "Sem" : f === 4 ? "Trim" : f === 12 ? "Mois" : "Jour"}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="p-6 md:p-8" style={{ background: accent }}>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-2 text-[#1C1C1A]">
            {label}
          </div>
          <div className="font-display font-black text-5xl md:text-6xl leading-none tracking-tighter text-[#1C1C1A]" data-testid={`result-${chapterId}`}>
            {isRateMode
              ? result.toFixed(4) + " %"
              : Math.round(result).toLocaleString("fr-FR") + " €"}
          </div>
          <div className="mt-6 pt-6 border-t-2 border-[#1C1C1A]">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#1C1C1A] opacity-80 mb-1">
              {secondaryLabel}
            </div>
            <div className="font-mono font-bold text-2xl text-[#1C1C1A]">
              {isRateMode
                ? secondary.toFixed(4) + " %"
                : Math.round(secondary).toLocaleString("fr-FR") + " €"}
            </div>
          </div>
        </div>
      </div>

      {!isRateMode && (
        <div className="border-t-2" style={{ borderColor: "#1C1C1A" }}>
          <Graph mode={mode} accent={accent} capital={capital} rate={rate / 100} years={years} />
        </div>
      )}
    </div>
  );
};
