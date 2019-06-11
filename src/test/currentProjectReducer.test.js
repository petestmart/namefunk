import currentProjectReducer from '../redux/reducers/currentProjectReducer';

test('should return payload', () => {
    const action = {
        type: 'SET_CURRENT_PROJECT',
        payload: 'test',
    };
    const returnedState = currentProjectReducer(undefined, action);
    expect(returnedState).toBe('test');
});
