const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "please enter email"]
  },
  firstName: {
    type: String,
    required: [true, "please enter First Name"]
  },
  lastName: {
    type: String,
    required: [true, "please enter Last Name"]
  },
  address: {
    type: String,
    required: [true, "please enter Address"]
  },
  SSN: {
    type: String,
    required: [true, "please enter your Social Security Number"]
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    min: [4, "password must be between 6 and 30 characters"],
    max: [30, "password msut be between 6 and 30 charcaters"]
  },
  balance: {
    type: Number,
    min: [0, "insuficient funds"],
    default: 100
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
