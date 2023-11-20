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
// const connectRedis = require("./helpers/connectRedis");
// const { UserRoleModel } = require("./models/UserRoleModel");


// Connect to mongoDB
connectDB();

/* const newUserRol = new UserRoleModel({
  role: "ADMIN",
  description: "role for administrator",
  userId: ["651f8e2fc73a4ba3e94aad29"],
});

await newUserRol.save();
console.log(newUserRol); */

// Configuration of express server
// const redisStore = await connectRedis();

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


