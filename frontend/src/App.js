import React, { useMemo, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Hero, Thumb } from "./components/Hero";
import { Row } from "./components/Row";
import { DetailOverlay } from "./components/DetailOverlay";
import { StudyView } from "./components/StudyView";
import { Footer } from "./components/Footer";
import { FICHES, ROWS, getFiche } from "./data/lenny";

const Browse = () => {
  const [detailFiche, setDetailFiche] = useState(null);
  const [playingFiche, setPlayingFiche] = useState(null);
  const [query, setQuery] = useState("");

  const featured = useMemo(() => FICHES.find((f) => f.featured) || FICHES[0], []);

  const handlePlay = (f) => { setDetailFiche(null); setPlayingFiche(f); window.scrollTo(0, 0); };
  const handleInfo = (f) => setDetailFiche(f);
  const handleCloseDetail = (next) => {
    setDetailFiche(null);
    if (next && next.id) setTimeout(() => setDetailFiche(next), 100);
  };

  // search filter
  const searched = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return FICHES.filter(
      (f) => f.title.toLowerCase().includes(q) || f.tagline.toLowerCase().includes(q) || f.tags.some((t) => t.toLowerCase().includes(q)) || f.synopsis.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="App" id="top">
      <NavBar onSearch={setQuery} />

      {!searched && (
        <>
          <Hero fiche={featured} onPlay={handlePlay} onInfo={handleInfo} />

          <div className="relative -mt-24 z-10 space-y-2 md:space-y-4 pb-12">
            {ROWS.map((row) => {
              const list = row.ids.map(getFiche).filter(Boolean);
              return (
                <Row
                  key={row.id}
                  row={row}
                  fiches={list}
                  onPlay={handlePlay}
                  onInfo={handleInfo}
                  isTop10={row.id === "top10"}
                />
              );
            })}
          </div>
        </>
      )}

      {searched && (
        <div className="pt-24 px-4 md:px-12 pb-12">
          <div className="text-sm text-[#aaa] mb-4">Résultats pour « {query} » — {searched.length} fiche{searched.length > 1 ? "s" : ""}</div>
          {searched.length === 0 ? (
            <div className="text-center py-24 text-[#777]">Aucune fiche ne correspond.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {searched.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleInfo(f)}
                  className="text-left bg-[#181818] rounded overflow-hidden hover:bg-[#222]"
                  data-testid={`search-result-${f.id}`}
                >
                  <div className="relative h-40">
                    <Thumb fiche={f} />
                    <div className="absolute top-2 left-2 font-brand text-[10px] tracking-widest px-1.5 py-0.5" style={{ background: f.accent, color: "#000" }}>
                      L · ORIGINAL
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-semibold text-sm mb-1">{f.title}</div>
                    <div className="text-xs text-[#aaa]">{f.tagline}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Footer />

      <DetailOverlay fiche={detailFiche} onClose={handleCloseDetail} onPlay={handlePlay} />
      <StudyView fiche={playingFiche} onClose={() => setPlayingFiche(null)} />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="*" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
