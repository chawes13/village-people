const CACHE_NAME = 'village-people-static-cache-v1'
const STATIC_FILES_TO_CACHE = [
  'index.html',
  'env',
  'main.js',
  'manifest.json',
  'favicon.png',
  'lpl-192.png',
]
const DATA_CACHE_NAME = 'village-people-data-cache-v1'

// Only cache data returned via GET requests
function cacheableRequest (request) {
  return request.method === 'GET'
}

// Valid HTTP responses return codes with 2xx or 3xx
function validResponse (response) {
  return /^(2|3)\d{2}$/.test(response.status)
}

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
            if (cacheableRequest(event.request) && validResponse(response)) cache.put(event.request.url, response.clone())
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
      caches.open(CACHE_NAME)
        .then((cache) => {
          // Return cached file or attempt to fetch it over the network
          // "Pages" that are not cached should return the index (since it's a SPA)
          return cache.match(event.request)
            .then((response) => {
              return response || fetch(event.request).catch(() => {
                return cache.match('index.html')
              })
            })
        })
    )
  }
})
