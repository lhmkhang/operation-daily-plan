const jwt = require("jsonwebtoken");
const { UserModel } = require("../schemas/userSchema");
const logger = require("../helpers/logger");
const loggerError = logger.getLogger("errorLogger");
const loggerInfo = logger.getLogger("infoLogger");

const getUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ username: username });

    if (!user || user.password !== password) {
      loggerError.error("Invalid username or password");
      res.status(400).json({ error: "Invalid username or password" });
    } else {
      loggerInfo.info("Login successful");

      const token = jwt.sign({ username }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE_TOKEN_IN,
      });

      // return res.redirect("/home")
      res.cookie("token", token, { maxAge: 300000 });

      return res.json({
        token,
        expiresIn: process.env.EXPIRE_TOKEN_IN,
        receivedTime: new Date(),
      });
    }
  } catch (err) {
    loggerError.error(err);
  }
};

const createUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({ username: username });

  if (!username || !password) {
    loggerError.error("Username or password is empty");
    return res.status(400).json({ error: "Username or password is empty" });
  }

  if (existingUser) {
    loggerError.error("User already exists");
    return res.status(400).json({ error: "User already exists" });
  }

  await UserModel.create({ username, password });

  return res.redirect("/change-password");
}

const changePassword = async (req, res) => {
  const username = req.body.username;
  const rePassword = req.body.newPassword;

  if (!username || !rePassword) {
    loggerError.error("Username or new password is empty");
    return res.status(400).json({ error: "Username or new password is empty" });
  }

  const existingUser = await UserModel.findOne({ username: username });

  if (!existingUser) {
    loggerError.error("User does not exist");
    return res.status(400).json({ error: "User does not exist" });  
  };

  await UserModel.findOneAndUpdate({ username: username }, { password: rePassword });

  return res.redirect("/login");

}

module.exports = { getUser, createUser, changePassword };
