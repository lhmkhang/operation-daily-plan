const express = require("express");
const path = require("path");
const logger = require("./helpers/logger");
const initApiRoutes = require("./routers/apiRouters.js");
const initWebRoutes = require("./routers/webRouters.js");
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

initApiRoutes(app);

// handle request from express
initWebRoutes(app);

app.listen(process.env.PORT || 8090, () => {
  loggerInfo.info(`Express server is running on port ${process.env.PORT}`);
});
