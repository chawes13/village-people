import { combineReducers } from 'redux'
import {
  reducer as contactsReducer,
  reducerKey as contactsReducerKey,
} from './contacts'
import {
  reducer as styleguideReducer,
  reducerKey as styleguideReducerKey,
} from './styleguide'

const reducerKey = 'root'

const reducer = combineReducers({
  [contactsReducerKey]: contactsReducer,
  [styleguideReducerKey]: styleguideReducer,
})

export { reducer, reducerKey }
