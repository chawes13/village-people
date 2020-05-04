import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import Layout from './Layout'
import { Routes as ContactRoutes } from './contacts'
import { Routes as AccountRoutes } from './account'
import { Views } from './home'
import { PrivateRoute } from 'components'

const propTypes = {}

const defaultProps = {}

function Routes() {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          path="/contacts"
          redirectTo="/about"
          component={ContactRoutes}
        />
        <Route path="/about" component={Views.About} />
        <Route path="/account" component={AccountRoutes} />
        <Redirect exact from="/" to="/contacts" />
        <Redirect from="*" to="/about" />
      </Switch>
    </Layout>
  )
}

Routes.propTypes = propTypes
Routes.defaultProps = defaultProps

export default Routes
