const userServices = require("../services/userService");

const handleCreateNewUser = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullName = req.body.fullName;
  userServices.createNewUser(username, password, fullName, res, next);
};

const handleChangePassword = async (req, res, next) => {
  const username = req.body.username;
  const rePassword = req.body.password;
  userServices.changePassword(username, rePassword, req, res, next);
};

const handleLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  userServices.userLogin(username, password, req, res, next);
};

const handleLogout = async (req, res, next) => {
  userServices.userLogout(req, res, next);
};

module.exports = { handleLogin, handleCreateNewUser, handleChangePassword, handleLogout };
