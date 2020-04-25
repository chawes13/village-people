import { CustomSortOptions } from 'types'
import groupContactsByName from './groupContactsByName'
import groupContactsBy from './groupContactsBy'

function groupContacts(collection, option) {
  if (option === CustomSortOptions.NAME) return groupContactsByName(collection)
  return groupContactsBy(collection, option)
}
export default groupContacts
