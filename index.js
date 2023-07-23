const express = require('express')
const app = express()
require('dotenv').config()

const port = 3000

app.use(express.json())

const options = {
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  }
}

const user = 'rabbituser1'
const virtualHost = 'rabbitvh1'
const password = 'secret'
const hostname = 'some-hostname'

const knex = require('knex')(options)

app.post('/instances', async (req, res) => {
  const instanceName = req.body.instanceName
  const instance = {
    name: instanceName,
    user,
    virtual_host: virtualHost,
    password,
    hostname
  }

  // create a row in instances table
  knex('instances').insert(instance)
    .then(() => {
      // TODO: append task to a queue

      res.send({ msg: 'createInstance request received' })
    })
    .catch((err) => { console.log(err); throw err })


})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
