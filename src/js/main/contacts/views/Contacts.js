import React, { useEffect, useState, useMemo } from 'react'
import * as Types from 'types'
// import { api } from 'api'
import { Spinner } from '@launchpadlab/lp-components'
import { ContactCard, EmptyState, FacetedSearch } from '../components'
import { isEmpty, map, sortBy } from 'lodash'
import { getDataFromCache } from 'utils'
import CONTACTS_RESPONSE from '../../../../../fixtures/contacts.json'
import FILTER_OPTIONS_RESPONSE from '../../../../../fixtures/filter-options.json'

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

function Contacts() {
  const [state, setState] = useState(Types.LoadingStates.LOADING)
  const [contacts, setContacts] = useState(null)
  const [filterOptions, setFilterOptions] = useState(
    JSON.parse(JSON.stringify(FILTER_OPTIONS_RESPONSE))
  )

  // On mount
  useEffect(() => {
    // SWR (stale-while-revalidate) caching strategy
    getDataFromCache('/contacts').then((res) => {
      if (res) {
        setContacts(res)
        setState(Types.LoadingStates.SUCCESS)
      }
    })

    fetchContacts().then((res) => {
      setContacts(res)
      setState(Types.LoadingStates.SUCCESS)
    })

    getDataFromCache('/filter-options').then((res) => {
      if (res) {
        setFilterOptions(res)
      }
    })

    fetchFilterOptions().then(setFilterOptions)
  }, [])

  const sortedContacts = useMemo(() => {
    return sortBy(contacts, 'lastName')
  }, [contacts])

  if (state === Types.LoadingStates.LOADING) return <Spinner />
  if (state === Types.LoadingStates.FAILURE)
    return <EmptyState className="error" message="Oops! Something went wrong" />

  return (
    <div>
      <FacetedSearch
        label="search"
        initialResults={sortedContacts}
        filterOptions={filterOptions}
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
                      <li
                        key={
                          contact.firstName +
                          contact.lastName +
                          contact.phoneNumber
                        }
                      >
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
