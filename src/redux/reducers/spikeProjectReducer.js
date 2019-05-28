
const spikeProjectReducer = (state = [], action) => {
    if (action.type === 'SET_KEYWORD') {
        return action.payload
    }
   
    return state;
};



export default spikeProjectReducer;