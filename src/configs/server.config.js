const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, "../..", ".env") });
const corsOptions = require("./corsOptions");
const allowCredentials = require("../middlewaves/allowCredentials");
const logger = require("../helpers/logger");
const loggerInfo = logger.getLogger("infoLogger");
const loggerError = logger.getLogger('errorLogger');


const morganStream = {
  write: (message) => {
    const statusCode = parseInt(
      message.split(" ")[message.split(" ").length - 5],
      10
    );
    if (statusCode < 400) {
      loggerInfo.info(message.trim());
    } else {
      loggerError.error(message.trim());
    }
  },
};

const serverConfiguration = (app, redisStore) => {
  app.use(
    session({
      store: redisStore,
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: Number(process.env.SESSION_LIFE_TIME) },
    })
  );
  app.use(allowCredentials);
  app.use(cors(corsOptions));
  app.use(express.static("./src/public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  /* app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true, cookie: { secure: false, maxAge: Number(process.envSESSION_LIFE_TIME) } })); */

  app.use(
    morgan(
      ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms",
      { stream: morganStream }
    )
  );
  app.set("view engine", "ejs");
  app.set("views", "./src/views");

};

module.exports = serverConfiguration;