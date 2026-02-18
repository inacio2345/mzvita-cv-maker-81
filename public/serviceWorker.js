const CACHE_NAME = 'mozvita-cv-v1.0.2-mobile-ux-fix';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/lovable-uploads/9ba5a3fa-d7f6-4670-8925-292038ef7b22.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  self.skipWaiting(); // Force new SW to take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('PWA: Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('PWA: Cache failed', error);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          // If both cache and network fail, return a fallback page
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('PWA: Deleting old cache', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return self.clients.claim(); // Take control of all clients immediately
    })
  );
});