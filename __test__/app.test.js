import request from 'supertest';
import app from '../app';

describe('Instance endpoints', () => {

  it('GET /instances should get all instances', async () => {
    const res = await request(app).get('/instances');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(43);
  });

});
