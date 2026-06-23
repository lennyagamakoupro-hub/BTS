/* ============================================
   LENNY — Service Worker (hors-ligne)
   Stratégie :
   • Navigation/HTML → réseau d'abord, repli cache (toujours à jour si en ligne).
   • Autres ressources (CSS/JS/img/vidéo/police) → cache d'abord, sinon réseau
     puis mise en cache à la volée (stale-while-revalidate léger).
   ============================================ */
const VERSION = "lenny-v1";
const CORE = "lenny-core-" + VERSION;
const RUNTIME = "lenny-runtime-" + VERSION;

// noyau pré-mis en cache (le reste se met en cache à la première visite)
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CORE).then(c => c.addAll(CORE_ASSETS).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CORE && k !== RUNTIME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // on ne gère que le même domaine

  // HTML / navigation : réseau d'abord
  const isHTML = req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
  if (isHTML) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(RUNTIME).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  // ressources statiques : cache d'abord
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.status === 200 && res.type !== "opaque") {
          const copy = res.clone();
          caches.open(RUNTIME).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
