const CACHE_NAAM = 'mechanic4-v1';

// Alle bestanden die gecached worden bij installatie
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

// Installatie — cache alle bestanden
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAAM).then(function(cache) {
            return cache.addAll(CACHE_BESTANDEN);
        })
    );
    self.skipWaiting();
});

// Activatie — verwijder oude caches
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

// Fetch — probeer netwerk eerst, val terug op cache
self.addEventListener('fetch', function(e) {
    // Sla niet-GET verzoeken over (bijv. Airtable POST)
    if (e.request.method !== 'GET') return;

    // Sla externe API verzoeken over — alleen cachen wat van onze eigen server komt
    const url = new URL(e.request.url);
    const isEigen = url.origin === self.location.origin;

    if (!isEigen) {
        // Externe verzoeken (Airtable, Graph API) altijd via netwerk
        e.respondWith(fetch(e.request));
        return;
    }

    // Eigen bestanden: netwerk eerst, dan cache als fallback
    e.respondWith(
        fetch(e.request)
            .then(function(response) {
                // Sla verse versie op in cache
                if (response && response.status === 200) {
                    const responseKopie = response.clone();
                    caches.open(CACHE_NAAM).then(function(cache) {
                        cache.put(e.request, responseKopie);
                    });
                }
                return response;
            })
            .catch(function() {
                // Geen netwerk — gebruik cache
                return caches.match(e.request);
            })
    );
});
