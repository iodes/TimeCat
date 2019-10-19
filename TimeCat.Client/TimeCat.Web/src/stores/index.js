import { combineReducers, createStore } from 'redux'
import filters from './filters/reducers'

const reducers = combineReducers({
  filters,
})

export default createStore(reducers)
