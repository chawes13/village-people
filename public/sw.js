const CACHE_NAME = 'village-people-static-cache-v1'
const STATIC_FILES_TO_CACHE = ['/index.html', '/offline.html', '/favicon.png', 'lpl-192.png', '/astronaut.svg']
const DATA_CACHE_NAME = 'village-people-data-cache-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES_TO_CACHE)
    })
  )

  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === CACHE_NAME || key === DATA_CACHE_NAME) return
      return caches.delete(key)
    }))
  }))

  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            if (response.status === 200) cache.put(event.request.url, response.clone())
            return response
          })
          .catch((err) => {
            // Network request failed, try to get from cache
            return cache.match(event.request)
          })
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true })
        .then((response) => {
          return response || fetch(event.request).catch(() => {
            return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html')
              })
          })
        }
      )
    )
  }
})
