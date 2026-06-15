/* ============================================
   LENNY — Menu profil (avatar LN) : identité + déconnexion
   Dépend de lenny-gate.js (window.LennyAuth + event "lenny-auth").
   ============================================ */
(function () {
  // ---- Styles (injectés) ----
  const css = `
  .avatar { cursor: pointer; user-select: none; position: relative; transition: transform .15s ease, box-shadow .15s ease; }
  .avatar:hover { transform: scale(1.06); }
  .avatar.lp-open { box-shadow: 0 0 0 2px rgba(255,255,255,.85); }
  .lp-menu {
    position: fixed; z-index: 4000;
    min-width: 248px; max-width: 88vw;
    background: #0c0c0e; color: #fff;
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 14px;
    box-shadow: 0 24px 60px -16px rgba(0,0,0,.8), 0 2px 0 rgba(255,255,255,.04) inset;
    padding: 8px;
    opacity: 0; transform: translateY(-8px) scale(.98);
    transform-origin: top right; pointer-events: none;
    transition: opacity .16s ease, transform .16s ease;
    font-family: "Inter", system-ui, sans-serif;
  }
  .lp-menu.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
  .lp-head { display: flex; align-items: center; gap: 12px; padding: 12px 12px 14px; }
  .lp-ava {
    width: 44px; height: 44px; flex: 0 0 44px; border-radius: 10px;
    display: grid; place-items: center;
    font-weight: 800; font-size: 16px; letter-spacing: .02em;
    background: linear-gradient(135deg,#f5c518,#e8a020); color: #1a1205;
  }
  .lp-id { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .lp-name { font-size: 15px; font-weight: 700; line-height: 1.1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .lp-role {
    font-family: "IBM Plex Mono", monospace; font-size: 10px;
    letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.5);
  }
  .lp-div { height: 1px; background: rgba(255,255,255,.1); margin: 2px 6px 6px; }
  .lp-item {
    display: flex; align-items: center; gap: 10px;
    width: 100%; text-align: left;
    background: transparent; border: 0; cursor: pointer;
    color: #fff; font-family: inherit; font-size: 13.5px; font-weight: 500;
    padding: 11px 12px; border-radius: 9px;
    transition: background .13s ease;
  }
  .lp-item:hover { background: rgba(255,255,255,.08); }
  .lp-item.logout { color: #ff6b6e; }
  .lp-item.logout:hover { background: rgba(229,9,20,.14); }
  .lp-item svg { width: 16px; height: 16px; flex: 0 0 16px; }
  @media (max-width: 640px) { .lp-menu { right: 12px !important; min-width: 220px; } }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  let menu = null;
  let auth = window.LennyAuth || null;

  function buildMenu() {
    if (menu) return menu;
    menu = document.createElement("div");
    menu.className = "lp-menu";
    document.body.appendChild(menu);
    // close on outside click / Esc
    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("open")) return;
      const av = document.querySelector(".avatar");
      if (e.target.closest(".lp-menu") || (av && e.target.closest(".avatar"))) return;
      closeMenu();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
    window.addEventListener("resize", positionMenu);
    window.addEventListener("scroll", () => { if (menu.classList.contains("open")) positionMenu(); }, true);
    return menu;
  }

  function renderMenu() {
    const a = auth || {};
    const name = a.name || "Élève";
    const role = a.isAdmin ? "Administrateur" : "Profil élève · BTS PI";
    const ini = a.initials || "LN";
    menu.innerHTML = `
      <div class="lp-head">
        <div class="lp-ava">${ini}</div>
        <div class="lp-id">
          <div class="lp-name">${escapeHtml(name)}</div>
          <div class="lp-role">${escapeHtml(role)}</div>
        </div>
      </div>
      <div class="lp-div"></div>
      <button class="lp-item logout" type="button" data-logout>
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5 V3.5 a1 1 0 0 0-1-1 H4 a1 1 0 0 0-1 1 v11 a1 1 0 0 0 1 1 h6 a1 1 0 0 0 1-1 V13"/>
          <path d="M7.5 9 H15 M12.5 6.5 L15 9 L12.5 11.5"/>
        </svg>
        Se déconnecter
      </button>
    `;
    menu.querySelector("[data-logout]").addEventListener("click", () => {
      if (window.LennyAuth && window.LennyAuth.logout) window.LennyAuth.logout();
    });
  }

  function positionMenu() {
    const av = document.querySelector(".avatar");
    if (!av || !menu) return;
    const r = av.getBoundingClientRect();
    menu.style.top = (r.bottom + 10) + "px";
    menu.style.right = Math.max(12, window.innerWidth - r.right) + "px";
  }

  function openMenu() {
    buildMenu(); renderMenu(); positionMenu();
    menu.classList.add("open");
    const av = document.querySelector(".avatar");
    if (av) av.classList.add("lp-open");
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    const av = document.querySelector(".avatar");
    if (av) av.classList.remove("lp-open");
  }
  function toggleMenu() {
    if (menu && menu.classList.contains("open")) closeMenu(); else openMenu();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function bindAvatar() {
    const av = document.querySelector(".avatar");
    if (!av) return;
    if (auth) {
      av.textContent = auth.initials || "LN";
      av.setAttribute("title", auth.name || "Profil");
    }
    av.setAttribute("role", "button");
    av.setAttribute("tabindex", "0");
    av.setAttribute("aria-label", "Profil et déconnexion");
    av.addEventListener("click", (e) => { e.stopPropagation(); toggleMenu(); });
    av.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleMenu(); } });
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  document.addEventListener("lenny-auth", (e) => {
    auth = e.detail || window.LennyAuth;
    const av = document.querySelector(".avatar");
    if (av && auth) { av.textContent = auth.initials || "LN"; av.setAttribute("title", auth.name || "Profil"); }
    if (menu && menu.classList.contains("open")) renderMenu();
  });

  // Bouton "Se déconnecter" du bas de page (footer) -> retour à l'écran d'identification
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-footer-logout]");
    if (!btn) return;
    e.preventDefault();
    if (window.LennyAuth && window.LennyAuth.logout) window.LennyAuth.logout();
  });

  ready(bindAvatar);
})();
