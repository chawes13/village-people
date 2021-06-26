import React from 'react'
import { SubmitButton } from '@launchpadlab/lp-components'

function ClaimAccountForm({ onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const params = Object.fromEntries(formData.entries())
        return onSubmit(params)
      }}
    >
      <div className="input-container">
        <label htmlFor="token">Password</label>
        <input id="token" name="token" required={true} autoComplete="off" />
      </div>
      <SubmitButton>Submit</SubmitButton>
    </form>
  )
}

export default ClaimAccountForm
