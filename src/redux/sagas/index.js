import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import newNamesSaga from './newNamesSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so NameFunk can use them.
// This is imported in index.js as rootSaga

// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    newNamesSaga(),
  ]);
}
