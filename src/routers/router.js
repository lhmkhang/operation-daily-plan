const express = require("express");
const homeController = require("../controllers/homeController.js");

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", homeController.getRoot);
    router.get("/navbar-item", homeController.getNavbarItem);
    router.post("/login", homeController.getUser);

    return app.use("/", router);
}

module.exports = initWebRoutes;