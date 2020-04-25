import { combineReducers } from 'redux'
import {
  reducer as contactsReducer,
  reducerKey as contactsReducerKey,
} from './contacts'

const reducerKey = 'root'

const reducer = combineReducers({
  [contactsReducerKey]: contactsReducer,
})

export { reducer, reducerKey }
