const CACHE_NAME = 'village-people-cache-v1'
const FILES_TO_CACHE = ['/offline.html', '/favicon.png', 'lpl-192.png', '/astronaut.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE)
    })
  )

  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === CACHE_NAME) return
      return caches.delete(key)
    }))
  }))

  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
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
})
