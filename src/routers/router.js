const express = require("express");
const fs = require("fs");
const homeController = require("../controllers/homeController.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

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
    upload.single("file"),
    homeController.uploadVolume
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
