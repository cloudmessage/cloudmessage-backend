const express = require('express')
const app = express()
const port = 3000

app.post('/createInstance', (req, res) => {
  res.send('createInstance request received')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
