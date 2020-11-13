importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    'https://api.football-data.org/v2/competitions/2002/standings/',
    // { url: '/', revision: '1' },
    { url: '/index.html', revision: '2' },
    { url: '/team.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/pages/home.html', revision: '2' },
    { url: '/images/football-icon.png', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/vendor/idb.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idbdatabase.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/notofication.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/quicksand/v21/6xKtdSZaM9iE8KbpRA_hJFQNcOM.woff2', revision: '1' },
    { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
]);

workbox.routing.registerRoute(
    new RegExp('/'),
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    /^https:\/\/fonts\.googleapis\.com/,
    /^https:\/\/fonts\.gstatic\.com/,
    /^https:\/\/unpkg\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'FootBalls',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
        ],
    })
);