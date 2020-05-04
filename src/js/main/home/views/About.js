import React from 'react'
// import PropTypes from 'prop-types'
// import * as Types from 'types'
// import { onMount, waitFor } from 'lp-hoc'
// import { selectors } from '../reducer'
// import * as actions from '../actions'
// import * as apiActions from 'api-actions'

const propTypes = {}

const defaultProps = {}

function About() {
  return (
    <div>
      <p>Welcome to the Village People!</p>
      <p>
        This is an application that provides management with a shared address
        book for the staff in the Village. If you would like access, please send
        a request to your administrator.
      </p>
    </div>
  )
}

About.propTypes = propTypes
About.defaultProps = defaultProps

export default About
