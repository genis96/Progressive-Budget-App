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

// ACTIVATE

// FETCH

// SERVE STATIC PG - OFFLINE APPROACH 
evt.respondWith(
    cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
    })
);
