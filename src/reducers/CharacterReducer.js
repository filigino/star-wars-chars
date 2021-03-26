const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PREVIOUS':
            return {
                characters: [...action.characters, ...state.characters]
            };
        case 'ADD_NEXT':
            return {
                characters: [...state.characters, ...action.characters]
            };
        default:
            return state;
    }
};

export default reducer;
