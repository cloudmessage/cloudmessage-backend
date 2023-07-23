const express = require('express')
const app = express()
require('dotenv').config()

const port = 3000

app.use(express.json())

app.post('/instances', async (req, res) => {

  // create a row in instances table

  // TODO: append task to a queue

  res.send({ msg: 'createInstance request received' })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
