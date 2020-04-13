import React, { useEffect, useState, useCallback } from 'react'
// import { api } from 'api'
import { Spinner } from '@launchpadlab/lp-components'
import { Expandable, Searchable } from '../components'
import {
  isEmpty,
  includes,
  toLower,
  toUpper,
  trim,
  map,
  sortBy,
  startCase,
} from 'lodash'
import { filterObjectValues, groupContactsByName, groupContactsBy } from 'utils'

const propTypes = {}

const defaultProps = {}

const States = {
  LOADING: 'loading',
  FAILURE: 'failure',
  SUCCESS: 'success',
}

const SortOptions = {
  NAME: 'name',
  HOUSE: 'house',
}

const ShiftFilterOptions = {
  AM: 'AM',
  PM: 'PM',
}

const CONTACTS = [
  {
    firstName: 'Conor',
    lastName: 'Smith',
    phoneNumber: '5551231234',
    house: 'T1',
    shift: 'AM',
  },
  {
    firstName: 'Sara',
    lastName: 'Doe',
    phoneNumber: '5551231235',
    house: 'T1',
    shift: 'PM',
  },
  {
    firstName: 'Andrew',
    lastName: 'Matters',
    phoneNumber: '5551231236',
    house: 'T2',
    shift: 'PM',
  },
  {
    firstName: 'Matt',
    lastName: 'Ruffalo',
    phoneNumber: '5551231237',
    house: 'T3',
    shift: 'AM',
  },
]

function EmptyState({ message }) {
  return (
    <div className="empty-search">
      <p>{message}</p>
    </div>
  )
}

function sortContacts(contacts, option) {
  if (option === SortOptions.NAME) return groupContactsByName(contacts)
  return groupContactsBy(contacts, SortOptions[toUpper(option)])
}

function Contacts() {
  const [state, setState] = useState(States.LOADING)
  const [allContacts, setAllContacts] = useState(null)
  const [contactGroups, setContactGroups] = useState(null)
  const [sortCriteria, setSortCriteria] = useState(SortOptions.NAME)
  const [filterCriteria, setFilterCriteria] = useState('')

  // On mount
  useEffect(() => {
    // api.get('/api/contacts')
    //   .then((res) => {
    //     setContacts(res)
    //     setState(States.SUCCESS)
    //   })
    //   .catch(() => setState(States.FAILURE))

    const sortedContacts = sortBy(CONTACTS, 'lastName')
    setAllContacts(sortedContacts)

    const groupedContacts = groupContactsByName(sortedContacts)
    setContactGroups(groupedContacts)
    setTimeout(() => setState(States.SUCCESS), 250)
  }, [])

  const handleSearch = useCallback(
    (searchQuery) => {
      if (!searchQuery)
        return setContactGroups(sortContacts(allContacts, sortCriteria))

      const normalizedQuery = trim(toLower(searchQuery))
      const filteredContactGroups = filterObjectValues(
        contactGroups,
        (contact) => {
          return includes(
            toLower(`${contact.firstName} ${contact.lastName}`),
            normalizedQuery
          )
        }
      )

      setContactGroups(filteredContactGroups)
    },
    [contactGroups, sortCriteria]
  )

  const handleSort = useCallback(
    (e) => {
      const sortOption = e.target.value
      setSortCriteria(sortOption)
      setContactGroups(sortContacts(contactGroups, sortOption))
    },
    [contactGroups, sortCriteria]
  )

  const handleFilter = useCallback(
    (e) => {
      const filterOption = e.target.value
      setFilterCriteria(filterOption)

      if (!filterOption)
        return setContactGroups(sortContacts(allContacts, sortCriteria))

      const filteredContacts = allContacts.filter(
        (contact) => contact.shift === filterOption
      )

      setContactGroups(sortContacts(filteredContacts, sortCriteria))
    },
    [contactGroups, sortCriteria]
  )

  if (state === States.LOADING) return <Spinner />
  if (state === States.FAILURE) return <div>Oops! Something went wrong</div>

  return (
    <div>
      <Searchable onSearch={handleSearch} label={'Search Contacts'}>
        <>
          <select value={filterCriteria} onChange={handleFilter}>
            <option value="">Select</option>
            {map(ShiftFilterOptions, (value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <select value={sortCriteria} onChange={handleSort}>
            {map(SortOptions, (value) => (
              <option key={value} value={value}>
                {startCase(value)}
              </option>
            ))}
          </select>
          {isEmpty(contactGroups) && <EmptyState message="No contacts found" />}
          {map(contactGroups, (contacts, group) => (
            <div key={group}>
              <h3>{group}</h3>
              {contacts.map((contact) => (
                <ul key={contact.phoneNumber}>
                  <li>
                    <Expandable
                      headerTitle={`${contact.firstName} ${contact.lastName}`}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <a href={'tel:' + contact.phoneNumber}>
                          <div>{contact.phoneNumber}</div>
                        </a>
                        <a href={'sms:' + contact.phoneNumber}>Text</a>
                      </div>
                    </Expandable>
                  </li>
                </ul>
              ))}
            </div>
          ))}
        </>
      </Searchable>
    </div>
  )
}

Contacts.propTypes = propTypes
Contacts.defaultProps = defaultProps

export default Contacts
