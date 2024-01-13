import kenxEnvOptions from './knexoptions.js';
import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();
const knexEnv = kenxEnvOptions[process.env.NODE_ENV];

const knex = Knex(knexEnv);

const postInstances = async (instance) => {
  const instanceIdArr = await knex('instances').insert(instance).returning('id')
    .catch((err) => { console.error(err); throw err })

    return instanceIdArr;
  };

const getInstances = async () => {
  const rows = await knex('instances').select('id', 'name')
    .orderBy('id')
    .catch((err) => { console.error(err); throw err })

  return rows;
};

const getOneInstance = async (instanceId) => {
  const rows = await knex('instances').select('id', 'name', 'user', 'virtual_host', 'password', 'hostname')
    .where('id', instanceId)
    .catch((err) => { console.error(err); throw err })

  return rows;
};

export { postInstances, getInstances, getOneInstance };
