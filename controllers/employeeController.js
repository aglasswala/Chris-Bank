const random = require("random");

const User = require("../models/User");
const Account = require("../models/Account");

module.exports = {
  test: (req, res) => {
    return res.status(200).json("employee route. all good");
  },

  findUser: (req,res)=>{
    errors = {};
    User.findOne({email: req.body.email}).then(user=>{
      if (!user) {
        errors.usernotfound = "User not Found";
        return res.status(400).json(errors);
      }
      res.status(200).json(user);
    })
  },
  createAccount: (req, res) => {
    errors = {};
    const { firstName, lastName, SSN, type, userID } = req.body;
    User.findOne({ firstName, lastName, SSN }).then(user => {
      if (!user) {
        errors.usernotfound = "User not Found";
        return res.status(400).json(errors);
      }

      new Account({
        userID,
        firstName,
        lastName,
        SSN,
        type,
        accountNumber: random.int(100000, 999999),
        routingNumber: random.int(100000, 999999)
      })
        .save()
        .then(account => {
          user.accounts.push(account);
          user.save().then(updatedUser=>{
            res.status(200).json({msg: "new account created", user: updatedUser })
          })
        });
    });
  }
};
