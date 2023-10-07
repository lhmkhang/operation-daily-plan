const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../..", ".env"),
});

async function connectRedis() {
  const redisClient = createClient({
    url: process.env.REDIS_CONNECTION_STRING,
  });

  redisClient.on("error", (err) => {
    console.error("Lỗi từ Redis:", err);
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
    console.error("Không thể kết nối hoặc khởi tạo RedisStore:", err);
    throw err; // Đẩy lỗi này ra ngoài để có thể xử lý ở nơi gọi hàm này (nếu cần)
  }
}

module.exports = connectRedis;
