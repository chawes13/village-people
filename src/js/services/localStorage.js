export const [getToken, setToken, clearToken] = createStorageAccessor(
  'village-people-token'
)

/* HELPERS */

// Get item from localStorage, falling back to session storage
function getItem(key) {
  try {
    const item = localStorage.getItem(key) || sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (e) {
    return null
  }
}

// Remove item from local storage and session storage
function removeItem(key) {
  localStorage.removeItem(key)
  sessionStorage.removeItem(key)
}

// Set item in local storage or session storage (if specified)
export function setItem(key, value, options = {}) {
  const { persist = true } = options
  const stringifiedValue = JSON.stringify(value)
  removeItem(key)
  return persist
    ? localStorage.setItem(key, stringifiedValue)
    : sessionStorage.setItem(key, stringifiedValue)
}

/**
 * Given a key, returns functions for getting, setting, and clearing that key
 * @example
 *
 * export const [
 *  getSelectedMembership,
 *  setSelectedMembership,
 *  clearSelectedMembership
 * ] = createStorageAccessor('selectedMembership', { persist: false })
 *
 **/
export function createStorageAccessor(key, defaultOptions = {}) {
  const get = () => getItem(key)
  const set = (value, options = {}) =>
    setItem(key, value, { ...defaultOptions, ...options })
  const clear = () => removeItem(key)

  return [get, set, clear]
}
