const express = require("express");
const router = express.Router();
const verifyRoles = require("../middlewaves/verifyRoles");
const validToken = require("../middlewaves/verifyJWTToken");
const pageControllers = require("../controllers/pageControllers");

let initWebRoutes = (app) => {
  router
    .get("/", pageControllers.getLoginPage)
    .get( "/change-password", validToken, verifyRoles("user"), pageControllers.getChangePasswordPage )
    .get("/create-user", pageControllers.getCreateUserPage)
    .get("/home", validToken, pageControllers.getHomePage);
  return app.use("/", router);
};

module.exports = initWebRoutes;
