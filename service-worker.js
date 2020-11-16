importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: 'index.html', revision: '2' },
    { url: 'nav.html', revision: '2' },
    { url: 'jadwal.html', revision: '1' },
    { url: 'css/materialize.min.css', revision: '1' },
    { url: 'js/materialize.min.js', revision: '1' },
    { url: 'js/vendor/idb.js', revision: '1' },
    { url: 'js/api.js', revision: '3' },
    { url: 'js/idbdatabase.js', revision: '1' },
    { url: 'js/nav.js', revision: '1' },
    { url: 'js/notofication.js', revision: '1' },
    { url: 'manifest.json', revision: '2' },
    { url: 'push.js', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('pages/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages',
  }),
);

workbox.routing.registerRoute(
  new RegExp('team.html'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'team',
  }),
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
      ],
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'footballAPI',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
          new workbox.cacheableResponse.Plugin({
              statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1tahun
              maxEntries: 30,
          }),
      ],
  }),
);

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/images/football-icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });