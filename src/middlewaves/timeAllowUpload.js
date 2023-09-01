const path = require("path");
// const { getDatabase } = require("../middlewaves/getDatabase.js");
const { UserModel } = require("../models/userModel");
const logger = require("../helpers/logger");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const loggerError = logger.getLogger("errorLogger");

const checkTimeValidity = (startTime, endTime) => async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const username = jwt.decode(token, process.env.SECRET_KEY).username;

    // const database = await getDatabase("operation");
    // const userCollection = database.collection("users");
    const user = await UserModel.findOne({ username: username });

    const now = new Date();
    const offset = 7; // GMT+7

    // Chuyển đổi múi giờ sang GMT+0 (UTC) và tính độ lệch phút
    const offsetMinutes = offset * 60;
    const localOffset = now.getTimezoneOffset();
    const vietnamOffset = offsetMinutes + localOffset;

    // Tạo một bản sao của thời gian hiện tại và điều chỉnh đến GMT+7
    const vietnamTime = new Date(now.getTime() + vietnamOffset * 60 * 1000);

    const hour = vietnamTime.getHours();
    const minute = vietnamTime.getMinutes();

    // Rút trích giờ và phút từ chuỗi đại diện thời gian bắt đầu và kết thúc
    const [startHour, startMinute] = startTime
      .split(":")
      .map((str) => parseInt(str, 10));
    const [endHour, endMinute] = endTime
      .split(":")
      .map((str) => parseInt(str, 10));

    // Kiểm tra xem thời gian có nằm trong khoảng từ startTime đến endTime không
    if (user.group.toLowerCase() === "admin") {
      next();
    } else if (
      (hour > startHour || (hour === startHour && minute >= startMinute)) &&
      (hour < endHour || (hour === endHour && minute < endMinute)) &&
      user.group.toLowerCase() !== "admin"
    ) {
      // Trong khoảng thời gian cho phép
      next();
    } else {
      return res
        .status(403)
        .json({ error: "Ngoài khoảng thời gian cho phép." });
    }
  } catch (err) {
    loggerError.error(err);
  }
};

module.exports = checkTimeValidity;
