import { isArray, groupBy, flatMap, mapKeys } from 'lodash'
import { DEFAULT_GROUP_NAME } from 'config'

function groupContactsBy(collection, option) {
  const contactsArray = getContacts(collection)
  const groupedContacts = groupBy(contactsArray, option)

  return mapKeys(groupedContacts, (value, key) => {
    if (!key) return DEFAULT_GROUP_NAME
    return key
  })
}

// ----- PRIVATE -----

function getContacts(collection) {
  if (isArray(collection)) return collection
  return flatMap(collection, (values) => values)
}

export default groupContactsBy
