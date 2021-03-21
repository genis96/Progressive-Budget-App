const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js",
    "/indexDb.js",
    "/manifest.webmanifest",
    "/service-worker.js",
    "/style.css"
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// INSTALL
// pre cache files 
self.addEventListener("install", function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    )
    self.skipWaiting();
});

// ACTIVATE

// FETCH

// SERVE STATIC PG - OFFLINE APPROACH 
evt.respondWith(
    caches.match(evt.request).then(response => {
        return response || fetch(evt.request);
    })
);
