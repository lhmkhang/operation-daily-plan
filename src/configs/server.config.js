const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const serverConfiguration = (app) => {
    app.use(cors());
    app.use(express.static("./src/public"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: Number(process.env.SESSION_LIFE_TIME) }
    }));
    app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
    // app.set("view engine", "ejs");
    // app.set("views", "./src/views");
}

module.exports = serverConfiguration;
