const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Address: { type: String, required: true },
  },
  { versionKey: false }
);
module.exports = model("customer", customerSchema);
