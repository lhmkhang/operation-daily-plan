const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../..", ".env"),
});
const logger = require("../helpers/logger");
const loggerInfo = logger.getLogger("infoLogger");
const loggerError = logger.getLogger("errorLogger");

let errorCount = 0;
let reconnectInterval;

async function connectRedis() {
  const redisClient = createClient({
    url: process.env.REDIS_CONNECTION_STRING,
  });

  redisClient.on("error", (err) => {
    errorCount++;
    loggerError.error("Lỗi từ Redis:", err);
    if (errorCount <= 3) {
      loggerError.error(`Lỗi kết nối Redis ${errorCount} lần.`);
    }
    if (!reconnectInterval) {
      reconnectInterval = setInterval(async () => {
        try {
          await redisClient.connect();
        } catch (reconnectError) {
          loggerError.error("Không thể kết nối lại Redis:", reconnectError);
        }
      }, 5000); // Thử kết nối lại mỗi 5 giây
    }
  });

  redisClient.on("ready", () => {
    clearInterval(reconnectInterval); // Clear the interval once connected
    reconnectInterval = null; // Reset the interval reference
    errorCount = 0; // Reset the error count
    loggerInfo.info("Connected to Redis successful!");
  });

  redisClient.on("end", () => {
    loggerError.error("Kết nối Redis bị đóng.");
    if (!reconnectInterval) {
      reconnectInterval = setInterval(async () => {
        try {
          await redisClient.connect();
        } catch (reconnectError) {
          loggerError.error("Không thể kết nối lại Redis:", reconnectError);
        }
      }, 5000); // Thử kết nối lại mỗi 5 giây
    }
  });

  try {
    // Kết nối tới Redis
    await redisClient.connect();

    // Khởi tạo RedisStore
    const redisStore = new RedisStore({
      client: redisClient,
      ttl: 3600,
    });

    return redisStore;
  } catch (err) {
    loggerError.error("Không thể kết nối hoặc khởi tạo RedisStore:", err);
    throw err;
  }
}

module.exports = connectRedis;
