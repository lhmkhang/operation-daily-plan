const dotenv = require("dotenv").config();
const logger = require("../helpers/logger");
const loggerInfo = logger.getLogger("infoLogger");
const JWTService = require("./JWTServices");
const bcryptServices = require("./bcryptServices");
const { UserModel } = require("../models/userModel");
const { UserRoleModel } = require("../models/UserRoleModel");
const { StatusCodes } = require("http-status-codes");
const handleMessage = require("../utils/HandleMessage");
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

    return res.send({
      status: "success",
      code: StatusCodes.OK,
      message: MESSAGE.AUTH.CREATE_USER.CREATE_USER_SUCCESS,
    });
  } catch (error) {
    next(error);
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

    const userId = foundUser._id.toString();
    const userRoleData = await UserRoleModel.findOne({
      userId: { $in: [userId] },
    });
    const roles = { [userRoleData.role]: userRoleData.functional };

    // Create AT: username + user role + Id, RF: username, store RF in the database
    const accessToken = JWTService.createToken({
      UserInfo: { userId, username, roles },
    });

    const refreshToken = JWTService.createToken({ userId, username });
    await UserModel.findByIdAndUpdate(userId, { refreshToken: refreshToken });
    return res.json({ accessToken, refreshToken });


  } catch (err) {
    next(err);
  }
};

const userLogout = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user)
      return next(
        new handleMessage(
          MESSAGE.AUTH.LOG_OUT.LOG_OUT_ERROR,
          StatusCodes.FORBIDDEN
        )
      );

    const userID = req.session.user.userID;

    //Delete refreshToken in database after logout
    await UserModel.findByIdAndUpdate(userID, { refreshToken: "" });

    //Delete user'ss session in Redis
    req.session.destroy();

    //Clear cookie in the client's browser
    res.clearCookie("connect.sid");

    return res.send({
      status: "success",
      code: StatusCodes.OK,
      message: MESSAGE.AUTH.LOG_OUT.LOG_OUT_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (username, password, req, res, next) => {
  try {
    const userInToken = req.user;
    const userInRequestBody = req.body.username;

    if (userInToken !== userInRequestBody)
      return next(
        new handleMessage(
          MESSAGE.AUTH.CHANGE_PASSWORD.UNAUTHORIZED,
          StatusCodes.UNAUTHORIZED
        )
      );
    // Username or password is empty
    if (!username || !password)
      return next(
        new handleMessage(
          MESSAGE.AUTH.CHANGE_PASSWORD.EMPTY_CREDENTIALS,
          StatusCodes.BAD_REQUEST
        )
      );

    const existingUser = await UserModel.findOne({ username: username });

    // User does not exist in database
    if (!existingUser)
      return next(
        new handleMessage(
          MESSAGE.AUTH.CHANGE_PASSWORD.USER_NOT_FOUND,
          StatusCodes.BAD_REQUEST
        )
      );

    //Hash user's password
    const hashUserPassword = bcryptServices.hashPassword(password);

    await UserModel.findOneAndUpdate(
      { username: username },
      { password: hashUserPassword }
    );
    return next(new handleMessage("Change password successful!", 200));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
  changePassword,
  userLogin,
  userLogout,
};
