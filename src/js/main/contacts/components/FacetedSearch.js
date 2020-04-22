import React, { useCallback, useReducer, useMemo } from 'react'
import { debounce, map, sortBy, startCase, includes, toLower, trim } from 'lodash'
import PropTypes from 'prop-types'
import { LoadingContainer } from '@launchpadlab/lp-components'
import { useUID } from 'react-uid'
import { groupContactsByName, groupContactsBy, filterObjectValues } from 'utils'

const propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number, // ms
  filterOptions: PropTypes.array,
  initialResults: PropTypes.array, // TODO: Define later
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  // sortOptions: PropTypes.array,
}

const defaultProps = {
  delay: 500,
  placeholder: 'Search',
  showLabel: false,
}

const Statuses = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

const CustomSortOptions = {
  NAME: 'name',
}

function reducer(state, action) {
  switch (action.type) {
    case 'search': {
      const searchQuery = action.payload
      return {
        ...state,
        searchQuery,
        status: Statuses.INACTIVE,
        resultGroups: performFacetedSearch({ contactGroups: state.searchableContactGroups, query: searchQuery, filter: state.filterOption }),
      }
    }
    case 'filter': {
      const filterOption = action.payload
      return {
        ...state,
        filterOption,
        status: Statuses.INACTIVE,
        resultGroups: performFacetedSearch({ contactGroups: state.searchableContactGroups, query: state.searchQuery, filter: filterOption }),
      }
    }
    case 'sort': {
      const sortOption = action.payload
      const sorted = sortContactGroups(groupContacts(state.searchableContactGroups, sortOption))

      return {
        ...state,
        sortOption,
        status: Statuses.INACTIVE,
        searchableContactGroups: sorted,
        resultGroups: performFacetedSearch({ contactGroups: sorted, query: state.searchQuery, filter: state.filterOption })
      }
    }
    default:
      throw new Error()
  }
}

function performFacetedSearch({ query, filter, contactGroups }) {
  const normalizedQuery = trim(toLower(query))
  return filterObjectValues(contactGroups, (contact) => {
    return (filter === '' || contact.shift === filter) && (query === '' || includes(toLower(`${contact.firstName} ${contact.lastName}`), normalizedQuery))
  })
}

function groupContacts(contacts, option) {
  if (option === CustomSortOptions.NAME) return groupContactsByName(contacts)
  return groupContactsBy(contacts, option)
}

function sortContactGroups(contactGroups) {
  return Object.keys(contactGroups).sort().reduce((acc, key) => {
    acc[key] = contactGroups[key]
    return acc
  }, {})
}

function FacetedSearch({
  children,
  className,
  delay,
  filterOptions,
  initialResults,
  label,
  placeholder,
  showLabel,
  // sortOptions,
}) {
  const id = 'searchable-' + useUID()
  const groupedInitialResults = useMemo(() => {
    return groupContacts(sortBy(initialResults, 'lastName'), 'name')
  }, [initialResults])

  const [state, dispatch] = useReducer(reducer, {
    searchableContactGroups: groupedInitialResults,
    resultGroups: groupedInitialResults,
    sortOption: 'name',
    filterOption: '',
    searchQuery: null,
    status: Statuses.INACTIVE,
  })

  const debouncedSearch = useCallback(
    debounce((query) => {
      // Run onSearch logic
      dispatch({ type: 'search', payload: query })
    }, delay),
    []
  )

  return (
    <div>
      <div className="search-bar">
        {showLabel && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          name="search"
          type="text"
          role="search"
          onChange={(e) => debouncedSearch(e.target.value)}
          autoComplete="off"
          placeholder={placeholder}
          aria-label={showLabel ? undefined : label}
          className={className}
        />
      </div>
      <select value={state.filterOption} onChange={(e) => dispatch({ type: 'filter', payload: e.target.value })}>
        <option value="">Select</option>
        {map(filterOptions[0].options, (option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select value={state.sortOption} onChange={(e) => dispatch({ type: 'sort', payload: e.target.value })}>
        {map(['name', 'house'], (value) => (
          <option key={value} value={value}>
            {startCase(value)}
          </option>
        ))}
      </select>
      <LoadingContainer isLoading={state.status === Statuses.ACTIVE}>
        {children(state.resultGroups)}
      </LoadingContainer>
    </div>
  )
}

FacetedSearch.propTypes = propTypes
FacetedSearch.defaultProps = defaultProps

export default FacetedSearch
