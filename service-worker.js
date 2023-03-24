var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  'agrofin/',
  'agrofin/agrofin/index.html',
  'agrofin/styles.css',
  'agrofin/script.js',
  'agrofin/images/logo.png'
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
