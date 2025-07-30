const CACHE_NAME = 'godani-tour-v3';
const STATIC_CACHE = 'godani-static-v3';
const DYNAMIC_CACHE = 'godani-dynamic-v3';

// Core files to cache immediately
const coreAssets = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './images/logo1.png'
];

// Additional assets to cache
const assets = [
  './images/hero01.jpg',
  './images/hero1.jpg',
  './images/hero03.jpg',
  './images/hero04.jpg',
  './images/shop1.jpg',
  './images/pd1.jpg',
  './images/pd2.jpg',
  './images/pd3.jpg',
  './images/pd4.jpg',
  './images/man3.jpg'
];

// Install event - cache core resources
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching core assets');
        return cache.addAll(coreAssets);
      })
      .then(() => {
        return caches.open(CACHE_NAME);
      })
      .then(cache => {
        console.log('[SW] Caching additional assets');
        return cache.addAll(assets);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - Network First with Cache Fallback strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    // Try network first
    fetch(request)
      .then(response => {
        // If successful, clone and cache the response
        if (response.status === 200) {
          const responseClone = response.clone();
          
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // If network fails, try static cache first, then dynamic cache
        return caches.match(request, { cacheName: STATIC_CACHE })
          .then(response => {
            if (response) return response;
            return caches.match(request, { cacheName: CACHE_NAME });
          })
          .then(response => {
            if (response) return response;
            return caches.match(request, { cacheName: DYNAMIC_CACHE });
          })
          .then(response => {
            // If still no match, return offline page or basic response
            if (response) return response;
            
            // For HTML requests, return the main page
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
            
            // For other requests, return a simple offline response
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background sync for future enhancements
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered');
  // Future: implement background data sync
});

// Push notifications (if needed in future)
self.addEventListener('push', event => {
  console.log('[SW] Push message received');
  // Future: implement push notifications
}); 