const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");


let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/change-password", homeController.getChangePasswordPage);
    router.get("/login", homeController.getLoginPage);
    router.get("/home", homeController.getHomePage);
    return app.use("/", router);
  };
  
module.exports = initWebRoutes;

