import {combineReducers, createStore} from 'redux'
import filters from './filters/reducers'
import {IFiltersState} from './filters/types'

export interface IRootState {
  filters: IFiltersState
}

const reducers = combineReducers<IRootState>({
  filters,
})

export default createStore(reducers)
