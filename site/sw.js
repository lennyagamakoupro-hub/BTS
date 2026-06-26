/* ============================================
   LENNY — Service Worker NEUTRALISÉ (kill-switch)
   But : effacer tout cache hors-ligne hérité et se désinstaller,
   pour que le site charge TOUJOURS la dernière version (codes à jour).
   Ne met plus rien en cache.
   ============================================ */
self.addEventListener("install", function () { self.skipWaiting(); });

self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    try {
      var keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    } catch (err) {}
    try { await self.registration.unregister(); } catch (err) {}
    try {
      var clients = await self.clients.matchAll({ type: "window" });
      clients.forEach(function (c) { try { c.navigate(c.url); } catch (err) {} });
    } catch (err) {}
  })());
});

// Aucune interception : tout passe par le réseau (toujours frais).
self.addEventListener("fetch", function () {});
