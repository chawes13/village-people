import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import * as LS from 'local-storage'

const propTypes = {}

const defaultProps = {}

function About() {
  const isAuthenticated = useMemo(() => !!LS.getToken(), [])
  return (
    <div>
      <p>Welcome to the Village People!</p>
      {isAuthenticated && (
        <>
          <p>
            This is an application that provides management with a shared
            address book for the staff in the Village.
          </p>
          <Link to="/contacts" className="button-primary">
            View Contacts
          </Link>
        </>
      )}
      {!isAuthenticated && (
        <p>
          This is an application that provides management with a shared address
          book for the staff in the Village. If you would like access, please
          send a request to your administrator.
        </p>
      )}
    </div>
  )
}

About.propTypes = propTypes
About.defaultProps = defaultProps

export default About
