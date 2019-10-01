const filters = (state = {}, action) => {
    switch (action.type) {
        case 'SET_KEYWORD_FILTER':
            return {
                ...state,
                keyword: action.keyword,
            }

        default:
            return state
    }
}

export default filters
