import { combineReducers } from 'redux'
import { reducer as homeReducer, reducerKey as homeReducerKey } from './home'
import {
  reducer as styleguideReducer,
  reducerKey as styleguideReducerKey,
} from './styleguide'

const reducerKey = 'root'

const reducer = combineReducers({
  [homeReducerKey]: homeReducer,
  [styleguideReducerKey]: styleguideReducer,
})

export { reducer, reducerKey }
