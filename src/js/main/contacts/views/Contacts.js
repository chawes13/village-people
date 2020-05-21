import React, { useEffect, useState, useMemo } from 'react'
import * as Types from 'types'
import { api } from 'api'
import { Spinner } from '@launchpadlab/lp-components'
import { EmptyState } from 'components'
import { ContactCard, FacetedSearch } from '../components'
import { isEmpty, map, sortBy } from 'lodash'
import { getDataFromCache } from 'utils'

const propTypes = {}

const defaultProps = {}

function fetchContacts() {
  return api.get('/contacts')
}

function fetchFilterOptions() {
  return api.get('/contacts/filter-options')
}

function Contacts() {
  const [state, setState] = useState(Types.LoadingStates.LOADING)
  const [contacts, setContacts] = useState(null)
  const [filterOptions, setFilterOptions] = useState([])

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

    getDataFromCache('/contacts/filter-options').then((res) => {
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
            <div className="contact-block-container">
              {map(resultGroups, (results, groupName) => (
                <div key={groupName} className="contact-blocks">
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
            </div>
          )
        }}
      </FacetedSearch>
    </div>
  )
}

Contacts.propTypes = propTypes
Contacts.defaultProps = defaultProps

export default Contacts
