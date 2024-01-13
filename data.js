import kenxEnvOptions from './knexoptions.js';
import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();
const knexEnv = kenxEnvOptions[process.env.NODE_ENV];

const knex = Knex(knexEnv);

const postInstances = async (instance) => {
  knex('instances').insert(instance).returning('id')
    .then((instanceIdArr) => {
      return instanceIdArr;
    })
    .catch((err) => { console.error(err); throw err })
};

const getInstances = async () => {
  knex('instances').select('id', 'name')
    .orderBy('id')
    .then((rows) => {
      return rows;
    })
    .catch((err) => { console.error(err); throw err })
};

const getOneInstance = async (instanceId) => {
  knex('instances').select('id', 'name', 'user', 'virtual_host', 'password', 'hostname')
    .where('id', instanceId)
    .then((rows) => {
      return rows;
    })
    .catch((err) => { console.error(err); throw err })
};

export { postInstances, getInstances, getOneInstance };
