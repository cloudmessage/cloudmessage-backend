
import request from 'supertest';
import app from '../app.js';
import { expect } from 'chai';

describe('Instance routes', () => {

  it('router /getInstances should return all instances', async () => {
    const res = await request(app).get('/instances');
    console.log(res.body);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.length(43);
  });

});
