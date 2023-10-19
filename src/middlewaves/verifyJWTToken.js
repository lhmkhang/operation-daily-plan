const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const handleMessage = require('../utils/HandleMessage');
const MESSAGE = require("../utils/message");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

/* function verifyJWTToken(req, res, next) {
  // token from cookie
  // const accessToken = req.cookies?.jwt?.accessToken;

  // lấy token từ authen header
  const authHeader = req.headers.authorization;
  const accessToken = authHeader.split(' ')[1];


  if (accessToken === null || accessToken === undefined) return next(new handleMessage(MESSAGE.AUTH.VERIFY_TOKEN.EMPTY_TOKEN, StatusCodes.UNAUTHORIZED));

  const decode = jwt.decode(accessToken, process.env.SECRET_KEY);

  if (Date.now() >= decode.exp * 1000) return next(new handleMessage(MESSAGE.AUTH.VERIFY_TOKEN.TOKEN_EXPIRED, StatusCodes.UNAUTHORIZED));

  req.user = decode.UserInfo.username;
  req.role = decode.UserInfo.roles;
  next();
} */

  // token from request header
  const verifyJWTToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) return next(new handleMessage(MESSAGE.AUTH.VERIFY_TOKEN.EMPTY_TOKEN, StatusCodes.UNAUTHORIZED));

    const token = authHeader.split(" ")[1];

    console.log(authHeader.split(" ")[1]);

    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) return next(new handleMessage(MESSAGE.AUTH.VERIFY_TOKEN.TOKEN_EXPIRED, StatusCodes.UNAUTHORIZED)); //invalid token
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
      });
    } else {
      return next(new handleMessage(MESSAGE.AUTH.VERIFY_TOKEN.TOKEN_EXPIRED, StatusCodes.UNAUTHORIZED));
    }

    
  };


module.exports = verifyJWTToken;
