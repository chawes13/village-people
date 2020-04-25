import { onSuccess } from 'api'

function getDataFromCache(url) {
  if (!supportsCaches()) return Promise.resolve(null)

  const fullUrl = process.env.API_URL + url
  return caches
    .match(fullUrl)
    .then((response) => {
      if (!response) return null
      return response.json() // returns a promise
    })
    .then(onSuccess)
    .catch((err) => {
      // eslint-disable-next-line
      console.error(`Error getting data from ${url} cache`, err)
      return null
    })
}

// ----- PRIVATE -----

function supportsCaches() {
  return 'caches' in window
}

export default getDataFromCache
