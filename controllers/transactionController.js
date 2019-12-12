const User = require("../models/User");
const Transaction = require("../models/Transaction");

// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

module.exports = {
  //  @route  POST api/t/test
  //  @desc   Test transaction route
  //  @access Public
  test: (req, res) => {
    return res.status(200).json({ status: "OK", body: req.body });
  },

  //  @route  POST api/t
  //  @desc   Make transaction
  //  @access Private
  makeTransaction: (req, res) => {
    //grab recipient email and amount from body
    const { toEmail, amount } = req.body;
    if (amount < 0) {
      //check for negative amount
      return res.status(400).json({ err: "Insufficent Funds" });
    }
    if (req.user.email === toEmail) {
      //check for self send
      return res.status(400).json({ err: "Invalid To User" });
    }

    //access current user in db
    User.findOne({ email: req.user.email }).then(fromUser => {
      if (!fromUser) {
        //check if user exists
        return res.status(400).json({ err: "From Account Not Found" });
      }
      if (req.user.balance < amount) {
        //check if user has enough money
        return res.status(400).json({ err: "Insufficent Funds" });
      }

      //find recipient user in db
      User.findOne({ email: toEmail }).then(toUser => {
        if (!toUser) {
          //check if recipient user exists
          return res.status(400).json({ err: "Recipient User Not Found" });
        }

        //create transaction document
        new Transaction({
          from: {
            user: fromUser.id,
            balance: +fromUser.balance - +amount //balance after transaction
          },
          to: {
            user: toUser.id,
            balance: +toUser.balance + +amount //balance after transaction
          },
          amount: req.body.amount
        })
          .save()
          .then(transaction => {
            //deduct from current user balance
            fromUser.balance = +fromUser.balance - +amount;
            fromUser.save().then(() => {
              //add to recipient user balance
              toUser.balance = +toUser.balance + +amount;
              toUser.save().then(() => {
                res.status(200).json({
                  //json response
                  status: "OK",
                  transaction: {
                    from: fromUser.email,
                    to: toUser.email,
                    amount: transaction.amount,
                    date: `${new Date().toUTCString()}`
                  }
                });
              });
            });
          });
      });
    });
  },

  //  @route  GET api/t
  //  @desc   Get transaction history
  //  @access Private
  getHistory: (req, res) => {
    let resp = []; //reponse array for transactions

    //Find user's outbound transactions
    Transaction.find({ "from.user": req.user.id })
      .populate("form.user to.user") //fill in user info based on their id
      .then(trans => {
        //for each outbound transaction push info to array
        trans.forEach(t => {
          resp.push({
            user: t.to.user.email,
            amount: `-${t.amount}`,
            balance: t.from.balance,
            date: t.timestamp
          });
        });
        //Find user's inbound transactions
        Transaction.find({ "to.user": req.user.id })
          .populate("from.user to.user") //fill in user info based on their id
          .then(trans => {
            //for each outbound transaction push info to array
            trans.forEach(t => {
              resp.push({
                user: t.from.user.email,
                amount: `+${t.amount}`,
                balance: t.to.balance,
                date: t.timestamp
              });
            });
            resp.sort((a, b) => b.date - a.date); //sort transactions array in descending orderbased on date
            return res.status(200).json(resp); //return transactions array
          });
      });
  }
};
