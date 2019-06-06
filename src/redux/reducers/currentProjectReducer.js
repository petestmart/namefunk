// state = {
//     project_id: ,

// }

const projectReducer = (state = [], action) => {
    if (action.type === 'SET_CURRENT_PROJECT') {
        return action.payload
    }

    return state;
};



export default projectReducer;