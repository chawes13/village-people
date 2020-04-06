import React from 'react'
// import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { getSet, onMount, waitFor } from 'lp-hoc'
import { api } from 'api'

const propTypes = {}

const defaultProps = {}

function ServerStatusOverlay() {
  if (process.env.HIDE_SERVER_STATUS_OVERLAY) return null
  return (
    <div className="server-status-overlay">
      Warning: there is no server running at your configured API url:{' '}
      {api.defaults.root}
    </div>
  )
}

ServerStatusOverlay.propTypes = propTypes
ServerStatusOverlay.defaultProps = defaultProps

function isFetchError(e) {
  return e instanceof TypeError && e.message === 'Failed to fetch'
}

function pingServer({ setShown }) {
  return api.get('/').catch((e) => {
    if (isFetchError(e)) return setShown(true)
  })
}

export default compose(
  getSet('shown'),
  onMount(pingServer),
  waitFor('shown', () => null)
)(ServerStatusOverlay)
