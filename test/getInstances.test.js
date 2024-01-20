
import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import getRouter from '../routes.js';
import { postInstances, getInstances, getOneInstance } from '../data.js';
import sinon from 'sinon';

describe('getInstances route', () => {

  const app = express();
  const mockAuthorize = function(req, res, next) {
    next();
  };

  const router = getRouter(mockAuthorize);

  const expectedValue = [
    {id: 10, name: "instance10"},
    {id: 20, name: "instance20"}
  ];
  const selectStub = sinon.stub().returnsThis();
  const orderByStub = sinon.stub().resolves(expectedValue);

  const knexStub = sinon.stub().callsFake(() => {
    return {
      select: selectStub,
      orderBy: orderByStub
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

  it('router /getInstances should return all instances', async () => {
    const res = await request(app).get('/instances');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.length(2);
    expect(res.body[0]).to.deep.equal({id: 10, name: "instance10"})
  });

});
