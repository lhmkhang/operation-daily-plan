const checkTimeValidity = (startTime, endTime) => (req, res, next) => {
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

  /* const userRole = req.session.user && req.session.user.group;

  if (userRole === "admin") {
    return next();
  } */

  // Kiểm tra xem thời gian có nằm trong khoảng từ startTime đến endTime không
  if (
    (hour > startHour || (hour === startHour && minute >= startMinute)) &&
    (hour < endHour || (hour === endHour && minute < endMinute))
  ) {
    // Trong khoảng thời gian cho phép
    next();
  } else {
    return res.status(403).json("Ngoài khoảng thời gian cho phép.");
  }
};

module.exports = checkTimeValidity;
