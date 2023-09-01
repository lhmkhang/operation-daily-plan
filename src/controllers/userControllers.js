const userServices = require("../services/userService");

const handleCreateNewUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  userServices.createNewUser(username, password, res);
};

const handleChangePassword = async (req, res) => {
  const username = req.body.username;
  const rePassword = req.body.newPassword;
  userServices.changePassword(username, rePassword, res);
};

const handleLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  userServices.userLogin(username, password, res);
};

module.exports = { handleLogin, handleCreateNewUser, handleChangePassword };
