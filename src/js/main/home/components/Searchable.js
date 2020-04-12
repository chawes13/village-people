import React, { useState, useCallback, useEffect } from 'react'
import { debounce, isNil } from 'lodash'
import PropTypes from 'prop-types'
import { LoadingContainer } from '@launchpadlab/lp-components'
import { useUID } from 'react-uid'

const propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number, // ms
  label: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchableItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  showLabel: PropTypes.bool,
}

const defaultProps = {
  delay: 500,
  placeholder: 'Search',
  showLabel: false,
}

const Statuses = {
  SEARCHING: 'searching',
  SUCCESS: 'success',
}

function Searchable({
  children,
  className,
  delay,
  label,
  onSearch,
  placeholder,
  showLabel,
  searchableItems,
}) {
  const [status, setStatus] = useState(Statuses.SUCCESS)
  const [searchQuery, setSearchQuery] = useState(null)
  const [results, setResults] = useState(null)
  const id = 'searchable-' + useUID()

  const updateResults = useCallback((results) => {
    setResults(results)
    setStatus(Statuses.SUCCESS)
  }, [])

  const debouncedSearch = useCallback(
    debounce((query) => {
      const results = query ? onSearch(searchableItems, query) : searchableItems
      updateResults(results)
    }, delay),
    [onSearch]
  )

  useEffect(() => {
    if (isNil(searchQuery)) return updateResults(searchableItems) // only onMount
    debouncedSearch(searchQuery)
  }, [searchQuery])

  return (
    <div>
      <div className="search-bar">
        {showLabel && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          name="search"
          type="text"
          role="search"
          value={searchQuery || ''}
          onChange={(e) => {
            setStatus(Statuses.SEARCHING)
            setSearchQuery(e.target.value)
          }}
          autoComplete="off"
          placeholder={placeholder}
          aria-label={showLabel ? undefined : label}
          className={className}
        />
      </div>
      <LoadingContainer isLoading={status === Statuses.SEARCHING}>
        {children(results, searchQuery)}
      </LoadingContainer>
    </div>
  )
}

Searchable.propTypes = propTypes
Searchable.defaultProps = defaultProps

export default Searchable
