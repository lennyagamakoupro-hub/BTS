/* ============================================
   LENNY — Mini Diaporama (manual slideshow, no timer)
   One slide per deep-dive chapter, rich layout with all sections.
   Depends on: LENNY_MODULES (lenny-app.js), DEEPDIVE (deep-dive-data.js)
   ============================================ */

(function () {
  const COLOR_MAP = {
    m1:   ["#c95636", "#8a3520"],
    m2:   ["#2f5d7a", "#1a3550"],
    m3:   ["#3d6b48", "#1a3d28"],
    m4:   ["#b58430", "#7a5520"],
    m5:   ["#7a3a51", "#4a1f33"],
    m6:   ["#c95636", "#8a3520"],
    m6b:  ["#8a3520", "#4a1a10"],
    m8:   ["#2f5d7a", "#1a3550"],
    m11:  ["#3d6b48", "#2a5a36"],
    mdroit: ["#574a86", "#2e2752"],
    mprop: ["#5a4a7a", "#322648"],
    mdsources: ["#2f5d7a", "#1a3550"],
    mddeonto: ["#7a3a51", "#4a1f33"],
    mdjustice: ["#8a3520", "#4a1a10"],
    mdfamille: ["#c95636", "#8a3520"],
    mdpreuve: ["#b58430", "#7a5520"],
    mdcontrats: ["#3d6b48", "#1a3d28"],
    mvert: ["#3f6b4a", "#1f3d29"],
    murba: ["#3f6585", "#21384d"],
    mville: ["#2f7d72", "#173f39"],
    mperso: ["#3f6b4a", "#1f3d29"],
    msyn: ["#b58430", "#7a5520"]
  };

  const S = { modId: null, mod: null, scenes: [], idx: 0, bingeQueue: [], bingeTimer: null, auto: false, autoTimer: null, speed: 1 };

  // ----- lecture auto + vitesse + plein écran -----
  const SPEED_KEY = "lenny-player-speed";
  const AUTO_SPEEDS = [1, 1.5, 2];
  function restoreSpeed() {
    try { const r = parseFloat(localStorage.getItem(SPEED_KEY)); return AUTO_SPEEDS.includes(r) ? r : 1; } catch (e) { return 1; }
  }
  function reflectSpeed() {
    const tx = document.getElementById("lp-speed-tx");
    if (tx) tx.textContent = S.speed + "\u00d7";
    const btn = document.getElementById("lp-speed");
    if (btn) btn.classList.toggle("active", S.speed !== 1);
  }
  function cycleAutoSpeed() {
    S.speed = AUTO_SPEEDS[(AUTO_SPEEDS.indexOf(S.speed) + 1) % AUTO_SPEEDS.length];
    try { localStorage.setItem(SPEED_KEY, String(S.speed)); } catch (e) {}
    reflectSpeed();
    if (S.auto) scheduleAuto(); // réapplique le rythme immédiatement
  }
  function clearAuto() { if (S.autoTimer) { clearTimeout(S.autoTimer); S.autoTimer = null; } }
  function scheduleAuto() {
    clearAuto();
    if (!S.auto) return;
    // stop net à la dernière diapo
    if (S.idx >= S.scenes.length - 1) { setAuto(false); return; }
    const slot = document.getElementById("lp-scene");
    const len = slot ? (slot.textContent || "").trim().length : 400;
    // temps de lecture estimé, borné, ajusté par la vitesse
    let ms = Math.min(26000, Math.max(5000, 3500 + len * 20)) / S.speed;
    S.autoTimer = setTimeout(() => { if (S.auto) next(); }, ms);
  }
  function setAuto(on) {
    S.auto = !!on;
    const btn = document.getElementById("lp-auto");
    if (btn) btn.classList.toggle("on", S.auto);
    const el = document.getElementById("lp");
    if (el) el.classList.toggle("lp-autoplaying", S.auto);
    if (S.auto) {
      // si on est déjà à la fin, on repart du début
      if (S.idx >= S.scenes.length - 1) { S.idx = 0; renderScene("left"); }
      else scheduleAuto();
    } else {
      clearAuto();
    }
  }
  function reflectFull() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    const el = document.getElementById("lp");
    if (el) el.classList.toggle("lp-fs", !!fsEl);
  }
  function toggleFull() {
    const el = document.getElementById("lp");
    if (!el) return;
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) {
      try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {}
      return;
    }
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) { try { const p = req.call(el); if (p && p.catch) p.catch(() => {}); } catch (e) {} }
  }

  // ----- Build slides -----
  // Pour les modules sans DEEP-DIVE rédigé, on reconstruit des chapitres riches
  // à partir de l'Essentiel (à-retenir + frise), des fiches et des mémos.
  function buildFallbackChapters(modId, mod) {
    const out = [];
    const ess = (window.ESSENTIALS || {})[modId] || {};
    const retenir = ess.retenir || [];
    const timeline = ess.timeline || [];
    const cards = (window.STUDY || {})[modId]?.cards || [];
    const memo = (window.MEMOS || []).find(m => m.mod === modId);

    if (retenir.length) {
      out.push({
        title: "L'essentiel à retenir",
        lede: mod.quote || mod.desc || "Les points clés du module.",
        sections: retenir.map(r => ({ h: r.k, b: r.v })),
        linked: []
      });
    }
    if (timeline.length) {
      out.push({
        title: "Repères & dates clés",
        lede: "La chronologie et les références à mémoriser.",
        sections: timeline.map(t => ({ h: t.y, b: t.t })),
        linked: []
      });
    }
    if (cards.length) {
      out.push({
        title: "Les fiches",
        lede: "Toutes les fiches du module, question par question.",
        sections: cards.map(c => ({ h: c.q, b: c.a })),
        linked: []
      });
    }
    if (memo && memo.cards && memo.cards.length) {
      out.push({
        title: "Mémo express",
        lede: "Formules, sigles et règles d'or à garder en tête.",
        sections: memo.cards.map(c => ({ h: c.h, list: c.items || [] })),
        linked: []
      });
    }
    if (!out.length) {
      out.push({ title: mod.title, lede: mod.desc || "", sections: [], linked: [] });
    }
    return out;
  }

  function buildScenes(modId, mod) {
    // Chapitres = deep-dive rédigé si présent, sinon repli (essentiel + fiches + mémos)
    let chapters = Object.values(window.DEEPDIVE || {}).filter(d => d.mod === modId);
    if (chapters.length === 0) chapters = buildFallbackChapters(modId, mod);

    const scenes = [];
    scenes.push({ type: "cover", mod, dds: chapters });

    chapters.forEach((dd, i) => {
      scenes.push({
        type: "chapter",
        idx: i + 1, total: chapters.length,
        title: dd.title, lede: dd.lede,
        sections: dd.sections || [], linked: dd.linked || []
      });
    });

    scenes.push({ type: "outro", mod, total: chapters.length });
    return scenes;
  }

  // ----- DOM -----
  function build() {
    if (document.getElementById("lp")) return;
    const el = document.createElement("div");
    el.id = "lp";
    el.className = "lp";
    el.innerHTML = `
      <div class="lp-photo" id="lp-photo"></div>
      <div class="lp-bg"></div>
      <div class="lp-particles" id="lp-particles"></div>
      <div class="lp-grain"></div>
      <div class="lp-watermark" id="lp-watermark">€</div>
      <div class="lp-vignette"></div>

      <div class="lp-top">
        <button class="lp-close" id="lp-close" title="Quitter (Échap)">
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
        </button>
        <div class="lp-binge-badge" id="lp-binge-badge" title="Marathon en cours">
          <svg viewBox="0 0 12 12" fill="currentColor"><path d="M6.5 1 L3 7 H5.5 L4.5 11 L8.5 5 H6 L6.5 1 Z"/></svg>
          BINGE
        </div>
        <div class="lp-progress" id="lp-progress"></div>
        <div class="lp-counter">
          <div class="lp-counter-num" id="lp-counter-num"><span>01</span></div>
          <div class="lp-counter-total" id="lp-counter-total">/ 10</div>
        </div>
        <div class="lp-tools">
          <button class="lp-tool" id="lp-auto" title="Lecture auto (P)" aria-label="Lecture automatique">
            <svg class="ic-play" viewBox="0 0 18 18" fill="currentColor"><path d="M5 3 L15 9 L5 15 Z"/></svg>
            <svg class="ic-pause" viewBox="0 0 18 18" fill="currentColor"><rect x="4" y="3" width="3.4" height="12" rx="1"/><rect x="10.6" y="3" width="3.4" height="12" rx="1"/></svg>
          </button>
          <button class="lp-tool lp-tool-speed" id="lp-speed" title="Vitesse de défilement" aria-label="Vitesse de défilement"><span id="lp-speed-tx">1×</span></button>
          <button class="lp-tool" id="lp-full" title="Plein écran (F)" aria-label="Plein écran">
            <svg class="ic-fs" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,6.5 3,3 6.5,3"/><polyline points="11.5,3 15,3 15,6.5"/><polyline points="15,11.5 15,15 11.5,15"/><polyline points="6.5,15 3,15 3,11.5"/></svg>
            <svg class="ic-fs-exit" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="6.5,3 6.5,6.5 3,6.5"/><polyline points="15,6.5 11.5,6.5 11.5,3"/><polyline points="11.5,15 11.5,11.5 15,11.5"/><polyline points="3,11.5 6.5,11.5 6.5,15"/></svg>
          </button>
        </div>
      </div>

      <div class="lp-stage">
        <div class="lp-eyebrow" id="lp-eyebrow">
          <span class="L">L</span> · FICHE DE RÉVISION
          <span class="dot"></span>
          <span id="lp-modlabel">Module · …</span>
        </div>
        <div class="lp-scene" id="lp-scene"></div>
      </div>

      <button class="lp-nav lp-nav-prev" id="lp-prev" aria-label="Précédent">
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11,3 5,9 11,15"/></svg>
      </button>
      <button class="lp-nav lp-nav-next" id="lp-next" aria-label="Suivant">
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7,3 13,9 7,15"/></svg>
      </button>

      <div class="lp-bottom">
        <div class="lp-module">
          <div class="lp-module-tag" id="lp-tag">Diapo 01</div>
          <div class="lp-module-title" id="lp-title">…</div>
        </div>
        <div class="lp-hint">
          <span class="lp-key">←</span><span class="lp-key">→</span> naviguer
          <span class="dot"></span>
          <span class="lp-key">Échap</span> quitter
        </div>
      </div>
    `;
    document.body.appendChild(el);

    document.getElementById("lp-close").addEventListener("click", close);
    document.getElementById("lp-prev").addEventListener("click", prev);
    document.getElementById("lp-next").addEventListener("click", next);
    document.getElementById("lp-auto").addEventListener("click", () => setAuto(!S.auto));
    document.getElementById("lp-speed").addEventListener("click", cycleAutoSpeed);
    document.getElementById("lp-full").addEventListener("click", toggleFull);
    document.addEventListener("fullscreenchange", reflectFull);
    document.addEventListener("webkitfullscreenchange", reflectFull);

    document.addEventListener("keydown", (e) => {
      if (!el.classList.contains("open")) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
      else if (e.key === "Home") { e.preventDefault(); S.idx = 0; renderScene("left"); }
      else if (e.key === "End") { e.preventDefault(); S.idx = S.scenes.length - 1; renderScene("right"); }
      else if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFull(); }
      else if (e.key === "p" || e.key === "P") { e.preventDefault(); setAuto(!S.auto); }
    });

    // Particles
    const pc = document.getElementById("lp-particles");
    for (let i = 0; i < 22; i++) {
      const p = document.createElement("div");
      p.className = "lp-particle" + (i % 4 === 0 ? " lg" : "");
      p.style.left = (Math.random() * 100) + "%";
      p.style.bottom = (-10 - Math.random() * 50) + "px";
      p.style.setProperty("--d", (16 + Math.random() * 18) + "s");
      p.style.setProperty("--mx", (Math.random() * 80 - 40) + "px");
      p.style.setProperty("--o", (.25 + Math.random() * .5));
      p.style.animationDelay = (-Math.random() * 18) + "s";
      pc.appendChild(p);
    }
  }

  // ----- helpers -----
  function pad(n) { return String(n).padStart(2, "0"); }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function bumpCounter() {
    document.getElementById("lp-counter-num").innerHTML = `<span>${pad(S.idx + 1)}</span>`;
  }

  // ----- open/close -----
  function open(modId, opts = {}) {
    build();
    const mod = LENNY_MODULES.find(m => m.id === modId);
    if (!mod) return;
    const scenes = buildScenes(modId, mod);
    if (scenes.length <= 2) {
      // No content for this module — skip ahead if in binge mode
      if (S.bingeQueue && S.bingeQueue.length) {
        const nextId = S.bingeQueue.shift();
        return open(nextId, { bingeContinue: true });
      }
      alert("Pas encore de cours rédigé pour ce module.");
      return;
    }
    if (!opts.bingeContinue) {
      // Fresh open — wipe binge unless caller set it
      if (opts.bingeQueue) S.bingeQueue = [...opts.bingeQueue];
      else S.bingeQueue = [];
    }
    if (S.bingeTimer) { clearTimeout(S.bingeTimer); S.bingeTimer = null; }
    S.modId = modId; S.mod = mod; S.scenes = scenes; S.idx = 0;

    const [c1, c2] = COLOR_MAP[modId] || ["#3d6b48", "#2a5a36"];
    document.documentElement.style.setProperty("--lp-glow", c1);
    document.documentElement.style.setProperty("--lp-glow-2", c2);

    // Blurred module photo behind the glow
    const lpPhoto = document.getElementById("lp-photo");
    if (lpPhoto) {
      const photoClass = window.modPhotoClass && window.modPhotoClass(modId);
      lpPhoto.className = "lp-photo" + (photoClass ? " on " + photoClass : "");
    }

    document.getElementById("lp-modlabel").textContent = `${mod.tag} · ${mod.short}`;
    document.getElementById("lp-counter-total").textContent = `/ ${pad(scenes.length)}`;
    document.getElementById("lp-watermark").textContent = mod.symbol || "·";

    // Binge badge
    const bingeBadge = document.getElementById("lp-binge-badge");
    if (bingeBadge) bingeBadge.classList.toggle("on", S.bingeQueue.length > 0);

    // progress segments — clickable for jump
    const prog = document.getElementById("lp-progress");
    prog.innerHTML = scenes.map((_, i) => `<i class="lp-seg" data-jump="${i}" title="Diapo ${i + 1}"></i>`).join("");
    prog.querySelectorAll(".lp-seg").forEach(s => {
      s.addEventListener("click", () => {
        const j = parseInt(s.dataset.jump, 10);
        const dir = j > S.idx ? "right" : "left";
        S.idx = j; renderScene(dir);
      });
    });

    document.getElementById("lp").classList.add("open");
    document.body.style.overflow = "hidden";
    S.speed = restoreSpeed(); reflectSpeed();
    setAuto(false);
    renderScene("right");
  }

  function openBinge(queue) {
    const q = [...queue];
    const first = q.shift();
    open(first, { bingeQueue: q });
  }

  function close(skipSplash = false) {
    if (S.bingeTimer) { clearTimeout(S.bingeTimer); S.bingeTimer = null; }
    clearAuto(); S.auto = false;
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) { try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {} }
    S.bingeQueue = [];
    const el = document.getElementById("lp");
    if (el) el.classList.remove("open", "lp-autoplaying");
    document.body.style.overflow = "";
    if (!skipSplash && window.LennySplash) window.LennySplash(1100);
  }

  // ----- render -----
  function renderScene(direction = "right") {
    const scene = S.scenes[S.idx];
    if (!scene) return;

    const slot = document.getElementById("lp-scene");
    slot.classList.remove("enter-from-right", "enter-from-left");
    void slot.offsetWidth;
    slot.classList.add(direction === "right" ? "enter-from-right" : "enter-from-left");
    slot.setAttribute("data-type", scene.type);
    slot.scrollTop = 0;

    let html = "";
    if (scene.type === "cover") {
      const m = scene.mod;
      html = `
        <div class="lp-cover">
          <div class="lp-cover-l">
            <div class="lp-chapter-eye"><span class="L">L</span> · ORIGINAL · ${escapeHtml(m.tag)}</div>
            <h1 class="lp-h-xl">${escapeHtml(m.title)}</h1>
            <div class="lp-lede">${escapeHtml(m.quote || m.desc)}</div>
            <div class="lp-cover-meta">
              <div class="lp-meta-pill"><strong>${scene.dds.length}</strong> chapitres</div>
              <div class="lp-meta-pill"><strong>${m.time}</strong> min</div>
              <div class="lp-meta-pill lp-meta-red">BTS PI · ${escapeHtml(m.season)}</div>
            </div>
          </div>
          <div class="lp-cover-r">
            <div class="lp-toc-eye">Sommaire</div>
            <ol class="lp-toc">
              ${scene.dds.map((dd, i) => `
                <li class="lp-toc-item" data-jump="${i + 1}" style="animation-delay:${300 + i * 80}ms">
                  <span class="lp-toc-num">${pad(i + 1)}</span>
                  <span class="lp-toc-body">
                    <span class="lp-toc-title">${escapeHtml(dd.title)}</span>
                    <span class="lp-toc-lede">${escapeHtml(dd.lede)}</span>
                  </span>
                  <span class="lp-toc-arrow">→</span>
                </li>
              `).join("")}
            </ol>
          </div>
        </div>
      `;
    } else if (scene.type === "chapter") {
      const useGrid = scene.sections.length >= 4;
      html = `
        <div class="lp-chap">
          <aside class="lp-chap-l">
            <div class="lp-lede">${escapeHtml(scene.lede || "")}</div>

            ${scene.linked.length ? `
              <div class="lp-chap-links">
                <div class="lp-chap-links-h">Concepts liés</div>
                <div class="lp-chap-pills">
                  ${scene.linked.map(slug => {
                    const lk = (window.DEEPDIVE || {})[slug];
                    return lk ? `<button class="lp-pill" data-jump-slug="${escapeHtml(slug)}">${escapeHtml(lk.title)}</button>` : "";
                  }).join("")}
                </div>
              </div>
            ` : ""}

            <div class="lp-chap-tip">
              <span class="lp-tip-mark">★</span>
              <span>${escapeHtml(quickTip(scene))}</span>
            </div>
          </aside>

          <main class="lp-chap-r${useGrid ? " cols-2" : ""}">
            ${scene.sections.map((sec, i) => {
              const isList = sec.list && sec.list.length;
              return `
              <section class="lp-sec${isList ? " wide" : ""}" style="animation-delay:${180 + i * 90}ms">
                <h3 class="lp-sec-h">
                  <span class="lp-sec-i">${pad(i + 1)}</span>
                  ${escapeHtml(sec.h)}
                </h3>
                ${sec.b ? `<p class="lp-sec-b">${escapeHtml(sec.b)}</p>` : ""}
                ${isList ? `
                  <ul class="lp-sec-list">
                    ${sec.list.map(it => `<li>${escapeHtml(it)}</li>`).join("")}
                  </ul>
                ` : ""}
              </section>
            `;}).join("")}
          </main>
        </div>
      `;
    } else if (scene.type === "outro") {
      const m = scene.mod;
      const nextId = S.bingeQueue[0];
      const nextMod = nextId ? LENNY_MODULES.find(m => m.id === nextId) : null;
      html = `
        <div class="lp-outro-inner">
          <div class="lp-outro-mark" aria-label="LENNY">
            <span class="brand-letter">L</span><span class="brand-letter">E</span><span class="brand-letter">N</span><span class="brand-letter">N</span><span class="brand-letter">Y</span>
          </div>
          <div class="lp-chapter-eye"><span class="L">L</span> · ORIGINAL · ${escapeHtml(m.tag)}</div>
          <h1 class="lp-h-xl">Fin du diaporama</h1>
          <div class="lp-lede">${escapeHtml(m.title)} — ${scene.total} chapitre${scene.total > 1 ? "s" : ""} parcouru${scene.total > 1 ? "s" : ""}.</div>
          <div class="lp-outro-stats">
            <div class="lp-finale-stat"><div class="lp-finale-stat-v">${m.time}<small>min</small></div><div class="lp-finale-stat-k">Durée</div></div>
            <div class="lp-finale-stat"><div class="lp-finale-stat-v">${scene.total}</div><div class="lp-finale-stat-k">Chapitres</div></div>
          </div>

          ${nextMod ? `
            <div class="lp-upnext">
              <div class="lp-upnext-eye">À suivre dans <span id="lp-upnext-c">5</span>s</div>
              <div class="lp-upnext-card art-${nextMod.color}">
                <div class="lp-upnext-meta">
                  <span class="lp-upnext-tag"><span class="L">L</span> · ORIGINAL · ${escapeHtml(nextMod.tag)}</span>
                  <span class="lp-upnext-pct">${nextMod.time} min</span>
                </div>
                <div class="lp-upnext-title">${escapeHtml(nextMod.title)}</div>
                <div class="lp-upnext-desc">${escapeHtml(nextMod.desc)}</div>
                <div class="lp-upnext-actions">
                  <button class="ld-btn ld-btn-primary" id="lp-binge-next">▸ Lancer maintenant</button>
                  <button class="ld-btn ld-btn-secondary" id="lp-binge-cancel">Arrêter le binge</button>
                </div>
              </div>
            </div>
          ` : `
            <div class="lp-outro-actions">
              <button class="ld-btn ld-btn-primary"   id="lp-restart">↻ Rejouer</button>
              <button class="ld-btn ld-btn-secondary" id="lp-detail">Voir la fiche</button>
              <button class="ld-btn ld-btn-secondary" id="lp-quiz">Quiz du module</button>
              <button class="ld-btn ld-btn-secondary" id="lp-close-2">Retour</button>
            </div>
          `}
        </div>
      `;
    }
    slot.innerHTML = html;

    // Hookup ToC jump
    slot.querySelectorAll("[data-jump]").forEach(li => {
      li.addEventListener("click", () => {
        const j = parseInt(li.dataset.jump, 10);
        if (!isNaN(j)) { S.idx = j; renderScene("right"); }
      });
    });
    slot.querySelectorAll("[data-jump-slug]").forEach(b => {
      b.addEventListener("click", () => {
        const slug = b.dataset.jumpSlug;
        const i = S.scenes.findIndex(sc => sc.type === "chapter" && sc.title === (window.DEEPDIVE || {})[slug]?.title);
        if (i >= 0) { const dir = i > S.idx ? "right" : "left"; S.idx = i; renderScene(dir); }
      });
    });

    // Outro buttons
    const restart = document.getElementById("lp-restart");
    if (restart) restart.addEventListener("click", () => { S.idx = 0; renderScene("left"); });
    const detail = document.getElementById("lp-detail");
    if (detail) detail.addEventListener("click", () => { close(true); setTimeout(() => window.LennyDetail.open(S.modId), 250); });
    const quiz = document.getElementById("lp-quiz");
    if (quiz) quiz.addEventListener("click", () => {
      close(true);
      setTimeout(() => {
        window.LennyDetail.open(S.modId);
        setTimeout(() => document.querySelector(".ld-tab[data-tab='quiz']")?.click(), 350);
      }, 250);
    });
    const close2 = document.getElementById("lp-close-2");
    if (close2) close2.addEventListener("click", close);

    // Binge "next" wiring
    const bingeNext = document.getElementById("lp-binge-next");
    if (bingeNext) bingeNext.addEventListener("click", () => {
      if (S.bingeTimer) { clearTimeout(S.bingeTimer); S.bingeTimer = null; }
      const nextId = S.bingeQueue.shift();
      if (nextId) open(nextId, { bingeContinue: true });
    });
    const bingeCancel = document.getElementById("lp-binge-cancel");
    if (bingeCancel) bingeCancel.addEventListener("click", () => {
      if (S.bingeTimer) { clearTimeout(S.bingeTimer); S.bingeTimer = null; }
      S.bingeQueue = [];
      close();
    });

    // Auto-countdown for binge
    if (scene.type === "outro" && S.bingeQueue.length) {
      let n = 5;
      const c = document.getElementById("lp-upnext-c");
      const tick = () => {
        n--;
        if (c) c.textContent = String(n);
        if (n <= 0) {
          if (S.bingeTimer) { clearTimeout(S.bingeTimer); S.bingeTimer = null; }
          const nextId = S.bingeQueue.shift();
          if (nextId) open(nextId, { bingeContinue: true });
        } else {
          S.bingeTimer = setTimeout(tick, 1000);
        }
      };
      S.bingeTimer = setTimeout(tick, 1000);
    }

    // Bottom bar — chapter in progress only
    const tagEl = document.getElementById("lp-tag");
    const titleEl = document.getElementById("lp-title");
    if (scene.type === "cover") {
      tagEl.textContent = `Ouverture · Sommaire`;
      titleEl.textContent = "";
    } else if (scene.type === "outro") {
      tagEl.textContent = `Générique`;
      titleEl.textContent = "";
    } else {
      tagEl.textContent = `Chapitre ${pad(scene.idx)} · ${pad(scene.total)}`;
      titleEl.textContent = scene.title || "";
    }

    // progress segments
    document.querySelectorAll("#lp-progress .lp-seg").forEach((s, i) => {
      s.classList.toggle("done", i < S.idx);
      s.classList.toggle("on", i === S.idx);
      s.style.setProperty("--p", i === S.idx ? "100%" : (i < S.idx ? "100%" : "0%"));
    });
    bumpCounter();

    // Nav buttons enable/disable
    document.getElementById("lp-prev").disabled = (S.idx === 0);
    document.getElementById("lp-next").disabled = (S.idx === S.scenes.length - 1);

    // relance le minuteur de lecture auto sur la nouvelle diapo
    if (S.auto) scheduleAuto();
  }

  function quickTip(scene) {
    // Pull a punchy summary from the first list item or the first body
    for (const sec of scene.sections || []) {
      if (sec.list && sec.list.length) return sec.list[0];
      if (sec.b) {
        const s = sec.b.split(/[.!?]/)[0];
        if (s.length < 140) return s.trim() + ".";
      }
    }
    return "Lis chaque section, retiens le titre.";
  }

  function next() { if (S.idx < S.scenes.length - 1) { S.idx++; renderScene("right"); } }
  function prev() { if (S.idx > 0) { S.idx--; renderScene("left"); } }

  window.LennyPlayer = { open, openBinge, close };
})();
