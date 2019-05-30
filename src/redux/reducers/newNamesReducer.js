
const newNamesReducer = (state = [], action) => {
    if (action.type === 'SET_KEYWORD') {
        return action.payload
    }
   
    return state;
};



export default newNamesReducer;