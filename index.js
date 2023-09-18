const express = require('express')
const app = express()
const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config()
const cors = require('cors')
const {expressjwt: jwt} = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const sendToCreateInstanceQueue = require('./rabbit')
const knexOptionsFile = require('./knexoptions')
const port = 3000

const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;

app.use(express.json())
app.use(cors())

const knexOptions = knexOptionsFile[process.env.NODE_ENV]

const knex = require('knex')(knexOptions)

app.get('/health', async (req, res) => {
  res.status(200)
  res.send("Backend is alive")
})

app.options('*', cors())

app.use(
  jwt({
    secret: jwksRsa.expressJwtSecret({
      jwksUri: `${AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`,
    }),
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_ISSUER_BASE_URL,
    algorithms: ['RS256'],
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  })
);


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

app.get('/instances', async (req, res) => {
  knex('instances').select('id', 'name')
    .orderBy('id')
    .then((rows) => {
      res.send(rows)
    })
    .catch((err) => { console.log(err); throw err })
})

app.get('/instances/:inst_id', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
