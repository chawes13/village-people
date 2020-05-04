import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'
import * as LS from 'local-storage'

const propTypes = {
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
}

const defaultProps = {}

// A wrapper for <Route> that redirects to another location
// if you're not yet authenticated.
function PrivateRoute({ component: Component, redirectTo, ...rest }) {
  const isAuthenticated = LS.getToken()

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              // eslint-disable-next-line
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

PrivateRoute.propTypes = propTypes
PrivateRoute.defaultProps = defaultProps

export default PrivateRoute
