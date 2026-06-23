/* ============================================
   LENNY — Façade haussmannienne (progression signature)
   Un immeuble dont chaque fenêtre = un module. La fenêtre s'allume
   quand l'élève a une activité de quiz sur ce module. Toit mansardé,
   balcons en fer forgé : repère visuel propre à LENNY.
   Dépend de : MODULES, lenny-quiz-history-v1 (LennyAPI), LennySRS (option)
   ============================================ */
(function () {
  "use strict";

  function mods() { return (window.MODULES || []).filter(m => {
    const qs = (window.QUIZ && window.QUIZ[m.id]) || (window.STUDY && window.STUDY[m.id] && window.STUDY[m.id].quiz) || [];
    return qs.length > 0;
  }); }

  function engagedSet() {
    const set = {};
    try {
      const hist = JSON.parse(localStorage.getItem("lenny-quiz-history-v1")) || [];
      hist.forEach(h => {
        // une fenêtre s'allume dès qu'un module dépasse 60 % de réussite cumulée
        const id = h.moduleId;
        set[id] = set[id] || { c: 0, t: 0 };
        set[id].c += h.correct | 0; set[id].t += h.total | 0;
      });
    } catch (e) {}
    const lit = {};
    Object.keys(set).forEach(id => { if (set[id].t > 0 && set[id].c / set[id].t >= 0.6) lit[id] = true; });
    return { lit, raw: set };
  }

  function buildSection() {
    const mount = document.getElementById("progress-facade-mount");
    if (mount) {
      let sec = document.getElementById("facade-home");
      if (sec) return sec;
      sec = document.createElement("section");
      sec.className = "facade-home";
      sec.id = "facade-home";
      mount.appendChild(sec);
      return sec;
    }
    const home = document.getElementById("view-home");
    if (!home) return null;
    let sec = document.getElementById("facade-home");
    if (sec) return sec;
    sec = document.createElement("section");
    sec.className = "facade-home";
    sec.id = "facade-home";
    // insère après le bandeau SRS s'il existe, sinon avant "Reprendre"
    const srs = document.getElementById("srs-home");
    const cont = document.getElementById("continue");
    if (srs && srs.parentNode === home) srs.after(sec);
    else if (cont && cont.parentNode === home) home.insertBefore(sec, cont);
    else home.appendChild(sec);
    return sec;
  }

  function windowsHtml(list, lit) {
    return list.map((m, i) => {
      const on = !!lit[m.id];
      return `<button class="fc-win${on ? " on" : ""}" data-fc-mod="${m.id}" title="${m.title}${on ? " · acquis" : ""}" style="--wc:${m.color || "#d7a13c"}">
        <span class="fc-win-glow"></span>
        <span class="fc-win-pane"><i></i><i></i></span>
        <span class="fc-win-rail"></span>
        <span class="fc-win-label">${m.short || m.title}</span>
      </button>`;
    }).join("");
  }

  function render() {
    const sec = buildSection();
    if (!sec) return;
    const list = mods();
    if (!list.length) { sec.remove(); return; }
    const { lit } = engagedSet();
    const litCount = list.filter(m => lit[m.id]).length;
    const pct = Math.round(litCount / list.length * 100);
    sec.innerHTML = `
      <div class="fc-wrap">
        <div class="fc-head">
          <div>
            <div class="fc-kicker">Votre progression</div>
            <h2 class="fc-h">L'immeuble se rallume à chaque module acquis</h2>
            <p class="fc-sub">${litCount} module${litCount > 1 ? "s" : ""} sur ${list.length} maîtrisé${litCount > 1 ? "s" : ""} — une fenêtre s'allume dès 60 % de réussite au quiz.</p>
          </div>
          <div class="fc-meter">
            <div class="fc-meter-pct">${pct}<small>%</small></div>
            <div class="fc-meter-bar"><i style="width:${pct}%"></i></div>
          </div>
        </div>
        <div class="fc-building">
          <div class="fc-roof"><span class="fc-chimney"></span><span class="fc-chimney c2"></span><span class="fc-dormer"></span></div>
          <div class="fc-cornice"></div>
          <div class="fc-facade">
            <div class="fc-windows">${windowsHtml(list, lit)}</div>
          </div>
          <div class="fc-ground">
            <span class="fc-door"></span>
            <span class="fc-awning"></span>
            <span class="fc-shop">LENNY · IMMOBILIER</span>
          </div>
        </div>
      </div>`;
    sec.querySelectorAll("[data-fc-mod]").forEach(b => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-fc-mod");
        if (window.LennyDetail) window.LennyDetail.open(id);
      });
    });
  }

  function refresh() { try { render(); } catch (e) {} }

  function init() {
    refresh();
    // se met à jour quand une session de quiz est enregistrée
    if (window.LennyAPI && typeof LennyAPI.recordQuizResult === "function" && !LennyAPI.__facadeWrapped) {
      const orig = LennyAPI.recordQuizResult;
      LennyAPI.recordQuizResult = function () { const r = orig.apply(this, arguments); setTimeout(refresh, 30); return r; };
      LennyAPI.__facadeWrapped = true;
    }
    document.addEventListener("lenny-auth", () => setTimeout(refresh, 100));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(init, 140));
  else setTimeout(init, 140);

  window.LennyFacade = { refresh };
})();
