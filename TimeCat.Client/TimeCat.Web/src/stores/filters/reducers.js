import { FiltersActionType, IFiltersState, SET_KEYWORD } from './types'

const initialState: IFiltersState = {
  keyword: '',
}

const filters = (state = initialState, action: FiltersActionType): IFiltersState => {
  switch (action.type) {
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      }

    default:
      return state
  }
}

export default filters
