import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import Layout from './Layout'
import { Routes as HomeRoutes } from './contacts'

const propTypes = {}

const defaultProps = {}

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path="/contacts" component={HomeRoutes} />
        <Redirect path="*" to="/contacts" />
      </Switch>
    </Layout>
  )
}

Routes.propTypes = propTypes
Routes.defaultProps = defaultProps

export default Routes
