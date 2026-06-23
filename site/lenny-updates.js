/* ============================================
   LENNY — Cloche « Nouveautés »
   --------------------------------------------------
   • Journal de nouveautés que Lenny maintient (1 ligne par nouveauté).
   • Source = LENNY_UPDATES_SEED (déployé → vu par tous) + ajouts admin
     (via le serveur si branché, sinon localStorage de cet appareil).
   • Pastille rouge = nb de nouveautés que CET élève n'a pas encore cliquées.
     Elle ne disparaît que lorsqu'il a cliqué chaque nouveauté.
   • Mini-interface admin (code Lenny) pour ajouter / retirer une nouveauté.

   Dépend de : LennyAPI (userId/isAdmin/remote), LENNY_MODULES,
   LennyDetail / LennyPlayer / LennyQuiz / LennyDevoir / LennyRouter / LennyDocs.
   ============================================ */
(function () {
  "use strict";

  const SEED = window.LENNY_UPDATES_SEED || [];
  const apiBase = () => (window.LENNY_API_BASE || "").replace(/\/$/, "");
  const remote = () => !!apiBase();
  const A = () => window.LennyAPI || null;

  const STORE_KEY = "lenny-updates-store-v1";  // nouveautés ajoutées par l'admin (mode local)
  const HIDE_KEY = "lenny-updates-hidden-v1";  // ids du seed masqués par l'admin (mode local)
  function clickedKey() {
    const a = A();
    const uid = a && a.userId ? a.userId() : "anon";
    return "lenny-updates-clicked-" + uid;
  }
  const isAdmin = () => !!(A() && A().isAdmin && A().isAdmin());

  /* ---------- utils stockage ---------- */
  function read(key, fb) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fb : v; }
    catch (e) { return fb; }
  }
  function write(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
  function newId() { return "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  /* ---------- méta par type (icône + libellé + couleur) ---------- */
  const TYPES = {
    module:  { label: "Nouvelle fiche",  color: "#e50914", icon: '<path d="M4 2.4h7.2L15 6.1V15a.6.6 0 0 1-.6.6H4a.6.6 0 0 1-.6-.6V3a.6.6 0 0 1 .6-.6Z"/><path d="M10.8 2.6V6.1h3.5M6 9h6M6 11.4h6" stroke-linecap="round"/>' },
    fiche:   { label: "Nouvelle fiche",  color: "#e50914", icon: '<path d="M4 2.4h7.2L15 6.1V15a.6.6 0 0 1-.6.6H4a.6.6 0 0 1-.6-.6V3a.6.6 0 0 1 .6-.6Z"/><path d="M10.8 2.6V6.1h3.5M6 9h6M6 11.4h6" stroke-linecap="round"/>' },
    video:   { label: "Nouvelle vidéo",  color: "#e50914", icon: '<circle cx="9" cy="9" r="6.4"/><path d="M7.4 6.3 12 9l-4.6 2.7Z" fill="currentColor" stroke="none"/>' },
    quiz:    { label: "Mise à jour",     color: "#b58430", icon: '<circle cx="9" cy="9" r="6.4"/><path d="M9 5.4v4M9 11.6v.5" stroke-linecap="round"/>' },
    devoir:  { label: "Nouveau devoir",  color: "#2f5d7a", icon: '<path d="M4.5 2.4h5.4L13.5 6V15a.6.6 0 0 1-.6.6H4.5a.6.6 0 0 1-.6-.6V3a.6.6 0 0 1 .6-.6Z"/><path d="M9.6 2.6V6h3.4M6.2 9.2h5M6.2 11.6h5" stroke-linecap="round"/>' },
    annonce: { label: "Annonce",         color: "#46d369", icon: '<path d="M3 7.4 11.5 4v10L3 10.6Z"/><path d="M3 7.4H2.2a.6.6 0 0 0-.6.6v1.4a.6.6 0 0 0 .6.6H3M5.4 11v2.2a1 1 0 0 0 2 0v-1.5" stroke-linecap="round" stroke-linejoin="round"/>' },
  };
  function typeMeta(t) { return TYPES[t] || TYPES.annonce; }

  /* ---------- date relative FR ---------- */
  function rel(iso) {
    if (!iso) return "";
    const d = new Date(iso); if (isNaN(d)) return "";
    const diff = Date.now() - d.getTime();
    const m = Math.round(diff / 60000), h = Math.round(diff / 3600000), day = Math.round(diff / 86400000);
    if (diff < 0) return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    if (diff < 60000) return "à l'instant";
    if (m < 60) return "il y a " + m + " min";
    if (h < 24) return "il y a " + h + " h";
    if (day === 1) return "hier";
    if (day < 7) return "il y a " + day + " jours";
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  }

  /* ---------- couche de données ---------- */
  let ITEMS = [];                 // liste fusionnée courante (triée récent → ancien)

  function localMerge() {
    const hidden = read(HIDE_KEY, []);
    const stored = read(STORE_KEY, []);
    const seed = SEED.filter(u => hidden.indexOf(u.id) === -1);
    return dedupeSort(seed.concat(stored));
  }
  function dedupeSort(arr) {
    const map = {};
    arr.forEach(u => { if (u && u.id) map[u.id] = u; });
    return Object.keys(map).map(k => map[k])
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  async function fetchList() {
    if (remote()) {
      try {
        const r = await fetch(apiBase() + "/api/updates");
        if (r.ok) {
          const d = await r.json();
          const items = (d.items || []).map(it => ({
            id: it.id, type: it.type, title: it.title, desc: it.desc, date: it.date,
            link: it.link_kind ? { kind: it.link_kind, id: it.link_id || "" } : null,
          }));
          // on fusionne avec le seed (le seed sert de socle commun)
          return dedupeSort(SEED.concat(items));
        }
      } catch (e) { /* repli local */ }
    }
    return localMerge();
  }

  async function addUpdate(entry) {
    const e = {
      id: entry.id || newId(),
      type: entry.type || "annonce",
      title: (entry.title || "").trim(),
      desc: (entry.desc || "").trim(),
      date: entry.date || new Date().toISOString(),
      link: entry.link && entry.link.kind ? { kind: entry.link.kind, id: entry.link.id || "" } : null,
    };
    if (remote()) {
      try {
        await fetch(apiBase() + "/api/updates", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: e.id, type: e.type, title: e.title, desc: e.desc, date: e.date,
            link_kind: e.link ? e.link.kind : null, link_id: e.link ? e.link.id : null,
          }),
        });
      } catch (err) { /* on garde la copie locale */ }
    }
    const stored = read(STORE_KEY, []);
    stored.push(e); write(STORE_KEY, stored);
    return e;
  }

  async function removeUpdate(id) {
    if (remote()) {
      try { await fetch(apiBase() + "/api/updates/" + encodeURIComponent(id), { method: "DELETE" }); }
      catch (e) {}
    }
    // retire des ajouts locaux ; si ça vient du seed, on le masque
    const stored = read(STORE_KEY, []).filter(u => u.id !== id);
    write(STORE_KEY, stored);
    if (SEED.some(u => u.id === id)) {
      const hidden = read(HIDE_KEY, []);
      if (hidden.indexOf(id) === -1) { hidden.push(id); write(HIDE_KEY, hidden); }
    }
  }

  /* ---------- état « cliqué » par élève ---------- */
  function clickedSet() { return read(clickedKey(), []); }
  function isClicked(id) { return clickedSet().indexOf(id) !== -1; }
  function markClicked(id) {
    const s = clickedSet();
    if (s.indexOf(id) === -1) { s.push(id); write(clickedKey(), s); }
  }
  function unseenCount() { return ITEMS.filter(u => !isClicked(u.id)).length; }

  /* ---------- deep-link ---------- */
  function openLink(link) {
    if (!link || !link.kind) return false;
    const k = link.kind, id = link.id;
    try {
      if (k === "module" && window.LennyDetail) { window.LennyDetail.open(id); return true; }
      if (k === "video" && window.LennyPlayer) { window.LennyPlayer.open(id); return true; }
      if (k === "quiz" && window.LennyQuiz) { window.LennyQuiz.open(); return true; }
      if (k === "devoir" && window.LennyDevoir) { window.LennyDevoir.open(id || "general"); return true; }
      if (k === "sector" && window.LennyRouter) { window.LennyRouter.go(id); return true; }
      if (k === "docs" && window.LennyDocs) { window.LennyDocs.open(id || "programme"); return true; }
    } catch (e) {}
    return false;
  }

  /* ============================================================
     UI
     ============================================================ */
  let btn = null, badge = null, panel = null, open = false;
  let adminModal = null, modalOpen = false;

  function ensureBadge() {
    if (!btn) return;
    badge = btn.querySelector(".notif-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "notif-badge";
      btn.appendChild(badge);
    }
  }
  function renderBadge() {
    if (!badge) return;
    const n = unseenCount();
    badge.textContent = n > 9 ? "9+" : String(n);
    badge.style.display = n > 0 ? "" : "none";
    if (btn) btn.classList.toggle("has-unseen", n > 0);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function rgba(hex, a) {
    const h = (hex || "#e50914").replace("#", "");
    const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
    const r = parseInt(n.slice(0, 2), 16) || 0, g = parseInt(n.slice(2, 4), 16) || 0, b = parseInt(n.slice(4, 6), 16) || 0;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  function itemHtml(u) {
    const m = typeMeta(u.type);
    const seen = isClicked(u.id);
    const hasLink = !!(u.link && u.link.kind);
    return (
      '<button class="nu-item' + (seen ? " seen" : "") + (hasLink ? " linked" : "") + '" data-id="' + esc(u.id) + '">' +
        (seen ? "" : '<span class="nu-dot" aria-hidden="true"></span>') +
        '<span class="nu-ic" style="color:' + m.color + ';background:' + rgba(m.color, .16) + ';border-color:' + rgba(m.color, .34) + '">' +
          '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5">' + m.icon + "</svg>" +
        "</span>" +
        '<span class="nu-body">' +
          '<span class="nu-kicker" style="color:' + m.color + '">' + esc(m.label) + "</span>" +
          '<span class="nu-title">' + esc(u.title) + "</span>" +
          (u.desc ? '<span class="nu-desc">' + esc(u.desc) + "</span>" : "") +
          '<span class="nu-meta">' + esc(rel(u.date)) + (hasLink ? ' · <span class="nu-go">Ouvrir ›</span>' : "") + "</span>" +
        "</span>" +
        (isAdmin() ? '<span class="nu-del" data-del="' + esc(u.id) + '" title="Retirer cette nouveauté" role="button" aria-label="Retirer">✕</span>' : "") +
      "</button>"
    );
  }

  function renderList() {
    const list = panel.querySelector(".nu-list");
    if (!ITEMS.length) {
      list.innerHTML = '<div class="nu-empty">Aucune nouveauté pour l\'instant.</div>';
      return;
    }
    list.innerHTML = ITEMS.map(itemHtml).join("");
  }

  /* ---------- formulaire admin ---------- */
  function adminFormHtml() {
    const mods = (window.LENNY_MODULES || window.MODULES || []);
    const modOpts = mods.map(m => '<option value="' + esc(m.id) + '">' + esc((m.num ? m.num + " · " : "") + (m.short || m.title)) + "</option>").join("");
    const note = remote()
      ? "Diffusé à tous les élèves via le serveur."
      : "Mode local : visible sur cet appareil. Pour diffuser à tous, ajoute-la à <b>lenny-updates-data.js</b> (bouton « Copier la ligne »).";
    return (
      '<div class="nu-modal" hidden>' +
        '<div class="nu-modal-backdrop"></div>' +
        '<div class="nu-modal-card" role="dialog" aria-modal="true" aria-label="Ajouter une nouveauté">' +
          '<div class="nu-modal-head">' +
            '<span class="nu-modal-ttl">Ajouter une nouveauté</span>' +
            '<button type="button" class="nu-modal-x" aria-label="Fermer">✕</button>' +
          "</div>" +
          '<div class="nu-modal-body">' +
            '<label class="nu-f">Titre<input class="nu-ttl" type="text" maxlength="90" placeholder="Ex : Module 12 · Gestion locative" /></label>' +
            '<label class="nu-f">Description<textarea class="nu-dsc" rows="4" maxlength="400" placeholder="Décris la nouveauté en une ou deux phrases…"></textarea></label>' +
            '<div class="nu-row2">' +
              '<label class="nu-f">Type' +
                '<select class="nu-type">' +
                  '<option value="fiche">Nouvelle fiche</option>' +
                  '<option value="video">Nouvelle vidéo</option>' +
                  '<option value="quiz">Fiche / quiz enrichi</option>' +
                  '<option value="devoir">Nouveau devoir</option>' +
                  '<option value="annonce">Annonce libre</option>' +
                "</select>" +
              "</label>" +
              '<label class="nu-f">Lien' +
                '<select class="nu-lk">' +
                  '<option value="">Aucun (info seule)</option>' +
                  '<option value="module">Ouvre une fiche</option>' +
                  '<option value="video">Lance une vidéo</option>' +
                  '<option value="quiz">Ouvre le quiz général</option>' +
                  '<option value="devoir">Ouvre un devoir de pôle</option>' +
                  '<option value="sector">Ouvre une page de pôle</option>' +
                "</select>" +
              "</label>" +
            "</div>" +
            '<label class="nu-f nu-lk-id-wrap" hidden>Cible du lien' +
              '<select class="nu-lk-id">' + modOpts + "</select>" +
            "</label>" +
            '<div class="nu-admin-note">' + note + "</div>" +
          "</div>" +
          '<div class="nu-modal-foot">' +
            '<div class="nu-admin-msg" role="status"></div>' +
            '<div class="nu-foot-btns">' +
              '<button type="button" class="nu-btn ghost nu-copy" hidden>Copier la ligne</button>' +
              '<button type="button" class="nu-btn nu-publish">Publier la nouveauté</button>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  const SECTORS = [["transaction", "Transaction"], ["syndic", "Syndic"], ["droit", "Droit"]];
  const DEVOIRS = [["general", "Devoir général"], ["transaction", "Transaction"], ["syndic", "Syndic"], ["droit", "Droit"]];

  function refreshLinkIdOptions(form) {
    const lk = form.querySelector(".nu-lk").value;
    const wrap = form.querySelector(".nu-lk-id-wrap");
    const sel = form.querySelector(".nu-lk-id");
    const mods = (window.LENNY_MODULES || window.MODULES || []);
    let opts = "";
    if (lk === "module" || lk === "video") {
      opts = mods.map(m => '<option value="' + esc(m.id) + '">' + esc((m.num ? m.num + " · " : "") + (m.short || m.title)) + "</option>").join("");
    } else if (lk === "sector") {
      opts = SECTORS.map(s => '<option value="' + s[0] + '">' + s[1] + "</option>").join("");
    } else if (lk === "devoir") {
      opts = DEVOIRS.map(s => '<option value="' + s[0] + '">' + s[1] + "</option>").join("");
    }
    sel.innerHTML = opts;
    wrap.hidden = !opts;
  }

  function buildLinkFromForm(form) {
    const lk = form.querySelector(".nu-lk").value;
    if (!lk) return null;
    if (lk === "quiz") return { kind: "quiz", id: "" };
    const id = form.querySelector(".nu-lk-id").value;
    return { kind: lk, id };
  }

  function codeLineFor(entry) {
    const parts = [
      '    id: "' + entry.id + '"',
      '    type: "' + entry.type + '"',
      '    title: ' + JSON.stringify(entry.title),
    ];
    if (entry.desc) parts.push("    desc: " + JSON.stringify(entry.desc));
    parts.push('    date: "' + (entry.date || "").slice(0, 10) + '"');
    if (entry.link && entry.link.kind) {
      parts.push('    link: { kind: "' + entry.link.kind + '"' + (entry.link.id ? ', id: "' + entry.link.id + '"' : "") + " }");
    }
    return "  {\n" + parts.join(",\n") + ",\n  },";
  }

  /* ---------- panneau ---------- */
  function buildPanel() {
    if (panel) return panel;
    panel = document.createElement("div");
    panel.className = "nu-panel";
    panel.innerHTML =
      '<div class="nu-head">' +
        '<span class="nu-head-ttl">Nouveautés</span>' +
        (isAdmin() ? '<button type="button" class="nu-add">＋ Ajouter</button>' : "") +
      "</div>" +
      '<div class="nu-list"></div>';
    document.body.appendChild(panel);

    // modale d'ajout (admin) — appendue au body, centrée, spacieuse
    if (isAdmin()) {
      const wrap = document.createElement("div");
      wrap.innerHTML = adminFormHtml();
      adminModal = wrap.firstElementChild;
      document.body.appendChild(adminModal);
    }

    // clic sur une nouveauté
    panel.querySelector(".nu-list").addEventListener("click", (e) => {
      const del = e.target.closest("[data-del]");
      if (del) {
        e.stopPropagation();
        const id = del.getAttribute("data-del");
        removeUpdate(id).then(refresh);
        return;
      }
      const item = e.target.closest(".nu-item");
      if (!item) return;
      const id = item.getAttribute("data-id");
      const u = ITEMS.find(x => x.id === id);
      markClicked(id);
      renderBadge();
      item.classList.add("seen");
      const dot = item.querySelector(".nu-dot"); if (dot) dot.remove();
      if (u && openLink(u.link)) closePanel();
    });

    // formulaire admin
    if (isAdmin()) bindAdmin();

    // fermeture extérieure
    document.addEventListener("click", (e) => {
      if (!open) return;
      if (e.target.closest(".nu-panel") || e.target.closest("#notif-btn")) return;
      closePanel();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && open) closePanel(); });
    window.addEventListener("resize", position);
    window.addEventListener("scroll", () => { if (open) position(); }, true);
    return panel;
  }

  function openModal() {
    if (!adminModal) return;
    closePanel();
    adminModal.hidden = false;
    modalOpen = true;
    requestAnimationFrame(() => adminModal.classList.add("open"));
    const t = adminModal.querySelector(".nu-ttl"); if (t) setTimeout(() => t.focus(), 60);
  }
  function closeModal() {
    if (!adminModal) return;
    modalOpen = false;
    adminModal.classList.remove("open");
    setTimeout(() => { if (!modalOpen) adminModal.hidden = true; }, 200);
  }

  function bindAdmin() {
    const addBtn = panel.querySelector(".nu-add");
    const form = adminModal;
    addBtn.addEventListener("click", openModal);
    form.querySelector(".nu-modal-x").addEventListener("click", closeModal);
    form.querySelector(".nu-modal-backdrop").addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modalOpen) closeModal(); });

    form.querySelector(".nu-lk").addEventListener("change", () => refreshLinkIdOptions(form));
    // aligner le type vidéo avec un lien vidéo par défaut
    form.querySelector(".nu-type").addEventListener("change", () => {
      const t = form.querySelector(".nu-type").value;
      const lk = form.querySelector(".nu-lk");
      if (t === "video" && !lk.value) { lk.value = "video"; refreshLinkIdOptions(form); }
    });

    const msg = form.querySelector(".nu-admin-msg");
    const copyBtn = form.querySelector(".nu-copy");
    let lastEntry = null;

    form.querySelector(".nu-publish").addEventListener("click", async () => {
      const title = form.querySelector(".nu-ttl").value.trim();
      if (!title) { msg.textContent = "Donne un titre à la nouveauté."; msg.className = "nu-admin-msg err"; return; }
      const entry = {
        type: form.querySelector(".nu-type").value,
        title,
        desc: form.querySelector(".nu-dsc").value.trim(),
        link: buildLinkFromForm(form),
      };
      const saved = await addUpdate(entry);
      lastEntry = saved;
      await refresh();
      msg.innerHTML = remote()
        ? "Publié et diffusé à tous les élèves. ✓"
        : "Ajouté sur cet appareil. ✓ Pour le diffuser à tous, copie la ligne dans <b>lenny-updates-data.js</b>.";
      msg.className = "nu-admin-msg ok";
      copyBtn.hidden = remote();
      // reset léger
      form.querySelector(".nu-ttl").value = "";
      form.querySelector(".nu-dsc").value = "";
    });

    copyBtn.addEventListener("click", async () => {
      if (!lastEntry) return;
      const line = codeLineFor(lastEntry);
      try { await navigator.clipboard.writeText(line); msg.textContent = "Ligne copiée — colle-la dans lenny-updates-data.js. ✓"; msg.className = "nu-admin-msg ok"; }
      catch (e) {
        // repli : sélectionne dans un textarea temporaire
        const ta = document.createElement("textarea"); ta.value = line; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e2) {}
        ta.remove(); msg.textContent = "Ligne copiée. ✓"; msg.className = "nu-admin-msg ok";
      }
    });
  }

  function position() {
    if (!btn || !panel) return;
    const r = btn.getBoundingClientRect();
    panel.style.top = (r.bottom + 12) + "px";
    panel.style.right = Math.max(12, window.innerWidth - r.right) + "px";
  }

  function openPanel() {
    buildPanel();
    renderList();
    position();
    open = true;
    panel.classList.add("open");
    btn.classList.add("nu-active");
  }
  function closePanel() {
    open = false;
    if (panel) panel.classList.remove("open");
    if (btn) btn.classList.remove("nu-active");
  }
  function toggle() { open ? closePanel() : openPanel(); }

  /* ---------- rafraîchissement ---------- */
  async function refresh() {
    ITEMS = await fetchList();
    renderBadge();
    if (open && panel) renderList();
  }

  /* ---------- init ---------- */
  function init() {
    btn = document.getElementById("notif-btn");
    if (!btn) return;
    ensureBadge();
    btn.addEventListener("click", (e) => { e.stopPropagation(); toggle(); });
    refresh();
    // re-calcule l'état « cliqué » et l'admin quand l'identité change (connexion)
    document.addEventListener("lenny-auth", () => {
      // le panneau dépend de isAdmin : on le reconstruit au besoin
      if (panel) { panel.remove(); panel = null; open = false; }
      if (adminModal) { adminModal.remove(); adminModal = null; modalOpen = false; }
      refresh();
    });
  }

  window.LennyUpdates = { refresh, add: addUpdate, list: () => ITEMS.slice() };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
