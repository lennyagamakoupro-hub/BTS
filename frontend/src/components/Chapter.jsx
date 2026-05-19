import React from "react";
import { motion } from "framer-motion";
import { Formula } from "./Formula";
import { Calculator } from "./Calculator";
import { FlashCards } from "./FlashCards";
import { Quiz } from "./Quiz";

const IMG_MAP = {
  ch1: "https://static.prod-images.emergentagent.com/jobs/96c7e974-2142-42d0-abc3-a98c4a1da670/images/36935f147862332a8959496c5024b3e37da1d27dcf21effd6541020ff138ac75.png",
  ch2: "https://static.prod-images.emergentagent.com/jobs/96c7e974-2142-42d0-abc3-a98c4a1da670/images/00dbdcbe20d9309db90812a4635075902710b1ac8e5f07ee0d1eeddc3ce945b0.png",
  ch3: "https://static.prod-images.emergentagent.com/jobs/96c7e974-2142-42d0-abc3-a98c4a1da670/images/d2452379b2a9a5d3b1153310bcb6078e19c0ad5a6749b309f1e243cf20a7b87f.png",
  ch4: "https://static.prod-images.emergentagent.com/jobs/96c7e974-2142-42d0-abc3-a98c4a1da670/images/85dea29e662a6b9a4fbe58759ca28942eb1138536419c9e9a040216f9c2b4e19.png",
};

export const Chapter = ({ chapter, index }) => {
  const img = IMG_MAP[chapter.id];

  return (
    <section
      id={chapter.id}
      className="border-b-2 relative"
      style={{ borderColor: "#1C1C1A" }}
      data-testid={`chapter-${chapter.id}`}
    >
      {/* HEADER STRIP */}
      <div
        className="border-b-2 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[10px] md:text-xs uppercase tracking-widest"
        style={{ borderColor: "#1C1C1A", background: chapter.accent }}
      >
        <span className="text-[#1C1C1A] font-bold">{chapter.kicker}</span>
        <span className="text-[#1C1C1A] opacity-80">Page {String((index + 1) * 12).padStart(2, "0")}</span>
      </div>

      {/* OPENING SPREAD */}
      <div className="grid md:grid-cols-12 relative">
        {/* GIANT NUMBER */}
        <div className="md:col-span-12 px-6 md:px-12 pt-16 md:pt-24 pb-8 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display font-black leading-[0.78] tracking-tighter uppercase select-none"
            style={{
              fontSize: "clamp(5rem, 22vw, 22rem)",
              color: chapter.accent,
              WebkitTextStroke: "0px",
            }}
          >
            {chapter.number}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display font-black leading-[0.82] tracking-tighter uppercase mt-2"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            {chapter.title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span className="italic font-serif-ed font-bold normal-case">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* DECK + IMAGE */}
        <div className="md:col-span-7 px-6 md:px-12 pb-16 border-b-2 md:border-b-0 md:border-r-2" style={{ borderColor: "#1C1C1A" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif-ed text-xl md:text-3xl italic leading-snug max-w-2xl"
          >
            {chapter.deck}
          </motion.p>

          <div className="mt-12 grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-60">
                Le récit
              </div>
              <p className="dropcap font-serif-ed text-lg md:text-xl leading-relaxed text-[#1C1C1A]">
                {chapter.body[0]}
              </p>
              <p className="font-serif-ed text-lg md:text-xl leading-relaxed mt-6">
                {chapter.body[1]}
              </p>
            </div>
            <aside className="md:col-span-5">
              <div className="border-l-2 pl-5 py-2 sticky top-24" style={{ borderColor: chapter.accent, borderLeftWidth: "4px" }}>
                <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: chapter.accent }}>
                  En marge
                </div>
                <div className="font-display font-black text-sm uppercase tracking-tight mb-2">
                  La métaphore — {chapter.metaphor}
                </div>
                <p className="font-serif-ed italic text-base leading-snug">
                  {chapter.metaphorText}
                </p>
              </div>
            </aside>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <motion.img
            src={img}
            alt={chapter.metaphor}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover min-h-[400px] md:min-h-[600px] md:sticky md:top-0"
            style={{ background: chapter.accent }}
          />
          <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] uppercase tracking-widest bg-[var(--paper)] border-2 px-3 py-2 flex justify-between" style={{ borderColor: "#1C1C1A" }}>
            <span>Fig. {chapter.number}.A</span>
            <span>{chapter.metaphor}</span>
          </div>
        </div>
      </div>

      {/* PULL QUOTE */}
      <div
        className="border-t-2 px-6 md:px-16 py-16 md:py-24 grid md:grid-cols-12 gap-6 items-center"
        style={{ borderColor: "#1C1C1A", background: "#1C1C1A", color: "var(--paper)" }}
      >
        <div className="md:col-span-2 font-mono text-[10px] uppercase tracking-widest opacity-60">
          Citation — page {String((index + 1) * 12 + 4).padStart(2, "0")}
        </div>
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-10 font-serif-ed italic text-3xl md:text-6xl leading-[1.05]"
        >
          <span style={{ color: chapter.accent }}>“</span>
          {chapter.pullQuote}
          <span style={{ color: chapter.accent }}>”</span>
        </motion.blockquote>
      </div>

      {/* FORMULA + EXAMPLE */}
      <div className="px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-60">§ 01 — Le squelette</div>
          <h3 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight leading-none mb-6">
            La formule.
          </h3>
          <Formula formula={chapter.formula} accent={chapter.accent} />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-60">§ 02 — En action</div>
          <h3 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight leading-none mb-6">
            <span className="italic font-serif-ed normal-case">{chapter.example.title}.</span>
          </h3>
          <div className="border-2" style={{ borderColor: "#1C1C1A" }}>
            {chapter.example.steps.map((step, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: si * 0.12 }}
                className={`grid grid-cols-12 ${si < chapter.example.steps.length - 1 ? "border-b-2" : ""}`}
                style={{ borderColor: "#1C1C1A" }}
              >
                <div className="col-span-3 md:col-span-3 border-r-2 px-3 py-4 font-mono text-[10px] uppercase tracking-widest flex items-center" style={{ borderColor: "#1C1C1A", background: si === chapter.example.steps.length - 1 ? chapter.accent : "transparent" }}>
                  {step.label}
                </div>
                <div className="col-span-9 md:col-span-9 px-4 py-4 font-mono text-base md:text-lg">
                  {step.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CALCULATOR */}
      <div className="border-t-2 px-6 md:px-12 py-16 md:py-24" style={{ borderColor: "#1C1C1A" }}>
        <div className="grid md:grid-cols-12 gap-6 mb-10 items-end">
          <div className="md:col-span-9">
            <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-60">§ 03 — Manipule</div>
            <h3 className="font-display font-black text-3xl md:text-6xl uppercase tracking-tight leading-none">
              Joue avec les <span className="italic font-serif-ed normal-case" style={{ color: chapter.accent }}>chiffres</span>.
            </h3>
          </div>
          <p className="md:col-span-3 font-serif-ed italic text-base md:text-lg leading-snug">
            Tire les curseurs. La courbe et le résultat se mettent à jour en direct.
          </p>
        </div>
        <Calculator mode={chapter.graphMode} accent={chapter.accent} chapterId={chapter.id} />
      </div>

      {/* KEY POINT */}
      <div className="border-t-2 px-6 md:px-12 py-12 grid md:grid-cols-12 gap-6 items-center" style={{ borderColor: "#1C1C1A", background: "var(--paper-alt)" }}>
        <div className="md:col-span-2 font-display font-black text-5xl md:text-7xl leading-none" style={{ color: chapter.accent }}>
          !
        </div>
        <div className="md:col-span-10">
          <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-60">Point clé — application réelle</div>
          <p className="font-serif-ed italic text-xl md:text-3xl leading-snug">{chapter.keyPoint}</p>
        </div>
      </div>

      {/* QUIZ + FLASHCARDS */}
      <div className="border-t-2 px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-2 gap-8" style={{ borderColor: "#1C1C1A" }}>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-60">§ 04 — Teste-toi</div>
          <h3 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight leading-none mb-6">
            Quiz.
          </h3>
          <Quiz questions={chapter.quiz} accent={chapter.accent} chapterId={chapter.id} />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-60">§ 05 — Mémorise</div>
          <h3 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight leading-none mb-6">
            <span className="italic font-serif-ed normal-case">Cartes</span>.
          </h3>
          <FlashCards cards={chapter.flashcards} accent={chapter.accent} chapterId={chapter.id} />
        </div>
      </div>
    </section>
  );
};
