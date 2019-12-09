const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
var morgan = require("morgan");
const cors = require("cors");

//pull environmental variables from .env file
require("dotenv").config();

//import router
const router = require("./routes");

function startServer(server) {
  const { PORT } = process.env;

  server.listen(PORT || 3001, () => {
    console.log(`server live on ${PORT || 3001}`);
  });
}

async function init() {
  const { DB_URI } = process.env;

  //initalize express
  const app = express();

  //middleware
  app.use(bodyParser.json()); //parses request body
  app.use(cors()); //cors for hosting both front and back locally
  app.use(morgan("tiny")); //request logging

  //Passport middleware
  app.use(passport.initialize());

  //Passport Config
  require("./config/passport")(passport);

  //connect to db
  await mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch(err => console.log(err));

  router(app);
  startServer(app);
}

init();
