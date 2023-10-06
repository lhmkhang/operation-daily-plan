const userServices = require("../services/userService");

const handleCreateNewUser = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  userServices.createNewUser(username, password, res, next);
};

const handleChangePassword = async (req, res) => {
  const username = req.body.username;
  const rePassword = req.body.newPassword;
  userServices.changePassword(username, rePassword, res);
};

const handleLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  userServices.userLogin(username, password, req, res, next);
};

const handleLogout = async (req, res) => {
  userServices.userLogout(req, res);
};

module.exports = { handleLogin, handleCreateNewUser, handleChangePassword, handleLogout };
