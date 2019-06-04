
const projectReducer = (state = [], action) => {
    if (action.type === 'SET_PROJECTS'){
        return action.payload
    }

    return state;
};



export default projectReducer;