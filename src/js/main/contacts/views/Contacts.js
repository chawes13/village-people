import React, { useEffect, useState } from 'react'
// import { api } from 'api'
import { Spinner } from '@launchpadlab/lp-components'
import { ContactCard, FacetedSearch } from '../components'
import {
  isEmpty,
  map,
} from 'lodash'
import CONTACTS_RESPONSE from '../../../../../fixtures/contacts.json'
import FILTER_OPTIONS_RESPONSE from '../../../../../fixtures/filter-options.json'
import SORT_OPTIONS_RESPONSE from '../../../../../fixtures/sort-options.json'

const propTypes = {}

const defaultProps = {}

const States = {
  LOADING: 'loading',
  FAILURE: 'failure',
  SUCCESS: 'success',
}

function EmptyState({ message }) {
  return (
    <div className="empty-search">
      <p>{message}</p>
    </div>
  )
}

function fetchContacts() {
  // return api.get('/contacts')
  return Promise.resolve(JSON.parse(JSON.stringify(CONTACTS_RESPONSE)))
}

function fetchFilterOptions() {
  // return api.get('/filter-options')
  return Promise.resolve(JSON.parse(JSON.stringify(FILTER_OPTIONS_RESPONSE)))
}

function fetchSortOptions() {
  // return api.get('/sort-options')
  return Promise.resolve(JSON.parse(JSON.stringify(SORT_OPTIONS_RESPONSE)))
}

function Contacts() {
  const [state, setState] = useState(States.LOADING)
  const [contacts, setContacts] = useState(null)
  const [filterOptions, setFilterOptions] = useState(null)
  const [sortOptions, setSortOptions] = useState(null)

  // On mount
  useEffect(() => {
    Promise.all([fetchContacts(), fetchFilterOptions(), fetchSortOptions()])
      .then(([contacts, filterOptions, sortOptions]) => {
        setContacts(contacts)
        setFilterOptions(filterOptions)
        setSortOptions(sortOptions)
        setState(States.SUCCESS)
      })
      .catch(() => setState(States.FAILURE))
  }, [])

  if (state === States.LOADING) return <Spinner />
  if (state === States.FAILURE) return <div>Oops! Something went wrong</div>

  return (
    <div>
      <FacetedSearch
        label="search"
        initialResults={contacts}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      >
        {(resultGroups) => {
          if (isEmpty(resultGroups)) return <EmptyState message="No contacts found" />
          return (
            <>
              {map(resultGroups, (results, groupName) => (
                <div key={groupName}>
                  <h3>{groupName}</h3>
                  <ul>
                    {results.map((result) => (
                      <li key={result.phoneNumber}>
                        <ContactCard
                          name={`${result.firstName} ${result.lastName}`}
                          phoneNumber={result.phoneNumber}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )
        }}
      </FacetedSearch>
    </div>
  )
}

Contacts.propTypes = propTypes
Contacts.defaultProps = defaultProps

export default Contacts
