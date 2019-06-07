// Returns the data from the Thesaurus API
const newNamesReducer = (state = [], action) => {
    console.log('newNamesReducer', action.payload);
    if (action.type === 'SET_KEYWORD') {
        return action.payload
    }
   
    return state;
};



export default newNamesReducer;