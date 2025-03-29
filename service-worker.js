self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('bus-schedule-cache').then(cache => {
            return cache.addAll([
                '/bus_schedule/',
                '/bus_schedule/index.html',
                '/bus_schedule/style.css',
                '/bus_schedule/app.js',
                '/bus_schedule/manifest.json'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
