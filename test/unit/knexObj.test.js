import knexEnvOptions from '../../knexoptions.js';
import * as Knex from 'knex';
import sinon from 'sinon';
// import getKnexObj from '../../knexObj.js';

describe('group-unit: knexObj', () => {

  let mockKnex;
  let mockKnexOptions;

  beforeEach(() => {
    process.env.environment = 'development';
    mockKnex = sinon.stub();
    sinon.stub(Knex, 'default').callsFake(mockKnex);

    mockKnexOptions = {
      development: {
        client: 'development-db-client'
      },
      production: {
        client: 'production-db-client'
      }
    };

    sinon.stub('../../knexoptions');
  });

  it('given a NODE_ENV environment variable, it returns a Knex object', async () => {
    // act
    //    call getKnexObj
    const knexObject = getKnexObj();

    // assert
    //    assert object returned
    //    assert Knex library called with correct option object
    expect(mockKnex).toHaveBeenCalled();
    expect(mockKnex).toHaveBeenCalledWith();
  });

});
