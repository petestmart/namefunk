const functionReducer = (state = [], action) => {
    if (action.type === 'SET_FUNCTION') {
        return action.payload
    }
   
    return state;
};



export default functionReducer;