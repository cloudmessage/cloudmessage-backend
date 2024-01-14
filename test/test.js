
import request from 'supertest';
import app from '../app.js';
import { expect } from 'chai';
import Knex from 'knex';
// import { createSandbox } from 'sinon';
import sinon from 'sinon';

// const sandbox = createSandbox();
// const mockKnex = () => {};

describe('Instance endpoints', () => {

  const knex = Knex();

  beforeEach(() => {
    // sandbox.stub(knex, 'default').callsFake(mockKnex);
    sinon.stub(knex, 'select').returns('111');
  });

  it('GET /instances should get all instances', async () => {
    const res = await request(app).get('/instances');
    console.log(res.body);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.length(43);
  });

});
