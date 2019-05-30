import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getKeyword(action) {
    try {
        const keywordResponse = yield axios.get(`/api/thesaurus?tag=${action.payload}`)
        console.log('getKeyword Response:', keywordResponse.data);
        yield put({ type: 'SET_KEYWORD', payload: keywordResponse.data })
    } catch (error) {
        console.log('error in getKeyword Saga', error)
    }
} // end getKeyword Saga

function* getFunction(action) {
    try {
        const keywordResponse = yield axios.get(`/api/thesaurus?tag=${action.payload}`)
        console.log('getKeyword Response:', keywordResponse.data);
        yield put({ type: 'SET_FUNCTION', payload: keywordResponse.data })
    } catch (error) {
        console.log('error in getKeyword Saga', error)
    }
} // end getKeyword Saga

function* postName(action) {
    try {
        const nameResponse = yield axios.post(`/api/project`)
        console.log('postName Response:', nameResponse.data);
        yield put({ type: 'SET_KEYWORD', payload: nameResponse.data })
    } catch (error) {
        console.log('error in postName', error)
    }
}

// Watcher Saga
function* newNamesSaga() {
    yield takeLatest('SEARCH_KEYWORD', getKeyword)
    yield takeLatest('SEARCH_FUNCTION', getFunction)
    yield takeLatest('SAVE_NAME', postName)
} // end Watcher Saga newNamesSaga



export default newNamesSaga;