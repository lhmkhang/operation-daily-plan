const express = require("express");
const path = require("path");
const initUserApiRoutes = require("./routers/userApiRouters.js");
const initWebRoutes = require("./routers/webRouters.js");
const initWheelApiRoutes = require("./routers/WheelApiRouters.js");
const serverConfiguration = require("./configs/server.config.js");
const connectDB = require("./helpers/connectDB.js");
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const logger = require("./helpers/logger");
const loggerInfo = logger.getLogger("infoLogger");
const app = express();
// const { UserRoleModel } = require("./models/UserRoleModel");

// Connect to mongoDB
connectDB();

if (process.env.NODE_ENV === 'production') {
  const next = require('next');
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev, dir: process.env.PATH_FOLDER_FE });
  const handleNextRequests = nextApp.getRequestHandler();

  nextApp.prepare().then(() => {

    // Configuration of express server
    serverConfiguration(app);

    initWheelApiRoutes(app);
    initUserApiRoutes(app);

    app.use((err, req, res, next) => {
      err.statusCode = err.statusCode || 500;
      err.status = err.status || "error";

      const loggerError = logger.getLogger("errorLogger");
      loggerError.error(
        `${req.ip} - ${req.method} ${req.url} ${err.statusCode} - ${err.name}: ${err.message}\n${err.stack}`
      );

      res.status(err.statusCode).json({
        status: err.status,
        code: err.statusCode,
        message: err.message,
      });
    });

    app.get('*', (req, res) => {
      return handleNextRequests(req, res);
    });

    app.listen(process.env.PORT || 8090, () => {
      loggerInfo.info(`Express server is running on port ${process.env.PORT}`);
    });

  })
} else {
  // Configuration of express server
  serverConfiguration(app);

  initWheelApiRoutes(app);
  initUserApiRoutes(app);
  initWebRoutes(app);

  app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    const loggerError = logger.getLogger("errorLogger");
    loggerError.error(
      `${req.ip} - ${req.method} ${req.url} ${err.statusCode} - ${err.name}: ${err.message}\n${err.stack}`
    );

    res.status(err.statusCode).json({
      status: err.status,
      code: err.statusCode,
      message: err.message,
    });
  });

  app.listen(process.env.PORT || 8090, () => {
    loggerInfo.info(`Express server is running on port ${process.env.PORT}`);
  });


  // test rabbitmq
  /* app.post("/sendLog", async (req, res, next) => {
    await producer.publishMessage(req.body.logType, req.body.message);
    res.send();
  }); */
}
