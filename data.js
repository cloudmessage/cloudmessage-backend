import getKnexObj from './knexObj.js';

const postInstances = async (instance, knex = getKnexObj()) => {
  const instanceIdArr = await knex('instances').insert(instance).returning('id')
    .catch((err) => { console.error(err); throw err })

    return instanceIdArr;
  };

const getInstances = async (knex = getKnexObj()) => {
  const rows = await knex('instances').select('id', 'name')
    .orderBy('id')
    .catch((err) => { console.error(err); throw err })

  return rows;
};

const getOneInstance = async (instanceId, knex = getKnexObj()) => {
  const rows = await knex('instances').select('id', 'name', 'user', 'virtual_host', 'password', 'hostname')
    .where('id', instanceId)
    .catch((err) => { console.error(err); throw err })

  return rows;
};

export { postInstances, getInstances, getOneInstance };
