import request from 'supertest';
import express from 'express';
import router from '../routes.js';

const app = express();
app.use('/', router);

describe('Instance endpoints', () => {

  it('GET /instances should get all instances', async () => {
    const res = await request(app).get('/instances');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('instances');
  });

});
