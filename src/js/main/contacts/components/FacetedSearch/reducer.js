import { SearchStates } from 'types'
import { groupContacts } from 'utils'
import { performFacetedSearch, sortContactGroups } from './utils'

function reducer(state, action) {
  switch (action.type) {
    case 'search-input': {
      return {
        ...state,
        status: SearchStates.ACTIVE,
      }
    }
    case 'search': {
      const searchQuery = action.payload
      return {
        ...state,
        searchQuery,
        status: SearchStates.INACTIVE,
        resultGroups: performFacetedSearch({
          contactGroups: state.searchableContactGroups,
          query: searchQuery,
          filter: state.filterOption,
        }),
      }
    }
    case 'filter': {
      const filterOption = action.payload
      return {
        ...state,
        filterOption,
        status: SearchStates.INACTIVE,
        resultGroups: performFacetedSearch({
          contactGroups: state.searchableContactGroups,
          query: state.searchQuery,
          filter: filterOption,
        }),
      }
    }
    case 'sort': {
      const sortOption = action.payload
      const sorted = sortContactGroups(
        groupContacts(state.searchableContactGroups, sortOption)
      )

      return {
        ...state,
        sortOption,
        status: SearchStates.INACTIVE,
        searchableContactGroups: sorted,
        resultGroups: performFacetedSearch({
          contactGroups: sorted,
          query: state.searchQuery,
          filter: state.filterOption,
        }),
      }
    }
    default:
      throw new Error(`Missing ${action.type} in FacetedSearch reducer`)
  }
}

export default reducer
