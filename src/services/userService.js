const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../helpers/logger");
const loggerError = logger.getLogger("errorLogger");
const loggerInfo = logger.getLogger("infoLogger");
const { UserModel } = require("../models/userModel");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const createNewUser = async (username, password, res) => {
  try {
    const existingUser = await UserModel.findOne({ username: username });

    if (!username || !password) {
      loggerError.error("Username or password is empty");
      return res.status(400).json({ error: "Username or password is empty" });
    }

    if (existingUser) {
      loggerError.error("User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    const hashUserPassword = hashPassword(password);
    await UserModel.create({ username, password: hashUserPassword });

    return res.redirect("/change-password");
  } catch (error) {
    loggerError.error(error);
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

    const hashUserPassword = hashPassword(password);

    await UserModel.findOneAndUpdate(
      { username: username },
      { password: hashUserPassword }
    );

    return res.redirect("/");
  } catch (error) {
    loggerError.error(error);
  }
};

const userLogin = async (username, password, res) => {
  try {
    const user = await UserModel.findOne({ username: username });
    const check = user ? comparePassword(password, user.password) : false;

    if (!user || !check) {
      loggerError.error("Invalid username or password");
      res.status(400).json({ error: "Invalid username or password" });
    } else {
      loggerInfo.info("Login successful");

      const token = jwt.sign({ username }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE_TOKEN_IN,
      });

      // return res.redirect("/home")
      res.cookie("token", token, { maxAge: 300000 });
      return res.redirect("/home");

      /* return res.json({
        token,
        expiresIn: process.env.EXPIRE_TOKEN_IN,
        receivedTime: new Date(),
      }); */
    }
  } catch (err) {
    loggerError.error(err);
  }
};

module.exports = {
  createNewUser,
  changePassword,
  userLogin,
};
