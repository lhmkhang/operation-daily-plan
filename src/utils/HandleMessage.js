const logger = require("../helpers/logger");

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = statusCode >= 400 ? "error" : "success";
      this.isOperational = true;

      /* const loggerError = logger.getLogger("errorLogger");
        const loggerInfo = logger.getLogger("infoLogger");

        if (this.statusCode >= 400) {
          loggerError.error(`${statusCode} - ${message}`);
        } else {
          loggerInfo.info(`${statusCode} - ${message}`);
        } */
    }
}

module.exports = AppError;
