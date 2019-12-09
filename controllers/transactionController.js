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
        errors.fromAccountNotFound = "From Account Not Found";
        return res.status(400).json(errors);
      }
      User.findOne({ email: toEmail }).then(toUser => {
        if (!toUser) {
          errors.toAccountNotFound = "To User Not Found";
          return res.status(400).json(errors);
        }
        new Transaction({
          from: {
            user: fromUser.id,
            balance: +fromUser.balance - +amount
          },
          to: {
            user: toUser.id,
            balance: +toUser.balance + +amount
          },
          amount: req.body.amount
        })
          .save()
          .then(transaction => {
            fromUser.balance = +fromUser.balance - +amount;
            fromUser.save().then(() => {
              toUser.balance = +toUser.balance + +amount;
              toUser.save().then(() => {
                res.status(200).json("transaction complete");
              });
            });
          });
      });
    });
  },
  getHistory: (req, res) => {
    let resp = [];

    //outboud transactions
    Transaction.find({ "from.user": req.user.id })
      .populate("form.user to.user")
      .then(trans => {
        trans.forEach(t => {
          resp.push({
            user: t.to.user.email,
            amount: `-${t.amount}`,
            balance: t.from.balance,
            date: t.timestamp
          });
        });
        // console.log(resp);
        //inbound transactions
        Transaction.find({ "to.user": req.user.id })
          .populate("from.user to.user")
          .then(trans => {
            trans.forEach(t => {
              // console.log(trans);
              resp.push({
                user: t.from.user.email,
                amount: `+${t.amount}`,
                balance: t.to.balance,
                date: t.timestamp
              });
            });
            resp.sort((a, b) => b.date - a.date);
            console.log(resp);
            res.json(resp);
          });

        // res.json(trans);
      });
  }
};
