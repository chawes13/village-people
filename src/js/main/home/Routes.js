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
        <Route exact path={path + '/'} component={Views.Home} />
      </Switch>
    </Layout>
  )
}

Routes.propTypes = propTypes
Routes.defaultProps = defaultProps

export default Routes
