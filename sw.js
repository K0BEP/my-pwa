const CACHE_NAME = 'stones-pwa-cache-v3';
const urlsToCache = [
  // Основные HTML-страницы
  '/',
  '/index.html',
  '/funny_stones.html',
  '/sad_stones.html',
  '/weird_stones.html',
  '/feedback.html',
  '/feedback_success.html',

  // CSS и JS
  '/style.css',
  '/sw.js',

  // Иконки PWA
  '/icons/Icon192.png',
  '/icons/icon512.png',

  // Основные изображения
  '/images/main_1.jpg',
  '/images/main_2.jpg',
  '/images/main_3.jpg',

  // Веселые камни
  '/images/funny_1.jpg',
  '/images/funny_2.jpg',
  '/images/funny_3.jpg',
  '/images/funny_4.jpg',
  '/images/funny_5.jpg',

  // Грустные камни
  '/images/sad_1.jpg',
  '/images/sad_2.jpg',
  '/images/sad_3.jpg',
  '/images/sad_4.jpg',
  '/images/sad_5.jpg',

  // Странные камни
  '/images/weird_1.jpg',
  '/images/weird_2.jpg',
  '/images/weird_3.jpg',
  '/images/weird_4.jpg',
  '/images/weird_5.jpg',

  // PHP-скрипты (если нужно работать офлайн)
  '/send_feedback.php',
  '/feedback_success.php',
  '/create_db.php'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});