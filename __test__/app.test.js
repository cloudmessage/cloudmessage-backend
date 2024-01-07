const server = require('../index');
const supertest = require('supertest');
const requestWithSuperTest = supertest(server);

describe('Instance endpoints', () => {

  it('GET /instances should get all instances', async () => {
    const res = await requestWithSuperTest.get('/instances');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('instances');
  });
});
