import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import * as LS from 'local-storage'
import logo from 'images/logo.svg'

const propTypes = {}

const defaultProps = {}

function About() {
  const isAuthenticated = useMemo(() => !!LS.getToken(), [])
  return (
    <div className="content-block-container">
      <div className="card">
        <img src={logo} alt="" />
        <h2>Welcome to the Village People!</h2>
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
            This is an application that provides management with a shared
            address book for the staff in the Village. If you would like access,
            please send a request to your administrator.
          </p>
        )}
      </div>
    </div>
  )
}

About.propTypes = propTypes
About.defaultProps = defaultProps

export default About
