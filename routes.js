const path = require("path");
const passport = require("passport");

const userController = require("./controllers/userController");
const transactionController = require("./controllers/transactionController");

module.exports = router => {
  router.get("/", (req, res) => res.status(200).send({ yes: "oh yeah" }));

  //User Routes
  router.get("/api/u/test", userController.test);
  router.get(
    "/api/u",
    passport.authenticate("jwt", { session: false }),
    userController.getCurrentUser
  );
  router.post("/api/u/register", userController.registerUser);
  router.post("/api/u/login", userController.loginUser);
  router.post(
    "/api/u/getbalance",
    passport.authenticate("jwt", { session: false }),
    userController.getBalance
  );

  //Transaction Routes
  router.post(
    "/api/t",
    passport.authenticate("jwt", { session: false }),
    transactionController.makeTransaction
  );
  // router.get(
  //   "/api/t",
  //   passport.authenticate("jwt", { session: false }),
  //   transactionController.getHistory
  // );
};
