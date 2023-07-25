const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function authenticateToken(req, res, next) {
  // Bearer TOKEN
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Nếu không có token, trả về 401 Unauthorized
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Nếu token không hợp lệ, trả về 403 Forbidden
    }

    req.user = user;
    next(); // Nếu không có lỗi, tiếp tục đến handler tiếp theo
  });
}

module.exports = authenticateToken;
