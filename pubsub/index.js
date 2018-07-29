const consumer = require("./consumer");
const publisher = require("./publisher");

async function start() {
  let [numberOfConsumers] = process.argv.slice(2)
  if (!numberOfConsumers) {
    numberOfConsumers = 1;
  }
  await publisher();
  for (let i = numberOfConsumers; i > 0; i--) {
    await consumer(i);
  }
}

start();