const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const TransactionSchema = new Schema({
  fromID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "please enter the origin user"]
  },
  toID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "please enter destination user"]
  },
  amount: {
    type: Number,
    required: [true, "please enter the amount"]
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transaction = mongoose.model(
  "transactions",
  TransactionSchema
);
