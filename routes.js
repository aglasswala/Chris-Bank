const path = require("path");

const userController = require("./controllers/userController");
// const accountController = require("./controllers/accountController");
// const employeeController = require("./controllers/employeeController");

module.exports = router => {
  router.get("/", (req, res) => res.status(200).send({ yes: "oh yeah" }));

  //User Routes
  router.get("/api/u", userController.getCurrentUser);
  router.post("/api/u/register", userController.registerUser);
  router.post("/api/u/login", userController.loginUser);

  //Account Routes

  //Employee Routes
};
