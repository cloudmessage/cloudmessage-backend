import authorize from './authorization.js';
import getRouter from './routes.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { postInstances, getInstances, getOneInstance } from './data.js';
import getKnexObj from './knexObj.js';

const router = getRouter(authorize);
const knex = getKnexObj();
const port = process.env.PORT || 3000;
dotenv.config();

const dataService = () => {
  return Object.freeze({
    postInstances,
    getInstances,
    getOneInstance
  });
};

const exposeDataService = async(req, res, next) => {
  req.dataService = dataService();
  req.knex = knex;
  next();
}

const app = express();
app.set("port", port);

app.use(express.json())
app.use(cors())

app.options('*', cors())

app.use('/', exposeDataService, router);

export default app;
