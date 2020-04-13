import { handleActions } from 'redux-actions'
// import { selectorForSlice, unsetState } from 'lp-redux-utils'
// import { setOnSuccess } from 'lp-redux-api'
// import * as actions from './actions'
// import * as apiActions from 'api-actions'

const reducerKey = 'contacts'
// const slice = 'root.contacts'

const initialState = {}

const reducer = handleActions({}, initialState)

// const select = selectorForSlice(slice)

const selectors = {}

export { reducer, selectors, reducerKey }
