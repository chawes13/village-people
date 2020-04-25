export function register() {
  if (!supportsServiceWorkers()) return

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      // eslint-disable-next-line
      console.log('Service worker registered for scope:', reg.scope)
    })
  })
}

export function unregister() {
  if (!supportsServiceWorkers()) return

  navigator.serviceWorker.ready.then((registration) => {
    registration.unregister()
  })
}

// Check that browser supports service workers
function supportsServiceWorkers() {
  return 'serviceWorker' in navigator
}
