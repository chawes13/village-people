import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'
import * as Views from './views'
import Layout from './Layout'

const propTypes = {
  match: PropTypes.object.isRequired,
}

const defaultProps = {}

function Routes({ match: { path } }) {
  return (
    <Layout>
      <Switch>
        <Route path={path + '/claim-account'} component={Views.ClaimAccount} />
      </Switch>
    </Layout>
  )
}

Routes.propTypes = propTypes
Routes.defaultProps = defaultProps

export default Routes
