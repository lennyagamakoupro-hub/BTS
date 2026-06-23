/* ============================================================
   ep01-app.jsx — montage FOOT : Stage + scènes + sous-titres
   Cast 100% fictif (club "Paris Capitale Immobilier").
   ============================================================ */

const DUR = 308; // durée totale (s) ≈ 5:08

// fenêtres de scènes [start, end]
const SCENES = [
  { c: ColdOpenFoot,      s: 0,   e: 18,  lab: "" },
  { c: TitleFoot,         s: 18,  e: 36,  lab: "" },
  { c: AilierContext,     s: 36,  e: 72,  lab: "" },
  { c: TacticalMap,       s: 72,  e: 94,  lab: "TACTIQUE" },
  { c: Chapter4x20,       s: 94,  e: 132, lab: "CH.1 · 4×20" },
  { c: ChapterSoncas,     s: 132, e: 174, lab: "CH.2 · SONCAS" },
  { c: ChapterQuestions,  s: 174, e: 218, lab: "CH.3 · QUESTIONS" },
  { c: CartonRougeScene,  s: 218, e: 236, lab: "CARTON ROUGE" },
  { c: ConsigneCapitaine, s: 236, e: 270, lab: "VESTIAIRE" },
  { c: QuestionArbitre,   s: 270, e: 296, lab: "ARBITRE" },
  { c: OutroFoot,         s: 296, e: 308, lab: "" },
];

// Voix-off / sous-titres (mot pour mot, ton jeune + argot foot)
const CUES = [
  // — COLD OPEN
  { s: 0.8,  e: 4.4,  t: "Un client pousse la porte du vestiaire — pardon, de l'agence." },
  { s: 4.6,  e: 8.2,  t: "Et déjà, son cerveau te scanne. Comme un défenseur lit l'ailier." },
  { s: 8.4,  e: 11.6, t: "Sept secondes. C'est tout ce qu'il lui faut pour décider." },
  { s: 11.7, e: 14.6, t: "Et là… Lenny n'a même pas levé les yeux de son téléphone." },
  { s: 14.7, e: 17.7, t: "Coup de sifflet. Première impression : but encaissé." },
  // — TITRE
  { s: 19.4, e: 22.6, t: "Bienvenue dans LENNY." },
  { s: 22.8, e: 26.8, t: "Module 1 : La Première Impression." },
  { s: 27.0, e: 31.2, t: "Avec l'ailier Téo : lire ton client comme on lit un défenseur." },
  { s: 31.4, e: 35.4, t: "Gagner — ou perdre — un client en vingt secondes." },
  // — INTRO AILIER
  { s: 36.6, e: 41.0, t: "Mon premier match pro, j'ai raté ma première touche.", who: "L'AILIER « TÉO »", color: MOD },
  { s: 41.2, e: 45.6, t: "Mon premier client ? Pareil. Je lui ai parlé sans le regarder.", who: "L'AILIER « TÉO »", color: MOD },
  { s: 46.0, e: 50.0, t: "Sur le terrain, le défenseur te jauge en une fraction de seconde." },
  { s: 50.2, e: 54.2, t: "En agence c'est pareil : le client te lit avant même que tu parles." },
  { s: 54.4, e: 58.4, t: "Posture, regard, énergie — tout est déjà un message." },
  { s: 58.6, e: 62.8, t: "Sept secondes pour lire le défenseur." },
  { s: 63.0, e: 67.0, t: "Sept secondes pour convaincre le client. Même horloge." },
  { s: 67.2, e: 71.4, t: "Alors on va t'apprendre à gagner ces sept secondes-là." },
  // — MAPPING TACTIQUE
  { s: 72.6, e: 76.4, t: "D'abord, parle la langue du match." },
  { s: 76.6, e: 81.0, t: "La zone de presse, c'est ton accueil. Lire le défenseur, c'est lire le client." },
  { s: 81.2, e: 85.4, t: "Un but marqué, c'est un client convaincu. Un but encaissé, une vente ratée." },
  { s: 85.6, e: 89.6, t: "Le carton rouge, c'est la faute grave. Le corner, une opportunité — une pige." },
  { s: 89.8, e: 93.4, t: "Même terrain, d'autres mots. Maintenant, la technique." },
  // — CH.1 · 4×20
  { s: 94.4,  e: 98.0,  t: "La base de tout : la règle des 4 fois 20." },
  { s: 98.2,  e: 101.8, t: "20 premières secondes : ton impression se fige." },
  { s: 102.0, e: 105.8, t: "20 premiers gestes : posture droite, poignée franche." },
  { s: 106.0, e: 109.8, t: "20 premiers mots : une phrase claire, ton prénom, un sourire." },
  { s: 110.0, e: 114.0, t: "Et 20 centimètres : la bonne distance, sans envahir sa bulle." },
  { s: 114.2, e: 119.0, t: "Soigne ces quatre-là, et le client se détend tout de suite." },
  { s: 119.6, e: 124.2, t: "Parce qu'une première impression…" },
  { s: 124.4, e: 131.0, t: "…tu ne la marques jamais deux fois." },
  // — CH.2 · SONCAS·E
  { s: 132.4, e: 136.2, t: "Maintenant, décode ce que veut vraiment ton client." },
  { s: 136.4, e: 139.8, t: "Un moyen mnémo en or : SONCAS·E." },
  { s: 140.0, e: 143.4, t: "Sécurité. Orgueil. Nouveauté." },
  { s: 143.6, e: 147.0, t: "Confort. Argent." },
  { s: 147.2, e: 150.8, t: "Sympathie — le feeling. Et ce feeling, c'est toi." },
  { s: 151.0, e: 154.6, t: "Écologie : le DPE devient un vrai argument de vente." },
  { s: 154.8, e: 159.0, t: "Sept leviers. Ton client n'en a souvent qu'un ou deux." },
  { s: 159.2, e: 163.4, t: "Trouve le bon, et tu parles enfin son langage." },
  { s: 163.8, e: 168.2, t: "Chaque client a un bouton…" },
  { s: 168.4, e: 173.6, t: "…ton job, c'est de le trouver." },
  // — CH.3 · QUESTIONS + DIVAS
  { s: 174.4, e: 178.0, t: "Pour le comprendre, pose les bonnes questions." },
  { s: 178.0, e: 182.0, t: "Ouverte : tu le fais parler librement." },
  { s: 182.0, e: 186.0, t: "Fermée : tu tranches, tu valides, tu avances." },
  { s: 186.0, e: 190.0, t: "Approfondissement : « c'est-à-dire ? » pour creuser." },
  { s: 190.0, e: 194.0, t: "Miroir : tu répètes son mot pour le relancer." },
  { s: 194.0, e: 198.4, t: "Inductrice : tu orientes en douceur vers une piste." },
  { s: 199.0, e: 203.8, t: "Et surtout : ce n'est pas seulement ce que tu dis…" },
  { s: 204.0, e: 208.0, t: "…c'est comment tu le dis. Pense DIVAS." },
  { s: 208.2, e: 212.4, t: "Débit, Intonation, Volume, Articulation…" },
  { s: 212.6, e: 217.6, t: "…et Sourire. Il s'entend, même au téléphone." },
  // — CARTON ROUGE
  { s: 218.4, e: 221.0, t: "Le piège du débutant ? Parler de toi avant d'écouter." },
  { s: 221.2, e: 224.0, t: "Rejoue la scène : regard, sourire, prénom… But marqué !", color: C.green },
  { s: 224.4, e: 229.0, t: "Carton rouge sur l'erreur à éviter : ne te raconte pas.", color: C.red },
  { s: 229.2, e: 235.4, t: "Et ne dégaine jamais le prix avant d'avoir compris le besoin." },
  // — CONSIGNE DU CAPITAINE
  { s: 236.6, e: 240.4, t: "Le capitaine entre. Brassard au bras." },
  { s: 240.6, e: 244.6, t: "Consignes d'avant-match, façon vestiaire.", who: "LE CAPITAINE « MARCO »", color: MOD },
  { s: 244.8, e: 248.8, t: "4×20 pour l'accueil. SONCAS·E pour cerner le besoin." },
  { s: 249.0, e: 253.0, t: "Cinq questions pour fouiller. DIVAS pour la voix." },
  { s: 253.2, e: 257.4, t: "Quatre réflexes. Zéro improvisation." },
  { s: 258.0, e: 261.0, t: "Et la règle d'or du capitaine :" },
  { s: 261.4, e: 266.0, t: "Au club, rien au hasard. En immobilier non plus.", who: "LE CAPITAINE « MARCO »", color: MOD },
  { s: 266.2, e: 269.6, t: "Tu la sors à chaque accueil." },
  // — QUESTION D'ARBITRE
  { s: 270.6, e: 274.0, t: "Question d'arbitre ! Tout le monde se concentre.", color: C.red },
  { s: 274.2, e: 278.0, t: "La règle des 4×20, c'est quoi ?" },
  { s: 278.2, e: 282.0, t: "Réfléchis… trois secondes." },
  { s: 284.2, e: 288.0, t: "Coup de sifflet. Réponse B.", color: C.green },
  { s: 288.2, e: 292.4, t: "20 secondes, 20 gestes, 20 mots, 20 centimètres. But marqué." },
  { s: 292.6, e: 295.6, t: "Tu tiens déjà tes premiers réflexes de pro." },
  // — OUTRO
  { s: 296.6, e: 300.4, t: "Entraînement terminé avec l'ailier Téo." },
  { s: 300.6, e: 304.4, t: "Prochain match : Module 02, Les Règles du Jeu." },
  { s: 304.6, e: 307.6, t: "Avec le défenseur Rui. On enchaîne ?" },
];

// indicateur de chapitre (fil rouge) en haut à droite
function ProgressDot() {
  const t = useTime();
  let idx = SCENES.findIndex(s => t >= s.s && t < s.e);
  if (idx < 0) idx = SCENES.length - 1;
  const lab = SCENES[idx].lab;
  if (!lab) return null;
  return (
    <div style={{ position: "absolute", right: 70, top: 60, zIndex: 65,
      fontFamily: FT.mono, fontSize: 22, letterSpacing: 3, color: rgba(C.white, 0.5) }}>
      {lab}
    </div>
  );
}

// met à jour data-screen-label avec le timestamp (pour les commentaires)
function TimeLabel() {
  const t = useTime();
  useEffect(() => {
    const root = document.getElementById("ep01-root");
    if (root) {
      const m = Math.floor(t / 60), s = Math.floor(t % 60);
      root.setAttribute("data-screen-label", `Ep01 ${m}:${String(s).padStart(2, "0")}`);
    }
  }, [Math.floor(t)]);
  return null;
}

// navigation d'inspection : window.__seek(t)
function DevSeek() {
  const { setTime, setPlaying } = useTimeline();
  useEffect(() => {
    window.__seek = (t) => { setPlaying(false); setTime(t); };
  }, [setTime, setPlaying]);
  return null;
}

function App() {
  return (
    <Stage width={1920} height={1080} duration={DUR} background="#000" persistKey="lenny-ep01">
      {SCENES.map((sc, i) => {
        const Comp = sc.c;
        return (
          <Sprite key={i} start={sc.s} end={sc.e}>
            <Comp />
          </Sprite>
        );
      })}

      {/* tag expert persistant pendant les 3 chapitres techniques */}
      <Sprite start={94} end={174}>
        {({ localTime, duration }) => (
          <ExpertTag accent={MOD}
            show={clamp(Math.min(localTime / 0.8, (duration - localTime) / 0.8), 0, 1)} />
        )}
      </Sprite>
      <Sprite start={174} end={218}>
        {({ localTime, duration }) => (
          <ExpertTag accent={MOD}
            show={clamp(Math.min(localTime / 0.8, (duration - localTime) / 0.8), 0, 1)} />
        )}
      </Sprite>

      <ProgressDot />
      <Subtitles cues={CUES} />
      <TimeLabel />
      <DevSeek />
    </Stage>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
