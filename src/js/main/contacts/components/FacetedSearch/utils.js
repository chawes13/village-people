import { trim, includes, toLower } from 'lodash'
import { filterObjectValues } from 'utils'
import { DEFAULT_GROUP_NAME } from 'config'

export function performFacetedSearch({ query, filter, contactGroups }) {
  const normalizedQuery = trim(toLower(query))
  return filterObjectValues(contactGroups, (contact) => {
    return (
      (filter === '' || contact.shift === filter) &&
      (query === '' || includes(toLower(contact.name), normalizedQuery))
    )
  })
}

export function sortContactGroups(contactGroups) {
  return Object.keys(contactGroups)
    .sort((a, b) => {
      // Push default group to very end
      if (a === DEFAULT_GROUP_NAME) return 1
      if (b === DEFAULT_GROUP_NAME) return -1
      if (a === b) return 0
      return a.toUpperCase() > b.toUpperCase() ? 1 : -1
    })
    .reduce((acc, key) => {
      acc[key] = contactGroups[key]
      return acc
    }, {})
}
