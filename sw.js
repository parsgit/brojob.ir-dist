self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.startsWith('my-app-v')) {
              // Check if the cache version is outdated
              const version = parseInt(cacheName.split('-').pop());
              if (version < self.registration.active.version) {
                // Delete the outdated cache
                return caches.delete(cacheName);
              }
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          // Return the cached response if it exists
          return response;
        }
  
        // Fetch the resource from the network
        return fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            // Cache the network response
            caches.open('my-app-v' + self.registration.active.version).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
  
          // Return the network response
          return networkResponse;
        });
      })
    );
  });
  