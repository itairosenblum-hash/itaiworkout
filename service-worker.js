const CACHE_NAME = 'workout-app-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for same-origin app-shell files, network-first (with cache fallback)
// for everything else (e.g. exercise images, fonts) so they still work offline
// once visited at least once.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Don't intercept the live radio stream (or any other ranged media
  // request) - let the browser stream it directly without caching.
  if (url.hostname.endsWith('bynetcdn.com') || req.headers.has('range')) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((res) => {
        if (res && res.ok) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return res;
      }).catch(() => cached);

      // App-shell files: serve from cache immediately if present.
      // Everything else: try network first, fall back to cache.
      const isShell = url.origin === location.origin;
      if (isShell && cached) return cached;
      return fetchPromise.then((res) => res || cached);
    })
  );
});
