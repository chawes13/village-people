import { trim, includes, toLower } from 'lodash'
import { filterObjectValues } from 'utils'

export function performFacetedSearch({ query, filter, contactGroups }) {
  const normalizedQuery = trim(toLower(query))
  return filterObjectValues(contactGroups, (contact) => {
    return (
      (filter === '' || contact.shift === filter) &&
      (query === '' ||
        includes(
          toLower(`${contact.firstName} ${contact.lastName}`),
          normalizedQuery
        ))
    )
  })
}

export function sortContactGroups(contactGroups) {
  return Object.keys(contactGroups)
    .sort()
    .reduce((acc, key) => {
      acc[key] = contactGroups[key]
      return acc
    }, {})
}
