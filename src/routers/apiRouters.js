const express = require("express");
const fs = require("fs");
const path = require("path");
const userControllers = require("../controllers/userControllers");
const JWTControllers = require("../controllers/JWTControllers.js");
// const uploadController = require("../controllers/uploadController");
const pageControllers = require("../controllers/pageControllers.js");
// const timeAllowUpload = require("../middlewaves/timeAllowUpload.js");
const verifyJWTToken = require("../middlewaves/verifyJWTToken.js");
const verifyRoles = require("../middlewaves/verifyRoles.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueFileName = uuidv4() + "-" + file.originalname;
    cb(null, uniqueFileName);
  },
});
// const upload = multer({ storage: storage });

let initApiRoutes = (app) => {
  // router.get("/navbar-item", pageControllers.getNavbarItem);

  // Handle user's actions
  router
    .post("/signup", userControllers.handleCreateNewUser)
    .post("/change-password", userControllers.handleChangePassword)
    .post("/login", userControllers.handleLogin)
    .get("/logout", userControllers.handleLogout)
    .get("/refresh-token", JWTControllers.handleRenewToken);

  /* router.post(
    "/upload-volume",
    validToken,
    upload.single("file"),
    timeAllowUpload(
      process.env.START_TIME_UPLOAD_VOLUME,
      process.env.END_TIME_UPLOAD_VOLUME
    ),
    uploadController.uploadVolume
  );

  router.put("/getDailyData", validToken, pageControllers.getDailyData);
  router.get("/incident", pageControllers.getIncidentData); */

  return app.use("/api/v1", router);
};

module.exports = initApiRoutes;
