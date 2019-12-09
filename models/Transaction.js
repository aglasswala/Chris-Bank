const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const TransactionSchema = new Schema({
  from: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "please enter the origin user"]
    },
    balance: {
      type: Number
    }
  },
  to: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "please enter destination user"]
    },
    balance: {
      type: Number
    }
  },
  amount: {
    type: Number,
    required: [true, "please enter the amount"],
    min: [0, "amount cannot be negative"]
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
