import React, { useCallback, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as Types from 'types'
import { get, debounce, map, startCase } from 'lodash'
import { LoadingContainer } from '@launchpadlab/lp-components'
import { useUID } from 'react-uid'
import reducer from './reducer'

const propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number, // ms
  filterOptions: PropTypes.array,
  initialResults: PropTypes.array, // Define later
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
}

const defaultProps = {
  delay: 500,
  placeholder: 'Search',
  showLabel: false,
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
}) {
  const id = 'searchable-' + useUID()

  const [state, dispatch] = useReducer(reducer, {
    searchableContactGroups: null,
    resultGroups: null,
    sortOption: Types.CustomSortOptions.NAME,
    filterOption: '',
    searchQuery: '',
    status: Types.SearchStates.INACTIVE,
  })

  // Reset searchable items if results change (likely to happen with SWR caching strategy)
  useEffect(() => {
    dispatch({ type: 'initialize-searchable', payload: initialResults })
  }, [initialResults])

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch({ type: 'search', payload: query })
    }, delay),
    []
  )

  return (
    <div>
      <div className="search-wrapper">
        <div className="search-block-container">
          <div className="search-bar">
            {showLabel && <label htmlFor={id}>{label}</label>}
            <input
              id={id}
              name="search"
              type="search"
              role="search"
              onChange={(e) => {
                dispatch({ type: 'search-input' })
                debouncedSearch(e.target.value)
              }}
              autoComplete="off"
              placeholder={placeholder}
              aria-label={showLabel ? undefined : label}
              className={className}
            />
          </div>
          <div className="secondary-actions">
            <select
              value={state.filterOption}
              onChange={(e) =>
                dispatch({ type: 'filter', payload: e.target.value })
              }
            >
              <option value="">Select</option>
              {map(get(filterOptions, '[0].options'), (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={state.sortOption}
              onChange={(e) =>
                dispatch({ type: 'sort', payload: e.target.value })
              }
            >
              {map(Types.CustomSortOptions, (value) => (
                <option key={value} value={value}>
                  {startCase(value)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <LoadingContainer isLoading={state.status === Types.SearchStates.ACTIVE}>
        {children(state.resultGroups)}
      </LoadingContainer>
    </div>
  )
}

FacetedSearch.propTypes = propTypes
FacetedSearch.defaultProps = defaultProps

export default FacetedSearch
