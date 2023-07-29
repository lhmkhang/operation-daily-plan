const express = require("express");
const path = require("path");
const logger = require("./helpers/logger");
const initWebRoutes = require("./routers/router.js");
const serverConfiguration = require("./configs/server.config.js");
const connectDB = require("./helpers/connectDB.js");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const loggerInfo = logger.getLogger("infoLogger");

// Connect to mongoDB
connectDB();

// Configuration of express server
serverConfiguration(app);

// handle request from express
initWebRoutes(app);

app.listen(process.env.PORT, () => {
  loggerInfo.info(`Express server is running on port ${process.env.PORT}`);
});
