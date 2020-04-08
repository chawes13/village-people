import React, { useEffect, useState } from 'react'
import { api } from 'api'
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

function Home() {
  const [state, setState] = useState(States.LOADING)
  const [contacts, setContacts] = useState(null)

  useEffect(() => {
    api.get('/api/contacts')
      .then((res) => {
        setContacts(res)
        setState(States.SUCCESS)
      })
      .catch(() => setState(States.FAILURE))
  }, [])

  if (state === States.LOADING) return <div>Loading...</div>
  if (state === States.FAILURE) return <div>Oops! Something went wrong</div>

  return (
    <div>
      <h1>Misbook</h1>
      {contacts.map((contact) => (
        <ul key={contact.phoneNumber}>
          <li>
            {`${contact.firstName} ${contact.lastName}: `} <a href={'sms:' + contact.phoneNumber}>Text</a>
          </li>
        </ul>
      ))}
    </div>
  )
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default Home
