const rabbitMqChannel = require("../config/rabbitMG");
const generateQueue = async (queueName) => {
  await rabbitMqChannel.assertQueue(queueName, { durable: false });
};
const sendToQueue = async (queueName, message) => {
  const channel = await rabbitMqChannel();
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
};

module.exports = { sendToQueue, generateQueue };
