const STATIC_CACHE_NAME = 'village-people-static-cache-v1'
const STATIC_REQUESTS_TO_CACHE = [
  'index.html',
  'env',
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

function staticAssetRequest (request) {
  return request.url.includes('/static/')
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_REQUESTS_TO_CACHE)
    })
  )

  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === STATIC_CACHE_NAME || key === DATA_CACHE_NAME) return
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
      caches.open(STATIC_CACHE_NAME)
        .then((cache) => {
          // Return cached file or attempt to fetch it over the network
          // "Pages" that are not cached should return index.html (since it's a SPA)
          return cache.match(event.request)
            .then((response) => {
              return response || fetch(event.request)
                .then((response) => {
                  // cache dynamically generated _static_ files (e.g., main.1579e961.js)
                  if (staticAssetRequest(event.request) && validResponse(response)) cache.put(event.request.url, response.clone())
                  return response
                })
                .catch(() => {
                  return cache.match('index.html')
                })
            })
        })
    )
  }
})
