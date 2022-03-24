const mongoose = require("mongoose");

async function connector() {
  await mongoose.connect("mongodb://localhost:27017/rabbit");
}
module.exports = connector;
