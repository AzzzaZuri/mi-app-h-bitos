
const CACHE_NAME = 'habitkit-v2';
const assets = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      
      return fetch(event.request).catch(() => {
        // Si falla la red y no está en caché, simplemente dejamos que falle
        // o podríamos devolver la página principal si es una navegación
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});
