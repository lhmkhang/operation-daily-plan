const dotenv = require("dotenv").config();
const logger = require("../helpers/logger");
const loggerError = logger.getLogger("errorLogger");
const loggerInfo = logger.getLogger("infoLogger");
const JWTService = require("./JWTServices");
const bcryptServices = require("./bcryptServices");
const { UserModel } = require("../models/userModel");

const createNewUser = async (username, password, res) => {
  try {
    const existingUser = await UserModel.findOne({ username: username });

    if (!username || !password) {
      loggerError.error("Username or password is empty");
      return res.status(400).json({ error: "Username or password is empty" });
    }

    if (existingUser) {
      loggerError.error("User already exists");
      return res.status(409).json({ error: "User already exists" });
    }

    const hashUserPassword = bcryptServices.hashPassword(password);
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

const userLogin = async (username, password, req, res) => {
  try {
    if (!username || !password) {
      loggerError.error("Invalid username or password");
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const foundUser = await UserModel.findOne({ username: username });
    if (!foundUser) return res.sendStatus(401);

    const match = bcryptServices.comparePassword(password, foundUser.password);

    if (!match) return res.sendStatus(401);

    loggerInfo.info("Login successful");

    const roles = foundUser.group;
    const accessToken = JWTService.createToken({
      UserInfo: { username, roles },
    });
    const refreshToken = JWTService.createToken({ username });

    await UserModel.findOneAndUpdate(
      { username: foundUser.username },
      { refreshToken: refreshToken }
    );

    // return res.redirect("/home")
    req.session.user = { username, roles };
    res.cookie(
      "jwt",
      { accessToken, refreshToken },
      {
        maxAge: Number(process.env.SESSION_LIFE_TIME),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      }
    );
    return res.redirect("/home");

    /* return res.json({
        token,
        expiresIn: process.env.EXPIRE_TOKEN_IN,
        receivedTime: new Date(),
      }); */
  } catch (err) {
    loggerError.error(err);
  }
};

const userLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

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
};

module.exports = {
  createNewUser,
  changePassword,
  userLogin,
  userLogout,
};
