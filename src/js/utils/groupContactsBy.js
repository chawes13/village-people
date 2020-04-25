import { isArray, groupBy, flatMap } from 'lodash'

function groupContactsBy(collection, option) {
  const contactsArray = getContacts(collection)
  return groupBy(contactsArray, option)
}

// ----- PRIVATE -----

function getContacts(collection) {
  if (isArray(collection)) return collection
  return flatMap(collection, (values) => values)
}

export default groupContactsBy
