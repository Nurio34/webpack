
const staticCacheName = "site-static-v3"
const dynamicCacheName = "site-dynamic-v1"
const assets = [ ]
if(`process.env.NODE_ENV` === 'production') {
    assets.push(
        "/",
        "/build/527.js",
        "/build/bundle.css",
        "/build/bundle.js",
        "/build/shared.js",
        "/build/manifest.json",
        "https://ka-f.fontawesome.com/releases/v6.5.1/css/free.min.css?token=b69fb5b7db",
        "https://ka-f.fontawesome.com/releases/v6.5.1/css/free-v4-shims.min.css?token=b69fb5b7db",
        "https://ka-f.fontawesome.com/releases/v6.5.1/css/free-v5-font-face.min.css?token=b69fb5b7db",
        "https://ka-f.fontawesome.com/releases/v6.5.1/css/free-v4-font-face.min.css?token=b69fb5b7db",
        "/build/assets/logo144.png",
    )
}
else {
    assets.push(
        "/",
        "/bundle.js",
        "/shared.js",
        "/manifest.json",
        "https://ka-f.fontawesome.com/releases/v6.5.1/css/free.min.css?token=b69fb5b7db",
        "https://ka-f.fontawesome.com/releases/v6.5.1/css/free-v4-shims.min.css?token=b69fb5b7db",
        "https://ka-f.fontawesome.com/releases/v6.5.1/css/free-v5-font-face.min.css?token=b69fb5b7db",
        "https://ka-f.fontawesome.com/releases/v6.5.1/css/free-v4-font-face.min.css?token=b69fb5b7db",
        "/assets/logo144.png",
    )///
}

self.addEventListener("install",e=>{
    console.log("SW nstalled");

    e.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            console.log("Caching static assets");
            cache.addAll(assets)
        })
    )
})

self.addEventListener("activate",e=>{
    console.log("SW activated");

    e.waitUntil(
        caches.keys()
        .then(keys => {
            console.log(keys);

            return Promise.all(
                keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener("fetch",e=>{
    console.log("Fetch event ");

    e.respondWith(
        caches.match(e.request)
        .then(cacheRes => {
            return cacheRes || fetch(e.request)
            .then(fetchRes => {
                return caches.open(dynamicCacheName)
                .then(cache => {
                    cache.put(e.request.url, fetchRes.clone())
                    return fetchRes
                })
            })
        })        
    )
})

///