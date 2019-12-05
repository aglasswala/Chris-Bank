const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  SSN: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accounts: [
    {
      type: Schema.Types.ObjectId,
      ref: "accounts"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
