import React, { useEffect, useState, useCallback } from 'react'
// import { api } from 'api'
import { Spinner } from '@launchpadlab/lp-components'
import { Searchable } from '../components'
import {
  isEmpty,
  includes,
  toLower,
  trim,
  groupBy,
  toUpper,
  map,
  sortBy,
} from 'lodash'
import { filterObjectValues } from 'utils'
// import PropTypes from 'prop-types'
// import * as Types from 'types'
// import { selectors } from '../reducer'
// import * as actions from '../actions'
// import * as apiActions from 'api-actions'

const propTypes = {}

const defaultProps = {}

const States = {
  LOADING: 'loading',
  FAILURE: 'failure',
  SUCCESS: 'success',
}

const CONTACTS = [
  { firstName: 'Conor', lastName: 'Smith', phoneNumber: '5551231234' },
  { firstName: 'Sara', lastName: 'Doe', phoneNumber: '5551231235' },
  { firstName: 'Andrew', lastName: 'Matters', phoneNumber: '5551231236' },
  { firstName: 'Matt', lastName: 'Ruffalo', phoneNumber: '5551231237' },
]

function EmptyState({ message }) {
  return (
    <div className="empty-search">
      <p>{message}</p>
    </div>
  )
}

function Home() {
  const [state, setState] = useState(States.LOADING)
  const [contactGroups, setContactGroups] = useState(null)

  useEffect(() => {
    // api.get('/api/contacts')
    //   .then((res) => {
    //     setContacts(res)
    //     setState(States.SUCCESS)
    //   })
    //   .catch(() => setState(States.FAILURE))

    const sortedContacts = sortBy(CONTACTS, 'lastName')
    const groupedContacts = groupBy(sortedContacts, (contact) => {
      const letter = contact.lastName?.charAt(0) || contact.firstName.charAt(0)
      return toUpper(letter)
    })

    setContactGroups(groupedContacts)
    setTimeout(() => setState(States.SUCCESS), 250)
  }, [])

  const handleSearch = useCallback((contactGroups, searchQuery) => {
    const normalizedQuery = trim(toLower(searchQuery))
    return filterObjectValues(contactGroups, (contact) => {
      return includes(
        toLower(`${contact.firstName} ${contact.lastName}`),
        normalizedQuery
      )
    })
  }, [])

  if (state === States.LOADING) return <Spinner />
  if (state === States.FAILURE) return <div>Oops! Something went wrong</div>

  return (
    <div>
      <Searchable
        searchableItems={contactGroups}
        onSearch={handleSearch}
        label={'Search Contacts'}
      >
        {(groups) => {
          if (isEmpty(groups)) return <EmptyState message="No contacts found" />
          return (
            <>
              {map(groups, (contacts, group) => (
                <div>
                  <h3>{group}</h3>
                  {contacts.map((contact) => (
                    <ul key={contact.phoneNumber}>
                      <li>
                        {`${contact.firstName} ${contact.lastName}: `}{' '}
                        <a href={'sms:' + contact.phoneNumber}>Text</a>
                      </li>
                    </ul>
                  ))}
                </div>
              ))}
            </>
          )
        }}
      </Searchable>
    </div>
  )
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default Home
