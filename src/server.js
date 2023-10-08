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
const connectRedis = require("./helpers/connectRedis");

(async () => {
  try {
    // Connect to mongoDB
    connectDB();

    // Configuration of express server
    const redisStore = await connectRedis();

    serverConfiguration(app, redisStore);

    initApiRoutes(app);
    initWebRoutes(app);

    app.use((err, req, res, next) => {
      err.statusCode = err.statusCode || 500;
      err.status = err.status || "error";

      res.status(err.statusCode).json({
        status: err.status,
        code: err.statusCode,
        message: err.message,
      });
    });

    app.listen(process.env.PORT || 8090, () => {
      loggerInfo.info(`Express server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Không thể khởi tạo RedisStore hoặc cấu hình server:", error);
  }

})();

// test rabbitmq
/* app.post("/sendLog", async (req, res, next) => {
  await producer.publishMessage(req.body.logType, req.body.message);
  res.send();
}); */


