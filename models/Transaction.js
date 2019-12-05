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
    types: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  ammount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("transactions", TransactionSchema);
