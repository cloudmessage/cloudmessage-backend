import request from 'supertest';
import express from 'express';
import { knex, router } from '../routes.js';

const app = express();
app.use('/', router);

describe('Instance endpoints', () => {

  afterAll(() => {
    knex.destroy();
  })

  it('GET /instances should get all instances', async () => {
    const res = await request(app).get('/instances');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(43);
  });

});
