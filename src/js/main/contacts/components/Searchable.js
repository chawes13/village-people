import React, { useState, useCallback } from 'react'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import { LoadingContainer } from '@launchpadlab/lp-components'
import { useUID } from 'react-uid'

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number, // ms
  label: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
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
}) {
  const [status, setStatus] = useState(Statuses.SUCCESS)
  const [searchQuery, setSearchQuery] = useState(null)
  const id = 'searchable-' + useUID()

  const debouncedSearch = useCallback(
    debounce((query) => {
      Promise.resolve(onSearch(query)).then(() => setStatus(Statuses.SUCCESS))
    }, delay),
    [onSearch]
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
          value={searchQuery || ''}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setStatus(Statuses.SEARCHING)
            debouncedSearch(e.target.value)
          }}
          autoComplete="off"
          placeholder={placeholder}
          aria-label={showLabel ? undefined : label}
          className={className}
        />
      </div>
      <LoadingContainer isLoading={status === Statuses.SEARCHING}>
        {children}
      </LoadingContainer>
    </div>
  )
}

Searchable.propTypes = propTypes
Searchable.defaultProps = defaultProps

export default Searchable
