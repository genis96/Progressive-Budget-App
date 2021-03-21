const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js",
    "/indexDb.js",
    "/manifest.webmanifest",
    "/service-worker.js",
    "/style.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
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
self.addEventListener("activate", function(evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if(key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        return caches.delete(key);
                        // console.log('remove old caches', key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// FETCH
self.addEventListener("fetch", function(evt) {
    // request to the api
    if(evt.request.url.includes("/api/")) {
        evt.respondWith(
            caches
            .open(DATA_CACHE_NAME)
            .then((cache) => {
                return fetch(evt.request)
                .then((response) => {
                    // its good - clone it and store it in the cache.
                    if(response.status == 200) {
                        cache.put(evt.request.url, response.clone());
                    }
                    return response;
                }).catch((err) => {
                    // Network request failed, try to get from the cache
                    return cache.match(evt.request);
                });
            }).cache((err) => console.log(err))
        );
        return;
    }

    // SERVE STATIC PG - OFFLINE APPROACH 
    evt.respondWith(
        caches.match(evt.request).then(response => {
            return response || fetch(evt.request);
        })
    );
});

