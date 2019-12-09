const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SecretOrKey } = process.env;

const User = require("../models/User");

// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

module.exports = {
  test: (req, res) => {
    return res.status(200).json("all good");
  },
  getCurrentUser: (req, res) => {
    res.status(200).json({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      balance: req.user.balance,
      email: req.user.email,
      date: req.user.date
    });
  },

  registerUser: async (req, res) => {
    // const { errors, isValid } = validateRegisterInput(req.body);
    // //check validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const { password } = req.body;
    if (password.length < 6) {
      res
        .status(400)
        .json({ err: "password must be at least 6 characters long" });
    }
    const hashedPass = bcrypt.hashSync(password, 10);

    const newUser = await User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ err: "Email already exists" });
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          SSN: req.body.SSN,
          address: req.body.address,
          email: req.body.email,
          password: hashedPass
        });

        return newUser;
      }
    });

    newUser
      .save()
      .then(user => {
        const payload = {
          id: user.id,
          email: user.email
        };
        jwt.sign(payload, SecretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            user
          });
        });
      })
      .catch(err => res.status(400).send({ err }));
  },

  loginUser: (req, res) => {
    let errors = {};
    const email = req.body.email;
    const password = req.body.password;
    //Find user by email
    User.findOne({ email }).then(user => {
      //check for user
      if (!user) {
        return res.status(400).json({ err: "User not found" });
      }

      //check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //User mathed

          //Create JWT payload
          const payload = {
            id: user.id,
            email: user.email
          };

          //Sign Token
          jwt.sign(payload, SecretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          return res.status(400).json({ err: "Password incorrect" });
        }
      });
    });
  },
  getBalance: (req, res) => {
    return res.status(200).json(req.user.balance);
  }
};
