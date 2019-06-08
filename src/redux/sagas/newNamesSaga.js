import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Call both getKeyword & postProject Sagas
function* getKeywordPostProject(action) {
    yield getKeyword(action);
    yield postProject(action);

} // end getKeywordPostProject Saga

// Call both getProject & getSavedNames
function* fetchProjectsFetchNames(action) {
    yield getProject(action);
    yield getSavedNames(action);
} // end fetchProjectsFetchNames

// Send keyword to thesaurus.router
function* getKeyword(action) {
    try {
        const keywordResponse = yield axios.get(`/api/thesaurus?tag=${action.payload}`)
        console.log('getKeyword Response:', keywordResponse.data);
        yield put({ type: 'SET_KEYWORD', payload: keywordResponse.data })
    } catch (error) {
        console.log('error in getKeyword Saga', error);
    }
} // end getKeyword Saga

// Send function type to thesaurus.router
function* getFunction(action) {
    try {
        const functionResponse = yield axios.get(`/api/function/${action.payload}`)
        console.log('getFunction Response:', functionResponse.data);
        yield put({ type: 'SET_FUNCTION', payload: functionResponse.data })
    } catch (error) {
        console.log('error in getKeyword Saga', error);
    }
} // end getKeyword Saga

// Retrieve User Projects From The Server (& Database)
function* getProject(action) {
    try {
        const projectResponse = yield axios.get(`/api/project`)
        console.log('getProject Response:', projectResponse.data);
        yield put({ type: 'SET_PROJECTS', payload: projectResponse.data })
    } catch (error) {
        console.log('error in getProject Saga', error);
    }
} // end getProject Saga

// Retrieve Project-Specific Saved Names
function* getSavedNames(action) {
    console.log('getSavedNames action.project_id', action.project_id);
    try {
        const currentProjResponse = yield axios.get(`/api/name/${action.project_id}`, {project_id: action.project_id})
        console.log('getSavedNames Response', currentProjResponse.data);
        yield put({ type: 'SET_CURRENT_PROJECT', payload: currentProjResponse.data})
    } catch (error) {
        console.log('error in getSavedNames', error);
    }
}  // end getSavedNames Saga

// Remove Project Line Item and from Database
function* removeProject(action) {
    console.log('removeProject Saga', action.payload);
    try {
        yield axios.delete(`/api/project/${action.payload}`)
        yield put({ type: 'FETCH_PROJECT'})
    } catch (err){
        console.log(err);
    }
} // end removeProject Saga

// Remove Saved Name Line Item and from Database
function* removeSavedName(action) {
    console.log('removeSavedName Saga', action.payload);
    try {
        yield axios.delete(`/api/name/${action.payload.id}`)
        yield put({ type: 'FETCH_NAMES', project_id: action.payload.project_id})
    } catch (err) {
        console.log(err);
    }
}

// Post Function Name That User Would Like To Save
function* postName(action) {
    try {
        const nameResponse = yield axios.post(`/api/name`, action.payload);
        console.log('action.payload', action.payload);
        console.log('postName Response:', nameResponse.data);
        yield put({ type: 'FETCH_NAMES', project_id: action.payload.project_id})
    } catch (error) {
        console.log('error in postName', error)
    }
} // end postName Saga

// Start New Project Based on Keyword Entered by User
function* postProject(action) {
    console.log('postProject');
    try {
        const projectResponse = yield axios.post(`/api/project`, {project_name: action.payload});
        console.log('action.payload', action);
        console.log('postProject Response:', projectResponse.data);
        console.log('postProj projectResponse.data.id', projectResponse.data.id)
        yield put({ type: 'FETCH_PROJECT', payload: projectResponse.data })
        action.history.push(`/new/${projectResponse.data[0].id}`)
        // yield put({ type: 'SET_CURRENT_PROJECT', payload: projectResponse.data})
    } catch (error) {
        console.log('error in postProject', error)
    } 
} // end postProject Saga

// Watcher Saga
function* newNamesSaga() {
    yield takeLatest('SEARCH_KEYWORD', getKeywordPostProject)
    yield takeLatest('SEARCH_FUNCTION', getFunction)
    yield takeLatest('SAVE_NAME', postName)
    yield takeLatest('FETCH_PROJECT', fetchProjectsFetchNames)
    yield takeLatest('REMOVE_PROJECT', removeProject)
    yield takeLatest('FETCH_NAMES', getSavedNames)
    yield takeLatest('REMOVE_SAVED_NAME', removeSavedName)
} // end Watcher Saga newNamesSaga



export default newNamesSaga;