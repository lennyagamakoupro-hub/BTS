/* ============================================================
   LENNY — Profil unifié (nav)
   • UN SEUL bloc profil dans la barre : l'avatar (agrandi).
   • Le réglage (#nav-gear → « Mon évolution ») et la progression
     (#xp-hud → série/niveau) sont masqués de la barre et rangés
     DANS le menu profil (ouvert au clic sur l'avatar).
   • Photo de profil : bouton appareil-photo → fenêtre de recadrage
     (glisser pour cadrer, curseur/molette pour zoomer) → image stockée
     en localStorage, remplace les initiales. « Modifier ma photo »
     dans le menu profil permet de re-cadrer la photo existante.
   Autonome & réversible : retirer le <script src="lenny-profile-cluster.js">.
   ============================================================ */
(function () {
  "use strict";

  var PHOTO_KEY = "lenny-avatar-photo-v1";  // résultat recadré (affiché)
  var SRC_KEY   = "lenny-avatar-src-v1";     // source pour pouvoir re-cadrer
  var avatarEl = null, fileInput = null;

  function injectStyle() {
    if (document.getElementById("lenny-pcluster-style")) return;
    var st = document.createElement("style");
    st.id = "lenny-pcluster-style";
    st.textContent = [
      /* gear + HUD retirés de la barre (déplacés dans le profil) */
      "#nav-gear, #xp-hud { display: none !important; }",
      /* avatar = case profil agrandie */
      ".nav .nav-right .avatar { width: 42px !important; height: 42px !important;",
      "border-radius: 12px !important; font-size: 16px !important; font-weight: 800; }",
      /* enveloppe avatar + photo */
      ".lenny-pc-av { position: relative; display: inline-flex; }",
      ".lenny-pc-av .avatar { background-size: cover !important; background-position: center !important; }",
      ".lenny-pc-av .avatar.has-photo { color: transparent !important; text-indent: -9999px; }",
      /* photo aussi dans l'en-tête du menu profil */
      ".lp-menu .lp-ava.has-photo { background-size: cover !important; background-position: center !important; color: transparent !important; text-indent: -9999px; }",
      /* badge appareil-photo — neutre (plus d'orange) */
      ".lenny-pc-cam { position: absolute; right: -4px; bottom: -4px; width: 18px; height: 18px;",
      "border-radius: 50%; background: #26262b; border: 2px solid #0c0c0e; display: grid;",
      "place-items: center; cursor: pointer; padding: 0; box-shadow: 0 2px 5px rgba(0,0,0,.45);",
      "transition: transform .12s ease, background .15s ease; }",
      ".lenny-pc-cam:hover { transform: scale(1.12); background: #3a3a42; }",
      ".lenny-pc-cam svg { width: 10px; height: 10px; color: #fff; display: block; }",
      /* items rangés dans le menu profil — accent neutre */
      ".lp-menu .lp-item.lpc-item svg { color: rgba(255,255,255,.7); }",
      ".lp-menu .lpc-meta { margin-left: auto; font: 700 11px/1 'IBM Plex Mono', monospace; color: rgba(255,255,255,.55); }",
      /* ---------- fenêtre de recadrage ---------- */
      ".pc-crop-ov { position: fixed; inset: 0; z-index: 5000; display: grid; place-items: center;",
      "background: rgba(6,6,8,.72); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);",
      "opacity: 0; transition: opacity .18s ease; font-family: 'Inter', system-ui, sans-serif; padding: 20px; }",
      ".pc-crop-ov.show { opacity: 1; }",
      ".pc-crop { width: min(360px, 92vw); background: #0c0c0e; border: 1px solid rgba(255,255,255,.12);",
      "border-radius: 18px; padding: 18px; box-shadow: 0 30px 70px -20px rgba(0,0,0,.85);",
      "transform: translateY(10px) scale(.98); transition: transform .2s ease; }",
      ".pc-crop-ov.show .pc-crop { transform: none; }",
      ".pc-crop-h { color: #fff; font-weight: 700; font-size: 15px; margin: 2px 2px 14px; }",
      ".pc-crop-h small { display: block; font: 500 12px/1.45 'Inter', system-ui, sans-serif; color: rgba(255,255,255,.5); margin-top: 3px; }",
      ".pc-crop-view { position: relative; margin: 0 auto; border-radius: 16px; overflow: hidden;",
      "background: #000; cursor: grab; touch-action: none; box-shadow: inset 0 0 0 2px rgba(255,255,255,.5); }",
      ".pc-crop-view:active { cursor: grabbing; }",
      ".pc-crop-view img { position: absolute; left: 0; top: 0; user-select: none; -webkit-user-drag: none; pointer-events: none; max-width: none; }",
      ".pc-crop-zoom { display: flex; align-items: center; gap: 12px; margin: 16px 2px 2px; }",
      ".pc-crop-zoom svg { width: 16px; height: 16px; color: rgba(255,255,255,.5); flex: none; }",
      ".pc-crop-range { -webkit-appearance: none; appearance: none; flex: 1; height: 4px; border-radius: 3px; background: rgba(255,255,255,.16); outline: none; }",
      ".pc-crop-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #fff; cursor: pointer; border: 0; box-shadow: 0 2px 6px rgba(0,0,0,.5); }",
      ".pc-crop-range::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #fff; cursor: pointer; border: 0; }",
      ".pc-crop-actions { display: flex; gap: 10px; margin-top: 16px; }",
      ".pc-crop-btn { flex: 1; padding: 12px; border-radius: 11px; font: 700 13.5px/1 'Inter', system-ui, sans-serif; cursor: pointer; border: 0; transition: filter .15s ease, background .15s ease; }",
      ".pc-crop-btn.ghost { background: rgba(255,255,255,.08); color: #fff; }",
      ".pc-crop-btn.ghost:hover { background: rgba(255,255,255,.14); }",
      ".pc-crop-btn.go { background: #fff; color: #111; }",
      ".pc-crop-btn.go:hover { filter: brightness(.92); }",
      ".pc-crop-alt { width: 100%; margin-top: 12px; padding: 9px; border-radius: 10px; border: 0; cursor: pointer; background: transparent; color: rgba(255,255,255,.62); font: 600 12.5px/1 'Inter', system-ui, sans-serif; transition: color .15s ease, background .15s ease; }",
      ".pc-crop-alt:hover { color: #fff; background: rgba(255,255,255,.06); }"
    ].join("");
    document.head.appendChild(st);
  }

  /* ---------- Photo : helpers ---------- */
  function applyPhoto(avatar, dataUrl) {
    if (!avatar) return;
    if (dataUrl) { avatar.style.backgroundImage = "url(" + dataUrl + ")"; avatar.classList.add("has-photo"); }
    else { avatar.style.backgroundImage = ""; avatar.classList.remove("has-photo"); }
  }
  function readAsDataURL(file, cb) {
    var r = new FileReader();
    r.onload = function () { cb(r.result); };
    r.onerror = function () { cb(null); };
    r.readAsDataURL(file);
  }
  function loadImg(src, cb) {
    var i = new Image();
    i.onload = function () { cb(i); };
    i.onerror = function () { cb(null); };
    i.src = src;
  }
  function downscaleSrc(img, max) {
    var w = img.width, h = img.height, r = Math.min(1, max / Math.max(w, h));
    var cw = Math.round(w * r), ch = Math.round(h * r);
    var c = document.createElement("canvas"); c.width = cw; c.height = ch;
    c.getContext("2d").drawImage(img, 0, 0, cw, ch);
    try { return c.toDataURL("image/jpeg", 0.86); } catch (e) { return null; }
  }
  function onSaved(croppedUrl, srcUrl) {
    try { localStorage.setItem(PHOTO_KEY, croppedUrl); } catch (e) {}
    if (srcUrl) { try { localStorage.setItem(SRC_KEY, srcUrl); } catch (e) {} }
    applyPhoto(avatarEl, croppedUrl);
  }

  /* ---------- Fenêtre de recadrage (pan + zoom) ---------- */
  function openCropper(srcUrl, saved) {
    loadImg(srcUrl, function (img) {
      if (!img) return;
      var VS = Math.min(300, Math.max(220, window.innerWidth - 80));
      var minZoom = 1, maxZoom = 4, zoom = 1;
      var base = Math.max(VS / img.width, VS / img.height);
      var s = base * zoom;
      var tx = (VS - img.width * s) / 2, ty = (VS - img.height * s) / 2;

      var ov = document.createElement("div");
      ov.className = "pc-crop-ov";
      ov.innerHTML =
        '<div class="pc-crop" role="dialog" aria-label="Recadrer la photo de profil">' +
          '<div class="pc-crop-h">Recadrer ma photo<small>Faites glisser pour cadrer · curseur ou molette pour zoomer</small></div>' +
          '<div class="pc-crop-view"><img alt=""></div>' +
          '<div class="pc-crop-zoom">' +
            '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3" stroke-linecap="round"/></svg>' +
            '<input class="pc-crop-range" type="range" min="1" max="4" step="0.01" value="1" aria-label="Zoom">' +
          '</div>' +
          '<button type="button" class="pc-crop-alt" data-other>Choisir une autre photo</button>' +
          '<div class="pc-crop-actions">' +
            '<button type="button" class="pc-crop-btn ghost" data-cancel>Annuler</button>' +
            '<button type="button" class="pc-crop-btn go" data-save>Enregistrer</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(ov);

      var view = ov.querySelector(".pc-crop-view");
      var imgEl = ov.querySelector(".pc-crop-view img");
      var range = ov.querySelector(".pc-crop-range");
      view.style.width = VS + "px";
      view.style.height = VS + "px";
      imgEl.src = srcUrl;

      function clamp() {
        var iw = img.width * s, ih = img.height * s;
        tx = Math.min(0, Math.max(VS - iw, tx));
        ty = Math.min(0, Math.max(VS - ih, ty));
      }
      function render() {
        clamp();
        imgEl.style.width = (img.width * s) + "px";
        imgEl.style.height = (img.height * s) + "px";
        imgEl.style.transform = "translate(" + tx + "px," + ty + "px)";
      }
      function setZoom(z, fx, fy) {
        var old = s;
        zoom = Math.min(maxZoom, Math.max(minZoom, z));
        s = base * zoom;
        fx = (fx == null) ? VS / 2 : fx;
        fy = (fy == null) ? VS / 2 : fy;
        tx = fx - (fx - tx) * (s / old);
        ty = fy - (fy - ty) * (s / old);
        render();
      }
      render();

      range.addEventListener("input", function () { setZoom(parseFloat(range.value)); });
      view.addEventListener("wheel", function (e) {
        e.preventDefault();
        var r = view.getBoundingClientRect();
        setZoom(zoom - e.deltaY * 0.0016, e.clientX - r.left, e.clientY - r.top);
        range.value = zoom;
      }, { passive: false });

      var dragging = false, px = 0, py = 0;
      view.addEventListener("pointerdown", function (e) {
        dragging = true; px = e.clientX; py = e.clientY;
        try { view.setPointerCapture(e.pointerId); } catch (err) {}
      });
      view.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        tx += e.clientX - px; ty += e.clientY - py;
        px = e.clientX; py = e.clientY;
        render();
      });
      function endDrag() { dragging = false; }
      view.addEventListener("pointerup", endDrag);
      view.addEventListener("pointercancel", endDrag);

      function close() { ov.classList.remove("show"); setTimeout(function () { if (ov.parentNode) ov.remove(); }, 200); }
      function onEsc(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", onEsc); } }
      ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
      ov.querySelector("[data-cancel]").addEventListener("click", close);
      ov.querySelector("[data-other]").addEventListener("click", function () { document.removeEventListener("keydown", onEsc); close(); pickAndCrop(); });
      document.addEventListener("keydown", onEsc);

      ov.querySelector("[data-save]").addEventListener("click", function () {
        var OUT = 240, ratio = OUT / VS;
        var c = document.createElement("canvas"); c.width = OUT; c.height = OUT;
        var ctx = c.getContext("2d");
        ctx.drawImage(img, tx * ratio, ty * ratio, img.width * s * ratio, img.height * s * ratio);
        var url; try { url = c.toDataURL("image/jpeg", 0.86); } catch (e) { url = null; }
        if (url) saved(url, srcUrl);
        document.removeEventListener("keydown", onEsc);
        close();
      });

      requestAnimationFrame(function () { ov.classList.add("show"); });
    });
  }

  function pickAndCrop() {
    if (fileInput) fileInput.click();
  }
  function recropOrPick() {
    var src = null;
    try { src = localStorage.getItem(SRC_KEY); } catch (e) {}
    if (src) openCropper(src, onSaved);
    else pickAndCrop();
  }

  /* ---------- Mise en place de la photo ---------- */
  function setupPhoto(avatar) {
    if (avatar.closest(".lenny-pc-av")) return;
    avatarEl = avatar;
    var wrap = document.createElement("div");
    wrap.className = "lenny-pc-av";
    avatar.parentNode.insertBefore(wrap, avatar);
    wrap.appendChild(avatar);

    var cam = document.createElement("button");
    cam.type = "button"; cam.className = "lenny-pc-cam";
    cam.title = "Changer ma photo de profil";
    cam.setAttribute("aria-label", "Changer ma photo de profil");
    cam.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2.5 5.2h2l1-1.4h5l1 1.4h2v7.3a.6.6 0 0 1-.6.6H3.1a.6.6 0 0 1-.6-.6V5.2Z"/><circle cx="8" cy="8.6" r="2.3" fill="currentColor" stroke="none"/></svg>';
    fileInput = document.createElement("input");
    fileInput.type = "file"; fileInput.accept = "image/*"; fileInput.style.display = "none";
    wrap.appendChild(cam); wrap.appendChild(fileInput);

    cam.addEventListener("click", function (e) { e.stopPropagation(); pickAndCrop(); });
    fileInput.addEventListener("change", function () {
      var f = fileInput.files && fileInput.files[0];
      if (!f) { return; }
      readAsDataURL(f, function (durl) {
        if (!durl) return;
        loadImg(durl, function (img) {
          if (!img) return;
          var src = downscaleSrc(img, 1000) || durl;
          openCropper(src, onSaved);
        });
      });
      fileInput.value = "";
    });

    var saved = null;
    try { saved = localStorage.getItem(PHOTO_KEY); } catch (e) {}
    if (saved) applyPhoto(avatar, saved);
    // ré-applique la photo si le menu profil réécrit les initiales
    new MutationObserver(function () {
      var s = null; try { s = localStorage.getItem(PHOTO_KEY); } catch (e) {}
      if (s && !avatar.classList.contains("has-photo")) applyPhoto(avatar, s);
    }).observe(avatar, { childList: true });
  }

  /* ---------- Items rangés dans le menu profil ---------- */
  var ICON = {
    progress: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M2 14V6.4L8 2l6 4.4V14"/><path d="M2 11.2h12M6 14v-3h4v3"/></svg>',
    gear: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="2.2"/><path d="M8 1.6v2M8 12.4v2M1.6 8h2M12.4 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4" stroke-linecap="round"/></svg>',
    camera: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M2.5 5.4h2l1-1.4h5l1 1.4h2v7a.6.6 0 0 1-.6.6H3.1a.6.6 0 0 1-.6-.6V5.4Z"/><circle cx="8" cy="8.7" r="2.4"/></svg>'
  };
  function progMeta() {
    var hud = document.getElementById("xp-hud");
    if (!hud) return "";
    var lvl = hud.querySelector(".xp-hud-lvl");
    var streak = hud.querySelector(".xp-hud-streak");
    var parts = [];
    if (streak && streak.textContent.trim()) parts.push("\uD83D\uDD25 " + streak.textContent.trim());
    if (lvl && lvl.textContent.trim()) parts.push("Niv. " + lvl.textContent.trim());
    return parts.join(" · ");
  }
  function makeItem(icon, label, meta) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "lp-item lpc-item";
    b.innerHTML = (ICON[icon] || "") + "<span>" + label + "</span>" +
      (meta ? '<span class="lpc-meta">' + meta + "</span>" : "");
    return b;
  }
  function closeMenu(menu) {
    menu.classList.remove("open");
    var av = document.querySelector(".avatar");
    if (av) av.classList.remove("lp-open");
  }
  function injectMenuItems() {
    var menu = document.querySelector(".lp-menu");
    if (!menu || !menu.classList.contains("open")) return;
    // applique la photo de profil dans l'en-tête du menu (à la place des initiales)
    var ava = menu.querySelector(".lp-ava");
    if (ava) {
      var ph = null; try { ph = localStorage.getItem(PHOTO_KEY); } catch (e) {}
      if (ph) { ava.style.backgroundImage = "url(" + ph + ")"; ava.classList.add("has-photo"); }
      else { ava.style.backgroundImage = ""; ava.classList.remove("has-photo"); }
    }
    if (menu.querySelector(".lpc-item")) return;       // déjà injecté ce cycle
    var logout = menu.querySelector(".lp-item.logout");

    var photo = makeItem("camera", "Modifier ma photo", "");
    photo.addEventListener("click", function () { closeMenu(menu); recropOrPick(); });

    var prog = makeItem("progress", "Ma progression", progMeta());
    prog.addEventListener("click", function () {
      closeMenu(menu);
      if (window.LennyRouter && window.LennyRouter.go) window.LennyRouter.go("progress");
      else { var x = document.getElementById("xp-hud"); if (x) x.click(); }
    });

    var sett = makeItem("gear", "Mon évolution & réglages", "");
    sett.addEventListener("click", function () {
      closeMenu(menu);
      var g = document.getElementById("nav-gear"); if (g) g.click();
    });

    var div = document.createElement("div"); div.className = "lp-div";
    if (logout) {
      menu.insertBefore(photo, logout);
      menu.insertBefore(prog, logout);
      menu.insertBefore(sett, logout);
      menu.insertBefore(div, logout);
    } else { menu.appendChild(photo); menu.appendChild(prog); menu.appendChild(sett); }
  }

  /* ---------- Mise en place ---------- */
  function build() {
    var navRight = document.querySelector(".nav-right");
    var avatar = navRight && navRight.querySelector(".avatar");
    if (!avatar) return false;
    injectStyle();
    setupPhoto(avatar);
    if (!avatar.dataset.lpcHooked) {
      avatar.dataset.lpcHooked = "1";
      avatar.addEventListener("click", function () { setTimeout(injectMenuItems, 0); });
      avatar.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") setTimeout(injectMenuItems, 0);
      });
    }
    return true;
  }

  function init() {
    var tries = 0;
    (function attempt() {
      if (build()) return;
      if (++tries > 40) return;
      setTimeout(attempt, 150);
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 300); });
  } else { setTimeout(init, 300); }
})();
