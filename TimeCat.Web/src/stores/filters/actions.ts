import { ISetKeywordAction, SET_KEYWORD } from './types'

export const setKeywordFilter = (keyword: string): ISetKeywordAction => ({
  type: SET_KEYWORD,
  keyword,
})
