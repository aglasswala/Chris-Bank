const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const AccountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  accountNumber: {
    type: Number,
    required: true
  },
  routingNumber: {
    type: Number,
    required: true
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "transactions"
    }
  ]
});

module.exports = User = mongoose.model("accounts", AccountSchema);
