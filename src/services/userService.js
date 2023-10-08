const dotenv = require("dotenv").config();
const logger = require("../helpers/logger");
const loggerError = logger.getLogger("errorLogger");
const loggerInfo = logger.getLogger("infoLogger");
const JWTService = require("./JWTServices");
const bcryptServices = require("./bcryptServices");
const { UserModel } = require("../models/userModel");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const handleMessage = require('../utils/HandleMessage');
const MESSAGE = require("../utils/message");

const createNewUser = async (username, password, res, next) => {
  try {
    const existingUser = await UserModel.findOne({ username: username });

    // Username or password is empty
    if (!username || !password)
      return next(
        new handleMessage(
          MESSAGE.AUTH.CREATE_USER.EMPTY_CREDENTIALS,
          StatusCodes.BAD_REQUEST
        )
      );

    // User already exists
    if (existingUser)
      return next(
        new handleMessage(
          MESSAGE.AUTH.CREATE_USER.USER_CONFLICT,
          StatusCodes.CONFLICT
        )
      );

    //Store username and hash password in the dataabase
    const hashUserPassword = bcryptServices.hashPassword(password);
    await UserModel.create({ username, password: hashUserPassword });

    return next(new handleMessage("Create user successful!", 200));
  } catch (error) {
    next(error);
  }
};

const changePassword = async (username, password, res) => {
  try {
    if (!username || !password) {
      loggerError.error("Username or new password is empty");
      return res
        .status(400)
        .json({ error: "Username or new password is empty" });
    }

    const existingUser = await UserModel.findOne({ username: username });

    if (!existingUser) {
      loggerError.error("User does not exist");
      return res.status(400).json({ error: "User does not exist" });
    }

    const hashUserPassword = bcryptServices.hashPassword(password);

    await UserModel.findOneAndUpdate(
      { username: username },
      { password: hashUserPassword }
    );
    return res.redirect("/");
  } catch (error) {
    loggerError.error(error);
  }
};

const userLogin = async (username, password, req, res, next) => {
  try {
    // Username or password is empty
    if (!username || !password)
      return next(
        new handleMessage(
          MESSAGE.AUTH.LOGIN.EMPTY_CREDENTIALS,
          StatusCodes.BAD_REQUEST
        )
      );

    // User does not exist in database
    const foundUser = await UserModel.findOne({ username: username });
    if (!foundUser)
      return next(
        new handleMessage(
          MESSAGE.AUTH.LOGIN.USER_NOT_FOUND,
          StatusCodes.UNAUTHORIZED
        )
      );

    const match = bcryptServices.comparePassword(password, foundUser.password);

    // Password is not match in the database
    if (!match)
      return next(
        new handleMessage(
          MESSAGE.AUTH.LOGIN.INVALID_CREDENTIALS,
          StatusCodes.UNAUTHORIZED
        )
      );

    loggerInfo.info("Login successful");

    // Create AT: username + user role, RF: username, store RF in the database
    const roles = foundUser.group;
    const accessToken = JWTService.createToken({
      UserInfo: { username, roles },
    });

    const refreshToken = JWTService.createToken({ username });

    await UserModel.findOneAndUpdate(
      { username: foundUser.username },
      { refreshToken: refreshToken }
    );

    // store user's session in Redis
    req.session.user = {
      username,
      roles,
      "connect.sid": req.cookies["connect.sid"],
    };

    return res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

// chưa xử lý logic code đoạn này
const userLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  try {
    // Is refreshToken in db?
    const foundUser = usersDB.users.find(
      (person) => person.refreshToken === refreshToken
    );
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    const otherUsers = usersDB.users.filter(
      (person) => person.refreshToken !== foundUser.refreshToken
    );
    const currentUser = { ...foundUser, refreshToken: "" };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  } catch (error) {
    loggerError.error(error);
  }
};

module.exports = {
  createNewUser,
  changePassword,
  userLogin,
  userLogout,
};
