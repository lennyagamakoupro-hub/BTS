/* ============================================
   LENNY — Module detail overlay (Netflix-style title page)
   Depends on: LENNY_MODULES (lenny-app.js), STUDY (study-data.js),
               MEMOS (memos-data.js), QUIZ (quiz-data.js)
   ============================================ */

(function () {
  const STATE = { modId: null, tab: "fiches", cardIdx: 0, flipped: false, quizIdx: 0, quizAns: null, quizScore: 0, quizDone: false, quizAnswers: [], quizQs: [] };

  // Mélange l'ordre des questions ET des réponses — nouvelle distribution à chaque session
  function shuffleArr(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function prepQuiz(modId) {
    const src = (window.QUIZ || {})[modId] || (window.STUDY || {})[modId]?.quiz || [];
    return shuffleArr(src).map(q => {
      if (!q || !Array.isArray(q.c) || typeof q.r !== "number") return q;
      const order = shuffleArr(q.c.map((_, i) => i));
      return { ...q, c: order.map(i => q.c[i]), r: order.indexOf(q.r) };
    });
  }

  // ===== Build DOM =====
  function ensureModal() {
    if (document.getElementById("ld-modal")) return;
    const modal = document.createElement("div");
    modal.id = "ld-modal";
    modal.className = "ld-modal";
    modal.innerHTML = `
      <div class="ld-backdrop" data-close="1"></div>
      <div class="ld-sheet" role="dialog" aria-modal="true">
        <button class="ld-close" data-close="1" aria-label="Fermer">
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/>
          </svg>
        </button>
        <div class="ld-hero">
          <div class="ld-hero-bg"></div>
          <div class="ld-hero-content">
            <div class="ld-tag"><span class="L">L</span> · ORIGINAL</div>
            <h2 class="ld-title"></h2>
            <div class="ld-stats"></div>
            <div class="ld-quote"></div>
            <p class="ld-desc"></p>
            <div class="ld-actions">
              <button class="ld-btn ld-btn-primary" data-action="start">
                <svg viewBox="0 0 18 18" fill="currentColor"><path d="M4 2 L15 9 L4 16 Z"/></svg>
                Démarrer la fiche
              </button>
              <button class="ld-btn ld-btn-video" data-action="video" hidden>
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="2.4" y="4" width="13.2" height="10" rx="1.6"/><path d="M7.6 7 L11.4 9 L7.6 11 Z" fill="currentColor" stroke="none"/></svg>
                Voir la vidéo
              </button>
              <button class="ld-btn ld-btn-secondary" data-action="quiz">
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 2 a7 7 0 1 1 0 14 a7 7 0 0 1 0 -14 Z M9 6.5 v3.5 M9 12.5 v.5" stroke-linecap="round"/></svg>
                Quiz
              </button>
              <button class="ld-btn ld-btn-circle ld-add" data-action="mylist" title="Ajouter à Ma Liste" aria-label="Ajouter à Ma Liste">
                <svg class="ic-plus" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><line x1="9" y1="3" x2="9" y2="15"/><line x1="3" y1="9" x2="15" y2="9"/></svg>
                <svg class="ic-check" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.5,9.5 7.5,13.5 14.5,5.5"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="ld-body">
          <div class="ld-tabs" role="tablist">
            <button class="ld-tab active" data-tab="essentiel">Essentiel</button>
            <button class="ld-tab"        data-tab="fiches">Fiches</button>
            <button class="ld-tab"        data-tab="memos">Mémos & Formules</button>
            <button class="ld-tab"        data-tab="quiz">Quiz</button>
            <button class="ld-tab"        data-tab="about">À propos</button>
          </div>
          <div class="ld-panel" data-panel></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Bind close
    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) close();
    });
    // Bind tabs
    modal.querySelectorAll(".ld-tab").forEach(t => {
      t.addEventListener("click", () => {
        STATE.tab = t.dataset.tab;
        modal.querySelectorAll(".ld-tab").forEach(x => x.classList.toggle("active", x === t));
        renderPanel();
      });
    });
    // Bind hero actions
    modal.querySelector("[data-action='start']").addEventListener("click", () => {
      // Close detail and launch the cinematic player (continuation — no splash)
      close(true);
      setTimeout(() => {
        window.LennyPlayer && window.LennyPlayer.open(STATE.modId);
      }, 200);
    });
    modal.querySelector("[data-action='video']").addEventListener("click", () => {
      close(true);
      setTimeout(() => { window.LennyVideo && window.LennyVideo.open(STATE.modId); }, 200);
    });
    modal.querySelector("[data-action='quiz']").addEventListener("click", () => {
      STATE.tab = "quiz"; STATE.quizIdx = 0; STATE.quizAns = null; STATE.quizScore = 0; STATE.quizDone = false; STATE.quizAnswers = []; STATE.quizRecorded = false;
      STATE.quizQs = prepQuiz(STATE.modId);
      modal.querySelectorAll(".ld-tab").forEach(x => x.classList.toggle("active", x.dataset.tab === "quiz"));
      renderPanel();
      document.querySelector(".ld-body").scrollIntoView({ behavior: "smooth" });
    });
    // Ma Liste toggle
    const addBtn = modal.querySelector("[data-action='mylist']");
    if (addBtn) addBtn.addEventListener("click", () => {
      if (!window.LennyList) return;
      window.LennyList.toggle(STATE.modId);
      reflectAddState();
      addBtn.classList.add("pop");
      setTimeout(() => addBtn.classList.remove("pop"), 260);
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) close();
    });
  }

  function open(modId) {
    ensureModal();
    STATE.modId = modId;
    STATE.tab = "essentiel";
    STATE.cardIdx = 0; STATE.flipped = false;
    STATE.quizIdx = 0; STATE.quizAns = null; STATE.quizScore = 0; STATE.quizDone = false; STATE.quizAnswers = []; STATE.quizRecorded = false;
    STATE.quizQs = prepQuiz(modId);

    const mod = LENNY_MODULES.find(m => m.id === modId);
    if (!mod) return;

    const modal = document.getElementById("ld-modal");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    // Fill hero
    modal.querySelector(".ld-title").textContent = mod.title;
    modal.querySelector(".ld-quote").textContent = mod.quote;
    modal.querySelector(".ld-desc").textContent = mod.desc;
    const heroBg = modal.querySelector(".ld-hero-bg");
    heroBg.className = "ld-hero-bg art-" + mod.color;
    heroBg.style.backgroundImage = "";
    const photoClass = window.modPhotoClass && window.modPhotoClass(modId);
    if (photoClass) {
      heroBg.classList.add("has-photo", photoClass);
    }

    const stats = modal.querySelector(".ld-stats");
    const study = (window.STUDY || {})[modId] || {};
    const quizCount = ((window.QUIZ || {})[modId] || []).length;
    const fcCount = (study.cards || []).length;
    stats.innerHTML = `
      <span class="ld-pill">${mod.season}</span>
      <span class="ld-pill">${mod.time} min</span>
      <span class="ld-pill" style="background:rgba(229,9,20,.18);border-color:rgba(229,9,20,.35);color:#ffb3b6">BTS PI</span>
      <span class="ld-pill">${fcCount} fiches</span>
      <span class="ld-pill">${quizCount} questions</span>
    `;

    // Reset tab UI
    modal.querySelectorAll(".ld-tab").forEach(x => x.classList.toggle("active", x.dataset.tab === "essentiel"));
    // Bouton "Voir la vidéo" — visible seulement si une vidéo est rattachée
    const vbtn = modal.querySelector("[data-action='video']");
    if (vbtn) {
      const meta = window.LENNY_VIDEOS && window.LENNY_VIDEOS[modId];
      vbtn.hidden = !meta;
    }
    reflectAddState();
    renderPanel();
  }

  // Reflect Ma Liste membership on the detail "+" button
  function reflectAddState() {
    const modal = document.getElementById("ld-modal");
    if (!modal) return;
    const btn = modal.querySelector("[data-action='mylist']");
    if (!btn) return;
    const inList = window.LennyList && window.LennyList.has(STATE.modId);
    btn.classList.toggle("added", !!inList);
    const label = inList ? "Retirer de Ma Liste" : "Ajouter à Ma Liste";
    btn.setAttribute("title", label);
    btn.setAttribute("aria-label", label);
  }

  function close(skipSplash) {
    const modal = document.getElementById("ld-modal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (!skipSplash && window.LennySplash) window.LennySplash(1000);
  }

  function renderPanel() {
    const panel = document.querySelector("[data-panel]");
    if (!panel) return;
    const modId = STATE.modId;
    panel.innerHTML = "";
    if (STATE.tab === "essentiel") panel.appendChild(renderEssentiel(modId));
    if (STATE.tab === "fiches") panel.appendChild(renderFiches(modId));
    if (STATE.tab === "memos")  panel.appendChild(renderMemos(modId));
    if (STATE.tab === "quiz")   panel.appendChild(renderQuiz(modId));
    if (STATE.tab === "about")  panel.appendChild(renderAbout(modId));
  }

  // ===== Essentiel (à-retenir + frise des lois) =====
  function renderEssentiel(modId) {
    const mod = LENNY_MODULES.find(m => m.id === modId) || {};
    const data = (window.ESSENTIALS || {})[modId] || {};
    const retenir = data.retenir || [];
    const timeline = data.timeline || [];
    const study = (window.STUDY || {})[modId] || {};
    const fcCount = (study.cards || []).length;
    const quizCount = ((window.QUIZ || {})[modId] || []).length;
    const memo = (window.MEMOS || []).find(m => m.mod === modId);
    const memoCount = memo ? (memo.cards || []).length : 0;

    const wrap = document.createElement("div");
    wrap.className = "ld-ess";
    wrap.style.setProperty("--ess", "var(--" + (mod.color || "red") + ", var(--red))");

    const numbers = [
      { n: fcCount, l: "fiches" },
      { n: quizCount, l: "questions" },
      { n: memoCount, l: "mémos" },
      { n: mod.time || "—", l: "minutes" },
    ];

    if (!retenir.length && !timeline.length) {
      wrap.innerHTML = `<div class="ld-empty">L'essentiel arrive bientôt pour ce module.</div>`;
      return wrap;
    }

    const icon = (i) => {
      const paths = [
        '<path d="M3 10 L9 4 L15 10" /><path d="M5 9 V15 H13 V9"/>',
        '<circle cx="9" cy="9" r="6"/><path d="M9 5 v4 l3 2"/>',
        '<path d="M4 3 h7 l3 3 v9 H4 Z"/><path d="M6.5 8 h5 M6.5 11 h5"/>',
        '<path d="M3 9 h12 M9 3 v12"/>',
      ];
      return `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths[i % paths.length]}</svg>`;
    };

    wrap.innerHTML = `
      <div class="ld-ess-numbers">
        ${numbers.map(x => `<div class="ld-ess-num"><span class="v">${x.n}</span><span class="l">${x.l}</span></div>`).join("")}
      </div>
      <div class="ld-ess-section">
        <h3 class="ld-ess-h">À retenir</h3>
        <div class="ld-ess-grid">
          ${retenir.map((r, i) => `
            <div class="ld-ess-card" style="animation-delay:${i * 70}ms">
              <div class="ld-ess-card-ic">${icon(i)}</div>
              <div class="ld-ess-card-body">
                <div class="ld-ess-card-k">${escapeHtml(r.k)}</div>
                <div class="ld-ess-card-v">${escapeHtml(r.v)}</div>
              </div>
            </div>`).join("")}
        </div>
      </div>
      ${timeline.length ? `
      <div class="ld-ess-section">
        <h3 class="ld-ess-h">Frise chronologique des lois</h3>
        <div class="ld-frise">
          ${timeline.map((t, i) => `
            <div class="ld-frise-row" style="animation-delay:${i * 80}ms">
              <div class="ld-frise-year">${escapeHtml(t.y)}</div>
              <div class="ld-frise-track"><span class="ld-frise-dot"></span></div>
              <div class="ld-frise-label">${escapeHtml(t.t)}</div>
            </div>`).join("")}
        </div>
      </div>` : ""}
    `;
    // Avis sur le cours
    if (window.LennyFeedback) {
      const fbSlot = document.createElement("div");
      wrap.appendChild(fbSlot);
      window.LennyFeedback.mount(fbSlot, "course-" + modId, { label: "Ce cours vous a-t-il été utile ?" });
    }
    return wrap;
  }

  // ===== Fiches (flashcards) =====
  function renderFiches(modId) {
    const study = (window.STUDY || {})[modId] || {};
    const cards = study.cards || [];
    const wrap = document.createElement("div");
    wrap.className = "ld-fiches";
    if (!cards.length) {
      wrap.innerHTML = `<div class="ld-empty">Pas encore de fiches pour ce module.</div>`;
      return wrap;
    }
    const cur = cards[STATE.cardIdx];
    wrap.innerHTML = `
      <div class="ld-fiches-head">
        <div class="ld-eyebrow">Épisode ${STATE.cardIdx + 1}/${cards.length}</div>
        <div class="ld-fiches-progress">
          ${cards.map((_, i) => `<i class="${i === STATE.cardIdx ? "on" : (i < STATE.cardIdx ? "done" : "")}"></i>`).join("")}
        </div>
      </div>
      <div class="ld-card ${STATE.flipped ? "flipped" : ""}" data-flip>
        <div class="ld-card-inner">
          <div class="ld-card-face front">
            <div class="ld-card-eyebrow">Question</div>
            <div class="ld-card-text">${escapeHtml(cur.q)}</div>
            <div class="ld-card-hint">Cliquer pour révéler la réponse</div>
          </div>
          <div class="ld-card-face back">
            <div class="ld-card-eyebrow">Réponse</div>
            <div class="ld-card-text">${escapeHtml(cur.a)}</div>
            ${cur.ex ? `<div class="ld-card-ex"><span class="ld-card-ex-tag">Exemple</span>${escapeHtml(cur.ex)}</div>` : ""}
            <div class="ld-card-hint">Cliquer pour revenir à la question</div>
          </div>
        </div>
      </div>
      <div class="ld-fiches-nav">
        <button class="ld-nav-btn" data-nav="prev" ${STATE.cardIdx === 0 ? "disabled" : ""}>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="9,2 4,7 9,12"/></svg>
          Précédent
        </button>
        <div class="ld-fiches-actions">
          <button class="ld-nav-btn ghost" data-nav="hard">Je ne savais pas</button>
          <button class="ld-nav-btn ok"   data-nav="easy">Je savais ✓</button>
        </div>
        <button class="ld-nav-btn" data-nav="next" ${STATE.cardIdx === cards.length - 1 ? "disabled" : ""}>
          Suivant
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="5,2 10,7 5,12"/></svg>
        </button>
      </div>
    `;
    wrap.querySelector("[data-flip]").addEventListener("click", () => { STATE.flipped = !STATE.flipped; renderPanel(); });
    wrap.querySelectorAll("[data-nav]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const a = b.dataset.nav;
        if (a === "prev" && STATE.cardIdx > 0) { STATE.cardIdx--; STATE.flipped = false; }
        else if ((a === "next" || a === "easy" || a === "hard") && STATE.cardIdx < cards.length - 1) { STATE.cardIdx++; STATE.flipped = false; }
        renderPanel();
      });
    });
    return wrap;
  }

  // ===== Mémos =====
  function renderMemos(modId) {
    const memo = (window.MEMOS || []).find(m => m.mod === modId);
    const wrap = document.createElement("div");
    wrap.className = "ld-memos";
    if (!memo) {
      wrap.innerHTML = `<div class="ld-empty">Pas de mémo pour ce module.</div>`;
      return wrap;
    }
    wrap.innerHTML = memo.cards.map((card, i) => `
      <div class="ld-memo ld-memo-${card.type}" style="animation-delay:${i * 60}ms">
        <div class="ld-memo-type">${card.type}</div>
        <h4 class="ld-memo-h">${escapeHtml(card.h)}</h4>
        <ul class="ld-memo-list">
          ${card.items.map(it => `<li>${escapeHtml(it)}</li>`).join("")}
        </ul>
      </div>
    `).join("");
    return wrap;
  }

  // ===== Quiz =====
  function renderQuiz(modId) {
    let qs = STATE.quizQs;
    if (!qs || !qs.length) { qs = STATE.quizQs = prepQuiz(modId); }
    const wrap = document.createElement("div");
    wrap.className = "ld-quiz";
    if (!qs.length) {
      wrap.innerHTML = `<div class="ld-empty">Quiz à venir pour ce module.</div>`;
      return wrap;
    }
    if (STATE.quizDone) {
      const correctDone = STATE.quizAnswers.reduce((n, a, i) => n + (a != null && qs[i] && a === qs[i].r ? 1 : 0), 0);
      const pct = Math.round(correctDone / qs.length * 100);
      wrap.innerHTML = `
        <div class="ld-quiz-result">
          <div class="ld-quiz-result-pct ${pct >= 70 ? "ok" : (pct >= 40 ? "mid" : "bad")}">${pct}%</div>
          <div class="ld-quiz-result-line">${correctDone} / ${qs.length} bonnes réponses</div>
          <div class="ld-quiz-result-sub">${pct >= 70 ? "Très bien — fiche bien maîtrisée." : pct >= 40 ? "Pas mal — un dernier passage en fiche s'impose." : "Il faut revoir les fiches avant d'enchaîner."}</div>
          <div class="ld-quiz-result-actions">
            <button class="ld-btn ld-btn-primary" data-restart>Recommencer</button>
            <button class="ld-btn ld-btn-secondary" data-goFiches>Revoir les fiches</button>
          </div>
          <div id="ld-quiz-feedback"></div>
        </div>
      `;
      // Historique horodaté (radar) — une seule fois par session terminée
      if (!STATE.quizRecorded && window.LennyAPI) {
        STATE.quizRecorded = true;
        LennyAPI.recordQuizResult({ moduleId: STATE.modId, correct: correctDone, total: qs.length });
      }
      if (window.LennyFeedback) {
        const fs = wrap.querySelector("#ld-quiz-feedback");
        if (fs) window.LennyFeedback.mount(fs, "quiz-" + STATE.modId, { label: "Ce quiz était-il pertinent ?" });
      }
      wrap.querySelector("[data-restart]").addEventListener("click", () => {
        STATE.quizIdx = 0; STATE.quizAns = null; STATE.quizScore = 0; STATE.quizDone = false; STATE.quizAnswers = []; STATE.quizRecorded = false;
        STATE.quizQs = prepQuiz(STATE.modId);
        renderPanel();
      });
      wrap.querySelector("[data-goFiches]").addEventListener("click", () => {
        STATE.tab = "fiches";
        document.querySelectorAll(".ld-tab").forEach(x => x.classList.toggle("active", x.dataset.tab === "fiches"));
        renderPanel();
      });
      return wrap;
    }
    const q = qs[STATE.quizIdx];
    const picked = STATE.quizAnswers[STATE.quizIdx];
    const answered = picked != null;
    const correctSoFar = STATE.quizAnswers.reduce((n, a, i) => n + (a != null && qs[i] && a === qs[i].r ? 1 : 0), 0);
    wrap.innerHTML = `
      <div class="ld-quiz-head">
        <div class="ld-eyebrow">Question ${STATE.quizIdx + 1}/${qs.length}</div>
        <div class="ld-fiches-progress">
          ${qs.map((_, i) => `<i class="${i === STATE.quizIdx ? "on" : (STATE.quizAnswers[i] != null ? "done" : "")}"></i>`).join("")}
        </div>
      </div>
      <div class="ld-quiz-q">${escapeHtml(q.q)}</div>
      <div class="ld-quiz-choices">
        ${q.c.map((ch, i) => {
          let cls = "";
          if (answered) {
            if (i === q.r) cls = "right";
            else if (i === picked) cls = "wrong";
          }
          return `<button class="ld-quiz-choice ${cls}" data-pick="${i}" ${answered ? "disabled" : ""}>
            <span class="ld-quiz-letter">${String.fromCharCode(65 + i)}</span>
            <span class="ld-quiz-text">${escapeHtml(ch)}</span>
          </button>`;
        }).join("")}
      </div>
      ${answered && q.e ? `<div class="ld-quiz-expl">
        <div class="ld-quiz-expl-h">${picked === q.r ? "✓ Exact" : "✗ Pas tout à fait"}</div>
        <div>${escapeHtml(q.e)}</div>
      </div>` : ""}
      <div class="ld-quiz-foot">
        <button class="ld-btn ld-btn-secondary ld-quiz-prev" data-prev ${STATE.quizIdx === 0 ? "disabled" : ""}>← Précédent</button>
        <div class="ld-quiz-score">Score : <strong>${correctSoFar}</strong> / ${qs.length}</div>
        ${answered ? `<button class="ld-btn ld-btn-primary" data-next>${STATE.quizIdx === qs.length - 1 ? "Voir le résultat" : "Question suivante →"}</button>` : `<span class="ld-quiz-foot-spacer"></span>`}
      </div>
    `;
    wrap.querySelectorAll("[data-pick]").forEach(b => {
      b.addEventListener("click", () => {
        if (STATE.quizAnswers[STATE.quizIdx] != null) return;
        const i = parseInt(b.dataset.pick, 10);
        STATE.quizAnswers[STATE.quizIdx] = i;
        renderPanel();
      });
    });
    const prevBtn = wrap.querySelector("[data-prev]");
    if (prevBtn) prevBtn.addEventListener("click", () => {
      if (STATE.quizIdx > 0) { STATE.quizIdx--; renderPanel(); }
    });
    const nextBtn = wrap.querySelector("[data-next]");
    if (nextBtn) nextBtn.addEventListener("click", () => {
      if (STATE.quizIdx === qs.length - 1) { STATE.quizDone = true; }
      else { STATE.quizIdx++; }
      renderPanel();
    });
    return wrap;
  }

  // ===== About =====
  function renderAbout(modId) {
    const mod = LENNY_MODULES.find(m => m.id === modId);
    const wrap = document.createElement("div");
    wrap.className = "ld-about";
    wrap.innerHTML = `
      <div class="ld-about-grid">
        <div class="ld-about-l">
          <h3 style="font-size:18px;margin-bottom:12px">À propos de ${escapeHtml(mod.title)}</h3>
          <p style="color:rgba(255,255,255,.78);line-height:1.6;font-size:14.5px">${escapeHtml(mod.desc)}</p>
          <h3 style="font-size:14px;margin-top:24px;margin-bottom:8px;color:rgba(255,255,255,.55);letter-spacing:.06em;text-transform:uppercase;font-weight:600">Casting</h3>
          <p style="color:rgba(255,255,255,.78);line-height:1.6;font-size:14.5px">
            <strong>Format :</strong> Fiche de révision BTS PI<br>
            <strong>Saison :</strong> ${mod.season}<br>
            <strong>Durée :</strong> ${mod.time} min<br>
            <strong>Difficulté :</strong> ${mod.pct >= 92 ? "Tout public" : mod.pct >= 85 ? "Intermédiaire" : "Confirmé"}
          </p>
        </div>
        <div class="ld-about-r">
          <h3 style="font-size:14px;margin-bottom:12px;color:rgba(255,255,255,.55);letter-spacing:.06em;text-transform:uppercase;font-weight:600">Vous aimerez aussi</h3>
          <div class="ld-similar"></div>
        </div>
      </div>
    `;
    const similar = wrap.querySelector(".ld-similar");
    const others = LENNY_MODULES.filter(m => m.id !== modId).slice(0, 4);
    others.forEach(m => {
      const card = document.createElement("button");
      card.className = "ld-similar-card art-" + m.color;
      card.innerHTML = `
        <div class="ld-similar-meta">
          <span class="ld-similar-tag"><span class="L">L</span> · ORIGINAL</span>
          <span style="font-size:11px;color:rgba(255,255,255,.55);font-family:'IBM Plex Mono',monospace">${m.num}</span>
        </div>
        <div class="ld-similar-title">${escapeHtml(m.title)}</div>
        <div class="ld-similar-foot">
          <span style="font-size:11px;color:rgba(255,255,255,.5)">${m.time} min</span>
        </div>
      `;
      card.addEventListener("click", () => open(m.id));
      similar.appendChild(card);
    });
    return wrap;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // Expose
  window.LennyDetail = { open, close };
})();
