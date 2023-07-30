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

module.exports = { getUser };
