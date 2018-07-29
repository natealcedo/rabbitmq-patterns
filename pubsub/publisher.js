const amqplib = require("amqplib");

module.exports = async function setupExchange() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const { exchange } = await channel.assertExchange("pubsub", "fanout", {
      durable: false,
    })
    let number = 0;
    setInterval(() => {
      channel.publish(exchange, "", Buffer.from(number.toString()), {})
      number += 1;
    }, 1000);
  } catch (e) {
    console.log(e);
    console.log("error connecting... bailing");
    process.exit(1);
  }
}