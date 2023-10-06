const express = require("express");
const path = require("path");
const initApiRoutes = require("./routers/apiRouters.js");
const initWebRoutes = require("./routers/webRouters.js");
const serverConfiguration = require("./configs/server.config.js");
const connectDB = require("./helpers/connectDB.js");
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const logger = require("./helpers/logger");
const loggerInfo = logger.getLogger("infoLogger");
const app = express();

// Connect to mongoDB
connectDB();

// Configuration of express server
serverConfiguration(app);

initApiRoutes(app);

// handle request from express
initWebRoutes(app);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

// test rabbitmq
/* app.post("/sendLog", async (req, res, next) => {
  await producer.publishMessage(req.body.logType, req.body.message);
  res.send();
}); */

app.listen(process.env.PORT || 8090, () => {
  loggerInfo.info(`Express server is running on port ${process.env.PORT}`);
});
