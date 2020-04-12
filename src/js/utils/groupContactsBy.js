import { groupBy, isArray, flatMap } from 'lodash'

function groupContactsBy(collection, iteratee) {
  const contacts = getContacts(collection)
  return groupBy(contacts, iteratee)
}

// ----- PRIVATE -----

function getContacts(collection) {
  if (isArray(collection)) return collection
  return flatMap(collection, (values) => values)
}

export default groupContactsBy
