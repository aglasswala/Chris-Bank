const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretOrKey } = process.env;

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
      accounts: req.user.accounts
    });
  },

  registerUser: async (req, res) => {
    // const { errors, isValid } = validateRegisterInput(req.body);
    // //check validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newUser = await User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          SSN: req.body.SSN,
          address: req.body.address,
          email: req.body.email,
          password: req.body.password
        });

        return newUser
      };
    })

    newUser.save()
        .then(user => {
          console.log("yes")
          return res.status(200).send({ user })
        })
        .catch(err => res.status(400).send({ err }));
  },

  loginUser: (req, res) => {
    let errors={}
    // const { errors, isValid } = validateLoginInput(req.body);
    // //check validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    const email = req.body.email;
    const password = req.body.password;
    //Find user by email
    User.findOne({ email }).then(user => {
      //check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
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
          jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
};
