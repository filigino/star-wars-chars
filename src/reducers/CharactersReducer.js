const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CHARACTERS':
            return {
                characters: [...state.characters, ...action.characters],
                nextPageUrl: action.nextPageUrl
            };
        default:
            return state;
    }
};

export default reducer;
