import express from "express";
import dotenv from "dotenv";
import logger from './middlewaves/logger.js'
import initWebRoutes from "./routers/router.js";
import serverConfiguration from "./configs/server.config.js";
dotenv.config();

const app = express();
const loggerInfo = logger.getLogger('infoLogger');

// Configuration of express server
serverConfiguration(app);

// handle request from express
initWebRoutes(app);

app.listen(process.env.PORT, () => {
    loggerInfo.info(`Server is running on port ${process.env.PORT}`);
});
