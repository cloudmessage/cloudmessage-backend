
import request from 'supertest';
import app from '../app.js';
import express from 'express';
import { expect } from 'chai';
import Knex from 'knex';
import router from '../routes.js';
import { postInstances, getInstances, getOneInstance } from '../data.js';
import sinon from 'sinon';

describe('getHealth route', () => {

  const app = express();

  const dummyMiddleware = (req, res, next) => {
    next();
  }

  app.use('/', dummyMiddleware, router);

  it('router /getHealth should return expected response', async () => {
    const res = await request(app).get('/health');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Backend is alive');
  });

});
