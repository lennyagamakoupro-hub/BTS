import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cover, TableOfContents } from "./components/Cover";
import { Chapter } from "./components/Chapter";
import { Nav } from "./components/Nav";
import { Colophon } from "./components/Colophon";
import { Marquee } from "./components/Marquee";
import { CHAPTERS } from "./data/chapters";

const Magazine = () => {
  return (
    <div className="App paper-grain" id="top">
      <Nav />
      <Cover />

      <Marquee
        items={[
          "Maths financières · BTS",
          "Édition Éditoriale",
          "Quatre dossiers",
          "Curseurs · Courbes · Cartes",
          "Aucune IA visible",
        ]}
        accent="#F4F0EB"
      />

      <TableOfContents />

      {CHAPTERS.map((ch, i) => (
        <Chapter key={ch.id} chapter={ch} index={i} />
      ))}

      <Colophon />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Magazine />} />
        <Route path="*" element={<Magazine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
