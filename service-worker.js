self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open('quiz-cache-v1').then(async cache => {
      const res = await fetch(e.request).catch(()=>null);
      if (res && e.request.url.startsWith(self.location.origin)) {
        cache.put(e.request, res.clone());
      }
      return res || cache.match(e.request);
    })
  );
});
