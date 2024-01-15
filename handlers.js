import sendToCreateInstanceQueue from './rabbit.js';

const getHealth = async (req, res) => {
  res.status(200)
  res.send("Backend is alive")
};

const postInstances = async (req, res) => {
  const instanceName = req.body.instanceName
  const instance = {
    name: instanceName
  }

  try {
    const instanceIdArr = await req.dataService.postInstances(instance, req.knex);
    const instanceId = instanceIdArr[0].id;

    // append task to queue
    console.log("instanceId returned=", instanceId);
    sendToCreateInstanceQueue(instanceId);

    res.send({ msg: 'createInstance request received' })
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: 'Error in postInstances handler'});
  }
};

const getInstances = async (req, res) => {
  try {
    const rows = await req.dataService.getInstances(req.knex);
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: 'Error in getInstance handler'});
  }
};

const getOneInstance = async (req, res) => {
  try {
    const rows = await req.dataService.getOneInstance(req.params.inst_id, req.knex);
    if (rows.length === 0) {
      res.status(404).send({ msg: "Not found" })
    }

    res.send(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: 'Error in getOneInstance handler'});
  }
};

export { getHealth, postInstances, getInstances, getOneInstance };
