const express = require("express");
const fs = require("fs");
const path = require("path");
const JWTControllers = require("../controllers/JWTControllers.js");
const verifyJWTToken = require("../middlewaves/verifyJWTToken.js");
const verifyRoles = require("../middlewaves/verifyRoles.js");
const dotenv = require("dotenv");
const authorizationController = require("../controllers/authorizationController.js");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const router = express.Router();

let initAuthorizationRoutes = (app) => {
    router
        .get("/get-role/:username", authorizationController.handleAuthorizationController)

    return app.use("/api/v1", router);
};

module.exports = initAuthorizationRoutes;