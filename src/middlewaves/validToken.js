const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function validToken(req, res, next) {
  // Bearer TOKEN
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.cookies.token;

  if (token === null || token === undefined) return res.sendStatus(401);

  const decode = jwt.decode(token, process.env.SECRET_KEY);

  // if (err) return res.status(403).json({ error: "Token is invalid" });
  if (Date.now() >= decode.exp * 1000) {
    return res.status(401).json({ error: "Token expired" });
  }
  req.user = decode.user;
  next();
}

module.exports = validToken;
