jest.mock('knex', () => {
  select: jest.fn().mockReturnThis("111")
});
import request from 'supertest';
import app from '../app';
import {jest} from '@jest/globals';
import Knex from 'knex';
import router from '../routes';

// const mockKnex = jest.fn();

// mockKnex.mockImplementation(() => () => ({
//   select: jest.fn().mockReturnThis("111")
// }))
// jest.mock('knex', () => jest.fn(console.log("hello")));
describe('Instance endpoints', () => {

  it('GET /instances should get all instances', async () => {
    const res = await request(app).get('/instances');
    console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(43);
  });

});
