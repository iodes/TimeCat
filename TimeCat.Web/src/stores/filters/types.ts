export const SET_KEYWORD = 'SET_KEYWORD'

export interface ISetKeywordAction {
  type: typeof SET_KEYWORD,
  keyword: string,
}

export type FiltersActionType = ISetKeywordAction

export interface IFiltersState {
  keyword: string,
}
