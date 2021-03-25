const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CHARS':
            return {
                chars: [...state.chars, ...action.chars],
                nextPageUrl: action.nextPageUrl
            };
        default:
            return state;
    }
};

export default reducer;
