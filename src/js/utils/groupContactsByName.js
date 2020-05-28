import { toUpper } from 'lodash'
import groupContactsBy from './groupContactsBy'

function groupContactsByName(collection) {
  return groupContactsBy(collection, (contact) => {
    const letter = contact.name?.charAt(0)
    return toUpper(letter)
  })
}

export default groupContactsByName
