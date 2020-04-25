import { configureApi, http } from '@launchpadlab/lp-requests'
import { middleware as configureMiddleware } from '@launchpadlab/lp-redux-api'
import { get } from 'lodash'

// Configure lp-redux-api middleware

// This function will be passed the request options before every request.
// You can use it to set additional options or override existing ones.
function before() {
  return {}
}

// Any transformations of successful responses can go here.
// By default, we pull out the value nested at `data.attributes`.
function onSuccess(res) {
  return get(res, 'data')
}

// Any transformations of failed responses can go here.
function onFailure(res) {
  return res
}

export const config = {
  root: process.env.API_URL,
  before,
  onSuccess,
  onFailure,
  mode: 'cors',
}

export const middleware = configureMiddleware(http, config)
export const api = configureApi(config)
