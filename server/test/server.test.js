let app = require('../server');
let testServer = require('supertest');

describe('Test the root path', () => {
    test('It should respond 200 to the LOGOUT route', async () => {
        const response = await testServer(app).post('/api/user/logout');
        expect(response.statusCode).toBe(200);
    })
}) // end describe 'Test the root path'