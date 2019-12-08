const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const TransactionSchema = new Schema({
  fromID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  toID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transaction = mongoose.model("transactions", TransactionSchema);
