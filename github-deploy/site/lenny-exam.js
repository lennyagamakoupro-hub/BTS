/* ============================================
   LENNY — Examen blanc E8 (chronométré)
   • Tire N questions au hasard, tous modules confondus.
   • Minuteur avec auto-soumission à 0 ; aucune correction pendant l'épreuve.
   • Navigation libre + marquage « à revoir ».
   • Bulletin final : note /20, % par module, correction détaillée.
   • Dernier résultat mémorisé par utilisateur (localStorage).
   Dépend de : LENNY_MODULES/MODULES, window.QUIZ/STUDY, LennyAPI (option)
   ============================================ */
(function () {
  "use strict";

  const PRESETS = [
    { id: "court", label: "Express", q: 20, min: 20 },
    { id: "blanc", label: "Examen blanc", q: 40, min: 45 },
    { id: "marathon", label: "Marathon", q: 60, min: 75 },
  ];

  const S = { list: [], idx: 0, answers: [], flags: {}, endAt: 0, timer: null, preset: PRESETS[1], running: false };

  /* ---------- identité + stockage ---------- */
  function uid() { try { return (window.LennyAPI && LennyAPI.userId()) || "u_anon"; } catch (e) { return "u_anon"; } }
  const KEY = () => "lenny-exam-v1::" + uid();
  function loadLast() { try { return JSON.parse(localStorage.getItem(KEY())) || null; } catch (e) { return null; } }
  function saveLast(r) { try { localStorage.setItem(KEY(), JSON.stringify(r)); } catch (e) {} }

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function mods() { return (typeof LENNY_MODULES !== "undefined" && LENNY_MODULES.length) ? LENNY_MODULES : (window.MODULES || []); }
  function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function buildPool() {
    const pool = [];
    mods().forEach(m => {
      const qs = (window.QUIZ && window.QUIZ[m.id]) || (window.STUDY && window.STUDY[m.id] && window.STUDY[m.id].quiz) || [];
      qs.forEach(q => {
        if (q && Array.isArray(q.c) && typeof q.r === "number") pool.push({ q: q.q, c: q.c, r: q.r, e: q.e || "", mod: m });
      });
    });
    return pool;
  }

  function buildExam(preset) {
    const pool = shuffle(buildPool()).slice(0, preset.q);
    return pool.map(p => {
      const order = shuffle(p.c.map((_, i) => i));
      return { q: p.q, c: order.map(i => p.c[i]), r: order.indexOf(p.r), e: p.e, mod: p.mod };
    });
  }

  /* ---------- DOM ---------- */
  function ensureEl() {
    let el = document.getElementById("lenny-exam");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-exam";
    el.innerHTML = '<div class="ex-backdrop" data-ex-close></div><div class="ex-shell" id="ex-shell" role="dialog" aria-modal="true" aria-label="Examen blanc"></div>';
    document.body.appendChild(el);
    el.addEventListener("click", onClick);
    document.addEventListener("keydown", (e) => {
      if (!el.classList.contains("open")) return;
      if (e.key === "Escape") { e.preventDefault(); attemptClose(); }
      else if (S.running && (e.key === "ArrowRight")) { e.preventDefault(); go(1); }
      else if (S.running && (e.key === "ArrowLeft")) { e.preventDefault(); go(-1); }
    });
    return el;
  }

  function onClick(e) {
    if (e.target.closest("[data-ex-close]")) return attemptClose();
    const pr = e.target.closest("[data-ex-preset]");
    if (pr) { S.preset = PRESETS.find(p => p.id === pr.getAttribute("data-ex-preset")) || PRESETS[1]; renderIntro(); return; }
    if (e.target.closest("[data-ex-start]")) return start();
    const pick = e.target.closest("[data-ex-pick]");
    if (pick && S.running) { answer(parseInt(pick.getAttribute("data-ex-pick"), 10)); return; }
    if (e.target.closest("[data-ex-next]")) return go(1);
    if (e.target.closest("[data-ex-prev]")) return go(-1);
    if (e.target.closest("[data-ex-flag]")) { S.flags[S.idx] = !S.flags[S.idx]; renderRunning(); return; }
    const jump = e.target.closest("[data-ex-jump]");
    if (jump) { S.idx = parseInt(jump.getAttribute("data-ex-jump"), 10); renderRunning(); return; }
    if (e.target.closest("[data-ex-submit]")) return finish(false);
    if (e.target.closest("[data-ex-restart]")) return renderIntro();
    const rev = e.target.closest("[data-ex-review]");
    if (rev) { reviewIdx = parseInt(rev.getAttribute("data-ex-review"), 10); renderReview(); return; }
    if (e.target.closest("[data-ex-back-report]")) return renderReport(S.lastReport);
  }

  /* ---------- intro ---------- */
  function renderIntro() {
    const el = ensureEl();
    const last = loadLast();
    const presets = PRESETS.map(p =>
      `<button class="ex-preset${p.id === S.preset.id ? " on" : ""}" data-ex-preset="${p.id}" type="button">
         <span class="ex-preset-label">${esc(p.label)}</span>
         <span class="ex-preset-meta">${p.q} questions · ${p.min} min</span>
       </button>`).join("");
    const lastHtml = last ? `
      <div class="ex-last">
        <div class="ex-last-h">Dernière session</div>
        <div class="ex-last-row">
          <span class="ex-last-note ${last.note >= 10 ? "ok" : "bad"}">${last.note.toFixed(1)}/20</span>
          <span>${last.correct}/${last.total} bonnes · ${esc(last.dateLabel)}</span>
        </div>
      </div>` : "";
    el.querySelector("#ex-shell").innerHTML = `
      <button class="ex-close" data-ex-close aria-label="Fermer">✕</button>
      <div class="ex-intro">
        <div class="ex-intro-eye">LENNY · Épreuve blanche</div>
        <h2 class="ex-intro-title">Examen E8 chronométré</h2>
        <p class="ex-intro-sub">Conditions réelles : minuteur, questions tirées au hasard de tous les modules, aucune correction avant la fin. Note sur 20 et bulletin détaillé à l'arrivée.</p>
        <div class="ex-presets">${presets}</div>
        ${lastHtml}
        <button class="ex-startbtn" data-ex-start type="button">
          <svg viewBox="0 0 18 18" fill="currentColor"><path d="M4 2 L15 9 L4 16 Z"/></svg>
          Démarrer · ${S.preset.q} questions / ${S.preset.min} min
        </button>
        <div class="ex-intro-rules">Le minuteur ne s'arrête pas. À 0 : remise automatique de la copie.</div>
      </div>`;
  }

  /* ---------- déroulé ---------- */
  function start() {
    S.list = buildExam(S.preset);
    if (!S.list.length) { alert("Banque de questions vide."); return; }
    S.idx = 0; S.answers = new Array(S.list.length).fill(null); S.flags = {};
    S.endAt = Date.now() + S.preset.min * 60000;
    S.running = true;
    startTimer();
    renderRunning();
  }

  function startTimer() {
    stopTimer();
    S.timer = setInterval(() => {
      const left = S.endAt - Date.now();
      const t = document.getElementById("ex-timer");
      if (t) {
        const s = Math.max(0, Math.floor(left / 1000));
        t.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
        t.classList.toggle("warn", left <= 60000);
      }
      if (left <= 0) finish(true);
    }, 250);
  }
  function stopTimer() { if (S.timer) { clearInterval(S.timer); S.timer = null; } }

  function answer(i) { S.answers[S.idx] = i; renderRunning(); }
  function go(d) {
    const n = S.idx + d;
    if (n < 0 || n >= S.list.length) return;
    S.idx = n; renderRunning();
  }

  function renderRunning() {
    const el = ensureEl();
    const q = S.list[S.idx];
    const total = S.list.length;
    const answered = S.answers.filter(a => a != null).length;
    const picked = S.answers[S.idx];
    const letters = ["A", "B", "C", "D", "E", "F"];
    const dots = S.list.map((_, i) => {
      let cls = "ex-dot";
      if (i === S.idx) cls += " cur";
      else if (S.answers[i] != null) cls += " done";
      if (S.flags[i]) cls += " flag";
      return `<button class="${cls}" data-ex-jump="${i}" type="button" title="Question ${i + 1}">${i + 1}</button>`;
    }).join("");
    const opts = q.c.map((c, i) =>
      `<button class="ex-opt${picked === i ? " sel" : ""}" data-ex-pick="${i}" type="button">
         <span class="ex-opt-l">${letters[i]}</span><span class="ex-opt-t">${esc(c)}</span>
       </button>`).join("");
    el.querySelector("#ex-shell").innerHTML = `
      <div class="ex-bar">
        <div class="ex-bar-l">
          <span class="ex-bar-eye">Examen E8</span>
          <span class="ex-bar-prog">${answered}/${total} répondues</span>
        </div>
        <div class="ex-timer" id="ex-timer">--:--</div>
        <button class="ex-submit" data-ex-submit type="button">Remettre la copie</button>
      </div>
      <div class="ex-run">
        <div class="ex-q-head">
          <span class="ex-q-tag" style="--mc:var(--${q.mod.color || "red"}, #e50914)">${esc(q.mod.short || q.mod.title)}</span>
          <span class="ex-q-count">Question ${S.idx + 1} / ${total}</span>
          <button class="ex-flagbtn${S.flags[S.idx] ? " on" : ""}" data-ex-flag type="button">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 1.5v11M3 2.2h7l-1.4 2.3L10 6.8H3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ${S.flags[S.idx] ? "Marquée" : "À revoir"}
          </button>
        </div>
        <div class="ex-q">${esc(q.q)}</div>
        <div class="ex-opts">${opts}</div>
      </div>
      <div class="ex-foot">
        <button class="ex-nav" data-ex-prev type="button" ${S.idx === 0 ? "disabled" : ""}>← Précédente</button>
        <div class="ex-dots">${dots}</div>
        ${S.idx === total - 1
          ? `<button class="ex-nav primary" data-ex-submit type="button">Terminer →</button>`
          : `<button class="ex-nav" data-ex-next type="button">Suivante →</button>`}
      </div>`;
    startTimer(); // re-bind le tick au nouveau DOM
  }

  /* ---------- correction ---------- */
  function finish(auto) {
    if (!S.running) return;
    S.running = false; stopTimer();
    let correct = 0; const byMod = {};
    S.list.forEach((q, i) => {
      const ok = S.answers[i] === q.r;
      if (ok) correct++;
      const id = q.mod.id;
      byMod[id] = byMod[id] || { mod: q.mod, correct: 0, total: 0 };
      byMod[id].total++; if (ok) byMod[id].correct++;
    });
    const total = S.list.length;
    const note = total ? Math.round(correct / total * 200) / 10 : 0;
    const now = new Date();
    const report = {
      correct, total, note, auto,
      byMod: Object.values(byMod).sort((a, b) => (b.correct / b.total) - (a.correct / a.total)),
      dateLabel: now.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }) + " · " + now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    };
    S.lastReport = report;
    saveLast({ note, correct, total, dateLabel: report.dateLabel });
    if (window.LennyAPI) report.byMod.forEach(b => LennyAPI.recordQuizResult({ moduleId: b.mod.id, correct: b.correct, total: b.total }));
    renderReport(report);
  }

  function renderReport(r) {
    const el = ensureEl();
    const pass = r.note >= 10;
    const mention = r.note >= 16 ? "Très bien" : r.note >= 14 ? "Bien" : r.note >= 12 ? "Assez bien" : r.note >= 10 ? "Passable" : "Insuffisant";
    const bars = r.byMod.map(b => {
      const p = Math.round(b.correct / b.total * 100);
      return `<div class="ex-modrow">
        <span class="ex-modrow-name">${esc(b.mod.short || b.mod.title)}</span>
        <span class="ex-modbar"><i style="width:${p}%;background:var(--${b.mod.color || "red"}, #d7a13c)"></i></span>
        <span class="ex-modrow-v">${b.correct}/${b.total}</span>
      </div>`;
    }).join("");
    el.querySelector("#ex-shell").innerHTML = `
      <button class="ex-close" data-ex-close aria-label="Fermer">✕</button>
      <div class="ex-report">
        <div class="ex-report-head">
          <div class="ex-grade ${pass ? "ok" : "bad"}">
            <span class="ex-grade-n">${r.note.toFixed(1)}</span><span class="ex-grade-d">/20</span>
          </div>
          <div class="ex-report-meta">
            <div class="ex-report-mention ${pass ? "ok" : "bad"}">${mention}</div>
            <div class="ex-report-line">${r.correct} bonnes réponses sur ${r.total}${r.auto ? " · temps écoulé" : ""}</div>
            <div class="ex-report-date">${esc(r.dateLabel)}</div>
          </div>
        </div>
        <div class="ex-report-sec">
          <h3 class="ex-report-h">Résultat par module</h3>
          <div class="ex-mods">${bars}</div>
        </div>
        <div class="ex-report-actions">
          <button class="ex-nav primary" data-ex-review="0" type="button">Voir la correction</button>
          <button class="ex-nav" data-ex-restart type="button">Refaire un examen</button>
          <button class="ex-nav" data-ex-close type="button">Fermer</button>
        </div>
      </div>`;
  }

  let reviewIdx = 0;
  function renderReview() {
    const el = ensureEl();
    const q = S.list[reviewIdx];
    const picked = S.answers[reviewIdx];
    const ok = picked === q.r;
    const letters = ["A", "B", "C", "D", "E", "F"];
    const opts = q.c.map((c, i) => {
      let cls = "";
      if (i === q.r) cls = " right";
      else if (i === picked) cls = " wrong";
      return `<div class="ex-rev-opt${cls}"><span class="ex-opt-l">${letters[i]}</span><span class="ex-opt-t">${esc(c)}</span></div>`;
    }).join("");
    el.querySelector("#ex-shell").innerHTML = `
      <div class="ex-bar">
        <div class="ex-bar-l"><span class="ex-bar-eye">Correction</span><span class="ex-bar-prog">${reviewIdx + 1}/${S.list.length}</span></div>
        <button class="ex-submit ghost" data-ex-back-report type="button">← Bulletin</button>
      </div>
      <div class="ex-run">
        <div class="ex-q-head">
          <span class="ex-q-tag" style="--mc:var(--${q.mod.color || "red"}, #e50914)">${esc(q.mod.short || q.mod.title)}</span>
          <span class="ex-rev-badge ${ok ? "ok" : "bad"}">${ok ? "✓ Juste" : picked == null ? "Sans réponse" : "✗ Raté"}</span>
        </div>
        <div class="ex-q">${esc(q.q)}</div>
        <div class="ex-opts">${opts}</div>
        ${q.e ? `<div class="ex-rev-expl"><strong>Explication —</strong> ${esc(q.e)}</div>` : ""}
      </div>
      <div class="ex-foot">
        <button class="ex-nav" data-ex-review="${Math.max(0, reviewIdx - 1)}" type="button" ${reviewIdx === 0 ? "disabled" : ""}>← Précédente</button>
        <span class="ex-rev-spacer"></span>
        ${reviewIdx === S.list.length - 1
          ? `<button class="ex-nav primary" data-ex-back-report type="button">Voir le bulletin</button>`
          : `<button class="ex-nav" data-ex-review="${reviewIdx + 1}" type="button">Suivante →</button>`}
      </div>`;
  }

  /* ---------- ouverture / fermeture ---------- */
  function attemptClose() {
    if (S.running) {
      if (!confirm("Quitter l'examen ? Votre copie ne sera pas notée.")) return;
      S.running = false; stopTimer();
    }
    close();
  }
  function open() {
    const el = ensureEl();
    if (!S.running) renderIntro();
    el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }
  function close() {
    const el = document.getElementById("lenny-exam");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  window.LennyExam = { open, close };
})();
