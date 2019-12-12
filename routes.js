const passport = require("passport");

//import models
const userController = require("./controllers/userController");
const transactionController = require("./controllers/transactionController");

module.exports = router => {
  router.get("/", (req, res) => res.status(200).send({ yes: "oh yeah" }));

  //User Routes

  //  @route  GET api/u/test
  //  @desc   Test users route
  //  @access Public
  router.get("/api/u/test", userController.test);

  //  @route  GET api/u
  //  @desc   Get current user
  //  @access Private
  router.get(
    "/api/u",
    passport.authenticate("jwt", { session: false }),
    userController.getCurrentUser
  );
  //  @route  POST api/u/register
  //  @desc   Register user
  //  @access Public
  router.post("/api/u/register", userController.registerUser);

  //  @route  POST api/u/login
  //  @desc   Login user
  //  @access Public
  router.post("/api/u/login", userController.loginUser);

  //  @route  GET api/u/getbal
  //  @desc   Get user balance
  //  @access Public
  router.post(
    "/api/u/getbalance",
    passport.authenticate("jwt", { session: false }),
    userController.getBalance
  );

  //Transaction Routes

  //  @route  POST api/t/test
  //  @desc   Test transaction route
  //  @access Public
  router.get("/api/t/test", transactionController.test);

  //  @route  POST api/t
  //  @desc   Make transaction
  //  @access Private
  router.post(
    "/api/t",
    passport.authenticate("jwt", { session: false }),
    transactionController.makeTransaction
  );

  //  @route  GET api/t
  //  @desc   Get transaction history
  //  @access Private
  router.get(
    "/api/t",
    passport.authenticate("jwt", { session: false }),
    transactionController.getHistory
  );
};
