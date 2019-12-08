const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const AccountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  type: {
    type: String,
    enum: ["checking", "savings"]
  },
  accountNumber: {
    type: Number,
    required: true
  },
  routingNumber: {
    type: Number,
    required: true
  },
  balance:{
    type: Number,
    default: 100
  }
});

module.exports = Account = mongoose.model("accounts", AccountSchema);
