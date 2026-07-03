const CACHE_NAME = 'mozvita-cv-v2.2.0';
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
  const url = new URL(event.request.url);

  // DEV MODE: Em localhost, NUNCA interceptar — deixar o Vite HMR funcionar livremente
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return; // Não intercepta nada em desenvolvimento
  }

  // 1. IGNORAR: Rotas que devem ir sempre para a Rede (Dinâmicas, API, Preview)
  if (
    url.pathname.includes('/preview') || 
    url.pathname.includes('/functions/v1/') ||
    url.hostname.includes('supabase.co') ||
    event.request.method !== 'GET'
  ) {
    return; // Deixa o browser lidar com a requisição normalmente
  }

  // 2. Para HTML e navegação, usar sempre Network First
  if (event.request.mode === 'navigate' || (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request).then(res => res || caches.match('/index.html')))
    );
    return;
  }

  // 3. Para tudo o resto, usamos Cache-First normal, caindo para a Network
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