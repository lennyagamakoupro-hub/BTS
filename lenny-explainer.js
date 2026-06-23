/* ============================================
   LENNY — Explication animée (prototype)
   Motion-design overlay, façon "recap" Netflix.
   Prototype : module m11 (Financement — intérêts composés).
   Autonome : injecte son propre CSS. Mobile + reduced-motion.
   API : window.LennyExplainer.open(modId) · .has(modId)
   ============================================ */
(function () {
  // ---------- Données des scènes ----------
  // Les explainers de chaque module sont fournis par window.EXPLAINERS
  // (voir lenny-explainer-data.js / lenny-explainer-data2.js).
  // Types de scène : title · stat · compare · curve · formula · steps ·
  //                  pillars · list · barcompare · timeline · outro
  function getData() { return (window.EXPLAINERS && typeof window.EXPLAINERS === "object") ? window.EXPLAINERS : {}; }

  // ---------- Styles ----------
  const css = `
  #lex-ov { position: fixed; inset: 0; z-index: 5000; display: none; }
  #lex-ov.open { display: block; }
  .lex-stage {
    position: absolute; inset: 0;
    background:
      radial-gradient(120% 90% at 50% -10%, #11231a 0%, #0a0a0b 55%, #000 100%);
    overflow: hidden;
    font-family: "Inter", system-ui, sans-serif;
    color: #fff;
  }
  .lex-grain::after {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px);
    background-size: 16px 16px; opacity: .5;
  }
  .lex-scene {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; justify-content: center;
    padding: 7vh 8vw; max-width: 1100px; margin: 0 auto;
    opacity: 0; visibility: hidden;
    transition: opacity .6s ease;
  }
  .lex-scene.on { opacity: 1; visibility: visible; }
  .lex-eyebrow {
    font-family: "IBM Plex Mono", monospace;
    font-size: clamp(11px, 1.4vw, 14px);
    letter-spacing: .22em; text-transform: uppercase;
    color: var(--lex); margin-bottom: 18px;
    opacity: 0; transform: translateY(10px);
  }
  .lex-scene.on .lex-eyebrow { animation: lexUp .6s ease .1s forwards; }
  .lex-title {
    font-family: "Bebas Neue", "Inter", sans-serif;
    font-size: clamp(44px, 8vw, 104px); line-height: .92; letter-spacing: .01em;
    margin-bottom: 16px;
    opacity: 0; transform: translateY(16px);
  }
  .lex-scene.on .lex-title { animation: lexUp .7s cubic-bezier(.2,.7,.2,1) .22s forwards; }
  .lex-sub {
    font-size: clamp(17px, 2.4vw, 26px); color: rgba(255,255,255,.82);
    font-style: italic; max-width: 22ch; text-wrap: pretty;
    opacity: 0; transform: translateY(14px);
  }
  .lex-scene.on .lex-sub { animation: lexUp .7s ease .42s forwards; }
  .lex-cite { margin-top: 10px; font-size: 13px; color: rgba(255,255,255,.45); opacity: 0; }
  .lex-scene.on .lex-cite { animation: lexUp .7s ease .62s forwards; }

  /* stat */
  .lex-pre, .lex-post { font-size: clamp(18px, 2.6vw, 30px); color: rgba(255,255,255,.8); }
  .lex-bignum {
    font-family: "Bebas Neue", "Inter", sans-serif;
    font-size: clamp(72px, 16vw, 200px); line-height: .9; color: var(--lex);
    letter-spacing: .01em; margin: 6px 0;
    text-shadow: 0 0 40px color-mix(in oklab, var(--lex) 40%, transparent);
  }
  .lex-post { max-width: 26ch; text-wrap: pretty; opacity: 0; transform: translateY(10px); }
  .lex-scene.on .lex-post { animation: lexUp .6s ease .9s forwards; }

  /* compare */
  .lex-rows { display: flex; flex-direction: column; gap: 16px; margin: 8px 0 22px; max-width: 640px; }
  .lex-row {
    display: flex; align-items: baseline; justify-content: space-between; gap: 18px;
    padding: 18px 22px; border-radius: 14px;
    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
    opacity: 0; transform: translateX(-18px);
  }
  .lex-scene.on .lex-row { animation: lexIn .6s cubic-bezier(.2,.7,.2,1) forwards; }
  .lex-scene.on .lex-row:nth-child(1) { animation-delay: .3s; }
  .lex-scene.on .lex-row:nth-child(2) { animation-delay: .55s; }
  .lex-row.hot { border-color: color-mix(in oklab, var(--lex) 55%, transparent); background: color-mix(in oklab, var(--lex) 12%, rgba(255,255,255,.04)); }
  .lex-row.dim { opacity: .6; }
  .lex-scene.on .lex-row.dim { animation: lexInDim .6s cubic-bezier(.2,.7,.2,1) forwards; }
  .lex-row-l { display: flex; flex-direction: column; gap: 4px; }
  .lex-row-label { font-size: clamp(13px,1.7vw,16px); color: rgba(255,255,255,.75); font-weight: 600; }
  .lex-row-note { font-family: "IBM Plex Mono", monospace; font-size: 11.5px; letter-spacing: .04em; color: rgba(255,255,255,.5); }
  .lex-row.hot .lex-row-note { color: var(--lex); }
  .lex-row-val { font-family: "Bebas Neue","Inter",sans-serif; font-size: clamp(30px,5vw,54px); letter-spacing: .01em; }
  .lex-row.hot .lex-row-val { color: var(--lex); }
  .lex-foot { font-size: clamp(15px,2vw,20px); color: rgba(255,255,255,.78); max-width: 34ch; text-wrap: pretty; opacity: 0; }
  .lex-scene.on .lex-foot { animation: lexUp .6s ease .95s forwards; }

  /* curve */
  .lex-curve-wrap { position: relative; width: 100%; max-width: 760px; margin: 10px 0 18px; }
  .lex-curve { width: 100%; height: auto; display: block; }
  .lex-curve .grid { stroke: rgba(255,255,255,.07); stroke-width: 1; }
  .lex-curve .simple { fill: none; stroke: rgba(255,255,255,.42); stroke-width: 2.4; stroke-dasharray: 6 7;
    stroke-dashoffset: 900; }
  .lex-curve .comp { fill: none; stroke: var(--lex); stroke-width: 3.4; filter: drop-shadow(0 0 8px color-mix(in oklab, var(--lex) 60%, transparent));
    stroke-dasharray: 1300; stroke-dashoffset: 1300; }
  .lex-curve .area { fill: url(#lexgrad); opacity: 0; }
  .lex-scene.on .lex-curve .simple { animation: lexDash 2.4s ease .5s forwards; }
  .lex-scene.on .lex-curve .comp { animation: lexDash 2.6s cubic-bezier(.4,.1,.3,1) .8s forwards; }
  .lex-scene.on .lex-curve .area { animation: lexFade 1.4s ease 2.6s forwards; }
  .lex-legend { display: flex; flex-direction: column; gap: 8px; opacity: 0; }
  .lex-scene.on .lex-legend { animation: lexUp .6s ease 1.4s forwards; }
  .lex-legend-row { display: flex; align-items: center; gap: 10px; font-size: clamp(13px,1.8vw,16px); color: rgba(255,255,255,.82); }
  .lex-legend-dot { width: 22px; height: 3px; border-radius: 3px; flex: 0 0 22px; }

  /* formula */
  .lex-formula {
    font-family: "IBM Plex Mono", monospace; font-weight: 500;
    font-size: clamp(34px, 6.5vw, 80px); color: #fff; letter-spacing: .02em;
    padding: 26px 34px; border-radius: 18px; align-self: flex-start;
    background: rgba(255,255,255,.04); border: 1px solid color-mix(in oklab, var(--lex) 40%, rgba(255,255,255,.1));
    box-shadow: 0 0 50px color-mix(in oklab, var(--lex) 18%, transparent);
    margin: 6px 0 22px; opacity: 0; transform: scale(.94);
  }
  .lex-scene.on .lex-formula { animation: lexPop .7s cubic-bezier(.2,.8,.2,1) .25s forwards; }
  .lex-deflist { display: flex; flex-direction: column; gap: 10px; }
  .lex-deflist div { font-size: clamp(14px,1.9vw,18px); color: rgba(255,255,255,.78); opacity: 0; transform: translateX(-14px); }
  .lex-scene.on .lex-deflist div { animation: lexIn .5s ease forwards; }
  .lex-scene.on .lex-deflist div:nth-child(1){animation-delay:.7s}
  .lex-scene.on .lex-deflist div:nth-child(2){animation-delay:.9s}
  .lex-scene.on .lex-deflist div:nth-child(3){animation-delay:1.1s}

  /* outro */
  .lex-scene.outro { align-items: flex-start; }

  /* en-tête de scène commun */
  .lex-h2 { font-family: "Bebas Neue", "Inter", sans-serif; font-size: clamp(30px,5vw,62px); line-height: .94; letter-spacing: .01em; margin-bottom: 22px; opacity: 0; transform: translateY(14px); }
  .lex-scene.on .lex-h2 { animation: lexUp .6s cubic-bezier(.2,.7,.2,1) .22s forwards; }

  /* steps */
  .lex-steps { display: flex; flex-direction: column; gap: 0; margin-bottom: 18px; max-width: 720px; }
  .lex-step { display: flex; gap: 16px; align-items: flex-start; padding-bottom: 18px; position: relative; opacity: 0; transform: translateX(-16px); }
  .lex-scene.on .lex-step { animation: lexIn .55s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: calc(.35s + var(--i) * .18s); }
  .lex-step:not(:last-child)::before { content: ""; position: absolute; left: 17px; top: 36px; bottom: 0; width: 2px; background: color-mix(in oklab, var(--lex) 40%, rgba(255,255,255,.1)); }
  .lex-step-n { flex: 0 0 36px; width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; font-family: "Bebas Neue", sans-serif; font-size: 20px; background: var(--lex); color: #06210f; position: relative; z-index: 1; }
  .lex-step-k { font-size: clamp(16px,2.2vw,21px); font-weight: 700; color: #fff; margin-bottom: 3px; }
  .lex-step-t { font-size: clamp(13px,1.8vw,16px); color: rgba(255,255,255,.72); line-height: 1.45; text-wrap: pretty; }

  /* pillars */
  .lex-pillars { display: grid; gap: 14px; margin-bottom: 18px; }
  .lex-pillars[data-n="2"] { grid-template-columns: repeat(2,1fr); }
  .lex-pillars[data-n="3"] { grid-template-columns: repeat(3,1fr); }
  .lex-pillars[data-n="4"] { grid-template-columns: repeat(4,1fr); }
  .lex-pillar { padding: 18px; border-radius: 14px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-top: 3px solid var(--lex); opacity: 0; transform: translateY(16px); }
  .lex-scene.on .lex-pillar { animation: lexUp .55s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: calc(.35s + var(--i) * .15s); }
  .lex-pillar-tag { font-family: "Bebas Neue", sans-serif; font-size: 30px; line-height: 1; color: var(--lex); margin-bottom: 8px; }
  .lex-pillar-h { font-size: clamp(15px,2vw,19px); font-weight: 700; color: #fff; margin-bottom: 6px; }
  .lex-pillar-sub { font-size: clamp(12.5px,1.6vw,14.5px); color: rgba(255,255,255,.7); line-height: 1.45; text-wrap: pretty; }
  .lex-pillar-list { list-style: none; padding: 0; margin: 8px 0 0; display: flex; flex-direction: column; gap: 5px; }
  .lex-pillar-list li { font-size: clamp(12.5px,1.6vw,14.5px); color: rgba(255,255,255,.74); padding-left: 14px; position: relative; }
  .lex-pillar-list li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: var(--lex); }

  /* list */
  .lex-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px; max-width: 760px; }
  .lex-list-row { display: flex; gap: 14px; align-items: flex-start; opacity: 0; transform: translateX(-16px); }
  .lex-scene.on .lex-list-row { animation: lexIn .5s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: calc(.35s + var(--i) * .16s); }
  .lex-list-ic { flex: 0 0 34px; width: 34px; height: 34px; border-radius: 9px; display: grid; place-items: center; background: color-mix(in oklab, var(--lex) 26%, transparent); color: #fff; }
  .lex-list-ic svg { width: 17px; height: 17px; }
  .lex-list-b { display: flex; flex-direction: column; gap: 2px; padding-top: 1px; }
  .lex-list-k { font-size: clamp(15px,2vw,19px); font-weight: 700; color: #fff; }
  .lex-list-v { font-size: clamp(13px,1.8vw,16px); color: rgba(255,255,255,.72); line-height: 1.45; text-wrap: pretty; }

  /* barcompare */
  .lex-bars2 { display: flex; flex-direction: column; gap: 16px; margin-bottom: 18px; max-width: 680px; }
  .lex-bar2 { opacity: 0; transform: translateY(10px); }
  .lex-scene.on .lex-bar2 { animation: lexUp .5s ease forwards; animation-delay: calc(.35s + var(--i) * .16s); }
  .lex-bar2-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 7px; }
  .lex-bar2-label { font-size: clamp(13px,1.8vw,16px); color: rgba(255,255,255,.8); font-weight: 600; }
  .lex-bar2-val { font-family: "Bebas Neue", sans-serif; font-size: clamp(20px,3vw,30px); color: rgba(255,255,255,.7); }
  .lex-bar2.hot .lex-bar2-val { color: var(--lex); }
  .lex-bar2-track { height: 12px; border-radius: 999px; background: rgba(255,255,255,.08); overflow: hidden; }
  .lex-bar2-fill { display: block; height: 100%; width: 0; border-radius: 999px; background: rgba(255,255,255,.28); }
  .lex-bar2.hot .lex-bar2-fill { background: var(--lex); box-shadow: 0 0 16px color-mix(in oklab, var(--lex) 55%, transparent); }
  .lex-scene.on .lex-bar2-fill { animation: lexGrow .9s cubic-bezier(.3,.7,.2,1) forwards; animation-delay: calc(.5s + var(--i) * .16s); }

  /* timeline */
  .lex-tl { display: flex; flex-direction: column; max-width: 720px; }
  .lex-tl-row { display: flex; gap: 16px; align-items: stretch; opacity: 0; transform: translateX(-16px); }
  .lex-scene.on .lex-tl-row { animation: lexIn .55s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: calc(.35s + var(--i) * .18s); }
  .lex-tl-year { flex: 0 0 70px; text-align: right; font-family: "Bebas Neue", sans-serif; font-size: clamp(22px,3vw,30px); color: var(--lex); filter: brightness(1.4); padding-top: 1px; }
  .lex-tl-track { position: relative; flex: 0 0 14px; display: flex; justify-content: center; }
  .lex-tl-track::before { content: ""; position: absolute; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,.14); }
  .lex-tl-row:first-child .lex-tl-track::before { top: 10px; }
  .lex-tl-row:last-child .lex-tl-track::before { bottom: calc(100% - 10px); }
  .lex-tl-dot { position: relative; z-index: 1; width: 13px; height: 13px; margin-top: 5px; border-radius: 50%; background: var(--lex); box-shadow: 0 0 0 4px color-mix(in oklab, var(--lex) 25%, transparent); }
  .lex-tl-label { flex: 1; padding-bottom: 22px; font-size: clamp(14px,1.9vw,17px); color: rgba(255,255,255,.82); line-height: 1.45; text-wrap: pretty; }

  /* chrome */
  .lex-top { position: absolute; top: 0; left: 0; right: 0; z-index: 3; display: flex; align-items: center; gap: 14px; padding: 18px 22px; }
  .lex-bars { display: flex; gap: 6px; flex: 1; }
  .lex-bar { flex: 1; height: 3px; border-radius: 3px; background: rgba(255,255,255,.18); overflow: hidden; }
  .lex-bar i { display: block; height: 100%; width: 0; background: #fff; }
  .lex-bar.done i { width: 100%; }
  .lex-bar.cur i { animation: lexBar linear forwards; }
  .lex-brand { font-family: "Bebas Neue", sans-serif; letter-spacing: .04em; font-size: 18px; color: var(--lex); }
  .lex-close {
    position: absolute; top: 14px; right: 16px; z-index: 4;
    width: 40px; height: 40px; border-radius: 50%; border: 0; cursor: pointer;
    background: rgba(0,0,0,.5); color: #fff; display: grid; place-items: center;
    backdrop-filter: blur(4px);
  }
  .lex-close svg { width: 18px; height: 18px; }
  .lex-ctrl {
    position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 4;
    display: flex; align-items: center; gap: 10px;
    background: rgba(0,0,0,.45); border: 1px solid rgba(255,255,255,.12);
    border-radius: 999px; padding: 8px 10px; backdrop-filter: blur(6px);
  }
  .lex-cbtn { width: 40px; height: 40px; border-radius: 50%; border: 0; cursor: pointer; background: rgba(255,255,255,.08); color: #fff; display: grid; place-items: center; transition: background .15s ease; }
  .lex-cbtn:hover { background: rgba(255,255,255,.18); }
  .lex-cbtn.main { width: 48px; height: 48px; background: var(--lex); color: #06210f; }
  .lex-cbtn svg { width: 18px; height: 18px; }
  .lex-cbtn.main svg { width: 20px; height: 20px; }

  @keyframes lexUp { to { opacity: 1; transform: translateY(0); } }
  @keyframes lexIn { to { opacity: 1; transform: translateX(0); } }
  @keyframes lexInDim { to { opacity: .6; transform: translateX(0); } }
  @keyframes lexPop { to { opacity: 1; transform: scale(1); } }
  @keyframes lexFade { to { opacity: 1; } }
  @keyframes lexDash { to { stroke-dashoffset: 0; } }
  @keyframes lexBar { from { width: 0; } to { width: 100%; } }
  @keyframes lexGrow { to { width: var(--w, 100%); } }

  @media (max-width: 720px) {
    .lex-scene { padding: 12vh 8vw 16vh; }
    .lex-ctrl { bottom: 18px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .lex-scene, .lex-scene * { animation: none !important; transition: opacity .2s ease !important; }
    .lex-curve .simple, .lex-curve .comp { stroke-dashoffset: 0 !important; }
    .lex-curve .area { opacity: 1 !important; }
    .lex-eyebrow,.lex-title,.lex-h2,.lex-sub,.lex-cite,.lex-post,.lex-foot,.lex-legend,.lex-formula,.lex-row,.lex-deflist div,
    .lex-step,.lex-pillar,.lex-list-row,.lex-bar2,.lex-tl-row { opacity: 1 !important; transform: none !important; }
    .lex-bar2-fill { width: var(--w, 100%) !important; }
  }
  `;

  let injected = false;
  function injectCss() {
    if (injected) return; injected = true;
    const s = document.createElement("style"); s.id = "lex-css"; s.textContent = css;
    document.head.appendChild(s);
  }

  // ---------- State ----------
  let ov, stageEl, barsEl, scenes = [], cur = 0, timer = null, paused = false, conf = null;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  function buildScene(sc) {
    const d = document.createElement("div");
    d.className = "lex-scene" + (sc.type === "outro" ? " outro" : "");
    let inner = sc.eyebrow ? `<div class="lex-eyebrow">${esc(sc.eyebrow)}</div>` : "";
    if (sc.type === "title") {
      inner += `<h2 class="lex-title">${esc(sc.title)}</h2>
        ${sc.sub ? `<div class="lex-sub">${esc(sc.sub)}</div>` : ""}
        ${sc.cite ? `<div class="lex-cite">${esc(sc.cite)}</div>` : ""}`;
    } else if (sc.type === "stat") {
      inner += `${sc.pre ? `<div class="lex-pre">${esc(sc.pre)}</div>` : ""}
        <div class="lex-bignum" data-count="${sc.value}" data-suffix="${esc(sc.suffix||"")}">0${esc(sc.suffix||"")}</div>
        ${sc.post ? `<div class="lex-post">${esc(sc.post)}</div>` : ""}`;
    } else if (sc.type === "compare") {
      inner += `<div class="lex-rows">${sc.rows.map(r => `
        <div class="lex-row ${r.hot?"hot":""} ${r.dim?"dim":""}">
          <div class="lex-row-l"><span class="lex-row-label">${esc(r.label)}</span><span class="lex-row-note">${esc(r.note||"")}</span></div>
          <span class="lex-row-val">${esc(r.val)}</span>
        </div>`).join("")}</div>
        ${sc.foot ? `<div class="lex-foot">${esc(sc.foot)}</div>` : ""}`;
    } else if (sc.type === "curve") {
      inner += `${sc.title ? `<h2 class="lex-title" style="font-size:clamp(32px,5.5vw,68px)">${esc(sc.title)}</h2>` : ""}
        <div class="lex-curve-wrap">${curveSvg()}</div>
        <div class="lex-legend">${(sc.legend||[]).map(l=>`<div class="lex-legend-row"><span class="lex-legend-dot" style="background:${l.c}"></span>${esc(l.t)}</div>`).join("")}</div>`;
    } else if (sc.type === "formula") {
      inner += `<div class="lex-formula">${esc(sc.formula)}</div>
        <div class="lex-deflist">${(sc.legend||[]).map(x=>`<div>${esc(x)}</div>`).join("")}</div>`;
    } else if (sc.type === "steps") {
      inner += `${sc.title ? `<h2 class="lex-h2">${esc(sc.title)}</h2>` : ""}
        <div class="lex-steps">${(sc.steps||[]).map((s,i)=>`
          <div class="lex-step" style="--i:${i}">
            <div class="lex-step-n">${esc(s.n || (i+1))}</div>
            <div class="lex-step-b"><div class="lex-step-k">${esc(s.k)}</div>${s.t?`<div class="lex-step-t">${esc(s.t)}</div>`:""}</div>
          </div>`).join("")}</div>
        ${sc.foot ? `<div class="lex-foot">${esc(sc.foot)}</div>` : ""}`;
    } else if (sc.type === "pillars") {
      inner += `${sc.title ? `<h2 class="lex-h2">${esc(sc.title)}</h2>` : ""}
        <div class="lex-pillars" data-n="${(sc.cols||[]).length}">${(sc.cols||[]).map((c,i)=>`
          <div class="lex-pillar" style="--i:${i}">
            ${c.tag?`<div class="lex-pillar-tag">${esc(c.tag)}</div>`:""}
            <div class="lex-pillar-h">${esc(c.h)}</div>
            ${c.sub?`<div class="lex-pillar-sub">${esc(c.sub)}</div>`:""}
            ${(c.items&&c.items.length)?`<ul class="lex-pillar-list">${c.items.map(it=>`<li>${esc(it)}</li>`).join("")}</ul>`:""}
          </div>`).join("")}</div>
        ${sc.foot ? `<div class="lex-foot">${esc(sc.foot)}</div>` : ""}`;
    } else if (sc.type === "list") {
      inner += `${sc.title ? `<h2 class="lex-h2">${esc(sc.title)}</h2>` : ""}
        <div class="lex-list">${(sc.items||[]).map((it,i)=>`
          <div class="lex-list-row" style="--i:${i}">
            <span class="lex-list-ic">${listIcon(i)}</span>
            <div class="lex-list-b"><span class="lex-list-k">${esc(it.k)}</span>${it.v?`<span class="lex-list-v">${esc(it.v)}</span>`:""}</div>
          </div>`).join("")}</div>
        ${sc.foot ? `<div class="lex-foot">${esc(sc.foot)}</div>` : ""}`;
    } else if (sc.type === "barcompare") {
      const max = Math.max.apply(null, (sc.bars||[]).map(b=>b.pct||0).concat([1]));
      inner += `${sc.title ? `<h2 class="lex-h2">${esc(sc.title)}</h2>` : ""}
        <div class="lex-bars2">${(sc.bars||[]).map((b,i)=>`
          <div class="lex-bar2 ${b.hot?"hot":""}" style="--i:${i}">
            <div class="lex-bar2-top"><span class="lex-bar2-label">${esc(b.label)}</span><span class="lex-bar2-val">${esc(b.val||"")}</span></div>
            <div class="lex-bar2-track"><span class="lex-bar2-fill" style="--w:${Math.round((b.pct/max)*100)}%"></span></div>
          </div>`).join("")}</div>
        ${sc.foot ? `<div class="lex-foot">${esc(sc.foot)}</div>` : ""}`;
    } else if (sc.type === "timeline") {
      inner += `${sc.title ? `<h2 class="lex-h2">${esc(sc.title)}</h2>` : ""}
        <div class="lex-tl">${(sc.rows||[]).map((r,i)=>`
          <div class="lex-tl-row" style="--i:${i}">
            <div class="lex-tl-year">${esc(r.y)}</div>
            <div class="lex-tl-track"><span class="lex-tl-dot"></span></div>
            <div class="lex-tl-label">${esc(r.t)}</div>
          </div>`).join("")}</div>`;
    } else if (sc.type === "outro") {
      inner += `<h2 class="lex-title">${esc(sc.title)}</h2>
        ${sc.sub ? `<div class="lex-sub" style="max-width:32ch">${esc(sc.sub)}</div>` : ""}`;
    }
    d.innerHTML = inner;
    return d;
  }

  function curveSvg() {
    // simple = linear, comp = exponential. viewBox 0..560 x 0..300
    const W=560, H=300, x0=20, x1=540, baseY=270, topY=24;
    const N=40, gc=Math.pow(3.2, 1), maxv=3.2;
    const xt = t => x0 + (x1-x0)*t;
    const yv = v => baseY - ((v-1)/(maxv-1))*(baseY-topY);
    let sp="", cp="";
    for (let i=0;i<=N;i++){ const t=i/N; const xs=xt(t).toFixed(1), ys=yv(1+(maxv-1)*t).toFixed(1); sp+=(i?"L":"M")+xs+" "+ys+" "; }
    for (let i=0;i<=N;i++){ const t=i/N; const xc=xt(t).toFixed(1), yc=yv(Math.pow(maxv,t)).toFixed(1); cp+=(i?"L":"M")+xc+" "+yc+" "; }
    const area = cp + `L ${xt(1).toFixed(1)} ${baseY} L ${x0} ${baseY} Z`;
    let grid="";
    for (let i=0;i<=4;i++){ const y=(topY+(baseY-topY)*i/4).toFixed(1); grid+=`<line class="grid" x1="${x0}" y1="${y}" x2="${x1}" y2="${y}"/>`; }
    return `<svg class="lex-curve" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
      <defs><linearGradient id="lexgrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#46d369" stop-opacity=".28"/><stop offset="1" stop-color="#46d369" stop-opacity="0"/>
      </linearGradient></defs>
      ${grid}
      <path class="area" d="${area}"/>
      <path class="simple" d="${sp}"/>
      <path class="comp" d="${cp}"/>
    </svg>`;
  }

  function listIcon(i) {
    const paths = [
      '<path d="M3 9 l4 4 l8 -9"/>',
      '<circle cx="9" cy="9" r="6"/><path d="M9 5 v4 l3 2"/>',
      '<path d="M9 2 l2 4 4 .5 -3 3 .8 4.3 -3.8 -2 -3.8 2 .8 -4.3 -3 -3 4 -.5 Z"/>',
      '<path d="M4 3 h7 l3 3 v9 H4 Z"/><path d="M6.5 8 h5 M6.5 11 h5"/>',
      '<path d="M3 15 V8 M8 15 V4 M13 15 V10"/>',
      '<circle cx="9" cy="9" r="6"/><path d="M9 6 v3 M9 12 h.01"/>',
    ];
    return `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[i % paths.length]}</svg>`;
  }

  function countUp(el) {
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = target.toLocaleString("fr-FR") + suffix; return; }
    const dur = 1100; const start = performance.now();
    function step(now){
      const p = Math.min(1, (now-start)/dur);
      const e = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(target*e).toLocaleString("fr-FR") + suffix;
      if (p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function show(i) {
    if (i < 0) i = 0;
    if (i >= scenes.length) { return finish(); }
    cur = i;
    scenes.forEach((s, k) => s.classList.toggle("on", k === i));
    // progress bars
    [...barsEl.children].forEach((b, k) => {
      b.classList.toggle("done", k < i);
      b.classList.remove("cur");
      const fill = b.querySelector("i");
      fill.style.animation = "none"; fill.style.width = k < i ? "100%" : "0";
    });
    const curBar = barsEl.children[i];
    const fill = curBar.querySelector("i");
    const dur = conf.scenes[i].dur;
    if (!reduce && !paused) {
      curBar.classList.add("cur");
      fill.style.animation = `lexBar ${dur}ms linear forwards`;
    } else { fill.style.width = paused ? fill.style.width : "0"; }
    // count-up
    const num = scenes[i].querySelector("[data-count]");
    if (num) setTimeout(() => countUp(num), 600);
    schedule(dur);
  }

  function schedule(dur) {
    clearTimeout(timer);
    if (reduce || paused) return;
    timer = setTimeout(() => show(cur + 1), dur);
  }

  function setPaused(p) {
    paused = p;
    const ic = ov.querySelector("[data-play] use") || ov.querySelector("[data-play]");
    ov.querySelector("[data-play]").innerHTML = p ? ICON.play : ICON.pause;
    const fill = barsEl.children[cur] && barsEl.children[cur].querySelector("i");
    if (p) {
      clearTimeout(timer);
      if (fill) { const w = getComputedStyle(fill).width; fill.style.animation = "none"; fill.style.width = w; }
    } else {
      // resume: restart current bar from current width proportionally (simple: restart full)
      show(cur);
    }
  }

  function finish() {
    // loop back to last scene paused
    clearTimeout(timer);
    cur = scenes.length - 1;
    setPaused(true);
  }

  const ICON = {
    play: '<svg viewBox="0 0 18 18" fill="currentColor"><path d="M4 2 L15 9 L4 16 Z"/></svg>',
    pause: '<svg viewBox="0 0 18 18" fill="currentColor"><rect x="4" y="3" width="3.4" height="12" rx="1"/><rect x="10.6" y="3" width="3.4" height="12" rx="1"/></svg>',
    prev: '<svg viewBox="0 0 18 18" fill="currentColor"><path d="M13 3 L6 9 L13 15 Z"/><rect x="4" y="3" width="2" height="12" rx="1"/></svg>',
    next: '<svg viewBox="0 0 18 18" fill="currentColor"><path d="M5 3 L12 9 L5 15 Z"/><rect x="12" y="3" width="2" height="12" rx="1"/></svg>',
    replay: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 9 a6 6 0 1 0 1.7-4.2"/><polyline points="3,3 3,6 6,6"/></svg>',
    close: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>',
  };

  function build(modId) {
    conf = getData()[modId];
    injectCss();
    if (ov) ov.remove();
    ov = document.createElement("div");
    ov.id = "lex-ov";
    ov.innerHTML = `
      <div class="lex-stage lex-grain" style="--lex:${conf.accent}">
        <div class="lex-top">
          <span class="lex-brand">LENNY</span>
          <div class="lex-bars">${conf.scenes.map(()=>`<span class="lex-bar"><i></i></span>`).join("")}</div>
        </div>
        <button class="lex-close" data-close aria-label="Fermer">${ICON.close}</button>
        <div class="lex-scenes"></div>
        <div class="lex-ctrl">
          <button class="lex-cbtn" data-prev aria-label="Précédent">${ICON.prev}</button>
          <button class="lex-cbtn main" data-play aria-label="Lecture/Pause">${ICON.pause}</button>
          <button class="lex-cbtn" data-next aria-label="Suivant">${ICON.next}</button>
          <button class="lex-cbtn" data-replay aria-label="Revoir">${ICON.replay}</button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    stageEl = ov.querySelector(".lex-scenes");
    barsEl = ov.querySelector(".lex-bars");
    scenes = conf.scenes.map(sc => { const el = buildScene(sc); stageEl.appendChild(el); return el; });

    ov.querySelector("[data-close]").addEventListener("click", close);
    ov.querySelector("[data-play]").addEventListener("click", () => setPaused(!paused));
    ov.querySelector("[data-prev]").addEventListener("click", () => { paused=false; ov.querySelector("[data-play]").innerHTML=ICON.pause; show(Math.max(0,cur-1)); });
    ov.querySelector("[data-next]").addEventListener("click", () => { paused=false; ov.querySelector("[data-play]").innerHTML=ICON.pause; show(cur+1 >= scenes.length ? scenes.length-1 : cur+1); });
    ov.querySelector("[data-replay]").addEventListener("click", () => { paused=false; ov.querySelector("[data-play]").innerHTML=ICON.pause; show(0); });
    document.addEventListener("keydown", onKey);
  }

  function onKey(e) {
    if (!ov || !ov.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(Math.min(scenes.length-1, cur+1));
    else if (e.key === "ArrowLeft") show(Math.max(0, cur-1));
    else if (e.key === " ") { e.preventDefault(); setPaused(!paused); }
  }

  function open(modId) {
    if (!getData()[modId]) return;
    build(modId);
    ov.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    paused = false;
    requestAnimationFrame(() => show(0));
  }
  function close() {
    if (!ov) return;
    ov.classList.remove("open");
    clearTimeout(timer);
    document.documentElement.style.overflow = "";
    document.removeEventListener("keydown", onKey);
  }
  function has(modId) { return !!getData()[modId]; }

  window.LennyExplainer = { open, close, has };
})();
