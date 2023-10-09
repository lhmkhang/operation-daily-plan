const log4js = require("log4js");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";

const config = {
  appenders: {
    console: { type: "console" },
    infoFile: {
      type: "dateFile",
      filename: path.resolve(__dirname, "..", "Logs/info"),
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      maxLogSize: 10485760, // 10MB
      backups: 3,
      layout: {
        type: "pattern",
        pattern: "%d [%p] %h %m",
      },
      level: "info",
    },
    errorFile: {
      type: "dateFile",
      filename: path.resolve(__dirname, "..", "Logs/error"),
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      maxLogSize: 1048576, // 10MB
      backups: 3,
      layout: {
        type: "pattern",
        pattern: "%d [%p] %h %m",
      },
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: isDev ? ["console"] : ["infoFile", "errorFile"],
      level: "debug",
    },
    infoLogger: {
      appenders: isDev ? ["console"] : ["infoFile"],
      level: "info",
    },
    errorLogger: {
      appenders: isDev ? ["console"] : ["errorFile"],
      level: "error",
    },
  },
};

const logger = log4js.configure(config);

module.exports = logger;
