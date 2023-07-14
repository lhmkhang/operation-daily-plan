import express from "express";
import homeController from "../controllers/homeController.js";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", homeController.getRoot);
    router.get("/navbar-item", homeController.getNavbarItem);
    router.get("/login", homeController.getUser);

    return app.use("/", router);
}

export default initWebRoutes;