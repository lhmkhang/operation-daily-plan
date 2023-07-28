const express = require("express");
const fs = require("fs");
const path = require("path");
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

let initWebRoutes = (app) => {
  router.get("/", homeController.getRoot);
  router.get("/navbar-item", homeController.getNavbarItem);
  router.post("/login", homeController.getUser);
  router.post(
    "/upload-volume",
    tokenAuthen,
    upload.single("file"),
    timeAllowUpload(
      process.env.START_TIME_UPLOAD_VOLUME,
      process.env.END_TIME_UPLOAD_VOLUME
    ),
    homeController.uploadVolume
  );
  router.put("/getDailyData", tokenAuthen, homeController.getDailyData)

  return app.use("/", router);
};


module.exports = initWebRoutes;
