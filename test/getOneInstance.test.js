
import request from 'supertest';
import app from '../app.js';
import express from 'express';
import { expect } from 'chai';
import getRouter from '../routes.js';
import { postInstances, getInstances, getOneInstance } from '../data.js';
import sinon from 'sinon';

describe('getInstances/<id> route', () => {

  const app = express();
  const mockAuthorize = function(req, res, next) {
    next();
  };

  const router = getRouter(mockAuthorize);

  const returnValue = [
    {id: 10, name: "instance10"},
    {id: 20, name: "instance20"}
  ];
  const expectedValue = {id: 10, name: "instance10"};
  const selectStub = sinon.stub().returnsThis();
  const whereStub = sinon.stub().resolves(returnValue);

  const knexStub = sinon.stub().callsFake(() => {
    return {
      select: selectStub,
      where: whereStub
    }
  })

  const dataService = () => {
    return Object.freeze({
      postInstances,
      getInstances,
      getOneInstance
    });
  };

  const exposeDataService = async(req, res, next) => {
    req.dataService = dataService();
    req.knex = knexStub;
    next();
  }

  app.use('/', exposeDataService, router);

  it('router /getInstances/10 should return correct instance', async () => {
    app.use('/', exposeDataService, router);
    const res = await request(app).get('/instances/10');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({id: 10, name: "instance10"})
  });

});
