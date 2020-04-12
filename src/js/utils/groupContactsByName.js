import { toUpper } from 'lodash'
import groupContactsBy from './groupContactsBy'

function groupContactsByName(collection) {
  return groupContactsBy(collection, (contact) => {
    const letter = contact.lastName?.charAt(0) || contact.firstName.charAt(0)
    return toUpper(letter)
  })
}

export default groupContactsByName
