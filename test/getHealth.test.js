
import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import router from '../routes.js';

describe('getHealth route', () => {

  const app = express();

  app.use('/', router);

  it('router /getHealth should return expected response', async () => {
    const res = await request(app).get('/health');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Backend is alive');
  });

});
