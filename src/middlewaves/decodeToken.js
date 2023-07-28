const jwt = require('jsonwebtoken');

let currentUser = null; // Biến toàn cục để lưu trữ thông tin người dùng sau khi xác thực token

const decodeTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log(token);

    currentUser = token; // Gán thông tin người dùng vào biến toàn cục
    next();
};

module.exports = {
    decodeTokenMiddleware,
    getCurrentUser: () => currentUser, // Hàm để truy cập thông tin người dùng từ bất kỳ đâu
};
