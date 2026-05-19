import React from "react";
import { motion } from "framer-motion";
import { Marquee } from "./Marquee";

export const Colophon = () => {
  return (
    <footer data-testid="colophon">
      <Marquee
        items={["Fin du numéro", "Quatre dossiers · Quatre vérités", "Maths financières", "Édition Comic → Éditorial"]}
        accent="#1C1C1A"
      />
      <div className="px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-12 gap-8 border-b-2" style={{ borderColor: "#1C1C1A" }}>
        <div className="md:col-span-7">
          <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-60">Colophon</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-black uppercase leading-[0.85] tracking-tighter text-[clamp(2.5rem,8vw,7rem)]"
          >
            Un numéro,
            <br />
            <span className="italic font-serif-ed normal-case">tu sais tout</span>.
          </motion.h2>
          <p className="font-serif-ed italic text-xl md:text-2xl leading-snug mt-8 max-w-2xl">
            Tu as parcouru les quatre piliers des maths financières du BTS. La fontaine, la boule de neige, la pizza, la balance. Quatre images pour ne plus jamais confondre.
          </p>
        </div>
        <div className="md:col-span-5 border-l-2 pl-6 md:pl-10" style={{ borderColor: "#1C1C1A" }}>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-60">À retenir</div>
          <ul className="space-y-3 font-serif-ed text-lg leading-snug">
            <li><span className="font-display font-black mr-2" style={{ color: "#0055FF" }}>01.</span> Intérêts simples → linéaire, sur capital initial.</li>
            <li><span className="font-display font-black mr-2" style={{ color: "#FF4400" }}>02.</span> Intérêts composés → exponentielle, le temps fait tout.</li>
            <li><span className="font-display font-black mr-2" style={{ color: "#FF00AA" }}>03.</span> Taux proportionnel → division — exact en simple.</li>
            <li><span className="font-display font-black mr-2" style={{ color: "#CCFF00" }}>04.</span> Taux équivalent → racine — exact en composé.</li>
          </ul>
        </div>
      </div>

      <div className="px-6 md:px-12 py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest">
        <span>© Magazine MF · {new Date().getFullYear()}</span>
        <span>Direction artistique · brutaliste éditorial</span>
        <span>Tirage limité · BTS 1<sup>re</sup> année</span>
      </div>
    </footer>
  );
};
