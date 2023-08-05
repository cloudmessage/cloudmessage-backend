const express = require('express')
const app = express()
require('dotenv').config()
const sendToCreateInstanceQueue = require('./rabbit')

const port = 3000

app.use(express.json())

const options = {
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  }
}

const knex = require('knex')(options)

app.post('/instances', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
