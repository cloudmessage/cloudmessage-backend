import { Router } from 'express';
import sendToCreateInstanceQueue from './rabbit.js';
import dotenv from 'dotenv';
import authorize from './authorization.js';
import knex from './knexObj.js';
dotenv.config();
const router = Router();

router.get('/health', async (req, res) => {
  res.status(200)
  res.send("Backend is alive")
});

router.post('/instances', authorize, async (req, res) => {
  const instanceName = req.body.instanceName
  const instance = {
    name: instanceName
  }

  // create a row in instances table
  knex('instances').insert(instance).returning('id')
    .then((instanceIdArr) => {
      // append task to queue
      const instanceId = instanceIdArr[0].id
      console.log("instanceId returned=", instanceId)
      sendToCreateInstanceQueue(instanceId)
      res.send({ msg: 'createInstance request received' })
    })
    .catch((err) => { console.log(err); throw err })

})

router.get('/instances', authorize, async (req, res) => {
  knex('instances').select('id', 'name')
    .orderBy('id')
    .then((rows) => {
      res.send(rows)
    })
    .catch((err) => { console.log(err); throw err })
})

router.get('/instances/:inst_id', authorize, async (req, res) => {
  knex('instances').select('id', 'name', 'user', 'virtual_host', 'password', 'hostname')
    .where('id', req.params.inst_id)
    .then((rows) => {
      if (rows.length === 0) {
        res.status(404).send({ msg: "Not found" })
      }

      res.send(rows[0])
    })
    .catch((err) => { console.log(err); throw err })
})

export default router;
