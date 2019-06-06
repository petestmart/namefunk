import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Call both getKeyword & postProject Sagas
function* getKeywordPostProject(action) {
    yield getKeyword(action);
    yield postProject(action);
} // end getKeywordPostProject Saga

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
        const keywordResponse = yield axios.get(`/api/thesaurus?tag=${action.payload}`)
        console.log('getKeyword Response:', keywordResponse.data);
        yield put({ type: 'SET_FUNCTION', payload: keywordResponse.data })
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

// Remove Project Line Item and From Database
function* removeProject(action) {
    console.log('removeProject Saga', action.payload);
    try {
        yield axios.delete(`/api/project/${action.payload}`)
        yield put({ type: 'FETCH_PROJECT'})
    } catch (err){
        console.log(err);
    }
} // End removeProject

// Post Function Name That User Would Like To Save
function* postName(action) {
    try {
        const nameResponse = yield axios.post(`/api/name`, action.payload);
        console.log('action.payload', action.payload);
        console.log('postName Response:', nameResponse.data);
        yield put({ type: 'FETCH_PROJECT', payload: nameResponse.data })
    } catch (error) {
        console.log('error in postName', error)
    }
} // end postName Saga

// Start New Project Based on Keyword Entered by User
function* postProject(action) {
    console.log('postProject');
    try {
        const projectResponse = yield axios.post(`/api/project`, {project_name: action.payload});
        console.log('action.payload', action.payload);
        console.log('postProject Response:', projectResponse.data);
        yield put({ type: 'FETCH_PROJECT', payload: projectResponse.data })
    } catch (error) {
        console.log('error in postProject', error)
    } // end postProject Saga
}

// Watcher Saga
function* newNamesSaga() {
    yield takeLatest('SEARCH_KEYWORD', getKeywordPostProject)
    yield takeLatest('SEARCH_FUNCTION', getFunction)
    yield takeLatest('SAVE_NAME', postName)
    yield takeLatest('FETCH_PROJECT', getProject)
    yield takeLatest('REMOVE_PROJECT', removeProject)
} // end Watcher Saga newNamesSaga



export default newNamesSaga;