require('dotenv').config()
const knexOptionsFile = require('./knexoptions')
const knexOptions = knexOptionsFile[process.env.NODE_ENV]

const knex = require('knex')(knexOptions)

knex.schema.createTable('instances', (table) => {
  table.increments('id')
  table.string('name')
  table.string('user')
  table.string('virtual_host')
  table.string('password')
  table.string('hostname')
}).then( () => console.log("table created"))
.catch( (err) => { console.log(err); throw err })
.finally( () => {
  knex.destroy();
});
