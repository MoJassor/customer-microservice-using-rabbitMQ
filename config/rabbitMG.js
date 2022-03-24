const amqp = require("amqplib");
const connector = async () => {
  const server = await amqp.connect(`${process.env.rabbitUrl}`);
  const channel = await server.createChannel();
  await channel.assertQueue("customerQueue", {
    durable: false,
    exclusive: false,
    autoDelete: false,
    arguments: null,
  });
  return channel;
};
module.exports = connector;
