const express = require("express");
const app = express();
const cors = require("cors");

const connector = require("./database/database");
const customerModel = require("./models/customer.model");

const { sendToQueue } = require("./services/rabbitMQ.service");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/getCustomer", async (request, reply) => {
  try {
    const customers = await customerModel.find();
    reply.json({ customers });
  } catch (error) {
    console.log(error);
    reply.sendStatus(500);
  }
});

app.post("/addCustomer", async (request, reply) => {
  try {
    const newCustomer = new customerModel(request.body);
    await newCustomer.save();
    reply.sendStatus(201);
  } catch (error) {
    console.log(error);
    reply.sendStatus(500);
  }
});

app.get("/getCustomer", async (request, reply) => {
  try {
    const customers = await customerModel.find();
    reply.status(200).json({ customers });
  } catch (error) {
    console.log(error);
    reply.sendStatus(500);
  }
});
app.get("/getCustomer/:customerId", async (request, reply) => {
  try {
    const customers = await customerModel.findById(request.params.customerId);
    reply.status(200).json({ customers });
  } catch (error) {
    console.log(error);
    reply.sendStatus(500);
  }
});
app.put("/updateCustomer/:customerId", async (request, reply) => {
  try {
    const updatedCustomer = await customerModel.findByIdAndUpdate(
      request.params.customerId,
      request.body
    );
    const customer = await customerModel.findById(updatedCustomer._id);
    await sendToQueue("customerQueue", customer);
    reply.sendStatus(200);
  } catch (error) {
    console.log(error);
    reply.sendStatus(500);
  }
});
async function connect() {
  try {
    await connector();
    console.log("connected to database");
    app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.log(error);
  }
}
connect();
