const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

const User = require("../models/User");
const Account = require("../models/Account");

module.exports = {
  test: (req, res) => {
    return res.status(200).json("employee route. all good");
  },
  createAccount: (req, res) => {
    errors = {};
    const { firstName, lastName, SSN, type } = req.body;
    User.findOne({ firstName, lastName, SSN }).then(user => {
      if (!user) {
        errors.usernotfound = "User not Found";
        return res.status(400).json(errors);
      }

      new Account({
        user: req.user.id,
        firstName,
        lastName,
        SSN,
        type,
        accountNumber: uniqid(),
        routingNumber: uniqid()
      })
        .save()
        .then(account => {
          res.status(200).json(account);
        });
    });
  }
};
