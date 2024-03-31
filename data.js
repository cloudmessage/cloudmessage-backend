const postInstances = async (instance, knex) => {
  const instanceIdArr = await knex(process.env.INSTANCES_TABLE_NAME).insert(instance).returning('id')
    .catch((err) => { console.error(err); throw err })

    return instanceIdArr;
  };

const getInstances = async (knex) => {
  const rows = await knex(process.env.INSTANCES_TABLE_NAME).select('id', 'name')
    .orderBy('id')
    .catch((err) => { console.error(err); throw err })

  return rows;
};

const getOneInstance = async (instanceId, knex) => {
  const rows = await knex(process.env.INSTANCES_TABLE_NAME).select('id', 'name', 'user', 'virtual_host', 'password', 'hostname')
    .where('id', instanceId)
    .catch((err) => { console.error(err); throw err })

  return rows;
};

export { postInstances, getInstances, getOneInstance };
