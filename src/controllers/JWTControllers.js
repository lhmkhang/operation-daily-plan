const JWTServices = require("../services/JWTServices");

const handleRenewToken = (req, res) => {
  JWTServices.handleRefreshToken(req, res);
};

module.exports = { handleRenewToken };
