// state = {
//     project_id: ,

// }

const currentProjectReducer = (state = [], action) => {
    if (action.type === 'SET_CURRENT_PROJECT') {
        return action.payload
    }

    return state;
};



export default currentProjectReducer;