import React, { useEffect, useState } from 'react'
import * as Types from 'types'
// import { api } from 'api'
import { Spinner } from '@launchpadlab/lp-components'
import { ContactCard, EmptyState, FacetedSearch } from '../components'
import { isEmpty, map } from 'lodash'
import CONTACTS_RESPONSE from '../../../../../fixtures/contacts.json'
import FILTER_OPTIONS_RESPONSE from '../../../../../fixtures/filter-options.json'
import SORT_OPTIONS_RESPONSE from '../../../../../fixtures/sort-options.json'

const propTypes = {}

const defaultProps = {}

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
  const [state, setState] = useState(Types.LoadingStates.LOADING)
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
        setState(Types.LoadingStates.SUCCESS)
      })
      .catch(() => setState(Types.LoadingStates.FAILURE))
  }, [])

  if (state === Types.LoadingStates.LOADING) return <Spinner />
  if (state === Types.LoadingStates.FAILURE)
    return <EmptyState className="error" message="Oops! Something went wrong" />

  return (
    <div>
      <FacetedSearch
        label="search"
        initialResults={contacts}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      >
        {(resultGroups) => {
          if (isEmpty(resultGroups))
            return <EmptyState message="No contacts found" />
          return (
            <>
              {map(resultGroups, (results, groupName) => (
                <div key={groupName}>
                  <h3>{groupName}</h3>
                  <ul>
                    {results.map((contact) => (
                      <li key={contact.phoneNumber}>
                        <ContactCard
                          name={`${contact.firstName} ${contact.lastName}`}
                          phoneNumber={contact.phoneNumber}
                          details={`${contact.house} - ${contact.shift}`}
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
