import React from 'react'
// import PropTypes from 'prop-types'
import { ClaimAccountForm } from '../forms'
import { useHistory } from 'react-router-dom'

const propTypes = {}

const defaultProps = {}

function Account() {
  const history = useHistory()
  return (
    <div className="claim-account">
      <h2>Claim Your Account</h2>
      <p>Please enter the password provided by your administrator.</p>
      <ClaimAccountForm
        onSubmit={({ token }) =>
          history.push(`/account/claim-account?t=${token}`)
        }
      />
    </div>
  )
}

Account.propTypes = propTypes
Account.defaultProps = defaultProps

export default Account
