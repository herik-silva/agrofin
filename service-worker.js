var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  '/minha-carteira',
  '/minha-carteira/index.html',
  '/minha-carteira/index.js',
  '/minha-carteira/64x64.png',
  '/minha-carteira/192x192.png',
  '/minha-carteira/512x512.png',
  '/minha-carteira/favicon.ico',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
