import router from './routes.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const port = process.env.PORT || 3000;
dotenv.config();

const app = express();
app.set("port", port);

app.use(express.json())
app.use(cors())

app.options('*', cors())

app.use('/', router);

export default app;
