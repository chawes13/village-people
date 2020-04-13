import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import Layout from './Layout'
import { Routes as HomeRoutes } from './contacts'
import { Routes as StyleguideRoutes } from './styleguide'

const propTypes = {}

const defaultProps = {}

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path="/contacts" component={HomeRoutes} />
        <Route path="/styleguide" component={StyleguideRoutes} />
        <Redirect path="*" to="/contacts" />
      </Switch>
    </Layout>
  )
}

Routes.propTypes = propTypes
Routes.defaultProps = defaultProps

export default Routes
