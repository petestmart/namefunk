import loginReducer from '../redux/reducers/loginModeReducer';

test('should have correct initial state', () => {

    let returnedState = loginReducer(undefined, {})
    expect(returnedState).toEqual('login');
})