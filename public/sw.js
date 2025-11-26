// Enhanced Service Worker dla PWA - Advanced Offline Support
const CACHE_VERSION = 'lykkreacji-v2';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC = `${CACHE_VERSION}-dynamic`;
const CACHE_IMAGES = `${CACHE_VERSION}-images`;
const OFFLINE_URL = '/offline.html';

// Assets do pre-cache'owania
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/_next/static/css',
];

// Max cache sizes
const MAX_DYNAMIC_CACHE = 50;
const MAX_IMAGE_CACHE = 60;

// Install - cachuj podstawowe assety
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => {
      return Promise.allSettled(
        STATIC_ASSETS.map(url =>
          cache.add(url).catch(err => {
            console.warn(`[SW] Failed to cache ${url}:`, err);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate - wyczyść stare cache
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheName.startsWith(CACHE_VERSION)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Helper: Limit cache size
const limitCacheSize = (cacheName, maxItems) => {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxItems));
      }
    });
  });
};

// Fetch - Advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // HTML - Network First (with cache fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_DYNAMIC).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => {
          return caches.match(request).then(response => {
            return response || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // Images - Cache First (with network fallback)
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(fetchResponse => {
          return caches.open(CACHE_IMAGES).then(cache => {
            cache.put(request, fetchResponse.clone());
            limitCacheSize(CACHE_IMAGES, MAX_IMAGE_CACHE);
            return fetchResponse;
          });
        });
      })
    );
    return;
  }

  // CSS/JS - Stale While Revalidate
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      caches.match(request).then(response => {
        const fetchPromise = fetch(request).then(fetchResponse => {
          caches.open(CACHE_STATIC).then(cache => cache.put(request, fetchResponse.clone()));
          return fetchResponse;
        });
        return response || fetchPromise;
      })
    );
    return;
  }

  // API calls - Network Only (no cache)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // Everything else - Cache First
  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request).then(fetchResponse => {
        if (request.method === 'GET' && fetchResponse.status === 200) {
          return caches.open(CACHE_DYNAMIC).then(cache => {
            cache.put(request, fetchResponse.clone());
            limitCacheSize(CACHE_DYNAMIC, MAX_DYNAMIC_CACHE);
            return fetchResponse;
          });
        }
        return fetchResponse;
      });
    })
  );
});

// Background Sync (for offline form submissions)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Placeholder for form sync logic
  console.log('[SW] Syncing forms...');
}

// Push Notifications (future feature)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Nowa wiadomość od LykKreacji',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: data.url || '/',
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'LykKreacji', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});
