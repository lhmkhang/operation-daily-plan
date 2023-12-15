const express = require("express");
const fs = require("fs");
const path = require("path");
const wheelControllers = require("../controllers/wheelControllers");
const JWTControllers = require("../controllers/JWTControllers.js");
const verifyJWTToken = require("../middlewaves/verifyJWTToken.js");
const verifyRoles = require("../middlewaves/verifyRoles.js");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const router = express.Router();

let initWheelApiRoutes = (app) => {
  router
    .post("/check-reward", verifyJWTToken, wheelControllers.checkPrizeQuantity)
    .get("/get-reward", verifyJWTToken, wheelControllers.getListPrize)
    .post("/get-turn", verifyJWTToken, wheelControllers.getTotalTurn)
    .get("/get-users", verifyJWTToken, wheelControllers.getListUser)
    .get("/reward-info", verifyJWTToken, wheelControllers.getListRewardInfo)
  return app.use("/api/v1", router);
};

module.exports = initWheelApiRoutes;
