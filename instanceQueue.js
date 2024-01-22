import * as amqplib from 'amqplib';

const sendToCreateInstanceQueue = async (instanceId) => {
  amqplib.connect(process.env.INSTANCE_MQ_URL, async (error0, connection) => {
    if (error0) {
      throw error0
    }
  
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1
      }
  
      const queue = 'create_inst_queue'
      var msg = String(instanceId)
  
      channel.assertQueue(queue, {
        durable: true
      })
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
      })
    })
    setTimeout(function() {
      connection.close()
    }, 500)
  })
}

export default { sendToCreateInstanceQueue };
