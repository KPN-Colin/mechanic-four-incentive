const CACHE_NAAM = 'mechanic4-v2';

const CACHE_BESTANDEN = [
    '/start.html',
    '/index.html',
    '/videos.html',
    '/uitleg.html',
    '/qa.html',
    '/tussenstand.html',
    '/games.html',
    '/winnen.html',
    '/game-quiz.html',
    '/game-memory.html',
    '/game-tiktak.html',
    '/game-woordraad.html',
    '/manifest.json',
    '/images/logo/kpn-logo.png',
    '/images/logo/m4-icon.png',
    '/images/logo/m4-favicon.ico',
    '/images/mechanics/m4-all.gif',
    '/images/mechanics/m4-jasper.gif',
    '/images/mechanics/m4-alberto.gif',
    '/images/mechanics/m4-arie.gif',
    '/images/mechanics/m4-colin.gif',
    '/images/icons/tussenstand.png',
    '/images/icons/videos.png',
    '/images/icons/uitleg.png',
    '/images/icons/qa.png',
    '/images/icons/games.png',
    '/images/icons/winnen.png',
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAAM).then(function(cache) {
            return cache.addAll(CACHE_BESTANDEN);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(cacheNamen) {
            return Promise.all(
                cacheNamen
                    .filter(naam => naam !== CACHE_NAAM)
                    .map(naam => caches.delete(naam))
            );
        })
    );
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e) {
    if (e.request.method !== 'GET') return;

    const url = new URL(e.request.url);
    const isEigen = url.origin === self.location.origin;

    if (!isEigen) {
        e.respondWith(fetch(e.request));
        return;
    }

    e.respondWith(
        fetch(e.request)
            .then(function(response) {
                if (response && response.status === 200) {
                    const responseKopie = response.clone();
                    caches.open(CACHE_NAAM).then(function(cache) {
                        cache.put(e.request, responseKopie);
                    });
                }
                return response;
            })
            .catch(function() {
                return caches.match(e.request);
            })
    );
});
