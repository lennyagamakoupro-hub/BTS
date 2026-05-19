import React from "react";

export const Footer = () => {
  return (
    <footer className="px-4 md:px-12 py-12 text-[#777] text-sm border-t border-white/5 mt-12" data-testid="footer">
      <div className="lenny-logo text-2xl mb-4">LENNY</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-8">
        <a href="#" className="hover:underline">À propos</a>
        <a href="#" className="hover:underline">FAQ révision</a>
        <a href="#" className="hover:underline">Centre d'aide</a>
        <a href="#" className="hover:underline">Conditions</a>
        <a href="#" className="hover:underline">Confidentialité</a>
        <a href="#" className="hover:underline">Crédits</a>
        <a href="#" className="hover:underline">Préférences cookies</a>
        <a href="#" className="hover:underline">Nous contacter</a>
      </div>
      <div className="text-xs">
        © {new Date().getFullYear()} LENNY · La plateforme de révision BTS Professions Immobilières.
      </div>
    </footer>
  );
};
