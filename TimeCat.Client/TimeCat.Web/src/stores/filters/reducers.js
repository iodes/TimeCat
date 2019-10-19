import { SET_KEYWORD } from './actions';

const initialState = {
  keyword: '',
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    default:
      return state;
  }
};

export default filters;
