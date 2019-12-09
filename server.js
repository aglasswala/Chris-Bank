const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
var morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes");

function startServer(server) {
  const { PORT } = process.env;

  server.listen(PORT || 3001, () => {
    console.log(`server live on ${PORT || 3001}`); // eslint-disable-line
  });
}

async function init() {
  const { DB_URI } = process.env;

  const app = express();

  // app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());
  app.use(cors());

  morgan("tiny");

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
