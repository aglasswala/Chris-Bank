const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretOrKey } = process.env;

const User = require("../models/User");
const Transaction = require("../models/Transaction");

// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

module.exports = {
  test: (req, res) => {
    return res.status(200).json("transaction route, all good");
  },
  makeTransaction: (req, res) => {
    const { toEmail, amount } = req.body;
    errors = {};
    User.findOne({ email: req.user.email }).then(fromUser => {
      if (!fromUser) {
        errors.accountNotFound = "From Account Not Found";
        return res.status(400).json(errors);
      }
      User.findOne({ email: toEmail }).then(toUser => {
        if (!toUser) {
          errors.accountNotFound = "To User Not Found";
          return res.status(400).json(errors);
        }
        new Transaction({
          fromID: fromUser.id,
          toID: toUser.id,
          amount: req.body.amount
        })
          .save()
          .then(transaction => {
            fromUser.balance -= amount;
            fromUser.save().then(() => {
              toUser.balance += amount;
              toUser.save().then(() => {
                res.status(200).json("transaction complete");
              });
            });
          });
      });
    });
  }
};
