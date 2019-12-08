const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes");

function startServer(server) {
  const { PORT } = process.env;

  server.listen(PORT || 3001, () => {
    console.log(`let's get it motherfucker, we live on ${PORT || 3001}`); // eslint-disable-line
  });
}

async function init() {
  const { DB_URI } = process.env;

  const app = express();

  // app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());
  app.use(cors());

  //Passport middleware
  app.use(passport.initialize());

  //Passport Config
  require("./config/passport")(passport);

  //connect to db
  mongoose
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
