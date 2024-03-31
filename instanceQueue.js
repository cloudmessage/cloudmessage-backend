import * as amqplib from 'amqplib';

const sendToCreateInstanceQueue = async (instanceId) => {
  try {
    const queue = 'create_inst_queue';
    const conn = await amqplib.connect(process.env.INSTANCE_MQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(queue);

    var msg = String(instanceId)

    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true
    });
  } catch(err) {
    console.error("Error encountered in instanceQueue, err=", err);
  }
}

export default { sendToCreateInstanceQueue };
