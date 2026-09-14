/* ============================================
   LENNY — Leçon (remplace le diaporama derrière « Démarrer la fiche »)
   Depends on: LENNY_MODULES (lenny-app.js), DEEPDIVE (deep-dive-data.js + lenny-*-deepdive-*.js)
   Rendu générique : une carte par entrée DEEPDIVE du module, dans l'ordre réel de déclaration.
   ============================================ */
(function () {
  const NUM_RE = /^(\d+)\s*(%|an|ans|jours?|€)\b\s*(.*)$/;
  const STATE = { modId: null, cards: [], slugIndex: {} };

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function build() {
    if (document.getElementById("ll-modal")) return;
    const modal = document.createElement("div");
    modal.id = "ll-modal";
    modal.innerHTML = `
      <div class="ll-topbar">
        <button class="ll-exit" data-close aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <div class="ll-progress-track" id="ll-progress-track"><div class="ll-progress-fill" id="ll-progress-fill"></div></div>
        <div class="ll-mark" id="ll-mark">—</div>
      </div>
      <header class="ll-doc-header" id="ll-doc-header"></header>
      <main class="ll-lesson" id="ll-lesson"></main>
      <footer class="ll-lesson-end" id="ll-lesson-end" style="display:none">
        <p id="ll-end-line"></p>
        <button class="ll-btn-solid" data-close>Fermer<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </footer>
    `;
    document.body.appendChild(modal);
    modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) close();
    });
  }

  function open(modId) {
    build();
    const modal = document.getElementById("ll-modal");
    const mod = (window.LENNY_MODULES || []).find(m => m.id === modId);
    const allDD = window.DEEPDIVE || {};
    const slugs = Object.keys(allDD).filter(k => allDD[k].mod === modId);

    if (!mod || !slugs.length) {
      alert("Pas encore de cours rédigé pour ce module.");
      return;
    }

    STATE.modId = modId;
    STATE.cards = slugs.map(slug => Object.assign({ slug }, allDD[slug]));
    STATE.slugIndex = {};
    STATE.cards.forEach((c, i) => { STATE.slugIndex[c.slug] = i; });

    const colorValue = /^#/.test(mod.color) ? mod.color : "var(--" + mod.color + ")";
    modal.style.setProperty("--mod", colorValue);

    document.getElementById("ll-doc-header").innerHTML =
      '<div class="ll-doc-id">' + escapeHtml(mod.tag) + ' · ' + escapeHtml(mod.short) + '</div>' +
      '<h1 class="ll-doc-title">' + escapeHtml(mod.title) + '</h1>' +
      '<p class="ll-doc-dek" id="ll-doc-dek"></p>' +
      '<div class="ll-doc-meta" id="ll-doc-meta"></div>';

    const n = STATE.cards.length;
    document.getElementById("ll-doc-dek").textContent = n + (n > 1 ? " notions clés à traverser." : " notion clé à traverser.");

    const lesson = document.getElementById("ll-lesson");
    let html = "";
    STATE.cards.forEach((card, i) => {
      const num = i + 1;
      const numStr = num < 10 ? "0" + num : "" + num;
      const linkedChips = (card.linked || [])
        .filter(slug => STATE.slugIndex.hasOwnProperty(slug))
        .map(slug => '<button class="ll-pill" data-jump="' + escapeHtml(slug) + '">' + escapeHtml(allDD[slug].title) + '</button>')
        .join("");

      html += '<section class="ll-chapter" id="ll-card-' + i + '" data-index="' + i + '"><span class="ll-chapnum">' + numStr + '</span>' +
        '<div class="ll-chapter-inner">' +
        '<div class="ll-chap-id">Fiche ' + numStr + ' / ' + n + '</div>' +
        '<h2 class="ll-chap-title">' + escapeHtml(card.title) + '</h2>' +
        (card.lede ? '<p class="ll-chap-lede">' + escapeHtml(card.lede) + '</p>' : '') +
        (linkedChips ? '<div class="ll-chap-links"><div class="ll-chap-links-h">Concepts liés</div>' + linkedChips + '</div>' : '') +
        '<div class="ll-items">';

      (card.sections || []).forEach(sec => {
        html += '<div class="ll-item"><div class="ll-item-label"><span class="ll-dot"></span>' + escapeHtml(sec.h) + '</div>';
        if (sec.b) html += '<p class="ll-item-body">' + escapeHtml(sec.b) + '</p>';
        if (sec.list && sec.list.length) {
          const parsed = sec.list.map(li => NUM_RE.exec(li));
          const allNumeric = parsed.every(m => m);
          if (allNumeric) {
            html += '<div class="ll-stat-grid">';
            parsed.forEach(m => {
              html += '<div class="ll-stat-badge"><span class="sv"><span class="num" data-target="' + escapeHtml(m[1]) + '">0</span> ' + escapeHtml(m[2]) + '</span>' +
                '<span class="sc">' + escapeHtml(m[3] || "") + '</span></div>';
            });
            html += '</div>';
          } else {
            html += '<ul class="ll-plain-list">' + sec.list.map(li => '<li>' + escapeHtml(li) + '</li>').join("") + '</ul>';
          }
        }
        html += '</div>';
      });

      html += '</div></div></section>';
    });
    lesson.innerHTML = html;

    document.getElementById("ll-lesson-end").style.display = "block";
    document.getElementById("ll-end-line").textContent = "Fin — " + mod.title + ", " + n + (n > 1 ? " fiches traversées." : " fiche traversée.");

    // temps de lecture réel, sur le texte effectivement rendu
    const words = lesson.querySelectorAll(".ll-item-body, .ll-plain-list li, .ll-chap-lede, .ll-doc-dek");
    let count = 0;
    words.forEach(el => { count += el.textContent.trim().split(/\s+/).filter(Boolean).length; });
    const minutes = Math.max(1, Math.round(count / 200));
    document.getElementById("ll-doc-meta").textContent = n + (n > 1 ? " fiches" : " fiche") + " · lecture ≈ " + minutes + " min";

    // liens "concepts liés" — ancre + scroll dans le même module
    lesson.querySelectorAll("[data-jump]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = STATE.slugIndex[btn.getAttribute("data-jump")];
        const target = document.getElementById("ll-card-" + idx);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // barre de progression segmentée — s'adapte au nombre réel de fiches, scroll interne au modal
    const track = document.getElementById("ll-progress-track");
    const fill = document.getElementById("ll-progress-fill");
    const mark = document.getElementById("ll-mark");
    const chapters = Array.prototype.slice.call(lesson.querySelectorAll(".ll-chapter"));
    let segPcts = [];

    function layoutSegments() {
      const max = modal.scrollHeight - modal.clientHeight;
      track.querySelectorAll(".ll-progress-seg").forEach(s => s.remove());
      segPcts = chapters.map(ch => max > 0 ? (ch.offsetTop / max) * 100 : 0);
      segPcts.slice(1).forEach(pct => {
        const seg = document.createElement("div");
        seg.className = "ll-progress-seg";
        seg.style.left = pct + "%";
        track.appendChild(seg);
      });
    }
    let ticking = false;
    function updateProgress() {
      const max = modal.scrollHeight - modal.clientHeight;
      const pct = max > 0 ? (modal.scrollTop / max) * 100 : 0;
      fill.style.width = pct + "%";
      let current = 1;
      segPcts.forEach((segPct, i) => { if (pct >= segPct - 0.5) current = i + 1; });
      mark.textContent = current + "/" + chapters.length;
      ticking = false;
    }
    modal.onscroll = function () {
      if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
    };
    window.addEventListener("resize", function () { if (modal.classList.contains("open")) { layoutSegments(); updateProgress(); } });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = lesson.querySelectorAll(".ll-item");
    if (reducedMotion) {
      items.forEach(el => el.classList.add("in"));
    } else {
      const cardIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add("in"); cardIO.unobserve(entry.target); }
        });
      }, { root: modal, threshold: .15, rootMargin: "0px 0px -8% 0px" });
      items.forEach(el => cardIO.observe(el));
    }

    function countUp(numEl) {
      const target = parseFloat(numEl.getAttribute("data-target"));
      if (reducedMotion || isNaN(target)) { numEl.textContent = target; return; }
      const duration = 700; let start = null;
      const ease = t => 1 - Math.pow(1 - t, 3);
      function step(ts) {
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        numEl.textContent = Math.round(ease(p) * target);
        if (p < 1) window.requestAnimationFrame(step); else numEl.textContent = target;
      }
      window.requestAnimationFrame(step);
    }
    const numIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { countUp(entry.target); numIO.unobserve(entry.target); }
      });
    }, { root: modal, threshold: .4 });
    lesson.querySelectorAll(".num").forEach(el => numIO.observe(el));

    modal.scrollTop = 0;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    layoutSegments();
    updateProgress();
  }

  function close() {
    const modal = document.getElementById("ll-modal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (window.LennySplash) window.LennySplash(1000);
  }

  window.LennyLesson = { open, close };
})();
