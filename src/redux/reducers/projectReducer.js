
// state = {
//     project_id: ,

// }

const projectReducer = (state = [], action) => {
    if (action.type === 'SET_PROJECTS'){
        return [...state, action.payload]
    }

    return state;
};



export default projectReducer;