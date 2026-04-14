const CACHE_NAME = 'mozvita-cv-v2.1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  self.skipWaiting(); // Force new SW to take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('PWA: Cache ' + CACHE_NAME + ' opened');
        // Usamos um método mais resiliente que não falha se um dos URLs falhar
        return Promise.allSettled(
          urlsToCache.map(url => cache.add(url))
        );
      })
  );
});

// Fetch event - serve cached content or network
self.addEventListener('fetch', event => {
  // 1. Para HTML e navegação, usar sempre Network First (para não carregar index.html desatualizado com hashes antigos)
  if (event.request.mode === 'navigate' || (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request).then(res => res || caches.match('/index.html')))
    );
    return;
  }

  // 2. Para tudo o resto, usamos Cache-First normal, caindo para a Network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Se tiver no cache, serve imediatamente
        }
        return fetch(event.request); // Senão vai à rede
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('PWA: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Take control immediately
    })
  );
});