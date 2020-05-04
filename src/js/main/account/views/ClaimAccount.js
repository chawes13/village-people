import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import * as Types from 'types'
// import { onMount, waitFor } from 'lp-hoc'
// import { selectors } from '../reducer'
// import * as actions from '../actions'
// import * as apiActions from 'api-actions'
import { Spinner } from '@launchpadlab/lp-components'
import { useQuery } from 'utils'
import { useHistory } from 'react-router-dom'
import { api } from 'api'
import { EmptyState } from 'components'
import * as LS from 'local-storage'

const propTypes = {}

const defaultProps = {}

function submitAccountClaim(token) {
  return api.post('/authentication/accounts', { token })
}

function ClaimAccount() {
  const [state, setState] = useState(Types.LoadingStates.LOADING)
  const [error, setError] = useState(null)
  const { t: token } = useQuery()
  const history = useHistory()

  useEffect(() => {
    submitAccountClaim(token)
      .then(({ signedToken }) => LS.setToken(signedToken))
      .then(() => history.push('/contacts'))
      .catch(() => {
        setError(
          'Authentication failed. Please request a new url from your administrator'
        )
        setState(Types.LoadingStates.FAILURE)
      })
  }, [])

  if (state === Types.LoadingStates.LOADING) return <Spinner />

  return <EmptyState className="error" message={error} />
}

ClaimAccount.propTypes = propTypes
ClaimAccount.defaultProps = defaultProps

export default ClaimAccount
