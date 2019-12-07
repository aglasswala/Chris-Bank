const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Account = require("../models/Account");
// const Transaction = require("../models/Transaction");

// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

module.exports = {
  test: (req, res) => {
    return res.status(200).json("accounts route. all good");
  },

  makeTransaction: (req, res) => {
    const { fromName, toID, ammount } = req.body;
    errors = {};
    Account.findOne({ name: fromName, user: req.user.id }).then(fromAccount => {
      if (!fromAccount) {
        errors.accountNotFound = "From Account Not Found";
        return res.status(400).json(errors);
      }
      Account.findOne({ ID: toID }).then(toAccount => {
        if (!toAccount) {
          errors.accountNotFound = "To Account Not Found";
          return res.status(400).json(errors);
        }
        new Transaction({
          fromID: fromAccount.ID,
          toID: toAccount.ID,
          ammount: req.body.ammount
        })
          .save()
          .then(transaction => {
            fromAccount -= ammont;
            toAccount += ammount;
          });
      });
    });
  }
};
