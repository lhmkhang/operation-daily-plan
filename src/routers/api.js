const express = require("express");
const fs = require("fs");
const path = require("path");
const userController = require("../controllers/userController");
const uploadController = require("../controllers/uploadController");
const homeController = require("../controllers/homeController.js");
const timeAllowUpload = require("../middlewaves/timeAllowUpload.js");
const tokenAuthen = require("../middlewaves/tokenAuthen.js");
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
const upload = multer({ storage: storage });

let initApiRoutes = (app) => {
  router.get("/navbar-item", homeController.getNavbarItem);

  router.post("/create-user", userController.createUser);
  router.post("/change-password", userController.changePassword);

  router.post("/login", userController.getUser);

  router.post(
    "/upload-volume",
    tokenAuthen,
    upload.single("file"),
    timeAllowUpload(
      process.env.START_TIME_UPLOAD_VOLUME,
      process.env.END_TIME_UPLOAD_VOLUME
    ),
    uploadController.uploadVolume
  );

  router.put("/getDailyData", tokenAuthen, homeController.getDailyData);

  router.get("/incident", homeController.getIncidentData);

  return app.use("/api/v1", router);
};

module.exports = initApiRoutes;
