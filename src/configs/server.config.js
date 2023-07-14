import express from 'express';
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const serverConfiguration = (app) => {
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

export default serverConfiguration;
