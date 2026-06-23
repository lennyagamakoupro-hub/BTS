/* ============================================
   LENNY — Search overlay
   ============================================ */

(function () {
  const S = { open: false, query: "" };

  function buildIndex() {
    const items = [];
    // Modules
    LENNY_MODULES.forEach(m => {
      items.push({
        kind: "module",
        id: m.id, modId: m.id,
        title: m.title,
        sub: `${m.tag} · ${m.short} · ${m.time} min`,
        color: m.color,
        haystack: [m.title, m.short, m.tag, m.desc, m.quote].filter(Boolean).join(" ").toLowerCase()
      });
    });
    // Chapters (deep-dives)
    Object.entries(window.DEEPDIVE || {}).forEach(([slug, dd]) => {
      const m = LENNY_MODULES.find(x => x.id === dd.mod);
      items.push({
        kind: "chapter",
        id: slug, modId: dd.mod,
        title: dd.title,
        sub: `${m ? m.tag : ""} · Chapitre`,
        color: m ? m.color : "m11",
        lede: dd.lede,
        haystack: [dd.title, dd.lede].filter(Boolean).join(" ").toLowerCase()
      });
    });
    // Search index entries (concepts)
    (window.SEARCH_INDEX || []).forEach(entry => {
      const m = LENNY_MODULES.find(x => x.id === entry.mod);
      items.push({
        kind: "concept",
        id: entry.t, modId: entry.mod,
        title: entry.t,
        sub: `${m ? m.tag : ""} · ${entry.kind}`,
        color: m ? m.color : "m11",
        haystack: [entry.t, entry.kind].filter(Boolean).join(" ").toLowerCase()
      });
    });
    return items;
  }

  let INDEX = null;
  function getIndex() {
    if (!INDEX) INDEX = buildIndex();
    return INDEX;
  }

  function build() {
    if (document.getElementById("ls-modal")) return;
    const el = document.createElement("div");
    el.id = "ls-modal";
    el.className = "ls-modal";
    el.innerHTML = `
      <div class="ls-backdrop" data-close="1"></div>
      <div class="ls-sheet" role="dialog" aria-modal="true">
        <div class="ls-head">
          <svg class="ls-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7"/>
            <line x1="16" y1="16" x2="22" y2="22"/>
          </svg>
          <input id="ls-input" class="ls-input" type="text" placeholder="Rechercher un module, un chapitre, une loi, un concept…" autocomplete="off" spellcheck="false" />
          <button class="ls-close" data-close="1" aria-label="Fermer">
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
          </button>
        </div>
        <div class="ls-meta">
          <span class="ls-meta-key">↑↓</span><span>naviguer</span>
          <span class="ls-meta-dot"></span>
          <span class="ls-meta-key">↵</span><span>ouvrir</span>
          <span class="ls-meta-dot"></span>
          <span class="ls-meta-key">⌘K</span><span>raccourci</span>
          <span class="ls-meta-dot"></span>
          <span class="ls-meta-key">Échap</span><span>fermer</span>
        </div>
        <div class="ls-results" id="ls-results"></div>
      </div>
    `;
    document.body.appendChild(el);

    el.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) close(); });
    const input = document.getElementById("ls-input");
    input.addEventListener("input", () => { S.query = input.value; renderResults(); });
    input.addEventListener("keydown", onInputKey);

    document.addEventListener("keydown", (e) => {
      const isMeta = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isMeta) { e.preventDefault(); toggle(); return; }
      if (e.key === "/" && !S.open && !e.target.matches("input,textarea")) { e.preventDefault(); open(); return; }
      if (e.key === "Escape" && S.open) { e.preventDefault(); close(); return; }
    });
  }

  function onInputKey(e) {
    const results = [...document.querySelectorAll(".ls-item")];
    const cur = document.querySelector(".ls-item.active");
    const idx = results.indexOf(cur);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = results[Math.min(results.length - 1, idx + 1)];
      if (cur) cur.classList.remove("active");
      if (next) { next.classList.add("active"); next.scrollIntoView({ block: "nearest" }); }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = results[Math.max(0, idx - 1)];
      if (cur) cur.classList.remove("active");
      if (prev) { prev.classList.add("active"); prev.scrollIntoView({ block: "nearest" }); }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = cur || results[0];
      if (target) pickResult(target);
    }
  }

  function open() {
    build();
    document.getElementById("ls-modal").classList.add("open");
    document.body.style.overflow = "hidden";
    S.open = true;
    setTimeout(() => {
      const inp = document.getElementById("ls-input");
      inp.focus();
      inp.select();
    }, 30);
    renderResults();
  }
  function close() {
    const el = document.getElementById("ls-modal");
    if (!el) return;
    el.classList.remove("open");
    document.body.style.overflow = "";
    S.open = false;
  }
  function toggle() { S.open ? close() : open(); }

  function score(item, q) {
    if (!q) return 0;
    const t = item.title.toLowerCase();
    const h = item.haystack;
    if (t.startsWith(q)) return 100;
    if (t.includes(q))   return 80;
    if (h.includes(q))   return 40;
    return 0;
  }

  function renderResults() {
    const q = S.query.trim().toLowerCase();
    const all = getIndex();
    const results = (q ? all.map(it => ({ it, s: score(it, q) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 50)
                       : all.filter(it => it.kind === "module").map(it => ({ it, s: 1 })));
    const grouped = { module: [], chapter: [], concept: [] };
    results.forEach(({ it }) => grouped[it.kind]?.push(it));

    const container = document.getElementById("ls-results");
    if (!results.length) {
      container.innerHTML = `
        <div class="ls-empty">
          <div class="ls-empty-h">Aucun résultat pour « ${escapeHtml(S.query)} »</div>
          <div class="ls-empty-sub">Essaye "Hoguet", "DPE", "intérêts composés", "viager", "4×20"…</div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      ${grouped.module.length ? section("Modules", grouped.module, q) : ""}
      ${grouped.chapter.length ? section("Chapitres", grouped.chapter, q) : ""}
      ${grouped.concept.length ? section("Concepts & Lois", grouped.concept, q) : ""}
    `;
    container.querySelectorAll(".ls-item").forEach((el, i) => {
      if (i === 0) el.classList.add("active");
      el.addEventListener("click", () => pickResult(el));
      el.addEventListener("mouseenter", () => {
        container.querySelectorAll(".ls-item.active").forEach(x => x.classList.remove("active"));
        el.classList.add("active");
      });
    });
  }

  function section(label, items, q) {
    return `
      <div class="ls-section">
        <div class="ls-section-h">${escapeHtml(label)}<span class="ls-section-c">${items.length}</span></div>
        <div class="ls-section-body">
          ${items.map(it => `
            <button class="ls-item" data-kind="${it.kind}" data-mod="${escapeHtml(it.modId)}" data-id="${escapeHtml(it.id)}">
              <span class="ls-thumb art-${it.color}">
                <span class="ls-thumb-L">L</span>
              </span>
              <span class="ls-text">
                <span class="ls-t">${highlight(it.title, q)}</span>
                <span class="ls-s">${highlight(it.sub, q)}${it.lede ? ` · ${escapeHtml(it.lede.slice(0, 80))}${it.lede.length > 80 ? "…" : ""}` : ""}</span>
              </span>
              <span class="ls-go">↵</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function pickResult(el) {
    const kind = el.dataset.kind;
    const modId = el.dataset.mod;
    close();
    setTimeout(() => {
      if (kind === "module") {
        window.LennyDetail && window.LennyDetail.open(modId);
      } else if (kind === "chapter") {
        // open detail; user can hit "Démarrer la fiche"
        window.LennyDetail && window.LennyDetail.open(modId);
      } else if (kind === "concept") {
        window.LennyDetail && window.LennyDetail.open(modId);
      }
    }, 220);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    try {
      const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      return escapeHtml(text).replace(re, "<mark>$1</mark>");
    } catch { return escapeHtml(text); }
  }

  // Bind to nav search icon when DOM ready
  function bindSearch() {
    const navSearch = document.querySelector(".nav .icon-btn[aria-label='Rechercher']");
    if (navSearch) navSearch.addEventListener("click", () => open());
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindSearch);
  } else {
    bindSearch();
  }

  window.LennySearch = { open, close, toggle };
})();
