/* ============================================
   LENNY — Avis 👍 / 👎 (pouce vert / pouce rouge)
   Usage : LennyFeedback.mount(targetEl, courseId, { label })
   Dépend de : LennyAPI
   ============================================ */
window.LennyFeedback = (function () {

  const UP_SVG = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7.5 8.6 11 1.8c.9 0 1.9.7 1.9 2 0 .9-.5 2.3-.8 3.1h3.7c1 0 1.8.8 1.8 1.8 0 .3-.1.6-.2.8.4.3.7.8.7 1.4 0 .5-.2.9-.5 1.2.2.3.3.6.3 1 0 .6-.3 1.1-.8 1.4.1.2.1.4.1.6 0 1-.8 1.8-1.8 1.8H9.2c-1 0-1.9-.3-2.7-.8V8.9c.4-.1.7-.2 1-.3ZM3 9h2.2v8.2H3A.9.9 0 0 1 2 16.3V9.9A.9.9 0 0 1 3 9Z"/></svg>';
  const DN_SVG = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style="transform:rotate(180deg)"><path d="M7.5 8.6 11 1.8c.9 0 1.9.7 1.9 2 0 .9-.5 2.3-.8 3.1h3.7c1 0 1.8.8 1.8 1.8 0 .3-.1.6-.2.8.4.3.7.8.7 1.4 0 .5-.2.9-.5 1.2.2.3.3.6.3 1 0 .6-.3 1.1-.8 1.4.1.2.1.4.1.6 0 1-.8 1.8-1.8 1.8H9.2c-1 0-1.9-.3-2.7-.8V8.9c.4-.1.7-.2 1-.3ZM3 9h2.2v8.2H3A.9.9 0 0 1 2 16.3V9.9A.9.9 0 0 1 3 9Z"/></svg>';

  function mount(target, courseId, opts) {
    opts = opts || {};
    if (!target || !courseId) return;
    // évite les doublons si on remonte le même widget
    const existing = target.querySelector(":scope > .lfb[data-course='" + cssEsc(courseId) + "']");
    if (existing) existing.remove();

    const el = document.createElement("div");
    el.className = "lfb";
    el.dataset.course = courseId;
    el.innerHTML = `
      <span class="lfb-label">${opts.label || "Ce contenu vous a-t-il été utile ?"}</span>
      <div class="lfb-btns">
        <button class="lfb-btn lfb-up" data-vote="up" aria-pressed="false" title="Pertinent">
          <span class="lfb-ic">${UP_SVG}</span><span class="lfb-n" data-up>—</span>
        </button>
        <button class="lfb-btn lfb-down" data-vote="down" aria-pressed="false" title="À améliorer">
          <span class="lfb-ic">${DN_SVG}</span><span class="lfb-n" data-down>—</span>
        </button>
      </div>
      <span class="lfb-thanks" hidden>Merci pour votre retour</span>
    `;
    target.appendChild(el);

    const upBtn = el.querySelector(".lfb-up");
    const dnBtn = el.querySelector(".lfb-down");
    const upN = el.querySelector("[data-up]");
    const dnN = el.querySelector("[data-down]");
    const thanks = el.querySelector(".lfb-thanks");

    function paint(state) {
      upN.textContent = state.up;
      dnN.textContent = state.down;
      upBtn.classList.toggle("active", state.mine === "up");
      dnBtn.classList.toggle("active", state.mine === "down");
      upBtn.setAttribute("aria-pressed", String(state.mine === "up"));
      dnBtn.setAttribute("aria-pressed", String(state.mine === "down"));
      thanks.hidden = !state.mine;
    }

    let busy = false;
    async function vote(v) {
      if (busy) return; busy = true;
      const btn = v === "up" ? upBtn : dnBtn;
      btn.classList.add("pop");
      setTimeout(() => btn.classList.remove("pop"), 280);
      try { paint(await LennyAPI.sendFeedback(courseId, v)); }
      finally { busy = false; }
    }
    upBtn.addEventListener("click", () => vote("up"));
    dnBtn.addEventListener("click", () => vote("down"));

    LennyAPI.getFeedback(courseId).then(paint);
    return el;
  }

  function cssEsc(s) { return String(s).replace(/['"\\]/g, "\\$&"); }

  return { mount };
})();
