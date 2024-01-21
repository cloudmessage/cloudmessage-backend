
import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import getRouter from '../routes.js';
import { postInstances, getInstances, getOneInstance } from '../data.js';
import sinon from 'sinon';
import instanceQueue from '../instanceQueue.js';

describe('postInstances route', () => {
  const app = express();
  const mockAuthorize = function(req, res, next) {
    next();
  };

  const router = getRouter(mockAuthorize);

  const returnInstanceId = 10;
  const returnValue = [{id: returnInstanceId}];
  const expectedValue = returnInstanceId;
  const insertStub = sinon.stub().returnsThis();
  const returningStub = sinon.stub().resolves(returnValue);

  const knexStub = sinon.stub().callsFake(() => {
    return {
      insert: insertStub,
      returning: returningStub
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

  const instanceQueueStub = sinon.stub(instanceQueue, 'sendToCreateInstanceQueue').resolves();

  app.use(express.json());
  app.use('/', exposeDataService, router);

  it('router post /snstances should return expected value', async () => {
    const res = await request(app).post('/instances', {instanceName: "aaa"});
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({msg: 'createInstance request received'});
    expect(instanceQueueStub.calledWith(expectedValue)).to.be.ok;
  });

});
