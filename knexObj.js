import kenxEnvOptions from './knexoptions.js';
import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();
const knexEnv = kenxEnvOptions[process.env.NODE_ENV];

const knex = Knex(knexEnv);

export default knex;
