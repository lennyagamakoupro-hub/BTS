import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, ChevronDown } from "lucide-react";

export const NavBar = ({ onSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{ background: scrolled ? "rgba(0,0,0,0.92)" : "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }}
      data-testid="nav-bar"
    >
      <div className="px-4 md:px-12 h-16 md:h-[68px] flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 md:gap-8">
          <a href="#top" className="lenny-logo text-3xl md:text-4xl leading-none" data-testid="nav-logo">
            LENNY
          </a>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <a href="#top" className="text-white hover:text-gray-300 transition-colors" data-testid="nav-accueil">Accueil</a>
            <a href="#row-finance" className="text-[#e5e5e5] hover:text-gray-400 transition-colors">Finance</a>
            <a href="#row-droit" className="text-[#e5e5e5] hover:text-gray-400 transition-colors">Droit</a>
            <a href="#row-transaction" className="text-[#e5e5e5] hover:text-gray-400 transition-colors">Transaction</a>
            <a href="#row-gestion" className="text-[#e5e5e5] hover:text-gray-400 transition-colors">Gestion</a>
            <a href="#row-habitat" className="text-[#e5e5e5] hover:text-gray-400 transition-colors">Habitat</a>
            <a href="#row-top10" className="text-[#e5e5e5] hover:text-gray-400 transition-colors flex items-center gap-1">
              Catégories <ChevronDown size={14} />
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4 md:gap-5">
          <div className="flex items-center" data-testid="nav-search">
            {searchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                className="flex items-center bg-black/80 border border-white/40 px-3 py-1.5"
              >
                <Search size={16} className="mr-2 text-white" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => { setQ(e.target.value); onSearch?.(e.target.value); }}
                  onBlur={() => { if (!q) setSearchOpen(false); }}
                  placeholder="Fiches, thèmes, lois…"
                  className="bg-transparent outline-none text-sm text-white w-full"
                  data-testid="nav-search-input"
                />
              </motion.div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-white hover:text-gray-300" data-testid="nav-search-btn">
                <Search size={20} />
              </button>
            )}
          </div>
          <button className="text-white hover:text-gray-300 hidden md:inline-flex">
            <Bell size={20} />
          </button>
          <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-xs font-bold cursor-pointer" data-testid="nav-profile">
            LN
          </div>
        </div>
      </div>
    </header>
  );
};
