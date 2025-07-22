const CACHE_NAME = 'stones-pwa-cache-v6';
const OFFLINE_PAGE = '/my-pwa/offline.html';
const ASSETS = [
  '/my-pwa/',
  '/my-pwa/index.html',
  '/my-pwa/style.css',
  '/my-pwa/icons/icon192.png',
  '/my-pwa/icons/icon512.png',
  '/my-pwa/offline.html',
  '/my-pwa/sad_stones.html',
  '/my-pwa/funny_stones.html',
  '/my-pwa/weird_stones.html',
  '/my-pwa/feedback.html',
  '/my-pwa/feedback_success.html',
  '/my-pwa/images/main_1.jpg',
  '/my-pwa/images/main_2.jpg',
  '/my-pwa/images/main_3.jpg',
  '/my-pwa/images/funny_1.jpg',
  '/my-pwa/images/funny_2.jpg',
  '/my-pwa/images/funny_3.jpg',
  '/my-pwa/images/funny_4.jpg',
  '/my-pwa/images/funny_5.jpg',
  '/my-pwa/images/sad_1.jpg',
  '/my-pwa/images/sad_2.jpg',
  '/my-pwa/images/sad_3.jpg',
  '/my-pwa/images/sad_4.jpg',
  '/my-pwa/images/sad_5.jpg',
  '/my-pwa/images/weird_1.jpg',
  '/my-pwa/images/weird_2.jpg',
  '/my-pwa/images/weird_3.jpg',
  '/my-pwa/images/weird_4.jpg',
  '/my-pwa/images/weird_5.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));

            return response;
          })
          .catch(() => {
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match(OFFLINE_PAGE);
            }
          });
      })
  );
});