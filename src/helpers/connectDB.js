/* const path = require("path");
const logger = require('./logger.js');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, "../..", ".env") });

const MongoClient = mongodb.MongoClient;
const loggerInfo = logger.getLogger('infoLogger');
const loggerError = logger.getLogger('errorLogger');
let client;

async function connect() {
    try {
        client = new MongoClient(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        loggerInfo.info('Connected successfully to databases');
    } catch (err) {
        loggerError.error('Failed to connect to databases', err);
        setTimeout(connect, 5000);  // Thử kết nối lại sau 5 giây
    }
}

async function getDatabase(dbName) {
    if (!client || !client.topology.isConnected()) {
        await connect();
    }
    return client.db(dbName);
}

connect();  // Kết nối tới DBs ngay khi app start

// Xử lý khi chương trình bị tắt
process.on('exit', (code) => {
    if (client && client.topology.isConnected()) {
        loggerInfo.info('Closing MongoDB connection');
        client.close();
    }
}); */

const path = require("path");
const logger = require("./logger");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../..", ".env") });

const loggerInfo = logger.getLogger("infoLogger");
const loggerError = logger.getLogger("errorLogger");

// Kết nối tới MongoDB sử dụng Mongoose
const connectDB = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      loggerInfo.info("Connected successfully to databases");
    })
    .catch((err) => {
      loggerError.error("Failed to connect to databases", err);
      setTimeout(connect, 5000); // Thử kết nối lại sau 5 giây
    });

  // Xử lý khi chương trình bị tắt
  process.on("exit", (code) => {
    mongoose.connection.close(() => {
      loggerInfo.info("Closing MongoDB connection");
      process.exit(code);
    });
  });

  async function connect() {
    mongoose
      .connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        loggerInfo.info("Connected successfully to databases");
        // Lưu trữ connection vào biến db
        //   db = mongoose.connection;
      })
      .catch((err) => {
        loggerError.error("Failed to connect to databases", err);
        setTimeout(connect, 5000); // Thử kết nối lại sau 5 giây
      });
  }
};

module.exports = connectDB;
