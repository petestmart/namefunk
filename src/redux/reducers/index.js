import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import newNamesReducer from './newNamesReducer';
import functionReducer from './functionReducer';
import projectReducer from './projectReducer';
import currentProjectReducer from './currentProjectReducer';

// rootReducer is the primary reducer for NameFunk
// It bundles up all of the other reducers for use.
// This is imported in index.js as rootSaga

// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // has a value of 'login' or 'registration' to control which screen is shown
  user, // has an id and username if someone is logged in
  newNamesReducer,
  functionReducer,
  projectReducer,
  currentProjectReducer,
});

export default rootReducer;
