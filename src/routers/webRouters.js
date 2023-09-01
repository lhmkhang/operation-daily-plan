const express = require("express");
const router = express.Router();
const validToken = require("../middlewaves/validToken");
const pageControllers = require("../controllers/pageControllers");

let initWebRoutes = (app) => {
  router.get("/", pageControllers.getLoginPage);
  router.get(
    "/change-password",
    validToken,
    pageControllers.getChangePasswordPage
  );
  router.get("/create-user", pageControllers.getCreateUserPage);
  router.get("/home", validToken, pageControllers.getHomePage);
  return app.use("/", router);
};

module.exports = initWebRoutes;
