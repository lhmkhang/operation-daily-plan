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
    .post("/check-reward-v2", verifyJWTToken, wheelControllers.checkPrizeQuantityV2)
    .get("/get-reward", verifyJWTToken, wheelControllers.getListPrize)
    .get("/get-reward-v2", verifyJWTToken, wheelControllers.getListPrizeV2)
    .post("/get-turn", verifyJWTToken, wheelControllers.getTotalTurn)
    .get("/get-users", verifyJWTToken, wheelControllers.getListUser)
    .get("/get-users-v2", verifyJWTToken, wheelControllers.getListUserV2)
    .get("/get-team", verifyJWTToken, wheelControllers.getAllTeams)
    .get("/reward-info", verifyJWTToken, wheelControllers.getListRewardInfo)
  return app.use("/api/v1", router);
};

module.exports = initWheelApiRoutes;
