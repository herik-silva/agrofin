var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  '/agrofin',
  '/agrofin/index.html',
  '/agrofin/index.js',
  '/agrofin/images/64x64.png',
  '/agrofin/images/192x192.png',
  '/agrofin/images/512x512.png',
  '/agrofin/images/favicon.ico',
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
