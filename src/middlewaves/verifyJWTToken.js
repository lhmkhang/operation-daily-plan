const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function verifyJWTToken(req, res, next) {
  // token from cookie
  const accessToken = req.cookies?.jwt?.accessToken;

  if (accessToken === null || accessToken === undefined)
    return res.sendStatus(401);

  const decode = jwt.decode(accessToken, process.env.SECRET_KEY);

  if (Date.now() >= decode.exp * 1000) {
    return res.status(401).json({ error: "Token expired" });
  }
  req.user = decode.UserInfo.username;
  req.role = decode.UserInfo.roles;
  next();
}

// token from request header
/* const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
          req.user = decoded.UserInfo.username;
          req.roles = decoded.UserInfo.roles;
          next();
      }
  );
} */

module.exports = verifyJWTToken;
