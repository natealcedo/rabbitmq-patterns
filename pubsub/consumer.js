const amqplib = require("amqplib");

module.exports = async function setUpConsumer(number) {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const { queue } = await channel.assertQueue(null, {
      durable: false,
      exclusive: true
    });
    await channel.bindQueue(queue, "pubsub", "");
    await channel.consume(queue, (msg) => {
      console.log(`Consumer ${number}: ${msg.content.toString()}`);
    }, {
        noAck: true
      });
  } catch (e) {
    console.log(e);
    console.log("error connecting... bailing");
    process.exit(1);
  }
}